import {Injectable, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';

import {CountryService} from './country.service';
import {Country} from './country.model';

@Injectable()
export class CountryServiceMock extends CountryService {

  findAll(): Observable<Country[]> {
    const countries: Array<Country> = [];
    countries.push(new Country(1, 'country1', true));
    countries.push(new Country(2, 'country2', true));
    return of(countries);
  }
}
