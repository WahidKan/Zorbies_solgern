import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SalesdashboardComponent } from './salesdashboard/salesdashboard.component';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { OperationdashboardComponent } from './operationdashboard/operationdashboard.component';
import { BankdashboardComponent } from './bankdashboard/bankdashboard.component';
import { DashboardInitializerComponent } from './dashboard-initializer.component';
import { DashboardContainerComponent } from './dashboard-container.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditdashboardwidgetComponent } from './otheruserdashboard/add-editdashboardwidget.component';
import { WidgetComponent } from './widget/widget.component';
import { ListwidgetComponent } from './widget/listwidget/listwidget.component';
import { AnnoucementwidgetComponent } from './widget/annoucementwidget/annoucementwidget.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { accdashboard } from './accountmanagerdashboard/accdashboard.component';
import { CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts';
import { EditService, PageService, SortService, FilterService, GroupService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtheruserdashboardComponent } from './otheruserdashboard/otheruserdashboard.component';
import { LoanDocumentPopModelComponent } from './loan-document-pop-model/loan-document-pop-model.component';
import { LoanApplicationModule } from '../loanapplication/loanapplication.module';
import { ServiceAppointmentComponent } from './service-appointment/service-appointment.component';
import { GetContractPopUpModelComponent } from './get-contract-pop-up-model/get-contract-pop-up-model.component';
import { GetProposalPopUpModelComponent } from './get-proposal-pop-up-model/get-proposal-pop-up-model.component';
import { UnSignedDocumentPopUpModelComponent } from './un-signed-document-pop-up-model/un-signed-document-pop-up-model.component';
import { MobileViewsComponent } from './mobile-views/mobile-views.component';
import { MobileViewsStatemangementComponent } from './mobile-views-statemangement/mobile-views-statemangement.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';





@NgModule({
  declarations: [
    DashboardComponent
    , SalesdashboardComponent
    , CustomerdashboardComponent
    ,accdashboard
    , OperationdashboardComponent
    , BankdashboardComponent
    , DashboardInitializerComponent
    , DashboardContainerComponent, OtheruserdashboardComponent, AddEditdashboardwidgetComponent, WidgetComponent, ListwidgetComponent, AnnoucementwidgetComponent, LoanDocumentPopModelComponent, ServiceAppointmentComponent, GetContractPopUpModelComponent, GetProposalPopUpModelComponent, UnSignedDocumentPopUpModelComponent, MobileViewsComponent, MobileViewsStatemangementComponent, CustomerHeaderComponent],
 
  imports: [
    FormsModule,
    HttpClientModule,
    ButtonModule,
    CommonModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    SharedModule,
    ModalModule,
    LoanApplicationModule,
    ReactiveFormsModule,
    CarouselModule
   
  ],
  exports:[CustomerHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class DashboardModule { }
