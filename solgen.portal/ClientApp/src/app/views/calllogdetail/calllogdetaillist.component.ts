import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorktypeService } from '../worktype/worktype.service';
import { CommonService } from '../shared/common.service';
import { FormBuilder } from '@angular/forms';
import { CalllogdetailService } from './calllogdetail.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModalDirective } from 'ngx-bootstrap';
/*import { UtcDateTimeToLocalPipe } from '../../pipes/utctolocal.pipe';*/

/*import { UtcDateTimeToLocalPipe } from '../../pipes/utctolocal.pipe';*/

@Component({
  selector: 'app-calllogdetaillist',
  templateUrl: './calllogdetaillist.component.html',
  styleUrls: ['./calllogdetaillist.component.scss']
})
export class CalllogdetaillistComponent implements OnInit {
  @ViewChild('userTypeSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('userTypeSelectContact', { static: false }) userTypeSelectContact: NgSelectComponent; //#userTypeSelectRecaoding
  @ViewChild('userTypeSelectVendor', { static: false }) userTypeSelectVendor: NgSelectComponent;
  @ViewChild('userTypeSelectRecaoding', { static: false }) userTypeSelectRecaoding: NgSelectComponent;
  @ViewChild('audioModel', { static: false }) audioModel: ModalDirective;
  lstCallLog: any = {
    pager: {},
    data: []
  };
  @Input() offset: number;
  sortDir = 'Desc';
  audioSrc: any;
  sortColumn = 'StartTime';
  isAudio = false;
  modalTitle: any;
  fileNameDownLoad: any;
  VendorList: any;
  searchTxt: any;
  rowsForExport = [];
 pagedDataForImport: any = {
  pager: {},
  data: []
};
  searchText: any = '';
  lstRecoading: any;
  len: number;
  field_code: any;
  listFilter = '';
  pageSizeValue: number = 1;
  pageSizeValueData: number = 15;
  lstPageSize: any
  //field_code: any;
  pageSize: any = 15;
  tableName = 'tblworktype'
  loading = false;
  isDelete: boolean = false;
  accountId: any = null;
  contactId: any = null;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  modulePermission: any[] = [];
  deleteId: any;
  From: any;
  lstAccountList: any;
  To: any;
  lstContactList: any;
  custom_field_id: any;
  currentPage: number;
  hasRecaoding: any = null;
  isExport = false;
  fromNumber: any = '';
  totalPageSizeForReport: any;
  ToNumber: any = '';
  selected = [];
  vendor: any = null;
  ScrollstAccountList: any;
  ScrollstContactList: any;
  SelectionType = SelectionType;
  loadSave = false;
  contentHeader: object;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private calllogdetailService: CalllogdetailService,
    private toaster: ToastrService,
    private router: Router) {

  }

