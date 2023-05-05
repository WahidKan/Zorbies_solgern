(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-internalaccounts-internalaccount-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/accountslist.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/accountslist.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\">\r\n    <strong>Manage Accounts</strong>\r\n    <p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p>\r\n  </h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Accounts</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-7\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n                <div class=\"d-inline-block align-middle pl-3\">\r\n                  <label class=\"d-inline-block\"><b>Search in all records</b></label>\r\n                  <div class=\"form-group d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <input type=\"checkbox\" id=\"allRecords\" formControlName=\"allRecords\" [checked]=\"myCheckbox\" (click)=\"switchClicked($event)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-5\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0\">\r\n                <ng-select [items]=\"pagedData.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i> </span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/accountslist/addaccount\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add Account\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rowHeight]=\"40\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [scrollbarH]=\"true\"\r\n                   \r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n\r\n\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'Name'\">\r\n                <a *ngIf='companyType != \"companytypeSolarInstall\" ' class=\" view-list\" [routerLink]=\"['/accountslist/viewaccount',row.Id]\" title=\"View Detail\">{{row[col.COLUMN_NAME] }}</a>\r\n                <a *ngIf='companyType == \"companytypeSolarInstall\" ' class=\" view-list\" [routerLink]=\"['/accountslist/view',row.Id]\" title=\"View Detail\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'Name'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal:'Date'\" *ngIf=\"col.DATA_TYPE=='date'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal:'Date') : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\" *ngIf=\"col.DATA_TYPE=='datetime'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.DATA_TYPE!='bit' && col.FieldType != 'select'\">\r\n                  {{row[col.COLUMN_NAME] }}\r\n                </div>\r\n                <div *ngIf=\"col.FieldType == 'select'\">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                  <div *ngIf=\"col.FieldFrom==null\">\r\n                    <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                      <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                      <div *ngIf=\"itemColorCode.colorkey!=undefined\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.Id\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.Id}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <a *ngIf='companyType != \"companytypeSolarInstall\" ' class=\"actions-onclick view-list\" [routerLink]=\"['/accountslist/viewaccount',row.Id]\" title=\"View Detail\"><i class=\"fa fa-eye pr-2\"></i></a>\r\n                    <a *ngIf='companyType == \"companytypeSolarInstall\" ' class=\"actions-onclick view-list\" [routerLink]=\"['/accountslist/view',row.Id]\" title=\"View Detail\"><i class=\"fa fa-eye pr-2\"></i></a>\r\n                    <a *ngIf='isUpdate' class=\"actions-onclick view-list\" [routerLink]=\"['/accountslist/editaccount',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"crm\" subModuleName=\"account\"></app-searchfilteradd>\r\n<app-manageviewnew (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"crm\" subModuleName=\"account\"></app-manageviewnew>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/accountviewdetail.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/accountviewdetail.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 *ngIf=\"!banker\" class=\"float-left pr-2\"><strong>Account Detail</strong></h2>\r\n  <h2 *ngIf=\"banker\" class=\"float-left pr-2\"><strong>User Detail</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li *ngIf=\"!banker\"><a routerLink=\"/accountslist\">Manage Accounts</a></li>\r\n      <li *ngIf=\"!banker\" class=\"active\">Account Detail</li>\r\n      <li *ngIf=\"banker\" class=\"active\">User Detail</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\" [ngClass]=\"{'disabled':loading}\">\r\n        <!--<h3 class=\"form-heading ng-star-inserted form-group-heading-back\">\r\n    <span *ngIf=\"AccountDetails!=null && AccountDetails!='undefined'\">{{AccountDetails.name}} ( <i class=\"text-info\" *ngIf=\"AccountDetails!=null && AccountDetails!='undefined'\">{{AccountDetails.userType}} Account</i>) </span>\r\n    <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"close()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n  </h3>-->\r\n        <div class=\"card mb-4 border\" style=\"background:none\">\r\n          <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n            <i class=\"fa fa-user-circle-o bg-info bg-primary text-white float-left p-1 mr-2\"></i>\r\n            <span class=\"float-left w-85-res\" *ngIf=\"AccountDetails!=null && AccountDetails!='undefined'\"><span><i class=\"text-info\">{{AccountDetails.userType}} Account</i></span> {{AccountDetails.name}}</span>\r\n            <span class=\"cntnt-right-btn mr15 btn-iconres\">\r\n\r\n              <a class=\"btn btn-dark text-white\" href=\"javascript:void(0);\" (click)=\"close()\">\r\n                <i class=\"fa fa-arrow-left mr-1\"></i> Back\r\n              </a>\r\n            </span>\r\n          </span></div>\r\n          <!--<div class=\"clearfix\"></div>-->\r\n          <div class=\"col-md-12 px-2\">\r\n            <div class=\"row\">\r\n              <!--<div class=\"col-sm-12 col-md-6\" *ngIf=\"!IsStandard\">\r\n    <label><b>Bank Name:</b></label>\r\n    <div class=\"form-group\">\r\n      <div class=\"form-control border-0 p-0\" *ngIf=\"AccountDetails!=null && AccountDetails!='undefined'\">\r\n        {{AccountDetails.bankName}}\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <label><b>Address:</b></label>\r\n                <div class=\"form-group\">\r\n                  <div class=\"form-control border-0 p-0\" *ngIf=\"AccountDetails!=null && AccountDetails!='undefined'\">\r\n                    {{AccountDetails.street}} {{AccountDetails.city}} {{AccountDetails.state}} {{AccountDetails.country  }}\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <label><b>Modified By:</b></label>\r\n                <div class=\"form-group\">\r\n                  <div class=\"form-control  border-0 p-0\" *ngIf=\"AccountDetails!=null && AccountDetails!='undefined'\">\r\n                    {{AccountDetails.modifiedByName  }}\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <label><b>Created By:</b></label>\r\n                <div class=\"form-group\">\r\n                  <div class=\"form-control  border-0 p-0\" *ngIf=\"AccountDetails!=null && AccountDetails!='undefined'\">\r\n                    {{AccountDetails.createdByName }}\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <label><b>Modified On:</b></label>\r\n                <div class=\"form-group\">\r\n                  <div class=\"form-control  border-0 p-0\" *ngIf=\"AccountDetails!=null && AccountDetails!='undefined'\">\r\n                    {{(AccountDetails.modifiedOn !== null) ? (AccountDetails.modifiedOn | utctolocal) : \"\" }}\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <label><b>Created On:</b></label>\r\n                <div class=\"form-group\">\r\n                  <div class=\"form-control  border-0 p-0\" *ngIf=\"AccountDetails!=null && AccountDetails!='undefined'\">\r\n                    {{AccountDetails.createdOnDate | utctolocal  }}\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-sm-12 col-md-6\" *ngIf=\"isDealerAccount\">\r\n                <label><b>Company URL:</b></label>\r\n                <div class=\"form-group\">\r\n                  <div class=\"form-control  border-0 p-0\" *ngIf=\"AccountDetails!=null && AccountDetails!='undefined'\">\r\n                    <a target=\"_blank\" href='http://{{AccountDetails.dealerCompanyUrl }}'>{{AccountDetails.dealerCompanyUrl }}</a>\r\n</div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </div>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n      <div class=\"col-md-12\">\r\n        <h3 class=\"form-heading ng-star-inserted\"><span>Contact List</span> <a *ngIf=\"!IsStandard\" (click)=\"AddContact()\" class=\"addrightbtn\" href=\"javascript:void(0)\"><i class=\"fa fa fa-plus\"></i> Add Contact </a></h3>\r\n        <div class=\"col-md-12 px-2\">\r\n\r\n          <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n            <div class=\"row mt-2\">\r\n              <div class=\"col-md-12 col-xl-5 pr-3 pr-lg-0\">\r\n                <div class=\"row searchfield\">\r\n                  <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                    <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n                  </div>\r\n                  <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                    <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"searchByName()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i></span></a>\r\n                    <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"resetName()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i></span></a>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-12 col-md-12\">\r\n              <form [formGroup]=\"configurationSetings\">\r\n                <div class=\"table-responsive\" style=\"overflow:visible;\">\r\n                  <table class=\"table mb-0\">\r\n                    <thead class=\"thead-bg\">\r\n                      <tr>\r\n                        <th>Name</th>\r\n                        <th>Email</th>\r\n                        <th>Phone</th>\r\n                        <th>Mobile</th>\r\n                        <th *ngIf=\"!IsStandard\"> Is Primary</th>\r\n                        <th>Enable Login</th>\r\n                        <!--<th *ngIf=\"isUsertypeBanker\">Role</th>-->\r\n                        <th *ngIf=\"(banker || isCompanyAdmin) && !IsStandard\">Assign Role<span class=\"text-danger\">*</span></th>\r\n                        <th>Login</th>\r\n\r\n                        <th>Email Confirmed</th>\r\n\r\n                        <th>Set Password</th>\r\n\r\n                        <th>Delete</th>\r\n\r\n                      </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"accoundetailView\">\r\n                      <tr [formGroupName]=\"i\" *ngFor=\"let field of accoundetailView.controls; let i=index\">\r\n                        <td>\r\n                          <!--[routerLink]=\"['/contactlist/editContact',field.get('contactID').value]\"-->\r\n                          <a href=\"javascript:void(0);\" (click)=\"goToContact(field.get('contactID').value)\">{{field.get('name').value}}  </a>\r\n\r\n                        </td>\r\n                        <td>\r\n                          <span>{{field.get('email').value}}</span>\r\n                        </td>\r\n\r\n                        <td>\r\n                          <span>{{field.get('phone').value}}</span>\r\n                        </td>\r\n                        <td>\r\n                          <span>{{field.get('mobile').value}}</span>\r\n                        </td>\r\n                        <td *ngIf=\"!IsStandard && field.get('isPrimary').value==false\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" (change)=\"isPrimaryValidator(field,i)\" formControlName=\"isPrimary\" />\r\n                            <span class=\"slider round\"><span>Yes</span></span>\r\n                          </label>\r\n                        </td>\r\n                        <td *ngIf=\"!IsStandard && field.get('isPrimary').value==true\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" formControlName=\"isPrimary\" disabled />\r\n                            <span class=\"slider round\"><span>Yes</span></span>\r\n                          </label>\r\n                        </td>\r\n                        <td>\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" (change)=\"validator(field)\" formControlName=\"enableLogin\">\r\n                            <span class=\"slider round\"><span>Yes</span></span>\r\n                          </label>\r\n                        </td>\r\n                        <td *ngIf=\"(dealer || banker || isCompanyAdmin) && !IsStandard\">\r\n                          <div class=\"form-group\">\r\n\r\n                            <ng-select [items]=\"lstRole\" placeholder=\"Select Role\" bindValue=\"RoleIDAuto\" bindLabel=\"RoleName\" formControlName=\"role\" (change)=\"selectUser($event,field,i)\"\r\n                                       [ngClass]=\"{'is-invalid': (field.get('role').invalid && (field.get('role').dirty || field.get('role').touched) && field.get('role').errors?.required) }\"></ng-select>\r\n                            <small *ngIf=\"field.get('role').errors?.required\"\r\n                                   class=\"text-danger\">Role is required</small>\r\n                          </div>\r\n                        </td>\r\n                        <td>\r\n                          <button [disabled]='!field.dirty'\r\n                                  class=\"btn btn-success mr-1\" (click)=\"EnableLoginForAllUser(field)\">\r\n                            <i class=\"fa fa-save\"></i> Save\r\n                          </button>\r\n\r\n                          <!--<a href=\"javascript:void(0);\" class=\"btn btn-success mr-1 disabled\" (click)=\"EnableLoginForAllUser(field)\"></a>-->\r\n                          <!--<a href=\"javascript:void(0);\"  class=\"btn btn-success mr-1\" (click)=\"EnableLoginForAllUser(field)\"><i class=\"fa fa-save\"></i> Save</a>-->\r\n                        </td>\r\n\r\n\r\n                        <td>\r\n                          <span *ngIf=\"field.get('emailConfirmed').value==false\" title=\"No\" class=\"status-box bg-danger\">Not Confirmed</span>\r\n                          <span *ngIf=\"field.get('emailConfirmed').value==true\" title=\"Yes\" class=\"status-box bg-success\">Confirmed</span>\r\n                        </td>\r\n\r\n                        <!---->\r\n                        <td *ngIf=\"field.get('checkEnabledLogin').value==true\">\r\n\r\n                          <a *ngIf=\"field.get('emailConfirmed').value==true\" (click)=\"showModel(field)\" title=\"setPassword\"><i class=\"fa fa-key text-info pr-2\"></i></a>\r\n                          <a *ngIf=\"field.get('emailConfirmed').value!=true\" (click)=\"sharePasswordLink(field)\" title=\"Share Password Link\"><i class=\"fa fa-share-alt pr-2\"></i></a>\r\n                        </td>\r\n                        <td *ngIf=\"!field.get('checkEnabledLogin').value==true\"></td>\r\n\r\n                        <td>\r\n                          <a title=\"Click to delete.\" (click)=\"DeleteUser(field)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                        </td>\r\n\r\n\r\n\r\n                      </tr>\r\n                      <!--<tr *ngIf=\"!accoundetailView.controls\"><td colspan=\"11\">No Record found</td></tr>-->\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        </div>\r\n        <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n      </div>\r\n    <!--<div class=\"row my-4\">\r\n      <div class=\"col-sm-12 col-md-12\">\r\n\r\n        <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-backward\"></i> Back</a>\r\n      </div>\r\n    </div>-->\r\n    <!--<a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-1\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>-->\r\n\r\n    <div *ngIf=\"accountId && AccountDetails.accountTypeKey == 'AccountTypeBanker' && user.userType == 'usertypecompanyadmin'\" class=\"row\">\r\n      <div class=\"col-lg-12 portlets\">\r\n        <div class=\"panel cntainerwithoutbg clearfix\">\r\n          <div class=\"panel-content clearfix mb-4 p-0\">\r\n            <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link active show\" id=\"documents-tab\" data-toggle=\"tab\" href=\"#documents\" role=\"tab\" aria-selected=\"true\">Bank Documents</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" id=\"routes-tab\" data-toggle=\"tab\" href=\"#routes\" role=\"tab\" aria-selected=\"true\">Data Routes</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" id=\"mappings-tab\" data-toggle=\"tab\" href=\"#mappings\" role=\"tab\" aria-selected=\"true\">Document/Data Route Mappings</a>\r\n              </li>\r\n            </ul>\r\n            <div class=\"tab-content\" id=\"myTabContent\">\r\n              <div class=\"tab-pane fade active show\" id=\"documents\" role=\"tabpanel\">\r\n                <div class=\"addabsoultebtn\"><a class=\"btn btn-primary\" href=\"javscript:;\" (click)=\"uploadFormStackDocument()\"><i class=\"fa fa-upload\"></i> Upload Document</a></div>\r\n                <div class=\"panel-content p-0 pagination2 table-responsive no-padding \" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"loanDocuments\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 [loadingIndicator]=\"loadSave\">\r\n                    <ngx-datatable-column name=\"Document Name\" prop=\"name\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Document Id\" prop=\"id\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Path\" prop=\"DateOpened\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.folder}}/{{row.name}}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <!--<ngx-datatable-column name=\"Edit\">\r\n                    <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                      <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"OpenMapping(row)\"><i class=\"fa fa-pencil\"></i> Edit Mapping</a>\r\n                    </ng-template>\r\n                  </ngx-datatable-column>-->\r\n                    <ngx-datatable-column name=\"Edit\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"EditDocument(row)\"><i class=\"fa fa-pencil\"></i> Edit Document</a>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                  </ngx-datatable>\r\n                  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadDocuments\" class=\"loader\"></app-loader>\r\n                </div>\r\n              </div>\r\n              <div class=\"tab-pane fade\" id=\"routes\" role=\"tabpanel\">\r\n                <div class=\"addabsoultebtn\"><a class=\"btn btn-primary\" href=\"javscript:;\" (click)=\"createDataRoute()\"><i class=\"fa fa-plus\"></i> Create Data Route</a></div>\r\n\r\n                <div class=\"panel-content p-0 pagination2 table-responsive no-padding \" [ngClass]=\"{'disabled': loadSave}\">\r\n                  <ngx-datatable #table2 class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"dataRoutes\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 [loadingIndicator]=\"loadSave\">\r\n                    <ngx-datatable-column name=\"Data Route Name\" prop=\"name\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Data Route Id\" prop=\"id\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Path\" prop=\"DateOpened\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.folder}}/{{row.name}}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Edit\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"OpenRoute(row)\"><i class=\"fa fa-pencil\"></i> Edit Data Route</a>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Manage\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"OpenRouteDelivery(row)\"><i class=\"fa fa-pencil\"></i>Manage Delivery</a>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n              <div class=\"tab-pane fade\" id=\"mappings\" role=\"tabpanel\">\r\n                <div class=\"addabsoultebtn\"><a class=\"btn btn-primary\" href=\"javscript:;\" (click)=\"createWebmergeMapping()\"><i class=\"fa fa-plus\"></i> Create Document/Data Route Mapping</a></div>\r\n                <div class=\"panel-content p-0 pagination2 table-responsive no-padding \" [ngClass]=\"{'disabled': loadSave}\">\r\n                  <ngx-datatable #table2 class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"webmergeMappingsPagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 [loadingIndicator]=\"loadSave\">\r\n                    <ngx-datatable-column name=\"Mapping Name\" prop=\"Name\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Mapping Object Id\" prop=\"WebmergeObjectId\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Mapping Object Type\" prop=\"WebmergeObjectType\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Is Default\" prop=\"IsDefault\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <label class=\"switch\">\r\n                          <input type=\"checkbox\" [checked]=\"row.IsDefault == true\" (change)=\"onIsDefaultChange(row)\" />\r\n                          <span class=\"slider round\">\r\n                            <span>Yes</span>\r\n                          </span>\r\n                        </label>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Edit\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"updateWebmergeMapping(row)\"><i class=\"fa fa-pencil\"></i> Edit Mapping</a>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                  </ngx-datatable>\r\n                  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadWebmergeMappingsPagedData\" class=\"loader\"></app-loader>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"clearfix\"></div>\r\n  </div>\r\n</div>\r\n\r\n<app-data-routing #dataRouting (dataRoutingEmit)=\"dataRoutingEmit()\"></app-data-routing>\r\n<app-upload-document #uploadDocument (uploadDocuments)=\"uploadDocuments()\"></app-upload-document>\r\n<app-documentmapping #documentMapping (documentMappings)=\"documentMappings()\"></app-documentmapping>\r\n<app-routing-delivery #delivery></app-routing-delivery>\r\n\r\n\r\n<div class=\"modal fade in show\" bsModal #setPassword=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Set Password Of {{Name}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"Closemodel()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"height:100%;\">\r\n\r\n        <div class=\"login-container\">\r\n          <div class=\"login-main\">\r\n            <!--<a href=\"javascript:void(0);\"><img class=\"img-fluid mb-3\" src=\"assets/default-theme/imagesNew/login-logo.png\" style=\"background: #2f4050; padding:15px;\"/></a>-->\r\n            <div class=\"login-box\" [ngClass]=\"{'disabled':loadSave}\">\r\n\r\n              <form [formGroup]=\"setPasswordForm\" autocomplete=\"off\">\r\n\r\n\r\n                <div class=\"form-group pwdtoggle\" >\r\n\r\n                  <input class=\"form-control\" type=\"password\" formControlName=\"password\" passwordToggle placeholder=\"Please enter password\"\r\n                         [ngClass]=\"{'is-invalid': (password.invalid && (password.dirty || password.touched) && (password.errors?.required || password.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors?.required\"\r\n                         class=\"text-danger\">Password is required</small>\r\n\r\n\r\n                  <!--<input type=\"password\" formControlName=\"password\" placeholder=\"Please enter password\" passwordToggle class=\"form-control\">\r\n                  <div *ngIf=\"password.invalid && (password.dirty || password.touched)\">\r\n                    <div *ngIf=\"password.errors.required\" class=\"alert alert-danger p-1\">Password is required</div>\r\n                  </div>-->\r\n\r\n\r\n\r\n\r\n\r\n                </div>\r\n                <div class=\"form-group pwdtoggle\">\r\n\r\n                  <input class=\"form-control\" type=\"password\" formControlName=\"confirmPassword\" passwordToggle placeholder=\"Please enter confirm password\"\r\n                         [ngClass]=\"{'is-invalid': (confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched) && (confirmPassword.errors?.required || confirmPassword.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched) && confirmPassword.errors?.required\"\r\n                         class=\"text-danger\">Confirm Password is required</small>\r\n                  <small *ngIf=\"!confirmPassword.valid  && confirmPassword.hasError('notmatch')\"\r\n                         class=\"text-danger\">Confirm password does not match</small>\r\n\r\n\r\n\r\n\r\n                  <!--<input type=\"password\" formControlName=\"confirmPassword\" passwordToggle placeholder=\"Please enter confirm password\" class=\"form-control\" />\r\n                  <div *ngIf=\"confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched)\">\r\n                    <div *ngIf=\"confirmPassword.errors.required\" class=\"alert-danger p-1\">Confirm password is required</div>\r\n                    <div *ngIf=\"confirmPassword.errors.mismatched\" class=\"alert-danger p-1\">Confirm password does not match</div>\r\n                  </div>-->\r\n                </div>\r\n\r\n                <div class=\"col-sm-12 p-0\">\r\n                  <p class=\"alert-warning p-2\">Note: Password should be combination of lower case, upper case, numeric and special character.</p>\r\n                </div>\r\n\r\n\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <a class=\"btn btn-success text-white mr-2\" (click)=\"PasswordSet()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"Closemodel()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/accountviewdetailNew.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/accountviewdetailNew.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 *ngIf=\"!banker\" class=\"float-left pr-2\"><strong>Account Detail</strong></h2>\r\n  <h2 *ngIf=\"banker\" class=\"float-left pr-2\"><strong>User Detail</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li *ngIf=\"!banker\"><a routerLink=\"/accountslist\">Manage Accounts</a></li>\r\n      <li *ngIf=\"!banker\" class=\"active\">Account Detail</li>\r\n      <li *ngIf=\"banker\" class=\"active\">User Detail</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:none\">\r\n  <div class=\"clearfix\"></div>\r\n\r\n  <div class=\"card mb-4 border\" style=\"background:none\">\r\n    <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n      <i class=\"fa fa-user-circle-o bg-info bg-primary text-white float-left p-1 mr-2\"></i>\r\n      <span class=\"float-left w-85-res\"><span>Account</span> {{Name}}</span>\r\n      <span class=\"cntnt-right-btn mr15 btn-iconres\">\r\n        <a [routerLink]=\"['/accountslist/editaccount/',accountId]\" class=\"btn btn-success text-white mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n        <a class=\"btn btn-info text-white mr-2\" (click)=\"WelcomeCallPopup(accountId)\"><i class=\"fa fa-phone mr-1\"></i> Welcome Call</a>\r\n        <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n      </span>\r\n    </span>\r\n\r\n    <div class=\"col-12 float-left bg-light d-md-flex p-0 py-resp py-2 py-sm-0\">\r\n      <div class=\"col\">\r\n        <span class=\"py-2 d-block\"><strong>Billing Address:</strong> {{ BillingAddress}}</span>\r\n      </div>\r\n      <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n        <div class=\"col\" *ngIf=\"item.ColumnName!='BillingCity' && item.ColumnName!='BillingStreet' && item.ColumnName!='BillingState' && item.ColumnName!='BillingCountry' && item.ColumnName!='BillingPostalCode' && item.ColumnName!='Name' && item.field_route==null\">\r\n          <span class=\"py-2 d-block\"><strong>{{ item.display_name}}:</strong> {{ item.value}}</span>\r\n        </div>\r\n        <div class=\"col\" *ngIf=\"item.ColumnName!='BillingCity' && item.ColumnName!='BillingStreet' && item.ColumnName!='BillingState' && item.ColumnName!='BillingCountry' && item.ColumnName!='BillingPostalCode' && item.ColumnName!='Name' && item.field_route!=null || item.ColumnName=='Account_Opportunity'\">\r\n          <span *ngIf=\"item.ref_value\" class=\"py-2 d-block\"><strong>{{ item.display_name}}:</strong> <a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\"> {{ item.value}}</a></span>\r\n          <span *ngIf=\"!item.ref_value\" class=\"py-2 d-block\"><strong>{{ item.display_name}}:</strong> {{ item.value}}</span>\r\n        </div>\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n  <div class=\"col-lg-12\">\r\n    <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-12 col-lg-8\">\r\n          <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n          <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n            <form [formGroup]=\"form\" *ngIf=\"form\">\r\n              <ng-container *ngFor=\"let item of formControlList\">\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span> {{item.group_name}}</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <div class=\"panel-body row px-0 mt-0\">\r\n                      <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                        <div class=\"input-group border-bottom\">\r\n                          <div class=\"col-sm-12 col-md-6 px-0\">\r\n                            <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                          </div>\r\n                          <div class=\"col-sm-12 col-md-6\">\r\n                            <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null \" class=\"py-2 d-block\">\r\n                              <ng-container *ngIf=\"item.dt_code!='date' &&  item.dt_code!='datetime'\">{{ inner.value }} </ng-container>\r\n                              <ng-container *ngIf=\"item.dt_code=='date'\"> {{ inner.value | DateTimeToLocal:'Date'}}</ng-container>\r\n                              <ng-container *ngIf=\"item.dt_code=='datetime'\"> {{ inner.value | DateTimeToLocal}}</ng-container>\r\n                            </span>\r\n                            <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null\" class=\"py-2 d-block\">\r\n                              <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                            </span>\r\n                            <!--============================== For CheckBox ===========================-->\r\n                            <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                              <div class=\"form-check form-check-inline\">\r\n                                <div class=\"custom-control custom-checkbox pl-0\">\r\n                                  <label class=\"switch  mb-0\">\r\n                                    <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                    <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                  </label>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <!--============================== For CheckBox ===========================-->\r\n                            <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                              <div class=\"form-check form-check-inline\">\r\n                                <div class=\"custom-control custom-checkbox pl-0\">\r\n                                  <label class=\"switch mb-0\">\r\n                                    <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                    <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                  </label>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ng-container>\r\n            </form>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-sm-12 col-lg-4 relatedtab\">\r\n          <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n          <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n            <div class=\"panel active\">\r\n              <div class=\"panel-heading\">\r\n                <h4 class=\"panel-title\">\r\n                  <a href=\"#oppourtunity\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                    <span>Opportunity ({{OppourtunityCount}})</span>\r\n                  </a>\r\n                </h4>\r\n              </div>\r\n              <div id=\"oppourtunity\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                <div class=\"panel-body p-2 mt-0\">\r\n                  <div class=\"table-responsive ngxtbl\">\r\n                    <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                   [rows]=\"lstOppourtunity.data\"\r\n                                   [scrollbarH]=\"true\"\r\n                                   [rowHeight]=\"'40'\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [footerHeight]=\"40\"\r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [count]=\"lstOppourtunity.pager.totalItems\"\r\n                                   [offset]=\"lstOppourtunity.pager.currentPage\"\r\n                                   [limit]=\"lstOppourtunity.pager.pageSize\"\r\n                                   (page)='setOppourtunityPageNo($event)'\r\n                                   (sort)=\"onOppourtunitySort($event)\">\r\n\r\n                      <ngx-datatable-column name=\"Opportunity Name\" prop=\"OpportunityName\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <div title=\"{{row.OpportunityName}}\">\r\n                            <a [routerLink]=\"['/opportunity/viewOpportunity',row.Id]\">{{row.OpportunityName| truncate}}</a>&nbsp;\r\n                          </div>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Owner Full Name\" prop=\"OwnerFullName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Stage Name\" prop=\"StageName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Amount\" prop=\"Amount\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <span [title]=\"row.Amount\">{{row.Amount | currency}}</span>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n\r\n                      <ngx-datatable-column name=\"Close Date\" prop=\"CloseDate\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <span [title]=\"row.CloseDate\">{{row.CloseDate | DateTimeToLocal}}</span>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"lstOppourtunity.pager.pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"lstOppourtunity.pager.currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n\r\n\r\n                            <!--Showing {{(lstOppourtunity.pager.currentPage - 1 )* lstOppourtunity.pager.pageSize + 1}}  to {{lstOppourtunity.pager.currentPage * lstOppourtunity.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                            {{commonService.PageString(lstOppourtunity.pager.currentPage,lstOppourtunity.pager.pageSize,rowCount)}}\r\n                          </div>\r\n\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [page]=\"lstOppourtunity.pager.currentPage\"\r\n                                           [size]=\"lstOppourtunity.pager.pageSize\"\r\n                                           [count]=\"lstOppourtunity.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / lstOppourtunity.pager.pageSize) > 1)\"\r\n                                           (change)=\"setOppourtunityPageNo($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!--==================================================== Related Contacts ===========================================================-->\r\n            <div class=\"panel active\">\r\n              <div class=\"panel-heading\">\r\n                <h4 class=\"panel-title\">\r\n                  <a href=\"#Contact\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#panelBodynine\"><span>  Contacts ({{RelatedContactsCount}})</span><span style=\"display:none\" class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n                </h4>\r\n              </div>\r\n              <div id=\"panelBodynine\" class=\"panel-collapse active show p-0 border-0\" data-parent=\"#accordion\">\r\n                <a *ngIf=\"!IsStandard\" href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                   (click)=\"AddContact()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add</a>\r\n                <div class=\"panel-body px-2\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-sm-12 col-md-12\">\r\n                      <form [formGroup]=\"configurationSetings\">\r\n\r\n                        <div class=\"table-responsive\">\r\n                          <table class=\"table mb-0\">\r\n                            <thead>\r\n                              <tr>\r\n                                <th>Name</th>\r\n                                <th>Email</th>\r\n                                <th>Phone</th>\r\n                                <th>Mobile</th>\r\n                                <th *ngIf=\"!IsStandard\"> Is Primary</th>\r\n                                <th>Enable Login</th>\r\n                                <!--<th *ngIf=\"isUsertypeBanker\">Role</th>-->\r\n                                <th>Login</th>\r\n                              </tr>\r\n                            </thead>\r\n                            <tbody formArrayName=\"accoundetailView\">\r\n\r\n                              <tr [formGroupName]=\"i\" *ngFor=\"let field of accoundetailView.controls; let i=index\">\r\n                                <td>\r\n                                  <!--[routerLink]=\"['/contactlist/editContact',field.get('contactID').value]\"-->\r\n                                  <a href=\"javascript:void(0);\" (click)=\"goToContact(field.get('contactID').value)\">{{field.get('name').value}}  </a>\r\n\r\n                                </td>\r\n                                <td>\r\n                                  <span>{{field.get('email').value}}</span>\r\n                                </td>\r\n\r\n                                <td>\r\n                                  <span>{{field.get('phone').value}}</span>\r\n                                </td>\r\n                                <td>\r\n                                  <span>{{field.get('mobile').value}}</span>\r\n                                </td>\r\n                                <td *ngIf=\"!IsStandard && field.get('isPrimary').value==false\">\r\n                                  <label class=\"switch\">\r\n                                    <input type=\"checkbox\" (change)=\"isPrimaryValidator(field,i)\" formControlName=\"isPrimary\" />\r\n                                    <span class=\"slider round\"><span>Yes</span></span>\r\n                                  </label>\r\n                                </td>\r\n                                <td *ngIf=\"!IsStandard && field.get('isPrimary').value==true\">\r\n                                  <label class=\"switch\">\r\n                                    <input type=\"checkbox\" formControlName=\"isPrimary\" disabled />\r\n                                    <span class=\"slider round\"><span>Yes</span></span>\r\n                                  </label>\r\n                                </td>\r\n                                <td>\r\n                                  <label class=\"switch\">\r\n                                    <input type=\"checkbox\" (change)=\"validator(field)\" formControlName=\"enableLogin\">\r\n                                    <span class=\"slider round\"><span>Yes</span></span>\r\n                                  </label>\r\n                                </td>\r\n                                <td *ngIf=\"banker\">\r\n                                  <div class=\"form-group\">\r\n\r\n                                    <ng-select [items]=\"lstRole\" placeholder=\"Select Role\" bindValue=\"RoleIDAuto\" bindLabel=\"RoleName\" formControlName=\"role\" (change)=\"selectUser($event,field,i)\"\r\n                                               [ngClass]=\"{'is-invalid': (field.get('role').invalid && (field.get('role').dirty || field.get('role').touched) && field.get('role').errors?.required) }\"></ng-select>\r\n                                  </div>\r\n\r\n                                </td>\r\n                                <td>\r\n                                  <button [disabled]='!field.dirty'\r\n                                          class=\"btn btn-success mr-1\" (click)=\"EnableLoginForAllUser(field)\">\r\n                                    <i class=\"fa fa-save\"></i> Save\r\n                                  </button>\r\n\r\n\r\n                                </td>\r\n                              </tr>\r\n\r\n                              <tr *ngIf=\"accoundetailView.controls==null || accoundetailView.controls==''\">\r\n                                <td colspan=\"7\" class=\"text-center\"><span class=\"text-center text-danger\">No data to display</span></td>\r\n                              </tr>\r\n                            </tbody>\r\n                          </table>\r\n                        </div>\r\n\r\n                      </form>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"panel active\">\r\n              <div class=\"panel-heading\">\r\n                <h4 class=\"panel-title\">\r\n                  <a href=\"#communicationList\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                    <span>Communications ({{CoomunicationCounts}})</span>\r\n                  </a>\r\n                </h4>\r\n              </div>\r\n              <div id=\"communicationList\" class=\"panel-collapse collapse active show\" style=\"\" [ngClass]=\"{'disabled':loadSave}\">\r\n                <div class=\"panel-body p-2 mt-0\">\r\n                  <div class=\"table-responsive ngxtbl\">\r\n                    <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                   [rows]=\"lstCoomunication.data\"\r\n                                   [scrollbarH]=\"true\"\r\n                                   [rowHeight]=\"'40'\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [footerHeight]=\"40\"\r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [count]=\"lstCoomunication.pager.totalItems\"\r\n                                   [offset]=\"lstCoomunication.pager.currentPage\"\r\n                                   [limit]=\"lstCoomunication.pager.pageSize\"\r\n                                   (page)='setCommunicationPageNo($event)'\r\n                                   (sort)=\"onCommunicationSort($event)\">\r\n                      <ngx-datatable-column name=\"From Name\" prop=\"FromName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Play / Download\" prop=\"Action\" [sortable]=\"false\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <!--<a (click)=\"ClickToPlay(row)\" href=\"javascript:void(0)\"><i title=\"Click to play Audio.\" class=\"fa fa-file-audio-o\" style=\"font-size:24px\"></i></a>&nbsp;&nbsp;&nbsp;-->\r\n                          <!--<a href=\"{{row.fileUrl}}\" target=\"_blank\"><i title=\"Click to downloand.\" class=\"fa fa-download text-primary\"></i></a>-->\r\n                          <div class=\"text-left\" *ngIf=\"row.fileUrl!=null && row.fileUrl!=''\">\r\n                            <a (click)=\"ClickToPlay(row)\" href=\"javascript:void(0)\"><i title=\"Click to play Audio.\" class=\"fa fa-file-audio-o\" style=\"font-size:24px\"></i></a>&nbsp;&nbsp;&nbsp;\r\n                          </div>\r\n                          <div class=\"text-left\" *ngIf=\"row.fileUrl==null || row.fileUrl==''\">\r\n                            <div *ngIf=\"row.PrivateRecordingFilePath==null || row.PrivateRecordingFilePath==''\">\r\n                              <a href=\"javascript:void(0)\" class=\"disabled\">\r\n                                <i title=\"Click to downloand.\"\r\n                                   class=\"fa fa-download text-primary\" style=\"font-size:24px\"></i>\r\n                              </a>&nbsp;&nbsp;&nbsp;\r\n                            </div>\r\n                            <div *ngIf=\"row.PrivateRecordingFilePath!=null && row.PrivateRecordingFilePath!=''\">\r\n                              <a href=\"javascript:void(0)\" (click)=\"downloadFileSharePoint(row.PrivateRecordingFilePath)\">\r\n                                <i title=\"Click to downloand.\"\r\n                                   class=\"fa fa-download text-primary\" style=\"font-size:24px\"></i>\r\n                              </a>&nbsp;&nbsp;&nbsp;\r\n                            </div>\r\n\r\n                          </div>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Vendor\" prop=\"Vendor\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <div *ngIf=\"row.Vendor=='Twilio'\">\r\n                            <span>Twilio</span>\r\n                          </div>\r\n                          <div *ngIf=\"row.Vendor!='Twilio'\">\r\n                            <span>Ring Central</span>\r\n                          </div>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Result\" prop=\"Result\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"To Phone Number\" prop=\"ToPhoneNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"From Phone Number\" prop=\"FromPhoneNumber\" [sortable]=\"true\"> </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Start Time\" prop=\"StartTime\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          {{row.StartTime |utcdatetimetolocal}}\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Duration(Min)\" prop=\"Duration\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Type\" prop=\"CallType\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Direction\" prop=\"Direction\" [sortable]=\"true\">\r\n                      </ngx-datatable-column>\r\n\r\n                      <ngx-datatable-column name=\"Action\" prop=\"Action\" [sortable]=\"true\">\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Location\" prop=\"Location\" [sortable]=\"true\">\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"From Extension Id\" prop=\"FromExtensionId\" [sortable]=\"true\">\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"lstCoomunication.pager.pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"lstCoomunication.pager.currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                            {{commonService.PageString(lstCoomunication.pager.currentPage,lstCoomunication.pager.pageSize,rowCount)}}\r\n                          </div>\r\n\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [page]=\"lstCoomunication.pager.currentPage\"\r\n                                           [size]=\"lstCoomunication.pager.pageSize\"\r\n                                           [count]=\"lstCoomunication.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / lstCoomunication.pager.pageSize) > 1)\"\r\n                                           (change)=\"setCommunicationPageNo($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                  <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>-->\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"panel active\">\r\n              <div class=\"panel-heading\">\r\n                <h4 class=\"panel-title\">\r\n                  <a href=\"#contract\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                    <span>Contract ({{ContractCount}})</span>\r\n                  </a>\r\n                </h4>\r\n              </div>\r\n              <div id=\"contract\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                <div class=\"panel-body p-2 mt-0\">\r\n                  <div class=\"table-responsive ngxtbl\">\r\n                    <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                   [rows]=\"lstContract.data\"\r\n                                   [scrollbarH]=\"true\"\r\n                                   [rowHeight]=\"'40'\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [footerHeight]=\"40\"\r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [count]=\"lstContract.pager.totalItems\"\r\n                                   [offset]=\"lstContract.pager.currentPage\"\r\n                                   [limit]=\"lstContract.pager.pageSize\"\r\n                                   (page)='setContractPageNo($event)'\r\n                                   (sort)=\"onContractSort($event)\">\r\n                      <ngx-datatable-column name=\"Contract Number\" prop=\"ContractNumber\" [sortable]=\"true\"> </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"NTP Date\" prop=\"NTPDate\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <span title=\"row.NTPDate | DateTimeToLocal\">{{row.NTPDate | DateTimeToLocal}}</span>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"PTO Date\" prop=\"PTODate\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <span title=\"row.PTODate| DateTimeToLocal\">{{row.PTODate | DateTimeToLocal}}</span>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Open Transaction Balance\" prop=\"OpenTransactionBalance\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <span title=\"row.OpenTransactionBalance\">{{row.OpenTransactionBalance | currency}}</span>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"lstContract.pager.pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"lstContract.pager.currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                            {{commonService.PageString(lstContract.pager.currentPage,lstContract.pager.pageSize,rowCount)}}\r\n                          </div>\r\n\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [page]=\"lstContract.pager.currentPage\"\r\n                                           [size]=\"lstContract.pager.pageSize\"\r\n                                           [count]=\"lstContract.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / lstContract.pager.pageSize) > 1)\"\r\n                                           (change)=\"setContractPageNo($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!--==============================================================================================================================-->\r\n            <!--======================================================Work Orders=============================================================-->\r\n            <div class=\"panel active\">\r\n              <div class=\"panel-heading\">\r\n                <h4 class=\"panel-title\">\r\n                  <a href=\"#workOrders\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                    <span>Work Orders ({{workOrderCount}})</span>\r\n                  </a>\r\n                </h4>\r\n              </div>\r\n              <div id=\"workOrders\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                <div class=\"panel-body p-2 mt-0\">\r\n                  <div class=\"table-responsive ngxtbl\">\r\n                    <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                   [rows]=\"lstWorkOrders.data\"\r\n                                   [scrollbarH]=\"true\"\r\n                                   [rowHeight]=\"'40'\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [footerHeight]=\"40\"\r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [count]=\"lstWorkOrders.pager.totalItems\"\r\n                                   [offset]=\"lstWorkOrders.pager.currentPage\"\r\n                                   [limit]=\"lstWorkOrders.pager.pageSize\"\r\n                                   (page)='setWorkorderPageNo($event)'\r\n                                   (sort)=\"onWorkOrdersSort($event)\">\r\n\r\n                      <!--<ngx-datatable-column name=\"Work Order Number\" prop=\"WorkOrderNumber\" [sortable]=\"true\"></ngx-datatable-column>-->\r\n                      <ngx-datatable-column name=\"Work Order Number\" prop=\"WorkOrderNumber\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <a class=\"view-list\" [routerLink]=\"['/workorder/view',row.Id]\" href=\"javascript:void(0);\" [title]=\"row.WorkOrderNumber\">{{row.WorkOrderNumber}}</a>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Subject\" prop=\"Subject\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Sub Status\" prop=\"SubStatus\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Work Type\" prop=\"WorkType\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Created Date\" prop=\"CreatedDate\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <span *ngIf=\"!row.CreatedDate\" [title]=\"row.CreatedDate\">-</span>\r\n                          <span *ngIf=\"row.CreatedDate\" [title]=\"row.CreatedDate\">{{row.CreatedDate | DateTimeToLocal }}</span>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"End Date\" prop=\"EndDate\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <span *ngIf=\"!row.EndDate\" [title]=\"row.EndDate\">-</span>\r\n                          <span *ngIf=\"row.EndDate\" [title]=\"row.EndDate\">{{row.EndDate | DateTimeToLocal }}</span>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"FollowUp DateTime\" prop=\"FollowUpDateTime\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"FollowUp Note\" prop=\"FollowUpNote\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"lstWorkOrders.pager.pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"lstWorkOrders.pager.currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                            {{commonService.PageString(lstWorkOrders.pager.currentPage,lstWorkOrders.pager.pageSize,rowCount)}}\r\n                          </div>\r\n\r\n\r\n\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [page]=\"lstWorkOrders.pager.currentPage\"\r\n                                           [size]=\"lstWorkOrders.pager.pageSize\"\r\n                                           [count]=\"lstWorkOrders.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / lstWorkOrders.pager.pageSize) > 1)\"\r\n                                           (change)=\"setWorkorderPageNo($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"panel active\">\r\n              <div class=\"panel-heading\">\r\n                <h4 class=\"panel-title\">\r\n                  <a href=\"#proposal\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                    <span>Proposals ({{ProposalCount}})</span>\r\n                  </a>\r\n                </h4>\r\n              </div>\r\n              <div id=\"proposal\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                <div class=\"panel-body p-2 mt-0\">\r\n                  <div class=\"table-responsive ngxtbl\">\r\n                    <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                   [rows]=\"lstProposals.data\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [scrollbarH]=\"true\"\r\n                                   [rowHeight]=\"'40'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [footerHeight]=\"40\"\r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [count]=\"lstProposals.pager.totalItems\"\r\n                                   [offset]=\"lstProposals.pager.currentPage\"\r\n                                   [limit]=\"lstProposals.pager.pageSize\"\r\n                                   (page)='setProposalPageNo($event)'\r\n                                   (sort)=\"onProposalSort($event)\">\r\n                      <ngx-datatable-column name=\"Proposal Number\" prop=\"ProposalNumber\" [sortable]=\"true\"> </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Proposal Name\" prop=\"Name\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <a [routerLink]=\"['/proposal-list/viewproposal',row.Id]\">{{row.Name}}</a>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Total System Cost\" prop=\"TotalSystemCost\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Primary\" sortable=\"true\" prop=\"IsPrimary\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" disabled [checked]=\"row.IsPrimary\">\r\n                            <span class=\"slider round\"><span>Yes</span></span>\r\n                          </label>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"lstProposals.pager.pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"lstProposals.pager.currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                            <!--Showing {{(lstProposals.pager.currentPage - 1 )* lstProposals.pager.pageSize + 1}}  to {{lstProposals.pager.currentPage * lstProposals.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                            {{commonService.PageString(lstProposals.pager.currentPage,lstProposals.pager.pageSize,rowCount)}}\r\n                          </div>\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [page]=\"lstProposals.pager.currentPage\"\r\n                                           [size]=\"lstProposals.pager.pageSize\"\r\n                                           [count]=\"lstProposals.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / lstProposals.pager.pageSize) > 1)\"\r\n                                           (change)=\"setProposalPageNo($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <app-files title=\"Files\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{accountId}}\"></app-files>\r\n\r\n            <!--==============================================================================================================================-->\r\n            <!--======================================================Service Appointments=============================================================-->\r\n\r\n            <div class=\"panel active\">\r\n              <div class=\"panel-heading\">\r\n                <h4 class=\"panel-title\">\r\n                  <a href=\"#ServiceAppointments\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                    <span>Service Appointments ({{serviceAppointmentsCount}})</span>\r\n                  </a>\r\n                </h4>\r\n              </div>\r\n              <div id=\"ServiceAppointments\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                <div class=\"panel-body p-2 mt-0\">\r\n                  <div class=\"table-responsive ngxtbl\">\r\n                    <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                   [rows]=\"lstServiceAppointments.data\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [scrollbarH]=\"true\"\r\n                                   [rowHeight]=\"'40'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [footerHeight]=\"40\"\r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [count]=\"lstServiceAppointments.pager.totalItems\"\r\n                                   [offset]=\"lstServiceAppointments.pager.currentPage\"\r\n                                   [limit]=\"lstServiceAppointments.pager.pageSize\"\r\n                                   (page)='setserviceAppointmentPageNo($event)'\r\n                                   (sort)=\"onServiceAppointmentSort($event)\">\r\n\r\n                      <ngx-datatable-column name=\"Appointment Number\" prop=\"AppointmentNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Subject\" prop=\"Subject\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Scheduled Start\" prop=\"SchedStartTime\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          {{row.SchedStartTime | DateTimeToLocal}}\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Scheduled End\" prop=\"SchedEndTime\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          {{row.SchedEndTime | DateTimeToLocal}}\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Work Type\" prop=\"WorkType\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"lstServiceAppointments.pager.pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"lstServiceAppointments.pager.currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                            {{commonService.PageString(lstServiceAppointments.pager.currentPage,lstServiceAppointments.pager.pageSize,rowCount)}}\r\n                          </div>\r\n\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [page]=\"lstServiceAppointments.pager.currentPage\"\r\n                                           [size]=\"lstServiceAppointments.pager.pageSize\"\r\n                                           [count]=\"lstServiceAppointments.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / lstServiceAppointments.pager.pageSize) > 1)\"\r\n                                           (change)=\"setserviceAppointmentPageNo($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"panel active\">\r\n              <div class=\"panel-heading\">\r\n                <h4 class=\"panel-title\">\r\n                  <a href=\"#Product\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                    <span>Products ({{productCount}})</span>\r\n                  </a>\r\n                </h4>\r\n              </div>\r\n              <div id=\"Product\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                <div class=\"panel-body p-2 mt-0\">\r\n                  <div class=\"table-responsive ngxtbl\">\r\n                    <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                   [rows]=\"lstProducts.data\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [scrollbarH]=\"true\"\r\n                                   [rowHeight]=\"'40'\"\r\n                                   [footerHeight]=\"40\"\r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [count]=\"lstProducts.pager.totalItems\"\r\n                                   [offset]=\"lstProducts.pager.currentPage\"\r\n                                   [limit]=\"lstProducts.pager.pageSize\"\r\n                                   (page)='setProductsPageNo($event)'\r\n                                   (sort)=\"onProductsSort($event)\">\r\n\r\n                      <ngx-datatable-column name=\"Product Name \" prop=\"ProductName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Product Family\" prop=\"ProductFamily\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Product Code\" prop=\"ProductCode\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n\r\n                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"lstProducts.pager.pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"lstProducts.pager.currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                            {{commonService.PageString(lstProducts.pager.currentPage,lstProducts.pager.pageSize,rowCount)}}\r\n                          </div>\r\n\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [page]=\"lstProducts.pager.currentPage\"\r\n                                           [size]=\"lstProducts.pager.pageSize\"\r\n                                           [count]=\"lstProducts.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / lstProducts.pager.pageSize) > 1)\"\r\n                                           (change)=\"setProductsPageNo($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <!--==============================================================================================================================-->\r\n            <!--Notes-->\r\n            <div class=\"panel active\">\r\n              <div class=\"panel-heading\">\r\n                <h4 class=\"panel-title\">\r\n                  <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                    <span>Notes ({{notescount}}) </span>\r\n                    <!--<span>Notes</span>-->\r\n                  </a>\r\n                  <!--<a *ngIf=\"!IsStandard\" href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n        (click)=\"AddContact()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add Contact</a>-->\r\n                </h4>\r\n              </div>\r\n\r\n\r\n              <div id=\"panelBodynine\" class=\"panel-collapse active show p-0 border-0\" data-parent=\"#accordion\">\r\n                <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                   (click)=\"AddNote()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> New</a>\r\n\r\n\r\n\r\n                <div id=\"notes\" class=\"panel-collapse collapse active show\">\r\n\r\n                  <app-newnoteslist #listnotesmodel subModuleName=\"account\" [AccountId]=\"accountId\"\r\n                                    [ObjectRefId]=\"accountId\" (newItemEvent)=\"addItem($event)\">\r\n\r\n                  </app-newnoteslist>\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!--End-->\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<!--=================================================== Contact add ==================================================================-->\r\n<div bsModal #addContact=\"bs-modal\" [config]=\"{backdrop: 'static'}\"\r\n     class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-xl\" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Add Contact</h4>\r\n\r\n        <button type=\"button\" class=\"close\" (click)=\"closeContact()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:600px;\">\r\n        <app-addcontact #addcontact12 [accountId]=accountId [isAccount]=\"isAccount\" [ownerId]=\"ownerId\" [solgenpower]=\"solgenpower\"\r\n                        solgenpower=true [newItemEvent]=\"recordId\" (contactemit)=\"contactmsg(true)\"></app-addcontact>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<ng-container *ngIf=\"isVisibleWelcomeCall\">\r\n  <!--<div>\r\n    <app-voicecall #voiceCallPopup columnName=\"MobilePhone\" refTable=\"tblContacts\" refColumn=\"AccountId\" refId=\"{{accountId}}\" (refreshParentEmitter)=\"closeWelcomeCall()\"></app-voicecall>\r\n  </div>-->\r\n  <div class=\"welcome-call active\">\r\n    <app-welcomecallpopup #welcomecall title=\"Welcome Call\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{accountId}}\" (refreshParentEmitter)=\"closeWelcomeCall()\"></app-welcomecallpopup>\r\n  </div>\r\n</ng-container>\r\n\r\n\r\n<div id=\"audioModal\" bsModal #audioModel=\"bs-modal\" [config]=\"{backdrop: 'static'}\" style=\" background: none !important;\" class=\"modal fade announcement-pop\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" style=\"height:450px!important;width:100%!important; \">\r\n    <div class=\"modal-content\" style=\"z-index:1; height:auto;\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{modalTitle}}</h4>\r\n        <button type=\"button\" (click)=\"CloseAudio()\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" style=\"padding: 13px 17px;\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow-y: visible; overflow-x: visible;\">\r\n        <ng-container *ngIf=\"isAudio; else elseblock\">\r\n          <div class=\"text-center\">\r\n            <audio controls controlsList=\"nodownload\" [src]=\"audioSrc\" href=\"audioSrc\" type=\"audio/ogg\" style=\"width:100%!important\">\r\n              Browser not supported\r\n            </audio>\r\n            <!--<iframe [src]=\"audioSrc\" width=\"100%\" height=\"100%\" frameBorder=\"0\" ></iframe>-->\r\n          </div>\r\n        </ng-container>\r\n\r\n\r\n      </div>\r\n\r\n    </div>\r\n    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n  </div>\r\n\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/addeditaccounts.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/addeditaccounts.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/accountslist\">Manage Accounts</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList;let i=index\">\r\n\r\n        <h3 class=\"form-heading\" *ngIf=\"showgroup(item.InnerData)\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row mb-2\">\r\n\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'\" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n    <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n  </a>-->\r\n\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">\r\n\r\n                <!--text  [placeholder]=\"inner.display_name\" [(ngModel)]=\"accountCompName\" -->\r\n                <!--Account Name textbox-->\r\n                <input type=\"text\" (change)=\"setCompanyName($event,formControlList)\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty\r\n                                              || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required\r\n                                              || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.name=='Name' && inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio'\r\n                                     && inner.dt_code!='boolean' && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox'\r\n                                     && inner.dt_code !='date'   && inner.dt_code !='int'    && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='map' && inner.dt_code !='map_search' && inner.dt_code!='fileupload'\" />\r\n                <!--Company Name textbox-->\r\n                <input type=\"text\" class=\"form-control\" (change)=\"removeSpaceCompanyName($event,formControlList)\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty\r\n                                              || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required\r\n                                              || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.name=='dealercompanyname' && inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio'\r\n                                     && inner.dt_code!='boolean' && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox'\r\n                                     && inner.dt_code !='date'   && inner.dt_code !='int'    && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='map' && inner.dt_code !='map_search' && inner.dt_code!='fileupload'\" />\r\n\r\n                <!--Company Name textbox-->\r\n            \r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty\r\n                                              || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required\r\n                                              || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"showSplitPercentage && inner.name=='splitpercentage' && inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio'\r\n                                     && inner.dt_code!='boolean' && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox'\r\n                                     && inner.dt_code !='date'   && inner.dt_code !='int'    && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='map' && inner.dt_code !='map_search' && inner.dt_code!='fileupload'\" />\r\n\r\n            \r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty\r\n                                              || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required\r\n                                              || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.name!='Name' && inner.name!='dealercompanyname' && inner.name!='splitpercentage' &&inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio'\r\n                                      && inner.dt_code!='boolean' && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox'\r\n                                     && inner.dt_code !='date'   && inner.dt_code !='int'    && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='map' && inner.dt_code !='map_search' && inner.dt_code!='fileupload'\" />\r\n\r\n              \r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'map'\">\r\n                  <div [innerHTML]=\"inner.value\"></div>\r\n                </div>\r\n\r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'map_search' && displayType == 'ADD'\">\r\n                  <a (click)=\"mapPopUP()\" href=\"javascript:void(0);\" class=\"btn btn-info\"><i class=\"fa fa-search mr-2\"></i> Search Location</a>\r\n                </div>\r\n\r\n                <!--============================== For int   ===========================-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid\r\n                                   && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched)\r\n                                   && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched && form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid Numeric value</small>\r\n                <!--=======================================================================-->\r\n                <!--<small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty)\r\n  || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n  class=\"text-danger\">{{inner.display_name}} is required</small>-->\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n                \r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n                \r\n                <!--<small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>-->\r\n                \r\n                <!--<small *ngIf=\"inner.dt_code == 'decimal' && ((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>-->\r\n                \r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n                <!--============================== For Date   ===========================-->\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n\r\n                <div class=\"row\" *ngIf=\"inner.dt_code == 'fileupload'\">\r\n                  <div class=\"col-md-10 col-lg-10 mb-0\">\r\n                    <div class=\"custom-file w-100\">\r\n                      <input class=\"custom-file-input\" #file type=\"file\" name='file' #fileInput accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"setFile($event)\" lang=\"es\">\r\n                      <label class=\"custom-file-label\">{{fileName}}</label>\r\n                    </div>\r\n                    <small><i class=\"text-primary\">Valid image format is image/x-png, image/gif, image/jpeg and limit upto 10MB.</i> </small>\r\n                  </div>\r\n                  <div class=\"col-md-2 col-lg-2 mb-0\" *ngIf=\"imageLink!=''\">\r\n                    <span class=\"uploadedimg\">\r\n                      <img src={{imageLink}} alt=\"img\" style=\"height:37px; width:40px; cursor:pointer\" data-toggle=\"modal\" data-target=\"#myModal\"><a href=\"javascript:void(0);\" (click)=\"delImage(userID,fileUrl)\" *ngIf=\"imageLink.indexOf('NoImage')<0\"><i title=\"Delete\" class=\"fas fa-trash-alt\"></i></a>\r\n                    </span>\r\n\r\n                    <div id=\"myModal\" style=\" background: none !important;\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n                      <div class=\"modal-dialog\" style=\"max-height:320px!important; max-width:320px!important; \">\r\n                        <div class=\"\">\r\n                          <button type=\"button\" class=\"close\" style=\"color: #fff!important; \" data-dismiss=\"modal\">&times;</button>\r\n                        </div>\r\n                        <div class=\"modal-content\">\r\n                          <div class=\"text-center\">\r\n                            <img src={{imageLink}} alt=\"img\" style=\"height:320px!important;width:320px!important; \" class=\"img-responsive\">\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <!--=====================================================================-->\r\n                <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n  [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                <!--end calandar-->\r\n                <!--Checkbox-->\r\n\r\n\r\n\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--<div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n    <div class=\"form-check form-check-inline\">\r\n      <div class=\"custom-control custom-checkbox\">\r\n\r\n        <input id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\"\r\n               class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}\">{{inner.display_name}}</label>\r\n\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n                <!--============================== For Boolean ===========================-->\r\n\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" (click)=\"checkToggle($event,formControlList,inner.name)\">\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <!--============================================================================-->\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n\r\n\r\n\r\n                        <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                 [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n          <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--Ng Dropdown-->\r\n                <!--Load on scroll-->\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (clear)=\"onClearLang(item.InnerData,j)\"\r\n                           (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.ColumnName!='RecordTypeId' && inner.ColumnName!='funding_options' && inner.dropdown_type==null\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n                <!--Account Type-->\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (click)=\"checkbank($event,formControlList)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.ColumnName=='RecordTypeId'&& inner.dropdown_type==null\"\r\n                           [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n                <!--Funding Options-->\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (click)=\"checkFundingOptions($event,formControlList)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.ColumnName=='funding_options'&& inner.dropdown_type==null\"\r\n                           [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n                <!--Multiselect dropdown-->\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true'&& inner.dropdown_type==null\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <!--Normal dropdown-->\r\n                <!--&& !inner.is_readOnly-->\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           [ngClass]=\"{'disabledddl':inner.is_readOnly}\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.ColumnName!='RecordTypeId' && inner.ColumnName!='funding_options' && inner.field_code!=null && inner.dropdown_type=='Normal'\"\r\n                           [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n          \r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n            \r\n\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row  mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n<div class=\"modal fade show\" bsModal #mapLocation=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-xl modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Search Location</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closemapsearch()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow: auto; margin-bottom: 10px; max-height: 496px; overflow-x: hidden; line-height: 24px; font-size: 13px;\">\r\n        <div class=\"row mb-3\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"pac-card\" id=\"pac-card\">\r\n\r\n              <div id=\"pac-container\" class=\"form-group\">\r\n                <input id=\"pac-input\" class=\"form-control\" type=\"text\" placeholder=\"Enter a location\" />\r\n              </div>\r\n            </div>\r\n            <div id=\"map\" class=\"d-none\"></div>\r\n          </div>\r\n        </div>\r\n        <!--<p-gmap [options]=\"options\" [overlays]=\"overlays\" [style]=\"{'width':'100%','height':'400px'}\"></p-gmap>-->\r\n\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/internalaccounts/accountslist.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/views/internalaccounts/accountslist.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2ludGVybmFsYWNjb3VudHMvYWNjb3VudHNsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/internalaccounts/accountslist.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/views/internalaccounts/accountslist.component.ts ***!
  \******************************************************************/
/*! exports provided: AccountslistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountslistComponent", function() { return AccountslistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _accountservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accountservice.service */ "./src/app/views/internalaccounts/accountservice.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
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









var AccountslistComponent = /** @class */ (function () {
    function AccountslistComponent(internalAccountService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.internalAccountService = internalAccountService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.moduleName = 'crm';
        this.submoduleName = 'account';
        this.custom_view_id = '';
        this.searchUserType = '';
        // modulePermission: ModuleList;
        this.modulePermission = [];
        this.ViewModel = '';
        //loading = false;
        //modulePermission: ModuleList;
        this.loadSave = false;
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["SelectionType"];
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.listFiltertext = '';
        this.tableName = 'tblaccounts';
        this.isApproveAccount = false;
        this.selected = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.myCheckbox = false;
        // alert(1);
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        //console.log('modulePermission', this.modulePermission);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'ACCOUNTADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'ACCOUNTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'ACCOUNTDELETE'; });
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
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
            _this.companyType = userdetail.companyType;
        });
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
    }
    AccountslistComponent.prototype.ngOnInit = function () {
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.LoadViewData();
        this.refresh();
    };
    AccountslistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    AccountslistComponent.prototype.GetcustomViewid = function (event) {
        var _this = this;
        if (event == 'undefined' || typeof event == 'undefined') {
            //this.isAddViewFirstTime = true;
            this.LoadViewData();
        }
        this.pagedData.data.forEach(function (cnt) {
            if (cnt.custom_view_id == event) {
                _this.ViewModel = cnt.view_name;
            }
        });
        this.vewId = event;
        this.custom_view_id = event;
        this.refresh();
    };
    AccountslistComponent.prototype.getListingColorCode = function (fieldValue) {
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        return this.lstListingColorCode;
    };
    AccountslistComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loadSave = true;
        this.internalAccountService.GetAccountsList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.myCheckbox)
            .subscribe(function (response) {
            _this.jsonData = response;
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            // console.log("this.columnheading", this.columnheading); 
            _this.columnheading.forEach(function (element) {
                element["colwidth"] = (String(element.DISPLAY_NAME).split(' ').join('_').length * 12) + 12;
                //   this.tableModal.width = (String(element.DISPLAY_NAME).split(' ').join('_').length * 12) + 12;
            });
            if (response.data.length > 0) {
                _this.totalRecords = _this.columndata[0].total_records;
                // console.log("Data", this.jsonData.schema);
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
    Object.defineProperty(AccountslistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    AccountslistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    AccountslistComponent.prototype.setPage = function ($event) {
        this.loadSave = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    AccountslistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    AccountslistComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    AccountslistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    AccountslistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    AccountslistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "Name like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    AccountslistComponent.prototype.reset = function () {
        this.table.selected = [];
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.myCheckbox = false;
        this.refresh();
    };
    AccountslistComponent.prototype.onSelect = function (_a) {
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
    AccountslistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    AccountslistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete the selected account(s)?";
            this.dialogService.confirm('Delete Account(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.internalAccountService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
                        _this.toaster.success("Record(s) has been deleted successfully");
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
    AccountslistComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Account \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete Account', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.internalAccountService.DeleteRecords(row.Id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Account \"" + row.Name + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    AccountslistComponent.prototype.ApproveAccount = function (row) {
        var _this = this;
        var message = "Are you sure you want to Approve Account \"" + row.Name + "\"?";
        this.dialogService.confirm('Approve Account', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.internalAccountService.AppeoveAccount(row.Id, _this.tableName).subscribe(function (r) {
                    // console.log("approve account", this.internalAccountService.editPage);
                    if (_this.internalAccountService.editPage.statusCode == 200) {
                        _this.toaster.success("Account \"" + row.Name + "\" has been approved successfully");
                        _this.refresh();
                        _this.isApproveAccount = true;
                    }
                    else {
                        _this.toaster.error(_this.internalAccountService.editPage.responseMessage);
                        _this.refresh();
                    }
                }, function (error) {
                });
            }
        });
    };
    AccountslistComponent.prototype.LoadViewData = function () {
        var _this = this;
        this.loadSave = true;
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.internalAccountService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.internalAccountService.pagedData;
            _this.pagedData.data.forEach(function (cnt) {
                if (cnt.is_default == true) {
                    _this.vewId = cnt.custom_view_id;
                    _this.ViewModel = cnt.view_name;
                }
            });
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AccountslistComponent.prototype.SetManageViewValue = function (event, text) {
        this.ViewModel = text;
        this.custom_view_id = event;
        this.refresh();
        //this.LoadViewData();
    };
    AccountslistComponent.prototype.switchClicked = function (event) {
        this.listFiltertext = '';
        this.myCheckbox = event.srcElement.checked;
        this.currentPage = 1;
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "Name like '%" + this.listFilter + "%'";
        }
        if (this.listFiltertext.trim().length > 0) {
            this.refresh();
        }
        if (this.myCheckbox == false) {
            this.refresh();
        }
    };
    AccountslistComponent.ctorParameters = function () { return [
        { type: _accountservice_service__WEBPACK_IMPORTED_MODULE_2__["AccountserviceService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__["SearchfilteraddComponent"])
    ], AccountslistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_7__["ManageviewComponent"])
    ], AccountslistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], AccountslistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('table', { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], AccountslistComponent.prototype, "tableModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AccountslistComponent.prototype, "offset", void 0);
    AccountslistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-accountslist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./accountslist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/accountslist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./accountslist.component.scss */ "./src/app/views/internalaccounts/accountslist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_accountservice_service__WEBPACK_IMPORTED_MODULE_2__["AccountserviceService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], AccountslistComponent);
    return AccountslistComponent;
}());



