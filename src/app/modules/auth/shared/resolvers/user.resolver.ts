import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { Store } from '@ngxs/store';

import { IJwtPayload } from '../interfaces';
import { AuthState } from '../store';

export const UserResolver: ResolveFn<IJwtPayload | undefined> = () =>
  inject(Store)
    .select(AuthState.user)
    .pipe(map((user) => user ?? undefined));
