import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepasswordComponent } from './changepassword.component';
import { ChangepasswordRoutingModule } from './changepassword-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChangepasswordComponent],
  imports: [
    CommonModule, ChangepasswordRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule 
  ]
})
export class ChangePasswordModule { }
