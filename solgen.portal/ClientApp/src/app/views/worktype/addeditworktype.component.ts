import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService, Master, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { workTypeModel, WorktypeService } from './worktype.service';
import { ToastrService } from 'ngx-toastr';
import { DateTime } from '@syncfusion/ej2-angular-charts';
import moment from 'moment-timezone';
import { moreEventsClick } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-addeditworktype',
  templateUrl: './addeditworktype.component.html'
})
export class AddeditworktypeComponent implements OnInit {
  color1: string;
  workTypeModel: workTypeModel = new workTypeModel();

  durationTypeList: any;
  constructionStageList: any;
  addOrUpdatePermission: boolean = false;
  modulePermission: any[] = [];
  addWorkTypeForm: FormGroup;
  loadSave = false;
  pageTitle: string;
  ID: string;
  isEdit = false;
  checkNumberOnly: any;
  dotCount: any;
  checkString: any;
  commissionTypeList: any;
  colorCode: string; //any[] = [];
  colorData: string;
  contentHeader: object;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private location: Location,
    private worktypeService: WorktypeService,
    private toaster: ToastrService,
    private router: Router) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    if (add == undefined) {
      // add = "null";
      //this.addOrUpdatePermission = false;
      this.addOrUpdatePermission = true;
    } else {
      // this.isAdd = true;
      this.addOrUpdatePermission = true;
    }
  }

  ngOnInit() {

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.pageTitle = 'Edit Work Type';
          this.ID = id;
          this.fillEditForm(id);
        }
        else {
          this.loadSave = true;
          this.pageTitle = 'Add Work Type';
        }
      }
    );

    this.intitialize();
    this.GetdurationTypeList();
    this.getcommissionTypeList();
    this.GetconstructionStageList();
    this.addOrUpdatePermission = true;



    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Work Type',
      actionButton: true,
      iconCssClass: '',
      breadcrumb:
        [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard'
          },
          {
            name: 'Manage Work Type',
            isLink: true,
            link: '/worktype'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }


  //addWorkTypeForm = this.fb.group({
  //  workTypeName: [null, Validators.nullValidator],
  //  description: [null, Validators.nullValidator],
  //  serviceReportTemplate: [null, Validators.nullValidator],
  //  isAutoCreateServiceAppointment: [''],
  //  dueDateOffset: [null, Validators.nullValidator],
  //  isExactAppointments: [''],
  //  minimumCrewSize: [null, Validators.nullValidator],
  //  estimatedDuration: ['', Validators.required],
  //  recommendedCrewSize: [null, Validators.nullValidator],
  //  durationTypeId: [null, Validators.required],
  //  constructionStageId: [null],
  //  isHoldsUpInstall: [''],
  //  workOrderLineTemplate: [null, Validators.nullValidator],
  //});


  private intitialize() {
    this.addWorkTypeForm = this.fb.group({
      workTypeName: [null, Validators.required],
      description: [null, Validators.nullValidator],
      serviceReportTemplate: [null, Validators.nullValidator],
      isAutoCreateServiceAppointment: [''],
      dueDateOffset: [null, Validators.nullValidator],
      isExactAppointments: [''],
      minimumCrewSize: [null, Validators.nullValidator],
      estimatedDuration: ['', Validators.nullValidator],
      recommendedCrewSize: [null, Validators.nullValidator],
      constructionStageId: [null],
      isHoldsUpInstall: [''],
      ownerName: [''],
      workOrderLineTemplate: [null, Validators.nullValidator],
      createWorkOrdersOnContractClose: [null, Validators.nullValidator],
      commissionTypeId: ['', Validators.nullValidator],
      commissionValue: ['', Validators.nullValidator],
      chooseColor: [''],
      isActive: [''],
      duration: [null, Validators.required],
      createdon: [''],
      modifiedon: [''],
      createdby: [''],
      modifiedby: [''],


    });
    setTimeout(() => {
      this.loadSave = false;
    }, 1000);
  }

  get workTypeName() { return this.addWorkTypeForm.get('workTypeName'); }
  get ownerName() { return this.addWorkTypeForm.get('ownerName'); }
  get description() { return this.addWorkTypeForm.get('description'); }
  get serviceReportTemplate() { return this.addWorkTypeForm.get('serviceReportTemplate'); }
  get isAutoCreateServiceAppointment() { return this.addWorkTypeForm.get('isAutoCreateServiceAppointment'); }
  get dueDateOffset() { return this.addWorkTypeForm.get('dueDateOffset'); }
  get isExactAppointments() { return this.addWorkTypeForm.get('isExactAppointments'); }
  get minimumCrewSize() { return this.addWorkTypeForm.get('minimumCrewSize'); }
  get estimatedDuration() { return this.addWorkTypeForm.get('estimatedDuration'); }
  get maxDuration() { return this.addWorkTypeForm.get('maxDuration'); }
  get recommendedCrewSize() { return this.addWorkTypeForm.get('recommendedCrewSize'); }
  get durationTypeId() { return this.addWorkTypeForm.get('durationTypeId'); }
  get constructionStageId() { return this.addWorkTypeForm.get('constructionStageId'); }
  get isHoldsUpInstall() { return this.addWorkTypeForm.get('isHoldsUpInstall'); }
  get workOrderLineTemplate() { return this.addWorkTypeForm.get('workOrderLineTemplate'); }
  get createWorkOrdersOnContractClose() { return this.addWorkTypeForm.get('createWorkOrdersOnContractClose'); }
  get commissionTypeId() { return this.addWorkTypeForm.get('commissionTypeId'); }
  get commissionValue() { return this.addWorkTypeForm.get('commissionValue'); }
  get isActive() { return this.addWorkTypeForm.get('isActive'); }
  get duration() { return this.addWorkTypeForm.get('duration'); }
  get createdby() { return this.addWorkTypeForm.get('CreatedBy'); }
  get createdon() { return this.addWorkTypeForm.get('createdOn'); }
  get modifiedby() { return this.addWorkTypeForm.get('modifiedby'); }
  get modifiedon() { return this.addWorkTypeForm.get('modifiedon'); }


  addeditWorkType() {

    if (this.addWorkTypeForm.valid) {
      debugger;
      this.loadSave = true;
      this.workTypeModel.id = this.ID;
      this.workTypeModel.workTypeName = this.addWorkTypeForm.value.workTypeName;
      this.workTypeModel.description = this.addWorkTypeForm.value.description;
      this.workTypeModel.serviceReportTemplate = this.addWorkTypeForm.value.serviceReportTemplate;
      this.workTypeModel.isAutoCreateServiceAppointment = this.addWorkTypeForm.value.isAutoCreateServiceAppointment;
      this.workTypeModel.dueDateOffset = this.addWorkTypeForm.value.dueDateOffset;
      this.workTypeModel.isExactAppointments = this.addWorkTypeForm.value.isExactAppointments;
      this.workTypeModel.minimumCrewSize = this.addWorkTypeForm.value.minimumCrewSize;
      this.workTypeModel.estimatedDuration = this.addWorkTypeForm.value.estimatedDuration;
      this.workTypeModel.maxDuration = this.addWorkTypeForm.value.maxDuration;
      this.workTypeModel.recommendedCrewSize = this.addWorkTypeForm.value.recommendedCrewSize;
      this.workTypeModel.durationTypeId = this.addWorkTypeForm.value.durationTypeId;
      this.workTypeModel.constructionStageId = this.addWorkTypeForm.value.constructionStageId;
      this.workTypeModel.isHoldsUpInstall = this.addWorkTypeForm.value.isHoldsUpInstall;
      this.workTypeModel.workOrderLineTemplate = this.addWorkTypeForm.value.workOrderLineTemplate;
      this.workTypeModel.createWorkOrdersOnContractClose = this.addWorkTypeForm.value.createWorkOrdersOnContractClose;
      this.workTypeModel.ownerName = this.addWorkTypeForm.value.ownerName;
      this.workTypeModel.commissionTypeId = this.addWorkTypeForm.value.commissionTypeId;
      this.workTypeModel.commissionValue = this.addWorkTypeForm.value.commissionValue;
      
      this.workTypeModel.duration = this.addWorkTypeForm.value.duration;
      this.workTypeModel.createdon = this.addWorkTypeForm.value.CreatedDate;
      this.workTypeModel.createdby = this.addWorkTypeForm.value.CreatedBy;
      this.workTypeModel.modifiedby = this.addWorkTypeForm.value.modifiedby;
      this.workTypeModel.modifiedon = this.addWorkTypeForm.value.modifiedon;
      this.workTypeModel.isActive = this.addWorkTypeForm.value.isActive == "" ? false : true;
      this.workTypeModel.colorCode = this.colorCode;


      // console.log("this.workTypeModel", this.workTypeModel);
      this.worktypeService.addeditWorkTypeRecords(this.workTypeModel).subscribe((result: any) => {
        // console.log('asdasdasd', result);
        ;
        if (result.statusCode == 200) {
          this.router.navigateByUrl("/worktype");
          this.loadSave = false;
          this.toaster.success(result.responseMessage);

        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      })
    }
    else {
      this.commonService.validateAllFormFields(this.addWorkTypeForm);
    }
  }
  Cancel() {
    this.location.back();
    //this.router.navigateByUrl("/user");
  }

  GetdurationTypeList() {
    this.commonService.getMasterItemsList('DurationType').subscribe((result: any) => {
      this.durationTypeList = this.commonService.masters;;
    });
  }
  getcommissionTypeList() {
    ;
    this.commonService.getMasterItemsList('CommissionType').subscribe((result: any) => {
      this.commissionTypeList = this.commonService.masters;
      // console.log("commissionTypeList", this.commissionTypeList)
    });
  }
  GetconstructionStageList() {
    this.commonService.getMasterItemsList('ConstructionStage').subscribe((result: any) => {
      this.constructionStageList = this.commonService.masters;
    });
  }

  allowTwoDecimalOnly(event): boolean {
    ;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 46) {
      this.dotCount += 1;
      this.checkNumberOnly = (event.target.value);
      var numericCheck = (event.target.value).toString();
      if (numericCheck.includes('.')) {
        this.dotCount += 1;
      }
      if (this.dotCount > 1) {
        this.dotCount = 0;
        return false;
      }
    }
    if (charCode > 31 && (charCode < 45 || charCode > 57 || charCode == 47)) {
      return false;
    }
    this.checkNumberOnly = (event.target.value);
    if (this.checkNumberOnly != null) {
      ;
      var numeric = (event.target.value).toString();
      if (numeric.includes('.')) {
        var checkNumeric = numeric.split('.');
        if (checkNumeric.length > 2) {
          return false;
        }
        this.checkString = checkNumeric[1].split('');
        if (this.checkString.length > 1) {
          // this.toastrService.warning("Invalid value", "Warning");
          return false;
        }
      }

    }
    this.dotCount = 0;
    return true;

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  fillEditForm(id) {
    ;
    /// this.addOrUpdatePermission = this.isUpdate;
    this.worktypeService.getEditWorkTypeRecords(id).subscribe((result: any) => {
      ;
      if (result) {
        ;
        // console.log('result', result);
        this.pageTitle = 'Edit Work Type';
        this.isEdit = true;
        var time = moment((result.data[0].Duration) as Date).format('YYYY-MM-DDTHH:mm:ss')
        // this.isEdit = true;
        this.loadSave = false;
        // console.log('result', result);
        this.addWorkTypeForm.patchValue({
          id: result.data[0].id,
          workTypeName: result.data[0].WorkTypeName.toString(),
          description: result.data[0].description == null ? null : result.data[0].description.toString(),
          serviceReportTemplate: result.data[0].ServiceReportTemplateId,
          isAutoCreateServiceAppointment: result.data[0].ShouldAutoCreateSvcAppt,
          dueDateOffset: result.data[0].FSL__Due_Date_Offset__c,
          isExactAppointments: result.data[0].FSL__Exact_Appointments__c == null ? null : result.data[0].FSL__Exact_Appointments__c,
          minimumCrewSize: result.data[0].MinimumCrewSize == null ? null : result.data[0].MinimumCrewSize.toString(),
          estimatedDuration: result.data[0].EstimatedDuration == null ? '' : result.data[0].EstimatedDuration.toString(),
          maxDuration: result.data[0].maxDuration == null ? '' : result.data[0].maxDuration.toString(),
          recommendedCrewSize: result.data[0].RecommendedCrewSize,
          durationTypeId: result.data[0].DurationTypeId == null ? null : result.data[0].DurationTypeId.toString(),
          constructionStageId: result.data[0].ConstructionStageId == null ? null : result.data[0].ConstructionStageId.toString(),
          isHoldsUpInstall: result.data[0].Holds_Up_Install__c,
          //workOrderLineTemplate: result.workOrderLineTemplate == null ? null : parseInt(result.county),// == null ? null : result.county.toString((),
          workOrderLineTemplate: result.data[0].Work_Order_Line_Template__c,
          createWorkOrdersOnContractClose: result.data[0].Create_Work_Orders_on_Contract_Close__c,
          commissionTypeId: result.data[0].commissionTypeId == null ? null : result.data[0].commissionTypeId.toString(),
          commissionValue: result.data[0].CommissionValue == null ? null : result.data[0].CommissionValue.toString(),
          chooseColor: result.data[0].color == null ? null : result.data[0].color.toString(),
          ownerName: result.data[0].OwnerName,
          isActive: result.data[0].isActive,
          createdby: result.data[0].CreatedBy,
          createdon: result.data[0].CreatedAt,
          modifiedby: result.data[0].ModifiedBy,
          modifiedon: result.data[0].ModifiedAt,
          duration: new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(result.data[0].Duration)),

          //.format('hh:mm A'),

        });
        debugger;
        // console.log("chooseColor", this.addWorkTypeForm);
        this.colorCode = result.data[0].color == null ? null : result.data[0].color.toString();
        // console.log("this.colorCode1", this.colorCode);
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
    // console.log("this.addWorkTypeForm", this.addWorkTypeForm);
  }
  SetColorFor(i: any, e: any) {
    ;
    let data = this.S4();
    this.colorData = data;
    this.colorCode = this.addWorkTypeForm.value.chooseColor;
    //this.colorCode[] = rendomdata;
    // console.log("this.colorCode", this.colorCode[i])
    //this.configurationSetings.value.addmoreFields[i].chooseColor;    
  }
  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}    
