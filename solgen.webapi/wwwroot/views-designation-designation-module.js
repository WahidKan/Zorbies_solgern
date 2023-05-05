(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-designation-designation-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/designation/designationadd.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/designation/designationadd.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/designationlist\">Manage Designation</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList\">\r\n        <!--<h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>-->\r\n        <div class=\"row  mb-2\">\r\n          <ng-container *ngFor=\"let inner of item.InnerData\">\r\n\r\n\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : inner.form_field_visibility == 'NO', 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO'\" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n      <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n    </a>-->\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES'\">\r\n\r\n\r\n\r\n                <!--text  [placeholder]=\"inner.display_name\"-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='time' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='datetime'\" />\r\n\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n\r\n\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'datetime'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n\r\n\r\n                <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n      [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                <!--end calandar-->\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\"\r\n                               class=\"dynamic custom-control-input\">\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                        <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                     [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n              <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n\r\n\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\" />\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--Ng Dropdown-->\r\n                <!--Dropdown\r\n      picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n      -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.dt_code=='select' }\" *ngIf=\"inner.dt_code=='select' && inner.select_options==''\">\r\n        <option value=\"\">Select</option>\r\n        <option [value]=\"option.id\"\r\n                *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n          {{//option.value}}\r\n        </option>\r\n      </select>-->\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options==''\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true'\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n                <!--Dropdown\r\n        picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n      -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n              (change)='onOptionsSelected($event,inner)'>\r\n        <option value=\"\">Select</option>\r\n        <option [value]=\"option.name\"\r\n                *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n          {{option.name}}\r\n        </option>\r\n\r\n      </select>-->\r\n\r\n\r\n              </div>\r\n\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-1\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/designation/designationlist.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/designation/designationlist.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Designation</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Designation</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-6 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i></span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i></span></a>\r\n                <a class=\"btn btn-white form-btns\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i></span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"dt-buttons four-button\">\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i></span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/designationlist/adddesignation\" class=\"btn btn-success form-btns mr-1\" tooltip=\"Add Designation\"><i class=\"fa fa-plus\"></i></a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rowHeight]=\"40\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [scrollbarH]=\"true\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"50\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'Name'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/designationlist/editdesignation',row.ID]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'Name'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE=='date'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.COLUMN_NAME == 'IsActive'\">\r\n                  <span class=\"status-box bg-success\" *ngIf=\"row[col.COLUMN_NAME] == true\">Enabled</span>\r\n                  <span class=\"status-box bg-danger\" *ngIf=\"row[col.COLUMN_NAME] == false\">Disabled</span>\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.COLUMN_NAME !== 'IsActive'\">\r\n                  {{row[col.COLUMN_NAME] }}\r\n                </div>\r\n              </div>\r\n\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.ID\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.ID}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <a *ngIf='isUpdate' [routerLink]=\"['/designationlist/editdesignation',row.ID]\" class=\"actions-onclick view-list\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"users\" subModuleName=\"designation\"></app-searchfilteradd>\r\n<app-manageview (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"users\" subModuleName=\"designation\"></app-manageview>\r\n");

/***/ }),

/***/ "./src/app/views/designation/designation-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/designation/designation-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: DesignationRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignationRoutingModule", function() { return DesignationRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _designationlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./designationlist.component */ "./src/app/views/designation/designationlist.component.ts");
/* harmony import */ var _designationadd_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./designationadd.component */ "./src/app/views/designation/designationadd.component.ts");
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
    { path: '', component: _designationlist_component__WEBPACK_IMPORTED_MODULE_2__["DesignationlistComponent"] },
    { path: 'adddesignation', component: _designationadd_component__WEBPACK_IMPORTED_MODULE_3__["DesignationaddComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'DESIGNATIONADD' } },
    { path: 'editdesignation/:id', component: _designationadd_component__WEBPACK_IMPORTED_MODULE_3__["DesignationaddComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'DESIGNATIONUPDATE' } }
];
var DesignationRoutingModule = /** @class */ (function () {
    function DesignationRoutingModule() {
    }
    DesignationRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DesignationRoutingModule);
    return DesignationRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/designation/designation.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/designation/designation.module.ts ***!
  \*********************************************************/
/*! exports provided: DesignationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignationModule", function() { return DesignationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _designation_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./designation-routing.module */ "./src/app/views/designation/designation-routing.module.ts");
/* harmony import */ var _designationlist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./designationlist.component */ "./src/app/views/designation/designationlist.component.ts");
/* harmony import */ var _designationadd_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./designationadd.component */ "./src/app/views/designation/designationadd.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










var DesignationModule = /** @class */ (function () {
    function DesignationModule() {
    }
    DesignationModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_designationlist_component__WEBPACK_IMPORTED_MODULE_7__["DesignationlistComponent"], _designationadd_component__WEBPACK_IMPORTED_MODULE_8__["DesignationaddComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _designation_routing_module__WEBPACK_IMPORTED_MODULE_6__["DesignationRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]
            ]
        })
    ], DesignationModule);
    return DesignationModule;
}());



