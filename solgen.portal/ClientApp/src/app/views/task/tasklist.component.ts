import { Component, OnInit } from '@angular/core';
import { TasklistService } from './tasklist.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {
  loadSave = false;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  modulePermission: ModuleList;
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
  constructor(private tasklistService: TasklistService, private dialogService: ConfirmationDialogService,
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
  onOpenEdit(id: string) {
    this.router.navigate(['/task/addtask'], { queryParams: { id: id } });

  }
  onDeleteTask(taskId: any) {
    const message = `Are you sure you want to delete Task?`;
    this.dialogService.confirm('Delete Loanterm', message).subscribe(confirmed => {
      this.tasklistService.onDeleteTask(taskId).subscribe((res: any) => {
        this.toaster.success(`Task has been deleted successfully..`);

        this.refresh();
      });
    });
   
  }
  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
  }

  setPage(e) {
    this.refresh(e.page-1);
  }
  refresh(pagenum: number=0) {
    this.loading = true;
    // // console.log(pagenum);
    this.tasklistService.GetTaskList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, pagenum, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.tasklistService.pagedData;
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

  reset() {
    this.listFilter='';
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
}
