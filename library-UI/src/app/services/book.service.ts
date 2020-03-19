import { Bookapi } from './../models/bookapi';

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BookService {
  private readonly VIEW_BOOK = 'http://localhost:8081/book-api/book';
  //private ADD_BOOK ='';

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  localStorage.getItem('token'),
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


    // // ADD, POST METHOD
    // addItem(kanbanItem: KanbanItem): void {
    //   this.httpClient.post(this.VIEW_BOOK, kanbanItem).subscribe(data => {
    //     this.dialogData = kanbanItem;
    //     this.toasterService.showToaster('Successfully added', 3000);
    //     },
    //     (err: HttpErrorResponse) => {
    //     this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    //   });
    //  }
  // DEMO ONLY, you can find working methods below

  //
  // updateIssue (issue: Issue): void {
  //   this.dialogData = issue;
  // }
  //
  // deleteIssue (id: number): void {
  //   console.log(id);
  // }
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




