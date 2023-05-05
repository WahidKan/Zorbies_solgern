(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-document-maker-route-rule-document-maker-route-rule-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-route-rule/add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component.html":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-route-rule/add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component.html ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n    <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n    <div class=\"breadcrumb-wrapper\">\r\n      <ol class=\"breadcrumb\">\r\n        <li>\r\n          <a routerLink=\"/dashboard\">Dashboard</a>\r\n        </li>\r\n        <li><a routerLink=\"/document-maker-routerule\">Route/Rule</a></li>\r\n        <li class=\"active\">{{pageTitle}}</li>\r\n      </ol>\r\n    </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel cntainerwithoutbg clearfix\">\r\n    <div class=\"panel-content clearfix mb-4 p-0\">\r\n      <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" *ngIf=\"id != null && id > 0\" role=\"tablist\">\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link active show\" id=\"lead-tab\"\r\n              data-toggle=\"tab\" href=\"#RouteRule\" role=\"tab\" aria-selected=\"true\">RouteRule</a>\r\n        </li>\r\n      </ul>\r\n      <div class=\"tab-content\" id=\"myTabContent\">\r\n        <div class=\"tab-pane fade active show\" id=\"RouteRule\" role=\"tabpanel\">\r\n          <div class=\"row\">\r\n            <div class=\"col-lg-12 portlets\">\r\n                <div>\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-12\">\r\n                        <label>Route Name:</label>\r\n                        <div class=\"form-group\">\r\n                          <input type=\"text\" [(ngModel)]=\"dataRouteRequestModel.name\" class=\"form-control\" />\r\n                        </div>\r\n                      </div>\r\n          \r\n                    </div>\r\n                    <div class=\"row\">\r\n                      <div *ngFor=\"let rule of dataRouteRequestModel.rules; index as i;\" class=\"col-md-12 mrules mb-3\">\r\n                        <div *ngIf=\"rule.deleted == false\">\r\n                          <div class=\"border\">\r\n                            <div class=\"rule-header step-default border mb-2 col-md-12\">\r\n                              <span class=\"rule-name\">Rule <input type=\"text\" [(ngModel)]=\"rule.sort\" /></span>\r\n                              <button type=\"button\" class=\"btn btn-danger float-right\" (click)=\"deleteRule(rule)\">\r\n                                <i class=\"fa fa-trash\"></i> Delete\r\n                              </button>\r\n                            </div>\r\n                            <!-- <ng-option *ngFor=\"let document of documentList\" bindLabel=\"text\" [value]=\"document.value\">{{document.text}}</ng-option> -->\r\n                            <div class=\"row px-3\">\r\n                              <div class=\"Sent-datato col-md-6\">\r\n                                <label>Send Data to Document:<span class=\"text-danger\">*</span></label>\r\n                                <ng-select [(ngModel)]=\"rule.document_id\" [closeOnSelect]=\"true\" [items]=\"documentList\" bindLabel=\"text\">\r\n                                </ng-select>\r\n                              </div>\r\n                              <div class=\"col-md-6\">\r\n                                <label>Include in combined PDF</label>\r\n                                <div class=\"form-group\">\r\n                                  <label class=\"switch\">\r\n                                    <input type=\"checkbox\" checked (change)=\"onCombineChanged(rule)\" />\r\n                                    <span class=\"slider round\">\r\n                                      <span>Yes</span>\r\n                                    </span>\r\n                                  </label>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-md-12\">\r\n                              <div class=\"list-group\" style=\"min-height: 210px;\">\r\n                                <h3 class=\"form-heading\">Trigger this rule if:</h3>\r\n                                <ul class=\"form-header\">\r\n                                  <li class=\"pl-3\">Field</li>\r\n                                  <li class=\"pl-3\"></li>\r\n                                  <li class=\"pl-3\">Value</li>\r\n                                </ul>\r\n                                <div *ngFor=\"let condition of rule.conditions; index as j;\">\r\n                                  <div *ngIf=\"condition.deleted == false\">\r\n                                    <ul *ngIf=\"j > 0\" class=\"from-rules text-center\">\r\n                                      <li class=\"text-center\">\r\n                                        <span class=\"or-and rounded-circle\">{{condition.operator}}</span>\r\n                                      </li>\r\n                                    </ul>\r\n                                    <ul class=\"from-rules\">\r\n                                      <li class=\"form-group align-middle px-2\">\r\n                                        <ng-select [items]=\"documentFields\" [(ngModel)]=\"condition.field\" bindLabel=\"text\" [closeOnSelect]=\"true\" [searchable]=\"true\">\r\n                                        </ng-select>\r\n                                      </li>\r\n                                      <li class=\"form-group align-middle px-2\">\r\n                                        <ng-select class=\"form-control\" [(ngModel)]=\"condition.exp\" [closeOnSelect]=\"true\">\r\n                                          <ng-option *ngFor=\"let expression of expressions\" [value]=\"expression.value\">{{expression.name}}</ng-option>\r\n                                        </ng-select>\r\n                                      </li>\r\n                                      <li class=\"form-group align-middle px-2\">\r\n                                        <input class=\"form-control\" type=\"text\" [(ngModel)]=\"condition.value\" placeholder=\"Field\" />\r\n                                      </li>\r\n                                      <li class=\"text-center\">\r\n                                        <a href=\"javscript:;\" (click)=\"deleteCondition(rule, condition)\" class=\"text-red font-16\"><i class=\"fa fa-trash\"></i></a>\r\n                                      </li>\r\n                                    </ul>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"p-3 text-center\">\r\n                              <div class=\"cstm-drop-btn text-center\">\r\n                                <select #currentCondition class=\"btn ddlupdatestatus btn-success\" (change)=\"onChange(currentCondition, $event, rule)\">\r\n                                  <option selected=\"selected\"> Add</option>\r\n                                  <option>Or</option>\r\n                                  <option>And</option>\r\n                                </select>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                    \r\n                      </div>\r\n                    </div>\r\n                    <div class=\"row mt-3\" >\r\n                        <div class=\"col-sm-12 col-md-12\">\r\n                            <button type=\"button\" class=\"btn btn-primary mr-1\" (click)=\"addNewRule()\"><i class=\"fa fa-plus\"></i> Add New Rule</button>\r\n                            <button class=\"btn btn-success mr-2\" href=\"javascript:void(0);\" (click)=\"save()\"><span><i class=\"fa fa-save\"></i> Submit</span></button>\r\n                            <a routerLink=\"/document-maker-routerule\" class=\"btn btn-danger\" href=\"javascript:void(0);\"><span><i class=\"fa fa-close\"></i> Cancel</span></a>\r\n                        </div>\r\n                    </div>\r\n                    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n                  </div>\r\n              <!-- <form [formGroup]=\"addEditForm\">\r\n                  <h3 class=\"form-heading mt-0\"> <span>Route/Rule Details</span></h3>\r\n                    <div formArrayName=\"routeRuleArray\" class=\"row\">\r\n                        <div class=\"col-12\" *ngFor=\"let route of routes.controls;let i = index\" [formGroupName]=\"i\">\r\n                        <div class=\"col-12\">\r\n                            <div class=\"form-group\">\r\n                                <button class=\"btn btn-success mr-2\" href=\"javascript:void(0);\" (click)=\"resetRouteRule(i)\"><span><i class=\"fa fa-undo\"></i></span></button>\r\n                                <button *ngIf=\"i > 0\" class=\"btn btn-danger \" href=\"javascript:void(0);\" (click)=\"removeRouteRule(i)\"><span><i class=\"fa fa-trash\"></i></span></button>\r\n                            </div>\r\n                        </div>\r\n                        <div [formGroup]=\"route\">\r\n                            <div class=\"row mb-2\">\r\n                                <div ngClass=\"col-md-12\">\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-md-12 col-lg-6\">\r\n                                    <label>Name:<span class=\"text-danger\">*</span></label>\r\n                                    <div class=\"form-group\">\r\n                                        <input type=\"text\" class=\"form-control\"formControlName=\"name\">\r\n                                        <div *ngIf=\"name?.invalid && (name?.dirty || name?.touched)\" class=\"text-danger\">\r\n                                        <div *ngIf=\"name.errors.required\">\r\n                                            Name is required.\r\n                                        </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    </div>\r\n                                    <div class=\"col-md-12 col-lg-6\">\r\n                                    <label>Send Data To Document:<span class=\"text-danger\">*</span></label>\r\n                                    <div class=\"form-group\">\r\n                                        <ng-select [items]=\"documentList\" formControlName=\"documentMakerId\" placeholder=\"Select Document...\"\r\n                                                bindLabel=\"text\" [closeOnSelect]=\"true\"\r\n                                                (clear)=\"onClearLang(documentList,i,'Document')\"\r\n                                                (scrollToEnd)=\"onScrollToEnd(documentList,i,'Document')\" \r\n                                                [virtualScroll]=\"true\" \r\n                                                (change)=\"onDocumentChange($event,i)\"\r\n                                                (keyup)=\"onKey($event,documentList,i,'Document')\"></ng-select>\r\n                                            <div *ngIf=\"documentMakerId?.invalid && (documentMakerId?.dirty || documentMakerId?.touched)\" class=\"text-danger\">\r\n                                            <div *ngIf=\"documentMakerId.errors.required\">\r\n                                            Document is required.\r\n                                        </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    </div>\r\n                                </div>\r\n                                </div>\r\n                            </div>\r\n                            <h3 class=\"form-heading mt-0\"><span>Trigger This Rule If</span></h3>\r\n                            <div class=\"row mb-2\">\r\n                                <div class=\"col-12 p-2\">\r\n                                    <div formArrayName=\"routeRuleConditions\">\r\n                                        <div *ngFor=\"let condition of routeRuleConditions(i).controls;let j = index\" [formGroupName]=\"j\">\r\n                                            <div class=\"row\">\r\n                                                <div class=\"col-2\">\r\n                                                    <div *ngIf=\"j > 0\" class=\"form-group\">\r\n                                                        <ng-select [items]=\"logicalOperatorList\" formControlName=\"logicalOperator\"\r\n                                                        placeholder=\"Select...\" bindLabel=\"text\" \r\n                                                        [closeOnSelect]=\"true\" [clearable]=\"false\">\r\n                                                        </ng-select>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-3\">\r\n                                                    <div class=\"form-group\">\r\n                                                        <ng-select [items]=\"route.get('documentMakerPlaceHolderFieldIdsList').value\" formControlName=\"documentMakerPlaceHolderFieldId\"\r\n                                                        placeholder=\"Select...\" bindLabel=\"text\" \r\n                                                        [closeOnSelect]=\"true\"\r\n                                                        (clear)=\"onClearLang(route.get('documentMakerPlaceHolderFieldIdsList').value,i,'Holder',route.get('documentMakerPlaceHolderFieldIdsList'))\"\r\n                                                        (scrollToEnd)=\"onScrollToEnd(route.get('documentMakerPlaceHolderFieldIdsList').value,i,'Holder',route.get('documentMakerPlaceHolderFieldIdsList'))\" \r\n                                                        [virtualScroll]=\"true\" \r\n                                                        (keyup)=\"onKey($event,route.get('documentMakerPlaceHolderFieldIdsList').value,i,'Holder',route.get('documentMakerPlaceHolderFieldIdsList'))\">\r\n                                                        </ng-select>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-3\">\r\n                                                    <div class=\"form-group\">\r\n                                                        <ng-select [items]=\"comparisonOperatorList\" formControlName=\"ComparisonOperator\" \r\n                                                        placeholder=\"Select...\" bindLabel=\"text\"\r\n                                                        [closeOnSelect]=\"true\" [clearable]=\"false\">\r\n                                                        </ng-select>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-3\">\r\n                                                    <div class=\"form-group\">\r\n                                                        <input type=\"text\" class=\"form-control\" formControlName=\"value\">\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-1\">\r\n                                                    <div class=\"form-group align-middle\">\r\n                                                        <button class=\"btn btn-success mr-2\" href=\"javascript:void(0);\" (click)=\"addCondition(i)\"><span><i class=\"fa fa-plus\"></i></span></button>\r\n                                                        <button *ngIf=\"j > 0\" class=\"btn btn-danger \" href=\"javascript:void(0);\" (click)=\"removeCondition(j)\"><span><i class=\"fa fa-trash\"></i></span></button>\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div> \r\n                            </div>\r\n                            \r\n                        </div>\r\n                        <div class=\"col-md-12 mb-2\" style=\"background-color: grey;\">\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-6\">\r\n                                    <button class=\"btn btn-success\" href=\"javascript:void(0);\" (click)=\"addRouteRule()\"><span><i class=\"fa fa-plus\"></i></span></button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        </div>\r\n                       \r\n                    </div>\r\n                  <div class=\"row mb-3\" >\r\n                    <div class=\"col-sm-12 col-md-12\">\r\n                      <button class=\"btn btn-success mr-2\" href=\"javascript:void(0);\" [disabled]=\"!addEditForm.valid\" (click)=\"save()\"><span><i class=\"fa fa-save\"></i> Submit</span></button>\r\n                      <a routerLink=\"/document-maker-routerule\" class=\"btn btn-danger\" href=\"javascript:void(0);\"><span><i class=\"fa fa-close\"></i> Cancel</span></a>\r\n                    </div>\r\n                  </div>\r\n              </form> -->\r\n            </div>\r\n            <!-- <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader> -->\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n</div>\r\n<div class=\"clearfix\"></div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-route-rule/document-maker-route-rule-list/document-maker-route-rule-list.component.html":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-route-rule/document-maker-route-rule-list/document-maker-route-rule-list.component.html ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\n    <h2 class=\"float-left pr-2\"><strong>DOCUMENT ROUTE/RULE</strong></h2>\n    <div class=\"breadcrumb-wrapper\">\n      <ol class=\"breadcrumb\">\n        <li>\n          <a routerLink=\"/dashboard\">Dashboard</a>\n        </li>\n        <li class=\"active\">Document Route/Rule</li>\n      </ol>\n    </div>\n</div>\n<div class=\"clearfix\"></div>\n<div class=\"row\">\n    <div class=\"col-lg-12 portlets\">\n      <div class=\"panel\">\n        <div class=\"panel-header border-bottom btn-iconres\">\n            <div class=\"row mt-2\">\n              <div class=\"col-md-12 col-xl-7 pr-3 pr-lg-0\">\n                <div class=\"row searchfield \">\n                  <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\n                    <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\n                  </div>\n                  <div class=\"col-md-8 float-left pl-3 pl-lg-0\">\n                    <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\n                    <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-12 col-xl-5\">\n                <div class=\"dt-buttons noabso-res\">\n                    <a routerLink=\"/document-maker-routerule/addrouterule\" class=\"btn btn-success form-btns  mr-1 smview\" tooltip=\" Add Route/Rule\"><i class=\"fa fa-plus\"></i></a>\n                    <a class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\n                </div>\n              </div>\n            </div>\n          </div>\n        <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\n          <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\n                        [rows]=\"pagedData.data\"\n                        [columnMode]=\"'force'\"\n                        [scrollbarH]=\"true\"\n                        [rowHeight]=\"'40'\"\n                        [headerHeight]=\"40\"\n                        [footerHeight]=\"40\"\n                        [externalPaging]=\"true\"\n                        [externalSorting]=\"true\"\n                        [loadingIndicator]=\"loadSave\"\n                        [count]=\"pagedData.pager.totalItems\"\n                        [offset]=\"pagedData.pager.currentPage\"\n                        [limit]=\"pagedData.pager.pageSize\"\n                        (page)='setPage($event)'\n                        (sort)=\"onSort($event)\"\n                        [selectionType]=\"SelectionType.checkbox\"\n                        [selectAllRowsOnPage]=\"false\"\n                        [selected]=\"selected\"\n                        (select)=\"onSelect($event)\">\n                        <ngx-datatable-column [width]=\"42\"\n                                        [sortable]=\"false\"\n                                        [canAutoResize]=\"false\"\n                                        [draggable]=\"false\"\n                                        [resizeable]=\"false\"\n                                        [headerCheckboxable]=\"true\"\n                                        [checkboxable]=\"true\">\n                        </ngx-datatable-column>\n  \n                        <ngx-datatable-column name=\"Name\" [sortable]=\"true\" prop=\"Name\"></ngx-datatable-column>\n                        <ngx-datatable-column  name=\"Created on\" [sortable]=\"true\" prop=\"CreatedOn\">\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                                {{ (row.CreatedOn !== null) ? (row.CreatedOn | utcdatetimetolocal) : \"\" }}\n                            </ng-template>\n                        </ngx-datatable-column>\n                        <ngx-datatable-column name=\"Status\" prop=\"StatusId\" sortable=\"false\">\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                            <div class=\"text-center\" *ngIf=\"row.StatusId == 1002\">\n                            <div  class=\"status-box\" style=\"background-color: #dc3545;max-width:150px !important\">InActive</div>\n                            </div>\n                            <div class=\"text-center\" *ngIf=\"row.StatusId == 1001\">\n                            <div  class=\"status-box\" style=\"background-color: #28a745;max-width:150px !important\">Active</div>\n                            </div>\n                        </ng-template>\n                        </ngx-datatable-column>\n                        <ngx-datatable-column [width]=\"80\" name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                        <div class=\"text-center\">\n                        <!-- <a  class=\"actions-onclick view-list\" class=\"btn-edit \" [routerLink]=\"['/document-maker-routerule/view',row.Id]\"  title=\"View Detail\"><i class=\"fa fa-eye pr-2 \"></i></a> -->\n                        <a *ngIf=\"row.IsFromSubModule\"  class=\"btn-edit \" href=\"javascript:void(0);\" [routerLink]=\"['/document-maker-routerule/editrouterule',row.Id]\"><i title=\"Add/Edit Route/Rule\" class=\"fa fa-pencil text-success pr-2\"></i></a>\n                        <a *ngIf=\"!row.IsFromSubModule\"  class=\"btn-edit\" href=\"javascript:void(0);\" [routerLink]=\"['/document-maker-routerule/editrouterule',row.Id]\"><i title=\"Add/Edit Route/Rule\" class=\"fa fa-pencil text-success pr-2\"></i></a>\n                        <a *ngIf=\"row.IsFromSubModule\" class=\"btn-edit disabled\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-secondary pr-2\" title=\"Delete Form\"></i></a>\n                        <a *ngIf=\"!row.IsFromSubModule\" (click)=\"Delete(row)\" class=\"btn-edit\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger pr-2\" title=\"Delete Route/Rule\"></i></a>\n                        </div>\n                        </ng-template>\n                        </ngx-datatable-column>\n                        <ngx-datatable-footer>\n                        <ng-template ngx-datatable-footer-template\n                                    let-rowCount=\"rowCount\"\n                                    let-pageSize=\"pageSize\"\n                                    let-selectedCount=\"selectedCount\"\n                                    let-currentPage=\"currentPage\"\n                                    let-offset=\"offset\"\n                                    let-isVisible=\"isVisible\">\n                        \n                        <div>\n                        <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n                            <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\n                                        bindLabel=\"text\" bindValue=\"text\"></ng-select>\n                            </span>\n                        </div>\n                        </div>\n                        <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\n                        {{commonService.PageString(pagedData.pager.currentPage+1,pageSizeValue,rowCount)}}\n                        </div>\n                        \n                        <!--<div class=\"page-count\">\n                        Showing {{(pagedData.pager.currentPage )* pagedData.pager.pageSize + 1}}  to {{(pagedData.pager.currentPage+1) * pagedData.pager.pageSize}} out of {{rowCount}}  enteries\n                        </div>     \"pagedData.pager.currentPage+1\"-->\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\n                        [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\n                        [pagerPreviousIcon]=\"'fa fa-angle-left'\"\n                        [pagerNextIcon]=\"'fa fa-angle-right'\"\n                        [page]=\"pagedData.pager.currentPage+1\"\n                        [size]=\"pageSizeValue\"\n                        [count]=\"pagedData.pager.totalItems\"\n                        [hidden]=\"!((rowCount / pageSize) > 1)\"\n                        (change)=\"setPage($event)\">\n                        </datatable-pager>\n                        </ng-template>\n                        </ngx-datatable-footer>\n            </ngx-datatable>\n        </div>\n      </div>\n    </div>\n</div>\n");

