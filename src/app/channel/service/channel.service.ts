import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {APP_CONFIG, AppConfig} from '../../app.config';
import {AbstractService} from '../../shared/service/abstract.service';
import {Channel} from '../model/channel.model';

@Injectable()
export class ChannelService extends AbstractService<Channel> {

  //  private readonly apiUrl = 'http://localhost:18181/channel';

  constructor(protected http: HttpClient,
    @Inject(APP_CONFIG) private conf: AppConfig) {
    super(http, conf.appsApiEndpoint + '/api/channels');
  }
}
