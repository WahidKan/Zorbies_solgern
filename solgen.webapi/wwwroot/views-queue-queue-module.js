(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-queue-queue-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/queue/addeditqueue.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/queue/addeditqueue.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/queuelist\">Manage Queue</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-content\">\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\" [ngClass]=\"{'disabled':loadSave}\">\r\n            <form [formGroup]=\"form\" *ngIf=\"form\">\r\n              <ng-container *ngFor=\"let item of formControlList\">\r\n                <h3 class=\"form-heading\"><span>{{ item.group_display_name}} </span></h3>\r\n                <div class=\"row mx-auto mb-2\">\r\n\r\n                  <ng-container *ngFor=\"let inner of item.InnerData\">\r\n                    <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : inner.form_field_visibility == 'NO', 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                         ngShow=\"inner.dependent_show_type == true\">\r\n                      <!---->\r\n                      <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO'\" />\r\n\r\n                      <label *ngIf=\"(inner.form_field_visibility == 'YES' && inner.display_name!='Company') && !hideCompany\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n\r\n                      <label *ngIf=\"inner.form_field_visibility == 'YES' && hideCompany\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n\r\n                      <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES'\">\r\n\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                               [formControlName]=\"inner.form_controlName\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required,inner.actual_data_type)\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date' && inner.dt_code !='url'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint'\" />\r\n\r\n\r\n\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required,inner.actual_data_type)\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                        <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName)?.touched &&\r\n                       form.get(inner.form_controlName)?.errors?.pattern)\"\r\n                               class=\"text-danger\">Please enter valid value</small>\r\n\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required,inner.actual_data_type)\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                        <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName)?.touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                               class=\"text-danger\">Please enter valid value</small>\r\n\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required,inner.actual_data_type)\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n\r\n\r\n                        <small *ngIf=\"inner.dt_code == 'decimal'  &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                               class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                        <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                        <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required,inner.actual_data_type)\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n\r\n                        <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\"\r\n                                    [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                        <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                          <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                            <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                              <div class=\"custom-control custom-checkbox\">\r\n\r\n                                <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                                       value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                                <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                              </div>\r\n\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n\r\n\r\n                        <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                          <div class=\"form-check form-check-inline\">\r\n                            <div class=\"custom-control custom-checkbox pl-0\">\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\"\r\n                                       id=\"{{inner.form_controlName}}\" [formControlName]=\"inner.form_controlName\">\r\n                                <span class=\"slider round\" id=\"{{inner.form_controlName}}\"><span>Yes</span></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n\r\n                        <!--Radio button-->\r\n                        <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                          <div *ngFor=\"let options of inner.listoptions\">\r\n                            <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n                              <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                                <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                                <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n\r\n                        </div>\r\n\r\n\r\n                        <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" class=\"form-control\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                                   *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' \"\r\n                                   [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                        </ng-select>\r\n\r\n\r\n                        <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" class=\"form-control\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                                   *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true' \"\r\n                                   [formControlName]=\"inner.form_controlName\"\r\n                                   [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                        </ng-select>\r\n                        <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                               class=\"text-danger\">{{inner.display_name}} is required</small>\r\n                      </div>\r\n\r\n\r\n                    </div>\r\n                  </ng-container>\r\n\r\n                </div>\r\n              </ng-container>\r\n            </form>\r\n\r\n          </div>\r\n\r\n        </div>\r\n\r\n          <h3 class=\"form-heading\"><span>Map Users</span></h3>\r\n          <div class=\"col-md-12\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-5\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\" py-2 form-group\">\r\n                      <select class=\"form-control\" id=\"dropdownFilter\" (change)=\"change($event)\" >\r\n                        <option value=\"users\">Users</option>\r\n                        <option value=\"department\">Department</option>\r\n                      </select>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"py-2 input-group\">\r\n                      <input id=\"searchtext\" type=\"search\" [(ngModel)]=\"searchtext\" class=\"form-control input-sm\" placeholder=\"Search by Name\">\r\n                      <!--<button (click)=\"searchFilter()\" type=\"button\"><i class=\"fa fa-search\"></i></button>-->\r\n                      <a class=\"btn btn-success ml-2\" href=\"javascript:void(0);\" (click)=\"searchFilter()\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                      <a class=\"btn btn-danger ml-2\" href=\"javascript:void(0);\" (click)=\"clearFilter()\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-7\"></div>\r\n\r\n              <div class=\"mover-panel-box col-md-5 col-lg-5\">\r\n                <div class=\"heading-border\">\r\n                  <h5 class=\"h5\"><span>Available Users</span></h5>\r\n                </div>\r\n\r\n                <div class=\"listing border-top\">\r\n                  <div class=\"table-responsive\">\r\n                    <table id=\"example\" class=\"table table-bordered \" style=\"min-width:100%\">\r\n                      <thead class=\"thead-bg\">\r\n                        <tr role=\"row\">\r\n                          <th scope=\"col\" class=\"sorting_asc\" tabindex=\"0\" aria-controls=\"example\" rowspan=\"1\" colspan=\"1\" aria-sort=\"ascending\" aria-label=\"User Name: activate to sort column ascending\" style=\"width: 813px;\">User Name</th>\r\n                          <th scope=\"col\" class=\"sorting_asc\" tabindex=\"0\" aria-controls=\"example\" rowspan=\"1\" colspan=\"1\" aria-sort=\"ascending\" aria-label=\"Department Name: activate to sort column ascending\" style=\"width: 813px;\">Department</th>\r\n                        </tr>\r\n\r\n                      </thead>\r\n                      <tbody>\r\n                        <tr role=\"row\"  [ngClass]=\"{'modal-bck':color.selected}\" (click)='OnItemSelected(color)' *ngFor=\"let color of userListData\" class=\"manageview-dragable odd\">\r\n                          <td class=\"sorting_1\" >{{color.text}} </td>\r\n                          <td class=\"sorting_1\">{{color.fieldName}} </td>\r\n                        </tr>\r\n                      </tbody>\r\n                    </table>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"mover-controls col-md-2 col-lg-1 mt-3 mt-mb-0 align-items-center\">\r\n                <button type=\"button\" (click)=\"OnShiftAllFromDragToDrop()\"><i aria-hidden=\"true\" class=\"fa fa-angle-double-down fa-2x d-md-none\"></i><i aria-hidden=\"true\" class=\"fa fa-angle-double-right fa-2x d-none d-md-block\"></i></button>\r\n                <button type=\"button\" (click)=\"OnShiftOneFromDragToDrop()\"><i aria-hidden=\"true\" class=\"fa fa-angle-down fa-2x d-md-none\"></i><i aria-hidden=\"true\" class=\"fa fa-angle-right fa-2x d-none d-md-block\"></i></button>\r\n                <button type=\"button\" (click)=\"OnShiftOneFromDropToDrag()\"><i aria-hidden=\"true\" class=\"fa fa-angle-up fa-2x d-md-none\"></i><i aria-hidden=\"true\" class=\"fa fa-angle-left fa-2x d-none d-md-block\"></i></button>\r\n                <button type=\"button\" (click)=\"OnShiftAllFromDropToDrag()\"><i aria-hidden=\"true\" class=\"fa fa-angle-double-up fa-2x d-md-none\"></i><i aria-hidden=\"true\" class=\"fa fa fa-angle-double-left fa-2x d-none d-md-block\"></i></button>\r\n              </div>\r\n\r\n              <div class=\"mover-panel-box col-md-5 col-lg-6\">\r\n                <div class=\"heading-border\">\r\n                  <h5 class=\"h5\"><span>Assigned Users</span></h5>\r\n                </div>\r\n\r\n               \r\n                  <div class=\"table-responsive border\">\r\n                    <table  class=\"table table-bordered selected-fields table-cont table-ul\">\r\n                      <thead class=\"thead-bg\">\r\n                        <tr role=\"row\">\r\n                          <th scope=\"col\">User Name</th>\r\n                          <th class=\"text-center\">Department</th>\r\n                        </tr>\r\n                      </thead>\r\n                      <p-orderList #droppedView [value]=\"droped\" dragdrop=\"true\">\r\n                        <ng-template let-c pTemplate=\"item\">\r\n                          <tr [ngClass]=\"{'modal-bck':c.selected}\" (click)=\"onDroppedItemClick(c)\" role=\"row\">\r\n                            <td class=\"sorting_1\">{{c.text}}</td>\r\n                            <td class=\"sorting_1\">{{c.fieldName}}</td>\r\n                          </tr>\r\n                        </ng-template>\r\n                      </p-orderList>\r\n                    </table>\r\n                  </div>\r\n               \r\n              </div>\r\n\r\n            </div>\r\n\r\n          </div>\r\n     \r\n      </div>\r\n      <div class=\"panel-footer border-top pt-3 pb-3\">\r\n\r\n        <div class=\"col-sm-12 col-md-12\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/queue/queuelist.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/queue/queuelist.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"header float-left w-100 mb-2\">\n  <h2 class=\"float-left pr-2\"><strong>MANAGE QUEUE</strong></h2>\n  <div class=\"breadcrumb-wrapper\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a routerLink=\"/dashboard\">Dashboard</a>\n      </li>\n      <li class=\"active\">Manage Queue</li>\n    </ol>\n  </div>\n\n</div>\n<div class=\"clearfix\"></div>\n<div class=\"row\">\n  <div class=\"col-lg-12 portlets\">\n    <div class=\"panel\">\n      <div class=\"panel-header border-bottom pb-3\">\n        <div class=\"row mt-2\">\n          <div class=\"col-md-12 col-xl-6\">\n            <div class=\"row searchfield  mr-1 w-100\">\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\n              </div>\n              <div class=\"col-lg-8 float-left\">\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\"><span><i class=\"fa fa-search\"></i> Search</span></a>\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-12 col-xl-6\">\n            <div class=\"dt-buttons\">\n              <a *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag' routerLink=\"/queuelist/addqueue\" class=\"btn btn-success form-btns mr-1\"><i class=\"fa fa-plus\"></i> Add Queue</a>\n              <a *ngIf='modulePermission!==null && modulePermission.roleModuleDeleteFlag' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\"><span><i class=\"fa fa-trash\"></i> Delete</span></a>\n\n            </div>\n          </div>\n        </div>\n      </div><!--[rowHeight]=\"'auto'\"  -->\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\n                       [rowHeight]=\"40\"\n                       [rows]=\"columndata\"\n                       [columnMode]=\"'force'\"\n                       [headerHeight]=\"40\"\n                       [footerHeight]=\"40\"\n                       \n                       [externalPaging]=\"true\"\n                       [externalSorting]=\"true\"\n                       [loadingIndicator]=\"loadSave\"\n                       [count]=\"totalRecords\"\n                       [offset]=\"currentPage\"\n                       [limit]=\"pageSizeValue\"\n                       (page)='setPage($event)'\n                       (sort)=\"onSort($event)\"\n                       [scrollbarH]=\"true\"\n                       [selectionType]=\"SelectionType.checkbox\"\n                       [selectAllRowsOnPage]=\"false\"\n                       [selected]=\"selected\"\n                       (select)=\"onSelect($event)\">\n\n          <ngx-datatable-column [width]=\"50\"\n                                [sortable]=\"false\"\n                                [canAutoResize]=\"false\"\n                                [draggable]=\"false\"\n                                [resizeable]=\"false\"\n                                [headerCheckboxable]=\"true\"\n                                [checkboxable]=\"true\">\n          </ngx-datatable-column>\n\n\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <div *ngIf=\"col.COLUMN_NAME == 'Name'\">\n                <a class=\"view-list\" [routerLink]=\"['/serviceresource/view',row.ID]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\n              </div>\n\n              <div *ngIf=\"col.COLUMN_NAME != 'Name'\">\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\n                  <span class=\"status-box bg-success\" *ngIf=\"row[col.COLUMN_NAME] == true\">Enabled</span>\n                  <span class=\"status-box bg-danger\" *ngIf=\"row[col.COLUMN_NAME] == false\">Disabled</span>\n                </div>\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE=='date'\">\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\n                </div>\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.DATA_TYPE!='bit' && col.COLUMN_NAME!='CreatedAt' && col.COLUMN_NAME!='ModifyAt' && col.FieldType != 'select' && col.COLUMN_NAME!='UserCount' \">\n                  {{row[col.COLUMN_NAME] | truncate}}\n                </div>\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.COLUMN_NAME=='UserCount' \">\n                  <a (click)=\"showpopUserCount(row.Id)\" href=\"javascript:void(0);\" data-toggle=\"modal\" class=\"text-dark\">\n                    <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\n                    <span class=\"noti-circle noti-blue\">{{row[col.COLUMN_NAME] }}</span>\n                  </a>\n                </div>\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.COLUMN_NAME=='CreatedAt'\">\n                  {{ (row.CreatedAt !== null) ? (row.CreatedAt | DateTimeToLocal) : \"\" }}\n                </div>\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.COLUMN_NAME=='ModifyAt'\">\n                  {{ (row.ModifyAt !== null) ? (row.ModifyAt | DateTimeToLocal) : \"\" }}\n                </div>\n                <div *ngIf=\"col.FieldType == 'select'\">\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\n                    {{row[col.COLUMN_NAME] |  truncate}}\n                  </div>\n                  <div *ngIf=\"col.FieldFrom==null\">\n                    <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\n                      <div *ngIf=\"itemColorCode.colorkey==undefined\">\n                        {{itemColorCode.color}}\n                      </div>\n                      <div *ngIf=\"itemColorCode.colorkey!=undefined\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\n                        {{itemColorCode.color}}\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n              <span class=\"actions rw_act\">\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.Id\" aria-hidden=\"true\"></i>\n                <span class=\"action-list-box spn{{row.Id}}\">\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\n                    <a *ngIf='modulePermission!==null && modulePermission.roleModuleReadFlag' class=\"actions-onclick view-list\" [routerLink]=\"['/queuelist/editqueue',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\n                    <a *ngIf='modulePermission!==null && modulePermission.roleModuleDeleteFlag' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\n                  </span>\n                </span>\n              </span>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-footer>\n            <ng-template ngx-datatable-footer-template\n                         let-rowCount=\"rowCount\"\n                         let-pageSize=\"pageSize\"\n                         let-selectedCount=\"selectedCount\"\n                         let-currentPage=\"curPage\"\n                         let-offset=\"offset\"\n                         let-isVisible=\"isVisible\">\n              <div>\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\n                  </span>\n                </div>\n              </div>\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n\r\n              </div>\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\n                               [page]=\"curPage\"\n                               [size]=\"pageSizeValue\"\n                               [count]=\"totalRecords\"\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\n                               (change)=\"setPage($event)\">\n              </datatable-pager>\n            </ng-template>\n          </ngx-datatable-footer>\n        </ngx-datatable>\n\n      </div>\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal fade in show\" bsModal #assignpopup=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\n  <div class=\"modal-dialog modal-xl modal-info \">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Queue User Details</h4>\n        <button type=\"button\" class=\"close\" (click)=\"closemodel()\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n\n\n\n      <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:700px; overflow-y:auto;\">\n\n        <div class=\"col-lg-12\" [ngClass]=\"{'disabled':loadSave}\">\n          <div class=\"table-responsive\">\n            <div class=\"table table-striped\">\n              <ngx-datatable #table class=\"bootstrap\"\n                             [rows]=\"pagedDataUserList.data\"\n                             [scrollbarH]=\"true\"\n                       [rowHeight]=\"'40'\"\n                             [columnMode]=\"'force'\"\n                             [headerHeight]=\"40\"\n                             [footerHeight]=\"40\"\n                             \n                             [externalPaging]=\"true\"\n                             [externalSorting]=\"true\"\n                             [loadingIndicator]=\"loadSave\"\n                             [messages]=\"{emptyMessage:'No Record Found.'}\"\n                             [count]=\"pagedDataUserList.pager.totalItems\"\n                             [offset]=\"pagedDataUserList.pager.currentPage\"\n                             [limit]=\"pagedDataUserList.pager.pageSize\"\n                             (page)='setPageUserList($event)'\n                             (sort)=\"setPageUserList($event)\">\n\n                <ngx-datatable-column name=\"User Name\" [sortable]=\"false\" prop=\"UserName\" [minWidth]=\"150\"></ngx-datatable-column>\n                <ngx-datatable-column name=\"Department\" [sortable]=\"false\" prop=\"DepartmentName\" [minWidth]=\"150\"></ngx-datatable-column>\n\n                <ngx-datatable-footer>\n                  <ng-template ngx-datatable-footer-template\n                               let-rowCount=\"rowCount\"\n                               let-pageSize=\"pageSize\"\n                               let-selectedCount=\"selectedCount\"\n                               let-currentPage=\"curPageUserList\"\n                               let-offset=\"offsetUserList\"\n                               let-isVisible=\"isVisible\">\n                    <div class=\"page-count\" style=\"max-width:170px;\">\n                      Total Records: {{rowCount}}\n                    </div>\n                    <div>\n                      <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\n                        <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n                          <ng-select [searchable]=\"false\" [items]=\"lstPageSizeUserList\" appendTo=\"body\" [(ngModel)]='pageSizeValueUserList' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeUserList($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\n                                     bindLabel=\"text\" bindValue=\"text\"></ng-select>\n                        </span>\n                      </div>\n                    </div>\n                    <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\n                                     [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\n                                     [pagerPreviousIcon]=\"'fa fa-angle-left'\"\n                                     [pagerNextIcon]=\"'fa fa-angle-right'\"\n                                     [page]=\"curPageUserList\"\n                                     [size]=\"pageSizeValueUserList\"\n                                     [count]=\"pagedDataUserList.pager.totalItems\"\n                                     [hidden]=\"!((rowCount / pageSize) > 1)\"\n                                     (change)=\"setPageUserList($event)\">\n                    </datatable-pager>\n                  </ng-template>\n                </ngx-datatable-footer>\n              </ngx-datatable>\n            </div>\n          </div>\n\n\n        </div>\n      </div>\n\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closemodel()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\n      </div>\n      <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>-->\n    </div>\n  </div>\n</div>\n\n");

