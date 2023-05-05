import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { PropertiespopupformComponent } from '../../manageform/viewpopupwindowform/propertiespopupform.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormService, Container1, Widget, GroupControls, Group, FormControlModel } from '../../manageform/form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../common.service';
import { ScreenpropertypopupComponent } from './screenpropertypopup.component';
import { ModalDirective } from 'ngx-bootstrap';
import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';

@Component({
  selector: 'app-welcomescreen',
  templateUrl: './welcomescreen.component.html',
  styleUrls: ['./welcomescreen.component.scss']
})
export class WelcomescreenComponent implements OnInit {    
  @ViewChild('welcomescreen', { static: false }) welcomescreen: ModalDirective;    
  @ViewChild('propertiesform', { static: false }) propertiesform: ScreenpropertypopupComponent;
  @ViewChild('parent', { read: ViewContainerRef,  static: false } ) target: ViewContainerRef;
@ViewChild('Display', { static: false }) Display: any;
  //@Output() formIdSent= new EventEmitter<string>();    
  public manageForm: FormGroup;
  loadSave = false;
  name = 'Angular';
  submodule = '';
  colors = [];
  renderer: any;
  droped = [];
  newgroup = [];
  newGrpDisplaydropDown: any;
  dragedColor = null;
  InnerData: any;
  condition = false;
  condionNewGroup = false;
  formPageType = 'single';
  form_field_visibility = 'No';
  DemoShow = false;
  formPageTypeNewGrp = 'single';
  dynamicformNewSection = [];
  displayProperties = false;
  individualDisplay: any;
  moduleName = 'user';
  submoduleName = 'department';
  companyId: number;
  customFiledsData: any;
  index: any;
  newcontrolid: any;
  //containers = [];
  dataIndex: any;
  groupCreated: any;
  // conditionNewGrp = false;
  values: any;
  hideme = [];
  hideme1 = [];
  uniqueid: any;
  hidemeNewGrp = [];
  formName: any;
  counterValue = 0;
  moduleid = "1";
  submoduleid = "1";
  formMasterId = '';

  pageTitle = "";
  customCompnentValues: any[] = [];
  customFieldList: any[] = [];
  groupName: any[] = [];
  formControlList: any[] = [];
  groupNamedata: any[] = [];
  groupTables: any = [];
  timeFormat: string;
  editor: any = [];

  isCompanyTypeFinancialInstitute: boolean = false;
  userInfo: any[] = [];
  companyType: any;

 
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  constructor(private fb: FormBuilder, private formService: FormService, private router: Router,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
    this.pageTitle = "Add/Edit Form Fields";
  }
  dragOperation: boolean = false;
     
