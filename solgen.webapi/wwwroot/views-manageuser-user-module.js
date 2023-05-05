(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-manageuser-user-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageuser/addedituser.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageuser/addedituser.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/user\">Manage Users</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \">\r\n    <form [formGroup]=\"addUserForm\" autocomplete=\"off\">\r\n      <!--<h3 class=\"form-heading\">User Preferred Employee/Contact:</h3>\r\n  <div class=\"row mx-auto mb-2\" *ngIf=\"!isEdit\">\r\n    <div class=\"col-12 col-md-6 col-lg-6\">\r\n      <label>User Preferred:</label>\r\n      <div class=\"form-group\">\r\n        <div class=\"form-check-inline\">\r\n          <div class=\"custom-control custom-radio\">\r\n            <input type=\"radio\" class=\"custom-control-input\" id=\"customRadio\" name=\"employeeContactPreferredBy\" (click)=\"userForSaleForce('Employee')\"\r\n                   value=\"Employee\" formControlName=\"employeeContactPreferredBy\" >\r\n            <label class=\"custom-control-label\" for=\"customRadio\">Employee</label>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-check-inline\">\r\n          <div class=\"custom-control custom-radio\">\r\n            <input type=\"radio\" class=\"custom-control-input\" id=\"customRadio1\" name=\"employeeContactPreferredBy\" (click)=\"userForSaleForce('Contact')\"\r\n                   value=\"Contact\" formControlName=\"employeeContactPreferredBy\">\r\n            <label class=\"custom-control-label\" for=\"customRadio1\">Contact</label>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-check-inline\">\r\n          <div class=\"custom-control custom-radio\">\r\n            <input type=\"radio\" class=\"custom-control-input\" id=\"customRadio2\" name=\"employeeContactPreferredBy\"  (click)=\"userForSaleForce('NormalUser')\" value=\"NormalUser\" formControlName=\"employeeContactPreferredBy\" checked>\r\n            <label class=\"custom-control-label\" for=\"customRadio2\">Normal User</label>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-6\" *ngIf=\"isNormalUser\">\r\n      <label>Select User:</label>\r\n      <div class=\"form-group\">\r\n        <ng-select [items]=\"lstSalesforceEmployee\"\r\n                   placeholder=\"Select Employee Type\" bindValue=\"value\" (change)=\"FillDataForEmployeOrContact($event)\" bindLabel=\"text\" formControlName=\"salesForceEmployeOrContact\">\r\n        </ng-select>\r\n      </div>\r\n    </div>\r\n      <hr />\r\n    </div>-->\r\n      <div class=\"row  mb-2\">\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>First Name:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" formControlName=\"firstName\" maxlength=\"50\" placeholder=\"Enter First Name\"\r\n                   [ngClass]=\"{'is-invalid': (firstName.invalid && (firstName.dirty || firstName.touched) && (firstName.errors?.required || firstName.errors?.maxlength)) }\">\r\n            <small *ngIf=\"firstName.invalid && (firstName.dirty || firstName.touched) && firstName.errors?.required\"\r\n                   class=\"text-danger\">First Name is required</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Last Name:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" formControlName=\"lastName\" maxlength=\"50\" placeholder=\"Enter Last Name\"\r\n                   [ngClass]=\"{'is-invalid': (lastName.invalid && (lastName.dirty || lastName.touched) && (lastName.errors?.required || lastName.errors?.maxlength)) }\">\r\n            <small *ngIf=\"lastName.invalid && (lastName.dirty || lastName.touched) && lastName.errors?.required\"\r\n                   class=\"text-danger\">Last Name is required</small>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Email:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" formControlName=\"email\" maxlength=\"50\" placeholder=\"Enter Email\"\r\n                   [ngClass]=\"{'is-invalid': (email.invalid && (email.dirty || email.touched) && (email.errors?.required || email.errors?.email)) }\">\r\n            <small *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors?.required\"\r\n                   class=\"text-danger\">Email is required</small>\r\n            <small *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors?.email\"\r\n                   class=\"text-danger\">Please enter valid email address</small>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Phone:</label>\r\n          <div class=\"form-group\">\r\n            <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"phone\" placeholder=\"(___) ___-____\"></p-inputMask>\r\n          </div>\r\n        </div>\r\n\r\n        <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Position:</label>\r\n    <div class=\"form-group\">\r\n      <ng-select [items]=\"lstUserPosition\"\r\n                 placeholder=\"Select Position\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"position\">\r\n      </ng-select>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Employee Type:</label>\r\n    <div class=\"form-group\">\r\n      <ng-select [items]=\"lstEmployeeType\"\r\n                 placeholder=\"Select Employee Type\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"empType\">\r\n      </ng-select>\r\n    </div>\r\n  </div>-->\r\n        <div class=\"col-md-12 col-lg-4\" *ngIf=\"isEmployee\">\r\n          <label>User Type:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"lstUserType\" placeholder=\"Select User Type\" (change)=\"userTypeChange($event.text,$event.value,$event)\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"userType\"\r\n                       [ngClass]=\"{'is-invalid': (userType.invalid && (userType.dirty || userType.touched) && userType.errors?.required)}\"></ng-select>\r\n            <small *ngIf=\"userType.invalid && (userType.dirty || userType.touched) && userType.errors?.required\"\r\n                   class=\"text-danger\">Please select User Type</small>\r\n\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\" *ngIf=\"isEmployee\">\r\n          <label>Roles:</label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"rolesnames\" [loading]=\"loadSave\" placeholder=\"Select Roles\" formControlName=\"roleId\"\r\n                       bindLabel=\"roleName\" bindValue=\"id\"></ng-select>\r\n\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\" *ngIf=\"isEmployee\">\r\n          <label>Consolidated User:</label>\r\n        <div class=\"form-group\">\r\n          <ng-select [items]=\"ConsolidatedUser\" [loading]=\"loadSave\" placeholder=\"Select Consolidated User\" formControlName=\"consolidateduserid\"\r\n                     bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n\r\n        </div>\r\n      </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Department:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"lstdepartment\" [loading]=\"loadSave\" placeholder=\"Select Department\" formControlName=\"departmentID\"\r\n                       bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (departmentID.invalid && (departmentID.dirty || departmentID.touched) && departmentID.errors?.required) }\"></ng-select>\r\n            <small *ngIf=\"departmentID.invalid && (departmentID.dirty || departmentID.touched) && departmentID.errors?.required\" class=\"text-danger\">Please select Department</small>\r\n\r\n          </div>\r\n        </div>\r\n        <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Select Company:</label>\r\n    <div class=\"form-group\">\r\n      <ng-select [items]=\"lstcompany\" [loading]=\"loadSave\" placeholder=\"Select Company\" formControlName=\"companyid\"\r\n                 bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n\r\n    </div>\r\n  </div>-->\r\n\r\n        <div class=\"col-md-12 col-lg-4\" *ngIf=\"assignedBankId.enabled\">\r\n          <label>Lender:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"banknames\" [loading]=\"loadSave\" placeholder=\"Select Bank\" formControlName=\"assignedBankId\"\r\n                       bindLabel=\"text\" bindValue=\"value\"\r\n                       [ngClass]=\"{'is-invalid': (assignedBankId.invalid && (assignedBankId.dirty || assignedBankId.touched) && assignedBankId.errors?.required) }\"></ng-select>\r\n            <small *ngIf=\"assignedBankId.invalid && (assignedBankId.dirty || assignedBankId.touched) && assignedBankId.errors?.required\" class=\"text-danger\">Please select Lender</small>\r\n          </div>\r\n        </div>\r\n\r\n        <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Executive Commission:</label>\r\n    <div class=\"form-group\">\r\n      <ng-select [items]=\"executiveCommission\"\r\n                 bindLabel=\"name\"\r\n                 placeholder=\"Select Executive Commission\"\r\n                 formControlName=\"executiveCommisionFormula\">\r\n      </ng-select>\r\n    </div>\r\n  </div>-->\r\n        <div class=\"col-md-12 col-lg-4\" *ngIf=\"comptype.companyType!='companytypeFinancialInstitute'\">\r\n          <label>Service Territory:</label>\r\n    <div class=\"form-group\">\r\n      <ng-select [items]=\"lstLocation\" placeholder=\"Select Service Territory\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"locationID\"></ng-select>\r\n\r\n    </div>\r\n  </div>\r\n\r\n        <div class=\"col-12 col-md-12 col-lg-12\">\r\n          <label>Notes:</label>\r\n          <div class=\"form-group\">\r\n            <textarea type=\"text\" class=\"form-control\" formControlName=\"notes\" placeholder=\"Enter Notes\" maxlength=\"500\"></textarea>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Is Active:</label>\r\n          <div class=\"form-group\">\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\" id=\"customCheck1\" formControlName=\"isActive\">\r\n              <span class=\"slider round\"><span>Yes</span></span>\r\n            </label>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Is Manager:</label>\r\n          <div class=\"form-group\">\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\" id=\"customCheck2\" formControlName=\"isHOD\">\r\n              <span class=\"slider round\"><span>Yes</span></span>\r\n            </label>\r\n          </div>\r\n        </div>\r\n\r\n\r\n      </div>\r\n      \r\n      <div class=\"row mb-2\">\r\n        <div class=\"col-12 col-md-12 col-lg-12\"><h3 class=\"form-heading ng-star-inserted ml-0 mt-0\"><span>Address:</span></h3></div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Address:</label>\r\n          <div class=\"form-group\">\r\n            <textarea type=\"text\" class=\"form-control\" formControlName=\"address\" placeholder=\"Enter Address\"\r\n                      [ngClass]=\"{'is-invalid': (address.invalid && (address.dirty || address.touched) && (address.errors?.required || address.errors?.maxlength)) }\"></textarea>\r\n            <small *ngIf=\"address.invalid && (address.dirty || address.touched) && address.errors?.required\"\r\n                   class=\"text-danger\">Address is required</small>\r\n            <small *ngIf=\"address.invalid && (address.dirty || address.touched) && address.errors?.maxlength\"\r\n                   class=\"text-danger\">Address must be less than 500 characters.</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>City:</label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" placeholder=\"Enter City\" formControlName=\"city\"\r\n                   [ngClass]=\"{'is-invalid': (city.invalid && (city.dirty || city.touched) && (city.errors?.required || city.errors?.maxlength)) }\">\r\n            <small *ngIf=\"city.invalid && (city.dirty || city.touched) && city.errors?.required\"\r\n                   class=\"text-danger\">City is required</small>\r\n            <small *ngIf=\"city.invalid && (city.dirty || city.touched) && city.errors?.maxlength\"\r\n                   class=\"text-danger\">City name must be less than 100 characters.</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Country:</label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"countryLists\" [loading]=\"loadSave\" placeholder=\"Select country\" formControlName=\"county\"\r\n                       bindLabel=\"text\" bindValue=\"value\"\r\n                       [ngClass]=\"{'is-invalid': (county.invalid && (county.dirty || county.touched) && county.errors?.required) }\"></ng-select>\r\n            <small *ngIf=\"county.invalid && (county.dirty || county.touched) && county.errors?.required\" class=\"text-danger\">Please select country</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>State:</label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"states\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"state\"\r\n                       bindLabel=\"text\" bindValue=\"stateGuidValues\"\r\n                       [ngClass]=\"{'is-invalid': (state.invalid && (state.dirty || state.touched) && state.errors?.required) }\"></ng-select>\r\n            <small *ngIf=\"state.invalid && (state.dirty || state.touched) && state.errors?.required\" class=\"text-danger\">Please select State</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Zip Code:</label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" placeholder=\"Enter Zip Code\" formControlName=\"zipCode\"\r\n                   [ngClass]=\"{'is-invalid': (zipCode.invalid && (zipCode.dirty || zipCode.touched) && (zipCode.errors?.required || zipCode.errors?.maxlength)) }\">\r\n            <!--<small *ngIf=\"zipCode.invalid && (zipCode.dirty || zipCode.touched)\" class=\"text-danger\">\r\n        <ng-container *ngIf=\"zipCode.errors.required\">Zip Code is required</ng-container>\r\n        <ng-container *ngIf=\"zipCode.errors.maxlength\">Zip Code can not be greater than 5 characters.</ng-container>\r\n      </small>-->\r\n\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Time Format:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"lstTimeFormat\" placeholder=\"Select Time Format\" formControlName=\"timeFormat\"\r\n                       bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (timeFormat.invalid && (timeFormat.dirty || timeFormat.touched) && timeFormat.errors?.required) }\"></ng-select>\r\n            <small *ngIf=\"timeFormat.invalid && (timeFormat.dirty || timeFormat.touched) && timeFormat.errors?.required\" class=\"text-danger\">Please select Time Format</small>\r\n\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Time Zone:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"lstTimeZone\" [loading]=\"loadSave\" placeholder=\"Select Time Zone\" formControlName=\"timeZoneId\"\r\n                       bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (timeZoneId.invalid && (timeZoneId.dirty || timeZoneId.touched) && timeZoneId.errors?.required) }\"></ng-select>\r\n            <small *ngIf=\"timeZoneId.invalid && (timeZoneId.dirty || timeZoneId.touched) && timeZoneId.errors?.required\" class=\"text-danger\">Please select Time Zone</small>\r\n\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12 col-lg-4\" *ngIf=\"false\">\r\n          <label>Report To:</label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"lstReportTo\" [loading]=\"loadSave\" placeholder=\"Select Report To\" formControlName=\"reportToId\"\r\n                       bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n            <!--[ngClass]=\"{'is-invalid': (reportToId.invalid && (reportToId.dirty || reportToId.touched) && reportToId.errors?.required) }\"\r\n            <small *ngIf=\"reportToId.invalid && (reportToId.dirty || reportToId.touched) && reportToId.errors?.required\" class=\"text-danger\">Please select Report To</small>-->\r\n\r\n          </div>\r\n        </div>\r\n         \r\n      </div>\r\n\r\n      <div class=\"row mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a href=\"javascript:void(0);\" *ngIf=\"addOrUpdatePermission\" class=\"btn btn-success mr-2\" (click)=\"addeditUser()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"Cancel()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageuser/listusers.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageuser/listusers.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Users</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Users</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-7 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-3 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\r\n                <ng-select #userTypeSelect [items]=\"lstUserType\"\r\n                           placeholder=\"Select User Type\" bindValue=\"value\" bindLabel=\"text\"\r\n                           [closeOnSelect]=\"true\"\r\n                           (change)=\"SetUserType($event)\" (clear)=\"restddl()\">\r\n                </ng-select>\r\n              </div>\r\n              <div class=\"col-lg-6 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i></span></a>\r\n                <a class=\"btn btn-danger form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i></span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-5\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <a *ngIf='isAdd' class=\"btn btn-success mr-1\" routerLink=\"/user/adduser\" tooltip=\"Add User\"><i class=\"fa fa-plus\"></i></a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rowHeight]=\"40\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [scrollbarH]=\"true\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\" [maxWidth]=\"2000\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME == 'Name'\">\r\n                <a [routerLink]=\"['/user/edituser',row.Id]\">{{row.Name }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME == 'EmailConfirmed'\">\r\n                <div class=\"align-center\">\r\n                  <span *ngIf=\"row.EmailConfirmed == 0\" title=\"No\" class=\"status-box bg-danger\">Not Confirmed</span>\r\n                  <span *ngIf=\"row.EmailConfirmed == 1\" title=\"Yes\" class=\"status-box bg-success\">Confirmed</span>\r\n                </div>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME == 'IsActive'\">\r\n                <div>\r\n                  <span class=\"status-box bg-success\" *ngIf=\"row.IsActive == 1\">Active</span>\r\n                  <span class=\"status-box bg-danger\" *ngIf=\"row.IsActive == 0\">InActive</span>\r\n                </div>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'Name' && col.COLUMN_NAME != 'EmailConfirmed' && col.COLUMN_NAME != 'IsActive'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal:'Date'\" *ngIf=\"col.DT_CODE=='date'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal:'Date') : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\" *ngIf=\"col.DT_CODE=='datetime'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.DATA_TYPE!='bit' && col.FieldType != 'select' && col.COLUMN_NAME !='Email' && col.DT_CODE!='datetime'\">\r\n                  {{row[col.COLUMN_NAME]}}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.COLUMN_NAME=='Email'\">\r\n                  {{row[col.COLUMN_NAME] }}\r\n                </div>\r\n                <div *ngIf=\"col.FieldType == 'select'\">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                  <div *ngIf=\"col.FieldFrom==null\">\r\n                    <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                      <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                      <div *ngIf=\"itemColorCode.colorkey!=undefined\" style=\"max-width:150px !important;\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"align-center\" [maxWidth]=\"100\">\r\n\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n                <a (click)=\"showModel(row)\" href=\"javascript:void(0);\" title=\"Set Password\"><i class=\"fa fa-key text-info pr-2\"></i></a>\r\n                <a *ngIf='isUpdate' [routerLink]=\"['/user/edituser',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                <a *ngIf='isDelete' title=\"Click to delete.\" (click)=\"DeleteUser(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n              </div>\r\n\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<div class=\"modal fade in show\" bsModal #setPassword=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Set Password Of {{Name}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"Closemodel()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"height:100%;\">\r\n\r\n        <div class=\"login-container\">\r\n          <div class=\"login-main\">\r\n            <!--<a href=\"javascript:void(0);\"><img class=\"img-fluid mb-3\" src=\"assets/default-theme/imagesNew/login-logo.png\" style=\"background: #2f4050; padding:15px;\"/></a>-->\r\n            <div class=\"login-box\">\r\n\r\n              <form [formGroup]=\"setPasswordForm\" autocomplete=\"off\">\r\n                <div class=\"form-group password-view\" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <input type=\"password\" passwordToggle formControlName=\"password\" placeholder=\"Please enter password\" class=\"form-control\">                \r\n                </div>\r\n                <div class=\"col-sm-12 p-0 mb-3\" *ngIf=\"password.invalid && (password.dirty || password.touched)\" style=\" margin-top: -13px;\">\r\n                  <div *ngIf=\"password.errors.required\" class=\"alert alert-danger p-1\">Password is required</div>\r\n                </div>\r\n                <div class=\"form-group password-view\">\r\n                  <input type=\"password\" passwordToggle formControlName=\"confirmPassword\" placeholder=\"Please enter confirm password\" class=\"form-control\" />\r\n                </div>\r\n                <div class=\"col-sm-12 p-0 mb-3\" *ngIf=\"confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched)\" style=\" margin-top: -13px;\">\r\n                  <div *ngIf=\"confirmPassword.errors.required\" class=\"alert-danger p-1\">Confirm password is required</div>\r\n                  <div *ngIf=\"confirmPassword.errors.mismatched\" class=\"alert-danger p-1\">Confirm password does not match</div>\r\n                </div>\r\n                <div class=\"col-sm-12 p-0\">\r\n                  <p class=\"alert-warning p-2\">Note: Password must be combination of lower case, upper case, numeric and special character.</p>\r\n                </div>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <a class=\"btn btn-success text-white mr-2\" (click)=\"PasswordSet()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"Closemodel()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"users\" subModuleName=\"user\"></app-searchfilteradd>\r\n");

/***/ }),

