import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../common.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomFieldService } from '../custom-field/customfield.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
//import { int } from '../../../../../node_modules2/css-line-break/dist/types/Trie';


@Component({
  selector: 'app-searchfilteradd',
  templateUrl: './searchfilteradd.component.html',
  styleUrls: ['./searchfilteradd.component.scss'],
  providers: [CustomFieldService]
})
export class SearchfilteraddComponent implements OnInit {
  loadSave: boolean = false;
  @Output() searchFilterCondition: EventEmitter<any> = new EventEmitter();
  @ViewChild('templateFilterView', { static: false }) FilterViewModal: ModalDirective;
  @Input('moduleName') moduleName: string;
  @Input('subModuleName') submoduleName: string;
  @ViewChild('condition', { static: false }) condition: NgSelectComponent;
  operatorList: any[] = [];
  searchFilterForm: FormGroup;
  customFieldList: any[] = [];
  customFieldList1: any[] = [];
  customWhereCondition: any;
  customCompnentValues: any; 
  DTCode: boolean;
  DdlValues: any[] = [];
  ddlData: any[] = [];

  searchText: string;
  len: any = 10;
  scrollDataList: any;
  custom_field_ids: any;
  field_code: any;
  loginuserid: any;
  iserror: any = 0;
  Ddloperators: any[] = [];