  containers: Array<Container1> = [
    new Container1(1, 'Container 1', [new Widget('1'), new Widget('2')]),
    new Container1(2, 'Container 2', [new Widget('3'), new Widget('4')]),
    new Container1(3, 'Container 3', [new Widget('5'), new Widget('6')])
  ];
  groupBy1 = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, []); // empty object is the initial value for result object
  };
  groupControl: GroupControls;
  groupControl1: GroupControls[];
  group: Array<Group> = [];
  controls: Array<GroupControls> = [];
  saveForm: FormControlModel[];
  dragfullgroup() {
    if (this.dragOperation == true) {

      this.dragOperation = false;
    }
    else {
      this.dragOperation = true;
    }
  }

  incrementcounter() {
    return this.counterValue++;
  }
  decrementcounter() {
    return this.counterValue--;
  }

  onKeyup(event) {
    this.customCompnentValues = [];

    let searchData = event.target.value as string;
    if (searchData) {
      searchData = searchData.toLowerCase();
      this.customCompnentValues = this.customFieldList.filter(item => {
        if (this.submodule == "loanapplication") {
          return item.displayName.toLowerCase().includes(searchData);
        }
        else {
          return item.display_name.toLowerCase().includes(searchData);
        }
      });
    }
    else {
      this.customCompnentValues = this.customFieldList;
    }
  }

  // Group by color as key to the person array
  fordragcontrol() {

    this.dragOperation = false;
  }
  fordragcontainer() {

    this.dragOperation = true;
  }
  ngOnInit() {
    this.initform();

  }
  private initform() {
    this.manageForm = new FormGroup({
      DefaultfieldName: new FormControl(),
      fieldName: new FormControl(),
      SearchFieldName: new FormControl()
      //fieldArray: Array[]
    });
  }
  show(modulecode: any, submodulecode: any, formid: any) {
   
    // console.log('formdata',modulecode, submodulecode, formid)
    this.userInfo = JSON.parse(localStorage.getItem('userinfo'));
    this.companyType = this.userInfo["companyType"];
    this.companyId = this.userInfo["companyId"];

    

    this.timeFormat = this.commonService.getTimeFormat();
    this.initform();
    this.group.length = 0;
    this.manageForm.reset();
    this.route.paramMap.subscribe(
      params => {
        const module = params.get('module');
        const submodule = params.get('subModule');
        var _formId = '';
        _formId = formid;
       

        if (this.companyType === "companytypeFinancialInstitute" && this.companyId === 1004 && _formId === '') {
          this.isCompanyTypeFinancialInstitute = true;

        }

        this.submodule = submodulecode;  

        this.moduleid = modulecode;
        this.submoduleid = submodulecode;

        this.formMasterId = _formId;

        this.getcustomfielddata(modulecode, submodulecode, this.formMasterId);

        if (!this.isCompanyTypeFinancialInstitute) {
          this.getCustomFiledListByModuleAndSubModule(modulecode, submodulecode);
        }
        else {
          this.filedLists.splice(0, 1);
        }


      });
    this.colors = this.filedLists;
    this.InnerData = 'four';
    this.NewGrop('NewGroup');
    this.welcomescreen.show();
  }


  get SearchFieldName() { return this.manageForm.get('SearchFieldName') }


  getCustomFiledListByModuleAndSubModule(moduleName, submoduleName) {
    let modulecode = moduleName;
    let submodulecode = submoduleName;

    if (submodulecode == 'loanapplication') {
      this.loadSave = true;
      this.commonService.GetCustomFormFieldList(modulecode, submodulecode, '', '').subscribe((result: any) => {
        if (result) {
          this.customCompnentValues = [];
          this.customFieldList = this.commonService.customFieldsList;
          this.customCompnentValues = this.commonService.customFieldsList;
        }
      }, err => { this.loadSave = false; }, () => { this.loadSave = false; });
    }
    else {
      this.loadSave = true;
      //  this.commonService.GetCustomFieldsList(modulecode, submodulecode, '', '', '').subscribe((result: any) => {
      this.commonService.GetCustomFieldsManageForm(modulecode, submodulecode, '', 'MANAGE', '').subscribe((result: any) => {
        if (result) {
          this.customFieldList = result.data;
          this.customCompnentValues = result.data;
        }
      }, err => { this.loadSave = false; }, () => { this.loadSave = false; });
    }
  }



  //getcustomfielddata(id, sid, formMasterId) {
  //  this.loadSave = true;
  //  this.formService.GetFormFieldsList(id, sid, formMasterId, this.companyId).subscribe((result: any) => {

  //    if (result) {
  //      this.customFiledsData = null;
  //      this.droped = [];
  //      this.controls = [];

  //      this.counterValue = 0;
  //      if (this.formService.customFieldsList) {
  //        this.customFiledsData = this.formService.customFieldsList.data;
  //        this.droped = this.customFiledsData;
  //        this.formName = this.droped[0].FormName;
  //      }


       
  //      this.controls = this.groupBy1(this.droped, 'group_display_order');
  //      const mapped = Object.keys(this.controls).map(key => ({ type: key, value: this.controls[key] }));
  //      if (this.isCompanyTypeFinancialInstitute) {
  //        this.group = [];
  //      }
  //      this.controls.forEach((item, ind) => {
  //        if (item[0] != null) {
  //          this.group = [];
  //          this.group.push(new Group(item[ind].group_display_order, item[ind].group_id, item[ind].group_name, item[ind].group_display_name, item[ind].layout_type, item[ind].table_name, item[ind].is_inserted, item[ind].is_updated, item[ind].group_display_order, mapped[ind].value))
  //          this.group.shift();
  //        }
  //        else {
  //          this.group.push(new Group(item[0].group_display_order, item[0].group_id, item[0].group_name, item[0].group_display_name, item[0].layout_type, item[0].table_name, item[0].is_inserted, item[0].is_updated, item[0].group_display_order, mapped[ind].value))
  //        }
  //      });

  //      // this.controls.map(item => { item.system_is_required = true });



  //      this.controls.forEach((item, ind1) => this.dynamicformNewSection[ind1] = item[0].layout_type);


  //      //this.dynamicLayoutNewSection[0] = 'single';
  //      if (this.group.length > 0) {
  //        this.counterValue = this.group[this.group.length - 1].display_order;
  //      }
  //      // this.group.push(new Group(this.controls[0].group_display_order, this.controls[0].group_id, this.controls[0].group_name, this.controls[0].group_display_name, 0, 1, this.controls[0].display_order, this.controls));
  //      // // console.log("this.group.push", this.group);
  //    }
  //    this.loadSave = false;

  //  }, error => { }, () => {

  //  });

  //}

  getcustomfielddata(id, sid, formMasterId) {
    this.loadSave = true;
    this.formService.GetFormFieldsList(id, sid, formMasterId, this.companyId).subscribe((result: any) => {

      if (result) {
        this.customFiledsData = null;
        this.droped = [];
        this.controls = [];
        
        this.counterValue = 0;
        //this.form.setValue(null);
        if (this.formService.customFieldsList) {
          this.customFiledsData = this.formService.customFieldsList.data;
          this.droped = this.customFiledsData;
          this.formName = this.droped[0].FormName;
        }

        // console.log("dropeddddddd", this.formService.customFieldsList);
        //this.groupControl1 = this.droped;
        this.controls = this.groupBy1(this.droped, 'group_display_order');
       
        const mapped = Object.keys(this.controls).map(key => ({ type: key, value: this.controls[key] }));
        // console.log("mappedmapped", mapped);

        if (this.isCompanyTypeFinancialInstitute) {
          this.group = [];
        }
        
        this.controls.forEach((item, ind) => {
          if (item[ind] != null) {
            
            ///this.group = [];
            this.group.push(new Group(item[ind].group_display_order, item[ind].group_id, item[ind].group_name, item[ind].group_display_name, item[ind].layout_type, item[ind].table_name, item[ind].is_inserted, item[ind].is_updated, item[ind].group_display_order, mapped[ind].value))
            this.group.shift();
            
          }
          else {
            
            
            this.group.push(new Group(item[0].group_display_order, item[0].group_id, item[0].group_name, item[0].group_display_name, item[0].layout_type, item[0].table_name, item[0].is_inserted, item[0].is_updated, item[0].group_display_order, mapped[ind].value))
            // console.log(this.group, "GroupsAnother");  
          }
        });
        // this.controls.map(item => { item.system_is_required = true });
        
        this.controls.forEach((item, ind1) => this.dynamicformNewSection[ind1] = item[0].layout_type);
        //this.dynamicLayoutNewSection[0] = 'double';
        if (this.group.length > 0) {
          this.counterValue = this.group[this.group.length - 1].display_order;

        }
        // this.group.push(new Group(this.controls[0].group_display_order, this.controls[0].group_id, this.controls[0].group_name, this.controls[0].group_display_name, 0, 1, this.controls[0].display_order, this.controls));
        // // console.log("this.group.push", this.group);
      }
      this.loadSave = false;

    }, error => { }, () => {

    });
  }
  changegroup(event, index) {

    this.group[index].group_name = event.target.value;
    this.group[index].group_display_name = event.target.value;

    if (index > 0) {
      this.group[index].group_layout_type = this.group[index - 1].group_layout_type;
      this.group[index].table_name = this.group[index - 1].table_name;
    }
    this.group.forEach((item, i) => item.display_order = i);
    // // console.log('this.group', this.group);
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  private GemgarteIdWithUniwquie(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  dragEnd(e) {
  }

  dragStart(e, c: GroupControls) {
    this.uniqueid = this.S4();
    c.form_field_id = this.uniqueid;

    let txtval = 'custom_field_id';
    if ((txtval in c)) {
      let data: any[] = [];
      data.push(c);

      c.field_type = this.getFiledType(data[0].dt_code);
    }

    let temp = [];
    temp = JSON.parse(JSON.stringify(c));
    this.dragedColor = temp;

  }


  getFiledType(dt_code) {

    let field_type: any;

    switch (dt_code) {
      case 'text':
      case 'string':
      case 'nchar':
        field_type = 'textbox';
        break;

      case 'textarea':
        field_type = 'textarea';
        break;

      case 'select':
        field_type = 'dropdown';
        break;

      case 'bit':
        field_type = 'boolean';
        break;

      case 'radio':
        field_type = 'textbox';
        break;

      case 'checkbox':
        field_type = 'checkbox';
        break;

      case 'int':
      case 'bigint':
      case 'decimal':
        field_type = 'number';
        break;

      case 'decimal':
        field_type = 'decimal';
        break;

      case 'time':
      case 'datetime':
        field_type = 'datetime';
        break;

      case 'date':
        field_type = 'date';
        break;

      default:
        field_type = 'textbox';
        break;

    }
    return field_type;
  }

  drop(e) {


    if (this.dragedColor) {
      this.droped.push(this.dragedColor);
      this.dragedColor = null;
    }

    // console.log("this.dragedColor", this.dragedColor);

  }

  dropFields(e, groupId, controlIndex) {
    let fieldIndex = ((e.currentTarget.id) as string).replace('editor', '');

    if (this.dragedColor) {
      if (this.dragedColor.ColumnName) {
        let value = '', data = " {{" + this.dragedColor.ColumnName + "}} ", _finalValue = '';
        if (this.editor[fieldIndex]) {
          value = this.editor[fieldIndex];
          _finalValue = value + data;
        }
        else {
          _finalValue = value + data.replace(' ', '');
        }
        this.group[groupId].controls[controlIndex].default_value = _finalValue;
        this.editor[fieldIndex] = _finalValue;

        this.dragedColor = null;
      }
    }
  }

  customFieldLayOut() {
    // // console.log("Data", this.propertiesform.singleLineNameDisplay.value);
    if (this.propertiesform.singleLine == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.singleLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.singleLineMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.singleLineCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.singleLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = (this.propertiesform.isTextEditor) ? "texteditor" : "textbox";
    }
    else if (this.propertiesform.multiLine == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.multiLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.multiLineMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.multiLineCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.multiLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "textarea";

    }
    else if (this.propertiesform.SelectList == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.selectListLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.selectListCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.selectListMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].picklist_options = this.propertiesform.selectListMultiddl.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "select";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.selectListLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "dropdown";

    }
    else if (this.propertiesform.intShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.intNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.intCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.intMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "int";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "int";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 2;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.intNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "number";

    }
    else if (this.propertiesform.bigInt == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.bigintNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.bigintCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.bigintMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "bigint";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "bigint";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 3;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.bigintNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "number";
    }
    else if (this.propertiesform.decimalShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.decimalNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.decimalCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.decimalMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "decimal";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 4;
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "decimal";
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.decimalNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "decimal";

    }
    else if (this.propertiesform.dateShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.dateNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.dateMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "datetime";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "date";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 5;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.dateNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "date";

    }
    else if (this.propertiesform.booleanShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.booleanNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.booleanMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "bit";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "bit";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 16;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.booleanNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "boolean";
      this.group[this.index].controls[this.newcontrolid].default_value = this.propertiesform.booleanDefaultValue.value;


    }
    else if (this.propertiesform.checkboxShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.checkboxNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.checkboxCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.checkboxMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.checkboxNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "checkbox";

    }
    else if (this.propertiesform.radioShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.radioNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.radioCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.radioMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.radioNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "radioButton";

    }
    else if (this.propertiesform.urlShow == true && this.groupCreated == 'DefaultGroupCreated') {

      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.urlNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.urlCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.urlMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].form_field_visibility = this.propertiesform.formfieldvisible.value;
      this.group[this.index].controls[this.newcontrolid].list_field_visibility = this.propertiesform.listfieldvisible.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.urlNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "url";


    }

    //Dynamic group Created
    if (this.propertiesform.singleLine == true && this.groupCreated == 'NewGroupCreated') {

      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.singleLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.singleLineMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.singleLineCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.singleLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = (this.propertiesform.isTextEditor) ? "texteditor" : "textbox";


    }
    else if (this.propertiesform.multiLine == true && this.groupCreated == 'NewGroupCreated') {

      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.multiLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.multiLineMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.multiLineCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.multiLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "textarea";

    }
    else if (this.propertiesform.SelectList == true && this.groupCreated == 'NewGroupCreated') {

      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.selectListLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.selectListCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.selectListMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].picklist_options = this.propertiesform.selectListMultiddl.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "select";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].selectlistvalues = this.propertiesform.selectlistvalue.value;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.selectListLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "dropdown";

    }
    else if (this.propertiesform.intShow == true && this.groupCreated == 'NewGroupCreated') {

      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.intNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.intCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.intMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "int";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "int";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 2;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.intNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "number";

    }
    else if (this.propertiesform.bigInt == true && this.groupCreated == 'NewGroupCreated') {

      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.bigintNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.bigintCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.bigintMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "bigint";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "bigint";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 3;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.bigintNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "number";

    }
    else if (this.propertiesform.decimalShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.propertiesform.decimalNameDisplay.value;
      //this.newgroup[this.index].length = this.propertiesform.decimalCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.propertiesform.decimalMarkRequired.value;

      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.decimalNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.decimalCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.decimalMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "decimal";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "decimal";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 4;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.decimalNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "decimal";

    }
    else if (this.propertiesform.booleanShow == true && this.groupCreated == 'NewGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.booleanNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.booleanMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "bit";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "bit";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 16;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.booleanNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "boolean";
      this.group[this.index].controls[this.newcontrolid].default_value = this.propertiesform.booleanDefaultValue.value;

    }
    else if (this.propertiesform.dateShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.propertiesform.dateNameDisplay.value;
      //this.newgroup[this.index].is_required = this.propertiesform.dateMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.dateNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.dateMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "datetime";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "date";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 5;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.dateNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "date";

    }
    else if (this.propertiesform.dateTimeShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.propertiesform.dateNameDisplay.value;
      //this.newgroup[this.index].is_required = this.propertiesform.dateMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.dateTimeNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.dateTimeMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "datetime";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "date";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 5;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.dateTimeNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "date";

    }
    else if (this.propertiesform.checkboxShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.propertiesform.checkboxNameDisplay.value;
      //this.newgroup[this.index].length = this.propertiesform.checkboxCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.propertiesform.checkboxMarkRequired.value;

      this.group[this.index].controls[this.newcontrolid].picklist_options = this.propertiesform.checkboxCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.checkboxNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.checkboxMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.checkboxNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "checkbox";

    }
    else if (this.propertiesform.radioShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.propertiesform.radioNameDisplay.value;
      //this.newgroup[this.index].length = this.propertiesform.radioCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.propertiesform.radioMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.radioNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].picklist_options = this.propertiesform.radioCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.radioMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.radioNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "radioButton";

    }
    else if (this.propertiesform.urlShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.propertiesform.urlNameDisplay.value;
      //this.newgroup[this.index].length = this.propertiesform.urlCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.propertiesform.urlMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.urlNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.urlCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.urlMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "Url";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.urlNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_type = "url";

    }

    this.group[this.index].controls[this.newcontrolid].form_field_visibility = (this.propertiesform.formfieldvisible.value) ? "YES" : "NO";
    this.group[this.index].controls[this.newcontrolid].form_field_visibility = (this.propertiesform.formfieldvisible.value) ? "YES" : "NO";
    this.group[this.index].controls[this.newcontrolid].dependent_id = this.propertiesform.ddlFormField.value;
    this.group[this.index].controls[this.newcontrolid].dependent_value = this.propertiesform.ddlOption.value;

    if (this.propertiesform.chkIsDependant.value) {
      this.group[this.index].controls[this.newcontrolid].is_dependent = true;
      this.group[this.index].controls[this.newcontrolid].dependent_type = "query";
    }
    else {
      this.group[this.index].controls[this.newcontrolid].is_dependent = false;
      this.group[this.index].controls[this.newcontrolid].dependent_type = null;
    }

    this.group[this.index].controls[this.newcontrolid].is_readOnly = this.propertiesform.is_readOnly.value.toString();
   // this.welcomescreen.show();
    // this.group[this.index].controls[this.newcontrolid].list_field_visibility = this.propertiesform.listfieldvisible.value;
    //this.colors = this.filedLists;
    //// // console.log("colors", this.colors);
    //// // console.log("droped", this.droped);
    //// // console.log("filedLists", this.filedLists);
  }
  allowDropFunction(c: any): any {

    // // console.log('3434', c);
  }

  dragStartGroupToGroup(e, c) {

    this.dragedColor = c;
    //this.dragedColor
    const index: number = this.droped.indexOf(c);
    if (index !== -1) {
      this.droped.splice(index, 1);
    }
    //this.droped.push(this.droped);
    this.dropNewGrop('', 0);
  }
  dragEndGroupToGroup(e) {

  }
  dragEndGroupToGroupReverse() {

  }
  dragStartGroupToGroupReverse(e, c) {
    this.dragedColor = c;
    const index: number = this.droped.indexOf(c);
    if (index !== -1) {
      this.newgroup.splice(index, 1);
    }
    //this.droped.push(this.droped);
    this.drop(e);
  }

  //dropNewGroup(e) {
  //  
  //  if (this.dragedColor) {
  //    this.droped.push(this.dragedColor);
  //    this.dragedColor = null;
  //    // // console.log("droped", this.droped);
  //  }
  //}
  dropNewGrop(lst, a) {

    if (this.dragedColor) {
      this.dragedColor.index = a;
      this.newgroup.push(this.dragedColor);
      this.groupControl = this.dragedColor;
      //this.controls.push(this.groupControl);
      this.groupControl.system_is_required = false;
      this.groupControl.is_system_generated = false;
      this.groupControl.is_inserted = 1;
      const targetIdx = this.group.find(item => item.id == a).id;
      this.group[targetIdx].controls.push(this.groupControl);

      // // console.log('this.group', this.group[targetIdx].controls)
      //this.group.push(new Group(a + 1, this.controls));

      this.dragedColor = null;
      // // console.log("newgroup", this.newgroup);
    }
  }

  toggleClass(event: any, classs: string) {
    const hasClass = event.target.classList.contains(classs);
    if (this.condition == true) {
      this.condition = false;
    }
    else {
      this.condition = true;
    }
    if (hasClass) {
      //this.renderer.removeClass(event.target, classs);
      this.condition = false;
    } else {
      //this.renderer.addClass(event.target, classs);
      //this.condition = true;
      // // console.log("AddClass", this.renderer);
    }
  }

  toggleClassRadioButton(event: any, classs: string) {
    // // console.log('event',event);
    // // console.log('classs',classs);
    this.condition = false;
    this.formPageType = classs;

  }
  toggleClassNewGrp(event: any, classs: string, index) {

    if (this.condionNewGroup == false) {
      this.condionNewGroup = true;
      let newgrpdisplay = this.GemgarteIdWithUniwquie();
      this.newGrpDisplaydropDown = newgrpdisplay;
    } else {
      this.condionNewGroup = false;
    }
  }
  toggleClassRadioButtonNew(event: any, index: any, classs: any) {

    // // console.log(event);
    // // console.log(classs);
    // // console.log('IndexNumber', index);
    this.condionNewGroup = false;
    this.hidemeNewGrp[index] = false;
    this.dynamicformNewSection[index] = classs;
    this.formPageTypeNewGrp = classs;
    this.group[index].group_layout_type = classs.replace('Columns', '');
    this.group[index].controls.forEach(items => items.layout_type = classs.replace('Columns', ''));
    // // console.log("this.groupclas", this.group);
  }
  NewGrop(NewGroup: string) {
    
    if (NewGroup == 'NewGroup') {
      this.DemoShow = true;
      this.dynamicformNewSection[0] = 'single';
      this.newGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
      this.fieldArray.push(this.newAttribute);
      //let data = this.group.length;
      
      this.group.push(new Group(this.group.length, 0, "", "", "", "", 1, 0, 0, []));


      for (let data of this.fieldArray) {
        this.dynamicformNewSection[1] = 'single';
        this.dynamicformNewSection[2] = 'single';
        this.dynamicformNewSection[3] = 'single';
        this.dynamicformNewSection[4] = 'single';
      }
      this.newAttribute = {};

    }
  }

  DisplayProperties(event, order: string, index: number) {

    // // console.log("ShowLL", event);
    if (this.displayProperties == false) {
      //this.displayProperties = true;
      document.getElementById("#1").setAttribute("class", "show");
    }
    else {
      //  this.displayProperties = false;
      document.getElementById("#1").setAttribute("display", "hide");
    }

  }


  EditCustomFields(groupid: any, id: any, lst: any, index: any, groupCreated) {


    //let groupControls = this.group[groupid].controls.filter(m => ((m.picklist_options != null && m.picklist_options != "") || (m.selectlistvalues != null)) && m.display_order != lst.display_order);
    let groupControls = this.group[groupid].controls.filter(m => ((m.picklist_options != null && m.picklist_options != "") || (m.selectlistvalues != null) || (m.dt_code == "boolean")) && m.display_order != lst.display_order);

    this.index = groupid;
    this.newcontrolid = index;
    if (groupCreated == 'NewGroupCreated') {
      this.hideme[groupid + '' + index] = false;
    }
    else {
      this.hideme[groupid + '' + index] = false;
    }

    this.groupCreated = groupCreated;
   // this.welcomescreen.hide();
    this.propertiesform.show(lst, lst, index, groupCreated, groupControls);
  }
  SystemDefinedPropertyRequired(groupid: any, id: any, lst: any, index: any, event: any, groupCreated) {

    if (lst.type == 'text') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.hideme[index] = false;
        this.propertiesform.singleLineMarkRequired.setValue(event.target.checked);
        //this.newgroup[this.index].required = event.target.checked;
        this.group[groupid].controls[id].required = event.target.checked;
      } else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.singleLineMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }


    }
    else if (lst.type == 'textarea') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.propertiesform.multiLineMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.multiLineMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }

    }
    else if (lst.type == 'select') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.propertiesform.selectListMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.selectListMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }

    }
    else if (lst.type == 'int') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.propertiesform.intMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.intMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }

    }
    else if (lst.type == 'bigint') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.propertiesform.bigintMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.bigintMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else if (lst.type == 'decimal') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.decimalMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.decimalMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else if (lst.type == 'date') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.propertiesform.dateMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }

      else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.dateMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }

    else if (lst.type == 'dateTime') {
      if (groupCreated == 'NewGroupCreated') {
        ;
        this.hideme[index] = false;
        this.propertiesform.dateTimeMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        ;
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.dateTimeMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else if (lst.type == 'boolean') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.propertiesform.booleanMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.booleanMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else if (lst.type == 'checkbox') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.propertiesform.checkboxMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.checkboxMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else if (lst.type == 'radio') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.propertiesform.radioMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.radioMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.propertiesform.urlMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.propertiesform.urlMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
  }

  AddFormForCustomField() {

    if (this.manageForm.valid) {
      this.loadSave = true;

      let dat = this.group; 
      this.group.forEach((item, index) => {
        item.id = index; item.display_order = index;

        item.controls.forEach((item1, i) => {
          item1.display_order = i; if (item1.layout_type == null) {
            if (i > 0) { item1.layout_type = item.controls[i - 1].layout_type; }
          }
        })
      });
      //// console.log("newgroup", this.group);
      //this.controls.map(item => { item.system_is_required = true });
      //// console.log('this.groupthis.group', JSON.stringify(this.group));
      // this.saveLayout.push(this.group);
      this.formService.SaveLAyourData(this.group, this.moduleid, this.submoduleid, this.formMasterId).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success('Screen fields has been updated successfully.');
          //this.formIdSent.emit(this.formMasterId)
          this.welcomescreen.hide()
          setTimeout(() => { this.loadSave = false; }, 3000);
          //this.router.navigateByUrl("/user");
          // this.getcustomfielddata(this.moduleid, this.submoduleid);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }

  }
  Cancel() {
    this.welcomescreen.hide()
  }
  Removeform(index) {

    const message = `Are you sure you want to delete this section?`;
    this.dialogService.confirm('DELETE SECTION', message).subscribe(confirmed => {
      if (confirmed) {
        this.condionNewGroup = false;
        this.DemoShow = false;
        this.fieldArray.splice(index, 1);
        this.group.splice(index, 1);
        this.decrementcounter();
        this.newAttribute = {};
        this.toaster.success(`Section has been deleted successfully.`);
        //this.fieldArray[index] = [];
        // // console.log("Array", this.fieldArray);
        // // console.log("Atrt", this.newAttribute);
      }
      this.condionNewGroup = false;
      this.hidemeNewGrp[index] = false;    
    });
  }

  RemoveCustomFields(groupid: any, id: any, cntrid: any) {

    const message = `Are you sure you want to delete this field?`;
    this.dialogService.confirm('DELETE FIELD', message).subscribe(confirmed => {
      if (confirmed) {
        this.hideme[cntrid] = false;
        this.newgroup.splice(id, 1);
        //const targetIdx = this.group.find(item => item.id == id).id;
        this.group[groupid].controls.splice(id, 1);
        this.toaster.success(`Field has been deleted successfully.`);
      }
      this.hideme[cntrid] = false;
    })

  }
  RemoveCustomFieldSystemDefined(id: any, lst: any) {

    const message = `Are you sure you want to delete this field?`;
    this.dialogService.confirm('DELETE FIELD', message).subscribe(confirmed => {
      if (confirmed) {
        this.hideme[id + this.uniqueid] = false;
        this.droped.splice(id, 1);
        this.toaster.success(`Field has been deleted successfully.`);
      }
    })
  }
  OnEditorChange(event, groupId, controlIndex) {
    this.group[groupId].controls[controlIndex].default_value = event.htmlValue;
  }

  onEditorLoad(index, obj: GroupControls) {
    setTimeout(() => { this.editor[index] = obj.default_value; }, 100);
  }

  GetConditionInString(groupIndex, item: GroupControls) {
    let control = this.group[groupIndex].controls.filter(m => m.form_field_id.toString() == item.dependent_id)[0];

    let ddlOptionList = [];
    if (control.selectlistvalues) {
      ddlOptionList = control.selectlistvalues;
    }
    else if (control.picklist_options) {
      let array = control.picklist_options.split(',') as [];
      let _resultList = [];
      if (array.length > 0) {
        array.forEach((item, index) => {
          _resultList.push(JSON.parse('{"value":"' + item + '","id":"' + index + '"}'));
        });

        ddlOptionList = _resultList;
      }
    }


    let dat = ddlOptionList.filter(m => m.id == item.dependent_value);
    return "<span><strong>Condition Apply : </strong> Display only when <strong>" + control.display_name + "</strong> equals to <strong>" + dat[0].value + "</strong>.</span>";
  }

  onKey(event: any, index) {

    this.values += event.target.value + ' | ';
    this.newgroup[index].groupName = this.values;
    // // console.log("keyUp", this.newgroup);
  }
  closepopup() {
    //this.welcomescreen.show();
  }

  //@HostListener('window:scroll', ['$event'])
  //handleScroll() {
  //  ;
  //  const windowScroll = window.pageYOffset;
  //  if (windowScroll >= this.menuPosition) {
  //    this.sticky = true;
  //  } else {
  //    this.sticky = false;
  //  }
  //}
 

  getItemToParseBolean(key) {
    if (key != null && key != '') {
      return JSON.parse(key);
    }
    else {
      key = 'false';
      return JSON.parse(key);
    }

  }
  filedLists = [
    { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Text", dt_code: "text", class_name: "fa fa-file-text-o ", display_order: 0, actual_data_type: "string", id: 11, required: false, picklist_options: null, field_type: 'texteditor', default_value: '' },
    { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Single Line", dt_code: "text", class_name: "fa fa fa-ellipsis-h", display_order: 1, actual_data_type: "string", id: 1, required: false, picklist_options: null, field_type: 'textbox', default_value: '' },
    { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Multi Line", group_name: "", dt_code: "textarea", class_name: "fa fa-navicon", display_order: 2, actual_data_type: "string", data_type_name: "string", id: 2, required: false, length: 0, index: "", picklist_options: null, field_type: 'textarea', default_value: '' },
    { form_field_id: "", data_type_id: 1, sql_type: "select", name: "Select List", group_name: "", dt_code: "select", class_name: "fa fa-list", display_order: 3, actual_data_type: "select", data_type_name: "select", id: 3, required: false, length: 0, index: "", picklist_options: null, field_type: 'dropdown', default_value: '' },
    { form_field_id: "", data_type_id: 2, sql_type: "int", name: "Integer", group_name: "", dt_code: "int", class_name: "fa fa-sort-numeric-asc", display_order: 4, data_type_name: "int", actual_data_type: "int", id: 4, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '' },
    { form_field_id: "", data_type_id: 3, sql_type: "bigint", name: "Long Integer", group_name: "", dt_code: "bigint", class_name: "fa  fa-list-ol", display_order: 5, actual_data_type: "bigint", data_type_name: "bigint", id: 5, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '' },
    { form_field_id: "", data_type_id: 4, sql_type: "decimal", name: "Decimal", group_name: "", dt_code: "decimal", class_name: "fa fa fa-circle", display_order: 6, actual_data_type: "decimal", data_type_name: "decimal", id: 6, required: false, length: 0, index: "", picklist_options: null, field_type: 'decimal', default_value: '' },
    { form_field_id: "", data_type_id: 5, sql_type: "date", name: "Date", group_name: "", dt_code: "date", class_name: "fa fa-calendar-o", display_order: 7, actual_data_type: "date", data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'date', default_value: '' },
    { form_field_id: "", data_type_id: 5, sql_type: "datetime", name: "Datetime", group_name: "", dt_code: "datetime", class_name: "fa fa-calendar-o", display_order: 7, actual_data_type: "date", data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'datetime', default_value: '' },
    { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Checkbox", group_name: "", dt_code: "checkbox", class_name: "feather-check-square-o", display_order: 8, actual_data_type: "string", data_type_name: "string", id: 8, required: false, length: 0, index: "", picklist_options: null, field_type: 'checkbox', default_value: '' },
    { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Radio", group_name: "", dt_code: "radio", class_name: "fa fa-dot-circle-o", display_order: 9, data_type_name: "string", actual_data_type: "date", id: 9, required: false, length: 0, index: "", picklist_options: null, field_type: 'radioButton', default_value: '' },
    { form_field_id: "", data_type_id: 14, sql_type: "url", name: "Url", group_name: "", dt_code: "url", class_name: "fa fa-at", display_order: 10, data_type_name: "Url", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'anchor', default_value: '' },
    { form_field_id: "", data_type_id: 16, sql_type: "bit", name: "Boolean", group_name: "", dt_code: "boolean", class_name: "fa fa-at", display_order: 11, actual_data_type: "bit", data_type_name: "bit", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'boolean', default_value: '' }];
}

export class EditorDemo {

  text: string;

}    

