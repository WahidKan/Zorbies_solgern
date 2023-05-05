import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FlowBuilderService } from '../flow-builder.service';
import { retry } from 'rxjs/operators';
import { Index } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @ViewChild('deleteModal', { static: false }) deleteModal: ModalDirective;
  isVisibleSearchRecordField: any;
  isVisibleSearchObjectField: any;
  hideObjectField = false;
  isFilterAccountPortionVisible = false;
  customFilterUIValue: string = ' AND ';
  @Input() form: FormGroup;
  nodeId: string;
  PageSize = 10;
  currentpage = 0;
  filter: any;
  moduleId: any;
  customFieldList: any = [];
  objectList: any[];
  valueList: any[] = [];

  constructor(private flowbuilderservice: FlowBuilderService) { }

  ngOnInit() {
  }
  onVariableChange(event, condition){
    ;
    if (typeof event !== 'undefined') {
      condition.get("isPrimaryField").setValue(event.is_primary_column);
    }
  }
  saveDeleteForm() {
    let colsandvalues = "";
    let conditions = "";
    let queryStatement = "UPDATE" + " " + this.customFieldList[0].table_name + " SET statusid = 1003" + " WHERE ";

    if (this.deleteForm.value != null) {
      this.deleteForm.value.filterConditions.forEach((condition) => {
        if (condition.field) {
          conditions +=  condition.field + " "; 
        }
        if(condition.operator){
          conditions +=  ((condition.operator && condition.operator == 1) ? " = " : " <> " + " ");
        }
        if(condition.value){
          conditions +=  this.valueList.find(r => r.id == condition.value).formControlName 
        }
        conditions +=  (this.deleteForm.get("findCondition") && this.deleteForm.get("findCondition").value == 1 ? " AND " : " OR ");
      });
      colsandvalues = colsandvalues.slice(0, -1);
      conditions = conditions.slice(0, -4);
      let query = queryStatement + conditions;
      // console.log(query);
      this.deleteForm.get("query").setValue(query);

    }
    this.closeDeleteModal();
  }
  showHideObjectAndSearchField() {
    this.isVisibleSearchObjectField = !this.isVisibleSearchObjectField;
    this.isVisibleSearchRecordField = !this.isVisibleSearchRecordField;
    this.isFilterAccountPortionVisible = false;
  }
  showDeleteModal(nodeId: string) {
    this.nodeId = nodeId;
    this.isVisibleSearchRecordField = false;
    this.isVisibleSearchObjectField = true;
    this.deleteModal.show();
    this.getSubModuleList();
    this.valueList = [...this.flowbuilderservice.ReturnData(this.form, nodeId)];

    if (this.subModuleId) {
      this.customFieldList = [];
      this.moduleId = this.subModuleId.value;
      this.currentpage = 0;
      this.filter = "";
      this.getAutomationFlowCustomFields();
    }
  }
  DUMMYDATA: any[] = [
    { value: 1, text: 'Equal' },
    { value: 2, text: 'Does Not Equal' },
  ];
  Operators: any[] = [
    { value: 1, text: 'Equal' },
    { value: 2, text: 'Does Not Equal' },
  ];
  decisionList: any[] = [
    { value: 1, name: 'All Conditions Are Met (AND)' },
    { value: 2, name: 'Any Condition Is Met (OR)' },
    { value: 3, name: 'Custom Condition Logic Is Met' }
  ];
  closeDeleteModal() {
    this.deleteModal.hide();
  }
  get filterConditions() {
    return this.deleteForm.get('filterConditions') as FormArray;
  }
  addFindCondition() {
    (this.deleteForm.get('filterConditions') as FormArray).push(this.flowbuilderservice.BuildDeleteRecordFindConditions());
    this.bindcustomFilterCondition();
  }

  deleteFindCondition(index) {
    if (this.filterConditions.length > 1) {
      (this.deleteForm.get('filterConditions') as FormArray).removeAt(index);
    } else {
      (this.deleteForm.get('filterConditions') as FormArray).reset();
    }
  }
  get subModuleId() {
    return this.deleteForm.get("subModuleId");
  }
  CreateNew(customValue) {
    return { value: customValue, text: customValue };
  }
  get deleteForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }
  onScrollToEndCustomFields(dataList: any) {
    this.fetchMore(dataList);
  }
  private fetchMore(dataList: any) {
    this.currentpage += 1;
    if (this.filter == undefined) {
      this.filter = "";
    }
    this.PageSize = dataList.length;
    this.getAutomationFlowCustomFields();
  }
  onClearCustomField(dataList: any): void {
    this.isFilterAccountPortionVisible = false;
    this.currentpage = 0;
    this.filter = "";
    this.getAutomationFlowCustomFields();
  }

  onKeyCustomField(e: any, dataList: any) {
    this.currentpage = 0;
    this.filter = e.target.value;
    this.getAutomationFlowCustomFields();
  }
  getAutomationFlowCustomFields() {
    this.flowbuilderservice.GetAutomationFlowCustomFieldsWithoutPaging(this.moduleId).subscribe((res) => {
      if (res) {
        // console.log(res);
        this.customFieldList = this.customFieldList.concat(res);
      }
    });
  }
  GetObjectId(event) {
    if (event === undefined) {
      this.isFilterAccountPortionVisible = false;
    }
    else {
      this.isFilterAccountPortionVisible = true;
      this.customFieldList = [];
      this.moduleId = event.value;
      this.getAutomationFlowCustomFields();
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
        this.deleteForm.get('customFindCondition').setValue(value);
      }
    }
  }
  getSubModuleList() {
    this.flowbuilderservice.getSubModulesListCreatedByCustomFields().subscribe(response => {
      this.objectList = response;
    })
  }

  get deleteName() { return this.deleteForm.get('name'); }
  get deleteDescription() { return this.deleteForm.get('description'); }
}