  constructor(private commonService:
    CommonService, private fb: FormBuilder, private toaster: ToastrService, private customService: CustomFieldService) { }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
    this.getAllOperatorsData(-1);
    this.initForm();
    this.DTCode = false;
    this.ddlData = [
      { id: 1, name: 'Add', disabled:true },
      { id: 2, name: 'Or' },
      { id: 3, name: 'And' }
    ];
  }

  getAllOperatorsData(id: any) {
    this.commonService.getOperatorsList(id).subscribe((response: any) => {
      this.Ddloperators = this.commonService.operator;
    });
  }


  getOperators(id: any, field: FormGroup, isEdit = false) {
    this.operatorList = [];
    this.commonService.getOperatorsList(id).subscribe((response: any) => {
      this.operatorList = this.commonService.operator;
    });
  }

  getCustomFieldData(moduleName: any, submoduleName: any, companyId: any) {
    this.customFieldList = [];
    this.customFieldList1 = [];
    this.customService.GetCustomFieldsListDisplay(moduleName, submoduleName, companyId, 'MANAGE',null).subscribe((result: any) => {
      if (result) {
        
        this.customCompnentValues = this.customService.customFieldsList.data;
        // console.log('this.customCompnentValues', this.customCompnentValues);
        this.customCompnentValues.forEach(t => {
          let obj = {
            display: t.display_name,
            text: t.ColumnName,
            value: t.custom_field_id,
            dropdown: t.dt_code,
            fieldName: t.ColumnName,
            selectlistvalues: t.select_options,
            dt_code: t.dt_code,
            field_code: t.field_code,
            alias: t.table_alias
            }
          this.customFieldList.push(obj);
         
        })
        this.customFieldList1 = this.customFieldList;
       
      }
    });
  }


  show(companyId: any, is_filter: any) {
    if (is_filter == 0 || typeof is_filter == undefined) {
      this.initForm();
      this.getCustomFieldData(this.moduleName, this.submoduleName, companyId);
    }
    this.FilterViewModal.show();
  }

  close() {
    this.FilterViewModal.hide();
  }


  SaveAllFields() {
    this.iserror = 0;
    this.filtersearch();
    if (this.searchFilterForm.value.select == "") {
      if (this.iserror == '2')
        this.toaster.error('To date must be greater than From date.');
      else
        this.toaster.error('All fields are required.');
      return;
    }
    if (this.iserror != 0) {
      if (this.iserror == '2')
        this.toaster.error('To date must be greater than From date.');
      else
        this.toaster.error('All fields are required.');
    }
    else {
      this.searchFilterCondition.emit(this.customWhereCondition);
      this.FilterViewModal.hide();
    }
  }

  replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  filtersearch() {
    if (this.searchFilterForm.get('fields').valid) {
      this.customWhereCondition = '(';
      var length = this.searchFilterForm.value.fields.length;

      var mainData = this.searchFilterForm.value.fields.filter((element, index) => {
        element.operators = '';

        if ((element.fieldText == "date" || element.fieldText == "datetime") && element.txtvaluefrom != null && element.txtvalueto != null) { // compare date to and from
          if (element.txtvaluefrom > element.txtvalueto && element.operatorId == "8") {
            this.iserror = 2;
            return;
          }
        }
        if (element.fieldText == "date") { // conversion for:-> from ,to date convert also for between
          //element.txtvaluefrom = this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom);


          if (element.operatorId == "8") {
            if (element.txtvalueto == null)
              this.iserror = 1;
            else
              element.txtvalueto = this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvalueto);
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
          operatorstring = operator[0].expression;
        }
        else if (operator[0].expression == "between") {
          if (element.fieldText == "date") {
            operatorstring = operator[0].expression + ' ' + " convert(datetime,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom) + "', 101) " + " And " + " convert(datetime,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvalueto) + "', 101) ";
          } else if (element.fieldText == "datetime") {
            operatorstring = operator[0].expression + ' ' + " convert(datetime,'" + this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom) + "', 120) " + " And " + " convert(datetime,'" + this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvalueto) + "', 120) ";
          } else {
            operatorstring = operator[0].expression + ' ' + "'" + element.txtvaluefrom + "'" + " And " + "'" + element.txtvalueto + "'";
          }
        }
        else {
          if (element.fieldText == "date") {
            if (operator[0].expression == "=") {
              element.txtvaluefrom = this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom);
              let endDate = this.commonService.reduceOneDayOneSec(element.txtvaluefrom);
              operatorstring = "BETWEEN" + ' ' + "'" + element.txtvaluefrom + "'" + "AND" + "'" + endDate + "'";
            }
            else {
              operatorstring = operator[0].expression + ' ' + " convert(datetime,'" + this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom) + "', 101) ";
            }

          } else if (element.fieldText == "datetime") {
            operatorstring = operator[0].expression + ' ' + " convert(datetime,'" + this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom) + "', 120) ";
          } else if (element.fieldText == "select" && operator[0].expression == "=") {
            operatorstring = ' in ' + "('" + element.txtvaluefrom + "')";
            operatorstring = this.replaceAll(operatorstring, ",", "','");
          }
          else if (element.fieldText == "select" && operator[0].expression == "<>") {
            operatorstring = ' not in ' + "('" + element.txtvaluefrom + "')";
            operatorstring = this.replaceAll(operatorstring, ",", "','");   //operatorstring.replaceAll(",", "','");
          }else {
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
            if (operator[0].expression == "<>") {
              element.txtvaluefrom = this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom);
              let endDate = this.commonService.reduceOneDayOneSec(element.txtvaluefrom);
              operatorstring = "NOT" + ' ' +"BETWEEN" + ' ' + "'" + element.txtvaluefrom + "'" + "AND" + "'" + endDate + "'";
            }

            this.customWhereCondition = this.customWhereCondition + field[0].alias + '.' + field[0].text + ' ' + operatorstring + ' )' ;
            //this.customWhereCondition = this.customWhereCondition + ' convert(date,' + field[0].alias + '.' + field[0].text + ', 101) ' + operatorstring + ' ) ';
          } else if (element.fieldText == "datetime") {
            if (operator[0].expression == "<>") {
              element.txtvaluefrom = this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom);
              let endDate = this.commonService.reduceOneDayOneSec(element.txtvaluefrom);
              operatorstring = "NOT" + ' ' + "BETWEEN" + ' ' + "'" + element.txtvaluefrom + "'" + "AND" + "'" + endDate + "'";
            }
            if (operator[0].expression == "=") {
              element.txtvaluefrom = this.commonService.ConvertUserSelectedTimeZoneToUTC(element.txtvaluefrom);
              let endDate = this.commonService.reduceOneDayOneSec(element.txtvaluefrom);
              operatorstring = "BETWEEN" + ' ' + "'" + element.txtvaluefrom + "'" + "AND" + "'" + endDate + "'";
            }
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
    
    }
    else {
      this.iserror = 1;
      this.commonService.validateAllFormFields(this.searchFilterForm);
    }
    
  }

  onKey($event) {
    this.customWhereCondition = this.customWhereCondition + '  ' + $event.target.value;
  }

  onChangeField($event, field: FormGroup, i) {
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
      field.get('operators').setValue(null);
      this.custom_field_ids = null;
      this.field_code = null;
      this.custom_field_ids = $event.value;
      this.field_code = $event.field_code
      this.getOperators($event.value, field);

      if (this.customWhereCondition == '') {
        this.customWhereCondition = $event.fieldName;
      } else {
        this.customWhereCondition = this.customWhereCondition + ' and ' + $event.fieldName;
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
  onChangeOperator($event) {
    this.customWhereCondition = this.customWhereCondition + '  ' + $event.expression;
  }


  get fields(): FormArray {
    return this.searchFilterForm.get('fields') as FormArray;
  }

  addFields(e) {
    
    (this.fields.controls[this.fields.controls.length - 1] as FormGroup).patchValue(
      {

        type: e
      });
    this.fields.push(this.buildFields());
    this.condition.clearModel();

  }
  removeFields(index:any) {
    this.fields.removeAt(index);
    (this.fields.controls[index-1] as FormGroup).patchValue(
      {

        type: ''
      });

  } 

  private initForm() {
    this.customWhereCondition = '';
    this.searchFilterForm = this.fb.group({
      operatorId: [null, Validators.required],
      filedNameId: [null, Validators.required],
      txtvaluefrom: [''],
      txtvalueto: [''],
      fields: this.fb.array([this.buildFields()])
    });
  }
 
  buildFields(): FormGroup {
    return this.fb.group({
      operatorId: [null, Validators.required],
      filedNameId: [null, Validators.required],
      txtvaluefrom: [null],
      txtvalueto: [''],
      operators: [],
      dtCode: [false],
      type: [''],
      fieldText: ['']
    });
  }


  get operatorId() { return this.searchFilterForm.get('operatorId'); }
  get filedNameId() { return this.searchFilterForm.get('filedNameId'); }
  get txtvaluefrom() { return this.searchFilterForm.get('txtvaluefrom'); }
  get type() { return this.searchFilterForm.get('type'); }
  get fieldText() { return this.searchFilterForm.get('fieldText'); }

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

}
