import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { NestreportserviceService, DeliveryDateModel } from './nestreportservice.service';
import { ActivatedRoute } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DateTimeToLocalPipe } from '../../../pipes/datetime.pipe';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Calendar } from '@fullcalendar/core';

@Component({
  selector: 'app-nestreportlist',
  templateUrl: './nestreportlist.component.html',
  styleUrls: ['./nestreportlist.component.scss']
})
export class NestreportlistComponent implements OnInit {
  @ViewChild('Stage', { static: false }) Stage: NgSelectComponent;
  @ViewChild('SetStateClear', { static: false }) SetStateClear: NgSelectComponent;
  @ViewChild('userTypeSelect', { static: false }) userTypeSelect: NgSelectComponent; 
  @ViewChild('Product', { static: false }) Product: NgSelectComponent;
  @ViewChild('AccountStatusSelect', { static: false }) accountStatus: NgSelectComponent;
  @ViewChild('attendancemodel', { static: false }) attendancemodel: ModalDirective;
  //Delivered
  @ViewChild('myStartCalendar', { static: false }) startCalendar: Calendar;
  @ViewChild('Delivered', { static: false }) Delivered: NgSelectComponent;
  lstAccountList: any;
  SearchFromDate: Date
  pagedDataForImport: any = {
    pager: {},
    data: []
  };
  SearchToDate: Date
  public defaultDate: Date = new Date();
  rowsForExport = [];
  From: any;
  userid: any;
  productRequiredIds: any;
  isGraphView = false;
  DeliveryDateModel :DeliveryDateModel=new DeliveryDateModel();
  ScrollstAccountList: any;
  addForm: FormGroup;
  isListingView = true;
  data = [];
  graphData: any;
  loginuserid: any;
  accountStatusId :any=null;
  graphWidgetData: any;
  graphColumnNames: any;
  ScrollstAccountListProduct: any;
  graphColumnData: any;
  lstAccountStatus: any;
  graphOption: any;
  lstProductName: any;
  isDisplay = false;
  lstCurrentStage: any;
  lstState: any; totalPageSize: any;
  listFilter: any = '';
  ScrollstAccountListStage: any;
  // curPage: number = 0;
  len: number;
  field_code: any;
  sortDir = 'desc';
  SearhName: any;
  sortColumn: any = 'AccountName';
  pageSizeValue: number;
  // totalPageSize: any;

  stateId: any =null;
  @Input() offset: number;
  searchText: any;
  pageNumber = 1;
  currentPage: number;
  custom_field_id: any;
  deliveryId: any=null;
  stageId: any = null;
  accountId: any = null;
  lstDelivered: any=null;
  loading = false;
  To: any;
  DeliverDateTo: any;
  DeliverDateFrom: any;
  lstPageSize: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  contentHeader: object;
  constructor(private nestreportserviceService: NestreportserviceService, private commonService: CommonService,
    private fb: FormBuilder, private toaster: ToastrService,
    private routeActivate: ActivatedRoute, private dateTimeToLocal: DateTimeToLocalPipe) {
  }


