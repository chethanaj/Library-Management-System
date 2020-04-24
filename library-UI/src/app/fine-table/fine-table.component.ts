import { DueBookService } from './../services/dueBook.service';

import {HttpClient } from '@angular/common/http';
import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {merge, Observable,BehaviorSubject, fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {DataSource} from "@angular/cdk/table";
import { SelectionModel } from '@angular/cdk/collections';
import { DueBook } from '../models/dueBook';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-fine-table',
  templateUrl: './fine-table.component.html',
  styleUrls: ['./fine-table.component.css']
})
export class FineTableComponent implements OnInit {


  displayedColumns: string[] = ['isbn', 'bookId','issueDate','expectedReturnDate','lateDates','fine'];

  exampleDatabase: DueBookService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<DueBook>(true, []);
  //id: number;
  
  
  public data: any;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DueBookService,
              public _authService: AuthService) {
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

  


  public loadData() {
    this.exampleDatabase = new DueBookService(this.httpClient,this._authService);
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

export class ExampleDataSource extends DataSource<DueBook> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: DueBook[] = [];
  renderedData: DueBook[] = [];

  constructor(public _exampleDatabase: DueBookService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DueBook[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    
    this._exampleDatabase.getFineForUser();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((duebooks: DueBook) => {
          const searchStr = (duebooks.bookId.toString()+duebooks.isbn)
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          //return searchStr;
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
  sortData(data: DueBook[]): DueBook[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'userId': [propertyA, propertyB] = [a.userId, b.userId]; break;
       // case 'isbn': [propertyA, propertyB] = [a.isbn, b.isbn]; break;
       
        
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}






