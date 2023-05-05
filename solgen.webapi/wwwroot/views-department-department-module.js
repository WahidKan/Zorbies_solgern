(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-department-department-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/department/addeditdepartment.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/department/addeditdepartment.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/department\">Manage Department</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList\">\r\n        <!--<h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>-->\r\n        <div class=\"row  mb-2\">\r\n          <ng-container *ngFor=\"let inner of item.InnerData\">\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : inner.form_field_visibility == 'NO', 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO'\" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n                <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n              </a>-->\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES'\">\r\n                <!--text  [placeholder]=\"inner.display_name\"-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint'\" />\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                <p-calendar inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n\r\n                <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                <!--end calandar-->\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n                      <div class=\"custom-control custom-checkbox\">\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\"\r\n                               class=\"dynamic custom-control-input\">\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                        <!--<label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n  for=\"chk_{{inner.custom_field_id}}\">{{inner.display_name}}</label>-->\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                        <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                               [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n                        <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <!--Ng Dropdown-->\r\n                <!--Dropdown\r\n                picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n                -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.dt_code=='select' }\" *ngIf=\"inner.dt_code=='select' && inner.select_options==''\">\r\n                  <option value=\"\">Select</option>\r\n                  <option [value]=\"option.id\"\r\n                          *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n                    {{//option.value}}\r\n                  </option>\r\n                </select>-->\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options==''\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true'\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n                <!--Dropdown\r\n                  picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n                -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n                        (change)='onOptionsSelected($event,inner)'>\r\n                  <option value=\"\">Select</option>\r\n                  <option [value]=\"option.name\"\r\n                          *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n                    {{//option.name}}\r\n                  </option>\r\n                </select>-->\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-1\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/department/departmentlist.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/department/departmentlist.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Department</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Department</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-5 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i></span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i></span></a>\r\n                <a class=\"btn btn-white form-btns\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i></span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-7\">\r\n            <div class=\"dt-buttons\">\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i></span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/department/adddepartment\" class=\"btn btn-success form-btns mr-1\" tooltip=\"Add Department\"><i class=\"fa fa-plus\"></i></a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                          [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"50\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'DepartmentName'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/department/editdepartment',row.DepartmentIdAuto]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'DepartmentName'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE=='date'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                  <span class=\"status-box bg-success\" *ngIf=\"row[col.COLUMN_NAME] == true\">Enabled</span>\r\n                  <span class=\"status-box bg-danger\" *ngIf=\"row[col.COLUMN_NAME] == false\">Disabled</span>\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE !== 'bit'\">\r\n                  {{row[col.COLUMN_NAME] |  truncate}}\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n\r\n              <!--<div class=\"text-center\">\r\n\r\n                <a [routerLink]=\"['/department/editdepartment',row.DepartmentIdAuto]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                <a *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag' title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n              </div>-->\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.DepartmentIdAuto\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.DepartmentIdAuto}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n\r\n                    <a *ngIf=\"isUpdate\" [routerLink]=\"['/department/editdepartment',row.DepartmentIdAuto]\" class=\"actions-onclick view-list\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"users\" subModuleName=\"department\"></app-searchfilteradd>\r\n<app-manageview #templateManageView moduleName=\"users\" subModuleName=\"department\" (customViewid)=\"GetcustomViewid($event)\"></app-manageview>\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/department/addeditdepartment.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/department/addeditdepartment.component.ts ***!
  \*****************************************************************/
/*! exports provided: AddeditdepartmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditdepartmentComponent", function() { return AddeditdepartmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _department_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./department.service */ "./src/app/views/department/department.service.ts");
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






