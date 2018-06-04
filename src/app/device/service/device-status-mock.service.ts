import {Injectable, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';

import {DeviceStatusService} from './device-status.service';
import {DeviceStatus} from '../model/device-status.model';

@Injectable()
export class DeviceStatusServiceMock extends DeviceStatusService {

  findAll(): Observable<DeviceStatus[]> {
    const deviceStatuses: Array<DeviceStatus> = [];
    return of(deviceStatuses);
  }

  findById(id: number): Observable<DeviceStatus> {
    const deviceStatus: DeviceStatus = new DeviceStatus(1, 'name');
    return of(deviceStatus);
  }
}
