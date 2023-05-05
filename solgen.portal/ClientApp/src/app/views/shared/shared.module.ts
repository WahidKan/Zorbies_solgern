import { DocumentComponent } from './../document-maker-dynamic/document/document.component';
import { CalendarListModule } from './../calendar/calendarlist.module';
import { MakeappointmentComponent } from './../calendar/makeappointment/makeappointment.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule, DatePipe, CurrencyPipe } from "@angular/common";

import { SharedRoutingModule } from "./shared-routing.module";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { ConfirmationDialogService } from "./confirmation-dialog/confirmation-dialog.service";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AddNotesComponent } from "./notes/add-notes.component";
import { NotesListComponent } from "./notes/notes-list.component";
import { NotesPartialViewComponent } from "./notes/notes-partial-view.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DocumentlistComponent } from "./uploaddocument/documentlist.component";
import { AdddocumentComponent } from "./uploaddocument/adddocument.component";
import { UploadComponent } from "./uploaddocument/upload.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { CalendarModule } from "primeng/calendar";
import { SearchAsTypeComponent } from "./search-as-type/search-as-type.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { GuarantorComponent } from "./guarantor/guarantor.component";
import { TruncateWord } from "../../pipes/truncate.pipe";
import { TooltipModule } from "ng2-tooltip-directive";
import { VendorDetailsComponent } from "./vendor/vendor-details.component";
import { NotificationdetailComponent } from "./notificationdetail/notificationdetail.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { LoaderBlackComponent } from "src/app/components/loader/loader-black.component";
import { LoaderWhiteComponent } from "src/app/components/loader/loader-white.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { InputMaskModule } from "primeng/inputmask";
import { LeaserequestformComponent } from "./leaserequest/leaserequestform.component";
import { NgxPasswordToggleModule } from "ngx-password-toggle";
import { DeviceDetectorModule } from "ngx-device-detector";
import { CommonTokenExpireComponent } from "./confirmation-tokenexpire/common-token-expire.component";
import { LeasetemplatedetailComponent } from "./leasetemplatedetail/leasetemplatedetail.component";
import { CKEditorModule } from "ng2-ckeditor";
import { SafeHtmlPipe } from "src/app/pipes/pipe.safeHtml";
import { CreditcheckscoreComponent } from "./creditcheckscore/creditcheckscore.component";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { NgxDocViewerModule } from "ngx-doc-viewer";
import { CustomFieldComponent } from "./custom-field/customfield.component";
import { SearchfilteraddComponent } from "./searchfilter/searchfilteradd.component";
import { DynamicFormComponent } from "./custom-field/dynamicform.component";
import { ManageviewComponent } from "./manageview/manageview.component";
import { DragDropModule } from "primeng/dragdrop";
import { OrderListModule } from "primeng/orderlist";
import { DndModule } from "ng2-dnd";
import { GMapModule } from "primeng/gmap";
import { SolgenInputComponent } from "./components/solgen-input/solgen-input.component";
import { KeyFilterModule } from "primeng/keyfilter";
import {
  UtctolocalPipe,
  UtcDateTimeToLocalPipe,
  PstDateTimeToLocalPipe,
  PstDateTimeToLocalPipeDate,
  UtcDateTimeToPstPipe,
  UtcToPstPipe,
  UtcToPstDatePipe,
} from "../../pipes/utctolocal.pipe";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { GoolemapComponent } from "./googlemap/goolemap.component";
import { MapviewComponent } from "./mapview/mapview.component";
import { CurrencyPipePipe } from "../../pipes/currency-pipe.pipe";
import { MultiSelectModule } from "primeng/multiselect";
import { StagemanagementComponent } from "./stagemanagement/stagemanagement.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { SolStageconfigurationComponent } from "./sol-stageconfiguration/sol-stageconfiguration.component";
import { splitPipe, ContainsPipe } from "../../pipes/split.pipe";
import { AddassignedresourcepopupComponent } from "../servicesappointment/addassignedresourcepopup/addassignedresourcepopup.component";
import { NewnoteslistComponent } from "./new-notes/newnoteslist.component";
import { LeaseformComponent } from "./leaseform/leaseform.component";
import { PropertiespopupComponent } from "../managelayout/viewpopupwindow/propertiespopup.component";
import { LightboxModule } from "ngx-lightbox";
import { AddcontactComponent } from "./contactform/addcontact.component";
import { ManageviewnewComponent } from "./manageviewnew/manageviewnew.component";
import { LoanhomimanageviewComponent } from "./loanhomimanageview/loanhomimanageview.component";
import { LoanhomiadvancesearchfilterComponent } from "./loanhomiadvancesearchfilter/loanhomiadvancesearchfilter.component";
import { LoginComponent } from "../account/login/login.component";
import {
  DateTimeToLocalPipe,
  DateTimeToLocalForAddEditPipe,
  DateTimeToLocalForAddEditForDatePipe,
  DateTimeToLocalPipeForAppointment,
  DateTimeToLocalForGhantView,
} from "../../pipes/datetime.pipe";
import { LoanhomiAdverseEmailComponent } from "./loanhomi-adverse-email/loanhomi-adverse-email.component";
import { FilesComponent } from "./tabs/files/files.component";
import { FilesuploadComponent } from "./tabs/files/uploadfile/filesupload.component";
import {
  UniqueRowsPipe,
  convertToArrayListPipe,
  VoiceCallTimerPipe,
  GetUniqueTableNameFromCustomFieldListPipe,
  GetCustomFieldListByTableNamePipe,
  SectionNameWithScorePipe,
  SectionNameWithScoreTopPipe,
  DisplayNamePipe,
  EditorDefaultValuePipe,
  GenerateRoutePipe
} from "../../pipes/functions.pipe";
import { AuditchecklistpopupComponent } from "../servicesappointment/auditchecklistpopup/auditchecklistpopup.component";
import { WelcomecallpopupComponent } from "./welcomecallpopup/welcomecallpopup.component";
import { EditorModule } from "primeng/editor";
import { WelcomescreenComponent } from "./welcomescreen/welcomescreen.component";
import { ScreenpropertypopupComponent } from "./welcomescreen/screenpropertypopup.component";
import { WelcomescreenaddComponent } from "./welcomescreen/welcomescreenadd.component";
import { FlowInputComponent } from "./components/flow-input/flow-input.component";
import { SolgenRuleInputComponent } from "./components/solgen-rule-input/solgen-rule-input.component";
import { ServiceCrewMembersPopupComponent } from "../manageservicecrew/service-crew-members-popup/service-crew-members-popup.component";
import { LocationmapComponent } from "./locationmap/locationmap.component";
import { TextComponent } from "./components/text/text.component";
import { ImageComponent } from "./components/image/image.component";
import { ResizableDraggableComponent } from "./components/resizable-draggable/resizable-draggable.component";
import { BoxModelComponent } from "./components/box-model/box-model.component";
import { AutofocusDirective } from "./components/custom-directive/autofocus.directive";
import { AdvancedPropertiesModalComponent } from "./components/advanced-properties-modal/advanced-properties-modal.component";
import { AngularEditorModule } from "./thirdParty/lib/angular-editor.module";
import { CustomToolBarComponent } from "./components/custom-tool-bar/custom-tool-bar.component";
import { VideoComponent } from "./components/video/video.component";
import { TableComponent } from "./components/table/table.component";
import { TextFieldComponent } from "./components/text-field/text-field.component";
import { MappingLocationsComponent } from "./mapping-locations/mapping-locations.component";
import { MappingMembersComponent } from "./mapping-members/mapping-members.component";
import { CheckBoxComponent } from "./components/check-box/check-box.component";
import { DropDownComponent } from "./components/drop-down/drop-down.component";
import { DateComponent } from "./components/date/date.component";
import { CustomInputComponent } from "./components/table/custom-input/custom-input.component";
import { PricingTableComponent } from "./components/pricing-table/pricing-table.component";
import { AdvancedPropertiesModalDynamicComponent } from "./components/document-dynamic/advanced-properties-modal-dynamic/advanced-properties-modal-dynamic.component";
import { BoxModelDynamicComponent } from "./components/document-dynamic/box-model-dynamic/box-model-dynamic.component";
import { CheckBoxDynamicComponent } from "./components/document-dynamic/check-box-dynamic/check-box-dynamic.component";
import { CustomToolBarDynamicComponent } from "./components/document-dynamic/custom-tool-bar-dynamic/custom-tool-bar-dynamic.component";
import { DateDynamicComponent } from "./components/document-dynamic/date-dynamic/date-dynamic.component";
import { DropDownDynamicComponent } from "./components/document-dynamic/drop-down-dynamic/drop-down-dynamic.component";
import { ImageDynamicComponent } from "./components/document-dynamic/image-dynamic/image-dynamic.component";
import { PricingTableDynamicComponent } from "./components/document-dynamic/pricing-table-dynamic/pricing-table-dynamic.component";
import { ResizableDraggableDynamicComponent } from "./components/document-dynamic/resizable-draggable-dynamic/resizable-draggable-dynamic.component";
import { TableDynamicComponent } from "./components/document-dynamic/table-dynamic/table-dynamic.component";
import { TextDynamicComponent } from "./components/document-dynamic/text-dynamic/text-dynamic.component";
import { TextFieldDynamicComponent } from "./components/document-dynamic/text-field-dynamic/text-field-dynamic.component";
import { VideoDynamicComponent } from "./components/document-dynamic/video-dynamic/video-dynamic.component";
import { ProposalMappingComponent } from "./proposal-mapping/proposal-mapping.component";
import { PageBreakComponent } from "./components/page-break/page-break.component";

