import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, UserDetails } from '../_services/authentication.service';
import { Globalvar } from '../_shared/globals';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  current_user: UserDetails;  //get data defined in the UserDetails interface

  constructor(private router: Router, private authService: AuthenticationService, private globalVar: Globalvar)
  {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {
      const token = localStorage.getItem('access_token');
      if (token && token !== '' && token !== null && token !== 'null') {
        this.current_user = this.authService.getUserDetails();
        this.globalVar.isLoggedIn = true;
        // console.log(this.current_user.roleid+"\n"+next.data.ui);
        if(this.current_user.roleid == 2 && next.data.ui == "frontend"){
          //we can chk roles using only ui property but for security we've taken servers roleid also
          this.router.navigate(['/dashboard']);
          return false;          
        }
        else if(this.current_user.roleid == 3 && next.data.ui == "backend"){
          this.router.navigate(['/home']);
          return false;          
        }        
        else{
          return true;
        }
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
  }
}