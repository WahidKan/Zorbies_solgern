import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from 'primeng/tree';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PricebookService } from './pricebook.service';
import { PricebookComponent } from './pricebook.component';
import { PricebookRoutingModule } from './pricebook-routing.module';
import { AddeditpricebookComponent } from './addeditpricebook.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { PricebookassociateproductComponent } from './associateproduct/pricebookassociateproduct.component';
import { AssociateproductviewComponent } from './associateproductviewdetail/associateproductview.component';

@NgModule({
  declarations: [
    PricebookComponent,
    AddeditpricebookComponent,
    PricebookassociateproductComponent,
    AssociateproductviewComponent,
    //AddeditcompayComponent,
   // RoleAddOrEditComponent
  ],
  imports: [
    CommonModule,
    PricebookRoutingModule,
    TreeModule,
    ModalModule,  
    SharedModule, CKEditorModule
  ],
  providers: [
    PricebookService
  ]
})
export class PricebookModule { }
