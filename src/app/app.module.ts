import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpModule } from "@angular/http";


import { AppComponent } from './app.component';
import { SocialModule } from './social/social.module';
import { PaginationModule } from './core/pagination/pagination.module';
import { ScrollLoad } from "./social/social-list-scroll/scroll-load.directive";
import { SocialService } from './social/social.service';
import { LoginService } from './auth/login/login.service';
import { HomeComponent } from './core/home/home.component';
import { SocialListComponent } from './social/social-list.component';
import { LoginComponent } from './auth/login/login.component';
import { StorageService } from './auth/login/storage.service';
import { HeaderComponent } from './core/header/header.component';

const appRoutes: Routes = [
  {path:'',component:HomeComponent, pathMatch:'full'},
  {path:'login',component:LoginComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    SocialModule,
    PaginationModule
  ],
  providers: [LoginService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
