import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../shared/authorization/authGuard.service';
import { ErrorComponent } from '../error/error.component';
import {TopicComponent} from '../topic/topic.component';
import {BookComponent} from '../book/book.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {   
                path: '' , 
                redirectTo: '/login', 
                pathMatch:'full'},
            {   
                path: 'login', 
                component:LoginComponent,},
            {
                path: 'u',
                component: ErrorComponent,
                canActivate: [AuthGuard]},
            {
                path: 'topic',
                component: TopicComponent,
                canActivate: [AuthGuard]},
            {
                path: 'book',
                component: BookComponent,
                canActivate: [AuthGuard]},
            {   
                path: '**' , 
                component: ErrorComponent 
            }
        ])    
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

