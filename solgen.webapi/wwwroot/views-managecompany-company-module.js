(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-managecompany-company-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managecompany/addeditcompay.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/managecompany/addeditcompay.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>pageTitle</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/managecompany\">Manage Company</a></li>\r\n      <li class=\"active\">pageTitle</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<!--<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a href=\"dashboard.html\">Home</a>\r\n      </li>\r\n      <li class=\"active\">Add/Edit Company</li>\r\n    </ol>\r\n  </div>\r\n</div>-->\r\n<div class=\"clearfix\"></div>\r\n\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-content\">\r\n        <form [formGroup]=\"companyForm\" autocomplete=\"off\">\r\n          <div class=\"row  mb-2\">\r\n            <div class=\"col-sm-12 col-md-12\">\r\n              <h3 class=\"form-heading ml-0\"><span>Company Details</span></h3>\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-4\">\r\n              <label>Company Name:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Please Company Name\" formControlName=\"companyName\"\r\n                       [ngClass]=\"{'is-invalid': (companyName.invalid && (companyName.dirty || companyName.touched) && (companyName.errors?.required || companyName.errors?.maxlength)) }\">\r\n\r\n                <small *ngIf=\"companyName.invalid && (companyName.dirty || companyName.touched) && companyName.errors?.required\"\r\n                       class=\"text-danger\">company name is required</small>\r\n                <small *ngIf=\"companyName.invalid && (companyName.dirty || companyName.touched) && companyName.errors?.maxlength\"\r\n                       class=\"text-danger\">company name must be less than 50 characters.</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-4\">\r\n              <label>Company Type:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstCompantType\" placeholder=\"Select Company Type\" bindValue=\"value\" bindLabel=\"text\" [attr.disabled]=\"isDisabled\" formControlName=\"companyType\"\r\n                           [ngClass]=\"{'is-invalid': (companyType.invalid && (companyType.dirty || companyType.touched) && companyType.errors?.required)}\"></ng-select>\r\n                <small *ngIf=\"companyType.invalid && (companyType.dirty || companyType.touched) && companyType.errors?.required\"\r\n                       class=\"text-danger\">Please select Company Type</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-4\">\r\n              <!--<label>Company Logo:<span class=\"text-danger\">*</span></label>\r\n    <div class=\"form-group\">\r\n      <div class=\"input-group mb-3\">\r\n        <div class=\"custom-file\">\r\n          <input type=\"file\" class=\"custom-file-input\" id=\"inputGroupFile02\">\r\n          <label class=\"custom-file-label\" for=\"inputGroupFile02\">Choose file</label>\r\n        </div>\r\n      </div>\r\n    </div>-->\r\n              <label>Company Logo:</label>\r\n              <div class=\"input-group\">\r\n                <div class=\"input-group-prepend\" *ngIf=\"imageLink!=''\">\r\n                  <img src={{imageLink}} alt=\"img\" class=\"upload_image_thnumb\" data-toggle=\"modal\" data-target=\"#myModal\">\r\n\r\n                  <div id=\"myModal\" style=\" background: none !important;\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n                    <div class=\"modal-dialog\" style=\"height:450px!important;width:450px!important; \">\r\n                      <div class=\"\">\r\n                        <button type=\"button\" class=\"close\" style=\"color: #fff!important; \" data-dismiss=\"modal\">&times;</button>\r\n                      </div>\r\n                      <div class=\"modal-content\">\r\n                        <div class=\"text-center\">\r\n                          <img src={{imageLink}} alt=\"img\" style=\"height:450px!important;width:450px!important; \" class=\"img-responsive\">\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"custom-file w-50 m-fileup\">\r\n                  <input formControlName=\"companyLogo\" class=\"custom-file-input\" #file type=\"file\" name='file' #fileInput accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"setFile($event)\" lang=\"es\">\r\n                  <label class=\"custom-file-label\">{{fileName}}</label>\r\n                </div>\r\n                <small><i class=\"text-primary\">Valid image format is image/x-png, image/gif, image/jpeg and limit upto 5MB.</i> </small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-12\">\r\n              <h3 class=\"form-heading ml-0\"><span>Company Admin Details</span></h3>\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-4\">\r\n              <label>First Name:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Please First Name\" formControlName=\"firstName\"\r\n                       [ngClass]=\"{'is-invalid': (firstName.invalid && (firstName.dirty || firstName.touched) && (firstName.errors?.required || firstName.errors?.maxlength)) }\">\r\n\r\n                <small *ngIf=\"firstName.invalid && (firstName.dirty || firstName.touched) && firstName.errors?.required\"\r\n                       class=\"text-danger\">First name is required</small>\r\n                <small *ngIf=\"firstName.invalid && (firstName.dirty || firstName.touched) && firstName.errors?.maxlength\"\r\n                       class=\"text-danger\">First Name must be less than 50 characters.</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-4\">\r\n              <label>Last Name:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Please Last Name\" formControlName=\"lastName\"\r\n                       [ngClass]=\"{'is-invalid': (lastName.invalid && (lastName.dirty || lastName.touched) && (lastName.errors?.required || lastName.errors?.maxlength)) }\">\r\n\r\n                <small *ngIf=\"lastName.invalid && (lastName.dirty || lastName.touched) && lastName.errors?.required\"\r\n                       class=\"text-danger\">Last name is required</small>\r\n                <small *ngIf=\"lastName.invalid && (lastName.dirty || lastName.touched) && lastName.errors?.maxlength\"\r\n                       class=\"text-danger\">Last Name must be less than 50 characters.</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-4\">\r\n              <label>Email:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Please Last Name\" formControlName=\"email\"\r\n                       [ngClass]=\"{'is-invalid': (email.invalid && (email.dirty || email.touched) && (email.errors?.required || email.errors?.maxlength)) }\">\r\n\r\n                <small *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors?.required\"\r\n                       class=\"text-danger\">Email is required</small>\r\n                <small *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors?.maxlength\"\r\n                       class=\"text-danger\">Email must be less than 200 characters.</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-12\">\r\n              <h3 class=\"form-heading ml-0\"><span>Module Access</span></h3>\r\n            </div>\r\n\r\n\r\n            <div class=\"col-md-12 pb-3 \">\r\n              <h3 _ngcontent-c1=\"\" class=\"form-heading ng-star-inserted ml-0\"><span _ngcontent-c1=\"\">Access Level </span></h3>\r\n              <label>For full control select the header checkbox. If you are select Add/Update/Delete Access Level then View permission will be given automatically.</label>\r\n              <div class=\"form-group\">\r\n                <div class=\"table-responsive\">\r\n                  <table class=\"table table-hover table-dynamic\" style=\"min-width:1024px;\">\r\n                    <thead>\r\n                      <tr>\r\n                        <th scope=\"col\">\r\n                          <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" id=\"customCheckModuleName\" class=\"custom-control-input\" value=\"moduleName\" formControlName=\"moduleNameSelect\" (click)=\"enableSelectAll($event)\" />\r\n                            <label class=\"custom-control-label\" for=\"customCheckModuleName\">Module Name</label>\r\n                          </div>\r\n                        </th>\r\n                        <th scope=\"col\">\r\n                          <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" id=\"customCheck\" class=\"custom-control-input\" value=\"add\" formControlName=\"addSelect\" (click)=\"enableSelectAll($event)\" />\r\n                            <label class=\"custom-control-label\" for=\"customCheck\">Add</label>\r\n                          </div>\r\n                        </th>\r\n                        <th scope=\"col\">\r\n                          <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" id=\"viewall\" class=\"custom-control-input\" value=\"read\" formControlName=\"readSelect\" (click)=\"enableSelectAll($event)\" />\r\n                            <label class=\"custom-control-label\" for=\"viewall\">View</label>\r\n                          </div>\r\n                        </th>\r\n                        <th scope=\"col\">\r\n                          <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" id=\"updateall\" class=\"custom-control-input\" value=\"update\" formControlName=\"updateSelect\" (click)=\"enableSelectAll($event)\" />\r\n                            <label class=\"custom-control-label\" for=\"updateall\">Update</label>\r\n                          </div>\r\n                        </th>\r\n                        <th scope=\"col\">\r\n                          <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" id=\"deleteall\" class=\"custom-control-input\" value=\"delete\" formControlName=\"deleteSelect\" (click)=\"enableSelectAll($event)\" />\r\n                            <label class=\"custom-control-label\" for=\"deleteall\">Delete</label>\r\n                          </div>\r\n                        </th>\r\n                      </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"companyModules\">\r\n                      <ng-container *ngFor=\"let pmodule of parentModule; let i=inde\">\r\n                        <tr>\r\n                          <td colspan=\"5\" style=\"background:#f1f1f1\">\r\n                            <b>{{pmodule.roleModuleModuleName}}</b>\r\n                            <!--<input type=\"checkbox\" id=\"module_{{i}}\" class=\"custom-control-input\" formControlName=\"moduleRoleModuleAddFlag\" (click)=\"enableTopHeader('add',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"module_{{i}}\"></label>-->\r\n                          </td>\r\n                        </tr>\r\n                        <tr *ngFor=\"let item of companyModules.controls; let i=index\" [formGroupName]=\"i\">\r\n                          <td *ngIf=\"pmodule.roleModuleId ==item.get('moduleParentModuleId').value \">\r\n                            <div class=\"custom-control custom-checkbox\">\r\n                              <input type=\"checkbox\" id=\"module_{{i}}\" class=\"custom-control-input\" formControlName=\"moduleRoleModuleAddFlag\" (click)=\"enableTopHeader('modeuleName',item,$event)\">\r\n                              <label class=\"custom-control-label\" for=\"module_{{i}}\">{{item.get('roleModuleModuleName').value}}</label>\r\n                              </div>\r\n                          </td>\r\n                          <td scope=\"row\" *ngIf=\"item.get('isEnableAddPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\">\r\n                            <div class=\"custom-control custom-checkbox\">\r\n                              <input type=\"checkbox\" id=\"Add_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleAddFlag\" (click)=\"enableTopHeader('add',item,$event)\">\r\n                              <label class=\"custom-control-label\" for=\"Add_{{i}}\"></label>\r\n                            </div>\r\n                          </td>\r\n                          <td scope=\"row\" *ngIf=\"!item.get('isEnableAddPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                          <td scope=\"row\" *ngIf=\"item.get('isEnableReadPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\">\r\n                            <!--<input type=\"checkbox\" formControlName=\"roleModuleReadFlag\" (click)=\"enableTopHeader('read',item,$event)\">-->\r\n                            <div  class=\"custom-control-inline\">\r\n                              <div class=\"custom-control custom-checkbox\">\r\n                                <input id=\"ViewShared_{{i}}\" type=\"checkbox\"  class=\"custom-control-input\" formControlName=\"roleModuleReadFlag\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                                <label class=\"custom-control-label\" for=\"ViewShared_{{i}}\"></label>\r\n                              </div>\r\n                             \r\n                            </div>\r\n                           \r\n                          </td>\r\n                          <td scope=\"row\" *ngIf=\"!item.get('isEnableReadPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                          <td scope=\"row\" *ngIf=\"item.get('isEnableEditPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\">\r\n                            <div class=\"custom-control custom-checkbox\">\r\n                              <input type=\"checkbox\" id=\"Update_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleUpdateFlag\" (click)=\"enableTopHeader('update',item,$event)\">\r\n                              <label class=\"custom-control-label\" for=\"Update_{{i}}\"></label>\r\n                            </div>\r\n                          </td>\r\n                          <td scope=\"row\" *ngIf=\"!item.get('isEnableEditPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                          <td scope=\"row\" *ngIf=\"item.get('isEnableDeletePermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\">\r\n                            <div class=\"custom-control custom-checkbox\">\r\n                              <input type=\"checkbox\" id=\"delete_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleDeleteFlag\" (click)=\"enableTopHeader('delete',item,$event)\">\r\n                              <label class=\"custom-control-label\" for=\"delete_{{i}}\"></label>\r\n                            </div>\r\n                          </td>\r\n                          <td scope=\"row\" *ngIf=\"!item.get('isEnableDeletePermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                        </tr>\r\n                      </ng-container>\r\n\r\n                      <tr *ngFor=\"let item of companyModules.controls; let i=index\" [formGroupName]=\"i\">\r\n\r\n                        <td *ngIf=\"item.get('moduleParentModuleId').value =='0'\">\r\n                          <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" id=\"module_{{i}}\" class=\"custom-control-input\" formControlName=\"moduleRoleModuleAddFlag\" (click)=\"enableTopHeader('modeuleName',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"module_{{i}}\">{{item.get('roleModuleModuleName').value}}</label>\r\n                          </div>\r\n                        </td>\r\n\r\n                        <td scope=\"row\" *ngIf=\"item.get('isEnableAddPermission').value && item.get('moduleParentModuleId').value =='0'\">\r\n\r\n                          <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" id=\"Add_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleAddFlag\" (click)=\"enableTopHeader('add',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"Add_{{i}}\"></label>\r\n                          </div>\r\n                        </td>\r\n                        <td scope=\"row\" *ngIf=\"!item.get('isEnableAddPermission').value && item.get('moduleParentModuleId').value =='0'\"></td>\r\n                        <td scope=\"row\" *ngIf=\"item.get('isEnableReadPermission').value && item.get('moduleParentModuleId').value =='0'\">\r\n                          <!--<input type=\"checkbox\" formControlName=\"roleModuleReadFlag\" (click)=\"enableTopHeader('read',item,$event)\">-->\r\n                            <div class=\"custom-control custom-checkbox \">\r\n                              <input id=\"ViewShared_{{i}}\" type=\"checkbox\"  class=\"custom-control-input\" formControlName=\"roleModuleReadFlag\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                              <label class=\"custom-control-label\" for=\"ViewShared_{{i}}\"></label>\r\n                          </div>\r\n                        </td>\r\n                        <td scope=\"row\" *ngIf=\"!item.get('isEnableReadPermission').value && item.get('moduleParentModuleId').value =='0'\"></td>\r\n                        <td scope=\"row\" *ngIf=\"item.get('isEnableEditPermission').value && item.get('moduleParentModuleId').value =='0'\">\r\n                          <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" id=\"Update_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleUpdateFlag\" (click)=\"enableTopHeader('update',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"Update_{{i}}\"></label>\r\n                          </div>\r\n                        </td>\r\n                        <td scope=\"row\" *ngIf=\"!item.get('isEnableEditPermission').value && item.get('moduleParentModuleId').value =='0'\"></td>\r\n                        <td scope=\"row\" *ngIf=\"item.get('isEnableDeletePermission').value && item.get('moduleParentModuleId').value =='0'\">\r\n                          <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" id=\"delete_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleDeleteFlag\" (click)=\"enableTopHeader('delete',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"delete_{{i}}\"></label>\r\n                          </div>\r\n                        </td>\r\n                        <td scope=\"row\" *ngIf=\"!item.get('isEnableDeletePermission').value && item.get('moduleParentModuleId').value =='0'\"></td>\r\n                      </tr>\r\n                      <tr *ngIf=\"companyModules.length==0\">\r\n                        <td colspan=\"6\" class=\"empty-row text-danger text-center\">\r\n                          Please select User Type to view Modules\r\n                        </td>\r\n                      </tr>\r\n                    </tbody>\r\n                  </table>\r\n                  <ng-template #loadRoleModules>\r\n                    <div class=\"card\">\r\n                      <div class=\"card-body normal margin-loadr p-5\">\r\n                        <app-loader [size]=60 [color]=\"'white'\" class=\"loader\"></app-loader>\r\n                      </div>\r\n                    </div>\r\n                  </ng-template>\r\n                </div>\r\n                <small *ngIf=\"companyModules.invalid && (companyModules.dirty || companyModules.touched) && companyModules.errors?.maxlength\"\r\n                       class=\"text-danger\">Please select atleast any one module.</small>\r\n\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-sm-12 col-md-12\">\r\n              <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n              <a class=\"btn btn-danger\" href=\"#\"><span><i class=\"fa fa-close\"></i> Cancel</span></a>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managecompany/companylist.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/managecompany/companylist.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Company</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Company</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-7\">\r\n            <div class=\"row searchfield  mr-1 w-100\">\r\n              <div class=\"col-lg-8 float-left mb-lg-0 mb-2\">\r\n                <!--<input type=\"search\" class=\"form-control input-sm\" placeholder=\"Search by Name\">-->\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n                <!--<button type=\"button\"><i class=\"fa fa-search\"></i></button>-->\r\n              </div>\r\n              <div class=\"col-lg-4 float-left\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n                <!--<a class=\"btn btn-white mr-1\" href=\"#\"><span><i class=\"fa fa-filter\"></i> Filter</span></a>-->\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-5\">\r\n            <div class=\"dt-buttons\">\r\n              <a class=\"btn btn-success mr-1\" routerLink=\"/managecompany/addcompany\"><span><i class=\"fa fa-plus\"></i> Add</span></a>\r\n              <a class=\"btn btn-danger\"href=\"javascript:void(0)\" (click)=\"remove()\"><span><i class=\"fa fa-trash\"></i> Delete</span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"pagedData.data\"\r\n                       [columnMode]=\"'force'\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [selected]=\"selected\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [displayCheck]=\"displayCheck\"\r\n                       (activate)=\"onActivate($event)\"\r\n                       (select)=\"onSelect($event)\">\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n          <!--<ngx-datatable-column name=\"Company\" prop=\"CompanyLogo\" [sortable]=\"true\">\r\n    <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n      <span class=\"uploadedimg\">\r\n        <img src={{imageLinkemail}} alt=\"img\" style=\"height:37px; width:40px;\" />\r\n      </span>\r\n      </ng-template>\r\n\r\n  </ngx-datatable-column>-->\r\n          <ngx-datatable-column name=\"Company Name\" prop=\"CompanyName\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Company Type\" prop=\"CompanyType\" [sortable]=\"true\"></ngx-datatable-column>\r\n          e-\r\n          <ngx-datatable-column name=\"Created Date\" prop=\"companyCreated\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              {{row.companyCreated}}\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"row.Status==1001\" class=\"text-center\">\r\n                <span class=\"status d-block text-center  status-success\">Active</span>\r\n              </div>\r\n              <div *ngIf=\"row.Status==1002\" class=\"text-center\">\r\n                <span class=\"status d-block  text-center  status-danger\">Inactive</span>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Login\" prop=\"Login\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div>\r\n                <span> <a href=\"javascript:void(0);\" class=\"text-primary font-16\"><i class=\"fa fa-sign-in\"></i></a></span>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"align-center\" [maxWidth]=\"100\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n                <a [routerLink]=\"['/user/edituser',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                <a title=\"Click to delete.\" (click)=\"DeleteCompany(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div class=\"page-count\">\r\n                {{\r\n                rowCount\r\n                }} total\r\n              </div>\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"pagedData.pager.currentPage+1\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n      </div>\r\n\r\n\r\n\r\n\r\n\r\n      <!-- Modal add new start -->\r\n      <div class=\"modal my-popups fade\" id=\"users\" tabindex=\"-1\" role=\"dialog\">\r\n        <div class=\"modal-dialog\" role=\"document\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <h5 class=\"modal-title\" id=\"exampleModalLabel\">Users</h5>\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                <span aria-hidden=\"true\">×</span>\r\n              </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"table-responsive mt-1\">\r\n                <table class=\"table table-hover table-dynamic\" style=\"min-width:250px;\">\r\n                  <thead>\r\n                    <tr>\r\n                      <th>Name</th>\r\n                      <th>Department</th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    <tr>\r\n                      <td>\r\n                        Sandra\r\n                      </td>\r\n                      <td>\r\n                        Development\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>\r\n                        Andrew Wilson\r\n                      </td>\r\n                      <td>\r\n                        Support\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>\r\n                        Cazares\r\n                      </td>\r\n                      <td>\r\n                        Support\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>\r\n                        Sandra\r\n                      </td>\r\n                      <td>\r\n                        Support\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n              <a href=\"#\" class=\"btn btn-danger\" data-dismiss=\"modal\"><i class=\"fa fa-close\"></i> Cancel</a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- Modal add new end -->\r\n");

