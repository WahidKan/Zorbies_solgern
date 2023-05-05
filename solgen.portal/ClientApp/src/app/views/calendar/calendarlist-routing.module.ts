import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarListComponent } from './calendarlist.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: CalendarListComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarListRoutingModule { }
