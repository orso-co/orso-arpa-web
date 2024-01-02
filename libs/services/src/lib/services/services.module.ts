import {
  ModuleWithProviders,
  NgModule,
  importProvidersFrom,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServicesModuleConfig } from './services.module.config';
import { servicesList } from './services.list';
import { CoreModule } from '@arpa/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
})
export class ServicesModule {
  static forRoot(
    config?: ServicesModuleConfig
  ): ModuleWithProviders<ServicesModule> {
    console.log('init services module');
    console.log({ config });
    return {
      ngModule: ServicesModule,
      providers: [
        ...servicesList,
        importProvidersFrom(CoreModule.forChild()),
        { provide: ServicesModuleConfig, useValue: config },
        HttpClient,
      ],
    };
  }
}
