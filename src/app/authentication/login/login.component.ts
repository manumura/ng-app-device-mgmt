﻿import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Message } from 'primeng/components/common/api';
import { SimpleDialogComponent } from '../../shared/simple-dialog/simple-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material';
import { LOGOUT_PARAM_NAME, LOGOUT_PARAM_VALUE } from '../../constant/auth.constant';

// TODO : remove test
import { TestService } from './test.service';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  requestProcess: string;
  public alertMessages: Message[] = [];
  private simpleDialogRef: MatDialogRef<SimpleDialogComponent>;
  isLogged: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    // TODO : remove test
    private testService: TestService) {
  }

  ngOnInit() {
    // reset login status
    if (this.isLogout()) {
      this.logout();
    } else {
      // Check if there is a logged in user, then send to home page.
      this.validateUser();
    }
  }

  logout() {
    console.log('log out')
    this.authenticationService.logout().subscribe(
      data => {
        this.info('You have successfully logged out.');
      },
      error => {
        this.error('Error while trying to log out.');
      });
  }

  validateUser() {
    // this.authenticationService.refresh();
    // if (this.authenticationService.isLoggedIn.value) {
    //   console.log('already logged in')
    //   this.router.navigate(['/home']);
    // }
    this.authenticationService.isLoggedIn$.subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
        }
      }
    );
  }

  login() {
    this.loading = true;
    // get return url from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error('Invalid username or password.');
          this.loading = false;
        });
  }

  isLogout(): boolean {
    this.requestProcess = this.route.snapshot.queryParams[LOGOUT_PARAM_NAME];

    // this.route.queryParams.subscribe(
    //   (queryParams: any) => {
    //       console.log(queryParams[LOGOUT_PARAM_NAME]);
    //       this.requestProcess = queryParams[LOGOUT_PARAM_NAME];
    //     }
    // );

    return (this.requestProcess === LOGOUT_PARAM_VALUE);
  }

  isRegisterSuccess(): boolean {
    this.requestProcess = this.route.snapshot.queryParams['lr'];
    return (this.requestProcess === 'register');
  }

  error(message: string) {
    this.alertMessages = [];
    this.alertMessages.push({ severity: 'error', summary: 'Error', detail: message });
  }

  info(message: string) {
    this.alertMessages = [];
    this.alertMessages.push({ severity: 'info', summary: 'Info', detail: message });
  }

  // TODO : remove test
  test() {
    console.log('Test');
    this.testService.test().subscribe(
      result => {
        console.log(result);
      });
  }
}
