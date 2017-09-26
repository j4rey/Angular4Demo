import { UserService } from './../users.service';
import { NgForm } from '@angular/forms/';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css']
})
export class UseraddComponent implements OnInit {
  @ViewChild('useraddform') useraddform: NgForm;
  @ViewChild('savebtn') savebtn: ElementRef;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.useraddform);
    this.userService.addNewUser(
      this.useraddform.value.email,
      this.useraddform.value.username,
      this.useraddform.value.password
    ).subscribe((data)=>console.log(data));
  }
}
