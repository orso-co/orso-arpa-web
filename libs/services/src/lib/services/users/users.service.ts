import { Injectable } from '@angular/core';
import { ApiService } from '@arpa/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(private apiService: ApiService) {
    console.log('users service constructor')
  }

  get(): Observable<unknown> {
    console.log('UserServices.get')
    console.log('api service >>', this.apiService);
    return of({})
  }
}
