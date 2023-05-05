import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/views/shared/common.service';
import { SolgenQueueService } from '../../solgen-queue.service';

@Component({
  selector: 'app-solgen-queue-results',
  templateUrl: './solgen-queue-results.component.html',
  styleUrls: ['./solgen-queue-results.component.scss']
})
export class SolgenQueueResultsComponent implements OnInit {

  @Input() target: FormGroup;
  @Input() queueForm: FormGroup;
  @Input() customFieldsList: any;
  @Input() vwRuleId: any;
  resultForm: FormGroup;
  resultActionList: any[];
  editIndex: number = -1;
  @ViewChild('addResult', { static: false }) addResultModel: ModalDirective;
  tableList: any[];
  tempTableList: any[];
  moduleId: string = '';
  objectName = 'queue';
  constructor(private service: SolgenQueueService,
    private commonService: CommonService) { }

    ngOnChanges() {
      // this.moduleId = this.queueForm.get('moduleId').value.value;
      this.getSubModules();
    }
    ngOnInit() {
      this.initForm();
      this.clearTableFields();
      this.getResultActions();
    }
    onActionChange(event) {
      this.clearTableFields();
      if (typeof event !== 'undefined') {
        this.resultForm.get('actionId').setValue(event.resultActionId);
        this.prepareActionChangeContent(event.code, true);
      }
    }
    prepareActionChangeContent(code: string, onChange = false) {
      ;
      if (code == 'validation') {
        if (onChange) {
          this.resultForm.get('resultCondition').setValue(null);
        }
  
        this.resultForm.get('resultCondition').setValidators([Validators.required]);
        this.resultForm.get('resultCondition').updateValueAndValidity();
      } else {
  
        if (onChange) {
          this.resultForm.get('resultCondition').setValue(null);
        }
  
        this.resultForm.get('resultCondition').clearValidators();
        this.resultForm.get('resultCondition').updateValueAndValidity();
      }
      if (code === 'create') {
        this.tempTableList = this.tableList;
        this.tableList = this.tableList.filter(m => m.module_name_code == 'LoanApplicationRequiredDocument');
      } else {
        if (this.tempTableList) {
          this.tableList = this.tempTableList;
        }
      }
      this.resultForm.get('subModuleId').setValue(this.queueForm.get('subModuleId').value.sub_module_id);
    }
  
    getResultActions() {
      this.commonService.getLeadResultActions(this.objectName).subscribe((m: any[]) => {
        this.resultActionList = m;
        // console.log(this.resultActionList);
      });
    }
    getSubModules() {
      this.service.getSubModules().subscribe((m: any[]) => {
        this.tableList = m.filter(a => a.module_name_code != 'loanproduct' && a.module_name_code != 'loanapplication');
      });
    }
  
    showResultModal() {
      this.editIndex = -1;
      this.addResultModel.show();
      this.resetResultForm();
    }
  
    hideResultModal() {
      this.addResultModel.hide();
    }
  
    get results() {
      return this.target.get('results') as FormArray;
    }
  
    get tableFields() {
      return this.resultForm.get('tableFields') as FormArray;
    }
  
    clearTableFields() {
      while (this.tableFields.length !== 0) {
        this.tableFields.removeAt(0);
      }
    }
  
    initForm() {
      // console.log('called from result componnet');
      this.resultForm = this.service.buidResult();
    }
    editResult(index) {
      this.editIndex = index;
      let editResultForm = this.results.at(this.editIndex) as FormGroup;
      let formValue = editResultForm;
      this.resultForm = formValue;
      this.resultForm.get('isEdit').setValue(true);
      this.prepareActionChangeContent(editResultForm.get('action').value.code);
      this.addResultModel.show();
    }
  
    saveResult() {
      if ((this.resultForm.get('isEdit').value == null || this.resultForm.get('isEdit').value == false) && this.resultForm.valid) {
        this.prepareQuery(this.resultForm);
        this.results.push(this.resultForm);
        this.target.get('isResultAdded').setValue(true);
        this.hideResultModal();
      } else if (this.resultForm.get('isEdit').value == true && this.resultForm.valid) {
        this.results.removeAt(this.editIndex);
        this.prepareQuery(this.resultForm);
        this.results.insert(this.editIndex, this.resultForm);
        this.target.get('isResultAdded').setValue(true);
        this.hideResultModal();
      } else {
        alert('Invalid');
      }
    }
  
    deleteResultForm() {
      if (confirm("Are you sure you want to delete this result?")) {
        this.results.removeAt(this.editIndex);
        this.hideResultModal();
      }
    }
    resetResultForm() {
      this.initForm();
    }
    prepareQuery(result: FormGroup) {
      let actionName = result.get('action').value.code;
      
      if (actionName == 'queueInsert') {
        this.service.buildConditionResultCreateQuery(this.resultForm);
      } else if (actionName == 'queueUpdate') {
        this.service.buildConditionResultUpdateQuery(this.resultForm);
      }
    }
}
