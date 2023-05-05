import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FlowBuilderService } from '../flow-builder.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {


  @ViewChild('sortModal', { static: false }) sortModal: ModalDirective;
  @Input() form: FormGroup;
  nodeId: string;
  isVisibleKeepCountField: any;
  
  constructor(private flowBuilderService: FlowBuilderService) { }

  ngOnInit() {
  }

  customFieldList: any = [
    // { text: "variable 1", value: "1" },
    // { text: "variable 2", value: "2" }
  ];
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

  sortList: any[] = [
    { value: 1, name: 'Ascending' },
    { value: 2, name: 'Decending' },    
  ];
  showKeepCoutField() {
    this.isVisibleKeepCountField = !this.isVisibleKeepCountField;
  }
  
  saveSortForm() {
    // console.log(this.sortForm.value)
    this.closesortModal();
  }
  showsortModal(nodeId: string) {
    ;
    this.nodeId =  nodeId;
    this.isVisibleKeepCountField = false;
    this.sortModal.show();
    this.collectionVariables = [...this.flowBuilderService.ReturnCollection(this.form, nodeId)];
    var collection = this.sortForm.get('collectionVariable').value;
    if (collection)
      this.customFieldList = this.form.value.nodes.find(x => x.nodeId == collection).component.choosenFields;

    
    //  this.customFieldList = [...this.flowBuilderService.ReturnCustFieldList(this.form, nodeId)];
  }

  ChangeColletion(event: any) {
    ;
    if (event != null) 
    {
      this.customFieldList = [...this.form.value.nodes.find(x => x.nodeId == event.value).component.choosenFields];
    }
    else
    {
      this.customFieldList=[]; 
    }
  }

  
  closesortModal() {
    this.sortModal.hide();
  }
  get sortForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }

  numberOnlyWithoutDecimal(event): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  get sortConditions() {
    return this.sortForm.get("sortConditions") as FormArray;
  }
  addField() {
    this.sortConditions.push(this.flowBuilderService.BuildCollectionSortConditions());
  }
  deleteField(index) {
    if (this.sortConditions.length > 1) {
      this.sortConditions.removeAt(index);
    } else {
      this.sortConditions.reset();
    }
  }
  get sortName() { return this.sortForm.get('name'); }
  get sortDescription() { return this.sortForm.get('description'); }
}