/***/ }),

/***/ "./src/app/views/internalaccounts/accountviewdetail.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/views/internalaccounts/accountviewdetail.component.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2ludGVybmFsYWNjb3VudHMvYWNjb3VudHZpZXdkZXRhaWwuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/internalaccounts/accountviewdetail.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/internalaccounts/accountviewdetail.component.ts ***!
  \***********************************************************************/
/*! exports provided: AccountviewdetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountviewdetailComponent", function() { return AccountviewdetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _accountservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accountservice.service */ "./src/app/views/internalaccounts/accountservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _lender_lenderlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lender/lenderlist.service */ "./src/app/views/lender/lenderlist.service.ts");
/* harmony import */ var _lender_documentmapping_documentmapping_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lender/documentmapping/documentmapping.component */ "./src/app/views/lender/documentmapping/documentmapping.component.ts");
/* harmony import */ var _lender_upload_document_upload_document_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lender/upload-document/upload-document.component */ "./src/app/views/lender/upload-document/upload-document.component.ts");
/* harmony import */ var _lender_data_routing_data_routing_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lender/data-routing/data-routing.component */ "./src/app/views/lender/data-routing/data-routing.component.ts");
/* harmony import */ var _lender_routing_delivery_routing_delivery_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lender/routing-delivery/routing-delivery.component */ "./src/app/views/lender/routing-delivery/routing-delivery.component.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _manageuser_addedituser_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../manageuser/addedituser.service */ "./src/app/views/manageuser/addedituser.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
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

















