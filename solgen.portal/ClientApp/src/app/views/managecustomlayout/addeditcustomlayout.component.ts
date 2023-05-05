import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CustomLayoutService, LayoutControlModel, Container1, Widget, GroupControls, Group, dataRelated, ManageCustomLayoutModel } from './managecustomlayout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { PropertiespopupCustomComponent } from './viewpopupwindowcustom/propertiespopupcustom.component';
import { ConditionPopupComponent } from './conditionpopup/conditionpopup.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserDefinedFieldsPopUpComponent } from './user-defined-fields-pop-up/user-defined-fields-pop-up.component';
declare function fixAccordianHeight(): any;


@Component({
  selector: 'app-addeditcustomlayout',
  templateUrl: './addeditcustomlayout.component.html',
  styleUrls: ['./addeditcustomlayout.component.scss']
})

export class AddeditcustomlayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('propertiesPopupcustom', { static: false }) properties: PropertiespopupCustomComponent;
  @ViewChild("UserDefinedFieldsPopUp", { static: false }) UserDefinedFieldsPopUp: UserDefinedFieldsPopUpComponent;
  @ViewChild('flowpopup', { static: false }) flowpopup: ModalDirective;
  @ViewChild('parent', { read: ViewContainerRef, static: false }) target: ViewContainerRef;
  @ViewChild('Display', { static: false }) Display: any;
  public manageLayout: FormGroup;
  loadSave = false;
  name = 'Angular';
  colors = [];
  CompactViewMain = [];
  CompactViewGroup = [];
  CompactViewFields = [];

  dropedCom = [];
  colorsSearch = [];
  renderer: any;
  droped = [];
  relation: dataRelated[] = [];
  newgroup = [];
  newGrpDisplaydropDown: any;
  relatedNewGrpDisplaydropDown: any;
  dragedColor = null;
  removeColor = null;
  dragedColorCom = null;
  removeColorCom = null;
  InnerData: any;
  condition = false;
  condionNewGroup = false;
  layoutPageType = 'four';
  form_field_visibility = 'No';
  DemoShow = false;
  layoutPageTypeNewGrp = 'four';
  dynamicLayoutNewSection = [];
  relatedDynamicLayoutNewSection = [];
  displayProperties = false;
  individualDisplay: any;
  moduleName = 'user';
  submoduleName = 'department';
  companyId: any;
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
  hidemeNewGrpTop = [];
  relatedHidemeNewGrp = [];
  counterValue = 0;
  relatedCounterValue = 0;
  view: any;
  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  pageTitle: any = 'Manage Layout';
  screenType: any;
  screenName: any;
  screenDisplayName: any;
  additionalGroups: Group[];
  GroupTop: any[] = [];
  flowAutomation = [];
  allCustomfield = [];
  flowAutomationDrop = [];
  flowIndex: any;
  flowValidation: any;
  backUpList: any[] = [];
  RelatedItemSave: Array<{ related_name: string, related_code: string, display_order: number, isVisible: number, visibility_condition: string, visibility_condition_label: string, default_value: string }> = [];

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  original_AutomationFlowName: any = null;
  editable_AutomationFlowRow: any = null;
  isEditing: boolean = false;
  flowDrop: any;
  userType: any;
  automationFlowName: any;
  constructor(private fb: FormBuilder, private managecustomlayoutService: CustomLayoutService, private router: Router,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {

  }
  dragOperation: boolean = false;
  dragRelated: boolean = false;
  dragDetail: boolean = false;
  dragTextArea: boolean = false;
  dragflow: boolean = false;
  Operators: any[] = [
    { value: "=", text: 'Equal' },
    { value: "<>", text: 'Does Not Equal' },
  ];

  containers: Array<Container1> = [
    new Container1(1, 'Container 1', [new Widget('1'), new Widget('2')]),
    new Container1(2, 'Container 2', [new Widget('3'), new Widget('4')]),
    new Container1(3, 'Container 3', [new Widget('5'), new Widget('6')])
  ];

  showUserDefinedFieldsModal() {
    this.UserDefinedFieldsPopUp.showModal();
  }


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
  relatedGroup: Array<Group> = [];
  controls: Array<GroupControls> = [];
  relatedControls: Array<GroupControls> = [];
  saveLayout: LayoutControlModel[];
  flowForm: FormGroup;

  filedLists = [
    //{ form_field_id: "", sql_type: "nvarchar", name: "Text", dt_code: "text", class_name: "fa fa-file-text-o ", display_order: 0, actual_data_type: "string", id: 11, required: false, picklist_options: null, field_type: 'texteditor', default_value: '' },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", display_name: "Single Line", name: "Single Line", dt_code: "text", class_name: "fa fa fa-ellipsis-h", display_order: 1, actual_data_type: "string", id: 1, required: false, length: 0, picklist_options: null, field_type: 'textbox', default_value: '', is_system_generated: false },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", display_name: "Multi Line", name: "Multi Line", group_name: "", dt_code: "textarea", class_name: "fa fa-navicon", display_order: 2, data_type_name: "string", id: 2, required: false, length: 0, index: "", picklist_options: null, field_type: 'textarea', default_value: '', is_system_generated: false },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "select", display_name: "Select List", name: "Select List", group_name: "", dt_code: "select", class_name: "fa fa-list", display_order: 3, data_type_name: "select", id: 3, required: false, length: 0, index: "", picklist_options: null, field_type: 'select', default_value: '', is_system_generated: false },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "int", display_name: "Integer", name: "Integer", group_name: "", dt_code: "int", class_name: "fa fa-sort-numeric-asc", display_order: 4, data_type_name: "int", id: 4, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '', is_system_generated: false },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "bigint", display_name: "Long Integer", name: "Long Integer", group_name: "", dt_code: "bigint", class_name: "fa  fa-list-ol", display_order: 5, data_type_name: "bigint", id: 5, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '', is_system_generated: false },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_daependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "decimal", display_name: "Decimal", name: "Decimal", group_name: "", dt_code: "decimal", class_name: "fa fa fa-circle", display_order: 6, data_type_name: "decimal", id: 6, required: false, length: 0, index: "", picklist_options: null, field_type: 'decimal', default_value: '', is_system_generated: false },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "date", display_name: "Date", name: "Date", group_name: "", dt_code: "date", class_name: "fa fa-calendar-o", display_order: 7, data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'date', default_value: '' },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "datetime", display_name: "Datetime", name: "Datetime", group_name: "", dt_code: "datetime", class_name: "fa fa-calendar-o", display_order: 7, data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'datetime', default_value: '', is_system_generated: false },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", display_name: "Checkbox", name: "Checkbox", group_name: "", dt_code: "checkbox", class_name: "feather-check-square-o", display_order: 8, data_type_name: "string", id: 8, required: false, length: 0, index: "", picklist_options: null, field_type: 'checkbox', default_value: '', is_system_generated: false },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", display_name: "Radio", name: "Radio", group_name: "", dt_code: "radio", class_name: "fa fa-dot-circle-o", display_order: 9, data_type_name: "string", id: 9, required: false, length: 0, index: "", picklist_options: null, field_type: 'radioButton', default_value: '', is_system_generated: false },
    { is_aync_with_object: false, is_sync_with_object_field_id: null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "bit", display_name: "Boolean", name: "Boolean", group_name: "", dt_code: "boolean", class_name: "fa fa-at", display_order: 11, data_type_name: "bit", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'boolean', default_value: '', is_system_generated: false }];


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

  LayoutType: any[] = [
    { value: "1", text: 'One Column' },
    { value: "2", text: 'Two Columns' },
  ];

  decisionList: any[] = [
    { value: 1, name: 'All Conditions Are Met (AND)' },
    { value: 2, name: 'Any Condition Is Met (OR)' }
    // { value: 3, name: 'Custom Condition Logic Is Met' }
  ];


  // Group by color as key to the person array
  fordragcontrol() {
    this.dragOperation = false;
  }
  fordragcontainer() {

    this.dragOperation = true;
  }
  ngOnInit() {
    this.loadSave = true;

    this.addOrUpdatePermission = false;
    this.modulePermission = this.commonService.getPermissiondata(this.route.snapshot.data.moduleCode);
    this.isAdd = this.commonService.listingsActionManager(this.modulePermission, 'ManageLayoutAdd');
    this.isUpdate = this.commonService.listingsActionManager(this.modulePermission, 'ManageLayoutUpdate');
    this.isDelete = this.commonService.listingsActionManager(this.modulePermission, 'ManageLayoutDelete');

    this.addOrUpdatePermission = this.isAdd;

    this.userType = this.commonService.getUserType();
    this.manageLayout = new FormGroup({
      SearchFieldName: new FormControl(),
      DefaultfieldName: new FormControl(),
      fieldName: new FormControl(),
      //fieldArray: Array[]
    });
    this.route.paramMap.subscribe(
      params => {

        this.view = 0;
        this.view = params.get('view');
        if (this.view > '0') {
          this.getcustomfielddataList();
        }
      });
    this.InnerData = 'four';
    setTimeout(() => {
      this.loadSave = false;
    }, 3000);
    this.flowForm = this.managecustomlayoutService.BuildFlowRecordComponent();
  }
  ngAfterViewInit() {

    setTimeout(() => {
    }, 1000);
  }

  processByViewNames(customViewId, customViewName_Conditional, viewName) {
    if (this.relation.filter(x => x.view_name.toLowerCase() == customViewName_Conditional).length == 0) {
      this.CompactViewMain.push({ custom_view_id: customViewId, groups: [], screen_type: 'CompactView', view_name: viewName });
    }
  }

  AddPredefinedCompactViews() {
    debugger;
    this.processByViewNames(1, 'notes', 'Notes');
    this.processByViewNames(2, 'files', 'Files');
    this.processByViewNames(3, 'appointments', 'Appointments');
    this.processByViewNames(4, 'call history', 'Call History');
    this.processByViewNames(5, 'sms history', 'Sms History');
    this.processByViewNames(6, 'video call history', 'Video Call History');
    this.processByViewNames(7, 'documents', 'Documents');

    // let notes = this.relation.filter(x => x.view_name.toLowerCase() == 'notes');
    // if (notes.length == 0) {
    //   this.CompactViewMain.push({ custom_view_id: 1, groups: [], screen_type: 'CompactView', view_name: 'Notes' });
    // }

    // let files = this.relation.filter(x => x.view_name.toLowerCase() == 'files');
    // if (files.length == 0) {
    //   this.CompactViewMain.push({ custom_view_id: 2, groups: [], screen_type: 'CompactView', view_name: 'Files' });
    // }

    // let appointment = this.relation.filter(x => x.view_name.toLowerCase() == 'appointments');
    // if (appointment.length == 0) {
    //   this.CompactViewMain.push({ custom_view_id: 3, groups: [], screen_type: 'CompactView', view_name: 'Appointments' });
    // }

    // let callHistory = this.relation.filter(x => x.view_name.toLowerCase() == 'call history');
    // if (callHistory.length == 0) {
    //   this.CompactViewMain.push({ custom_view_id: 4, groups: [], screen_type: 'CompactView', view_name: 'Call History' });
    // }
    // let smsHistory = this.relation.filter(x => x.view_name.toLowerCase() == 'sms history');
    // if (smsHistory.length == 0) {
    //   this.CompactViewMain.push({ custom_view_id: 5, groups: [], screen_type: 'CompactView', view_name: 'Sms History' });
    // }

    // let videocallHistory = this.relation.filter(x => x.view_name.toLowerCase() == 'video call history');
    // if (videocallHistory.length == 0) {
    //   this.CompactViewMain.push({ custom_view_id: 6, groups: [], screen_type: 'CompactView', view_name: 'Video Call History' });
    // }
    this.CompactViewMain.sort((a, b) => 0 - (a.view_name > b.view_name ? -1 : 1));

  }


  get SearchFieldName() { return this.manageLayout.get('SearchFieldName') }
  private GemgarteIdWithUniwquie(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  getcustomfielddataList() {
    this.managecustomlayoutService.GetCustomFieldsData(this.view, this.companyId).subscribe((result: any) => {
      if (result) {
        debugger;
        // console.log('managecustomlayoutService', this.managecustomlayoutService.customFieldsListData)

        this.controls = [];
        this.group = [];
        this.colors = [];
        this.CompactViewMain = [];

        this.droped = [];
        this.counterValue = 0;
        this.colorsSearch = [];
        this.relation = [];
        this.additionalGroups = [];
        this.flowAutomation = [];
        this.allCustomfield = [];

        this.colors = this.managecustomlayoutService.customFieldsListData.dataLeft;
        this.colorsSearch = this.managecustomlayoutService.customFieldsListData.dataLeft;
        this.droped = this.managecustomlayoutService.customFieldsListData.dataRight;
        this.relation = this.managecustomlayoutService.customFieldsListData.dataRelated;
        this.CompactViewMain = this.managecustomlayoutService.customFieldsListData.dataCompactView;
        this.screenType = this.managecustomlayoutService.customFieldsListData.screenType;
        this.screenName = this.managecustomlayoutService.customFieldsListData.screenName;
        this.screenDisplayName = this.managecustomlayoutService.customFieldsListData.screenDisplayName;
        this.moduleName = this.managecustomlayoutService.customFieldsListData.module;
        this.submoduleName = this.managecustomlayoutService.customFieldsListData.subModule;
        this.additionalGroups = this.managecustomlayoutService.customFieldsListData.AdditionalGroups;
        //Flow Automation DropDown
        this.flowAutomation = this.managecustomlayoutService.customFieldsListData.leftAutomationFlow;
        this.allCustomfield = this.managecustomlayoutService.customFieldsListData.allCostomFields;
        //Flow Automation dropped
        this.flowAutomationDrop = this.managecustomlayoutService.customFieldsListData.flowAutomationDrop;
        // console.log('Flow Automation DropDown', this.flowAutomation)
        // console.log('Flow Automation dropped',  this.flowAutomationDrop)

        if (this.relation.length != 0) {
          this.relatedNewGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
          for (var ri = this.CompactViewMain.length - 1; ri >= 0; ri--) {
            for (var rm = 0; rm < this.relation.length; rm++) {
              if (this.relation[rm].related_code == (this.CompactViewMain[ri].custom_view_id)) {
                this.CompactViewMain.splice(ri, 1);
                break;
              }
            }
          }
          this.relation.forEach(item => {
            item.visibility_condition_label = (item.visibility_condition_label) ? JSON.parse(item.visibility_condition_label) : item.visibility_condition_label;
          });
          this.AddPredefinedCompactViews();
          this.sortRelatedLayoutType();
        }
        else {
          this.AddPredefinedCompactViews();
          this.sortRelatedLayoutType();
        }
        if (this.droped.length == 0) {
          this.DemoShow = true;
          this.dynamicLayoutNewSection[0] = 'four';
          this.layoutPageTypeNewGrp = 'four';
          this.newGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
          this.fieldArray.push(this.newAttribute);
          if (this.screenType == "CompactView") {
            this.group.push(new Group(this.group.length, 0, this.screenDisplayName, "", "", "", "", 1, 0, 0, "", "", '', []));
          } else {
            this.group.push(new Group(this.group.length, 0, "", "", "", "", "", 1, 0, 0, "", "", '', []));
          }


        } else {
          this.dynamicLayoutNewSection[0] = 'four';
          this.layoutPageTypeNewGrp = 'four';
          if (this.screenType) {
            // if (this.screenType && this.screenType != "CompactView") {
            for (var ii = this.colors.length - 1; ii >= 0; ii--) { // remove left hand side fields
              for (var j = 0; j < this.droped.length; j++) {
                if (this.droped[j].custom_field_id == (this.colors[ii].custom_field_id)) {
                  this.colors.splice(ii, 1);
                  break; // add if item found it should break the for statement
                }
              }
            }
          }
          this.controls = this.groupBy1(this.droped, 'group_display_order');
          const mapped = Object.keys(this.controls).map(key => ({ type: key, value: this.controls[key] }));
          let i = 0;
          this.controls.forEach((item, ind) => {
            if (item[0].layout_type.length == 0) {
              item[0].layout_type = 'four';
            }
            let condition = (item[0].visibility_condition_label) ? JSON.parse(item[0].visibility_condition_label) : item[0].visibility_condition_label;

            this.group.push(new Group(item[0].group_display_order, item[0].group_id, item[0].group_name, item[0].group_display_name, item[0].group_layout_type, item[0].layout_type, item[0].table_name, item[0].is_inserted, item[0].is_updated, item[0].group_display_order, item[0].visibility_condition, condition, item[0].default_value, mapped[i].value));
            i++;
          });
          if (this.additionalGroups) {
            this.additionalGroups.forEach(item => {
              if (item.group_layout_type == 'textarea') {
                this.group.push(item);
              }
              else {
                ;
                this.GroupTop.push(item);
              }
            });
            this.group.sort((a, b) => (a.display_order > b.display_order) ? 1 : -1);
            this.GroupTop.sort((a, b) => (a.display_order > b.display_order) ? 1 : -1);
          }

          //this.controls.forEach((item, ind1) => {
          //  this.dynamicLayoutNewSection[ind1] = item[ind1].layout_type;
          //});
          this.counterValue = this.group[this.group.length - 1].display_order;
          // console.log("this.group", this.group);

        }
      }

      this.loadSave = false;

    }, error => { }, () => {
      setTimeout(() => {
        fixAccordianHeight();
      }, 100);

      this.loadSave = false;
    });
  };


  sortRelatedLayoutType() {
    this.relatedDynamicLayoutNewSection = []
    this.relation.forEach((element, index) => {
      if (element.groups) {
        if (element.groups.length > 0) {
          element.groups.forEach((group, i) => {
            this.relatedDynamicLayoutNewSection[index] = group.group_layout_type;
          });
        }
      }
    });
  }
  onRelatedDropSuccess(event) {
    this.sortRelatedLayoutType();
  }
  onDropSuccess(event) {
    //this.dynamicLayoutNewSection = []
    //this.controls.forEach((item, ind1) => this.dynamicLayoutNewSection[ind1] = item[ind1].layout_type);
  }
  dragEnd(e, type) {
    if (type == 'related') {
      this.dragRelated = false;
    }
    else if (type == 'text') {
      this.dragTextArea = false;
    }
    else if (type === 'detail') {
      this.dragDetail = false;
    }
    else if (type === 'flow') {
      this.dragflow = false;
    }

  }
  dropNewGrop(lst, a) {
    if (this.dragedColor) {
      if (this.dragedColor.layout_type && this.dragedColor.layout_type == 'textarea') {
        this.group.push(this.dragedColor);
        this.dragedColor = null;
      }
      else {
        if (this.screenType) {
          // if (this.screenType && this.screenType != "CompactView") {
          this.dragedColor.index = a;
          this.newgroup.push(this.dragedColor);
          this.groupControl = this.dragedColor;
          this.groupControl.system_is_required = this.groupControl.is_required;
          this.groupControl.is_system_generated = this.groupControl.is_system_generated;
          this.groupControl.is_inserted = 1;
          const targetIdx = this.group.find(item => item.id == a).id;
          this.group[targetIdx].controls.push(this.groupControl);

          this.dragedColor = null;
          this.colors.forEach((value, index) => {
            if (value.custom_field_id == this.groupControl.custom_field_id)
              this.colors.splice(index, 1);
          });
        } else {
          const targetIdx = this.group.find(item => item.id == a).id;
          let isFound = false;
          if (this.group[targetIdx].controls.length > 0) {
            this.group[targetIdx].controls.forEach((item, i) => {
              if (item.custom_field_id == this.dragedColor.custom_field_id)
                isFound = true;
              return;
            });
          }
          if (!isFound) {

            if (this.group[targetIdx].controls.length <= 40) {
              this.dragedColor.index = a;
              this.newgroup.push(this.dragedColor);
              this.groupControl = this.dragedColor;
              this.groupControl.system_is_required = this.groupControl.is_required;
              this.groupControl.is_system_generated = this.groupControl.is_system_generated;
              this.groupControl.is_inserted = 1;
              this.group[targetIdx].controls.push(this.groupControl);
              this.dragedColor = null;
            }
          }

        }
      }
    }
    this.dragDetail = false;
  }

  changegroup(event, index) {
    this.group[index].group_name = event.target.value;
    this.group[index].group_display_name = event.target.value;

    if (index > 0) {
      this.group[index].group_layout_type = this.group[index - 1].group_layout_type;
      this.group[index].table_name = this.group[index - 1].table_name;
    }
    this.group.forEach((item, i) => item.display_order = i);
  }

  NewGrop(NewGroup: string) {
    if (NewGroup == 'NewGroup') {
      this.DemoShow = true;
      this.dynamicLayoutNewSection.push('four');
      this.newGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
      this.fieldArray.push(this.newAttribute);

      this.group.push(new Group(this.group.length, 0, "", "", "four", "four", "", 1, 0, 0, "", "", '', []));

      // for (let data of this.fieldArray) {
      //   this.dynamicLayoutNewSection[1] = 'four';
      //   this.dynamicLayoutNewSection[2] = 'four';
      //   this.dynamicLayoutNewSection[3] = 'four';
      //   this.dynamicLayoutNewSection[4] = 'four';
      // }
      this.newAttribute = {};

    }
    else if (NewGroup == 'textarea') {
      this.DemoShow = true;
      this.dynamicLayoutNewSection.push('textarea');
      this.newGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
      this.fieldArray.push(this.newAttribute);

      this.group.push(new Group(this.group.length, 0, "Text Area", "Text Area", "textarea", "textarea", "", 1, 0, 0, "", "", '', []));
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
      this.condition = false;
    } else {
      // console.log("AddClass", this.renderer);
    }
  }

  onKeyup(event) {
    this.colors = [];
    let searchData = event.target.value as string;
    if (searchData) {
      searchData = searchData.toLowerCase();
      this.colors = this.colorsSearch.filter(item => {
        return item.display_name.toLowerCase().includes(searchData);
      });
    }
    else {
      this.colors = this.colorsSearch;
    }

    this.colors.forEach((value, indexColor) => {
      this.group.forEach((item, index) => {
        item.controls.forEach((item1, i) => {
          if (item1.custom_field_id == value.custom_field_id) {
            this.colors.splice(indexColor, 1);
          }
        })
      });
    });

  }






  toggleClassRadioButton(event: any, classs: string) {
    this.condition = false;
    this.layoutPageType = classs;
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
    this.condionNewGroup = false;
    this.hidemeNewGrp[index] = false;
    this.dynamicLayoutNewSection[index] = classs;
    this.layoutPageTypeNewGrp = classs;
    this.group[index].group_layout_type = classs.replace('Columns', '');
    this.group[index].controls.forEach(items => items.layout_type = classs.replace('Columns', ''));

  }
  Removelayout(index, type = null) {
    if (type === 'groupTop') {
      const message = `Are you sure you want to delete this section?`;
      this.dialogService.confirm('Delete Section', message).subscribe(confirmed => {
        if (confirmed) {

          this.condionNewGroup = false;
          this.DemoShow = false;
          this.GroupTop.splice(index, 1);
        }
        this.hidemeNewGrpTop[index] = false;
      });
    }
    else {
      const message = `Are you sure you want to delete this section?`;
      this.dialogService.confirm('Delete Section', message).subscribe(confirmed => {
        if (confirmed) {
          if (this.screenType != "CompactView") {
            if (this.group[index].controls) {
              for (var i = this.group[index].controls.length - 1; i >= 0; i--) {
                this.colors.push(this.group[index].controls[i]);
              }
              this.colors.sort(function (a, b) { return a.name > b.name ? 1 : -1; }); // sorting...
            }
          }
          this.condionNewGroup = false;
          this.DemoShow = false;
          this.fieldArray.splice(index, 1);
          this.group.splice(index, 1);
          this.decrementcounter();
          this.newAttribute = {};
          this.group.forEach((grp, index) => {
            grp.id = index;
          })
        }
        this.condionNewGroup = false;
        this.hidemeNewGrp[index] = false;
      });
    }
  }

  RemoveFlow(index, field: any) {
    ;
    const message = `Are you sure you want to delete this flow?`;
    this.dialogService.confirm('Delete Section', message).subscribe(confirmed => {
      if (confirmed) {
        this.flowAutomationDrop.splice(index, 1);

      }
    });
  }


  RemovelayoutRelated(index) {
    const message = `Are you sure you want to delete this section?`;
    this.dialogService.confirm('Delete Section', message).subscribe(confirmed => {
      if (confirmed) {
        if (this.relation[index].view_name != 'textarea') {
          this.relatedNewGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
          this.CompactViewMain.push(this.relation[index]);
          this.CompactViewMain.sort((a, b) => 0 - (a.view_name > b.view_name ? -1 : 1));
        }

        //this.CompactViewMain = this.CompactViewMain.sort((obj1, obj2) => { return obj1.view_name - obj2.view_name; });// sorting...
        this.relation.splice(index, 1);
      }
      this.relatedHidemeNewGrp[index] = false;
    });
  }
  Cancel() {
    this.router.navigateByUrl(`customlayoutlist`);
  }
  AddLayoutForCustomField() {
    debugger
    if (this.manageLayout.valid) {
      this.loadSave = true;
      console.log(this.RelatedItemSave);
      setTimeout(() => {
        this.relation.forEach((item, index) => {

          this.RelatedItemSave.push({
            related_name: item.view_name,
            related_code: (item.object_related_id) ? item.related_code : item.custom_view_id,
            display_order: index,
            isVisible: 1,
            visibility_condition: (item.visibility_condition) ? item.visibility_condition : null,
            visibility_condition_label: (item.visibility_condition_label) ? JSON.stringify(item.visibility_condition_label) : null,
            default_value: item.default_value
          });
        });


        this.group.filter(x => x.visibility_condition_label = (x.visibility_condition_label) ? JSON.stringify(x.visibility_condition_label) : null);

        this.group.forEach((item, index) => {
          item.id = index; item.display_order = index;
          if (item.controls) {
            item.controls.forEach((item1, i) => {
              item1.display_order = i; if (item1.layout_type == null) {
                if (i > 0) { item1.layout_type = item.controls[i - 1].layout_type; }
              }
            })
          }
        });

        this.GroupTop.forEach((item, index) => {
          item.id = index; item.display_order = index;

          let _data = item as Group;
          this.group.push(_data);
        });


        var postData: ManageCustomLayoutModel = new ManageCustomLayoutModel();
        postData.group = this.group;
        postData.relation = JSON.stringify(this.RelatedItemSave);
        postData.view = this.view
        postData.flowAutomation = JSON.stringify(this.flowAutomationDrop);

        this.managecustomlayoutService.SaveCustomLayoutData(postData).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success('Data saved successfully.');
            this.router.navigateByUrl(`customlayoutlist`);
            setTimeout(() => { this.loadSave = false; }, 3000);
          }
          else {
            this.loadSave = false;
            this.toaster.error(result.responseMessage);
          }
        }, error => {
          this.loadSave = false;
        });


      }, 100);
    }
  };


  onChangeMainCheckbox(event, s) {
    const checked = event.target.checked;
    s.isVisible = checked;
  }
  //#region   Compact View
  dropNewGropCom(lst, a) {
    debugger
    if (this.dragedColorCom) {
      this.dragedColorCom.index = a;
      this.newgroup.push(this.dragedColorCom);
      this.groupControl = this.dragedColorCom;
      this.groupControl.system_is_required = this.groupControl.is_required;
      this.groupControl.is_system_generated = this.groupControl.is_system_generated;
      this.groupControl.is_inserted = 1;
      const targetIdx = this.group.find(item => item.id == a).id;
      this.group[targetIdx].controls.push(this.groupControl);

      this.dragedColor = null;

      this.colors.forEach((value, index) => {
        if (value.custom_field_id == this.groupControl.custom_field_id)
          this.colors.splice(index, 1);
      });
    }
  }
  dragStartCompact(c, type) {
    if (type == "Add") {
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


  dragEndCom(e) {
  }

  dropCom(e) {
    debugger
    if (this.dragedColorCom) {
      this.dropedCom.push(this.dragedColorCom);
      this.dragedColorCom = null;
    }
  }

  onChangeCompactView(view) {
    this.relation.push(view);
    this.CompactViewMain.slice()
    this.CompactViewMain.forEach((value, index) => {
      if (value.custom_view_id == view.custom_view_id)
        this.CompactViewMain.splice(index, 1);
    });

    // s.isVisible = checked;
  }

  //#endregion

  dropType: string = ''
  dragStart(e, c, type) {
    // ;
    this.hideme = [];
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
    if (type == 'text') {
      this.dragTextArea = true;
      this.dragedColor = new Group(this.group.length, 0, "Text Area", "Text Area", "textarea", "textarea", "", 1, 0, 0, "", "", '', [])
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
  flowAutomationitem = []

  drop(e, type = null) {
    ;
    if (this.dragedColor && !type) {
      this.droped.push(this.dragedColor);
    }
    else if (type == 'textAreaTop') {
      this.dragedColor.layout_type = type;
      this.dragedColor.group_layout_type = type;
      this.GroupTop.push(this.dragedColor);
      this.dragTextArea = false;
    }
    else if (type == 'flow') {
      ;
      this.flowForm = this.managecustomlayoutService.BuildFlowRecordComponent();
      this.flowAutomationDrop.push({
        id: null,
        automationFlowName: '',
        automationFlowId: '',
        customViewId: '',
        subModuleId: '',
        moduleId: '',
        companyId: '',
        displayOrder: '',
        statusId: '',
        isVisible: '',
        flowlayoutType: '',
        filterConditions: [],
        visibilityCondition: '',
        recordType: '',
      });

      if (this.flowAutomationDrop.length > 0) {
        this.flowIndex = this.flowAutomationDrop.length - 1;
        //this.flowAutomation
        //this.flowAutomation
        this.flowAutomationitem = this.flowAutomation.filter(x => !(this.flowAutomationDrop.filter(y => y.automationFlowId == x.id).length > 0))
      }
      else {
        this.flowIndex = 0;
      }
      this.dragflow = false;
      this.flowpopup.show();
    }

    this.dragedColor = null;
    this.isEditing = false;
  }

  close() {
    ;
    if (this.flowAutomationDrop[this.flowIndex].automationFlowName == '') {
      this.flowAutomationDrop.splice(this.flowIndex, 1);
    }
    this.flowpopup.hide();
  }

  OpenFlowPopup(index, field) {

    this.isEditing = true;
    this.original_AutomationFlowName = field.automationFlowName;
    this.editable_AutomationFlowRow = field;
    this.flowpopup.show();
    var selectFlow = this.flowAutomationDrop[index];
    this.flowIndex = index;
    this.flowForm = this.managecustomlayoutService.BuildFlowRecordComponent(selectFlow);

  }



  // SubmitFlow() {
  //
  //   if(this.flowAutomationDrop.find(x => x.automationFlowName == this.original_AutomationFlowName && this.flowAutomationDrop[this.flowIndex] != this.editable_AutomationFlowRow[this.flowIndex] ))
  //   {
  //     var form = this.flowForm.value;
  //     var flowDrop = this.flowAutomationDrop[this.flowIndex];
  //     var flow = this.flowAutomation.find(x => x.id == form.flowName);
  //     if(!this.isEditing && this.flowAutomationDrop.find(x => x.automationFlowName == flowDrop.automationFlowName && this.flowAutomationDrop[this.flowIndex] != this.editable_AutomationFlowRow[this.flowIndex]))
  //     {
  //       this.toaster.error("This flow is already exist in this layout.");
  //     }
  //     else
  //     {
  //       if(!this.isEditing && !this.flowAutomationDrop.find(x => x.automationFlowName == flowDrop.automationFlowName))
  //       {
  //         this.passFlowData(flowDrop, form, flow);
  //       }
  //       else if(this.isEditing && !this.flowAutomationDrop.find(x => x.automationFlowName == flowDrop.automationFlowName))
  //       {
  //         this.passFlowData(flowDrop, form, flow);
  //       }
  //       else
  //       {
  //         flow.automationFlowName = this.automationFlowName;
  //         this.passFlowData(flowDrop, form, flow);
  //       }
  //     }
  //   }
  //   else if(this.isEditing)
  //   {
  //     this.flowAutomationDrop[this.flowIndex] = this.flowForm;

  //     this.isEditing = false;
  //     this.editable_AutomationFlowRow = null;
  //     this.original_AutomationFlowName = null;
  //   }
  //   else
  //   {
  //     var form = this.flowForm.value;
  //     if(this.flowForm.valid){
  //     var flowDrop = this.flowAutomationDrop[this.flowIndex];
  //     var flow = this.flowAutomation.find(x => x.id == form.flowName);
  //     ;
  //       // console.log(flowDrop);

  //     if(flowDrop.id == 0 || flowDrop.id==null || flowDrop.id== undefined){
  //       var ExistedRecords=this.flowAutomationDrop.filter(x => x.automationFlowName == flow.name).length;
  //       if(ExistedRecords >= 1){
  //         this.toaster.error("This flow is already added in this layout.");
  //       }else{
  //         this.passFlowData(flowDrop, form, flow);
  //       }
  //     }
  //     }
  //     else
  //     {
  //       this.commonService.validateAllFormFields(this.flowForm);
  //     }
  //   }
  // }

  passFlowData(flowDrop, form, flow) {

    flowDrop.flowlayoutType = form.flowlayoutType;
    flowDrop.filterConditions = JSON.parse(JSON.stringify(form.filterConditions));
    flowDrop.automationFlowId = flow.id;
    flowDrop.automationFlowName = flow.name;
    flowDrop.moduleId = flow.moduleId;
    flowDrop.subModuleId = flow.subModuleId;
    flowDrop.customViewId = this.view;
    flowDrop.statusId = flow.statusId;
    flowDrop.visibilityCondition = form.visibilityCondition;
    this.flowpopup.hide();
  }

  changeFieldIDValue(object) {
    this.automationFlowName = object.name
  }
  SubmitFlow() {
    debugger
    var form = this.flowForm.value;
    if (this.flowForm.valid) {
      var selectFlow = this.flowAutomationDrop[this.flowIndex];
      var flow = this.flowAutomation.find(x => x.id == form.flowName);
      selectFlow.flowlayoutType = form.flowlayoutType;
      selectFlow.filterConditions = JSON.parse(JSON.stringify(form.filterConditions));
      selectFlow.automationFlowId = flow.id;
      selectFlow.automationFlowName = flow.name;
      selectFlow.moduleId = flow.moduleId;
      selectFlow.subModuleId = flow.subModuleId;
      selectFlow.customViewId = this.view;
      selectFlow.statusId = flow.statusId;
      selectFlow.visibilityCondition = form.visibilityCondition;
      // this.flowAutomationDrop[this.flowIndex].filterConditions = JSON.parse(JSON.stringify(flow.filterConditions));
      this.flowpopup.hide();
    }
    else {
      this.commonService.validateAllFormFields(this.flowForm);
    }
  }



  dropRemove(lst) {
    if (this.removeColor) {
      this.colors.push(this.removeColor);
      this.removeColor = null;
    }
  }
  RemoveCustomFields(groupid: any, id: any, cntrid: any, fieldDetail: any) {
    this.hideme[cntrid] = false;
    this.newgroup.splice(id, 1);
    this.group[groupid].controls.splice(id, 1);
    if (this.screenType && this.screenType != "CompactView") {
      this.colors.push(fieldDetail);
      this.colors.sort(function (a, b) { return a.name > b.name ? 1 : -1; });
    }
  }
  EditCustomFields(groupid: any, id: any, lst: any, index: any, groupCreated) {
    debugger
    this.index = groupid;
    this.newcontrolid = index;
    if (groupCreated == 'NewGroupCreated') {
      this.hideme[groupid + '' + index] = false;
    }
    else {
      this.hideme[groupid + '' + index] = false;
    }

    this.groupCreated = groupCreated;
    this.properties.show(lst, lst, index, groupCreated, this.screenType);
  }

  customFieldLayOut() {
    //this.group[this.index].controls[this.newcontrolid].display_name = this.properties.fieldName;
    //this.group[this.index].controls[this.newcontrolid].is_required = this.properties.is_Required.value.toString();
    //this.group[this.index].controls[this.newcontrolid].is_readOnly = this.properties.is_readOnly.value.toString();
    if (this.properties.singleLine == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.singleLineNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.singleLineMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].dt_code = 'textbox'; // use this param for required
      this.group[this.index].controls[this.newcontrolid].field_code = 'textbox';
    }
    else if (this.properties.multiLine == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.multiLineNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.multiLineMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].dt_code = 'textarea'; // use this param for required
      this.group[this.index].controls[this.newcontrolid].field_code = 'textarea';
    }
    else if (this.properties.SelectList == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.selectListLineNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.selectListMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].picklist_options = JSON.stringify(this.properties.selectlistvalue.value); // use this param for picklist options
      this.group[this.index].controls[this.newcontrolid].dt_code = 'select';
      //      control['dropdown'] = 'textarea';
    }
    else if (this.properties.intShow == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.intNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.intMarkRequired.value; // use this param for required
      //control['dropdown'] = 'int';
      this.group[this.index].controls[this.newcontrolid].dt_code = 'int';
    }
    else if (this.properties.bigInt == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.bigintNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.bigintMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].dt_code = 'bigint';
      this.group[this.index].controls[this.newcontrolid].field_code = 'bigint';
    }
    else if (this.properties.decimalShow == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.decimalNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.decimalMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].field_code = 'decimal';
      this.group[this.index].controls[this.newcontrolid].dt_code = 'decimal';
    }
    else if (this.properties.dateShow == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.dateNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.dateMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].dt_code = 'date';
      this.group[this.index].controls[this.newcontrolid].field_code = 'date';

    }
    else if (this.properties.dateTimeShow == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.dateNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.dateMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].dt_code = 'datetime';
      this.group[this.index].controls[this.newcontrolid].field_code = 'datetime';

    }
    else if (this.properties.booleanShow == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.booleanNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.booleanMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].field_code = 'boolean';
      this.group[this.index].controls[this.newcontrolid].dt_code = 'boolean';
    }
    else if (this.properties.checkboxShow == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.checkboxNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.checkboxMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.checkboxCharactersAllowed.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].dt_code = 'checkbox';
      this.group[this.index].controls[this.newcontrolid].field_code = 'checkbox';

    }
    else if (this.properties.radioShow == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.radioNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.radioMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.radioCharactersAllowed.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].field_code = 'radio';
      this.group[this.index].controls[this.newcontrolid].dt_code = 'radio';
    }
    else if (this.properties.imageShow == true) {
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.urlNameDisplay.value; // use this param for question
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.urlMarkRequired.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.urlCharactersAllowed.value; // use this param for required
      this.group[this.index].controls[this.newcontrolid].dt_code = 'image';
      this.group[this.index].controls[this.newcontrolid].field_code = 'image';
    }

  }

  @ViewChild('templateFilterView', { static: false }) conditionModal: ConditionPopupComponent;
  listFiltertext = '';
  selectedIndex = 0;


  layout_type: string = 'detailView';
  OpenConditionPopup(condition, evt, type) {
    this.layout_type = type;
    this.selectedIndex = evt;

    this.conditionModal.show(condition, this.companyId, (condition) ? condition.length : 0);
  }
  RemoveCondition(index, type) {
    if (type === "detailView") {
      this.group[index].visibility_condition = null;
      this.group[index].visibility_condition_label = null;
    }
    else if (type === "groupTop") {
      this.GroupTop[index].visibility_condition = null;
      this.GroupTop[index].visibility_condition_label = null;
    }
    else {
      this.relation[index].visibility_condition = null;
      this.relation[index].visibility_condition_label = null;
    }
  }

  ApplyAdvanceFilter(event) {
    if (event) {
      if (this.layout_type === "detailView") {
        this.group[this.selectedIndex].visibility_condition = event.customWhereCondition;
        this.group[this.selectedIndex].visibility_condition_label = JSON.stringify(event.conditionJson);
        this.hidemeNewGrp = [];
      }
      else if (this.layout_type === "groupTop") {
        this.GroupTop[this.selectedIndex].visibility_condition = event.customWhereCondition;
        this.GroupTop[this.selectedIndex].visibility_condition_label = JSON.stringify(event.conditionJson);
        this.hidemeNewGrpTop = [];
      }
      else {
        this.relation[this.selectedIndex].visibility_condition = event.customWhereCondition;
        this.relation[this.selectedIndex].visibility_condition_label = JSON.stringify(event.conditionJson);
        this.relatedHidemeNewGrp = [];
      }
    }
    else {
      this.hidemeNewGrp = [];
      this.hidemeNewGrpTop = [];
      this.relatedHidemeNewGrp = [];
    }
  }

  dropTextArea(event, type) {
    if (this.dropType == 'text') {
      this.dragTextArea = false;
      this.relation.push({
        object_related_id: 0,
        custom_view_id: '0',
        view_name: 'textarea',
        related_code: '',
        groups: [],
        visibility_condition: '',
        visibility_condition_label: '',
        default_value: ''
      });
    }
    else {
      this.dragedColorCom.view_name = this.dragedColorCom.DisplayName;

      this.dragRelated = false;
      this.relation.push(this.dragedColorCom);
      this.CompactViewMain.slice()
      this.CompactViewMain.forEach((value, index) => {
        if (value.custom_view_id == this.dragedColorCom.custom_view_id)
          this.CompactViewMain.splice(index, 1);
      });
      this.dragedColorCom = null;

    }
  }

  OnKeyUp(evt, index, type) {
    if (type == 'group') {
      this.group[index].default_value = evt.target.value;
    }
    else if (type == 'related') {
      this.relation[index].default_value = evt.target.value;
    }
    else if (type === 'groupTop') {
      this.GroupTop[index].default_value = evt.target.value;
    }
  }
  onChangeRelatedTabName(evt, index) {
    this.relation[index].view_name = evt.target.value;
  }


  onLayoutTypeChage($event) {

    this.flowAutomationDrop[this.flowIndex] = $event;
  }


  get filterConditions() {
    return this.flowForm.get('filterConditions') as FormArray;
  }

  get Name() { return this.flowForm.get('flowName'); }

  deleteCondition(index) {
    this.filterConditions.removeAt(index);
  }
  addNewCondition() {
    this.filterConditions.push(this.managecustomlayoutService.BuildflowFilterConditions());
  }

}



// export  class FlowForDDl{

//     id: number
//     name: string
//     moduleId: number
//     subModuleId: number
//     statusId: number
//     createdBy:string
//     createdOn: string
//     modifiedBy:string
//     modifiedOn: string
//     companyId:number
//     description: string
//     FlowType: string
//   runCondition: number
  // FlowForDDl(id,name,moduleId,subModuleId,statusId,createdBy,createdOn,modifiedBy,modifiedOn,companyId, description,FlowType, runCondition){
  //   this.id=id;
  //   this.name=name;
  //   this.moduleId=moduleId;
  //   this.subModuleId=subModuleId;
  //   this.statusId=statusId;
  //   this.createdBy=createdBy;
  //   this.createdOn=createdOn;
  //   this.companyId=companyId;
  //   this.modifiedOn=modifiedOn;
  //   this.modifiedBy=modifiedBy;
  //   this.description=description;
  //   this.FlowType=FlowType;
  //   this.runCondition=runCondition;
  // }


//}
