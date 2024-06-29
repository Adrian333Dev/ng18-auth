import { Routes } from '@angular/router';

import { AuthGuard, GuestGuard } from './core/auth/guards';
import { UserResolver } from './core/auth/resolvers';
import {
  LoginPageComponent,
  UnauthorizedPageComponent,
} from './core/auth/pages';
import { NotFoundPageComponent } from './shared/pages';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [AuthGuard],
    resolve: { currentUser: UserResolver },
  },
  {
    path: 'login',
    title: 'Login',
    canActivate: [GuestGuard],
    component: LoginPageComponent,
  },

  {
    path: 'unauthorized',
    title: 'Unauthorized Access',
    component: UnauthorizedPageComponent,
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: NotFoundPageComponent,
  },
];
