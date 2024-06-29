import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';

import { AuthState } from './store';
import { AUTH_MODULE_CONFIG, IAuthModuleConfig, initializeApp } from './config';
import { AuthHttpInterceptor } from './interceptors';
import { LocalStorageService } from './shared/services';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([AuthState]), RouterModule],
})
export class AuthModule {
  static forRoot(config: IAuthModuleConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AUTH_MODULE_CONFIG, useValue: config },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true,
        },
        // Register our App initializer globally and provide dependencies
        {
          provide: APP_INITIALIZER,
          useFactory: initializeApp,
          multi: true,
          // Pass the dependencies for our intializer function.
          // NOTE: Must be in the same order as the function
          // arguments (initializeApp).
          deps: [AUTH_MODULE_CONFIG, HttpClient, LocalStorageService, Store],
        },
      ],
    };
  }
}
