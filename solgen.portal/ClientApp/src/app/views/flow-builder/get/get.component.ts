import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from '../../shared/common.service';
import { decisonOperatorList, FlowBuilderService } from '../flow-builder.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {

  @ViewChild('getModal', { static: false }) getModal: ModalDirective;
  @Input() form: FormGroup;
  nodeId: string;
  PageSize = 10;
  currentpage = 0;
  filter: any;
  variableList: any;
  operatorList: any;
  objectList: any[];
  customFieldList: any = [];
  customFieldListWithOutPagging: any = [];
  moduleId: any;
  customFilterUIValue: string = ' AND ';
  tblName: any = '';
  isAutoLunched:boolean=false;
  resourceList: any = [];
  autoResourceList: any = [];
  recordList: any[] = [];
  isTextValue:boolean=true;
  constructor(
    private flowService: FlowBuilderService, private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getSubModuleList();
  }
  getRecordVariables(subModuleId: any, isCollection: boolean) {
    this.recordList = this.flowService.ReturnResourceBySubModule(this.form, subModuleId, isCollection);
  }
  get filterConditions() {
    return this.getForm.get('filterConditions') as FormArray;
  }
  getSubModuleList() {
    this.flowService.getSubModulesListCreatedByCustomFields().subscribe(response => {
      this.objectList = response;
    });
  }
  decisionList: any[] = [
    { value: 1, name: 'All Conditions Are Met (AND)' },
    { value: 2, name: 'Any Condition Is Met (OR)' },
    { value: 3, name: 'Custom Condition Logic Is Met' }
  ];
  Operators: any[] = [
    { value: 1, text: 'Equal' },
    { value: 2, text: 'Does Not Equal' },
  ];
  sortList: any[] = [
    { value: 1, name: 'Ascending' },
    { value: 2, name: 'Decending' },
    { value: 3, name: 'Not Sorted' }
  ];
  showGetModal(nodeId: string) {
    this.nodeId = nodeId;
    // console.log("full from inside get record show method =>", this.form);
    // console.log("get from inside get record show method =>", this.getForm);
    this.resourceList = [...this.flowService.ReturnData(this.form, nodeId)];
    this.autoResourceList=[...this.flowService.ReturnData(this.form, nodeId)];

    this.flowService.ReturnDecisionResources(this.form, this.autoResourceList);
 if(this.isAutoLunched)
    {
      this.autoResourceList= this.autoResourceList.filter(x=>x.groupName=="Resources");
    }
    this.isAutoLunched=this.form.value.isAutolaunched;
    this.getModal.show();
    this.onSubModuleChange();
  }
  onResourceChange(event, control) {
    if (event) {
      ;
      this.isTextValue=false;
      // console.log("on resource change =>event", event);
      // console.log("on resource change =>control", control);
      control.get("isResource").setValue(event.isResource);
      control.get("subModuleId").setValue(event.subModuleId);
      if (!event.isResource) {
    //    this.filterOperators(event.dtCode, control);
      } else {
        ;
        this.flowService.GetAutomationFlowCustomFieldsWithoutPaging(event.subModuleId).subscribe((res: any) => {
          if (res) {
            control.get('customfieldsList').setValue(null);
            control.get('customfieldsList').setValue(res);
            this.resourceList=res;
          }
        });
      }
    }
    else
    {
      this.isTextValue=true;
    }
  }
  deleteCondition(index) {
    this.filterConditions.removeAt(index);
  }
  addNewCondition() {
    this.filterConditions.push(this.flowService.BuildGetRecordFilterConditions());
  }
  get choosenFields() {
    return this.getForm.get('choosenFields') as FormArray;
  }
  deletechoosenFields(index) {
    this.choosenFields.removeAt(index);
  }
  addNewchoosenFields() {
    this.choosenFields.push(this.flowService.BuildGetRecordSelectFieldsToStore());
  }
  bindcustomFilterCondition() {
    let value = '';
    if (this.filterConditions.controls) {
      if (this.filterConditions.length > 1) {
        for (let i = 0; i <= this.filterConditions.controls.length; i++) {
          if (i > 0) {
            if (i !== this.filterConditions.controls.length) {
              value = value + (i + this.customFilterUIValue);
            }
            else {
              value = value + i;
            }
          }
        }
      }
      if (value !== '') {
        this.getForm.get('customFilterCondition').setValue(value);
      }
    }
  }
  onFilterCondtionChange(event) {
    if (event) {
      if (event.value == 1) {
        this.customFilterUIValue = " AND ";
      }
      else if (event.value == 2) {
        this.customFilterUIValue = " OR ";
      }
      this.bindcustomFilterCondition();
    }
  }
  Save() {
    ;
    // console.log('Save Componenet' ,this.getForm);
    if (this.getForm.get("howToMap") && (this.getForm.get("howToMap").value == "Automaticallystore" || this.getForm.get("howToMap").value == "Variable")) {
      if (this.choosenFields) {
        this.choosenFields.removeAt(0);
      }
      this.customFieldListWithOutPagging.forEach(data => {
        this.choosenFields.push(this.flowService.BuildGetRecordSelectFieldsToStore(
          {
            id: null,
            updateRecordId: null,
            primaryTableColumn: data.PrimaryTableColumn,
            customfieldName: data.label,
            customfieldDtCode: data.dt_code,
            customFieldId: data.form_field_id,
            statusId: 1001
          }
        ));
      });
    }

    let cols = '';
    let whereConditions = "";
    let sortCondition = "";
    let sortBy = "";
    let query = "";
    let selectCountCondition = ""
    this.tblName = this.customFieldList[0].table_name;
    if (this.getForm.get("howManyToStore") && this.getForm.get("howManyToStore").value == "OnlyTheFirstRecord") {
      selectCountCondition = " TOP 1 ";
    }
    if (this.getForm.get("sortCondition") && this.getForm.get("sortCondition").value != 3 && this.getForm.get("sortCondition").value != null) {
      sortCondition = (this.getForm.get("sortCondition") && this.getForm.get("sortCondition").value == 1) ? "ASC" : "DESC";
      sortBy = this.customFieldList.find((field) => field.form_field_id == this.getForm.value.sortBy).PrimaryTableColumn;
    }
    // if(this.getForm.get("sortBy") && this.getForm.get("sortBy").value != 3){
    //   sortBy = this.customFieldList.find((field) => field.form_field_id == this.getForm.value.sortBy).PrimaryTableColumn;
    // }
    this.getForm.value.filterConditions.forEach((condition) => {
      if(condition.field){
        whereConditions += condition.field + " ";
      }
      if(condition.operator){
        whereConditions += ((condition.operator && condition.operator == 1) ? " = " : " <> " + " ");
      }
      if(condition.value){
        if(this.isAutoLunched)
        {
          whereConditions +="'"+condition.value+"'";
        }
        else
        {
        whereConditions += this.resourceList.find(r => r.id == condition.value).formControlName;
        }
      }
      whereConditions += (this.getForm.get("filterCondition") && this.getForm.get("filterCondition").value == 1 ? " AND " : " OR ");
    });
    this.getForm.value.choosenFields.forEach((params) => {
      if (params.customFieldId) {
        cols += this.customFieldList.find((field) => field.form_field_id == params.customFieldId).PrimaryTableColumn + ",";
      }
    });
    cols = cols.slice(0, -1);
    whereConditions = whereConditions.slice(0, -4);
    if (sortCondition == "" && sortBy == "" && cols != "") {
      // query = "SELECT" + selectCountCondition + " " + cols + " " + "FROM" + " " + this.tblName + " " + "WHERE" + " " + whereConditions;
      query = "SELECT * FROM " + " " + this.tblName + " WHERE" + " " + whereConditions;
    }
    if (sortCondition != "" && sortBy != "" && cols == "") {
      query = "SELECT" + selectCountCondition + " " + "*" + " " + "FROM" + " " + this.tblName + " " + "WHERE" + " " + whereConditions + " " + "ORDER BY" + " " + sortBy + " " + sortCondition;
    }
    if (sortCondition != "" && sortBy != "" && cols != "") {
      query = "SELECT" + selectCountCondition + " " + cols + " " + "FROM" + " " + this.tblName + " " + "WHERE" + " " + whereConditions + " " + "ORDER BY" + " " + sortBy + " " + sortCondition;
    }
    if (sortCondition == "" && sortBy == "" && cols == "") {
      query = "SELECT" + selectCountCondition + " " + "*" + " " + "FROM" + " " + this.tblName + " " + "WHERE" + " " + whereConditions;
    }
    this.getForm.get("query").setValue(query);
    this.close();
  }
  close() {
    this.getModal.hide();
  }
  onRecordCountChange(event){
    if(event){
      let isCollection = false;
      this.getForm.get("recordVariableId").setValue(null);
      if (this.getForm.get("howManyToStore") && this.getForm.get("howManyToStore").value == "OnlyTheFirstRecord") {
        isCollection = false;
      } else {
        isCollection = true;
      }
      this.getRecordVariables(this.moduleId, isCollection);
    }
  }
  showHideField() {
    while ((this.getForm.get('choosenFields') as FormArray).length != 0) {
      (this.getForm.get('choosenFields') as FormArray).removeAt(0);
    }
    this.choosenFields.push(this.flowService.BuildGetRecordSelectFieldsToStore());
  }
  valueList: any = [
    { text: "demo", value: "1" },
    { text: "demo2", value: "2" }
  ];
  CreateNew(customValue) {
    ;
    return { id: customValue, displayName: customValue };
  }
  get getForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }
  get subModuleId() {
    return this.getForm.get("subModuleId");
  }
  onSubModuleChange() {
    if (this.subModuleId) {
      this.customFieldList = [];
      this.customFieldListWithOutPagging = [];
      this.moduleId = this.subModuleId.value;
      this.currentpage = 0;
      this.filter = "";
      let isCollection = false;
      if (this.getForm.get("howManyToStore") && this.getForm.get("howManyToStore").value == "OnlyTheFirstRecord") {
        isCollection = false;
      } else {
        isCollection = true;
      }
      this.getRecordVariables(this.moduleId, isCollection);
      this.getAutomationFlowCustomFields();
      this.GetAutomationFlowCustomFieldsWithoutPaging();
    }
    this.subModuleId.valueChanges.subscribe((sm: any) => {
      // console.log("inside sub module change =>", sm);
      //// this.tblName = sm.tableName;
      this.customFieldList = [];
      this.customFieldListWithOutPagging = [];
      this.moduleId = sm;
      this.currentpage = 0;
      this.filter = "";
      let isCollection = false;
      if (this.getForm.get("howManyToStore") && this.getForm.get("howManyToStore").value == "OnlyTheFirstRecord") {
        isCollection = false;
      } else {
        isCollection = true;
      }
      this.getRecordVariables(sm, isCollection);
      this.getAutomationFlowCustomFields();
      this.GetAutomationFlowCustomFieldsWithoutPaging();

      while ((this.getForm.get('filterConditions') as FormArray).length != 0) {
        (this.getForm.get('filterConditions') as FormArray).removeAt(0);
      }
      this.filterConditions.push(this.flowService.BuildGetRecordFilterConditions());

      while ((this.getForm.get('choosenFields') as FormArray).length != 0) {
        (this.getForm.get('choosenFields') as FormArray).removeAt(0);
      }
      this.choosenFields.push(this.flowService.BuildGetRecordSelectFieldsToStore());
      this.getForm.get("sortBy").setValue(null);
      this.getForm.get("sortCondition").setValue(3);
    });
  }
  onScrollToEndCustomFields(dataList: any) {
    this.fetchMore(dataList);
  }

  private fetchMore(dataList: any) {
    /// this.currentpage += 1;
    this.currentpage = dataList.length;
    if (this.filter == undefined) {
      this.filter = "";
    }
    this.PageSize = dataList.length;
    this.getAutomationFlowCustomFields();
  }

  onClearCustomField(dataList: any): void {
    this.customFieldList = [];
    this.currentpage = 0;
    this.filter = "";
    this.getAutomationFlowCustomFields();
  }

  onKeyCustomField(e: any, dataList: any) {
    ///this.customFieldList = [];
    this.currentpage = 0;
    this.filter = e.target.value;
    this.flowService.getAutomationFlowCustomFields(this.filter, this.currentpage, this.moduleId).subscribe((res) => {
      if (res) {
        this.customFieldList = res;
      }
    });
  }

  getAutomationFlowCustomFields() {
    // this.flowService.getAutomationFlowCustomFields(this.filter, this.currentpage, this.moduleId).subscribe((res) => {
    //   if (res) {
    //     // console.log(this.customFieldList);
    //     this.customFieldList = this.customFieldList.concat(res);
    //   }
    // });
    ;
    this.flowService.GetAutomationFlowCustomFieldsWithoutPaging(this.moduleId).subscribe((res) => {
      if (res) {
        this.customFieldList = this.customFieldList.concat(res);
      }
    });
  }

  GetAutomationFlowCustomFieldsWithoutPaging() {
    this.flowService.GetAutomationFlowCustomFieldsWithoutPaging(this.moduleId).subscribe((res) => {
      if (res) {
        this.customFieldListWithOutPagging = this.customFieldListWithOutPagging.concat(res);
      }
    });
  }

  onFieldChange(event, index) {
    ;
    this.operatorList = [];
    if (typeof event !== 'undefined') {
      this.choosenFields.controls[index].patchValue({
        customfieldName: event.label,
        customfieldDtCode: event.dt_code,
        primaryTableColumn: event.PrimaryTableColumn
      });
      this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(m => {
        this.operatorList = m;
      });

    } else {
      this.operatorList = [];
    }
  }

  onVariableChange(event,condition : FormGroup) {
    ;
    this.operatorList = [];
    if (typeof event !== 'undefined') {
      condition.get("isPrimaryField").setValue(event.is_primary_column);
      this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(m => {
        this.operatorList = m;
      });

    } else {
      this.operatorList = [];
    }
  }
  onSortChange(event) {
    this.operatorList = [];
    if (typeof event !== 'undefined') {
      this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(m => {
        this.operatorList = m;
      });

    } else {
      this.operatorList = [];
    }
  }
  get getName() { return this.getForm.get('name'); }
  get getDescription() { return this.getForm.get('description'); }

}
