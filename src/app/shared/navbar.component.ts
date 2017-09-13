import { Component } from '@angular/core';
import { loginService } from '../shared/authorization/login.service';  
import { Subscription }   from 'rxjs/Subscription';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'navi-bar',
    template: `
                
                <div class="navHeader">
                    <h3 class="top-bar-title">My _Xy Book</h3>
                    <button *ngIf="loggedin" class="signoutHeader" (click)=signOut()>Sign out</button>
                </div>
    `,
    styleUrls: ['./navbar.component.css'],
   // providers :[loginService]
})
export class NavComponent {
    
    loggedin: boolean = false;
    subscription:Subscription;
    constructor(private _loginService: loginService,private cd: ChangeDetectorRef ) { 
        var component = this;
        this.subscription = _loginService.userStatus.subscribe((value) => { 
            component.loggedin = value; 
            component.cd.detectChanges();
        });
    } ;

    
    signOut(){
        this._loginService.signOut();
    }
}