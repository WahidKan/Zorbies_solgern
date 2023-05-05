(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-report-report-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/commissionpaidreport/commissionpaidreport.component.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/commissionpaidreport/commissionpaidreport.component.html ***!
  \*****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Commission Paid Report </span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Commission Paid Report  </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>         <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Lease Number/Business Name/Contact Name\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Date From\" [(ngModel)]=\"expFrom\" [maxDate]=\"expTo\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Date To\" [(ngModel)]=\"expTo\" [minDate]=\"expFrom\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-5 col-lg-6 col-xl-2 mr-auto\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4 mb-2\">\r\n              <h3 class=\"heading float-left w-100\" *ngIf=\"pagedData.data.length>0\">\r\n                <div class=\"text-right float-md-right mt-2 mt-md-0\">\r\n                  <div class=\"mb-0\">\r\n                    <div class=\"input-group\">\r\n                      <small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>\r\n                      <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" class=\" text-success mb-3 mb-xl-0 px-1\"><i class=\"fa fa-file-excel\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fas fa-file-pdf\" style=\"font-size:22px;\"></i></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </h3>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"col-md-12\">\r\n              <div class=\"table-responsive\" id=\"leaseReportTable\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap custom-big-table-width\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"50\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"ContactBussinessName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Contact Name\" prop=\"CustomerName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Lease# \" prop=\"LeaseNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Lease Description\" prop=\"LeaseDescription\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Placement Fee\" prop=\"PlacementFee\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.PlacementFee | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"1st Payment\" prop=\"FirstPayment\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.FirstPayment | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"License Fee\" prop=\"LicenseFee\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.LicenseFee | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Total Income\" prop=\"TotalIncome\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.TotalIncome | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Exec Commission \" prop=\"ExecCommision\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.ExecCommision | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/creditreporttraking/creditreporttracking.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/creditreporttraking/creditreporttracking.component.html ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Credit Report Tracking</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Credit Report Tracking </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>         <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n\r\n                  \r\n\r\n                    <div class=\"col-6 col-md-6 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Business Name/Contact Name\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-5 col-lg-6 col-xl-2 mr-auto\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4 mb-2\">\r\n              <h3 class=\"heading float-left w-100\" *ngIf=\"pagedData.data.length>0\">\r\n                <div class=\"text-right float-md-right mt-2 mt-md-0\">\r\n                  <div class=\"mb-0\">\r\n                    <div class=\"input-group\">\r\n                      <small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>\r\n                      <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" class=\" text-success mb-3 mb-xl-0 px-1\"><i class=\"fa fa-file-excel\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fas fa-file-pdf\" style=\"font-size:22px;\"></i></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </h3>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"col-md-12\">\r\n              <div class=\"table-responsive\" id=\"leaseReportTable\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable  #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"50\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Bussiness Name \" prop=\"ContactBussinessName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Contact Name\" prop=\"ContactName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Guarantor\" prop=\"GauranterName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Credit Report Date\" prop=\"CreditReportDate\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.CreditReportDate}}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/customer-log-report/customer-log-report.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/customer-log-report/customer-log-report.component.html ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Customer Log Report</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Customer Log Report</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>         <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <ng-select #leseStatusSelect [items]=\"lstBusinessContact\"\r\n                                   placeholder=\"Select Business Contact\" bindValue=\"value\" bindLabel=\"text\"\r\n                                   [closeOnSelect]=\"true\" [(ngModel)]=\"contactStatus\"\r\n                                   (change)=\"SetContactStatus($event.value)\">\r\n                        </ng-select>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Proposal Number\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <ng-select #bankStatus [items]=\"lstBanks\"\r\n                                   placeholder=\"Select Bank\" bindValue=\"value\" bindLabel=\"text\"\r\n                                   [closeOnSelect]=\"true\" [(ngModel)]=\"bankName\"\r\n                                   (change)=\"SetBankName($event.value)\">\r\n                        </ng-select>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Date From\" [(ngModel)]=\"expFrom\" [maxDate]=\"expTo\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Date To\" [(ngModel)]=\"expTo\" [minDate]=\"expFrom\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-5 col-lg-6 col-xl-2 mr-auto\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4 mb-2\">\r\n              <h3 class=\"heading float-left w-100\" *ngIf=\"pagedData.data.length>0\">\r\n                <div class=\"text-right float-md-right mt-2 mt-md-0\">\r\n                  <div class=\"mb-0\">\r\n                    <div class=\"input-group\">\r\n                      <small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>\r\n                      <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" class=\" text-success mb-3 mb-xl-0 px-1\"><i class=\"fa fa-file-excel\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fas fa-file-pdf\" style=\"font-size:22px;\"></i></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </h3>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"col-md-12\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap custom-big-table-width\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"50\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Proposal#\" prop=\"LeaseNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"BusinessName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Contact Name\" prop=\"ContactName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Collateral Information\" prop=\"CollateralInfo\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.CollateralInfo}}\">\r\n                          {{row.CollateralInfo | truncate}}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Collateral Description\" prop=\"LeaseDescription\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.LeaseDescription}}\">\r\n                          {{row.LeaseDescription | truncate}}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Insurance Expiration Date\" prop=\"InsuranceExpirationDate\" [width]=\"250\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span *ngIf=\"row.InsuranceExpirationDate==null\">N/A</span>\r\n                        <span *ngIf=\"row.InsuranceExpirationDate!=null\">{{row.InsuranceExpirationDate}}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Term\" prop=\"LeaseTerm\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Proposal Rate\" prop=\"LeaseRate\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.LeaseRate/100 | percent}}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Salesman\" prop=\"LeaseCreatedBy\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Bank\" prop=\"BankName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Total Proposal Amount\" prop=\"LeaseTotalAmount\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.LeaseTotalAmount | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Placement Fee\" prop=\"LeasePlacementFee\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.LeasePlacementFee | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Ist Payment\" prop=\"FirstPayment\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.FirstPayment | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"License Fee\" prop=\"LicenseFee\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.LicenseFee | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Total Income\" prop=\"TotalIncome\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.TotalIncome | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Exec Commission\" prop=\"ExecCommission\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.ExecCommission | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Net Revenue Solgen\" prop=\"NetRevenueSolgen\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.NetRevenueSolgen | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Margin\" prop=\"Margin\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.Margin}}%</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/insurancetracking/insurancetracking.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/insurancetracking/insurancetracking.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Insurance Tracking </span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Insurance Tracking </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                  <div class=\"form-group mb-xl-0\">\r\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Proposal Number/Business Name/Contact Name\"\r\n                           (keyup)='updateFilter($event)'>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                  <div class=\"form-group\">\r\n                    <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Date From\" [(ngModel)]=\"expFrom\" [maxDate]=\"expTo\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                  <div class=\"form-group\">\r\n                    <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Date To\" [(ngModel)]=\"expTo\" [minDate]=\"expFrom\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                  <div class=\"form-group mb-xl-0\">\r\n                    <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"Search()\" value=\"Search\">\r\n                    <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"ResetSearch()\" />\r\n                  </div>\r\n\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4 mb-2\">\r\n              <h3 class=\"heading float-left w-100\" *ngIf=\"pagedData.data.length>0\">\r\n                <div class=\"text-right float-md-right mt-2 mt-md-0\">\r\n                  <div class=\"mb-0\">\r\n                    <div class=\"input-group\">\r\n                      <small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>\r\n                      <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" class=\" text-success mb-3 mb-xl-0 px-1\"><i class=\"fa fa-file-excel\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fas fa-file-pdf\" style=\"font-size:22px;\"></i></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </h3>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"col-md-12\">\r\n              <div class=\"table-responsive\" id=\"leaseReportTable\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable  #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"50\"\r\n                                 [footerHeight]=\"50\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column  name=\"Proposal#\" prop=\"Lease\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"BusinessName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Contact Name\" prop=\"ContactName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Insurance Expiration Date\" prop=\"InsuranceExpirationDate\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div *ngIf=\"row.InsuranceExpirationDate==null\">\r\n                          <span>N/A</span>\r\n                        </div>\r\n                        <div *ngIf=\"row.InsuranceExpirationDate!=null\">\r\n                          <span>{{row.InsuranceExpirationDate}}</span>\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/leaseinventoryreport/leaseinventoryreport.component.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/leaseinventoryreport/leaseinventoryreport.component.html ***!
  \*****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Proposal Inventory Report </span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Proposal Inventory Report </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <ng-select #bankStatus [items]=\"lstBanks\"\r\n                                   placeholder=\"Select Bank\" bindValue=\"value\" bindLabel=\"text\"\r\n                                   [closeOnSelect]=\"true\" [(ngModel)]=\"bankName\"\r\n                                   (change)=\"SetBankName($event.value)\">\r\n                        </ng-select>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <ng-select #leseStatusSelect [items]=\"lstUserType\"\r\n                                   placeholder=\"Select Proposal Status\" bindValue=\"value\" bindLabel=\"text\"\r\n                                   [closeOnSelect]=\"true\" [(ngModel)]=\"leaseStatus\"\r\n                                   (change)=\"SetLeaseStatus($event.value)\">\r\n                        </ng-select>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From\" [(ngModel)]=\"expFrom\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To\" [(ngModel)]=\"expTo\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='searhName' placeholder=\"Search By Proposal Number/Business Name/Customer Name/Salesman\"\r\n                               (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"SearchLease()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"ResetSearch()\" />\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12 text-xl-right\"></div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4 mb-2\">\r\n              <h3 class=\"heading float-left w-100\" *ngIf=\"pagedData.data.length>0\">                \r\n                <div class=\"text-right float-md-right mt-2 mt-md-0\">\r\n                  <div class=\"mb-0\">\r\n                    <div class=\"input-group\">\r\n                      <small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>\r\n                      <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" class=\" text-success mb-3 mb-xl-0 px-1\"><i class=\"fa fa-file-excel\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fas fa-file-pdf\" style=\"font-size:22px;\"></i></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </h3>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"col-md-12\">\r\n              <div class=\"table-responsive\" id=\"leaseReportTable\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable  #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column [width]=\"80\" name=\"Proposal#\" prop=\"Lease\" [sortable]=\"true\">\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"BusinessName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Customer\" prop=\"Customer\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Date\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.Date}}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Gross\" prop=\"GrossAmount\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Salesman\" prop=\"Salesman\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Bank\" prop=\"Bank\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"VIN#\" prop=\"VIN\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Total\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.Total | currency :'GBP':'$':'1.2-2' }}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/leasetrackingreport/leasetrackingreportlist.component.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/leasetrackingreport/leasetrackingreportlist.component.html ***!
  \*******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Proposal Traking Report</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Proposal Traking Report</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>       <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <ng-select #bankStatus [items]=\"lstBanks\"\r\n                                   placeholder=\"Select Bank\" bindValue=\"value\" bindLabel=\"text\"\r\n                                   [closeOnSelect]=\"true\" [(ngModel)]=\"bankName\"\r\n                                   (change)=\"SetBankName($event.value)\">\r\n                        </ng-select>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From\" [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From Funded\" [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To Funded\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search by Proposal Number\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-3 col-xl-2\">\r\n                      <div class=\"form-group\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"SearchLeaseTrackingReport()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"ResetSearch()\" />\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4 mb-2\">\r\n              <h3 class=\"heading float-left w-100\" *ngIf=\"pagedData.data.length>0\">\r\n                <div class=\"text-right float-md-right mt-2 mt-md-0\">\r\n                  <div class=\"mb-0\">\r\n                    <div class=\"input-group\">\r\n                      <small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>\r\n                      <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" class=\" text-success mb-3 mb-xl-0 px-1\"><i class=\"fa fa-file-excel\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fas fa-file-pdf\" style=\"font-size:22px;\"></i></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </h3>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable class=\"bootstrap custom-medium-table-width\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Proposal Date\" prop=\"LeaseCreatedOn\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.LeaseCreatedOn}}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"To Funder\" prop=\"SendFundingPackToBankDate\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.SendFundingPackToBankDate}}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Colleral Description\" prop=\"LeaseDescription\" [sortable]=\"true\" headerClass=\"thead-dark\"> </ngx-datatable-column>\r\n                    <ngx-datatable-column [width]=\"80\" name=\"Proposal#\" prop=\"LeaseNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Gross\" prop=\"Gross\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Proposal Term\" prop=\"LeaseTerm\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Bank Name\" prop=\"BankName\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"VIN#\" prop=\"VIN\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Total\" prop=\"LeaseTotalAmount\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.LeaseTotalAmount | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Placement Fee\" prop=\"LeasePlacementFee\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.LeasePlacementFee | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n          \r\n            <div class=\"bg-white border rounded\">\r\n              <div class=\"col-12\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-12 mt-4\">\r\n                    <h3 class=\"heading\">Dollar Sales</h3>\r\n\r\n                    <p-chart type=\"bar\" [data]=\"data\" [options]=\"options\"></p-chart>\r\n                    <h3 style=\"text-align:center\">--Months--</h3>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          \r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  \r\n  \r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/leasevolumereport/leasevolumereport.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/leasevolumereport/leasevolumereport.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Proposal Volume Report</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Proposal Volume Report</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>       <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n\r\n                <div class=\"col-12 col-md-12 col-lg-6 col-xl-3\">\r\n                  <div class=\"form-group\">\r\n                    <p-calendar [(ngModel)]=\"expFrom\" inputStyleClass=\"form-control start-date\" view=\"month\" dateFormat=\"mm/yy\" placeholder=\"Start Month\"  [maxDate]=\"expTo\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-12 col-lg-6 col-xl-3\">\r\n                  <div class=\"form-group\">\r\n                    <p-calendar [(ngModel)]=\"expTo\"  [minDate]=\"expFrom\" [maxDate]=\"maxDateFrom\" inputStyleClass=\"form-control start-date\" view=\"month\" dateFormat=\"mm/yy\" placeholder=\"End Month\"  [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-12 col-lg-3 col-xl-2\">\r\n                  <div class=\"form-group\">\r\n                    <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                    <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"Reset()\" />\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"col-md-12 mt-4 mb-2\">\r\n              <h3 class=\"heading float-left w-100\" *ngIf=\"pagedData.data.length>0\">\r\n                <div class=\"text-right float-md-right mt-2 mt-md-0\">\r\n                  <div class=\"mb-0\">\r\n                    <div class=\"input-group\">\r\n                      <small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>\r\n                      <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" class=\" text-success mb-3 mb-xl-0 px-1\"><i class=\"fa fa-file-excel\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fas fa-file-pdf\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"print()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fa fa-print\" style=\"font-size:22px;\"></i></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </h3>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable class=\"bootstrap\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n\r\n                    <ngx-datatable-column name=\"Month\" prop=\"reportMonthYear\" [sortable]=\"false\" headerClass=\"thead-dark\"> </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Solgen Proposal Volume\" prop=\"TotalIncome\" [sortable]=\"false\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.TotalIncome | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Solgen Proposal Income\" prop=\"SolgenIncome\" [sortable]=\"false\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.SolgenIncome | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Average Rate\" prop=\"AverageRate\" [sortable]=\"false\" headerClass=\"thead-dark\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.AverageRate}}%</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"bg-white border rounded\">\r\n            <div class=\"col-12\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 mt-4\">\r\n                  <h3 class=\"heading\">Proposal Volume Graph</h3>\r\n                  <p-chart type=\"bar\" [data]=\"data\" [options]=\"options\" width=\"400\" height=\"400\" [data]=\"gData\" #chart></p-chart>\r\n                  <h3 style=\"text-align:center\">--Months--</h3>\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/monthlyleaselog/monthlyleaselog.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/monthlyleaselog/monthlyleaselog.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Perposal Log Report</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Perposal Log Report</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>         <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Perposal Number/Business Name/Contact Name\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <ng-select #leseStatusSelect [items]=\"lstUserType\" [multiple]=\"true\"\r\n                                   placeholder=\"Select Perposal Status\" bindValue=\"value\" bindLabel=\"text\"\r\n                                   [closeOnSelect]=\"true\" [(ngModel)]=\"leaseStatus\">\r\n                        </ng-select>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <ng-select #bankStatus [items]=\"lstBanks\"\r\n                                   placeholder=\"Select Bank\" bindValue=\"value\" bindLabel=\"text\"\r\n                                   [closeOnSelect]=\"true\" [(ngModel)]=\"bankName\">\r\n                        </ng-select>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Date From\" [(ngModel)]=\"expFrom\" [maxDate]=\"expTo\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"Date To\" [(ngModel)]=\"expTo\" [minDate]=\"expFrom\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-5 col-lg-6 col-xl-2 mr-auto\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4 mb-2\">\r\n              <h3 class=\"heading float-left w-100\" *ngIf=\"pagedData.data.length>0\">\r\n                <div class=\"text-right float-md-right mt-2 mt-md-0\">\r\n                  <div class=\"mb-0\">\r\n                    <div class=\"input-group\" >\r\n                      <small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>\r\n                      <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" class=\" text-success mb-3 mb-xl-0 px-1\"><i class=\"fa fa-file-excel\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fas fa-file-pdf\" style=\"font-size:22px;\"></i></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </h3>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"col-md-12\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap custom-big-table-width\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"50\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"ContactBussinessName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Contact Name\" prop=\"CustomerName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Perposal#\" prop=\"LeaseNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Perposal Description\" prop=\"LeaseDescription\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Term\" prop=\"LeaseTerm\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Sales Person\" prop=\"LeasecreatedBy\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span *ngIf=\"row.Status=='Active'\">{{row.Status}}<br>{{row.LeaseCreatedOn}}</span>\r\n                        <span *ngIf=\"row.Status=='Pending'\">{{row.Status}}<br>{{row.SendToBankApprovalDate}}</span>\r\n                        <span *ngIf=\"row.Status=='Approved for Purchase'\">{{row.Status}}<br>{{row.IsApprovedForPurchaseDate}}</span>\r\n                        <span *ngIf=\"row.Status=='Funded'\">{{row.Status}}<br>{{row.IsApprovedForFundDate}}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Bank\" prop=\"BankName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Perposal Rate\" prop=\"LeaseRate\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.LeaseRate/100 | percent}}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Total Perposal\" prop=\"TotalLease\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.TotalLease | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Placement Fee\" prop=\"PlacementFee\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.PlacementFee | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Ist Payment\" prop=\"FirstPayment\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.FirstPayment | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"License Fee\" prop=\"LicenseFee\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.LicenseFee | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Total Income\" prop=\"TotalIncome\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.TotalIncome | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Exec Commission\" prop=\"ExecCommision\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.ExecCommision | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Solgen Income\" prop=\"SolgenIncome\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.SolgenIncome | currency :'GBP':'$':'1.2-2' }}</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Margin\" prop=\"Margin\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <span>{{row.Margin}}%</span>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/titlworkrequestreport/titleworkrequestreport.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/titlworkrequestreport/titleworkrequestreport.component.html ***!
  \********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Title Work Tracking</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Title Work Tracking</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>       <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-12 col-lg-3 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search by Business Name/Contact Name/Perposal Number\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-3 col-xl-3\">\r\n\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From\" [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-3 col-xl-3\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-3 col-xl-2\">\r\n                      <div class=\"form-group\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"SearchTitleWorkReport()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"ResetSearch()\" />\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4 mb-2\">\r\n              <h3 class=\"heading float-left w-100\" *ngIf=\"pagedData.data.length>0\">\r\n                <div class=\"text-right float-md-right mt-2 mt-md-0\">\r\n                  <div class=\"mb-0\">\r\n                    <div class=\"input-group\">\r\n                      <small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>\r\n                      <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" class=\" text-success mb-3 mb-xl-0 px-1\"><i class=\"fa fa-file-excel\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fas fa-file-pdf\" style=\"font-size:22px;\"></i></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </h3>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable class=\"bootstrap custom-medium-table-width\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Perposal#\" prop=\"LeaseNumber\" [sortable]=\"true\" headerClass=\"thead-dark\">  </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"ContactBussinessName\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Contact Name\" prop=\"ContactName\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"VIN#\" prop=\"VIN\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Bank\" prop=\"BankName\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Dealership\" prop=\"Dealership\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Contact @ Dealership\" prop=\"contactDealership\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Status\" prop=\"LeaseStatus\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column [minWidth]=\"230\"  name=\"Title Work Receipt received \" prop=\"TitleWorkReceivedDate\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.TitleWorkReceivedDate}}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Title Work Send Date\" prop=\"TitleWorkSendDate\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.TitleWorkSendDate}}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/welcomepackagetrackingreport/welcomepackagetrackingreport.component.html":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/welcomepackagetrackingreport/welcomepackagetrackingreport.component.html ***!
  \*********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Welcome Package Tracking </span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Welcome Package Tracking </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-3\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='searhName' placeholder=\"Search By Business Name\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-3\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From\" [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-3\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-3\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"SearchLease()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"ResetSearch()\" />\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12 text-xl-right\"></div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4 mb-2\">\r\n              <h3 class=\"heading float-left w-100\" *ngIf=\"pagedData.data.length>0\">\r\n                <div class=\"text-right float-md-right mt-2 mt-md-0\">\r\n                  <div class=\"mb-0\">\r\n                    <div class=\"input-group\">\r\n                      <small class=\"pt-1 pr-1 h6 font-weight-normal\">Download As: </small>\r\n                      <a href=\"javascript:void(0);\" (click)=\"ExportTOExcel()\" class=\" text-success mb-3 mb-xl-0 px-1\"><i class=\"fa fa-file-excel\" style=\"font-size:22px;\"></i></a>\r\n                      <a href=\"javascript:void(0);\" (click)=\"generatePdf()\" class=\" text-danger mb-3 mb-xl-0 px-1\"><i class=\"fas fa-file-pdf\" style=\"font-size:22px;\"></i></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </h3>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"col-md-12\">\r\n              <div class=\"table-responsive\" id=\"leaseReportTable\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable  #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column [width]=\"80\" name=\"Sent By\" prop=\"SentBy\" [sortable]=\"true\">\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"BusinessName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"ContactName\" prop=\"ContactName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    \r\n                    <ngx-datatable-column name=\"Email\" prop=\"Email\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Business Phone\" prop=\"BusinessPhone\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Contact Phone\" prop=\"ContactPhone\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Package Sent Date\" prop=\"PackageSentDate\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/report/commissionpaidreport/commissionpaidreport.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/views/report/commissionpaidreport/commissionpaidreport.component.scss ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcG9ydC9jb21taXNzaW9ucGFpZHJlcG9ydC9jb21taXNzaW9ucGFpZHJlcG9ydC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/report/commissionpaidreport/commissionpaidreport.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/views/report/commissionpaidreport/commissionpaidreport.component.ts ***!
  \*************************************************************************************/
/*! exports provided: CommissionpaidreportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommissionpaidreportComponent", function() { return CommissionpaidreportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _report_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../report.service */ "./src/app/views/report/report.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
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




var CommissionpaidreportComponent = /** @class */ (function () {
    function CommissionpaidreportComponent(reportService, commonService) {
        var _this = this;
        this.reportService = reportService;
        this.commonService = commonService;
        this.id = "";
        this.loading = false;
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.rowsForExport = [];
        this.listFilter = '';
        this.searchTxt = '';
        this.leaseStatus = null;
        this.contactStatus = null;
        this.bankName = null;
        this.totalPageSize = 10;
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    CommissionpaidreportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.loadBankDropDown();
        this.search();
        this.commonService.getMasterItemsList("lease").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        this.commonService.getBusinessContactList("").subscribe(function (result) {
            _this.lstBusinessContact = _this.commonService.businessName;
        });
    };
    CommissionpaidreportComponent.prototype.loadBankDropDown = function () {
        var _this = this;
        this.commonService.getBankDropList().subscribe(function (res) {
            _this.lstBanks = res;
        });
    };
    CommissionpaidreportComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    CommissionpaidreportComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    CommissionpaidreportComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.startDate = this.expFrom;
        this.endDate = this.expTo;
        this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CommissionpaidreportComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.startDate = this.expFrom;
        this.endDate = this.expTo;
        this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CommissionpaidreportComponent.prototype.SetLeaseStatus = function (status) {
        this.leaseStatus = status;
    };
    CommissionpaidreportComponent.prototype.SetContactStatus = function (status) {
        this.contactStatus = status;
    };
    CommissionpaidreportComponent.prototype.SetBankName = function (status) {
        this.bankName = status;
    };
    CommissionpaidreportComponent.prototype.reset = function () {
        var _this = this;
        this.loading = true;
        this.listFilter = '';
        this.expFrom = null;
        this.expTo = null;
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.pageSizeValue = 10;
        this.startDate = this.expFrom;
        this.endDate = this.expTo;
        this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CommissionpaidreportComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.startDate = this.expFrom;
        this.endDate = this.expTo;
        this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CommissionpaidreportComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.startDate = this.expFrom;
        this.endDate = this.expTo;
        this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CommissionpaidreportComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.startDate = this.expFrom;
        this.endDate = this.expTo;
        this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CommissionpaidreportComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Business Name': itm.ContactBussinessName,
                        'Contact Name': itm.CustomerName,
                        'Lease#': itm.LeaseNumber,
                        'Lease Description': itm.LeaseDescription,
                        'Placement Fee': '$' + itm.PlacementFee,
                        '1st Payment': '$' + itm.FirstPayment,
                        'License Fee': '$' + itm.LicenseFee,
                        'Total Income': '$' + itm.TotalIncome,
                        'Exec Commission': '$' + itm.ExecCommision,
                        'ContractorNameExport': itm.ContractorNameExport,
                        'CommissionFormulaExport': itm.CommissionFormulaExport,
                        'ContractorStDateExport': itm.ContractorStDateExport,
                        'ContractorEndDateExport': itm.ContractorEndDateExport,
                    });
                }
                _this.commonService.ExportData(_this.rowsForExport, "Excel", "CommissionPaidReport", null);
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CommissionpaidreportComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getCommssionPaidReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        // Note Show only few columns because in pdf format page width is limited.
                        'Business Name': itm.ContactBussinessName,
                        'Contact Name': itm.CustomerName,
                        'Lease#': itm.LeaseNumber,
                        'Lease Description': itm.LeaseDescription,
                        'Placement Fee': '$' + itm.PlacementFee,
                        '1st Payment': '$' + itm.FirstPayment,
                        'License Fee': '$' + itm.LicenseFee,
                        'Total Income': '$' + itm.TotalIncome,
                        'Exec Commission': '$' + itm.ExecCommision,
                        'ContractorNameExport': itm.ContractorNameExport,
                        'CommissionFormulaExport': itm.CommissionFormulaExport,
                        'ContractorStDateExport': itm.ContractorStDateExport,
                        'ContractorEndDateExport': itm.ContractorEndDateExport,
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "CommissionPaidReport", "Large");
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CommissionpaidreportComponent.ctorParameters = function () { return [
        { type: _report_service__WEBPACK_IMPORTED_MODULE_2__["ReportService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('leseStatusSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectComponent"])
    ], CommissionpaidreportComponent.prototype, "userTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('bankStatus', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectComponent"])
    ], CommissionpaidreportComponent.prototype, "bakSelect", void 0);
    CommissionpaidreportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-commissionpaidreport',
            template: __importDefault(__webpack_require__(/*! raw-loader!./commissionpaidreport.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/commissionpaidreport/commissionpaidreport.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./commissionpaidreport.component.scss */ "./src/app/views/report/commissionpaidreport/commissionpaidreport.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_report_service__WEBPACK_IMPORTED_MODULE_2__["ReportService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"]])
    ], CommissionpaidreportComponent);
    return CommissionpaidreportComponent;
}());



