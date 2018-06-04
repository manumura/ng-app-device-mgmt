import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SideNavService } from './sidenav/service/side-nav.service';
// import { CoreRoutingModule } from './core-routing.module.ts';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        // CoreRoutingModule,
    ],
    declarations: [SidenavComponent, HomeComponent],
    exports: [
        SidenavComponent,
    ],
    providers: [SideNavService]
})
export class CoreModule { }
