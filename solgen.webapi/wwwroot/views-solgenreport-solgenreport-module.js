(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-solgenreport-solgenreport-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgenreport/nestreport/nestreportlist.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgenreport/nestreport/nestreportlist.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\n  <h2 class=\"float-left pr-2\"><strong>Manage Product Required Report</strong></h2>\n  <div class=\"breadcrumb-wrapper\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a routerLink=\"/dashboard\">Dashboard</a>\n      </li>\n      <li class=\"active\">Manage Product Required</li>\n    </ol>\n  </div>\n</div>\n<div class=\"clearfix\"></div>\n<div class=\"row\">\n  <div class=\"col-lg-12 portlets\">\n    <div class=\"panel\" [ngClass]=\"{'disabled':loadSave}\">\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\n        <div class=\"row mt-2\">\n          <div class=\"col-md-12 col-xl-12\">\n            <div class=\"row searchfield\">\n              <div class=\"col-lg-12\">\n                <div class=\"row report-calendar\">\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2\">\n                    <!--<input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Product Name\" (keyup)='searchProductName($event)'>-->\n                    <ng-select #Product [items]=\"lstProductName\"\n                               placeholder=\"Select Product Name\" bindValue=\"value\" bindLabel=\"text\"\n                               [closeOnSelect]=\"true\" [multiple]=\"true\" [(ngModel)]=\"listFilter\"\n                               (clear)=\"restProductddl()\">\n                    </ng-select>\n                  </div>\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\n                    <ng-select #userTypeSelect [items]=\"lstAccountList\"\n                               placeholder=\"Select Accounts\" bindValue=\"value\" bindLabel=\"text\"\n                               [closeOnSelect]=\"true\" [(ngModel)]=\"accountId\"\n                               (scrollToEnd)=\"onScrollToEnd(lstAccountList,'NestReposrt_Account')\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,lstAccountList,'NestReposrt_Account')\"\n                               (clear)=\"restAccountddl()\">\n                    </ng-select>\n                  </div>\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\n                    <ng-select #AccountStatusSelect [items]=\"lstAccountStatus\"\n                               placeholder=\"Select Account Status\" bindValue=\"value\" bindLabel=\"text\"\n                               [closeOnSelect]=\"true\" [(ngModel)]=\"accountStatusId\"\n                               (clear)=\"restAccountStatusddl()\">\n                    </ng-select>\n                  </div>\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\n                    <ng-select #SetStateClear [items]=\"lstState\"\n                               placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\"\n                               [closeOnSelect]=\"true\" [(ngModel)]=\"stateId\"\n                               (clear)=\"restStateddl()\">\n                    </ng-select>\n                  </div>\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3\">\n                    <ng-select #Stage [items]=\"lstCurrentStage\"\n                               placeholder=\"Select Stage\" bindValue=\"value\" bindLabel=\"text\"\n                               [closeOnSelect]=\"true\" [multiple]=\"true\" [(ngModel)]=\"stageId\"\n                               (clear)=\"restStageddl()\">\n                    </ng-select>\n                  </div>\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-lg-0\">\n                    <div class=\"form-group mb-0\">\n                      <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Customer Signed From\"\n                                  [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\n                    <div class=\"form-group mb-0\">\n                      <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Customer Signed To\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\n                    <div class=\"form-group  mb-0\">\n                      <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Deliver Date From\"\n                                  [(ngModel)]=\"DeliverDateFrom\" [minDate]=\"DeliverDateFrom\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3\">\n                    <div class=\"form-group  mb-0\">\n                      <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Deliver Date To\" [(ngModel)]=\"DeliverDateTo\" [minDate]=\"DeliverDateFrom\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\n                    <div class=\"form-group  mb-0\">\n                      <ng-select #Delivered [items]=\"lstDelivered\"\n                                 placeholder=\"Select Deliver Or Not\" bindValue=\"value\" bindLabel=\"text\"\n                                 [closeOnSelect]=\"true\" [(ngModel)]=\"deliveryId\"\n                                 (clear)=\"restDeliveredddl()\">\n                      </ng-select>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\n                    <div class=\"form-group  mb-0\">\n                      <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"SearchNestReport()\" tooltip=\"Search\"><span><i class=\"fa fa-search pr-2\"></i> Search</span></a>\n                      <a class=\"btn btn-danger form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh pr-2\"></i> Reset</span></a>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-12 mt-4 mb-2\">\n        <div class=\"w-100 mt-2 mb-0\" *ngIf=\"pagedData.data.length>0\">\n          <span class=\"float-right\">\n            <!--<small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>-->\n            <a href=\"javascript:void(0);\" *ngIf=\"!isDisplay\" (click)=\"ExportTOExcel()\" title=\"Download Excel\" class=\" btn btn-success mr-1\" style=\"background:#1D6F42; border-color:#1D6F42;\" tooltip=\"Download Excel\"><i class=\"fa fa-file-excel-o\"></i></a>\n            <a href=\"javascript:void(0);\" *ngIf=\"!isDisplay\" (click)=\"generatePdf()\" title=\"Download Pdf\" class=\" btn btn-danger mr-1\" style=\"background:#c0392b; border-color:#c0392b;\" tooltip=\"Download Pdf\"><i class=\"fa fa-file-pdf-o\"></i> </a>\n\n            <a href=\"javascript:void(0);\" *ngIf=\"!isGraphView\" (click)=\"generatePdf1()\" title=\"Graph View\" class=\" btn btn-info text-white\" tooltip=\"Graph View\"><i class=\"fa fa-bar-chart\"></i></a>\n            <a href=\"javascript:void(0);\" *ngIf=\"isGraphView\" (click)=\"generatePdf1()\" title=\"List View\" class=\" btn btn-info text-white\" tooltip=\"List View\"><i class=\"fa fa-list\"></i></a>\n          </span>\n        </div>\n      </div>\n      <div class=\"clearfix\"></div>\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\" *ngIf=\"!isDisplay\">\n        <ngx-datatable class=\"bootstrap custom-medium-table-width\"\n                       [rows]=\"pagedData.data\"\n                       [columnMode]=\"'force'\"\n                       [headerHeight]=\"40\"\n                       [footerHeight]=\"40\"\n                       [rowHeight]=\"'auto'\"\n                       [externalPaging]=\"true\"\n                       [externalSorting]=\"true\"\n                       [loadingIndicator]=\"loadSave\"\n                       [count]=\"pagedData.pager.totalItems\"\n                       [offset]=\"pagedData.pager.currentPage\"\n                       [limit]=\"pagedData.pager.pageSize\"\n                       (page)='setPage($event)'\n                       (sort)=\"onSort($event)\">\n          <ngx-datatable-column name=\"State Name\" prop=\"stateName\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\n          <ngx-datatable-column name=\"Account Name\" prop=\"AccountName\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <div title=\"{{row.AccountName}}\">\n                <a [routerLink]=\"['/accountslist/view',row.id]\">{{row.AccountName| truncate}}</a>&nbsp;\n              </div>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Account Status\" prop=\"accountStatus\" [sortable]=\"true\" headerClass=\"thead-dark\">\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Current Stage\" prop=\"currentStage\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\n          <ngx-datatable-column name=\"Customer Signed Date\" prop=\"CustomerSignedDate\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              {{row.CustomerSignedDate |DateTimeToLocal}}\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"NTP Date\" prop=\"NTPDate\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              {{row.NTPDate |DateTimeToLocal}}\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Installation Date\" prop=\"Installation_Date\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              {{row.Installation_Date |DateTimeToLocal}}\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"PTO Date\" prop=\"PTODate\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              {{row.PTODate |DateTimeToLocal}}\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Date Delivered\" prop=\"DateDelivered\" [minWidth]=\"190\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <div title=\"{{row.DateDelivered | DateTimeToLocal}}\" *ngIf=\"row.DateDelivered!=null\" style=\"min-width:125px\">\n                <span class=\"d-inline-block pr-2 float-left\">{{row.DateDelivered | DateTimeToLocal}}</span>\n                <a class=\"actions-onclick view-list d-inline-block float-right p-0 pl-2\" href=\"javascript:;\" tooltip=\"Assign Delivery Date \" (click)=\"AssignDeliveryDate(row)\" title=\"Assign Delivery Date\"><i class=\"fa fa-pencil text-success mr-2\"></i> </a>\n              </div>\n              <div *ngIf=\"row.DateDelivered==null\" style=\"min-width:125px\">\n                <span class=\"d-inline-block pr-2 float-left\">{{'--'}}</span>\n                <a class=\"actions-onclick view-list d-inline-block float-right p-0 pl-2\" href=\"javascript:;\" tooltip=\"Assign Delivery Date \" (click)=\"AssignDeliveryDate(row)\" title=\"Assign Delivery Date\">\n\n                  <i class=\"fa fa-pencil text-success mr-2\"></i>\n                </a>\n              </div>\n            </ng-template>\n          </ngx-datatable-column>\n          <!--product/ viewproducts-->\n          <ngx-datatable-column name=\"Product Name\" prop=\"ProductName\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <div title=\"{{row.ProductName\n}}\">\n                <a [routerLink]=\"['/product/viewproducts',row.ProductId]\">{{row.ProductName| truncate}}</a>&nbsp;\n              </div>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Product Required ID\" prop=\"ProductRequiredNumber\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <div title=\"{{row.ProductRequiredNumber}}\">\n                <a [routerLink]=\"['/manageproductrequired/viewProductRequired',row.productRequiredId]\">\n                  {{row.ProductRequiredNumber| truncate}}\n                </a>&nbsp;\n              </div>\n            </ng-template>\n          </ngx-datatable-column>\n          <!--<ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\n          <ng-template let-row=\"row\" ngx-datatable-cell-template headerClass=\"text-center\">\n          <span class=\"actions rw_act\">\n          <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.uniqId\" aria-hidden=\"true\"></i>\n          <span class=\"action-list-box spn{{row.uniqId}}\">\n          <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\n          <a class=\"actions-onclick view-list\" (click)=\"AssignDeliveryDate(row)\" title=\"Assign Delivery Date\"><i class=\"fa fa-pencil text-success mr-2\"></i></a>\n          </span>\n          </span>\n          </span>\n          </ng-template>\n          </ngx-datatable-column>-->\n          <!--<ngx-datatable-footer>\n          <ng-template class=\"selected-count\" ngx-datatable-footer-template\n          let-rowCount=\"rowCount\"\n          let-pageSize=\"pageSize\"\n          let-selectedCount=\"selectedCount\"\n          let-currentPage=\"curPage\"\n          let-offset=\"offset\"\n          let-isVisible=\"isVisible\">\n          <div>\n          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\n          <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n          <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\n          bindLabel=\"text\" bindValue=\"text\"></ng-select>\n          </span>\n          </div>\n          </div>\n          <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\n          {{commonService.PageString(pagedData.pager.currentPage+1,pageSizeValue,rowCount)}}\n          </div>\n          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\n          [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\n          [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\n          [pagerNextIcon]=\"'fa fa-angle-double-right'\"\n          [page]=\"pagedData.pager.currentPage+1\"\n          [size]=\"pageSizeValue\"\n          [count]=\"pagedData.pager.totalItems\"\n          [hidden]=\"!((rowCount / pageSize) > 1)\"\n          (change)=\"setPage($event)\">\n          </datatable-pager>\n\n          </ng-template>\n          </ngx-datatable-footer>-->\n          <ngx-datatable-footer>\n            <ng-template ngx-datatable-footer-template\n                         let-rowCount=\"rowCount\"\n                         let-pageSize=\"pageSize\"\n                         let-selectedCount=\"selectedCount\"\n                         let-currentPage=\"curPage\"\n                         let-offset=\"offset\"\n                         let-isVisible=\"isVisible\">\n              <div class=\"responsive-paging d-lg-flex w-100 flex-nowrap my-3\">\n                <div>\n                  <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\n                    <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n                      <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\n                                 bindLabel=\"text\" bindValue=\"text\"></ng-select>\n                    </span>\n                  </div>\n                </div>\n                <div class=\"page-count selected-count\" *ngIf='(rowCount  > 0)'>\n                  {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\n                </div>\n                <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\n                                 [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\n                                 [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\n                                 [pagerNextIcon]=\"'fa fa-angle-double-right'\"\n                                 [page]=\"pagedData.pager.currentPage+1\"\n                                 [size]=\"pageSizeValue\"\n                                 [count]=\"pagedData.pager.totalItems\"\n                                 [hidden]=\"!((rowCount / pageSize) > 1)\"\n                                 (change)=\"setPage($event)\">\n                </datatable-pager>\n              </div>\n            </ng-template>\n          </ngx-datatable-footer>\n        </ngx-datatable>\n      </div>\n      <!--<div class=\"col-12\" *ngIf=\"isDisplay\">\n      <p-chart [data]=\"graphWidgetData\" [options]=\"graphOption\"></p-chart>\n      </div>-->\n      <div class=\"col-lg-12 mb-4\" *ngIf=\"isDisplay\">\n        <div class=\"row\">\n          <div class=\"col-sm-12 col-md-12 col-lg-12\">\n            <div class=\"bg-white p-3 border mt-3\">\n              <p-chart type=\"horizontalBar\" [data]=\"graphWidgetData\" [options]=\"graphOption\"></p-chart>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loading\" class=\"loader\"></app-loader>\n  </div>\n</div>\n<div bsModal #attendancemodel=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Assigned Delivery Date</h4>\n        <button type=\"button\" class=\"close\" (click)=\"closeattendancepopup()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\" style=\" margin-bottom:10px; max-height:1000px; overflow:visible;\">\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <!--<h4>if would like Enerflo to automatically find the best apt time based on availalility.</h4>-->\n              <div class=\"row col-12\">\n                <div class=\"col-12 col-md-12 col-lg-12\">\n                  <label>Select Delivery Date:<span class=\"text-danger\">*</span></label>\n                  <div class=\"form-group\">\n                    <div class=\"form-group datepickerinpop\">\n                      <p-calendar #myStartCalendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\"\n                                  inputStyleClass=\"form-control start-date \" formControlName=\"deliveryDate\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\n                                  [showTime]=\"false\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"false\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\n                                  [ngClass]=\"{'is-invalid': (deliveryDate.invalid && (deliveryDate.dirty || deliveryDate.touched) && deliveryDate.errors?.required) }\">\n                        <p-footer>\n                          <button pButton type=\"button\" label=\"Close\" style=\"color: white;background-color: #dc3545;\" (click)=\"myStartCalendar.overlayVisible = false\"></button>\n                        </p-footer>\n                      </p-calendar>\n\n                      <!--<p-calendar class=\"calendarwidth\" inputStyleClass=\"form-control start-date\" formControlName=\"deliveryDate\" placeholder=\"Select Date\" [showIcon]=\"true\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\n                        [ngClass]=\"{'is-invalid': (deliveryDate.invalid && (deliveryDate.dirty || deliveryDate.touched) && deliveryDate.errors?.required) }\"></p-calendar>-->\n                      <small *ngIf=\"deliveryDate.invalid && (deliveryDate.dirty || deliveryDate.touched) && deliveryDate.errors?.required\"\n                             style=\"color:red;\">Please select Date</small>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <a class=\"btn btn-success text-white\" (click)=\"Save()\"><i class=\"fa fa-save\"></i> Submit</a>\n        <button type=\"submit\" class=\"btn btn-danger text-white\" (click)=\"closeattendancepopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\n      </div>\n    </div>\n  </div>\n  <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>-->\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportlist.component.html":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportlist.component.html ***!
  \***********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\n  <h2 class=\"float-left pr-2\"><strong>Service Appointment Report</strong></h2>\n  <div class=\"breadcrumb-wrapper\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a routerLink=\"/dashboard\">Dashboard</a>\n      </li>\n      <li class=\"active\">Service Appointment Report</li>\n    </ol>\n  </div>\n</div>\n<div class=\"clearfix\"></div>\n<div class=\"row\">\n  <div class=\"col-lg-12 portlets\">\n    <div class=\"panel\" [ngClass]=\"{'disabled':loadSave}\">\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\n        <div class=\"row mt-2\">\n          <div class=\"col-md-12 col-xl-12\">\n            <div class=\"row searchfield\">\n              <div class=\"col-lg-12\">\n                <div class=\"row\">\n                  <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\n                    <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='serviceAppointmentSearch' placeholder=\"Service Appointment Number\" (keyup)='searchServiceAppointmentName($event)'>\n                  </div>\n                  <div class=\"col-lg-4 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\n                    <ng-select #worktype [items]=\"lstWorkType\"\n                               placeholder=\"Select Work Type\" bindValue=\"value\" bindLabel=\"text\"\n                               [closeOnSelect]=\"true\" [(ngModel)]=\"workTypeId\"\n                               (clear)=\"restWorkTypeddl()\">\n                    </ng-select>\n                  </div>\n                  <div class=\"col-lg-4 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\n                    <div class=\"form-group\">\n                      <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From\" [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\n                    <div class=\"form-group\">\n                      <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                  </div>\n\n                  <div class=\"col-lg-4 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\n                    <ng-select #Status [items]=\"StatusListForCheckList\"\n                               placeholder=\"Select Overall Score\" bindValue=\"value\" bindLabel=\"text\"\n                               [closeOnSelect]=\"true\" [(ngModel)]=\"StatusIdChk\"\n                               (clear)=\"reSetDrp()\">\n                    </ng-select>\n                  </div>\n                  <div class=\"col-lg-4 float-left mb-lg-0 mb-2 pl-1 pl-lg-0\">\n                    <div class=\"form-group\">\n                      <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"SearchServiceAppointmentReport()\" tooltip=\"Search\"><span><i class=\"fa fa-search pr-2\"></i> Search</span></a>\n                      <a class=\"btn btn-danger form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh pr-2\"></i> Reset</span></a>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-12 mt-4 mb-2\">\n        <div class=\"w-100 mt-2 mb-0\" *ngIf=\"pagedData.data.length>0\">\n          <span class=\"float-right\">\n            <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" title=\"Download Excel\" tooltip=\"Download Excel\" class=\" btn btn-success mr-1\" style=\"background:#1D6F42; border-color:#1D6F42;\"><i class=\"fa fa-file-excel-o\"></i></a>\n            <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" title=\"Download Pdf\" tooltip=\"Download Pdf\" class=\" btn btn-danger mr-1\" style=\"background:#c0392b; border-color:#c0392b;\"><i class=\"fa fa-file-pdf-o\"></i> </a>           \n          </span>\n        </div>\n      </div>\n      <div class=\"clearfix\"></div>\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\n        <ngx-datatable class=\"bootstrap custom-medium-table-width\"\n                       [rows]=\"pagedData.data\"\n                       [columnMode]=\"'force'\"\n                       [headerHeight]=\"40\"\n                       [footerHeight]=\"40\"\n                       [rowHeight]=\"'auto'\"\n                       [externalPaging]=\"true\"\n                       [externalSorting]=\"true\"\n                       [loadingIndicator]=\"loadSave\"\n                       [count]=\"pagedData.pager.totalItems\"\n                       [offset]=\"pagedData.pager.currentPage\"\n                       [limit]=\"pagedData.pager.pageSize\"\n                       (page)='setPage($event)'\n                       (sort)=\"onSort($event)\">\n          <ngx-datatable-column name=\"Service Appointment Number\" prop=\"AppointmentNumber\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <a class=\" view-list\" [routerLink]=\"['/serviceappointment/view',row.Id]\" href=\"javascript:void(0);\" [title]=\"row.AppointmentNumber\">{{row.AppointmentNumber}}</a>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Work Order Number\" prop=\"WorkOrderNumber\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <a class=\" view-list\" [routerLink]=\"['/workorder/view',row.WorkOrderId]\" href=\"javascript:void(0);\" [title]=\"row.WorkOrderNumber\">{{row.WorkOrderNumber}}</a>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Work Type\" prop=\"WorkType\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\n          <ngx-datatable-column name=\"Status\" prop=\"AppStatus\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <div style=\"max-width:150px !important;\" class=\"status-box\" [title]=\"row.AppStatus\" [ngStyle]=\"{background: '#0b5206'}\">\n                {{row.AppStatus}}\n              </div>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Schedule Start Time\" prop=\"SchedStartTime\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              {{row.SchedStartTime |DateTimeToLocal}}\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Schedule End Time\" prop=\"SchedEndTime\" [sortable]=\"true\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              {{row.SchedEndTime |DateTimeToLocal}}\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Resource Name\" prop=\"ResourceName\" [sortable]=\"false\" headerClass=\"thead-dark\"></ngx-datatable-column>\n          <ngx-datatable-column name=\"Customer Name\" prop=\"contactPerson\" [sortable]=\"false\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <a class=\" view-list\" [routerLink]=\"['/accountslist/view',row.accountId]\" href=\"javascript:void(0);\" [title]=\"row.contactPerson\">{{row.contactPerson}}</a>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Check List Name\" prop=\"CheckListNames\" [sortable]=\"false\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <table *ngIf=\"row.CheckListNames\">\n                <tr *ngFor=\"let item of row.CheckListNames | convertToArrayList\">\n                  <td>\n                    <a href=\"javascript:void(0);\" (click)=\"auditChecklistDetailPopup(item.CheckListId,row.Id)\">\n                      {{item.Name}}\n                    </a>\n                  </td>\n                </tr>\n              </table>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Final Score\" prop=\"CheckListNames\" [sortable]=\"false\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <table *ngIf=\"row.CheckListNames\">\n                <tr *ngFor=\"let item of this.convertToArrayList(row.CheckListNames)\"><td><span>{{item.FinalScoreCount}}/{{item.QuestionCount}}</span></td></tr>\n              </table>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column name=\"Overall Score\" prop=\"OverallScore\" [sortable]=\"false\" headerClass=\"thead-dark\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <div style=\"max-width:150px !important;\" class=\"status-box bg-warning text-dark\" *ngIf=\"row.OverallScore && row.OverallScoreText=='Pending'\">\n                {{row.OverallScore}} <strong> ({{row.OverallScoreText}})</strong>\n              </div>\n              <div style=\"max-width:150px !important;\" class=\"status-box bg-danger\" *ngIf=\"row.OverallScore && row.OverallScoreText=='Fail'\">\n                {{row.OverallScore}} <strong> ({{row.OverallScoreText}})</strong>\n              </div>\n              <div *ngIf=\"row.OverallScore && row.OverallScoreText=='Pass'\" style=\"max-width:150px !important;\"\n                   class=\"status-box bg-success\">\n                {{row.OverallScore}} <strong> ({{row.OverallScoreText}})</strong>\n              </div>\n              <div style=\"max-width:150px !important;\" class=\"status-box bg-warning text-dark\" *ngIf=\"!row.OverallScore && row.OverallScoreText=='Pending'\">\n                {{row.OverallScore}} <strong> ({{row.OverallScoreText}})</strong>\n              </div>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-footer>\n            <ng-template ngx-datatable-footer-template\n                         let-rowCount=\"rowCount\"\n                         let-pageSize=\"pageSize\"\n                         let-selectedCount=\"selectedCount\"\n                         let-currentPage=\"curPage\"\n                         let-offset=\"offset\"\n                         let-isVisible=\"isVisible\">\n              <div class=\"responsive-paging d-lg-flex w-100 flex-nowrap my-3\">\n                <div>\n                  <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\n                    <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n                      <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\n                                 bindLabel=\"text\" bindValue=\"text\"></ng-select>\n                    </span>\n                  </div>\n                </div>\n                <div class=\"page-count selected-count\" *ngIf='(rowCount  > 0)'>\n                  {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\n                </div>\n                <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\n                                 [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\n                                 [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\n                                 [pagerNextIcon]=\"'fa fa-angle-double-right'\"\n                                 [page]=\"pagedData.pager.currentPage+1\"\n                                 [size]=\"pageSizeValue\"\n                                 [count]=\"pagedData.pager.totalItems\"\n                                 [hidden]=\"!((rowCount / pageSize) > 1)\"\n                                 (change)=\"setPage($event)\">\n                </datatable-pager>\n              </div>\n            </ng-template>\n          </ngx-datatable-footer>\n        </ngx-datatable>\n      </div>\n      <div class=\"col-lg-12 mb-4\" *ngIf=\"isDisplay\">\n        <div class=\"row\">\n          <div class=\"col-sm-12 col-md-12 col-lg-12\">\n            <div class=\"bg-white p-3 border\">\n              <p-chart type=\"horizontalBar\" [data]=\"graphWidgetData\" [options]=\"graphOption\"></p-chart>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loading\" class=\"loader\"></app-loader>\n  </div>\n</div>\n<app-auditchecklistpopup #auditCheckList (auditHistoryEvent)=\"auditHistoryEvent()\"></app-auditchecklistpopup>\n");

