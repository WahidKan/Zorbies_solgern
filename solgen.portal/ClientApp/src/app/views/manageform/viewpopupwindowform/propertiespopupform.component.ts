import { Component, OnInit, ViewChild, Input, Inject, forwardRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AddeditformComponent } from '../addeditform.component';
import { SelectListArray, GroupControls } from '../form.service';
import { DateTimeToLocalForAddEditForDatePipe } from '../../../pipes/datetime.pipe';

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
  isTextEditor = false;
  is_system_generated = false;
  //ddloptions :any;
  ddloptionsvalidation = false;
  colorCode: any;
  editid = 0;
  colorList: any[] = [];
  // ddloptionscolor : any;
  idcounter = 0;
  selectoptions = new SelectListArray();
  selectlistvalues: Array<SelectListArray> = [];
  loadSave: boolean = false;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
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
  deleteSelectlist(id, value, color, rowIndex) {
    this.editid = id;
    let data = this.selectlistvalues;
    this.selectlistvalues.splice(rowIndex, 1);
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

    try {
      if (this.ddloptions.value != null && this.ddloptions.value != "") {
        this.colorCode = this.properties.controls["ddloptionscolor"].value;
        this.ddloptionsvalidation = false;
        this.selectoptions = new SelectListArray();
        if (this.editid == 0) {
          this.selectoptions.id = this.incrementcounterid();
          this.selectoptions.isinserted = 1;
          this.selectoptions.value = this.ddloptions.value;
          this.selectoptions.color = this.ddloptionscolor.value == null || this.ddloptionscolor.value == '' ? '#3b0acc' : this.ddloptionscolor.value;
          this.selectlistvalues.push(this.selectoptions);
        }
        else {
          const targetIdx = this.selectlistvalues.find(item => item.id == this.editid);
          let indexObj = this.selectlistvalues.indexOf(targetIdx);
          this.selectlistvalues[indexObj].value = this.ddloptions.value;
          this.selectlistvalues[indexObj].color = this.ddloptionscolor.value == null || this.ddloptionscolor.value == '' ? '#3b0acc' : this.ddloptionscolor.value;
        }

        this.properties.controls["selectlistvalue"].setValue(this.selectlistvalues);
        this.properties.controls["ddloptions"].setValue(null);
        this.properties.controls["ddloptionscolor"].setValue(this.ddloptionscolor.value);
        this.colorCode = "";
      }
      else {
        this.ddloptionsvalidation = true;

      }

    } catch (error) {
      // console.log("error", error);
    }
  }
  close() {
    this.active = false;
    this.propertiesPopupForm.hide();
  }
  //Save() {
  //  this.modalmakeAppointment.hide();
  //  this.router.navigateByUrl("/calendar");
  //}
  show(list: GroupControls, drpoed: any, index: any, groupCreated: any, groupControls: Array<GroupControls>) {
    ;
    //this.refresh();
    // console.log("List", list);
    this.fieldName = "Field"//list.name;
    this.is_system_generated = list.is_system_generated;
    this.fieldsType = list.dt_code;
    this.fieldList = list;

    if (list.dt_code == 'text' && list.field_type == 'texteditor') {
      this.isTextEditor = true;
    }
    else {
      this.isTextEditor = false;
    }


    if (list.dt_code == 'text') {
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.singleLine = true;
      this.SelectList = false;
      this.multiLine = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.urlShow = false;
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
      this.singleLineNameDisplay.setValue(list.display_name);
      this.singleLineMarkRequired.setValue(list.is_required);


    }
    else if (list.dt_code == 'textarea') {
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.multiLine = true;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.booleanShow = false;
      this.urlShow = false;
      this.checkboxShow = false;
      this.radioShow = false;
      this.properties.controls["multiLineNameDisplay"].setValidators(Validators.required);
      this.properties.controls["multiLineNameDisplay"].updateValueAndValidity();
      this.properties.controls["multiLineCharactersAllowed"].setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4),]);
      this.properties.controls["multiLineCharactersAllowed"].updateValueAndValidity();
      this.multiLineCharactersAllowed.setValue(typeof list.length == undefined ? 200 : list.length);
      this.multiLineNameDisplay.setValue(list.display_name);
      this.multiLineMarkRequired.setValue(list.is_required);

    }
    else if (list.dt_code == 'select') {
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = true;
      this.intShow = false;
      this.booleanShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.checkboxShow = false;
      this.urlShow = false;
      this.radioShow = false;
      this.properties.controls["selectListLineNameDisplay"].setValidators(Validators.required);
      this.properties.controls["selectListLineNameDisplay"].updateValueAndValidity();
      this.properties.controls["selectListCharactersAllowed"].setValidators(Validators.required);
      this.properties.controls["selectListCharactersAllowed"].updateValueAndValidity();
      this.selectListCharactersAllowed.setValue(list.length);
      this.selectListLineNameDisplay.setValue(list.display_name);
      this.selectListMarkRequired.setValue(list.is_required);
      this.selectListMultiddl.setValue(list.picklist_options);

      this.selectlistvalues = list.selectlistvalues == undefined ? new Array<SelectListArray>() : list.selectlistvalues;
      // // console.log('aaaa', this.selectlistvalues);
    }
    else if (list.dt_code == 'int') {
      this.initForm();
      this.index = index;
      this.booleanShow = false;
      this.parentData = drpoed;
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = true;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.checkboxShow = false;
      this.urlShow = false;
      this.radioShow = false;
      this.properties.controls["intNameDisplay"].setValidators(Validators.required);
      this.properties.controls["intNameDisplay"].updateValueAndValidity();
      this.properties.controls["intCharactersAllowed"].setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4),]);
      this.properties.controls["intCharactersAllowed"].updateValueAndValidity();
      this.intCharactersAllowed.setValue(list.length);
      this.intNameDisplay.setValue(list.display_name);
      this.intMarkRequired.setValue(list.is_required);

    }
    else if (list.dt_code == 'bigint') {
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.multiLine = false;
      this.singleLine = false;
      this.booleanShow = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = true;
      this.decimalShow = false;
      this.dateShow = false;
      this.checkboxShow = false;
      this.radioShow = false;
      this.urlShow = false;
      this.properties.controls["bigintNameDisplay"].setValidators(Validators.required);
      this.properties.controls["bigintNameDisplay"].updateValueAndValidity();
      this.properties.controls["bigintCharactersAllowed"].setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4),]);
      this.properties.controls["bigintCharactersAllowed"].updateValueAndValidity();
      this.bigintCharactersAllowed.setValue(list.length);
      this.bigintNameDisplay.setValue(list.display_name);
      this.bigintMarkRequired.setValue(list.is_required);

    }
    else if (list.dt_code == 'decimal') {
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.booleanShow = false;
      this.decimalShow = true;
      this.dateShow = false;
      this.urlShow = false;
      this.checkboxShow = false;
      this.radioShow = false;
      this.properties.controls["decimalNameDisplay"].setValidators(Validators.required);
      this.properties.controls["decimalNameDisplay"].updateValueAndValidity();
      this.properties.controls["decimalCharactersAllowed"].setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4),]);
      this.properties.controls["decimalCharactersAllowed"].updateValueAndValidity();
      this.decimalCharactersAllowed.setValue(list.length);
      this.decimalNameDisplay.setValue(list.display_name);
      this.decimalMarkRequired.setValue(list.is_required);

    }
    else if (list.dt_code == 'boolean') {
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.checkboxShow = false;
      this.booleanShow = true;
      this.urlShow = false;
      this.radioShow = false;
      this.properties.controls["booleanNameDisplay"].setValidators(Validators.required);
      this.properties.controls["booleanNameDisplay"].updateValueAndValidity();
      this.booleanNameDisplay.setValue(list.name);
      this.booleanMarkRequired.setValue(list.is_required);

      if (list.default_value != null && list.default_value != "") {
        this.booleanDefaultValue.setValue(JSON.parse(list.default_value));
      }
      else {
        this.booleanDefaultValue.setValue(list.default_value);
      }

    }
    else if (list.dt_code == 'date') {
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = true;
      this.checkboxShow = false;
      this.urlShow = false;
      this.booleanShow = false;
      this.radioShow = false;
      this.properties.controls["dateNameDisplay"].setValidators(Validators.required);
      this.properties.controls["dateNameDisplay"].updateValueAndValidity();
      this.dateNameDisplay.setValue(list.display_name);
      this.dateMarkRequired.setValue(list.is_required);
    }
    else if (list.dt_code == 'datetime') {
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateTimeShow = true;
      this.checkboxShow = false;
      this.urlShow = false;
      this.booleanShow = false;
      this.radioShow = false;
      this.properties.controls["dateTimeNameDisplay"].setValidators(Validators.required);
      this.properties.controls["dateTimeNameDisplay"].updateValueAndValidity();
      this.dateTimeNameDisplay.setValue(list.display_name);
      this.dateTimeMarkRequired.setValue(list.is_required);
    }
    else if (list.dt_code == 'checkbox') {
      ;
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.booleanShow = false;
      this.checkboxShow = true;
      this.radioShow = false;
      this.urlShow = false;
      this.properties.controls["checkboxNameDisplay"].setValidators(Validators.required);
      this.properties.controls["checkboxNameDisplay"].updateValueAndValidity();
      this.properties.controls["checkboxCharactersAllowed"].setValidators(Validators.required);
      this.properties.controls["checkboxCharactersAllowed"].updateValueAndValidity();
      this.checkboxNameDisplay.setValue(list.display_name);
      this.checkboxCharactersAllowed.setValue(list.picklist_options);
      this.checkboxMarkRequired.setValue(list.is_required);
    }
    else if (list.dt_code == 'radio') {
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.checkboxShow = false;
      this.booleanShow = false;
      this.radioShow = true;
      this.urlShow = false;
      this.properties.controls["radioNameDisplay"].setValidators(Validators.required);
      this.properties.controls["radioNameDisplay"].updateValueAndValidity();
      this.properties.controls["radioCharactersAllowed"].setValidators(Validators.required);
      this.properties.controls["radioCharactersAllowed"].updateValueAndValidity();
      this.radioNameDisplay.setValue(list.display_name);
      //this.radioCharactersAllowed.setValue(list.length);
      this.radioMarkRequired.setValue(list.is_required);
      this.radioCharactersAllowed.setValue(list.picklist_options);
    }
    else if (list.dt_code == 'url') {
      this.initForm();
      this.index = index;
      this.parentData = drpoed;
      this.multiLine = false;
      this.singleLine = false;
      this.SelectList = false;
      this.intShow = false;
      this.bigInt = false;
      this.decimalShow = false;
      this.dateShow = false;
      this.checkboxShow = false;
      this.radioShow = false;
      this.booleanShow = false;
      this.urlShow = true;
      this.properties.controls["urlNameDisplay"].setValidators(Validators.required);
      this.properties.controls["urlNameDisplay"].updateValueAndValidity();
      this.properties.controls["urlCharactersAllowed"].setValidators(Validators.required);
      this.properties.controls["urlCharactersAllowed"].updateValueAndValidity();
      this.urlNameDisplay.setValue(list.display_name);
      this.urlCharactersAllowed.setValue(list.length);
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


    if (this.formfieldvisible.value) {
      this.isDisplayDependentSection = true;
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
      ;
      this.ddlFormField.setValue(list.dependent_id);

      let control = groupControls.filter(m => m.form_field_id.toString() == list.dependent_id)[0];
      if (control) {
        this.OnDependencyFieldChange(control);
        this.ddlOption.setValue(list.dependent_value);
      }
    }

    this.propertiesPopupForm.show();
    this.active = true;

    // console.log("", groupControls);
    this.FormFieldList = groupControls.map(m => { return { value: m.display_name, id: m.form_field_id.toString(), picklist_options: m.picklist_options, selectlistvalues: m.selectlistvalues, dt_code: m.dt_code } });


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
      // // console.log(this.parentData);
      let myList = [{ id: 'aaa1', name: 'aaa' }, { id: 'bbb2', name: 'bbb' }, { id: 'ccc3', name: 'ccc' }];
      let itemUpdated = { id: 'aaa1', name: 'Another approach' };
      //this.parentData[this.index].name = this.properties.value.singleLineNameDisplay
      //this.parentData[this.index].name = this.properties.value.singleLineNameDisplay
      this.customFieldLayOut.emit();
      this.propertiesPopupForm.hide();
      this.toaster.success(`Field properties has been set successfully.`);
      //this.parentData.find(this.index).name = this.properties.value.singleLineNameDisplay;
      // // console.log("Please", this.properties.value);
    } else if (error == 1) {
      setTimeout(() => {
        //this.toaster.error('Mark as Required and Is Readonly both can not be check at the same time');
        this.toaster.error('Mark as Required and Is Read Only both can not be selected together.');

      }, 1000);
    } else {
      this.commonService.validateAllFormFields(this.properties);
    }
  }

  //************************* dependancy field code *************************************/
  isDisplayDependentSection: boolean = false;
  isDependant: boolean = false;
  FormFieldList: any = [];
  ddlOptionList: any = [];

  get chkIsDependant() { return this.properties.get('chkIsDependant') }

  onCheckChange(event, type) {
    ;
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

  OnDependencyFieldChange(e: GroupControls) {
    // console.log("OnDependencyFieldChange", e)
    this.ddlOptionList = [];
    this.ddlOption.setValue(null);
    this.ddlOption.updateValueAndValidity;
    if (typeof e != undefined) {
      if (e.dt_code != "boolean" && e.selectlistvalues) {
        ;
        this.ddlOptionList = e.selectlistvalues;
      }
      else if (e.dt_code != "boolean" && e.picklist_options) {
        let array = e.picklist_options.split(',') as [];
        let _resultList = [];
        if (array.length > 0) {
          array.forEach((item: string, index) => {
            _resultList.push(JSON.parse('{"value":"' + item + '","id":"' + item + '"}'));
          });
          // console.log("_resultList", _resultList);

          this.ddlOptionList = _resultList;
        }
      }
      else if (e.dt_code = "boolean") {
        let _resultList1 = [];
        _resultList1.push(JSON.parse('{"value":"Yes","id":"true"}'));
        _resultList1.push(JSON.parse('{"value":"No","id":"false"}'));
        this.ddlOptionList = _resultList1;
      }
    }
  }
  OnDependencyOptionChange(events) {

  }


  onClear(type) {
    if (type == "ddlFormField") {
      this.ddlOption.setValue(null);
    }
    else if (type == "ddlOption") {
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
      // DateTimeToLocalForAddEditForDatePipe
      dateTimeNameDisplay: [null],
      dateTimeMarkRequired: [false],
      booleanNameDisplay: [null],
      booleanDefaultValue: [null],
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
      formfieldvisible: [false],
      chkIsDependant: [false],
      ddloptions: '',
      ddloptionscolor: '',
      selectlistvalue: [], is_readOnly: [false]
      , ddlFormField: []
      , ddlOption: []



    });
  }
  get ddlFormField() { return this.properties.get('ddlFormField'); }
  get ddlOption() { return this.properties.get('ddlOption'); }
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

  get dateTimeMarkRequired() { return this.properties.get('dateTimeMarkRequired'); }
  get dateTimeNameDisplay() { return this.properties.get('dateTimeNameDisplay'); }

  get booleanMarkRequired() { return this.properties.get('booleanMarkRequired'); }
  get booleanNameDisplay() { return this.properties.get('booleanNameDisplay'); }
  get booleanDefaultValue() { return this.properties.get('booleanDefaultValue'); }

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
