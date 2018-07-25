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
  MatTooltipModule
} from '@angular/material';
import {
  MatDatepickerModule,
  // MatDatepicker,
  // MatDatepickerInput,
  // MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

import {UserRoutingModule} from './user-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserDeleteComponent} from './user-delete/user-delete.component';
import {UserService} from './user.service';

import {CountryService} from './country/country.service';
import {CityService} from './city/city.service';

import {SharedModule} from '../shared/shared.module';

// import {ConfirmationDialogComponent} from '../shared/confirmation-dialog/confirmation-dialog.component';
// import {SimpleDialogComponent} from '../shared/simple-dialog/simple-dialog.component';
// import {InputFileComponent} from '../shared/input-file/input-file.component';
// import {ByteFormatPipe} from '../shared/pipe/byte-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMomentDateModule,
    SharedModule,
    UserRoutingModule,
  ],
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserDeleteComponent
  ],
  entryComponents: [
    UserDeleteComponent,
    UserCreateComponent
  ],
  providers: [
    UserService,
    CountryService,
    CityService
  ]
})
export class UserModule {}
