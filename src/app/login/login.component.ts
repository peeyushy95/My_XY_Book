import { Component, NgZone,OnInit,ChangeDetectorRef } from '@angular/core';
import { loginService } from '../shared/authorization/login.service';  


import {Router} from '@angular/router';

declare const gapi: any;
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'] ,
  //  providers :[loginService]
})
export class LoginComponent implements OnInit{

    
    textBoxClass:any;
    toplamClass:any;

    constructor(private _loginService: loginService,private _ngZone: NgZone, private cd: ChangeDetectorRef,
                private router: Router){
        this.textBoxClass = 'textbox';
        this.toplamClass = 'toplam';
     }  

    ngAfterViewInit(){
      //this._loginService.googleInit();
    }

    ngOnInit(){ 
        if(this._loginService.isLoggedIn()){
            this.router.navigateByUrl('u');
        }
    }
    
    moveleft(){
        this.textBoxClass = 'textboxN';
        this.toplamClass = 'toplamN';
    }

    moveright(){
        this.textBoxClass = 'textbox';
        this.toplamClass = 'toplam';
    }

    signOut(){
      this._loginService.signOut();
    }
    
    onSignIn(){
         this._loginService.onSignIn1('customBtn');
    }
}

