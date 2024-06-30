import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError, of, switchMap, tap } from 'rxjs';

import {
  ACCESS_TOKEN_KEY,
  AUTH_MODULE_CONFIG,
  IAuthModuleConfig,
  REFRESH_TOKEN_KEY,
} from '../../config';
import { LocalStorageService } from './local-storage.service';
import { AuthStateActionLogout, AuthStateActionSetUser } from '../../store';
import { ILoginInput, ITokens } from '../../interfaces';
import { IUserModel } from '~modules/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    @Inject(AUTH_MODULE_CONFIG) private moduleConfig: IAuthModuleConfig,

    private http: HttpClient,
    private router: Router,
    private store: Store,
    private localStorageService: LocalStorageService
  ) {}

  /**
   * Login a user
   * @param dto The credentials interface
   * @param next Optionaly pass a redirect url after successful login
   */
  login(dto: ILoginInput, next?: string) {
    return this.http.post<ITokens>('/api/auth/login', dto).pipe(
      switchMap((res) => {
        if (res) {
          // Store the credentials locally
          this.storeAccessTokens(res);
        }
        // Get the user's profile
        return this.whoami();
      }),
      tap((user) => {
        // Dispatch a store action to set the user
        this.store.dispatch(new AuthStateActionSetUser(user!));

        // Optionally navigate to a url on success
        if (next) {
          this.router.navigateByUrl(next);
        }
      })
    );
  }

  /**
   * Retrieves the current user's profile.
   */
  whoami() {
    return this.http.get<IUserModel>(`/api/auth/whoami`).pipe(
      // In case we get an HTTP response like 401
      // Dispatch an event to log out the current user.
      catchError(() => {
        this.store.dispatch(new AuthStateActionLogout());
        return of(null);
      })
    );
  }

  /**
   * Clear all tokens stored locally
   * Dispatch the logout action
   * Navigate away (afterLogoutRedirect from our module config)
   */
  logout() {
    this.clearAccessTokens();
    this.store.dispatch(new AuthStateActionLogout());
    this.router.navigateByUrl(this.moduleConfig.afterLogoutRedirect);
  }

  // Store the JWT tokens locally
  storeAccessTokens(data: ITokens) {
    this.localStorageService.setItem(ACCESS_TOKEN_KEY, data.access);
    this.localStorageService.setItem(REFRESH_TOKEN_KEY, data.refresh);
  }

  // Retrieve the Access Token
  retrieveAccessToken() {
    return this.localStorageService.getItem(ACCESS_TOKEN_KEY);
  }

  // Retrieve the Refresh Token
  retrieveRefreshToken() {
    return this.localStorageService.getItem(REFRESH_TOKEN_KEY);
  }

  // Clear all stored tokens
  clearAccessTokens() {
    this.localStorageService.removeItem(ACCESS_TOKEN_KEY);
    this.localStorageService.removeItem(REFRESH_TOKEN_KEY);
  }
}
