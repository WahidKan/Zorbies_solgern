import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { workTypeModel, WorktypeService, productRequiredmodel, skillRequirementsmodel } from './worktype.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-worktypeview',
  templateUrl: './worktypeview.component.html'
})
export class WorktypeviewComponent implements OnInit {

  productRequiredmodel: productRequiredmodel = new productRequiredmodel();
  skillRequirementsDatamodel: skillRequirementsmodel = new skillRequirementsmodel();
  @ViewChild('addProductRequiredPopupModel', { static: false }) addProductRequiredPopupModel: ModalDirective;
  @ViewChild('addSkillRequirementsPopupModel', { static: false }) addSkillRequirementsPopupModel: ModalDirective;
  workTypeModel: workTypeModel = new workTypeModel();
  loadSave = false;
  workTypePreviewDetail: any;
  isWorkTypePreviewDetail: boolean = false; 
  CreatedBy: any; 
  colorData:string;
  colorCode:string;
  OwnerName: any;
  workTypeId: any;
  productRequiredCount: number = 0;
  skillRequirementsCount: number = 0;
  title: any;
  isValid = true;
  currentPageProductRequired: number;
  currentPagesetSkillRequirementsPage: number;
  pageSizeValueProductRequired: number;
  pageSizeValueSkillRequirements: number;
  quantityUnitOfMeasureList: any;
  parentRecordList: any;
  skillRequirementList: any;
  checkNumberOnly: any;
  dotCount: any;
  checkString: any;
  isAutoCreateCheck: boolean = false;
  isColumnShow: boolean = false;
  productRequiredListingData: any = {
    pager: {},
    data: []
  };
  skillRequirementsListingData: any = {
    pager: {},
    data: []
  };
  
