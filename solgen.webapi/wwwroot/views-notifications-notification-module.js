(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-notifications-notification-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/notifications/listnotification.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/notifications/listnotification.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Notifications</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Notifications</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-lg-4 col-xl-3\">\r\n            <div class=\"form-group mb-xl-0\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Sender Name\" (keyup)='updateFilter($event)'>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-4 col-xl-3\">\r\n            <div class=\"form-group mb-xl-0 d-inline-block w-100 flex-full\">\r\n              <div class=\"input-group\">\r\n                <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From\" [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                <div class=\"input-group-append\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-calendar font-16\"></i></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-4 col-xl-3\">\r\n            <div class=\"form-group mb-xl-0 d-inline-block w-100 flex-full\">\r\n              <div class=\"input-group\">\r\n                <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                <div class=\"input-group-append\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-calendar font-16\"></i></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-xl-3\">\r\n            <div class=\"d-inline-block align-top\">\r\n              <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n              <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n          </div>\r\n        </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"pagedData.data\"\r\n                       [columnMode]=\"'force'\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"50\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\">\r\n          <ngx-datatable-column name=\"Sender Name\" prop=\"senderName\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span>{{row.senderName}}</span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Subject\" prop=\"Subject\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span [innerHtml]=\"row.Subject\"></span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Received On\" prop=\"CreatedOn\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span>{{row.CreatedOn | utcdatetimetolocal}}</span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Read On\" prop=\"ReadOn\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span *ngIf=\"row.IsRead\">{{row.ReadOn | utcdatetimetolocal}}</span>\r\n              <span class=\"badge badge-warning\" style=\"color:white;padding:5px\" *ngIf=\"!row.IsRead\">Unread</span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n\r\n                <a href=\"javascript:void(0);\" (click)=\"displayDetail(row)\"><i class=\"fa fa-eye text-info\" title=\"View\"></i></a> &nbsp;\r\n                <a href=\"javascript:void(0);\" (click)=\"redirectToSource(row)\">\r\n                  <i class=\"fa fa-external-link\" aria-hidden=\"true\" title=\"Go To Source\"></i>          \r\n                </a> \r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>   \r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div class=\"page-count\">\r\n                {{rowCount}} total\r\n              </div>\r\n              <div>\r\n                <div class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"pagedData.pager.currentPage+1\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-notification-detail #notificationDetailModal></app-notification-detail>\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/notifications/notification-detail.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/notifications/notification-detail.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #notificationDetailModal=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Message</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px;\">\r\n        <div class=\"col-md-12\" *ngIf=\"dataNoti\">\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group row\">\r\n                <label for=\"staticEmail\" class=\"col-sm-3 col-form-label font-weight-bold\">Sender:</label>\r\n                <div class=\"col-sm-9\">\r\n                  <p class=\"form-control-plaintext text-left\" id=\"staticEmail\">{{dataNoti.senderName}}</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group row\">\r\n                <label for=\"staticEmail\" class=\"col-sm-5 col-form-label font-weight-bold\">Received On:</label>\r\n                <div class=\"col-sm-7\">\r\n                  <p class=\"form-control-plaintext text-left\" id=\"staticEmail\">{{dataNoti.CreatedOn | utcdatetimetolocal}}</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group row\">\r\n                <label for=\"staticEmail\" class=\"col-sm-3 col-form-label font-weight-bold\">Subject:</label>\r\n                <div class=\"col-sm-9\">\r\n                  <p class=\"form-control-plaintext text-left\" id=\"staticEmail\">{{dataNoti.Subject}}</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group row\">\r\n                <label for=\"staticEmail\" class=\"col-sm-5 col-form-label font-weight-bold\">Status:</label>\r\n                <div class=\"col-sm-7\">\r\n                  <p class=\"form-control-plaintext text-left\" id=\"staticEmail\">\r\n                    <span *ngIf=\"!dataNoti.IsRead; else IsUnread\" class=\"badge badge-warning\">Unread</span>\r\n                    <ng-template #IsUnread>\r\n                      <span class=\"badge badge-success\">Read</span>\r\n                    </ng-template>\r\n                  </p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-12\">\r\n              <div class=\"form-group row\">\r\n                <label for=\"staticEmail\" class=\"col-sm-12 col-form-label font-weight-bold\">Message:</label>\r\n                <div class=\"col-sm-12\">\r\n                  <p class=\"form-control-plaintext text-left\" [innerHTML]=\"dataNoti.Message\"></p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-sm-3 col-form-label font-weight-bold\">Read On:</label>\r\n                <div class=\"col-sm-9\">\r\n                  <p class=\"form-control-plaintext text-left\">{{dataNoti.ReadOn | utcdatetimetolocal}}</p>\r\n                </div>\r\n              </div>\r\n            </div>          \r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i>Close</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/notifications/listnotification.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/notifications/listnotification.component.ts ***!
  \*******************************************************************/
/*! exports provided: ListNotificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListNotificationComponent", function() { return ListNotificationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _notification_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification.service */ "./src/app/views/notifications/notification.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _notification_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notification-detail.component */ "./src/app/views/notifications/notification-detail.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/utils */ "./node_modules/ngx-bootstrap/utils/fesm5/ngx-bootstrap-utils.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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







var ListNotificationComponent = /** @class */ (function () {
    function ListNotificationComponent(notificationService, routerService, commonService) {
        var _this = this;
        this.notificationService = notificationService;
        this.routerService = routerService;
        this.commonService = commonService;
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.currentPageNo = 0;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.isDashBoard = false;
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    ListNotificationComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
    };
    ListNotificationComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    ListNotificationComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ListNotificationComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.notificationService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ListNotificationComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.notificationService.pagedData;
            _this.loading = false;
            _this.setnotifcount();
        }, function (error) {
            _this.loading = false;
        });
    };
    ListNotificationComponent.prototype.setnotifcount = function () {
        var unreadcount = 0;
        var hasmore = "";
        this.commonService.getHeaderData(this.commonService.LoginUser.id).subscribe(function (res) {
            unreadcount = res.total;
            hasmore = res.hasMore;
            if (unreadcount <= 5 && hasmore != "+") {
                ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_5__["document"].getElementById("spnnotif").innerHTML = unreadcount;
                ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_5__["document"].getElementById("spnnotifhide").style.visibility = "hidden";
            }
            else {
                ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_5__["document"].getElementById("spnnotif").innerHTML = unreadcount;
                ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_5__["document"].getElementById("spnnotifhide").style.visibility = "visible";
            }
        }, function (error) {
        });
    };
    ListNotificationComponent.prototype.reset = function () {
        var _this = this;
        this.table.sorts = [];
        this.From = null;
        this.To = null;
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.pageSizeValue = 10;
        this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, 10, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.notificationService.pagedData;
            _this.loading = false;
            _this.setnotifcount();
        }, function (error) {
            _this.loading = false;
        });
    };
    ListNotificationComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.currentPageNo = $event.page - 1;
        this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.notificationService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ListNotificationComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.notificationService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ListNotificationComponent.prototype.refresh = function () {
        var _this = this;
        debugger;
        this.loading = true;
        this.notificationService.getNotificationList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.notificationService.pagedData;
            _this.loading = false;
            _this.setnotifcount();
        }, function (error) {
            _this.loading = false;
        });
    };
    ListNotificationComponent.prototype.displayDetail = function (row) {
        var _this = this;
        this.loading = true;
        if (!row.IsRead) {
            this.notificationService.setNotificationToRead(row.UserNotificationId).subscribe(function (response) {
                _this.loading = false;
                _this.loading = true;
                _this.notificationService.getNotificationList(_this.listFilter, _this.From, _this.To, _this.sortColumn, _this.sortDir, _this.currentPageNo, _this.pageSizeValue, _this.commonService.LoginUser.id, _this.isDashBoard).subscribe(function (response) {
                    _this.pagedData = _this.notificationService.pagedData;
                    _this.loading = false;
                    _this.setnotifcount();
                }, function (error) {
                    _this.loading = false;
                });
            }, function (error) {
                _this.loading = false;
            });
        }
        this.notificationDetailModal.show(row);
    };
    ListNotificationComponent.prototype.redirectToSource = function (row) {
        var _this = this;
        console.log(row);
        this.notificationService.setNotificationToRead(row.UserNotificationId).subscribe(function (m) {
            _this.routerService.navigateByUrl(row.RouteUrl);
        });
    };
    ListNotificationComponent.ctorParameters = function () { return [
        { type: _notification_service__WEBPACK_IMPORTED_MODULE_1__["NotificationService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('notificationDetailModal', { static: false }),
        __metadata("design:type", _notification_detail_component__WEBPACK_IMPORTED_MODULE_3__["NotificationDetailComponent"])
    ], ListNotificationComponent.prototype, "notificationDetailModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["DatatableComponent"])
    ], ListNotificationComponent.prototype, "table", void 0);
    ListNotificationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ListNotification',
            template: __importDefault(__webpack_require__(/*! raw-loader!./listnotification.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/notifications/listnotification.component.html")).default
        }),
        __metadata("design:paramtypes", [_notification_service__WEBPACK_IMPORTED_MODULE_1__["NotificationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"]])
    ], ListNotificationComponent);
    return ListNotificationComponent;
}());



/***/ }),

/***/ "./src/app/views/notifications/notification-detail.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/views/notifications/notification-detail.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9uLWRldGFpbC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/notifications/notification-detail.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/views/notifications/notification-detail.component.ts ***!
  \**********************************************************************/
/*! exports provided: NotificationDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationDetailComponent", function() { return NotificationDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _notification_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification.service */ "./src/app/views/notifications/notification.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
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



var NotificationDetailComponent = /** @class */ (function () {
    function NotificationDetailComponent() {
        this.notifications = new _notification_service__WEBPACK_IMPORTED_MODULE_1__["NotificationModel"]();
        this.active = false;
        this.loading = false;
        this.pagedData = {
            pager: {},
            data: []
        };
    }
    NotificationDetailComponent.prototype.ngOnInit = function () {
    };
    NotificationDetailComponent.prototype.close = function () {
        this.active = false;
        this.modalnotif.hide();
    };
    NotificationDetailComponent.prototype.show = function (row) {
        if (row) {
            this.dataNoti = row;
            this.modalnotif.show();
        }
        this.active = true;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('notificationDetailModal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], NotificationDetailComponent.prototype, "modalnotif", void 0);
    NotificationDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notification-detail',
            template: __importDefault(__webpack_require__(/*! raw-loader!./notification-detail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/notifications/notification-detail.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./notification-detail.component.scss */ "./src/app/views/notifications/notification-detail.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], NotificationDetailComponent);
    return NotificationDetailComponent;
}());



/***/ }),

/***/ "./src/app/views/notifications/notification-routing.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/views/notifications/notification-routing.module.ts ***!
  \********************************************************************/
/*! exports provided: NotificationRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationRoutingModule", function() { return NotificationRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _listnotification_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listnotification.component */ "./src/app/views/notifications/listnotification.component.ts");
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
    { path: '', component: _listnotification_component__WEBPACK_IMPORTED_MODULE_2__["ListNotificationComponent"] }
];
var NotificationRoutingModule = /** @class */ (function () {
    function NotificationRoutingModule() {
    }
    NotificationRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], NotificationRoutingModule);
    return NotificationRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/notifications/notification.module.ts":
/*!************************************************************!*\
  !*** ./src/app/views/notifications/notification.module.ts ***!
  \************************************************************/
/*! exports provided: NotificationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationModule", function() { return NotificationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _listnotification_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listnotification.component */ "./src/app/views/notifications/listnotification.component.ts");
/* harmony import */ var _notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notification.service */ "./src/app/views/notifications/notification.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/calendar */ "./node_modules/primeng/calendar.js");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_calendar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _notification_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./notification-routing.module */ "./src/app/views/notifications/notification-routing.module.ts");
/* harmony import */ var _notification_detail_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./notification-detail.component */ "./src/app/views/notifications/notification-detail.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};













var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _listnotification_component__WEBPACK_IMPORTED_MODULE_3__["ListNotificationComponent"],
                _notification_detail_component__WEBPACK_IMPORTED_MODULE_9__["NotificationDetailComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _notification_routing_module__WEBPACK_IMPORTED_MODULE_8__["NotificationRoutingModule"], primeng_calendar__WEBPACK_IMPORTED_MODULE_6__["CalendarModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_7__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__["ModalModule"],
            ],
            providers: [_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"]],
            bootstrap: [_listnotification_component__WEBPACK_IMPORTED_MODULE_3__["ListNotificationComponent"]]
        })
    ], NotificationModule);
    return NotificationModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-notifications-notification-module.js.map