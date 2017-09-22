import { StorageService } from './storage.service';
import { environment } from './../../../environments/environment';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx'
@Injectable()
export class LoginService{

    currentUser : User;

    constructor(private http:Http, private storage:StorageService){
        console.log("Cookie:");
        try{
        console.log(JSON.parse(this.storage.getItem(environment.userStorageKey)));
        //request web api to check if user exists

        this.currentUser = JSON.parse(this.storage.getItem(environment.userStorageKey));
        }catch(exception){}
    }

    getCurrentUserName(){
        return this.currentUser == null ? "":this.currentUser.username;
    }

    isUserLoggedIn(){
        return this.currentUser == null?false: this.currentUser.loginstatus==environment.userLoggedIn;
    }

    logout(){
        this.currentUser.loginstatus = environment.userLoggedOut;
        //this.storage.deleteItem(environment.userStorageKey);
        this.storage.setItem(environment.userStorageKey,JSON.stringify(this.currentUser));
    }

    login(username:string, password:string){

        var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        
        var body = "username=" + username + "&password=" + password;

        return this.http.post("http://localhost:60091/api/Employee/Login",
        body,
        {headers: headers}
        ).map(
            ( response) => {
                try{
                    const data = response.json();
                    if(data != "")
                    {
                        this.currentUser = new User(data.username,data.password,data.role,environment.userLoggedIn);
                        this.storage.setItem(environment.userStorageKey,JSON.stringify(this.currentUser));
                        return environment.loginSuccess;
                    }
                }catch(exception){
                    return environment.loginFailed;
                }
                return environment.loginFailed;
            }
        );
    }
}