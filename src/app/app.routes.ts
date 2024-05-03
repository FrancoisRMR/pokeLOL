import { Routes } from '@angular/router';
import { ChampionDetailsComponent } from './champion-details/component/champion-details.component';
import { ChampionComponent } from './champion/component/champion.component';

export const routes: Routes = [
  {
    path: '',
    component: ChampionComponent,
  },
  {
    path: ':id',
    component: ChampionDetailsComponent,
  },
];
