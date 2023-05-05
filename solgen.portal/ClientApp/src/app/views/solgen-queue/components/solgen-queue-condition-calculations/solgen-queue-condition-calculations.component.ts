import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from 'src/app/views/shared/common.service';
import { SolgenQueueService } from '../../solgen-queue.service';

@Component({
  selector: 'app-solgen-queue-condition-calculations',
  templateUrl: './solgen-queue-condition-calculations.component.html',
  styleUrls: ['./solgen-queue-condition-calculations.component.scss']
})
export class SolgenQueueConditionCalculationsComponent implements OnInit {

  @ViewChild('conditionCalculationModal', { static: false }) conditionCalculationModal: ModalDirective
  tableField: FormGroup;
  @Input() resultForm: FormGroup;
  moduleId: string;
  subModuleId: string;
  resultConditionForm: FormGroup;
  displayValue: string = '';
  databaseValue: string = '';
  sqlFunctionList: any = [];
  dateParts: any = ['Day', 'Month', 'Quarter', 'Year'];
  sectionList: any = [];
  operators: any = [];
  isDate: boolean = false;
  customFieldsList: any;
  constructor(private commonService: CommonService,
    private service: SolgenQueueService,
    private fb: FormBuilder) { }

    ngOnChanges(): void {

    }
  
    ngOnInit(): void {
      this.getSubModules();
  
      this.resultConditionForm = this.fb.group({
        resultCalculation: this.fb.array([this.service.buildResultCalculation()])
      });
      this.onResultCalculationFormChange();
  
    }
  
    get resultCalculation() {
      return this.resultConditionForm.get('resultCalculation') as FormArray;
    }
  
    getSqlFunctionList(functionType: string) {
      this.commonService.GetSqlFunctionList(functionType).subscribe(m => {
        this.sqlFunctionList = m;
      });
    }
  
    getSubModules() {
      this.service.getSubModules().subscribe((m: any[]) => {
        this.sectionList = m.filter(a => a.module_name_code != 'loanapplication');
      });
  
    }
  
    onSecondSectionChange(event: any, field: FormGroup) {
      if (event) {
        this.service.GetCustomFieldsListBySubModuleId(this.moduleId,event.sub_module_id).subscribe((m: any) => {
          if (m) {
            let tableFiledList = [];
            if (!this.isDate) {
              tableFiledList = m.data.filter(f => f.dt_code != 'select' && f.dt_code != 'text' && f.dt_code != 'boolean' && f.dt_code != 'date' && f.dt_code != 'datetime').map(f => {
                return {
                  PrimaryTableColumn: f.PrimaryTableColumn,
                  actual_data_type: f.actual_data_type,
                  display_name: f.display_name,
                  form_field_id: f.form_field_id,
                  dt_code: f.dt_code,
                  name: f.name,
                  select_options: f.select_options,
                  table_name: f.table_name,
                  table_alias: f.table_alias
                }
              });
            } else {
              tableFiledList = m.data.filter(f => (f.dt_code == 'date' || f.dt_code == 'datetime')).map(f => {
                return {
                  PrimaryTableColumn: f.PrimaryTableColumn,
                  actual_data_type: f.actual_data_type,
                  display_name: f.display_name,
                  form_field_id: f.form_field_id,
                  dt_code: f.dt_code,
                  name: f.name,
                  select_options: f.select_options,
                  table_name: f.table_name,
                  table_alias: f.table_alias
                }
              });
  
            }
  
            field.get('secondFields').setValue(tableFiledList);
          }
  
        });
      }
  
      field.get('secondFieldId').setValue(null);
      field.get('secondFieldValue').setValue(null);
    }
    addField() {
      this.resultCalculation.push(this.service.buildResultCalculation());
    }
  
    onResultCalculationFormChange() {
      this.resultCalculation.valueChanges.subscribe((m: any) => {
        if (m) {
          this.databaseValue = '';
          this.displayValue = '';
          m.forEach(f => {
            if (!this.isDate) {
  
              if (f.formulaId) {
                this.databaseValue += f.formulaId.FunctionName;
                this.displayValue += f.formulaId.DisplayName;
              }
  
              if (f.openingBrackets != '') {
                this.databaseValue += f.openingBrackets;
                this.displayValue += f.openingBrackets;
              }
  
              if (f.firstFieldId) {
                this.databaseValue += `isnull(${f.firstFieldId.table_alias}.${f.firstFieldId.PrimaryTableColumn},0)`;
                this.displayValue += `${f.firstFieldId.PrimaryTableColumn}`;
              }
  
              if (f.firstFieldValue) {
                this.databaseValue += `${f.firstFieldValue}`;
                this.displayValue += `${f.firstFieldValue}`;
              }
  
              if (f.closingBrackets != '') {
                this.databaseValue += f.closingBrackets;
                this.displayValue += f.closingBrackets;
              }
  
              if (f.operatorId) {
                  // console.log('operator: ', f.operatorId);
                  if (f.operatorId.operator_expression) {
                    this.databaseValue += `${f.operatorId.operator_expression}`;
                    this.displayValue += `${f.operatorId.operator_expression}`;
                  }
              }
  
            }
            else {
              if (f.formulaId) {
                this.databaseValue += f.formulaId.FunctionName;
                this.displayValue += f.formulaId.DisplayName;
  
                if (f.datePart) {
                  this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', f.datePart);
                  // console.log(f.formulaId.FunctionName.replace('{DATEPART}', f.datePart));
                  this.displayValue = `${f.datePart},`;
                }
  
                if (f.firstFieldValue) {
                  this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', f.datePart).replace('{VALUE}', f.firstFieldValue);
                  this.displayValue = this.databaseValue;
                }
  
                if (f.secondFieldId) {
  
                  this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', f.datePart).replace('{VALUE}', f.firstFieldValue).replace('{FROMDATE}', `isnull(${f.secondFieldId.table_alias}.${f.secondFieldId.PrimaryTableColumn},getutcdate())`);
                  this.displayValue = this.databaseValue;
                } else {
                  this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', (f.datePart == null ? 'minute' : f.datePart)).replace('{VALUE}', (f.firstFieldValue == null ? 0 : f.firstFieldValue)).replace('{FROMDATE}', `getutcdate()`);
                  this.displayValue = this.databaseValue;
                }
              }
            }
            this.displayValue = this.displayValue.replace('()','');
            this.databaseValue = this.databaseValue.replace('()','');
  
          });
  
  
          // console.log('display : database >',this.displayValue, ' : ', this.databaseValue);
  
  
        }
      })
    }
  
    save() {
  
      while ((this.tableField.get('resultCalculation') as FormArray).length != 0) {
        (this.tableField.get('resultCalculation') as FormArray).removeAt(0);
      }
      this.resultCalculation.controls.forEach(m => {
        (this.tableField.get('resultCalculation') as FormArray).push(m);
      });
  
      //this.tableField.get('fieldDisplayValue').setValue(this.displayValue);
  
      try {
        this.tableField.get('fieldValue').setValue(this.databaseValue);
      } catch (e) {
        this.tableField.get('fieldValue').clearValidators();
        this.tableField.get('fieldValue').updateValueAndValidity();
        this.tableField.get('fieldValue').setValue(null);
      }
      this.hide();
    }
  
    deleteField(index: number) {
      //this.resultCalculation.controls[index].get('statusId').setValue('1003');
       this.resultCalculation.removeAt(index);
  
      //resultCalculate.get('firstFields')?.value
      // this.resultCalculation.controls.forEach()
    }
  
    show(tableField: FormGroup, moduleId: any, subModuleId: any,customFieldsList: any) {
      this.tableField = tableField;
      this.moduleId = moduleId;
      this.subModuleId = subModuleId;
      if(customFieldsList){
        this.customFieldsList =JSON.parse(JSON.stringify( customFieldsList));
        this.customFieldsList = this.customFieldsList.filter(x=>x.actual_data_type == this.tableField.value.fieldId.actual_data_type)
      }
      this.ngOnInit();
      // this.getSubModuleList();
      this.isDate = (this.tableField.value.fieldId.actual_data_type == 'datetime' || this.tableField.value.fieldId.actual_data_type == 'date');
      let sqlFunctionTypeCode = this.isDate ? 'date' : 'numeric';
      this.getSqlFunctionList(sqlFunctionTypeCode);
  
      this.commonService.getOperatorsByDataTypeCode(this.tableField.value.fieldId.actual_data_type).subscribe((m: any) => {
        this.operators = m.filter(f => f.OperatorTypeId === 1);
      });
  
      while (this.resultCalculation.length != 0) {
          this.resultCalculation.removeAt(0);
      }
  
      if ((this.tableField.get('resultCalculation') as FormArray).controls.length != 0) {
        (this.tableField.get('resultCalculation') as FormArray).controls.forEach(m => {
  
          let resultCalculation = this.service.buildResultCalculation(m.value);
  
  
          this.resultCalculation.push(resultCalculation);
  
        });
      }
      else {
        this.resultCalculation.push(this.service.buildResultCalculation());
      }
  
      this.conditionCalculationModal.show();
    }
    hide() {
      this.conditionCalculationModal.hide();
    }
  
  }
  