(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-product-products-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/addeditproduct.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/addeditproduct.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/product\">Manage Products</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList\">\r\n        <h3 class=\"form-heading\" *ngIf=\"item.group_name!='Additional Information'\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row  mb-2\">\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData\">\r\n\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : inner.form_field_visibility == 'NO', 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!----------------------------------------->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO'\" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES'\">\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint'\" />\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n                <p-calendar inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                <!--============================== For CheckBox ===========================-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\">\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--============================================================================-->\r\n                <!--============================== For Boolean ===========================-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\">\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <!--============================================================================-->\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options==''\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true'\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-1\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/productlist.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/productlist.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Products</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Products</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"row searchfield mr-1 w-100\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Product Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"searchProduct()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <a class=\"btn btn-white form-btns\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"dt-buttons\">\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i> </span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/product/addProduct\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add Product\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       [rowHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [scrollbarH]=\"true\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'ProductName'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/product/viewproducts',row.ID]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'ProductName'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                </div>\r\n                <div [title]=\"(row[col.COLUMN_NAME] | DateTimeToLocal)\" *ngIf=\"col.DATA_TYPE=='date' || col.DATA_TYPE=='datetime' || col.FieldType == 'datetime'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.DATA_TYPE!='datetime' && col.DATA_TYPE!='bit' && col.FieldType != 'select' && col.FieldType != 'datetime'\">\r\n                  {{row[col.COLUMN_NAME]}}\r\n                </div>\r\n                <div *ngIf=\"col.FieldType == 'select'\">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                  <div *ngIf=\"col.FieldFrom==null\">\r\n                    <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                      <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                      <div *ngIf=\"itemColorCode.colorkey!=undefined\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <!--<div class=\"text-center\">\r\n\r\n                <a *ngIf='modulePermission!==null && modulePermission.roleModuleReadFlag' [routerLink]=\"['/product/editProduct',row.ID]\" title=\"Edit\"><i class=\"fa fa-pencil text-success mr-2\"></i></a>\r\n                <a *ngIf='modulePermission!==null && modulePermission.roleModuleDeleteFlag' title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n\r\n              </div>-->\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.ID\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.ID}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <a class=\"actions-onclick view-list\" [routerLink]=\"['/product/viewproducts',row.ID]\" href=\"javascript:void(0);\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>\r\n                    <a *ngIf='isUpdate' class=\"actions-onclick view-list\" [routerLink]=\"['/product/editProduct',row.ID]\" title=\"Edit\"><i class=\"fa fa-pencil text-success mr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"Product\" subModuleName=\"Products\"></app-searchfilteradd>\r\n<app-manageview (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"Product\" subModuleName=\"Products\"></app-manageview>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/viewproduct.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/viewproduct.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Product Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/product\">Manage Products</a></li>\r\n      <li class=\"active\">Product Details</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-3 mb-4 border\">\r\n\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-list bg-info text-white float-left p-1 mr-2\"></i>\r\n    <span class=\"float-left\"><span>Product</span> {{ProductName}}</span>\r\n    <span class=\"cntnt-right-btn mr15\">\r\n      <a [routerLink]=\"['/product/editProduct',productid]\" class=\"btn btn-success text-white mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n  <div class=\"col-12 float-left  d-flex p-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n\r\n      <div class=\"col py-3\" *ngIf=\"item.ColumnName!='ProductName'\">\r\n        <span class=\"d-block\"><strong>{{ item.display_name}}:</strong> {{ item.value}}</span>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:none\">\r\n  <div class=\"card-body p-0\">\r\n    <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link active show\" data-toggle=\"tab\" href=\"#details\" role=\"tab\" aria-controls=\"details\" aria-selected=\"false\">Details</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" data-toggle=\"tab\" href=\"#related\" role=\"tab\" aria-controls=\"related\" aria-selected=\"true\">Related</a>\r\n      </li>\r\n    </ul>\r\n    <div class=\"tab-content scroll-in-content\" id=\"myTabContent\">\r\n      <div class=\"tab-pane fade active show p-0 border-top-0\" id=\"details\" role=\"tabpanel\" aria-labelledby=\"profile-tab\">\r\n        <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <form [formGroup]=\"form\" *ngIf=\"form\">\r\n            <ng-container *ngFor=\"let item of formControlList\">\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span> {{item.group_name}}</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body row px-0 mt-0\">\r\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                      <div class=\"input-group border-bottom\">\r\n                        <div class=\"col-sm-12 col-md-6 px-0\">\r\n                          <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                        </div>\r\n                        <div class=\"col-sm-12 col-md-6\">\r\n                          <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean'\" class=\"py-2 d-block\">{{ inner.value}}</span>\r\n                          <!--============================== For CheckBox ===========================-->\r\n                          <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                            <div class=\"form-check form-check-inline\">\r\n                              <div class=\"custom-control custom-checkbox pl-0\">\r\n                                <label class=\"switch  mb-0\">\r\n                                  <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                  <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                </label>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                          <!--============================== For CheckBox ===========================-->\r\n                          <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                            <div class=\"form-check form-check-inline\">\r\n                              <div class=\"custom-control custom-checkbox pl-0\">\r\n                                <label class=\"switch mb-0\">\r\n                                  <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                  <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                </label>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-container>\r\n          </form>\r\n        </div>\r\n      </div>\r\n      <div class=\"tab-pane fade p-0 border-0\" id=\"related\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n        <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#campaignManagers\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>Price Books ({{priceBooksCount}})</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"campaignManagers\" class=\"panel-collapse collapse active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                   [rows]=\"lstPriceBooks.data\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [footerHeight]=\"40\"\r\n                                   \r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [count]=\"lstPriceBooks.pager.totalItems\"\r\n                                   [offset]=\"lstPriceBooks.pager.currentPage\"\r\n                                   [limit]=\"lstPriceBooks.pager.pageSize\"\r\n                                   (page)='setPriceBooksPageNo($event)'\r\n                                   (sort)=\"onPriceBooksSort($event)\">\r\n\r\n                      <ngx-datatable-column name=\"Price Book Name\" prop=\"PriceBookName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"List Price\" prop=\"ListPrice\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <span [title]=\"row.ListPrice\">{{' '+row.ListPrice | currency:'USD':'symbol-narrow':'1.2-2'}}</span>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Use Standard Price\" prop=\"UseStandardPrice\" [sortable]=\"false\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <label class=\"switch mb-0\">\r\n                            <input type=\"checkbox\" id=\"chk_{{row.Id}}\" [checked]=\"row.UseStandardPrice\" disabled>\r\n                            <span class=\"slider round\" id=\"chk_{{row.Id}}\"> </span>\r\n                          </label>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Active\" prop=\"Active\" [sortable]=\"false\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <label class=\"switch mb-0\">\r\n                            <input type=\"checkbox\" id=\"chkActive_{{row.Id}}\" [checked]=\"row.Active\" disabled>\r\n                            <span class=\"slider round\" id=\"chkActive_{{row.Id}}\"> </span>\r\n                          </label>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n\r\n                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"lstPriceBooks.pager.pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"lstPriceBooks.pager.currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\">\r\n                            {{rowCount}} total\r\n                          </div>\r\n\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                           [page]=\"lstPriceBooks.pager.currentPage\"\r\n                                           [size]=\"lstPriceBooks.pager.pageSize\"\r\n                                           [count]=\"lstPriceBooks.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / lstPriceBooks.pager.pageSize) > 1)\"\r\n                                           (change)=\"setPriceBooksPageNo($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>Notes (0)</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"notes\" class=\"panel-collapse collapse active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <div class=\"w-100 text-center text-danger\">No Record Found.</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#files\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>Files (0)</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"files\" class=\"panel-collapse collapse  active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <div class=\"w-100 text-center text-danger\">No Record Found.</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#quotes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>Quotes (0)</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"quotes\" class=\"panel-collapse collapse  active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <div class=\"w-100 text-center text-danger\">No Record Found.</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#quotesInventer\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>Quotes (Inverter) (0)</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"quotesInventer\" class=\"panel-collapse collapse  active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <div class=\"w-100 text-center text-danger\">No Record Found.</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#quotesRacking\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>Quotes (Racking) (0)</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"quotesRacking\" class=\"panel-collapse collapse  active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <div class=\"w-100 text-center text-danger\">No Record Found.</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#campaigns\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>Campaigns ({{campaignCount}})</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"campaigns\" class=\"panel-collapse collapse active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                   [rows]=\"lstCampaigns.data\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [footerHeight]=\"40\"\r\n                                   \r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [count]=\"lstCampaigns.pager.totalItems\"\r\n                                   [offset]=\"lstCampaigns.pager.currentPage\"\r\n                                   [limit]=\"lstCampaigns.pager.pageSize\"\r\n                                   (page)='setCampaignPageNo($event)'\r\n                                   (sort)=\"onCampaignsSort($event)\">\r\n\r\n                      <ngx-datatable-column name=\"Campaign Name\" prop=\"CampaignName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Start Date\" prop=\"StartDate\" [sortable]=\"true\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <span [title]=\"row.StartDate\">{{row.StartDate | DateTimeToLocal}}</span>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>\r\n\r\n                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"lstCampaigns.pager.pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"lstCampaigns.pager.currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\">\r\n                            {{rowCount}} total\r\n                          </div>\r\n\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                           [page]=\"lstCampaigns.pager.currentPage\"\r\n                                           [size]=\"lstCampaigns.pager.pageSize\"\r\n                                           [count]=\"lstCampaigns.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / lstCampaigns.pager.pageSize) > 1)\"\r\n                                           (change)=\"setCampaignPageNo($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#serviceTerritoriesPanel\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>Service Territories Panel (0)</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"serviceTerritoriesPanel\" class=\"panel-collapse collapse active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <div class=\"w-100 text-center text-danger\">No Record Found.</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#serviceTerritoriesInverter\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>Service Territories Inverter (0)</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"serviceTerritoriesInverter\" class=\"panel-collapse collapse active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <div class=\"w-100 text-center text-danger\">No Record Found.</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#statePanel\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>State Panel (0)</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"statePanel\" class=\"panel-collapse collapse active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <div class=\"w-100 text-center text-danger\">No Record Found.</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"panel active\">\r\n            <div class=\"panel-heading\">\r\n              <h4 class=\"panel-title\">\r\n                <a href=\"#stateDefaultInverter\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                  <span>State Default Inverter (0)</span>\r\n                </a>\r\n              </h4>\r\n            </div>\r\n            <div id=\"stateDefaultInverter\" class=\"panel-collapse collapse active show\" style=\"\">\r\n              <div class=\"panel-body row px-3\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped\">\r\n                    <div class=\"w-100 text-center text-danger\">No Record Found.</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"clearfix\"></div>\r\n   \r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/product/addeditproduct.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/product/addeditproduct.component.ts ***!
  \***********************************************************/
/*! exports provided: AddeditproductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditproductComponent", function() { return AddeditproductComponent; });
/* harmony import */ var _productlist_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./productlist.service */ "./src/app/views/product/productlist.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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







var AddeditproductComponent = /** @class */ (function () {
    function AddeditproductComponent(fb, productlistService, router, toaster, route, commonService, location) {
        var _this = this;
        this.fb = fb;
        this.productlistService = productlistService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.location = location;
        this.config = [];
        this.moduleName = 'Product';
        this.submoduleName = 'Products';
        this.loadSave = false;
        this.Id = '';
        this.isLead = false;
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _productlist_service__WEBPACK_IMPORTED_MODULE_0__["JsonData"]();
        this.displayType = 'ADD';
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
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
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'PRODUCTSADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'PRODUCTSUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'PRODUCTSDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
    }
    AddeditproductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('Id');
            if (id) {
                _this.loadSave = true;
                _this.Id = id;
                _this.isLead = true;
                _this.pageTitle = 'Edit Product';
                _this.addOrUpdatePermission = _this.isUpdate;
                // this.fillLeadForm(this.Id);
            }
            else {
                _this.pageTitle = 'Add Product';
                _this.addOrUpdatePermission = _this.isAdd;
            }
        });
        this.loadSave = true;
        this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.productlistService.customFieldsList.data;
                //console.log("this.customCompnentValues", this.customCompnentValues);
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _productlist_service__WEBPACK_IMPORTED_MODULE_0__["CheckboxData"]();
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
                        //for (let config of this.formControlList) {
                        //}
                    }
                });
                var group_1 = {};
                data_type_name: Text;
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
                    // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"](group_1);
                // console.log("validationFROM", this.form);
                _this.loadSave = false;
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    AddeditproductComponent.prototype.checkvalue = function (formvalues, selval) {
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
    AddeditproductComponent.prototype.test = function (e) {
        // console.log('sssss', e);
        e.stopPropagation();
        e.preventDefault();
    };
    AddeditproductComponent.prototype.OnCheck = function () {
        // console.log(this.form);
    };
    AddeditproductComponent.prototype.onSubmit = function () {
        var _this = this;
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
            this.JsonData.Id = this.Id;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            this.JsonData.companyId = this.companyId;
            this.JsonData.userId = this.userId;
            this.JsonData.FormJsonData = JSON.stringify(this.form.value);
            this.productlistService.addEditForm(this.JsonData).subscribe(function (result) {
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
            this.commonService.validateAllFormFields(this.form);
            this.loadSave = false;
        }
    };
    AddeditproductComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"](formGroup);
    };
    AddeditproductComponent.prototype.close = function () {
        this.location.back();
    };
    //      this.form = new FormGroup(formGroup);
    //      // console.log("EdittttPageee", this.form);
    //      this.loadSave = false;
    //    }
    //  },
    //    (error: any) => {
    //      this.loadSave = false;
    //    })
    //}
    AddeditproductComponent.prototype.fillLeadForm = function (id) {
        var _this = this;
        this.addOrUpdatePermission = this.isUpdate;
        this.productlistService.GetProductDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe(function (result) {
            // // console.log("result1212", this.leadService.leadEditPage.data[0]);
            var edit;
            edit = _this.productlistService.editPage.data[0];
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
                    formGroup[cntname] = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](cntValue);
                });
                // this.form.value.reset();
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"](formGroup);
                //for checkboxes on form
                try {
                    _this.checkboxdata1.forEach(function (item) {
                        _this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                    });
                    //this.checkboxdata1.forEach((item) => { // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });
                }
                catch (err) { }
                // console.log("formGroup", this.form.value);
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditproductComponent.prototype.MakeArray = function (value, type) {
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
    AddeditproductComponent.prototype.MakeNormalArray = function (value) {
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
    AddeditproductComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
            //objItem.select_options = array;
        }
        return array;
    };
    AddeditproductComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        // console.log('new', e);
        //const index2: number = this.formControlList.indexOf(groupdisp);
        //const index1: number = controldisp.display_order;
        var checkboxdatanew = new _productlist_service__WEBPACK_IMPORTED_MODULE_0__["CheckboxData"]();
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
    AddeditproductComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _productlist_service__WEBPACK_IMPORTED_MODULE_0__["ProductListService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"] }
    ]; };
    AddeditproductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-addeditproduct',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditproduct.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/addeditproduct.component.html")).default,
            //styleUrls: ['./addeditproduct.component.scss']
            providers: [_productlist_service__WEBPACK_IMPORTED_MODULE_0__["ProductListService"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _productlist_service__WEBPACK_IMPORTED_MODULE_0__["ProductListService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"]])
    ], AddeditproductComponent);
    return AddeditproductComponent;
}());

