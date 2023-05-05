(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-proposal-proposal-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/addeditproposal.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/addeditproposal.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/proposal-list\">Manage Proposal</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList;let i=index\">\r\n        <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row  mb-2\">\r\n\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n\r\n\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO' &&  inner.edit_form_field_visibility == 'NO' \" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n                <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n              </a>-->\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">\r\n\r\n\r\n\r\n                <!--text  [placeholder]=\"inner.display_name\"-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='map' && inner.dt_code !='imageurl'\r\n                       && inner.dt_code !='image'\r\n                       && inner.dt_code !='map_search'\" />\r\n\r\n\r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'imageurl'\" style=\"word-break:break-all;\">\r\n                  <!--<div [innerHTML]=\"inner.value\"></div>-->\r\n                  <a href=\"{{inner.value}}\" style=\"height:50px;width:50px\" target=\"_blank\">{{inner.value |truncate }}</a>'\r\n                </div>\r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'image'\" style=\"word-break:break-all;\">\r\n                  <div [innerHTML]=\"inner.value\"></div>\r\n                </div>\r\n\r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'map_search' && displayType == 'ADD'\">\r\n                  <a (click)=\"mapPopUP()\" href=\"javascript:void(0);\" class=\"btn btn-info\"><i class=\"fa fa-search mr-2\"></i> Search Location</a>\r\n                </div>\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"></p-calendar>\r\n\r\n\r\n                <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n  [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                <!--end calandar-->\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--<div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n    <div class=\"form-check form-check-inline\">\r\n      <div class=\"custom-control custom-checkbox\">\r\n\r\n        <input id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\"\r\n               class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}\">{{inner.display_name}}</label>\r\n\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\"\r\n                               id=\"{{inner.form_controlName}}\" [formControlName]=\"inner.form_controlName\">\r\n                        <span class=\"slider round\" id=\"{{inner.form_controlName}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n\r\n\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                        <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                 [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n          <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n\r\n\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--Ng Dropdown-->\r\n                <!--Dropdown\r\n  picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n  -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.dt_code=='select' }\" *ngIf=\"inner.dt_code=='select' && inner.select_options==''\">\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.id\"\r\n            *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n      {{option.value}}\r\n    </option>\r\n  </select>-->\r\n\r\n                <ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                           [ngClass]=\"{'disabledddl':inner.is_readOnly}\" [searchable]=\"false\" [clearable]=\"false\"\r\n                           [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (clear)=\"onClearLang(item.InnerData,j)\"\r\n                           (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code!=null && !inner.is_readOnly\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code==null && !inner.is_readOnly\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true' && !inner.is_readOnly\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row  mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 d-flex justify-content-end\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/pricebooklistpopup/pricebooklistpopup.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/pricebooklistpopup/pricebooklistpopup.component.html ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div bsModal #PriceBookListModelPopup=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Price Book List</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"modal-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"table-responsive\">\r\n              <div class=\"table table-striped\">\r\n                <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                               [rows]=\"PriceBookListResult.data\"\r\n                               [columnMode]=\"'force'\"\r\n                               [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                               [headerHeight]=\"40\"\r\n                               [footerHeight]=\"40\"\r\n                               \r\n                               [externalPaging]=\"true\"\r\n                               [externalSorting]=\"true\"\r\n                               [loadingIndicator]=\"loadSave\"\r\n                               [count]=\"PriceBookListResult.pager.totalItems\"\r\n                               [offset]=\"PriceBookListResult.pager.currentPage\"\r\n                               [limit]=\"PriceBookListResult.pager.pageSize\"\r\n                               (page)='setPage($event)'\r\n                               (sort)=\"onSort($event)\">\r\n                  <ngx-datatable-column name=\"PriceBook Name\" [sortable]=\"false\" prop=\"PriceBookName\"></ngx-datatable-column>\r\n                  <ngx-datatable-column name=\"List Price\" [sortable]=\"false\" prop=\"ListPrice\"></ngx-datatable-column>\r\n                  <ngx-datatable-footer>\r\n                    <ng-template ngx-datatable-footer-template\r\n                                 let-rowCount=\"rowCount\"\r\n                                 let-pageSize=\"pageSize\"\r\n                                 let-selectedCount=\"selectedCount\"\r\n                                 let-currentPage=\"currentPage\"\r\n                                 let-offset=\"offset\"\r\n                                 let-isVisible=\"isVisible\">\r\n                      <div class=\"page-count\" style=\"max-width:170px;\">\r\n                        {{rowCount}} total\r\n                      </div>\r\n                      <div>\r\n                        <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                          <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                            <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                       bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                          </span>\r\n                        </div>\r\n                      </div>\r\n                      <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                       [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                       [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                       [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                       [page]=\"PriceBookListResult.pager.currentPage+1\"\r\n                                       [size]=\"pageSizeValue\"\r\n                                       [count]=\"PriceBookListResult.pager.totalItems\"\r\n                                       [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                       (change)=\"setPage($event)\">\r\n                      </datatable-pager>\r\n                    </ng-template>\r\n                  </ngx-datatable-footer>\r\n\r\n                  <ngx-datatable-column name=\"Select Price\" [sortable]=\"false\" headerClass=\"text-center\" *ngIf=\"!isContactUser\">\r\n                    <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                      <a class=\"icon-text-center d-block\" href=\"javscript:;\" (click)=\"UpdateValueInListPrice(row)\">\r\n                        <i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i>\r\n                      </a>\r\n                    </ng-template>\r\n                  </ngx-datatable-column>\r\n\r\n                </ngx-datatable>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.html ***!
  \********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #proposalpopup=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-xl modal-info \" style=\"min-width:1000px;\" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\" *ngIf=\"!isEditLineItem\">\r\n        <h4 class=\"modal-title\">Add Proposal Line Item</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-header\" *ngIf=\"isEditLineItem\">\r\n        <h4 class=\"modal-title\">Edit Proposal Line Item</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div *ngIf=\"lineItemDiv\">\r\n\r\n        <div class=\"panel-header border-bottom py-2\">\r\n\r\n          <div class=\"col-md-12 col-xl-12\">\r\n            <div class=\"row searchfield  mr-1 w-100\">\r\n              <div class=\"col-sm-12  col-lg-4 mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listNameFilter' placeholder=\"Search By Product Name\" (keyup)='updateNameFilter($event)'>\r\n              </div>\r\n              <div class=\"col-sm-12  col-lg-4\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"searchProduct()\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"resetProduct()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n                <!--<a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\"><span><i class=\"fa fa-filter\"></i> Filter</span></a>-->\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:600px; overflow-y:auto;\">\r\n\r\n          <div class=\"col-md-12\">\r\n            <!--<h4>if would like Enerflo to automatically find the best apt time based on availalility.</h4>-->\r\n            <div class=\"row\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap\"\r\n                                 [rows]=\"AssociatedproductpagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"AssociatedproductpagedData.pager.totalItems\"\r\n                                 [offset]=\"AssociatedproductpagedData.pager.currentPage\"\r\n                                 [limit]=\"AssociatedproductpagedData.pager.pageSize\"\r\n                                 (page)='setPageAssociateProduct($event)'\r\n                                 (sort)=\"onSort($event)\"\r\n                                 [selected]=\"selected\"\r\n                                 [selectionType]=\"SelectionType.checkbox\"\r\n                                 [selectAllRowsOnPage]=\"false\"\r\n                                 [displayCheck]=\"displayCheck\"\r\n                                 (activate)=\"onActivate($event)\"\r\n                                 (select)=\"onSelect($event)\">\r\n\r\n                    <ngx-datatable-column [width]=\"42\"\r\n                                          [sortable]=\"false\"\r\n                                          [canAutoResize]=\"false\"\r\n                                          [draggable]=\"false\"\r\n                                          [resizeable]=\"false\"\r\n                                          [headerCheckboxable]=\"true\"\r\n                                          [checkboxable]=\"true\">\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Product Name\" [sortable]=\"true\" prop=\"ProductName\" [minWidth]=\"200\">\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Product Family\" sortable=\"false\" prop=\"ProductFamily\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Product Code\" sortable=\"false\" prop=\"ProductCode\" [minWidth]=\"100\"></ngx-datatable-column>\r\n                    <!--<ngx-datatable-column name=\"Product Code\" sortable=\"false\" prop=\"ProductDescription\"></ngx-datatable-column>-->\r\n                    <!--<ngx-datatable-column [minWidth]=\"70\" headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"text-center\">\r\n                          <a (click)=\"deleteAssociateproduct(row.mid)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                        </div>\r\n\r\n                      </ng-template>\r\n                    </ngx-datatable-column>-->\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          Total Records: {{rowCount}}\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"AssociatedproductpagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"AssociatedproductpagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPageSalesList($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"modal-footer\">\r\n          <!--<a href=\"javascript:void(0);\" class=\"btn btn-secondary mr-1\" (click)=\"previous()\"><i class=\"fa fa-angle-double-left\"></i> Prevoius</a>-->\r\n          <!--<a href=\"javascript:void(0);\" class=\"btn btn-primary px-4 mr-1\" (click)=\"DiscountPrerequisitedocumentPrevioud()\">Prevoius <i class=\"fa fa-angle-double-right\"></i></a>-->\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-primary px-4 mr-1\" (click)=\"Next()\">Next <i class=\"fa fa-angle-double-right\"></i></a>\r\n          <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:600px; overflow-y:auto;\" *ngIf=\"lineItemProductCal\">\r\n        <div class=\"col-md-12\">\r\n          <form [formGroup]=\"configurationSetings\">\r\n            <div class=\"w-100\" [ngClass]=\"{'disabled':loading}\">\r\n              <div class=\"row\">\r\n                <div class=\"col-12\">\r\n                  <div class=\"pagination2 table-responsive\">\r\n                    <table class=\"table mb-0\">\r\n                      <thead class=\"thead-bg\">\r\n                        <tr>\r\n                          <th>Product</th>\r\n                          <th>List Price</th>\r\n                          <th>Sale Price</th>\r\n                          <th>Quantity</th>\r\n                          <th>Discount</th>\r\n                          <th>Line Item Description</th>\r\n                        </tr>\r\n                      </thead>\r\n                      <tbody formArrayName=\"lineItemDisCount\">\r\n                        <tr [formGroupName]=\"i\" *ngFor=\"let fieldName of lineItemDisCount.controls; let i=index\">\r\n                          <td>\r\n                            <span>{{fieldName.get('ProductName').value}}</span>\r\n                          </td>\r\n\r\n                          <td>\r\n                            <div class=\"input-group align-items-center\">\r\n                              <input type=\"text\" placeholder=\"Enter Purchase Amount\" class=\"form-control\" readonly maxlength=\"50\" formControlName=\"PurchasePrice\" />\r\n                              <!--<a class=\"icon-text-center ml-2\" href=\"javscript:;\" (click)=\"openPriceBookListPopup(fieldName.get('id').value,i)\">\r\n                                <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\r\n                              </a>-->\r\n                            </div>\r\n                          </td>\r\n                          <td>\r\n                            <div class=\"input-group align-items-center\">\r\n                              <input type=\"text\" placeholder=\"Enter Sale Price\" class=\"form-control\" maxlength=\"50\" formControlName=\"SalePrice\" />\r\n                             \r\n                            </div>\r\n                          </td>\r\n                          <td>\r\n                            <div class=\"form-group\">\r\n                              <input type=\"text\" placeholder=\"Enter Quality\" class=\"form-control\" maxlength=\"50\" formControlName=\"Quantity\"\r\n                                     [ngClass]=\"{'is-invalid': (fieldName.get('Quantity').invalid && (fieldName.get('Quantity').dirty || fieldName.get('Quantity')?.touched) && fieldName.get('Quantity').errors?.required) }\" />\r\n                            </div>\r\n                          </td>\r\n                          <td>\r\n                            <div class=\"form-group\">\r\n                              <input type=\"text\" placeholder=\"Enter Discount\" class=\"form-control\" maxlength=\"50\" formControlName=\"Discount\"\r\n                                     [ngClass]=\"{'is-invalid': (fieldName.get('Discount').invalid && (fieldName.get('Discount').dirty || fieldName.get('Discount')?.touched) && fieldName.get('Discount').errors?.required) }\" />\r\n                            </div>\r\n                          </td>\r\n                          <td>\r\n                            <div class=\"form-group\">\r\n                              <input type=\"text\" placeholder=\"Enter Line Item Description\" class=\"form-control\" maxlength=\"50\" formControlName=\"LineItemDiscount\"\r\n                                     [ngClass]=\"{'is-invalid': (fieldName.get('LineItemDiscount').invalid && (fieldName.get('LineItemDiscount').dirty || fieldName.get('LineItemDiscount')?.touched) && fieldName.get('LineItemDiscount').errors?.required) }\" />\r\n\r\n                              <input type=\"hidden\" class=\"form-control\" maxlength=\"50\" formControlName=\"PriceBookID\" />\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                      </tbody>\r\n                    </table>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n\r\n          <div class=\"modal-footer\">\r\n            <a href=\"javascript:void(0);\" class=\"btn btn-secondary mr-1\" (click)=\"previous()\"><i class=\"fa fa-angle-double-left\"></i> Prevoius</a>\r\n            <a href=\"javascript:void(0);\" class=\"btn btn-primary px-4 mr-1\" (click)=\"SaveLineItem()\">Save <i class=\"fa fa-angle-double-right\"></i></a>\r\n            <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div *ngIf=\"isEditLineItem\">\r\n        <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:600px; overflow-y:auto;\">\r\n          <div class=\"row\">\r\n            <form [formGroup]=\"editLineItem\" autocomplete=\"off\">\r\n              <div class=\"col-md-12\">\r\n                <!--<h4>if would like Enerflo to automatically find the best apt time based on availalility.</h4>-->\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Line Item Number:</b></label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"form-control bg-light\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                        {{editLineItemData.lineItemId}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Proposal Name:</b></label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"form-control bg-light\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                        {{editLineItemData.proposalName}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Product:</b></label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"form-control bg-light\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                        {{editLineItemData.ProductName}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Product Family:</b></label>\r\n                    <div class=\"form-group\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                      <input type=\"text\" placeholder=\"Enter Product Family\" formControlName=\"ProductFamily\" class=\"form-control\" maxlength=\"50\" />\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Line Item Description:</b></label>\r\n                    <div class=\"form-group\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                      <input type=\"text\" placeholder=\"Enter Line Item Description\" formControlName=\"LineItemDescription\" class=\"form-control\" maxlength=\"50\" />\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Automation Id:</b></label>\r\n                    <div class=\"form-group\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                      <input type=\"text\" placeholder=\"Enter Automation Id\" formControlName=\"AutomationId\" class=\"form-control\" maxlength=\"50\" />\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>System Size(KW):</b></label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" placeholder=\"Enter System Size(KW)\" formControlName=\"SystemSize\" class=\"form-control\" maxlength=\"50\" />\r\n                      <small *ngIf=\"SystemSize.invalid && (SystemSize.dirty || SystemSize.touched) && SystemSize.errors?.pattern\"\r\n                             class=\"text-danger\">Please enter valid System Size(KW).</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                  </div>\r\n\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Commissionable Percentage:</b></label>\r\n                    <div class=\"form-group\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                      <input type=\"text\" placeholder=\"Enter Commissionable Percentage (0.00%)\" formControlName=\"CommissionablePercentage\" class=\"form-control\" maxlength=\"50\"\r\n                             [ngClass]=\"{'is-invalid': (CommissionablePercentage.invalid && (CommissionablePercentage.dirty || CommissionablePercentage.touched)\r\n                             && (CommissionablePercentage.errors?.required || CommissionablePercentage.errors?.maxlength)) }\">\r\n\r\n                      <small *ngIf=\"CommissionablePercentage.invalid && (CommissionablePercentage.dirty || CommissionablePercentage.touched) && CommissionablePercentage.errors?.required\"\r\n                             class=\"text-danger\">Commissionable Percentage is required</small>\r\n                      <small *ngIf=\"CommissionablePercentage.invalid && (CommissionablePercentage.dirty || CommissionablePercentage.touched) && CommissionablePercentage.errors?.pattern\"\r\n                             class=\"text-danger\">Please enter valid Commissionable Percentage.</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Commissionable Amount:</b></label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"form-control  bg-light\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                        {{editLineItemData.CommissionableAmount}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                  </div>\r\n\r\n                  <div class=\"col-sm-12 col-lg-12 mt-3\">\r\n                    <h3 class=\"form-heading\">\r\n                      <span>Pricing Waterfall</span>\r\n                    </h3>\r\n                  </div>\r\n\r\n\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Purchase Price:</b></label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"form-control bg-light\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                        {{editLineItemData.PurchasePrice}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Pricing Structure:</b></label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"form-control bg-light\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                        {{editLineItemData.PricingStructure}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Sale Price:<span class=\"text-danger\">*</span></b></label>\r\n                    <div class=\"form-group\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                      <input type=\"text\" placeholder=\"Enter Sale Price\" formControlName=\"SalePrice\" class=\"form-control\" maxlength=\"50\"\r\n                             [ngClass]=\"{'is-invalid': (SalePrice.invalid && (SalePrice.dirty || SalePrice.touched) && (SalePrice.errors?.required || SalePrice.errors?.maxlength)) }\">\r\n\r\n                      <small *ngIf=\"SalePrice.invalid && (SalePrice.dirty || SalePrice.touched) && SalePrice.errors?.required\"\r\n                             class=\"text-danger\">Sale Price is required</small>\r\n                      <small *ngIf=\"SalePrice.invalid && (SalePrice.dirty || SalePrice.touched) && SalePrice.errors?.pattern\"\r\n                             class=\"text-danger\">Please enter valid Free Sales price.</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Per Watt Price:</b></label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"form-control bg-light\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                        {{editLineItemData.PerWattPrice}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Quantity:<span class=\"text-danger\">*</span></b></label>\r\n                    <div class=\"form-group\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                      <input type=\"text\" placeholder=\"Enter Quantity\" formControlName=\"Quantity\" class=\"form-control\" maxlength=\"50\"\r\n                             [ngClass]=\"{'is-invalid': (Quantity.invalid && (Quantity.dirty || Quantity.touched) && (Quantity.errors?.required || Quantity.errors?.maxlength)) }\">\r\n\r\n                      <small *ngIf=\"Quantity.invalid && (Quantity.dirty || Quantity.touched) && Quantity.errors?.required\"\r\n                             class=\"text-danger\">Quantity is required</small>\r\n                      <small *ngIf=\"Quantity.invalid && (Quantity.dirty || Quantity.touched) && Quantity.errors?.pattern\"\r\n                             class=\"text-danger\">Please enter valid Quantity.</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Subtoal:</b></label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"form-control  bg-light\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                        {{editLineItemData.Subtotal}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                  </div>\r\n\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Discount:</b></label>\r\n                    <div class=\"form-group\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                      <input type=\"text\" placeholder=\"Enter Discount\" formControlName=\"Discount\" class=\"form-control\" maxlength=\"50\"\r\n                             [ngClass]=\"{'is-invalid': (Discount.invalid && (Discount.dirty || Discount.touched)\r\n                             && (Discount.errors?.required || Discount.errors?.maxlength)) }\">\r\n\r\n                      <small *ngIf=\"Discount.invalid && (Discount.dirty || Discount.touched) && Discount.errors?.required\"\r\n                             class=\"text-danger\">Discount is required</small>\r\n                      <small *ngIf=\"Discount.invalid && (Discount.dirty || Discount.touched) && Discount.errors?.pattern\"\r\n                             class=\"text-danger\">Please enter valid Discount.</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <label><b>Total Price:</b></label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"form-control  bg-light\" *ngIf=\"editLineItemData!=null && editLineItemData!='undefined'\">\r\n                        {{editLineItemData.TotalPrice}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n          <!--<a href=\"javascript:void(0);\" class=\"btn btn-secondary mr-1\" (click)=\"previous()\"><i class=\"fa fa-angle-double-left\"></i> Prevoius</a>-->\r\n          <!--<a href=\"javascript:void(0);\" class=\"btn btn-primary px-4 mr-1\" (click)=\"DiscountPrerequisitedocumentPrevioud()\">Prevoius <i class=\"fa fa-angle-double-right\"></i></a>-->\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"SaveEdit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n        </div>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n<app-pricebooklistpopup #PriceBookListModelPopup></app-pricebooklistpopup>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/proposallist.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/proposallist.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Proposal</strong><p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Proposal</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-7 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield \">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-md-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <a class=\"btn btn-white mr-1 \" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n                <div class=\"d-inline-block align-middle pl-3\">\r\n                  <label class=\"d-inline-block\"><b>Search in all records</b></label>\r\n                  <div class=\"form-group d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <input type=\"checkbox\" id=\"allRecords\" [checked]=\"myCheckbox\" (click)=\"switchClicked($event)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-5\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0\">\r\n                <ng-select [items]=\"pagedData.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i> </span></a>\r\n              <!--*ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag'--> <a routerLink=\"/proposal-list/addproposal\" class=\"btn btn-success form-btns  mr-1\" tooltip=\" Add Proposal\"><i class=\"fa fa-plus\"></i></a>\r\n              <a class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n     \r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n       \r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'Name'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/proposal-list/viewproposal',row.ProposalId]\" href=\"javascript:;\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n              <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                <span class=\"status-box bg-success\" *ngIf=\"row[col.COLUMN_NAME] == true\">Enabled</span>\r\n                <span class=\"status-box bg-danger\" *ngIf=\"row[col.COLUMN_NAME] == false\">Disabled</span>\r\n              </div>\r\n              <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE=='date'\">\r\n                {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n              </div>\r\n              <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.COLUMN_NAME!= 'Name' && col.DATA_TYPE!='bit' && col.FieldType != 'select'\">\r\n                {{row[col.COLUMN_NAME] }}\r\n              </div>\r\n              <div *ngIf=\"col.FieldType == 'select'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                  {{row[col.COLUMN_NAME] }}\r\n                </div>\r\n                <div *ngIf=\"col.FieldFrom==null\">\r\n                  <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                    <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                      {{itemColorCode.color}}\r\n                    </div>\r\n                    <div *ngIf=\"itemColorCode.colorkey!=undefined\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                      {{itemColorCode.color}}\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.ProposalId\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.ProposalId}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <a class=\"actions-onclick view-list\" [routerLink]=\"['/proposal-list/viewproposal',row.ProposalId]\" title=\"View Detail\"><i class=\"fa fa-eye mr-2\"></i></a>\r\n                    <a  class=\"actions-onclick view-list\" [routerLink]=\"['/proposal-list/editproposal',row.ProposalId]\" title=\"Edit\"><i class=\"fa fa-pencil text-success mr-2\"></i></a>\r\n                    <a class=\"actions-onclick view-list\"  title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:;\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      \r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loading\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"crm\" subModuleName=\"proposal\"></app-searchfilteradd>\r\n<app-manageviewnew #templateManageView (customViewid)=\"GetcustomViewid($event)\" moduleName=\"crm\" subModuleName=\"proposal\"></app-manageviewnew>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/proposalview.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/proposalview.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\n  <h2 class=\"float-left pr-2\"><strong>Proposal Detail</strong></h2>\n  <div class=\"breadcrumb-wrapper\">\n    <ol class=\"breadcrumb\">\n      <li><a routerLink=\"/dashboard\">Home</a></li>\n      <li><a routerLink=\"/proposal-list\">Proposal</a></li>\n      <li class=\"active\">Proposal Detail</li>\n    </ol>\n  </div>\n\n</div>\n<div class=\"clearfix\"></div>\n\n<div class=\"card mb-4 mt-1 border-0\" style=\"background:none;\">\n  <div class=\"card-body p-0\">\n    <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\n      <li class=\"nav-item\" *ngFor=\"let  c of stagelist; let i=index\">\n        <a *ngIf=\"c.activeTab==1\" class=\"nav-link active\" (click)=\"tabclick(c.stageid)\" data-toggle=\"tab\" href=\"javascript:void(0);\" role=\"tab\" aria-controls=\"sales\" aria-selected=\"false\"><span class=\"circle\">{{c.rowNo1}}</span> {{c.stageName}}</a>\n        <a *ngIf=\"c.activeTab!=1\" class=\"nav-link\" (click)=\"tabclick(c.stageid)\" data-toggle=\"tab\" href=\"javascript:void(0);\" role=\"tab\" aria-controls=\"sales\" aria-selected=\"false\"> <span class=\"circle\">{{c.rowNo1}}</span> {{c.stageName}}  </a>\n\n\n\n      </li>\n\n    </ul>\n    <div class=\"tab-content bg-white p-0\" id=\"myTabContent\">\n      <div class=\"tab-pane fade show active p-0\" id=\"operation\" role=\"tabpanel\" aria-labelledby=\"contact-tab\">\n        <div class=\"card-body timeline\">\n          <div class=\"owl-carousel step lead-step owl-loaded owl-drag\">\n            <div class=\"owl-stage-outer\">\n              <div class=\"owl-stage\" style=\"transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width:100%;\">\n                <div class=\"owl-item active\" style=\"width:100%; display: flex; flex-wrap: nowrap;\">\n                  <li class=\"step-item\" *ngFor=\"let  c of oplist\">\n                    <!--<a href=\"javascript:void(0);\"><span  class=\"step-no step-green\"> <i class=\"fa fa-check\"></i> </span></a><br>-->\n                    <a href=\"javascript:void(0);\" *ngIf=\"c.StageOperationStatus == 'InProgress'; else elseCase\" (click)=\"updateStage(c.subStageId)\">\n                      <span [ngClass]=\"{'step-no step-default':true,'step-default' : c.StageOperationStatus == 'NotStarted',' step-green': c.StageOperationStatus =='Completed' ,'step-dark' :c.StageOperationStatus == 'InProgress'}\">\n                        <i *ngIf=\"c.StageOperationStatus =='Completed'\" class=\"fa fa-check\"></i>\n                        <i *ngIf=\"c.StageOperationStatus !='Completed'\">{{c.RowNo1}}</i>\n                        <!--<i [ngClass]=\"{'step-default' : c.StageOperationStatus == 'NotStarted',' fa fa-check': c.StageOperationStatus =='Completed' ,'step-dark' :c.StageOperationStatus == 'In-Progress'}\">     </i>-->\n                      </span>\n                    </a>\n                    <ng-template #elseCase>\n\n                      <a>\n                        <span [ngClass]=\"{'step-no step-default':true,'step-default' : c.StageOperationStatus == 'NotStarted',' step-green': c.StageOperationStatus =='Completed' ,'step-dark' :c.StageOperationStatus == 'InProgress'}\">\n                          <i *ngIf=\"c.StageOperationStatus =='Completed'\" class=\"fa fa-check\"></i>\n                          <i *ngIf=\"c.StageOperationStatus !='Completed'\">{{c.RowNo1}}</i>\n                          <!--<i [ngClass]=\"{'step-default' : c.StageOperationStatus == 'NotStarted',' fa fa-check': c.StageOperationStatus =='Completed' ,'step-dark' :c.StageOperationStatus == 'In-Progress'}\">     </i>-->\n                        </span>\n                      </a>\n\n                    </ng-template>\n                    <br />\n                    <span class=\"step-name\">{{c.subStageName}}</span>\n                    <!--<a >{{c.subStageName}}</a>-->\n                    <span class=\"step-date\"> {{c.dateshow}} {{c.diff}}</span>\n                  </li>\n                </div>\n\n              </div>\n            </div>\n            <div class=\"owl-nav disabled\">\n              <button type=\"button\" role=\"presentation\" class=\"owl-prev disabled\">\n                <span aria-label=\"Previous\">‹</span>\n              </button>\n              <button type=\"button\" role=\"presentation\" class=\"owl-next disabled\"><span aria-label=\"Next\">›</span></button>\n            </div><div class=\"owl-dots disabled\"><button role=\"button\" class=\"owl-dot active\"><span></span></button></div>\n          </div>\n        </div>\n        <!--<div class=\"tab_foot border-top\">\n          <ul>\n            <li><b>Work Order:</b> {{workorder}}  &nbsp;&nbsp;| &nbsp;&nbsp;  <b>Work Order Date:</b> {{workorderDate}}</li>\n            <li>Status: {{status}}|  Sub-Staus: HOA  | 3 Days</li>\n            <li><a href=\"#\" class=\"btn btn-success text-right\">Update Status</a></li>\n          </ul>\n        </div>-->\n      </div>\n      <div class=\"tab-pane fade \" id=\"closed\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\n        <div class=\"row\">\n          <div class=\"col-md-3\">\n            <div class=\"p-4\">Coming Soon</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"card mb-3 mt-3\">\n  <div class=\"card-body\">\n    <div class=\"row\">\n      <div class=\"col-md-8\">\n        <div class=\"border h-100\">\n          <div class=\"detail-heading cust_infobx px-3 py-2\">\n            <ul class=\"d-flex list_spc\">\n              <li><i class=\"fa fa-phone\"></i> N/A </li>\n              <li><i class=\"fa fa-envelope\"></i> N/A</li>\n              <!--<li><i class=\"fa fa-map-marker\"></i> {{Address}} </li>-->\n            </ul>\n          </div>\n\n          <div class=\"px-3 py-3\">\n            <div class=\"row\">\n\n              <div class=\"col-md-12\">\n                <div class=\"row\">\n                  <div class=\"col-3 mb-3\">Sub Stage Name:</div>\n                  <div class=\"col-3 mb-3\"><b>N/A</b></div>\n                  <div class=\"col-3 mb-3\">Created By:</div>\n                  <div class=\"col-3 mb-3\"><b>N/A</b></div>\n                  <div class=\"col-3 mb-3\">Created on:</div>\n                  <div class=\"col-3 mb-3\"><b>N/A</b></div>\n                  <div class=\"col-3 mb-3\">Location:</div>\n                  <div class=\"col-3 mb-3\"><b>N/A</b></div>\n                </div>\n              </div>\n\n              <!--<div class=\"col-md-6 text-center\">\n                <div class=\"row\">\n\n                </div>\n              </div>-->\n              <div class=\"col-md-12 mt-3 \">\n                <!--<a href=\"#\" class=\"btn btn-light-blue mr-2 px-4\" style=\"padding-left: 5px;\"><i class=\"fa fa-external-link\"></i> View Portal</a>\n                <a href=\"#\" class=\"btn btn-blue mr-2 px-4\"><i class=\"fa fa-phone\"></i> Call</a>-->\n                <a href=\"javascript:void(0);\" (click)=\"showemailpopup()\" class=\"btn btn-orange mr-2 px-4\"><i class=\"fa fa-envelope\"></i> Email</a>\n                <!--<a href=\"#\" class=\"btn btn-thin-blue mr-2 px-4\"><i class=\"fa fa-commenting\"></i> SMS</a>\n                <a href=\"#\" class=\"btn btn-green px-4\"><i class=\"fa fa-comments\"></i> Chat</a>-->\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-4\">\n        <!--<div class=\"mapbx\"><img class=\"img-fluid\" src=\"assets/images/map-img.jpg\" alt=\"map\"></div>-->\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div class=\"card mb-3\">\n  <div class=\"card-body\">\n    <div id=\"accordion\" class=\"panel-group\">\n      <!--productList Pannel-->\n      <div class=\"panel \">\n        <div class=\"panel-heading\">\n          <h4 class=\"panel-title\">\n            <a href=\"#panelBody1\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Proposal Line Item</span></a>\n          </h4>\n        </div>\n        <div id=\"panelBody1\" class=\"panel-collapse collapse \" style=\"\">\n          <a href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"GetProposalList()\" data-dismiss=\"modal\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Proposal Line Item</a>\n          <div class=\"panel-body\">\n            <div class=\"row\">\n              <div class=\"table-responsive\">\n                <div class=\"table table-striped\">\n                  <ngx-datatable #table class=\"bootstrap\"\n                                 [rows]=\"AssociatedproductpagedData.data\"\n                                 [scrollbarH]=\"true\"\n                       [rowHeight]=\"'40'\"\n                                 [columnMode]=\"'force'\"\n                                 [headerHeight]=\"40\"\n                                 [footerHeight]=\"40\"\n                                 \n                                 [externalPaging]=\"true\"\n                                 [externalSorting]=\"true\"\n                                 [loadingIndicator]=\"loadSave\"\n                                 [count]=\"AssociatedproductpagedData.pager.totalItems\"\n                                 [offset]=\"AssociatedproductpagedData.pager.currentPage\"\n                                 [limit]=\"AssociatedproductpagedData.pager.pageSize\"\n                                 (page)='setPageAssociateProduct($event)'\n                                 (sort)=\"onSort($event)\">\n\n\n\n                    <ngx-datatable-column name=\"Product Name\" sortable=\"True\" prop=\"ProductName\">\n                    </ngx-datatable-column>\n\n                    <ngx-datatable-column name=\"Product Family\" sortable=\"True\" prop=\"ProductFamily\"></ngx-datatable-column>\n                    <ngx-datatable-column name=\"Product Code\" sortable=\"True\" prop=\"ProductCode\"></ngx-datatable-column>\n                    <ngx-datatable-column name=\"Purchase Price\" sortable=\"True\" prop=\"PurchasePrice\"></ngx-datatable-column>\n                    <ngx-datatable-column name=\"Sale Price\" sortable=\"True\" prop=\"SalePrice\"></ngx-datatable-column>\n                    <ngx-datatable-column name=\"Discount(%)\" sortable=\"True\" prop=\"Discount\"></ngx-datatable-column>\n                    <ngx-datatable-column name=\"Line Item Discription\" sortable=\"True\" prop=\"LineItemDiscription\">\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                        {{row.LineItemDiscription | truncate : 50}}\n                      </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                        <div class=\"text-center\">\n                          <a href=\"javascript:void(0);\" (click)=\"editProduct(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\n                          <a (click)=\"deleteAssociateproduct(row)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\n                        </div>\n\n                      </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-footer>\n                      <ng-template ngx-datatable-footer-template\n                                   let-rowCount=\"rowCount\"\n                                   let-pageSize=\"pageSize\"\n                                   let-selectedCount=\"selectedCount\"\n                                   let-currentPage=\"currentPage\"\n                                   let-offset=\"offset\"\n                                   let-isVisible=\"isVisible\">\n                        <div class=\"page-count\" style=\"max-width:170px;\">\n                          Total Records: {{rowCount}}\n                        </div>\n                        <div>\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSizeAssociateProduct\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\"\n                                         [clearable]=\"false\" (change)=\"onChangeAssociateProduct($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\n                            </span>\n                          </div>\n                        </div>\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\n                                         [page]=\"AssociatedproductpagedData.pager.currentPage+1\"\n                                         [size]=\"pageSizeValue\"\n                                         [count]=\"AssociatedproductpagedData.pager.totalItems\"\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\n                                         (change)=\"setPageAssociateProduct($event)\">\n                        </datatable-pager>\n                      </ng-template>\n                    </ngx-datatable-footer>\n                  </ngx-datatable>\n                </div>\n              </div>\n\n\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div class=\"card mb-3\">\n  <div class=\"card-body\">\n    <div id=\"accordion1\" class=\"panel-group\">\n      <!--productList Pannel-->\n      <div class=\"panel \" *ngFor=\"let item of formControlList; let i=index;\">\n        <div class=\"panel-heading\">\n          <h4 class=\"panel-title\">\n            <a href=\"#panelBody1{{i}}\" class=\"accordion-toggle collapsed \" data-toggle=\"collapse\" data-target=\"#panelBody1{{i}}\"><span> {{item.group_display_name}}</span></a>\n          </h4>\n        </div>\n        <div id=\"panelBody1{{i}}\" class=\"collapse \" data-parent=\"#accordion1\">\n          <div class=\"panel-body\">\n            <div class=\"row  mb-2\">\n              <ng-container *ngFor=\"let inner of item.InnerData\">\n                <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\n                             inner.layout_type =='four' }\"\n                     ngShow=\"inner.dependent_show_type == true\">\n                  <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\"></span></label>\n                  &nbsp;<label *ngIf=\"inner.value!=null\"><b>{{inner.value}}</b></label>\n                  &nbsp;<label *ngIf=\"inner.value==null || inner.value==''\"><b>N/A</b></label>\n                </div>\n              </ng-container>\n            </div>\n            </div>\n          </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<app-proposallineitempopup #proposalpopup (lineItem)=\"lineItem()\"></app-proposallineitempopup>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/viewProposalNew.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/viewProposalNew.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Proposal Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/proposal-list\">Manage Proposal</a></li>\r\n      <li class=\"active\">Proposal Detail</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-3 mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-user-circle-o text-dark float-left mr-2\" style=\"font-size:27px;\"></i>\r\n    <span class=\"float-left w-85-res\" style=\"font-size:18px;\">{{LeadFirstName}} {{LeadLastName}}</span>\r\n    <span class=\"cntnt-right-btn mr15 btn-iconres\">\r\n      <a href=\"javascript:void(0);\" [routerLink]=\"['/proposal-list/editproposal',Id]\" class=\"btn btn-success text-white mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n\r\n  <div class=\"col-12 float-left py-resp p-0 py-2 py-sm-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n      <div *ngIf=\"item.ColumnName!='Name' && item.ColumnName!='Name'\" class=\"col py-2\">\r\n        <span *ngIf=\"item.field_route==null\" class=\"d-block\"><strong>{{ item.display_name}}:</strong> {{ item.value}}</span>\r\n        <span *ngIf=\"item.field_route!=null\" class=\"d-block\"><strong>{{ item.display_name}}:</strong> <a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\"> {{ item.value}}</a></span>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<app-stagemanagement [submoduleName]=\"submoduleName\" [moduleName]=\"moduleName\" (newItemEvent)=\"addItem($event)\"></app-stagemanagement>\r\n\r\n\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:none\">\r\n\r\n  \r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n\r\n  <div class=\"col-lg-12\">\r\n    <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-12 col-lg-8\">\r\n          <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#proposalLineItems\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Proposal Line Items ({{countLineItems}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"proposalLineItems\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <!--<a href=\"javascript:;\" class=\"btn-in-panel\" (click)=\"openProposalLineItemPopup()\"><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Add Products</span></a>-->\r\n                  <!--<a href=\"javascript:;\" class=\"btn-in-panel\" (click)=\"openEditProposalLineItemPopup()\"><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Edit Products</span></a>-->\r\n                  <div class=\"panel-body row px-3\">\r\n                    <div class=\"table-responsive\">\r\n                      <div class=\"table table-striped\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstLineItems.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loading\"\r\n                                       [count]=\"lstLineItems.pager.totalItems\"\r\n                                       [offset]=\"lstLineItems.pager.currentPage\"\r\n                                       [limit]=\"lstLineItems.pager.pageSize\"\r\n                                       (page)='setLineItemsPageNo($event)'\r\n                                       (sort)=\"onLineItemSort($event)\">\r\n\r\n                          <ngx-datatable-column name=\"Product\" prop=\"Product\" sortable=\"true\">\r\n\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Line Items Description\" sortable=\"true\" prop=\"LineItemDiscription\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <div *ngIf=\"row.LineItemDiscription!=null && row.LineItemDiscription!=''\">\r\n                                <span>{{row.LineItemDiscription}}</span>\r\n                              </div>\r\n                              <div *ngIf=\"row.LineItemDiscription==null || row.LineItemDiscription==''\">\r\n                                <span>N/A</span>\r\n                              </div>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Sales Price\" sortable=\"true\" prop=\"SalePrice\">\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Quantity\" sortable=\"true\" prop=\"Quantity\">\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Total Price\" sortable=\"true\" prop=\"TotalPrice\">\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Action\" sortable=\"false\" headerClass=\"text-center\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <div class=\"text-center\">\r\n                                <!--<a href=\"javascript:void(0);\" (click)=\"EditLIneItems(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-secondary pr-2\"></i></a>-->\r\n                                <a href=\"javascript:;\" (click)=\"deleteProposallineitem(row.Id)\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                              </div>\r\n\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"LineItempagedData.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                                <!--Showing {{(lstLineItems.pager.currentPage+1 - 1 )* lstLineItems.pager.pageSize + 1}}  to {{((lstLineItems.pager.currentPage + 1) * lstLineItems.pager.pageSize)}} out of {{rowCount}}  enteries-->\r\n                                {{commonService.PageString(lstLineItems.pager.currentPage+1,lstLineItems.pager.pageSize,rowCount)}}\r\n\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstLineItems.pager.currentPage\"\r\n                                               [size]=\"pageSize\"\r\n                                               [count]=\"lstLineItems.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                               (change)=\"setLineItemsPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <form [formGroup]=\"form\" *ngIf=\"form\">\r\n\r\n\r\n\r\n                <ng-container *ngFor=\"let item of formControlList\">\r\n                  <div class=\"panel active\">\r\n                    <div class=\"panel-heading\">\r\n                      <h4 class=\"panel-title\">\r\n                        <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                          <span> {{item.group_name}}</span>\r\n                        </a>\r\n                      </h4>\r\n                    </div>\r\n                    <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                      <div class=\"panel-body row px-0 mt-0\">\r\n                        <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                          <div class=\"input-group border-bottom h-100\">\r\n                            <div class=\"col-sm-12 col-md-6 px-0\">\r\n                              <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                            </div>\r\n                            <div class=\"col-sm-12 col-md-6  px-0 px-md-2 align-items-center\">\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null && inner.dt_code!='select' && inner.dt_code != 'map'\r\n                               && inner.dt_code != 'image'  && inner.dt_code != 'imageurl'\"\r\n                                    class=\"py-2 d-block\" style=\"word-break:break-all;\">{{ inner.value}}</span>\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null && inner.dt_code!='select' && inner.dt_code != 'map'\"\r\n                                    class=\"py-2 d-block\" style=\"word-break:break-all;\">\r\n                                <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                              </span>\r\n\r\n                              <div class=\"top\" *ngIf=\"inner.dt_code == 'imageurl'\" style=\"word-break:break-all;\">\r\n                                <!--<div [innerHTML]=\"inner.value\"></div>-->\r\n                                <a href=\"{{inner.value}}\" style=\"height:50px;width:50px\" target=\"_blank\">{{inner.value |truncate }}</a>'\r\n                              </div>\r\n                              <div class=\"top\" *ngIf=\"inner.dt_code == 'image'\" style=\"word-break:break-all;\">\r\n                                <div [innerHTML]=\"inner.value\"></div>\r\n                              </div>\r\n\r\n                              <div class=\"top\" *ngIf=\"inner.dt_code == 'map_search' && displayType == 'ADD'\">\r\n                                <a (click)=\"mapPopUP()\" href=\"javascript:void(0);\" class=\"btn btn-info\"><i class=\"fa fa-search mr-2\"></i> Search Location</a>\r\n                              </div>\r\n\r\n                              <span *ngIf=\"inner.dt_code == 'select'\">\r\n                                <span *ngIf=\"inner.FieldFrom !=null\">\r\n                                  {{inner.value }}\r\n                                </span>\r\n                                <span *ngIf=\"inner.FieldFrom==null\">\r\n                                  <span *ngFor=\"let itemColorCode of getListingColorCode(inner.value);\">\r\n                                    <span *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                                      {{itemColorCode.color}}\r\n                                    </span>\r\n                                    <span *ngIf=\"itemColorCode.colorkey!=undefined\" style=\"max-width:150px !important;\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                                      {{itemColorCode.color}}\r\n                                    </span>\r\n                                  </span>\r\n                                </span>\r\n                              </span>\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch  mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n\r\n                          </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n                          <!--<div class=\"w-100\" ngShow=\"inner.dependent_show_type == true\">\r\n                <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO'\" />\r\n                <label *ngIf=\"inner.form_field_visibility == 'YES'\"><b>{{ inner.display_name}}:</b></label>\r\n                <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES'\">\r\n                  <div class=\"form-control border-0 p-0\">\r\n                    <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean'\">{{inner.value}}</span>-->\r\n                          <!--============================== For CheckBox ===========================-->\r\n                          <!--<div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch mb-0\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>-->\r\n                          <!--============================================================================-->\r\n                          <!--============================== For Boolean ===========================-->\r\n                          <!--<div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch  mb-0\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>-->\r\n                          <!--============================================================================-->\r\n                          <!--</div>\r\n                  </div>\r\n                </div>-->\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ng-container>\r\n              </form>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm-12 col-lg-4 relatedtab\">\r\n          <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <app-files title=\"Files\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{proposalId}}\"></app-files>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n          \r\n\r\n<app-proposallineitempopup #proposalpopup></app-proposallineitempopup>\r\n");

/***/ }),

