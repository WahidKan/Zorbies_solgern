import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoanapplicationlistComponent } from './loanapplicationlist.component';
import { LoanapplicationdetailComponent } from './loanapplicationdetail.component';
import { CanceledloanapplciationComponent } from './canceledloanapplciation/canceledloanapplciation.component';
import { NewLoanApplicationListComponent } from './new-loan-application-list/new-loan-application-list.component';
import { AuthGuard } from '../../auth/auth.guard';
import { PropertysearchComponent } from './propertysearch/propertysearch.component';
import { MasstransferComponent } from './masstransfer/masstransfer.component';
import { SFTPLogsComponent } from './sftplogs/sftplogs.component';
//import { StageconfigComponent } from './stageconfiguration/stageconfig.component';
//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';

const routes: Routes = [
  //{ path: '', component: LoanapplicationlistComponent },
  { path: '', component: NewLoanApplicationListComponent, canActivate: [AuthGuard]},
  { path: 'id', component: LoanapplicationlistComponent, canActivate: [AuthGuard]},
  { path: 'Detail/:id', component: LoanapplicationdetailComponent, canActivate: [AuthGuard] },
  { path: 'canceledloanapplciation', component: CanceledloanapplciationComponent, canActivate: [AuthGuard] },

  { path: 'masstransfer', component: MasstransferComponent, canActivate: [AuthGuard] },
  //{ path: 'loanApplciation/Detail/:id', component: LoanapplicationdetailComponent, canActivate: [AuthGuard] },
  //{ path: 'loanApplications/Cancelled/Detail/:id', component: LoanapplicationdetailComponent, canActivate: [AuthGuard] },
  //{ path: 'loanApplications/Completed/Detail/:id', component: LoanapplicationdetailComponent, canActivate: [AuthGuard] },

  { path: 'propertysearch', component: PropertysearchComponent },
  { path: 'sftplog', component: SFTPLogsComponent },
  
 //{ path: 'stageconfig', component: StageconfigComponent }
  //{ path: 'editbank/:id', component: AddeditbankComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanApplicationRoutingModule { }
