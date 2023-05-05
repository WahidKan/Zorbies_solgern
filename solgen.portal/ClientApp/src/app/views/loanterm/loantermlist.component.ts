import { Component, OnInit } from '@angular/core';
import { ModuleList, CommonService } from '../shared/common.service';
import { LoantermserviceService } from './loantermservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-loantermlist',
  templateUrl: './loantermlist.component.html',
  styleUrls: ['./loantermlist.component.scss']
})
export class LoantermlistComponent implements OnInit {


  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  modulePermission: ModuleList;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'createdon';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  loadSave: boolean = false;

  lstPageSize: any
  pageSizeValue: number;
  constructor(private loantermserviceService: LoantermserviceService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
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

  refresh() {
    this.loading = true;
    this.loantermserviceService.GetLoanTermList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.loantermserviceService.pagedData;
      // // console.log(this.pagedData);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.refresh();
    }

  }
  setPage($event) {
    this.lstPageSize = $event.page - 1;
    this.refresh();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.lstPageSize = $event.page - 1;
    this.refresh();;
  }   
  ResetSearch() {
    this.loading = false;
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.listFilter = '';
    this.searchTxt = '';
    this.refresh();
  }
  add() {
    this.router.navigateByUrl("/loanTerm/loanTermAdd");
  }
  edit(id: any) {
    this.router.navigate(['/loanTerm/editloanTerm', id]);
  }
  delete(Id: any) {
    const message = `Are you sure you want to delete Loanterm?`;
    this.dialogService.confirm('Delete Loanterm', message).subscribe(confirmed => {
      if (confirmed) {
        this.loantermserviceService.DeleteLoanterm(Id).subscribe(r => {
          this.toaster.success(`Loanterm has been deleted successfully..`);

          this.refresh();
        }, error => {
        });
      }
    });
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
}
