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
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from '~app';
import { environment as env } from '~env/environment.development';
import { AuthState } from '~modules/auth/store';
import { authRoutes, provideAuth } from '~modules/auth';

const ngxsStates = [AuthState];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
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
      unauthorizedRedirect: 'unauthorized',
      afterLogoutRedirect: '',
    }),
  ],
};