/***/ }),

/***/ "./src/app/views/solgenreport/nestreport/nestreportlist.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/views/solgenreport/nestreport/nestreportlist.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NvbGdlbnJlcG9ydC9uZXN0cmVwb3J0L25lc3RyZXBvcnRsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/solgenreport/nestreport/nestreportlist.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/solgenreport/nestreport/nestreportlist.component.ts ***!
  \***************************************************************************/
/*! exports provided: NestreportlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestreportlistComponent", function() { return NestreportlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _nestreportservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nestreportservice.service */ "./src/app/views/solgenreport/nestreport/nestreportservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.esm.js");
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










var NestreportlistComponent = /** @class */ (function () {
    function NestreportlistComponent(nestreportserviceService, commonService, fb, toaster, routeActivate, dateTimeToLocal) {
        this.nestreportserviceService = nestreportserviceService;
        this.commonService = commonService;
        this.fb = fb;
        this.toaster = toaster;
        this.routeActivate = routeActivate;
        this.dateTimeToLocal = dateTimeToLocal;
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.defaultDate = new Date();
        this.rowsForExport = [];
        this.isGraphView = false;
        this.DeliveryDateModel = new _nestreportservice_service__WEBPACK_IMPORTED_MODULE_2__["DeliveryDateModel"]();
        this.isListingView = true;
        this.data = [];
        this.accountStatusId = null;
        this.isDisplay = false;
        this.listFilter = '';
        this.sortDir = 'desc';
        this.sortColumn = 'AccountName';
        // totalPageSize: any;
        this.stateId = null;
        this.pageNumber = 0;
        this.deliveryId = null;
        this.stageId = null;
        this.accountId = null;
        this.lstDelivered = null;
        this.loading = false;
        this.pagedData = {
            pager: {},
            data: []
        };
    }
    NestreportlistComponent.prototype.ngOnInit = function () {
        this.SearhName = "";
        this.currentPage = 1;
        this.offset = 1;
        this.pageSizeValue = 15;
        this.getState();
        this.getStageList();
        this.getAccountList();
        this.initForm();
        this.getProductName();
        this.getPageSizes();
        this.SearchNestReport();
        this.GetDeliveryDateTypes();
        this.data = [];
        //setTimeout(function () { this.ShowHorizontalBarGraph(); }, 3000);
        this.getAccountStatus();
    };
    NestreportlistComponent.prototype.getState = function () {
        var _this = this;
        this.commonService.getStatesList().subscribe(function (res) {
            _this.lstState = _this.commonService.states;
        });
    };
    NestreportlistComponent.prototype.getAccountList = function () {
        var _this = this;
        this.commonService.getMasterItemsList('NestReposrt_Account').subscribe(function (result) {
            _this.lstAccountList = _this.commonService.masters;
        });
    };
    NestreportlistComponent.prototype.getAccountStatus = function () {
        var _this = this;
        this.commonService.getMasterItemsList('NestReposrt_AccountStatus').subscribe(function (result) {
            _this.lstAccountStatus = _this.commonService.masters;
        });
    };
    NestreportlistComponent.prototype.searchProductName = function (event) {
        this.listFilter = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchNestReport();
        }
    };
    NestreportlistComponent.prototype.SetAccounts = function (event) {
        this.accountId = event.value;
    };
    NestreportlistComponent.prototype.SetState = function (event) {
        this.stateId = event.value;
    };
    NestreportlistComponent.prototype.SetStage = function (event) {
        this.stageId = event.value;
    };
    NestreportlistComponent.prototype.getStageList = function () {
        var _this = this;
        this.commonService.getMasterItemsList('NestReposrt_AccountStage').subscribe(function (result) {
            _this.lstCurrentStage = _this.commonService.masters;
        });
    };
    NestreportlistComponent.prototype.getProductName = function () {
        var _this = this;
        this.commonService.getMasterItemsList('NestReposrt_ProductName').subscribe(function (result) {
            _this.lstProductName = _this.commonService.masters;
        });
    };
    NestreportlistComponent.prototype.SearchNestReport = function () {
        var _this = this;
        if (this.isDisplay == true) {
            this.ShowHorizontalBarGraph();
        }
        else {
            this.loading = true;
            //this.offset = 1;
            this.nestreportserviceService.getNestReport(this.listFilter, this.deliveryId, this.accountId, this.stateId, this.stageId, this.From, this.To, this.accountStatusId, this.DeliverDateFrom, this.DeliverDateTo, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.isDisplay).toPromise().then(function (response) {
                _this.pagedData = response;
                _this.totalPageSize = _this.pagedData.pager.totalItems;
                _this.totalPageSize = _this.pagedData.pager.totalItems;
                _this.offset = _this.pageNumber + 1;
                _this.loading = false;
            }, function (error) {
                _this.loading = false;
            });
        }
    };
    NestreportlistComponent.prototype.reset = function () {
        this.SearhName = '';
        this.listFilter = '';
        this.getStageList();
        this.getAccountList();
        this.accountId = null;
        this.stateId = null;
        this.stageId = null;
        this.sortDir = 'asc';
        this.sortColumn = 'AccountName';
        this.To = null;
        this.DeliverDateFrom = null;
        this.DeliverDateTo = null;
        this.currentPage = 1;
        this.Stage.clearModel();
        this.SetStateClear.clearModel();
        this.userTypeSelect.clearModel();
        this.accountStatus.clearModel();
        this.Delivered.clearModel();
        this.Product.clearModel();
        this.From = null;
        this.pageNumber = 0;
        this.pageSizeValue = 15;
        this.SearchNestReport();
    };
    //function is used to manage enter key press on search text box
    NestreportlistComponent.prototype.updateFilter = function (event) {
        this.listFilter = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchNestReport();
        }
    };
    NestreportlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    Object.defineProperty(NestreportlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    NestreportlistComponent.prototype.onChange = function ($event) {
        this.SearchNestReport();
    };
    NestreportlistComponent.prototype.setPage = function ($event) {
        this.pageNumber = $event.page - 1;
        var ab = $event.page - 1;
        this.currentPage = ab;
        //this.curPage = ab;
        this.offset = $event.page;
        //this.curPage.setValue($event.page);
        this.SearchNestReport();
    };
    NestreportlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.pageNumber = $event.page - 1;
        this.SearchNestReport();
    };
    NestreportlistComponent.prototype.restStageddl = function () {
        this.stageId = null;
    };
    NestreportlistComponent.prototype.restStateddl = function () {
        this.stateId = null;
    };
    NestreportlistComponent.prototype.restAccountddl = function () {
        this.accountId = null;
    };
    NestreportlistComponent.prototype.restProductddl = function () {
        this.listFilter = null;
    };
    NestreportlistComponent.prototype.restDeliveredddl = function () {
        this.deliveryId = null;
    };
    NestreportlistComponent.prototype.restAccountStatusddl = function () {
        this.accountStatusId = null;
    };
    NestreportlistComponent.prototype.onScrollToEnd = function (dataList, code) {
        this.fetchMore(dataList, code);
    };
    NestreportlistComponent.prototype.fetchMore = function (dataList, code) {
        var _this = this;
        console.log("e", dataList);
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.field_code = code;
        this.len = this.lstAccountList.length;
        this.custom_field_id = 0;
        //this.field_code = dataList[j].field_code;
        // let data = (dataList[j].select_options as any[]);
        //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
        this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.ScrollstAccountList = _this.commonService.customFieldsListData;
            console.log('scrollDataList:', _this.ScrollstAccountList);
            _this.lstAccountList = (_this.lstAccountList).concat(_this.ScrollstAccountList);
        });
    };
    NestreportlistComponent.prototype.onKey = function (e, dataList, code) {
        var _this = this;
        this.len = 0;
        this.field_code = code;
        this.custom_field_id = 0; //dataList[j].custom_field_id;
        //this.field_code = //dataList[j].field_code;
        this.searchText = e.target.value;
        this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.ScrollstAccountList = _this.commonService.customFieldsListData;
            console.log('scrollDataList:', _this.ScrollstAccountList);
            (_this.lstAccountList) = _this.ScrollstAccountList;
        });
    };
    NestreportlistComponent.prototype.onScrollToEndStage = function (dataList, code) {
        this.fetchMoreStage(dataList, code);
    };
    NestreportlistComponent.prototype.fetchMoreStage = function (dataList, code) {
        var _this = this;
        console.log("e", dataList);
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.field_code = code;
        this.len = this.lstCurrentStage.length;
        this.custom_field_id = 0;
        //this.field_code = dataList[j].field_code;
        // let data = (dataList[j].select_options as any[]);
        //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
        this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.ScrollstAccountListStage = _this.commonService.customFieldsListData;
            _this.lstCurrentStage = (_this.lstCurrentStage).concat(_this.ScrollstAccountListStage);
        });
    };
    NestreportlistComponent.prototype.onKeyStage = function (e, dataList, code) {
        var _this = this;
        this.len = 0;
        this.field_code = code;
        this.custom_field_id = 0; //dataList[j].custom_field_id;
        //this.field_code = //dataList[j].field_code;
        this.searchText = e.target.value;
        this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.ScrollstAccountListStage = _this.commonService.customFieldsListData;
            (_this.lstCurrentStage) = _this.ScrollstAccountListStage;
        });
    };
    NestreportlistComponent.prototype.onScrollToEndProduct = function (dataList, code) {
        this.fetchMoreProduct(dataList, code);
    };
    NestreportlistComponent.prototype.fetchMoreProduct = function (dataList, code) {
        var _this = this;
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.field_code = code;
        this.len = this.lstCurrentStage.length;
        this.custom_field_id = 0;
        //this.field_code = dataList[j].field_code;
        // let data = (dataList[j].select_options as any[]);
        //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
        this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.ScrollstAccountListProduct = _this.commonService.customFieldsListData;
            _this.lstProductName = (_this.lstProductName).concat(_this.ScrollstAccountListProduct);
        });
    };
    NestreportlistComponent.prototype.onKeyProduct = function (e, dataList, code) {
        var _this = this;
        this.len = 0;
        this.field_code = code;
        this.custom_field_id = 0; //dataList[j].custom_field_id;
        //this.field_code = //dataList[j].field_code;
        this.searchText = e.target.value;
        this.commonService.GetFixedPageScrollDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.ScrollstAccountListProduct = _this.commonService.customFieldsListData;
            (_this.lstProductName) = _this.ScrollstAccountListProduct;
        });
    };
    NestreportlistComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.nestreportserviceService.getNestReport(this.listFilter, this.deliveryId, this.accountId, this.stateId, this.stageId, this.From, this.To, this.accountStatusId, this.DeliverDateFrom, this.DeliverDateTo, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.isDisplay).toPromise().then(function (response) {
            _this.pagedDataForImport = response;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'State Name': itm.stateName,
                        'Account Name': itm.AccountName,
                        'Account Status': itm.accountStatus,
                        'Current Stage': itm.currentStage,
                        'Customer Signed Date': _this.dateTimeToLocal.transform(itm.CustomerSignedDate, ''),
                        'NTP Date': _this.dateTimeToLocal.transform(itm.NTPDate, ''),
                        'Installation Date': _this.dateTimeToLocal.transform(itm.Installation_Date, ''),
                        'PTO Date': _this.dateTimeToLocal.transform(itm.PTODate, ''),
                        'Date Delivered': _this.dateTimeToLocal.transform(itm.DateDelivered, ''),
                        'Product Name': itm.ProductName,
                        'Product Required ID': itm.ProductRequiredNumber
                    });
                }
                _this.commonService.ExportData(_this.rowsForExport, "Excel", "ProductRequiredReport", null);
                _this.loading = false;
            }
        }, function (error) {
            _this.loading = false;
        });
    };
    NestreportlistComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.nestreportserviceService.getNestReport(this.listFilter, this.deliveryId, this.accountId, this.stateId, this.stageId, this.From, this.To, this.accountStatusId, this.DeliverDateFrom, this.DeliverDateTo, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.isDisplay).toPromise().then(function (response) {
            _this.pagedDataForImport = response;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'State Name': itm.stateName,
                        'Account Name': itm.AccountName,
                        'Account Status': itm.accountStatus,
                        'Current Stage': itm.currentStage,
                        'Customer Signed Date': _this.dateTimeToLocal.transform(itm.CustomerSignedDate, ''),
                        'NTP Date': _this.dateTimeToLocal.transform(itm.NTPDate, ''),
                        'Installation Date': _this.dateTimeToLocal.transform(itm.Installation_Date, ''),
                        'PTO Date': _this.dateTimeToLocal.transform(itm.PTODate, ''),
                        'Date Delivered': _this.dateTimeToLocal.transform(itm.DateDelivered, ''),
                        'Product Name': itm.ProductName,
                        'Product Required ID': itm.ProductRequiredNumber
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "ProductRequiredReport", "Large");
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    NestreportlistComponent.prototype.ShowHorizontalBarGraph = function () {
        var _this = this;
        this.loading = true;
        this.data = [];
        this.nestreportserviceService.getNestReport(this.listFilter, this.deliveryId, this.accountId, this.stateId, this.stageId, this.From, this.To, this.accountStatusId, this.DeliverDateFrom, this.DeliverDateTo, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.isDisplay).toPromise().then(function (response) {
            _this.pagedData = response;
            _this.pagedData.data.forEach(function (t) {
                if (t.StateName != '' && typeof t.StateName != 'undefined') {
                    var obj_1 = {
                        StateName: t.StateName,
                        TotalRecord: t.TotalRecord
                    };
                    _this.data.push(obj_1);
                }
            });
            // }
            if (_this.data != null) {
                _this.graphColumnNames = _this.data.map(function (a) {
                    return a.StateName;
                });
                var arrayValues = [];
                arrayValues = _this.data.map(function (a) {
                    return parseInt(a.TotalRecord);
                });
                var array = [];
                var obj = {
                    label: '',
                    backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    data: arrayValues
                };
                array.push(obj);
                _this.graphWidgetData = {
                    labels: _this.graphColumnNames,
                    datasets: array
                };
                _this.graphOption = {
                    legend: {
                        position: 'bottom'
                    }
                };
            }
            _this.loading = false;
        });
    };
    NestreportlistComponent.prototype.generatePdf1 = function () {
        debugger;
        if (this.isDisplay == true) {
            this.isDisplay = false;
            this.isGraphView = false;
            this.SearchNestReport();
        }
        else if (this.isDisplay == false) {
            this.isDisplay = true;
            this.isGraphView = true;
            this.ShowHorizontalBarGraph();
        }
        else {
            this.isListingView = true;
            //this.SearchNestReport();
        }
    };
    NestreportlistComponent.prototype.GetDeliveryDateTypes = function () {
        this.lstDelivered = [{ text: "Is Delivered", value: "IsDelivered" },
            { text: "Not Delivered", value: "NotDelivered" }];
    };
    ;
    NestreportlistComponent.prototype.AssignDeliveryDate = function (row) {
        console.log("row", row);
        debugger;
        this.initForm;
        this.productRequiredId.setValue(row.productRequiredId);
        this.productRequiredIds = row.productRequiredId;
        //this.deliveryDate.setValue(row.DateDelivered == null ? null : row.DateDelivered.toString());
        var EDate = (row.DateDelivered == null ? null : new Date(row.DateDelivered));
        this.addForm.patchValue({
            deliveryDate: EDate,
            productRequiredId: row.productRequiredId
        });
        //this.addForm.reset();
        this.attendancemodel.show();
    };
    NestreportlistComponent.prototype.closeattendancepopup = function () {
        this.addForm.reset();
        this.attendancemodel.hide();
    };
    NestreportlistComponent.prototype.initForm = function () {
        this.addForm = this.fb.group({
            productRequiredId: [null],
            deliveryDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
        });
    };
    Object.defineProperty(NestreportlistComponent.prototype, "productRequiredId", {
        get: function () { return this.addForm.get('productRequiredId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NestreportlistComponent.prototype, "deliveryDate", {
        get: function () { return this.addForm.get('deliveryDate'); },
        enumerable: true,
        configurable: true
    });
    NestreportlistComponent.prototype.Save = function () {
        var _this = this;
        debugger;
        if (this.addForm.valid) {
            this.DeliveryDateModel.productRequiredId = this.productRequiredIds;
            this.DeliveryDateModel.deliveryDate = this.addForm.value.deliveryDate;
            this.nestreportserviceService.AddEditDeliveryDate(this.DeliveryDateModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    //this.router.navigate(["/calendar"]);
                    _this.addForm.reset();
                    _this.attendancemodel.hide();
                    _this.SearchNestReport();
                }
                else {
                    //this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                //this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addForm);
        }
    };
    NestreportlistComponent.prototype.close = function (event) {
        //this.startCalendar.destroy() = true;
    };
    NestreportlistComponent.prototype.GetCompareDateTimeResult = function (sDate, eDate, sTitle, eTitle) {
        debugger;
        //this.StartDate = sDate;
        //this.EndDate = eDate;
        this.addForm.get('deliveryDate').setValue(sDate);
    };
    NestreportlistComponent.ctorParameters = function () { return [
        { type: _nestreportservice_service__WEBPACK_IMPORTED_MODULE_2__["NestreportserviceService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_5__["DateTimeToLocalPipe"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Stage', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], NestreportlistComponent.prototype, "Stage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('SetStateClear', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], NestreportlistComponent.prototype, "SetStateClear", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('userTypeSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], NestreportlistComponent.prototype, "userTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Product', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], NestreportlistComponent.prototype, "Product", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('AccountStatusSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], NestreportlistComponent.prototype, "accountStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('attendancemodel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], NestreportlistComponent.prototype, "attendancemodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('myStartCalendar', { static: false }),
        __metadata("design:type", _fullcalendar_core__WEBPACK_IMPORTED_MODULE_9__["Calendar"])
    ], NestreportlistComponent.prototype, "startCalendar", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Delivered', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], NestreportlistComponent.prototype, "Delivered", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], NestreportlistComponent.prototype, "offset", void 0);
    NestreportlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-nestreportlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./nestreportlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgenreport/nestreport/nestreportlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./nestreportlist.component.scss */ "./src/app/views/solgenreport/nestreport/nestreportlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_nestreportservice_service__WEBPACK_IMPORTED_MODULE_2__["NestreportserviceService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"], ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_5__["DateTimeToLocalPipe"]])
    ], NestreportlistComponent);
    return NestreportlistComponent;
}());



/***/ }),

/***/ "./src/app/views/solgenreport/nestreport/nestreportservice.service.ts":
/*!****************************************************************************!*\
  !*** ./src/app/views/solgenreport/nestreport/nestreportservice.service.ts ***!
  \****************************************************************************/
/*! exports provided: NestreportserviceService, DeliveryDateModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestreportserviceService", function() { return NestreportserviceService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryDateModel", function() { return DeliveryDateModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
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





var NestreportserviceService = /** @class */ (function () {
    function NestreportserviceService(http, commonService, router) {
        this.http = http;
        this.commonService = commonService;
        this.router = router;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    NestreportserviceService.prototype.getNestReport = function (name, deliveryId, accountId, stateId, stageId, From, To, accountStatusId, DeliverDateFrom, DeliverDateTo, sortColumn, sortDir, page, pageSize, isGraph) {
        if (typeof From == "undefined" || From == null) {
            From = null;
        }
        else {
            From = From.toDateString();
        }
        if (typeof To == "undefined" || To == null) {
            To = null;
        }
        else {
            To = To.toDateString();
        }
        if (typeof DeliverDateFrom == "undefined" || DeliverDateFrom == null) {
            DeliverDateFrom = null;
        }
        else {
            DeliverDateFrom = DeliverDateFrom.toDateString();
        }
        if (typeof DeliverDateTo == "undefined" || DeliverDateTo == null) {
            DeliverDateTo = null;
        }
        else {
            DeliverDateTo = DeliverDateTo.toDateString();
        }
        return this.http.get(this.baseUri + ("Report/GetNestReport?name=" + name + "&deliveryId=" + deliveryId + "&accountId=" + accountId + "&stateId=" + stateId + "&stageId=" + stageId + "&From=" + From + "&To=" + To + "&accountStatusId=" + accountStatusId + "&DeliverDateFrom=" + DeliverDateFrom + "&DeliverDateTo=" + DeliverDateTo + "\n&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&isGraph=" + isGraph));
        //.pipe(
        //  map((response: any) => {
        //      this.pagedData = response;
        //      return true;
        //  })
        //);
    };
    NestreportserviceService.prototype.AddEditDeliveryDate = function (model) {
        return this.http.post(this.baseUri + "Report/AddEditDeliveryDate", model);
    };
    NestreportserviceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
    ]; };
    NestreportserviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], NestreportserviceService);
    return NestreportserviceService;
}());