/***/ }),

/***/ "./src/app/views/report/creditreporttraking/creditreporttracking.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/views/report/creditreporttraking/creditreporttracking.component.scss ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcG9ydC9jcmVkaXRyZXBvcnR0cmFraW5nL2NyZWRpdHJlcG9ydHRyYWNraW5nLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/report/creditreporttraking/creditreporttracking.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/views/report/creditreporttraking/creditreporttracking.component.ts ***!
  \************************************************************************************/
/*! exports provided: CreditreporttrackingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditreporttrackingComponent", function() { return CreditreporttrackingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _report_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../report.service */ "./src/app/views/report/report.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
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




var CreditreporttrackingComponent = /** @class */ (function () {
    function CreditreporttrackingComponent(reportService, commonService) {
        var _this = this;
        this.reportService = reportService;
        this.commonService = commonService;
        this.id = "";
        this.loading = false;
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.rowsForExport = [];
        this.listFilter = '';
        this.searchTxt = '';
        this.leaseStatus = null;
        this.contactStatus = null;
        this.bankName = null;
        this.totalPageSize = 10;
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    CreditreporttrackingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.loadBankDropDown();
        this.refresh();
        this.commonService.getMasterItemsList("lease").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        this.commonService.getBusinessContactList("").subscribe(function (result) {
            _this.lstBusinessContact = _this.commonService.businessName;
        });
    };
    CreditreporttrackingComponent.prototype.loadBankDropDown = function () {
        var _this = this;
        this.commonService.getBankDropList().subscribe(function (res) {
            _this.lstBanks = res;
        });
    };
    CreditreporttrackingComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    CreditreporttrackingComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    CreditreporttrackingComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getCreditScoreTrackingReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CreditreporttrackingComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getCreditScoreTrackingReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CreditreporttrackingComponent.prototype.SetLeaseStatus = function (status) {
        this.leaseStatus = status;
    };
    CreditreporttrackingComponent.prototype.SetContactStatus = function (status) {
        this.contactStatus = status;
    };
    CreditreporttrackingComponent.prototype.SetBankName = function (status) {
        this.bankName = status;
    };
    CreditreporttrackingComponent.prototype.reset = function () {
        var _this = this;
        this.loading = true;
        this.listFilter = '';
        this.expFrom = null;
        this.expTo = null;
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.pageSizeValue = 10;
        this.reportService.getCreditScoreTrackingReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CreditreporttrackingComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getCreditScoreTrackingReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CreditreporttrackingComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.reportService.getCreditScoreTrackingReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CreditreporttrackingComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getCreditScoreTrackingReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CreditreporttrackingComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getCreditScoreTrackingReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Business Name': itm.ContactBussinessName,
                        'Contact Name': itm.ContactName,
                        'Guarantor': itm.GauranterName,
                        'Credit Report Date': itm.CreditReportDate
                    });
                }
                _this.commonService.ExportData(_this.rowsForExport, "Excel", "CreditReportTracking", null);
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CreditreporttrackingComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getCreditScoreTrackingReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        // Note Show only few columns because in pdf format page width is limited.
                        'Business Name': itm.ContactBussinessName,
                        'Contact Name': itm.ContactName,
                        'Guarantor': itm.GauranterName,
                        'Credit Report Date': itm.CreditReportDate
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "creditreporttracking", null);
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CreditreporttrackingComponent.ctorParameters = function () { return [
        { type: _report_service__WEBPACK_IMPORTED_MODULE_2__["ReportService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('leseStatusSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectComponent"])
    ], CreditreporttrackingComponent.prototype, "userTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('bankStatus', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectComponent"])
    ], CreditreporttrackingComponent.prototype, "bakSelect", void 0);
    CreditreporttrackingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-creditreporttracking',
            template: __importDefault(__webpack_require__(/*! raw-loader!./creditreporttracking.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/creditreporttraking/creditreporttracking.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./creditreporttracking.component.scss */ "./src/app/views/report/creditreporttraking/creditreporttracking.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_report_service__WEBPACK_IMPORTED_MODULE_2__["ReportService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"]])
    ], CreditreporttrackingComponent);
    return CreditreporttrackingComponent;
}());



/***/ }),

/***/ "./src/app/views/report/customer-log-report/customer-log-report.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/views/report/customer-log-report/customer-log-report.component.scss ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcG9ydC9jdXN0b21lci1sb2ctcmVwb3J0L2N1c3RvbWVyLWxvZy1yZXBvcnQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/report/customer-log-report/customer-log-report.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/views/report/customer-log-report/customer-log-report.component.ts ***!
  \***********************************************************************************/
/*! exports provided: CustomerLogReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerLogReportComponent", function() { return CustomerLogReportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _report_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../report.service */ "./src/app/views/report/report.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
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




var CustomerLogReportComponent = /** @class */ (function () {
    function CustomerLogReportComponent(reportService, commonService) {
        var _this = this;
        this.reportService = reportService;
        this.commonService = commonService;
        this.id = "";
        this.loading = false;
        this.sortDir = 'asc';
        this.sortColumn = 'BusinessName';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.rowsForExport = [];
        this.listFilter = '';
        this.searchTxt = '';
        this.leaseStatus = null;
        this.contactStatus = null;
        this.bankName = null;
        this.totalPageSize = 10;
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    CustomerLogReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.loadBankDropDown();
        this.refresh();
        this.commonService.getMasterItemsList("lease").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        this.commonService.getBusinessContactList("").subscribe(function (result) {
            _this.lstBusinessContact = _this.commonService.businessName;
        });
    };
    CustomerLogReportComponent.prototype.loadBankDropDown = function () {
        var _this = this;
        this.commonService.getBankDropList().subscribe(function (res) {
            _this.lstBanks = res;
        });
    };
    CustomerLogReportComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    CustomerLogReportComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    CustomerLogReportComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo, this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomerLogReportComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        if (typeof this.leaseStatus == 'undefined') {
            this.leaseStatus = null;
        }
        if (typeof this.contactStatus == 'undefined') {
            this.contactStatus = null;
        }
        if (typeof this.bankName == 'undefined') {
            this.bankName = null;
        }
        this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo, this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomerLogReportComponent.prototype.SetLeaseStatus = function (status) {
        this.leaseStatus = status;
    };
    CustomerLogReportComponent.prototype.SetContactStatus = function (status) {
        this.contactStatus = status;
    };
    CustomerLogReportComponent.prototype.SetBankName = function (status) {
        this.bankName = status;
    };
    CustomerLogReportComponent.prototype.reset = function () {
        var _this = this;
        this.loading = true;
        this.listFilter = '';
        this.expFrom = null;
        this.expTo = null;
        this.leaseStatus = null;
        this.bankName = null;
        this.userTypeSelect.clearModel();
        this.bakSelect.clearModel();
        this.sortDir = 'asc';
        this.sortColumn = 'BusinessName';
        this.pageSizeValue = 10;
        this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo, this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomerLogReportComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo, this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomerLogReportComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo, this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomerLogReportComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo, this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomerLogReportComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo, this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Lease#': itm.LeaseNumber,
                        'Business Name': itm.BusinessName,
                        'Contact Name': itm.ContactName,
                        'Collateral Information': itm.CollateralInfo,
                        'Collateral Description': itm.LeaseDescription,
                        'Insurance Expiration Date': itm.InsuranceExpirationDate,
                        'Term': itm.LeaseTerm,
                        'Lease Rate': itm.LeaseRate + '%',
                        'Salesman': itm.LeaseCreatedBy,
                        'Bank': itm.BankName,
                        'Total Lease Amount': '$' + itm.LeaseTotalAmount,
                        'Placement Fee': '$' + itm.LeasePlacementFee,
                        'Ist Payment': '$' + itm.FirstPayment,
                        'License Fee': '$' + itm.LicenseFee,
                        'Total Income': '$' + itm.TotalIncome,
                        'Exec Commission': '$' + itm.BankName,
                        'Net Revenue Solgen': '$' + itm.NetRevenueSolgen,
                        'Margin': itm.Margin
                    });
                }
                _this.commonService.ExportData(_this.rowsForExport, "Excel", "CustomerLogReport", null);
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomerLogReportComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getCustomerLogReportList(this.listFilter, this.expFrom, this.expTo, this.contactStatus, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        // Note Show only few columns because in pdf format page width is limited.
                        'Lease#': itm.LeaseNumber,
                        'Business Name': itm.BusinessName,
                        'Contact Name': itm.ContactName,
                        'Collateral Information': itm.CollateralInfo,
                        'Collateral Description': itm.LeaseDescription,
                        'Insurance Expiration Date': itm.InsuranceExpirationDate,
                        'Term': itm.LeaseTerm,
                        'Lease Rate': itm.LeaseRate + '%',
                        'Salesman': itm.LeaseCreatedBy,
                        'Bank': itm.BankName,
                        'Total Lease Amount': '$' + itm.LeaseTotalAmount,
                        'Placement Fee': '$' + itm.LeasePlacementFee,
                        'Ist Payment': '$' + itm.FirstPayment,
                        'License Fee': '$' + itm.LicenseFee,
                        'Total Income': '$' + itm.TotalIncome,
                        'Exec Commission': '$' + itm.BankName,
                        'Net Revenue Solgen': '$' + itm.NetRevenueSolgen,
                        'Margin': itm.Margin
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "CustomerLogReport", "Large");
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomerLogReportComponent.ctorParameters = function () { return [
        { type: _report_service__WEBPACK_IMPORTED_MODULE_2__["ReportService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('leseStatusSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectComponent"])
    ], CustomerLogReportComponent.prototype, "userTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('bankStatus', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectComponent"])
    ], CustomerLogReportComponent.prototype, "bakSelect", void 0);
    CustomerLogReportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customer-log-report',
            template: __importDefault(__webpack_require__(/*! raw-loader!./customer-log-report.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/customer-log-report/customer-log-report.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./customer-log-report.component.scss */ "./src/app/views/report/customer-log-report/customer-log-report.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_report_service__WEBPACK_IMPORTED_MODULE_2__["ReportService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"]])
    ], CustomerLogReportComponent);
    return CustomerLogReportComponent;
}());



/***/ }),

/***/ "./src/app/views/report/insurancetracking/insurancetracking.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/views/report/insurancetracking/insurancetracking.component.scss ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcG9ydC9pbnN1cmFuY2V0cmFja2luZy9pbnN1cmFuY2V0cmFja2luZy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/report/insurancetracking/insurancetracking.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/views/report/insurancetracking/insurancetracking.component.ts ***!
  \*******************************************************************************/
/*! exports provided: InsurancetrackingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsurancetrackingComponent", function() { return InsurancetrackingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _report_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../report.service */ "./src/app/views/report/report.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
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






var InsurancetrackingComponent = /** @class */ (function () {
    function InsurancetrackingComponent(reportService, commonService, dialogService, toaster) {
        var _this = this;
        this.reportService = reportService;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.title = 'Excel';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.rowsForExport = [];
        this.loading = false;
        this.isCustomer = false;
        this.sortDir = 'asc';
        this.sortColumn = 'BusinessName';
        this.listFilter = '';
        this.pageNo = 0;
        this.commonService.getLoggedInName.subscribe(function (userId) {
            _this.userId = userId.id;
        });
    }
    InsurancetrackingComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.Search();
    };
    InsurancetrackingComponent.prototype.Search = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.userId).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancetrackingComponent.prototype.updateFilter = function (event) {
        this.listFilter = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.Search();
        }
    };
    InsurancetrackingComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("pageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    InsurancetrackingComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.userId).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancetrackingComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.userId).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancetrackingComponent.prototype.onSort1 = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.userId).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancetrackingComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.userId).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancetrackingComponent.prototype.ResetSearch = function () {
        var _this = this;
        this.listFilter = "";
        this.sortDir = 'asc';
        this.sortColumn = 'BusinessName';
        this.pageNo = 0;
        this.Search();
        this.expFrom = null;
        this.expTo = null;
        this.loading = true;
        this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.userId).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancetrackingComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, this.pageNo, this.totalPageSize, this.userId).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Lease#': itm.Lease,
                        'Business Name': itm.BusinessName,
                        'Customer': itm.ContactName,
                        'Insurance Expiration Date': itm.InsuranceExpirationDate
                    });
                }
                _this.commonService.ExportData(_this.rowsForExport, "Excel", "InsuranceTrackingReport", null);
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancetrackingComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getInsuranceTrackingReport(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, this.pageNo, this.totalPageSize, this.userId).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Lease#': itm.Lease,
                        'Business Name': itm.BusinessName,
                        'Customer': itm.ContactName,
                        'Insurance Expiration Date': itm.InsuranceExpirationDate
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "InsuranceTrackingReport", null);
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancetrackingComponent.ctorParameters = function () { return [
        { type: _report_service__WEBPACK_IMPORTED_MODULE_1__["ReportService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["DatatableComponent"])
    ], InsurancetrackingComponent.prototype, "table", void 0);
    InsurancetrackingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-insurancetracking',
            template: __importDefault(__webpack_require__(/*! raw-loader!./insurancetracking.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/insurancetracking/insurancetracking.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./insurancetracking.component.scss */ "./src/app/views/report/insurancetracking/insurancetracking.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_report_service__WEBPACK_IMPORTED_MODULE_1__["ReportService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], InsurancetrackingComponent);
    return InsurancetrackingComponent;
}());



/***/ }),

/***/ "./src/app/views/report/leaseinventoryreport/leaseinventoryreport.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/views/report/leaseinventoryreport/leaseinventoryreport.component.scss ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcG9ydC9sZWFzZWludmVudG9yeXJlcG9ydC9sZWFzZWludmVudG9yeXJlcG9ydC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/report/leaseinventoryreport/leaseinventoryreport.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/views/report/leaseinventoryreport/leaseinventoryreport.component.ts ***!
  \*************************************************************************************/
/*! exports provided: LeaseinventoryreportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaseinventoryreportComponent", function() { return LeaseinventoryreportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _report_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../report.service */ "./src/app/views/report/report.service.ts");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
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








var LeaseinventoryreportComponent = /** @class */ (function () {
    function LeaseinventoryreportComponent(reportService, commonService, dialogService, toaster) {
        var _this = this;
        this.reportService = reportService;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.title = 'Excel';
        this.bankName = null;
        this.leaseStatus = null;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.rowsForExport = [];
        this.loading = false;
        this.isCustomer = false;
        this.sortDir = 'asc';
        this.sortColumn = 'BusinessName';
        this.docSortDir = 'desc';
        this.pageNumber = 0;
        this.totalPageSize = 10;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    LeaseinventoryreportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searhName = "";
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.getLeaseRequestList();
        this.loadBankDropDown();
        this.commonService.getMasterItemsList("lease").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
    };
    LeaseinventoryreportComponent.prototype.getLeaseRequestList = function () {
        var _this = this;
        this.reportService.getLeaseInventoryList(this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (res) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeaseinventoryreportComponent.prototype.SearchLease = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getLeaseInventoryList(this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeaseinventoryreportComponent.prototype.loadBankDropDown = function () {
        var _this = this;
        this.commonService.getBankDropList().subscribe(function (res) {
            _this.lstBanks = res;
        });
    };
    LeaseinventoryreportComponent.prototype.updateFilter = function (event) {
        this.searhName = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchLease();
        }
    };
    LeaseinventoryreportComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    LeaseinventoryreportComponent.prototype.onChange = function ($eventSearchLease) {
        this.SearchLease();
    };
    LeaseinventoryreportComponent.prototype.setPage = function ($event) {
        this.pageNumber = $event.page - 1;
        this.SearchLease();
    };
    LeaseinventoryreportComponent.prototype.SetBankName = function (status) {
        this.bankName = status;
    };
    LeaseinventoryreportComponent.prototype.SetLeaseStatus = function (status) {
        this.leaseStatus = status;
    };
    LeaseinventoryreportComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.pageNumber = $event.page - 1;
        this.SearchLease();
    };
    LeaseinventoryreportComponent.prototype.ResetSearch = function () {
        this.searhName = "";
        this.expFrom = null;
        this.expTo = null;
        this.leaseStatus = null;
        this.bankName = null;
        this.userTypeSelect.clearModel();
        this.bakSelect.clearModel();
        this.sortDir = 'asc';
        this.sortColumn = 'BusinessName';
        this.pageNumber = 0;
        this.SearchLease();
    };
    LeaseinventoryreportComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getLeaseInventoryList(this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Lease#': itm.Lease,
                        'Business Name': itm.BusinessName,
                        'Customer': itm.Customer,
                        'Date': itm.Date,
                        'Gross': itm.GrossAmount,
                        'Salesman': itm.Salesman,
                        'Status': itm.Status,
                        'Bank': itm.Bank,
                        'VIN#': itm.VIN,
                        'Total': itm.Total
                    });
                }
            }
            else { }
            _this.loading = false;
            var ws = xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].json_to_sheet(_this.rowsForExport);
            var wb = xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].book_new();
            xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].book_append_sheet(wb, ws, 'report');
            xlsx__WEBPACK_IMPORTED_MODULE_5__["writeFile"](wb, 'leaseinventoryreport.xlsx');
        }, function (error) {
            _this.loading = false;
        });
    };
    LeaseinventoryreportComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getLeaseInventoryList(this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Lease#': itm.Lease,
                        'Business Name': itm.BusinessName,
                        'Customer': itm.Customer,
                        'Date': itm.Date,
                        'Gross': itm.GrossAmount,
                        'Salesman': itm.Salesman,
                        'Status': itm.Status,
                        'Bank': itm.Bank,
                        'VIN#': itm.VIN,
                        'Total': itm.Total
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "leaseinventoryreport", null);
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeaseinventoryreportComponent.ctorParameters = function () { return [
        { type: _report_service__WEBPACK_IMPORTED_MODULE_4__["ReportService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('bankStatus', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_7__["NgSelectComponent"])
    ], LeaseinventoryreportComponent.prototype, "bakSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('leseStatusSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_7__["NgSelectComponent"])
    ], LeaseinventoryreportComponent.prototype, "userTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"])
    ], LeaseinventoryreportComponent.prototype, "table", void 0);
    LeaseinventoryreportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-leaseinventoryreport',
            template: __importDefault(__webpack_require__(/*! raw-loader!./leaseinventoryreport.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/leaseinventoryreport/leaseinventoryreport.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./leaseinventoryreport.component.scss */ "./src/app/views/report/leaseinventoryreport/leaseinventoryreport.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_report_service__WEBPACK_IMPORTED_MODULE_4__["ReportService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], LeaseinventoryreportComponent);
    return LeaseinventoryreportComponent;
}());



/***/ }),

/***/ "./src/app/views/report/leasetrackingreport/leasetrackingreportlist.component.scss":
/*!*****************************************************************************************!*\
  !*** ./src/app/views/report/leasetrackingreport/leasetrackingreportlist.component.scss ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcG9ydC9sZWFzZXRyYWNraW5ncmVwb3J0L2xlYXNldHJhY2tpbmdyZXBvcnRsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/report/leasetrackingreport/leasetrackingreportlist.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/views/report/leasetrackingreport/leasetrackingreportlist.component.ts ***!
  \***************************************************************************************/
/*! exports provided: LeasetrackingreportlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeasetrackingreportlistComponent", function() { return LeasetrackingreportlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _report_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../report.service */ "./src/app/views/report/report.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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






