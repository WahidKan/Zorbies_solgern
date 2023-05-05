(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-employee-employee-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/editemployee.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/editemployee.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/employee\">Manage Employee</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n\r\n\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \">\r\n    <!--<app-dynamicform moduleName=\"user\" submoduleName=\"department\"></app-dynamicform>-->\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList\">\r\n        <h3 class=\"form-heading\">{{ item.group_display_name}}</h3>\r\n        <div class=\"row mx-auto mb-2\" [ngClass]=\"{'disabled':loadSave}\">\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData\">\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : inner.form_field_visibility == 'NO', 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO'\" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES'\">{{ inner.display_name}} <span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n                <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n              </a>-->\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES'\">\r\n\r\n                <div class=\"row\">\r\n                  <div class=\"col-12 float-left\">\r\n                    <!--text-->\r\n                    <input type=\"text\" class=\"form-control\"\r\n                           [placeholder]=\"inner.display_name\"\r\n                           [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                           [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName).invalid && (form.get(inner.form_controlName).dirty || form.get(inner.form_controlName).touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName).errors?.maxlength)) }\"\r\n                           *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date'\" />\r\n                    <small *ngIf=\"((form.get(inner.form_controlName).invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName).touched) && (form.get(inner.form_controlName).errors?.required))\"\r\n                           class=\"text-danger\">{{inner.display_name}} is required</small>\r\n\r\n\r\n                    <!--Textarea-->\r\n                    <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName).invalid && (form.get(inner.form_controlName).dirty || form.get(inner.form_controlName).touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName).errors?.maxlength)) }\" [placeholder]=\"inner.display_name\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                    <!--Ng Calendar-->\r\n\r\n                    <p-calendar inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\"\r\n                                [placeholder]=\"inner.display_name\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n\r\n                    <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                    [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                    <!--end calandar-->\r\n                    <!--Checkbox-->\r\n                    <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                      <div class=\"form-check form-check-inline\" *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n                        <div class=\"custom-control custom-checkbox\">\r\n                          <input id=\"'chk_'+ {{inner.custom_field_id}}+ '_' + {{option.value}}\" [formControlName]=\"inner.form_controlName\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                          <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"'chk_'+ {{inner.custom_field_id}}+ '_' + {{option.value}}\">{{option.name}}</label>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <!--Radio button-->\r\n                    <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                      <div class=\"form-check form-check-inline\" *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n                        <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                          <input id=\"'rdo_'+ {{inner.custom_field_id}}+ '_' + {{option.value}}\" class=\"dynamic custom-control-input\" type=\"radio\" name=\"item.name\">\r\n                          <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"'rdo_'+ {{inner.custom_field_id}}+ '_' + {{option.value}}\">{{option.name}}</label>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <!--Ng Dropdown-->\r\n                    <!--Dropdown\r\n                    picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n                    -->\r\n                    <select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'is-invalid': inner.picklist_options == 'Lookup' && inner.dt_code=='select' && inner.dropdown_type=='normal' }\" *ngIf=\"inner.picklist_options == 'Lookup' && inner.dt_code=='select' && iteminnerdropdown_type=='normal'\">\r\n                      <option value=\"\">Select</option>\r\n                      <option v-for=\"option in MakeNormalArray(inner.select_options)\">{{option.name1}}</option>\r\n                    </select>\r\n                    <!--Dropdown\r\n                      picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n                    -->\r\n                    <select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'is-invalid': inner.picklist_options != 'Lookup' && inner.dt_code=='select' }\" *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code=='select'\">\r\n                      <option value=\"\">Select</option>\r\n                      <option [value]=\"option.value\" [selected]=\"inner.form_controlName\" *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">{{option.name}}</option>\r\n                    </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row mx-auto mb-3\">\r\n        <div class=\"col-sm-12 col-md-12\">\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-success mr-1 disabled\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </form>\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/employee.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/employee.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Employee</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Employee</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3\">\r\n        <div class=\"row mt-2\">\r\n\r\n          <div class=\"col-md-6\">\r\n            <div class=\"row searchfield  mr-1 w-100\">\r\n              <div class=\"col-md-4 float-left\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-md-8 float-left\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\"><span><i class=\"fa fa-filter\"></i> Filter</span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"dt-buttons\">\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\"><span><i class=\"fa fa-list-alt\"></i> Manage Employee</span></a>\r\n              <a routerLink=\"/lead/Import\" class=\"btn btn-success form-btns \"><i class=\"fa fa-upload\"></i> Import</a>\r\n              <!-- <input type=\"button\" class=\"btn btn-primary form-btns mr-1\" value=\"Manage View\"/> <a routerLink=\"/lead/Import\" class=\"btn btn-danger form-btns \"><i class=\"fa fa-trash\"></i> Delete</a>-->\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"columndata\"\r\n                          [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\">\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.COLUMN_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"false?col.COLUMN_NAME==0:col.COLUMN_NAME\">\r\n\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n                <a><i class=\"fa fa-cog text-warning pr-2\"></i></a>\r\n                <a [routerLink]=\"['/employee/edit',row.Id]\" title=\"View Detail\"><i class=\"fa fa-eye pr-2\"></i></a>\r\n                <a [routerLink]=\"['/employee/edit',row.Id]\" title=\"Edit\">\r\n                  <i class=\"fa fa-pencil text-success pr-2\"></i>\r\n                </a>\r\n                <a><i class=\"fa fa-trash text-danger\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div class=\"page-count\">\r\n                {{rowCount}} total\r\n              </div>\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"1\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n<!--<div class=\"dashboard-header section-padding\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row d-flex align-items-md-stretch\">\r\n      <div class=\"col-12\">\r\n        <div class=\"bg-white custom-shadow\">\r\n          <div class=\"col-md-12 border-bottom py-3\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                <div class=\"row mx-0 custom-top-padding\">\r\n                  <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                    <div class=\"form-group mb-xl-0\">\r\n                      <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n                      <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-6 col-xl-2 mr-auto\">\r\n                    <div class=\"form-group mb-xl-0\">\r\n                      <input type=\"button\" class=\"btn btn-success form-btns d-none\" value=\"Reset\" (click)=\"reset()\" />\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-6 col-xl-4 text-md-right float-right\">\r\n                    <a routerLink=\"/lead/add\" class=\"btn btn-success form-btns d-none\"><i class=\"fa fa-plus\"></i> Add</a>\r\n                    <input type=\"button\" class=\"btn btn-success\" value=\"Manage View\" (click)=\"displayDetailDetail($event)\" />\r\n                    <a routerLink=\"/lead/Import\" class=\"btn btn-primary form-btns \"><i class=\"fa fa-download\"></i> Import</a>\r\n                    <a routerLink=\"/lead/Import\" class=\"btn btn-danger form-btns \"><i class=\"fa fa-trash\"></i> Delete</a>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n          <div class=\"\">\r\n            <div class=\"table-responsive\">\r\n              <div class=\"table table-striped\">\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>-->\r\n<app-searchfilteradd #templateFilterView></app-searchfilteradd>\r\n<app-manageview #templateManageView moduleName=\"crm\" subModuleName=\"lead\"></app-manageview>\r\n\r\n");

