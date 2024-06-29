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
import { AuthModule } from '../core/auth/auth.module';
import { environment as env } from '@env/environment.development';
import { AuthState } from '../core/auth/store';

const ngxsStates = [AuthState];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(ngxsStates, withNgxsReduxDevtoolsPlugin()),
    // Set up the HTTP Client
    provideHttpClient(
      withJsonpSupport(),
      withFetch(),
      withXsrfConfiguration({}),
      // This is required for our interceptor to work
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      AuthModule.forRoot({
        apiUrl: env.apiUrl!, // pass the API url from an env var
        loginRedirect: '/account/login',
        unauthorizedRedirect: '/unauthorized',
        afterLogoutRedirect: '/',
      })
    ),
  ],
};
