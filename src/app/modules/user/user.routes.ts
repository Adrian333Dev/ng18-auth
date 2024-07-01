import { Routes } from '@angular/router';

import { userPaths } from './shared';
import { DashboardPageComponent } from './pages';

export const USER_ROUTES: Routes = [
  {
    path: userPaths.base,
    redirectTo: userPaths.dashboard,
  },
  {
    path: userPaths.dashboard,
    title: userPaths.dashboard,
    component: DashboardPageComponent,
  },
];
