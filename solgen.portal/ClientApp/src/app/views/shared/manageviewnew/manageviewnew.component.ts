import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef, Directive, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CustomFieldService } from '../custom-field/customfield.service';
import { CommonService } from '../common.service';
import { ManageViewNewService, ManageViewModel, sorting } from './manageviewnew.service';
import { Element } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { LeadlistService } from '../../lead/leadlist.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { OrderListModule } from 'primeng/orderlist';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { parse } from 'path';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DateTimeToLocalForAddEditPipe, DateTimeToLocalForAddEditForDatePipe } from '../../../pipes/datetime.pipe';

@Component({
  selector: 'app-manageviewnew',
  templateUrl: './manageviewnew.component.html',
  providers: [CustomFieldService, ManageViewNewService]
})
export class ManageviewnewComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ManageViewModel: ManageViewModel = new ManageViewModel();
  @ViewChild('condition', { static: false }) condition: NgSelectComponent;
  private currentComponentWidth;

  ManageFiledGroup: FormGroup;
  isDroppingToCustomField: boolean;
  draggedField: any;
  @Output() customViewid: EventEmitter<any> = new EventEmitter();
  @ViewChild('templateManageView', { static: false }) ModalManageView: ModalDirective;
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
  customOrderCondition: any;
  customCompnentValues: any;
  customFieldLeadList: any[] = [];
  customFieldLeadListSecond: any[] = [];
  customFieldLeadListDummy: any[] = [];
  customFieldList: any[] = [];
  tempcustomFieldListFromDragToDrop: any[] = [];
  customFieldList1: any[] = [];
  tempalateContent: String;
  isEngineering: boolean = false;
  htmlStr: any;
  listFilter = '';
  FieldlistFilter = '';
  StorecustomFieldList1: any[] = [];
  searchTxt = '';
  listFiltertext = '';
  lstUserType: any;
  searchUserType = '';
  sortDir = 'desc';
  sortColumn = 'CreatedOn';
  pageSizeValue: number;
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
  currentPage: number = 0;
  loginuserid: any;
  custom_view_id: any;
  lstPageSize: any;
  fieldmodel: any[] = [];
  loading = false;
  Data: any[] = [];
  orderData: any[] = [];
  Data12: any[] = [];
  operatorId1: any;
  filedNameId2: any;
  txtvaluefrom3: any;
  txtvalueto: any;
  companyadmin: boolean = false;
  DTCode: boolean;
  tableName = 'tblcustom_field_viewport';
  DdlValues: any[] = [];
  Ddloperators: any[] = [];
  iserror: any = 0;

  searchText: string;
  len: any = 10;
  scrollDataList: any;
  custom_field_ids: any;
  field_code: any;
  ddlData: any[] = [];
  rows = [];
  isHidden = true;

  dotCount: number;
  checkNumberOnly: any;
  checkString: any;
  RoleList: any;
  IsClone: boolean = false;
  sortinglist: sorting[] = [];

  constructor(private router: Router,
    private leadlistService: LeadlistService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private customService: CustomFieldService,
    private toaster: ToastrService,
    public ref: ChangeDetectorRef,
    private manageviewservice: ManageViewNewService,
    private dialogService: ConfirmationDialogService,
    private el: ElementRef,) {

    this.ddlData = [
      { id: 1, name: 'Add', disabled: true },
      { id: 2, name: 'Or' },
      { id: 3, name: 'And' }
    ];
  }

  ngOnInit() {
    this.isHidden = true;
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == "usertype06") {
        this.companyadmin = true;
      }
      else if (userdetail.userType == "usertypeengineering" || userdetail.userType =="usertypecompanyadmin") {
        this.isEngineering = true;
      }
      if (userdetail.userType == "usertypecompanyadmin") {
        this.companyadmin = true;
      }
      this.loginuserid = userdetail.id;
      // console.log("userdetail", userdetail);
    });
    this.DTCode = false;
    this.initForm();
    this.pageSizeValue = 10;
    this.currentPage = 0;
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
    this.loadSave = false;
    this.isHidden = false;
    this.ModalManageSecondaryView.show();
  }
  close() {
    this.isHidden = true;
    this.ModalManageView.hide();
  }

  closesecond() {
    this.isHidden = true;
    this.ModalManageSecondaryView.hide();
  }

  Sorting() {
    for (var j = 0; j < this.sortinglist.length; j++) {
      if (this.sortinglist[j].sortbyAsc == true || this.sortinglist[j].sortbyDesc == true) {
      }else {
        this.sortinglist.splice(j, 1);
        j--;
      }
    }


    for (var i = 0; i < this.droped.length; i++) {
      if (this.droped[i].isChecked == true) {

        let isExists = this.sortinglist.filter(x => this.droped[i].value == x.value).length;
        if (isExists ==0 ) {
          let obj = {
            sortbyAsc: false,
            sortbyDesc: false,
            sortbyText: '',
            isChecked: this.droped[i].isChecked,
            text: this.droped[i].text,
            value: this.droped[i].value
          }
          this.sortinglist.push(obj);
        }

        
      }
    }
    // console.log("sorting", this.sortinglist);
  }


  applyView(val: string) {
    this.isHidden = true;
    this.ModalManageView.hide();
    this.customViewid.emit(val);
  }

  EditPage(val: string) {
    this.IsClone = false;
    this.AddViewForm.reset({ radiogroup: "Only For Me" });
    this.getAllRoleTypes();
    while (this.fields.length != 0) {
      this.fields.removeAt(0);
    }
    this.C_View_Id = val;
    this.getCustomFieldData();
    this.getCustomFieldFilterData(this.C_View_Id);
    this.close();
    this.showManageViewSecondary();
    this.GetCustomViewbyId();
    this.loading = false;
    this.loadSave = false;

  }

  ClonePage(val: string) { 
    this.IsClone = true;
    this.AddViewForm.reset({ radiogroup: "Only For Me" });
    this.getAllRoleTypes();
    while (this.fields.length != 0) {
      this.fields.removeAt(0);
    }
    this.C_View_Id = val;
    this.getCustomFieldData();
    this.getCustomFieldFilterData(this.C_View_Id);
    this.close();
    this.showManageViewSecondary();
    this.GetCustomViewbyId();
    this.loading = false;
    this.loadSave = false;

    setTimeout(() => {
      if (this.IsClone == true) {
        this.select.setValue(null);
      }this.loadSave = false;
    }, 3000);

  }


  Delete(row: any) {
    const message = `Are you sure you want to delete view  "${row.view_name}"?`;
    this.dialogService.confirm('Delete View', message).subscribe(confirmed => {
      if (confirmed) {
        this.manageviewservice.DeleteRecords(row.custom_view_id, this.tableName).subscribe(r => {
          this.toaster.success(`View "${row.view_name}" has been deleted successfully.`);
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
    this.sortinglist = [];
    this.manageviewservice.GetCustomViewbyId(this.C_View_Id).subscribe((response: any) => {

      const convertdatetime = new DateTimeToLocalForAddEditForDatePipe();

      while (this.fields.length != 0) {
        this.fields.removeAt(0);
      }
      // this.fields.removeAt(i);
      var ab = response[0].view_searchFilterJson;
      var ac = response[0].view_searchFilter;

      var orderDataJson = response[0].view_orderfilterJson;

      this.Data = JSON.parse(ab);
      this.Data12 = JSON.parse(ab);
      this.orderData = JSON.parse(orderDataJson);
      //for (var i = this.fields.length - 1; i >= 0; i--) {
      //  this.fields.removeAt(i);
      //}
      this.DdlValues.length = 0;
      this.Data.forEach(childObj => {




        //if (childObj.dtCode == 'true') {
        //  childObj.txtvaluefrom

        //}
        //field.get('dtCode').setValue(true);


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
          if (ObjOrder.sortbyAsc == true || ObjOrder.sortbyDesc == true) {
            let obj = {
              sortbyAsc: ObjOrder.sortbyAsc,
              sortbyDesc: ObjOrder.sortbyDesc,
              sortbyText: ObjOrder.sortbyText,
              isChecked: ObjOrder.isChecked,
              text: ObjOrder.text,
              value: ObjOrder.value
            }
            this.sortinglist.push(obj);
          }
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

      //for (var i = this.fields.length-1; i>0; i--) {
      //  alert('1');
      //  this.fields.removeAt(i);
      //  this.fields.reset();

      //}



      this.AddViewForm.patchValue({
        select: response[0].view_name,
        radiogroup: response[0].view_for,
        selectedRole: (response[0].role_ids != null && response[0].role_ids != "") ? response[0].role_ids.split(",") : null
      });
      this.droped = response.map(m => {
        return {
          text: m.display_name,
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
    if (this.IsClone == true) {
      this.select.setValue(null);
    }
   
    if (this.companyadmin == false) {
      this.AddViewForm.reset({ radiogroup: "Only For Me" });
    }
    this.loading = false;

  }

  refresh() {
    this.loading = true;
    this.pageSizeValue = 10;
    //this.currentPage = 1;
    this.manageviewservice.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {
      this.pagedData = this.manageviewservice.pagedData;
      // console.log("this.pagedData", this.pagedData);
      this.loading = false;

      if (this.companyadmin == false) {
        this.AddViewForm.reset({ radiogroup: "Only For Me" });
      }
    }, error => {
      this.loading = false;
    }, () => { this.isHidden = false; })
  }




  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.refresh();
    }
  }


  getAllOperatorsData(id: any) {
    this.commonService.getOperatorsList(id).subscribe((response: any) => {
      this.Ddloperators = this.commonService.operator;
    });
  }


  getCustomFieldFilterData(custom_view_id: any) {
    this.loading = true;
    this.customFieldList1.length = 0;

    this.customService.GetCustomFieldsListDisplay(this.moduleName, this.submoduleName, this.companyId, 'MANAGE', custom_view_id).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.customService.customFieldsList.data;
        this.customCompnentValues.forEach(t => {
          let obj = {
            display: t.display_name,
            text: t.ColumnName,
            value: t.custom_field_id,
            dropdown: t.dt_code,
            selectlistvalues: t.select_options,
            dt_code: t.dt_code,
            field_code: t.field_code,
            alias: t.table_alias 
          }
          this.customFieldList.push(obj);
        })
        this.customFieldList1 = this.customFieldList;
        this.StorecustomFieldList1 = this.customFieldList;
        if (this.IsClone == true) {
          this.select.setValue(null);
        }

        if (this.companyadmin == false) {
          this.AddViewForm.reset({ radiogroup: "Only For Me" });
        }
      }
    }, error => {
      this.loading = false;
    }, () => { this.isHidden = false; this.loading = false; });
  }
  onNextOfModuleOne(event, id) {
  }

  getCustomFieldData() {
    this.controlname = '';
    this.sortable = '';
    //this.customService.GetCustomFieldsLeadList(this.moduleName, this.submoduleName, this.companyId, this.controlname, this.sortable).subscribe((result: any) => {
    this.customService.GetManageViewCustomFieldsLeadList(this.FieldlistFilter, this.moduleName, this.submoduleName, this.companyId, this.controlname, this.sortable).subscribe((result: any) => {
      if (result) {

        this.customCompnentValues = this.customService.customFieldsLeadList.data;

        this.customFieldLeadListSecond = [];
        let i = 0;
        this.customCompnentValues.forEach(t => {


          let obj = {
            //text: t.label,
            //value: t.custom_field_id
            text: t.display_name,
            index: i,
            value: t.custom_field_id,
            fieldName: t.ColumnName,

          }
          this.customFieldLeadListSecond.push(obj);
          this.customFieldLeadListDummy.push(obj);
          
          
        })
        if (this.IsClone == true) {
          this.select.setValue(null);//({ select: '' });
        }
        if (this.companyadmin == false) {
          this.AddViewForm.reset({ radiogroup: "Only For Me" });
        }
      }
    });
  }

  show(templateContent) {
    this.tempalateContent = templateContent
    this.htmlStr = this.tempalateContent;
    this.showManageView();
    this.getCustomFieldData();
    this.getOperators("0", null);
    this.refresh();
    this.getCustomFieldFilterData("0");
    
  }

  getOperators(id: any, field: FormGroup, isEdit = false) {
    this.commonService.getOperatorsList(id).subscribe((response: any) => {
      if (!isEdit && field != null) {
        field.get('operators').setValue(this.commonService.operator);
      } else {
        return this.commonService.operator;
      }
    });
  }



  AddPage() {
    this.sortinglist = [];
    this.C_View_Id = '0';
    this.AddViewForm.reset();
    this.AddViewForm.reset({ radiogroup: "Only For Me" });
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


 replaceAll(str, find, replace) {
  var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(escapedFind, 'g'), replace);
}

  sortingFilter() {
    this.customOrderCondition = '';
    this.sortinglist.forEach(s => {
      if (s.sortbyAsc == true || s.sortbyDesc == true) {
        var field = this.customFieldList1.filter(function (elementfield, index) {
          return (elementfield.value === s.value);
        });
        if (this.customOrderCondition != '') {
          this.customOrderCondition += ' , ';
        }
        this.customOrderCondition += field[0].alias + '.' + field[0].text + ' ' + s.sortbyText;
      }
    });
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

        if (element.operatorId == "18") {
          element.txtvaluefrom = this.loginuserid;
        }

        if (operator[0].expression == "is null" || operator[0].expression == "is not null") {
          element.txtvaluefrom = ' ';
        }

        var operatorstring = '';
        if (operator[0].expression == "IN" || operator[0].expression == "NOT IN") {
          operatorstring = operator[0].expression + " ('" + element.txtvaluefrom + "')";
        }
        else if (operator[0].expression == "Like" || operator[0].expression == "Not Like") {
          operatorstring = operator[0].expression + " '%" + element.txtvaluefrom + "%'";
        }
        else if (operator[0].expression == "is null" || operator[0].expression == "is not null") {
          operatorstring = operator[0].expression ;
        }
        else if (operator[0].expression == "between") {
          if (element.fieldText == "date") {
            operatorstring = operator[0].expression + ' ' + " convert(datetime,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom) + "', 101) " + " And " + " convert(datetime,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvalueto) + "', 101) ";
          } else if (element.fieldText == "datetime") {
            operatorstring = operator[0].expression + ' ' + " convert(datetime,'" + this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom) + "', 121) " + " And " + " convert(datetime,'" + this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvalueto) + "', 120) ";
          } else {
            operatorstring = operator[0].expression + ' ' + "'" + element.txtvaluefrom + "'" + " And " + "'" + element.txtvalueto + "'";
          }
        }
        else {
          if (element.fieldText == "date") {
            operatorstring = operator[0].expression + ' ' + " convert(datetime,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom) + "', 101) ";
          } else if (element.fieldText == "datetime") {
            operatorstring = operator[0].expression + ' ' + " convert(datetime,'" + this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom) + "', 120) ";
          } else if (element.fieldText == "select" && operator[0].expression =="=") {
            operatorstring = ' in ' + "('" + element.txtvaluefrom + "')";
            operatorstring = this.replaceAll(operatorstring, ",", "','");
          }
          else if (element.fieldText == "select" && operator[0].expression == "<>") {
            operatorstring = ' not in ' + "('" + element.txtvaluefrom + "')";
            operatorstring = this.replaceAll(operatorstring, ",", "','");   //operatorstring.replaceAll(",", "','");
          }
          else {
            operatorstring = operator[0].expression + ' ' + "'" + element.txtvaluefrom + "'";
          }
        }

        if (element.type == 'Or') {
          if (element.fieldText == "date") {
            this.customWhereCondition = this.customWhereCondition + ' convert(datetime,' + field[0].alias + '.' + field[0].text + ', 101) ' + operatorstring + ' ' + element.type + '';
          } else if (element.fieldText == "datetime") {
            this.customWhereCondition = this.customWhereCondition + ' convert(datetime,' + field[0].alias + '.' + field[0].text + ', 120) ' + operatorstring + ' ' + element.type + '';
          } else {
            this.customWhereCondition = this.customWhereCondition + ' ' + field[0].alias + '.' + field[0].text + ' ' + operatorstring + ' ' + element.type + '';
          }
        }
        else if (element.type == 'And') {
          if (element.fieldText == "date") {
            this.customWhereCondition = this.customWhereCondition + ' convert(datetime,' + field[0].alias + '.' + field[0].text + ', 101) ' + operatorstring + ' ) ' + element.type + ' (';
          } else if (element.fieldText == "datetime") {
            this.customWhereCondition = this.customWhereCondition + ' convert(datetime,' + field[0].alias + '.' + field[0].text + ', 120) ' + operatorstring + ' ) ' + element.type + ' (';
          } else {
            this.customWhereCondition = this.customWhereCondition + ' ' + field[0].alias + '.' + field[0].text + ' ' + operatorstring + ' ) ' + element.type + ' (';
          }
        }
        else {
          if (element.fieldText == "date") {
            this.customWhereCondition = this.customWhereCondition + ' convert(datetime,' + field[0].alias + '.' + field[0].text + ', 101) ' + operatorstring + ' ) ';
          } else if (element.fieldText == "datetime") {
            this.customWhereCondition = this.customWhereCondition + ' convert(datetime,' + field[0].alias + '.' + field[0].text + ', 120) ' + operatorstring + ' ) ';
          } else {
            this.customWhereCondition = this.customWhereCondition + ' ' + field[0].alias + '.' + field[0].text + ' ' + operatorstring + ' ) ';
          }
        }

          if (element.txtvaluefrom == null || element.txtvaluefrom.length == 0 || element.txtvaluefrom == "" || operatorstring.length == 0) {
            this.iserror = 1;
          }
        
      });
      if (this.customWhereCondition == '(') {
        this.customWhereCondition = null;
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

  get operatorId() { return this.manageViewForm.get('operatorId'); }
  get filedNameId() { return this.manageViewForm.get('filedNameId'); }
  get txtvaluefrom() { return this.manageViewForm.get('txtvaluefrom'); }
  get type() { return this.manageViewForm.get('type'); }
  get viewName() { return this.AddViewForm.get('viewName'); }
  get forMe() { return this.AddViewForm.get('forMe'); }
  get others() { return this.AddViewForm.get('others'); }
  get all() { return this.AddViewForm.get('all'); }
  get fieldText() { return this.manageViewForm.get('fieldText'); }

  onChangeField($event, field: FormGroup, i: number) {
    field.get('operatorId').setValue(null);

    if ($event == null) {
      field.get('operatorId').setValue(null);
      field.get('txtvaluefrom').setValue(null);
      field.get('txtvalueto').setValue(null);
      field.get('operators').setValue(null);
      field.get('fieldText').setValue(null);
      field.get('type').setValue('');
      field.get('dtCode').setValue(false);
      this.getOperators("0", field);
    }
    else if (event) {
      //this.clearfields();
       field.get('operators').setValue(null);
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
      }
      else if ($event.dt_code == 'datetime' || $event.dt_code == 'date') {
        this.DdlValues.splice(i, 1, [])
        field.get('dtCode').setValue(false);
      }
      else {
        this.DdlValues.splice(i, 1, [])
        field.get('dtCode').setValue(false);
      }
      field.get('txtvaluefrom').setValue(null);
      field.get('fieldText').setValue($event.dt_code);
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
  onChangeOperator($event, field: FormGroup) {
    field.get('txtvaluefrom').setValue(null);
    field.get('txtvalueto').setValue(null);
    if ($event == 'undefined') {
      $event.expression = '';
    }
    this.customWhereCondition = this.customWhereCondition + '  ' + $event.expression;
  }
  onChange($event) {
    this.currentPage = 1;
    this.refresh();
  }

  onKey($event) {
    this.customWhereCondition = this.customWhereCondition + '  ' + $event.target.value;
  }

  sortingClick(type, control, $event, index) {
    if (type == 'asc') {
      this.sortinglist[index].sortbyAsc = true;
    } else if (type == 'desc') {
      this.sortinglist[index].sortbyDesc = true;
    } 
    this.sortinglist[index].sortbyText = type;
  }

  SaveAllFields() {
    if (this.AddViewForm.valid) {
      this.iserror = 0;
      this.sortingFilter();
      this.filtersearch();

      if (this.AddViewForm.value.select == "") {
        if (this.iserror == '2')
          this.toaster.error('To date must be greater than From date.');
        else
          this.toaster.error('All fields are required.');
        return;
      }
      if (this.AddViewForm.value.select == null || this.droped.length == 0 || this.AddViewForm.value.radiogroup == null || this.iserror != 0) {
        if (this.iserror == '2')
          this.toaster.error('To date must be greater than From date.');
        else
          this.toaster.error('All fields are required.');
      }
      else {
        this.loadSave = true;
        this.ManageViewModel.Id = this.C_View_Id;
        this.ManageViewModel.moduleName = this.moduleName;
        this.ManageViewModel.subModuleName = this.submoduleName;
        this.ManageViewModel.radiogroup = this.AddViewForm.value.radiogroup;
        this.ManageViewModel.select = this.AddViewForm.value.select;
        this.selecteddata = JSON.stringify(this.droped);
        this.ManageViewModel.selectedFields = this.selecteddata;
        this.ManageViewModel.Roles = (this.AddViewForm.value.selectedRole != null) ? this.AddViewForm.value.selectedRole.join(",") : null;
        this.ManageViewModel.customWhereCondition = this.customWhereCondition;// JSON.stringify(this.customWhereCondition);
        this.ManageViewModel.customOrderCondition = this.customOrderCondition;
        this.ManageViewModel.view_searchFilterJson = JSON.stringify(this.fieldmodel);
        this.ManageViewModel.view_searchOrderJson = JSON.stringify(this.sortinglist);

        if (this.IsClone == true) {
          this.ManageViewModel.Id = '0';
        }


        //====================Check View name Already Exist or Not =================

        this.manageviewservice.checkDublicateViewName(this.ManageViewModel).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.error(result.responseMessage);
            this.loadSave = false;
            return;
          }
          else {
            //============if not exist then insert 
            this.manageviewservice.SaveManageViewField(this.ManageViewModel).subscribe((result: any) => {
              if (result.statusCode == 200) {
                this.toaster.success(result.responseMessage);
                this.closesecond();
                this.refresh();

                this.customViewid.emit();
                this.ModalManageView.show();
              }
              else {
                this.toaster.error(result.responseMessage);
              }
            }, error => {    
              this.loadSave = false;
            });
            //=================================
          }
        })

        //==========================================================================


      }
    }
    else {
      for (const key of Object.keys(this.AddViewForm.controls)) {
        if (this.AddViewForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          // console.log("sddasd", invalidControl);
          invalidControl.focus();
          break;
        }
      }

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
        this.manageviewservice.GetcustomDefaultView(view_Id, this.moduleName, this.submoduleName).subscribe(response => {
          this.refresh();
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
    this.manageviewservice.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(response => {

      this.pagedData = this.manageviewservice.pagedData;
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
    this.fields.removeAt(index);
    if (this.fields.length == index) {
      (this.fields.controls[index - 1] as FormGroup).patchValue(
        {

          type: ''
        });
    }
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
      txtvaluefrom: [null],
      txtvalueto: ['',],
      operators: [],
      dtCode: [false],
      type: [''],
      fieldText: ['']
    });
  }


  TempcustomFieldLeadListSecond: any[] = [];



  updateFieldlistFilter(event) {
    if (this.FieldlistFilter.trim() === '') {
      if (this.TempcustomFieldLeadListSecond.length > 0) {
        this.customFieldLeadListSecond = [];
      }


      this.TempcustomFieldLeadListSecond.forEach(s => {
        this.customFieldLeadListSecond.push(s);
      });

      //this.customFieldLeadListSecond = this.TempcustomFieldLeadListSecond.filter(s=>s.text=s.text)
      //// console.log('keycodeinif', this.customFieldLeadListSecond);

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
        //this.TempcustomFieldLeadListSecond.push(this.customFieldLeadListSecond);
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
    if (this.IsClone == true) {
      this.select.setValue(null);
    }
    //this.TempcustomFieldLeadListSecond.filter(s=> s.'')
    //this.getCustomFieldData();
    if (keycode === 13 || keycode === '13') {
      //this.getCustomFieldData();
      // this.search();
      // this.StorecustomFieldList1
      //var field = this.customFieldList1.filter(function (elementfield, index) {
      //  return (elementfield.value === element.filedNameId);
      //});

      //this.StorecustomFieldList1 = this.StorecustomFieldList1
      //  .filter((book: Book) => book.storeId === storeId);
      //this.bookList = this.bookFilteredList; 
    }
  }
  closetoList() {
    this.closesecond();
    this.showManageView();
  }


  onScrollToEnd(dataList: any, i: number, field: any) {
    this.fetchMore(dataList, i, field);
  }

  private fetchMore(dataList: any, i: number, field: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    let field_id = field.value.filedNameId;
    this.commonService.GetCustomFieldsDropDownList(this.len, field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      let item = [];
      (item as any[]) = (dataList as any[]).concat(this.scrollDataList);
      this.DdlValues.splice(i, 1, item)

    })
  }

  onKeySelect(e: any, dataList: any, i: number, field : any) {
    this.len = 0
    this.searchText = e.target.value;
    //this.DdlValues.length = 0;
    let field_id = field.value.filedNameId;// change by aakash as no field id found
    this.commonService.GetCustomFieldsDropDownList(this.len, field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      let item = [];
      (item as any[]) = (item as any[]).concat(this.scrollDataList);
      this.DdlValues.splice(i, 1, item)
    })
  }

  onClearLang(dataList: any, i: number, field: any): void {
    this.len = 0
    this.searchText = '';
    //this.DdlValues.length = 0;
    let field_id = field.value.filedNameId;// change by aakash as no field id found
    this.commonService.GetCustomFieldsDropDownList(this.len, field_id, this.field_code, this.searchText).subscribe((res: any) => {
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

  /// 22-03-21 added by nazir
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 46) {
      this.dotCount += 1;
      this.checkNumberOnly = (event.target.value);
      var numericCheck = (event.target.value).toString();
      if (numericCheck.includes('.')) {
        this.dotCount += 1;
      }
      if (this.dotCount > 1) {
        this.dotCount = 0;
        return false;
      }
    }
    if (charCode > 31 && (charCode <= 45 || charCode > 57 || charCode == 47)) {
      return false;
    }
    this.checkNumberOnly = (event.target.value);
    if (this.checkNumberOnly != null) {
      var numeric = (event.target.value).toString();
      if (numeric.includes('.')) {
        var checkNumeric = numeric.split('.');
        if (checkNumeric.length > 2) {
          return false;
        }
        this.checkString = checkNumeric[1].split('');
        if (this.checkString.length > 1) {
          // this.toastrService.warning("Invalid value", "Warning");
          return false;
        }
      }
    }
    this.dotCount = 0;
    return true;
  }

  noSpecialChars(event) {
    const e = <KeyboardEvent>event;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    let k;
    k = event.keyCode;  // k = event.charCode;  (Both can be used)
    if ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57) || k == 32) {
      return;
    }
    e.preventDefault();
  }
  OnChangeApplyToValue(e) {

    let selectedValue = this.AddViewForm.get("radiogroup").value;
    if (selectedValue == "Roles") {
      this.getAllRoleTypes();
      this.AddViewForm.get("selectedRole").setValidators(Validators.required);
    } else {
      this.AddViewForm.get("selectedRole").setValidators(Validators.nullValidator);
    }
    this.AddViewForm.controls["selectedRole"].updateValueAndValidity();
  }

  getAllRoleTypes() {
    this.commonService.getMasterItemsList("ROLE_FOR_MANAGE_VIEW").subscribe((result: any) => {
      this.RoleList = this.commonService.masters;
      // console.log("this.RoleList", this.RoleList);
    })
  }
}
