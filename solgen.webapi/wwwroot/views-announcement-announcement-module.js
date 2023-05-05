(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-announcement-announcement-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/announcement/add-edit-announcement.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/announcement/add-edit-announcement.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/announcement\">Manage Announcement</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \">\r\n    <form [formGroup]=\"addAnnouncementForm\" autocomplete=\"off\">\r\n      <div class=\"row  mb-2\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <label>Title:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" formControlName=\"title\" maxlength=\"50\" placeholder=\"Enter title\"\r\n                   [ngClass]=\"{'is-invalid': (title.invalid && (title.dirty || title.touched) && (title.errors?.required || title.errors?.maxlength)) }\">\r\n            <small *ngIf=\"title.invalid && (title.dirty || title.touched) && title.errors?.required\"\r\n                   class=\"text-danger\">Title  is required</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <label>Recuring Type:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"lstRecuringType\" placeholder=\"Select Recuring Type\" bindLabel=\"text\" bindValue=\"value\" formControlName=\"recuringType\" (change)=\"onChange($event)\"\r\n                       [ngClass]=\"{'is-invalid': (recuringType.invalid && (recuringType.dirty || recuringType.touched) && recuringType.errors?.required)}\"></ng-select>\r\n            <small *ngIf=\"recuringType.invalid && (recuringType.dirty || recuringType.touched) && recuringType.errors?.required\"\r\n                   class=\"text-danger\">Please select Recuring Type</small>\r\n\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <label>Start Date:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group \">\r\n            <p-calendar formControlName=\"startDate\" placeholder=\"Select Date\" dateFormat=\"mm-dd-yy\" yearRange=\"2000:2030\" [minDate]=\"minimumDate\"\r\n                        [monthNavigator]=\"true\" [yearNavigator]=\"true\"\r\n                        [ngClass]=\"{'is-invalid': (startDate.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required) }\"></p-calendar>\r\n            <small *ngIf=\"startDate.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required\"\r\n                   style=\"color:red;\">Please select Date</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <label>End Date:<span *ngIf=\"endDateValidator\" class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group \">\r\n            <p-calendar formControlName=\"endDate\" placeholder=\"Select Date\" dateFormat=\"mm-dd-yy\" yearRange=\"2000:2030\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" [minDate]=\"(startDate.value == null ? minimumDate : startDate.value)\"\r\n                        [ngClass]=\"{'is-invalid': (endDate.invalid && (endDate.dirty || endDate.touched) && endDate.errors?.required) }\"></p-calendar>\r\n            <small *ngIf=\"endDate.invalid && (endDate.dirty || endDate.touched) && endDate.errors?.required\"\r\n                   style=\"color:red;\">Please select Date</small>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <label>UserType:</label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"lstUserType\" [loading]=\"loadSave\" multiple=\"true\" placeholder=\"Select UserType\" formControlName=\"usertype\"\r\n                       bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <label>Status :</label>\r\n          <div class=\"form-group\">\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\" id=\"customCheck1\" formControlName=\"Status\">\r\n              <span class=\"slider round\"><span>Yes</span></span>\r\n            </label>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <label>Choose File:</label>\r\n          <div class=\"form-group\">\r\n            <div class=\"input-group\">\r\n              <!--<div class=\"input-group-prepend\" *ngIf=\"imageLink!=''\">\r\n\r\n          <div id=\"myModal\" style=\" background: none !important;\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n            <div class=\"modal-dialog\" style=\"height:450px!important;width:450px!important; \">\r\n              <div class=\"\">\r\n                <button type=\"button\" class=\"close\" style=\"color: #fff!important; \" data-dismiss=\"modal\">&times;</button>\r\n              </div>\r\n              <div class=\"modal-content\">\r\n                <div class=\"text-center\">\r\n                  <img src={{imageLink}} alt=\"img\" style=\"height:450px!important;width:450px!important; \" class=\"img-responsive\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>-->\r\n              <div class=\"custom-file w-50 m-fileup\">\r\n                <input class=\"custom-file-input\" #file type=\"file\" name='file' #fileInput accept=\"audio/mp3,video/mp4,video/avi,video/mov,video/3gp,video/mpeg,image/x-png,image/gif,image/jpeg\" (change)=\"setFile($event)\" lang=\"es\">\r\n                <label class=\"custom-file-label\">{{setFileName}}</label>\r\n              </div>\r\n              <small><i class=\"text-primary\">Valid image format is audio/mp3, video/mp4, video/avi, video/mov, video/3gp, video/mpeg, image/x-png, image/gif, image/jpeg and limit upto 5MB.</i> </small>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-1 px-0\">\r\n          <label></label>\r\n          <div class=\"form-group mt-2 ml-3\">\r\n            <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"col-md-12 col-lg-12\">\r\n          <label>Message:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <textarea class=\"form-control\" rows=\"3\" placeholder=\"Enter message\" formControlName=\"message\"maxlength=\"500\"\r\n                      [ngClass]=\"{'is-invalid': (message.invalid && (message.dirty || message.touched) && (message.errors?.required || message.errors?.maxlength)) }\">\r\n                      </textarea>\r\n            <!--<input type=\"text\" class=\"form-control\" placeholder=\"Enter message\" formControlName=\"message\"\r\n      [ngClass]=\"{'is-invalid': (message.invalid && (message.dirty || message.touched) && (message.errors?.required || message.errors?.maxlength)) }\">-->\r\n            <small *ngIf=\"message.invalid && (message.dirty || message.touched) && message.errors?.required\"\r\n                   class=\"text-danger\">Message is required</small>\r\n\r\n          </div>\r\n        </div>\r\n\r\n\r\n\r\n        <!--<div class=\"col-md-12 col-lg-4\">\r\n    <label>Acknowledgment Required:</label>\r\n    <div class=\"form-group\">\r\n      <label class=\"switch\">\r\n        <input type=\"checkbox\" id=\"customCheck2\" formControlName=\"acknowledgmentRequired\">\r\n        <span class=\"slider round\"><span>Yes</span></span>\r\n      </label>\r\n    </div>\r\n  </div>-->\r\n\r\n\r\n      </div>\r\n\r\n      <div class=\"row mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf=\"addOrUpdatePermission\" href=\"javascript:void(0);\"  class=\"btn btn-success mr-2\" (click)=\"Save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"Cancel()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>-->\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/announcement/announcement.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/announcement/announcement.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Announcement</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Announcement</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-6 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Title\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-6 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"dt-buttons\">\r\n              <a *ngIf=\"isAdd\" class=\"btn btn-success form-btns mr-1\" routerLink=\"/announcement/addannouncement\" tooltip=\"Add Announcement\"><i class=\"fa fa-plus icon_tick\"></i> </a>\r\n              <a *ngIf=\"isDelete\" class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"remove()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash icon_tick\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                          [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                      \r\n                       [rows]=\"pagedData.data\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage+1\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                     \r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       \r\n                       (activate)=\"onActivate($event)\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"36\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Title\" prop=\"TITLE\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div title=\"{{row.TITLE}}\">\r\n                {{row.TITLE | truncate : 25}}\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Description\" prop=\"DESCRIPTION\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div title=\"{{row.DESCRIPTION}}\">\r\n                {{row.DESCRIPTION | truncate : 25}}\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Start Date\" prop=\"STARTDATE\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div title=\"{{row.STARTDATE}}\">\r\n                {{row.STARTDATE | DateTimeToLocal}}\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"End Date\" prop=\"ENDDATE\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div title=\"{{row.ENDDATE}}\">\r\n                {{row.ENDDATE | DateTimeToLocal}}\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Status\" [sortable]=\"false\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\" *ngIf=\"row.STATUSID == 1002\">\r\n                <a href=\"javascript:void(0);\" (click)=\"enable(row)\"><i title=\"Click to enable.\" class=\"fa fa-times text-danger icon_tick\"></i></a>\r\n              </div>\r\n              <div class=\"text-center\" *ngIf=\"row.STATUSID == 1001\">\r\n                <a href=\"javascript:void(0);\" (click)=\"disable(row)\"><i title=\"Click to disable.\" class=\"fa fa-check text-success icon_tick\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Recurring Type\" prop=\"recurringType\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"User Type\" prop=\"USERTYPE\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div title=\"{{row.USERTYPE}}\">\r\n                {{row.USERTYPE | truncate : 25 }}\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Created By\" prop=\"CREATEDBY\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [width]=\"45\" [maxWidth]=\"100\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.ID\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.ID}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <!--<a class=\"actions-onclick view-list\" [routerLink]=\"['/campaign/view',row.id]\" href=\"javascript:void(0);\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>-->\r\n                    <a *ngIf='isUpdate' class=\"actions-onclick view-list\" [routerLink]=\"['/announcement/editannouncement',row.ID]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"DeleteAnnouncement(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"pagedData.pager.currentPage+1\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div class=\"page-count\">\r\n                {{pagedData.pager.totalItems}} total\r\n              </div>\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"pagedData.pager.currentPage+1\"\r\n                               [size]=\"pagedData.pager.pageSize\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/announcement/add-edit-announcement.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/views/announcement/add-edit-announcement.component.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Fubm91bmNlbWVudC9hZGQtZWRpdC1hbm5vdW5jZW1lbnQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/announcement/add-edit-announcement.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/announcement/add-edit-announcement.component.ts ***!
  \***********************************************************************/
/*! exports provided: AddEditAnnouncementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditAnnouncementComponent", function() { return AddEditAnnouncementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _announcement_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./announcement.service */ "./src/app/views/announcement/announcement.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
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







var AddEditAnnouncementComponent = /** @class */ (function () {
    function AddEditAnnouncementComponent(Announcementservice, fb, commonService, router, toaster, dialogService, route) {
        var _this = this;
        this.Announcementservice = Announcementservice;
        this.fb = fb;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.route = route;
        this.setFileName = 'Choose file';
        this.loadSave = false;
        this.minimumDate = new Date();
        this.modulePermission = [];
        this.addOrUpdatePermission = false;
        this.endDateValidator = true;
        this.addAnnouncementForm = this.fb.group({
            id: [0],
            title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            recuringType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            startDate: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            endDate: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            Status: [false],
            acknowledgmentRequired: [false],
            usertype: [null],
            message: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'file': '',
            'filename': null,
        });
        this.commonService.getMasterItemsList("manageuser_usertype_role").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters; //.filter(x => x.masterName == "UserType");
            //console.log('lstUserType', this.lstUserType)
            var priviledgeCode = _this.route.snapshot.data.privilegeCode;
            var moduleCode = _this.route.snapshot.data.moduleCode;
            _this.modulePermission = _this.commonService.getPermissiondata(moduleCode);
            var add = _this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase(); });
            if (add == undefined) {
                _this.addOrUpdatePermission = false;
            }
            else {
                _this.addOrUpdatePermission = true;
            }
        });
        this.commonService.getMasterItemsList("RecuringType").subscribe(function (result) {
            _this.lstRecuringType = _this.commonService.masters; //.filter(x => x.masterName == "UserType");
            console.log('lstRecuringType', _this.lstRecuringType);
        });
        this.fileUrl = '';
    }
    AddEditAnnouncementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fileUrl = '';
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.announcementId = id;
            if (id) {
                _this.loadSave = true;
                _this.fillForm(id);
            }
            else {
                _this.pageTitle = 'Add Announcement';
            }
        });
        this.startDate.valueChanges.subscribe(function (m) {
            if (_this.recuringType.value) {
                if (_this.recuringType.value.name == 'Single') {
                    _this.endDate.setValue(m);
                }
                else {
                    _this.endDate.setValue(null);
                }
            }
        });
    };
    AddEditAnnouncementComponent.prototype.fillForm = function (id) {
        var _this = this;
        this.Announcementservice.getAnnouncementDetail(id).subscribe(function (result) {
            console.log('result000:', result);
            if (result) {
                _this.loadSave = false;
                _this.pageTitle = 'Edit Announcement: ' + result.title;
                var status_1 = (result.status_id == 1001 ? true : false);
                var sDate = new Date(result.sDate);
                var eDate = void 0;
                if (result.eDate) {
                    eDate = new Date(result.eDate);
                }
                else {
                    eDate = null;
                    _this.endDateValidator = false;
                    _this.endDate.clearValidators();
                    _this.endDate.updateValueAndValidity();
                }
                var ddl = '';
                if (result.usertype != null) {
                    ddl = result.usertype.split(',');
                }
                var recurring_1 = result.recuringType;
                if (_this.lstRecuringType != null) {
                    _this.recuringType.setValue(_this.lstRecuringType.find(function (m) { return m.value === recurring_1; }));
                }
                _this.setFileName = result.fileName == '' ? 'Choose file' : result.fileName;
                _this.fileUrl = result.file;
                _this.addAnnouncementForm.patchValue({
                    id: result.id,
                    title: result.title,
                    message: result.message,
                    startDate: sDate,
                    endDate: eDate,
                    Status: status_1,
                    usertype: ddl,
                    recuringType: result.recuringType
                });
                if (_this.recuringType.value) {
                    if (_this.recuringType.value.name == 'Single') {
                        _this.endDate.disable();
                    }
                }
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddEditAnnouncementComponent.prototype.onChange = function (e) {
        if (e) {
            if (e.name == 'Single') {
                this.startDate.setValue(null);
                this.endDate.setValue(null);
                this.endDate.disable();
                this.endDateValidator = false;
                this.endDate.clearValidators();
                this.endDate.updateValueAndValidity();
            }
            else {
                this.endDate.enable();
                this.endDateValidator = true;
                this.endDate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                this.endDate.updateValueAndValidity();
                this.startDate.setValue(null);
                this.endDate.setValue(null);
            }
        }
    };
    AddEditAnnouncementComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        input.append('id', this.id.value);
        input.append('title', this.title.value);
        if (this.recuringType.value) {
            input.append('recuringType', this.recuringType.value);
        }
        input.append('startDate', this.startDate.value.toDateString());
        if (this.endDate.value) {
            input.append('endDate', this.endDate.value.toDateString());
        }
        input.append('Status', this.Status.value);
        input.append('acknowledgmentRequired', this.acknowledgmentRequired.value);
        input.append('usertype', this.usertype.value);
        input.append('message', this.message.value);
        if (this.commonService.isUploadImageValid) {
            if (this.setFileName !== null) {
                input.append('filename', this.setFileName = 'Choose file' ? '' : undefined);
            }
        }
        console.log('this.fileInput.nativeElement', this.fileInput.nativeElement);
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            input.append('file', fileBrowser.files[0]);
        }
        debugger;
        if (this.announcementId) {
            input.append('file', this.fileUrl == '' ? '' : this.fileUrl);
        }
        return input;
    };
    AddEditAnnouncementComponent.prototype.Save = function () {
        var _this = this;
        console.log('addAnnouncementForm', this.addAnnouncementForm.value);
        if (this.addAnnouncementForm.valid) {
            this.loadSave = true;
            var companySetupModel = this.prepareFormDataForDocument();
            console.log('addAnnouncementForm111', companySetupModel);
            this.Announcementservice.saveAnnouncement(companySetupModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.fileInput.nativeElement.value = "";
                    _this.router.navigateByUrl("/announcement");
                    setTimeout(function () { _this.loadSave = false; }, 2000);
                }
                else {
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.loadSave = false;
            this.commonService.validateAllFormFields(this.addAnnouncementForm);
        }
    };
    AddEditAnnouncementComponent.prototype.setFile = function ($event) {
        this.commonService.uploadImageAudioVideoFileValidator($event);
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB");
        if (this.commonService.isFileValid) {
            this.setFileName = $event.target.files[0].name;
        }
    };
    AddEditAnnouncementComponent.prototype.Cancel = function () {
        this.router.navigateByUrl("/announcement");
    };
    AddEditAnnouncementComponent.prototype.reset = function () {
        this.setFileName = 'Choose file';
        this.fileUrl = null;
        this.fileInput.nativeElement.value = "";
    };
    Object.defineProperty(AddEditAnnouncementComponent.prototype, "id", {
        get: function () { return this.addAnnouncementForm.get('id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAnnouncementComponent.prototype, "title", {
        get: function () { return this.addAnnouncementForm.get('title'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAnnouncementComponent.prototype, "recuringType", {
        get: function () { return this.addAnnouncementForm.get('recuringType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAnnouncementComponent.prototype, "startDate", {
        get: function () { return this.addAnnouncementForm.get('startDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAnnouncementComponent.prototype, "endDate", {
        get: function () { return this.addAnnouncementForm.get('endDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAnnouncementComponent.prototype, "Status", {
        get: function () { return this.addAnnouncementForm.get('Status'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAnnouncementComponent.prototype, "acknowledgmentRequired", {
        get: function () { return this.addAnnouncementForm.get('acknowledgmentRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAnnouncementComponent.prototype, "usertype", {
        get: function () { return this.addAnnouncementForm.get('usertype'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAnnouncementComponent.prototype, "message", {
        get: function () { return this.addAnnouncementForm.get('message'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditAnnouncementComponent.prototype, "filename", {
        get: function () { return this.addAnnouncementForm.get('filename'); },
        enumerable: true,
        configurable: true
    });
    AddEditAnnouncementComponent.ctorParameters = function () { return [
        { type: _announcement_service__WEBPACK_IMPORTED_MODULE_1__["AnnouncementService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", Object)
    ], AddEditAnnouncementComponent.prototype, "fileInput", void 0);
    AddEditAnnouncementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-edit-announcement',
            template: __importDefault(__webpack_require__(/*! raw-loader!./add-edit-announcement.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/announcement/add-edit-announcement.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./add-edit-announcement.component.scss */ "./src/app/views/announcement/add-edit-announcement.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_announcement_service__WEBPACK_IMPORTED_MODULE_1__["AnnouncementService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], AddEditAnnouncementComponent);
    return AddEditAnnouncementComponent;
}());



/***/ }),

/***/ "./src/app/views/announcement/announcement-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/announcement/announcement-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: AnnouncementRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnouncementRoutingModule", function() { return AnnouncementRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _announcement_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./announcement.component */ "./src/app/views/announcement/announcement.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _add_edit_announcement_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-edit-announcement.component */ "./src/app/views/announcement/add-edit-announcement.component.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../auth/auth.guard */ "./src/app/auth/auth.guard.ts");
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
    { path: '', component: _announcement_component__WEBPACK_IMPORTED_MODULE_1__["AnnouncementComponent"] },
    { path: 'addannouncement', component: _add_edit_announcement_component__WEBPACK_IMPORTED_MODULE_3__["AddEditAnnouncementComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'ANNOUNCEMENTADD' } },
    { path: 'editannouncement/:id', component: _add_edit_announcement_component__WEBPACK_IMPORTED_MODULE_3__["AddEditAnnouncementComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'ANNOUNCEMENTUPDATE' } },
];
var AnnouncementRoutingModule = /** @class */ (function () {
    function AnnouncementRoutingModule() {
    }
    AnnouncementRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AnnouncementRoutingModule);
    return AnnouncementRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/announcement/announcement.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/views/announcement/announcement.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Fubm91bmNlbWVudC9hbm5vdW5jZW1lbnQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/announcement/announcement.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/announcement/announcement.component.ts ***!
  \**************************************************************/
/*! exports provided: AnnouncementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnouncementComponent", function() { return AnnouncementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _announcement_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./announcement.service */ "./src/app/views/announcement/announcement.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
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








var AnnouncementComponent = /** @class */ (function () {
    function AnnouncementComponent(announcementService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.announcementService = announcementService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.searchUserType = '';
        // modulePermission: ModuleList;
        this.loadSave = false;
        this.sortDir = 'desc';
        this.sortColumn = 'CREATED_AT';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["SelectionType"];
        this.selected = [];
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.announcementId = "";
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'ANNOUNCEMENTADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'ANNOUNCEMENTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'ANNOUNCEMENTDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
        });
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
    }
    AnnouncementComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.currentPage = 1;
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.search();
    };
    AnnouncementComponent.prototype.SetUserType = function (utype) {
        this.searchUserType = utype;
        this.search();
    };
    AnnouncementComponent.prototype.restddl = function () {
        this.searchUserType = '';
    };
    AnnouncementComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    AnnouncementComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    AnnouncementComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loadSave = true;
        this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.announcementService.pagedData;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AnnouncementComponent.prototype.search = function () {
        var _this = this;
        this.loadSave = true;
        this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.announcementService.pagedData;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AnnouncementComponent.prototype.reset = function () {
        var _this = this;
        this.table.selected = [];
        this.table.sorts = [];
        this.loadSave = true;
        this.listFilter = '';
        this.searchUserType = '';
        this.sortDir = 'desc';
        this.sortColumn = 'CREATED_AT';
        this.pageSizeValue = 10;
        this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, 0, 10).subscribe(function (response) {
            _this.pagedData = _this.announcementService.pagedData;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AnnouncementComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loadSave = true;
        this.currentPage = $event.page - 1;
        this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.announcementService.pagedData;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AnnouncementComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loadSave = true;
        this.currentPage = 0;
        this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.announcementService.pagedData;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AnnouncementComponent.prototype.refresh = function () {
        var _this = this;
        this.loadSave = true;
        this.announcementService.getAnnouncementList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.announcementService.pagedData;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AnnouncementComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        debugger;
        if (this.announcementId == "" || this.announcementId == null || this.announcementId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            for (var i = 0; i < selected.length; i++) {
                this.announcementId += selected[i].ID.toString() + ",";
            }
        }
        else {
            this.announcementId = null;
            this.announcementId = "";
            for (var i = 0; i < selected.length; i++) {
                this.announcementId += selected[i].ID.toString() + ",";
            }
        }
    };
    AnnouncementComponent.prototype.onActivate = function (event) {
    };
    AnnouncementComponent.prototype.remove = function () {
        var _this = this;
        if (this.announcementId != null && this.announcementId != "") {
            var message = "Are you sure you want to delete Announcement(s)?";
            this.dialogService.confirm('Delete Announcement(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.announcementService.deleteMultipleAnnouncements(_this.announcementId).subscribe(function (r) {
                        _this.toaster.success("Announcement(s) has been deleted successfully.");
                        _this.announcementId = "";
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
    AnnouncementComponent.prototype.DeleteAnnouncement = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Announcement \"" + row.TITLE + "\"?";
        this.dialogService.confirm('Delete Announcement ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.announcementService.delete(row.ID).subscribe(function (result) {
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
    AnnouncementComponent.prototype.disable = function (row) {
        var _this = this;
        var message = "Are you sure you want to disable this Announcement \"" + row.TITLE + "\"?";
        this.dialogService.confirm('Disable Announcement', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.announcementService.changeStatus(row.ID, row.STATUSID).subscribe(function (r) {
                    _this.refresh();
                    _this.toaster.success("\"" + row.TITLE + "\" has been disabled successfully ");
                }, function (error) {
                });
            }
        });
    };
    AnnouncementComponent.prototype.enable = function (row) {
        var _this = this;
        var message = "Are you sure you want to enable this Announcement  \"" + row.TITLE + "\"?";
        this.dialogService.confirm('Enable Email Template', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.announcementService.changeStatus(row.ID, row.STATUSID).subscribe(function (response) {
                    _this.refresh();
                    _this.toaster.success("\"" + row.TITLE + "\" has been enabled successfully");
                }, function (error) {
                });
            }
        });
    };
    AnnouncementComponent.ctorParameters = function () { return [
        { type: _announcement_service__WEBPACK_IMPORTED_MODULE_1__["AnnouncementService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('userTypeSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], AnnouncementComponent.prototype, "userTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('table', { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"])
    ], AnnouncementComponent.prototype, "table", void 0);
    AnnouncementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-announcement',
            template: __importDefault(__webpack_require__(/*! raw-loader!./announcement.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/announcement/announcement.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./announcement.component.scss */ "./src/app/views/announcement/announcement.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_announcement_service__WEBPACK_IMPORTED_MODULE_1__["AnnouncementService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], AnnouncementComponent);
    return AnnouncementComponent;
}());



/***/ }),

/***/ "./src/app/views/announcement/announcement.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/announcement/announcement.module.ts ***!
  \***********************************************************/
/*! exports provided: AnnouncementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnouncementModule", function() { return AnnouncementModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _announcement_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./announcement.component */ "./src/app/views/announcement/announcement.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _add_edit_announcement_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add-edit-announcement.component */ "./src/app/views/announcement/add-edit-announcement.component.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _announcement_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./announcement-routing.module */ "./src/app/views/announcement/announcement-routing.module.ts");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/calendar */ "./node_modules/primeng/calendar.js");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_calendar__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
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











var AnnouncementModule = /** @class */ (function () {
    function AnnouncementModule() {
    }
    AnnouncementModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_announcement_component__WEBPACK_IMPORTED_MODULE_2__["AnnouncementComponent"], _add_edit_announcement_component__WEBPACK_IMPORTED_MODULE_4__["AddEditAnnouncementComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"], _announcement_routing_module__WEBPACK_IMPORTED_MODULE_7__["AnnouncementRoutingModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], primeng_calendar__WEBPACK_IMPORTED_MODULE_8__["CalendarModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalModule"]
            ]
        })
    ], AnnouncementModule);
    return AnnouncementModule;
}());



/***/ }),

/***/ "./src/app/views/announcement/announcement.service.ts":
/*!************************************************************!*\
  !*** ./src/app/views/announcement/announcement.service.ts ***!
  \************************************************************/
/*! exports provided: AnnouncementService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnouncementService", function() { return AnnouncementService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
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




var AnnouncementService = /** @class */ (function () {
    function AnnouncementService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
    }
    AnnouncementService.prototype.saveAnnouncement = function (CompanySetUpModel) {
        return this.http.post(this.baseUri + "announcement/saveAnnouncement", CompanySetUpModel);
    };
    AnnouncementService.prototype.getAnnouncementList = function (name, sortColumn, sortDir, page, pageSize) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "announcement/GetAnnouncementList?title=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    AnnouncementService.prototype.changeStatus = function (ids, STATUSID) {
        return this.http.post(this.baseUri + "announcement/ChangeStatus?ids=" + ids + "&statusId=" + STATUSID, null);
    };
    AnnouncementService.prototype.delete = function (ids) {
        return this.http.get(this.baseUri + ("announcement/Delete?ids=" + ids));
    };
    AnnouncementService.prototype.deleteMultipleAnnouncements = function (ids) {
        return this.http.get(this.baseUri + ("announcement/DeleteMultipleAnnouncements?ids=" + ids));
    };
    AnnouncementService.prototype.getAnnouncementDetail = function (id) {
        return this.http.get(this.baseUri + ("announcement/GetAnnouncementDetailById?id=" + id));
    };
    AnnouncementService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    AnnouncementService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AnnouncementService);
    return AnnouncementService;
}());



/***/ })

}]);
//# sourceMappingURL=views-announcement-announcement-module.js.map