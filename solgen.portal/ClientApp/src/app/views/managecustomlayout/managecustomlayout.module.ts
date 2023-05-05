import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CustomLayoutlistComponent } from './managecustomlayoutlist.component';
import { CustomLayoutRoutingModule } from './managecustomlayout-routing.module';
import { DragDropModule } from 'primeng/components/dragdrop/dragdrop';
import { ColorPickerModule } from 'primeng/colorpicker';
import {OrderListModule} from 'primeng/orderlist';
import { AddeditcustomlayoutComponent } from './addeditcustomlayout.component';
import { PropertiespopupCustomComponent } from './viewpopupwindowcustom/propertiespopupcustom.component';
import { ConditionPopupComponent } from './conditionpopup/conditionpopup.component';
import { UserDefinedFieldsPopUpComponent } from './user-defined-fields-pop-up/user-defined-fields-pop-up.component';
@NgModule({
  declarations: [CustomLayoutlistComponent, AddeditcustomlayoutComponent, PropertiespopupCustomComponent, ConditionPopupComponent, UserDefinedFieldsPopUpComponent],
  imports: [
    CommonModule, ColorPickerModule,
    CustomLayoutRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, DragDropModule, OrderListModule,NgxDatatableModule, SharedModule, ModalModule
  ]
})
export class CustomLayoutModule { }