//export class AddeditproductComponent implements OnInit {
//  config: any[] = [];
//  control: any;
//  group_id: any;
//  group_name: any;
//  group_display_name: any;
//  customCompnentValues: any;
//  form: FormGroup;
//  formGroup: FormGroup;
//  companyId: any;
//  grpId: any;
//  sDtaa: any;
//  moduleName = 'Product';
//  submoduleName = 'Products';
//  loadSave = false;
//  departmentId: any;
//  selected: any;
//  productId: any;
//  drpSelectValues: any;
//  pageTitle = 'View Product';
//  moduleRefrenceName: any;
//  sp_name: string;
//  showChild = false;
//  isLead = false;
//  formControlList: any[] = [];
//  errors: string[] = [];
//  userId: any;
//  Id: any;
//  JsonData: JsonData = new JsonData();
//  addOrUpdatePermission: boolean;
//  modulePermission: ModuleList;
//  constructor(private fb: FormBuilder, private productlistService: ProductListService, private router: Router,
//    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
//    const moduleCode = this.route.snapshot.data.moduleCode;
//    // console.log('Permission', moduleCode);
//    this.modulePermission = this.commonService.getPermission(moduleCode);
//    // console.log('Permission', this.modulePermission);
//    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
//      this.sp_name = 'sp_solgen_AddEditDepartment_custom';
//      this.companyId = userdetail.companyId;
//      this.userId = userdetail.id;
//    });
//  }
//  ngOnInit() {
//    this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
//      if (result) {
//        //this.form.setValue(null);
//        this.customCompnentValues = this.productlistService.customFieldsList.data;
//        // console.log("customCompnentValues", this.customCompnentValues);
//        let fieldArray = [];
//        this.customCompnentValues.forEach(t => {
//          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
//          if (groupCheck == null || groupCheck.length == 0) {
//            let obj = {
//              group_id: t.group_id,
//              group_name: t.group_name,
//              group_display_name: t.group_display_name,
//              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
//            }
//            this.formControlList.push(obj);
//            for (let config of this.formControlList) {
//            }
//          }
//        })
//        const group: any = {};
//        let val = null;
//        this.customCompnentValues.forEach(cnt => {
//          group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
//        });
//        this.form = new FormGroup(group);
//        if (this.Id != null && this.Id != 0) {
//         // this.fillForm(this.productId);
//        }
//      }
//    });
//    this.route.paramMap.subscribe(
//      params => {
//        const id = params.get('Id');
//        if (id) {
//          this.loadSave = true;
//          this.Id = id;
//          this.isLead = true;
//          this.pageTitle = 'Edit Product';
//          this.fillForm(this.Id);
//        } else {
//          this.pageTitle = 'Add Product';
//          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
//        }
//      }
//    );
//  }
//  onSubmit() {
//    this.loadSave = true;
//    //// console.log("EditVal", this.form);
//    if (this.form.valid) {
//      this.loadSave = true;
//      this.JsonData.Id = this.Id;
//      this.JsonData.moduleCode = this.moduleName;
//      this.JsonData.subModuleCode = this.submoduleName;
//      this.JsonData.companyId = this.companyId;
//      this.JsonData.userId = this.userId;
//      this.JsonData.FormJsonData = JSON.stringify(this.form.value);
//      this.productlistService.addEditForm(this.JsonData).subscribe((result: any) => {
//        if (result.statusCode == 200) {
//          //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
//          //// console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
//          //this.toaster.success(result.responseMessage);
//          setTimeout(() => {
//            this.toaster.success(result.responseMessage);
//            this.loadSave = false;
//            this.router.navigateByUrl("/product");
//          }, 1000);
//        }
//        else {
//          this.toaster.error(result.responseMessage);
//          this.loadSave = false;
//        }
//      }, error => {
//        this.loadSave = false;
//      });
//    }
//    else {
//      this.commonService.validateAllFormFields(this.form);
//      this.loadSave = false;
//    }
//  }
//  displayInsuranceDetail(reposnse): void {
//    const formGroup = {};
//    for (let prop of Object.keys(this.customCompnentValues)) {
//      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
//    }
//    this.form = new FormGroup(formGroup);
//  }
//  close() {
//    this.router.navigateByUrl("/product");
//  }
//  fillForm(id) {
//    this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
//    this.productlistService.GetProductDetails(id, this.moduleName, this.submoduleName).subscribe((result: any) => {
//      //// console.log("result1212", this.productlistService.editPage.data[0]);
//      let edit: any
//      edit = this.productlistService.editPage.data[0];
//      //let empty = null;
//      const formGroup = {};
//      if (result) {
//        Object.keys(edit).forEach(t => {
//          let cntname = t;
//          let cntValue = edit[t] == '' ? null : edit[t];
//          //// console.log("cntname", cntname)
//          //// console.log("cntname", cntValue)
//          formGroup[cntname] = new FormControl(cntValue);
//        })
//        // // console.log("formGroup", formGroup);
//        // this.form.value.reset();
//        this.form = new FormGroup(formGroup);
//        this.loadSave = false;
//      }
//    },
//      (error: any) => {
//        this.loadSave = false;
//      })
//  }
//  MakeArray(value, type) {
//    var array = [];
//    var arr = String(value).split(',');
//    if (type == "radio" || type == "checkbox") {
//      if (arr.length > 0) {
//        for (var i = 0; i < arr.length; i++) {
//          if (arr[i].split("|").length > 1) {
//            var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
//            array.push(person);
//          }
//          else {
//            var person = { name: arr[i], value: arr[i] };
//            array.push(person);
//          }
//        }
//      }
//    }
//    else {
//      if (arr.length > 0) {
//        for (var i = 0; i < arr.length; i++) {
//          var person = { name: arr[i], value: arr[i] };
//          array.push(person);
//        }
//      }
//    }
//    return array;
//  }
//  MakeNormalArray(value) {
//    if (value) {
//      try {
//        return JSON.parse(value);
//      }
//      catch (ex) {
//        return value;
//      }
//    }
//    else {
//      value = [];
//    }
//  }
//  MakeSelectArray(objItem) {
//    var array = [];
//    var arr = String(objItem.select_options).split(',');
//    if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
//      var person = { name: arr[0], value: arr[1] };
//      array.push(person);
//      //objItem.select_options = array;
//    }
//    return array
//  }
//}


