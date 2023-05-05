import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder, Form } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService, LoanApplicationReportModel } from '../shared/common.service';
import { DatePipe } from '@angular/common';
import { Calendar } from 'primeng/calendar';
import { LoanapplicationserviceService, RunLoanApplicationReportModel } from '../loanapplication/loanapplicationservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimeToLocalForAddEditForDatePipe, DateTimeToLocalPipe } from '../../pipes/datetime.pipe';
import { isNull } from 'util';

@Component({
  selector: 'app-loanapplicationreport',
  templateUrl: './loanapplicationreport.component.html',
  styleUrls: ['./loanapplicationreport.component.scss']
})
export class LoanapplicationreportComponent implements OnInit {
  @ViewChild('condition', { static: false }) condition: NgSelectComponent;
  @ViewChild('myStartCalendar', { static: false }) startCalendar: Calendar;
  @ViewChild('droppedView', { static: false }) DroppedView: ElementRef;
  @Input() offset: number;
  loanApplicationReportModel: LoanApplicationReportModel = new LoanApplicationReportModel();
  runLoanApplicationReportModel: RunLoanApplicationReportModel = new RunLoanApplicationReportModel();
  loading = false;
  reportForm: FormGroup;
  addCountWidgetForm: FormGroup;
  addBarChartForm: FormGroup;
  addListViewForm: FormGroup;
  ddlData: any[] = [];
  customCompnentValues: any;
  customFieldList: any[] = [];
  customFieldList1: any[] = [];
  groupByCustomFieldList: any[] = [];
  moduleName = 'finance';
  submoduleName = 'LoanApplicationInfo';
  custom_field_ids: any;
  field_code: any;
  customWhereCondition: any;
  DdlValues: any[] = [];
  selectedFilter = null;
  show: boolean = false;
  rangeDates: Date[];
  showDateFilter = false;
  hideDateFilter: boolean = false;
  From: any;
  TO: any;
  FieldlistFilter = '';
  TempcustomFieldLeadListSecond: any[] = [];
  customFieldLeadListSecond: any[] = [];
  droped: any[] = [];
  customFieldLeadListDummy: any[] = [];
  fieldmodel: any[] = [];
  Ddloperators: any[] = [];
  controlname: any;
  sortable: any;
  Data: any[] = [];
  sortColumn = 'id';
  sortDir = 'desc';
  currentPage: number = 1;
  pageSizeValue: number = 15;
  columndata: any;
  columnheading: any;
  jsonData: any;
  graphjsonData: any;
  totalRecords: any;
  lstPageSize: any;
  selecteddata: any;
  filterData: any;

  isDateFilterValid: boolean = false;
  isReportNameValid: boolean = false;
  disableDateFilter: boolean = false;

  iserror: any = 0;
  reportName: string = null;
  description: string = null;
  reportId: any = 0;
  orderData: any;
  filterType: string = '';
  rowsForExport = [];
  hideFilterValue: boolean = false;

  showDateFilterTop: boolean = true;

  hideFilter: boolean = true;
  showFilter: boolean = true;
  hideShowFilterSection: boolean = true;
  hiddenId: any;

  listFilter = '';
  showGraph: boolean = false;
  showGraphBtn: boolean = false;
  graphColumnNames: any;
  graphColumnData: any[] = [];
  graphOption: any;
  graphWidgetData: any;
  isgroupByFieldValid: boolean = false;
  groupByFieldId: any = null;
  graphdata: any;
  graphBtnName = 'Graph Visualization';
  showHideChartBtn: boolean = false;
  widgetType = 'doughnut';
  isBarChart: boolean = false;
  isPieChart: boolean = true;
  isLineChart: boolean = false;

  islinkWithDashboard: boolean = false;
  isCountWidget: boolean = false;
  isChartView: boolean = false;
  isListView: boolean = false;
  displayCharts: boolean = false;
  showApplyToFields: boolean = false;
  RoleList: any;
  showBarChartFields: boolean = false;
  chartType: any = '';

  isHorizontalChart: boolean = false;
  isPieChartForLinkTab: boolean = false;
  isAreaChart: boolean = false;
  showListViewApplyToFields: boolean = false;
  yAxisList: any;
  xAxisList: any;
  contentHeader: object;
  companyType: string;

  constructor(private fb: FormBuilder, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private datePipe: DatePipe,
    private loanapplicationsService: LoanapplicationserviceService, private toaster: ToastrService,
    private route: ActivatedRoute, public datepipe: DatePipe, private router: Router, private dateTimeToLocal: DateTimeToLocalPipe) {
    this.ddlData = [
      { id: 1, name: 'Add', disabled: true },
      { id: 2, name: 'Or' },
      { id: 3, name: 'And' }
    ];
  }

