import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError, map, of } from 'rxjs';

import { AUTH_MODULE_CONFIG, IAuthModuleConfig } from '~modules/auth/config';
import { AuthState } from '~modules/auth/store';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const moduleConfig = inject<IAuthModuleConfig>(AUTH_MODULE_CONFIG);

  return inject(Store)
    .select(AuthState.isGuest)
    .pipe(
      map((isGuest) =>
        isGuest
          ? router.parseUrl(`${moduleConfig.loginRedirect}?next=${state.url}`)
          : true
      ),
      catchError(() => of(false))
    );
};
