import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError, map, of } from 'rxjs';

import { AuthState } from '~modules/auth/store';

export const GuestGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(Store)
    .select(AuthState.isGuest)
    .pipe(
      map((isGuest) => (isGuest ? true : router.parseUrl('/'))),
      catchError(() => of(false))
    );
};
