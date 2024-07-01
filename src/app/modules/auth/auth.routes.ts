import { Routes } from '@angular/router';

import { LoginPageComponent, RegisterPageComponent } from './pages';
import { authPathTitles, authPaths } from './shared';

export const AUTH_ROUTES: Routes = [
  {
    path: authPaths.base,
    redirectTo: authPaths.login,
    pathMatch: 'full',
  },
  {
    path: authPaths.login,
    title: authPathTitles.login,
    component: LoginPageComponent,
  },
  {
    path: authPaths.register,
    title: authPathTitles.register,
    component: RegisterPageComponent,
  },
];
