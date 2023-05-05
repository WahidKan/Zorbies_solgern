(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-contract-contract-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contract/addeditcontract.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/contract/addeditcontract.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/contract\">Manage Contract</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList\">\r\n        <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row  mb-2\">\r\n\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n\r\n\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO' &&  inner.edit_form_field_visibility == 'NO' \" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n                <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n              </a>-->\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">\r\n\r\n\r\n\r\n                <!--text  [placeholder]=\"inner.display_name\"-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date' && inner.dt_code !='datetime'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint'\" />\r\n\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" [style]=\"{ 'position': 'relative'}\" hideOnDateTimeSelect=\"true\"></p-calendar>\r\n\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'datetime'\" [formControlName]=\"inner.form_controlName\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                            [showTime]=\"true\" [inputId]=\"inner.form_controlName\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" [style]=\"{ 'position': 'relative'}\" hideOnDateTimeSelect=\"true\"></p-calendar>\r\n\r\n\r\n\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\"\r\n                               id=\"{{inner.form_controlName}}\" [formControlName]=\"inner.form_controlName\">\r\n                        <span class=\"slider round\" id=\"{{inner.form_controlName}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (clear)=\"onClearLang(item.InnerData,j)\"\r\n                           (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code!=null \" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code==null\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true'\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n                <!--Dropdown\r\n    picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n  -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n          (change)='onOptionsSelected($event,inner)'>\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.name\"\r\n            *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n      {{option.name}}\r\n    </option>\r\n\r\n  </select>-->\r\n\r\n\r\n              </div>\r\n\r\n\r\n\r\n\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row  mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contract/contractlist.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/contract/contractlist.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\">\r\n    <strong>Manage Contract</strong>\r\n    <p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p>\r\n  </h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Contract</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3\">\r\n        <div class=\"row mt-2\">\r\n\r\n          <div class=\"col-md-12 col-xl-7 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-md-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Contract Number\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-md-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n                <div class=\"d-inline-block align-middle pl-2\">\r\n                  <label class=\"d-inline-block \"><b>Search in all records</b></label>\r\n                  <div class=\"form-group d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <input type=\"checkbox\" id=\"allRecords\" formControlName=\"allRecords\" [checked]=\"myCheckbox\" (click)=\"switchClicked($event)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-5\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0\">\r\n                <ng-select [items]=\"pagedData.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\" Manage View\"><span><i class=\"fa fa-list-alt\"></i></span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/contract/add\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add Contract\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [footerHeight]=\"40\"\r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n\r\n              <ng-container *ngIf=\"col.COLUMN_NAME == 'ContractNumber'\" >\r\n                <div [title]=\"row[col.COLUMN_NAME]\" >\r\n                  <a href=\"javascript:void(0);\" [routerLink]=\"['/contract/view',row.Id]\" >{{row[col.COLUMN_NAME] }}</a>\r\n                </div>\r\n              </ng-container>\r\n              <ng-container *ngIf=\"col.COLUMN_NAME != 'ContractNumber'\" >\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                </div>\r\n                <ng-container *ngIf=\"col.FieldType=='date'\">\r\n                    <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal:'Date'\">\r\n                      {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal:'Date') : \"\" }}\r\n                    </div>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"col.FieldType=='datetime'\">\r\n                    <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\">\r\n                      {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                    </div>\r\n                </ng-container>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldType != 'select' && col.DATA_TYPE != 'date' &&  col.DATA_TYPE != 'datetime' && col.DATA_TYPE!='bit'\">\r\n                  {{row[col.COLUMN_NAME] }}\r\n                </div>\r\n                <div *ngIf=\"col.FieldType == 'select'\">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom ==null\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                </div>\r\n              </ng-container>\r\n\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.Id\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.Id}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <a class=\"actions-onclick view-list\" [routerLink]=\"['/contract/view',row.Id]\" href=\"javascript:void(0);\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>\r\n                    <a *ngIf='isUpdate' class=\"actions-onclick view-list\" [routerLink]=\"['/contract/edit',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"crm\" subModuleName=\"contract\"></app-searchfilteradd>\r\n<app-manageviewnew #templateManageView (customViewid)=\"GetcustomViewid($event)\" moduleName=\"crm\" subModuleName=\"contract\"></app-manageviewnew>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contract/viewcontract.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/contract/viewcontract.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Contract Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/contract\">Manage Contract</a></li>\r\n      <li class=\"active\">Contract Details</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-3 mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-file-text-o text-dark float-left mr-2\" style=\"font-size:27px;\"></i>\r\n    <span class=\"float-left w-85-res\" style=\"font-size:18px;\"><span>Contract</span> {{ContractNumber}}</span>\r\n    <span class=\"cntnt-right-btn mr15 btn-iconres\">\r\n      <!--<a href=\"javascript:;\" class=\"btn btn-info text-white mr-2\" (click)=\"Fix_Order()\"><i class=\"fa fa-pencil mr-1\"></i> Fix Order</a>-->\r\n      <a href=\"javascript:void(0);\" [routerLink]=\"['/contract/edit',Id]\" class=\"btn btn-success text-white mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n  <div class=\"col-12 float-left  d-md-flex p-0 py-resp py-2 py-sm-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n      <div class=\"col py-2\" *ngIf=\"item.ColumnName !='ContractNumber'\">\r\n        <span *ngIf=\"item.field_route==null\" class=\"d-block\">\r\n          <strong>{{ item.display_name}}: </strong>\r\n          <ng-container *ngIf=\"item.dt_code!='date' &&  item.dt_code!='datetime'\">{{ item.value }} </ng-container>\r\n          <ng-container *ngIf=\"item.dt_code=='date'\"> {{ item.value | DateTimeToLocal:'Date'}}</ng-container>\r\n          <ng-container *ngIf=\"item.dt_code=='datetime'\"> {{ item.value | DateTimeToLocal}}</ng-container>\r\n        </span>\r\n        <span *ngIf=\"item.field_route!=null\" class=\"d-block\"><strong>{{ item.display_name}}:</strong> <a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\"> {{ item.value}}</a></span>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:none\">\r\n\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-12 col-lg-8\">\r\n            <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n              <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n                <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                  <ng-container *ngFor=\"let item of formControlList\">\r\n                    <div class=\"panel active\">\r\n                      <div class=\"panel-heading\">\r\n                        <h4 class=\"panel-title\">\r\n                          <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                            <span> {{item.group_name}}</span>\r\n                          </a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                        <div class=\"panel-body row px-0 mt-0\">\r\n                          <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                            <div class=\"input-group border-bottom\">\r\n                              <div class=\"col-sm-12 col-md-6 px-0\">\r\n                                <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                              </div>\r\n                              <div class=\"col-sm-12 col-md-6\">\r\n                                <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null\" class=\"py-2 d-block\">\r\n                                  <ng-container *ngIf=\"inner.dt_code=='date'\">{{ inner.value | DateTimeToLocal:'Date'}}</ng-container>\r\n                                  <ng-container *ngIf=\"inner.dt_code=='datetime'\">{{ inner.value | DateTimeToLocal}}</ng-container>\r\n                                  <ng-container *ngIf=\"inner.dt_code!='datetime' && inner.dt_code!='date'\">{{ inner.value}}</ng-container>\r\n                                </span>\r\n                                <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null\" class=\"py-2 d-block\">\r\n                                  <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                                </span>\r\n\r\n                                <!--============================== For CheckBox ===========================-->\r\n                                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean' || inner.dt_code=='checkbox'\">\r\n                                  <div class=\"form-check form-check-inline\">\r\n                                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                                      <label class=\"switch  mb-0\">\r\n                                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                      </label>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ng-container>\r\n                </form>\r\n              </div>\r\n          </div>\r\n          <div class=\"col-sm-12 col-lg-4 relatedtab\">\r\n            <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#proposerdetail\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Proposal Details</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"proposerdetail\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body row px-3\">\r\n                    <ng-container *ngFor=\"let item of customValuesTempData\">\r\n                      <div class=\"col-sm-12 col-md-6 col-lg-6\" *ngIf=\"item!=null && item!=''\">\r\n                        <div class=\"input-group border-bottom\">\r\n                          <div class=\"col-sm-12 col-md-6 px-0\">\r\n                            <span class=\"py-2 d-block\">\r\n                              <strong>{{ item.display_name}}:</strong>\r\n                            </span>\r\n                          </div>\r\n                          <div class=\"col-sm-12 col-md-6\">\r\n                            <span *ngIf=\"item.field_route != null\" class=\"py-2 d-block\">\r\n                              <a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\">{{ item.value}}</a>\r\n                            </span>\r\n                            <span *ngIf=\"item.dt_code!='boolean' && item.dt_code!='checkbox' && item.field_route==null\" class=\"py-2 d-block\">\r\n                              {{ item.value }}\r\n                            </span>\r\n\r\n                            <!--============================== For CheckBox ===========================-->\r\n                            <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"item.dt_code=='boolean'\">\r\n                              <div class=\"form-check form-check-inline\">\r\n                                <div class=\"custom-control custom-checkbox pl-0\">\r\n                                  <label class=\"switch  mb-0\">\r\n                                    <input type=\"checkbox\" id=\"chk_{{item.custom_field_id}}\" disabled>\r\n                                    <span class=\"slider round\" id=\"{{item.custom_field_id}}\"><span>Yes</span></span>\r\n                                  </label>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <!--============================== For CheckBox ===========================-->\r\n                            <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"item.dt_code=='checkbox'\">\r\n                              <div class=\"form-check form-check-inline\">\r\n                                <div class=\"custom-control custom-checkbox pl-0\">\r\n                                  <label class=\"switch mb-0\">\r\n                                    <input type=\"checkbox\" id=\"chk_{{item.custom_field_id}}\" disabled>\r\n                                    <span class=\"slider round\" id=\"{{item.custom_field_id}}\"><span>Yes</span></span>\r\n                                  </label>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                    </ng-container>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <app-files title=\"Files\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{Id}}\"></app-files>\r\n\r\n              <!--<div class=\"panel active\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n          <span>Notes ({{NotesCount}})</span>\r\n        </a>\r\n      </h4>\r\n    </div>\r\n    <div id=\"notes\" class=\"panel-collapse collapse active show\" style=\"\">\r\n      <a href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add</a>\r\n      <div class=\"panel-body p-2 mt-0\">\r\n        <div class=\"table-responsive ngxtbl\">\r\n          <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                         [rows]=\"NotespagedData.data\"\r\n                         [columnMode]=\"'force'\"\r\n                         [scrollbarH]=\"true\"\r\n                         [rowHeight]=\"'40'\"\r\n                         [headerHeight]=\"40\"\r\n                         [footerHeight]=\"40\"\r\n                         [externalPaging]=\"true\"\r\n                         [externalSorting]=\"true\"\r\n                         [loadingIndicator]=\"loadSave\"\r\n                         [count]=\"NotespagedData.pager.totalItems\"\r\n                         [offset]=\"NotespagedData.pager.currentPage\"\r\n                         [limit]=\"NotespagedData.pager.pageSize\"\r\n                         (page)='setPageNotes($event)'\r\n                         (sort)=\"onSortNotes($event)\">\r\n\r\n            <ngx-datatable-column name=\"Note Title\" prop=\"note_name\" [sortable]=\"true\">\r\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                {{row.note_name|truncate}}\r\n              </ng-template>\r\n            </ngx-datatable-column>\r\n            <ngx-datatable-column name=\"Description\" sortable=\"false\" prop=\"note_description\" [sortable]=\"true\" [minWidth]=\"150\">\r\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                <div *ngIf='row.note_description!=null || row.note_description!=\"\"'>\r\n                  <span>{{row.note_description}}</span>\r\n                </div>\r\n                <div *ngIf='row.note_description==null || row.note_description==\"\"'>\r\n                  <span>N/A</span>\r\n                </div>\r\n              </ng-template>\r\n\r\n            </ngx-datatable-column>\r\n\r\n            <ngx-datatable-column name=\"Created By\" sortable=\"false\" prop=\"createdby\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n            <ngx-datatable-column name=\"Created on\" prop=\"created_on\" [sortable]=\"true\" [minWidth]=\"130\">\r\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                {{row.created_on | DateTimeToLocal}}\r\n              </ng-template>\r\n            </ngx-datatable-column>\r\n            <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                <div class=\"text-center\">\r\n                  <a href=\"javascript:;\" (click)=\"ViewNotes(row)\" title=\"View Notes\"><i class=\"fa fa-eye pr-2\"></i></a>\r\n                  <a href=\"javascript:void(0);\" (click)=\"EditNotes(row)\" title=\"Edit Notes\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                  <a href=\"javascript:void(0);\" (click)=\"DeleteNote(row,'AssignedResource')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                </div>\r\n\r\n              </ng-template>\r\n            </ngx-datatable-column>\r\n            <ngx-datatable-footer>\r\n              <ng-template ngx-datatable-footer-template\r\n                           let-rowCount=\"rowCount\"\r\n                           let-pageSize=\"pageSize\"\r\n                           let-selectedCount=\"selectedCount\"\r\n                           let-currentPage=\"NotespagedData.pager.currentPage\"\r\n                           let-offset=\"offsetnotes\"\r\n                           let-isVisible=\"isVisible\">\r\n                <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                  {{commonService.PageString(curPageNotes,pageSizeValuenotes,rowCount)}}\r\n                </div>\r\n\r\n                <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                 [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                 [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                 [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                 [page]=\"curPageNotes\"\r\n                                 [size]=\"pageSizeValuenotes\"\r\n                                 [count]=\"NotespagedData.pager.totalItems\"\r\n                                 [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                 (change)=\"setPageNotes($event)\">\r\n                </datatable-pager>\r\n              </ng-template>\r\n\r\n            </ngx-datatable-footer>\r\n          </ngx-datatable>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>-->\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Notes ({{notescount}}) </span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n\r\n\r\n                <div id=\"panelBodynine\" class=\"panel-collapse active show p-0 border-0\" data-parent=\"#accordion\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                     (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> New</a>\r\n\r\n\r\n\r\n                  <div id=\"notes\" class=\"panel-collapse collapse active show\">\r\n\r\n                    <app-newnoteslist #listnotesmodel subModuleName=\"Contract\" [AccountId]=\"accountId\" [ObjectRefId]=\"Id\" (newItemEvent)=\"addItem($event)\">\r\n\r\n                    </app-newnoteslist>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#oppurtunity\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Opportunity  ({{OpportunityCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"oppurtunity\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstOpportunity.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstOpportunity.pager.totalItems\"\r\n                                     [offset]=\"lstOpportunity.pager.currentPage\"\r\n                                     [limit]=\"lstOpportunity.pager.pageSize\"\r\n                                     (page)='setOpportunityPageNo($event)'\r\n                                     (sort)=\"onOpportunitySort($event)\">\r\n                        <ngx-datatable-column name=\"Opportunity Name\" prop=\"OpportunityName\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <a href=\"javascript:void(0);\" [routerLink]=\"['/opportunity/view',row.Id]\">{{row.OpportunityName}}</a>\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Account Name\" prop=\"AccountName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Close Date\" prop=\"CloseDate\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.CloseDate | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstOpportunity.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstOpportunity.pager.currentPage+1\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                              {{commonService.PageString(lstOpportunity.pager.currentPage+1,lstOpportunity.pager.pageSize,rowCount)}}\r\n                            </div>\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"lstOpportunity.pager.currentPage\"\r\n                                             [size]=\"lstOpportunity.pager.pageSize\"\r\n                                             [count]=\"lstOpportunity.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstOpportunity.pager.pageSize) > 1)\"\r\n                                             (change)=\"setOpportunityPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                      <!--<a href=\"javascript:void(0);\" (click)=\"displaynotedetail(row)\">{{row.note_description | truncate : 50}}</a>-->\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <!--WorkOrderlineItem-->\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#LineItem\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Work Orders ({{lineItemCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"LineItem\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <!--<a href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add</a>-->\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"LineItempagedData.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"LineItempagedData.pager.totalItems\"\r\n                                     [offset]=\"LineItempagedData.pager.currentPage\"\r\n                                     [limit]=\"LineItempagedData.pager.pageSize\"\r\n                                     (page)='setPageLineItem($event)'\r\n                                     (sort)=\"onSortLineItems($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Contract Line Item Number\" prop=\"LineItemNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n\r\n                        <ngx-datatable-column name=\"Subject\" sortable=\"false\" prop=\"Subject\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Description\" sortable=\"false\" prop=\"Description\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Status\" sortable=\"false\" prop=\"StatusCategory\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Completed\" sortable=\"false\" prop=\"Completed_Date__c\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Sort Order\" sortable=\"false\" prop=\"Sort_Order__c\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n\r\n                        <!--<ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                <div class=\"text-center\">\r\n                  <a href=\"javascript:void(0);\" (click)=\"EditNotes(row)\" title=\"Edit Notes\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                  <a href=\"javascript:void(0);\" (click)=\"DeleteNote(row,'AssignedResource')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                </div>\r\n\r\n              </ng-template>\r\n            </ngx-datatable-column>-->\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"LineItempagedData.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                              <!--Showing {{(LineItempagedData.pager.currentPage - 1 )* pageSizeValueLineitem + 1}}  to {{LineItempagedData.pager.currentPage * pageSizeValueLineitem}} out of {{rowCount}}  enteries-->\r\n                              {{commonService.PageString(LineItempagedData.pager.currentPage,LineItempagedData.pager.pageSize,rowCount)}}\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"LineItempagedData.pager.currentPage\"\r\n                                             [size]=\"pageSizeValueLineitem\"\r\n                                             [count]=\"LineItempagedData.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                             (change)=\"setPageLineItem($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n              <!--End-->\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n\r\n</div>\r\n\r\n\r\n<!--===================================================== NotesPopupModel ========================================================-->\r\n<div class=\"modal fade in show\" bsModal #NotesPopupModel=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\" *ngIf=\"!isViewNote\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-header\" *ngIf=\"isViewNote\">\r\n        <h4 class=\"modal-title\">View NOTES</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeNotesPopupModelPopup()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; height:290px;\">\r\n        <form [formGroup]=\"addNoteForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"form-group\" *ngIf=\"!isViewNote\">\r\n            <div class=\"row mb-2\">\r\n              <div class=\"col-md-12 col-lg-12\">\r\n                <label>Note Title:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter Note Title\" formControlName=\"noteTitle\" maxlength=\"50\" [ngClass]=\"{'is-invalid': (noteTitle.invalid && (noteTitle.dirty || noteTitle.touched) && (noteTitle.errors?.required || noteTitle.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"noteTitle.invalid && (noteTitle.dirty || noteTitle.touched) && noteTitle.errors?.required\"\r\n                         class=\"text-danger\">Note Title is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row mb-2\">\r\n              <div class=\"col-md-12 col-lg-12\">\r\n                <label>Description:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <textarea rows=\"5\" class=\"form-control\" style=\"min-height:120px;\" placeholder=\"Enter Note Description\" formControlName=\"noteDescription\" #machineDescription maxlength=\"500\" [ngClass]=\"{'is-invalid': (noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && (noteDescription.errors?.required || noteDescription.errors?.maxlength)) }\"></textarea>\r\n                  <small *ngIf=\"noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && noteDescription.errors?.required\"\r\n                         style=\"color:red;\">Description is required</small>\r\n                  <small *ngIf=\"noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && noteDescription.errors?.maxlength\"\r\n                         style=\"color:red;\">Notes must be less than 500 characters.</small>\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\" *ngIf=\"isViewNote\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <label>Note Title:</label>\r\n                <span>{{notesTitle}}</span>\r\n              </div>\r\n              <div class=\"col-md-12\">\r\n                <label>Description:</label>\r\n                <span>{{notesDescription}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button *ngIf=\"!isViewNote\" type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveNote()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n<!--===============================================================================================================================-->\r\n<!--===================================================== Fix Order Model========================================================-->\r\n<!--<div class=\"modal fade in show\" bsModal #FixOrder=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeFixOrderPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; height:290px;\">\r\n        <form [formGroup]=\"addFixOrderForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"row mb-2\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Department<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstdepartment\" placeholder=\"Select Department\" formControlName=\"departmentId\"\r\n                           bindLabel=\"text\" bindValue=\"value\"\r\n                           [ngClass]=\"{'is-invalid': (departmentId.invalid && (departmentId.dirty || departmentId.touched) && departmentId.errors?.required)}\"></ng-select>\r\n                <small *ngIf=\"departmentId.invalid && (departmentId.dirty || departmentId.touched) && departmentId.errors?.required\"\r\n                       class=\"text-danger\">Please select Department</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Description:</label>\r\n              <div class=\"form-group\">\r\n                <textarea rows=\"5\" class=\"form-control\" style=\"min-height:120px;\" placeholder=\"Enter Description\" formControlName=\"fixOrderDescription\" #machineDescription maxlength=\"1000\"></textarea>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveFixOrder()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeFixOrderPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>-->\r\n<!--===============================================================================================================================-->\r\n");

