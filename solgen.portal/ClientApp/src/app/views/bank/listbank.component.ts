import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BankModel, BankService } from './bank.service';
import { ModuleNames, CommonService, ModuleList } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-listbank',
  templateUrl: './listbank.component.html',
  styleUrls: ['./listbank.component.scss']
})
export class ListbankComponent implements OnInit {
  loadSave: boolean = false;
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  bankList: BankModel[];
  modulePermission: ModuleList;
  SearhName: string;
  loading = false;
  sortDir = 'asc';
  sortColumn = 'CreatedOn';
  pageNumber = 0;
  pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageSizeValue: number;
  loginuserid: any;

  constructor(private bankService: BankService, private toaster: ToastrService, private router: Router,
    private commonService: CommonService, private dialogService: ConfirmationDialogService, private activeRoute: ActivatedRoute) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.SearhName = "";
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.SearchBank();
  }

  //New function added
  refresh() {
    this.loading = true;
    this.bankService.getBankList(this.SearhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.bankService.pagedData;
      setTimeout(() => { this.loading = false; }, 2000);
    }, error => {
      this.loading = false;
      })
  }

  SearchBank() {
    this.loading = true;
    this.bankService.getBankList(this.SearhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe((result: any) => {
      this.pagedData = this.bankService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
      });
    
  }

  ResetSearch() {
    this.table.sorts = [];
    this.loading = true;
    this.SearhName = "";
    this.sortDir = 'asc';
    this.sortColumn = 'CreatedOn';
    this.pageNumber = 0;
    this.pageSizeValue = 10;   
    this.bankService.getBankList(this.SearhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.bankService.getBankList;
      setTimeout(() => { this.loading = false; }, 3000);
    }, error => {
      this.loading = false;
    });
    this.SearchBank();
  }

  //function is used to update the status(active,inactive) of vendor
  disable(row) {
    let message = `${row.BankName} is associated with User. So not able to Disabled ${row.BankName}.`;
    if (row.AssociateUser == true) {
      this.toaster.error(message);
      this.loading = false;
      return false;
    }

    message = `Are you sure you want to disable this Bank "${row.BankName}"?`;
    this.dialogService.confirm('Disable Bank ', message).subscribe(confirmed => {
      if (confirmed) {
        this.bankService.setBankStatus(ModuleNames.Bank, row.Id, row.StatusID, "Bank", "disable").subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(`"${row.BankName}" has been disabled successfully`);
            this.SearchBank();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }

  enable(row) {
    const message = `Are you sure you want to enable Bank  "${row.BankName}"?`;
    this.dialogService.confirm('Enable Bank ', message).subscribe(confirmed => {
      if (confirmed) {
        this.bankService.setBankStatus(ModuleNames.Bank, row.Id, row.StatusID, "Bank", "enable").subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(`"${row.BankName}" has been enabled  successfully"`);
            this.SearchBank();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }
  
  //function is used to delete the user
  DeleteBank(row: any) {
    
    let message = `${row.BankName} is associated with User. So not able to delete ${row.BankName}.`;
    if (row.AssociateUser == true) {
      this.toaster.error(message);
      this.loading = false;
      return false;
    }

    message = `Are you sure you want to delete Bank "${row.BankName}"?`;
    this.dialogService.confirm('Delete Bank', message).subscribe(confirmed => {
      if (confirmed) {
        this.bankService.deleteBank(ModuleNames.Bank.toString(), row.Id, "Bank").subscribe((response: any) => {
          if (response.statusCode == 200) {
            this.toaster.success(`Bank "${row.BankName}" has been deleted successfully`);
            this.SearchBank();
            setTimeout(() => { this.loading = false; }, 3000);
          }
          else {
            this.toaster.error(response.responseMessage);
            this.loading = false;
          }
        }, error => {
          this.loading = false;
        });
      }
    });
  }

  //function is used to manage enter key press on search text box
  updateFilter(event) {
    this.SearhName = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchBank();
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($event) {
    this.SearchBank();
  }
  setPage($event) {
    this.pageNumber = $event.page - 1;
    this.SearchBank();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber = $event.page - 1;

    this.SearchBank();
  }

}
