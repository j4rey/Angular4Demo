import { Subscription } from 'rxjs/Rx';
import { HeaderMenu } from './headermenu.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs,Headers } from '@angular/http';

import { LoginService } from './../../auth/login/login.service';

@Injectable()
export class HeaderService {
    Menu : HeaderMenu;
    headerSubscription: Subscription = null;
    constructor(private http:Http,private loginservice:LoginService){
        if(loginservice.isUserLoggedIn()){
            this.headerSubscription = this.getHeaderMenu().subscribe(
                (data)=>{
                    console.log(data);
                    this.headerSubscription.unsubscribe();
                }
            )
        }
    }

    getHeaderMenu(){
        var header = new Headers({'Authorization':'Basic '+ btoa(this.loginservice.currentUser.username+":"+this.loginservice.currentUser.password)});
        
        return this.http.get('http://localhost:60091/api/Employee/GetHeaderMenu',{headers:header});
    }
}
