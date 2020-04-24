import { History } from './../models/history';
import { HistoryService } from './../services/history.service';

import {HttpClient } from '@angular/common/http';
import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {merge, Observable,BehaviorSubject, fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {DataSource} from "@angular/cdk/table";
import { SelectionModel } from '@angular/cdk/collections';
import { ReturnDialogComponent } from './dialogs/return/return.dialog.component';


@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {


  displayedColumns: string[] = ['id', 'isbn', 'bookId','return'];

  exampleDatabase: HistoryService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<History>(true, []);
  id: number;
  status:String;
  public data: any;

  selectedCount = 0;
  maxCount = 5;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: HistoryService,) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }
  
  private refreshTable() {
    
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  returnBook(id:number){
  // this.id=id;
  // this.status="AVAILABLE";
  // this.data={id:id,status:this.status}
  // this.dataService.updateBookStatus(this.data);
  // this.refreshTable();
  this.id=id;
  this.status="AVAILABLE";
  const dialogRef = this.dialog.open(ReturnDialogComponent, {
    data: {id: id, status:this.status}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
      // for delete we use splice in order to remove single object from DataService
      this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      this.refreshTable();
    }
  });
  }


  public loadData() {
    this.exampleDatabase = new HistoryService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
    // .debounceTime(150)
    // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}

export class ExampleDataSource extends DataSource<History> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: History[] = [];
  renderedData: History[] = [];

  constructor(public _exampleDatabase: HistoryService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<History[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getLoanedBooks();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((history: History) => {
          const searchStr = (history.id+history.isbn+history.bookId).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: History[]): History[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'isbn': [propertyA, propertyB] = [a.isbn, b.isbn]; break;
       
        
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}