/***/ }),

/***/ "./src/app/views/document-maker-route-rule/add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component.scss":
/*!**************************************************************************************************************************************!*\
  !*** ./src/app/views/document-maker-route-rule/add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component.scss ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2RvY3VtZW50LW1ha2VyLXJvdXRlLXJ1bGUvYWRkLWVkaXQtZG9jdW1lbnQtbWFrZXItcm91dGUtcnVsZS9hZGQtZWRpdC1kb2N1bWVudC1tYWtlci1yb3V0ZS1ydWxlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/document-maker-route-rule/add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component.ts":
/*!************************************************************************************************************************************!*\
  !*** ./src/app/views/document-maker-route-rule/add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component.ts ***!
  \************************************************************************************************************************************/
/*! exports provided: AddEditDocumentMakerRouteRuleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditDocumentMakerRouteRuleComponent", function() { return AddEditDocumentMakerRouteRuleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _document_maker_route_rule_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../document-maker-route-rule.service */ "./src/app/views/document-maker-route-rule/document-maker-route-rule.service.ts");
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







var AddEditDocumentMakerRouteRuleComponent = /** @class */ (function () {
    function AddEditDocumentMakerRouteRuleComponent(fb, service, router, toaster, route, commonService, dialogService) {
        this.fb = fb;
        this.service = service;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.loadSave = false;
        this.webmergeDocuments = [];
        this.action = "Add";
        this.documentFields = [];
        this.expressions = [
            { value: '==', name: '= Equals' },
            { value: '!=', name: '!= Does Not Equal' },
            { value: '<', name: 'Less than' },
            { value: '<=', name: 'Less or Equal to' },
            { value: '>', name: 'Greater than' },
            { value: '>=', name: 'Greater than Equal to' },
            { value: 'contains', name: 'Contains' },
            { value: '!contains', name: 'Does Not Contain' }
        ];
        this.operators = [
            //{ value: 'noaction', name: 'Add Condition' },
            { value: 'and', name: 'And' },
            { value: 'or', name: 'Or' }
        ];
        this.logicalOperatorList = [{ text: 'AND', value: '1' }, { text: 'OR', value: '2' }];
        this.searchText = '';
        this.length = 0;
        this.routeRules = [];
    }
    AddEditDocumentMakerRouteRuleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataRouteRequestModel = new _document_maker_route_rule_service__WEBPACK_IMPORTED_MODULE_6__["RouteData"]();
        this.oldDataRouteRequestModel = new _document_maker_route_rule_service__WEBPACK_IMPORTED_MODULE_6__["RouteData"]();
        this.route.paramMap.subscribe(function (params) {
            _this.id = params.get('id');
            debugger;
            if (_this.id) {
                _this.pageTitle = "Edit Route/Rule";
                _this.action = "Update";
                _this.GetDocumentList(false);
                _this.service.getRoutesData(_this.id).subscribe(function (resp) {
                    _this.dataRouteRequestModel.id = resp.id;
                    _this.oldDataRouteRequestModel.id = resp.id;
                    _this.dataRouteRequestModel.name = resp.name;
                    _this.oldDataRouteRequestModel.name = resp.name;
                    _this.service.getRouteRulesData(_this.id).subscribe(function (rules) {
                        rules.forEach(function (r) {
                            r.document_id = r.document_id ? JSON.parse(r.document_id) : null;
                            r.deleted = false;
                            if (r.conditions != null) {
                                r.conditions = r.conditions.map(function (c) {
                                    c.field = c.field ? JSON.parse(c.field) : null;
                                    c.deleted = false;
                                    return c;
                                });
                            }
                            _this.oldDataRouteRequestModel.rules.push(r);
                        });
                        if (rules != null) {
                            _this.dataRouteRequestModel.rules = rules.sort(function (r1, r2) { return r1.sort - r2.sort; }).map(function (r) {
                                r.deleted = false;
                                if (r.conditions != null) {
                                    r.conditions = r.conditions.map(function (c) {
                                        c.deleted = false;
                                        return c;
                                    });
                                }
                                return r;
                            });
                        }
                    });
                });
            }
            else {
                _this.pageTitle = "Add Route/Rule";
                _this.action = "Add";
                _this.GetDocumentList(true);
            }
        });
    };
    AddEditDocumentMakerRouteRuleComponent.prototype.GetDocumentList = function (init) {
        var _this = this;
        if (init === void 0) { init = false; }
        this.loadSave = true;
        this.service.getDocumentList().subscribe(function (resp) {
            _this.loadSave = false;
            _this.documentList = resp;
            _this.documentList.forEach(function (document) {
                _this.getDocumentFields(document.value);
            });
            if (init) {
                _this.dataRouteRequestModel.rules.push({ combine: 0, conditions: [], document_id: null, moduleId: 0, subModuleId: 0, id: 0, sort: 1, document_name: null, key: null, deleted: false });
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    AddEditDocumentMakerRouteRuleComponent.prototype.getDocumentFields = function (documentId) {
        var _this = this;
        this.loadSave = true;
        this.service.getPlaceHolderFieldsList(documentId).subscribe(function (documentFields) {
            _this.loadSave = false;
            _this.documentFields = _this.documentFields.concat(documentFields.map(function (field) {
                return field;
            }));
        }, function (err) {
            _this.loadSave = false;
        });
    };
    AddEditDocumentMakerRouteRuleComponent.prototype.onDocumentChange = function (event, rule) {
        this.dataRouteRequestModel.rules.forEach(function (r) {
            if (r.id == rule.id) {
                r.document_id = event.id;
            }
        });
    };
    AddEditDocumentMakerRouteRuleComponent.prototype.onCombineChanged = function (rule) {
        this.dataRouteRequestModel.rules.forEach(function (r) {
            if (r.id == rule.id) {
                if (r.combine == 0) {
                    r.combine = 1;
                }
                else {
                    r.combine = 0;
                }
            }
        });
    };
    AddEditDocumentMakerRouteRuleComponent.prototype.addNewRule = function () {
        var id = 0 - this.dataRouteRequestModel.rules.length;
        this.dataRouteRequestModel.rules.push({ combine: 0, conditions: [], document_id: null, moduleId: 0, subModuleId: 0, id: id, sort: this.dataRouteRequestModel.rules.length + 1, document_name: null, key: null, deleted: false });
    };
    AddEditDocumentMakerRouteRuleComponent.prototype.deleteRule = function (rule) {
        this.dataRouteRequestModel.rules.forEach(function (r, index) {
            if (r.id == rule.id) {
                //this.dataRouteRequestModel.rules.splice(index, 1);
                r.deleted = true;
            }
        });
    };
    AddEditDocumentMakerRouteRuleComponent.prototype.onChange = function (ctrl, event, rule) {
        debugger;
        if (event.target.value == "Add") {
            //do nothing
        }
        else {
            this.addNewCondition(rule, event.target.value);
            // ctrl.nativeElement.value = "Add";
        }
    };
    AddEditDocumentMakerRouteRuleComponent.prototype.addNewCondition = function (rule, event) {
        this.dataRouteRequestModel.rules.forEach(function (r, index) {
            if (r.id == rule.id) {
                if (r.conditions == null) {
                    r.conditions = [];
                }
                r.conditions.push({ operator: event.toLowerCase(), exp: '', field: '', value: '', deleted: false });
            }
        });
    };
    AddEditDocumentMakerRouteRuleComponent.prototype.deleteCondition = function (rule, condition) {
        this.dataRouteRequestModel.rules.forEach(function (r) {
            if (r.id == rule.id) {
                r.conditions.forEach(function (c, index) {
                    if (c == condition) {
                        //r.conditions.splice(index, 1);
                        c.deleted = true;
                    }
                });
            }
        });
    };
    AddEditDocumentMakerRouteRuleComponent.prototype.save = function () {
        var _this = this;
        debugger;
        this.loadSave = true;
        if (this.action == "Add") {
            debugger;
            console.log('add data', this.dataRouteRequestModel);
            this.dataRouteRequestModel.rules.forEach(function (rule) {
                var documentobj = rule.document_id;
                rule.document_id = documentobj.value;
                rule.moduleId = documentobj.ModuleId;
                rule.subModuleId = documentobj.SubModuleId;
                rule.conditions.forEach(function (condition) {
                    condition.field = condition.field.value;
                });
            });
            this.service.AddRouteData(this.dataRouteRequestModel).subscribe(function (resp) {
                _this.loadSave = false;
                _this.toaster.success("Data Route added successfully");
                _this.router.navigateByUrl("/document-maker-routerule");
            }, function (err) {
                _this.loadSave = false;
            });
        }
        else if (this.action == "Update") {
            debugger;
            this.dataRouteRequestModel.rules.forEach(function (rule) {
                var isRuleNew = true;
                var documentobj = rule.document_id;
                rule.document_id = documentobj.value;
                rule.moduleId = documentobj.ModuleId,
                    rule.subModuleId = documentobj.SubModuleId;
                rule.conditions.forEach(function (condition) {
                    condition.field = condition.field.value;
                });
                if (_this.oldDataRouteRequestModel.rules.filter(function (o) { return o.id == rule.id; }).length > 0) {
                    isRuleNew = false;
                }
            });
            console.log('update data', this.dataRouteRequestModel);
            this.service.updateRouteData(this.dataRouteRequestModel).subscribe(function (resp) {
                _this.loadSave = false;
                _this.toaster.success("Data Route updated successfully");
                _this.router.navigateByUrl("/document-maker-routerule");
            }, function (err) {
                _this.loadSave = false;
            });
        }
    };
    AddEditDocumentMakerRouteRuleComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _document_maker_route_rule_service__WEBPACK_IMPORTED_MODULE_6__["DocumentMakerRouteRuleService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] }
    ]; };
    AddEditDocumentMakerRouteRuleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-edit-document-maker-route-rule',
            template: __importDefault(__webpack_require__(/*! raw-loader!./add-edit-document-maker-route-rule.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-route-rule/add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./add-edit-document-maker-route-rule.component.scss */ "./src/app/views/document-maker-route-rule/add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _document_maker_route_rule_service__WEBPACK_IMPORTED_MODULE_6__["DocumentMakerRouteRuleService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"]])
    ], AddEditDocumentMakerRouteRuleComponent);
    return AddEditDocumentMakerRouteRuleComponent;
}());



/***/ }),