/***/ "./src/app/views/proposal/addeditproposal.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/views/proposal/addeditproposal.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Byb3Bvc2FsL2FkZGVkaXRwcm9wb3NhbC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/proposal/addeditproposal.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/proposal/addeditproposal.component.ts ***!
  \*************************************************************/
/*! exports provided: AddeditproposalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditproposalComponent", function() { return AddeditproposalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _proposallist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./proposallist.service */ "./src/app/views/proposal/proposallist.service.ts");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
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







var AddeditproposalComponent = /** @class */ (function () {
    function AddeditproposalComponent(fb, proposalService, router, toaster, route, commonService) {
        var _this = this;
        this.fb = fb;
        this.proposalService = proposalService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.config = [];
        this.moduleName = 'crm';
        this.submoduleName = 'proposal';
        this.loadSave = false;
        this.Id = '';
        this.OpportunityId = '';
        this.isLead = false;
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _proposallist_service__WEBPACK_IMPORTED_MODULE_5__["JsonData"]();
        //modulePermission: ModuleList;
        this.modulePermission = [];
        this.len = 10;
        this.displayType = 'ADD';
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
            _this.userName = userdetail.firstName + ' ' + userdetail.lastName;
        });
        var priviledgeCode = this.route.snapshot.data.privilegeCode;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase(); });
        if (add == undefined) {
            this.addOrUpdatePermission = true;
        }
        else {
            this.addOrUpdatePermission = true;
        }
        this.timeFormat = this.commonService.getTimeFormat();
    }
    AddeditproposalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var opid = params.get('opid');
            var id = params.get('id');
            if (_this.commonService.getQueryStringValue("proposal") != null)
                id = _this.commonService.getQueryStringValue("proposal");
            if (opid != null)
                _this.OpportunityId = opid;
            _this.loadSave = true;
            if (id) {
                _this.Id = id;
                _this.isLead = true;
                _this.pageTitle = 'Edit Proposal';
                _this.displayType = 'EDIT';
            }
            else {
                _this.pageTitle = 'Add Proposal';
                _this.displayType = 'ADD';
            }
        });
        this.proposalService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.OpportunityId, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.proposalService.customFieldsList.data;
                // console.log("this.customCompnentValues", this.customCompnentValues);
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _proposallist_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
                var convertdatetime_1 = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_6__["DateTimeToLocalForAddEditPipe"]();
                _this.customCompnentValues.forEach(function (cnt) {
                    var val = null;
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    //////else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
                    //////  if (cnt.value == "") {
                    //////    val = null;
                    //////  } else {
                    //////    let val1 = new Date(cnt.value);
                    //////    val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
                    //////  }
                    //////}
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
                    if (_this.OpportunityId > 0 && cnt.name == 'OpportunityId') {
                        cnt.is_required = true;
                        val = _this.OpportunityId;
                    }
                    if (_this.OpportunityId > 0 && cnt.name == 'AccountId') {
                        val = cnt.select_options[0].value;
                        cnt.is_required = true;
                    }
                    //if ( cnt.name == 'OwnerId') {
                    //  val = this.userName;
                    //}
                    if (cnt.dt_code == 'map') {
                        debugger;
                        var baseUrl = cnt.value;
                        var body = cnt.value;
                        body = body.replace(/href/g, "value");
                        body = body.replace(new RegExp(baseUrl, 'g'), "");
                        debugger;
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
        });
    };
    AddeditproposalComponent.prototype.checkvalue = function (formvalues, selval) {
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
    AddeditproposalComponent.prototype.test = function (e) {
        // console.log('sssss', e);
        e.stopPropagation();
        e.preventDefault();
    };
    AddeditproposalComponent.prototype.OnCheck = function () {
        // console.log(this.form);
    };
    AddeditproposalComponent.prototype.onSubmit = function () {
        var _this = this;
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
            this.JsonData.Id = this.Id;
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
            this.proposalService.addEditForm(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
                    //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                    //// console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
                    //this.toaster.success(result.responseMessage);
                    setTimeout(function () {
                        _this.toaster.success(result.responseMessage);
                        _this.loadSave = false;
                        if (_this.OpportunityId > 0) {
                            _this.router.navigateByUrl("/opportunity/view/" + _this.OpportunityId);
                        }
                        else {
                            _this.router.navigateByUrl("/proposal-list");
                        }
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
    AddeditproposalComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
    };
    AddeditproposalComponent.prototype.close = function () {
        if (this.OpportunityId > 0) {
            this.router.navigateByUrl("/opportunity/view/" + this.OpportunityId);
        }
        else {
            this.router.navigateByUrl("/proposal-list");
        }
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
    AddeditproposalComponent.prototype.fillLeadForm = function (id) {
        var _this = this;
        this.proposalService.GetDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe(function (result) {
            // // console.log("result1212", this.leadService.leadEditPage.data[0]);
            var edit;
            edit = _this.proposalService.editPage.data[0];
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
                // console.log("formGroup", this.form.value);
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditproposalComponent.prototype.MakeArray = function (value, type) {
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
    AddeditproposalComponent.prototype.MakeNormalArray = function (value) {
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
    AddeditproposalComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
            //objItem.select_options = array;
        }
        return array;
    };
    AddeditproposalComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        // console.log('new', e);
        //const index2: number = this.formControlList.indexOf(groupdisp);
        //const index1: number = controldisp.display_order;
        var checkboxdatanew = new _proposallist_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
    AddeditproposalComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    AddeditproposalComponent.prototype.fetchMore = function (dataList, j) {
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
    AddeditproposalComponent.prototype.onKey = function (e, dataList, j) {
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
    AddeditproposalComponent.prototype.onClearLang = function (dataList, j) {
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
    AddeditproposalComponent.prototype.getreturnNumber = function (x, y) {
        return x + y;
    };
    AddeditproposalComponent.prototype.getInnervalue = function (data) {
        var variable = data.substring(data.indexOf("\""));
        console.log("variable", variable);
        return variable;
    };
    AddeditproposalComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _proposallist_service__WEBPACK_IMPORTED_MODULE_5__["ProposallistService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    AddeditproposalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditproposal',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditproposal.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/addeditproposal.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditproposal.component.scss */ "./src/app/views/proposal/addeditproposal.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _proposallist_service__WEBPACK_IMPORTED_MODULE_5__["ProposallistService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], AddeditproposalComponent);
    return AddeditproposalComponent;
}());



/***/ }),

/***/ "./src/app/views/proposal/pricebooklistpopup/pricebooklistpopup.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/views/proposal/pricebooklistpopup/pricebooklistpopup.component.scss ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Byb3Bvc2FsL3ByaWNlYm9va2xpc3Rwb3B1cC9wcmljZWJvb2tsaXN0cG9wdXAuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/proposal/pricebooklistpopup/pricebooklistpopup.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/views/proposal/pricebooklistpopup/pricebooklistpopup.component.ts ***!
  \***********************************************************************************/
/*! exports provided: PricebooklistpopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PricebooklistpopupComponent", function() { return PricebooklistpopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _proposallist_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../proposallist.service */ "./src/app/views/proposal/proposallist.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
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




var PricebooklistpopupComponent = /** @class */ (function () {
    function PricebooklistpopupComponent(proposallistService) {
        this.proposallistService = proposallistService;
        this.PriceBookListResult = {
            pager: {},
            data: []
        };
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'createdOn';
        this.pageSizeValue = 10;
        this.loadSave = false;
    }
    PricebooklistpopupComponent.prototype.ngOnInit = function () {
    };
    PricebooklistpopupComponent.prototype.show = function (obj) {
        this.getPriceBookList(obj);
        //this.historyObject = historyObject;
        this.PriceBookListModelPopup.show();
    };
    PricebooklistpopupComponent.prototype.close = function () {
        this.PriceBookListModelPopup.hide();
    };
    PricebooklistpopupComponent.prototype.getPriceBookList = function (obj) {
        var _this = this;
        this.proposallistService.GetPriceBookListDetail(obj, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(function (response) {
            _this.PriceBookListResult = _this.proposallistService.pagedData;
            _this.loading = false;
            console.log("PriceBookListResult", _this.proposallistService.pagedData);
            setTimeout(function () {
                _this.table.recalculate();
                _this.table.recalculateColumns();
            }, 200);
        }, function (error) {
            _this.loading = false;
        });
    };
    PricebooklistpopupComponent.prototype.UpdateValueInListPrice = function (obj) {
        var ListPriceValue = obj.ListPrice;
        var PriceBookID = obj.PriceBookID;
        this.proposallistService.getListPrice.next(obj);
        this.PriceBookListModelPopup.hide();
    };
    PricebooklistpopupComponent.prototype.onSort = function (e) {
    };
    PricebooklistpopupComponent.prototype.setPage = function (e) {
    };
    PricebooklistpopupComponent.ctorParameters = function () { return [
        { type: _proposallist_service__WEBPACK_IMPORTED_MODULE_2__["ProposallistService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"])
    ], PricebooklistpopupComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('PriceBookListModelPopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], PricebooklistpopupComponent.prototype, "PriceBookListModelPopup", void 0);
    PricebooklistpopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pricebooklistpopup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./pricebooklistpopup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/pricebooklistpopup/pricebooklistpopup.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./pricebooklistpopup.component.scss */ "./src/app/views/proposal/pricebooklistpopup/pricebooklistpopup.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_proposallist_service__WEBPACK_IMPORTED_MODULE_2__["ProposallistService"]])
    ], PricebooklistpopupComponent);
    return PricebooklistpopupComponent;
}());



/***/ }),

/***/ "./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.scss ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Byb3Bvc2FsL3Byb2R1Y3RsaW5laXRlbXBvcHVwL3Byb3Bvc2FsbGluZWl0ZW1wb3B1cC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.ts ***!
  \****************************************************************************************/
/*! exports provided: ProposallineitempopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProposallineitempopupComponent", function() { return ProposallineitempopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _proposallist_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../proposallist.service */ "./src/app/views/proposal/proposallist.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _pricebooklistpopup_pricebooklistpopup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pricebooklistpopup/pricebooklistpopup.component */ "./src/app/views/proposal/pricebooklistpopup/pricebooklistpopup.component.ts");
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









var ProposallineitempopupComponent = /** @class */ (function () {
    function ProposallineitempopupComponent(fb, commonService, proposallistService, router, toaster, route) {
        this.fb = fb;
        this.commonService = commonService;
        this.proposallistService = proposallistService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.lineItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.AssociatedproductpagedData = {
            pager: {},
            data: []
        };
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["SelectionType"];
        this.objectname = '';
        this.selected = [];
        this.lineItemDiv = false;
        this.assignedData = [];
        this.listFilter = '';
        // sortColumn: any;
        this.sortDir = 'desc';
        this.sortColumn = 'createdOn';
        this.isEditLineItem = false;
        this.loading = false;
        this.loadSave = false;
        this.lineItemProductCal = false;
        this.pageSizeValue = 10;
        var moduleCode = this.route.snapshot.data.moduleCode;
        //this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    ProposallineitempopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPageSizes();
        this.initForm();
        this.initEditLineItemForm('');
        this.proposallistService.getListPrice.subscribe(function (s) {
            console.log('lineItemDisCount', s);
            _this.configurationSetings.get('lineItemDisCount').controls[_this.ListPriceIndex].patchValue({
                'PurchasePrice': s.ListPrice,
                'SalePrice': s.ListPrice,
                'PriceBookID': s.PriceBookID
            });
        });
    };
    ProposallineitempopupComponent.prototype.show = function (proposalId, opportunityId, row) {
        var _this = this;
        if (row != null && row != '') {
            this.isEditLineItem = true;
            this.proposalId = proposalId;
            this.LineItemId = row.lineItemId;
            this.opportunityId = opportunityId;
            this.loadSave = false;
            this.lineItemDiv = false;
            this.lineItemProductCal = false;
            this.editLineItemData = row;
            this.initEditLineItemForm(row);
            this.proposalpopup.show();
        }
        else {
            this.listNameFilter = '';
            this.proposalId = proposalId;
            this.lineItemDiv = true;
            this.isEditLineItem = false;
            this.lineItemProductCal = false;
            this.opportunityId = opportunityId;
            this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listNameFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
                _this.AssociatedproductpagedData = _this.proposallistService.pagedData;
                _this.getPageSizes();
                // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
                _this.proposalpopup.show();
            });
        }
    };
    ProposallineitempopupComponent.prototype.close = function () {
        this.selected = [];
        this.lineItemDiv = false;
        this.lineItemProductCal = false;
        var control2 = this.configurationSetings.controls.lineItemDisCount;
        control2.controls = [];
        this.proposalpopup.hide();
    };
    ProposallineitempopupComponent.prototype.searchProduct = function () {
        var _this = this;
        this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listNameFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.proposallistService.pagedData;
            _this.getPageSizes();
            // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
            //this.proposalpopup.show();
        });
    };
    ProposallineitempopupComponent.prototype.resetProduct = function () {
        var _this = this;
        this.listNameFilter = '';
        this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listNameFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.proposallistService.pagedData;
            _this.getPageSizes();
            // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
            //this.proposalpopup.show();
        });
    };
    ProposallineitempopupComponent.prototype.updateNameFilter = function (event) {
        this.listNameFilter = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.searchProduct();
        }
    };
    ProposallineitempopupComponent.prototype.setPageSalesList = function ($event) {
        var _this = this;
        this.loading = true;
        this.assignedData = [];
        var currentPageSalesUserList = $event.page - 1;
        //this.opportunityId = opportunityId;
        this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, currentPageSalesUserList, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.proposallistService.pagedData;
            // this.selected;
            for (var i = 0; i < _this.AssociatedproductpagedData.data.length; i++) {
                _this.selected.forEach(function (s) {
                    if (_this.AssociatedproductpagedData.data[i].id === s.id) {
                        _this.AssociatedproductpagedData.data[i] = s;
                    }
                });
            }
            //this.AssociatedproductpagedData = this.currentPageSalesUserList;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ProposallineitempopupComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.proposallistService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ProposallineitempopupComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
            _this.lstPageSizeBankerList = _this.commonService.masters;
        });
    };
    ProposallineitempopupComponent.prototype.onActivate = function (event) {
    };
    ProposallineitempopupComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.proposallistService.GetAssociateProductList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.proposallistService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ProposallineitempopupComponent.prototype.onSelect = function (_a) {
        var _b, _c;
        var selected = _a.selected;
        if (this.conId == "" || this.conId == null || this.conId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.conId += selected[i].id.toString() + ",";
                }
            }
        }
        else {
            this.conId = null;
            this.conId = "";
            this.selected.splice(0, this.selected.length);
            (_c = this.selected).push.apply(_c, selected);
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.conId += selected[i].id.toString() + ",";
                }
            }
        }
    };
    ProposallineitempopupComponent.prototype.Next = function () {
        if (this.selected.length != 0) {
            this.lineItemDiv = false;
            this.GetMasterPrerequisiteLoanProductDocumentType();
            this.lineItemProductCal = true;
        }
        else {
            this.toaster.error("Please select at least one product!");
        }
    };
    ProposallineitempopupComponent.prototype.previous = function () {
        var control2 = this.configurationSetings.controls.lineItemDisCount;
        control2.controls = [];
        this.lineItemDiv = true;
        this.lineItemProductCal = false;
    };
    Object.defineProperty(ProposallineitempopupComponent.prototype, "lineItemDisCount", {
        get: function () {
            return this.configurationSetings.get('lineItemDisCount');
        },
        enumerable: true,
        configurable: true
    });
    ProposallineitempopupComponent.prototype.initForm = function () {
        this.configurationSetings = this.fb.group({
            lineItemDisCount: this.fb.array([]),
        });
    };
    ProposallineitempopupComponent.prototype.GetMasterPrerequisiteLoanProductDocumentType = function () {
        var current = this;
        current.lineItemDisCount.reset();
        //this.loanproductService.getPrerequisiteLoanProductDocumentTypeNames('PrerequisiteLoanProductDocumentType').subscribe((result: any[]) => {
        this.selected.forEach(function (value) {
            var group = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](value.id),
                ProductName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](value.ProductName),
                PurchasePrice: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](value.PurchasePrice),
                SalePrice: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](value.SalePrice),
                Quantity: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                Discount: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
                LineItemDiscount: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
                PriceBookID: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
            });
            current.lineItemDisCount.push(group);
        });
        //});
    };
    ProposallineitempopupComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        //input.append('PriceBookID', this.priceBookID); 
        input.append('ProposalId', this.proposalId);
        input.append('opportunityId', this.opportunityId === 'undefined' ? '1002' : this.opportunityId);
        input.append('Fields', JSON.stringify(this.lineItemDisCount.value));
        console.log('Fields', this.lineItemDisCount.value);
        return input;
    };
    ProposallineitempopupComponent.prototype.SaveLineItem = function () {
        var _this = this;
        if (this.configurationSetings.valid) {
            this.loading = true;
            var lineItemModel = this.prepareFormDataForDocument();
            console.log("lineItemModel", lineItemModel);
            this.proposallistService.AddUpdateLineItem(lineItemModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.proposalpopup.hide();
                    _this.router.navigateByUrl("/proposal-list/view/" + _this.proposalId);
                    //this.SetStatusData(this.field);
                    _this.selected = [];
                    var control2 = _this.configurationSetings.controls.lineItemDisCount;
                    control2.controls = [];
                    _this.lineItem.emit();
                    setTimeout(function () { _this.loading = false; }, 3000);
                }
                else {
                    _this.loading = false;
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                _this.loading = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.configurationSetings);
        }
    };
    ProposallineitempopupComponent.prototype.initEditLineItemForm = function (row) {
        this.editLineItem = this.fb.group({
            lineItemId: [this.LineItemId, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            ProductFamily: [row.ProductFamily, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(255)]],
            LineItemDescription: [row.LineItemDiscription, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(500)]],
            AutomationId: [row.AutomationId, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            SystemSize: [row.SystemSize, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^[0-9]*$")]],
            CommissionablePercentage: [row.CommissionablePercentage, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            SalePrice: [row.SalePrice, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            Quantity: [row.Quantity, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^[0-9]*$"), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(5)]],
            Discount: [row.Discount, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")]],
        });
    };
    Object.defineProperty(ProposallineitempopupComponent.prototype, "lineItemId", {
        get: function () { return this.editLineItem.get('lineItemId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProposallineitempopupComponent.prototype, "ProductFamily", {
        get: function () { return this.editLineItem.get('ProductFamily'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProposallineitempopupComponent.prototype, "LineItemDescription", {
        get: function () { return this.editLineItem.get('LineItemDescription'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProposallineitempopupComponent.prototype, "AutomationId", {
        get: function () { return this.editLineItem.get('AutomationId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProposallineitempopupComponent.prototype, "SystemSize", {
        get: function () { return this.editLineItem.get('SystemSize'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProposallineitempopupComponent.prototype, "CommissionablePercentage", {
        get: function () { return this.editLineItem.get('CommissionablePercentage'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProposallineitempopupComponent.prototype, "SalePrice", {
        get: function () { return this.editLineItem.get('SalePrice'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProposallineitempopupComponent.prototype, "Quantity", {
        get: function () { return this.editLineItem.get('Quantity'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProposallineitempopupComponent.prototype, "Discount", {
        get: function () { return this.editLineItem.get('Discount'); },
        enumerable: true,
        configurable: true
    });
    ProposallineitempopupComponent.prototype.prepareFormDataForEditLineItem = function () {
        var input = new FormData();
        input.append('ProposalId', this.proposalId);
        input.append('lineItemId', this.LineItemId);
        input.append('opportunityId', this.opportunityId == 'undefined' ? '1002' : this.opportunityId);
        input.append('Fields', JSON.stringify(this.editLineItem.value));
        return input;
    };
    ProposallineitempopupComponent.prototype.SaveEdit = function () {
        var _this = this;
        if (this.editLineItem.valid) {
            this.loading = true;
            var lineItemModel = this.prepareFormDataForEditLineItem();
            this.proposallistService.AddUpdateLineItem(lineItemModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.proposalpopup.hide();
                    _this.editLineItem.reset();
                    _this.lineItem.emit();
                    _this.router.navigateByUrl("/proposal-list/view/" + _this.proposalId);
                    setTimeout(function () { _this.loading = false; }, 3000);
                }
                else {
                    _this.loading = false;
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                _this.loading = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.editLineItem);
        }
    };
    ProposallineitempopupComponent.prototype.openPriceBookListPopup = function (obj, i) {
        this.ListPriceIndex = i;
        this.PriceBookListModelPopup.show(obj);
    };
    ProposallineitempopupComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _proposallist_service__WEBPACK_IMPORTED_MODULE_4__["ProposallistService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('proposalpopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], ProposallineitempopupComponent.prototype, "proposalpopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('PriceBookListModelPopup', { static: false }),
        __metadata("design:type", _pricebooklistpopup_pricebooklistpopup_component__WEBPACK_IMPORTED_MODULE_8__["PricebooklistpopupComponent"])
    ], ProposallineitempopupComponent.prototype, "PriceBookListModelPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ProposallineitempopupComponent.prototype, "lineItem", void 0);
    ProposallineitempopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-proposallineitempopup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./proposallineitempopup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./proposallineitempopup.component.scss */ "./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _proposallist_service__WEBPACK_IMPORTED_MODULE_4__["ProposallistService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], ProposallineitempopupComponent);
    return ProposallineitempopupComponent;
}());



/***/ }),

/***/ "./src/app/views/proposal/proposal-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/proposal/proposal-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: ProposalRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProposalRoutingModule", function() { return ProposalRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _proposallist_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./proposallist.component */ "./src/app/views/proposal/proposallist.component.ts");
/* harmony import */ var _addeditproposal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addeditproposal.component */ "./src/app/views/proposal/addeditproposal.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _proposalview_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./proposalview.component */ "./src/app/views/proposal/proposalview.component.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../auth/auth.guard */ "./src/app/auth/auth.guard.ts");
/* harmony import */ var _viewProposalNew_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewProposalNew.component */ "./src/app/views/proposal/viewProposalNew.component.ts");
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
    { path: '', component: _proposallist_component__WEBPACK_IMPORTED_MODULE_1__["ProposallistComponent"] },
    { path: 'editproposal/:id', component: _addeditproposal_component__WEBPACK_IMPORTED_MODULE_2__["AddeditproposalComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'PROPOSALADD' } },
    { path: 'addproposal', component: _addeditproposal_component__WEBPACK_IMPORTED_MODULE_2__["AddeditproposalComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'PROPOSALUPDATE' } },
    { path: 'addproposal/opportunity/:opid', component: _addeditproposal_component__WEBPACK_IMPORTED_MODULE_2__["AddeditproposalComponent"] },
    { path: 'view/:id', component: _proposalview_component__WEBPACK_IMPORTED_MODULE_4__["ProposalviewComponent"] },
    { path: 'viewproposal/:id', component: _viewProposalNew_component__WEBPACK_IMPORTED_MODULE_6__["ViewProposalNewComponent"] },
];
var ProposalRoutingModule = /** @class */ (function () {
    function ProposalRoutingModule() {
    }
    ProposalRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
        })
    ], ProposalRoutingModule);
    return ProposalRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/proposal/proposal.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/proposal/proposal.module.ts ***!
  \***************************************************/
/*! exports provided: ProposalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProposalModule", function() { return ProposalModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _addeditproposal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addeditproposal.component */ "./src/app/views/proposal/addeditproposal.component.ts");
/* harmony import */ var _proposallist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./proposallist.component */ "./src/app/views/proposal/proposallist.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _proposal_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./proposal-routing.module */ "./src/app/views/proposal/proposal-routing.module.ts");
/* harmony import */ var _proposalview_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./proposalview.component */ "./src/app/views/proposal/proposalview.component.ts");
/* harmony import */ var _productlineitempopup_proposallineitempopup_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./productlineitempopup/proposallineitempopup.component */ "./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _pricebooklistpopup_pricebooklistpopup_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pricebooklistpopup/pricebooklistpopup.component */ "./src/app/views/proposal/pricebooklistpopup/pricebooklistpopup.component.ts");
/* harmony import */ var _viewProposalNew_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./viewProposalNew.component */ "./src/app/views/proposal/viewProposalNew.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};














var ProposalModule = /** @class */ (function () {
    function ProposalModule() {
    }
    ProposalModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_addeditproposal_component__WEBPACK_IMPORTED_MODULE_2__["AddeditproposalComponent"], _proposallist_component__WEBPACK_IMPORTED_MODULE_3__["ProposallistComponent"], _proposalview_component__WEBPACK_IMPORTED_MODULE_9__["ProposalviewComponent"], _productlineitempopup_proposallineitempopup_component__WEBPACK_IMPORTED_MODULE_10__["ProposallineitempopupComponent"],
                _pricebooklistpopup_pricebooklistpopup_component__WEBPACK_IMPORTED_MODULE_12__["PricebooklistpopupComponent"], _viewProposalNew_component__WEBPACK_IMPORTED_MODULE_13__["ViewProposalNewComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _proposal_routing_module__WEBPACK_IMPORTED_MODULE_8__["ProposalRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__["ModalModule"]
            ]
        })
    ], ProposalModule);
    return ProposalModule;
}());



/***/ }),

/***/ "./src/app/views/proposal/proposallist.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/proposal/proposallist.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Byb3Bvc2FsL3Byb3Bvc2FsbGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/proposal/proposallist.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/proposal/proposallist.component.ts ***!
  \**********************************************************/
/*! exports provided: ProposallistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProposallistComponent", function() { return ProposallistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _proposallist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./proposallist.service */ "./src/app/views/proposal/proposallist.service.ts");
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









var ProposallistComponent = /** @class */ (function () {
    function ProposallistComponent(proposalService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.proposalService = proposalService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.moduleName = 'crm';
        this.submoduleName = 'proposal';
        this.custom_view_id = '';
        this.searchUserType = '';
        this.loading = false;
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["SelectionType"];
        this.sortDir = 'desc';
        this.sortColumn = 'ProposalId';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.ViewModel = '';
        this.searchTxt = '';
        this.listFiltertext = '';
        this.tableName = 'tblproposal';
        this.isApproveAccount = false;
        this.isAddViewFirstTime = false;
        this.selected = [];
        this.loadSave = false;
        this.myCheckbox = false;
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
    ProposallistComponent.prototype.ngOnInit = function () {
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.LoadViewData();
        this.refresh();
    };
    ProposallistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    ProposallistComponent.prototype.GetcustomViewid = function (event) {
        var _this = this;
        if (event == 'undefined' || typeof event == 'undefined') {
            this.LoadViewData();
        }
        this.pagedData.data.forEach(function (cnt) {
            if (cnt.custom_view_id == event) {
                _this.ViewModel = cnt.view_name;
            }
        });
        this.custom_view_id = event;
        this.vewId = event;
        this.refresh();
    };
    ProposallistComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loading = true;
        this.proposalService.GetproposalList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.myCheckbox)
            .subscribe(function (response) {
            _this.jsonData = response;
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            console.log('this.columnheading', _this.columnheading);
            _this.columnheading.forEach(function (element) {
                element["colwidth"] = (String(element.DISPLAY_NAME).length * 12) + 12;
            });
            if (response.data.length > 0) {
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
    Object.defineProperty(ProposallistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ProposallistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ProposallistComponent.prototype.getListingColorCode = function (fieldValue) {
        //this.lstListingColorCode = '';
        //if (fieldValue != null) {
        //  this.lstListingColorCode = fieldValue.split('::');
        //  if (this.lstListingColorCode.length > 0) {
        //    this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
        //  }
        //}
        //return this.lstListingColorCode;
    };
    ProposallistComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    ProposallistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    ProposallistComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    ProposallistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    ProposallistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    ProposallistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "name like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    ProposallistComponent.prototype.reset = function () {
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.myCheckbox = false;
        this.refresh();
    };
    ProposallistComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].ProposalId.toString() + ",";
            }
        }
        else {
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].ProposalId.toString() + ",";
            }
        }
    };
    ProposallistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    ProposallistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Proposal(s)\"";
            this.dialogService.confirm('Delete Proposal(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.proposalService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    ProposallistComponent.prototype.Delete = function (row) {
        var _this = this;
        console.log('row', row);
        var message = "Are you sure you want to delete Proposal \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete Proposal', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.proposalService.DeleteRecords(row.ProposalId, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Proposal \"" + row.Name + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    ProposallistComponent.prototype.LoadViewData = function () {
        var _this = this;
        this.loadSave = true;
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.proposalService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.proposalService.pagedData;
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
    ProposallistComponent.prototype.SetManageViewValue = function (event, text) {
        this.custom_view_id = event;
        this.ViewModel = text;
        this.refresh();
        //this.LoadViewData();
    };
    ProposallistComponent.prototype.switchClicked = function (event) {
        this.listFiltertext = '';
        this.myCheckbox = event.srcElement.checked;
        this.currentPage = 1;
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "name like '%" + this.listFilter + "%'";
        }
        if (this.listFiltertext.trim().length > 0) {
            this.refresh();
        }
        if (this.myCheckbox == false) {
            this.refresh();
        }
    };
    ProposallistComponent.ctorParameters = function () { return [
        { type: _proposallist_service__WEBPACK_IMPORTED_MODULE_7__["ProposallistService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_1__["SearchfilteraddComponent"])
    ], ProposallistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_2__["ManageviewComponent"])
    ], ProposallistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], ProposallistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ProposallistComponent.prototype, "offset", void 0);
    ProposallistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-proposallist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./proposallist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/proposallist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./proposallist.component.scss */ "./src/app/views/proposal/proposallist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_proposallist_service__WEBPACK_IMPORTED_MODULE_7__["ProposallistService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"]])
    ], ProposallistComponent);
    return ProposallistComponent;
}());



/***/ }),

/***/ "./src/app/views/proposal/proposallist.service.ts":
/*!********************************************************!*\
  !*** ./src/app/views/proposal/proposallist.service.ts ***!
  \********************************************************/
/*! exports provided: ProposallistService, CheckboxData, JsonData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProposallistService", function() { return ProposallistService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxData", function() { return CheckboxData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonData", function() { return JsonData; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
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





var ProposallistService = /** @class */ (function () {
    function ProposallistService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
        this.getListPrice = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.getPriceBookID = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    ProposallistService.prototype.GetproposalList = function (listFilter, sortColumn, page, pageSize, sortDir, loginuserid, moduleName, submoduleName, companyId, custom_view_id, isCheckboxTick) {
        if (typeof listFilter == "undefined" || listFilter == null) {
            listFilter = null;
        }
        else {
            listFilter = encodeURIComponent((listFilter));
        }
        return this.http.get(this.baseUri + "proposal/GetproposalList?listFilter=" + listFilter + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&custom_view_id=" + custom_view_id + "&isAllRecords=" + isCheckboxTick);
    };
    ProposallistService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId, Id, OpportunityId, displayType) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId + "&PrimaryId=" + Id + "&RefId=" + OpportunityId + "&displayCode=" + displayType)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    ProposallistService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    ProposallistService.prototype.GetDetails = function (id, moduleName, submoduleName, companyId, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("proposal/GetProposalDetailsbyid?id=" + id + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            //// console.log("responseService12", response);
            _this.editPage = response;
            return true;
        }));
    };
    ProposallistService.prototype.addEditForm = function (JsonData) {
        return this.http.post(this.baseUri + "proposal/AddEditproposal", JsonData);
    };
    ProposallistService.prototype.GetServiceGetFileList = function (contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName) {
        return this.http.get(this.baseUri + ("proposal/GetServiceGetFileList?ServiceId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&modulename=" + modulename + "&submoduleName=" + submoduleName));
    };
    ProposallistService.prototype.GetAssociateProductList = function (proposalId, opportunityId, submoduleid, objectname, name, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "proposal/GetAssociateProductList?proposalId=" + proposalId + "&opportunityId=" + opportunityId + "&submoduleid=" + submoduleid + "&objectname=" + objectname + "&nameSearch=" + name + "&SortColumn=" + sortColumn + "&SortDir=" + sortDir + "&PageNo=" + page + "&PageSize=" + pageSize + "&userId=" + userId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ProposallistService.prototype.GetPriceBookListDetail = function (obj, sortColumn, sortDir, page, pageSize) {
        var _this = this;
        return this.http.get(this.baseUri + "proposal/GetPriceBookListDetail?Productid=" + obj + "&SortColumn=" + sortColumn + "&SortDir=" + sortDir + "&PageNo=" + page + "&PageSize=" + pageSize)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ProposallistService.prototype.GetAssociateProductWithProposalLineItemList = function (proposalId, opportunityId, submoduleid, objectname, name, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "proposal/GetAssociateProductWithProposalLineItemList?proposalId=" + proposalId + "&opportunityId=" + opportunityId + "&submoduleid=" + submoduleid + "&objectname=" + objectname + "&nameSearch=" + name + "&SortColumn=" + sortColumn + "&SortDir=" + sortDir + "&PageNo=" + page + "&PageSize=" + pageSize + "&userId=" + userId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ProposallistService.prototype.DeleteProduct = function (selected) {
        return this.http.get(this.baseUri + ("proposal/DeleteProduct?productId=" + selected));
    };
    ProposallistService.prototype.AddUpdateLineItem = function (lineItemModel) {
        return this.http.post(this.baseUri + "proposal/AddUpdateLineItem", lineItemModel);
    };
    ProposallistService.prototype.addOrUpdateFiles = function (CompanySetUpModel) {
        return this.http.post(this.baseUri + "proposal/addOrUpdateFiles", CompanySetUpModel);
    };
    //GetServiceGetFileList(contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName): Observable<any> {
    //  return this.http.get(this.baseUri + `workorder/GetServiceGetFileList?ServiceId=${contId}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${pageIndex}&pageSize=${pageSize}&modulename=${modulename}&submoduleName=${submoduleName}`);
    //}
    ProposallistService.prototype.GetProposalLineItemList = function (proposalId, opportunityId, submoduleid, objectname, name, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "proposal/GetProposalLineItemList?proposalId=" + proposalId + "&opportunityId=" + opportunityId + "&submoduleid=" + submoduleid + "&objectname=" + objectname + "&nameSearch=" + name + "&SortColumn=" + sortColumn + "&SortDir=" + sortDir + "&PageNo=" + page + "&PageSize=" + pageSize + "&userId=" + userId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ProposallistService.prototype.getViewList = function (name, userType, sortColumn, sortDir, page, pageSize, ModuleName, SubModuleName, companyId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Common/GetCustomViewName?nameSearch=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&ModuleName=" + ModuleName + "&SubModuleName=" + SubModuleName + "&companyId=" + companyId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ProposallistService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    ProposallistService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], ProposallistService);
    return ProposallistService;
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

/***/ "./src/app/views/proposal/proposalview.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/proposal/proposalview.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Byb3Bvc2FsL3Byb3Bvc2Fsdmlldy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/proposal/proposalview.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/proposal/proposalview.component.ts ***!
  \**********************************************************/
/*! exports provided: ProposalviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProposalviewComponent", function() { return ProposalviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _emailtemplate_emailtemplate_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../emailtemplate/emailtemplate.service */ "./src/app/views/emailtemplate/emailtemplate.service.ts");
/* harmony import */ var _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dashboard/dashboard.service */ "./src/app/views/dashboard/dashboard.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _proposallist_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./proposallist.service */ "./src/app/views/proposal/proposallist.service.ts");
/* harmony import */ var _productlineitempopup_proposallineitempopup_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./productlineitempopup/proposallineitempopup.component */ "./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.ts");
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











var ProposalviewComponent = /** @class */ (function () {
    function ProposalviewComponent(route, commonService, fb, emailTemplateService, dashboardService, dialogService, leadservice, router, proposallistService, toaster) {
        var _this = this;
        this.route = route;
        this.commonService = commonService;
        this.fb = fb;
        this.emailTemplateService = emailTemplateService;
        this.dashboardService = dashboardService;
        this.dialogService = dialogService;
        this.leadservice = leadservice;
        this.router = router;
        this.proposallistService = proposallistService;
        this.toaster = toaster;
        this.AssociatedproductpagedData = {
            pager: {},
            data: []
        };
        this.objectname = 'proposal';
        //loading: any;
        this.sortDir = 'desc';
        this.pageSizeValue = 10;
        this.moduleName = 'crm';
        this.submoduleName = 'proposal';
        this.formControlList = [];
        this.loadSave = false;
        this.loading = false;
        this.checkboxdata1 = [];
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
            _this.userName = userdetail.firstName + ' ' + userdetail.lastName;
        });
    }
    ProposalviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sortColumn = 'createdOn';
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.proposalId = id;
            localStorage.setItem('opid', _this.proposalId);
        });
        this.GetAssociateProductList();
        this.getPageSizes();
        this.pageSizeValue = 10;
        this.proposallistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.proposalId, typeof this.opportunityId == 'undefined' ? '' : this.opportunityId, 'VIEW').subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.proposallistService.customFieldsList.data;
                // console.log("this.customCompnentValues", this.customCompnentValues);
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _proposallist_service__WEBPACK_IMPORTED_MODULE_9__["CheckboxData"]();
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
                    if (cnt.dt_code == 'select' && cnt.value != '') {
                        if (cnt.select_options != null) {
                            cnt.select_options.forEach(function (itemList) {
                                if (itemList.value == cnt.value) {
                                    cnt.value = itemList.name;
                                }
                            });
                        }
                        else {
                            cnt.value = null;
                        }
                    }
                    if (_this.opportunityId > 0 && cnt.name == 'OpportunityId') {
                        cnt.is_required = true;
                        val = _this.opportunityId;
                    }
                    if (_this.opportunityId > 0 && cnt.name == 'AccountId') {
                        val = cnt.select_options[0].value;
                        cnt.is_required = true;
                    }
                    if (cnt.name == 'OwnerId') {
                        val = _this.userName;
                    }
                    // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern("[0-9]+(\.[0-9][0-9][0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"](group_1);
                // console.log("validationFROM", this.form);
                _this.loadSave = false;
            }
        });
    };
    ProposalviewComponent.prototype.GetAssociateProductList = function () {
        var _this = this;
        this.proposallistService.GetAssociateProductWithProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.proposallistService.pagedData;
            // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
        });
    };
    ProposalviewComponent.prototype.GetProposalList = function () {
        this.proposalpopup.show(this.proposalId, this.opportunityId, '');
    };
    ProposalviewComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
            _this.lstPageSizeAssociateProduct = _this.commonService.masters;
        });
    };
    ProposalviewComponent.prototype.setPageAssociateProduct = function ($event) {
        var _this = this;
        debugger;
        this.loading = true;
        var currentPageSalesUserList = $event.page - 1;
        //this.opportunityId = opportunityId;
        this.proposallistService.GetAssociateProductWithProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, currentPageSalesUserList, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.proposallistService.pagedData;
            debugger;
            // this.selected;
            //this.AssociatedproductpagedData = this.currentPageSalesUserList;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ProposalviewComponent.prototype.onChangeAssociateProduct = function ($event) {
        var _this = this;
        debugger;
        this.loading = true;
        this.proposallistService.GetAssociateProductWithProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.proposallistService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ProposalviewComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.proposallistService.GetAssociateProductWithProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.proposallistService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ProposalviewComponent.prototype.lineItem = function () {
        this.GetAssociateProductList();
    };
    ProposalviewComponent.prototype.deleteAssociateproduct = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Product \"" + row.ProductName + "\"?";
        this.dialogService.confirm('Delete Product', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.proposallistService.DeleteProduct(row.lineItemId.toString()).subscribe(function (response) {
                    if (response.statusCode == 200) {
                        _this.toaster.success("Product \"" + row.ProductName + "\"\" has been deleted successfully");
                        _this.GetAssociateProductList();
                    }
                    else {
                        _this.toaster.error(response.responseMessage);
                    }
                }, function (error) {
                });
            }
        });
    };
    ProposalviewComponent.prototype.editProduct = function (row) {
        this.proposalpopup.show(this.proposalId, this.opportunityId, row);
    };
    ProposalviewComponent.prototype.showemailpopup = function () {
    };
    ProposalviewComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
        { type: _emailtemplate_emailtemplate_service__WEBPACK_IMPORTED_MODULE_3__["EmailTemplateService"] },
        { type: _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_4__["DashboardService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_6__["LeadlistService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _proposallist_service__WEBPACK_IMPORTED_MODULE_9__["ProposallistService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('proposalpopup', { static: false }),
        __metadata("design:type", _productlineitempopup_proposallineitempopup_component__WEBPACK_IMPORTED_MODULE_10__["ProposallineitempopupComponent"])
    ], ProposalviewComponent.prototype, "proposalpopup", void 0);
    ProposalviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-proposalview',
            template: __importDefault(__webpack_require__(/*! raw-loader!./proposalview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/proposalview.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./proposalview.component.scss */ "./src/app/views/proposal/proposalview.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"],
            _emailtemplate_emailtemplate_service__WEBPACK_IMPORTED_MODULE_3__["EmailTemplateService"],
            _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_4__["DashboardService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"],
            _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_6__["LeadlistService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _proposallist_service__WEBPACK_IMPORTED_MODULE_9__["ProposallistService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"]])
    ], ProposalviewComponent);
    return ProposalviewComponent;
}());



