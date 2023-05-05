import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { UserService } from '../../shared/user.service';
import { ServiceresourseService, addAssignedResourcesModel } from '../serviceresourse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-serviceappointment',
  templateUrl: './serviceappointment.component.html',
  styleUrls: ['./serviceappointment.component.scss']
})
export class ServiceappointmentComponent implements OnInit {
  @ViewChild('ServiceAppointment', { static: false }) modalServiceAppointment: ModalDirective;
  @Output() resourceServiceAppointmentEvent = new EventEmitter();
  active = false;
  appointments: any;
  customers: any;
  lstappointment: any;
  lstappointmentstatus: any;
  isDateChanged: any = true;
  searchText = '';
  loadSave = false;
  lstResource: any;
  appmodel:  addAssignedResourcesModel = new addAssignedResourcesModel();
  fTime: Date = new Date(0);
  Tdate: Date = new Date(0); customerID: any;
  utcDate: Date;
  appId: any;
  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  title: any;
  minimumDate = new Date();
  isEdit = false;
  startDateModel: any;
  minToTime: Date;
  maxToTime: Date;
  addForm: FormGroup;
  minFromTime: Date;
  loading = false;
  lstState: any;
  lstCountry: any;
  todate: Date;
  lstTerritoryType: any;
  lstTerritory: any;
  lstOperatingHours: any;
  lstResourceAppointment: any;
  lstCrew: any;
  interResourceId: any;
  lstResourceSkill: any;
  serviceCrewNames: any;
  estimatedTravelTimeFromSourceNames: any;
  estimatedTravelTimeToSourceNames: any;
  custom_field_id: any;
  byDefaultResourcename:any;

  len: number=10; field_code: any; scrollDataList: any;

  constructor(private fb: FormBuilder,
    private commonService: CommonService, private userService: UserService,
    private serviceresourseService: ServiceresourseService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    //this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.initForm();
    this.getServiceResource();
    this.GetServiceCrewDll();
    this.GetEstimatedTravelTimeFromAndToSourceDll();
    this.getServiceAppoint();
  }

  show(id) {
    this.loadSave = true;
    this.addForm.reset();
    this.interResourceId = id;
    this.title = "New Assigned Resource";
    this.GetServiceCrewDll();
    this.GetEstimatedTravelTimeFromAndToSourceDll();
    this.getServiceAppoint();
    this.getServiceResource();
    this.addForm.patchValue({
      serviceResourceId: this.interResourceId
    });
    //this.initForm();
    //setTimeout(() => {  }, 2000);
    this.len = 10;
    this.modalServiceAppointment.show();
    this.loadSave = false;
 

  }


  EditAppoimentment(row) {
    //this.modalServiceAppointment.show();
    this.interResourceId = row.ServiceResourceId;
    this.getServiceResource();
    this.title = "Edit Assigned Resource";
    this.len = 0;
    this.isDateChanged = false;
    this.isEdit = true;
    this.addForm.patchValue({
      Id: row.Id,
      serviceAppointment: row.serviceAppointment == null ? row.serviceAppointment : row.serviceAppointment.toString(),
      serviceResourceId: row.ServiceResourceId == null ? row.ServiceResourceId : row.ServiceResourceId.toString(),
      estimatedTravelTime: row.estimatedTravelTime,
      actualTravelTime: row.ActualTravelTime,
      serviceCrewId: row.serviceCrewId == null ? row.serviceCrewId : row.serviceCrewId.toString(),
      estimatedTravelTimeFromSourceId: row.estimatedTravelTimeFromSourceId == null ? row.estimatedTravelTimeFromSourceId : row.estimatedTravelTimeFromSourceId.toString(),
      approximateTravelDistanceForm: row.approximateTravelDistanceForm,
      estimatedTravelTimeToSourceId: row.estimatedTravelTimeToSourceId == null ? row.estimatedTravelTimeToSourceId : row.estimatedTravelTimeToSourceId.toString(),
      approximateTravelDistanceTo: row.approximateTravelDistanceTo,
      lastUpdatedEpoch: row.lastUpdatedEpoch,
      approximateTravelTimeForm: row.approximateTravelTimeForm,
      isUpdatedByOptimization: row.isUpdatedByOptimization,
      calculatedDurationMinutes: row.calculatedDurationMinutes,

    })
    this.modalServiceAppointment.show();
  }

