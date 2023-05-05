import { Component, OnInit, ViewChild } from '@angular/core';
import { AnnouncementService } from './announcement.service';
import { CommonService, Master, ModuleList } from '../shared/common.service';

import { FormGroup, NgForm, NgSelectOption } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  @ViewChild('userTypeSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('table', { static: false }) table: DatatableComponent;
  UserType: Observable<any>;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  // modulePermission: ModuleList;
  loadSave = false;
  sortDir = 'desc';
  sortColumn = 'CREATED_AT';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  companyId: any;
  lstPageSize: any
  pageSizeValue: number;
  SelectionType = SelectionType;
  selected = [];
  currentPage: number;
  totalRecords: any;
  modulePermission: any[] = [];

  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  announcementId: any;
  contentHeader: object;
  constructor(private announcementService: AnnouncementService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    this.announcementId = "";
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);




    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'ANNOUNCEMENTADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'ANNOUNCEMENTUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'ANNOUNCEMENTDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
    });
    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
  }
  ngOnInit() {
    this,this.loadSave = true;
    this.pageSizeValue = 10;
    this.currentPage = 1;
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.search();

    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Announcement',
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
            name: 'Manage Announcement',
            isLink: false
          }

        ]
    };
  }

  SetUserType(utype: any) {
    this.searchUserType = utype;
    this.search();
  }

  restddl() {
    this.searchUserType = '';
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onChange($event) {
    this.loadSave = true;
    this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.announcementService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }


  search() {
    this.loadSave = true;
    this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.announcementService.pagedData;
      this.loadSave = false;

    }, error => {
      this.loadSave = false;
    });
  }

  reset() {
    this.table.selected = [];
    this.table.sorts = [];
    this.loadSave = true;
    this.listFilter = '';
    this.searchUserType = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CREATED_AT';
    this.pageSizeValue = 10;
    this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, 0, 10).subscribe(response => {
      this.pagedData = this.announcementService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  setPage($event) {
    this.loadSave = true;
    this.currentPage = $event.page - 1;
    this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.announcementService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loadSave = true;
    this.currentPage = 0;
    this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.announcementService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  refresh() {
    this.loadSave = true;
    this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.announcementService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }
  onSelect({ selected }) {
    ;
    if (this.announcementId == "" || this.announcementId == null || this.announcementId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      for (let i = 0; i < selected.length; i++) {
        this.announcementId += selected[i].ID.toString() + ",";
      }
    }
    else {
      this.announcementId = null;
      this.announcementId = "";
      for (let i = 0; i < selected.length; i++) {
        this.announcementId += selected[i].ID.toString() + ",";
      }
    }
  }
  onActivate(event) {
  }
  remove() {
    if (this.announcementId != null && this.announcementId != "") {
      const message = `Are you sure you want to delete Announcement(s)?`;
      this.dialogService.confirm('Delete Announcement(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.announcementService.deleteMultipleAnnouncements(this.announcementId).subscribe(r => {
            this.toaster.success(`Announcement(s) has been deleted successfully.`);
            this.announcementId = "";
            this.selected = [];
            this.search();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }
  DeleteAnnouncement(row: any) {
    const message = `Are you sure you want to delete Announcement "${row.TITLE}"?`;
    this.dialogService.confirm('Delete Announcement ', message).subscribe(confirmed => {
      if (confirmed) {
        this.announcementService.delete(row.ID).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.refresh();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }
  disable(row) {
    const message = `Are you sure you want to disable this Announcement "${row.TITLE}"?`;
    this.dialogService.confirm('Disable Announcement', message).subscribe(confirmed => {
      if (confirmed) {
        this.announcementService.changeStatus(row.ID, row.STATUSID).subscribe(r => {
          this.refresh();
          this.toaster.success(`"${row.TITLE}" has been disabled successfully `);
        }, error => {
        });
      }
    });
  }
  enable(row) {
    const message = `Are you sure you want to enable this Announcement  "${row.TITLE}"?`;
    this.dialogService.confirm('Enable Email Template', message).subscribe(confirmed => {
      if (confirmed) {
        this.announcementService.changeStatus(row.ID, row.STATUSID).subscribe(response => {
          this.refresh();
          this.toaster.success(`"${row.TITLE}" has been enabled successfully`);
        }, error => {
        });
      }
    });
  }
}
