import { Component, OnInit, HostListener } from '@angular/core';

import { SocialService } from './../social.service';
import { ScrollLoad } from "./scroll-load.directive";
@Component({
  selector: 'app-social-list-scroll',
  templateUrl: './social-list-scroll.component.html',
  styleUrls: ['./social-list-scroll.component.css']
})
export class SocialListScrollComponent implements OnInit {
  private _page: number = 0;
  private _fetchrows: number = 10;
  private _total: number;
  private socials = [];
  private isCallingApi = false;
  constructor(private socialService: SocialService) { }

  ngOnInit() {
    this.get(0,10);
  }

  functionFromDirective(data){
    //console.log('called from directive:'+data.count);
    console.log('called from directive');
    if(this.isCallingApi === false)
    {
      this.get(this._page+1,10);
      this.isCallingApi = true;
    }
  }

  get(page:number, count:number){
    this.socialService.getSocialList(page,count).subscribe((lst)=>{
        Array.prototype.push.apply(this.socials, lst.json().SSD);
        this._page = lst.json().currentPage;
        this._total  = lst.json().totalRows;
        console.log(lst.json().SSD);
        this.isCallingApi = false;
    },(err)=>{
        console.log(err);
    })
  }
}
