import { HttpClient, HttpContext } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { catchError, firstValueFrom, of, switchMap } from 'rxjs';

import { LocalStorageService } from '../shared/services';
import { ITokens } from '../interfaces';
import { BuildAuthHttpHeaders } from '../utils';
import { AuthStateActionSetUser } from '../store';
import {
  BYPASS_AUTH_INTERCEPTOR,
  IAuthModuleConfig,
  REFRESH_TOKEN_KEY,
} from './config';
import { IUserModel } from '@modules/user';

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
              http.get<IUserModel>(`${apiUrl}/auth/whoami`, {
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
