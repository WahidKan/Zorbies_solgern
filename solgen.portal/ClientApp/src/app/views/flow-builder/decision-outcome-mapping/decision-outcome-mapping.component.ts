import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FlowBuilderService } from '../flow-builder.service';

@Component({
  selector: 'app-decision-outcome-mapping',
  templateUrl: './decision-outcome-mapping.component.html',
  styleUrls: ['./decision-outcome-mapping.component.scss']
})
export class DecisionOutcomeMappingComponent implements OnInit {
  @ViewChild('outcomeMapping', { static: false }) outcomeMappingModal: ModalDirective;
  outcomes: any[];
  targetId: any;
  diagram: any;
  id: any;
  sourceId: any;
  @Input() form: FormGroup;
  constructor(private service: FlowBuilderService) { }

  ngOnInit() {
    this.outcomes = [];
    //this.setOutomeKeyRequired();
    // console.log("Form Control Out Come Key", this.decisionOutcomeMappingForm.get("outcomeKey"));
  }
  show(diagram: any, id: any, targetId: any, sourceId: any) {
   
    this.diagram = diagram;
    this.targetId = targetId;
    this.sourceId = sourceId;
    this.id = id;
    // console.log("mapping connector =>", this.decisionOutcomeMappingForm);
    this.outcomeMappingModal.show();
    this.outcomes = this.service.ReturnOutcomeList(this.form, this.sourceId);
    this.outcomes.push({ text: "Default Outcome", value: this.sourceId + '_' + 'defaultOutcomes' });
    this.setOutomeKeyRequired();
  }
  close() {
    this.outcomeMappingModal.hide();
  }
  save() {
    // const pathannotations = [{
    //   content: 'New Connector'
    // }];
    ;
    let key = this.decisionOutcomeMappingForm.get('outcomeKey').value;
    let outcome = this.outcomes.find(x => x.value == key)
    const display = outcome != null ? outcome.text : "";
    this.diagram.addLabels(this.diagram.getObject(this.id), [{ offset: .6, content: display, style: { color: 'gray', fontSize: 10, fill: "white" } }]);
    // console.log("mapping connector in save=>", this.decisionOutcomeMappingForm);
    this.outcomeMappingModal.hide();
  }
  get decisionOutcomeMappingForm() {
    return (this.form.get("connectors") as FormArray).controls.find(f => f.get("targetID").value == this.targetId && f.get("sourceID").value == this.sourceId);
  }

  setOutomeKeyRequired() {
    this.decisionOutcomeMappingForm.get("outcomeKey").setValidators([Validators.required]);
    this.decisionOutcomeMappingForm.get("outcomeKey").updateValueAndValidity();
  }

  
}
