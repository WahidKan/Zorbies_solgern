(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-solgen-rule-engine-solgen-rule-engine-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.html ***!
  \*******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"modal fade\" bsModal #conditionCalculationModal=\"bs-modal\" id=\"condition\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Calculated Value</h5>\n        <button type=\"button\" class=\"close\" (click)=\"hide()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\" [formGroup]=\"resultConditionForm\">\n        <div class=\"col-md-12 px-0\">\n          <div class=\"panel-content pagination2 table-responsive no-padding\">\n            <table class=\"table table-hover table-dynamic\" *ngIf=\"!isDate; else forDate\" style=\"min-width: 300px;\">\n              <thead>\n                <tr>\n                  <th width=\"50\">Formula </th>\n                  <th width=\"50\"></th>\n                  <th width=\"180\">Section</th>\n                  <th width=\"150\">Value</th>\n                  <th width=\"50\"></th>\n                  <th width=\"30\">Operator</th>\n                  <th width=\"30\"></th>\n                </tr>\n              </thead>\n              <tbody formArrayName=\"resultCalculation\">\n                <tr *ngFor=\"let resultCalculate of resultCalculation.controls;let i = index\" [formGroupName]=\"i\">\n                  <td>\n                    <ng-select [items]=\"sqlFunctionList\" [ngStyle]=\"{'width':50}\" formControlName=\"formulaId\"\n                               placeholder=\"Select...\" bindLabel=\"DisplayName\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n                    </ng-select>\n                  </td>\n                  <td>\n                    <input class=\"form-control px-0 text-center\" formControlName=\"openingBrackets\" type=\"text\" name=\"name\" value=\"(\" />\n                  </td>\n                  <td>\n                    <ng-select [items]=\"customFieldsList\" formControlName=\"firstFieldId\" [ngStyle]=\"{'width':150}\"\n                               placeholder=\"Select...\" bindLabel=\"name\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n\n                    </ng-select>\n                  </td>\n                  <td>\n                    <input class=\"form-control px-0 text-center\" formControlName=\"closingBrackets\" name=\"name\" value=\")\" />\n                  </td>\n                  <td>\n                    <ng-select [items]=\"operators\" formControlName=\"operatorId\" [ngStyle]=\"{'width':50}\"\n                               placeholder=\"Select...\" bindLabel=\"operator_expression\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n                    </ng-select>\n                  </td>\n                  <td>\n                    <a href=\"javascript:void(0);\" class=\"btn btn-danger\" *ngIf=\"i!=0\" (click)=\"deleteField(i)\"><i class=\"fa fa-trash\"></i></a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <ng-template #forDate>\n              <table class=\"table table-hover table-dynamic\" style=\"min-width: 300px;\">\n                <thead>\n                  <tr>\n                    <th width=\"50\">Formula </th>\n                    <th width=\"140\">Value Type</th>\n                    <th width=\"70\">Value</th>\n                    <th width=\"180\">Section</th>\n\n                    <th width=\"150\">On Date</th>\n                  </tr>\n                </thead>\n                <tbody formArrayName=\"resultCalculation\">\n                  <tr *ngFor=\"let resultCalculate of resultCalculation.controls;let i = index\" [formGroupName]=\"i\">\n                    <td>\n                      <ng-select [items]=\"sqlFunctionList\" [ngStyle]=\"{'width':50}\" formControlName=\"formulaId\"\n                                 placeholder=\"Select...\" bindLabel=\"DisplayName\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n                      </ng-select>\n                    </td>\n                    <td>\n                      <ng-select [items]=\"dateParts\" formControlName=\"datePart\" [ngStyle]=\"{'width':50}\"\n                                 [closeOnSelect]=\"true\" [clearable]=\"false\">\n                      </ng-select>\n                    </td>\n                    <td>\n                      <input class=\"form-control\" pKeyFilter=\"pnum\" formControlName=\"firstFieldValue\" name=\"name\" />\n                    </td>\n                    <td>\n                      <ng-select [items]=\"sectionList\" formControlName=\"secondFieldSectionId\" [ngStyle]=\"{'width':150}\"\n                                 placeholder=\"Default\" bindLabel=\"sub_module_name\" (change)=\"onSecondSectionChange($event,resultCalculate)\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n                      </ng-select>\n                    </td>\n                    <td>\n                      <ng-select *ngIf=\"resultCalculate.get('secondFieldSectionId').value\" [items]=\"resultCalculate.get('secondFields')?.value\" formControlName=\"secondFieldId\" [ngStyle]=\"{'width':150}\"\n                                 placeholder=\"Select...\" bindLabel=\"name\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n\n                      </ng-select>\n                      <input class=\"form-control\" *ngIf=\"!resultCalculate.get('secondFieldSectionId').value\" pKeyFilter=\"pnum\" readonly value=\"Today\"/>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </ng-template>\n            <div class=\"p-3 text-center\" *ngIf=\"!isDate\">\n              <a href=\"javascript:void(0);\" class=\"btn btn-primary\" (click)=\"addField()\"><i class=\"fa fa-plus\"></i> Add</a>\n            </div>\n          </div>\n          <div class=\"step-default p-3 border mt-2 rounded\"><b>Value:</b> {{displayValue}} </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <a href=\"javascript:void(0);\" class=\"btn btn-success\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\n        <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"hide()\"><i class=\"fa fa-close\"></i> Cancel</a>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-condition.component.html":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-condition.component.html ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<li class=\"arrowright top30\" [formGroup]=\"targetForm\">\n  <p class=\"shape_btn\" *ngIf=\"!targetForm.get('isConditionAdded')?.value\"><a class=\"addtarget_btn\" (click)=\"showConditionModal()\">Add Target</a></p>\n  <div class=\"formsfieldmainunique_condition\" *ngIf=\"targetForm.get('isConditionAdded').value\">\n    <div class=\"innercontbase\">\n      <div class=\"innercont\">{{targetForm.value.targetCondition.displayCondition }}</div>\n      <div class=\"inneredit\">\n        <a data-placement=\"left\" href=\"javascript:void(0);\" title=\"\" (click)=\"editCondition()\">\n          <div class=\"d-inline-block iconedit_unique\"></div>\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <!-- Modal -->\n  <div class=\"modal fade \" bsModal #addConditionModal=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Rule</h5>\n          <button type=\"button\" class=\"close\" (click)=\"hideConditionModal()\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"px-1\" [ngClass]=\"{'col-md-12':hideFieldList,'col-md-9':!hideFieldList}\">\n              <div class=\"border\">\n                <div class=\"list-group\" style=\"min-height: 210px;\" formArrayName=\"conditions\" [ngStyle]=\"vwRuleId != null ? {'pointer-events': 'none'} : {}\">\n                  <ul class=\"form-header\">\n                    <li> </li>\n                    <li class=\"pl-2\"> Field</li>\n                    <li class=\"pl-2\"> Conditional Operator</li>\n                    <li class=\"pl-2\"> </li>\n                    <li class=\"pl-2\"> Value</li>\n                    <li> </li>\n                    <li> </li>\n                  </ul>\n                  <div *ngFor=\"let condition of conditions.controls;let i=index\" [formGroupName]=\"i\">\n                    <ul class=\"from-rules text-center\" *ngIf=\"condition.get('relationWithParent').value\">\n                      <li class=\"text-center\"><span class=\"or-and rounded-circle\"><b>{{condition.get('relationWithParent').value}}</b></span></li>\n                    </ul>\n                    <ul class=\"from-rules\">\n                      <li class=\"form-group align-middle px-2\">\n                        <input formControlName=\"openingBrackets\" style=\"width: auto;min-width: 20px;max-width: 20px;\" class=\"form-control txtOpeningBrackets px-1\">\n                      </li>\n                      <!-- <li class=\"form-group align-middle px-2\">\n                        <ng-select [items]=\"subModuleList\" formControlName=\"subModuleId\"\n                                   placeholder=\"Select Module\" bindLabel=\"sub_module_name\" (change)=\"onSubModuleChange($event,condition)\"\n                                   [closeOnSelect]=\"true\">\n                        </ng-select>\n                      </li> -->\n                      <li class=\"form-group align-middle px-2\">\n                        <ng-select [items]=\"customFieldsList\" formControlName=\"fieldId\"\n                                   placeholder=\"Select Field\" bindLabel=\"name\" (change)=\"onFieldChange($event,condition,i)\"\n                                   [closeOnSelect]=\"true\" [clearable]=\"false\">\n\n                        </ng-select>\n                      </li>\n                      <li class=\"form-group align-middle px-2\">\n                        <ng-select [items]=\"condition.get('operators').value\" formControlName=\"operatorId\" (change)=\"onOperatorChange($event,condition,i)\"\n                                   placeholder=\"Select Operator\" bindLabel=\"operator_display_name\"\n                                   [closeOnSelect]=\"true\" [clearable]=\"false\">\n                        </ng-select>\n                      </li>\n                      <li class=\"form-group align-middle px-2\">\n                        <ng-select [items]=\"condition.get('conditions').value\" formControlName=\"conditionsId\"\n                                   placeholder=\"Select Condition\" bindLabel=\"name\"\n                                   [closeOnSelect]=\"true\" [clearable]=\"false\">\n                        </ng-select>\n                        <button class=\"btn btn-primary ml-2\" *ngIf=\"condition.get('conditionsId').value !== null ? condition.get('conditionsId').value.value === '3' : ''\" (click)=\"CalculationModal(condition)\"><span class=\"fa fa-pencil\">Edit</span></button>\n                      </li>\n                      <li class=\"form-group align-middle px-2\">\n                        <solgen-rule-input [formGroup]=\"condition\" [operator]=\"condition.get('operatorId').value\" [from]=\"condition\"\n                        [controlName]=\"'fieldValue'\" [id]=\"i\" [operatorType]=\"condition.get('conditionsId').value\" [updateOnOperatorType]=\"true\" [customFiledList]=\"customFieldsList\"></solgen-rule-input>\n                        <!-- <solgen-rule-input [formGroup]=\"condition\" [operator]=\"condition.get('operatorId').value\"\n                        [openedFrom]=\"condition.get('conditions').value\" *ngIf=\"condition.get('operatorId').value && condition.get('operatorId').value.operator_expression =='between'\"\n                        [from]=\"condition\" [controlName]=\"'fieldSecondValue'\" [id]=\"i\"></solgen-rule-input> -->\n                      </li>\n                      <li class=\"form-group align-middle px-2\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"closingBrackets\" style=\"width:30px;\">\n                      </li>\n                      <li class=\"text-center\">\n                        <a *ngIf=\"i>0\" href=\"javascript:void(0);\" [ngClass]=\"{'invisible':(vwRuleId != null)}\" (click)=\"removeCondition(i)\" class=\"text-red font-16\">\n                          <i class=\"fa fa-trash\"></i>\n                        </a>\n                      </li>\n\n                    </ul>\n\n                  </div>\n                </div>\n                <div class=\"p-3 text-center\">\n                  <div class=\"cstm-drop-btn text-center\">\n                    <select #addNewCondition class=\"btn ddlupdatestatus btn-success\" [ngClass]=\"{'invisible':(vwRuleId != null)}\" [disabled]=\"!conditions.valid\" (change)=\"addCondition($event)\">\n                      <option selected=\"selected\"> Add</option>\n                      <option>Or</option>\n                      <option>And</option>\n                    </select>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"step-default p-3 border mt-2 rounded\"><b>Condition:</b>{{targetForm.value.targetCondition.displayCondition}} <!--(Loan Application Equal To Sales Tax)--> </div>\n\n\n            </div>\n            <div [ngClass]=\"{'d-none':hideFieldList,'col-md-3':!hideFieldList}\">\n              <div class=\"border\" style=\"max-height: 400px; overflow-y: auto; overflow-x: hidden;\">\n                <table class=\"table table-hover table-dynamic table-cont\">\n                  <thead class=\"bg-light\">\n                    <tr>\n                      <th>Field Name</th>\n                      <th style=\"min-width:100px;\">Data Type</th>\n\n                    </tr>\n                  </thead>\n                  <tbody *ngIf=\"customFieldsList!=null\">\n                    <tr *ngFor=\"let item of customFieldsList\">\n                      <td>{{item.name}}</td>\n                      <td>{{item.sql_type}}</td>\n                    </tr>\n                  </tbody>\n                  <tbody *ngIf=\"customFieldsList==null\">\n                    <tr style=\"margin-left:10px; display:table;\">\n                      No data found.\n                    </tr>\n                  </tbody>\n\n                </table>\n              </div>\n\n            </div>\n          </div>\n\n<app-solgen-rule-condition-calculation #resultCalculationModal></app-solgen-rule-condition-calculation>\n        </div>\n\n\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn\" [ngClass]=\"{'btn-outline-info':hideFieldList,'btn-info':!hideFieldList,'invisible':vwRuleId != null}\" (click)=\"showFieldList()\"><i class=\"fa fa-list-ol\"></i> {{textFieldListButton}}</button>\n          <button type=\"button\" class=\"btn btn-success mr-1\" [ngClass]=\"{'invisible':(vwRuleId != null)}\" data-dismiss=\"modal\" (click)=\"saveCondition()\" [disabled]=\"!conditions.valid\"><i class=\"fa fa-save\"></i> Save</button>\n          <button type=\"button\" class=\"btn btn-danger\" (click)=\"hideConditionModal()\"><i class=\"fa fa-close\"></i> Cancel</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- Modal -->\n</li>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-calculation.component.html":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-calculation.component.html ***!
  \***********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"modal fade\" bsModal #resultCalculationModal=\"bs-modal\" id=\"condition\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Calculated Value</h5>\n        <button type=\"button\" class=\"close\" (click)=\"hide()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\" [formGroup]=\"resultConditionForm\">\n        <div class=\"col-md-12 px-0\">\n          <div class=\"panel-content pagination2 table-responsive no-padding\">\n            <table class=\"table table-hover table-dynamic\" *ngIf=\"!isDate; else forDate\" style=\"min-width: 300px;\">\n              <thead>\n                <tr>\n                  <th width=\"50\">Formula </th>\n                  <th width=\"50\"></th>\n                  <th width=\"180\">Section</th>\n                  <th width=\"150\">Value</th>\n                  <th width=\"50\"></th>\n                  <th width=\"30\">Operator</th>\n                  <th width=\"30\"></th>\n                </tr>\n              </thead>\n              <tbody formArrayName=\"resultCalculation\">\n                <tr *ngFor=\"let resultCalculate of resultCalculation.controls;let i = index\" [formGroupName]=\"i\">\n                  <td>\n                    <ng-select [items]=\"sqlFunctionList\" [ngStyle]=\"{'width':50}\" formControlName=\"formulaId\"\n                               placeholder=\"Select...\" bindLabel=\"DisplayName\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n                    </ng-select>\n                  </td>\n                  <td>\n                    <input class=\"form-control px-0 text-center\" formControlName=\"openingBrackets\" type=\"text\" name=\"name\" value=\"(\" />\n                  </td>\n                  <td>\n                    <ng-select [items]=\"sectionList\" formControlName=\"firstFieldSectionId\" [ngStyle]=\"{'width':150}\"\n                               placeholder=\"Manual\" bindLabel=\"sub_module_name\" (change)=\"onFirstSectionChange($event,resultCalculate)\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n                    </ng-select>\n                  </td>\n                  <td>\n                    <ng-select *ngIf=\"resultCalculate.get('firstFieldSectionId').value\" [items]=\"resultCalculate.get('firstFields')?.value\" formControlName=\"firstFieldId\" [ngStyle]=\"{'width':150}\"\n                               placeholder=\"Select...\" bindLabel=\"name\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n\n                    </ng-select>\n                    <input class=\"form-control\" *ngIf=\"!resultCalculate.get('firstFieldSectionId').value\" pKeyFilter=\"pnum\" formControlName=\"firstFieldValue\" name=\"name\" />\n\n                  </td>\n                  <td>\n                    <input class=\"form-control px-0 text-center\" formControlName=\"closingBrackets\" name=\"name\" value=\")\" />\n                  </td>\n                  <td>\n                    <ng-select [items]=\"operators\" formControlName=\"operatorId\" [ngStyle]=\"{'width':50}\"\n                               placeholder=\"Select...\" bindLabel=\"operator_expression\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n                    </ng-select>\n                  </td>\n                  <td>\n                    <a href=\"javascript:void(0);\" class=\"btn btn-danger\" *ngIf=\"i!=0\" (click)=\"deleteField(i)\"><i class=\"fa fa-trash\"></i></a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <ng-template #forDate>\n              <table class=\"table table-hover table-dynamic\" style=\"min-width: 300px;\">\n                <thead>\n                  <tr>\n                    <th width=\"50\">Formula </th>\n                    <th width=\"140\">Value Type</th>\n                    <th width=\"70\">Value</th>\n                    <th width=\"180\">Section</th>\n\n                    <th width=\"150\">On Date</th>\n                  </tr>\n                </thead>\n                <tbody formArrayName=\"resultCalculation\">\n                  <tr *ngFor=\"let resultCalculate of resultCalculation.controls;let i = index\" [formGroupName]=\"i\">\n                    <td>\n                      <ng-select [items]=\"sqlFunctionList\" [ngStyle]=\"{'width':50}\" formControlName=\"formulaId\"\n                                 placeholder=\"Select...\" bindLabel=\"DisplayName\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n                      </ng-select>\n                    </td>\n                    <td>\n                      <ng-select [items]=\"dateParts\" formControlName=\"datePart\" [ngStyle]=\"{'width':50}\"\n                                 [closeOnSelect]=\"true\" [clearable]=\"false\">\n                      </ng-select>\n                    </td>\n                    <td>\n                      <input class=\"form-control\" pKeyFilter=\"pnum\" formControlName=\"firstFieldValue\" name=\"name\" />\n                    </td>\n                    <td>\n                      <ng-select [items]=\"sectionList\" formControlName=\"secondFieldSectionId\" [ngStyle]=\"{'width':150}\"\n                                 placeholder=\"Default\" bindLabel=\"sub_module_name\" (change)=\"onSecondSectionChange($event,resultCalculate)\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n                      </ng-select>\n                    </td>\n                    <td>\n                      <ng-select *ngIf=\"resultCalculate.get('secondFieldSectionId').value\" [items]=\"resultCalculate.get('secondFields')?.value\" formControlName=\"secondFieldId\" [ngStyle]=\"{'width':150}\"\n                                 placeholder=\"Select...\" bindLabel=\"name\" [closeOnSelect]=\"true\" [clearable]=\"false\">\n\n                      </ng-select>\n                      <input class=\"form-control\" *ngIf=\"!resultCalculate.get('secondFieldSectionId').value\" pKeyFilter=\"pnum\" readonly value=\"Today\"/>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </ng-template>\n            <div class=\"p-3 text-center\" *ngIf=\"!isDate\">\n              <a href=\"javascript:void(0);\" class=\"btn btn-primary\" (click)=\"addField()\"><i class=\"fa fa-plus\"></i> Add</a>\n            </div>\n          </div>\n          <div class=\"step-default p-3 border mt-2 rounded\"><b>Value:</b> {{displayValue}} </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <a href=\"javascript:void(0);\" class=\"btn btn-success\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\n        <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"hide()\"><i class=\"fa fa-close\"></i> Cancel</a>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-table-field.component.html":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-table-field.component.html ***!
  \***********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"table-responsive overflow-auto rule-table\" [formGroup]=\"resultForm\">\n  <table class=\"table table-hover table-dynamic\" formArrayName=\"tableFields\">\n    <thead>\n      <tr>\n        <th>Field</th>\n        <th>Data Type</th>\n        <th>Conditional Operator</th>\n        <th>Value</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody *ngIf=\"resultForm.get('action').value\">\n      <ng-container *ngIf=\"resultForm.get('action').value.code=='create'\">\n        <tr *ngFor=\"let tableField of tableFields.controls;let i=index\" [formGroupName]=\"i\">\n          <ng-template [ngIf]=\"tableField.get('name').value != 'LoanApplicationId' && tableField.get('name').value != 'CompanyId' && tableField.get('name').value != 'StatusId'\">\n            <td>\n              <strong>{{tableField.get('name').value}}</strong>\n            </td>\n            <td>\n              <strong>{{tableField.get('dataType').value}}</strong>\n            </td>\n            <td>\n            <!-- <label class=\"switch disabled\" [ngClass]=\"{'toggle-disabled':tableField.get('isCalculate').disabled}\">\n                <input type=\"checkbox\" formControlName=\"isCalculate\" (change)=\"onFieldCalculateChange(tableField.get('isCalculate'),tableField)\" checked=\"\">\n                <span class=\"slider round\"><span>Yes</span></span>\n              </label> -->\n              <ng-select [items]=\"tableField.get('conditions').value\" formControlName=\"conditionsId\"\n                                   placeholder=\"Select Condition\" bindLabel=\"name\"\n                                   [closeOnSelect]=\"true\" [clearable]=\"false\">\n            </ng-select>\n            </td>\n            <td>\n              <button class=\"btn btn-primary ml-2\" *ngIf=\"tableField.get('conditionsId').value ? tableField.get('conditionsId').value.value === '3' : ''\" (click)=\"CalculationModal(tableField)\">\n                <span class=\"fa fa-pencil\">{{tableField.get('fieldDisplayValue').value}}</span></button>\n              <solgen-rule-input [formGroup]=\"tableField\" [operator]=\"\" [from]=\"tableField\"\n              [controlName]=\"'fieldValue'\" [id]=\"i\" [operatorType]=\"tableField.get('conditionsId').value\" [updateOnOperatorType]=\"true\" [customFiledList]=\"customFieldsList\"></solgen-rule-input>\n              <!-- <div *ngIf=\"tableField.get('isCalculate').value else isNotCalculate\">\n                <button (click)=\"showResultCalculation(tableField)\" type=\"button\" class=\"btn btn-primary\">\n                  {{tableField.get('fieldValue').value ? 'Edit': 'Add'}}\n                </button>\n                {{tableField.get('fieldDisplayValue').value}}\n              </div>\n           a   <ng-template #isNotCalculate>\n                <solgen-input [formGroup]=\"tableField\" [from]=\"result\" [controlName]=\"'fieldValue'\" [id]=\"i\"></solgen-input>\n              </ng-template> -->\n            </td>\n            <td class=\"align-middle\" *ngIf=\"i>0\">\n            </td>\n          </ng-template>\n\n        </tr>\n      </ng-container>\n      <ng-container *ngIf=\"resultForm.get('action').value.code=='update'\">\n        <tr *ngFor=\"let tableField of tableFields.controls;let i=index\" [formGroupName]=\"i\">\n          <td>\n            <ng-select [items]=\"customFieldsList\" formControlName=\"fieldId\"\n                       placeholder=\"Select Field\" bindLabel=\"name\" (change)=\"onFieldCalculateChange($event,tableField)\"\n                       [closeOnSelect]=\"true\" [clearable]=\"false\">\n            </ng-select>\n          </td>\n          <td>\n            <strong>{{tableField.get('dataType').value}}</strong>\n          </td>\n          <td>\n\n            <!-- <label class=\"switch disabled\" [ngClass]=\"{'toggle-disabled':tableField.get('isCalculate').disabled}\">\n              <input type=\"checkbox\" formControlName=\"isCalculate\" (change)=\"onFieldCalculateChange($event,tableField,i)\" checked=\"\">\n              <span class=\"slider round\"><span>Yes</span></span>\n            </label> -->\n            <ng-select [items]=\"tableField.get('conditions').value\" formControlName=\"conditionsId\"\n                                   placeholder=\"Select Condition\" bindLabel=\"name\"\n                                   [closeOnSelect]=\"true\" [clearable]=\"false\">\n            </ng-select>\n          </td>\n          <td>\n            <!-- <div *ngIf=\"tableField.get('isCalculate').value else isNotCalculate\">\n              <button (click)=\"showResultCalculation(tableField)\" type=\"button\" class=\"btn btn-primary\">\n                {{tableField.get('fieldValue').value ? 'Edit': 'Add'}}\n              </button>\n              {{tableField.get('fieldDisplayValue').value}}\n            </div> -->\n            <button class=\"btn btn-primary ml-2\" *ngIf=\"tableField.get('conditionsId').value ? tableField.get('conditionsId').value.value === '3' : ''\" (click)=\"CalculationModal(tableField)\">\n              <span class=\"fa fa-pencil\"> Edit </span></button>\n            <solgen-rule-input [formGroup]=\"tableField\" [operator]=\"\" [from]=\"tableField\"\n            [controlName]=\"'fieldValue'\" [id]=\"i\" [operatorType]=\"tableField.get('conditionsId').value\" [updateOnOperatorType]=\"true\" [customFiledList]=\"customFieldsList\"></solgen-rule-input>\n            <!-- <ng-template #isNotCalculate>\n              <solgen-input [formGroup]=\"tableField\" [from]=\"result\" [controlName]=\"'fieldValue'\" [id]=\"i\"></solgen-input>\n            </ng-template> -->\n          </td>\n          <td class=\"align-middle\" *ngIf=\"i>0\">\n            <a href=\"javascript:void(0);\" (click)=\"removeTableField(i)\" class=\"text-red font-16\"><i class=\"fa fa-trash\"></i></a>\n          </td>\n\n        </tr>\n      </ng-container>\n\n    </tbody>\n\n  </table>\n  <!-- <app-solgen-rule-engine-result-calculation #resultCalculation [moduleId]=\"subModuleId\" [resultForm]=\"resultForm\"></app-solgen-rule-engine-result-calculation> -->\n  <app-solgen-rule-condition-calculation #resultCalculationModal></app-solgen-rule-condition-calculation>\n</div>\n<div class=\"p-3 text-right\" *ngIf=\"resultForm.get('action')?.value?.code !='create'\">\n  <button [disabled]=\"!tableFields.valid\" class=\"btn btn-success mr-1\" (click)=\"addTableField()\"><span><i class=\"fa fa-plus\"></i> Add</span></button>\n</div>\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result.component.html":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result.component.html ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<li class=\"arrowright\" [formGroup]=\"target\" *ngIf=\"target.get('isConditionAdded').value\">\n  <div class=\"shape_oval\">\n    <h3 class=\"form-heading\">Results</h3>\n    <table class=\"table table-hover table-dynamic rule-tab\">\n      <tbody>\n        <tr *ngFor=\"let result of target.get('results').value;let i = index\">\n          <td class=\"text-left\">\n            <a data-toggle=\"modal\" (click)=\"editResult(i)\" class=\"text-white font-16 mt-2\">\n              <i class=\"fa fa-pencil\"></i> {{result.name}}\n            </a>\n          </td>\n        </tr>\n      </tbody>\n\n    </table>\n    <div class=\"col-sm-12 p-2\" [ngClass]=\"{'invisible':(vwRuleId != null)}\">\n      <a class=\"btn btn-white mr-1\"  (click)=\"showResultModal()\"><span style=\"margin-top: 0px;\"><i class=\"fa fa-plus\"></i> Add New </span></a>\n    </div>\n  </div>\n</li>\n\n\n<!-- Modal -->\n<div class=\"modal fade\" bsModal #addResult=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\n    <div class=\"modal-content\" style=\"min-height:500px !important\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Result</h5>\n        <button type=\"button\" class=\"close\" (click)=\"hideResultModal()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"resultForm\">\n          <div class=\"row\" [ngStyle]=\"vwRuleId != null ? {'pointer-events': 'none'} : {}\">\n            <div class=\"col-4\" >\n              <label>Name</label>\n              <div class=\"form-group\">\n                <input type=\"text\" class=\"form-control\" formControlName=\"name\">\n              </div>\n            </div>\n            <div class=\"col-4\">\n              <label>Action</label>\n              <div class=\"form-group\">\n                <ng-select [items]=\"resultActionList\" formControlName=\"action\" (change)=\"onActionChange($event)\"\n                           placeholder=\"Select Action\" bindLabel=\"name\"\n                           [closeOnSelect]=\"true\" [clearable]=\"false\">\n                </ng-select>\n              </div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"border\" *ngIf=\"resultForm.get('action').value\" [ngStyle]=\"vwRuleId != null ? {'pointer-events': 'none'} : {}\">\n\n                <ng-container *ngIf=\"resultForm.get('action').value.code=='update' || resultForm.get('action').value.code=='create'\">\n                  <app-solgen-rule-engine-result-table-field [customFieldsList]=\"customFieldsList\" [resultForm]=\"resultForm\" [moduleId]=\"ruleEngineForm.get('moduleId').value.value\" [subModuleId]=\"ruleEngineForm.get('subModuleId').value.sub_module_id\"></app-solgen-rule-engine-result-table-field>\n                </ng-container>\n                <ng-container *ngIf=\"resultForm.get('action').value.code !='update' && resultForm.get('action').value.code !='create'\">\n                  <input formControlName=\"resultCondition\" class=\"form-control\" placeholder=\"Please enter the validation message.\" type=\"text\" />\n                </ng-container>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <div class=\"row w-100\">\n          <div class=\"col-md-6 text-left pl-0\">\n            <button type=\"button\" class=\"btn btn-danger\" [ngClass]=\"{'invisible':(vwRuleId != null)}\" *ngIf=\"resultForm.get('isEdit').value\" data-dismiss=\"modal\" (click)=\"deleteResultForm()\"><i class=\"fa fa-trash\"></i> Delete</button>\n          </div>\n          <div class=\"col-md-6 text-right\">\n\n            <button type=\"button\" class=\"btn btn-success mr-1\" [ngClass]=\"{'invisible':(vwRuleId != null)}\" (click)=\"saveResult()\" [disabled]=\"!resultForm.valid\"><i class=\"fa fa-save\"></i> Save</button>\n            <button type=\"button\" class=\"btn btn-danger\" [ngClass]=\"{'invisible':(vwRuleId != null)}\" (click)=\"hideResultModal()\"><i class=\"fa fa-close\"></i> Cancel</button>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</div>\n<!-- Modal -->\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-target.component.html":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-target.component.html ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p class=\"shape_polygan\">\n  <span>Target</span>\n  <span class=\"delete\" [ngClass]=\"{'invisible':(vwRuleId != null)}\" (click)=\"deleteTarget()\" title=\"Click here to delete this Target\"></span>\n</p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/solgen-rule-engine-add-or-edit.component.html":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/solgen-rule-engine-add-or-edit.component.html ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\n  <h2 class=\"float-left pr-2\" *ngIf=\"(id == null || id == 0) && vwRuleId == null \"><strong>Add Rule</strong></h2>\n  <h2 class=\"float-left pr-2\" *ngIf=\"id != null\">\n    <strong>\n      Edit Rule (<div style=\"text-transform: none; display: inline-block\">{{RuleNameToShow}}</div>)\n    </strong>\n  </h2>\n  <h2 class=\"float-left pr-2\" *ngIf=\"vwRuleId != null\">\n    <strong>\n      View Rule (<div style=\"text-transform: none; display: inline-block\">{{RuleNameToShow}}</div>)\n    </strong>\n  </h2>\n  <div class=\"breadcrumb-wrapper\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a routerLink=\"/dashboard\">Dashboard</a>\n      </li>\n      <li class=\"active\">{{pageTitle}}</li>\n    </ol>\n  </div>\n\n</div>\n<div class=\"clearfix\"></div>\n<div class=\"panel cntainerwithoutbg clearfix\">\n    <div class=\"panel-content clearfix mb-4 p-0\">\n      <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" *ngIf=\"id != null && id > 0\" role=\"tablist\">\n        <li class=\"nav-item\">\n          <a class=\"nav-link active show\" id=\"lead-tab\"\n              data-toggle=\"tab\" href=\"#RuleDetail\" role=\"tab\" aria-selected=\"true\">Rule Detail</a>\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" id=\"list-ApplicationList\" data-toggle=\"tab\" href=\"#ApplicationList\" role=\"tab\" aria-selected=\"false\" (click)=\"refreshLA()\">Rule based Application(s)</a>\n        </li>\n      </ul>\n      <div class=\"tab-content\" id=\"myTabContent\">\n        <div class=\"tab-pane fade active show\" id=\"RuleDetail\" role=\"tabpanel\">\n          <div class=\"row\">\n            <div class=\"col-lg-12 portlets\">\n              <form [formGroup]=\"ruleEngineForm\">\n                  <h3 class=\"form-heading mt-0\"> <span>Rule Details <div style=\"display:inline-block\" *ngIf=\"id != null && id > 0\">(v{{ruleVersion.value}})</div></span></h3>\n                  <div class=\"row mb-2\">\n\n                    <div [ngClass]=\"{'col-md-11':(ruleEngineVersionList.length!=0),'col-md-12':(ruleEngineVersionList.length==0)}\">\n                      <div class=\"row\">\n                        <div class=\"col-md-12 col-lg-6\">\n                          <label>Name:<span class=\"text-danger\">*</span></label>\n                          <div class=\"form-group\">\n                            <input type=\"text\" class=\"form-control\"\n                                   formControlName=\"name\">\n                            <div *ngIf=\"name?.invalid && (name?.dirty || name?.touched)\"\n                                 class=\"text-danger\">\n                              <div *ngIf=\"name.errors.required\">\n                                Name is required.\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n\n                        <div class=\"col-md-12 col-lg-6\">\n                          <label>Module:<span class=\"text-danger\">*</span></label>\n                          <div class=\"form-group\">\n                            <ng-select [items]=\"moduleList\" formControlName=\"moduleId\" placeholder=\"Select Module...\"\n                                       bindLabel=\"text\" [clearable]=\"false\"></ng-select>\n                            <div *ngIf=\"moduleId?.invalid && (moduleId?.dirty || moduleId?.touched)\"\n                                 class=\"text-danger\">\n                              <div *ngIf=\"moduleId.errors.required\">\n                                Module is required.\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n\n                        <div class=\"col-md-12 col-lg-6\">\n                          <label>Sub Module:<span class=\"text-danger\">*</span></label>\n                          <div class=\"form-group\">\n                            <ng-select [items]=\"subModuleList\" formControlName=\"subModuleId\" placeholder=\"Select Sub Module...\"\n                                       bindLabel=\"sub_module_name\" [clearable]=\"false\"></ng-select>\n                            <div *ngIf=\"subModuleId?.invalid && (subModuleId?.dirty || subModuleId?.touched)\"\n                                 class=\"text-danger\">\n                              <div *ngIf=\"subModuleId.errors.required\">\n                                Sub Module is required.\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n\n                        <div class=\"col-md-12 col-lg-6\">\n                          <label>Active:</label>\n                          <div class=\"form-group\">\n                            <label class=\"switch\">\n                              <input type=\"checkbox\" formControlName=\"isActive\" checked=\"\">\n                              <span class=\"slider round\"><span>Yes</span></span>\n                            </label>\n                          </div>\n                        </div>\n                        <div class=\"col-md-12 col-lg-6\">\n                          <label>Execution Order:</label>\n                          <div class=\"form-group\">\n                            <input type=\"number\" formControlName=\"displayOrder\" class=\"form-control\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  <div *ngIf=\"events.length > 0\">\n                    <h3 class=\"form-heading mt-0\"> <span>Apply On</span></h3>\n                    <div class=\"div-scroll p-2\">\n                      <div class=\"flowchart-fix\">\n                        <ul class=\"fc_parentchild\">\n\n                          <li [ngClass]=\"{'arrowdown':eventId.value==0?false:true}\">\n                            <p class=\"shape_oval\"><span>When</span></p>\n                            <ul class=\"fc_subchild fc_subchildWhen\">\n                              <li class=\"arrowright top50\">\n                                <div class=\"formsfieldmainunique\">\n                                  <div class=\"parenthead\">\n                                    <span class=\"text\">When do you want to execute the rule ()?</span>\n                                    <a *ngIf=\"eventId.value !=0 && isEditEvent\" (click)=\"editEvent()\" class=\"float-right text-white\" href=\"javascript:void(0);\"><i class=\"fa fa-arrow-left\"></i></a>\n                                  </div>\n                                  <div class=\"childdivsunique_edit\" *ngIf=\"!isEditEvent\">\n                                    <div class=\"childdivsuniqueheader\"><span>{{subModule.sub_module_name}}: {{eventName}}</span></div>\n                                    <div class=\"childdivediticon_unique textalignright\">\n                                      <a href=\"javascript:void(0);\" title=\"\" [ngClass]=\"{'invisible':(vwRuleId != null)}\" (click)=\"editEvent()\">\n                                        <div class=\"iconedit_unique\"></div>\n                                      </a>\n                                    </div>\n                                  </div>\n                                  <div class=\"clearfix\"></div>\n                                  <div class=\"childdivsunique_base row mt-3\" *ngIf=\"isEditEvent\">\n                                    <div class=\"col-sm-6\" *ngFor=\"let event of events\">\n                                      <div class=\"radio\">\n                                        <input id=\"radio-{{event.SubModuleEventId}}\" formControlName=\"eventId\" (change)=\"onEventChange(event)\" [value]=\"event.SubModuleEventId\" type=\"radio\">\n                                        <label for=\"radio-{{event.SubModuleEventId}}\" class=\"radio-label\">{{event.Name}} </label>\n                                      </div>\n                                    </div>\n                                  </div>\n                                </div>\n                              </li>\n                            </ul>\n                          </li>\n\n                          <li *ngIf=\"eventId.value!=0\">\n\n                            <ul formArrayName=\"targets\">\n                              <li class=\"arrowdown\" *ngFor=\"let target of targets.controls;let i = index\" [formGroupName]=\"i\">\n                                <div>\n                                  <app-solgen-rule-engine-target [vwRuleId]=\"vwRuleId\" (deleteTargetEvent)=\"deleteTarget(i)\"></app-solgen-rule-engine-target>\n                                  <ul class=\"fc_subchild\">\n                                    <app-solgen-rule-engine-condition [vwRuleId]=\"vwRuleId\" [customFieldsList]=\"customFieldsList\" [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" [rowNo]=\"i\" [subModuleId]=\"subModuleId\"></app-solgen-rule-engine-condition>\n                                    <app-solgen-rule-engine-result [vwRuleId]=\"vwRuleId\" [customFieldsList]=\"customFieldsList\" [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\"></app-solgen-rule-engine-result>\n                                  </ul>\n                                </div>\n                              </li>\n                              <li class=\"arrowdown ui-sortable-handle\" *ngIf=\"showAddTarget()\" [ngClass]=\"{'invisible':(vwRuleId != null)}\">\n                                <p class=\"shape_roundbtn\" (click)=\"addTarget()\" title=\"Click here to add new Target\"><span>+</span></p>\n                              </li>\n                            </ul>\n                          </li>\n                        </ul>\n\n                      </div>\n\n                    </div>\n                  </div>\n\n                  <div class=\"row mb-3\" >\n                    <div class=\"col-sm-12 col-md-12\">\n                      <!---->\n                      <button class=\"btn btn-success mr-2\" [ngClass]=\"{'invisible':(vwRuleId != null)}\" href=\"javascript:void(0);\" [disabled]=\"(!ruleEngineForm.valid) || (isSubmitButtonDisabled == true && id > 0)\" (click)=\"save()\"><span><i class=\"fa fa-save\"></i> Submit</span></button>\n                      <a routerLink=\"/solgen-rule-engine\" class=\"btn btn-danger\" href=\"javascript:void(0);\"><span><i class=\"fa fa-close\"></i> Cancel</span></a>\n                    </div>\n                  </div>\n              </form>\n            </div>\n            <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\n          </div>\n        </div>\n        <div class=\"tab-pane p-0 fade\" id=\"ApplicationList\" role=\"tabpanel\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n\n              <div class=\"col-md-12 mt-3\">\n                <div class=\"alert alert-warning\" role=\"alert\">\n                  <strong>NOTE: </strong> You can change the rule version for the particular application(s), and next time whenever rules are executed on that application, it will execute your selected version of the rule.\n                </div>\n              </div>\n              <div class=\"border-bottom pb-3\">\n                <div class=\" row mt-2\">\n                  <div class=\"col-md-6 col-lg-5\">\n                    <div class=\"row px-3\">\n                      <div class=\"col-lg-5 float-left mb-lg-0 mb-2\">\n                        <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFiltertext' placeholder=\"Search By No\">\n                      </div>\n                      <div class=\"col-lg-7 float-left px-sm-0 px-3 \">\n                        <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"searchLA('VERSION')\"><span><i class=\"fa fa-search\"></i> Search</span></a>\n                        <a class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"refreshLA()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"col-md-6 col-lg-7\">\n                    <div class=\"row px-3\">\n                      <div class=\"col-lg-12 text-left text-md-right\">\n                        <div class=\"form-group d-inline-block align-top mr-1 mb-0\" style=\"max-width:220px\" *ngIf=\"laPagedData != null && laPagedData.data != null && laPagedData.data.length > 0\">\n                          <ng-select [(ngModel)]='selectedVersionForChange' [items]=\"ruleEngineVersionListForChange\" placeholder=\"Select Version to update\"\n                                     bindValue=\"RuleId\" bindLabel=\"RuleVersion\" class=\"form-control\" [clearable]=\"false\"></ng-select>\n                        </div>\n                        <div class=\"form-group d-inline-block mr-1 mb-0\" *ngIf=\"laPagedData != null && laPagedData.data != null && laPagedData.data.length > 0\">\n                          <button class=\"btn btn-primary float-left\" type=\"button\" (click)=\"ApplySelectedVersion()\"><i class=\"fa fa-floppy-o\"></i> Apply Version</button>\n                        </div>\n                        <div class=\"form-group d-inline-block align-top mb-0\" *ngIf=\"isSubmitButtonDisabled == false && id > 0\">\n                          <button type=\"button\" class=\"btn btn-success\" (click)=\"OpenLatestRuleOnOldApp()\"><i class=\"fa fa-check-circle-o\"></i> Apply on old Application</button>\n                        </div>\n                      </div>\n\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n\n              <div class=\"col-md-12\">\n                <div class=\"mt-3\">{{RuleNameToShow}} (v{{ruleVersion.value}}) is already executed on following application(s)</div>\n                <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\n                               [rows]=\"laPagedData.data\"\n                               [columnMode]=\"'force'\"\n                               [scrollbarH]=\"true\"\n                               [rowHeight]=\"'40'\"\n                               [headerHeight]=\"40\"\n                               [footerHeight]=\"40\"\n                               [externalPaging]=\"true\"\n                               [externalSorting]=\"true\"\n                               [loadingIndicator]=\"loadSave\"\n                               [count]=\"laPagedData.pager.totalItems\"\n                               [offset]=\"laPagedData.pager.currentPage\"\n                               [limit]=\"laPagedData.pager.pageSize\"\n                               (page)=\"setPageLA($event, 'VERSION')\"\n                               (sort)=\"onSort($event)\"\n                               [selected]=\"selectedApplication\"\n                               [selectionType]=\"SelectionType.checkbox\"\n                               [selectAllRowsOnPage]=\"false\"\n                               (activate)=\"onActivate($event)\"\n                               (select)=\"onSelect($event)\">\n                  <ngx-datatable-column [width]=\"42\"\n                                        [sortable]=\"false\"\n                                        [canAutoResize]=\"false\"\n                                        [draggable]=\"false\"\n                                        [resizeable]=\"false\"\n                                        [headerCheckboxable]=\"true\"\n                                        [checkboxable]=\"true\">\n                  </ngx-datatable-column>\n\n                  <ngx-datatable-column name=\"Application Number\" prop=\"ApplicationNumber\" [sortable]=\"true\">\n                    <!--<ng-template let-row=\"row\" ngx-datatable-cell-template>\n        <a href=\"javascript:void(0);\" (click)=\"viewLoanApp(row.Id)\">{{row.ApplicationNumber}} </a>\n      </ng-template>-->\n                  </ngx-datatable-column>\n                  <ngx-datatable-column name=\"Email\" prop=\"Email\" [sortable]=\"true\"></ngx-datatable-column>\n                  <ngx-datatable-column name=\"Product Name\" prop=\"ProductName\" [sortable]=\"true\"></ngx-datatable-column>\n                  <!--<ngx-datatable-column name=\"Stage\" prop=\"Stage\" [sortable]=\"true\"></ngx-datatable-column>-->\n                  <ngx-datatable-column name=\"Status\" prop=\"ApplicationStatus\" [sortable]=\"true\">\n                    <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                      {{row.ApplicationStatus}}\n                    </ng-template>\n                  </ngx-datatable-column>\n                  <ngx-datatable-footer>\n                    <ng-template ngx-datatable-footer-template\n                                 let-rowCount=\"rowCount\"\n                                 let-pageSize=\"pageSize\"\n                                 let-selectedCount=\"selectedCount\"\n                                 let-currentPage=\"currentPage\"\n                                 let-offset=\"offset\"\n                                 let-isVisible=\"isVisible\">\n\n                      <div>\n                        <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\n                          <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n                            <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='laPageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeLA($event, 'VERSION')\" draggable=\"false\" [closeOnSelect]=\"true\" bindLabel=\"text\" bindValue=\"text\"></ng-select>\n                          </span>\n                        </div>\n                      </div>\n                      <div class=\"page-count\" style=\"max-width:170px;\">\n                        {{rowCount}} total\n                      </div>\n                      <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\n                                       [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\n                                       [pagerPreviousIcon]=\"'fa fa-angle-left'\"\n                                       [pagerNextIcon]=\"'fa fa-angle-right'\"\n                                       [page]=\"laPagedData.pager.currentPage\"\n                                       [size]=\"laPageSizeValue\"\n                                       [count]=\"laPagedData.pager.totalItems\"\n                                       [hidden]=\"!((rowCount / pageSize) > 1)\"\n                                       (change)=\"setPageLA($event, 'VERSION')\">\n                      </datatable-pager>\n                    </ng-template>\n                  </ngx-datatable-footer>\n                </ngx-datatable>\n\n              </div>\n\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n</div>\n<div class=\"clearfix\"></div>\n\n<div class=\"modal fade \" bsModal #ApplicationPopupForApplyLatestRule=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\">Applications</h5>\n        <button type=\"button\" class=\"close\"  (click)=\"applyLatestRuleOnOldApp.hide()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"row\">\n          <div class=\"col-md-12 mt-3\">\n            <div class=\"alert alert-warning\" role=\"alert\">\n              <strong>NOTE: </strong> You can apply {{RuleNameToShow}} (latest version) on selected application(s), and next time whenever rule engine is executed on that application, {{RuleNameToShow}} will be executed.\n            </div>\n          </div>\n          <div class=\"col-md-12\">\n            <div class=\"row\">\n              <div class=\"col-lg-5 float-left mb-lg-0 mb-2\">\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='loanApplicationlistFiltertext' placeholder=\"Search By Application No\">\n              </div>\n              <div class=\"col-lg-7 float-left\">\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"searchLA('NEWRULEONOLDAPP')\"><span><i class=\"fa fa-search\"></i> Search</span></a>\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"refreshLA('NEWRULEONOLDAPP')\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"mt-3\">Following application(s) are those on which {{RuleNameToShow}} (any version) is still not applied</div>\n            <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\n                           [rows]=\"loanApplicationPageData.data\"\n                           [columnMode]=\"'force'\"\n                           [scrollbarH]=\"true\"\n                           [rowHeight]=\"'40'\"\n                           [headerHeight]=\"40\"\n                           [footerHeight]=\"40\"\n                           [externalPaging]=\"true\"\n                           [externalSorting]=\"true\"\n                           [loadingIndicator]=\"loadSave\"\n                           [count]=\"loanApplicationPageData.pager.totalItems\"\n                           [offset]=\"loanApplicationPageData.pager.currentPage\"\n                           [limit]=\"loanApplicationPageData.pager.pageSize\"\n                           (page)=\"setPageLA($event, 'NEWRULEONOLDAPP')\"\n                           (sort)=\"onSort($event)\"\n                           [selected]=\"selectedOldApplication\"\n                           [selectionType]=\"SelectionType.checkbox\"\n                           [selectAllRowsOnPage]=\"false\"\n                           (activate)=\"onActivate($event)\"\n                           (select)=\"onSelectOldApplication($event)\">\n              <ngx-datatable-column [width]=\"42\"\n                                    [sortable]=\"false\"\n                                    [canAutoResize]=\"false\"\n                                    [draggable]=\"false\"\n                                    [resizeable]=\"false\"\n                                    [headerCheckboxable]=\"true\"\n                                    [checkboxable]=\"true\">\n              </ngx-datatable-column>\n\n              <ngx-datatable-column name=\"Application Number\" prop=\"ApplicationNumber\" [sortable]=\"true\">\n                <!--<ng-template let-row=\"row\" ngx-datatable-cell-template>\n        <a href=\"javascript:void(0);\" (click)=\"viewLoanApp(row.Id)\">{{row.ApplicationNumber}} </a>\n      </ng-template>-->\n              </ngx-datatable-column>\n              <ngx-datatable-column name=\"Email\" prop=\"Email\" [sortable]=\"true\"></ngx-datatable-column>\n              <ngx-datatable-column name=\"Product Name\" prop=\"ProductName\" [sortable]=\"true\"></ngx-datatable-column>\n              <!--<ngx-datatable-column name=\"Stage\" prop=\"Stage\" [sortable]=\"true\"></ngx-datatable-column>-->\n              <ngx-datatable-column name=\"Status\" prop=\"ApplicationStatus\" [sortable]=\"true\">\n                <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                  {{row.ApplicationStatus}}\n                </ng-template>\n              </ngx-datatable-column>\n              <ngx-datatable-footer>\n                <ng-template ngx-datatable-footer-template\n                             let-rowCount=\"rowCount\"\n                             let-pageSize=\"pageSize\"\n                             let-selectedCount=\"selectedCount\"\n                             let-currentPage=\"currentPage\"\n                             let-offset=\"offset\"\n                             let-isVisible=\"isVisible\">\n                  <div>\n                    <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\n                      <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n                        <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='loanApplicationPageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeLA($event, 'NEWRULEONOLDAPP')\" draggable=\"false\" [closeOnSelect]=\"true\" bindLabel=\"text\" bindValue=\"text\"></ng-select>\n                      </span>\n                    </div>\n                  </div>\n                  <div class=\"page-count\" style=\"max-width:170px;\">\n                    {{rowCount}} total\n                  </div>\n                  <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\n                                   [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\n                                   [pagerPreviousIcon]=\"'fa fa-angle-left'\"\n                                   [pagerNextIcon]=\"'fa fa-angle-right'\"\n                                   [page]=\"loanApplicationPageData.pager.currentPage\"\n                                   [size]=\"laPageSizeValue\"\n                                   [count]=\"loanApplicationPageData.pager.totalItems\"\n                                   [hidden]=\"!((rowCount / pageSize) > 1)\"\n                                   (change)=\"setPageLA($event, 'NEWRULEONOLDAPP')\">\n                  </datatable-pager>\n                </ng-template>\n              </ngx-datatable-footer>\n            </ngx-datatable>\n          </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"ApplyRuleOnOldApplication()\"><i class=\"fa fa-floppy-o\"></i> Submit</button>\n            <button type=\"button\" class=\"btn btn-danger ml-2\" (click)=\"closeOldApplicationPopup()\"><i class=\"fa fa-times\"></i> cancel</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/solgen-rule-engine-list.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/solgen-rule-engine-list.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\n  <h2 class=\"float-left pr-2\"><strong>RULE ENGINE</strong></h2>\n  <div class=\"breadcrumb-wrapper\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a routerLink=\"/dashboard\">Dashboard</a>\n      </li>\n      <li class=\"active\">RULE ENGINE</li>\n    </ol>\n  </div>\n</div>\n<div class=\"clearfix\"></div>\n<div class=\"row\">\n  <div class=\"col-lg-12 portlets\">\n    <div class=\"panel\">\n      <div class=\"panel-header border-bottom \">\n        <div class=\"row mt-2\">\n\n          <div class=\"col-md-6 col-xl-6\">\n            <div class=\"row searchfield  mr-1 w-100\">\n              <div class=\"col-lg-5 float-left mb-lg-0 mb-2\">\n                <ng-select [items]=\"modulelist\"\n                           placeholder=\"Select Module\" bindValue=\"module_id\"\n                           [(ngModel)]=\"moduleId\"\n                           bindLabel=\"module_name\" (change)=\"onModuleSelect($event)\" [clearable]=\"true\">\n                </ng-select>\n              </div>\n              <div class=\"col-lg-5 float-left mb-lg-0 mb-2\">\n                <ng-select [items]=\"subModulelist\"\n                           placeholder=\"Select SubModule\" bindValue=\"sub_module_id\"\n                           [(ngModel)]=\"subModuleId\"\n                           bindLabel=\"sub_module_name\" (change)=\"onSubModuleSelect($event)\" [clearable]=\"true\">\n                </ng-select>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-6 col-xl-6\" >\n            <div class=\"dt-buttons\">\n              <a href=\"javascript:void(0);\" routerLink=\"/solgen-rule-engine/add-rule\"  class=\"btn btn-success form-btns  mr-1\" tooltip=\" Add Form\"><i class=\"fa fa-plus\"></i></a>\n              <a class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"remove()\"  tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\n\n\n\n\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\n        [rows]=\"pagedData.data\"\n        [columnMode]=\"'force'\"\n        [scrollbarH]=\"true\"\n        [rowHeight]=\"'40'\"\n        [headerHeight]=\"40\"\n        [footerHeight]=\"40\"\n        [externalPaging]=\"true\"\n        [externalSorting]=\"true\"\n        [loadingIndicator]=\"loadSave\"\n        [count]=\"pagedData.pager.totalItems\"\n        [offset]=\"pagedData.pager.currentPage\"\n        [limit]=\"pagedData.pager.pageSize\"\n        (page)='setPage($event)'\n        (sort)=\"onSort($event)\"\n        [selectionType]=\"SelectionType.checkbox\"\n        [selectAllRowsOnPage]=\"false\"\n        [selected]=\"selected\"\n        (select)=\"onSelect($event)\">\n<ngx-datatable-column [width]=\"42\"\n                 [sortable]=\"false\"\n                 [canAutoResize]=\"false\"\n                 [draggable]=\"false\"\n                 [resizeable]=\"false\"\n                 [headerCheckboxable]=\"true\"\n                 [checkboxable]=\"true\">\n</ngx-datatable-column>\n\n<ngx-datatable-column name=\"Module\" [sortable]=\"true\" prop=\"ModuleName\"></ngx-datatable-column>\n   <ngx-datatable-column name=\"SubModule\" [sortable]=\"true\" prop=\"SubModuleName\"></ngx-datatable-column>\n   <ngx-datatable-column name=\"Rule Name\" prop=\"RuleName\" [sortable]=\"true\">\n    <ng-template let-row=\"row\" ngx-datatable-cell-template>\n      <div><a [routerLink]=\"['/solgen-rule-engine/edit',row.RuleId]\">{{row.RuleName }}</a></div>\n    </ng-template>\n  </ngx-datatable-column>\n   <ngx-datatable-column name=\"Execution Order\" [sortable]=\"true\" prop=\"DisplayOrder\"></ngx-datatable-column>\n   <ngx-datatable-column name=\"Status\" prop=\"StatusId\" sortable=\"false\" headerClass=\"text-center\">\n    <ng-template let-row=\"row\" ngx-datatable-cell-template>\n      <div class=\"text-center\" *ngIf=\"row.StatusId == 1002\">\n        <!--<span><i class=\"fa fa-times text-danger icon_tick\"></i></span>-->\n\n        <a href=\"javascript:void(0);\" (click)=\"enable(row)\"><i title=\"Click to enable.\" class=\"fa fa-times text-danger icon_tick\"></i></a>\n      </div>\n      <div class=\"text-center\" *ngIf=\"row.StatusId == 1001\">\n        <!--<span><i class=\"fa fa-check text-success icon_tick\"></i></span>-->\n        <a href=\"javascript:void(0);\" (click)=\"disable(row)\"><i title=\"Click to disable.\" class=\"fa fa-check text-success icon_tick\"></i></a>\n      </div>\n    </ng-template>\n  </ngx-datatable-column>\n\n\n<ngx-datatable-column [width]=\"80\" name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\n<ng-template let-row=\"row\" ngx-datatable-cell-template>\n<div class=\"text-center\">\n  <a  class=\"actions-onclick view-list\" class=\"btn-edit \" [routerLink]=\"['/solgen-rule-engine/view',row.RuleId]\"  title=\"View Detail\"><i class=\"fa fa-eye pr-2 \"></i></a>\n <a *ngIf=\"row.IsFromSubModule\"  class=\"btn-edit \" href=\"javascript:void(0);\" [routerLink]=\"['/solgen-rule-engine/edit',row.RuleId]\"><i title=\"Add/Edit Form Fields\" class=\"fa fa-pencil text-success pr-2\"></i></a>\n <a *ngIf=\"!row.IsFromSubModule\"  class=\"btn-edit\" href=\"javascript:void(0);\" [routerLink]=\"['/solgen-rule-engine/edit',row.RuleId]\"><i title=\"Add/Edit Form Fields\" class=\"fa fa-pencil text-success pr-2\"></i></a>\n\n <a *ngIf=\"row.IsFromSubModule\" class=\"btn-edit disabled\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-secondary pr-2\" title=\"Delete Form\"></i></a>\n <a *ngIf=\"!row.IsFromSubModule\" (click)=\"DeleteRule(row)\" class=\"btn-edit\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger pr-2\" title=\"Delete Form\"></i></a>\n</div>\n</ng-template>\n</ngx-datatable-column>\n<ngx-datatable-footer>\n<ng-template ngx-datatable-footer-template\n          let-rowCount=\"rowCount\"\n          let-pageSize=\"pageSize\"\n          let-selectedCount=\"selectedCount\"\n          let-currentPage=\"currentPage\"\n          let-offset=\"offset\"\n          let-isVisible=\"isVisible\">\n\n<div>\n <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\n   <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n     <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\n                bindLabel=\"text\" bindValue=\"text\"></ng-select>\n   </span>\n </div>\n</div>\n<div class=\"page-count\" *ngIf='(rowCount  > 0)'>\n {{commonService.PageString(pagedData.pager.currentPage+1,pageSizeValue,rowCount)}}\n</div>\n\n<!--<div class=\"page-count\">\nShowing {{(pagedData.pager.currentPage )* pagedData.pager.pageSize + 1}}  to {{(pagedData.pager.currentPage+1) * pagedData.pager.pageSize}} out of {{rowCount}}  enteries\n</div>     \"pagedData.pager.currentPage+1\"-->\n<datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\n[pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\n[pagerPreviousIcon]=\"'fa fa-angle-left'\"\n[pagerNextIcon]=\"'fa fa-angle-right'\"\n[page]=\"pagedData.pager.currentPage+1\"\n[size]=\"pageSizeValue\"\n[count]=\"pagedData.pager.totalItems\"\n[hidden]=\"!((rowCount / pageSize) > 1)\"\n(change)=\"setPage($event)\">\n</datatable-pager>\n</ng-template>\n</ngx-datatable-footer>\n</ngx-datatable>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/solgen-rule-engine-summary.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/solgen-rule-engine-summary.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  solgen-rule-engine-summary works!\n</p>\n");

