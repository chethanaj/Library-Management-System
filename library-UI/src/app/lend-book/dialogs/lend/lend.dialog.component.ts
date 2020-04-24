import { BookService } from '../../../services/book.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';



@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/lend/lend.dialog.html',
  styleUrls: ['../../dialogs/lend/lend.dialog.css']
})
export class LendDialogComponent {

  useId: any = localStorage.getItem('userId');
  constructor(public dialogRef: MatDialogRef<LendDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: BookService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmLend(): void {
    this.data.customerId = this.useId;
    this.dataService.issueBook(this.data);
  }
}
