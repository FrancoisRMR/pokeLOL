import { Component, OnDestroy } from '@angular/core';
import { ChampionService } from '../service/champion.service';
import { CommonModule } from '@angular/common';
import { ChampionData } from '../interface/champion.interface';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-champion',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.scss',
})
export class ChampionComponent implements OnDestroy {
  champions!: ChampionData;
  subscriptions: Subscription = new Subscription();

  constructor(
    private championService: ChampionService,
    private router: Router
  ) {
    this.getChampions();
  }

  getChampions() {
    this.subscriptions.add(
      this.championService.getChampions().subscribe({
        next: (championData: ChampionData) => {
          this.champions = championData;
        },
      })
    );
  }

  redirectToDetailsPage(id: string): void {
    this.router.navigate([id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