  durationTypeList: any;
  constructionStageList: any;
  sortDir = 'desc';
  sortColumnProductRequired = 'CreatedOn';
  sortColumnSkillRequirements = 'CreatedOn';
  curPage: number;
  pageSizeValue: number;
  @Input() offset: number;
  contentHeader: object;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private worktypeService: WorktypeService, 
    private fb: FormBuilder,
    private toaster: ToastrService,
    private commonService: CommonService,
    private dialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.sortColumnProductRequired = 'CreatedOn';
          this.sortColumnSkillRequirements = 'CreatedOn';
          this.curPage = 1;
          this.pageSizeValue = 10;
          this.currentPageProductRequired = 1;
          this.pageSizeValueProductRequired = 4;
          this.pageSizeValueSkillRequirements = 4;
          this.currentPagesetSkillRequirementsPage = 1;
          this.GetWorktypeViewData(id);
          this.getProductRequiredGridData();
          this.getSkillRequirementsGridData();
        }
        ;
        //this.Id = id;
        this.workTypeId = id;
        //localStorage.setItem('opid', this.opid);
      })
      
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
           name: 'Work Type Detail',
           isLink: false
         }

       ]
   };
 }

  OnBackToListClick() {
    this.router.navigateByUrl("/worktype");
    //this.location.back();
  }

  GetWorktypeViewData(id: any) {
    this.loadSave = true;
    this.workTypeId = id;
    /// this.addOrUpdatePermission = this.isUpdate;
    this.worktypeService.getEditWorkTypeRecords(id).subscribe((result: any) => {
      if (result) {
        debugger;
        // console.log('result', result);
        // console.log('result', result);
        this.workTypeModel.id = result.data[0].id,
          this.workTypeModel.workTypeName = result.data[0].WorkTypeName ,
          this.workTypeModel.description = result.data[0].description ,
          this.workTypeModel.serviceReportTemplate = result.data[0].ServiceReportTemplateId,
          this.workTypeModel.isAutoCreateServiceAppointment = result.data[0].ShouldAutoCreateSvcAppt,
          this.workTypeModel.dueDateOffset = result.data[0].FSL__Due_Date_Offset__c,
          this.workTypeModel.isExactAppointments = result.data[0].FSL__Exact_Appointments__c ,
          this.workTypeModel.minimumCrewSize = result.data[0].MinimumCrewSize == null ? null : result.data[0].MinimumCrewSize.toString(),    
          this.workTypeModel.estimatedDuration = result.data[0].EstimatedDuration == null ? '' : result.data[0].EstimatedDuration.toString(),
          this.workTypeModel.recommendedCrewSize = result.data[0].RecommendedCrewSize,
          this.workTypeModel.durationTypeId = result.data[0].DurationType == null ? null : result.data[0].DurationType.toString(),
          this.workTypeModel.constructionStageId = result.data[0].Construction_Stage__c == null ? null : result.data[0].Construction_Stage__c.toString(),
          this.workTypeModel.isHoldsUpInstall = result.data[0].Holds_Up_Install__c,
          //workOrderLineTemplate: result.workOrderLineTemplate == null ? null : parseInt(result.county),// == null ? null : result.county.toString((),
          this.workTypeModel.workOrderLineTemplate = result.data[0].Work_Order_Line_Template__c,
          this.workTypeModel.createWorkOrdersOnContractClose = result.data[0].Create_Work_Orders_on_Contract_Close__c,
          this.workTypeModel.isActive = result.data[0].isActive,
          this.workTypeModel.maxDuration = result.data[0].maxDuration,
          this.workTypeModel.duration = result.data[0].Duration == null ? null : result.data[0].Duration.substring(16,11),
          this.workTypeModel.colorCode= result.data[0].color == null ? null : result.data[0].color.toString(),
          this.workTypeModel.ownerName= result.data[0].OwnerName,
          this.workTypeModel.isActive=result.data[0].isActive,   
          this.workTypeModel.createdby=result.data[0].CreatedBy,
          this.workTypeModel.createdon=result.data[0].CreatedAt,
          this.workTypeModel.modifiedby=result.data[0].ModifiedBy,
          this.workTypeModel.modifiedon=result.data[0].ModifiedAt,
       // this.workTypePreviewDetail = this.workTypeModel;
          this.isWorkTypePreviewDetail = true;
          
        // console.log("this.workTypePreviewDetail", this.workTypePreviewDetail)
        
        if (this.workTypeModel.isAutoCreateServiceAppointment==true) {
          this.isAutoCreateCheck = true;
        }
        this.loadSave = false;
      }
    },
      (error: any) => {
        this.loadSave = false;
      });
  };

    //===================Start ProductRequired Section============================= 
  AddProductRequired() {
    this.addProductRequiredForm.reset();
    this.title = "Add Product Required";
    //this.isViewNote = false;
    // this.addNoteForm.reset();
    this.GetparentRecordList();
    this.GetquantityUnitOfMeasureList();
    this.addProductRequiredPopupModel.show();
  }

  //========================Getting ProductRequired Form Value=============================
  addProductRequiredForm = this.fb.group({
    productRequired_id: [null],
    parentRecordId: ['', Validators.required],
    productRequired: ['', Validators.required],
    quantityRequired: ['', null],
    dateDelivered: ['', null],
    quantityUnitOfMeasureId: ['', null]
  });


  get productRequired_id() { return this.addProductRequiredForm.get('productRequired_id'); }
  get parentRecordId() { return this.addProductRequiredForm.get('parentRecordId'); }
  get productRequired() { return this.addProductRequiredForm.get('productRequired'); }
  get quantityRequired() { return this.addProductRequiredForm.get('quantityRequired'); }
  get dateDelivered() { return this.addProductRequiredForm.get('dateDelivered'); }
  get quantityUnitOfMeasureId() { return this.addProductRequiredForm.get('quantityUnitOfMeasureId'); }
  //=============================================================================

  saveProductRequiredPopup() {
    if (this.isValid && this.addProductRequiredForm.valid) {
      this.loadSave = true;
      this.productRequiredmodel.productRequired_id = this.addProductRequiredForm.value.productRequired_id;
      this.productRequiredmodel.parentRecordId = this.addProductRequiredForm.value.parentRecordId;
      this.productRequiredmodel.productRequired = this.addProductRequiredForm.value.productRequired;
      this.productRequiredmodel.quantityRequired = this.addProductRequiredForm.value.quantityRequired;
      this.productRequiredmodel.dateDelivered = this.addProductRequiredForm.value.dateDelivered;
      this.productRequiredmodel.quantityUnitOfMeasureId = this.addProductRequiredForm.value.quantityUnitOfMeasureId;

      this.worktypeService.AddEditProductRequiredData(this.productRequiredmodel).subscribe((result: any) => {

        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addProductRequiredForm.reset();
          this.currentPageProductRequired = 1;
          this.getProductRequiredGridData();
          this.addProductRequiredPopupModel.hide();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
          this.currentPageProductRequired = 1;
          // this.getNoteslist();
        }
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addProductRequiredForm);
      this.loadSave = false;
    }
  }

  closeProductRequiredPopup() {
    this.addProductRequiredPopupModel.hide();
  }

  GetparentRecordList() {
    this.commonService.getMasterItemsList('WorkType').subscribe((result: any) => {
      this.parentRecordList = this.commonService.masters;;
    });
  }



  GetquantityUnitOfMeasureList() {
    this.commonService.getMasterItemsList('QuantityUnitOfMeasure').subscribe((result: any) => {
      this.quantityUnitOfMeasureList = this.commonService.masters;;
    });
  }

  getProductRequiredGridData() {
   
    this.loadSave = true;
    this.worktypeService.GetProductRequiredGridData(this.workTypeId,this.sortColumnProductRequired, this.sortDir, this.currentPageProductRequired, this.pageSizeValueProductRequired).subscribe(result => {
      this.productRequiredListingData = result;
      ;
      this.productRequiredCount = result.pager.totalItems;
      // console.log("this.productRequiredListingData", this.productRequiredListingData);
      // console.log("this.productRequiredCount", this.productRequiredCount);
      if (this.productRequiredCount == 0) {
        this.currentPageProductRequired = this.currentPageProductRequired - 1
        if (this.currentPageProductRequired > 0) {
          this.getProductRequiredGridData();
        }

      }
      this.offset = 1;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  };

  setProductRequiredPage($event) {
    this.loadSave = true;
    var ab = $event.page;
    this.currentPageProductRequired = ab;
    this.getProductRequiredGridData();
    this.loadSave = false;
  }
  onProductRequiredSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumnProductRequired = sort.prop;
    this.getProductRequiredGridData();
  }

  onChange($event) {
    this.getProductRequiredGridData();
  }

  EditProductRequired(row: any) { 
    ;
    // console.log("row", row);
    this.GetparentRecordList();
    this.GetquantityUnitOfMeasureList();
    //this.isViewNote = false;
    this.title = "Edit Product Required";
    //this.isEdit = true;
    let DateDelivered = (row.Date_Delivered__cc == null ? null : new Date(row.Date_Delivered__cc + 'Z'));
    // console.log("DateDelivered", DateDelivered);

    this.addProductRequiredForm.patchValue({ 
      productRequired_id: row.Id,
      parentRecordId: row.WorkTypeId.toString(),
      productRequired: row.ProductRequiredNumber,
      quantityRequired: row.QuantityRequired,
      dateDelivered: DateDelivered,
      quantityUnitOfMeasureId: row.QuantityUnitOfMeasure == null ? null: row.QuantityUnitOfMeasure.toString() 
    });
    
    this.addProductRequiredPopupModel.show();
    // console.log("this.addProductRequiredForm", this.addProductRequiredForm);
  }


  DeleteProductRequired(row, sectionName) {
    const message = `Are you sure you want to delete Product?`;
    this.dialogService.confirm('Delete Product', message).subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;
        this.worktypeService.DeleteRecords(row.Id, 'tblProductRequired').subscribe((res: any) => {
          this.toaster.success(`Product has been deleted successfully..`);
          this.getProductRequiredGridData();
        });
      }
    });
  }

  //===================End ProductRequired Section=============================


    //===================Start Skill Requirements Section=============================




  addSkillRequirementsForm = this.fb.group({
    skillRequirement_id: [null],
    requiredFor:['',Validators.required],
    skillRequirement: ['', Validators.required],
    skillLevel: ['', Validators.required]    
  });

  get skillRequirement_id() { return this.addSkillRequirementsForm.get('skillRequirement_id'); }
  get requiredFor() { return this.addSkillRequirementsForm.get('requiredFor'); }
  get skillRequirement() { return this.addSkillRequirementsForm.get('skillRequirement'); }
  get skillLevel() { return this.addSkillRequirementsForm.get('skillLevel'); }


  getSkillRequirementsGridData() {
    this.loadSave = true;
    this.worktypeService.getSkillRequirementsGridData(this.sortColumnSkillRequirements, this.sortDir, this.currentPagesetSkillRequirementsPage, this.pageSizeValueSkillRequirements).subscribe(result => {
      this.skillRequirementsListingData = result;
      this.skillRequirementsCount = result.pager.totalItems;
      // console.log("this.skillRequirementsListingData", this.skillRequirementsListingData);
      this.offset = 1;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  };

  AddSkillRequirements() {
    this.addSkillRequirementsForm.get('requiredFor').enable();
    this.addSkillRequirementsForm.reset();
    this.title = "Add Skill Requirements";
    this.GetSkillRequirementList();
    //this.isViewNote = false;
    // this.addNoteForm.reset();
    this.GetparentRecordList(); 
    this.addSkillRequirementsPopupModel.show();
  }


  GetSkillRequirementList() {   
    this.commonService.getMasterItemsList('ResourceSkill').subscribe((result: any) => {
      this.skillRequirementList = this.commonService.masters;;
    });
  }
  closeSkillRequirementsPopup() {
    this.addSkillRequirementsPopupModel.hide();
  }

  setSkillRequirementsPage($event) {
    var ab = $event.page;
    this.currentPagesetSkillRequirementsPage = ab;
    this.getSkillRequirementsGridData();
  }
  onSkillRequirementsSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumnSkillRequirements = sort.prop; 
    this.getSkillRequirementsGridData();
  }


  EditSkillRequirements(row: any) {
    this.GetparentRecordList(); 
    this.GetSkillRequirementList();
    //this.isViewNote = false;
    this.title = "Edit Skill Requirement";
    //this.isEdit = true;

    this.addSkillRequirementsForm.patchValue({
      skillRequirement_id: row.Id == null ? null : row.Id.toString(),
      requiredFor: row.WorkTypeId == null ? null : row.WorkTypeId.toString(),
      skillRequirement: row.SkillId == null ? null : row.SkillId.toString(),
      skillLevel: row.SkillLevel == null ? null : row.SkillLevel.toString()
    });
    this.addSkillRequirementsForm.get('requiredFor').disable();
    this.addSkillRequirementsPopupModel.show();
    // console.log("this.addSkillRequirementsForm", this.addSkillRequirementsForm);
  }

  DeleteSkillRequirements(row) {
    const message = `Are you sure you want to delete Skill Requirement?`;
    this.dialogService.confirm('Delete Skill Requirement', message).subscribe(confirmed => {
      if (confirmed) {
        this.worktypeService.DeleteRecords(row.Id, 'tblSkillRequirement').subscribe((res: any) => {
          this.toaster.success(`Skill Requirement has been deleted successfully..`);
          this.getSkillRequirementsGridData();
        });
      }
    });
  }

  saveSkillRequirementsPopup() {
    if (this.isValid && this.addSkillRequirementsForm.valid) {
      this.loadSave = true; 
      this.skillRequirementsDatamodel.skillRequirement_id = this.addSkillRequirementsForm.value.skillRequirement_id;
      this.skillRequirementsDatamodel.requiredFor = this.addSkillRequirementsForm.value.requiredFor;
      this.skillRequirementsDatamodel.skillRequirement = this.addSkillRequirementsForm.value.skillRequirement;
      this.skillRequirementsDatamodel.skillLevel = this.addSkillRequirementsForm.value.skillLevel;

      this.worktypeService.AddEditskillRequirementsData(this.skillRequirementsDatamodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addSkillRequirementsForm.reset();
          this.currentPagesetSkillRequirementsPage = 1; 
          this.getSkillRequirementsGridData();
          this.addSkillRequirementsPopupModel.hide();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
          this.currentPagesetSkillRequirementsPage = 1;
          // this.getNoteslist();
        }
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addSkillRequirementsForm);
      this.loadSave = false;
    }
  }


    //===================End Skill Requirements Section=============================
  allowTwoDecimalOnly(event): boolean {
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
  SetColorFor() {
    ;
    let data = this.S4();
    this.colorData = data;
    this.colorCode = this.workTypePreviewDetail.value.Color;
    //this.colorCode[] = rendomdata;
    // console.log("this.colorCode", this.colorCode[i])
    //this.configurationSetings.value.addmoreFields[i].chooseColor;    
  }
  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
