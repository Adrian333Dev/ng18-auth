import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AUTH_MODULE_CONFIG, IAuthModuleConfig } from "../config";
import { Store } from "@ngxs/store";
import { AuthState, IAuthState } from "../store";
import { catchError, map, of } from "rxjs";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const moduleConfig = inject<IAuthModuleConfig>(AUTH_MODULE_CONFIG);

  // return inject(Store)
  //   .select<IAuthState>(AuthState)
  //   .pipe(
  //     map((authState) =>
  //       authState.isGuest
  //         ? router.parseUrl(`${moduleConfig.loginRedirect}?next=${state.url}`)
  //         : true
  //     ),
  //     catchError(() => {
  //       return of(false);
  //     })
  //   );
  return of(true); // TODO: Implement AuthGuard
};
