import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchBarComponent } from '../../search-bar/component/search-bar.component';
import { SearchBarService } from '../../search-bar/service/search-bar.service';
import { Champion, ChampionData } from '../interface/champion.interface';
import { ChampionService } from '../service/champion.service';

@Component({
  selector: 'app-champion',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, SearchBarComponent],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.scss',
})
export class ChampionComponent implements OnDestroy {
  champions!: ChampionData;
  tags!: string[];
  selectedTags: string[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(
    private championService: ChampionService,
    private router: Router,
    private searchBarService: SearchBarService
  ) {
    this.getChampions();
    this.initSearchValueSubscription();
  }

  getChampions() {
    this.subscriptions.add(
      this.championService.getChampions().subscribe({
        next: (championData: ChampionData) => {
          this.champions = championData;
          this.tags = this.championService.getAllTags(championData.data);
        },
      })
    );
  }

  initSearchValueSubscription() {
    this.subscriptions.add(
      this.searchBarService.searchValue$.subscribe({
        next: (value: string | null) => {
          if (this.championService.champions) {
            if (value) {
              this.champions = {
                ...this.champions,
                data: this.championService.champions.data.filter(
                  (champion: Champion) => {
                    return champion.id
                      .toLowerCase()
                      .startsWith(value.toLowerCase());
                  }
                ),
              };
            } else {
              this.champions = this.championService.champions;
            }
          }
        },
      })
    );
  }

  redirectToDetailsPage(id: string): void {
    this.router.navigate([id]);
  }

  selectOrUnselectTag(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(
        (selectedTag: string) => selectedTag !== tag
      );
    } else {
      this.selectedTags.push(tag);
    }
    this.updateObjectsWithTags();
  }

  updateObjectsWithTags() {
    if (this.championService.champions) {
      if (this.selectedTags.length) {
        this.champions = {
          ...this.champions,
          data: this.championService.champions.data.filter(
            (champion: Champion) => {
              return this.selectedTags.every((filter) =>
                champion.tags.includes(filter)
              );
            }
          ),
        };
      } else {
        this.champions = this.championService.champions;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
