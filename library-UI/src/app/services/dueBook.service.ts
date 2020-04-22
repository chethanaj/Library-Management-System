import { DueBook } from './../models/dueBook';

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

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

  constructor (private httpClient: HttpClient) {}

  get data(): DueBook[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */

//   getHistory(id:number): void {
//     //console.log(this.userID);
//     this.httpClient.get<History[]>(this.LEND_BOOK+id,this.httpOptions).subscribe(data=>{
//       this.dataChange.next(data);
//       // this.userID=data.id;
     
//       // this.httpClient.get<History[]>(this.LEND_BOOK+this.userID,this.httpOptions).subscribe(data => {
        
//       },
//       (error: HttpErrorResponse) => {
//         console.log (error.name + ' ' + error.message);
//       });
//    // });
//     //console.log(this.userID);
    
//   }

//allDueBooks
getDueBooks():void{
    this.httpClient.get<DueBook[]>(this.LEND_BOOK+'allDueBooks',this.httpOptions).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
   }

  
  
}








