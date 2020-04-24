import { User } from './../models/user';
import {HttpClient } from '@angular/common/http';
import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { BookService } from "../services/book.service";


import {merge, Observable,BehaviorSubject, fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {Bookapi} from "../models/bookapi";
import {DataSource} from "@angular/cdk/table";
import { SelectionModel } from '@angular/cdk/collections';
import { LendDialogComponent } from './dialogs/lend/lend.dialog.component';


@Component({
  selector: 'app-lend-book',
  templateUrl: './lend-book.component.html',
  styleUrls: ['./lend-book.component.css']
})
export class LendBookComponent implements OnInit {

  displayedColumns: string[] = ['id', 'isbn', 'title', 'subject', 'publisher', 'language', 'noOfPages','authors','lend'];

  exampleDatabase: BookService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Bookapi>(true, []);
  id: number;

  selectedCount = 0;
  maxCount = 5;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: BookService) {
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

  addLendBook(id:number,isbn:string,title:string){
  this.id=id;
  const dialogRef = this.dialog.open(LendDialogComponent, {
    data: {bookId: id, isbn: isbn, customerId:localStorage.getItem('userId')}
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
    this.exampleDatabase = new BookService(this.httpClient);
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

export class ExampleDataSource extends DataSource<Bookapi> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Bookapi[] = [];
  renderedData: Bookapi[] = [];

  constructor(public _exampleDatabase: BookService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Bookapi[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAvailableBooks();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((book: Bookapi) => {
          const searchStr = (book.id + book.title + book.isbn + book.subject+book.language).toLowerCase();
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
  sortData(data: Bookapi[]): Bookapi[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'language': [propertyA, propertyB] = [a.language, b.language]; break;
        case 'isbn': [propertyA, propertyB] = [a.isbn, b.isbn]; break;
        case 'subject': [propertyA, propertyB] = [a.subject, b.subject]; break;
        
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}


