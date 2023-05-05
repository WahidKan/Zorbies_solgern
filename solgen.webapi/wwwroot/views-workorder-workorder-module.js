(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-workorder-workorder-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/workorder/manageworkorder.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/workorder/manageworkorder.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/workorder\">Manage WorkOrder</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList;let i=index\">\r\n        <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row  mb-2\">\r\n          <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO' &&  inner.edit_form_field_visibility == 'NO' \" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='datetime'\" />\r\n\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n\r\n\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'datetime'\" [formControlName]=\"inner.form_controlName\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                            [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\"\r\n                               id=\"{{inner.form_controlName}}\" [formControlName]=\"inner.form_controlName\">\r\n                        <span class=\"slider round\" id=\"{{inner.form_controlName}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                        \">\r\n                        <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                               [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n                        <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n\r\n\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--Ng Dropdown-->\r\n                <!--Dropdown\r\n                picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n                -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.dt_code=='select' }\" *ngIf=\"inner.dt_code=='select' && inner.select_options==''\">\r\n                  <option value=\"\">Select</option>\r\n                  <option [value]=\"option.id\"\r\n                          *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n                    {{option.value}}\r\n                  </option>\r\n                </select>-->\r\n                <!--<ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                           [ngClass]=\"{'disabledddl':inner.is_readOnly}\" [searchable]=\"false\" [clearable]=\"false\"\r\n                           [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n\r\n                <ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && !inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                           [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true'\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>-->\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (clear)=\"onClearLang(item.InnerData,j)\"\r\n                           (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code!=null \" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code==null\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true'\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <div class=\"clearfix\"></div>\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n\r\n                <!--Dropdown\r\n                  picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n                -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n                        (change)='onOptionsSelected($event,inner)'>\r\n                  <option value=\"\">Select</option>\r\n                  <option [value]=\"option.name\"\r\n                          *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n                    {{option.name}}\r\n                  </option>\r\n\r\n                </select>-->\r\n              </div>\r\n\r\n\r\n\r\n\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row  mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/workorder/viewworkorder.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/workorder/viewworkorder.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Work Order Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/workorder\">Manage Work Order</a></li>\r\n      <li class=\"active\">Work Order Details</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-3 mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-user-circle-o text-dark float-left mr-2\" style=\"font-size:27px;\"></i>\r\n    <span class=\"float-left w-85-res\" style=\"font-size:18px;\"><span>Work Order</span> {{WorkOrderSubject}}</span>\r\n    <span class=\"cntnt-right-btn mr15 btn-iconres\">\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-info text-white mr-2\" (click)=\"onUpdateStatusClick()\" *ngIf=\"isStartWork==true\"><i class=\"fa fa-pencil mr-1\"></i> Start Work Order</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-info text-white mr-2\" (click)=\"onUpdateStatusClick()\" *ngIf=\"isCompleteWork==true\"><i class=\"fa fa-pencil mr-1\"></i> Complete Work Order</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-info text-white mr-2\" (click)=\"auditpopup()\"><i class=\"fa fa-pencil mr-1\"></i>View CheckList</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-info text-white mr-2\" (click)=\"Fix_Order()\"><i class=\"fa fa-pencil mr-1\"></i> Fix Order</a>\r\n      <a href=\"javascript:void(0);\" [routerLink]=\"['/workorder/edit',Id]\" class=\"btn btn-success text-white mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n  <div class=\"col-12 float-left  d-md-flex p-0 py-resp py-2 py-sm-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n      <div class=\"col py-2\" *ngIf=\"item.display_name !='Subject' && item.ColumnName!='Status'\">\r\n        <span *ngIf=\"item.field_route==null\" class=\"d-block\">\r\n          <strong>{{ item.display_name}}:</strong>\r\n          <ng-container *ngIf=\"item.dt_code!='date' &&  item.dt_code!='datetime'\">{{ item.value }} </ng-container>\r\n          <ng-container *ngIf=\"item.dt_code=='date'\"> {{ item.value | DateTimeToLocal:'Date'}}</ng-container>\r\n          <ng-container *ngIf=\"item.dt_code=='datetime'\"> {{ item.value | DateTimeToLocal}}</ng-container>\r\n        </span>\r\n        <span *ngIf=\"item.field_route!=null\" class=\"d-block\"><strong>{{ item.display_name}}:</strong> <a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\"> {{ item.value}}</a></span>\r\n      </div>\r\n      <div class=\"col py-3\" *ngIf=\"item.ColumnName=='Status'\">\r\n        <span class=\"d-block\"><strong>{{ item.display_name}}:</strong>\r\n        <span class=\"text-white p-1 ml-1 rounded\" [style.background-color]=\"item.value | split:'::':1 \">\r\n          {{ item.value | split:'::':0}}</span></span>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"card m-0 mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold text-center\" style=\"font-size: 24px;\" *ngIf=\"isStartWork==true\">\r\n    YOU NEED TO CLICK START WORK TO SHOW WORK ORDER DETAILS\r\n  </span>\r\n</div>\r\n<div class=\"col-md-12 col-sm-12 list-card-view\" *ngIf=\"NotificationListData!=null && NotificationListData!='' \">\r\n  <div class=\"card card-block noti\" >\r\n    <div class=\"card-main alert-warning border-0\" *ngFor=\"let item of NotificationListData\">\r\n      <h5 class=\"card-title mt-3 mb-3\">\r\n        {{item.title}}\r\n        <span class=\"badge badge-warning ng-star-inserted ml-2\" style=\"color:#000;padding:5px\">Unread</span>\r\n        <!--<a href=\"javascript:void(0);\" (click)=\"redirectToSource(item.noteId)\" class=\"float-right\"><i aria-hidden=\"true\" class=\"fa fa-external-link\" title=\"Go To Source\"></i></a>-->\r\n        <a href=\"javascript:void(0);\" (click)=\"displayDetailNotification(item)\" class=\"float-right bg-primary px-2\" style=\"border-radius: 4px;\"><i class=\"fa fa-eye text-white\" title=\"View\"></i></a> &nbsp;\r\n      </h5>\r\n      <p><strong>Description:</strong> {{item.description | truncate:250 }}</p>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<div class=\"clearfix\"></div>\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:none\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col-sm-12 col-lg-8\">\r\n            <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n            <div id=\"accordion\">\r\n\r\n              <!--WorkOrderlineItem-->\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#LineItem\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>WorkOrder Line Item ({{lineItemCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"LineItem\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <!--<a href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add</a>-->\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"LineItempagedData.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"LineItempagedData.pager.totalItems\"\r\n                                     [offset]=\"LineItempagedData.pager.currentPage\"\r\n                                     [limit]=\"LineItempagedData.pager.pageSize\"\r\n                                     (page)='setPageLineItem($event)'\r\n                                     (sort)=\"onSortLineItems($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Work Order Line Item Number\" prop=\"LineItemNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n\r\n                        <ngx-datatable-column name=\"Subject\" sortable=\"false\" prop=\"Subject\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Description\" sortable=\"false\" prop=\"Description\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Status\" sortable=\"false\" prop=\"StatusCategory\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Completed\" sortable=\"false\" prop=\"Completed_Date__c\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Sort Order\" sortable=\"false\" prop=\"Sort_Order__c\" [sortable]=\"true\" [minWidth]=\"150\"></ngx-datatable-column>\r\n\r\n                        <!--<ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div class=\"text-center\">\r\n                              <a href=\"javascript:void(0);\" (click)=\"EditNotes(row)\" title=\"Edit Notes\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"DeleteNote(row,'AssignedResource')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                            </div>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>-->\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"LineItempagedData.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                              {{commonService.PageString(LineItempagedData.pager.currentPage,LineItempagedData.pager.pageSize,rowCount)}}\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"LineItempagedData.pager.currentPage\"\r\n                                             [size]=\"pageSizeValueLineitem\"\r\n                                             [count]=\"LineItempagedData.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                             (change)=\"setPageLineItem($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n              <!--End-->\r\n\r\n              <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                <ng-container *ngFor=\"let item of formControlList\">\r\n                  <div class=\"panel active\">\r\n                    <div class=\"panel-heading\">\r\n                      <h4 class=\"panel-title\">\r\n                        <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                          <span> {{item.group_name}}</span>\r\n                        </a>\r\n                      </h4>\r\n                    </div>\r\n                    <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                      <div class=\"panel-body row px-0 mt-0\">\r\n                        <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                          <div class=\"input-group border-bottom\">\r\n                            <div class=\"col-sm-12 col-md-6 px-0\">\r\n                              <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                            </div>\r\n                            <div class=\"col-sm-12 col-md-6\">\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null\" class=\"py-2 d-block\">\r\n                                \r\n                                <ng-container *ngIf=\"inner.dt_code=='datetime'\">{{ inner.value | DateTimeToLocal}}</ng-container>\r\n                                <ng-container *ngIf=\"inner.dt_code=='date'\">{{ inner.value | DateTimeToLocal:'Date'}}</ng-container>\r\n                                <ng-container *ngIf=\"inner.dt_code!='datetime' && inner.dt_code!='date'\">{{ inner.value}}</ng-container>\r\n                              </span>\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null\" class=\"py-2 d-block\">\r\n                                <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                              </span>\r\n\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch  mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ng-container>\r\n              </form>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-12 col-lg-4 relatedtab\" *ngIf=\"isStartWork==false\">\r\n            <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n            <div id=\"accordion\">\r\n\r\n              <!--=================================== Engineering Questions ================================-->\r\n              <div class=\"panel active rght-panel\" *ngIf=\"iSEngineeringQues\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#EngineeringQuestion\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Engineering Questions</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"EngineeringQuestion\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <a href=\"javascript:void(0);\" (click)=\"AddEngineeringQuestionPopup()\" class=\"btn-in-panel\"><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Edit</span></a>\r\n                  <div class=\"modal-body\">\r\n                    <form [formGroup]=\"addEditEngineeringForm\" autocomplete=\"off\">\r\n                      <div class=\"row mb-2\">\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>MPU Needed:</label>\r\n                          <div class=\"form-group\">\r\n                            <ng-select #clearDrop [items]=\"lstMPU\"\r\n                                       placeholder=\"None\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"mpuNeeded\"\r\n                                       [closeOnSelect]=\"true\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Trenching Needed:</label>\r\n                          <div class=\"form-group\">\r\n                            <ng-select #clearDrop [items]=\"lstTrenching\"\r\n                                       placeholder=\"None\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"trenchingNeeded\"\r\n                                       [closeOnSelect]=\"true\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Retrofit Needed:</label>\r\n                          <div class=\"form-group\">\r\n                            <ng-select #clearDrop [items]=\"lstRetrofit\"\r\n                                       placeholder=\"None\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"retrofitNeeded\"\r\n                                       [closeOnSelect]=\"true\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Interconnection Type:</label>\r\n                          <div class=\"form-group\">\r\n                            <ng-select #clearDrop [items]=\"lstInterconnection\"\r\n                                       placeholder=\"None\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"interconnectionType\"\r\n                                       [closeOnSelect]=\"true\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Number of Arrays:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Arrays\" formControlName=\"numberOfArrays\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Roof Material:</label>\r\n                          <div class=\"form-group\">\r\n                            <ng-select #clearDrop [items]=\"lstroofMaterial\"\r\n                                       placeholder=\"None\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"roofMaterial\"\r\n                                       [closeOnSelect]=\"true\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Roof Tilt:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Roof Tilt\" formControlName=\"roofTilt\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Mid Clamps:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Mid Clamps\" formControlName=\"midClamps\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>End Clamps:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter End Clamps\" formControlName=\"endClamps\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Grounding Lugs:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Grounding Lugs\" formControlName=\"groundingLugs\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>T-Bolts:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter T-Bolts\" formControlName=\"tBolts\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>End Covers:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter End Covers\" formControlName=\"endCovers\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Splice:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Splice\" formControlName=\"splice\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Flashings:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Flashings\" formControlName=\"flashings\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Rail:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Rail\" formControlName=\"rail\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Rail Weight:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Weight\" formControlName=\"railWeight\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Module Weight:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Module Weight\" formControlName=\"moduleWeight\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>PSF:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter PSF\" formControlName=\"pSF\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>Total Weight:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Total Weight\" formControlName=\"totalWeight\" (keypress)=\"numberOnly($event)\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>ENG First Review By:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"\" formControlName=\"eNGFirstReviewBy\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>ENG First Review Date:<span class=\"text-danger\"></span></label>\r\n                          <div class=\"form-group datepickerinpop\">\r\n                            <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" inputStyleClass=\"form-control start-date \" formControlName=\"eNGFirstReviewDate\"\r\n                                        inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\">\r\n\r\n                            </p-calendar>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>ENG Second Review By:</label>\r\n                          <div class=\"form-group\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"\" formControlName=\"eNGSecondReviewBy\">\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-lg-6\">\r\n                          <label>ENG Second Review Date:<span class=\"text-danger\"></span></label>\r\n                          <div class=\"form-group datepickerinpop\">\r\n                            <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" inputStyleClass=\"form-control start-date \" formControlName=\"eNGSecondReviewDate\"\r\n                                        inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\">\r\n\r\n                            </p-calendar>\r\n\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </form>\r\n                    <div class=\"modal-footer\" *ngIf=\"onSaveEngQuesBtn\">\r\n                      <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"onSaveEngQues()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n                    </div>\r\n                  </div>\r\n              \r\n                </div>\r\n              </div>\r\n              <!--=======================================================================================-->\r\n\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Notes</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"panelBodynine\" class=\"panel-collapse active show p-0 border-0\" data-parent=\"#accordion\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                     (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> New</a>\r\n                  <div id=\"notes\" class=\"panel-collapse collapse active show\">\r\n                    <app-newnoteslist #listnotesmodel subModuleName=\"workorder\" [AccountId]=\"accountId\" [ObjectRefId]=\"Id\" (newItemEvent)=\"addItem($event)\">\r\n\r\n                    </app-newnoteslist>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <!--<div class=\"panel active\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n          <span>Notes ({{NotesCount}}) </span>\r\n        </a>\r\n      </h4>\r\n    </div>\r\n\r\n\r\n    <div id=\"panelBodynine\" class=\"panel-collapse active show p-0 border-0\" data-parent=\"#accordion\">\r\n      <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n         (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> New</a>\r\n\r\n\r\n\r\n      <div id=\"notes\" class=\"panel-collapse collapse active show\">\r\n\r\n        <app-newnoteslist #listnotesmodel subModuleName=\"workorder\" [AccountId]=\"accountId\" [ObjectRefId]=\"Id\" (newItemEvent)=\"addItem($event)\">\r\n\r\n        </app-newnoteslist>\r\n\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n              <!--============================================================================================-->\r\n\r\n              <app-files title=\"Files\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{Id}}\"></app-files>\r\n              <!--=========================================================================================-->\r\n              <!--=================================== Work Order History ================================-->\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#workorderhistory\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Work Order History  ({{WorkOrderHistoryCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"workorderhistory\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstWorkOrderHistory.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstWorkOrderHistory.pager.totalItems\"\r\n                                     [offset]=\"lstWorkOrderHistory.pager.currentPage\"\r\n                                     [limit]=\"lstWorkOrderHistory.pager.pageSize\"\r\n                                     (page)='setWorkOrderHistoryPageNo($event)'\r\n                                     (sort)=\"onWorkOrderHistorySort($event)\">\r\n                        <ngx-datatable-column name=\"SFStatus\" prop=\"SFStatus\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Start Date\" prop=\"StartDateTime\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.StartDateTime | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"End Date\" prop=\"EndDateTime\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.EndDateTime | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Modified By\" prop=\"ModifiedBy\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.ModifiedBy }}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstWorkOrderHistory.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstWorkOrderHistory.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                              Showing {{(lstWorkOrderHistory.pager.currentPage - 1 )* lstWorkOrderHistory.pager.pageSize + 1}}  to {{lstWorkOrderHistory.pager.currentPage * lstWorkOrderHistory.pager.pageSize}} out of {{rowCount}}  enteries\r\n                            </div>\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"lstWorkOrderHistory.pager.currentPage\"\r\n                                             [size]=\"lstWorkOrderHistory.pager.pageSize\"\r\n                                             [count]=\"lstWorkOrderHistory.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstWorkOrderHistory.pager.pageSize) > 1)\"\r\n                                             (change)=\"setWorkOrderHistoryPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n\r\n                      <!--<a href=\"javascript:void(0);\" (click)=\"displaynotedetail(row)\">{{row.note_description | truncate : 50}}</a>-->\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!--=======================================================================================-->\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#serviceAppointments\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Service Appointments ({{ServiceAppointmentCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"serviceAppointments\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <!--<a href=\"javascript:void(0);\" class=\"btn-in-panel\" ><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Add</span></a>-->\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstServiceAppointments.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstServiceAppointments.pager.totalItems\"\r\n                                     [offset]=\"lstServiceAppointments.pager.currentPage\"\r\n                                     [limit]=\"lstServiceAppointments.pager.pageSize\"\r\n                                     (page)='setServiceAppointmentPageNo($event)'\r\n                                     (sort)=\"onServiceAppointmentSort($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Appointment Number\" prop=\"AppointmentNumber\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <a href=\"javascript:void(0);\" [routerLink]=\"['/serviceappointment/view',row.Id]\">{{row.AppointmentNumber}}</a>\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Subject\" prop=\"Subject\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <span class=\"text-white p-1 ml-1 rounded\" [style.background-color]=\"row.Status | split:'::':1 \">{{ row.Status | split:'::':0}}</span>\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Scheduled Start\" prop=\"StartDate\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.StartDate | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Scheduled End\" prop=\"EndDate\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.EndDate | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstServiceAppointments.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstServiceAppointments.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <!--<div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                    {{commonService.PageString(lstServiceAppointments.pager.currentPage,lstServiceAppointments.pager.pageSize,rowCount)}}\r\n                </div>-->\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"lstServiceAppointments.pager.currentPage\"\r\n                                             [size]=\"lstServiceAppointments.pager.pageSize\"\r\n                                             [count]=\"lstServiceAppointments.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstServiceAppointments.pager.pageSize) > 1)\"\r\n                                             (change)=\"setServiceAppointmentPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n\r\n                    </div>\r\n                    <div class=\"clearfix\"></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <!--=================================== Product Required ================================-->\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#ProductsRequired\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Products Required ({{ProductsRequiredCounts}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"ProductsRequired\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <a href=\"javascript:void(0);\" (click)=\"AddProductRequiredPopup()\" class=\"btn-in-panel\"><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Add</span></a>\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstProductsRequired.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstProductsRequired.pager.totalItems\"\r\n                                     [offset]=\"lstProductsRequired.pager.currentPage\"\r\n                                     [limit]=\"lstProductsRequired.pager.pageSize\"\r\n                                     (page)='setProductRequiredPageNo($event)'\r\n                                     (sort)=\"onProductRequiredSort($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Product Required Number\" prop=\"ProductRequiredNumber\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <a href=\"javascript:void(0);\" [routerLink]=\"['/manageproductrequired/viewProductRequired',row.Id]\">{{row.ProductRequiredNumber}}</a>\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Product Name\" prop=\"ProductName\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <a href=\"javascript:void(0);\" [routerLink]=\"['/product/viewproducts',row.ProductMasterId]\">{{row.ProductName}}</a>\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Description\" prop=\"Description\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Quantity Required\" prop=\"QuantityRequired\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div class=\"text-center\">\r\n                              <a href=\"javascript:void(0);\" (click)=\"EditProductREquired(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"deleteProductREquired(row,'appointment')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                            </div>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n\r\n\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstProductsRequired.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstProductsRequired.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <!--<div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                    {{commonService.PageString(lstProductsRequired.pager.currentPage,lstProductsRequired.pager.pageSize,rowCount)}}\r\n\r\n                </div>-->\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"lstProductsRequired.pager.currentPage\"\r\n                                             [size]=\"lstProductsRequired.pager.pageSize\"\r\n                                             [count]=\"lstProductsRequired.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstProductsRequired.pager.pageSize) > 1)\"\r\n                                             (change)=\"setProductRequiredPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n\r\n                    </div>\r\n                    <div class=\"clearfix\"></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!--=======================================================================================-->\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#oppurtunity\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Opportunity  ({{OpportunityCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"oppurtunity\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstOpportunity.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstOpportunity.pager.totalItems\"\r\n                                     [offset]=\"lstOpportunity.pager.currentPage\"\r\n                                     [limit]=\"lstOpportunity.pager.pageSize\"\r\n                                     (page)='setOpportunityPageNo($event)'\r\n                                     (sort)=\"onOpportunitySort($event)\">\r\n                        <ngx-datatable-column name=\"Opportunity Name\" prop=\"OpportunityName\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <a href=\"javascript:void(0);\" [routerLink]=\"['/opportunity/viewOpportunity',row.Id]\">{{row.OpportunityName}}</a>\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Account Name\" prop=\"AccountName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Close Date\" prop=\"CloseDate\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.CloseDate | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstOpportunity.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstOpportunity.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                            </div>\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"lstOpportunity.pager.currentPage\"\r\n                                             [size]=\"lstOpportunity.pager.pageSize\"\r\n                                             [count]=\"lstOpportunity.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstOpportunity.pager.pageSize) > 1)\"\r\n                                             (change)=\"setOpportunityPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                      <!--<a href=\"javascript:void(0);\" (click)=\"displaynotedetail(row)\">{{row.note_description | truncate : 50}}</a>-->\r\n\r\n\r\n                    </div>\r\n\r\n\r\n                  </div>\r\n\r\n\r\n                </div>\r\n\r\n\r\n              </div>\r\n\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n<!--===================================================== NotesPopupModel ========================================================-->\r\n<div class=\"modal fade in show\" bsModal #NotesPopupModel=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\" *ngIf=\"!isViewNote\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-header\" *ngIf=\"isViewNote\">\r\n        <h4 class=\"modal-title\">View NOTE</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeNotesPopupModelPopup()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:290px;\">\r\n        <form [formGroup]=\"addNoteForm\">\r\n          <div class=\"form-group\" *ngIf=\"!isViewNote\">\r\n            <div class=\"row mb-2\">\r\n              <div class=\"col-md-12 col-lg-12\">\r\n                <label>Note Title:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter Note Title\" formControlName=\"noteTitle\" maxlength=\"50\" [ngClass]=\"{'is-invalid': (noteTitle.invalid && (noteTitle.dirty || noteTitle.touched) && (noteTitle.errors?.required || noteTitle.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"noteTitle.invalid && (noteTitle.dirty || noteTitle.touched) && noteTitle.errors?.required\"\r\n                         class=\"text-danger\">Note Title is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row mb-2\">\r\n              <div class=\"col-md-12 col-lg-12\">\r\n                <label>Description:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <textarea rows=\"5\" class=\"form-control\" style=\"min-height:120px;\" placeholder=\"Enter Note Description\" formControlName=\"noteDescription\" #machineDescription maxlength=\"500\" [ngClass]=\"{'is-invalid': (noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && (noteDescription.errors?.required || noteDescription.errors?.maxlength)) }\"></textarea>\r\n                  <small *ngIf=\"noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && noteDescription.errors?.required\"\r\n                         style=\"color:red;\">Description is required</small>\r\n                  <small *ngIf=\"noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && noteDescription.errors?.maxlength\"\r\n                         style=\"color:red;\">Notes must be less than 500 characters.</small>\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\" *ngIf=\"isViewNote\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-4\">\r\n                <label><b>Note Title:</b></label>\r\n                <span>&nbsp;{{notesTitle}}</span>\r\n              </div>\r\n              <div class=\"col-md-12\">\r\n                <label class=\"m-0\"><b>Description:</b></label>\r\n                <span>&nbsp;{{notesDescription}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button *ngIf=\"!isViewNote\" type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveNote()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--===============================================================================================================================-->\r\n<!--===================================================== Fix Order Model========================================================-->\r\n<div class=\"modal fade in show\" bsModal #FixOrder=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeFixOrderPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; height:290px;\">\r\n        <form [formGroup]=\"addFixOrderForm\">\r\n          <div class=\"row mb-2\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Department<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstdepartment\" placeholder=\"Select Department\" formControlName=\"departmentId\"\r\n                           bindLabel=\"text\" bindValue=\"value\"\r\n                           [ngClass]=\"{'is-invalid': (departmentId.invalid && (departmentId.dirty || departmentId.touched) && departmentId.errors?.required)}\"></ng-select>\r\n                <small *ngIf=\"departmentId.invalid && (departmentId.dirty || departmentId.touched) && departmentId.errors?.required\"\r\n                       class=\"text-danger\">Please select Department</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Description:</label>\r\n              <div class=\"form-group\">\r\n                <textarea rows=\"5\" class=\"form-control\" style=\"min-height:120px;\" placeholder=\"Enter Description\" formControlName=\"fixOrderDescription\" #machineDescription maxlength=\"1000\"></textarea>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveFixOrder()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeFixOrderPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--===============================================================================================================================-->\r\n<!--===================================================== Update Status Model========================================================-->\r\n<div class=\"modal fade in show\" bsModal #UpdateStatus=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeUpdateStatusModal()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow-x:inherit;overflow-y:inherit;\">\r\n        <form [formGroup]=\"updateStatusForm\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Work Order Status<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstStatus\" placeholder=\"Select Work Order Status\" formControlName=\"statusId\"\r\n                           bindLabel=\"text\" bindValue=\"value\"\r\n                           [ngClass]=\"{'is-invalid': (statusId.invalid && (statusId.dirty || statusId.touched) && statusId.errors?.required)}\"></ng-select>\r\n                <small *ngIf=\"statusId.invalid && (statusId.dirty || statusId.touched) && statusId.errors?.required\"\r\n                       class=\"text-danger\">Please select Work Order Status</small>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"onSaveStatusClick()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeUpdateStatusModal()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loaderStatus\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n<!--===============================================================================================================================-->\r\n<!--===================================================== Add Update Product Required========================================================-->\r\n<div class=\"modal fade in show\" bsModal #ProductRequired=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{ProductRequiredTitle}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeProductRequiredModal()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow-x:inherit;overflow-y:inherit;\">\r\n        <form [formGroup]=\"addForm\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <!--<h4>if would like Enerflo to automatically find the best apt time based on availalility.</h4>-->\r\n              <div class=\"row col-12\">\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Parent Record:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"text\" [(ngModel)]=\"ParentRecord\" [disabled]=\"true\" class=\"form-control\" placeholder=\"Please enter Parent Record\" formControlName=\"ParentRecord\">\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Product Required:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"lstProductRequired\"\r\n                               placeholder=\"Select Product Required\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"ProductRequired\"\r\n                               [closeOnSelect]=\"true\"\r\n                               [ngClass]=\"{'is-invalid': (ProductRequired.invalid && (ProductRequired.dirty || ProductRequired.touched) && ProductRequired.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"ProductRequired.invalid && (ProductRequired.dirty || ProductRequired.touched) && ProductRequired.errors?.required\"\r\n                           style=\"color:red;\">Please select Product Required</small>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Quantity Required:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Please enter Parent Record\" formControlName=\"QuantityRequired\">\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Date Delivered:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group datepickerinpop\">\r\n                    <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" inputStyleClass=\"form-control start-date \"\r\n                                formControlName=\"DateDelivered\"\r\n                                hourFormat=\"{{timeFormat}}\"\r\n                                [showTime]=\"false\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Quantity Unit Of Measure:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"lstQuantityUnitOfMeasure\"\r\n                               placeholder=\"Select Quantity Unit Of Measure\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"QuantityUnitOfMeasure\"\r\n                               [closeOnSelect]=\"true\">\r\n                    </ng-select>\r\n                    <!--<small *ngIf=\"ProductRequired.invalid && (ProductRequired.dirty || ProductRequired.touched) && ProductRequired.errors?.required\"\r\n                    style=\"color:red;\">Please select Product Required</small>-->\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"onProductRequiredClick()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeProductRequiredModal()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n<!--==================================================== Audit popup ==============================================================-->\r\n<div bsModal #audit=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">CheckList Review</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeAudit()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"modal-body\" style=\"max-height: 600px; overflow:auto !important;\">\r\n\r\n        <div class=\"table-responsive no-padding mb-0\" *ngFor=\"let item of CheckListGroup; let auditIndex=index;\">\r\n          <h3 class=\"form-heading mt-4 mb-0\">  <span>{{item.AppointmentNumber}} - {{item.WorkTypeName}} / {{item.WorkOrderNumber}}</span></h3>\r\n          <table class=\"table table-hover table-dynamic mb-0\" style=\"min-width:300px;\">\r\n            <thead>\r\n              <tr>\r\n                <!--<th width=\"100\">Sr.No.</th>-->\r\n                <th>Name</th>\r\n                <th width=\"200\">Final Score</th>\r\n                <th width=\"150\">Is Excluded?</th>\r\n              </tr>\r\n            </thead>\r\n\r\n            <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n              <tbody>\r\n                <tr *ngIf=\"item.InnerData[0].Name != null\">\r\n                  <!--<td>{{inner.RowNum}}</td>-->\r\n                  <td>\r\n\r\n\r\n                    <a *ngIf=\"item.isExclude!=true\" href=\"javascript:void(0);\" (click)=\"auditChecklistDetail(inner.id,inner.ServiceAppointmentId, true)\">{{inner.Name}}</a>\r\n                    <a *ngIf=\"item.isExclude==true\">{{inner.Name}}</a>\r\n                  </td>\r\n                  <td>{{inner.FinalScoreCount}}/{{inner.QuestionCount}}</td>\r\n                  <td>\r\n                    <div class=\"d-inline-block align-middle m-0 ml-2\">\r\n                      <label class=\"switch m-0\">\r\n                        <input type=\"checkbox\" id={{inner.id}} [checked]=\"item.isExclude\" (click)=\"auditSwitchClicked($event,item.id,item.ServiceAppointmentId)\" disabled>\r\n                        <span class=\"slider round\">\r\n                          <span>Yes</span>\r\n                        </span>\r\n                      </label>\r\n                    </div>\r\n                  </td>\r\n                </tr>\r\n                <tr *ngIf=\"item.InnerData[0].Name == null\">\r\n                  <td colspan=\"3\" class=\"text-center\"><span class=\"text-center text-danger\">No data to display</span></td>\r\n                </tr>\r\n              </tbody>\r\n            </ng-container>\r\n          </table>\r\n        </div>\r\n\r\n\r\n        <div class=\"table-responsive no-padding mb-0\">\r\n          <table class=\"table table-hover table-dynamic mb-0\" style=\"min-width:300px;\">\r\n            <tr>\r\n              <td width=\"100\" class=\"border-0\"></td>\r\n              <td class=\"border-0\"></td>\r\n              <td width=\"200\" class=\"border-0\">\r\n                <span *ngFor=\"let items of auditData; let auditIndex=index;\">\r\n                  <span *ngIf=\"auditIndex==0 && items.OverallScoreText=='Pending'\" style=\"max-width:150px !important;\" class=\"status-box bg-warning text-dark p-2\">{{items.OverallScore}} <strong>({{items.OverallScoreText}})</strong></span>\r\n\r\n                  <span *ngIf=\"auditIndex==0 && items.OverallScoreText=='Fail'\" style=\"max-width:150px !important;\"\r\n                        class=\"status-box bg-danger p-2\">\r\n                    {{items.OverallScore}} <strong>({{items.OverallScoreText}})</strong>\r\n                  </span>\r\n\r\n                  <span *ngIf=\"auditIndex==0 && items.OverallScoreText=='Pass'\" style=\"max-width:150px !important;\"\r\n                        class=\"status-box bg-success p-2\">\r\n                    {{items.OverallScore}} <strong>({{items.OverallScoreText}})</strong>\r\n                  </span>\r\n                </span>\r\n              </td>\r\n            </tr>\r\n          </table>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeAudit()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--=======================================================================================================================================-->\r\n<!--======================================================== Audit Check List Popup =======================================================-->\r\n<div bsModal #auditCheckList=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{auditTitle}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeAuditCheckList()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div *ngIf=\"isModalShow\" class=\"modal-body\" style=\" margin-bottom:10px; max-height:600px;\">\r\n        <a href=\"javascript:;\" *ngIf=\"isScroll\" class=\"back-to-top\" (click)=\"ClickForScrollTop()\"><i class=\"fa fa-chevron-up\"></i></a>\r\n        <div class=\"w-100 bg-light p-2 mb-2\" id=\"l-of-sections\" [ngClass]=\"{'d-none':(this.isDisabled)}\">\r\n          <!--<h5><strong>List of Sections</strong></h5>-->\r\n          <ul style=\"list-style: none; max-height: 130px;    overflow: auto;\">\r\n            <li *ngFor=\"let section of SectionGroupTop;let j=index\" class=\"pb-2 w-50 d-inline-block\">\r\n              <a class=\"nav-link scrollto p-0 text-dark\" (click)=\"ClickForScroll(section.SECTION_ID)\" href=\"javascript:void(0);\" style=\"font-size:16px; line-height:24px;\">\r\n                <strong>{{j+1}}:</strong> {{section.SECTION_NAME}} - {{section | SectionNameWithScoreTop}}\r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n\r\n        <div class=\"max-hsc\">\r\n          <div id=\"section_{{section.SECTION_ID}}\" class=\"manage-color section_{{section.SECTION_ID}}\" *ngFor=\"let section of SectionGroup; let scIndex=index;\">\r\n            <div class=\"col-12 col-md-12 col-lg-12 p-0\" id=\"l-of-sections_ScrollingId\" style=\"margin: 0px; padding: 0px;\"><h3 class=\"form-heading ng-star-inserted ml-0 \" [ngClass]=\"{'mt-0':scIndex == 0 , 'mt-3':scIndex > 0}\"><span>{{section.SECTION_NAME}} :</span><strong [ngClass]=\"{'d-none':(this.isDisabled)}\" style=\" float: right; line-height: 40px; font-size: 16px; padding-right:10px;\">{{section | SectionNameWithScore}}</strong></h3></div>\r\n\r\n            <div class=\"row mng-number border align-items-stretch mx-0 mb-1\" *ngFor=\"let ques of section.Question ; let quesIndex=index;\">\r\n              <div class=\"col-lg-2 bg-numbr1 p-3 text-center d-flex align-items-center\" style=\"background: #dcf1ff;\">\r\n                <h2 class=\"w-100\">{{quesIndex+1}}</h2>\r\n              </div>\r\n              <div class=\"col-lg-10 p-3 d-flex align-items-center\">\r\n                <div class=\"w-100\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-12\">\r\n                      <label *ngIf=\"ques.SubQuestions\" style=\"font-size: 17px;\"><b>{{ques.QUESTION}}</b></label>\r\n                      <div class=\"w-100 d-flex flex-wrap\">\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-12\" *ngIf='ques.SubQuestions;else elseblock'>\r\n                      <ng-container *ngFor=\"let subques of ques.SubQuestions ;let k=index;\">\r\n                        <label *ngIf=\"k==0\" [ngClass]=\"{'d-none':subques.VISIBLE_TO != 'Auditor'}\"><b>Audit Result:</b></label>\r\n                        <div class=\"fulwith-radio-n-check  mb-4\">\r\n                          <div class=\"w-100 d-flex align-content-center align-items-center\">\r\n                            <div class=\"clearfix\"></div>\r\n                            <label class=\"text-capitalize mr-auto\" [ngClass]=\"{'after-none':subques.VISIBLE_TO != 'Auditor'}\" style=\"font-weight:700\">{{subques.QUESTION}}</label>\r\n                          </div>\r\n                          <div class=\"w-100 mb-2 d-flex flex-wrap align-content-center align-items-center pl-1\">\r\n                            <div class=\"w-100\" style=\"border-left: 5px solid #41b2f9; padding-left: 10px;\">\r\n                              <div class=\"w-100 mb-2\" *ngIf=\"subques.Answers\"><span *ngIf=\"subques.Answers[0].ANSWER\">Answer: {{subques.Answers[0].ANSWER}} </span></div>\r\n                              <div class=\"w-100 mb-2\" *ngIf=\"subques.Answers\"><span *ngIf=\"subques.Answers[0].ANSWER_GIVEN_BY\"><em>Created By: {{subques.Answers[0].ANSWER_GIVEN_BY}}</em></span></div>\r\n                              <div *ngIf=\"checkListType == 'photochecklist' && subques.Answers\" class=\"w-100 mb-2\">\r\n                                <div *ngIf=\"subques.Answers[0].Attachments;else elseBlock\">\r\n                                  <img *ngFor=\"let att of subques.Answers[0].Attachments;let attachmentIndex=index;\" loading=\"lazy\" src=\"{{att.FileUrl}}\" class=\"img-fluid\" (click)=\"open(subques.Answers[0].Attachments, attachmentIndex)\" style=\" height: 50px; width: 50px; border-radius: 2px; margin-right: 5px;  cursor: zoom-in\">\r\n                                </div>\r\n                                <ng-template #elseBlock>\r\n                                  <span>No images found.</span>\r\n                                </ng-template>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"w-100 mb-4 mt-4 p-2\" style=\"background:#f1f1f1\" [ngClass]=\"{'d-none':(this.isDisabled)}\">\r\n                            <div class=\"w-100\">\r\n                              <label class=\"d-block\"><b>Is provided information correct?</b></label>\r\n                              <div class=\"form-group\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                                    <input type=\"radio\" id=\"subquesradio{{scIndex}}{{quesIndex}}{{k}}Y\" value=\"1\" name=\"subques{{scIndex}}{{quesIndex}}{{k}}\" [(ngModel)]=\"subques.IsCorrect\" [checked]=\"subques.IsCorrect == '1'\" (ngModelChange)=\"onRadioChange()\">\r\n                                    <label for=\"subquesradio{{scIndex}}{{quesIndex}}{{k}}Y\" class=\"radio-label\">Yes</label>\r\n                                  </div>\r\n                                  <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                                    <input type=\"radio\" id=\"subquesradio{{scIndex}}{{quesIndex}}{{k}}N\" value=\"0\" name=\"subques{{scIndex}}{{quesIndex}}{{k}}\" [(ngModel)]=\"subques.IsCorrect\" [checked]=\"subques.IsCorrect == '0'\" (ngModelChange)=\"onRadioChange()\">\r\n                                    <label for=\"subquesradio{{scIndex}}{{quesIndex}}{{k}}N\" class=\"radio-label\">No</label>\r\n                                  </div>\r\n                                  <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                                    <input type=\"radio\" id=\"subquesradio{{scIndex}}{{quesIndex}}{{k}}NS\" value=\"\" name=\"subques{{scIndex}}{{quesIndex}}{{k}}\" [(ngModel)]=\"subques.IsCorrect\" [checked]=\"!subques.IsCorrect\" (ngModelChange)=\"onRadioChange()\">\r\n                                    <label for=\"subquesradio{{scIndex}}{{quesIndex}}{{k}}NS\" class=\"radio-label\">No Score</label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"w-100\">\r\n                              <label><b>Auditor Comment:</b></label>\r\n                              <div class=\"form-group mb-0\">\r\n                                <textarea class=\"form-control audit-textarea\" [(ngModel)]='subques.Comment' style=\"margin-bottom: 18px;\"></textarea>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                          <div>\r\n                          </div>\r\n                        </div>\r\n                      </ng-container>\r\n                    </div>\r\n                    <ng-template #elseblock>\r\n                      <div class=\"col-lg-12\">\r\n                        <div class=\"fulwith-radio-n-check  mb-4\">\r\n                          <div class=\"w-100 d-flex align-content-center align-items-center\">\r\n                            <div class=\"clearfix\"></div>\r\n                            <label class=\"text-capitalize mr-auto\" [ngClass]=\"{'after-none':ques.VISIBLE_TO != 'Auditor'}\" style=\"font-weight:700\">{{ques.QUESTION}}</label>\r\n                          </div>\r\n                          <div class=\"w-100 mb-2 d-flex flex-wrap align-content-center align-items-center pl-1\">\r\n                            <div class=\"w-100\" style=\"border-left: 5px solid #41b2f9; padding-left: 10px;\">\r\n                              <div class=\"w-100 mb-2\" *ngIf=\"ques.Answers\">Answer: {{ques.Answers[0].ANSWER}}</div>\r\n                              <div class=\"w-100 mb-2\" *ngIf=\"ques.Answers\"><em>Created By: {{ques.Answers[0].ANSWER_GIVEN_BY}}</em></div>\r\n                              <div *ngIf=\"checkListType == 'photochecklist'\" class=\"w-100 mb-2\">\r\n                                <div *ngIf=\"ques.Answers;else elseBlock\">\r\n                                  <img *ngFor=\"let att of ques.Answers[0].Attachments;let attachmentIndex=index;\" src=\"{{att.FileUrl}}\" loading=\"lazy\" class=\"img-fluid\" (click)=\"open(ques.Answers[0].Attachments, attachmentIndex)\" style=\" height: 50px; width: 50px; border-radius: 2px; margin-right: 5px;  cursor: zoom-in\">\r\n                                </div>\r\n                                <ng-template #elseBlock>\r\n                                  <span>No images found.</span>\r\n                                </ng-template>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"w-100 mb-4 mt-4 p-2\" style=\"background:#f1f1f1\" [ngClass]=\"{'d-none':(this.isDisabled)}\">\r\n                            <div class=\"w-100\">\r\n                              <label class=\"d-block\"><b>Is provided information correct?</b></label>\r\n                              <div class=\"form-group\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                                    <input type=\"radio\" id=\"quesradio{{scIndex}}{{quesIndex}}Y\" value=\"1\" name=\"ques{{scIndex}}{{quesIndex}}\" [(ngModel)]=\"ques.AuComments[0].IsCorrect\" [checked]=\"ques.AuComments[0].IsCorrect == '1'\" (ngModelChange)=\"onRadioChange()\">\r\n                                    <label for=\"quesradio{{scIndex}}{{quesIndex}}Y\" class=\"radio-label\">Yes</label>\r\n                                  </div>\r\n                                  <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                                    <input type=\"radio\" id=\"quesradio{{scIndex}}{{quesIndex}}N\" value=\"0\" name=\"ques{{scIndex}}{{quesIndex}}\" [(ngModel)]=\"ques.AuComments[0].IsCorrect\" [checked]=\"ques.AuComments[0].IsCorrect == '0'\" (ngModelChange)=\"onRadioChange()\">\r\n                                    <label for=\"quesradio{{scIndex}}{{quesIndex}}N\" class=\"radio-label\">No</label>\r\n                                  </div>\r\n                                  <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                                    <input type=\"radio\" id=\"quesradio{{scIndex}}{{quesIndex}}NS\" value=\"\" name=\"ques{{scIndex}}{{quesIndex}}\" [(ngModel)]=\"ques.AuComments[0].IsCorrect\" [checked]=\"!ques.AuComments[0].IsCorrect\" (ngModelChange)=\"onRadioChange()\">\r\n                                    <label for=\"quesradio{{scIndex}}{{quesIndex}}NS\" class=\"radio-label\">No Score</label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"w-100\">\r\n                              <label><b>Auditor Comment:</b></label>\r\n                              <div class=\"form-group mb-0\">\r\n                                <textarea class=\"form-control audit-textarea\" [(ngModel)]='ques.AuComments[0].Comment' style=\"margin-bottom: 18px;\"></textarea>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                          <div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </ng-template>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <a class=\"btn btn-success text-white\" [ngClass]=\"{'d-none':(this.isDisabled)}\" (click)=\"onSubmitAuditCheckList()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n        <button type=\"submit\" [ngClass]=\"{'d-none':(this.isDisabled)}\" class=\"btn btn-danger text-white\" (click)=\"closeAuditCheckList()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n        <a href=\"javascript:;\" class=\"btn btn-dark text-white\" (click)=\"closeAuditCheckList()\"><i class=\"fa fa-arrow-left\"></i> Back</a>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n</div>\r\n<!--=======================================================================================================================================-->\r\n\r\n<div bsModal #notesDetailModal=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Message</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeNote(dataNoti.noteId)\">&times;</button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px;\">\r\n        <div class=\"col-md-12\" *ngIf=\"dataNoti\">\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group row\">\r\n                <label for=\"staticEmail\" class=\"col-sm-3 col-form-label font-weight-bold\">Sender:</label>\r\n                <div class=\"col-sm-9\">\r\n                  <p class=\"form-control-plaintext text-left\" id=\"staticEmail\">{{dataNoti.senderName}}</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group row\">\r\n                <label for=\"staticEmail\" class=\"col-sm-5 col-form-label font-weight-bold\">Received On:</label>\r\n                <div class=\"col-sm-7\">\r\n                  <p class=\"form-control-plaintext text-left\" id=\"staticEmail\">{{dataNoti.CreatedOn | utcdatetimetolocal}}</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group row\">\r\n                <label for=\"staticEmail\" class=\"col-sm-3 col-form-label font-weight-bold\">Subject:</label>\r\n                <div class=\"col-sm-9\">\r\n                  <p class=\"form-control-plaintext text-left\" id=\"staticEmail\">{{dataNoti.title}}</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group row\">\r\n                <label for=\"staticEmail\" class=\"col-sm-5 col-form-label font-weight-bold\">Status:</label>\r\n                <div class=\"col-sm-7\">\r\n\r\n                  <p class=\"form-control-plaintext text-left\" id=\"staticEmail\">\r\n                    {{dataNoti.Status}}\r\n                    <span class=\"badge badge-warning\">Unread</span>\r\n                    <!--<ng-template #IsUnread>\r\n                      <span class=\"badge badge-success\">Read</span>\r\n                    </ng-template>-->\r\n                  </p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-12\">\r\n              <div class=\"form-group row\">\r\n                <label for=\"staticEmail\" class=\"col-sm-12 col-form-label font-weight-bold\">Message:</label>\r\n                <div class=\"col-sm-12\">\r\n                  <p class=\"form-control-plaintext text-left\" [innerHTML]=\"dataNoti.description\"></p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeNote(dataNoti.noteId)\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i>Close</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/workorder/workorder.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/workorder/workorder.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\">\r\n    <strong>Manage Work Order</strong>\r\n    <p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p>\r\n  </h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Work Order</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-7 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield \">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Work Order No\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n\r\n                <div class=\"col-md-8 float-left pl-3 pl-lg-0\">\r\n                  <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                  <a class=\"btn btn-danger form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                  <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n                  <div class=\"d-inline-block align-middle pl-3\">\r\n                    <label class=\"d-inline-block\"><b>Search in all records</b></label>\r\n                    <div class=\"form-group d-inline-block align-middle m-0 ml-2\">\r\n                      <label class=\"switch m-0\">\r\n                        <input type=\"checkbox\" id=\"allRecords\" [checked]=\"myCheckbox\" (click)=\"switchClicked($event)\">\r\n                        <span class=\"slider round\">\r\n                          <span>Yes</span>\r\n                        </span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n        \r\n\r\n\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-5\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0\">\r\n                <ng-select [items]=\"pagedData.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i> </span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/workorder/add\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add WorkOrder\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rowHeight]=\"40\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [scrollbarH]=\"true\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\" [maxWidth]=\"2000\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'Subject' || col.COLUMN_NAME == 'WorkOrderNumber'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/workorder/view',row.id]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'AccountId'\">\r\n                <a *ngIf=\"row.AccountIdValue\" class=\" view-list\" [routerLink]=\"['/accountslist/view',row.AccountIdValue]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n                <a *ngIf=\"!row.AccountIdValue\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'Subject' && col.COLUMN_NAME != 'WorkOrderNumber' && col.COLUMN_NAME!= 'AccountId'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal:'Date'\" *ngIf=\"col.DT_CODE=='date'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal:'Date') : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\" *ngIf=\"col.DT_CODE=='datetime'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.DATA_TYPE!='bit' && col.FieldType != 'select' && col.COLUMN_NAME !='Email'\">\r\n                  {{row[col.COLUMN_NAME]}}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.COLUMN_NAME=='Email'\">\r\n                  {{row[col.COLUMN_NAME] }}\r\n                </div>\r\n                <!--<div *ngIf=\"col.FieldType == 'select'\">\r\n    <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n      {{row[col.COLUMN_NAME] }}\r\n    </div>\r\n    <div *ngIf=\"col.FieldFrom==null\">\r\n      <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n        <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n          {{itemColorCode.color}}\r\n        </div>\r\n        <div *ngIf=\"itemColorCode.colorkey!=undefined\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n          {{itemColorCode.color}}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n\r\n                <div *ngIf=\"col.FieldType == 'select'\">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                  <div *ngIf=\"col.FieldFrom==null\">\r\n                    <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                      <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                      <div *ngIf=\"itemColorCode.colorkey!=undefined\" style=\"max-width:150px !important;\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.id\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.id}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n\r\n                    <a class=\"actions-onclick view-list\" [routerLink]=\"['/workorder/view',row.id]\" href=\"javascript:void(0);\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>\r\n                    <!--<a *ngIf=\"row.Status=='Completed::#5c914c' \" class=\"actions-onclick view-list\" (click)=\"auditpopup(row.id,false)\" href=\"javascript:void(0);\"\r\n                       title=\"Audit\"><i class=\"fa fa-list-ul text-primary mr-2\"></i></a>-->\r\n\r\n\r\n                    <a *ngIf='isUpdate' class=\"actions-onclick view-list\" [routerLink]=\"['/workorder/edit',row.id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\"\r\n                               [closeOnSelect]=\"true\" bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--==================================================== Audit popup ==============================================================-->\r\n\r\n<div bsModal #audit=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Audit Review</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeAudit()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px;\">\r\n        <div class=\"table-responsive no-padding mb-0\" style=\"max-height: 320px; overflow:auto !important;\">\r\n          <table class=\"table table-hover table-dynamic mb-0\" style=\"min-width:300px;\">\r\n            <thead>\r\n              <tr>\r\n                <th width=\"100\">Sr.No.</th>\r\n                <th>Name</th>\r\n                <th width=\"200\">Final Score</th>\r\n                <th width=\"150\">Is Excluded?</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let item of auditData; let auditIndex=index;\">\r\n                <td>{{item.RowNum}}</td>\r\n                <td>\r\n                  <a *ngIf=\"item.isExclude!=true\" href=\"javascript:void(0);\" (click)=\"auditChecklistDetail(item.id,item.ServiceAppointmentId,this.isDisabled)\">{{item.Name}}</a>\r\n                  <a *ngIf=\"item.isExclude==true\">{{item.Name}}</a>\r\n                </td>\r\n                <td>{{item.FinalScoreCount}}/{{item.QuestionCount}}</td>\r\n                <td>\r\n                  <div class=\"d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <input type=\"checkbox\" id={{item.id}} [checked]=\"item.isExclude\" [attr.disabled]=\"isDisabled ? true : null\" (click)=\"auditSwitchClicked($event,item.id,item.ServiceAppointmentId)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr *ngIf=\"auditData == null\">\r\n                <td colspan=\"3\" class=\"text-center\"><span class=\"text-center text-danger\">No data to display</span></td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <!--<div *ngFor=\"let item of auditData; let auditIndex=index;\">\r\n            <div class=\"col-md-12 step-default border p-2 mb-2 rounded\" *ngIf=\"auditIndex==0\">\r\n              <h6 class=\"m-0\">{{item.OverallScore}} <b>({{item.OverallScoreText}})</b></h6>\r\n            </div>\r\n          </div>-->\r\n        </div>\r\n        <div class=\"table-responsive no-padding mb-0\">\r\n          <table class=\"table table-hover table-dynamic mb-0\" style=\"min-width:300px;\">\r\n            <tr>\r\n              <td width=\"100\" class=\"border-0\"></td>\r\n              <td class=\"border-0\"></td>\r\n              <td width=\"200\" class=\"border-0\">\r\n                <span *ngFor=\"let items of auditData; let auditIndex=index;\">\r\n                  <span *ngIf=\"auditIndex==0 && items.OverallScoreText=='Pending'\" style=\"max-width:150px !important;\" class=\"status-box bg-warning text-dark p-2\">{{items.OverallScore}} <strong>({{items.OverallScoreText}})</strong></span>\r\n\r\n                  <span *ngIf=\"auditIndex==0 && items.OverallScoreText=='Fail'\" style=\"max-width:150px !important;\"\r\n                        class=\"status-box bg-danger p-2\">\r\n                    {{items.OverallScore}} <strong>({{items.OverallScoreText}})</strong>\r\n                  </span>\r\n\r\n                  <span *ngIf=\"auditIndex==0 && items.OverallScoreText=='Pass'\" style=\"max-width:150px !important;\"\r\n                        class=\"status-box bg-success p-2\">\r\n                    {{items.OverallScore}} <strong>({{items.OverallScoreText}})</strong>\r\n                  </span>\r\n                </span>\r\n              </td>\r\n            </tr>\r\n          </table>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeAudit()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--==============================================================================================================================-->\r\n\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"crm\" subModuleName=\"workorder\"></app-searchfilteradd>\r\n<app-manageviewnew (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"crm\" subModuleName=\"workorder\"></app-manageviewnew>\r\n\r\n");

/***/ }),

