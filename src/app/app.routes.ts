import { NotFoundPageComponent } from './modules/shared/pages/not-found/not-found.component';
import { Routes } from '@angular/router';

import {
  AuthGuard,
  AUTH_ROUTES,
  authPaths,
  authPathTitles,
  GuestGuard,
} from '~modules/auth';
import { appPathTitles, appPaths } from './constants';
import { userPaths } from '~modules/user';

export const routes: Routes = [
  {
    path: appPaths.home,
    redirectTo: authPaths.login,
    pathMatch: 'full',
  },
  {
    path: authPaths.base,
    loadChildren: () =>
      import('~modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    canActivate: [GuestGuard],
  },
  {
    path: userPaths.base,
    loadChildren: () =>
      import('~modules/user/user.routes').then((m) => m.USER_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    title: appPathTitles.notFound,
    component: NotFoundPageComponent,
  },
];
