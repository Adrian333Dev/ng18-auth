import { AUTH_MODULE_CONFIG, IAuthModuleConfig } from './../config';
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from '@ngxs/store';
import { AuthState, IAuthState } from '../store';
import { map } from 'rxjs';

export const StaffOnlyGuard: CanActivateFn = () => {
  const router = inject(Router);
  const moduleConfig = inject<IAuthModuleConfig>(AUTH_MODULE_CONFIG);

  // return inject(Store)
  //   .select<IAuthState>(AuthState)
  //   .pipe(
  //     map((state) => {
  //       if (state.user) {
  //         if (state.user.isStaff) {
  //           return true;
  //         } else {
  //           return router.parseUrl(moduleConfig.unauthorizedRedirect);
  //         }
  //       }

  //       // No user found
  //       return router.parseUrl(moduleConfig.loginRedirect);
  //     })
  //   );
  return true; // TODO: Implement StaffOnlyGuard
};
