import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { ModuleList, CommonService } from '../shared/common.service';
import { CompanyserviceService } from './companyservice.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.scss']
})
export class CompanylistComponent implements OnInit {
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  UserType: Observable<any>;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  modulePermission: ModuleList;
  SelectionType = SelectionType;
  conId: any;
  selected = [];
  loading = false;
  sortDir = 'desc';
  sortColumn = 'CreatedOn';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';

  lstPageSize: any
  pageSizeValue: number;
  loadSave: boolean = false;
  displayCheck;

  constructor(private companyserviceService: CompanyserviceService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    this.commonService.getMasterItemsList("manageuser_usertype_add").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    // // console.log("modulePermission",  this.modulePermission);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });

  }
  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.search();
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  search() {
    this.loading = true;
    this.companyserviceService.GetCompanyList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.companyserviceService.pagedData;
      //this.displayCheck(this.pagedData);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onActivate(event) {
  }

  reset() {
    
    this.table.sorts = [];
    this.loading = true;
    this.listFilter ='';
    this.sortDir = 'desc';
    this.sortColumn = 'companyCreated';
    this.pageSizeValue = 10;
    this.companyserviceService.GetCompanyList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.companyserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  setPage($event) {
    this.loading = true;
    var ab = $event.page - 1;
    this.companyserviceService.GetCompanyList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.companyserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.companyserviceService.GetCompanyList(this.listFilter,this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.companyserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  onChange($event) {
    this.loading = true;
    this.companyserviceService.GetCompanyList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.companyserviceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  onSelect({ selected }) {
    
    if (this.conId == "" || this.conId == null || this.conId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].asociatedUser !== 1) {
          this.conId += selected[i].CompanyId.toString() + ",";
        }
      }

    }
    else {
      this.conId = null;
      this.conId = "";
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].asociatedUser !== 1) {
          this.conId += selected[i].CompanyId.toString() + ",";
        }
      }
    }
  }

  remove() {
    if (this.conId != null && this.conId != "") {
      const message = `Are you sure you want to delete Company(s)?`;
      this.dialogService.confirm('Delete Company(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.companyserviceService.DeleteCompanys(this.conId).subscribe(r => {
            this.toaster.success(`Company(s) has been deleted successfully.`);
            this.conId = "";
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

  DeleteCompany(row: any) {
    const message = `Are you sure you want to delete Company "${row.CompanyName}"?`;
    this.dialogService.confirm('Delete Company', message).subscribe(confirmed => {
      if (confirmed) {

        this.companyserviceService.DeleteCompanys(row.CompanyId.toString()+',').subscribe((response: any) => {
          if (response.statusCode == 200) {
            this.toaster.success(`Company "${row.CompanyName}"" has been deleted successfully`);
            this.search();
          }
          else {
            this.toaster.error(response.responseMessage);
          }
        }, error => {

        });
      }
    });
  }
}
