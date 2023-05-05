import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debug } from 'console';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CustomLayoutService } from '../managecustomlayout.service';
import { PropertiespopupCustomComponent } from '../viewpopupwindowcustom/propertiespopupcustom.component';

@Component({
  selector: 'app-user-defined-fields-pop-up',
  templateUrl: './user-defined-fields-pop-up.component.html',
  styleUrls: ['./user-defined-fields-pop-up.component.scss']
})
export class UserDefinedFieldsPopUpComponent implements OnInit {

  @ViewChild('FieldsModal', { static: false }) FieldsModal: ModalDirective;
  @ViewChild('propertiesPopupcustom', { static: false }) properties: PropertiespopupCustomComponent;
  @Input() viewId: number;


  dragDetail: boolean = false;
  uniqueid: any;
  dragedColor = null;
  removeColor = null;
  dragRelated: boolean = false;
  dragTextArea: boolean = false;
  dragflow: boolean = false;
  dragedColorCom:any=null;
  removeColorCom:any=null;
  isEditing: boolean = false;
  group:any;
  hideme:boolean=false;
  UserDefinedControl:any;
  screenType: any;


  constructor(private managecustomlayoutService: CustomLayoutService, private toaster: ToastrService,private router: Router) { }

  ngOnInit() {
  }

  filedLists = [
    //{ form_field_id: "", sql_type: "nvarchar", name: "Text", dt_code: "text", class_name: "fa fa-file-text-o ", display_order: 0, actual_data_type: "string", id: 11, required: false, picklist_options: null, field_type: 'texteditor', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar",display_name:"Single Line", name: "Single Line", dt_code: "text", class_name: "fa fa fa-ellipsis-h", display_order: 1, actual_data_type: "string", id: 1, required: false, length: 0, picklist_options: null, field_type: 'textbox', default_value: '',is_system_generated:false},
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar",display_name:"Multi Line", name: "Multi Line", group_name: "", dt_code: "textarea", class_name: "fa fa-navicon", display_order: 2, data_type_name: "string", id: 2, required: false, length: 0, index: "", picklist_options: null, field_type: 'textarea', default_value: '',is_system_generated:false },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "select", display_name:"Select List",name: "Select List", group_name: "", dt_code: "select", class_name: "fa fa-list", display_order: 3, data_type_name: "select", id: 3, required: false, length: 0, index: "", picklist_options: null, field_type: 'select', default_value: '',is_system_generated:false },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "int", display_name:"Integer",name: "Integer", group_name: "", dt_code: "int", class_name: "fa fa-sort-numeric-asc", display_order: 4, data_type_name: "int", id: 4, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '' ,is_system_generated:false},
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "bigint",display_name:"Long Integer", name: "Long Integer", group_name: "", dt_code: "bigint", class_name: "fa  fa-list-ol", display_order: 5, data_type_name: "bigint", id: 5, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '' ,is_system_generated:false},
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_daependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "decimal", display_name:"Decimal",name: "Decimal", group_name: "", dt_code: "decimal", class_name: "fa fa fa-circle", display_order: 6, data_type_name: "decimal", id: 6, required: false, length: 0, index: "", picklist_options: null, field_type: 'decimal', default_value: '' ,is_system_generated:false},
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "date", display_name:"Date",name: "Date", group_name: "", dt_code: "date", class_name: "fa fa-calendar-o", display_order: 7, data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'date', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "datetime",display_name:"Datetime", name: "Datetime", group_name: "", dt_code: "datetime", class_name: "fa fa-calendar-o", display_order: 7, data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'datetime', default_value: '',is_system_generated:false },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", display_name:"Checkbox",name: "Checkbox", group_name: "", dt_code: "checkbox", class_name: "feather-check-square-o", display_order: 8, data_type_name: "string", id: 8, required: false, length: 0, index: "", picklist_options: null, field_type: 'checkbox', default_value: '',is_system_generated:false },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar",display_name:"Radio", name: "Radio", group_name: "", dt_code: "radio", class_name: "fa fa-dot-circle-o", display_order: 9, data_type_name: "string", id: 9, required: false, length: 0, index: "", picklist_options: null, field_type: 'radioButton', default_value: '' ,is_system_generated:false},
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "bit", display_name:"Boolean",name: "Boolean", group_name: "", dt_code: "boolean", class_name: "fa fa-at", display_order: 11, data_type_name: "bit", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'boolean', default_value: '' ,is_system_generated:false}];


    dropType: string = ''
    dragStart(e, c, type){
      this.dropType = type;
      if (type == "Add") {
        this.uniqueid = c.custom_field_id;
        let temp = [];
        temp = JSON.parse(JSON.stringify(c));
        this.dragedColor = temp;
        this.dragDetail = true;
      }
      this.dropType = type;
      if (type == "CustomField") {
        this.uniqueid = c.custom_field_id;
        let temp = [];
        temp = JSON.parse(JSON.stringify(c));
        this.dragedColor = temp;
        this.dragDetail = true;
      }
      if (type == "Remove") {
        this.uniqueid = c.custom_field_id;
        let temp = [];
        temp = JSON.parse(JSON.stringify(c));
        this.removeColor = temp;
      }
      if (type == 'related') {
        this.dragRelated = true;
        this.dragStartCompact(c, 'Add');
        // this.dragedColor = new Group(this.group.length, 0, "Text Area", "Text Area", "textarea", "textarea", "", 1, 0, 0, "", "", '', [])
      }

      if (type == 'flow') {
        this.dragflow = true;
        //sthis.flowAutomationDrop  = new Group(this.group.length, 0, "Text Area", "Text Area", "textarea", "textarea", "", 1, 0, 0, "", "",'', [])

        // this.dragedColor = new Group(this.group.length, 0, "Text Area", "Text Area", "textarea", "textarea", "", 1, 0, 0, "", "", '', [])
      }

     this.isEditing = false;

    }

    OnKeyUp(){

    }

    dragEnd(e, type){
      if (type == 'related') {
        this.dragRelated = false;
      }
      else if (type == 'text') {
        this.dragTextArea = false;
      }
      else if (type === 'detail') {
        this.dragDetail = false;
        // if (type) {
        //   this.UserDefinedControl =   this.dragedColor;
        //   }
      }
      else if (type === 'flow') {
        this.dragflow = false;
      }

    }


