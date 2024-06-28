import { InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Store } from '@ngxs/store';
import { catchError, firstValueFrom, of, switchMap } from 'rxjs';

import { LocalStorageService } from '../services';
import { ITokens } from '../interfaces';
import { BuildAuthHttpHeaders } from '../utils';
import { IUser } from '@/shared/interfaces';
import { AuthStateActionSetUser } from '../store';

// Define a token for inject the module settings in other classes
export const AUTH_MODULE_CONFIG = new InjectionToken('AUTH_MODULE_CONFIG');

// This interface defines our configuration object that needs to be passed
// to our module on initialization. Add any setting here that is not
// constant and you might want to configure differently for each app.
// For example:
export interface IAuthModuleConfig {
  apiUrl: string;
  loginRedirect: string;
  afterLogoutRedirect: string;
  unauthorizedRedirect: string;
}

// Define some constant keys that will be used to retreive the tokens
// from the client's localStorage or cookies
export const ACCESS_TOKEN_KEY = 'authAccess';
export const REFRESH_TOKEN_KEY = 'authRefresh';

// This is a context token we can pass to angular's HttpClient context
// to tell it to bypass authentication checks.
export const BYPASS_AUTH_INTERCEPTOR = new HttpContextToken(() => false);

// The parameters for this function are provider in our module instance
// Check the AuthModule providers.
// NOTE: Must be in the same order.
export function initializeApp(
  moduleConfig: IAuthModuleConfig,
  http: HttpClient,
  localStorageService: LocalStorageService,
  store: Store
) {
  // Get the refreshToken from localStorage
  const refreshToken = localStorageService.getItem(REFRESH_TOKEN_KEY);
  // Bypass the Authentication inteceptor we created earlier
  const httpContext = new HttpContext().set(BYPASS_AUTH_INTERCEPTOR, true);
  // Get the base url of our API from the module configuration
  const apiUrl = moduleConfig.apiUrl;

  // If we have a refreshToken request for a fresh accessToken
  if (refreshToken) {
    return (): Promise<unknown> =>
      firstValueFrom(
        //  Turns an observable to promise
        http
          .get<Omit<ITokens, 'refresh'>>(`${apiUrl}/auth/refresh`, {
            context: httpContext, // pass the bypass context
            headers: BuildAuthHttpHeaders(refreshToken),
          })
          .pipe(
            // If the refresh token is succesfful switch to getting
            // the user's profile
            switchMap((res) =>
              http.get<IUser>(`${apiUrl}/auth/whoami`, {
                context: httpContext,
                headers: BuildAuthHttpHeaders(res.access),
              })
            ),
            // If we have a user profile, dispatch our state action
            // to update the auth state
            switchMap((user) =>
              store.dispatch(new AuthStateActionSetUser(user))
            ),
            // If any of the above throw an error just return null
            catchError(() => of(null))
          )
      );
  }
  return () => null;
}
