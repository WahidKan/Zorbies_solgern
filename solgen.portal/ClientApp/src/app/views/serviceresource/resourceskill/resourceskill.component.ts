import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModuleList, CommonService } from '../../shared/common.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServiceresourseService, Skillmodel } from '../serviceresourse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resourceskill',
  templateUrl: './resourceskill.component.html',
  styleUrls: ['./resourceskill.component.scss']
})
export class ResourceskillComponent implements OnInit {
  @ViewChild('resourceSkill', { static: false }) modalresourceSkill: ModalDirective;

  @Output() resourceSkillEvent = new EventEmitter();
  active = false;
  appointments: any;
  customers: any;
  lstappointment: any;
  lstappointmentstatus: any;
  isDateChanged: any = true;
  lstResource: any;
  appmodel: Skillmodel = new Skillmodel();
  fTime: Date = new Date(0);
  Tdate: Date = new Date(0); customerID: any;
  utcDate: Date;
  appId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  title: any;
  minimumDate = new Date();
  isEdit = false;
  startDateModel: any;
  minToTime: Date;
  maxToTime: Date;
  //isEdit = false;
  addForm: FormGroup;
  minFromTime: Date;
  todate: Date;
  maxDate: Date;
  minDate : Date;
  EstartDate: any;
  eEndDate: any;
  interResourceId: any;
  lstResourceSkill: any;

  loadSave: boolean = false;
  timeFormat: string ;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private serviceresourseService: ServiceresourseService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.initForm();
    this.getResourceSkill();
    this.getServiceResource('');

    let today = new Date();
    //let month = today.getMonth();
    //let year = today.getFullYear();
    //let prevMonth = (month === 0) ? 11 : month - 1;
    //let nextMonth = (month === 11) ? 0 : month + 4;
    this.minDate = today;
    this.maxDate = this.minDate;
    //this.minDate.setMonth(prevMonth);
    //this.maxDate.setMonth(nextMonth);
  }


  getServiceResource(id) {
    this.commonService.getMasterSubModuleList(id, 'ServiceResource').subscribe((result: any) => {
      this.lstResource = this.commonService.masters;
      // console.log("Resource", this.lstResource);
    })
  }

  getResourceSkill() {
    this.commonService.getMasterItemsList('ResourceSkill').subscribe((result: any) => {
      this.lstResourceSkill = this.commonService.masters;
    })
  }
  show(id) {
    this.timeFormat = this.commonService.getTimeFormat();

    this.interResourceId = id;
    
    this.getResourceSkill();
    this.getServiceResource(id);
    this.title = "New Service Resource Skill";
    this.appId = null;
    //this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
    this.active = true;
    this.isEdit = false;
    //this.initForm();
    this.serviceResource.setValue(id);
    //this.serviceResource.disable();
    this.addForm.get('serviceResource').disable();
    let today = new Date();
    this.minDate = today;
    this.maxDate = this.minDate;
    this.modalresourceSkill.show();
    
 
  }

  EditSkill(row: any) {
    this.startDateModel = row.startDate;
    const SDate: Date = new Date(row.startDate + 'Z');
    //const EDate: Date = new Date(row.endDate + 'Z');
    let EDate = (row.endDate == null ? null : new Date(row.endDate + 'Z'));
    this.title = "Edit Service Resource Skill";
    this.isDateChanged = false;
    this.interResourceId = row.serviceResource;
    this.isEdit = true;
    this.getServiceResource(row.serviceResource);
    this.addForm.patchValue({
      skillId: row.Id,
      serviceResource: row.serviceResource.toString(),
      skill: row.skill.toString(),
      skillLevel: row.SkillLevel,

      startDate: SDate,
      //startTime: '',
      endDate: EDate,
      //endTime: '',

    })
    this.addForm.get('serviceResource').disable();
    this.modalresourceSkill.show();

  }
  close() {
    this.active = false;
    let today = new Date();
    this.minDate = today;
    this.maxDate = this.minDate;
    this.addForm.reset();
    this.modalresourceSkill.hide();
  }
  OnChanged(e) {
    this.isDateChanged = true;

  }

  //changeToValue(evt) {
  //  this.minFromTime = new Date();
  //  this.minToTime = evt;

  //  this.todate = evt;
  //  this.maxToTime = new Date();
  //  this.maxToTime.setHours(23);
  //  this.maxToTime.setMinutes(59);
  //}
  private initForm() {
    this.addForm = this.fb.group({
      skillId: [null],
      serviceResource: ['', Validators.required],
      skill: [null, Validators.required],
      skillLevel: [null, [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      startDate: [null, Validators.required],
      startTime: [null],
      endDate: [null],
      endTime: [null],
    })
  }

  get skillId() { return this.addForm.get('skillId'); }
  get serviceResource() { return this.addForm.get('serviceResource'); }
  get skill() { return this.addForm.get('skill'); }
  get skillLevel() { return this.addForm.get('skillLevel'); }
  get startDate() { return this.addForm.get('startDate'); }
  get startTime() { return this.addForm.get('startToTime'); }
  get appointmentWith() { return this.addForm.get('appointmentWith'); }
  get endDate() { return this.addForm.get('endDate'); }
  get endTime() { return this.addForm.get('endToTime'); }

  Save() {
    if (this.addForm.valid) {
      this.appmodel.skillId = this.addForm.value.skillId;
      this.appmodel.serviceResource = this.interResourceId;
      this.appmodel.skill = this.addForm.value.skill;
      this.appmodel.skillLevel = this.addForm.value.skillLevel;
      // let dtdate = new Date(this.addForm.value.startDate);
      this.appmodel.startDate = this.addForm.value.startDate;

      //let enddate = new datetime(this.addForm.value.endDate);
      this.appmodel.endDate = this.addForm.value.endDate;

      this.appmodel.startTime = '';
      this.appmodel.endTime = '';

      this.serviceresourseService.addeditServiceSKill(this.appmodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          //this.router.navigate(["/calendar"]);

          this.addForm.reset();
          this.modalresourceSkill.hide();
          this.resourceSkillEvent.emit();

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
