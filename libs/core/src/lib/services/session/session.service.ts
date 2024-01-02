import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  finalize,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { CoreAppConfig } from '../../core/core.module.config';
import { ApiService } from '../api/api.service';
import { LoginDto, MyUserProfileDto, TokenDto } from '../../models';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class SessionService {
  private currentUserSubject = new BehaviorSubject<MyUserProfileDto | null>(
    null
  );
  private currentUser: MyUserProfileDto | null = null;
  private _currentLang = 'de';

  constructor(
    @Inject(CoreAppConfig) private configService: CoreAppConfig,
    private jwtService: JwtService,
    private apiService: ApiService
  ) {
  }

  isLoggedIn(): boolean {
    return !!this.jwtService.getToken() && !this.jwtService.isExpired();
  }

  get currentLang() {
    return this._currentLang;
  }

  refreshToken(): Observable<TokenDto> {
    return this.apiService
      .post<TokenDto>('/Auth/refreshtoken', {
        token: this.jwtService.getToken(),
      })
      .pipe(
        tap((result: TokenDto) => {
          this.jwtService.saveToken(result.token);
        })
      );
  }

  login(loginDto: LoginDto): Observable<MyUserProfileDto | null> {
    return this.apiService.post<TokenDto>('/auth/login', loginDto).pipe(
      filter((tokenDto) => !!tokenDto),
      tap((tokenDto: TokenDto) => {
        this.jwtService.saveToken(tokenDto.token);
      }),
      mergeMap(() => this.resumeSession())
    );
  }

  resumeSession(): Observable<MyUserProfileDto | null> {
    if (!this.isLoggedIn()) {
      return of(null)
    }
    return this.getUserInfo().pipe(
      tap((userInfo) => this.reloadUserInfo(userInfo))
    );
  }

  private getUserInfo(): Observable<MyUserProfileDto> {
    const decodedToken = this.jwtService.decode(this.jwtService.getToken());
    return this.apiService.get<MyUserProfileDto>('/me/profiles/user').pipe(
      map((user) => {
        user.roles = decodedToken.roles;
        return user;
      })
    );
  }

  logout(): Observable<unknown> {
    return this.apiService
      .post<unknown>(`/auth/logout`, {
        token: this.jwtService.getToken(),
      })
      .pipe(
        catchError((error) => {
          if (error) {
            console.error(error);
          }
          return of({});
        }),
        finalize(() => {
          this.purgeAuth();
        })
      );
  }

  private purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
    // this.isAuthenticatedSubject.next(false);
  }

  private reloadUserInfo(userInfo: MyUserProfileDto): void {
    this.currentUser = userInfo;
    this.currentUserSubject.next(userInfo);
  }

  userChanged(): Observable<MyUserProfileDto | null> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUser(): MyUserProfileDto | null {
    return this.currentUser;
  }
}
