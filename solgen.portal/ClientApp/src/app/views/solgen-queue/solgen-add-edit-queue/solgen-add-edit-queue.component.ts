import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { CheckQueueName, SolgenQueueService } from '../solgen-queue.service';

@Component({
  selector: 'app-solgen-add-edit-queue',
  templateUrl: './solgen-add-edit-queue.component.html',
  styleUrls: ['./solgen-add-edit-queue.component.scss']
})
export class SolgenAddEditQueueComponent implements OnInit {
  id : any = null;
  pageTitle : string;
  statusList: any[] = [{ text: "Active", value: 1001 }, { text: "InActive", value: 1002 }];
  queueForm: FormGroup;
  subModule: any;
  subModuleList: any[];
  events: any = [];
  isEditEvent : boolean= true;
  editFromVersion: boolean = false;
  eventName: string;
  customFieldsList: any;
  loadSave: boolean = false;
  appmodel: CheckQueueName = new CheckQueueName();
  inputProductId : number;
  productId: any;
  lstPageSize: any;
  productName: string;
  queueData: any;
  queueNameToShow: string = "";
  constructor(private service: SolgenQueueService,
    private fb: FormBuilder, 
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private dialogService: ConfirmationDialogService) { }

    ngOnInit() {
      
      this.loadSave = true;
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
        if (this.id) {
          this.fillqueueForm(this.id);
          this.getPageSizes();
          this.pageTitle = 'Edit Queue';
        }
        else {
          this.pageTitle = 'Add Queue';
        }
      });

      this.initForm();
      this.onModuleChange();
      this.onSubModuleChange();
    }
    fillqueueForm(id) {

      this.service.GetSolgenQueueDetail(id).subscribe((result: any) => {
        // console.log(result);
        this.queueData = result;
        let queue = this.queueData;
        this.editPrepare(queue);
      });
    }
    editPrepare(queue: any) {
      ;
      this.isEditEvent = false;
      this.eventName = queue.eventName;
      this.productName = queue.productName
      this.queueNameToShow = queue.queueName;
      this.queueForm.patchValue({
        queueId: queue.queueId,
        name: queue.queueName,
        description : queue.description,
        moduleId: queue.moduleId,
        subModuleId: queue.SubModuleId,
        eventId: queue.SubModuleEventId,
        statusId: queue.statusId
      });
  
      while (this.targets.length != 0) {
        this.targets.removeAt(0);
      }
      if (queue.targets) {
        queue.targets.forEach((m: any) => {
          this.targets.push(this.service.buildTarget(m));
        });
      }
  
    }
  
    initForm() {
      this.queueForm = this.fb.group({
        queueId: [""],
        name: [null, Validators.required],
        moduleId: [null, Validators.required],
        subModuleId: [null, Validators.required],
        eventId: [0, Validators.required],
        description: [null],
        statusId: [null,Validators.required],
        displayOrder: [0],
        targets: this.fb.array([this.service.buildTarget()])
      });
      setTimeout(() => {
        this.loadSave = false;
      }, 1000);
    }
    getPageSizes() {
      this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
        this.lstPageSize = this.commonService.masters;
      })
    }
    get queueId() {
      return this.queueForm.get('queueId');
    }
    get name() {
      return this.queueForm.get('name');
    }
    get moduleId() {
      return this.queueForm.get('moduleId');
    }
    get subModuleId() {
      return this.queueForm.get('subModuleId');
    }
    get statusId() {
      return this.queueForm.get('statusId');
    }
    get eventId() {
      return this.queueForm.get('eventId');
    }
    get targets() {
      return this.queueForm.get('targets') as FormArray;
    }
    onEventChange(event) {
      this.eventName = event.Name;
      this.isEditEvent = false;
      this.inputProductId = this.productId;
    }
    onModuleChange() {
      this.service.getSubModules().subscribe((s: any) => {
        this.subModuleList = s;//.filter(a => a.Status_id === 1001 );
      });
    }
    onSubModuleChange() {
      this.subModuleId.valueChanges.subscribe((m: any) => {
        this.queueForm.get('moduleId').setValue(m.module_id);
        ;
        this.getSubModuleEventList(m);
        this.getSubModuleList();
      });
    }
    getSubModuleList() {
      let module = this.queueForm.get('moduleId').value;
      let subModule = this.queueForm.get('subModuleId').value;
      if (module && subModule) {
        return this.service.GetCustomFieldsListBySubModuleId(module.value, subModule.sub_module_id).subscribe((m: any) => {
          if (m) {
            let tableFields = m.data.map(f => {
              return {
                PrimaryTableColumn: f.PrimaryTableColumn,
                actual_data_type: f.actual_data_type,
                display_name: f.display_name,
                form_field_id: f.form_field_id,
                dt_code: f.dt_code,
                name: f.label,
                select_options: f.select_options,
                table_name: f.table_name,
                table_alias: f.table_alias,
                subModuleAlias: f.table_alias,
                sub_module_id: f.sub_module_id
              }
            });
            this.customFieldsList = tableFields;
          }
        });
      }
  
    }
    addTarget() {
      this.targets.push(this.service.buildTarget());
    }
  
    deleteTarget(targetIndex: number) {
  
      const message = `Are you sure you want to remove this target??`;
      this.dialogService.confirm('Delete target', message).subscribe(confirmed => {
        if (confirmed) {
  
          this.targets.removeAt(targetIndex);
  
        }
      });
      // if (confirm("Are you sure you want to remove this target?")) {
      //   this.targets.removeAt(targetIndex);
      // }
    }
  
    editEvent() {
      this.isEditEvent = !this.isEditEvent;
    }
  
    getSubModuleEventList(subModule) {
      if (!this.editFromVersion) {
        if (subModule) {
          if (this.resetTarget()) {
            this.subModule = subModule;
            this.service.getSubModuleEventList(subModule.sub_module_id).subscribe((m: any[]) => {
              this.events = m;
              // console.log(m);
            });
          } else {
            //this.loanProductId.setValue(this.subModule.sub_module_id);
          }
        }
      }
    }
  
    showAddTarget() {
      if (this.targets.controls.length == 0) {
        return true;
      }
      else if (this.targets.controls[this.targets.controls.length - 1].get('isResultAdded').value) {
        return true
      } else {
        return false;
      }
    }
  
    resetTarget() {
      if (this.eventId.value != 0) {
        if (confirm("Are you sure you want to change form? if you change form, all related data will be lost.")) {
          this.eventName = '';
          this.isEditEvent = true;
          this.eventId.setValue(0);
  
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    createFieldValue(c: any) {
      let fieldValue: any;
      if (c.fieldValue) {
        // if(c.conditionsId.value == '2' && c.operatorId.operator_display_name.includes('multiple') && (c.fieldId.dt_code == 'select' || c.fieldId.dt_code == 'text')){ //Is compare
        //  fieldValue = c.fieldValue.map(m => { return ((c.fieldId.actual_data_type.includes('varchar')
        //       || c.fieldId.actual_data_type.includes('table'))
        //       ? `'${m.name}'` : `${m.name}`); }).join();
        // }
        // else {
        fieldValue = c.fieldValue;
        //}
  
        return fieldValue;
      }
    }
    prepareTarget() {
  
      return this.targets.value.map((t, index) => {
        return {
          DisplayOrder: index,
          targetId: t.targetId,
          targetCondition: t.targetCondition,
          conditions: t.conditions.map((c, cIndex) => {
            return {
              DisplayOrder: cIndex,
              subModuleId: c.subModuleId,
              conditionId: c.conditionId,
              relationWithParent: c.relationWithParent,
              openingBrackets: c.openingBrackets,
              subModuleAlias: c.subModuleAlias,
              fieldId: c.fieldId.form_field_id,
              operatorId: c.operatorId.operator_id,
              fieldValue: this.createFieldValue(c),
              fieldSecondValue: c.fieldSecondValue,
              conditions: c.conditions,
              conditionsId: c.conditionsId,
              closingBrackets: c.closingBrackets,
              isTime: c.isTime,
              resultCalculation: c.resultCalculation.map((rc, rcIndex) => {
                return {
                  queueTargetResultConditionCalculationID: rc.queueTargetResultConditionCalculationID,
                  DisplayOrder: rcIndex,
                  closingBrackets: rc.closingBrackets,
                  formulaId: (rc.formulaId != null && typeof rc.formulaId.SqlFunctionId !== 'undefined' ? rc.formulaId.SqlFunctionId : null),
                  firstFieldId: (rc.firstFieldId == null ? null : rc.firstFieldId.form_field_id),
                  firstFieldValue: rc.firstFieldValue,
                  firstFieldSectionId: rc.firstFieldId.sub_module_id,
                  secondFieldId: (rc.secondFieldId == null ? null : rc.secondFieldId.form_field_id),
                  secondFieldValue: rc.secondFieldValue,
                  secondFieldSectionId: rc.secondFieldSectionId == null ? null : rc.secondFieldSectionId.sub_module_id,
                  datePart: rc.datePart,
                  operatorId: (rc.operatorId != null && typeof rc.operatorId.operator_id !== 'undefined' ? rc.operatorId.operator_id : null),
                  statusId: rc.statusId,
                  openingBrackets: rc.openingBrackets,
                }
              })
            }
          }),
          results: t.results.map((rr, rrIndex) => {
            return {
              DisplayOrder: rrIndex,
              resultId: rr.resultId,
              name: rr.name,
              actionId: rr.actionId,
              subModuleId: rr.subModuleId,
              resultCondition: rr.resultCondition,
              tableFields: rr.tableFields.map((f, fIndex) => {
                return {
                  queueTargetResultConditionId: f.queueTargetResultConditionId,
                  queueTargetId: f.queueTargetId,
                  DisplayOrder: fIndex,
                  fieldId: (typeof f.fieldId === 'undefined' ? null : f.fieldId.form_field_id),
                  name: f.name,
                  dataType: f.dataType,
                  fieldValue: (f.fieldValue != null && typeof f.fieldValue.value !== 'undefined' ? f.fieldValue.value : (f.fieldValue == null ? f.fieldDisplayValue : f.fieldValue)),
                  fieldDisplayValue: f.fieldDisplayValue,
                  conditions: f.conditions,
                  conditionsId: f.conditionsId,
                  subModuleId: f.subModuleId,
                  customFormula : f.customFormula.formulaType != null ? {
                    id : f.customFormula.id,
                    queueId : f.customFormula.queueId,
                    queueTargetResultConditionId : f.customFormula.queueTargetResultConditionId,
                    formulaType : f.customFormula.formulaType,
                    openingBrackets : f.customFormula.openingBrackets,
                    subModuleId : f.customFormula.subModuleId,
                    fieldId : f.customFormula.fieldId.form_field_id,
                    operatorId : f.customFormula.operatorId.operator_id,
                    operators : f.customFormula.operators,
                    fieldValue : f.customFormula.fieldValue,
                    closingBrackets : f.customFormula.closingBrackets,
                    conditionsId : f.customFormula.conditionsId,
                    ifBodyConditionOperator : f.customFormula.ifBodyConditionOperator,
                    ifBodyFieldValue : f.customFormula.ifBodyFieldValue,
                    elseBodyConditionOperator : f.customFormula.elseBodyConditionOperator,
                    elseBodyFieldValue : f.customFormula.elseBodyFieldValue,
                  }  : null,
                  resultCalculation: f.resultCalculation.map((rc, rcIndex) => {
                    return {
                      queueTargetResultConditionCalculationID: rc.queueTargetResultConditionCalculationID,
                      DisplayOrder: rcIndex,
                      closingBrackets: rc.closingBrackets,
                      formulaId: (rc.formulaId != null && typeof rc.formulaId.SqlFunctionId !== 'undefined' ? rc.formulaId.SqlFunctionId : null),
                      firstFieldId: (rc.firstFieldId == null ? null : rc.firstFieldId.form_field_id),
                      firstFieldValue: rc.firstFieldValue,
                      firstFieldSectionId: rc.firstFieldId!=null ? rc.firstFieldId.sub_module_id : null,
                      secondFieldId: (rc.secondFieldId == null ? null : rc.secondFieldId.form_field_id),
                      secondFieldValue: rc.secondFieldValue,
                      secondFieldSectionId: rc.secondFieldSectionId == null ? null : rc.secondFieldSectionId.sub_module_id,
                      datePart: rc.datePart,
                      operatorId: (rc.operatorId != null && typeof rc.operatorId.operator_id !== 'undefined' ? rc.operatorId.operator_id : null),
                      openingBrackets: rc.openingBrackets,
                      statusId: rc.statusId,
                    }
                  })
                }
              })
  
            }
          }),
        }
      });
  
      this.editFromVersion = false;
    }
  
    save() {
      ;
      if (this.queueForm.valid) {
        this.loadSave = true;
        this.appmodel.QueueId = this.queueForm.value.queueId;
        this.appmodel.QueueName = this.queueForm.value.name;
        // console.log(this.queueForm.value.loanProducts);
        let newTarget = this.prepareTarget();
        let newResultForm = {
          queueId: this.queueForm.value.queueId,
          name: this.queueForm.value.name,
          moduleId: this.queueForm.value.subModuleId.module_id,
          subModuleId: this.queueForm.value.subModuleId.sub_module_id,
          description: this.queueForm.value.description,
          eventId: this.queueForm.value.eventId,
          statusId: this.queueForm.value.statusId,
          targets: newTarget,
        };
        // console.log('queue form value: ', this.queueForm.value);
        // console.log('new queue form: ', newResultForm);
        this.service.checkNameExist(this.appmodel).subscribe((result: any) => {
          if (result.statusCode == 201) {
            this.toaster.error(result.responseMessage);
            this.loadSave = false;
          }
          else {
            this.service.addUpdateSolgenQueue(newResultForm).subscribe((result: any) => {
              if (result.statusCode == 200) {
                if(this.id!=null)
                {
                  this.toaster.success('Queue has been updated successfully.');
                }
                else{
                  this.toaster.success(result.responseMessage);
                }
               
                this.loadSave = false;
                this.router.navigateByUrl("/queues");
  
              } else {
                this.toaster.error(result.responseMessage);
              }
            });
          }
  
        });
      }
    }
}