import { CustomLightboxComponent } from './components/custom-lightbox/custom-lightbox.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { DynamicListModule } from "dynamiccustom-list";
import { TwoDigitDecimaNumberDirectiveDirective } from "./two-digit-decima-number-directive.directive";
import { DragDropDynamicComponent } from "./components/document-dynamic/drag-drop-dynamic/drag-drop-dynamic.component";
import { ListviewComponent } from './tabs/listview/listview.component';
import { TableviewComponent } from './tabs/tableview/tableview.component';
import { FormviewComponent } from './tabs/formview/formview.component';
import { SolgenQueueInputComponent } from './components/solgen-queue-input/solgen-queue-input.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LeadCallHistoryComponent } from './lead-call-history/lead-call-history.component';
import { VideoCallHistoryComponent } from './video-call-history/video-call-history.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { CopyLinkModalComponent } from './copy-link-modal/copy-link-modal.component';
import { ActivityIndicatorComponent } from "./twilio/activity-indicator/activity-indicator.component";
import { CameraComponent } from "./twilio/camera/camera.component";
import { HomeComponent } from "./twilio/home/home.component";
import { ParticipantsComponent } from "./twilio/participants/participants.component";
import { RoomsComponent } from "./twilio/rooms/rooms.component";
import { DeviceSelectComponent } from "./twilio/settings/device-select.component";
import { SettingsComponent } from "./twilio/settings/settings.component";
import { LeadSmsHistoryComponent } from './lead-sms-history/lead-sms-history.component';
import { StartAppointmentComponent } from './start-appointment/start-appointment.component';
import { VideocallComponent } from './twilio/videocall/videocall.component';
import { FlowAutomationInputComponent } from './components/flow-automation-input/flow-automation-input.component';
import { AccumulationAnnotationService, AccumulationChartModule, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, CategoryService, ChartAnnotationService, ChartModule, ColumnSeriesService, DateTimeService, LegendService, LineSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, PieSeriesService, RangeColumnSeriesService, ScrollBarService, SplineAreaSeriesService, SplineSeriesService, StackingColumnSeriesService, StackingLineSeriesService, StepLineSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LineChartsComponent } from './line-charts/line-charts.component';
import { ColumnChartsComponent } from './column-charts/column-charts.component';
import { DoughnutChartsComponent } from './doughnut-charts/doughnut-charts.component';
import { CommonIconPickerComponent } from './common-icon-picker/common-icon-picker.component';
import { ViewFilterBarManagerComponent } from './view-filter-bar-manager/view-filter-bar-manager.component';
import { CallHistoryComponent } from './call-history/call-history.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ContractMappingComponent } from './contract-mapping/contract-mapping.component';
import { WorkOrderMappingComponent } from './work-order-mapping/work-order-mapping.component';
import { SharedDocumentsComponent } from './shared-documents/shared-documents.component';



