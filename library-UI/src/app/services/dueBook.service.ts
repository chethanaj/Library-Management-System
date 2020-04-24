import { DueBook } from './../models/dueBook';

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class DueBookService {
  private readonly LEND_BOOK = 'http://localhost:8081/lend-api/lend/';



  public userID:number
   
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    })
  };


  dataChange: BehaviorSubject<DueBook[]> = new BehaviorSubject<DueBook[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient,public _authService: AuthService) {}

  get data(): DueBook[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */

//allDueBooks
getDueBooks():void{

  let url = this.LEND_BOOK+'/dueBook/'+localStorage.getItem('userId');
  if(this._authService.isAdminLogin()){
    url = this.LEND_BOOK+'allDueBooks';
  }

    this.httpClient.get<DueBook[]>(url,this.httpOptions).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
   }

  ///dueBook/{id}

  getFineForUser():void{
   
    this.httpClient.get<DueBook[]>(this.LEND_BOOK+'dueBook/'+ localStorage.getItem('userId'),this.httpOptions).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
   }
  
}








