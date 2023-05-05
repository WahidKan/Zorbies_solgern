import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FlowBuilderService } from '../flow-builder.service';

@Component({
  selector: 'app-subflow',
  templateUrl: './subflow.component.html',
  styleUrls: ['./subflow.component.scss']
})
export class SubflowComponent implements OnInit {

  @ViewChild('subFlowModal', { static: false }) subFlowModal: ModalDirective;
  @Input() form: FormGroup;
  subflowList:any=[];
  nodeId: string;
  PageSize = 10;
  currentpage = 0;
  filter: any;

  constructor(private flowBuilderService:FlowBuilderService) { }

  ngOnInit() {
  }
  get flowId() {
    return this.subFlowForm.get("flowId");

  }
  get name() {
    return this.subFlowForm.get("name");
  }
  get description() {
    return this.subFlowForm.get("description");
  }
  get subFlowForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }

  saveSubFlowForm() {
    // console.log(JSON.stringify(this.subFlowForm.value));
    this.closeSubflowModal()
  }

  GetAutomationFlowSubFlowddl(id: number, searchtext: string, currentpage: number){
     this.flowBuilderService.GetAutomationFlowSubFlowddl(id, searchtext, currentpage).subscribe((res)=>{
      this.subflowList = [...this.subflowList,...res];
    });
  }

  showSubflowModal(nodeId: string) {
    this.nodeId = nodeId;
    this.GetAutomationFlowSubFlowddl(this.flowId.value,this.filter,this.currentpage);
    this.subFlowModal.config.backdrop = 'static';
    this.subFlowModal.config.keyboard = false;
    this.subFlowModal.show();
  }

  closeSubflowModal() {
    this.subFlowModal.hide();
  }

  onScrollToEndActions(dataList: any) {
    this.fetchMore(dataList);
  }
  private fetchMore(dataList: any) {
    this.currentpage += 10
    //this.currentpage = dataList.length;
    if (this.filter == undefined) {
      this.filter = "";
    }
    this.GetAutomationFlowSubFlowddl(this.flowId.value,this.filter,this.currentpage);
  }

  onChange($event) {
    if(!$event) {
      this.flowId.reset();
      this.name.reset();
      this.description.reset();
    }
    this.filter = ($event !== undefined) ? $event.value : null;
    this.subflowList = [];
    this.currentpage = 0;
    this.GetAutomationFlowSubFlowddl(this.flowId.value,this.filter,this.currentpage);
  }

}
