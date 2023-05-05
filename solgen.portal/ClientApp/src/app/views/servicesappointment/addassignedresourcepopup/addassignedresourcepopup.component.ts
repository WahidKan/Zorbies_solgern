import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AssignSheduleAppointmentModel, ServicesappointmentService } from '../servicesappointment.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { DateTimeToLocalForAddEditPipe, DateTimeToLocalForGhantView } from '../../../pipes/datetime.pipe';
import { transform } from 'html2canvas/dist/types/css/property-descriptors/transform';
import { resource } from 'selenium-webdriver/http';
import { DatePipe } from '@angular/common';
import { lang } from 'moment';
//import { setTimeout } from 'timers';

@Component({
  selector: 'app-addassignedresourcepopup',
  templateUrl: './addassignedresourcepopup.component.html',
  styleUrls: ['./addassignedresourcepopup.component.scss']
})
export class AddassignedresourcepopupComponent implements OnInit {

  @ViewChild('addAssignedResourcesPopup', { static: false }) addAssignedResourcesModal: ModalDirective;
  @Output() AssignedResourceEmitter = new EventEmitter<{ isGhantView: boolean, starttime: any, endTime: any}>();

  addAssignedResourcesForm: FormGroup;
  addAssignedResourcesmodel: AssignSheduleAppointmentModel = new AssignSheduleAppointmentModel();

  loadSave: boolean = false;
  lstAccount: any;
  lstStatus: any;
  EquipmentResourceList: any;
  lstWorkType: any;
  lstWorkorder: any;
  editStatusId: any;
  editWorkOrder: any;
  editWorkType: any;
  editAccountId: any;
  validityServiceResource: boolean = false;
  validityServiceCrew: boolean = false;
  serviceResourceNames: any;
  serviceCrewNames: any; 
  estimatedTravelTimeFromSourceNames: any;
  estimatedTravelTimeToSourceNames: any; 
  title: any = "";
  len: any = 10;
  scrollDataList: any;
  searchText: string;
  timeFormat: string;
  lstSelectedResources: any[] = [];
  lstSelectedCrews: any[] = [];
  isFromGhantView: boolean=false;
 pagedData: any = {
    pager: {},
    data: []
 };
  SANo: any;
 
