import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaseinventoryreportComponent } from './leaseinventoryreport/leaseinventoryreport.component';
import { WelcomepackagetrackingreportComponent } from './welcomepackagetrackingreport/welcomepackagetrackingreport.component';
import { TitleworkrequestreportComponent } from './titlworkrequestreport/titleworkrequestreport.component';
import { CustomerLogReportComponent } from './customer-log-report/customer-log-report.component';
import { MonthlyleaselogComponent } from './monthlyleaselog/monthlyleaselog.component';
import { LeasetrackingreportlistComponent } from './leasetrackingreport/leasetrackingreportlist.component';
import { CreditreporttrackingComponent } from './creditreporttraking/creditreporttracking.component';
import { CommissionpaidreportComponent } from './commissionpaidreport/commissionpaidreport.component';
import { InsurancetrackingComponent } from './insurancetracking/insurancetracking.component';
import { LeasevolumereportComponent } from './leasevolumereport/leasevolumereport.component';



const routes: Routes = [
  { path: '',  },
  { path: 'leaseinventoryreport', component: LeaseinventoryreportComponent, data: { moduleCode: '8004' }},
  { path: 'welcomereport', component: WelcomepackagetrackingreportComponent, data: { moduleCode: '8003' } },
  { path: 'titleworkrequestreport', component: TitleworkrequestreportComponent, data: { moduleCode: '8002' } },
  { path: 'customerlogreport', component: CustomerLogReportComponent, data: { moduleCode: '8001' } },
  { path: 'MonthlyLeaselogreport', component: MonthlyleaselogComponent, data: { moduleCode: '8005' } },
  { path: 'leasetrackingreport', component: LeasetrackingreportlistComponent, data: { moduleCode: '8006' } },

  { path: 'creditreporttracking', component: CreditreporttrackingComponent, data: { moduleCode: '8009' } },
  { path: 'commissionpaidreport', component: CommissionpaidreportComponent, data: { moduleCode: '8007' }},
  { path: 'insurancetracking', component: InsurancetrackingComponent, data: { moduleCode: '8010' } },
  { path: 'leasevolumereport', component: LeasevolumereportComponent, data: { moduleCode: '8008' } },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
