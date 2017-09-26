import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoleService } from './../../roles/roles.service';
import { UserService } from './../users.service';

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css']
})
export class UserroleComponent implements OnInit {

  user:{Id:number,username:string}={Id:0,username:""};
  roles = [];
  allRoles;
  constructor(private userService: UserService, private roleService: RoleService, private route: ActivatedRoute) {
    //userid = this.route.snapshot.queryParams["id"];
    var userid = this.route.snapshot.queryParams["id"];
    if(userid!=""){
    this.userService.getUser(userid).subscribe((data)=>{
      
      this.user = data[0];
    });
    this.userService.getUserRoles(userid).subscribe((data)=>{
      //console.log(data);
      this.roles = data
    });

    this.roleService.getRoleLists().subscribe((data)=>{
      this.allRoles = data;
    });
  }
  }

  ngOnInit() {
  }

  addRoleToUser(roleid){
    for(var i =0 ;i < this.allRoles.length;i++){
      if(this.allRoles[i].Id===roleid){
        console.log(this.allRoles[i]);
        this.roles.push(this.allRoles[i].name);
      }
    }
  }

  UpdateUserRole(){
    console.log(this.roles);
    this.userService.UpdateUserRoles(this.user,this.roles).subscribe((data=>{
      console.log(data);
    }));
  }
}
