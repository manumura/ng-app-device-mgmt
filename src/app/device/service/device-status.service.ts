import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '../../app.config';
import { AbstractService } from '../../shared/service/abstract.service';
import { DeviceStatus } from '../model/device-status.model';

@Injectable()
export class DeviceStatusService extends AbstractService<DeviceStatus> {

  constructor(protected http: HttpClient,
    @Inject(APP_CONFIG) private conf: AppConfig) {
    super(http, conf.appsApiEndpoint + '/api/devices/statuses');
  }
}
