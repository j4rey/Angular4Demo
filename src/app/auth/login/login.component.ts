import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterContentInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { environment } from './../../../environments/environment';
import { NgForm } from '@angular/forms/';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Rx";

import { StorageService } from './storage.service';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy,AfterViewChecked {
  ngAfterViewChecked(): void {
    this.loginform.form.patchValue({
      username : this.loginService.getCurrentUserName()
    });
  }
  @ViewChild('f') loginform: NgForm;
  @ViewChild('loginbtn') loginbtn: ElementRef;
  
  isLoggingIn: boolean = false;
  isLoggingFailed: boolean = false;
  loginAttemptCount: number = 0;
  
  loginSubscription: Subscription;
  
  constructor(public loginService: LoginService, public router: Router, public storage:StorageService) { }
  
  ngOnInit() {
  }
  
  ngOnDestroy(): void {
    if(this.loginSubscription != null){
      this.loginSubscription.unsubscribe();
    }
  }

  ShowCookie(){
    console.log("Cookie:");
    try{
    console.log(JSON.parse(this.storage.getItem(environment.userStorageKey)));
  }catch(exception){}
  }

  DeleteCookie(){
    this.storage.deleteItem(environment.userStorageKey)
  }

  patchVal(){
    this.loginform.form.patchValue({
      username : "hello"
    });
  }

  onSubmit() {
    if (!this.isLoggingIn) {
      this.isLoggingIn = true;
      this.loginAttemptCount++;
      this.loginSubscription = this.loginService.login(
        this.loginform.value.username,
        this.loginform.value.password
      ).subscribe(
        (data) => {
          this.isLoggingIn = false;
          if (data == environment.loginSuccess) {
            this.isLoggingFailed = false;
            console.log("success")
          }
          else {
            this.isLoggingFailed = true;
            console.log("fail")
          }
          this.loginSubscription.unsubscribe();
        }
        ,(error) => {
          this.router.navigate(['/']);
          this.loginSubscription.unsubscribe();
          return Observable.empty();
        }
        );
    }
  }
}