  ngOnInit() {
    this.SearhName = ""
    this.currentPage = 1;
    this.offset = 1;
    this.pageSizeValue = 15;
    this.getState();
    this.getStageList();
    this.getAccountList();
    this.initForm();
    this.getProductName();
    this.getPageSizes();
    this.SearchNestReport();
    this.GetDeliveryDateTypes();
    this.data = [];
    //setTimeout(function () { this.ShowHorizontalBarGraph(); }, 3000);
    this.getAccountStatus();
    this.initBreadCrumb();
}

initBreadCrumb() {
   this.contentHeader = {
     headerTitle: 'Manage Product Required Report',
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
           name: 'Manage Product Required Report',
           isLink: false
         }

       ]
   };
 }

  getState() {

    this.commonService.getStatesList().subscribe(res => {
      this.lstState = this.commonService.states;
    });
  }
  getAccountList() {
    this.commonService.getMasterItemsList('NestReposrt_Account').subscribe((result: any) => {
      this.lstAccountList = this.commonService.masters;
    })
  }
  getAccountStatus() {
    this.commonService.getMasterItemsList('NestReposrt_AccountStatus').subscribe((result: any) => {
      this.lstAccountStatus = this.commonService.masters;
    })
  }

  searchProductName(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchNestReport();
    }
  }
  SetAccounts(event) {
    this.accountId = event.value;
  }
  SetState(event) {
    this.stateId = event.value;
  }
  SetStage(event) {
    this.stageId = event.value;
  }
  getStageList() {
    this.commonService.getMasterItemsList('NestReposrt_AccountStage').subscribe((result: any) => {
      this.lstCurrentStage = this.commonService.masters;
    })
  }
  getProductName() {
    this.commonService.getMasterItemsList('NestReposrt_ProductName').subscribe((result: any) => {
      this.lstProductName = this.commonService.masters;
    })
  }
  SearchNestReport() {
    if (this.isDisplay == true) {
      this.ShowHorizontalBarGraph();
    }
    else {
      this.loading = true;
      //this.offset = 1;
      this.nestreportserviceService.getNestReport(this.listFilter, this.deliveryId, this.accountId, this.stateId, this.stageId, this.From, this.To, this.accountStatusId, this.DeliverDateFrom, this.DeliverDateTo, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.isDisplay).toPromise().then((response) => {
        this.pagedData = response;
        this.totalPageSize = this.pagedData.pager.totalItems;
        this.totalPageSize = this.pagedData.pager.totalItems;
        this.offset = this.pageNumber;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    }
  }
  reset() {
    this.SearhName = '';
    this.listFilter = '';
    this.getStageList();
    this.getAccountList();
    this.accountId = null; this.stateId = null; this.stageId = null;
    this.sortDir = 'asc';
    this.sortColumn = 'AccountName';
    this.To = null;
    this.DeliverDateFrom = null;
    this.DeliverDateTo = null;
    this.currentPage = 1
    this.Stage.clearModel();
    this.SetStateClear.clearModel();
    this.userTypeSelect.clearModel();
    this.accountStatus.clearModel();
    this.Delivered.clearModel();
    this.Product.clearModel();
    this.From = null;
    this.pageNumber = 1;
    this.pageSizeValue = 15;
    this.SearchNestReport();
  }
  //function is used to manage enter key press on search text box
  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.SearchNestReport();
    }
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  get curPage(): number {
    return this.offset;
  }
  onChange($event) {
    this.pageNumber = 1;
    this.SearchNestReport();
  }
  setPage($event) {
    this.pageNumber = $event.page ;
    var ab = $event.page;
    this.currentPage = ab;
    //this.curPage = ab;
    this.offset = $event.page;
    //this.curPage.setValue($event.page);
    this.SearchNestReport();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNumber =1;
    this.SearchNestReport();
  }
  restStageddl() {
    this.stageId = null;
  }
  restStateddl() {
    this.stateId = null;
  }
  restAccountddl() {
    this.accountId = null;
  }

  restProductddl() {
    this.listFilter = null;
  }
  restDeliveredddl() {
    this.deliveryId = null;
  }
  restAccountStatusddl() {
    this.accountStatusId = null;
  }
  onScrollToEnd(dataList: any, code: any) {
    this.fetchMore(dataList, code);
  }

  private fetchMore(dataList: any, code: any) {
    // console.log("e", dataList);
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.field_code = code;
    this.len = this.lstAccountList.length;
    this.custom_field_id = 0;
    //this.field_code = dataList[j].field_code;
    // let data = (dataList[j].select_options as any[]);
    //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
    this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.ScrollstAccountList = this.commonService.customFieldsListData;
      // console.log('scrollDataList:', this.ScrollstAccountList);
      this.lstAccountList = (this.lstAccountList).concat(this.ScrollstAccountList);

    })
  }

  onKey(e: any, dataList: any, code: any) {
    this.len = 0
    this.field_code = code;
    this.custom_field_id = 0;//dataList[j].custom_field_id;
    //this.field_code = //dataList[j].field_code;
    this.searchText = e.target.value;
    this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.ScrollstAccountList = this.commonService.customFieldsListData;
      // console.log('scrollDataList:', this.ScrollstAccountList);
      (this.lstAccountList) = this.ScrollstAccountList;
    })
  }


  onScrollToEndStage(dataList: any, code: any) {
    this.fetchMoreStage(dataList, code);
  }

  private fetchMoreStage(dataList: any, code: any) {
    // console.log("e", dataList);
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.field_code = code;
    this.len = this.lstCurrentStage.length;
    this.custom_field_id = 0;
    //this.field_code = dataList[j].field_code;
    // let data = (dataList[j].select_options as any[]);
    //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
    this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.ScrollstAccountListStage = this.commonService.customFieldsListData;
      this.lstCurrentStage = (this.lstCurrentStage).concat(this.ScrollstAccountListStage);

    })
  }

  onKeyStage(e: any, dataList: any, code: any) {
    this.len = 0
    this.field_code = code;
    this.custom_field_id = 0;//dataList[j].custom_field_id;
    //this.field_code = //dataList[j].field_code;
    this.searchText = e.target.value;
    this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.ScrollstAccountListStage = this.commonService.customFieldsListData;
      (this.lstCurrentStage) = this.ScrollstAccountListStage;
    })
  }
  onScrollToEndProduct(dataList: any, code: any) {
    this.fetchMoreProduct(dataList, code);
  }

  private fetchMoreProduct(dataList: any, code: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.field_code = code;
    this.len = this.lstCurrentStage.length;
    this.custom_field_id = 0;
    //this.field_code = dataList[j].field_code;
    // let data = (dataList[j].select_options as any[]);
    //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
    this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.ScrollstAccountListProduct = this.commonService.customFieldsListData;
      this.lstProductName = (this.lstProductName).concat(this.ScrollstAccountListProduct);

    })
  }

  onKeyProduct(e: any, dataList: any, code: any) {
    this.len = 0
    this.field_code = code;
    this.custom_field_id = 0;//dataList[j].custom_field_id;
    //this.field_code = //dataList[j].field_code;
    this.searchText = e.target.value;
    this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.ScrollstAccountListProduct = this.commonService.customFieldsListData;
      (this.lstProductName) = this.ScrollstAccountListProduct;
    })
  }
  ExportTOExcel() {
    this.loading = true;
    this.rowsForExport = [];

    this.nestreportserviceService.getNestReport(this.listFilter, this.deliveryId,this.accountId, this.stateId, this.stageId, this.From, this.To, this.accountStatusId, this.DeliverDateFrom, this.DeliverDateTo, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.isDisplay).toPromise().then((response) => {

      this.pagedDataForImport = response;

      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'State Name': itm.stateName,
            'Account Name': itm.AccountName,
            'Account Status': itm.accountStatus,
            'Current Stage': itm.currentStage,
            'Customer Signed Date': this.dateTimeToLocal.transform(itm.CustomerSignedDate, ''),
            'NTP Date': this.dateTimeToLocal.transform(itm.NTPDate, ''),
            'Installation Date': this.dateTimeToLocal.transform(itm.Installation_Date, ''),
            'PTO Date': this.dateTimeToLocal.transform(itm.PTODate, ''),
            'Date Delivered': this.dateTimeToLocal.transform(itm.DateDelivered, ''),
            'Product Name': itm.ProductName,
            'Product Required ID': itm.ProductRequiredNumber
          });
        }
        this.commonService.ExportData(this.rowsForExport, "Excel", "ProductRequiredReport", null);
        this.loading = false;
      }

    }, error => {
      this.loading = false;
    });
  }

  generatePdf() {
    this.loading = true;
    this.rowsForExport = [];
    this.nestreportserviceService.getNestReport(this.listFilter, this.deliveryId, this.accountId, this.stateId, this.stageId, this.From, this.To, this.accountStatusId, this.DeliverDateFrom, this.DeliverDateTo, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.isDisplay).toPromise().then((response) => {
      this.pagedDataForImport = response;

      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'State Name': itm.stateName,
            'Account Name': itm.AccountName,
            'Account Status': itm.accountStatus,
            'Current Stage': itm.currentStage,
            'Customer Signed Date': this.dateTimeToLocal.transform(itm.CustomerSignedDate, ''),
            'NTP Date': this.dateTimeToLocal.transform(itm.NTPDate, ''),
            'Installation Date': this.dateTimeToLocal.transform(itm.Installation_Date, ''),
            'PTO Date': this.dateTimeToLocal.transform(itm.PTODate, ''),
            'Date Delivered': this.dateTimeToLocal.transform(itm.DateDelivered, ''),
            'Product Name': itm.ProductName,
            'Product Required ID': itm.ProductRequiredNumber
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, 'PDF', "ProductRequiredReport", "Large");
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  ShowHorizontalBarGraph() {
    this.loading = true;
    this.data = [];

    this.nestreportserviceService.getNestReport(this.listFilter, this.deliveryId, this.accountId, this.stateId, this.stageId, this.From, this.To, this.accountStatusId, this.DeliverDateFrom, this.DeliverDateTo, this.sortColumn, this.sortDir,
      this.pageNumber, this.totalPageSize, this.isDisplay).toPromise().then((response) => {
        this.pagedData = response;
        this.pagedData.data.forEach(t => {
          if (t.StateName != '' && typeof t.StateName != 'undefined') {
            let obj = {
              StateName: t.StateName,
              TotalRecord: t.TotalRecord
            }
            this.data.push(obj);
          }
        });
        // }
        if (this.data != null) {
          this.graphColumnNames = this.data.map(function (a) {
            return a.StateName;
          });
          var arrayValues: any = [];
          arrayValues = this.data.map(function (a) {
            return parseInt(a.TotalRecord);
          });
          var array: any = [];
          var obj = {
            label: '',
            backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            data: arrayValues
          };
          array.push(obj);
          this.graphWidgetData = {
            labels: this.graphColumnNames,
            datasets: array
          }


          this.graphOption = {
            legend: {
              position: 'bottom'
            }
          }
        }
        this.loading = false;
      });
  }
  generatePdf1() {
    
    if (this.isDisplay == true) {
      this.isDisplay = false;
      this.isGraphView = false;
      this.SearchNestReport();
    }
    else if (this.isDisplay == false) {
      this.isDisplay = true;
      this.isGraphView = true;
      this.ShowHorizontalBarGraph();
    }
    else {
      this.isListingView = true;
      //this.SearchNestReport();
    }
  }

  GetDeliveryDateTypes() {
    this.lstDelivered  = [{ text: "Is Delivered", value: "IsDelivered" },
      { text: "Not Delivered", value: "NotDelivered" }];
  };
  AssignDeliveryDate(row: any) {
    // console.log("row", row);
    
    this.initForm;
    this.productRequiredId.setValue(row.productRequiredId);
    this.productRequiredIds = row.productRequiredId;
    //this.deliveryDate.setValue(row.DateDelivered == null ? null : row.DateDelivered.toString());
    let EDate = (row.DateDelivered == null ? null : new Date(row.DateDelivered));
    this.addForm.patchValue({
      deliveryDate: EDate,
      productRequiredId: row.productRequiredId
    });
    //this.addForm.reset();
    this.attendancemodel.show();
  }
  closeattendancepopup() {
    this.addForm.reset();
    this.attendancemodel.hide();
  }

  private initForm() {
    this.addForm = this.fb.group({
      productRequiredId: [null],
      deliveryDate: [null, Validators.required],
     
    })
  }

  get productRequiredId() { return this.addForm.get('productRequiredId'); }
  get deliveryDate() { return this.addForm.get('deliveryDate'); }

  Save() {
    
    if (this.addForm.valid) {
      this.DeliveryDateModel.productRequiredId = this.productRequiredIds;
      this.DeliveryDateModel.deliveryDate = this.addForm.value.deliveryDate;
  
      this.nestreportserviceService.AddEditDeliveryDate(this.DeliveryDateModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          //this.router.navigate(["/calendar"]);

          this.addForm.reset();
          this.attendancemodel.hide();
          this.SearchNestReport();
        }
        else {
          //this.loadSave = false;
          this.toaster.error(result.responseMessage);

        }
      }, error => {
        //this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  }

  close(event) {
    //this.startCalendar.destroy() = true;
  }

  GetCompareDateTimeResult(sDate, eDate, sTitle, eTitle) {
    ;
    //this.StartDate = sDate;
    //this.EndDate = eDate;
    this.addForm.get('deliveryDate').setValue(sDate);

   

  }
}
