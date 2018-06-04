import {Injectable, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';

import {DeviceService} from './device.service';
import {Device} from '../model/device.model';

@Injectable()
export class DeviceServiceMock extends DeviceService {

  findAll(): Observable<Device[]> {
    const devices: Array<Device> = [];
    return of(devices);
  }

  findById(id: number): Observable<Device> {
    const device: Device = new Device(1, 'imei', 'status', 'requestBy', new Date(), 'statusText');
    return of(device);
  }
}
