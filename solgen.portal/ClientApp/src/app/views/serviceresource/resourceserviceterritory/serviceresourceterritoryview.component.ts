import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { ServiceresourseService, ServiceTerritorymodel } from '../serviceresourse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/user.service';
import { DateTimeToLocalForAddEditPipe } from '../../../pipes/datetime.pipe';

@Component({
  selector: 'app-serviceresourceterritoryview',
  templateUrl: './serviceresourceterritoryview.component.html',
  styleUrls: ['./serviceresourceterritoryview.component.scss']
})
export class ServiceresourceterritoryviewComponent implements OnInit {

  @ViewChild('sourceterritory', { static: false }) modalSourceterritory: ModalDirective;

  @Output() resourceSourceterritoryEvent = new EventEmitter();
  active = false;
  appointments: any;
  customers: any;
  lstappointment: any;
  lstappointmentstatus: any;
  isDateChanged: any = true;
  lstResource: any;
  appmodel: ServiceTerritorymodel = new ServiceTerritorymodel();
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
  lstState: any;
  lstCountry: any;
  todate: Date;
  maxDate: Date;
  minDate: Date;
  lstTerritoryType: any;
  lstTerritory: any;
  lstOperatingHours: any;
  interResourceId: any;
  lstResourceSkill: any;
  loadSave: boolean = false;
  timeFormat: string;
  datetime = new DateTimeToLocalForAddEditPipe;

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
   // this.getServiceResource('');
    this.getState();
    this.getCountry();
   //this.getServiceTerritoryList();
    this.getoperatingHours();
    this.GetTerritoryType();

