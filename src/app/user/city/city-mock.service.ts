import {Injectable, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';

import {CityService} from './city.service';
import {City} from './city.model';

import {Country} from '../country/country.model';

@Injectable()
export class CityServiceMock extends CityService {

  findAll(): Observable<City[]> {
    const cities: Array<City> = [];
    cities.push(new City(1, 'city1', true, new Country(1, 'country1', true)));
    cities.push(new City(2, 'city2', true, new Country(2, 'country2', true)));
    return of(cities);
  }

  findAllByCountryId(countryId: number): Observable<City[]> {
    const cities: Array<City> = [];
    if (countryId === 1) {
      cities.push(new City(1, 'city1', true, new Country(1, 'country1', true)));
    } else if (countryId === 2) {
      cities.push(new City(2, 'city2', true, new Country(2, 'country2', true)));
    }
    return of(cities);
  }
}
