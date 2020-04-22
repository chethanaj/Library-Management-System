import { DueBookService } from './../../../services/dueBook.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';



@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/due/due.dialog.html',
  styleUrls: ['../../dialogs/due/due.dialog.css']
})
export class DueDialogComponent {

  constructor(public dialogRef: MatDialogRef<DueDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DueBookService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmReturn(): void {
    //this.dataService.updateBookStatus(this.data);
  }
}
