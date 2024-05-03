import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface SearchValueStore {
  search: string | null;
  search$: BehaviorSubject<string | null>;
}

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  // STORE
  private store: SearchValueStore = {
    search: null,
    search$: new BehaviorSubject<string | null>(null),
  };

  constructor() {}

  get searchValue$(): Observable<string | null> {
    return this.store.search$.asObservable();
  }

  set searchValue$(value: string | null) {
    this.store.search$.next(value);
  }

  get searchValue(): string | null {
    return this.store.search;
  }

  set searchValue(value: string | null) {
    this.store.search = value;
  }
}