var AccountviewdetailComponent = /** @class */ (function () {
    function AccountviewdetailComponent(fb, userService, commonService, accountserviceService, dialogService, router, internalAccountService, toaster, route, lenderService, userServicepassword, titleService) {
        var _this = this;
        this.fb = fb;
        this.userService = userService;
        this.commonService = commonService;
        this.accountserviceService = accountserviceService;
        this.dialogService = dialogService;
        this.router = router;
        this.internalAccountService = internalAccountService;
        this.toaster = toaster;
        this.route = route;
        this.lenderService = lenderService;
        this.userServicepassword = userServicepassword;
        this.titleService = titleService;
        this.loadSave = false;
        this.isSave = false;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.checked = false;
        this.disabled = false;
        this.slider = false;
        //isSave = false;
        this.tableName = '';
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'createdOn';
        this.IsStandard = false;
        this.isDealerAccount = false;
        this.listFilter = "";
        this.isUsertypeBanker = false;
        this.banker = false;
        this.dealer = false;
        this.isCompanyAdmin = false;
        this.loanDocuments = [];
        this.loadDocuments = false;
        this.dataRoutes = [];
        this.loadRoutes = false;
        this.webmergeMappingsPagedData = {
            pager: {},
            data: []
        };
        this.loadWebmergeMappingsPagedData = false;
        this.currentPage = 1;
        this.isEmailConfirmed = false;
        this.setPasswordModel = new _shared_user_service__WEBPACK_IMPORTED_MODULE_13__["SetPassword"]();
        this.url = "";
        this.sitetitle = '';
        this.siteURL = "";
        this.Email = "";
        this.hideLoginBtn = true;
        this.forgotPswModel = new _shared_user_service__WEBPACK_IMPORTED_MODULE_13__["ForgotPassword"]();
        this.setPasswordForm = this.fb.group({
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        }, {
            validator: PasswordMatch('password', 'confirmPassword')
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (user) {
            _this.user = user;
            console.log('data', user);
            _this.loginid = user.id;
            // this.loginid = 'DD5BC949-B8DC-4FDE-A31A-E85DFE925933';
            console.log('this.loginid', _this.loginid);
            if (user.userType == "usertypebanker") {
                _this.banker = true;
            }
            if (user.userType == "usertypedealer") {
                _this.dealer = true;
            }
            if (user.userType == "usertypecompanyadmin") {
                _this.isCompanyAdmin = true;
            }
            else {
                _this.isCompanyAdmin = false;
            }
            //  alert(this.isCompanyAdmin);
        });
    }
    AccountviewdetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.getPageSizes();
        this.url = window.location.href;
        this.url = this.url.slice(9, 19);
        //---setting Logo on basis of URL
        this.userServicepassword.GetSiteURl(this.url).subscribe(function (result) {
            console.log('dataa', result);
            _this.urldata = JSON.parse(result);
            if (result != null) {
                _this.siteimage = _this.urldata[0].SiteLoginLogo;
                _this.sitetitle = _this.urldata[0].SiteTitle;
                _this.setTitle(_this.sitetitle);
            }
            else {
                _this.sitetitle = 'SolgenOne';
                _this.setTitle(_this.sitetitle);
                _this.siteimage = 'assets/default-theme/imagesNew/login-logo-solgen.png';
            }
        });
        if (this.router.url.indexOf('app.loanhomi') > 0) {
            this.siteURL = "loanhomi";
        }
        else if (this.router.url.indexOf('app.solgenone') > 0) {
            this.siteURL = "solgenone";
        }
        else if (this.router.url.indexOf('solgen.zorbis') > 0) {
            this.siteURL = "solgenone";
        }
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.accountId = id;
            if (id) {
                _this.loadSave = true;
                _this.GetAccountDetails(id);
                _this.GetLoanProductDiscountCategoryEdit('1');
                _this.pageTitle = 'Account Detail';
                _this.addOrUpdatePermission = _this.modulePermission.roleModuleUpdateFlag;
                _this.pageSizeValue = 10;
                _this.currentPage = 1;
                _this.getPageSizes();
                _this.GetLoanDocuments(id);
                _this.GetDataRoutes(id);
                _this.GetWebmergeMappings(id);
            }
            else {
                _this.pageTitle = 'Add Account';
                _this.addOrUpdatePermission = _this.modulePermission.roleModuleAddFlag;
            }
            _this.getRoleListForEnableLogin(_this.accountId);
        });
    };
    AccountviewdetailComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    AccountviewdetailComponent.prototype.updateFilter = function (event) {
        //this.searchTxt = event.target.value;
        //let keycode = (event.keyCode ? event.keyCode : event.which);
        //if (keycode === 13 || keycode === '13') {
        //  this.search();
    };
    AccountviewdetailComponent.prototype.searchByName = function () {
        debugger;
        this.currentPage = 1;
        this.GetLoanProductDiscountCategoryEdit(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_16__["id"]);
    };
    AccountviewdetailComponent.prototype.resetName = function () {
        debugger;
        this.listFilter = '';
        this.currentPage = 1;
        this.GetLoanProductDiscountCategoryEdit(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_16__["id"]);
    };
    AccountviewdetailComponent.prototype.GetAccountDetails = function (id) {
        var _this = this;
        this.loadSave = true;
        this.accountserviceService.GetAccounDetails(id).subscribe(function (result) {
            if (result) {
                console.log("Account Detail", result);
                _this.AccountDetails = result;
                if (_this.AccountDetails.isRoleApply == true) {
                    _this.isUsertypeBanker = true;
                }
                if (_this.AccountDetails.userType == 'Standard') {
                    _this.IsStandard = true;
                }
                if (_this.AccountDetails.userType == 'Dealer') {
                    _this.isDealerAccount = true;
                }
                _this.search();
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AccountviewdetailComponent.prototype.AddContact = function () {
        // this.router.navigateByUrl("/addContact/account/1");
        //this.router.navigate(['../contact/addContact/account', this.accountId]);
        // this.router.navigate(['../contactlist/addContact/account', this.accountId]);
        this.router.navigate(['../contactlist/addContact/account', this.accountId]);
    };
    AccountviewdetailComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    AccountviewdetailComponent.prototype.getRoleListForEnableLogin = function (accountId) {
        var _this = this;
        this.internalAccountService.getRoleListForEnableLogin(accountId).subscribe(function (res) {
            _this.lstRole = res;
            console.log("Roles", _this.lstRole);
            console.log("Roles", res);
        });
    };
    AccountviewdetailComponent.prototype.SetEnableAccount = function (id, event, name, row) {
        var _this = this;
        if (row.EnableUser == false) {
            var message = "Are you sure you want to Disable Account \"" + name + "\"?";
            this.dialogService.confirm('Disbale Account', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.checked = true;
                    _this.loading = true;
                    _this.internalAccountService.DisabledAccount(id, _this.tableName).subscribe(function (r) {
                        // console.log("Disabled account", this.internalAccountService.editPage);
                        if (_this.internalAccountService.editPage.statusCode == 300) {
                            _this.search();
                            _this.toaster.success("Account has been disabled successfully!");
                            _this.loading = false;
                        }
                        else {
                            _this.search();
                            _this.loading = false;
                            _this.toaster.error(_this.internalAccountService.editPage.responseMessage);
                        }
                    }, function (error) {
                    });
                }
                _this.search();
                //this.
            });
        }
        else {
            if (row.Email != null && row.Email != '') {
                this.slider = true;
                this.checked = true;
                //this.search();
                var message = "Are you sure you want to Enable Account Login \"" + name + "\"?";
                this.dialogService.confirm(event + ' ' + 'Account Login', message).subscribe(function (confirmed) {
                    if (confirmed) {
                        _this.loading = true;
                        _this.checked = true;
                        _this.internalAccountService.AppeoveAccount(id, _this.tableName).subscribe(function (r) {
                            // console.log("approve account", this.internalAccountService.editPage);
                            if (_this.internalAccountService.editPage.statusCode == 200) {
                                _this.search();
                                _this.toaster.success("Account \"" + name + "\" has been Enable login successfully");
                                _this.loading = false;
                            }
                            else {
                                _this.search();
                                _this.toaster.error(_this.internalAccountService.editPage.responseMessage);
                                _this.loading = false;
                            }
                        }, function (error) {
                            _this.loading = false;
                        });
                    }
                    _this.loading = false;
                    _this.slider = false;
                    _this.checked = false;
                    _this.search();
                });
            }
            else {
                this.toaster.error('Can not enable login because contact email not available!');
                this.search();
                this.slider = false;
                this.checked = false;
                this.loading = false;
            }
        }
    };
    AccountviewdetailComponent.prototype.search = function () {
        var _this = this;
        //alert(1);
        this.loadSave = true;
        this.pageSizeValue = 10;
        this.accountserviceService.ContactList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.accountId).subscribe(function (response) {
            _this.pagedData = response;
            console.log("pagedData", response);
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AccountviewdetailComponent.prototype.close = function () {
        this.router.navigateByUrl("/accountslist");
    };
    AccountviewdetailComponent.prototype.initForm = function () {
        this.configurationSetings = this.fb.group({
            accoundetailView: this.fb.array([])
        });
    };
    Object.defineProperty(AccountviewdetailComponent.prototype, "accoundetailView", {
        get: function () {
            return this.configurationSetings.get('accoundetailView');
        },
        enumerable: true,
        configurable: true
    });
    AccountviewdetailComponent.prototype.buildLoanProductDiscountCategoryFields = function () {
        return this.fb.group({
            accountId: [''],
            name: [''],
            email: [''],
            phone: [''],
            mobile: [''],
            isPrimary: [false],
            enableLogin: [false],
            role: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            isPrimaryForDisabled: [false],
            userId: [''],
            contactID: ['']
        });
    };
    AccountviewdetailComponent.prototype.GetLoanProductDiscountCategoryEdit = function (id) {
        var current = this;
        this.configurationSetings = this.fb.group({
            accoundetailView: this.fb.array([])
        });
        this.accountserviceService.ContactList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.accountId).subscribe(function (result) {
            console.log("EditACCC", result);
            result.forEach(function (value) {
                var group = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                    accountId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.AccountId),
                    contactID: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.contactID),
                    name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.Name),
                    email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.Email),
                    isPrimary: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.IsPrimary),
                    isPrimaryForDisabled: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.EnableUser),
                    enableLogin: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.EnableUser),
                    phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.Phone),
                    mobile: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.MobilePhone),
                    role: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.Role == '' ? null : value.Role),
                    userId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.userId == null ? null : value.userId),
                    emailConfirmed: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.EmailConfirmed),
                    checkEnabledLogin: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.CheckEnabledLogin)
                });
                current.accoundetailView.push(group);
            });
        });
    };
    AccountviewdetailComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        input.append('accountId', this.accountId);
        input.append('contactList', JSON.stringify(this.accoundetailView.value));
        return input;
    };
    AccountviewdetailComponent.prototype.validator = function (field) {
        if (field.get('enableLogin').value) {
            if (this.isUsertypeBanker == true) {
                //field.get('role').setValue(null);
                field.get('role').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
                field.get('role').updateValueAndValidity();
            }
            else {
                field.get('role').setValue(null);
                field.get('role').clearValidators();
                field.get('role').updateValueAndValidity();
            }
        }
        else {
            //field.get('role').setValue(null);
            field.get('role').clearValidators();
            field.get('role').updateValueAndValidity();
        }
    };
    AccountviewdetailComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.configurationSetings.valid) {
            this.loadSave = true;
            var loanproductModel = this.prepareFormDataForDocument();
            console.log("loanproductModel", loanproductModel);
            this.accountserviceService.addOrUpdateManageStatusForAccountDetails(loanproductModel, this.accountId).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.router.navigateByUrl("/accountslist");
                    //this.SetStatusData(this.field);
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
        else {
            this.commonService.validateAllFormFields(this.configurationSetings);
            console.log("LoanProduct", this.configurationSetings);
        }
    };
    AccountviewdetailComponent.prototype.selectUser = function (event, field) {
        if (event == undefined) {
            field.get('role').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            field.get('role').updateValueAndValidity();
        }
        else {
            this.roleId = event.value;
            this.hideLoginBtn = false;
        }
    };
    AccountviewdetailComponent.prototype.EnableLoginForAllUser = function (field) {
        var _this = this;
        debugger;
        console.log('field', field);
        if (field.valid) {
            if (field.value.enableLogin == true && field.value.isPrimary == true) {
                this.loadSave = true;
                //field.value.role = 0;
                if (this.IsStandard == false) {
                    this.accountserviceService.CheckUserDuplicateORAssociate(field.value.email, '').subscribe(function (result) {
                        // console.log("result", result);
                        debugger;
                        if (result.responseMessage == "duplicate") {
                            _this.isSave = false;
                            _this.loadSave = false;
                            _this.onSubmitForSingle(field.value);
                            // this.toaster.error("Email Already Exists");
                            return false;
                        }
                        else if (result.responseMessage == "associate") {
                            //already exists in ASPnetUsers-- now add only in maping table after confirmation
                            _this.loadSave = false;
                            _this.dialogService.confirm('Associate Account', "Email already exists in other Company. Do you want to Associate it?").subscribe(function (confirmed) {
                                if (confirmed) {
                                    //save in maping table
                                    if (_this.IsStandard == false) {
                                        _this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', _this.accountId).subscribe(function (result) {
                                            if (result.statusCode == 200) {
                                                _this.toaster.success("Account has been Approved successfully.");
                                                //this.router.navigateByUrl("/accountslist");
                                                _this.search();
                                                setTimeout(function () { _this.loadSave = false; }, 3000);
                                            }
                                        });
                                    }
                                    else if (_this.IsStandard == true) {
                                        _this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', _this.accountId).subscribe(function (result) {
                                            if (result.statusCode == 200) {
                                                _this.toaster.success("Account has been Approved successfully.");
                                                //this.router.navigateByUrl("/accountslist");
                                                _this.search();
                                                setTimeout(function () { _this.loadSave = false; }, 3000);
                                            }
                                        });
                                    }
                                    else {
                                        _this.toaster.error("Please select Role!");
                                    }
                                    _this.isSave = false;
                                    return false;
                                }
                                else { //do nothing
                                    _this.isSave = false;
                                    return false;
                                }
                            });
                        }
                        else {
                            if (field.value.role == null || _this.IsStandard == false) {
                                _this.onSubmitForSingle(field.value);
                            }
                            else {
                                _this.loadSave = false;
                                _this.toaster.error("Please select Role!");
                            }
                        }
                    });
                }
                else if (this.IsStandard == true) {
                    this.loadSave = false;
                    //this.toaster.error("Please select Role!");
                    this.onSubmitForSingle(field.value);
                }
                else {
                    this.loadSave = false;
                    this.toaster.error("Please select Role!");
                }
            }
            else if (field.value.enableLogin == true && field.value.isPrimary == false) {
                this.loadSave = true;
                if (this.IsStandard == false && (field.value.role != null && field.value.role != '')) {
                    this.accountserviceService.CheckUserDuplicateORAssociate(field.value.email, '').subscribe(function (result) {
                        // console.log("result", result);
                        if (result.responseMessage == "duplicate") {
                            _this.isSave = false;
                            _this.loadSave = false;
                            //this.toaster.error("Email Already Exists");
                            _this.onSubmitForSingle(field.value);
                            return false;
                        }
                        else if (result.responseMessage == "associate") {
                            //already exists in ASPnetUsers-- now add only in maping table after confirmation
                            _this.loadSave = false;
                            _this.dialogService.confirm('Associate Account', "Email already exists in other Company. Do you want to Associate it?").subscribe(function (confirmed) {
                                if (confirmed) {
                                    //save in maping table
                                    if (_this.IsStandard == false && (field.value.role != null && field.value.role != '')) {
                                        _this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', _this.accountId).subscribe(function (result) {
                                            if (result.statusCode == 200) {
                                                _this.toaster.success("Account has been Approved successfully.");
                                                //this.router.navigateByUrl("/accountslist");
                                                _this.search();
                                                setTimeout(function () { _this.loadSave = false; }, 3000);
                                            }
                                        });
                                    }
                                    else if (_this.IsStandard == true) {
                                        _this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', _this.accountId).subscribe(function (result) {
                                            if (result.statusCode == 200) {
                                                _this.toaster.success("Account has been Approved successfully.");
                                                //this.router.navigateByUrl("/accountslist");
                                                _this.search();
                                                setTimeout(function () { _this.loadSave = false; }, 3000);
                                            }
                                        });
                                    }
                                    else {
                                        _this.toaster.error("Please select Role!0");
                                    }
                                    _this.isSave = false;
                                    return false;
                                }
                                else { //do nothing
                                    _this.isSave = false;
                                    return false;
                                }
                            });
                        }
                        else {
                            if (field.value.role == null || _this.IsStandard == false) {
                                _this.onSubmitForSingle(field.value);
                            }
                            else {
                                _this.loadSave = false;
                                _this.toaster.error("Please select Role!3");
                            }
                        }
                    });
                }
                else {
                    this.loadSave = false;
                    //this.toaster.error("Please select Role!");
                    this.onSubmitForSingle(field.value);
                }
            }
            else if (field.value.enableLogin == false && field.value.isPrimary == true) {
                this.loadSave = true;
                this.onSubmitForSingle(field.value);
            }
            else {
                this.loadSave = true;
                this.onSubmitForSingle(field.value);
            }
        }
    };
    AccountviewdetailComponent.prototype.onSubmitForSingle = function (field) {
        var _this = this;
        if (field.email == null || field.email == '') {
            this.toaster.error("can't enable login, because email is empty!");
            this.loadSave = false;
        }
        else {
            this.loadSave = true;
            var loanproductModel = this.prepareFormDataForDocumentForEnableSingleClick(field);
            console.log("loanproductModel", loanproductModel);
            this.accountserviceService.addOrUpdateManageStatusForAccountDetails(loanproductModel, this.accountId).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    //this.router.navigateByUrl("/accountslist");
                    var control2 = _this.configurationSetings.controls.accoundetailView;
                    control2.controls = [];
                    _this.GetLoanProductDiscountCategoryEdit(_this.accountId);
                    //this.SetStatusData(this.field);
                    setTimeout(function () { _this.loadSave = false; }, 3000);
                }
                else {
                    _this.loadSave = false;
                    //this.GetAccountDetails(this.accountId);
                    var current = _this;
                    _this.toaster.error(result.responseMessage);
                    //setTimeout(() => { this.loadSave = false; }, 4000);
                    //alert(1);
                    //this.accoundetailView.clear();
                    var control2 = _this.configurationSetings.controls.accoundetailView;
                    control2.controls = [];
                    _this.GetLoanProductDiscountCategoryEdit(_this.accountId);
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
    };
    AccountviewdetailComponent.prototype.prepareFormDataForDocumentForEnableSingleClick = function (field) {
        var input = new FormData();
        input.append('accountId', this.accountId);
        input.append('contactList', JSON.stringify(field));
        return input;
    };
    AccountviewdetailComponent.prototype.isPrimaryValidator = function (field, i) {
        var _this = this;
        var message = "Are you sure you want to change Primary?";
        this.dialogService.confirm('Enable Primary Contact', message).subscribe(function (confirmed) {
            if (confirmed) {
                if (field.get('isPrimary').value) {
                    _this.accoundetailView.controls.forEach(function (m) {
                        m.get('isPrimary').setValue(false);
                    });
                    field.get('isPrimary').setValue(true);
                    console.log("TrueIsPrimary", field);
                    console.log("All Change", _this.accoundetailView.controls);
                }
                else {
                    field.get('isPrimary').setValue(false);
                }
            }
            else {
                if (field.get('isPrimary').value) {
                    field.get('isPrimary').setValue(false);
                }
                else {
                    field.get('isPrimary').setValue(true);
                }
            }
        });
    };
    AccountviewdetailComponent.prototype.goToContact = function (id) {
        this.router.navigate(['../contactlist/editContact', id], { queryParams: { account: this.accountId } });
        // this.router.navigate(['../contactlist/editContact', id]);
    };
    AccountviewdetailComponent.prototype.GetLoanDocuments = function (id) {
        var _this = this;
        this.loadDocuments = true;
        this.lenderService.getWebmergeDocuments(id).subscribe(function (resp) {
            _this.loadDocuments = false;
            _this.loanDocuments = resp.filter(function (r) { return r.active == true; });
        }, function (err) {
            _this.loadDocuments = false;
        });
    };
    AccountviewdetailComponent.prototype.GetDataRoutes = function (bankId) {
        var _this = this;
        this.loadRoutes = true;
        this.lenderService.getWebmergeDataRoutes(bankId).subscribe(function (dataRoutes) {
            _this.dataRoutes = dataRoutes;
            _this.loadRoutes = false;
        }, function (err) {
            _this.loadRoutes = false;
        });
    };
    AccountviewdetailComponent.prototype.GetWebmergeMappings = function (bankId) {
        var _this = this;
        this.loadWebmergeMappingsPagedData = true;
        this.lenderService.getWebmergeMappingsList(bankId, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe(function (mappingsList) {
            _this.loadWebmergeMappingsPagedData = false;
            console.log("mappingsList", mappingsList);
            _this.webmergeMappingsPagedData = mappingsList;
        }, function (err) {
            _this.loadWebmergeMappingsPagedData = false;
        });
    };
    AccountviewdetailComponent.prototype.OpenMapping = function (document) {
        this.documentMapping.show(this.accountId, document.id);
    };
    AccountviewdetailComponent.prototype.documentMappings = function () {
        this.GetWebmergeMappings(this.accountId);
    };
    AccountviewdetailComponent.prototype.uploadFormStackDocument = function () {
        this.uploadDocument.show(this.accountId, null);
    };
    AccountviewdetailComponent.prototype.uploadDocuments = function () {
        this.GetLoanDocuments(this.accountId);
    };
    AccountviewdetailComponent.prototype.createDataRoute = function () {
        this.dataRouting.show('', this.accountId);
    };
    AccountviewdetailComponent.prototype.OpenRoute = function (row) {
        this.dataRouting.show(row.id, this.accountId);
    };
    AccountviewdetailComponent.prototype.dataRoutingEmit = function () {
        this.GetDataRoutes(this.accountId);
    };
    AccountviewdetailComponent.prototype.EditDocument = function (row) {
        this.uploadDocument.show(this.accountId, row.id);
    };
    AccountviewdetailComponent.prototype.createWebmergeMapping = function () {
        this.documentMapping.show(this.accountId, 0);
    };
    AccountviewdetailComponent.prototype.updateWebmergeMapping = function (row) {
        this.documentMapping.show(this.accountId, row.Id);
    };
    AccountviewdetailComponent.prototype.OpenDocumentDelivery = function (row) {
        this.delivery.show(row.id, "Document", this.accountId);
    };
    AccountviewdetailComponent.prototype.OpenRouteDelivery = function (row) {
        this.delivery.show(row.id, "Route", this.accountId);
    };
    AccountviewdetailComponent.prototype.onIsDefaultChange = function (row) {
        var _this = this;
        this.loadSave = true;
        this.lenderService.setDefaultWebmergeMapping(row.Id, this.accountId).subscribe(function (resp) {
            _this.loadSave = false;
            _this.GetWebmergeMappings(_this.accountId);
            if (resp.statusCode == 200) {
                _this.toaster.success(resp.responseMessage);
            }
            else {
                _this.toaster.error(resp.responseMessage);
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    AccountviewdetailComponent.prototype.showModel = function (data) {
        console.log('data:', data);
        this.setPasswordForm.reset();
        this.setPasswordModal.show();
        this.getToken(data.value.email);
        this.userid = data.value.userId;
        this.Name = data.value.name;
        this.isEmailConfirmed = data.value.emailConfirmed;
    };
    AccountviewdetailComponent.prototype.Closemodel = function () {
        this.setPasswordModal.hide();
    };
    AccountviewdetailComponent.prototype.getToken = function (email) {
        var _this = this;
        this.userService.gettoken(email).subscribe(function (result) {
            console.log('result', result);
            _this.token = result;
        });
    };
    AccountviewdetailComponent.prototype.PasswordSet = function () {
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
                        _this.toaster.success("Password has been set successfully. Please login.");
                        _this.setPasswordModal.hide();
                        while (_this.accoundetailView.length != 0) {
                            _this.accoundetailView.removeAt(0);
                        }
                        _this.loadSave = false;
                        _this.GetLoanProductDiscountCategoryEdit('1');
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
                        _this.toaster.success("Password has been reset successfully. Please login.");
                        _this.setPasswordModal.hide();
                        while (_this.accoundetailView.length != 0) {
                            _this.accoundetailView.removeAt(0);
                        }
                        _this.loadSave = false;
                        _this.GetLoanProductDiscountCategoryEdit('1');
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
    Object.defineProperty(AccountviewdetailComponent.prototype, "password", {
        get: function () { return this.setPasswordForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountviewdetailComponent.prototype, "confirmPassword", {
        get: function () { return this.setPasswordForm.get('confirmPassword'); },
        enumerable: true,
        configurable: true
    });
    AccountviewdetailComponent.prototype.sharePasswordLink = function (data) {
        var _this = this;
        this.Email = data.value.email;
        var message = "Are you sure you want to share the generate password link with \"" + this.Email + "\"?";
        this.dialogService.confirm('Share Link', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loadSave = true;
                _this.forgotPswModel.email = _this.Email;
                _this.forgotPswModel.siteTitle = _this.sitetitle;
                _this.forgotPswModel.siteImg = _this.siteimage;
                _this.userServicepassword.SetPasswordByEmail(_this.forgotPswModel).subscribe(function (res) {
                    if (res) {
                        if (res.statusCode == 200) {
                            _this.toaster.success(res.responseMessage);
                            setTimeout(function () { _this.loadSave = false; }, 2000);
                        }
                        else {
                            _this.loadSave = false;
                            _this.toaster.error(res.responseMessage);
                        }
                    }
                }, function (error) {
                    _this.loadSave = false;
                });
            }
        });
    };
    //function is used to delete the user
    AccountviewdetailComponent.prototype.DeleteUser = function (data) {
        var _this = this;
        console.log("data", data);
        var message = "Are you sure you want to delete User \"" + data.value.name + "\"?";
        this.dialogService.confirm('Delete User ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loadSave = true;
                _this.userService.deleteUser(data.value.userId).subscribe(function (result) {
                    if (result.statusCode == 200) {
                        _this.toaster.success(result.responseMessage);
                        debugger;
                        // this.accoundetailView.controls = null;
                        while (_this.accoundetailView.length != 0) {
                            _this.accoundetailView.removeAt(0);
                        }
                        _this.GetLoanProductDiscountCategoryEdit('1');
                        _this.loadSave = false;
                    }
                    else {
                        _this.toaster.error(result.responseMessage);
                        _this.loadSave = false;
                    }
                }, function (error) {
                    _this.loadSave = false;
                });
            }
        });
    };
    AccountviewdetailComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _manageuser_addedituser_service__WEBPACK_IMPORTED_MODULE_14__["ManageUserService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _accountservice_service__WEBPACK_IMPORTED_MODULE_3__["AccountserviceService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _accountservice_service__WEBPACK_IMPORTED_MODULE_3__["AccountserviceService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _lender_lenderlist_service__WEBPACK_IMPORTED_MODULE_7__["LenderlistService"] },
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_13__["UserService"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__["Title"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('setPassword', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__["ModalDirective"])
    ], AccountviewdetailComponent.prototype, "setPasswordModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('documentMapping', { static: false }),
        __metadata("design:type", _lender_documentmapping_documentmapping_component__WEBPACK_IMPORTED_MODULE_8__["DocumentmappingComponent"])
    ], AccountviewdetailComponent.prototype, "documentMapping", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('uploadDocument', { static: false }),
        __metadata("design:type", _lender_upload_document_upload_document_component__WEBPACK_IMPORTED_MODULE_9__["UploadDocumentComponent"])
    ], AccountviewdetailComponent.prototype, "uploadDocument", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dataRouting', { static: false }),
        __metadata("design:type", _lender_data_routing_data_routing_component__WEBPACK_IMPORTED_MODULE_10__["DataRoutingComponent"])
    ], AccountviewdetailComponent.prototype, "dataRouting", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('delivery', { static: false }),
        __metadata("design:type", _lender_routing_delivery_routing_delivery_component__WEBPACK_IMPORTED_MODULE_11__["RoutingDeliveryComponent"])
    ], AccountviewdetailComponent.prototype, "delivery", void 0);
    AccountviewdetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-accountviewdetail',
            template: __importDefault(__webpack_require__(/*! raw-loader!./accountviewdetail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/accountviewdetail.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./accountviewdetail.component.scss */ "./src/app/views/internalaccounts/accountviewdetail.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _manageuser_addedituser_service__WEBPACK_IMPORTED_MODULE_14__["ManageUserService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _accountservice_service__WEBPACK_IMPORTED_MODULE_3__["AccountserviceService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _accountservice_service__WEBPACK_IMPORTED_MODULE_3__["AccountserviceService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _lender_lenderlist_service__WEBPACK_IMPORTED_MODULE_7__["LenderlistService"], _shared_user_service__WEBPACK_IMPORTED_MODULE_13__["UserService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__["Title"]])
    ], AccountviewdetailComponent);
    return AccountviewdetailComponent;
}());

function PasswordMatch(pwd, cpwd) {
    return function (frm) {
        var pword = frm.controls[pwd];
        var cpword = frm.controls[cpwd];
        if (pword.value !== cpword.value) {
            cpword.setErrors({ notmatch: true });
        }
        else {
            cpword.setErrors(null);
        }
    };
}


/***/ }),

/***/ "./src/app/views/internalaccounts/accountviewdetailNew.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/views/internalaccounts/accountviewdetailNew.component.ts ***!
  \**************************************************************************/
/*! exports provided: AccountviewdetailNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountviewdetailNewComponent", function() { return AccountviewdetailNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _accountservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accountservice.service */ "./src/app/views/internalaccounts/accountservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _product_productlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../product/productlist.service */ "./src/app/views/product/productlist.service.ts");
/* harmony import */ var _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/new-notes/newnoteslist.component */ "./src/app/views/shared/new-notes/newnoteslist.component.ts");
/* harmony import */ var _shared_notes_notes_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/notes/notes.service */ "./src/app/views/shared/notes/notes.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _opportunity_opportunitylist_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../opportunity/opportunitylist.service */ "./src/app/views/opportunity/opportunitylist.service.ts");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_welcomecallpopup_welcomecallpopup_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../shared/welcomecallpopup/welcomecallpopup.component */ "./src/app/views/shared/welcomecallpopup/welcomecallpopup.component.ts");
/* harmony import */ var _shared_twilio_voicecall_voicecall_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../shared/twilio/voicecall/voicecall.component */ "./src/app/views/shared/twilio/voicecall/voicecall.component.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../app.component */ "./src/app/app.component.ts");
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


















