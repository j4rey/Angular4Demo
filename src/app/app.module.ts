
import { SocialModule } from './social/social.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { SocialListComponent } from './social/social-list.component';
import { SocialService } from './social/social.service';
import { PaginationModule } from './core/pagination/pagination.module';
import { ScrollLoad } from "./social/social-list-scroll/scroll-load.directive";

const appRoutes: Routes = [
  {path:'',component:HomeComponent, pathMatch:'full'}
  
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    SocialModule,
    PaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
