import { Component, OnInit, ViewChild } from '@angular/core';
import { ModuleList, CommonService } from '../shared/common.service';
import { ConfigurationsettingService, ManageStatusModel, Guarantor, LeadConfigurationModel } from './configurationsetting.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ColorPicker } from 'primeng/colorpicker';



@Component({
  selector: 'app-configurationsetting',
  templateUrl: './configurationsetting.component.html',
  styleUrls: ['./configurationsetting.component.scss']
})
export class ConfigurationsettingComponent implements OnInit {
  @ViewChild('clearModuleDrop', { static: false}) clearModuleDrop: NgSelectComponent;
  @ViewChild('clearSubModuleDrop', { static: false}) clearSubModuleDrop: NgSelectComponent;
  @ViewChild('clearFieldDrop', { static: false}) clearFieldDrop: NgSelectComponent;
  @ViewChild('myColorPicker', { static: false}) myColorPicker: ColorPicker;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  custom_view_id = '';
  color1: string;
  searchFilter = '';
  modulePermission: ModuleList;
  loading = false;
  sortDir = 'desc';
  moduleName = 'crm';
  submoduleName = 'lead';
  sortColumn = 'created_on';
  configurationSetings: FormGroup;
  leadSettingForm: FormGroup;
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  customFieldList1: any;
  currentdisable: '1'
  lstPageSize: any
  pageSizeValue: number;
  currentPage: number;
  listFiltertext = '';
  jsonData: any;
  customCompnentValues: any;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  companyId: any;
  lstModule: any;
  lstsubModule: any;
  lstColorCode: any;
  moduleId: any;
  loadSave = false;
  subModuleId: any;
  mastersId: any;
  indx: any; //CLDC [91120]
  //chooseColor: any;
  colorCode: any[] = [];
  //isSystemGenerated: any;
  customFieldList: any[] = [];
  lstSystemGenerated: any[] = []; //CLDC [91120]

