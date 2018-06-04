import {Injectable, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';

import {UserService} from './user.service';
import {User} from './user.model';

@Injectable()
export class UserServiceMock extends UserService {

  findByFirstName(term) {
    console.log('term: ', term);
    return this.findAll();
  }

  findAll(): Observable<User[]> {
    const users: Array<User> = [];
    return of(users);
  }
}
