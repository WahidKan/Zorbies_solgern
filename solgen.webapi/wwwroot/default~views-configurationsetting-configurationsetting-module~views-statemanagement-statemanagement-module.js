(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-configurationsetting-configurationsetting-module~views-statemanagement-statemanagement-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/configurationsetting.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/configurationsetting.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Configuration Setting</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Configuration Settings</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<!--Dssigner html-->\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel cntainerwithoutbg clearfix\">\r\n      <div class=\"panel-content clearfix mb-4 p-0\">\r\n        <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n          <li class=\"nav-item\"> <a class=\"nav-link active show\" id=\"lead-tab\" data-toggle=\"tab\" href=\"#lead\" role=\"tab\" aria-selected=\"true\">Lead</a> </li>\r\n          <!--<li class=\"nav-item\"> <a class=\"nav-link\" id=\"stage-tab\" data-toggle=\"tab\" href=\"#stage\" role=\"tab\" aria-selected=\"false\">Stage Configuration</a> </li>\r\n          <li class=\"nav-item\"> <a class=\"nav-link\" id=\"rule-tab\" data-toggle=\"tab\" href=\"#rule\" role=\"tab\" aria-selected=\"false\">Rule Engine</a> </li>-->\r\n          <li class=\"nav-item\"> <a class=\"nav-link\" id=\"manage-tab\" data-toggle=\"tab\" href=\"#manage-status\" role=\"tab\" aria-selected=\"false\">Manage Masters</a> </li>\r\n          <!--<li class=\"nav-item \"><a class=\"nav-link \" id=\"document\" data-toggle=\"tab\" href=\"#documents\" role=\"tab\" aria-selected=\"false\">Documents Master</a> </li>-->\r\n        </ul>\r\n        <div class=\"tab-content\" id=\"myTabContent\">\r\n          <!-- Start Lead Setting -->\r\n          <div class=\"tab-pane fade active show\" id=\"lead\" role=\"tabpanel\">\r\n            <app-leadconfigsetting></app-leadconfigsetting>\r\n          </div>\r\n          <!-- End Lead Setting -->\r\n          <!-- Start Stage Configuration -->\r\n          <div class=\"tab-pane p-0 fade\" id=\"stage\" role=\"tabpanel\">\r\n            <app-stageconfig></app-stageconfig>\r\n          </div>\r\n          <!-- End Stage Configuration -->\r\n          <!-- Start Rule Engine -->\r\n          <div class=\"tab-pane p-0 fade\" id=\"rule\" role=\"tabpanel\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-12 portlets\">\r\n                <div class=\"panel cntainerwithoutbg px-3 mb-0\">\r\n                  <div class=\"dt-buttons addabsoultebtn\"> <a class=\"btn btn-primary\" href=\"add-campaign.html\"><span><i class=\"fa fa-plus\"></i> New Rule</span></a> </div>\r\n                  <div class=\"panel-content pagination2 table-responsive no-padding\" style=\"min-height:100px;\">\r\n                    <table class=\"table table-hover table-dynamic\">\r\n                      <thead>\r\n                        <tr>\r\n                          <th>Page</th>\r\n                          <th>Name</th>\r\n                          <th>Rule</th>\r\n                          <th>Status</th>\r\n                        </tr>\r\n                      </thead>\r\n                      <tbody>\r\n                        <tr>\r\n                          <td><a href=\"#\">Manual App Entry (Create)</a></td>\r\n                          <td>Vechicle is Used</td>\r\n                          <td>var result = _vechicleType == 'Used';</td>\r\n                          <td>\r\n                            <div class=\"cstm-drop-btn\">\r\n                              <select data-id=\"12418\" onchange=\"DrpdownUpdataStatus('ddlupdatestatus');\" class=\"btn ddlupdatestatus btn-success\">\r\n                                <option value=\"1001\" selected=\"selected\">Active</option>\r\n                                <option value=\"1002\">Inactive</option>\r\n                              </select>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td><a href=\"#\">Manual App Entry (Create)</a></td>\r\n                          <td>Is not Business App</td>\r\n                          <td>var result = _isBusinessApp! == '1';</td>\r\n                          <td>\r\n                            <div class=\"cstm-drop-btn\">\r\n                              <select data-id=\"12418\" onchange=\"DrpdownUpdataStatus('ddlupdatestatus');\" class=\"btn ddlupdatestatus btn-success\">\r\n                                <option value=\"1001\" selected=\"selected\">Active</option>\r\n                                <option value=\"1002\">Inactive</option>\r\n                              </select>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td><a href=\"#\">Verifications</a></td>\r\n                          <td>Applicant Street is Blank</td>\r\n                          <td>var result = _streetNo == \"&amp;&amp; _streetname ==\"';</td>\r\n                          <td>\r\n                            <div class=\"cstm-drop-btn\">\r\n                              <select data-id=\"12418\" onchange=\"DrpdownUpdataStatus('ddlupdatestatus');\" class=\"btn ddlupdatestatus btn-success\">\r\n                                <option value=\"1001\" selected=\"selected\">Active</option>\r\n                                <option value=\"1002\">Inactive</option>\r\n                              </select>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td><a href=\"#\">Manual App Entry (Create)</a></td>\r\n                          <td>Applicant Address is Canada</td>\r\n                          <td>var result = _applicantCountry == 'CA';</td>\r\n                          <td>\r\n                            <div class=\"cstm-drop-btn\">\r\n                              <select data-id=\"12418\" onchange=\"DrpdownUpdataStatus('ddlupdatestatus');\" class=\"btn ddlupdatestatus btn-success\">\r\n                                <option value=\"1001\" selected=\"selected\">Active</option>\r\n                                <option value=\"1002\">Inactive</option>\r\n                              </select>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td><a href=\"#\">Verifications</a></td>\r\n                          <td>is Trade In</td>\r\n                          <td>var result = _tradeindicator == '1';</td>\r\n                          <td>\r\n                            <div class=\"cstm-drop-btn\">\r\n                              <select data-id=\"12418\" onchange=\"DrpdownUpdataStatus('ddlupdatestatus');\" class=\"btn ddlupdatestatus btn-success\">\r\n                                <option value=\"1001\" selected=\"selected\">Active</option>\r\n                                <option value=\"1002\">Inactive</option>\r\n                              </select>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td><a href=\"#\">Manual App Entry (Create)</a></td>\r\n                          <td>App Type is Joint</td>\r\n                          <td>var result = _appType == 'Joint';</td>\r\n                          <td>\r\n                            <div class=\"cstm-drop-btn\">\r\n                              <select data-id=\"12418\" onchange=\"DrpdownUpdataStatus('ddlupdatestatus');\" class=\"btn ddlupdatestatus btn-success\">\r\n                                <option value=\"1001\" selected=\"selected\">Active</option>\r\n                                <option value=\"1002\">Inactive</option>\r\n                              </select>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td><a href=\"#\">Manual App Entry (Create)</a></td>\r\n                          <td>CoApp Address in USA</td>\r\n                          <td>var result = _coappCountry == _coappCountry =='USA';</td>\r\n                          <td>\r\n                            <div class=\"cstm-drop-btn\">\r\n                              <select data-id=\"12418\" onchange=\"DrpdownUpdataStatus('ddlupdatestatus');\" class=\"btn ddlupdatestatus btn-success\">\r\n                                <option value=\"1001\" selected=\"selected\">Active</option>\r\n                                <option value=\"1002\">Inactive</option>\r\n                              </select>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td><a href=\"#\">Verifications</a></td>\r\n                          <td>Applicant Street is Blank</td>\r\n                          <td>var result = _streetNo == \"&amp;&amp; _streetname ==\"';</td>\r\n                          <td>\r\n                            <div class=\"cstm-drop-btn\">\r\n                              <select data-id=\"12418\" onchange=\"DrpdownUpdataStatus('ddlupdatestatus');\" class=\"btn ddlupdatestatus btn-success\">\r\n                                <option value=\"1001\" selected=\"selected\">Active</option>\r\n                                <option value=\"1002\">Inactive</option>\r\n                              </select>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td><a href=\"#\">Manual App Entry (Create)</a></td>\r\n                          <td>Applicant Address is Canada</td>\r\n                          <td>var result = _applicantCountry == 'CA';</td>\r\n                          <td>\r\n                            <div class=\"cstm-drop-btn\">\r\n                              <select data-id=\"12418\" onchange=\"DrpdownUpdataStatus('ddlupdatestatus');\" class=\"btn ddlupdatestatus btn-success\">\r\n                                <option value=\"1001\" selected=\"selected\">Active</option>\r\n                                <option value=\"1002\">Inactive</option>\r\n                              </select>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td><a href=\"#\">Verifications</a></td>\r\n                          <td>is Trade In</td>\r\n                          <td>var result = _tradeindicator == '1';</td>\r\n                          <td>\r\n                            <div class=\"cstm-drop-btn\">\r\n                              <select data-id=\"12418\" onchange=\"DrpdownUpdataStatus('ddlupdatestatus');\" class=\"btn ddlupdatestatus btn-success\">\r\n                                <option value=\"1001\" selected=\"selected\">Active</option>\r\n                                <option value=\"1002\">Inactive</option>\r\n                              </select>\r\n                            </div>\r\n\r\n                          </td>\r\n                        </tr>\r\n                      </tbody>\r\n                    </table>\r\n                  </div>\r\n                  <div class=\"panel-footer border-top pt-3 pb-3\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-6 col-sm-12\"> Showing 1 to 10 of 57 entries </div>\r\n                      <div class=\"col-md-6 col-sm-12 \">\r\n                        <ul class=\"pagination pagination-md float-right\">\r\n                          <li class=\"page-item \"><a class=\"page-link\" href=\"#\">Previous</a></li>\r\n                          <li class=\"page-item active\"><a class=\"page-link\" href=\"#\">1</a></li>\r\n                          <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n                          <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n                          <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n                        </ul>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- End Rule Engine -->\r\n          <!-- Start Manage Status -->\r\n          <div class=\"tab-pane fade p-0\" id=\"manage-status\" role=\"tabpanel\">\r\n            <form [formGroup]=\"configurationSetings\" autocomplete=\"off\">\r\n              <div class=\"addabsoultebtn\"><a class=\"btn btn-primary\" href=\"javscript:;\" (click)=\"addmoreStatus()\"><i class=\"fa fa-plus\"></i> Add Status</a></div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-12 portlets\">\r\n                  <div class=\"panel cntainerwithoutbg  mb-0\">\r\n                    <div class=\"panel-header\">\r\n                      <div class=\"row mt-2\">\r\n                        <div class=\"col-md-4\">\r\n                          <div class=\"form-group\">\r\n                            <label>Module</label>\r\n                            <ng-select #clearModuleDrop [items]=\"lstModule\" placeholder=\"Select Module\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"SetSubmoduleValue($event.value)\"\r\n                                       (clear)=\"restMasterddl()\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                          <div class=\"form-group\">\r\n                            <label>Sub Module</label>\r\n                            <ng-select #clearSubModuleDrop [items]=\"lstsubModule\" placeholder=\"Select Sub Module\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"SetStatusValue($event.value)\"\r\n                                       (clear)=\"restMasterddl()\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                          <div class=\"form-group\">\r\n                            <label>Controls</label>\r\n                            <ng-select #clearFieldDrop [items]=\"customFieldList1\" placeholder=\"Select Controls\" bindValue=\"custom_fild_id\" bindLabel=\"customFieldName\" [closeOnSelect]=\"true\" (change)=\"SetStatusData($event.custom_fild_id)\"\r\n                                       (clear)=\"restMasterddl()\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"panel-content p-0\" style=\"min-height:100px;\">\r\n                      <div class=\"col-md-12 mt-2\">\r\n                        <div class=\"pagination2 table-responsive grey_bg status-panel\">\r\n                          <table class=\"table table-hover table-dynamic mb-0\">\r\n                            <thead>\r\n                              <tr>\r\n                                <th class=\"text-center\"> </th>\r\n                                <th>Value</th>\r\n                                <th>Description</th>\r\n                                <th>Choose Color</th>\r\n                                <th></th>\r\n                              </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                              \r\n                              <ng-container formArrayName=\"addmoreFields\" *ngFor=\"let guarantor of addmoreFields.controls; let i=index\">\r\n                                \r\n                                <tr [formGroupName]=\"i\">\r\n                                  <td class=\"text-center\">{{i+1}}</td>\r\n                                  <td>\r\n                                    <input type=\"text\" class=\"form-control\" formControlName=\"status\" maxlength=\"100\"\r\n                                           placeholder=\"Enter Value\" />\r\n                                  </td>\r\n                                  <td>\r\n                                    <textarea formControlName=\"description\" class=\"form-control cust-height\" placeholder=\"Enter Description\"></textarea>\r\n\r\n                                  </td>\r\n                                  <td>\r\n                                    <!--<ng-select [items]=\"lstColorCode\" [clearable]=\"false\" [searchable]=\"false\" formControlName=\"chooseColor\" placeholder=\"Select Color\"\r\n      bindLabel=\"text\" bindValue=\"value\" class=\"form-control\"></ng-select>-->\r\n                                    <div class=\"dropdown bootstrap-select form-control my-select\">\r\n                                      <p-colorPicker formControlName=\"chooseColor\" (click)=\"SetColorFor(i,$event)\">\r\n                                      </p-colorPicker>\r\n                                      <span>{{colorCode[i]}}</span>\r\n                                      <span>{{chooseColor}}</span>\r\n                                    </div>\r\n\r\n                                  </td>\r\n                                  <td>\r\n                                    <a href=\"javascript:void(0);\" (click)=\"removeConfiguration(i)\"\r\n                                       *ngIf=\"configurationSetings.controls.addmoreFields.controls.length > 1 && !lstSystemGenerated[i]\"\r\n                                       class=\"text-red arrow_col font-16 mt-2\">\r\n                                      <i class=\"fa fa-trash\" title=\"Delete\"></i>\r\n                                    </a>\r\n                                    <!-- <a href=\"javascript:void(0);\" (click)=\"removeConfiguration(i)\"\r\n                                   *ngIf=\"configurationSetings.controls.addmoreFields.controls.length > 1 && i!=0 && !lstSystemGenerated[i]\"\r\n                                   class=\"text-red arrow_col font-16 mt-2\">\r\n                                  <i class=\"fa fa-trash\" title=\"Delete\"></i>\r\n                                </a>\r\n                                <a href=\"javascript:void(0);\" (click)=\"removeConfiguration(i)\"\r\n     *ngIf='isSystemGenerated==0'\r\n     class=\"text-red arrow_col font-16 mt-2\">\r\n    <i class=\"fa fa-trash\" title=\"Delete\"></i>\r\n  </a>-->\r\n                                  </td>\r\n                                </tr>\r\n                              </ng-container>\r\n                            </tbody>\r\n                          </table>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"panel-footer border-0 py-4\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                          <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"AddConfigurationStatus()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"Cancel()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n            </form>\r\n          </div>\r\n          <!-- End Manage Status -->\r\n\r\n          <!--Start Documents Master-->\r\n          <div class=\"tab-pane fade p-0 \" id=\"documents\" role=\"tabpanel\">\r\n            <app-documents-master></app-documents-master>\r\n          </div>\r\n          <!--End Documents Master-->\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/documents-master/documents-master.component.html":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/documents-master/documents-master.component.html ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div>\r\n  <form [formGroup]=\"configurationSetings\" autocomplete=\"off\">\r\n    <div class=\"addabsoultebtn\"><a class=\"btn btn-primary\" href=\"javscript:;\" (click)=\"addmoreStatus()\"><i class=\"fa fa-plus\"></i> Add Document</a></div>\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12 portlets\">\r\n        <div class=\"panel cntainerwithoutbg  mb-0\">\r\n\r\n          <div class=\"panel-content p-0\" style=\"min-height:100px;\">\r\n            <div class=\"col-md-12 mt-2\">\r\n              <div class=\"pagination2 table-responsive grey_bg status-panel\" style=\"overflow:visible;\">\r\n                <table class=\"table table-hover table-dynamic mb-0\">\r\n                  <thead>\r\n                    <tr>\r\n                      <th class=\"text-center\"> </th>\r\n                      <th>Value</th>\r\n                      <th>Description</th>\r\n                      <th>Choose Color</th>\r\n                      <th></th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    <ng-container formArrayName=\"addmoreFields\" *ngFor=\"let guarantor of addmoreFields.controls; let i=index\">\r\n                      <tr [formGroupName]=\"i\">\r\n                        <td class=\"text-center\">{{i+1}}</td>\r\n                        <td>\r\n                          <input type=\"text\" class=\"form-control\" formControlName=\"status\" maxlength=\"100\"\r\n                                 placeholder=\"Enter Value\" />\r\n                        </td>\r\n                        <td>\r\n                          <textarea formControlName=\"description\" class=\"form-control cust-height\" placeholder=\"Enter Description\"></textarea>\r\n                        </td>\r\n                        <td>\r\n                          <div class=\"dropdown bootstrap-select form-control my-select\">\r\n                            <p-colorPicker formControlName=\"chooseColor\" (click)=\"SetColorFor(i,$event)\">\r\n                            </p-colorPicker>\r\n                            <span>{{colorCode[i]}}</span>\r\n                            <span>{{chooseColor}}</span>\r\n                          </div>\r\n\r\n                        </td>\r\n                        <td>\r\n                          <a href=\"javascript:void(0);\" (click)=\"removeConfiguration(i)\"\r\n                             *ngIf=\"configurationSetings.controls.addmoreFields.controls.length > 1 && !lstSystemGenerated[i]\"\r\n                             class=\"text-red arrow_col font-16 mt-2\">\r\n                            <i class=\"fa fa-trash\" title=\"Delete\"></i>\r\n                          </a>\r\n                        </td>\r\n                      </tr>\r\n                    </ng-container>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"panel-footer border-0 py-4\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"AddConfigurationStatus()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"Cancel()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n  </form>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/leadconfigsetting.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/leadconfigsetting.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div>\r\n  <form [formGroup]=\"leadSettingForm\" autocomplete=\"off\">\r\n    <div class=\"row\" [ngClass]=\"{'disabled':loading}\" style=\"align-items:center\">\r\n      <div class=\"col-lg-12\"  *ngIf=\"comptype.companyType!='companytypeFinancialInstitute'\">\r\n        <label>Convert Object:<span class=\"text-danger\">*</span> </label>\r\n      </div>\r\n      <div class=\"col-lg-12\"  *ngIf=\"comptype.companyType!='companytypeFinancialInstitute'\">\r\n        <div class=\"form-group\">\r\n          <div class=\"custom-control custom-radio custom-control-inline p-0\">\r\n            <input id=\"loanapplicationId\" (change)=\"loanapplication($event)\" type=\"radio\" value=\"LoanApplication\" formControlName=\"IsLoanapplication\">\r\n            <label for=\"loanapplicationId\" class=\"radio-label font-weight-normal\">Loan Application</label>\r\n          </div>\r\n          <div class=\"custom-control custom-radio custom-control-inline p-0\">\r\n            <input id=\"opportunityId\" type=\"radio\" value=\"Opportunity\" (change)=\"opportunity($event)\" formControlName=\"IsLoanapplication\">\r\n            <label for=\"opportunityId\" class=\"radio-label font-weight-normal\">Opportunity</label>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!--<div class=\"col-lg-12 \">\r\n        <label>Related Object:<span class=\"text-danger\">*</span> </label>\r\n      </div>\r\n      <div class=\"col-lg-12\">\r\n        <div class=\"form-group mt-2 d-inline mr-3\">\r\n          <label class=\"switch\">\r\n            <input type=\"checkbox\" id=\"IsAccount\" formControlName=\"IsAccount\" /> <span class=\"slider round\"><span>Yes</span></span>\r\n          </label><label class=\"font-weight-normal\">Account</label>\r\n        </div>\r\n        <div class=\"form-group mt-2 d-inline\">\r\n          <label class=\"switch\">\r\n            <input type=\"checkbox\" id=\"IsContact\" formControlName=\"IsContact\" /> <span class=\"slider round\"><span>Yes</span></span>\r\n          </label><label class=\"font-weight-normal\">Contact</label>\r\n        </div>\r\n      </div>-->\r\n\r\n\r\n\r\n      <div class=\"table-responsive\" *ngIf=\"isLinkPage\" style=\"overflow-x: auto;\">\r\n\r\n        <table id=\"example\" class=\"table \">\r\n          <thead class=\"thead-bg\">\r\n            <tr>\r\n              <th style=\"min-width:200px\" scope=\"col\">Module Wizard</th>\r\n\r\n              <th scope=\"col\"></th>\r\n            </tr>\r\n          </thead>\r\n          <tbody formArrayName=\"fields\">\r\n            <tr [formGroupName]=\"i\" *ngFor=\"let field of fields.controls; let i=index\">\r\n              <td>\r\n                <div class=\"form-group\">\r\n                  <ng-select [items]=\"lstpage\" [closeOnSelect]=\"true\" placeholder=\"Select Page \" formControlName=\"linkPage\" (change)=\"onChangeField($event,field,i)\"\r\n                             bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (field.controls.linkPage.invalid && (field.controls.linkPage.dirty || field.controls.linkPage.touched) && field.controls.linkPage.errors?.required) }\"></ng-select>\r\n                  <small *ngIf=\"field.controls.linkPage.invalid && (field.controls.linkPage.dirty || field.controls.linkPage.touched) && field.controls.linkPage.errors?.required\"\r\n                         style=\"color:red;\">Please select Link Page</small>\r\n                </div>\r\n              </td>\r\n              <td>\r\n                <div class=\"form-group mb-0\">\r\n                  <a (click)=\"addFields()\" class=\"btn btn-primary  mr-2\" href=\"javascript:void(0);\"><span><i class=\"fa fa-plus\"></i> Add</span></a>\r\n                  <a *ngIf=\"i > 0\" href=\"javascript:void(0);\" (click)=\"removeFields(i)\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n\r\n                </div>\r\n              </td>\r\n            </tr>\r\n\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n\r\n\r\n      <!--<div class=\"col-lg-12 px-0 text-right mt-2\">\r\n        <a (click)=\"addFields()\" class=\"btn btn-primary  mr-2\" href=\"javascript:void(0);\"><span><i class=\"fa fa-plus\"></i> Add</span></a>\r\n        <a href=\"javascript:void(0);\" (click)=\"filtersearch()\" class=\"btn btn-success mr-2\"><i class=\"fa fa-search pr-2\"></i>Search</a>\r\n        <a href=\"javascript:void(0);\" (click)=\"close()\" class=\"btn btn-danger\"><i class=\"fa fa-close pr-2\"></i>Cancel</a>\r\n\r\n      </div>-->\r\n\r\n      <div class=\"col-md-12 action-buttons mt-4 mb-3\"> <a href=\"javascript:void(0)\" class=\"btn btn-success mr-2\" (click)=\"ManageLeadConfiguration()\"><span><i class=\"fa fa-save\"></i> Submit </span></a> <a href=\"javascript:void(0)\" class=\"btn btn-danger \"><span><i class=\"fa fa-close\"></i>  Cancel</span></a> </div>\r\n    </div>\r\n\r\n  </form>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/stageconfig.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/stageconfig.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Stage Config</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li *ngIf=\"!isStateManagement\" class=\"active\">Stage Configuration</li>\r\n      <li *ngIf=\"isStateManagement\"><a routerLink=\"/statemanagement\">Manage Stage </a></li>\r\n      <li *ngIf=\"isStateManagement\" class=\"active\">Edit Stage</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n\r\n\r\n  \r\n\r\n  <div class=\"col-lg-12 portlets\">\r\n\r\n\r\n\r\n    <div class=\"panel cntainerwithoutbg clearfix\">\r\n      <div class=\"panel-content clearfix mb-4 p-0\">\r\n        <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link active show\" id=\"lead-tab\"\r\n               data-toggle=\"tab\" href=\"#Stage\" role=\"tab\" aria-selected=\"true\">Stage Config</a>\r\n          </li>\r\n          <!--<li class=\"nav-item\"> <a class=\"nav-link\" id=\"stage-tab\" data-toggle=\"tab\" href=\"#stage\" role=\"tab\" aria-selected=\"false\">Stage Configuration</a> </li>\r\n    <li class=\"nav-item\"> <a class=\"nav-link\" id=\"rule-tab\" data-toggle=\"tab\" href=\"#rule\" role=\"tab\" aria-selected=\"false\">Rule Engine</a> </li>-->\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" id=\"list-stage\"\r\n               data-toggle=\"tab\" href=\"#liststage\" (click)=\"calaulate()\" role=\"tab\" aria-selected=\"false\">Version History</a>\r\n          </li>\r\n        </ul>\r\n       \r\n        <div class=\"tab-content\" id=\"myTabContent\">\r\n\r\n\r\n\r\n\r\n          <!-- Start Lead Setting   *ngIf=\"!isFinancial\"-->\r\n          <div class=\"tab-pane fade active show\" id=\"Stage\" role=\"tabpanel\">\r\n            <div class=\"panel-header\" *ngIf=\"!isFinancial\">\r\n              <div class=\"row mt-2\">\r\n                <div class=\"col-md-4\" *ngIf=\"!IsDetail\">\r\n                  <label>Module</label>\r\n                  <ng-select #clearModuleDrop [items]=\"lstModule\" placeholder=\"Select Module\" [(ngModel)]=\"moduleId\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"SetSubmoduleValue($event.value)\" disabled\r\n                             (clear)=\"restMasterddl()\">\r\n                  </ng-select>\r\n\r\n                </div>\r\n                <div class=\"col-md-4\" *ngIf=\"IsDetail\">\r\n                  <label>Module</label>\r\n                  <ng-select #clearModuleDrop [items]=\"lstModule\" placeholder=\"Select Module\" [(ngModel)]=\"moduleId\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"SetSubmoduleValue($event.value)\" \r\n                             (clear)=\"restMasterddl()\">\r\n                  </ng-select>\r\n\r\n                </div>\r\n                <div class=\"col-md-4\" *ngIf=\"!IsDetail\">\r\n                  <label>Sub Module</label>\r\n                  <ng-select #clearSubModuleDrop [items]=\"lstsubModule\" placeholder=\"Select Sub Module\" [(ngModel)]=\"subModuleId\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"SetStatusValue($event.value)\" disabled\r\n                             (clear)=\"restMasterddl()\">\r\n                  </ng-select>\r\n\r\n                </div>\r\n                <div class=\"col-md-4\" *ngIf=\"IsDetail\">\r\n                  <label>Sub Module</label>\r\n                  <ng-select #clearSubModuleDrop [items]=\"lstsubModule\" placeholder=\"Select Sub Module\" [(ngModel)]=\"subModuleId\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"SetStatusValue($event.value)\"\r\n                             (clear)=\"restMasterddl()\">\r\n                  </ng-select>\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-12 portlets\" *ngIf=\"showstage\">\r\n              <div class=\"panel pt-3  px-3 mb-0\">\r\n         \r\n                <form [formGroup]=\"stageform\" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <div class=\"panel-content pagination2 table-responsive no-padding\" style=\"min-height:auto;overflow: auto;\">\r\n                    <table id=\"example\" class=\"table mb-0\" style=\"min-width:1240px;\">\r\n                      <thead class=\"thead-bg\">\r\n                        <tr *ngIf=\"fields.controls.length > 0\">\r\n                          <th style=\"min-width:70px\"></th>\r\n                          <th scope=\"col\">Stage Name</th>\r\n                          <th scope=\"col\" style=\"display:none\">Mandatory</th>\r\n                          <th scope=\"col\" style=\"display:none\">Due Days</th>\r\n                          <th scope=\"col\">Assign User Type</th>\r\n                          <th scope=\"col\">Link Form</th>\r\n                          <th scope=\"col\" style=\"min-width:250px\"></th>\r\n                          <th scope=\"col\"></th>\r\n                        </tr>\r\n\r\n                      </thead>\r\n\r\n                      <tbody formArrayName=\"fields\" dnd-sortable-container [sortableData]=\"fields.controls\">\r\n                        <ng-container *ngFor=\"let field of fields.controls; let i=index\" [formGroupName]=\"i\">\r\n\r\n                          <tr *ngIf=\"fields.controls.length > 0\" dnd-sortable [sortableIndex]=\"i\" (onDropSuccess)=\"onDropSuccess()\" [dragEnabled]=\"IsDetail\">\r\n                            <td>\r\n\r\n                              <span class=\"mt-2 arrow_col\"><i class=\"fa fa-arrows-v\"></i>  {{i+1}}</span>\r\n                            </td>\r\n                            <td>\r\n                              <div class=\"form-group mb-0\" *ngIf=\"IsDetail\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"stagename\" maxlength=\"50\" placeholder=\"Enter Value\" id=\"{{'stagename' + i}}\"\r\n                                       [ngClass]=\"{'is-invalid': (field.controls.stagename.invalid && (field.controls.stagename.dirty || field.controls.stagename.touched) && (field.controls.stagename.errors?.required || field.controls.stagename.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"field.controls.stagename.invalid && (field.controls.stagename.dirty || field.controls.stagename.touched) && field.controls.stagename.errors?.required\"\r\n                                       class=\"text-danger\">ssStage Name is required</small>\r\n                                <!--<input type=\"text\"  id=\"{{'display_order' + i}}\" formControlName=\"display_order\"  [value]=\"i\" />-->\r\n                              </div>\r\n                              <div class=\"form-group mb-0\" *ngIf=\"!IsDetail\">\r\n                                <input type=\"text\" class=\"form-control\" disabled formControlName=\"stagename\" maxlength=\"50\" placeholder=\"Enter Value\" id=\"{{'stagename' + i}}\"\r\n                                       [ngClass]=\"{'is-invalid': (field.controls.stagename.invalid && (field.controls.stagename.dirty || field.controls.stagename.touched) && (field.controls.stagename.errors?.required || field.controls.stagename.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"field.controls.stagename.invalid && (field.controls.stagename.dirty || field.controls.stagename.touched) && field.controls.stagename.errors?.required\"\r\n                                       class=\"text-danger\">ssStage Name is required</small>\r\n                                <!--<input type=\"text\"  id=\"{{'display_order' + i}}\" formControlName=\"display_order\"  [value]=\"i\" />-->\r\n                              </div>\r\n                            </td>\r\n                            \r\n                            <td style=\"display:none\"></td>\r\n                            <!--<td>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"sustagelist\" id=\"{{'substageid' + i}}\" placeholder=\"Select field name\" formControlName=\"substageid\"\r\n                           bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (field.controls.substageid.invalid && (field.controls.substageid.dirty || field.controls.substageid.touched) && field.controls.substageid.errors?.required) }\"></ng-select>\r\n                <small *ngIf=\"field.controls.substageid.invalid && (field.controls.substageid.dirty || field.controls.substageid.touched) && field.controls.substageid.errors?.required\"\r\n                       style=\"color:red;\">Please select Link Stage</small>\r\n              </div>\r\n            </td>-->\r\n                            <!--<td style=\"display:none\">\r\n              <div class=\"form-group\" style=\"width: 150px;\">\r\n                <div class=\"form-group  mb-0\">\r\n                  <label class=\"switch\">\r\n                    <input type=\"checkbox\" id=\"{{'mandatory' +i}}\" formControlName=\"mandatory\" value=\"stageform[i]\">\r\n                    <span class=\"slider round\"><span>Yes</span></span>\r\n                  </label>\r\n                </div>\r\n              </div>\r\n            </td>\r\n            <td style=\"display:none\">\r\n              <div class=\"form-group  mb-0\">\r\n                <input type=\"number\" class=\"form-control\" id=\"{{'duedays' +i}}\" formControlName=\"duedays\" maxlength=\"50\" placeholder=\"Enter Value\"\r\n                       [ngClass]=\"{'is-invalid': (field.controls.duedays.invalid && (field.controls.duedays.dirty || field.controls.duedays.touched) && (field.controls.duedays.errors?.required || field.controls.duedays.errors?.maxlength)) }\">\r\n                <small *ngIf=\"field.controls.duedays.invalid && (field.controls.duedays.dirty || field.controls.duedays.touched) && field.controls.duedays.errors?.required\"\r\n                       class=\"text-danger\">Due Days is required</small>\r\n              </div>\r\n            </td>-->\r\n                            <td>\r\n                              <div class=\"form-group  mb-0\">\r\n                                <ng-select [items]=\"lstUserType\" id=\"{{'usertype' + i}}\" [closeOnSelect]=\"true\" placeholder=\"Select usertype\" formControlName=\"usertype\" multiple=\"true\" bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (field.controls.usertype.invalid && (field.controls.usertype.dirty || field.controls.usertype.touched) && field.controls.usertype.errors?.required) }\"></ng-select>\r\n                                <small *ngIf=\"field.controls.usertype.invalid && (field.controls.usertype.dirty || field.controls.usertype.touched) && field.controls.usertype.errors?.required\"\r\n                                       style=\"color:red;\">Please select Assign User Type</small>\r\n                              </div>\r\n                            </td>\r\n                            <td>\r\n                              <div class=\"form-group  mb-0\">\r\n                                <!--(change)=\"selcdropdown($event,field,i)\"-->\r\n                                <ng-select class=\"mr-2 float-left\" style=\"width:90%;\" [items]=\"lstpage\" id=\"{{'pages' + i}}\" [closeOnSelect]=\"true\" placeholder=\"Select page\" formControlName=\"pages\" multiple=\"true\"\r\n                                           (remove)=\"resetlinkpages($event,field,i)\" bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (field.controls.pages.invalid && (field.controls.pages.dirty || field.controls.pages.touched) && field.controls.pages.errors?.required) }\"></ng-select>\r\n                                <small *ngIf=\"field.controls.pages.invalid && (field.controls.pages.dirty || field.controls.pages.touched) && field.controls.pages.errors?.required\"\r\n                                       style=\"color:red;\">Please select Link Page</small>\r\n                                <a class=\"text-info float-left pt-2\" (click)=\"ShowForms(field)\"><i class=\"fa fa-eye\"></i></a>\r\n                              </div>\r\n\r\n                            </td>\r\n                            <td class=\"align-middle\" *ngIf=\"IsDetail\"> <a href=\"javascript:void(0)\" class=\"text-dark add-child\" (click)=\"addSubStageFields(i)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add Sub Stage\"><i class=\"fa fa-plus-circle\"></i> Add Sub Stage</a></td>\r\n                            <td class=\"align-middle\" *ngIf=\"!IsDetail\"> <a class=\"text-dark add-child\" data-toggle=\"tooltip\" data-placement=\"top\"><i class=\"fa fa-plus-circle\"></i> Add Sub Stage</a></td>\r\n                            <td class=\"text-center align-middle\">\r\n                              <div class=\"form-group mt-2 mb-0 text-center\">\r\n                                <a *ngIf=\"i > 0 && IsDetail\" href=\"javascript:void(0);\" (click)=\"removeFields(i)\"> <i class=\"fa fa-trash text-danger\"></i></a>\r\n                                <a *ngIf=\"i > 0 && !IsDetail\"> <i class=\"fa fa-trash text-danger\"></i></a>\r\n\r\n\r\n                              </div>\r\n                            </td>\r\n                          </tr>\r\n\r\n\r\n                          <!--substages-->\r\n                          <!--<tr *ngFor=\"let subField of field.value.substages\" formArray=\"substages\">-->\r\n                          <ng-container formArrayName=\"substages\">\r\n\r\n                            <tr *ngFor=\"let subField of field.get('substages').controls; let j =index\" [formGroupName]=\"j\">\r\n                              <td></td>\r\n\r\n                              <td>\r\n                                <div class=\"form-group mb-0\" *ngIf=\"IsDetail\">\r\n                                  <input type=\"text\" class=\"form-control\" formControlName=\"substagename\" placeholder=\"Enter Value\"\r\n                                         [ngClass]=\"{'is-invalid': (subField.controls.substagename.invalid && (subField.controls.substagename.dirty || subField.controls.substagename.touched) && (subField.controls.substagename.errors?.required || subField.controls.substagename.errors?.maxlength)) }\">\r\n                                  <small *ngIf=\"subField.controls.substagename.invalid && (subField.controls.substagename.dirty || subField.controls.substagename.touched) && subField.controls.substagename.errors?.required\"\r\n                                         class=\"text-danger\">Sub Stage Name is required</small>\r\n                                  <!--<input type=\"text\"  id=\"{{'display_order' + i}}\" formControlName=\"display_order\"  [value]=\"i\" />-->\r\n                                </div>\r\n                                <div class=\"form-group mb-0\" *ngIf=\"!IsDetail\">\r\n                                  <input type=\"text\" class=\"form-control\" disabled formControlName=\"substagename\" placeholder=\"Enter Value\"\r\n                                         [ngClass]=\"{'is-invalid': (subField.controls.substagename.invalid && (subField.controls.substagename.dirty || subField.controls.substagename.touched) && (subField.controls.substagename.errors?.required || subField.controls.substagename.errors?.maxlength)) }\">\r\n                                  <small *ngIf=\"subField.controls.substagename.invalid && (subField.controls.substagename.dirty || subField.controls.substagename.touched) && subField.controls.substagename.errors?.required\"\r\n                                         class=\"text-danger\">Sub Stage Name is required</small>\r\n                                  <!--<input type=\"text\"  id=\"{{'display_order' + i}}\" formControlName=\"display_order\"  [value]=\"i\" />-->\r\n                                </div>\r\n\r\n\r\n                              </td>\r\n                              <td style=\"display:none\"></td>\r\n                              <td style=\"display:none\"></td>\r\n                              <td>\r\n                                <div class=\"form-group  mb-0\">\r\n                                  <ng-select [items]=\"lstUserType\" [closeOnSelect]=\"true\" placeholder=\"Select usertype\" formControlName=\"usertypesubstage\" multiple=\"true\" bindLabel=\"text\" bindValue=\"value\"\r\n                                             [ngClass]=\"{'is-invalid': (subField.controls.usertypesubstage.invalid && (subField.controls.usertypesubstage.dirty || subField.controls.usertypesubstage.touched) && subField.controls.usertypesubstage.errors?.required) }\"></ng-select>\r\n                                  <small *ngIf=\"subField.controls.usertypesubstage.invalid && (subField.controls.usertypesubstage.dirty || subField.controls.usertypesubstage.touched) && subField.controls.usertypesubstage.errors?.required\"\r\n                                         style=\"color:red;\">Please select Assign User Type</small>\r\n                                </div>\r\n\r\n                              </td>\r\n                              <td>\r\n                                <div class=\"form-group  mb-0\">\r\n                                  <ng-select [items]=\"lstpage\" class=\"mr-2 float-left\" style=\"width:90%;\" [closeOnSelect]=\"true\" placeholder=\"Select page\" formControlName=\"pagessubstage\" multiple=\"true\"\r\n                                             bindLabel=\"text\" bindValue=\"value\" (change)=\"selcdropdown($event,field,j)\" (remove)=\"resetlinkpages($event,field,j)\"\r\n                                             [ngClass]=\"{'is-invalid': (subField.controls.pagessubstage.invalid && (subField.controls.pagessubstage.dirty || subField.controls.pagessubstage.touched) && subField.controls.pagessubstage.errors?.required) }\"></ng-select>\r\n                                  <small *ngIf=\"subField.controls.pagessubstage.invalid && (subField.controls.pagessubstage.dirty || subField.controls.pagessubstage.touched) && subField.controls.pagessubstage.errors?.required\"\r\n                                         style=\"color:red;\">Please select Link Page</small>\r\n                                  <a class=\"text-info float-left pt-2\" (click)=\"ShowForms(subField,'sub')\"><i class=\"fa fa-eye\"></i></a>\r\n                                </div>\r\n\r\n                              </td>\r\n                              <td class=\"align-middle\">\r\n                                <div class=\"form-group\" *ngIf=\"IsDetail\">\r\n                                  <div class=\"custom-control custom-radio custom-control-inline p-0\">\r\n                                    <input id=\"sequncereq-{{i}}{{j}}\" type=\"radio\" value=\"Sequence\" (change)=\"setseqvalue(field,$event,i)\" formControlName=\"issequenceforsubstage\">\r\n                                    <label for=\"sequncereq-{{i}}{{j}}\" class=\"radio-label font-weight-normal\">Sequence</label>\r\n                                  </div>\r\n                                  <div class=\"custom-control custom-radio custom-control-inline p-0\">\r\n                                    <input id=\"parallelreq-{{i}}{{j}}\" type=\"radio\" value=\"Parallel\" (change)=\"setseqvalue(field,$event,i)\" formControlName=\"issequenceforsubstage\">\r\n                                    <label for=\"parallelreq-{{i}}{{j}}\" class=\"radio-label font-weight-normal\">Parallel</label>\r\n                                  </div>\r\n                                </div>\r\n                                <div class=\"form-group\" *ngIf=\"!IsDetail\">\r\n                                  <div class=\"custom-control custom-radio custom-control-inline p-0\">\r\n                                    <input id=\"sequncereq-{{i}}{{j}}\" type=\"radio\" disabled value=\"Sequence\" (change)=\"setseqvalue(field,$event,i)\" formControlName=\"issequenceforsubstage\">\r\n                                    <label for=\"sequncereq-{{i}}{{j}}\" class=\"radio-label font-weight-normal\">Sequence</label>\r\n                                  </div>\r\n                                  <div class=\"custom-control custom-radio custom-control-inline p-0\">\r\n                                    <input id=\"parallelreq-{{i}}{{j}}\" type=\"radio\" disabled value=\"Parallel\" (change)=\"setseqvalue(field,$event,i)\" formControlName=\"issequenceforsubstage\">\r\n                                    <label for=\"parallelreq-{{i}}{{j}}\" class=\"radio-label font-weight-normal\">Parallel</label>\r\n                                  </div>\r\n                                </div>\r\n                              </td>\r\n\r\n                              <td class=\"text-center align-middle\">\r\n                                <a *ngIf=\"IsDetail\" href=\"javascript:void(0);\" (click)=\"removeSubstageFields(field,j)\"> <i class=\"fa fa-trash text-danger\"></i></a>\r\n\r\n                                <a *ngIf=\"!IsDetail\"> <i class=\"fa fa-trash text-danger\"></i></a>\r\n                              </td>\r\n                            </tr>\r\n                           \r\n                          </ng-container>\r\n\r\n                        </ng-container>\r\n                      </tbody>\r\n                    </table>\r\n                  </div>\r\n\r\n                  <!--<div formarray=\"substages\">\r\n    <ng-container *ngFor=\"let fieldsdsa of fields.controls\">\r\n\r\n\r\n      <h1> {{fieldsdsa.value.substages |json}}      new data</h1>\r\n\r\n    </ng-container>\r\n  </div>-->\r\n                  <div class=\"data-empty\" *ngIf=\"fields.controls.length < 1\">\r\n                    <p>No Record Found</p>\r\n                  </div>\r\n                  <div class=\"panel-footer border-top py-3 border-bottom-0 px-0\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12\" style=\"display:none\">\r\n                        <div class=\"form-group\">\r\n                          <div class=\"form-group\">\r\n                            <label class=\"switch\">\r\n                              <input type=\"checkbox\" id=\"{{'mandatory' +i}}\" formControlName=\"sequence_mandatory\">\r\n                              <span class=\"slider round\"><span>Yes</span></span>\r\n                            </label> Sequence Mandatory\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-sm-12\">\r\n                        <a *ngIf=\"fields.controls.length > 0\" href=\"javascript:void(0)\" (click)=\"addeditstage()\" class=\"btn btn-success mr-2\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                        <!--<a href=\"javascript:void(0)\" (click)=\"CheckValue()\" class=\"btn btn-success mr-2\"><i class=\"fa fa-save\"></i> Check</a>-->\r\n\r\n                        <a *ngIf=\"fields.controls.length > 0\" class=\"btn btn-danger\" (click)=\"cancel()\" href=\"javascript:void(0)\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n                        <a href=\"javascript:void(0)\" *ngIf=\"IsDetail\" class=\"btn btn-primary float-right mt-2 mt-sm-0\" (click)=\"addFields()\"><span><i class=\"fa fa-plus\"></i> Add Stage</span></a>\r\n                        <a *ngIf=\"!IsDetail\" class=\"btn btn-primary float-right\" href=\"javascript:void(0)\"><span><i class=\"fa fa-plus\"></i> Add Stage</span></a>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </form>\r\n               \r\n              </div>\r\n              <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n            </div>\r\n          </div>\r\n          <div class=\"tab-pane p-0 fade\" id=\"liststage\" role=\"tabpanel\">\r\n            <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n\r\n              <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                             [rows]=\"pagedData.data\"\r\n                             [columnMode]=\"'force'\"\r\n                             [headerHeight]=\"40\"\r\n                                [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                             [footerHeight]=\"40\"\r\n                             \r\n                             [externalPaging]=\"true\"\r\n                             [externalSorting]=\"true\"\r\n                             [loadingIndicator]=\"loadSave\"\r\n                             [count]=\"pagedData.pager.totalItems\"\r\n                             [offset]=\"pagedData.pager.currentPage\"\r\n                             [limit]=\"pagedData.pager.pageSize\"\r\n                             (page)='setPage($event)'\r\n                             (sort)=\"onSort($event)\">\r\n                <ngx-datatable-column name=\"Version\" [sortable]=\"true\" prop=\"BatchId\">\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n\r\n                    <a href=\"javascript:void(0);\" (click)=\"Batchid(row.BatchId)\" class=\"btn-edit\">{{row.BatchId}}</a>\r\n                  </ng-template>\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Total Record\" prop=\"Loanappid\" [sortable]=\"true\">\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n\r\n                    <a href=\"javascript:void(0);\" (click)=\"loanapp(row.BatchId)\" class=\"btn-edit\">{{row.Loanappid}}</a>\r\n                  </ng-template>\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Created On\" prop=\"Createdon\" [sortable]=\"true\">\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                    {{row.Createdon | DateTimeToLocal}}\r\n                  </ng-template>\r\n                </ngx-datatable-column>\r\n                <!--(row[col.COLUMN_NAME] | DateTimeToLocal-->\r\n                <!--<ngx-datatable-column name=\"Term\" prop=\"Term\" [sortable]=\"true\">\r\n          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n            {{row.Term}} years\r\n          </ng-template>\r\n        </ngx-datatable-column>\r\n        <ngx-datatable-column name=\"Apr\" prop=\"Apr\" [sortable]=\"true\">\r\n          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n            {{row.Apr}} %\r\n          </ng-template>\r\n        </ngx-datatable-column>-->\r\n                <!--<ngx-datatable-column name=\"Dealer Fees\" prop=\"DealerFee\" [sortable]=\"true\">\r\n          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n            {{row.DealerFee}} %\r\n          </ng-template>\r\n        </ngx-datatable-column>-->\r\n                <!--<ngx-datatable-column [width]=\"80\" name=\"Action\" [sortable]=\"false\" headerClass=\"text-right\">\r\n          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n            <div class=\"icon-text-left\">\r\n              <a (click)=\"edit(row.Id)\" class=\"btn-edit\"><i title=\"Click to edit.\" class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n              <a (click)=\"delete(row.Id)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n            </div>\r\n\r\n          </ng-template>\r\n        </ngx-datatable-column>-->\r\n\r\n                <ngx-datatable-footer>\r\n                  <ng-template ngx-datatable-footer-template\r\n                               let-rowCount=\"rowCount\"\r\n                               let-pageSize=\"pageSize\"\r\n                               let-selectedCount=\"selectedCount\"\r\n                               let-currentPage=\"currentPage\"\r\n                               let-offset=\"offset\"\r\n                               let-isVisible=\"isVisible\">\r\n                    <div class=\"page-count\">\r\n                      {{rowCount}} total\r\n                    </div>\r\n                    <div>\r\n                      <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                        <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                          <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                     bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                    <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                     [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                     [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                     [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                     [page]=\"pagedData.pager.currentPage+1\"\r\n                                     [size]=\"pageSizeValue\"\r\n                                     [count]=\"pagedData.pager.totalItems\"\r\n                                     [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                     (change)=\"setPage($event)\">\r\n                    </datatable-pager>\r\n                  </ng-template>\r\n                </ngx-datatable-footer>\r\n              </ngx-datatable>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n          <app-stageinfo #stageInfo></app-stageinfo>\r\n");

