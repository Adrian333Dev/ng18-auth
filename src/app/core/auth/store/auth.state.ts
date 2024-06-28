import { IUser } from '@/shared/interfaces';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export interface IAuthState {
  initialized: boolean;
  isGuest: boolean;
  user: IUser | undefined;
}

// State Action: Set User
export class AuthStateActionSetUser {
  static readonly type = '[Auth] Set User';
  constructor(public user: IUser | undefined) {}
}

// State Action: Logout
export class AuthStateActionLogout {
  static readonly type = '[Auth] Logout';
}

/**
 * The main Auth State class
 * `initialized` property is useful for filtering out store events
 *  that might trigger before the store is actually initialized.
 **/
@State<IAuthState>({
  name: 'auth',
  defaults: {
    initialized: false,
    user: undefined,
    isGuest: true,
  },
})
@Injectable()
export class AuthState {
  /**
   * Updates the state with the user object.
   * Marks the state as initialized.
   * Sets the isGuest;
   **/
  @Action(AuthStateActionSetUser)
  setUser(ctx: StateContext<IAuthState>, { user }: AuthStateActionSetUser) {
    const state = ctx.getState();
    // We can optionally check if the user object is valid at this point
    const validUser = user?.id !== undefined;

    ctx.setState({
      ...state,
      user: validUser ? user : undefined,
      isGuest: !validUser,
      initialized: true,
    });
  }

  @Action(AuthStateActionLogout)
  logout(ctx: StateContext<IAuthState>) {
    ctx.setState({
      user: undefined,
      isGuest: true,
      initialized: true,
    });
  }

  @Selector()
  static isGuest(state: IAuthState) {
    return state.isGuest;
  }

  @Selector()
  static isStaff(state: IAuthState) {
    return !!state.user && true;
  }

  @Selector()
  static user(state: IAuthState) {
    return state.user;
  }
}
