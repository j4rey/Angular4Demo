import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';

import { LoginService } from './login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private loginService: LoginService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(this.loginService.isUserLoggedIn()){
            return true;
        }

        this.router.navigate(['\login'],{queryParams:{returnurl:state.url}});
        return false;
    }

}