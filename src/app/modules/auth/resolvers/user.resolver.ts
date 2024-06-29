import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, of } from 'rxjs';
import { IJwtPayload } from '../interfaces';
import { AuthState } from '../store';

export const UserResolver: ResolveFn<IJwtPayload | undefined> = () =>
  inject(Store).select(AuthState.user).pipe(map((user) => user ?? undefined));
