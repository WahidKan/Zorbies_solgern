import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { CheckboxData } from '../../department/department.service';
import { WorkFlowResultComponent } from './work-flow-result.component';
import { CommonService } from '../../shared/common.service';
import { RuleEngineService } from '../../rule-engine/rule-engine.service';
import { ModalDirective } from 'ngx-bootstrap';
import { WorkFlowConditionComponent } from './work-flow-condition.component';
import { ScreenComponent } from './screen.component';
import { WorkFlowTargetComponent } from './work-flow-target.component';
import { WorkflowService } from '../workflow.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-work-flow-descision',
  templateUrl: './work-flow-descision.component.html',
  styleUrls: ['./work-flow-descision.component.scss']
})
export class WorkFlowDescisionComponent implements OnInit, OnChanges {

  @Input() offset: number;
  SelectedValue: any[] = [];
  @Input() ruleEngineForm: FormGroup;
  @Input() target: FormGroup;
  @Input() rowNo: number;
  //@Input() resulttype: string;
  @Input() productId: string;
  //@Output() buttonState = new EventEmitter();
  @Output() buttonState = new EventEmitter();
  @Output() getIndexNo = new EventEmitter<{ rowno: number, type: string }>();
  targetForm: FormGroup;
  customFieldsList: any;
  newAdd = "Add";
  isShow: boolean = false;
  subModuleList: any[] = [];
  @ViewChild('addNewCondition', { static: false }) addNewCondition: ElementRef;
  @ViewChild('targettype', { static: false }) targettype: ElementRef;
  @ViewChild('addConditionModal', { static: false }) addConditionModel: ModalDirective;
  sqlConditionOperators = ['Or', 'And'];
  hideFieldList = true;
  textFieldListButton = " Show Field List";
  isResult: boolean = false;
  screendata: any[] = [];
  submoduleid: any;
  moduleid: any;
  screenId: any;
  ddldatastep: any[]=[];
  isdecisionbutton: boolean = false;
  @ViewChild('resultcomponent', { static: false }) resultcomponent: WorkFlowResultComponent;
  //@ViewChild('targetcomponent') targetcomponent: WorkFlowTargetComponent;
  @ViewChild('conditioncomponent', { static: false }) conditioncomponent: WorkFlowConditionComponent;
  @ViewChild('screencomponent', { static: false }) screencomponent: ScreenComponent;
  constructor(private ruleEngineService: WorkflowService, private commonService: CommonService, private dialogService: ConfirmationDialogService,private toaster: ToastrService) { }



  ngOnChanges(): void {
    
   
    this.getSubModuleList();
    this.initForm();
    this.onConditionChange();
    // this.getDecisionData();         
   // this.getsteppdll()
  
   // ddlStepDropdown: [null],
    if (this.target.get('isDecisionAdded').value) {
      var ab = this.rowNo + 2;
      //const ddlstep = this.ruleEngineForm.get('targets') as FormArray;
      //for (var i = ab; ddlstep.length >= i; i++) {
      
      //  this.ddldatastep.push({ Id: i, name: i })
      //  this.targetForm.get('ddlStepDropdown').setValue(this.ddldatastep);
      //}
      //const control = this.target.get('targetCondition') as FormArray;
      const controlresult = this.target.get('results') as FormArray;
      let sb: any;       
      if (controlresult.length >= 1) {
        sb = controlresult.controls[0].get('resultCondition').value;
      }

      var scren = this.target.get('ScreenId').value;
      // console.log('displayConditiondisplayCondition', sb)
      // console.log('controlresultcontrolresult', controlresult)


      if (sb != null && sb != "" && sb != undefined) {

        this.target.get('isResultDecisionAdded').setValue(true);


      }
      if (scren > 0) {

        this.target.get('isDecisionScreenAdded').setValue(true);
      }
      if ((sb == null || sb == "" || sb == undefined) && scren == 0) {

        this.isdecisionbutton = true;
      }

      this.prepareEditConditionForm();
    }
  }
  ngOnInit() {
    
  }

 
  //addstepdlldata(index, stepno) {
  //  ;
  //  const ddlstep = this.ruleEngineForm.get('targets') as FormArray;
  //  let ddldata: any[] = [];
  //  ddldata = ddlstep.controls[index].get('ddlStepDropdown').value;
  //  this.ddldatastep.push({ Id: stepno, name: stepno })
  //  for (var i = index; ddlstep.length >= i; i++) {   
  //    this.ddldatastep.push({ Id: i, name: i })
  //    ddlstep.controls[index].get('ddlStepDropdown').setValue(this.ddldatastep);
  //  }
  // // ddlstep.controls[index].get('ddlStepDropdown').setValue(this.ddldatastep);
  //  //this.targetForm.get('ddlStepDropdown').setValue(this.ddldatastep);
  //  // console.log('ddddddddddddddddddddd', this.ruleEngineForm.get('targets') as FormArray);   
  //}  
  //show and hide table field list
  showFieldList() {
    this.hideFieldList = !this.hideFieldList;
    this.textFieldListButton = this.hideFieldList ? " Show Field List" : "Hide Field List";
  }

