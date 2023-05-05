import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CheckRuleName, RuleEngineService } from '../rule-engine/rule-engine.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { BankService } from '../bank/bank.service';
import { WorkFlowConditionComponent } from './workflowmodels/work-flow-condition.component';
import { WorkFlowResultComponent } from './workflowmodels/work-flow-result.component';
import { WorkFlowDescisionComponent } from './workflowmodels/work-flow-descision.component';
import { ScreenComponent } from './workflowmodels/screen.component';
import { WorkflowService, CheckFlowName } from './workflow.service';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-workflow-add-edit',
  templateUrl: './workflow-add-edit.component.html',
  styles: [`
      .list-group-item:first-child{
        border-radius:0px;
      }
      .list-group-item:last-child{
        border-radius:0px;
      }
`]
})
export class WorkflowAddEditComponent implements OnInit {
  @ViewChild('resultcomponent', { static: false }) resultcomponent: WorkFlowResultComponent;
  @ViewChild('decisioncomponent', { static: false }) decisioncomponent: WorkFlowDescisionComponent;
  @ViewChild('conditioncomponent', { static: false }) conditioncomponent: WorkFlowConditionComponent;
  @ViewChild('screencomponent', { static: false }) screencomponent: ScreenComponent;
  rValidation: string = '';
  minimumDate: any;
  loanProductList: any[];
  subModule: any;
  ruleTypeList: any[];
  ruleEngineVersionList: any = [];
  ruleEngineVersionListForChange: any = [];
  selectedApplication: any = [];
  selectedOldApplication: any = [];
  events: any = [];
  moduleList: any[];
  subModuleList: any[];
  SelectionType = SelectionType;
  ruleEngineForm: FormGroup;
  loadSave: boolean = false;
  productName: string;
  eventName: string;
  isEditEvent = true;
  productId: any;
  inputProductId: any;
  pageTitle: any;
  ruleEnginedata: any;
  isGlobalRuleType = true;
  editFromVersion: boolean = false;
  id: any;
  laPagedData: any = {
    pager: {},
    data: []
  };
  loanApplicationlistFiltertext = '';
  listFiltertext = '';
  laSortColumn = 'CreatedOn';
  laSortDir = 'desc';
  oldApplicationSortColumn = 'CreatedOn';
  oldApplicationSortDir = 'desc';
  currentPage: number = 1;
  laPageSizeValue: number = 10;
  loanApplicationPageSizeValue: number = 10;
  loginuserid: any;
  batchid: number = 0;
  loading = false;
  appmodel: CheckFlowName = new CheckFlowName();
  bankList: any = [];
  lstPageSize: any;
  isSubmitButtonDisabled = false;
  selectedVersionForChange: any = null;
  RuleNameToShow: string = "";
  isEdit: boolean = false;
  submoduleidform: any=null;
  moduleidform: any;
  @ViewChild('ApplicationPopupForApplyLatestRule', { static: false }) applyLatestRuleOnOldApp: ModalDirective;
  @ViewChild('condition', { static: false }) conditionalmodel: WorkFlowConditionComponent;
  @ViewChild('resultmodel', { static: false }) resultmodel: WorkFlowResultComponent;

  loanApplicationPageData: any = {
    pager: {},
    data: []
  };
  isCondition: boolean = false;
  isResult: boolean = false;
  isScreen: boolean = false;
  isDropdown: boolean = false;

  @ViewChild('targettype', { static: false }) targettype: ElementRef;
  constructor(private ruleEngineService: WorkflowService,
    private fb: FormBuilder, private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private dialogService: ConfirmationDialogService,
    private commonService: CommonService,
    private bankService: BankService) { }

