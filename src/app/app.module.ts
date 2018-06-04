import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { DateAdapter } from '@angular/material/core';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import { GrowlModule } from 'primeng/growl';

import { ApplicationModule } from './application/application.module';
import { DeviceModule } from './device/device.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
// import { AuthenticationService } from './authentication/authentication.service';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { APP_CONFIG, appConfig } from './app.config';
import { AuthGuard } from './authentication/auth.guard';
import { AuthTokenHeaderInterceptor } from './authentication/auth-token-header.interceptor';
// import { ErrorInterceptorProvider } from './interceptor/error.interceptor';
import { AlertService } from './shared/alert/alert.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // FormsModule,
    // GrowlModule,
    MatSidenavModule,
    MatToolbarModule,
    CoreModule,
    ApplicationModule,
    // DeviceModule, // No need : lazy loading
    UserModule,
    AuthenticationModule,
    AppRoutingModule,
  ],
  // AlertService
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenHeaderInterceptor, multi: true },
    AuthGuard,
    // AuthenticationService, // use providedIn: 'root' directly in service
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    // Format datepicker dates to DD/MM/YYYY
    dateAdapter.setLocale('en-GB');
  }
}
