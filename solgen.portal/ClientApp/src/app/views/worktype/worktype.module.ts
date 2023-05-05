import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorktypelistComponent } from './worktypelist.component';
import { WorktypeRoutingModule } from './worktype-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { WorktypeService } from './worktype.service';
import { AddeditworktypeComponent } from './addeditworktype.component';
import { WorktypeviewComponent } from './worktypeview.component';
import { ColorPickerModule } from 'primeng/colorpicker';
@NgModule({
  declarations: [WorktypelistComponent, AddeditworktypeComponent, WorktypeviewComponent],
  imports: [
    CommonModule,
    WorktypeRoutingModule, ColorPickerModule,
    SharedModule, ModalModule.forRoot()
  ],
  providers: [WorktypeService],
  bootstrap: []
})
export class WorktypeModule { }
