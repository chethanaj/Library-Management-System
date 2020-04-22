import { User } from './../models/user';
import { History } from './../models/history';

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HistoryService {
  private readonly LEND_BOOK = 'http://localhost:8081/lend-api/lend/';



  public userID:number
   
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    })
  };


  dataChange: BehaviorSubject<History[]> = new BehaviorSubject<History[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): History[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */

  getHistory(id:number): void {
    //console.log(this.userID);
    this.httpClient.get<History[]>(this.LEND_BOOK+id,this.httpOptions).subscribe(data=>{
      this.dataChange.next(data);
      // this.userID=data.id;
     
      // this.httpClient.get<History[]>(this.LEND_BOOK+this.userID,this.httpOptions).subscribe(data => {
        
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
   // });
    //console.log(this.userID);
    
  }

  getLoanedBooks():void{
    this.httpClient.get<History[]>(this.LEND_BOOK,this.httpOptions).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  
  
}








