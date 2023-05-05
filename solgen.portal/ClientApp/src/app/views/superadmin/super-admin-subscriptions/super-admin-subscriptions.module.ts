import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SuperAdminSubscriptionsRoutingModule } from './super-admin-subscriptions-routing.module';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SharedModule } from '../../shared/shared.module';
import { AddEditSubscriptionComponent } from './add-edit-subscription/add-edit-subscription.component';
import { SubscriptionViewComponent } from './subscription-view/subscription-view.component';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';
import { PlanAndAddonDetailsComponent } from './plan-and-addon-details/plan-and-addon-details.component';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';


@NgModule({
  declarations: [
    SubscriptionListComponent,
    AddEditSubscriptionComponent,
    SubscriptionViewComponent,
    RecentActivitiesComponent,
    PlanAndAddonDetailsComponent,
    ResetPasswordModalComponent
  ],
  imports: [
    CommonModule,
    SuperAdminSubscriptionsRoutingModule,
  FormsModule, ReactiveFormsModule, NgSelectModule, NgxDatatableModule, SharedModule, ModalModule,
  NgxPasswordToggleModule
  ]
})
export class SuperAdminSubscriptionsModule { }
