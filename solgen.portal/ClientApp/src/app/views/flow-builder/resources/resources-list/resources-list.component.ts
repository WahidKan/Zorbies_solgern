import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { ConfirmationDialogService } from 'src/app/views/shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { FlowBuilderService } from '../../flow-builder.service';
import { AddEditResourceComponent } from '../add-edit-resource/add-edit-resource.component';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {
  @Input() form: FormGroup;
  @ViewChild('resourceListModal', { static: false }) resourceListModal: ModalDirective;
  @ViewChild('addEditResourceModal', { static: false }) addEditResourceModal: AddEditResourceComponent;
  
  lstPageSize: any;
  loading: boolean;
  currentPage: any;
  loadSave: boolean = false;
  get resources() {
    return this.form.get("resources") as FormArray;
  }

  constructor(private flowBuilderService: FlowBuilderService, private dialogService: ConfirmationDialogService, private toaster: ToastrService) { }

  ngOnInit() {
  }

  editResource(data: any){
    this.addEditResourceModal.showAddEditResourceModal(data);
  }

  deleteResource(data: any){
    const message = `Are you sure you want to delete resource "${data.name}"?`;
    this.dialogService.confirm('Delete Resource', message).subscribe(confirmed => {
      if (confirmed) {
        let resourceIndex = this.resources.controls.findIndex(x => x.value.resourceId == data.resourceId);
        this.resources.removeAt(resourceIndex)
      }
    });
  }

  saveResourceListForm(){
    // console.log(JSON.stringify(this.resources.value));
    this.closeResourceListModal();
  }

  closeResourceListModal() {
    this.resourceListModal.hide();
  }

  showResourceListModal() {
    this.resources;
    this.resourceListModal.show();
  }

  public showResourceAddEditModal() {
    this.addEditResourceModal.showAddEditResourceModal(null);
  }

}
