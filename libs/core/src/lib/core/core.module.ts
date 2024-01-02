import {
  ModuleWithProviders,
  NgModule,
  importProvidersFrom,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CoreAppConfig } from './core.module.config';
import { ApiService, GraphqlFeedService, SessionService } from '../services';
import { JwtService } from '../services/jwt/jwt.service';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createApollo } from './apollo-init';
import { ApiInterceptor } from '../interceptors/api.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ApolloModule],
})
export class CoreModule {
  static forRoot(config?: CoreAppConfig): ModuleWithProviders<CoreModule> {
    console.log('Init Core Module');
    console.log({ config });
    return {
      ngModule: CoreModule,
      providers: [
        { provide: CoreAppConfig, useValue: config },
        ApiService,
        JwtService,
        SessionService,
        provideHttpClient(withInterceptorsFromDi()),
        {
          provide: APOLLO_OPTIONS,
          useFactory: createApollo,
          deps: [HttpLink, CoreAppConfig],
        },
        GraphqlFeedService,
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
      ],
    };
  }

  static forChild(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [SessionService, HttpClient],
    };
  }
}