/***/ "./src/app/views/document-maker-route-rule/document-maker-route-rule-list/document-maker-route-rule-list.component.scss":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/views/document-maker-route-rule/document-maker-route-rule-list/document-maker-route-rule-list.component.scss ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2RvY3VtZW50LW1ha2VyLXJvdXRlLXJ1bGUvZG9jdW1lbnQtbWFrZXItcm91dGUtcnVsZS1saXN0L2RvY3VtZW50LW1ha2VyLXJvdXRlLXJ1bGUtbGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/document-maker-route-rule/document-maker-route-rule-list/document-maker-route-rule-list.component.ts":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/views/document-maker-route-rule/document-maker-route-rule-list/document-maker-route-rule-list.component.ts ***!
  \****************************************************************************************************************************/
/*! exports provided: DocumentMakerRouteRuleListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerRouteRuleListComponent", function() { return DocumentMakerRouteRuleListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _document_maker_route_rule_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../document-maker-route-rule.service */ "./src/app/views/document-maker-route-rule/document-maker-route-rule.service.ts");
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






var DocumentMakerRouteRuleListComponent = /** @class */ (function () {
    function DocumentMakerRouteRuleListComponent(commonService, documentMakerRouteRuleService, toaster, dialogService) {
        this.commonService = commonService;
        this.documentMakerRouteRuleService = documentMakerRouteRuleService;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.moduleName = '';
        this.subModuleName = '';
        this.searchTxt = '';
        this.listFilter = '';
        this.listFiltertext = '';
        this.selected = [];
        this.loading = false;
        this.sortColumn = 'Id';
        this.sortDir = 'desc';
        this.offset = 1;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["SelectionType"];
    }
    DocumentMakerRouteRuleListComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 15;
        this.refresh();
    };
    DocumentMakerRouteRuleListComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    DocumentMakerRouteRuleListComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "name like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    DocumentMakerRouteRuleListComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.documentMakerRouteRuleService.GetDoumentMakerRouteRuleList(this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.listFilter).subscribe(function (response) {
            debugger;
            _this.pagedData = _this.documentMakerRouteRuleService.pagedData;
            _this.offset = 1;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    DocumentMakerRouteRuleListComponent.prototype.reset = function () {
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.refresh();
    };
    DocumentMakerRouteRuleListComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    DocumentMakerRouteRuleListComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    DocumentMakerRouteRuleListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].Id.toString() + ",";
            }
        }
        else {
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].Id.toString() + ",";
            }
        }
    };
    DocumentMakerRouteRuleListComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Route/Rule(s)?";
            this.dialogService.confirm('Delete Rule(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.documentMakerRouteRuleService.deleteAll(_this.deleteId).subscribe(function (r) {
                        _this.toaster.success("Route/Rule(s) has been deleted successfully.");
                        _this.deleteId = "";
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
    DocumentMakerRouteRuleListComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Route/Rule \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete Route/Rule ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.documentMakerRouteRuleService.delete(row.Id).subscribe(function (result) {
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
    DocumentMakerRouteRuleListComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _document_maker_route_rule_service__WEBPACK_IMPORTED_MODULE_5__["DocumentMakerRouteRuleService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] }
    ]; };
    DocumentMakerRouteRuleListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-document-maker-route-rule-list',
            template: __importDefault(__webpack_require__(/*! raw-loader!./document-maker-route-rule-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-route-rule/document-maker-route-rule-list/document-maker-route-rule-list.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./document-maker-route-rule-list.component.scss */ "./src/app/views/document-maker-route-rule/document-maker-route-rule-list/document-maker-route-rule-list.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _document_maker_route_rule_service__WEBPACK_IMPORTED_MODULE_5__["DocumentMakerRouteRuleService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"]])
    ], DocumentMakerRouteRuleListComponent);
    return DocumentMakerRouteRuleListComponent;
}());



