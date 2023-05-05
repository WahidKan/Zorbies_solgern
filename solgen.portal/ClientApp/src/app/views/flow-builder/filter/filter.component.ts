import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FlowBuilderService } from '../flow-builder.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @ViewChild('filterModal', { static: false }) filterModal: ModalDirective;
  @Input() form: FormGroup;
  nodeId: string;
  operatorList: any = [
    { value: 1, text: 'Equal' },
    { value: 2, text: 'Does Not Equal' },
  ];

  variableList: any = [
    // { text: "variable 1", value: "1" },
    // { text: "variable 2", value: "2" }
  ];
  constructor(private flowBuilderService: FlowBuilderService) { }
  ngOnInit() {
  }
  get conditions() {
    return this.filterForm.get('filterCollectionConditions') as FormArray;
  }
  ChangeColletion(event: any) {
    if (event != null) {
      this.variableList = this.form.value.nodes.find(x => x.nodeId == event.value).component.choosenFields;
    }
    else {
      this.variableList = [];
    }
  }
  collectionVariables = [
    {
      value: "Api",
      id: 1
    },
    {
      value: "Flow",
      id: 2
    },
    {
      value: "Label",
      id: 3
    },
    {
      value: "Profile",
      id: 4
    }
  ]
  showFilterModal(nodeId: string) {
    this.nodeId = nodeId;
    ;
    this.filterModal.show();
    this.collectionVariables = [...this.flowBuilderService.ReturnCollection(this.form, nodeId)];
    var collection = this.filterForm.get('collection').value;
    if (collection)
      this.variableList = this.form.value.nodes.find(x => x.nodeId == collection).component.choosenFields;

  }
  saveFilterForm() {
    // console.log(this.filterForm.value);
    this.filterModal.hide();
  }
  closeFilterModal() {
    this.filterModal.hide();
  }
  deleteCondition(event: any, index: number) {
    if (this.conditions.length > 1) {
      (this.filterForm.get('filterCollectionConditions') as FormArray).removeAt(index);
    } else {
      (this.filterForm.get('filterCollectionConditions') as FormArray).reset();
    }
  }
  addNewCondition() {
    this.conditions.push(this.flowBuilderService.BuildCollectionFilterConditions());
  }
  get filterForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }
  get filterName() { return this.filterForm.get('name'); } 
  get filterDescription() { return this.filterForm.get('description'); }  
}
