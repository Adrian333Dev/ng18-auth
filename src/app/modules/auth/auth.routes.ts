import { Routes } from '@angular/router';

import { LoginPageComponent, RegisterPageComponent } from './pages';
import { GuestGuard, authPathTitles, authPaths } from './shared';

export const AUTH_ROUTES: Routes = [
  {
    path: authPaths.logIn,
    title: authPathTitles.logIn,
    component: LoginPageComponent,
    canActivate: [GuestGuard],
  },
  {
    path: authPaths.register,
    title: authPathTitles.register,
    component: RegisterPageComponent,
    canActivate: [GuestGuard],
  },
];