/***/ }),

/***/ "./src/app/views/configurationsetting/configurationsetting-routing.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/views/configurationsetting/configurationsetting-routing.module.ts ***!
  \***********************************************************************************/
/*! exports provided: ConfigurationSettingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationSettingRoutingModule", function() { return ConfigurationSettingRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _configurationsetting_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configurationsetting.component */ "./src/app/views/configurationsetting/configurationsetting.component.ts");
/* harmony import */ var _stageconfig_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stageconfig.component */ "./src/app/views/configurationsetting/stageconfig.component.ts");
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
    { path: '', component: _configurationsetting_component__WEBPACK_IMPORTED_MODULE_2__["ConfigurationsettingComponent"] },
    { path: 'stageconfig', component: _stageconfig_component__WEBPACK_IMPORTED_MODULE_3__["StageconfigComponent"] },
];
var ConfigurationSettingRoutingModule = /** @class */ (function () {
    function ConfigurationSettingRoutingModule() {
    }
    ConfigurationSettingRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ConfigurationSettingRoutingModule);
    return ConfigurationSettingRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/configurationsetting/configurationsetting.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/views/configurationsetting/configurationsetting.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbmZpZ3VyYXRpb25zZXR0aW5nL2NvbmZpZ3VyYXRpb25zZXR0aW5nLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/configurationsetting/configurationsetting.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/views/configurationsetting/configurationsetting.component.ts ***!
  \******************************************************************************/
/*! exports provided: ConfigurationsettingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationsettingComponent", function() { return ConfigurationsettingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _configurationsetting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configurationsetting.service */ "./src/app/views/configurationsetting/configurationsetting.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/colorpicker */ "./node_modules/primeng/colorpicker.js");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_colorpicker__WEBPACK_IMPORTED_MODULE_8__);
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









var ConfigurationsettingComponent = /** @class */ (function () {
    function ConfigurationsettingComponent(configurationsettingService, fb, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.configurationsettingService = configurationsettingService;
        this.fb = fb;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.searchUserType = '';
        this.custom_view_id = '';
        this.searchFilter = '';
        this.loading = false;
        this.sortDir = 'desc';
        this.moduleName = 'crm';
        this.submoduleName = 'lead';
        this.sortColumn = 'created_on';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.listFiltertext = '';
        this.loadSave = false;
        //chooseColor: any;
        this.colorCode = [];
        //isSystemGenerated: any;
        this.customFieldList = [];
        this.lstSystemGenerated = []; //CLDC [91120]
        this.manageStatusModel = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_2__["ManageStatusModel"]();
        this.leadConfigurationModel = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_2__["LeadConfigurationModel"]();
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
        });
        this.commonService.getMasterItemsList("custom_modules_layout").subscribe(function (result) {
            _this.lstModule = _this.commonService.masters;
        });
        //this.commonService.getMasterItemsList("solgen_usertype").subscribe((result: any) => {
        //  this.lstCompantType = this.commonService.masters;
        //})
    }
    //dynamicArray: Array<DynamicGrid> = []; 
    ConfigurationsettingComponent.prototype.ngOnInit = function () {
        this.getColorCode();
        this.initForm();
    };
    ConfigurationsettingComponent.prototype.addmoreStatus = function () {
        //this.isSystemGenerated = false;
        var control = this.configurationSetings.controls['addmoreFields'];
        control.push(this.appendInitForm());
    };
    ConfigurationsettingComponent.prototype.removeConfiguration = function (i) {
        // remove guarantor from the list
        var control = this.configurationSetings.controls['addmoreFields'];
        control.removeAt(i);
    };
    ConfigurationsettingComponent.prototype.removeGuarantor = function (i) {
        // remove guarantor from the list
        var control = this.configurationSetings.controls['addmoreFields'];
        control.removeAt(i);
    };
    ConfigurationsettingComponent.prototype.restMasterddl = function () {
    };
    ConfigurationsettingComponent.prototype.Cancel = function () {
    };
    ConfigurationsettingComponent.prototype.getColorCode = function () {
        // this.chooseColor = "#41b2f9";
        this.lstColorCode = [{ icon: "fa fa-circle blue", text: "#41b2f9", value: "#41b2f9" }, { icon: "fa fa-circle green", text: "#1f824c", value: "#1f824c" },
            { icon: "fa fa-circle red", text: "#e74b3c", value: "#e74b3c" }];
        console.log("this.lstColorCode", this.lstColorCode);
        return this.lstColorCode;
    };
    ConfigurationsettingComponent.prototype.SetSubmoduleValue = function (event) {
        var _this = this;
        this.moduleId = event;
        this.lstsubModule = null;
        this.commonService.getMasterSubModuleList(event, "custom_sub_modules_layout").subscribe(function (result) {
            _this.lstsubModule = _this.commonService.masters;
        });
    };
    ConfigurationsettingComponent.prototype.SetStatusValue = function (event) {
        var _this = this;
        this.subModuleId = event;
        debugger;
        this.configurationsettingService.GetModuleAndSubModuleData(this.moduleId, this.subModuleId, this.companyId).subscribe(function (result) {
            // this.lstsubModule = this.commonService.masters;
            _this.customFieldList1 = _this.configurationsettingService.company;
        });
        //this.companyId = 1001;
        //this.configurationsettingService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
        //  if (result) {
        //    
        //      this.customCompnentValues = this.configurationsettingService.customFieldsList.data;
        //      this.customCompnentValues.forEach(t => {
        //        if (t.dt_code== 'select') {
        //          
        //          let obj = {
        //            text: t.label,
        //            value: t.custom_field_id
        //          }
        //          this.customFieldList.push(obj);
        //        }
        //      })
        //    this.customFieldList1 = this.customFieldList;
        //    }
        //  });
    };
    ConfigurationsettingComponent.prototype.SetColorFor = function (i, event) {
        var data = this.S4();
        var rendomdata = data;
        rendomdata = this.configurationSetings.value.addmoreFields[i].chooseColor;
        this.colorCode[i] = rendomdata;
        //this.configurationSetings.value.addmoreFields[i].chooseColor;
    };
    ConfigurationsettingComponent.prototype.S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    ConfigurationsettingComponent.prototype.SetStatusData = function (event) {
        var _this = this;
        this.field = event;
        this.indx = 0; //CLDC [91120]
        this.lstSystemGenerated = ['']; //CLDC [91120]
        // this.initdisplayStatusForm();
        //debugger
        this.configurationsettingService.getManageStatusDetail(this.moduleId, this.subModuleId, this.field).subscribe(function (result) {
            if (result) {
                _this.initForm();
                _this.loadSave = false;
                _this.configurationSetings.patchValue({});
                if (result.statusSingleModels[0] != null) {
                    _this.moduleId = result.statusSingleModels[0].moduleId;
                    _this.subModuleId = result.statusSingleModels[0].subMouldeId;
                    _this.mastersId = result.statusSingleModels[0].masterId;
                    _this.field = result.statusSingleModels[0].controls;
                    result.addmoreFields.forEach(function (m) {
                        _this.addmoreFields.push(_this.initdisplayStatusForm(m));
                        _this.lstSystemGenerated[_this.indx] = m.isSystemGenerated; //CLDC [91120]
                        console.log('this.lstSystemGenerated', _this.lstSystemGenerated); //CLDC [91120]
                        _this.indx = _this.indx + 1;
                    });
                    _this.addmoreFields.removeAt(0);
                }
                if (result.statusSingleModels[0] == null) {
                    _this.initForm();
                }
            }
        });
    };
    ConfigurationsettingComponent.prototype.AddConfigurationStatus = function () {
        var _this = this;
        this.manageStatusModel.moduleId = this.moduleId;
        this.manageStatusModel.subModuleId = this.subModuleId;
        this.manageStatusModel.controls = this.field;
        this.manageStatusModel.masterId = this.mastersId;
        this.manageStatusModel.fieldsData = JSON.stringify(this.configurationSetings.value.addmoreFields);
        this.configurationsettingService.addOrUpdateManageStatus(this.manageStatusModel).subscribe(function (result) {
            if (result.statusCode == 200) {
                _this.toaster.success(result.responseMessage);
                //  window.location.href = "/configurationsetting";
                _this.router.navigateByUrl("/configurationsetting");
                //this.SetStatusData(this.field);
                setTimeout(function () { _this.loadSave = false; }, 3000);
            }
            else {
                _this.loadSave = false;
                _this.toaster.error(result.responseMessage);
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    ConfigurationsettingComponent.prototype.appendInitForm = function () {
        return this.fb.group({
            status: [''],
            description: [''],
            chooseColor: [''],
            masterId: ['']
        });
    };
    ConfigurationsettingComponent.prototype.initdisplayStatusForm = function (gurantor) {
        return this.fb.group({
            status: [gurantor.status],
            description: [gurantor.description],
            chooseColor: [gurantor.chooseColor],
            masterId: [gurantor.masterId],
            colorCode: [gurantor.chooseColor]
        });
    };
    ConfigurationsettingComponent.prototype.initForm = function () {
        this.configurationSetings = this.fb.group({
            //alert("a");
            addmoreFields: this.fb.array([
                this.appendInitForm(),
            ]),
        });
    };
    Object.defineProperty(ConfigurationsettingComponent.prototype, "addmoreFields", {
        get: function () {
            return this.configurationSetings.get('addmoreFields');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationsettingComponent.prototype, "status", {
        get: function () { return this.configurationSetings.get('status'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationsettingComponent.prototype, "description", {
        get: function () { return this.configurationSetings.get('description'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationsettingComponent.prototype, "chooseColor", {
        get: function () { return this.configurationSetings.get('chooseColor'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationsettingComponent.prototype, "masterId", {
        get: function () { return this.configurationSetings.get('masterId'); },
        enumerable: true,
        configurable: true
    });
    ConfigurationsettingComponent.ctorParameters = function () { return [
        { type: _configurationsetting_service__WEBPACK_IMPORTED_MODULE_2__["ConfigurationsettingService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearModuleDrop', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_7__["NgSelectComponent"])
    ], ConfigurationsettingComponent.prototype, "clearModuleDrop", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearSubModuleDrop', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_7__["NgSelectComponent"])
    ], ConfigurationsettingComponent.prototype, "clearSubModuleDrop", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearFieldDrop', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_7__["NgSelectComponent"])
    ], ConfigurationsettingComponent.prototype, "clearFieldDrop", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('myColorPicker', { static: false }),
        __metadata("design:type", primeng_colorpicker__WEBPACK_IMPORTED_MODULE_8__["ColorPicker"])
    ], ConfigurationsettingComponent.prototype, "myColorPicker", void 0);
    ConfigurationsettingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-configurationsetting',
            template: __importDefault(__webpack_require__(/*! raw-loader!./configurationsetting.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/configurationsetting.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./configurationsetting.component.scss */ "./src/app/views/configurationsetting/configurationsetting.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_configurationsetting_service__WEBPACK_IMPORTED_MODULE_2__["ConfigurationsettingService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], ConfigurationsettingComponent);
    return ConfigurationsettingComponent;
}());

"";


/***/ }),

/***/ "./src/app/views/configurationsetting/configurationsetting.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/configurationsetting/configurationsetting.module.ts ***!
  \***************************************************************************/
/*! exports provided: ConfigurationSettingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationSettingModule", function() { return ConfigurationSettingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _configurationsetting_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configurationsetting-routing.module */ "./src/app/views/configurationsetting/configurationsetting-routing.module.ts");
/* harmony import */ var _configurationsetting_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./configurationsetting.component */ "./src/app/views/configurationsetting/configurationsetting.component.ts");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/colorpicker */ "./node_modules/primeng/colorpicker.js");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_colorpicker__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _stageconfig_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./stageconfig.component */ "./src/app/views/configurationsetting/stageconfig.component.ts");
/* harmony import */ var _leadconfigsetting_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./leadconfigsetting.component */ "./src/app/views/configurationsetting/leadconfigsetting.component.ts");
/* harmony import */ var _loanapplication_loanapplication_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../loanapplication/loanapplication.module */ "./src/app/views/loanapplication/loanapplication.module.ts");
/* harmony import */ var _documents_master_documents_master_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./documents-master/documents-master.component */ "./src/app/views/configurationsetting/documents-master/documents-master.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





//import { NgxDatatableModule } from '@swimlane/ngx-datatable';








var ConfigurationSettingModule = /** @class */ (function () {
    function ConfigurationSettingModule() {
    }
    ConfigurationSettingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_configurationsetting_component__WEBPACK_IMPORTED_MODULE_6__["ConfigurationsettingComponent"], _stageconfig_component__WEBPACK_IMPORTED_MODULE_8__["StageconfigComponent"], _leadconfigsetting_component__WEBPACK_IMPORTED_MODULE_9__["LeadconfigsettingComponent"], _documents_master_documents_master_component__WEBPACK_IMPORTED_MODULE_11__["DocumentsMasterComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], primeng_colorpicker__WEBPACK_IMPORTED_MODULE_7__["ColorPickerModule"],
                _configurationsetting_routing_module__WEBPACK_IMPORTED_MODULE_5__["ConfigurationSettingRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _loanapplication_loanapplication_module__WEBPACK_IMPORTED_MODULE_10__["LoanApplicationModule"]
            ],
            exports: [_stageconfig_component__WEBPACK_IMPORTED_MODULE_8__["StageconfigComponent"]]
        })
    ], ConfigurationSettingModule);
    return ConfigurationSettingModule;
}());



/***/ }),