/***/ }),

/***/ "./src/app/views/product/product-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/product/product-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ProductListRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListRoutingModule", function() { return ProductListRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _productlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productlist.component */ "./src/app/views/product/productlist.component.ts");
/* harmony import */ var _addeditproduct_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditproduct.component */ "./src/app/views/product/addeditproduct.component.ts");
/* harmony import */ var _viewproduct_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./viewproduct.component */ "./src/app/views/product/viewproduct.component.ts");
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
    { path: '', component: _productlist_component__WEBPACK_IMPORTED_MODULE_2__["ProductListComponent"] },
    { path: 'addProduct', component: _addeditproduct_component__WEBPACK_IMPORTED_MODULE_3__["AddeditproductComponent"] },
    { path: 'viewProduct/:id', component: _addeditproduct_component__WEBPACK_IMPORTED_MODULE_3__["AddeditproductComponent"] },
    { path: 'viewproducts/:id', component: _viewproduct_component__WEBPACK_IMPORTED_MODULE_4__["ViewproductComponent"] },
    { path: 'editProduct/:Id', component: _addeditproduct_component__WEBPACK_IMPORTED_MODULE_3__["AddeditproductComponent"] },
];
var ProductListRoutingModule = /** @class */ (function () {
    function ProductListRoutingModule() {
    }
    ProductListRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ProductListRoutingModule);
    return ProductListRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/product/productlist.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/views/product/productlist.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Byb2R1Y3QvcHJvZHVjdGxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/product/productlist.component.ts":
/*!********************************************************!*\
  !*** ./src/app/views/product/productlist.component.ts ***!
  \********************************************************/
/*! exports provided: ProductListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListComponent", function() { return ProductListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _productlist_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productlist.service */ "./src/app/views/product/productlist.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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










var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(prodlistService, dialogService, commonService, router, activeRoute, toaster, datetime) {
        var _this = this;
        this.prodlistService = prodlistService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.datetime = datetime;
        this.moduleName = 'Product';
        this.submoduleName = 'Products'; //'ProductMAster';
        this.custom_view_id = '';
        this.searchUserType = '';
        this.searchFilter = '';
        this.listFiltertext = '';
        // modulePermission: ModuleList;
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.pagedData = {
            pager: {},
            data: []
        };
        // listFilter = '';
        this.searchTxt = '';
        this.listFilter = '';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["SelectionType"];
        this.tableName = 'tblProductMaster'; //tblProducts';
        this.selected = [];
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
        });
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'PRODUCTSADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'PRODUCTSUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'PRODUCTSDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.SearhName = '';
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.refresh();
    };
    ProductListComponent.prototype.getListingColorCode = function (fieldValue) {
        // debugger
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        return this.lstListingColorCode;
        //console.log('this.lstListingColorCode', this.lstListingColorCode)
    };
    ProductListComponent.prototype.GetcustomViewid = function (event) {
        this.custom_view_id = event;
        this.refresh();
    };
    ProductListComponent.prototype.refresh = function () {
        var _this = this;
        this.deleteId = null;
        this.selected = [];
        this.loading = true;
        this.prodlistService.GetProductList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter)
            .subscribe(function (response) {
            _this.jsonData = response;
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            // console.log('this.columndata', this.columndata)
            //this.totalRecords = this.columndata[0].total_records;
            if (response.data.length > 0) {
                _this.totalRecords = _this.columndata[0].total_records;
                for (var i = 0; i < response.data.length; i++) {
                    if (parseInt(response.data[i].Wattage) >= 0) {
                        response.data[i].Wattage = _this.commonService.formatAmount(response.data[i].Wattage);
                    }
                    if (parseInt(response.data[i].Efficiency) >= 0) {
                        response.data[i].Efficiency = _this.commonService.formatAmount(response.data[i].Efficiency);
                    }
                    if (parseInt(response.data[i].AmountNeededPerkW) >= 0) {
                        response.data[i].AmountNeededPerkW = _this.commonService.formatAmount(response.data[i].AmountNeededPerkW);
                    }
                }
            }
            else {
                _this.totalRecords = 0;
            }
            _this.offset = _this.currentPage;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    Object.defineProperty(ProductListComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ProductListComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ProductListComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    ProductListComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    ProductListComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    ProductListComponent.prototype.updateFilter = function (event) {
        this.listFiltertext = "ProductName like '%" + event.target.value + "%'";
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.refresh();
        }
    };
    ProductListComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    ProductListComponent.prototype.searchProduct = function () {
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "ProductName like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    ProductListComponent.prototype.reset = function () {
        this.custom_view_id = '';
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.refresh();
    };
    ProductListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].ID.toString() + ",";
            }
        }
        else {
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].ID.toString() + ",";
            }
        }
    };
    ProductListComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    ProductListComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = " Are you sure you want to delete the selected product(s)?\"";
            this.dialogService.confirm('Delete Product(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.prodlistService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
                        _this.toaster.success("Selected Product(s) has been deleted successfully");
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
    ProductListComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Product  \"" + row.ProductName + "\"?";
        this.dialogService.confirm('Delete Product', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.prodlistService.DeleteRecords(row.ID, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Product \"" + row.ProductName + "\" has been deleted successfully.");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    ProductListComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    ProductListComponent.ctorParameters = function () { return [
        { type: _productlist_service__WEBPACK_IMPORTED_MODULE_2__["ProductListService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__["SearchfilteraddComponent"])
    ], ProductListComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_7__["ManageviewComponent"])
    ], ProductListComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], ProductListComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ProductListComponent.prototype, "offset", void 0);
    ProductListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-productlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./productlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/productlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./productlist.component.scss */ "./src/app/views/product/productlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_productlist_service__WEBPACK_IMPORTED_MODULE_2__["ProductListService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"]])
    ], ProductListComponent);
    return ProductListComponent;
}());