/***/ }),

/***/ "./src/app/views/managecompany/addeditcompay.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/views/managecompany/addeditcompay.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZWNvbXBhbnkvYWRkZWRpdGNvbXBheS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/managecompany/addeditcompay.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/managecompany/addeditcompay.component.ts ***!
  \****************************************************************/
/*! exports provided: AddeditcompayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditcompayComponent", function() { return AddeditcompayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _companyservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./companyservice.service */ "./src/app/views/managecompany/companyservice.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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







var AddeditcompayComponent = /** @class */ (function () {
    function AddeditcompayComponent(commonService, fb, companyserviceService, dialogService, router, toastr, route) {
        this.commonService = commonService;
        this.fb = fb;
        this.companyserviceService = companyserviceService;
        this.dialogService = dialogService;
        this.router = router;
        this.toastr = toastr;
        this.route = route;
        this.loadSave = false;
        this.read = false;
        this.loadRoleModules = false;
        this.imageLink = '';
        this.fileName = 'Choose file';
        this.company = new _companyservice_service__WEBPACK_IMPORTED_MODULE_3__["Company"]();
        this.selectUpdateEnable = false;
        this.roleModulesData = [];
        this.parentModule = [];
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    ;
    AddeditcompayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.GetCompanyType();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.companyID = id;
            if (id) {
                _this.pageTitle = 'Edit Company';
                _this.loadSave = true;
                //this.getRole(id);
                //
            }
            else {
                _this.pageTitle = 'Add Company';
                _this.getRoleModules(null);
            }
        });
    };
    AddeditcompayComponent.prototype.GetCompanyType = function () {
        var _this = this;
        this.commonService.getMasterItemsList("CompanyType").subscribe(function (result) {
            _this.lstCompantType = _this.commonService.masters;
            console.log("This", _this.lstCompantType);
        });
    };
    Object.defineProperty(AddeditcompayComponent.prototype, "companyModules", {
        get: function () {
            return this.companyForm.get('companyModules');
        },
        enumerable: true,
        configurable: true
    });
    AddeditcompayComponent.prototype.initForm = function () {
        this.companyForm = this.fb.group({
            companyId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            companyName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
            companyLogo: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(200)]],
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            companyType: [this.company.companyType, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            lastName: [this.company.lastName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
            companyModules: this.fb.array([], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            'addSelect': false,
            'updateSelect': false,
            'deleteSelect': false,
            'readSelect': false,
            'moduleNameSelect': false
        });
    };
    Object.defineProperty(AddeditcompayComponent.prototype, "companyId", {
        get: function () { return this.companyForm.get('companyId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "companyName", {
        get: function () { return this.companyForm.get('companyName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "companyLogo", {
        get: function () { return this.companyForm.get('companyLogo'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "firstName", {
        get: function () { return this.companyForm.get('firstName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "companyType", {
        get: function () { return this.companyForm.get('companyType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "lastName", {
        get: function () { return this.companyForm.get('lastName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "email", {
        get: function () { return this.companyForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "addSelect", {
        get: function () { return this.companyForm.get('addSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "updateSelect", {
        get: function () { return this.companyForm.get('updateSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "deleteSelect", {
        get: function () { return this.companyForm.get('deleteSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "readSelect", {
        get: function () { return this.companyForm.get('readSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcompayComponent.prototype, "moduleNameSelect", {
        get: function () { return this.companyForm.get('moduleNameSelect'); },
        enumerable: true,
        configurable: true
    });
    AddeditcompayComponent.prototype.setFile = function ($event) {
        this.commonService.uploadImageFileValidator($event);
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB");
        if (this.commonService.isFileValid) {
            this.fileName = $event.target.files[0].name;
        }
        else {
            this.fileInput.nativeElement = 'undefined';
            this.fileName = "Choose file";
        }
    };
    AddeditcompayComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        input.append('companyId', this.companyId.value);
        input.append('companyName', this.companyName.value);
        input.append('companyType', this.companyType.value);
        input.append('firstName', this.firstName.value);
        input.append('lastName', this.lastName.value);
        input.append('email', this.email.value);
        input.append('companyLogo', this.companyLogo.value);
        input.append('companyModules', this.companyModules.value);
        if (this.commonService.isUploadImageValid) {
            if (this.companyLogo.value !== null) {
                input.append('filename', this.companyLogo.value);
            }
            var fileBrowser = this.fileInput.nativeElement;
            if (fileBrowser.files && fileBrowser.files[0]) {
                input.append('file', fileBrowser.files[0]);
            }
            return input;
        }
    };
    AddeditcompayComponent.prototype.save = function () {
        //   return;    
        var _this = this;
        if (this.companyForm.valid) {
            var selected = this.companyModules.controls.filter(function (m) { return m.get('roleModuleReadFlag').value === true
                || m.get('roleModuleAddFlag').value === true
                || m.get('roleModuleUpdateFlag').value === true
                || m.get('roleModuleDeleteFlag').value === true; });
            this.loadSave = true;
            //this.roleService.checkRoleNameIsExist(this.roleForm.controls.roleId.value, this.roleForm.controls.roleName.value).subscribe(m => {
            //  if (!m) {
            //    if (selected.length != 0) {
            var companyModel = this.prepareFormDataForDocument();
            this.companyserviceService.SaveCompany(companyModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toastr.success(result.responseMessage);
                    _this.router.navigateByUrl("/role");
                    setTimeout(function () { _this.loadSave = false; }, 3000);
                }
                else {
                    _this.loadSave = false;
                    _this.toastr.error('Error!', 'Unable to save record.');
                }
            });
            //    }
            //    else {
            //      this.loadSave = false;
            //      this.dialogService.confirm("Role Access", 'Please select atleast one Access Level.', 'Ok', 'Cancel', false).subscribe(confirmed => {
            //      });
            //    }
            //  } else {
            //    this.loadSave = false;
            //    this.dialogService.confirm("Add Role", `'${this.roleForm.controls.roleName.value}' role name is already exist.`, 'Ok', 'Cancel', false).subscribe(confirmed => {
            //    });
            //  }
            //});
        }
        else {
            this.commonService.validateAllFormFields(this.companyForm);
        }
    };
    AddeditcompayComponent.prototype.enableSelectAll = function ($event) {
        var _this = this;
        debugger;
        if ($event.target.value === 'add') {
            this.companyModules.controls.forEach(function (obj) {
                obj.patchValue({
                    roleModuleAddFlag: $event.target.checked
                });
            });
            //Start Read Role
            this.companyModules.controls.forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
                    _this.companyForm.patchValue({
                        readSelect: true,
                        moduleNameSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    _this.companyForm.patchValue({
                        readSelect: true,
                        moduleNameSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
            //End Read Role
        }
        else if ($event.target.value === 'read') {
            if ($event.target.checked) {
                this.companyModules.controls.forEach(function (obj) {
                    obj.patchValue({
                        roleModuleReadFlag: $event.target.checked,
                        moduleRoleModuleAddFlag: $event.target.checked,
                        roleModuleIsView: 'all'
                    });
                });
            }
            else {
                this.companyModules.controls.forEach(function (obj) {
                    obj.patchValue({
                        roleModuleReadFlag: $event.target.checked,
                        //moduleRoleModuleAddFlag: $event.target.checked,
                        roleModuleIsView: ''
                    });
                });
            }
            if (!$event.target.checked) {
                this.companyModules.controls.forEach(function (obj) {
                    obj.patchValue({
                        roleModuleAddFlag: false,
                        roleModuleUpdateFlag: false,
                        roleModuleDeleteFlag: false,
                    });
                });
                this.companyForm.patchValue({
                    addSelect: false,
                    deleteSelect: false,
                    updateSelect: false,
                });
            }
            else {
                this.companyForm.patchValue({
                    moduleNameSelect: true
                });
                this.companyModules.controls.forEach(function (obj) {
                    obj.patchValue({
                        roleModuleReadFlag: $event.target.checked,
                        roleModuleIsView: '',
                        moduleNameSelect: true,
                        moduleRoleModuleAddFlag: $event.target.checked,
                    });
                });
            }
        }
        else if ($event.target.value === 'update') {
            this.companyModules.controls.forEach(function (obj) {
                obj.patchValue({
                    roleModuleUpdateFlag: $event.target.checked
                });
            });
            //Start Read Role
            this.companyModules.controls.forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
                    _this.companyForm.patchValue({
                        readSelect: true,
                        moduleNameSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        // roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    _this.companyForm.patchValue({
                        readSelect: true,
                        moduleNameSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        //roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
            //End Read Role
        }
        else if ($event.target.value === 'moduleName') {
            this.companyModules.controls.forEach(function (obj) {
                obj.patchValue({
                    moduleRoleModuleAddFlag: $event.target.checked
                });
            });
            //Start Read Role
            this.companyModules.controls.forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('moduleRoleModuleAddFlag').value == true || obj.get('moduleRoleModuleAddFlag').value == true)) {
                    _this.companyForm.patchValue({
                        moduleNameSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    _this.companyForm.patchValue({
                        readSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
        }
        else if ($event.target.value === 'delete') {
            this.companyModules.controls.forEach(function (obj) {
                obj.patchValue({
                    roleModuleDeleteFlag: $event.target.checked
                });
            });
            //Start Read Role
            this.companyModules.controls.forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleUpdateFlag').value == true)) {
                    _this.companyForm.patchValue({
                        readSelect: true,
                        moduleNameSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    _this.companyForm.patchValue({
                        readSelect: true,
                        moduleNameSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
            //End Read Role
        }
        this.selectUpdateEnable = true;
    };
    AddeditcompayComponent.prototype.enableTopHeader = function (type, control, $event) {
        debugger;
        if (type === 'add') {
            this.companyModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                obj.patchValue({
                    roleModuleAddFlag: $event.target.checked
                });
            });
            this.companyForm.patchValue({
                addSelect: !this.companyModules.controls.some(function (m) { return m.get('roleModuleAddFlag').value === false; })
            });
            //Start Read Role
            this.companyModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
            //End Read Role
        }
        else if (type === 'read') {
            this.companyModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                obj.patchValue({
                    roleModuleReadFlag: $event.target.checked,
                });
                if (!$event.target.checked) {
                    obj.patchValue({
                        roleModuleAddFlag: false,
                        roleModuleDeleteFlag: false,
                        roleModuleUpdateFlag: false
                    });
                }
            });
            this.companyForm.patchValue({
                readSelect: !this.companyModules.controls.some(function (m) { return m.get('roleModuleReadFlag').value === false; }),
            });
            debugger;
            if (!$event.target.checked) {
                this.companyForm.patchValue({
                    addSelect: false,
                    updateSelect: false,
                    deleteSelect: false
                });
            }
            debugger;
        }
        else if (type === 'update') {
            this.companyModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                obj.patchValue({
                    roleModuleUpdateFlag: $event.target.checked,
                });
            });
            this.companyForm.patchValue({
                updateSelect: !this.companyModules.controls.some(function (m) { return m.get('roleModuleUpdateFlag').value === false; })
            });
            //Start Read Role
            this.companyModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                if (($event.target.checked == false) && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
            //End Read Role
        }
        else if (type === 'delete') {
            this.companyModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                obj.patchValue({
                    roleModuleDeleteFlag: $event.target.checked,
                });
            });
            this.companyForm.patchValue({
                deleteSelect: !this.companyModules.controls.some(function (m) { return m.get('roleModuleDeleteFlag').value === false; })
            });
            //Start Read Role
            this.companyModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleAddFlag').value == true)) {
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        moduleRoleModuleAddFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
            //End Read Role
        }
        else if (type === 'modeuleName') {
            this.companyModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                obj.patchValue({
                    moduleRoleModuleAddFlag: $event.target.checked
                });
            });
            this.companyForm.patchValue({
                moduleNameSelect: !this.companyModules.controls.some(function (m) { return m.get('moduleRoleModuleAddFlag').value === false; })
            });
            //Start Read Role
            this.companyModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleAddFlag').value == true)) {
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
        }
    };
    AddeditcompayComponent.prototype.selectUser = function (event) {
        this.companyModules.controls = [];
        this.getRoleModules(event.value);
        this.companyForm.patchValue({
            readSelect: false,
            addSelect: false,
            deleteSelect: false,
            updateSelect: false,
            moduleNameSelect: false
        });
    };
    AddeditcompayComponent.prototype.getRoleModules = function (userId) {
        var _this = this;
        //kate
        this.loadSave = true;
        this.parentModule = [];
        this.loadRoleModules = true; // console.log("inn")
        this.companyserviceService.getRoleModules("700").subscribe(function (response) {
            //// console.log("reole  response", response)
            if (response) {
                _this.companyserviceService.roleModules.forEach(function (m) {
                    //  this.roleModules.push(this.buildRoleModules(m));
                    //// console.log("RoleModule",this.roleService.roleModules);
                    if (m.isManageable === true) {
                        _this.companyModules.push(_this.buildRoleModules(m));
                    }
                    else {
                        //Parent Modules
                        // let parentModule1: ParentModules;
                        // parentModule1.roleModuleId = m.roleModuleId;
                        //parentModule1.roleModuleModuleName = m.roleModuleModuleName;
                        _this.parentModule.push(new _companyservice_service__WEBPACK_IMPORTED_MODULE_3__["ParentModules"](m.roleModuleModuleID, m.roleModuleModuleName));
                        //this.parentModule.push(m.roleModuleId);
                        //this.parentModule. = m.roleModuleModuleName;
                        //this.parentModule.push(parentModule);
                    }
                });
                // console.log("RoleMiduleIsManageble", this.roleModules);
                // console.log("RoleMiduleIsManagebleFalse", this.parentModule);
                _this.loadSave = false;
                _this.loadRoleModules = false;
            }
        }, function (error) {
            _this.loadRoleModules = false;
            _this.loadSave = false;
        });
        // console.log("this.parentModule", this.parentModule);
        var d = this.parentModule.filter(function (x) { return x.roleModuleId === "442f8d12-92b0-42fd-aa0b-a71514d54d9f"; });
        // console.log(d);
    };
    AddeditcompayComponent.prototype.buildRoleModules = function (roleModule) {
        console.log("RoleModule1", roleModule);
        return this.fb.group({
            roleModuleId: roleModule.roleModuleId,
            roleModuleRoleID: roleModule.roleModuleRoleID,
            roleModuleModuleID: roleModule.roleModuleModuleID,
            roleModuleModuleName: roleModule.roleModuleModuleName,
            roleModuleName: roleModule.roleModuleName,
            moduleDisplayOrder: roleModule.moduleDisplayOrder,
            roleModuleNotificationFlag: roleModule.roleModuleNotificationFlag,
            roleModuleEmailFlag: roleModule.roleModuleEmailFlag,
            moduleRoleModuleAddFlag: roleModule.moduleRoleModuleAddFlag,
            roleModuleAddFlag: roleModule.roleModuleAddFlag,
            roleModuleUpdateFlag: roleModule.roleModuleUpdateFlag,
            roleModuleSMSFlag: roleModule.roleModuleSMSFlag,
            roleModuleReadFlag: roleModule.roleModuleReadFlag,
            roleModuleDeleteFlag: roleModule.roleModuleDeleteFlag,
            isEnableAddPermission: roleModule.isEnableAddPermission,
            isEnableReadPermission: roleModule.isEnableReadPermission,
            isEnableEditPermission: roleModule.isEnableEditPermission,
            isEnableDeletePermission: roleModule.isEnableDeletePermission,
            isManageable: roleModule.isManageable,
            moduleParentModuleId: roleModule.moduleParentModuleId,
            roleModuleIsView: roleModule.roleModuleIsView,
            roleModuleIsViewShared: roleModule.roleModuleIsViewShared,
            roleModuleIsViewOwn: roleModule.roleModuleIsViewOwn,
            roleModuleIsViewAll: roleModule.roleModuleIsViewAll
        });
    };
    AddeditcompayComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _companyservice_service__WEBPACK_IMPORTED_MODULE_3__["CompanyserviceService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", Object)
    ], AddeditcompayComponent.prototype, "fileInput", void 0);
    AddeditcompayComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditcompay',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditcompay.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managecompany/addeditcompay.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditcompay.component.scss */ "./src/app/views/managecompany/addeditcompay.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _companyservice_service__WEBPACK_IMPORTED_MODULE_3__["CompanyserviceService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], AddeditcompayComponent);
    return AddeditcompayComponent;
}());



/***/ }),

/***/ "./src/app/views/managecompany/company-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/managecompany/company-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: ManagecompanyRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagecompanyRoutingModule", function() { return ManagecompanyRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _companylist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./companylist.component */ "./src/app/views/managecompany/companylist.component.ts");
/* harmony import */ var _addeditcompay_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditcompay.component */ "./src/app/views/managecompany/addeditcompay.component.ts");
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
    { path: '', component: _companylist_component__WEBPACK_IMPORTED_MODULE_2__["CompanylistComponent"], data: { title: 'List Role' } },
    { path: 'addcompany', component: _addeditcompay_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcompayComponent"] },
    { path: 'editcompany/:id', component: _addeditcompay_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcompayComponent"] }
];
var ManagecompanyRoutingModule = /** @class */ (function () {
    function ManagecompanyRoutingModule() {
    }
    ManagecompanyRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ManagecompanyRoutingModule);
    return ManagecompanyRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/managecompany/company.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/views/managecompany/company.module.ts ***!
  \*******************************************************/
/*! exports provided: CompanyModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyModule", function() { return CompanyModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var primeng_tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/tree */ "./node_modules/primeng/tree.js");
/* harmony import */ var primeng_tree__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(primeng_tree__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _company_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./company-routing.module */ "./src/app/views/managecompany/company-routing.module.ts");
/* harmony import */ var _companylist_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./companylist.component */ "./src/app/views/managecompany/companylist.component.ts");
/* harmony import */ var _companyservice_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./companyservice.service */ "./src/app/views/managecompany/companyservice.service.ts");
/* harmony import */ var _addeditcompay_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addeditcompay.component */ "./src/app/views/managecompany/addeditcompay.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









var CompanyModule = /** @class */ (function () {
    function CompanyModule() {
    }
    CompanyModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _companylist_component__WEBPACK_IMPORTED_MODULE_6__["CompanylistComponent"],
                _addeditcompay_component__WEBPACK_IMPORTED_MODULE_8__["AddeditcompayComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _company_routing_module__WEBPACK_IMPORTED_MODULE_5__["ManagecompanyRoutingModule"],
                primeng_tree__WEBPACK_IMPORTED_MODULE_3__["TreeModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_4__["ModalModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]
            ],
            providers: [
                _companyservice_service__WEBPACK_IMPORTED_MODULE_7__["CompanyserviceService"]
            ]
        })
    ], CompanyModule);
    return CompanyModule;
}());



/***/ }),

/***/ "./src/app/views/managecompany/companylist.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/views/managecompany/companylist.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZWNvbXBhbnkvY29tcGFueWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/managecompany/companylist.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/managecompany/companylist.component.ts ***!
  \**************************************************************/
/*! exports provided: CompanylistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanylistComponent", function() { return CompanylistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _companyservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./companyservice.service */ "./src/app/views/managecompany/companyservice.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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







var CompanylistComponent = /** @class */ (function () {
    function CompanylistComponent(companyserviceService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.companyserviceService = companyserviceService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.searchUserType = '';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["SelectionType"];
        this.selected = [];
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.loadSave = false;
        this.commonService.getMasterItemsList("manageuser_usertype_add").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        // console.log("modulePermission",  this.modulePermission);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    CompanylistComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.search();
    };
    CompanylistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    CompanylistComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.companyserviceService.GetCompanyList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.companyserviceService.pagedData;
            //this.displayCheck(this.pagedData);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CompanylistComponent.prototype.onActivate = function (event) {
    };
    CompanylistComponent.prototype.reset = function () {
        var _this = this;
        debugger;
        this.table.sorts = [];
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'desc';
        this.sortColumn = 'companyCreated';
        this.pageSizeValue = 10;
        this.companyserviceService.GetCompanyList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.companyserviceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CompanylistComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        var ab = $event.page - 1;
        this.companyserviceService.GetCompanyList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.companyserviceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CompanylistComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.companyserviceService.GetCompanyList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.companyserviceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CompanylistComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.companyserviceService.GetCompanyList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.companyserviceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CompanylistComponent.prototype.updateFilter = function (event) {
        this.listFilter = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    CompanylistComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        debugger;
        if (this.conId == "" || this.conId == null || this.conId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.conId += selected[i].CompanyId.toString() + ",";
                }
            }
        }
        else {
            this.conId = null;
            this.conId = "";
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.conId += selected[i].CompanyId.toString() + ",";
                }
            }
        }
    };
    CompanylistComponent.prototype.remove = function () {
        var _this = this;
        if (this.conId != null && this.conId != "") {
            var message = "Are you sure you want to delete Company(s)?";
            this.dialogService.confirm('Delete Company(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.companyserviceService.DeleteCompanys(_this.conId).subscribe(function (r) {
                        _this.toaster.success("Company(s) has been deleted successfully.");
                        _this.conId = "";
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
    CompanylistComponent.prototype.DeleteCompany = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Company \"" + row.CompanyName + "\"?";
        this.dialogService.confirm('Delete Company', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.companyserviceService.DeleteCompanys(row.CompanyId.toString() + ',').subscribe(function (response) {
                    if (response.statusCode == 200) {
                        _this.toaster.success("Company \"" + row.CompanyName + "\"\" has been deleted successfully");
                        _this.search();
                    }
                    else {
                        _this.toaster.error(response.responseMessage);
                    }
                }, function (error) {
                });
            }
        });
    };
    CompanylistComponent.ctorParameters = function () { return [
        { type: _companyservice_service__WEBPACK_IMPORTED_MODULE_3__["CompanyserviceService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["DatatableComponent"])
    ], CompanylistComponent.prototype, "table", void 0);
    CompanylistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-companylist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./companylist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managecompany/companylist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./companylist.component.scss */ "./src/app/views/managecompany/companylist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_companyservice_service__WEBPACK_IMPORTED_MODULE_3__["CompanyserviceService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"]])
    ], CompanylistComponent);
    return CompanylistComponent;
}());



/***/ }),

/***/ "./src/app/views/managecompany/companyservice.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/managecompany/companyservice.service.ts ***!
  \***************************************************************/
/*! exports provided: CompanyserviceService, ParentModules, CompanyModel, Company */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyserviceService", function() { return CompanyserviceService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParentModules", function() { return ParentModules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyModel", function() { return CompanyModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Company", function() { return Company; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
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




var CompanyserviceService = /** @class */ (function () {
    function CompanyserviceService(http) {
        this.http = http;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
        this.userUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl + "Company";
        this.roles = [];
        this.roleModules = [];
    }
    CompanyserviceService.prototype.GetCompanyList = function (name, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.userUri + "/GetCompanyList?name=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    CompanyserviceService.prototype.DeleteCompanys = function (selected) {
        return this.http.get(this.baseUri + ("Company/DeleteCompanys?companyIds=" + selected));
    };
    CompanyserviceService.prototype.getRoleModules = function (id) {
        var _this = this;
        if (id === void 0) { id = "700"; }
        // console.log(`${this.roleModuleUri}/GetRoleModule?userTypeId=${id}`);
        return this.http.get(this.baseUri + ("Company/GetCompanyModule?userTypeId=" + id))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.roleModules = response;
            return true;
        }));
    };
    //SaveCompany(company: Company) {
    //  return this.http.post(this.userUri, company)
    //}
    CompanyserviceService.prototype.SaveCompany = function (CompanyUpModel) {
        return this.http.post(this.baseUri + "Company/AddOrUpdateCompanySetup", CompanyUpModel);
    };
    CompanyserviceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    CompanyserviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], CompanyserviceService);
    return CompanyserviceService;
}());

var ParentModules = /** @class */ (function () {
    function ParentModules(mid, mname) {
        this.roleModuleId = '';
        this.roleModuleModuleName = '';
        this.roleModuleId = mid;
        this.roleModuleModuleName = mname;
    }
    return ParentModules;
}());

var CompanyModel = /** @class */ (function () {
    function CompanyModel() {
        this.roleModuleId = '';
        this.roleModuleModuleID = '';
        this.roleModuleRoleID = '';
        this.moduleDisplayOrder = 0;
        this.roleModuleName = '';
        this.roleModuleModuleName = '';
        this.roleModuleAddFlag = false;
        this.moduleRoleModuleAddFlag = false;
        this.roleModuleDeleteFlag = false;
        this.roleModuleEmailFlag = false;
        this.roleModuleNotificationFlag = false;
        this.roleModuleReadFlag = false;
        this.roleModuleSMSFlag = false;
        this.roleModuleUpdateFlag = false;
        this.isEnableAddPermission = false;
        this.isEnableReadPermission = false;
        this.isEnableEditPermission = false;
        this.isEnableDeletePermission = false;
        this.isManageable = false;
        this.moduleParentModuleId = '';
        this.roleModuleIsViewShared = false;
        this.roleModuleIsViewOwn = false;
        this.roleModuleIsView = '';
        this.roleModuleIsViewAll = false;
    }
    return CompanyModel;
}());

var Company = /** @class */ (function () {
    function Company() {
        this.companyId = '';
        this.companyName = '';
        this.companyLogo = '';
        this.firstName = '';
        this.companyType = null;
        this.lastName = '';
        this.email = '';
        this.companyModuleModel = [];
    }
    return Company;
}());



/***/ })

}]);
//# sourceMappingURL=views-managecompany-company-module.js.map