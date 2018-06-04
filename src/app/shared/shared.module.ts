import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatDialogModule,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { InputFileComponent } from './input-file/input-file.component';
import { ByteFormatPipe } from './pipe/byte-format.pipe';
import { FilterPipe } from './pipe/filter.pipe';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [
    ConfirmationDialogComponent,
    SimpleDialogComponent,
    InputFileComponent,
    ByteFormatPipe,
    FilterPipe,
    AlertComponent,
  ],
  exports: [
    // TODO : we can import CommonModule here, so we dont have to import it in every module
    // CommonModule,
    ConfirmationDialogComponent,
    SimpleDialogComponent,
    InputFileComponent,
    ByteFormatPipe,
    // FilterPipe,
    AlertComponent,
  ],
})
export class SharedModule {}
