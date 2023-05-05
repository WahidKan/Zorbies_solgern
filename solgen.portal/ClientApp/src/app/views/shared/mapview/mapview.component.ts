import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonService, addAssignedResourcesModel} from '../common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GMapModule } from 'primeng/primeng';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AddassignedresourcepopupComponent } from '../../servicesappointment/addassignedresourcepopup/addassignedresourcepopup.component';
import { ScriptService } from '../scriptservice.service';


declare var google: any;
@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss']

})
export class MapviewComponent implements OnInit {
  @Input('moduleName') moduleName: any;
  @Input('subModuleName') subModuleName: any;
  @ViewChild('addAssignedResourcesPopup', { static: false }) addAssignedResourcesPopupModel: AddassignedresourcepopupComponent;
  @ViewChild('DetailPopup', { static: false }) DetailPopup: ModalDirective;
  
  @Input() messagerecived: any;
  options: any;
  overlays: any[];
  geocoder: any;
  lat: any;
  lng: any;
  loadSave = false;
  companyId: any;
  columndata: any;
  jsonData: any;
  infoWindow: any;
  SearchName = '';
  listFilter: any;
   marker: any;
  addAssignedResourcesForm: FormGroup;
  title: any;
  addAssignedResourcesmodel: addAssignedResourcesModel = new addAssignedResourcesModel();

