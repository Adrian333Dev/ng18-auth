import { Routes } from '@angular/router';
import { GuestGuard, StaffOnlyGuard } from './core/auth/guards';
import { UserResolver } from './core/auth/resolvers';

export const appRoutes: Routes = [
  // We can group routes that required authentication together
  // `LayoutAuthenticatedComponent` is an example layout for logged in users
  // which will be inherited to all chilren components/pages.
  {
    path: '',
    // component: LayoutAuthenticatedComponent,
    canActivate: [StaffOnlyGuard], // Guard
    title: 'Admin',
    children: [
      {
        path: 'portal',
        children: [
          {
            path: '',
            // component: PagePortalIndexComponent,
            title: 'Client Portal',
            resolve: {
              currentUser: UserResolver // Resolver
            },
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    title: 'Login',
    canActivate: [GuestGuard], // Guard
    // component: PageLoginComponent,
  },

  {
    path: 'unauthorized',
    title: 'Unauthorized Access',
    // component: PageUnauthorizedComponent,
  },

  {
    path: '**',
    title: 'Page Not Found',
    // component: PageNotfoundComponent,
  },
];
