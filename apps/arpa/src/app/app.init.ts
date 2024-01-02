import { HttpClient } from '@angular/common/http';
import { SessionService } from '@arpa/core';
import { UsersService } from '@arpa/services';
import { firstValueFrom, of, tap } from 'rxjs';

export function initializeApp(
  http: HttpClient,
  sessionService: SessionService,
  userService: UsersService
) {
  console.log('app initializer');
  console.log({ http, userService, sessionService });
  return (): Promise<unknown> => {
    return sessionService.resumeSession().toPromise()
  }
    firstValueFrom(
      of(userService.get()).pipe(
        tap((user) => {
          console.log({ user });
        })
      )
      // http
      //   .get("https://someUrl.com/api/user")
      //   .pipe(tap(user => { console.log({ user }) }))
    );
}
