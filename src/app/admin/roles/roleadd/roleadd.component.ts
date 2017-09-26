import { NgForm } from '@angular/forms/';
import { RoleService } from './../roles.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-roleadd',
  templateUrl: './roleadd.component.html',
  styleUrls: ['./roleadd.component.css']
})
export class RoleaddComponent implements OnInit {
  @ViewChild('roleaddform') useraddform: NgForm;
  @ViewChild('savebtn') savebtn: ElementRef;
  constructor(private rolesService: RoleService) { }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.useraddform);
    this.rolesService.addNewRole(
      this.useraddform.value.name
    ).subscribe((data)=>console.log(data));
  }
}