/***/ }),

/***/ "./src/app/views/product/products.module.ts":
/*!**************************************************!*\
  !*** ./src/app/views/product/products.module.ts ***!
  \**************************************************/
/*! exports provided: ProductsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsModule", function() { return ProductsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _productlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productlist.component */ "./src/app/views/product/productlist.component.ts");
/* harmony import */ var _product_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-routing.module */ "./src/app/views/product/product-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _addeditproduct_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addeditproduct.component */ "./src/app/views/product/addeditproduct.component.ts");
/* harmony import */ var _viewproduct_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./viewproduct.component */ "./src/app/views/product/viewproduct.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var ProductsModule = /** @class */ (function () {
    function ProductsModule() {
    }
    ProductsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_productlist_component__WEBPACK_IMPORTED_MODULE_2__["ProductListComponent"], _addeditproduct_component__WEBPACK_IMPORTED_MODULE_9__["AddeditproductComponent"], _viewproduct_component__WEBPACK_IMPORTED_MODULE_10__["ViewproductComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _product_routing_module__WEBPACK_IMPORTED_MODULE_3__["ProductListRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalModule"]
            ]
        })
    ], ProductsModule);
    return ProductsModule;
}());



/***/ }),

/***/ "./src/app/views/product/viewproduct.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/views/product/viewproduct.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Byb2R1Y3Qvdmlld3Byb2R1Y3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/product/viewproduct.component.ts":
/*!********************************************************!*\
  !*** ./src/app/views/product/viewproduct.component.ts ***!
  \********************************************************/