var DeliveryDateModel = /** @class */ (function () {
    function DeliveryDateModel() {
        this.productRequiredId = '';
        this.deliveryDate = '';
    }
    return DeliveryDateModel;
}());



/***/ }),

/***/ "./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportlist.component.scss":
/*!*********************************************************************************************************!*\
  !*** ./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportlist.component.scss ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NvbGdlbnJlcG9ydC9zZXJ2aWNlYXBwb2ludG1lbnRyZXBvcnQvc2VydmljZWFwcG9pbnRtZW50cmVwb3J0bGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportlist.component.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportlist.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: ServiceappointmenreportlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceappointmenreportlistComponent", function() { return ServiceappointmenreportlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _serviceappointmentreportservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serviceappointmentreportservice.service */ "./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
/* harmony import */ var _servicesappointment_auditchecklistpopup_auditchecklistpopup_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../servicesappointment/auditchecklistpopup/auditchecklistpopup.component */ "./src/app/views/servicesappointment/auditchecklistpopup/auditchecklistpopup.component.ts");
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







var ServiceappointmenreportlistComponent = /** @class */ (function () {
    function ServiceappointmenreportlistComponent(serviceappointmentreportserviceService, commonService, routeActivate, dateTimeToLocal, auditchecklistpopupComponent) {
        this.serviceappointmentreportserviceService = serviceappointmentreportserviceService;
        this.commonService = commonService;
        this.routeActivate = routeActivate;
        this.dateTimeToLocal = dateTimeToLocal;
        this.auditchecklistpopupComponent = auditchecklistpopupComponent;
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.rowsForExport = [];
        this.data = [];
        this.serviceAppointmentSearch = '';
        this.sortDir = 'desc';
        this.sortColumn = 'Id';
        this.workTypeId = null;
        this.pageNumber = 0;
        this.StatusIdChk = null;
        this.loading = false;
        this.pagedData = {
            pager: {},
            data: []
        };
    }
    ;
    ServiceappointmenreportlistComponent.prototype.ngOnInit = function () {
        this.SearhName = "";
        this.currentPage = 1;
        this.offset = 1;
        this.pageSizeValue = 15;
        this.getStageList();
        this.GetQuestionTypes();
        this.getPageSizes();
        this.SearchServiceAppointmentReport();
        this.data = [];
    };
    ServiceappointmenreportlistComponent.prototype.searchServiceAppointmentName = function (event) {
        this.serviceAppointmentSearch = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchServiceAppointmentReport();
        }
    };
    ServiceappointmenreportlistComponent.prototype.auditChecklistDetailPopup = function (checkList_Id, serviceAppointmentId) {
        //debugger;
        this.auditCheckListModel.ShowPopup(checkList_Id, serviceAppointmentId, false);
    };
    //auditChecklistDetailPopup(checkList_Id: number, serviceAppointmentId: number) {
    //  //debugger;
    //  this.auditCheckListModel.auditChecklistDetail(checkList_Id, serviceAppointmentId);
    //}
    ServiceappointmenreportlistComponent.prototype.GetSortOrder = function (prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            }
            else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        };
    };
    ServiceappointmenreportlistComponent.prototype.getStageList = function () {
        var _this = this;
        this.commonService.getMasterItemsList('WorkType').subscribe(function (result) {
            _this.lstWorkType = _this.commonService.masters;
            //this.lstWorkType = this.commonService.masters.sort(this.GetSortOrder("text"));
        });
    };
    ServiceappointmenreportlistComponent.prototype.SearchServiceAppointmentReport = function () {
        var _this = this;
        this.loading = true;
        this.serviceappointmentreportserviceService.getServiceAppointmentReport(this.serviceAppointmentSearch, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.From, this.To, this.workTypeId, this.StatusIdChk).toPromise().then(function (response) {
            _this.pagedData = response;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.offset = _this.pageNumber + 1;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ServiceappointmenreportlistComponent.prototype.reset = function () {
        this.SearhName = '';
        this.serviceAppointmentSearch = '';
        this.sortDir = 'asc';
        this.sortColumn = 'Id';
        this.currentPage = 1;
        this.StatusIdChk = null;
        this.worktype.clearModel();
        this.From = null;
        this.To = null;
        this.Status.clearModel();
        this.pageNumber = 0;
        this.pageSizeValue = 15;
        this.SearchServiceAppointmentReport();
    };
    ServiceappointmenreportlistComponent.prototype.restWorkTypeddl = function () {
        this.workTypeId = null;
    };
    ServiceappointmenreportlistComponent.prototype.reSetDrp = function () {
        this.StatusIdChk = null;
    };
    //function is used to manage enter key press on search text box
    ServiceappointmenreportlistComponent.prototype.updateFilter = function (event) {
        this.serviceAppointmentSearch = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchServiceAppointmentReport();
        }
    };
    ServiceappointmenreportlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    Object.defineProperty(ServiceappointmenreportlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ServiceappointmenreportlistComponent.prototype.onChange = function ($event) {
        this.SearchServiceAppointmentReport();
    };
    ServiceappointmenreportlistComponent.prototype.setPage = function ($event) {
        this.pageNumber = $event.page - 1;
        var ab = $event.page - 1;
        this.currentPage = ab;
        this.offset = $event.page;
        this.SearchServiceAppointmentReport();
    };
    ServiceappointmenreportlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.pageNumber = $event.page - 1;
        this.SearchServiceAppointmentReport();
    };
    ServiceappointmenreportlistComponent.prototype.convertToArrayList = function (data) {
        var _result = [];
        if (data) {
            _result = JSON.parse(data);
        }
        return _result;
    };
    ServiceappointmenreportlistComponent.prototype.convertToArrayListName = function (data) {
        var _result = [];
        var _resultReturn = [];
        if (data) {
            _result = JSON.parse(data);
        }
        _result.forEach(function (t) {
            var obj = {
                Name: t.Name
            };
            _resultReturn.push(obj);
        });
        var result = _resultReturn.map(function (val) {
            return val.Name;
        }).join(',');
        console.log("resultCOMMA", result);
        return result;
    };
    ServiceappointmenreportlistComponent.prototype.convertToArrayListFinalScore = function (data) {
        var _result = [];
        var _resultReturn = [];
        if (data) {
            _result = JSON.parse(data);
        }
        _result.forEach(function (t) {
            var obj = {
                Name: t.FinalScoreCount + '/' + t.QuestionCount
            };
            _resultReturn.push(obj);
        });
        var result = _resultReturn.map(function (val) {
            return val.Name;
        }).join(',');
        return result;
    };
    ServiceappointmenreportlistComponent.prototype.auditHistoryEvent = function () {
        this.SearchServiceAppointmentReport();
    };
    ServiceappointmenreportlistComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.serviceappointmentreportserviceService.getServiceAppointmentReport(this.serviceAppointmentSearch, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.From, this.To, this.workTypeId, this.StatusIdChk).toPromise().then(function (response) {
            _this.pagedDataForImport = response;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Service Appointment Number': itm.AppointmentNumber,
                        'Work Order Number': itm.WorkOrderNumber,
                        'Work Type': itm.WorkType,
                        'Status': itm.AppStatus,
                        'Schedule Start Time': _this.dateTimeToLocal.transform(itm.SchedStartTime, ''),
                        'Schedule End Time': _this.dateTimeToLocal.transform(itm.SchedEndTime, ''),
                        'Resource Name': itm.ResourceName,
                        'Customer Name': itm.contactPerson,
                        'Check List Name': _this.convertToArrayListName(itm.CheckListNames),
                        'Final Score': _this.convertToArrayListFinalScore(itm.CheckListNames),
                        'Overall Score': itm.OverallScore + "(" + itm.OverallScoreText + ")",
                    });
                }
                _this.commonService.ExportData(_this.rowsForExport, "Excel", "ServiceAppointmenReport", null);
                _this.loading = false;
            }
        }, function (error) {
            _this.loading = false;
        });
    };
    ServiceappointmenreportlistComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.serviceappointmentreportserviceService.getServiceAppointmentReport(this.serviceAppointmentSearch, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.From, this.To, this.workTypeId, this.StatusIdChk).toPromise().then(function (response) {
            _this.pagedDataForImport = response;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Service Appointment Number': itm.AppointmentNumber,
                        'Work Order Number': itm.WorkOrderNumber,
                        'Work Type': itm.WorkType,
                        'Status': itm.AppStatus,
                        'Schedule Start Time': _this.dateTimeToLocal.transform(itm.SchedStartTime, ''),
                        'Schedule End Time': _this.dateTimeToLocal.transform(itm.SchedEndTime, ''),
                        'Resource Name': itm.ResourceName,
                        'Customer Name': itm.contactPerson,
                        'Check List Name': _this.convertToArrayListName(itm.CheckListNames),
                        'Final Score': _this.convertToArrayListFinalScore(itm.CheckListNames),
                        'Overall Score': itm.OverallScore + "(" + itm.OverallScoreText + ")",
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "ServiceAppointmenReport", "Large");
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    //DownloadCSV() {
    //  this.loading = true;
    //  this.rowsForExport = [];
    //  this.serviceappointmentreportserviceService.getServiceAppointmentReport(this.serviceAppointmentSearch, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.From, this.To, this.workTypeId).toPromise().then((response) => {
    //    this.pagedDataForImport = response;
    //    if (this.pagedDataForImport.data.length > 0) {
    //      for (let itm of this.pagedDataForImport.data) {
    //        this.rowsForExport.push({
    //          'Service Appointment Number': itm.AppointmentNumber,
    //          'Work Order Number': itm.WorkOrderNumber,
    //          'Work Type': itm.WorkType,
    //          'Schedule Start Time': this.dateTimeToLocal.transform(itm.SchedStartTime, ''),
    //          'Schedule End Time': this.dateTimeToLocal.transform(itm.SchedEndTime, ''),
    //          'Resource Name': itm.ResourceName,
    //          'Check List Name': this.convertToArrayListName(itm.CheckListNames),
    //          'Final Score': this.convertToArrayListFinalScore(itm.CheckListNames)
    //        });
    //      }
    //      this
    //      this.commonService.ExportData(this.rowsForExport, 'CSV', "ServiceAppointmenReport", "Large");
    //    } else { }
    //    this.loading = false;
    //  }, error => {
    //    this.loading = false;
    //  });
    //}
    ServiceappointmenreportlistComponent.prototype.GetQuestionTypes = function () {
        var statusList = [{ text: "Pending", value: "Pending" }, { text: "Fail", value: "Fail" },
            { text: "Pass", value: "Pass" }];
        this.StatusListForCheckList = statusList;
    };
    ;
    ServiceappointmenreportlistComponent.ctorParameters = function () { return [
        { type: _serviceappointmentreportservice_service__WEBPACK_IMPORTED_MODULE_2__["ServiceappointmentreportserviceService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_5__["DateTimeToLocalPipe"] },
        { type: _servicesappointment_auditchecklistpopup_auditchecklistpopup_component__WEBPACK_IMPORTED_MODULE_6__["AuditchecklistpopupComponent"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('worktype', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], ServiceappointmenreportlistComponent.prototype, "worktype", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Status', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], ServiceappointmenreportlistComponent.prototype, "Status", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('SetStateClear', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], ServiceappointmenreportlistComponent.prototype, "SetStateClear", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('userTypeSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], ServiceappointmenreportlistComponent.prototype, "userTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Product', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], ServiceappointmenreportlistComponent.prototype, "Product", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('auditCheckList', { static: false }),
        __metadata("design:type", _servicesappointment_auditchecklistpopup_auditchecklistpopup_component__WEBPACK_IMPORTED_MODULE_6__["AuditchecklistpopupComponent"])
    ], ServiceappointmenreportlistComponent.prototype, "auditCheckListModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ServiceappointmenreportlistComponent.prototype, "offset", void 0);
    ServiceappointmenreportlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-serviceappointmentreportlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./serviceappointmentreportlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./serviceappointmentreportlist.component.scss */ "./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_serviceappointmentreportservice_service__WEBPACK_IMPORTED_MODULE_2__["ServiceappointmentreportserviceService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_5__["DateTimeToLocalPipe"], _servicesappointment_auditchecklistpopup_auditchecklistpopup_component__WEBPACK_IMPORTED_MODULE_6__["AuditchecklistpopupComponent"]])
    ], ServiceappointmenreportlistComponent);
    return ServiceappointmenreportlistComponent;
}());