/***/ }),

/***/ "./src/app/views/contract/addeditcontract.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/views/contract/addeditcontract.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbnRyYWN0L2FkZGVkaXRjb250cmFjdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/contract/addeditcontract.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/contract/addeditcontract.component.ts ***!
  \*************************************************************/
/*! exports provided: AddeditcontractComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditcontractComponent", function() { return AddeditcontractComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _contract_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contract.service */ "./src/app/views/contract/contract.service.ts");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
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








var AddeditcontractComponent = /** @class */ (function () {
    function AddeditcontractComponent(fb, contractService, router, toaster, commonService, route, location) {
        var _this = this;
        this.fb = fb;
        this.contractService = contractService;
        this.router = router;
        this.toaster = toaster;
        this.commonService = commonService;
        this.route = route;
        this.location = location;
        this.config = [];
        this.moduleName = 'crm';
        this.submoduleName = 'contract';
        this.loadSave = false;
        this.id = '';
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _contract_service__WEBPACK_IMPORTED_MODULE_5__["JsonData"]();
        this.isFirst = false;
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.timeFormat = '12';
        this.len = 10;
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
            console.log("companyId", userdetail.companyId);
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CONTRACTADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CONTRACTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
    }
    AddeditcontractComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.timeFormat = this.commonService.getTimeFormat();
        this.addOrUpdatePermission = false;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.loadSave = true;
            if (id) {
                _this.id = id;
                _this.pageTitle = 'Edit Contract';
                _this.displayType = 'EDIT';
                _this.addOrUpdatePermission = _this.isUpdate;
                //  this.fillLeadForm(this.leadId);
            }
            else {
                _this.displayType = 'ADD';
                _this.pageTitle = 'Add Contract';
                _this.addOrUpdatePermission = _this.isAdd;
            }
        });
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.id, this.displayType).subscribe(function (resp) {
            if (resp) {
                _this.customCompnentValues = resp.data;
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _contract_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
                console.log("formControlList", _this.formControlList);
                var group_1 = {};
                data_type_name: Text;
                var _datetime_1 = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_6__["DateTimeToLocalForAddEditPipe"];
                _this.customCompnentValues.forEach(function (cnt) {
                    var val = null;
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    else if (cnt.dt_code == 'date' || cnt.dt_code == 'datetime') {
                        val = _datetime_1.transform(cnt.value, null);
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
                    if (cnt.dt_code == 'select' && cnt.select_options != null && (cnt.name == 'CreatedById' || cnt.name == 'LastModifiedById')) {
                        if (cnt.value != '') {
                            cnt.select_options.forEach(function (itemList) {
                                if (itemList.value == cnt.value) {
                                    val = itemList.name;
                                    cnt.dt_code = 'text';
                                    cnt.is_readOnly = true;
                                }
                            });
                        }
                        else {
                            cnt.dt_code = 'text';
                            cnt.is_readOnly = true;
                        }
                    }
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
        });
    };
    AddeditcontractComponent.prototype.checkvalue = function (formvalues, selval) {
        var returnValue = false;
        if (formvalues != null) {
            formvalues.find(function (item) {
                if (item == selval) {
                    returnValue = true;
                }
            });
        }
        return returnValue;
    };
    AddeditcontractComponent.prototype.test = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    AddeditcontractComponent.prototype.OnCheck = function () {
    };
    AddeditcontractComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loadSave = true;
        this.checkboxdata1.forEach(function (item) {
            //console.log(item.controlname);
            _this.form.get(item.controlname).setValue(item.controlvalues);
        });
        if (this.form.valid) {
            this.loadSave = true;
            this.JsonData.Id = this.id;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            this.JsonData.companyId = this.companyId;
            this.JsonData.userId = this.userId;
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
            this.contractService.addEditForm(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
                    //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
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
    AddeditcontractComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
    };
    AddeditcontractComponent.prototype.close = function () {
        this.location.back();
    };
    AddeditcontractComponent.prototype.fillForm = function (id) {
        var _this = this;
        this.addOrUpdatePermission = this.isUpdate;
        //this.form.reset();
        this.contractService.GetContractDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe(function (result) {
            var edit;
            edit = _this.contractService.editPage.data[0];
            //let empty = null;
            var formGroup = {};
            if (result) {
                Object.keys(edit).forEach(function (t) {
                    var cntname = t;
                    var cntValue = edit[t] == '' ? null : edit[t];
                    if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {
                        cntValue = JSON.parse(cntValue);
                    }
                    if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {
                        cntValue = (cntValue == 'true');
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
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditcontractComponent.prototype.MakeArray = function (value, type) {
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
    AddeditcontractComponent.prototype.MakeNormalArray = function (value) {
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
    AddeditcontractComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
            //objItem.select_options = array;
        }
        return array;
    };
    AddeditcontractComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        //const index2: number = this.formControlList.indexOf(groupdisp);
        //const index1: number = controldisp.display_order;
        var checkboxdatanew = new _contract_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
        var dd = this.formControlList;
    };
    AddeditcontractComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    AddeditcontractComponent.prototype.fetchMore = function (dataList, j) {
        var _this = this;
        debugger;
        console.log("e", dataList);
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList[j].select_options.length;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        var data = dataList[j].select_options;
        //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            console.log('scrollDataList:', _this.scrollDataList);
            debugger;
            dataList[j].select_options = dataList[j].select_options.concat(_this.scrollDataList);
        });
    };
    AddeditcontractComponent.prototype.onKey = function (e, dataList, j) {
        var _this = this;
        this.len = 0;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        this.searchText = e.target.value;
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            console.log('scrollDataList:', _this.scrollDataList);
            dataList[j].select_options = _this.scrollDataList;
        });
    };
    AddeditcontractComponent.prototype.onClearLang = function (dataList, j) {
        var _this = this;
        this.len = 0;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        this.searchText = '';
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            console.log('scrollDataList:', _this.scrollDataList);
            dataList[j].select_options = _this.scrollDataList;
        });
    };
    AddeditcontractComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _contract_service__WEBPACK_IMPORTED_MODULE_5__["ContractService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] }
    ]; };
    AddeditcontractComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditcontract',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditcontract.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contract/addeditcontract.component.html")).default,
            providers: [_contract_service__WEBPACK_IMPORTED_MODULE_5__["ContractService"]],
            styles: [__importDefault(__webpack_require__(/*! ./addeditcontract.component.scss */ "./src/app/views/contract/addeditcontract.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _contract_service__WEBPACK_IMPORTED_MODULE_5__["ContractService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"]])
    ], AddeditcontractComponent);
    return AddeditcontractComponent;
}());

//export class AddeditcontractComponent1 implements OnInit {
//  config: any[] = [];
//  control: any;
//  pageTitle: any;
//  group_id: any;
//  moduleName = 'finance';
//  submoduleName = 'contract';
//  group_name: any;
//  group_display_name: any;
//  customCompnentValues: any;
//  form: FormGroup;
//  formGroup: FormGroup;
//  companyId: any;
//  grpId: any;
//  sDtaa: any;
//  loadSave = false;
//  id: any;
//  leadId: any;
//  moduleRefrenceName: any;
//  sp_name: string;
//  showChild = false;
//  isLead = false;
//  formControlList: any[] = [];
//  errors: string[] = [];
//  constructor(private fb: FormBuilder, private contractService: ContractService, private router: Router,
//    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
//    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
//      this.companyId = userdetail.companyId;
//      this.sp_name = 'sp_solgen_AddEditOpportunity_custom';
//    });
//  }
//  ngOnInit() {
//    this.contractService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
//      if (result) {
//        this.customCompnentValues = this.contractService.customFieldsList.data;
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
//        this.form = new FormGroup(group);
//        if (this.id != null) {
//          this.fillForm(this.id);
//        }
//      }
//    });
//    //EDIT case handle
//    this.route.paramMap.subscribe(
//      params => {
//        const id = params.get('id');
//        if (id) {
//          this.loadSave = true;
//          
//          this.id = id;
//          this.fillForm(this.id);
//          this.pageTitle = 'Edit Contract';
//        }
//        else {
//          this.pageTitle = 'Add Contract';
//        }
//      }
//    );
//  }
//  onSubmit() { }
//  displayInsuranceDetail(reposnse): void {
//    const formGroup = {};
//    for (let prop of Object.keys(this.customCompnentValues)) {
//      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
//    }
//    this.form = new FormGroup(formGroup);
//  }
//  close() {
//    this.router.navigateByUrl("/contract");
//  }
//  fillForm(id) {
//    
//    //this.form.reset();
//    this.contractService.GetContractDetails(id, this.moduleName, this.submoduleName).subscribe((result: any) => {
//      let edit: any
//      edit = this.contractService.editPage.data[0];
//      
//      //let empty = null;
//      const formGroup = {};
//      if (result) {
//        Object.keys(edit).forEach(t => {
//          let cntname = t;
//          let cntValue = edit[t] == '' ? null : edit[t];
//          formGroup[cntname] = new FormControl(cntValue);
//        })
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
//    
//    var array = [];
//    var arr = String(value).split(',');
//    if (type == "radio" || type == "checkbox") {
//      if (arr.length > 0) {
//        for (var i = 0; i < arr.length; i++) {
//          
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

/***/ "./src/app/views/contract/contract-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/contract/contract-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: ContractRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractRoutingModule", function() { return ContractRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _contractlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contractlist.component */ "./src/app/views/contract/contractlist.component.ts");
/* harmony import */ var _addeditcontract_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditcontract.component */ "./src/app/views/contract/addeditcontract.component.ts");
/* harmony import */ var _viewcontract_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./viewcontract.component */ "./src/app/views/contract/viewcontract.component.ts");
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
    { path: '', component: _contractlist_component__WEBPACK_IMPORTED_MODULE_2__["ContractlistComponent"] },
    { path: 'add', component: _addeditcontract_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcontractComponent"] },
    { path: 'edit/:id', component: _addeditcontract_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcontractComponent"] },
    { path: 'view/:id', component: _viewcontract_component__WEBPACK_IMPORTED_MODULE_4__["ViewContractComponent"] }
];
var ContractRoutingModule = /** @class */ (function () {
    function ContractRoutingModule() {
    }
    ContractRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ContractRoutingModule);
    return ContractRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/contract/contract.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/contract/contract.module.ts ***!
  \***************************************************/
/*! exports provided: ContractModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractModule", function() { return ContractModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _addeditcontract_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addeditcontract.component */ "./src/app/views/contract/addeditcontract.component.ts");
/* harmony import */ var _contractlist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contractlist.component */ "./src/app/views/contract/contractlist.component.ts");
/* harmony import */ var _contract_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contract-routing.module */ "./src/app/views/contract/contract-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _viewcontract_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./viewcontract.component */ "./src/app/views/contract/viewcontract.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var ContractModule = /** @class */ (function () {
    function ContractModule() {
    }
    ContractModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_contractlist_component__WEBPACK_IMPORTED_MODULE_3__["ContractlistComponent"], _addeditcontract_component__WEBPACK_IMPORTED_MODULE_2__["AddeditcontractComponent"], _viewcontract_component__WEBPACK_IMPORTED_MODULE_10__["ViewContractComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _contract_routing_module__WEBPACK_IMPORTED_MODULE_4__["ContractRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalModule"],
            ]
        })
    ], ContractModule);
    return ContractModule;
}());



