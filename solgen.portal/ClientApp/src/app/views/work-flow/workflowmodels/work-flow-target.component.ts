import { Component, OnInit, Output, EventEmitter, ViewChild, Input, OnChanges } from '@angular/core';
import { ScreenComponent } from './screen.component';
import { WorkFlowResultComponent } from './work-flow-result.component';
import { WorkFlowDescisionComponent } from './work-flow-descision.component';
import { WorkFlowConditionComponent } from './work-flow-condition.component';
import { FormGroup, FormArray } from '@angular/forms';
import { RuleEngineService } from '../../rule-engine/rule-engine.service';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-work-flow-target',
  templateUrl: './work-flow-target.component.html',
  styleUrls: ['./work-flow-target.component.scss']
})
export class WorkFlowTargetComponent implements OnInit, OnChanges  {
  @Output() deleteTargetEvent = new EventEmitter();    
  constructor(private ruleEngineService: WorkflowService) { }
  @ViewChild('resultcomponent', { static: false }) resultcomponent: WorkFlowResultComponent;
  @ViewChild('decisioncomponent', { static: false }) decisioncomponent: WorkFlowDescisionComponent;
  @ViewChild('conditioncomponent', { static: false }) conditioncomponent: WorkFlowConditionComponent;
  @ViewChild('screencomponent', { static: false }) screencomponent: ScreenComponent;
  @Input() offset: number;
  SelectedValue: any[] = [];
  @Input() ruleEngineForm: FormGroup;
  @Input() target: FormGroup;
  @Input() rowNo: number;
  @Input() isEdit: boolean;
  @Input() productId: string;
  @Input() rValidation: number;
  @Output() resultValidation = new EventEmitter<number>();

  targetForm: FormGroup;
  isDecision: boolean = false;
  ngOnInit() {

  }
  ngOnChanges(): void {
   
    this.initForm();
    
  }
  initForm() {
    // console.log('targetcheck',this.target)
    this.targetForm = this.ruleEngineService.buildTarget();     
    if (this.isEdit == true && this.target.get('addButton').value) {
      this.targetForm.get('addButton').setValue(true);

    }
    const control = this.ruleEngineForm.get('targets') as FormArray;
    if (control.length > 1) {
      this.isDecision = control.controls[control.length - 2].value.isScreenAdded;
    }
    //// console.log('control.controls[0]MAin', control.controls[control.length - 2])
    //// console.log('control.controls[0].value.ScreenId;MAin', control.controls[control.length - 2].value.isScreenAdded)
    //// console.log('controlMAin', control);
    //// console.log('control.lengthMAin', control.length);
  }
 
  //deleteTarget() {
  //  this.deleteTargetEvent.emit();
  //}
  AddScreen(a: any) {
    this.screencomponent.addNewScreen(false); 
   // this.targetForm.get('addButton').setValue(true); 


  }
  AddDecision(a: any) {
    //this.deleteTargetEvent.emit();
      this.decisioncomponent.AddDecision();
    //this.targetForm.get('addButton').setValue(true); 


  }
  AddCondition(a: any) {
    this.conditioncomponent.AddCondition(false); 
    //this.targetForm.get('addButton').setValue(true); 
  }
  getIndexNo(event: any) {

    this.resultValidation.emit(event)   
  }
  
  //function used to change state of add button 
  buttonState(event: any) {
    
    this.targetForm.get('addButton').setValue(true);
   
    
  }
  stepdll(e) {
    ;
    //var ab = e + 1;
    //const data = this.ruleEngineForm.get('targets') as FormArray;
    //// console.log('datadatadata',data)
    //for (var i = data.length; i > 0; i--) {
    //  var index = i - 1;
    //  if (data.controls[i-1].get('type').value == 'decision') {
    //   // let ddldata: any[] = [];   
    //    //ddldata = data.controls[i].get('ddlStepDropdown').value;
    //    this.decisioncomponent.addstepdlldata(index, ab);
    //    return;
    //  }
    //}  


    //this.decisioncomponent.addstepdlldata(1, ab);
  }
}