/***/ }),

/***/ "./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportservice.service.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportservice.service.ts ***!
  \********************************************************************************************************/
/*! exports provided: ServiceappointmentreportserviceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceappointmentreportserviceService", function() { return ServiceappointmentreportserviceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
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





var ServiceappointmentreportserviceService = /** @class */ (function () {
    function ServiceappointmentreportserviceService(http, commonService, router) {
        this.http = http;
        this.commonService = commonService;
        this.router = router;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    ServiceappointmentreportserviceService.prototype.getServiceAppointmentReport = function (serviceAppointmentSearch, sortColumn, sortDir, page, pageSize, From, To, workTypeId, StatusIdChk) {
        if (typeof From == "undefined" || From == null) {
            From = null;
        }
        else {
            From = From.toDateString();
        }
        if (typeof To == "undefined" || To == null) {
            To = null;
        }
        else {
            To = To.toDateString();
        }
        return this.http.get(this.baseUri + ("Report/GetServiceAppointmentReportList?serviceAppointmentSearch=" + serviceAppointmentSearch + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&workTypeId=" + workTypeId + "&From=" + From + "&To=" + To + "&StatusIdChk=" + StatusIdChk));
        //.pipe(
        //  map((response: any) => {          
        //      this.pagedData = response;
        //      return true;          
        //  })
        //);
    };
    ServiceappointmentreportserviceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
    ]; };
    ServiceappointmentreportserviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], ServiceappointmentreportserviceService);
    return ServiceappointmentreportserviceService;
}());



