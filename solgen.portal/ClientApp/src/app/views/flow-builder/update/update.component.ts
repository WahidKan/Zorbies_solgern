import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FlowBuilderService } from '../flow-builder.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @ViewChild('updateModal', { static: false }) updateModal: ModalDirective;
  @Input() form: FormGroup;
  nodeId: string;
  // isVisibleSearchRecordField: any;
  // isVisibleSearchObjectField: any;
  //-----Custom Field DDL--------
  PageSize = 10;
  currentpage = 0;
  filter: any;

  customFieldList: any = [];
  //------------------------

  objectList: any[];
  valueList: any[] = [];
  valueListCondition: any[] = [];

  select: string = "";
  customFilterUIValue: string = ' AND ';
  resourceList: any[] = []
  isAutoLunched:boolean=false;

  constructor(private flowBuilderService: FlowBuilderService) { }

  ngOnInit() {
    // this.GetObjectId(this.updateRecordForm.value.subModuleId)
  }
  Operators: any[] = [
    { value: 1, text: 'Equal' },
    { value: 2, text: 'Does Not Equal' },
  ];
  addFilterRecordCondition() {
    (this.updateRecordForm.get('filterConditions') as FormArray).push(this.flowBuilderService.BuildUpdateRecordFilter());
  }
  onVariableChange(event, condition) {
    ;
    if (typeof event !== 'undefined') {
      condition.get("isPrimaryField").setValue(event.is_primary_column);
    }
  }
  deleteFilterRecordCondition(index) {
    if (this.filterConditions.length > 1) {
      (this.updateRecordForm.get('filterConditions') as FormArray).removeAt(index);
    } else {
      (this.updateRecordForm.get('filterConditions') as FormArray).reset();
    }
  }
  decisionList: any[] = [
    { value: 1, name: 'All Conditions Are Met (AND)' },
    { value: 2, name: 'Any Condition Is Met (OR)' },
    { value: 3, name: 'Custom Condition Logic Is Met' }
  ];

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
        this.updateRecordForm.get('customFilterOperator').setValue(value);
      }
    }
  }
  saveUpdateForm() {
    ;
    let colsandvalues = "";
    let conditions = "";
    this.select = "UPDATE" + " " + this.customFieldList[0].table_name + " " + "SET";

    if (this.updateRecordForm.value != null) {
      this.updateRecordForm.value.filterConditions.forEach((condition) => {
        if (condition.field) {
          conditions += condition.field + " ";
        }
        if (condition.operator) {
          conditions += ((condition.operator && condition.operator == 1) ? " = " : " <> " + " ");
        }
        if (condition.value) {
          if(this.isAutoLunched)
          {
            conditions +=condition.value;
          }
          else
          {
          conditions += this.valueList.find(r => r.id == condition.value).formControlName;
          }
        }
        conditions += (this.updateRecordForm.get("filterOperator") && this.updateRecordForm.get("filterOperator").value == 1 ? " AND " : " OR ");

      });
      this.updateRecordForm.value.fieldMapping.forEach((element) => {
        if (element.customFieldId && element.value) {
          if(this.isAutoLunched)
          {
            colsandvalues += this.customFieldList.find((field) => field.form_field_id == element.customFieldId).PrimaryTableColumn + " = val_" + element.value + ",";
          }
          else
          {
           colsandvalues += this.customFieldList.find((field) => field.form_field_id == element.customFieldId).PrimaryTableColumn + " = " + this.valueList.find(r => r.id == element.value).formControlName + ",";
          }
        }
      });
      colsandvalues = colsandvalues.slice(0, -1);
      conditions = conditions.slice(0, -4);
      let query = this.select + " " + colsandvalues + " " + "WHERE" + " " + conditions;
      // console.log(query);
      this.updateRecordForm.get("query").setValue(query);

    }
    // console.log(this.updateRecordForm.value);
    this.closeUpdateModal();
  }
  get subModuleId() {
    return this.updateRecordForm.get("subModuleId");
  }
  
  showUpdateModal(nodeId: string) {
    ;
    this.nodeId = nodeId;
    this.isAutoLunched=this.form.value.isAutolaunched;
    this.resourceList = [...this.flowBuilderService.ReturnData(this.form, nodeId)];
    if(this.isAutoLunched)
    {
      this.resourceList= this.resourceList.filter(x=>x.groupName=="Resources");
    }
    this.flowBuilderService.ReturnDecisionResources(this.form, this.resourceList);

    this.updateModal.show();
    this.getSubModuleList();
    this.valueList = [...this.flowBuilderService.ReturnData(this.form, nodeId)];
    if (this.subModuleId) {
      this.getAutomationFlowCustomFields();
    }
      ////////////////
      ;
      if(this.updateRecordForm.get('id').value)
      {
        if((this.updateRecordForm.get('fieldMapping') as FormArray).length>0)
        {
          // .get('fieldMapping')['controls']
          let fieldMaping=(<FormArray>(this.updateRecordForm.get('fieldMapping') as FormArray)).controls;
          
          fieldMaping.forEach(item=>{
      let resourc=this.resourceList.find(x=>x.id==item.get('resourceId').value);
      this.onResourceChange(resourc,item);
          })
        }
      }
          ///////////////
  }
  addField() {
    (this.updateRecordForm.get('fieldMapping') as FormArray).push(this.flowBuilderService.BuildCreateRecordFieldMapping());
  }
  deleteField(index) {
    if (this.fieldMapping.length > 1) {
      (this.updateRecordForm.get('fieldMapping') as FormArray).removeAt(index);
    } else {
      (this.updateRecordForm.get('fieldMapping') as FormArray).reset();
    }
  }
  onResourceChange(event, control) {
    if (event) {
      ;
      // console.log("on resource change =>event", event);
      // console.log("on resource change =>control", control);
      control.get("isResource").setValue(event.isResource);
      control.get("subModuleId").setValue(event.subModuleId);
      if (!event.isResource) {
    //    this.filterOperators(event.dtCode, control);
      } else {
        ;
        this.flowBuilderService.GetAutomationFlowCustomFieldsWithoutPaging(event.subModuleId).subscribe((res: any) => {
          if (res) {
            control.get('customfieldsList').setValue(null);
            control.get('customfieldsList').setValue(res);
            this.valueList=res;
          }
        });
      }
    }
  }
  closeUpdateModal() {
    this.updateModal.hide();
  }
  CreateNew(customValue) {
    return { value: customValue, displayName: customValue };
  }
  get updateRecordForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }
  get fieldMapping() {
    return this.updateRecordForm.get('fieldMapping') as FormArray;
  }
  get filterConditions() {
    return this.updateRecordForm.get('filterConditions') as FormArray;
  }
  onScrollToEndCustomFields(dataList: any) {
    this.fetchMore(dataList);
  }
  private fetchMore(dataList: any) {
    this.currentpage = dataList.length;
    if (this.filter == undefined) {
      this.filter = "";
    }
    this.getAutomationFlowCustomFields();
  }

  onClearCustomField(dataList: any): void {
    this.customFieldList = [];
    this.currentpage = 0;
    this.filter = "";
    this.getAutomationFlowCustomFields();
  }

  onKeyCustomField(e: any, dataList: any) {
    this.customFieldList = [];
    this.currentpage = 0;
    this.filter = e.target.value;
    this.getAutomationFlowCustomFields();
  }
  getAutomationFlowCustomFields() {
    this.flowBuilderService.GetAutomationFlowCustomFieldsWithoutPaging(this.subModuleId.value).subscribe((res) => {
      if (res) {
        // console.log(res);
        this.customFieldList = this.customFieldList.concat(res);
      }
    });
  }
  GetObjectId(event) {
    this.customFieldList = [];
    this.getAutomationFlowCustomFields();
    while ((this.updateRecordForm.get('filterConditions') as FormArray).length != 0) {
      (this.updateRecordForm.get('filterConditions') as FormArray).removeAt(0);
    }
    this.filterConditions.push(this.flowBuilderService.BuildUpdateRecordFilter());
    while ((this.updateRecordForm.get('fieldMapping') as FormArray).length != 0) {
      (this.updateRecordForm.get('fieldMapping') as FormArray).removeAt(0);
    }
    this.fieldMapping.push(this.flowBuilderService.BuildCreateRecordFieldMapping());
  } getSubModuleList() {
    this.flowBuilderService.getSubModulesListCreatedByCustomFields().subscribe(response => {
      this.objectList = response;
    })
  }

  get updateName() { return this.updateRecordForm.get('name'); }
  get updateDescription() { return this.updateRecordForm.get('description'); }
}