  initForm() {

    this.targetForm = this.ruleEngineService.buildTarget(null, 'decision');
    // console.log('targetForm', this.targetForm);
  }

  //fetch section list
  getSubModuleList() {
    const control = this.ruleEngineForm.get('targets') as FormArray;
    let screenids = "";
    // console.log('controlcontrolcontrol', control)
    for (var i = 0; i < this.rowNo + 1; i++) {
      if (control.controls[i].value.ScreenId > 0) {
        screenids += control.controls[i].value.ScreenId.toString() + ",";
      }
    }


    return this.ruleEngineService.getSubModules(this.ruleEngineForm.get('moduleId').value.value, screenids, true).subscribe((m: any[]) => {
      this.subModuleList = m.filter(a => a.module_name_code != 'loanapplication');
    });
  }

  //getDecisionData() {
  //  const controlTarget = this.ruleEngineForm.get('targets') as FormArray;
  //  const control = this.conditions.controls[0];
  //  this.screenId = controlTarget.controls[controlTarget.length - 2].value.ScreenId;
  //  //// console.log('control.controls[0];', control.controls[control.length-2])
  //  //// console.log('control.controls[0].value.ScreenId;', control.controls[control.length - 2].value.ScreenId)
  //  //// console.log('control', control);
  //  // console.log('control.length', controlTarget.length);      

  //  this.submoduleid = this.ruleEngineForm.value.subModuleId.sub_module_id;
  //  this.moduleid = this.ruleEngineForm.value.moduleId.value;
  //  // console.log('submoduleid', this.submoduleid);
  //  // console.log('moduleid', this.moduleid);
  //  if (this.submoduleid !== 'undefined' && this.screenId !== 'undefined' && this.screenId !=='') {
  //    this.targetForm.get('targetDecision').patchValue({
  //      screenDecisionId: this.screenId,  

  //    });
  //    this.ruleEngineService.GetCustomFieldsListBySubModuleId(this.submoduleid, this.screenId, true).subscribe((m: any) => {
  //      if (m) {
  //        // console.log('decM', m)
  //        let tableFields = m.data.map(f => {     
  //          return {
  //            PrimaryTableColumn: f.PrimaryTableColumn,
  //            actual_data_type: f.actual_data_type,
  //            display_name: f.display_name,
  //            form_field_id: f.form_field_id,
  //            dt_code: f.dt_code,
  //            name: f.name,
  //            sub_module_id: f.sub_module_id,
  //            select_options: f.select_options,
  //            table_name: f.table_name,
  //            table_alias: f.table_alias
  //          }
  //        });       
  //        // console.log('tableFields', tableFields)

  //        control.get('fieldId').setValue(null);  
  //        control.get('operatorId').setValue(null);
  //        control.get('subModuleAlias').setValue(null);
  //        control.get('operators').setValue(null);
  //        control.get('fieldValue').setValue(null);
  //        control.get('fields').setValue(tableFields);
  //        control.get('subModuleAlias').setValue(tableFields[0].table_alias);
  //        this.customFieldsList = m.data;
  //      } else {