var AddeditdepartmentComponent = /** @class */ (function () {
    function AddeditdepartmentComponent(fb, departmentService, router, toaster, route, commonService) {
        var _this = this;
        this.fb = fb;
        this.departmentService = departmentService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.config = [];
        this.moduleName = 'users';
        this.submoduleName = 'department';
        this.loadSave = false;
        this.Id = '';
        this.isLead = false;
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _department_service__WEBPACK_IMPORTED_MODULE_5__["JsonData"]();
        this.addOrUpdatePermission = false;
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
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
        var priviledgeCode = this.route.snapshot.data.privilegeCode;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'DEPARTMENTADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.addOrUpdatePermission = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'DEPARTMENTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.addOrUpdatePermission = true;
        }
    }
    AddeditdepartmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.Id = id;
                _this.isLead = true;
                _this.displayType = 'EDIT';
                _this.pageTitle = 'Edit Department';
                //this.fillLeadForm(this.Id);
            }
            else {
                _this.displayType = 'ADD';
                _this.pageTitle = 'Add Department';
            }
        });
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = result.data;
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _department_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
                                //console.log(item.controlname, item.controlvalues);
                                _this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                            });
                        }
                        catch (err) { }
                    }
                    // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                //console.log("validationFROM", this.form);
                _this.loadSave = false;
            }
        });
    };
    AddeditdepartmentComponent.prototype.checkvalue = function (formvalues, selval) {
        var returnValue = false;
        if (formvalues != null) {
            //"formvaluesformvaluesformvalues", formvalues);
            formvalues.split(',').find(function (item) {
                if (item == selval) {
                    //console.log('abc');
                    returnValue = true;
                }
            });
        }
        return returnValue;
    };
    AddeditdepartmentComponent.prototype.test = function (e) {
        //console.log('sssss', e);
        e.stopPropagation();
        e.preventDefault();
    };
    AddeditdepartmentComponent.prototype.OnCheck = function () {
        //console.log(this.form);
    };
    AddeditdepartmentComponent.prototype.onSubmit = function () {
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
        //console.log("EditVal", this.form.value);
        if (this.form.valid) {
            this.loadSave = true;
            this.JsonData.Id = this.Id;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            this.JsonData.companyId = this.companyId;
            this.JsonData.userId = this.userId;
            this.JsonData.FormJsonData = JSON.stringify(this.form.value);
            this.departmentService.addEditForm(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
                    //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                    //console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
                    //this.toaster.success(result.responseMessage);
                    setTimeout(function () {
                        _this.toaster.success(result.responseMessage);
                        _this.loadSave = false;
                        _this.router.navigateByUrl("/department");
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
    AddeditdepartmentComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
    };
    AddeditdepartmentComponent.prototype.close = function () {
        this.router.navigateByUrl("/department");
    };
    AddeditdepartmentComponent.prototype.fillLeadForm = function (id) {
        var _this = this;
        this.departmentService.GetDepartmentDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe(function (result) {
            var edit;
            edit = _this.departmentService.editPage.data[0];
            //let empty = null;
            var formGroup = {};
            if (result) {
                Object.keys(edit).forEach(function (t) {
                    var cntname = t;
                    var cntValue = edit[t] == '' ? null : edit[t];
                    //console.log("cntname", cntname)
                    if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {
                        cntValue = JSON.parse(cntValue);
                    }
                    if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {
                        cntValue = (cntValue == 'true');
                        //console.log("cntValuecntValue", cntValue);
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
                        //console.log(item.controlname, item.controlvalues);
                        _this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                    });
                    //this.checkboxdata1.forEach((item) => {  console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });
                }
                catch (err) { }
                /////
                //console.log("formGroup", this.form.value);
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditdepartmentComponent.prototype.MakeArray = function (value, type) {
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
    AddeditdepartmentComponent.prototype.MakeNormalArray = function (value) {
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
    AddeditdepartmentComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
            //objItem.select_options = array;
        }
        return array;
    };
    AddeditdepartmentComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        //console.log('new', e);
        //const index2: number = this.formControlList.indexOf(groupdisp);
        //const index1: number = controldisp.display_order;
        var checkboxdatanew = new _department_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
        //console.log('sss', e);
        var dd = this.formControlList;
    };
    AddeditdepartmentComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _department_service__WEBPACK_IMPORTED_MODULE_5__["DepartmentService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    AddeditdepartmentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditdepartment',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditdepartment.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/department/addeditdepartment.component.html")).default,
            providers: [_department_service__WEBPACK_IMPORTED_MODULE_5__["DepartmentService"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _department_service__WEBPACK_IMPORTED_MODULE_5__["DepartmentService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], AddeditdepartmentComponent);
    return AddeditdepartmentComponent;
}());

//export class AddeditdepartmentComponent implements OnInit {
//  //@Input('moduleName') moduleName: any;
//  //@Input('submoduleName') submoduleName: any;
//  //@Output('pageTitle') pageTitle;
//  config: any[] = [];
//  control: any;
//  pageTitle: any;
//  group_id: any;
//  moduleName = 'user';
//  submoduleName = 'department';
//  group_name: any;
//  group_display_name: any;
//  customCompnentValues: any;
//  form: FormGroup;
//  formGroup: FormGroup;
//  companyId: any;
//  grpId: any;
//  sDtaa: any;
//  loadSave = false;
//  departmentId: any;
//  Id: any;
//  moduleRefrenceName: any;
//  sp_name: string;
//  showChild = false;
//  isLead = false;
//  formControlList: any[] = [];
//  errors: string[] = [];
//  JsonData: JsonData = new JsonData();
//  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private router: Router,
//    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
//    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
//      this.companyId = userdetail.companyId;
//      this.sp_name = 'sp_solgen_AddEditDepartment_custom';
//    });
//  }
//  ngOnInit() {
//    this.departmentService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
//      if (result) {
//      
//        //this.form.setValue(null);
//        this.customCompnentValues = this.departmentService.customFieldsList.data;
//        let fieldArray = [];
//        this.customCompnentValues.forEach(t => {
//          
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
//          this.form = new FormGroup(group);
//        if (this.departmentId != null) {
//          this.fillForm(this.departmentId);
//        }
//        console.log("validationFROM", this.form);
//      }
//    });
//    //EDIT case handle
//    this.route.paramMap.subscribe(
//      params => {
//        const id = params.get('id');
//        if (id) {
//          this.loadSave = true;
//         
//          this.Id = id;
//          this.fillForm(this.Id);
//          this.pageTitle = 'Edit Department';
//        }
//        else {
//          this.pageTitle = 'Add Department';
//        }
//      }
//    );
//  }
//  //Edit case handle 
//  displayInsuranceDetail(reposnse): void {
//    //this.form.patchValue({
//    //});
//    const formGroup = {};
//    for (let prop of Object.keys(this.customCompnentValues)) {
//      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
//    }
//    this.form = new FormGroup(formGroup);
//  }
//  onSubmit() {
//    
//    this.loadSave = true;
//    console.log("EditVal", this.form);
//    if (this.form.valid) {
//      this.JsonData.Id = this.Id;
//      this.JsonData.FormJsonData = JSON.stringify(this.form.value);
//      this.JsonData.moduleCode = this.moduleName;
//      this.JsonData.subModuleCode = this.submoduleName;
//      this.departmentService.addEditForm(this.JsonData).subscribe((result: any) => {
//        if (result.statusCode == 200) {
//          this.toaster.success(result.responseMessage);
//          setTimeout(() => {
//            this.loadSave = false;
//            this.router.navigateByUrl("/department");
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
//  CheckSetValue(event, formControl) {
//    
//    //this.form.get(formControl).setValue(JSON.stringify(event.target.checked));
//    this.form.get(formControl).setValue(event.target.checked);
//    console.log("Form", this.form);
//  }
//  close() {
//    if (!this.isLead) {
//      this.router.navigateByUrl("/department");
//    }
//    else {
//      this.router.navigateByUrl("/department");
//    }
//  }
//  fillForm(id) {
//    
//    //this.form.reset();
//    this.departmentService.GetDepartmentDetails(id, this.moduleName, this.submoduleName).subscribe((result: any) => {
//      //console.log("result1212", this.departmentService.editPage.data[0]);
//      let edit: any
//      if (this.departmentService.editPage.responseCode != 200) {
//        edit = this.departmentService.editPage.data[0];
//        console.log("editTB", edit);
//        const formGroup = {};
//        if (result) {
//          Object.keys(edit).forEach(t => {
//            let cntname = t;
//            let cntValue = edit[t] == '' ? null : edit[t];
//            //console.log("cntname", cntname)
//            //console.log("cntname", cntValue)
//            if (cntname == '7_IsActive') {
//              
//              cntValue == 'false' ? cntValue = 0 : cntValue = 1;
//            }
//            formGroup[cntname] = new FormControl(cntValue);
//          })
//          console.log("formGroup", formGroup);
//          // this.form.value.reset();
//          this.form = new FormGroup(formGroup);
//          console.log("EdittttPageee", this.form);
//          
//          this.loadSave = false;
//        }
//      }
//    },
//      (error: any) => {
//        this.loadSave = false;
//      })
//  }
//  validator(controlName,isRequired) {
//    if (isRequired == true) {
//      this.form.controls[controlName].setValidators(Validators.required);
//      this.form.controls[controlName].updateValueAndValidity();
//    }
//    else {
//      this.form.controls[controlName].setValidators(Validators.nullValidator);
//      this.form.controls[controlName].updateValueAndValidity();
//    }
//  }
//  //fillLeadForm(id) {
//  //  this.departmentService.GetLeadsDetails(id).subscribe((result: any) => {
//  //    console.log("result1212", this.departmentService.leadEditPage.data[0]);
//  //    let edit: any
//  //    edit = this.departmentService.leadEditPage.data[0];
//  //    //let empty = null;
//  //    const formGroup = {};
//  //    if (result) {
//  //      Object.keys(edit).forEach(t => {
//  //        let cntname = t;
//  //        let cntValue = edit[t] == '' ? null : edit[t];
//  //        console.log("cntname", cntname)
//  //        console.log("cntname", cntValue)
//  //        formGroup[cntname] = new FormControl(cntValue);
//  //      })
//  //      console.log("formGroup", formGroup);
//  //      // this.form.value.reset();
//  //      this.form = new FormGroup(formGroup);
//  //      console.log("EdittttPageee", this.form);
//  //      this.loadSave = false;
//  //    }
//  //  },
//  //    (error: any) => {
//  //      this.loadSave = false;
//  //    })
//  //}
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

/***/ "./src/app/views/department/department-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/department/department-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: DepartmentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentRoutingModule", function() { return DepartmentRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _departmentlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./departmentlist.component */ "./src/app/views/department/departmentlist.component.ts");
/* harmony import */ var _addeditdepartment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditdepartment.component */ "./src/app/views/department/addeditdepartment.component.ts");
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
    { path: '', component: _departmentlist_component__WEBPACK_IMPORTED_MODULE_2__["DepartmentlistComponent"] },
    { path: 'adddepartment', component: _addeditdepartment_component__WEBPACK_IMPORTED_MODULE_3__["AddeditdepartmentComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'DEPARTMENTADD' } },
    { path: 'editdepartment/:id', component: _addeditdepartment_component__WEBPACK_IMPORTED_MODULE_3__["AddeditdepartmentComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'DEPARTMENTUPDATE' } }
];
var DepartmentRoutingModule = /** @class */ (function () {
    function DepartmentRoutingModule() {
    }
    DepartmentRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DepartmentRoutingModule);
    return DepartmentRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/department/department.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/views/department/department.module.ts ***!
  \*******************************************************/
/*! exports provided: DepartmentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentModule", function() { return DepartmentModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _department_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./department-routing.module */ "./src/app/views/department/department-routing.module.ts");
/* harmony import */ var _departmentlist_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./departmentlist.component */ "./src/app/views/department/departmentlist.component.ts");
/* harmony import */ var _addeditdepartment_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./addeditdepartment.component */ "./src/app/views/department/addeditdepartment.component.ts");
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




var DepartmentModule = /** @class */ (function () {
    function DepartmentModule() {
    }
    DepartmentModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_departmentlist_component__WEBPACK_IMPORTED_MODULE_6__["DepartmentlistComponent"], _addeditdepartment_component__WEBPACK_IMPORTED_MODULE_7__["AddeditdepartmentComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _department_routing_module__WEBPACK_IMPORTED_MODULE_5__["DepartmentRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
            ]
        })
    ], DepartmentModule);
    return DepartmentModule;
}());



/***/ }),

/***/ "./src/app/views/department/departmentlist.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/views/department/departmentlist.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2RlcGFydG1lbnQvZGVwYXJ0bWVudGxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/department/departmentlist.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/department/departmentlist.component.ts ***!
  \**************************************************************/
/*! exports provided: DepartmentlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentlistComponent", function() { return DepartmentlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _department_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./department.service */ "./src/app/views/department/department.service.ts");
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