var AccountviewdetailNewComponent = /** @class */ (function () {
    function AccountviewdetailNewComponent(dialogService, productlistService, commonService, fb, router, opprtunityservice, leadservice, internalAccountService, toaster, route, notesService, accountserviceService, location, sanitizer, app, voiceCallModel) {
        var _this = this;
        this.dialogService = dialogService;
        this.productlistService = productlistService;
        this.commonService = commonService;
        this.fb = fb;
        this.router = router;
        this.opprtunityservice = opprtunityservice;
        this.leadservice = leadservice;
        this.internalAccountService = internalAccountService;
        this.toaster = toaster;
        this.route = route;
        this.notesService = notesService;
        this.accountserviceService = accountserviceService;
        this.location = location;
        this.sanitizer = sanitizer;
        this.app = app;
        this.voiceCallModel = voiceCallModel;
        this.newItemEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.listFilter = '';
        this.isUsertypeBanker = false;
        this.IsStandard = false;
        this.isAudio = true;
        this.displayType = 'VIEW';
        this.contactIdPrimaryKeyId = '';
        this.RelatedContactsCount = 0;
        this.OpportunitiesCount = 0;
        this.ContractsCount = 0;
        this.WorkOrdersCount = 0;
        this.ProposalsCount = 0;
        this.loading = false;
        this.isSave = false;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.RelatedContactsData = {
            pager: {},
            data: []
        };
        this.sortDir = 'desc';
        this.sortColumn = 'createdon';
        this.moduleName = 'CRM';
        this.submoduleName = 'account';
        this.formControlList = [];
        this.loadSave = false;
        this.BillingAddress = "";
        this.OppourtunityCount = 0;
        this.CoomunicationCounts = 0;
        this.ContractCount = 0;
        this.ContactCount = 0;
        this.isAccount = true;
        this.ProposalCount = 0;
        this.workOrderCount = 0;
        this.serviceAppointmentsCount = 0;
        this.jurisdictionCount = 0;
        this.productCount = 0;
        this.notescount = 0;
        this.lstOppourtunity = {
            pager: {},
            data: []
        };
        this.lstCoomunication = {
            pager: {},
            data: []
        };
        this.lstContract = {
            pager: {},
            data: []
        };
        this.lstContacts = {
            pager: {},
            data: []
        };
        this.lstWorkOrders = {
            pager: {},
            data: []
        };
        this.lstServiceAppointments = {
            pager: {},
            data: []
        };
        this.lstjurisdiction = {
            pager: {},
            data: []
        };
        this.lstProducts = {
            pager: {},
            data: []
        };
        this.lstProposals = {
            pager: {},
            data: []
        };
        this.pageSize = 4;
        this.OppoutunityPageNo = 4;
        this.CommunicationPageNo = 1;
        this.ContractPageNo = 1;
        this.ContactPageNo = 1;
        this.ProposalPageNo = 1;
        this.WorkOrderPageNo = 1;
        this.ServiceAppointmentPageNo = 1;
        this.JurisdictionPageNo = 1;
        this.ProductsPageNo = 1;
        this.solgenpower = false;
        this.callFrom = "account";
        this.lstFiles = {
            pager: {},
            data: []
        };
        //msaapDisplayTitle = true;
        //msaapDisplayPlayList = true;
        //msaapPageSizeOptions = [2, 4, 6];
        //msaapDisplayVolumeControls = true;
        //msaapDisplayRepeatControls = true;
        //msaapDisplayArtist = false;
        //msaapDisplayDuration = false;
        //msaapDisablePositionSlider = true;
        // Material Style Advance Audio Player Playlist
        this.filePageNo = 1;
        this.pageSizefile = 4;
        this.siteurl = '';
        this.checkboxdata1 = [];
        this.checkboxdataTop = [];
        this.isVisibleWelcomeCall = false;
        this.recordId = 0;
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyType = userdetail.companyType;
            if (_this.companyType == "companytypeSolarInstall") {
                _this.solgenpower = true;
            }
        });
    }
    AccountviewdetailNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.siteurl = window.location.origin;
        console.log('siteurl', this.siteurl);
        this.initForm();
        this.loadSave = true;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.productid = id;
            _this.accountId = id;
            localStorage.setItem('accountId', _this.accountId);
            if (id) {
                //this.GetAccountDetails(id);
                _this.GetLoanProductDiscountCategoryEdit('1');
            }
            // this.getRoleListForEnableLogin(this.accountId);
        });
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.GetCustomFieldsList();
        this.GetCustomFieldsListTopRow();
        this.GetRelatedData();
        //this.getNoteslist(); 
        this.GetRelatedContactsDetail();
    };
    //GetAccountDetails(id) {   
    //  this.loadSave = true;
    //  this.accountserviceService.GetAccounDetails(id).subscribe((result: any) => {
    //    if (result) {
    //      console.log("result", result);
    //      this.AccountDetails = result;
    //      if (this.AccountDetails.isRoleApply == true) {
    //        this.isUsertypeBanker = true;
    //      }
    //      if (this.AccountDetails.userType == 'Standard') {
    //        this.IsStandard = true;
    //      }
    //     // this.search();
    //      this.loadSave = false;
    //    }
    //  }, error => {
    //    this.loadSave = false;
    //  });
    //}
    AccountviewdetailNewComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    AccountviewdetailNewComponent.prototype.WelcomeCallPopup = function (accountId) {
        var _this = this;
        if (this.isVisibleWelcomeCall) {
            this.isVisibleWelcomeCall = false;
        }
        else {
            this.isVisibleWelcomeCall = true;
        }
        setTimeout(function () {
            //this.voiceCallModel.show();
            _this.app.ShowDialer({ phoneNo: '', visible: true, defaultValue: false, refId: _this.accountId });
            _this.welcomecallModel.show(accountId);
        }, 500);
        //this.voiceCallModel.show();
        //this.welcomecallModel.show(accountId);   
    };
    AccountviewdetailNewComponent.prototype.addItem = function (newItem) {
        this.notescount = newItem;
    };
    AccountviewdetailNewComponent.prototype.close = function () {
        this.router.navigateByUrl("/accountslist");
    };
    AccountviewdetailNewComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        this.formControlList = [];
        this.loadSave = true;
        this.displayType = 'VIEW';
        this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.productid, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.productlistService.customFieldsList.data;
                console.log("customCompnentValues", _this.customCompnentValues);
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _accountservice_service__WEBPACK_IMPORTED_MODULE_3__["CheckboxData"]();
                        checkdata.controlname = t.ColumnName;
                        _this.checkboxdata1.push(checkdata);
                    }
                    if (groupCheck == null || groupCheck.length == 0) {
                        var obj = {
                            group_id: t.group_id,
                            group_name: t.group_name,
                            group_display_name: t.group_display_name,
                            InnerData: _this.customCompnentValues.filter(function (x) { return x.group_id == t.group_id; })
                        };
                        _this.formControlList.push(obj);
                    }
                });
                var group_1 = {};
                _this.customCompnentValues.forEach(function (cnt) {
                    var val = null;
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    else {
                        val = (cnt.value == '' ? null : cnt.value);
                    }
                    _this.checkboxdata1.forEach(function (item) { if (cnt.form_controlName == item.controlname) {
                        item.controlvalues = cnt.value;
                    } }); //for checkboxes on form
                    if (cnt.actual_data_type == 'checkbox') {
                        try {
                            _this.checkboxdata1.forEach(function (item) {
                                _this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                            });
                        }
                        catch (err) { }
                    }
                    if (cnt.dt_code == 'select') {
                        if (cnt.value != '' && cnt.select_options != null) {
                            cnt.select_options.forEach(function (itemList) {
                                if (itemList.value == cnt.value) {
                                    cnt.value = itemList.name;
                                }
                            });
                        }
                    }
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required === true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.actual_data_type === "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type === "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type === "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                _this.loadSave = false;
            }
        });
    };
    AccountviewdetailNewComponent.prototype.initForm = function () {
        this.configurationSetings = this.fb.group({
            accoundetailView: this.fb.array([])
        });
    };
    Object.defineProperty(AccountviewdetailNewComponent.prototype, "accoundetailView", {
        get: function () {
            return this.configurationSetings.get('accoundetailView');
        },
        enumerable: true,
        configurable: true
    });
    AccountviewdetailNewComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        input.append('accountId', this.accountId);
        input.append('contactList', JSON.stringify(this.accoundetailView.value));
        return input;
    };
    AccountviewdetailNewComponent.prototype.GetLoanProductDiscountCategoryEdit = function (id) {
        var _this = this;
        var current = this;
        while (this.accoundetailView.length != 0) {
            this.accoundetailView.removeAt(0);
        }
        this.accountserviceService.ContactList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.accountId).subscribe(function (result) {
            result.forEach(function (value) {
                var group = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                    accountId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.AccountId),
                    contactID: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.contactID),
                    name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.Name),
                    email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.Email),
                    isPrimary: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.IsPrimary),
                    isPrimaryForDisabled: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.EnableUser),
                    enableLogin: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.EnableUser),
                    phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.Phone),
                    mobile: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.MobilePhone),
                    role: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.Role == '' ? null : value.Role),
                    userId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.userId == null ? null : value.userId)
                });
                current.accoundetailView.push(group);
            });
            _this.RelatedContactsCount = result.length;
        });
    };
    AccountviewdetailNewComponent.prototype.GetRelatedContactsDetail = function () {
        var _this = this;
        var current = this;
        this.accountserviceService.RelatedContactList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValueRelContact, this.loginuserid, this.accountId).subscribe(function (response) {
            _this.RelatedContactsData = _this.accountserviceService.pagedData;
            _this.offsetRelatedContact = _this.currentPage;
            _this.loading = false;
            //console.log("RelatedContactsData", this.RelatedContactsData);
        });
    };
    AccountviewdetailNewComponent.prototype.AddContact = function () {
        this.addContact.show();
    };
    AccountviewdetailNewComponent.prototype.goToContact = function (id) {
        this.recordId = id;
        // this.newItemEvent.emit(id);
        this.addContact.show();
    };
    AccountviewdetailNewComponent.prototype.closeContact = function () {
        this.recordId = 0;
        this.addContact.hide();
    };
    AccountviewdetailNewComponent.prototype.contactmsg = function (e) {
        var control2 = this.configurationSetings.controls.accoundetailView;
        control2.controls = [];
        this.GetRelatedContactsDetail();
        this.GetLoanProductDiscountCategoryEdit(this.accountId);
        this.closeContact();
    };
    //AddContact() {
    //  //this.router.navigate(['../contactlist/addContact/account', this.accountId]);
    //  this.router.navigate(['../contactlist/addContact/', { account: this.accountId, issolgen: "true"}]);
    //}
    AccountviewdetailNewComponent.prototype.GetCustomFieldsListTopRow = function () {
        var _this = this;
        this.displayType = 'VIEW_TOP';
        this.loadSave = true;
        this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.productid, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValuesTop = _this.productlistService.customFieldsList.data;
                _this.customCompnentValuesTop.forEach(function (cnt) {
                    var val = null;
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    else {
                        val = (cnt.value == '' ? null : cnt.value);
                    }
                    _this.checkboxdataTop.forEach(function (item) { if (cnt.form_controlName == item.controlname) {
                        item.controlvalues = cnt.value;
                    } }); //for checkboxes on form
                    if (cnt.actual_data_type == 'checkbox') {
                        try {
                            _this.checkboxdataTop.forEach(function (item) {
                                _this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                            });
                        }
                        catch (err) { }
                    }
                    if (cnt.ColumnName == 'Name') {
                        _this.Name = cnt.value;
                    }
                    if (cnt.ColumnName == 'BillingStreet') {
                        _this.BillingStreet = cnt.value == null ? '' : cnt.value;
                    }
                    if (cnt.ColumnName == 'BillingCity') {
                        _this.BillingCity = cnt.value == null ? '' : cnt.value;
                    }
                    if (cnt.ColumnName == 'BillingState') {
                        _this.BillingState = cnt.value == null ? '' : cnt.value;
                    }
                    if (cnt.ColumnName == 'BillingCountry') {
                        _this.BillingCountry = cnt.value == null ? '' : cnt.value;
                    }
                    if (cnt.ColumnName == 'BillingPostalCode') {
                        _this.BillingPostalCode = cnt.value == null ? '' : cnt.value;
                    }
                    if (cnt.ColumnName == 'OwnerId') {
                        _this.ownerId = cnt.ref_value;
                    }
                });
                _this.BillingAddress = '';
                _this.BillingAddress = _this.BillingAddress.concat(_this.BillingStreet, ", ", _this.BillingCity, ", ", _this.BillingState, ", ", _this.BillingCountry, " ", _this.BillingPostalCode);
                _this.loadSave = false;
            }
        });
    };
    AccountviewdetailNewComponent.prototype.GetRelatedData = function () {
        this.OppoutunityPageNo = 1;
        this.pageSize = 4;
        this.refreshOppourtunityList();
        this.refreshContractList();
        this.refreshProposalsList();
        // this.refreshContactsList();
        this.refreshWorkOrdersList();
        this.refreshServiceAppointmentsList();
        // this.refreshJurisdictionList();
        this.RefreshCommunicationList();
    };
    AccountviewdetailNewComponent.prototype.refreshOppourtunityList = function () {
        var _this = this;
        this.accountserviceService.GetAccountsOppoutunityList(this.accountId, this.sortColumn, this.sortDir, this.OppoutunityPageNo, this.pageSize).subscribe(function (resp) {
            //console.log("data", resp)
            _this.lstOppourtunity = resp;
            _this.OppourtunityCount = resp.pager.totalItems;
        });
    };
    AccountviewdetailNewComponent.prototype.RefreshCommunicationList = function () {
        var _this = this;
        this.accountserviceService.GetAccountsCommunicationList(this.accountId, this.sortColumn, this.sortDir, this.CommunicationPageNo, this.pageSize).subscribe(function (resp) {
            console.log("dataresp", resp);
            _this.lstCoomunication = resp;
            _this.CoomunicationCounts = resp.pager.totalItems;
        });
    };
    AccountviewdetailNewComponent.prototype.refreshContractList = function () {
        var _this = this;
        this.accountserviceService.GetAccountsContractList(this.accountId, this.sortColumn, this.sortDir, this.ContractPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstContract = resp;
            _this.ContractCount = resp.pager.totalItems;
        });
    };
    AccountviewdetailNewComponent.prototype.refreshProposalsList = function () {
        var _this = this;
        this.accountserviceService.GetAccountsProposalsList(this.accountId, this.sortColumn, this.sortDir, this.ProposalPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstProposals = resp;
            _this.ProposalCount = resp.pager.totalItems;
        });
    };
    AccountviewdetailNewComponent.prototype.refreshContactsList = function () {
        var _this = this;
        this.accountserviceService.GetAccountsContactList(this.accountId, this.sortColumn, this.sortDir, this.ContactPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstContacts = resp;
            _this.ContactCount = resp.pager.totalItems;
            if (_this.lstContacts.userType == 'Standard') {
                _this.IsStandard = true;
            }
            //this.search();
            _this.loadSave = false;
        });
    };
    AccountviewdetailNewComponent.prototype.refreshWorkOrdersList = function () {
        var _this = this;
        this.accountserviceService.GetAccountsWorkOrderList(this.accountId, this.sortColumn, this.sortDir, this.WorkOrderPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstWorkOrders = resp;
            _this.workOrderCount = resp.pager.totalItems;
        });
    };
    AccountviewdetailNewComponent.prototype.refreshServiceAppointmentsList = function () {
        var _this = this;
        this.accountserviceService.GetAccountsServiceAppointmentsList(this.accountId, this.sortColumn, this.sortDir, this.ServiceAppointmentPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstServiceAppointments = resp;
            _this.serviceAppointmentsCount = resp.pager.totalItems;
        });
    };
    AccountviewdetailNewComponent.prototype.refreshJurisdictionList = function () {
        var _this = this;
        this.accountserviceService.GetAccountsJurisdictionList(this.accountId, this.sortColumn, this.sortDir, this.JurisdictionPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstjurisdiction = resp;
            _this.jurisdictionCount = resp.pager.totalItems;
        });
    };
    AccountviewdetailNewComponent.prototype.refreshProductsList = function () {
        var _this = this;
        this.accountserviceService.GetAccountsProductsList(this.accountId, this.sortColumn, this.sortDir, this.ProductsPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstProducts = resp;
            _this.productCount = resp.pager.totalItems;
        });
    };
    AccountviewdetailNewComponent.prototype.setOppourtunityPageNo = function ($event) {
        this.OppoutunityPageNo = $event.page;
        this.refreshOppourtunityList();
    };
    AccountviewdetailNewComponent.prototype.setProposalPageNo = function ($event) {
        this.ProposalPageNo = $event.page;
        this.refreshProposalsList();
    };
    AccountviewdetailNewComponent.prototype.setContactPageNo = function ($event) {
        this.ContactPageNo = $event.page;
        this.refreshContactsList();
    };
    AccountviewdetailNewComponent.prototype.setWorkorderPageNo = function ($event) {
        this.WorkOrderPageNo = $event.page;
        this.refreshWorkOrdersList();
    };
    AccountviewdetailNewComponent.prototype.setserviceAppointmentPageNo = function ($event) {
        this.ServiceAppointmentPageNo = $event.page;
        this.refreshServiceAppointmentsList();
    };
    AccountviewdetailNewComponent.prototype.setJurisdictionPageNo = function ($event) {
        this.JurisdictionPageNo = $event.page;
        this.refreshJurisdictionList();
    };
    AccountviewdetailNewComponent.prototype.setCommunicationPageNo = function ($event) {
        this.CommunicationPageNo = $event.page;
        this.RefreshCommunicationList();
    };
    AccountviewdetailNewComponent.prototype.setProductsPageNo = function ($event) {
        this.ProductsPageNo = $event.page;
        this.refreshProductsList();
    };
    AccountviewdetailNewComponent.prototype.setContractPageNo = function ($event) {
        this.ContractPageNo = $event.page;
        this.refreshContractList();
    };
    AccountviewdetailNewComponent.prototype.onOppourtunitySort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshOppourtunityList();
    };
    AccountviewdetailNewComponent.prototype.onCommunicationSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.RefreshCommunicationList();
    };
    AccountviewdetailNewComponent.prototype.onContractSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshContractList();
    };
    AccountviewdetailNewComponent.prototype.onProposalSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshProposalsList();
    };
    AccountviewdetailNewComponent.prototype.onWorkOrdersSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshWorkOrdersList();
    };
    AccountviewdetailNewComponent.prototype.onServiceAppointmentSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshServiceAppointmentsList();
    };
    AccountviewdetailNewComponent.prototype.onJurisdictionSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshJurisdictionList();
    };
    AccountviewdetailNewComponent.prototype.onProductsSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshProductsList();
    };
    AccountviewdetailNewComponent.prototype.onContactsSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshContactsList();
    };
    AccountviewdetailNewComponent.prototype.isPrimaryValidator = function (field, i) {
        var _this = this;
        var message = "Are you sure you want to change Primary?";
        this.dialogService.confirm('Enable Primary Contact', message).subscribe(function (confirmed) {
            if (confirmed) {
                if (field.get('isPrimary').value) {
                    _this.accoundetailView.controls.forEach(function (m) {
                        m.get('isPrimary').setValue(false);
                    });
                    field.get('isPrimary').setValue(true);
                    //console.log("TrueIsPrimary", field);
                    //console.log("All Change", this.accoundetailView.controls);
                }
                else {
                    field.get('isPrimary').setValue(false);
                }
            }
            else {
                if (field.get('isPrimary').value) {
                    field.get('isPrimary').setValue(false);
                }
                else {
                    field.get('isPrimary').setValue(true);
                }
            }
        });
    };
    //cusrrent changess
    AccountviewdetailNewComponent.prototype.prepareFormDataForDocumentForEnableSingleClick = function (field) {
        var input = new FormData();
        input.append('accountId', this.accountId);
        input.append('contactList', JSON.stringify(field));
        return input;
    };
    AccountviewdetailNewComponent.prototype.EnableLoginForAllUser = function (field) {
        var _this = this;
        console.log('field', field);
        if (field.value.enableLogin == true && field.value.isPrimary == true) {
            this.loadSave = true;
            //field.value.role = 0;
            if (this.IsStandard == false) {
                this.accountserviceService.CheckUserDuplicateORAssociate(field.value.email, '').subscribe(function (result) {
                    // console.log("result", result);
                    if (result.responseMessage == "duplicate") {
                        _this.isSave = false;
                        _this.loadSave = false;
                        _this.onSubmitForSingle(field.value);
                        // this.toaster.error("Email Already Exists");
                        return false;
                    }
                    else if (result.responseMessage == "associate") {
                        //already exists in ASPnetUsers-- now add only in maping table after confirmation
                        _this.loadSave = false;
                        _this.dialogService.confirm('Associate Account', "Email already exists in other Company. Do you want to Associate it?").subscribe(function (confirmed) {
                            if (confirmed) {
                                //save in maping table
                                if (_this.IsStandard == false) {
                                    _this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', _this.accountId).subscribe(function (result) {
                                        if (result.statusCode == 200) {
                                            _this.toaster.success("Account has been Approved successfully.");
                                            //this.router.navigateByUrl("/accountslist");
                                            _this.GetLoanProductDiscountCategoryEdit(_this.accountId);
                                            setTimeout(function () { _this.loadSave = false; }, 3000);
                                        }
                                    });
                                }
                                else if (_this.IsStandard == true) {
                                    _this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', _this.accountId).subscribe(function (result) {
                                        if (result.statusCode == 200) {
                                            _this.toaster.success("Account has been Approved successfully.");
                                            //this.router.navigateByUrl("/accountslist");
                                            _this.GetLoanProductDiscountCategoryEdit(_this.accountId);
                                            setTimeout(function () { _this.loadSave = false; }, 3000);
                                        }
                                    });
                                }
                                else {
                                    _this.toaster.error("Please select Role!");
                                }
                                _this.isSave = false;
                                return false;
                            }
                            else { //do nothing
                                _this.isSave = false;
                                return false;
                            }
                        });
                    }
                    else {
                        if (field.value.role == null || _this.IsStandard == false) {
                            _this.onSubmitForSingle(field.value);
                        }
                        else {
                            _this.loadSave = false;
                            _this.toaster.error("Please select Role!");
                        }
                    }
                });
            }
            else if (this.IsStandard == true) {
                this.loadSave = false;
                //this.toaster.error("Please select Role!");
                this.onSubmitForSingle(field.value);
            }
            else {
                this.loadSave = false;
                this.toaster.error("Please select Role!");
            }
        }
        else if (field.value.enableLogin == true && field.value.isPrimary == false) {
            this.loadSave = true;
            if (this.IsStandard == false && (field.value.role != null && field.value.role != '')) {
                this.accountserviceService.CheckUserDuplicateORAssociate(field.value.email, '').subscribe(function (result) {
                    // console.log("result", result);
                    if (result.responseMessage == "duplicate") {
                        _this.isSave = false;
                        _this.loadSave = false;
                        //this.toaster.error("Email Already Exists");
                        _this.onSubmitForSingle(field.value);
                        return false;
                    }
                    else if (result.responseMessage == "associate") {
                        //already exists in ASPnetUsers-- now add only in maping table after confirmation
                        _this.loadSave = false;
                        _this.dialogService.confirm('Associate Account', "Email already exists in other Company. Do you want to Associate it?").subscribe(function (confirmed) {
                            if (confirmed) {
                                //save in maping table
                                if (_this.IsStandard == false && (field.value.role != null && field.value.role != '')) {
                                    _this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', _this.accountId).subscribe(function (result) {
                                        if (result.statusCode == 200) {
                                            _this.toaster.success("Account has been Approved successfully.");
                                            //this.router.navigateByUrl("/accountslist");
                                            _this.GetLoanProductDiscountCategoryEdit(_this.accountId);
                                            setTimeout(function () { _this.loadSave = false; }, 3000);
                                        }
                                    });
                                }
                                else if (_this.IsStandard == true) {
                                    _this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', _this.accountId).subscribe(function (result) {
                                        if (result.statusCode == 200) {
                                            _this.toaster.success("Account has been Approved successfully.");
                                            //this.router.navigateByUrl("/accountslist");
                                            _this.GetLoanProductDiscountCategoryEdit(_this.accountId);
                                            setTimeout(function () { _this.loadSave = false; }, 3000);
                                        }
                                    });
                                }
                                else {
                                    _this.toaster.error("Please select Role!0");
                                }
                                _this.isSave = false;
                                return false;
                            }
                            else { //do nothing
                                _this.isSave = false;
                                return false;
                            }
                        });
                    }
                    else {
                        if (field.value.role == null || _this.IsStandard == false) {
                            _this.onSubmitForSingle(field.value);
                        }
                        else {
                            _this.loadSave = false;
                            _this.toaster.error("Please select Role!3");
                        }
                    }
                });
            }
            else {
                this.loadSave = false;
                //this.toaster.error("Please select Role!");
                this.onSubmitForSingle(field.value);
            }
        }
        else if (field.value.enableLogin == false && field.value.isPrimary == true) {
            this.loadSave = true;
            this.onSubmitForSingle(field.value);
        }
        else {
            this.loadSave = true;
            this.onSubmitForSingle(field.value);
        }
    };
    AccountviewdetailNewComponent.prototype.onSubmitForSingle = function (field) {
        var _this = this;
        console.log('field', field);
        this.loadSave = true;
        if (field.email == null || field.email == '') {
            this.toaster.error("can't enable login, because email is empty!");
            this.loadSave = false;
        }
        else {
            var loanproductModel = this.prepareFormDataForDocumentForEnableSingleClick(field);
            console.log("loanproductModel", loanproductModel);
            this.accountserviceService.addOrUpdateManageStatusForAccountDetails(loanproductModel, this.accountId).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    //this.router.navigateByUrl("/accountslist");
                    var control2 = _this.configurationSetings.controls.accoundetailView;
                    control2.controls = [];
                    _this.GetLoanProductDiscountCategoryEdit(_this.accountId);
                    //this.SetStatusData(this.field);
                    setTimeout(function () { _this.loadSave = false; }, 3000);
                }
                else {
                    _this.loadSave = false;
                    //this.GetAccountDetails(this.accountId);
                    var current = _this;
                    _this.toaster.error(result.responseMessage);
                    //setTimeout(() => { this.loadSave = false; }, 4000);
                    //alert(1);
                    //this.accoundetailView.clear();
                    var control2 = _this.configurationSetings.controls.accoundetailView;
                    control2.controls = [];
                    _this.GetLoanProductDiscountCategoryEdit(_this.accountId);
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
    };
    AccountviewdetailNewComponent.prototype.AddNote = function () {
        this.listnotesmodel.show(this.accountId);
    };
    AccountviewdetailNewComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    //@ViewChild("voiceCallPopup", { static: false }) voiceCallModel: VoicecallComponent;
    AccountviewdetailNewComponent.prototype.closeWelcomeCall = function () {
        this.app.ShowDialer({ phoneNo: '', visible: false });
        this.voiceCallModel.ngOnDestroy();
        this.isVisibleWelcomeCall = false;
        this.GetCustomFieldsList();
        this.GetCustomFieldsListTopRow();
        this.GetRelatedData();
        //this.getNoteslist(); 
        this.GetRelatedContactsDetail();
        this.GetLoanProductDiscountCategoryEdit(this.accountId);
    };
    AccountviewdetailNewComponent.prototype.ClickToPlay = function (row) {
        this.modalTitle = "audio Player";
        if (row.Vendor == 'Twilio') {
            //console.log(baseUrl);
            this.isAudio = true;
            this.audioSrc = row.fileUrl;
            this.audioModel.show();
        }
        else {
            this.isAudio = false;
            var width = 500;
            var height = 380;
            var left = Number((screen.width / 2) - (width / 2));
            var top_1 = Number((screen.height / 2) - (height / 2));
            var winFeatures = 'directories=0,titlebar=0,toolbar=0, location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=' + width + ',height=' + height + ',left=' + left + ',top=' + top_1;
            var audiowindow = window.open(row.fileUrl, 'Audio Player', winFeatures);
            if (window.focus)
                audiowindow.focus();
        }
    };
    AccountviewdetailNewComponent.prototype.CloseAudio = function () {
        this.audioSrc = "";
        this.isAudio = true;
        this.audioModel.hide();
    };
    AccountviewdetailNewComponent.prototype.ClickTodisplayVedeo = function () {
        this.isAudio = false;
        this.modalTitle = "Video Player";
        this.vedeoSrc = "http://localhost:8530//assets/uploads/Document/_TrailerNews28_preview.webm";
        this.audioModel.show();
    };
    AccountviewdetailNewComponent.prototype.downloadFileSharePoint = function (fileName) {
        var _this = this;
        debugger;
        this.loadSave = true;
        this.fileNameDownLoad = fileName;
        this.accountserviceService.ClickToDownload(fileName, this.accountId).subscribe(function (result) {
            console.log("result blob1", result);
            debugger;
            var fileName = _this.fileNameDownLoad.split("/")[_this.fileNameDownLoad.split("/").length - 1];
            debugger;
            var file = new Blob([result], { type: result.type });
            saveAs(file, fileName);
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AccountviewdetailNewComponent.ctorParameters = function () { return [
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _product_productlist_service__WEBPACK_IMPORTED_MODULE_7__["ProductListService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _opportunity_opportunitylist_service__WEBPACK_IMPORTED_MODULE_11__["OpportunityListService"] },
        { type: _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_12__["LeadlistService"] },
        { type: _accountservice_service__WEBPACK_IMPORTED_MODULE_3__["AccountserviceService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _shared_notes_notes_service__WEBPACK_IMPORTED_MODULE_9__["NotesService"] },
        { type: _accountservice_service__WEBPACK_IMPORTED_MODULE_3__["AccountserviceService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__["DomSanitizer"] },
        { type: _app_component__WEBPACK_IMPORTED_MODULE_17__["AppComponent"] },
        { type: _shared_twilio_voicecall_voicecall_component__WEBPACK_IMPORTED_MODULE_15__["VoicecallComponent"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AccountviewdetailNewComponent.prototype, "offsetRelatedContact", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('listnotesmodel', { static: false }),
        __metadata("design:type", _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_8__["NewnoteslistComponent"])
    ], AccountviewdetailNewComponent.prototype, "listnotesmodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('welcomecall', { static: false }),
        __metadata("design:type", _shared_welcomecallpopup_welcomecallpopup_component__WEBPACK_IMPORTED_MODULE_14__["WelcomecallpopupComponent"])
    ], AccountviewdetailNewComponent.prototype, "welcomecallModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addContact', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], AccountviewdetailNewComponent.prototype, "addContact", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('audioModel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], AccountviewdetailNewComponent.prototype, "audioModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AccountviewdetailNewComponent.prototype, "newItemEvent", void 0);
    AccountviewdetailNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            providers: [_shared_twilio_voicecall_voicecall_component__WEBPACK_IMPORTED_MODULE_15__["VoicecallComponent"]],
            selector: 'app-accountviewdetail',
            template: __importDefault(__webpack_require__(/*! raw-loader!./accountviewdetailNew.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/accountviewdetailNew.component.html")).default
        }),
        __metadata("design:paramtypes", [_shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _product_productlist_service__WEBPACK_IMPORTED_MODULE_7__["ProductListService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _opportunity_opportunitylist_service__WEBPACK_IMPORTED_MODULE_11__["OpportunityListService"],
            _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_12__["LeadlistService"],
            _accountservice_service__WEBPACK_IMPORTED_MODULE_3__["AccountserviceService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _shared_notes_notes_service__WEBPACK_IMPORTED_MODULE_9__["NotesService"],
            _accountservice_service__WEBPACK_IMPORTED_MODULE_3__["AccountserviceService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__["DomSanitizer"],
            _app_component__WEBPACK_IMPORTED_MODULE_17__["AppComponent"],
            _shared_twilio_voicecall_voicecall_component__WEBPACK_IMPORTED_MODULE_15__["VoicecallComponent"]])
    ], AccountviewdetailNewComponent);
    return AccountviewdetailNewComponent;
}());



/***/ }),

/***/ "./src/app/views/internalaccounts/addeditaccounts.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/views/internalaccounts/addeditaccounts.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2ludGVybmFsYWNjb3VudHMvYWRkZWRpdGFjY291bnRzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/internalaccounts/addeditaccounts.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/internalaccounts/addeditaccounts.component.ts ***!
  \*********************************************************************/
/*! exports provided: AddeditaccountsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditaccountsComponent", function() { return AddeditaccountsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _accountservice_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accountservice.service */ "./src/app/views/internalaccounts/accountservice.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
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
/// <reference path="../loanapplication/loanapplication.module.ts" />









var AddeditaccountsComponent = /** @class */ (function () {
    function AddeditaccountsComponent(fb, accountService, router, toaster, route, commonService, location) {
        var _this = this;
        this.fb = fb;
        this.accountService = accountService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.location = location;
        this.config = [];
        this.isBank = false;
        this.banktype = false;
        this.moduleName = 'crm';
        this.submoduleName = 'account';
        this.imageLink = '';
        this.loadSave = false;
        this.id = '';
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _accountservice_service__WEBPACK_IMPORTED_MODULE_5__["JsonData"]();
        this.displayType = 'ADD';
        this.isFirst = false;
        this.isdelare = false;
        // checkboxdata1: CheckboxData[];
        //modulePermission: ModuleList;
        this.addOrUpdatePermission = false;
        this.modulePermission = [];
        this.isUpdate = false;
        this.isAdd = false;
        this.accountCompName = "";
        this.showSplitPercentage = false;
        this.checkboxdata1 = [];
        this.removeValue = function (list, value, separator) {
            separator = separator || ",";
            var values = list.split(separator);
            for (var i = 0; i < values.length; i++) {
                if (values[i] == value) {
                    values.splice(i, 1);
                    return values.join(separator);
                }
            }
            return list;
        };
        var priviledgeCode = this.route.snapshot.data.privilegeCode;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase(); });
        this.accountCompName = "";
        if (add == undefined) {
            this.addOrUpdatePermission = false;
        }
        else {
            this.addOrUpdatePermission = true;
        }
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
        });
    }
    ;
    AddeditaccountsComponent.prototype.showgroup = function (data) {
        //console.log('datadata', data);
        var _flag = false;
        //  let newjson = JSON.parse(data);
        data.forEach(function (t) {
            if (t.form_field_visibility === 'YES') {
                _flag = true;
            }
        });
        return _flag;
    };
    AddeditaccountsComponent.prototype.setCompanyName = function (e, formControlList) {
        var accname = e.target.value;
        accname = accname.replace(/ /g, "");
        this.accountCompName = accname;
        var companyFieldName;
        formControlList.forEach(function (t1) {
            var groupCheck = formControlList.filter(function (y) { return y.group_id == t1.group_id; });
            groupCheck[0].InnerData.forEach(function (t) {
                if (t.ColumnName == 'dealer_company_name') {
                    companyFieldName = t.form_controlName;
                    // this.form.get(t.form_controlName).patchValue(accname);
                    // this.formControlList.get(t).setValue(accname);
                    // formControlList.get(t.form_controlName).setValue(accname);
                    // this.form.get(t.form_controlName).setValue(accname);
                }
            });
        });
        console.log("companyFieldName", companyFieldName);
        if (this.form.get(companyFieldName) != null) {
            this.form.get(companyFieldName).setValue(accname);
        }
        //if (this.form.get('1658_dealercompanyname') != null) {
        //  this.form.get('1658_dealercompanyname').setValue(accname);
        //}
    };
    AddeditaccountsComponent.prototype.removeSpaceCompanyName = function (e, formControlList) {
        debugger;
        var accname = e.target.value;
        accname = accname.replace(/ /g, "");
        this.accountCompName = accname;
        console.log("removeSpaceCompanyName", accname);
        var companyFieldName;
        formControlList.forEach(function (t1) {
            var groupCheck = formControlList.filter(function (y) { return y.group_id == t1.group_id; });
            groupCheck[0].InnerData.forEach(function (t) {
                if (t.ColumnName == 'dealer_company_name') {
                    companyFieldName = t.form_controlName;
                    // this.form.get(t.form_controlName).patchValue(accname);
                    // this.formControlList.get(t).setValue(accname);
                    // formControlList.get(t.form_controlName).setValue(accname);
                    // this.form.get(t.form_controlName).setValue(accname);
                }
            });
        });
        if (this.form.get(companyFieldName) != null) {
            this.form.get(companyFieldName).setValue(accname);
        }
        //if (this.form.get('1658_dealercompanyname') != null) {
        //  this.form.get('1658_dealercompanyname').setValue(accname);
        //}
    };
    AddeditaccountsComponent.prototype.checkbank = function (e, formControlList) {
        console.log("e.target.textContent", e.target.textContent);
        debugger;
        if (e.target.textContent != "") {
            if (e.target.textContent == 'Dealer') {
                this.isdelare = true;
            }
            else {
                this.isdelare = false;
            }
            formControlList.forEach(function (t1) {
                var groupCheck = formControlList.filter(function (y) { return y.group_id == t1.group_id; });
                groupCheck[0].InnerData.forEach(function (t) {
                    t.form_field_visibility = 'YES';
                    t.edit_form_field_visibility = 'YES';
                    if (t.ColumnName == 'SecurityType' || t.ColumnName == 'UCCFilingFee') {
                        if (e.target.textContent == "Banker") {
                            t.form_field_visibility = 'YES';
                            t.edit_form_field_visibility = 'YES';
                            //this.isdelare = false;
                        }
                        else if (e.target.textContent == "Standard") {
                            t.form_field_visibility = 'NO';
                            t.edit_form_field_visibility = 'NO';
                            //this.isdelare = false;
                        }
                        //-------19 April ------------
                        else if (e.target.textContent == "Dealer") {
                            t.form_field_visibility = 'NO';
                            t.edit_form_field_visibility = 'NO';
                            //this.isdelare = true;
                        }
                        //-------------------------------------------
                    }
                    //----------19 April ---------------
                    else if (t.ColumnName == 'Phone' || t.ColumnName == 'dealerfeepercentage' || t.ColumnName == 'Funding_date' || t.ColumnName == 'dealer_fee_percentage' || t.ColumnName == 'four_month_payment' || t.ColumnName == 'dealer_num_of_months' || t.ColumnName == 'dealer_code' || t.ColumnName == 'dealer_logo' || t.ColumnName == 'dealer_company_name' || t.ColumnName == 'relationship_manager' || t.ColumnName == 'funding_options' || t.ColumnName == 'send_Text_Email_ToCustomer' || t.ColumnName == 'split_percentage' || t.ColumnName == 'accounting_manager') {
                        if (e.target.textContent == "Banker") {
                            t.form_field_visibility = 'NO';
                            t.edit_form_field_visibility = 'NO';
                            //this.isdelare = false;
                        }
                        else if (e.target.textContent == "Standard") {
                            t.form_field_visibility = 'NO';
                            t.edit_form_field_visibility = 'NO';
                            //this.isdelare = false;
                        }
                        else if (e.target.textContent == "Dealer") {
                            t.form_field_visibility = 'YES';
                            t.edit_form_field_visibility = 'YES';
                            if (t.ColumnName == 'split_percentage') {
                                t.form_field_visibility = 'NO';
                                t.edit_form_field_visibility = 'NO';
                            }
                            //this.isdelare = true;
                        }
                    }
                    //-------------------------------------------
                    else if (e.target.textContent == "Banker" && t.ColumnName != 'Status' && t.ColumnName != 'Name' && t.ColumnName != 'RecordTypeId' && t.ColumnName != 'BillingCity' && t.ColumnName != 'BillingStreet' && t.ColumnName != 'BillingState' && t.ColumnName != 'BillingCountry' && t.ColumnName != 'BillingPostalCode') {
                        t.form_field_visibility = 'NO';
                        t.edit_form_field_visibility = 'NO';
                        //this.isdelare = false;
                    }
                    else if (e.target.textContent == "Standard" && t.ColumnName != 'Status' && t.ColumnName != 'Name' && t.ColumnName != 'RecordTypeId' && t.ColumnName != 'BillingCity' && t.ColumnName != 'BillingStreet' && t.ColumnName != 'BillingState' && t.ColumnName != 'BillingCountry' && t.ColumnName != 'BillingPostalCode') {
                        t.form_field_visibility = 'YES';
                        t.edit_form_field_visibility = 'YES';
                        //this.isdelare = true;
                    }
                    ////----19 April ------------
                    //else if (e.target.textContent == "Dealer" && t.ColumnName != 'Status' && t.ColumnName != 'Name' && t.ColumnName != 'RecordTypeId' && t.ColumnName != 'BillingCity' && t.ColumnName != 'BillingStreet' && t.ColumnName != 'BillingState' && t.ColumnName != 'BillingCountry' && t.ColumnName != 'BillingPostalCode') {
                    //  t.form_field_visibility = 'NO';
                    //  t.edit_form_field_visibility = 'NO';
                    //}
                    //-------------------------------------------
                });
            });
        }
    };
    AddeditaccountsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.banktype = false;
        this.route.queryParams.subscribe(function (params) {
            if (params['type'] == 'bank') {
                this.banktype = true;
            }
        });
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.id = id;
                //this.fillForm(this.id);
                _this.pageTitle = 'Edit Account';
                _this.displayType = 'EDIT';
            }
            else {
                _this.pageTitle = 'Add Account';
                _this.displayType = 'ADD';
                // this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
            }
        });
        this.loadSave = true;
        this.accountService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.id, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.accountService.customFieldsList.data;
                console.log("this.customCompnentValues", _this.customCompnentValues);
                var curr_1 = _this;
                var isdealerAccountType_1 = "";
                var fundingOptions_1 = "";
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    var fourMonthPaymentddlValue = '';
                    var monthPayment = _this.customCompnentValues.filter(function (y) { return y.ColumnName == "four_month_payment"; });
                    console.log("monthPayment", monthPayment);
                    console.log("monthPayment[0]", monthPayment[0]);
                    if (monthPayment != null && typeof monthPayment != 'undefined') {
                        if (typeof monthPayment[0] != 'undefined') {
                            fourMonthPaymentddlValue = monthPayment[0].value;
                        }
                    }
                    if (t.dt_code == 'select' && t.picklist_options == 'true' && t.value !== "") {
                        console.log("select true");
                        t.value = JSON.parse(t.value);
                    }
                    if (t.ColumnName == 'RecordTypeId') {
                        var _options = _this.customCompnentValues.filter(function (m) { return m.ColumnName == 'RecordTypeId'; });
                        if (_options) {
                            if (_options[0].select_options) {
                                var option_1 = _options[0].select_options;
                                option_1.forEach(function (m) {
                                    if (m.value == t.value && (m.name == 'Banker' || curr_1.banktype == true)) {
                                        curr_1.banktype = true;
                                        // this.formControlList.get(t).setValue(m.value);
                                    }
                                    if (m.value == t.value && m.name == 'Dealer') {
                                        isdealerAccountType_1 = "Dealer";
                                    }
                                });
                            }
                        }
                    }
                    if (t.ColumnName == 'funding_options') {
                        var _options = _this.customCompnentValues.filter(function (m) { return m.ColumnName == 'funding_options'; });
                        if (_options) {
                            if (_options[0].select_options) {
                                var option_1 = _options[0].select_options;
                                option_1.forEach(function (m) {
                                    if (m.value == t.value) {
                                        fundingOptions_1 = m.name;
                                    }
                                });
                            }
                        }
                    }
                    t.form_field_visibility = 'YES';
                    t.edit_form_field_visibility = 'YES';
                    //--------------19 April------------------
                    if (t.ColumnName == 'Phone' || t.ColumnName == 'dealerfeepercentage' || t.ColumnName == 'Funding_date' || t.ColumnName == 'dealer_fee_percentage' || t.ColumnName == 'four_month_payment' || t.ColumnName == 'dealer_num_of_months' || t.ColumnName == 'dealer_code' || t.ColumnName == 'dealer_logo' || t.ColumnName == 'dealer_company_name' || t.ColumnName == 'relationship_manager' || t.ColumnName == 'funding_options' || t.ColumnName == 'send_Text_Email_ToCustomer' || t.ColumnName == 'split_percentage' || t.ColumnName == 'accounting_manager') {
                        console.log("fundingOptions", fundingOptions_1);
                        if (isdealerAccountType_1 == "Dealer") {
                            t.form_field_visibility = 'YES';
                            t.edit_form_field_visibility = 'YES';
                            if (t.ColumnName == 'split_percentage') {
                                t.form_field_visibility = 'NO';
                                t.edit_form_field_visibility = 'NO';
                                if (fundingOptions_1.toLowerCase() == "split") {
                                    t.form_field_visibility = 'YES';
                                    t.edit_form_field_visibility = 'YES';
                                }
                            }
                            if (t.ColumnName == 'dealer_company_name') {
                                t.is_required = true;
                            }
                            _this.isdelare = true;
                            if (fourMonthPaymentddlValue == "1" && t.ColumnName == 'dealer_num_of_months') {
                                t.is_readOnly = true;
                            }
                        }
                        else {
                            t.form_field_visibility = 'NO';
                            t.edit_form_field_visibility = 'NO';
                            if (t.ColumnName == 'dealer_company_name') {
                                t.is_required = false;
                            }
                        }
                    }
                    //--------------------------------
                    if (t.ColumnName == 'SecurityType' || t.ColumnName == 'UCCFilingFee') {
                        if (_this.banktype) {
                            t.form_field_visibility = 'YES';
                            t.edit_form_field_visibility = 'YES';
                        }
                        else {
                            t.form_field_visibility = 'NO';
                            t.edit_form_field_visibility = 'NO';
                        }
                    }
                    else if (_this.banktype == true && t.ColumnName != 'Status' && t.ColumnName != 'Name' && t.ColumnName != 'RecordTypeId' && t.ColumnName != 'BillingCity' && t.ColumnName != 'BillingStreet' && t.ColumnName != 'BillingState' && t.ColumnName != 'BillingCountry' && t.ColumnName != 'BillingPostalCode') {
                        t.form_field_visibility = 'NO';
                        t.edit_form_field_visibility = 'NO';
                    }
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _accountservice_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
                        checkdata.controlname = t.ColumnName;
                        _this.checkboxdata1.push(checkdata);
                    }
                    if (t.ColumnName == 'dealer_logo') {
                        debugger;
                        _this.fileName = t.value;
                        _this.GetFileUploadSource(t.value);
                    }
                    if (t.ColumnName == 'dealer_company_name') {
                        _this.accountCompName = t.value;
                    }
                    if (groupCheck == null || groupCheck.length == 0) {
                        var obj = {
                            group_id: t.group_id,
                            group_name: t.group_name,
                            group_display_name: t.group_display_name,
                            InnerData: _this.customCompnentValues.filter(function (x) { return x.group_id == t.group_id; })
                        };
                        _this.formControlList.push(obj);
                        //for (let config of this.formControlList) {
                        //}
                    }
                });
                var group_1 = {};
                data_type_name: Text;
                var convertdatetime_1 = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_8__["DateTimeToLocalForAddEditPipe"]();
                _this.customCompnentValues.forEach(function (cnt) {
                    var val = null;
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    else if (cnt.dt_code == 'datetime') {
                        val = (cnt.value == '' ? null : convertdatetime_1.transform(cnt.value, null)); // to convert to local time
                    }
                    else if (cnt.dt_code == 'date') {
                        val = (cnt.value == '' ? null : convertdatetime_1.transform(cnt.value, 'Date')); // to convert to local time
                    }
                    else {
                        val = (cnt.value == '' ? null : cnt.value);
                    }
                    _this.checkboxdata1.forEach(function (item) { if (cnt.form_controlName == item.controlname) {
                        item.controlvalues = cnt.value;
                    } }); //for checkboxes on form
                    if (cnt.actual_data_type == 'checkbox') {
                        try {
                            _this.checkboxdata1.forEach(function (item) {
                                _this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                            });
                        }
                        catch (err) { }
                    }
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required === true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.dt_code === "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.dt_code === "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.dt_code === "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                console.log("validationFROM", _this.form);
                _this.loadSave = false;
            }
        }, function (err) {
            _this.loadSave = false;
        });
        setTimeout(function () {
            _this.options = {
                center: { lat: 47.751076, lng: -120.740135 },
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.overlays = [];
            _this.autotext();
        }, 1000);
        //EDIT case handle
    };
    AddeditaccountsComponent.prototype.checkvalue = function (formvalues, selval) {
        //// console.log('sssdsd', formvalues);
        // // console.log('selval', selval);
        var returnValue = false;
        if (formvalues != null) {
            // console.log("formvaluesformvaluesformvalues", formvalues);
            formvalues.split(',').find(function (item) {
                if (item == selval) {
                    // console.log('abc');
                    returnValue = true;
                }
            });
        }
        return returnValue;
    };
    AddeditaccountsComponent.prototype.GetFileUploadSource = function (file) {
        var _this = this;
        debugger;
        this.accountService.GetFileUploadSource(file).subscribe(function (result) {
            _this.imageLink = result;
        });
    };
    AddeditaccountsComponent.prototype.test = function (e) {
        // console.log('sssss', e);
        e.stopPropagation();
        e.preventDefault();
    };
    AddeditaccountsComponent.prototype.OnCheck = function () {
        // console.log(this.form);
    };
    AddeditaccountsComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        //this.JsonData.Id = this.id;
        //this.JsonData.moduleCode = this.moduleName;
        //this.JsonData.subModuleCode = this.submoduleName;
        //this.JsonData.companyId = this.companyId;
        //this.JsonData.userId = this.userId;
        input.append('userId', this.userId);
        input.append('companyId', this.companyId);
        input.append('ModuleCode', this.moduleName);
        input.append('SubModuleCode', this.submoduleName);
        input.append('id', this.id);
        var data = JSON.stringify(this.form.value);
        input.append('FormJsonData', data);
        ///input.append('companyLogo', this.companyLogo.value);
        //if (this.commonService.isUploadImageValid) {
        //  if (this.companyLogo.value !== null) {
        //    input.append('filename', this.companyLogo.value);
        //  }
        //}
        if (this.isdelare == true) {
            var fileBrowser = this.fileInput.nativeElement;
            if (fileBrowser.files && fileBrowser.files[0]) {
                input.append('file', fileBrowser.files[0]);
            }
        }
        return input;
    };
    AddeditaccountsComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log("this.form.valid", this.form);
        debugger;
        this.loadSave = true;
        this.checkboxdata1.forEach(function (item) {
            // console.log(item.controlname);
            if (item.controlvalues != "" && item.controlvalues != undefined) {
                var selvalues = ""; // this.form.get(item.controlname).value;
                if (selvalues == "" || selvalues == null) {
                    _this.form.get(item.controlname).setValue(item.controlvalues);
                }
                else {
                    _this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
                }
            }
        });
        // console.log("EditVal", this.form.value);
        if (this.form.valid) {
            this.loadSave = true;
            this.JsonData.Id = this.id;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            this.JsonData.companyId = this.companyId;
            this.JsonData.userId = this.userId;
            //debugger
            var _formData = this.form.value;
            for (var index in _formData) {
                var data = _formData[index];
                if (data) {
                    if (Date.prototype.isPrototypeOf(data)) {
                        _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
                    }
                }
            }
            this.JsonData.FormJsonData = JSON.stringify(this.form.value);
            //this.accountCompName
            var formPrepared_1 = this.prepareFormDataForDocument();
            console.log("formPrepared", formPrepared_1);
            console.log("delar compname", "");
            this.accountService.CheckDealerCompanyName(this.id, this.isdelare == true ? this.accountCompName : '').subscribe(function (result) {
                console.log("Dealer Company", result);
                if (result.statusCode == 200) {
                    _this.accountService.addEditForm(formPrepared_1).subscribe(function (result) {
                        if (result.statusCode == 200) {
                            //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                            //// console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
                            //this.toaster.success(result.responseMessage);
                            setTimeout(function () {
                                _this.toaster.success(result.responseMessage);
                                _this.loadSave = false;
                                _this.location.back();
                            }, 1000);
                        }
                        else {
                            _this.toaster.error(result.responseMessage);
                            _this.loadSave = false;
                        }
                    }, function (error) {
                        _this.loadSave = false;
                    });
                }
                else {
                    _this.loadSave = false;
                    console.log("Dealer Company", result);
                    _this.toaster.error('Company name is already exist! please try another company name.');
                }
            });
            //this.accountService.addEditForm(this.JsonData).subscribe((result: any) => {
        }
        else {
            this.commonService.validateAllFormFields(this.form);
            this.loadSave = false;
        }
    };
    AddeditaccountsComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
    };
    AddeditaccountsComponent.prototype.close = function () {
        this.location.back();
    };
    AddeditaccountsComponent.prototype.fillForm = function (id) {
        var _this = this;
        //this.form.reset();
        this.accountService.GetAccountDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe(function (result) {
            // // console.log("result1212", this.accountService.editPage.data[0]);
            var edit;
            _this.loadSave = true;
            edit = _this.accountService.editPage.data[0];
            //let empty = null;
            var formGroup = {};
            if (result) {
                Object.keys(edit).forEach(function (t) {
                    var cntname = t;
                    var cntValue = edit[t] == '' ? null : edit[t];
                    // console.log("cntname", cntname)
                    if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {
                        cntValue = JSON.parse(cntValue);
                    }
                    if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {
                        cntValue = (cntValue == 'true');
                        // console.log("cntValuecntValue", cntValue);
                    }
                    _this.checkboxdata1.forEach(function (item) { if (cntname == item.controlname) {
                        item.controlvalues = cntValue;
                    } }); //for checkboxes on form
                    formGroup[cntname] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](cntValue);
                });
                // this.form.value.reset();
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
                //for checkboxes on form
                try {
                    _this.checkboxdata1.forEach(function (item) {
                        _this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                    });
                    //this.checkboxdata1.forEach((item) => { // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });
                }
                catch (err) { }
                /////
                // console.log("formGroup", this.form.value);
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditaccountsComponent.prototype.MakeArray = function (value, type) {
        var array = [];
        var arr = String(value).split(',');
        if (type == "radio" || type == "checkbox") {
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].split("|").length > 1) {
                        var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
                        array.push(person);
                    }
                    else {
                        var person = { name: arr[i], value: arr[i] };
                        array.push(person);
                    }
                }
            }
        }
        else {
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    var person = { name: arr[i], value: arr[i] };
                    array.push(person);
                }
            }
        }
        return array;
    };
    AddeditaccountsComponent.prototype.MakeNormalArray = function (value) {
        if (value) {
            try {
                return JSON.parse(value);
            }
            catch (ex) {
                return value;
            }
        }
        else {
            value = [];
        }
    };
    AddeditaccountsComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
            //objItem.select_options = array;
        }
        return array;
    };
    AddeditaccountsComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        // console.log('new',e);
        //const index2: number = this.formControlList.indexOf(groupdisp);
        //const index1: number = controldisp.display_order;
        var checkboxdatanew = new _accountservice_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
        checkboxdatanew.controlname = controldisp.ColumnName;
        if (e.target.checked) {
            var strvalues = "";
            if (this.checkboxdata1.length > 0) {
                strvalues = this.checkboxdata1.find(function (item) { return item.controlname == controldisp.ColumnName; }).controlvalues;
            }
            if (strvalues == "") {
                checkboxdatanew.controlvalues = e.target.labels[0].innerHTML;
                this.checkboxdata1.push(checkboxdatanew);
            }
            else {
                var updateItem = this.checkboxdata1.find(function (item) { return item.controlname == controldisp.ColumnName; });
                var index = this.checkboxdata1.indexOf(updateItem);
                this.checkboxdata1[index].controlvalues = strvalues + "," + e.target.labels[0].innerHTML;
            }
            //  if (this.formControlList[index2].InnerData[index1].value == "") {
            //    this.formControlList[index2].InnerData[index1].value = e.target.labels[0].innerHTML;
        }
        else {
            var strs = this.checkboxdata1.find(function (item) { return item.controlname == controldisp.ColumnName; }).controlvalues.split(",");
            var updatedval = strs.splice(strs.indexOf(e.target.labels[0].innerHTML), 1);
            //checkboxdatanew.controlvalues = updatedval.toString();
            var updateItem = this.checkboxdata1.find(function (item) { return item.controlname == controldisp.ColumnName; });
            var index = this.checkboxdata1.indexOf(updateItem);
            this.checkboxdata1[index].controlvalues = strs.toString();
            //this.checkboxdata1.push(checkboxdatanew);
            //    this.formControlList[index2].InnerData[index1].value = this.formControlList[index2].InnerData[index1].value + "," + e.target.labels[0].innerHTML;
        }
        //}
        //else {
        //  this.formControlList[index2].InnerData[index1].value=this.removeValue(this.formControlList[index2].InnerData[index1].value, e.target.labels[0].innerHTML, ',');
        //}
        // console.log('sss', e);
        var dd = this.formControlList;
    };
    AddeditaccountsComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    AddeditaccountsComponent.prototype.fetchMore = function (dataList, j) {
        var _this = this;
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList[j].select_options.length;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            dataList[j].select_options = dataList[j].select_options.concat(_this.scrollDataList);
        });
    };
    AddeditaccountsComponent.prototype.onKey = function (e, dataList, j) {
        var _this = this;
        var charCode = (e.which) ? e.which : e.keyCode;
        if (charCode == 37 || charCode == 38 || charCode == 39 || charCode == 40) {
            return false;
        }
        this.len = 0;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        this.searchText = e.target.value;
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            dataList[j].select_options = _this.scrollDataList;
        });
    };
    AddeditaccountsComponent.prototype.onClearLang = function (dataList, j) {
        var _this = this;
        this.len = 0;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        this.searchText = '';
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            dataList[j].select_options = _this.scrollDataList;
        });
    };
    AddeditaccountsComponent.prototype.mapPopUP = function () {
        this.mapLocation.show();
    };
    AddeditaccountsComponent.prototype.closemapsearch = function () {
        this.mapLocation.hide();
    };
    AddeditaccountsComponent.prototype.autotext = function () {
        var _this = this;
        var map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 50.064192, lng: -130.605469 },
            zoom: 3,
        });
        var card = document.getElementById("pac-card");
        var input = document.getElementById("pac-input");
        var countries = document.getElementById("country-selector");
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
        var autocomplete = new google.maps.places.Autocomplete(input);
        // Set initial restrict to the greater list of countries.
        autocomplete.setComponentRestrictions({
            country: ["us"],
        });
        // Specify only the data fields that are needed.
        autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById("infowindow-content");
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
        });
        autocomplete.addListener("place_changed", function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!_this.geocoder)
                _this.geocoder = new google.maps.Geocoder();
            //this.findLocation(place);
            console.log('place', place);
            if (place.address_components) {
                console.log('address_components', place.address_components);
                _this.customCompnentValues.forEach(function (t) {
                    try {
                        if ((t.dt_code == 'select' && t.select_options != null && t.name == 'BillingCountry') || (t.dt_code == 'select' && t.select_options != null && t.name == 'BillingState')) {
                            _this.form.get(t.form_controlName).setValue(null);
                        }
                        if (t.name == 'BillingPostalCode' || t.name == 'BillingCity' || t.name == 'BillingStreet') {
                            _this.form.get(t.form_controlName).setValue('');
                        }
                        var route_1 = '';
                        var street_1 = '';
                        place.address_components.forEach(function (p) {
                            p.types.forEach(function (s) {
                                //console.log('s', s);   
                                if (s == 'country') {
                                    //console.log('s', s);
                                    if (t.dt_code == 'select' && t.select_options != null && t.name == 'BillingCountry') {
                                        try {
                                            t.select_options.forEach(function (itemList) {
                                                var cntryname = p.long_name;
                                                if (itemList.name == cntryname) {
                                                    _this.form.get(t.form_controlName).setValue(itemList.value);
                                                }
                                            });
                                        }
                                        catch (_a) { }
                                    }
                                }
                                if (s == 'administrative_area_level_1') {
                                    if (t.dt_code == 'select' && t.select_options != null && t.name == 'BillingState') {
                                        try {
                                            t.select_options.forEach(function (itemList) {
                                                var statename = p.long_name;
                                                if (itemList.name == statename) {
                                                    _this.form.get(t.form_controlName).setValue(itemList.value);
                                                }
                                            });
                                        }
                                        catch (_b) { }
                                    }
                                }
                                if (s == 'postal_code') {
                                    if (t.name == 'BillingPostalCode') {
                                        _this.form.get(t.form_controlName).setValue(p.long_name);
                                    }
                                }
                                if (s == 'locality') {
                                    if (t.name == 'BillingCity') {
                                        _this.form.get(t.form_controlName).setValue(p.long_name);
                                    }
                                }
                                if (s == 'street_number') {
                                    street_1 = p.long_name;
                                }
                                if (s == 'route') {
                                    route_1 = p.long_name;
                                }
                            });
                        });
                        if (t.name == 'BillingStreet') {
                            console.log('street', street_1);
                            console.log('route', route_1);
                            var street_value = street_1 + ' ' + route_1;
                            _this.form.get(t.form_controlName).setValue(street_value);
                        }
                    }
                    catch (_a) { }
                    _this.closemapsearch();
                });
            }
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            }
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(17); // Why 17? Because it looks good.
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            var address = "";
            if (place.address_components) {
                address = [
                    (place.address_components[0] &&
                        place.address_components[0].short_name) ||
                        "",
                    (place.address_components[1] &&
                        place.address_components[1].short_name) ||
                        "",
                    (place.address_components[2] &&
                        place.address_components[2].short_name) ||
                        "",
                ].join(" ");
            }
            //infowindowContent.children["place-icon"].src = place.icon;
            //infowindowContent.children["place-name"].textContent = place.name;
            //infowindowContent.children["place-address"].textContent = address;
            //infowindow.open(map, marker);
        });
        // Sets a listener on a given radio button. The radio buttons specify
        // the countries used to restrict the autocomplete search.
        //function setupClickListener(id, countries) {
        //  const radioButton = document.getElementById(id) as HTMLElement;
        //  radioButton.addEventListener("click", () => {
        //    autocomplete.setComponentRestrictions({ country: countries });
        //  });
        //}
        //setupClickListener("changecountry-usa", "us");
        //setupClickListener("changecountry-usa-and-uot", [
        //  "us",
        //  "pr",
        //  "vi",
        //  "gu",
        //  "mp",         
        //]);
    };
    AddeditaccountsComponent.prototype.setFile = function ($event) {
        this.commonService.uploadImageFileValidator($event);
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "10MB");
        if (this.commonService.isFileValid) {
            this.fileName = $event.target.files[0].name;
            ///this.companyLogo.setValue($event.target.files[0].name);
        }
    };
    AddeditaccountsComponent.prototype.checkFundingOptions = function (e, formControlList) {
        console.log("checkFundingOptions", e.target.textContent);
        debugger;
        if (e.target.textContent != "") {
            //if (e.target.textContent == 'Dealer') {
            //  this.isdelare = true;
            //}
            //else {
            //  this.isdelare = false;
            //}
            formControlList.forEach(function (t1) {
                var groupCheck = formControlList.filter(function (y) { return y.group_id == t1.group_id; });
                var companyFieldName;
                groupCheck[0].InnerData.forEach(function (t) {
                    if (t.ColumnName == 'split_percentage') {
                        companyFieldName = t.form_controlName;
                        t.form_field_visibility = 'NO';
                        t.edit_form_field_visibility = 'NO';
                        t.is_required = false;
                        //if (this.form.get(companyFieldName) != null) {
                        //  this.form.get(companyFieldName).setValidators(Validators.nullValidator);
                        //}
                        if (e.target.textContent == "Split") {
                            t.form_field_visibility = 'YES';
                            t.edit_form_field_visibility = 'YES';
                            t.is_required = true;
                            //if (this.form.get(companyFieldName) != null) {
                            //  this.form.get(companyFieldName).setValidators(Validators.required);
                            //}
                        }
                    }
                });
            });
        }
    };
    AddeditaccountsComponent.prototype.checkToggle = function (e, formControlList, controlname) {
        console.log("checkToggle", controlname);
        console.log("checkToggle e", e.target.checked);
        if (controlname == "four_month_payment") { //if selected then # of Months=4
            var companyFieldName_1;
            formControlList.forEach(function (t1) {
                var groupCheck = formControlList.filter(function (y) { return y.group_id == t1.group_id; });
                groupCheck[0].InnerData.forEach(function (t) {
                    if (t.ColumnName == 'dealer_num_of_months') {
                        companyFieldName_1 = t.form_controlName;
                        if (e.target.checked) {
                            t.is_readOnly = true;
                        }
                        else {
                            t.is_readOnly = false;
                        }
                    }
                });
            });
            if (e.target.checked) {
                if (this.form.get(companyFieldName_1) != null) {
                    this.form.get(companyFieldName_1).setValue("4");
                }
            }
            else {
                if (this.form.get(companyFieldName_1) != null) {
                    this.form.get(companyFieldName_1).setValue("0");
                }
            }
        }
    };
    AddeditaccountsComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _accountservice_service__WEBPACK_IMPORTED_MODULE_5__["AccountserviceService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapLocation', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], AddeditaccountsComponent.prototype, "mapLocation", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", Object)
    ], AddeditaccountsComponent.prototype, "fileInput", void 0);
    AddeditaccountsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditaccounts',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditaccounts.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/internalaccounts/addeditaccounts.component.html")).default,
            providers: [_accountservice_service__WEBPACK_IMPORTED_MODULE_5__["AccountserviceService"]],
            styles: [__importDefault(__webpack_require__(/*! ./addeditaccounts.component.scss */ "./src/app/views/internalaccounts/addeditaccounts.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _accountservice_service__WEBPACK_IMPORTED_MODULE_5__["AccountserviceService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"]])
    ], AddeditaccountsComponent);
    return AddeditaccountsComponent;
}());



