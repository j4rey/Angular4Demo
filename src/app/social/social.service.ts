import { LoginService } from './../auth/login/login.service';
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';

@Injectable()
export class SocialService{
    constructor(private http:Http,private loginservice:LoginService){}

    getAuthSocialList(page,count){
        //const header = new Headers({'Content-Type':'application/json'});
        console.log(this.loginservice.currentUser.username)
        console.log(this.loginservice.currentUser.password)
        
        const header = new Headers({'Authorization':'Basic '+ btoa(this.loginservice.currentUser.username+":"+this.loginservice.currentUser.password)});
        return this.http.get('http://localhost:60091/api/Employee/GetAuthList?count='+count+'&page='+page,{headers:header});
    }

    getSocialList(page,count){
        const header = new Headers({'Content-Type':'application/json'});
        return this.http.get('http://localhost:60091/api/Employee/GetList?count='+count+'&page='+page);
    }

    getNumberRows(){
        const header = new Headers({'Content-Type':'application/json'});
        return this.http.get('http://localhost:60091/api/Employee/GetCount');
    }
}