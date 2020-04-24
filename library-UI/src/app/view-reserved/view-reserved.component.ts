import { RemoveReserveDialogComponent } from 'src/app/view-reserved/dialogs/removeReserve/removeReserve.dialog.component';
import { ReservationService } from './../services/reservation.service';
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
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-view-reserved',
  templateUrl: './view-reserved.component.html',
  styleUrls: ['./view-reserved.component.css']
})
export class ViewReservedComponent implements OnInit {
 
  displayedColumns: string[] = ['id','isbn', 'bookId','customerId','creationDate','reserve'];

  exampleDatabase: ReservationService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Reservation>(true, []);
  id: number;
  
  public data: any;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: ReservationService,public _authService: AuthService) {
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

  removeReserveBook(id:number){
    this.id=id;
    const dialogRef = this.dialog.open(RemoveReserveDialogComponent, {
      data: {id: id}
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
    this.exampleDatabase = new ReservationService(this.httpClient,this._authService);
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

export class ExampleDataSource extends DataSource<Reservation> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Reservation[] = [];
  renderedData: Reservation[] = [];

  constructor(public _exampleDatabase: ReservationService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Reservation[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getReserveBooks();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((reserveBook: Reservation) => {
        
         const searchStr = ( reserveBook.id+reserveBook.customerId.toString()+reserveBook.bookId.toString()+reserveBook.isbn);
         return searchStr.indexOf(this.filter) != -1;
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
  sortData(data: Reservation[]): Reservation[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'userId': [propertyA, propertyB] = [a.customerId, b.customerId]; break;
       // case 'isbn': [propertyA, propertyB] = [a.isbn, b.isbn]; break;
       
        
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}





