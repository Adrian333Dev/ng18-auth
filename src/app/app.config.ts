import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsModule, provideStore } from '@ngxs/store';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  withJsonpSupport,
  withXsrfConfiguration,
} from '@angular/common/http';
import { AuthModule } from './core/auth/auth.module';
import { environment } from '@env/environment.development';
import { AuthState } from './core/auth/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    // Set up the HTTP Client
    provideHttpClient(
      withJsonpSupport(),
      withFetch(),
      withXsrfConfiguration({}),
      // This is required for our interceptor to work
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      // Import our auth module and initialize settings for this app
      AuthModule.forRoot({
        apiUrl: environment.apiUrl!, // pass the API url from an env var
        loginRedirect: '/account/login',
        unauthorizedRedirect: '/unauthorized',
        afterLogoutRedirect: '/',
      }),

      // Important: Initialize NGXS with the AuthState application wide.
      NgxsModule.forRoot([AuthState], {
        developmentMode: !environment.production,
      })
    ),
  ],
};
