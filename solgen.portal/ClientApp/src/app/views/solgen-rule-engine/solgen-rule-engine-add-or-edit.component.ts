import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { object } from 'underscore';
import { BankService } from '../bank/bank.service';
import { CommonService } from '../shared/common.service';
import { CheckRuleName, SolgenRuleCondition, SolgenRuleEngine, SolgenRuleEngineService, SolgenRuleResult, SolgenRuleTarget } from './solgen-rule-engine.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
@Component({
  selector: 'app-solgen-rule-engine-add-or-edit',
  templateUrl: './solgen-rule-engine-add-or-edit.component.html',
  styles: [`
  .list-group-item:first-child{
    border-radius:0px;
  }
  .list-group-item:last-child{
    border-radius:0px;
  }
`]
})
export class SolgenRuleEngineAddOrEditComponent implements OnInit {

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
  appmodel: CheckRuleName = new CheckRuleName();
  bankList: any = [];
  lstPageSize: any;
  isSubmitButtonDisabled = false;
  selectedVersionForChange: any = null;
  RuleNameToShow: string = "";
  vwRuleId: any;
  @ViewChild('ApplicationPopupForApplyLatestRule', { static: false }) applyLatestRuleOnOldApp: ModalDirective;
  customFieldsList: any;
  loanApplicationPageData: any = {
    pager: {},
    data: []
  };

  constructor(private ruleEngineService: SolgenRuleEngineService,
    private fb: FormBuilder, private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private dialogService: ConfirmationDialogService,
    private bankService: BankService) { }