/***/ }),

/***/ "./src/app/views/bank/bank.service.ts":
/*!********************************************!*\
  !*** ./src/app/views/bank/bank.service.ts ***!
  \********************************************/
/*! exports provided: BankService, BankModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankService", function() { return BankService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankModel", function() { return BankModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var BankService = /** @class */ (function () {
    function BankService(http, commonService) {
        this.http = http;
        this.commonService = commonService;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    //function used to fetch list of Bank
    BankService.prototype.getBankList = function (name, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + ("Bank/GetBankList?nameSearch=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    //function used to set active/inactive status of Bank
    BankService.prototype.setBankStatus = function (tableName, primaryKey, status, moduleName, statusName) {
        return this.commonService.ActiveInactive(tableName, primaryKey, status, moduleName, statusName);
    };
    //function is used to get detail of  user
    BankService.prototype.getBankDetail = function (id) {
        return this.http.get(this.baseUri + ("Bank/GetBankDetailById?Bankid=" + id));
    };
    //function is used to delte the  user
    BankService.prototype.deleteBank = function (tableName, primaryid, moduleName) {
        return this.commonService.Delete(tableName, primaryid, moduleName);
    };
    //function is used to add edit vendor
    BankService.prototype.addEditBank = function (bankModel) {
        return this.http.post(this.baseUri + "Bank/AddEditBank", bankModel);
    };
    BankService.prototype.getusersBankList = function (page, pageSize, bankId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Bank/GetUsersBankList?pageIndex=" + page + "&pageSize=" + pageSize + "&bankId=" + bankId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    BankService.prototype.getBankDropdownList = function () {
        return this.http.get(this.baseUri + "Bank/GetBankDropList");
    };
    BankService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] }
    ]; };
    BankService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]])
    ], BankService);
    return BankService;
}());