var DepartmentlistComponent = /** @class */ (function () {
    function DepartmentlistComponent(departmentService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.departmentService = departmentService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.moduleName = 'users';
        this.submoduleName = 'department';
        this.custom_view_id = '';
        this.searchUserType = '';
        // modulePermission: ModuleList;
        this.loading = false;
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["SelectionType"];
        this.sortDir = 'desc';
        this.sortColumn = 'DepartmentIdAuto';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.searchFilter = '';
        this.listFiltertext = '';
        this.tableName = 'tblDepartment';
        this.isApproveAccount = false;
        this.selected = [];
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.loadSave = false;
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        console.log('    this.modulePermission', this.modulePermission);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'DEPARTMENTADD'; });
        console.log('    this.modulePermission', this.modulePermission);
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'DEPARTMENTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'DEPARTMENTDELETE'; });
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
    DepartmentlistComponent.prototype.ngOnInit = function () {
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.refresh();
    };
    DepartmentlistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    DepartmentlistComponent.prototype.GetcustomViewid = function (event) {
        this.custom_view_id = event;
        this.refresh();
    };
    DepartmentlistComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.departmentService.GetDepartmentList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter)
            .subscribe(function (response) {
            _this.jsonData = _this.departmentService.pagedData;
            console.log("this.jsonData", _this.jsonData);
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            if (_this.jsonData.data.length > 0) {
                _this.totalRecords = _this.columndata[0].total_records;
                // console.log("Data", this.jsonData.schema);
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
    Object.defineProperty(DepartmentlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    DepartmentlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    DepartmentlistComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    DepartmentlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    DepartmentlistComponent.prototype.onChange = function ($event) {
        this.refresh();
    };
    DepartmentlistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    DepartmentlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    DepartmentlistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "DepartmentName like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    DepartmentlistComponent.prototype.reset = function () {
        this.table.selected = [];
        this.custom_view_id = '';
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.refresh();
    };
    DepartmentlistComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].DepartmentIdAuto.toString() + ",";
            }
        }
        else {
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].DepartmentIdAuto.toString() + ",";
            }
        }
    };
    DepartmentlistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    DepartmentlistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Department(s)\"";
            this.dialogService.confirm('Delete Department(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.departmentService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    DepartmentlistComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Department \"" + row.DepartmentName + "\"?";
        this.dialogService.confirm('Delete Department', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.departmentService.DeleteRecords(row.DepartmentIdAuto, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Department \"" + row.DepartmentName + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    DepartmentlistComponent.ctorParameters = function () { return [
        { type: _department_service__WEBPACK_IMPORTED_MODULE_5__["DepartmentService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_1__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__["SearchfilteraddComponent"])
    ], DepartmentlistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_7__["ManageviewComponent"])
    ], DepartmentlistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], DepartmentlistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], DepartmentlistComponent.prototype, "offset", void 0);
    DepartmentlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-departmentlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./departmentlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/department/departmentlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./departmentlist.component.scss */ "./src/app/views/department/departmentlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_department_service__WEBPACK_IMPORTED_MODULE_5__["DepartmentService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_1__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], DepartmentlistComponent);
    return DepartmentlistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-department-department-module.js.map