/***/ }),

/***/ "./src/app/views/employee/editemployee.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/employee/editemployee.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2VtcGxveWVlL2VkaXRlbXBsb3llZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/employee/editemployee.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/employee/editemployee.component.ts ***!
  \**********************************************************/
/*! exports provided: EditemployeeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditemployeeComponent", function() { return EditemployeeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _employee_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./employee.service */ "./src/app/views/employee/employee.service.ts");
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






var EditemployeeComponent = /** @class */ (function () {
    function EditemployeeComponent(fb, employeeService, router, toaster, route, commonService) {
        this.fb = fb;
        this.employeeService = employeeService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.config = [];
        this.moduleName = 'users';
        this.submoduleName = 'employee';
        this.loadSave = false;
        this.showChild = false;
        this.isLead = false;
        this.formControlList = [];
        this.errors = [];
        if (this.submoduleName == 'employee') {
            this.companyId = 1001;
            this.moduleRefrenceName = this.submoduleName;
        }
        if (this.submoduleName == 'employee') {
            this.companyId = 1001;
            this.moduleRefrenceName = this.submoduleName;
        }
    }
    EditemployeeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.submoduleName == 'department') {
            this.companyId = 1001;
        }
        if (this.submoduleName == 'designation') {
            this.companyId = 1001;
        }
        this.employeeService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe(function (result) {
            if (result) {
                //this.form.setValue(null);
                _this.customCompnentValues = _this.employeeService.customFieldsList.data;
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (groupCheck == null || groupCheck.length == 0) {
                        var obj = {
                            group_id: t.group_id,
                            group_name: t.group_name,
                            group_display_name: t.group_display_name,
                            InnerData: _this.customCompnentValues.filter(function (x) { return x.group_id == t.group_id; })
                        };
                        _this.formControlList.push(obj);
                        for (var _i = 0, _a = _this.formControlList; _i < _a.length; _i++) {
                            var config = _a[_i];
                        }
                    }
                });
                var group_1 = {};
                var val_1 = null;
                _this.customCompnentValues.forEach(function (cnt) {
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val_1, cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                if (_this.Id != null) {
                    _this.fillForm(_this.Id);
                }
                // console.log("validationFROM", this.form);
            }
        });
        //EDIT case handle
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.Id = id;
                _this.fillForm(_this.Id);
                _this.pageTitle = 'Edit Department';
            }
            else {
                _this.pageTitle = 'Add Department';
            }
        });
    };
    EditemployeeComponent.prototype.fillForm = function (id) {
        var _this = this;
        //this.form.reset();
        this.employeeService.GetEmployeeDetail(id, this.moduleName, this.submoduleName).subscribe(function (result) {
            // console.log("result1212", this.employeeService.editPage.data[0]);
            var edit;
            edit = _this.employeeService.editPage.data[0];
            //let empty = null;
            var formGroup = {};
            if (result) {
                Object.keys(edit).forEach(function (t) {
                    var cntname = t;
                    var cntValue = edit[t] == '' ? null : edit[t];
                    // console.log("cntname", cntname)
                    // console.log("cntname", cntValue)
                    formGroup[cntname] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](cntValue);
                });
                // console.log("formGroup", formGroup);
                // this.form.value.reset();
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
                // console.log("EdittttPageee", this.form);
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    EditemployeeComponent.prototype.close = function () {
        this.router.navigateByUrl("/employee");
    };
    EditemployeeComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _employee_service__WEBPACK_IMPORTED_MODULE_5__["EmployeeService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    EditemployeeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-editemployee',
            template: __importDefault(__webpack_require__(/*! raw-loader!./editemployee.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/editemployee.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./editemployee.component.scss */ "./src/app/views/employee/editemployee.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _employee_service__WEBPACK_IMPORTED_MODULE_5__["EmployeeService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], EditemployeeComponent);
    return EditemployeeComponent;
}());



/***/ }),

