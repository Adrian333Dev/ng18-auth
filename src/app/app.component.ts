import { Component, Injectable } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Select } from '@ngxs/store';
import { AuthState, IAuthState } from './core/auth/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @Select(AuthState) auth$!: Observable<IAuthState>;
}
