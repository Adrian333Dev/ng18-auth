
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { AuthService } from '~modules/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginPageComponent {
  form: FormGroup;

  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  constructor() {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  onLogin(): void {
    if (this.form.valid) {
      console.log(`Logging in with ${this.form.value.email} and ${this.form.value.password}`);
    } else {
      console.log('Invalid form');
      this.form.markAllAsTouched();
    }
  }
}

function getNumOfDaysInMonth(yearMonth: string): number {
  const [year, month] = yearMonth.split('-') || [];
  return new Date(Number(year), Number(month), 0).getDate();
}
