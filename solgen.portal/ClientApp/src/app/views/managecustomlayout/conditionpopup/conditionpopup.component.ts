import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../../shared/common.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomFieldService } from '../../shared/custom-field/customfield.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import {  fieldsJson } from '../managecustomlayout.service';
//import { int } from '../../../../../node_modules2/css-line-break/dist/types/Trie';


@Component({
  selector: 'app-conditionpopup',
  templateUrl: './conditionpopup.component.html',
  styleUrls: ['./conditionpopup.component.scss'],
  providers: [CustomFieldService]
})
export class ConditionPopupComponent implements OnInit {
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
  conditionJson: fieldsJson[] = [];

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
      //{ id: 1, name: 'Add', disabled:true },
      { id: 1, name: 'Or' },
      { id: 2, name: 'And', selected: true }
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
      console.clear();
      // console.log("operatorList", this.operatorList);
    });
  }

  getCustomFieldData(moduleName: any, submoduleName: any, companyId: any) {
    this.customFieldList = [];
    this.customFieldList1 = [];
    this.customService.GetCustomFieldsListDisplay(moduleName, submoduleName, companyId, 'MANAGE',null).subscribe((result: any) => {
      if (result) {
        
        this.customCompnentValues = this.customService.customFieldsList.data;
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
        this.loadSave = false;

      }
    });
  }

  show(condition, companyId: any, is_filter: any) {
    this.loadSave = true;

    if (typeof (condition) === "undefined" || condition == "" || condition == null) {
      this.initForm();
      this.getCustomFieldData(this.moduleName, this.submoduleName, companyId);

    }
    else {
      this.customService.GetCustomFieldsListDisplay(this.moduleName, this.submoduleName, companyId, 'MANAGE', null)
        .toPromise()
        .then(resp => {
          // console.log("resp", resp);
          this.customCompnentValues = this.customService.customFieldsList.data;
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

          this.fields.clear();
          var data = JSON.parse(condition) as Array<fieldsJson>;
          data.forEach((item, index) => {
            this.fields.push(this.buildFields());

            let event = this.customFieldList1.filter(x => x.value == item.column_name)[0];

            let tempGroup = this.fields.controls[index] as FormGroup;

            this.onChangeField(event, tempGroup, index);

            this.fields.controls[index].patchValue({
              operatorId: item.operatorId,
              filedNameId: item.column_name,
              type: item.extended_operator,
              dtCode: item.dt_code,
              txtvaluefrom: item.value,
              txtvalueto: item.second_value
            });
            this.loadSave = false;

        });      
      });
    }
    this.FilterViewModal.show();

  }

  close() {
    this.FilterViewModal.hide();
    this.searchFilterCondition.emit();
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
      let controls = (this.fields.controls as FormGroup[]);
      this.conditionJson = [];
      controls.forEach((item, index) => {
        ;
        let _json: fieldsJson = new fieldsJson();

        _json.column_display_name = this.customFieldList1.filter(x => x.value == item.controls["filedNameId"].value)[0].display;
        _json.column_name = item.controls["filedNameId"].value;
        _json.operator = this.operatorList.filter(x => x.value == item.controls["operatorId"].value)[0].text;
        _json.operatorId = item.controls["operatorId"].value;
        _json.dt_code = item.controls["dtCode"].value;

        if (_json.dt_code) {
          let ids = item.controls["txtvaluefrom"].value as [];
          let _resultArray = [];
          if (ids) {
            ids.forEach(p => {
              _resultArray.push('"' + this.DdlValues[index].filter((x) => x.value == p)[0].name + '"');
            });
          }
          _json.display_value = _resultArray.join(', ').toString();
        }
        else {
          _json.display_value = item.controls["txtvaluefrom"].value;
        }
        _json.value = item.controls["txtvaluefrom"].value;

        if (item.controls["txtvalueto"]) {
          _json.second_value = item.controls["txtvalueto"].value;
        }

        if (this.conditionJson.length > 0) {
          this.conditionJson[this.conditionJson.length - 1].extended_operator = controls[index - 1].controls["type"].value;
        }
        else {
          _json.extended_operator = "";
        }

        this.conditionJson.push(_json);
      });

      this.searchFilterCondition.emit({ customWhereCondition: this.customWhereCondition, conditionJson: this.conditionJson });
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
            operatorstring = operator[0].expression + ' ' + " convert(datetime,'" + this.commonService.ConvertUserSelectedDateZoneToUTC(element.txtvaluefrom) + "', 101) ";
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
        this.DdlValues.splice(i, 1, $event.selectlistvalues);
        // console.log(this.DdlValues[i]);
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
  onChangeOperator($event, index) {
    ;
    this.txtvalueto.setValue(null);
    (this.fields.controls[index] as FormGroup).controls["txtvalueto"].setValue(null);

    this.conditionJson[index].second_value = null;
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

    // console.log("this.buildFields()", this.buildFields());
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
  get txtvalueto() { return this.searchFilterForm.get('txtvalueto'); }
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
