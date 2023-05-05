import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { SolgenQueueService } from '../solgen-queue.service';

@Component({
  selector: 'app-solgen-queue-list',
  templateUrl: './solgen-queue-list.component.html',
  styleUrls: ['./solgen-queue-list.component.scss']
})
export class SolgenQueueListComponent implements OnInit {

  moduleName = '';
  subModuleName = '';
  searchTxt = '';
  listFilter = '';
  listFiltertext = '';
  currentPage: number;
  deleteId: any;
  selected = [];
  loadSave = false;
  sortColumn = 'Id';
  sortDir = 'desc';
  pageSizeValue: number;
  companyId: any;
  offset: number = 1;
  pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any;
  SelectionType = SelectionType;
  constructor(private router: Router,
    private toaster: ToastrService,
    private commonService: CommonService,
    private dialogService: ConfirmationDialogService,
    private route: ActivatedRoute,
    private service: SolgenQueueService) { }

  ngOnInit() {
    this.pageSizeValue = 15;
    this.refresh();
    this.getPageSizes();
  }
  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  onChange($event) {
    this.loadSave = true;
    this.service.GetQueuesList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.service.pagedData;
      this.offset = 1;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }
  search() {
    ;
    this.currentPage = 1;
    this.listFiltertext = '';
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "name like '%" + this.listFilter + "%'";
    }
    this.refresh();
  }
  reset() {
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.refresh();
  }
  setPage($event) {
    this.loadSave = true;
    this.service.GetQueuesList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.service.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }
  getPageSizes() {
    //alert("testf");
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }

  getIsShowColName({ row, column, value }) {
    if (row.StatusId == 1001) {
      return {
        'dispaly-none': true
      };
    }
  }
  onSelect({ selected }) {
    selected = selected.filter(x => x.StatusId != 1001);
    if ((this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined')) {
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
  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete the selected Queue(s)?`;
      this.dialogService.confirm('Delete Queue(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.service.DeleteMultipleQueues(this.deleteId).subscribe(r => {
            this.toaster.success(`Queue(s) has been deleted successfully.`);
            this.deleteId = "";
            this.selected = [];
            this.refresh();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }
  Delete(row: any) {
    ;
    const message = `Are you sure you want to delete Queue "${row.QueueName}"?`;
    this.dialogService.confirm('DELETE QUEUE ', message).subscribe(confirmed => {
      if (confirmed) {
        this.service.DeleteSingleQueue(row.Id).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success("Queue has been deleted successfully.");
            this.refresh();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }
  refresh() {
    this.loadSave = true;
    this.service.GetQueuesList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.service.pagedData;
      this.offset = 1;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }
}
