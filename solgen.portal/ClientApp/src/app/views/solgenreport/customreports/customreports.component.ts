import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomreportsService } from './customreports.service';
import { CommonService, LoanApplicationReportModel } from '../../shared/common.service';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
// import { NgxIconPickerOption } from 'ngx-icon-pickr';



@Component({
  selector: 'app-customreports',
  templateUrl: './customreports.component.html',
  styleUrls: ['./customreports.component.scss']
})
export class CustomreportsComponent implements OnInit {
  @Input() offset: number;
  @ViewChild('addReportModel', { static: false }) addReportModelPopup: ModalDirective;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  txtFilter: string = "";
  submodulelist: any;
  loadSave: boolean = false;
  subModuleSelectedValue: any;
  columndata: any;
  loading: boolean = false;
  sortColumn = 'created_on';
  sortDir = 'desc';
  curPage: number = 1;
  pageSizeValue: number = 15;
  listFilter = '';
  lstPageSize: any;
  totalRecords: any;
  selected = [];
  deleteId: any;
  SelectionType = SelectionType;
  tableName = 'tblCustomReports';
  contentHeader: object;
  loginuserid: any;
  companyId: number;
  loanApplicationReportModel: LoanApplicationReportModel = new LoanApplicationReportModel();
  companyType: string;


  // name = 'Ngx Icon Picker';
  // value = 'fa fa-icon fa-star';
  // option: NgxIconPickerOption = {
  //   iconSets: [
  //     {
  //       name: 'mdi',
  //       css:
  //         'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.5.95/css/materialdesignicons.css',
  //       prefix: 'mdi-',
  //       displayPrefix: ''
  //     }
  //   ]
  // };

  constructor(private fb: FormBuilder,
              private _customreportsService: CustomreportsService,
              private commonService: CommonService,
              private dialogService: ConfirmationDialogService,
              private toaster: ToastrService) { }

  ngOnInit() {
    var data = this.commonService.getLoggedInName.value;
    debugger
    this.loginuserid = data.id;
    this.companyId = data.companyId;
    this.loanApplicationReportModel.companyType = this.companyType = data.companyType;

    this.getPageSizes();
    this.OnSearch();
    this.curPage = 1;
    
this.initBreadCrumb();
}

initBreadCrumb() {
   this.contentHeader = {
     headerTitle: 'Manage Dynamic Reports',
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
           name: 'Manage Dynamic Reports',
           isLink: false
         }

       ]
   };
 }

  searchReports(event) {
    ;
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.OnSearch();
    }
  };

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  };

  OnSearch() {
    ;
    this.selected = [];
    this.loading = true;
    this._customreportsService.getAllReportList(this.sortColumn, this.sortDir, this.curPage, this.pageSizeValue, this.listFilter, this.companyType).subscribe(response => {
      ;
      this.columndata = [];
      this.columndata = response.data;
      this.loading = false;
      if (response.data.length > 0) {
        this.totalRecords = this.columndata[0].total_records;
      } else {
        this.totalRecords = 0;
      }
      this.offset = this.curPage;
    }, error => {
      this.loading = false;
    });
    //this.refresh();
  };

  resetFilter() {
    ;
    this.table.selected = [];
    this.table.sorts = [];
    this.loading = true;
    this.listFilter = '';
    this.txtFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'created_on';
    this.pageSizeValue = 10;
    this.curPage = 1;
    this.selected = [];
    this.deleteId = null;
    this.OnSearch();
    //this.selectedValue = null;
    //this.module_id = 0;
    //this.subModuleSelectedValue = null;
    //this.subModuleId = 0;

    //this.layoutTypeId = null;
    //this.deviceTypeId = null;
    //this.txtFilter = null;
    //this.refresh();
  };



  deleteAllReport() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete all the selected Report(s)?`;
      this.dialogService.confirm('Delete Report(s)', message).subscribe(confirmed => {
        if (confirmed) {
          ;
          this.commonService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Selected Report(s) has been deleted successfully.`);
            this.deleteId = "";
            this.selected = [];
            this.OnSearch();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  };

  showAddReportPopup() {
    ;
    this.addReportModelPopup.show();
  };

  closeAddReportPopup() {

  };

  getSubmoduleList() {
    //this.commonService.GetModulesNameList(this.module_id).subscribe(response => {
    //  if (this.module_id == null || this.module_id == 0) {
    //    this.modulelist = JSON.parse(this.customLayoutService.customFieldsList).module;
    //    this.modulelistPopUP = JSON.parse(this.customLayoutService.customFieldsList).module;
    //  } else {
    //    this.submodulelistPopUP = JSON.parse(this.customLayoutService.customFieldsList).submodule;
    //  }
    //  this.loadSave = false;
    //}, error => {
    //  this.loadSave = false;
    //})
  };

  resetSubModule() {
    this.subModuleSelectedValue = null;
  };

  addReportModel = this.fb.group({
    reportName: [null, Validators.required],
    submoduleid: [null, Validators.required],
    reportDesc: [null]
  });


  get reportName() { return this.addReportModel.get('reportName'); }
  get submoduleid() { return this.addReportModel.get('submoduleid'); }
  get reportDesc() { return this.addReportModel.get('reportDesc'); }

  saveReport() {
    
  };

  closeReport() {
    this.addReportModelPopup.hide();
  };

  onSelect({ selected }) {
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
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
  };

  onChange($event) {
    this.curPage = 1;
    this.OnSearch();
  };

  setPage($event) {
    ;
    this.loading = true;
    var ab = $event.page;
    this.curPage = ab;
    this.OnSearch();
  };

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.OnSearch();
  };

  deleteReport(row: any) {
    ;
    const message = `Are you sure you want to delete the report "${row.report_name}"?`;
    this.dialogService.confirm('Delete Report ', message).subscribe(confirmed => {
      if (confirmed) {
        ;
        this.commonService.DeleteRecords(row.Id, this.tableName).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success('Report has been deleted successfully.');
            this.OnSearch();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  };




}