/***/ "./src/app/views/workorder/manageworkorder.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/views/workorder/manageworkorder.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".disabledddl {\n  opacity: 0.4;\n  pointer-events: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3Mvd29ya29yZGVyL0Q6XFxQcmluY2UgU2luZ2hcXHdvcmtzcGFjZVxcU29sZ2VuT25lXFxMYWhvcmUxXFxTb2xnZW5cXHNvbGdlbi5wb3J0YWxcXENsaWVudEFwcC9zcmNcXGFwcFxcdmlld3NcXHdvcmtvcmRlclxcbWFuYWdld29ya29yZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLG9CQUFvQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvdmlld3Mvd29ya29yZGVyL21hbmFnZXdvcmtvcmRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kaXNhYmxlZGRkbCB7XHJcbiAgb3BhY2l0eTogMC40O1xyXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/views/workorder/manageworkorder.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/workorder/manageworkorder.component.ts ***!
  \**************************************************************/
/*! exports provided: ManageworkorderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageworkorderComponent", function() { return ManageworkorderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _workorderservice_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./workorderservice.service */ "./src/app/views/workorder/workorderservice.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
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








var ManageworkorderComponent = /** @class */ (function () {
    function ManageworkorderComponent(fb, workOrderService, router, toaster, route, commonService, location) {
        var _this = this;
        this.fb = fb;
        this.workOrderService = workOrderService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.location = location;
        this.config = [];
        this.moduleName = 'crm';
        this.submoduleName = 'workorder';
        this.loadSave = false;
        this.WorkOrderId = '';
        this.isLead = false;
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _workorderservice_service__WEBPACK_IMPORTED_MODULE_5__["JsonData"]();
        //modulePermission: ModuleList;
        this.modulePermission = [];
        this.displayType = 'ADD';
        this.isUpdate = false;
        this.isDelete = false;
        this.isAdd = false;
        this.len = 10;
        this.timeFormat = '12';
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
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'WORKORDERADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'WORKORDERUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'WORKORDERDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
    }
    ManageworkorderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addOrUpdatePermission = false;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.loadSave = true;
            if (id) {
                _this.WorkOrderId = id;
                _this.isLead = true;
                _this.pageTitle = 'Edit Work Order';
                _this.displayType = 'EDIT';
                _this.addOrUpdatePermission = _this.isUpdate;
            }
            else {
                _this.WorkOrderId = '';
                _this.displayType = 'ADD';
                _this.pageTitle = 'Add Work Order';
                _this.addOrUpdatePermission = _this.isAdd;
            }
        });
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.WorkOrderId, this.displayType).subscribe(function (resp) {
            if (resp) {
                _this.customCompnentValues = resp.data;
                console.log("this.customCompnentValues", _this.customCompnentValues);
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _workorderservice_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
                data_type_name: Text;
                var convertdatetime_1 = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_7__["DateTimeToLocalForAddEditPipe"]();
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
                    if (cnt.ColumnName == 'Status') {
                        debugger;
                        _this.prevStatusCodeId = cnt.ref_value;
                        _this.StatusControlname = cnt.form_controlName;
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
        this.timeFormat = this.commonService.getTimeFormat();
    };
    ManageworkorderComponent.prototype.checkvalue = function (formvalues, selval) {
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
    ManageworkorderComponent.prototype.test = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    ManageworkorderComponent.prototype.OnCheck = function () {
    };
    ManageworkorderComponent.prototype.onSubmit = function () {
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
        if (this.form.valid) {
            this.loadSave = true;
            this.JsonData.Id = this.WorkOrderId;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            this.JsonData.companyId = this.companyId;
            this.JsonData.userId = this.userId;
            console.log("this.form.value", this.form.value);
            debugger;
            var NewStatusId_1 = this.form.get(this.StatusControlname).value;
            var _formData = this.form.value;
            console.log("_formData", _formData);
            for (var index in _formData) {
                var data = _formData[index];
                if (data) {
                    if (Date.prototype.isPrototypeOf(data)) {
                        _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
                    }
                }
            }
            this.JsonData.FormJsonData = JSON.stringify(this.form.value);
            this.workOrderService.manageWorkOrder(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.loadSave = false;
                    _this.location.back();
                    if (_this.prevStatusCodeId != NewStatusId_1) {
                        var model = new _workorderservice_service__WEBPACK_IMPORTED_MODULE_5__["StartWorkOrderModel"];
                        model.workOrderId = _this.WorkOrderId;
                        model.statusId = NewStatusId_1;
                        model.moduleName = _this.moduleName;
                        model.submoduleName = _this.submoduleName;
                        debugger;
                        _this.workOrderService.updateStatusOrCreateLog(model).subscribe(function (result) {
                        }, function (error) {
                        }, function () {
                        });
                    }
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
    ManageworkorderComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
    };
    ManageworkorderComponent.prototype.close = function () {
        this.location.back();
    };
    ManageworkorderComponent.prototype.MakeArray = function (value, type) {
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
    ManageworkorderComponent.prototype.MakeNormalArray = function (value) {
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
    ManageworkorderComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
        }
        return array;
    };
    ManageworkorderComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        var checkboxdatanew = new _workorderservice_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
    ManageworkorderComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    ManageworkorderComponent.prototype.fetchMore = function (dataList, j) {
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
    ManageworkorderComponent.prototype.onKey = function (e, dataList, j) {
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
    ManageworkorderComponent.prototype.onClearLang = function (dataList, j) {
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
    ManageworkorderComponent.prototype.getreturnNumber = function (x, y) {
        return x + y;
    };
    ManageworkorderComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _workorderservice_service__WEBPACK_IMPORTED_MODULE_5__["WorkorderService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"] }
    ]; };
    ManageworkorderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manageworkorder',
            template: __importDefault(__webpack_require__(/*! raw-loader!./manageworkorder.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/workorder/manageworkorder.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./manageworkorder.component.scss */ "./src/app/views/workorder/manageworkorder.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _workorderservice_service__WEBPACK_IMPORTED_MODULE_5__["WorkorderService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"]])
    ], ManageworkorderComponent);
    return ManageworkorderComponent;
}());



/***/ }),

/***/ "./src/app/views/workorder/viewworkorder.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/views/workorder/viewworkorder.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmtvcmRlci92aWV3d29ya29yZGVyLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/workorder/viewworkorder.component.ts":
/*!************************************************************!*\
  !*** ./src/app/views/workorder/viewworkorder.component.ts ***!
  \************************************************************/
/*! exports provided: ViewworkorderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewworkorderComponent", function() { return ViewworkorderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _workorderservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workorderservice.service */ "./src/app/views/workorder/workorderservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/new-notes/newnoteslist.component */ "./src/app/views/shared/new-notes/newnoteslist.component.ts");
/* harmony import */ var ngx_lightbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-lightbox */ "./node_modules/ngx-lightbox/index.js");
/* harmony import */ var ngx_lightbox__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ngx_lightbox__WEBPACK_IMPORTED_MODULE_11__);
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












