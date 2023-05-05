import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SelectionType, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AddeditrequirementsComponent } from './addeditrequirements/addeditrequirements.component';
import { RequirementsService } from './requirements.service';
import { CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { WorkorderService } from '../workorder/workorderservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requirementslist',
  templateUrl: './requirementslist.component.html',
  styleUrls: ['./requirementslist.component.scss']
})
export class RequirementslistComponent implements OnInit {
  deleteId: any;
  @ViewChild('newRequirementPopup', { static: false }) newRequirementModelPopup: ModalDirective;
  @ViewChild('addEditRequirementPopup', { static: false }) addEditRequirementPopup: AddeditrequirementsComponent;
  listFilter = '';
  curPage: number;
  isAdd: boolean = true;
  isUpdate: boolean = true;
  isDelete: boolean = true;
  isEdit = true;
  loadSave: boolean = false;
  requirementListingData: any = {
    pager: {},
    data: []
  };
  tableName = 'tblAccountsRequirement_backup';
  @Input() offset: number;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'Id';
  title: any;
  selected = [];
  SelectionType = SelectionType;
  pageSizeValue: number;
  lstPageSize: any
  newRequirementForm: FormGroup;  
  Id: any;
  recordType: string;

  constructor(private fb: FormBuilder,
    private requirementsService: RequirementsService,
    private commonService: CommonService,
    private dialogService: ConfirmationDialogService,
    private workorderService: WorkorderService,
    private toaster: ToastrService  ) { }

  ngOnInit() {
    this.listFilter = '';
    this.curPage= 1;
    this.pageSizeValue = 10;
    this.getListingGridData();
    this.initNewRequirementForm();
    this.getPageSizes();
  }


  updateFilter(event) {
    this.listFilter = event.target.value;
    this.curPage = 1;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.getListingGridData();
    }
  }
  getListingGridData() {
    this.selected = [];
    this.deleteId = null;
    this.offset = 1;
    this.loadSave = true;
    this.requirementsService.GetRequirementListingData(this.listFilter, this.sortColumn, this.sortDir, this.curPage, this.pageSizeValue).subscribe(result => {
      this.requirementListingData = result;
      this.offset = 1;    
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }
  search() {
    this.getListingGridData();
  }

  reset() {
    this.listFilter = '';
    this.curPage = 1;
    this.sortDir = 'desc';
    this.sortColumn = 'Id';
    this.getListingGridData();
  }


  private initNewRequirementForm() {
    this.newRequirementForm = this.fb.group({
      isCheckBox: [''],
    });
  };


  get isCheckBox() { return this.newRequirementForm.get('isCheckBox'); }


  showAddRequirementModel() {
    ;
    this.title = "New Requirement";
    this.newRequirementForm.reset({ isCheckBox: "0" });
    this.newRequirementModelPopup.show();
  }

  openAddNewRequirementPopup() {
    ;
    this.newRequirementModelPopup.hide();
    if (this.isCheckBox.value==0) {
      this.recordType = 'Trackable';
    }
    else {
      this.recordType = 'Informational';
    }
    this.addEditRequirementPopup.show('', this.recordType,this.Id, );
  }

  Closemodel() {
    this.newRequirementModelPopup.hide();
  }



  setPage($event) {
    ;
    this.loading = true;
    var ab = $event.page;
    this.curPage = ab;
    this.getListingGridData();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.getListingGridData();
  }

  editRequirement(row: any) {
    // console.log("row", row);
    this.title = "Edit Skill";
    this.isEdit = true;
    this.addEditRequirementPopup.show(row, this.recordType, row.Id);
  }
  onSelect({ selected }) {
    ;
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }
    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }
    }
  }

  onChange($event) {
    this.curPage = 1;
    this.getListingGridData();
  }

  DeleteRequirement(row: any) {
    ;
    const message = `Are you sure you want to delete Requirement  "${row.Name}"?`;
    this.dialogService.confirm('Delete Requirement', message).subscribe(confirmed => {
      if (confirmed) {
        ;
        this.workorderService.DeleteRecords(row.Id, this.tableName).subscribe(r => {
          this.toaster.success(`Requirement "${row.Name}" has been deleted successfully`);
          this.getListingGridData(); 
        }, error => {
        });
      }
    });
  }

  deleteAll() {
    ;
    // console.log("this.deleteId", this.deleteId);
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete Requirement(s)"`;
      this.dialogService.confirm('Delete Requirement(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.workorderService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Record(s) has been deleted successfully`);
            this.deleteId = "";
            this.selected = [];
            this.getListingGridData();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  callRequirementListingData() {
    ;
    this.loadSave = true;
    this.getListingGridData();
    this.loadSave = false;
  }
}
