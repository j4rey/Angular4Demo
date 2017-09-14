import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private AllItems: number[] = [];
  private PagingData : number[]=[];

  private _page: number = 1;
  private _fetchrows: number = 10;
  private _total: number =50;

  constructor() { 
    
  }

  ngOnInit() {
    for(var i = 0;i< this._total;i++){
      this.AllItems.push(i);
    }
    this.paginationCallback({page:1,count:10});
  }

  paginationCallback(pagingdata:{page:number,count:number}){
    this.PagingData = this.AllItems.slice(
      (pagingdata.page-1)*pagingdata.count,pagingdata.page * pagingdata.count
    );
    this._page = pagingdata.page;
  }

}
