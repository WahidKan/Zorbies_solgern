import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { CompanyIntegrationSettingComponent } from './company-integration-setting/company-integration-setting.component';


const routes: Routes = [{path: '', component: CompanyIntegrationSettingComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyIntegrationSettingRoutingModule { }
