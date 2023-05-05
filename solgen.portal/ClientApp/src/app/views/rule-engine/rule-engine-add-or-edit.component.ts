import { Component, OnInit, ViewChild } from '@angular/core';
import { RuleEngineService, CheckRuleName } from './rule-engine.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ModulesService } from '../managemodules/modules.service';
import { CommonService } from '../shared/common.service';
import { BankService } from '../bank/bank.service';
import { id, SelectionType } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RuleEngine } from './rule-engine';

@Component({
  selector: 'app-rule-engine-add-or-edit',
  templateUrl: './rule-engine-add-or-edit.component.html',
  styles: [`
      .list-group-item:first-child{
        border-radius:0px;
      }
      .list-group-item:last-child{
        border-radius:0px;
      }
`]
})
export class RuleEngineAddOrEditComponent implements OnInit {
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
  @ViewChild('ApplicationPopupForApplyLatestRule', { static: false }) applyLatestRuleOnOldApp: ModalDirective;
  loanApplicationPageData: any = {
    pager: {},
    data: []
  };
  constructor(private ruleEngineService: RuleEngineService,
    private fb: FormBuilder, private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private bankService: BankService) { }

  ngOnInit() {
    this.initForm();

    this.onEffectiveDateChange();
    this.getRuleTypeList();
    this.onRuleTypeChange();
    this.getModuleList();
    this.getLoanProductList('all');
    this.onModuleChange();
    this.onSubModuleChange();
    this.getBankList();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.fillRuleEngineForm(this.id);
        //this.refreshLA();
        this.getPageSizes();
      }
      else {
        this.ruleEngineService.getDisplayOrder().subscribe((m) => {
          this.displayOrder.setValue(m);
        });

        this.pageTitle = 'Add Rule Engine';
      }
    });
  }

  fillRuleEngineForm(id) {
    this.loadSave = true;
    this.pageTitle = 'Edit Rule Engine';
    this.ruleEngineService.GetRuleEngineDetail(id).subscribe((result: any) => {
       console.log(result);
      this.ruleEnginedata = result;
      let rule = this.ruleEnginedata;
      this.editPrepare(rule);
      this.getRuleEngineVersionList(id);
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
      ruleTypeId: ruleEngine.RuleTypeId,
      banks: ruleEngine.Banks,
      bank: ruleEngine.Bank,
      loanProducts: (typeof ruleEngine.Products !== 'undefined' ? ruleEngine.Products.map(m => m.ProductId) : null),
      effectiveFrom: new Date(ruleEngine.EffectiveFrom),
      effectiveTo: new Date(ruleEngine.EffectiveTo),
      eventId: ruleEngine.SubModuleEventId,
      ruleVersion: ruleEngine.RuleVersion,
      isActive: ruleEngine.IsActive,
      displayOrder: ruleEngine.displayOrder
    });

    console.log(this.ruleEngineForm);
    while (this.targets.length != 0) {
      this.targets.removeAt(0);
    }

    ruleEngine.targets.forEach((m: any) => {

      this.targets.push(this.ruleEngineService.buildTarget(m));

    });

    this.loadSave = false;
  }

  editRuleVersion(ruleId: number) {
    this.editFromVersion = true;
    this.router.navigateByUrl(`/rule-engine/edit/${ruleId}`);
    //this.refreshLA(ruleId)
  }

  initForm() {
    this.ruleEngineForm = this.fb.group({
      ruleId: [""],
      name: ["", Validators.required],
      moduleId: [null, Validators.required],
      subModuleId: [null, Validators.required],
      ruleTypeId: [null, Validators.required],
      bank: [null,Validators.required],
      banks: [null],
      loanProducts: [null],
      effectiveFrom: [null, Validators.required],
      effectiveTo: [null, Validators.required],
      eventId: [0, Validators.required],
      isActive: [false],
      ruleVersion: [0],
      displayOrder: [0],
      targets: this.fb.array([this.ruleEngineService.buildTarget()])
    });
  }

  getRuleEngineVersionList(ruleId) {
    this.ruleEngineService.getRuleEngineVersionList(ruleId).subscribe((m: any) => {
      this.ruleEngineVersionList = m;
      this.ruleEngineVersionListForChange = m.filter(function (item) { return item.RuleId != ruleId });
      this.makeSubmitButtonDisabled();
    });
  }

  getRuleTypeList() {
    this.ruleEngineService.GetRuleTypeList().subscribe((m: any) => {
      this.ruleTypeList = m;
    });
  }

  getModuleList() {
    this.commonService.getMasterItemsList('custom_modules_layout').subscribe((result: any) => {
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
  get ruleTypeId() {
    return this.ruleEngineForm.get('ruleTypeId');
  }
  get banks() {
    return this.ruleEngineForm.get('banks');
  }
  get loanProducts() {
    return this.ruleEngineForm.get('loanProducts');
  }
  get effectiveFrom() {
    return this.ruleEngineForm.get('effectiveFrom');
  }
  get effectiveTo() {
    return this.ruleEngineForm.get('effectiveTo');
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

  onEffectiveDateChange() {
    this.effectiveFrom.valueChanges.subscribe(m => {
      if (this.effectiveTo.value < m) {
        this.effectiveTo.setValue(null);
      }

    });
  }

  onEventChange(event) {

    this.eventName = event.Name;
    this.isEditEvent = false;
    this.inputProductId = this.productId;
  }

  onModuleChange() {
    this.moduleId.valueChanges.subscribe((m: any) => {
      this.ruleEngineService.getSubModules(m.value).subscribe((s: any) => {

        this.subModuleList = s.filter(a => a.Status_id === 1001 && a.module_name_code != 'loanproduct');
      });
    });
  }

  onSubModuleChange() {
    this.subModuleId.valueChanges.subscribe((m: any) => {
      this.getSubModuleEventList(m);
      this.getBankList();
    });
  }

  onRuleTypeChange() {
    this.ruleTypeId.valueChanges.subscribe((m: any) => {
      if (m) {
        if (m.code == 'global') {

          this.isGlobalRuleType = true;

          this.banks.setValue(null);
          this.banks.clearValidators();
          this.banks.updateValueAndValidity();

          this.loanProducts.setValue(null);
          this.loanProducts.clearValidators();
          this.loanProducts.updateValueAndValidity();
        } else if (m.code == 'financial') {

          this.isGlobalRuleType = false;
          this.loanProducts.setValue(null);
          this.loanProducts.clearValidators();
          this.loanProducts.updateValueAndValidity();

          this.banks.setValidators([Validators.required]);
          this.banks.updateValueAndValidity();

        } else if (m.code == 'product') {
          this.isGlobalRuleType = false;

          this.banks.setValue(null);
          this.banks.clearValidators();
          this.banks.updateValueAndValidity();

          this.loanProducts.setValidators([Validators.required]);
          this.loanProducts.updateValueAndValidity();
        }
      }
    });
  }

  addTarget() {
    this.targets.push(this.ruleEngineService.buildTarget());
  }

  deleteTarget(targetIndex: number) {
    if (confirm("Are you sure you want to remove this target?")) {
      this.targets.removeAt(targetIndex);
    }
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
    // console.log('getSubModuleEventList');
    if (!this.editFromVersion) {
      if (subModule) {
        if (this.resetTarget()) {
          this.subModule = subModule;
          this.ruleEngineService.getSubModuleEventList(subModule.sub_module_id).subscribe((m: any[]) => {
            this.events = m;
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

  prepareTarget() {
    return this.targets.value.map((t, index) => {
      return {
        DisplayOrder: index,
        targetId: t.targetId,
        targetCondition: t.targetCondition,
        conditions: t.conditions.map((c, cIndex) => {
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
        }),
      }
    });

    this.editFromVersion = false;
  }

  save() {

    // console.log(this.ruleEngineForm);
    // console.log(this.ruleEngineForm.value);
    // return;

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
        bank : this.ruleEngineForm.value.bank,
        banks: this.banks.value == null ? null : this.banks.value.map(m => { return m.value }),
        ruleTypeId: this.ruleEngineForm.value.ruleTypeId.id,
        loanProducts: this.ruleEngineForm.value.loanProducts,
        effectiveFrom: this.ruleEngineForm.value.effectiveFrom,
        effectiveTo: this.ruleEngineForm.value.effectiveTo,
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
              this.router.navigateByUrl("/rule-engine");

            } else {
              this.loadSave = false;
              this.toaster.error(result.responseMessage);
            }
          });
        }

      });
    }
  }

  getBankList() {
    this.bankService.getBankDropdownList().subscribe((m: any) => {
      this.bankList = m;
      console.log(this.bankList);
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