  //        control.get('fields').setValue(null);
  //        control.get('fieldId').setValue(null);
  //        control.get('operatorId').setValue(null);
  //        control.get('subModuleAlias').setValue(null);
  //        control.get('operators').setValue(null);
  //        control.get('fieldValue').setValue(null);
  //        this.customFieldsList = null;
  //      }

  //    });
  //  } else {

  //    control.get('fieldId').setValue(null);
  //    control.get('operatorId').setValue(null);
  //    control.get('subModuleAlias').setValue(null);
  //    control.get('operators').setValue(null);
  //    control.get('fieldValue').setValue(null);
  //    control.get('fields').setValue([]);
  //  }


  //}


  //fetch section form field list on section change
  onSubModuleChange(event, control) {

    // console.log("event", event);
    if (typeof event !== 'undefined') {
      let isdecison = false;

      if (event.type == 'screen') {
        isdecison = true;
        this.screenId = event.sub_module_id;
        var submodule = event.screensubmoduleid;
      }
      else {
        isdecison = false;
        // this.screenId = event.sub_module_id;
        var submodule = event.sub_module_id;
      }
      this.ruleEngineService.GetCustomFieldsListBySubModuleId(submodule, this.screenId, isdecison).subscribe((m: any) => {
        if (m) {

          // console.log('decM', m)
          let tableFields = m.data.map(f => {
            return {
              PrimaryTableColumn: f.PrimaryTableColumn,
              actual_data_type: f.actual_data_type,
              display_name: f.display_name,
              form_field_id: f.form_field_id,
              dt_code: f.dt_code,
              name: f.name,  
              field_code:f.field_code,
              sub_module_id: f.sub_module_id,
              select_options: f.select_options,
              table_name: f.table_name,
              table_alias: f.table_alias
            }
          });
          // console.log('tableFields', tableFields)
          control.get('fieldId').setValue(null);
          control.get('operatorId').setValue(null);
          control.get('subModuleAlias').setValue(null);
          control.get('operators').setValue(null);
          control.get('fieldValue').setValue(null);
          control.get('fields').setValue(tableFields);
          control.get('subModuleAlias').setValue(tableFields[0].table_alias);
          this.customFieldsList = m.data;
        } else {

          control.get('fields').setValue(null);
          control.get('fieldId').setValue(null);
          control.get('operatorId').setValue(null);
          control.get('subModuleAlias').setValue(null);
          control.get('operators').setValue(null);
          control.get('fieldValue').setValue(null);
          this.customFieldsList = null;
        }

      });
    } else {

      control.get('fieldId').setValue(null);
      control.get('operatorId').setValue(null);
      control.get('subModuleAlias').setValue(null);
      control.get('operators').setValue(null);
      control.get('fieldValue').setValue(null);
      control.get('fields').setValue([]);
    }

  }

  //show target condition popup on "Add Target" click
  showConditionModal() {
    this.isShow = true;

    this.addConditionModel.show();

  }



  //hide target condition popup modal on cancel click
  hideConditionModal() {
    this.addConditionModel.hide();
    //document.getElementById("test").classList.add("condition-false1");
    this.targetForm.get('addButton').setValue(false);
  }

