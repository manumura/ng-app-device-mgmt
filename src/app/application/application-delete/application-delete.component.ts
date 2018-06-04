import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {Message} from 'primeng/components/common/api';

import {Application} from '../model/application.model';
import {ApplicationService} from '../service/application.service';

@Component({
  selector: 'app-application-delete',
  templateUrl: './application-delete.component.html',
  styleUrls: ['./application-delete.component.css'],
})
export class ApplicationDeleteComponent {

  private application: Application = this.data.application;

  public alertMessages: Message[] = [];

  constructor(public dialogRef: MatDialogRef<ApplicationDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private applicationService: ApplicationService) {}

  onNoClick(): void {
    this.close(0);
  }

  confirmDelete(): void {
    if (this.application) {
      console.log('Deleting application');
      this.applicationService.deleteById(this.application.appId).subscribe(
        (res) => {
            this.close(1);
            return res;
          },
        err => {
          this.errorHandler(err);
        }
      );
    }
  }

   private close(result: number): void {
    this.dialogRef.close(result);
  }

  private error(...messages): void {
    this.alertMessages = [];
    if (messages) {
      for (const message of messages) {
        this.alertMessages.push({severity: 'error', summary: 'Error', detail: message});
      }
    }
  }

  errorHandler(e: any): void {

    console.log('Error : ', e);
    const messages: string[] = [];

    if (e.status === 0) {
      messages.push('Cannot connect to server');
    } else if (e.error.errorMessages === undefined || e.error.errorMessages === null) {
      messages.push('An unexpected error occurred');
    } else {
      messages.push(e.error.errorMessages);
    }

    this.error(messages);
  }
}
