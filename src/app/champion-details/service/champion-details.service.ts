import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  ChampionDataDetails,
  ChampionDataDetailsRaw,
} from '../interface/champion-details.interface';

interface ChampionDetailsStore {
  selectedChampion: ChampionDataDetails | null;
  selectedChampion$: BehaviorSubject<ChampionDataDetails | null>;
}

@Injectable({
  providedIn: 'root',
})
export class ChampionDetailsService {
  // STORE
  private store: ChampionDetailsStore = {
    selectedChampion: null,
    selectedChampion$: new BehaviorSubject<ChampionDataDetails | null>(null),
  };

  constructor(private http: HttpClient) {}
  getChampionDetails(id: string): Observable<ChampionDataDetails> {
    return this.http
      .get<ChampionDataDetailsRaw>(`/assets/data/champion/${id}.json`)
      .pipe(
        map((championData: ChampionDataDetailsRaw) => {
          const championDetails: ChampionDataDetails = {
            ...championData,
            data: Object.values(championData.data)[0],
          };

          this.store.selectedChampion = championDetails;
          this.store.selectedChampion$.next(championDetails);

          return championDetails;
        })
      );
  }

  get selectedChampion(): ChampionDataDetails | null {
    return this.store.selectedChampion;
  }

  get selectedChampion$(): Observable<ChampionDataDetails | null> {
    return this.store.selectedChampion$.asObservable();
  }
}
