import { PagingData } from './pagingdata.model';
import { EventEmitter } from '@angular/core';

export class PaginationService {
    OnPagingClicked = new EventEmitter<PagingData>();

    paging_clicked(pd: PagingData){
        this.OnPagingClicked.emit(
            pd
        );
    }
    //Could be used to emit an even to request change in pagination controls thereby
    // making input() variable redundant
    // refreshPaginationEvent = new EventEmitter<PagingData>();
    // refreshPagination(
    //     pagingdata:PagingData
    // ){
    //     this.refreshPaginationEvent.emit(pagingdata);
    // }
}