fordragcontrol(){

}

    dragStartCompact(c, type) {
      if (type == "Add") {
        this.screenType = type;
        this.uniqueid = c.custom_view_id;
        let temp = [];
        temp = JSON.parse(JSON.stringify(c));
        this.dragedColorCom = temp;
        // console.log("add new compatact view data", this.dragedColorCom);
      }
      if (type == "Remove") {
        this.uniqueid = c.custom_view_id;
        let temp = [];
        temp = JSON.parse(JSON.stringify(c));
        this.removeColorCom = temp;
      }
    }

    drop(){
      debugger;
    }

    dropNewGrop(event){

      debugger
      this.dragDetail = false;
        this.UserDefinedControl =   this.dragedColor;

    }

    fordragcontainer(){

    }

    changegroup(){

    }



    EditCustomFields(){
    this.hideme=false;
    this.properties.show(this.UserDefinedControl, null, null, null, this.screenType);
    }

    RemoveCustomFields(){
      this.hideme=false
      this.UserDefinedControl=null;
    }


    dragOperation:any=true;

  showModal(){
    this.UserDefinedControl=null;
    this.FieldsModal.show();
  }

  closeModal(){
    this.UserDefinedControl=null;
    this.hideme=false
    this.FieldsModal.hide();
  }

  save(){
    debugger;
    this.managecustomlayoutService.SaveUserDefinedCustomField(this.viewId,this.UserDefinedControl).subscribe(
      (res: any) => {
        debugger
        if (res.statusCode == 200) {
          debugger

          this.FieldsModal.hide();
          this.toaster.success('Field created successfully.');
          window.top.location.reload()

        }
        else {

          this.toaster.error(res.responseMessage);
        }
      });
  }


  customFieldLayOut() {
    //this.group[this.index].controls[this.newcontrolid].display_name = this.properties.fieldName;
    //this.group[this.index].controls[this.newcontrolid].is_required = this.properties.is_Required.value.toString();
    //this.group[this.index].controls[this.newcontrolid].is_readOnly = this.properties.is_readOnly.value.toString();
    if (this.properties.singleLine == true) {
      this.UserDefinedControl.display_name = this.properties.singleLineNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.singleLineMarkRequired.value; // use this param for required
      this.UserDefinedControl.dt_code = 'textbox'; // use this param for required
      this.UserDefinedControl.field_code = 'textbox';
    }
    else if (this.properties.multiLine == true) {
      this.UserDefinedControl.display_name= this.properties.multiLineNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.multiLineMarkRequired.value; // use this param for required
      this.UserDefinedControl.dt_code = 'textarea'; // use this param for required
      this.UserDefinedControl.field_code = 'textarea';
    }
    else if (this.properties.SelectList == true) {
      this.UserDefinedControl.display_name = this.properties.selectListLineNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.selectListMarkRequired.value; // use this param for required
      this.UserDefinedControl.picklist_options = JSON.stringify(this.properties.selectlistvalue.value); // use this param for picklist options
      this.UserDefinedControl.dt_code = 'select';
//      control['dropdown'] = 'textarea';
    }
    else if (this.properties.intShow == true) {
      this.UserDefinedControl.display_name = this.properties.intNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required= this.properties.intMarkRequired.value; // use this param for required
      //control['dropdown'] = 'int';
      this.UserDefinedControl.dt_code = 'int';
    }
    else if (this.properties.bigInt == true) {
      this.UserDefinedControl.display_name = this.properties.bigintNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.bigintMarkRequired.value; // use this param for required
      this.UserDefinedControl.dt_code = 'bigint';
      this.UserDefinedControl.field_code = 'bigint';
    }
    else if (this.properties.decimalShow == true) {
      this.UserDefinedControl.display_name = this.properties.decimalNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.decimalMarkRequired.value; // use this param for required
      this.UserDefinedControl.field_code = 'decimal';
      this.UserDefinedControl.dt_code = 'decimal';
    }
    else if (this.properties.dateShow == true) {
      this.UserDefinedControl.display_name = this.properties.dateNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.dateMarkRequired.value; // use this param for required
      this.UserDefinedControl.dt_code = 'date';
      this.UserDefinedControl.field_code = 'date';

    }
    else if (this.properties.dateTimeShow == true) {
      this.UserDefinedControl.display_name = this.properties.dateNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.dateMarkRequired.value; // use this param for required
      this.UserDefinedControl.dt_code = 'datetime';
      this.UserDefinedControl.field_code = 'datetime';

    }
    else if (this.properties.booleanShow == true) {
      this.UserDefinedControl.display_name = this.properties.booleanNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.booleanMarkRequired.value; // use this param for required
      this.UserDefinedControl.field_code = 'boolean';
      this.UserDefinedControl.dt_code = 'boolean';
    }
    else if (this.properties.checkboxShow == true) {
      this.UserDefinedControl.display_name = this.properties.checkboxNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.checkboxMarkRequired.value; // use this param for required
      this.UserDefinedControl.picklist_options = this.properties.checkboxCharactersAllowed.value; // use this param for required
      this.UserDefinedControl.dt_code = 'checkbox';
      this.UserDefinedControl.field_code = 'checkbox';

    }
    else if (this.properties.radioShow == true) {
      this.UserDefinedControl.display_name = this.properties.radioNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.radioMarkRequired.value; // use this param for required
      this.UserDefinedControl.picklist_options = this.properties.radioCharactersAllowed.value; // use this param for required
      this.UserDefinedControl.field_code = 'radio';
      this.UserDefinedControl.dt_code = 'radio';
    }
    else if (this.properties.imageShow == true) {
      this.UserDefinedControl.display_name = this.properties.urlNameDisplay.value; // use this param for question
      this.UserDefinedControl.is_required = this.properties.urlMarkRequired.value; // use this param for required
      this.UserDefinedControl.picklist_options = this.properties.urlCharactersAllowed.value; // use this param for required
      this.UserDefinedControl.dt_code = 'image';
      this.UserDefinedControl.field_code = 'image';
    }

  }

}
