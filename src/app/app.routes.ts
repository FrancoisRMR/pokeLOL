import { Routes } from '@angular/router';
import { ChampionComponent } from './champion/component/champion.component';
import { ChampionDetailsComponent } from './champion-details/component/champion-details.component';

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
