
import { BookComponent } from '../../book/book.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DemoMaterialModule } from 'src/app/shared/shared.module';
import { AddBookComponent } from 'src/app/add-book/add-book.component';
import { UserComponent } from 'src/app/user/user.component';



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
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AdminLayoutModule {}
