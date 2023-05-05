import { Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { Connector } from '@syncfusion/ej2-angular-diagrams';
import { Console, debug } from 'console';
import { ModalDirective } from 'ngx-bootstrap';
import { element } from 'protractor';
import { DataObject, decisonOperatorList, FlowBuilderService } from '../flow-builder.service';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss']
})
export class DecisionComponent implements OnInit {
  @ViewChildren('tabLinks') tabLinks: QueryList<any>;
  @ViewChildren('tabContent') tabContent: QueryList<any>;
  @ViewChild('decisionModal', { static: false }) decisionModal: ModalDirective;
  @Input() form: FormGroup;
  operatorList: any[] = [];
  nodeId: string;
  NewOutcomes = [{ href: "" }];
  activeTab: number = 0;
  resourceList: any[] = []
  fieldList: any[] = [];
  diagram: any;
  constructor(private service: FlowBuilderService) { }
  ngOnInit() {
  }
  addCondition(index) {
    (this.outcomes.controls[index].get('conditions') as FormArray).push(this.service.BuildDecisionOutcomeConditions());
  }
  addNewOutcome() {
    let current = this.service.BuildDecisionOutcome();
    this.outcomes.push(current);
    this.tabLinks.forEach(link => {
      link.nativeElement.classList = ['nav-link']
    });
    this.tabContent.forEach(content => {
      content.nativeElement.classList = ['tab-pane fade']
    });
    this.activeTab = this.outcomes.length - 1;
  }
  deleteOutcome(event: any, index: number) {
    if (event) {
      if (this.outcomes.length > 1) {
        this.outcomes.removeAt(index);
        this.activeTab = this.outcomes.length - 1;
        
        if (this.activeTab > -1) {
          this.tabLinks.last.nativeElement.classList = ['nav-link active show'];
          this.tabContent.last.nativeElement.classList = ['tab-pane fade active show'];
        }

      }
    }
  }
  deleteCondition(event, i, j) {
    if (event) {
      (this.outcomes.controls[i].get('conditions') as FormArray).removeAt(j)
    }
  }
  decisionList: any[] = [
    { value: 1, text: 'All Conditions Are Met (AND)' },
    { value: 2, text: 'Any Condition Is Met (OR)' },
    { value: 3, text: 'Custom Condition Logic Is Met' }
  ];
  // resourceList: DataObject[] = [
  //   { nodeId: "", displayName: "resource 1", dtCode: "Number", type: "screen", isCollection: false, isRecord: false, id: 1,isCustomField : false,customFieldId : null },
  //   { nodeId: "", displayName: "resource 2", dtCode: "Choice", type: "screen", isCollection: false, isRecord: false, id: 2 ,isCustomField : false,customFieldId : null},
  //   { nodeId: "", displayName: "resource 3", dtCode: "DateTime", type: "screen", isCollection: false, isRecord: false, id: 3 ,isCustomField : false,customFieldId : null},
  //   { nodeId: "", displayName: "resource 4", dtCode: "Collection", type: "get", isCollection: false, isRecord: false, id: 4 ,isCustomField : false,customFieldId : null},
  //   { nodeId: "", displayName: "resource 5", dtCode: "Record", type: "get", isCollection: false, isRecord: false, id: 4 ,isCustomField : false,customFieldId : null},
  //   { nodeId: "", displayName: "resource 6", dtCode: "Picklist", type: "get", isCollection: false, isRecord: false, id: 4 ,isCustomField : false,customFieldId : null},
  // ];

  valueList: any[] = [
    { value: 1, text: 'value 1' },
    { value: 2, text: 'value 2' },
    { value: 3, text: 'value 3' }
  ];
  showDecisionModal(nodeId: string, diagram) {
    // console.log("des", this.decisionForm);
    this.diagram = diagram;
    this.nodeId = nodeId;
    this.resourceList = [...this.service.ReturnData(this.form, nodeId)];
    this.service.ReturnDecisionResources(this.form, this.resourceList);
    this.decisionModal.show();
  }
  closeDecisionModal() {
    this.decisionModal.hide();
  }

  CreateNew(customValue) {
    return { value: customValue, text: customValue };
  }
  get outcomes() {
    return this.decisionForm.get('outcomes') as FormArray;
  }

  outComeIndex: any;

  addValidationToCutomConditon(index){
    ;
    this.outComeIndex=index;
    // console.log((this.outcomes.controls[index] as FormGroup).get('condition').value==3);
    if((this.outcomes.controls[index] as FormGroup).get('condition').value==3){
      this.setCustomConditionRequired();
    }
    else{
      this.unSetCustomConditionRequired();
    }
  }

  setCustomConditionRequired() {
    (this.outcomes.controls[this.outComeIndex] as FormGroup).get('customCondition').setValidators([Validators.required]);
    (this.outcomes.controls[this.outComeIndex] as FormGroup).get('customCondition').updateValueAndValidity();
    // console.log((this.outcomes.controls[this.outComeIndex] as FormGroup).get('customCondition'));
  }

  unSetCustomConditionRequired() {
    (this.outcomes.controls[this.outComeIndex] as FormGroup).get('customCondition').setValidators(null);
    (this.outcomes.controls[this.outComeIndex] as FormGroup).get('customCondition').updateValueAndValidity();
  }


  submit() {
    ;
    (this.form.get('connectors') as FormArray).value.forEach(element => {
      // console.log("Connecters: ",(this.form.get('connectors') as FormArray).value);
      if (element.outcomeKey != '') {
        if (this.outcomes.value.filter(x => x.outcomeKey == element.outcomeKey)) {
          ;
          let diagramConnectors=this.diagram.connectors;
            let id=diagramConnectors.find(x=>x.properties.sourceID==element.sourceID && x.targetID==element.targetID).properties.id;
          if(id){
            let node: any = this.diagram.getObject(id);
            if (node instanceof Connector && node.annotations.length > 0) {
              ;
              let annotation = node.annotations[0];
              annotation.content = this.outcomes.value.find(x => x.outcomeKey == element.outcomeKey).name;
              this.diagram.dataBind();
            }
          }

        }
      }
    });
    this.closeDecisionModal();
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
        this.service.GetAutomationFlowCustomFieldsWithoutPaging(event.subModuleId).subscribe((res: any) => {
          if (res) {
            control.get('customfieldsList').setValue(null);
            control.get('customfieldsList').setValue(res);
          }
        });
      }
    }
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
  onOperatorChange(event, condition) {
    ;
    if (event) {
      if (event.text == 'Is Null' || event.text == 'Is Not Null') {
        condition.get('value').disable();
      } else {
        condition.get('value').enable();
      }
    } else {
      condition.get('value').enable();
    }
  }
  get decisionForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }

  get decisionName() { return this.decisionForm.get('name'); }
  get decisionDescription() { return this.decisionForm.get('description'); }
}
