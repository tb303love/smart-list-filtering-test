import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { API_KEY } from './api.token';

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class ApiModule {
  constructor(@Optional() @SkipSelf() parentModule?: ApiModule) {
    if (parentModule) {
      throw new Error(
        'ApiModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(apiUrl: string): ModuleWithProviders<ApiModule> {
    if (!apiUrl) {
      throw new Error('Please provide `API URL`');
    }

    return {
      ngModule: ApiModule,
      providers: [{ provide: API_KEY, useValue: apiUrl }],
    };
  }
}
