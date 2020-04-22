export interface Reservation {

    id:number;
    customerId: number;
    bookId:number;
    isbn:string;
    creationDate:Date;
    isReserved:boolean;
}