var BankModel = /** @class */ (function () {
    function BankModel() {
        this.id = "";
        this.bankName = "";
        this.city = "";
        this.county = "";
        this.stateId = "";
        this.statusId = "";
        this.address = "";
        this.phone = "";
        this.zipCode = "";
    }
    return BankModel;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.scss":
/*!*****************************************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.scss ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NvbGdlbi1ydWxlLWVuZ2luZS9jb21wb25lbnQvc29sZ2VuLXJ1bGUtY29uZGl0aW9uLWNhbGN1bGF0aW9uLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: SolgenRuleConditionCalculationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleConditionCalculationComponent", function() { return SolgenRuleConditionCalculationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../solgen-rule-engine.service */ "./src/app/views/solgen-rule-engine/solgen-rule-engine.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var SolgenRuleConditionCalculationComponent = /** @class */ (function () {
    function SolgenRuleConditionCalculationComponent(commonService, ruleEngineService, fb) {
        this.commonService = commonService;
        this.ruleEngineService = ruleEngineService;
        this.fb = fb;
        this.displayValue = '';
        this.databaseValue = '';
        this.sqlFunctionList = [];
        this.dateParts = ['Day', 'Month', 'Quarter', 'Year'];
        this.sectionList = [];
        this.operators = [];
        this.isDate = false;
    }
    SolgenRuleConditionCalculationComponent.prototype.ngOnChanges = function () {
    };
    SolgenRuleConditionCalculationComponent.prototype.ngOnInit = function () {
        this.getSubModules();
        this.resultConditionForm = this.fb.group({
            resultCalculation: this.fb.array([this.ruleEngineService.buildResultCalculation()])
        });
        this.onResultCalculationFormChange();
    };
    Object.defineProperty(SolgenRuleConditionCalculationComponent.prototype, "resultCalculation", {
        get: function () {
            return this.resultConditionForm.get('resultCalculation');
        },
        enumerable: true,
        configurable: true
    });
    SolgenRuleConditionCalculationComponent.prototype.getSqlFunctionList = function (functionType) {
        var _this = this;
        this.commonService.GetSqlFunctionList(functionType).subscribe(function (m) {
            _this.sqlFunctionList = m;
        });
    };
    SolgenRuleConditionCalculationComponent.prototype.getSubModules = function () {
        var _this = this;
        this.ruleEngineService.getSubModules(this.moduleId).subscribe(function (m) {
            _this.sectionList = m.filter(function (a) { return a.module_name_code != 'loanapplication'; });
        });
    };
    SolgenRuleConditionCalculationComponent.prototype.onSecondSectionChange = function (event, field) {
        var _this = this;
        if (event) {
            this.ruleEngineService.GetCustomFieldsListBySubModuleId(this.moduleId, event.sub_module_id).subscribe(function (m) {
                if (m) {
                    var tableFiledList = [];
                    if (!_this.isDate) {
                        tableFiledList = m.data.filter(function (f) { return f.dt_code != 'select' && f.dt_code != 'text' && f.dt_code != 'boolean' && f.dt_code != 'date' && f.dt_code != 'datetime'; }).map(function (f) {
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
                            };
                        });
                    }
                    else {
                        tableFiledList = m.data.filter(function (f) { return (f.dt_code == 'date' || f.dt_code == 'datetime'); }).map(function (f) {
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
                            };
                        });
                    }
                    field.get('secondFields').setValue(tableFiledList);
                }
            });
        }
        field.get('secondFieldId').setValue(null);
        field.get('secondFieldValue').setValue(null);
    };
    SolgenRuleConditionCalculationComponent.prototype.addField = function () {
        this.resultCalculation.push(this.ruleEngineService.buildResultCalculation());
    };
    SolgenRuleConditionCalculationComponent.prototype.onResultCalculationFormChange = function () {
        var _this = this;
        this.resultCalculation.valueChanges.subscribe(function (m) {
            if (m) {
                _this.databaseValue = '';
                _this.displayValue = '';
                m.forEach(function (f) {
                    if (!_this.isDate) {
                        if (f.formulaId) {
                            _this.databaseValue += f.formulaId.FunctionName;
                            _this.displayValue += f.formulaId.DisplayName;
                        }
                        if (f.openingBrackets != '') {
                            _this.databaseValue += f.openingBrackets;
                            _this.displayValue += f.openingBrackets;
                        }
                        if (f.firstFieldId) {
                            _this.databaseValue += "isnull(" + f.firstFieldId.table_alias + "." + f.firstFieldId.PrimaryTableColumn + ",0)";
                            _this.displayValue += "" + f.firstFieldId.PrimaryTableColumn;
                        }
                        if (f.firstFieldValue) {
                            _this.databaseValue += "" + f.firstFieldValue;
                            _this.displayValue += "" + f.firstFieldValue;
                        }
                        if (f.closingBrackets != '') {
                            _this.databaseValue += f.closingBrackets;
                            _this.displayValue += f.closingBrackets;
                        }
                        if (f.operatorId) {
                            console.log('operator: ', f.operatorId);
                            if (f.operatorId.operator_expression) {
                                _this.databaseValue += "" + f.operatorId.operator_expression;
                                _this.displayValue += "" + f.operatorId.operator_expression;
                            }
                        }
                    }
                    else {
                        if (f.formulaId) {
                            _this.databaseValue += f.formulaId.FunctionName;
                            _this.displayValue += f.formulaId.DisplayName;
                            if (f.datePart) {
                                _this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', f.datePart);
                                console.log(f.formulaId.FunctionName.replace('{DATEPART}', f.datePart));
                                _this.displayValue = f.datePart + ",";
                            }
                            if (f.firstFieldValue) {
                                _this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', f.datePart).replace('{VALUE}', f.firstFieldValue);
                                _this.displayValue = _this.databaseValue;
                            }
                            if (f.secondFieldId) {
                                _this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', f.datePart).replace('{VALUE}', f.firstFieldValue).replace('{FROMDATE}', "isnull(" + f.secondFieldId.table_alias + "." + f.secondFieldId.PrimaryTableColumn + ",getutcdate())");
                                _this.displayValue = _this.databaseValue;
                            }
                            else {
                                _this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', (f.datePart == null ? 'minute' : f.datePart)).replace('{VALUE}', (f.firstFieldValue == null ? 0 : f.firstFieldValue)).replace('{FROMDATE}', "getutcdate()");
                                _this.displayValue = _this.databaseValue;
                            }
                        }
                    }
                });
                console.log('display : database >', _this.displayValue, ' : ', _this.databaseValue);
            }
        });
    };
    SolgenRuleConditionCalculationComponent.prototype.save = function () {
        var _this = this;
        while (this.tableField.get('resultCalculation').length != 0) {
            this.tableField.get('resultCalculation').removeAt(0);
        }
        this.resultCalculation.controls.forEach(function (m) {
            _this.tableField.get('resultCalculation').push(m);
        });
        //this.tableField.get('fieldDisplayValue').setValue(this.displayValue);
        try {
            this.tableField.get('fieldValue').setValue(this.databaseValue);
        }
        catch (e) {
            this.tableField.get('fieldValue').clearValidators();
            this.tableField.get('fieldValue').updateValueAndValidity();
            this.tableField.get('fieldValue').setValue(null);
        }
        this.hide();
    };
    SolgenRuleConditionCalculationComponent.prototype.deleteField = function (index) {
        this.resultCalculation.removeAt(index);
    };
    SolgenRuleConditionCalculationComponent.prototype.show = function (tableField, moduleId, subModuleId, customFieldsList) {
        var _this = this;
        debugger;
        this.tableField = tableField;
        this.moduleId = moduleId;
        this.subModuleId = subModuleId;
        if (customFieldsList) {
            this.customFieldsList = JSON.parse(JSON.stringify(customFieldsList));
            this.customFieldsList = this.customFieldsList.filter(function (x) { return x.actual_data_type == _this.tableField.value.fieldId.actual_data_type; });
        }
        this.ngOnInit();
        // this.getSubModuleList();
        this.isDate = (this.tableField.value.fieldId.actual_data_type == 'datetime' || this.tableField.value.fieldId.actual_data_type == 'date');
        var sqlFunctionTypeCode = this.isDate ? 'date' : 'numeric';
        this.getSqlFunctionList(sqlFunctionTypeCode);
        this.commonService.getOperatorsByDataTypeCode(this.tableField.value.fieldId.actual_data_type).subscribe(function (m) {
            _this.operators = m.filter(function (f) { return f.OperatorTypeId === 1; });
        });
        while (this.resultCalculation.length != 0) {
            this.resultCalculation.removeAt(0);
        }
        if (this.tableField.get('resultCalculation').controls.length != 0) {
            this.tableField.get('resultCalculation').controls.forEach(function (m) {
                var resultCalculation = _this.ruleEngineService.buildResultCalculation(m.value);
                _this.resultCalculation.push(resultCalculation);
            });
        }
        else {
            this.resultCalculation.push(this.ruleEngineService.buildResultCalculation());
        }
        this.conditionCalculationModal.show();
    };
    SolgenRuleConditionCalculationComponent.prototype.hide = function () {
        this.conditionCalculationModal.hide();
    };
    SolgenRuleConditionCalculationComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__["SolgenRuleEngineService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('conditionCalculationModal', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], SolgenRuleConditionCalculationComponent.prototype, "conditionCalculationModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], SolgenRuleConditionCalculationComponent.prototype, "resultForm", void 0);
    SolgenRuleConditionCalculationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-solgen-rule-condition-calculation',
            template: __importDefault(__webpack_require__(/*! raw-loader!./solgen-rule-condition-calculation.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./solgen-rule-condition-calculation.component.scss */ "./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__["SolgenRuleEngineService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], SolgenRuleConditionCalculationComponent);
    return SolgenRuleConditionCalculationComponent;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-condition.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/component/solgen-rule-engine-condition.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: SolgenRuleEngineConditionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineConditionComponent", function() { return SolgenRuleEngineConditionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../solgen-rule-engine.service */ "./src/app/views/solgen-rule-engine/solgen-rule-engine.service.ts");
