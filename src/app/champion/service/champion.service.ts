import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChampionData, ChampionDataRaw } from '../interface/champion.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';

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

  get champions(): ChampionData | null {
    return this.store.champions;
  }

  get champions$(): Observable<ChampionData | null> {
    return this.store.champions$.asObservable();
  }
}
