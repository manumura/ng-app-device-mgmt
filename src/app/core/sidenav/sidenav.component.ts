import {Component, OnInit} from '@angular/core';
import {SideNavService} from './service/side-nav.service';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isLogged: Observable<boolean>;

  constructor(private sideNavService: SideNavService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.checkUser();
  }

  closeNav() {
    this.sideNavService.sideNav.close();
  }

  checkUser() {
    this.authService.refresh();
    this.isLogged = this.authService.isLoggedIn;
  }
}
