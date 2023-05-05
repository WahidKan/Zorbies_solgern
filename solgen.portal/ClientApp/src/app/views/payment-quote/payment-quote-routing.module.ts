import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentQuoteListComponent } from './payment-quote-list.component';
import { AddEditPaymentQuoteComponent } from './add-edit-payment-quote.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: PaymentQuoteListComponent, canActivate: [AuthGuard], data: { title: 'Payment Quote' }
  },
  {
    path: 'edit/:id', component: AddEditPaymentQuoteComponent, canActivate: [AuthGuard], data: { title: 'Edit Payment Quote' }
  },
  {
    path: 'add', component: AddEditPaymentQuoteComponent, canActivate: [AuthGuard], data: { title: 'Add Payment Quote' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentQuoteRoutingModule { }
