/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CoreAppConfig } from "../core/core.module.config";
import { JwtService } from "../services/jwt/jwt.service";
import { EMPTY, Observable, Subject, catchError, of, switchMap, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { SessionService } from "../services";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  readonly apiUrlBase: string;
  readonly graphQlUrlBase: string;

  private refreshTokenInProgress = false;

  private tokenRefreshedSource = new Subject();
  private tokenRefreshed$ = this.tokenRefreshedSource.asObservable();


  constructor(
    private jwtService: JwtService,
    private configService: CoreAppConfig,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.apiUrlBase = this.getFullUri(configService.api!);
    this.graphQlUrlBase = this.getFullUri(configService.graphql!);
  }

  private getFullUri(prop: { protocol: string, baseUrl: string }): string {
    return `${prop.protocol}://${prop.baseUrl}`;
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.sessionService.refreshToken().pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next(null);
        }),
        catchError((error) => {
          this.refreshTokenInProgress = false;
          this.logout();
          return of(error);
        })
      );
    }
  }

  handleResponseError(error: any, request?: HttpRequest<unknown>, next?: HttpHandler): Observable<any> {
    // catch fake error responses
    if (error.status === 200) {
      return of(EMPTY);
    }

    if (error.status === 400) {
      console.log('bad request');
      // this.notificationsService.error('error.BAD_REQUEST');
    } else if (next && request && error.status === 401 && !error.url.endsWith('/login')) {
      return this.refreshToken().pipe(
        switchMap(() => {
          if (request) {
            const authenticatedRequest = this.authenticateRequest(request);
            return next.handle(authenticatedRequest);
          }
          return of(error);
        }),
        catchError((e) => {
          if (e.status !== 401) {
            return this.handleResponseError(e);
          } else {
            this.logout();
          }
          return of(e);
        })
      );
    } else if (error.status === 403 && !error.url.endsWith('/login')) {
      // this.notificationsService.error('error.FORBIDDEN');
      console.log('forbidden');
      this.sessionService.logout();
    } else if (error.status === 500) {
      this.router.navigate(['error'], {
        state: {
          error: 500,
          type: 'FatalError',
          message: 'error.FATAL_ERROR',
        },
      });
    } else if (error.status === 503) {
      this.router.navigate(['error'], {
        state: {
          error: 503,
          type: 'Error',
          message: 'error.SERVICE_UNAVAILABLE',
        },
      });
    }

    return throwError(error);
  }

  private authenticateRequest(request: HttpRequest<unknown>) {
    const token = this.jwtService.getToken();
    return request.clone({
      withCredentials: true,
      headers: request.headers
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Accept-Language', this.sessionService.currentLang),
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(this.apiUrlBase) || request.url.startsWith(this.graphQlUrlBase)) {
      const authenticatedRequest = this.authenticateRequest(request);
      return next.handle(authenticatedRequest).pipe(catchError((error: any) => this.handleResponseError(error, request, next)));
    } else {
      return next.handle(request.clone());
    }
  }
}
