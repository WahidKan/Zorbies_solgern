import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FlowBuilderService } from '../flow-builder.service';

@Component({
  selector: 'app-component-visiblity-condition',
  templateUrl: './component-visiblity-condition.component.html',
  styleUrls: ['./component-visiblity-condition.component.scss']
})
export class ComponentVisiblityConditionComponent implements OnInit {
  @Input('formgroupParent') formgroupParent: FormGroup;
  @Input('controlsProp') controlsProp: any;
  @Input('selectedControls') selectedControls:any;
  @Output('controloutput') controloutput:EventEmitter<any>=new EventEmitter();
  valueList: any = [];
  displayList: any = [
    { value: 1, text: "Always" },
    { value: 2, text: "All Conditions Are Met(AND)" },
    { value: 3, text: "Any Condition Is Met(OR)" },

  ];
  @ViewChild('visiblityConditionModal', { static: false }) visiblityConditionModal: ModalDirective;
  controlVisibl: any = null;
  loadSave = false;
  operatorList:any;
  conditionValueList: any;
  // controlsForm:FormGroup;
  constructor(private flowService:FlowBuilderService,private fb:FormBuilder) { }
// ngOnChanges(changes: SimpleChanges): void {
//    // console.log(this.formgroupParent);
// }
  ngOnInit() {
    
    // console.log(this.formgroupParent);
    // console.log(this.selectedControls);
    //this.controlsForm = this.flowService.BuildScreenControl();
  }
  get conditions() {
    return this.formgroupParent.get('displayConditions') as FormArray;
  }
  CreateNew(customValue) {
    
    return { value: customValue, text: customValue };

  }

  ShowConditionModal(e, id) {
    ;
    if (e.value != 1) {
      this.controlVisibl = id;
      this.visiblityConditionModal.show();
    }
  }
  hideConditionModal() {
    this.visiblityConditionModal.hide();
  }
  Save() {
    
    let aaa = this.conditions.value;
  }
  savemain()
  {
    ;
    this.formgroupParent.value.controlId=this.selectedControls.form_field_id;
    this.formgroupParent.value.screenId=this.selectedControls.form_field_id;
    // console.log(this.formgroupParent.value as FormArray);
    var abc= this.fb.array([this.formgroupParent.value])
    // console.log(abc);
    this.controloutput.emit(abc.value);

  }
  deleteCondition(index) {
    ;
    this.conditions.removeAt(index);
  }
  addNewCondition()
  {
    this.conditions.push(this.flowService.BuildScreenControlVisibilityCondition());

  }
}
