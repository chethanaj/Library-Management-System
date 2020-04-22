import { ReservationService } from './../../../services/reservation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/reserve/reserve.dialog.html',
  styleUrls: ['../../dialogs/reserve/reserve.dialog.css']
})
export class ReserveDialogComponent {

  constructor(public dialogRef: MatDialogRef<ReserveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ReservationService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmReserve(): void {
    this.dataService.reserveBook(this.data);
  }
}
