import {Country} from './country/country.model';
import {City} from './city/city.model';

export class User {

  constructor(public id?: number, public firstName?: string, public lastName?: string, public email?: string, public birthDate?: Date,
    public salary?: number, public gender?: string, public married?: boolean, public country?: Country, public city?: City) {
  }

}
