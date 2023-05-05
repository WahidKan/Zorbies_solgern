import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkuploadComponent } from './bulkupload.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: BulkuploadComponent, canActivate: [AuthGuard], data: { title: 'Customer Bulk Upload' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerbulkuploadRoutingModule { }
