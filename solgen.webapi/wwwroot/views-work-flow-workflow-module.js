(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-work-flow-workflow-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/mappingpopup/mappingpopup.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/mappingpopup/mappingpopup.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #mapping=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">\r\n           Mapping\r\n        </h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"max-height:600px; overflow:inherit;\">\r\n        <div class=\"col-md-12 p-0\">\r\n          <form [formGroup]=\"customButtonForm\" autocomplete=\"off\">\r\n            <div class=\"row  mb-2\">\r\n              <div class=\"col-sm-6 col-md-6\">\r\n                <label>Custom Button:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <ng-select [items]=\"CustomButtonList\" placeholder=\"Select\"\r\n                             (clear)=\"onClearCustomButton(CustomButtonList)\" formControlName=\"customButtonId\"\r\n                             (keyup)=\"onKeyCustomButton($event,CustomButtonList)\"\r\n                             (scrollToEnd)=\"onScrollToEndCustomButton(CustomButtonList)\" [virtualScroll]=\"true\"\r\n                             bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (customButtonId.invalid && (customButtonId.dirty || customButtonId.touched) && (customButtonId.errors?.required || customButtonId?.errors?.maxlength)) }\"></ng-select>\r\n                  <small *ngIf=\"customButtonId.invalid && (customButtonId.dirty || customButtonId.touched) && (customButtonId.errors?.required || customButtonId?.errors?.maxlength)\"\r\n                         class=\"text-danger\">Custom Button is required.</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-sm-12 col-md-12 mt-3 text-right\">\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n       </div>\r\n        <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n      </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/work-flow.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/work-flow.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Flow</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Flow</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-8\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-3 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Flow Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-6 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-4\">\r\n            <div class=\"dt-buttons\">\r\n              <!--<a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\"><span><i class=\"fa fa-list-alt\"></i> Manage View</span></a>-->\r\n              <!--<a routerLink=\"/rule-engine/summary\" class=\"btn btn-primary form-btns  mr-1\"><i class=\"fa fa-list\"></i> Summary</a>-->\r\n              <a routerLink=\"/flow/add-flow\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add Flow\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"remove()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"pagedData.data\"\r\n                       [columnMode]=\"'force'\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [displayCheck]=\"displayCheck\"\r\n                       (activate)=\"onActivate($event)\"\r\n                       (select)=\"onSelect($event)\">\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Flow Name\" prop=\"FlowName\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div><a tooltip=\"Edit flow\" [routerLink]=\"['/flow/edit',row.FlowId]\">{{row.FlowName }}</a></div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Status\" prop=\"StatusId\" sortable=\"false\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\" *ngIf=\"row.StatusId == 1002\">\r\n\r\n\r\n                <a href=\"javascript:void(0);\" (click)=\"enable(row)\"><i title=\"Click to enable.\" class=\"fa fa-times text-danger icon_tick\"></i></a>\r\n              </div>\r\n              <div class=\"text-center\" *ngIf=\"row.StatusId == 1001 && row.customflowid != row.FlowId\">\r\n                <!--<span><i class=\"fa fa-check text-success icon_tick\"></i></span>-->\r\n                <a href=\"javascript:void(0);\" (click)=\"disable(row)\"><i title=\"Click to disable.\" class=\"fa fa-check text-success icon_tick\"></i></a>\r\n              </div>\r\n              <div class=\"text-center\" *ngIf=\"row.StatusId == 1001 && row.customflowid == row.FlowId\">\r\n                <!--<span><i class=\"fa fa-check text-success icon_tick\"></i></span>-->\r\n                <a><i title=\"\" class=\"fa fa-check text-secondary icon_tick\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Mapping\" [sortable]=\"false\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\" *ngIf=\"row.StatusId == 1001\">\r\n                <a href=\"javascript:void(0);\" (click)=\"MappingPopup(row)\" class=\"text-danger icon_tick mx-1\"><i title=\"Click to assign.\" class=\"fa text-info fa-share\"></i></a>\r\n              </div>\r\n              <div class=\"text-center\" *ngIf=\"row.StatusId == 1002\">\r\n                <a href=\"javascript:void(0);\" class=\"text-danger icon_tick mx-1\"><i title=\"Click to assign.\" class=\"fa  fa-share text-secondary\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\" *ngIf=\"row.customflowid != row.FlowId\">\r\n                <a href=\"javascript:void(0);\" (click)=\"DeleteFlow(row)\" class=\"text-danger icon_tick mx-1\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                <!--&nbsp;&nbsp;\r\n          <a href=\"javascript:void(0);\" (click)=\"applyVersionToApplication(row)\"><i title=\"Click to apply.\" class=\"fa fa-chain text-info icon_tick\"></i></a>-->\r\n              </div>\r\n              <div class=\"text-center\" *ngIf=\"row.customflowid == row.FlowId\">\r\n                <a  class=\"text-danger icon_tick mx-1\"><i  class=\"fa fa-trash text-secondary\"></i></a>\r\n                <!--&nbsp;&nbsp;\r\n          <a href=\"javascript:void(0);\" (click)=\"applyVersionToApplication(row)\"><i title=\"Click to apply.\" class=\"fa fa-chain text-info icon_tick\"></i></a>-->\r\n              </div>\r\n\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                {{commonService.PageString(pagedData.pager.currentPage+1,pageSizeValue,rowCount)}}\r\n              </div>\r\n\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"   \r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"pagedData.pager.currentPage+1\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n          <!--<ngx-datatable-footer>\r\n      <ng-template ngx-datatable-footer-template\r\n                   let-rowCount=\"rowCount\"\r\n                   let-pageSize=\"pageSize\"\r\n                   let-selectedCount=\"selectedCount\"\r\n                   let-currentPage=\"currentPage\"\r\n                   let-offset=\"offset\"\r\n                   let-isVisible=\"isVisible\">\r\n        <div class=\"page-count\" style=\"max-width:170px;\">\r\n          {{rowCount}} total\r\n        </div>\r\n        <div>\r\n          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n            </span>\r\n          </div>\r\n        </div>\r\n        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                         [page]=\"pagedData.pager.currentPage+1\"\r\n                         [size]=\"pageSizeValue\"\r\n                         [count]=\"pagedData.pager.totalItems\"\r\n                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                         (change)=\"setPage($event)\">\r\n        </datatable-pager>\r\n      </ng-template>\r\n    </ngx-datatable-footer>-->\r\n        </ngx-datatable>\r\n\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-mappingpopup #mapping title=\"Mapping\" (setMapping)=\"setMapping($event)\"></app-mappingpopup>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflow-add-edit.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflow-add-edit.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\" *ngIf=\"id == null || id == 0\"><strong>Add Flow</strong></h2>\r\n  <h2 class=\"float-left pr-2\" *ngIf=\"id != null && id > 0\"><strong>Edit Flow </strong></h2>\r\n  <!--(<div style=\"text-transform: none; display: inline-block\">{{RuleNameToShow}} - v</div>{{ruleVersion.value}})-->\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li><a routerLink=\"/flow\">Manage Flow</a></li>\r\n     \r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel cntainerwithoutbg clearfix\">\r\n  <div class=\"panel-content clearfix mb-4 p-0\">\r\n    <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" *ngIf=\"id != null && id > 0\" role=\"tablist\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link active show\" id=\"lead-tab\"\r\n           data-toggle=\"tab\" href=\"#RuleDetail\" role=\"tab\" aria-selected=\"true\">Flow Detail</a>\r\n      </li>\r\n      <!--<li class=\"nav-item\">\r\n        <a class=\"nav-link\" id=\"list-ApplicationList\" data-toggle=\"tab\" href=\"#ApplicationList\" role=\"tab\" aria-selected=\"false\" (click)=\"refreshLA()\">Rule based Application(s)</a>\r\n      </li>-->\r\n    </ul>\r\n    <div class=\"tab-content\" id=\"myTabContent\">\r\n      <div class=\"tab-pane fade active show\" id=\"RuleDetail\" role=\"tabpanel\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-12 portlets\">\r\n            <form [formGroup]=\"ruleEngineForm\">\r\n              <h3 class=\"form-heading mt-0\"> <span>Flow Details <div style=\"display:inline-block\" *ngIf=\"id != null && id > 0\">(v{{ruleVersion.value}})</div></span></h3>\r\n              <div class=\"row mb-2\">\r\n\r\n                <div [ngClass]=\"{'col-md-11':(ruleEngineVersionList.length!=0),'col-md-12':(ruleEngineVersionList.length==0)}\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-md-12 col-lg-6\">\r\n                      <label>Name:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\"\r\n                               formControlName=\"name\">\r\n                        <div *ngIf=\"name?.invalid && (name?.dirty || name?.touched)\"\r\n                             class=\"text-danger\">\r\n                          <div *ngIf=\"name.errors.required\">\r\n                            Name is required.\r\n                          </div>\r\n                          <!--<div *ngIf=\"name.errors.minlength\">\r\n          Name must be at least 4 characters long.\r\n        </div>-->\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-12 col-lg-6\">\r\n                      <label>Module:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select [items]=\"moduleList\" formControlName=\"moduleId\" placeholder=\"Select Module...\"\r\n                                   bindLabel=\"text\" (change)=\"onModuleChangeevent()\"></ng-select>\r\n                        <div *ngIf=\"moduleId?.invalid && (moduleId?.dirty || moduleId?.touched)\"\r\n                             class=\"text-danger\">\r\n                          <div *ngIf=\"moduleId.errors.required\">\r\n                            Module is required.\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-12 col-lg-6\">\r\n                      <label>Sub Module:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select [items]=\"subModuleList\" formControlName=\"subModuleId\" placeholder=\"Select Sub Module...\"\r\n                                   bindLabel=\"sub_module_name\" (change)=\"onSubModuleChangeevent()\"></ng-select>\r\n                        <div *ngIf=\"subModuleId?.invalid && (subModuleId?.dirty || subModuleId?.touched)\"\r\n                             class=\"text-danger\">\r\n                          <div *ngIf=\"subModuleId.errors.required\">\r\n                            Sub Module is required.\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <!--<div class=\"col-md-12 col-lg-6\">\r\n    <label>Rule Type:<span class=\"text-danger\">*</span></label>\r\n    <div class=\"form-group\">\r\n\r\n      <ng-select [items]=\"ruleTypeList\" formControlName=\"ruleTypeId\" placeholder=\"Select Rule Type...\"\r\n                 bindLabel=\"name\"></ng-select>\r\n      <div *ngIf=\"ruleTypeId?.invalid && (ruleTypeId?.dirty || ruleTypeId?.touched)\"\r\n           class=\"text-danger\">\r\n        <div *ngIf=\"ruleTypeId.errors.required\">\r\n          Rule Type is required.\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n                    <!--<div class=\"col-md-12 col-lg-6\" *ngIf=\"ruleTypeId.value && ruleTypeId.value.code =='financial'\">\r\n    <label>Banks:<span class=\"text-danger\">*</span></label>\r\n    <div class=\"form-group\">\r\n      <ng-select [items]=\"bankList\" formControlName=\"banks\" [multiple]=\"true\" placeholder=\"Select Bank...\"\r\n                 bindLabel=\"text\"></ng-select>\r\n      <div *ngIf=\"banks?.invalid && (banks?.dirty || banks?.touched)\"\r\n           class=\"text-danger\">\r\n        <div *ngIf=\"banks.errors.required\">\r\n          Bank is required.\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n                    <!--<div class=\"col-md-12 col-lg-6\" *ngIf=\"ruleTypeId.value && ruleTypeId.value.code =='product'\">\r\n    <label>Loan Product:<span class=\"text-danger\">*</span></label>\r\n    <div class=\"form-group\">\r\n      <ng-select [items]=\"loanProductList\" formControlName=\"loanProducts\" [multiple]=\"true\" placeholder=\"Select Loan Product...\"\r\n                 bindValue=\"Id\" bindLabel=\"ProductName\"></ng-select>\r\n      <div *ngIf=\"loanProducts?.invalid && (loanProducts?.dirty || loanProducts?.touched)\"\r\n           class=\"text-danger\">\r\n        <div *ngIf=\"loanProducts.errors.required\">\r\n          Loan Product is required.\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n                    <!--<div class=\"col-md-12 col-lg-6\">\r\n                      <label>Execution Order:</label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"number\" formControlName=\"displayOrder\" class=\"form-control\">  \r\n                      </div>\r\n                    </div>-->\r\n                    <!--<div class=\"col-md-12 col-lg-6\">\r\n                      <label>Effective From:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <div class=\"input-group\">\r\n                          <p-calendar class=\"dt-auto\" [minDate]=\"minimumDate\" formControlName=\"effectiveFrom\" placeholder=\"Select Effective From\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\"\r\n                                      [yearNavigator]=\"true\"\r\n                                      yearRange=\"1919:2030\">\r\n\r\n                          </p-calendar>\r\n                        </div>\r\n                        <div *ngIf=\"effectiveFrom.invalid && (effectiveFrom.dirty || effectiveFrom.touched)\"\r\n                             class=\"text-danger\">\r\n                          <div *ngIf=\"effectiveFrom.errors.required\">\r\n                            Effective From is required.\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-md-12 col-lg-6\">\r\n                      <label>Effective To:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <div class=\"input-group\">\r\n                          <p-calendar class=\"dt-auto\" [minDate]=\"effectiveFrom?.value\" formControlName=\"effectiveTo\" placeholder=\"Select Effective To\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\"\r\n                                      [yearNavigator]=\"true\"\r\n                                      yearRange=\"1919:2030\"></p-calendar>\r\n                        </div>\r\n                        <div *ngIf=\"effectiveTo.invalid && (effectiveTo.dirty || effectiveTo.touched)\"\r\n                             class=\"text-danger\">\r\n                          <div *ngIf=\"effectiveTo.errors.required\">\r\n                            Effective To is required.\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>-->\r\n                    <div class=\"col-md-12 col-lg-6\">\r\n                      <label>Active:</label>\r\n                      <div class=\"form-group\">\r\n                        <label class=\"switch\">\r\n                          <input type=\"checkbox\" formControlName=\"isActive\" checked=\"\">\r\n                          <span class=\"slider round\"><span>Yes</span></span>\r\n                        </label>\r\n                      </div>\r\n                    </div>\r\n\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-1\" *ngIf=\"ruleEngineVersionList.length!=0\">\r\n                  <ul class=\"list-group\">\r\n                    <li class=\"list-group-item list-group-item-action list-group-item-info\">Version</li>\r\n                  </ul>\r\n                  <ul class=\"list-group\" style=\"height: 350px;overflow-y: auto;border-bottom: 1px solid rgba(0,0,0,.125)\">\r\n                    <li *ngFor=\"let item of ruleEngineVersionList\" style=\"cursor:pointer\" (click)=\"editRuleVersion(item.RuleId)\" class=\"list-group-item\" [ngClass]=\"{'active':(id==item.RuleId)}\">\r\n                      {{item.RuleVersion}}\r\n                    </li>\r\n                  </ul>\r\n                </div>\r\n              </div>\r\n\r\n              <div *ngIf=\"submoduleidform != null\">\r\n                <h3 class=\"form-heading mt-0\"> <span>Apply On</span></h3>\r\n\r\n\r\n\r\n\r\n                <div class=\"row mx-auto mb-3\">\r\n                  <div class=\"screen-flow\">\r\n                    <div class=\"flow-container\">\r\n\r\n                      <div class=\"sh_oval\">Start</div>\r\n                    </div>\r\n                    <div class=\"w-100\" formArrayName=\"targets\">\r\n                      <div  class=\"w-100\" *ngFor=\"let target of targets.controls;let i = index\" [formGroupName]=\"i\">\r\n                        <app-work-flow-target  #targetcomponent [productId]=\"inputProductId\" [ruleEngineForm]=\"ruleEngineForm\" [isEdit]=\"isEdit\" [target]=\"target\" [rowNo]=\"i\" [rValidation]=\"rValidation\" (resultValidation)=\"resultValidation($event)\"></app-work-flow-target>\r\n\r\n                        <!--<app-work-flow-condition #conditioncomponent [productId]=\"inputProductId\" [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" [rowNo]=\"i\"></app-work-flow-condition>\r\n\r\n\r\n  <app-work-flow-descision #decisioncomponent [productId]=\"inputProductId\" [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" [rowNo]=\"i\"></app-work-flow-descision>\r\n  <app-screen #screencomponent [productId]=\"inputProductId\" [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" [rowNo]=\"i\"></app-screen>\r\n\r\n  <app-work-flow-result [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\"></app-work-flow-result>-->\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                   \r\n                    <!--<div class=\"flow-container last-child\" *ngIf=\"!showAddTarget()\">\r\n                      <div class=\"add-flow\">\r\n                        <i class=\"fa fa-plus\"></i>\r\n                        <div class=\"add-action\">\r\n                          <a href=\"javascript:;\" (click)=\"AddScreen()\" class=\"border-right\"><span class=\"text-info\"><i class=\"fa fa-clone text-info\"></i></span>Add Screen</a>\r\n                          <a href=\"javascript:;\" (click)=\"AddDecision()\" class=\"border-right\"><span class=\"text-warning\"><i class=\"fa fa-file-text-o text-warning\"></i></span>Add Decision</a>\r\n                          <a href=\"javascript:;\" (click)=\"AddCondition()\"> <span class=\"text-success\"><i class=\"fa fa-code text-success\"></i></span>Add Condition</a>\r\n                        </div>\r\n                      </div>\r\n                    </div>-->\r\n                    <div class=\"flow-container last-child\" *ngIf=\"showAddTarget()\">\r\n                      <div class=\"add-flow\" (click)=\"addTarget()\">\r\n                        <i class=\"fa fa-plus\"  ></i>\r\n                        <div class=\"add-action\">\r\n                          <!--<a href=\"javascript:;\" (click)=\"addTarget()\" class=\"border-right\"><span class=\"text-info\"><i class=\"fa fa-clone text-info\"></i></span>Add Target</a>-->\r\n                          <!--<a href=\"javascript:;\" (click)=\"AddScreen()\" class=\"border-right\"><span class=\"text-info\"><i class=\"fa fa-clone text-info\"></i></span>Add Screen</a>\r\n  <a href=\"javascript:;\" (click)=\"AddDecision()\" class=\"border-right\"><span class=\"text-warning\"><i class=\"fa fa-file-text-o text-warning\"></i></span>Add Decision</a>\r\n  <a href=\"javascript:;\" (click)=\"AddCondition()\"> <span class=\"text-success\"><i class=\"fa fa-code text-success\"></i></span>Add Condition</a>-->\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <!--<ul >\r\n                <li class=\"arrowdown\" >\r\n                  <div>\r\n                    <app-work-flow-target (deleteTargetEvent)=\"deleteTarget(i)\"></app-work-flow-target>\r\n                    <ul>\r\n                      <app-work-flow-condition [productId]=\"inputProductId\" [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" [rowNo]=\"i\"></app-work-flow-condition>\r\n                      <app-work-flow-result [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\"></app-work-flow-result>\r\n\r\n                      <app-work-flow-result [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\"></app-work-flow-result>\r\n                    </ul>\r\n                    <ul >\r\n    <li>\r\n      <app-work-flow-result [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\"></app-work-flow-result>\r\n    </li>\r\n  </ul>\r\n                  </div>\r\n                </li>\r\n                <li class=\"arrowdown ui-sortable-handle\" *ngIf=\"showAddTarget()\">\r\n                  <p class=\"shape_roundbtn\" (click)=\"addTarget()\" title=\"Click here to add new Target\"><span>+</span></p>\r\n                </li>\r\n              </ul>-->\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n\r\n              <div class=\"row mb-3\">\r\n                <div class=\"col-sm-12 col-md-12\">\r\n                  <!---->\r\n                  <button class=\"btn btn-success mr-2\" href=\"javascript:void(0);\" [disabled]=\"(!ruleEngineForm.valid) || (isSubmitButtonDisabled == true && id > 0)\" (click)=\"save()\"><span>\r\n  <i class=\"fa fa-save\"></i> Submit</span></button>\r\n                  <a routerLink=\"/flow\" class=\"btn btn-danger\" href=\"javascript:void(0);\"><span><i class=\"fa fa-close\"></i> Cancel</span></a>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n        </div>\r\n      </div>\r\n      <!--<div class=\"tab-pane p-0 fade\" id=\"ApplicationList\" role=\"tabpanel\">\r\n        <div class=\"row\">\r\n          <div class=\"col-12\">\r\n            <div class=\"col-md-12 mt-3\">\r\n              <div class=\"alert alert-warning\" role=\"alert\">\r\n                <strong>NOTE: </strong> You can change the rule version for the particular application(s), and next time whenever rules are executed on that application, it will execute your selected version of the rule.\r\n              </div>\r\n            </div>\r\n            <div class=\"border-bottom pb-3\">\r\n              <div class=\" row mt-2\">\r\n                <div class=\"col-md-6 col-lg-5\">\r\n                  <div class=\"row px-3\">\r\n                    <div class=\"col-lg-5 float-left mb-lg-0 mb-2\">\r\n                      <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFiltertext' placeholder=\"Search By No\">\r\n                    </div>\r\n                    <div class=\"col-lg-7 float-left px-sm-0 px-3 \">\r\n                      <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"searchLA('VERSION')\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                      <a class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"refreshLA()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-6 col-lg-7\">\r\n                  <div class=\"row px-3\">\r\n                    <div class=\"col-lg-12 text-left text-md-right\">\r\n                      <div class=\"form-group d-inline-block align-top mr-1 mb-0\" style=\"max-width:220px\" *ngIf=\"laPagedData != null && laPagedData.data != null && laPagedData.data.length > 0\">\r\n                        <ng-select [(ngModel)]='selectedVersionForChange' [items]=\"ruleEngineVersionListForChange\" placeholder=\"Select Version to update\"\r\n                                   bindValue=\"RuleId\" bindLabel=\"RuleVersion\" class=\"form-control\"></ng-select>\r\n                      </div>\r\n                      <div class=\"form-group d-inline-block mr-1 mb-0\" *ngIf=\"laPagedData != null && laPagedData.data != null && laPagedData.data.length > 0\">\r\n                        <button class=\"btn btn-primary float-left\" type=\"button\" (click)=\"ApplySelectedVersion()\"><i class=\"fa fa-floppy-o\"></i> Apply Version</button>\r\n                      </div>\r\n                      <div class=\"form-group d-inline-block align-top mb-0\" *ngIf=\"isSubmitButtonDisabled == false && id > 0\">\r\n                        <button type=\"button\" class=\"btn btn-success\" (click)=\"OpenLatestRuleOnOldApp()\"><i class=\"fa fa-check-circle-o\"></i> Apply on old Application</button>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12\">\r\n              <div class=\"mt-3\">{{RuleNameToShow\r\n  }} (v{{ruleVersion.value}}) is already executed on following application(s)\r\n</div>\r\n              <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                             [rows]=\"laPagedData.data\"\r\n                             [columnMode]=\"'force'\"\r\n                             [scrollbarH]=\"true\"\r\n                             [rowHeight]=\"'40'\"\r\n                             [headerHeight]=\"40\"\r\n                             [footerHeight]=\"40\"\r\n                             [externalPaging]=\"true\"\r\n                             [externalSorting]=\"true\"\r\n                             [loadingIndicator]=\"loadSave\"\r\n                             [count]=\"laPagedData.pager.totalItems\"\r\n                             [offset]=\"laPagedData.pager.currentPage\"\r\n                             [limit]=\"laPagedData.pager.pageSize\"\r\n                             (page)=\"setPageLA($event, 'VERSION')\"\r\n                             (sort)=\"onSort($event)\"\r\n                             [selected]=\"selectedApplication\"\r\n                             [selectionType]=\"SelectionType.checkbox\"\r\n                             [selectAllRowsOnPage]=\"false\"\r\n                             (activate)=\"onActivate($event)\"\r\n                             (select)=\"onSelect($event)\">\r\n                <ngx-datatable-column [width]=\"42\"\r\n                                      [sortable]=\"false\"\r\n                                      [canAutoResize]=\"false\"\r\n                                      [draggable]=\"false\"\r\n                                      [resizeable]=\"false\"\r\n                                      [headerCheckboxable]=\"true\"\r\n                                      [checkboxable]=\"true\">\r\n                </ngx-datatable-column>\r\n\r\n                ol\r\n\r\n                <ngx-datatable-column name=\"Application Number\" prop=\"ApplicationNumber\" [sortable]=\"true\">\r\n                  \r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Email\" prop=\"Email\" [sortable]=\"true\"></ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Product Name\" prop=\"ProductName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                \r\n                <ngx-datatable-column name=\"Status\" prop=\"ApplicationStatus\" [sortable]=\"true\">\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                    {{row.ApplicationStatus}}\r\n                  </ng-template>\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-footer>\r\n                  <ng-template ngx-datatable-footer-template\r\n                               let-rowCount=\"rowCount\"\r\n                               let-pageSize=\"pageSize\"\r\n                               let-selectedCount=\"selectedCount\"\r\n                               let-currentPage=\"currentPage\"\r\n                               let-offset=\"offset\"\r\n                               let-isVisible=\"isVisible\">\r\n\r\n                    <div>\r\n                      <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                        <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                          <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='laPageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeLA($event, 'VERSION')\" draggable=\"false\" [closeOnSelect]=\"true\" bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"page-count\" style=\"max-width:170px;\">\r\n                      {{rowCount}} total\r\n                    </div>\r\n                    <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                     [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                     [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                     [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                     [page]=\"laPagedData.pager.currentPage\"\r\n                                     [size]=\"laPageSizeValue\"\r\n                                     [count]=\"laPagedData.pager.totalItems\"\r\n                                     [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                     (change)=\"setPageLA($event, 'VERSION')\">\r\n                    </datatable-pager>\r\n                  </ng-template>\r\n                </ngx-datatable-footer>\r\n              </ngx-datatable>\r\n\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>-->\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<!--<div class=\"modal fade \" bsModal #ApplicationPopupForApplyLatestRule=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\">Applications</h5>\r\n        <button type=\"button\" class=\"close\" (click)=\"applyLatestRuleOnOldApp.hide()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 mt-3\">\r\n            <div class=\"alert alert-warning\" role=\"alert\">\r\n              <strong>NOTE: </strong> You can apply {{RuleNameToShow}} (latest version) on selected application(s), and next time whenever rule engine is executed on that application, {{RuleNameToShow}} will be executed.\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-5 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='loanApplicationlistFiltertext' placeholder=\"Search By Application No\">\r\n              </div>\r\n              <div class=\"col-lg-7 float-left\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"searchLA('NEWRULEONOLDAPP')\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"refreshLA('NEWRULEONOLDAPP')\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"mt-3\">Following application(s) are those on which {{RuleNameToShow}} (any version) is still not applied</div>\r\n            <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                           [rows]=\"loanApplicationPageData.data\"\r\n                           [columnMode]=\"'force'\"\r\n                           [scrollbarH]=\"true\"\r\n                           [rowHeight]=\"'40'\"\r\n                           [headerHeight]=\"40\"\r\n                           [footerHeight]=\"40\"\r\n                           [externalPaging]=\"true\"\r\n                           [externalSorting]=\"true\"\r\n                           [loadingIndicator]=\"loadSave\"\r\n                           [count]=\"loanApplicationPageData.pager.totalItems\"\r\n                           [offset]=\"loanApplicationPageData.pager.currentPage\"\r\n                           [limit]=\"loanApplicationPageData.pager.pageSize\"\r\n                           (page)=\"setPageLA($event, 'NEWRULEONOLDAPP')\"\r\n                           (sort)=\"onSort($event)\"\r\n                           [selected]=\"selectedOldApplication\"\r\n                           [selectionType]=\"SelectionType.checkbox\"\r\n                           [selectAllRowsOnPage]=\"false\"\r\n                           (activate)=\"onActivate($event)\"\r\n                           (select)=\"onSelectOldApplication($event)\">\r\n              <ngx-datatable-column [width]=\"42\"\r\n                                    [sortable]=\"false\"\r\n                                    [canAutoResize]=\"false\"\r\n                                    [draggable]=\"false\"\r\n                                    [resizeable]=\"false\"\r\n                                    [headerCheckboxable]=\"true\"\r\n                                    [checkboxable]=\"true\">\r\n              </ngx-datatable-column>\r\n\r\n              ab\r\n\r\n              <ngx-datatable-column name=\"Application Number\" prop=\"ApplicationNumber\" [sortable]=\"true\">\r\n               \r\n              </ngx-datatable-column>\r\n              <ngx-datatable-column name=\"Email\" prop=\"Email\" [sortable]=\"true\"></ngx-datatable-column>\r\n              <ngx-datatable-column name=\"Product Name\" prop=\"ProductName\" [sortable]=\"true\"></ngx-datatable-column>\r\n              \r\n              <ngx-datatable-column name=\"Status\" prop=\"ApplicationStatus\" [sortable]=\"true\">\r\n                <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                  {{row.ApplicationStatus}}\r\n                </ng-template>\r\n              </ngx-datatable-column>\r\n              <ngx-datatable-footer>\r\n                <ng-template ngx-datatable-footer-template\r\n                             let-rowCount=\"rowCount\"\r\n                             let-pageSize=\"pageSize\"\r\n                             let-selectedCount=\"selectedCount\"\r\n                             let-currentPage=\"currentPage\"\r\n                             let-offset=\"offset\"\r\n                             let-isVisible=\"isVisible\">\r\n                  <div>\r\n                    <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                      <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                        <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='loanApplicationPageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeLA($event, 'NEWRULEONOLDAPP')\" draggable=\"false\" [closeOnSelect]=\"true\" bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"page-count\" style=\"max-width:170px;\">\r\n                    {{rowCount}} total\r\n                  </div>\r\n                  <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                   [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                   [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                   [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                   [page]=\"loanApplicationPageData.pager.currentPage\"\r\n                                   [size]=\"laPageSizeValue\"\r\n                                   [count]=\"loanApplicationPageData.pager.totalItems\"\r\n                                   [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                   (change)=\"setPageLA($event, 'NEWRULEONOLDAPP')\">\r\n                  </datatable-pager>\r\n                </ng-template>\r\n              </ngx-datatable-footer>\r\n            </ngx-datatable>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"ApplyRuleOnOldApplication()\"><i class=\"fa fa-floppy-o\"></i> Submit</button>\r\n            <button type=\"button\" class=\"btn btn-danger ml-2\" (click)=\"closeOldApplicationPopup()\"><i class=\"fa fa-times\"></i> cancel</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>-->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/screen.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/screen.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"flow-container\" *ngIf=\"targetForm.get('isScreenAdded').value\">\r\n  <div class=\"sh_rectangle\" *ngIf=\"!isDecision\">\r\n    <a href=\"javascript:;\" (click)=\"openeditpopup(targetForm.value.ScreenId)\" class=\"text-white text-truncate\" style=\"max-width:110px; display:inline-block;\" title=\"{{targetForm.value.ScreenName}}\"> {{targetForm.value.ScreenName}}</a>\r\n    <a href=\"javascript:;\" (click)=\"deletetarget(targetForm.value.ScreenId)\" title=\"Delete Screen\" class=\"delete-btn\"><i class=\"fa fa-trash\"></i></a>\r\n  </div>\r\n\r\n</div>\r\n<div *ngIf=\"targetForm.get('isDecisionScreenAdded').value && !typescreen\" class=\"sh_rectangle inrow-right\">\r\n\r\n  <a href=\"javascript:;\" (click)=\"openeditpopup(targetForm.value.ScreenId)\" style=\"max-width:110px; display:inline-block;\" title=\"{{targetForm.value.ScreenName}}\" class=\"text-white text-truncate\">{{targetForm.value.ScreenName}}</a>\r\n  <a href=\"javascript:;\" (click)=\"deletetargetDecision(targetForm.value.ScreenId)\"  title=\"Delete Screen\" class=\"delete-btn\"><i class=\"fa fa-trash\"></i></a>\r\n  <!--<a href=\"javascript:;\" (click)=\"deletetarget(targetForm.value.ScreenId)\" class=\"delete-btn\"><i class=\"fa fa-trash\"></i></a>-->\r\n</div>\r\n<!--<div class=\"flow-container last-child\" *ngIf=\"!targetForm.get('isScreenAdded')?.value\">\r\n  <div class=\"add-flow\">\r\n    <i class=\"fa fa-plus\"></i>\r\n    <div class=\"add-action\">\r\n      <a href=\"javascript:;\" (click)=\"AddScreen()\" class=\"border-right\"><span class=\"text-info\"><i class=\"fa fa-clone text-info\"></i></span>Add Screen</a>\r\n      <a href=\"javascript:;\" (click)=\"AddDecision()\" class=\"border-right\"><span class=\"text-warning\"><i class=\"fa fa-file-text-o text-warning\"></i></span>Add Decision</a>\r\n      <a href=\"javascript:;\" (click)=\"AddCondition()\"> <span class=\"text-success\"><i class=\"fa fa-code text-success\"></i></span>Add Condition</a>\r\n    </div>\r\n  </div>\r\n</div>-->\r\n<!--screenmodel-->\r\n<div class=\"modal fade \" bsModal #screenmodel=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Flow Screens</h5>\r\n        <button type=\"button\" class=\"close\" (click)=\"hidescreenmodel()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"max-height: 400px;\">\r\n        <div class=\"row\">\r\n\r\n\r\n          <div class=\"col-12 col-md-12 \" [ngClass]=\"{'disabled':loadSave}\">\r\n            <form [formGroup]=\"form\" *ngIf=\"form\" autocomplete=\"off\">\r\n\r\n\r\n\r\n              <h3 class=\"form-heading mt-0\">\r\n                <span>{{screenname}} </span>\r\n              </h3>\r\n              <div class=\"row  mb-2\">\r\n                <ng-container *ngFor=\"let inner of screendata\">\r\n\r\n\r\n                  <!--<div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : inner.form_field_visibility == 'NO', 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                     inner.layout_type =='four' }\">-->\r\n                  <div class=\"col-sm-12 col-md-12 col-12\">\r\n                    <!---->\r\n                    <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO'\" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n                    <label *ngIf=\"inner.form_field_visibility == 'YES'\">{{inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n                    <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n                    <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n                      <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n                    </a>-->\r\n                    <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES'\">\r\n                      <!--text  [placeholder]=\"inner.display_name\"-->\r\n                      <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                             [formControlName]=\"inner.form_controlName\" [id]=\"inner.form_field_id\"\r\n                             [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                             *ngIf=\"inner.picklist_options != 'Lookup' && inner.field_type !='date'  && inner.field_type !='radio' && inner.field_type!='boolean'  && inner.field_type !='dropdown' && inner.field_type !='textarea' && inner.field_type !='checkbox' && inner.field_type !='date' && inner.field_type !='int' && inner.field_type !='decimal' && inner.field_type !='texteditor' && inner.field_type !='bigint'\" />\r\n\r\n                      <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                             [formControlName]=\"inner.form_controlName\" [id]=\"inner.form_field_id\"\r\n                             [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                             *ngIf=\"inner.field_type == 'int'\" />\r\n\r\n                      <small *ngIf=\"inner.field_type == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                             class=\"text-danger\">Please enter valid value</small>\r\n\r\n                      <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                             [formControlName]=\"inner.form_controlName\" [id]=\"inner.form_field_id\"\r\n                             [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                             *ngIf=\"inner.field_type == 'bigint'\" />\r\n\r\n                      <small *ngIf=\"inner.field_type == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                             class=\"text-danger\">Please enter valid value</small>\r\n\r\n                      <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                             [formControlName]=\"inner.form_controlName\" [id]=\"inner.form_field_id\"\r\n                             [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                             *ngIf=\"inner.field_type == 'decimal'\" />\r\n\r\n                      <small *ngIf=\"inner.field_type == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                             class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                      <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                      <textarea class=\"form-control\" *ngIf=\"inner.field_type == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n                      {{inner.field_type}}\r\n                      <!--<p *ngIf=\"inner.field_type == 'texteditor'\" > </p>-->\r\n                      <div *ngIf=\"inner.field_type == 'texteditor'\" [innerHtml]=\"inner.default_value\">\r\n\r\n                      </div>\r\n\r\n                      <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                      <p-calendar inputStyleClass=\"form-control start-date\" *ngIf=\"inner.field_type == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                                  [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n\r\n                      <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                      [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                      <!--end calandar-->\r\n                      <!--Checkbox-->\r\n\r\n                      <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.field_type=='checkbox'\">\r\n                        <div *ngFor=\"let options of inner.listoptions\">\r\n                          <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n                            <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n                            <div class=\"custom-control custom-checkbox\">\r\n                              <input id=\"chk_{{inner.form_field_id}}_{{option}}_{{i}}\"\r\n                                     value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                              <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.form_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                      <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.field_type=='boolean'\">\r\n                        <div class=\"form-check form-check-inline\">\r\n                          <div class=\"custom-control custom-checkbox pl-0\">\r\n                            <label class=\"switch\">\r\n                              <input type=\"checkbox\" id=\"chk_{{inner.form_field_id}}\" [formControlName]=\"inner.form_controlName\"\r\n                                     class=\"dynamic custom-control-input\">\r\n                              <span class=\"slider round\" id=\"{{inner.form_field_id}}\"><span>Yes</span></span>\r\n                              <!--<label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                              for=\"chk_{{inner.form_field_id}}\">{{inner.display_name}}</label>-->\r\n                            </label>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n\r\n                      <!--Radio button-->\r\n                      <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.field_type=='radio'\">\r\n                        <div *ngFor=\"let options of inner.listoptions\">\r\n                          <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n                            <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                              <!--<input id=\"rbl_{{inner.form_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                                     [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n                              <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.form_field_id}}_{{option}}\">{{option}}</label>-->\r\n                              <input id=\"radio-{{inner.form_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                              <label for=\"radio-{{inner.form_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                            </div>\r\n                          </div>\r\n                          >\r\n\r\n                        </div>\r\n\r\n\r\n                      </div>\r\n                      <!--Ng Dropdown-->\r\n                      <!--Dropdown\r\n                      picklist_options = Lookup       field_type==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n                      -->\r\n                      <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.field_type=='select' }\" *ngIf=\"inner.field_type=='select' && inner.select_options==''\">\r\n                        <option value=\"\">Select</option>\r\n                        <option [value]=\"option.id\"\r\n                                *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n                          {{//option.value}}\r\n                        </option>\r\n                      </select>-->\r\n\r\n                      <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                                 *ngIf=\"inner.field_type=='dropdown' && inner.picklist_options==''\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                      </ng-select>\r\n                      <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                                 *ngIf=\"inner.field_type=='dropdown' && inner.picklist_options=='true'\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n                      </ng-select>\r\n                      <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                             class=\"text-danger\">{{inner.display_name}} is required</small>\r\n                      <!--Dropdown\r\n                        picklist_options != Lookup (contain values to fill in dropdown)      field_type==select  -- so fill dropdown with picklist_options\r\n                      -->\r\n                      <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.field_type=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n                              (change)='onOptionsSelected($event,inner)'>\r\n                        <option value=\"\">Select</option>\r\n                        <option [value]=\"option.name\"\r\n                                *ngFor=\"let option of MakeArray(inner.picklist_options,inner.field_type)\">\r\n                          {{//option.name}}\r\n                        </option>\r\n                      </select>-->\r\n                    </div>\r\n\r\n                  </div>\r\n                </ng-container>\r\n\r\n\r\n              </div>\r\n\r\n            </form>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div class=\"modal-footer\">\r\n        <!--<button type=\"button\" class=\"btn btn-success mr-1\" data-dismiss=\"modal\" [disabled]=\"editpopup\" (click)=\"saveScreen()\"><i class=\"fa fa-save\"></i> Save</button>-->\r\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"hidescreenmodel()\"><i class=\"fa fa-close\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--End screenmodel -->\r\n<!--start screenListmodel-->\r\n<div class=\"modal fade \" bsModal #screenListmodel=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Screen</h5>\r\n        <a href=\"javascript:void(0);\" (click)=\"addScreen()\" class=\"btn btn-success form-btns  mr-1\" tooltip=\" Add Form\"><i class=\"fa fa-plus\"></i></a>\r\n        <button type=\"button\" class=\"close\" (click)=\"hidescreenListmodel()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"table-responsive\">\r\n          <div class=\"table table-striped\">\r\n            <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                           [rows]=\"pagedData.data\"\r\n                           [columnMode]=\"'force'\"\r\n                           [scrollbarH]=\"true\"\r\n                           [rowHeight]=\"'40'\"\r\n                           [headerHeight]=\"40\"\r\n                           [footerHeight]=\"40\"\r\n                           [externalPaging]=\"true\"\r\n                           [externalSorting]=\"true\"\r\n                           [loadingIndicator]=\"loadSave\"\r\n                           [count]=\"pagedData.pager.totalItems\"\r\n                           [offset]=\"currentPage\"\r\n                           [limit]=\"pageSizeValue\"\r\n                           (page)='setPage($event)'\r\n                           (sort)=\"onSortNotes($event)\">\r\n              <ngx-datatable-column name=\"Name\" prop=\"name\" [sortable]=\"true\">\r\n                <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                  <a href=\"javascript:;\" (click)=\"getScreenFormField(row)\" title=\"Edit Note\">{{row.name|truncate}}</a>\r\n                </ng-template>\r\n              </ngx-datatable-column>\r\n              <ngx-datatable-footer>\r\n                <ng-template ngx-datatable-footer-template\r\n                             let-rowCount=\"rowCount\"\r\n                             let-pageSize=\"pagedData.pager.pageSize\"\r\n                             let-selectedCount=\"selectedCount\"\r\n                             let-currentPage=\"pagedData.pager.currentPage\"\r\n                             let-offset=\"offset\"\r\n                             let-isVisible=\"isVisible\">\r\n                  <!--<div class=\"page-count\">\r\n                    Total Records: {{rowCount}}\r\n                  </div>-->\r\n                  <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                    <!--Showing {{(pagedData.pager.currentPage - 1 )* pagedData.pager.pageSize + 1}}  to {{(pagedData.pager.currentPage+1 - 1 )* pagedData.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                    {{commonService.PageString(pagedData.pager.currentPage,pagedData.pager.pageSize,rowCount)}}\r\n\r\n                  </div>\r\n\r\n\r\n                  <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                   [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                   [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                   [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                   [page]=\"pagedData.pager.currentPage\"\r\n                                   [size]=\"pagedData.pager.pageSize\"\r\n                                   [count]=\"pagedData.pager.totalItems\"\r\n                                   [hidden]=\"!((rowCount / pagedData.pager.pageSize) > 1)\"\r\n                                   (change)=\"setPageNo($event)\">\r\n                  </datatable-pager>\r\n\r\n                </ng-template>\r\n              </ngx-datatable-footer>\r\n            </ngx-datatable>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div class=\"modal-footer\">\r\n\r\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"hidescreenListmodel()\"><i class=\"fa fa-close\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--End screenListmodel-->\r\n\r\n<app-welcomescreenadd #screenadd (getformid)=\"getformid($event)\" (getformname)=\"getformname($event)\"></app-welcomescreenadd>\r\n<app-welcomescreen #welcomecomponent></app-welcomescreen>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-condition.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-condition.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n\r\n  <div [formGroup]=\"targetForm\">\r\n\r\n\r\n\r\n    <div class=\"flow-container conditionbased without-deci\" *ngIf=\"targetForm.get('isConditionAdded').value\">\r\n      <!--<div class=\"sh_square\">\r\n      <span class=\"condition\" title=\"{{targetForm.value.targetCondition.displayCondition}}\"> <a href=\"javascript:;\" (click)=\"deletetarget()\" class=\"delete-square\"><i _ngcontent-c11=\"\" class=\"fa fa-trash text-danger\"></i></a>{{targetForm.value.targetCondition.displayCondition  | truncate}} </span>\r\n\r\n    </div>-->\r\n\r\n      <div class=\"condition-box\">\r\n        <div class=\"condition-txt\">{{targetForm.value.targetCondition.displayCondition }}<a href=\"javascript:;\" (click)=\"editCondition()\" class=\"delete-btn withre\"><i class=\"fa fa-pencil\"></i></a><a href=\"javascript:;\" (click)=\"deletetarget()\" class=\"remove-btn\"><i class=\"fa fa-trash\"></i></a></div>\r\n\r\n\r\n      </div>\r\n      <app-work-flow-result #resultcomponent [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\"></app-work-flow-result>\r\n    </div>\r\n    <div *ngIf=\"targetForm.get('isConditionDecisionAdded').value && !typecondition\">\r\n      <div class=\"condition-box inrow-resl\">\r\n        <div class=\"condition-txt\">{{targetForm.value.targetCondition.displayCondition}}<a href=\"javascript:;\" (click)=\"editCondition()\" class=\"delete-btn withre\"><i class=\"fa fa-pencil\"></i></a><a href=\"javascript:;\" (click)=\"deletetargetDecision()\" class=\"remove-btn\"><i class=\"fa fa-trash\"></i></a></div>\r\n\r\n      </div>\r\n      <app-work-flow-result #resultcomponent [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\"></app-work-flow-result>\r\n    </div>\r\n\r\n    <!-- Modal -->\r\n    <div class=\"modal fade \" bsModal #addConditionModal=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Flow Condition</h5>\r\n            <button type=\"button\" class=\"close\" (click)=\"hideConditionModal()\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <div class=\"row\">\r\n              <div class=\"px-1\" [ngClass]=\"{'col-md-12':hideFieldList,'col-md-9':!hideFieldList}\">\r\n                <div class=\"border\">\r\n                  <div class=\"list-group\" style=\"min-height: 210px;\" formArrayName=\"conditions\">\r\n                    <ul class=\"form-header\">\r\n                      <li> </li>\r\n                      <li class=\"pl-2\"> Section</li>\r\n                      <li class=\"pl-2\"> Field</li>\r\n                      <li class=\"pl-2\"> Conditional Operator</li>\r\n                      <li class=\"pl-2\"> Value</li>\r\n                      <li> </li>\r\n                      <li> </li>\r\n                    </ul>\r\n                    <div *ngFor=\"let condition of conditions.controls;let i=index\" [formGroupName]=\"i\">\r\n                      <ul class=\"from-rules text-center\" *ngIf=\"condition.get('relationWithParent').value\">\r\n                        <li class=\"text-center\"><span class=\"or-and rounded-circle\"><b>{{condition.get('relationWithParent').value}}</b></span></li>\r\n                      </ul>\r\n                      <ul class=\"from-rules\">\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <input formControlName=\"openingBrackets\" style=\"width: auto;min-width: 20px;max-width: 20px;\" class=\"form-control txtOpeningBrackets px-1\">\r\n                        </li>\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <ng-select [items]=\"subModuleList\" formControlName=\"subModuleId\"\r\n                                     placeholder=\"Select Module\" bindLabel=\"sub_module_name\" (change)=\"onSubModuleChange($event,condition)\"\r\n                                     [closeOnSelect]=\"true\">\r\n                          </ng-select>\r\n                        </li>\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <ng-select [items]=\"condition.get('fields')?.value\" formControlName=\"fieldId\"\r\n                                     placeholder=\"Select Field\" bindLabel=\"name\" (change)=\"onFieldChange($event,condition,i)\"\r\n                                     [closeOnSelect]=\"true\">\r\n\r\n                          </ng-select>\r\n                        </li>\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <ng-select [items]=\"condition.get('operators').value\" formControlName=\"operatorId\"\r\n                                     placeholder=\"Select Operator\" bindLabel=\"operator_display_name\"\r\n                                     [closeOnSelect]=\"true\">\r\n                          </ng-select>\r\n                        </li>\r\n\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <app-flow-input [formGroup]=\"condition\" [operator]=\"condition.get('operatorId').value\" [from]=\"condition\" [controlName]=\"'fieldValue'\" [id]=\"i\"></app-flow-input>\r\n                          <app-flow-input [formGroup]=\"condition\" [operator]=\"condition.get('operatorId').value\" *ngIf=\"condition.get('operatorId').value && condition.get('operatorId').value.operator_expression =='between'\" [from]=\"condition\" [controlName]=\"'fieldSecondValue'\" [id]=\"i\"></app-flow-input>\r\n                        </li>\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <input type=\"text\" class=\"form-control\" formControlName=\"closingBrackets\" style=\"width:30px;\">\r\n                        </li>\r\n                        <li class=\"text-center\">\r\n                          <a *ngIf=\"i>0\" href=\"javascript:void(0);\" (click)=\"removeCondition(i)\" class=\"text-red font-16\">\r\n                            <i class=\"fa fa-trash\"></i>\r\n                          </a>\r\n                        </li>\r\n\r\n                      </ul>\r\n\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"p-3 text-center\">\r\n                    <div class=\"cstm-drop-btn text-center\">\r\n                      <select #addNewCondition class=\"btn ddlupdatestatus btn-success\" [disabled]=\"!conditions.valid\" (change)=\"addCondition($event)\">\r\n                        <option selected=\"selected\"> Add</option>\r\n                        <option>Or</option>\r\n                        <option>And</option>\r\n                      </select>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"step-default p-3 border mt-2 rounded\"><b>Condition:</b>{{targetForm.value.targetCondition.displayCondition}} <!--(Loan Application Equal To Sales Tax)--> </div>\r\n\r\n\r\n              </div>\r\n              <div [ngClass]=\"{'d-none':hideFieldList,'col-md-3':!hideFieldList}\">\r\n                <div class=\"border\" style=\"max-height: 400px; overflow-y: auto; overflow-x: hidden;\">\r\n                  <table class=\"table table-hover table-dynamic table-cont\">\r\n                    <thead class=\"bg-light\">\r\n                      <tr>\r\n                        <th>Field Name</th>\r\n                        <th style=\"min-width:100px;\">Data Type</th>\r\n\r\n                      </tr>\r\n                    </thead>\r\n                    <tbody *ngIf=\"customFieldsList!=null\">\r\n                      <tr *ngFor=\"let item of customFieldsList\">\r\n                        <td>{{item.name}}</td>\r\n                        <td>{{item.sql_type}}</td>\r\n                      </tr>\r\n                    </tbody>\r\n                    <tbody *ngIf=\"customFieldsList==null\">\r\n                      <tr style=\"margin-left:10px; display:table;\">\r\n                        No data found.\r\n                      </tr>\r\n                    </tbody>\r\n\r\n                  </table>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn\" [ngClass]=\"{'btn-outline-info':hideFieldList,'btn-info':!hideFieldList}\" (click)=\"showFieldList()\"><i class=\"fa fa-list-ol\"></i> {{textFieldListButton}}</button>\r\n            <button type=\"button\" class=\"btn btn-success mr-1\" data-dismiss=\"modal\" (click)=\"saveCondition()\" [disabled]=\"!conditions.valid\"><i class=\"fa fa-save\"></i> Save</button>\r\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"hideConditionModal()\"><i class=\"fa fa-close\"></i> Cancel</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- Modal -->\r\n\r\n  </div>\r\n    <!--<app-work-flow-result #resultcomponent [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\"></app-work-flow-result>-->\r\n    <!--<li *ngIf=\"isResult\">\r\n    <app-work-flow-result #resultcomponent [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\"></app-work-flow-result>\r\n  </li>-->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-delete.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-delete.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--<p class=\"shape_polygan\">\r\n  <span>Target</span>\r\n  <span class=\"delete\" (click)=\"deleteTarget()\" title=\"Click here to delete this Target\"></span>\r\n</p>-->\r\n\r\n<button type=\"button\" class=\"btn btn-green mr-1\" (click)=\"deleteTarget()\" [disabled]=\"!conditions.valid\"><i class=\"fa fa-save\"></i> deleteTarget</button>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-descision.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-descision.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n  <div [formGroup]=\"targetForm\">\r\n   \r\n\r\n\r\n\r\n    <div class=\"flow-container conditionbased\" *ngIf=\"targetForm.get('isDecisionAdded').value\">\r\n      <div class=\"sh_square\">\r\n        <!--{{targetForm.value.targetDecision.displayCondition}}-->\r\n        <span style=\"cursor:pointer;\"  class=\"condition\" > <a href=\"javascript:;\" (click)=\"deletetarget()\" title=\"Delete Decision\" class=\"delete-square\"><i _ngcontent-c11=\"\" class=\"fa fa-trash text-danger\"></i></a> <a style=\"cursor:pointer; color: #2f4050;\" href=\"javascript:;\" (click)=\"editCondition()\" title=\"Edit Decision\">{{targetForm.value.targetDecision.displayCondition  | truncate}}</a> </span>\r\n\r\n      </div>\r\n      <span class=\"condition-false\" style=\"color:#27a844;\">Yes</span>\r\n      <div class=\"add-flow inrow-right\" *ngIf=\"isdecisionbutton\">\r\n        <i class=\"fa fa-plus\"></i>\r\n        <div class=\"add-action\">\r\n          <a href=\"javascript:;\" (click)=\"AddScreen()\" class=\"border-right\"><span class=\"text-info\"><i class=\"fa fa-clone text-info\"></i></span>Add Screen</a>\r\n\r\n          <a href=\"javascript:;\" (click)=\"addresult()\"> <span class=\"text-success\"><i class=\"fa fa-code text-success\"></i></span>Add Result</a>\r\n        </div>\r\n\r\n      </div>\r\n      <!--<app-work-flow-condition #conditioncomponent [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" [rowNo]=\"rowNo\" (showbutton)=\"showbutton($event)\" [typecondition]=\"false\"></app-work-flow-condition>-->\r\n      <app-work-flow-result #resultcomponent [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" (showbutton)=\"showbutton($event)\"></app-work-flow-result>\r\n      <app-screen #screencomponent [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" [rowNo]=\"rowNo\" (showbutton)=\"showbutton($event)\" [typescreen]=\"false\" (stepdll)=\"stepdll($event)\"></app-screen>\r\n      <!--<ng-select *ngIf =\"!isdecisionbutton\" [items]=\"targetForm.get('ddlStepDropdown').value\"\r\n             placeholder=\"Select Module\" bindLabel=\"name\"  bindValue=\"Id\"\r\n             [closeOnSelect]=\"true\">\r\n  </ng-select>-->\r\n\r\n    </div>\r\n    <!-- Modal -->\r\n    <div class=\"modal fade \" bsModal #addConditionModal=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Decision</h5>\r\n            <button type=\"button\" class=\"close\" (click)=\"hideConditionModal()\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <div class=\"row\">\r\n              <div class=\"px-1\" [ngClass]=\"{'col-md-12':hideFieldList,'col-md-9':!hideFieldList}\">\r\n                <div class=\"border\">\r\n                  <div class=\"list-group\" style=\"min-height: 210px;\" formArrayName=\"decisions\">\r\n                    <ul class=\"form-header\">\r\n                      <li> </li>\r\n                      <li class=\"pl-2\"> Section</li>\r\n                      <li class=\"pl-2\"> Field</li>\r\n                      <li class=\"pl-2\"> Conditional Operator</li>\r\n                      <li class=\"pl-2\"> Value</li>\r\n                      <li> </li>\r\n                      <li> </li>\r\n                    </ul>\r\n                    <div *ngFor=\"let condition of conditions.controls;let i=index\" [formGroupName]=\"i\">\r\n                      <ul class=\"from-rules text-center\" *ngIf=\"condition.get('relationWithParent').value\">\r\n                        <li class=\"text-center\"><span class=\"or-and rounded-circle\"><b>{{condition.get('relationWithParent').value}}</b></span></li>\r\n                      </ul>\r\n                      <ul class=\"from-rules\">\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <input formControlName=\"openingBrackets\" style=\"width: auto;min-width: 20px;max-width: 20px;\" class=\"form-control txtOpeningBrackets px-1\">\r\n                        </li>\r\n                        <li class=\"form-group align-middle px-2\">\r\n                        <ng-select [items]=\"subModuleList\" formControlName=\"subModuleId\"\r\n                                   placeholder=\"Select Module\" bindLabel=\"sub_module_name\" (change)=\"onSubModuleChange($event,condition)\"\r\n                                   [closeOnSelect]=\"true\">\r\n                        </ng-select>\r\n                      </li>\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <ng-select [items]=\"condition.get('fields')?.value\" formControlName=\"fieldId\"\r\n                                     placeholder=\"Select Field\" bindLabel=\"name\" (change)=\"onFieldChange($event,condition,i)\"\r\n                                     [closeOnSelect]=\"true\">\r\n\r\n                          </ng-select>\r\n                        </li>\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <ng-select [items]=\"condition.get('operators').value\" formControlName=\"operatorId\"\r\n                                     placeholder=\"Select Operator\" bindLabel=\"operator_display_name\"\r\n                                     [closeOnSelect]=\"true\">\r\n                          </ng-select>\r\n                        </li>\r\n\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <app-flow-input [formGroup]=\"condition\" [operator]=\"condition.get('operatorId').value\" [from]=\"condition\" [controlName]=\"'fieldValue'\" [id]=\"i\"></app-flow-input>\r\n                          <app-flow-input [formGroup]=\"condition\" [operator]=\"condition.get('operatorId').value\" *ngIf=\"condition.get('operatorId').value && condition.get('operatorId').value.operator_expression =='between'\" [from]=\"condition\" [controlName]=\"'fieldSecondValue'\" [id]=\"i\"></app-flow-input>\r\n                        </li>\r\n                        <li class=\"form-group align-middle px-2\">\r\n                          <input type=\"text\" class=\"form-control\" formControlName=\"closingBrackets\" style=\"width:30px;\">\r\n                        </li>\r\n                        <li class=\"text-center\">\r\n                          <a *ngIf=\"i>0\" href=\"javascript:void(0);\" (click)=\"removeCondition(i)\" class=\"text-red font-16\">\r\n                            <i class=\"fa fa-trash\"></i>\r\n                          </a>\r\n                        </li>\r\n\r\n                      </ul>\r\n\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"p-3 text-center\">\r\n                    <div class=\"cstm-drop-btn text-center\">\r\n                      <select #addNewCondition class=\"btn ddlupdatestatus btn-success\" [disabled]=\"!conditions.valid\" (change)=\"addDecision($event)\">\r\n                        <option selected=\"selected\"> Add</option>\r\n                        <option>Or</option>\r\n                        <option>And</option>\r\n                      </select>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"step-default p-3 border mt-2 rounded\"><b>Decision:</b>{{targetForm.value.targetDecision.displayCondition}} <!--(Loan Application Equal To Sales Tax)--> </div>\r\n\r\n\r\n              </div>\r\n              <div [ngClass]=\"{'d-none':hideFieldList,'col-md-3':!hideFieldList}\">\r\n                <div class=\"border\" style=\"max-height: 400px; overflow-y: auto; overflow-x: hidden;\">\r\n                  <table class=\"table table-hover table-dynamic table-cont\">\r\n                    <thead class=\"bg-light\">\r\n                      <tr>\r\n                        <th>Field Name</th>\r\n                        <th style=\"min-width:100px;\">Data Type</th>\r\n\r\n                      </tr>\r\n                    </thead>\r\n                    <tbody *ngIf=\"customFieldsList!=null\">\r\n                      <tr *ngFor=\"let item of customFieldsList\">\r\n                        <td>{{item.name}}</td>\r\n                        <td>{{item.sql_type}}</td>\r\n                      </tr>\r\n                    </tbody>\r\n                    <tbody *ngIf=\"customFieldsList==null\">\r\n                      <tr style=\"margin-left:10px; display:table;\">\r\n                        No data found.\r\n                      </tr>\r\n                    </tbody>\r\n\r\n                  </table>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn\" [ngClass]=\"{'btn-outline-info':hideFieldList,'btn-info':!hideFieldList}\" (click)=\"showFieldList()\"><i class=\"fa fa-list-ol\"></i> {{textFieldListButton}}</button>\r\n            <button type=\"button\" class=\"btn btn-success mr-1\" data-dismiss=\"modal\" (click)=\"saveDecision()\" [disabled]=\"!conditions.valid\"><i class=\"fa fa-save\"></i> Save</button>\r\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"hideConditionModal()\"><i class=\"fa fa-close\"></i> Cancel</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- Modal -->\r\n\r\n\r\n  </div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-result-calculation.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-result-calculation.component.html ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"modal fade\" bsModal #resultCalculationModal=\"bs-modal\" id=\"condition\" tabindex=\"-1\" role=\"dialog\">\r\n  <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Calculated Value</h5>\r\n        <button type=\"button\" class=\"close\" (click)=\"hide()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" [formGroup]=\"resultConditionForm\">\r\n        <div class=\"col-md-12 px-0\">\r\n          <div class=\"panel-content pagination2 table-responsive no-padding\">\r\n            <table class=\"table table-hover table-dynamic\" *ngIf=\"!isDate; else forDate\" style=\"min-width: 300px;\">\r\n              <thead>\r\n                <tr>\r\n                  <th width=\"50\">Formula </th>\r\n                  <th width=\"50\"></th>\r\n                  <th width=\"180\">Section</th>\r\n                  <th width=\"150\">Value</th>\r\n                  <th width=\"50\"></th>\r\n                  <th width=\"30\">Operator</th>\r\n                  <th width=\"30\"></th>\r\n                </tr>\r\n              </thead>\r\n              <tbody formArrayName=\"resultCalculation\">\r\n                <tr *ngFor=\"let resultCalculate of resultCalculation.controls;let i = index\" [formGroupName]=\"i\">\r\n                  <td>\r\n                    <ng-select [items]=\"sqlFunctionList\" [ngStyle]=\"{'width':50}\" formControlName=\"formulaId\"\r\n                               placeholder=\"Select...\" bindLabel=\"DisplayName\" [closeOnSelect]=\"true\">\r\n                    </ng-select>\r\n                  </td>\r\n                  <td>\r\n                    <input class=\"form-control px-0 text-center\" formControlName=\"openingBrackets\" type=\"text\" name=\"name\" value=\"(\" />\r\n                  </td>\r\n                  <td>\r\n                    <ng-select [items]=\"sectionList\" formControlName=\"firstFieldSectionId\" [ngStyle]=\"{'width':150}\"\r\n                               placeholder=\"Manual\" bindLabel=\"sub_module_name\" (change)=\"onFirstSectionChange($event,resultCalculate)\" [closeOnSelect]=\"true\">\r\n                    </ng-select>\r\n                  </td>\r\n                  <td>\r\n                    <ng-select *ngIf=\"resultCalculate.get('firstFieldSectionId').value\" [items]=\"resultCalculate.get('firstFields')?.value\" formControlName=\"firstFieldId\" [ngStyle]=\"{'width':150}\"\r\n                               placeholder=\"Select...\" bindLabel=\"name\" [closeOnSelect]=\"true\">\r\n\r\n                    </ng-select>\r\n                    <input class=\"form-control\" *ngIf=\"!resultCalculate.get('firstFieldSectionId').value\" pKeyFilter=\"pnum\" formControlName=\"firstFieldValue\" name=\"name\" />\r\n\r\n                  </td>\r\n                  <td>\r\n                    <input class=\"form-control px-0 text-center\" formControlName=\"closingBrackets\" name=\"name\" value=\")\" />\r\n                  </td>\r\n                  <td>\r\n                    <ng-select [items]=\"operators\" formControlName=\"operatorId\" [ngStyle]=\"{'width':50}\"\r\n                               placeholder=\"Select...\" bindLabel=\"operator_expression\" [closeOnSelect]=\"true\">\r\n                    </ng-select>\r\n                  </td>\r\n                  <td>\r\n                    <a href=\"javascript:void(0);\" class=\"btn btn-danger\" *ngIf=\"i!=0\" (click)=\"deleteField(i)\"><i class=\"fa fa-trash\"></i></a>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n            <ng-template #forDate>\r\n              <table class=\"table table-hover table-dynamic\" style=\"min-width: 300px;\">\r\n                <thead>\r\n                  <tr>\r\n                    <th width=\"50\">Formula </th>\r\n                    <th width=\"140\">Value Type</th>\r\n                    <th width=\"70\">Value</th>\r\n                    <th width=\"180\">Section</th>\r\n\r\n                    <th width=\"150\">On Date</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"resultCalculation\">\r\n                  <tr *ngFor=\"let resultCalculate of resultCalculation.controls;let i = index\" [formGroupName]=\"i\">\r\n                    <td>\r\n                      <ng-select [items]=\"sqlFunctionList\" [ngStyle]=\"{'width':50}\" formControlName=\"formulaId\"\r\n                                 placeholder=\"Select...\" bindLabel=\"DisplayName\" [closeOnSelect]=\"true\">\r\n                      </ng-select>\r\n                    </td>\r\n                    <td>\r\n                      <ng-select [items]=\"dateParts\" formControlName=\"datePart\" [ngStyle]=\"{'width':50}\"\r\n                                 [closeOnSelect]=\"true\">\r\n                      </ng-select>\r\n                    </td>\r\n                    <td>\r\n                      <input class=\"form-control\" pKeyFilter=\"pnum\" formControlName=\"firstFieldValue\" name=\"name\" />\r\n                    </td>\r\n                    <td>\r\n                      <ng-select [items]=\"sectionList\" formControlName=\"secondFieldSectionId\" [ngStyle]=\"{'width':150}\"\r\n                                 placeholder=\"Default\" bindLabel=\"sub_module_name\" (change)=\"onSecondSectionChange($event,resultCalculate)\" [closeOnSelect]=\"true\">\r\n                      </ng-select>\r\n                    </td>\r\n                    <td>\r\n                      <ng-select *ngIf=\"resultCalculate.get('secondFieldSectionId').value\" [items]=\"resultCalculate.get('secondFields')?.value\" formControlName=\"secondFieldId\" [ngStyle]=\"{'width':150}\"\r\n                                 placeholder=\"Select...\" bindLabel=\"name\" [closeOnSelect]=\"true\">\r\n\r\n                      </ng-select>\r\n                      <input class=\"form-control\" *ngIf=\"!resultCalculate.get('secondFieldSectionId').value\" pKeyFilter=\"pnum\" readonly value=\"Today\" />\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </ng-template>\r\n            <div class=\"p-3 text-center\" *ngIf=\"!isDate\">\r\n              <a href=\"javascript:void(0);\" class=\"btn btn-primary\" (click)=\"addField()\"><i class=\"fa fa-plus\"></i> Add</a>\r\n            </div>\r\n          </div>\r\n          <div class=\"step-default p-3 border mt-2 rounded\"><b>Value:</b> {{displayValue}} </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <a href=\"javascript:void(0);\" class=\"btn btn-success\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n        <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"hide()\"><i class=\"fa fa-close\"></i> Cancel</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-result-table-field.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-result-table-field.component.html ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"table-responsive overflow-auto rule-table\" [formGroup]=\"resultForm\">\r\n  <table class=\"table table-hover table-dynamic\" formArrayName=\"tableFields\">\r\n    <thead>\r\n      <tr>\r\n        <th>Field</th>\r\n        <th>Data Type</th>\r\n        <!--<th>Is Calculate</th>-->\r\n        <th>Value</th>\r\n        <th></th>\r\n      </tr>\r\n    </thead>\r\n    <tbody *ngIf=\"resultForm.get('action').value\">\r\n      <ng-container *ngIf=\"resultForm.get('action').value.code=='create'\">\r\n        <tr *ngFor=\"let tableField of tableFields.controls;let i=index\" [formGroupName]=\"i\">\r\n          <ng-template [ngIf]=\"tableField.get('name').value != 'LoanApplicationId' && tableField.get('name').value != 'CompanyId' && tableField.get('name').value != 'StatusId'\">\r\n            <td>\r\n              <strong>{{tableField.get('name').value}}</strong>\r\n            </td>\r\n            <td>\r\n              <strong>{{tableField.get('dataType').value}}</strong>\r\n            </td>\r\n            <td>\r\n\r\n              <label class=\"switch disabled\" [ngClass]=\"{'toggle-disabled':tableField.get('isCalculate').disabled}\">\r\n                <input type=\"checkbox\" formControlName=\"isCalculate\" (change)=\"onFieldCalculateChange(tableField.get('isCalculate'),tableField)\" checked=\"\">\r\n                <span class=\"slider round\"><span>Yes</span></span>\r\n              </label>\r\n            </td>\r\n            <td>\r\n              <div *ngIf=\"tableField.get('isCalculate').value else isNotCalculate\">\r\n                <button (click)=\"showResultCalculation(tableField)\" type=\"button\" class=\"btn btn-primary\">\r\n                  {{tableField.get('fieldValue').value ? 'Edit': 'Add'}}\r\n                </button>\r\n                {{tableField.get('fieldDisplayValue').value}}\r\n              </div>\r\n              <ng-template #isNotCalculate>\r\n                <app-flow-input [formGroup]=\"tableField\" [from]=\"result\" [controlName]=\"'fieldValue'\" [id]=\"i\"></app-flow-input>\r\n              </ng-template>\r\n            </td>\r\n           \r\n            <td class=\"align-middle\" *ngIf=\"i>0\">\r\n            </td>\r\n          </ng-template>\r\n\r\n        </tr>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"resultForm.get('action').value.code=='update'\">\r\n        <tr *ngFor=\"let tableField of tableFields.controls;let i=index\" [formGroupName]=\"i\">\r\n          <td>\r\n            <ng-select [items]=\"resultForm.get('fieldList').value\" formControlName=\"fieldId\"\r\n                       placeholder=\"Select Field\" bindLabel=\"name\" (change)=\"onTableFieldChange($event,tableField)\"\r\n                       [closeOnSelect]=\"true\">\r\n            </ng-select>\r\n          </td>\r\n          <td>\r\n            <strong>{{tableField.get('dataType').value}}</strong>\r\n          </td>\r\n          <!--<td>\r\n\r\n            <label class=\"switch disabled\" [ngClass]=\"{'toggle-disabled':tableField.get('isCalculate').disabled}\">\r\n              <input type=\"checkbox\" formControlName=\"isCalculate\" (change)=\"onFieldCalculateChange(tableField.get('isCalculate'),tableField)\" checked=\"\">\r\n              <span class=\"slider round\"><span>Yes</span></span>\r\n            </label>\r\n          </td>-->\r\n          <td>\r\n\r\n            <div *ngIf=\"tableField.get('isCalculate').value else isNotCalculate\">\r\n              <button (click)=\"showResultCalculation(tableField)\" type=\"button\" class=\"btn btn-primary\">\r\n                {{tableField.get('fieldValue').value ? 'Edit': 'Add'}}\r\n              </button>\r\n              {{tableField.get('fieldDisplayValue').value}}\r\n            </div>\r\n            <ng-template #isNotCalculate>\r\n              <app-flow-input [formGroup]=\"tableField\" [from]=\"result\" [controlName]=\"'fieldValue'\" [id]=\"i\"></app-flow-input>\r\n            </ng-template>\r\n          </td>\r\n          <td class=\"align-middle\" *ngIf=\"i>0\">\r\n            <a href=\"javascript:void(0);\" (click)=\"removeTableField(i)\" class=\"text-red font-16\"><i class=\"fa fa-trash\"></i></a>\r\n          </td>\r\n\r\n        </tr>\r\n      </ng-container>\r\n\r\n    </tbody>\r\n\r\n  </table>\r\n  <app-work-flow-result-calculation #resultCalculation [moduleId]=\"moduleId\" [resultForm]=\"resultForm\"></app-work-flow-result-calculation>\r\n</div>\r\n<div class=\"p-3 text-right\" *ngIf=\"resultForm.get('action')?.value?.code !='create'\">\r\n  <button [disabled]=\"!tableFields.valid\" class=\"btn btn-success mr-1\" (click)=\"addTableField()\"><span><i class=\"fa fa-plus\"></i> Add</span></button>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-result.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-result.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--<div *ngIf=\"target.get('isConditionAdded').value \">\r\n  <h3 class=\"form-heading\">Results</h3>\r\n  <table class=\"table table-hover table-dynamic rule-tab\">\r\n\r\n    <tbody>\r\n      <tr *ngFor=\"let result of target.get('results').value;let i = index\">\r\n        <td class=\"text-left\">\r\n          <a data-toggle=\"modal\" (click)=\"editResult(i)\" class=\"text-white font-16 mt-2\">\r\n            <i class=\"fa fa-pencil\"></i> {{result.name}}\r\n          </a>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n\r\n  </table>\r\n  <div class=\"col-sm-12 p-2\">\r\n    <a class=\"btn btn-white mr-1\" (click)=\"showResultModal()\"><span style=\"margin-top: 0px;\"><i class=\"fa fa-plus\"></i> Add New </span></a>\r\n  </div>\r\n</div>-->\r\n<div class=\"condition-result\" [formGroup]=\"target\" *ngIf=\"target.get('isResultDecisionAdded').value && target.get('isDecisionAdded').value\">\r\n  <strong>Results:</strong>\r\n  <span *ngFor=\"let result of target.get('results').value;let i = index\" class=\" d-block result-list\">\r\n    {{result.name}}  <a href=\"javascript:;\" (click)=\"editResult(i)\" class=\"ml-2\"><i class=\"fa fa-pencil\"></i></a>\r\n  </span>\r\n  <a href=\"javascript:;\" class=\"delete-btn\" (click)=\"showResultModal()\"><i class=\"fa fa-plus\"></i></a>\r\n</div>\r\n\r\n\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\" bsModal #addResult=\"bs-modal\" [config]=\"{backdrop: 'static'}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\r\n    <div class=\"modal-content\" style=\"min-height:500px !important\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Result</h5>\r\n        <button type=\"button\" class=\"close\" (click)=\"hideResultModal()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"resultForm\">\r\n          <div class=\"row\">\r\n            <div class=\"col-4\">\r\n              <label>Name</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"name\">\r\n              </div>\r\n            </div>\r\n            <div class=\"col-4\">\r\n              <label>Action</label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"resultActionList\" formControlName=\"action\" (change)=\"onActionChange($event)\"\r\n                           placeholder=\"Select Action\" bindLabel=\"name\"\r\n                           [closeOnSelect]=\"true\">\r\n                </ng-select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-4\" *ngIf=\"resultForm.get('subModuleId').enabled\">\r\n              <label>Section</label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"tableList\" formControlName=\"subModuleId\" (change)=\"getSubModuleFields($event)\"\r\n                           placeholder=\"Select Module\" bindValue=\"sub_module_id\" bindLabel=\"sub_module_name\"\r\n                           [closeOnSelect]=\"true\">\r\n                </ng-select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-12\">\r\n              <div class=\"border\" *ngIf=\"resultForm.get('action').value\">\r\n\r\n                <ng-container *ngIf=\"resultForm.get('action').value.code=='update' || resultForm.get('action').value.code=='create'\">\r\n                  <app-work-flow-result-table-field [resultForm]=\"resultForm\" [moduleId]=\"moduleId\"></app-work-flow-result-table-field>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"resultForm.get('action').value.code !='update' && resultForm.get('action').value.code !='create'\">\r\n                  <input formControlName=\"resultCondition\" class=\"form-control\" placeholder=\"Please enter the validation message.\" type=\"text\" />\r\n                </ng-container>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <div class=\"row w-100\">         \r\n          <div class=\"col-md-6 text-left pl-0\">\r\n            <button type=\"button\" class=\"btn btn-danger\" *ngIf=\"resultForm.get('isEdit').value\" data-dismiss=\"modal\" (click)=\"deleteResultForm()\"><i class=\"fa fa-trash\"></i> Delete</button>\r\n          </div>\r\n          <div class=\"col-md-6 text-right\">           \r\n            <button type=\"button\" class=\"btn btn-primary mr-1\" (click)=\"openconditionpopup()\"><i class=\"fa fa-code\"></i> condition</button>\r\n            <button type=\"button\" class=\"btn btn-success mr-1\" (click)=\"saveResult()\" [disabled]=\"!resultForm.valid\"><i class=\"fa fa-save\"></i> Save</button>\r\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"hideResultModal()\"><i class=\"fa fa-close\"></i> Cancel</button>\r\n          </div>\r\n        </div>\r\n          \r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal fade \" bsModal #addConditionModal=\"bs-modal\" style=\"z-index:10000\" [config]=\"{backdrop: 'static'}\"   tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-dialog-centered modal-xl\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Flow Condition</h5>\r\n        <button type=\"button\" class=\"close\" (click)=\"hideConditionModal()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"col-md-12 p-0\" [formGroup]=\"resultForm\">\r\n          \r\n            <div class=\"border w-100\">\r\n              <div class=\"list-group\" style=\"min-height: 210px;\" formArrayName=\"whereClauseFields\">\r\n                <ul class=\"form-header\">\r\n                  <li> </li>\r\n                  <!--<li class=\"pl-2\"> Section</li>-->\r\n                  <li class=\"pl-2\"> Field</li>\r\n                  <li class=\"pl-2\"> Conditional Operator</li>\r\n                  <li class=\"pl-2\"> Value</li>\r\n                  <li> </li>\r\n                  <li> </li>\r\n                </ul>\r\n                <div *ngFor=\"let condition of resultForm.get('whereClauseFields').controls;let i=index\" [formGroupName]=\"i\">\r\n                 \r\n                  <ul class=\"from-rules text-center\" *ngIf=\"condition.get('relationWithParent').value\">\r\n                    <li class=\"text-center\"><span class=\"or-and rounded-circle\"><b>{{condition.get('relationWithParent').value}}</b></span></li>\r\n                  </ul>\r\n\r\n                  <ul class=\"from-rules\">\r\n                    <li class=\"form-group align-middle px-2\">\r\n                      <input formControlName=\"openingBrackets\" style=\"width: auto;min-width: 20px;max-width: 20px;\" class=\"form-control txtOpeningBrackets px-1\">\r\n                    </li>\r\n                    <!--<li class=\"form-group align-middle px-2\">\r\n      <ng-select [items]=\"subModuleList\" formControlName=\"subModuleId\"\r\n                 placeholder=\"Select Module\" bindLabel=\"sub_module_name\" (change)=\"onSubModuleChange($event,condition)\"\r\n                 [closeOnSelect]=\"true\">\r\n      </ng-select>\r\n    </li>-->\r\n                    <li class=\"form-group align-middle px-2\">\r\n                      <ng-select [items]=\"condition.get('fields').value\" formControlName=\"fieldId\"\r\n                                 placeholder=\"Select Field\" bindLabel=\"name\" (change)=\"onFieldChange($event,condition,i)\"\r\n                                 [closeOnSelect]=\"true\">\r\n\r\n                      </ng-select>\r\n                    </li>\r\n                    <li class=\"form-group align-middle px-2\">\r\n                      <ng-select [items]=\"condition.get('operators').value\" formControlName=\"operatorId\"\r\n                                 placeholder=\"Select Operator\" bindLabel=\"operator_display_name\"\r\n                                 [closeOnSelect]=\"true\">\r\n                      </ng-select>\r\n                    </li>\r\n\r\n                    <li class=\"form-group align-middle px-2\">\r\n                      <app-flow-input [formGroup]=\"condition\" [operator]=\"condition.get('operatorId').value\" [from]=\"condition\" [controlName]=\"'fieldValue'\" [id]=\"i\"></app-flow-input>\r\n                      <app-flow-input [formGroup]=\"condition\" [operator]=\"condition.get('operatorId').value\" *ngIf=\"condition.get('operatorId').value && condition.get('operatorId').value.operator_expression =='between'\" [from]=\"condition\" [controlName]=\"'fieldSecondValue'\" [id]=\"i\"></app-flow-input>\r\n                    </li>\r\n                    <li class=\"form-group align-middle px-2\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"closingBrackets\" style=\"width:30px;\">\r\n                    </li>\r\n                    <li class=\"text-center\">\r\n                      <a *ngIf=\"i>0\" href=\"javascript:void(0);\" (click)=\"removeCondition(i)\" class=\"text-red font-16\">\r\n                        <i class=\"fa fa-trash\"></i>\r\n                      </a>\r\n                    </li>\r\n\r\n                  </ul>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"p-3 text-center\">\r\n                <div class=\"cstm-drop-btn text-center\">\r\n                  <select #addNewCondition class=\"btn ddlupdatestatus btn-success\"  (change)=\"addCondition($event)\">\r\n                    <option selected=\"selected\"> Add</option>\r\n                    <option>Or</option>\r\n                    <option>And</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!--<div class=\"step-default p-3 border mt-2 rounded\"><b>Condition:</b>{{targetForm.value.targetCondition.displayCondition}}  </div>-->\r\n\r\n\r\n      \r\n        \r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div class=\"modal-footer\">\r\n       \r\n        <button type=\"button\" class=\"btn btn-success mr-1\" data-dismiss=\"modal\" (click)=\"saveCondition()\" [disabled]=\"!conditions.valid\"><i class=\"fa fa-save\"></i> Save</button>\r\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"hideConditionModal()\"><i class=\"fa fa-close\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- Modal -->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-target.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-target.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--<p class=\"shape_polygan\">\r\n  <span>Target</span>\r\n  <span class=\"delete\" (click)=\"deleteTarget()\" title=\"Click here to delete this Target\"></span>\r\n</p>-->\r\n  <div [formGroup]=\"targetForm\">\r\n    <div class=\"flow-container last-child \" *ngIf=\"!targetForm.get('addButton').value\">\r\n      <div class=\"add-flow\">\r\n        <i class=\"fa fa-plus\"></i>\r\n        <div class=\"add-action\">\r\n          <a href=\"javascript:;\" (click)=\"AddScreen()\" class=\"border-right\"><span class=\"text-info\"><i class=\"fa fa-clone text-info\"></i></span>Add Screen</a>\r\n          <a  href=\"javascript:;\" (click)=\"AddDecision()\" class=\"border-right\"><span class=\"text-warning\"><i class=\"fa fa-file-text-o text-warning\"></i></span>Add Decision</a>\r\n          <!--<a href=\"javascript:;\" (click)=\"AddCondition()\"> <span class=\"text-success\"><i class=\"fa fa-code text-success\"></i></span>Add Condition</a>-->\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n <!--<app-work-flow-delete (deleteTargetEvent)=\"deleteTarget(i)\"></app-work-flow-delete>-->\r\n\r\n  <!--<app-work-flow-condition  #conditioncomponent [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" [typecondition]=\"true\"  [rowNo]=\"rowNo\"\r\n    (buttonState)=\"buttonState($event)\" (getIndexNo)=\"getIndexNo($event)\"></app-work-flow-condition>-->\r\n\r\n\r\n  <app-work-flow-descision  #decisioncomponent [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" [rowNo]=\"rowNo\"\r\n                           (buttonState)=\"buttonState($event)\" (getIndexNo)=\"getIndexNo($event)\" ></app-work-flow-descision>\r\n  <app-screen #screencomponent [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\" [rowNo]=\"rowNo\" (getIndexNo)=\"getIndexNo($event)\" (buttonState)=\"buttonState($event)\" (stepdll)=\"stepdll($event)\" [typescreen]=\"true\"></app-screen>\r\n\r\n\r\n  <!--<app-work-flow-result  [ruleEngineForm]=\"ruleEngineForm\" [target]=\"target\"></app-work-flow-result>-->\r\n");

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

/***/ "./src/app/views/work-flow/mappingpopup/mappingpopup.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/views/work-flow/mappingpopup/mappingpopup.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmstZmxvdy9tYXBwaW5ncG9wdXAvbWFwcGluZ3BvcHVwLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/work-flow/mappingpopup/mappingpopup.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/work-flow/mappingpopup/mappingpopup.component.ts ***!
  \************************************************************************/
/*! exports provided: MappingpopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MappingpopupComponent", function() { return MappingpopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _workflow_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../workflow.service */ "./src/app/views/work-flow/workflow.service.ts");
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







var MappingpopupComponent = /** @class */ (function () {
    function MappingpopupComponent(workService, fb, router, toaster, commonService) {
        this.workService = workService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.commonService = commonService;
        this.setMapping = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loadSave = false;
        this.search = '';
        this.length = 0;
        this.customButtonForm = this.fb.group({
            customButtonId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
    }
    MappingpopupComponent.prototype.ngOnInit = function () {
        this.GetCustomButton();
    };
    MappingpopupComponent.prototype.GetCustomButtonDetail = function (id) {
        var _this = this;
        this.workService.getCustomButtonDetailByFlowId(id).subscribe(function (result) {
            console.log('CustomButtonDetail:', result);
            if (result) {
                _this.loadSave = false;
                var id_1 = String(result.id);
                if (_this.CustomButtonList != null) {
                    var val = _this.CustomButtonList.filter(function (m) { return m.value == id_1; });
                    if (val) {
                        _this.customButtonId.setValue(val[0].value);
                    }
                }
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    MappingpopupComponent.prototype.show = function (data) {
        this.customButtonForm.reset();
        this.MappingPopup.show();
        this.FlowId = data.FlowId;
        this.FlowName = data.FlowName;
        this.loadSave = false;
        if (this.FlowId) {
            this.GetCustomButtonDetail(this.FlowId);
        }
    };
    MappingpopupComponent.prototype.onClearCustomButton = function (dataList) {
        this.length = 0;
        this.search = '';
        this.GetCustomButton();
    };
    MappingpopupComponent.prototype.onKeyCustomButton = function (e, dataList) {
        this.length = 0;
        this.search = e.target.value;
        this.GetCustomButton();
    };
    MappingpopupComponent.prototype.onScrollToEndCustomButton = function (dataList) {
        this.fetchMore(dataList);
    };
    MappingpopupComponent.prototype.fetchMore = function (dataList) {
        if (this.search == undefined) {
            this.search = '';
        }
        this.length = dataList.length;
        this.GetCustomButton();
    };
    MappingpopupComponent.prototype.GetCustomButton = function () {
        var _this = this;
        this.workService.GetCustomButtonDDLList('', this.length, this.search).subscribe(function (resp) {
            if (resp) {
                _this.CustomButtonList = resp;
                console.log("this.CustomButtonList", _this.CustomButtonList);
            }
        });
    };
    ;
    MappingpopupComponent.prototype.close = function () {
        this.loadSave = false;
        this.MappingPopup.hide();
    };
    MappingpopupComponent.prototype.onSubmit = function () {
        var _this = this;
        //debugger;
        console.log("FormValue", this.customButtonForm);
        if (this.customButtonForm.valid) {
            console.log('customButtonData', this.customButtonForm.value);
            this.workService.saveCustomButton(this.customButtonForm.value.customButtonId, this.FlowId).subscribe(function (res) {
                if (res.statusCode == 200) {
                    _this.toaster.success('Flow has been mapped with selected custom button.');
                    _this.setMapping.emit(1);
                    _this.MappingPopup.hide();
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error('Something went wrong');
                }
            });
        }
        else {
            this.loadSave = false;
            this.commonService.validateAllFormFields(this.customButtonForm);
        }
    };
    Object.defineProperty(MappingpopupComponent.prototype, "customButtonId", {
        get: function () { return this.customButtonForm.get('customButtonId'); },
        enumerable: true,
        configurable: true
    });
    MappingpopupComponent.ctorParameters = function () { return [
        { type: _workflow_service__WEBPACK_IMPORTED_MODULE_6__["WorkflowService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapping', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], MappingpopupComponent.prototype, "MappingPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], MappingpopupComponent.prototype, "setMapping", void 0);
    MappingpopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-mappingpopup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./mappingpopup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/mappingpopup/mappingpopup.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./mappingpopup.component.scss */ "./src/app/views/work-flow/mappingpopup/mappingpopup.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_workflow_service__WEBPACK_IMPORTED_MODULE_6__["WorkflowService"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]])
    ], MappingpopupComponent);
    return MappingpopupComponent;
}());



/***/ }),

/***/ "./src/app/views/work-flow/work-flow.component.ts":
/*!********************************************************!*\
  !*** ./src/app/views/work-flow/work-flow.component.ts ***!
  \********************************************************/
/*! exports provided: WorkFlowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkFlowComponent", function() { return WorkFlowComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _workflow_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./workflow.service */ "./src/app/views/work-flow/workflow.service.ts");
/* harmony import */ var _mappingpopup_mappingpopup_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mappingpopup/mappingpopup.component */ "./src/app/views/work-flow/mappingpopup/mappingpopup.component.ts");
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








var WorkFlowComponent = /** @class */ (function () {
    function WorkFlowComponent(workService, commonService, dialogService, activeRoute, toaster) {
        this.workService = workService;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'created_at';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.loanData = null;
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["SelectionType"];
        this.selected = [];
        this.loadSave = false;
        this.laPagedData = {
            pager: {},
            data: []
        };
        this.listFiltertext = '';
        this.searchUserType = '';
        this.laSortColumn = 'CreatedOn';
        this.laSortDir = 'desc';
        this.currentPage = 1;
        this.laPageSizeValue = 10;
        this.batchid = 0;
        this.listOne = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
        this.rulId = "";
    }
    WorkFlowComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.refresh();
        this.getLoanProductList();
        this.getPageSizes();
    };
    WorkFlowComponent.prototype.onClick = function () {
        // console.log(this.listOne);
    };
    WorkFlowComponent.prototype.updateFilter = function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    WorkFlowComponent.prototype.getLoanProductList = function () {
        var _this = this;
        this.workService.getLoanProducts('all').subscribe(function (m) {
            _this.loanProducts = m;
        });
    };
    WorkFlowComponent.prototype.SetLoanData = function (event) {
        if (typeof event != "undefined") {
            this.loanData = event.Id;
        }
    };
    WorkFlowComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    WorkFlowComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.workService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.workService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WorkFlowComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        if (typeof this.loanData == 'undefined') {
            this.loanData = null;
        }
        this.workService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.workService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WorkFlowComponent.prototype.reset = function () {
        var _this = this;
        this.table.sorts = [];
        this.selected = [];
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'desc';
        this.sortColumn = 'created_at';
        this.pageSizeValue = 10;
        this.workService.getRuleList(this.listFilter, null, this.sortColumn, this.sortDir, 0, 10).subscribe(function (response) {
            _this.pagedData = _this.workService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WorkFlowComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.workService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.workService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WorkFlowComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.workService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.workService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WorkFlowComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.workService.getRuleList('', this.loanData, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.workService.pagedData;
            console.log('pagedData', _this.pagedData);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WorkFlowComponent.prototype.DeleteFlow = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete flow \"" + row.FlowName + "\"?";
        this.dialogService.confirm('Delete Flow ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.workService.deleteFlow(row.FlowId).subscribe(function (result) {
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
    WorkFlowComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.rulId == "" || this.rulId == null || this.rulId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            for (var i = 0; i < selected.length; i++) {
                // if (selected[i].asociatedUser !== 1) {
                this.rulId += selected[i].FlowId.toString() + ",";
                // }
            }
        }
        else {
            this.rulId = null;
            this.rulId = "";
            for (var i = 0; i < selected.length; i++) {
                //if (selected[i].asociatedUser !== 1) {
                this.rulId += selected[i].FlowId.toString() + ",";
                // }
            }
        }
    };
    WorkFlowComponent.prototype.onSelectLA = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.rulId == "" || this.rulId == null || this.rulId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            for (var i = 0; i < selected.length; i++) {
                // if (selected[i].asociatedUser !== 1) {
                this.rulId += selected[i].FlowId.toString() + ",";
                // }
            }
        }
        else {
            this.rulId = null;
            this.rulId = "";
            for (var i = 0; i < selected.length; i++) {
                //if (selected[i].asociatedUser !== 1) {
                this.rulId += selected[i].FlowId.toString() + ",";
                // }
            }
        }
    };
    WorkFlowComponent.prototype.remove = function () {
        var _this = this;
        if (this.rulId != null && this.rulId != "") {
            var message = "Are you sure you want to delete all the selected flow(s)?";
            this.dialogService.confirm('Delete Flow(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.workService.deleteRules(_this.rulId).subscribe(function (r) {
                        _this.toaster.success("Selected flow(s) has been deleted successfully");
                        _this.rulId = "";
                        _this.selected = [];
                        _this.search();
                    }, function (error) {
                    });
                }
            });
        }
        else {
            this.toaster.error("Please select at least one row.");
        }
    };
    WorkFlowComponent.prototype.disable = function (row) {
        var _this = this;
        var message = "Are you sure you want to disable   \"" + row.FlowName + "\" flow?";
        this.dialogService.confirm('Disable Flow', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.workService.changeStatus(row.FlowId).subscribe(function (r) {
                    _this.refresh();
                    _this.toaster.success(" Flow \"" + row.FlowName + "\" has been disabled successfully ");
                }, function (error) {
                });
            }
        });
    };
    WorkFlowComponent.prototype.enable = function (row) {
        var _this = this;
        var message = "Are you sure you want to enable    \"" + row.FlowName + "\" flow?";
        this.dialogService.confirm('Enable Flow', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.workService.changeStatus(row.FlowId).subscribe(function (response) {
                    _this.refresh();
                    _this.toaster.success(" Flow \"" + row.FlowName + "\" has been enabled successfully");
                }, function (error) {
                });
            }
        });
    };
    WorkFlowComponent.prototype.applyLatestRule = function () {
        console.log(this.selected);
    };
    WorkFlowComponent.prototype.onActivate = function (event) {
    };
    WorkFlowComponent.prototype.MappingPopup = function ($event) {
        this.Mappingpopup.show($event);
    };
    WorkFlowComponent.prototype.setMapping = function (e) {
        this.refresh();
    };
    WorkFlowComponent.ctorParameters = function () { return [
        { type: _workflow_service__WEBPACK_IMPORTED_MODULE_6__["WorkflowService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapping', { static: false }),
        __metadata("design:type", _mappingpopup_mappingpopup_component__WEBPACK_IMPORTED_MODULE_7__["MappingpopupComponent"])
    ], WorkFlowComponent.prototype, "Mappingpopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["DatatableComponent"])
    ], WorkFlowComponent.prototype, "table", void 0);
    WorkFlowComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-work-flow',
            template: __importDefault(__webpack_require__(/*! raw-loader!./work-flow.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/work-flow.component.html")).default,
            styles: ["\n.ngx-datatable.scroll-horz .datatable-body{\n    overflow-x:hidden !important;\n}\n"]
        }),
        __metadata("design:paramtypes", [_workflow_service__WEBPACK_IMPORTED_MODULE_6__["WorkflowService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], WorkFlowComponent);
    return WorkFlowComponent;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflow-add-edit.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/work-flow/workflow-add-edit.component.ts ***!
  \****************************************************************/
/*! exports provided: WorkflowAddEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkflowAddEditComponent", function() { return WorkflowAddEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _bank_bank_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../bank/bank.service */ "./src/app/views/bank/bank.service.ts");
/* harmony import */ var _workflowmodels_work_flow_condition_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./workflowmodels/work-flow-condition.component */ "./src/app/views/work-flow/workflowmodels/work-flow-condition.component.ts");
/* harmony import */ var _workflowmodels_work_flow_result_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./workflowmodels/work-flow-result.component */ "./src/app/views/work-flow/workflowmodels/work-flow-result.component.ts");
/* harmony import */ var _workflowmodels_work_flow_descision_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./workflowmodels/work-flow-descision.component */ "./src/app/views/work-flow/workflowmodels/work-flow-descision.component.ts");
/* harmony import */ var _workflowmodels_screen_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./workflowmodels/screen.component */ "./src/app/views/work-flow/workflowmodels/screen.component.ts");
/* harmony import */ var _workflow_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./workflow.service */ "./src/app/views/work-flow/workflow.service.ts");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
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















