import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileConfigurationsRoutingModule } from './file-configurations-routing.module';
import { AddEditFileConfigrationsComponent } from './add-edit-file-configrations/add-edit-file-configrations.component';
import { SharedModule } from '../shared/shared.module';
import { TreeviewfileconfigurationComponent } from './treeviewfileconfiguration/treeviewfileconfiguration.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';


@NgModule({
  declarations: [AddEditFileConfigrationsComponent, TreeviewfileconfigurationComponent],
  imports: [
    CommonModule,
    FileConfigurationsRoutingModule,
    SharedModule,
    ModalModule,
    TreeViewModule
  ]
})
export class FileConfigurationsModule { }
