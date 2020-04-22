import { Bookapi } from './../models/bookapi';

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BookService {
  private readonly VIEW_BOOK = 'http://localhost:8081/book-api/book';
  private readonly VIEW_LEND = 'http://localhost:8081/lend-api/book';

  //private ADD_BOOK ='';

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    })
  };


  dataChange: BehaviorSubject<Bookapi[]> = new BehaviorSubject<Bookapi[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Bookapi[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllBooks(): void {
    this.httpClient.get<Bookapi[]>(this.VIEW_BOOK,this.httpOptions).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  getAvailableBooks():void{
    this.httpClient.get<Bookapi[]>(this.VIEW_BOOK+'/availableBooks',this.httpOptions).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  //loanedBooks
  getLoanedBooks():void{
    this.httpClient.get<Bookapi[]>(this.VIEW_BOOK+'/loanedBooks',this.httpOptions).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  //updateStatus/{id}
  updateBook (book: Bookapi): void {
  this.httpClient.post<any>('http://localhost:8081/book-api/book/'+book.id,book,this.httpOptions).subscribe();
      
  }
  //
  deleteBook(id: number): void {
    this.httpClient.delete<any>('http://localhost:8081/book-api/book/'+id,this.httpOptions).subscribe();
    
  }

  //after return book
  updateBookStatus(book:Bookapi):void{
    this.httpClient.post<any>('http://localhost:8081/lend-api/lend/return/'+book.id,book,this.httpOptions).subscribe();
      
  }

  issueBook(book:History):void{
    this.httpClient.post<any>('http://localhost:8081/lend-api/lend',book,this.httpOptions).subscribe();
      
  }
}



//REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:


   /* // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




