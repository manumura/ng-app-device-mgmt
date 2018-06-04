import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatDialogModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatToolbarModule,
  MatTooltipModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {
  MatDatepickerModule,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FileUploadModule} from 'primeng/fileupload';
import {GrowlModule} from 'primeng/growl';

import {SharedModule} from '../shared/shared.module';
// import {ConfirmationDialogComponent} from '../shared/confirmation-dialog/confirmation-dialog.component';
// import {SimpleDialogComponent} from '../shared/simple-dialog/simple-dialog.component';
// import {InputFileComponent} from '../shared/input-file/input-file.component';
// import {ByteFormatPipe} from '../shared/pipe/byte-format.pipe';

// import {ApplicationRoutingModule} from './application-routing.module';
import {ApplicationListComponent} from './application-list/application-list.component';
import {ApplicationCreateComponent} from './application-create/application-create.component';
import {ApplicationDeleteComponent} from './application-delete/application-delete.component';
import {ApplicationService} from './service/application.service';
import {LinkedApplicationService} from './service/linked-application.service';
import {ChannelService} from '../channel/service/channel.service';
import {DeviceTypeService} from '../device/service/device-type.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    GrowlModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMomentDateModule,
    // ApplicationRoutingModule,
    SharedModule,
  ],
  declarations: [ApplicationListComponent, ApplicationCreateComponent, ApplicationDeleteComponent],
  entryComponents: [
    ApplicationDeleteComponent, ApplicationCreateComponent
  ],
  providers: [ApplicationService, LinkedApplicationService, DeviceTypeService, ChannelService],
  // bootstrap: [ConfirmationDialogComponent, SimpleDialogComponent, InputFileComponent],
})
export class ApplicationModule {}
