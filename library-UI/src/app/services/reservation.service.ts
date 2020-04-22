import { Reservation } from './../models/reservation';


import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ReservationService {
  private readonly LEND_BOOK = 'http://localhost:8081/lend-api/reserve';



  public userID:number
   
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    })
  };


  dataChange: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Reservation[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */

  

  reserveBook(reservation:Reservation):void{
    this.httpClient.post<Reservation[]>(this.LEND_BOOK,reservation,this.httpOptions).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  
  
}








