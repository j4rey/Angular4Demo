import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './../auth/auth.guard';
import { SocialService } from './social.service';
import { SocialListComponent } from './social-list.component';
import { PaginationModule } from '../core/pagination/pagination.module';
import { BasicHighlight } from './social-list-scroll/highlight.directive';
import { ScrollLoad } from './social-list-scroll/scroll-load.directive';
import { SocialListScrollComponent } from './social-list-scroll/social-list-scroll.component';


const socialRoute: Routes = [
  {path:'social/list',component:SocialListComponent},
  {path:'social/listscroll',component:SocialListScrollComponent,canActivate:[AuthGuard]}
];

@NgModule({
    declarations: [
      SocialListComponent,
      SocialListScrollComponent,
      ScrollLoad,
      BasicHighlight
    ],
    imports: [
      CommonModule,
      HttpModule,
      RouterModule.forChild(socialRoute),
      PaginationModule
    ],
    providers: [SocialService,AuthGuard]
  })
  export class SocialModule { }