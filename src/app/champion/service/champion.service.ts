import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChampionData, ChampionDataRaw } from '../interface/champion.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChampionService {
  constructor(private http: HttpClient) {}

  getChampions(): Observable<ChampionData> {
    return this.http.get<ChampionDataRaw>('/assets/data/champion.json').pipe(
      map((championsObject: ChampionDataRaw) => {
        return {
          ...championsObject,
          data: Object.values(championsObject.data),
        };
      })
    );
  }
}
