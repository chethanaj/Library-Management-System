import { BookService } from '../../../services/book.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';



@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/return/return.dialog.html',
  styleUrls: ['../../dialogs/return/return.dialog.css']
})
export class ReturnDialogComponent {

  constructor(public dialogRef: MatDialogRef<ReturnDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: BookService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmReturn(): void {
    this.dataService.updateBookStatus(this.data);
  }
}