  close() {
    this.active = false;
   // this.addForm.reset();
    this.modalServiceAppointment.hide();
  }
  getServiceResource() {
    this.commonService.getMasterSubModuleList(this.interResourceId, 'ServiceResource').subscribe((result: any) => {
      ;
      this.lstResource = this.commonService.masters;
      // console.log("Resource", this.lstResource);
      this.byDefaultResourcename = this.lstResource[0].text;
      // console.log("byDefaultResourcename", this.byDefaultResourcename);
      // console.log("Resource", this.lstResource);
    })
  }

  getServiceAppoint() {
    this.commonService.getMasterSubModuleList(this.len, 'ServiceResourceAppointment').subscribe((result: any) => {
      this.lstResourceAppointment = this.commonService.masters;
      // console.log("apppppp",this.lstResourceAppointment)
    })
  }
  GetServiceCrewDll() {
    this.serviceresourseService.GetServiceCrewDll().subscribe((data: any) => {
      this.serviceCrewNames = data;
    })
  }

  GetEstimatedTravelTimeFromAndToSourceDll() {
    this.serviceresourseService.GetEstimatedTravelTimeFromAndToSourceDll().subscribe((data: any) => {
      this.estimatedTravelTimeFromSourceNames = data;
      this.estimatedTravelTimeToSourceNames = data;
    })
  }

