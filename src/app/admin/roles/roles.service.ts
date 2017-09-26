import { LoginService } from './../../auth/login/login.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class RoleService{

    roles;

    constructor(private http:Http, private loginservice : LoginService){}

    getRoleLists(){
        var header: Headers = new Headers({'Authorization':'Basic '+ btoa(this.loginservice.currentUser.username+":"+this.loginservice.currentUser.password)});
        return this.http.get('http://localhost:60091/api/Employee/GetRolesList',{headers:header})
        .map(
            (response: Response)=>{
                return response.json();
            }
        );
    }

    addNewRole(name: string){
        var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':'Basic '+ btoa(this.loginservice.currentUser.username+":"+this.loginservice.currentUser.password)
        });
        
        var body = "name=" + name;

        return this.http.post("http://localhost:60091/api/Employee/AddNewRole",
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