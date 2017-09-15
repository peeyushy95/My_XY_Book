import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";
import { AppComponent } from './start/app.component';
import { HttpModule } from '@angular/http';

import { NavComponent } from './shared/navbar.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './shared/app.routing';
import { loginService } from './shared/authorization/login.service';  
import {AuthGuard} from './shared/authorization/authGuard.service';
import {BackendService} from './services/backend.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        MdButtonModule, 
        MdCheckboxModule,
        FlexLayoutModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        NavComponent,
        LoginComponent,
        ErrorComponent
    ],
    bootstrap: [ AppComponent,NavComponent ],
    providers :[AuthGuard,BackendService,loginService]
})
export class AppModule { 
   
    constructor(private _loginService: loginService){
        _loginService.googleInit();
    }

}
