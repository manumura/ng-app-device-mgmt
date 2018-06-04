import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {APP_CONFIG, AppConfig} from '../../app.config';
import {AbstractService} from '../../shared/service/abstract.service';
import {DeviceType} from '../model/device-type.model';

@Injectable()
export class DeviceTypeService extends AbstractService<DeviceType> {

  //  private readonly apiUrl = 'http://localhost:18181/deviceType';

  constructor(protected http: HttpClient,
    @Inject(APP_CONFIG) private conf: AppConfig) {
    super(http, conf.appsApiEndpoint + '/dm/api/v1/deviceTypes');
  }
}
