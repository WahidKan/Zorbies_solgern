import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FlowBuilderService } from '../../flow-builder.service';

@Component({
  selector: 'app-add-edit-resource',
  templateUrl: './add-edit-resource.component.html',
  styleUrls: ['./add-edit-resource.component.scss']
})
export class AddEditResourceComponent implements OnInit {
  @Input() form: FormGroup;
  @ViewChild('addEditResourceModal', { static: false }) addEditResourceModal: ModalDirective;

  resourceForm: FormGroup;
  subModuleList: any[];
  resourceTypeList: any = [{ text: "Variable", value: 1 }];
  dataTypeList: any = [{ text: "Record", value: 1 }]
  nodeId: string;
  PageSize = 10;
  currentpage = 0;
  filter: any;

  constructor(private flowBuilderService: FlowBuilderService) { }

  ngOnInit() {
  }

  get resources() {
    return this.form.get("resources") as FormArray;
  }
  get resourceId() {
    return this.resourceForm.get("resourceId");
  }
  get resourceTypeId() {
    return this.resourceForm.get("resourceTypeId");
  }
  get name() {
    return this.resourceForm.get("name");
  }
  get description() {
    return this.resourceForm.get("description");
  }
  get dataTypeId() {
    return this.resourceForm.get("dataTypeId");
  }
  get isAllowMultiple() {
    return this.resourceForm.get("isAllowMultiple");
  }
  get subModuleId() {
    return this.resourceForm.get("subModuleId");
  }
  get tableName() {
    return this.resourceForm.get("tableName");
  }

  initResourceForm(data: any) {
    this.resourceForm = this.flowBuilderService.BuildResource(data);
  }

  saveResourceForm() {
    let resource = this.resources.controls.find(x => x.value.resourceId == this.resourceId.value);
    if(resource) {
      this.resources.controls.find(x => x.value.resourceId == this.resourceId.value).patchValue(this.resourceForm.value);
    }
    else {
      this.resources.push(this.resourceForm);
    }
    this.closeAddEditResourceModal()
  }

  getSubModuleList() {
    this.flowBuilderService.getSubModulesListCreatedByCustomFields().subscribe(response => {
      this.subModuleList = response;
    });
  }

  showAddEditResourceModal(data: any) {
    this.getSubModuleList();
    this.initResourceForm(data);
    this.addEditResourceModal.config.backdrop = 'static';
    this.addEditResourceModal.config.keyboard = false;
    this.addEditResourceModal.show();
  }

  closeAddEditResourceModal() {
    this.addEditResourceModal.hide();
  }

  onChangeSubModule($event) {
    this.tableName.setValue($event.tableName);
  }

}
