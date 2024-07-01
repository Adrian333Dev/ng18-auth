import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  withJsonpSupport,
  withXsrfConfiguration,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';

import { appRoutes } from '~app';
import { environment as env } from '~env/environment.development';
import { AuthState } from '~modules/auth/store';
import { authRoutes, provideAuth } from '~modules/auth';

const ngxsStates = [AuthState];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore(ngxsStates, withNgxsReduxDevtoolsPlugin()),
    provideHttpClient(
      withJsonpSupport(),
      withFetch(),
      withXsrfConfiguration({}),
      withInterceptorsFromDi()
    ),
    provideAuth({
      apiUrl: env.apiUrl!,
      loginRedirect: authRoutes.login,
      unauthorizedRedirect: '/unauthorized',
      afterLogoutRedirect: '/',
    }),
  ],
};
