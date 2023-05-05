import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTimeToLocalForAddEditPipe } from 'src/app/pipes/datetime.pipe';
import { FormField } from '../../lender/lenderlist.service';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-screen-execution',
  templateUrl: './screen-execution.component.html',
  styleUrls: ['./screen-execution.component.scss']
})
export class ScreenExecutionComponent implements OnInit,OnChanges {
  executionForm: FormGroup;
  FormJson: any;
  ScreenView: any;
  formFields: FormField[];
  selectJson: [] = [];
  submitted = false;
  nextOrFinishButton: string = 'Next';
  previousbutton: string = 'Previous';
  pausebutton: string = 'Pause';
  formFieldValue = [];
  formFieldType = [];
  formFieldName = [];
  searchText: string;
  scrollDataList: any;
  custom_field_id: any;
  field_code: any;
  len: any = 10;
  GroupFields = new GroupFieldValue();
  formGroup_fields: any[] = [];
  @Input() node = [];
  @Input() components: any;
  @Input() NewScreen: any;
  @Input() resourceObjectList: any;
  @Output('screenChange') screenChange: EventEmitter<any> = new EventEmitter();
  @Output('screenChangePrev') screenChangePrev: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private commonService: CommonService) { }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('this is on changes',changes)
    var screeninfo = changes.node.currentValue;
    var resources = changes.resourceObjectList.currentValue;
    if(this.executionForm == null){
      this.CreateExecutionForm();
    }
    if(resources.length > 0)
      resources.forEach(rsc => {
        if(rsc.resourceId == screeninfo.component.resourceId){
          if(rsc.records != null){
            // var collectionobj = rsc.records.find(a => a.resourceId == this.nextnode.nodeId);
            screeninfo.component.controls.forEach(cnt => {
              if(cnt.isCustomField){
                this.executionForm.get(cnt.formControlName).setValue(rsc.records[0][cnt.primaryTableColumn]);
              }
            });
          }
        }
      });
  }

  ngOnInit() {
    if(this.executionForm == null){
      this.CreateExecutionForm();
    }
  }
 CreateExecutionForm(){
  const group: any = {};
  const convertdatetime = new DateTimeToLocalForAddEditPipe();
 
  this.ScreenView = this.components;
  this.nextOrFinishButton = this.ScreenView.nextOrFinishButton == 'standardValue' ? 'Next' : this.ScreenView.nextOrFinishCustomLabel;
  this.previousbutton = this.ScreenView.previousbutton == 'standardValue' ? 'Previous' : this.ScreenView.previousButtonCustomLabel;
  this.pausebutton = this.ScreenView.pausebutton == 'standardValue' ? 'pause' : this.ScreenView.pauseButtonCutomLabel;
  this.selectJson = this.components.controls;
  this.components.controls.forEach(cnt => {
    let dateval = null;
    this.formFieldValue[cnt.formFieldId] = cnt.formControlName;
    this.formFieldType[cnt.formFieldId] = cnt.fieldType;
    this.formFieldName[cnt.formFieldId] = cnt.name;
    if (cnt.fieldType == 'date' || cnt.fieldType == 'datetime') {
      dateval = (cnt.defaultValue == '' ? null : convertdatetime.transform(cnt.defaultValue, null)); // to convert to local time
      group[cnt.formControlName] = new FormControl(dateval, [cnt.isRequired == true ? Validators.required : Validators.nullValidator]);
    }
    else if (cnt.fieldType == 'checkbox') {
      group[cnt.formControlName] = new FormControl(cnt.defaultValue, [cnt.isRequired == true ? Validators.required : Validators.nullValidator]);
    }
    else if(cnt.fieldType == 'dropdown'){
      cnt.pickListOptions =JSON.parse( cnt.pickListOptions);
      group[cnt.formControlName] = new FormControl(cnt.defaultValue, [cnt.isRequired == true ? Validators.required : Validators.nullValidator]);
  
    }
    else if(cnt.fieldType == 'span'){
      // cnt.pickListOptions =JSON.parse( cnt.pickListOptions);
      group[cnt.formControlName] = new FormControl(cnt.defaultValue, [cnt.isRequired == true ? Validators.required : Validators.nullValidator]);
  
    }
    else {
      group[cnt.formControlName] = new FormControl(cnt.defaultValue, [cnt.isRequired == true ? Validators.required : Validators.nullValidator,
      cnt.fieldType == "number" ? Validators.pattern("[0-9]{1,9}") :
        //   cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
        // 	cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
        Validators.nullValidator
      ]);
    }
  });
  this.executionForm = new FormGroup(group);
 }
  Prev() {
    this.screenChangePrev.emit('Previous');
  }
  Next() {
    this.submitted = false;
    ;
    // console.log(this.executionForm);
    if (this.executionForm.status == 'VALID') {
      this.submitted = false;
      this.GroupFields.group = this.executionForm;
      this.GroupFields.screenComponents = this.ScreenView;
      this.GroupFields.fieldsvalue = this.formFieldValue;
      this.GroupFields.fieldstype = this.formFieldType;
      this.GroupFields.fieldsname = this.formFieldName;
      this.screenChange.emit(this.GroupFields);
    }
    else {
      this.submitted = true;
      // console.log(this.executionForm);
      return false;
    }

  }


  onScrollToEnd(dataList: any, j: number) {
    this.fetchMore(dataList, j);
  }

  private fetchMore(dataList: any, j: number) {
    ;
    // console.log("e", dataList);
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.pickListOptions.length;
    this.custom_field_id = dataList.customFieldId;
    this.field_code = dataList.fieldCode;
    // let data = (dataList[j].select_options as any[]);
    //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      // console.log('scrollDataList:', this.scrollDataList);
      (dataList.pickListOptions as any[]) = (dataList.pickListOptions as any[]).concat(this.scrollDataList);

    })
  }

  onKey(e: any, dataList: any, j: number) {
    this.len = 0
    this.custom_field_id = dataList.customFieldId;
    this.field_code = dataList.fieldCode;
    this.searchText = e.target.value;
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      // console.log('scrollDataList:', this.scrollDataList);
      (dataList.pickListOptions as any[]) = this.scrollDataList;
    })
  }

  onClearLang(dataList: any, j: number): void {
    this.len = 0
    this.custom_field_id = dataList.customFieldId;
    this.field_code = dataList.fieldCode;
    this.searchText = '';
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      // console.log('scrollDataList:', this.scrollDataList);
      (dataList.pickListOptions as any[]) = this.scrollDataList;
    })
  }




}
export class GroupFieldValue {
  group: FormGroup
  screenComponents: any
  fieldsvalue: any[]
  fieldstype: any[]
  fieldsname: any[]
}
