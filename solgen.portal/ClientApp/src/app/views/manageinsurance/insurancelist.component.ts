import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Insurance, InsuranceService } from './insurance.service';
import { Master, CommonService, ModuleList } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-insurancelist',
  templateUrl: './insurancelist.component.html'
})
export class InsurancelistComponent implements OnInit {
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  insuranceList: Insurance[];
  lstUserType: Master[];
  modulePermission: ModuleList;
  loginuserid: any;
  loading = false;
  sortDir = 'asc';
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

  constructor(private insuranceService: InsuranceService,
    private commonService: CommonService, private router: Router,
    private toaster: ToastrService, private dialogService: ConfirmationDialogService, private activeRoute: ActivatedRoute) {
    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
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
    this.loading = true;
    this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.table.sorts = [];
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'asc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
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
    this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.insuranceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.insuranceService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  DeleteInsurance(row: any) {
    let message = `${row.Name} is associated with User. So not able to delete ${row.Name}.`;
    if (row.AssociateUser == true) {
      this.toaster.error(message);
      this.loading = false;
      return false;
    }

    message = `Are you sure you want to delete Insurance Company "${row.Name}"?`;
    this.dialogService.confirm('Delete Insurance Company', message).subscribe(confirmed => {
      if (confirmed) {
        this.insuranceService.deleteInsurance(row.InsuranceId).subscribe((result: any) => {
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

  disable(insurance) {
    let message = `${insurance.Name} is associated with User. So not able to Disabled ${insurance.Name}.`;
    if (insurance.AssociateUser == true) {
      this.toaster.error(message);
      this.loading = false;
      return false;
    }

    message = `Are you sure you want to disable Insurance Company "${insurance.Name}"?`;
    this.dialogService.confirm('Disable Insurance Company', message).subscribe(confirmed => {
      if (confirmed) {
        this.insuranceService.changeStatus(insurance.InsuranceId).subscribe(r => {
          this.refresh();
          this.toaster.success(`"${insurance.Name}" has been disabled  successfully`);
        }, error => {
        });
      }
    });
  }

  enable(insurance) {
    const message = `Are you sure you want to enable Insurance Company  "${insurance.Name}"?`;
    this.dialogService.confirm('Enable Insurance Company', message).subscribe(confirmed => {
      if (confirmed) {
        this.insuranceService.changeStatus(insurance.InsuranceId).subscribe(response => {
          this.refresh();
          this.toaster.success(`"${insurance.Name}" has been enabled  successfully`);
        }, error => {
        });
      }
    });
  }


}
