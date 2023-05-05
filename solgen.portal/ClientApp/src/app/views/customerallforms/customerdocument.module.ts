import { CommonModule } from '@angular/common';
import { CustomerDocumentRoutingModule } from './customerdocument-routing.module';
import { CustomerdocumentlistComponent } from './customerdocumentlist.component';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
     CustomerdocumentlistComponent
    ],
  imports: [
      CommonModule
    , CustomerDocumentRoutingModule
    , SharedModule
  ]
})
export class CustomerDocumentModule { }
