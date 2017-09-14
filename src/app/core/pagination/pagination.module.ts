import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/*
Need to declare current-page, number-of-items-to-fetch, total-number-of-items

    private _page: number = 1;
    private _fetchrows: number = 10;
    private _total: number =50;

Need to create a function callback that accepts 'pagingdata:{page:number,count:number}' as
parameter. This function would call the service to fetch the array of data which would be 
saved in an array. This function would then save the current-page and/or number-of-items-to-fetch,
which would trigger the OnChange in PaginationComponent which would refresh the pagination values.
    paginationCallback(pagingdata:{page:number,count:number}){

        your-data-array = service.get(page,count)
        this._page = pagingdata.page; // Important to call
    }

Call your service to fetch the data on ngOnInit() to fetch the first array of data to display.
    ngOnInit() {
        this.paginationCallback({page:1,count:10});
    }

Add these tag to your component.html file and set the value.
You must map the values to your component.ts file variables.
As changes in your variable would trigger the refresh of the paginations.
    <app-pagination
        (onClicked)="paginationCallback($event)"
        [_total]="_total"
        [_currentpage]="_page"
        [_count]="_fetchrows"
        [maxNumberofPaginationToShow]="5"
    ></app-pagination>
 */

@NgModule({
    declarations:[
        PaginationComponent
    ],
    imports:[
        CommonModule
    ],
    exports:[PaginationComponent]
})
export class PaginationModule{
    
}