var WorkflowAddEditComponent = /** @class */ (function () {
    function WorkflowAddEditComponent(ruleEngineService, fb, router, toaster, route, dialogService, commonService, bankService) {
        this.ruleEngineService = ruleEngineService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.bankService = bankService;
        this.rValidation = '';
        this.ruleEngineVersionList = [];
        this.ruleEngineVersionListForChange = [];
        this.selectedApplication = [];
        this.selectedOldApplication = [];
        this.events = [];
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["SelectionType"];
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
        this.appmodel = new _workflow_service__WEBPACK_IMPORTED_MODULE_12__["CheckFlowName"]();
        this.bankList = [];
        this.isSubmitButtonDisabled = false;
        this.selectedVersionForChange = null;
        this.RuleNameToShow = "";
        this.isEdit = false;
        this.submoduleidform = null;
        this.loanApplicationPageData = {
            pager: {},
            data: []
        };
        this.isCondition = false;
        this.isResult = false;
        this.isScreen = false;
        this.isDropdown = false;
    }
    WorkflowAddEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        //this.onEffectiveDateChange();
        this.getRuleTypeList();
        //this.onRuleTypeChange();
        this.getModuleList();
        this.getLoanProductList('all');
        this.onModuleChange();
        this.onSubModuleChange();
        this.route.paramMap.subscribe(function (params) {
            _this.id = params.get('id');
            if (_this.id) {
                _this.fillRuleEngineForm(_this.id);
                _this.isEdit = true;
                //this.refreshLA();
                _this.getPageSizes();
            }
            else {
                _this.ruleEngineService.getDisplayOrder().subscribe(function (m) {
                    _this.displayOrder.setValue(m);
                });
                _this.pageTitle = 'Add Flow';
            }
        });
    };
    WorkflowAddEditComponent.prototype.fillRuleEngineForm = function (id) {
        var _this = this;
        this.loadSave = true;
        this.pageTitle = 'Edit Flow';
        this.ruleEngineService.GetRuleEngineDetail(id).subscribe(function (result) {
            console.log(result);
            _this.ruleEnginedata = result;
            var rule = _this.ruleEnginedata;
            _this.editPrepare(rule);
            _this.getRuleEngineVersionList(id);
        });
    };
    WorkflowAddEditComponent.prototype.editPrepare = function (ruleEngine) {
        //if (this.isEdit) {
        //  this.ruleEngineForm.get('moduleId').disable();
        //  this.ruleEngineForm.get('subModuleId').disable();
        var _this = this;
        //}
        debugger;
        if (ruleEngine.customflowid == this.id) {
            this.ruleEngineForm.get('isActive').disable();
        }
        this.moduleidform = ruleEngine.ModuleId,
            this.submoduleidform = ruleEngine.SubModuleId;
        var convertdatetime = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_13__["DateTimeToLocalForAddEditPipe"]();
        this.isEditEvent = false;
        this.eventName = ruleEngine.EventName;
        this.productName = ruleEngine.ProductName;
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
        ruleEngine.targets.forEach(function (m) {
            console.log('editdata', m);
            _this.targets.push(_this.ruleEngineService.buildTarget(m, m.type));
        });
        this.loadSave = false;
    };
    WorkflowAddEditComponent.prototype.editRuleVersion = function (FlowId) {
        this.editFromVersion = true;
        this.router.navigateByUrl("/rule-engine/edit/" + FlowId);
        //this.refreshLA(ruleId)
    };
    WorkflowAddEditComponent.prototype.initForm = function () {
        this.ruleEngineForm = this.fb.group({
            FlowId: [""],
            name: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            moduleId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            subModuleId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            banks: [null],
            loanProducts: [null],
            ///effectiveFrom: [null, Validators.required],
            //effectiveTo: [null, Validators.required],
            eventId: [0, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            isActive: [false],
            ruleVersion: [0],
            displayOrder: [0],
            targets: this.fb.array([this.ruleEngineService.buildTarget()])
        });
    };
    WorkflowAddEditComponent.prototype.getRuleEngineVersionList = function (FlowId) {
        var _this = this;
        this.ruleEngineService.getRuleEngineVersionList(FlowId).subscribe(function (m) {
            _this.ruleEngineVersionList = m;
            _this.ruleEngineVersionListForChange = m.filter(function (item) { return item.FlowId != FlowId; });
            _this.makeSubmitButtonDisabled();
        });
    };
    WorkflowAddEditComponent.prototype.getRuleTypeList = function () {
        var _this = this;
        this.ruleEngineService.GetRuleTypeList().subscribe(function (m) {
            _this.ruleTypeList = m;
        });
    };
    WorkflowAddEditComponent.prototype.getModuleList = function () {
        var _this = this;
        this.commonService.getMasterItemsList('custom_modules_layout').subscribe(function (result) {
            _this.moduleList = _this.commonService.masters;
        });
    };
    Object.defineProperty(WorkflowAddEditComponent.prototype, "FlowId", {
        get: function () {
            return this.ruleEngineForm.get('FlowId');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowAddEditComponent.prototype, "name", {
        get: function () {
            return this.ruleEngineForm.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowAddEditComponent.prototype, "moduleId", {
        get: function () {
            return this.ruleEngineForm.get('moduleId');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowAddEditComponent.prototype, "subModuleId", {
        get: function () {
            return this.ruleEngineForm.get('subModuleId');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowAddEditComponent.prototype, "banks", {
        get: function () {
            return this.ruleEngineForm.get('banks');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowAddEditComponent.prototype, "loanProducts", {
        get: function () {
            return this.ruleEngineForm.get('loanProducts');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowAddEditComponent.prototype, "eventId", {
        //get effectiveFrom() {
        //  return this.ruleEngineForm.get('effectiveFrom');
        //}
        //get effectiveTo() {
        //  return this.ruleEngineForm.get('effectiveTo');
        //}
        get: function () {
            return this.ruleEngineForm.get('eventId');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowAddEditComponent.prototype, "targets", {
        get: function () {
            return this.ruleEngineForm.get('targets');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowAddEditComponent.prototype, "displayOrder", {
        get: function () {
            return this.ruleEngineForm.get('displayOrder');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowAddEditComponent.prototype, "ruleVersion", {
        get: function () {
            return this.ruleEngineForm.get('ruleVersion');
        },
        enumerable: true,
        configurable: true
    });
    //onEffectiveDateChange() {
    //  this.effectiveFrom.valueChanges.subscribe(m => {
    //    if (this.effectiveTo.value < m) {
    //      this.effectiveTo.setValue(null);
    //    }
    //  });
    //}
    WorkflowAddEditComponent.prototype.onEventChange = function (event) {
        console.log('event', event);
        this.eventName = event.Name;
        this.isEditEvent = false;
        this.inputProductId = this.productId;
    };
    WorkflowAddEditComponent.prototype.onModuleChange = function () {
        var _this = this;
        this.moduleId.valueChanges.subscribe(function (m) {
            _this.ruleEngineService.getSubModules(m.value, null, false).subscribe(function (s) {
                console.log("s", s);
                _this.subModuleList = s;
                // this.subModuleList = s.filter(a => a.Status_id === 1001 && a.module_name_code != 'loanproduct');
            });
        });
    };
    WorkflowAddEditComponent.prototype.onSubModuleChange = function () {
        var _this = this;
        this.subModuleId.valueChanges.subscribe(function (m) {
            _this.getSubModuleEventList(m);
            // this.getBankList();
        });
    };
    WorkflowAddEditComponent.prototype.onSubModuleChangeevent = function () {
        var _this = this;
        if (this.targets.length >= 1 && this.targets.controls[0].get('type').value != '') {
            //alert('are you sure you want to change submodule');
            var message = "Are you sure you want to update the sub-module? If you change the sub-module, existing flow will be removed.";
            this.dialogService.confirm('Update SubModule ', message).subscribe(function (confirmed) {
                if (confirmed) {
                    while (_this.targets.length != 0) {
                        _this.targets.removeAt(0);
                    }
                }
                else {
                    _this.ruleEngineForm.get('subModuleId').setValue(_this.submoduleidform);
                }
            });
        }
        else {
            this.submoduleidform = this.ruleEngineForm.get('subModuleId').value;
        }
        console.log('submoduleidform', this.submoduleidform);
    };
    WorkflowAddEditComponent.prototype.onModuleChangeevent = function () {
        var _this = this;
        if (this.targets.length >= 1 && this.targets.controls[0].get('type').value != '') {
            //alert('are you sure you want to change submodule');
            var message = "Are you sure you want to update the module? If you change the module, existing flow will be removed.";
            this.dialogService.confirm('Update Module', message).subscribe(function (confirmed) {
                if (confirmed) {
                    while (_this.targets.length != 0) {
                        _this.targets.removeAt(0);
                        _this.ruleEngineForm.get('subModuleId').setValue(null);
                        _this.submoduleidform = null;
                    }
                }
                else {
                    _this.ruleEngineForm.get('moduleId').setValue(_this.moduleidform);
                }
            });
        }
        else {
            this.ruleEngineForm.get('subModuleId').setValue(null);
            this.submoduleidform = null;
            this.moduleidform = this.ruleEngineForm.get('moduleId').value;
        }
    };
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
    WorkflowAddEditComponent.prototype.addTarget = function () {
        console.log('targerts', this.targets.controls);
        this.targets.push(this.ruleEngineService.buildTarget());
        console.log('targerts', this.targets.controls);
        this.isDropdown = true;
    };
    WorkflowAddEditComponent.prototype.deleteTarget = function (targetIndex, e) {
        var _this = this;
        var message = "Are you sure you want to delete this \"" + e.type + "\"?";
        this.dialogService.confirm('Delete Step ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.targets.removeAt(targetIndex);
                _this.toaster.success("\"" + e.type + "\" has been deleted successfully");
            }
        });
    };
    WorkflowAddEditComponent.prototype.editEvent = function () {
        this.isEditEvent = !this.isEditEvent;
    };
    WorkflowAddEditComponent.prototype.getLoanProductList = function (bankIds) {
        var _this = this;
        this.ruleEngineService.getLoanProducts(bankIds).subscribe(function (m) {
            _this.loanProductList = m;
        });
    };
    WorkflowAddEditComponent.prototype.getSubModuleEventList = function (subModule) {
        var _this = this;
        console.log('subModule');
        if (!this.editFromVersion) {
            if (subModule) {
                if (this.resetTarget()) {
                    this.subModule = subModule;
                    this.ruleEngineService.getSubModuleEventList(subModule.sub_module_id).subscribe(function (m) {
                        _this.events.length = 1;
                    });
                }
                else {
                    //this.loanProductId.setValue(this.subModule.sub_module_id);
                }
            }
        }
    };
    WorkflowAddEditComponent.prototype.showAddTarget = function () {
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
    WorkflowAddEditComponent.prototype.resetTarget = function () {
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
    //prepareResult(cond, type) {
    //  console.log('cond', cond);
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
    WorkflowAddEditComponent.prototype.prepareTarget = function () {
        return this.targets.value.map(function (t, index) {
            console.log('targedtdatat', t);
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
                conditions: t.conditions.map(function (c, cIndex) {
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
                            fieldValue: (c.fieldValue != null && typeof c.fieldValue.value !== 'undefined' ? c.fieldValue.value : (c.fieldValue != null && typeof c.fieldValue.length != 'undefined' && c.operatorId.operator_display_name.includes('multiple') && c.fieldId.dt_code == 'select') ? c.fieldValue.map(function (m) { return ((c.fieldId.actual_data_type.includes('varchar') || c.fieldId.actual_data_type.includes('table')) ? "'" + m.value + "'" : "" + m.value); }).join() : c.fieldValue),
                            fieldSecondValue: c.fieldSecondValue,
                            closingBrackets: c.closingBrackets,
                            isTime: c.isTime,
                        };
                    }
                    else {
                        return null;
                    }
                }),
                decisions: t.decisions.map(function (c, cIndex) {
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
                            fieldValue: (c.fieldValue != null && typeof c.fieldValue.value !== 'undefined' ? c.fieldValue.value : (c.fieldValue != null && typeof c.fieldValue.length != 'undefined' && c.operatorId.operator_display_name.includes('multiple') && c.fieldId.dt_code == 'select') ? c.fieldValue.map(function (m) { return ((c.fieldId.actual_data_type.includes('varchar') || c.fieldId.actual_data_type.includes('table')) ? "'" + m.value + "'" : "" + m.value); }).join() : c.fieldValue),
                            fieldSecondValue: c.fieldSecondValue,
                            closingBrackets: c.closingBrackets,
                            isTime: c.isTime,
                        };
                    }
                    else {
                        return null;
                    }
                }),
                //results: this.prepareResult(t.results,t.type)
                results: t.results.map(function (rr, rrIndex) {
                    console.log('rrrrrr', rr);
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
                            whereClauseFields: rr.whereClauseFields.map(function (cc, ccIndex) {
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
                                        fieldValue: (cc.fieldValue != null && typeof cc.fieldValue.value !== 'undefined' ? cc.fieldValue.value : (cc.fieldValue != null && typeof cc.fieldValue.length != 'undefined' && cc.operatorId.operator_display_name.includes('multiple') && cc.fieldId.dt_code == 'select') ? cc.fieldValue.map(function (m) { return ((cc.fieldId.actual_data_type.includes('varchar') || cc.fieldId.actual_data_type.includes('table')) ? "'" + m.value + "'" : "" + m.value); }).join() : cc.fieldValue),
                                        fieldSecondValue: cc.fieldSecondValue,
                                        closingBrackets: cc.closingBrackets,
                                        isTime: cc.isTime,
                                    };
                                }
                                else {
                                    return null;
                                }
                            }),
                            tableFields: rr.tableFields.map(function (f, fIndex) {
                                return {
                                    DisplayOrder: fIndex,
                                    fieldId: (typeof f.fieldId === 'undefined' ? null : f.fieldId.form_field_id),
                                    name: f.name,
                                    dataType: f.dataType,
                                    fieldValue: (f.fieldValue != null && typeof f.fieldValue.value !== 'undefined' ? f.fieldValue.value : (f.fieldValue == null ? f.fieldDisplayValue : f.fieldValue)),
                                    fieldDisplayValue: f.fieldDisplayValue,
                                    isCalculate: f.isCalculate,
                                    resultCalculation: f.resultCalculation.map(function (rc, rcIndex) {
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
                                        };
                                    })
                                };
                            })
                        };
                    }
                }),
            };
        });
        this.editFromVersion = false;
    };
    //effective: string
    //effectiveto: string;
    WorkflowAddEditComponent.prototype.save = function () {
        var _this = this;
        var ab = this.ruleEngineForm.get('targets');
        console.log(this.ruleEngineForm);
        console.log(ab);
        console.log(this.ruleEngineForm.value);
        if (this.targets.length > 0) {
            if (this.ruleEngineForm.valid) {
                this.loadSave = true;
                this.appmodel.FlowId = this.ruleEngineForm.value.FlowId;
                this.appmodel.FlowName = this.ruleEngineForm.value.name;
                console.log(this.ruleEngineForm.value.loanProducts);
                // this.effective = this.ruleEngineForm.value.effectiveFrom;
                // this.effectiveto = this.ruleEngineForm.value.effectiveTo;
                var newTarget = this.prepareTarget();
                var newResultForm_1 = {
                    FlowId: this.ruleEngineForm.value.FlowId,
                    name: this.ruleEngineForm.value.name,
                    moduleId: this.ruleEngineForm.value.moduleId.value,
                    subModuleId: this.ruleEngineForm.value.subModuleId.sub_module_id,
                    banks: this.banks.value == null ? null : this.banks.value.map(function (m) { return m.value; }),
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
                console.log('rule form value: ', this.ruleEngineForm.value);
                console.log('new rule form: ', newResultForm_1);
                //return;
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
                                _this.router.navigateByUrl("/flow");
                            }
                            else {
                                _this.loadSave = false;
                                _this.toaster.error(result.responseMessage);
                            }
                        });
                    }
                });
            }
        }
        else {
            this.toaster.error('Please add atleast one step in flow ');
        }
    };
    WorkflowAddEditComponent.prototype.getBankList = function () {
        var _this = this;
        this.bankService.getBankDropdownList().subscribe(function (m) {
            _this.bankList = m;
        });
    };
    WorkflowAddEditComponent.prototype.refreshLA = function (listFor) {
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
    WorkflowAddEditComponent.prototype.searchLA = function (listFor) {
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
    WorkflowAddEditComponent.prototype.onChangeLA = function ($event, listFor) {
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
    WorkflowAddEditComponent.prototype.onSort = function ($event, listFor) {
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
    WorkflowAddEditComponent.prototype.setPageLA = function ($event, listFor) {
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
    WorkflowAddEditComponent.prototype.onActivate = function (event) {
    };
    WorkflowAddEditComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    WorkflowAddEditComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.selectedApplication.splice(0, this.selectedApplication.length);
        (_b = this.selectedApplication).push.apply(_b, selected);
    };
    WorkflowAddEditComponent.prototype.onSelectOldApplication = function (_a) {
        var _b;
        var selected = _a.selected;
        this.selectedOldApplication.splice(0, this.selectedOldApplication.length);
        (_b = this.selectedOldApplication).push.apply(_b, selected);
    };
    WorkflowAddEditComponent.prototype.makeSubmitButtonDisabled = function () {
        var _this = this;
        var index = this.ruleEngineVersionList.findIndex(function (element, index) {
            if (element.FlowId == _this.id) {
                return true;
            }
        });
        if (this.targets.length < 1) {
            return false;
        }
        if (index > 0) {
            this.isSubmitButtonDisabled = true;
        }
        else {
            this.isSubmitButtonDisabled = false;
        }
    };
    WorkflowAddEditComponent.prototype.ApplySelectedVersion = function () {
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
    WorkflowAddEditComponent.prototype.OpenLatestRuleOnOldApp = function () {
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
    WorkflowAddEditComponent.prototype.ApplyRuleOnOldApplication = function () {
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
    WorkflowAddEditComponent.prototype.closeOldApplicationPopup = function () {
        this.refreshLA("VERSION");
        this.applyLatestRuleOnOldApp.hide();
    };
    //targettypeddl(event) {
    //  console.log(event.target.value);
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
    WorkflowAddEditComponent.prototype.showConditionModal = function () {
        this.isDropdown = true;
    };
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
    WorkflowAddEditComponent.prototype.resultValidation = function (e) {
        debugger;
        this.deleteTarget(e.rowno, e);
    };
    WorkflowAddEditComponent.ctorParameters = function () { return [
        { type: _workflow_service__WEBPACK_IMPORTED_MODULE_12__["WorkflowService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_14__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: _bank_bank_service__WEBPACK_IMPORTED_MODULE_7__["BankService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resultcomponent', { static: false }),
        __metadata("design:type", _workflowmodels_work_flow_result_component__WEBPACK_IMPORTED_MODULE_9__["WorkFlowResultComponent"])
    ], WorkflowAddEditComponent.prototype, "resultcomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('decisioncomponent', { static: false }),
        __metadata("design:type", _workflowmodels_work_flow_descision_component__WEBPACK_IMPORTED_MODULE_10__["WorkFlowDescisionComponent"])
    ], WorkflowAddEditComponent.prototype, "decisioncomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('conditioncomponent', { static: false }),
        __metadata("design:type", _workflowmodels_work_flow_condition_component__WEBPACK_IMPORTED_MODULE_8__["WorkFlowConditionComponent"])
    ], WorkflowAddEditComponent.prototype, "conditioncomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('screencomponent', { static: false }),
        __metadata("design:type", _workflowmodels_screen_component__WEBPACK_IMPORTED_MODULE_11__["ScreenComponent"])
    ], WorkflowAddEditComponent.prototype, "screencomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ApplicationPopupForApplyLatestRule', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ModalDirective"])
    ], WorkflowAddEditComponent.prototype, "applyLatestRuleOnOldApp", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('condition', { static: false }),
        __metadata("design:type", _workflowmodels_work_flow_condition_component__WEBPACK_IMPORTED_MODULE_8__["WorkFlowConditionComponent"])
    ], WorkflowAddEditComponent.prototype, "conditionalmodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resultmodel', { static: false }),
        __metadata("design:type", _workflowmodels_work_flow_result_component__WEBPACK_IMPORTED_MODULE_9__["WorkFlowResultComponent"])
    ], WorkflowAddEditComponent.prototype, "resultmodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('targettype', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WorkflowAddEditComponent.prototype, "targettype", void 0);
    WorkflowAddEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-workflow-add-edit',
            template: __importDefault(__webpack_require__(/*! raw-loader!./workflow-add-edit.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflow-add-edit.component.html")).default,
            styles: ["\n      .list-group-item:first-child{\n        border-radius:0px;\n      }\n      .list-group-item:last-child{\n        border-radius:0px;\n      }\n"]
        }),
        __metadata("design:paramtypes", [_workflow_service__WEBPACK_IMPORTED_MODULE_12__["WorkflowService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_14__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _bank_bank_service__WEBPACK_IMPORTED_MODULE_7__["BankService"]])
    ], WorkflowAddEditComponent);
    return WorkflowAddEditComponent;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflow-routing.module.ts":
/*!************************************************************!*\
  !*** ./src/app/views/work-flow/workflow-routing.module.ts ***!
  \************************************************************/
/*! exports provided: WorkflowRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkflowRoutingModule", function() { return WorkflowRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _work_flow_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./work-flow.component */ "./src/app/views/work-flow/work-flow.component.ts");
/* harmony import */ var _workflow_add_edit_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workflow-add-edit.component */ "./src/app/views/work-flow/workflow-add-edit.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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
    { path: '', component: _work_flow_component__WEBPACK_IMPORTED_MODULE_1__["WorkFlowComponent"] },
    { path: 'add-flow', component: _workflow_add_edit_component__WEBPACK_IMPORTED_MODULE_2__["WorkflowAddEditComponent"] },
    {
        path: 'edit/:id', component: _workflow_add_edit_component__WEBPACK_IMPORTED_MODULE_2__["WorkflowAddEditComponent"]
    },
];
var WorkflowRoutingModule = /** @class */ (function () {
    function WorkflowRoutingModule() {
    }
    WorkflowRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
        })
    ], WorkflowRoutingModule);
    return WorkflowRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflow.module.ts":
/*!****************************************************!*\
  !*** ./src/app/views/work-flow/workflow.module.ts ***!
  \****************************************************/
/*! exports provided: WorkflowModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkflowModule", function() { return WorkflowModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _workflowmodels_work_flow_target_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workflowmodels/work-flow-target.component */ "./src/app/views/work-flow/workflowmodels/work-flow-target.component.ts");
/* harmony import */ var _workflowmodels_work_flow_result_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./workflowmodels/work-flow-result.component */ "./src/app/views/work-flow/workflowmodels/work-flow-result.component.ts");
/* harmony import */ var _workflowmodels_work_flow_result_calculation_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./workflowmodels/work-flow-result-calculation.component */ "./src/app/views/work-flow/workflowmodels/work-flow-result-calculation.component.ts");
/* harmony import */ var _workflowmodels_work_flow_condition_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./workflowmodels/work-flow-condition.component */ "./src/app/views/work-flow/workflowmodels/work-flow-condition.component.ts");
/* harmony import */ var _workflow_add_edit_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./workflow-add-edit.component */ "./src/app/views/work-flow/workflow-add-edit.component.ts");
/* harmony import */ var _work_flow_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./work-flow.component */ "./src/app/views/work-flow/work-flow.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _workflow_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./workflow-routing.module */ "./src/app/views/work-flow/workflow-routing.module.ts");
/* harmony import */ var _workflowmodels_work_flow_result_table_field_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./workflowmodels/work-flow-result-table-field.component */ "./src/app/views/work-flow/workflowmodels/work-flow-result-table-field.component.ts");
/* harmony import */ var _workflowmodels_screen_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./workflowmodels/screen.component */ "./src/app/views/work-flow/workflowmodels/screen.component.ts");
/* harmony import */ var _workflowmodels_work_flow_descision_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./workflowmodels/work-flow-descision.component */ "./src/app/views/work-flow/workflowmodels/work-flow-descision.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _workflowmodels_work_flow_delete_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./workflowmodels/work-flow-delete.component */ "./src/app/views/work-flow/workflowmodels/work-flow-delete.component.ts");
/* harmony import */ var _mappingpopup_mappingpopup_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./mappingpopup/mappingpopup.component */ "./src/app/views/work-flow/mappingpopup/mappingpopup.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



