/***/ }),

/***/ "./src/app/views/designation/designationadd.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/views/designation/designationadd.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Rlc2lnbmF0aW9uL2Rlc2lnbmF0aW9uYWRkLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/designation/designationadd.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/designation/designationadd.component.ts ***!
  \***************************************************************/
/*! exports provided: DesignationaddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignationaddComponent", function() { return DesignationaddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _designationservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./designationservice.service */ "./src/app/views/designation/designationservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _internalaccounts_accountservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../internalaccounts/accountservice.service */ "./src/app/views/internalaccounts/accountservice.service.ts");
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







var DesignationaddComponent = /** @class */ (function () {
    function DesignationaddComponent(fb, designationService, router, toaster, route, commonService) {
        var _this = this;
        this.fb = fb;
        this.designationService = designationService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.config = [];
        this.moduleName = 'users';
        this.submoduleName = 'designation';
        this.loadSave = false;
        this.Id = '';
        this.isLead = false;
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _designationservice_service__WEBPACK_IMPORTED_MODULE_2__["JsonData"]();
        this.addOrUpdatePermission = false;
        this.modulePermission = [];
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
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase(); });
        if (add == undefined) {
            this.addOrUpdatePermission = false;
        }
        else {
            this.addOrUpdatePermission = true;
        }
    }
    DesignationaddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.Id = id;
                _this.isLead = true;
                _this.displayType = 'EDIT';
                _this.pageTitle = 'Edit Designation';
                //this.fillLeadForm(this.Id);
            }
            else {
                _this.displayType = 'ADD';
                _this.pageTitle = 'Add Designation';
            }
        });
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = result.data;
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _internalaccounts_accountservice_service__WEBPACK_IMPORTED_MODULE_6__["CheckboxData"]();
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
                console.log("formControlList", _this.formControlList);
                var group_1 = {};
                data_type_name: Text;
                _this.customCompnentValues.forEach(function (cnt) {
                    var val = null;
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
                        if (cnt.value == "") {
                            val = null;
                        }
                        else {
                            var val1 = new Date(cnt.value);
                            val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
                        }
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
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                // console.log("validationFROM", this.form);
                _this.loadSave = false;
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    DesignationaddComponent.prototype.checkvalue = function (formvalues, selval) {
        var returnValue = false;
        if (formvalues != null) {
            //console.log("formvaluesformvaluesformvalues", formvalues);
            formvalues.find(function (item) {
                if (item == selval) {
                    //console.log('abc');
                    returnValue = true;
                }
            });
        }
        return returnValue;
    };
    DesignationaddComponent.prototype.test = function (e) {
        //console.log('sssss', e);
        e.stopPropagation();
        e.preventDefault();
    };
    DesignationaddComponent.prototype.OnCheck = function () {
        console.log(this.form);
    };
    DesignationaddComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loadSave = true;
        this.checkboxdata1.forEach(function (item) {
            // console.log(item.controlname);
            _this.form.get(item.controlname).setValue(item.controlvalues);
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
            this.designationService.addEditForm(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
                    //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                    //console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
                    //this.toaster.success(result.responseMessage);
                    setTimeout(function () {
                        _this.toaster.success(result.responseMessage);
                        _this.loadSave = false;
                        _this.router.navigateByUrl("/designationlist");
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
    DesignationaddComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
    };
    DesignationaddComponent.prototype.close = function () {
        this.router.navigateByUrl("/designationlist");
    };
    DesignationaddComponent.prototype.fillLeadForm = function (id) {
        var _this = this;
        this.designationService.GetDesignationDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe(function (result) {
            var edit;
            edit = _this.designationService.editPage.data[0];
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
                    //this.checkboxdata1.forEach((item) => { console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });
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
    DesignationaddComponent.prototype.MakeArray = function (value, type) {
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
    DesignationaddComponent.prototype.MakeNormalArray = function (value) {
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
    DesignationaddComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
            //objItem.select_options = array;
        }
        return array;
    };
    DesignationaddComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        //console.log('new', e);
        //const index2: number = this.formControlList.indexOf(groupdisp);
        //const index1: number = controldisp.display_order;
        var checkboxdatanew = new _internalaccounts_accountservice_service__WEBPACK_IMPORTED_MODULE_6__["CheckboxData"]();
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
    DesignationaddComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _designationservice_service__WEBPACK_IMPORTED_MODULE_2__["DesignationService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] }
    ]; };
    DesignationaddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-designationadd',
            template: __importDefault(__webpack_require__(/*! raw-loader!./designationadd.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/designation/designationadd.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./designationadd.component.scss */ "./src/app/views/designation/designationadd.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _designationservice_service__WEBPACK_IMPORTED_MODULE_2__["DesignationService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], DesignationaddComponent);
    return DesignationaddComponent;
}());



/***/ }),

/***/ "./src/app/views/designation/designationlist.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/views/designation/designationlist.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Rlc2lnbmF0aW9uL2Rlc2lnbmF0aW9ubGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/designation/designationlist.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/designation/designationlist.component.ts ***!
  \****************************************************************/
/*! exports provided: DesignationlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignationlistComponent", function() { return DesignationlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _designationservice_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./designationservice.service */ "./src/app/views/designation/designationservice.service.ts");
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









var DesignationlistComponent = /** @class */ (function () {
    function DesignationlistComponent(designationService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.designationService = designationService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.moduleName = 'users';
        this.submoduleName = 'Designation';
        this.custom_view_id = '';
        this.searchUserType = '';
        //modulePermission: ModuleList;
        this.loading = false;
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["SelectionType"];
        this.sortDir = 'desc';
        this.sortColumn = 'ID';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.searchFilter = '';
        this.listFiltertext = '';
        this.tableName = 'tblDesignation';
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
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'DESIGNATIONADD'; });
        console.log('    this.modulePermission', this.modulePermission);
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'DESIGNATIONUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'DESIGNATIONDELETE'; });
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
    DesignationlistComponent.prototype.ngOnInit = function () {
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.refresh();
    };
    DesignationlistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    DesignationlistComponent.prototype.GetcustomViewid = function (event) {
        this.custom_view_id = event;
        this.refresh();
    };
    DesignationlistComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loading = true;
        this.designationService.GetDesignationList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter)
            .subscribe(function (response) {
            _this.jsonData = _this.designationService.pagedData;
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
    Object.defineProperty(DesignationlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    DesignationlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    DesignationlistComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    DesignationlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    DesignationlistComponent.prototype.onChange = function ($event) {
        this.refresh();
    };
    DesignationlistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    DesignationlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    DesignationlistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "Name like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    DesignationlistComponent.prototype.reset = function () {
        this.custom_view_id = '';
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.refresh();
    };
    DesignationlistComponent.prototype.onSelect = function (_a) {
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
    DesignationlistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    DesignationlistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Designation(s)\"";
            this.dialogService.confirm('Delete Designation(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.designationService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    DesignationlistComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Designation \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete Designation', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.designationService.DeleteRecords(row.ID, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Designation \"" + row.Name + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    DesignationlistComponent.ctorParameters = function () { return [
        { type: _designationservice_service__WEBPACK_IMPORTED_MODULE_5__["DesignationService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__["SearchfilteraddComponent"])
    ], DesignationlistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_7__["ManageviewComponent"])
    ], DesignationlistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], DesignationlistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], DesignationlistComponent.prototype, "offset", void 0);
    DesignationlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-designationlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./designationlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/designation/designationlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./designationlist.component.scss */ "./src/app/views/designation/designationlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_designationservice_service__WEBPACK_IMPORTED_MODULE_5__["DesignationService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"]])
    ], DesignationlistComponent);
    return DesignationlistComponent;
}());



/***/ }),

