import { Component, OnInit
} from '@angular/core';

import { SocialService } from './social.service';

@Component({
    selector: "social-list",
    templateUrl: './social-list.component.html',
    styleUrls: ['./social-list.component.css']
})
export class SocialListComponent implements OnInit{
    private _page: number = 1;
    private _fetchrows: number = 10;
    private _total: number;
    private isCallingApi = false;

    socials = [];

    ngOnInit(): void {
        this.get(1,10);
    }
    constructor(private socialService: SocialService) { }

    get(page:number, count:number){
        this.socialService.getSocialList(page-1,count).subscribe((lst)=>{
            this.socials = lst.json().SSD;
            this._page = lst.json().currentPage+1;
            this._total  = lst.json().totalRows;
            console.log(lst.json());
            this.isCallingApi = false;
        },(err)=>{
            console.log(err);
        })
    }

    paginationCallback(pagingdata:{page:number,count:number}){
        if(this.isCallingApi === false)
        {
            this.get(pagingdata.page,pagingdata.count);
            this.isCallingApi = true;
        }
    }
}