  showFilterButton() {
    this.hideShowFilterSection = true;
    this.hideFilter = true;
    this.showFilter = true;


  }
  hideFilterButton() {
    this.hideShowFilterSection = false;
    this.hideFilter = false;
    this.showFilter = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        //this.hideShowFilterSection = true;
        this.islinkWithDashboard = true;
        this.hideFilter = true;
        this.showFilter = true;
        this.reportId = id;
        //this.loading = true;
      }
      else {
        this.GetCustomViewbyId();
        this.hideFilter = true;
        this.showFilter = true;
        //this.hideShowFilterSection = true;
      }
      
    });

    this.initForm();
    this.addCountWidgetForm.reset();
    this.addCountWidgetForm.reset({ radiogroup: "Only For Me" });
    this.getCustomFieldData();
    this.getCustomFieldFilterData();
  
    //this.GetCustomViewbyId();
    this.getPageSizes();
    this.getAllOperatorsData(-1);
  
    this.initBreadCrumb();
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Loan Applications Report',
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
            name: 'All Reports',
            isLink: true,
            link: '/allReports'
          },
          {
           name: 'Edit Report',
           isLink: false,
          },
 
        ]
    };
  }



  download(data) {
    if (data == 'excel') {
      this.ExportTOExcel();
    }
    //else if (data == 'pdf') {
    //  this.generatePdf();
    //}
  }



  ExportTOExcel() {  
    this.loading = true;
    this.rowsForExport = [];

    this.runLoanApplicationReportModel.selecteddata = this.selecteddata;
    this.runLoanApplicationReportModel.filterData = this.filterData;
    this.runLoanApplicationReportModel.sortColumn = this.sortColumn;
    this.runLoanApplicationReportModel.sortDir = this.sortDir;
    this.runLoanApplicationReportModel.currentPage = this.currentPage;
    this.runLoanApplicationReportModel.pageSizeValue = 40000;
    this.runLoanApplicationReportModel.From = this.From;
    this.runLoanApplicationReportModel.TO = this.TO;
    this.runLoanApplicationReportModel.customWhereCondition = this.customWhereCondition;//encodeURIComponent(this.customWhereCondition);




    this.loanapplicationsService.GetLoanApplicationReportList(this.runLoanApplicationReportModel).subscribe(response => {
        
      this.jsonData = response as [];
    
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

          // console.log('dataArary', dataArary);
          
          this.commonService.LoanApplicationExportData(dataArary, 'Excel', this.reportName, null, this.reportName, this.From,this.TO);
        } else { }
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }




  GetCustomViewbyId() {
    this.commonService.GetLoanHomiCustomViewbyId(0).subscribe((response: any) => {
      this.droped = response.map(m => {
        return {
          text: m.shortdisplayname + ' | ' + m.display_name,
          value: m.custom_field_id,
          isChecked: m.is_sortable,
        }

      });

      if (this.droped.length == this.customFieldLeadListSecond.length) {
        this.customFieldLeadListSecond = [];
      }
      else {

        for (var i = this.customFieldLeadListSecond.length - 1; i >= 0; i--) {
          for (var j = 0; j < this.droped.length; j++) {
            if (this.droped[j].value == (this.customFieldLeadListSecond[i].value)) {
              this.customFieldLeadListSecond.splice(i, 1);
              break; // add if item found it should break the for statement
            }
          }
        }
      }
    })
  }

  getReportDataById(id) {
    
    var data = this.commonService.getLoggedInName.value;
    this.loanApplicationReportModel.companyType = this.companyType = data.companyType;

    this.loanapplicationsService.getReportDataById(id, this.companyType ).subscribe((response: any) => {

      const convertdatetime = new DateTimeToLocalForAddEditForDatePipe();
      const date = new Date();
     

      while (this.fields.length != 0) {
        this.fields.removeAt(0);
      }

      // console.log('Report response', response);
     
      this.reportName = response[0].report_name;
      this.description = response[0].description;
      this.groupByFieldId = response[0].groupByFieldId;
      this.widgetType = response[0].chartType;
      if (this.widgetType == 'line') {
        this.widgetType = 'line';
        this.isLineChart = true;
        this.isBarChart = false;
        this.isPieChart = false;
      }
      else if (this.widgetType == 'bar') {
        this.widgetType = 'bar';
        this.isBarChart = true;
        this.isPieChart = false;
        this.isLineChart = false;
      }
      else {
        this.widgetType = 'doughnut';
        this.isPieChart = true;
        this.isBarChart = false;
        this.isLineChart = false;
      }

      if (response[0].date_from == null && response[0].date_to == null) {
        //this.disableDateFilter = true;
        this.showDateFilterTop = false;
        this.selectedFilter = null;
        this.From = null;
        this.TO = null;
      }
      else {
      let fromval = this.datepipe.transform(response[0].date_from, 'MM-dd-yyyy');
      let toval = this.datepipe.transform(response[0].date_to, 'MM-dd-yyyy');

      this.From = fromval;
      this.TO = toval;
     

      this.selectedFilter = fromval + '-' + toval;
      }
     
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
          
            if (childObj.filedNameId == x.value) {
             
              this.DdlValues.push(x.selectlistvalues);

            }
          })

          this.fields.push(this.fb.group({
            operatorId: [childObj.operatorId],
            filedNameId: [childObj.filedNameId],
            txtvaluefrom: [childObj.txtvaluefrom],
            txtvalueto: [childObj.txtvalueto],
            dtCode: [true],
            operators: [this.Ddloperators],
            type: [childObj.type],
            fieldText: [childObj.fieldText]
          })
          )
        } else if (childObj.fieldText == "date") {
          this.DdlValues.push([]);
          let fromval = (childObj.txtvaluefrom == '' ? null : convertdatetime.transform(childObj.txtvaluefrom, 'Date'));
          let toval = (childObj.txtvalueto == '' ? null : convertdatetime.transform(childObj.txtvalueto, 'Date'));
          this.fields.push(this.fb.group({
            operatorId: [childObj.operatorId],
            filedNameId: [childObj.filedNameId],
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
              isChecked: ObjOrder.selected,
              text: ObjOrder.text,
              value: ObjOrder.value
            }
            this.droped.push(obj);
          
        });
      }
     
      if (this.fields.length == 0) {
        this.fields.push(this.fb.group({
          operatorId: null,
          filedNameId: null,
          txtvaluefrom: '',
          txtvalueto: '',
          dtCode: [false],
          operators: [],
          type: '',
          fieldText: ['']
        }));
      }
    
      //this.droped = this.droped.map(m => {
      //  return {
      //    text: m.text + ' | ' + m.display_name,
      //    value: m.custom_field_id,
      //    isChecked: m.is_sortable,
      //  }

      //});

      
      if (this.droped.length == this.customFieldLeadListSecond.length) {
        this.customFieldLeadListSecond = [];
      }
      else {

        for (var i = this.customFieldLeadListSecond.length - 1; i >= 0; i--) {
          for (var j = 0; j < this.droped.length; j++) {
            if (this.droped[j].value == (this.customFieldLeadListSecond[i].value)) {
              this.customFieldLeadListSecond.splice(i, 1);
              break; // add if item found it should break the for statement
            }
          }
        }
      }
     
      if (response[0].filterType == 'Today')
        this.today();

      else if (response[0].filterType == 'Yesterday')
        this.yesterday();

      else if (response[0].filterType == 'This Week')
        this.ThisWeek();

      else if (response[0].filterType == 'Last Week')
        this.LastWeek();
      else if (response[0].filterType == 'This Month')
        this.thisMopnth();
      else if (response[0].filterType == 'Last Month')
        this.lastMonth();
      else if (response[0].filterType == 'This Year')
        this.thisYear();
      else if (response[0].filterType == 'Last Year')
        this.lastYear();
   
        

      this.runloanapplication();
    })
   
   
    //this.loading = false;

  }


  get fields(): FormArray {
    return this.reportForm.get('fields') as FormArray;
  }

  addFields(e) {
    (this.fields.controls[this.fields.controls.length - 1] as FormGroup).patchValue(
      {

        type: e
      });
    this.fields.push(this.buildFields());
    this.condition.clearModel();
  }


  removeFields(index: any) {
    const message = `Are you sure you want to delete this row?`;
    this.dialogService.confirm('Delete Row', message).subscribe(confirmed => {
      if (confirmed) {

        this.fields.removeAt(index);
        if (this.fields.length == index) {
          (this.fields.controls[index - 1] as FormGroup).patchValue(
            {
              type: ''
            });
        }
        this.filtersearch();
        let dateControl = this.fieldmodel.filter(x => x.operatorId == 8 && x.fieldText == "date");
        this.showDateFilterTop = true;
        if (dateControl != null && typeof dateControl != 'undefined' && dateControl.length > 0) {
          this.showDateFilterTop = false;
        }
      }
    });
  }

  private initForm() {
    this.customWhereCondition = '';
    this.reportForm = this.fb.group({
      fields: this.fb.array([this.buildFields()], Validators.nullValidator)
    });

    this.addCountWidgetForm = this.fb.group(
      {
        radiogroup: [null, Validators.nullValidator],
        selectedRole: [null, Validators.nullValidator]
      });
    this.addCountWidgetForm.reset();

    this.addBarChartForm = this.fb.group({
      yAxisId: [null, Validators.nullValidator],
      radioChartBtn: [null],
      chartSelectedRole: [null, Validators.nullValidator]
    });

    this.addListViewForm = this.fb.group(
      {
        listViewRadioBtn: [null],
        listViewselectedRole: [null, Validators.nullValidator],
        listViewFields: [null, Validators.nullValidator]
      });
  }

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
  }

  get operatorId() { return this.reportForm.get('operatorId'); }
  get filedNameId() { return this.reportForm.get('filedNameId'); }
  get txtvaluefrom() { return this.reportForm.get('txtvaluefrom'); }
  get txtvalueto() { return this.reportForm.get('txtvalueto'); }
  get type() { return this.reportForm.get('type'); }
  get fieldText() { return this.reportForm.get('fieldText'); }


  getCustomFieldFilterData() {
    this.loading = true
    this.customFieldList1.length = 0;
    this.commonService.GetLoanHomiManageViewCustomFieldsLeadList('', this.moduleName, this.submoduleName, '', '', '', 'Report').subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.commonService.loanHomicustomFieldsLeadList.data;
       
        this.customCompnentValues.forEach(t => {

          let obj = {
            display: t.display_name,
            text: t.PrimaryTableColumn,
            value: t.form_field_id,
            dropdown: t.dt_code,
            selectlistvalues: t.select_options,
            dt_code: t.dt_code,
            field_code: t.field_code,
            alias: t.table_alias,
            name: t.shortdisplayname + ' | ' + t.display_name,
          }

          this.customFieldList.push(obj);
        })
        this.customFieldList1 = this.customFieldList;
        this.groupByCustomFieldList = this.customFieldList;

        if (this.reportId != null && this.reportId != undefined && this.reportId != 0) {
          this.getReportDataById(this.reportId);
        }
        else {
        this.loading = false;
        }
      }
    }, error => {
      this.loading = false;
    });
  }

  onChangeField($event, field: FormGroup, i: number) {

   
      field.get('operatorId').setValue(null);
    field.get('txtvaluefrom').setValue(null);
    field.get('txtvaluefrom').enable();

    this.filtersearch();
    let dateControl = this.fieldmodel.filter(x => x.operatorId == 8 && x.fieldText == "date");
  
    this.showDateFilterTop = true;
    if (dateControl != null && typeof dateControl != 'undefined' && dateControl.length > 0) {
      this.showDateFilterTop = false;
    }
  



    //field.get('operatorId').setValue(null);
    //field.get('txtvaluefrom').setValue(null);
    //field.get('txtvaluefrom').enable();
   // this.disableDateFilter = false;

    this.custom_field_ids = null;
    this.field_code = null;
    //;
    this.custom_field_ids = $event.value;
    this.field_code = $event.field_code
    this.getOperators($event.value, field);
    if (this.customWhereCondition == '') {
      this.customWhereCondition = $event.text;

    } else {
      this.customWhereCondition = this.customWhereCondition + ' and ' + $event.text;
    }
    if ($event.dt_code == 'select') {

      this.DdlValues.splice(i, 1, $event.selectlistvalues)
      field.get('dtCode').setValue(true);
      field.get('txtvaluefrom').setValue(null);
     
    }
    else if ($event.dt_code == 'datetime' || $event.dt_code == 'date') {
      this.DdlValues.splice(i, 1, [])
      field.get('dtCode').setValue(false);

      this.hideDateFilter = true;
    }

    else if ($event.dt_code == 'boolean') {
      this.DdlValues.splice(i, 1, [])
   
      field.get('dtCode').setValue(false);
      field.get('txtvaluefrom').setValue(false);
     // field.get('txtvaluefrom').clearValidators();
     // field.get('txtvaluefrom').updateValueAndValidity();
     this.hideDateFilter = false;
    }

    else {
      this.DdlValues.splice(i, 1, [])
      field.get('dtCode').setValue(false);
      this.hideDateFilter = false;
    }

    if ($event.dt_code != 'boolean') {
      field.get('txtvaluefrom').setValue(null);
    }
   
    
    field.get('fieldText').setValue($event.dt_code);

  
  }

  loadOperator($event, field: FormGroup, i: number) {
    this.getOperators($event.value, field);
  }

  getOperators(id: any, field: FormGroup, isEdit = false) {
    this.commonService.getLoanHomiOperatorsList(id, 'LoanApplication').subscribe((response: any) => {
      if (!isEdit && field != null) {
        field.get('operators').setValue(this.commonService.operator);
      } else {
        return this.commonService.operator;
      }
    });
  }
  getAllOperatorsData(id: any) {
    this.commonService.getLoanHomiOperatorsList(id, 'LoanApplication').subscribe((response: any) => {
      this.Ddloperators = this.commonService.operator;
    });
  }


  filtersearch() {
      if (this.reportForm.get('fields').valid) {
        this.fieldmodel = [] = [];
        this.fieldmodel.length = 0;
        this.customWhereCondition = '(';
        var mainData = this.reportForm.value.fields.filter((element, index) => {
   //;
          element.operators = '';
          if ((element.fieldText == "date" || element.fieldText == "datetime") && element.txtvaluefrom != null && element.txtvalueto != null) { // compare date to and from
            if (element.txtvaluefrom > element.txtvalueto && element.operatorId == "8") {
              this.iserror = 2;
              return;
            }
          }

          if (element.fieldText == "date") { // conversion for:-> from ,to date convert also for between
            element.txtvaluefrom = this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom);
            if (element.operatorId == "8") {
              if (element.txtvalueto == null)
                this.iserror = 1;
              else
                element.txtvalueto = this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvalueto);
            }
          }
          else if (element.fieldText == "datetime") {
            element.txtvaluefrom = this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom);
            if (element.operatorId == "8") {
              if (element.txtvalueto == null)
                this.iserror = 1;
              else
                element.txtvalueto = this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvalueto);
            }
          }


          this.fieldmodel.push(element);
     
          var operator = this.Ddloperators.filter(function (elementInner, index) {
            return (elementInner.value === element.operatorId);
          });


          if (index == 0) {
            if (element.filedNameId != null && element.operatorId == null) {
              this.iserror = 1;
              return;
            }
            else {
              if (element.fieldText != "boolean") {
                if (operator.length != 0) {
                  if (operator[0].expression == "is null" || operator[0].expression == "is not null") {
                    this.iserror = 0;
                  }
                }
                else {
                  if (element.filedNameId != null && element.operatorId != null && (element.txtvaluefrom == null || element.txtvaluefrom == "" || element.txtvaluefrom == "Invalid date")) {
                    this.iserror = 1;
                    return;
                  }
                }
              }
            }
          }

          else if (index > 0) {
              if (element.filedNameId == null) {
                this.iserror = 1;
                return;
              }
              else if (element.filedNameId != null && element.operatorId == null) {
                this.iserror = 1;
                return;
              }
              else {
                if (element.fieldText != "boolean") {
                  if (element.filedNameId != null && element.operatorId != null && (element.txtvaluefrom == null || element.txtvaluefrom == "" || element.txtvaluefrom == "Invalid date")) {
                    this.iserror = 1;
                    return;
                  }
                }
              }
            
          }
          


          if (operator.length <= 0) {
            this.iserror = 1;

          }
          var field = this.customFieldList1.filter(function (elementfield, index) {
            return (elementfield.value === element.filedNameId);
          });
          if (field.length <= 0) {
            this.iserror = 1;
          }
          if (operator.length <= 0 && field.length <= 0) {// NO FILTER SELECTED
            this.iserror = 0;
            return;
          }
          if (this.iserror == 1) {// any one empty
            this.iserror = 1;
            return;
          }
          var operatorstring = '';
          if (operator[0].expression == "IN" || operator[0].expression == "NOT IN") {
            operatorstring = operator[0].expression + " ('" + element.txtvaluefrom + "')";

          }
          else if (operator[0].expression == "Like" || operator[0].expression == "Not Like") {
            operatorstring = operator[0].expression + " '%" + element.txtvaluefrom + "%'";
          }
          else if (operator[0].expression == "between") {
            if (element.fieldText == "date") {
              if (element.type == 'And') {
                operatorstring = operator[0].expression + ' ' + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom) + "', 23) " + " And " + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvalueto) + "', 23) ";
              }
              else {
                operatorstring = operator[0].expression + ' ' + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom) + "', 23) " + " And " + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvalueto) + "', 23) ";
              }
            } else if (element.fieldText == "datetime") {
              operatorstring = operator[0].expression + ' ' + " convert(varchar,'" + this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom) + "', 121) " + " And " + " convert(varchar,'" + this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvalueto) + "', 121) ";
            } else {
              operatorstring = operator[0].expression + ' ' + "'" + element.txtvaluefrom + "'" + " And " + "'" + element.txtvalueto + "'";
            }
          }


          else {
            if (element.fieldText == "date") {
              operatorstring = operator[0].expression + ' ' + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom) + "', 23) ";
            } else if (element.fieldText == "datetime") {
              operatorstring = operator[0].expression + ' ' + " convert(varchar,'" + this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom) + "', 121) ";
            } else {
              if (element.txtvaluefrom == undefined) {
                operatorstring = operator[0].expression;
                
              }
              else {
            
               operatorstring = operator[0].expression + ' ' + "'" + element.txtvaluefrom + "'";
               
              }
            }
          }
          if (element.type == 'Or') {
            if (element.fieldText == "date") {
              this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + 'dateadd(HOUR, -8,' + field[0].alias + '.' + field[0].text + ' )' + ', 23) ' + operatorstring + ') ' + element.type + ' ';
            } else if (element.fieldText == "datetime") {
              this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + 'dateadd(HOUR, -8,' + field[0].alias + '.' + field[0].text + ' )' + ', 121) ' + operatorstring + ') ' + element.type + '';
            } else {
              this.customWhereCondition = this.customWhereCondition + ' (' + field[0].alias + '.' + field[0].text + ' ' + operatorstring + ') ' + element.type + '';
            }
          }
          else if (element.type == 'And') {
            if (element.fieldText == "date") {
              this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + 'dateadd(HOUR, -8,' + field[0].alias + '.' + field[0].text + ' )'+', 23) ' + operatorstring + ') ) ' + element.type + ' (';
            } else if (element.fieldText == "datetime") {
              this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + 'dateadd(HOUR, -8,' + field[0].alias + '.' + field[0].text + ' )'+', 121) ' + operatorstring + ') ) ' + element.type + ' (';
            } else {
              this.customWhereCondition = this.customWhereCondition + ' (' + field[0].alias + '.' + field[0].text + ' ' + operatorstring + ') ) ' + element.type + ' (';
            }
          }
          else {

            if (element.fieldText == "date") {
              this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + 'dateadd(HOUR, -8,' + field[0].alias + '.' + field[0].text + ' )' + ', 23) ' + operatorstring + ') ';
            } else if (element.fieldText == "datetime") {
              this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + 'dateadd(HOUR, -8,' + field[0].alias + '.' + field[0].text + ' )' + ', 121) ' + operatorstring + ') ';
            } else {
                this.customWhereCondition = this.customWhereCondition + ' (' + field[0].alias + '.' + field[0].text + ' ' + operatorstring + ' ) ';
            }

          }
          if (element.txtvaluefrom == undefined || element.txtvaluefrom == false) {
            this.iserror = 0;
          }
          else {
            if (element.txtvaluefrom == null || element.txtvaluefrom.length == 0 || element.txtvaluefrom == "" || operatorstring.length == 0) {

              this.iserror = 1;
            }
          }
          if (index >= 0) {
            
            if (operator[0].expression == "between") {
              if (element.filedNameId != null && element.operatorId != null && (element.txtvaluefrom == null || element.txtvaluefrom == "" || element.txtvaluefrom == "Invalid date")) {
                this.iserror = 1;
                return;
              }
              else if (element.filedNameId != null && element.operatorId != null && element.txtvaluefrom != null && (element.txtvalueto == null || element.txtvalueto == "" || element.txtvalueto == "Invalid date")) {
                this.iserror = 1;
                return;
              }
            }
            
            
          }

          // console.log('5th', this.customWhereCondition);
         
        });

        if (this.customWhereCondition == '(') {
          this.customWhereCondition = null;
        } else {
          this.customWhereCondition += ')';
        }
        // console.log("this.fieldmodel", this.fieldmodel);
      }

      else {
        this.iserror = 1;
        this.commonService.validateAllFormFields(this.reportForm);
      }
    
  }

  onKeyReport($event) {
    if ($event.target.value == '')
      this.isReportNameValid = true;
    else
      this.isReportNameValid = false;
  }

  onKey($event) {
    this.customWhereCondition = this.customWhereCondition + '  ' + $event.target.value;
  }

  onChangeOperator($event, field: FormGroup, i: number) {
   /* this.filtersearch();*/
    

    this.filtersearch();

    let dateControl = this.fieldmodel.filter(x => x.operatorId == 8 && x.fieldText == "date");
 
    this.showDateFilterTop = true;
    if (dateControl != null && typeof dateControl != undefined && dateControl.length > 0) {
   
      this.showDateFilterTop = false;
      this.isDateFilterValid = false;
      this.selectedFilter = null;
      this.From = null;
      this.TO = null;
      this.filterType = null
      field.get('txtvaluefrom').enable();
    }
   

  

    ////if (value > 1 && this.hideDateFilter) {
    ////  this.selectedFilter = null;
    ////  this.From = null;
    ////  this.TO = null;
    ////  this.filterType=null
    ////  this.isDateFilterValid = false;
    ////  this.disableDateFilter = true;
    ////  this.isDateFilterValid = false;
    ////}
    ////else if (value == -1 && $event.expression != 'between'){
    ////  this.disableDateFilter = false;
    ////}


    if ($event.expression == 'is null' || $event.expression == 'is not null') {

      field.get('txtvaluefrom').setValue(null);
      field.get('txtvaluefrom').clearValidators();
      field.get('txtvaluefrom').updateValueAndValidity();
      field.get('txtvaluefrom').disable();
      this.hideFilterValue = true;
    }
   
    else {
      if (field.value.fieldText == 'boolean') {
        field.get('txtvaluefrom').setValue(false);
      }
      else {
        field.get('txtvaluefrom').setValue(null);
      }
      field.get('txtvaluefrom').clearValidators();
      field.get('txtvaluefrom').updateValueAndValidity();
      field.get('txtvaluefrom').enable();
      this.hideFilterValue = false;
    }

    this.customWhereCondition = this.customWhereCondition + '  ' + $event.expression;
 
  }


  ShowCustomDateFilter() {
    if (this.showDateFilterTop) {
      if (this.selectedFilter == 'All' || this.selectedFilter == 'Custom Range' || this.selectedFilter == null) {
        this.isDateFilterValid = true;
      }

    }
    else {
      this.isDateFilterValid = false;
    }
    this.showDateFilter = !this.showDateFilter;
  }

  thisMopnth() {
    this.isDateFilterValid = false
    this.show = false;
    this.rangeDates = null;
    this.filterType='Month'
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
    this.showDateFilter = !this.showDateFilter;

  }
  today() {
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
    this.showDateFilter = !this.showDateFilter;
  }
  yesterday() {
    this.isDateFilterValid = false
    this.rangeDates = null;
    this.show = false;
    this.selectedFilter = "Yesterday";
    this.filterType = "Yesterday";
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    dte.toString();

    var yesterdaydate = this.datePipe.transform(dte, 'MM-dd-yyyy');
    this.From = yesterdaydate;
    this.TO = yesterdaydate;
    this.selectedFilter = "Yesterday" + '' + '( ' + (yesterdaydate + ' - ' + yesterdaydate) + ' )';

    this.showDateFilter = !this.showDateFilter;
  }
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
    this.showDateFilter = !this.showDateFilter;
  }

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

    this.showDateFilter = !this.showDateFilter;
  }


  lastMonth() {
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



    this.showDateFilter = !this.showDateFilter;
  }
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
  }
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
  }

  OnChangedDateRange(event: any) {
    this.isDateFilterValid = false
    this.From = this.datePipe.transform(this.rangeDates[0], 'MM-dd-yyyy');
    if (this.rangeDates[1] != null) {
      this.TO = this.datePipe.transform(this.rangeDates[1], 'MM-dd-yyyy');
    }
    this.filterType='Custom Range'
    if (this.From != null && this.TO != null) {

      this.selectedFilter = "Custom Range" + '' + '( ' + (this.From + ' - ' + this.TO) + ' )';
      this.startCalendar.overlayVisible = false;
      this.showDateFilter = !this.showDateFilter;

    }
    else {
      this.selectedFilter = "Custom Range";
    }
  }

  customRange() {
    if (this.selectedFilter == 'All' || this.selectedFilter == 'Custom Range' || this.selectedFilter == null) {
      this.isDateFilterValid = true;
    }
    else {
      this.isDateFilterValid = false;
    }

    this.selectedFilter = "Custom Range";
  }

  getCustomFieldData() {
  //  this.loading = true
    this.controlname = '';
    this.sortable = '';
    this.commonService.GetLoanHomiManageViewCustomFieldsLeadList(this.FieldlistFilter, this.moduleName, this.submoduleName, '', this.controlname, this.sortable, 'Report').subscribe((result: any) => {
     // this.loading = false;
      if (result) {
        this.customCompnentValues = this.commonService.loanHomicustomFieldsLeadList.data;
        this.customFieldLeadListSecond = [];
        let i = 0;
        this.customCompnentValues.forEach(t => {
          let obj = {
            text: t.shortdisplayname + ' | ' + t.display_name,
            index: i,
            value: t.form_field_id,
            fieldName: t.ColumnName,
          }
          this.customFieldLeadListSecond.push(obj);
          this.customFieldLeadListDummy.push(obj);
        })
      }
    });
  }

  updateFieldlistFilter(event) {

    if (this.FieldlistFilter === '') {
      if (this.TempcustomFieldLeadListSecond.length > 0) {
        this.customFieldLeadListSecond = [];
      }

      this.TempcustomFieldLeadListSecond.forEach(s => {
        this.customFieldLeadListSecond.push(s);

      });


      this.TempcustomFieldLeadListSecond = [];


      for (var i = this.customFieldLeadListSecond.length - 1; i >= 0; i--) {// added to remove already selected 
        for (var j = 0; j < this.droped.length; j++) {
          if (this.droped[j].value == (this.customFieldLeadListSecond[i].value)) {
            this.customFieldLeadListSecond.splice(i, 1);
            break; // add if item found it should break the for statement
          }
        }
      }

      return;
    }
    else {
      if (this.TempcustomFieldLeadListSecond.length == 0) {

        this.customFieldLeadListSecond.forEach(s => {
          this.TempcustomFieldLeadListSecond.push(s);
        })
        this.customFieldLeadListSecond = [];
      }

    }

    this.customFieldLeadListSecond = this.TempcustomFieldLeadListSecond.filter(s => s.text.toLowerCase().includes(this.FieldlistFilter.toLowerCase()));

    this.FieldlistFilter = event.target.value;

    let keycode = (event.keyCode ? event.keyCode : event.which);


    for (var i = this.customFieldLeadListSecond.length - 1; i >= 0; i--) {// added to remove already selected 
      for (var j = 0; j < this.droped.length; j++) {
        if (this.droped[j].value == (this.customFieldLeadListSecond[i].value)) {
          this.customFieldLeadListSecond.splice(i, 1);
          break; // add if item found it should break the for statement
        }
      }
    }



    if (keycode === 13 || keycode === '13') {

    }
  }

  OnItemSelected(item) {
    if (item.selected == true) {

      item.selected = false;
      return;
    }
    else {

      this.customFieldLeadListSecond[this.customFieldLeadListSecond.indexOf(item)].selected = true;

    }
  }

  OnShiftAllFromDragToDrop() {

    for (var i = 0; i < this.customFieldLeadListSecond.length; i++) {

      this.customFieldLeadListSecond[i].selected = false;


      this.droped.push(this.customFieldLeadListSecond[i]);
    }

    if (this.TempcustomFieldLeadListSecond.length > 0) {
      this.TempcustomFieldLeadListSecond = this.TempcustomFieldLeadListSecond.filter(s => !s.text.toLowerCase().includes(this.FieldlistFilter.toLowerCase()));

    } this.customFieldLeadListSecond.splice(0, this.customFieldLeadListSecond.length);

  }
  OnShiftOneFromDragToDrop() {

    let selected: number[] = [];
    for (var i = 0; i < this.customFieldLeadListSecond.length; i++) {
      if (this.customFieldLeadListSecond[i].selected == true) {
        this.customFieldLeadListSecond[i].selected = false;

        this.droped.push(this.customFieldLeadListSecond[i]);
        selected.push(i);
      }

    }

    for (var i = selected.length - 1; i >= 0; i--) {
      let temp: number = selected[i];
      this.customFieldLeadListSecond.splice(temp, 1);
    }
  }

  OnShiftOneFromDropToDrag() {
    let number = 0;
    for (var i = 0; i <= this.droped.length; i++) {

      if (this.droped[i].selected == true) {
        for (var j = 0; j < this.customFieldLeadListDummy.length; j++) {
          if (this.droped[i].value == this.customFieldLeadListDummy[j].value) {

            this.droped[i].selected = false;
            this.customFieldLeadListSecond.splice(j, 0, this.droped[i]);

            this.droped.splice(i, 1);
            i--;
            break;

          }

        }

      }
    }
  }

  OnShiftAllFromDropToDrag() {

    for (var i = 0; i < this.droped.length; i++) {
      this.droped[i].selected = false;
      for (var j = 0; j < this.customFieldLeadListDummy.length; j++) {
        if (this.droped[i].value == this.customFieldLeadListDummy[j].value) {
          this.droped[i].selected = false;
          this.customFieldLeadListSecond.splice(j, 0, this.droped[i]);
          break;
        }
      }
    }
    this.droped.splice(0, this.droped.length);
  }

  onDroppedItemClick(item) {
    this.droped[this.droped.indexOf(item)].selected = !item.selected;

  }





  hideCalendar(event) {
    if (event.target.tagName == 'DIV' || event.target.tagName == 'UL') {
      this.showDateFilter = false;
    }
  }
  gettt(field: FormGroup, i) {

    let ddloperator: any;
    this.getOperators(field.value.value, field);
    if (this.customWhereCondition == '') {
      this.customWhereCondition = field.value.text;
    } else {
      this.customWhereCondition = this.customWhereCondition + ' and ' + field.value.text;
    }


    if (field.value.dtCode) {


      this.customFieldList1.filter(x => {
        if (field.value.filedNameId == x.value) {
          ddloperator = x.selectlistvalues;

        }
      })

      field.get('dtCode').setValue(true);
    }
    else {
      field.get('dtCode').setValue(false);
    }
    return ddloperator;
  }
  SaveAndRun() {
    this.SaveAllFields('1');
    
  }


  SaveAllFields(val: string = '') {

    this.listFilter = '';
    this.iserror = 0;
    this.filtersearch();

    if (this.selectedFilter == 'All' || this.selectedFilter == 'Custom Range' || this.selectedFilter == null || this.selectedFilter == '') {
    
      if (this.showDateFilterTop)
        this.isDateFilterValid = true;
      else
        this.isDateFilterValid = false;
    }
    if (this.reportName == null || this.reportName == '') {
      this.isReportNameValid = true;
    }

    if (this.reportForm.valid) {
      if (!this.isDateFilterValid && !this.isReportNameValid) {

        //if (this.fieldmodel.length > 1) {
        //  var lengthOfFilterData = this.fieldmodel.length - 1;

        //  if (this.fieldmodel[lengthOfFilterData].operatorId == null || this.fieldmodel[lengthOfFilterData].filedNameId == null) {
        //    this.toaster.error('Filters field data is required');
        //  }
        //  else {
        //    this.runLoanApplicationReport();
        //  }
        //}
        //else if (this.fieldmodel.length >= 0 && this.iserror != 0) {

        //  if (this.iserror == '2')
        //    this.toaster.error('To date must be greater than From date.');
        //  else
        //    this.toaster.error('Filters field data is required.');
        //}


        if (this.fieldmodel.length >= 0 && this.iserror != 0) {
          // console.log('error', this.iserror);
          if (this.iserror == '2')
            this.toaster.error('To date must be greater than From date.');
          else
            this.toaster.error('Filters field data is required.');
        }

        //if (this.iserror != 0) {
        //  if (this.iserror == '2')
        //    this.toaster.error('To date must be greater than From date.');
        //  else
        //    this.toaster.error('All fields are required.');
        //}
        else {

          this.loading = true;

          // console.log('this.hiddenId', this.hiddenId);

          if (val == '1' && this.hiddenId != null && this.hiddenId != ''){
            this.loanApplicationReportModel.Id = this.hiddenId;
          }
          else if (this.reportId == 0 && this.hiddenId != null && this.hiddenId != '') {
            this.loanApplicationReportModel.Id = this.hiddenId;
          }
          else {
            this.loanApplicationReportModel.Id = this.reportId != 0 ? this.reportId : 0;
          }
          this.loanApplicationReportModel.reportName = this.reportName;
          this.loanApplicationReportModel.description = this.description;
          this.loanApplicationReportModel.dateFrom = this.From;
          this.loanApplicationReportModel.filterType = this.filterType;
          this.loanApplicationReportModel.dateTo = this.TO;
          this.selecteddata = JSON.stringify(this.droped);
          this.loanApplicationReportModel.selectedFields = this.selecteddata;
          this.loanApplicationReportModel.customWhereCondition = this.customWhereCondition;// JSON.stringify(this.customWhereCondition);
          this.loanApplicationReportModel.report_searchFilterJson = JSON.stringify(this.fieldmodel);
          this.loanApplicationReportModel.chartType = this.widgetType;
          this.loanApplicationReportModel.groupByFieldId = this.groupByFieldId;



          this.commonService.SaveLoanApplicationReportData(this.loanApplicationReportModel).subscribe((result: any) => {
            if (result.statusCode == 200) {
              this.toaster.success(result.responseMessage);


              if (val == '1') {
                this.hiddenId = result.id;
                this.runloanapplication();
                this.loading = false;
              }
              else {
                this.columndata = [];
                this.columnheading = [];
                this.router.navigateByUrl("/allReports");
                this.loading = false;
              }
            }
            else {
              this.loading = false;
              this.toaster.error(result.responseMessage);
            }
          }, error => {
            this.loading = false;
          });
        }
      }
    }
    else {
      this.commonService.validateAllFormFields(this.reportForm);
    }
  }


  runloanapplication() {
    this.listFilter = '';
    this.showDateFilter = false;
    this.isReportNameValid = false;
    this.iserror = 0;
    this.filtersearch();
    
    //if (this.fieldmodel.length > 1) {
    //  var lengthOfFilterData = this.fieldmodel.length - 1;

    //  if (this.fieldmodel[lengthOfFilterData].operatorId == null || this.fieldmodel[lengthOfFilterData].filedNameId == null) {
    //    this.toaster.error('Filters field data is required');
    //  }
    //  else {
    //    this.runLoanApplicationReport();
    //  }
    //}
    if (this.fieldmodel.length >= 0 && this.iserror != 0) {
      if (this.iserror == '2')
        this.toaster.error('To date must be greater than From date.');
      else
        this.toaster.error('Filters field data is required.');
    }
    else {
      this.runLoanApplicationReport();

    }
  }


  runLoanApplicationReport() {
    //this.showDateFilter = false;
    //this.isReportNameValid = false;
    //this.iserror = 0;

   


      //this.filtersearch();

      

      if (this.showDateFilterTop) {
        if (this.selectedFilter == 'All' || this.selectedFilter == 'Custom Range' || this.selectedFilter == null || this.selectedFilter == '') {
          this.isDateFilterValid = true;
        }
      }



      if (this.reportForm.valid) {
        if (!this.isDateFilterValid) {
          this.selecteddata = JSON.stringify(this.droped);
          this.filterData = JSON.stringify(this.fieldmodel);

          this.runLoanApplicationReportModel.selecteddata = this.selecteddata;
          this.runLoanApplicationReportModel.filterData = this.filterData;
          this.runLoanApplicationReportModel.sortColumn = this.sortColumn;
          this.runLoanApplicationReportModel.sortDir = this.sortDir;
          this.runLoanApplicationReportModel.currentPage = this.currentPage;
          this.runLoanApplicationReportModel.pageSizeValue = this.pageSizeValue;
          this.runLoanApplicationReportModel.From = this.From;
          this.runLoanApplicationReportModel.TO = this.TO;
          this.runLoanApplicationReportModel.customWhereCondition = this.customWhereCondition;//encodeURIComponent(this.customWhereCondition);





          this.loading = true;
          this.loanapplicationsService.GetLoanApplicationReportList(this.runLoanApplicationReportModel).subscribe(response => {
            this.showGraphBtn = true;


            this.columndata = [];
            this.columnheading = [];

            this.jsonData = response;
            this.columndata = this.jsonData.data;
            this.columnheading = this.jsonData.schema;

            // console.log('columndata', this.columndata);
            // console.log('columnheading', this.columnheading);

            this.loading = false;
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
            if (this.showGraph == true) {
              this.showGraphVisualization(this.widgetType);
            }

            if (this.reportId != 0 && this.groupByFieldId != null) {
              this.showGraphVisualization(this.widgetType);
            }
          }, error => {
            this.loading = false;
          })
        }
      }
      else {
        this.commonService.validateAllFormFields(this.reportForm);
      }
    
    
      //this.loading = false;
  }


  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  get curPage(): number {
    return this.offset;
  }

  setPage($event) {
    this.loading = true;
    this.currentPage = $event.page;
    this.runloanapplication();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.runloanapplication();
  }
  onChange($event) {
    this.currentPage = 1;
    this.runloanapplication();
  }


  viewLoanApp(id: any) {
      this.router.navigateByUrl('/loanApplication/Detail/' + id);
  }
  close() {
    this.router.navigateByUrl('/allReports');
  }

  updateFilter(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  search() {
        this.columndata = this.columndata.filter(x => x.Id == this.listFilter);
  }


  reset() {
    this.listFilter = '';
    this.runloanapplication();
  }

  hideGraphVisualization(value: any) {
    this.groupByFieldId = null;
    this.showHideChartBtn = false;
    this.showGraph = false;
    
  }

  showGraphVisualization(value:any) {
    if (value == 'doughnut' && this.groupByFieldId != undefined || this.groupByFieldId != null) {
      this.showHideChartBtn = true;
      if (value == 'line') {
        this.widgetType = 'line';
        this.isLineChart = true;
        this.isBarChart = false;
        this.isPieChart = false;
      }
      else if (value == 'bar') {
        this.widgetType = 'bar';
        this.isBarChart = true;
        this.isPieChart = false;
        this.isLineChart = false;
      }
      else {
        this.widgetType = 'doughnut';
        this.isPieChart = true;
        this.isBarChart = false;
        this.isLineChart = false;
      }
    }
    if (this.groupByFieldId == undefined || this.groupByFieldId == null) {
      this.graphBtnName = 'Graph Visualization';
        this.isgroupByFieldValid = true;
    }
    else {
      this.isgroupByFieldValid = false;
      this.ShowDoughnutGraph();
    }
  }

  

  onChangeGroupBy($event) {
    this.isgroupByFieldValid = false;
  }

  ShowDoughnutGraph() {
    this.graphColumnNames = [];
    this.graphColumnData = [];

    this.selecteddata = JSON.stringify(this.droped);
    this.filterData = JSON.stringify(this.fieldmodel);
    this.runLoanApplicationReportModel.selecteddata = this.selecteddata;
    this.runLoanApplicationReportModel.filterData = this.filterData;
    this.runLoanApplicationReportModel.From = this.From;
    this.runLoanApplicationReportModel.TO = this.TO;
    this.runLoanApplicationReportModel.groupByFieldId = this.groupByFieldId;
    this.runLoanApplicationReportModel.customWhereCondition = this.customWhereCondition;//encodeURIComponent(this.customWhereCondition);


    //this.loading = true;
    this.loanapplicationsService.GetGraphVisualizationReportData(this.runLoanApplicationReportModel).subscribe(response => {

      this.graphjsonData = response;
      this.graphdata = this.graphjsonData.data;

      if (this.graphdata != null) {

        this.showGraph = true;
        this.graphdata = this.graphdata.filter(x => x.DataCount != 0)

        this.graphColumnNames = this.graphdata.map(function (a) {
          return a.LabelName;
        });


        if (this.widgetType == 'doughnut') {
          if (this.graphdata.length == 0) {
            this.graphColumnNames = [];
            this.graphColumnData = [];
          }
          else {
            this.graphColumnData = this.graphdata.map(function (a) {
              return a.DataCount;
            });
          }
          let backgroundcolor: String[] = [];
          let index = 0;
          for (let color of this.graphColumnNames) {
            backgroundcolor[index] = '#' + Math.floor(Math.random() * 16777215).toString(16);
            index = index + 1;
          }
          this.graphWidgetData = {
            labels: this.graphColumnNames,
            datasets: [{
              backgroundColor: backgroundcolor,
              data: this.graphColumnData
            }]
          }
          this.graphOption = {
            //maintainAspectRatio: false,
            responsive: true,
            legend: {
              position: 'left',
            },

          }

        }

        else if (this.widgetType == 'bar') {
          var arrayValues: any = [];
          arrayValues = this.graphdata.map(function (a) {
            return parseInt(a.DataCount);
          });

          this.graphWidgetData = {
            labels: this.graphColumnNames,
            datasets: [{
              data: arrayValues,
              backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            }]
          }
          this.graphOption = {
            scales: {
              ticks: {
                beginAtZero: true,
                //min: 0,
                //max: 5,
                //stepSize: 1
              },
              x: {
                ticks: {

                  color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                }
              },
              y: {
                ticks: {
                  color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                }
              }
            },
            legend: {
              display: false
            },
            responsive: true
          }

        }
        else if (this.widgetType == 'line') {
          var arrayValues: any = [];
          arrayValues = this.graphdata.map(function (a) {
            return parseInt(a.DataCount);
          });

          this.graphWidgetData = {
            labels: this.graphColumnNames,
            datasets: [{
              data: arrayValues,
              fill: false,
              borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
              //tension: .4
            }]
          };

          this.graphOption = {
            //maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              x: {
                ticks: {
                  color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                },
                grid: {
                  color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                }
              },
              y: {
                ticks: {
                  beginAtZero: true,
                  color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                },
                grid: {
                  color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                }
              }
            },
            responsive: true
          }
        }

      }

    }, error => {
      this.loading = false;
    })

  }

  onCountWidget(event: any) {
    let value = event.target.checked;
    if (value == true) {
      this.showApplyToFields = true;
      this.addCountWidgetForm.reset({ radiogroup: "Only For Me" });
      this.addCountWidgetForm.get('selectedRole').setValue(null);
    }
    else {
      this.addCountWidgetForm.reset({ radiogroup: "Only For Me" });
      this.addCountWidgetForm.get('selectedRole').setValidators([Validators.nullValidator]);
      this.addCountWidgetForm.controls["selectedRole"].updateValueAndValidity();
      this.addCountWidgetForm.get('selectedRole').setValue(null);
      this.showApplyToFields = false;
    }
  };
  OnChangeApplyToValue(e) {
    this.getAllRoleTypes();
    let selectedValue = this.addCountWidgetForm.get("radiogroup").value;
    if (selectedValue == "Roles") {
      this.getAllRoleTypes();
      this.addCountWidgetForm.get("selectedRole").setValidators(Validators.required);
      this.addCountWidgetForm.controls["selectedRole"].updateValueAndValidity();
    } else {
      this.addCountWidgetForm.get('selectedRole').setValue(null);
      this.addCountWidgetForm.get("selectedRole").setValidators(Validators.nullValidator);
      this.addCountWidgetForm.controls["selectedRole"].updateValueAndValidity();
    }
  };
  onChatView(event: any) {
    let value = event.target.checked;
    if (value == true) {

      // this.showBarChartFields = true;
      this.displayCharts = true;
      this.addBarChartForm.reset({ radioChartBtn: "Only For Me" });
      this.addBarChartForm.get('chartSelectedRole').setValue(null);
      this.addBarChartForm.get('yAxisId').setValidators([Validators.required]);
      this.addBarChartForm.controls["yAxisId"].updateValueAndValidity();
    }
    else {
      this.showBarChartFields = false;
      this.displayCharts = false;
      this.chartType = null;
      this.addBarChartForm.get('yAxisId').setValue(null);
      this.addBarChartForm.get('yAxisId').setValidators([Validators.nullValidator]);
      this.addBarChartForm.controls["yAxisId"].updateValueAndValidity();
    }
  };
  OnChangeChartApplyToValue(e) {
    this.getAllRoleTypes();
    this.isHorizontalChart = false;
    this.isPieChartForLinkTab = false;
    this.isAreaChart = false;
    let selectedValue = this.addBarChartForm.get("radioChartBtn").value;
    if (selectedValue == "Roles") {
      this.getAllRoleTypes();
      this.addBarChartForm.get("chartSelectedRole").setValidators(Validators.required);
    } else {
      this.addBarChartForm.get('chartSelectedRole').setValue(null);
    }
    this.addBarChartForm.controls["chartSelectedRole"].updateValueAndValidity();
  };
  onClickHorizontalChart() {
    this.showBarChartFields = true;
    this.chartType = 'HorizontalChart';
    this.yAxisList = this.droped;
    this.addBarChartForm.get('yAxisId').setValidators([Validators.required]);
    this.addBarChartForm.controls["yAxisId"].updateValueAndValidity();
  };
  onClickPieChart() {
    this.showBarChartFields = true;
    this.chartType = 'PieChart';
    this.yAxisList = this.droped;
    this.addBarChartForm.get('yAxisId').setValidators([Validators.required]);
    this.addBarChartForm.controls["yAxisId"].updateValueAndValidity();
  };
  onClickAreaChart() {
    this.showBarChartFields = true;
    this.chartType = 'AreaChart';
    this.yAxisList = this.droped;
    this.addBarChartForm.get('yAxisId').setValidators([Validators.required]);
    this.addBarChartForm.controls["yAxisId"].updateValueAndValidity();
  }
  onListView(event: any) {
    let value = event.target.checked;
    if (value == true) {
      this.yAxisList = this.droped;
      this.showListViewApplyToFields = true;
      this.addListViewForm.reset({ listViewRadioBtn: "Only For Me" });
      this.addListViewForm.get('listViewselectedRole').setValue(null);
      this.addListViewForm.get('listViewFields').setValidators([Validators.required]);
      this.addListViewForm.controls["listViewFields"].updateValueAndValidity();
    }
    else {
      this.yAxisList = this.droped;
      this.showListViewApplyToFields = false;
      this.addListViewForm.get('listViewFields').setValue(null);
      this.addListViewForm.get('listViewFields').setValidators([Validators.nullValidator]);
      this.addListViewForm.controls["listViewFields"].updateValueAndValidity();
      this.addListViewForm.get('listViewselectedRole').setValue(null);
      this.addListViewForm.get('listViewselectedRole').setValidators([Validators.nullValidator]);
      this.addListViewForm.controls["listViewselectedRole"].updateValueAndValidity();
    }
  };
  OnChangeListViewApplyToValue(e) {
    this.getAllRoleTypes();
    let selectedValue = this.addListViewForm.get("listViewRadioBtn").value;
    if (selectedValue == "Roles") {
      this.addListViewForm.get('listViewselectedRole').setValue(null);
      this.addListViewForm.get("listViewselectedRole").setValidators(Validators.required);
    }
    else {
      this.addListViewForm.get("listViewselectedRole").setValidators(Validators.nullValidator);
      this.addListViewForm.controls["listViewselectedRole"].updateValueAndValidity();
    }
    this.addListViewForm.controls["listViewselectedRole"].updateValueAndValidity();
  };
  getAllRoleTypes() {
    this.commonService.getMasterItemsList("ROLE_FOR_MANAGE_VIEW").subscribe((result: any) => {
      this.RoleList = this.commonService.masters;
    })
  };

}

