import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonService, LoanApplicationReportModel } from '../../shared/common.service';
import { Router,ActivatedRoute } from '@angular/router';
import { RunLoanApplicationReportModel, LoanapplicationserviceService } from '../../loanapplication/loanapplicationservice.service';
import { DatePipe } from '@angular/common';
import { DateTimeToLocalPipe, DateTimeToLocalForAddEditForDatePipe } from '../../../pipes/datetime.pipe';
import { FormGroup, FormArray, Validators, FormBuilder, Form } from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import { SolgenRuleEngineService } from '../../solgen-rule-engine/solgen-rule-engine.service';


@Component({
  selector: 'app-customreportview',
  templateUrl: './customreportview.component.html',
  styleUrls: ['./customreportview.component.scss']
})
export class CustomreportviewComponent implements OnInit {
  runLoanApplicationReportModel: RunLoanApplicationReportModel = new RunLoanApplicationReportModel();
  @ViewChild('myStartCalendar', { static: false }) startCalendar: Calendar;
  currentPage: number;
  @Input() offset: number;
  pageSizeValue: number;
  lstPageSize: any;
  totalPageSize: any = 0;
  reportId: any = 0;
  loading = false;
  sortColumn: any = 'Id';
  sortDir = 'desc';
  columndata: any;
  columnheading: any
  jsonData: any;
  totalRecords: any;
  reportName: string = null;
  subModuleName: string = null;
  moduleId: any;
  subModuleId: any;
  subModuleSelectedValue: any;
  subModuleTableName: any;
  From: any;
  TO: any;
  selectedFilter = null;
  searchFilterData: any[] = [];
  orderData: any;
  reportSearchFilterJson: any;
  reportSearchFilter: any;
  downloadType: any;
  rangeDates: Date[];
  filterType: string = '';
  showDateFilterTop: boolean = true;
  isDateFilterValid: boolean = false;
  show: boolean = false;
  showDateFilter = false;
  hideFilter: boolean = false;
  showFilter: boolean = false;
  reportForm: FormGroup;
  customWhereCondition: any;
  hideShowFilterSection: boolean = false;
  showreportData: boolean = false;
  droped: any[] = [];
  selecteddata: any;
  filterData: any;
  fieldmodel: any[] = [];
  DdlValues: any[] = [];
  customFieldList1: any[] = [];
  Data: any[] = [];
  Ddloperators: any[] = [];
  hideBlankFilter: boolean = false;
  customFieldLeadListSecond: any[] = [];
  customFieldLeadListDummy: any[] = [];
  selectedListViewItems: any[] = [];
  lstListingColorCode: any;
  contentHeader: object;
  companyType: string;
  loanApplicationReportModel: LoanApplicationReportModel = new LoanApplicationReportModel();


  constructor(private fb: FormBuilder,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private loanapplicationsService: LoanapplicationserviceService,
              private dateTimeToLocal: DateTimeToLocalPipe,
              private datePipe: DatePipe,
              private ruleEngineService: SolgenRuleEngineService,
              private router: Router  ) { }

