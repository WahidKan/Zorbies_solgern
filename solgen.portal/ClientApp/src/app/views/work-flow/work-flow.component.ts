import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { RuleEngineService } from '../rule-engine/rule-engine.service';
import { CommonService } from '../shared/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { WorkflowService } from './workflow.service';
import { MappingpopupComponent } from './mappingpopup/mappingpopup.component';
@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styles: [`
.ngx-datatable.scroll-horz .datatable-body{
    overflow-x:hidden !important;
}
`]
})
export class WorkFlowComponent implements OnInit {
  @ViewChild('mapping', { static: false }) Mappingpopup: MappingpopupComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  sortDir = 'desc';
  sortColumn = 'created_at';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  lstPageSize: any
  pageSizeValue: number;
  loanProducts: any;
  loanData: any = null;
  SelectionType = SelectionType;
  selected = [];
  rulId: any;
  loadSave: boolean = false;
  displayCheck: any;
  laPagedData: any = {
    pager: {},
    data: []
  };

  listFiltertext = '';
  searchUserType = '';
  laSortColumn = 'CreatedOn';
  laSortDir = 'desc';
  currentPage: number = 1;
  laPageSizeValue: number = 10;
  loginuserid: any;
  batchid: number = 0;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
  isSuperAdmin:any;

  constructor(private workService: WorkflowService, private commonService: CommonService,
    private dialogService: ConfirmationDialogService, private activeRoute: ActivatedRoute,
    private toaster: ToastrService) {
    this.rulId = "";


    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'MANAGEFLOWADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'MANAGEFLOWUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'MANAGEFLOWDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

  }

  ngOnInit() {
    
    this.isSuperAdmin=localStorage.getItem('isSuperAdmin');
    this.loadSave = true;
    this.pageSizeValue = 10;
    this.refresh();
    this.getLoanProductList();
    this.getPageSizes();

  }

  onClick() {
  }

  updateFilter(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  getLoanProductList() {
    this.workService.getLoanProducts('all').subscribe((m: any) => {
      this.loanProducts = m;
    });
  }

  SetLoanData(event: any) {

    if (typeof event != "undefined") {
      this.loanData = event.Id;
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onChange($event) {
    this.loadSave = true
    this.workService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.workService.pagedData;
      this.loadSave = false
    }, error => {
      this.loadSave = false
    });
  }

  search() {
    this.loadSave = true
    if (typeof this.loanData == 'undefined') {
      this.loanData = null;
    }
    this.workService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.workService.pagedData;
      this.loadSave = false
    }, error => {
      this.loadSave = false
    });
  }

  reset() {
    this.table.sorts = [];
    this.selected = [];
    this.loadSave = true
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'created_at';
    this.pageSizeValue = 10;
    this.workService.getRuleList(this.listFilter, null, this.sortColumn, this.sortDir, 0, 10).subscribe(response => {
      this.pagedData = this.workService.pagedData;
      this.loadSave = false
    }, error => {
      this.loadSave = false
    });
  }

  setPage($event) {
    this.loadSave = true
    this.workService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.workService.pagedData;
      this.loadSave = false
    }, error => {
      this.loadSave = false
    });
  }

  onSort($event) {
    this.loadSave = true;
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.workService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.workService.pagedData;
      this.loadSave = false
    }, error => {
      this.loadSave = false
    });
  }

  refresh() {
    this.loadSave = true;
    this.workService.getRuleList('', this.loanData, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.workService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }

  DeleteFlow(row: any) {

    const message = `Are you sure you want to delete flow "${row.FlowName}"?`;
    this.dialogService.confirm('Delete Flow ', message).subscribe(confirmed => {
      if (confirmed) {
        this.workService.deleteFlow(row.FlowId).subscribe((result: any) => {
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

  onSelect({ selected }) {
    if (this.rulId == "" || this.rulId == null || this.rulId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);

      for (let i = 0; i < selected.length; i++) {
        // if (selected[i].asociatedUser !== 1) {
        this.rulId += selected[i].FlowId.toString() + ",";
        // }
      }

    }
    else {
      this.rulId = null;
      this.rulId = "";
      for (let i = 0; i < selected.length; i++) {
        //if (selected[i].asociatedUser !== 1) {
        this.rulId += selected[i].FlowId.toString() + ",";
        // }
      }
    }
  }
  onSelectLA({ selected }) {
    if (this.rulId == "" || this.rulId == null || this.rulId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);

      for (let i = 0; i < selected.length; i++) {
        // if (selected[i].asociatedUser !== 1) {
        this.rulId += selected[i].FlowId.toString() + ",";
        // }
      }

    }
    else {
      this.rulId = null;
      this.rulId = "";
      for (let i = 0; i < selected.length; i++) {
        //if (selected[i].asociatedUser !== 1) {
        this.rulId += selected[i].FlowId.toString() + ",";
        // }
      }
    }
  }


  remove() {
    if (this.rulId != null && this.rulId != "") {
      const message = `Are you sure you want to delete all the selected flow(s)?`;
      this.dialogService.confirm('Delete Flow(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.workService.deleteRules(this.rulId).subscribe(r => {
            this.toaster.success(`Selected flow(s) has been deleted successfully`);
            this.rulId = "";
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

  disable(row) {

    const message = `Are you sure you want to disable   "${row.FlowName}" flow?`;
    this.dialogService.confirm('Disable Flow', message).subscribe(confirmed => {
      if (confirmed) {
        this.workService.changeStatus(row.FlowId).subscribe(r => {
          this.refresh();
          this.toaster.success(` Flow "${row.FlowName}" has been disabled successfully `);
        }, error => {
        });
      }
    });
  }

  enable(row) {
    const message = `Are you sure you want to enable    "${row.FlowName}" flow?`;
    this.dialogService.confirm('Enable Flow', message).subscribe(confirmed => {
      if (confirmed) {
        this.workService.changeStatus(row.FlowId).subscribe(response => {
          this.refresh();
          this.toaster.success(` Flow "${row.FlowName}" has been enabled successfully`);
        }, error => {
        });
      }
    });
  }

  ruleId: number;


  applyLatestRule() {
  }
  onActivate(event) {

  }

  MappingPopup($event) {
    this.Mappingpopup.show($event);
  }
  setMapping(e: any) {
    this.refresh();
  }
}
