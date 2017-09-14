export class PagingData {
    currentPage:number;
    countOfDataToFetch:number;
    TotalCountOfData:number;

    constructor(currentPage:number,countOfDataToFetch:number,TotalCountOfData:number){
        this.currentPage = currentPage;
        this.countOfDataToFetch = countOfDataToFetch;
        this.TotalCountOfData = TotalCountOfData;
    }
}