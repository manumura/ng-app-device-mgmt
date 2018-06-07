import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, AppConfig} from '../../app.config';
import {AbstractService} from '../../shared/service/abstract.service';
import {Device} from '../model/device.model';

@Injectable()
export class DeviceService extends AbstractService<Device> {
  constructor(protected http: HttpClient,
              @Inject(APP_CONFIG) private conf: AppConfig) {
    super(http, conf.appsApiEndpoint + '/api/devices');
  }
}