/***/ }),

/***/ "./src/app/views/contract/contract.service.ts":
/*!****************************************************!*\
  !*** ./src/app/views/contract/contract.service.ts ***!
  \****************************************************/
/*! exports provided: ContractService, CheckboxData, JsonData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractService", function() { return ContractService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxData", function() { return CheckboxData; });
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




var ContractService = /** @class */ (function () {
    function ContractService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    ContractService.prototype.GetContractList = function (listFilter, sortColumn, page, pageSize, sortDir, loginuserid, moduleName, submoduleName, companyId, custom_view_id, widgetType, recordFilter, teamID, teamMemberID, isCheckboxTick) {
        return this.http.get(this.baseUri + "Contract/GetContractList?listFilter=" + listFilter + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&custom_view_id=" + custom_view_id + "&widgetType=" + widgetType + "&recordFilter=" + recordFilter + "&teamID=" + teamID + "&teamMemberID=" + teamMemberID + "&isAllRecords=" + isCheckboxTick);
    };
    ContractService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId, DisplayService) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    ContractService.prototype.GetContractDetails = function (id, moduleName, submoduleName, companyId, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Contract/GetContractDetails?id=" + id + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    ContractService.prototype.addEditForm = function (JsonData) {
        return this.http.post(this.baseUri + "Contract/AddEditContract", JsonData);
    };
    ContractService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    ContractService.prototype.GetOpportunityList = function (ContractId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("contract/GetOpportunityList?Id=" + ContractId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    ContractService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    ContractService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ContractService);
    return ContractService;
}());

var CheckboxData = /** @class */ (function () {
    function CheckboxData() {
        this.controlname = "";
        this.controlvalues = "";
    }
    return CheckboxData;
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



/***/ }),

/***/ "./src/app/views/contract/contractlist.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/contract/contractlist.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbnRyYWN0L2NvbnRyYWN0bGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/contract/contractlist.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/contract/contractlist.component.ts ***!
  \**********************************************************/
/*! exports provided: ContractlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractlistComponent", function() { return ContractlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _contract_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contract.service */ "./src/app/views/contract/contract.service.ts");
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









