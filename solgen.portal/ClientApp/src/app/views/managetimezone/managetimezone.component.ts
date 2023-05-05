import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SelectionType, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ManagetimezoneService, timezoneModel } from './managetimezone.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-managetimezone',
  templateUrl: './managetimezone.component.html',
  styleUrls: ['./managetimezone.component.scss']
})
export class ManagetimezoneComponent implements OnInit {

  timezoneModel: timezoneModel = new timezoneModel();
  @ViewChild('addTimeZonePopUp', { static: false }) showaddTimeZoneModel: ModalDirective;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Input() offset: number;
  sortDir = 'desc';
  sortColumn = 'Id';
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
  tableName = 'tbltimezone';
  addTimezoneForm: FormGroup;
  manageTimeZoneListingData: any = {
    pager: {},
    data: []
  };
  contentHeader: object;

  constructor(private commonService: CommonService,
    private managetimezoneService: ManagetimezoneService,
    private dialogService: ConfirmationDialogService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toaster: ToastrService) {
      const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
  }

  ngOnInit() {
    this.loadSave = true;
    this.curPage = 1;
    this.initForm();
    this.isAdd = true;
    this.isUpdate = true;
    this.isDelete = true;
    this.listFilter = '';
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.getListingGridData();
    this.initBreadCrumb();
}

initBreadCrumb() {
   this.contentHeader = {
     headerTitle: 'Manage Time Zone',
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
           name: 'Manage Time Zone',
           isLink: false
         }

       ]
   };
 }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  private initForm() {
    this.addTimezoneForm = this.fb.group({
      Id: [null],
      timeZone: ['', Validators.required]
    });
  };

  get Id() { return this.addTimezoneForm.get('Id'); }
  get timeZone() { return this.addTimezoneForm.get('timeZone'); }

  getListingGridData() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
    this.managetimezoneService.GetTimezoneListingData(this.listFilter, this.sortColumn, this.sortDir, this.curPage, this.pageSizeValue).subscribe(result => {
      this.manageTimeZoneListingData = result;
      this.offset = 1;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  };

  setPage($event) {
    this.loading = true;
    var ab = $event.page;
    this.curPage = 1;
    this.getListingGridData();
  };

  onChange($event) {
    this.getListingGridData();
  };

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.getListingGridData();
  };

  onSelect({ selected }) {
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].timezone_id.toString() + ",";  
      }
    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }
    }
  };

  showAddTimeZoneModel() {
    this.title = "Add Time Zone";
    this.addTimezoneForm.reset();
    this.showaddTimeZoneModel.show();
  };

  Closemodel() {
    this.showaddTimeZoneModel.hide();
  };

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete the selected Time Zone(s)?`;
      this.dialogService.confirm('Delete Time Zone', message).subscribe(confirmed => {
        if (confirmed) {
          this.commonService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Selected Time Zone(s) has been deleted successfully.`);
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
  };

  SaveRecords() {
    if (this.addTimezoneForm.valid) {
      this.loadSave = true;
      this.timezoneModel.Id = this.addTimezoneForm.value.Id;
      this.timezoneModel.timeZone = this.addTimezoneForm.value.timeZone;
      this.managetimezoneService.addeditTimezone(this.timezoneModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.getListingGridData();
          this.showaddTimeZoneModel.hide();
          this.loadSave = false;
          this.toaster.success(result.responseMessage);

        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      })
    }
  };

  EditTimeZone(row: any) {
    this.loadSave = true;
    this.title = "Edit Time Zone";
    this.isEdit = true;
    this.addTimezoneForm.patchValue({
      Id: row.timezone_id,
      timeZone: row.display_name.toString()
    });
    this.showaddTimeZoneModel.show();
    setTimeout(() => {
      this.loadSave = false;
    }, 200);
  };

  DeleteTimeZone(row: any) {
    const message = `Are you sure you want to delete Time Zone "${row.display_name}"?`;
    this.dialogService.confirm('Delete Time Zone ', message).subscribe(confirmed => {
      if (confirmed) {
        this.commonService.DeleteRecords(row.timezone_id, this.tableName).subscribe((result: any) => {
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
  };

  updateFilter(event) {
    this.listFilter = event.target.value;
    this.curPage = 1;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.getListingGridData();
    }
  };

  search() {
    this.getListingGridData();
  };

  reset() {
    this.table.selected = [];
    this.table.sorts = [];
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'timezone_id';
    this.pageSizeValue = 10;
    this.curPage = 1;
    this.getListingGridData();
  };

  onClickStatus(row) 
  {
    const message = row.status_id == 1001 ? 'in-active': 'active';;
    this.dialogService.confirm('TIME ZONE', 'Are you sure you want to '+ message + ' the selected time zone?').subscribe((confirmed) => {
      if (confirmed) {
        this.loadSave = true;
        this.updateStatus(row);
      }
    });
    
  };

  updateStatus(row)
  {
    if (row.status_id == 1001) {
      this.timezoneModel.Id = row.timezone_id;
      this.timezoneModel.timeZone = row.display_name;
      this.timezoneModel.status = "1002";
      this.managetimezoneService.addeditTimezone(this.timezoneModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.getListingGridData();
          this.showaddTimeZoneModel.hide();
          this.loadSave = false;
          this.toaster.success("Status has been updated successfully.");

        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      })
    }
    else 
    {
      this.timezoneModel.Id = row.timezone_id;
      this.timezoneModel.timeZone = row.display_name;
      this.timezoneModel.status = "1001";
      this.managetimezoneService.addeditTimezone(this.timezoneModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.getListingGridData();
          this.showaddTimeZoneModel.hide();
          this.loadSave = false;
          this.toaster.success("Status has been updated successfully.");

        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      })
    }
  }
}