/***/ }),

/***/ "./src/app/views/proposal/viewProposalNew.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/proposal/viewProposalNew.component.ts ***!
  \*************************************************************/
/*! exports provided: ViewProposalNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewProposalNewComponent", function() { return ViewProposalNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _proposallist_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./proposallist.service */ "./src/app/views/proposal/proposallist.service.ts");
/* harmony import */ var _productlineitempopup_proposallineitempopup_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./productlineitempopup/proposallineitempopup.component */ "./src/app/views/proposal/productlineitempopup/proposallineitempopup.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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









var ViewProposalNewComponent = /** @class */ (function () {
    function ViewProposalNewComponent(dialogService, proposalService, commonService, fb, router, toaster, route, location) {
        var _this = this;
        this.dialogService = dialogService;
        this.proposalService = proposalService;
        this.commonService = commonService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.location = location;
        this.loading = false;
        this.is_converted = false; // @Input() offset: number;
        this.moduleName = 'crm';
        this.submoduleName = 'proposal';
        this.formControlList = [];
        this.loadSave = false;
        this.displayType = 'VIEW';
        this.LeadFirstName = '';
        this.LeadLastName = '';
        this.submoduleid = 10;
        this.objectname = 'Lead';
        this.sortDir = 'desc';
        this.sortColumn = 'createdon';
        this.sortProposalLineitemColumn = 'TotalPrice';
        this.pageSizeValuenotes = 4;
        this.countLineItems = 1;
        this.listFilter = '';
        this.isEdit = false;
        this.LeadSMSCount = 0;
        this.pageSizeValue = 10;
        this.pageNo = 0;
        this.pageSizeValueLeadSMSList = 4;
        this.lstLeadSMS = {
            pager: {},
            data: []
        };
        this.NotespagedData = {
            pager: {},
            data: []
        };
        this.lstLineItems = {
            pager: {},
            data: []
        };
        this.NotesCount = 0;
        this.filePageNo = 1;
        this.pageSize = 4;
        this.lineItemPage = 1;
        this.solgenpower = false;
        this.countFiles = 0;
        this.contactpagedData = {
            pager: {},
            data: []
        };
        this.siteurl = '';
        this.checkboxdata1 = [];
        this.checkboxdataTop = [];
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyType = userdetail.companyType;
            if (_this.companyType == "companytypeSolarInstall") {
                _this.solgenpower = true;
            }
        });
    }
    ViewProposalNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.siteurl = window.location.origin;
        console.log('siteurl', this.siteurl);
        this.loadSave = true;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.Id = id;
            _this.proposalId = id;
        });
        this.GetCustomFieldsList();
        this.currentPageNotes = 0;
        this.pageSizeValueContact = 0;
        this.currentPageLeadSMS = 1;
        this.pageSizeValueLeadSMSList = 4;
        this.pageSizeValueContact = 10;
        this.GetProposalLineItemList();
    };
    ViewProposalNewComponent.prototype.addItem = function (newItem) {
        if (newItem) {
            this.GetCustomFieldsList();
        }
    };
    ViewProposalNewComponent.prototype.close = function () {
        this.router.navigateByUrl("/proposal-list");
    };
    ViewProposalNewComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        this.formControlList = [];
        this.displayType = 'VIEW';
        this.proposalService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, '', this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.proposalService.customFieldsList.data;
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _proposallist_service__WEBPACK_IMPORTED_MODULE_6__["CheckboxData"]();
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
                        console.log('formControlList', obj);
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
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"](group_1);
                _this.loadSave = false;
                _this.GetCustomFieldsListTopRow();
            }
        });
    };
    ViewProposalNewComponent.prototype.GetCustomFieldsListTopRow = function () {
        var _this = this;
        this.loadSave = true;
        this.displayType = 'VIEW_TOP';
        this.proposalService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, '', this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValuesTop = _this.proposalService.customFieldsList.data;
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
                    if (cnt.name == 'Name') {
                        _this.LeadFirstName = cnt.value;
                    }
                });
                _this.loadSave = false;
            }
        });
    };
    ViewProposalNewComponent.prototype.getListingColorCode = function (fieldValue) {
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        return this.lstListingColorCode;
    };
    ViewProposalNewComponent.prototype.openProposalLineItemPopup = function () {
        this.proposalpopup.show(this.proposalId, this.opportunityId, '');
    };
    ViewProposalNewComponent.prototype.GetProposalLineItemList = function () {
        var _this = this;
        //const sort = $event.sorts[0]
        //this.sortDir = sort.dir;
        //this.sortColumn = sort.prop;
        this.loadSave = true;
        this.proposalService.GetProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortProposalLineitemColumn, this.sortDir, this.lineItemPage, this.pageSize, '').subscribe(function (response) {
            _this.lstLineItems = _this.proposalService.pagedData;
            console.log("lineitem", _this.lstLineItems);
            if (_this.lstLineItems.data.length > 0) {
                debugger;
                var d = _this.proposalService.pagedData;
                _this.countLineItems = _this.proposalService.pagedData.pager.totalItems;
                //this.NotespagedData = this.leadservice.pagedData;
                //this.NotesCount = this.leadservice.pagedData.pager.totalItems;
                _this.datalength = _this.lstLineItems.data.length;
                //console.log("sdsds", this.datalentgh);
                //this.offset = this.currentPageNotes;
                //console.log("CountLitems", this.lstLineItems.pager.totalItems);
            }
            else {
                _this.countLineItems = 1;
            }
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    ViewProposalNewComponent.prototype.deleteProposallineitem = function (id) {
        var _this = this;
        var message = "Are you sure you want to delete proposal line item?";
        this.dialogService.confirm('Delete proposal line item', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.proposalService.DeleteRecords(id, 'tblQuoteLineItem').subscribe(function (res) {
                    _this.toaster.success("Proposal line item has been deleted successfully..");
                    _this.lineItemPage = 1;
                    _this.GetProposalLineItemList();
                });
            }
        });
    };
    ViewProposalNewComponent.prototype.onLineItemSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortProposalLineitemColumn = sort.prop;
        //const sort = $event.sorts[0]
        //this.sortDir = sort.dir;
        //this.sortColumn = $event.column.name;
        this.GetProposalLineItemList();
    };
    ViewProposalNewComponent.prototype.setLineItemsPageNo = function ($event) {
        this.lineItemPage = $event.page;
        this.GetProposalLineItemList();
    };
    ViewProposalNewComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    ViewProposalNewComponent.ctorParameters = function () { return [
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: _proposallist_service__WEBPACK_IMPORTED_MODULE_6__["ProposallistService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('proposalpopup', { static: false }),
        __metadata("design:type", _productlineitempopup_proposallineitempopup_component__WEBPACK_IMPORTED_MODULE_7__["ProposallineitempopupComponent"])
    ], ViewProposalNewComponent.prototype, "proposalpopup", void 0);
    ViewProposalNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewProposalNew',
            template: __importDefault(__webpack_require__(/*! raw-loader!./viewProposalNew.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/proposal/viewProposalNew.component.html")).default
        }),
        __metadata("design:paramtypes", [_shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"],
            _proposallist_service__WEBPACK_IMPORTED_MODULE_6__["ProposallistService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"]])
    ], ViewProposalNewComponent);
    return ViewProposalNewComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-proposal-proposal-module.js.map