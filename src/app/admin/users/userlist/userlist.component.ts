import { LoginService } from './../../../auth/login/login.service';
import { Component, OnInit } from '@angular/core';
import {  Headers } from '@angular/http';

import { UserService } from './../users.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users= [];

  constructor(private usersService: UserService,private loginservice: LoginService) { }

  ngOnInit() {
    var header: Headers = new Headers({'Authorization':'Basic '+ btoa(this.loginservice.currentUser.username+":"+this.loginservice.currentUser.password)});
    this.usersService.getUserLists(header).subscribe(
      (data)=>{
        //console.log(data);
        this.users = data;
      }
    );
  }

  getUsers(){
    return this.users;
  }
}
