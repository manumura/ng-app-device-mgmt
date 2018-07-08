import {Injectable, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';

import {AuthenticationService} from './authentication.service';
import {User} from "./user.model";

@Injectable()
export class AuthenticationServiceMock extends AuthenticationService {

  login(username: string, password: string) {
    // TODO : type user ?
    const user = new User();
    return of(user);
  }

  isExpired(): boolean {
    return false;
  }
}
