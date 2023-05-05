import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminAccessGuard } from 'src/app/auth/superAdminAccessGuard.guard';
import { AddEditSubscriptionComponent } from './add-edit-subscription/add-edit-subscription.component';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionViewComponent } from './subscription-view/subscription-view.component';


const routes: Routes = [
  { path: '', component: SubscriptionListComponent,  data: { usertype: "usertypesuperadmin" }, canActivate: [SuperAdminAccessGuard]},
  { path: 'subscription-list', component: SubscriptionListComponent,  data: { usertype: "usertypesuperadmin" }, canActivate: [SuperAdminAccessGuard]},
  { path: 'addEditSubscription', component: AddEditSubscriptionComponent,  data: { usertype: "usertypesuperadmin" }, canActivate: [SuperAdminAccessGuard]},
  { path: 'subscription-view', component: SubscriptionViewComponent,  data: { usertype: "usertypesuperadmin" }, canActivate: [SuperAdminAccessGuard]},
  { path: 'recent-activities', component: RecentActivitiesComponent,  data: { usertype: "usertypesuperadmin" }, canActivate: [SuperAdminAccessGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminSubscriptionsRoutingModule { }
