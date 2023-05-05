(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-emailtracking-emailtracking-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailtracking/emailtracking.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailtracking/emailtracking.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Email Tracking</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a href=\"operation-dashboard.html\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Email Tracking</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- Header Section-->\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-12 col-md-6 col-lg-3\">\r\n                  <div class=\"form-group mb-lg-0\">\r\n                    <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From\" [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-3\">\r\n                  <div class=\"form-group mb-lg-0\">\r\n                    <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"col-12 col-md-12 col-lg-6 col-xl-2\">\r\n                  <div class=\"form-group mb-xl-0\">\r\n                    <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                    <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 mt-4\">\r\n              <nav>\r\n                <div class=\"nav nav-tabs\" id=\"nav-tab\" role=\"tablist\">\r\n                  <a class=\"nav-item nav-link {{isactivesent}}\" id=\"nav-home-tab\" data-toggle=\"tab\" href=\"#\" role=\"tab\" (click)=\"loadtab(1)\" aria-selected=\"true\">Emails Sent({{sentcount}})</a>\r\n                  <a class=\"nav-item nav-link {{isactivefail}}\" id=\"nav-contact-tab\" data-toggle=\"tab\" href=\"#\" role=\"tab\" (click)=\"loadtab(0)\" aria-selected=\"false\">Emails Failed({{failcount}})</a>\r\n                </div>\r\n              </nav>\r\n              <div class=\"tab-content\" id=\"nav-tabContent\">\r\n                <div class=\"tab-pane fade show active\" id=\"nav-home\" role=\"tabpanel\" aria-labelledby=\"nav-home-tab\">\r\n\r\n                  <div class=\"table-responsive\">\r\n                    <div class=\"table table-striped\">\r\n                      <ngx-datatable  #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"pagedData.data\"\r\n                                        [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"50\"\r\n                                     \r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"pagedData.pager.totalItems\"\r\n                                     [offset]=\"pagedData.pager.currentPage\"\r\n                                     [limit]=\"pagedData.pager.pageSize\"\r\n                                     (page)='setPage($event)'\r\n                                     (sort)=\"onSort($event)\">\r\n                        <ngx-datatable-column name=\"Email Subject\" prop=\"EmailSubject\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <span>{{row.EmailSubject}}</span>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Email From\" prop=\"EmailFrom\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <span>{{row.EmailFrom}}</span>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Email To\" prop=\"EmailTo\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <span>{{row.EmailTo}}</span>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Date Time\" prop=\"CreatedOn\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <span>{{row.CreatedOn | date: 'MM-dd-yyyy hh:mm:ss a'}}</span>\r\n                           \r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\">\r\n                              {{rowCount}} total\r\n                            </div>\r\n                            <div>\r\n                              <div class=\"page-size-record\">\r\n                                <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                                  <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                             bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                                </span>\r\n                              </div>\r\n                            </div>\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                             [page]=\"pagedData.pager.currentPage+1\"\r\n                                             [size]=\"pageSizeValue\"\r\n                                             [count]=\"pagedData.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                             (change)=\"setPage($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable> \r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n              \r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/emailtracking/emailtracking.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/views/emailtracking/emailtracking.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2VtYWlsdHJhY2tpbmcvZW1haWx0cmFja2luZy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/emailtracking/emailtracking.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/emailtracking/emailtracking.component.ts ***!
  \****************************************************************/
/*! exports provided: EmailtrackingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailtrackingComponent", function() { return EmailtrackingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _emailtracking_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emailtracking.service */ "./src/app/views/emailtracking/emailtracking.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
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




var EmailtrackingComponent = /** @class */ (function () {
    function EmailtrackingComponent(emailtrackingService, commonService) {
        this.emailtrackingService = emailtrackingService;
        this.commonService = commonService;
        this.loading = false;
        this.isactivesent = "active";
        this.isactivefail = "";
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.currentPageNo = 0;
        this.sentcount = 0;
        this.failcount = 0;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.loadSave = false;
    }
    EmailtrackingComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.type = 1;
        this.getPageSizes();
        this.refresh();
    };
    EmailtrackingComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.isactivesent = "active";
        this.isactivefail = "";
        this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.type).subscribe(function (response) {
            _this.pagedData = _this.emailtrackingService.pagedData;
            if (_this.pagedData.data.length > 0) {
                _this.sentcount = _this.pagedData.data[0].SentRecord;
                _this.failcount = _this.pagedData.data[0].FailRecord;
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtrackingComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    EmailtrackingComponent.prototype.reset = function () {
        var _this = this;
        this.table.sorts = [];
        this.From = null;
        this.To = null;
        this.type = 1;
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.pageSizeValue = 10;
        this.isactivesent = "active";
        this.isactivefail = "";
        this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, 0, 10, this.type).subscribe(function (response) {
            _this.pagedData = _this.emailtrackingService.pagedData;
            if (_this.pagedData.data.length > 0) {
                _this.sentcount = _this.pagedData.data[0].SentRecord;
                _this.failcount = _this.pagedData.data[0].FailRecord;
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtrackingComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.currentPageNo = $event.page - 1;
        this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.type).subscribe(function (response) {
            _this.pagedData = _this.emailtrackingService.pagedData;
            if (_this.pagedData.data.length > 0) {
                _this.sentcount = _this.pagedData.data[0].SentRecord;
                _this.failcount = _this.pagedData.data[0].FailRecord;
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtrackingComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.type).subscribe(function (response) {
            _this.pagedData = _this.emailtrackingService.pagedData;
            if (_this.pagedData.data.length > 0) {
                _this.sentcount = _this.pagedData.data[0].SentRecord;
                _this.failcount = _this.pagedData.data[0].FailRecord;
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtrackingComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    EmailtrackingComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.type).subscribe(function (response) {
            _this.pagedData = _this.emailtrackingService.pagedData;
            if (_this.pagedData.data.length > 0) {
                _this.sentcount = _this.pagedData.data[0].SentRecord;
                _this.failcount = _this.pagedData.data[0].FailRecord;
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtrackingComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.type).subscribe(function (response) {
            _this.pagedData = _this.emailtrackingService.pagedData;
            if (_this.pagedData.data.length > 0) {
                _this.sentcount = _this.pagedData.data[0].SentRecord;
                _this.failcount = _this.pagedData.data[0].FailRecord;
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtrackingComponent.prototype.loadtab = function (type) {
        var _this = this;
        this.type = type;
        if (type == "1") {
            this.isactivesent = "active";
            this.isactivefail = "";
        }
        else {
            this.isactivesent = "";
            this.isactivefail = "active";
        }
        this.loading = true;
        this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.type).subscribe(function (response) {
            _this.pagedData = _this.emailtrackingService.pagedData;
            if (_this.pagedData.data.length > 0) {
                _this.sentcount = _this.pagedData.data[0].SentRecord;
                _this.failcount = _this.pagedData.data[0].FailRecord;
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtrackingComponent.ctorParameters = function () { return [
        { type: _emailtracking_service__WEBPACK_IMPORTED_MODULE_1__["EmailtrackingService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"])
    ], EmailtrackingComponent.prototype, "table", void 0);
    EmailtrackingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-emailtracking',
            template: __importDefault(__webpack_require__(/*! raw-loader!./emailtracking.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailtracking/emailtracking.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./emailtracking.component.scss */ "./src/app/views/emailtracking/emailtracking.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_emailtracking_service__WEBPACK_IMPORTED_MODULE_1__["EmailtrackingService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"]])
    ], EmailtrackingComponent);
    return EmailtrackingComponent;
}());



/***/ }),

/***/ "./src/app/views/emailtracking/emailtracking.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/emailtracking/emailtracking.module.ts ***!
  \*************************************************************/
/*! exports provided: EmailtrackingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailtrackingModule", function() { return EmailtrackingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/calendar */ "./node_modules/primeng/calendar.js");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primeng_calendar__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emailtracking_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./emailtracking.component */ "./src/app/views/emailtracking/emailtracking.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
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
    { path: '', component: _emailtracking_component__WEBPACK_IMPORTED_MODULE_6__["EmailtrackingComponent"] }
];
var EmailtrackingModule = /** @class */ (function () {
    function EmailtrackingModule() {
    }
    EmailtrackingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_emailtracking_component__WEBPACK_IMPORTED_MODULE_6__["EmailtrackingComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                primeng_calendar__WEBPACK_IMPORTED_MODULE_5__["CalendarModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["NgxDatatableModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
            ]
        })
    ], EmailtrackingModule);
    return EmailtrackingModule;
}());



/***/ }),

/***/ "./src/app/views/emailtracking/emailtracking.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/emailtracking/emailtracking.service.ts ***!
  \**************************************************************/
/*! exports provided: EmailtrackingService, EmailTrackModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailtrackingService", function() { return EmailtrackingService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailTrackModel", function() { return EmailTrackModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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




var EmailtrackingService = /** @class */ (function () {
    function EmailtrackingService(http) {
        this.http = http;
        this.emailTrackUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl + "EmailTrack";
    }
    EmailtrackingService.prototype.getEmailTrackingList = function (From, To, sortColumn, sortDir, page, pageSize, type) {
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
        return this.http.get(this.emailTrackUri + "/EmailTrackingList?From=" + From + "&To=" + To + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&type=" + type)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    EmailtrackingService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    EmailtrackingService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], EmailtrackingService);
    return EmailtrackingService;
}());

var EmailTrackModel = /** @class */ (function () {
    function EmailTrackModel() {
        this.emailTrackId = "";
        this.emailSubject = "";
        this.emailFrom = "";
        this.emailTo = "";
        this.createdOn = "";
    }
    return EmailTrackModel;
}());



/***/ })

}]);
//# sourceMappingURL=views-emailtracking-emailtracking-module.js.map