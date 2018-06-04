import {Injectable, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';

import {DeviceTypeService} from './device-type.service';
import {DeviceType} from '../model/device-type.model';

@Injectable()
export class DeviceTypeServiceMock extends DeviceTypeService {

  findAll(): Observable<DeviceType[]> {
    const deviceTypes: Array<DeviceType> = [];
    return of(deviceTypes);
  }

  findById(id: number): Observable<DeviceType> {
    const deviceType: DeviceType = new DeviceType(1, 'name', 'desc');
    return of(deviceType);
  }
}
