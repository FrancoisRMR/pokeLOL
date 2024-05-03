import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  Champion,
  ChampionData,
  ChampionDataRaw,
} from '../interface/champion.interface';

interface ChampionStore {
  champions: ChampionData | null;
  champions$: BehaviorSubject<ChampionData | null>;
}

@Injectable({
  providedIn: 'root',
})
export class ChampionService {
  private store: ChampionStore = {
    champions: null,
    champions$: new BehaviorSubject<ChampionData | null>(null),
  };

  constructor(private http: HttpClient) {}

  getChampions(): Observable<ChampionData> {
    return this.http.get<ChampionDataRaw>('/assets/data/champion.json').pipe(
      map((champion: ChampionDataRaw) => {
        const championData: ChampionData = {
          ...champion,
          data: Object.values(champion.data),
        };

        this.store.champions = championData;
        this.store.champions$.next(championData);
        return championData;
      })
    );
  }

  getAllTags(champions: Champion[]): string[] {
    let uniqueTags: string[] = [];
    champions
      .map((champion: Champion) => champion.tags)
      .flatMap((tags: string[]) => tags)
      .forEach((tag: string) => {
        if (!uniqueTags.includes(tag)) {
          uniqueTags.push(tag);
        }
      });

    return uniqueTags;
  }

  get champions(): ChampionData | null {
    return this.store.champions;
  }

  get champions$(): Observable<ChampionData | null> {
    return this.store.champions$.asObservable();
  }
}
