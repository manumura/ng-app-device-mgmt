import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GrowlModule } from 'primeng/growl';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
// TODO
import { TestService } from './login/test.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        GrowlModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    exports: [
    ],
    // TODO TestService
    providers: [
        TestService,
    ],
})
export class AuthenticationModule { }