/*! exports provided: ViewproductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewproductComponent", function() { return ViewproductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _productlist_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productlist.service */ "./src/app/views/product/productlist.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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








var ViewproductComponent = /** @class */ (function () {
    function ViewproductComponent(dialogService, productlistService, commonService, fb, router, toaster, route, location) {
        this.dialogService = dialogService;
        this.productlistService = productlistService;
        this.commonService = commonService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.location = location;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.sortDir = 'desc';
        this.sortColumn = 'createdon';
        this.moduleName = 'Product';
        this.submoduleName = 'Products';
        this.formControlList = [];
        this.loadSave = false;
        this.displayType = 'VIEW';
        this.lstPriceBooks = {
            pager: {},
            data: []
        };
        this.lstCampaigns = {
            pager: {},
            data: []
        };
        this.checkboxdata1 = [];
        this.pageSize = 4;
        this.priceBooksCount = 0;
        this.campaignCount = 0;
        this.priceBooksPageNo = 1;
        this.campaignPageNo = 1;
    }
    ViewproductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.productid = id;
        });
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.loadSave = true;
        this.GetCustomFieldsList();
        this.getRelatedProducts();
    };
    ViewproductComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ViewproductComponent.prototype.close = function () {
        this.router.navigateByUrl("/product");
    };
    ViewproductComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.productid, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.productlistService.customFieldsList.data;
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _productlist_service__WEBPACK_IMPORTED_MODULE_1__["CheckboxData"]();
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
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"](group_1);
                _this.GetCustomFieldsListTopRow();
                _this.loadSave = false;
            }
        });
    };
    ViewproductComponent.prototype.GetCustomFieldsListTopRow = function () {
        var _this = this;
        this.displayType = 'VIEW_TOP';
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
                    if (cnt.ColumnName == 'ProductName') {
                        _this.ProductName = cnt.value;
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
                });
                _this.loadSave = false;
            }
        });
    };
    ViewproductComponent.prototype.getRelatedProducts = function () {
        this.pageSize = 4;
        this.refreshPriceBooksList();
        this.refreshCampaignList();
    };
    ViewproductComponent.prototype.refreshPriceBooksList = function () {
        var _this = this;
        this.productlistService.GetProductPriceBooksList(this.productid, this.sortColumn, this.sortDir, this.priceBooksPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstPriceBooks = resp;
            _this.priceBooksCount = resp.pager.totalItems;
        });
    };
    ViewproductComponent.prototype.refreshCampaignList = function () {
        var _this = this;
        this.productlistService.GetProductCampaignsList(this.productid, this.sortColumn, this.sortDir, this.campaignPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstCampaigns = resp;
            _this.campaignCount = resp.pager.totalItems;
        });
    };
    ViewproductComponent.prototype.onPriceBooksSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshPriceBooksList();
    };
    ViewproductComponent.prototype.onCampaignsSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshCampaignList();
    };
    ViewproductComponent.prototype.setPriceBooksPageNo = function ($event) {
        this.priceBooksPageNo = $event.page;
        this.refreshPriceBooksList();
    };
    ViewproductComponent.prototype.setCampaignPageNo = function ($event) {
        this.campaignPageNo = $event.page;
        this.refreshCampaignList();
    };
    ViewproductComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    ViewproductComponent.ctorParameters = function () { return [
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"] },
        { type: _productlist_service__WEBPACK_IMPORTED_MODULE_1__["ProductListService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] }
    ]; };
    ViewproductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewproduct',
            template: __importDefault(__webpack_require__(/*! raw-loader!./viewproduct.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/product/viewproduct.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./viewproduct.component.scss */ "./src/app/views/product/viewproduct.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"],
            _productlist_service__WEBPACK_IMPORTED_MODULE_1__["ProductListService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"]])
    ], ViewproductComponent);
    return ViewproductComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-product-products-module.js.map