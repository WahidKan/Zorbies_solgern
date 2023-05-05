import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditPaymentQuoteComponent } from './add-edit-payment-quote.component';
import { PaymentQuoteListComponent } from './payment-quote-list.component';
import { PaymentQuoteRoutingModule } from './payment-quote-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { QuotePreviewComponent } from './quote-preview.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [AddEditPaymentQuoteComponent, PaymentQuoteListComponent, QuotePreviewComponent],
  imports: [
    CommonModule,
    PaymentQuoteRoutingModule,
    NgSelectModule,
    NgxDatatableModule,
    SharedModule,
    ModalModule,
  ]
})
export class PaymentQuoteModule { }
