import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { ServiceappointmentreportserviceService } from './serviceappointmentreportservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DateTimeToLocalPipe } from '../../../pipes/datetime.pipe';
//import { forEach } from '@angular/router/src/utils/collection';
import { ServicesappointmentlistComponent } from '../../servicesappointment/servicesappointmentlist.component';
import { AuditchecklistpopupComponent } from '../../servicesappointment/auditchecklistpopup/auditchecklistpopup.component';
import { PreviousRouteServiceService } from '../../shared/previous-route-service.service';
import { Location } from '@angular/common';
import { location } from 'ngx-bootstrap/utils/facade/browser';


@Component({
  selector: 'app-serviceappointmentreportlist',
  templateUrl: './serviceappointmentreportlist.component.html',
  styleUrls: ['./serviceappointmentreportlist.component.scss']
})
export class ServiceappointmenreportlistComponent implements OnInit {



  @ViewChild('worktype', { static: false }) worktype: NgSelectComponent;
  @ViewChild('attchment', { static: false }) attchment: NgSelectComponent;
  @ViewChild('Status', { static: false }) Status: NgSelectComponent;
  @ViewChild('SetStateClear', { static: false }) SetStateClear: NgSelectComponent;
  @ViewChild('userTypeSelect', { static: false }) userTypeSelect: NgSelectComponent;
  @ViewChild('Attchment', { static: false }) Attchment: NgSelectComponent;
  @ViewChild('Product', { static: false }) Product: NgSelectComponent;
  @ViewChild('auditCheckList', { static: false }) auditCheckListModel: AuditchecklistpopupComponent;
  pagedDataForImport: any = {
    pager: {},
    data: []
  };
  rowsForExport = [];
  data = [];
  totalPageSize: any=0;
  serviceAppointmentSearch: any='';
  wareHouse: any = null;
  serviceTerritoryId: any = null;
  sortDir = 'desc';
  SearhName: any;
  sortColumn: any = 'Id';
  pageSizeValue: number;
  workTypeId: any = null;
  AttchmentId: any = null;
  lstAttchment: any;
  lstServiceTerritory: any;
  lstWareHouse: any;
  @Input() offset: number;
  searchText: any;
  pageNumber = 1;
  isShowAttchment: any;
  lstWorkType: any;
  currentPage: number;
  StatusIdChk: any = null;
  loading = false;
  StatusListForCheckList: any;
  
  To: any;
  From: any;
  lstPageSize: any;
  pagedData: any = {
    pager: {},
    data: []
  };

  activatedRoute: any;
  url: any;
  contentHeader: object;

  constructor(private serviceappointmentreportserviceService: ServiceappointmentreportserviceService,
    private commonService: CommonService, private route: ActivatedRoute, private dateTimeToLocal: DateTimeToLocalPipe,
    private auditchecklistpopupComponent: AuditchecklistpopupComponent,
    private previousRouteService: PreviousRouteServiceService,
    private router: Router,
    private location: Location   ) { }

  ngOnInit() {
    this.currentPage = 1;
    this.loading = true;
    this.offset = 1;
   // this.AttchmentId = 2;
    this.pageSizeValue = 15;
    this.getStageList();
    this.GetQuestionTypes();
    this.getPageSizes();
    this.getAttchment();
    this.totalPageSize= 0;

    this.data = [];

    this.route.queryParamMap.subscribe(params => {
      ;
      if (params.keys.length > 0) {
        this.serviceAppointmentSearch = params.get('SaNo');
        this.workTypeId = params.get('Worktype');
        this.serviceTerritoryId = params.get('ServiceTerritory');
        this.From = params.get('From');
        this.To = params.get('To');
        this.StatusIdChk = params.get('Score');
        this.AttchmentId = params.get('Attchment');
        this.wareHouse = params.get('WareHouse');
      }
    });
    this.getserviceTerritory();
    this.getWareHouse();
    this.SearchServiceAppointmentReport();
    this.initBreadCrumb();
    }
    
