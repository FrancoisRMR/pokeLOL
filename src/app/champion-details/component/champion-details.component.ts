import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
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
import {
  Champion,
  ChampionData,
} from '../../champion/interface/champion.interface';
import { ChampionService } from '../../champion/service/champion.service';
import {
  ChampionDataDetails,
  Passive,
  Spell,
} from '../interface/champion-details.interface';
import { ChampionDetailsService } from '../service/champion-details.service';

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
    RouterModule,
  ],
  templateUrl: './champion-details.component.html',
  styleUrl: './champion-details.component.scss',
})
export class ChampionDetailsComponent implements OnDestroy {
  championDetails!: ChampionDataDetails;
  selectedSpell!: Spell | null;
  selectedPassive!: Passive | null;
  carouselShouldBeDisplayed: boolean = false;
  prevAndNextChamp!: {
    previous: string | null;
    next: string | null;
  };
  subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private championDetailsService: ChampionDetailsService,
    private championService: ChampionService
  ) {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        const id: string | null = params.get('id');
        if (id) {
          console.log('id => ', id);
          this.getChampionDetail(id);
          console.log('params => ', params);
          if (this.championService.champions) {
            this.getPrevAndNextChamp(this.championService.champions.data, id);
          } else {
            this.championService.getChampions().subscribe({
              next: (championData: ChampionData) => {
                this.getPrevAndNextChamp(championData.data, id);
              },
            });
          }
        }
      },
    });
  }

  getPrevAndNextChamp(champions: Champion[], currentChampId: string) {
    champions.forEach((champion: Champion, index: number) => {
      if (champion.id === currentChampId) {
        this.prevAndNextChamp = {
          previous: this.championService.champions?.data[index - 1]
            ? (this.championService.champions?.data[index - 1].id as string)
            : null,
          next: this.championService.champions?.data[index + 1]
            ? (this.championService.champions?.data[index + 1].id as string)
            : null,
        };
      }
    });
    console.log('this.prevAndNextChamp => ', this.prevAndNextChamp);
  }

  getChampionDetail(id: string) {
    this.subscriptions.add(
      this.championDetailsService.getChampionDetails(id).subscribe({
        next: (championData: ChampionDataDetails) => {
          console.log('championDetails => ', championData);
          this.championDetails = championData;
          this.clickOnSpell(this.championDetails.data.spells[0]);
          this.carouselShouldBeDisplayed = true;
        },
      })
    );
  }

  clickOnSpell(spell: Spell) {
    this.selectedSpell = spell;
    this.selectedPassive = null;
  }

  clickOnPassive() {
    this.selectedPassive = this.championDetails.data.passive;
    this.selectedSpell = null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
