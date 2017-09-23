import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './start/app.component';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './shared/app.routing';
import {MdButtonModule, MdCheckboxModule,MdListModule,MdMenuModule,MdDialogModule} from '@angular/material';
import {MdCardModule,MdInputModule,MdExpansionModule,MdTabsModule,MdIconModule} from '@angular/material';
import { NavComponent } from './shared/navbar.component';
import { LoginComponent } from './login/login.component';
import { TopicComponent } from './topic/topic.component';
import { BookComponent } from './book/book.component';
import { BookService } from './book/book.service';
import {AddPostDialog} from './book/dialog/addPost.component';
import { BookResolve } from './book/bookResolve.component';
import { ErrorComponent } from './error/error.component';
import { TopicSorting } from "./topic/orderby.pipe";
import { PanelComponent } from './book/dynamicPanel/panel.component';
import { loginService } from './shared/authorization/login.service';  
import { AuthGuard } from './shared/authorization/authGuard.service';
import { BackendService } from './services/backend.service';
import { DialogPanelComponent } from './book/dialogdynamicPanel/dialogpanel.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdIconModule,
        MdButtonModule, 
        MdListModule,
        HttpModule,
        MdDialogModule,
        FormsModule,
        MdCardModule,
        MdMenuModule,
        MdCheckboxModule,
        AppRoutingModule,
        MdExpansionModule,
        MdTabsModule
    ],
    declarations: [
        AppComponent,
        NavComponent,
        LoginComponent,
        TopicComponent,
        ErrorComponent,
        TopicSorting,
        BookComponent,
        PanelComponent,
        AddPostDialog,
        DialogPanelComponent
    ],
    entryComponents: [AddPostDialog],
    bootstrap: [ AppComponent,NavComponent ],
    providers :[AuthGuard,BackendService,loginService,BookResolve,BookService]
})
export class AppModule { 
   
    constructor(private _loginService: loginService){
        _loginService.googleInit();
    }

}
