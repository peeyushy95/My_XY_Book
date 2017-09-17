import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './start/app.component';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './shared/app.routing';
import {MdButtonModule, MdCheckboxModule,MdListModule,MdCardModule,MdInputModule} from '@angular/material';

import { NavComponent } from './shared/navbar.component';
import { LoginComponent } from './login/login.component';
import { TopicComponent} from './topic/topic.component'
import { ErrorComponent } from './error/error.component';
import {TopicSorting} from "./topic/orderby.pipe";

import { loginService } from './shared/authorization/login.service';  
import {AuthGuard} from './shared/authorization/authGuard.service';
import {BackendService} from './services/backend.service';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdButtonModule, 
        MdListModule,
        HttpModule,
        FormsModule,
        MdCardModule,
        MdCheckboxModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        NavComponent,
        LoginComponent,
        TopicComponent,
        ErrorComponent,
        TopicSorting
    ],
    bootstrap: [ AppComponent,NavComponent ],
    providers :[AuthGuard,BackendService,loginService]
})
export class AppModule { 
   
    constructor(private _loginService: loginService){
        _loginService.googleInit();
    }

}
