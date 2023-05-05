import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailtrackingService } from './emailtracking.service';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { EmailtrackingComponent } from './emailtracking.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: EmailtrackingComponent }

];

@NgModule({
  declarations: [EmailtrackingComponent],
  imports: [

    CommonModule,
    CalendarModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule,
  
    
    RouterModule.forChild(routes)
  ]
})

export class EmailtrackingModule { }
