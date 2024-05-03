import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective,
} from '@coreui/angular';
import { Subscription } from 'rxjs';
import { ChampionDataDetails } from '../interface/champion-details.interface';
import { ChampionDetailsService } from '../service/champion-details.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-champion-details',
  standalone: true,
  imports: [
    CommonModule,
    ThemeDirective,
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselCaptionComponent,
    CarouselControlComponent,
    FlexLayoutModule,
  ],
  templateUrl: './champion-details.component.html',
  styleUrl: './champion-details.component.scss',
})
export class ChampionDetailsComponent implements OnInit, OnDestroy {
  championDetails!: ChampionDataDetails;
  subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private championDetailsService: ChampionDetailsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        const id: string | null = params.get('id');
        if (id) {
          this.getChampionDetail(id);
        }
      },
    });
  }

  getChampionDetail(id: string) {
    this.subscriptions.add(
      this.championDetailsService.getChampionDetails(id).subscribe({
        next: (championData: ChampionDataDetails) => {
          console.log('championDetails => ', championData);
          this.championDetails = championData;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
