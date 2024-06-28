import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from 'rxjs';
import { Store } from '@ngxs/store';

import { AuthState, IAuthState } from '../store';
import { AUTH_MODULE_CONFIG, IAuthModuleConfig } from './../config';

export const StaffOnlyGuard: CanActivateFn = () => {
  const router = inject(Router);
  const moduleConfig = inject<IAuthModuleConfig>(AUTH_MODULE_CONFIG);

  return inject(Store)
    .select(AuthState.isStaff)
    .pipe(
      map((isStaff) => (isStaff ? true : router.parseUrl(moduleConfig.unauthorizedRedirect)))
    );
};
