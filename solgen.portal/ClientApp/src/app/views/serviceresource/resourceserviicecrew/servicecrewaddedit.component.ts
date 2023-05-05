import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { UserService } from '../../shared/user.service';
import { ServiceresourseService, addeditServiceCrew } from '../serviceresourse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicecrewaddedit',
  templateUrl: './servicecrewaddedit.component.html',
  styleUrls: ['./servicecrewaddedit.component.scss']
})
export class ServicecrewaddeditComponent implements OnInit {
  @ViewChild('Servicecrew', { static: false }) modalServicecrew: ModalDirective;

  @Output() resourceServicecrewEvent = new EventEmitter();
  active = false;
  appointments: any;
  customers: any;
  lstappointment: any;
  lstappointmentstatus: any;
  isDateChanged: any = true;
  lstResource: any;
  appmodel:addeditServiceCrew = new addeditServiceCrew();
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
  lstTerritoryType: any;
  lstTerritory: any;
  lstOperatingHours: any;
  lstCrew: any;
  interResourceId: any;
  lstResourceSkill: any;
  maxDate: Date;
  minDate: Date;
  loadSave: boolean = false;
  timeFormat: string; /// added by nazir

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
    ;
    this.initForm();
    let today = new Date();
    this.minDate = today;
    this.maxDate = this.minDate;
    this.timeFormat = this.commonService.getTimeFormat();
    // console.log('Time format', this.timeFormat);
  }
  getServiceResource(id) {
    this.commonService.getMasterSubModuleList(id, 'ServiceResource').subscribe((result: any) => {
      this.lstResource = this.commonService.masters;
      // console.log("Resource", this.lstResource);
    })
  }
  getServiceCrewList(id) {
    this.commonService.getMasterItemsList('ServiceCrew').subscribe((result: any) => {
      this.lstCrew = this.commonService.masters;
      // console.log("Resource", this.lstResource);
    })
  }

  show(id) {
    this.interResourceId = id;
    this.title = "New Service Crew Member";
    this.getServiceResource(id);
    this.getServiceCrewList(id);
    this.addForm.get('serviceResource').disable();
    this.serviceResource.setValue(this.interResourceId);
    this.modalServicecrew.show();
  }
  close() {
    this.active = false;
    this.addForm.reset();
    this.modalServicecrew.hide();
  }
  EditCrew(row) {
    this.serviceResource.setValue(row.serviceResourceId);
    this.getServiceResource(row.serviceResourceId);
    this.getServiceCrewList(row.serviceResourceId);
    this.interResourceId = row.serviceResourceId;
    this.startDateModel = row.startDate;
    const SDate: Date = new Date(row.startDate + 'Z');
    
    let EDate= (row.endDate == null ? null : new Date(row.endDate+ 'Z'));
    //val = (cnt.value == '' ? null : new Date(cnt.value + 'Z')); // to convert to local time
    this.title = "Edit Service Crew Member";
    this.isDateChanged = false;
    this.isEdit = true;
    this.addForm.patchValue({
      crewMemberId: row.crewMemberId,
      serviceResource: row.serviceResourceId.toString(),
      serviceCrew: row.serviceCrewId.toString(),
      isLeader: row.IsLeader == null ? false : row.IsLeader,

      startDate: SDate,
      //startTime: '',
      endDate: EDate,
      //endTime: '',

    })
    this.addForm.get('serviceResource').disable();
    this.modalServicecrew.show();
  }
  private initForm() {
    this.addForm = this.fb.group({
      crewMemberId: [null],
      serviceResource: [null, Validators.required],
      serviceCrew: [null, Validators.required],
      isLeader: [false, Validators.nullValidator],
      startDate: [null, Validators.required],
      endDate: [null]
    })
  }

  get crewMemberId() { return this.addForm.get('crewMemberId'); }
  get serviceResource() { return this.addForm.get('serviceResource'); }
  get serviceCrew() { return this.addForm.get('serviceCrew'); }
  get isLeader() { return this.addForm.get('isLeader'); }
  get startDate() { return this.addForm.get('startDate'); }
  get endDate() { return this.addForm.get('endDate'); }

  Save() {
    if (this.addForm.valid) {
      this.appmodel.crewMemberId = this.addForm.value.crewMemberId;
      this.appmodel.serviceResource = this.interResourceId;
      this.appmodel.serviceCrew = this.addForm.value.serviceCrew;
      this.appmodel.isLeader = this.addForm.value.isLeader;
      this.appmodel.startDate = this.addForm.value.startDate;
      this.appmodel.endDate = this.addForm.value.endDate;


      this.serviceresourseService.addeditServiceCrew(this.appmodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          //this.router.navigate(["/calendar"]);

          this.addForm.reset();
          this.modalServicecrew.hide();
          this.resourceServicecrewEvent.emit();

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
