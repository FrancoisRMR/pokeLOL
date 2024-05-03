import { TestBed } from '@angular/core/testing';
import { ChampionDetailsService } from '../service/champion-details.service';

describe('ChampionDetailsService', () => {
  let service: ChampionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChampionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
