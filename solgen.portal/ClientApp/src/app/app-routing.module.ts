import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions} from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UnauthorizedComponent } from './views/shared/unauthorized/unauthorized.component';
import { ManagleaserequestlistComponent } from './views/managelease/leaserequest/managleaserequestlist.component';
import { AddeditleaserequestComponent } from './views/managelease/leaserequest/addeditleaserequest.component';
import { ComingSoonComponent } from './views/comingsoon/comingsoon.component';
import { CommenthistoryComponent } from './views/loanapplication/commenthistory/commenthistory.component';
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 30],
  onSameUrlNavigation: 'reload'
};
import { SolStageconfigurationComponent } from './views/shared/sol-stageconfiguration/sol-stageconfiguration.component';
import { LoanhomiAdverseEmailComponent } from './views/shared/loanhomi-adverse-email/loanhomi-adverse-email.component';
import { LoanhomiallreportlistComponent } from './views/loanhomireports/loanhomiallreportlist.component';
import { VideoChatComponent } from './views/video-chat/video-chat.component';
import { CustomerdashboardComponent } from './views/dashboard/customerdashboard/customerdashboard.component';
import { MobileAppLoginComponent } from './mobile-app-login/mobile-app-login.component';

const routes: Routes = [
  {
    path: 'uploadfiles',
    loadChildren: './views/uploaddocs/uploaddocs.module#UploaddocsModule',
    data: { preload: true, showHeader: false, showSidebar: false, moduleCode: '-1' }
  },
  { path: 'customer-dashboard', component: MobileAppLoginComponent,  data: { moduleCode: '199' }  },

  {
    path: 'customerannouncements',
    loadChildren: './views/customer-announcement/customer-announcement.module#CustomerAnnouncementModule',
    data: { moduleCode: '1011' }
  },
  {
    path: 'document-maker-routerule',
    loadChildren: './views/document-maker-route-rule/document-maker-route-rule.module#DocumentMakerRouteRuleModule',
    data: { moduleCode: '9027' }
  },
  {
    path: 'document-maker-submodule-mapping',
    loadChildren: './views/document-maker-sub-module-mapping/document-maker-sub-module-mapping.module#DocumentMakerSubModuleMappingModule',
    data: { moduleCode: '9026' }
  },

  {
    path: 'u',
    loadChildren: './views/uploaddocs/uploaddocs.module#UploaddocsModule',
    data: { preload: true, showHeader: false, showSidebar: false, moduleCode: '-1' }
  },

  { path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard], data: { moduleCode: '1' } },

   {
    path: 'super-admin-dashboard',
    loadChildren: './views/superadmin/super-admin-dashboard/super-admin-dashboard.module#SuperAdminDashboardModule', data: { moduleCode: '0', usertype: "usertypesuperadmin" }
  },
  {
    path: 'user', loadChildren: './views/manageuser/user.module#UserModule', canActivate: [AuthGuard], data: { moduleCode: '4003' },
    pathMatch: "prefix"
  },

  {
    path: 'manageskills', loadChildren: './views/manageskills/manageskills.module#ManageskillsModule', canActivate: [AuthGuard], data: { moduleCode: '9023' }
  },
  {
    path: 'managetimezone', loadChildren: './views/managetimezone/managetimezone.module#ManagetimezoneModule', canActivate: [AuthGuard], data: { moduleCode: '9424' }
  },
  {
    path: 'requirements', loadChildren: './views/requirementslist/requirements.module#RequirementsModule', canActivate: [AuthGuard], data: { moduleCode: '2453' }
  },

  {
    path: 'application/:companyId/:accountId/:id', loadChildren: './views/sendtoloanhomi/sendtoloanhomi.module#SendtoloanhomiModule', data: { showSidebar: false, moduleCode: '95845' }
  },


  { path: 'worktype', loadChildren: './views/worktype/worktype.module#WorktypeModule', canActivate: [AuthGuard], data: { moduleCode: '9022' } },
  { path: 'HtmlTemplate', loadChildren: './views/html-builderform/html-builderform.module#HtmlBuilderformModule', canActivate: [AuthGuard], data: { moduleCode: '9087' } },
  { path: 'proposal-document', loadChildren: './views/view-html-document/view-html-document.module#ViewHtmlDocumentModule', data: { preload: true, showHeader: false, showSidebar: false, moduleCode: '9007' } },
  //{ path: 'htmlBuilder', loadChildren: './views/html-builderform/html-builderform.module#HtmlBuilderformModule', canActivate: [AuthGuard], data: { moduleCode: '9082' } },

  { path: 'emailsettings', loadChildren: './views/emailsettings/emailsettings.module#EmailsettingsModule', canActivate: [AuthGuard], data: { moduleCode: '5210' } },
  { path: 'notifications', loadChildren: './views/notifications/notification.module#NotificationModule', canActivate: [AuthGuard], data: { moduleCode: '1021' } },
  { path: 'vendor', loadChildren: './views/vendor/vendor.module#VendorModule', canActivate: [AuthGuard], data: { moduleCode: '1001' } },
  { path: 'myprofile', loadChildren: './views/userprofile/userprofile.module#UserModule', canActivate: [AuthGuard], data: { moduleCode: '01101' } },
  { path: 'activitylog', loadChildren: './views/activitylog/activitylog.module#ActivitylogModule', canActivate: [AuthGuard], data: { moduleCode: 4411 } },
  { path: 'bank', loadChildren: './views/bank/bank.module#BankModule', canActivate: [AuthGuard], data: { moduleCode: '3021' } },
  { path: 'whatsnext', loadChildren: './views/whatsnext/whatsnext.module#WhatsnextModule', canActivate: [AuthGuard], data: { moduleCode: '5123' } },
  {
    path: 'account',
    loadChildren: './views/account/account.module#AccountModule',
    data: { preload: true, showHeader: false, showSidebar: false, moduleCode: '-1' },
    pathMatch: "prefix"
  },
  {
    path: 'common',
    loadChildren: './views/shared/shared.module#SharedModule',
    data: { preload: true, showHeader: false, showSidebar: false, moduleCode: '0' },
    pathMatch: "prefix"
  },
  {
    path: 'emailtemplates',
    loadChildren: './views/emailtemplate/emailtemplate.module#EmailtemplateModule',
    canActivate: [AuthGuard], data: { moduleCode: '4021' }
  },

  {
    path: 'lease',
    loadChildren: './views/managelease/managelease.module#ManageleaseModule',
    canActivate: [AuthGuard],
    data: { moduleCode: '102120' }
  },
  {
    path: 'rule-engine',
    loadChildren: './views/rule-engine/rule-engine.module#RuleEngineModule',
    data: { moduleCode: '5006' }
  },
  {
    path: 'solgen-rule-engine',
    loadChildren: './views/solgen-rule-engine/solgen-rule-engine.module#SolgenRuleEngineModule',
    data: { moduleCode: '9030' }
  },
  {
    path: 'operating-hours',
    loadChildren: './views/operating-hours/operating-hours.module#OperatingHoursModule',
    data: { moduleCode: '9030' }
  },
  {
    path: 'document-maker',
    loadChildren: './views/document-maker/document-maker.module#DocumentMakerModule',
    data: { moduleCode: '12131534' }
  },
  {
    path: 'document-maker-list',
    loadChildren: './views/document-maker-dynamic/document-maker-dynamic.module#DocumentMakerDynamicModule',
    data: { moduleCode: '9025' }
  },
  {
    path: 'flow',
    loadChildren: './views/work-flow/workflow.module#WorkflowModule',
    data: { moduleCode: '9024' }
  },
  {
    path: 'automation-flow',
    loadChildren: './views/flow-builder/flow-builder.module#FlowBuilderModule',
    canActivate: [AuthGuard],
    data: { moduleCode: '5074' }
  },
  {
    path: 'automation-flow-execution',
    loadChildren: './views/flow-automation-excution/flow-automation-excution.module#FlowAutomationExcutionModule',
    data: { moduleCode: '35021' }
  },
  {
    path: 'lease-request',
    component: ManagleaserequestlistComponent,
    canActivate: [AuthGuard],
    data: { moduleCode: '4311' }
  },
  {
    path: 'lease-request/addleaserequest',
    component: AddeditleaserequestComponent,
    canActivate: [AuthGuard], data: { moduleCode: '0' }
  },
  {
    path: 'lease-request/editleaserequest/:leaserequestId',
    component: AddeditleaserequestComponent,
    canActivate: [AuthGuard], data: { moduleCode: '0' }
  },
  {
    path: 'master',
    loadChildren: './views/master/master.module#MasterModule', data: { moduleCode: '0' }
  },
  {
    path: 'master-value',
    loadChildren: './views/master-values/master-values.module#MasterValuesModule',
    data: { moduleCode: '1995' }
  },
  {
    path: 'Tracker',
    loadChildren: './views/tracker/tracker.module#TrackerModule', data: { moduleCode: '3005' }
  },
  {
    path: 'changepassword',
    loadChildren: './views/changepassword/changepassword.module#ChangePasswordModule', data: { moduleCode: '0000001' }
  },
  {
    path: 'emailtracking',
    loadChildren: './views/emailtracking/emailtracking.module#EmailtrackingModule'
    , data: { moduleCode: '1361' }
  },
  //{
  //  path: 'widget',
  //  loadChildren: './views/widget/widget.module#WidgetModule', data: { moduleCode: '22' }
  //},
  {
    path: 'contract',
    loadChildren: './views/contract/contract.module#ContractModule', data: { moduleCode: '5002' }
  },
  {
    path: 'customer',
    loadChildren: './views/superadmin/super-admin-customer/super-admin-customer.module#SuperAdminCustomerModule', data: { moduleCode: '1102' }
  },
  {
    path: 'announcement',
    loadChildren: './views/announcement/announcement.module#AnnouncementModule', canActivate: [AuthGuard], data: { moduleCode: '5099' }
  },
  {
    path: 'salesforcesyncobject',
    loadChildren: './views/salesforcesyncobject/saleforcesyncstatus.module#SaleforceSyncStatusModule', data: { moduleCode: '60003' }
  },
  {
    path: 'workorder',
    loadChildren: './views/workorder/workorder.module#WorkorderModule', data: { moduleCode: '3008' }
  },
  //{
  //  path: 'modules',
  //  loadChildren: './views/managemodules/modules.module#ModulesModule', data: { moduleCode: '0' }
  //},
  {
    path: 'insurance',
    loadChildren: './views/manageinsurance/insurance.module#insuranceModule',
    canActivate: [AuthGuard], data: { moduleCode: '1706' }
  },
  {
    path: 'contact',
    loadChildren: './views/contact/contact.module#ContactModule',
    canActivate: [AuthGuard],
    data: { moduleCode: '1600' }
  },
  {
    path: 'statemanagement',
    loadChildren: './views/statemanagement/statemanagement.module#StatemanagementModule',
    canActivate: [AuthGuard],
    data: { moduleCode: '0001' }
  },

  //{
  //  path: 'mastername',
  //0 loadChildren: './views/mastername/mastername.module#MasternameModule', data: { moduleCode: '1312' }
  //},
  {
    path: 'paymentquote',
    loadChildren: './views/payment-quote/payment-quote.module#PaymentQuoteModule',
    canActivate: [AuthGuard], data: { moduleCode: '1312' }
  },

  {
    path: 'serviceresource',
    loadChildren: './views/serviceresource/serviceresource.module#ServiceresourceModule',
    canActivate: [AuthGuard], data: { moduleCode: '6402' }
  },
  {
    path: 'contact/welcomepackage',
    loadChildren: './views/welcome-package/welcomepackage.module#WelcomepackageModule', data: { moduleCode: '0' }
  },

  {
    path: 'customerallform',
    loadChildren: './views/customerallforms/customerdocument.module#CustomerDocumentModule', data: { moduleCode: '0' }
  },
  {
    path: 'leasefundingpackage',
    loadChildren: './views/leasefundingpackage/leasefundingpackage.module#LeaseFundingPackageModule',
    canActivate: [AuthGuard], data: { moduleCode: '1547' }
  },
  //{
  //  path: 'insurancerequest',
  //  loadChildren: './views/manageinsurancerequest/insurancerequest.module#InsuranceRequestModule',
  //  data: { preload: true, showSidebar: false },
  //  pathMatch: "prefix"
  //},
  {
    path: 'reports',
    loadChildren: './views/report/report.module#ReportModule', data: { moduleCode: '9555' }
  },
  {
    path: 'solgenreport',
    loadChildren: './views/solgenreport/solgenreport.module#SolgenreportModule', canActivate: [AuthGuard], data: { moduleCode: '4154' }
  },
  {
    path: 'role',
    loadChildren: './views/role/role.module#RoleModule',
    canActivate: [AuthGuard], data: { moduleCode: '4002' }
  },
  {
    path: 'customerbulkupload',
    loadChildren: './views/customerbulkupload/customerbulkupload.module#CustomerbulkuploadModule', data: { moduleCode: '4512' }
  },
  //{
  //  path: 'vendorleaserequest',
  //  loadChildren: './views/managevendorleaserequest/vendorleaserequest.module#VendorLeaseRequestModule',
  //  data: { preload: true, showSidebar: false },
  //  pathMatch: "prefix"
  //},
  { path: 'unauthorized', component: UnauthorizedComponent, data: { moduleCode: '1' } },
  {
    path: 'template',
    loadChildren: './views/managetemplate/managetemplate.module#ManageTemplateModule', data: { moduleCode: '8012' }
  },
  {
    path: 'addInsurance',
    loadChildren: './views/add-insurance/add-insurance.module#AddInsuranceModule', data: { moduleCode: '1710' }
  },
  {
    path: 'loanApplication',
    loadChildren: './views/loanapplication/loanapplication.module#LoanApplicationModule', data: { moduleCode: '5000' }
  },


  // OLD { path: 'loanApplications/Cancelled', component: NewLoanApplicationListComponent, data: { moduleCode: '5008' } },

  {
    path: 'loanApplications/Cancelled',
    loadChildren: './views/loanapplication/loanapplication.module#LoanApplicationModule', data: { moduleCode: '5000' }
  },



  // OLD { path: 'loanApplications/Completed', component: NewLoanApplicationListComponent, data: { moduleCode: '5009' } },
  {
    path: 'loanApplications/Completed',
    loadChildren: './views/loanapplication/loanapplication.module#LoanApplicationModule', data: { moduleCode: '5000' }
  },


  {
    path: 'loanTerm',
    loadChildren: './views/loanterm/loanterm.module#LoanTermModule', data: { moduleCode: '5001' }
  },
  //{
  //  path: 'proposal',
  //  loadChildren: './views/proposal/proposal.module#ProposalModule', data: { moduleCode: '1020' }
  //},
  {
    path: 'proposal-list',
    loadChildren: './views/proposal/proposal.module#ProposalModule', data: { moduleCode: '1020' }
  },
  {
    path: 'accountslist',
    loadChildren: './views/internalaccounts/internalaccount.module#InternalAccountModule', data: { moduleCode: '3006' }, runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'designationlist',
    loadChildren: './views/designation/designation.module#DesignationModule', data: { moduleCode: '4004' }
  },
  {
    path: 'department',
    loadChildren: './views/department/department.module#DepartmentModule', data: { moduleCode: '4005' }
  },
  //{
  //  path: 'Test',
  //  loadChildren: './views/test/test.module#TestModule'
  //},
  {
    path: 'addBankInformation',
    loadChildren: './views/bank-information/bank-information.module#BankInformationModule', data: { moduleCode: '1701' }
  },

  {
    path: 'task',
    loadChildren: './views/task/task.module#TaskModule', data: { moduleCode: '3004' }
  },
  {
    path: 'opportunity',
    loadChildren: './views/opportunity/opportunity.module#OpportunityListModule', data: { moduleCode: '3003' }
  },

  {
    path: 'product',
    loadChildren: './views/product/products.module#ProductsModule', data: { moduleCode: '7003' }
  },

  {
    path: 'companyintegrationsetting',
    loadChildren: './views/company-integration-setting/company-integration-setting.module#CompanyIntegrationSettingModule', canActivate: [AuthGuard], data: { moduleCode: '5074' }
  },


  {
    path: 'contactlist',
    loadChildren: './views/solgencontactlist/solgencontactlist.module#SolgencontactlistModule', data: { moduleCode: '4006' }
  },

  {
    path: 'locationTypelist',
    loadChildren: './views/locationtype/locationtype.module#LocationTypeModule', data: { moduleCode: '8002' }
  },
  {
    path: 'location',
    loadChildren: './views/location/location.module#LocationModule', data: { moduleCode: '8003' }
  },
  {
    path: 'serviceterritory',
    loadChildren: './views/serviceterritory/serviceterritory.module#ServiceTerritoryModule', data: { moduleCode: '8001' }
  },
  {
    path: 'customfield',
    loadChildren: './views/customfield/customfield.module#CustomFieldModule', data: { moduleCode: '800211' }
  },
  {
    path: 'layoutlist',
    loadChildren: './views/managelayout/layout.module#LayoutModule', data: { moduleCode: '4024' }
  },
  {
    path: 'manageform',
    loadChildren: './views/manageform/form.module#FormModule', data: { moduleCode: '6001' }
  }
  ,
  {
    path: 'formmaster',
    loadChildren: './views/formmaster/formmaster.module#FormmasterModule',canActivate: [AuthGuard],    data: { moduleCode: '5007' }
  }
  ,
  {
    path: 'employee',
    loadChildren: './views/employee/employee.module#EmployeeModule', data: { moduleCode: '800211' }
  },
  {
    path: 'file-configuration',
    loadChildren: './views/file-configurations/file-configurations.module#FileConfigurationsModule', data: { moduleCode: '9055' }
  },
  {
    path: 'pricebook',
    loadChildren: './views/pricebook/pricebook.module#PricebookModule', data: { moduleCode: '7004' }
  }
  , {
    path: 'configurationsetting',
    loadChildren: './views/configurationsetting/configurationsetting.module#ConfigurationSettingModule',  canActivate: [AuthGuard], data: { moduleCode: '5004' }
  }, {
    path: 'companysetup',
    loadChildren: './views/companysetup/companysetup.module#CompanysetupModule', data: { moduleCode: '5003' }
  },
  {
    path: 'loanproduct',
    loadChildren: './views/loanproduct/loanproduct.module#LoanproductModule', data: { moduleCode: '5001' }
  },
  {
    path: 'queuelist',
    loadChildren: './views/queue/queue.module#QueueModule', data: { moduleCode: '9001' }
  },
  {
    path: 'queues',
    loadChildren: './views/solgen-queue/solgen-queue.module#SolgenQueueModule', data: { moduleCode: '9028' }
  },
  {
    path: 'managecompany',
    loadChildren: './views/managecompany/company.module#CompanyModule', data: { moduleCode: '904501' }
  },
  {
    path: 'customlayoutlist',
    loadChildren: './views/managecustomlayout/managecustomlayout.module#CustomLayoutModule', canActivate: [AuthGuard], data: { moduleCode: '4024' }
  },
  //{
  //  path: 'formlist',
  //  loadChildren: './views/manageform/layout.module#LayoutModule', data: { moduleCode: '6001' }
  //}
  //,
  {
    path: 'calllog',
    loadChildren: './views/calllogdetail/calllogdetail.module#calllogdetailModule', canActivate: [AuthGuard], data: { moduleCode: '649999' }
  },
  {
    path: 'userTypelist',
    loadChildren: './views/usertype/usertype.module#UserTypeModule', data: { moduleCode: '4001' }
  }
  , { path: 'calendar', loadChildren: './views/calendar/calendarlist.module#CalendarListModule', canActivate: [AuthGuard], data: { moduletitle: 'Calendar', moduleCode: '3007' } }

  //-----------------------------------------------------------
  , { path: 'lead/add', loadChildren: './views/lead/lead.module#LeadModule', canActivate: [AuthGuard], data: { moduleCode: '3001' } }
  , { path: 'lead', loadChildren: './views/lead/lead.module#LeadModule', canActivate: [AuthGuard], data: { moduletitle: 'Lead', moduleCode: '3001', subModuleCodeName: 'lead' } }

  , {
    path: 'lender', loadChildren: './views/lender/lender.module#LenderModule', canActivate: [AuthGuard], data: { moduleCode: '3021' }
  }

  , {
    path: 'marketing', loadChildren: './views/fb-marketing/fb-marketing.module#FbMarketingModule', canActivate: [AuthGuard], data: { moduleCode: '7000' }
  }


  , { path: 'opportunity/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Opportunity', moduleCode: '0' } }
  , { path: 'Tasks/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Tasks', moduleCode: '0' } }
  , { path: 'Schedule/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Schedule Appointment', moduleCode: '0' } }
  , { path: 'Tracker/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Tracker', moduleCode: '0' } }

  , { path: 'location/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Location', moduleCode: '0' } }
  , { path: 'loctype/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Location Type', moduleCode: '0' } }

  , { path: 'loan/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Loan Application', moduleCode: '0' } }
  , { path: 'account/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Account', moduleCode: '0' } }

  , { path: 'department/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Department', moduleCode: '0' } }
  , { path: 'designation/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Designation', moduleCode: '0' } }
  , { path: 'loanterms/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Loan Terms', moduleCode: '0' } }



  , { path: 'product/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Product', moduleCode: '7001' } }
  , { path: 'productcat/comingsoon', component: ComingSoonComponent, canActivate: [AuthGuard], data: { moduletitle: 'Product Category', moduleCode: '7002' } }

  , { path: 'contactcommunications', component: CommenthistoryComponent, canActivate: [AuthGuard], data: { moduletitle: 'Communication', moduleCode: '60002' } },

  {
    path: 'campaign',
    loadChildren: './views/campaign/campaign.module#CampaignModule', data: { moduleCode: '3009' }
  },
  {
    path: 'serviceappointment',
    loadChildren: './views/servicesappointment/servicesappointment.module#ServicesappointmentModule', data: { moduleCode: '6400' }
  },
  {
    path: 'contactusleads',
    loadChildren: './views/contactusleads/contactusleads.module#ContactusleadsModule' , data: { moduleCode: '6700' }
  },
  { path: 'stageConfiguration', component: SolStageconfigurationComponent, data: { moduletitle: 'Configuration', moduleCode: '60019' } },

  {
    path: 'servicecrew',
    loadChildren: './views/manageservicecrew/manageservicecrew.module#ManageservicecrewModule',canActivate: [AuthGuard], data: { moduleCode: '6401' }
  },
  {
    path: 'questionnairechecklist',
    loadChildren: './views/servicesappointment/managequestionnaire/manage-questionaire.module#ManageQuestionaireModule', canActivate:[AuthGuard], data: { moduleCode: '6403' }
  },
  { path: 'adverse', component: LoanhomiAdverseEmailComponent, data: { moduletitle: 'Adverse', moduleCode: '60027' } },
  {
    path: 'managescreen',
    loadChildren: './views/manageform/form.module#FormModule', data: { moduleCode: '5012' }
  },

  {
    path: 'manageproductrequired',
    loadChildren: './views/productrequired/productrequired.module#ProductrequiredModule', data: { moduleCode: '5012' }
  },
  //{
  //  path: 'kyioverview',
  //  loadChildren: './views/kyi-overview/kyi-overview.module#KyiOverviewModule', data: { moduleCode: '50112' }
  //},
  {
    path: 'projects',
    loadChildren: './views/project/project.module#ProjectModule', data: { moduleCode: '5011' }
  },

  {
    path: 'requirement',
    loadChildren: './views/requirement/requirement.module#requirementModule', data: { moduleCode: '9125' }
  },
  {
    path: 'superAdminSubscription',
    loadChildren: './views/superadmin/super-admin-subscriptions/super-admin-subscriptions.module#SuperAdminSubscriptionsModule', data: { moduleCode: '9125', usertype: "usertypesuperadmin" }
  },

  {
    path: 'loanApplicationReport',
    loadChildren: './views/loanhomireports/loanhomireports.module#LoanhomireportsModule', data: { moduleCode: '50991' }
  },
  {
    path: 'dashboard/mobile',
    loadChildren: './views/mobile/mobile.module#MobileModule',data: { moduleCode: '1' }
  },
  {
    path: 'allReports',
    component: LoanhomiallreportlistComponent,
    canActivate: [AuthGuard],
    data: { moduleCode: '43112' }
  },

  { path: 'videoChat', component: VideoChatComponent, data: { preload: true, isVideoChat: true, showHeader: false, showSidebar: false, moduleCode: '30056' } },

  { path: '', redirectTo: './views/account/account.module', pathMatch: 'full', data: { moduleCode: '-1' } },
  { path: '**', redirectTo: 'dashboard' }// if url goes 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