var LeasetrackingreportlistComponent = /** @class */ (function () {
    function LeasetrackingreportlistComponent(reportService, commonService) {
        var _this = this;
        this.reportService = reportService;
        this.commonService = commonService;
        this.id = "";
        this.loading = false;
        this.sortDir = 'desc';
        this.loadRevenueMonthChart = false;
        this.rows = [];
        this.graphtemp = [];
        this.sortColumn = 'LeaseDate';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.loadChart = false;
        this.RowsHeader = [];
        this.graphrows = [];
        this.showgraph = false;
        this.rowsForExport = [];
        this.listFilter = '';
        this.searchTxt = '';
        this.leaseStatus = null;
        this.bankName = null;
        this.totalPageSize = 10;
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    LeasetrackingreportlistComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.ShowLeaseTrackingGraph();
        this.SearchLeaseTrackingReport();
        this.loadBankDropDown();
    };
    LeasetrackingreportlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchLeaseTrackingReport();
        }
    };
    LeasetrackingreportlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    LeasetrackingreportlistComponent.prototype.loadBankDropDown = function () {
        var _this = this;
        this.commonService.getBankDropList().subscribe(function (res) {
            _this.lstBanks = res;
        });
    };
    LeasetrackingreportlistComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasetrackingreportlistComponent.prototype.SearchLeaseTrackingReport = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasetrackingreportlistComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasetrackingreportlistComponent.prototype.ResetSearch = function () {
        var _this = this;
        this.loading = true;
        this.listFilter = '';
        this.expFrom = null;
        this.expTo = null;
        this.leaseStatus = null;
        this.bankName = null;
        this.bakSelect.clearModel();
        this.sortDir = 'desc';
        this.sortColumn = 'LeaseDate';
        this.pageSizeValue = 10;
        this.pageNumber = 0;
        this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasetrackingreportlistComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.pageNumber = $event.page - 1;
        this.loading = true;
        this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasetrackingreportlistComponent.prototype.SetBankName = function (bankname) {
        this.bankName = bankname;
    };
    LeasetrackingreportlistComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasetrackingreportlistComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Lease Date': itm.LeaseCreatedOn,
                        'To Funder': itm.SendFundingPackToBankDate,
                        'Colleral Description': itm.LeaseDescription,
                        'Lease#': itm.LeaseNumber,
                        'Gross': itm.Gross,
                        'LeaseTerm': itm.LeaseTerm,
                        'Bank': itm.BankName,
                        'VIN#': itm.VIN,
                        'Total Amount': itm.LeaseTotalAmount,
                        'Placement Fee': itm.LeasePlacementFee,
                    });
                }
            }
            else { }
            _this.loading = false;
            var ws = xlsx__WEBPACK_IMPORTED_MODULE_4__["utils"].json_to_sheet(_this.rowsForExport);
            var wb = xlsx__WEBPACK_IMPORTED_MODULE_4__["utils"].book_new();
            xlsx__WEBPACK_IMPORTED_MODULE_4__["utils"].book_append_sheet(wb, ws, 'customerlogreport');
            xlsx__WEBPACK_IMPORTED_MODULE_4__["writeFile"](wb, 'customerlogreport.xlsx');
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasetrackingreportlistComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getLeaseTrakingReportList(this.searchTxt, this.expFrom, this.expTo, this.expFundFrom, this.expFundTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        // Note Show only few columns because in pdf format page width is limited.
                        'Lease Date': itm.LeaseCreatedOn,
                        'To Funder': itm.SendFundingPackToBankDate,
                        'Colleral Description': itm.LeaseDescription,
                        'Lease#': itm.LeaseNumber,
                        'Gross': itm.Gross,
                        'LeaseTerm': itm.LeaseTerm,
                        'Bank': itm.BankName,
                        'VIN#': itm.VIN,
                        'Total Amount': itm.LeaseTotalAmount,
                        'Placement Fee': itm.LeasePlacementFee,
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "customerlogreport", null);
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasetrackingreportlistComponent.prototype.ShowLeaseTrackingGraph = function () {
        var _this = this;
        this.loadChart = true;
        this.reportService.GetLeaseTrackingAmount(this.loginuserid).subscribe(function (response) {
            _this.reportdata = response;
            _this.graphrows = _this.reportdata.monthlyLeaseTrackingTotalLeaseAmountModel;
            var ReportEndDateStartDate = _this.reportdata.leaseTrackGraphEndDateAndStartDate;
            _this.graphtemp = _this.reportdata.monthlyLeaseTrackingTotalLeaseAmountModel;
            _this.gcolumnNames = _this.reportdata.monthlyLeaseTrackingTotalLeaseAmountModel.map(function (a) {
                return a.monthName;
            });
            var countlic = null;
            if (_this.graphrows.length == 0) {
                _this.gcolumnNames = [];
                _this.graphtemp = [];
                _this.showgraph = false;
                countlic = 1;
            }
            else {
                _this.graphtemp = _this.graphrows.map(function (a) {
                    return a.leaseTotalAmount;
                });
                _this.showgraph = true;
            }
            if (_this.graphtemp[0] < 10) {
                countlic = 1;
            }
            _this.data = {
                labels: _this.gcolumnNames,
                datasets: [
                    {
                        label: 'Sale By Month' + ' ' + ReportEndDateStartDate.lastDate + ' ' + 'through' + ' ' + ReportEndDateStartDate.currentDate,
                        callback: function (value, index, values) {
                            if (parseInt(value) >= 1000) {
                                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            else {
                                return '$' + value;
                            }
                        },
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: _this.graphtemp
                    }
                ]
            };
            _this.options = {
                scales: {
                    yAxes: [{
                            label: 'Lease Amount',
                            showTooltips: true,
                            multiTooltipTemplate: function (label) {
                                return '$' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                            ticks: {
                                beginAtZero: true,
                                fixedStepSize: countlic,
                                callback: function (value, index, values) {
                                    if (parseInt(value) >= 1000) {
                                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    }
                                    else {
                                        return '$' + value;
                                    }
                                },
                            }
                        }]
                },
                tooltips: {
                    enabled: true,
                    mode: 'single',
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.labels[tooltipItem.index];
                            var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            var currencyPipe = new _angular_common__WEBPACK_IMPORTED_MODULE_5__["CurrencyPipe"]('en');
                            var formattedNumber = currencyPipe.transform(datasetLabel, 'USD', 'symbol');
                            return "Lease Amount" + ': ' + formattedNumber;
                        }
                    }
                },
            };
            _this.loadChart = false;
        });
    };
    LeasetrackingreportlistComponent.ctorParameters = function () { return [
        { type: _report_service__WEBPACK_IMPORTED_MODULE_1__["ReportService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('bankStatus', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_2__["NgSelectComponent"])
    ], LeasetrackingreportlistComponent.prototype, "bakSelect", void 0);
    LeasetrackingreportlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-leasetrackingreportlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./leasetrackingreportlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/leasetrackingreport/leasetrackingreportlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./leasetrackingreportlist.component.scss */ "./src/app/views/report/leasetrackingreport/leasetrackingreportlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_report_service__WEBPACK_IMPORTED_MODULE_1__["ReportService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]])
    ], LeasetrackingreportlistComponent);
    return LeasetrackingreportlistComponent;
}());



/***/ }),

/***/ "./src/app/views/report/leasevolumereport/leasevolumereport.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/views/report/leasevolumereport/leasevolumereport.component.scss ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcG9ydC9sZWFzZXZvbHVtZXJlcG9ydC9sZWFzZXZvbHVtZXJlcG9ydC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/report/leasevolumereport/leasevolumereport.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/views/report/leasevolumereport/leasevolumereport.component.ts ***!
  \*******************************************************************************/
/*! exports provided: LeasevolumereportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeasevolumereportComponent", function() { return LeasevolumereportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _report_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../report.service */ "./src/app/views/report/report.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var primeng_chart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/chart */ "./node_modules/primeng/chart.js");
/* harmony import */ var primeng_chart__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_chart__WEBPACK_IMPORTED_MODULE_6__);
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







