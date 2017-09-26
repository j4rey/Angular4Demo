
import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http';
import { LoginService } from './../../../auth/login/login.service';
import { RoleService } from './../roles.service';
@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.css']
})
export class RolelistComponent implements OnInit {
  roles;
  constructor(private roleService: RoleService,private loginservice: LoginService) { }

  ngOnInit() {
    
    this.roleService.getRoleLists().subscribe(
      (data)=>{
        //console.log(data);
        this.roles = data;
      }
    );
  }

}
