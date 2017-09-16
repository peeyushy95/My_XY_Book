import { Injectable }       from '@angular/core';
import {CanActivate,CanActivateChild,Router,ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {loginService} from './login.service';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private authService: loginService,private location: Location) {
                    authService.googleInit();
                 }
  
    canActivate() {
      
      if (this.authService.isLoggedIn()) {
        return true;
      }
      
      this.router.navigate(['login']);
      return false;     

    }

  }