/***/ }),

/***/ "./src/app/views/solgenreport/solgenreport-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/solgenreport/solgenreport-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: SolgenreportRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenreportRoutingModule", function() { return SolgenreportRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _nestreport_nestreportlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nestreport/nestreportlist.component */ "./src/app/views/solgenreport/nestreport/nestreportlist.component.ts");
/* harmony import */ var _serviceappointmentreport_serviceappointmentreportlist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./serviceappointmentreport/serviceappointmentreportlist.component */ "./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportlist.component.ts");
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
    { path: 'nestreport', component: _nestreport_nestreportlist_component__WEBPACK_IMPORTED_MODULE_2__["NestreportlistComponent"], data: { title: 'Nest Report' } },
    { path: 'serviceappointmentreport', component: _serviceappointmentreport_serviceappointmentreportlist_component__WEBPACK_IMPORTED_MODULE_3__["ServiceappointmenreportlistComponent"], data: { title: 'Service Appointment Report' } },
];
var SolgenreportRoutingModule = /** @class */ (function () {
    function SolgenreportRoutingModule() {
    }
    SolgenreportRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], SolgenreportRoutingModule);
    return SolgenreportRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/solgenreport/solgenreport.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/solgenreport/solgenreport.module.ts ***!
  \***********************************************************/
