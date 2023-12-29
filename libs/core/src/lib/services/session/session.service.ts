import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { CoreAppConfig } from '../../core/core.module.config';
import { ApiService } from '../api/api.service';
import { MyUserProfileDto } from '../../models';

@Injectable()
export class SessionService {
  private currentUserSubject = new Subject<MyUserProfileDto>()
  private currentUser: MyUserProfileDto | null = null

  constructor(
    @Inject(CoreAppConfig) private configService: CoreAppConfig,
    private apiService: ApiService
  ) {
    console.log('sessions svc init')
  }

  reloadUserInfo(userInfo: Observable<MyUserProfileDto>): Observable<MyUserProfileDto> {
    console.log('initSession', userInfo)
    console.log({ cfg: this.configService })
    return userInfo.pipe(
      map(info => {
        this.currentUser = info;
        this.currentUserSubject.next(info);
        return info
      })
    )
  }

  userChanged(): Observable<MyUserProfileDto | null> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUser(): MyUserProfileDto | null {
    return this.currentUser;
  }
}