var WorkflowModule = /** @class */ (function () {
    function WorkflowModule() {
    }
    WorkflowModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_work_flow_component__WEBPACK_IMPORTED_MODULE_7__["WorkFlowComponent"], _workflow_add_edit_component__WEBPACK_IMPORTED_MODULE_6__["WorkflowAddEditComponent"], _workflowmodels_work_flow_target_component__WEBPACK_IMPORTED_MODULE_2__["WorkFlowTargetComponent"], _workflowmodels_work_flow_result_component__WEBPACK_IMPORTED_MODULE_3__["WorkFlowResultComponent"], _workflowmodels_work_flow_result_calculation_component__WEBPACK_IMPORTED_MODULE_4__["WorkFlowResultCalculationComponent"], _workflowmodels_work_flow_condition_component__WEBPACK_IMPORTED_MODULE_5__["WorkFlowConditionComponent"], _workflowmodels_work_flow_result_table_field_component__WEBPACK_IMPORTED_MODULE_11__["WorkFlowResultTableFieldComponent"], _workflowmodels_screen_component__WEBPACK_IMPORTED_MODULE_12__["ScreenComponent"], _workflowmodels_work_flow_descision_component__WEBPACK_IMPORTED_MODULE_13__["WorkFlowDescisionComponent"], _workflowmodels_work_flow_delete_component__WEBPACK_IMPORTED_MODULE_17__["WorkFlowDeleteComponent"], _mappingpopup_mappingpopup_component__WEBPACK_IMPORTED_MODULE_18__["MappingpopupComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _workflow_routing_module__WEBPACK_IMPORTED_MODULE_10__["WorkflowRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_15__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_16__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__["ModalModule"]
            ]
        })
    ], WorkflowModule);
    return WorkflowModule;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflow.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/work-flow/workflow.service.ts ***!
  \*****************************************************/