/***/ }),

/***/ "./src/app/views/document-maker-route-rule/document-maker-route-rule-routing.module.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/views/document-maker-route-rule/document-maker-route-rule-routing.module.ts ***!
  \*********************************************************************************************/
/*! exports provided: DocumentMakerRouteRuleRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerRouteRuleRoutingModule", function() { return DocumentMakerRouteRuleRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _add_edit_document_maker_route_rule_add_edit_document_maker_route_rule_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component */ "./src/app/views/document-maker-route-rule/add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component.ts");
/* harmony import */ var _document_maker_route_rule_list_document_maker_route_rule_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./document-maker-route-rule-list/document-maker-route-rule-list.component */ "./src/app/views/document-maker-route-rule/document-maker-route-rule-list/document-maker-route-rule-list.component.ts");
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
    { path: '', component: _document_maker_route_rule_list_document_maker_route_rule_list_component__WEBPACK_IMPORTED_MODULE_3__["DocumentMakerRouteRuleListComponent"] },
    { path: 'editrouterule/:id', component: _add_edit_document_maker_route_rule_add_edit_document_maker_route_rule_component__WEBPACK_IMPORTED_MODULE_2__["AddEditDocumentMakerRouteRuleComponent"] },
    { path: 'addrouterule', component: _add_edit_document_maker_route_rule_add_edit_document_maker_route_rule_component__WEBPACK_IMPORTED_MODULE_2__["AddEditDocumentMakerRouteRuleComponent"] },
];
var DocumentMakerRouteRuleRoutingModule = /** @class */ (function () {
    function DocumentMakerRouteRuleRoutingModule() {
    }
    DocumentMakerRouteRuleRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DocumentMakerRouteRuleRoutingModule);
    return DocumentMakerRouteRuleRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/document-maker-route-rule/document-maker-route-rule.module.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/views/document-maker-route-rule/document-maker-route-rule.module.ts ***!
  \*************************************************************************************/
/*! exports provided: DocumentMakerRouteRuleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerRouteRuleModule", function() { return DocumentMakerRouteRuleModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _document_maker_route_rule_list_document_maker_route_rule_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./document-maker-route-rule-list/document-maker-route-rule-list.component */ "./src/app/views/document-maker-route-rule/document-maker-route-rule-list/document-maker-route-rule-list.component.ts");
/* harmony import */ var _add_edit_document_maker_route_rule_add_edit_document_maker_route_rule_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component */ "./src/app/views/document-maker-route-rule/add-edit-document-maker-route-rule/add-edit-document-maker-route-rule.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _document_maker_route_rule_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./document-maker-route-rule-routing.module */ "./src/app/views/document-maker-route-rule/document-maker-route-rule-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var DocumentMakerRouteRuleModule = /** @class */ (function () {
    function DocumentMakerRouteRuleModule() {
    }
    DocumentMakerRouteRuleModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _document_maker_route_rule_list_document_maker_route_rule_list_component__WEBPACK_IMPORTED_MODULE_2__["DocumentMakerRouteRuleListComponent"],
                _add_edit_document_maker_route_rule_add_edit_document_maker_route_rule_component__WEBPACK_IMPORTED_MODULE_3__["AddEditDocumentMakerRouteRuleComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _document_maker_route_rule_routing_module__WEBPACK_IMPORTED_MODULE_6__["DocumentMakerRouteRuleRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalModule"].forRoot()
            ]
        })
    ], DocumentMakerRouteRuleModule);
    return DocumentMakerRouteRuleModule;
}());