  checkedId: any[] = [];
  checkedSAnumber: any[] = [];
  timezoneidsch: any = 0;
  timezonename: string = '';

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private servicesappointmentlistService: ServicesappointmentService, private toaster: ToastrService, private commonService: CommonService) { }

  ngOnInit() {
    this.checkedId = [];
    this.checkedId.length = 0;
    this.initForm();
    this.GetServiceResourceDll();
    this.GetServiceCrewDll();
    this.GetEstimatedTravelTimeFromAndToSourceDll();
    this.getAccountList('');
    this.getAppointmentStatuList();
    this.getWorkTypeList('');
    this.getWorkOrderList('');
    this.getEquipmentResources();
    this.loadSave = true;
  };


  get Id() { return this.addAssignedResourcesForm.get('Id'); }
  get serviceAppointment() { return this.addAssignedResourcesForm.get('serviceAppointment'); }
  get serviceResourceId() { return this.addAssignedResourcesForm.get('serviceResourceId'); }
  get estimatedTravelTime() { return this.addAssignedResourcesForm.get('estimatedTravelTime'); }
  get actualTravelTime() { return this.addAssignedResourcesForm.get('actualTravelTime'); }
  get serviceCrewId() { return this.addAssignedResourcesForm.get('serviceCrewId'); }
  get estimatedTravelTimeFromSourceId() { return this.addAssignedResourcesForm.get('estimatedTravelTimeFromSourceId'); }
  get approximateTravelDistanceForm() { return this.addAssignedResourcesForm.get('approximateTravelDistanceForm'); }
  get estimatedTravelTimeToSourceId() { return this.addAssignedResourcesForm.get('estimatedTravelTimeToSourceId'); }
  get approximateTravelDistanceTo() { return this.addAssignedResourcesForm.get('approximateTravelDistanceTo'); }
  get lastUpdatedEpoch() { return this.addAssignedResourcesForm.get('lastUpdatedEpoch'); }
  get approximateTravelTimeForm() { return this.addAssignedResourcesForm.get('approximateTravelTimeForm'); }
  get isUpdatedByOptimization() { return this.addAssignedResourcesForm.get('isUpdatedByOptimization'); }
  get calculatedDurationMinutes() { return this.addAssignedResourcesForm.get('calculatedDurationMinutes'); }


  get description() { return this.addAssignedResourcesForm.get('description'); }
  get accountId() { return this.addAssignedResourcesForm.get('accountId'); }
  get subject() { return this.addAssignedResourcesForm.get('subject'); }
  get statusId() { return this.addAssignedResourcesForm.get('statusId'); }
  get workType() { return this.addAssignedResourcesForm.get('workType'); }
  get WorkOrder() { return this.addAssignedResourcesForm.get('WorkOrder'); }
  get arrivalWindowStartTime() { return this.addAssignedResourcesForm.get('arrivalWindowStartTime'); }

  get arrivalWindowEndTime() { return this.addAssignedResourcesForm.get('arrivalWindowEndTime'); }
  get scheduledStartTime() { return this.addAssignedResourcesForm.get('scheduledStartTime'); }
  get scheduledEndTime() { return this.addAssignedResourcesForm.get('scheduledEndTime'); }


  private initForm() {
    this.addAssignedResourcesForm = this.fb.group({
      Id: [null],
      serviceAppointment: ['', Validators.required],
      serviceResourceId: [null, Validators.required],
      estimatedTravelTime: ['', null],
      actualTravelTime: ['', null],
      serviceCrewId: [null, Validators.required],
      estimatedTravelTimeFromSourceId: [null, null],
      approximateTravelDistanceForm: [, null],
      estimatedTravelTimeToSourceId: [null, null],
      approximateTravelDistanceTo: [null, null],
      lastUpdatedEpoch: [null],
      approximateTravelTimeForm: [null],
      isUpdatedByOptimization: [null],
      calculatedDurationMinutes: [null],
      description: [null],
      accountId: [null, Validators.required],
      statusId: [null, Validators.required],
      subject: ['', Validators.required],
      workType: [null, Validators.required],
      WorkOrder: [null, Validators.required],
      arrivalWindowStartTime: [null],
      arrivalWindowEndTime: [null],
      scheduledStartTime: [null, Validators.required],
      scheduledEndTime: [null, Validators.required],
      equipmentResourceId: [null],

    })
  };

  SaveAssignedResources() {
    ;
    if (this.addAssignedResourcesForm.valid) {
      this.loadSave = true;
      const convertDateTime = new DateTimeToLocalForAddEditPipe;
      // console.log('addAssignedResourcesForm', this.addAssignedResourcesForm.value);
      var ab = this.addAssignedResourcesForm.value.scheduledStartTime;
      var ad = this.addAssignedResourcesForm.value.scheduledEndTime;
      ab = ab.getHours()
      ad = ad.getHours()

      ;
      //if ((ab < 19 && ab >= 7) && (ad < 19 && ad >= 7)) {
      
      this.checkedId.push({ Id: this.addAssignedResourcesForm.value.Id, SaNo: this.addAssignedResourcesForm.value.serviceAppointment })
      this.addAssignedResourcesmodel.Id = JSON.stringify(this.checkedId);
      
      this.addAssignedResourcesmodel.serviceAppointment = this.addAssignedResourcesForm.value.serviceAppointment;
      this.addAssignedResourcesmodel.serviceResourceId = this.addAssignedResourcesForm.value.serviceResourceId;
      this.addAssignedResourcesmodel.estimatedTravelTime = this.addAssignedResourcesForm.value.estimatedTravelTime;
      this.addAssignedResourcesmodel.actualTravelTime = this.addAssignedResourcesForm.value.actualTravelTime;
      this.addAssignedResourcesmodel.serviceCrewId = this.addAssignedResourcesForm.value.serviceCrewId;
      this.addAssignedResourcesmodel.equipmentResourceId = this.addAssignedResourcesForm.value.equipmentResourceId;
      this.addAssignedResourcesmodel.estimatedTravelTimeFromSourceId = this.addAssignedResourcesForm.value.estimatedTravelTimeFromSourceId;
      this.addAssignedResourcesmodel.approximateTravelDistanceForm = this.addAssignedResourcesForm.value.approximateTravelDistanceForm;
      this.addAssignedResourcesmodel.estimatedTravelTimeToSourceId = this.addAssignedResourcesForm.value.estimatedTravelTimeToSourceId;
      this.addAssignedResourcesmodel.approximateTravelDistanceTo = this.addAssignedResourcesForm.value.approximateTravelDistanceTo;
      this.addAssignedResourcesmodel.lastUpdatedEpoch = this.addAssignedResourcesForm.value.lastUpdatedEpoch;
      this.addAssignedResourcesmodel.approximateTravelTimeForm = this.addAssignedResourcesForm.value.approximateTravelTimeForm;
      this.addAssignedResourcesmodel.isUpdatedByOptimization = this.addAssignedResourcesForm.value.isUpdatedByOptimization;
      this.addAssignedResourcesmodel.calculatedDurationMinutes = this.addAssignedResourcesForm.value.calculatedDurationMinutes;

      this.addAssignedResourcesmodel.description = this.addAssignedResourcesForm.value.description;
      this.addAssignedResourcesmodel.accountId = this.editAccountId;
      this.addAssignedResourcesmodel.statusId = this.addAssignedResourcesForm.value.statusId;
      this.addAssignedResourcesmodel.subject = this.addAssignedResourcesForm.value.subject;
      this.addAssignedResourcesmodel.workType = this.editWorkType; //this.addAssignedResourcesForm.value.workType;
      this.addAssignedResourcesmodel.WorkOrder = this.editWorkOrder; //this.addAssignedResourcesForm.value.WorkOrder;
  
      //const datetime = new DateTimeToLocalForAddEditPipe;
      ;
      
      if (this.timezoneidsch != 0) {
        ;
        this.addAssignedResourcesmodel.arrivalWindowStartTime = (this.arrivalWindowStartTime.value == null) ? null : this.commonService.getUserSelectedZoneToUTCghantView(this.arrivalWindowStartTime.value, this.timezonename);
        this.addAssignedResourcesmodel.arrivalWindowEndTime = (this.arrivalWindowEndTime.value == null) ? null : this.commonService.getUserSelectedZoneToUTCghantView(this.arrivalWindowEndTime.value, this.timezonename);
        this.addAssignedResourcesmodel.scheduledStartTime = (this.scheduledStartTime.value == null) ? null : this.commonService.getUserSelectedZoneToUTCghantView(this.scheduledStartTime.value, this.timezonename);
        this.addAssignedResourcesmodel.scheduledEndTime = (this.scheduledEndTime.value == null) ? null : this.commonService.getUserSelectedZoneToUTCghantView(this.scheduledEndTime.value, this.timezonename);

      }
      else {
        ;
        this.addAssignedResourcesmodel.arrivalWindowStartTime = (this.arrivalWindowStartTime.value == null) ? null : this.commonService.getUserSelectedZoneToUTC(this.arrivalWindowStartTime.value);
        this.addAssignedResourcesmodel.arrivalWindowEndTime = (this.arrivalWindowEndTime.value == null) ? null : this.commonService.getUserSelectedZoneToUTC(this.arrivalWindowEndTime.value);
        this.addAssignedResourcesmodel.scheduledStartTime = (this.scheduledStartTime.value == null) ? null : this.commonService.getUserSelectedZoneToUTC(this.scheduledStartTime.value);
        this.addAssignedResourcesmodel.scheduledEndTime = (this.scheduledEndTime.value == null) ? null : this.commonService.getUserSelectedZoneToUTC(this.scheduledEndTime.value);

      }
     
      this.servicesappointmentlistService.SaveShuduleAppointAndResources(this.addAssignedResourcesmodel).subscribe((result: any) => {
        ;
        //;
        this.checkedId = [];
        this.checkedId.length = 0;
        if (result.statusCode == 200) {
          ;
          this.checkedId = [];
          this.checkedId.length = 0;
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addAssignedResourcesForm.reset();
          //this.refresh();
          this.AssignedResourceEmitter.emit({ isGhantView: this.isFromGhantView, starttime: this.addAssignedResourcesmodel.scheduledStartTime, endTime: this.addAssignedResourcesmodel.scheduledEndTime });
          this.addAssignedResourcesModal.hide();

        }
        else if (result.statusCode == 400) {
          ;
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.checkedId = [];
        this.checkedId.length = 0;
        this.loadSave = false;
      });
    //}
    //  else {
    //    this.loadSave = false;
    //    this.toaster.error("You can not schedule appointment before 7AM and after 7PM")
    //}
    }
    else {
      this.commonService.validateAllFormFields(this.addAssignedResourcesForm);
    }
  };

  show(id: any, resourceId: any = null, CrewId: any = null, starttime: any = null, endtime: any = null, type: string = '', timezoneid: any = 0, timezone: any = null) {
    ;
    this.timeFormat = this.commonService.getTimeFormat();
    this.loadSave = true;
    if (resourceId != null || CrewId != null) {
      this.isFromGhantView = true;
    }
    this.timezoneidsch = timezoneid ;
    this.timezonename = timezone;

    this.servicesappointmentlistService.GetServiceapoointDetails(id).subscribe((result: any) => {
      if (result != null) {
        ;
        // console.log('resultresult', result)
        if (type == 'drag') {
          let data: any;
          data = this.lstStatus.filter(m => m.text == "Scheduled")
          // console.log('data',data);
          result.ServiceAppoitnt[0].Status = data[0].value;
        }

        this.SANo = result.ServiceAppoitnt[0].AppointmentNumber;
        if (result.ServiceAppoitnt[0].AccountId != null) {
          this.GetSchdeuleSaListOnAccountId(result.ServiceAppoitnt[0].AccountId);
        }
          
        this.getAccountList(result.ServiceAppoitnt[0].AccountId == null ? null : result.ServiceAppoitnt[0].AccountId.toString());
        this.getWorkTypeList(result.ServiceAppoitnt[0].WorkType == null ? null : result.ServiceAppoitnt[0].WorkType)
        this.getWorkOrderList(result.ServiceAppoitnt[0].workorder == null ? null : result.ServiceAppoitnt[0].workorder.toString());
        this.accountId.setValue(result.ServiceAppoitnt[0].AccountId == null ? null : result.ServiceAppoitnt[0].AccountId.toString());

        if (result.ServiceAppoitnt[0].ServiceResourceId || resourceId !=null) {
          if (resourceId == null) {
            ;
            var ab= (result.ServiceAppoitnt[0].ServiceResourceId == null ? null : result.ServiceAppoitnt[0].ServiceResourceId.toString());
            this.serviceResourceId.setValue(ab);
          }
          else  {
            this.GetServiceResourceDll(resourceId);
            var ac = (resourceId == null ? null : resourceId.toString());
            //this.addAssignedResourcesForm.patchValue({
            //  serviceResourceId: ac
            //})
            this.serviceResourceId.setValue(ac);

          }
         
          this.serviceCrewId.clearValidators();
          this.serviceCrewId.updateValueAndValidity();
          this.serviceCrewId.disable();
          this.serviceResourceId.setValidators([Validators.required]);
          this.serviceResourceId.updateValueAndValidity();
          this.serviceResourceId.enable();
        }
        else if (result.ServiceAppoitnt[0].ServiceCrewId || CrewId != null) {
          if (CrewId == null) {
            this.serviceCrewId.setValue(result.ServiceAppoitnt[0].ServiceCrewId == null ? null : result.ServiceAppoitnt[0].ServiceCrewId.toString());
          }
          else  {
            this.GetServiceCrewDll(CrewId);
            this.serviceCrewId.setValue(CrewId == null ? null : CrewId.toString());
            //this.addAssignedResourcesForm.patchValue({
            //  serviceResourceId: CrewId == null ? null : CrewId.toString()
            //})
          }
          
          this.serviceResourceId.clearValidators();
          this.serviceResourceId.updateValueAndValidity();
          this.serviceResourceId.disable();

          this.serviceCrewId.setValidators([Validators.required]);
          this.serviceCrewId.updateValueAndValidity();
          this.serviceCrewId.enable();
        }
        else {
          this.serviceResourceId.setValidators([Validators.required]);
          this.serviceResourceId.updateValueAndValidity();
          this.serviceResourceId.enable();

          this.serviceCrewId.setValidators([Validators.required]);
          this.serviceCrewId.updateValueAndValidity();
          this.serviceCrewId.enable();
          
        }

        this.editAccountId = result.ServiceAppoitnt[0].AccountId;

        this.accountId.disable();
        //this.editStatusId = result.ServiceAppoitnt[0].Status;
        // this.statusId.setValue(result.ServiceAppoitnt[0].Status);
        this.WorkOrder.setValue(result.ServiceAppoitnt[0].workorder == null ? null : result.ServiceAppoitnt[0].workorder.toString());
        this.workType.setValue(result.ServiceAppoitnt[0].WorkType == null ? null : result.ServiceAppoitnt[0].WorkType);
        this.editWorkOrder = result.ServiceAppoitnt[0].workorder;
        this.editWorkType = result.ServiceAppoitnt[0].WorkType;
        this.getAppointmentStatuList();
        //this.statusId.disable();
        this.WorkOrder.disable();
        this.workType.disable();
        let DateScheduleStartTime: any;
        let DateScheduleEndTime: any;
        let DateArrivalWindowEndTime: any;
        let DateArrivalWindowStartTime: any;
        ;
        if (timezoneid != 0 ) {
          const convertDateTimeghant = new DateTimeToLocalForGhantView;
          if (starttime != null) {

            DateScheduleStartTime = starttime;
          }
          else {
            DateScheduleStartTime = (result.ServiceAppoitnt[0].ScheduleStartTime == null ? null : convertDateTimeghant.transform(result.ServiceAppoitnt[0].ScheduleStartTime, null, timezone, timezoneid));
          }
          if (endtime != null) {
            DateScheduleEndTime = endtime;

          } else {
            DateScheduleEndTime = (result.ServiceAppoitnt[0].ScheduleEndTime == null ? null : convertDateTimeghant.transform(result.ServiceAppoitnt[0].ScheduleEndTime, null, timezone, timezoneid));
          }


          DateArrivalWindowEndTime = (result.ServiceAppoitnt[0].ArrivalWindowEndTime == null ? null : convertDateTimeghant.transform(result.ServiceAppoitnt[0].ArrivalWindowEndTime, null, timezone, timezoneid));
           DateArrivalWindowStartTime = (result.ServiceAppoitnt[0].ArrivalWindowStartTime == null ? null : convertDateTimeghant.transform(result.ServiceAppoitnt[0].ArrivalWindowStartTime, null, timezone, timezoneid));

         
        } else {
         const convertDateTime = new DateTimeToLocalForAddEditPipe;
          if (starttime != null) {

            DateScheduleStartTime = starttime;
          }
          else {
            DateScheduleStartTime = (result.ServiceAppoitnt[0].ScheduleStartTime == null ? null : convertDateTime.transform(result.ServiceAppoitnt[0].ScheduleStartTime, null));
          }
          if (endtime != null) {
            DateScheduleEndTime = endtime;

          } else {
            DateScheduleEndTime = (result.ServiceAppoitnt[0].ScheduleEndTime == null ? null : convertDateTime.transform(result.ServiceAppoitnt[0].ScheduleEndTime, null));
          }


           DateArrivalWindowEndTime = (result.ServiceAppoitnt[0].ArrivalWindowEndTime == null ? null : convertDateTime.transform(result.ServiceAppoitnt[0].ArrivalWindowEndTime, null));
           DateArrivalWindowStartTime = (result.ServiceAppoitnt[0].ArrivalWindowStartTime == null ? null : convertDateTime.transform(result.ServiceAppoitnt[0].ArrivalWindowStartTime, null));

        }
       
       

      
        this.addAssignedResourcesForm.patchValue({
          serviceAppointment: result.ServiceAppoitnt[0].AppointmentNumber,
          Id: result.ServiceAppoitnt[0].Id,
          subject: result.ServiceAppoitnt[0].Subject,
          description: result.ServiceAppoitnt[0].Description,
          statusId: result.ServiceAppoitnt[0].Status,
          equipmentResourceId: result.ServiceAppoitnt[0].ResourceType == null ? null : result.ServiceAppoitnt[0].ResourceType.toString() ,
          workType: result.ServiceAppoitnt[0].WorkType,
          WorkOrder: result.ServiceAppoitnt[0].workorder,
          arrivalWindowStartTime: DateArrivalWindowStartTime,
          arrivalWindowEndTime: DateArrivalWindowEndTime,
          scheduledStartTime: DateScheduleStartTime,
          scheduledEndTime: DateScheduleEndTime
        });
      }
      // console.log('addAssignedResourcesForm.value', this.addAssignedResourcesForm.value)

      setTimeout(() => {
        this.loadSave = false;
      }, 500);
    }, err => {
        this.loadSave = false;
    });

    // console.log('addAssignedResourcesForm.value',this.addAssignedResourcesForm.value)
    this.GetAssignedResourcesList(id);

    this.title = "Add Scheduled Appointment";
    this.addAssignedResourcesModal.show();

  }

  close() {
    this.addAssignedResourcesForm.reset();
    this.addAssignedResourcesModal.hide();
  }


  GetServiceResourceDll(id:any=null) {
    this.servicesappointmentlistService.GetServiceResourceDll(id, 0, '').subscribe((data: any) => {
      this.serviceResourceNames = data;
      // console.log('serviceResourceNames', this.serviceResourceNames);
    })
  }

  GetServiceCrewDll(id: any = null) {
    this.servicesappointmentlistService.GetServiceCrewDll(id, 0, '').subscribe((data: any) => {
      this.serviceCrewNames = data;
    })
  }

  GetEstimatedTravelTimeFromAndToSourceDll() {
    this.servicesappointmentlistService.GetEstimatedTravelTimeFromAndToSourceDll().subscribe((data: any) => {
      this.estimatedTravelTimeFromSourceNames = data;
      this.estimatedTravelTimeToSourceNames = data;
    })
  }



  getAccountList(id) {
    this.commonService.getMasterSubModuleList(id, 'Account').subscribe((result: any) => {
      this.lstAccount = this.commonService.masters;
    })
  }
  getAppointmentStatuList() {
    this.commonService.getMasterItemsList('AppointmentStatus').subscribe((result: any) => {
      this.lstStatus = this.commonService.masters;
      // console.log('lstStatus',this.lstStatus)

    })
  }
  getWorkTypeList(id) {
    this.commonService.getMasterSubModuleList(id, 'WorkType').subscribe((result: any) => {
      this.lstWorkType = this.commonService.masters;
    })
  }
  getWorkOrderList(id) {
    this.commonService.getMasterSubModuleList(id, 'WorkOrder').subscribe((result: any) => {
      this.lstWorkorder = this.commonService.masters;
    })
  }



  changeValidators(type) {
    if (type == 'serviceResourceId' && this.serviceResourceId.value != null && this.serviceCrewId.value == null) {
      this.serviceCrewId.clearValidators();
      this.serviceCrewId.updateValueAndValidity();
      this.serviceResourceId.setValidators([Validators.required]);
      this.serviceResourceId.updateValueAndValidity();

      this.serviceCrewId.disable();
      this.serviceResourceId.enable();

    }
    else if (type == 'serviceCrewId' && this.serviceCrewId.value != null && this.serviceResourceId.value == null) {
      this.serviceResourceId.clearValidators();
      this.serviceResourceId.updateValueAndValidity();
      this.serviceCrewId.setValidators([Validators.required]);
      this.serviceCrewId.updateValueAndValidity();

      this.serviceResourceId.disable();
      this.serviceCrewId.enable();

    }
  }
  resetValidations() {
    if (this.serviceCrewId.value == null && this.serviceResourceId.value == null) {
      this.serviceResourceId.setValidators([Validators.required]);
      this.serviceResourceId.updateValueAndValidity();

      this.serviceCrewId.setValidators([Validators.required]);
      this.serviceCrewId.updateValueAndValidity();
      this.serviceResourceId.enable();
      this.serviceCrewId.enable();

    }
    else if (this.serviceCrewId.value == null && this.serviceResourceId.value != null) {
      this.serviceCrewId.clearValidators();
      this.serviceCrewId.updateValueAndValidity();

      this.serviceResourceId.setValidators([Validators.required]);
      this.serviceResourceId.updateValueAndValidity();

      this.serviceResourceId.enable();
      this.serviceCrewId.disable();
    }
    else if (this.serviceCrewId.value != null && this.serviceResourceId.value == null) {
      this.serviceResourceId.clearValidators();
      this.serviceResourceId.updateValueAndValidity();

      this.serviceCrewId.setValidators([Validators.required]);
      this.serviceCrewId.updateValueAndValidity();

      this.serviceResourceId.disable();
      this.serviceCrewId.enable();

    }

    if (this.lstSelectedCrews.length > 0 || this.lstSelectedResources.length > 0) {
      this.removeValidations();
    }


  }
 
  onScrollToEnd(dataList: any) {
    this.fetchMoreServiceCrew(dataList);
  }

  onKey(e: any, dataList: any) {
    this.len = 0
    this.searchText = e.target.value;
    this.servicesappointmentlistService.GetServiceCrewDll('', this.len, this.searchText).subscribe((data: any) => {
      this.serviceCrewNames = data;
    })
  }

  private fetchMoreServiceCrew(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    this.servicesappointmentlistService.GetServiceCrewDll('', this.len, this.searchText).subscribe((data: any) => {
      this.serviceCrewNames = this.serviceCrewNames.concat(data);
    })
  }

  onClearLang(dataList: any): void {
    this.len = 0
    this.searchText = '';
    this.servicesappointmentlistService.GetServiceCrewDll('', this.len, this.searchText).subscribe((data: any) => {
      this.GetServiceCrewDll = data;
    });
    this.resetValidations();
  }




  onScrollToEndresource(dataList: any) {
    this.fetchMore(dataList);
  }

  private fetchMore(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
   
    this.servicesappointmentlistService.GetServiceResourceDll('', this.len, this.searchText).subscribe((data: any) => {
      this.serviceResourceNames = this.serviceResourceNames.concat(data);
    })

  }

  onKeyresource(e: any, dataList: any) {
    this.len = 0
    this.searchText = e.target.value;
    this.servicesappointmentlistService.GetServiceResourceDll('', this.len, this.searchText).subscribe((data: any) => {
      this.serviceResourceNames = data;
    })
  }

  onClearLangresource(dataList: any): void {
    this.len = 0
    this.searchText = '';
    this.servicesappointmentlistService.GetServiceResourceDll('', this.len, this.searchText).subscribe((data: any) => {
      this.serviceResourceNames = data;
    });
    this.resetValidations();
  }

  //-------------------------configuaration for calender datetime validations start here
  //-------------------------author: Prince Singh on 08-02-2021
  StartDate: any;
  EndDate: any;

  GetCompareDateTimeResult(sDate, eDate, sTitle, eTitle) {
    this.StartDate = sDate;
    this.EndDate = eDate;

    let startDateValue, endDateValue;

    startDateValue = this.sDate.value;
    endDateValue = this.eDate.value;

    this.resetDateTimeValidators();

    if (endDateValue) {
      if (startDateValue > endDateValue) {
        this.sDate.setErrors({ "message": sTitle + " is must be lesser than " + eTitle });
        this.eDate.setErrors({ "message": eTitle + " is must be greater than " + sTitle });
      }
      else {
        this.resetDateTimeValidators();
      }
    }
    else {
      this.resetDateTimeValidators();
    }
   
  }
  get sDate() {
    return this.addAssignedResourcesForm.get(this.StartDate);
  }

  get eDate() {
    return this.addAssignedResourcesForm.get(this.EndDate);
  }

  resetDateTimeValidators() {

    this.sDate.setErrors(null);
    this.eDate.setErrors(null);

    this.sDate.clearValidators;
    this.sDate.updateValueAndValidity();

    this.eDate.clearValidators;
    this.eDate.updateValueAndValidity();
  }
    //-------------------------configuaration for calender datetime validations end here


  GetAssignedResourcesList(id) {
    this.loadSave = true;
    let serviceAppointmentId = id;
    this.servicesappointmentlistService.GetAssignedResourcesList(serviceAppointmentId, 'createdon', 1, 'desc', 50)
      .subscribe(resp => {

        if (resp) {
          let _data = resp.data;
          let arrayResources: any[] = [], arrayCrews: any[] = [];

          for (let item in _data) {
            let child = _data[item];
            for (let childitem in child) {
              if (childitem == 'serviceResource' && child[childitem] != null) {
                arrayResources.push(child[childitem]);
              }
              if (childitem == 'ServiceCrew' && child[childitem] != null) {
                arrayCrews.push(child[childitem]);
              }
            }
          }

          if (arrayResources) {
            this.lstSelectedResources = arrayResources;
          }
          if (arrayCrews) {
            this.lstSelectedCrews = arrayCrews;
          }


          if (arrayResources.length > 0 || arrayCrews.length > 0) {
            this.removeValidations();
          }
        }

        this.loadSave = false;
      }, error => {
        this.loadSave = false;
      });
  }

  removeValidations() {
    this.serviceCrewId.setValue(null);
    this.serviceCrewId.clearValidators();
    this.serviceCrewId.updateValueAndValidity();
    this.serviceCrewId.enable();

    this.serviceResourceId.setValue(null);
    this.serviceResourceId.clearValidators();
    this.serviceResourceId.updateValueAndValidity();
    this.serviceResourceId.enable();
  }

  getEquipmentResources() {
    this.commonService.getMasterItemsList('EquipmentResource').subscribe((result: any) => {
      this.EquipmentResourceList = this.commonService.masters;
      // console.log('EquipmentResourceList', this.EquipmentResourceList)

    })
  }
  GetSchdeuleSaListOnAccountId(accountid: any) {
    ;
    this.servicesappointmentlistService.GetSchdeuleSaListOnAccountId(accountid, this.SANo).subscribe((result: any) => {
    
      this.pagedData = this.servicesappointmentlistService.pagedData;
     
      
      // console.log('pagedData', this.pagedData);
    })
  }
  changeCheckBox(event, id: any,SaNo:any) {
    ;
    const checked = event.target.checked;
    let data: any[] = [];
    if (checked) {
      //data.push({ Id: id })
      this.checkedId.push({ Id: id, SaNo: SaNo })
      //this.checkedSAnumber.push({ SaNo: SaNo })
    }
    else {
      if (this.checkedId.length > 0) {
        var ind = this.checkedId.findIndex(x => x.Id.toString() == id.toString())
        if (ind != -1) {
          this.checkedId.splice(ind, 1);
          //this.checkedSAnumber.splice(ind, 1);
        }

      }
    }
    // console.log('checkedId', this.checkedId);
  }
}
