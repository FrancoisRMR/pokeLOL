import { Component } from '@angular/core';
import { ChampionService } from '../service/champion.service';
import { CommonModule } from '@angular/common';
import { ChampionData } from '../interface/champion.interface';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-champion',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.scss',
})
export class ChampionComponent {
  champions!: ChampionData;
  constructor(private championService: ChampionService) {
    this.getChampions();
  }

  getChampions() {
    this.championService.getChampions().subscribe({
      next: (championData: ChampionData) => {
        this.champions = championData;
      },
    });
  }
}