/***/ }),

/***/ "./src/app/views/internalaccounts/internalaccount-routing.module.ts":
/*!**************************************************************************!*\
  !*** ./src/app/views/internalaccounts/internalaccount-routing.module.ts ***!
  \**************************************************************************/
/*! exports provided: InternalAccountRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InternalAccountRoutingModule", function() { return InternalAccountRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _accountslist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accountslist.component */ "./src/app/views/internalaccounts/accountslist.component.ts");
/* harmony import */ var _addeditaccounts_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditaccounts.component */ "./src/app/views/internalaccounts/addeditaccounts.component.ts");
/* harmony import */ var _accountviewdetail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accountviewdetail.component */ "./src/app/views/internalaccounts/accountviewdetail.component.ts");
/* harmony import */ var _accountviewdetailNew_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accountviewdetailNew.component */ "./src/app/views/internalaccounts/accountviewdetailNew.component.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../auth/auth.guard */ "./src/app/auth/auth.guard.ts");
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
    { path: '', component: _accountslist_component__WEBPACK_IMPORTED_MODULE_2__["AccountslistComponent"] },
    { path: 'addaccount', component: _addeditaccounts_component__WEBPACK_IMPORTED_MODULE_3__["AddeditaccountsComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]], data: { privilegeCode: 'ACCOUNTADD' } },
    { path: 'editaccount/:id', component: _addeditaccounts_component__WEBPACK_IMPORTED_MODULE_3__["AddeditaccountsComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]], data: { privilegeCode: 'ACCOUNTUPDATE' } },
    { path: 'viewaccount/:id', component: _accountviewdetail_component__WEBPACK_IMPORTED_MODULE_4__["AccountviewdetailComponent"] },
    { path: 'view/:id', component: _accountviewdetailNew_component__WEBPACK_IMPORTED_MODULE_5__["AccountviewdetailNewComponent"] },
];
var InternalAccountRoutingModule = /** @class */ (function () {
    function InternalAccountRoutingModule() {
    }
    InternalAccountRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], InternalAccountRoutingModule);
    return InternalAccountRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/internalaccounts/internalaccount.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/views/internalaccounts/internalaccount.module.ts ***!
  \******************************************************************/
/*! exports provided: InternalAccountModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InternalAccountModule", function() { return InternalAccountModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _accountslist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./accountslist.component */ "./src/app/views/internalaccounts/accountslist.component.ts");
/* harmony import */ var _internalaccount_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./internalaccount-routing.module */ "./src/app/views/internalaccounts/internalaccount-routing.module.ts");
/* harmony import */ var _addeditaccounts_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addeditaccounts.component */ "./src/app/views/internalaccounts/addeditaccounts.component.ts");
/* harmony import */ var _accountviewdetail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./accountviewdetail.component */ "./src/app/views/internalaccounts/accountviewdetail.component.ts");
/* harmony import */ var _accountviewdetailNew_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./accountviewdetailNew.component */ "./src/app/views/internalaccounts/accountviewdetailNew.component.ts");
/* harmony import */ var _lender_lender_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lender/lender.module */ "./src/app/views/lender/lender.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';







var InternalAccountModule = /** @class */ (function () {
    function InternalAccountModule() {
    }
    InternalAccountModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_accountslist_component__WEBPACK_IMPORTED_MODULE_7__["AccountslistComponent"], _addeditaccounts_component__WEBPACK_IMPORTED_MODULE_9__["AddeditaccountsComponent"], _accountviewdetail_component__WEBPACK_IMPORTED_MODULE_10__["AccountviewdetailComponent"], _accountviewdetailNew_component__WEBPACK_IMPORTED_MODULE_11__["AccountviewdetailNewComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _internalaccount_routing_module__WEBPACK_IMPORTED_MODULE_8__["InternalAccountRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
                _lender_lender_module__WEBPACK_IMPORTED_MODULE_12__["LenderModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalModule"]
            ]
        })
    ], InternalAccountModule);
    return InternalAccountModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-internalaccounts-internalaccount-module.js.map