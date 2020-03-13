//import { Component, OnInit } from '@angular/core';

import {HttpClient,HttpHeaders } from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {merge, Observable, of as observableOf, from} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';



@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements AfterViewInit {

  displayedColumns: string[] = ['ID', 'ISBN', 'Title', 'Subject','Publisher','Language','NoOfPages','Status','Author(s)'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: BookApi[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) {}
 // ngOnInit(){}
  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {HttpHeaders 
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          //this.isRateLimitReached = false;
          //this.resultsLength = data.total_count;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          //this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => data);
  }
}

export interface BookApi {
  id: number;
  isbn:string;
  title:string;
  subject:string;
  publisher:string;
  language:string;
  noOfPages:string;
  status:string;
  authors:Authors[];
} 

export interface Authors {
  id:number;
  authorName: string;
  
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<BookApi> {
    const href = 'http://localhost:8081/book-api/book/avilableBooks';
    // const requestUrl =
    //     `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
        //let header = new HttpHeaders().set("Authorization",localStorage.getItem('token'));
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  localStorage.getItem('token')
          })
        };
       
    return this._httpClient.get<BookApi>(href,httpOptions);
  }
}