  manageStatusModel: ManageStatusModel = new ManageStatusModel();
  leadConfigurationModel: LeadConfigurationModel = new LeadConfigurationModel();
  field: any;
  contentHeader: object;
  constructor(private configurationsettingService: ConfigurationsettingService, 
    private fb: FormBuilder,
    private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
    });
    this.commonService.getMasterItemsList("custom_modules_layout").subscribe((result: any) => {
      this.lstModule = this.commonService.masters;
    })
    //this.commonService.getMasterItemsList("solgen_usertype").subscribe((result: any) => {
    //  this.lstCompantType = this.commonService.masters;
    //})
  }
  //dynamicArray: Array<DynamicGrid> = []; 
  ngOnInit() {
    this.getColorCode();
    this.initForm();
 
    this.initBreadCrumb();
  }
  initBreadCrumb() {
  this.contentHeader = {
    headerTitle: 'Manage Configuration Setting',
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
          name: 'Manage Configuration Setting',
          isLink: false
        }
  
      ]
  };
  }
  addmoreStatus() {
    //this.isSystemGenerated = false;
    const control = <FormArray>this.configurationSetings.controls['addmoreFields'];
    control.push(this.appendInitForm());
  }
  removeConfiguration(i: number) {
    // remove guarantor from the list

    const control = <FormArray>this.configurationSetings.controls['addmoreFields'];
    control.removeAt(i);
  }
  removeGuarantor(i: number) {
    // remove guarantor from the list
    
      const control = <FormArray>this.configurationSetings.controls['addmoreFields'];
      control.removeAt(i);
    
  }
  restMasterddl() {

  }
  Cancel() {

  }
  getColorCode() {
   // this.chooseColor = "#41b2f9";
    this.lstColorCode = [{ icon: "fa fa-circle blue", text: "#41b2f9", value: "#41b2f9" }, { icon:"fa fa-circle green",text: "#1f824c", value: "#1f824c" },
      { icon: "fa fa-circle red",text: "#e74b3c", value: "#e74b3c" }];
    // console.log("this.lstColorCode", this.lstColorCode);
    return this.lstColorCode;
    
  }
  SetSubmoduleValue(event) {
    this.moduleId = event;
    this.lstsubModule = null;
    this.commonService.getMasterSubModuleList(event, "custom_sub_modules_layout").subscribe((result: any) => {
      this.lstsubModule = this.commonService.masters;

    })
  }

  SetStatusValue(event) {
    this.subModuleId = event;
  
    
    this.configurationsettingService.GetModuleAndSubModuleData(this.moduleId, this.subModuleId, this.companyId).subscribe((result: any) => {
      // this.lstsubModule = this.commonService.masters;
      this.customFieldList1 = this.configurationsettingService.company;
    })


      //this.companyId = 1001;
    //this.configurationsettingService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
    //  if (result) {
    //    
    //      this.customCompnentValues = this.configurationsettingService.customFieldsList.data;
    //      this.customCompnentValues.forEach(t => {
    //        if (t.dt_code== 'select') {
    //          
    //          let obj = {
    //            text: t.label,
    //            value: t.custom_field_id
    //          }

    //          this.customFieldList.push(obj);
    //        }

    //      })
    //    this.customFieldList1 = this.customFieldList;
    //    }
    //  });
    
  }
  SetColorFor(i: any, event: any) {
    let data = this.S4();
   let rendomdata= data;
    rendomdata = this.configurationSetings.value.addmoreFields[i].chooseColor;
    this.colorCode[i] = rendomdata;
    //this.configurationSetings.value.addmoreFields[i].chooseColor;
  }
  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  SetStatusData(event) {
    this.field = event;
    
    this.indx = 0; //CLDC [91120]
    this.lstSystemGenerated = ['']; //CLDC [91120]
    // this.initdisplayStatusForm();
    //
    this.configurationsettingService.getManageStatusDetail(this.moduleId, this.subModuleId, this.field).subscribe((result: any) => {
      if (result) {
        this.initForm();
        this.loadSave = false;
        this.configurationSetings.patchValue({
         
        });
        if (result.statusSingleModels[0] != null) {
          this.moduleId = result.statusSingleModels[0].moduleId;
          this.subModuleId = result.statusSingleModels[0].subMouldeId;
          this.mastersId = result.statusSingleModels[0].masterId;
          this.field = result.statusSingleModels[0].controls;
          
          result.addmoreFields.forEach(m => {
            this.addmoreFields.push(this.initdisplayStatusForm(m));
            this.lstSystemGenerated[this.indx] = m.isSystemGenerated; //CLDC [91120]
            // console.log('this.lstSystemGenerated', this.lstSystemGenerated); //CLDC [91120]
            this.indx = this.indx + 1;
          });
          this.addmoreFields.removeAt(0);
        }
        if (result.statusSingleModels[0] == null) {
          this.initForm();
        }
      }
    });
  }
  AddConfigurationStatus() {
    this.manageStatusModel.moduleId = this.moduleId;
    this.manageStatusModel.subModuleId = this.subModuleId;
    this.manageStatusModel.controls = this.field;
    this.manageStatusModel.masterId = this.mastersId;
    this.manageStatusModel.fieldsData = JSON.stringify(this.configurationSetings.value.addmoreFields);
    this.configurationsettingService.addOrUpdateManageStatus(this.manageStatusModel).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
      //  window.location.href = "/configurationsetting";
        this.router.navigateByUrl("/configurationsetting");
        //this.SetStatusData(this.field);
        setTimeout(() => { this.loadSave = false;  }, 3000);
      }
      else {
        this.loadSave = false;
        this.toaster.error(result.responseMessage);
      }
    }, error => {
      this.loadSave = false;
    });
  }
  appendInitForm() {
    return this.fb.group({
      status: [''],
      description: [''],
      chooseColor: [''],
      masterId:['']
    });
  }
  initdisplayStatusForm(gurantor: Guarantor) {
    return this.fb.group({
      status: [gurantor.status],
      description: [gurantor.description],
      chooseColor: [gurantor.chooseColor],
      masterId: [gurantor.masterId],
      colorCode: [gurantor.chooseColor]
    });
  }
  private initForm() {
    this.configurationSetings = this.fb.group({
      //alert("a");
      addmoreFields: this.fb.array([
        this.appendInitForm(),
      ]),
    });

   
  }
  get addmoreFields(): FormArray {
    return <FormArray>this.configurationSetings.get('addmoreFields');
  }
  get status() { return this.configurationSetings.get('status'); }
  get description() { return this.configurationSetings.get('description'); }
  get chooseColor() { return this.configurationSetings.get('chooseColor'); }
  get masterId() { return this.configurationSetings.get('masterId'); }

}
``