  ngOnInit() {
    this.loadSave = true;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.vwRuleId = params.get('vwRuleId');
      if (this.id) {
        this.fillRuleEngineForm(this.id);
        this.getPageSizes();
        this.pageTitle = 'Edit Rule Engine';
      }
      else if (this.vwRuleId) {
        this.ruleEngineForm.controls['name'].disable();
        this.ruleEngineForm.controls['moduleId'].disable();
        this.ruleEngineForm.controls['subModuleId'].disable();
        this.ruleEngineForm.controls['isActive'].disable();
        this.ruleEngineForm.controls['displayOrder'].disable();
        this.fillRuleEngineForm(this.vwRuleId);
        this.getPageSizes();
        this.pageTitle = 'Rule Detail';
      }
      else {
        this.ruleEngineService.getDisplayOrder().subscribe((m) => {
          this.displayOrder.setValue(m);
          this.pageTitle = 'Add Rule Engine';
        });


      }
    });

    this.initForm();
    this.getModuleList();
    this.onModuleChange();
    this.onSubModuleChange();

  
  }

  fillRuleEngineForm(id) {
    this.loadSave = true;

    this.ruleEngineService.GetRuleEngineDetail(id).subscribe((result: any) => {
      // console.log(result);
      this.ruleEnginedata = result;
      let rule = this.ruleEnginedata;
      this.editPrepare(rule);
    });
  }

  editPrepare(ruleEngine: any) {
    this.isEditEvent = false;
    this.eventName = ruleEngine.EventName;
    this.productName = ruleEngine.ProductName
    this.RuleNameToShow = ruleEngine.RuleName;
    this.ruleEngineForm.patchValue({
      ruleId: ruleEngine.RuleId,
      name: ruleEngine.RuleName,
      moduleId: ruleEngine.ModuleId,
      subModuleId: ruleEngine.SubModuleId,
      eventId: ruleEngine.SubModuleEventId,
      ruleVersion: ruleEngine.RuleVersion,
      isActive: ruleEngine.IsActive,
      displayOrder: ruleEngine.displayOrder
    });

    while (this.targets.length != 0) {
      this.targets.removeAt(0);
    }
    if (ruleEngine.targets) {
      ruleEngine.targets.forEach((m: any) => {

        this.targets.push(this.ruleEngineService.buildTarget(m));

      });


    }
    this.loadSave = false;

  }

  initForm() {
    this.ruleEngineForm = this.fb.group({
      ruleId: [""],
      name: ["", Validators.required],
      moduleId: [null, Validators.required],
      subModuleId: [null, Validators.required],
      eventId: [0, Validators.required],
      isActive: [false],
      ruleVersion: [0],
      displayOrder: [0],
      targets: this.fb.array([this.ruleEngineService.buildTarget()])
    });
    setTimeout(() => {
      this.loadSave = false;
    }, 1000);
  }

  getModuleList() {
    this.commonService.getSolgenModulesItemsList('custom_modules_layout').subscribe((result: any) => {
      this.moduleList = this.commonService.masters;
    });

  }

  get ruleId() {
    return this.ruleEngineForm.get('ruleId');
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

  onEventChange(event) {

    this.eventName = event.Name;
    this.isEditEvent = false;
    this.inputProductId = this.productId;
  }

  onModuleChange() {
    this.moduleId.valueChanges.subscribe((m: any) => {
      this.ruleEngineService.getSubModules(m.value).subscribe((s: any) => {
        this.subModuleList = s;//.filter(a => a.Status_id === 1001 );
      });
    });
  }

  onSubModuleChange() {
    this.subModuleId.valueChanges.subscribe((m: any) => {
      this.getSubModuleEventList(m);
      this.getSubModuleList();
    });
  }
  getSubModuleList() {
    let module = this.ruleEngineForm.get('moduleId').value;
    let subModule = this.ruleEngineForm.get('subModuleId').value;
    if (module && subModule) {
      return this.ruleEngineService.GetCustomFieldsListBySubModuleId(module.value, subModule.sub_module_id).subscribe((m: any) => {
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
    this.targets.push(this.ruleEngineService.buildTarget());
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
    // console.log('getSubModuleEventList');
    if (!this.editFromVersion) {
      if (subModule) {
        if (this.resetTarget()) {
          this.subModule = subModule;
          this.ruleEngineService.getSubModuleEventList(subModule.sub_module_id).subscribe((m: any[]) => {
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
                ruleTargetResultConditionCalculationID: rc.ruleTargetResultConditionCalculationID,
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
                RuleTargetResultConditionId: f.RuleTargetResultConditionId,
                RuleTargetId: f.RuleTargetId,
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
                  ruleId : f.customFormula.ruleId,
                  ruleTargetResultConditionId : f.customFormula.ruleTargetResultConditionId,
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
                    ruleTargetResultConditionCalculationID: rc.ruleTargetResultConditionCalculationID,
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

    if (this.ruleEngineForm.valid) {
      this.loadSave = true;
      this.appmodel.RuleId = this.ruleEngineForm.value.ruleId;
      this.appmodel.RuleName = this.ruleEngineForm.value.name;
      // console.log(this.ruleEngineForm.value.loanProducts);
      let newTarget = this.prepareTarget();
      let newResultForm = {
        ruleId: this.ruleEngineForm.value.ruleId,
        name: this.ruleEngineForm.value.name,
        moduleId: this.ruleEngineForm.value.moduleId.value,
        subModuleId: this.ruleEngineForm.value.subModuleId.sub_module_id,
        eventId: this.ruleEngineForm.value.eventId,
        isActive: this.ruleEngineForm.value.isActive,
        displayOrder: this.ruleEngineForm.value.displayOrder,
        targets: newTarget,
      };
      // console.log('rule form value: ', this.ruleEngineForm.value);
      // console.log('new rule form: ', newResultForm);
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
              this.router.navigateByUrl("/solgen-rule-engine");

            } else {
              this.loadSave = false;
              this.toaster.error(result.responseMessage);
            }
          });
        }

      });
    }
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
    setTimeout(() => {
      this.loadSave = false;
    }, 2000);
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
      if (element.RuleId == this.id) {
        return true;
      }
    });
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
}