/***/ }),

/***/ "./src/app/views/document-maker-route-rule/document-maker-route-rule.service.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/views/document-maker-route-rule/document-maker-route-rule.service.ts ***!
  \**************************************************************************************/
/*! exports provided: DocumentMakerRouteRuleService, RouteData, Rule, Condition, FormField, RouteRule, RouteRuleConditions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerRouteRuleService", function() { return DocumentMakerRouteRuleService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteData", function() { return RouteData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return Rule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Condition", function() { return Condition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormField", function() { return FormField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteRule", function() { return RouteRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteRuleConditions", function() { return RouteRuleConditions; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
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





var DocumentMakerRouteRuleService = /** @class */ (function () {
    function DocumentMakerRouteRuleService(http, fb) {
        this.http = http;
        this.fb = fb;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].WebApiBaseUrl;
        this.SolRuleEngine = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].WebApiBaseUrl + "DocumentMakerRouteRule";
        this.moduleUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].WebApiBaseUrl + "Modules";
    }
    DocumentMakerRouteRuleService.prototype.GetDoumentMakerRouteRuleList = function (sortColumn, sortDir, page, pageSize, filter) {
        var _this = this;
        return this.http.get(this.baseUri + "DocumentMakerRouteRule/GetList?SortColumn=" + sortColumn + "&SortDir=" + sortDir + "&PageNo=" + page + "&PageSize=" + pageSize + "&Filter=" + filter)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    DocumentMakerRouteRuleService.prototype.delete = function (id) {
        return this.http.get(this.baseUri + ("DocumentMakerRouteRule/Delete?id=" + id));
    };
    DocumentMakerRouteRuleService.prototype.deleteAll = function (ids) {
        return this.http.get(this.baseUri + ("DocumentMakerRouteRule/MultiDelete?ids=" + ids));
    };
    DocumentMakerRouteRuleService.prototype.getDocumentList = function () {
        return this.http.get(this.baseUri + "DocumentMakerRouteRule/GetDocumentList");
    };
    DocumentMakerRouteRuleService.prototype.getLogicalOperatorsList = function (type) {
        return this.http.get(this.baseUri + "DocumentMakerRouteRule/GetLogicalOperatorsList?type=" + type);
    };
    DocumentMakerRouteRuleService.prototype.getComparisionOperatorsList = function (type) {
        return this.http.get(this.baseUri + "DocumentMakerRouteRule/GetComparisionOperatorsList?type=" + type);
    };
    DocumentMakerRouteRuleService.prototype.getPlaceHolderFieldsList = function (documentId) {
        return this.http.get(this.baseUri + "DocumentMakerRouteRule/GetPlaceHolderFieldsList?documentId=" + documentId);
    };
    DocumentMakerRouteRuleService.prototype.getSubModuleFields = function (subModuleName) {
        return this.http.get(this.moduleUri + "/GetSubModuleFields?subModuleName=" + subModuleName);
    };
    DocumentMakerRouteRuleService.prototype.GetCustomFieldsListBySubModuleId = function (moduleId, subModuleId) {
        return this.http.get(this.baseUri + "SolgenRuleEngine/GetSolgenCustomFieldBySubModuleId?moduleId=" + moduleId + "&subModuleId=" + subModuleId);
    };
    // checkNameExist(model: CheckRuleName) {
    //   return this.http.post(`${this.baseUri}SolgenRuleEngine/CheckSolgenRuleNameExist`, model);
    // }
    DocumentMakerRouteRuleService.prototype.AddUpdateRouteRule = function (data) {
        return this.http.post(this.baseUri + "DocumentMakerRouteRule/AddUpdateRouteRule", data);
    };
    DocumentMakerRouteRuleService.prototype.getRoutesData = function (dataRouteId) {
        return this.http.get(this.baseUri + "DocumentMakerRouteRule/GetDocumentMakerRoutes/" + dataRouteId);
    };
    DocumentMakerRouteRuleService.prototype.getRouteRulesData = function (dataRouteId) {
        return this.http.get(this.baseUri + "DocumentMakerRouteRule/GetDocumentMakerRouteRules/" + dataRouteId);
    };
    DocumentMakerRouteRuleService.prototype.AddRouteData = function (data) {
        return this.http.post(this.baseUri + "DocumentMakerRouteRule/AddRouteRuleData", data);
    };
    DocumentMakerRouteRuleService.prototype.updateRouteData = function (data) {
        return this.http.post(this.baseUri + "DocumentMakerRouteRule/UpdateRouteRuleData", data);
    };
    DocumentMakerRouteRuleService.prototype.getWebmergeDocument = function (documentId) {
        return this.http.get(this.baseUri + "WebMerge/GetWebmergeDocument/" + documentId);
    };
    DocumentMakerRouteRuleService.prototype.getDocumentFields = function (documentId) {
        return this.http.get(this.baseUri + "WebMerge/GetWebmergeDocumentFields/" + documentId);
    };
    DocumentMakerRouteRuleService.prototype.getFormFields = function () {
        return this.http.get(this.baseUri + "WebMerge/GetFormFields");
    };
    DocumentMakerRouteRuleService.prototype.changeStatus = function (id) {
        return this.http.post(this.baseUri + "SolgenRuleEngine/ChangeSolgenRuleStatus/" + id, null);
    };
    DocumentMakerRouteRuleService.prototype.getDisplayOrder = function () {
        return this.http.get(this.baseUri + "SolgenRuleEngine/GetSolgenRuleDisplayOrder");
    };
    DocumentMakerRouteRuleService.prototype.buildRootRouteRule = function (routeRule) {
        var _this = this;
        if (routeRule === void 0) { routeRule = null; }
        var rootRouteRuleGroup = this.fb.group({
            routeRuleArray: this.fb.array([])
        });
        if (routeRule && routeRule.length > 0) {
            while (rootRouteRuleGroup.get('routeRuleArray').length != 0) {
                rootRouteRuleGroup.get('routeRuleArray').removeAt(0);
            }
            routeRule.forEach(function (m) {
                rootRouteRuleGroup.get('routeRuleArray').push(_this.buildRouteRule(m));
            });
        }
        else {
            rootRouteRuleGroup.get('routeRuleArray').push(this.buildRouteRule(null));
        }
        return rootRouteRuleGroup;
    };
    DocumentMakerRouteRuleService.prototype.buildRouteRule = function (routeRule) {
        var _this = this;
        if (routeRule === void 0) { routeRule = null; }
        var routeRuleGroup = this.fb.group({
            id: [null],
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            moduleId: [null],
            subModuleId: [null],
            documentMakerId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            documentMakerPlaceHolderFieldIdsList: [null],
            routeRuleConditions: this.fb.array([this.buildRouteRuleConditions()]),
        });
        if (routeRule) {
            routeRuleGroup.patchValue({
                id: routeRule.id,
                name: routeRule.name,
                moduleId: routeRule.moduleId,
                subModuleId: routeRule.subModuleId,
                documentMakerId: routeRule.documentMakerId,
            });
            if (routeRule.routeRuleConditions) {
                while (routeRuleGroup.get('routeRuleConditions').length != 0) {
                    routeRuleGroup.get('routeRuleConditions').removeAt(0);
                }
                routeRule.routeRuleConditions.forEach(function (m) {
                    routeRuleGroup.get('routeRuleConditions').push(_this.buildRouteRuleConditions(m));
                });
            }
        }
        return routeRuleGroup;
    };
    DocumentMakerRouteRuleService.prototype.buildRouteRuleConditions = function (routeRuleConditions) {
        if (routeRuleConditions === void 0) { routeRuleConditions = null; }
        var routeRuleConditionsGroup = this.fb.group({
            id: [null],
            documentMakerRouteRuleId: [null],
            logicalOperator: [null],
            documentMakerPlaceHolderFieldId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            ComparisonOperator: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            value: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            statusId: [null]
        });
        if (routeRuleConditions) {
            routeRuleConditionsGroup.patchValue({
                id: routeRuleConditions.id,
                documentMakerRouteRuleId: routeRuleConditions.documentMakerRouteRuleId,
                logicalOperator: routeRuleConditions.logicalOperator,
                documentMakerPlaceHolderFieldId: routeRuleConditions.documentMakerPlaceHolderFieldId,
                ComparisonOperator: routeRuleConditions.ComparisonOperator,
                value: routeRuleConditions.value,
                statusId: routeRuleConditions.statusId,
            });
        }
        return routeRuleConditionsGroup;
    };
    DocumentMakerRouteRuleService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }
    ]; };
    DocumentMakerRouteRuleService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], DocumentMakerRouteRuleService);
    return DocumentMakerRouteRuleService;
}());

