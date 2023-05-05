import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListactivitylogComponent } from './listactivitylog.component';
import { ActivitylogService} from './activitylog.service';
import { ActivitylogRoutingModule } from './activitylog-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListactivitylogComponent
  ],
  imports: [
    CommonModule,
    ActivitylogRoutingModule,
    SharedModule,
    CalendarModule
  ],
  providers: [ActivitylogService],
  bootstrap: [ListactivitylogComponent]
})export class ActivitylogModule { }
