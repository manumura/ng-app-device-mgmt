import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Message} from 'primeng/components/common/api';
import {MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';

import {SimpleDialogComponent} from '../../shared/simple-dialog/simple-dialog.component';
import {UserService} from '../../user/user.service';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  model: any = {};
  loading = false;
  public alertMessages: Message[] = [];
  private simpleDialogRef: MatDialogRef<SimpleDialogComponent>;

  constructor(private router: Router,
              private userService: UserService,
              public dialog: MatDialog) {
  }

  register() {
    this.loading = true;
    this.userService.saveNgForm(this.model)
      .subscribe(
        data => {
          console.log(data);
          if (data.status !== 200) {
            this.success('Registration successful');
            this.router.navigate(['/login']);
          } else {
            this.error('Unable to register the user. Please check with your administrator.');
            this.loading = false;
          }
        },
        error => {
          this.error('Unable to register the user. Please check with your administrator.');
          this.loading = false;
        });
  }

  success(message: string) {
    this.alertMessages = [];
    this.alertMessages.push({severity: 'success', summary: 'Success', detail: message});
  }

  error(message: string) {
    this.alertMessages = [];
    this.alertMessages.push({severity: 'error', summary: 'Error', detail: message});
  }

  info(message: string) {
    this.alertMessages = [];
    this.alertMessages.push({severity: 'info', summary: 'Info', detail: message});
  }

}
