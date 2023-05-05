import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { LoanproductService, CreditBureauModel, ManageLoanProductModel } from './loanproduct.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../shared/common.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AddprerequisitedocumentComponent } from './addprerequisitedocument/addprerequisitedocument.component';
import { CheckboxData } from '../department/department.service';
import { DiscountcategoryComponent } from './discountcategory/discountcategory.component';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { UpdateprerequisitedocumentComponent } from './updateprerequisitedocument/updateprerequisitedocument.component';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-addeditloanproduct',
  templateUrl: './addeditloanproduct.component.html',
  styleUrls: ['./addeditloanproduct.component.scss']
})
export class AddeditloanproductComponent implements OnInit {
    @ViewChild('fileInput', { static: false }) fileInput;;
  @ViewChild('mySelect', { static: false }) mySelect: NgSelectComponent;
  @ViewChild('presiteDocument', { static: false }) presiteDocument: AddprerequisitedocumentComponent;
  @ViewChild('discountDocument', { static: false }) discountDocument: DiscountcategoryComponent;
  @ViewChild('updatePresiteDocuments', { static: false }) updatePresiteDocuments: UpdateprerequisitedocumentComponent;
  loading: boolean = false;

  config: any[] = [];
  control: any;
  group_id: any;
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  moduleName = 'finance';
  submoduleName = 'loanproduct';
  loadSave = false;
  departmentId: any;
  selected: any;
  leadId: any;
  drpSelectValues: any;
  pageTitle = 'Loan Product';
  checkboxdata1: Array<CheckboxData> = [];
  moduleRefrenceName: any;
  sp_name: string;
  ProductId: any;
  CompanyForShare: any;
  addOrUpdatePermission: boolean=false;
 // modulePermission: ModuleList;
  States: any;
  showChild = false;
  configurationSetings: FormGroup;
  fileName = 'Select File';
  fileNameImage = 'Select File';
  isLead = false;
  creditBureauModel: CreditBureauModel[] = [];
  creditBureauModel1: CreditBureauModel;
  Name1: any;  
  manageLoanProductModel: ManageLoanProductModel = new ManageLoanProductModel();
  formControlList: any[] = [];
  errors: string[] = [];
  userId: any;
  lstCompant: any;
  IsPrerequisitedocument = false;
  IsRuleEngine = false;
  IsDiscountCategory = false;
  IsDetail = false;
  hideCompany = false;
  newPREREQUISITEData: any;
  modulePermission: any[] = [];
  contentHeader: object;

  constructor(private fb: FormBuilder, private loanproductService: LoanproductService, private router: Router,
    private toaster: ToastrService, private dialogService: ConfirmationDialogService, 
    private route: ActivatedRoute, private commonService: CommonService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.sp_name = 'sp_solgen_AddEditDepartment_custom';
      this.userId = userdetail.id;
    });
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
   
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    if (add == undefined) {
      this.addOrUpdatePermission = false;
    } else {

      this.addOrUpdatePermission = true;
    }

  }

  ngOnInit() {
    
    this.initForm();
    this.leadId = '';
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.leadId = id;
          this.isLead = true;
          this.pageTitle = 'Edit Loan product';
        
          //this.fillLeadForm(this.leadId);
          this.GetCreditBureauEdit(this.leadId);
          this.GetMasterPrerequisiteLoanProductDocumentTypeEdit(this.leadId);
          this.GetLoanProductDiscountCategoryEdit(this.leadId);
        } else {
          this.pageTitle = 'Add Loan product';
         
          this.GetCreditBureau();
        //  this.GetMasterPrerequisiteLoanProductDocumentType();
          this.GetLoanProductDiscountCategory();
        }
      }
    );
    this.IsDetail = true;
    this.loadSave = true;
    this.loanproductService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.leadId).subscribe((result: any) => {
      if (result) {
        // console.log('123123213', this.loanproductService.customFieldsList.data);
        //this.form.setValue(null);
        this.customCompnentValues = this.loanproductService.customFieldsList.data;
        let fieldArray = [];
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (t.dt_code == 'select' && t.picklist_options == 'true' && t.value !== "") {
            t.value = JSON.parse(t.value);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }

            this.formControlList.push(obj);
            //for (let config of this.formControlList) {

            //}
          }
        })

        const group: any = {};
        data_type_name: Text
        this.customCompnentValues.forEach(cnt => {
          let val = null;

          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }
          let decimalPlace = '';
          if (cnt.actual_data_type == "decimal") {
            decimalPlace = this.commonService.getUpToDecimalPoint(cnt.decimal_places)
          }

          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern(`[0-9]+(\.${decimalPlace}?)?`) :
                Validators.nullValidator
          ])

        });
        this.form = new FormGroup(group);
        if (this.form.value['622_ShareProduct'] == true) {
          this.hideCompany = true;
          this.loanproductService.getSolgenUserForCompany().subscribe((response: any) => {
            this.lstCompant = this.loanproductService.company;
          });
        }
        if (this.leadId != null && this.leadId != 0) {
        }

      }
    });
   
    this.loadSave = false;
  
