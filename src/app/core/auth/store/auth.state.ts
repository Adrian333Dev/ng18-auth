import { IUser } from '@/shared/interfaces';

export interface IAuthState {
  initialized: boolean;
  isGuest: boolean;
  user: IUser | undefined;
}