/* harmony import */ var _solgen_rule_condition_calculation_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./solgen-rule-condition-calculation.component */ "./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var SolgenRuleEngineConditionComponent = /** @class */ (function () {
    function SolgenRuleEngineConditionComponent(ruleEngineService, commonService) {
        this.ruleEngineService = ruleEngineService;
        this.commonService = commonService;
        this.SelectedValue = [];
        this.newAdd = "Add";
        this.subModuleList = [];
        this.sqlConditionOperators = ['Or', 'And'];
        this.hideFieldList = true;
        this.textFieldListButton = " Show Feild List";
        this.moduleAlias = '';
    }
    SolgenRuleEngineConditionComponent.prototype.ngOnChanges = function () {
        // this.getSubModuleList();
        this.moduleAlias = this.customFieldsList && this.customFieldsList.length > 0 ? this.customFieldsList[0].subModuleAlias : '';
        this.initForm();
        this.onConditionChange();
        if (this.target.get('isConditionAdded').value) {
            this.prepareEditConditionForm();
        }
    };
    SolgenRuleEngineConditionComponent.prototype.ngOnInit = function () {
        //this.onConditionChange();
    };
    //show and hide table field list
    SolgenRuleEngineConditionComponent.prototype.showFieldList = function () {
        this.hideFieldList = !this.hideFieldList;
        this.textFieldListButton = this.hideFieldList ? " Show Field List" : "Hide Field List";
    };
    SolgenRuleEngineConditionComponent.prototype.initForm = function () {
        this.targetForm = this.ruleEngineService.buildTarget();
    };
    //fetch section form field list on section change
    SolgenRuleEngineConditionComponent.prototype.onSubModuleChange = function (event, control) {
        var _this = this;
        if (typeof event !== 'undefined') {
            this.ruleEngineService.GetCustomFieldsListBySubModuleId(this.ruleEngineForm.get('moduleId').value.value, event.sub_module_id).subscribe(function (m) {
                if (m) {
                    var tableFields = m.data.map(function (f) {
                        return {
                            PrimaryTableColumn: f.PrimaryTableColumn,
                            actual_data_type: f.actual_data_type,
                            display_name: f.display_name,
                            form_field_id: f.form_field_id,
                            dt_code: f.dt_code,
                            name: f.name,
                            select_options: f.select_options,
                            table_name: f.table_name,
                            table_alias: f.table_alias,
                            sub_module_id: f.sub_module_id
                        };
                    });
                    control.get('fieldId').setValue(null);
                    control.get('subModuleId').setValue(event.sub_module_id);
                    control.get('operatorId').setValue(null);
                    control.get('subModuleAlias').setValue(null);
                    control.get('operators').setValue(null);
                    control.get('fieldValue').setValue(null);
                    control.get('fields').setValue(tableFields);
                    control.get('subModuleAlias').setValue(tableFields[0].table_alias);
                    _this.customFieldsList = m.data;
                }
                else {
                    control.get('fields').setValue(null);
                    control.get('fieldId').setValue(null);
                    control.get('operatorId').setValue(null);
                    control.get('subModuleAlias').setValue(null);
                    control.get('operators').setValue(null);
                    control.get('fieldValue').setValue(null);
                    _this.customFieldsList = null;
                }
            });
        }
        else {
            control.get('fieldId').setValue(null);
            control.get('operatorId').setValue(null);
            control.get('subModuleAlias').setValue(null);
            control.get('operators').setValue(null);
            control.get('fieldValue').setValue(null);
            control.get('fields').setValue([]);
        }
    };
    //show target condition popup on "Add Target" click
    SolgenRuleEngineConditionComponent.prototype.showConditionModal = function () {
        this.addConditionModel.show();
    };
    //hide target condition popup modal on cancel click
    SolgenRuleEngineConditionComponent.prototype.hideConditionModal = function () {
        this.addConditionModel.hide();
    };
    //on condition FormArray change to fetch prepare condition
    SolgenRuleEngineConditionComponent.prototype.onConditionChange = function () {
        var _this = this;
        this.conditions.valueChanges.subscribe(function (condition) {
            var displayCondition = '';
            var databaseCondition = '';
            condition.forEach(function (obj) {
                if (obj.relationWithParent != null) {
                    displayCondition += " " + obj.relationWithParent.toLowerCase() + " ";
                    databaseCondition += " " + obj.relationWithParent.toLowerCase() + " ";
                }
                if (obj.openingBrackets != null) {
                    displayCondition += obj.openingBrackets;
                    databaseCondition += obj.openingBrackets;
                }
                if (obj.fieldId != null) {
                    var fieldObj = obj.fieldId;
                    displayCondition += fieldObj.PrimaryTableColumn;
                    if (fieldObj.actual_data_type != 'table') {
                        if (fieldObj.dt_code.includes('text')) {
                            databaseCondition += "isnull(" + obj.subModuleAlias + "." + fieldObj.PrimaryTableColumn + ",'0')";
                        }
                        else if (fieldObj.dt_code.includes('select')) {
                            databaseCondition += "isnull(" + obj.subModuleAlias + "." + fieldObj.PrimaryTableColumn + ",'0')";
                        }
                        else if (fieldObj.dt_code.includes('boolean')) {
                            databaseCondition += "isnull(" + obj.subModuleAlias + "." + fieldObj.PrimaryTableColumn + ",0)";
                        }
                        else if (fieldObj.dt_code.includes('bigint') || fieldObj.dt_code.includes('int') || fieldObj.dt_code.includes('decimal')) {
                            databaseCondition += "isnull(" + obj.subModuleAlias + "." + fieldObj.PrimaryTableColumn + ",0)";
                        }
                        else {
                            databaseCondition += obj.subModuleAlias + "." + fieldObj.PrimaryTableColumn;
                        }
                    }
                }
                var operatorExpression = '';
                if (obj.operatorId != null) {
                    var operator = obj.operatorId;
                    displayCondition += " " + operator.operator_display_name;
                    databaseCondition += " " + operator.operator_expression.toUpperCase();
                    operatorExpression = operator.operator_expression.toUpperCase();
                }
                if (obj.fieldValue != null) {
                    var fieldObj_1 = obj.fieldId;
                    if (obj.fieldId != null && fieldObj_1.actual_data_type != 'table') {
                        if (fieldObj_1 != null) {
                            if (obj.conditionsId.value == 2) {
                                if (operatorExpression == 'IN') {
                                    displayCondition += "(" + obj['fieldValue'].map(function (m) { return "'" + m.name + "'"; }).join() + ")";
                                    databaseCondition += " (" + obj['fieldValue'].map(function (m) { return "'" + m.table_name + "' '" + m.PrimaryTableColumn + "'"; }).join() + ")";
                                }
                                else {
                                    displayCondition += " " + obj['fieldValue'].name; //Is comapre
                                    databaseCondition += " " + (obj['fieldValue'].table_name + '.' + obj['fieldValue'].PrimaryTableColumn);
                                }
                            }
                            else if (fieldObj_1.dt_code.includes('text')) {
                                if (operatorExpression == 'LIKE') {
                                    displayCondition += " '" + obj.fieldValue + "'";
                                    databaseCondition += " '%" + obj.fieldValue + "%'";
                                }
                                else if (operatorExpression == 'IN') {
                                    displayCondition += " (" + obj.fieldValue + ")";
                                    databaseCondition += " (" + obj.fieldValue + ")";
                                }
                                else {
                                    displayCondition += " '" + obj.fieldValue + "'";
                                    databaseCondition += " '" + obj.fieldValue + "'";
                                }
                            }
                            else if (fieldObj_1.dt_code.includes('date')) {
                                if (operatorExpression == 'BETWEEN') {
                                    var secondValue = '';
                                    if (typeof obj.fieldSecondValue != 'undefined') {
                                        secondValue = new Date(obj.fieldSecondValue).toLocaleDateString();
                                    }
                                    displayCondition += " '" + new Date(obj.fieldValue).toLocaleDateString() + "' and '" + secondValue + "'";
                                    databaseCondition += " '" + new Date(obj.fieldValue).toLocaleDateString() + "' and '" + secondValue + "'";
                                }
                                else {
                                    displayCondition += " '" + new Date(obj.fieldValue).toLocaleDateString() + "'";
                                    databaseCondition += " '" + new Date(obj.fieldValue).toLocaleDateString() + "'";
                                }
                            }
                            else if (fieldObj_1['dt_code'].includes('select')) {
                                if (Array.isArray(obj['fieldValue'])) {
                                    displayCondition += " (" + obj['fieldValue'].map(function (m) { return "'" + m.name + "'"; }).join() + ")";
                                    databaseCondition += " (" + obj['fieldValue'].map(function (m) { return (fieldObj_1['actual_data_type'].includes('varchar') ? "'" + m.value + "'" : "" + m.value); }).join() + ")";
                                }
                                else {
                                    displayCondition += " '" + obj['fieldValue'].name + "'";
                                    databaseCondition += " '" + obj['fieldValue'].value + "'";
                                }
                            }
                            else if (fieldObj_1['dt_code'].includes('boolean')) {
                                displayCondition += ' ' + obj['fieldValue'];
                                databaseCondition += ' ' + (obj['fieldValue'] == true ? 1 : 0);
                            }
                            else {
                                if (operatorExpression == 'BETWEEN') {
                                    displayCondition += " " + obj['fieldValue'] + " and " + obj['fieldSecondValue'];
                                    databaseCondition += " " + obj['fieldValue'] + " and " + obj['fieldSecondValue'];
                                }
                                else if (operatorExpression == 'IN') {
                                    displayCondition += " (" + obj['fieldValue'] + ")";
                                    databaseCondition += " (" + obj['fieldValue'] + ")";
                                }
                                displayCondition += " (" + obj['fieldValue'] + ")";
                                databaseCondition += " (" + obj['fieldValue'] + ")";
                            }
                        }
                    }
                    else {
                        try {
                            if (Array.isArray(obj.fieldValue)) {
                                displayCondition += " '" + fieldObj_1.PrimaryTableColumn + " (" + obj['fieldValue'].map(function (m) { return "'" + m.name + "'"; }).join() + ")";
                                databaseCondition += " " + obj.subModuleAlias + "." + fieldObj_1.PrimaryTableColumn + ", (" + obj['fieldValue'].map(function (m) { return (fieldObj_1['actual_data_type'].includes('varchar') ? "'" + m.value + "'" : "" + m.value); }).join() + "))";
                            }
                            else {
                                displayCondition += " '" + obj['fieldValue'].name + "'";
                                databaseCondition += " " + obj.subModuleAlias + "." + fieldObj_1.PrimaryTableColumn + ", '" + obj['fieldValue'].value + "')";
                            }
                        }
                        catch (ex) {
                            console.log(ex.message);
                        }
                    }
                }
                if (obj['closingBrackets'] != null) {
                    displayCondition += obj['closingBrackets'] + ' ';
                    databaseCondition += obj['closingBrackets'] + ' ';
                }
            });
            _this.targetForm.get('targetCondition').patchValue({
                displayCondition: displayCondition,
                database_condition: databaseCondition
            });
        });
    };
    Object.defineProperty(SolgenRuleEngineConditionComponent.prototype, "conditions", {
        get: function () {
            return this.targetForm.get('conditions');
        },
        enumerable: true,
        configurable: true
    });
    //add new condition on add click
    SolgenRuleEngineConditionComponent.prototype.addCondition = function (event) {
        var condition = this.ruleEngineService.buidCondition();
        condition.get('subModuleAlias').setValue(this.moduleAlias);
        this.conditions.push(condition);
        this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(event.target.value);
        this.addNewCondition.nativeElement.value = "Add";
    };
    SolgenRuleEngineConditionComponent.prototype.onOperatorChange = function (event, control, i) {
        if (typeof event !== 'undefined') {
            this.SelectedValue.push(event);
            control.get('conditionsId').setValue(null);
            if (typeof event !== 'undefined') {
                control.conditionOperatorsValue = null;
                this.sortConditionOperatoers(control, control.value.fieldId.dt_code);
            }
        }
        else {
            control.get('conditionsId').setValue(null);
            control.get('conditions').setValue([]);
        }
    };
    SolgenRuleEngineConditionComponent.prototype.sortConditionOperatoers = function (control, dt_code) {
        if (dt_code == 'text' || dt_code == 'textbox' || dt_code == 'textarea' || dt_code == 'select'
            || dt_code == 'date' || dt_code == 'datetime' || dt_code == 'checkbox' || dt_code == 'radio' || dt_code == 'boolean' || dt_code == 'image') {
            control.get('conditions').setValue([]);
            control.get('conditions').setValue([{ name: 'Is Value', value: '1' }, { name: 'Is Compare', value: '2' }]);
        }
        else if (dt_code == 'bigint' || dt_code == 'int' || dt_code == 'number' || dt_code == 'decimal') {
            control.get('conditions').setValue([]);
            control.get('conditions').setValue([{ name: 'Is Value', value: '1' }, { name: 'Is Compare', value: '2' }, { name: 'Is Calculate', value: '3' }]);
        }
    };
    SolgenRuleEngineConditionComponent.prototype.CalculationModal = function (tableField) {
        this.resultCalculationModal.show(tableField, this.ruleEngineForm.get('moduleId').value.value, this.ruleEngineForm.get('subModuleId').value.sub_module_id, this.customFieldsList);
        tableField.get('fieldValue').valueChanges.subscribe(function (m) {
            console.log('values updated');
        });
    };
    //fetch operator list on field change.
    SolgenRuleEngineConditionComponent.prototype.onFieldChange = function (event, control, i) {
        if (typeof event !== 'undefined') {
            this.SelectedValue.push(event);
            control.get('operatorId').setValue(null);
            control.get('conditionsId').setValue(null);
            this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(function (m) {
                control.get('operators').setValue(m);
            });
            control.get('subModuleAlias').setValue(event.subModuleAlias);
            control.get('subModuleId').setValue(event.sub_module_id);
        }
        else {
            control.get('operatorId').setValue(null);
            control.get('operators').setValue([]);
            control.get('conditionsId').setValue(null);
            control.get('conditions').setValue([]);
        }
    };
    Object.defineProperty(SolgenRuleEngineConditionComponent.prototype, "operators", {
        get: function () {
            return this.conditions.get('operators');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolgenRuleEngineConditionComponent.prototype, "fields", {
        get: function () {
            return this.conditions.get('fields');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolgenRuleEngineConditionComponent.prototype, "tableFields", {
        get: function () {
            return this.conditions.get('tableFields');
        },
        enumerable: true,
        configurable: true
    });
    SolgenRuleEngineConditionComponent.prototype.removeCondition = function (conditionIndex) {
        //this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(null);
        this.conditions.removeAt(conditionIndex);
    };
    Object.defineProperty(SolgenRuleEngineConditionComponent.prototype, "targets", {
        get: function () {
            return this.ruleEngineForm.get('targets');
        },
        enumerable: true,
        configurable: true
    });
    //prepare edit condition form
    SolgenRuleEngineConditionComponent.prototype.prepareEditConditionForm = function () {
        var _this = this;
        var editTargetForm = this.targets.at(this.rowNo);
        console.log('editTargetForm: ', editTargetForm);
        this.targetForm.patchValue({
            targetId: editTargetForm.value.targetId,
            isConditionAdded: editTargetForm.value.isConditionAdded,
            targetCondition: editTargetForm.value.targetCondition,
            isResultAdded: editTargetForm.value.isResultAdded,
            results: editTargetForm.value.results
        });
        if (this.conditions) {
            while (this.conditions.length != 0) {
                this.conditions.removeAt(0);
            }
            editTargetForm.get('conditions').controls.forEach(function (m) {
                _this.conditions.push(m);
            });
        }
    };
    //fill data in target form and show condition popup modal.
    SolgenRuleEngineConditionComponent.prototype.editCondition = function () {
        this.prepareEditConditionForm();
        this.showConditionModal();
    };
    SolgenRuleEngineConditionComponent.prototype.TargetConditions = function (index) {
        return this.ruleEngineForm.get('targets').at(index).get('conditions');
    };
    SolgenRuleEngineConditionComponent.prototype.saveCondition = function () {
        var _this = this;
        this.targetForm.get('isConditionAdded').setValue(true);
        this.ruleEngineForm.get('targets').at(this.rowNo).patchValue({
            targetId: this.targetForm.value.targetId,
            isConditionAdded: this.targetForm.value.isConditionAdded,
            targetCondition: this.targetForm.value.targetCondition,
            isResultAdded: this.targetForm.value.isResultAdded,
            results: this.targetForm.value.results
        });
        console.log(this.targetForm.value.targetCondition);
        while (this.TargetConditions(this.rowNo).length != 0) {
            this.TargetConditions(this.rowNo).removeAt(0);
        }
        this.conditions.controls.forEach(function (m) {
            _this.TargetConditions(_this.rowNo).push(m);
        });
        console.log(this.ruleEngineForm.get('targets').at(this.rowNo));
        this.hideConditionModal();
    };
    SolgenRuleEngineConditionComponent.ctorParameters = function () { return [
        { type: _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__["SolgenRuleEngineService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], SolgenRuleEngineConditionComponent.prototype, "ruleEngineForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], SolgenRuleEngineConditionComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], SolgenRuleEngineConditionComponent.prototype, "rowNo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SolgenRuleEngineConditionComponent.prototype, "subModuleId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SolgenRuleEngineConditionComponent.prototype, "customFieldsList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SolgenRuleEngineConditionComponent.prototype, "vwRuleId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addNewCondition', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], SolgenRuleEngineConditionComponent.prototype, "addNewCondition", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addConditionModal', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ModalDirective"])
    ], SolgenRuleEngineConditionComponent.prototype, "addConditionModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resultCalculationModal', { static: false }),
        __metadata("design:type", _solgen_rule_condition_calculation_component__WEBPACK_IMPORTED_MODULE_5__["SolgenRuleConditionCalculationComponent"])
    ], SolgenRuleEngineConditionComponent.prototype, "resultCalculationModal", void 0);
    SolgenRuleEngineConditionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-solgen-rule-engine-condition',
            template: __importDefault(__webpack_require__(/*! raw-loader!./solgen-rule-engine-condition.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-condition.component.html")).default,
        }),
        __metadata("design:paramtypes", [_solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__["SolgenRuleEngineService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"]])
    ], SolgenRuleEngineConditionComponent);
    return SolgenRuleEngineConditionComponent;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-calculation.component.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-calculation.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: SolgenRuleEngineResultCalculationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineResultCalculationComponent", function() { return SolgenRuleEngineResultCalculationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../solgen-rule-engine.service */ "./src/app/views/solgen-rule-engine/solgen-rule-engine.service.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var SolgenRuleEngineResultCalculationComponent = /** @class */ (function () {
    function SolgenRuleEngineResultCalculationComponent(commonService, ruleEngineService, fb) {
        this.commonService = commonService;
        this.ruleEngineService = ruleEngineService;
        this.fb = fb;
        this.displayValue = '';
        this.databaseValue = '';
        this.sqlFunctionList = [];
        this.dateParts = ['Day', 'Month', 'Quarter', 'Year'];
        this.sectionList = [];
        this.operators = [];
        this.isDate = false;
    }
    SolgenRuleEngineResultCalculationComponent.prototype.ngOnChanges = function () {
    };
    SolgenRuleEngineResultCalculationComponent.prototype.ngOnInit = function () {
        this.getSubModules();
        this.resultConditionForm = this.fb.group({
            resultCalculation: this.fb.array([this.ruleEngineService.buildResultCalculation()])
        });
        this.onResultCalculationFormChange();
    };
    Object.defineProperty(SolgenRuleEngineResultCalculationComponent.prototype, "resultCalculation", {
        get: function () {
            return this.resultConditionForm.get('resultCalculation');
        },
        enumerable: true,
        configurable: true
    });
    SolgenRuleEngineResultCalculationComponent.prototype.getSqlFunctionList = function (functionType) {
        var _this = this;
        this.commonService.GetSqlFunctionList(functionType).subscribe(function (m) {
            _this.sqlFunctionList = m;
        });
    };
    SolgenRuleEngineResultCalculationComponent.prototype.getSubModules = function () {
        var _this = this;
        this.ruleEngineService.getSubModules(this.moduleId).subscribe(function (m) {
            _this.sectionList = m.filter(function (a) { return a.module_name_code != 'loanapplication'; });
        });
    };
    SolgenRuleEngineResultCalculationComponent.prototype.onFirstSectionChange = function (event, field) {
        var _this = this;
        if (event) {
            this.ruleEngineService.GetCustomFieldsListBySubModuleId(this.moduleId, event.sub_module_id).subscribe(function (m) {
                if (m) {
                    var tableFiledList = [];
                    if (!_this.isDate) {
                        tableFiledList = m.data.filter(function (f) { return f.dt_code != 'select' && f.dt_code != 'text' && f.dt_code != 'boolean' && f.dt_code != 'date' && f.dt_code != 'datetime'; }).map(function (f) {
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
                            };
                        });
                    }
                    else {
                        tableFiledList = m.data.filter(function (f) { return (f.dt_code == 'date' || f.dt_code == 'datetime'); }).map(function (f) {
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
                            };
                        });
                    }
                    console.log(tableFiledList);
                    console.log(field);
                    field.get('firstFields').setValue(tableFiledList);
                    console.log(field.get('firstFields').value);
                }
            });
        }
        field.get('firstFieldId').setValue(null);
        field.get('firstFieldValue').setValue(null);
    };
    SolgenRuleEngineResultCalculationComponent.prototype.onSecondSectionChange = function (event, field) {
        var _this = this;
        if (event) {
            this.ruleEngineService.GetCustomFieldsListBySubModuleId(this.moduleId, event.sub_module_id).subscribe(function (m) {
                if (m) {
                    var tableFiledList = [];
                    if (!_this.isDate) {
                        tableFiledList = m.data.filter(function (f) { return f.dt_code != 'select' && f.dt_code != 'text' && f.dt_code != 'boolean' && f.dt_code != 'date' && f.dt_code != 'datetime'; }).map(function (f) {
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
                            };
                        });
                    }
                    else {
                        tableFiledList = m.data.filter(function (f) { return (f.dt_code == 'date' || f.dt_code == 'datetime'); }).map(function (f) {
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
                            };
                        });
                    }
                    field.get('secondFields').setValue(tableFiledList);
                }
            });
        }
        field.get('secondFieldId').setValue(null);
        field.get('secondFieldValue').setValue(null);
    };
    SolgenRuleEngineResultCalculationComponent.prototype.addField = function () {
        this.resultCalculation.push(this.ruleEngineService.buildResultCalculation());
    };
    SolgenRuleEngineResultCalculationComponent.prototype.onResultCalculationFormChange = function () {
        var _this = this;
        this.resultCalculation.valueChanges.subscribe(function (m) {
            if (m) {
                _this.databaseValue = '';
                _this.displayValue = '';
                m.forEach(function (f) {
                    if (!_this.isDate) {
                        if (f.formulaId) {
                            _this.databaseValue += f.formulaId.FunctionName;
                            _this.displayValue += f.formulaId.DisplayName;
                        }
                        if (f.openingBrackets != '') {
                            _this.databaseValue += f.openingBrackets;
                            _this.displayValue += f.openingBrackets;
                        }
                        if (f.firstFieldId) {
                            _this.databaseValue += "isnull(" + f.firstFieldId.table_alias + "." + f.firstFieldId.PrimaryTableColumn + ",0)";
                            _this.displayValue += "" + f.firstFieldId.PrimaryTableColumn;
                        }
                        if (f.firstFieldValue) {
                            _this.databaseValue += "" + f.firstFieldValue;
                            _this.displayValue += "" + f.firstFieldValue;
                        }
                        if (f.closingBrackets != '') {
                            _this.databaseValue += f.closingBrackets;
                            _this.displayValue += f.closingBrackets;
                        }
                        if (f.operatorId) {
                            console.log('operator: ', f.operatorId);
                            if (f.operatorId.operator_expression) {
                                _this.databaseValue += "" + f.operatorId.operator_expression;
                                _this.displayValue += "" + f.operatorId.operator_expression;
                            }
                        }
                    }
                    else {
                        if (f.formulaId) {
                            _this.databaseValue += f.formulaId.FunctionName;
                            _this.displayValue += f.formulaId.DisplayName;
                            if (f.datePart) {
                                _this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', f.datePart);
                                console.log(f.formulaId.FunctionName.replace('{DATEPART}', f.datePart));
                                _this.displayValue = f.datePart + ",";
                            }
                            if (f.firstFieldValue) {
                                _this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', f.datePart).replace('{VALUE}', f.firstFieldValue);
                                _this.displayValue = _this.databaseValue;
                            }
                            if (f.secondFieldId) {
                                _this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', f.datePart).replace('{VALUE}', f.firstFieldValue).replace('{FROMDATE}', "isnull(" + f.secondFieldId.table_alias + "." + f.secondFieldId.PrimaryTableColumn + ",getutcdate())");
                                _this.displayValue = _this.databaseValue;
                            }
                            else {
                                _this.databaseValue = f.formulaId.FunctionName.replace('{DATEPART}', (f.datePart == null ? 'minute' : f.datePart)).replace('{VALUE}', (f.firstFieldValue == null ? 0 : f.firstFieldValue)).replace('{FROMDATE}', "getutcdate()");
                                _this.displayValue = _this.databaseValue;
                            }
                        }
                    }
                });
                console.log('display : database >', _this.displayValue, ' : ', _this.databaseValue);
            }
        });
    };
    SolgenRuleEngineResultCalculationComponent.prototype.save = function () {
        var _this = this;
        console.log(1);
        while (this.tableField.get('resultCalculation').length != 0) {
            this.tableField.get('resultCalculation').removeAt(0);
        }
        console.log(2);
        this.resultCalculation.controls.forEach(function (m) {
            _this.tableField.get('resultCalculation').push(m);
        });
        this.tableField.get('fieldDisplayValue').setValue(this.displayValue);
        try {
            this.tableField.get('fieldValue').setValue(this.databaseValue);
        }
        catch (e) {
            this.tableField.get('fieldValue').clearValidators();
            this.tableField.get('fieldValue').updateValueAndValidity();
            this.tableField.get('fieldValue').setValue(null);
        }
        this.hide();
    };
    SolgenRuleEngineResultCalculationComponent.prototype.deleteField = function (index) {
        this.resultCalculation.removeAt(index);
    };
    SolgenRuleEngineResultCalculationComponent.prototype.show = function (tableField) {
        var _this = this;
        this.tableField = tableField;
        this.isDate = (this.tableField.value.fieldId.actual_data_type == 'datetime' || this.tableField.value.fieldId.actual_data_type == 'date');
        var sqlFunctionTypeCode = this.isDate ? 'date' : 'numeric';
        this.getSqlFunctionList(sqlFunctionTypeCode);
        this.commonService.getOperatorsByDataTypeCode(this.tableField.value.fieldId.actual_data_type).subscribe(function (m) {
            _this.operators = m.filter(function (f) { return f.OperatorTypeId === 1; });
        });
        while (this.resultCalculation.length != 0) {
            this.resultCalculation.removeAt(0);
        }
        if (this.tableField.get('resultCalculation').controls.length != 0) {
            this.tableField.get('resultCalculation').controls.forEach(function (m) {
                var resultCalculation = _this.ruleEngineService.buildResultCalculation(m.value);
                _this.resultCalculation.push(resultCalculation);
            });
        }
        else {
            this.resultCalculation.push(this.ruleEngineService.buildResultCalculation());
        }
        this.resultCalculationModal.show();
    };
    SolgenRuleEngineResultCalculationComponent.prototype.hide = function () {
        this.resultCalculationModal.hide();
    };
    SolgenRuleEngineResultCalculationComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_3__["SolgenRuleEngineService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resultCalculationModal', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ModalDirective"])
    ], SolgenRuleEngineResultCalculationComponent.prototype, "resultCalculationModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], SolgenRuleEngineResultCalculationComponent.prototype, "resultForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], SolgenRuleEngineResultCalculationComponent.prototype, "moduleId", void 0);
    SolgenRuleEngineResultCalculationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-solgen-rule-engine-result-calculation',
            template: __importDefault(__webpack_require__(/*! raw-loader!./solgen-rule-engine-result-calculation.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-calculation.component.html")).default,
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_3__["SolgenRuleEngineService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], SolgenRuleEngineResultCalculationComponent);
    return SolgenRuleEngineResultCalculationComponent;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-table-field.component.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-table-field.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: SolgenRuleEngineResultTableFieldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineResultTableFieldComponent", function() { return SolgenRuleEngineResultTableFieldComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../solgen-rule-engine.service */ "./src/app/views/solgen-rule-engine/solgen-rule-engine.service.ts");
/* harmony import */ var _solgen_rule_condition_calculation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./solgen-rule-condition-calculation.component */ "./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var SolgenRuleEngineResultTableFieldComponent = /** @class */ (function () {
    function SolgenRuleEngineResultTableFieldComponent(ruleEngineService) {
        this.ruleEngineService = ruleEngineService;
        this.subModuleId = '';
        this.moduleId = '';
        this.tableFieldList = [];
        this.operators = [];
    }
    SolgenRuleEngineResultTableFieldComponent.prototype.ngOnChanges = function () {
        // this.getSubModuleList();
        if (this.resultForm.value.tableFields.length != 0) {
            this.tableFieldList = this.resultForm.value.tableFields[0].fieldList;
        }
    };
    SolgenRuleEngineResultTableFieldComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(SolgenRuleEngineResultTableFieldComponent.prototype, "tableFields", {
        get: function () {
            return this.resultForm.get('tableFields');
        },
        enumerable: true,
        configurable: true
    });
    SolgenRuleEngineResultTableFieldComponent.prototype.onFieldCalculateChange = function (event, tableField) {
        if (typeof event !== 'undefined') {
            tableField.get('conditionsId').setValue(null);
            if (typeof event !== 'undefined') {
                tableField.conditionOperatorsValue = null;
                this.sortConditionOperatoers(tableField, tableField.value.fieldId.dt_code);
                tableField.get('subModuleId').setValue(event.sub_module_id);
            }
        }
        else {
            tableField.get('conditionsId').setValue(null);
            tableField.get('conditions').setValue([]);
        }
        tableField.get('dataType').setValue(event.actual_data_type);
        tableField.get('name').setValue(event);
        tableField.get('fieldValue').setValue(null);
        tableField.get('fieldDisplayValue').setValue(null);
        if (tableField.get('resultCalculation').length != 0) {
            tableField.get('resultCalculation').removeAt(0);
        }
    };
    SolgenRuleEngineResultTableFieldComponent.prototype.sortConditionOperatoers = function (tableField, dt_code) {
        if (dt_code == 'text' || dt_code == 'textbox' || dt_code == 'textarea' || dt_code == 'select'
            || dt_code == 'date' || dt_code == 'datetime' || dt_code == 'checkbox' || dt_code == 'radio' || dt_code == 'boolean' || dt_code == 'image') {
            tableField.get('conditions').setValue([]);
            tableField.get('conditions').setValue([{ name: 'Is Value', value: '1' }, { name: 'Is Compare', value: '2' }]);
        }
        else if (dt_code == 'bigint' || dt_code == 'int' || dt_code == 'number' || dt_code == 'decimal') {
            tableField.get('conditions').setValue([]);
            tableField.get('conditions').setValue([{ name: 'Is Value', value: '1' }, { name: 'Is Compare', value: '2' }, { name: 'Is Calculate', value: '3' }]);
        }
    };
    SolgenRuleEngineResultTableFieldComponent.prototype.CalculationModal = function (tableField) {
        this.resultCalculation.show(tableField, '', this.subModuleId, this.customFieldsList);
        tableField.get('fieldValue').valueChanges.subscribe(function (m) {
            console.log('values updated');
        });
    };
    SolgenRuleEngineResultTableFieldComponent.prototype.addTableField = function () {
        this.tableFields.push(this.ruleEngineService.buildResultTableField(null));
    };
    SolgenRuleEngineResultTableFieldComponent.prototype.removeTableField = function (tableFieldindex) {
        this.tableFields.removeAt(tableFieldindex);
    };
    SolgenRuleEngineResultTableFieldComponent.ctorParameters = function () { return [
        { type: _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_2__["SolgenRuleEngineService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"])
    ], SolgenRuleEngineResultTableFieldComponent.prototype, "resultForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], SolgenRuleEngineResultTableFieldComponent.prototype, "subModuleId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], SolgenRuleEngineResultTableFieldComponent.prototype, "moduleId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SolgenRuleEngineResultTableFieldComponent.prototype, "customFieldsList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("resultCalculationModal", { static: false }),
        __metadata("design:type", _solgen_rule_condition_calculation_component__WEBPACK_IMPORTED_MODULE_3__["SolgenRuleConditionCalculationComponent"])
    ], SolgenRuleEngineResultTableFieldComponent.prototype, "resultCalculation", void 0);
    SolgenRuleEngineResultTableFieldComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-solgen-rule-engine-result-table-field',
            template: __importDefault(__webpack_require__(/*! raw-loader!./solgen-rule-engine-result-table-field.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-table-field.component.html")).default,
        }),
        __metadata("design:paramtypes", [_solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_2__["SolgenRuleEngineService"]])
    ], SolgenRuleEngineResultTableFieldComponent);
    return SolgenRuleEngineResultTableFieldComponent;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: SolgenRuleEngineResultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineResultComponent", function() { return SolgenRuleEngineResultComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../solgen-rule-engine.service */ "./src/app/views/solgen-rule-engine/solgen-rule-engine.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var SolgenRuleEngineResultComponent = /** @class */ (function () {
    function SolgenRuleEngineResultComponent(fb, ruleEngineService, commonService) {
        this.fb = fb;
        this.ruleEngineService = ruleEngineService;
        this.commonService = commonService;
        this.editIndex = -1;
        this.moduleId = '';
    }
    SolgenRuleEngineResultComponent.prototype.ngOnChanges = function () {
        this.moduleId = this.ruleEngineForm.get('moduleId').value.value;
        this.getSubModules();
    };
    SolgenRuleEngineResultComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.clearTableFields();
        this.getResultActions();
    };
    SolgenRuleEngineResultComponent.prototype.onActionChange = function (event) {
        this.clearTableFields();
        if (typeof event !== 'undefined') {
            this.resultForm.get('actionId').setValue(event.resultActionId);
            this.prepareActionChangeContent(event.code, true);
        }
    };
    SolgenRuleEngineResultComponent.prototype.prepareActionChangeContent = function (code, onChange) {
        if (onChange === void 0) { onChange = false; }
        if (code == 'validation') {
            if (onChange) {
                this.resultForm.get('resultCondition').setValue(null);
            }
            this.resultForm.get('resultCondition').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            this.resultForm.get('resultCondition').updateValueAndValidity();
        }
        else {
            if (onChange) {
                this.resultForm.get('resultCondition').setValue(null);
            }
            this.resultForm.get('resultCondition').clearValidators();
            this.resultForm.get('resultCondition').updateValueAndValidity();
        }
        if (code === 'create') {
            this.tempTableList = this.tableList;
            this.tableList = this.tableList.filter(function (m) { return m.module_name_code == 'LoanApplicationRequiredDocument'; });
        }
        else {
            if (this.tempTableList) {
                this.tableList = this.tempTableList;
            }
        }
        this.resultForm.get('subModuleId').setValue(this.ruleEngineForm.get('subModuleId').value.sub_module_id);
    };
    SolgenRuleEngineResultComponent.prototype.getResultActions = function () {
        var _this = this;
        this.commonService.getResultActions().subscribe(function (m) {
            _this.resultActionList = m;
        });
    };
    SolgenRuleEngineResultComponent.prototype.getSubModules = function () {
        var _this = this;
        this.ruleEngineService.getSubModules(this.ruleEngineForm.get('moduleId').value.value).subscribe(function (m) {
            _this.tableList = m.filter(function (a) { return a.module_name_code != 'loanproduct' && a.module_name_code != 'loanapplication'; });
        });
    };
    SolgenRuleEngineResultComponent.prototype.showResultModal = function () {
        this.editIndex = -1;
        this.addResultModel.show();
        this.resetResultForm();
    };
    SolgenRuleEngineResultComponent.prototype.hideResultModal = function () {
        this.addResultModel.hide();
    };
    Object.defineProperty(SolgenRuleEngineResultComponent.prototype, "results", {
        get: function () {
            return this.target.get('results');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolgenRuleEngineResultComponent.prototype, "tableFields", {
        get: function () {
            return this.resultForm.get('tableFields');
        },
        enumerable: true,
        configurable: true
    });
    SolgenRuleEngineResultComponent.prototype.clearTableFields = function () {
        while (this.tableFields.length !== 0) {
            this.tableFields.removeAt(0);
        }
    };
    SolgenRuleEngineResultComponent.prototype.initForm = function () {
        this.resultForm = this.fb.group({
            resultId: [null],
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            action: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            actionId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            subModuleId: [null],
            fieldList: [null],
            resultCondition: [null],
            tableFields: this.fb.array([this.buildResultTableField()]),
            isEdit: [false]
        });
    };
    SolgenRuleEngineResultComponent.prototype.buildResultTableField = function (tableField) {
        if (tableField === void 0) { tableField = null; }
        var tableFieldGroup = this.fb.group({
            RuleTargetResultConditionId: [null],
            RuleTargetId: [null],
            fieldId: [null],
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fieldSelectList: [],
            displayName: [null],
            dataType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fieldDisplayValue: [null],
            fieldValue: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            showPopUpModal: [false],
            conditions: [],
            conditionsId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            resultCalculation: this.fb.array([this.ruleEngineService.buildResultCalculation()])
        });
        return tableFieldGroup;
    };
    SolgenRuleEngineResultComponent.prototype.editResult = function (index) {
        this.editIndex = index;
        var editResultForm = this.results.at(this.editIndex);
        var formValue = editResultForm;
        this.resultForm = formValue;
        this.resultForm.get('isEdit').setValue(true);
        this.prepareActionChangeContent(editResultForm.get('action').value.code);
        this.addResultModel.show();
    };
    SolgenRuleEngineResultComponent.prototype.saveResult = function () {
        if ((this.resultForm.get('isEdit').value == null || this.resultForm.get('isEdit').value == false) && this.resultForm.valid) {
            this.prepareQuery(this.resultForm);
            this.results.push(this.resultForm);
            this.target.get('isResultAdded').setValue(true);
            this.hideResultModal();
        }
        else if (this.resultForm.get('isEdit').value == true && this.resultForm.valid) {
            this.results.removeAt(this.editIndex);
            this.prepareQuery(this.resultForm);
            this.results.insert(this.editIndex, this.resultForm);
            this.target.get('isResultAdded').setValue(true);
            this.hideResultModal();
        }
        else {
            alert('Invalid');
        }
    };
    SolgenRuleEngineResultComponent.prototype.deleteResultForm = function () {
        if (confirm("Are you sure you want to delete this result?")) {
            this.results.removeAt(this.editIndex);
            this.hideResultModal();
        }
    };
    SolgenRuleEngineResultComponent.prototype.resetResultForm = function () {
        this.initForm();
    };
    SolgenRuleEngineResultComponent.prototype.prepareQuery = function (result) {
        var actionName = result.get('action').value.code;
        if (actionName == 'create') {
            this.createQuery();
        }
        else if (actionName == 'update') {
            this.updateQuery();
        }
    };
    SolgenRuleEngineResultComponent.prototype.createQuery = function () {
        var _this = this;
        var tableName = this.resultForm.value.tableFields[0].fieldId.table_name;
        var columns = '';
        var columnsValue = '';
        var query = "insert into " + tableName + " (";
        this.resultForm.value.tableFields.forEach(function (obj, index) {
            var comma = '';
            if (_this.resultForm.value.tableFields.length != (index + 1)) {
                comma = ', ';
            }
            if (obj.fieldId.dt_code == 'text') {
                columns += "" + obj.name + comma;
                columnsValue += "''" + obj.fieldValue + "''" + comma;
            }
            else if (obj.fieldId.dt_code == 'decimal' || obj.fieldId.dt_code == 'int' || obj.fieldId.dt_code == 'bigint') {
                columns += "" + obj.name + comma;
                columnsValue += "" + obj.fieldValue + comma;
            }
            else if (obj.fieldId.dt_code == 'boolean') {
                columns += "" + obj.name + comma;
                columnsValue += "" + (obj.fieldValue === true ? 1 : 0) + comma;
            }
            else if (obj.fieldId.dt_code == 'date') {
                columns += "" + obj.name + comma;
                columnsValue += "'" + obj.fieldValue + "'" + comma;
            }
            else if (obj.fieldId.dt_code == 'select') {
                columns += "" + obj.name + comma;
                columnsValue += "'" + obj.fieldValue.value + "'" + comma;
            }
        });
        query += columns + ") select " + columnsValue;
        this.resultForm.get('resultCondition').setValue(query);
    };
    SolgenRuleEngineResultComponent.prototype.updateQuery = function () {
        var _this = this;
        var tableName = this.resultForm.value.tableFields[0].fieldId.table_alias;
        var query = 'update ' + tableName + ' set ';
        this.resultForm.value.tableFields.forEach(function (obj, index) {
            var comma = '';
            if (_this.resultForm.value.tableFields.length != (index + 1)) {
                comma = ', ';
            }
            console.log('obj: ', obj);
            if (obj.fieldId.dt_code == 'select') {
                query += tableName + "." + obj.fieldId.name + "='" + obj.fieldValue.value + "'" + comma;
            }
            else if (obj.dataType.includes('char')) {
                query += tableName + "." + obj.fieldId.name + "='" + obj.fieldValue + "'" + comma;
            }
            else if (obj.dataType.includes('decimal') || obj.dataType.includes('int') || obj.dataType.includes('bigint')) {
                query += tableName + "." + obj.fieldId.name + "=" + obj.fieldValue + comma;
            }
            else if (obj.dataType.includes('bit')) {
                query += tableName + "." + obj.fieldId.name + "=" + (obj.fieldValue === true ? 1 : 0) + comma;
            }
            else if (obj.dataType.includes('date') && obj.isCalculate == false) {
                query += tableName + "." + obj.fieldId.name + "='" + obj.fieldValue + "'" + comma;
            }
            else if (obj.dataType.includes('date') && obj.isCalculate == true) {
                if (obj.fieldValue == null) {
                    obj.fieldValue = obj.fieldDisplayValue;
                }
                query += tableName + "." + obj.fieldId.name + "=" + obj.fieldValue + comma;
            }
        });
        this.resultForm.get('resultCondition').setValue(query);
    };
    SolgenRuleEngineResultComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__["SolgenRuleEngineService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], SolgenRuleEngineResultComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], SolgenRuleEngineResultComponent.prototype, "ruleEngineForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SolgenRuleEngineResultComponent.prototype, "customFieldsList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SolgenRuleEngineResultComponent.prototype, "vwRuleId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addResult', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], SolgenRuleEngineResultComponent.prototype, "addResultModel", void 0);
    SolgenRuleEngineResultComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-solgen-rule-engine-result',
            template: __importDefault(__webpack_require__(/*! raw-loader!./solgen-rule-engine-result.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result.component.html")).default,
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__["SolgenRuleEngineService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]])
    ], SolgenRuleEngineResultComponent);
    return SolgenRuleEngineResultComponent;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-target.component.scss":
/*!*********************************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/component/solgen-rule-engine-target.component.scss ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NvbGdlbi1ydWxlLWVuZ2luZS9jb21wb25lbnQvc29sZ2VuLXJ1bGUtZW5naW5lLXRhcmdldC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-target.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/component/solgen-rule-engine-target.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: SolgenRuleEngineTargetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineTargetComponent", function() { return SolgenRuleEngineTargetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var SolgenRuleEngineTargetComponent = /** @class */ (function () {
    function SolgenRuleEngineTargetComponent() {
        this.deleteTargetEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    SolgenRuleEngineTargetComponent.prototype.ngOnInit = function () {
    };
    SolgenRuleEngineTargetComponent.prototype.deleteTarget = function () {
        this.deleteTargetEvent.emit();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], SolgenRuleEngineTargetComponent.prototype, "deleteTargetEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SolgenRuleEngineTargetComponent.prototype, "vwRuleId", void 0);
    SolgenRuleEngineTargetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-solgen-rule-engine-target',
            template: __importDefault(__webpack_require__(/*! raw-loader!./solgen-rule-engine-target.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/component/solgen-rule-engine-target.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./solgen-rule-engine-target.component.scss */ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-target.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], SolgenRuleEngineTargetComponent);
    return SolgenRuleEngineTargetComponent;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/solgen-rule-engine-add-or-edit.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/solgen-rule-engine-add-or-edit.component.ts ***!
  \**************************************************************************************/
/*! exports provided: SolgenRuleEngineAddOrEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineAddOrEditComponent", function() { return SolgenRuleEngineAddOrEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _bank_bank_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../bank/bank.service */ "./src/app/views/bank/bank.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./solgen-rule-engine.service */ "./src/app/views/solgen-rule-engine/solgen-rule-engine.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









var SolgenRuleEngineAddOrEditComponent = /** @class */ (function () {
    function SolgenRuleEngineAddOrEditComponent(ruleEngineService, fb, router, toaster, route, commonService, bankService) {
        this.ruleEngineService = ruleEngineService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.bankService = bankService;
        this.ruleEngineVersionList = [];
        this.ruleEngineVersionListForChange = [];
        this.selectedApplication = [];
        this.selectedOldApplication = [];
        this.events = [];
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["SelectionType"];
        this.loadSave = false;
        this.isEditEvent = true;
        this.isGlobalRuleType = true;
        this.editFromVersion = false;
        this.laPagedData = {
            pager: {},
            data: []
        };
        this.loanApplicationlistFiltertext = '';
        this.listFiltertext = '';
        this.laSortColumn = 'CreatedOn';
        this.laSortDir = 'desc';
        this.oldApplicationSortColumn = 'CreatedOn';
        this.oldApplicationSortDir = 'desc';
        this.currentPage = 1;
        this.laPageSizeValue = 10;
        this.loanApplicationPageSizeValue = 10;
        this.batchid = 0;
        this.loading = false;
        this.appmodel = new _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_8__["CheckRuleName"]();
        this.bankList = [];
        this.isSubmitButtonDisabled = false;
        this.selectedVersionForChange = null;
        this.RuleNameToShow = "";
        this.loanApplicationPageData = {
            pager: {},
            data: []
        };
    }
    SolgenRuleEngineAddOrEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.getModuleList();
        this.onModuleChange();
        this.onSubModuleChange();
        this.route.paramMap.subscribe(function (params) {
            _this.id = params.get('id');
            _this.vwRuleId = params.get('vwRuleId');
            if (_this.id) {
                _this.fillRuleEngineForm(_this.id);
                _this.getPageSizes();
            }
            else if (_this.vwRuleId) {
                _this.ruleEngineForm.controls['name'].disable();
                _this.ruleEngineForm.controls['moduleId'].disable();
                _this.ruleEngineForm.controls['subModuleId'].disable();
                _this.ruleEngineForm.controls['isActive'].disable();
                _this.ruleEngineForm.controls['displayOrder'].disable();
                _this.fillRuleEngineForm(_this.vwRuleId);
                _this.getPageSizes();
            }
            else {
                _this.ruleEngineService.getDisplayOrder().subscribe(function (m) {
                    _this.displayOrder.setValue(m);
                });
                _this.pageTitle = 'Add Rule Engine';
            }
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.fillRuleEngineForm = function (id) {
        var _this = this;
        this.loadSave = true;
        this.pageTitle = 'Edit Rule Engine';
        this.ruleEngineService.GetRuleEngineDetail(id).subscribe(function (result) {
            console.log(result);
            _this.ruleEnginedata = result;
            var rule = _this.ruleEnginedata;
            _this.editPrepare(rule);
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.editPrepare = function (ruleEngine) {
        var _this = this;
        this.isEditEvent = false;
        this.eventName = ruleEngine.EventName;
        this.productName = ruleEngine.ProductName;
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
            ruleEngine.targets.forEach(function (m) {
                _this.targets.push(_this.ruleEngineService.buildTarget(m));
            });
        }
        this.loadSave = false;
    };
    SolgenRuleEngineAddOrEditComponent.prototype.initForm = function () {
        this.ruleEngineForm = this.fb.group({
            ruleId: [""],
            name: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            moduleId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            subModuleId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            eventId: [0, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            isActive: [false],
            ruleVersion: [0],
            displayOrder: [0],
            targets: this.fb.array([this.ruleEngineService.buildTarget()])
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.getModuleList = function () {
        var _this = this;
        this.commonService.getSolgenModulesItemsList('custom_modules_layout').subscribe(function (result) {
            _this.moduleList = _this.commonService.masters;
        });
    };
    Object.defineProperty(SolgenRuleEngineAddOrEditComponent.prototype, "ruleId", {
        get: function () {
            return this.ruleEngineForm.get('ruleId');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolgenRuleEngineAddOrEditComponent.prototype, "name", {
        get: function () {
            return this.ruleEngineForm.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolgenRuleEngineAddOrEditComponent.prototype, "moduleId", {
        get: function () {
            return this.ruleEngineForm.get('moduleId');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolgenRuleEngineAddOrEditComponent.prototype, "subModuleId", {
        get: function () {
            return this.ruleEngineForm.get('subModuleId');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolgenRuleEngineAddOrEditComponent.prototype, "eventId", {
        get: function () {
            return this.ruleEngineForm.get('eventId');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolgenRuleEngineAddOrEditComponent.prototype, "targets", {
        get: function () {
            return this.ruleEngineForm.get('targets');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolgenRuleEngineAddOrEditComponent.prototype, "displayOrder", {
        get: function () {
            return this.ruleEngineForm.get('displayOrder');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolgenRuleEngineAddOrEditComponent.prototype, "ruleVersion", {
        get: function () {
            return this.ruleEngineForm.get('ruleVersion');
        },
        enumerable: true,
        configurable: true
    });
    SolgenRuleEngineAddOrEditComponent.prototype.onEventChange = function (event) {
        this.eventName = event.Name;
        this.isEditEvent = false;
        this.inputProductId = this.productId;
    };
    SolgenRuleEngineAddOrEditComponent.prototype.onModuleChange = function () {
        var _this = this;
        this.moduleId.valueChanges.subscribe(function (m) {
            _this.ruleEngineService.getSubModules(m.value).subscribe(function (s) {
                _this.subModuleList = s; //.filter(a => a.Status_id === 1001 );
            });
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.onSubModuleChange = function () {
        var _this = this;
        this.subModuleId.valueChanges.subscribe(function (m) {
            _this.getSubModuleEventList(m);
            _this.getSubModuleList();
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.getSubModuleList = function () {
        var _this = this;
        var module = this.ruleEngineForm.get('moduleId').value;
        var subModule = this.ruleEngineForm.get('subModuleId').value;
        if (module && subModule) {
            return this.ruleEngineService.GetCustomFieldsListBySubModuleId(module.value, subModule.sub_module_id).subscribe(function (m) {
                if (m) {
                    var tableFields = m.data.map(function (f) {
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
                        };
                    });
                    _this.customFieldsList = tableFields;
                }
            });
        }
    };
    SolgenRuleEngineAddOrEditComponent.prototype.addTarget = function () {
        this.targets.push(this.ruleEngineService.buildTarget());
    };
    SolgenRuleEngineAddOrEditComponent.prototype.deleteTarget = function (targetIndex) {
        if (confirm("Are you sure you want to remove this target?")) {
            this.targets.removeAt(targetIndex);
        }
    };
    SolgenRuleEngineAddOrEditComponent.prototype.editEvent = function () {
        this.isEditEvent = !this.isEditEvent;
    };
    SolgenRuleEngineAddOrEditComponent.prototype.getSubModuleEventList = function (subModule) {
        var _this = this;
        console.log('getSubModuleEventList');
        if (!this.editFromVersion) {
            if (subModule) {
                if (this.resetTarget()) {
                    this.subModule = subModule;
                    this.ruleEngineService.getSubModuleEventList(subModule.sub_module_id).subscribe(function (m) {
                        _this.events = m;
                        console.log(m);
                    });
                }
                else {
                    //this.loanProductId.setValue(this.subModule.sub_module_id);
                }
            }
        }
    };
    SolgenRuleEngineAddOrEditComponent.prototype.showAddTarget = function () {
        if (this.targets.controls.length == 0) {
            return true;
        }
        else if (this.targets.controls[this.targets.controls.length - 1].get('isResultAdded').value) {
            return true;
        }
        else {
            return false;
        }
    };
    SolgenRuleEngineAddOrEditComponent.prototype.resetTarget = function () {
        if (this.eventId.value != 0) {
            if (confirm("Are you sure you want to change form? if you change form, all related data will be lost.")) {
                this.eventName = '';
                this.isEditEvent = true;
                this.eventId.setValue(0);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    SolgenRuleEngineAddOrEditComponent.prototype.createFieldValue = function (c) {
        var fieldValue;
        if (c.fieldValue) {
            if (c.conditionsId.value == '2' && c.operatorId.operator_display_name.includes('multiple') && (c.fieldId.dt_code == 'select' || c.fieldId.dt_code == 'text')) { //Is compare
                fieldValue = c.fieldValue.map(function (m) {
                    return ((c.fieldId.actual_data_type.includes('varchar')
                        || c.fieldId.actual_data_type.includes('table'))
                        ? "'" + m.name + "'" : "" + m.name);
                }).join();
            }
            else {
                fieldValue = c.fieldValue;
            }
            return fieldValue;
        }
    };
    SolgenRuleEngineAddOrEditComponent.prototype.prepareTarget = function () {
        var _this = this;
        return this.targets.value.map(function (t, index) {
            return {
                DisplayOrder: index,
                targetId: t.targetId,
                targetCondition: t.targetCondition,
                conditions: t.conditions.map(function (c, cIndex) {
                    return {
                        DisplayOrder: cIndex,
                        subModuleId: c.subModuleId,
                        conditionId: c.conditionId,
                        relationWithParent: c.relationWithParent,
                        openingBrackets: c.openingBrackets,
                        subModuleAlias: c.subModuleAlias,
                        fieldId: c.fieldId.form_field_id,
                        operatorId: c.operatorId.operator_id,
                        fieldValue: _this.createFieldValue(c),
                        fieldSecondValue: c.fieldSecondValue,
                        conditions: c.conditions,
                        conditionsId: c.conditionsId,
                        closingBrackets: c.closingBrackets,
                        isTime: c.isTime,
                        resultCalculation: c.resultCalculation.map(function (rc, rcIndex) {
                            debugger;
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
                                openingBrackets: rc.openingBrackets,
                            };
                        })
                    };
                }),
                results: t.results.map(function (rr, rrIndex) {
                    return {
                        DisplayOrder: rrIndex,
                        resultId: rr.resultId,
                        name: rr.name,
                        actionId: rr.actionId,
                        subModuleId: rr.subModuleId,
                        resultCondition: rr.resultCondition,
                        tableFields: rr.tableFields.map(function (f, fIndex) {
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
                                resultCalculation: f.resultCalculation.map(function (rc, rcIndex) {
                                    debugger;
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
                                        openingBrackets: rc.openingBrackets,
                                    };
                                })
                            };
                        })
                    };
                }),
            };
        });
        this.editFromVersion = false;
    };
    SolgenRuleEngineAddOrEditComponent.prototype.save = function () {
        var _this = this;
        if (this.ruleEngineForm.valid) {
            this.loadSave = true;
            this.appmodel.RuleId = this.ruleEngineForm.value.ruleId;
            this.appmodel.RuleName = this.ruleEngineForm.value.name;
            console.log(this.ruleEngineForm.value.loanProducts);
            var newTarget = this.prepareTarget();
            var newResultForm_1 = {
                ruleId: this.ruleEngineForm.value.ruleId,
                name: this.ruleEngineForm.value.name,
                moduleId: this.ruleEngineForm.value.moduleId.value,
                subModuleId: this.ruleEngineForm.value.subModuleId.sub_module_id,
                eventId: this.ruleEngineForm.value.eventId,
                isActive: this.ruleEngineForm.value.isActive,
                displayOrder: this.ruleEngineForm.value.displayOrder,
                targets: newTarget,
            };
            console.log('rule form value: ', this.ruleEngineForm.value);
            console.log('new rule form: ', newResultForm_1);
            this.ruleEngineService.checkNameExist(this.appmodel).subscribe(function (result) {
                if (result.statusCode == 201) {
                    _this.toaster.error(result.responseMessage);
                    _this.loadSave = false;
                }
                else {
                    _this.ruleEngineService.addUpdateRuleEngine(newResultForm_1).subscribe(function (result) {
                        if (result.statusCode == 200) {
                            _this.toaster.success(result.responseMessage);
                            _this.loadSave = false;
                            _this.router.navigateByUrl("/solgen-rule-engine");
                        }
                        else {
                            _this.loadSave = false;
                            _this.toaster.error(result.responseMessage);
                        }
                    });
                }
            });
        }
    };
    SolgenRuleEngineAddOrEditComponent.prototype.refreshLA = function (listFor) {
        var _this = this;
        if (listFor === void 0) { listFor = "VERSION"; }
        //this.laPagedData = [];
        this.loading = true;
        if (listFor == 'NEWRULEONOLDAPP') {
            this.loanApplicationlistFiltertext = "";
        }
        else if (listFor == 'VERSION') {
            this.listFiltertext = "";
        }
        var pageSize = (listFor == "VERSION") ? this.laPageSizeValue : this.loanApplicationPageSizeValue;
        var filterText = (listFor == "VERSION") ? this.listFiltertext : this.loanApplicationlistFiltertext;
        this.ruleEngineService.getLoanApplicationListForApplyRule(filterText, this.laSortColumn, this.laSortDir, this.currentPage, pageSize, this.loginuserid, this.batchid, this.id, listFor).subscribe(function (response) {
            if (listFor == 'NEWRULEONOLDAPP') {
                _this.loanApplicationPageData = response;
            }
            else if (listFor == 'VERSION') {
                _this.laPagedData = response;
                setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 200);
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.searchLA = function (listFor) {
        var _this = this;
        if (listFor === void 0) { listFor = "VERSION"; }
        this.loading = true;
        var pageSize = (listFor == "VERSION") ? this.laPageSizeValue : this.loanApplicationPageSizeValue;
        var filterText = (listFor == "VERSION") ? this.listFiltertext : this.loanApplicationlistFiltertext;
        this.ruleEngineService.getLoanApplicationListForApplyRule(filterText, ((listFor == "VERSION") ? this.laSortColumn : this.oldApplicationSortColumn), ((listFor == "VERSION") ? this.laSortDir : this.oldApplicationSortDir), this.currentPage, pageSize, this.loginuserid, this.batchid, this.id, listFor).subscribe(function (response) {
            if (listFor == 'NEWRULEONOLDAPP') {
                _this.loanApplicationPageData = response;
            }
            else if (listFor == 'VERSION') {
                _this.laPagedData = response;
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.onChangeLA = function ($event, listFor) {
        var _this = this;
        if (listFor === void 0) { listFor = "VERSION"; }
        console.log($event);
        this.loading = true;
        var filterText = (listFor == "VERSION") ? this.listFiltertext : this.loanApplicationlistFiltertext;
        this.ruleEngineService.getLoanApplicationListForApplyRule(filterText, ((listFor == "VERSION") ? this.laSortColumn : this.oldApplicationSortColumn), ((listFor == "VERSION") ? this.laSortDir : this.oldApplicationSortDir), this.currentPage, $event.text, this.loginuserid, this.batchid, this.id, listFor).subscribe(function (response) {
            if (listFor == 'NEWRULEONOLDAPP') {
                _this.loanApplicationPageData = response;
            }
            else if (listFor == 'VERSION') {
                _this.laPagedData = response;
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.onSort = function ($event, listFor) {
        var _this = this;
        if (listFor === void 0) { listFor = "VERSION"; }
        var sort = $event.sorts[0];
        if (listFor == "VERSION") {
            this.laSortDir = sort.dir;
            this.laSortColumn = sort.prop;
        }
        else {
            this.oldApplicationSortDir = sort.dir;
            this.oldApplicationSortColumn = sort.prop;
        }
        this.loading = true;
        var pageSize = (listFor == "VERSION") ? this.laPageSizeValue : this.loanApplicationPageSizeValue;
        var filterText = (listFor == "VERSION") ? this.listFiltertext : this.loanApplicationlistFiltertext;
        this.ruleEngineService.getLoanApplicationListForApplyRule(filterText, ((listFor == "VERSION") ? this.laSortColumn : this.oldApplicationSortColumn), ((listFor == "VERSION") ? this.laSortDir : this.oldApplicationSortDir), $event.page, pageSize, this.loginuserid, this.batchid, this.id, listFor).subscribe(function (response) {
            if (listFor == 'NEWRULEONOLDAPP') {
                _this.loanApplicationPageData = response;
            }
            else if (listFor == 'VERSION') {
                _this.laPagedData = response;
            }
            console.log('setPageLA: ', response);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.setPageLA = function ($event, listFor) {
        var _this = this;
        if (listFor === void 0) { listFor = "VERSION"; }
        this.loading = true;
        var pageSize = (listFor == "VERSION") ? this.laPageSizeValue : this.loanApplicationPageSizeValue;
        var filterText = (listFor == "VERSION") ? this.listFiltertext : this.loanApplicationlistFiltertext;
        this.ruleEngineService.getLoanApplicationListForApplyRule(filterText, ((listFor == "VERSION") ? this.laSortColumn : this.oldApplicationSortColumn), ((listFor == "VERSION") ? this.laSortDir : this.oldApplicationSortDir), $event.page, pageSize, this.loginuserid, this.batchid, this.id, listFor).subscribe(function (response) {
            if (listFor == 'NEWRULEONOLDAPP') {
                _this.loanApplicationPageData = response;
            }
            else if (listFor == 'VERSION') {
                _this.laPagedData = response;
            }
            console.log('setPageLA: ', response);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.onActivate = function (event) {
    };
    SolgenRuleEngineAddOrEditComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    SolgenRuleEngineAddOrEditComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.selectedApplication.splice(0, this.selectedApplication.length);
        (_b = this.selectedApplication).push.apply(_b, selected);
    };
    SolgenRuleEngineAddOrEditComponent.prototype.onSelectOldApplication = function (_a) {
        var _b;
        var selected = _a.selected;
        this.selectedOldApplication.splice(0, this.selectedOldApplication.length);
        (_b = this.selectedOldApplication).push.apply(_b, selected);
    };
    SolgenRuleEngineAddOrEditComponent.prototype.makeSubmitButtonDisabled = function () {
        var _this = this;
        var index = this.ruleEngineVersionList.findIndex(function (element, index) {
            if (element.RuleId == _this.id) {
                return true;
            }
        });
        if (index > 0) {
            this.isSubmitButtonDisabled = true;
        }
        else {
            this.isSubmitButtonDisabled = false;
        }
    };
    SolgenRuleEngineAddOrEditComponent.prototype.ApplySelectedVersion = function () {
        var _this = this;
        if (this.selectedApplication.length > 0 && this.selectedVersionForChange > 0) {
            if (confirm("Are you sure you want update rule version of selected application?")) {
                var selectedIds = this.selectedApplication.map(function (m) { return m.Id; }).join(',');
                console.log(selectedIds);
                this.ruleEngineService.ApplyRuleVersion(this.selectedVersionForChange, selectedIds).subscribe(function (m) {
                    if (m) {
                        _this.refreshLA();
                        _this.selectedVersionForChange = null;
                        _this.toaster.success('Version is successfully updated.');
                    }
                    else {
                        _this.toaster.error('Something went wrong. Please try again.');
                    }
                });
            }
        }
        else {
            this.toaster.warning('Application(s) and version is required.');
        }
    };
    SolgenRuleEngineAddOrEditComponent.prototype.OpenLatestRuleOnOldApp = function () {
        var $this = this;
        this.loanApplicationlistFiltertext = "";
        //setTimeout(function () {
        $this.ruleEngineService.getLoanApplicationListForApplyRule(this.loanApplicationlistFiltertext, $this.oldApplicationSortColumn, $this.oldApplicationSortDir, $this.currentPage, $this.loanApplicationPageSizeValue, $this.loginuserid, $this.batchid, $this.id, 'NEWRULEONOLDAPP').subscribe(function (response) {
            $this.loanApplicationPageData = response;
            $this.loading = false;
        }, function (error) {
            $this.loading = false;
        });
        $this.applyLatestRuleOnOldApp.show();
        //}, 100);
    };
    SolgenRuleEngineAddOrEditComponent.prototype.ApplyRuleOnOldApplication = function () {
        var _this = this;
        if (this.selectedOldApplication.length > 0) {
            if (confirm("Are you sure you want to apply this rule to selected application(s)?")) {
                var selectedIds = this.selectedOldApplication.map(function (m) { return m.Id; }).join(',');
                console.log(selectedIds);
                this.ruleEngineService.ApplyRuleVersion(this.id, selectedIds).subscribe(function (m) {
                    if (m) {
                        _this.selectedVersionForChange = null;
                        _this.toaster.success('Rule is successfully Applied.');
                        _this.closeOldApplicationPopup();
                    }
                    else {
                        _this.toaster.error('Something went wrong. Please try again.');
                    }
                });
            }
        }
        else {
            this.toaster.warning('Application(s) is required.');
        }
    };
    SolgenRuleEngineAddOrEditComponent.prototype.closeOldApplicationPopup = function () {
        this.refreshLA("VERSION");
        this.applyLatestRuleOnOldApp.hide();
    };
    SolgenRuleEngineAddOrEditComponent.ctorParameters = function () { return [
        { type: _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_8__["SolgenRuleEngineService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: _bank_bank_service__WEBPACK_IMPORTED_MODULE_6__["BankService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ApplicationPopupForApplyLatestRule', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ModalDirective"])
    ], SolgenRuleEngineAddOrEditComponent.prototype, "applyLatestRuleOnOldApp", void 0);
    SolgenRuleEngineAddOrEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-solgen-rule-engine-add-or-edit',
            template: __importDefault(__webpack_require__(/*! raw-loader!./solgen-rule-engine-add-or-edit.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/solgen-rule-engine-add-or-edit.component.html")).default,
            styles: ["\n  .list-group-item:first-child{\n    border-radius:0px;\n  }\n  .list-group-item:last-child{\n    border-radius:0px;\n  }\n"]
        }),
        __metadata("design:paramtypes", [_solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_8__["SolgenRuleEngineService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _bank_bank_service__WEBPACK_IMPORTED_MODULE_6__["BankService"]])
    ], SolgenRuleEngineAddOrEditComponent);
    return SolgenRuleEngineAddOrEditComponent;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/solgen-rule-engine-list.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/solgen-rule-engine-list.component.scss ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NvbGdlbi1ydWxlLWVuZ2luZS9zb2xnZW4tcnVsZS1lbmdpbmUtbGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/solgen-rule-engine/solgen-rule-engine-list.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/solgen-rule-engine-list.component.ts ***!
  \*******************************************************************************/
/*! exports provided: SolgenRuleEngineListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineListComponent", function() { return SolgenRuleEngineListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _manageform_form_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../manageform/form.service */ "./src/app/views/manageform/form.service.ts");
/* harmony import */ var _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./solgen-rule-engine.service */ "./src/app/views/solgen-rule-engine/solgen-rule-engine.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









var SolgenRuleEngineListComponent = /** @class */ (function () {
    function SolgenRuleEngineListComponent(fb, formservice, commonService, SolgenService, router, toaster, dialogService, route) {
        var _this = this;
        this.fb = fb;
        this.formservice = formservice;
        this.commonService = commonService;
        this.SolgenService = SolgenService;
        this.router = router;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.route = route;
        this.ddlModulelist = [];
        this.ddlSubModulelist = [];
        this.searchUserType = '';
        this.isAddForm = false;
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'RuleId';
        this.listFilter = '';
        this.searchTxt = '';
        this.modulecode = 0;
        this.loadSave = false;
        this.isCompanyTypeFinancialInstitute = false;
        this.companyId = 1004;
        this.userInfo = [];
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["SelectionType"];
        this.selected = [];
        this.rulId = "";
        this.pagedData = {
            pager: {},
            data: []
        };
        this.laPagedData = {
            pager: {},
            data: []
        };
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyid = userdetail.companyId;
        });
    }
    SolgenRuleEngineListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userInfo = JSON.parse(localStorage.getItem('userinfo'));
        this.companyType = this.userInfo["companyType"];
        this.companyId = this.userInfo["companyId"];
        if (this.companyType === "companytypeFinancialInstitute" && this.companyId === 1004) {
            this.isCompanyTypeFinancialInstitute = true;
        }
        this.currentPage = 0;
        this.pageSizeValue = 15;
        // this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
        this.getModuleddl();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.id = id;
        });
    };
    SolgenRuleEngineListComponent.prototype.getModuleddl = function () {
        var _this = this;
        this.formservice.getModuleList().subscribe(function (result) {
            if (result) {
                var _result = JSON.parse(result);
                _this.modulelist = _result.module;
                _this.ddlModulelist = _result.module;
            }
        });
    };
    SolgenRuleEngineListComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    SolgenRuleEngineListComponent.prototype.onModuleSelect = function (event) {
        var _this = this;
        if (event) {
            this.moduleId = event.module_id;
            this.formservice.getSubModuleListByModuleId(this.moduleId).subscribe(function (result) {
                _this.subModuleId = null;
                if (result) {
                    var _result = JSON.parse(result);
                    _this.subModulelist = _result.submodule;
                }
            });
        }
        else {
            this.moduleId = null;
            this.subModuleId = null;
            this.subModulelist = null;
        }
        ///////////////// this.lstPageSize = 0;
        this.currentPage = 0;
        this.refresh();
    };
    SolgenRuleEngineListComponent.prototype.onSubModuleSelect = function (event) {
        if (event) {
            this.subModuleId = event.sub_module_id;
        }
        else {
            this.subModuleId = null;
        }
        ////////////this.lstPageSize = 0;
        this.currentPage = 0;
        this.refresh();
    };
    SolgenRuleEngineListComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.SolgenService.GetSolgenList(this.listFilter, this.moduleId, this.subModuleId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.SolgenService.pagedData;
            _this.offset = 1;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    SolgenRuleEngineListComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.SolgenService.GetSolgenList(this.listFilter, this.moduleId, this.subModuleId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.SolgenService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    SolgenRuleEngineListComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.SolgenService.GetSolgenList(this.listFilter, this.moduleId, this.subModuleId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.SolgenService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    SolgenRuleEngineListComponent.prototype.remove = function () {
        var _this = this;
        if (this.rulId != null && this.rulId != "") {
            var message = "Are you sure you want to delete Rule(s)?";
            this.dialogService.confirm('Delete Rule(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.SolgenService.deleteRules(_this.rulId).subscribe(function (r) {
                        _this.toaster.success("Rule(s) has been deleted successfully.");
                        _this.rulId = "";
                        _this.selected = [];
                        _this.refresh();
                    }, function (error) {
                    });
                }
            });
        }
        else {
            this.toaster.error("Please select at least one row.");
        }
    };
    SolgenRuleEngineListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.rulId == "" || this.rulId == null || this.rulId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            for (var i = 0; i < selected.length; i++) {
                // if (selected[i].asociatedUser !== 1) {
                this.rulId += selected[i].RuleId.toString() + ",";
                // }
            }
        }
        else {
            this.rulId = null;
            this.rulId = "";
            for (var i = 0; i < selected.length; i++) {
                //if (selected[i].asociatedUser !== 1) {
                this.rulId += selected[i].RuleId.toString() + ",";
                // }
            }
        }
    };
    SolgenRuleEngineListComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.SolgenService.GetSolgenList(this.listFilter, this.moduleId, this.subModuleId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.SolgenService.pagedData;
            _this.offset = 1;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    SolgenRuleEngineListComponent.prototype.DeleteRule = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete rule \"" + row.RuleName + "\"?";
        this.dialogService.confirm('Delete Rule ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.SolgenService.deleteRule(row.RuleId).subscribe(function (result) {
                    if (result.statusCode == 200) {
                        _this.toaster.success(result.responseMessage);
                        _this.refresh();
                    }
                    else {
                        _this.toaster.error(result.responseMessage);
                    }
                });
            }
        });
    };
    SolgenRuleEngineListComponent.prototype.disable = function (row) {
        var _this = this;
        var message = "Are you sure you want to disable this Rule \"" + row.RuleName + "\"?";
        this.dialogService.confirm('Disable Rule', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.SolgenService.changeStatus(row.RuleId).subscribe(function (r) {
                    _this.refresh();
                    _this.toaster.success("\"" + row.RuleName + "\" has been disabled successfully ");
                }, function (error) {
                });
            }
        });
    };
    SolgenRuleEngineListComponent.prototype.enable = function (row) {
        var _this = this;
        var message = "Are you sure you want to enable this Rule  \"" + row.RuleName + "\"?";
        this.dialogService.confirm('Enable Email Template', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.SolgenService.changeStatus(row.RuleId).subscribe(function (response) {
                    _this.refresh();
                    _this.toaster.success("\"" + row.RuleName + "\" has been enabled successfully");
                }, function (error) {
                });
            }
        });
    };
    SolgenRuleEngineListComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: _manageform_form_service__WEBPACK_IMPORTED_MODULE_7__["FormService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_8__["SolgenRuleEngineService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], SolgenRuleEngineListComponent.prototype, "offset", void 0);
    SolgenRuleEngineListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-solgen-rule-engine-list',
            template: __importDefault(__webpack_require__(/*! raw-loader!./solgen-rule-engine-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/solgen-rule-engine-list.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./solgen-rule-engine-list.component.scss */ "./src/app/views/solgen-rule-engine/solgen-rule-engine-list.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _manageform_form_service__WEBPACK_IMPORTED_MODULE_7__["FormService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"],
            _solgen_rule_engine_service__WEBPACK_IMPORTED_MODULE_8__["SolgenRuleEngineService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], SolgenRuleEngineListComponent);
    return SolgenRuleEngineListComponent;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/solgen-rule-engine-routing.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/solgen-rule-engine-routing.module.ts ***!
  \*******************************************************************************/
/*! exports provided: SolgenRuleEngineRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineRoutingModule", function() { return SolgenRuleEngineRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _solgen_rule_engine_add_or_edit_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solgen-rule-engine-add-or-edit.component */ "./src/app/views/solgen-rule-engine/solgen-rule-engine-add-or-edit.component.ts");
/* harmony import */ var _solgen_rule_engine_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./solgen-rule-engine-list.component */ "./src/app/views/solgen-rule-engine/solgen-rule-engine-list.component.ts");
/* harmony import */ var _solgen_rule_engine_summary_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./solgen-rule-engine-summary.component */ "./src/app/views/solgen-rule-engine/solgen-rule-engine-summary.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var routes = [
    { path: '', component: _solgen_rule_engine_list_component__WEBPACK_IMPORTED_MODULE_3__["SolgenRuleEngineListComponent"], data: { title: 'Rule Engine' } },
    { path: 'add-rule', component: _solgen_rule_engine_add_or_edit_component__WEBPACK_IMPORTED_MODULE_2__["SolgenRuleEngineAddOrEditComponent"], data: { title: 'Add Rule Engine' } },
    {
        path: 'edit/:id', component: _solgen_rule_engine_add_or_edit_component__WEBPACK_IMPORTED_MODULE_2__["SolgenRuleEngineAddOrEditComponent"], data: { title: 'Edit Rule Engine' }
    },
    {
        path: 'view/:vwRuleId', component: _solgen_rule_engine_add_or_edit_component__WEBPACK_IMPORTED_MODULE_2__["SolgenRuleEngineAddOrEditComponent"], data: { title: 'View Rule Engine' }
    },
    {
        path: 'summary', component: _solgen_rule_engine_summary_component__WEBPACK_IMPORTED_MODULE_4__["SolgenRuleEngineSummaryComponent"], data: { title: 'Rule Engine Summary' }
    },
];
var SolgenRuleEngineRoutingModule = /** @class */ (function () {
    function SolgenRuleEngineRoutingModule() {
    }
    SolgenRuleEngineRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], SolgenRuleEngineRoutingModule);
    return SolgenRuleEngineRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/solgen-rule-engine-summary.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/solgen-rule-engine-summary.component.scss ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NvbGdlbi1ydWxlLWVuZ2luZS9zb2xnZW4tcnVsZS1lbmdpbmUtc3VtbWFyeS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/solgen-rule-engine/solgen-rule-engine-summary.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/solgen-rule-engine-summary.component.ts ***!
  \**********************************************************************************/
/*! exports provided: SolgenRuleEngineSummaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineSummaryComponent", function() { return SolgenRuleEngineSummaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var SolgenRuleEngineSummaryComponent = /** @class */ (function () {
    function SolgenRuleEngineSummaryComponent() {
    }
    SolgenRuleEngineSummaryComponent.prototype.ngOnInit = function () {
    };
    SolgenRuleEngineSummaryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-solgen-rule-engine-summary',
            template: __importDefault(__webpack_require__(/*! raw-loader!./solgen-rule-engine-summary.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgen-rule-engine/solgen-rule-engine-summary.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./solgen-rule-engine-summary.component.scss */ "./src/app/views/solgen-rule-engine/solgen-rule-engine-summary.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], SolgenRuleEngineSummaryComponent);
    return SolgenRuleEngineSummaryComponent;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/solgen-rule-engine.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/solgen-rule-engine.module.ts ***!
  \***********************************************************************/
/*! exports provided: SolgenRuleEngineModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineModule", function() { return SolgenRuleEngineModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _solgen_rule_engine_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./solgen-rule-engine-routing.module */ "./src/app/views/solgen-rule-engine/solgen-rule-engine-routing.module.ts");
/* harmony import */ var _component_solgen_rule_engine_target_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/solgen-rule-engine-target.component */ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-target.component.ts");
/* harmony import */ var _component_solgen_rule_engine_result_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/solgen-rule-engine-result.component */ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result.component.ts");
/* harmony import */ var _component_solgen_rule_engine_result_table_field_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/solgen-rule-engine-result-table-field.component */ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-table-field.component.ts");
/* harmony import */ var _component_solgen_rule_engine_result_calculation_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./component/solgen-rule-engine-result-calculation.component */ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-result-calculation.component.ts");
/* harmony import */ var _solgen_rule_engine_add_or_edit_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./solgen-rule-engine-add-or-edit.component */ "./src/app/views/solgen-rule-engine/solgen-rule-engine-add-or-edit.component.ts");
/* harmony import */ var _solgen_rule_engine_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./solgen-rule-engine-list.component */ "./src/app/views/solgen-rule-engine/solgen-rule-engine-list.component.ts");
/* harmony import */ var _solgen_rule_engine_summary_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./solgen-rule-engine-summary.component */ "./src/app/views/solgen-rule-engine/solgen-rule-engine-summary.component.ts");
/* harmony import */ var _component_solgen_rule_condition_calculation_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./component/solgen-rule-condition-calculation.component */ "./src/app/views/solgen-rule-engine/component/solgen-rule-condition-calculation.component.ts");
/* harmony import */ var _component_solgen_rule_engine_condition_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./component/solgen-rule-engine-condition.component */ "./src/app/views/solgen-rule-engine/component/solgen-rule-engine-condition.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};














var SolgenRuleEngineModule = /** @class */ (function () {
    function SolgenRuleEngineModule() {
    }
    SolgenRuleEngineModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _solgen_rule_engine_list_component__WEBPACK_IMPORTED_MODULE_10__["SolgenRuleEngineListComponent"],
                _component_solgen_rule_engine_condition_component__WEBPACK_IMPORTED_MODULE_13__["SolgenRuleEngineConditionComponent"],
                _component_solgen_rule_engine_target_component__WEBPACK_IMPORTED_MODULE_5__["SolgenRuleEngineTargetComponent"],
                _component_solgen_rule_engine_result_component__WEBPACK_IMPORTED_MODULE_6__["SolgenRuleEngineResultComponent"],
                _component_solgen_rule_engine_result_table_field_component__WEBPACK_IMPORTED_MODULE_7__["SolgenRuleEngineResultTableFieldComponent"],
                _component_solgen_rule_engine_result_calculation_component__WEBPACK_IMPORTED_MODULE_8__["SolgenRuleEngineResultCalculationComponent"],
                _solgen_rule_engine_add_or_edit_component__WEBPACK_IMPORTED_MODULE_9__["SolgenRuleEngineAddOrEditComponent"],
                _solgen_rule_engine_summary_component__WEBPACK_IMPORTED_MODULE_11__["SolgenRuleEngineSummaryComponent"], _component_solgen_rule_condition_calculation_component__WEBPACK_IMPORTED_MODULE_12__["SolgenRuleConditionCalculationComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _solgen_rule_engine_routing_module__WEBPACK_IMPORTED_MODULE_4__["SolgenRuleEngineRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__["ModalModule"].forRoot()
            ]
        })
    ], SolgenRuleEngineModule);
    return SolgenRuleEngineModule;
}());



/***/ }),

/***/ "./src/app/views/solgen-rule-engine/solgen-rule-engine.service.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/solgen-rule-engine/solgen-rule-engine.service.ts ***!
  \************************************************************************/
/*! exports provided: SolgenRuleEngineService, CheckRuleName, SolgenRuleModule, SolgenRuleSelectOption, SolgenRuleField, SolgenRuleSubModule, SolgenRuleOperator, SolgenRuleCondition, SolgenRuleAction, SolgenRuleResultCalculation, SolgenRuleTableField, SolgenRuleResult, SolgenTargetCondition, SolgenRuleTarget, SolgenRuleEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngineService", function() { return SolgenRuleEngineService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckRuleName", function() { return CheckRuleName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleModule", function() { return SolgenRuleModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleSelectOption", function() { return SolgenRuleSelectOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleField", function() { return SolgenRuleField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleSubModule", function() { return SolgenRuleSubModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleOperator", function() { return SolgenRuleOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleCondition", function() { return SolgenRuleCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleAction", function() { return SolgenRuleAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleResultCalculation", function() { return SolgenRuleResultCalculation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleTableField", function() { return SolgenRuleTableField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleResult", function() { return SolgenRuleResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenTargetCondition", function() { return SolgenTargetCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleTarget", function() { return SolgenRuleTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenRuleEngine", function() { return SolgenRuleEngine; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var SolgenRuleEngineService = /** @class */ (function () {
    function SolgenRuleEngineService(http, fb) {
        this.http = http;
        this.fb = fb;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
        this.SolRuleEngine = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl + "RuleEngine";
        this.moduleUri = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl + "Modules";
        this.ConditionsOperatorsList = [{ name: 'Is Value', value: '1' }, { name: 'Is Compare', value: '2' }, { name: 'Is Calculate', value: '3' }];
    }
    SolgenRuleEngineService.prototype.GetSolgenList = function (name, moduleId, subModuleId, sortColumn, sortDir, page, pageSize, companyId) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "SolgenRuleEngine/GetSolgenRuleList?name=" + name + "&SortColumn=" + sortColumn + "&moduleId=" + moduleId + "&subModuleId=" + subModuleId + "&SortDir=" + sortDir + "&PageNo=" + page + "&PageSize=" + pageSize + "&companyId=" + companyId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    SolgenRuleEngineService.prototype.getSubModuleEventList = function (subModuleId) {
        return this.http.get(this.baseUri + "SolgenRuleEngine/GetSolgenSubModuleEventList?subModuleId=" + subModuleId);
    };
    SolgenRuleEngineService.prototype.getSubModules = function (moduleId) {
        return this.http.get(this.baseUri + "SolgenRuleEngine/GetSolgenSubModules?moduleId=" + moduleId);
    };
    SolgenRuleEngineService.prototype.getSubModuleFields = function (subModuleName) {
        return this.http.get(this.moduleUri + "/GetSubModuleFields?subModuleName=" + subModuleName);
    };
    SolgenRuleEngineService.prototype.GetCustomFieldsListBySubModuleId = function (moduleId, subModuleId) {
        return this.http.get(this.baseUri + "SolgenRuleEngine/GetSolgenCustomFieldBySubModuleId?moduleId=" + moduleId + "&subModuleId=" + subModuleId);
    };
    SolgenRuleEngineService.prototype.checkNameExist = function (model) {
        return this.http.post(this.baseUri + "SolgenRuleEngine/CheckSolgenRuleNameExist", model);
    };
    SolgenRuleEngineService.prototype.addUpdateRuleEngine = function (data) {
        return this.http.post(this.baseUri + "SolgenRuleEngine/AddUpdateSolgenRuleEngine", data);
    };
    SolgenRuleEngineService.prototype.deleteRule = function (id) {
        return this.http.get(this.baseUri + ("SolgenRuleEngine/DeleteSolgenRule?ruleId=" + id));
    };
    SolgenRuleEngineService.prototype.changeStatus = function (id) {
        return this.http.post(this.baseUri + "SolgenRuleEngine/ChangeSolgenRuleStatus/" + id, null);
    };
    SolgenRuleEngineService.prototype.getDisplayOrder = function () {
        return this.http.get(this.baseUri + "SolgenRuleEngine/GetSolgenRuleDisplayOrder");
    };
    SolgenRuleEngineService.prototype.deleteRules = function (ruleIds) {
        return this.http.get(this.baseUri + ("SolgenRuleEngine/DeletedMultipleSolgenRules?ruleIds=" + ruleIds));
    };
    SolgenRuleEngineService.prototype.executeRuleEngineTarget = function (loanApplicationId, eventCode, connectionId) {
        var model = {
            loanApplicationId: loanApplicationId,
            eventCode: eventCode,
            connectionId: connectionId
        };
        console.log(model);
        return this.http.post(this.baseUri + "RuleEngine/ExecuteRuleEngineTarget", model);
    };
    SolgenRuleEngineService.prototype.sortConditionOperatoers = function (dt_code) {
        if (dt_code == 'text' || dt_code == 'textbox' || dt_code == 'textarea' || dt_code == 'select'
            || dt_code == 'date' || dt_code == 'datetime' || dt_code == 'checkbox' || dt_code == 'radio' || dt_code == 'boolean' || dt_code == 'image') {
            return [{ name: 'Is Value', value: '1' }, { name: 'Is Compare', value: '2' }];
        }
        else if (dt_code == 'bigint' || dt_code == 'int' || dt_code == 'number' || dt_code == 'decimal') {
            return [{ name: 'Is Value', value: '1' }, { name: 'Is Compare', value: '2' }, { name: 'Is Calculate', value: '3' }];
        }
    };
    SolgenRuleEngineService.prototype.buidCondition = function (condition) {
        var _this = this;
        if (condition === void 0) { condition = null; }
        var conditiongroup = this.fb.group({
            conditionId: [null],
            relationWithParent: [null],
            openingBrackets: "(",
            subModuleId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            subModuleAlias: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            fieldId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            fields: [],
            operatorId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            operators: [],
            //    isCalculate: [{ value: false, disabled: true }],
            fieldSelectList: [],
            fieldValue: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            fieldSecondValue: [null],
            closingBrackets: ")",
            isTime: [""],
            displayOrder: [0],
            conditions: [],
            conditionsId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            resultCalculation: this.fb.array([this.buildResultCalculation()])
        });
        if (condition != null) {
            var fieldValue = null;
            var fieldSecondValue = null;
            if (typeof condition.fieldId !== 'undefined') {
                if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_expression != 'in') {
                    fieldValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldValue; })[0];
                }
                else if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_display_name.includes('multiple')) {
                    var values_1 = condition.fieldValue.split(',').map(function (m) { return m.replace(/'/g, ''); });
                    fieldValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return values_1.includes(m.value); });
                }
                else if (condition.fieldId.dt_code == 'date') {
                    fieldValue = new Date(condition.fieldValue);
                }
                else {
                    fieldValue = condition.fieldValue;
                }
                if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldSecondValue; })[0];
                }
                else if (condition.fieldId.dt_code == 'date' && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = new Date(condition.fieldSecondValue);
                }
                else if (condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = condition.fieldSecondValue;
                }
            }
            var operatorContionsId = (typeof condition.conditionsId !== 'undefined' ? JSON.parse(condition.conditionsId) : {});
            conditiongroup.patchValue({
                conditionId: condition.conditionId,
                relationWithParent: (typeof condition.relationWithParent !== 'undefined' ? condition.relationWithParent : ''),
                openingBrackets: condition.openingBrackets,
                subModuleId: condition.subModuleId,
                subModuleAlias: ((typeof condition.subModuleAlias !== 'undefined' ? condition.subModuleAlias : '')),
                fieldId: (typeof condition.fieldId !== 'undefined' ? condition.fieldId : null),
                fields: condition.fields,
                fieldSelectList: (typeof condition.fieldId !== 'undefined' && condition.fieldId.dt_code == 'select' ? JSON.parse(condition.fieldId.select_options) : []),
                operatorId: condition.operatorId,
                operators: condition.operators,
                fieldValue: (operatorContionsId && operatorContionsId.value == '2' && fieldValue) ? JSON.parse(fieldValue) : fieldValue,
                fieldSecondValue: fieldSecondValue,
                closingBrackets: condition.closingBrackets,
                isTime: condition.isTime,
                conditions: this.sortConditionOperatoers(typeof condition.fieldId !== 'undefined' ? condition.fieldId.dt_code : ''),
                conditionsId: operatorContionsId,
            });
        }
        //prepare condtion data
        while (conditiongroup.get('resultCalculation').length != 0) {
            conditiongroup.get('resultCalculation').removeAt(0);
        }
        if (condition) {
            if (condition.resultCalculation) {
                condition.resultCalculation.forEach(function (m) {
                    conditiongroup.get('resultCalculation').push(_this.buildResultCalculation(m));
                });
            }
        }
        return conditiongroup;
    };
    SolgenRuleEngineService.prototype.buidResult = function (result) {
        var _this = this;
        if (result === void 0) { result = null; }
        if (result == null) {
            return this.fb.group({
                resultId: [null],
                name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
                action: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
                actionId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
                subModuleId: [null],
                fieldList: [null],
                resultCondition: [null],
                tableFields: this.fb.array([this.buildResultTableField()]),
                isEdit: [false]
            });
        }
        else {
            var resultGroup_1 = this.fb.group({
                resultId: [result.ruleTargetResultId],
                name: [result.name, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
                action: [result.action, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
                actionId: [result.actionId, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
                subModuleId: [result.subModuleId],
                fieldList: [result.fields],
                resultCondition: [result.resultCondition],
                tableFields: this.fb.array([this.buildResultTableField()]),
                isEdit: [true],
                displayOrder: [0]
            });
            if (result.action.code != 'validation') {
                resultGroup_1.get('subModuleId').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
            }
            //prepare condtion data
            while (resultGroup_1.get('tableFields').length != 0) {
                resultGroup_1.get('tableFields').removeAt(0);
            }
            if (result.tableFields) {
                result.tableFields.forEach(function (m) {
                    resultGroup_1.get('tableFields').push(_this.buildResultTableField(m));
                });
            }
            return resultGroup_1;
        }
    };
    SolgenRuleEngineService.prototype.buildResultTableField = function (tableField) {
        var _this = this;
        if (tableField === void 0) { tableField = null; }
        var tableFieldGroup = this.fb.group({
            RuleTargetResultConditionId: [null],
            RuleTargetId: [null],
            fieldId: [null],
            subModuleId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            fieldSelectList: [],
            displayName: [null],
            dataType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            fieldDisplayValue: [null],
            fieldValue: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            showPopUpModal: [false],
            resultCalculation: this.fb.array([this.buildResultCalculation()]),
            conditionsId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            conditions: [],
        });
        if (tableField != null) {
            var fieldValue = null;
            if (tableField.fieldId) {
                if (tableField.fieldId.dt_code == 'select') {
                    fieldValue = JSON.parse(tableField.fieldId.select_options).filter(function (m) { return m.value === tableField.fieldValue; })[0];
                    if (!fieldValue) {
                        fieldValue = tableField.fieldValue;
                    }
                }
                else if (tableField.fieldId.dt_code == 'date') {
                    fieldValue = new Date(tableField.fieldValue);
                }
                else {
                    fieldValue = tableField.fieldValue;
                }
            }
            else {
                if (typeof tableField.name !== 'undefined') {
                    if (tableField.name == 'CompanyId') {
                        fieldValue = 't34.CompanyId';
                    }
                    else if (tableField.name == 'StatusId') {
                        fieldValue = 't34.StatusId';
                    }
                    else if (tableField.name == 'LoanApplicationId') {
                        fieldValue = 't34.Id';
                    }
                    else {
                        fieldValue = tableField.fieldValue;
                    }
                }
                else {
                    fieldValue = tableField.fieldValue;
                }
            }
            var operatorsCondition = (typeof tableField.conditionsId !== 'undefined' ? JSON.parse(tableField.conditionsId) : {});
            tableFieldGroup.patchValue({
                RuleTargetResultConditionId: (typeof tableField.ruleTargetResultConditionId !== 'undefined' ? tableField.ruleTargetResultConditionId : null),
                subModuleId: tableField.subModuleId,
                RuleTargetId: (typeof tableField.ruleTargetId !== 'undefined' ? tableField.ruleTargetId : null),
                fieldId: (typeof tableField.fieldId !== 'undefined' ? tableField.fieldId : tableField),
                name: (typeof tableField.name !== 'undefined' ? tableField.name : ''),
                fieldSelectList: ((typeof tableField.fieldId !== 'undefined' && tableField.fieldId.dt_code == 'select') ? JSON.parse(tableField.fieldId.select_options) : []),
                displayName: (typeof tableField.label !== 'undefined' ? tableField.label : ''),
                dataType: (typeof tableField.dataType !== 'undefined' ? tableField.dataType : typeof tableField.actual_data_type !== 'undefined' ? tableField.actual_data_type : ''),
                fieldValue: (operatorsCondition && operatorsCondition.value == '2' && fieldValue) ? JSON.parse(tableField.fieldValue) : fieldValue,
                fieldDisplayValue: (typeof tableField.fieldDisplayValue !== 'undefined' ? tableField.fieldDisplayValue : null),
                conditions: this.sortConditionOperatoers(typeof tableField.fieldId !== 'undefined' ? tableField.fieldId.dt_code : ''),
                conditionsId: operatorsCondition,
            });
        }
        //prepare condtion data
        while (tableFieldGroup.get('resultCalculation').length != 0) {
            tableFieldGroup.get('resultCalculation').removeAt(0);
        }
        if (tableField) {
            if (tableField.resultCalculation) {
                tableField.resultCalculation.forEach(function (m) {
                    tableFieldGroup.get('resultCalculation').push(_this.buildResultCalculation(m));
                });
            }
        }
        return tableFieldGroup;
    };
    SolgenRuleEngineService.prototype.buildResultCalculation = function (resultCalculate) {
        if (resultCalculate === void 0) { resultCalculate = null; }
        var resultCalculation = this.fb.group({
            ruleTargetResultConditionCalculationID: [''],
            ruleId: [null],
            ruleTargetId: [null],
            ruleTargetResultId: [null],
            ruleTargetResultConditionId: [null],
            formulaId: [],
            openingBrackets: ['('],
            firstFieldSectionId: [null],
            firstFields: [null],
            firstFieldId: [null],
            firstFieldValue: [null],
            secondFieldSectionId: [null],
            secondFields: [null],
            secondFieldId: [null],
            secondFieldValue: [null],
            datePart: [null],
            operatorId: [null],
            closingBrackets: [')']
        });
        if (resultCalculate != null) {
            resultCalculation.patchValue({
                ruleTargetResultConditionCalculationID: resultCalculate.ruleTargetResultConditionCalculationID,
                ruleId: resultCalculate.ruleId,
                ruleTargetId: resultCalculate.ruleTargetId,
                ruleTargetResultId: resultCalculate.ruleTargetResultId,
                formulaId: (typeof resultCalculate.formulaId !== 'undefined' ? resultCalculate.formulaId : null),
                ruleTargetResultConditionId: resultCalculate.ruleTargetResultConditionId,
                openingBrackets: resultCalculate.openingBrackets,
                firstFieldSectionId: resultCalculate.firstFieldSectionId,
                firstFields: (typeof resultCalculate.firstFields === 'undefined' ? null : resultCalculate.firstFields),
                firstFieldId: (typeof resultCalculate.firstFieldId === 'undefined' ? null : resultCalculate.firstFieldId),
                firstFieldValue: (typeof resultCalculate.firstFieldValue === 'undefined' ? null : resultCalculate.firstFieldValue),
                secondFieldSectionId: (typeof resultCalculate.secondFieldSectionId === 'undefined' ? null : resultCalculate.secondFieldSectionId),
                secondFields: (typeof resultCalculate.secondFields === 'undefined' ? null : resultCalculate.secondFields),
                secondFieldId: (typeof resultCalculate.secondFieldId === 'undefined' ? null : resultCalculate.secondFieldId),
                secondFieldValue: (typeof resultCalculate.secondFieldValue === 'undefined' ? null : resultCalculate.secondFieldValue),
                datePart: (typeof resultCalculate.datePart === 'undefined' ? null : resultCalculate.datePart),
                operatorId: (typeof resultCalculate.operatorId === 'undefined' ? null : resultCalculate.operatorId),
                closingBrackets: resultCalculate.closingBrackets
            });
        }
        return resultCalculation;
    };
    SolgenRuleEngineService.prototype.buildTarget = function (target) {
        var _this = this;
        if (target === void 0) { target = null; }
        if (target == null) {
            return this.fb.group({
                targetId: [''],
                isConditionAdded: [false],
                conditions: this.fb.array([this.buidCondition()]),
                targetCondition: this.fb.group({
                    targetId: [''],
                    ruleId: [''],
                    statusId: [''],
                    displayCondition: [''],
                    database_condition: [''],
                    rowId: ['']
                }),
                isResultAdded: [false],
                results: this.fb.array([], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required),
                displayOrder: [0]
            });
        }
        else {
            var targetGroup_1 = this.fb.group({
                targetId: [target.targetId],
                isConditionAdded: true,
                conditions: this.fb.array([this.buidCondition()]),
                targetCondition: this.fb.group({
                    targetId: [target.targetId],
                    ruleId: [target.ruleId],
                    statusId: [target.statusId],
                    displayCondition: [target.displayCondition],
                    database_condition: [target.databaseCondition],
                    rowId: [target.rowId]
                }),
                isResultAdded: true,
                results: this.fb.array([]),
                displayOrder: [0]
            });
            //prepare condtion data
            while (targetGroup_1.get('conditions').length != 0) {
                targetGroup_1.get('conditions').removeAt(0);
            }
            target.conditions.forEach(function (m) {
                targetGroup_1.get('conditions').push(_this.buidCondition(m));
            });
            //prepare result data
            while (targetGroup_1.get('results').length != 0) {
                targetGroup_1.get('results').removeAt(0);
            }
            if (typeof target.results != 'undefined') {
                target.results.forEach(function (m) {
                    targetGroup_1.get('results').push(_this.buidResult(m));
                });
            }
            return targetGroup_1;
        }
    };
    SolgenRuleEngineService.prototype.getRuleList = function (name, loanproduct, sortColumn, sortDir, page, pageSize) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "RuleEngine/GetRuleList?name=" + name + "&loanproduct=" + loanproduct + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    SolgenRuleEngineService.prototype.getRuleSummaryList = function (name, sortColumn, sortDir, page, pageSize) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "RuleEngine/GetRuleSummaryList?name=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    SolgenRuleEngineService.prototype.getLoanApplicationListForApplyRule = function (name, sortColumn, sortDir, page, pageSize, userId, batchId, ruleId, listFor) {
        return this.http.get(this.baseUri + "RuleEngine/GetLoanApplicationListForApplyRule?nameSearch=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&ruleId=" + ruleId + "&listFor=" + listFor);
    };
    SolgenRuleEngineService.prototype.GetRuleEngineDetail = function (id) {
        return this.http.get(this.baseUri + "SolgenRuleEngine/GetSolgenRuleDetailById?ruleId=" + id);
    };
    SolgenRuleEngineService.prototype.ApplyRuleVersion = function (id, ApplicationIds) {
        var model = {
            RuleId: id,
            ApplicationIds: ApplicationIds
        };
        console.log(model);
        return this.http.post(this.baseUri + "RuleEngine/ApplyRuleVersionToApplication", model);
    };
    SolgenRuleEngineService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }
    ]; };
    SolgenRuleEngineService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], SolgenRuleEngineService);
    return SolgenRuleEngineService;
}());

var CheckRuleName = /** @class */ (function () {
    function CheckRuleName() {
    }
    return CheckRuleName;
}());

//----------- Classes for SolgenRuleEngine-------------
var SolgenRuleModule = /** @class */ (function () {
    function SolgenRuleModule() {
    }
    return SolgenRuleModule;
}());

var SolgenRuleSelectOption = /** @class */ (function () {
    function SolgenRuleSelectOption() {
    }
    return SolgenRuleSelectOption;
}());

var SolgenRuleField = /** @class */ (function () {
    function SolgenRuleField() {
        this.select_options = [];
    }
    return SolgenRuleField;
}());

var SolgenRuleSubModule = /** @class */ (function () {
    function SolgenRuleSubModule() {
    }
    return SolgenRuleSubModule;
}());

var SolgenRuleOperator = /** @class */ (function () {
    function SolgenRuleOperator() {
    }
    return SolgenRuleOperator;
}());

var SolgenRuleCondition = /** @class */ (function () {
    function SolgenRuleCondition() {
        this.fields = [];
        this.fieldSelectList = [];
        this.operators = [];
        this.conditionCalculation = [];
        this.conditionOperators = [];
        this.conditionId = null;
        this.relationWithParent = null;
        this.openingBrackets = '(';
        this.subModuleId = null;
        this.subModuleAlias = null;
        this.fieldId = null;
        this.operatorId = null;
        this.operators = null;
        this.conditionOperatorsValue = null;
        this.closingBrackets = ')',
            this.isTime = "";
        this.displayOrder = 0;
        this.fieldSelectList = null;
        this.fieldValue = null;
    }
    return SolgenRuleCondition;
}());

//   conditionId: [null],
//   relationWithParent: [null],
//   openingBrackets: "(",
//   subModuleId: [null],
//   subModuleAlias: [null, Validators.required],
//   fieldId: [null, Validators.required],
//   fields: [],
//   operatorId: [null, Validators.required],
//   operators: [],
//   conditionOperatorsValue: [null, Validators.required],
//   //    isCalculate: [{ value: false, disabled: true }],
//   fieldSelectList: [],
//   fieldValue: [null, Validators.required],
//   fieldSecondValue: [null],
//   closingBrackets: ")",
//   isTime: [""],
//   displayOrder: [0],
var SolgenRuleAction = /** @class */ (function () {
    function SolgenRuleAction() {
    }
    return SolgenRuleAction;
}());

var SolgenRuleResultCalculation = /** @class */ (function () {
    function SolgenRuleResultCalculation() {
        this.firstFields = [];
    }
    return SolgenRuleResultCalculation;
}());

var SolgenRuleTableField = /** @class */ (function () {
    function SolgenRuleTableField() {
        this.resultCalculation = [];
    }
    return SolgenRuleTableField;
}());

var SolgenRuleResult = /** @class */ (function () {
    function SolgenRuleResult() {
        this.fields = [];
        this.tableFields = [];
        this.isEdit = true;
    }
    return SolgenRuleResult;
}());

var SolgenTargetCondition = /** @class */ (function () {
    function SolgenTargetCondition() {
    }
    return SolgenTargetCondition;
}());

var SolgenRuleTarget = /** @class */ (function () {
    function SolgenRuleTarget() {
        this.conditions = [];
        this.results = [];
        this.targetId = null;
        this.ruleId = null;
        this.statusId = null;
        this.displayCondition = null;
        this.databaseCondition = null;
        this.displayCondition = 0;
        this.companyId = null;
        this.conditions = [];
        this.results = [];
    }
    return SolgenRuleTarget;
}());

var SolgenRuleEngine = /** @class */ (function () {
    function SolgenRuleEngine() {
        this.targets = []; // this.fb.array([this.ruleEngineService.buildTarget()])
        this.SubModuleId = new SolgenRuleSubModule();
    }
    return SolgenRuleEngine;
}());

///------------- end


/***/ })

}]);
//# sourceMappingURL=views-solgen-rule-engine-solgen-rule-engine-module.js.map