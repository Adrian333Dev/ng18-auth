import { Provider } from '@angular/core';

import {
  AUTH_MODULE_CONFIG,
  AuthInitializerProvider,
  IAuthModuleConfig,
} from './config';
import { AuthHttpInterceptorProvider } from './shared';

export function provideAuth(config: IAuthModuleConfig): Provider[] {
  return [
    { provide: AUTH_MODULE_CONFIG, useValue: config },
    AuthHttpInterceptorProvider,
    AuthInitializerProvider,
  ];
}
