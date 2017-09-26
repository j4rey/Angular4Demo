import { LoginService } from './../../auth/login/login.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class UserService{

    users;

    constructor(private http:Http, private loginservice : LoginService){}

    getUserLists(header: Headers){

        return this.http.get('http://localhost:60091/api/Employee/GetUsersList',{headers:header})
        .map(
            (response: Response)=>{
                return response.json();
            }
        );
    }

    addNewUser(email: string, username : string, password:string){
        var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':'Basic '+ btoa(this.loginservice.currentUser.username+":"+this.loginservice.currentUser.password)
        });
        
        var body = "email=" + email + "&password=" + password+"&username=" + username ;

        return this.http.post("http://localhost:60091/api/Employee/AddNewUser",
        body,
        {headers: headers}
        ).map(
            ( response) => {
                try{
                    const data = response.json();
                    if(data != "")
                    {
                        return "success";
                    }
                }catch(exception){
                    return "failed";
                }
                return "failed";
            }
        );
    }

    getUserRoles(userid: number): any {
        var header: Headers = new Headers({'Authorization':'Basic '+ btoa(this.loginservice.currentUser.username+":"+this.loginservice.currentUser.password)});
        return this.http.get('http://localhost:60091/api/Employee/GetUserRole?userid='+userid,{headers:header})
        .map(
            (response: Response)=>{
                return response.json();
            }
        );
    }

    getUser(userid): any {
        var header: Headers = new Headers({'Authorization':'Basic '+ btoa(this.loginservice.currentUser.username+":"+this.loginservice.currentUser.password)});
        return this.http.get('http://localhost:60091/api/Employee/GetUser?userid='+userid,{headers:header})
        .map(
            (response: Response)=>{
                return response.json();
            }
        );
    }

    UpdateUserRoles(user, roles){
        var headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization':'Basic '+ btoa(this.loginservice.currentUser.username+":"+this.loginservice.currentUser.password)
        });
        
        let params = new URLSearchParams();
        params.append('rolenames','val1');
        params.append('rolenames','val2');
        //var body = "rolenames=" + roles;
        var body = JSON.stringify({"user": user ,"roles":roles });

        //var body = JSON.stringify(user);

        //var body = JSON.stringify(user) +","+JSON.stringify(roles);

        console.log(body);

        //console.log(roles);
        return this.http.post("http://localhost:60091/api/Employee/UpdateUserRoles",
        body,
        {headers: headers}
        ).map(
            ( response) => {
                try{
                    const data = response.json();
                    if(data != "")
                    {
                        return "success";
                    }
                }catch(exception){
                    return "failed";
                }
                return "failed";
            }
        );
    }
}