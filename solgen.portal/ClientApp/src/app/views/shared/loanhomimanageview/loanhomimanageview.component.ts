import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef, Directive, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService, LoanHomiManageViewModel } from '../common.service';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DateTimeToLocalForAddEditForDatePipe } from '../../../pipes/datetime.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loanhomimanageview',
  templateUrl: './loanhomimanageview.component.html',
  styleUrls: ['./loanhomimanageview.component.scss']
})
export class LoanhomimanageviewComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  loanHomiManageViewModel: LoanHomiManageViewModel = new LoanHomiManageViewModel();
  @ViewChild('condition', { static: false }) condition: NgSelectComponent;

  ManageFiledGroup: FormGroup;
  isDroppingToCustomField: boolean;
  draggedField: any;
  @Output() customViewid: EventEmitter<any> = new EventEmitter();
  @ViewChild('templateLoanHomiManageView', { static: false }) ModalManageView: ModalDirective;
  @ViewChild("ClonePopup", { static: false }) ClonePopup: ModalDirective;
  @ViewChild('droppedView', { static: false }) DroppedView: ElementRef;
  @ViewChild('viewname', { static: false }) Viewname: ElementRef;
  @ViewChild('templateSecondaryManageView', { static: false }) ModalManageSecondaryView: ModalDirective;
  @Input('moduleName') moduleName: string;
  @Input('subModuleName') submoduleName: string;
  templateSecondaryManageView;
  manageViewForm: FormGroup;
  AddViewForm: FormGroup;
  DragViewForm: FormGroup;
  operatorList: any[] = [];
  companyId: any;
  controlname: any;
  sortable: any;
  customWhereCondition: any;
  customCompnentValues: any;
  customFieldLeadList: any[] = [];
  customFieldLeadListSecond: any[] = [];
  customFieldLeadListDummy: any[] = [];
  customFieldList: any[] = [];
  tempcustomFieldListFromDragToDrop: any[] = [];
  customFieldList1: any[] = [];
  tempalateContent: String;
  htmlStr: any;
  listFilter = '';
  FieldlistFilter = '';
  StorecustomFieldList1: any[] = [];
  searchTxt = '';
  listFiltertext = '';
  lstUserType: any;
  searchUserType = '';
  sortDir = 'desc';
  sortColumn = 'id';
  pageSizeValue: number = 10;
  pageNumber: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  C_View_Id: any = 0;
  loadSave = false;
  name = 'Angular'
  droped: any[] = [];
  dragedColor: any[] = [];
  selecteddata: any;
  currentPage: number = 1;
  loginuserid: any;
  custom_view_id: any;
  lstPageSize: any;
  fieldmodel: any[] = [];
  loading = false;
  Data: any[] = [];
  Data12: any[] = [];
  operatorId1: any;
  filedNameId2: any;
  txtvaluefrom3: any;
  txtvalueto: any;
  companyadmin: boolean = false;
  DTCode: boolean;
  tableName = 'tblcustom_field_viewport';
  DdlValues: any[] = [];
  RoleList: any[] = [];

  searchText: string;
  len: any = 10;
  scrollDataList: any;
  custom_field_ids: any;
  field_code: any;
  ddlData: any[] = [];
  rows = [];
  isHidden = true;
  Ddloperators: any[] = [];
  iserror: any = 0;
  ViewIdForClone: any = 0;
  ViewNameForClone: any = "";
  listType = '';
  roleCode: string = '';
  isdealerFinanceUser: boolean = false;
  constructor(
    
    private fb: FormBuilder,
    private commonService: CommonService,
    private toaster: ToastrService,
    public ref: ChangeDetectorRef,
    private dialogService: ConfirmationDialogService,
    private activeRoute: ActivatedRoute) {
    this.ddlData = [
      { id: 1, name: 'Add', disabled: true },
      { id: 2, name: 'Or' },
      { id: 3, name: 'And' }
    ];
  }

  ngOnInit() {

    this.activeRoute.url.subscribe(params => {
      if (params.length != 0) {
        if (params[1].path == 'Completed') {
          this.listType = 'Completed';
        }
        if (params[1].path == 'Cancelled') {
          this.listType = 'Cancelled';
        }
      }
      else {
        this.listType = 'Normal';
      }
    }); 

    this.isHidden = true;
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
   
      this.roleCode = userdetail.roleCode;

      if (this.roleCode == 'dealer_finance_user' || this.roleCode == 'dealer_finance_manager') {
        this.isdealerFinanceUser = true;
      }

      if (userdetail.userType == "usertypecompanyadmin" || (userdetail.userType == "usertypedealer" && userdetail.roleCode == "dealer_companyadmin")) {
        this.companyadmin = true;
      }
    });
    this.DTCode = false;
    this.initForm();
    this.pageSizeValue = 10;
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();
    this.recalculateData();
    this.getAllOperatorsData(-1);
  }
  recalculateData() {
    this.rows = [...this.pagedData.data];
  }

  showManageView() {
    this.loadSave = false;
    this.isHidden = false;
    this.ModalManageView.show();
  }

  showManageViewSecondary() {
    this.loadSave = true;
    this.isHidden = false;
    this.ModalManageSecondaryView.show();
    this.loadSave = false;
  }
  close() {
    this.isHidden = true;
    this.ModalManageView.hide();
  }

  closesecond() {
    this.isHidden = true;
    this.ModalManageSecondaryView.hide();
  }



  applyView(val: string) {
    this.loadSave = true;
    this.isHidden = true;
    this.ModalManageView.hide();
    this.customViewid.emit(val);
    this.loadSave = false;
  }

  EditPage(val: string) {
    this.getAllRoleTypes();
    this.loadSave = true;
    while (this.fields.length != 0) {
      this.fields.removeAt(0);
    }
    this.C_View_Id = val;

    this.close();
    this.showManageViewSecondary();
    this.GetCustomViewbyId();

    var link = document.getElementById('selcolumn-tab');
    link.click();
    this.AddViewForm.reset();
  }

  Delete(row: any) {
    const message = `Are you sure you want to delete view  "${row.view_name}"?`;
    this.dialogService.confirm('Delete View', message).subscribe(confirmed => {
      if (confirmed) {
        this.commonService.DeleteLoanHomiRecords(row.custom_view_id, this.tableName).subscribe(r => {
          this.toaster.success(`View "${row.view_name}" has been deleted successfully`);
          this.refresh();
          this.customViewid.emit();
        }, error => {
        });
      }
    });
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

  OnItemSelected(item) {
    if (item.selected == true) {

      item.selected = false;
      return;
    }
    else {

      this.customFieldLeadListSecond[this.customFieldLeadListSecond.indexOf(item)].selected = true;

    }
    //item.selected = true;
  }

  OnShiftOneFromDropToDrag() {
    let number = 0;
    for (var i = 0; i <= this.droped.length; i++) {

      if (this.droped[i].selected == true) {
        for (var j = 0; j < this.customFieldLeadListDummy.length; j++) {
          if (this.droped[i].value == this.customFieldLeadListDummy[j].value) {

            this.droped[i].selected = false;
            //alert(this.customFieldLeadListDummy[j].index);
            this.customFieldLeadListSecond.splice(j, 0, this.droped[i]);

            this.droped.splice(i, 1);
            i--;
            break;

          }

        }

      }
    }
  }
  onDroppedItemClick(item) {
    this.droped[this.droped.indexOf(item)].selected = !item.selected;

  }

  GetCustomViewbyId() {
    this.loadSave = true;
    this.commonService.GetLoanHomiCustomViewbyId(this.C_View_Id).subscribe((response: any) => {
      this.loadSave = false;
      const convertdatetime = new DateTimeToLocalForAddEditForDatePipe();

      while (this.fields.length != 0) {
        this.fields.removeAt(0);
      }
      var ab = response[0].view_searchFilterJson;
      var ac = response[0].view_searchFilter;
      this.Data = JSON.parse(ab);

      //// console.log('this.Data0', this.Data);

      this.Data12 = JSON.parse(ab);
      
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


      this.AddViewForm.patchValue({
        select: response[0].view_name,
        radiogroup: response[0].view_for,
        selectedRole: (response[0].role_ids != null && response[0].role_ids != "") ? response[0].role_ids.split(",") : null
      });
      this.droped = response.map(m => {
        return {
          text: m.shortdisplayname + ' | ' + m.display_name,
          value: m.custom_field_id,
          isChecked: m.is_sortable,
        }

      });

      if (this
        .droped.length == this.customFieldLeadListSecond.length) {
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
  
  refresh() {
    this.loading = true;
    this.currentPage = 1;
    this.commonService.GetLoanHomiViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId, this.listType).subscribe(response => {
      this.pagedData = this.commonService.loanHomiPagedData;
     
      this.loading = false;
    }, error => {
      this.loading = false;
    }, () => { this.isHidden = false; })
  }
  getAllOperatorsData(id: any) {
    this.commonService.getLoanHomiOperatorsList(id, 'LoanApplication').subscribe((response: any) => {
      this.Ddloperators = this.commonService.operator;
    });
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.refresh();
    }
  }


  getCustomFieldFilterData(custom_view_id: any  ) {
    this.loading = true;
    this.customFieldList1.length = 0;
    this.commonService.GetLoanHomiManageViewCustomFieldsLeadList('', this.moduleName, this.submoduleName, this.companyId, '','').subscribe((result: any) => {
    //this.commonService.GetLoanHomiCustomFieldsListDisplay(this.moduleName, this.submoduleName, this.companyId, 'MANAGE').subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.commonService.loanHomicustomFieldsLeadList.data;
        //// console.log('this.customCompnentValues01', this.customCompnentValues);
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
        this.StorecustomFieldList1 = this.customFieldList;
      }
    }, error => {
      this.loading = false;
    }, () => { this.isHidden = false; this.loading = false; });
  }
  onNextOfModuleOne(event, id) {
  }

  getCustomFieldData() {
    this.loadSave = true;
    this.controlname = '';
    this.sortable = '';
    this.commonService.GetLoanHomiManageViewCustomFieldsLeadList(this.FieldlistFilter, this.moduleName, this.submoduleName, this.companyId, this.controlname, this.sortable).subscribe((result: any) => {
      this.loadSave = false;
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

  show(templateContent) {
    this.tempalateContent = templateContent
    this.htmlStr = this.tempalateContent;
    this.showManageView();
    this.getCustomFieldData();
    this.getOperators("0",null);
    this.refresh();
    this.getCustomFieldFilterData("0");
  }

  getOperators(id: any, field: FormGroup, isEdit = false) {
    //// console.log('form_id:', id);
    this.commonService.getLoanHomiOperatorsList(id,'LoanApplication').subscribe((response: any) => {
    
      if (!isEdit && field != null) {
        field.get('operators').setValue(this.commonService.operator);
      } else {
        return this.commonService.operator;
      }
    });
  }

  AddPage() {
    this.getAllRoleTypes();
    this.C_View_Id = '0';
    this.FieldlistFilter = '';
    this.manageViewForm.reset();
    this.getCustomFieldData();
    this.getOperators("0", null);
    while (this.fields.length != 0) {
      this.fields.removeAt(0);
    }

    if (this.fields.length == 0) {
      this.fields.push(this.fb.group({
        operatorId: null,
        filedNameId: null,
        txtvaluefrom: '',
        txtvalueto: '',
        operators: [],
        dtCode: [false],
        type: '',
        fieldText: ['']
      }));
    }
    this.droped = [];
    this.clearfields();
    this.close();
    this.showManageViewSecondary();
    var link = document.getElementById('selcolumn-tab');
    link.click();
    this.AddViewForm.reset();
  }

  clearfields() {
    while (this.fields.length != 0) {
      this.fields.removeAt(0);
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
  }

  filtersearch() {
    if (this.manageViewForm.get('fields').valid) {
      this.fieldmodel = [] = [];
      this.fieldmodel.length = 0;
      this.customWhereCondition = '(';
      var mainData = this.manageViewForm.value.fields.filter((element, index) => {
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
        } else if (element.fieldText == "datetime") {
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
              operatorstring = operator[0].expression + ' ' + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom) + "', 23) " + " And " + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvalueto) + "', 23)) ";
            }
            else {
              operatorstring = operator[0].expression + ' ' + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom) + "', 23) " + " And " + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvalueto) + "', 23) ";
            }

            //operatorstring = operator[0].expression + ' ' + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom) + "', 23) " + " And " + " convert(varchar,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvalueto) + "', 23) ";

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
            this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + field[0].alias + '.' + field[0].text + ', 23) ' + operatorstring + ') ' + element.type + ' ';
          } else if (element.fieldText == "datetime") {
            this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + field[0].alias + '.' + field[0].text + ', 121) ' + operatorstring + ') ' + element.type + '';
          } else {
            this.customWhereCondition = this.customWhereCondition + ' (' + field[0].alias + '.' + field[0].text + ' ' + operatorstring + ') ' + element.type + '';
          }
        }
        else if (element.type == 'And') {
          if (element.fieldText == "date") {
            this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + field[0].alias + '.' + field[0].text + ', 23) ' + operatorstring + ') ) ' + element.type + ' (';
          } else if (element.fieldText == "datetime") {
            this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + field[0].alias + '.' + field[0].text + ', 121) ' + operatorstring + ') ) ' + element.type + ' (';
          } else {
            this.customWhereCondition = this.customWhereCondition + ' (' + field[0].alias + '.' + field[0].text + ' ' + operatorstring + ') ) ' + element.type + ' (';
          }
        }
        else {
          if (element.fieldText == "date") {
            this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + field[0].alias + '.' + field[0].text + ', 23) ' + operatorstring + ') ';
          } else if (element.fieldText == "datetime") {
            this.customWhereCondition = this.customWhereCondition + ' (convert(varchar,' + field[0].alias + '.' + field[0].text + ', 121) ' + operatorstring + ') ';
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
      });
      if (this.customWhereCondition == '(') {
        this.customWhereCondition = null;
      } else {
        this.customWhereCondition += ')';
      }
      this.ModalManageView.hide();
    }
    else {
      this.iserror = 1;
      this.commonService.validateAllFormFields(this.manageViewForm);
    }
  }

  loadOperator($event, field: FormGroup, i: number) {
    this.getOperators($event.value, field);
  }

  onChangeField($event, field: FormGroup, i: number) {

    //// console.log('$event', $event, '___1', field, '_________2', i,)

    this.custom_field_ids = null;
    this.field_code = null;

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
    }

    else if ($event.dt_code == 'boolean') {
      this.DdlValues.splice(i, 1, [])
      field.get('dtCode').setValue(false);
      field.get('txtvaluefrom').setValue(false);
      field.get('txtvaluefrom').clearValidators();
      field.get('txtvaluefrom').updateValueAndValidity();
    }

    else {

      this.DdlValues.splice(i, 1, [])
      field.get('dtCode').setValue(false);
      
    }

    if ($event.dt_code != 'boolean') {
      field.get('txtvaluefrom').setValue(null);
    }


    field.get('txtvaluefrom').setValue(null);
    field.get('fieldText').setValue($event.dt_code);
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

  onChangeOperator($event, field: FormGroup, i: number) {
    if (field.value.fieldText == 'boolean') {
      field.get('txtvaluefrom').setValue(false);
      field.get('txtvaluefrom').clearValidators();
      field.get('txtvaluefrom').updateValueAndValidity();
    }
    else {
      field.get('txtvaluefrom').setValue(null);
    }
    this.customWhereCondition = this.customWhereCondition + '  ' + $event.expression;
  }

  onChange($event) {
    //// console.log($event);
    this.pageSizeValue = $event.text;
    this.currentPage = 1;
    this.refresh();
  }

  onKey($event) {
    this.customWhereCondition = this.customWhereCondition + '  ' + $event.target.value;
  }

  SaveAllFields() {
    this.iserror = 0;
    this.filtersearch();
    if (this.AddViewForm.valid) {
      if (this.AddViewForm.value.select == null || this.AddViewForm.value.select == '' || this.droped.length == 0 || this.AddViewForm.value.radiogroup == null || this.iserror != 0) {
        if (this.iserror == '2')
          this.toaster.error('To date must be greater than From date.');
        else
          this.toaster.error('All fields are required.');
      }
      else {

        //// console.log('this.fieldmodel', JSON.stringify(this.fieldmodel));
        //// console.log('this.droped', this.droped);
        //// console.log('this.customWhereCondition', this.customWhereCondition);

        this.droped[0].isChecked = true;

        //var myobject = this.droped[0];
        //myobject.isChecked = true;
        //this.droped.splice(0, 1, myobject);

        this.loadSave = true;

        this.loanHomiManageViewModel.Id = this.C_View_Id;
        this.loanHomiManageViewModel.moduleName = this.moduleName;
        this.loanHomiManageViewModel.subModuleName = this.submoduleName;
        this.loanHomiManageViewModel.radiogroup = this.AddViewForm.value.radiogroup;
        this.loanHomiManageViewModel.select = this.AddViewForm.value.select;
        this.selecteddata = JSON.stringify(this.droped);
        this.loanHomiManageViewModel.selectedFields = this.selecteddata;
        this.loanHomiManageViewModel.Roles = (this.AddViewForm.value.selectedRole != null) ? this.AddViewForm.value.selectedRole.join(",") : null;
        this.loanHomiManageViewModel.customWhereCondition = this.customWhereCondition;// JSON.stringify(this.customWhereCondition);
        this.loanHomiManageViewModel.view_searchFilterJson = JSON.stringify(this.fieldmodel);
        this.loanHomiManageViewModel.manage_view_for = this.listType;


        this.commonService.SaveLoanHomiManageViewField(this.loanHomiManageViewModel).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.closesecond();
            this.refresh();

            this.customViewid.emit();
            this.ModalManageView.show();

          }
          else {
            this.loadSave = false;
            this.toaster.error(result.responseMessage);
          }
        }, error => {
          this.loadSave = false;
        });
      }
    }
    else {
      this.commonService.validateAllFormFields(this.AddViewForm);
    }
  }
  onDatesRangeFilterSelected($event) {
  }
 
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onChecked() {
  }

  GetcustomDefaultView(view_Id: any, name: any, event: any) {
    const message = `Are you sure you want to set as "${name}" default view `;
    this.dialogService.confirm('Set as default view', message).subscribe(confirmed => {
      if (confirmed) {
        this.commonService.GetLoanHomiCustomDefaultView(view_Id, this.moduleName, this.submoduleName, this.listType).subscribe(response => {
          this.refresh();
          this.applyView(view_Id);
          this.toaster.success(`"${name}" has been set as default  successfully`);
        }
          , error => {
          });
      }
      else {
        event.srcElement.checked = false;
      }
    });
  }

  setPage($event) {
    this.loading = true;
    this.pageNumber = $event.page - 1;
    this.commonService.GetLoanHomiViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId, this.listType).subscribe(response => {

      this.pagedData = this.commonService.loanHomiPagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  dragEndBack(e) {
  }

  get fields(): FormArray {
    return this.manageViewForm.get('fields') as FormArray;
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
      }
    });
  }


  //***Uncommented by Rohit Rana***
  search() {
    this.currentPage = 1;
    this.listFiltertext = '';
    this.listFilter = "ViewName like '%" + this.listFilter + "%'";
    this.listFiltertext = this.listFilter;
    this.refresh();
    this.listFilter = '';
  }

  private initForm() {
    this.customWhereCondition = '';
    this.manageViewForm = this.fb.group({
      operatorId: [null, Validators.required],
      filedNameId: [null, Validators.required],
      txtvaluefrom: ['', Validators.required],
      txtvalueto: [''],
      viewName: [''],
      forMe: [''],
      others: [''],
      all: [''],
      fields: this.fb.array([this.buildFields()], Validators.required)
    });

    this.AddViewForm = this.fb.group(
      {
        select: [null, Validators.required],
        radiogroup: [null, Validators.required],
        selectedRole: [null]
      });

    this.AddViewForm.reset();
  }
  getRowClass = (row) => {

    return {
      'row-color': (row.is_apply === 1 ? true : false)
    };
  }

  get select() { return this.AddViewForm.get('select'); }

  buildFields(): FormGroup {
    return this.fb.group({
      operatorId: [null, Validators.required],
      filedNameId: [null, Validators.required],
      txtvaluefrom: [null, Validators.required],
      txtvalueto: [''],
      operators: [],
      dtCode: [false],
      type: [''],
      fieldText: ['']
    });
  }
  get operatorId() { return this.manageViewForm.get('operatorId'); }
  get filedNameId() { return this.manageViewForm.get('filedNameId'); }
  get txtvaluefrom() { return this.manageViewForm.get('txtvaluefrom'); }
  get type() { return this.manageViewForm.get('type'); }
  get viewName() { return this.AddViewForm.get('viewName'); }
  get forMe() { return this.AddViewForm.get('forMe'); }
  get others() { return this.AddViewForm.get('others'); }
  get all() { return this.AddViewForm.get('all'); }
  get fieldText() { return this.manageViewForm.get('fieldText'); }

  TempcustomFieldLeadListSecond: any[] = [];
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
  closetoList() {
    this.closesecond();
    this.showManageView();
  }


  onScrollToEnd(dataList: any, i: number) {
    this.fetchMore(dataList, i);
  }

  private fetchMore(dataList: any, i: number) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_ids, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      let item = [];
      (item as any[]) = (dataList as any[]).concat(this.scrollDataList);
      this.DdlValues.splice(i, 1, item)

    })
  }

  onKeySelect(e: any, dataList: any, i: number) {
    this.len = 0
    this.searchText = e.target.value;
    this.DdlValues.length = 0;
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_ids, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      let item = [];
      (item as any[]) = (item as any[]).concat(this.scrollDataList);
      this.DdlValues.splice(i, 1, item)
    })
  }

  onClearLang(dataList: any, i: number): void {
    this.len = 0
    this.searchText = '';
    this.DdlValues.length = 0;
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_ids, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      let item = [];
      (item as any[]) = (item as any[]).concat(this.scrollDataList);
      this.DdlValues.splice(i, 1, item)
    })
  }
  onReset_Click() {
    this.searchTxt = '';
    this.refresh();
  }
  OnChangeApplyToValue(e) {
    let selectedValue = this.AddViewForm.get("radiogroup").value;
    if (selectedValue == "Roles") {
      this.AddViewForm.get("selectedRole").setValidators(Validators.required);
    } else {
      this.AddViewForm.get("selectedRole").setValidators(Validators.nullValidator);
    }
    this.AddViewForm.controls["selectedRole"].updateValueAndValidity();
  }
  getAllRoleTypes() {
    this.commonService.GetDDLListByFieldCode("ROLE_FOR_MANAGE_VIEW", null, null).then((res: any) => {
      if(res != null && res != undefined && res != '')
        this.RoleList = JSON.parse(res);
       // // console.log(this.RoleList)
    });

    //GetDDLListByFieldCode
  }
  OpenClonePopup(ViewId: any, ViewName: any) {
    this.ViewIdForClone = ViewId;
    this.ViewNameForClone = ViewName;
    this.ClonePopup.show();
  }
  CloseClonePopup() {
    this.ClonePopup.hide();
    this.ViewIdForClone = 0;
    this.ViewNameForClone = "";
  }
  saveCloneView() {
    if (this.ViewNameForClone.length > 0) {
      this.loadSave = true;
      this.commonService.SaveCLoneVie(this.ViewIdForClone, this.ViewNameForClone, this.listType).subscribe((res: any) => {
        this.loadSave = false;
        if (res != null && res != undefined && res != '') {
          if (res.statusCode == "409") {
            this.toaster.error(res.responseMessage);
          } else if (res.statusCode == "200") {
            this.CloseClonePopup();
            this.toaster.success(res.responseMessage);
            this.refresh();
            this.ModalManageView.show();

          }
        }
      });
    } else {
      this.toaster.error("View name is required.");
    }
  }
}
