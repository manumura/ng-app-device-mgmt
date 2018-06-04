import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {RegisterComponent} from './authentication/register/register.component';
import {HomeComponent} from './core/home/home.component';
import {AuthGuard} from './authentication/auth.guard';
import {ApplicationListComponent} from './application/application-list/application-list.component';
import {DeviceListComponent} from './device/device-list/device-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'application', component: ApplicationListComponent, canActivate: [AuthGuard]},
  // {path: 'device', component: DeviceListComponent, canActivate: [AuthGuard]},
  // TODO : For lazy loading of children : https://github.com/angular/angular-cli/issues/9488
  {path: 'device', loadChildren: './device/device.module#DeviceModule', canLoad: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
