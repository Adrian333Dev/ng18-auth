import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState, IAuthState } from '../store';
import { catchError, map, of } from 'rxjs';

export const GuestGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(Store)
    .select(AuthState.isGuest)
    .pipe(
      map((isGuest) => (isGuest ? true : router.parseUrl('/'))),
      catchError(() => of(false))
    );
};
