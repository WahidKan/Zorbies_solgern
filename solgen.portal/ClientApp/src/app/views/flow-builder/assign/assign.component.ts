import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Form, FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { any } from 'underscore';
import { FlowBuilderService, assingmentOperatorList } from '../flow-builder.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  @ViewChild('assignModal', { static: false }) assignModal: ModalDirective;
  @Input() form: FormGroup;
  nodeId: string;
  Conditions = [1];
  operatorList: any[] = [];
  valueList: any = [
    { text: "demo", value: "1" },
    { text: "demo2", value: "2" }
  ];
  variableList: any = [];
  //   { text: "Street", value: "1" },
  //   { text: "State/Province", value: "2" },
  //   { text: "Zip/Postal Code", value: "3" },
  //   { text: "Country", value: "4" },
  // ];
  constructor(private flowService: FlowBuilderService) { }

  ngOnInit() {
  }
  // onResourceChange(event) {
  //   if (event) {
  //     this.filterOperators(event.dtCode);
  //   }
  // }
  onResourceChange(event, control) {
    if (event) {
      // console.log("on resource change =>event", event);
      // console.log("on resource change =>control", control);
      control.get("isResource").setValue(event.isResource);
      control.get("subModuleId").setValue(event.subModuleId);
      if (!event.isResource) {
        this.filterOperators(event.dtCode, control);
      }else{
        this.flowService.GetAutomationFlowCustomFieldsWithoutPaging(event.subModuleId).subscribe((res : any) => {
          if (res) {
            control.get('customfieldsList').setValue(null);
            control.get('customfieldsList').setValue(res);
          }
        });
      }
    }
  }

  Operators: any[] = [
    { value: "=", text: 'Equal' },
    { value: "<>", text: 'Does Not Equal'},
  ];

  // filterOperators(dtCode: string) {
  //   this.operatorList = assingmentOperatorList.filter(x => x.type.toLocaleLowerCase() == dtCode.toLowerCase());
  // }
  showAssignModal(nodeId: string) {
    this.nodeId = nodeId;
    //this.variableList = this.flowService.ReturnData(this.form, nodeId);

    //this.variableList = this.flowService.ReturnData(this.form, nodeId);
    this.variableList =[...this.flowService.ReturnData(this.form, nodeId)];

    this.flowService.ReturnAssignmentResources(this.form, this.variableList);
    this.assignModal.show();

  }
  get conditions() {
   
    return this.assignmentForm.get('variableAssignments') as FormArray;
  }
  onFieldChange(event, control) {
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
    control.get("operatorList").setValue(assingmentOperatorList.filter(x => x.type.toLocaleLowerCase() == dtCode.toLowerCase()));
  }
  deleteCondition(index) {
    this.Conditions.splice(index, 1);
    this.conditions.removeAt(index);
    let abc = this.conditions;
  }
  onOperatorChange(event,condition) {
    if (event) {
      if(event.text == 'Is Null' || event.text == 'Is Not Null'){
        condition.get('value').disable();
      }else{
        condition.get('value').enable();
      }
    }else{
      condition.get('value').enable();
    }
  }
  Save() {
    // // console.log("full form inside assigfnment submit",this.form);
    // // console.log("assignment form inside assignment submit",this.assignmentForm);

    // console.log(JSON.stringify(this.assignmentForm.value));
    this.assignModal.hide();
  }
  closeAssignModal() {
    this.assignModal.hide();
  }
  addNewCondition() {
    this.conditions.push(this.flowService.BuildAssignmentMapping());
  }
  CreateNew(customValue) {
    return { value: customValue, text: customValue };
  }
  get assignmentForm() {

    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }
  get assignName() { return this.assignmentForm.get('name'); }
  get assignDescription() { return this.assignmentForm.get('description'); }
}