var LeasevolumereportComponent = /** @class */ (function () {
    function LeasevolumereportComponent(reportService, datepipe, toaster, commonService) {
        var _this = this;
        this.reportService = reportService;
        this.datepipe = datepipe;
        this.toaster = toaster;
        this.commonService = commonService;
        this.loadSave = false;
        this.id = "";
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'reportMonthYear';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.rowsForExport = [];
        this.listFilter = '';
        this.searchTxt = '';
        this.maxDateTo = new Date();
        this.maxDateFrom = new Date();
        this.leaseStatus = null;
        this.contactStatus = null;
        this.loadChart = false;
        this.RowsHeader = [];
        this.graphrows = [];
        this.graphrows1 = [];
        this.rows = [];
        this.graphtemp = [];
        this.graphtemp1 = [];
        this.showgraph = false;
        this.bankName = null;
        this.totalPageSize = 10;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        this.expFrom = new Date(y, m - 11, 1);
        this.expTo = new Date(y, m, 1);
    }
    LeasevolumereportComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
        this.ShowLeaseTrackingGraph();
    };
    LeasevolumereportComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    LeasevolumereportComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    LeasevolumereportComponent.prototype.print = function () {
        var windowPort = window.open('', '', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0');
        var printDom = "\n      <html>\n        <head>\n          <title>Lease Volume Graph</title>\n        </head>\n        <body>\n            <h2>Lease Volume Graph</h2>\n\n               <div class=\"row\">\n                    <div class=\"col-12 col-md-6 col-lg-6\">\n                      <label>Start Date:" + this.startDate + "</label>\n                    </div>\n                    <div class=\"col-12 col-md-6 col-lg-6\">\n                      <label>End Date:" + this.endDate + "</label>\n                    </div>\n               </div>\n\n            <div class=\"content\">\n                <img src=\"" + this.primeChart.getBase64Image() + "\" />\n            </div>\n\n        </body>\n      </html>";
        windowPort.document.write(printDom);
        windowPort.document.close();
        windowPort.focus();
        windowPort.print();
    };
    LeasevolumereportComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasevolumereportComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        if (this.expFrom != null && this.expTo != null) {
            this.startDate = this.datepipe.transform(this.expFrom, 'MM-dd-yyyy');
            this.endDate = this.datepipe.transform(this.expTo, 'MM-dd-yyyy');
            this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
                _this.pagedData = _this.reportService.pagedData;
                _this.pageSize = _this.pagedData.pager.totalItems;
                _this.loading = false;
            }, function (error) {
                _this.loading = false;
            });
            this.ShowLeaseTrackingGraph();
        }
        else {
            this.toaster.error("Please select start month and end month");
            this.loading = false;
        }
    };
    LeasevolumereportComponent.prototype.SetLeaseStatus = function (status) {
        this.leaseStatus = status;
    };
    LeasevolumereportComponent.prototype.SetContactStatus = function (status) {
        this.contactStatus = status;
    };
    LeasevolumereportComponent.prototype.SetBankName = function (status) {
        this.bankName = status;
    };
    LeasevolumereportComponent.prototype.Reset = function () {
        var _this = this;
        this.loading = true;
        this.sortDir = 'asc';
        this.sortColumn = 'reportMonthYear';
        this.pageSizeValue = 10;
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        this.expFrom = new Date(y, m - 11, 1);
        this.expTo = new Date(y, m, 1);
        this.startDate = this.datepipe.transform(this.expFrom, 'MM-dd-yyyy');
        this.endDate = this.datepipe.transform(this.expTo, 'MM-dd-yyyy');
        this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
        this.ShowLeaseTrackingGraph();
    };
    LeasevolumereportComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasevolumereportComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasevolumereportComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.startDate = this.datepipe.transform(this.expFrom, 'MM-dd-yyyy');
        this.endDate = this.datepipe.transform(this.expTo, 'MM-dd-yyyy');
        this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasevolumereportComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSize, this.loginuserid, "e").subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                _this.commonService.ExportData(_this.pagedDataForImport.data, "Excel", "LeaseVolumeReport", null);
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasevolumereportComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSize, this.loginuserid, "e").subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                _this.commonService.ExportData(_this.pagedDataForImport.data, 'PDF', "LeaseVolumeReport", null);
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LeasevolumereportComponent.prototype.ShowLeaseTrackingGraph = function () {
        var _this = this;
        this.loadChart = true;
        this.reportService.getLeaseVolumeReportList(this.listFilter, this.expFrom, this.expTo, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, "g").subscribe(function (response) {
            _this.reportdata = _this.reportService.pagedData;
            _this.graphrows = _this.reportdata.data;
            _this.gcolumnNames = _this.reportdata.data.map(function (a) {
                return a.reportMonthYear;
            });
            var countlic = null;
            if (_this.graphrows.length == 0) {
                _this.gcolumnNames = [];
                _this.graphtemp = [];
                _this.showgraph = false;
                countlic = 1;
            }
            else {
                _this.graphtemp = _this.graphrows.map(function (a) {
                    return a.TotalIncome;
                });
                _this.showgraph = true;
            }
            //try
            if (_this.graphrows.length == 0) {
                _this.gcolumnNames1 = [];
                _this.graphtemp1 = [];
                _this.showgraph = false;
                countlic = 1;
            }
            else {
                _this.graphtemp1 = _this.graphrows.map(function (a) {
                    return a.SolgenIncome;
                });
                _this.showgraph = true;
            }
            //end
            if (_this.graphtemp[0] < 10) {
                countlic = 1;
            }
            _this.data = {
                labels: _this.gcolumnNames,
                datasets: [
                    {
                        label: 'Solgen Lease Volume',
                        callback: function (value, index, values) {
                            if (parseInt(value) >= 1000) {
                                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            else {
                                return '$' + value;
                            }
                        },
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: _this.graphtemp
                    },
                    //strt
                    {
                        label: 'Solgen Lease Income',
                        callback: function (value1, index, values) {
                            if (parseInt(value1) >= 1000) {
                                return '$' + value1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            else {
                                return '$' + value1;
                            }
                        },
                        backgroundColor: '#00FFFF',
                        borderColor: '#1E88E5',
                        data: _this.graphtemp1
                    }
                    //end
                ]
            };
            _this.options = {
                scales: {
                    yAxes: [{
                            label: 'Solgen Lease Volume',
                            showTooltips: true,
                            responsive: false,
                            maintainAspectRatio: false,
                            multiTooltipTemplate: function (label) {
                                return '$' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                            ticks: {
                                beginAtZero: true,
                                fixedStepSize: countlic,
                                callback: function (value, index, values) {
                                    if (parseInt(value) >= 1000) {
                                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    }
                                    else {
                                        return '$' + value;
                                    }
                                },
                            }
                        }]
                },
                tooltips: {
                    enabled: true,
                    mode: 'single',
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var tooltiptext = "Solgen Lease Volume";
                            if (tooltipItem.datasetIndex == "1") {
                                tooltiptext = "Solgen Lease Income";
                            }
                            var label = data.labels[tooltipItem.index];
                            var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            var currencyPipe = new _angular_common__WEBPACK_IMPORTED_MODULE_5__["CurrencyPipe"]('en');
                            var formattedNumber = currencyPipe.transform(datasetLabel, 'USD', 'symbol');
                            return tooltiptext + ': ' + formattedNumber;
                        }
                    }
                },
            };
            _this.options1 = {
                scales: {
                    yAxes: [{
                            label: 'Solgen Lease Income',
                            showTooltips: true,
                            responsive: false,
                            maintainAspectRatio: false,
                            multiTooltipTemplate: function (label) {
                                return '$' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                            ticks: {
                                beginAtZero: true,
                                fixedStepSize: countlic,
                                callback: function (value, index, values) {
                                    if (parseInt(value) >= 1000) {
                                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    }
                                    else {
                                        return '$' + value;
                                    }
                                },
                            }
                        }]
                },
                tooltips: {
                    enabled: true,
                    mode: 'single',
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.labels[tooltipItem.index];
                            var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            var currencyPipe = new _angular_common__WEBPACK_IMPORTED_MODULE_5__["CurrencyPipe"]('en');
                            var formattedNumber = currencyPipe.transform(datasetLabel, 'USD', 'symbol');
                            return "Solgen Lease Volume" + ': ' + formattedNumber;
                        }
                    }
                },
            };
            ///end graph
            _this.loadChart = false;
        });
    };
    LeasevolumereportComponent.ctorParameters = function () { return [
        { type: _report_service__WEBPACK_IMPORTED_MODULE_3__["ReportService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('leseStatusSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], LeasevolumereportComponent.prototype, "userTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('bankStatus', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], LeasevolumereportComponent.prototype, "bakSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chart', { static: false }),
        __metadata("design:type", primeng_chart__WEBPACK_IMPORTED_MODULE_6__["UIChart"])
    ], LeasevolumereportComponent.prototype, "primeChart", void 0);
    LeasevolumereportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-leasevolumereport',
            template: __importDefault(__webpack_require__(/*! raw-loader!./leasevolumereport.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/leasevolumereport/leasevolumereport.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./leasevolumereport.component.scss */ "./src/app/views/report/leasevolumereport/leasevolumereport.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_report_service__WEBPACK_IMPORTED_MODULE_3__["ReportService"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"]])
    ], LeasevolumereportComponent);
    return LeasevolumereportComponent;
}());



/***/ }),

/***/ "./src/app/views/report/monthlyleaselog/monthlyleaselog.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/views/report/monthlyleaselog/monthlyleaselog.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcG9ydC9tb250aGx5bGVhc2Vsb2cvbW9udGhseWxlYXNlbG9nLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/report/monthlyleaselog/monthlyleaselog.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/report/monthlyleaselog/monthlyleaselog.component.ts ***!
  \***************************************************************************/
/*! exports provided: MonthlyleaselogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthlyleaselogComponent", function() { return MonthlyleaselogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _report_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../report.service */ "./src/app/views/report/report.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
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







var MonthlyleaselogComponent = /** @class */ (function () {
    function MonthlyleaselogComponent(router, reportService, dialogService, toaster, commonService, activeRoute) {
        var _this = this;
        this.router = router;
        this.reportService = reportService;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.commonService = commonService;
        this.activeRoute = activeRoute;
        this.loadSave = false;
        this.id = "";
        this.loading = false;
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.rowsForExport = [];
        this.listFilter = '';
        this.searchTxt = '';
        this.leaseStatus = null;
        this.bankName = null;
        this.totalPageSize = 10;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    MonthlyleaselogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
        this.loadBankDropDown();
        this.commonService.getMasterItemsList("lease").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
    };
    MonthlyleaselogComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    MonthlyleaselogComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    MonthlyleaselogComponent.prototype.loadBankDropDown = function () {
        var _this = this;
        this.commonService.getBankDropList().subscribe(function (res) {
            _this.lstBanks = res;
        });
    };
    MonthlyleaselogComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    MonthlyleaselogComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    MonthlyleaselogComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    MonthlyleaselogComponent.prototype.reset = function () {
        var _this = this;
        this.loading = true;
        this.listFilter = '';
        this.expFrom = null;
        this.expTo = null;
        this.leaseStatus = null;
        this.bankName = null;
        this.userTypeSelect.clearModel();
        this.bakSelect.clearModel();
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.pageSizeValue = 10;
        this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    MonthlyleaselogComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    MonthlyleaselogComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    MonthlyleaselogComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Business Name': itm.ContactBussinessName,
                        'Contact Name': itm.CustomerName,
                        'Lease#': itm.LeaseNumber,
                        'Lease Description': itm.LeaseDescription,
                        'Term': itm.LeaseTerm,
                        'Sales Person': itm.SalesPersonName,
                        'Status': itm.Status,
                        'Bank': itm.BankName,
                        'Lease Rate': itm.LeaseRate + '%',
                        'Total Lease ': '$' + itm.TotalLease,
                        'Placement Fee': '$' + itm.PlacementFee,
                        '1st Payment ': '$' + itm.FirstPayment,
                        'License Fee': '$' + itm.LicenseFee,
                        'Total Income': '$' + itm.TotalIncome,
                        'Exec Commision': '$' + itm.ExecCommision,
                        'Solgen Income': '$' + itm.SolgenIncome,
                        'Margin': itm.Margin + '%'
                    });
                }
                _this.commonService.ExportData(_this.rowsForExport, "Excel", "LeaseLogReport", null);
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    MonthlyleaselogComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getMonthlyLeaseLogList(this.listFilter, this.expFrom, this.expTo, this.leaseStatus, this.bankName, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        // Note Show only few columns because in pdf format page width is limited.
                        'Business Name': itm.ContactBussinessName,
                        'Contact Name': itm.CustomerName,
                        'Lease#': itm.LeaseNumber,
                        'Lease Description': itm.LeaseDescription,
                        'Term': itm.LeaseTerm,
                        'Sales Person': itm.SalesPersonName,
                        'Status': itm.Status,
                        'Bank': itm.BankName,
                        'Lease Rate': itm.LeaseRate + '%',
                        'Total Lease ': '$' + itm.TotalLease,
                        'Placement Fee': '$' + itm.PlacementFee,
                        '1st Payment ': '$' + itm.FirstPayment,
                        'License Fee': '$' + itm.LicenseFee,
                        'Total Income': '$' + itm.TotalIncome,
                        'Exec Commision': '$' + itm.ExecCommision,
                        'Solgen Income': '$' + itm.SolgenIncome,
                        'Margin': itm.Margin + '%'
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "LeaseLogReport", "Large");
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    MonthlyleaselogComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _report_service__WEBPACK_IMPORTED_MODULE_2__["ReportService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('leseStatusSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], MonthlyleaselogComponent.prototype, "userTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('bankStatus', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], MonthlyleaselogComponent.prototype, "bakSelect", void 0);
    MonthlyleaselogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-monthlyleaselog',
            template: __importDefault(__webpack_require__(/*! raw-loader!./monthlyleaselog.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/monthlyleaselog/monthlyleaselog.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./monthlyleaselog.component.scss */ "./src/app/views/report/monthlyleaselog/monthlyleaselog.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _report_service__WEBPACK_IMPORTED_MODULE_2__["ReportService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], MonthlyleaselogComponent);
    return MonthlyleaselogComponent;
}());



/***/ }),