  private initForm() {
    this.addForm = this.fb.group({
      Id: [null],
      serviceAppointment: [null, Validators.required],
      serviceResourceId: [null, Validators.required],
      estimatedTravelTime: [''],
      actualTravelTime: [''],
      serviceCrewId: [null],
      estimatedTravelTimeFromSourceId: [null],
      approximateTravelDistanceForm: [''],
      estimatedTravelTimeToSourceId: [null],
      approximateTravelDistanceTo: [''],
      lastUpdatedEpoch: [''],
      approximateTravelTimeForm: [''],
      isUpdatedByOptimization: [''],
      calculatedDurationMinutes: ['']
    });
  }
  SaveAssignedResources() {
    if (this.addForm.valid) {
     
      this.loadSave = true;
      this.appmodel.Id = this.addForm.value.Id == null ? 0 : this.addForm.value.Id;
      this.appmodel.serviceAppointment = this.addForm.value.serviceAppointment;
      this.appmodel.serviceResourceId = this.addForm.value.serviceResourceId;
      this.appmodel.estimatedTravelTime = this.addForm.value.estimatedTravelTime;
      this.appmodel.actualTravelTime = this.addForm.value.actualTravelTime;
      this.appmodel.serviceCrewId = this.addForm.value.serviceCrewId;
      this.appmodel.estimatedTravelTimeFromSourceId = this.addForm.value.estimatedTravelTimeFromSourceId;
      this.appmodel.approximateTravelDistanceForm = this.addForm.value.approximateTravelDistanceForm;
      this.appmodel.estimatedTravelTimeToSourceId = this.addForm.value.estimatedTravelTimeToSourceId;
      this.appmodel.approximateTravelDistanceTo = this.addForm.value.approximateTravelDistanceTo;
      this.appmodel.lastUpdatedEpoch = this.addForm.value.lastUpdatedEpoch;
      this.appmodel.approximateTravelTimeForm = this.addForm.value.approximateTravelTimeForm;
      this.appmodel.isUpdatedByOptimization = this.addForm.value.isUpdatedByOptimization;
      this.appmodel.calculatedDurationMinutes = this.addForm.value.calculatedDurationMinutes;
      this.appmodel.isServiceResource = true;

      this.serviceresourseService.saveAssignedResource(this.appmodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addForm.reset();
          // this.refresh();
          // this.GetAssignedResourcesList();
          this.resourceServiceAppointmentEvent.emit();
          this.modalServiceAppointment.hide();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
        //}, error => {
        //  //this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  }
  get Id() { return this.addForm.get('Id'); }
  get serviceAppointment() { return this.addForm.get('serviceAppointment'); }
  get serviceResourceId() { return this.addForm.get('serviceResourceId'); }
  get estimatedTravelTime() { return this.addForm.get('estimatedTravelTime'); }
  get actualTravelTime() { return this.addForm.get('actualTravelTime'); }
  get serviceCrewId() { return this.addForm.get('serviceCrewId'); }
  get estimatedTravelTimeFromSourceId() { return this.addForm.get('estimatedTravelTimeFromSourceId'); }
  get approximateTravelDistanceForm() { return this.addForm.get('approximateTravelDistanceForm'); }
  get estimatedTravelTimeToSourceId() { return this.addForm.get('estimatedTravelTimeToSourceId'); }
  get approximateTravelDistanceTo() { return this.addForm.get('approximateTravelDistanceTo'); }
  get lastUpdatedEpoch() { return this.addForm.get('lastUpdatedEpoch'); }
  get approximateTravelTimeForm() { return this.addForm.get('approximateTravelTimeForm'); }
  get isUpdatedByOptimization() { return this.addForm.get('isUpdatedByOptimization'); }
  get calculatedDurationMinutes() { return this.addForm.get('calculatedDurationMinutes'); }

  get isServiceResource() { return this.addForm.get('isServiceResource'); }



  onScrollToEnd(dataList: any) {
    this.fetchMore(dataList);
  }

  private fetchMore(dataList: any) {
    
    // console.log("e", dataList);
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    let newLength = dataList.length;
   // this.len = newLength;
    //if (newLength != null) {
    //this.len + newLength;
    this.len=this.getreturnNumber(this.len=10, newLength);
    //}
    
    //this.custom_field_id = dataList[j].custom_field_id;
    //this.field_code = dataList[j].field_code;

    this.commonService.getMasterSubModuleList(this.len, 'ServiceResourceAppointment').subscribe((result: any) => {
      this.lstResourceAppointment = this.commonService.masters;
      // console.log("apppppp", this.lstResourceAppointment)
    })
    //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
    //  this.scrollDataList = this.commonService.customFieldsListData;
    //  // console.log('scrollDataList:', this.scrollDataList);
    //  (dataList[j].select_options as any[]) = (dataList[j].select_options as any[]).concat(this.scrollDataList);

    //})
  }
  getreturnNumber (x, y) {
  return x + y;
};
  onKey(e: any, dataList: any) {
    
    this.len = 0
    //this.custom_field_id = dataList[j].custom_field_id;
    //this.field_code = dataList[j].field_code;
    //this.searchText = e.target.value;
    //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
    //  this.scrollDataList = this.commonService.customFieldsListData;
    //  // console.log('scrollDataList:', this.scrollDataList);
    //  (dataList[j].select_options as any[]) = this.scrollDataList;
    //})
    this.commonService.getMasterSubModuleList(this.len, 'ServiceResourceAppointment').subscribe((result: any) => {
      this.lstResourceAppointment = this.commonService.masters;
      // console.log("apppppp", this.lstResourceAppointment)
    })
  }

  onClearLang(dataList: any): void {
    this.len = 0
    //this.custom_field_id = dataList[j].custom_field_id;
    //this.field_code = dataList[j].field_code;
    this.searchText = '';
    this.commonService.getMasterSubModuleList(this.len, 'ServiceResourceAppointment').subscribe((result: any) => {
      this.lstResourceAppointment = this.commonService.masters;
      // console.log("apppppp", this.lstResourceAppointment)
    })
    //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
    //  this.scrollDataList = this.commonService.customFieldsListData;
    //  // console.log('scrollDataList:', this.scrollDataList);
    //  (dataList[j].select_options as any[]) = this.scrollDataList;
    //})
  }
}
