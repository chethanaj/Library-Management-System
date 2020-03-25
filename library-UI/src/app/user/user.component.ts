import { UserService } from './../services/user.service';
import { User } from './../models/user';
import {HttpClient } from '@angular/common/http';
import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {merge, Observable,BehaviorSubject, fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {DataSource} from "@angular/cdk/table";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'contactNumber', 'address'];

  exampleDatabase: UserService | null;
  dataSource: ExampleDataSource | null;


  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: UserService) {
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
this.exampleDatabase = new UserService(this.httpClient);
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

export class ExampleDataSource extends DataSource<User> {
_filterChange = new BehaviorSubject('');

get filter(): string {
return this._filterChange.value;
}

set filter(filter: string) {
this._filterChange.next(filter);
}

filteredData: User[] = [];
renderedData: User[] = [];

constructor(public _exampleDatabase: UserService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
super();
// Reset to the first page when the user changes the filter.
this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
}

/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<User[]> {
// Listen for any changes in the base data, sorting, filtering, or pagination
const displayDataChanges = [
this._exampleDatabase.dataChange,
this._sort.sortChange,
this._filterChange,
this._paginator.page
];

this._exampleDatabase.getAllUsers();


return merge(...displayDataChanges).pipe(map( () => {
// Filter data
this.filteredData = this._exampleDatabase.data.slice().filter((user: User) => {
const searchStr = (user.id + user.firstName + user.lastName + user.email).toLowerCase();
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
// applyFilter(filterValue: string) {
//   filterValue = filterValue.trim(); // Remove whitespace
//   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
//   this.dataSource.filter = filterValue;
// }

/** Returns a sorted copy of the database data. */
sortData(data: User[]): User[] {
if (!this._sort.active || this._sort.direction === '') {
return data;
}

return data.sort((a, b) => {
let propertyA: number | string = '';
let propertyB: number | string = '';

switch (this._sort.active) {
case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
case 'lastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;
case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
case 'contactNumber': [propertyA, propertyB] = [a.contactNumber, b.contactNumber]; break;
}

const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
});
}

}
