import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditFileConfigrationsComponent } from './add-edit-file-configrations/add-edit-file-configrations.component';


const routes: Routes = [
  { path: '', component: AddEditFileConfigrationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileConfigurationsRoutingModule { }
