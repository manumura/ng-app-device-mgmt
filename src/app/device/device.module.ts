import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatDialogModule,
  MatPaginatorModule,
  MatDividerModule,
  MatSelectModule,
  MatGridListModule,
  MatSortModule } from '@angular/material';
  import { GrowlModule } from 'primeng/growl';
import { DeviceService } from './service/device.service';
import { DeviceStatusService } from './service/device-status.service';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDeleteComponent } from './device-delete/device-delete.component';
import { DeviceCreateComponent } from './device-create/device-create.component';
import { SharedModule} from '../shared/shared.module';
import { DeviceRoutingModule } from './device-routing.module';
import {AuthGuard} from "../authentication/auth.guard";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // HttpClientModule, // need to be declared only once in app.module
    // BrowserAnimationsModule,
    GrowlModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    MatSortModule,
    SharedModule,
    DeviceRoutingModule,
  ],
  declarations: [
    DeviceListComponent,
    DeviceDeleteComponent,
    DeviceCreateComponent
  ],
  entryComponents: [
    DeviceDeleteComponent,
    DeviceCreateComponent
  ],
  providers: [
    DeviceService,
    DeviceStatusService,
    AuthGuard // Needed for lazy loading
  ]
})
export class DeviceModule { }
