import {Injectable,NgZone} from '@angular/core';  

import { Router } from '@angular/router';
import {Subject} from 'rxjs/Subject';
declare const gapi: any; 


 @Injectable()
 export class loginService {  
    public auth2: any; 
    public loggedin: boolean;
    userStatus:Subject<boolean> = new Subject<boolean>();

    constructor(private _ngZone: NgZone,private router: Router){
      //window['onSignIn'] = (user) => _ngZone.run(() => this.onSignIn(user));
    }
    public googleInit() {
        var self = this;
        gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
            client_id: '938808320140-nlcvqgu7agdvr4tgnkaekisooieuctj3.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: 'profile email'
          });
          self.onSignIn1(document.getElementById('customBtn'));      
        });        
    }

    public updateStatus(status){
        this.userStatus.next(status);
    }

    public onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('Token || ' + googleUser.getAuthResponse().id_token);
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      this.updateStatus(true);
      var auth2 = gapi.auth2.getAuthInstance();
      console.log(auth2.isSignedIn.get());
      this.router.navigateByUrl('u');
    }

    public onSignIn1(element) {
      var self = this;
      this.auth2.attachClickHandler(element, {},
        function(googleUser) {
          var profile = googleUser.getBasicProfile();
          console.log('Token || ' + googleUser.getAuthResponse().id_token);
          console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
          self.updateStatus(true);
          localStorage.setItem('currentUser', JSON.stringify({ username: profile.getName(), token: googleUser.getAuthResponse().id_token }));
          self.router.navigateByUrl('u');
        });
    }

    public signOut() {
        var that = this; 
         var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            console.log('User signed out.');
            localStorage.removeItem('currentUser');
            that.router.navigateByUrl('');
            location.reload();  
            that.updateStatus(false);

         });
    }

    public isLoggedIn(){
      if(localStorage.getItem('currentUser')){
        this.updateStatus(true);
        return true;
      }
      return false;      
    }

 } 