/***/ }),

/***/ "./src/app/views/queue/addeditqueue.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/views/queue/addeditqueue.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3F1ZXVlL2FkZGVkaXRxdWV1ZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/queue/addeditqueue.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/views/queue/addeditqueue.component.ts ***!
  \*******************************************************/
/*! exports provided: AddeditqueueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditqueueComponent", function() { return AddeditqueueComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _queueservice_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./queueservice.service */ "./src/app/views/queue/queueservice.service.ts");
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






var AddeditqueueComponent = /** @class */ (function () {
    function AddeditqueueComponent(fb, queueserviceService, router, toaster, route, commonService) {
        var _this = this;
        this.fb = fb;
        this.queueserviceService = queueserviceService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.config = [];
        this.moduleName = 'Queue';
        this.submoduleName = 'queue';
        this.loadSave = false;
        this.id = '';
        this.isLead = false;
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _queueservice_service__WEBPACK_IMPORTED_MODULE_5__["JsonData"]();
        this.userListData = [];
        this.userListDataDummy = [];
        this.droped = [];
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
        this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    AddeditqueueComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dropdownFilter = 'users';
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.id = id;
                _this.pageTitle = 'Edit Queue';
                _this.addOrUpdatePermission = _this.modulePermission.roleModuleUpdateFlag;
            }
            else {
                _this.pageTitle = 'Add Queue';
                _this.addOrUpdatePermission = _this.modulePermission.roleModuleAddFlag;
            }
        });
        this.queueserviceService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.id).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.queueserviceService.customFieldsList.data;
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _queueservice_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                _this.loadSave = false;
            }
        });
        this.queueserviceService.GetUsersList(this.companyId, this.id).subscribe(function (resultUser) {
            if (resultUser) {
                _this.userListValues = _this.queueserviceService.userList.data;
                _this.userListData = [];
                var i_1 = 0;
                _this.userListValues.forEach(function (t) {
                    var obj = {
                        text: t.UserName,
                        index: i_1,
                        value: t.Id,
                        fieldName: t.DepartmentName,
                    };
                    _this.userListDataDummy.push(obj);
                });
                _this.userListValues.filter(function (x) { return x.selected == "false"; }).forEach(function (t) {
                    var obj = {
                        text: t.UserName,
                        index: i_1,
                        value: t.Id,
                        fieldName: t.DepartmentName,
                    };
                    _this.userListData.push(obj);
                });
                _this.userListValues.filter(function (x) { return x.selected == "true"; }).forEach(function (t) {
                    var obj1 = {
                        text: t.UserName,
                        index: i_1,
                        value: t.Id,
                        fieldName: t.DepartmentName,
                    };
                    _this.droped.push(obj1);
                });
            }
        });
    };
    AddeditqueueComponent.prototype.OnItemSelected = function (item) {
        if (item.selected == true) {
            item.selected = false;
            return;
        }
        else {
            this.userListData[this.userListData.indexOf(item)].selected = true;
        }
    };
    AddeditqueueComponent.prototype.OnShiftOneFromDragToDrop = function () {
        var selected = [];
        for (var i = 0; i < this.userListData.length; i++) {
            if (this.userListData[i].selected == true) {
                this.userListData[i].selected = false;
                this.droped.push(this.userListData[i]);
                selected.push(i);
            }
        }
        for (var i = selected.length - 1; i >= 0; i--) {
            var temp = selected[i];
            this.userListData.splice(temp, 1);
        }
    };
    AddeditqueueComponent.prototype.OnShiftAllFromDragToDrop = function () {
        for (var i = 0; i < this.userListData.length; i++) {
            this.userListData[i].selected = false;
            this.droped.push(this.userListData[i]);
        }
        this.userListData.splice(0, this.userListData.length);
    };
    AddeditqueueComponent.prototype.OnShiftAllFromDropToDrag = function () {
        for (var i = 0; i < this.droped.length; i++) {
            this.droped[i].selected = false;
            for (var j = 0; j < this.userListDataDummy.length; j++) {
                if (this.droped[i].value == this.userListDataDummy[j].value) {
                    this.droped[i].selected = false;
                    this.userListData.splice(j, 0, this.droped[i]);
                    break;
                }
            }
        }
        this.droped.splice(0, this.droped.length);
    };
    AddeditqueueComponent.prototype.OnShiftOneFromDropToDrag = function () {
        for (var i = 0; i <= this.droped.length; i++) {
            if (this.droped[i].selected == true) {
                for (var j = 0; j < this.userListDataDummy.length; j++) {
                    if (this.droped[i].value == this.userListDataDummy[j].value) {
                        this.droped[i].selected = false;
                        this.userListData.splice(j, 0, this.droped[i]);
                        this.droped.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
        }
    };
    AddeditqueueComponent.prototype.onDroppedItemClick = function (item) {
        this.droped[this.droped.indexOf(item)].selected = !item.selected;
    };
    AddeditqueueComponent.prototype.clearFilter = function () {
        var _this = this;
        this.userListData = [];
        this.searchtext = '';
        var i = 0;
        this.userListValues.filter(function (x) { return x.selected == "false"; }).forEach(function (t) {
            var obj = {
                text: t.UserName,
                index: i,
                value: t.Id,
                fieldName: t.DepartmentName,
            };
            _this.userListData.push(obj);
        });
    };
    AddeditqueueComponent.prototype.searchFilter = function () {
        var _this = this;
        this.userListData = [];
        var i = 0;
        if (this.dropdownFilter == 'users') {
            this.userListValues.filter(function (s) { return s.UserName.toLocaleLowerCase().includes(_this.searchtext.toLocaleLowerCase()) && s.selected == "false"; }).forEach(function (t) {
                var obj = {
                    text: t.UserName,
                    index: i,
                    value: t.Id,
                    fieldName: t.DepartmentName,
                };
                _this.userListData.push(obj);
            });
        }
        else {
            this.userListValues.filter(function (x) { return x.DepartmentName.toLocaleLowerCase().includes(_this.searchtext.toLocaleLowerCase()) && x.selected == "false"; }).forEach(function (t) {
                var obj = {
                    text: t.UserName,
                    index: i,
                    value: t.Id,
                    fieldName: t.DepartmentName,
                };
                _this.userListData.push(obj);
            });
        }
    };
    AddeditqueueComponent.prototype.checkvalue = function (formvalues, selval) {
        var returnValue = false;
        if (formvalues != null) {
            formvalues.split(',').find(function (item) {
                if (item == selval) {
                    returnValue = true;
                }
            });
        }
        return returnValue;
    };
    AddeditqueueComponent.prototype.test = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    AddeditqueueComponent.prototype.OnCheck = function () {
    };
    AddeditqueueComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loadSave = true;
        this.checkboxdata1.forEach(function (item) {
            if (item.controlvalues != "" && item.controlvalues != undefined) {
                var selvalues = "";
                if (selvalues == "" || selvalues == null) {
                    _this.form.get(item.controlname).setValue(item.controlvalues);
                }
                else {
                    _this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
                }
            }
        });
        if (this.droped.length == 0) {
            this.toaster.error('No User Selected.');
            return;
        }
        if (this.form.valid) {
            this.loadSave = true;
            this.JsonData.Id = this.id;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            this.JsonData.companyId = this.companyId;
            this.selecteddata = JSON.stringify(this.droped);
            this.JsonData.selecteddata = this.selecteddata;
            this.JsonData.userId = this.userId;
            this.JsonData.FormJsonData = JSON.stringify(this.form.value);
            this.queueserviceService.addEditForm(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
                    setTimeout(function () {
                        _this.toaster.success(result.responseMessage);
                        _this.loadSave = false;
                        _this.router.navigateByUrl("/queuelist");
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
    AddeditqueueComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
    };
    AddeditqueueComponent.prototype.close = function () {
        this.router.navigateByUrl("/queuelist");
    };
    AddeditqueueComponent.prototype.MakeArray = function (value, type) {
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
    AddeditqueueComponent.prototype.MakeNormalArray = function (value) {
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
    AddeditqueueComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
        }
        return array;
    };
    AddeditqueueComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        var checkboxdatanew = new _queueservice_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
        }
        else {
            var strs = this.checkboxdata1.find(function (item) { return item.controlname == controldisp.ColumnName; }).controlvalues.split(",");
            var updatedval = strs.splice(strs.indexOf(e.target.labels[0].innerHTML), 1);
            var updateItem = this.checkboxdata1.find(function (item) { return item.controlname == controldisp.ColumnName; });
            var index = this.checkboxdata1.indexOf(updateItem);
            this.checkboxdata1[index].controlvalues = strs.toString();
        }
        var dd = this.formControlList;
    };
    AddeditqueueComponent.prototype.change = function (e) {
        this.dropdownFilter = e.target.value;
    };
    AddeditqueueComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _queueservice_service__WEBPACK_IMPORTED_MODULE_5__["QueueserviceService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('droppedView', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddeditqueueComponent.prototype, "DroppedView", void 0);
    AddeditqueueComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditqueue',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditqueue.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/queue/addeditqueue.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditqueue.component.scss */ "./src/app/views/queue/addeditqueue.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _queueservice_service__WEBPACK_IMPORTED_MODULE_5__["QueueserviceService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], AddeditqueueComponent);
    return AddeditqueueComponent;
}());



/***/ }),

/***/ "./src/app/views/queue/queue-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/queue/queue-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: QueueRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueRoutingModule", function() { return QueueRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _queuelist_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queuelist.component */ "./src/app/views/queue/queuelist.component.ts");
/* harmony import */ var _addeditqueue_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addeditqueue.component */ "./src/app/views/queue/addeditqueue.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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
    { path: '', component: _queuelist_component__WEBPACK_IMPORTED_MODULE_1__["QueuelistComponent"] },
    { path: 'editqueue/:id', component: _addeditqueue_component__WEBPACK_IMPORTED_MODULE_2__["AddeditqueueComponent"] },
    { path: 'addqueue', component: _addeditqueue_component__WEBPACK_IMPORTED_MODULE_2__["AddeditqueueComponent"] },
];
var QueueRoutingModule = /** @class */ (function () {
    function QueueRoutingModule() {
    }
    QueueRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
        })
    ], QueueRoutingModule);
    return QueueRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/queue/queue.module.ts":