/*! exports provided: WorkflowService, CheckFlowName, WorkFlow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkflowService", function() { return WorkflowService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckFlowName", function() { return CheckFlowName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkFlow", function() { return WorkFlow; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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





var WorkflowService = /** @class */ (function () {
    function WorkflowService(http, fb) {
        this.http = http;
        this.fb = fb;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
        this.loanProductUri = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl + "LoanProduct";
        this.moduleUri = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl + "Modules";
    }
    WorkflowService.prototype.getLoanProducts = function (bankIds) {
        return this.http.get(this.loanProductUri + "/GetLoanProducts?bankIds=" + bankIds);
    };
    WorkflowService.prototype.getSubModuleEventList = function (subModuleId) {
        return this.http.get(this.baseUri + "Workflow/GetSubModuleEventList?subModuleId=" + subModuleId);
    };
    WorkflowService.prototype.getSubModules = function (moduleId, screenids, isDecision) {
        return this.http.get(this.baseUri + "Workflow/GetSubModules?moduleId=" + moduleId + "&screenids=" + screenids + "&isDecision=" + isDecision);
    };
    WorkflowService.prototype.getRuleEngineVersionList = function (ruleId) {
        return this.http.get(this.baseUri + "Workflow/GetRuleEngineVersionList?ruleId=" + ruleId);
    };
    WorkflowService.prototype.getSubModuleFields = function (subModuleName) {
        return this.http.get(this.moduleUri + "/GetSubModuleFields?subModuleName=" + subModuleName);
    };
    WorkflowService.prototype.GetRuleTypeList = function () {
        return this.http.get(this.baseUri + "Workflow/GetRuleTypeList");
    };
    WorkflowService.prototype.GetCustomFieldsListBySubModuleId = function (subModuleId, screenid, isdecision) {
        return this.http.get(this.baseUri + "Workflow/GetCustomFieldBySubModuleId?subModuleId=" + subModuleId + "&screenid=" + screenid + "&isdecision=" + isdecision);
    };
    WorkflowService.prototype.checkNameExist = function (model) {
        return this.http.post(this.baseUri + "Workflow/CheckRuleNameExist", model);
    };
    WorkflowService.prototype.addUpdateRuleEngine = function (data) {
        return this.http.post(this.baseUri + "Workflow/AddUpdateRuleEngine", data);
    };
    WorkflowService.prototype.deleteFlow = function (id) {
        return this.http.get(this.baseUri + ("Workflow/DeleteRule?ruleId=" + id));
    };
    WorkflowService.prototype.changeStatus = function (id) {
        return this.http.post(this.baseUri + "Workflow/ChangeStatus/" + id, null);
    };
    WorkflowService.prototype.getDisplayOrder = function () {
        return this.http.get(this.baseUri + "Workflow/GetDisplayOrder");
    };
    WorkflowService.prototype.deleteRules = function (ruleIds) {
        return this.http.get(this.baseUri + ("Workflow/DeletedMultipleRules?ruleIds=" + ruleIds));
    };
    WorkflowService.prototype.GetCustomButtonDDLList = function (id, length, serchText) {
        return this.http.get(this.baseUri + "Workflow/GetCustomButtonDDL?id=" + id + "&length=" + length + "&serchText=" + serchText);
    };
    WorkflowService.prototype.getCustomButtonDetailByFlowId = function (id) {
        return this.http.get(this.baseUri + ("Workflow/GetCustomButtonDetailByFlowId?id=" + id));
    };
    WorkflowService.prototype.saveCustomButton = function (customButtonId, FlowId) {
        var model = {
            Id: customButtonId,
            FlowId: FlowId,
        };
        console.log('CustomButton', JSON.stringify(model));
        return this.http.post(this.baseUri + "Workflow/saveCustomButton", model);
    };
    WorkflowService.prototype.getLoanApplicationRuleList = function (loanApplicationId, eventCode) {
        return this.http.get(this.baseUri + ("Workflow/GetLoanApplicationRuleList?loanApplicationId=" + loanApplicationId + "&eventCode=" + eventCode));
    };
    WorkflowService.prototype.executeRuleEngineTarget = function (loanApplicationId, eventCode, connectionId) {
        var model = {
            loanApplicationId: loanApplicationId,
            eventCode: eventCode,
            connectionId: connectionId
        };
        console.log(model);
        return this.http.post(this.baseUri + "Workflow/ExecuteRuleEngineTarget", model);
    };
    WorkflowService.prototype.getScreenFormField = function (moduleId, subModuleId, formid) {
        return this.http.get(this.baseUri + "Workflow/getScreenFormField?moduleId=" + moduleId + "&subModuleId=" + subModuleId + "&formid=" + formid);
    };
    WorkflowService.prototype.GetScreenFormsList = function (name, sortColumn, sortDir, page, pageSize, submoduleid, usedSreenid) {
        var _this = this;
        return this.http.get(this.baseUri + "Workflow/GetScreenFormsList?name=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&submoduleid=" + submoduleid + "&usedSreenid=" + usedSreenid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    WorkflowService.prototype.buildType = function () {
        return this.fb.group({
            type: ['']
        });
    };
    WorkflowService.prototype.buidCondition = function (condition) {
        if (condition === void 0) { condition = null; }
        var conditiongroup = this.fb.group({
            conditionId: [null],
            relationWithParent: [null],
            openingBrackets: "(",
            subModuleId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            subModuleAlias: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fieldId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fields: [],
            operatorId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            operators: [],
            //    isCalculate: [{ value: false, disabled: true }],
            fieldSelectList: [],
            picklistOption: [],
            fieldValue: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fieldSecondValue: [null],
            closingBrackets: ")",
            isTime: [""],
            displayOrder: [0]
        });
        if (condition != null) {
            var fieldValue = null;
            var fieldSecondValue = null;
            if (typeof condition.fieldId !== 'undefined') {
                if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_expression != 'in') {
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
                if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldSecondValue; })[0];
                }
                else if (condition.fieldId.dt_code == 'date' && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = new Date(condition.fieldSecondValue);
                }
                else if (condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = condition.fieldSecondValue;
                }
            }
            conditiongroup.patchValue({
                conditionId: condition.conditionId,
                relationWithParent: (typeof condition.relationWithParent !== 'undefined' ? condition.relationWithParent : ''),
                openingBrackets: condition.openingBrackets,
                subModuleId: condition.subModuleId,
                subModuleAlias: ((typeof condition.subModuleAlias !== 'undefined' ? condition.subModuleAlias : '')),
                fieldId: (typeof condition.fieldId !== 'undefined' ? condition.fieldId : null),
                fields: condition.fields,
                fieldSelectList: (typeof condition.fieldId !== 'undefined' && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') ? JSON.parse(condition.fieldId.select_options) : []),
                picklistOption: [],
                operatorId: condition.operatorId,
                operators: condition.operators,
                // isCalculate: condition.isCalculated == 1 ? true : false,
                fieldValue: fieldValue,
                fieldSecondValue: fieldSecondValue,
                closingBrackets: condition.closingBrackets,
                isTime: condition.isTime,
            });
        }
        return conditiongroup;
    };
    WorkflowService.prototype.buidConditiondecision = function (condition) {
        if (condition === void 0) { condition = null; }
        var conditiongroup = this.fb.group({
            conditionId: [null],
            relationWithParent: ['', null],
            openingBrackets: "(",
            subModuleId: ['', null],
            subModuleAlias: ['', null],
            fieldId: ['', null],
            fields: [''],
            operatorId: ['', null],
            operators: [''],
            //    isCalculate: [{ value: false, disabled: true }],
            fieldSelectList: [''],
            picklistOption: [],
            fieldValue: ['', null],
            fieldSecondValue: ['', null],
            closingBrackets: ")",
            isTime: [""],
            displayOrder: [0]
        });
        if (condition != null) {
            var fieldValue = null;
            var fieldSecondValue = null;
            if (typeof condition.fieldId !== 'undefined') {
                if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_expression != 'in') {
                    fieldValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldValue; })[0];
                }
                else if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_display_name.includes('multiple')) {
                    var values_2 = condition.fieldValue.split(',').map(function (m) { return m.replace(/'/g, ''); });
                    fieldValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return values_2.includes(m.value); });
                }
                else if (condition.fieldId.dt_code == 'date') {
                    fieldValue = new Date(condition.fieldValue);
                }
                else {
                    fieldValue = condition.fieldValue;
                }
                if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldSecondValue; })[0];
                }
                else if (condition.fieldId.dt_code == 'date' && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = new Date(condition.fieldSecondValue);
                }
                else if (condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = condition.fieldSecondValue;
                }
            }
            conditiongroup.patchValue({
                conditionId: condition.conditionId,
                relationWithParent: (typeof condition.relationWithParent !== 'undefined' ? condition.relationWithParent : ''),
                openingBrackets: condition.openingBrackets,
                subModuleId: condition.subModuleId,
                subModuleAlias: ((typeof condition.subModuleAlias !== 'undefined' ? condition.subModuleAlias : '')),
                fieldId: (typeof condition.fieldId !== 'undefined' ? condition.fieldId : null),
                fields: condition.fields,
                fieldSelectList: (typeof condition.fieldId !== 'undefined' && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') ? JSON.parse(condition.fieldId.select_options) : []),
                picklistOption: [],
                operatorId: condition.operatorId,
                operators: condition.operators,
                // isCalculate: condition.isCalculated == 1 ? true : false,
                fieldValue: fieldValue,
                fieldSecondValue: fieldSecondValue,
                closingBrackets: condition.closingBrackets,
                isTime: condition.isTime,
            });
        }
        return conditiongroup;
    };
    WorkflowService.prototype.buidDecision = function (condition) {
        if (condition === void 0) { condition = null; }
        var conditiongroup = this.fb.group({
            conditionId: [null],
            relationWithParent: [null],
            openingBrackets: "(",
            subModuleId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            subModuleAlias: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fieldId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fields: [],
            operatorId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            operators: [],
            //    isCalculate: [{ value: false, disabled: true }],
            fieldSelectList: [],
            picklistOption: [],
            fieldValue: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fieldSecondValue: [null],
            closingBrackets: ")",
            isTime: [""],
            displayOrder: [0]
        });
        if (condition != null) {
            debugger;
            console.log('conditionconditioncondition', condition);
            var fieldValue = null;
            var fieldSecondValue = null;
            if (typeof condition.fieldId !== 'undefined') {
                if ((condition.operatorId.operator_display_name == "Is Null" || condition.operatorId.operator_display_name == "Is Not Null") && condition.fieldId.dt_code != 'date') {
                    // fieldValue = '';
                    conditiongroup.controls['fieldValue'].clearValidators();
                    conditiongroup.get('fieldValue').updateValueAndValidity();
                }
                else if (((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') || condition.fieldId.dt_code == 'radio') && condition.operatorId.operator_expression != 'in') {
                    fieldValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldValue; })[0];
                }
                else if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_display_name.includes('multiple')) {
                    var values_3 = condition.fieldValue.split(',').map(function (m) { return m.replace(/'/g, ''); });
                    fieldValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return values_3.includes(m.value); });
                }
                else if (condition.fieldId.dt_code == 'date') {
                    fieldValue = new Date(condition.fieldValue);
                }
                else {
                    fieldValue = condition.fieldValue;
                }
                //if (condition.operatorId.operator_display_name != "Is Null" || condition.operatorId.operator_display_name != "Is Not Null") {
                if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldSecondValue; })[0];
                }
                else if (condition.fieldId.dt_code == 'date' && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = new Date(condition.fieldSecondValue);
                }
                else if (condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = condition.fieldSecondValue;
                }
                // }
            }
            conditiongroup.patchValue({
                conditionId: condition.conditionId,
                relationWithParent: (typeof condition.relationWithParent !== 'undefined' ? condition.relationWithParent : ''),
                openingBrackets: condition.openingBrackets,
                subModuleId: condition.subModuleId,
                subModuleAlias: ((typeof condition.fieldId.table_alias !== 'undefined' ? condition.fieldId.table_alias : '')),
                // subModuleAlias: ((typeof condition.fieldId.table_alias !== 'undefined' ? condition.fieldId.table_alias: '')),
                fieldId: (typeof condition.fieldId !== 'undefined' ? condition.fieldId : null),
                fields: condition.fields,
                //fieldSelectList: (((typeof condition.fieldId !== 'undefined') || (condition.operatorId.operator_display_name != "Is Null" || condition.operatorId.operator_display_name != "Is Not Null")) && //(condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') ? JSON.parse(condition.fieldId.select_options) : []),
                fieldSelectList: (((typeof condition.fieldId !== 'undefined') && (condition.operatorId.operator_display_name == "Is Null" && condition.operatorId.operator_display_name == "Is Not Null")) && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') ? JSON.parse(condition.fieldId.select_options) : []),
                operatorId: condition.operatorId,
                operators: condition.operators,
                // isCalculate: condition.isCalculated == 1 ? true : false,
                fieldValue: fieldValue,
                fieldSecondValue: fieldSecondValue,
                closingBrackets: condition.closingBrackets,
                isTime: condition.isTime,
            });
        }
        console.log('conditiongroup', conditiongroup);
        return conditiongroup;
    };
    WorkflowService.prototype.buidDecisionCondition = function (condition) {
        if (condition === void 0) { condition = null; }
        var conditiongroup = this.fb.group({
            conditionId: [null],
            relationWithParent: ['', null],
            openingBrackets: "(",
            subModuleId: ['', null],
            subModuleAlias: ['', null],
            fieldId: ['', null],
            fields: [''],
            operatorId: ['', null],
            operators: [],
            //    isCalculate: [{ value: false, disabled: true }],
            fieldSelectList: [],
            fieldValue: ['', null],
            fieldSecondValue: ['', null],
            closingBrackets: ")",
            isTime: [""],
            displayOrder: [0]
        });
        if (condition != null) {
            var fieldValue = null;
            var fieldSecondValue = null;
            if (typeof condition.fieldId !== 'undefined') {
                if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_expression != 'in') {
                    fieldValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldValue; })[0];
                }
                else if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_display_name.includes('multiple')) {
                    var values_4 = condition.fieldValue.split(',').map(function (m) { return m.replace(/'/g, ''); });
                    fieldValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return values_4.includes(m.value); });
                }
                else if (condition.fieldId.dt_code == 'date') {
                    fieldValue = new Date(condition.fieldValue);
                }
                else {
                    fieldValue = condition.fieldValue;
                }
                if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldSecondValue; })[0];
                }
                else if (condition.fieldId.dt_code == 'date' && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = new Date(condition.fieldSecondValue);
                }
                else if (condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = condition.fieldSecondValue;
                }
            }
            conditiongroup.patchValue({
                conditionId: condition.conditionId,
                relationWithParent: (typeof condition.relationWithParent !== 'undefined' ? condition.relationWithParent : ''),
                openingBrackets: condition.openingBrackets,
                subModuleId: condition.subModuleId,
                subModuleAlias: ((typeof condition.subModuleAlias !== 'undefined' ? condition.subModuleAlias : '')),
                fieldId: (typeof condition.fieldId !== 'undefined' ? condition.fieldId : null),
                fields: condition.fields,
                fieldSelectList: (typeof condition.fieldId !== 'undefined' && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') ? JSON.parse(condition.fieldId.select_options) : []),
                operatorId: condition.operatorId,
                operators: condition.operators,
                // isCalculate: condition.isCalculated == 1 ? true : false,
                fieldValue: fieldValue,
                fieldSecondValue: fieldSecondValue,
                closingBrackets: condition.closingBrackets,
                isTime: condition.isTime,
            });
        }
        return conditiongroup;
    };
    WorkflowService.prototype.buidResult = function (result) {
        var _this = this;
        if (result === void 0) { result = null; }
        debugger;
        if (result == null) {
            return this.fb.group({
                resultId: [null],
                name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                action: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                actionId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                subModuleId: [null],
                fieldList: [null],
                resultCondition: [null],
                displayresultcondition: [''],
                databaseresultCondition: [''],
                tableFields: this.fb.array([this.buildResultTableField()]),
                whereClauseFields: this.fb.array([this.buidConditionResult()]),
                isEdit: [false]
            });
        }
        else {
            var resultGroup_1 = this.fb.group({
                resultId: [result.ruleTargetResultId],
                name: [result.name, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                action: [result.action, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                actionId: [result.actionId, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                subModuleId: [result.subModuleId],
                fieldList: [result.fields],
                resultCondition: [result.resultCondition],
                displayresultcondition: [result.displayresultcondition],
                databaseresultCondition: [result.databaseresultCondition],
                tableFields: this.fb.array([this.buildResultTableField()]),
                whereClauseFields: this.fb.array([this.buidConditionResult()]),
                isEdit: [true],
                displayOrder: [0]
            });
            debugger;
            if (result.action.code != 'validation') {
                resultGroup_1.get('subModuleId').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            }
            //while ((resultGroup.get('whereClauseFields') as FormArray).length != 0) {
            //  (resultGroup.get('whereClauseFields') as FormArray).removeAt(0);
            //}
            debugger;
            if (result.whereClauseFields) {
                result.whereClauseFields.forEach(function (m) {
                    console.log('mwhereClauseFields', m);
                    resultGroup_1.get('whereClauseFields').push(_this.buidConditionResult(m));
                });
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
            console.log('resultGroupresultGroup', resultGroup_1);
            return resultGroup_1;
        }
    };
    WorkflowService.prototype.buidConditionResult = function (condition) {
        if (condition === void 0) { condition = null; }
        var conditiongroup = this.fb.group({
            conditionId: [null],
            relationWithParent: [null],
            openingBrackets: "(",
            subModuleId: [null],
            subModuleAlias: [null],
            fieldId: [null],
            fields: [],
            operatorId: [null],
            operators: [],
            fieldSelectList: [],
            picklistOption: [],
            fieldSecondValue: [null],
            closingBrackets: ")",
            isTime: [""],
            displayOrder: [0],
            fieldValue: [null],
        });
        if (condition != null) {
            var fieldValue = null;
            var fieldSecondValue = null;
            if (typeof condition.fieldId !== 'undefined') {
                if ((condition.operatorId.operator_display_name == "Is Null" || condition.operatorId.operator_display_name == "Is Not Null") && condition.fieldId.dt_code != 'date') {
                    // fieldValue = '';
                    conditiongroup.controls['fieldValue'].clearValidators();
                    conditiongroup.get('fieldValue').updateValueAndValidity();
                }
                else if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_expression != 'in') {
                    fieldValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldValue; })[0];
                }
                else if (condition.fieldId.dt_code == 'select' && condition.operatorId.operator_display_name.includes('multiple')) {
                    var values_5 = condition.fieldValue.split(',').map(function (m) { return m.replace(/'/g, ''); });
                    fieldValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return values_5.includes(m.value); });
                }
                else if (condition.fieldId.dt_code == 'date') {
                    fieldValue = new Date(condition.fieldValue);
                }
                else {
                    fieldValue = condition.fieldValue;
                }
                if ((condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio' || condition.fieldId.dt_code == 'checkbox') && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = JSON.parse(condition.fieldId.select_options).filter(function (m) { return m.value === condition.fieldSecondValue; })[0];
                }
                else if (condition.fieldId.dt_code == 'date' && condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = new Date(condition.fieldSecondValue);
                }
                else if (condition.operatorId.operator_expression == 'between') {
                    fieldSecondValue = condition.fieldSecondValue;
                }
            }
            conditiongroup.patchValue({
                conditionId: condition.conditionId,
                relationWithParent: (typeof condition.relationWithParent !== 'undefined' ? condition.relationWithParent : ''),
                openingBrackets: condition.openingBrackets,
                subModuleId: condition.subModuleId,
                subModuleAlias: ((typeof condition.subModuleAlias !== 'undefined' ? condition.subModuleAlias : '')),
                fieldId: (typeof condition.fieldId !== 'undefined' ? condition.fieldId : null),
                fields: condition.fields,
                fieldSelectList: (((typeof condition.fieldId !== 'undefined') && (condition.operatorId.operator_display_name == "Is Null" && condition.operatorId.operator_display_name == "Is Not Null")) && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') ? JSON.parse(condition.fieldId.select_options) : []),
                //  fieldSelectList: (typeof condition.fieldId !== 'undefined' && (condition.fieldId.dt_code == 'select' || condition.fieldId.dt_code == 'radio') ? JSON.parse(condition.fieldId.select_options) : []),
                picklistOption: [],
                operatorId: condition.operatorId,
                operators: condition.operators,
                // isCalculate: condition.isCalculated == 1 ? true : false,
                fieldValue: fieldValue,
                fieldSecondValue: fieldSecondValue,
                closingBrackets: condition.closingBrackets,
                isTime: condition.isTime,
            });
        }
        return conditiongroup;
    };
    WorkflowService.prototype.buildResultTableField = function (tableField) {
        var _this = this;
        if (tableField === void 0) { tableField = null; }
        var tableFieldGroup = this.fb.group({
            RuleTargetResultConditionId: [null],
            RuleTargetId: [null],
            fieldId: [null],
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fieldSelectList: [],
            displayName: [null],
            dataType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            isCalculate: [{ value: false, disabled: true }],
            fieldDisplayValue: [null],
            fieldValue: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            showPopUpModal: [false],
            resultCalculation: this.fb.array([this.buildResultCalculation()])
        });
        if (tableField != null) {
            var fieldValue = null;
            if (tableField.fieldId) {
                if (tableField.fieldId.dt_code == 'select') {
                    fieldValue = JSON.parse(tableField.fieldId.select_options).filter(function (m) { return m.value === tableField.fieldValue; })[0];
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
            tableFieldGroup.patchValue({
                RuleTargetResultConditionId: (typeof tableField.ruleTargetResultConditionId !== 'undefined' ? tableField.ruleTargetResultConditionId : null),
                RuleTargetId: (typeof tableField.ruleTargetId !== 'undefined' ? tableField.ruleTargetId : null),
                fieldId: (typeof tableField.fieldId !== 'undefined' ? tableField.fieldId : tableField),
                name: (typeof tableField.name !== 'undefined' ? tableField.name : ''),
                fieldSelectList: ((typeof tableField.fieldId !== 'undefined' && tableField.fieldId.dt_code == 'select') ? JSON.parse(tableField.fieldId.select_options) : []),
                displayName: (typeof tableField.label !== 'undefined' ? tableField.label : ''),
                dataType: (typeof tableField.dataType !== 'undefined' ? tableField.dataType : typeof tableField.actual_data_type !== 'undefined' ? tableField.actual_data_type : ''),
                isCalculate: tableField.isCalculated == 1 ? true : false,
                fieldValue: fieldValue,
                fieldDisplayValue: (typeof tableField.fieldDisplayValue !== 'undefined' ? tableField.fieldDisplayValue : null)
            });
            if (tableField.isCalculated == 1) {
                tableFieldGroup.get('isCalculate').enable();
            }
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
    WorkflowService.prototype.buildResultCalculation = function (resultCalculate) {
        if (resultCalculate === void 0) { resultCalculate = null; }
        var resultCalculation = this.fb.group({
            ruleTargetResultConditionCalculationID: [''],
            flowId: [null],
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
                flowId: resultCalculate.flowId,
                ruleTargetId: resultCalculate.ruleTargetId,
                ruleTargetResultId: resultCalculate.ruleTargetResultId,
                formulaId: (typeof resultCalculate.formulaId !== 'undefined' ? resultCalculate.formulaId : null),
                ruleTargetResultConditionId: resultCalculate.ruleTargetResultConditionId,
                openingBrackets: resultCalculate.openingBrackets,
                firstFieldSectionId: (typeof resultCalculate.firstFieldSectionId === 'undefined' ? null : resultCalculate.firstFieldSectionId),
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
    WorkflowService.prototype.buildTarget = function (target, type) {
        var _this = this;
        if (target === void 0) { target = null; }
        if (type === void 0) { type = null; }
        if (target == null && type == null) {
            return this.fb.group({
                targetId: [''],
                addButton: false,
                isConditionAdded: false,
                isResultDecisionAdded: false,
                isDecisionScreenAdded: false,
                isDecisionAdded: [false],
                ScreenId: [''],
                ScreenName: [''],
                isScreenAdded: [false],
                type: [''],
                conditions: this.fb.array([this.buidCondition()]),
                decisions: this.fb.array([this.buidDecisionCondition()]),
                targetCondition: this.fb.group({
                    targetId: [''],
                    flowId: [''],
                    statusId: 1001,
                    displayCondition: [''],
                    database_condition: [''],
                    rowId: ['']
                }),
                targetDecision: this.fb.group({
                    targetId: [''],
                    flowId: [''],
                    statusId: 1001,
                    screenDecisionId: [''],
                    displayCondition: [''],
                    database_condition: [''],
                    rowId: ['']
                }),
                isResultAdded: [false],
                results: this.fb.array([]),
                displayOrder: [0]
            });
        }
        else if (target == null && type == 'decision') {
            return this.fb.group({
                targetId: [''],
                addButton: false,
                isConditionAdded: false,
                isResultDecisionAdded: false,
                isDecisionScreenAdded: false,
                isDecisionAdded: [false],
                ScreenId: [''],
                ScreenName: [''],
                isScreenAdded: [false],
                type: [''],
                // ddlStepDropdown:[null],
                conditions: this.fb.array([this.buidConditiondecision()]),
                decisions: this.fb.array([this.buidDecision()]),
                targetCondition: this.fb.group({
                    targetId: [''],
                    flowId: [''],
                    statusId: 1001,
                    displayCondition: [''],
                    database_condition: [''],
                    rowId: ['']
                }),
                targetDecision: this.fb.group({
                    targetId: [''],
                    flowId: [''],
                    screenDecisionId: [''],
                    statusId: 1001,
                    displayCondition: [''],
                    database_condition: [''],
                    rowId: ['']
                }),
                //decisiontargets: this.fb.array([this.buildTarget()]),
                isResultAdded: [false],
                results: this.fb.array([]),
                displayOrder: [0]
            });
        }
        else if (target == null && type == 'screen') {
            return this.fb.group({
                targetId: [''],
                addButton: false,
                isConditionAdded: false,
                isResultDecisionAdded: false,
                isDecisionScreenAdded: false,
                isDecisionAdded: [false],
                ScreenId: [''],
                ScreenName: [''],
                isScreenAdded: [false],
                type: [''],
                conditions: this.fb.array([this.buidConditiondecision()]),
                decisions: this.fb.array([this.buidDecisionCondition()]),
                targetCondition: this.fb.group({
                    targetId: [''],
                    flowId: [''],
                    statusId: 1001,
                    displayCondition: [''],
                    database_condition: [''],
                    rowId: ['']
                }),
                targetDecision: this.fb.group({
                    targetId: [''],
                    flowId: [''],
                    statusId: 1001,
                    screenDecisionId: [''],
                    displayCondition: [''],
                    database_condition: [''],
                    rowId: ['']
                }),
                isResultAdded: [false],
                results: this.fb.array([null]),
                displayOrder: [0]
            });
        }
        else if (target != null && type == 'Screen') {
            var targetGroup = this.fb.group({
                addButton: true,
                targetId: [target.targetId],
                isConditionAdded: false,
                isResultDecisionAdded: false,
                isDecisionScreenAdded: false,
                isDecisionAdded: [false],
                type: [target.type],
                ScreenId: [target.ScreenId],
                ScreenName: [target.ScreenName],
                isScreenAdded: [true],
                conditions: this.fb.array([this.buidConditiondecision()]),
                decisions: this.fb.array([this.buidDecisionCondition()]),
                targetCondition: this.fb.group({
                    targetId: [''],
                    flowId: [''],
                    statusId: 1001,
                    displayCondition: [''],
                    database_condition: [''],
                    rowId: ['']
                }),
                isResultAdded: true,
                results: this.fb.array([]),
                displayOrder: [0]
            });
            return targetGroup;
        }
        else if (target != null && type == 'decision') {
            var targetGroup_1 = this.fb.group({
                targetId: target.targetId,
                addButton: true,
                isConditionAdded: false,
                isResultDecisionAdded: false,
                isDecisionScreenAdded: false,
                isDecisionAdded: [true],
                type: [target.type],
                ScreenId: [target.ScreenId],
                ScreenName: [target.ScreenName],
                isScreenAdded: [false],
                //ddlStepDropdown: [null],
                conditions: this.fb.array([this.buidConditiondecision()]),
                decisions: this.fb.array([this.buidDecision()]),
                targetCondition: this.fb.group({
                    targetId: [target.targetId],
                    flowId: [target.flowId],
                    statusId: 1001,
                    displayCondition: [target.displayCondition],
                    database_condition: [target.databaseCondition],
                    rowId: [target.rowId]
                }),
                targetDecision: this.fb.group({
                    targetId: [target.targetId],
                    flowId: [target.flowId],
                    screenDecisionId: [target.screenDecisionId],
                    statusId: 1001,
                    displayCondition: [target.displayDecision],
                    database_condition: [target.databaseDecision],
                    rowId: [target.rowId]
                }),
                //decisiontargets: this.fb.array([this.buildTarget()]),
                isResultAdded: [true],
                results: this.fb.array([]),
                displayOrder: [0]
            });
            //prepare condtion data
            var control = targetGroup_1.get('targetCondition');
            console.log('cond control', control);
            var sb = control.get('displayCondition').value;
            if (sb != null && sb != null && sb != undefined) {
                while (targetGroup_1.get('conditions').length != 0) {
                    targetGroup_1.get('conditions').removeAt(0);
                }
                target.conditions.forEach(function (m) {
                    targetGroup_1.get('conditions').push(_this.buidCondition(m));
                });
            }
            while (targetGroup_1.get('decisions').length != 0) {
                targetGroup_1.get('decisions').removeAt(0);
            }
            target.Decisions.forEach(function (m) {
                targetGroup_1.get('decisions').push(_this.buidDecision(m));
            });
            while (targetGroup_1.get('results').length != 0) {
                targetGroup_1.get('results').removeAt(0);
            }
            if (typeof target.results != 'undefined') {
                target.results.forEach(function (m) {
                    targetGroup_1.get('results').push(_this.buidResult(m));
                });
            }
            console.log(type, 'targetGroup', targetGroup_1);
            return targetGroup_1;
        }
        else {
            var targetGroup_2 = this.fb.group({
                addButton: true,
                targetId: [target.targetId],
                isConditionAdded: true,
                isDecisionAdded: [false],
                isResultDecisionAdded: false,
                isDecisionScreenAdded: false,
                type: [target.type],
                ScreenId: [target.ScreenId],
                ScreenName: [target.ScreenName],
                isScreenAdded: [false],
                conditions: this.fb.array([this.buidCondition()]),
                decisions: this.fb.array([this.buidDecisionCondition()]),
                targetCondition: this.fb.group({
                    targetId: [target.targetId],
                    flowId: [target.flowId],
                    statusId: 1001,
                    displayCondition: [target.displayCondition],
                    database_condition: [target.databaseCondition],
                    rowId: [target.rowId]
                }),
                isResultAdded: true,
                results: this.fb.array([]),
                displayOrder: [0]
            });
            //prepare condtion data
            while (targetGroup_2.get('conditions').length != 0) {
                targetGroup_2.get('conditions').removeAt(0);
            }
            target.conditions.forEach(function (m) {
                targetGroup_2.get('conditions').push(_this.buidCondition(m));
            });
            //while ((targetGroup.get('decisions') as FormArray).length != 0) {
            //  (targetGroup.get('decisions') as FormArray).removeAt(0);
            //}
            //target.conditions.forEach((m: any) => {
            //  (targetGroup.get('conditions') as FormArray).push(this.buidCondition(m));
            //});
            //prepare result data
            while (targetGroup_2.get('results').length != 0) {
                targetGroup_2.get('results').removeAt(0);
            }
            if (typeof target.results != 'undefined') {
                target.results.forEach(function (m) {
                    targetGroup_2.get('results').push(_this.buidResult(m));
                });
            }
            return targetGroup_2;
        }
    };
    WorkflowService.prototype.getRuleList = function (name, loanproduct, sortColumn, sortDir, page, pageSize) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "Workflow/GetRuleList?name=" + name + "&loanproduct=" + loanproduct + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    WorkflowService.prototype.getRuleSummaryList = function (name, sortColumn, sortDir, page, pageSize) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "Workflow/GetRuleSummaryList?name=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    WorkflowService.prototype.getLoanApplicationListForApplyRule = function (name, sortColumn, sortDir, page, pageSize, userId, batchId, ruleId, listFor) {
        //if (typeof name == "undefined" || name == null) { name = null; }
        //else { name = encodeURIComponent((name)); }
        return this.http.get(this.baseUri + "Workflow/GetLoanApplicationListForApplyRule?nameSearch=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&ruleId=" + ruleId + "&listFor=" + listFor);
    };
    WorkflowService.prototype.GetRuleEngineDetail = function (id) {
        return this.http.get(this.baseUri + "Workflow/GetRuleDetailById?ruleId=" + id);
    };
    WorkflowService.prototype.ApplyRuleVersion = function (id, ApplicationIds) {
        var model = {
            RuleId: id,
            ApplicationIds: ApplicationIds
        };
        console.log(model);
        return this.http.post(this.baseUri + "Workflow/ApplyRuleVersionToApplication", model);
    };
    WorkflowService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }
    ]; };
    WorkflowService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], WorkflowService);
    return WorkflowService;
}());

var CheckFlowName = /** @class */ (function () {
    function CheckFlowName() {
    }
    return CheckFlowName;
}());

var WorkFlow = /** @class */ (function () {
    function WorkFlow() {
    }
    return WorkFlow;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/screen.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/screen.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmstZmxvdy93b3JrZmxvd21vZGVscy9zY3JlZW4uY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/screen.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/screen.component.ts ***!
  \********************************************************************/
/*! exports provided: ScreenComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenComponent", function() { return ScreenComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _workflow_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../workflow.service */ "./src/app/views/work-flow/workflow.service.ts");
/* harmony import */ var _shared_welcomescreen_welcomescreenadd_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/welcomescreen/welcomescreenadd.component */ "./src/app/views/shared/welcomescreen/welcomescreenadd.component.ts");
/* harmony import */ var _shared_welcomescreen_welcomescreen_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/welcomescreen/welcomescreen.component */ "./src/app/views/shared/welcomescreen/welcomescreen.component.ts");
/* harmony import */ var _manageform_form_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../manageform/form.service */ "./src/app/views/manageform/form.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
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











var ScreenComponent = /** @class */ (function () {
    function ScreenComponent(ruleEngineService, fb, router, toaster, dialogService, route, commonService, formService) {
        this.ruleEngineService = ruleEngineService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.route = route;
        this.commonService = commonService;
        this.formService = formService;
        this.SelectedValue = [];
        // @Input() resulttype: string;
        this.buttonState = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.stepdll = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.getIndexNo = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.showbutton = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.screenname = '';
        this.formControlList = [];
        this.checkboxdata1 = [];
        this.sortDir = 'desc';
        this.sortColumn = 'created_date';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.currentPage = 1;
        this.pageSizeValue = 10;
        this.screencount = 0;
        this.screenIdNotShow = [];
        this.editpopup = false;
        this.isDecision = false;
    }
    ScreenComponent.prototype.ngOnChanges = function () {
        this.initForm();
        if ((this.target.get('isScreenAdded').value) || ((this.target.get('isDecisionScreenAdded').value) && this.target.get('isDecisionAdded').value)) {
            this.prepareEditScreenForm();
        }
    };
    ScreenComponent.prototype.ngOnInit = function () {
        this.editpopup = false;
        //this.GetScreenFormsList();
    };
    //getScreenFormField() {
    //  this.ruleEngineService.getScreenFormField(4, 11, 0).subscribe((result: any) => {
    //    this.screendata = result;
    //    console.log('screendata', this.screendata);
    //  })
    //}
    ScreenComponent.prototype.initForm = function () {
        this.targetForm = this.ruleEngineService.buildTarget(null, 'screen');
        this.getModuleddl();
    };
    ScreenComponent.prototype.getModuleddl = function () {
        var _this = this;
        this.formService.getModuleList().subscribe(function (result) {
            if (result) {
                console.log('result', result);
                ;
                var _result = JSON.parse(result);
                _this.modulelist = _result.module;
                console.log('this.modulelist', _this.modulelist);
            }
        });
    };
    ScreenComponent.prototype.getScreenFormField = function (row) {
        var _this = this;
        this.ruleEngineService.getScreenFormField(this.moduleid, this.submoduleid, row.form_master_id).subscribe(function (result) {
            console.log('result', result);
            _this.screenid = row.form_master_id;
            _this.screenName = row.name;
            if (result != null) {
                _this.screendata = result.data;
                console.log('screendata', _this.screendata);
                _this.screenListmodel.hide();
                _this.screenmodel.show();
                _this.screenname = _this.screendata[0].name;
                console.log('screenname', _this.screenname);
                var group_1 = {};
                data_type_name: Text;
                _this.screendata.forEach(function (cnt) {
                    var val = null;
                    if (cnt.field_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    else {
                        val = (cnt.value == '' ? null : cnt.value);
                    }
                    _this.checkboxdata1.forEach(function (item) { if (cnt.form_controlName == item.controlname) {
                        item.controlvalues = cnt.value;
                    } }); //for checkboxes on form
                    if (cnt.field_type == 'checkbox') {
                        try {
                            _this.checkboxdata1.forEach(function (item) {
                                //console.log(item.controlname, item.controlvalues);
                                _this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                            });
                        }
                        catch (err) { }
                    }
                    // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.field_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.field_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.field_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
            }
            else {
                alert('this screen have no fields');
            }
            //console.log("validationFROM", this.form);
            //this.loadSave = false;
        });
    };
    ScreenComponent.prototype.getId = function () {
        var _this = this;
        var control = this.ruleEngineForm.get('targets');
        control.controls.forEach(function (m) {
            if (m.value['ScreenId'] != '' && m.value['ScreenId'] != 0 && m.value['ScreenId'] != undefined)
                _this.screenIdNotShow.push({ Id: m.value['ScreenId'] });
            // alert(m.controls['ScreenId'].value);
        });
    };
    //GetScreenFormsList() {
    //  this.getId();
    //  let usedSreenid: string;
    //  usedSreenid = this.screenIdNotShow.map(x => x.Id).join(",");
    //  //alert(this.ruleEngineForm.value.SubModuleId);
    // //console.log('ruleEngineFormruleEngineFormruleEngineFormruleEngineForm', this.ruleEngineForm.value.moduleId);
    //  this.submoduleid = this.ruleEngineForm.value.subModuleId.sub_module_id;
    //  this.moduleid = this.ruleEngineForm.value.moduleId.value;
    //  this.ruleEngineService.GetScreenFormsList('', this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.submoduleid, usedSreenid).subscribe((result: any) => {
    //    this.pagedData = this.ruleEngineService.pagedData;
    //    console.log('pagedData', this.pagedData)
    //    this.datalentgh = this.pagedData.data.length;
    //    this.screencount = this.ruleEngineService.pagedData.pager.totalItems;
    //    this.offset = this.currentPage;
    //  })
    //}
    //setPage($event) {
    //  this.currentPage = $event.page;
    //  this.GetScreenFormsList();
    //  // this.currentPageNotes = $event.page;
    //}
    //onSort($event) {
    //  const sort = $event.sorts[0]
    //  this.sortDir = sort.dir;
    //  this.sortColumn = sort.prop;
    //  this.currentPage = 1;
    //  //this.loadSave = true;
    //  this.GetScreenFormsList();
    //}
    //setPageNo($event) {
    //  this.currentPage = $event.page;
    //  this.GetScreenFormsList();
    //}
    //hidescreenListmodel() {
    //  this.screenListmodel.hide();
    //  this.targetForm.get('addButton').setValue(false);
    //}
    ScreenComponent.prototype.hidescreenmodel = function () {
        this.screenmodel.hide();
    };
    Object.defineProperty(ScreenComponent.prototype, "conditions", {
        //}
        //AddScreen() {
        //  this.editpopup = false;
        //  this.screenListmodel.show();
        //}
        get: function () {
            return this.targetForm.get('conditions');
        },
        enumerable: true,
        configurable: true
    });
    ScreenComponent.prototype.TargetConditions = function (index) {
        return this.ruleEngineForm.get('targets').at(index).get('conditions');
    };
    ScreenComponent.prototype.saveScreen = function () {
        var _this = this;
        if (!this.isDecision) {
            this.targetForm.get('isScreenAdded').setValue(true);
            this.targetForm.get('ScreenId').setValue(this.screenid);
            this.targetForm.get('type').setValue('Screen');
            //this.targetForm.get('ScreenName').setValue(this.screenName);
            this.targetForm.get('isResultAdded').setValue(true);
            this.targetForm.get('isConditionAdded').setValue(false);
            // this.resulttype = 'Screen';
            this.buttonState.emit();
            this.ruleEngineForm.get('targets').at(this.rowNo).patchValue({
                ScreenId: this.targetForm.value.ScreenId,
                isScreenAdded: this.targetForm.value.isScreenAdded,
                type: this.targetForm.value.type,
                targetId: this.targetForm.value.targetId,
                isConditionAdded: this.targetForm.value.isConditionAdded,
                targetCondition: this.targetForm.value.targetCondition,
                isResultAdded: this.targetForm.value.isResultAdded,
                ScreenName: this.targetForm.value.ScreenName,
                results: this.targetForm.value.results
            });
        }
        else {
            this.targetForm.get('isScreenAdded').setValue(true);
            this.targetForm.get('ScreenId').setValue(this.screenid);
            //this.targetForm.get('ScreenName').setValue(this.screenName);
            this.targetForm.get('isResultAdded').setValue(true);
            this.targetForm.get('isDecisionScreenAdded').setValue(true);
            this.targetForm.get('isConditionAdded').setValue(false);
            this.showbutton.emit(123456);
            this.ruleEngineForm.get('targets').at(this.rowNo).patchValue({
                ScreenId: this.targetForm.value.ScreenId,
                isScreenAdded: this.targetForm.value.isScreenAdded,
                targetId: this.targetForm.value.targetId,
                isConditionAdded: this.targetForm.value.isConditionAdded,
                targetCondition: this.targetForm.value.targetCondition,
                isResultAdded: this.targetForm.value.isResultAdded,
                ScreenName: this.targetForm.value.ScreenName,
            });
        }
        console.log(this.targetForm.value.targetCondition);
        while (this.TargetConditions(this.rowNo).length != 0) {
            this.TargetConditions(this.rowNo).removeAt(0);
        }
        this.conditions.controls.forEach(function (m) {
            _this.TargetConditions(_this.rowNo).push(m);
        });
        console.log('testscreen', this.ruleEngineForm.get('targets').at(this.rowNo));
        //if (!this.isDecision) {
        //  this.stepdll.emit(this.rowNo);
        //}
        this.screenmodel.hide();
        this.screenListmodel.hide();
    };
    Object.defineProperty(ScreenComponent.prototype, "targets", {
        get: function () {
            return this.ruleEngineForm.get('targets');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScreenComponent.prototype, "results", {
        get: function () {
            return this.target.get('results');
        },
        enumerable: true,
        configurable: true
    });
    ScreenComponent.prototype.prepareEditScreenForm = function () {
        var editTargetForm = this.targets.at(this.rowNo);
        console.log('editTargetFormscreen: ', editTargetForm);
        this.screenname = editTargetForm.value.ScreenName;
        this.screenid = editTargetForm.value.ScreenId;
        this.targetForm.patchValue({
            type: editTargetForm.value.type,
            ScreenId: editTargetForm.value.ScreenId,
            isScreenAdded: editTargetForm.value.isScreenAdded,
            ScreenName: editTargetForm.value.ScreenName,
            targetId: editTargetForm.value.targetId,
            isConditionAdded: editTargetForm.value.isConditionAdded,
            targetCondition: editTargetForm.value.targetCondition,
            isResultAdded: editTargetForm.value.isResultAdded,
            isDecisionScreenAdded: editTargetForm.value.isDecisionScreenAdded,
        });
    };
    ScreenComponent.prototype.deletetarget = function (id) {
        var _this = this;
        var message = "Are you sure you want to delete this screen?";
        this.dialogService.confirm('Delete Screen', message).subscribe(function (confirmed) {
            if (confirmed) {
                var submodulecode = _this.ruleEngineForm.value.subModuleId.module_name_code;
                _this.moduleid = _this.ruleEngineForm.value.moduleId.value;
                // let submodulecode = this.ruleEngineForm.value.subModuleId.module_name_code;
                var modulecode = _this.modulelist.filter(function (m) { return m.module_id == _this.moduleid; })[0].module_code.toLowerCase();
                _this.targets.removeAt(_this.rowNo);
                _this.formService.deleteForm(modulecode, submodulecode, id).subscribe(function (result) {
                    _this.toaster.success("Screen has been deleted successfully.");
                });
            }
        });
    };
    ScreenComponent.prototype.openeditpopup = function (id) {
        //alert(id);
        //this.editpopup = true;
        var _this = this;
        this.submoduleid = this.ruleEngineForm.value.subModuleId.sub_module_id;
        var submodulecode = this.ruleEngineForm.value.subModuleId.module_name_code;
        this.moduleid = this.ruleEngineForm.value.moduleId.value;
        var modulecode = this.modulelist.filter(function (m) { return m.module_id == _this.moduleid; })[0].module_code.toLowerCase();
        console.log('submodulecode', submodulecode);
        console.log('modulecode', modulecode);
        this.welcomecomponent.show(modulecode, submodulecode, id);
        //this.ruleEngineService.getScreenFormField(this.moduleid, this.submoduleid, id).subscribe((result: any) => {
        //  console.log('result', result);
        //  if (result != null) {
        //    this.screendata = result.data;
        //    console.log('screendata', this.screendata);
        //    this.screenListmodel.hide();
        //    this.screenmodel.show();
        //    this.screenname = this.screendata[0].name;
        //    console.log('screenname', this.screenname);
        //    const group: any = {};
        //    data_type_name: Text
        //    this.screendata.forEach(cnt => {
        //      let val = null;
        //      if (cnt.field_type == 'bit') {
        //        val = cnt.value == 1 ? true : false;
        //      } else {
        //        val = (cnt.value == '' ? null : cnt.value);
        //      }
        //      this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
        //      if (cnt.field_type == 'checkbox') {
        //        try {
        //          this.checkboxdata1.forEach((item) => {
        //            //console.log(item.controlname, item.controlvalues);
        //            this.form.get(item.controlname).setValue(item.controlvalues.split(','));
        //          });
        //        }
        //        catch (err) { }
        //      }
        //      // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
        //      group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
        //      cnt.field_type == "int" ? Validators.pattern("[0-9]{1,9}") :
        //        cnt.field_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
        //          cnt.field_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
        //            Validators.nullValidator
        //      ])
        //    });
        //    this.form = new FormGroup(group);
        //  }
        //  else {
        //    alert('this screen have no fields')
        //  }
        //})
    };
    ScreenComponent.prototype.addNewScreen = function (dec) {
        debugger;
        this.isDecision = dec;
        this.submoduleid = this.ruleEngineForm.value.subModuleId.sub_module_id;
        // let submodulecode = this.ruleEngineForm.value.subModuleId.module_name_code;
        this.moduleid = this.ruleEngineForm.value.moduleId.value;
        //let modulecode = (this.modulelist.filter(m => m.module_id == this.moduleid)[0].module_code as string).toLowerCase();
        this.screenadd.showpopup(this.moduleid, this.submoduleid);
        this.screenListmodel.hide();
    };
    ScreenComponent.prototype.getformid = function (id) {
        this.screenid = id;
        this.saveScreen();
    };
    ScreenComponent.prototype.getformname = function (name) {
        this.targetForm.get('ScreenName').setValue(name);
        //this.screenname = name;
    };
    ScreenComponent.prototype.deletetargetDecision = function (id) {
        var _this = this;
        debugger;
        var message = "Are you sure you want to delete this screen?";
        this.dialogService.confirm('Delete Screen', message).subscribe(function (confirmed) {
            if (confirmed) {
                var submodulecode = _this.ruleEngineForm.value.subModuleId.module_name_code;
                _this.moduleid = _this.ruleEngineForm.value.moduleId.value;
                // let submodulecode = this.ruleEngineForm.value.subModuleId.module_name_code;
                console.log();
                var modulecode = _this.modulelist.filter(function (m) { return m.module_id == _this.moduleid; })[0].module_code.toLowerCase();
                _this.targetForm.get('isScreenAdded').setValue(false);
                _this.targetForm.get('ScreenId').setValue(0);
                _this.targetForm.get('isDecisionScreenAdded').setValue(false);
                _this.ruleEngineForm.get('targets').at(_this.rowNo).patchValue({
                    ScreenId: _this.targetForm.value.ScreenId,
                    isScreenAdded: _this.targetForm.value.isScreenAdded,
                    ScreenName: _this.targetForm.value.ScreenName,
                });
                _this.showbutton.emit(_this.rowNo);
                _this.formService.deleteForm(modulecode, submodulecode, id).subscribe(function (result) {
                    _this.toaster.success("Screen has been deleted successfully.");
                });
            }
        });
    };
    ScreenComponent.ctorParameters = function () { return [
        { type: _workflow_service__WEBPACK_IMPORTED_MODULE_6__["WorkflowService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_10__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _manageform_form_service__WEBPACK_IMPORTED_MODULE_9__["FormService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ScreenComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('screenadd', { static: false }),
        __metadata("design:type", _shared_welcomescreen_welcomescreenadd_component__WEBPACK_IMPORTED_MODULE_7__["WelcomescreenaddComponent"])
    ], ScreenComponent.prototype, "screenadd", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('welcomecomponent', { static: false }),
        __metadata("design:type", _shared_welcomescreen_welcomescreen_component__WEBPACK_IMPORTED_MODULE_8__["WelcomescreenComponent"])
    ], ScreenComponent.prototype, "welcomecomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], ScreenComponent.prototype, "ruleEngineForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], ScreenComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ScreenComponent.prototype, "rowNo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], ScreenComponent.prototype, "typescreen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ScreenComponent.prototype, "productId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ScreenComponent.prototype, "buttonState", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ScreenComponent.prototype, "stepdll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ScreenComponent.prototype, "getIndexNo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ScreenComponent.prototype, "showbutton", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('screenmodel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalDirective"])
    ], ScreenComponent.prototype, "screenmodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('screenListmodel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalDirective"])
    ], ScreenComponent.prototype, "screenListmodel", void 0);
    ScreenComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-screen',
            template: __importDefault(__webpack_require__(/*! raw-loader!./screen.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/screen.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./screen.component.scss */ "./src/app/views/work-flow/workflowmodels/screen.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_workflow_service__WEBPACK_IMPORTED_MODULE_6__["WorkflowService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_10__["ConfirmationDialogService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _manageform_form_service__WEBPACK_IMPORTED_MODULE_9__["FormService"]])
    ], ScreenComponent);
    return ScreenComponent;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-condition.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-condition.component.scss ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmstZmxvdy93b3JrZmxvd21vZGVscy93b3JrLWZsb3ctY29uZGl0aW9uLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-condition.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-condition.component.ts ***!
  \*********************************************************************************/
/*! exports provided: WorkFlowConditionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkFlowConditionComponent", function() { return WorkFlowConditionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _work_flow_result_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./work-flow-result.component */ "./src/app/views/work-flow/workflowmodels/work-flow-result.component.ts");
/* harmony import */ var _workflow_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../workflow.service */ "./src/app/views/work-flow/workflow.service.ts");
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







var WorkFlowConditionComponent = /** @class */ (function () {
    function WorkFlowConditionComponent(ruleEngineService, commonService, fb, toaster) {
        this.ruleEngineService = ruleEngineService;
        this.commonService = commonService;
        this.fb = fb;
        this.toaster = toaster;
        this.SelectedValue = [];
        // @Input() resulttype: string;
        this.showbutton = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        //Output event emitter for button state 
        this.buttonState = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.getIndexNo = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.newAdd = "Add";
        this.isShow = false;
        this.subModuleList = [];
        this.sqlConditionOperators = ['Or', 'And'];
        this.hideFieldList = true;
        this.textFieldListButton = " Show Field List";
        this.isResult = false;
        this.isDecision = false;
        this.screendata = [];
    }
    WorkFlowConditionComponent.prototype.ngOnChanges = function () {
        this.getSubModuleList();
        this.initForm();
        if ((this.target.get('isDecisionAdded').value && this.target.get('isConditionDecisionAdded').value)) {
            this.isDecision = true;
        }
        this.onConditionChange();
        if ((this.target.get('isConditionAdded').value) || ((this.target.get('isConditionDecisionAdded').value) && this.target.get('isDecisionAdded').value)) {
            this.prepareEditConditionForm();
        }
    };
    WorkFlowConditionComponent.prototype.ngOnInit = function () {
        //this.onConditionChange();    
    };
    //show and hide table field list
    WorkFlowConditionComponent.prototype.showFieldList = function () {
        this.hideFieldList = !this.hideFieldList;
        this.textFieldListButton = this.hideFieldList ? " Show Field List" : "Hide Field List";
    };
    WorkFlowConditionComponent.prototype.initForm = function () {
        this.targetForm = this.ruleEngineService.buildTarget();
    };
    //fetch section list
    WorkFlowConditionComponent.prototype.getSubModuleList = function () {
        var _this = this;
        return this.ruleEngineService.getSubModules(this.ruleEngineForm.get('moduleId').value.value, null, false).subscribe(function (m) {
            _this.subModuleList = m.filter(function (a) { return a.module_name_code != 'loanapplication'; });
        });
    };
    //fetch section form field list on section change
    WorkFlowConditionComponent.prototype.onSubModuleChange = function (event, control) {
        var _this = this;
        if (typeof event !== 'undefined') {
            this.ruleEngineService.GetCustomFieldsListBySubModuleId(event.sub_module_id, 0, false).subscribe(function (m) {
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
                            field_code: f.field_code
                        };
                    });
                    control.get('fieldId').setValue(null);
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
    WorkFlowConditionComponent.prototype.showConditionModal = function () {
        this.isShow = true;
        this.addConditionModel.show();
    };
    //hide target condition popup modal on cancel click
    WorkFlowConditionComponent.prototype.hideConditionModal = function () {
        this.addConditionModel.hide();
        this.targetForm.get('addButton').setValue(false);
    };
    //on condition FormArray change to fetch prepare condition 
    WorkFlowConditionComponent.prototype.onConditionChange = function () {
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
                    databaseCondition += " " + operator.operator_expression;
                    operatorExpression = operator.operator_expression;
                }
                if (obj.fieldValue != null) {
                    var fieldObj_1 = obj.fieldId;
                    if (obj.fieldId != null && fieldObj_1.actual_data_type != 'table') {
                        if (fieldObj_1 != null) {
                            if (fieldObj_1.dt_code.includes('text')) {
                                if (operatorExpression == 'Like') {
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
                                if (operatorExpression == 'between') {
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
                                databaseCondition += ' ' + (obj['fieldValue'] === true ? 1 : 0);
                            }
                            else {
                                if (operatorExpression == 'between') {
                                    displayCondition += " " + obj['fieldValue'] + " and " + obj['fieldSecondValue'];
                                    databaseCondition += " " + obj['fieldValue'] + " and " + obj['fieldSecondValue'];
                                }
                                else if (operatorExpression == 'IN') {
                                    displayCondition += " (" + obj['fieldValue'] + ")";
                                    databaseCondition += " (" + obj['fieldValue'] + ")";
                                }
                                else {
                                    displayCondition += " " + obj['fieldValue'];
                                    databaseCondition += " " + obj['fieldValue'];
                                }
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
    Object.defineProperty(WorkFlowConditionComponent.prototype, "conditions", {
        get: function () {
            return this.targetForm.get('conditions');
        },
        enumerable: true,
        configurable: true
    });
    //add new condition on add click
    WorkFlowConditionComponent.prototype.addCondition = function (event) {
        this.conditions.push(this.ruleEngineService.buidCondition());
        this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(event.target.value);
        this.addNewCondition.nativeElement.value = "Add";
    };
    //targettypeddl(event) {console.log(event.target.value);
    //  if (event.target.value === 'Decision') {
    //    this.addConditionModel.show();
    //  }
    //  else if (event.target.value === 'Result') {
    //    //this.showResultModal.
    //    this.isResult = true;
    //    this.resultcomponent.showResultModal();
    //  }
    //  else {
    //    this.screenListmodel.show();
    //  }
    //}
    //fetch operator list on field change.
    WorkFlowConditionComponent.prototype.onFieldChange = function (event, control, i) {
        if (typeof event !== 'undefined') {
            this.SelectedValue.push(event);
            control.get('operatorId').setValue(null);
            this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(function (m) {
                control.get('operators').setValue(m);
            });
        }
        else {
            control.get('operatorId').setValue(null);
            control.get('operators').setValue([]);
        }
    };
    Object.defineProperty(WorkFlowConditionComponent.prototype, "operators", {
        get: function () {
            return this.conditions.get('operators');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkFlowConditionComponent.prototype, "fields", {
        get: function () {
            return this.conditions.get('fields');
        },
        enumerable: true,
        configurable: true
    });
    WorkFlowConditionComponent.prototype.removeCondition = function (conditionIndex) {
        //this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(null);
        this.conditions.removeAt(conditionIndex);
    };
    Object.defineProperty(WorkFlowConditionComponent.prototype, "targets", {
        get: function () {
            return this.ruleEngineForm.get('targets');
        },
        enumerable: true,
        configurable: true
    });
    //prepare edit condition form
    WorkFlowConditionComponent.prototype.prepareEditConditionForm = function () {
        var _this = this;
        var editTargetForm = this.targets.at(this.rowNo);
        console.log('editTargetFormCondition: ', editTargetForm);
        this.targetForm.patchValue({
            targetId: editTargetForm.value.targetId,
            isConditionAdded: editTargetForm.value.isConditionAdded,
            targetCondition: editTargetForm.value.targetCondition,
            isResultAdded: editTargetForm.value.isResultAdded,
            results: editTargetForm.value.results,
        });
        while (this.conditions.length != 0) {
            this.conditions.removeAt(0);
        }
        console.log('editTargetForm2: ', editTargetForm.get('conditions').controls);
        editTargetForm.get('conditions').controls.forEach(function (m) {
            _this.conditions.push(m);
        });
    };
    //fill data in target form and show condition popup modal.s
    WorkFlowConditionComponent.prototype.editCondition = function () {
        this.prepareEditConditionForm();
        this.showConditionModal();
    };
    WorkFlowConditionComponent.prototype.TargetConditions = function (index) {
        return this.ruleEngineForm.get('targets').at(index).get('conditions');
    };
    Object.defineProperty(WorkFlowConditionComponent.prototype, "results", {
        get: function () {
            return this.target.get('results');
        },
        enumerable: true,
        configurable: true
    });
    WorkFlowConditionComponent.prototype.saveCondition = function () {
        var _this = this;
        debugger;
        if (!this.isDecision) {
            console.log('rowNo', this.rowNo);
            this.targetForm.get('type').setValue('Condition');
            this.targetForm.get('isConditionAdded').setValue(true);
            this.targetForm.get('type').setValue('condition');
            this.targetForm.get('isResultAdded').setValue(true);
            //this.results.setValidators([Validators.required]);
            this.buttonState.emit();
            this.targetForm.get('addButton').setValue(true);
            console.log('savedate', this.ruleEngineForm.get('targets').at(this.rowNo));
            this.ruleEngineForm.get('targets').at(this.rowNo).patchValue({
                ScreenId: this.targetForm.value.ScreenId,
                isScreenAdded: this.targetForm.value.isScreenAdded,
                type: this.targetForm.value.type,
                targetId: this.targetForm.value.targetId,
                isConditionAdded: this.targetForm.value.isConditionAdded,
                targetCondition: this.targetForm.value.targetCondition,
                isResultAdded: this.targetForm.value.isResultAdded,
                results: this.targetForm.value.results,
                addButton: this.targetForm.value.addButton,
            });
        }
        else {
            debugger;
            //this.targetForm.get('isConditionAdded').setValue(true);
            this.targetForm.get('isResultAdded').setValue(true);
            //this.targetForm.get('isConditionDecisionAdded').setValue(true);
            //this.results.setValidators([Validators.required]);
            // this.buttonState.emit();
            //this.targetForm.get('addButton').setValue(true);
            console.log('savedate', this.ruleEngineForm.get('targets').at(this.rowNo));
            // this.showbutton.emit(123456);
            this.ruleEngineForm.get('targets').at(this.rowNo).patchValue({
                targetId: this.targetForm.value.targetId,
                isConditionAdded: this.targetForm.value.isConditionAdded,
                targetCondition: this.targetForm.value.targetCondition,
                isResultAdded: this.targetForm.value.isResultAdded,
                results: this.targetForm.value.results,
            });
        }
        console.log(this.targetForm.value.targetCondition);
        while (this.TargetConditions(this.rowNo).length != 0) {
            this.TargetConditions(this.rowNo).removeAt(0);
        }
        this.conditions.controls.forEach(function (m) {
            _this.TargetConditions(_this.rowNo).push(m);
        });
        this.toaster.success('Condition has been added successfully');
        console.log(this.ruleEngineForm.get('targets').at(this.rowNo));
        //return;
        this.hideConditionModal();
    };
    //AddDecision() {
    //  this.decisioncomponent.AddDecision();
    //}
    WorkFlowConditionComponent.prototype.AddCondition = function (dec) {
        this.isDecision = dec;
        this.addConditionModel.show();
    };
    //AddScreen(a: any) {
    //this.screencomponent.AddScreen();
    //}
    WorkFlowConditionComponent.prototype.deletetarget = function () {
        this.getIndexNo.emit({ rowno: this.rowNo, type: 'condition' });
    };
    WorkFlowConditionComponent.prototype.deletetargetDecision = function () {
        //this.targetForm.get('isConditionDecisionAdded').setValue(false);
        var controlTarget = this.ruleEngineForm.get('targets');
        //alert(this.conditions.controls.length)
        var result = this.results.controls.length;
        while (this.results.controls.length >= 1) {
            this.results.removeAt(this.results.controls.length - 1);
            //alert(1223);     
        }
        while (this.conditions.controls.length > 1) {
            this.conditions.removeAt(this.conditions.controls.length - 1);
            //alert(1223);     
        }
        var control = this.conditions.controls[0];
        control.get('fields').setValue(null);
        control.get('fieldId').setValue(null);
        control.get('operatorId').setValue(null);
        control.get('subModuleAlias').setValue(null);
        control.get('operators').setValue(null);
        control.get('fieldValue').setValue(null);
        control.get('subModuleId').setValue(null);
        this.customFieldsList = null;
        this.targetForm.get('targetCondition').patchValue({
            displayCondition: null,
            database_condition: null
        });
        this.ruleEngineForm.get('targets').at(this.rowNo).patchValue({
            targetId: this.targetForm.value.targetId,
            isConditionAdded: this.targetForm.value.isConditionAdded,
            targetCondition: this.targetForm.value.targetCondition,
        });
        this.showbutton.emit(this.rowNo);
        console.log(this.ruleEngineForm.get('targets').at(this.rowNo));
    };
    WorkFlowConditionComponent.ctorParameters = function () { return [
        { type: _workflow_service__WEBPACK_IMPORTED_MODULE_5__["WorkflowService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resultcomponent', { static: false }),
        __metadata("design:type", _work_flow_result_component__WEBPACK_IMPORTED_MODULE_4__["WorkFlowResultComponent"])
    ], WorkFlowConditionComponent.prototype, "resultcomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], WorkFlowConditionComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], WorkFlowConditionComponent.prototype, "ruleEngineForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], WorkFlowConditionComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], WorkFlowConditionComponent.prototype, "typecondition", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], WorkFlowConditionComponent.prototype, "rowNo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], WorkFlowConditionComponent.prototype, "showbutton", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], WorkFlowConditionComponent.prototype, "productId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], WorkFlowConditionComponent.prototype, "buttonState", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], WorkFlowConditionComponent.prototype, "getIndexNo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addNewCondition', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WorkFlowConditionComponent.prototype, "addNewCondition", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('targettype', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WorkFlowConditionComponent.prototype, "targettype", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addConditionModal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], WorkFlowConditionComponent.prototype, "addConditionModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('screenmodel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], WorkFlowConditionComponent.prototype, "screenmodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('screenListmodel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], WorkFlowConditionComponent.prototype, "screenListmodel", void 0);
    WorkFlowConditionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-work-flow-condition',
            template: __importDefault(__webpack_require__(/*! raw-loader!./work-flow-condition.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-condition.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./work-flow-condition.component.scss */ "./src/app/views/work-flow/workflowmodels/work-flow-condition.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_workflow_service__WEBPACK_IMPORTED_MODULE_5__["WorkflowService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"]])
    ], WorkFlowConditionComponent);
    return WorkFlowConditionComponent;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-delete.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-delete.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmstZmxvdy93b3JrZmxvd21vZGVscy93b3JrLWZsb3ctZGVsZXRlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-delete.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-delete.component.ts ***!
  \******************************************************************************/
/*! exports provided: WorkFlowDeleteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkFlowDeleteComponent", function() { return WorkFlowDeleteComponent; });
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

var WorkFlowDeleteComponent = /** @class */ (function () {
    function WorkFlowDeleteComponent() {
        this.deleteTargetEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    WorkFlowDeleteComponent.prototype.ngOnInit = function () {
    };
    WorkFlowDeleteComponent.prototype.deleteTarget = function () {
        this.deleteTargetEvent.emit();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], WorkFlowDeleteComponent.prototype, "deleteTargetEvent", void 0);
    WorkFlowDeleteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-work-flow-delete',
            template: __importDefault(__webpack_require__(/*! raw-loader!./work-flow-delete.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-delete.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./work-flow-delete.component.scss */ "./src/app/views/work-flow/workflowmodels/work-flow-delete.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], WorkFlowDeleteComponent);
    return WorkFlowDeleteComponent;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-descision.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-descision.component.scss ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmstZmxvdy93b3JrZmxvd21vZGVscy93b3JrLWZsb3ctZGVzY2lzaW9uLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-descision.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-descision.component.ts ***!
  \*********************************************************************************/
/*! exports provided: WorkFlowDescisionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkFlowDescisionComponent", function() { return WorkFlowDescisionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _work_flow_result_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./work-flow-result.component */ "./src/app/views/work-flow/workflowmodels/work-flow-result.component.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _work_flow_condition_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./work-flow-condition.component */ "./src/app/views/work-flow/workflowmodels/work-flow-condition.component.ts");
/* harmony import */ var _screen_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./screen.component */ "./src/app/views/work-flow/workflowmodels/screen.component.ts");
/* harmony import */ var _workflow_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../workflow.service */ "./src/app/views/work-flow/workflow.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
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










var WorkFlowDescisionComponent = /** @class */ (function () {
    function WorkFlowDescisionComponent(ruleEngineService, commonService, dialogService, toaster) {
        this.ruleEngineService = ruleEngineService;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.SelectedValue = [];
        //@Output() buttonState = new EventEmitter();
        this.buttonState = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.getIndexNo = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.newAdd = "Add";
        this.isShow = false;
        this.subModuleList = [];
        this.sqlConditionOperators = ['Or', 'And'];
        this.hideFieldList = true;
        this.textFieldListButton = " Show Field List";
        this.isResult = false;
        this.screendata = [];
        this.ddldatastep = [];
        this.isdecisionbutton = false;
    }
    WorkFlowDescisionComponent.prototype.ngOnChanges = function () {
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
            var controlresult = this.target.get('results');
            var sb = void 0;
            if (controlresult.length >= 1) {
                sb = controlresult.controls[0].get('resultCondition').value;
            }
            var scren = this.target.get('ScreenId').value;
            console.log('displayConditiondisplayCondition', sb);
            console.log('controlresultcontrolresult', controlresult);
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
    };
    WorkFlowDescisionComponent.prototype.ngOnInit = function () {
    };
    //addstepdlldata(index, stepno) {
    //  debugger;
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
    //  console.log('ddddddddddddddddddddd', this.ruleEngineForm.get('targets') as FormArray);   
    //}  
    //show and hide table field list
    WorkFlowDescisionComponent.prototype.showFieldList = function () {
        this.hideFieldList = !this.hideFieldList;
        this.textFieldListButton = this.hideFieldList ? " Show Field List" : "Hide Field List";
    };
    WorkFlowDescisionComponent.prototype.initForm = function () {
        this.targetForm = this.ruleEngineService.buildTarget(null, 'decision');
        console.log('targetForm', this.targetForm);
    };
    //fetch section list
    WorkFlowDescisionComponent.prototype.getSubModuleList = function () {
        var _this = this;
        var control = this.ruleEngineForm.get('targets');
        var screenids = "";
        console.log('controlcontrolcontrol', control);
        for (var i = 0; i < this.rowNo + 1; i++) {
            if (control.controls[i].value.ScreenId > 0) {
                screenids += control.controls[i].value.ScreenId.toString() + ",";
            }
        }
        return this.ruleEngineService.getSubModules(this.ruleEngineForm.get('moduleId').value.value, screenids, true).subscribe(function (m) {
            _this.subModuleList = m.filter(function (a) { return a.module_name_code != 'loanapplication'; });
        });
    };
    //getDecisionData() {
    //  const controlTarget = this.ruleEngineForm.get('targets') as FormArray;
    //  const control = this.conditions.controls[0];
    //  this.screenId = controlTarget.controls[controlTarget.length - 2].value.ScreenId;
    //  //console.log('control.controls[0];', control.controls[control.length-2])
    //  //console.log('control.controls[0].value.ScreenId;', control.controls[control.length - 2].value.ScreenId)
    //  //console.log('control', control);
    //  console.log('control.length', controlTarget.length);      
    //  this.submoduleid = this.ruleEngineForm.value.subModuleId.sub_module_id;
    //  this.moduleid = this.ruleEngineForm.value.moduleId.value;
    //  console.log('submoduleid', this.submoduleid);
    //  console.log('moduleid', this.moduleid);
    //  if (this.submoduleid !== 'undefined' && this.screenId !== 'undefined' && this.screenId !=='') {
    //    this.targetForm.get('targetDecision').patchValue({
    //      screenDecisionId: this.screenId,  
    //    });
    //    this.ruleEngineService.GetCustomFieldsListBySubModuleId(this.submoduleid, this.screenId, true).subscribe((m: any) => {
    //      if (m) {
    //        console.log('decM', m)
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
    //        console.log('tableFields', tableFields)
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
    WorkFlowDescisionComponent.prototype.onSubModuleChange = function (event, control) {
        var _this = this;
        console.log("event", event);
        if (typeof event !== 'undefined') {
            var isdecison = false;
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
            this.ruleEngineService.GetCustomFieldsListBySubModuleId(submodule, this.screenId, isdecison).subscribe(function (m) {
                if (m) {
                    console.log('decM', m);
                    var tableFields = m.data.map(function (f) {
                        return {
                            PrimaryTableColumn: f.PrimaryTableColumn,
                            actual_data_type: f.actual_data_type,
                            display_name: f.display_name,
                            form_field_id: f.form_field_id,
                            dt_code: f.dt_code,
                            name: f.name,
                            field_code: f.field_code,
                            sub_module_id: f.sub_module_id,
                            select_options: f.select_options,
                            table_name: f.table_name,
                            table_alias: f.table_alias
                        };
                    });
                    console.log('tableFields', tableFields);
                    control.get('fieldId').setValue(null);
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
    WorkFlowDescisionComponent.prototype.showConditionModal = function () {
        this.isShow = true;
        this.addConditionModel.show();
    };
    //hide target condition popup modal on cancel click
    WorkFlowDescisionComponent.prototype.hideConditionModal = function () {
        this.addConditionModel.hide();
        //document.getElementById("test").classList.add("condition-false1");
        this.targetForm.get('addButton').setValue(false);
    };
    //on condition FormArray change to fetch prepare condition 
    WorkFlowDescisionComponent.prototype.onConditionChange = function () {
        var _this = this;
        this.conditions.valueChanges.subscribe(function (condition) {
            var displayCondition = '';
            var databaseCondition = '';
            console.log("condition", condition);
            condition.forEach(function (obj) {
                console.log("test obj ", obj);
                if (obj.relationWithParent != null) {
                    displayCondition += " " + obj.relationWithParent.toLowerCase() + " ";
                    databaseCondition += " " + obj.relationWithParent.toLowerCase() + " ";
                }
                if (obj.openingBrackets != null) {
                    displayCondition += obj.openingBrackets;
                    databaseCondition += obj.openingBrackets;
                }
                if (obj.fieldId != null && obj.fieldId != '') {
                    var fieldObj = obj.fieldId;
                    displayCondition += fieldObj.PrimaryTableColumn;
                    if (fieldObj.actual_data_type != 'table') {
                        debugger;
                        if (obj.operatorId != null && (obj.operatorId.operator_display_name.includes('Is Null') || obj.operatorId.operator_display_name.includes('Is Not Null'))) {
                            databaseCondition += obj.subModuleAlias + ".[" + fieldObj.PrimaryTableColumn + "]";
                        }
                        else if (fieldObj.dt_code.includes('text')) {
                            databaseCondition += "isnull(" + obj.subModuleAlias + ".[" + fieldObj.PrimaryTableColumn + "],'0')";
                        }
                        else if (fieldObj.dt_code.includes('select') || fieldObj['dt_code'].includes('radio') || fieldObj['dt_code'].includes('checkbox')) {
                            databaseCondition += "isnull(" + obj.subModuleAlias + ".[" + fieldObj.PrimaryTableColumn + "],'0')";
                        }
                        else if (fieldObj.dt_code.includes('boolean')) {
                            databaseCondition += "isnull(" + obj.subModuleAlias + ".[" + fieldObj.PrimaryTableColumn + "],0)";
                        }
                        else if (fieldObj.dt_code.includes('bigint') || fieldObj.dt_code.includes('int') || fieldObj.dt_code.includes('decimal')) {
                            databaseCondition += "isnull(" + obj.subModuleAlias + ".[" + fieldObj.PrimaryTableColumn + "],0)";
                        }
                        else {
                            databaseCondition += obj.subModuleAlias + ".[" + fieldObj.PrimaryTableColumn + "]";
                        }
                    }
                }
                var operatorExpression = '';
                if (obj.operatorId != null) {
                    var operator = obj.operatorId;
                    displayCondition += " " + operator.operator_display_name;
                    databaseCondition += " " + operator.operator_expression;
                    operatorExpression = operator.operator_expression;
                }
                if (obj.fieldValue != null && obj.fieldValue.toString() != '') {
                    var fieldObj_1 = obj.fieldId;
                    if (obj.fieldId != null && fieldObj_1.actual_data_type != 'table') {
                        if (fieldObj_1 != null) {
                            if (fieldObj_1.dt_code.includes('text')) {
                                if (operatorExpression == 'Like') {
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
                                if (operatorExpression == 'between') {
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
                            else if (fieldObj_1['dt_code'].includes('select') || fieldObj_1['dt_code'].includes('radio') || fieldObj_1['dt_code'].includes('checkbox')) {
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
                                databaseCondition += ' ' + (obj['fieldValue'] === true ? 1 : 0);
                            }
                            else {
                                if (operatorExpression == 'between') {
                                    displayCondition += " " + obj['fieldValue'] + " and " + obj['fieldSecondValue'];
                                    databaseCondition += " " + obj['fieldValue'] + " and " + obj['fieldSecondValue'];
                                }
                                else if (operatorExpression == 'IN') {
                                    displayCondition += " (" + obj['fieldValue'] + ")";
                                    databaseCondition += " (" + obj['fieldValue'] + ")";
                                }
                                else {
                                    displayCondition += " " + obj['fieldValue'];
                                    databaseCondition += " " + obj['fieldValue'];
                                }
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
            _this.targetForm.get('targetDecision').patchValue({
                displayCondition: displayCondition,
                database_condition: databaseCondition
            });
            console.log("this.targetForm", _this.targetForm);
        });
    };
    Object.defineProperty(WorkFlowDescisionComponent.prototype, "conditions", {
        //decision array 
        get: function () {
            return this.targetForm.get('decisions');
        },
        enumerable: true,
        configurable: true
    });
    //add new condition on add click
    WorkFlowDescisionComponent.prototype.addDecision = function (event) {
        this.conditions.push(this.ruleEngineService.buidDecision());
        this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(event.target.value);
        // this.conditions.at(this.conditions.length - 1).get('fields').setValue(this.conditions.value[0].fields);
        this.addNewCondition.nativeElement.value = "Add";
        //this.getDecisionData();
    };
    //fetch operator list on field change.
    WorkFlowDescisionComponent.prototype.onFieldChange = function (event, control, i) {
        console.log('event', event);
        console.log('control', control);
        if (typeof event !== 'undefined') {
            this.SelectedValue.push(event);
            // control.get('subModuleId').setValue(event.sub_module_id);
            control.get('subModuleAlias').setValue(event.table_alias);
            control.get('operatorId').setValue(null);
            this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(function (m) {
                control.get('operators').setValue(m);
            });
        }
        else {
            control.get('operatorId').setValue(null);
            control.get('operators').setValue([]);
        }
        console.log('control', control);
    };
    Object.defineProperty(WorkFlowDescisionComponent.prototype, "operators", {
        get: function () {
            return this.conditions.get('operators');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkFlowDescisionComponent.prototype, "fields", {
        get: function () {
            return this.conditions.get('fields');
        },
        enumerable: true,
        configurable: true
    });
    WorkFlowDescisionComponent.prototype.removeCondition = function (conditionIndex) {
        //this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(null);
        this.conditions.removeAt(conditionIndex);
    };
    Object.defineProperty(WorkFlowDescisionComponent.prototype, "targets", {
        get: function () {
            return this.ruleEngineForm.get('targets');
        },
        enumerable: true,
        configurable: true
    });
    //prepare edit condition form
    WorkFlowDescisionComponent.prototype.prepareEditConditionForm = function () {
        var _this = this;
        var editTargetForm = this.targets.at(this.rowNo);
        console.log('editTargetForm: ', editTargetForm);
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
        console.log('editTargetForm2: ', editTargetForm.get('decisions').controls);
        editTargetForm.get('decisions').controls.forEach(function (m) {
            _this.conditions.push(m);
        });
    };
    //fill data in target form and show condition popup modal.s
    WorkFlowDescisionComponent.prototype.editCondition = function () {
        this.prepareEditConditionForm();
        this.showConditionModal();
    };
    WorkFlowDescisionComponent.prototype.TargetDecison = function (index) {
        return this.ruleEngineForm.get('targets').at(index).get('decisions');
    };
    Object.defineProperty(WorkFlowDescisionComponent.prototype, "conditionsArray", {
        get: function () {
            return this.targetForm.get('conditions');
        },
        enumerable: true,
        configurable: true
    });
    WorkFlowDescisionComponent.prototype.TargetConditions = function (index) {
        return this.ruleEngineForm.get('targets').at(index).get('conditions');
    };
    Object.defineProperty(WorkFlowDescisionComponent.prototype, "results", {
        get: function () {
            return this.target.get('results');
        },
        enumerable: true,
        configurable: true
    });
    WorkFlowDescisionComponent.prototype.saveDecision = function () {
        var _this = this;
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
        console.log('savedate', this.targetForm);
        this.ruleEngineForm.get('targets').at(this.rowNo).patchValue({
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
        console.log(this.targetForm.value);
        while (this.TargetDecison(this.rowNo).length != 0) {
            this.TargetDecison(this.rowNo).removeAt(0);
        }
        this.conditions.controls.forEach(function (m) {
            _this.TargetDecison(_this.rowNo).push(m);
        });
        while (this.TargetConditions(this.rowNo).length != 0) {
            this.TargetConditions(this.rowNo).removeAt(0);
        }
        this.conditionsArray.controls.forEach(function (m) {
            _this.TargetConditions(_this.rowNo).push(m);
        });
        //this.target.get('isResultAdded').setValue(true);
        this.toaster.success('Decision has been added successfully');
        console.log(this.ruleEngineForm.get('targets').at(this.rowNo));
        console.log('ruleEngineFormruleEngineForm', this.ruleEngineForm);
        //return;
        this.hideConditionModal();
    };
    WorkFlowDescisionComponent.prototype.AddDecision = function () {
        //this.getDecisionData();
        this.addConditionModel.show();
    };
    //AddDecision() {
    //  this.decisioncomponent.AddDecision();
    //}
    WorkFlowDescisionComponent.prototype.AddCondition = function () {
        this.conditioncomponent.AddCondition(true);
    };
    WorkFlowDescisionComponent.prototype.AddScreen = function (a) {
        this.screencomponent.addNewScreen(true);
    };
    WorkFlowDescisionComponent.prototype.addresult = function () {
        this.resultcomponent.showResultModal();
    };
    //TestFunction() {
    //  document.getElementById("test").classList.remove("condition-false1");
    //}
    WorkFlowDescisionComponent.prototype.deletetarget = function () {
        var _this = this;
        // this.getIndexNo.emit({ rowno: this.rowNo, type: 'decision' });
        var message = "Are you sure you want to delete this decision\"?";
        this.dialogService.confirm('Delete Step ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.targets.removeAt(_this.rowNo);
                _this.toaster.success("Decision has been deleted successfully");
                _this.isdecisionbutton = false;
            }
        });
    };
    WorkFlowDescisionComponent.prototype.showbutton = function (e) {
        if (e == 123456) {
            this.isdecisionbutton = false;
        }
        else {
            this.isdecisionbutton = true;
        }
    };
    WorkFlowDescisionComponent.ctorParameters = function () { return [
        { type: _workflow_service__WEBPACK_IMPORTED_MODULE_7__["WorkflowService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_9__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], WorkFlowDescisionComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], WorkFlowDescisionComponent.prototype, "ruleEngineForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], WorkFlowDescisionComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], WorkFlowDescisionComponent.prototype, "rowNo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], WorkFlowDescisionComponent.prototype, "productId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], WorkFlowDescisionComponent.prototype, "buttonState", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], WorkFlowDescisionComponent.prototype, "getIndexNo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addNewCondition', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WorkFlowDescisionComponent.prototype, "addNewCondition", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('targettype', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WorkFlowDescisionComponent.prototype, "targettype", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addConditionModal', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ModalDirective"])
    ], WorkFlowDescisionComponent.prototype, "addConditionModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resultcomponent', { static: false }),
        __metadata("design:type", _work_flow_result_component__WEBPACK_IMPORTED_MODULE_2__["WorkFlowResultComponent"])
    ], WorkFlowDescisionComponent.prototype, "resultcomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('conditioncomponent', { static: false }),
        __metadata("design:type", _work_flow_condition_component__WEBPACK_IMPORTED_MODULE_5__["WorkFlowConditionComponent"])
    ], WorkFlowDescisionComponent.prototype, "conditioncomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('screencomponent', { static: false }),
        __metadata("design:type", _screen_component__WEBPACK_IMPORTED_MODULE_6__["ScreenComponent"])
    ], WorkFlowDescisionComponent.prototype, "screencomponent", void 0);
    WorkFlowDescisionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-work-flow-descision',
            template: __importDefault(__webpack_require__(/*! raw-loader!./work-flow-descision.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-descision.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./work-flow-descision.component.scss */ "./src/app/views/work-flow/workflowmodels/work-flow-descision.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_workflow_service__WEBPACK_IMPORTED_MODULE_7__["WorkflowService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_9__["ConfirmationDialogService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"]])
    ], WorkFlowDescisionComponent);
    return WorkFlowDescisionComponent;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-result-calculation.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-result-calculation.component.scss ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmstZmxvdy93b3JrZmxvd21vZGVscy93b3JrLWZsb3ctcmVzdWx0LWNhbGN1bGF0aW9uLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-result-calculation.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-result-calculation.component.ts ***!
  \******************************************************************************************/
/*! exports provided: WorkFlowResultCalculationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkFlowResultCalculationComponent", function() { return WorkFlowResultCalculationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _rule_engine_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../rule-engine/rule-engine.service */ "./src/app/views/rule-engine/rule-engine.service.ts");
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





var WorkFlowResultCalculationComponent = /** @class */ (function () {
    function WorkFlowResultCalculationComponent(commonService, ruleEngineService, fb) {
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
    WorkFlowResultCalculationComponent.prototype.ngOnChanges = function () {
    };
    WorkFlowResultCalculationComponent.prototype.ngOnInit = function () {
        this.getSubModules();
        this.resultConditionForm = this.fb.group({
            resultCalculation: this.fb.array([this.ruleEngineService.buildResultCalculation()])
        });
        this.onResultCalculationFormChange();
    };
    Object.defineProperty(WorkFlowResultCalculationComponent.prototype, "resultCalculation", {
        get: function () {
            return this.resultConditionForm.get('resultCalculation');
        },
        enumerable: true,
        configurable: true
    });
    WorkFlowResultCalculationComponent.prototype.getSqlFunctionList = function (functionType) {
        var _this = this;
        this.commonService.GetSqlFunctionList(functionType).subscribe(function (m) {
            _this.sqlFunctionList = m;
        });
    };
    WorkFlowResultCalculationComponent.prototype.getSubModules = function () {
        var _this = this;
        this.ruleEngineService.getSubModules(this.moduleId).subscribe(function (m) {
            _this.sectionList = m.filter(function (a) { return a.module_name_code != 'loanapplication'; });
        });
    };
    WorkFlowResultCalculationComponent.prototype.onFirstSectionChange = function (event, field) {
        var _this = this;
        if (event) {
            this.ruleEngineService.GetCustomFieldsListBySubModuleId(event.sub_module_id).subscribe(function (m) {
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
    WorkFlowResultCalculationComponent.prototype.onSecondSectionChange = function (event, field) {
        var _this = this;
        if (event) {
            this.ruleEngineService.GetCustomFieldsListBySubModuleId(event.sub_module_id).subscribe(function (m) {
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
    WorkFlowResultCalculationComponent.prototype.addField = function () {
        this.resultCalculation.push(this.ruleEngineService.buildResultCalculation());
    };
    WorkFlowResultCalculationComponent.prototype.onResultCalculationFormChange = function () {
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
    WorkFlowResultCalculationComponent.prototype.save = function () {
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
    WorkFlowResultCalculationComponent.prototype.deleteField = function (index) {
        this.resultCalculation.removeAt(index);
    };
    WorkFlowResultCalculationComponent.prototype.show = function (tableField) {
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
    WorkFlowResultCalculationComponent.prototype.hide = function () {
        this.resultCalculationModal.hide();
    };
    WorkFlowResultCalculationComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _rule_engine_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__["RuleEngineService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resultCalculationModal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], WorkFlowResultCalculationComponent.prototype, "resultCalculationModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"])
    ], WorkFlowResultCalculationComponent.prototype, "resultForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], WorkFlowResultCalculationComponent.prototype, "moduleId", void 0);
    WorkFlowResultCalculationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-work-flow-result-calculation',
            template: __importDefault(__webpack_require__(/*! raw-loader!./work-flow-result-calculation.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-result-calculation.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./work-flow-result-calculation.component.scss */ "./src/app/views/work-flow/workflowmodels/work-flow-result-calculation.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _rule_engine_rule_engine_service__WEBPACK_IMPORTED_MODULE_4__["RuleEngineService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], WorkFlowResultCalculationComponent);
    return WorkFlowResultCalculationComponent;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-result-table-field.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-result-table-field.component.scss ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmstZmxvdy93b3JrZmxvd21vZGVscy93b3JrLWZsb3ctcmVzdWx0LXRhYmxlLWZpZWxkLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-result-table-field.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-result-table-field.component.ts ***!
  \******************************************************************************************/
/*! exports provided: WorkFlowResultTableFieldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkFlowResultTableFieldComponent", function() { return WorkFlowResultTableFieldComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _work_flow_result_calculation_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./work-flow-result-calculation.component */ "./src/app/views/work-flow/workflowmodels/work-flow-result-calculation.component.ts");
/* harmony import */ var _rule_engine_rule_engine_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../rule-engine/rule-engine.service */ "./src/app/views/rule-engine/rule-engine.service.ts");
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




var WorkFlowResultTableFieldComponent = /** @class */ (function () {
    function WorkFlowResultTableFieldComponent(ruleEngineService) {
        this.ruleEngineService = ruleEngineService;
        this.moduleId = '';
        this.tableFieldList = [];
    }
    WorkFlowResultTableFieldComponent.prototype.ngOnChanges = function () {
        if (this.resultForm.value.tableFields.length != 0) {
            this.tableFieldList = this.resultForm.value.tableFields[0].fieldList;
            console.log('tableFieldList', this.tableFieldList);
        }
    };
    WorkFlowResultTableFieldComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(WorkFlowResultTableFieldComponent.prototype, "tableFields", {
        get: function () {
            return this.resultForm.get('tableFields');
        },
        enumerable: true,
        configurable: true
    });
    WorkFlowResultTableFieldComponent.prototype.onTableFieldChange = function (event, tableField) {
        if (event) {
            tableField.get('dataType').setValue(event.actual_data_type);
            tableField.get('name').setValue(event);
            this.code = event.dt_code;
            var types = ['text', 'select', 'boolean'];
            if (types.filter(function (m) { return m == event.dt_code; }).length > 0) {
                tableField.get('isCalculate').disable();
            }
            else {
                tableField.get('isCalculate').enable();
            }
            tableField.get('isCalculate').setValue(false);
            tableField.get('fieldValue').setValue(null);
            tableField.get('fieldDisplayValue').setValue(null);
            while (tableField.get('resultCalculation').length != 0) {
                tableField.get('resultCalculation').removeAt(0);
            }
        }
    };
    WorkFlowResultTableFieldComponent.prototype.showResultCalculation = function (tableField) {
        console.log(tableField);
        this.resultCalculation.show(tableField);
    };
    WorkFlowResultTableFieldComponent.prototype.onFieldCalculateChange = function (isCalculate, tableField) {
        if (isCalculate.value) {
            this.resultCalculation.show(tableField);
        }
        else {
            this.resultCalculation.hide();
        }
        tableField.get('fieldValue').setValue(null);
        tableField.get('fieldDisplayValue').setValue(null);
        if (tableField.get('resultCalculation').length != 0) {
            tableField.get('resultCalculation').removeAt(0);
        }
    };
    WorkFlowResultTableFieldComponent.prototype.addTableField = function () {
        this.tableFields.push(this.ruleEngineService.buildResultTableField(null));
    };
    WorkFlowResultTableFieldComponent.prototype.removeTableField = function (tableFieldindex) {
        this.tableFields.removeAt(tableFieldindex);
    };
    WorkFlowResultTableFieldComponent.ctorParameters = function () { return [
        { type: _rule_engine_rule_engine_service__WEBPACK_IMPORTED_MODULE_3__["RuleEngineService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"])
    ], WorkFlowResultTableFieldComponent.prototype, "resultForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], WorkFlowResultTableFieldComponent.prototype, "moduleId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("resultCalculation", { static: false }),
        __metadata("design:type", _work_flow_result_calculation_component__WEBPACK_IMPORTED_MODULE_2__["WorkFlowResultCalculationComponent"])
    ], WorkFlowResultTableFieldComponent.prototype, "resultCalculation", void 0);
    WorkFlowResultTableFieldComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-work-flow-result-table-field',
            template: __importDefault(__webpack_require__(/*! raw-loader!./work-flow-result-table-field.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-result-table-field.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./work-flow-result-table-field.component.scss */ "./src/app/views/work-flow/workflowmodels/work-flow-result-table-field.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_rule_engine_rule_engine_service__WEBPACK_IMPORTED_MODULE_3__["RuleEngineService"]])
    ], WorkFlowResultTableFieldComponent);
    return WorkFlowResultTableFieldComponent;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-result.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-result.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmstZmxvdy93b3JrZmxvd21vZGVscy93b3JrLWZsb3ctcmVzdWx0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-result.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-result.component.ts ***!
  \******************************************************************************/
/*! exports provided: WorkFlowResultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkFlowResultComponent", function() { return WorkFlowResultComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _workflow_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../workflow.service */ "./src/app/views/work-flow/workflow.service.ts");
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





var WorkFlowResultComponent = /** @class */ (function () {
    function WorkFlowResultComponent(fb, ruleEngineService, commonService) {
        this.fb = fb;
        this.ruleEngineService = ruleEngineService;
        this.commonService = commonService;
        this.editIndex = -1;
        this.moduleId = '';
        this.showbutton = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.showdata = false;
        this.SelectedValue = [];
        this.showWhere = false;
    }
    WorkFlowResultComponent.prototype.ngOnChanges = function () {
        this.moduleId = this.ruleEngineForm.get('moduleId').value.value;
        this.getSubModules();
        //this.conditiondata();
    };
    WorkFlowResultComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.clearTableFields();
        this.getResultActions();
    };
    WorkFlowResultComponent.prototype.onActionChange = function (event) {
        debugger;
        this.clearTableFields();
        if (typeof event !== 'undefined') {
            this.resultForm.get('actionId').setValue(event.resultActionId);
            this.resultForm.get('subModuleId').setValue(null);
            this.prepareActionChangeContent(event.code, true);
        }
    };
    WorkFlowResultComponent.prototype.prepareActionChangeContent = function (code, onChange) {
        if (onChange === void 0) { onChange = false; }
        debugger;
        if (code == 'validation') {
            if (onChange) {
                this.resultForm.get('resultCondition').setValue(null);
                this.resultForm.get('subModuleId').setValue(null);
            }
            this.resultForm.get('resultCondition').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            this.resultForm.get('resultCondition').updateValueAndValidity();
            this.resultForm.get('subModuleId').disable();
            this.resultForm.get('subModuleId').clearValidators();
            this.resultForm.get('subModuleId').updateValueAndValidity();
        }
        else {
            if (onChange) {
                this.resultForm.get('resultCondition').setValue(null);
                this.resultForm.get('subModuleId').setValue(null);
            }
            this.resultForm.get('resultCondition').clearValidators();
            this.resultForm.get('resultCondition').updateValueAndValidity();
            this.resultForm.get('subModuleId').enable();
            this.resultForm.get('subModuleId').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            this.resultForm.get('subModuleId').updateValueAndValidity();
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
    };
    WorkFlowResultComponent.prototype.getResultActions = function () {
        var _this = this;
        debugger;
        this.commonService.getResultActions().subscribe(function (m) {
            _this.resultActionList = m;
        });
    };
    WorkFlowResultComponent.prototype.getSubModules = function () {
        var _this = this;
        this.ruleEngineService.getSubModules(this.ruleEngineForm.get('moduleId').value.value, null, false).subscribe(function (m) {
            _this.tableList = m.filter(function (a) { return a.module_name_code != 'loanproduct' && a.module_name_code != 'loanapplication'; });
            console.log('tableList', _this.tableList);
        });
    };
    WorkFlowResultComponent.prototype.showResultModal = function () {
        debugger;
        this.editIndex = -1;
        this.addResultModel.show();
        this.resetResultForm();
    };
    WorkFlowResultComponent.prototype.hideResultModal = function () {
        this.addResultModel.hide();
        this.resetResultForm();
    };
    //fetch section field list
    WorkFlowResultComponent.prototype.getSubModuleFields = function (subModule) {
        // this.conditions.controls[0].get('fieldValue').clearValidators();
        //this.conditions.controls[0].get('fieldValue').updateValueAndValidity();
        var _this = this;
        while (this.conditions.length != 0) {
            this.conditions.removeAt(0);
        }
        this.resultForm.get('databaseresultCondition').setValue(null);
        this.resultForm.get('displayresultcondition').setValue(null);
        //if (this.conditions.length == 1) {  
        //  const control = this.conditions.controls[0] as FormGroup;
        //  control.get('fields').setValue(null);
        //  control.get('fieldId').setValue(null);
        //  control.get('operatorId').setValue(null);
        //  control.get('subModuleAlias').setValue(null);
        //  control.get('subModuleId').setValue(null);
        //  control.get('operators').setValue(null);
        //  control.get('fieldValue').setValue(null);
        //  //this.resultForm.get['databaseresultCondition'].se = '';
        //  //this.resultForm.value.displayresultcondition = '';
        ////  this.hideConditionModal()
        //}
        var currentPage = this;
        this.clearTableFields();
        console.log('subModulesubModulesubModule', subModule);
        this.resultsubModule = subModule.sub_module_id;
        if (subModule) {
            this.ruleEngineService.GetCustomFieldsListBySubModuleId(subModule.sub_module_id, 0, false).subscribe(function (m) {
                if (m) {
                    var tableFiledList = m.data.map(function (f) {
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
                            field_code: f.field_code
                        };
                    });
                    if (_this.resultForm.get('action').value) {
                        if (_this.resultForm.get('action').value.code == 'create') {
                            tableFiledList.forEach(function (obj) {
                                var tempObj = obj;
                                _this.tableFields.push(_this.ruleEngineService.buildResultTableField(tempObj));
                            });
                        }
                        else {
                            _this.resultForm.get('fieldList').setValue(tableFiledList);
                            _this.tableFields.push(_this.ruleEngineService.buildResultTableField(null));
                        }
                    }
                }
            });
        }
    };
    Object.defineProperty(WorkFlowResultComponent.prototype, "results", {
        get: function () {
            return this.target.get('results');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkFlowResultComponent.prototype, "tableFields", {
        get: function () {
            return this.resultForm.get('tableFields');
        },
        enumerable: true,
        configurable: true
    });
    WorkFlowResultComponent.prototype.clearTableFields = function () {
        debugger;
        while (this.tableFields.length !== 0) {
            this.tableFields.removeAt(0);
        }
    };
    WorkFlowResultComponent.prototype.initForm = function () {
        this.resultForm = this.fb.group({
            resultId: [null],
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            action: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            actionId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            subModuleId: [null],
            fieldList: [null],
            resultCondition: [null],
            displayresultcondition: [''],
            databaseresultCondition: [''],
            tableFields: this.fb.array([this.buildResultTableField()]),
            whereClauseFields: this.fb.array([this.buildResultwhereclause()]),
            isEdit: [false]
        }); // this.ruleEngineService.buidResult();
    };
    WorkFlowResultComponent.prototype.buildResultTableField = function (tableField) {
        if (tableField === void 0) { tableField = null; }
        var tableFieldGroup = this.fb.group({
            RuleTargetResultConditionId: [null],
            RuleTargetId: [null],
            fieldId: [null],
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fieldSelectList: [],
            displayName: [null],
            dataType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            isCalculate: [{ value: false, disabled: true }],
            fieldDisplayValue: [null],
            fieldValue: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            showPopUpModal: [false],
            resultCalculation: this.fb.array([this.ruleEngineService.buildResultCalculation()])
        });
        return tableFieldGroup;
    };
    WorkFlowResultComponent.prototype.editResult = function (index) {
        debugger;
        this.editIndex = index;
        console.log("target targetform test ", this.target);
        var control = this.results.at(this.editIndex).get('whereClauseFields');
        console.log('controlcontrol', control);
        control.removeAt(0);
        console.log('controlcontrolafter', control);
        // console.log("deeeeeeeee", dee);
        //dee.removeAt(0);
        console.log("target targetform test  aafter", this.target);
        var editResultForm = this.results.at(this.editIndex);
        var formValue = editResultForm;
        this.resultForm = formValue;
        console.log('this.resultForm', this.resultForm);
        this.resultForm.get('isEdit').setValue(true);
        // const control = this.results.at(this.editIndex).get('whereClauseFields') as FormArray;
        // console.log('controlcontrol',control)
        // control.removeAt(0);
        this.prepareActionChangeContent(editResultForm.get('action').value.code);
        this.addResultModel.show();
    };
    WorkFlowResultComponent.prototype.saveResult = function () {
        console.log('resultForm', this.resultForm);
        this.showdata = true;
        if ((this.resultForm.get('isEdit').value == null || this.resultForm.get('isEdit').value == false) && this.resultForm.valid) {
            this.prepareQuery(this.resultForm);
            this.results.push(this.resultForm);
            this.addResultModel.hide();
            this.showbutton.emit(123456);
            //let i = 0;
            //while (i < this.results.value.length) {
            //  if (this.results.value[i].name == null || this.results.value[i].name == "" || this.results.value[i].name == undefined) {
            //    this.results.removeAt(i);
            //  }
            //  i++;
            //}
            this.target.get('isResultAdded').setValue(true);
            this.target.get('isResultDecisionAdded').setValue(true);
            console.log("this.resultForm", this.ruleEngineForm);
            console.log(this.results, "this.results");
        }
        else if (this.resultForm.get('isEdit').value == true && this.resultForm.valid) {
            this.results.removeAt(this.editIndex);
            this.prepareQuery(this.resultForm);
            this.results.insert(this.editIndex, this.resultForm);
            this.addResultModel.hide();
            this.target.get('isResultAdded').setValue(true);
            this.addResultModel.hide();
        }
        else {
            alert('Invalid');
        }
    };
    WorkFlowResultComponent.prototype.deleteResultForm = function () {
        if (confirm("Are you sure you want to delete this result?")) {
            this.results.removeAt(this.editIndex);
            this.hideResultModal();
            //this.resetResultForm();
            //this.results.push(this.resultForm);
        }
    };
    WorkFlowResultComponent.prototype.resetResultForm = function () {
        this.initForm();
    };
    WorkFlowResultComponent.prototype.prepareQuery = function (result) {
        var query = '';
        var actionName = result.get('action').value.code;
        if (actionName == 'create') {
            this.createQuery();
        }
        else if (actionName == 'update') {
            this.updateQuery();
        }
    };
    WorkFlowResultComponent.prototype.createQuery = function () {
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
    WorkFlowResultComponent.prototype.updateQuery = function () {
        var _this = this;
        var tableName = this.resultForm.value.tableFields[0].fieldId.table_alias;
        var query = 'update ' + tableName + ' set ';
        this.resultForm.value.tableFields.forEach(function (obj, index) {
            debugger;
            var comma = '';
            if (_this.resultForm.value.tableFields.length != (index + 1)) {
                comma = ', ';
            }
            console.log('obj: ', obj);
            if (obj.dataType.includes('date') && obj.isCalculate == false) {
                obj.fieldValue = 'GETUTCDATE()';
            }
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
                query += tableName + "." + obj.fieldId.name + "=" + obj.fieldValue;
            }
            else if (obj.dataType.includes('date') && obj.isCalculate == true) {
                if (obj.fieldValue == null) {
                    obj.fieldValue = obj.fieldDisplayValue;
                }
                query += tableName + "." + obj.fieldId.name + "=" + obj.fieldValue + comma;
            }
        });
        this.resultForm.get('resultCondition').setValue(query);
        console.log('this.resultForm', this.resultForm);
    };
    /////////// Condition part ///////////////
    WorkFlowResultComponent.prototype.hideConditionModal = function () {
        if (this.resultForm.value.databaseresultCondition == null || this.resultForm.value.databaseresultCondition == '') {
            this.conditions.controls.forEach(function (control) {
                control.get('subModuleId').clearValidators();
                control.get('subModuleId').updateValueAndValidity();
                control.get('subModuleAlias').clearValidators();
                control.get('subModuleAlias').updateValueAndValidity();
                control.get('fieldId').clearValidators();
                control.get('fieldId').updateValueAndValidity();
                control.get('operatorId').clearValidators();
                control.get('operatorId').updateValueAndValidity();
                ;
                control.get('fieldValue').clearValidators();
                control.get('fieldValue').updateValueAndValidity();
            });
        }
        this.addConditionModal.hide();
    };
    WorkFlowResultComponent.prototype.openconditionpopup = function () {
        var _this = this;
        if (this.conditions.length == 0) {
            this.conditions.push(this.buildResultwhereclause());
        }
        console.log("resultFormresultForm", this.resultForm);
        console.log("openconditionpopup", this.resultForm.value.databaseresultCondition);
        console.log('this.conditions', this.conditions);
        if (this.resultForm.value.subModuleId != null || this.resultForm.value.subModuleId != '') {
            this.resultsubModule = this.resultForm.value.subModuleId;
        }
        var control = this.conditions.controls[0];
        if (this.resultForm.value.databaseresultCondition == null || this.resultForm.value.databaseresultCondition == '') {
            control.get('subModuleId').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            control.get('subModuleId').updateValueAndValidity();
            control.get('subModuleAlias').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            control.get('subModuleAlias').updateValueAndValidity();
            control.get('fieldId').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            control.get('fieldId').updateValueAndValidity();
            control.get('operatorId').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            control.get('operatorId').updateValueAndValidity();
            control.get('fieldValue').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            control.get('fieldValue').updateValueAndValidity();
        }
        //if ((!this.resultForm.get('isEdit').value) && (this.resultForm.value.databaseresultCondition == null || this.resultForm.value.databaseresultCondition == '')  ) { 
        if (this.conditions.length < 1 || (this.resultForm.value.databaseresultCondition == null || this.resultForm.value.databaseresultCondition == '')) {
            this.ruleEngineService.GetCustomFieldsListBySubModuleId(this.resultsubModule, 0, false).subscribe(function (m) {
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
                            field_code: f.field_code
                        };
                    });
                    control.get('fieldId').setValue(null);
                    control.get('subModuleId').setValue(_this.resultsubModule);
                    control.get('operatorId').setValue(null);
                    control.get('subModuleAlias').setValue(null);
                    control.get('operators').setValue(null);
                    control.get('fieldValue').setValue(null);
                    control.get('fields').setValue(tableFields);
                    control.get('subModuleAlias').setValue(tableFields[0].table_alias);
                    //this.customFieldsList = m.data;
                }
                else {
                    control.get('fields').setValue(null);
                    control.get('fieldId').setValue(null);
                    control.get('operatorId').setValue(null);
                    control.get('subModuleAlias').setValue(null);
                    control.get('operators').setValue(null);
                    control.get('fieldValue').setValue(null);
                    // this.customFieldsList = null;
                }
            });
        }
        this.addConditionModal.show();
    };
    WorkFlowResultComponent.prototype.buildResultwhereclause = function (resultFields) {
        if (resultFields === void 0) { resultFields = null; }
        var whereFieldGroup = this.fb.group({
            conditionId: [null],
            relationWithParent: [null],
            openingBrackets: "(",
            subModuleId: [null],
            subModuleAlias: [null],
            fieldId: [null],
            fields: [],
            operatorId: [null],
            operators: [],
            fieldSelectList: [],
            picklistOption: [],
            fieldSecondValue: [null],
            closingBrackets: ")",
            isTime: [""],
            displayOrder: [0],
            fieldValue: [null],
        });
        console.log('whereFieldGroup', whereFieldGroup);
        return whereFieldGroup;
    };
    Object.defineProperty(WorkFlowResultComponent.prototype, "conditions", {
        get: function () {
            return this.resultForm.get('whereClauseFields');
        },
        enumerable: true,
        configurable: true
    });
    WorkFlowResultComponent.prototype.addCondition = function (event) {
        this.conditions.push(this.buildResultwhereclause());
        this.conditions.at(this.conditions.length - 1).get('relationWithParent').setValue(event.target.value);
        this.conditions.at(this.conditions.length - 1).get('fields').setValue(this.conditions.value[0].fields);
        this.addNewCondition.nativeElement.value = "Add";
        // console.log('this.conditions.at', this.conditions.at(this.conditions.length - 1).get('relationWithParent').value)
    };
    WorkFlowResultComponent.prototype.onFieldChange = function (event, control, i) {
        control.get('subModuleId').setValue(this.resultsubModule);
        control.get('subModuleAlias').setValue(event.table_alias);
        if (typeof event !== 'undefined') {
            this.SelectedValue.push(event);
            control.get('operatorId').setValue(null);
            this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(function (m) {
                control.get('operators').setValue(m);
            });
        }
        else {
            control.get('operatorId').setValue(null);
            control.get('operators').setValue([]);
        }
    };
    WorkFlowResultComponent.prototype.removeCondition = function (conditionIndex) {
        alert(conditionIndex);
        this.conditions.removeAt(conditionIndex);
    };
    WorkFlowResultComponent.prototype.saveCondition = function () {
        if (this.resultForm.get('whereClauseFields').valid) {
            this.onConditionChange();
            this.addConditionModal.hide();
        }
    };
    WorkFlowResultComponent.prototype.onConditionChange = function () {
        var displayCondition = '';
        var databaseCondition = '';
        this.conditions.value.forEach(function (obj) {
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
                    if (obj.operatorId != null && (obj.operatorId.operator_display_name.includes('Is Null') || obj.operatorId.operator_display_name.includes('Is Not Null'))) {
                        databaseCondition += obj.subModuleAlias + ".[" + fieldObj.PrimaryTableColumn + "]";
                    }
                    else if (fieldObj.dt_code.includes('text')) {
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
                databaseCondition += " " + operator.operator_expression;
                operatorExpression = operator.operator_expression;
            }
            if (obj.fieldValue != null) {
                var fieldObj_1 = obj.fieldId;
                if (obj.fieldId != null && fieldObj_1.actual_data_type != 'table') {
                    if (fieldObj_1 != null) {
                        if (fieldObj_1.dt_code.includes('text')) {
                            if (operatorExpression == 'Like') {
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
                            if (operatorExpression == 'between') {
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
                            databaseCondition += ' ' + (obj['fieldValue'] === true ? 1 : 0);
                        }
                        else {
                            if (operatorExpression == 'between') {
                                displayCondition += " " + obj['fieldValue'] + " and " + obj['fieldSecondValue'];
                                databaseCondition += " " + obj['fieldValue'] + " and " + obj['fieldSecondValue'];
                            }
                            else if (operatorExpression == 'IN') {
                                displayCondition += " (" + obj['fieldValue'] + ")";
                                databaseCondition += " (" + obj['fieldValue'] + ")";
                            }
                            else {
                                displayCondition += " " + obj['fieldValue'];
                                databaseCondition += " " + obj['fieldValue'];
                            }
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
        this.resultForm.patchValue({
            displayresultcondition: displayCondition,
            databaseresultCondition: databaseCondition
        });
    };
    WorkFlowResultComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _workflow_service__WEBPACK_IMPORTED_MODULE_4__["WorkflowService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addNewCondition', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WorkFlowResultComponent.prototype, "addNewCondition", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], WorkFlowResultComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], WorkFlowResultComponent.prototype, "ruleEngineForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addResult', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], WorkFlowResultComponent.prototype, "addResultModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addConditionModal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], WorkFlowResultComponent.prototype, "addConditionModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], WorkFlowResultComponent.prototype, "showbutton", void 0);
    WorkFlowResultComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-work-flow-result',
            template: __importDefault(__webpack_require__(/*! raw-loader!./work-flow-result.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-result.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./work-flow-result.component.scss */ "./src/app/views/work-flow/workflowmodels/work-flow-result.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _workflow_service__WEBPACK_IMPORTED_MODULE_4__["WorkflowService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]])
    ], WorkFlowResultComponent);
    return WorkFlowResultComponent;
}());



/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-target.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-target.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmstZmxvdy93b3JrZmxvd21vZGVscy93b3JrLWZsb3ctdGFyZ2V0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/work-flow/workflowmodels/work-flow-target.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/views/work-flow/workflowmodels/work-flow-target.component.ts ***!
  \******************************************************************************/
/*! exports provided: WorkFlowTargetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkFlowTargetComponent", function() { return WorkFlowTargetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _screen_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screen.component */ "./src/app/views/work-flow/workflowmodels/screen.component.ts");
/* harmony import */ var _work_flow_result_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./work-flow-result.component */ "./src/app/views/work-flow/workflowmodels/work-flow-result.component.ts");
/* harmony import */ var _work_flow_descision_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./work-flow-descision.component */ "./src/app/views/work-flow/workflowmodels/work-flow-descision.component.ts");
/* harmony import */ var _work_flow_condition_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./work-flow-condition.component */ "./src/app/views/work-flow/workflowmodels/work-flow-condition.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _workflow_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../workflow.service */ "./src/app/views/work-flow/workflow.service.ts");
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







var WorkFlowTargetComponent = /** @class */ (function () {
    function WorkFlowTargetComponent(ruleEngineService) {
        this.ruleEngineService = ruleEngineService;
        this.deleteTargetEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.SelectedValue = [];
        this.resultValidation = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isDecision = false;
    }
    WorkFlowTargetComponent.prototype.ngOnInit = function () {
    };
    WorkFlowTargetComponent.prototype.ngOnChanges = function () {
        this.initForm();
    };
    WorkFlowTargetComponent.prototype.initForm = function () {
        console.log('targetcheck', this.target);
        this.targetForm = this.ruleEngineService.buildTarget();
        if (this.isEdit == true && this.target.get('addButton').value) {
            this.targetForm.get('addButton').setValue(true);
        }
        var control = this.ruleEngineForm.get('targets');
        if (control.length > 1) {
            this.isDecision = control.controls[control.length - 2].value.isScreenAdded;
        }
        //console.log('control.controls[0]MAin', control.controls[control.length - 2])
        //console.log('control.controls[0].value.ScreenId;MAin', control.controls[control.length - 2].value.isScreenAdded)
        //console.log('controlMAin', control);
        //console.log('control.lengthMAin', control.length);
    };
    //deleteTarget() {
    //  this.deleteTargetEvent.emit();
    //}
    WorkFlowTargetComponent.prototype.AddScreen = function (a) {
        this.screencomponent.addNewScreen(false);
        // this.targetForm.get('addButton').setValue(true); 
    };
    WorkFlowTargetComponent.prototype.AddDecision = function (a) {
        //this.deleteTargetEvent.emit();
        this.decisioncomponent.AddDecision();
        //this.targetForm.get('addButton').setValue(true); 
    };
    WorkFlowTargetComponent.prototype.AddCondition = function (a) {
        this.conditioncomponent.AddCondition(false);
        //this.targetForm.get('addButton').setValue(true); 
    };
    WorkFlowTargetComponent.prototype.getIndexNo = function (event) {
        this.resultValidation.emit(event);
    };
    //function used to change state of add button 
    WorkFlowTargetComponent.prototype.buttonState = function (event) {
        this.targetForm.get('addButton').setValue(true);
    };
    WorkFlowTargetComponent.prototype.stepdll = function (e) {
        debugger;
        //var ab = e + 1;
        //const data = this.ruleEngineForm.get('targets') as FormArray;
        //console.log('datadatadata',data)
        //for (var i = data.length; i > 0; i--) {
        //  var index = i - 1;
        //  if (data.controls[i-1].get('type').value == 'decision') {
        //   // let ddldata: any[] = [];   
        //    //ddldata = data.controls[i].get('ddlStepDropdown').value;
        //    this.decisioncomponent.addstepdlldata(index, ab);
        //    return;
        //  }
        //}  
        //this.decisioncomponent.addstepdlldata(1, ab);
    };
    WorkFlowTargetComponent.ctorParameters = function () { return [
        { type: _workflow_service__WEBPACK_IMPORTED_MODULE_6__["WorkflowService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], WorkFlowTargetComponent.prototype, "deleteTargetEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resultcomponent', { static: false }),
        __metadata("design:type", _work_flow_result_component__WEBPACK_IMPORTED_MODULE_2__["WorkFlowResultComponent"])
    ], WorkFlowTargetComponent.prototype, "resultcomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('decisioncomponent', { static: false }),
        __metadata("design:type", _work_flow_descision_component__WEBPACK_IMPORTED_MODULE_3__["WorkFlowDescisionComponent"])
    ], WorkFlowTargetComponent.prototype, "decisioncomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('conditioncomponent', { static: false }),
        __metadata("design:type", _work_flow_condition_component__WEBPACK_IMPORTED_MODULE_4__["WorkFlowConditionComponent"])
    ], WorkFlowTargetComponent.prototype, "conditioncomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('screencomponent', { static: false }),
        __metadata("design:type", _screen_component__WEBPACK_IMPORTED_MODULE_1__["ScreenComponent"])
    ], WorkFlowTargetComponent.prototype, "screencomponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], WorkFlowTargetComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"])
    ], WorkFlowTargetComponent.prototype, "ruleEngineForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"])
    ], WorkFlowTargetComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], WorkFlowTargetComponent.prototype, "rowNo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], WorkFlowTargetComponent.prototype, "isEdit", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], WorkFlowTargetComponent.prototype, "productId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], WorkFlowTargetComponent.prototype, "rValidation", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], WorkFlowTargetComponent.prototype, "resultValidation", void 0);
    WorkFlowTargetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-work-flow-target',
            template: __importDefault(__webpack_require__(/*! raw-loader!./work-flow-target.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/work-flow/workflowmodels/work-flow-target.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./work-flow-target.component.scss */ "./src/app/views/work-flow/workflowmodels/work-flow-target.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_workflow_service__WEBPACK_IMPORTED_MODULE_6__["WorkflowService"]])
    ], WorkFlowTargetComponent);
    return WorkFlowTargetComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-work-flow-workflow-module.js.map