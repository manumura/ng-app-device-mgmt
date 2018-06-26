import {Component, InjectionToken, Injector} from '@angular/core';

export interface AppConfig {
  apiEndpoint: string;
  appsApiEndpoint: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export const appConfig: AppConfig = {
  apiEndpoint: 'http://localhost:8090',
  appsApiEndpoint: 'http://localhost:17172/api/v1',
};
