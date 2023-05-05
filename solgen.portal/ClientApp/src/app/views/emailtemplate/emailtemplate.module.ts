import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailtemplateRoutingModule } from './emailtemplate-routing.module';
import { EmailtemplateAddEditComponent } from './emailtemplate-add-edit.component';
import { EmailtemplateListingComponent } from './emailtemplate-listing.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [EmailtemplateListingComponent, EmailtemplateAddEditComponent],
  imports: [
    CommonModule,
    EmailtemplateRoutingModule,    
    NgSelectModule,
    NgxDatatableModule,
    SharedModule,
    CKEditorModule
  ]
})
export class EmailtemplateModule { }