    let today = new Date();
    this.minDate = today;
    this.maxDate = this.minDate;
  }

  getServiceResource(id) {
    this.commonService.getMasterSubModuleList(id, 'ServiceResource').subscribe((result: any) => {
      this.lstResource = this.commonService.masters;
      // console.log("Resource", this.lstResource);
    })
  }
  getState() {
    //this.commonService.getMasterItemsList('State').subscribe((result: any) => {
    //  this.lstState = this.commonService.masters;
    //  // console.log("Resource", this.lstResource);
    //})
    this.commonService.getStatesList().subscribe(res => {
      this.lstState = this.commonService.states;
    });
  }
  getCountry() {
    this.serviceresourseService.getCountryList().subscribe((result: any) => {
      this.lstCountry = result;
    })
  }
  getServiceTerritoryList(id) {
    this.commonService.getMasterSubModuleList(id,'ServiceTerritory').subscribe((result: any) => {
      this.lstTerritory = this.commonService.masters;
      // console.log("Resource", this.lstResource);
    })
  }

  //TerritoryType
  GetTerritoryType() {
    this.commonService.getMasterItemsList('TerritoryType').subscribe((result: any) => {
      this.lstTerritoryType = this.commonService.masters;
      // console.log("Resource", this.lstResource);
    })
  }
  getoperatingHours() {
    this.commonService.getMasterItemsList('operatingHours').subscribe((result: any) => {
      this.lstOperatingHours = this.commonService.masters;
      // console.log("Resource", this.lstResource);
    })
  }
  show(id) {
    this.timeFormat = this.commonService.getTimeFormat();
    this.title = "New Service Territory Member";
    this.getServiceResource(id);
    this.getState();
    this.interResourceId = id;
    this.serviceResource.setValue(this.interResourceId);
    this.getCountry();
    this.getServiceTerritoryList(this.interResourceId);
    this.getoperatingHours();
    this.GetTerritoryType();
    this.addForm.get('serviceResource').disable();
    this.modalSourceterritory.show();
  }
  EditTerritory(row) {
    this.getServiceResource(row.serviceResource);
    this.getServiceTerritoryList(row.serviceResource);
    // console.log("console", row);
    this.interResourceId = row.serviceResource;
    this.startDateModel = row.startDate;
    this.addForm.get('serviceResource').disable();
    const SDate: Date = this.datetime.transform(row.startDate,null);
    //const EDate: Date = new Date(row.endDate + 'Z');
    let EDate = (row.endDate == null ? null : this.datetime.transform(row.endDate ,null));
    //this.serviceResource.setValue(this.interResourceId);
    this.title = "Edit Service Territory Member";
    this.isDateChanged = false;
    let serviceResource = '';
    if (row.serviceResource != null && row.serviceResource!='') {
      serviceResource = row.serviceResource.toString();
    }
    this.isEdit = true;
    this.addForm.patchValue({
      territoryId: row.territoryId,
      serviceResource: this.interResourceId.toString(),
      serviceTerritoryId: row.serviceTerritoryId.toString(),
      territoryType: row.TerritoryType.toString(),
      country: parseInt(row.country),
      addressDes:row.address,
      city:row.city,
      state: parseInt(row.state),
      zipCode: row.zipCode,
      operatingHours: row.operatingHours,
      startDate: SDate,
      //startTime: '',
      endDate: EDate,
      //endTime: '',

    })
       //val = (cnt.value == '' ? null : new Date(cnt.value + 'Z')); // to convert to local time
    this.modalSourceterritory.show();
  }
  close() {
    this.active = false;
    this.addForm.reset();
    this.modalSourceterritory.hide();
  }

  private initForm() {
    this.addForm = this.fb.group({
      territoryId: [null],
      serviceResource: [null, Validators.required],
      serviceTerritoryId: [null, Validators.required],
      territoryType: [null, Validators.required],
      address: [null],
      country: [null],
      addressDes: [null],
      city: [null],
      state: [null],
      zipCode: [null, [Validators.nullValidator, Validators.pattern("^[0-9]*$")]],
      operatingHours: [null],
      startDate: [null, Validators.required],
      endDate:[null]
    })
  }

  get territoryId() { return this.addForm.get('territoryId'); }
  get serviceResource() { return this.addForm.get('serviceResource'); }
  get serviceTerritoryId() { return this.addForm.get('serviceTerritoryId'); }
  get territoryType() { return this.addForm.get('territoryType'); }
  get address() { return this.addForm.get('address'); }
  get country() { return this.addForm.get('country'); }
  get addressDes() { return this.addForm.get('addressDes'); }
  get city() { return this.addForm.get('city'); }
  get state() { return this.addForm.get('state'); }
  get zipCode() { return this.addForm.get('zipCode'); }
  get operatingHours() { return this.addForm.get('operatingHours'); }
  get startDate() { return this.addForm.get('startDate'); }
  get endDate() { return this.addForm.get('endDate'); }

  Save() {
    if (this.addForm.valid) {
      this.appmodel.territoryId = this.addForm.value.territoryId;
      this.appmodel.serviceResource = this.interResourceId;//this.addForm.value.serviceResource;
      this.appmodel.serviceTerritoryId = this.addForm.value.serviceTerritoryId;
      this.appmodel.territoryType = this.addForm.value.territoryType;
      this.appmodel.address = this.addForm.value.address;

      this.appmodel.country = this.addForm.value.country;
      this.appmodel.addressDes = this.addForm.value.addressDes;
      this.appmodel.city = this.addForm.value.city;
      this.appmodel.state = this.addForm.value.state;
      this.appmodel.zipCode = this.addForm.value.zipCode;
      this.appmodel.operatingHours = this.addForm.value.operatingHours;
      this.appmodel.startDate = this.commonService.getUserSelectedZoneToUTC(this.startDate.value);
      if (this.endDate.value != null) {
        this.appmodel.endDate = this.commonService.getUserSelectedZoneToUTC(this.endDate.value);
      } else {
        this.appmodel.endDate = null;
      }
     

      this.serviceresourseService.addeditServiceTerritory(this.appmodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          //this.router.navigate(["/calendar"]);

          this.addForm.reset();
          this.modalSourceterritory.hide();
          this.resourceSourceterritoryEvent.emit();

        }
        else {
          //this.loadSave = false;
          this.toaster.error(result.responseMessage);

        }
      }, error => {
        //this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  }

 
}
