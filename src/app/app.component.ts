import { Component, ViewChild, OnInit } from '@angular/core';
import { SideNavService } from './core/sidenav/service/side-nav.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  @ViewChild('sidenav') public sideNav: MatSidenav;
  constructor(private sideNavService: SideNavService) {
  }

  ngOnInit() {
    this.sideNavService.sideNav = this.sideNav;
  }
}