/***/ "./src/app/views/report/report-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/views/report/report-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: ReportRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportRoutingModule", function() { return ReportRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _leaseinventoryreport_leaseinventoryreport_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./leaseinventoryreport/leaseinventoryreport.component */ "./src/app/views/report/leaseinventoryreport/leaseinventoryreport.component.ts");
/* harmony import */ var _welcomepackagetrackingreport_welcomepackagetrackingreport_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./welcomepackagetrackingreport/welcomepackagetrackingreport.component */ "./src/app/views/report/welcomepackagetrackingreport/welcomepackagetrackingreport.component.ts");
/* harmony import */ var _titlworkrequestreport_titleworkrequestreport_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./titlworkrequestreport/titleworkrequestreport.component */ "./src/app/views/report/titlworkrequestreport/titleworkrequestreport.component.ts");
/* harmony import */ var _customer_log_report_customer_log_report_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customer-log-report/customer-log-report.component */ "./src/app/views/report/customer-log-report/customer-log-report.component.ts");
/* harmony import */ var _monthlyleaselog_monthlyleaselog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./monthlyleaselog/monthlyleaselog.component */ "./src/app/views/report/monthlyleaselog/monthlyleaselog.component.ts");
/* harmony import */ var _leasetrackingreport_leasetrackingreportlist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./leasetrackingreport/leasetrackingreportlist.component */ "./src/app/views/report/leasetrackingreport/leasetrackingreportlist.component.ts");
/* harmony import */ var _creditreporttraking_creditreporttracking_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./creditreporttraking/creditreporttracking.component */ "./src/app/views/report/creditreporttraking/creditreporttracking.component.ts");
/* harmony import */ var _commissionpaidreport_commissionpaidreport_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./commissionpaidreport/commissionpaidreport.component */ "./src/app/views/report/commissionpaidreport/commissionpaidreport.component.ts");
/* harmony import */ var _insurancetracking_insurancetracking_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./insurancetracking/insurancetracking.component */ "./src/app/views/report/insurancetracking/insurancetracking.component.ts");
/* harmony import */ var _leasevolumereport_leasevolumereport_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./leasevolumereport/leasevolumereport.component */ "./src/app/views/report/leasevolumereport/leasevolumereport.component.ts");
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
    { path: '', },
    { path: 'leaseinventoryreport', component: _leaseinventoryreport_leaseinventoryreport_component__WEBPACK_IMPORTED_MODULE_2__["LeaseinventoryreportComponent"], data: { moduleCode: '8004' } },
    { path: 'welcomereport', component: _welcomepackagetrackingreport_welcomepackagetrackingreport_component__WEBPACK_IMPORTED_MODULE_3__["WelcomepackagetrackingreportComponent"], data: { moduleCode: '8003' } },
    { path: 'titleworkrequestreport', component: _titlworkrequestreport_titleworkrequestreport_component__WEBPACK_IMPORTED_MODULE_4__["TitleworkrequestreportComponent"], data: { moduleCode: '8002' } },
    { path: 'customerlogreport', component: _customer_log_report_customer_log_report_component__WEBPACK_IMPORTED_MODULE_5__["CustomerLogReportComponent"], data: { moduleCode: '8001' } },
    { path: 'MonthlyLeaselogreport', component: _monthlyleaselog_monthlyleaselog_component__WEBPACK_IMPORTED_MODULE_6__["MonthlyleaselogComponent"], data: { moduleCode: '8005' } },
    { path: 'leasetrackingreport', component: _leasetrackingreport_leasetrackingreportlist_component__WEBPACK_IMPORTED_MODULE_7__["LeasetrackingreportlistComponent"], data: { moduleCode: '8006' } },
    { path: 'creditreporttracking', component: _creditreporttraking_creditreporttracking_component__WEBPACK_IMPORTED_MODULE_8__["CreditreporttrackingComponent"], data: { moduleCode: '8009' } },
    { path: 'commissionpaidreport', component: _commissionpaidreport_commissionpaidreport_component__WEBPACK_IMPORTED_MODULE_9__["CommissionpaidreportComponent"], data: { moduleCode: '8007' } },
    { path: 'insurancetracking', component: _insurancetracking_insurancetracking_component__WEBPACK_IMPORTED_MODULE_10__["InsurancetrackingComponent"], data: { moduleCode: '8010' } },
    { path: 'leasevolumereport', component: _leasevolumereport_leasevolumereport_component__WEBPACK_IMPORTED_MODULE_11__["LeasevolumereportComponent"], data: { moduleCode: '8008' } },
];
var ReportRoutingModule = /** @class */ (function () {
    function ReportRoutingModule() {
    }
    ReportRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ReportRoutingModule);
    return ReportRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/report/report.module.ts":
/*!***********************************************!*\
  !*** ./src/app/views/report/report.module.ts ***!
  \***********************************************/
/*! exports provided: ReportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportModule", function() { return ReportModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _leaseinventoryreport_leaseinventoryreport_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./leaseinventoryreport/leaseinventoryreport.component */ "./src/app/views/report/leaseinventoryreport/leaseinventoryreport.component.ts");
/* harmony import */ var _report_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./report-routing.module */ "./src/app/views/report/report-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _welcomepackagetrackingreport_welcomepackagetrackingreport_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./welcomepackagetrackingreport/welcomepackagetrackingreport.component */ "./src/app/views/report/welcomepackagetrackingreport/welcomepackagetrackingreport.component.ts");
/* harmony import */ var _customer_log_report_customer_log_report_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./customer-log-report/customer-log-report.component */ "./src/app/views/report/customer-log-report/customer-log-report.component.ts");
/* harmony import */ var _titlworkrequestreport_titleworkrequestreport_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./titlworkrequestreport/titleworkrequestreport.component */ "./src/app/views/report/titlworkrequestreport/titleworkrequestreport.component.ts");
/* harmony import */ var _monthlyleaselog_monthlyleaselog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./monthlyleaselog/monthlyleaselog.component */ "./src/app/views/report/monthlyleaselog/monthlyleaselog.component.ts");
/* harmony import */ var _leasetrackingreport_leasetrackingreportlist_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./leasetrackingreport/leasetrackingreportlist.component */ "./src/app/views/report/leasetrackingreport/leasetrackingreportlist.component.ts");
/* harmony import */ var primeng_chart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/chart */ "./node_modules/primeng/chart.js");
/* harmony import */ var primeng_chart__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_chart__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _creditreporttraking_creditreporttracking_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./creditreporttraking/creditreporttracking.component */ "./src/app/views/report/creditreporttraking/creditreporttracking.component.ts");
/* harmony import */ var _commissionpaidreport_commissionpaidreport_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./commissionpaidreport/commissionpaidreport.component */ "./src/app/views/report/commissionpaidreport/commissionpaidreport.component.ts");
/* harmony import */ var _insurancetracking_insurancetracking_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./insurancetracking/insurancetracking.component */ "./src/app/views/report/insurancetracking/insurancetracking.component.ts");
/* harmony import */ var _leasevolumereport_leasevolumereport_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./leasevolumereport/leasevolumereport.component */ "./src/app/views/report/leasevolumereport/leasevolumereport.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};















var ReportModule = /** @class */ (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_leaseinventoryreport_leaseinventoryreport_component__WEBPACK_IMPORTED_MODULE_2__["LeaseinventoryreportComponent"], _welcomepackagetrackingreport_welcomepackagetrackingreport_component__WEBPACK_IMPORTED_MODULE_5__["WelcomepackagetrackingreportComponent"], _customer_log_report_customer_log_report_component__WEBPACK_IMPORTED_MODULE_6__["CustomerLogReportComponent"],
                _titlworkrequestreport_titleworkrequestreport_component__WEBPACK_IMPORTED_MODULE_7__["TitleworkrequestreportComponent"], _insurancetracking_insurancetracking_component__WEBPACK_IMPORTED_MODULE_13__["InsurancetrackingComponent"], _monthlyleaselog_monthlyleaselog_component__WEBPACK_IMPORTED_MODULE_8__["MonthlyleaselogComponent"],
                _leasetrackingreport_leasetrackingreportlist_component__WEBPACK_IMPORTED_MODULE_9__["LeasetrackingreportlistComponent"], _leasevolumereport_leasevolumereport_component__WEBPACK_IMPORTED_MODULE_14__["LeasevolumereportComponent"], _creditreporttraking_creditreporttracking_component__WEBPACK_IMPORTED_MODULE_11__["CreditreporttrackingComponent"],
                _commissionpaidreport_commissionpaidreport_component__WEBPACK_IMPORTED_MODULE_12__["CommissionpaidreportComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _report_routing_module__WEBPACK_IMPORTED_MODULE_3__["ReportRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                primeng_chart__WEBPACK_IMPORTED_MODULE_10__["ChartModule"]
            ]
        })
    ], ReportModule);
    return ReportModule;
}());



/***/ }),

/***/ "./src/app/views/report/report.service.ts":
/*!************************************************!*\
  !*** ./src/app/views/report/report.service.ts ***!
  \************************************************/
