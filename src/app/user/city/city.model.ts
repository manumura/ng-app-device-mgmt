import {Country} from '../country/country.model';

export class City {

  id: number;
  name: string;
  active: boolean;
  country: Country;

  constructor(id: number, name: string, active: boolean, country: Country) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.country = country;
  }

}
