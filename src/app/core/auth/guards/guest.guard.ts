import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState, IAuthState } from "../store";
import { catchError, map, of } from "rxjs";

export const GuestGuard: CanActivateFn = () => {
  const router = inject(Router);

  // return inject(Store)
  //   .select<IAuthState>(AuthState)
  //   .pipe(
  //     map((authState) => (!authState.isGuest ? router.parseUrl('/') : true)),
  //     catchError(() => {
  //       return of(false);
  //     })
  //   );

  return of(true); // TODO: Implement GuestGuard
};