/***/ "./src/app/views/designation/designationservice.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/designation/designationservice.service.ts ***!
  \*****************************************************************/
/*! exports provided: DesignationService, JsonData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignationService", function() { return DesignationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonData", function() { return JsonData; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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




var DesignationService = /** @class */ (function () {
    function DesignationService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    DesignationService.prototype.GetDesignationList = function (nameSearch, sortColumn, page, pageSize, sortDir, loginuserid, moduleName, submoduleName, companyId, custom_view_id, searchFilter) {
        var _this = this;
        if (typeof nameSearch == "undefined" || nameSearch == null) {
            nameSearch = null;
        }
        else {
            nameSearch = encodeURIComponent((nameSearch));
        }
        return this.http.get(this.baseUri + "designation/GetDesignationList?nameSearch=" + nameSearch + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&custom_view_id=" + custom_view_id + "&searchFilter=" + searchFilter)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    DesignationService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    DesignationService.prototype.GetDesignationDetails = function (id, moduleName, submoduleName, companyId, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("designation/GetDesignationById?id=" + id + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    DesignationService.prototype.addEditForm = function (JsonData) {
        return this.http.post(this.baseUri + "designation/AddEditDesignation", JsonData);
    };
    DesignationService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    DesignationService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    DesignationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], DesignationService);
    return DesignationService;
}());

var JsonData = /** @class */ (function () {
    function JsonData() {
        this.Id = "";
        this.FormJsonData = "";
        this.moduleCode = "";
        this.subModuleCode = "";
        this.companyId = "";
        this.userId = "";
    }
    return JsonData;
}());



/***/ })

}]);
//# sourceMappingURL=views-designation-designation-module.js.map