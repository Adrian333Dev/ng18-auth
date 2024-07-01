import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';

import { routes } from '../app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  withJsonpSupport,
  withXsrfConfiguration,
} from '@angular/common/http';
import { environment as env } from '~env/environment.development';
import { AuthModule, authRoutes } from '~modules/auth';
import { AuthState } from '~modules/auth/store';

const ngxsStates = [AuthState];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(ngxsStates, withNgxsReduxDevtoolsPlugin()),
    provideHttpClient(
      withJsonpSupport(),
      withFetch(),
      withXsrfConfiguration({}),
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      AuthModule.forRoot({
        apiUrl: env.apiUrl!,
        loginRedirect: authRoutes.login,
        unauthorizedRedirect: '/unauthorized',
        afterLogoutRedirect: '/',
      })
    ),
  ],
};
