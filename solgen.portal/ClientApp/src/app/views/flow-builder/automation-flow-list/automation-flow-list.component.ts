import { ConfirmationDialogService } from './../../shared/confirmation-dialog/confirmation-dialog.service';
import { Component, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { CommonService } from '../../shared/common.service';
import { FlowBuilderService } from '../flow-builder.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-automation-flow-list',
  templateUrl: './automation-flow-list.component.html',
  styleUrls: ['./automation-flow-list.component.scss']
})
export class AutomationFlowListComponent implements OnInit {
  loadSave: boolean = false;
  sortDir: string ='desc';
  sortColumn: string='Id';
  listFilter: string = '';
  page: number=0;
  pageSize: number=15;
  submoduleid: number=4;
  objectname: string='';
  currentPage: any;
  loading: boolean;
  SelectionType = SelectionType;
  pagedData: any = {
    pager: {},
    data: [],
  };
  offset: number;
  deleteId: string;
  selected = [];
  lstPageSize: any;
  isSuperAdmin:any;
  runConditionList: any = [{ value: 1, text: 'User or System Context—Depends on How Flow is Launched' }, { value: 2, text: 'System Context with Sharing—Enforces Record-Level Access' }, { value: 3, text: 'System Context Without Sharing—Access All Data' }];
  constructor(private service: FlowBuilderService,public commonService: CommonService,private dialogService: ConfirmationDialogService,private toaster: ToastrService) { }

  ngOnInit() {
    this.getAutomationFlowList();
    this.getPageSizes();
    this.isSuperAdmin=localStorage.getItem('isSuperAdmin');
  }

  getAutomationFlowList() {
    this.loadSave = true;
    this.service.GetAutomationFlowList(this.sortDir, this.sortColumn, this.page, this.pageSize, this.submoduleid, this.objectname).subscribe(

      res => {
        // console.log(res);
        this.pagedData = {
          data: res.data,
          pager: res.pager,

        };
        this.offset = 1;
        this.loadSave = false;
      },
      (err) => {
        this.loadSave = false;
      }
    )
  }


  refresh() {
    this.loadSave = true;
    this.service.GetAutomationFlowList(this.sortDir, this.sortColumn, this.page, this.pageSize, this.submoduleid, this.objectname).subscribe(
      (response) => {
        this.pagedData = {
          data: response.data,
          pager: response.pager,
        };
        this.loadSave = false;
      },
      (error) => {
        this.loadSave = false;
      }
    );
  }

  setPage($event) {
    
    this.loading = true;
    this.currentPage = $event.page - 1;
    this.page = $event.page - 1;
    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }
  get curPage(): number {
    return this.offset;
  }
  onSelect({ selected }) {
    ;
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].id + ",";
      }
    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].id + ",";
      }
    }
  }

  onChange($event) {
    this.currentPage = 0;
    this.refresh();
  }
  getIsShowColName({ row, column, value }) {
    if (row.FlowObjectId) {
      return {
        'dispaly-none': true
      };
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }
  updateFilter(event) {
    ;
    this.objectname = event.target.value;
    let keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode === 13 || keycode === '13') {
      this.refresh();
    }
  }
  reset() {
    this.page = 0;
    this.pageSize = 15;
    this.objectname = '';
    this.refresh();
  }

  search() {
    ;
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {
      this.objectname = this.listFilter;
    }
    this.refresh();
  }


  deleteAutomationFlow(row) {
    const message = `Are you sure you want to delete the flow "${row.name}"?`;
    this.dialogService.confirm('DELETE FLOW', message).subscribe((confirmed) => {
      if (confirmed) {
        this.loadSave = true;
        this.service.deleteAutomationFlow(row.id).subscribe((result : any) => {
            this.loadSave = false;
            this.toaster.success(`Flow has been deleted successfully.`);
            this.deleteId = '';
            this.refresh();
          },
          (error) => {},
          () => {
            this.loadSave = false;
          }
        );
      }
    });
  }
  onDeleteMultiple() {

    if (this.deleteId) {
      const message = `Are you sure you want to delete all the selected flow(s)?`;
      
      this.deleteId = this.pagedData.data.filter(x => (x.FlowObjectId == false || x.FlowObjectId == null) && this.deleteId.includes(x.id) ).map(x => x.id).join(',');
      this.dialogService.confirm('DELETE FLOW(S)', message).subscribe((confirmed) => {
        if (confirmed) {
          this.loadSave = true;
          this.service.deleteMultipleAutomationFlow(this.deleteId).subscribe((result) => {
              this.loadSave = false;
              this.toaster.success(`Selected Flow(s) has been deleted successfully.`);
              this.deleteId = '';
              this.refresh();
            },
            (error) => { this.loadSave = false;},
            () => {
              this.loadSave = false;
            }
          );
        }
      });
    } else {
      this.toaster.error('Please select at least one row.');
    }
  }

}
