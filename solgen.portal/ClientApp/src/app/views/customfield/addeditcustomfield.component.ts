import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../master/master.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ManageleaseService } from '../managelease/managelease.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CustomFieldModel, CustomfieldService } from './customfield.service';

@Component({
  selector: 'app-addeditcustomfield',
  templateUrl: './addeditcustomfield.component.html'

})
export class AddeditcustomfieldComponent implements OnInit {
  customFiledGroup: FormGroup;
  customFieldModel: CustomFieldModel = new CustomFieldModel();
  isShown = false;
  divshowdecimal = false;
  lengthofDisplay: any;
  isShownText = false;
  isShownInterger = false;
  isShownLongInteger = false;
  isShownUrl = false;
  isShownSelectList = false;
  divshowdecimalText = false;
  lstCustomFiledsLength: any;
  loadSave = false;
  lstModuleList: any;
  lstSubModuleList: any;
  pageTitle: any;
  dataTypeCode: any;
  constructor(private fb: FormBuilder, private masterService: MasterService,
    private modalService: BsModalService, private customfieldService: CustomfieldService,
    private leaseService: ManageleaseService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private dialogService: ConfirmationDialogService) {
  }

  ngOnInit() {
    this.initForm();
    this.LoadCustomFieldsLength();
    this.isShownLongInteger = false;
    this.isShownInterger = false;
    this.isShownText = false;
    this.isShownUrl = false;
    this.isShownSelectList = false;
    this.divshowdecimal = false;
    this.divshowdecimalText = false;
    this.pageTitle = 'Add Custom Field';
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.fillForm(id);
        }
        else {
          this.pageTitle = 'Add Custom Field';
          //this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
        
      }
    );
  }

  LoadCustomFieldsLength() {
    this.commonService.getMasterItemsList("custom_modules").subscribe(res => {
      this.lstModuleList = this.commonService.masters;
    });
  }

  AddCustomField() {

    if (this.customFiledGroup.valid) {
      this.customFieldModel.moduleName = this.customFiledGroup.value.moduleName;
      this.customFieldModel.subModuleName = this.customFiledGroup.value.subModuleName;
      this.customFieldModel.fieldName = this.customFiledGroup.value.fieldName;
      this.customFieldModel.custInteger = this.customFiledGroup.value.custInteger;
      this.customFieldModel.custText = this.customFiledGroup.value.custText;
      this.customFieldModel.custDecimalLength = this.customFiledGroup.value.custDecimalLength;
      this.customFieldModel.CustLogInterger = this.customFiledGroup.value.CustLogInterger;
      this.customFieldModel.description = this.customFiledGroup.value.description;
      this.customFieldModel.custUrl = this.customFiledGroup.value.custUrl;
      this.customFieldModel.custSelectList = this.customFiledGroup.value.custSelectList;
      this.customFieldModel.id = this.customFiledGroup.value.id;
      this.customFieldModel.isRequired = this.customFiledGroup.value.isRequired;
      this.customFieldModel.dataTypeCode = this.dataTypeCode;
      this.customFieldModel.decimalPlaceValue = this.customFiledGroup.value.custDecimalPlace;
      this.customfieldService.AddEditCustomField(this.customFieldModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/customfield");
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.customFiledGroup);
      this.loadSave = false;
    }
  }


  fillForm(id) {
    //this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
    this.customfieldService.GetCustomFieldDetail(id).subscribe((result: any) => {
      if (result) {
       
        this.loadSave = false;
        this.pageTitle = 'Edit Custom Field';
        this.customFiledGroup.patchValue({
          id: result.id,
          moduleName: result.moduleName,
          subModuleName: result.subModuleName,
          fieldName: result.fieldName,
          custText: result.custText,
          custInteger: result.custInteger,
          custDecimalLength: result.custDecimalLength,
          CustLogInterger: result.CustLogInterger,
          description: result.description,
          custUrl: result.custUrl,
          custSelectList: result.custSelectList,
          isRequired: result.isRequired

        });
        if (result.moduleName != null) {
          this.commonService.getMasterSubModuleList("custom_sub_modules", result.moduleName).subscribe(res => {
            this.lstSubModuleList = this.commonService.masters;
          });
        }
        if (result.dataTypeCode == 'Text') {
          this.lengthofDisplay = 100;
          this.isShownText = true;
          this.divshowdecimal = false;
          this.isShownInterger = false;
          this.isShownLongInteger = false;
          this.isShownUrl = false;
          this.isShownSelectList = false;
          this.custText.setValue(result.length);
          this.divshowdecimalText = false;
          this.dataTypeCode = 'string';
          this.customFiledGroup.controls["custText"].setValidators(Validators.required);
          this.customFiledGroup.controls["custText"].updateValueAndValidity();

          this.customFiledGroup.controls["custInteger"].clearValidators();
          this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
          this.customFiledGroup.controls["custDecimalLength"].clearValidators();
          this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
          this.customFiledGroup.controls["description"].clearValidators();
          this.customFiledGroup.controls["description"].updateValueAndValidity();
          this.customFiledGroup.controls["custUrl"].clearValidators();
          this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
          this.customFiledGroup.controls["custSelectList"].clearValidators();
          this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
          this.customFiledGroup.controls["CustLogInterger"].clearValidators();
          this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
        }
        else if (result.dataTypeCode == 'Integer') {
          this.lengthofDisplay = 10;
          this.isShownInterger = true;
          this.isShownText = false;
          this.divshowdecimal = false;
          this.divshowdecimalText = false;

          this.isShownLongInteger = false;
          this.isShownUrl = false;
          this.isShownSelectList = false;
          this.dataTypeCode = 'int';
          this.divshowdecimalText = false;
          this.custInteger.setValue(result.length);
          this.customFiledGroup.controls["custInteger"].setValidators(Validators.required);
          this.customFiledGroup.controls["custInteger"].updateValueAndValidity();

          this.customFiledGroup.controls["custText"].clearValidators();
          this.customFiledGroup.controls["custText"].updateValueAndValidity();
          this.customFiledGroup.controls["custDecimalLength"].clearValidators();
          this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
          this.customFiledGroup.controls["description"].clearValidators();
          this.customFiledGroup.controls["description"].updateValueAndValidity();
          this.customFiledGroup.controls["custUrl"].clearValidators();
          this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
          this.customFiledGroup.controls["custSelectList"].clearValidators();
          this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
          this.customFiledGroup.controls["CustLogInterger"].clearValidators();
          this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
        }
        else if (result.dataTypeCode == 'Long Integer') {
          this.lengthofDisplay = 18;
          this.isShownLongInteger = true;
          this.isShownInterger = false;
          this.isShownText = false;
          this.divshowdecimal = false;
          this.isShownUrl = false;
          this.isShownSelectList = false;
          this.dataTypeCode = 'bigint';
          this.divshowdecimalText = false;
          this.CustLogInterger.setValue(result.length);
          this.customFiledGroup.controls["CustLogInterger"].setValidators(Validators.required);
          this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();

          this.customFiledGroup.controls["custInteger"].clearValidators();
          this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
          this.customFiledGroup.controls["custText"].clearValidators();
          this.customFiledGroup.controls["custText"].updateValueAndValidity();
          this.customFiledGroup.controls["custDecimalLength"].clearValidators();
          this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
          this.customFiledGroup.controls["description"].clearValidators();
          this.customFiledGroup.controls["description"].updateValueAndValidity();
          this.customFiledGroup.controls["custUrl"].clearValidators();
          this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
          this.customFiledGroup.controls["custSelectList"].clearValidators();
          this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
        }
        else if (result.dataTypeCode == 'Decimal') {
          this.lengthofDisplay = 18;
          this.isShownLongInteger = false;
          this.isShownInterger = false;
          this.isShownText = false;
          this.isShownUrl = false;
          this.isShownSelectList = false;
          this.dataTypeCode = 'decimal';
          this.divshowdecimal = true;
          this.divshowdecimalText = true;
          this.custDecimalLength.setValue(result.length);
          this.custDecimalPlace.setValue(result.decimalPlaceValue);
          this.customFiledGroup.controls["custDecimalLength"].setValidators(Validators.required);
          this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();

          this.customFiledGroup.controls["CustLogInterger"].clearValidators();
          this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
          this.customFiledGroup.controls["custInteger"].clearValidators();
          this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
          this.customFiledGroup.controls["custText"].clearValidators();
          this.customFiledGroup.controls["custText"].updateValueAndValidity();
          this.customFiledGroup.controls["description"].clearValidators();
          this.customFiledGroup.controls["description"].updateValueAndValidity();
          this.customFiledGroup.controls["custUrl"].clearValidators();
          this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
          this.customFiledGroup.controls["custSelectList"].clearValidators();
          this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
        }
        else if (result.dataTypeCode == 'Select List') {
          this.isShownLongInteger = false;
          this.isShownInterger = false;
          this.isShownText = false;
          this.isShownUrl = false;
          this.isShownSelectList = true;
          this.divshowdecimal = false;
          this.divshowdecimalText = false;
          this.dataTypeCode = 'select';
          this.custSelectList.setValue(result.selectDrpList);
          this.customFiledGroup.controls["custSelectList"].setValidators(Validators.required);
          this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();

          this.customFiledGroup.controls["CustLogInterger"].clearValidators();
          this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
          this.customFiledGroup.controls["custInteger"].clearValidators();
          this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
          this.customFiledGroup.controls["custText"].clearValidators();
          this.customFiledGroup.controls["custText"].updateValueAndValidity();
          this.customFiledGroup.controls["description"].clearValidators();
          this.customFiledGroup.controls["description"].updateValueAndValidity();
          this.customFiledGroup.controls["custUrl"].clearValidators();
          this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
          this.customFiledGroup.controls["custDecimalLength"].clearValidators();
          this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
        }
        else if (result.dataTypeCode == 'Url') {
          this.lengthofDisplay = 200;
          this.isShownLongInteger = false;
          this.isShownInterger = false;
          this.isShownText = false;
          this.isShownUrl = true;
          this.isShownSelectList = false;
          this.dataTypeCode = 'Url';
          this.divshowdecimal = false;
          this.divshowdecimalText = false;
          this.custUrl.setValue(result.length);
          this.customFiledGroup.controls["custUrl"].setValidators(Validators.required);
          this.customFiledGroup.controls["custUrl"].updateValueAndValidity();

          this.customFiledGroup.controls["CustLogInterger"].clearValidators();
          this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
          this.customFiledGroup.controls["custInteger"].clearValidators();
          this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
          this.customFiledGroup.controls["custText"].clearValidators();
          this.customFiledGroup.controls["custText"].updateValueAndValidity();
          this.customFiledGroup.controls["description"].clearValidators();
          this.customFiledGroup.controls["description"].updateValueAndValidity();
          this.customFiledGroup.controls["custSelectList"].clearValidators();
          this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
          this.customFiledGroup.controls["custDecimalLength"].clearValidators();
          this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
        }
      }
    },
      (error: any) => {
        this.loadSave = false;
      })

  }

  dataType($event) {
    if ($event == 'text') {

      this.lengthofDisplay = 100;
      this.isShownText = true;
      this.divshowdecimal = false;
      this.isShownInterger = false;
      this.isShownLongInteger = false;
      this.isShownUrl = false;
      this.isShownSelectList = false;

      this.divshowdecimalText = false;
      this.dataTypeCode = 'string';
      this.custInteger.setValue('');
      this.CustLogInterger.setValue('');
      this.custSelectList.setValue('');
      this.custDecimalLength.setValue('');
      this.customFiledGroup.controls["custText"].setValidators(Validators.required);
      this.customFiledGroup.controls["custText"].updateValueAndValidity();

      this.customFiledGroup.controls["custInteger"].clearValidators();
      this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
      this.customFiledGroup.controls["custDecimalLength"].clearValidators();
      this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
      this.customFiledGroup.controls["description"].clearValidators();
      this.customFiledGroup.controls["description"].updateValueAndValidity();
      this.customFiledGroup.controls["custUrl"].clearValidators();
      this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
      this.customFiledGroup.controls["custSelectList"].clearValidators();
      this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
      this.customFiledGroup.controls["CustLogInterger"].clearValidators();
      this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
    }
    else if ($event == 'Interger') {
      this.lengthofDisplay = 10;
      this.isShownInterger = true;
      this.isShownText = false;
      this.divshowdecimal = false;
      this.divshowdecimalText = false;

      this.isShownLongInteger = false;
      this.isShownUrl = false;
      this.isShownSelectList = false;
      this.dataTypeCode = 'int';
      this.divshowdecimalText = false;
      this.custText.setValue('');
      this.CustLogInterger.setValue('');
      this.custSelectList.setValue('');
      this.custUrl.setValue('');
      this.custDecimalLength.setValue('');
      this.customFiledGroup.controls["custInteger"].setValidators(Validators.required);
      this.customFiledGroup.controls["custInteger"].updateValueAndValidity();

      this.customFiledGroup.controls["custText"].clearValidators();
      this.customFiledGroup.controls["custText"].updateValueAndValidity();
      this.customFiledGroup.controls["custDecimalLength"].clearValidators();
      this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
      this.customFiledGroup.controls["description"].clearValidators();
      this.customFiledGroup.controls["description"].updateValueAndValidity();
      this.customFiledGroup.controls["custUrl"].clearValidators();
      this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
      this.customFiledGroup.controls["custSelectList"].clearValidators();
      this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
      this.customFiledGroup.controls["CustLogInterger"].clearValidators();
      this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
    }
    else if ($event == 'LongInterger') {
      this.lengthofDisplay = 18;
      this.isShownLongInteger = true;
      this.isShownInterger = false;
      this.isShownText = false;
      this.divshowdecimal = false;
      this.isShownUrl = false;
      this.isShownSelectList = false;
      this.dataTypeCode = 'bigint';
      this.divshowdecimalText = false;
      this.custInteger.setValue('');
      this.custText.setValue('');
      this.custSelectList.setValue('');
      this.custUrl.setValue('');
      this.custDecimalLength.setValue('');
      this.customFiledGroup.controls["CustLogInterger"].setValidators(Validators.required);
      this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();

      this.customFiledGroup.controls["custInteger"].clearValidators();
      this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
      this.customFiledGroup.controls["custText"].clearValidators();
      this.customFiledGroup.controls["custText"].updateValueAndValidity();
      this.customFiledGroup.controls["custDecimalLength"].clearValidators();
      this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
      this.customFiledGroup.controls["description"].clearValidators();
      this.customFiledGroup.controls["description"].updateValueAndValidity();
      this.customFiledGroup.controls["custUrl"].clearValidators();
      this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
      this.customFiledGroup.controls["custSelectList"].clearValidators();
      this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
    }
    else if ($event == 'Decimal') {
      this.lengthofDisplay = 18;
      this.isShownLongInteger = false;
      this.isShownInterger = false;
      this.isShownText = false;
      this.isShownUrl = false;
      this.isShownSelectList = false;
      this.dataTypeCode = 'decimal';
      this.divshowdecimal = true;
      this.divshowdecimalText = true;
      this.custInteger.setValue('');
      this.custText.setValue('');
      this.CustLogInterger.setValue('');
      this.custSelectList.setValue('');
      this.custUrl.setValue('');
      
      this.customFiledGroup.controls["custDecimalLength"].setValidators(Validators.required);
      this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();

      this.customFiledGroup.controls["CustLogInterger"].clearValidators();
      this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
      this.customFiledGroup.controls["custInteger"].clearValidators();
      this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
      this.customFiledGroup.controls["custText"].clearValidators();
      this.customFiledGroup.controls["custText"].updateValueAndValidity();
      this.customFiledGroup.controls["description"].clearValidators();
      this.customFiledGroup.controls["description"].updateValueAndValidity();
      this.customFiledGroup.controls["custUrl"].clearValidators();
      this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
      this.customFiledGroup.controls["custSelectList"].clearValidators();
      this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
    }
    else if ($event == 'SelectList') {
      this.isShownLongInteger = false;
      this.isShownInterger = false;
      this.isShownText = false;
      this.isShownUrl = false;
      this.isShownSelectList = true;
      this.divshowdecimal = false;
      this.divshowdecimalText = false;
      this.dataTypeCode = 'select';
      this.custInteger.setValue('');
      this.custText.setValue('');
      this.CustLogInterger.setValue('');
      this.custDecimalLength.setValue('');
      this.custUrl.setValue('');
      this.customFiledGroup.controls["custSelectList"].setValidators(Validators.required);
      this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();

      this.customFiledGroup.controls["CustLogInterger"].clearValidators();
      this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
      this.customFiledGroup.controls["custInteger"].clearValidators();
      this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
      this.customFiledGroup.controls["custText"].clearValidators();
      this.customFiledGroup.controls["custText"].updateValueAndValidity();
      this.customFiledGroup.controls["description"].clearValidators();
      this.customFiledGroup.controls["description"].updateValueAndValidity();
      this.customFiledGroup.controls["custUrl"].clearValidators();
      this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
      this.customFiledGroup.controls["custDecimalLength"].clearValidators();
      this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
    }
    else if ($event == 'Url') {
      this.lengthofDisplay = 200;
      this.isShownLongInteger = false;
      this.isShownInterger = false;
      this.isShownText = false;
      this.isShownUrl = true;
      this.isShownSelectList = false;
      this.dataTypeCode = 'Url';
      this.divshowdecimal = false;
      this.divshowdecimalText = false;
      this.custInteger.setValue('');
      this.custText.setValue('');
      this.CustLogInterger.setValue('');
      this.custDecimalLength.setValue('');
      this.custSelectList.setValue('');
      this.custDecimalLength.setValue('');
      this.customFiledGroup.controls["custUrl"].setValidators(Validators.required);
      this.customFiledGroup.controls["custUrl"].updateValueAndValidity();

      this.customFiledGroup.controls["CustLogInterger"].clearValidators();
      this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
      this.customFiledGroup.controls["custInteger"].clearValidators();
      this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
      this.customFiledGroup.controls["custText"].clearValidators();
      this.customFiledGroup.controls["custText"].updateValueAndValidity();
      this.customFiledGroup.controls["description"].clearValidators();
      this.customFiledGroup.controls["description"].updateValueAndValidity();
      this.customFiledGroup.controls["custSelectList"].clearValidators();
      this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
      this.customFiledGroup.controls["custDecimalLength"].clearValidators();
      this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
    }
    else if ($event == 'Date') {

      this.isShownLongInteger = false;
      this.isShownInterger = false;
      this.isShownText = false;
      this.isShownUrl = false;
      this.isShownSelectList = false;
      this.divshowdecimal = false;
      this.divshowdecimalText = false;
      this.dataTypeCode = 'date';
    }
    else {
      this.isShownLongInteger = false;
      this.isShownInterger = false;
      this.isShownText = false;
      this.isShownUrl = false;
      this.isShownSelectList = false;
      this.divshowdecimal = false;
      this.divshowdecimalText = false;
    }

  }

  Cancel() {
    this.router.navigateByUrl("/customfield");
  }
  onChangeModuleName($event) {
    this.commonService.getMasterSubModuleList("custom_sub_modules", $event.value).subscribe(res => {
      this.lstSubModuleList = this.commonService.masters;
      // // console.log("sdddd", this.lstSubModuleList);
    });

  }
  private initForm() {
    this.customFiledGroup = this.fb.group({
      moduleName: [null, Validators.required],
      subModuleName: [null, Validators.required],
      fieldName: ['', Validators.required],
      custText: [''],
      custInteger: [''],
      custDecimalLength: [''],
      CustLogInterger: [''],
      description: [null, Validators.required],
      custUrl: [''],
      custSelectList: [''],
      id: [''],
      custDecimalPlace:[''],
      isRequired: [null]
    });
  }
  get moduleName() { return this.customFiledGroup.get('moduleName'); }
  get subModuleName() { return this.customFiledGroup.get('subModuleName'); }
  get fieldName() { return this.customFiledGroup.get('fieldName'); }


  get length() { return this.customFiledGroup.get('length'); }

  get isRequired() { return this.customFiledGroup.get('isRequired'); }
  get description() { return this.customFiledGroup.get('description'); }
  get id() { return this.customFiledGroup.get('id'); }

  get custText() { return this.customFiledGroup.get('custText'); }
  get custInteger() { return this.customFiledGroup.get('custInteger'); }
  get CustLogInterger() { return this.customFiledGroup.get('CustLogInterger'); }
  get custUrl() { return this.customFiledGroup.get('custUrl'); }
  get custSelectList() { return this.customFiledGroup.get('custSelectList'); }
  get custDecimalLength() { return this.customFiledGroup.get('custDecimalLength'); }
  get custDecimalPlace() { return this.customFiledGroup.get('custDecimalPlace'); }


}
