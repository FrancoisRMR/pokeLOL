import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { SearchBarService } from '../service/search-bar.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    FlexLayoutModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  search!: FormControl<string | null>;
  subscriptions: Subscription = new Subscription();

  constructor(private searchBarService: SearchBarService) {
    this.search = new FormControl(null);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.search?.valueChanges.subscribe({
        next: (value: string | null) => {
          this.searchBarService.searchValue$ = value;
          this.searchBarService.searchValue = value;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