var ViewworkorderComponent = /** @class */ (function () {
    function ViewworkorderComponent(dialogService, leadservice, workOrderService, commonService, fb, router, toaster, route, location, _lightbox, _lightboxConfig) {
        var _this = this;
        this.dialogService = dialogService;
        this.leadservice = leadservice;
        this.workOrderService = workOrderService;
        this.commonService = commonService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.location = location;
        this._lightbox = _lightbox;
        this._lightboxConfig = _lightboxConfig;
        this.buttonState = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.countChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.moduleName = 'crm';
        this.submoduleName = 'workorder';
        this.formControlList = [];
        this.NotificationListData = [];
        this.appmodel = new _workorderservice_service__WEBPACK_IMPORTED_MODULE_2__["addeditProductRequired"]();
        this.addeditEngQuesModel = new _workorderservice_service__WEBPACK_IMPORTED_MODULE_2__["addeditEngineeringQuestionModel"]();
        this.loadSave = false;
        this.displayType = 'VIEW';
        this.NotespagedDataCardView = {
            pager: {},
            data: []
        };
        this.lstServiceAppointments = {
            pager: {},
            data: []
        };
        this.lstOpportunity = {
            pager: {},
            data: []
        };
        this.lstProductsRequired = {
            pager: {},
            data: []
        };
        this.filePageNo = 1;
        this.ServiceAppointmentPageNo = 1;
        this.OpportunityPageNo = 1;
        this.WorkOrderSubject = '-';
        this.ServiceAppointmentCount = 0;
        this.ProductsRequiredCounts = 0;
        this.productRequiredWorkOrderNumber = '';
        this.ProductRequiredPageNo = 1;
        this.OpportunityCount = 0;
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.sortColumnlineitem = 'LineItemNumber';
        this.pageSize = 4;
        this.isViewNote = false;
        this.lstStatus = [];
        this.status = '';
        this.customFieldId = '';
        this.loaderStatus = false;
        this.WorkOrderHistoryCount = 0;
        this.WorkOrderHistoryPageNo = 1;
        this.lstWorkOrderHistory = {
            pager: {},
            data: []
        };
        this.isStartWork = false;
        this.isCompleteWork = false;
        this.IsAuditCheckListDisplay = false;
        this.CheckListGroup = [];
        this.SectionGroup = [];
        this.SectionGroupTop = [];
        this.cardTitle = '';
        //accountId: any;
        //CheckListGroup: any[] = [];
        //SectionGroup: any[] = [];
        //SectionGroupTop: any[] = [];
        this.lstEngineeringQuestion = {
            pager: {},
            data: []
        };
        this.iSEngineeringQues = false;
        this.onSaveEngQuesBtn = false;
        this.checkboxdata1 = [];
        this.checkboxdataTop = [];
        this.pageSizeValuenotes = 4;
        this.NotespagedData = {
            pager: {},
            data: []
        };
        this.NotesCount = 0;
        this.ProductRequiredTitle = '';
        this.notemodel = new _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__["noteModel"]();
        this.fixOrdermodel = new _workorderservice_service__WEBPACK_IMPORTED_MODULE_2__["fixOrderModel"]();
        this.submoduleid = 234;
        this.objectname = 'workorder';
        //sortDir = 'desc';
        //sortColumn = 'createdon';
        this.currentPageNotes = 1;
        this.isEdit = false;
        this.isModalShow = false;
        this.isScroll = false;
        this.LineItemPageno = 1;
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
        this.addFixOrderForm = this.fb.group({
            fixOrderID: [null],
            departmentId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fixOrderDescription: [null]
        });
        //-------------------workorder status update start here-------------
        this.updateStatusForm = this.fb.group({
            statusId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
        this.ActualauditCheckListData = [];
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.commonService.getMasterItemsList("department").subscribe(function (result) {
            _this.lstdepartment = _this.commonService.masters;
        });
    }
    ViewworkorderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadSave = true;
        this.siteurl = window.location.origin;
        console.log('siteurl', this.siteurl);
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.Id = id;
        });
        this.GetCustomFieldsList();
        this.GetCustomFieldsListTopRow();
        this.getNoteslistCardView();
        setTimeout(function () { _this.loadSave = false; }, 5000);
    };
    ViewworkorderComponent.prototype.close = function () {
        this.router.navigateByUrl("/workorder");
    };
    ViewworkorderComponent.prototype.getRelatedTabData = function () {
        this.GetServiceAppointmentList();
        this.GetOpportunityList();
        this.getNoteslist();
        this.GetWorkOrderLineItemList();
        this.GetWorkOrderHistoryList();
        this.GetProductRequiredList();
        this.initForm();
        this.initEngineeringForm();
        this.GetEngineeringQuestionData();
        //=======Disabled Engineering Questions Fields========
        this.addEditEngineeringForm.disable();
        this.onSaveEngQuesBtn = false;
        //====================================================
    };
    ViewworkorderComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        this.displayType = 'VIEW';
        this.loadSave = true;
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (resp) {
            if (resp) {
                _this.customCompnentValues = resp.data;
                console.log("this.customCompnentValues", _this.customCompnentValues);
                debugger;
                _this.formControlList = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _workorderservice_service__WEBPACK_IMPORTED_MODULE_2__["CheckboxData"]();
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
                    if (cnt.ColumnName == 'Status') {
                        _this.status = cnt.value;
                        _this.customFieldId = cnt.custom_field_id;
                        _this.statusids = cnt.ref_value;
                        _this.statusValue = cnt.value;
                        if (_this.statusValue == 'New::#096880') {
                            _this.isStartWork = true;
                        }
                        if (_this.statusValue == 'Completed::#5c914c') {
                            _this.isCompleteWork = true;
                        }
                    }
                    if (cnt.ColumnName == 'WorkOrderNumber') {
                        _this.productRequiredWorkOrderNumber = cnt.value;
                    }
                    if (cnt.ColumnName == 'WorkTypeId' && cnt.value == 'Engineering') {
                        _this.iSEngineeringQues = true;
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
            setTimeout(function () { _this.loadSave = false; }, 5000);
        }, function () {
            _this.getRelatedTabData();
            //======Engineering Question Fields binding=================
            _this.GetlstMPU();
            _this.GetlstTrenching();
            _this.GetlstRetrofitNeeded();
            _this.GetlstInterconnection();
            _this.GetlstroofMaterial();
            _this.customCompnentValues.forEach(function (cnt) {
                var val = null;
                if (cnt.name == 'MPU_Needed__c') {
                    debugger;
                    _this.mpuNeeded.setValue(cnt.ref_value);
                }
                if (cnt.name == 'Trenching_Needed__c') {
                    _this.trenchingNeeded.setValue(cnt.ref_value);
                }
                if (cnt.name == 'Retrofit_Needed__c') {
                    _this.retrofitNeeded.setValue(cnt.ref_value);
                }
                if (cnt.name == 'intrconnection_Type__c') {
                    _this.interconnectionType.setValue(cnt.ref_value);
                }
                if (cnt.name == 'ENG_First_Review_By') {
                    _this.eNGFirstReviewBy.setValue(cnt.value);
                }
                if (cnt.name == 'ENG_First_Review_Date') {
                    _this.eNGFirstReviewDate.setValue(new Date(cnt.value));
                }
                if (cnt.name == 'ENG_Second_Review_By') {
                    _this.eNGSecondReviewBy.setValue(cnt.value);
                }
                if (cnt.name == 'ENG_Second_Review_Date') {
                    _this.eNGSecondReviewDate.setValue(new Date(cnt.value));
                }
            });
            //=============================================================
            setTimeout(function () { _this.loadSave = false; }, 5000);
        });
    };
    ViewworkorderComponent.prototype.GetCustomFieldsListTopRow = function () {
        var _this = this;
        this.displayType = 'VIEW_TOP';
        this.loadSave = true;
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (resp) {
            if (resp) {
                _this.customCompnentValuesTop = resp.data;
                console.log("this.customCompnentValuesTop", _this.customCompnentValuesTop);
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
                    if (cnt.ColumnName == 'Subject') {
                        _this.WorkOrderSubject = cnt.value;
                    }
                    if (cnt.ColumnName == 'AccountId') {
                        _this.accountId = cnt.ref_value;
                    }
                    if (cnt.dt_code == 'select') {
                        if (cnt.value != '' && cnt.select_options != null) {
                            cnt.select_options.forEach(function (itemList) {
                                if (itemList.value == cnt.value) {
                                    cnt.value = itemList.name;
                                    //debugger;
                                    //if (itemList.ColumnName == 'Status') {
                                    //  this.statusids = itemList.ref_value;      
                                    //}
                                }
                            });
                        }
                    }
                });
            }
        }, function (err) {
            setTimeout(function () { _this.loadSave = false; }, 3000);
        }, function () {
            setTimeout(function () { _this.loadSave = false; }, 3000);
        });
    };
    ViewworkorderComponent.prototype.AddNotes = function () {
        this.title = "Add Note";
        this.isViewNote = false;
        this.addNoteForm.reset();
        this.addNotesPopupModel.show(this.Id);
    };
    Object.defineProperty(ViewworkorderComponent.prototype, "note_id", {
        //========================Getting Note Form Value=============================
        get: function () { return this.addNoteForm.get('note_id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "noteTitle", {
        get: function () { return this.addNoteForm.get('noteTitle'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "noteDescription", {
        get: function () { return this.addNoteForm.get('noteDescription'); },
        enumerable: true,
        configurable: true
    });
    ViewworkorderComponent.prototype.SaveNote = function () {
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
                    //this.addNotesPopupModel.hide();
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
    ViewworkorderComponent.prototype.getNoteslist = function () {
        var _this = this;
        this.leadservice.getNoteslist(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            console.log('this.NotespagedData ', _this.NotespagedData);
            _this.NotesCount = _this.leadservice.pagedData.pager.totalItems;
            _this.offsetnotes = _this.currentPageNotes;
            _this.datalentgh = _this.NotespagedData.data.length;
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ViewworkorderComponent.prototype.closeNotesPopupModelPopup = function () {
        this.addNotesPopupModels.hide();
        //this.addNoteForm.reset();
    };
    ViewworkorderComponent.prototype.setPageNotes = function ($event) {
        this.currentPageNotes = $event.page;
        this.getNoteslist();
        // this.currentPageNotes = $event.page
    };
    ViewworkorderComponent.prototype.onSortNotes = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPageNotes = 1;
        this.loadSave = true;
        this.getNoteslist();
    };
    Object.defineProperty(ViewworkorderComponent.prototype, "curPageNotes", {
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
    ViewworkorderComponent.prototype.EditNotes = function (row) {
        this.title = "Edit Note";
        this.isEdit = true;
        this.isViewNote = false;
        this.addNoteForm.patchValue({
            note_id: row.note_id,
            noteTitle: row.note_name,
            noteDescription: row.note_description,
        });
        this.addNotesPopupModel.show(this.Id);
    };
    ViewworkorderComponent.prototype.GetServiceAppointmentList = function () {
        var _this = this;
        this.workOrderService.GetServiceAppointmentList(this.Id, this.sortColumn, this.sortDir, this.ServiceAppointmentPageNo, this.pageSize).subscribe(function (result) {
            if (result) {
                _this.lstServiceAppointments = result;
                _this.ServiceAppointmentCount = result.pager.totalItems;
            }
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ViewworkorderComponent.prototype.GetProductRequiredList = function () {
        var _this = this;
        this.workOrderService.GetProductRequiredList(this.Id, this.sortColumn, this.sortDir, this.ProductRequiredPageNo, this.pageSize).subscribe(function (result) {
            if (result) {
                _this.lstProductsRequired = result;
                _this.ProductsRequiredCounts = result.pager.totalItems;
            }
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ViewworkorderComponent.prototype.GetOpportunityList = function () {
        var _this = this;
        this.workOrderService.GetOpportunityList(this.Id, this.sortColumn, this.sortDir, this.OpportunityPageNo, this.pageSize).subscribe(function (result) {
            if (result) {
                _this.lstOpportunity = result;
                _this.OpportunityCount = result.pager.totalItems;
            }
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ViewworkorderComponent.prototype.onServiceAppointmentSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.GetServiceAppointmentList();
    };
    ViewworkorderComponent.prototype.onProductRequiredSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.GetProductRequiredList();
    };
    ViewworkorderComponent.prototype.setProductRequiredPageNo = function ($event) {
        this.ProductRequiredPageNo = $event.page;
        this.GetProductRequiredList();
    };
    ViewworkorderComponent.prototype.setServiceAppointmentPageNo = function ($event) {
        this.ServiceAppointmentPageNo = $event.page;
        this.GetServiceAppointmentList();
    };
    ViewworkorderComponent.prototype.onOpportunitySort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.GetOpportunityList();
    };
    ViewworkorderComponent.prototype.setOpportunityPageNo = function ($event) {
        this.OpportunityPageNo = $event.page;
        this.GetOpportunityList();
    };
    ViewworkorderComponent.prototype.DeleteNote = function (row) {
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
    Object.defineProperty(ViewworkorderComponent.prototype, "fixOrderID", {
        get: function () { return this.addFixOrderForm.get('fixOrderID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "departmentId", {
        get: function () { return this.addFixOrderForm.get('departmentId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "fixOrderDescription", {
        get: function () { return this.addFixOrderForm.get('fixOrderDescription'); },
        enumerable: true,
        configurable: true
    });
    ViewworkorderComponent.prototype.getFixOrderData = function (workOrderid) {
        var _this = this;
        this.workOrderService.getFixOrderData(workOrderid).subscribe(function (result) {
            _this.addFixOrderForm.patchValue({
                fixOrderID: result.data[0].id,
                departmentId: result.data[0].departmentId.toString(),
                fixOrderDescription: result.data[0].departmentDescription,
            });
        }, function (error) {
        });
        this.fixOrderPopupModel.show();
    };
    ViewworkorderComponent.prototype.Fix_Order = function () {
        this.title = "Fix Order";
        this.getFixOrderData(this.Id);
    };
    ViewworkorderComponent.prototype.closeFixOrderPopupModelPopup = function () {
        this.addFixOrderForm.reset();
        this.fixOrderPopupModel.hide();
    };
    ViewworkorderComponent.prototype.SaveFixOrder = function () {
        var _this = this;
        if (this.addFixOrderForm.valid) {
            this.loadSave = true;
            this.fixOrdermodel.object_id = this.addFixOrderForm.value.fixOrderID;
            this.fixOrdermodel.departmentId = this.addFixOrderForm.value.departmentId;
            this.fixOrdermodel.fixOrderDescription = this.addFixOrderForm.value.fixOrderDescription;
            this.fixOrdermodel.object_name = "WorkOrder";
            this.fixOrdermodel.object_ref_id = this.Id;
            this.workOrderService.fixOrder(this.fixOrdermodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.addFixOrderForm.reset();
                    _this.loadSave = false;
                    _this.toaster.success(result.responseMessage);
                    _this.fixOrderPopupModel.hide();
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addFixOrderForm);
        }
    };
    //WorkOrderLineItem
    ViewworkorderComponent.prototype.GetWorkOrderLineItemList = function () {
        var _this = this;
        this.workOrderService.GetWorkOrderLineItemList(this.Id, this.sortColumnlineitem, this.sortDir, this.LineItemPageno, this.pageSizeValueLineitem).subscribe(function (result) {
            _this.LineItempagedData = result;
            console.log('result', _this.LineItempagedData);
            _this.lineItemCount = _this.LineItempagedData.pager.totalItems;
            _this.offset = _this.LineItemPageno;
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ViewworkorderComponent.prototype.setPageLineItem = function ($event) {
        this.LineItemPageno = $event.page;
        this.GetWorkOrderLineItemList();
        this.LineItemPageno = $event.page;
    };
    ViewworkorderComponent.prototype.onSortLineItems = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumnlineitem = sort.prop;
        this.LineItemPageno = 1;
        this.loadSave = true;
        this.GetWorkOrderLineItemList();
    };
    ViewworkorderComponent.prototype.ViewNotes = function (row) {
        this.isViewNote = true;
        this.notesTitle = row.note_name;
        this.notesDescription = row.note_description;
        this.addNotesPopupModel.show(this.Id);
    };
    Object.defineProperty(ViewworkorderComponent.prototype, "statusId", {
        get: function () { return this.updateStatusForm.get('statusId'); },
        enumerable: true,
        configurable: true
    });
    //onUpdateStatusClick() {
    //  debugger;
    //  this.loaderStatus = true;
    //  this.title = "Start Work Order";
    //  this.commonService.getMasterItemsByCustomFieldId(this.customFieldId).subscribe(resp => {
    //    if (resp) {
    //      debugger;
    //      this.lstStatus = JSON.parse(resp);     
    //      let selectedValue = null;
    //      //if (this.lstStatus.filter(x => x.text == this.status)) {
    //      //  selectedValue = this.lstStatus.filter(x => x.text == this.status)[0].value;
    //      //}
    //      //else
    //        if (this.lstStatus.filter(x => x.text == 'New')) {
    //        selectedValue = this.lstStatus.filter(x => x.text == 'New')[0].value;
    //      }
    //      else {
    //        selectedValue = null;
    //      }
    //      this.statusId.setValue(selectedValue);
    //    }
    //  }, err => {
    //    this.loaderStatus = false;
    //  }, () => {
    //    this.UpdateStatusModal.show();
    //    this.loaderStatus = false;
    //  });
    //}
    ViewworkorderComponent.prototype.onUpdateStatusClick = function () {
        var _this = this;
        var model = new _workorderservice_service__WEBPACK_IMPORTED_MODULE_2__["StartWorkOrderModel"];
        model.workOrderId = this.Id;
        if (this.isCompleteWork == true) {
            model.statusId = this.statusids;
        }
        model.statusId = this.statusids;
        model.moduleName = this.moduleName;
        model.submoduleName = this.submoduleName;
        this.workOrderService.updateStatusOrCreateLog(model).subscribe(function (result) {
            if (result.statusCode == 200) {
                _this.loadSave = false;
                _this.ngOnInit();
                _this.isStartWork = false;
                _this.isCompleteWork = true;
                _this.toaster.success(result.responseMessage);
            }
            else {
                _this.loadSave = false;
                _this.toaster.error(result.responseMessage);
            }
        }, function (error) {
            _this.loaderStatus = false;
        }, function () {
            _this.loaderStatus = false;
            // this.closeUpdateStatusModal();
            _this.GetCustomFieldsList();
            _this.GetCustomFieldsListTopRow();
        });
    };
    ViewworkorderComponent.prototype.closeUpdateStatusModal = function () {
        this.UpdateStatusModal.hide();
    };
    //onSaveStatusClick() {
    //  this.loaderStatus = true;
    //  let model: StartWorkOrderModel = new StartWorkOrderModel;
    //  model.workOrderId = this.Id;
    //  model.statusId = this.statusId.value as string;
    //  this.workOrderService.updateStatusOrCreateLog(model).subscribe(result => {
    //    if (result.statusCode == 200) {
    //      this.loadSave = false;
    //      this.toaster.success(result.responseMessage);
    //    }
    //    else {
    //      this.loadSave = false;
    //      this.toaster.error(result.responseMessage);
    //    }
    //  }, error => {
    //      this.loaderStatus = false;
    //  }, () => {
    //      this.loaderStatus = false;
    //      this.closeUpdateStatusModal();
    //      this.GetCustomFieldsList();
    //      this.GetCustomFieldsListTopRow();
    //  });
    //}
    //-------------------workorder status update end here-------------
    ViewworkorderComponent.prototype.GetWorkOrderHistoryList = function () {
        var _this = this;
        this.workOrderService.GetWorkOrderHistoryList(this.Id, this.sortColumn, this.sortDir, this.WorkOrderHistoryPageNo, this.pageSize).subscribe(function (result) {
            if (result) {
                _this.lstWorkOrderHistory = result;
                _this.WorkOrderHistoryCount = result.pager.totalItems;
            }
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ViewworkorderComponent.prototype.onWorkOrderHistorySort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.GetWorkOrderHistoryList();
    };
    ViewworkorderComponent.prototype.setWorkOrderHistoryPageNo = function ($event) {
        this.WorkOrderHistoryPageNo = $event.page;
        this.GetWorkOrderHistoryList();
    };
    ViewworkorderComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    ViewworkorderComponent.prototype.AddProductRequiredPopup = function () {
        this.addForm.reset();
        this.ProductRequiredTitle = "New Product Required";
        this.getProductList();
        this.GetQuantityUnitOfMeasure();
        //alert(this.productRequiredWorkOrderNumber);
        this.addForm.get('ParentRecord').disable();
        this.ParentRecord.setValue(this.productRequiredWorkOrderNumber);
        //this.addForm.patchValue({
        //  ParentRecord: this.productRequiredWorkOrderNumber
        //});
        this.ProductRequiredpopup.show();
    };
    ViewworkorderComponent.prototype.closeProductRequiredModal = function () {
        this.ProductRequiredpopup.hide();
    };
    ViewworkorderComponent.prototype.EditProductREquired = function (row) {
        this.ProductRequiredTitle = "New Product Required";
        this.getProductList();
        this.GetQuantityUnitOfMeasure();
        this.addForm.get('ParentRecord').disable();
        this.ParentRecord.setValue(this.productRequiredWorkOrderNumber);
        var EDate = (row.Date_Delivered == null ? null : new Date(row.Date_Delivered + 'Z'));
        this.addForm.patchValue({
            ParentRecord: this.productRequiredWorkOrderNumber,
            ProductRequired: row.ProductMasterId.toString(),
            QuantityRequired: row.QuantityRequired,
            DateDelivered: EDate,
            QuantityUnitOfMeasure: row.QuantityUnitOfMeasure,
            ProductRequiredId: row.Id
        });
        this.ProductRequiredpopup.show();
    };
    ViewworkorderComponent.prototype.initForm = function () {
        this.addForm = this.fb.group({
            ParentRecord: [null],
            ProductRequired: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            DateDelivered: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            QuantityRequired: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            QuantityUnitOfMeasure: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            ProductRequiredId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
        });
    };
    Object.defineProperty(ViewworkorderComponent.prototype, "ParentRecord", {
        get: function () { return this.addForm.get('ParentRecord'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "ProductRequiredId", {
        get: function () { return this.addForm.get('ProductRequiredId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "ProductRequired", {
        get: function () { return this.addForm.get('ProductRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "QuantityRequired", {
        get: function () { return this.addForm.get('QuantityRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "DateDelivered", {
        get: function () { return this.addForm.get('DateDelivered'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "QuantityUnitOfMeasure", {
        get: function () { return this.addForm.get('QuantityUnitOfMeasure'); },
        enumerable: true,
        configurable: true
    });
    ViewworkorderComponent.prototype.getProductList = function () {
        var _this = this;
        this.commonService.getMasterItemsList('NestReposrt_ProductName').subscribe(function (result) {
            _this.lstProductRequired = _this.commonService.masters;
        });
    };
    ViewworkorderComponent.prototype.GetQuantityUnitOfMeasure = function () {
        var lstQuantityUnitOfMeasure = [{ text: "Each", value: "Each" }, { text: "None", value: "None" }];
        this.lstQuantityUnitOfMeasure = lstQuantityUnitOfMeasure;
    };
    ;
    ViewworkorderComponent.prototype.deleteProductREquired = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Product Required  \"" + row.ProductName + "\"?";
        this.dialogService.confirm('Delete Product Required', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loadSave = true;
                _this.workOrderService.DeleteRecords(row.Id, 'tblProductRequired').subscribe(function (r) {
                    _this.toaster.success("Product Required \"" + row.ProductName + "\" has been deleted successfully");
                    _this.loadSave = false;
                    _this.GetProductRequiredList();
                }, function (error) {
                });
            }
        });
    };
    ViewworkorderComponent.prototype.onProductRequiredClick = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.appmodel.ParentRecord = this.addForm.value.ParentRecord;
            this.appmodel.ProductRequired = this.addForm.value.ProductRequired;
            this.appmodel.QuantityRequired = this.addForm.value.QuantityRequired;
            this.appmodel.DateDelivered = this.addForm.value.DateDelivered;
            this.appmodel.QuantityUnitOfMeasure = this.addForm.value.QuantityUnitOfMeasure;
            this.appmodel.WorkOrderId = this.Id;
            this.appmodel.Id = this.addForm.value.ProductRequiredId;
            this.workOrderService.addeditProductRequired(this.appmodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    //this.router.navigate(["/calendar"]);
                    _this.addForm.reset();
                    _this.ProductRequiredpopup.hide();
                    _this.GetProductRequiredList();
                }
                else {
                    //this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                //this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addForm);
        }
    };
    //==================================== Audit Popup Section ======================================
    ViewworkorderComponent.prototype.auditpopup = function () {
        this.workOrderId = this.Id;
        this.loadSave = true;
        this.accountId = '';
        this.getAuditReviewData(this.workOrderId, this.accountId);
        this.auditModel.show();
        this.loadSave = false;
    };
    ViewworkorderComponent.prototype.closeAudit = function () {
        this.auditModel.hide();
    };
    ViewworkorderComponent.prototype.auditSwitchClicked = function (event, checkList_Id, serviceAppointmentId) {
        //this.serviceappointmentlistService.auditChecklistCheckBox(checkList_Id, serviceAppointmentId, event.srcElement.checked).subscribe(s => {
        //  this.refresh(serviceAppointmentId);
        //}, err => {
        //  this.loadSave = false;
        //});
    };
    ViewworkorderComponent.prototype.getAuditReviewData = function (workOrderId, accountId) {
        var _this = this;
        this.CheckListGroup = [];
        this.workOrderService.getAuditReviewData(workOrderId, accountId).subscribe(function (result) {
            _this.auditData = result;
            _this.auditData.forEach(function (t) {
                var groupCheck = _this.CheckListGroup.filter(function (y) { return y.WorkOrderNumber == t.WorkOrderNumber; });
                if (groupCheck == null || groupCheck.length == 0) {
                    var obj = {
                        WorkOrderNumber: t.WorkOrderNumber,
                        AppointmentNumber: t.AppointmentNumber,
                        WorkTypeName: t.WorkTypeName,
                        InnerData: _this.auditData.filter(function (x) { return x.WorkOrderNumber == t.WorkOrderNumber; })
                    };
                    _this.CheckListGroup.push(obj);
                }
            });
            _this.ActualauditCheckListData = [];
            setTimeout(function () {
                _this.loadSave = false;
            }, 500);
        }, function (err) {
            _this.loadSave = false;
        });
        this.IsAuditCheckListDisplay = false;
    };
    //----------------------------------   Audit Check likst ----------------------------------------
    ViewworkorderComponent.prototype.auditChecklistDetail = function (checkList_Id, serviceAppointmentId, disable) {
        this.isDisabled = true;
        this.closeAudit();
        this.serviceAppointmentId = serviceAppointmentId;
        this.IsAuditCheckListDisplay = false;
        this.auditChecklistDetailList(checkList_Id, serviceAppointmentId, disable);
    };
    ViewworkorderComponent.prototype.auditChecklistDetailList = function (checkList_Id, serviceAppointmentId, disable) {
        var _this = this;
        this.isModalShow = true;
        this.isDisabled = disable;
        this.auditCheckListData = [];
        this.ActualauditCheckListData = [];
        this.workOrderId = this.Id;
        this.auditCheckListModel.show();
        this.workOrderService.auditChecklistDetail(checkList_Id, serviceAppointmentId).subscribe(function (resp) {
            if (resp) {
                _this.auditCheckListData = resp;
                _this.auditTitle = _this.auditCheckListData[0].CHECK_LIST_NAME;
                _this.checkListType = _this.auditCheckListData[0].CHECKLIST_TYPE;
                _this.SectionGroup = _this.auditCheckListData[0].Section;
                _this.SectionGroupTop = _this.auditCheckListData[0].Section;
                _this.refreshTop(_this.SectionGroup);
                _this.loadSave = false;
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    ViewworkorderComponent.prototype.refreshTop = function (data) {
        this.SectionGroupTop = [];
        this.SectionGroupTop = data;
        console.log(this.SectionGroupTop);
    };
    ViewworkorderComponent.prototype.closeAuditCheckList = function () {
        this.auditCheckListModel.hide();
        this.auditModel.show();
        // this.buttonState.emit({ serviceAppointmentsId: this.serviceAppointmentId, disable: this.isDisabled });
        //  setTimeout(() => { this.isModalShow = false; }, 1000);
    };
    ViewworkorderComponent.prototype.ClickForScroll = function (event) {
        this.isScroll = true;
        var data = 'section_' + event;
        var el = document.getElementById(data);
        el.scrollIntoView({ behavior: 'smooth' });
    };
    ViewworkorderComponent.prototype.ClickForScrollTop = function () {
        var el1 = document.getElementById('l-of-sections_ScrollingId');
        el1.scrollIntoView({ behavior: 'smooth' });
        el1.scrollTop;
        this.isScroll = false;
    };
    ViewworkorderComponent.prototype.onSubmitAuditCheckList = function () {
    };
    ViewworkorderComponent.prototype.addItem = function (newItem) {
        this.NotesCount = newItem;
        this.getNoteslistCardView();
    };
    ViewworkorderComponent.prototype.open = function (imageList, index) {
        // open lightbox
        var ImageObject = [];
        var currIndexImage = imageList[index];
        var index = 0;
        var tempindex = 0;
        imageList.forEach(function (x) {
            if (typeof x.FileUrl != "undefined" && x.FileUrl != null && x.FileUrl != "") {
                var obj = {
                    src: x.FileUrl,
                    caption: x.ANSWER,
                    thumb: x.FileUrl
                };
                if (currIndexImage.FileUrl == x.FileUrl) {
                    index = tempindex;
                }
                ImageObject.push(obj);
                tempindex++;
            }
        });
        this._lightbox.open(ImageObject, index);
    };
    ViewworkorderComponent.prototype.getNoteslistCardView = function () {
        var _this = this;
        this.NotificationListData.length = 0;
        this.loadSave = true;
        this.workOrderService.getNoteslistCardView(this.Id, this.submoduleName, this.submoduleName, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(function (response) {
            _this.NotespagedDataCardView = _this.workOrderService.pagedDataNewCardView.data;
            console.log('NotespagedData12', _this.NotespagedDataCardView);
            //this.NotespagedDataCardView = this.NotespagedDataCardView.filter(s => {
            //  return s.IsReadNote==false;
            //});NotificationListData
            _this.NotespagedDataCardView.forEach(function (x) {
                if (x.IsReadNote == false) {
                    var obj = {
                        title: x.note_name,
                        noteId: x.note_id,
                        description: x.note_description,
                        senderName: x.Sender,
                        CreatedOn: x.created_on,
                        Status: x.Status,
                    };
                    _this.NotificationListData.push(obj);
                }
            });
            console.log('NotificationListData', _this.NotificationListData);
            //for (let item of this.NotespagedDataCardView.data) {
            //  if (item.IsReadNote==true) {
            //    this.cardTitle = item.note_name;     //this.NotespagedDataCardView.data[0].note_name;
            //    this.cardNoteId = item.note_id;      //this.NotespagedDataCardView.data[0].note_id;
            //    this.cardAssignedTo = item.AssignTo;  //this.NotespagedDataCardView.data[0].AssignTo;
            //    this.cardResource = item.AssignToType;   //this.NotespagedDataCardView.data[0].AssignToType;
            //    this.cardNotify = item.notifyUserNames;    //this.NotespagedDataCardView.data[0].notifyUserNames;
            //    this.cardDesc = item.note_description;      //this.NotespagedDataCardView.data[0].note_description;
            //    this.cardStatus = item.Status;
            //    this.loadSave = false;//this.NotespagedDataCardView.data[0].Status;
            //    break;
            //  }
            //}
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
        this.loadSave = false;
    };
    ViewworkorderComponent.prototype.redirectToSource = function (id) {
        var _this = this;
        //console.log(row);
        this.workOrderService.setNotesToRead(id).subscribe(function (m) {
            _this.getNoteslistCardView();
        });
    };
    ViewworkorderComponent.prototype.displayDetailNotification = function (item) {
        this.dataNoti = item;
        this.modalnote.show();
    };
    ViewworkorderComponent.prototype.closeNote = function (noteId) {
        var _this = this;
        if (noteId != null && noteId != 0) {
            this.workOrderService.setNotesToRead(noteId).subscribe(function (m) {
                _this.getNoteslistCardView();
            });
        }
        this.modalnote.hide();
    };
    //-----------------------------------------------------------------------------------------------
    //===============================================================================================
    //================================ Engineering Questions ================================================
    ViewworkorderComponent.prototype.AddEngineeringQuestionPopup = function () {
        //this.addEditEngineeringForm.reset();
        //=======Enable Engineering Questions Fields========
        this.addEditEngineeringForm.enable();
        this.eNGFirstReviewBy.disable();
        this.eNGSecondReviewBy.disable();
        this.onSaveEngQuesBtn = true;
        //====================================================
        this.GetlstTrenching();
    };
    ViewworkorderComponent.prototype.GetEngineeringQuestionData = function () {
        var _this = this;
        this.workOrderService.GetEngineeringQuestionData(this.Id).subscribe(function (result) {
            if (result) {
                debugger;
                _this.lstEngineeringQuestion = result;
                console.log("this.lstEngineeringQuestion", _this.lstEngineeringQuestion);
                _this.addEditEngineeringForm.patchValue({
                    numberOfArrays: result.Number_of_Arrays__c,
                    roofTilt: result.Roof_Tilt__c,
                    roofMaterial: result.Roof_Material__c,
                    midClamps: result.Mid_Clamps,
                    endClamps: result.End_Clamps,
                    groundingLugs: result.Grounding_Lugs,
                    tBolts: result.T_Bolts,
                    endCovers: result.EndCovers,
                    splice: result.Splice,
                    flashings: result.Flashings,
                    rail: result.Rail,
                    railWeight: result.RailWeight,
                    moduleWeight: result.ModuleWeight,
                    pSF: result.PSF,
                    totalWeight: result.TotalWeight,
                });
            }
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ViewworkorderComponent.prototype.initEngineeringForm = function () {
        this.addEditEngineeringForm = this.fb.group({
            mpuNeeded: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            trenchingNeeded: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            retrofitNeeded: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            interconnectionType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            numberOfArrays: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            roofMaterial: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            roofTilt: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            midClamps: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            endClamps: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            groundingLugs: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            tBolts: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            endCovers: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            splice: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            flashings: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            rail: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            railWeight: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            moduleWeight: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            pSF: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            totalWeight: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            eNGFirstReviewBy: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            eNGFirstReviewDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            eNGSecondReviewBy: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            eNGSecondReviewDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator]
        });
    };
    Object.defineProperty(ViewworkorderComponent.prototype, "mpuNeeded", {
        get: function () { return this.addEditEngineeringForm.get('mpuNeeded'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "trenchingNeeded", {
        get: function () { return this.addEditEngineeringForm.get('trenchingNeeded'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "retrofitNeeded", {
        get: function () { return this.addEditEngineeringForm.get('retrofitNeeded'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "interconnectionType", {
        get: function () { return this.addEditEngineeringForm.get('interconnectionType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "numberOfArrays", {
        get: function () { return this.addEditEngineeringForm.get('numberOfArrays'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "roofMaterial", {
        get: function () { return this.addEditEngineeringForm.get('roofMaterial'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "roofTilt", {
        get: function () { return this.addEditEngineeringForm.get('roofTilt'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "midClamps", {
        get: function () { return this.addEditEngineeringForm.get('midClamps'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "endClamps", {
        get: function () { return this.addEditEngineeringForm.get('endClamps'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "groundingLugs", {
        get: function () { return this.addEditEngineeringForm.get('groundingLugs'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "tBolts", {
        get: function () { return this.addEditEngineeringForm.get('tBolts'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "endCovers", {
        get: function () { return this.addEditEngineeringForm.get('endCovers'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "splice", {
        get: function () { return this.addEditEngineeringForm.get('splice'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "flashings", {
        get: function () { return this.addEditEngineeringForm.get('flashings'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "rail", {
        get: function () { return this.addEditEngineeringForm.get('rail'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "railWeight", {
        get: function () { return this.addEditEngineeringForm.get('railWeight'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "moduleWeight", {
        get: function () { return this.addEditEngineeringForm.get('moduleWeight'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "pSF", {
        get: function () { return this.addEditEngineeringForm.get('pSF'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "totalWeight", {
        get: function () { return this.addEditEngineeringForm.get('totalWeight'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "eNGFirstReviewBy", {
        get: function () { return this.addEditEngineeringForm.get('eNGFirstReviewBy'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "eNGFirstReviewDate", {
        get: function () { return this.addEditEngineeringForm.get('eNGFirstReviewDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "eNGSecondReviewBy", {
        get: function () { return this.addEditEngineeringForm.get('eNGSecondReviewBy'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewworkorderComponent.prototype, "eNGSecondReviewDate", {
        get: function () { return this.addEditEngineeringForm.get('eNGSecondReviewDate'); },
        enumerable: true,
        configurable: true
    });
    ViewworkorderComponent.prototype.GetlstMPU = function () {
        var _this = this;
        debugger;
        this.commonService.getMasterItemsList("MPU").subscribe(function (result) {
            _this.lstMPU = _this.commonService.masters;
            console.log("this.lstMPU", _this.lstMPU);
            debugger;
        });
    };
    ViewworkorderComponent.prototype.GetlstTrenching = function () {
        var _this = this;
        this.commonService.getMasterItemsList("Trenching").subscribe(function (result) {
            _this.lstTrenching = _this.commonService.masters;
        });
    };
    ViewworkorderComponent.prototype.GetlstRetrofitNeeded = function () {
        var _this = this;
        this.commonService.getMasterItemsList("RetrofitNeeded").subscribe(function (result) {
            _this.lstRetrofit = _this.commonService.masters;
        });
    };
    ViewworkorderComponent.prototype.GetlstInterconnection = function () {
        var _this = this;
        this.commonService.getMasterItemsList("Interconnection").subscribe(function (result) {
            _this.lstInterconnection = _this.commonService.masters;
        });
    };
    ViewworkorderComponent.prototype.GetlstroofMaterial = function () {
        var _this = this;
        this.commonService.getMasterItemsList("RoofMaterial").subscribe(function (result) {
            _this.lstroofMaterial = _this.commonService.masters;
        });
    };
    ViewworkorderComponent.prototype.onSaveEngQues = function () {
        var _this = this;
        debugger;
        this.loadSave = true;
        if (this.addEditEngineeringForm.valid) {
            this.addeditEngQuesModel.workOrderId = this.Id;
            this.addeditEngQuesModel.mpuNeeded = this.addEditEngineeringForm.value.mpuNeeded;
            this.addeditEngQuesModel.TrenchingNeeded = this.addEditEngineeringForm.value.trenchingNeeded;
            this.addeditEngQuesModel.RetrofitNeeded = this.addEditEngineeringForm.value.retrofitNeeded;
            this.addeditEngQuesModel.InterconnectionType = this.addEditEngineeringForm.value.interconnectionType;
            this.addeditEngQuesModel.NumberOfArrays = this.addEditEngineeringForm.value.numberOfArrays;
            this.addeditEngQuesModel.RoofMaterial = this.addEditEngineeringForm.value.roofMaterial;
            this.addeditEngQuesModel.RoofTilt = this.addEditEngineeringForm.value.roofTilt;
            this.addeditEngQuesModel.MidClamps = this.addEditEngineeringForm.value.midClamps;
            this.addeditEngQuesModel.EndClamps = this.addEditEngineeringForm.value.endClamps;
            this.addeditEngQuesModel.GroundingLugs = this.addEditEngineeringForm.value.groundingLugs;
            this.addeditEngQuesModel.TBolts = this.addEditEngineeringForm.value.tBolts;
            this.addeditEngQuesModel.EndCovers = this.addEditEngineeringForm.value.endCovers;
            this.addeditEngQuesModel.Splice = this.addEditEngineeringForm.value.splice;
            this.addeditEngQuesModel.Flashings = this.addEditEngineeringForm.value.flashings;
            this.addeditEngQuesModel.Rail = this.addEditEngineeringForm.value.rail;
            this.addeditEngQuesModel.RailWeight = this.addEditEngineeringForm.value.railWeight;
            this.addeditEngQuesModel.ModuleWeight = this.addEditEngineeringForm.value.moduleWeight;
            this.addeditEngQuesModel.PSF = this.addEditEngineeringForm.value.pSF;
            this.addeditEngQuesModel.TotalWeight = this.addEditEngineeringForm.value.totalWeight;
            // this.addeditEngQuesModel.ENGFirstReviewBy = this.addEditEngineeringForm.value.eNGFirstReviewBy;
            this.addeditEngQuesModel.ENGFirstReviewDate = this.addEditEngineeringForm.value.eNGFirstReviewDate;
            // this.addeditEngQuesModel.ENGSecondReviewBy = this.addEditEngineeringForm.value.eNGSecondReviewBy;
            this.addeditEngQuesModel.ENGSecondReviewDate = this.addEditEngineeringForm.value.eNGSecondReviewDate;
            //this.appmodel.DateDelivered = this.addForm.value.DateDelivered;
            //this.appmodel.QuantityUnitOfMeasure = this.addForm.value.QuantityUnitOfMeasure;
            //this.appmodel.WorkOrderId = this.Id;
            //this.appmodel.Id = this.addForm.value.ProductRequiredId
            debugger;
            this.workOrderService.addeditEngineeringQuestionData(this.addeditEngQuesModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    //this.router.navigate(["/calendar"]);
                    _this.addEditEngineeringForm.disable();
                    _this.onSaveEngQuesBtn = false;
                    // this.GetProductRequiredList();
                    _this.ngOnInit();
                    _this.loadSave = false;
                }
                else {
                    //this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                    _this.loadSave = false;
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addForm);
        }
    };
    //=======================================================================================================
    //=====Validation To Enter Only Two Decimal Values=========================
    ViewworkorderComponent.prototype.numberOnly = function (event) {
        debugger;
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode == 46) {
            this.dotCount += 1;
            this.checkNumberOnly = (event.target.value);
            var numericCheck = (event.target.value).toString();
            if (numericCheck.includes('.')) {
                this.dotCount += 1;
            }
            if (this.dotCount > 1) {
                this.dotCount = 0;
                return false;
            }
        }
        if (charCode > 31 && (charCode < 45 || charCode > 57 || charCode == 47)) {
            return false;
        }
        this.checkNumberOnly = (event.target.value);
        if (this.checkNumberOnly != null) {
            debugger;
            var numeric = (event.target.value).toString();
            if (numeric.includes('.')) {
                var checkNumeric = numeric.split('.');
                if (checkNumeric.length > 2) {
                    return false;
                }
                this.checkString = checkNumeric[1].split('');
                if (this.checkString.length > 1) {
                    // this.toastrService.warning("Invalid value", "Warning");
                    return false;
                }
            }
        }
        this.dotCount = 0;
        return true;
    };
    ViewworkorderComponent.ctorParameters = function () { return [
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__["LeadlistService"] },
        { type: _workorderservice_service__WEBPACK_IMPORTED_MODULE_2__["WorkorderService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"] },
        { type: ngx_lightbox__WEBPACK_IMPORTED_MODULE_11__["Lightbox"] },
        { type: ngx_lightbox__WEBPACK_IMPORTED_MODULE_11__["LightboxConfig"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('audit', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewworkorderComponent.prototype, "auditModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('auditCheckList', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewworkorderComponent.prototype, "auditCheckListModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('notesDetailModal', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewworkorderComponent.prototype, "modalnote", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ViewworkorderComponent.prototype, "buttonState", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ViewworkorderComponent.prototype, "count", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ViewworkorderComponent.prototype, "countChanged", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('listnotesmodel', { static: false }),
        __metadata("design:type", _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_10__["NewnoteslistComponent"])
    ], ViewworkorderComponent.prototype, "addNotesPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('NotesPopupModel', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewworkorderComponent.prototype, "addNotesPopupModels", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('FixOrder', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewworkorderComponent.prototype, "fixOrderPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('UpdateStatus', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewworkorderComponent.prototype, "UpdateStatusModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ProductRequired', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewworkorderComponent.prototype, "ProductRequiredpopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ViewworkorderComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ViewworkorderComponent.prototype, "offsetnotes", void 0);
    ViewworkorderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewworkorder',
            template: __importDefault(__webpack_require__(/*! raw-loader!./viewworkorder.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/workorder/viewworkorder.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./viewworkorder.component.scss */ "./src/app/views/workorder/viewworkorder.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__["LeadlistService"],
            _workorderservice_service__WEBPACK_IMPORTED_MODULE_2__["WorkorderService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"],
            ngx_lightbox__WEBPACK_IMPORTED_MODULE_11__["Lightbox"],
            ngx_lightbox__WEBPACK_IMPORTED_MODULE_11__["LightboxConfig"]])
    ], ViewworkorderComponent);
    return ViewworkorderComponent;
}());



/***/ }),

/***/ "./src/app/views/workorder/workorder-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/workorder/workorder-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: WorkOrderRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkOrderRoutingModule", function() { return WorkOrderRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _workorder_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workorder.component */ "./src/app/views/workorder/workorder.component.ts");
/* harmony import */ var _manageworkorder_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./manageworkorder.component */ "./src/app/views/workorder/manageworkorder.component.ts");
/* harmony import */ var _viewworkorder_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./viewworkorder.component */ "./src/app/views/workorder/viewworkorder.component.ts");
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
    { path: '', component: _workorder_component__WEBPACK_IMPORTED_MODULE_2__["WorkorderComponent"] },
    { path: 'add', component: _manageworkorder_component__WEBPACK_IMPORTED_MODULE_3__["ManageworkorderComponent"] },
    { path: 'edit/:id', component: _manageworkorder_component__WEBPACK_IMPORTED_MODULE_3__["ManageworkorderComponent"] },
    { path: 'view/:id', component: _viewworkorder_component__WEBPACK_IMPORTED_MODULE_4__["ViewworkorderComponent"] }
];
var WorkOrderRoutingModule = /** @class */ (function () {
    function WorkOrderRoutingModule() {
    }
    WorkOrderRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], WorkOrderRoutingModule);
    return WorkOrderRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/workorder/workorder.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/views/workorder/workorder.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dvcmtvcmRlci93b3Jrb3JkZXIuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/workorder/workorder.component.ts":
/*!********************************************************!*\
  !*** ./src/app/views/workorder/workorder.component.ts ***!
  \********************************************************/
/*! exports provided: WorkorderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkorderComponent", function() { return WorkorderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _shared_manageviewnew_manageviewnew_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/manageviewnew/manageviewnew.component */ "./src/app/views/shared/manageviewnew/manageviewnew.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _workorderservice_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./workorderservice.service */ "./src/app/views/workorder/workorderservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
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










var WorkorderComponent = /** @class */ (function () {
    function WorkorderComponent(workorderService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.workorderService = workorderService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.IsAuditCheckListDisplay = false;
        this.moduleName = 'crm';
        this.submoduleName = 'workorder';
        this.custom_view_id = '';
        this.searchUserType = '';
        this.searchFilter = '';
        this.ViewModel = '';
        this.listFiltertext = '';
        this.vewId = '';
        //modulePermission: ModuleList;
        this.loadSave = false;
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.pagedData = {
            pager: {},
            data: []
        };
        // listFilter = '';
        this.searchTxt = '';
        this.listFilter = '';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["SelectionType"];
        //jsonData: any;
        this.jsonData = {
            data: [],
            schema: []
        };
        this.tableName = 'tblWorkorderNew'; //tblProducts';
        this.selected = [];
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.myCheckbox = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
        });
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'WORKORDERADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'WORKORDERUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'WORKORDERDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
    }
    WorkorderComponent.prototype.ngOnInit = function () {
        this.loadSave = true;
        this.SearhName = '';
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.LoadViewData();
        this.refresh();
    };
    WorkorderComponent.prototype.GetcustomViewid = function (event) {
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
    WorkorderComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loadSave = true;
        this.workorderService.GetWorkOrderList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.myCheckbox)
            .subscribe(function (response) {
            _this.jsonData = response;
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            _this.totalRecords = _this.columndata.length > 0 ? _this.columndata[0].total_records : 0;
            _this.offset = _this.currentPage;
        }, function (error) {
            _this.loadSave = false;
        }, function () { _this.loadSave = false; });
    };
    Object.defineProperty(WorkorderComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    WorkorderComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    WorkorderComponent.prototype.setPage = function ($event) {
        this.loadSave = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    WorkorderComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    WorkorderComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    WorkorderComponent.prototype.updateFilter = function (event) {
        //this.SearhName = event.target.value;
        this.listFilter = event.target.value;
        this.listFiltertext = "workorder.WorkOrderNumber like '%" + this.listFilter + "%'";
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.refresh();
        }
    };
    WorkorderComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    WorkorderComponent.prototype.search = function () {
        this.listFiltertext = '';
        this.listFiltertext = "workorder.WorkOrderNumber like '%" + this.listFilter + "%'";
        this.refresh();
    };
    WorkorderComponent.prototype.reset = function () {
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.sortDir = 'desc';
        this.sortColumn = 'Id';
        this.myCheckbox = false;
        this.refresh();
    };
    WorkorderComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].id.toString() + ",";
            }
        }
        else {
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].id.toString() + ",";
            }
        }
    };
    WorkorderComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    WorkorderComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Work Order(s)\"";
            this.dialogService.confirm('Delete Work Order(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.workorderService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    WorkorderComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Work Order  \"" + row.Subject + "\"?";
        this.dialogService.confirm('Delete Work Order', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.workorderService.DeleteRecords(row.id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Work Order \"" + row.Subject + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    WorkorderComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    WorkorderComponent.prototype.getListingColorCode = function (fieldValue) {
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        return this.lstListingColorCode;
    };
    WorkorderComponent.prototype.LoadViewData = function () {
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
                    _this.custom_view_id = cnt.custom_view_id;
                }
            });
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    WorkorderComponent.prototype.SetManageViewValue = function (event, text) {
        this.ViewModel = text;
        this.custom_view_id = event;
        this.refresh();
        //this.LoadViewData();
    };
    WorkorderComponent.prototype.switchClicked = function (event) {
        this.listFiltertext = '';
        this.myCheckbox = event.srcElement.checked;
        this.currentPage = 1;
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "workorder.WorkOrderNumber like '%" + this.listFilter + "%'";
        }
        if (this.listFiltertext.trim().length > 0) {
            this.refresh();
        }
        if (this.myCheckbox == false) {
            this.refresh();
        }
    };
    WorkorderComponent.ctorParameters = function () { return [
        { type: _workorderservice_service__WEBPACK_IMPORTED_MODULE_5__["WorkorderService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_1__["SearchfilteraddComponent"])
    ], WorkorderComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageviewnew_manageviewnew_component__WEBPACK_IMPORTED_MODULE_2__["ManageviewnewComponent"])
    ], WorkorderComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"])
    ], WorkorderComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('audit', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__["ModalDirective"])
    ], WorkorderComponent.prototype, "auditModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], WorkorderComponent.prototype, "offset", void 0);
    WorkorderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-workorder',
            template: __importDefault(__webpack_require__(/*! raw-loader!./workorder.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/workorder/workorder.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./workorder.component.scss */ "./src/app/views/workorder/workorder.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_workorderservice_service__WEBPACK_IMPORTED_MODULE_5__["WorkorderService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"]])
    ], WorkorderComponent);
    return WorkorderComponent;
}());



/***/ }),

/***/ "./src/app/views/workorder/workorder.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/workorder/workorder.module.ts ***!
  \*****************************************************/
/*! exports provided: WorkorderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkorderModule", function() { return WorkorderModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _workorder_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workorder.component */ "./src/app/views/workorder/workorder.component.ts");
/* harmony import */ var _workorder_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./workorder-routing.module */ "./src/app/views/workorder/workorder-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _manageworkorder_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./manageworkorder.component */ "./src/app/views/workorder/manageworkorder.component.ts");
/* harmony import */ var _viewworkorder_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./viewworkorder.component */ "./src/app/views/workorder/viewworkorder.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var WorkorderModule = /** @class */ (function () {
    function WorkorderModule() {
    }
    WorkorderModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_workorder_component__WEBPACK_IMPORTED_MODULE_2__["WorkorderComponent"], _manageworkorder_component__WEBPACK_IMPORTED_MODULE_9__["ManageworkorderComponent"], _viewworkorder_component__WEBPACK_IMPORTED_MODULE_10__["ViewworkorderComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _workorder_routing_module__WEBPACK_IMPORTED_MODULE_3__["WorkOrderRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalModule"]
            ]
        })
    ], WorkorderModule);
    return WorkorderModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-workorder-workorder-module.js.map