/***/ "./src/app/views/manageuser/addedituser.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/manageuser/addedituser.component.ts ***!
  \***********************************************************/
/*! exports provided: AddEditUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditUserComponent", function() { return AddEditUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _addedituser_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addedituser.service */ "./src/app/views/manageuser/addedituser.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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








var AddEditUserComponent = /** @class */ (function () {
    function AddEditUserComponent(fb, userService, commonService, router, toaster, route, dialogService, location) {
        var _this = this;
        this.fb = fb;
        this.userService = userService;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.dialogService = dialogService;
        this.location = location;
        this.executiveCommission = [
            { id: "Formula1", name: 'Formula1 (Placement Fee + Ist Payment -250)*0.3' },
            { id: "Formula2", name: 'Formula2 (Placement Fee * 0.3)' },
        ];
        this.userModel = new _addedituser_service__WEBPACK_IMPORTED_MODULE_3__["User"]();
        this.loadSave = false;
        this.isShowBank = false;
        this.addOrUpdatePermission = false;
        //modulePermission: ModuleList;
        this.isNormalUser = false;
        this.isEdit = false;
        this.isEmployee = false;
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.oldemail = '';
        this.newemail = '';
        this.addUserForm = this.fb.group({
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            userType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            locationID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            departmentID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            timeZoneId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            companyid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            address: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(500)]],
            city: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            state: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            zipCode: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
            county: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            timeFormat: [12, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            position: [null],
            assignedBankId: [{ value: null, disabled: true }, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            empType: [null],
            isActive: [''],
            isHOD: [''],
            notes: [''],
            userid: [null],
            roleId: [null],
            executiveCommisionFormula: [null],
            salesForceEmployeOrContact: [null],
            consolidateduserid: [null],
            reportToId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            employeeContactPreferredBy: ['NormalUser']
        });
        this.commonService.getMasterItemsList("manageuser_usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
            // console.log("userType", this.lstUserType);  
        });
        this.commonService.getMasterItemsList("Consolidated_User").subscribe(function (result) {
            _this.ConsolidatedUser = _this.commonService.masters;
            console.log("ConsolidatedUser", _this.ConsolidatedUser);
        });
        this.commonService.getMasterItemsList("userposition,employeetype").subscribe(function (result) {
            _this.lstUserPosition = _this.commonService.masters.filter(function (x) { return x.masterName == "UserPosition"; });
            _this.lstEmployeeType = _this.commonService.masters.filter(function (x) { return x.masterName == "EmployeeType"; });
            //this.lstSalesforceEmployee = this.commonService.masters.filter(x => x.masterName == "EmployeeType");
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        var priviledgeCode = this.route.snapshot.data.privilegeCode;
        this.comptype = JSON.parse(localStorage.getItem("userinfo"));
        this.addOrUpdatePermission = false;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase(); });
        if (add == undefined) {
            // add = "null";
            this.addOrUpdatePermission = false;
        }
        else {
            // this.isAdd = true;
            this.addOrUpdatePermission = true;
        }
        //let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERUPDATE');
        //if (update == undefined) {
        //  update = "null";
        //} else {
        //  this.isUpdate = true;
        //}
    }
    AddEditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.addOrUpdatePermission = false;
        this.getBankName();
        this.isEmployee = true;
        this.getCountryDropdownList();
        this.GetLocation();
        this.GetDepartmentDll();
        this.GetCompanyDll();
        this.getTimeZoneList();
        this.getTimeFormatList();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.fillForm(id);
            }
            else {
                _this.pageTitle = 'Add User';
                _this.userType.enable();
                _this.userType.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
                _this.userType.updateValueAndValidity();
                ////  this.addOrUpdatePermission = this.isAdd;
            }
            _this.getState();
            _this.getReportToList();
        });
    };
    AddEditUserComponent.prototype.getTimeFormatList = function () {
        this.lstTimeFormat = this.commonService.getTimeFormatList();
    };
    AddEditUserComponent.prototype.getTimeZoneList = function () {
        var _this = this;
        this.commonService.getTimeZoneList().subscribe(function (resp) {
            _this.lstTimeZone = JSON.parse(resp);
        });
    };
    AddEditUserComponent.prototype.getState = function () {
        var _this = this;
        this.userService.getStateList().subscribe(function (result) {
            var data = result;
            _this.states = data;
        });
    };
    AddEditUserComponent.prototype.getCountryDropdownList = function () {
        var _this = this;
        this.userService.getCountryList().subscribe(function (result) {
            _this.countryLists = result;
            console.log("countryList", _this.countryLists);
        });
    };
    AddEditUserComponent.prototype.GetLocation = function () {
        var _this = this;
        this.userService.GetLocationDDL().subscribe(function (data) {
            _this.lstLocation = data;
        });
    };
    AddEditUserComponent.prototype.GetCompanyDll = function () {
        var _this = this;
        this.userService.GetCompanyDll().subscribe(function (data) {
            _this.lstcompany = data;
        });
    };
    AddEditUserComponent.prototype.GetDepartmentDll = function () {
        var _this = this;
        this.userService.GetDepartmentDll().subscribe(function (data) {
            _this.lstdepartment = data;
        });
    };
    AddEditUserComponent.prototype.onuserTypeChange = function () {
        var _this = this;
        if (this.userTypeId !== null) {
            var bankTextName = this.lstUserType.find(function (x) { return x.value == _this.userTypeId; }).text;
            this.resetFormOnuserTypeChange(bankTextName);
        }
    };
    AddEditUserComponent.prototype.userTypeChange = function (text, value, event) {
        // console.log("event", event);
        if (typeof text !== 'undefined' && text !== null) {
            this.resetFormOnuserTypeChange(text);
        }
        if (typeof value !== 'undefined' && value !== null) {
            //this.userType.setValue(value);
            this.getRolesByUserType(value);
        }
    };
    AddEditUserComponent.prototype.resetFormOnuserTypeChange = function (textName) {
        //if (textName === 'Lender') { //Bank User
        //  this.assignedBankId.enable();
        //  this.assignedBankId.setValidators(Validators.required);
        //}
        //else {
        this.assignedBankId.setValue(null);
        this.assignedBankId.disable();
        this.assignedBankId.clearValidators();
        // }
        this.assignedBankId.updateValueAndValidity();
    };
    AddEditUserComponent.prototype.getBankName = function () {
        var _this = this;
        this.userService.getBankName().subscribe(function (result) {
            var data = result;
            _this.banknames = data;
        });
    };
    AddEditUserComponent.prototype.getReportToList = function () {
        var _this = this;
        debugger;
        this.userService.getReportToList().subscribe(function (result) {
            _this.lstReportTo = result;
            console.log("this.lstReportTo", _this.lstReportTo);
        });
    };
    AddEditUserComponent.prototype.getRolesByUserType = function (getRolesName) {
        var _this = this;
        this.roleId.setValue(null);
        this.userService.getRolesName(getRolesName).subscribe(function (result) {
            var data = result;
            _this.rolesnames = data;
            // console.log(" rolesnames", this.rolesnames);
        });
    };
    AddEditUserComponent.prototype.fillForm = function (id) {
        var _this = this;
        /// this.addOrUpdatePermission = this.isUpdate;
        this.userService.getUserDetail(id).subscribe(function (result) {
            if (result) {
                if (typeof result.userType !== 'undefined' && result.userType !== null) {
                    _this.getRolesByUserType(result.userType);
                }
                console.log('result', result);
                _this.userTypeId = result.userType;
                _this.pageTitle = 'Edit User: ' + result.firstName + ' ' + result.lastName;
                _this.isEdit = true;
                _this.loadSave = false;
                _this.oldemail = result.email;
                console.log('resultasdasd', result);
                _this.addUserForm.patchValue({
                    userid: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    userType: result.userType,
                    email: result.email,
                    phone: result.phoneNumber,
                    locationID: result.locationID == null ? null : result.locationID.toString(),
                    departmentID: result.departmentID == null ? null : result.departmentID.toString(),
                    companyid: result.companyid == null ? '' : result.companyid.toString(),
                    address: result.address,
                    city: result.city,
                    state: result.state == null ? null : result.state.toString(),
                    zipCode: result.zipCode,
                    county: result.county == null ? null : parseInt(result.county),
                    assignedBankId: result.assignedBankId,
                    position: result.position == null ? null : result.position.toLowerCase(),
                    empType: result.employeeType == null ? null : result.employeeType.toLowerCase(),
                    isActive: result.isActive,
                    isHOD: result.isHOD,
                    notes: result.notes,
                    // roleId: result.roleID.toString(),
                    roleId: result.roleID == null ? null : result.roleID.toString(),
                    consolidateduserid: result.uManagerId == null ? null : result.uManagerId.toString(),
                    executiveCommisionFormula: result.executiveCommisionFormula,
                    salesForceEmployeOrContact: result.refId,
                    timeZoneId: result.timezone,
                    reportToId: result.reportToId,
                    timeFormat: result.timeformat
                });
                _this.onuserTypeChange();
                // this.email.disable();
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddEditUserComponent.prototype.addeditUser = function () {
        var _this = this;
        if (this.addUserForm.valid) {
            this.loadSave = true;
            this.newemail = this.addUserForm.controls.email.value;
            this.userModel.Id = this.addUserForm.value.userid;
            this.userModel.firstName = this.addUserForm.value.firstName;
            this.userModel.lastName = this.addUserForm.value.lastName;
            // this.userModel.userType = this.pageTitle == 'Add User' ? this.addUserForm.value.userType : this.userTypeId;
            this.userModel.userType = this.addUserForm.value.userType;
            this.userModel.email = this.addUserForm.controls.email.value;
            this.userModel.phoneNumber = this.addUserForm.value.phone;
            this.userModel.address = this.addUserForm.value.address;
            this.userModel.city = this.addUserForm.value.city;
            this.userModel.state = this.addUserForm.value.state;
            this.userModel.zipCode = this.addUserForm.value.zipCode;
            this.userModel.county = this.addUserForm.value.county;
            this.userModel.assignedBankId = this.addUserForm.value.assignedBankId;
            this.userModel.position = this.addUserForm.value.position;
            this.userModel.locationID = this.addUserForm.value.locationID;
            this.userModel.departmentID = this.addUserForm.value.departmentID;
            this.userModel.timeZoneId = this.timeZoneId.value;
            this.userModel.timeFormat = this.timeFormat.value;
            this.userModel.companyid = this.addUserForm.value.companyid;
            this.userModel.isHOD = this.addUserForm.value.isHOD == "" ? false : true;
            this.userModel.employeeType = this.addUserForm.value.empType;
            this.userModel.isActive = this.addUserForm.value.isActive == "" ? false : true;
            this.userModel.notes = this.addUserForm.value.notes;
            this.userModel.roleId = this.addUserForm.value.roleId;
            this.userModel.UManagerId = this.addUserForm.value.consolidateduserid;
            this.userModel.refFrom = this.isEmployee == true ? 'Employee' : "Contact";
            this.userModel.salesForceEmployeOrContact = this.addUserForm.value.salesForceEmployeOrContact;
            this.userModel.executiveCommisionFormula = this.addUserForm.value.executiveCommisionFormula == null ? null : this.addUserForm.value.executiveCommisionFormula.id;
            this.userModel.oldemail = this.oldemail;
            this.userModel.reportToId = this.reportToId.value;
            if (this.newemail != this.oldemail) {
                this.userModel.sendMail = true;
            }
            console.log('userModel', this.userModel);
            var isSave_1 = true;
            if (this.userModel.Id == null) { //add
                this.userService.CheckUserDuplicateORAssociate(this.userModel.email, this.userModel.Id).subscribe(function (result) {
                    // console.log("result", result);
                    if (result.responseMessage == "duplicate") {
                        isSave_1 = false;
                        _this.loadSave = false;
                        _this.toaster.error("This email id is already in use. Please enter another email id.");
                        return false;
                    }
                    else if (result.responseMessage == "associate") {
                        //already exists in ASPnetUsers-- now add only in maping table after confirmation
                        _this.loadSave = false;
                        _this.dialogService.confirm('Associate User', "Email already exists in other Company. Do you want to Associate it?").subscribe(function (confirmed) {
                            if (confirmed) {
                                //save in maping table
                                _this.userService.AssociateUserWithCompany(_this.userModel.email, _this.userModel.Id, _this.userModel.roleId, _this.userModel.userType, _this.userModel.departmentID, _this.userModel.isHOD).subscribe(function (result) {
                                    if (result.statusCode == 200) {
                                        _this.toaster.success("User has been added successfully.");
                                        // this.location.back();
                                        _this.router.navigateByUrl("/user");
                                        setTimeout(function () { _this.loadSave = false; }, 3000);
                                    }
                                });
                                isSave_1 = false;
                                return false;
                            }
                            else { //do nothing             
                                isSave_1 = false;
                                return false;
                            }
                        });
                    }
                    else { //not duplicate and not associted-- save in database
                        _this.addEditUser(_this.userModel);
                    }
                });
            }
            else {
                this.addEditUser(this.userModel);
            }
        }
        else {
            this.commonService.validateAllFormFields(this.addUserForm);
        }
    };
    AddEditUserComponent.prototype.addEditUser = function (userModel) {
        var _this = this;
        //------------------------------------ In Case Of Update User ------------------------------------------------
        if (this.userModel.Id != null) {
            this.userService.CheckUserAssociate(this.userModel.email, this.userModel.Id).subscribe(function (result) {
                if (result.responseMessage == "duplicate") {
                    //isSave = false;  
                    _this.loadSave = false;
                    _this.toaster.error("This email id is already in use. Please enter another email id.");
                    return false;
                }
                if (result.responseMessage == "associateInUpdate") {
                    _this.loadSave = false;
                    _this.toaster.error("Email Already Exists");
                    return false;
                }
                else {
                    _this.userService.addeditUser(userModel).subscribe(function (result) {
                        if (result.statusCode == 200) {
                            _this.toaster.success(result.responseMessage);
                            _this.location.back();
                            setTimeout(function () { _this.loadSave = false; }, 3000);
                        }
                        else {
                            _this.loadSave = false;
                            _this.toaster.error(result.responseMessage);
                        }
                    }, function (error) {
                        _this.loadSave = false;
                    });
                }
            });
        }
        else {
            //---------------------------In Case Of Insert---------------------------------
            this.userService.addeditUser(userModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.location.back();
                    setTimeout(function () { _this.loadSave = false; }, 3000);
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                _this.loadSave = false;
            });
            //--------------------------------------------------------------------------------
        }
        //------------------------------------------------------------------------------------------------
    };
    AddEditUserComponent.prototype.userForSaleForce = function (users) {
        if (users == 'NormalUser') {
            this.isNormalUser = false;
            this.isEmployee = true;
            this.intitialize();
        }
        else if (users == 'Contact') {
            this.isNormalUser = true;
            this.isEmployee = false;
            this.salesForceEmployeOrContact.setValue(null);
            this.userType.setValue('');
            this.addUserForm.controls['userType'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator);
            this.addUserForm.controls['userType'].updateValueAndValidity();
            this.addUserForm.controls['roleId'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator);
            this.addUserForm.controls['roleId'].updateValueAndValidity();
            this.bindDropDownContact('contact_user');
        }
        else {
            this.isNormalUser = true;
            this.salesForceEmployeOrContact.setValue(null);
            this.isEmployee = true;
            this.bindDropDownEmployee('employee_user');
        }
    };
    AddEditUserComponent.prototype.bindDropDownContact = function (userType) {
        var _this = this;
        this.lstSalesforceEmployee = this.commonService.getMasterItemsList(userType).subscribe(function (result) {
            _this.lstSalesforceEmployee = _this.commonService.masters;
            //this.rolesnames = data;
            // console.log("contact", this.commonService.masters);
        });
    };
    AddEditUserComponent.prototype.bindDropDownEmployee = function (userType) {
        var _this = this;
        this.lstSalesforceEmployee = this.commonService.getMasterItemsList(userType).subscribe(function (result) {
            _this.lstSalesforceEmployee = _this.commonService.masters;
            //this.rolesnames = data;
            // console.log("Employee", this.commonService.masters);
        });
    };
    AddEditUserComponent.prototype.FillDataForEmployeOrContact = function (event) {
        var _this = this;
        if (this.isEmployee == true) {
            this.salesForceEmployeOrContact.setValue(event.value);
            this.userService.GetEmployeeDetailById(event.value, this.isEmployee).subscribe(function (result) {
                if (result) {
                    if (typeof result[0].user_type !== 'undefined' && result[0].user_type !== null) {
                        _this.getRolesByUserType(result[0].user_type);
                    }
                    //this.refFrom.setValue('Employee');
                    // console.log('GetData', result)
                    //this.userTypeId = result.userType;
                    _this.userType.setValue(result[0].user_type);
                    //this.pageTitle = 'Edit User: ' + result.firstName + ' ' + result.lastName;
                    _this.loadSave = false;
                    _this.addUserForm.patchValue({
                        //userid: result.id,
                        firstName: result[0].FirstName,
                        lastName: result[0].LastName,
                        userType: result[0].user_type,
                        email: result[0].Email,
                        phone: result[0].Mobile,
                        locationID: null,
                        departmentID: null,
                        companyid: result[0].CompanyId = '' ? undefined : result[0].CompanyId.toString(),
                        address: result[0].Street,
                        city: result[0].City,
                        state: null,
                        refFrom: 'Employee',
                        zipCode: result[0].PostalCode,
                        county: null,
                        assignedBankId: '',
                        position: null,
                        empType: null,
                        isActive: '',
                        isHOD: '',
                        notes: '',
                        roleId: null,
                        executiveCommisionFormula: ''
                    });
                    //this.onuserTypeChange();
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.salesForceEmployeOrContact.setValue(event.value);
            this.userService.GetEmployeeDetailById(event.value, this.isEmployee).subscribe(function (result) {
                if (result) {
                    if (typeof result[0].user_type !== 'undefined' && result[0].user_type !== null) {
                        _this.getRolesByUserType(result.userType);
                    }
                    _this.userType.setValue(result[0].user_type);
                    //this.userTypeId = result.userType;
                    //this.pageTitle = 'Edit User: ' + result[0].FirstName + ' ' + result[0].LastName;
                    _this.loadSave = false;
                    _this.addUserForm.patchValue({
                        //userid: result.id,
                        firstName: result[0].FirstName,
                        lastName: result[0].LastName,
                        userType: result[0].user_type,
                        email: result[0].Email,
                        phone: result[0].Mobile,
                        locationID: null,
                        departmentID: null,
                        refFrom: 'contact',
                        companyid: result[0].CompanyId = '' ? undefined : result[0].CompanyId.toString(),
                        address: result[0].Street,
                        city: result[0].City,
                        state: '',
                        zipCode: result[0].PostalCode,
                        county: null,
                        assignedBankId: '',
                        position: null,
                        empType: null,
                        isActive: '',
                        isHOD: '',
                        notes: '',
                        roleId: null,
                        executiveCommisionFormula: ''
                    });
                    // this.onuserTypeChange();
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
    };
    AddEditUserComponent.prototype.intitialize = function () {
        this.addUserForm = this.fb.group({
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            //userType: [{ value: null, disabled: true }, Validators.required],
            userType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            locationID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            departmentID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            companyid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            address: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(500)]],
            city: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            state: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            zipCode: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
            timeFormat: [12, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            county: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            position: [null],
            assignedBankId: [{ value: null, disabled: true }],
            empType: [null],
            isActive: [''],
            isHOD: [''],
            notes: [''],
            userid: [null],
            roleId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            executiveCommisionFormula: [null],
            salesForceEmployeOrContact: [null],
            employeeContactPreferredBy: ['NormalUser'],
            refFrom: ['']
        });
    };
    AddEditUserComponent.prototype.Cancel = function () {
        this.location.back();
        //this.router.navigateByUrl("/user");
    };
    Object.defineProperty(AddEditUserComponent.prototype, "firstName", {
        get: function () { return this.addUserForm.get('firstName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "lastName", {
        get: function () { return this.addUserForm.get('lastName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "userType", {
        get: function () { return this.addUserForm.get('userType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "email", {
        get: function () { return this.addUserForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "phone", {
        get: function () { return this.addUserForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "departmentID", {
        get: function () { return this.addUserForm.get('departmentID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "companyid", {
        get: function () { return this.addUserForm.get('companyid'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "isHOD", {
        get: function () { return this.addUserForm.get('isHOD'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "locationID", {
        get: function () { return this.addUserForm.get('locationID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "address", {
        get: function () { return this.addUserForm.get('address'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "position", {
        get: function () { return this.addUserForm.get('position'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "empType", {
        get: function () { return this.addUserForm.get('empType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "isActive", {
        get: function () { return this.addUserForm.get('isActive'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "notes", {
        get: function () { return this.addUserForm.get('notes'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "state", {
        get: function () { return this.addUserForm.get('state'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "timeZoneId", {
        get: function () { return this.addUserForm.get('timeZoneId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "timeFormat", {
        get: function () { return this.addUserForm.get('timeFormat'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "zipCode", {
        get: function () { return this.addUserForm.get('zipCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "city", {
        get: function () { return this.addUserForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "county", {
        get: function () { return this.addUserForm.get('county'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "assignedBankId", {
        get: function () { return this.addUserForm.get('assignedBankId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "roleId", {
        get: function () { return this.addUserForm.get('roleId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "consolidateduserid", {
        get: function () { return this.addUserForm.get('consolidateduserid'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "executiveCommisionFormula", {
        get: function () { return this.addUserForm.get('executiveCommisionFormula'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "salesForceEmployeOrContact", {
        get: function () { return this.addUserForm.get('salesForceEmployeOrContact'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "employeeContactPreferredBy", {
        get: function () { return this.addUserForm.get('employeeContactPreferredBy'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "refFrom", {
        get: function () { return this.addUserForm.get('refFrom'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditUserComponent.prototype, "reportToId", {
        get: function () { return this.addUserForm.get('reportToId'); },
        enumerable: true,
        configurable: true
    });
    AddEditUserComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _addedituser_service__WEBPACK_IMPORTED_MODULE_3__["ManageUserService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] }
    ]; };
    AddEditUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'AddUser',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addedituser.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageuser/addedituser.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _addedituser_service__WEBPACK_IMPORTED_MODULE_3__["ManageUserService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"]])
    ], AddEditUserComponent);
    return AddEditUserComponent;
}());



/***/ }),

/***/ "./src/app/views/manageuser/listusers.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/manageuser/listusers.component.ts ***!
  \*********************************************************/
/*! exports provided: ListUsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListUsersComponent", function() { return ListUsersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _addedituser_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addedituser.service */ "./src/app/views/manageuser/addedituser.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/custom-validation/equal-validator */ "./src/app/views/shared/custom-validation/equal-validator.ts");
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














var ListUsersComponent = /** @class */ (function () {
    function ListUsersComponent(userService, userServicepassword, dialogService, commonService, router, activeRoute, toaster, fb) {
        var _this = this;
        this.userService = userService;
        this.userServicepassword = userServicepassword;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.fb = fb;
        this.searchUserType = '';
        this.loadSave = false;
        //modulePermission: ModuleList;
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'Createdon';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.isEmailConfirmed = false;
        this.selected = [];
        this.tableName = 'AspNetUsers';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["SelectionType"];
        this.listFiltertext = '';
        this.custom_view_id = '';
        this.searchFilter = '';
        this.moduleName = 'users';
        this.submoduleName = 'user';
        this.myCheckbox = false;
        this.setPasswordModel = new _shared_user_service__WEBPACK_IMPORTED_MODULE_10__["SetPassword"]();
        //Password model popup
        this.setPasswordForm = this.fb.group({
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        }, {
            validator: _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_12__["EqualValidator"].matchingPasswords('password', 'confirmPassword')
        });
        this.commonService.getMasterItemsList("manageuser_usertype_add").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'USERADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'USERUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'USERDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
        // console.log("modulePermission",  this.modulePermission);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyid = userdetail.companyId;
        });
    }
    ListUsersComponent.prototype.ngOnInit = function () {
        this.currentPage = 1;
        this.pageSizeValue = 15;
        this.getPageSizes();
        this.getuserList();
        this.refresh();
    };
    ListUsersComponent.prototype.SetUserType = function (utype) {
        if (typeof utype === 'undefined') {
            this.searchUserType = '';
        }
        else {
            this.searchUserType = utype.value;
            this.listFiltertext = "UserTypeID = '" + this.searchUserType + "'";
            this.refresh();
        }
        // this.searchUserType = utype.value;
    };
    ListUsersComponent.prototype.getuserList = function () {
        var _this = this;
        this.commonService.getMasterItemsList("manageuser_usertype_add").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
    };
    ListUsersComponent.prototype.restddl = function () {
        this.searchUserType = '';
        this.reset();
    };
    ListUsersComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    ListUsersComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ListUsersComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    ListUsersComponent.prototype.onChange = function ($event) {
        this.loading = true;
        this.refresh();
        //this.userService.getUserList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
        //  this.pagedData = this.userService.pagedData;
        //  this.loading = false;
        //}, error => {
        //  this.loading = false;
        //});
    };
    //search() {
    //  this.loading = true;
    //  this.userService.getUserList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
    //    this.pagedData = this.userService.pagedData;
    //    this.loading = false;
    //  }, error => {
    //    this.loading = false;
    //  });
    //}
    ListUsersComponent.prototype.reset = function () {
        this.table.selected = [];
        this.table.sorts = [];
        this.userTypeSelect.clearModel();
        this.loading = true;
        this.listFilter = '';
        this.listFiltertext = '';
        this.searchUserType = '';
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.refresh();
    };
    ListUsersComponent.prototype.setPage = function ($event) {
        this.loadSave = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    ListUsersComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.refresh();
    };
    //refresh() {
    //  this.loading = true;
    //  this.userService.getUserList(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid).subscribe(response => {
    //    this.pagedData = this.userService.pagedData;
    //    this.offset = 1;
    //    this.loading = false;
    //  }, error => {
    //    this.loading = false;
    //  })
    //}
    ListUsersComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loadSave = true;
        this.userService.GetUserlist(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId, this.myCheckbox)
            .subscribe(function (response) {
            debugger;
            _this.jsonData = response;
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            if (response.data.length > 0) {
                _this.totalRecords = _this.columndata[0].total_records;
            }
            else {
                _this.totalRecords = 0;
            }
            _this.offset = _this.currentPage;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    Object.defineProperty(ListUsersComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ListUsersComponent.prototype.disable = function (user) {
        var _this = this;
        var message = "Are you sure you want to disable User \"" + user.Name + "\"?";
        this.dialogService.confirm('Disable User user', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.userService.changeStatus(user.Id).subscribe(function (r) {
                    _this.refresh();
                    _this.toaster.success("\"" + user.Name + "\" has been disabled   successfully");
                }, function (error) {
                });
            }
        });
    };
    ListUsersComponent.prototype.enable = function (user) {
        var _this = this;
        var message = "Are you sure you want to enable User user  \"" + user.Name + "\"?";
        this.dialogService.confirm('Enable this.myGroup user', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.userService.changeStatus(user.Id).subscribe(function (response) {
                    _this.refresh();
                    _this.toaster.success("\"" + user.Name + "\" has been enabled  successfully");
                }, function (error) {
                });
            }
        });
    };
    ListUsersComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete selected user(s)?";
            this.dialogService.confirm('DELETE USER(S)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.userService.deleteUser(_this.deleteId).subscribe(function (r) {
                        _this.toaster.success("Selected record(s) has been deleted successfully");
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
    //function is used to delete the user
    ListUsersComponent.prototype.DeleteUser = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete User \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete User ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.userService.deleteUser(row.Id).subscribe(function (result) {
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
    Object.defineProperty(ListUsersComponent.prototype, "password", {
        get: function () { return this.setPasswordForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListUsersComponent.prototype, "confirmPassword", {
        get: function () { return this.setPasswordForm.get('confirmPassword'); },
        enumerable: true,
        configurable: true
    });
    ListUsersComponent.prototype.getToken = function (email) {
        var _this = this;
        this.userService.gettoken(email).subscribe(function (result) {
            console.log('result', result);
            _this.token = result;
        });
    };
    ListUsersComponent.prototype.showModel = function (data) {
        this.setPasswordForm.reset();
        this.setPasswordModal.show();
        console.log('data', data);
        this.getToken(data.email);
        this.userid = data.Id;
        this.Name = data.Name;
        this.isEmailConfirmed = data.EmailConfirmed;
    };
    ListUsersComponent.prototype.Closemodel = function () {
        this.setPasswordModal.hide();
    };
    ListUsersComponent.prototype.PasswordSet = function () {
        var _this = this;
        this.loadSave = true;
        if (this.setPasswordForm.valid) {
            this.setPasswordModel.password = this.setPasswordForm.value.password;
            this.setPasswordModel.confirmPassword = this.setPasswordForm.value.confirmPassword;
            this.setPasswordModel.userId = this.userid;
            this.setPasswordModel.token = this.token;
            this.setPasswordModel.ResetToken = this.token;
            if (this.isEmailConfirmed != true) {
                this.userServicepassword.setPassword(this.setPasswordModel).subscribe(function (res) {
                    if (res.statusCode === 200) {
                        //localStorage.removeItem("access_token");
                        //localStorage.removeItem("usertype");
                        //localStorage.removeItem("moduleList");
                        //localStorage.removeItem("userinfo");
                        //this.LoginUser = new UserDetails();
                        _this.toaster.success("Password has been set successfully. Please login.");
                        _this.setPasswordModal.hide();
                        _this.loadSave = false;
                        _this.listFilter = null;
                        if (_this.searchUserType != null && _this.searchUserType != '') {
                            _this.userTypeSelect.clearModel();
                            _this.restddl();
                        }
                        _this.refresh();
                    }
                    else {
                        _this.toaster.error(res.responseMessage);
                        _this.loadSave = false;
                    }
                });
            }
            else {
                this.userServicepassword.ResetPassword(this.setPasswordModel).subscribe(function (res) {
                    if (res.statusCode === 200) {
                        //localStorage.removeItem("access_token");
                        //localStorage.removeItem("usertype");
                        //localStorage.removeItem("moduleList");
                        //localStorage.removeItem("userinfo");
                        //this.LoginUser = new UserDetails();
                        _this.toaster.success("Password has been reset successfully. Please login.");
                        _this.setPasswordModal.hide();
                        _this.loadSave = false;
                        if (_this.searchUserType != null && _this.searchUserType != '') {
                            _this.getuserList();
                            _this.userTypeSelect.clearModel();
                            _this.restddl();
                        }
                        _this.listFilter = '';
                        _this.searchUserType = '';
                        _this.refresh();
                    }
                    else {
                        _this.toaster.error(res.responseMessage);
                        _this.loadSave = false;
                    }
                });
            }
        }
        else {
            this.commonService.validateAllFormFields(this.setPasswordForm);
            this.loadSave = false;
        }
    };
    ListUsersComponent.prototype.onSelect = function (_a) {
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
    ListUsersComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        //if (this.listFiltertext != null)
        //  this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyid, this.is_filter);
    };
    ListUsersComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.length > 0) {
            this.listFiltertext = "Name like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    ListUsersComponent.ctorParameters = function () { return [
        { type: _addedituser_service__WEBPACK_IMPORTED_MODULE_1__["ManageUserService"] },
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('userTypeSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], ListUsersComponent.prototype, "userTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"])
    ], ListUsersComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('setPassword', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__["ModalDirective"])
    ], ListUsersComponent.prototype, "setPasswordModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ListUsersComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_11__["SearchfilteraddComponent"])
    ], ListUsersComponent.prototype, "FilterViewModal", void 0);
    ListUsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ListUser',
            template: __importDefault(__webpack_require__(/*! raw-loader!./listusers.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageuser/listusers.component.html")).default
        }),
        __metadata("design:paramtypes", [_addedituser_service__WEBPACK_IMPORTED_MODULE_1__["ManageUserService"], _shared_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]])
    ], ListUsersComponent);
    return ListUsersComponent;
}());



/***/ }),

/***/ "./src/app/views/manageuser/user-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/manageuser/user-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: UserRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoutingModule", function() { return UserRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _addedituser_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addedituser.component */ "./src/app/views/manageuser/addedituser.component.ts");
/* harmony import */ var _listusers_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listusers.component */ "./src/app/views/manageuser/listusers.component.ts");
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
    { path: '', component: _listusers_component__WEBPACK_IMPORTED_MODULE_3__["ListUsersComponent"] },
    { path: 'adduser', component: _addedituser_component__WEBPACK_IMPORTED_MODULE_2__["AddEditUserComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'UserAdd' } },
    { path: 'edituser/:id', component: _addedituser_component__WEBPACK_IMPORTED_MODULE_2__["AddEditUserComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'USERUPDATE' } }
];
var UserRoutingModule = /** @class */ (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], UserRoutingModule);
    return UserRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/manageuser/user.module.ts":
/*!*************************************************!*\
  !*** ./src/app/views/manageuser/user.module.ts ***!
  \*************************************************/
/*! exports provided: UserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _addedituser_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addedituser.component */ "./src/app/views/manageuser/addedituser.component.ts");
/* harmony import */ var _listusers_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listusers.component */ "./src/app/views/manageuser/listusers.component.ts");
/* harmony import */ var _addedituser_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addedituser.service */ "./src/app/views/manageuser/addedituser.service.ts");
/* harmony import */ var _user_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-routing.module */ "./src/app/views/manageuser/user-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _addedituser_component__WEBPACK_IMPORTED_MODULE_2__["AddEditUserComponent"],
                _listusers_component__WEBPACK_IMPORTED_MODULE_3__["ListUsersComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _user_routing_module__WEBPACK_IMPORTED_MODULE_5__["UserRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalModule"]
            ],
            providers: [_addedituser_service__WEBPACK_IMPORTED_MODULE_4__["ManageUserService"]],
            bootstrap: [_addedituser_component__WEBPACK_IMPORTED_MODULE_2__["AddEditUserComponent"]]
        })
    ], UserModule);
    return UserModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-manageuser-user-module.js.map