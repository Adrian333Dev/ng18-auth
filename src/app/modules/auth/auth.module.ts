import { AuthHttpInterceptorProvider } from './shared/interceptors/http.interceptor';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { AuthState } from './store';
import {
  AUTH_MODULE_CONFIG,
  AuthInitializerProvider,
  IAuthModuleConfig,
} from './config';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([AuthState]), RouterModule],
})
export class AuthModule {
  static forRoot(config: IAuthModuleConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AUTH_MODULE_CONFIG, useValue: config },
        AuthHttpInterceptorProvider,
        AuthInitializerProvider,
      ],
    };
  }
}
