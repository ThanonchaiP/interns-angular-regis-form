import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatTableModule} from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ShowaddressComponent } from './showaddress/showaddress.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [IndexComponent, ShowaddressComponent],
  imports: [
    CommonModule, 
    HomeRoutingModule,
    MatTableModule,
    MatChipsModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule

  
  ],
})


export class HomeModule {}