  //on condition FormArray change to fetch prepare condition 
  onConditionChange() {
    this.conditions.valueChanges.subscribe((condition: any[]) => {

      let displayCondition = '';
      let databaseCondition = '';
      // console.log("condition", condition);

      condition.forEach((obj) => {
        // console.log("test obj ", obj);
        if (obj.relationWithParent != null) {
          displayCondition += ` ${obj.relationWithParent.toLowerCase()} `;
          databaseCondition += ` ${obj.relationWithParent.toLowerCase()} `;
        }

        if (obj.openingBrackets != null) {
          displayCondition += obj.openingBrackets;
          databaseCondition += obj.openingBrackets;
        }

        if (obj.fieldId != null && obj.fieldId != '') {
          let fieldObj = obj.fieldId;
          displayCondition += fieldObj.PrimaryTableColumn;


          if (fieldObj.actual_data_type != 'table') {
            ;
            if (obj.operatorId != null && (obj.operatorId.operator_display_name.includes('Is Null') || obj.operatorId.operator_display_name.includes('Is Not Null'))) {

              databaseCondition += `${obj.subModuleAlias}.[${fieldObj.PrimaryTableColumn}]`;

            }
            else if (fieldObj.dt_code.includes('text')) {
              databaseCondition += `isnull(${obj.subModuleAlias}.[${fieldObj.PrimaryTableColumn}],'0')`;
            }
            else if (fieldObj.dt_code.includes('select') || fieldObj['dt_code'].includes('radio') || fieldObj['dt_code'].includes('checkbox')) {
              databaseCondition += `isnull(${obj.subModuleAlias}.[${fieldObj.PrimaryTableColumn}],'0')`;
            }
            else if (fieldObj.dt_code.includes('boolean')) {
              databaseCondition += `isnull(${obj.subModuleAlias}.[${fieldObj.PrimaryTableColumn}],0)`;
            }
            else if (fieldObj.dt_code.includes('bigint') || fieldObj.dt_code.includes('int') || fieldObj.dt_code.includes('decimal')) {
              databaseCondition += `isnull(${obj.subModuleAlias}.[${fieldObj.PrimaryTableColumn}],0)`;
            }

            else {
              databaseCondition += `${obj.subModuleAlias}.[${fieldObj.PrimaryTableColumn}]`;
            }

          }
        }

        var operatorExpression = '';

        if (obj.operatorId != null) {
          let operator = obj.operatorId;
          displayCondition += ` ${operator.operator_display_name}`;
          databaseCondition += ` ${operator.operator_expression}`;
          operatorExpression = operator.operator_expression;
        }


        if (obj.fieldValue != null && obj.fieldValue.toString() != '') {


          let fieldObj = obj.fieldId;

          if (obj.fieldId != null && fieldObj.actual_data_type != 'table') {
            if (fieldObj != null) {
              if (fieldObj.dt_code.includes('text')) {

                if (operatorExpression == 'Like') {

                  displayCondition += ` '${obj.fieldValue}'`;
                  databaseCondition += " '%" + obj.fieldValue + "%'";

                }
                else if (operatorExpression == 'IN') {

                  displayCondition += ` (${obj.fieldValue})`;
                  databaseCondition += " (" + obj.fieldValue + ")";

                }
                else {

                  displayCondition += ` '${obj.fieldValue}'`;
                  databaseCondition += " '" + obj.fieldValue + "'";

                }

              }
              else if (fieldObj.dt_code.includes('date')) {

                if (operatorExpression == 'between') {
                  let secondValue = '';
                  if (typeof obj.fieldSecondValue != 'undefined') {
                    secondValue = new Date(obj.fieldSecondValue).toLocaleDateString();
                  }

                  displayCondition += ` '${new Date(obj.fieldValue).toLocaleDateString()}' and '${secondValue}'`;
                  databaseCondition += ` '${new Date(obj.fieldValue).toLocaleDateString()}' and '${secondValue}'`;
                } else {
                  displayCondition += " '" + new Date(obj.fieldValue).toLocaleDateString() + "'";
                  databaseCondition += " '" + new Date(obj.fieldValue).toLocaleDateString() + "'";
                }

              }
              else if (fieldObj['dt_code'].includes('select') || fieldObj['dt_code'].includes('radio') || fieldObj['dt_code'].includes('checkbox')) {

                if (Array.isArray(obj['fieldValue'])) {
                  displayCondition += " (" + obj['fieldValue'].map(m => { return `'${m.name}'`; }).join() + ")";
                  databaseCondition += " (" + obj['fieldValue'].map(m => { return (fieldObj['actual_data_type'].includes('varchar') ? `'${m.value}'` : `${m.value}`); }).join() + ")";
                }
                else {
                  displayCondition += " '" + obj['fieldValue'].name + "'";
                  databaseCondition += " '" + obj['fieldValue'].value + "'";
                }
              }
              else if (fieldObj['dt_code'].includes('boolean')) {

                displayCondition += ' ' + obj['fieldValue'];
                databaseCondition += ' ' + (obj['fieldValue'] === true ? 1 : 0);

              }
              else {
                if (operatorExpression == 'between') {

                  displayCondition += ` ${obj['fieldValue']} and ${obj['fieldSecondValue']}`;
                  databaseCondition += ` ${obj['fieldValue']} and ${obj['fieldSecondValue']}`;

                } else if (operatorExpression == 'IN') {

                  displayCondition += ` (${obj['fieldValue']})`;
                  databaseCondition += ` (${obj['fieldValue']})`;

                } else {

                  displayCondition += ` ${obj['fieldValue']}`;
                  databaseCondition += ` ${obj['fieldValue']}`;

                }
              }
            }
          }
          else {
            try {
              if (Array.isArray(obj.fieldValue)) {
                displayCondition += ` '${fieldObj.PrimaryTableColumn}` + " (" + obj['fieldValue'].map(m => { return `'${m.name}'`; }).join() + ")";
                databaseCondition += ` ${obj.subModuleAlias}.${fieldObj.PrimaryTableColumn}` + ", (" + obj['fieldValue'].map(m => { return (fieldObj['actual_data_type'].includes('varchar') ? `'${m.value}'` : `${m.value}`); }).join() + "))";
              }
              else {
                displayCondition += " '" + obj['fieldValue'].name + "'";
                databaseCondition += ` ${obj.subModuleAlias}.${fieldObj.PrimaryTableColumn}` + ", '" + obj['fieldValue'].value + "')";
              }
            } catch (ex) {  console.log(ex.message) }
          }
        }

        if (obj['closingBrackets'] != null) {
          displayCondition += obj['closingBrackets'] + ' ';
          databaseCondition += obj['closingBrackets'] + ' ';
        }
      });

      this.targetForm.get('targetDecision').patchValue({
        displayCondition: displayCondition,
        database_condition: databaseCondition
      });
      // console.log("this.targetForm", this.targetForm);
    });
  }
  //decision array 
  get conditions() {


    return this.targetForm.get('decisions') as FormArray;

  }

