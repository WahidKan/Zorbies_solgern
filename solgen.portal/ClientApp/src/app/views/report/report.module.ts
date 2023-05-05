import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaseinventoryreportComponent } from './leaseinventoryreport/leaseinventoryreport.component';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WelcomepackagetrackingreportComponent } from './welcomepackagetrackingreport/welcomepackagetrackingreport.component';
import { CustomerLogReportComponent } from './customer-log-report/customer-log-report.component';
import { TitleworkrequestreportComponent } from './titlworkrequestreport/titleworkrequestreport.component';
import { MonthlyleaselogComponent } from './monthlyleaselog/monthlyleaselog.component';
import { LeasetrackingreportlistComponent } from './leasetrackingreport/leasetrackingreportlist.component';
import { ChartModule } from 'primeng/chart';
import { CreditreporttrackingComponent } from './creditreporttraking/creditreporttracking.component';
import { CommissionpaidreportComponent } from './commissionpaidreport/commissionpaidreport.component';
import { InsurancetrackingComponent } from './insurancetracking/insurancetracking.component';
import { LeasevolumereportComponent } from './leasevolumereport/leasevolumereport.component';
@NgModule({
  declarations: [LeaseinventoryreportComponent, WelcomepackagetrackingreportComponent, CustomerLogReportComponent,
    TitleworkrequestreportComponent, InsurancetrackingComponent, MonthlyleaselogComponent,
    LeasetrackingreportlistComponent, LeasevolumereportComponent, CreditreporttrackingComponent,
    CommissionpaidreportComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    ChartModule
  ]
})
export class ReportModule { }