@NgModule({
  declarations: [
    UnauthorizedComponent,
    ConfirmationDialogComponent,
    AddNotesComponent,
    NotesListComponent,
    NotesPartialViewComponent,
    DocumentlistComponent,
    AdddocumentComponent,
    UploadComponent,
    CommonTokenExpireComponent,
    TruncateWord,
    UtctolocalPipe,
    UtcDateTimeToPstPipe,
    UtcDateTimeToLocalPipe,
    PstDateTimeToLocalPipe,
    PstDateTimeToLocalPipeDate,
    UtcToPstDatePipe,
    UtcToPstPipe,
    SafeHtmlPipe,
    SearchAsTypeComponent,
    GuarantorComponent,
    VendorDetailsComponent,
    NotificationdetailComponent,
    LoaderComponent,
    LoaderBlackComponent,
    LeaseformComponent,
    LoaderWhiteComponent,
    LeaserequestformComponent,
    LeasetemplatedetailComponent,
    CreditcheckscoreComponent,
    CustomFieldComponent,
    ManageviewComponent,
    ManageviewnewComponent,
    AddassignedresourcepopupComponent,
    DynamicFormComponent,
    SearchfilteraddComponent,
    SolgenInputComponent,
    GoolemapComponent,
    MapviewComponent,
    CurrencyPipePipe,
    StagemanagementComponent,
    SolStageconfigurationComponent,
    splitPipe,
    ContainsPipe,
    NewnoteslistComponent,
    PropertiespopupComponent,
    AddcontactComponent,
    LoanhomimanageviewComponent,
    LoanhomiadvancesearchfilterComponent,

    //LoginComponent,
    DateTimeToLocalPipe,
    DateTimeToLocalForAddEditPipe,
    DateTimeToLocalForAddEditForDatePipe,
    UniqueRowsPipe,
    LoanhomiAdverseEmailComponent,
    FilesComponent,
    FilesuploadComponent,
    AuditchecklistpopupComponent,
    convertToArrayListPipe,
    DateTimeToLocalPipeForAppointment,
    DateTimeToLocalForGhantView,
    WelcomecallpopupComponent,
    WelcomescreenComponent,
    ScreenpropertypopupComponent,
    WelcomescreenaddComponent,
    GetUniqueTableNameFromCustomFieldListPipe,
    GetCustomFieldListByTableNamePipe,
    SectionNameWithScorePipe,
    SectionNameWithScoreTopPipe,
    FlowInputComponent,
    DisplayNamePipe,

    SolgenRuleInputComponent,
    EditorDefaultValuePipe,
    GenerateRoutePipe,
    ServiceCrewMembersPopupComponent,
    LocationmapComponent,
    TextComponent,
    ImageComponent,
    BoxModelComponent,
    ResizableDraggableComponent,
    AutofocusDirective,
    AdvancedPropertiesModalComponent,
    CustomToolBarComponent,
    VideoComponent,
    TableComponent,
    TextFieldComponent,
    CheckBoxComponent,
    MappingLocationsComponent,
    MappingMembersComponent,
    DropDownComponent,
    DateComponent,
    CustomInputComponent,
    PricingTableComponent,
    AdvancedPropertiesModalDynamicComponent,
    BoxModelDynamicComponent,
    CheckBoxDynamicComponent,
    CustomToolBarDynamicComponent,
    DateDynamicComponent,
    DropDownDynamicComponent,
    ImageDynamicComponent,
    PricingTableDynamicComponent,
    ResizableDraggableDynamicComponent,
    TableDynamicComponent,
    TextDynamicComponent,
    TextFieldDynamicComponent,
    VideoDynamicComponent,
    ProposalMappingComponent,
    PageBreakComponent,
    CustomLightboxComponent,
    TwoDigitDecimaNumberDirectiveDirective,
    DragDropDynamicComponent,
    ListviewComponent,
    TableviewComponent,
    FormviewComponent,
    SolgenQueueInputComponent,
    LeadCallHistoryComponent,
    VideoCallHistoryComponent,
    CallHistoryComponent,
    AppointmentsComponent,
    ScheduleAppointmentComponent,
    CopyLinkModalComponent,
    HomeComponent,
    RoomsComponent,
    ParticipantsComponent,
    CameraComponent,
    SettingsComponent,
    DeviceSelectComponent,
    ActivityIndicatorComponent,
    LeadSmsHistoryComponent,
    StartAppointmentComponent,
    VideocallComponent,
    FlowAutomationInputComponent,
    LineChartsComponent,
    ColumnChartsComponent,
    BreadcrumbComponent,
    DoughnutChartsComponent,
    CommonIconPickerComponent,
    ViewFilterBarManagerComponent,
    ActivitiesComponent,
    ContractMappingComponent,
    WorkOrderMappingComponent,
    SharedDocumentsComponent,

  ],
  imports: [
    CommonModule,
    GMapModule,
    DynamicListModule,
    SharedRoutingModule,
    ModalModule,
    NgxPasswordToggleModule,
    ReactiveFormsModule,
    DndModule,
    NgxDatatableModule,
    FormsModule,
    TooltipModule,
    InputMaskModule,
    NgSelectModule,
    CalendarModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    CKEditorModule,
    PdfViewerModule,
    NgxDocViewerModule,
    DragDropModule,
    OrderListModule,
    KeyFilterModule,
    OverlayPanelModule,
    DeviceDetectorModule.forRoot(),
    InfiniteScrollModule,
    LightboxModule,
    EditorModule,
    AngularEditorModule,
    NgxImageZoomModule,
    ChartModule,
    GridModule,
    AccumulationChartModule,
    
    // CustomInputComponent,

  ],
  providers: [
    ConfirmationDialogService,
    DatePipe,
    CurrencyPipe,
    CurrencyPipePipe,
    splitPipe,
    ContainsPipe,
    DateTimeToLocalPipe,
    DateTimeToLocalForAddEditPipe,
    DateTimeToLocalForAddEditForDatePipe,
    UniqueRowsPipe,
    convertToArrayListPipe,
    DateTimeToLocalPipeForAppointment,
    DateTimeToLocalForGhantView,
    VoiceCallTimerPipe,
    GetUniqueTableNameFromCustomFieldListPipe,
    GetCustomFieldListByTableNamePipe,
    SectionNameWithScorePipe,
    SectionNameWithScoreTopPipe,
    DisplayNamePipe,
    EditorDefaultValuePipe,
    GenerateRoutePipe,
    CategoryService, ColumnSeriesService, DateTimeService, ScrollBarService, LineSeriesService, 
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService , StepLineSeriesService, SplineSeriesService, StackingLineSeriesService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService,PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,
    AccumulationAnnotationService
  ],
  exports: [
    CopyLinkModalComponent,
    DynamicListModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxDatatableModule,
    CalendarModule,
    LeaseformComponent,
    UploadComponent,
    DndModule,
    GMapModule,
    AutoCompleteModule,
    SearchAsTypeComponent,
    TruncateWord,
    UtctolocalPipe,
    UtcDateTimeToLocalPipe,
    PstDateTimeToLocalPipe,
    PstDateTimeToLocalPipeDate,
    UtcDateTimeToPstPipe,
    UtcToPstPipe,
    UtcToPstDatePipe,
    SafeHtmlPipe,
    TooltipModule,
    InputMaskModule,
    GuarantorComponent,
    NotificationdetailComponent,
    VendorDetailsComponent,
    LoaderComponent,
    LoaderBlackComponent,
    LoaderWhiteComponent,
    ProgressSpinnerModule,
    NgxPasswordToggleModule,
    LeaserequestformComponent,
    SolgenInputComponent,
    ManageviewComponent,
    ManageviewnewComponent,
    CustomFieldComponent,
    DynamicFormComponent,
    GoolemapComponent,
    MapviewComponent,
    SearchfilteraddComponent,
    KeyFilterModule,
    OverlayPanelModule,
    CurrencyPipePipe,
    StagemanagementComponent,
    AddassignedresourcepopupComponent,
    InfiniteScrollModule,
    splitPipe,
    ContainsPipe,
    NewnoteslistComponent,
    PropertiespopupComponent,
    LightboxModule,
    AddcontactComponent,
    LoanhomimanageviewComponent,
    LoanhomiadvancesearchfilterComponent,
    //LoginComponent,
    DateTimeToLocalPipe,
    DateTimeToLocalForAddEditPipe,
    DateTimeToLocalForAddEditForDatePipe,
    UniqueRowsPipe,
    FilesComponent,
    FilesuploadComponent,
    convertToArrayListPipe,
    DateTimeToLocalPipeForAppointment,
    DateTimeToLocalForGhantView,
    AuditchecklistpopupComponent,
    EditorModule,
    WelcomecallpopupComponent,
    WelcomescreenComponent,
    ScreenpropertypopupComponent,
    WelcomescreenaddComponent,
    GetUniqueTableNameFromCustomFieldListPipe,
    GetCustomFieldListByTableNamePipe,
    SectionNameWithScorePipe,
    SectionNameWithScoreTopPipe,
    DisplayNamePipe,
    FlowInputComponent,
    SolgenRuleInputComponent,
    EditorDefaultValuePipe,
    GenerateRoutePipe,
    ServiceCrewMembersPopupComponent,
    LocationmapComponent,
    TextComponent,
    ImageComponent,
    ResizableDraggableComponent,
    AdvancedPropertiesModalComponent,
    CustomToolBarComponent,
    MappingLocationsComponent,
    MappingMembersComponent,
    TextFieldComponent,
    TextDynamicComponent,
    ImageDynamicComponent,
    ResizableDraggableDynamicComponent,
    CustomToolBarDynamicComponent,
    TextFieldDynamicComponent,
    AdvancedPropertiesModalDynamicComponent,
    ProposalMappingComponent,
    NgxImageZoomModule,
    TwoDigitDecimaNumberDirectiveDirective,
    DragDropDynamicComponent,
    ListviewComponent,
    TableviewComponent,
    FormviewComponent,
    OrderListModule,
    SolgenQueueInputComponent,
    VideoCallHistoryComponent,
    LeadCallHistoryComponent,
    AppointmentsComponent,
    ScheduleAppointmentComponent,
    HomeComponent,
    LeadSmsHistoryComponent,
    RoomsComponent,
    CameraComponent,
    SettingsComponent,
    ParticipantsComponent,
    StartAppointmentComponent,
    VideocallComponent,
    LineChartsComponent,
    ColumnChartsComponent,
    BreadcrumbComponent,
    DoughnutChartsComponent,
    CommonIconPickerComponent,
    ViewFilterBarManagerComponent,
    WorkOrderMappingComponent,
    // CustomInputComponent,
    ActivitiesComponent,
    ContractMappingComponent,
    SharedDocumentsComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    CommonTokenExpireComponent,
    //LoginComponent,
    VideocallComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
