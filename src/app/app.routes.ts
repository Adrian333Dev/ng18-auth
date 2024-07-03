import { Routes } from '@angular/router';

import {
  AuthGuard,
  authPaths,
  authPathTitles,
  authRoutes,
  GuestGuard,
} from '~modules/auth';
import { appPathTitles, appPaths, appRoutes } from './constants';
import { userPaths, userRoutes } from '~modules/user';
import {
  NotFoundPageComponent,
  UnauthorizedPageComponent,
} from './modules/shared/pages';

export const routes: Routes = [
  {
    path: appRoutes.home,
    redirectTo: authRoutes.login,
    pathMatch: 'full',
  },
  {
    path: authRoutes.base,
    title: authPathTitles.base,
    loadChildren: () =>
      import('~modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    canActivate: [GuestGuard],
  },
  {
    path: userRoutes.base,
    loadChildren: () =>
      import('~modules/user/user.routes').then((m) => m.USER_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: appPaths.unauthorized,
    title: appPathTitles.unauthorized,
    component: UnauthorizedPageComponent,
  },
  {
    path: '**',
    title: appPathTitles.notFound,
    component: NotFoundPageComponent,
  },
];