/***/ "./src/app/views/employee/employee-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/employee/employee-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: EmployeeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeRoutingModule", function() { return EmployeeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _employee_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./employee.component */ "./src/app/views/employee/employee.component.ts");
/* harmony import */ var _editemployee_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editemployee.component */ "./src/app/views/employee/editemployee.component.ts");
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
    { path: '', component: _employee_component__WEBPACK_IMPORTED_MODULE_2__["EmployeeComponent"] },
    //{ path: 'addlead', component: LeadAddEditComponent },
    { path: 'edit/:id', component: _editemployee_component__WEBPACK_IMPORTED_MODULE_3__["EditemployeeComponent"] }
];
var EmployeeRoutingModule = /** @class */ (function () {
    function EmployeeRoutingModule() {
    }
    EmployeeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], EmployeeRoutingModule);
    return EmployeeRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/employee/employee.component.scss":
/*!********************************************************!*\
  !*** ./src/app/views/employee/employee.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2VtcGxveWVlL2VtcGxveWVlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/employee/employee.component.ts":
/*!******************************************************!*\
  !*** ./src/app/views/employee/employee.component.ts ***!
  \******************************************************/
/*! exports provided: EmployeeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeComponent", function() { return EmployeeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _employee_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./employee.service */ "./src/app/views/employee/employee.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
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








