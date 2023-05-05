import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { decisonOperatorList, FlowBuilderService } from '../flow-builder.service';

@Component({
  selector: 'app-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss']
})
export class PauseComponent implements OnInit {
  @ViewChildren('tabLinks') tabLinks: QueryList<any>;
  @ViewChildren('tabContent') tabContent: QueryList<any>;
  @Input() form: FormGroup;
  @ViewChild('pauseModal', { static: false }) pauseModal: ModalDirective;
  nodeId: string;
  activeTab: number = 0;
  resourceList: any[] = [];
  fieldList: any[] = [];
  decisionList: any[] = [
    { value: 1, text: 'All Conditions Are Met (AND)' },
    { value: 2, text: 'Any Condition Is Met (OR)' },
    { value: 3, text: 'Custom Condition Logic Is Met' },
    { value: 4 ,text:'Always Pause Flow—No Conditions'}
  ];

  DUMMYDATA: any[] = [
    { value: 1, text: 'Option One' },
    { value: 2, text: 'Option Two' },
    { value: 2, text: 'Option Three' },
    { value: 2, text: 'Option Four' },
    { value: 2, text: 'Option Five' },
  ];

  constructor(private service: FlowBuilderService) { }

  ngOnInit() {
  }

  showPauseModal(nodeId: string) {
    this.nodeId = nodeId;
    this.resourceList = [...this.service.ReturnData(this.form, nodeId)];
    this.service.ReturnDecisionResources(this.form, this.resourceList);
    this.pauseModal.show();
  }
  savePauseForm() {
    (this.pauseForm.get('pauseConfigs') as FormArray).controls
    .forEach(pc=>(pc.get('conditions')as FormArray).controls
    .forEach(c=>{
      c.get("customfieldsList").setValue(null);
      c.get("operatorList").setValue(null);
  }));

    // this.pauseConfigs.get("customfieldsList").setValue(null);
    // this.pauseConfigs.get("operatorList").setValue(null);
    // console.log("descision form on save =>", this.pauseForm.value);
    this.closePauseModal();
  }
  closePauseModal() {
    this.pauseModal.hide();
  }

  get pauseConfigs() {
    return this.pauseForm.get('pauseConfigs') as FormArray;
  }

  get pauseForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }

  addNewPauseConfig() {

    let current = this.service.BuildPauseConfig();
    this.pauseConfigs.push(current);
    this.tabLinks.forEach(link => {
      link.nativeElement.classList = ['nav-link']
    });
    this.tabContent.forEach(content => {
      content.nativeElement.classList = ['tab-pane fade']
    });
    this.activeTab = this.pauseConfigs.length - 1;
  }

  deletePauseConfig(event: any, index: number) {

    if (event) {
      if (this.pauseConfigs.length > 1) {
        this.pauseConfigs.removeAt(index);
        this.activeTab = this.pauseConfigs.length - 1;
        
        if (this.activeTab > -1) {
          this.tabLinks.last.nativeElement.classList = ['nav-link active show'];
          this.tabContent.last.nativeElement.classList = ['tab-pane fade active show'];
        }
      }
    }
  }


  onResourceChange(event, control) {
    
    if (event) {
      // console.log("on resource change =>event", event);
      // console.log("on resource change =>control", control);
      control.get("isResource").setValue(event.isResource);
      control.get("subModuleId").setValue(event.subModuleId);
      if (!event.isResource) {
        this.filterOperators(event.dtCode, control);
      }else{
        this.service.GetAutomationFlowCustomFieldsWithoutPaging(event.subModuleId).subscribe((res : any) => {
          if (res) {
            control.get('customfieldsList').setValue(null);
            control.get('customfieldsList').setValue(res);
          }
        });
      }
    }
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
    control.get("operatorList").setValue(decisonOperatorList.filter(x => x.type.toLocaleLowerCase() == dtCode.toLowerCase()));
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

deleteCondition(event, i, j){
  if (event) {
    (this.pauseConfigs.controls[i].get('conditions') as FormArray).removeAt(j)
  }
}

addCondition(index){
  (this.pauseConfigs.controls[index].get('conditions') as FormArray).push(this.service.BuildPauseConfigConditions());
}
isVisibleSpecificTimeFields=true;
isVisibleRecordFieldFields=false;

showHideDefineResumeTime(){

this.isVisibleSpecificTimeFields = !this.isVisibleSpecificTimeFields;
this.isVisibleRecordFieldFields = !this.isVisibleRecordFieldFields;
}
}
