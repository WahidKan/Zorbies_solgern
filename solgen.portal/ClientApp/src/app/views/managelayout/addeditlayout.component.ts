import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { concat } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { LayoutService, LayoutControlModel, Container1, Widget, GroupControls, Group } from './layout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { PropertiespopupComponent } from './viewpopupwindow/propertiespopup.component';

@Component({
  selector: 'app-addeditlayout',
  templateUrl: './addeditlayout.component.html',
  styleUrls: ['./addeditlayout.component.scss']
})

export class AddeditlayoutComponent implements OnInit {
  @ViewChild('propertiesPopup', { static: false }) properties: PropertiespopupComponent;
  @ViewChild('parent', { read: ViewContainerRef,static :false }) target: ViewContainerRef;
  @ViewChild('Display', { static: false }) Display: any;
  public manageLayout: FormGroup;
  loadSave = false; 
  name = 'Angular'; 
  colors = [];
  renderer: any;
  droped = [];
  newgroup = [];
  newGrpDisplaydropDown: any;
  dragedColor = null;
  InnerData: any;
  condition = false;
  condionNewGroup = false;
  layoutPageType = 'double';
  form_field_visibility = 'No';
  DemoShow = false;
  layoutPageTypeNewGrp = 'double';
  dynamicLayoutNewSection = [];
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
  counterValue = 0;
  moduleid = "0";
  submoduleid = "0";
  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  pageTitle: any = 'Add Custom Field';
  contentHeader: object;

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  constructor(private fb: FormBuilder, private layoutService: LayoutService, private router: Router,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {

    this.addOrUpdatePermission = false;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    // console.log("this.modulePermission", this.modulePermission);
    let add = this.modulePermission.find(m => m.privilegecode == 'ManageLayoutAdd');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }

    let update = this.modulePermission.find(m => m.privilegecode == 'ManageLayoutUpdate');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode == 'ManageLayoutDelete');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

