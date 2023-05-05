import { Component, OnInit, ViewChild, Input, Inject, forwardRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../shared/common.service';
import { SelectListArray, GroupControls } from '../../../manageform/form.service';

@Component({
  selector: 'app-propertiespopupform',
  templateUrl: './propertiespopupform.component.html',
  styleUrls: ['./propertiespopupform.component.scss']
})
export class PropertiespopupformComponent implements OnInit {
  @ViewChild('propertiesPopupform', { static: false }) propertiesPopupForm: ModalDirective;
  @Output() customFieldLayOut = new EventEmitter();

  active = false;
  lstActiveStatus: any;
  fieldName: any;
  fieldsType: any;
  singleLine = false;
  fieldList: any;
  properties: FormGroup;
  parentData: any;
  index: any;
  multiLine = false;
  SelectList = false;
  intShow = false;
  decimalShow = false;
  booleanShow = false;
  bigInt = false;
  dateShow = false;
  dateTimeShow = false;
  checkboxShow = false;
  radioShow = false;
  urlShow = false;
  imageShow = false;
  is_system_generated = false;
  //ddloptions :any;
  ddloptionsvalidation = false;
  colorCode: any;
  editid = 0;
  colorList: any[] = [];
  selectOptionsddl: any;
  selectOptions
  // ddloptionscolor : any;
  idcounter = 0;
  selectoptions = new SelectListArray();
  selectlistvalues: Array<SelectListArray> = [];
  loadSave: boolean = false;
  customFieldsList: any;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    this.selectOptionsddl = [
      {
        customId: 1,
        customText: '.png'
      }, {
        customId: 2,
        customText: '.jpeg'
      }, {
        customId: 3,
        customText: '.tiff'
      }, {
        customId: 4,
        customText: '.bmp'
      },

    ]
  }

  ngOnInit() {
    this.initForm();
    //this.lstActiveStatus = this.ActiveStatus;
  }
  incrementcounterid() {
    return this.idcounter++;
  }
  decrementcounterid() {
    return this.idcounter--;
  }
  editselectlist(id, value, color) {
    this.editid = id;
    this.properties.controls["ddloptions"].setValue(value);
    this.properties.controls["ddloptionscolor"].setValue(color);
    this.colorCode = color;
  }


  SetColorFor() {

    this.colorCode = this.properties.controls["ddloptionscolor"].value;


  }

  SetColorFor1(i: any, event: any) {

    var rendomdata = event;
    this.colorCode[i] = rendomdata;
    //this.configurationSetings.value.addmoreFields[i].chooseColor;

  }
  add() {

    if (this.ddloptions.value != null && this.ddloptions.value != "") {
      this.ddloptionsvalidation = false;
      this.selectoptions = new SelectListArray();
      if (this.editid == 0) {
        this.selectoptions.id = this.incrementcounterid();
        this.selectoptions.isinserted = 1;
        this.selectoptions.value = this.ddloptions.value;
        this.selectoptions.color = this.ddloptionscolor.value;
        this.selectlistvalues.push(this.selectoptions);
      }
      else {
        const targetIdx = this.selectlistvalues.find(item => item.id == this.editid);
        let indexObj = this.selectlistvalues.indexOf(targetIdx);
        this.selectlistvalues[indexObj].value = this.ddloptions.value;
        this.selectlistvalues[indexObj].color = this.ddloptionscolor.value;
      }

      this.properties.controls["selectlistvalue"].setValue(this.selectlistvalues);
      this.properties.controls["ddloptions"].setValue(null);
      this.properties.controls["ddloptionscolor"].setValue(null);
      this.colorCode = "";
    }
    else {
      this.ddloptionsvalidation = true;

    }

  }
  close() {
    this.active = false;
    this.propertiesPopupForm.hide();
  }
  show(list: GroupControls, sectionIndex, questionIndex, answerIndex, questionLists, statusId, customFieldsList) {
    //this.refresh();
    this.fieldName = list.name;
    this.is_system_generated = list.is_system_generated;
    this.fieldsType = list.dt_code;
    this.fieldList = list;
     this.customFieldsList = JSON.parse(JSON.stringify(customFieldsList));
     ;
    switch (this.fieldsType) {
      case 'text':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'text');
        break;
      case 'textbox':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'text');
        break;
      case 'boolean':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'boolean');
        break;
      case 'checkbox':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'checkbox');
        break;
      case 'date':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'date');
        break;
      case 'datetime':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'datetime');
        break;
      case 'decimal':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'decimal');
        break;
      case 'int':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'int');
        break;
      case 'bigint':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'bigint');
        break;
      case 'textarea':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'textarea');
        break;
      case 'radio':
        this.customFieldsList = this.customFieldsList.filter(x => x.dt_code == 'checkbox');
        break;
      case 'select':
        this.customFieldsList = this.customFieldsList.filter(x=>x.dt_code=='select');
        break;
    }
    if (list.dt_code == 'text' || list.dt_code == 'textbox') {
      this.initForm();
      this.singleLine = true;
      this.SelectList = false;
      this.multiLine = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateTimeShow = false;
      this.imageShow = false;
      this.booleanShow = false;
      this.dateShow = false;
      this.checkboxShow = false;
      this.radioShow = false;
      this.properties.controls["singleLineNameDisplay"].setValidators(Validators.required);
      this.properties.controls["singleLineNameDisplay"].updateValueAndValidity();
      this.properties.controls["singleLineCharactersAllowed"].setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4),]);
      //this.properties.controls["singleLineCharactersAllowed"].setValidators(Validators.required); change by aakash goyal due to veera sir
      this.properties.controls["singleLineCharactersAllowed"].updateValueAndValidity();
      this.singleLineCharactersAllowed.setValue(list.length);
      this.singleLineNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.singleLineMarkRequired.setValue(list.is_required);


    }
    else if (list.dt_code == 'textarea') {
      this.initForm();
      this.multiLine = true;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.dateTimeShow = false;
      this.booleanShow = false;
      this.imageShow = false;
      this.checkboxShow = false;
      this.radioShow = false;
      this.properties.controls["multiLineNameDisplay"].setValidators(Validators.required);
      this.properties.controls["multiLineNameDisplay"].updateValueAndValidity();
      this.properties.controls["multiLineCharactersAllowed"].setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4),]);
      this.properties.controls["multiLineCharactersAllowed"].updateValueAndValidity();
      this.multiLineCharactersAllowed.setValue(typeof list.length == undefined ? 200 : list.length);
      this.multiLineNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.multiLineMarkRequired.setValue(list.is_required);

    }
    else if (list.dt_code == 'select') {
      this.initForm();
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = true;
      this.intShow = false;
      this.booleanShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.dateTimeShow = false;
      this.checkboxShow = false;
      this.imageShow = false;
      this.radioShow = false;
      this.properties.controls["selectListLineNameDisplay"].setValidators(Validators.required);
      this.properties.controls["selectListLineNameDisplay"].updateValueAndValidity();
      this.properties.controls["selectListCharactersAllowed"].setValidators(Validators.required);
      this.properties.controls["selectListCharactersAllowed"].updateValueAndValidity();
      this.selectListCharactersAllowed.setValue(list.length);
      this.selectListLineNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.selectListMarkRequired.setValue(list.is_required);
      this.selectListMultiddl.setValue(list.picklist_options);
      this.selectlistvalues = list.selectlistvalues == undefined ? new Array<SelectListArray>() : list.selectlistvalues;
    }
    else if (list.dt_code == 'bigint') {
      this.initForm();
      this.multiLine = false;
      this.singleLine = false;
      this.booleanShow = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = true;
      this.decimalShow = false;
      this.dateShow = false;
      this.dateTimeShow = false;
      this.checkboxShow = false;
      this.radioShow = false;
      this.imageShow = false;
      this.properties.controls["bigintNameDisplay"].setValidators(Validators.required);
      this.properties.controls["bigintNameDisplay"].updateValueAndValidity();
      this.properties.controls["bigintCharactersAllowed"].setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4),]);
      this.properties.controls["bigintCharactersAllowed"].updateValueAndValidity();
      this.bigintCharactersAllowed.setValue(list.length);
      this.bigintNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.bigintMarkRequired.setValue(list.is_required);

    }
    else if (list.dt_code == 'int' || list.dt_code == 'number') {
      this.initForm();
      this.booleanShow = false;
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = true;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.dateTimeShow = false;
      this.checkboxShow = false;
      this.imageShow = false;
      this.radioShow = false;
      this.properties.controls["intNameDisplay"].setValidators(Validators.required);
      this.properties.controls["intNameDisplay"].updateValueAndValidity();
      this.properties.controls["intCharactersAllowed"].setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4),]);
      this.properties.controls["intCharactersAllowed"].updateValueAndValidity();
      this.intCharactersAllowed.setValue(list.length);
      this.intNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.intMarkRequired.setValue(list.is_required);

    }
    else if (list.dt_code == 'decimal') {
      this.initForm();
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.booleanShow = false;
      this.decimalShow = true;
      this.dateShow = false;
      this.dateTimeShow = false;
      this.imageShow = false;
      this.checkboxShow = false;
      this.radioShow = false;
      this.properties.controls["decimalNameDisplay"].setValidators(Validators.required);
      this.properties.controls["decimalNameDisplay"].updateValueAndValidity();
      this.properties.controls["decimalCharactersAllowed"].setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4),]);
      this.properties.controls["decimalCharactersAllowed"].updateValueAndValidity();
      this.decimalCharactersAllowed.setValue(list.length);
      this.decimalNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.decimalMarkRequired.setValue(list.is_required);

    }
    else if (list.dt_code == 'boolean') {
      this.initForm();
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.dateTimeShow = false;
      this.checkboxShow = false;
      this.booleanShow = true;
      this.imageShow = false;
      this.radioShow = false;
      this.properties.controls["booleanNameDisplay"].setValidators(Validators.required);
      this.properties.controls["booleanNameDisplay"].updateValueAndValidity();
      this.booleanNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.booleanMarkRequired.setValue(list.is_required);
    }
    else if (list.dt_code == 'date') {
      this.initForm();
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = true;
      this.dateTimeShow = false;
      this.checkboxShow = false;
      this.imageShow = false;
      this.booleanShow = false;
      this.radioShow = false;
      this.properties.controls["dateNameDisplay"].setValidators(Validators.required);
      this.properties.controls["dateNameDisplay"].updateValueAndValidity();
      this.dateNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.dateMarkRequired.setValue(list.is_required);
    }
    else if (list.dt_code == 'datetime') {
      this.initForm();
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.dateTimeShow = true;
      this.checkboxShow = false;
      this.imageShow = false;
      this.booleanShow = false;
      this.radioShow = false;
      this.properties.controls["dateNameDisplay"].setValidators(Validators.required);
      this.properties.controls["dateNameDisplay"].updateValueAndValidity();
      this.dateNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.dateMarkRequired.setValue(list.is_required);
    }
    else if (list.dt_code == 'checkbox') {
      this.initForm();
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.dateTimeShow = false;
      this.booleanShow = false;
      this.checkboxShow = true;
      this.radioShow = false;
      this.imageShow = false;
      this.properties.controls["checkboxNameDisplay"].setValidators(Validators.required);
      this.properties.controls["checkboxNameDisplay"].updateValueAndValidity();
      this.properties.controls["checkboxCharactersAllowed"].setValidators(Validators.required);
      this.properties.controls["checkboxCharactersAllowed"].updateValueAndValidity();
      this.checkboxNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.checkboxCharactersAllowed.setValue(list.picklist_options);
      this.checkboxMarkRequired.setValue(list.is_required);
    }
    else if (list.dt_code == 'radio') {
      this.initForm();
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.dateTimeShow = false;
      this.checkboxShow = false;
      this.booleanShow = false;
      this.radioShow = true;
      this.imageShow = false;
      this.properties.controls["radioNameDisplay"].setValidators(Validators.required);
      this.properties.controls["radioNameDisplay"].updateValueAndValidity();
      this.properties.controls["radioCharactersAllowed"].setValidators(Validators.required);
      this.properties.controls["radioCharactersAllowed"].updateValueAndValidity();
      this.radioNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      //this.radioCharactersAllowed.setValue(list.length);
      this.radioMarkRequired.setValue(list.is_required);
      this.radioCharactersAllowed.setValue(list.picklist_options);
    }
    else if (list.dt_code == 'image') {
      this.initForm();
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.dateTimeShow = false;
      this.checkboxShow = false;
      this.radioShow = false;
      this.booleanShow = false;
      this.imageShow = true;
      this.properties.controls["urlNameDisplay"].setValidators(Validators.required);
      this.properties.controls["urlNameDisplay"].updateValueAndValidity();
      this.urlNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
      this.urlCharactersAllowed.setValue(list.picklist_options);
      this.urlMarkRequired.setValue(list.is_required);
      //this.formfieldvisible.setValue(list.form_field_visibility);
      //this.listfieldvisible.setValue(list.list_field_visibility);
    }
    else {
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.dateTimeShow = false;
      this.checkboxShow = false;
      this.booleanShow = false;
      this.radioShow = false;
      this.urlShow = false;
    }
    this.listfieldvisible.setValue(list.list_field_visibility);
    var boolValue = (list.is_readOnly == "true");
    this.properties.controls["is_readOnly"].setValue(boolValue);
    this.properties.controls["formfieldvisible"].setValue(list.form_field_visibility == "YES" ? true : false);
    this.properties.controls["listfieldvisible"].setValue(list.list_field_visibility == "YES" ? true : false);
    this.properties.controls["statusId"].setValue(statusId);
    this.properties.controls["isSyncWithObject"].setValue(list.is_aync_with_object);
    this.properties.controls["isSyncWithObjectFieldId"].setValue(list.is_sync_with_object_field_id);
    if (this.imageShow) {
      this.isDisplaySyncWithObjectCheckbox = false;
    } else {
      this.isDisplaySyncWithObjectCheckbox = true;
      if (this.isSyncWithObject.value) {
        this.isDisplaySyncWithObjectSection = true;
      } else {
        this.isDisplaySyncWithObjectSection = false;
      }
    }
    if (this.formfieldvisible.value) {
      if (this.imageShow) {
        this.isDisplayDependentSection = false;
      } else {
        this.isDisplayDependentSection = true;

      }

      if (list.is_dependent) {
        this.chkIsDependant.setValue(true);
        this.isDependant = true;
      }
      else {
        this.chkIsDependant.setValue(false);
        this.isDependant = false;
      }
    }
    else {
      this.isDisplayDependentSection = false;
    }

    if (list.is_dependent) {
      this.ddlFormField.setValue(list.dependent_id);
      let control = questionLists.filter(m => m.form_field_id.toString() == list.dependent_id)[0];
      this.OnDependencyFieldChange(control);
      this.ddlOption.setValue(list.dependent_value);
      this.dependentType.setValue(list.dependent_type);
    }
    this.propertiesPopupForm.show();
    this.active = true;
    this.FormFieldList = questionLists.map(m => { return { dependent_type: m.dependent_type, value: m.display_name, id: m.form_field_id.toString(), picklist_options: m.picklist_options, selectlistvalues: m.selectlistvalues, dt_code: m.dt_code } });
  }

  Save() {
    let error = 0;
    if (this.properties.controls["singleLineMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
      error = 1;
    else if (this.properties.controls["multiLineMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
      error = 1;
    else if (this.properties.controls["selectListMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
      error = 1;
    else if (this.properties.controls["intMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
      error = 1;
    else if (this.properties.controls["bigintMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
      error = 1;
    else if (this.properties.controls["decimalMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
      error = 1;
    else if (this.properties.controls["checkboxMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
      error = 1;
    else if (this.properties.controls["radioMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
      error = 1;
    else if (this.properties.controls["urlMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
      error = 1;
    else if (this.properties.controls["dateMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
      error = 1;



    if (this.properties.valid && error == 0) {
      let myList = [{ id: 'aaa1', name: 'aaa' }, { id: 'bbb2', name: 'bbb' }, { id: 'ccc3', name: 'ccc' }];
      let itemUpdated = { id: 'aaa1', name: 'Another approach' };
      this.customFieldLayOut.emit();
      this.propertiesPopupForm.hide();
    } else if (error == 1) {
      setTimeout(() => {
        this.toaster.error('Mark as Required and Is Readonly both can not be check at the same time');
      }, 1000);
    } else {
      this.commonService.validateAllFormFields(this.properties);
    }
  }

  //************************* dependancy field code *************************************/
  isDisplayDependentSection: boolean = true;
  isDisplaySyncWithObjectSection: boolean = false;
  isDisplaySyncWithObjectCheckbox: boolean = false;
  isDependant: boolean = false;
  FormFieldList: any = [];
  ddlOptionList: any = [];

  get chkIsDependant() { return this.properties.get('chkIsDependant') }

  onCheckChange(event, type) {
    if (type == "formfieldvisible") {
      if (this.formfieldvisible.value) {
        this.isDisplayDependentSection = true;
      }
      else {
        this.isDisplayDependentSection = false;
        this.chkIsDependant.setValue(false);
        this.isDependant = false;

      }
    }
    else if (type == "chkIsDependant") {
      if (this.chkIsDependant.value) {
        this.isDependant = true;
      }
      else {
        this.chkIsDependant.setValue(false);
        this.isDependant = false;
      }
    }
  }
  onIsSyncObjectCheckChange(event, type) {
    if (this.isSyncWithObject.value) {
      this.isDisplaySyncWithObjectSection = true;
    } else {
      this.isDisplaySyncWithObjectSection = false;
    }
  }

  OnDependencyFieldChange(e: GroupControls) {
    this.ddlOptionList = [];
    this.ddlOption.setValue(null);
    this.dependentType.setValue(null);
    this.ddlOption.updateValueAndValidity;
    if (e.selectlistvalues) {
      if (e.selectlistvalues instanceof Array)
        this.ddlOptionList = e.selectlistvalues;
      else {
        let array = e.selectlistvalues.split(',') as [];
        let _resultList = [];
        if (array.length > 0) {
          array.forEach((item: string, index) => {
            _resultList.push(JSON.parse('{"value":"' + item + '","id":"' + item + '"}'));
          });
          this.ddlOptionList = _resultList;
        }
      }
    }
    else if (e.picklist_options) {
      let array = e.picklist_options.split(',') as [];
      let _resultList = [];
      if (array.length > 0) {
        array.forEach((item: string, index) => {
          _resultList.push(JSON.parse('{"value":"' + item + '","id":"' + item + '"}'));
        });
        this.ddlOptionList = _resultList;
      }
    } else {
      let _resultList = [];
      _resultList.push(JSON.parse('{"value":"Yes","id":"' + true + '"}'));
      _resultList.push(JSON.parse('{"value":"No","id":"' + false + '"}'));
      this.ddlOptionList = _resultList;
    }
    this.dependentType.setValue(e.dependent_type);
  }
  OnDependencyOptionChange(events) {

  }


  onClear(type) {
    if (type == "ddlFormField") {
      this.ddlOption.setValue(null);
    }
    else if (type == "ddlOption") {
    }
    else if (type == "ddlFileExt") {
      this.ddlFileExt.setValue(null);
    }
  }




  private initForm() {
    this.properties = this.fb.group({
      singleLineNameDisplay: [null],
      singleLineCharactersAllowed: [null],
      singleLineMarkRequired: [false],

      multiLineNameDisplay: [null],
      multiLineCharactersAllowed: [null],
      multiLineMarkRequired: [false],

      //select List
      selectListLineNameDisplay: [null],
      selectListCharactersAllowed: [null],
      selectListMarkRequired: [false],
      selectListMultiddl: [false],
      //int
      intNameDisplay: [null],
      intCharactersAllowed: [null],
      intMarkRequired: [null],
      //bigInt
      bigintNameDisplay: [null],
      bigintCharactersAllowed: [null],
      bigintMarkRequired: [false],
      //decimal
      decimalCharactersAllowed: [null],
      decimalNameDisplay: [null],
      decimalMarkRequired: [false],
      // Date
      dateNameDisplay: [null],
      dateMarkRequired: [false],
      booleanNameDisplay: [null],
      booleanMarkRequired: [false],
      checkboxNameDisplay: [null],
      checkboxCharactersAllowed: [null],
      checkboxMarkRequired: [false],
      radioNameDisplay: [null],
      radioCharactersAllowed: [null],
      radioMarkRequired: [false],
      urlNameDisplay: [null],
      urlCharactersAllowed: [null],
      urlMarkRequired: [false],
      listfieldvisible: [false],
      formfieldvisible: [true],
      chkIsDependant: [false],
      ddloptions: '',
      ddloptionscolor: '',
      selectlistvalue: [],
      is_readOnly: [false],
      ddlFormField: [],
      ddlOption: [],
      ddlFileExt: [],
      dependentType: [],
      statusId: [],
      isSyncWithObject: [false],
      isSyncWithObjectFieldId: [null]
    });
  }
  get isSyncWithObject() { return this.properties.get('isSyncWithObject') }
  get isSyncWithObjectFieldId() { return this.properties.get('isSyncWithObjectFieldId') }
  get statusId() { return this.properties.get('statusId'); }
  get ddlFormField() { return this.properties.get('ddlFormField'); }
  get ddlOption() { return this.properties.get('ddlOption'); }
  get dependentType() { return this.properties.get('dependentType'); }
  get ddlFileExt() { return this.properties.get('ddlFileExt'); }
  get singleLineNameDisplay() { return this.properties.get('singleLineNameDisplay'); }
  get singleLineCharactersAllowed() { return this.properties.get('singleLineCharactersAllowed'); }
  get singleLineMarkRequired() { return this.properties.get('singleLineMarkRequired'); }

  //mutiline popup window
  get multiLineNameDisplay() { return this.properties.get('multiLineNameDisplay'); }
  get multiLineCharactersAllowed() { return this.properties.get('multiLineCharactersAllowed'); }
  get multiLineMarkRequired() { return this.properties.get('multiLineMarkRequired'); }

  //Select List
  get selectListLineNameDisplay() { return this.properties.get('selectListLineNameDisplay'); }
  get selectListCharactersAllowed() { return this.properties.get('selectListCharactersAllowed'); }
  get selectListMarkRequired() { return this.properties.get('selectListMarkRequired'); }
  get selectListMultiddl() { return this.properties.get('selectListMultiddl'); }


  //int
  get intNameDisplay() { return this.properties.get('intNameDisplay'); }
  get intCharactersAllowed() { return this.properties.get('intCharactersAllowed'); }
  get intMarkRequired() { return this.properties.get('intMarkRequired'); }
  //bigint
  get bigintNameDisplay() { return this.properties.get('bigintNameDisplay'); }
  get bigintCharactersAllowed() { return this.properties.get('bigintCharactersAllowed'); }
  get bigintMarkRequired() { return this.properties.get('bigintMarkRequired'); }
  //decimal
  get decimalCharactersAllowed() { return this.properties.get('decimalCharactersAllowed'); }
  get decimalNameDisplay() { return this.properties.get('decimalNameDisplay'); }
  get decimalMarkRequired() { return this.properties.get('decimalMarkRequired'); }
  //date

  get dateMarkRequired() { return this.properties.get('dateMarkRequired'); }
  get dateNameDisplay() { return this.properties.get('dateNameDisplay'); }

  get booleanMarkRequired() { return this.properties.get('booleanMarkRequired'); }
  get booleanNameDisplay() { return this.properties.get('booleanNameDisplay'); }
  // CheckBox
  get checkboxNameDisplay() { return this.properties.get('checkboxNameDisplay'); }
  get checkboxCharactersAllowed() { return this.properties.get('checkboxCharactersAllowed'); }
  get checkboxMarkRequired() { return this.properties.get('checkboxMarkRequired'); }

  //rado

  get radioNameDisplay() { return this.properties.get('radioNameDisplay'); }
  get radioCharactersAllowed() { return this.properties.get('radioCharactersAllowed'); }
  get radioMarkRequired() { return this.properties.get('radioMarkRequired'); }

  //url
  get urlNameDisplay() { return this.properties.get('urlNameDisplay'); }
  get urlCharactersAllowed() { return this.properties.get('urlCharactersAllowed'); }
  get urlMarkRequired() { return this.properties.get('urlMarkRequired'); }
  get formfieldvisible() { return this.properties.get('formfieldvisible'); }
  get listfieldvisible() { return this.properties.get('listfieldvisible'); }


  get ddloptions() { return this.properties.get('ddloptions'); }
  get ddloptionscolor() { return this.properties.get('ddloptionscolor'); }
  get selectlistvalue() { return this.properties.get('selectlistvalue'); }
  get is_readOnly() { return this.properties.get('is_readOnly'); }

}