/*!*********************************************!*\
  !*** ./src/app/views/queue/queue.module.ts ***!
  \*********************************************/
/*! exports provided: QueueModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueModule", function() { return QueueModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _addeditqueue_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addeditqueue.component */ "./src/app/views/queue/addeditqueue.component.ts");
/* harmony import */ var _queuelist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queuelist.component */ "./src/app/views/queue/queuelist.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _queue_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./queue-routing.module */ "./src/app/views/queue/queue-routing.module.ts");
/* harmony import */ var primeng_orderlist__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/orderlist */ "./node_modules/primeng/orderlist.js");
/* harmony import */ var primeng_orderlist__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(primeng_orderlist__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var QueueModule = /** @class */ (function () {
    function QueueModule() {
    }
    QueueModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_addeditqueue_component__WEBPACK_IMPORTED_MODULE_2__["AddeditqueueComponent"], _queuelist_component__WEBPACK_IMPORTED_MODULE_3__["QueuelistComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _queue_routing_module__WEBPACK_IMPORTED_MODULE_8__["QueueRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"], primeng_orderlist__WEBPACK_IMPORTED_MODULE_9__["OrderListModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalModule"]
            ]
        })
    ], QueueModule);
    return QueueModule;
}());



/***/ }),

/***/ "./src/app/views/queue/queuelist.component.scss":
/*!******************************************************!*\
  !*** ./src/app/views/queue/queuelist.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3F1ZXVlL3F1ZXVlbGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/queue/queuelist.component.ts":
/*!****************************************************!*\
  !*** ./src/app/views/queue/queuelist.component.ts ***!
  \****************************************************/