  ngOnInit() {
    this.loading = true;
    this.initForm();
    this.currentPage = 1;
    this.offset = 1;
    this.pageSizeValue = 15;
    this.getPageSizes();
    this.totalPageSize = 0;
    this.getLastOneMonthFromCurrrentDate();
    this.getAllOperatorsData(-1);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        ;
        this.reportId = id;
        this.getReportDataById(this.reportId);
      }
    })
  
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
               isLink: true,
               link: '/solgenreport/customreports'
             },
             {
               name: 'Report Details',
               isLink: false
             }
    
           ]
       };
     }
    

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  };

  getAllOperatorsData(id: any) {
    this.commonService.getLoanHomiOperatorsList(id, 'LoanApplication').subscribe((response: any) => {
      this.Ddloperators = this.commonService.operator;
    });
  };

  getReportDataById(id) {
    this.loading = true;
    
    var data = this.commonService.getLoggedInName.value;
    this.loanApplicationReportModel.companyType = this.companyType = data.companyType;
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      debugger
      this.companyType = userdetail.companyType;
    });
    this.loanapplicationsService.getReportDataById(id, this.companyType).subscribe((response: any) => {
      
      if(response){ 
        debugger
      // console.log("response312321", response);
      if(response.length != 0)
      {
        this.reportName = response[0].report_name;
        this.moduleId = response[0].module_id;
        this.subModuleName = response[0].sub_module_name;
        this.subModuleId = response[0].sub_module_id;
        this.subModuleTableName = response[0].subModuleTableName;
        if (this.subModuleId) {
          this.getSubModuleFields();
        }
      }
    }
      this.loading = false

    }, error => {
      // console.log(error);
      this.loading = false
    })
  };

  getSubModuleFields() {
    this.ruleEngineService.GetCustomFieldsListBySubModuleId(this.moduleId, this.subModuleId).subscribe((m: any) => {
      if (m) {
        debugger
        let tableFields = m.data.map(f => {
          return {
            PrimaryTableColumn: f.PrimaryTableColumn,
            actual_data_type: f.actual_data_type,
            display_name: f.display_name,
            form_field_id: f.form_field_id,
            dt_code: f.dt_code,
            name: f.label,
            select_options: JSON.parse(f.select_options),
            table_name: f.table_name,
            table_alias: f.table_alias,
            subModuleAlias: f.table_alias,
            sub_module_id: f.sub_module_id,
            subModuleTableName: this.subModuleTableName
          }
        });
        //this.subModuleFieldList = tableFields;
        this.customFieldLeadListSecond = tableFields;
        this.customFieldList1 = JSON.parse(JSON.stringify(tableFields));
        this.customFieldLeadListDummy = JSON.parse(JSON.stringify(tableFields));
        ;
        if (this.reportId != null && this.reportId != undefined && this.reportId != 0) {
          ;
          this.getReportDataById2(this.reportId);
        }
        ;
        if (this.reportId == 0) {
          this.loading = false;
        }
        //this.getCustomFieldFilterData();
      }
      else {

        ;
        this.loading = false;
      }
    });

  };

  getReportDataById2(id) {
    this.loanapplicationsService.getReportDataById(id, this.companyType).subscribe((response: any) => {
      //this.getAllRoleTypes();

      // console.log("responseresponseas", response);
      const convertdatetime = new DateTimeToLocalForAddEditForDatePipe();
      const date = new Date();
      while (this.fields.length != 0) {
        this.fields.removeAt(0);
      }
      this.reportName = response[0].report_name;
      this.moduleId = response[0].module_id;
      this.subModuleSelectedValue = response[0].sub_module_id;
      this.subModuleId = response[0].sub_module_id;
      this.subModuleTableName = response[0].subModuleTableName;
     

      var ab = response[0].report_searchFilterJson;
      var ac = response[0].report_searchFilter;
      this.Data = JSON.parse(ab);

      this.orderData = JSON.parse(response[0].report_SelectedColumnJson);

      this.DdlValues.length = 0;

      this.Data.forEach(childObj => {
        if (childObj.operatorId == null && childObj.filedNameId == null) {
          childObj.fieldText = null;
          childObj.txtvaluefrom = null;
          childObj.txtvalueto = null;
        }
        if (childObj.dtCode) {
          this.customFieldList1.filter(x => {
            if (childObj.filedNameId == x.form_field_id) {
              this.DdlValues.push(x.select_options);
            }
          })

          this.fields.push(this.fb.group({
            operatorId: [childObj.operatorId],
            filedNameId: [childObj.filedNameId],
            //subModuleFieldId: [childObj.subModuleFieldId],
            txtvaluefrom: [childObj.txtvaluefrom],
            txtvalueto: [childObj.txtvalueto],
            dtCode: [true],
            operators: [this.Ddloperators],
            type: [childObj.type],
            fieldText: [childObj.fieldText]
          })
          )
        }
        else if (childObj.fieldText == "date") {
          this.DdlValues.push([]);
          let fromval = (childObj.txtvaluefrom == '' ? null : convertdatetime.transform(childObj.txtvaluefrom, 'Date'));
          let toval = (childObj.txtvalueto == '' ? null : convertdatetime.transform(childObj.txtvalueto, 'Date'));
          this.fields.push(this.fb.group({
            operatorId: [childObj.operatorId],
            filedNameId: [childObj.filedNameId],
            //subModuleFieldId: [childObj.subModuleFieldId],
            txtvaluefrom: [fromval],
            txtvalueto: [toval],
            dtCode: [false],
            operators: [this.Ddloperators],
            type: [childObj.type],
            fieldText: [childObj.fieldText]
          })
          )
        }
        else if (childObj.fieldText == "datetime") {
          this.DdlValues.push([]);
          let fromval = (childObj.txtvaluefrom == '' ? null : convertdatetime.transform(childObj.txtvaluefrom, null));
          let toval = (childObj.txtvalueto == '' ? null : convertdatetime.transform(childObj.txtvalueto, null));
          this.fields.push(this.fb.group({
            operatorId: [childObj.operatorId],
            filedNameId: [childObj.filedNameId],
            // subModuleFieldId: [childObj.subModuleFieldId],
            txtvaluefrom: [fromval],
            txtvalueto: [toval],
            dtCode: [false],
            operators: [this.Ddloperators],
            type: [childObj.type],
            fieldText: [childObj.fieldText]
          })
          )
        }
        else {

          this.DdlValues.push([]);
          this.fields.push(this.fb.group({
            operatorId: [childObj.operatorId],
            filedNameId: [childObj.filedNameId],
            //subModuleFieldId: [childObj.subModuleFieldId],
            txtvaluefrom: [childObj.txtvaluefrom],
            txtvalueto: [childObj.txtvalueto],
            dtCode: [false],
            operators: [this.Ddloperators],
            type: [childObj.type],
            fieldText: [childObj.fieldText]
          })
          )
        }

      });

      if (this.orderData != null) {
        this.orderData.forEach(ObjOrder => {
          let obj = {
            //isChecked: ObjOrder.selected,
            //name: ObjOrder.name,
            //form_field_id: ObjOrder.form_field_id

            PrimaryTableColumn: ObjOrder.PrimaryTableColumn,
            actual_data_type: ObjOrder.actual_data_type,
            display_name: ObjOrder.display_name,
            form_field_id: ObjOrder.form_field_id.toString(),
            dt_code: ObjOrder.dt_code,
            name: ObjOrder.name,
            //select_options: ObjOrder.select_options == null ? null : JSON.parse(ObjOrder.select_options),
            table_name: ObjOrder.table_name,
            table_alias: ObjOrder.table_alias,
            subModuleAlias: ObjOrder.subModuleAlias,
            sub_module_id: ObjOrder.sub_module_id,
            subModuleTableName: this.subModuleTableName,
            isChecked: ObjOrder.selected,

          }
          this.droped.push(obj);
          this.selectedListViewItems.push(obj);

        });
      }
      if (this.fields.length == 0) {
        this.fields.push(this.fb.group({
          operatorId: null,
          filedNameId: null,
          //subModuleFieldId: null,
          txtvaluefrom: '',
          txtvalueto: '',
          dtCode: [false],
          operators: [],
          type: '',
          fieldText: ['']
        }));
      }
      if (this.droped.length == this.customFieldLeadListSecond.length) {
        this.customFieldLeadListSecond = [];
      }
      else {

        for (var i = this.customFieldLeadListSecond.length - 1; i >= 0; i--) {
          for (var j = 0; j < this.droped.length; j++) {
            if (this.droped[j].form_field_id == (this.customFieldLeadListSecond[i].form_field_id)) {
              this.customFieldLeadListSecond.splice(i, 1);
              break; // add if item found it should break the for statement
            }
          }
        }
      }
      let ddd = response[0].listViewFieldsId;

      if (this.reportId != null && this.reportId != undefined && this.reportId != 0) {


        this.runLoanApplicationReportModel.selecteddata = response[0].report_SelectedColumnJson;
        this.runLoanApplicationReportModel.filterData = response[0].report_searchFilterJson;
        this.runLoanApplicationReportModel.customWhereCondition = response[0].report_searchFilter;
        this.runLoanApplicationReportModel.sortColumn = this.sortColumn;
        this.runLoanApplicationReportModel.sortDir = this.sortDir;
        this.runLoanApplicationReportModel.currentPage = this.currentPage;
        this.runLoanApplicationReportModel.pageSizeValue = this.pageSizeValue;
        this.runLoanApplicationReportModel.From = this.From;
        this.runLoanApplicationReportModel.TO = this.TO;
        // console.log("this.runLoanApplicationReportModelwww", this.runLoanApplicationReportModel);
        ;
        this.loanapplicationsService.GetLoanApplicationReportList(this.runLoanApplicationReportModel).subscribe(response => {
          this.columndata = [];
          this.columnheading = [];
          ;
          this.jsonData = response;
          this.columndata = this.jsonData.data;
          this.columnheading = this.jsonData.schema;
          // console.log("this.columnheading", this.columnheading);
          // console.log("this.columndata", this.columndata);
          if (response.data.length > 0) {
            this.totalRecords = this.columndata[0].total_records;
            // console.log("this.totalRecords", this.totalRecords);
          } else {
            this.totalRecords = 0;
          }
          this.loading = false;
        }, error => {
          this.loading = false;
        })

      }

      this.loading = false;

    })
  };

  setPage($event) {
    this.loading = true;
    this.currentPage = $event.page;
    this.getReportDataById(this.reportId);
  };

  get curPage(): number {
    return this.offset;
  };

  onChange($event) {
    this.currentPage = 1;
    this.getReportDataById(this.reportId);
  };

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.getReportDataById(this.reportId);
  };

  download(data) {
    this.downloadType = null;
    if (data == 'excel') {
      this.downloadType = data;
      this.ExportTOExcel();
    }
  };

  ExportTOExcel() {
    ;
    this.loading = true;
    this.runLoanApplicationReportModel.selecteddata = JSON.stringify(this.orderData);
    this.runLoanApplicationReportModel.filterData = this.reportSearchFilterJson;
    this.runLoanApplicationReportModel.sortColumn = this.sortColumn;
    this.runLoanApplicationReportModel.sortDir = this.sortDir;
    this.runLoanApplicationReportModel.currentPage = this.currentPage;
    this.runLoanApplicationReportModel.pageSizeValue = 40000;
    this.runLoanApplicationReportModel.From = this.From;
    this.runLoanApplicationReportModel.TO = this.TO;
    this.runLoanApplicationReportModel.customWhereCondition = this.reportSearchFilter;

    this.loanapplicationsService.GetLoanApplicationReportList(this.runLoanApplicationReportModel).subscribe(response => {
      this.jsonData = response as [];
      // console.log('jsonData', this.jsonData);
      if (this.jsonData.data.length > 0) {
        this.columndata = this.jsonData.data;
        this.columnheading = this.jsonData.schema;
        var json;
        let columnheading;
        var $this = this;
        var dataArary = [];
        for (var i = 0; i < this.columndata.length; i++) {
          var obj = {};
          for (var j = 0; j < this.columnheading.length; j++) {
            var columnName = this.columnheading[j].COLUMN_NAME;
            var item = this.columndata[i];
            if (this.columnheading[j].DATA_TYPE == 'datetime' || this.columnheading[j].DATA_TYPE == 'date') {
              obj[this.columnheading[j].DISPLAY_NAME] = this.dateTimeToLocal.transform(item[columnName] == '' ? null : item[columnName], '');
            }
            else if (this.columnheading[j].DATA_TYPE == 'bit' || this.columnheading[j].DATA_TYPE == 'bit') {
              if (item[columnName] == false) {
                obj[this.columnheading[j].DISPLAY_NAME] = 'No';
              }
              else {
                obj[this.columnheading[j].DISPLAY_NAME] = 'Yes';
              }
            }
            else if (this.columnheading[j].COLUMN_NAME == 'Status') {
              var accutalldata;
              var values = item[columnName];
              if (values != null && values != '') {
                var responses = values.substring(values.indexOf(":"));
                accutalldata = values.replace(responses, '');
                obj[this.columnheading[j].DISPLAY_NAME] = accutalldata;
              }
              else {
                obj[this.columnheading[j].DISPLAY_NAME] = values;
              }
            }
            else {
              obj[this.columnheading[j].DISPLAY_NAME] = item[columnName];
            }
          }
          dataArary.push(obj);
        }
        ;
        
        if (this.downloadType=='pdf') {
          this.commonService.ExportData(dataArary, 'PDF', this.reportName, "Large");
        }
        else if (this.downloadType == 'excel') {
          ;
          this.commonService.ExportData(dataArary, 'Excel', this.reportName, null);
        }

      } else { }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  };

  generatePdf(data) {
    ;
    if (data == 'pdf') {
      ;
      this.downloadType = data;
      this.ExportTOExcel();
    }
    else {
      this.ExportTOExcel();
    }
  };

  ShowCustomDateFilter() {
    ;
    if (this.showDateFilterTop) {
      if (this.selectedFilter == 'All' || this.selectedFilter == 'Custom Range' || this.selectedFilter == null) {
        this.isDateFilterValid = true;
      }
    }
    else {
      this.isDateFilterValid = false;
    }
    this.showDateFilter = !this.showDateFilter;
  };

  thisMopnth() {
    ;
    this.isDateFilterValid = false
    this.show = false;
    this.rangeDates = null;
    this.filterType = 'Month'
    this.selectedFilter = "This Month";
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    var first = this.datePipe.transform(firstDay, 'MM-dd-yyyy');
    var last = this.datePipe.transform(lastDay, 'MM-dd-yyyy');
    this.From = first;
    this.TO = last;
    this.selectedFilter = "This Month" + '' + '( ' + (first + ' - ' + last) + ' )';
    this.runloanapplication();
  };

  today() {
    ;
    this.isDateFilterValid = false
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "Today";
    this.filterType = "Today";
    var myDate = new Date();
    var todaydate = this.datePipe.transform(myDate, 'MM-dd-yyyy');
    this.From = todaydate;
    this.TO = todaydate;
    this.selectedFilter = "Today" + '' + '( ' + (todaydate + ' - ' + todaydate) + ' )';
    this.runloanapplication();
  };

  yesterday() {
    this.isDateFilterValid = false
    this.rangeDates = null;
    this.selectedFilter = "Yesterday";
    this.filterType = "Yesterday";
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    dte.toString();

    var yesterdaydate = this.datePipe.transform(dte, 'MM-dd-yyyy');
    this.From = yesterdaydate;
    this.TO = yesterdaydate;
    this.selectedFilter = "Yesterday" + '' + '( ' + (yesterdaydate + ' - ' + yesterdaydate) + ' )';
    this.runloanapplication();
  };

  ThisWeek() {
    this.isDateFilterValid = false
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "This Week";
    this.filterType = "This Week";
    var current = new Date();
    var weekstart = current.getDate() - current.getDay() + 1;
    var last = weekstart + 6;
    var monday = new Date(current.setDate(weekstart));
    var sunday = new Date(current.setDate(last)).toUTCString();
    var weekstartday: any = this.datePipe.transform(monday, 'MM-dd-yyyy')
    var weekendday: any = this.datePipe.transform(sunday, 'MM-dd-yyyy');
    this.From = weekstartday;
    this.TO = weekendday;
    this.selectedFilter = "This Week" + '' + '( ' + (weekstartday + ' - ' + weekendday) + ' )';
    this.runloanapplication();
  };

  LastWeek() {
    this.isDateFilterValid = false
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "Last Week";
    this.filterType = "Last Week";
    var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
      , day = beforeOneWeek.getDay()
      , diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
      , lastMonday = new Date(beforeOneWeek.setDate(diffToMonday))
      , lastSunday = new Date(beforeOneWeek.setDate(diffToMonday + 6));
    var lastweekstartday = this.datePipe.transform(lastMonday, 'MM-dd-yyyy');
    var lastweekendday = this.datePipe.transform(lastSunday, 'MM-dd-yyyy');
    this.From = lastweekstartday;
    this.TO = lastweekendday;
    this.selectedFilter = "Last Week" + '' + '( ' + (lastweekstartday + ' - ' + lastweekendday) + ' )';
    this.runloanapplication();
  };

  lastMonth() {
    ;
    this.isDateFilterValid = false
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "Last Month";
    this.filterType = "Last Month";
    var date = new Date();
    date = new Date(date.setMonth(date.getMonth() - 1));
    var monthStartDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var monthEndDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var first = this.datePipe.transform(monthStartDay, 'MM-dd-yyyy');
    var last = this.datePipe.transform(monthEndDay, 'MM-dd-yyyy');
    this.From = first;
    this.TO = last;
    this.selectedFilter = "Last Month" + '' + '( ' + (first + ' - ' + last) + ' )';
    this.runloanapplication();
  };

  thisYear() {
    this.isDateFilterValid = false
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "This Year";
    this.filterType = "This Year";
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, 0, 1);
    var lastDay = new Date(y, 11, 31);
    var first = this.datePipe.transform(firstDay, 'MM-dd-yyyy');
    var last = this.datePipe.transform(lastDay, 'MM-dd-yyyy');
    this.From = first;
    this.TO = last;
    this.selectedFilter = "This Year" + '' + '( ' + (first + ' - ' + last) + ' )';
    this.showDateFilter = !this.showDateFilter;
    this.runloanapplication();
  };

  lastYear() {
    this.isDateFilterValid = false
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "Last Year";
    this.filterType = "Last Year";
    var date = new Date(),
      y = (date.getFullYear() - 1);
    var firstDay = new Date(y, 0, 1);
    var lastDay = new Date(y, 11, 31);
    var first = this.datePipe.transform(firstDay, 'MM-dd-yyyy');
    var last = this.datePipe.transform(lastDay, 'MM-dd-yyyy');
    this.From = first;
    this.TO = last;
    this.selectedFilter = "Last Year" + '' + '( ' + (first + ' - ' + last) + ' )';
    this.showDateFilter = !this.showDateFilter;
    this.runloanapplication();
  };

  OnChangedDateRange(event: any) {
    ;
    this.isDateFilterValid = false
    this.From = this.datePipe.transform(this.rangeDates[0], 'MM-dd-yyyy');
    if (this.rangeDates[1] != null) {
      this.TO = this.datePipe.transform(this.rangeDates[1], 'MM-dd-yyyy');
    }
    this.filterType = 'Custom Range'
    if (this.From != null && this.TO != null) {
      this.selectedFilter = "Custom Range" + '' + '( ' + (this.From + ' - ' + this.TO) + ' )';
    }
    else {
      this.selectedFilter = "Custom Range";
    }
    if (this.rangeDates[1] != null) {
      this.startCalendar.overlayVisible = false;
      this.showDateFilter = !this.showDateFilter;
      this.runloanapplication();
    }
  };

  customRange() {
    
    if (this.selectedFilter == 'All' || this.selectedFilter == 'Custom Range' || this.selectedFilter == null) {
      this.isDateFilterValid = true;
    }
    else {
      this.isDateFilterValid = false;
    }
    this.selectedFilter = "Custom Range";
  }

  hideCalendar(event) {
    if (event.target.tagName == 'DIV' || event.target.tagName == 'UL') {
      this.showDateFilter = false;
    }
  };

  getLastOneMonthFromCurrrentDate() {
    ;
    this.showDateFilter = false;
    this.isDateFilterValid = false
    this.show = false;
    this.rangeDates = null;
    this.selectedFilter = "Month";
    this.filterType = "Month";
    var currentDate = new Date();
    var date = new Date(currentDate);
    var first = this.datePipe.transform(currentDate, 'MM-dd-yyyy');
    date = new Date(date.setMonth(date.getMonth() - 1));
    var last = this.datePipe.transform(date, 'MM-dd-yyyy');
    this.From = last;
    this.TO = first;
    this.selectedFilter = '( ' + (last + ' - ' + first) + ' )';
  };

  runloanapplication() {
    ;
    this.hideFilter = false;
    this.showFilter = false;
    this.showDateFilter = false;
      this.runLoanApplicationReport();
  };

  runLoanApplicationReport() {
    ;
    // this.loading = true;
    //this.reportForm.controls['filedNameId'].disable();
    if (this.showDateFilterTop) {
      if (this.selectedFilter == 'All' || this.selectedFilter == 'Custom Range' || this.selectedFilter == null || this.selectedFilter == '') {
        this.isDateFilterValid = true;
      }
    }
        this.hideShowFilterSection = false;
        this.showreportData = true;
        ;
        this.runLoanApplicationReportModel.From = this.From;
        this.runLoanApplicationReportModel.TO = this.TO;
        ;
        this.loanapplicationsService.GetLoanApplicationReportList(this.runLoanApplicationReportModel).subscribe(response => {
          ;
          this.columndata = [];
          this.columnheading = [];
          this.jsonData = response;
          this.columndata = this.jsonData.data;
          this.columnheading = this.jsonData.schema;


          if (this.columnheading.length != 0) {
            this.columnheading.forEach(function (element) {
              element["colwidth"] = (String(element.DISPLAY_NAME).length * 200) + 20;
            });
          }

          if (response.data.length > 0) {
            this.totalRecords = this.columndata[0].total_records;

          } else {
            this.totalRecords = 0;
          }
          this.offset = this.currentPage;

          this.loading = false;
        }, error => {
          this.loading = false;
        })
  };

  private initForm() {
    this.customWhereCondition = '';
    this.reportForm = this.fb.group({
      fields: this.fb.array([this.buildFields()], Validators.nullValidator)
    });
  };

  buildFields(): FormGroup {
    return this.fb.group({
      operatorId: [null, Validators.nullValidator],
      filedNameId: [null, Validators.nullValidator],
      txtvaluefrom: [null, Validators.nullValidator],
      txtvalueto: [''],
      operators: [],
      dtCode: [false],
      type: [''],
      fieldText: ['']
    });
  };

  get fields(): FormArray {
    return this.reportForm.get('fields') as FormArray;
  };

  showFilterButton() {
    this.hideShowFilterSection = true;
    this.hideFilter = true;
    this.showFilter = true;
  };

  hideFilterButton() {
    this.hideShowFilterSection = false;
    this.hideFilter = false;
    this.showFilter = false;
  };

  OnBackToListClick() {
    this.router.navigateByUrl("/solgenreport/customreports");
    this.loading = false;
  }

  getListingColorCode(fieldValue: string) {
    this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
      }
    }
    return this.lstListingColorCode;
  };
}