var EmployeeComponent = /** @class */ (function () {
    function EmployeeComponent(employeeService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.employeeService = employeeService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.searchUserType = '';
        this.custom_view_id = '';
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.moduleName = 'users';
        this.submoduleName = 'employee';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.loadSave = false;
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
        this.currentPage = 1;
    }
    EmployeeComponent.prototype.ngOnInit = function () {
        this.custom_view_id = '';
        this.pageSizeValue = 10;
        this.currentPage = 1;
        this.currentPage = 1;
        this.getPageSizes();
        this.refresh();
    };
    EmployeeComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        //this.currentPage = 1;
        this.employeeService.GetEmployeeList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id)
            .subscribe(function (response) {
            // console.log(response)
            _this.jsonData = response;
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            // console.log("columnheading", this.jsonData.data)
            // console.log("LoopData", this.columndata[0].total_records)
            _this.totalRecords = _this.columndata[0].total_records;
            //this.pagedData = this.leadlistService.pagedData;
            //// console.log("PagedData", this, this.pagedData);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmployeeComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = this.listFilter;
        this.listFilter = event;
        this.refresh();
        this.listFilter = this.listFiltertext;
    };
    //Custom sorting functions   -------
    //sortingFunction() {
    //  this.rows.sort((propA, propB) => {
    //    let indexA = this.order.indexOf(propA.country);
    //    let indexB = this.order.indexOf(propB.country);
    //    if (indexA > indexB) {
    //      return 1;
    //    } else if (indexA < indexB) {
    //      return -1;
    //    }
    //    return 0;
    //  });
    //}
    EmployeeComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    EmployeeComponent.prototype.setPage = function ($event) {
        this.currentPage = $event.page;
        this.refresh();
    };
    EmployeeComponent.prototype.reset = function () {
        this.listFilter = '';
        this.currentPage = 1;
        this.refresh();
    };
    EmployeeComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.currentPage = 1;
        this.refresh();
    };
    EmployeeComponent.prototype.onChange = function ($event) {
        this.refresh();
    };
    EmployeeComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    EmployeeComponent.prototype.GetcustomViewid = function (event) {
        this.custom_view_id = event;
        this.refresh();
    };
    //popUpOpen() {
    //  this.FilterViewModal.show( this.companyId);
    //}
    EmployeeComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    EmployeeComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = this.listFilter;
        this.listFilter = "name like '%" + this.listFilter + "%'";
        this.refresh();
        this.listFilter = this.listFiltertext;
    };
    EmployeeComponent.ctorParameters = function () { return [
        { type: _employee_service__WEBPACK_IMPORTED_MODULE_1__["EmployeeService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__["SearchfilteraddComponent"])
    ], EmployeeComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_7__["ManageviewComponent"])
    ], EmployeeComponent.prototype, "ManageViewModal", void 0);
    EmployeeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-employee',
            template: __importDefault(__webpack_require__(/*! raw-loader!./employee.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/employee/employee.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./employee.component.scss */ "./src/app/views/employee/employee.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_employee_service__WEBPACK_IMPORTED_MODULE_1__["EmployeeService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], EmployeeComponent);
    return EmployeeComponent;
}());



/***/ }),

/***/ "./src/app/views/employee/employee.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/employee/employee.module.ts ***!
  \***************************************************/
/*! exports provided: EmployeeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeModule", function() { return EmployeeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _employee_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./employee-routing.module */ "./src/app/views/employee/employee-routing.module.ts");
/* harmony import */ var _employee_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./employee.component */ "./src/app/views/employee/employee.component.ts");
/* harmony import */ var _editemployee_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editemployee.component */ "./src/app/views/employee/editemployee.component.ts");
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




var EmployeeModule = /** @class */ (function () {
    function EmployeeModule() {
    }
    EmployeeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_employee_component__WEBPACK_IMPORTED_MODULE_6__["EmployeeComponent"], _editemployee_component__WEBPACK_IMPORTED_MODULE_7__["EditemployeeComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _employee_routing_module__WEBPACK_IMPORTED_MODULE_5__["EmployeeRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
            ]
        })
    ], EmployeeModule);
    return EmployeeModule;
}());



/***/ }),

/***/ "./src/app/views/employee/employee.service.ts":
/*!****************************************************!*\
  !*** ./src/app/views/employee/employee.service.ts ***!
  \****************************************************/
/*! exports provided: EmployeeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeService", function() { return EmployeeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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




var EmployeeService = /** @class */ (function () {
    function EmployeeService(http) {
        this.http = http;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    EmployeeService.prototype.GetEmployeeList = function (name, sortColumn, sortDir, page, pageSize, loginuserid, moduleName, submoduleName, companyId, custom_view_id) {
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "Bank/GetEmployeeList?listFilter=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&custom_view_id=" + custom_view_id);
        //return this.http.get(`${this.baseUri}Bank/GetLeadlist?name=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
        //  .pipe(
        //    map((response: any) => {
        //      this.pagedData = response;
        //      return true;
        //    })
        //  );
    };
    EmployeeService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    EmployeeService.prototype.GetEmployeeDetail = function (id, modulename, submoduleName) {
        var _this = this;
        return this.http.get(this.baseUri + ("Bank/GetEmployeeDetailById?id=" + id + "&moduleName=" + modulename + "&submoduleName=" + submoduleName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            //// console.log("responseService12", response);
            _this.editPage = response;
            return true;
        }));
    };
    EmployeeService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    EmployeeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], EmployeeService);
    return EmployeeService;
}());



/***/ })

}]);
//# sourceMappingURL=views-employee-employee-module.js.map