var ContractlistComponent = /** @class */ (function () {
    function ContractlistComponent(contractService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.contractService = contractService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.moduleName = 'crm';
        this.submoduleName = 'contract';
        this.custom_view_id = '';
        this.searchUserType = '';
        this.loading = false;
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["SelectionType"];
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = "";
        this.searchTxt = "";
        this.listFiltertext = "";
        this.tableName = 'tblContract';
        this.isApproveAccount = false;
        this.selected = [];
        this.loadSave = false;
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.myCheckbox = false;
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CONTRACTADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CONTRACTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CONTRACTDELETE'; });
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
    ContractlistComponent.prototype.ngOnInit = function () {
        var fromDate1 = this.commonService.getQueryStringValue("fromDate");
        var toDate1 = this.commonService.getQueryStringValue("toDate");
        // const datefrom=this.comm
        if (fromDate1 != null && fromDate1 != undefined && fromDate1 != "") {
            var a = parseInt(fromDate1);
            this.datefrom = this.commonService.formatUnixToDate(a);
        }
        if (toDate1 != null && toDate1 != undefined && toDate1 != "") {
            var b = parseInt(toDate1);
            this.dateto = this.commonService.formatUnixToDate(b);
        }
        this.widgetType = this.commonService.getQueryStringValue("widgetType");
        this.recordFilter = this.commonService.getQueryStringValue("recordFilter");
        this.teamID = this.commonService.getQueryStringValue("teamID");
        this.teamMemberID = this.commonService.getQueryStringValue("teamMemberID");
        this.statusid = this.commonService.getQueryStringValue("stage");
        //if (this.statusid != null) {
        //  this.listFiltertext = "Status = '" + this.statusid + "'";
        //}
        //if (this.datefrom != null && this.datefrom != undefined && this.datefrom != "") {
        //  if (this.datefrom.length > 0) {
        //    if (this.listFiltertext != null) {
        //      this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) >=  CAST('" + this.datefrom + "' AS DATE)  ";
        //    }
        //    else {
        //      this.listFiltertext = " CAST(CreatedAt AS DATE) >=  CAST('" + this.datefrom + "' AS DATE)  ";
        //    }
        //  }
        //}
        //if (this.dateto != null && this.dateto != undefined && this.dateto != "") {
        //  if (this.dateto.length > 0) {
        //    if (this.listFiltertext != null) {
        //      this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) <=  CAST('" + this.dateto + "' AS DATE)  ";
        //    }
        //    else {
        //      this.listFiltertext = " CAST(CreatedAt AS DATE) <=  CAST('" + this.dateto + "' AS DATE)  ";
        //    }
        //  }
        //}
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.LoadViewData();
        this.refresh();
    };
    ContractlistComponent.prototype.getListingColorCode = function (fieldValue) {
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        console.log('this.lstListingColorCode', this.lstListingColorCode);
        return this.lstListingColorCode;
    };
    ContractlistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    //GetcustomViewid(event) {
    //  this.custom_view_id = event;
    //  this.refresh();
    //}
    ContractlistComponent.prototype.GetcustomViewid = function (event) {
        var _this = this;
        if (event == 'undefined' || typeof event == 'undefined') {
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
    ContractlistComponent.prototype.LoadViewData = function () {
        var _this = this;
        this.loadSave = true;
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.commonService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.commonService.pagedData;
            _this.pagedData.data.forEach(function (cnt) {
                if (cnt.is_default == true) {
                    _this.vewId = cnt.custom_view_id;
                    _this.ViewModel = cnt.view_name;
                }
            });
        }, function (error) {
            _this.loadSave = false;
        }, function () { _this.loadSave = false; });
    };
    ContractlistComponent.prototype.SetManageViewValue = function (event, text) {
        this.ViewModel = text;
        this.custom_view_id = event;
        this.refresh();
        //this.LoadViewData();
    };
    ContractlistComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loadSave = true;
        this.contractService.GetContractList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.widgetType, this.recordFilter, this.teamID, this.teamMemberID, this.myCheckbox)
            .subscribe(function (response) {
            _this.jsonData = response;
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            _this.columnheading.forEach(function (element) {
                element["colwidth"] = (String(element.DISPLAY_NAME).length * 12) + 12;
            });
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
    Object.defineProperty(ContractlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ContractlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ContractlistComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    ContractlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    ContractlistComponent.prototype.onChange = function ($event) {
        this.refresh();
    };
    ContractlistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    ContractlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    ContractlistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.length > 0) {
            this.listFiltertext = encodeURIComponent("ContractNumber like '%" + this.listFilter + "%'");
        }
        this.refresh();
    };
    ContractlistComponent.prototype.reset = function () {
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.myCheckbox = false;
        this.refresh();
    };
    ContractlistComponent.prototype.onSelect = function (_a) {
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
    ContractlistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    ContractlistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Contract(s)\"";
            this.dialogService.confirm('Delete Contract(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.contractService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    ContractlistComponent.prototype.Delete = function (row) {
        var _this = this;
        debugger;
        var contractNumber = this.commonService.GenerateNumber(row.Id);
        var message = "Are you sure you want to delete Contract \"" + contractNumber + "\"?";
        this.dialogService.confirm('Delete Contract', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.contractService.DeleteRecords(row.Id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Contract \"" + contractNumber + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    ContractlistComponent.prototype.switchClicked = function (event) {
        this.listFiltertext = '';
        this.myCheckbox = event.srcElement.checked;
        this.currentPage = 1;
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = encodeURIComponent("ContractNumber like '%" + this.listFilter + "%'");
        }
        if (this.listFiltertext.trim().length > 0) {
            this.refresh();
        }
        if (this.myCheckbox == false) {
            this.refresh();
        }
    };
    ContractlistComponent.ctorParameters = function () { return [
        { type: _contract_service__WEBPACK_IMPORTED_MODULE_8__["ContractService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_5__["SearchfilteraddComponent"])
    ], ContractlistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_6__["ManageviewComponent"])
    ], ContractlistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"])
    ], ContractlistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ContractlistComponent.prototype, "offset", void 0);
    ContractlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contractlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./contractlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contract/contractlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./contractlist.component.scss */ "./src/app/views/contract/contractlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_contract_service__WEBPACK_IMPORTED_MODULE_8__["ContractService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], ContractlistComponent);
    return ContractlistComponent;
}());



/***/ }),

