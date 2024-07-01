import { Component, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { AuthState, IAuthState } from '~modules/auth/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // store = inject(Store);
  constructor(private store: Store) {}

  auth$: Observable<IAuthState> = this.store.select((state) => state.auth);
}
