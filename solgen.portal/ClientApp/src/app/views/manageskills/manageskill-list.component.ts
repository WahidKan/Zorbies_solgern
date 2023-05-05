import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { MangeskillsService, skillModel } from './mangeskills.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { SelectionType, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-manageskill-list',
  templateUrl: './manageskill-list.component.html'
})
export class ManageskillListComponent implements OnInit {

  skillModel: skillModel = new skillModel();
  @ViewChild('addSkillPopUp', { static: false }) addSkillModel: ModalDirective;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Input() offset: number;
  sortDir = 'desc';
  sortColumn = 'Id';
  manageSkillListingData: any = {
    pager: {},
    data: []
  };
  curPage: number;
  pageSizeValue: number;
  lstPageSize: any
  loading = false;
  listFilter = '';
  deleteId: any;
  selected = [];
  SelectionType = SelectionType;
  modulePermission: any[] = [];
  isDelete: boolean = false;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  loadSave = false;
  title: any;
  isEdit = false;
  addSkillForm: FormGroup;
  tableName = 'tblSkill';
  contentHeader: object;


  constructor(private commonService: CommonService,
    private mangeskillsService: MangeskillsService,
    private dialogService: ConfirmationDialogService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toaster: ToastrService) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'MANAGESHILLSUPDATE');

    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'MANAGESHILLSDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'MANAGESHILLSADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
  }

  ngOnInit() {
    this.curPage = 1;
    this.initForm();
    this.listFilter = '';
    this.pageSizeValue = 10;
    this.loadSave = true;
    this.getPageSizes();
    this.getListingGridData();

    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Skills',
      actionButton: true,
      iconCssClass: '',
      breadcrumb:
        [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard'
          },
          {
            name: 'Manage Skills',
            isLink: false
          }

        ]
    };
  }



  getTransformedDate(date) {
    if (!date) return;
    return this.datePipe.transform(date);
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  getListingGridData() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
    this.mangeskillsService.GetManageSkillListingData(this.listFilter, this.sortColumn, this.sortDir, this.curPage, this.pageSizeValue).subscribe(result => {
      this.manageSkillListingData = result;
      debugger
      this.offset = 1;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }

  setPage($event) {
    this.loadSave = true;
    var ab = $event.page;
    this.curPage = ab;
    this.getListingGridData();
  }

  onChange($event) {
    this.getListingGridData();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.getListingGridData();
  }

  onSelect({ selected }) {
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

  private initForm() {
    this.addSkillForm = this.fb.group({
      skillId: [null],
      skill: ['', Validators.required]
    });
  };

  get skillId() { return this.addSkillForm.get('skillId'); }
  get skill() { return this.addSkillForm.get('skill'); }

  showAddSkillModel() {
    this.title = "Add Skill";
    this.addSkillForm.reset();
    this.addSkillModel.show();
  }

  Closemodel() {
    this.addSkillModel.hide();
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete the selected Skill(s)?`;
      this.dialogService.confirm('Delete Skill', message).subscribe(confirmed => {
        if (confirmed) {
          this.commonService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Selected Skills(s) has been deleted successfully.`);
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

  SaveRecords() {
    debugger;
    if (this.addSkillForm.valid) {
      this.loadSave = true;
      this.skillModel.Id = this.addSkillForm.value.skillId;
      this.skillModel.Skill = this.addSkillForm.value.skill;
      this.mangeskillsService.addeditSkill(this.skillModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.getListingGridData();
         
          if (result.responseMessage == 'Skill is already added with the same name') {
            this.loadSave = false;
            this.toaster.error(result.responseMessage);
          }
          else {
            this.toaster.success(result.responseMessage);
            this.addSkillModel.hide();
          }
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      })
    }
    else
      this.commonService.validateAllFormFields(this.addSkillForm);
  }

  EditSkill(row: any) {
    this.title = "Edit Skill";
    this.isEdit = true;
    this.addSkillForm.patchValue({
      skillId: row.Id,
      skill: row.SkillName.toString()
    });
    this.addSkillModel.show();
  }

  DeleteSkill(row: any) {
    ;
    const message = `Are you sure you want to delete Skill "${row.SkillName}"?`;
    this.dialogService.confirm('Delete Skill ', message).subscribe(confirmed => {
      if (confirmed) {
        this.mangeskillsService.deleteSkill(row.Id).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.getListingGridData();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }

  updateFilter(event) {
    this.listFilter = event.target.value;
    this.curPage = 1;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.getListingGridData();
    }
  }

  search() {
    this.getListingGridData();
  }
  reset() {
    this.table.selected = [];
    this.table.sorts = [];
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.curPage = 1;
    this.getListingGridData();

  }
}
