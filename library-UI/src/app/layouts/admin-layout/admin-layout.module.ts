
import { BookComponent } from '../../book/book.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DemoMaterialModule } from 'src/app/shared/shared.module';
import { AddBookComponent } from 'src/app/add-book/add-book.component';
import { UserComponent } from 'src/app/user/user.component';
import { EditDialogComponent } from 'src/app/book/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from 'src/app/book/dialogs/delete/delete.dialog.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
  
    
  ],
  declarations: [

    BookComponent,
    AddBookComponent,
    UserComponent,
    EditDialogComponent,
    DeleteDialogComponent
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AdminLayoutModule {}
