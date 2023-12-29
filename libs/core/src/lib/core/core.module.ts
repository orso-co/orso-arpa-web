import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreAppConfig } from './core.module.config';
import { ApiService, SessionService } from '../services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule {
  static forRoot(config?: CoreAppConfig): ModuleWithProviders<CoreModule> {
    console.log('Init Core Module')
    console.log({ config })
    return {
      ngModule: CoreModule,
      providers: [
        {provide: CoreAppConfig, useValue: config },
        ApiService,
        SessionService,
        HttpClient
      ]
    }
  }

  static forChild(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        SessionService,
        HttpClient
      ]
    }
  }
}