/*! exports provided: QueuelistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueuelistComponent", function() { return QueuelistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _queueservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queueservice.service */ "./src/app/views/queue/queueservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
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








var QueuelistComponent = /** @class */ (function () {
    function QueuelistComponent(queueserviceService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.queueserviceService = queueserviceService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.moduleName = 'Queue';
        this.submoduleName = 'queue';
        this.tableName = 'tblQueue';
        this.custom_view_id = '';
        this.searchUserType = '';
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.listFiltertext = '';
        this.searchFilter = '';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_2__["SelectionType"];
        this.selected = [];
        this.assigneduserList = [];
        this.listuserFilter = '';
        this.pageSizeValueUserList = 10;
        this.sortDirUserList = 'desc';
        this.sortColumnUserList = 'CreatedOn';
        this.pagedDataUserList = {
            pager: {},
            data: []
        };
        this.loadSave = false;
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
        });
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
    }
    QueuelistComponent.prototype.ngOnInit = function () {
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.refresh();
    };
    QueuelistComponent.prototype.showpopUserCount = function (id) {
        var _this = this;
        this.assigneduserList = [];
        this.currentPageUserList = 1;
        this.queueid = id;
        this.queueserviceService.GetQueueUserList(this.listuserFilter, this.sortColumnUserList, this.sortDirUserList, this.currentPageUserList, this.pageSizeValueUserList, this.queueid).subscribe(function (response) {
            _this.pagedDataUserList = response;
            _this.offsetUserList = _this.currentPageUserList;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
        this.assignpopupModel.show();
    };
    QueuelistComponent.prototype.closemodel = function () {
        this.assignpopupModel.hide();
    };
    Object.defineProperty(QueuelistComponent.prototype, "curPageUserList", {
        get: function () {
            return this.offsetUserList;
        },
        enumerable: true,
        configurable: true
    });
    QueuelistComponent.prototype.onChangeUserList = function ($event) {
        var _this = this;
        this.currentPageUserList = 1;
        this.loading = true;
        this.queueserviceService.GetQueueUserList(this.listuserFilter, this.sortColumnUserList, this.sortDirUserList, this.currentPageUserList, this.pageSizeValueUserList, this.queueid).subscribe(function (response) {
            _this.pagedDataUserList = response;
            //for (var i = 0; i < this.pagedDataBankerList.data.length; i++) {
            //  this.assignedBankerData.forEach(s => {
            //    if (this.pagedDataBankerList.data[i].Email === s.Email) {
            //      this.pagedDataBankerList.data[i].Status = s.Status;
            //    }
            //  })
            //}
            _this.offsetUserList = _this.currentPageUserList;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    QueuelistComponent.prototype.setPageUserList = function ($event) {
        var _this = this;
        this.loading = true;
        this.currentPageUserList = $event.page;
        this.queueserviceService.GetQueueUserList(this.listuserFilter, this.sortColumnUserList, this.sortDirUserList, this.currentPageUserList, this.pageSizeValueUserList, this.queueid).subscribe(function (response) {
            _this.pagedDataUserList = response;
            //for (var i = 0; i < this.pagedDataUserList.data.length; i++) {
            //  this.assignedBankerData.forEach(s => {
            //    if (this.pagedDataUserList.data[i].Email === s.Email) {
            //      this.pagedDataUserList.data[i].Status = s.Status;
            //    }
            //  })
            //}
            _this.offsetUserList = _this.currentPageUserList;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    QueuelistComponent.prototype.getListingColorCode = function (fieldValue) {
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
    QueuelistComponent.prototype.GetcustomViewid = function (event) {
        this.custom_view_id = event;
        this.refresh();
    };
    QueuelistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    QueuelistComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.queueserviceService.GetQueueList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id)
            .subscribe(function (response) {
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
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    QueuelistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
            _this.lstPageSizeUserList = _this.commonService.masters;
        });
    };
    QueuelistComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    QueuelistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    QueuelistComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    Object.defineProperty(QueuelistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    QueuelistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    QueuelistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "Name like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    QueuelistComponent.prototype.reset = function () {
        this.custom_view_id = '';
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.refresh();
    };
    QueuelistComponent.prototype.onSelect = function (_a) {
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
    QueuelistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Queue(s)\"";
            this.dialogService.confirm('Delete Queue(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.queueserviceService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    QueuelistComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Queue  \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete Queue', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.queueserviceService.DeleteRecords(row.Id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Queue \"" + row.Name + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    QueuelistComponent.ctorParameters = function () { return [
        { type: _queueservice_service__WEBPACK_IMPORTED_MODULE_3__["QueueserviceService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_2__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_2__["DatatableComponent"])
    ], QueuelistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('assignpopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], QueuelistComponent.prototype, "assignpopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], QueuelistComponent.prototype, "offsetUserList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], QueuelistComponent.prototype, "offset", void 0);
    QueuelistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-queuelist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./queuelist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/queue/queuelist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./queuelist.component.scss */ "./src/app/views/queue/queuelist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_queueservice_service__WEBPACK_IMPORTED_MODULE_3__["QueueserviceService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], QueuelistComponent);
    return QueuelistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-queue-queue-module.js.map