  //add new condition on add click
  addDecision(event) {
    this.conditions.push(this.ruleEngineService.buidDecision());
    this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(event.target.value);
    // this.conditions.at(this.conditions.length - 1).get('fields').setValue(this.conditions.value[0].fields);
    this.addNewCondition.nativeElement.value = "Add";
    //this.getDecisionData();

  }

  //fetch operator list on field change.
  onFieldChange(event, control, i) {

    // console.log('event', event)

    // console.log('control', control)
    if (typeof event !== 'undefined') {
      this.SelectedValue.push(event);
      // control.get('subModuleId').setValue(event.sub_module_id);
      control.get('subModuleAlias').setValue(event.table_alias);
      control.get('operatorId').setValue(null);

      this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(m => {
        control.get('operators').setValue(m);
      });

    } else {
      control.get('operatorId').setValue(null);
      control.get('operators').setValue([]);
    }
    // console.log('control', control)
  }

  get operators() {
    return this.conditions.get('operators');
  }

  get fields() {
    return this.conditions.get('fields');
  }

  removeCondition(conditionIndex: number) {

    //this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(null);
    this.conditions.removeAt(conditionIndex);

  }


  get targets() {
    return this.ruleEngineForm.get('targets') as FormArray;
  }

  //prepare edit condition form
  prepareEditConditionForm() {

    let editTargetForm = this.targets.at(this.rowNo) as FormGroup;
    // console.log('editTargetForm: ', editTargetForm);

    this.targetForm.patchValue({
      ScreenId: editTargetForm.value.ScreenId,
      targetId: editTargetForm.value.targetId,
      isConditionAdded: editTargetForm.value.isConditionAdded,
      isDecisionAdded: editTargetForm.value.isDecisionAdded,
      targetCondition: editTargetForm.value.targetCondition,
      targetDecision: editTargetForm.value.targetDecision,
      isResultAdded: editTargetForm.value.isResultAdded,
      results: editTargetForm.value.results
    });

    while (this.conditions.length != 0) {
      this.conditions.removeAt(0);
    }
    // console.log('editTargetForm2: ', (editTargetForm.get('decisions') as FormArray).controls);
    (editTargetForm.get('decisions') as FormArray).controls.forEach(m => {
      this.conditions.push(m);
    });
  }