  AppointmentNumber: any;
  WorkOrderNumber: any;
  SchedStartTime: any;
  name: any;
  address: any;
  id: any;
  serviceResourceNames: any;
  serviceCrewNames: any;
  estimatedTravelTimeFromSourceNames: any;
  estimatedTravelTimeToSourceNames: any;
  lstAccount: any;
  lstStatus: any;
  lstWorkType: any;
  lstWorkorder: any;
  validityServiceResource: boolean = false;
  validityServiceCrew: boolean = false;
  sortDir = 'desc';
  sortColumn = 'id';
  currentPage: number;
  loginuserid: any;
  pageSizeValue: number;
  searchFilter = '';
  custom_view_id = '';
  form_type = 'MAP';
  constructor(private commonService: CommonService, private router: Router, private activeRoute: ActivatedRoute
    , private toaster: ToastrService, private fb: FormBuilder, private dynamicScripts: ScriptService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.loginuserid = userdetail.id;
    });
    this.dynamicScripts.load('map');

  }

  ngOnInit() {
      
    this.options = {
      center: { lat: 47.500000, lng: -100.000000 },
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.listFilter = '';
    this.overlays = [];
    this.currentPage = 1;
    this.pageSizeValue = 15;
    this.refresh();
    //this.initForm();
    this.infoWindow = new google.maps.InfoWindow();
    //this.GetServiceResourceDll();
    //this.GetServiceCrewDll();
    //this.GetEstimatedTravelTimeFromAndToSourceDll();
    //this.getAccountList();
    //this.getAppointmentStatuList();
    //this.getWorkTypeList();
    //this.getWorkOrderList();

  }
 
  refresh() {
    this.overlays = [];
    this.loadSave = true;
    this.commonService.GetServiceAppointmentList(this.listFilter, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.subModuleName, this.companyId, this.custom_view_id, this.searchFilter, this.form_type)
   // this.commonService.GetMapList(this.moduleName, this.subModuleName, this.companyId, this.listFilter)
      .subscribe(response => {
        this.jsonData = response;
        this.columndata = this.jsonData.data;

        this.columndata.forEach(t => {
          this.addMarker(t);
        });

        this.loadSave = false;

      }, error => {
          this.loadSave = false;
      });
  }

  handleOverlayClick(event) {
    let isMarker = event.overlay.getTitle != undefined;
    if (isMarker) {
      let title = event.overlay.getTitle();

      //// console.log("event.overlay.getContent();", event.overlay.customInfo);
      
      const result = this.columndata.filter(function (x) { return x.id == event.overlay.customInfo; });
      this.id = event.overlay.customInfo;
      this.AppointmentNumber = result[0].AppointmentNumber;
      this.WorkOrderNumber = result[0].WorkOrderNumber;
      this.SchedStartTime = result[0].SchedStartTime;
      this.name = result[0].name;
      this.address = result[0].address;
      this.DetailPopup.show();
      //this.infoWindow.setContent('' + title + '');
      //this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
    }
    
  }


  addMarker(object: any) {
    this.overlays.push(new google.maps.Marker({
      position: { lat: object.Latitude, lng: object.Longitude }, title: object.address, customInfo: object.id, animation: google.maps.Animation.DROP, icon: (object.Status == 'None' || object.Status == null) ? '//maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png' : '//maps.google.com/mapfiles/ms/micons/green-dot.png'
    }));
  }



  updateFilter(event) {
    this.SearchName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.refresh();
    }
  }

  searchServiceAppointment() {
    this.refresh();
  }

  reset() {
    this.listFilter = '';
    this.refresh();
  }


  AddAssignedResources(rowID: any) {  
    //this.addAssignedResourcesForm.patchValue({ 'serviceAppointment': rowID })
    //this.title = "Add Assigned Resource";
    this.DetailPopup.hide();
    this.addAssignedResourcesPopupModel.show(rowID);
  }

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
    });
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
  }


  SaveAssignedResources() {
    if (this.addAssignedResourcesForm.valid) {
      this.loadSave = true;
      this.addAssignedResourcesmodel.Id = this.addAssignedResourcesForm.value.Id;
      this.addAssignedResourcesmodel.serviceAppointment = this.addAssignedResourcesForm.value.serviceAppointment;
      this.addAssignedResourcesmodel.serviceResourceId = this.addAssignedResourcesForm.value.serviceResourceId;
      this.addAssignedResourcesmodel.estimatedTravelTime = this.addAssignedResourcesForm.value.estimatedTravelTime;
      this.addAssignedResourcesmodel.actualTravelTime = this.addAssignedResourcesForm.value.actualTravelTime;
      this.addAssignedResourcesmodel.serviceCrewId = this.addAssignedResourcesForm.value.serviceCrewId;
      this.addAssignedResourcesmodel.estimatedTravelTimeFromSourceId = this.addAssignedResourcesForm.value.estimatedTravelTimeFromSourceId;
      this.addAssignedResourcesmodel.approximateTravelDistanceForm = this.addAssignedResourcesForm.value.approximateTravelDistanceForm;
      this.addAssignedResourcesmodel.estimatedTravelTimeToSourceId = this.addAssignedResourcesForm.value.estimatedTravelTimeToSourceId;
      this.addAssignedResourcesmodel.approximateTravelDistanceTo = this.addAssignedResourcesForm.value.approximateTravelDistanceTo;
      this.addAssignedResourcesmodel.lastUpdatedEpoch = this.addAssignedResourcesForm.value.lastUpdatedEpoch;
      this.addAssignedResourcesmodel.approximateTravelTimeForm = this.addAssignedResourcesForm.value.approximateTravelTimeForm;
      this.addAssignedResourcesmodel.isUpdatedByOptimization = this.addAssignedResourcesForm.value.isUpdatedByOptimization;
      this.addAssignedResourcesmodel.calculatedDurationMinutes = this.addAssignedResourcesForm.value.calculatedDurationMinutes;

      this.addAssignedResourcesmodel.description = this.addAssignedResourcesForm.value.description;
      this.addAssignedResourcesmodel.accountId = this.addAssignedResourcesForm.value.accountId;
      this.addAssignedResourcesmodel.statusId = this.addAssignedResourcesForm.value.statusId;
      this.addAssignedResourcesmodel.subject = this.addAssignedResourcesForm.value.subject;
      this.addAssignedResourcesmodel.workType = this.addAssignedResourcesForm.value.workType;
      this.addAssignedResourcesmodel.WorkOrder = this.addAssignedResourcesForm.value.WorkOrder;
      this.addAssignedResourcesmodel.arrivalWindowStartTime = this.addAssignedResourcesForm.value.arrivalWindowStartTime;

      this.addAssignedResourcesmodel.arrivalWindowEndTime = this.addAssignedResourcesForm.value.arrivalWindowEndTime;
      this.addAssignedResourcesmodel.scheduledStartTime = this.addAssignedResourcesForm.value.scheduledStartTime;
      this.addAssignedResourcesmodel.scheduledEndTime = this.addAssignedResourcesForm.value.scheduledEndTime;


      this.commonService.saveAssignedResource(this.addAssignedResourcesmodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addAssignedResourcesForm.reset();
          // this.refresh();
          //  this.GetAssignedResourcesList();
          //this.addAssignedResourcesPopupModel.hide();
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
      this.commonService.validateAllFormFields(this.addAssignedResourcesForm);
    }
  }

 


  closeDetailPopupPopup() {
    this.DetailPopup.hide();
  }

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

  GetServiceResourceDll() {
    this.commonService.GetServiceResourceDll().subscribe((data: any) => {
      this.serviceResourceNames = data;
    })
  }

  GetServiceCrewDll() {
    this.commonService.GetServiceCrewDll().subscribe((data: any) => {
      this.serviceCrewNames = data;
    })
  }

  GetEstimatedTravelTimeFromAndToSourceDll() {
    this.commonService.GetEstimatedTravelTimeFromAndToSourceDll().subscribe((data: any) => {
      this.estimatedTravelTimeFromSourceNames = data;
      this.estimatedTravelTimeToSourceNames = data;
    })
  }

  getAccountList() {
    this.commonService.getMasterItemsList('Account').subscribe((result: any) => {
      this.lstAccount = this.commonService.masters;
    })
  }
  getAppointmentStatuList() {
    this.commonService.getMasterItemsList('AppointmentStatus').subscribe((result: any) => {
      this.lstStatus = this.commonService.masters;
    })
  }
  getWorkTypeList() {
    this.commonService.getMasterItemsList('WorkType').subscribe((result: any) => {
      this.lstWorkType = this.commonService.masters;
    })
  }
  getWorkOrderList() {
    this.commonService.getMasterItemsList('WorkOrder').subscribe((result: any) => {
      this.lstWorkorder = this.commonService.masters;
    })
  }
  refreshList() {
    this.refresh();
  }

}