var RouteData = /** @class */ (function () {
    function RouteData() {
        this.id = 0;
        this.name = '';
        this.rules = [];
    }
    return RouteData;
}());

var Rule = /** @class */ (function () {
    function Rule() {
        this.id = 0;
        this.document_id = '';
        this.document_name = '';
        this.key = '';
        this.sort = 0;
        this.combine = 0;
        this.conditions = [];
        this.deleted = false;
        this.moduleId = 0;
        this.subModuleId = 0;
    }
    return Rule;
}());

var Condition = /** @class */ (function () {
    function Condition() {
        this.field = '';
        this.exp = '';
        this.value = '';
        this.operator = '';
        this.deleted = false;
    }
    return Condition;
}());

var FormField = /** @class */ (function () {
    function FormField() {
        this.formFieldId = "";
        this.formFieldName = "";
        this.tableName = "";
        this.displayName = "";
    }
    return FormField;
}());

var RouteRule = /** @class */ (function () {
    function RouteRule() {
    }
    return RouteRule;
}());

var RouteRuleConditions = /** @class */ (function () {
    function RouteRuleConditions() {
    }
    return RouteRuleConditions;
}());



/***/ })

}]);
//# sourceMappingURL=views-document-maker-route-rule-document-maker-route-rule-module.js.map