import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { initializeApp } from './app.init';
import { HttpClient } from '@angular/common/http';
import { ServicesModule, UsersService } from '@arpa/services';
import { CoreModule, SessionService } from '@arpa/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      CoreModule.forRoot({
        api: {
          protocol: 'https',
          baseUrl: 'orso-arpa-dev.azurewebsites.net/api',
        },
        graphql: {
          protocol: 'https',
          baseUrl: 'orso-arpa-dev.azurewebsites.net/graphql',
        },
      })
    ),
    importProvidersFrom([BrowserAnimationsModule]),
    importProvidersFrom(ServicesModule.forRoot({})),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [HttpClient, SessionService, UsersService],
    },
  ],
};
