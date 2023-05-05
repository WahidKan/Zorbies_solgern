(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-master-master-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/master/create-master/create-master.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/master/create-master/create-master.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-9 mt-3\">\r\n          <span class=\"dash\">Manage Master</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/master\">Manage Master</a></li>\r\n            <li class=\"breadcrumb-item active\">{{pageTitle}}</li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col-md-3 mt-4 text-right\">\r\n          <button class=\"w-auto sw-100 btn btn-dark\" (click)=\"close()\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n        </div>\r\n      </div>\r\n    </div>   \r\n  </div>\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 mt-4\" [ngClass]=\"{'disabled':loading}\">\r\n              <form [formGroup]=\"masterForm\" autocomplete=\"off\">\r\n                <div class=\"master-box\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Select Master:<span class=\"text-danger\">*</span></label>\r\n                      <ng-select [items]=\"masterdata\"\r\n                                 placeholder=\"Select masters Type\" formControlName=\"masterNameId\" bindValue=\"value\" bindLabel=\"text\">\r\n                      </ng-select>\r\n                      <small *ngIf=\"masterNameId.invalid && (masterNameId.dirty || masterNameId.touched) && masterNameId.errors?.required\"\r\n                             class=\"text-danger\">Please select Master</small>\r\n                    </div>\r\n\r\n                    <div *ngIf=\"!id\" class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Master Key:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Please enter Master Key\" [attr.disabled]=\"isDisabled\"\r\n                               formControlName=\"masterKey\"\r\n                               [ngClass]=\"{'is-invalid': (masterKey.invalid && (masterKey.dirty || masterKey.touched) && (masterKey.errors?.required || masterKey.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"masterKey.invalid && (masterKey.dirty || masterKey.touched) && masterKey.errors?.required\"\r\n                               class=\"text-danger\">Master Key is required</small>\r\n                        <small *ngIf=\"masterKey.invalid && (masterKey.dirty || masterKey.touched) && masterKey.errors?.maxlength\"\r\n                               class=\"text-danger\">Master key must be less than 50 characters.</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Master Value:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Please enter Master value\"\r\n                               formControlName=\"masterValue\"\r\n                               [ngClass]=\"{'is-invalid': (masterValue.invalid && (masterValue.dirty || masterValue.touched) && (masterValue.errors?.required || masterValue.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"masterValue.invalid && (masterValue.dirty || masterValue.touched) && masterValue.errors?.required\"\r\n                               class=\"text-danger\">Master Value is required</small>\r\n                        <small *ngIf=\"masterValue.invalid && (masterValue.dirty || masterValue.touched) && masterValue.errors?.maxlength\"\r\n                               class=\"text-danger\">Master Value must be less than 50 characters.</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Status:<span style=\"color:red\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select [items]=\"statuses\" [loading]=\"loadSave\" [closeOnSelect]=\"true\" placeholder=\"Select status\" formControlName=\"masterStatusId\"\r\n                                   bindLabel=\"text\" bindValue=\"value\"\r\n                                   [ngClass]=\"{'is-invalid': (masterStatusId.invalid && (masterStatusId.dirty || masterStatusId.touched) && masterStatusId.errors?.required) }\"></ng-select>\r\n                        <small *ngIf=\"masterStatusId.invalid && (masterStatusId.dirty || masterStatusId.touched) && masterStatusId.errors?.required\"\r\n                               style=\"color:red;\">Please select Status</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Description:</label>\r\n                      <div class=\"form-group\">\r\n                        <textarea type=\"text\" class=\"form-control\" formControlName=\"masterDescription\"\r\n                                  [ngClass]=\"{'is-invalid': (masterDescription.invalid && (masterDescription.dirty || masterDescription.touched) && (masterDescription.errors?.required || masterDescription.errors?.maxlength)) }\"></textarea>\r\n                        <small *ngIf=\"masterDescription.invalid && (masterDescription.dirty || masterDescription.touched) && masterDescription.errors?.required\"\r\n                               class=\"text-danger\">Description is required</small>\r\n                        <small *ngIf=\"masterDescription.invalid && (masterDescription.dirty || masterDescription.touched) && masterDescription.errors?.maxlength\"\r\n                               class=\"text-danger\">Description must be less than 1000 characters</small>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n              </form>\r\n              <div class=\"col-12 p-0\">\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-primary form-btns\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger form-btns\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/master/list-master/list-master.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/master/list-master/list-master.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Manage Master</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Manage Master</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <ng-select #clearDrop [items]=\"masterdata\" placeholder=\"Select Master\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"SetMasterValue($event.value)\"\r\n                                   (clear)=\"restMasterddl()\">\r\n                        </ng-select>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Master/Maste Value/Master Key\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-6 col-xl-2 mr-auto\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-6 col-xl-2 text-md-right float-right\"><a routerLink=\"/master/create\" class=\"btn btn-orange form-btns \"><i class=\"fa fa-plus\"></i> Add Master</a></div>\r\n                  </div>\r\n                </div>                \r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable  #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Master\" [sortable]=\"true\" prop=\"MasterNames\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.MasterNames}}\">\r\n                          <a [routerLink]=\"['/master/edit',row.MasterId]\">{{row.MasterNames| truncate}}</a>&nbsp;\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Master Value\" sortable=\"true\" prop=\"MasterValue\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Master Key\" sortable=\"true\" prop=\"MasterKey\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Description\" sortable=\"true\" prop=\"MasterDescription\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.MasterDescription}}\">\r\n                          {{row.MasterDescription | truncate : 11}}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"IsActive\" [sortable]=\"true\" headerClass=\"text-center\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"icon-text-center\">\r\n                          <div *ngIf=\"row.MasterKey!=='common-001' && row.MasterKey!='common-002'\">\r\n                            <a *ngIf=\"row.IsActive == 0\" href=\"javascript:void(0);\" (click)=\"enable(row)\" class=\"text-danger mx-1\"><i title=\"Click to enable.\" class=\"fa fa-times\"></i></a>\r\n                            <a *ngIf=\"row.IsActive == 1\" href=\"javascript:void(0);\" (click)=\"disable(row)\" class=\"text-success mx-1\"><i title=\"Click to disable.\" class=\"fas fa-check\"></i></a>\r\n                          </div>\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Delete\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"icon-text-center\"  *ngIf=\"row.MasterKey!=='common-001' && row.MasterKey!='common-002'\">\r\n                          <a href=\"javascript:void(0);\" (click)=\"DeleteMasters(row)\" class=\"text-danger mx-1\"><i title=\"Click to delete.\" class=\"fa fa-trash\"></i></a>\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/master/create-master/create-master.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/master/create-master/create-master.component.ts ***!
  \***********************************************************************/
/*! exports provided: CreateMasterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateMasterComponent", function() { return CreateMasterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _master_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../master.service */ "./src/app/views/master/master.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
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






var CreateMasterComponent = /** @class */ (function () {
    function CreateMasterComponent(fb, masterService, commonService, router, toaster, route) {
        this.fb = fb;
        this.masterService = masterService;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.loading = false;
        this.id = "";
        this.masters = [];
        this.master = new _master_service__WEBPACK_IMPORTED_MODULE_2__["tblMasterModel"]();
        this.loadSave = false;
    }
    CreateMasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isDisabled = null;
        this.getMasterNameList();
        this.getStatuses();
        this.getMasterDropDown();
        this.initForm();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loading = true;
                _this.fillForm(id);
            }
            else {
                _this.pageTitle = 'Add Master';
            }
        });
    };
    CreateMasterComponent.prototype.fillForm = function (id) {
        var _this = this;
        this.masterService.getMasterById(id)
            .subscribe(function (master) {
            _this.displayMaster(master);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CreateMasterComponent.prototype.displayMaster = function (master) {
        this.master = master;
        this.isDisabled = true;
        this.pageTitle = 'Edit Master: ' + this.master.masterValue;
        this.masterForm.patchValue({
            masterId: this.master.masterId,
            masterNameValue: this.master.masterNameValue,
            masterNameId: this.master.masterNameId,
            masterNames: this.master.masterNames,
            masterKey: this.master.masterKey,
            masterValue: this.master.masterValue,
            masterStatusId: this.master.masterStatusId,
            masterDescription: this.master.masterDescription,
        });
    };
    CreateMasterComponent.prototype.ngOnDestroy = function () {
    };
    CreateMasterComponent.prototype.initForm = function () {
        this.masterForm = this.fb.group({
            masterId: [null],
            masterNameId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            masterKey: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            masterValue: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            masterStatusId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            masterDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator]
        });
    };
    Object.defineProperty(CreateMasterComponent.prototype, "masterNameId", {
        get: function () { return this.masterForm.get('masterNameId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateMasterComponent.prototype, "masterKey", {
        get: function () { return this.masterForm.get('masterKey'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateMasterComponent.prototype, "masterValue", {
        get: function () { return this.masterForm.get('masterValue'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateMasterComponent.prototype, "masterStatusId", {
        get: function () { return this.masterForm.get('masterStatusId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateMasterComponent.prototype, "masterDescription", {
        get: function () { return this.masterForm.get('masterDescription'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateMasterComponent.prototype, "masterId", {
        get: function () { return this.masterForm.get('masterId'); },
        enumerable: true,
        configurable: true
    });
    CreateMasterComponent.prototype.getMasterNameList = function () {
        var _this = this;
        this.masterService.getNames().subscribe(function (result) {
            _this.masters = result;
        });
    };
    CreateMasterComponent.prototype.getStatuses = function () {
        var _this = this;
        this.commonService.getMasterItemsList("Status").subscribe(function (response) {
            _this.statuses = _this.commonService.masters;
        });
    };
    CreateMasterComponent.prototype.getMasterDropDown = function () {
        var _this = this;
        this.masterService.getMasterDropDown().subscribe(function (response) {
            _this.masterdata = response;
        });
    };
    CreateMasterComponent.prototype.close = function () {
        this.router.navigate(['/master']);
    };
    CreateMasterComponent.prototype.save = function () {
        var _this = this;
        if (this.masterForm.valid) {
            this.loading = true;
            if (this.id) {
                this.master.masterId = this.id;
            }
            else {
                this.master.masterId = this.masterForm.value.masterId;
            }
            this.master.masterNameId = this.masterForm.value.masterNameId;
            this.master.masterKey = this.masterForm.value.masterKey;
            this.master.masterValue = this.masterForm.value.masterValue;
            this.master.masterStatusId = this.masterForm.value.masterStatusId;
            this.master.masterIsDeleted = false;
            this.master.masterDescription = this.masterForm.value.masterDescription;
            this.masterService.AddManageMaster(this.master).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.router.navigateByUrl("/master");
                    setTimeout(function () { _this.loading = false; }, 5000);
                }
                else {
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                _this.loading = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.masterForm);
        }
    };
    CreateMasterComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _master_service__WEBPACK_IMPORTED_MODULE_2__["MasterService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    CreateMasterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __importDefault(__webpack_require__(/*! raw-loader!./create-master.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/master/create-master/create-master.component.html")).default,
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _master_service__WEBPACK_IMPORTED_MODULE_2__["MasterService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], CreateMasterComponent);
    return CreateMasterComponent;
}());



/***/ }),

/***/ "./src/app/views/master/list-master/list-master.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/master/list-master/list-master.component.ts ***!
  \*******************************************************************/
/*! exports provided: ListMasterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListMasterComponent", function() { return ListMasterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _master_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../master.service */ "./src/app/views/master/master.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
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








var ListMasterComponent = /** @class */ (function () {
    function ListMasterComponent(masterService, commonService, router, dialogService, toaster) {
        var _this = this;
        this.masterService = masterService;
        this.commonService = commonService;
        this.router = router;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.id = "";
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'masterCreatedon';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    ListMasterComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.search();
        this.refresh();
        this.getMasterDropDown();
    };
    ListMasterComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    ListMasterComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ListMasterComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.masterService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ListMasterComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.masterService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ListMasterComponent.prototype.reset = function () {
        var _this = this;
        this.table.sorts = [];
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'asc';
        this.masterNameId = "undefined";
        this.clearDrop.clearModel();
        this.sortColumn = 'emailTemplateCreatedOn';
        this.pageSizeValue = 10;
        this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.masterService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ListMasterComponent.prototype.getMasterDropDown = function () {
        var _this = this;
        this.masterService.getMasterDropDown().subscribe(function (response) {
            _this.masterdata = response;
        });
    };
    ListMasterComponent.prototype.getMasterList = function () {
        var _this = this;
        this.masterService.getMasterList('', this.masterNameId, this.sortColumn, this.sortDir, 0, 10, this.id).subscribe(function (result) {
            if (result) {
                _this.master = result;
            }
        });
    };
    ListMasterComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.masterService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ListMasterComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.masterService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ListMasterComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.masterService.getMasterList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.masterService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ListMasterComponent.prototype.ChangeStatus = function (row) {
        var _this = this;
        if (row.isActive == true) {
            row.isActive = false;
        }
        else {
            row.isActive = true;
        }
        this.masterService.setMasterStatus(row.MasterId, row.isActive).subscribe(function (result) {
            if (result.statusCode == 200) {
                _this.toaster.success(result.responseMessage);
                _this.refresh();
            }
            else {
                _this.toaster.error(result.responseMessage);
            }
        });
    };
    ListMasterComponent.prototype.disable = function (row) {
        var _this = this;
        var message = "Are you sure you want to disable master  \"" + row.MasterNames + "\"?";
        this.dialogService.confirm('Disable master', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.masterService.setMasterStatus(row.MasterId, "False").subscribe(function (r) {
                    _this.toaster.success("\"" + row.MasterNames + "\" has been disabled  successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    ListMasterComponent.prototype.enable = function (row) {
        var _this = this;
        var message = "Are you sure you want to enable master  \"" + row.MasterNames + "\"?";
        this.dialogService.confirm('Enable master', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.masterService.setMasterStatus(row.MasterId, "True").subscribe(function (r) {
                    _this.toaster.success("\"" + row.MasterNames + "\" has been enabled  successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    ListMasterComponent.prototype.DeleteMasters = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete master  \"" + row.MasterNames + "\"?";
        this.dialogService.confirm('Delete master', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.masterService.DeleteMaster(row.MasterId).subscribe(function (r) {
                    _this.toaster.success("delete master \"" + row.MasterNames + "\"");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    ListMasterComponent.prototype.DeleteMasters1 = function (row) {
        var _this = this;
        this.masterService.DeleteMaster(row.masterId).subscribe(function (result) {
            if (result.statusCode == 200) {
                _this.toaster.success(result.responseMessage);
                _this.refresh();
            }
            else {
                _this.toaster.error(result.responseMessage);
            }
        });
    };
    ListMasterComponent.prototype.restMasterddl = function () {
        this.masterNameId = 'undefined';
    };
    ListMasterComponent.prototype.SetMasterValue = function (masternameId) {
        this.masterNameId = masternameId;
    };
    ListMasterComponent.ctorParameters = function () { return [
        { type: _master_service__WEBPACK_IMPORTED_MODULE_4__["MasterService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearDrop', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], ListMasterComponent.prototype, "clearDrop", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"])
    ], ListMasterComponent.prototype, "table", void 0);
    ListMasterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __importDefault(__webpack_require__(/*! raw-loader!./list-master.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/master/list-master/list-master.component.html")).default,
        }),
        __metadata("design:paramtypes", [_master_service__WEBPACK_IMPORTED_MODULE_4__["MasterService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], ListMasterComponent);
    return ListMasterComponent;
}());



/***/ }),

/***/ "./src/app/views/master/master-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/views/master/master-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: MasterRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MasterRoutingModule", function() { return MasterRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _list_master_list_master_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list-master/list-master.component */ "./src/app/views/master/list-master/list-master.component.ts");
/* harmony import */ var _create_master_create_master_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-master/create-master.component */ "./src/app/views/master/create-master/create-master.component.ts");
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
    { path: '', component: _list_master_list_master_component__WEBPACK_IMPORTED_MODULE_2__["ListMasterComponent"], data: { title: 'List Master' } },
    { path: 'create', component: _create_master_create_master_component__WEBPACK_IMPORTED_MODULE_3__["CreateMasterComponent"], data: { title: 'Add Master' } },
    { path: 'edit/:id', component: _create_master_create_master_component__WEBPACK_IMPORTED_MODULE_3__["CreateMasterComponent"], data: { title: 'Edit Master' } }
];
var MasterRoutingModule = /** @class */ (function () {
    function MasterRoutingModule() {
    }
    MasterRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], MasterRoutingModule);
    return MasterRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/master/master.module.ts":
/*!***********************************************!*\
  !*** ./src/app/views/master/master.module.ts ***!
  \***********************************************/
/*! exports provided: MasterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MasterModule", function() { return MasterModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _create_master_create_master_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-master/create-master.component */ "./src/app/views/master/create-master/create-master.component.ts");
/* harmony import */ var _list_master_list_master_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list-master/list-master.component */ "./src/app/views/master/list-master/list-master.component.ts");
/* harmony import */ var _master_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./master.service */ "./src/app/views/master/master.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _master_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./master-routing.module */ "./src/app/views/master/master-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var MasterModule = /** @class */ (function () {
    function MasterModule() {
    }
    MasterModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _create_master_create_master_component__WEBPACK_IMPORTED_MODULE_1__["CreateMasterComponent"],
                _list_master_list_master_component__WEBPACK_IMPORTED_MODULE_2__["ListMasterComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _master_routing_module__WEBPACK_IMPORTED_MODULE_5__["MasterRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"]
            ],
            providers: [
                _master_service__WEBPACK_IMPORTED_MODULE_3__["MasterService"]
            ]
        })
    ], MasterModule);
    return MasterModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-master-master-module.js.map