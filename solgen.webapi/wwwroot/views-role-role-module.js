(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-role-role-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/role-add-or-edit.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/role-add-or-edit.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Add Roles</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/role\">Manage Roles</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \">\r\n    <form [formGroup]=\"roleForm\" autocomplete=\"off\">\r\n      <div class=\"row\" [ngClass]=\"{'disabled':loadSave}\">\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Role Name:<span class=\"text-danger\"> *</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" placeholder=\"Please enter name\" formControlName=\"roleName\"\r\n                   [ngClass]=\"{'is-invalid': (roleName.invalid && (roleName.dirty || roleName.touched) && (roleName.errors?.required || roleName.errors?.maxlength)) }\">\r\n\r\n            <small *ngIf=\"roleName.invalid && (roleName.dirty || roleName.touched) && roleName.errors?.required\"\r\n                   class=\"text-danger\">Role name is required</small>\r\n            <small *ngIf=\"roleName.invalid && (roleName.dirty || roleName.touched) && roleName.errors?.maxlength\"\r\n                   class=\"text-danger\">Role name must be less than 50 characters.</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>User Type:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"lstUserType\" placeholder=\"Select User Type\" bindValue=\"value\" bindLabel=\"text\" [attr.disabled]=\"isDisabled\" formControlName=\"userType\" (change)=\"selectUser($event)\"\r\n                       [ngClass]=\"{'is-invalid': (userType.invalid && (userType.dirty || userType.touched) && userType.errors?.required)}\"></ng-select>\r\n            <small *ngIf=\"userType.invalid && (userType.dirty || userType.touched) && userType.errors?.required\"\r\n                   class=\"text-danger\">Please select User Type</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Status:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"statuses\" [loading]=\"loadSave\" [closeOnSelect]=\"true\" placeholder=\"Select status\" formControlName=\"roleStatusId\"\r\n                       bindLabel=\"text\" bindValue=\"value\"\r\n                       [ngClass]=\"{'is-invalid': (roleStatusId.invalid && (roleStatusId.dirty || roleStatusId.touched) && roleStatusId.errors?.required) }\"></ng-select>\r\n            <small *ngIf=\"roleStatusId.invalid && (roleStatusId.dirty || roleStatusId.touched) && roleStatusId.errors?.required\"\r\n                   style=\"color:red;\">Please select Status</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Report To:</label>\r\n          <div class=\"input-group mb-3\">\r\n            <input type=\"text\" class=\"form-control\" placeholder=\"Please enter name\" formControlName=\"reportto\" />\r\n            <div class=\"input-group-append bg-primary border-0 ml-1\">\r\n              <span class=\"input-group-text bg-primary border-0\"><a href=\"javascript:void(0);\" class=\"text-white\" (click)=\"openPopup()\">Report To</a></span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12\">\r\n          <label>Description:</label>\r\n          <div class=\"form-group\">\r\n            <textarea rows=\"3\" class=\"form-control\" placeholder=\"Please enter description\" formControlName=\"roleDescription\"\r\n                      [ngClass]=\"{'is-invalid': (roleDescription.invalid && (roleDescription.dirty || roleDescription.touched) && roleDescription.errors?.maxlength) }\" style=\"height:auto;\"></textarea>\r\n\r\n            <small *ngIf=\"roleDescription.invalid && (roleDescription.dirty || roleDescription.touched) && roleDescription.errors?.maxlength\"\r\n                   class=\"text-danger\">Description must be less than 200 characters</small>\r\n          </div>\r\n        </div>\r\n        \r\n        <div class=\"col-md-12 pb-3 \">\r\n          <h3 _ngcontent-c1=\"\" class=\"form-heading ng-star-inserted ml-0\"><span _ngcontent-c1=\"\">Access Level </span></h3>\r\n          <label>For full control select the header checkbox. If you are select Add/Update/Delete Access Level then View permission will be given automatically.</label>\r\n          <div class=\"form-group\">\r\n            <div class=\"table-responsive\">\r\n              <table class=\"table table-hover table-dynamic\" style=\"min-width:1024px;\">\r\n                <thead>\r\n                  <tr>\r\n                    <th scope=\"col\">Module</th>\r\n                    <th scope=\"col\">\r\n                      <div class=\"custom-control custom-checkbox\">\r\n                        <input type=\"checkbox\" id=\"customCheck\" class=\"custom-control-input\" value=\"add\" formControlName=\"addSelect\" (click)=\"enableSelectAll($event)\" />\r\n                        <label class=\"custom-control-label\" for=\"customCheck\">Add</label>\r\n                      </div>\r\n                    </th>\r\n                    <th scope=\"col\">\r\n                      <div class=\"custom-control custom-checkbox\">\r\n                        <input type=\"checkbox\" id=\"viewall\" class=\"custom-control-input\" value=\"read\" formControlName=\"readSelect\" (click)=\"enableSelectAll($event)\" />\r\n                        <label class=\"custom-control-label\" for=\"viewall\">View</label>\r\n                      </div>\r\n                    </th>\r\n                    <th scope=\"col\">\r\n                      <div class=\"custom-control custom-checkbox\">\r\n                        <input type=\"checkbox\" id=\"updateall\" class=\"custom-control-input\" value=\"update\" formControlName=\"updateSelect\" (click)=\"enableSelectAll($event)\" />\r\n                        <label class=\"custom-control-label\" for=\"updateall\">Update</label>\r\n                      </div>\r\n                    </th>\r\n                    <th scope=\"col\">\r\n                      <div class=\"custom-control custom-checkbox\">\r\n                        <input type=\"checkbox\" id=\"deleteall\" class=\"custom-control-input\" value=\"delete\" formControlName=\"deleteSelect\" (click)=\"enableSelectAll($event)\" />\r\n                        <label class=\"custom-control-label\" for=\"deleteall\">Delete</label>\r\n                      </div>\r\n                    </th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"roleModules\">\r\n                  <ng-container *ngFor=\"let pmodule of parentModule; let i=inde\">\r\n                    <tr>\r\n                      <td colspan=\"5\" style=\"background:#f1f1f1\">\r\n                        <b>{{pmodule.roleModuleModuleName}}</b>\r\n                      </td>\r\n                    </tr>\r\n                    <tr *ngFor=\"let item of roleModules.controls; let i=index\" [formGroupName]=\"i\">\r\n                      <td *ngIf=\"pmodule.roleModuleId ==item.get('moduleParentModuleId').value \">\r\n                        {{item.get('roleModuleModuleName').value}}\r\n                      </td>\r\n                      <td scope=\"row\" *ngIf=\"item.get('isEnableAddPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\">\r\n                        <div class=\"custom-control custom-checkbox\">\r\n                          <input type=\"checkbox\" id=\"Add_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleAddFlag\" (click)=\"enableTopHeader('add',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"Add_{{i}}\"></label>\r\n                        </div>\r\n                      </td>\r\n                      <td scope=\"row\" *ngIf=\"!item.get('isEnableAddPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                      <td scope=\"row\" *ngIf=\"item.get('isEnableReadPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\">\r\n                        <!--<input type=\"checkbox\" formControlName=\"roleModuleReadFlag\" (click)=\"enableTopHeader('read',item,$event)\">-->\r\n                        <div *ngIf=\"item.get('roleModuleIsViewShared').value==true && item.get('roleModuleIsViewAll').value==false\" class=\"custom-control-inline\">\r\n                          <div class=\"custom-control custom-radio pl-0\">\r\n                            <input id=\"ViewShared_{{i}}\" type=\"radio\" value=\"shared\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"ViewShared_{{i}}\">View Shared</label>\r\n                          </div>\r\n                          <div class=\"custom-control custom-radio\">\r\n                            <input id=\"Viewnone_{{i}}\" type=\"radio\" value=\"none\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"Viewnone_{{i}}\">None</label>\r\n                          </div>\r\n                        </div>\r\n                        <div *ngIf=\"item.get('roleModuleIsViewOwn').value==true && item.get('roleModuleIsViewAll').value==false\" class=\"custom-control-inline\">\r\n                          <div class=\"custom-control custom-radio  pl-0\">\r\n                            <input id=\"ViewOwn_{{i}}\" type=\"radio\" value=\"own\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"ViewOwn_{{i}}\">View Own</label>\r\n                          </div>\r\n                          <div class=\"custom-control custom-radio\">\r\n                            <input id=\"Viewnone_{{i}}\" type=\"radio\" value=\"none\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"Viewnone_{{i}}\">None</label>\r\n                          </div>\r\n                        </div>\r\n                        <div *ngIf=\"item.get('roleModuleIsViewAll').value==true\" class=\"custom-control-inline\">\r\n                          <div class=\"custom-control custom-radio  pl-0\">\r\n                            <input id=\"ViewAll_{{i}}\" type=\"radio\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" value=\"all\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"ViewAll_{{i}}\">View All</label>\r\n                          </div>\r\n\r\n                          <div class=\"custom-control custom-radio\">\r\n                            <input id=\"ViewShared_{{i}}\" type=\"radio\" value=\"shared\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"ViewShared_{{i}}\">View Shared</label>\r\n                          </div>\r\n                          <div class=\"custom-control custom-radio\">\r\n                            <input id=\"ViewOwn_{{i}}\" type=\"radio\" value=\"own\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"ViewOwn_{{i}}\">View Own</label>\r\n                          </div>\r\n                          <div class=\"custom-control custom-radio\">\r\n                            <input id=\"Viewnone_{{i}}\" type=\"radio\" value=\"none\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                            <label class=\"custom-control-label\" for=\"Viewnone_{{i}}\">None</label>\r\n                          </div>\r\n                        </div>\r\n                      </td>\r\n                      <td scope=\"row\" *ngIf=\"!item.get('isEnableReadPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                      <td scope=\"row\" *ngIf=\"item.get('isEnableEditPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\">\r\n                        <div class=\"custom-control custom-checkbox\">\r\n                          <input type=\"checkbox\" id=\"Update_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleUpdateFlag\" (click)=\"enableTopHeader('update',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"Update_{{i}}\"></label>\r\n                        </div>\r\n                      </td>\r\n                      <td scope=\"row\" *ngIf=\"!item.get('isEnableEditPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                      <td scope=\"row\" *ngIf=\"item.get('isEnableDeletePermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\">\r\n                        <div class=\"custom-control custom-checkbox\">\r\n                          <input type=\"checkbox\" id=\"delete_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleDeleteFlag\" (click)=\"enableTopHeader('delete',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"delete_{{i}}\"></label>\r\n                        </div>\r\n                      </td>\r\n                      <td scope=\"row\" *ngIf=\"!item.get('isEnableDeletePermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                    </tr>\r\n                  </ng-container>\r\n\r\n                  <tr *ngFor=\"let item of roleModules.controls; let i=index\" [formGroupName]=\"i\">\r\n\r\n                    <td *ngIf=\"item.get('moduleParentModuleId').value =='0'\">\r\n                      {{item.get('roleModuleModuleName').value}}\r\n                    </td>\r\n\r\n                    <td scope=\"row\" *ngIf=\"item.get('isEnableAddPermission').value && item.get('moduleParentModuleId').value =='0'\">\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n                        <input type=\"checkbox\" id=\"Add_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleAddFlag\" (click)=\"enableTopHeader('add',item,$event)\">\r\n                        <label class=\"custom-control-label\" for=\"Add_{{i}}\"></label>\r\n                      </div>\r\n                    </td>\r\n                    <td scope=\"row\" *ngIf=\"!item.get('isEnableAddPermission').value && item.get('moduleParentModuleId').value =='0'\"></td>\r\n                    <td scope=\"row\" *ngIf=\"item.get('isEnableReadPermission').value && item.get('moduleParentModuleId').value =='0'\">\r\n                      <!--<input type=\"checkbox\" formControlName=\"roleModuleReadFlag\" (click)=\"enableTopHeader('read',item,$event)\">-->\r\n                      <div *ngIf=\"item.get('roleModuleIsViewShared').value==true && item.get('roleModuleIsViewAll').value==false\" class=\"custom-control-inline\">\r\n                        <div class=\"custom-control custom-radio  pl-0\">\r\n                          <input id=\"ViewShared_{{i}}\" type=\"radio\" value=\"shared\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"ViewShared_{{i}}\">View Shared</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio  pl-0\">\r\n                          <input id=\"Viewnone_{{i}}\" type=\"radio\" value=\"none\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"Viewnone_{{i}}\">None</label>\r\n                        </div>\r\n                      </div>\r\n                      <div *ngIf=\"item.get('roleModuleIsViewOwn').value==true && item.get('roleModuleIsViewAll').value==false\" class=\"custom-control-inline\">\r\n                        <div class=\"custom-control custom-radio  pl-0\">\r\n                          <input id=\"ViewOwn_{{i}}\" type=\"radio\" value=\"own\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"ViewOwn_{{i}}\">View Own</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <input id=\"Viewnone_{{i}}\" type=\"radio\" value=\"none\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"Viewnone_{{i}}\">None</label>\r\n                        </div>\r\n                      </div>\r\n                      <div *ngIf=\"item.get('roleModuleIsViewAll').value==true\" class=\"custom-control-inline\">\r\n                        <div class=\"custom-control custom-radio  pl-0\">\r\n                          <input id=\"ViewAll_{{i}}\" type=\"radio\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" value=\"all\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"ViewAll_{{i}}\">View All</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <input id=\"ViewShared_{{i}}\" type=\"radio\" value=\"shared\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"ViewShared_{{i}}\">View Shared</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <input id=\"ViewOwn_{{i}}\" type=\"radio\" value=\"own\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"ViewOwn_{{i}}\">View Own</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <input id=\"Viewnone_{{i}}\" type=\"radio\" value=\"none\" class=\"custom-control-input\" formControlName=\"roleModuleIsView\" (click)=\"enableTopHeader('read',item,$event)\">\r\n                          <label class=\"custom-control-label\" for=\"Viewnone_{{i}}\">None</label>\r\n                        </div>\r\n                      </div>\r\n                    </td>\r\n                    <td scope=\"row\" *ngIf=\"!item.get('isEnableReadPermission').value && item.get('moduleParentModuleId').value =='0'\"></td>\r\n                    <td scope=\"row\" *ngIf=\"item.get('isEnableEditPermission').value && item.get('moduleParentModuleId').value =='0'\">\r\n                      <div class=\"custom-control custom-checkbox\">\r\n                        <input type=\"checkbox\" id=\"Update_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleUpdateFlag\" (click)=\"enableTopHeader('update',item,$event)\">\r\n                        <label class=\"custom-control-label\" for=\"Update_{{i}}\"></label>\r\n                      </div>\r\n                    </td>\r\n                    <td scope=\"row\" *ngIf=\"!item.get('isEnableEditPermission').value && item.get('moduleParentModuleId').value =='0'\"></td>\r\n                    <td scope=\"row\" *ngIf=\"item.get('isEnableDeletePermission').value && item.get('moduleParentModuleId').value =='0'\">\r\n                      <div class=\"custom-control custom-checkbox\">\r\n                        <input type=\"checkbox\" id=\"delete_{{i}}\" class=\"custom-control-input\" formControlName=\"roleModuleDeleteFlag\" (click)=\"enableTopHeader('delete',item,$event)\">\r\n                        <label class=\"custom-control-label\" for=\"delete_{{i}}\"></label>\r\n                      </div>                      \r\n                    </td>\r\n                    <td scope=\"row\" *ngIf=\"!item.get('isEnableDeletePermission').value && item.get('moduleParentModuleId').value =='0'\"></td>\r\n                  </tr>\r\n\r\n                  <!--<ng-container *ngFor=\"let pmodule of parentModule; let i=inde\">\r\n                    <tr style=\"background-color:#929292;\">\r\n                      <td colspan=\"5\">\r\n\r\n                      </td>\r\n                    </tr>\r\n                    <tr *ngFor=\"let item of roleModules.controls; let i=index\" [formGroupName]=\"i\">\r\n                      <td *ngIf=\"pmodule.roleModuleId !=item.get('moduleParentModuleId').value \">\r\n                        {{item.get('roleModuleModuleName').value}}\r\n                      </td>\r\n                      <td scope=\"row\" *ngIf=\"item.get('isEnableAddPermission').value && pmodule.roleModuleId !=item.get('moduleParentModuleId').value\"><input type=\"checkbox\" formControlName=\"roleModuleAddFlag\" (click)=\"enableTopHeader('add',item,$event)\"></td>\r\n                      <td scope=\"row\" *ngIf=\"!item.get('isEnableAddPermission').value && pmodule.roleModuleId !=item.get('moduleParentModuleId').value\"></td>\r\n                      <td scope=\"row\" *ngIf=\"item.get('isEnableReadPermission').value && pmodule.roleModuleId !=item.get('moduleParentModuleId').value\"><input type=\"checkbox\" formControlName=\"roleModuleReadFlag\" (click)=\"enableTopHeader('read',item,$event)\"></td>\r\n                      <td scope=\"row\" *ngIf=\"!item.get('isEnableReadPermission').value && pmodule.roleModuleId !=item.get('moduleParentModuleId').value\"></td>\r\n                      <td scope=\"row\" *ngIf=\"item.get('isEnableEditPermission').value && pmodule.roleModuleId !=item.get('moduleParentModuleId').value\"><input type=\"checkbox\" formControlName=\"roleModuleUpdateFlag\" (click)=\"enableTopHeader('update',item,$event)\"></td>\r\n                      <td scope=\"row\" *ngIf=\"!item.get('isEnableEditPermission').value && pmodule.roleModuleId !=item.get('moduleParentModuleId').value\"></td>\r\n                      <td scope=\"row\" *ngIf=\"item.get('isEnableDeletePermission').value && pmodule.roleModuleId !=item.get('moduleParentModuleId').value\"><input type=\"checkbox\" formControlName=\"roleModuleDeleteFlag\" (click)=\"enableTopHeader('delete',item,$event)\"></td>\r\n                      <td scope=\"row\" *ngIf=\"!item.get('isEnableDeletePermission').value && pmodule.roleModuleId !=item.get('moduleParentModuleId').value\"></td>\r\n\r\n                  </ng-container>-->\r\n                  <!--<tr *ngFor=\"let pmodule of parentModule; let i=index\">\r\n                    <td colspan=\"5\">\r\n                      {{pmodule.roleModuleModuleName}}\r\n                      <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"\">\r\n                        <tbody>\r\n                          <tr *ngFor=\"let item of roleModules.controls; let i=index\" [formGroupName]=\"i\">\r\n                            <td width=\"150\" *ngIf=\"pmodule.roleModuleId ==item.get('moduleParentModuleId').value\">\r\n                              {{item.get('roleModuleModuleName').value}}\r\n                            </td>\r\n                            <td scope=\"row\" *ngIf=\"item.get('isEnableAddPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"><input type=\"checkbox\" formControlName=\"roleModuleAddFlag\" (click)=\"enableTopHeader('add',item,$event)\"></td>\r\n                            <td scope=\"row\" *ngIf=\"!item.get('isEnableAddPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                            <td scope=\"row\" *ngIf=\"item.get('isEnableReadPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"><input type=\"checkbox\" formControlName=\"roleModuleReadFlag\" (click)=\"enableTopHeader('read',item,$event)\"></td>\r\n                            <td scope=\"row\" *ngIf=\"!item.get('isEnableReadPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                            <td scope=\"row\" *ngIf=\"item.get('isEnableEditPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"><input type=\"checkbox\" formControlName=\"roleModuleUpdateFlag\" (click)=\"enableTopHeader('update',item,$event)\"></td>\r\n                            <td scope=\"row\" *ngIf=\"!item.get('isEnableEditPermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                            <td scope=\"row\" *ngIf=\"item.get('isEnableDeletePermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"><input type=\"checkbox\" formControlName=\"roleModuleDeleteFlag\" (click)=\"enableTopHeader('delete',item,$event)\"></td>\r\n                            <td scope=\"row\" *ngIf=\"!item.get('isEnableDeletePermission').value && pmodule.roleModuleId ==item.get('moduleParentModuleId').value\"></td>\r\n                          </tr>\r\n                        </tbody>\r\n                      </table>\r\n                    </td>\r\n                  </tr>-->\r\n                  <!--<tr *ngFor=\"let item of roleModules.controls; let i=index\" [formGroupName]=\"i\">\r\n                    <td>\r\n                      {{item.get('roleModuleModuleName').value}}\r\n                    </td>\r\n                    <td scope=\"row\" *ngIf=\"item.get('isEnableAddPermission').value\"><input type=\"checkbox\" formControlName=\"roleModuleAddFlag\" (click)=\"enableTopHeader('add',item,$event)\"></td>\r\n                    <td scope=\"row\" *ngIf=\"!item.get('isEnableAddPermission').value\"></td>\r\n                    <td scope=\"row\" *ngIf=\"item.get('isEnableReadPermission').value\"><input type=\"checkbox\" formControlName=\"roleModuleReadFlag\" (click)=\"enableTopHeader('read',item,$event)\"></td>\r\n                    <td scope=\"row\" *ngIf=\"!item.get('isEnableReadPermission').value\"></td>\r\n                    <td scope=\"row\" *ngIf=\"item.get('isEnableEditPermission').value\"><input type=\"checkbox\" formControlName=\"roleModuleUpdateFlag\" (click)=\"enableTopHeader('update',item,$event)\"></td>\r\n                    <td scope=\"row\" *ngIf=\"!item.get('isEnableEditPermission').value\"></td>\r\n                    <td scope=\"row\" *ngIf=\"item.get('isEnableDeletePermission').value\"><input type=\"checkbox\"  formControlName=\"roleModuleDeleteFlag\" (click)=\"enableTopHeader('delete',item,$event)\"></td>\r\n                   <td scope=\"row\" *ngIf=\"!item.get('isEnableDeletePermission').value\"></td>\r\n                  </tr>-->\r\n\r\n                  <tr *ngIf=\"roleModules.length==0\">\r\n                    <td colspan=\"6\" class=\"empty-row text-danger text-center\">\r\n                      Please select User Type to view Modules\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n              <ng-template #loadRoleModules>\r\n                <div class=\"card\">\r\n                  <div class=\"card-body normal margin-loadr p-5\">\r\n                    <app-loader [size]=60 [color]=\"'white'\" class=\"loader\"></app-loader>\r\n                  </div>\r\n                </div>\r\n              </ng-template>\r\n            </div>\r\n            <small *ngIf=\"roleModules.invalid && (roleModules.dirty || roleModules.touched) && roleModules.errors?.maxlength\"\r\n                   class=\"text-danger\">Please select atleast any one module.</small>\r\n\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 mb-4\">\r\n          <!--*ngIf=\"addOrUpdatePermission\"-->\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" *ngIf=\"addOrUpdatePermission\"  (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"cancelForm()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n<div class=\"modal fade in show\" bsModal #treepopup=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Report To</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"ClosePopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n\r\n      <p-tree [value]=\"files2\" [(selection)]=\"reportid\" class=\"w-100\" selectionMode=\"single\" (onNodeSelect)=\"nodeSelect($event)\"></p-tree>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"ClosePopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>-->\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/role-view.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/role-view.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  role-view works!\n</p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/role.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/role.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Roles</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Roles</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3  btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-8\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-3 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-3 float-left mb-lg-0 mb-2 pl-3 pl-lg-0\">\r\n                <ng-select #clearDrp [items]=\"roledata\" placeholder=\"Select User Type\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"SetUserTypeValue($event.value)\"\r\n                           (clear)=\"restUserTypeddl()\">\r\n                </ng-select>\r\n              </div>\r\n              <div class=\"col-lg-6 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i></span></a>\r\n                <a class=\"btn btn-danger form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i></span></a>\r\n                <!--<a class=\"btn btn-white form-btns\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\"><span><i class=\"fa fa-filter\"></i> Filter</span></a>-->\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-4\">\r\n            <div class=\"dt-buttons\">\r\n              <!--<a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\"><span><i class=\"fa fa-list-alt\"></i> Manage View</span></a>-->\r\n              <a class=\"btn btn-success mr-1\" routerLink=\"/role/addrole\" *ngIf='isAdd' tooltip=\"Add Role\"><span><i class=\"fa fa-plus\"></i></span></a>\r\n              <a  class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>\r\n              <!--<a class=\"btn btn-success form-btns\" routerLink=\"/role/editrole123\" *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag'><span><i class=\"fa fa-plus\"></i>Add Role21</span></a>-->\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"pagedData.data\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column *ngIf=\"isUpdate\" name=\"Role Name\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <a href=\"javascript:void(0);\" [routerLink]=\"['/role/editrole',row.RoleId]\">{{row.RoleName}}</a>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column *ngIf=\"!isUpdate\" name=\"Role Name\" prop=\"RoleName\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"User Type\" sortable=\"true\" prop=\"UserType\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Number of Users\" sortable=\"true\" prop=\"RoleCount\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <a href=\"javascript:void(0);\" (click)=\"ShowUsersListPopup(row)\">{{row.RoleCount}}</a>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\" [maxWidth]=\"100\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n                <a *ngIf='isUpdate' [routerLink]=\"['/role/editrole',row.RoleId]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                <!--<a [routerLink]=\"['/role/editrole123',row.RoleId]\" title=\"Edit\"><i class=\"fa fa-pencil text-secondary pr-2\"></i></a>-->\r\n                <a href=\"javascript:void(0);\" *ngIf=\"(row.asociatedUser==null ||row.asociatedUser==0) && isDelete\" (click)=\"DeleteRole(row)\" class=\"text-danger mx-1\">\r\n                  <i title=\"Click to delete.\"\r\n                     class=\"fa fa-trash\"></i>\r\n                </a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-footer>\r\n            <ng-template class=\"selected-count\" ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"crm\" subModuleName=\"lead\"></app-searchfilteradd>\r\n<app-manageview (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"crm\" subModuleName=\"lead\"></app-manageview>\r\n<app-userlistingpopup #ServiceUsersListPopUp></app-userlistingpopup>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/roleedit.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/roleedit.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Add Roles</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/role\">Manage Roles</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \">\r\n    <form [formGroup]=\"roleForm\" autocomplete=\"off\">\r\n      <div class=\"row\" [ngClass]=\"{'disabled':loadSave}\">\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Role Name:<span class=\"text-danger\"> *</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" placeholder=\"Please enter name\" formControlName=\"roleName\"\r\n                   [ngClass]=\"{'is-invalid': (roleName.invalid && (roleName.dirty || roleName.touched) && (roleName.errors?.required || roleName.errors?.maxlength)) }\">\r\n\r\n            <small *ngIf=\"roleName.invalid && (roleName.dirty || roleName.touched) && roleName.errors?.required\"\r\n                   class=\"text-danger\">Role name is required</small>\r\n            <small *ngIf=\"roleName.invalid && (roleName.dirty || roleName.touched) && roleName.errors?.maxlength\"\r\n                   class=\"text-danger\">Role name must be less than 50 characters.</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>User Type:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"lstUserType\" placeholder=\"Select User Type\" bindValue=\"value\" bindLabel=\"text\" [attr.disabled]=\"isDisabled\" formControlName=\"userType\" (change)=\"selectUser($event)\"\r\n                       [ngClass]=\"{'is-invalid': (userType.invalid && (userType.dirty || userType.touched) && userType.errors?.required)}\"></ng-select>\r\n            <small *ngIf=\"userType.invalid && (userType.dirty || userType.touched) && userType.errors?.required\"\r\n                   class=\"text-danger\">Please select User Type</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\">\r\n          <label>Status:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"statuses\" [loading]=\"loadSave\" [closeOnSelect]=\"true\" placeholder=\"Select status\" formControlName=\"roleStatusId\"\r\n                       bindLabel=\"text\" bindValue=\"value\"\r\n                       [ngClass]=\"{'is-invalid': (roleStatusId.invalid && (roleStatusId.dirty || roleStatusId.touched) && roleStatusId.errors?.required) }\"></ng-select>\r\n            <small *ngIf=\"roleStatusId.invalid && (roleStatusId.dirty || roleStatusId.touched) && roleStatusId.errors?.required\"\r\n                   style=\"color:red;\">Please select Status</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-4\" *ngIf=\"!isLoanHomi\">\r\n          <label>Report To:</label>\r\n          <div class=\"input-group mb-3\">\r\n            <input type=\"text\" class=\"form-control\" placeholder=\"Please enter name\" formControlName=\"reportto\" />\r\n            <div class=\"input-group-append bg-primary border-0 ml-1\">\r\n              <span class=\"input-group-text bg-primary border-0\"><a href=\"javascript:void(0);\" class=\"text-white\" (click)=\"openPopup()\"><i class=\"fa fa-user mr-1\"></i>Report To</a></span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12\">\r\n          <label>Description:</label>\r\n          <div class=\"form-group\">\r\n            <textarea rows=\"3\" class=\"form-control\" placeholder=\"Please enter description\" formControlName=\"roleDescription\"\r\n                      [ngClass]=\"{'is-invalid': (roleDescription.invalid && (roleDescription.dirty || roleDescription.touched) && roleDescription.errors?.maxlength) }\" style=\"height:auto;\"></textarea>\r\n            <small *ngIf=\"roleDescription.invalid && (roleDescription.dirty || roleDescription.touched) && roleDescription.errors?.maxlength\"\r\n                   class=\"text-danger\">Description must be less than 200 characters</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-12 col-md-12 col-lg-12\" *ngIf=\"tabshow\"><h3 class=\"form-heading ng-star-inserted ml-0 mt-0 mb-3\"><span>Module Privileges:</span></h3></div>\r\n        <div class=\"col-md-12 mb-12\">\r\n          <div id=\"accordion\" *ngIf=\"tabshow\" class=\"panel-group accordion mb-3 resp-adbtn\">\r\n            <ng-container *ngFor=\"let t of tabdata\">\r\n              <div class=\"panel\" *ngFor=\"let s of t.SUB_MODULES; let i=index\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"javascript:void(0);\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" [attr.data-target]=\"'#collapse'+s.SUB_MODULE_ID\"> <span>{{s.SUB_MODULE_NAME}}</span></a>\r\n\r\n                  </h4>\r\n                  <div class=\"btn-in-panel\">\r\n                    <div class=\"custom-control custom-checkbox pr-2\">\r\n                      <input class=\"custom-control-input\" [checked]=\"t.parentIsSelected\" type=\"checkbox\" (change)=\"onChangeMainCheckbox($event,s.SUB_MODULE_ID,s)\" [id]=\"s.SUB_MODULE_ID\">\r\n                      <label class=\"custom-control-label text-capitalize\" [for]=\"s.SUB_MODULE_ID\">\r\n\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div [attr.id]=\"'collapse'+s.SUB_MODULE_ID\" class=\"panel-collapse collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\r\n                  \r\n\r\n                  <div class=\"panel-body mt-0\">\r\n                    <div class=\"table-responsive\">\r\n                      <table class=\"table\" style=\"min-width: 100%;\">\r\n                        <tbody>\r\n                          <ng-container *ngFor=\"let type of getUniquePriviledgesType(s.PRIVILEGE_LISTS)\">\r\n                            <ng-container *ngFor=\"let p of getPriviledgesByType(s.PRIVILEGE_LISTS, type); let pIndex = index\">\r\n\r\n                              <tr *ngIf=\"pIndex == 0 && p.PRIVILEGE_TYPE!='URL'\" class=\"widget-heading\">\r\n                                <td><strong>{{p.PRIVILEGE_TYPE}}s</strong></td>\r\n                              </tr>\r\n                              <tr [ngClass]=\"{'widgets': p.PRIVILEGE_TYPE=='Widget'}\">\r\n\r\n                                <td class=\"fulwith-radio-n-check px-0\">\r\n                                  <div class=\"custom-control custom-checkbox p-0\" *ngIf=\" !p.IS_SUB_CHILD && p.SUB_CHILD_GROUP == 0 ||p.PARENT_ID == 0 \">\r\n\r\n                                    <div class=\"clearfix\"></div>\r\n                                    <input type=\"checkbox\" class=\"custom-control-input\"\r\n                                           [id]=\"p.PRIVILEGE_ID\" [checked]=\"p.IS_Selected\" (change)=\"onChange(p.PRIVILEGE_ID,$event,p,s.PRIVILEGE_LISTS)\" name=\"example1\">\r\n                                    <label class=\"custom-control-label text-capitalize w-100\" style=\"font-weight:600;\" [for]=\"p.PRIVILEGE_ID\"><i *ngIf=\"p.PRIVILEGE_TYPE!='URL'\" class=\"fa fa-circle\"></i> {{p.PRIVILEGE_DESC}}</label>\r\n                                  </div>\r\n                                  <div class=\"custom-control custom-radio  p-0\" *ngIf=\"(p.IS_SUB_CHILD || p.SUB_CHILD_GROUP != 0 )&& p.PARENT_ID != 0 \">\r\n                                    <input id=\"radio{{p.PRIVILEGE_ID}}\" [checked]=\"p.IS_Selected\" [name]=\"p.SUB_CHILD_GROUP\" (click)=\"check($event,p,s.PRIVILEGE_LISTS)\" [value]=\"p.PRIVILEGE_ID\" type=\"radio\">\r\n                                    <label for=\"radio{{p.PRIVILEGE_ID}}\" class=\"radio-label text-capitalize\"><i class=\"fa fa-square\"></i> {{p.PRIVILEGE_DESC}} </label>\r\n                                  </div>\r\n                                </td>\r\n                              </tr>\r\n                            </ng-container>\r\n                          </ng-container>\r\n                        </tbody>\r\n                      </table>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-container>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 mb-4 d-flex justify-content-end\">\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"cancelForm()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n<div class=\"modal fade in show\" bsModal #treepopup=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Report To</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"ClosePopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <p-tree [value]=\"files2\" [(selection)]=\"reportid\" class=\"w-100\" selectionMode=\"single\" (onNodeSelect)=\"nodeSelect($event)\"></p-tree>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"ClosePopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/userlistingpopup/userlistingpopup.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/userlistingpopup/userlistingpopup.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #ServiceUsersListPopUp=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info mob-respt\" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\" style=\"z-index:1\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Users</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body scrolable-height p-0\" style=\"max-height:600px;overflow:visible;\">\r\n        <div class=\"clearfix\"></div>\r\n        <div class=\"panel m-0\">\r\n          <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-4 col-md-4 col-sm-6 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='searchTxt' placeholder=\"Search By User Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 col-md-8 col-sm-6 \">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"onSearch()\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"onReset()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n              </div>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"row\">\r\n              <div class=\"col-12\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <ngx-datatable #table class=\"bootstrap\"\r\n                                   [rows]=\"lstServiceUserNames.data\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [scrollbarH]=\"true\"\r\n                                   [rowHeight]=\"'40'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [footerHeight]=\"40\"\r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [count]=\"lstServiceUserNames.pager.totalItems\"\r\n                                   [offset]=\"lstServiceUserNames.pager.currentPage\"\r\n                                   [limit]=\"lstServiceUserNames.pager.pageSize\"\r\n                                   (page)='setPage($event)'\r\n                                   (sort)=\"onSort($event)\">\r\n                      <ngx-datatable-column name=\"Name\" [sortable]=\"true\" prop=\"Name\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Email\" [sortable]=\"true\" prop=\"Email\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"User Type\" [sortable]=\"false\" prop=\"UserTypeName\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Role\" [sortable]=\"false\" prop=\"RoleName\"></ngx-datatable-column>\r\n                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\" style=\"max-width:170px;\">\r\n                            Total Records: {{rowCount}}\r\n                          </div>\r\n                          <div>\r\n                            <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                              <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                                <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                           bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                              </span>\r\n                            </div>\r\n                          </div>\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [page]=\"lstServiceUserNames.pager.currentPage\"\r\n                                           [size]=\"pageSizeValue\"\r\n                                           [count]=\"lstServiceUserNames.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                           (change)=\"setPage($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/role/role-add-or-edit.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/role/role-add-or-edit.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JvbGUvcm9sZS1hZGQtb3ItZWRpdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/role/role-add-or-edit.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/role/role-add-or-edit.component.ts ***!
  \**********************************************************/
/*! exports provided: RoleAddOrEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleAddOrEditComponent", function() { return RoleAddOrEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _role_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./role.service */ "./src/app/views/role/role.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
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









var RoleAddOrEditComponent = /** @class */ (function () {
    //templateObjects: Template[] = new Array();
    //parentModule1: ParentModules;
    function RoleAddOrEditComponent(commonService, fb, roleService, dialogService, router, toastr, route, http) {
        var _this = this;
        this.commonService = commonService;
        this.fb = fb;
        this.roleService = roleService;
        this.dialogService = dialogService;
        this.router = router;
        this.toastr = toastr;
        this.route = route;
        this.http = http;
        this.loadSave = false;
        this.read = false;
        this.loadRoleModules = false;
        this.role = new _role_service__WEBPACK_IMPORTED_MODULE_5__["Role"]();
        this.selectUpdateEnable = false;
        this.roleModulesData = [];
        this.isDisabled = '';
        this.addOrUpdatePermission = false;
        //modulePermission: ModuleList;
        this.parentModule = [];
        this.reporttoname = '';
        this.modulePermission = [];
        this.isUpdate = false;
        this.isAdd = false;
        this.dataUrl = 'assets';
        this.selectedAllNodes = [];
        var priviledgeCode = this.route.snapshot.data.privilegeCode;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase(); });
        if (add == undefined) {
            this.addOrUpdatePermission = false;
        }
        else {
            this.addOrUpdatePermission = true;
        }
        this.commonService.getMasterItemsList("manageuser_usertype_role").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters; //.filter(x => x.masterName == "UserType");
        });
    }
    RoleAddOrEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.getStatuses();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.rolegetid = id;
            if (id) {
                _this.loadSave = true;
                _this.getRole(id);
                //
            }
            else {
                _this.pageTitle = 'Add Role';
                _this.getRoleModules(null);
            }
        });
        //this.getFiles().then(files => {
        //  this.files1 = files;
        //});
        //this.roleService
        //   .get('json.json')
        //   .subscribe((response: any) => {
        //     this.files1 = response.data
        //   });   
        this.GetRoleNameForTree(this.rolegetid);
    };
    RoleAddOrEditComponent.prototype.selectUser = function (event) {
        this.roleModules.controls = [];
        this.getRoleModules(event.value);
        this.roleForm.patchValue({
            readSelect: false,
            addSelect: false,
            deleteSelect: false,
            updateSelect: false
        });
    };
    RoleAddOrEditComponent.prototype.getStatuses = function () {
        var _this = this;
        this.commonService.getMasterItemsList("role_Status").subscribe(function (response) {
            _this.statuses = _this.commonService.masters;
        });
    };
    RoleAddOrEditComponent.prototype.cancelForm = function () {
        this.router.navigateByUrl("/role");
    };
    RoleAddOrEditComponent.prototype.getRole = function (id) {
        var _this = this;
        this.roleService.getRoleById(id)
            .subscribe(function (role) {
            _this.displayRole(role);
            _this.loadSave = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.loadSave = false;
        });
    };
    RoleAddOrEditComponent.prototype.displayRole = function (role) {
        var _this = this;
        if (this.roleForm) {
            this.roleForm.reset();
            this.parentModule.length = 0;
        }
        this.role = role;
        console.log('role', this.role);
        // console.log("RoleUserT", this.role)
        if (this.role.roleId === '') {
            this.pageTitle = 'Add Role';
        }
        else {
            this.pageTitle = "Edit Role: " + this.role.roleName;
        }
        this.userType.disable();
        this.reportid = this.role.reporttoid;
        this.reportname = this.role.reportto;
        // Update the data on the form
        this.roleForm.patchValue({
            reportto: this.role.reportto,
            roleId: this.role.roleId,
            roleName: this.role.roleName,
            userType: this.role.userType.toString(),
            roleDescription: this.role.roleDescription,
            roleStatusId: this.role.roleStatusId.toString(),
        });
        // console.log("RoleModuleFor", this.role.roleModuleModel);
        this.role.roleModuleModel.forEach(function (m) {
            if (m.isManageable === true) {
                //alert(1);
                _this.roleModules.push(_this.buildRoleModules(m));
            }
            else {
                //Parent Modules
                _this.parentModule.push(new _role_service__WEBPACK_IMPORTED_MODULE_5__["ParentModules"](m.roleModuleModuleID, m.roleModuleModuleName));
            }
        });
        if (this.role.isRoleAssined) {
            this.roleForm.get('roleStatusId').disable();
        }
    };
    RoleAddOrEditComponent.prototype.buildRoleModules = function (roleModule) {
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
    RoleAddOrEditComponent.prototype.getRoleModules = function (userId) {
        var _this = this;
        //kate
        this.loadSave = true;
        this.parentModule = [];
        this.loadRoleModules = true; // console.log("inn")
        this.roleService.getRoleModules(userId).subscribe(function (response) {
            //// console.log("reole  response", response)
            _this.roleModulesData = response;
            if (response) {
                _this.roleService.roleModules.forEach(function (m) {
                    //  this.roleModules.push(this.buildRoleModules(m));
                    //// console.log("RoleModule",this.roleService.roleModules);
                    if (m.isManageable === true) {
                        _this.roleModules.push(_this.buildRoleModules(m));
                    }
                    else {
                        //Parent Modules
                        // let parentModule1: ParentModules;
                        // parentModule1.roleModuleId = m.roleModuleId;
                        //parentModule1.roleModuleModuleName = m.roleModuleModuleName;
                        _this.parentModule.push(new _role_service__WEBPACK_IMPORTED_MODULE_5__["ParentModules"](m.roleModuleModuleID, m.roleModuleModuleName));
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
    RoleAddOrEditComponent.prototype.save = function () {
        var _this = this;
        console.log('this.roleForm.value', this.roleForm.value);
        //   return;    
        if (this.roleForm.valid) {
            var selected = this.roleModules.controls.filter(function (m) { return m.get('roleModuleReadFlag').value === true
                || m.get('roleModuleAddFlag').value === true
                || m.get('roleModuleUpdateFlag').value === true
                || m.get('roleModuleDeleteFlag').value === true; });
            this.loadSave = true;
            this.roleService.checkRoleNameIsExist(this.roleForm.controls.roleId.value, this.roleForm.controls.roleName.value).subscribe(function (m) {
                if (!m) {
                    if (selected.length != 0) {
                        _this.roleService.saveRole(_this.roleForm.value).subscribe(function (result) {
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
                    }
                    else {
                        _this.loadSave = false;
                        _this.dialogService.confirm("Role Access", 'Please select atleast one Access Level.', 'Ok', 'Cancel', false).subscribe(function (confirmed) {
                        });
                    }
                }
                else {
                    _this.loadSave = false;
                    _this.dialogService.confirm("Add Role", "'" + _this.roleForm.controls.roleName.value + "' role name is already exist.", 'Ok', 'Cancel', false).subscribe(function (confirmed) {
                    });
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.roleForm);
        }
    };
    RoleAddOrEditComponent.prototype.enableSelectAll = function ($event) {
        var _this = this;
        if ($event.target.value === 'add') {
            this.roleModules.controls.forEach(function (obj) {
                obj.patchValue({
                    roleModuleAddFlag: $event.target.checked
                });
            });
            //Start Read Role
            this.roleModules.controls.forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
                    _this.roleForm.patchValue({
                        readSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    _this.roleForm.patchValue({
                        readSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
            //End Read Role
        }
        else if ($event.target.value === 'read') {
            if ($event.target.checked) {
                this.roleModules.controls.forEach(function (obj) {
                    obj.patchValue({
                        roleModuleReadFlag: $event.target.checked,
                        roleModuleIsView: 'all'
                    });
                });
            }
            else {
                this.roleModules.controls.forEach(function (obj) {
                    obj.patchValue({
                        //roleModuleReadFlag: $event.target.checked,
                        roleModuleIsView: ''
                    });
                });
            }
            if (!$event.target.checked) {
                this.roleModules.controls.forEach(function (obj) {
                    obj.patchValue({
                        roleModuleAddFlag: false,
                        roleModuleUpdateFlag: false,
                        roleModuleDeleteFlag: false
                    });
                });
                this.roleForm.patchValue({
                    addSelect: false,
                    deleteSelect: false,
                    updateSelect: false,
                    readSelect: false
                });
            }
            else {
                this.roleModules.controls.forEach(function (obj) {
                    obj.patchValue({
                        roleModuleReadFlag: $event.target.checked,
                        roleModuleIsView: 'all'
                    });
                });
            }
        }
        else if ($event.target.value === 'update') {
            this.roleModules.controls.forEach(function (obj) {
                obj.patchValue({
                    roleModuleUpdateFlag: $event.target.checked
                });
            });
            //Start Read Role
            this.roleModules.controls.forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
                    _this.roleForm.patchValue({
                        readSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        // roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    _this.roleForm.patchValue({
                        readSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        //roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
            //End Read Role
        }
        else if ($event.target.value === 'delete') {
            this.roleModules.controls.forEach(function (obj) {
                obj.patchValue({
                    roleModuleDeleteFlag: $event.target.checked
                });
            });
            //Start Read Role
            this.roleModules.controls.forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleUpdateFlag').value == true)) {
                    _this.roleForm.patchValue({
                        readSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
                else if ($event.target.checked == true) {
                    _this.roleForm.patchValue({
                        readSelect: true
                    });
                    obj.patchValue({
                        roleModuleReadFlag: true,
                        roleModuleIsView: 'all'
                    });
                }
            });
            //End Read Role
        }
        this.selectUpdateEnable = true;
    };
    RoleAddOrEditComponent.prototype.enableTopHeader = function (type, control, $event) {
        if (type === 'add') {
            this.roleModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                obj.patchValue({
                    roleModuleAddFlag: $event.target.checked
                });
            });
            this.roleForm.patchValue({
                addSelect: !this.roleModules.controls.some(function (m) { return m.get('roleModuleAddFlag').value === false; })
            });
            //Start Read Role
            this.roleModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
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
            //End Read Role
        }
        else if (type === 'read') {
            this.roleModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                obj.patchValue({
                    roleModuleReadFlag: $event.target.checked
                });
                if (!$event.target.checked) {
                    obj.patchValue({
                        roleModuleAddFlag: false,
                        roleModuleDeleteFlag: false,
                        roleModuleUpdateFlag: false
                    });
                }
            });
            this.roleForm.patchValue({
                readSelect: !this.roleModules.controls.some(function (m) { return m.get('roleModuleReadFlag').value === false; })
            });
            if (!$event.target.checked) {
                this.roleForm.patchValue({
                    addSelect: false,
                    updateSelect: false,
                    deleteSelect: false
                });
            }
        }
        else if (type === 'update') {
            this.roleModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                obj.patchValue({
                    roleModuleUpdateFlag: $event.target.checked
                });
            });
            this.roleForm.patchValue({
                updateSelect: !this.roleModules.controls.some(function (m) { return m.get('roleModuleUpdateFlag').value === false; })
            });
            //Start Read Role
            this.roleModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                if (($event.target.checked == false) && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
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
            //End Read Role
        }
        else if (type === 'delete') {
            this.roleModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
                obj.patchValue({
                    roleModuleDeleteFlag: $event.target.checked
                });
            });
            this.roleForm.patchValue({
                deleteSelect: !this.roleModules.controls.some(function (m) { return m.get('roleModuleDeleteFlag').value === false; })
            });
            //Start Read Role
            this.roleModules.controls.filter(function (m) { return m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value; }).forEach(function (obj) {
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
            //End Read Role
        }
    };
    Object.defineProperty(RoleAddOrEditComponent.prototype, "roleModules", {
        get: function () {
            return this.roleForm.get('roleModules');
        },
        enumerable: true,
        configurable: true
    });
    RoleAddOrEditComponent.prototype.GetRoleNameForTree = function (id) {
        var _this = this;
        this.roleService.GetRoleNameForTree(id).subscribe(function (result) {
            console.log('result', result);
            _this.files2 = JSON.parse(result).data;
            console.log('this.files1', _this.files2);
        });
    };
    RoleAddOrEditComponent.prototype.nodeSelect = function (e) {
        console.log('sadasdf', e);
        this.reporttoname = e.node.label;
        this.reporttoidselected = e.node.data;
        this.roleForm.get("reportto").setValue(this.reporttoname);
        this.roleForm.get("reporttoid").setValue(this.reporttoidselected);
        this.treepopup.hide();
    };
    RoleAddOrEditComponent.prototype.initForm = function () {
        this.roleForm = this.fb.group({
            'roleId': [this.role.roleId, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].nullValidator],
            'roleName': [this.role.roleName, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(50)]],
            'roleDescription': [this.role.roleDescription, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(200)],
            'roleStatusId': [this.role.roleStatusId, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'addSelect': false,
            'updateSelect': false,
            'deleteSelect': false,
            'readSelect': false,
            'userType': [this.role.userType, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            roleModules: this.fb.array([], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required),
            reportto: [''],
            reporttoid: [''],
        });
    };
    RoleAddOrEditComponent.prototype.openPopup = function () {
        var _this = this;
        //this.GetRoleNameForTree();
        this.treepopup.show();
        this.files2.forEach(function (s) {
            console.log('report', _this.reportid);
            var data = _this.CheckId(s, _this.reportid.toString());
            if (data != null) {
                _this.selectedAllNodes.forEach(function (node) {
                    node.expanded = true;
                });
            }
        });
    };
    RoleAddOrEditComponent.prototype.CheckId = function (s, selectedId) {
        console.log('children', s.children);
        if (s.data.toString() === selectedId) {
            this.selectedAllNodes.push(s);
            return s;
        }
        else if ((s.children != null && s.children.length != undefined)) {
            var i = 0;
            console.log('inchildren', s.children);
            if (s.children.length > 0) {
                while (s.children.length > i) {
                    var data = this.CheckId(s.children[i], selectedId);
                    if (data != null) {
                        this.selectedAllNodes.push(s);
                        return data;
                    }
                    i++;
                }
            }
        }
    };
    RoleAddOrEditComponent.prototype.ClosePopup = function () {
        this.treepopup.hide();
    };
    Object.defineProperty(RoleAddOrEditComponent.prototype, "roleId", {
        //getFiles() {
        //  return this.http.get('json')
        //    .toPromise()
        //    .then(res => (<TreeNode[]> JSON.parse(res.toString()).data));
        //}
        get: function () { return this.roleForm.get('roleId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAddOrEditComponent.prototype, "roleName", {
        get: function () { return this.roleForm.get('roleName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAddOrEditComponent.prototype, "addSelect", {
        get: function () { return this.roleForm.get('addSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAddOrEditComponent.prototype, "updateSelect", {
        get: function () { return this.roleForm.get('updateSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAddOrEditComponent.prototype, "deleteSelect", {
        get: function () { return this.roleForm.get('deleteSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAddOrEditComponent.prototype, "readSelect", {
        get: function () { return this.roleForm.get('readSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAddOrEditComponent.prototype, "roleDescription", {
        get: function () { return this.roleForm.get('roleDescription'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAddOrEditComponent.prototype, "roleStatusId", {
        get: function () { return this.roleForm.get('roleStatusId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAddOrEditComponent.prototype, "userType", {
        get: function () { return this.roleForm.get('userType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAddOrEditComponent.prototype, "reportto", {
        get: function () { return this.roleForm.get('reportto'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAddOrEditComponent.prototype, "reporttoid", {
        get: function () { return this.roleForm.get('reporttoid'); },
        enumerable: true,
        configurable: true
    });
    RoleAddOrEditComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: _role_service__WEBPACK_IMPORTED_MODULE_5__["RoleService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('treepopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalDirective"])
    ], RoleAddOrEditComponent.prototype, "treepopup", void 0);
    RoleAddOrEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-role-add-or-edit',
            template: __importDefault(__webpack_require__(/*! raw-loader!./role-add-or-edit.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/role-add-or-edit.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./role-add-or-edit.component.scss */ "./src/app/views/role/role-add-or-edit.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _role_service__WEBPACK_IMPORTED_MODULE_5__["RoleService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"]])
    ], RoleAddOrEditComponent);
    return RoleAddOrEditComponent;
}());



/***/ }),

/***/ "./src/app/views/role/role-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/role/role-routing.module.ts ***!
  \***************************************************/
/*! exports provided: RoleRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleRoutingModule", function() { return RoleRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _role_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./role.component */ "./src/app/views/role/role.component.ts");
/* harmony import */ var _role_add_or_edit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./role-add-or-edit.component */ "./src/app/views/role/role-add-or-edit.component.ts");
/* harmony import */ var _roleedit_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./roleedit.component */ "./src/app/views/role/roleedit.component.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../auth/auth.guard */ "./src/app/auth/auth.guard.ts");
/* harmony import */ var _role_view_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./role-view.component */ "./src/app/views/role/role-view.component.ts");
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
    { path: '', component: _role_component__WEBPACK_IMPORTED_MODULE_2__["RoleComponent"], data: { title: 'List Role' } },
    { path: 'addrole', component: _roleedit_component__WEBPACK_IMPORTED_MODULE_4__["RoleeditComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'RolesAdd' } },
    { path: 'editrole/:id', component: _roleedit_component__WEBPACK_IMPORTED_MODULE_4__["RoleeditComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'RolesUpdate' } },
    { path: 'editrole123/:id', component: _role_add_or_edit_component__WEBPACK_IMPORTED_MODULE_3__["RoleAddOrEditComponent"] },
    { path: 'editrole123', component: _role_add_or_edit_component__WEBPACK_IMPORTED_MODULE_3__["RoleAddOrEditComponent"] },
    { path: 'view/:id', component: _role_view_component__WEBPACK_IMPORTED_MODULE_6__["RoleViewComponent"] }
];
var RoleRoutingModule = /** @class */ (function () {
    function RoleRoutingModule() {
    }
    RoleRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], RoleRoutingModule);
    return RoleRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/role/role-view.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/views/role/role-view.component.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JvbGUvcm9sZS12aWV3LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/role/role-view.component.ts":
/*!***************************************************!*\
  !*** ./src/app/views/role/role-view.component.ts ***!
  \***************************************************/
/*! exports provided: RoleViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleViewComponent", function() { return RoleViewComponent; });
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

var RoleViewComponent = /** @class */ (function () {
    function RoleViewComponent() {
    }
    RoleViewComponent.prototype.ngOnInit = function () {
    };
    RoleViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-role-view',
            template: __importDefault(__webpack_require__(/*! raw-loader!./role-view.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/role-view.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./role-view.component.scss */ "./src/app/views/role/role-view.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], RoleViewComponent);
    return RoleViewComponent;
}());



/***/ }),

/***/ "./src/app/views/role/role.component.scss":
/*!************************************************!*\
  !*** ./src/app/views/role/role.component.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JvbGUvcm9sZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/role/role.component.ts":
/*!**********************************************!*\
  !*** ./src/app/views/role/role.component.ts ***!
  \**********************************************/
/*! exports provided: RoleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleComponent", function() { return RoleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _role_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./role.service */ "./src/app/views/role/role.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _userlistingpopup_userlistingpopup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./userlistingpopup/userlistingpopup.component */ "./src/app/views/role/userlistingpopup/userlistingpopup.component.ts");
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









var RoleComponent = /** @class */ (function () {
    function RoleComponent(roleService, commonService, router, dialogService, activeRoute, toaster) {
        var _this = this;
        this.roleService = roleService;
        this.commonService = commonService;
        this.router = router;
        this.dialogService = dialogService;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.loadSave = false;
        this.id = "";
        this.loading = false;
        //modulePermission: ModuleList;
        this.sortDir = 'desc';
        this.sortColumn = 'RoleCreatedDate';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.deleteId = '';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["SelectionType"];
        this.searchTxt = '';
        this.selected = [];
        this.pageNumber = 0;
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        console.log('    this.modulePermission', this.modulePermission);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'ROLESADD'; });
        console.log('    this.modulePermission', this.modulePermission);
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'ROLESUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'ROLESDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
        // console.log("moduleCode", moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    RoleComponent.prototype.ngOnInit = function () {
        this.pageNumber = 0;
        this.pageSizeValue = 15;
        this.getPageSizes();
        this.search();
        this.refresh();
        this.getRoleDropDown();
    };
    RoleComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    Object.defineProperty(RoleComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    RoleComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    RoleComponent.prototype.getRoleDropDown = function () {
        var _this = this;
        this.commonService.getMasterItemsList("manageuser_usertype_role").subscribe(function (response) {
            _this.roledata = _this.commonService.masters;
        });
    };
    RoleComponent.prototype.onSort = function ($event) {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.roleService.getRoleList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.roleService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    RoleComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.roleService.getRoleList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.roleService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    RoleComponent.prototype.setPage = function ($event) {
        this.pageNumber = $event.page - 1;
        this.search();
    };
    RoleComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.roleService.getRoleList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.roleService.pagedData;
            _this.offset = _this.pageNumber + 1;
            _this.selected = [];
            _this.deleteId = null;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    RoleComponent.prototype.reset = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.table.sorts = [];
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'desc';
        this.masterNameId = "undefined";
        this.clearDrop.clearModel();
        this.sortColumn = 'RoleCreatedDate';
        this.pageSizeValue = 15;
        this.roleService.getRoleList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.roleService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    RoleComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loading = true;
        this.roleService.getRoleList(this.listFilter, this.masterNameId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.roleService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    RoleComponent.prototype.restUserTypeddl = function () {
        this.masterNameId = 'undefined';
    };
    RoleComponent.prototype.SetUserTypeValue = function (masternameId) {
        this.masterNameId = masternameId;
    };
    RoleComponent.prototype.DeleteRole = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Role  \"" + row.RoleName + "\"?";
        this.dialogService.confirm('Delete Role', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.roleService.DeleteRole(row.RoleId).subscribe(function (r) {
                    _this.toaster.success("Role \"" + row.RoleName + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    RoleComponent.prototype.disable = function (row) {
        var _this = this;
        var message = "Are you sure you want to disable role  \"" + row.RoleName + "\"?";
        this.dialogService.confirm('Disable Role', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.roleService.setRoleStatus(row.RoleId, row.RoleStatusId).subscribe(function (r) {
                    _this.toaster.success("\"" + row.RoleName + "\" has been disabled  successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    RoleComponent.prototype.enable = function (row) {
        var _this = this;
        var message = "Are you sure you want to enable role  \"" + row.RoleName + "\"?";
        this.dialogService.confirm('Enable Role', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.roleService.setRoleStatus(row.RoleId, row.RoleStatusId).subscribe(function (r) {
                    _this.toaster.success("\"" + row.RoleName + "\" has been enabled  successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    RoleComponent.prototype.ApplyAdvanceFilter = function (e) {
    };
    RoleComponent.prototype.GetcustomViewid = function (e) {
    };
    RoleComponent.prototype.ShowUsersListPopup = function ($event) {
        this.ServiceUsersListPopup.show($event);
    };
    RoleComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        debugger;
        if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].RoleIDAuto.toString() + ",";
            }
        }
        else {
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].RoleIDAuto.toString() + ",";
            }
        }
    };
    RoleComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete selected role(s)?";
            this.dialogService.confirm('DELETE ROLES(S)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.roleService.DeleteAllRole(_this.deleteId, "tblroles").subscribe(function (r) {
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
    RoleComponent.ctorParameters = function () { return [
        { type: _role_service__WEBPACK_IMPORTED_MODULE_2__["RoleService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ServiceUsersListPopUp', { static: false }),
        __metadata("design:type", _userlistingpopup_userlistingpopup_component__WEBPACK_IMPORTED_MODULE_8__["UserListingPopUpComponent"])
    ], RoleComponent.prototype, "ServiceUsersListPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearDrp', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], RoleComponent.prototype, "clearDrop", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"])
    ], RoleComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], RoleComponent.prototype, "offset", void 0);
    RoleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-role',
            template: __importDefault(__webpack_require__(/*! raw-loader!./role.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/role.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./role.component.scss */ "./src/app/views/role/role.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_role_service__WEBPACK_IMPORTED_MODULE_2__["RoleService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], RoleComponent);
    return RoleComponent;
}());



/***/ }),

/***/ "./src/app/views/role/role.module.ts":
/*!*******************************************!*\
  !*** ./src/app/views/role/role.module.ts ***!
  \*******************************************/
/*! exports provided: RoleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleModule", function() { return RoleModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _role_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./role.component */ "./src/app/views/role/role.component.ts");
/* harmony import */ var _role_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./role.service */ "./src/app/views/role/role.service.ts");
/* harmony import */ var _role_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./role-routing.module */ "./src/app/views/role/role-routing.module.ts");
/* harmony import */ var _role_add_or_edit_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./role-add-or-edit.component */ "./src/app/views/role/role-add-or-edit.component.ts");
/* harmony import */ var primeng_tree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/tree */ "./node_modules/primeng/tree.js");
/* harmony import */ var primeng_tree__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_tree__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _roleedit_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./roleedit.component */ "./src/app/views/role/roleedit.component.ts");
/* harmony import */ var _role_view_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./role-view.component */ "./src/app/views/role/role-view.component.ts");
/* harmony import */ var _userlistingpopup_userlistingpopup_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./userlistingpopup/userlistingpopup.component */ "./src/app/views/role/userlistingpopup/userlistingpopup.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};












var RoleModule = /** @class */ (function () {
    function RoleModule() {
    }
    RoleModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _role_component__WEBPACK_IMPORTED_MODULE_3__["RoleComponent"],
                _role_add_or_edit_component__WEBPACK_IMPORTED_MODULE_6__["RoleAddOrEditComponent"],
                _roleedit_component__WEBPACK_IMPORTED_MODULE_9__["RoleeditComponent"],
                _role_view_component__WEBPACK_IMPORTED_MODULE_10__["RoleViewComponent"],
                _userlistingpopup_userlistingpopup_component__WEBPACK_IMPORTED_MODULE_11__["UserListingPopUpComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _role_routing_module__WEBPACK_IMPORTED_MODULE_5__["RoleRoutingModule"],
                primeng_tree__WEBPACK_IMPORTED_MODULE_7__["TreeModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]
            ],
            providers: [
                _role_service__WEBPACK_IMPORTED_MODULE_4__["RoleService"]
            ]
        })
    ], RoleModule);
    return RoleModule;
}());



/***/ }),

/***/ "./src/app/views/role/role.service.ts":
/*!********************************************!*\
  !*** ./src/app/views/role/role.service.ts ***!
  \********************************************/
/*! exports provided: RoleService, ParentModules, RoleModule, Role, saveRoleModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleService", function() { return RoleService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParentModules", function() { return ParentModules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleModule", function() { return RoleModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return Role; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveRoleModel", function() { return saveRoleModel; });
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




var RoleService = /** @class */ (function () {
    function RoleService(http) {
        this.http = http;
        this.dataUrl = 'assets';
        this.roles = [];
        this.roleModules = [];
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
        this.roleModuleUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl + "Role";
    }
    RoleService.prototype.getRoleList = function (RoleName, masternameId, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Role/GetRoleList?rolename=" + RoleName + "&masternameId=" + masternameId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    RoleService.prototype.setRoleStatus = function (roleId, status) {
        return this.http.get(this.baseUri + ("Role/ChangedRoleStatusById?roleId=" + roleId + "&roleStatus=" + status));
    };
    RoleService.prototype.DeleteAllRole = function (deleteId, tableName) {
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName));
    };
    RoleService.prototype.DeleteRole = function (roleId) {
        return this.http.get(this.baseUri + ("Role/DeletedRoleById?roleId=" + roleId));
    };
    RoleService.prototype.checkRoleNameIsExist = function (pid, pname) {
        return this.http.get(this.roleModuleUri + "/CheckRoleNameIsExist?id=" + pid + "&name=" + pname)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    RoleService.prototype.getRoleModules = function (id) {
        var _this = this;
        // console.log(`${this.roleModuleUri}/GetRoleModule?userTypeId=${id}`);
        return this.http.get(this.roleModuleUri + "/GetRoleModule?userTypeId=" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.roleModules = response;
            return true;
        }));
    };
    RoleService.prototype.get = function (filename) {
        return this.http.get(this.dataUrl + "/" + filename);
    };
    RoleService.prototype.getRoleById = function (id) {
        return this.http.get(this.roleModuleUri + "/GetRoleById?id=" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) { return console.log('Role DAta by Id', data); }));
    };
    RoleService.prototype.GetRoleNameForTree = function (id) {
        return this.http.get(this.roleModuleUri + "/GetRoleNameForTree?id=" + id);
    };
    RoleService.prototype.GetRoleDataByid = function (id) {
        return this.http.get(this.roleModuleUri + "/GetRoleDataByid?id=" + id);
    };
    RoleService.prototype.SaveRoledata = function (json) {
        return this.http.post(this.roleModuleUri + "/SaveRole?json=" + json, null);
    };
    RoleService.prototype.getRoletabdata = function (id, roleid) {
        return this.http.get(this.roleModuleUri + "/getRoletabdata?ROLEID=" + roleid + "&usertypeid=" + id);
    };
    RoleService.prototype.GetServiceUsers = function (searchtxt, sortColumn, sortDir, pageIndex, pageSize, roleId) {
        return this.http.get(this.baseUri + "Role/GetUserList?searchtxt=" + searchtxt + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&roleId=" + roleId);
    };
    RoleService.prototype.saveRole = function (role) {
        console.log("RolePOST", role);
        return this.http.post(this.roleModuleUri, role);
    };
    RoleService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    RoleService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], RoleService);
    return RoleService;
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

var RoleModule = /** @class */ (function () {
    function RoleModule() {
        this.roleModuleId = '';
        this.roleModuleModuleID = '';
        this.roleModuleRoleID = '';
        this.moduleDisplayOrder = 0;
        this.roleModuleName = '';
        this.roleModuleModuleName = '';
        this.roleModuleAddFlag = false;
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
    return RoleModule;
}());

var Role = /** @class */ (function () {
    function Role() {
        this.roleId = '';
        this.roleName = '';
        this.reportto = '';
        this.reporttoid = '';
        this.roleDescription = '';
        this.isRoleAssined = false;
        this.isDisabled = false;
        this.roleModuleModel = [];
    }
    return Role;
}());

var saveRoleModel = /** @class */ (function () {
    function saveRoleModel() {
        this.roleId = 0,
            this.userTypeId = '',
            this.roleStatusId = '',
            this.roleName = '',
            this.reporttoid = '';
        this.roleDescription = '',
            this.privilegesIds = '';
    }
    return saveRoleModel;
}());



/***/ }),

/***/ "./src/app/views/role/roleedit.component.scss":
/*!****************************************************!*\
  !*** ./src/app/views/role/roleedit.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JvbGUvcm9sZWVkaXQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/role/roleedit.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/role/roleedit.component.ts ***!
  \**************************************************/
/*! exports provided: RoleeditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleeditComponent", function() { return RoleeditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _role_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./role.service */ "./src/app/views/role/role.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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









var RoleeditComponent = /** @class */ (function () {
    //templateObjects: Template[] = new Array();
    //parentModule1: ParentModules;
    function RoleeditComponent(commonService, fb, roleService, dialogService, router, toastr, route, http) {
        var _this = this;
        this.commonService = commonService;
        this.fb = fb;
        this.roleService = roleService;
        this.dialogService = dialogService;
        this.router = router;
        this.toastr = toastr;
        this.route = route;
        this.http = http;
        this.loadSave = false;
        this.read = false;
        this.loadRoleModules = false;
        this.role = new _role_service__WEBPACK_IMPORTED_MODULE_3__["Role"]();
        this.saveRoleModel = new _role_service__WEBPACK_IMPORTED_MODULE_3__["saveRoleModel"]();
        this.selectUpdateEnable = false;
        this.roleModulesData = [];
        this.isDisabled = '';
        this.addOrUpdatePermission = false;
        // modulePermission: ModuleList;
        this.parentModule = [];
        this.reporttoname = '';
        this.selected = [];
        this.radiobuttondata = [];
        this.tabshow = false;
        this.radiobutton = '';
        this.privilageid = '';
        this.privilageidArray = [];
        this.privilageList = [];
        this.modulePermission = [];
        this.lstWidgets = [];
        this.isLoanHomi = false;
        this.dataUrl = 'assets';
        this.selectedAllNodes = [];
        var priviledgeCode = this.route.snapshot.data.privilegeCode;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase(); });
        if (add == undefined) {
            this.addOrUpdatePermission = false;
        }
        else {
            this.addOrUpdatePermission = true;
        }
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            console.log('userdetail', userdetail);
            if (userdetail.companyType.toUpperCase() == 'COMPANYTYPEFINANCIALINSTITUTE') {
                _this.isLoanHomi = true;
            }
        });
        this.commonService.getMasterItemsList("manageuser_usertype_role").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters; //.filter(x => x.masterName == "UserType");
            console.log('lstUserType', _this.lstUserType);
        });
    }
    RoleeditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.getStatuses();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.rolegetid = id;
            if (id) {
                _this.loadSave = true;
                //this.getRole(id);
                _this.GetRoleDataByid(id);
                //
            }
            else {
                _this.pageTitle = 'Add Role';
                // this.getRoleModules(null);
            }
        });
        //this.getFiles().then(files => {  
        //  this.files1 = files;
        //});
        //this.roleService
        //   .get('json.json')
        //   .subscribe((response: any) => {
        //     this.files1 = response.data
        //   });   
        this.GetRoleNameForTree(this.rolegetid);
    };
    RoleeditComponent.prototype.selectUser = function (event) {
        this.getRoletabdata(event.value);
    };
    RoleeditComponent.prototype.getStatuses = function () {
        var _this = this;
        this.commonService.getMasterItemsList("role_Status").subscribe(function (response) {
            _this.statuses = _this.commonService.masters;
        });
    };
    RoleeditComponent.prototype.cancelForm = function () {
        this.router.navigateByUrl("/role");
    };
    //getRole(id: string) {
    //  this.addOrUpdatePermission = this.;
    //  this.roleService.getRoleById(id)
    //    .subscribe(
    //      (role: Role) => {
    //        this.displayRole(role);
    //        this.loadSave = false;
    //      }, (error: any) => {
    //        this.errorMessage = <any>error;
    //        this.loadSave = false;
    //      });
    //}
    //displayRole(role: Role): void {
    //  if (this.roleForm) {
    //    this.roleForm.reset();
    //    this.parentModule.length = 0;
    //  }
    //  this.role = role;
    //  console.log('role', this.role);
    //  // console.log("RoleUserT", this.role)
    //  if (this.role.roleId === '') {
    //    this.pageTitle = 'Add Role';
    //  }
    //  else {
    //    this.pageTitle = `Edit Role: ${this.role.roleName}`;
    //  }
    //  this.userType.disable();
    //  this.reportid = this.role.reporttoid;
    //  this.reportname = this.role.reportto
    //  // Update the data on the form
    //  this.roleForm.patchValue({
    //    reportto: this.role.reportto,
    //    roleId: this.role.roleId,
    //    roleName: this.role.roleName,
    //    userType: this.role.userType.toString(),
    //    roleDescription: this.role.roleDescription,
    //    roleStatusId: this.role.roleStatusId.toString(),
    //  });
    //  // console.log("RoleModuleFor", this.role.roleModuleModel);
    //  this.role.roleModuleModel.forEach(m => {
    //    if (m.isManageable === true) {
    //      //alert(1);
    //      this.roleModules.push(this.buildRoleModules(m));
    //    }
    //    else {
    //      //Parent Modules
    //      this.parentModule.push(new ParentModules(m.roleModuleModuleID, m.roleModuleModuleName));
    //    }
    //  });
    //  if (this.role.isRoleAssined) {
    //    this.roleForm.get('roleStatusId').disable();
    //  }
    //}
    //buildRoleModules(roleModule: RoleModule): FormGroup {
    //  console.log("RoleModule1", roleModule);
    //  return this.fb.group({
    //    roleModuleId: roleModule.roleModuleId,
    //    roleModuleRoleID: roleModule.roleModuleRoleID,
    //    roleModuleModuleID: roleModule.roleModuleModuleID,
    //    roleModuleModuleName: roleModule.roleModuleModuleName,
    //    roleModuleName: roleModule.roleModuleName,
    //    moduleDisplayOrder: roleModule.moduleDisplayOrder,
    //    roleModuleNotificationFlag: roleModule.roleModuleNotificationFlag,
    //    roleModuleEmailFlag: roleModule.roleModuleEmailFlag,
    //    roleModuleAddFlag: roleModule.roleModuleAddFlag,
    //    roleModuleUpdateFlag: roleModule.roleModuleUpdateFlag,
    //    roleModuleSMSFlag: roleModule.roleModuleSMSFlag,
    //    roleModuleReadFlag: roleModule.roleModuleReadFlag,
    //    roleModuleDeleteFlag: roleModule.roleModuleDeleteFlag,
    //    isEnableAddPermission: roleModule.isEnableAddPermission,
    //    isEnableReadPermission: roleModule.isEnableReadPermission,
    //    isEnableEditPermission: roleModule.isEnableEditPermission,
    //    isEnableDeletePermission: roleModule.isEnableDeletePermission,
    //    isManageable: roleModule.isManageable,
    //    moduleParentModuleId: roleModule.moduleParentModuleId,
    //    roleModuleIsView: roleModule.roleModuleIsView,
    //    roleModuleIsViewShared: roleModule.roleModuleIsViewShared,
    //    roleModuleIsViewOwn: roleModule.roleModuleIsViewOwn,
    //    roleModuleIsViewAll: roleModule.roleModuleIsViewAll
    //  });
    //}
    //getRoleModules(userId) {
    //  //kate
    //  this.loadSave = true;
    //  this.parentModule = [];
    //  this.loadRoleModules = true; // console.log("inn")
    //  this.roleService.getRoleModules(userId).subscribe((response: any) => {
    //    //// console.log("reole  response", response)
    //    this.roleModulesData = response;
    //    if (response) {
    //      this.roleService.roleModules.forEach(m => {
    //        //  this.roleModules.push(this.buildRoleModules(m));
    //        //// console.log("RoleModule",this.roleService.roleModules);
    //        if (m.isManageable === true) {
    //          this.roleModules.push(this.buildRoleModules(m));
    //        }
    //        else {
    //          //Parent Modules
    //          // let parentModule1: ParentModules;
    //          // parentModule1.roleModuleId = m.roleModuleId;
    //          //parentModule1.roleModuleModuleName = m.roleModuleModuleName;
    //          this.parentModule.push(new ParentModules(m.roleModuleModuleID, m.roleModuleModuleName));
    //          //this.parentModule.push(m.roleModuleId);
    //          //this.parentModule. = m.roleModuleModuleName;
    //          //this.parentModule.push(parentModule);
    //        }
    //      });
    //      // console.log("RoleMiduleIsManageble", this.roleModules);
    //      // console.log("RoleMiduleIsManagebleFalse", this.parentModule);
    //      this.loadSave = false;
    //      this.loadRoleModules = false;
    //    }
    //  }, error => {
    //    this.loadRoleModules = false;
    //    this.loadSave = false;
    //  })
    //  // console.log("this.parentModule", this.parentModule);
    //  var d = this.parentModule.filter(x => x.roleModuleId === "442f8d12-92b0-42fd-aa0b-a71514d54d9f")
    //  // console.log(d);
    //}
    RoleeditComponent.prototype.save = function () {
        var _this = this;
        if (this.roleForm.valid) {
            this.roleService.checkRoleNameIsExist(this.roleForm.controls.roleId.value, this.roleForm.controls.roleName.value).subscribe(function (m) {
                if (!m) {
                    var dataas = void 0;
                    dataas = _this.radiobuttondata.map(function (x) { return x.Id; }).join(",");
                    console.log(dataas);
                    if (dataas != '') {
                        _this.privilageid = _this.privilageid.concat(',');
                        console.log(_this.privilageid);
                        _this.privilageid = _this.privilageid.concat(dataas);
                    }
                    console.log(_this.privilageid);
                    console.log('this.roleForm.value', _this.roleForm.value);
                    if (_this.privilageid != '' && _this.privilageid != undefined) {
                        _this.saveRoleModel.userTypeId = _this.roleForm.value.userType,
                            _this.saveRoleModel.roleId = _this.roleautoid == null ? 0 : _this.roleautoid,
                            _this.saveRoleModel.roleStatusId = _this.roleForm.value.roleStatusId,
                            _this.saveRoleModel.roleName = _this.roleForm.value.roleName;
                        _this.saveRoleModel.reporttoid = _this.roleForm.value.reporttoid;
                        _this.saveRoleModel.roleDescription = _this.roleForm.value.roleDescription;
                        _this.saveRoleModel.privilegesIds = _this.privilageid;
                        var data = JSON.stringify(_this.saveRoleModel);
                        console.log('data', data);
                        _this.roleService.SaveRoledata(data).subscribe(function (result) {
                            var resultdata = JSON.parse(result);
                            console.log('dataresult', resultdata);
                            if (resultdata.MSG == 'SUCCESS') {
                                _this.toastr.success('Role has been added successfully.');
                                _this.router.navigateByUrl("/role");
                            }
                            else if (resultdata.MSG == 'UPDATE_SUCCESS') {
                                _this.toastr.success('Role has been updated successfully.');
                                _this.router.navigateByUrl("/role");
                            }
                            else {
                                _this.toastr.error('Error!', 'Unable to save record.');
                            }
                        });
                    }
                    else {
                        _this.dialogService.confirm("Role Access", 'Please select atleast one Access Level.', 'Ok', 'Cancel', false).subscribe(function (confirmed) {
                        });
                    }
                }
                else {
                    _this.dialogService.confirm("Add Role", "'" + _this.roleForm.controls.roleName.value + "' role name is already exist.", 'Ok', 'Cancel', false).subscribe(function (confirmed) {
                    });
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.roleForm);
        }
    };
    //console.log('this.roleForm.value', this.roleForm.value);
    //   return;    
    //if (this.roleForm.valid) {
    //  var selected = this.roleModules.controls.filter(m => m.get('roleModuleReadFlag').value === true
    //    || m.get('roleModuleAddFlag').value === true
    //    || m.get('roleModuleUpdateFlag').value === true
    //    || m.get('roleModuleDeleteFlag').value === true);
    //  this.loadSave = true;
    //  this.roleService.checkRoleNameIsExist(this.roleForm.controls.roleId.value, this.roleForm.controls.roleName.value).subscribe(m => {
    //    if (!m) {  
    //      if (selected.length != 0) {
    //        this.roleService.saveRole(this.roleForm.value).subscribe((result: any) => {
    //          if (result.statusCode == 200) {
    //            this.toastr.success(result.responseMessage);
    //            this.router.navigateByUrl("/role");
    //            setTimeout(() => { this.loadSave = false; }, 3000);
    //          }
    //          else {
    //            this.loadSave = false;
    //            this.toastr.error('Error!', 'Unable to save record.');
    //          }
    //        })
    //      }
    //      else {
    //        this.loadSave = false;
    //        this.dialogService.confirm("Role Access", 'Please select atleast one Access Level.', 'Ok', 'Cancel', false).subscribe(confirmed => {
    //        });
    //      }
    //    } else {
    //      this.loadSave = false;
    //      this.dialogService.confirm("Add Role", `'${this.roleForm.controls.roleName.value}' role name is already exist.`, 'Ok', 'Cancel', false).subscribe(confirmed => {
    //      });
    //    }
    //  });
    //}
    //else {
    //  this.commonService.validateAllFormFields(this.roleForm);
    //}
    //enableSelectAll($event) {
    //  if ($event.target.value === 'add') {
    //    this.roleModules.controls.forEach(obj => {
    //      obj.patchValue({
    //        roleModuleAddFlag: $event.target.checked
    //      });
    //    });
    //    //Start Read Role
    //    this.roleModules.controls.forEach(obj => {
    //      if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
    //        this.roleForm.patchValue({
    //          readSelect: true
    //        });
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      } else if ($event.target.checked == true) {
    //        this.roleForm.patchValue({
    //          readSelect: true
    //        });
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      }
    //    });
    //    //End Read Role
    //  }
    //  else if ($event.target.value === 'read') {
    //    if ($event.target.checked) {
    //      this.roleModules.controls.forEach(obj => {
    //        obj.patchValue({
    //          roleModuleReadFlag: $event.target.checked,
    //          roleModuleIsView: 'all'
    //        });
    //      });
    //    }
    //    else {
    //      this.roleModules.controls.forEach(obj => {
    //        obj.patchValue({
    //          //roleModuleReadFlag: $event.target.checked,
    //          roleModuleIsView: ''
    //        });
    //      });
    //    }
    //    debugger
    //    if (!$event.target.checked) {
    //      this.roleModules.controls.forEach(obj => {
    //        obj.patchValue({
    //          roleModuleAddFlag: false,
    //          roleModuleUpdateFlag: false,
    //          roleModuleDeleteFlag: false
    //        });
    //      });
    //      this.roleForm.patchValue({
    //        addSelect: false,
    //        deleteSelect: false,
    //        updateSelect: false,
    //        readSelect: false
    //      });
    //    }
    //    else {
    //      this.roleModules.controls.forEach(obj => {
    //        obj.patchValue({
    //          roleModuleReadFlag: $event.target.checked,
    //          roleModuleIsView: 'all'
    //        });
    //      });
    //    }
    //  }
    //  else if ($event.target.value === 'update') {
    //    this.roleModules.controls.forEach(obj => {
    //      obj.patchValue({
    //        roleModuleUpdateFlag: $event.target.checked
    //      });
    //    });
    //    //Start Read Role
    //    this.roleModules.controls.forEach(obj => {
    //      if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
    //        this.roleForm.patchValue({
    //          readSelect: true
    //        });
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          // roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      } else if ($event.target.checked == true) {
    //        this.roleForm.patchValue({
    //          readSelect: true
    //        });
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          //roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      }
    //    });
    //    //End Read Role
    //  }
    //  else if ($event.target.value === 'delete') {
    //    this.roleModules.controls.forEach(obj => {
    //      obj.patchValue({
    //        roleModuleDeleteFlag: $event.target.checked
    //      });
    //    });
    //    //Start Read Role
    //    this.roleModules.controls.forEach(obj => {
    //      if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleUpdateFlag').value == true)) {
    //        this.roleForm.patchValue({
    //          readSelect: true
    //        });
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      } else if ($event.target.checked == true) {
    //        this.roleForm.patchValue({
    //          readSelect: true
    //        });
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      }
    //    });
    //    //End Read Role
    //  }
    //  this.selectUpdateEnable = true;
    //}
    //enableTopHeader(type, control, $event) {      
    //  if (type === 'add') {
    //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {
    //      obj.patchValue({
    //        roleModuleAddFlag: $event.target.checked
    //      });
    //    });
    //    this.roleForm.patchValue({
    //      addSelect: !this.roleModules.controls.some(m => m.get('roleModuleAddFlag').value === false)
    //    });
    //    //Start Read Role
    //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {
    //      if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      }
    //      else if ($event.target.checked == true) {
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      }
    //    });
    //    //End Read Role
    //  }
    //  else if (type === 'read') {
    //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {
    //      obj.patchValue({
    //        roleModuleReadFlag: $event.target.checked
    //      });
    //      if (!$event.target.checked) {
    //        obj.patchValue({
    //          roleModuleAddFlag: false,
    //          roleModuleDeleteFlag: false,
    //          roleModuleUpdateFlag: false
    //        });
    //      }
    //    });
    //    this.roleForm.patchValue({
    //      readSelect: !this.roleModules.controls.some(m => m.get('roleModuleReadFlag').value === false)
    //    });
    //    if (!$event.target.checked) {
    //      this.roleForm.patchValue({
    //        addSelect: false,
    //        updateSelect: false,
    //        deleteSelect: false
    //      });
    //    }
    //  } else if (type === 'update') {
    //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {
    //      obj.patchValue({
    //        roleModuleUpdateFlag: $event.target.checked
    //      });
    //    });
    //    this.roleForm.patchValue({
    //      updateSelect: !this.roleModules.controls.some(m => m.get('roleModuleUpdateFlag').value === false)
    //    });
    //    //Start Read Role
    //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {
    //      if (($event.target.checked == false) && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      }
    //      else if ($event.target.checked == true) {
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      }
    //    });
    //    //End Read Role
    //  } else if (type === 'delete') {
    //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {
    //      obj.patchValue({
    //        roleModuleDeleteFlag: $event.target.checked
    //      });
    //    });
    //    this.roleForm.patchValue({
    //      deleteSelect: !this.roleModules.controls.some(m => m.get('roleModuleDeleteFlag').value === false)
    //    });
    //    //Start Read Role
    //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {
    //      if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleAddFlag').value == true)) {
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      }
    //      else if ($event.target.checked == true) {
    //        obj.patchValue({
    //          roleModuleReadFlag: true,
    //          roleModuleIsView: 'all'
    //        });
    //      }
    //    });
    //    //End Read Role
    //  }
    //}
    //get roleModules(): FormArray {
    //  return <FormArray>this.roleForm.get('roleModules');
    //}
    RoleeditComponent.prototype.GetRoleNameForTree = function (id) {
        var _this = this;
        this.roleService.GetRoleNameForTree(id).subscribe(function (result) {
            console.log('result', result);
            _this.files2 = JSON.parse(result).data;
            console.log('this.files1', _this.files2);
        });
    };
    RoleeditComponent.prototype.nodeSelect = function (e) {
        console.log('sadasdf', e);
        this.reporttoname = e.node.label;
        this.reporttoidselected = e.node.data;
        this.roleForm.get("reportto").setValue(this.reporttoname);
        this.roleForm.get("reporttoid").setValue(this.reporttoidselected);
        console.log('this.reporttoname', this.reporttoname);
        console.log('this.reporttoid', this.reporttoid);
        this.treepopup.hide();
    };
    RoleeditComponent.prototype.initForm = function () {
        this.roleForm = this.fb.group({
            'roleId': [this.role.roleId, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            'roleName': [this.role.roleName, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(50)]],
            'roleDescription': [this.role.roleDescription, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(200)],
            'roleStatusId': [this.role.roleStatusId, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            //'addSelect': false,
            //'updateSelect': false,
            //'deleteSelect': false,
            //'readSelect': false,
            'userType': [this.role.userType, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            // roleModules: this.fb.array([], Validators.required),
            reportto: [''],
            reporttoid: [''],
        });
    };
    RoleeditComponent.prototype.openPopup = function () {
        var _this = this;
        //this.GetRoleNameForTree();
        this.treepopup.show();
        this.files2.forEach(function (s) {
            console.log('report', _this.reportid);
            var data = _this.CheckId(s, _this.reportid.toString());
            if (data != null) {
                _this.selectedAllNodes.forEach(function (node) {
                    node.expanded = true;
                });
            }
        });
    };
    RoleeditComponent.prototype.CheckId = function (s, selectedId) {
        console.log('children', s.children);
        if (s.data.toString() === selectedId) {
            this.selectedAllNodes.push(s);
            return s;
        }
        else if ((s.children != null && s.children.length != undefined)) {
            var i = 0;
            console.log('inchildren', s.children);
            if (s.children.length > 0) {
                while (s.children.length > i) {
                    var data = this.CheckId(s.children[i], selectedId);
                    if (data != null) {
                        this.selectedAllNodes.push(s);
                        return data;
                    }
                    i++;
                }
            }
        }
    };
    RoleeditComponent.prototype.ClosePopup = function () {
        this.treepopup.hide();
    };
    RoleeditComponent.prototype.getRoletabdata = function (usertypeid, id) {
        var _this = this;
        if (id === void 0) { id = null; }
        this.loadSave = true;
        this.tabshow = true;
        setTimeout(function () {
            _this.roleService.getRoletabdata(usertypeid, id).subscribe(function (result) {
                _this.tabdata = result;
                _this.tabdata = JSON.parse(_this.tabdata);
                console.log("tabdata", _this.tabdata);
                if (_this.tabdata != null) {
                    _this.tabdata.forEach(function (i) {
                        i.SUB_MODULES.forEach(function (s) {
                            i["parentIsSelected"] = false;
                            s.PRIVILEGE_LISTS.forEach(function (d) {
                                if (d.IS_SUB_CHILD === true && d.IS_Selected === 1) {
                                    _this.radiobuttondata.push({ Id: d.PRIVILEGE_ID, GroupId: d.SUB_CHILD_GROUP });
                                }
                                else if (d.IS_SUB_CHILD === false && d.IS_Selected === 1) {
                                    //debugger;
                                    _this.privilageidArray.push({ Id: d.PRIVILEGE_ID });
                                    i.parentIsSelected = true;
                                    //this.parentIsSelected = 1;
                                }
                                if (d.IS_SUB_CHILD === false && d.IS_Selected === 0) {
                                    i.parentIsSelected = false;
                                }
                            });
                        });
                    });
                }
                if (_this.privilageidArray.length > 0) {
                    _this.privilageid = _this.privilageidArray.map(function (x) { return x.Id; }).join(',');
                    _this.selected = _this.privilageid.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                }
                _this.loadSave = false;
                //console.log("radiobutton365656565", this.radiobuttondata);
                //console.log("checkbox12", this.privilageidArray);
                //console.log("checkbox", this.privilageid);
            });
        }, 2000);
    };
    RoleeditComponent.prototype.getPriviledgesByType = function (list, type) {
        return list.filter(function (item) { return item.PRIVILEGE_TYPE == type; });
    };
    RoleeditComponent.prototype.getUniquePriviledgesType = function (list) {
        return list.map(function (item) { return item.PRIVILEGE_TYPE; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; });
    };
    RoleeditComponent.prototype.onChangeMainCheckbox = function (event, e, s) {
        var _this = this;
        console.log(s);
        var checked = event.target.checked;
        var data = [];
        data = s.PRIVILEGE_LISTS;
        var radio = data.find(function (s) { return s.DEFAULT_VIEW != 0 && s.PRIVILEGE_TYPE.toUpperCase() === 'URL'; });
        var parentid = data.find(function (s) { return s.PRIVILEGE_TYPE.toUpperCase() === 'URL' && s.PARENT_ID === 0; });
        if (checked) {
            data.forEach(function (s) {
                if (s.IS_Selected != 1 && s.IS_SUB_CHILD === false) {
                    _this.selected.push(s.PRIVILEGE_ID);
                    s.IS_Selected = 1;
                }
            });
            if (radio.IS_Selected != 1) {
                var ind = this.radiobuttondata.findIndex(function (x) { return x.GroupId.toString() == radio.SUB_CHILD_GROUP.toString(); });
                if (ind == -1) {
                    this.radiobuttondata.push({ Id: radio.PRIVILEGE_ID, GroupId: radio.SUB_CHILD_GROUP });
                    radio.IS_Selected = 1;
                }
            }
        }
        else {
            data.forEach(function (s) {
                if (s.IS_Selected === 1 && s.IS_SUB_CHILD === false) {
                    s.IS_Selected = 0;
                    var indexOfList = _this.selected.indexOf(s.PRIVILEGE_ID);
                    if (indexOfList != -1) {
                        _this.selected.splice(indexOfList, 1);
                    }
                }
            });
            data.forEach(function (s) {
                if (s.IS_SUB_CHILD === true) {
                    s.IS_Selected = 0;
                    var radioindlist = _this.radiobuttondata.findIndex(function (x) { return x.GroupId.toString() == s.SUB_CHILD_GROUP.toString(); });
                    if (radioindlist != -1) {
                        _this.radiobuttondata.splice(radioindlist, 1);
                    }
                }
            });
        }
        console.log('selected', this.selected.toString());
        this.privilageid = this.selected.toString();
        console.log('radiobuttondataafter', this.radiobuttondata);
    };
    RoleeditComponent.prototype.onChange = function (Id, event, data, plist) {
        var _this = this;
        var checked = event.target.checked;
        var id = data.PARENT_ID;
        var radio = plist.find(function (s) { return s.DEFAULT_VIEW != 0; });
        console.log('radio', radio);
        console.log('data', data);
        console.log('plist', plist);
        if (checked) {
            this.selected.push(Id);
            data.IS_Selected = 1;
            if (id != 0 && data.PRIVILEGE_TYPE == 'URL') {
                var parent_1 = plist.find(function (s) { return s.PRIVILEGE_ID.toString() === id.toString(); });
                if (parent_1.IS_Selected != 1 && parent_1.PRIVILEGE_TYPE == 'URL') {
                    this.selected.push(parent_1.PRIVILEGE_ID);
                    parent_1.IS_Selected = 1;
                }
            }
            if (radio.IS_Selected != 1 && data.PRIVILEGE_TYPE == 'URL') {
                var ind = this.radiobuttondata.findIndex(function (x) { return x.GroupId.toString() == radio.SUB_CHILD_GROUP.toString(); });
                if (ind == -1) {
                    this.radiobuttondata.push({ Id: radio.PRIVILEGE_ID, GroupId: radio.SUB_CHILD_GROUP });
                    radio.IS_Selected = 1;
                }
            }
        }
        else {
            if (data.PARENT_ID === 0 && data.PRIVILEGE_TYPE == 'URL') {
                var parentdata = [];
                parentdata = plist.filter(function (x) { return x.IS_Selected == 1; });
                console.log('parentdata', parentdata);
                parentdata.forEach(function (s) {
                    s.IS_Selected = 0;
                    var indexOfList = _this.selected.indexOf(s.PRIVILEGE_ID);
                    console.log('indexOfList', indexOfList);
                    if (indexOfList != -1) {
                        _this.selected.splice(indexOfList, 1);
                    }
                    var radioindlist = _this.radiobuttondata.findIndex(function (x) { return x.GroupId.toString() == s.SUB_CHILD_GROUP.toString(); });
                    if (radioindlist != -1) {
                        _this.radiobuttondata.splice(radioindlist, 1);
                    }
                });
            }
            else {
                var index = this.selected.indexOf(Id);
                data.IS_Selected = 0;
                this.selected.splice(index, 1);
            }
        }
        console.log('radiobuttondataafter', this.radiobuttondata);
        this.values = this.selected.toString();
        var count = this.selected.length;
        this.count = count;
        console.log('selected', this.selected.toString());
        this.privilageid = this.selected.toString();
    };
    RoleeditComponent.prototype.check = function (e, data, plist) {
        var parentid = data.PARENT_ID;
        var parent = plist.find(function (s) { return s.PRIVILEGE_ID.toString() === parentid.toString(); });
        if (parent.IS_Selected != 1) {
            parent.IS_Selected = 1;
            this.selected.push(parent.PRIVILEGE_ID);
            this.privilageid = this.selected.toString();
        }
        var ind = this.radiobuttondata.findIndex(function (x) { return x.GroupId == e.target.name; });
        if (ind == -1) {
            this.radiobuttondata.push({ Id: e.target.value, GroupId: e.target.name });
            data.IS_Selected = 1;
        }
        else {
            var id = this.radiobuttondata[ind].Id;
            var changedata = plist.find(function (s) { return s.PRIVILEGE_ID.toString() === id.toString(); });
            changedata.IS_Selected = 0;
            this.radiobuttondata.splice(ind, 1);
            data.IS_Selected = 1;
            this.radiobuttondata.push({ Id: e.target.value, GroupId: e.target.name });
        }
        console.log(this.radiobuttondata);
    };
    RoleeditComponent.prototype.GetRoleDataByid = function (id) {
        var _this = this;
        this.loadSave = true;
        this.roleService.GetRoleDataByid(id).subscribe(function (result) {
            //console.log('result123', JSON.parse(result));
            var resultdata = [];
            resultdata.push(JSON.parse(result));
            _this.roleautoid = resultdata[0].data[0].RoleIDAuto;
            _this.getRoletabdata(resultdata[0].data[0].UserTypeID, resultdata[0].data[0].RoleId);
            _this.reportid = resultdata[0].data[0].ReportTo;
            _this.reportname = resultdata[0].data[0].reporttoname;
            console.log('result123', resultdata[0].data[0]);
            _this.roleForm.patchValue({
                reportto: resultdata[0].data[0].reporttoname,
                roleId: resultdata[0].data[0].RoleId,
                roleName: resultdata[0].data[0].RoleName,
                userType: resultdata[0].data[0].UserTypeID == null ? resultdata[0].data[0].UserTypeID : resultdata[0].data[0].UserTypeID.toString(),
                roleDescription: resultdata[0].data[0].RoleDescription,
                roleStatusId: resultdata[0].data[0].RoleStatusId == null ? resultdata[0].data[0].RoleStatusId : resultdata[0].data[0].RoleStatusId.toString(),
            });
        });
    };
    RoleeditComponent.prototype.isChecked = function (p) {
        if (p.IS_Selected == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(RoleeditComponent.prototype, "roleId", {
        //getFiles() {
        //  return this.http.get('json')
        //    .toPromise()
        //    .then(res => (<TreeNode[]> JSON.parse(res.toString()).data));
        //}        
        get: function () { return this.roleForm.get('roleId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleeditComponent.prototype, "roleName", {
        get: function () { return this.roleForm.get('roleName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleeditComponent.prototype, "addSelect", {
        get: function () { return this.roleForm.get('addSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleeditComponent.prototype, "updateSelect", {
        get: function () { return this.roleForm.get('updateSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleeditComponent.prototype, "deleteSelect", {
        get: function () { return this.roleForm.get('deleteSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleeditComponent.prototype, "readSelect", {
        get: function () { return this.roleForm.get('readSelect'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleeditComponent.prototype, "roleDescription", {
        get: function () { return this.roleForm.get('roleDescription'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleeditComponent.prototype, "roleStatusId", {
        get: function () { return this.roleForm.get('roleStatusId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleeditComponent.prototype, "userType", {
        get: function () { return this.roleForm.get('userType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleeditComponent.prototype, "reportto", {
        get: function () { return this.roleForm.get('reportto'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleeditComponent.prototype, "reporttoid", {
        get: function () { return this.roleForm.get('reporttoid'); },
        enumerable: true,
        configurable: true
    });
    RoleeditComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _role_service__WEBPACK_IMPORTED_MODULE_3__["RoleService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('treepopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], RoleeditComponent.prototype, "treepopup", void 0);
    RoleeditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-roleedit',
            template: __importDefault(__webpack_require__(/*! raw-loader!./roleedit.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/roleedit.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./roleedit.component.scss */ "./src/app/views/role/roleedit.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _role_service__WEBPACK_IMPORTED_MODULE_3__["RoleService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"], _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]])
    ], RoleeditComponent);
    return RoleeditComponent;
}());



/***/ }),

/***/ "./src/app/views/role/userlistingpopup/userlistingpopup.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/views/role/userlistingpopup/userlistingpopup.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JvbGUvdXNlcmxpc3Rpbmdwb3B1cC91c2VybGlzdGluZ3BvcHVwLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/role/userlistingpopup/userlistingpopup.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/role/userlistingpopup/userlistingpopup.component.ts ***!
  \***************************************************************************/
/*! exports provided: UserListingPopUpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserListingPopUpComponent", function() { return UserListingPopUpComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _role_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../role.service */ "./src/app/views/role/role.service.ts");
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





var UserListingPopUpComponent = /** @class */ (function () {
    function UserListingPopUpComponent(commonService, serviceRoleService) {
        this.commonService = commonService;
        this.serviceRoleService = serviceRoleService;
        this.loadSave = false;
        this.sortDir = 'desc';
        this.sortColumn = 'Id';
        this.lstServiceUserNames = {
            pager: {},
            data: []
        };
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_2__["SelectionType"];
        this.selected = [];
        this.pageSizeValue = 10;
        this.pageNo = 0;
    }
    UserListingPopUpComponent.prototype.ngOnInit = function () {
        //debugger;
        this.pageNo = 1;
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.searchTxt = '';
        this.refresh();
    };
    UserListingPopUpComponent.prototype.show = function (data) {
        var _this = this;
        this.pageSizeValue = 10;
        this.pageNo = 1;
        this.currentPage = 1;
        this.UserName = data.Name;
        this.roleId = data.RoleId;
        this.loadSave = true;
        this.ServiceUsersPopup.show();
        this.loadSave = false;
        this.serviceRoleService.GetServiceUsers(this.searchTxt, this.sortColumn, this.sortDir, 1, this.pageSizeValue, this.roleId).subscribe(function (resp) {
            setTimeout(function () {
                _this.lstServiceUserNames = resp;
                _this.offset = _this.pageNo + 1;
                _this.loadSave = false;
            }, 200);
        }, function (err) {
            _this.loadSave = false;
        });
    };
    UserListingPopUpComponent.prototype.close = function () {
        this.loadSave = false;
        this.ServiceUsersPopup.hide();
    };
    Object.defineProperty(UserListingPopUpComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    UserListingPopUpComponent.prototype.refresh = function () {
        var _this = this;
        this.table.sorts = [];
        this.serviceRoleService.GetServiceUsers(this.searchTxt, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.roleId).subscribe(function (resp) {
            setTimeout(function () {
                _this.lstServiceUserNames = resp;
                _this.offset = _this.pageNo + 1;
                _this.loadSave = false;
            }, 200);
        }, function (err) {
            _this.loadSave = false;
        });
    };
    UserListingPopUpComponent.prototype.setPage = function ($event) {
        //debugger;
        if (typeof $event.page == "undefined") {
            this.loadSave = false;
        }
        else {
            this.loadSave = true;
        }
        this.pageNo = $event.page;
        this.refresh();
    };
    UserListingPopUpComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.serviceRoleService.GetServiceUsers(this.searchTxt, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.roleId).subscribe(function (resp) {
            setTimeout(function () {
                _this.lstServiceUserNames = resp;
                _this.table.recalculate();
                _this.table.recalculateColumns();
                _this.loadSave = false;
            }, 200);
        }, function (err) {
            _this.loadSave = false;
        });
    };
    UserListingPopUpComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    UserListingPopUpComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.serviceRoleService.GetServiceUsers(this.searchTxt, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.roleId).subscribe(function (resp) {
            setTimeout(function () {
                _this.lstServiceUserNames = resp;
                _this.table.recalculate();
                _this.table.recalculateColumns();
                _this.loadSave = false;
            }, 200);
        }, function (err) {
            _this.loadSave = false;
        });
    };
    UserListingPopUpComponent.prototype.onReset = function () {
        this.sortDir = 'desc';
        this.sortColumn = 'Id';
        this.pageNo = 1;
        this.pageSizeValue = 10;
        this.searchTxt = '';
        this.refresh();
    };
    UserListingPopUpComponent.prototype.onSearch = function () {
        this.pageNo = 1;
        this.pageSizeValue = 10;
        this.refresh();
    };
    UserListingPopUpComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.onSearch();
        }
    };
    UserListingPopUpComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _role_service__WEBPACK_IMPORTED_MODULE_4__["RoleService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ServiceUsersListPopUp', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], UserListingPopUpComponent.prototype, "ServiceUsersPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('table', { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_2__["DatatableComponent"])
    ], UserListingPopUpComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], UserListingPopUpComponent.prototype, "offset", void 0);
    UserListingPopUpComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-userlistingpopup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./userlistingpopup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/role/userlistingpopup/userlistingpopup.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./userlistingpopup.component.scss */ "./src/app/views/role/userlistingpopup/userlistingpopup.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _role_service__WEBPACK_IMPORTED_MODULE_4__["RoleService"]])
    ], UserListingPopUpComponent);
    return UserListingPopUpComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-role-role-module.js.map