this.initBreadCrumb();
}
initBreadCrumb() {
  this.contentHeader = {
    headerTitle: this.pageTitle,
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
          name: 'Manage Loan Product',
          isLink: true,
          link: '/loanproduct'
        },
        {
          name: this.pageTitle,
          isLink: false
        }

      ]
  };
}

  private initForm() {
    this.configurationSetings = this.fb.group({
      fields: this.fb.array([]),
      fieldsPrerequisiteLoan: this.fb.array([]),
      loanProductDiscountCategory: this.fb.array([]),
    });
    
  }
  SetCheckBoxValue(name, event) {
    if (event.target.checked) {
      this.form.controls[name].setValue(event.srcElement.checked);
      if (name === '622_ShareProduct') {
        this.hideCompany = true;
        this.loanproductService.getSolgenUserForCompany().subscribe((response: any) => {
          this.lstCompant = this.loanproductService.company;
        });
      }
      
    }
    else {
      if (name === '622_ShareProduct') {
        this.form.controls[name].setValue(event.srcElement.checked);
        this.hideCompany = false;
      }
      else {
        this.form.controls[name].setValue(event.srcElement.checked);
      }
    }
  }
  get fields(): FormArray {
    return this.configurationSetings.get('fields') as FormArray;
  }


  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('ProductId', this.leadId);
    input.append('companyId', this.companyId.value);
    input.append('moduleName', this.moduleName);
    input.append('submoduleName', this.submoduleName);
    input.append('fieldsData', JSON.stringify(this.form.value));
    let data = this.fields.value;
    
    input.append('applicableCB', JSON.stringify(data));
    input.append('fieldsPrerequisiteLoan', JSON.stringify(this.fieldsPrerequisiteLoan.value));
    input.append('loanProductDiscountCategory', JSON.stringify(this.loanProductDiscountCategory.value));
    if (this.commonService.isUploadImageValid) {
      if (this.fileName !== null) {
        input.append('filename', this.fileName);
      }
    }
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }
    if (fileBrowser.files && fileBrowser.files[0] && this.fileNameImage != null) {
      input.append('fileNameImage', fileBrowser.files[0]);
    }
    return input;
  }
 
  onSubmit() {
    this.loadSave = true;
    let data = this.fields.value;
    this.loadSave = true;
    if (this.hideCompany == true) {
      this.form.controls['623_SharedCompany'].setValidators(Validators.required);
      this.form.controls['623_SharedCompany'].updateValueAndValidity();
    }
    else {
      this.form.controls['623_SharedCompany'].setValidators(Validators.nullValidator);
      this.form.controls['623_SharedCompany'].updateValueAndValidity();
    }
   
    if (this.form.valid) {
      const loanproductModel = this.prepareFormDataForDocument(); 
      this.loanproductService.addOrUpdateManageStatus(loanproductModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.fileInput.nativeElement.value = "";
          this.router.navigateByUrl("/loanproduct");
          //this.SetStatusData(this.field);
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });

    }
    else {
      this.commonService.validateAllFormFields(this.form);
      this.loadSave = false;

    }
  }

  fillLeadForm(id) {
    this.loanproductService.GetLoanProduct(id, this.moduleName, this.submoduleName).subscribe((result: any) => {

      let edit: any
     
      if (this.loanproductService.leadEditPage.responseCode != 200) {
        edit = this.loanproductService.leadEditPage.data[0];
        if (result) {
        
        const group: any = {};
        data_type_name: Text
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
            if (cnt.value == "") {
              val = null;
            } else {
              let val1 = new Date(cnt.value);
              val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
            }
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])

        });

        this.form = new FormGroup(group);
          this.loadSave = false;
          // console.log("622_ShareProduct", this.form.value['622_ShareProduct'])
          if (this.form.value['622_ShareProduct'] == true) {
            this.hideCompany = true;
            this.loanproductService.getSolgenUserForCompany().subscribe((response: any) => {
              this.lstCompant = this.loanproductService.company;
            });
          }
        }
      }
    },
      (error: any) => {
        this.loadSave = false;
      })

  }
  validatorRange(controlName, isRequired, dataType,range_from,range_to) {
    if (isRequired == true && dataType == 'int') {
      const validators = [Validators.required, Validators.pattern("[0-9]{1,9}")];
      this.form.controls[controlName].setValidators(validators);
      this.form.controls[controlName].updateValueAndValidity();

      //cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
      //  cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
      //    cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
      //      Validators.nullValidator
    }
    else if (isRequired == true && dataType == 'bigint') {
      const validators = [Validators.required, Validators.pattern("[0-9]{1,9}")];
      this.form.controls[controlName].setValidators(validators);
      this.form.controls[controlName].updateValueAndValidity();
    }
    else if (isRequired == true && dataType == 'decimal' && range_from==null) {
      const validators = [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")];
      this.form.controls[controlName].setValidators(validators);
      this.form.controls[controlName].updateValueAndValidity();
    }

    else if (isRequired == true && dataType == 'decimal' && range_from != null) {
      
      const validators = [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?"), Validators.min(range_from), Validators.max(range_to)];
      this.form.controls[controlName].setValidators(validators);
      this.form.controls[controlName].updateValueAndValidity();
    }
    else {
      this.form.controls[controlName].setValidators(Validators.nullValidator);
      this.form.controls[controlName].updateValueAndValidity();
    }
  }
  validatorcheck(controlName, isRequired, dataType, decimalplaces) {
   
    let decimalPlace = '';
    if (dataType == "decimal") {
      decimalPlace = this.commonService.getUpToDecimalPoint(decimalplaces)
    }
    const validators = [Validators.required, Validators.pattern(`[0-9]+(\.${decimalPlace}?)?`)];
    this.form.controls[controlName].setValidators(validators);
    this.form.controls[controlName].updateValueAndValidity();
  }
  validator(controlName, isRequired ,dataType) {
   
    if (isRequired == true && dataType == 'int') {
      const validators = [Validators.required, Validators.pattern("[0-9]{1,9}")];
      this.form.controls[controlName].setValidators(validators);
      this.form.controls[controlName].updateValueAndValidity();

      //cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
      //  cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
      //    cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
      //      Validators.nullValidator
    }
    else if (isRequired == true && dataType == 'bigint')
    {
      const validators = [Validators.required, Validators.pattern("[0-9]{1,9}")];
      this.form.controls[controlName].setValidators(validators);
      this.form.controls[controlName].updateValueAndValidity();
    }
    else if (isRequired == true && dataType == 'decimal')
    {
      const validators = [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")];
      this.form.controls[controlName].setValidators(validators);
      this.form.controls[controlName].updateValueAndValidity();
    }
    else { 
      this.form.controls[controlName].setValidators(Validators.nullValidator);
      this.form.controls[controlName].updateValueAndValidity();
    }

  }
  MakeArray(value, type) {
   
    var array = [];
    var arr = String(value).split(',');
    if (type == "radio" || type == "checkbox") {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
        
          if (arr[i].split("|").length > 1) {
            var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
            array.push(person);
          }
          else {
            var person = { name: arr[i], value: arr[i] };
            array.push(person);
          }
        }
      }
    }
    else {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          var person = { name: arr[i], value: arr[i] };
          array.push(person);
        }
      }
    }

    return array;
  }
  MakeNormalArray(value) {
    if (value) {
      try {
        return JSON.parse(value);
      }
      catch (ex) {
        return value;
      }
    }
    else {
      value = [];
    }
  }
  MakeSelectArray(objItem) {
    var array = [];
    var arr = String(objItem.select_options).split(',');
    if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {

      var person = { name: arr[0], value: arr[1] };
      array.push(person);
      //objItem.select_options = array;
    }
    return array
  }

  setFile($event, name, index): void {
    if (name == '618_Brochure') {
      this.commonService.uploadImageFileValidator($event);
      this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB")
      if (this.commonService.isFileValid) {
        this.fileName = $event.target.files[0].name;
        this.fileName = ($event.target.files[0].name);
        this.form.controls[name].setValue(this.fileName);
      }
    }
    else {
      this.commonService.uploadImageFileValidator($event);
      this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB")
      if (this.commonService.isFileValid) {
        this.fileNameImage = $event.target.files[0].name;
        this.fileNameImage = ($event.target.files[0].name);
        this.form.controls[name].setValue(this.fileNameImage);
      }
    }

  }

  GetCreditBureau() {
    let current = this;
    this.loanproductService.getNames().subscribe((result: any[]) => {
      this.creditBureauModel = result;
      result.forEach(function (value) {
        let group = new FormGroup({
          id: new FormControl(value.id),
          bureauName: new FormControl(value.bureauName),
          isEnableSoftPull: new FormControl(false),
          iscEnableSoftPull: new FormControl(value.isEnableHardPull),
          isEnableHardPull: new FormControl(false),
          iscEnableHardPull: new FormControl(value.isEnableSoftPull),
        });
        current.fields.push(group);
      })
    });
  }

  GetMasterPrerequisiteLoanProductDocumentType() {
    // console.log('get list');
    let current = this;
    current.fieldsPrerequisiteLoan.reset();
    this.loanproductService.getPrerequisiteLoanProductDocumentTypeNames('PrerequisiteLoanProductDocumentType').subscribe((result: any[]) => {
      result.forEach(function (value) {
        // console.log(value);
        let group = new FormGroup({
          documentId: new FormControl(value.documentId),
          documentTypeId: new FormControl(value.documentTypeId),
          documentName: new FormControl(value.documentName),
          mendatory: new FormControl(false),
          visibility: new FormControl(false)
        });
        current.fieldsPrerequisiteLoan.push(group);
      })
    });

  }
  GetLoanProductDiscountCategory() {
    let current = this;
    this.loanproductService.getGetLoanProductDiscountCategoryNames('LoanProductDiscountCategory').subscribe((result: any[]) => {
      result.forEach(function (value) {
        let group = new FormGroup({
          documentId: new FormControl(value.documentId),
          documentName: new FormControl(value.documentName),
          mendatory: new FormControl(false),
          discount: new FormControl(value.discount)
        });
        current.loanProductDiscountCategory.push(group);
      })
    });
  }

  GetCreditBureauEdit(id) {
    let current = this;
    this.loanproductService.getNamesEdit(id).subscribe((result: any[]) => {
      result.forEach(function (value) {
        let group = new FormGroup({
          id: new FormControl(value.id),
          bureauName: new FormControl(value.bureauName),
          isEnableSoftPull: new FormControl(value.isEnableHardPull),
          iscEnableSoftPull: new FormControl(true),
          isEnableHardPull: new FormControl(value.isEnableSoftPull),
          iscEnableHardPull: new FormControl(true),
        });
        current.fields.push(group);
      })
    });
  }

  GetMasterPrerequisiteLoanProductDocumentTypeEdit(id) {
    // console.log('abcbcbcb', this.fieldsPrerequisiteLoan.length);
    let current = this;

    while (this.fieldsPrerequisiteLoan.length != 0) {
      this.fieldsPrerequisiteLoan.removeAt(0);
    }


      this.loanproductService.getPrerequisiteLoanProductEdit(id).subscribe((result: any[]) => {
        result.forEach(function (value) {          
          let group = new FormGroup({
            documentId: new FormControl(value.documentId),
            documentTypeId: new FormControl(value.documentTypeId),
            documentName: new FormControl(value.documentName),
            mendatory: new FormControl(value.mandatory),
            visibility: new FormControl(value.visibility),
            employmentType: new FormControl(value.employmentType)
          });
          current.fieldsPrerequisiteLoan.push(current.loanproductService.buildPrerequisiteDocument(value));          
        })
        //// console.log(current.fieldsPrerequisiteLoan);
      });
  }
  GetLoanProductDiscountCategoryEdit(id) {
    let current = this;
    this.loanproductService.getLoanProductDiscountCategoryEdit(id).subscribe((result: any[]) => {
      //this.creditBureauModel = result;
      
     
      result.forEach(function (value) {
        let group = new FormGroup({
          documentId: new FormControl(value.categoryId),
          documentName: new FormControl(value.categoryName),
          mendatory: new FormControl(value.mendatory),
          discount: new FormControl(value.discount)
        });
        current.loanProductDiscountCategory.push(group);
      })
    });
  }

  close() {
    this.router.navigateByUrl("/loanproduct");
  }



  buildFields(): FormGroup {
    return this.fb.group({
      id: [''],
      bureauName: [''],
      isEnableSoftPull: [''],
      iscEnableSoftPull: [''],
      isEnableHardPull: [''],      
      iscEnableHardPull: [''],
    });
  }

  //get id() { return this.configurationSetings.get('id'); }
  //get bureauName() { return this.configurationSetings.get('bureauName'); }
  //get isEnableSoftPull() { return this.configurationSetings.get('isEnableSoftPull'); }
  //get isEnableHardPull() { return this.configurationSetings.get('isEnableHardPull'); }


  ///////////////////////////////////////PrerequisiteLoanProductDocumentType////////////////////////////////////////


  buildPrerequisiteLoanProductDocumentTypeFields(): FormGroup {
    return this.fb.group({
      documentName: [''],
      documentId: [''],
      mendatory: [''],
    });
  }

  buildLoanProductDiscountCategoryFields(): FormGroup {
    return this.fb.group({
      documentName: [''],
      documentId: [''],
      mendatory: [''],
      discount:['']
    });
  }

  get fieldsPrerequisiteLoan(): FormArray {
    return this.configurationSetings.get('fieldsPrerequisiteLoan') as FormArray;
  }
  get loanProductDiscountCategory(): FormArray {
    return this.configurationSetings.get('loanProductDiscountCategory') as FormArray;
  }

  detailNext() {
    
    this.loadSave = true;

    if (this.hideCompany == true) {
      this.form.controls['623_SharedCompany'].setValidators(Validators.required);
      this.form.controls['623_SharedCompany'].updateValueAndValidity();
    }
    else {
      this.form.controls['623_SharedCompany'].setValidators(Validators.nullValidator);
      this.form.controls['623_SharedCompany'].updateValueAndValidity();
    }
    if (this.form.valid) {
      var element = document.getElementById("manage-status");
      element.classList.remove("active");
      // element.classList.remove("show");
      element.classList.add("hide");
      this.IsPrerequisitedocument = true;
      this.IsDetail = false;
      this.loadSave = false;
      //this.IsPrerequisitedocument = true;
     
    }
    else {
      this.commonService.validateAllFormFields(this.form);
      this.loadSave = false;
    }
    
  }

  PrerequisitedocumentNext() {
    //
    var element = document.getElementById("prerequisitedocument");
    element.classList.remove("active");
    element.classList.remove("show");
    element.classList.add("hide");
    this.IsPrerequisitedocument = false;
    this.IsDetail = false;
    this.loadSave = false;
    this.IsRuleEngine = false;
    this.IsDiscountCategory = true;
  }

  DiscountPrevious() {
    var element = document.getElementById("DiscountCategory");
    element.classList.remove("active");
    element.classList.remove("show");
    element.classList.add("hide"); //DisCategory
    var element = document.getElementById("DisCategory");
    element.classList.remove("active");
    element.classList.remove("show");
    this.IsPrerequisitedocument = true;
    this.IsDetail = false;
    this.loadSave = false;
    this.IsRuleEngine = false;
    this.IsDiscountCategory = false;
  }

  DiscountPrerequisitedocumentPrevious() {
    var element = document.getElementById("prerequisitedocument");
    element.classList.remove("active");
    element.classList.remove("show");
    element.classList.add("hide");
    var element = document.getElementById("prerequisitedocument");
    element.classList.remove("active");
    element.classList.remove("show");
    this.IsDetail = true;
    this.IsPrerequisitedocument = false;
    this.IsPrerequisitedocument = false;
    this.loadSave = false;
    this.IsRuleEngine = false;
    this.IsDiscountCategory = false;
  }
  detailTab() {
    this.IsPrerequisitedocument = false;
    this.IsDetail = true;
    this.loadSave = false;
    this.IsRuleEngine = false;
    this.IsDiscountCategory = false;
    var element = document.getElementById("lead-tab");
    element.classList.remove("active");
    var element1 = document.getElementById("RuleEngine");
    element1.classList.remove("active");
    var element2 = document.getElementById("DisCategory");
    element2.classList.remove("active");
    var element1 = document.getElementById("prerequisitedocument");
    element1.classList.remove("active");
   
  }
  prerequisiteTab() {
    var element = document.getElementById("manage-status");
    element.classList.remove("active");
    //var element1 = document.getElementById("RuleEngine");
    //element1.classList.remove("active");
    var element2 = document.getElementById("DiscountCategory");
    element2.classList.remove("active");
    var element = document.getElementById("manage-tab");
    element.classList.remove("active");
    var element2 = document.getElementById("DisCategory");
    element2.classList.remove("active");
    this.IsDiscountCategory = false;
    this.IsPrerequisitedocument = true;
    this.IsDetail = false ;
    this.loadSave = false;
    this.IsRuleEngine = false;
    this.IsDiscountCategory = false;
  }

  discountCategoryTab() {
    var element = document.getElementById("manage-tab");
    element.classList.remove("active");
    var element1 = document.getElementById("prerequisitedocument");
    element1.classList.remove("active");
    var element2 = document.getElementById("RuleEngine");
    this.IsPrerequisitedocument = false;
    this.IsDetail = false;
    this.loadSave = false;
    this.IsRuleEngine = false;
    this.IsDiscountCategory = true;
  }

  AddNewPrerequisiteDocument() {
    this.presiteDocument.show();
  }

  UpdatePrerequisiteDocument(obj: any) {
    // console.log(obj);
    this.updatePresiteDocuments.showUpdate(this.leadId, obj, this.fieldsPrerequisiteLoan);
  }
  AddNewCategory() {
    this.discountDocument.show();
  }

  prerequisiteDocument(group: any) {    
    this.fieldsPrerequisiteLoan.push(this.loanproductService.buildPrerequisiteDocument(group));    
  }

  updatePresiteDocument(e: any) {
    // console.log('update', e);

    if (this.leadId != "") {
      // console.log('update with leadId');
      const control2 = <FormArray>this.configurationSetings.controls.fieldsPrerequisiteLoan;
      control2.controls = [];
      this.GetMasterPrerequisiteLoanProductDocumentTypeEdit(this.leadId);
    }
    else {
      // console.log(this.fieldsPrerequisiteLoan.controls);
      this.fieldsPrerequisiteLoan.controls.filter(m => m.get('documentTypeId').value == e.documentTypeId).forEach(m => {
        // console.log('befor: ',m);
          m.get('documentName').setValue(e.documentName),
          m.get('isMandatory').setValue(e.mandatory),
          m.get('isVisible').setValue(e.visibility),
          m.get('employmentType').setValue(e.employmentType)    
        // console.log('after: ', m);
      });

      this.loanproductService.UpdateLoanPrerequisiteDocumentName(e.documentName, e.documentTypeId).subscribe(resp => {
        this.toaster.success("Prerequisite Document has been updated successfully.");
      });
    }
  }

  discountDocuments() {
    const control2 = <FormArray>this.configurationSetings.controls.loanProductDiscountCategory;
    control2.controls = [];
    this.GetLoanProductDiscountCategory();
  }

  DeletePrerequisiteLoan(id, name) {
    
    const message = `Are you sure you want to delete Prerequisite Document  "${name}"?`;
    this.dialogService.confirm('Delete Prerequisite', message).subscribe(confirmed => {
      if (confirmed) {
          this.loanproductService.DeletePrerequisite(id, this.leadId).subscribe(r => {
            this.toaster.success(`Prerequisite Document "${name}" has been deleted successfully`);
            this.fieldsPrerequisiteLoan.controls.forEach((m, index) => {
              if (m.get('documentTypeId').value == id) {
                this.fieldsPrerequisiteLoan.controls.splice(index, 1);
              }
            })
          }, error => {
          });
      }
    });
  }
  DeleteDiscountCategory(id, name) {
    const message = `Are you sure you want to delete discount category document  "${name}"?`;
    this.dialogService.confirm('Delete Discount Category', message).subscribe(confirmed => {
      if (confirmed) {
        this.loanproductService.DeleteDiscountCategory(id, this.leadId).subscribe(r => {
          this.toaster.success(`Discount category "${name}" has been deleted successfully`);
          const control2 = <FormArray>this.configurationSetings.controls.loanProductDiscountCategory;
          control2.controls = [];
          this.GetLoanProductDiscountCategory();
        }, error => {
        });
      }
    });
  }
}