    this.addOrUpdatePermission = this.isAdd;
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
  saveLayout: LayoutControlModel[];
  dragfullgroup()
  {
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

 

  // Group by color as key to the person array
  fordragcontrol() {
    
    this.dragOperation = false;
  }
  fordragcontainer() {
 
    this.dragOperation = true;
  }
  ngOnInit() {
    this.manageLayout = new FormGroup({
      DefaultfieldName: new FormControl(),
      fieldName: new FormControl(),
      //fieldArray: Array[]
    });

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        const sid = params.get('sid');
          //   alert(id);
          //alert(sid);
        this.getcustomfielddata(id, sid);
        this.moduleid = id;
        this.submoduleid = sid;

       
      });
    this.colors = this.filedLists;
    this.InnerData = 'four';
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Custom Fields',
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
             name : 'Manage Custom Fields',
             isLink : true,
             link : '/layoutlist'
           },
           {
             name: this.pageTitle,
             isLink: false
           }
  
         ]
     };
   }

  getcustomfielddata(id,sid) {


    this.layoutService.GetCustomFieldsList(id, sid, this.companyId).subscribe((result: any) => {
      if (result) {
        this.customFiledsData = null;
        this.droped = [];
        this.controls = [];
        this.group = [];
        this.counterValue = 0;
        //this.form.setValue(null);
        this.customFiledsData = this.layoutService.customFieldsList.data;
        this.droped = this.customFiledsData;
        // console.log("droped", this.droped);
        //this.groupControl1 = this.droped;
        this.controls = this.groupBy1(this.droped, 'group_display_order');
        // console.log("this.controls", this.controls);
        //this.controls = this.droped;
        const mapped = Object.keys(this.controls).map(key => ({ type: key, value: this.controls[key] }));
        // console.log("mappedmapped", mapped);

        let i=0;
        this.controls.forEach((item, ind) => {
          this.group.push(new Group(item[0].group_display_order, item[0].group_id, item[0].group_name, item[0].group_display_name, item[0].layout_type, item[0].table_name, item[0].is_inserted, item[0].is_updated, item[0].group_display_order, mapped[i].value));
          i++;
        });
        // this.controls.map(item => { item.system_is_required = true });

        this.controls.forEach((item, ind1) => this.dynamicLayoutNewSection[ind1] = item[0].layout_type);
        

        // this.dynamicLayoutNewSection[0] = 'double';
        this.counterValue = this.group[this.group.length-1].display_order;
        // this.group.push(new Group(this.controls[0].group_display_order, this.controls[0].group_id, this.controls[0].group_name, this.controls[0].group_display_name, 0, 1, this.controls[0].display_order, this.controls));
        // console.log("this.group.push", this.group);
      }
    });

  }
  changegroup(event, index) {
    
    this.group[index].group_name = event.target.value;
    this.group[index].group_display_name = event.target.value;
    
    if (index > 0) {
      this.group[index].group_layout_type = this.group[index - 1].group_layout_type;
      this.group[index].table_name = this.group[index - 1].table_name;
    }
    this.group.forEach((item,i) => item.display_order=i);
    // console.log('this.group', this.group);
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

  dragStart(e, c) {
    // console.log("dragStart111111", c);
    this.uniqueid = this.S4();
    let temp = [];
    temp = JSON.parse(JSON.stringify(c));
    // console.log("temp", temp)
    this.dragedColor = temp;
  }
  drop(e) {
    
    if (this.dragedColor) {
      this.droped.push(this.dragedColor);
      this.dragedColor = null;
      // console.log("droped", this.droped);
    }
  }
  customFieldLayOut() {
   
    // console.log("Data", this.properties);
    if (this.properties.singleLine == true && this.groupCreated =='DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.properties.singleLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.singleLineMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.singleLineCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.singleLineNameDisplay.value;
    }
    else if (this.properties.multiLine == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.properties.multiLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.multiLineMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.multiLineCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.multiLineNameDisplay.value;
    }
    else if (this.properties.SelectList == true && this.groupCreated == 'DefaultGroupCreated') {
      
      this.group[this.index].controls[this.newcontrolid].name = this.properties.selectListLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_code = this.properties.selectDropdown.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.selectListCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.selectListMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.selectListMultiddl.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "select";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.selectListLineNameDisplay.value;
    }
    else if (this.properties.intShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.properties.intNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.intCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.intMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "int";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "int";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 2;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.intNameDisplay.value;
    }
    else if (this.properties.bigInt == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.properties.bigintNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.bigintCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.bigintMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "bigint";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "bigint";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 3;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.bigintNameDisplay.value;
      
    }
    else if (this.properties.decimalShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.properties.decimalNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.decimalCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.decimalMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "decimal";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 4;
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "decimal";
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.decimalNameDisplay.value;
    }
    else if (this.properties.dateShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.properties.dateNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.dateMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "datetime";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "date";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 5;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.dateNameDisplay.value;
    }
    else if (this.properties.booleanShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.properties.booleanNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.booleanMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "bit";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "bit";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 16;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.booleanNameDisplay.value;
    }
    else if (this.properties.checkboxShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.properties.checkboxNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.checkboxCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.checkboxMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.checkboxNameDisplay.value;
    }
    else if (this.properties.radioShow == true && this.groupCreated == 'DefaultGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.properties.radioNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.radioCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.radioMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.radioNameDisplay.value;
    }
    else if (this.properties.urlShow == true && this.groupCreated == 'DefaultGroupCreated') {
      //this.droped[this.index].name = this.properties.urlNameDisplay.value;
      //this.droped[this.index].length = this.properties.urlCharactersAllowed.value;
      //this.droped[this.index].is_required = this.properties.urlMarkRequired.value;

      this.group[this.index].controls[this.newcontrolid].name = this.properties.urlNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.urlCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.urlMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].form_field_visibility = this.properties.formfieldvisible.value;
      this.group[this.index].controls[this.newcontrolid].list_field_visibility = this.properties.listfieldvisible.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.urlNameDisplay.value;

    }

    //Dynamic group Created
    if (this.properties.singleLine == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.properties.singleLineNameDisplay.value;
      //this.newgroup[this.index].is_required = this.properties.singleLineMarkRequired.value;
      //this.newgroup[this.index].length = this.properties.singleLineCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].name = this.properties.singleLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.singleLineMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.singleLineCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.singleLineNameDisplay.value;

    } 
    else if (this.properties.multiLine == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.properties.multiLineNameDisplay.value;
      //this.newgroup[this.index].is_required = this.properties.multiLineMarkRequired.value;
      //this.newgroup[this.index].length = this.properties.multiLineCharactersAllowed.value;

      this.group[this.index].controls[this.newcontrolid].name = this.properties.multiLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.multiLineMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.multiLineCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.multiLineNameDisplay.value;
    }
    else if (this.properties.SelectList == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.properties.selectListLineNameDisplay.value;
      //this.newgroup[this.index].length = this.properties.selectListCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.properties.selectListMarkRequired.value;
      
      this.group[this.index].controls[this.newcontrolid].name = this.properties.selectListLineNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].field_code = this.properties.selectDropdown.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.selectListCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.selectListMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.selectListMultiddl.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "select";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].selectlistvalues = this.properties.selectlistvalue.value;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.selectListLineNameDisplay.value;
    }
    else if (this.properties.intShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.properties.intNameDisplay.value;
      //this.newgroup[this.index].length = this.properties.intCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.properties.intMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].name = this.properties.intNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.intCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.intMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "int";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "int";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 2;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.intNameDisplay.value;
    }
    else if (this.properties.bigInt == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.properties.bigintNameDisplay.value;
      //this.newgroup[this.index].length = this.properties.bigintCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.properties.bigintMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].name = this.properties.bigintNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.bigintCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.bigintMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "bigint";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "bigint";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 3;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.bigintNameDisplay.value;
    }
    else if (this.properties.decimalShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.properties.decimalNameDisplay.value;
      //this.newgroup[this.index].length = this.properties.decimalCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.properties.decimalMarkRequired.value;

      this.group[this.index].controls[this.newcontrolid].name = this.properties.decimalNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.decimalCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.decimalMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "decimal";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "decimal";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 4;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.decimalNameDisplay.value;
    }
    else if (this.properties.booleanShow == true && this.groupCreated == 'NewGroupCreated') {
      this.group[this.index].controls[this.newcontrolid].name = this.properties.booleanNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.booleanMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "bit";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "bit";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 16;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.booleanNameDisplay.value;
    }
    else if (this.properties.dateShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.properties.dateNameDisplay.value;
      //this.newgroup[this.index].is_required = this.properties.dateMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].name = this.properties.dateNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.dateMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "datetime";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "date";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 5;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.dateNameDisplay.value;
    }
    else if (this.properties.checkboxShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.properties.checkboxNameDisplay.value;
      //this.newgroup[this.index].length = this.properties.checkboxCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.properties.checkboxMarkRequired.value;

      this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.checkboxCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].name = this.properties.checkboxNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.checkboxMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.checkboxNameDisplay.value;
    }
    else if (this.properties.radioShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.properties.radioNameDisplay.value;
      //this.newgroup[this.index].length = this.properties.radioCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.properties.radioMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].name = this.properties.radioNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.radioCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.radioMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.radioNameDisplay.value;
    }
    else if (this.properties.urlShow == true && this.groupCreated == 'NewGroupCreated') {
      //this.newgroup[this.index].name = this.properties.urlNameDisplay.value;
      //this.newgroup[this.index].length = this.properties.urlCharactersAllowed.value;
      //this.newgroup[this.index].is_required = this.properties.urlMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].name = this.properties.urlNameDisplay.value;
      this.group[this.index].controls[this.newcontrolid].length = this.properties.urlCharactersAllowed.value;
      this.group[this.index].controls[this.newcontrolid].is_required = this.properties.urlMarkRequired.value;
      this.group[this.index].controls[this.newcontrolid].sql_type = "Url";
      this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
      this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
      this.group[this.index].controls[this.newcontrolid].display_name = this.properties.urlNameDisplay.value;
    }
    if (this.properties.formfieldvisible.value) {
      this.group[this.index].controls[this.newcontrolid].form_field_visibility = "YES";
    } else {
      this.group[this.index].controls[this.newcontrolid].form_field_visibility = "NO";
    }

    if (this.properties.listfieldvisible.value) {
      this.group[this.index].controls[this.newcontrolid].list_field_visibility = "YES";
    } else {
      this.group[this.index].controls[this.newcontrolid].list_field_visibility = "NO";
    }

    
    this.group[this.index].controls[this.newcontrolid].is_readOnly = this.properties.is_readOnly.value.toString();
    
   // this.group[this.index].controls[this.newcontrolid].list_field_visibility = this.properties.listfieldvisible.value;
    //this.colors = this.filedLists;
    //// console.log("colors", this.colors);
    //// console.log("droped", this.droped);
    //// console.log("filedLists", this.filedLists);
  }
  allowDropFunction(c:any): any {
    
    // console.log('3434', c);
  }

  dragStartGroupToGroup(e, c) {
    
    this.dragedColor = c;
    //this.dragedColor
    const index: number = this.droped.indexOf(c);
    if (index !== -1) {
      this.droped.splice(index, 1);
    }
    //this.droped.push(this.droped);
    this.dropNewGrop('',0);
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
  //    // console.log("droped", this.droped);
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

      // console.log('this.group', this.group[targetIdx].controls)
      //this.group.push(new Group(a + 1, this.controls));
     
      this.dragedColor = null;
      // console.log("newgroup", this.newgroup);
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
      // console.log("AddClass", this.renderer);
    }
  }

  toggleClassRadioButton(event: any, classs: string) {
    // console.log('event',event);
    // console.log('classs',classs);
    this.condition = false;
    this.layoutPageType = classs;

  }
  toggleClassNewGrp(event: any, classs: string,index) {
    
    if (this.condionNewGroup == false) {
      //this.layoutPageTypeNewGrp = classs;
      this.condionNewGroup = true;
      let newgrpdisplay = this.GemgarteIdWithUniwquie();
      this.newGrpDisplaydropDown = newgrpdisplay;
    } else {
      //this.layoutPageTypeNewGrp = classs;
      this.condionNewGroup  = false;
    }
  }
  toggleClassRadioButtonNew(event: any, index: any, classs: any) {
   
    // console.log(event);
    // console.log(classs);
    // console.log('IndexNumber', index);
    this.condionNewGroup = false;
    this.hidemeNewGrp[index] = false;
    this.dynamicLayoutNewSection[index] = classs;
    this.layoutPageTypeNewGrp = classs;
    this.group[index].group_layout_type=classs.replace('Columns', '');
    this.group[index].controls.forEach(items => items.layout_type = classs.replace('Columns', ''));
    // console.log("this.groupclas", this.group);
  }
  NewGrop(NewGroup: string) {
    
    if (NewGroup == 'NewGroup') {
      this.DemoShow = true;
      this.dynamicLayoutNewSection[0] = 'double';
      this.newGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
      this.fieldArray.push(this.newAttribute);

      this.group.push(new Group(this.group.length, 0, "", "","", "", 1, 0, 0, []));


      for (let data of this.fieldArray) {
        this.dynamicLayoutNewSection[1] = 'double';
        this.dynamicLayoutNewSection[2] = 'double';
        this.dynamicLayoutNewSection[3] = 'double';
        this.dynamicLayoutNewSection[4] = 'double';
      }
      this.newAttribute = {};
      
    }
  }

  DisplayProperties(event, order: string, index: number) {
    
    // console.log("ShowLL", event);
    if (this.displayProperties == false) {
      //this.displayProperties = true;
      document.getElementById("#1").setAttribute("class", "show");
    }
    else {
      //  this.displayProperties = false;
      document.getElementById("#1").setAttribute("display", "hide");
    }

  }

  
  EditCustomFields(groupid:any,id: any, lst: any, index: any,groupCreated) {

    //// console.log('groupid',groupid)
    //// console.log('id', id)
    //// console.log('lst', lst)
    //// console.log('index', index)   
    //// console.log('groupCreated', groupCreated)    
    this.index = groupid;
    this.newcontrolid = index;
    if (groupCreated == 'NewGroupCreated') {
      this.hideme[groupid + '' + index] = false;
    }
    else {
      this.hideme[groupid + '' + index] = false;
    }
    
    this.groupCreated = groupCreated;
    
    this.properties.show(lst, lst, index, groupCreated);
  }
  SystemDefinedPropertyRequired(groupid:any,id: any, lst: any, index: any, event: any, groupCreated) {
    
    if (lst.type == 'text') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.hideme[index] = false;
        this.properties.singleLineMarkRequired.setValue(event.target.checked);
        //this.newgroup[this.index].required = event.target.checked;
        this.group[groupid].controls[id].required = event.target.checked;
      } else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.singleLineMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
      
      
    }
    else if (lst.type == 'textarea') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.properties.multiLineMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.multiLineMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
      
    }
    else if (lst.type == 'select') {
     
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.properties.selectListMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.selectListMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
      
    }
    else if (lst.type == 'int') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.properties.intMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.intMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
      
    }
    else if (lst.type == 'bigint') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.properties.bigintMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.bigintMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else if (lst.type == 'decimal') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index + this.uniqueid] = false;
        this.properties.decimalMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.decimalMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else if (lst.type == 'date') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.properties.dateMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.dateMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else if (lst.type == 'boolean') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.properties.booleanMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.booleanMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else if (lst.type == 'checkbox') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.properties.checkboxMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.checkboxMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else if (lst.type == 'radio') {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.properties.radioMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.radioMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
    else {
      if (groupCreated == 'NewGroupCreated') {
        this.hideme[index] = false;
        this.properties.urlMarkRequired.setValue(event.target.checked);
        this.group[groupid].controls[id].required = event.target.checked;
      }
      else {
        this.hideme[index + this.uniqueid] = false;
        this.properties.urlMarkRequired.setValue(event.target.checked);
        this.droped[this.index].required = event.target.checked;
      }
    }
  }

  AddLayoutForCustomField() {
    if (this.manageLayout.valid) {
      this.loadSave = true;
      this.group.forEach((item, index) => {
      item.id = index; item.display_order = index;

        item.controls.forEach((item1, i) => {
        item1.display_order = i; if (item1.layout_type == null)
        {
          if (i > 0) { item1.layout_type = item.controls[i - 1].layout_type; }}
        })
      });
      // console.log("newgroup", this.group);
      //this.controls.map(item => { item.system_is_required = true });
      
      // this.saveLayout.push(this.group);
      this.layoutService.SaveLAyourData(this.group, this.moduleid, this.submoduleid).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success('Data saved successfully.');

          this.router.navigateByUrl(`layoutlist/layoutlist/${this.moduleid}`);
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
    this.router.navigateByUrl(`layoutlist`);
  }
  Removelayout(index) {
    
    const message = `Are you sure you want to delete this group?`;
    this.dialogService.confirm('Delete group', message).subscribe(confirmed => {
      if (confirmed) {
        this.condionNewGroup = false;
        this.DemoShow = false;
        this.fieldArray.splice(index, 1);
        this.group.splice(index, 1);
        this.decrementcounter();
        this.newAttribute = {};
        //this.fieldArray[index] = [];
        // console.log("Array", this.fieldArray);
        // console.log("Atrt", this.newAttribute);
      }
      this.condionNewGroup = false;
      this.hidemeNewGrp[index] = false;
    });
  }

  RemoveCustomFields(groupid:any,id: any,cntrid:any) {
    
    const message = `Are you sure you want to delete this field?`;
    this.dialogService.confirm('', message).subscribe(confirmed => {
      if (confirmed) {
        this.hideme[cntrid] = false;
        this.newgroup.splice(id, 1);
        //const targetIdx = this.group.find(item => item.id == id).id;
        this.group[groupid].controls.splice(id, 1);
      }
      this.hideme[cntrid] = false;
    })

  }
  RemoveCustomFieldSystemDefined(id: any, lst: any) {
    
    const message = `Are you sure you want to delete this field?`;
    this.dialogService.confirm('', message).subscribe(confirmed => {
      if (confirmed) {
        this.hideme[id + this.uniqueid] = false;
        this.droped.splice(id, 1);
      }
    })
  }
  onKey(event: any, index) {
    
    this.values += event.target.value + ' | ';
    this.newgroup[index].groupName = this.values;
    // console.log("keyUp", this.newgroup);
  }
  filedLists = [{
    name: "Single Line", dt_code: "text", class_name: "fa fa fa-ellipsis-h", display_order: 1, actual_data_type: "string", id: 1
    , required: false
  },
    { name: "Multi Line", group_name: "", dt_code: "textarea", class_name: "fa fa-navicon", display_order: 2, data_type_name: "string", id: 2, required: false, length: 0, index: "", picklist_options: ""},
    { name: "Select List", group_name: "", dt_code: "select", class_name: "fa fa-list", display_order: 3, data_type_name: "select", id: 3, required: false, length: 0, index: "", picklist_options: ""},
    { name: "Integer", group_name: "", dt_code: "int", class_name: "fa fa-sort-numeric-asc", display_order: 4, data_type_name: "int", id: 4, required: false, length: 0, index: "", picklist_options: "" },
    { name: "Long Integer", group_name: "", dt_code: "bigint", class_name: "fa  fa-list-ol", display_order: 5, data_type_name: "bigint", id: 5, required: false, length: 0, index: "", picklist_options: "" },
    { name: "Decimal", group_name: "", dt_code: "decimal", class_name: "fa fa fa-circle", display_order: 6, data_type_name: "decimal", id: 6, required: false, length: 0, index: "", picklist_options: "" },
    { name: "Date", group_name: "", dt_code: "date", class_name: "fa fa-calendar-o", display_order: 7, data_type_name: "date", id: 7, required: false, length: 0, index: "" },
    { name: "Checkbox", group_name: "", dt_code: "checkbox", class_name: "feather-check-square-o", display_order: 8, data_type_name: "string", id: 8, required: false, length: 0, index: "", picklist_options:"" },
    { name: "Radio", group_name: "", dt_code: "radio", class_name: "fa fa-dot-circle-o", display_order: 9, data_type_name: "string", id: 9, required: false, length: 0, index: "", picklist_options: "" },
    { name: "Url", group_name: "", dt_code: "url", class_name: "fa fa-at", display_order: 10, data_type_name: "Url", id: 10, required: false, length: 0, index: "", picklist_options: "" },
   { name: "Boolean", group_name: "", dt_code: "boolean", class_name: "fa fa-at", display_order: 11, data_type_name: "bit", id: 10, required: false, length: 0, index: "", picklist_options: "" }];
}



