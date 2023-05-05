import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter, Input } from '@angular/core';
import { PropertiespopupformComponent } from '../../manageform/viewpopupwindowform/propertiespopupform.component';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { FormService, Container1, Widget, GroupControls, Group, FormControlModel } from '../../manageform/form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ModalDirective } from 'ngx-bootstrap';
import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';
import { ScreenpropertypopupComponent } from '../../shared/welcomescreen/screenpropertypopup.component';
import { decisonOperatorList, FlowBuilderService } from '../flow-builder.service';
import { ComponentVisiblityConditionComponent } from '../component-visiblity-condition/component-visiblity-condition.component';
import { any } from 'underscore';
import { ComingSoonComponent } from '../../comingsoon/comingsoon.component';


@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  @ViewChild('propertiesform', { static: false }) propertiesform: ScreenpropertypopupComponent;
  @ViewChild('parent', { read: ViewContainerRef, static: false }) target: ViewContainerRef;
  @ViewChild('Display', { static: false }) Display: any;
  @ViewChild('visiblityConditionModal', { static: false }) visiblityConditionModal: ModalDirective;
  @ViewChild('modal', { static: false }) screen: ModalDirective;
  // @ViewChild('propertiesModal', { static: false }) propertiesModal: ComponentVisiblityConditionComponent;
  @ViewChild("myckeditor", { static: false }) ckeditor: any;

  @Input() form: FormGroup;
  nodeId: string;
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
  customFieldsSearch: any = [];
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
  booleanValue: boolean = true;
  newcontrolid: any;
  //containers = [];
  dataIndex: any;
  groupCreated: any;
  ckeConfig: any;
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
  displayList: any = [
    { value: 1, text: "Always" },
    { value: 2, text: "All Conditions Are Met(AND)" },
    { value: 3, text: "All Conditions Are Met(OR)" }
  ];
  displayConditionValue: any = null;
  dataTypeList: any = [
    { value: "number", text: "number" },
    { value: "text", text: "text" }

  ]
  readOnlyList: any = [
    { value: 1, text: "true" },
    { value: 2, text: "false" },

  ]
  componentTypes: any = [
    { value: "pickList", text: "PickList" },
    { value: "radioButtons", text: "Radio Buttons" }
  ];
  
  pageTitle = "";
  editScreenId: number = 0;
  customCompnentValues: any[] = [];
  customFieldList: any[] = [];
  groupName: any[] = [];
  formControlList: any[] = [];
  groupNamedata: any[] = [];
  groupTables: any = [];
  timeFormat: string;
  editor: any = [];
  valueList: any = [];
  isCompanyTypeFinancialInstitute: boolean = false;
  userInfo: any[] = [];
  companyType: any;
  selectedControls: GroupControls;
  variableList: any;
  conditionValueList: any;
  visibltyConditionForm: FormGroup;
  controlProperties: FormArray;
  controlVisibl: any = null;
  controlArrayIndexNo: number = null;
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  resourceList: any = [];
  customFields: any = [];
  isCustomField: boolean = false;
  areVisibilityConditionsInValid = false;
  singleColumn: boolean = false;
  doubleColumn: boolean = false;
  tripleColumn: boolean = false;
  fourColumn: boolean = true;
  fieldList: any = [];
  displaySettingFlag: boolean = false;
  operatorList: any = [
    { value: 1, text: 'Equal' },
    { value: 2, text: 'Does Not Equal' },
  ];


  constructor(private fb: FormBuilder, private formService: FormService, private router: Router,
    private dialogService: ConfirmationDialogService,
    private flowService: FlowBuilderService,
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

  get mainScreenForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }

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


    this.ckeConfig = {
      allowedContent: true,
      height: 50,
      forcePasteAsPlainText: true
    };
    // console.log('this is test', this.form);
    this.visibltyConditionForm = this.flowService.BuildScreenControl();
    this.isPauseButtonVisible = true;
    this.isPreviousButtonVisible = true;
    this.isFinishButtonVisible = true;
  }

  test(value,list){
    // console.log("Value:",value);
    // console.log("Field List:",list);
  }

  isVisibleNextorFinishCustumInput = false;
  isVisiblePreviousButtonCustumInput = false;
  isVisiblePauseButtonCustumInput = false;
  isHeaderVisible = true;
  isFooterVisible = true;
  NextorFinishButtonLabel: any = "Finish";
  PreviousButtonLabel: any = "Previous";
  PauseButtonLabel: any = "Pause";
  headerLabel: any = "[Flow label]";
  isPauseButtonVisible = true;
  isPreviousButtonVisible = true;
  isFinishButtonVisible = true;

  ChangeNextorFinishButtonText(inputValue) {
    this.NextorFinishButtonLabel = inputValue.target.value;

  }

  ChangePreviousButtonText(inputValue) {
    ;
    this.PreviousButtonLabel = inputValue.target.value;
  }

  ChangePauseButtonText(inputValue) {
    this.PauseButtonLabel = inputValue.target.value;
  }
  ChangeHeaderText(inputValue) {
    ;
    if (inputValue.target.value != null && inputValue.target.value != "") {
      this.headerLabel = inputValue.target.value;
    }
    else {
      this.headerLabel = "[Flow label]";
    }
  }
  hidePauseButton() {
    this.isPauseButtonVisible = false;
  }

  hidePreviousButton() {
    this.isPreviousButtonVisible = false;
  }

  hideFinishButton() {
    this.isFinishButtonVisible = false;
  }


  showHeader() {
    this.isHeaderVisible = !this.isHeaderVisible;
    this.mainScreenForm.get("isHeaderShown").setValue(this.isHeaderVisible);

  }

  showFooter(e) {
    let value = e.target.checked;
    this.isFooterVisible = value;//this.isFooterVisible;
    this.mainScreenForm.get("isFooterShown").setValue(this.isFooterVisible);

  }

  showNextorFinishCustumInput() {
    this.isVisibleNextorFinishCustumInput = true;
  }

  showPreviousButtonCustumInput() {
    this.isVisiblePreviousButtonCustumInput = true;
  }

  showPauseButtonCustumInput() {
    this.isVisiblePauseButtonCustumInput = true;
  }

  hideCustomLabelInput(event) {
    ;
    // console.log(event);
    // this.isVisibleNextorFinishCustumInput = false;
    // this.isVisiblePreviousButtonCustumInput = false;
    // this.isVisiblePauseButtonCustumInput = false;
  }
  previousButtonChange(event) {
    let value = event.target.value;
    if (value == "standardValue") {
      this.mainScreenForm.get("previousButtonCustomLabel").clearValidators();
      this.mainScreenForm.get("previousButtonCustomLabel").updateValueAndValidity();
      this.isPreviousButtonVisible = true;
      this.isVisiblePreviousButtonCustumInput = false;
      this.PreviousButtonLabel = "Previous";
      this.mainScreenForm.get("isPreviousbuttonShown").setValue(true);
      this.mainScreenForm.get("isPreviousButtonDefaultLabel").setValue(true);
      this.mainScreenForm.get("previousButtonCustomLabel").setValue(null);


    }
    else if (value == "customValue") {
      this.mainScreenForm.get("previousButtonCustomLabel").setValidators([Validators.required]);
      this.mainScreenForm.get("previousButtonCustomLabel").updateValueAndValidity();

      this.isPreviousButtonVisible = true;
      this.isVisiblePreviousButtonCustumInput = true;
      this.mainScreenForm.get("isPreviousButtonDefaultLabel").setValue(false);
      this.mainScreenForm.get("isPreviousbuttonShown").setValue(true);

    }
    else {
      this.mainScreenForm.get("previousButtonCustomLabel").clearValidators();
      this.mainScreenForm.get("previousButtonCustomLabel").updateValueAndValidity();
      this.isPreviousButtonVisible = false;
      this.isVisiblePreviousButtonCustumInput = false;
      this.mainScreenForm.get("isPreviousbuttonShown").setValue(false);
      this.mainScreenForm.get("previousButtonCustomLabel").setValue(null);



    }

    // console.log(this.mainScreenForm.value.previousbutton);
  }
  nextOrFinishButtonChange(event) {

    let value = event.target.value;
    ;
    if (value == "standardValue") {
      this.mainScreenForm.get("nextOrFinishCustomLabel").clearValidators();
      this.mainScreenForm.get("nextOrFinishCustomLabel").updateValueAndValidity();
      this.isFinishButtonVisible = true;
      this.isVisibleNextorFinishCustumInput = false;
      this.NextorFinishButtonLabel = "Finish";
      this.mainScreenForm.get("isNextOrFinishButtonDefaultLabel").setValue(true);
      this.mainScreenForm.get("isNextOrFinishButtonShown").setValue(true);
      this.mainScreenForm.get("nextOrFinishCustomLabel").setValue(null);

    }
    else if (value == "customValue") {
      this.mainScreenForm.get("nextOrFinishCustomLabel").setValidators([Validators.required]);
      this.mainScreenForm.get("nextOrFinishCustomLabel").updateValueAndValidity();
      this.isFinishButtonVisible = true;
      this.isVisibleNextorFinishCustumInput = true;
      this.mainScreenForm.get("isNextOrFinishButtonDefaultLabel").setValue(false);
      this.mainScreenForm.get("isNextOrFinishButtonShown").setValue(true);

    }
    else {
      this.mainScreenForm.get("nextOrFinishCustomLabel").clearValidators();
      this.mainScreenForm.get("nextOrFinishCustomLabel").updateValueAndValidity();
      this.isFinishButtonVisible = false;
      this.isVisibleNextorFinishCustumInput = false;
      this.mainScreenForm.get("isNextOrFinishButtonShown").setValue(false);
      this.mainScreenForm.get("nextOrFinishCustomLabel").setValue(null);

    }
    // console.log(this.mainScreenForm.value.nextOrFinishButton);
  }
  pauseButtonChange(event) {
    ;
    let value = event.target.value;
    ;
    if (value == "standardValue") {
      this.mainScreenForm.get("pauseButtonCutomLabel").clearValidators();
      this.mainScreenForm.get("pauseButtonCutomLabel").updateValueAndValidity();
      this.isPauseButtonVisible = true;
      this.isVisiblePauseButtonCustumInput = false;
      this.PauseButtonLabel = "Pause";
      this.mainScreenForm.get("isPauseButtonDefaultLabel").setValue(true);
      this.mainScreenForm.get("isPauseButtonShown").setValue(true);
      this.mainScreenForm.get("pauseButtonCutomLabel").setValue(null);

    }
    else if (value == "customValue") {
      this.mainScreenForm.get("pauseButtonCutomLabel").setValidators([Validators.required]);
      this.mainScreenForm.get("pauseButtonCutomLabel").updateValueAndValidity();
      this.isPauseButtonVisible = true;
      this.isVisiblePauseButtonCustumInput = true;
      this.mainScreenForm.get("isPauseButtonDefaultLabel").setValue(false);
      this.mainScreenForm.get("isPauseButtonShown").setValue(true);

    }
    else {
      this.mainScreenForm.get("pauseButtonCutomLabel").clearValidators();
      this.mainScreenForm.get("pauseButtonCutomLabel").updateValueAndValidity();
      this.isPauseButtonVisible = false;
      this.isVisiblePauseButtonCustumInput = false;
      this.mainScreenForm.get("isPauseButtonShown").setValue(false);
      this.mainScreenForm.get("pauseButtonCutomLabel").setValue(null);
    }
    // console.log(this.mainScreenForm.value.nextOrFinishButton);
  }
  public show(nodeId: string) {
    this.nodeId = nodeId;
    this.group.length = 0;
    this.selectedControls = null;
    // this.manageForm.reset();
    this.colors = this.filedLists;
    this.InnerData = 'four';
    this.NewGrop('NewGroup');
    this.fieldList = [...this.flowService.ReturnData(this.form, nodeId)];
    this.resourceList = this.flowService.ReturnResources(this.form);
    if (this.mainScreenForm && this.mainScreenForm.value.id != null) {

      if (this.mainScreenForm.value.resourceId) {
        let resource = this.resourceList.find(x => x.resourceId == this.mainScreenForm.value.resourceId);
        this.onChangeResource(resource);
      }
      this.editScreenId = this.mainScreenForm.value.id
      let screenContr = (<FormArray>(this.mainScreenForm.get('controls') as FormArray)).controls;
      screenContr.forEach((item) => {
        if (item.get('fieldType').value == 'dropdown') {
          item.get('selectlistvalues').setValue([]);
        }
      })
      let displayFormat = this.mainScreenForm.value.displayFormat;
      if (displayFormat == "single") {
        this.singleColumn = true;
        this.doubleColumn = false;
        this.tripleColumn = false;
        this.fourColumn = false;
      }
      else if (displayFormat == "double") {
        this.singleColumn = false;
        this.doubleColumn = true;
        this.tripleColumn = false;
        this.fourColumn = false;
      }
      else if (displayFormat == "triple") {
        this.singleColumn = false;
        this.doubleColumn = false;
        this.tripleColumn = true;
        this.fourColumn = false;
      }
      else {
        this.singleColumn = false;
        this.doubleColumn = false;
        this.tripleColumn = false;
        this.fourColumn = true;
      }
    }
    // this.mainScreenForm.get("nextOrFinishButton").setValue("standardValue");
    // this.mainScreenForm.get("previousbutton").setValue("standardValue");
    // this.mainScreenForm.get("pausebutton").setValue("standardValue");
    this.isHeaderVisible = this.mainScreenForm.value.isHeaderShown;
    this.isFooterVisible = this.mainScreenForm.value.isFooterShown;

    if (this.isHeaderVisible && (this.mainScreenForm.value.name != null && this.mainScreenForm.value.name != '')) {
      this.headerLabel = this.mainScreenForm.value.name;
    }
    else {
      this.headerLabel = "[Flow label]";
    }
    if (this.isFooterVisible) {
      if (this.mainScreenForm.value.nextOrFinishButton == "customValue") {
        this.NextorFinishButtonLabel = this.mainScreenForm.value.nextOrFinishCustomLabel;
        this.isVisibleNextorFinishCustumInput = true;
      }
      else if (this.mainScreenForm.value.nextOrFinishButton == "hideButton") {
        this.isFinishButtonVisible = this.mainScreenForm.value.isNextOrFinishButtonShown;
      }
      else {
        this.NextorFinishButtonLabel = "Finish";

      }
      if (this.mainScreenForm.value.previousbutton == "customValue") {
        this.PreviousButtonLabel = this.mainScreenForm.value.previousButtonCustomLabel;
        this.isVisiblePreviousButtonCustumInput = true;
      }
      else if (this.mainScreenForm.value.previousbutton == "hideButton") {
        this.isPreviousButtonVisible = this.mainScreenForm.value.isPreviousbuttonShown;
      }
      else {
        this.PreviousButtonLabel = "Previous";

      }
      if (this.mainScreenForm.value.pausebutton == "customValue") {
        this.PauseButtonLabel = this.mainScreenForm.value.pauseButtonCutomLabel;
        this.isVisiblePauseButtonCustumInput = true;
      }
      else if (this.mainScreenForm.value.pausebutton == "hideButton") {
        this.isPauseButtonVisible = this.mainScreenForm.value.isPauseButtonShown;
      }
      else {
        this.PauseButtonLabel = "Pause";
      }

    }
    this.screen.show();
  }

  

  get SearchFieldName() { return this.manageForm.get('SearchFieldName') }

  onChangeResource(event) {
    ;
    if (event) {
      this.mainScreenForm.get('subModuleId').setValue(event.subModuleId);
      this.flowService.GetAutomationFlowCustomFieldsWithoutPaging(event.subModuleId).subscribe((res) => {
        if (res) {
          // console.log(res);
          this.customFields = res;
          this.customFieldsSearch =res;
        }
      });
    } else {
      this.customFields = [];
      this.customFieldsSearch =[];
    }

  }

  ShowHidFields(e,control) {
    ;
    if (e.target.checked) {
     if(control)
     {
      control.get('validateInput').setValidators([Validators.required]);
      control.get('validateInput').updateValueAndValidity();
     }
    }
    else {
      control.get('validateInput').clearValidators();
      control.get('validateInput').updateValueAndValidity();
    }          
  }

  
  onKeyuptxt(event) {
    
    let searchData = event.target.value as string;
    if (searchData) {
      searchData = searchData.toLowerCase();
      this.customFields = this.customFieldsSearch.filter(item => {
        return item.display_name.toLowerCase().includes(searchData);
      });
    }
    else {
      this.customFields = this.customFieldsSearch;
    }

    

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

  showSelectProps(e, controls, i) {
    ;

    this.isCustomField = e.value.isCustomField;
    this.controlArrayIndexNo = i;
    //this.showDefaultScreenProperties('child', i);
    //  let fType=e.value.fieldType
    //  if(fType=="dropdown" || fType=="radio"){
    //    let componentTypeValue="";
    //    if(fType=="dropdown")
    //    {
    //     componentTypeValue= this.componentTypes.find(x=>x.text=='PickList').value;
    //    }
    //    else
    //    {
    //     componentTypeValue= this.componentTypes.find(x=>x.text=='Radio Buttons').value;
    //    }
    //   (this.mainScreenForm.get('controls') as FormArray).controls[i].get('componentType').setValue(componentTypeValue);
    //  }
    if (this.editScreenId == 0) {
      if (e.get('isEditProg').value)
        return;
    }
    else {
      if (this.mainScreenForm.value.controls[i].customDisplayCondition) {
        let customDisplayValue = Number(this.mainScreenForm.value.controls[i].customDisplayCondition);
        this.displayConditionValue = this.displayList.filter(x => x.value == customDisplayValue)[0].text.toLowerCase();
      }
      else {
        this.displayConditionValue = null;
      }
    }
    controls.forEach(item => {
      item.get('isEditProg').setValue(false);
      ;
      // console.log(item.value)
    });
    e.get('isEditProg').setValue(true);
    if (!e.value.id) {
      ;
      let always = this.displayList.find(x => x.text.toLowerCase() == "always").value;
      let selected = e.get('customDisplayCondition').value;
      // if (e.get('customDisplayCondition').value > 0)
        (this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('customDisplayCondition').setValue((selected > 0 ? selected : always));
    }
  }
  dropNewGrop(lst) {
    ;
    if (this.dragedColor) {
      this.newgroup.push(this.dragedColor);
      this.groupControl = this.dragedColor;
      if (this.groupControl.field_type == 'dropdown') {
        this.groupControl.selectlistvalues = [] as any;
      }
      //this.items = [...this.items, {id: 1, name: 'New item'}];
      (this.mainScreenForm.get('controls') as FormArray).push(this.flowService.BuildScreenControlOnDrap(this.groupControl));
      this.dragedColor = null;
    }
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
    ;
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
        field_type = 'radio';
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

  

  toggleClass(event: any, classs: string) {
    if (this.condition) {
      this.condition = false;
    }
    else {
      this.condition = true;
    }
    // const hasClass = event.target.classList.contains(classs);
    // if (hasClass) {
    //   //this.renderer.removeClass(event.target, classs);
    //   this.condition = false;
    // } else {
    //   //this.renderer.addClass(event.target, classs);
    //   //this.condition = true;
    //   // // console.log("AddClass", this.renderer);
    // }
  }

  // toggleClassRadioButtonNew(event: any, index: any, classs: any) {
  //   this.condionNewGroup = false;
  //   this.hidemeNewGrp[index] = false;
  //   // this.dynamicLayoutNewSection[index] = classs;
  //   // this.layoutPageTypeNewGrp = classs;
  //   this.group[index].group_layout_type = classs.replace('Columns', '');
  //   this.group[index].controls.forEach(items => items.layout_type = classs.replace('Columns', ''));

  // }
  toggleClassRadioButton(event: any, classs: string) {
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
    this.condionNewGroup = false;
    this.hidemeNewGrp[index] = false;
    this.dynamicformNewSection[index] = classs;
    this.formPageTypeNewGrp = classs;
    this.mainScreenForm.get('displayFormat').setValue(classs);
    // this.group[index].group_layout_type = classs.replace('Columns', '');
    // this.group[index].controls.forEach(items => items.layout_type = classs.replace('Columns', ''));
    // // console.log("this.groupclas", this.group);
    this.displaySettingFlag = !this.displaySettingFlag;
  }

  NewGrop(NewGroup: string) {

    if (NewGroup == 'NewGroup') {
      this.DemoShow = true;
      this.dynamicformNewSection[0] = 'single';
      this.newGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
      this.fieldArray.push(this.newAttribute);

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
    if (this.displayProperties == false) {
      document.getElementById("#1").setAttribute("class", "show");
    }
    else {
      document.getElementById("#1").setAttribute("display", "hide");
    }

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
  get screenName() { return this.mainScreenForm.get('name'); }
  get screenDescription() { return this.mainScreenForm.get('description'); }
  get nextFinishButton() { return this.mainScreenForm.get('nextOrFinishCustomLabel'); }
  get previousButton() { return this.mainScreenForm.get('previousButtonCustomLabel'); }
  get pauseButton() { return this.mainScreenForm.get('pauseButtonCutomLabel'); }

  // get controlName() { return this.mainScreenForm.get('controls')[this.controlArrayIndexNo].get('name')}
  get controlName() { return <FormArray>(this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('name') }
  get controlDescription() { return <FormArray>(this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('description') }
  AddFormForCustomField() {
    ;
    // console.log(this.mainScreenForm);
    if (this.mainScreenForm.valid) {
      this.controlArrayIndexNo = null;
      //   this.loadSave = true;

      //   let dat = this.group;
      //   this.group.forEach((item, index) => {
      //     item.id = index; item.display_order = index;

      //     item.controls.forEach((item1, i) => {
      //       item1.display_order = i; if (item1.layout_type == null) {
      //         if (i > 0) { item1.layout_type = item.controls[i - 1].layout_type; }
      //       }
      //     })
      //   });

      //   this.formService.SaveLAyourData(this.group, this.moduleid, this.submoduleid, this.formMasterId).subscribe((result: any) => {
      //     if (result.statusCode == 200) {
      //       this.toaster.success('Screen fields has been updated successfully.');
      //       //this.formIdSent.emit(this.formMasterId)
      //       this.screen.hide()
      //       setTimeout(() => { this.loadSave = false; }, 3000);
      //       //this.router.navigateByUrl("/user");
      //       // this.getcustomfielddata(this.moduleid, this.submoduleid);
      //     }
      //     else {
      //       this.loadSave = false;
      //       this.toaster.error(result.responseMessage);
      //     }
      //   }, error => {
      //     this.loadSave = false;
      //   });

      this.screen.hide();
    }
    else {
      this.commonService.validateAllFormFields(this.mainScreenForm as FormGroup);
      this.toaster.error("Fields marked with * sign are mandatory before submit.");
      this.loadSave = false;
    }

  }

  Cancel() {
    this.controlArrayIndexNo = null;
    this.screen.hide()
  }

  // RemoveCustomFields(groupid: any, id: any, cntrid: any) {
  RemoveCustomFields(groupid: any, id: any, cntrid: any) {
    const message = `Are you sure you want to delete this field?`;
    this.dialogService.confirm('DELETE FIELD', message).subscribe(confirmed => {
      if (confirmed) {
        // console.log('Group Id:' + groupid + ' id: ' + id + ' cntrid: ' + cntrid);
        // console.log('Before Remove', <FormArray>(this.mainScreenForm.get('controls') as FormArray));
        (<FormArray>(this.mainScreenForm.get('controls') as FormArray)).removeAt(cntrid);
        // console.log('After Remove', <FormArray>(this.mainScreenForm.get('controls') as FormArray));
        // this.conditions.removeAt(index);
        this.hideme[cntrid] = false;
        // this.newgroup.splice(id, 1);
        //const targetIdx = this.group.find(item => item.id == id).id;
        /// this.group[groupid].controls.splice(id, 1);
        this.toaster.success(`Field has been deleted successfully.`);
        this.controlArrayIndexNo = null;
      }
      this.hideme[cntrid] = false;
    })

  }

  OnEditorChange(event, groupId, controlIndex) {
    this.group[groupId].controls[controlIndex].default_value = event.htmlValue;
  }

  onEditorLoad(index, obj: GroupControls) {
    setTimeout(() => { this.editor[index] = obj.default_value; }, 100);
  }

  onKey(event: any, index) {

    this.values += event.target.value + ' | ';
    this.newgroup[index].groupName = this.values;
    // // console.log("keyUp", this.newgroup);
  }
  closepopup() {
    //this.welcomescreen.show();
  }

  getItemToParseBolean(key) {
    if (key != null && key != '') {
      return JSON.parse(key);
    }
    else {
      key = 'false';
      return JSON.parse(key);
    }

  }
  CreateNew(customValue) {

    return { value: customValue, text: customValue };

  }

  // ShowConditionModal(e, i) {
  //   ;
  //   if (e.text.toLowerCase() != "always") {
  //     ;
  //     this.fieldList = [...this.flowService.ReturnData(this.form, this.nodeId)];
  //     this.flowService.ReturnDecisionResources(this.form, this.fieldList);
  //     this.visiblityConditionModal.show();

  //   }


  // }

  ShowConditionModal(e, i) {
    ;
    if(typeof e === "number"){
      let condition=this.displayList.find((x)=>(x.value==e));
      this.showModal(condition.text);
    }
    else{
      this.showModal(e.text);
    }
  }

  showModal(cond){
    if (cond.toLowerCase() != "always") {
      ;
      this.fieldList = [...this.flowService.ReturnData(this.form, this.nodeId)];
      this.flowService.ReturnDecisionResources(this.form, this.fieldList);
      this.visiblityConditionModal.show();
    }
  }
  
  showCoditionalPopup() {
    ;
    this.visiblityConditionModal.show();
  }
  hideConditionModal() {
    ;
    if(this.editScreenId <= 0){
      let always = this.displayList.find(x => x.text.toLowerCase() == "always").value;
      // console.log((this.mainScreenForm));
      (this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('customDisplayCondition').setValue(always);
    }
   
    this.visiblityConditionModal.hide();
  }
  get conditions() {
    return this.visibltyConditionForm.get('Conditions') as FormArray;
  }
  get controlsProp() {
    return this.mainScreenForm.get('controls') as FormGroup;
  }
  deleteCondition(index) {
    (<FormArray>(this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('Conditions')).removeAt(index);

    // this.conditions.removeAt(index);
  }
  deletePicklistItem(index) {
    (<FormArray>(this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('pickListOptions')).removeAt(index);
  }
  addNewCondition() {

    (<FormArray>(this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('Conditions')).push(this.flowService.BuildScreenControlVisibilityCondition());
  }
  addNewChoice() {
    (<FormArray>(this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('pickListOptions')).push(this.flowService.BuildScreenControlPicklistChoice());
  }

  getControlsData(data: FormArray) {

    this.controlProperties = data;
    // console.log(data);
  }
  Save() {

    // console.log(<FormArray>(this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('Conditions').value);
    if ((this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('Conditions').value[0].value != null &&
      (this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('Conditions').value[0].operator != null &&
      (this.mainScreenForm.get('controls') as FormArray).controls[this.controlArrayIndexNo].get('Conditions').value[0].resource != null) {
      this.areVisibilityConditionsInValid = false;
      this.visiblityConditionModal.hide();
    }
    else {
      this.areVisibilityConditionsInValid = true;
    }
  }

  get nodes() {
    return (this.form.get("nodes") as FormArray);
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
    { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Radio", group_name: "", dt_code: "radio", class_name: "fa fa-dot-circle-o", display_order: 9, data_type_name: "string", actual_data_type: "string", id: 9, required: false, length: 0, index: "", picklist_options: null, field_type: 'radio', default_value: '' },
    { form_field_id: "", data_type_id: 14, sql_type: "url", name: "Url", group_name: "", dt_code: "url", class_name: "fa fa-at", display_order: 10, data_type_name: "Url", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'anchor', default_value: '' },
    { form_field_id: "", data_type_id: 16, sql_type: "bit", name: "Boolean", group_name: "", dt_code: "boolean", class_name: "fa fa-at", display_order: 11, actual_data_type: "bit", data_type_name: "bit", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'boolean', default_value: '' },
    { form_field_id: "", data_type_id: 17, sql_type: "nvarchar", name: "Display Text", group_name: "", dt_code: "span", class_name: "fa fa-file-lines", display_order: 12, actual_data_type: "string", data_type_name: "string", id: 11, required: false, length: 0, index: "", picklist_options: null, field_type: 'span', default_value: '' }];

    showDefaultScreenProperties(event)
    {
      ;
      this.controlArrayIndexNo = null;
        event.stopPropagation();
    }

    openDisplaySetting() {
      this.displaySettingFlag = !this.displaySettingFlag;
      // console.log("flag", this.displaySettingFlag);
    }

    onFieldChange(event, control) {
      ;
      if (event) {
        // console.log("on Field change =>event", event);
        // console.log("on Field change =>control", control);
        control.get("isCustomField").setValue(event.isCustomField);
        this.filterOperators(event.dt_code, control);
      }
    }
    filterOperators(dtCode: string, control) {
      control.get("operatorList").setValue(null);
      if (dtCode == 'int') {
        dtCode = 'Number';
      }
      if (dtCode == 'select') {
        dtCode = 'Picklist'
      }
      control.get("operatorList").setValue(decisonOperatorList.filter(x => x.type.toLocaleLowerCase() == dtCode.toLowerCase()));
    }

    onResourceChange(event, control) {
      
      if (event) {
        // console.log("on resource change =>event", event);
        // console.log("on resource change =>control", control);
        control.get("isResource").setValue(event.isResource);
        control.get("subModuleId").setValue(event.subModuleId);
        if (!event.isResource) {
          this.filterOperators(event.dtCode, control);
        } else {
          this.flowService.GetAutomationFlowCustomFieldsWithoutPaging(event.subModuleId).subscribe((res: any) => {
            if (res) {
              control.get('customfieldsList').setValue(null);
              control.get('customfieldsList').setValue(res);
            }
          });
        }
      }
    }
}