/*! exports provided: SolgenreportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgenreportModule", function() { return SolgenreportModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _solgenreport_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./solgenreport-routing.module */ "./src/app/views/solgenreport/solgenreport-routing.module.ts");
/* harmony import */ var _nestreport_nestreportservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nestreport/nestreportservice.service */ "./src/app/views/solgenreport/nestreport/nestreportservice.service.ts");
/* harmony import */ var _nestreport_nestreportlist_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nestreport/nestreportlist.component */ "./src/app/views/solgenreport/nestreport/nestreportlist.component.ts");
/* harmony import */ var primeng_chart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/chart */ "./node_modules/primeng/chart.js");
/* harmony import */ var primeng_chart__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_chart__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _serviceappointmentreport_serviceappointmentreportlist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./serviceappointmentreport/serviceappointmentreportlist.component */ "./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportlist.component.ts");
/* harmony import */ var _serviceappointmentreport_serviceappointmentreportservice_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./serviceappointmentreport/serviceappointmentreportservice.service */ "./src/app/views/solgenreport/serviceappointmentreport/serviceappointmentreportservice.service.ts");
/* harmony import */ var _servicesappointment_auditchecklistpopup_auditchecklistpopup_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../servicesappointment/auditchecklistpopup/auditchecklistpopup.component */ "./src/app/views/servicesappointment/auditchecklistpopup/auditchecklistpopup.component.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var SolgenreportModule = /** @class */ (function () {
    function SolgenreportModule() {
    }
    SolgenreportModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _nestreport_nestreportlist_component__WEBPACK_IMPORTED_MODULE_5__["NestreportlistComponent"],
                _serviceappointmentreport_serviceappointmentreportlist_component__WEBPACK_IMPORTED_MODULE_7__["ServiceappointmenreportlistComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _solgenreport_routing_module__WEBPACK_IMPORTED_MODULE_3__["SolgenreportRoutingModule"], primeng_chart__WEBPACK_IMPORTED_MODULE_6__["ChartModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalModule"]
            ],
            providers: [
                _nestreport_nestreportservice_service__WEBPACK_IMPORTED_MODULE_4__["NestreportserviceService"],
                _serviceappointmentreport_serviceappointmentreportservice_service__WEBPACK_IMPORTED_MODULE_8__["ServiceappointmentreportserviceService"],
                _servicesappointment_auditchecklistpopup_auditchecklistpopup_component__WEBPACK_IMPORTED_MODULE_9__["AuditchecklistpopupComponent"]
            ]
        })
    ], SolgenreportModule);
    return SolgenreportModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-solgenreport-solgenreport-module.js.map