  ngOnInit() {
    this.pageSize = 15;
    this.getPageSizes();
    this.GetQuestionTypes();
    this.getRecoarding();
    this.getAccountList();
    this.getContactList();
    this.SearchCallLogDetail();
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Call Log Detail',
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
             name: ' Call Log Detail',
             isLink: false
           }
  
         ]
     };
   }


  SearchCallLogDetail() {
    this.loadSave = true;
    let data = this.To;
    let recaordingValue;
    if (this.hasRecaoding == null) {
       recaordingValue = 2
    }
    else {
      recaordingValue = this.hasRecaoding;
    }
    this.calllogdetailService.GetCallLogDetilList(this.accountId, this.contactId, this.vendor, recaordingValue, this.fromNumber, this.ToNumber, this.From, this.To, this.sortColumn, this.sortDir, this.pageSizeValue, this.pageSize, this.isExport).subscribe(resp => {

      // console.log("dataresp", resp)
      if (this.hasRecaoding=='2') {
        this.hasRecaoding = null;
      }
      this.lstCallLog = resp;
      this.totalPageSizeForReport = this.lstCallLog.pager.totalItems;
      //this.CoomunicationCounts = resp.pager.totalItems;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
    
  }

  reset() {
    this.loadSave = true;
    this.accountId = null;
    this.contactId = null;
    this.vendor = null;
    this.hasRecaoding = null;
    this.fromNumber = "";
    this.ToNumber = "";
    this.getAccountList();
    this.getContactList();
    this.getRecoarding();
    this.pageSizeValueData = 15;
    this.sortDir = 'asc';
    this.sortColumn = 'Start Time';
    this.currentPage = 1
    this.vendor = null;
    this.userTypeSelect.clearModel();
    this.From = null;
    this.To = null;
    this.userTypeSelectContact.clearModel();
    this.userTypeSelectVendor.clearModel();
    this.userTypeSelectRecaoding.clearModel();
    this.pageSizeValue = 1;
    this.pageSize = 15;
    this.SearchCallLogDetail();
    //this.loadSave = false;
  }
  searchToNumber(event) {
   
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.loadSave = true;
      this.ToNumber = event.target.value;
      this.pageSizeValue = 1;
      this.SearchCallLogDetail();
    }
    //this.loadSave = false;
  }

  searchFromNumber(event) {
    
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.loadSave = true;
      this.fromNumber = event.target.value;
      this.pageSizeValue = 1;
      this.SearchCallLogDetail();
    }
    this.loadSave = false;
  }
  //getenterKeyData() {
  //  let keycode = (event.keyCode ? event.keyCode : event.which);
  //  if (keycode === 13 || keycode === '13') {
  //    this.SearchServiceAppointmentReport();
  //  }
  //}
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  get curPage(): number {
    return this.offset;
  }

  onChange($event) {
    this.loadSave = true;
    this.pageSize = this.pageSizeValueData;
    this.pageSizeValue = 1;
    this.SearchCallLogDetail();
    //this.loadSave = false;
  }

  setCallLogPageNo($event) {
    ;
    this.loadSave = true;
    this.pageSizeValue = $event.page;
   // var ab = $event.page;
    // this.currentPage = ab;
   // this.pageSizeValue = 1;
    //this.curPage = ab;
    //this.offset = 1;
    this.SearchCallLogDetail();
    //this.loadSave = false;

  }

  onCallLogSort($event) {
    ;
    this.loadSave = true;
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageSizeValue = 1;
    this.SearchCallLogDetail();
    //this.loadSave = false;
  }

  getAccountList() {
    this.commonService.getMasterItemsList('Account').subscribe((result: any) => {
      this.lstAccountList = this.commonService.masters;
      // console.log("lstAccountList", this.lstAccountList);
    })
  }

  getContactList() {
    this.commonService.getMasterItemsList('CallLogContact').subscribe((result: any) => {
      this.lstContactList = this.commonService.masters;
      // console.log("contact", this.lstContactList);
    })
  }
  restContactddl() {
    this.contactId = null;
    this.getContactList();
  }
  restAccountddl() {
    this.accountId = null;
    this.getAccountList();
  }
  restVendorddl() {
    this.VendorList();
    this.vendor = null;
  }
  restRecoadingddl() {
    this.getRecoarding();
    this.hasRecaoding = null;
  }
  onScrollToEndContact(dataList: any, code: any) {
    this.fetchMoreContact(dataList, code);
  }
  onScrollToEnd(dataList: any, code: any) {
    this.fetchMore(dataList, code);
  }
  private fetchMoreContact(dataList: any, code: any) {
    // console.log("e", dataList);
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.field_code = code;
    this.len = this.lstContactList.length;
    this.custom_field_id = 0;
    //this.field_code = dataList[j].field_code;
    // let data = (dataList[j].select_options as any[]);
    //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
    this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.ScrollstContactList = this.commonService.customFieldsListData;
      this.lstContactList = (this.lstContactList).concat(this.ScrollstContactList);

    })
  }

  onKeyContact(e: any, dataList: any, code: any) {
    this.len = 0
    this.field_code = code;
    this.custom_field_id = 0;//dataList[j].custom_field_id;
    //this.field_code = //dataList[j].field_code;
    this.searchText = e.target.value;
    this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.ScrollstContactList = this.commonService.customFieldsListData;
      // console.log('scrollDataList:', this.ScrollstAccountList);
      (this.lstContactList) = this.ScrollstContactList;
    })
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

  downloadFileSharePoint(fileName) {

    this.loadSave = true;
    this.fileNameDownLoad = fileName;
    this.calllogdetailService.ClickToDownload(fileName, this.accountId).subscribe((result: any) => {
      // console.log("result blob1", result);

      var fileName = this.fileNameDownLoad.split("/")[this.fileNameDownLoad.split("/").length - 1];

      var file = new Blob([result], { type: result.type });
      saveAs(file, fileName);
      this.loadSave = false;
    },
      error => {
        this.loadSave = false;
      });


  }
  CloseAudio() {
    this.audioSrc = "";
    this.isAudio = true;
    this.audioModel.hide();
  }
  ClickToPlay(row) {
    this.modalTitle = "audio Player";

    if (row.Vendor == 'Twilio') {
      //// console.log(baseUrl);
      this.isAudio = true;
      this.audioSrc = row.fileUrl;
      this.audioModel.show();
    }
    else {
      this.isAudio = false;
      const width = 500;
      const height = 380;

      const left = Number((screen.width / 2) - (width / 2));
      const top = Number((screen.height / 2) - (height / 2));

      const winFeatures = 'directories=0,titlebar=0,toolbar=0, location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;

      const audiowindow = window.open(row.fileUrl, 'Audio Player', winFeatures);

      if (window.focus) audiowindow.focus();
    }


  }

  GetQuestionTypes() {
    let vendor = [{ text: "Twilio", value: "Twilio" }, { text: "Ring Central", value: "Ring Central" }];
    this.VendorList = vendor;
  };

  getRecoarding() {
    let vendors = [{ text: "Yes", value: "1" }, { text: "No", value: "0" }];
    this.lstRecoading = vendors;
  }

  ExportTOExcel() {
    
    this.loadSave = true;
    this.rowsForExport = [];
    var ExcelSheetFileName = "Call Log";
    let recaordingValue;
    if (this.hasRecaoding == null) {
      recaordingValue = 2
    }
    else {
      recaordingValue = this.hasRecaoding;
    }
    this.calllogdetailService.GetCallLogDetilList(this.accountId, this.contactId, this.vendor, recaordingValue, this.fromNumber, this.ToNumber, this.From, this.To, this.sortColumn, this.sortDir, this.pageSizeValue, this.pageSize, true).subscribe(resp => {

      this.pagedDataForImport = resp;
      //if (this.pagedDataForImport.data.length > 0) {
      //  // console.log("rowsForExport", this.pagedDataForImport.data)
      //  
      //  this.commonService.ExportData(this.pagedDataForImport.data, "Excel", ExcelSheetFileName, null);

      //}
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Account Name': itm.accountName,
            'Contact Name': itm.contactName,
            'From Name': itm.FromName,
            'Vendor': itm.Vendor,
            'Result': itm.Result,
            'To Phone Number': itm.ToPhoneNumber,
            'From Phone Number': itm.FromPhoneNumber,
            'Start Time': itm.StartTime,
            //'Start Time': this.dateTimeToLocal.transform(itm.StartTime == '' ? null : itm.StartTime, ''),
            'Duration(Sec)': itm.Duration,
            'Call Type': itm.CallType,
            'Direction': itm.Direction,
            'Action': itm.Action,
            'Location': itm.Location,
            'FromExtensionId': itm.FromExtensionId
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, "Excel", ExcelSheetFileName, null);
      }
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
    this.loadSave = false;
  }

  generatePdf() {
    
    this.loadSave = true;
    this.rowsForExport = [];
    var ExcelSheetFileName = "Call Log";
    let recaordingValue;
    if (this.hasRecaoding == null) {
      recaordingValue = 2
    }
    else {
      recaordingValue = this.hasRecaoding;
    }
    this.calllogdetailService.GetCallLogDetilList(this.accountId, this.contactId, this.vendor, recaordingValue, this.fromNumber, this.ToNumber, this.From, this.To, this.sortColumn, this.sortDir, this.pageSizeValue, this.pageSize, true).subscribe(resp => {

      this.pagedDataForImport = resp;
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Account Name': itm.accountName,
            'Contact Name': itm.contactName,
            'From Name': itm.FromName,
            'Vendor': itm.Vendor,
            'Result': itm.Result,
            'To Phone Number': itm.ToPhoneNumber,
            'From Phone Number': itm.FromPhoneNumber,
            'Start Time': itm.StartTime,
            //'Start Time': this.dateTimeToLocal.transform(itm.StartTime, ''),
            'Duration(Sec)': itm.Duration,
            'Call Type': itm.CallType,
            'Direction': itm.Direction,
            'Action': itm.Action,
            'Location': itm.Location,
            'FromExtensionId': itm.FromExtensionId
          });
        }
        
        this.commonService.ExportData(this.rowsForExport, 'PDF', "Call Log", "Large");
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
    this.loadSave = false;
  }
}