  //fill data in target form and show condition popup modal.s
  editCondition() {
    this.prepareEditConditionForm();
    this.showConditionModal();

  }

  TargetDecison(index: number) {
    return (this.ruleEngineForm.get('targets') as FormArray).at(index).get('decisions') as FormArray;
  }

  get conditionsArray() {

    return this.targetForm.get('conditions') as FormArray;
  }
  TargetConditions(index: number) {
    return (this.ruleEngineForm.get('targets') as FormArray).at(index).get('conditions') as FormArray;
  }
  get results() {
    return this.target.get('results') as FormArray;
  }

  saveDecision() {
    this.targetForm.get('type').setValue('decision');
    this.targetForm.get('isConditionAdded').setValue(false);
    this.targetForm.get('isDecisionAdded').setValue(true);
    // this.results.setValidators([Validators.required]);
    this.buttonState.emit();


    if (!((this.target.value.isResultDecisionAdded) || (this.target.value.isDecisionScreenAdded))) {

      this.isdecisionbutton = true;
    }

    //this.targetForm.get('addButton').setValue(true);
    this.targetForm.get('addButton').setValue(false);
    this.targetForm.get('isResultAdded').setValue(true);

    // console.log('savedate', this.targetForm);
    (this.ruleEngineForm.get('targets') as FormArray).at(this.rowNo).patchValue({
      ScreenId: this.targetForm.value.ScreenId,
      isScreenAdded: this.targetForm.value.isScreenAdded,
      type: this.targetForm.value.type,
      targetId: this.targetForm.value.targetId,
      isDecisionAdded: this.targetForm.value.isDecisionAdded,
      targetDecision: this.targetForm.value.targetDecision,
      isResultAdded: this.targetForm.value.isResultAdded,
      results: this.targetForm.value.results,
      addButton: this.targetForm.value.addButton
    });

    // console.log(this.targetForm.value);

    while (this.TargetDecison(this.rowNo).length != 0) {
      this.TargetDecison(this.rowNo).removeAt(0);
    }



    this.conditions.controls.forEach(m => {
      this.TargetDecison(this.rowNo).push(m);
    });
    while (this.TargetConditions(this.rowNo).length != 0) {
      this.TargetConditions(this.rowNo).removeAt(0);
    }
    this.conditionsArray.controls.forEach(m => {

      this.TargetConditions(this.rowNo).push(m);
    });
    //this.target.get('isResultAdded').setValue(true);
    this.toaster.success('Decision has been added successfully');
    // console.log((this.ruleEngineForm.get('targets') as FormArray).at(this.rowNo));
    // console.log('ruleEngineFormruleEngineForm', this.ruleEngineForm);
    //return;
    this.hideConditionModal();
  }
  AddDecision() {
    //this.getDecisionData();

    this.addConditionModel.show();

  }
  //AddDecision() {
  //  this.decisioncomponent.AddDecision();
  //}
  AddCondition() {
    this.conditioncomponent.AddCondition(true);
  }

  AddScreen(a: any) {
    this.screencomponent.addNewScreen(true);

  }
  addresult() {
    this.resultcomponent.showResultModal();

  }


  //TestFunction() {
  //  document.getElementById("test").classList.remove("condition-false1");
  //}
  deletetarget() {
   // this.getIndexNo.emit({ rowno: this.rowNo, type: 'decision' });
    const message = `Are you sure you want to delete this decision"?`;
    this.dialogService.confirm('Delete Step ', message).subscribe(confirmed => {
      if (confirmed) {
        this.targets.removeAt(this.rowNo);
        this.toaster.success(`Decision has been deleted successfully`);
        this.isdecisionbutton = false;
      }
     
    }); 
    
  }
  showbutton(e: any) {
    if (e == 123456) {
      this.isdecisionbutton = false;
    }
    else {

      this.isdecisionbutton = true;
    }

  }

}




