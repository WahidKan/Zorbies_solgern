import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatemanagementService } from './statemanagement.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-state-management',
  templateUrl: './state-management.component.html',
  styleUrls: ['./state-management.component.scss']
})
export class StateManagementComponent implements OnInit {
  pagedData: any = {
    pager: {},
    data: []     
  };
  loading = false;
  sortDir = 'desc';
  sortColumn = 'module_name';
  listFilter = '';
  searchTxt = '';
  lstPageSize: any
  pageSizeValue: number;
  loginuserid: any;

  loadSave: boolean = false;
  constructor(private statemanagementService: StatemanagementService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) { }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
  }
  refresh() {
    this.loading = true;
    this.statemanagementService.GetStateManagementList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.statemanagementService.pagedData;
      // console.log('pagedData',this.pagedData);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  edit(row: any) {
    // console.log('row', row);
    //this.router.navigate([item.widgetRoute], { queryParams: obj  });
    //this.router.navigate(['configurationsetting/stageconfig'], { queryParams: { id: id } });

    this.router.navigate(['statemanagement/add'], { queryParams: { moduleid: row.module_id, 'submoduleid': row.sub_module_id } });
  }
  ResetSearch() {
    this.loading = false;
    this.sortDir = 'desc';
    this.sortColumn = 'module_name';
    this.listFilter = '';
    this.searchTxt = '';
    this.refresh();    
  }

  search() {

  }
  updateFilter(e) {

  }
  onSort(e) {

  }
  popUpOpen() {

  }
  setPage(e) {

  }
}
