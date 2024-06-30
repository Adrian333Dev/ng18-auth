import { NgxsModuleOptions } from '@ngxs/store';
import { environment as env } from '~env/environment.development';

export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: !env.production,
};