/*! exports provided: ReportService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportService", function() { return ReportService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
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






var ReportService = /** @class */ (function () {
    function ReportService(http, commonService, router) {
        this.http = http;
        this.commonService = commonService;
        this.router = router;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].WebApiBaseUrl;
        this.leaseAmount = [];
    }
    //function used to fatch Lease Inventory List
    ReportService.prototype.getLeaseInventoryList = function (expFrom, expTo, leaseStatus, bankName, searchText, sortColumn, sortDir, pageIndex, pageSize, userId) {
        var _this = this;
        if (typeof expFrom == "undefined" || expFrom == null) {
            expFrom = null;
        }
        else {
            expFrom = expFrom.toDateString();
        }
        if (typeof expTo == "undefined" || expTo == null) {
            expTo = null;
        }
        else {
            expTo = expTo.toDateString();
        }
        return this.http.get(this.baseUri + ("Lease/LeaseInventoryList?searchText=" + searchText + "&expFrom=" + expFrom + "&expTo=" + expTo + "&leaseStatus=" + leaseStatus + "\n&bankName=" + bankName + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ReportService.prototype.getWelcomePackageTrackingReport = function (searchText, From, To, sortColumn, sortDir, pageIndex, pageSize, userId) {
        var _this = this;
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
        if (typeof searchText == "undefined" || searchText == null) {
            searchText = null;
        }
        else {
            searchText = encodeURIComponent((searchText));
        }
        return this.http.get(this.baseUri + ("Contact/WelcomePackageTrackingReport?searchText=" + searchText + "&From=" + From + "&To=" + To + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ReportService.prototype.getTitleWorkReportList = function (name, From, To, sortColumn, sortDir, page, pageSize, userId, leaseId) {
        var _this = this;
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
        return this.http.get(this.baseUri + ("Lease/GetTitleWorkRequestReportList?name=" + name + "&From=" + From + "&To=" + To + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId + "&leaseId=" + leaseId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ReportService.prototype.getCustomerLogReportList = function (name, expFrom, expTo, contactStatus, leaseStatus, bankName, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof expFrom == "undefined" || expFrom == null) {
            expFrom = null;
        }
        else {
            expFrom = expFrom.toDateString();
        }
        if (typeof expTo == "undefined" || expTo == null) {
            expTo = null;
        }
        else {
            expTo = expTo.toDateString();
        }
        return this.http.get(this.baseUri + ("Lease/GetCustomerLogReportList?name=" + name + "&expFrom=" + expFrom + "&expTo=" + expTo + "&contactStatus=" + contactStatus + "&leaseStatus=" + leaseStatus + "&bankName=" + bankName + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ReportService.prototype.getMonthlyLeaseLogList = function (name, expFrom, expTo, leaseStatus, bankName, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof expFrom == "undefined" || expFrom == null) {
            expFrom = null;
        }
        else {
            expFrom = expFrom.toDateString();
        }
        if (typeof expTo == "undefined" || expTo == null) {
            expTo = null;
        }
        else {
            expTo = expTo.toDateString();
        }
        return this.http.get(this.baseUri + ("Lease/GetMonthlyLeaseLog?name=" + name + "&expFrom=" + expFrom + "&expTo=" + expTo + "&leaseStatus=" + leaseStatus + "&bankName=" + bankName + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ReportService.prototype.getLeaseTrakingReportList = function (name, expFrom, expTo, expFundFrom, expFundTo, leaseStatus, bankName, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof expFrom == "undefined" || expFrom == null) {
            expFrom = null;
        }
        else {
            expFrom = expFrom.toDateString();
        }
        if (typeof expTo == "undefined" || expTo == null) {
            expTo = null;
        }
        else {
            expTo = expTo.toDateString();
        }
        return this.http.get(this.baseUri + ("Report/GetLeaseTrakingReport?name=" + name + "&expFrom=" + expFrom + "&expFundFrom=" + expFundFrom + "&expFundTo=" + expFundTo + "\n&expTo=" + expTo + "&leaseStatus=" + leaseStatus + "&bankName=" + bankName + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ReportService.prototype.GetLeaseTrackingAmount = function (userid) {
        var _this = this;
        return this.http.get(this.baseUri + ("Report/GetLeaseTrackingAmount?userId=" + userid))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.leaseAmount = response;
            return _this.leaseAmount;
        }));
    };
    ReportService.prototype.getCreditScoreTrackingReportList = function (name, expFrom, expTo, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof expFrom == "undefined" || expFrom == null) {
            expFrom = null;
        }
        else {
            expFrom = expFrom.toDateString();
        }
        if (typeof expTo == "undefined" || expTo == null) {
            expTo = null;
        }
        else {
            expTo = expTo.toDateString();
        }
        return this.http.get(this.baseUri + ("Report/GetCreditScoreTrackingReportList?name=" + name + "&expFrom=" + expFrom + "&expTo=" + expTo + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ReportService.prototype.getCommssionPaidReportList = function (name, expFrom, expTo, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof expFrom == "undefined" || expFrom == null) {
            expFrom = null;
        }
        else {
            expFrom = expFrom.toDateString();
        }
        if (typeof expTo == "undefined" || expTo == null) {
            expTo = null;
        }
        else {
            expTo = expTo.toDateString();
        }
        return this.http.get(this.baseUri + ("Report/GetCommssionPaidReportList?name=" + name + "&expFrom=" + expFrom + "&expTo=" + expTo + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ReportService.prototype.getInsuranceTrackingReport = function (searchText, expFrom, expTo, sortColumn, sortDir, pageNo, pageSize, userId) {
        var _this = this;
        if (typeof expFrom == "undefined" || expFrom == null) {
            expFrom = null;
        }
        else {
            expFrom = expFrom.toDateString();
        }
        if (typeof expTo == "undefined" || expTo == null) {
            expTo = null;
        }
        else {
            expTo = expTo.toDateString();
        }
        return this.http.get(this.baseUri + ("Report/InsuranceTrackingReport?searchText=" + searchText + "&expFrom=" + expFrom + "&expTo=" + expTo + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ReportService.prototype.getLeaseVolumeReportList = function (name, expFrom, expTo, sortColumn, sortDir, page, pageSize, userId, reportFor) {
        var _this = this;
        if (reportFor === void 0) { reportFor = ""; }
        if (typeof expFrom == "undefined" || expFrom == null) {
            expFrom = null;
        }
        else {
            expFrom = expFrom.toDateString();
        }
        if (typeof expTo == "undefined" || expTo == null) {
            expTo = null;
        }
        else {
            expTo = expTo.toDateString();
        }
        return this.http.get(this.baseUri + ("Report/GetLeaseVolumeReportList?expFrom=" + expFrom + "&expTo=" + expTo + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId + "&reportFor=" + reportFor))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ReportService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
    ]; };
    ReportService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], ReportService);
    return ReportService;
}());



/***/ }),

/***/ "./src/app/views/report/titlworkrequestreport/titleworkrequestreport.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/views/report/titlworkrequestreport/titleworkrequestreport.component.scss ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcG9ydC90aXRsd29ya3JlcXVlc3RyZXBvcnQvdGl0bGV3b3JrcmVxdWVzdHJlcG9ydC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/report/titlworkrequestreport/titleworkrequestreport.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/views/report/titlworkrequestreport/titleworkrequestreport.component.ts ***!
  \****************************************************************************************/
/*! exports provided: TitleworkrequestreportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TitleworkrequestreportComponent", function() { return TitleworkrequestreportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _report_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../report.service */ "./src/app/views/report/report.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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




var TitleworkrequestreportComponent = /** @class */ (function () {
    function TitleworkrequestreportComponent(reportService, commonService, routeActivate) {
        this.reportService = reportService;
        this.commonService = commonService;
        this.routeActivate = routeActivate;
        this.loading = false;
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.rowsForExport = [];
        this.searchTxt = '';
        this.isDashBoard = false;
        this.pageNumber = 0;
        this.loadSave = false;
    }
    TitleworkrequestreportComponent.prototype.ngOnInit = function () {
        this.SearhName = "";
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.SearchTitleWorkReport();
    };
    TitleworkrequestreportComponent.prototype.SearchTitleWorkReport = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getTitleWorkReportList(this.SearhName, this.From, this.To, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.leaseId, this.userid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    TitleworkrequestreportComponent.prototype.ResetSearch = function () {
        this.SearhName = '';
        this.listFilter = '';
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.To = null;
        this.From = null;
        this.pageNumber = 0;
        this.pageSizeValue = 10;
        this.SearchTitleWorkReport();
    };
    //function is used to manage enter key press on search text box
    TitleworkrequestreportComponent.prototype.updateFilter = function (event) {
        this.SearhName = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchTitleWorkReport();
        }
    };
    TitleworkrequestreportComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    TitleworkrequestreportComponent.prototype.onChange = function ($event) {
        this.SearchTitleWorkReport();
    };
    TitleworkrequestreportComponent.prototype.setPage = function ($event) {
        this.pageNumber = $event.page - 1;
        this.SearchTitleWorkReport();
    };
    TitleworkrequestreportComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.pageNumber = $event.page - 1;
        this.SearchTitleWorkReport();
    };
    TitleworkrequestreportComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getTitleWorkReportList(this.SearhName, this.From, this.To, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.leaseId, this.userid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Lease#': itm.LeaseNumber,
                        'Business Name': itm.ContactBussinessName,
                        'Contact Name': itm.ContactName,
                        'VIN#': itm.VIN,
                        'Bank': itm.BankName,
                        'Dealership': itm.Dealership,
                        'Contact @ Dealership': itm.contactDealership,
                        'Status': itm.LeaseStatus,
                        'Title Work Received Date': itm.TitleWorkReceivedDate,
                        'Title Work Send Date': itm.TitleWorkSendDate
                    });
                }
                _this.commonService.ExportData(_this.rowsForExport, "Excel", "TitleWorkTrackingReport", null);
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    TitleworkrequestreportComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getTitleWorkReportList(this.SearhName, this.From, this.To, this.sortColumn, this.sortDir, this.pageNumber, this.totalPageSize, this.leaseId, this.userid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'Lease#': itm.LeaseNumber,
                        'Business Name': itm.ContactBussinessName,
                        'Contact Name': itm.ContactName,
                        'VIN#': itm.VIN,
                        'Bank': itm.BankName,
                        'Dealership': itm.Dealership,
                        'Contact @ Dealership': itm.contactDealership,
                        'Status': itm.LeaseStatus,
                        'Title Work Received Date': itm.TitleWorkReceivedDate,
                        'Title Work Send Date': itm.TitleWorkSendDate
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "TitleWorkTrackingReport", "Large");
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    TitleworkrequestreportComponent.ctorParameters = function () { return [
        { type: _report_service__WEBPACK_IMPORTED_MODULE_1__["ReportService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    TitleworkrequestreportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-titleworkrequestreport',
            template: __importDefault(__webpack_require__(/*! raw-loader!./titleworkrequestreport.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/titlworkrequestreport/titleworkrequestreport.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./titleworkrequestreport.component.scss */ "./src/app/views/report/titlworkrequestreport/titleworkrequestreport.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_report_service__WEBPACK_IMPORTED_MODULE_1__["ReportService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], TitleworkrequestreportComponent);
    return TitleworkrequestreportComponent;
}());



/***/ }),

/***/ "./src/app/views/report/welcomepackagetrackingreport/welcomepackagetrackingreport.component.scss":
/*!*******************************************************************************************************!*\
  !*** ./src/app/views/report/welcomepackagetrackingreport/welcomepackagetrackingreport.component.scss ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcG9ydC93ZWxjb21lcGFja2FnZXRyYWNraW5ncmVwb3J0L3dlbGNvbWVwYWNrYWdldHJhY2tpbmdyZXBvcnQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/report/welcomepackagetrackingreport/welcomepackagetrackingreport.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/views/report/welcomepackagetrackingreport/welcomepackagetrackingreport.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: WelcomepackagetrackingreportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomepackagetrackingreportComponent", function() { return WelcomepackagetrackingreportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _report_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../report.service */ "./src/app/views/report/report.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
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






var WelcomepackagetrackingreportComponent = /** @class */ (function () {
    function WelcomepackagetrackingreportComponent(reportService, commonService, dialogService, toaster) {
        var _this = this;
        this.reportService = reportService;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.title = 'Excel';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataForImport = {
            pager: {},
            data: []
        };
        this.rowsForExport = [];
        this.loading = false;
        this.isCustomer = false;
        this.sortDir = 'asc';
        this.sortColumn = 'BusinessName';
        this.docSortDir = 'desc';
        this.pageNumber = 0;
        this.totalPageSize = 10;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    WelcomepackagetrackingreportComponent.prototype.ngOnInit = function () {
        this.searhName = "";
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.getLeaseRequestList();
    };
    WelcomepackagetrackingreportComponent.prototype.getLeaseRequestList = function () {
        var _this = this;
        this.reportService.getWelcomePackageTrackingReport(this.searhName, this.From, this.To, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (res) {
            _this.pagedData = _this.reportService.pagedData;
            _this.totalPageSize = _this.pagedData.pager.totalItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WelcomepackagetrackingreportComponent.prototype.SearchLease = function () {
        var _this = this;
        this.loading = true;
        this.reportService.getWelcomePackageTrackingReport(this.searhName, this.From, this.To, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.reportService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WelcomepackagetrackingreportComponent.prototype.updateFilter = function (event) {
        this.searhName = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchLease();
        }
    };
    WelcomepackagetrackingreportComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    WelcomepackagetrackingreportComponent.prototype.onChange = function ($eventSearchLease) {
        this.SearchLease();
    };
    WelcomepackagetrackingreportComponent.prototype.setPage = function ($event) {
        this.pageNumber = $event.page - 1;
        this.SearchLease();
    };
    WelcomepackagetrackingreportComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.pageNumber = $event.page - 1;
        this.SearchLease();
    };
    WelcomepackagetrackingreportComponent.prototype.ResetSearch = function () {
        this.From = null;
        this.To = null;
        this.searhName = "";
        this.sortDir = 'asc';
        this.sortColumn = 'BusinessName';
        this.pageNumber = 0;
        this.SearchLease();
    };
    WelcomepackagetrackingreportComponent.prototype.ExportTOExcel = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getWelcomePackageTrackingReport(this.searhName, this.From, this.To, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'SentBy': itm.SentBy,
                        'Business Name': itm.BusinessName,
                        'Contact Name': itm.ContactName,
                        'Email': itm.Email,
                        'Business Phone': itm.BusinessPhone,
                        'Contact Phone': itm.ContactPhone,
                        'Package Sent Date': itm.PackageSentDate
                    });
                }
                _this.commonService.ExportData(_this.rowsForExport, "Excel", "WelcomeReport", null);
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WelcomepackagetrackingreportComponent.prototype.generatePdf = function () {
        var _this = this;
        this.loading = true;
        this.rowsForExport = [];
        this.reportService.getWelcomePackageTrackingReport(this.searhName, this.From, this.To, this.sortColumn, this.sortDir, 0, this.totalPageSize, this.loginuserid).subscribe(function (response) {
            _this.pagedDataForImport = _this.reportService.pagedData;
            if (_this.pagedDataForImport.data.length > 0) {
                for (var _i = 0, _a = _this.pagedDataForImport.data; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    _this.rowsForExport.push({
                        'SentBy': itm.SentBy,
                        'Business Name': itm.BusinessName,
                        'Contact Name': itm.ContactName,
                        'Email': itm.Email,
                        'Business Phone': itm.BusinessPhone,
                        'Contact Phone': itm.ContactPhone,
                        'Package Sent Date': itm.PackageSentDate
                    });
                }
                _this;
                _this.commonService.ExportData(_this.rowsForExport, 'PDF', "WelcomeReport", null);
            }
            else { }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    WelcomepackagetrackingreportComponent.ctorParameters = function () { return [
        { type: _report_service__WEBPACK_IMPORTED_MODULE_3__["ReportService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["DatatableComponent"])
    ], WelcomepackagetrackingreportComponent.prototype, "table", void 0);
    WelcomepackagetrackingreportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-welcomepackagetrackingreport',
            template: __importDefault(__webpack_require__(/*! raw-loader!./welcomepackagetrackingreport.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/report/welcomepackagetrackingreport/welcomepackagetrackingreport.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./welcomepackagetrackingreport.component.scss */ "./src/app/views/report/welcomepackagetrackingreport/welcomepackagetrackingreport.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_report_service__WEBPACK_IMPORTED_MODULE_3__["ReportService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], WelcomepackagetrackingreportComponent);
    return WelcomepackagetrackingreportComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-report-report-module.js.map