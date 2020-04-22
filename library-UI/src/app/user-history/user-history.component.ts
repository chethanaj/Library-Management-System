import { HistoryService } from './../services/history.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {merge, Observable,BehaviorSubject, fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';
import {DataSource} from "@angular/cdk/table";
//import { EditDialogComponent } from '../book/dialogs/edit/edit.dialog.component';
import { History } from '../models/history';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'bookId', 'isbn', 'creationDate', 'returnDate'];


  exampleDatabase: HistoryService | null;
  dataSource: ExampleDataSource | null;
  id: number;
 
 

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: HistoryService) {
}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  ngOnInit(): void {
    this.loadData();
  }


  refresh() {
    this.loadData();
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
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
  
      //this._exampleDatabase.getUserByEmail();
      let x=localStorage.getItem("userId");
      var id = +x;
      this._exampleDatabase.getHistory(id);
  
  
      return merge(...displayDataChanges).pipe(map( () => {
          // Filter data
          this.filteredData = this._exampleDatabase.data.slice().filter((item: History) => {
            const searchStr = (item.id + item.bookId + item.isbn).toLowerCase();
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
        let propertyA: number | string |Date = '';
        let propertyB: number | string |Date = '';
  
        switch (this._sort.active) {
          case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
          case 'bookId': [propertyA, propertyB] = [a.bookId, b.bookId]; break;
          case 'isbn': [propertyA, propertyB] = [a.isbn, b.isbn]; break;
          //case 'creationDate': [propertyA, propertyB] = [a.creationDate, b.creationDate]; break;
          //case 'returnDate': [propertyA, propertyB] = [a.returnDate, b.returnDate]; break;
          
        }
  
        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


