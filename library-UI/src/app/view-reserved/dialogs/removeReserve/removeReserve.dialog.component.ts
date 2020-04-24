import { ReservationService } from '../../../services/reservation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/removeReserve/removeReserve.dialog.html',
  styleUrls: ['../../dialogs/removeReserve/removeReserve.dialog.css']
})
export class RemoveReserveDialogComponent {

  constructor(public dialogRef: MatDialogRef<RemoveReserveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ReservationService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmReserve(): void {
    this.dataService.removeReserveBook(this.data.id);
  }
}
