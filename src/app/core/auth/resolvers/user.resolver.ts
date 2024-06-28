import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, of } from 'rxjs';
import { IJwtPayload } from '../interfaces';
import { AuthState, IAuthState } from '../store';

// export const UserResolver: ResolveFn<IJwtPayload | undefined> = () =>
//   inject(Store)
//     .select<IAuthState>(AuthState)
//     .pipe(map((state) => state?.user));

export const UserResolver: ResolveFn<IJwtPayload | undefined> = () =>
  of(undefined); // TODO: Implement UserResolver
