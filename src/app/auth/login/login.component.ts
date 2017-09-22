import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { environment } from './../../../environments/environment';
import { NgForm } from '@angular/forms/';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Rx";

import { StorageService } from './storage.service';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') loginform: NgForm;
  @ViewChild('loginbtn') loginbtn: ElementRef;
  
  isLoggingIn: boolean = false;
  isLoggingFailed: boolean = false;
  loginAttemptCount: number = 0;
  
  loginSubscription: Subscription;
  
  txtUserName:string = "";

  returnUrl = "";

  constructor(public loginService: LoginService, public router: Router, public storage:StorageService,
    private route: ActivatedRoute
  ) { 
    this.txtUserName = this.loginService.getCurrentUserName();
  }
  
  ngOnInit() {
    this.route.queryParams.forEach((params: Params) => {
      if((params['returnurl']+"")=="undefined"){
        
      }
      else{
        this.returnUrl = params['returnurl']+""
      }
    });
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
      username :  this.loginService.getCurrentUserName()
    });
  }

  onSubmit() {
    if (!this.isLoggingIn) {
      this.isLoggingIn = true;
      this.loginAttemptCount++;
      this.loginSubscription = this.loginService.login(
        //this.loginform.value.username,
        this.txtUserName,
        this.loginform.value.password
      ).subscribe(
        (data) => {
          this.isLoggingIn = false;
          if (data == environment.loginSuccess) {
            this.isLoggingFailed = false;
            console.log("success" + this.returnUrl);

            if((this.returnUrl)!="undefined"){
              console.log("undefined return url");
               this.router.navigate([this.returnUrl]);
             }
            else{
              this.router.navigate(['']);
            }
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