/***/ "./src/app/views/configurationsetting/documents-master/documents-master.component.scss":
/*!*********************************************************************************************!*\
  !*** ./src/app/views/configurationsetting/documents-master/documents-master.component.scss ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbmZpZ3VyYXRpb25zZXR0aW5nL2RvY3VtZW50cy1tYXN0ZXIvZG9jdW1lbnRzLW1hc3Rlci5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/configurationsetting/documents-master/documents-master.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/views/configurationsetting/documents-master/documents-master.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: DocumentsMasterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentsMasterComponent", function() { return DocumentsMasterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _configurationsetting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../configurationsetting.service */ "./src/app/views/configurationsetting/configurationsetting.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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





var DocumentsMasterComponent = /** @class */ (function () {
    function DocumentsMasterComponent(fb, configurationsettingService, toaster, router) {
        this.fb = fb;
        this.configurationsettingService = configurationsettingService;
        this.toaster = toaster;
        this.router = router;
        this.loadSave = false;
        this.colorCode = [];
        this.manageStatusModel = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_2__["ManageStatusModel"]();
        this.lstSystemGenerated = [];
    }
    DocumentsMasterComponent.prototype.ngOnInit = function () {
        this.SetStatusData();
    };
    DocumentsMasterComponent.prototype.Cancel = function () {
    };
    DocumentsMasterComponent.prototype.addmoreStatus = function () {
        var control = this.configurationSetings.controls['addmoreFields'];
        control.push(this.appendInitForm());
    };
    DocumentsMasterComponent.prototype.removeConfiguration = function (i) {
        // remove guarantor from the list
        var control = this.configurationSetings.controls['addmoreFields'];
        control.removeAt(i);
    };
    DocumentsMasterComponent.prototype.appendInitForm = function () {
        return this.fb.group({
            status: [''],
            description: [''],
            chooseColor: [''],
            masterId: ['']
        });
    };
    DocumentsMasterComponent.prototype.SetColorFor = function (i, event) {
        var data = this.S4();
        var rendomdata = data;
        rendomdata = this.configurationSetings.value.addmoreFields[i].chooseColor;
        this.colorCode[i] = rendomdata;
    };
    DocumentsMasterComponent.prototype.S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    DocumentsMasterComponent.prototype.SetStatusData = function () {
        var _this = this;
        this.field = event;
        this.indx = 0; //CLDC [91120]
        this.lstSystemGenerated = ['']; //CLDC [91120]
        // this.initdisplayStatusForm();
        //debugger
        this.configurationsettingService.GetDocumentsFromMaster().subscribe(function (result) {
            if (result) {
                _this.initForm();
                _this.loadSave = false;
                _this.configurationSetings.patchValue({});
                if (result.statusSingleModels[0] != null) {
                    _this.moduleId = result.statusSingleModels[0].moduleId;
                    _this.subModuleId = result.statusSingleModels[0].subMouldeId;
                    _this.mastersId = result.statusSingleModels[0].masterId;
                    _this.field = result.statusSingleModels[0].controls;
                    result.addmoreFields.forEach(function (m) {
                        _this.addmoreFields.push(_this.initdisplayStatusForm(m));
                        _this.lstSystemGenerated[_this.indx] = m.isSystemGenerated; //CLDC [91120]
                        console.log('this.lstSystemGenerated', _this.lstSystemGenerated); //CLDC [91120]
                        _this.indx = _this.indx + 1;
                    });
                    _this.addmoreFields.removeAt(0);
                }
                if (result.statusSingleModels[0] == null) {
                    _this.initForm();
                }
            }
        });
    };
    DocumentsMasterComponent.prototype.initForm = function () {
        this.configurationSetings = this.fb.group({
            //alert("a");
            addmoreFields: this.fb.array([
                this.appendInitForm(),
            ]),
        });
    };
    DocumentsMasterComponent.prototype.initdisplayStatusForm = function (gurantor) {
        return this.fb.group({
            status: [gurantor.status],
            description: [gurantor.description],
            chooseColor: [gurantor.chooseColor],
            masterId: [gurantor.masterId],
            colorCode: [gurantor.chooseColor]
        });
    };
    DocumentsMasterComponent.prototype.AddConfigurationStatus = function () {
        var _this = this;
        this.manageStatusModel.moduleId = null;
        this.manageStatusModel.subModuleId = null;
        this.manageStatusModel.controls = null;
        this.manageStatusModel.masterId = this.mastersId;
        this.manageStatusModel.fieldsData = JSON.stringify(this.configurationSetings.value.addmoreFields);
        this.configurationsettingService.AddUpdateDocumentsMaster(this.manageStatusModel).subscribe(function (result) {
            if (result.statusCode == 200) {
                _this.toaster.success(result.responseMessage);
                //  window.location.href = "/configurationsetting";
                _this.router.navigateByUrl("/configurationsetting");
                //this.SetStatusData(this.field);
                setTimeout(function () { _this.loadSave = false; }, 3000);
            }
            else {
                _this.loadSave = false;
                _this.toaster.error(result.responseMessage);
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    Object.defineProperty(DocumentsMasterComponent.prototype, "addmoreFields", {
        get: function () {
            return this.configurationSetings.get('addmoreFields');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentsMasterComponent.prototype, "status", {
        get: function () { return this.configurationSetings.get('status'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentsMasterComponent.prototype, "description", {
        get: function () { return this.configurationSetings.get('description'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentsMasterComponent.prototype, "chooseColor", {
        get: function () { return this.configurationSetings.get('chooseColor'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentsMasterComponent.prototype, "masterId", {
        get: function () { return this.configurationSetings.get('masterId'); },
        enumerable: true,
        configurable: true
    });
    DocumentsMasterComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _configurationsetting_service__WEBPACK_IMPORTED_MODULE_2__["ConfigurationsettingService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
    ]; };
    DocumentsMasterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-documents-master',
            template: __importDefault(__webpack_require__(/*! raw-loader!./documents-master.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/documents-master/documents-master.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./documents-master.component.scss */ "./src/app/views/configurationsetting/documents-master/documents-master.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _configurationsetting_service__WEBPACK_IMPORTED_MODULE_2__["ConfigurationsettingService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], DocumentsMasterComponent);
    return DocumentsMasterComponent;
}());



/***/ }),

/***/ "./src/app/views/configurationsetting/leadconfigsetting.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/views/configurationsetting/leadconfigsetting.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbmZpZ3VyYXRpb25zZXR0aW5nL2xlYWRjb25maWdzZXR0aW5nLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/configurationsetting/leadconfigsetting.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/configurationsetting/leadconfigsetting.component.ts ***!
  \***************************************************************************/
/*! exports provided: LeadconfigsettingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadconfigsettingComponent", function() { return LeadconfigsettingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _configurationsetting_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configurationsetting.service */ "./src/app/views/configurationsetting/configurationsetting.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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







var LeadconfigsettingComponent = /** @class */ (function () {
    function LeadconfigsettingComponent(configurationsettingService, fb, dialogService, commonService, router, activeRoute, toaster) {
        this.configurationsettingService = configurationsettingService;
        this.fb = fb;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.loading = false;
        this.CompanyId = null;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.isLinkPage = false;
        this.leadConfigurationModel = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_3__["LeadConfigurationModel"]();
        this.loadSave = false;
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.comptype = JSON.parse(localStorage.getItem("userinfo"));
    }
    LeadconfigsettingComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.getleadconfigurationDetails();
        this.pagelist();
    };
    LeadconfigsettingComponent.prototype.initForm = function () {
        this.leadSettingForm = this.fb.group({
            IsLoanapplication: [true, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            IsOpportunity: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            IsAccount: [true],
            IsContact: [false],
            fields: this.fb.array([this.buildFields()])
        });
    };
    LeadconfigsettingComponent.prototype.buildFields = function () {
        return this.fb.group({
            linkPage: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
    };
    LeadconfigsettingComponent.prototype.loanapplication = function (e) {
        if (e.target.value == 'Opportunity') {
            this.isLinkPage = false;
        }
        else {
            this.isLinkPage = true;
        }
    };
    LeadconfigsettingComponent.prototype.opportunity = function (e) {
        if (e.target.value == 'Opportunity') {
            this.isLinkPage = false;
        }
        else {
            this.isLinkPage = true;
        }
    };
    Object.defineProperty(LeadconfigsettingComponent.prototype, "fields", {
        get: function () {
            return this.leadSettingForm.get('fields');
        },
        enumerable: true,
        configurable: true
    });
    LeadconfigsettingComponent.prototype.addFields = function () {
        this.fields.push(this.buildFields());
    };
    LeadconfigsettingComponent.prototype.removeFields = function (index) {
        this.fields.removeAt(index);
    };
    LeadconfigsettingComponent.prototype.pagelist = function () {
        var _this = this;
        this.commonService.getMasterItemsList("LoanApplicationPages").subscribe(function (result) {
            _this.lstpage = _this.commonService.masters;
            console.log('LoanApplicationPages', _this.lstpage);
        });
    };
    LeadconfigsettingComponent.prototype.onChangeField = function (e, field, i) {
        var _length = e.length;
        console.log('ddd', e);
        for (var a = 0; a < this.fields.controls.length - 1; a++) {
            var ab = this.fields.controls[a].value.linkPage;
            console.log('display', this.fields.controls[a]);
            var isflag = 0;
            // var index = this.fields.controls[a].value.linkPage  .indexOf(e[_length - 1].value);
            if (e.value == ab) {
                // this.fields.controls[i].value.linkPage.splice(e.value)
                //  this.fields.removeAt(i);
                isflag = 1;
                this.toaster.success("This section is already linked.");
            }
            if (isflag == 1) {
                this.fields.controls[i].get('linkPage').setValue('');
            }
        }
        console.log('test', this.fields);
    };
    //Get Lead Configuration Details
    LeadconfigsettingComponent.prototype.getleadconfigurationDetails = function () {
        var _this = this;
        while (this.fields.length != 0) {
            this.fields.removeAt(0);
        }
        this.configurationsettingService.GetLeadConfigurationDetails(this.CompanyId).subscribe(function (leadresult) {
            console.log('leadresult', leadresult);
            if (leadresult.isLoanapplication == true) {
                _this.isLinkPage = true;
                var ab = leadresult.moduleWizard.split(',');
                console.log('JSOn', ab);
                ab.forEach(function (x, i) {
                    _this.fields.push(_this.fb.group({
                        linkPage: [x],
                    }));
                });
            }
            _this.leadSettingForm.patchValue({
                IsLoanapplication: (leadresult.isLoanapplication) ? "LoanApplication" : "Opportunity",
                //IsLoanapplication: (leadresult.isOpportunity) ? "Opportunity" : false,  
                IsAccount: leadresult.isAccount,
                IsContact: leadresult.isContact,
            });
            //    if (leadresult) {
            //      this.fb.group({
            //        IsLoanapplication: [(leadresult.leadConfigurationModel.IsLoanapplication) ? "LoanApplication" : false],
            //        IsOpportunity: [(leadresult.leadConfigurationModel.IsOpportunity) ? "Opportunity" : false],
            //        IsAccount: [leadresult.leadConfigurationModel.IsAccount],
            //        IsContact: [leadresult.leadConfigurationModel.IsContact]
            //      })
            //  //this.leadSettingForm.value.IsLoanapplication = 
            //  //this.leadSettingForm.value.IsOpportunity = ;
            //  //this.leadSettingForm.value.IsAccount = ;
            //  //this.leadSettingForm.value.IsContact = ;
            //}
        });
    };
    //Save/Update Lead Configuration Details
    LeadconfigsettingComponent.prototype.ManageLeadConfiguration = function () {
        var _this = this;
        if (this.leadSettingForm.valid) {
            console.log('value: ', this.leadSettingForm.value);
            //this.loading = true;
            this.leadConfigurationModel.IsLoanapplication = (this.leadSettingForm.value.IsLoanapplication == "LoanApplication") ? true : false;
            this.leadConfigurationModel.IsOpportunity = (this.leadSettingForm.value.IsLoanapplication == "Opportunity") ? true : false;
            this.leadConfigurationModel.moduleWizard = this.leadSettingForm.value.fields.map(function (m) { return m.linkPage; }).join();
            this.configurationsettingService.ManageLeadConfiguration(this.leadConfigurationModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.getleadconfigurationDetails();
                    //setTimeout(() => {
                    //  window.location.reload();
                    //}, 3000);
                }
                else {
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                _this.loading = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.leadSettingForm);
        }
    };
    Object.defineProperty(LeadconfigsettingComponent.prototype, "IsLoanapplication", {
        get: function () { return this.leadSettingForm.get('IsLoanapplication'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconfigsettingComponent.prototype, "IsOpportunity", {
        get: function () { return this.leadSettingForm.get('IsOpportunity'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconfigsettingComponent.prototype, "IsAccount", {
        get: function () { return this.leadSettingForm.get('IsAccount'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconfigsettingComponent.prototype, "IsContact", {
        get: function () { return this.leadSettingForm.get('IsContact'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconfigsettingComponent.prototype, "linkPage", {
        get: function () { return this.leadSettingForm.get('linkPage'); },
        enumerable: true,
        configurable: true
    });
    LeadconfigsettingComponent.ctorParameters = function () { return [
        { type: _configurationsetting_service__WEBPACK_IMPORTED_MODULE_3__["ConfigurationsettingService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] }
    ]; };
    LeadconfigsettingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-leadconfigsetting',
            template: __importDefault(__webpack_require__(/*! raw-loader!./leadconfigsetting.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/leadconfigsetting.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./leadconfigsetting.component.scss */ "./src/app/views/configurationsetting/leadconfigsetting.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_configurationsetting_service__WEBPACK_IMPORTED_MODULE_3__["ConfigurationsettingService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"]])
    ], LeadconfigsettingComponent);
    return LeadconfigsettingComponent;
}());



/***/ }),

/***/ "./src/app/views/configurationsetting/stageconfig.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/views/configurationsetting/stageconfig.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbmZpZ3VyYXRpb25zZXR0aW5nL3N0YWdlY29uZmlnLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/configurationsetting/stageconfig.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/configurationsetting/stageconfig.component.ts ***!
  \*********************************************************************/
/*! exports provided: StageconfigComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StageconfigComponent", function() { return StageconfigComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configurationsetting.service */ "./src/app/views/configurationsetting/configurationsetting.service.ts");
/* harmony import */ var _loanapplication_stageinfo_stageinfo_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../loanapplication/stageinfo/stageinfo.component */ "./src/app/views/loanapplication/stageinfo/stageinfo.component.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
var __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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

//import { NgSelectModule } from '@ng-select/ng-select';








var StageconfigComponent = /** @class */ (function () {
    function StageconfigComponent(fb, configurationsettingService, router, dialogService, toaster, route, commonService) {
        var _this = this;
        this.fb = fb;
        this.configurationsettingService = configurationsettingService;
        this.router = router;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.lstpagearray = [];
        this.selectedTexts = [];
        this.selectedPages = [];
        this.selectedPagesmaster = [];
        this.fieldmodel = [];
        this.count = true;
        this.stagemodel = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["SubstageModel"]();
        this.substage = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["substage"]();
        this.savesubstageModel = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["savesubstageModel"]();
        this.index = -1;
        this.IsDetail = true;
        this.sortDir = 'desc';
        this.sortColumn = 'BatchId';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.loadSave = false;
        this.batchid = 0;
        this.showstage = false;
        this.isFinancial = false;
        this.isStateManagement = false;
        this.commonService.getMasterItemsList("solgen_usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            console.log('userdetail', userdetail);
            if (userdetail.companyType === 'companytypeFinancialInstitute') {
                _this.isFinancial = true;
                if (_this.isFinancial == true) {
                    _this.showstage = true;
                }
            }
        });
        this.commonService.getMasterItemsList("custom_modules").subscribe(function (result) {
            _this.lstModule = _this.commonService.masters;
            console.log('lstModule', _this.lstModule);
            console.log('isFinancial', _this.isFinancial);
            _this.lstModule.filter(function (x) {
                if (_this.isFinancial) {
                    if (x.name.toLowerCase() == "finance") {
                        _this.moduleId = x.value;
                        _this.SetSubmoduleValue(_this.moduleId);
                        console.log('moduleId', _this.moduleId);
                    }
                }
            });
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
    }
    StageconfigComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.loadSave = false;
        this.pageSizeValue = 10;
        var ab = this.commonService.getQueryStringValue("id");
        if (ab != null) {
            this.batchid = parseInt(ab);
            this.IsDetail = false;
            this.fillform(parseInt(ab), this.moduleId, this.subModuleId);
        }
        var mid = this.commonService.getQueryStringValue("moduleid");
        var sid = this.commonService.getQueryStringValue("submoduleid");
        if (mid != null && sid != null) {
            this.moduleId = mid;
            this.SetSubmoduleValue(this.moduleId);
            this.subModuleId = sid;
            this.SetStatusValue(this.subModuleId);
            this.isStateManagement = true;
            console.log('.moduleId', this.moduleId);
            console.log('.subModuleId ', this.subModuleId);
        }
        //else {   
        //  this.fillform(this.batchid);
        //  this.IsDetail = true;
        //}
    };
    StageconfigComponent.prototype.initForm = function () {
        this.stageform = this.fb.group({
            fields: this.fb.array([this.buildFields()]),
            sequence_mandatory: [false]
        });
    };
    Object.defineProperty(StageconfigComponent.prototype, "fields", {
        get: function () {
            return this.stageform.get('fields');
        },
        enumerable: true,
        configurable: true
    });
    StageconfigComponent.prototype.getusertype = function () {
        var _this = this;
        this.commonService.getMasterItemsList("solgen_usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
    };
    StageconfigComponent.prototype.fillform = function (id, moduleid, submoduleid) {
        var _this = this;
        this.showstage = true;
        this.loadSave = true;
        while (this.fields.length != 0) {
            this.fields.removeAt(0);
        }
        setTimeout(function () {
            _this.fields.reset();
            var currentContext = _this;
            _this.configurationsettingService.getloansubstage(id, moduleid, submoduleid).subscribe(function (result) {
                console.log('result0000', result);
                if (result.length == 0) {
                    result = [];
                }
                else {
                    currentContext.stageform.patchValue({
                        sequence_mandatory: result[0].sequence_mandatory
                    });
                    if (_this.moduleId != result[0].moduleid) {
                        _this.moduleId = result[0].moduleid.toString();
                        _this.SetSubmoduleValue(_this.moduleId);
                        _this.subModuleId = result[0].submoduleid.toString();
                    }
                }
                var arr = [];
                arr = result;
                if (result.length > 0) {
                    currentContext.fields.removeAt(0);
                }
                arr.forEach(function (x, i) {
                    var objlist = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["stagepagelinks"]();
                    x.pages.split(',').forEach(function (item) {
                        objlist = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["stagepagelinks"]();
                        objlist.id = i;
                        objlist.values = item;
                        currentContext.lstpagearray.push(objlist);
                    });
                    x.usertype = x.usertype.split(templateObject_1 || (templateObject_1 = __makeTemplateObject([","], [","]))).map(function (x) { return +x; });
                    result.usertype = x.usertype.map(function (value) {
                        return String(value);
                    });
                    x.pages = x.pages.split(templateObject_2 || (templateObject_2 = __makeTemplateObject([","], [","]))).map(function (x) { return +x; });
                    result.pages = x.pages.map(function (value) {
                        return String(value);
                    });
                    currentContext.selectedTexts = [];
                    currentContext.selectedPages = [];
                    currentContext.selectedPagesmaster = [];
                    result.usertype.forEach(function (x) {
                        currentContext.selectedTexts.push(x);
                    });
                    result.pages.forEach(function (x) {
                        currentContext.selectedPages.push(x);
                    });
                    if (x.pagesmaster != null) {
                        x.pagesmaster = x.pagesmaster.split(templateObject_3 || (templateObject_3 = __makeTemplateObject([","], [","]))).map(function (x) { return +x; });
                        result.pagesmaster = x.pagesmaster.map(function (value) {
                            return String(value);
                        });
                        result.pagesmaster.forEach(function (x) {
                            currentContext.selectedPagesmaster.push(x);
                        });
                    }
                    if (x.parentid === null) {
                        _this.fields.push(_this.fb.group({
                            id: [x.id],
                            stagename: [x.stagename],
                            substageid: [x.substageid],
                            duedays: [x.duedays],
                            usertype: [currentContext.selectedTexts],
                            pages: [currentContext.selectedPages],
                            pagesmaster: [currentContext.selectedPagesmaster],
                            mandatory: [x.mandatory],
                            substages: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]),
                        }));
                        console.log('fields', _this.fields);
                        if (_this.batchid != 0) {
                            _this.fields.controls.forEach(function (m) {
                                m.get('pages').disable();
                            });
                        }
                    }
                    else {
                        var control = _this.stageform.get('fields');
                        var VB = (control.controls[control.controls.findIndex(function (item) { return item.value.id == x.parentid; })].get('substages'));
                        VB.push(_this.buildFieldsstagesnew(x, currentContext.selectedTexts, currentContext.selectedPages, currentContext.selectedPagesmaster));
                        //this.substagefields.controls.forEach(m => { 
                        //  m.get('pagessubstage').disable();
                        //});
                    }
                });
            });
            _this.pagelist(_this.moduleId, _this.subModuleId);
            _this.GetSubStageDll();
            _this.pageSizeValue = 10;
            _this.getPageSizes();
            _this.getusertype();
            _this.loadSave = false;
        }, 2000);
    };
    //OnCheckedSequence(f: FormGroup, e): string {
    //  const len = (<FormArray>f.get('substages')).controls.length;
    //  if (len > 1) {
    //    return (<FormArray>f.get('substages')).controls[len - 1].get("issequenceforsubstage").value === "Sequence" ? "Sequence" : "Parallel"
    //  }
    //  return "Sequence";
    //}
    //OnCheckedParallel(f: FormGroup, e): string {
    //  const len = (<FormArray>f.get('substages')).controls.length;
    //  if (len > 1) {
    //    return (<FormArray>f.get('substages')).controls[len - 1].get("issequenceforsubstage").value === "Parallel" ? "Parallel" : "Sequence"
    //  }
    //  return "Parallel";
    //}
    //OnSequenceChanged(f: FormGroup, e) {
    //  (<FormArray>f.get('substages')).controls.forEach(s => {
    //    s.patchValue(
    //      {
    //        isSequence: e.target.value
    //      });
    //  })
    //}
    StageconfigComponent.prototype.setseqvalue = function (f, valuesel, i) {
        //const controls = <FormArray>this.stageform.get('fields');
        //const VB = (<FormArray>(controls.controls[i].get('substages')));
        //VB.controls.forEach(m => {
        //  m.get('issequenceforsubstage').setValue(valuesel.target.value);
        //})
        f.get('substages').controls.forEach(function (s) {
            //// console.log(s);
            s.get('issequenceforsubstage').setValue(valuesel.target.value);
        });
    };
    StageconfigComponent.prototype.addFields = function () {
        this.fields.push(this.buildFields());
    };
    StageconfigComponent.prototype.ShowForms = function (field, type) {
        var _this = this;
        var linkPages = "";
        console.log('field.value', field.value);
        var pages = type == "sub" ? field.value.pagessubstage : field.value.pages;
        var formpages = type == "sub" ? field.value.pagessubmaster : field.value.pagesmaster;
        pages.forEach(function (item) {
            var items = _this.lstpage.filter(function (val) {
                return val.value == item;
            });
            if (items != null) {
                if (linkPages.length > 0) {
                    linkPages += ",";
                }
                linkPages += items[0].text;
            }
        });
        var item = {
            LinkFormMaster: linkPages,
            loan_app_stage_name: linkPages,
            ApplicantSubmitted: 0,
            CoApplicantSubmitted: 0,
            ExpansesSubmitted: 0,
            InstallationPropertySubmitted: 0,
            LoanInformationSubmitted: 0,
            NTPSubmitted: 0,
            PaymentInfoSubmitted: 0,
            ProductInfoSubmitted: 0,
            ReleaseFundsSubmitted: 0,
            formmasterid: JSON.stringify(pages),
            stageActive: 0,
            stageName: type == "sub" ? field.value.substagename : field.value.stagename,
            stageclass: "step-grey",
            userTypes: ""
        };
        this.stageInfo.show(item, false, false);
    };
    Object.defineProperty(StageconfigComponent.prototype, "substagefields", {
        get: function () {
            //  //this.MaintFormGroup.get('FormArrayOne');
            //  //control.push(this.initArrayOne());
            var control = this.stageform.get('fields');
            return control.controls[0].get('substages');
        },
        enumerable: true,
        configurable: true
    });
    StageconfigComponent.prototype.removeSubstageFields = function (f, i) {
        var _this = this;
        var message = "Are you sure you want to delete substage ?";
        this.dialogService.confirm('Delete Substage', message).subscribe(function (confirmed) {
            if (confirmed) {
                var ab = f.get('substages');
                ab.removeAt(i);
                var arr = [];
                arr = _this.fields.value;
                _this.lstpagearray = [];
                arr.forEach(function (x, i) {
                    var objlist = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["stagepagelinks"]();
                    x.pages.forEach(function (item) {
                        objlist = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["stagepagelinks"]();
                        objlist.id = i;
                        objlist.values = item;
                        _this.lstpagearray.push(objlist);
                    });
                });
                _this.toaster.success("Substage has been deleted successfully..");
            }
        });
    };
    //addSubStageFields(i) {
    //  const control = <FormArray>this.stageform.get('fields');
    //  const VB = (<FormArray>(control.controls[i].get('substages')));
    //  if (VB.controls.length >= 3) {
    //    this.toaster.success("You can not add more than 3 sub stages.");
    //  }
    //  else {
    //    const VB = (<FormArray>(control.controls[i].get('substages')));
    //    VB.push(this.buildFieldsstages());
    //  }
    //}
    StageconfigComponent.prototype.addSubStageFields = function (i) {
        var control = this.stageform.get('fields');
        var VB = (control.controls[i].get('substages'));
        if (VB.controls.length >= 3) {
            this.toaster.error("You can not add more than 3 sub stages.");
        }
        else {
            var data = "Sequence";
            if (VB.controls.length > 0) {
                data = VB.controls[0].get("issequenceforsubstage").value.toString();
            }
            VB.push(this.buildFieldsstages(data));
        }
    };
    //CheckValue() {
    //  const control = <FormArray>this.stageform.get('fields');
    //}
    StageconfigComponent.prototype.pagelist = function (moduleid, submoduleid) {
        var _this = this;
        this.configurationsettingService.GetStagePages(moduleid, submoduleid).subscribe(function (result) {
            console.log('result23', result);
            _this.lstpage = result;
        });
    };
    StageconfigComponent.prototype.removeFields = function (index) {
        var _this = this;
        var message = "Are you sure you want to delete Stage?";
        this.dialogService.confirm('Delete Stage', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.fields.removeAt(index);
                var arr = [];
                arr = _this.fields.value;
                _this.lstpagearray = [];
                arr.forEach(function (x, i) {
                    var objlist = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["stagepagelinks"]();
                    x.pages.forEach(function (item) {
                        objlist = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["stagepagelinks"]();
                        objlist.id = i;
                        objlist.values = item;
                        _this.lstpagearray.push(objlist);
                    });
                });
                _this.toaster.success("Stage has been deleted successfully..");
            }
        });
    };
    StageconfigComponent.prototype.GetSubStageDll = function () {
        var _this = this;
        this.configurationsettingService.GetSubStageDll().subscribe(function (result) {
            _this.sustagelist = result;
        });
    };
    StageconfigComponent.prototype.onDropSuccess = function () {
        this.fields.controls.values;
        //forEach((item, i) => item.display_order = i);
    };
    //selcdropdownsubstage(event,i) {
    //  const control = <FormArray>this.stageform.get('fields');
    //  //control.controls.values[i]('substages')
    //  control.value[i].substages[0].pagessubstage = event.value;
    //  //const VB = (control.value[i]('substages'));          
    //}
    StageconfigComponent.prototype.addeditstage = function () {
        // (this.moduleId != null && this.moduleId == undefined && thi)
        var _this = this;
        if (this.stageform.valid) {
            var sequencemandatory = this.stageform.value.sequence_mandatory;
            var data = [];
            for (var i = 0; i < this.fields.controls.length; i++) {
                data.push(this.fields.controls[i].value);
                this.fields.controls[i].value.display_order = i;
            }
            var stagedata = JSON.stringify(data);
            this.savesubstageModel.batchid = this.batchid;
            this.savesubstageModel.stagedata = stagedata;
            this.savesubstageModel.sequencemandatory = sequencemandatory;
            this.savesubstageModel.subModuleId = this.subModuleId;
            this.savesubstageModel.moduleId = this.moduleId;
            this.configurationsettingService.savesubstageconfig(this.savesubstageModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.SetSubmoduleValue(_this.subModuleId);
                    if (_this.isStateManagement) {
                        _this.router.navigateByUrl("/statemanagement");
                    }
                }
                else {
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
            });
        }
        else {
            this.commonService.validateAllFormFields(this.stageform);
        }
    };
    StageconfigComponent.prototype.buildFields = function () {
        this.index = this.index + 1;
        return this.fb.group({
            id: [''],
            stagename: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            substageid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            duedays: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            usertype: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            pages: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            mandatory: [false, ''],
            display_order: [''],
            sname: [''],
            sutype: [null],
            ptype: [null],
            substages: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([])
        });
    };
    StageconfigComponent.prototype.buildFieldsstages = function (val) {
        if (val === void 0) { val = null; }
        return this.fb.group({
            id: [''],
            substagename: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            usertypesubstage: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            pagessubstage: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            pagessubmaster: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            issequenceforsubstage: [val, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
    };
    StageconfigComponent.prototype.buildFieldsstagesnew = function (x, selectedTexts, selectedPages, selectedformPages) {
        var control = this.fb.group({
            id: [x.id],
            substagename: [x.stagename, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            usertypesubstage: [selectedTexts, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            pagessubstage: [selectedPages, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            pagessubmaster: [selectedformPages, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            issequenceforsubstage: [(x.issequenceforsubstage), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        if (this.batchid != 0) {
            control.get('pagessubstage').disable();
        }
        return control;
    };
    StageconfigComponent.prototype.selcdropdown = function (e, field, i) {
        console.log('4555', e);
        var _length = e.length;
        var flag = true;
        if (_length > 0) {
            this.lstpagearray.forEach(function (item) { if (item.id != i && item.values == e[_length - 1].value) {
                flag = false;
                return;
            } });
            if (flag) {
                var linkspages = new _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["stagepagelinks"]();
                linkspages.id = i;
                linkspages.values = e[_length - 1].value;
                var index1 = this.lstpagearray.findIndex(function (item) { return item.values == e[_length - 1].value; });
                if (index1 == -1) {
                    this.lstpagearray.push(linkspages);
                }
            }
            else {
                //var valuess = field.value.pages.splice(field.value.pages.indexOf(e[_length - 1].value), 0);
                var index = field.value.pages.indexOf(e[_length - 1].value);
                if (index > -1) {
                    //field.value.pages.splice(index, 1);
                    var arrvval = field.value.pages.splice(index, 1);
                    field.get('pages').setValue(field.value.pages);
                }
                this.toaster.success("This section is already linked.");
            }
        }
        return flag;
    };
    StageconfigComponent.prototype.resetlinkpages = function (e, field, i) {
        var index = this.lstpagearray.findIndex(function (item) { return item.values === e.value.value; });
        if (index > -1) {
            //field.value.pages.splice(index, 1);
            this.lstpagearray.splice(index, 1);
            var index11 = field.value.pages.indexOf(e.value.value);
            if (index11 > -1) {
                //field.value.pages.splice(index, 1);
                var arrvval = field.value.pages.splice(index, 1);
                field.get('pages').setValue(field.value.pages);
            }
        }
    };
    Object.defineProperty(StageconfigComponent.prototype, "stagename", {
        //GoUP() {
        //  let elemt = this.fields.controls[1];
        //  this.fields.controls[1] = this.fields.controls[0];
        //  this.fields.controls[0] = elemt;
        //}
        get: function () { return this.stageform.get('stagename'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "substageid", {
        get: function () { return this.stageform.get('substageid'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "duedays", {
        get: function () { return this.stageform.get('duedays'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "usertype", {
        get: function () { return this.stageform.get('usertype'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "substages", {
        get: function () { return this.stageform.get('substages'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "pages", {
        get: function () { return this.stageform.get('pages'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "pagesmaster", {
        get: function () { return this.stageform.get('pagesmaster'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "mandatory", {
        get: function () { return this.stageform.get('mandatory'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "display_order", {
        get: function () { return this.stageform.get('display_order'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "sequence_mandatory", {
        get: function () { return this.stageform.get('sequence_mandatory'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "substagename", {
        //get substagename() { return this.stageform.get('substagename'); }
        //get usertypesubstage() { return this.stageform.get('usertypesubstage'); }
        //get pagessubstage() { return this.stageform.get('pagessubstage'); }
        get: function () { return this.stageform.get('substagename'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "usertypesubstage", {
        //get substagename() { return this.stageform.get('fields').get('substages'); }
        get: function () { return this.stageform.get('usertypesubstage'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageconfigComponent.prototype, "pagessubstage", {
        get: function () { return this.stageform.get('pagessubstage'); },
        enumerable: true,
        configurable: true
    });
    /////////////////lOan list start
    StageconfigComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    StageconfigComponent.prototype.refresh = function () {
        var _this = this;
        this.configurationsettingService.getStagesList(this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleId, this.subModuleId).subscribe(function (response) {
            _this.pagedData = _this.configurationsettingService.pagedData;
        }, function (error) {
            ;
        });
    };
    StageconfigComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.lstPageSize = $event.page - 1;
        this.configurationsettingService.getStagesList(this.sortColumn, this.sortDir, this.lstPageSize, this.pageSizeValue, this.moduleId, this.subModuleId).subscribe(function (response) {
            _this.pagedData = _this.configurationsettingService.pagedData;
        }, function (error) {
            ;
        });
    };
    StageconfigComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.lstPageSize = $event.page - 1;
        this.configurationsettingService.getStagesList(this.sortColumn, this.sortDir, this.lstPageSize, this.pageSizeValue, this.moduleId, this.subModuleId).subscribe(function (response) {
            _this.pagedData = _this.configurationsettingService.pagedData;
        }, function (error) {
            ;
        });
    };
    StageconfigComponent.prototype.Batchid = function (id) {
        this.batchid = id;
        //this.detailTab();    
        this.IsDetail = false;
        var element1 = document.getElementById("list-stage");
        var element2 = document.getElementById("liststage");
        element1.classList.remove("active");
        element2.classList.remove("active");
        element2.classList.remove("hide");
        var element = document.getElementById("lead-tab");
        var element3 = document.getElementById("Stage");
        element.classList.add("active");
        element3.classList.add("active");
        element3.classList.add("show");
        this.fillform(this.batchid, this.moduleId, this.subModuleId);
    };
    StageconfigComponent.prototype.loanapp = function (id) {
        //this.router.navigateByUrl('loanApplication/' + id);
        this.router.navigate(['loanApplication'], { queryParams: { id: id } });
    };
    StageconfigComponent.prototype.cancel = function () {
        this.batchid = 0;
        this.moduleId = null;
        this.subModuleId = null;
        this.showstage = false;
        this.IsDetail = true;
        this.pagelist(this.moduleId, this.subModuleId);
        this.GetSubStageDll();
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
        //this.fillform(this.batchid, this.moduleId, this.subModuleId);
        this.router.navigateByUrl("/configurationsetting/stageconfig");
    };
    StageconfigComponent.prototype.SetSubmoduleValue = function (event) {
        var _this = this;
        this.moduleId = event;
        this.lstsubModule = null;
        this.subModuleId = null;
        this.commonService.getMasterSubModuleList(event, "custom_sub_modules").subscribe(function (result) {
            _this.lstsubModule = _this.commonService.masters;
            console.log('this.lstsubModule', _this.lstsubModule);
            _this.lstsubModule.filter(function (x) {
                if (_this.isFinancial) {
                    if (x.name == "loanapplication") {
                        _this.subModuleId = x.value;
                        console.log('subModuleId', _this.subModuleId);
                        _this.SetStatusValue(_this.subModuleId);
                    }
                    //
                }
            });
            //this.lstsubModule(childObj => {
            //  if (childObj.name == 'loanapplication') {
            //    alert(childObj.value)
            //  }
            //})
        });
    };
    StageconfigComponent.prototype.SetStatusValue = function (event) {
        this.subModuleId = event;
        this.showstage = true;
        this.pagelist(this.moduleId, this.subModuleId);
        var ab = this.commonService.getQueryStringValue("id");
        if (ab == null) {
            //  this.batchid = parseInt(ab);
            //  this.IsDetail = false;
            //  this.fillform(parseInt(ab), this.moduleId, this.subModuleId);
            //}
            //else {
            this.fillform(this.batchid, this.moduleId, this.subModuleId);
        }
        this.refresh();
        this.IsDetail = true;
        //    }
        console.log('subModuleId', this.subModuleId);
        console.log('moduleId', this.moduleId);
    };
    StageconfigComponent.prototype.calaulate = function () {
        var _this = this;
        setTimeout(function () {
            _this.loadSave = false;
            _this.table.recalculate();
            _this.table.recalculateColumns();
        }, 200);
    };
    StageconfigComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["ConfigurationsettingService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('stageInfo', { static: false }),
        __metadata("design:type", _loanapplication_stageinfo_stageinfo_component__WEBPACK_IMPORTED_MODULE_6__["StageinfoComponent"])
    ], StageconfigComponent.prototype, "stageInfo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], StageconfigComponent.prototype, "table", void 0);
    StageconfigComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-stageconfig',
            template: __importDefault(__webpack_require__(/*! raw-loader!./stageconfig.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/configurationsetting/stageconfig.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./stageconfig.component.scss */ "./src/app/views/configurationsetting/stageconfig.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["ConfigurationsettingService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], StageconfigComponent);
    return StageconfigComponent;
}());

var templateObject_1, templateObject_2, templateObject_3;


/***/ })

}]);
//# sourceMappingURL=default~views-configurationsetting-configurationsetting-module~views-statemanagement-statemanagement-module.js.map