  ngOnInit() {
    this.initForm();
    this.loadSave = true;

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.fillRuleEngineForm(this.id);
        this.isEdit = true;
        //this.refreshLA();
        this.getPageSizes();
      }
      else {
        this.ruleEngineService.getDisplayOrder().subscribe((m) => {
          this.displayOrder.setValue(m);
        });

        this.pageTitle = 'Add Flow';
      }
    });

    //this.onEffectiveDateChange();
    this.getRuleTypeList();
    //this.onRuleTypeChange();
    this.getModuleList();
    this.getLoanProductList('all');
    this.onModuleChange();
    this.onSubModuleChange();
  
  }

  fillRuleEngineForm(id) {
    this.loadSave = true;
    this.pageTitle = 'Edit Flow';
    this.ruleEngineService.GetRuleEngineDetail(id).subscribe((result: any) => {
      // console.log(result);
      this.ruleEnginedata = result;
      let rule = this.ruleEnginedata;
      this.editPrepare(rule);
      this.getRuleEngineVersionList(id);
    });
  }

  editPrepare(ruleEngine: any) {
    //if (this.isEdit) {
    //  this.ruleEngineForm.get('moduleId').disable();
    //  this.ruleEngineForm.get('subModuleId').disable();

    //}
    ;
    if (ruleEngine.customflowid == this.id) {
      this.ruleEngineForm.get('isActive').disable();
    }
    this.moduleidform = ruleEngine.ModuleId,
      this.submoduleidform = ruleEngine.SubModuleId

    const convertdatetime = new DateTimeToLocalForAddEditPipe();
    this.isEditEvent = false;
    this.eventName = ruleEngine.EventName;
    this.productName = ruleEngine.ProductName
    this.RuleNameToShow = ruleEngine.RuleName;
    // (ruleEngine.EffectiveFrom == '' ? null : convertdatetime.transform(ruleEngine.EffectiveFrom, 'Date')); 
    //(ruleEngine.EffectiveTo == '' ? null : convertdatetime.transform(ruleEngine.EffectiveTo, 'Date')); 
    this.ruleEngineForm.patchValue({
      FlowId: ruleEngine.FlowId,
      name: ruleEngine.FlowName,
      moduleId: ruleEngine.ModuleId,
      subModuleId: ruleEngine.SubModuleId,

      //banks: ruleEngine.Banks,
      //loanProducts: (typeof ruleEngine.Products !== 'undefined' ? ruleEngine.Products.map(m => m.ProductId) : null),

      //effectiveFrom: new Date(ruleEngine.EffectiveFrom),
      // effectiveFrom: (ruleEngine.EffectiveFrom == '' ? null : convertdatetime.transform(ruleEngine.EffectiveFrom, 'Date')),
      // effectiveTo: new Date(ruleEngine.EffectiveTo),
      //effectiveTo: (ruleEngine.EffectiveTo == '' ? null : convertdatetime.transform(ruleEngine.EffectiveTo, 'Date')),
      //eventId: ruleEngine.SubModuleEventId,
      ruleVersion: ruleEngine.FlowVersion,
      isActive: ruleEngine.IsActive,
      displayOrder: ruleEngine.displayOrder
    });


    while (this.targets.length != 0) {
      this.targets.removeAt(0);
    }

    ruleEngine.targets.forEach((m: any) => {
      // console.log('editdata', m);
      this.targets.push(this.ruleEngineService.buildTarget(m, m.type));


    });

    this.loadSave = false;
  }

  editRuleVersion(FlowId: number) {
    this.editFromVersion = true;
    this.router.navigateByUrl(`/rule-engine/edit/${FlowId}`);
    //this.refreshLA(ruleId)
  }

  initForm() {
    this.ruleEngineForm = this.fb.group({
      FlowId: [""],
      name: ["", Validators.required],
      moduleId: [null, Validators.required],
      subModuleId: [null, Validators.required],

      banks: [null],
      loanProducts: [null],
      ///effectiveFrom: [null, Validators.required],
      //effectiveTo: [null, Validators.required],
      eventId: [0, Validators.required],
      isActive: [false],
      ruleVersion: [0],

      displayOrder: [0],
      targets: this.fb.array([this.ruleEngineService.buildTarget()])
    });
  }

  getRuleEngineVersionList(FlowId) {
    this.ruleEngineService.getRuleEngineVersionList(FlowId).subscribe((m: any) => {
      this.ruleEngineVersionList = m;
      this.ruleEngineVersionListForChange = m.filter(function (item) { return item.FlowId != FlowId });
      this.makeSubmitButtonDisabled();
    });
  }

  getRuleTypeList() {
    this.ruleEngineService.GetRuleTypeList().subscribe((m: any) => {
      this.ruleTypeList = m;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  getModuleList() {
    this.commonService.getMasterItemsList('custom_modules_layout').subscribe((result: any) => {
      this.moduleList = this.commonService.masters;
    });

  }

  get FlowId() {
    return this.ruleEngineForm.get('FlowId');
  }
  get name() {
    return this.ruleEngineForm.get('name');
  }
  get moduleId() {
    return this.ruleEngineForm.get('moduleId');
  }
  get subModuleId() {
    return this.ruleEngineForm.get('subModuleId');
  }

  get banks() {
    return this.ruleEngineForm.get('banks');
  }
  get loanProducts() {
    return this.ruleEngineForm.get('loanProducts');
  }
  //get effectiveFrom() {
  //  return this.ruleEngineForm.get('effectiveFrom');
  //}
  //get effectiveTo() {
  //  return this.ruleEngineForm.get('effectiveTo');
  //}
  get eventId() {
    return this.ruleEngineForm.get('eventId');
  }
  get targets() {
    return this.ruleEngineForm.get('targets') as FormArray;
  }
  get displayOrder() {
    return this.ruleEngineForm.get('displayOrder');
  }
  get ruleVersion() {
    return this.ruleEngineForm.get('ruleVersion') as FormArray;
  }

  //onEffectiveDateChange() {
  //  this.effectiveFrom.valueChanges.subscribe(m => {
  //    if (this.effectiveTo.value < m) {
  //      this.effectiveTo.setValue(null);
  //    }

  //  });
  //}

  onEventChange(event) {

    // console.log('event', event);
    this.eventName = event.Name;
    this.isEditEvent = false;
    this.inputProductId = this.productId;
  }

  onModuleChange() {
    this.moduleId.valueChanges.subscribe((m: any) => {


      this.ruleEngineService.getSubModules(m.value, null, false).subscribe((s: any) => {
        // console.log("s", s);
        this.subModuleList = s;
        // this.subModuleList = s.filter(a => a.Status_id === 1001 && a.module_name_code != 'loanproduct');
      });
    });
  }

  onSubModuleChange() {
    this.subModuleId.valueChanges.subscribe((m: any) => {
      this.getSubModuleEventList(m);
      this.loadSave = false;
      // this.getBankList();
    }, error =>{
      this.loadSave= false;
      // console.log(error)
    });
  }
  onSubModuleChangeevent() {

  
    if (this.targets.length >= 1 && this.targets.controls[0].get('type').value != '') {
      //alert('are you sure you want to change submodule');

      const message = `Are you sure you want to update the sub-module? If you change the sub-module, existing flow will be removed.`;
      this.dialogService.confirm('Update SubModule ', message).subscribe(confirmed => {
        if (confirmed) {
          while (this.targets.length != 0) {
            this.targets.removeAt(0);


          }
          
        }  
        else {
          this.ruleEngineForm.get('subModuleId').setValue(this.submoduleidform);  
        }

      })
    }
    else {
      this.submoduleidform = this.ruleEngineForm.get('subModuleId').value;
    }
    // console.log('submoduleidform',this.submoduleidform)
  }
  onModuleChangeevent() {
    
    if (this.targets.length >= 1 && this.targets.controls[0].get('type').value != '') {
      //alert('are you sure you want to change submodule');

      const message = `Are you sure you want to update the module? If you change the module, existing flow will be removed.`;
      this.dialogService.confirm('Update Module', message).subscribe(confirmed => {
        if (confirmed) {
          while (this.targets.length != 0) {
            this.targets.removeAt(0);

            this.ruleEngineForm.get('subModuleId').setValue(null);
            this.submoduleidform = null;
          }
          

        }
        else {
          this.ruleEngineForm.get('moduleId').setValue(this.moduleidform);
          
        }

      })
      
    }
    else {
      this.ruleEngineForm.get('subModuleId').setValue(null);
      this.submoduleidform = null;
      this.moduleidform = this.ruleEngineForm.get('moduleId').value;
    }
    
  }

//onRuleTypeChange() {
//  this.ruleTypeId.valueChanges.subscribe((m: any) => {
//    if (m) {
//      if (m.code == 'global') {

//        this.isGlobalRuleType = true;

//        this.banks.setValue(null);
//        this.banks.clearValidators();
//        this.banks.updateValueAndValidity();

//        this.loanProducts.setValue(null);
//        this.loanProducts.clearValidators();
//        this.loanProducts.updateValueAndValidity();
//      } else if (m.code == 'financial') {

//        this.isGlobalRuleType = false;
//        this.loanProducts.setValue(null);
//        this.loanProducts.clearValidators();
//        this.loanProducts.updateValueAndValidity();

//        this.banks.setValidators([Validators.required]);
//        this.banks.updateValueAndValidity();

//      } else if (m.code == 'product') {
//        this.isGlobalRuleType = false;

//        this.banks.setValue(null);
//        this.banks.clearValidators();
//        this.banks.updateValueAndValidity();

//        this.loanProducts.setValidators([Validators.required]);
//        this.loanProducts.updateValueAndValidity();
//      }
//    }
//  });
//}

addTarget() {

  // console.log('targerts', this.targets.controls)
  this.targets.push(this.ruleEngineService.buildTarget());
  // console.log('targerts', this.targets.controls)
  this.isDropdown = true;
}

  deleteTarget(targetIndex: number, e: any) {
    const message = `Are you sure you want to delete this "${e.type}"?`;
    this.dialogService.confirm('Delete Step ', message).subscribe(confirmed => {
      if (confirmed) {
        this.targets.removeAt(targetIndex);
        this.toaster.success(`"${e.type}" has been deleted successfully`);
      }
    }); 
     
}

editEvent() {

  this.isEditEvent = !this.isEditEvent;
}

getLoanProductList(bankIds: string) {
  this.ruleEngineService.getLoanProducts(bankIds).subscribe((m: any) => {
    this.loanProductList = m;
  });
}

getSubModuleEventList(subModule) {
  // console.log('subModule');

  if (!this.editFromVersion) {
    if (subModule) {
      if (this.resetTarget()) {
        this.subModule = subModule;
        this.ruleEngineService.getSubModuleEventList(subModule.sub_module_id).subscribe((m: any[]) => {
          this.events.length = 1;
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

data: any;
//prepareconditionandDesciison(cond, type) {

//  this.data = null;
//  if (type == "condition") {
//    cond.map((c, cIndex) => {
//      this.data= {
//        DisplayOrder: cIndex,
//        conditionId: c.conditionId,
//        relationWithParent: c.relationWithParent,
//        openingBrackets: c.openingBrackets,
//        subModuleId: c.subModuleId.sub_module_id,
//        subModuleAlias: c.subModuleAlias,
//        fieldId: c.fieldId.form_field_id,
//        operatorId: c.operatorId.operator_id,
//        fieldValue: (c.fieldValue != null && typeof c.fieldValue.value !== 'undefined' ? c.fieldValue.value : (c.fieldValue != null && typeof c.fieldValue.length != 'undefined' && c.operatorId.operator_display_name.includes('multiple') && c.fieldId.dt_code == 'select') ? c.fieldValue.map(m => { return ((c.fieldId.actual_data_type.includes('varchar') || c.fieldId.actual_data_type.includes('table')) ? `'${m.value}'` : `${m.value}`); }).join() : c.fieldValue),
//        fieldSecondValue: c.fieldSecondValue,
//        closingBrackets: c.closingBrackets,
//        isTime: c.isTime,
//      }
//    });
//  }   
// //else if (type == "decision") {
// //   cond.map((c, cIndex) => {
// //     this.data = {
// //       DisplayOrder: cIndex,
// //       conditionId: c.conditionId,
// //       relationWithParent: c.relationWithParent,
// //       openingBrackets: c.openingBrackets,
// //       subModuleId: c.subModuleId.sub_module_id,
// //       subModuleAlias: c.subModuleAlias,
// //       fieldId: c.fieldId.form_field_id,
// //       operatorId: c.operatorId.operator_id,
// //       fieldValue: (c.fieldValue != null && typeof c.fieldValue.value !== 'undefined' ? c.fieldValue.value : (c.fieldValue != null && typeof c.fieldValue.length != 'undefined' && c.operatorId.operator_display_name.includes('multiple') && c.fieldId.dt_code == 'select') ? c.fieldValue.map(m => { return ((c.fieldId.actual_data_type.includes('varchar') || c.fieldId.actual_data_type.includes('table')) ? `'${m.value}'` : `${m.value}`); }).join() : c.fieldValue),
// //       fieldSecondValue: c.fieldSecondValue,
// //       closingBrackets: c.closingBrackets,
// //       isTime: c.isTime,
// //     }
// //   })
// // }
//  else {
//    this.data = null;
//  }
//  // console.log('data', this.data);
//  return this.data; 



//};
resultdata: any;
//prepareResult(cond, type) {
//  // console.log('cond', cond);
//  if (type == "Screen") {
//    return null;
//  } 

//  else {
//    cond.map((rr, rrIndex) => {
//      return {
//        DisplayOrder: rrIndex,
//        resultId: rr.resultId,
//        name: rr.name,
//        actionId: rr.actionId,
//        subModuleId: rr.subModuleId,
//        resultCondition: rr.resultCondition,
//        tableFields: rr.tableFields.map((f, fIndex) => {
//          return {
//            DisplayOrder: fIndex,
//            fieldId: (typeof f.fieldId === 'undefined' ? null : f.fieldId.form_field_id),
//            name: f.name,
//            dataType: f.dataType,
//            fieldValue: (f.fieldValue != null && typeof f.fieldValue.value !== 'undefined' ? f.fieldValue.value : (f.fieldValue == null ? f.fieldDisplayValue : f.fieldValue)),
//            fieldDisplayValue: f.fieldDisplayValue,
//            isCalculate: f.isCalculate,
//            resultCalculation: f.resultCalculation.map((rc, rcIndex) => {
//              return {
//                DisplayOrder: rcIndex,
//                closingBrackets: rc.closingBrackets,
//                formulaId: (rc.formulaId != null && typeof rc.formulaId.SqlFunctionId !== 'undefined' ? rc.formulaId.SqlFunctionId : null),
//                firstFieldId: (rc.firstFieldId == null ? null : rc.firstFieldId.form_field_id),
//                firstFieldValue: rc.firstFieldValue,
//                firstFieldSectionId: rc.firstFieldSectionId == null ? null : rc.firstFieldSectionId.sub_module_id,
//                secondFieldId: (rc.secondFieldId == null ? null : rc.secondFieldId.form_field_id),
//                secondFieldValue: rc.secondFieldValue,
//                secondFieldSectionId: rc.secondFieldSectionId == null ? null : rc.secondFieldSectionId.sub_module_id,
//                datePart: rc.datePart,
//                operatorId: (rc.operatorId != null && typeof rc.operatorId.operator_id !== 'undefined' ? rc.operatorId.operator_id : null),
//                openingBrackets: rc.openingBrackets,
//              }
//            })
//          }
//        })

//      }
//    });
//  }

//  //return this.resultdata;

//}

prepareTarget() {



  return this.targets.value.map((t, index) => {
    // console.log('targedtdatat', t)
    return {

      DisplayOrder: index,
      targetId: t.targetId,
      type: t.type,
      screenName: t.screenName,
      targetCondition: t.targetCondition,
      targetDecision: t.targetDecision,
      ScreenId: t.ScreenId,
      ScreenName: t.ScreenName,


      //  conditions: this.prepareconditionandDesciison(t.conditions,t.type),
      conditions: t.conditions.map((c, cIndex) => {
        //if (type == "condition")
        if (t.type === "condition" || ((t.targetCondition.database_condition != null && t.targetCondition.database_condition != '') && t.type === 'decision')) {


          return {
            DisplayOrder: cIndex,
            conditionId: c.conditionId,
            relationWithParent: c.relationWithParent,
            openingBrackets: c.openingBrackets,
            subModuleId: c.subModuleId.sub_module_id,
            subModuleAlias: c.subModuleAlias,
            fieldId: c.fieldId.form_field_id,
            operatorId: c.operatorId.operator_id,
            fieldValue: (c.fieldValue != null && typeof c.fieldValue.value !== 'undefined' ? c.fieldValue.value : (c.fieldValue != null && typeof c.fieldValue.length != 'undefined' && c.operatorId.operator_display_name.includes('multiple') && c.fieldId.dt_code == 'select') ? c.fieldValue.map(m => { return ((c.fieldId.actual_data_type.includes('varchar') || c.fieldId.actual_data_type.includes('table')) ? `'${m.value}'` : `${m.value}`); }).join() : c.fieldValue),
            fieldSecondValue: c.fieldSecondValue,
            closingBrackets: c.closingBrackets,
            isTime: c.isTime,
          }
        }
        else {
          return null;
        }
      }),


      decisions: t.decisions.map((c, cIndex) => {
        if (t.type === "decision") {


          return {
            DisplayOrder: cIndex,
            Decision: c.Decision,
            relationWithParent: c.relationWithParent,
            openingBrackets: c.openingBrackets,
            subModuleId: c.subModuleId.type == 'screen' ? c.fieldId.sub_module_id : c.subModuleId.sub_module_id,
            submoduletype: c.subModuleId.type,
            screensubmoduleid: c.subModuleId.sub_module_id,
            //subModuleId: c.subModuleId.sub_module_id == 'undefined' ? c.subModuleId : c.subModuleId.sub_module_id,  
            subModuleAlias: c.subModuleAlias,
            fieldId: c.fieldId.form_field_id,
            operatorId: c.operatorId.operator_id,
            fieldValue: (c.fieldValue != null && typeof c.fieldValue.value !== 'undefined' ? c.fieldValue.value : (c.fieldValue != null && typeof c.fieldValue.length != 'undefined' && c.operatorId.operator_display_name.includes('multiple') && c.fieldId.dt_code == 'select') ? c.fieldValue.map(m => { return ((c.fieldId.actual_data_type.includes('varchar') || c.fieldId.actual_data_type.includes('table')) ? `'${m.value}'` : `${m.value}`); }).join() : c.fieldValue),
            fieldSecondValue: c.fieldSecondValue,
            closingBrackets: c.closingBrackets,
            isTime: c.isTime,
          }
        }
        else {
          return null;
        }
      }),

      //results: this.prepareResult(t.results,t.type)
      results: t.results.map((rr, rrIndex) => {
        // console.log('rrrrrr', rr);

        if (t.type == "Screen") {
          return null;
        }
        else {
          return {
            DisplayOrder: rrIndex,
            resultId: rr.resultId,
            name: rr.name,
            actionId: rr.actionId,
            subModuleId: rr.subModuleId,
            resultCondition: rr.resultCondition,
            displayresultcondition: rr.displayresultcondition,
            databaseresultCondition: rr.databaseresultCondition,
            whereClauseFields: rr.whereClauseFields.map((cc, ccIndex) => {
              //if (type == "condition")
              if ((rr.databaseresultCondition != null && rr.databaseresultCondition != '' && cc.fieldId != null && cc.fieldId != '')) {


                return {
                  DisplayOrder: ccIndex,
                  conditionId: cc.conditionId,
                  relationWithParent: cc.relationWithParent,
                  openingBrackets: cc.openingBrackets,
                  subModuleId: cc.subModuleId,
                  subModuleAlias: cc.subModuleAlias,
                  fieldId: cc.fieldId.form_field_id,
                  operatorId: cc.operatorId.operator_id,
                  fieldValue: (cc.fieldValue != null && typeof cc.fieldValue.value !== 'undefined' ? cc.fieldValue.value : (cc.fieldValue != null && typeof cc.fieldValue.length != 'undefined' && cc.operatorId.operator_display_name.includes('multiple') && cc.fieldId.dt_code == 'select') ? cc.fieldValue.map(m => { return ((cc.fieldId.actual_data_type.includes('varchar') || cc.fieldId.actual_data_type.includes('table')) ? `'${m.value}'` : `${m.value}`); }).join() : cc.fieldValue),
                  fieldSecondValue: cc.fieldSecondValue,
                  closingBrackets: cc.closingBrackets,
                  isTime: cc.isTime,
                }
              }
              else {
                return null;
              }
            }),



            tableFields: rr.tableFields.map((f, fIndex) => {
              return {
                DisplayOrder: fIndex,
                fieldId: (typeof f.fieldId === 'undefined' ? null : f.fieldId.form_field_id),
                name: f.name,
                dataType: f.dataType,
                fieldValue: (f.fieldValue != null && typeof f.fieldValue.value !== 'undefined' ? f.fieldValue.value : (f.fieldValue == null ? f.fieldDisplayValue : f.fieldValue)),
                fieldDisplayValue: f.fieldDisplayValue,
                isCalculate: f.isCalculate,
                resultCalculation: f.resultCalculation.map((rc, rcIndex) => {
                  return {
                    DisplayOrder: rcIndex,
                    closingBrackets: rc.closingBrackets,
                    formulaId: (rc.formulaId != null && typeof rc.formulaId.SqlFunctionId !== 'undefined' ? rc.formulaId.SqlFunctionId : null),
                    firstFieldId: (rc.firstFieldId == null ? null : rc.firstFieldId.form_field_id),
                    firstFieldValue: rc.firstFieldValue,
                    firstFieldSectionId: rc.firstFieldSectionId == null ? null : rc.firstFieldSectionId.sub_module_id,
                    secondFieldId: (rc.secondFieldId == null ? null : rc.secondFieldId.form_field_id),
                    secondFieldValue: rc.secondFieldValue,
                    secondFieldSectionId: rc.secondFieldSectionId == null ? null : rc.secondFieldSectionId.sub_module_id,
                    datePart: rc.datePart,
                    operatorId: (rc.operatorId != null && typeof rc.operatorId.operator_id !== 'undefined' ? rc.operatorId.operator_id : null),
                    openingBrackets: rc.openingBrackets,
                  }
                })
              }
            })

          }
        }
      }),
    }
  });

  this.editFromVersion = false;
}
//effective: string
//effectiveto: string;
  save() {

    var ab = this.ruleEngineForm.get('targets');
    // console.log(this.ruleEngineForm);
    // console.log(ab);
    // console.log(this.ruleEngineForm.value);
    if (this.targets.length >0) {


      if (this.ruleEngineForm.valid) {
        this.loadSave = true;
        this.appmodel.FlowId = this.ruleEngineForm.value.FlowId;
        this.appmodel.FlowName = this.ruleEngineForm.value.name;
        // console.log(this.ruleEngineForm.value.loanProducts);
        // this.effective = this.ruleEngineForm.value.effectiveFrom;
        // this.effectiveto = this.ruleEngineForm.value.effectiveTo;
        let newTarget = this.prepareTarget();
        let newResultForm = {
          FlowId: this.ruleEngineForm.value.FlowId,
          name: this.ruleEngineForm.value.name,
          moduleId: this.ruleEngineForm.value.moduleId.value,
          subModuleId: this.ruleEngineForm.value.subModuleId.sub_module_id,
          banks: this.banks.value == null ? null : this.banks.value.map(m => { return m.value }),

          loanProducts: this.ruleEngineForm.value.loanProducts,
          // effectiveFrom: this.ruleEngineForm.value.effectiveFrom,

          //effectiveFrom: (this.effective == null) ? null : this.commonService.getUserSelectedZoneToUTC(this.effective),
          //effectiveTo: (this.effectiveto == null) ? null : this.commonService.getUserSelectedZoneToUTC(this.effectiveto),
          // effectiveTo: this.ruleEngineForm.value.effectiveTo,
          eventId: this.ruleEngineForm.value.eventId,
          isActive: this.ruleEngineForm.value.isActive,
          displayOrder: this.ruleEngineForm.value.displayOrder,
          targets: newTarget,
        };

        // console.log('rule form value: ', this.ruleEngineForm.value);
        // console.log('new rule form: ', newResultForm);
        //return;

        this.ruleEngineService.checkNameExist(this.appmodel).subscribe((result: any) => {
          if (result.statusCode == 201) {
            this.toaster.error(result.responseMessage);
            this.loadSave = false;
          }
          else {
            this.ruleEngineService.addUpdateRuleEngine(newResultForm).subscribe((result: any) => {
              if (result.statusCode == 200) {
                this.toaster.success(result.responseMessage);
                this.loadSave = false;
                this.router.navigateByUrl("/flow");

              } else {
                this.loadSave = false;
                this.toaster.error(result.responseMessage);
              }
            });
          }

        });
      }
    }
    else {
      this.toaster.error('Please add atleast one step in flow ')
    }
}

getBankList() {
  this.bankService.getBankDropdownList().subscribe((m: any) => {
    this.bankList = m;

  });
}
refreshLA(listFor: string = "VERSION") {
  //this.laPagedData = [];
  this.loading = true;
  if (listFor == 'NEWRULEONOLDAPP') {
    this.loanApplicationlistFiltertext = "";
  } else if (listFor == 'VERSION') {
    this.listFiltertext = "";
  }
  let pageSize = (listFor == "VERSION") ? this.laPageSizeValue : this.loanApplicationPageSizeValue;
  let filterText = (listFor == "VERSION") ? this.listFiltertext : this.loanApplicationlistFiltertext;
  this.ruleEngineService.getLoanApplicationListForApplyRule(filterText,
    this.laSortColumn,
    this.laSortDir,
    this.currentPage,
    pageSize,
    this.loginuserid, this.batchid, this.id, listFor).subscribe(response => {
      if (listFor == 'NEWRULEONOLDAPP') {
        this.loanApplicationPageData = response;
      } else if (listFor == 'VERSION') {
        this.laPagedData = response;
        setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 200);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });

}

searchLA(listFor: string = "VERSION") {
  this.loading = true;
  let pageSize = (listFor == "VERSION") ? this.laPageSizeValue : this.loanApplicationPageSizeValue;
  let filterText = (listFor == "VERSION") ? this.listFiltertext : this.loanApplicationlistFiltertext;
  this.ruleEngineService.getLoanApplicationListForApplyRule(filterText,
    ((listFor == "VERSION") ? this.laSortColumn : this.oldApplicationSortColumn),
    ((listFor == "VERSION") ? this.laSortDir : this.oldApplicationSortDir),
    this.currentPage,
    pageSize,
    this.loginuserid, this.batchid, this.id, listFor).subscribe(response => {
      if (listFor == 'NEWRULEONOLDAPP') {
        this.loanApplicationPageData = response;
      } else if (listFor == 'VERSION') {
        this.laPagedData = response;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
}

onChangeLA($event, listFor: string = "VERSION") {
  // console.log($event);
  this.loading = true;
  let filterText = (listFor == "VERSION") ? this.listFiltertext : this.loanApplicationlistFiltertext;
  this.ruleEngineService.getLoanApplicationListForApplyRule(filterText,
    ((listFor == "VERSION") ? this.laSortColumn : this.oldApplicationSortColumn),
    ((listFor == "VERSION") ? this.laSortDir : this.oldApplicationSortDir),
    this.currentPage,
    $event.text,
    this.loginuserid, this.batchid, this.id, listFor).subscribe(response => {
      if (listFor == 'NEWRULEONOLDAPP') {
        this.loanApplicationPageData = response;
      } else if (listFor == 'VERSION') {
        this.laPagedData = response;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
}
onSort($event, listFor: string = "VERSION") {
  const sort = $event.sorts[0];
  if (listFor == "VERSION") {
    this.laSortDir = sort.dir;
    this.laSortColumn = sort.prop;
  } else {
    this.oldApplicationSortDir = sort.dir;
    this.oldApplicationSortColumn = sort.prop;
  }
  this.loading = true;
  let pageSize = (listFor == "VERSION") ? this.laPageSizeValue : this.loanApplicationPageSizeValue;
  let filterText = (listFor == "VERSION") ? this.listFiltertext : this.loanApplicationlistFiltertext;
  this.ruleEngineService.getLoanApplicationListForApplyRule(filterText,
    ((listFor == "VERSION") ? this.laSortColumn : this.oldApplicationSortColumn),
    ((listFor == "VERSION") ? this.laSortDir : this.oldApplicationSortDir),
    $event.page,
    pageSize,
    this.loginuserid, this.batchid, this.id, listFor).subscribe(response => {
      if (listFor == 'NEWRULEONOLDAPP') {
        this.loanApplicationPageData = response;
      } else if (listFor == 'VERSION') {
        this.laPagedData = response;
      }
      // console.log('setPageLA: ', response);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
}
setPageLA($event, listFor: string = "VERSION") {
  this.loading = true;
  let pageSize = (listFor == "VERSION") ? this.laPageSizeValue : this.loanApplicationPageSizeValue;
  let filterText = (listFor == "VERSION") ? this.listFiltertext : this.loanApplicationlistFiltertext;
  this.ruleEngineService.getLoanApplicationListForApplyRule(filterText,
    ((listFor == "VERSION") ? this.laSortColumn : this.oldApplicationSortColumn),
    ((listFor == "VERSION") ? this.laSortDir : this.oldApplicationSortDir),
    $event.page,
    pageSize,
    this.loginuserid, this.batchid, this.id, listFor).subscribe(response => {
      if (listFor == 'NEWRULEONOLDAPP') {
        this.loanApplicationPageData = response;
      } else if (listFor == 'VERSION') {
        this.laPagedData = response;
      }
      // console.log('setPageLA: ', response);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
}

onActivate(event) {
}
getPageSizes() {
  this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
    this.lstPageSize = this.commonService.masters;
  })
}
onSelect({ selected }) {
  this.selectedApplication.splice(0, this.selectedApplication.length);
  this.selectedApplication.push(...selected);
}
onSelectOldApplication({ selected }) {
  this.selectedOldApplication.splice(0, this.selectedOldApplication.length);
  this.selectedOldApplication.push(...selected);
}
makeSubmitButtonDisabled() {
  const index = this.ruleEngineVersionList.findIndex((element, index) => {
    if (element.FlowId == this.id) {
      return true;
    }
  });

  if (this.targets.length < 1) {
    return false
  }
  if (index > 0) {
    this.isSubmitButtonDisabled = true;
  } else {
    this.isSubmitButtonDisabled = false;
  }
}
ApplySelectedVersion() {
  if (this.selectedApplication.length > 0 && this.selectedVersionForChange > 0) {
    if (confirm("Are you sure you want update rule version of selected application?")) {
      let selectedIds = this.selectedApplication.map(m => { return m.Id }).join(',');
      // console.log(selectedIds);
      this.ruleEngineService.ApplyRuleVersion(this.selectedVersionForChange, selectedIds).subscribe(m => {
        if (m) {
          this.refreshLA();
          this.selectedVersionForChange = null;
          this.toaster.success('Version is successfully updated.');
        } else {
          this.toaster.error('Something went wrong. Please try again.');
        }
      });
    }
  } else {
    this.toaster.warning('Application(s) and version is required.');
  }
}
OpenLatestRuleOnOldApp() {
  var $this = this;
  this.loanApplicationlistFiltertext = "";
  //setTimeout(function () {
  $this.ruleEngineService.getLoanApplicationListForApplyRule(this.loanApplicationlistFiltertext,
    $this.oldApplicationSortColumn,
    $this.oldApplicationSortDir,
    $this.currentPage,
    $this.loanApplicationPageSizeValue,
    $this.loginuserid, $this.batchid, $this.id, 'NEWRULEONOLDAPP').subscribe(response => {
      $this.loanApplicationPageData = response;
      $this.loading = false;
    }, error => {
      $this.loading = false;
    })
  $this.applyLatestRuleOnOldApp.show();
  //}, 100);
}
ApplyRuleOnOldApplication() {
  if (this.selectedOldApplication.length > 0) {
    if (confirm("Are you sure you want to apply this rule to selected application(s)?")) {
      let selectedIds = this.selectedOldApplication.map(m => { return m.Id }).join(',');
      // console.log(selectedIds);
      this.ruleEngineService.ApplyRuleVersion(this.id, selectedIds).subscribe(m => {
        if (m) {
          this.selectedVersionForChange = null;
          this.toaster.success('Rule is successfully Applied.');
          this.closeOldApplicationPopup();
        } else {
          this.toaster.error('Something went wrong. Please try again.');
        }
      });
    }
  } else {
    this.toaster.warning('Application(s) is required.');
  }
}
closeOldApplicationPopup() {
  this.refreshLA("VERSION");
  this.applyLatestRuleOnOldApp.hide();
}
//targettypeddl(event) {
//  // console.log(event.target.value);
//  if (event.target.value === 'Decision') {

//    this.isCondition = true;
//    this.conditionalmodel.showConditionModal();
//    //  this.addConditionModel.show();
//  }
//  else if (event.target.value === 'Result') {
//    this.isResult = true;
//    this.resultmodel.showResultModal();
//    //this.showResultModal.
//   // this.isResult = true;
//   // this.resultcomponent.showResultModal();
//  }
//}
showConditionModal() {
  this.isDropdown = true;
}
//AddScreen(a: any) {
//  if (a = 1) {
//    this.screencomponent.AddScreen();
//  }
//  if (this.showAddTarget()) {
//    this.addTarget();
//    this.screencomponent.AddScreen();
//  }

//}
//AddDecision(a: any) {
//  if (a = 1) {
//    this.decisioncomponent.AddDecision();
//  }
//  if (this.showAddTarget()) {
//    this.addTarget();
//    this.decisioncomponent.AddDecision();;
//  }

//}
//AddCondition(a: any) {
//  if (a = 1) {
//    this.conditioncomponent.AddCondition();
//  }
//  if (this.showAddTarget()) {
//    this.addTarget();
//    this.conditioncomponent.AddCondition();
//  }

//}
  resultValidation(e) {
    ;
  this.deleteTarget(e.rowno,e);
 
  }


  //this.ruleEngineForm.get('targets');




  //control.get('results').updateValueAndValidity();  



}