/***/ "./src/app/views/contract/viewcontract.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/contract/viewcontract.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbnRyYWN0L3ZpZXdjb250cmFjdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/contract/viewcontract.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/contract/viewcontract.component.ts ***!
  \**********************************************************/
/*! exports provided: ViewContractComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewContractComponent", function() { return ViewContractComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _contract_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contract.service */ "./src/app/views/contract/contract.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/new-notes/newnoteslist.component */ "./src/app/views/shared/new-notes/newnoteslist.component.ts");
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












var ViewContractComponent = /** @class */ (function () {
    function ViewContractComponent(dialogService, leadservice, commonService, fb, router, toaster, route, contractService, location) {
        var _this = this;
        this.dialogService = dialogService;
        this.leadservice = leadservice;
        this.commonService = commonService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.contractService = contractService;
        this.location = location;
        this.moduleName = 'CRM';
        this.submoduleName = 'Contract';
        this.notescount = 0;
        this.customValuesTempData = [];
        this.formControlList = [];
        this.proposalControlList = ['Name', 'System_Size_kW__c', 'Base_List_Price__c', 'System_Production_kWh__c', 'Adders_Amount__c', 'Dealer_Amount__c', 'Loan_ProductId', 'System_Cost__c', 'Include_SREC_Discount_in_Total__c', 'Discount_Amount__c'];
        this.loadSave = false;
        this.displayType = 'VIEW';
        this.lstServiceAppointments = {
            pager: {},
            data: []
        };
        this.lstOpportunity = {
            pager: {},
            data: []
        };
        this.ServiceAppointmentPageNo = 1;
        this.OpportunityPageNo = 0;
        this.ContractNumber = '';
        this.ServiceAppointmentCount = 0;
        this.OpportunityCount = 0;
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.sortColumnlineitem = 'LineItemNumber';
        this.pageSize = 4;
        this.isViewNote = false;
        this.checkboxdata1 = [];
        this.checkboxdataTop = [];
        this.pageSizeValuenotes = 4;
        this.NotespagedData = {
            pager: {},
            data: []
        };
        this.NotesCount = 0;
        this.notemodel = new _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__["noteModel"]();
        this.submoduleid = 234;
        this.objectname = 'workorder';
        //sortDir = 'desc';
        //sortColumn = 'createdon';
        this.currentPageNotes = 1;
        this.isEdit = false;
        this.LineItemPageno = 0;
        this.pageSizeValueLineitem = 4;
        this.LineItempagedData = {
            pager: {},
            data: []
        };
        this.lineItemCount = 0;
        this.siteurl = '';
        //=============================================================================
        this.addNoteForm = this.fb.group({
            note_id: [null],
            noteTitle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            noteDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.commonService.getMasterItemsList("department").subscribe(function (result) {
            _this.lstdepartment = _this.commonService.masters;
        });
    }
    ViewContractComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.siteurl = window.location.origin;
        console.log('siteurl', this.siteurl);
        this.currentPageNotes = 1;
        this.loadSave = true;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.Id = id;
        });
        this.GetCustomFieldsListTopRow();
        this.GetCustomFieldsList();
        this.getNoteslist();
    };
    ViewContractComponent.prototype.close = function () {
        this.router.navigateByUrl("/contract");
    };
    ViewContractComponent.prototype.getRelatedTabData = function () {
        this.getProposalData();
        // this.GetServiceAppointmentList();
        this.GetOpportunityList();
        // this.getNoteslist();
        //this.GetWorkOrderLineItemList();
    };
    ViewContractComponent.prototype.getProposalData = function () {
        this.loadSave = true;
        if (this.primaryProposalId) {
            this.GetCustomFieldsProposalDetailList();
        }
    };
    ViewContractComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        this.displayType = 'VIEW';
        this.loadSave = true;
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (resp) {
            if (resp) {
                _this.customCompnentValues = resp.data;
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _contract_service__WEBPACK_IMPORTED_MODULE_2__["CheckboxData"]();
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
                    if (cnt.ColumnName == "Primary_Proposal__c") {
                        _this.primaryProposalId = cnt.ref_value;
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
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                //this.GetCustomFieldsListTopRow();
            }
        }, function (err) {
            _this.loadSave = false;
        }, function () {
            _this.getRelatedTabData();
            setTimeout(function () {
                _this.loadSave = false;
            }, 3000);
        });
    };
    ViewContractComponent.prototype.GetCustomFieldsProposalDetailList = function () {
        var _this = this;
        this.displayType = 'VIEW';
        this.loadSave = true;
        this.commonService.GetCustomFieldsList(this.moduleName, 'Proposal', this.companyId, this.primaryProposalId, this.displayType).subscribe(function (resp) {
            if (resp) {
                _this.customComponentProposalDetail = resp.data;
                var group_2 = {};
                var _datetimeConvertor_1 = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_9__["DateTimeToLocalForAddEditPipe"];
                _this.customComponentProposalDetail.forEach(function (cnt) {
                    var val = null;
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    else if (cnt.dt_code == 'date') {
                        val = _datetimeConvertor_1.transform(cnt.value, 'Date');
                    }
                    else if (cnt.dt_code == 'datetime') {
                        val = _datetimeConvertor_1.transform(cnt.value, null);
                    }
                    else {
                        val = (cnt.value == '' ? null : cnt.value);
                    }
                    if (cnt.dt_code == 'select') {
                        if (cnt.value != '' && cnt.select_options != null) {
                            cnt.select_options.forEach(function (itemList) {
                                //if (itemList.value == cnt.value) {
                                //  cnt.value = itemList.name;
                                //}
                                if (itemList.value == cnt.value && cnt.name == 'AccountId') {
                                    _this.accountId = itemList.value;
                                    cnt.value = itemList.name;
                                }
                                else if (itemList.value == cnt.value) {
                                    cnt.value = itemList.name;
                                }
                            });
                        }
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
                    group_2[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.proposerDetail = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_2);
                //this.GetCustomFieldsListTopRow();
            }
        }, function (err) {
            _this.loadSave = false;
        }, function () {
            var _proposalDetail = _this.customComponentProposalDetail;
            var controlNameList = _this.proposalControlList;
            controlNameList.forEach(function (item) {
                var _dat = _proposalDetail.filter(function (x) {
                    if (x.ColumnName == item) {
                        if (x.ColumnName == "Name") {
                            x.field_route = '/proposal-list/viewproposal';
                            x.ref_value = _this.primaryProposalId;
                            return x;
                        }
                        else {
                            return x;
                        }
                    }
                });
                _this.customValuesTempData.push(_dat[0]);
            });
            _this.loadSave = false;
        });
    };
    ViewContractComponent.prototype.GetCustomFieldsListTopRow = function () {
        var _this = this;
        this.displayType = 'VIEW_TOP';
        this.loadSave = true;
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (resp) {
            if (resp) {
                _this.customCompnentValuesTop = resp.data;
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
                    if (cnt.ColumnName == 'ContractNumber') {
                        _this.ContractNumber = cnt.value;
                    }
                    if (cnt.dt_code == 'select') {
                        if (cnt.value != '' && cnt.select_options != null) {
                            cnt.select_options.forEach(function (itemList) {
                                if (itemList.value == cnt.value) {
                                    debugger;
                                    debugger;
                                    cnt.value = itemList.name;
                                }
                                else if (cnt.name == 'AccountId') {
                                    _this.accountId = cnt.ref_value;
                                }
                            });
                        }
                    }
                });
            }
        }, function (err) {
            _this.loadSave = false;
        }, function () {
            setTimeout(function () {
                _this.loadSave = false;
            }, 3000);
        });
    };
    ViewContractComponent.prototype.AddNotes = function () {
        this.title = "Add Notes";
        this.isViewNote = false;
        this.addNoteForm.reset();
        this.listnotesmodel.show(this.Id);
    };
    Object.defineProperty(ViewContractComponent.prototype, "note_id", {
        //========================Getting Note Form Value=============================
        get: function () { return this.addNoteForm.get('note_id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContractComponent.prototype, "noteTitle", {
        get: function () { return this.addNoteForm.get('noteTitle'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContractComponent.prototype, "noteDescription", {
        get: function () { return this.addNoteForm.get('noteDescription'); },
        enumerable: true,
        configurable: true
    });
    ViewContractComponent.prototype.SaveNote = function () {
        var _this = this;
        this.loadSave = true;
        console.log('addNoteForm', this.addNoteForm);
        if (this.addNoteForm.valid) {
            this.notemodel.note_id = this.addNoteForm.value.note_id;
            this.notemodel.note_name = this.addNoteForm.value.noteTitle;
            this.notemodel.note_description = this.addNoteForm.value.noteDescription;
            this.notemodel.object_name = "WorkOrder";
            this.notemodel.object_ref_id = this.Id;
            this.notemodel.object_id = 234;
            console.log('notemodel', this.notemodel);
            this.leadservice.saveNotes(this.notemodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    //setTimeout(() => {  console.log('notes') }, 3000);
                    _this.loadSave = false;
                    _this.toaster.success(result.responseMessage);
                    _this.addNoteForm.reset();
                    _this.getNoteslist();
                    _this.addNotesPopupModel.hide();
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addNoteForm);
            this.loadSave = false;
        }
    };
    ViewContractComponent.prototype.getNoteslist = function () {
        var _this = this;
        this.leadservice.getNoteslist(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            console.log('this.NotespagedData ', _this.NotespagedData);
            _this.NotesCount = _this.leadservice.pagedData.pager.totalItems;
            _this.offsetnotes = _this.currentPageNotes;
            _this.datalentgh = _this.NotespagedData.data.length;
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ViewContractComponent.prototype.closeNotesPopupModelPopup = function () {
        this.addNotesPopupModel.hide();
        this.addNoteForm.reset();
    };
    ViewContractComponent.prototype.setPageNotes = function ($event) {
        this.currentPageNotes = $event.page;
        this.getNoteslist();
        // this.currentPageNotes = $event.page
    };
    ViewContractComponent.prototype.onSortNotes = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPageNotes = 1;
        this.loadSave = true;
        this.getNoteslist();
    };
    Object.defineProperty(ViewContractComponent.prototype, "curPageNotes", {
        get: function () {
            return this.offsetnotes;
        },
        enumerable: true,
        configurable: true
    });
    //ViewNotes(row) {
    //  this.isViewNote = true;
    //    this.notesTitle= row.note_name,
    //      this.notesDescription=row.note_description
    //}
    ViewContractComponent.prototype.EditNotes = function (row) {
        this.title = "Edit Notes";
        this.isEdit = true;
        this.isViewNote = false;
        this.addNoteForm.patchValue({
            note_id: row.note_id,
            noteTitle: row.note_name,
            noteDescription: row.note_description,
        });
        this.addNotesPopupModel.show();
    };
    //  GetServiceAppointmentList() {
    //    this.workOrderService.GetServiceAppointmentList(this.Id, this.sortColumn, this.sortDir, this.ServiceAppointmentPageNo, this.pageSize).subscribe(result => {
    //      if (result) {
    //        this.lstServiceAppointments = result;
    //        this.ServiceAppointmentCount = result.pager.totalItems;
    //      }
    //    },
    //      err => { this.loadSave = false },
    //      () => { this.loadSave = false });
    //  }
    ViewContractComponent.prototype.GetOpportunityList = function () {
        var _this = this;
        this.contractService.GetOpportunityList(this.Id, this.sortColumn, this.sortDir, this.OpportunityPageNo, this.pageSize).subscribe(function (result) {
            if (result) {
                _this.lstOpportunity = result;
                _this.OpportunityCount = result.pager.totalItems;
            }
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ViewContractComponent.prototype.onOpportunitySort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.GetOpportunityList();
    };
    ViewContractComponent.prototype.setOpportunityPageNo = function ($event) {
        this.OpportunityPageNo = $event.page;
        this.GetOpportunityList();
    };
    ViewContractComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    //  onServiceAppointmentSort($event) {
    //    const sort = $event.sorts[0]
    //    this.sortDir = sort.dir;
    //    this.sortColumn = $event.column.prop;
    //    this.GetServiceAppointmentList();
    //  }
    //  setServiceAppointmentPageNo($event) {
    //    this.ServiceAppointmentPageNo = $event.page;
    //    this.GetServiceAppointmentList();
    //  }
    ViewContractComponent.prototype.DeleteNote = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Note?";
        this.dialogService.confirm('Delete Note', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.DeleteRecords(row.note_id, 'tblNotes').subscribe(function (res) {
                    _this.toaster.success("Note has been deleted successfully.");
                    _this.currentPageNotes = 1;
                    _this.getNoteslist();
                });
            }
        });
    };
    //  addFixOrderForm = this.fb.group({
    //    fixOrderID: [null],
    //    departmentId: [null, Validators.required],
    //    fixOrderDescription: [null]
    //  });
    //  get fixOrderID() { return this.addFixOrderForm.get('fixOrderID'); }
    //  get departmentId() { return this.addFixOrderForm.get('departmentId'); }
    //  get fixOrderDescription() { return this.addFixOrderForm.get('fixOrderDescription'); }
    //  getFixOrderData(workOrderid: any) {
    //    this.workOrderService.getFixOrderData(workOrderid).subscribe((result: any) => {
    //      this.addFixOrderForm.patchValue({
    //        fixOrderID: result.data[0].id,
    //        departmentId: result.data[0].departmentId.toString(),
    //        fixOrderDescription: result.data[0].departmentDescription,
    //      });
    //    },
    //      (error: any) => {
    //      })
    //    this.fixOrderPopupModel.show();
    //  }
    //  Fix_Order() {
    //    this.title = "Fix Order";
    //    this.getFixOrderData(this.Id);
    //  }
    //  closeFixOrderPopupModelPopup() {
    //    this.addFixOrderForm.reset();
    //    this.fixOrderPopupModel.hide();
    //  }
    //  SaveFixOrder() {
    //    if (this.addFixOrderForm.valid) {
    //      this.loadSave = true;
    //      this.fixOrdermodel.object_id = this.addFixOrderForm.value.fixOrderID;
    //      this.fixOrdermodel.departmentId = this.addFixOrderForm.value.departmentId;
    //      this.fixOrdermodel.fixOrderDescription = this.addFixOrderForm.value.fixOrderDescription;
    //      this.fixOrdermodel.object_name = "WorkOrder";
    //      this.fixOrdermodel.object_ref_id = this.Id;
    //      this.workOrderService.fixOrder(this.fixOrdermodel).subscribe((result: any) => {
    //        if (result.statusCode == 200) {
    //          this.addFixOrderForm.reset();
    //          this.loadSave = false;
    //          this.toaster.success(result.responseMessage);
    //          this.fixOrderPopupModel.hide();
    //        }
    //        else {
    //          this.loadSave = false;
    //          this.toaster.error(result.responseMessage);
    //        }
    //      });
    //    }
    //    else {
    //      this.commonService.validateAllFormFields(this.addFixOrderForm);
    //    }
    //  }
    //  //WorkOrderLineItem
    //  GetWorkOrderLineItemList() {
    //    this.workOrderService.GetWorkOrderLineItemList(this.Id, this.sortColumnlineitem, this.sortDir, this.LineItemPageno, this.pageSizeValueLineitem).subscribe(result => {
    //      this.LineItempagedData = result;
    //      console.log('result', this.LineItempagedData);
    //      this.lineItemCount = this.LineItempagedData.pager.totalItems;
    //      this.offset = this.LineItemPageno;
    //    },
    //      err => { this.loadSave = false },
    //      () => { this.loadSave = false });
    //  }
    //  setPageLineItem($event) {
    //    this.LineItemPageno = $event.page - 1;
    //    this.GetWorkOrderLineItemList();
    //    this.LineItemPageno = $event.page
    //  }
    //  onSortLineItems($event) {
    //    const sort = $event.sorts[0]
    //    this.sortDir = sort.dir;
    //    this.sortColumnlineitem = sort.prop;
    //    this.LineItemPageno = 0;
    //    this.loadSave = true;
    //    this.GetWorkOrderLineItemList();
    //  }
    ViewContractComponent.prototype.ViewNotes = function (row) {
        this.isViewNote = true;
        this.notesTitle = row.note_name;
        this.notesDescription = row.note_description;
        this.addNotesPopupModel.show();
    };
    ViewContractComponent.prototype.addItem = function (newItem) {
        this.notescount = newItem;
    };
    ViewContractComponent.ctorParameters = function () { return [
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__["LeadlistService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _contract_service__WEBPACK_IMPORTED_MODULE_2__["ContractService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('NotesPopupModel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewContractComponent.prototype, "addNotesPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('listnotesmodel', { static: false }),
        __metadata("design:type", _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_11__["NewnoteslistComponent"])
    ], ViewContractComponent.prototype, "listnotesmodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('FixOrder', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewContractComponent.prototype, "fixOrderPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ViewContractComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ViewContractComponent.prototype, "offsetnotes", void 0);
    ViewContractComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewcontract',
            template: __importDefault(__webpack_require__(/*! raw-loader!./viewcontract.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contract/viewcontract.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./viewcontract.component.scss */ "./src/app/views/contract/viewcontract.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__["LeadlistService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _contract_service__WEBPACK_IMPORTED_MODULE_2__["ContractService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_10__["Location"]])
    ], ViewContractComponent);
    return ViewContractComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-contract-contract-module.js.map