import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationsettingComponent } from './configurationsetting.component';
import { StageconfigComponent } from './stageconfig.component';
import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  { path: '', component: ConfigurationsettingComponent, canActivate: [AuthGuard]},
  { path: 'stageconfig', component: StageconfigComponent, canActivate: [AuthGuard] },
  //{ path: 'addlead', component: LeadAddEditComponent },
  //{ path: 'editlead/:id', component: LeadAddEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationSettingRoutingModule { }  