    initBreadCrumb() {
       this.contentHeader = {
         headerTitle: 'Manage Service Appointment Report',
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
               name: 'Manage Service Appointment Report',
               isLink: false
             }
    
           ]
       };
     }

  searchServiceAppointmentName(event) {
    ;
    this.pageNumber = 1;
    this.serviceAppointmentSearch = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {

      //---Updating Url-------
      this.url = this.router.createUrlTree([], { relativeTo: this.activatedRoute, queryParams: { SaNo: this.serviceAppointmentSearch, Worktype: this.workTypeId, From: this.From, To: this.To, Score: this.StatusIdChk, Attchment: this.AttchmentId, WareHouse: this.wareHouse, ServiceTerritory: this.serviceTerritoryId } }).toString();
      this.location.go(this.url);
    //-------------------------------
      this.SearchServiceAppointmentReport();
    }
  };

  auditChecklistDetailPopup(checkList_Id: number, serviceAppointmentId: number) {
    this.auditCheckListModel.ShowPopup(checkList_Id, serviceAppointmentId,false);
  }

  //auditChecklistDetailPopup(checkList_Id: number, serviceAppointmentId: number) {
  //  //;
  //  this.auditCheckListModel.auditChecklistDetail(checkList_Id, serviceAppointmentId);
  //}

  GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  getStageList() {
    this.commonService.getMasterItemsList('WorkType').subscribe((result: any) => {
      this.lstWorkType = this.commonService.masters;      
      //this.lstWorkType = this.commonService.masters.sort(this.GetSortOrder("text"));
    })
  }
  search() {
    //---Updating Url-------
    this.url = this.router.createUrlTree([], { relativeTo: this.activatedRoute, queryParams: { SaNo: this.serviceAppointmentSearch, Worktype: this.workTypeId, From: this.From, To: this.To, Score: this.StatusIdChk, Attchment: this.AttchmentId, WareHouse: this.wareHouse, ServiceTerritory: this.serviceTerritoryId } }).toString();
    this.location.go(this.url);
    //-------------------------------
    this.pageNumber = 1;
    this.SearchServiceAppointmentReport();
  };

  SearchServiceAppointmentReport() {
    this.loading = true;
    let AttchmentId
    if (this.AttchmentId == null) {
      AttchmentId = 2
      this.isShowAttchment = 2;
    }
    else {
      AttchmentId = this.AttchmentId;
      this.isShowAttchment = this.AttchmentId;
    }
    this.serviceappointmentreportserviceService.getServiceAppointmentReport(this.serviceAppointmentSearch, this.wareHouse, this.serviceTerritoryId, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.From, this.To, this.workTypeId, this.StatusIdChk, AttchmentId, false, this.totalPageSize).toPromise().then((response) => {
      this.pagedData = response;
      // console.log("feswrfe", this.pagedData);
      this.totalPageSize = this.pagedData.pager.totalItems;
      this.offset = this.pageNumber ;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  reset() {
    this.url = this.router.createUrlTree([], { relativeTo: this.activatedRoute }).toString();
    this.location.go(this.url);
    this.SearhName = '';
    this.serviceAppointmentSearch = '';
    this.wareHouse = null;
    this.serviceTerritoryId = null;
    this.sortDir = 'asc';
    this.sortColumn = 'Id';
    this.currentPage = 1
    this.StatusIdChk = null;
    this.worktype.clearModel();
    this.attchment.clearModel();
    this.From = null;
    this.To = null;
    this.Status.clearModel();
    this.AttchmentId = null;
    this.pageNumber = 1;
    this.pageSizeValue = 15;
    this.SearchServiceAppointmentReport();
  }
  restWorkTypeddl() {
    this.workTypeId = null;
  }
  reSetDrp() {
    this.StatusIdChk = null;
  }
  reSetDrpAtt() {
    this.AttchmentId = null;
  }
  //function is used to manage enter key press on search text box
  updateFilter(event) {
    this.serviceAppointmentSearch = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.pageNumber = 1;
      this.SearchServiceAppointmentReport();
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
    this.SearchServiceAppointmentReport();
  }
  setPage($event) {
    this.pageNumber = $event.page;
   // var ab = $event.page - 1;
   // this.currentPage = 1;
    this.offset = $event.page;
    this.SearchServiceAppointmentReport();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    //this.pageNumber = $event.page;
    this.pageNumber = 1;
    this.SearchServiceAppointmentReport();

  }
 
  convertToArrayList(data) {
    let _result: any[] = [];
    if (data) {
      _result = JSON.parse(data) as [];
    }
    return _result;
  }

  convertToArrayListName(data) {
    let _result: any[] = [];
    let _resultReturn: any[] = [];
    if (data) {
      _result = JSON.parse(data) as [];
    }
    _result.forEach(t => {
      let obj = {
        Name: t.Name
      }
      _resultReturn.push(obj);
    })
    let result = _resultReturn.map(function (val) {
      return val.Name;
    }).join(',');
    // console.log("resultCOMMA", result);
    return result;
  }

  convertToArrayListFinalScore(data) {
    let _result: any[] = [];
    let _resultReturn: any[] = [];
    if (data) {
      _result = JSON.parse(data) as [];
    }
    _result.forEach(t => {
      let obj = {
        Name: t.FinalScoreCount + '/' + t.QuestionCount
      }
      _resultReturn.push(obj);
    })
    let result = _resultReturn.map(function (val) {
      return val.Name;
    }).join(',');
    return result;

  }
  auditHistoryEvent() {
    this.SearchServiceAppointmentReport();
  }
  ExportTOExcel() {
    this.loading = true;
    this.rowsForExport = [];
    let AttchmentId
    if (this.AttchmentId == null) {
      AttchmentId = 2;
      this.isShowAttchment = 2;
    }
    else {
      AttchmentId = this.AttchmentId;
      this.isShowAttchment = this.AttchmentId;
    }
    this.serviceappointmentreportserviceService.getServiceAppointmentReport(this.serviceAppointmentSearch, this.wareHouse, this.serviceTerritoryId, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.From, this.To, this.workTypeId, this.StatusIdChk, AttchmentId, true, this.totalPageSize).toPromise().then((response) => {
      this.pagedDataForImport = response;
      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Service Appointment Number': itm.AppointmentNumber,
            'Work Order Number': itm.WorkOrderNumber,
            'Work Type': itm.WorkType,
            'Status': itm.AppStatus,
            'Schedule Start Time': this.dateTimeToLocal.transform(itm.SchedStartTime, ''),
            'Schedule End Time': this.dateTimeToLocal.transform(itm.SchedEndTime, ''),
            'Resource Name': itm.ResourceName,
            'Customer Name': itm.contactPerson,
            'Check List Name': this.convertToArrayListName(itm.CheckListNames),
            'Final Score': this.convertToArrayListFinalScore(itm.CheckListNames),
            'Overall Score': itm.OverallScore + "(" + itm.OverallScoreText + ")",
          });
        }
        this.commonService.ExportData(this.rowsForExport, "Excel", "ServiceAppointmenReport", null);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    });
  }

  generatePdf() {
    ;
    this.loading = true;
    this.rowsForExport = [];
    let AttchmentId
    if (this.AttchmentId == null) {
      AttchmentId = 2
      this.isShowAttchment = 2;
    }

    else {
      AttchmentId = this.AttchmentId;
      this.isShowAttchment = this.AttchmentId;
    }
    this.serviceappointmentreportserviceService.getServiceAppointmentReport(this.serviceAppointmentSearch, this.wareHouse, this.serviceTerritoryId, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.From, this.To, this.workTypeId, this.StatusIdChk, AttchmentId, true, this.totalPageSize).toPromise().then((response) => {
      this.pagedDataForImport = response;

      if (this.pagedDataForImport.data.length > 0) {
        for (let itm of this.pagedDataForImport.data) {
          this.rowsForExport.push({
            'Service Appointment Number': itm.AppointmentNumber,
            'Work Order Number': itm.WorkOrderNumber,
            'Work Type': itm.WorkType,
            'Status': itm.AppStatus,
            'Schedule Start Time': this.dateTimeToLocal.transform(itm.SchedStartTime, ''),
            'Schedule End Time': this.dateTimeToLocal.transform(itm.SchedEndTime, ''),
            'Resource Name': itm.ResourceName,
            'Customer Name': itm.contactPerson,
            'Check List Name': this.convertToArrayListName(itm.CheckListNames),
            'Final Score': this.convertToArrayListFinalScore(itm.CheckListNames),
            'Overall Score': itm.OverallScore + "("+ itm.OverallScoreText+ ")",
          });
        }
        this
        this.commonService.ExportData(this.rowsForExport, 'PDF', "ServiceAppointmenReport", "Large");
      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  //DownloadCSV() {
  //  this.loading = true;
  //  this.rowsForExport = [];
  //  this.serviceappointmentreportserviceService.getServiceAppointmentReport(this.serviceAppointmentSearch, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.From, this.To, this.workTypeId).toPromise().then((response) => {
  //    this.pagedDataForImport = response;

  //    if (this.pagedDataForImport.data.length > 0) {
  //      for (let itm of this.pagedDataForImport.data) {
  //        this.rowsForExport.push({
  //          'Service Appointment Number': itm.AppointmentNumber,
  //          'Work Order Number': itm.WorkOrderNumber,
  //          'Work Type': itm.WorkType,
  //          'Schedule Start Time': this.dateTimeToLocal.transform(itm.SchedStartTime, ''),
  //          'Schedule End Time': this.dateTimeToLocal.transform(itm.SchedEndTime, ''),
  //          'Resource Name': itm.ResourceName,
  //          'Check List Name': this.convertToArrayListName(itm.CheckListNames),
  //          'Final Score': this.convertToArrayListFinalScore(itm.CheckListNames)
  //        });
  //      }
  //      this
  //      this.commonService.ExportData(this.rowsForExport, 'CSV', "ServiceAppointmenReport", "Large");
  //    } else { }
  //    this.loading = false;
  //  }, error => {
  //    this.loading = false;
  //  });
  //}

  GetQuestionTypes() {
    let statusList = [{ text: "Pending", value: "Pending" }, { text: "Fail", value: "Fail" }
      , { text: "Pass", value: "Pass" }];
    this.StatusListForCheckList = statusList;
  };

  getAttchment() {
    let vendors = [{ text: "Yes", value: "1" }, { text: "No", value: "0" }];
    this.lstAttchment = vendors;
  }
  getserviceTerritory() {
    this.commonService.getMasterItemsList('ServiceTerritory').subscribe((result: any) => {
      this.lstServiceTerritory = this.commonService.masters;;
    });
  }
  getWareHouse() {
    this.commonService.getMasterItemsList('WareHouse').subscribe((result: any) => {
      this.lstWareHouse = this.commonService.masters;;
    });
  }
  restWareHouseddl() {
    this.wareHouse = null;
  }
  restServiceTerritoryddl() {
    this.serviceTerritoryId = null;
  }
}
