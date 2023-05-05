import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../common.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-loanhomiadvancesearchfilter',
  templateUrl: './loanhomiadvancesearchfilter.component.html',
  styleUrls: ['./loanhomiadvancesearchfilter.component.scss']
})
export class LoanhomiadvancesearchfilterComponent implements OnInit {

  loadSave: boolean = false;
  @Output() searchFilterCondition: EventEmitter<any> = new EventEmitter();
  @ViewChild('templatAdvanceFilterView', { static: false }) advanceFilterViewModal: ModalDirective;
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
  constructor(private commonService: CommonService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.DTCode = false;
    this.ddlData = [
      { id: 1, name: 'Add', disabled: true },
      { id: 2, name: 'Or' },
      { id: 3, name: 'And' }
    ];
  }

  getOperators(id: any) {
    this.operatorList = [];
    this.commonService.getOperatorsList(id).subscribe((response: any) => {
      this.operatorList = this.commonService.operator;
    });
  }

  getFormFieldData(moduleName: any, submoduleName: any, companyId: any) {
    ;
    this.customFieldList = [];
    this.customFieldList1 = [];
    this.commonService.GetFormFieldsList(moduleName, submoduleName, companyId).subscribe((result: any) => {
      if (result) {

        this.customCompnentValues = this.commonService.customFieldsList.data;
        // console.log('advance filter', this.customCompnentValues);
        this.customCompnentValues.forEach(t => {
          let obj = {
            text: t.display_name,
            value: t.custom_field_id,
            fieldName: t.ColumnName,
            selectlistvalues: t.select_options,
            dt_code: t.dt_code,
            field_code: t.field_code,
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
      this.getFormFieldData(this.moduleName, this.submoduleName, companyId);
    }
    this.advanceFilterViewModal.show();
  }

  close() {
    this.advanceFilterViewModal.hide();
  }



  filtersearch() {
    // console.log('fields', this.searchFilterForm.get('fields').value);
    if (this.searchFilterForm.get('fields').valid) {
      this.customWhereCondition = '(';
      var length = this.searchFilterForm.value.fields.length;
      // console.log('length', length);

      var mainData = this.searchFilterForm.value.fields.filter((element, index) => {

        // console.log('element', element)
        // console.log('index', index)
        var operator = this.operatorList.filter(function (elementInner, index) {
          return (elementInner.value === element.operatorId);
        });

        var field = this.customFieldList1.filter(function (elementfield, index) {
          return (elementfield.value === element.filedNameId);
        });
        //var type = this.searchFilterForm.get('fields');



        var operatorstring = '';
        if (operator[0].expression == "IN" || operator[0].expression == "NOT IN") {
          operatorstring = operator[0].expression + " ('" + element.txtvaluefrom + "')";
        } else if (operator[0].expression == "Like" || operator[0].expression == "Not Like") {
          operatorstring = operator[0].expression + " '%" + element.txtvaluefrom + "%'";
        } else if (operator[0].expression == "between") {
          operatorstring = operator[0].expression + ' ' + "'" + element.txtvaluefrom + "'" + " And " + "'" + element.txtvalueto + "'";
        } else {
          operatorstring = operator[0].expression + ' ' + "'" + element.txtvaluefrom + "'";
        }

        if (element.type == 'Or') {

          this.customWhereCondition = this.customWhereCondition + ' ' + field[0].fieldName + ' ' + operatorstring + ' ' + element.type + '';
        }
        if (element.type == 'And') {

          this.customWhereCondition = this.customWhereCondition + ' ' + field[0].fieldName + ' ' + operatorstring + ' ) ' + element.type + ' (';
        }

        if (element.type == "") {

          this.customWhereCondition = this.customWhereCondition + ' ' + field[0].fieldName + ' ' + operatorstring + ' ) '
        }

        

      });
      // console.log('customWhereCondition', this.customWhereCondition)
      this.searchFilterCondition.emit(this.customWhereCondition);
      this.advanceFilterViewModal.hide();
    }
    else {
      this.commonService.validateAllFormFields(this.searchFilterForm);
    }

  }

  onKey($event) {
    this.customWhereCondition = this.customWhereCondition + '  ' + $event.target.value;
  }

  onChangeField($event, field: FormGroup, i) {
    this.custom_field_ids = null;
    this.field_code = null;
    this.custom_field_ids = $event.value;
    this.field_code = $event.field_code
    this.getOperators($event.value);

    if (this.customWhereCondition == '') {
      this.customWhereCondition = $event.fieldName;
    } else {
      this.customWhereCondition = this.customWhereCondition + ' and ' + $event.fieldName;
    }
    // console.log('$event', $event);
    if ($event.dt_code == 'select') {
      // console.log('selectlistvalues', $event.selectlistvalues)
      // this.DdlValues = $event.selectlistvalues;
      this.DdlValues.splice(i, 1, $event.selectlistvalues)
      // console.log('this.DdlValues', this.DdlValues)
      field.get('dtCode').setValue(true);
    }
    else {
      this.DdlValues.splice(i, 1, [])
      field.get('dtCode').setValue(false);
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
    // console.log(e);
    // console.log('fields', this.fields);
    this.fields.push(this.buildFields());
    this.condition.clearModel();

  }
  removeFields(index: any) {
    this.fields.removeAt(index);
    (this.fields.controls[index - 1] as FormGroup).patchValue(
      {

        type: ''
      });

  }

  private initForm() {
    this.customWhereCondition = '';
    this.searchFilterForm = this.fb.group({
      operatorId: [null, Validators.required],
      filedNameId: [null, Validators.required],
      txtvaluefrom: ['', Validators.required],
      txtvalueto: [''],
      fields: this.fb.array([this.buildFields()])
    });
  }

  buildFields(): FormGroup {
    return this.fb.group({
      operatorId: [null, Validators.required],
      filedNameId: [null, Validators.required],
      txtvaluefrom: [null, Validators.required],
      txtvalueto: [''],
      dtCode: [false],
      type: ['']
    });
  }


  get operatorId() { return this.searchFilterForm.get('operatorId'); }
  get filedNameId() { return this.searchFilterForm.get('filedNameId'); }
  get txtvaluefrom() { return this.searchFilterForm.get('txtvaluefrom'); }
  get type() { return this.searchFilterForm.get('type'); }

  onScrollToEnd(dataList: any, i: number) {
    ;
    this.fetchMore(dataList, i);
  }

  private fetchMore(dataList: any, i: number) {
    ;
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    ;
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
