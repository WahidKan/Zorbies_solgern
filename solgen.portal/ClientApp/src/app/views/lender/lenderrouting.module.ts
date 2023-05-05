import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DragDropModule } from 'primeng/dragdrop';
import { LenderlistComponent } from './lenderlist.component';
import { AddlenderComponent } from './addlender.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: LenderlistComponent, canActivate: [AuthGuard], data: { title: 'Lender' },
  },
  {
    path: 'addlender', component: AddlenderComponent, data: { privilegeCode: 'LENDERADD' }
  },
  {
    path: 'addlender/:id', component: AddlenderComponent, data: { privilegeCode: 'LENDERUPDATE' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), DragDropModule],
  exports: [RouterModule]
})
export class LenderRouting { }
