(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-campaign-campaign-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/campaign/addeditcampaign/addeditcampaign.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/campaign/addeditcampaign/addeditcampaign.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/campaign\">Manage Campaign</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList;let i=index\">\r\n        <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row mb-2\">\r\n\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n\r\n\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : inner.form_field_visibility == 'NO', 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO'\" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n          <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n        </a>-->\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES'\">\r\n\r\n\r\n\r\n                <!--text  [placeholder]=\"inner.display_name\"-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='time' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='datetime'\" />\r\n\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" ></p-calendar>\r\n\r\n\r\n\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'datetime'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" [hourFormat]=\"(timeFormat==24)?24:12\"></p-calendar>\r\n\r\n\r\n\r\n                <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n  [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                <!--end calandar-->\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\"\r\n                               class=\"dynamic custom-control-input\">\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                        <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                 [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n          <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n\r\n\r\n\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\" />\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--Ng Dropdown-->\r\n                <!--Dropdown\r\n  picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n  -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.dt_code=='select' }\" *ngIf=\"inner.dt_code=='select' && inner.select_options==''\">\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.id\"\r\n            *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n      {{//option.value}}\r\n    </option>\r\n  </select>-->\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (clear)=\"onClearLang(item.InnerData,j)\"\r\n                           (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code!=null \" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code==null\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true'\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <div class=\"clearfix\"></div>\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n                <!--Dropdown\r\n    picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n  -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n          (change)='onOptionsSelected($event,inner)'>\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.name\"\r\n            *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n      {{option.name}}\r\n    </option>\r\n\r\n  </select>-->\r\n\r\n\r\n              </div>\r\n\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row  mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/campaign/campaignlist.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/campaign/campaignlist.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\">\r\n    <strong>Manage Campaign</strong>\r\n    <p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p>\r\n  </h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Campaign</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-5 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield \">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-7\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0\">\r\n                <ng-select [items]=\"pagedData.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail('')\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i> </span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/campaign/addcampaign\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add Campaign\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns addt-btn\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rowHeight]=\"40\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                          [scrollbarH]=\"true\"\r\n                       \r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                   \r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'CampaignName'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/campaign/view',row.id]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'CampaignName'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal:'Date'\" *ngIf=\"col.DATA_TYPE=='date'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal:'Date') : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\" *ngIf=\"col.DATA_TYPE=='datetime'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldType != 'select' && col.DATA_TYPE != 'date' && col.DATA_TYPE!='bit'\">\r\n                  {{row[col.COLUMN_NAME] }}\r\n                </div>\r\n                <div *ngIf=\"col.FieldType == 'select'\">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                  <!--<div *ngIf=\"col.FieldFrom==null\">\r\n      <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n        <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n          {{itemColorCode.color}}\r\n        </div>\r\n        <div *ngIf=\"itemColorCode.colorkey!=undefined\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n          {{itemColorCode.color}}\r\n        </div>\r\n      </div>\r\n    </div>-->\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.id\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.id}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <a class=\"actions-onclick view-list\" [routerLink]=\"['/campaign/view',row.id]\" href=\"javascript:void(0);\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>\r\n                    <a *ngIf='isUpdate' class=\"actions-onclick view-list\" [routerLink]=\"['/campaign/editcampaign',row.id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"crm\" subModuleName=\"campaign\"></app-searchfilteradd>\r\n<app-manageview (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"crm\" subModuleName=\"campaign\"></app-manageview>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/campaign/viewcampaign.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/campaign/viewcampaign.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Campaign Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/campaign\">Manage Campaign</a></li>\r\n      <li class=\"active\">Campaign Details</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-3 mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-bullseye bg-info text-white float-left p-1 mr-2\"></i>\r\n    <span class=\"float-left\"><span>Campaign</span> {{CampaignName}}</span>\r\n    <span class=\"cntnt-right-btn mr15\">\r\n      <a [routerLink]=\"['/campaign/editcampaign/',Id]\" class=\"btn btn-success text-white mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"close()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n\r\n  <div class=\"col-12 float-left  d-flex p-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n\r\n      <div class=\"col py-3\">\r\n        <span class=\"d-block\"><strong>{{ item.DisplayName}}:</strong> {{ item.Value}}</span>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:none\">\r\n\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col-sm-12 col-lg-8\">\r\n            <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n            \r\n              <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n                <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                  <ng-container *ngFor=\"let item of formControlList\">\r\n                    <div class=\"panel active\">\r\n                      <div class=\"panel-heading\">\r\n                        <h4 class=\"panel-title\">\r\n                          <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                            <span> {{item.group_name}}</span>\r\n                          </a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                        <div class=\"panel-body row px-0 mt-0\">\r\n                          <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                            <div class=\"input-group border-bottom\">\r\n                              <div class=\"col-sm-12 col-md-6 px-0\">\r\n                                <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                              </div>\r\n                              <div class=\"col-sm-12 col-md-6\">\r\n                                <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null\" class=\"py-2 d-block\">\r\n                                  <ng-container *ngIf=\"inner.dt_code!='date' &&  inner.dt_code!='datetime'\"> {{ inner.value}}</ng-container>\r\n                                  <ng-container *ngIf=\"inner.dt_code=='date'\"> {{ inner.value | DateTimeToLocal:'Date'}}</ng-container>\r\n                                  <ng-container *ngIf=\"inner.dt_code=='datetime'\"> {{ inner.value | DateTimeToLocal}}</ng-container>\r\n                                </span>\r\n                                <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null\" class=\"py-2 d-block\">\r\n                                  <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                                </span>\r\n                                <!--============================== For CheckBox ===========================-->\r\n                                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                                  <div class=\"form-check form-check-inline\">\r\n                                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                                      <label class=\"switch  mb-0\">\r\n                                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                      </label>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                                <!--============================== For CheckBox ===========================-->\r\n                                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                                  <div class=\"form-check form-check-inline\">\r\n                                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                                      <label class=\"switch mb-0\">\r\n                                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"> <span>Yes</span></span>\r\n                                      </label>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ng-container>\r\n                </form>\r\n              </div>\r\n          </div>\r\n          <div class=\"col-sm-12 col-lg-4 relatedtab\">\r\n            <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n              <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#campaignManagers\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Campaign Members ({{campaignMembersCount}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"campaignManagers\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstCampaignMembers.data\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstCampaignMembers.pager.totalItems\"\r\n                                       [offset]=\"lstCampaignMembers.pager.currentPage\"\r\n                                       [limit]=\"lstCampaignMembers.pager.pageSize\"\r\n                                       (page)='setcampaignMemberPageNo($event)'\r\n                                       (sort)=\"onCampaignMembersSort($event)\">\r\n\r\n                          <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <span *ngIf=\"row.Status=='1001'\">Active</span>\r\n                              <span *ngIf=\"row.Status!='1001'\">Deactive</span>\r\n                            </ng-template>\r\n\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"FirstName\" prop=\"FirstName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"LastName\" prop=\"LastName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Title\" prop=\"Title\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Company\" prop=\"Company\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <span [title]=\"row.Company\">{{row.Company | truncate}}</span>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstCampaignMembers.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstCampaignMembers.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                                <!--Showing {{(lstCampaignMembers.pager.currentPage - 1 )* lstCampaignMembers.pager.pageSize + 1}}  to {{lstCampaignMembers.pager.currentPage * lstCampaignMembers.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                {{commonService.PageString(lstCampaignMembers.pager.currentPage,lstCampaignMembers.pager.pageSize,rowCount)}}\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstCampaignMembers.pager.currentPage\"\r\n                                               [size]=\"lstCampaignMembers.pager.pageSize\"\r\n                                               [count]=\"lstCampaignMembers.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstCampaignMembers.pager.pageSize) > 1)\"\r\n                                               (change)=\"setcampaignMemberPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#proposals\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Proposals ({{proposalsCount}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"proposals\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstProposals.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstProposals.pager.totalItems\"\r\n                                       [offset]=\"lstProposals.pager.currentPage\"\r\n                                       [limit]=\"lstProposals.pager.pageSize\"\r\n                                       (page)='setProposalsPageNo($event)'\r\n                                       (sort)=\"onProposalsSort($event)\">\r\n\r\n                          <ngx-datatable-column name=\"ProposalName\" prop=\"Proposal Name\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"OppourtunityName\" prop=\"Oppourtunity Name\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Primary\" prop=\"Primary\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"ExpirationDate\" prop=\"Expiration Date\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <span [title]=\"row.ExpirationDate | DateTimeToLocal:'Date'\">{{row.ExpirationDate | DateTimeToLocal:'Date'}}</span>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"SubTotal\" prop=\"SubTotal\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"TotalPrice\" prop=\"TotalPrice\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstProposals.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstProposals.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                <!--Showing {{(lstProposals.pager.currentPage - 1 )* lstProposals.pager.pageSize + 1}}  to {{lstProposals.pager.currentPage * lstProposals.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                {{commonService.PageString(lstProposals.pager.currentPage,lstProposals.pager.pageSize,rowCount)}}\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstProposals.pager.currentPage\"\r\n                                               [size]=\"lstProposals.pager.pageSize\"\r\n                                               [count]=\"lstProposals.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstProposals.pager.pageSize) > 1)\"\r\n                                               (change)=\"setProposalsPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#leads\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Leads ({{leadsCount}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"leads\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstLeads.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstLeads.pager.totalItems\"\r\n                                       [offset]=\"lstLeads.pager.currentPage\"\r\n                                       [limit]=\"lstLeads.pager.pageSize\"\r\n                                       (page)='setLeadsPageNo($event)'\r\n                                       (sort)=\"onLeadsSort($event)\">\r\n\r\n                          <ngx-datatable-column name=\"Name\" prop=\"Name\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Company\" prop=\"Company\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Phone\" prop=\"Phone(Others)\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstLeads.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstLeads.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                <!--Showing {{(lstLeads.pager.currentPage - 1 )* lstLeads.pager.pageSize + 1}}  to {{lstLeads.pager.currentPage * lstLeads.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                {{commonService.PageString(lstLeads.pager.currentPage,lstLeads.pager.pageSize,rowCount)}}\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstLeads.pager.currentPage\"\r\n                                               [size]=\"lstLeads.pager.pageSize\"\r\n                                               [count]=\"lstLeads.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstLeads.pager.pageSize) > 1)\"\r\n                                               (change)=\"setLeadsPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/campaign/addeditcampaign/addeditcampaign.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/views/campaign/addeditcampaign/addeditcampaign.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NhbXBhaWduL2FkZGVkaXRjYW1wYWlnbi9hZGRlZGl0Y2FtcGFpZ24uY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/campaign/addeditcampaign/addeditcampaign.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/views/campaign/addeditcampaign/addeditcampaign.component.ts ***!
  \*****************************************************************************/
/*! exports provided: AddeditcampaignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditcampaignComponent", function() { return AddeditcampaignComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _campaign_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../campaign.service */ "./src/app/views/campaign/campaign.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _loanapplication_loanapplicationservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../loanapplication/loanapplicationservice.service */ "./src/app/views/loanapplication/loanapplicationservice.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
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









var AddeditcampaignComponent = /** @class */ (function () {
    function AddeditcampaignComponent(fb, campaignService, router, toaster, route, commonService, location) {
        var _this = this;
        this.fb = fb;
        this.campaignService = campaignService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.location = location;
        this.loadSave = false;
        this.moduleName = 'crm';
        this.inEditMode = false;
        this.submoduleName = 'campaign';
        this.formControlList = [];
        this.checkboxdata1 = [];
        this.JsonData = new _campaign_service__WEBPACK_IMPORTED_MODULE_2__["campaignJsonData"]();
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.len = 10;
        this.timeFormat = '12';
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
            _this.userName = userdetail.firstName + ' ' + userdetail.lastName;
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CAMPAIGNADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CAMPAIGNUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
    }
    AddeditcampaignComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.campaignId = '';
        this.timeFormat = this.commonService.getTimeFormat();
        console.log("companyId", this.companyId);
        this.route.paramMap.subscribe(function (params) {
            var _campaignId = params.get('id');
            if (_this.commonService.getQueryStringValue("campaign") != null)
                _campaignId = _this.commonService.getQueryStringValue("campaign");
            _this.loadSave = true;
            if (_campaignId) {
                _this.campaignId = _campaignId;
                _this.inEditMode = true;
                _this.pageTitle = 'Edit Campaign';
                _this.displayType = 'EDIT';
                _this.addOrUpdatePermission = _this.isUpdate;
            }
            else {
                _this.pageTitle = 'Add Campaign';
                _this.displayType = 'ADD';
                _this.addOrUpdatePermission = _this.isAdd;
            }
        });
        this.campaignService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.campaignId, this.displayType).subscribe(function (result) {
            if (result) {
                console.log("this.campaignService.customFieldsList", _this.campaignService.customFieldsList);
                _this.customCompnentValues = _this.campaignService.customFieldsList.data;
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _loanapplication_loanapplicationservice_service__WEBPACK_IMPORTED_MODULE_6__["CheckboxData"]();
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
    AddeditcampaignComponent.prototype.close = function () {
        this.location.back();
    };
    AddeditcampaignComponent.prototype.onSubmit = function () {
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
            this.JsonData.campaignId = this.campaignId;
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
            this.campaignService.addOrUpdateCampaign(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
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
    AddeditcampaignComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    AddeditcampaignComponent.prototype.fetchMore = function (dataList, j) {
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
    AddeditcampaignComponent.prototype.onKey = function (e, dataList, j) {
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
    AddeditcampaignComponent.prototype.onClearLang = function (dataList, j) {
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
    AddeditcampaignComponent.prototype.getreturnNumber = function (x, y) {
        return x + y;
    };
    AddeditcampaignComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _campaign_service__WEBPACK_IMPORTED_MODULE_2__["CampaignService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] }
    ]; };
    AddeditcampaignComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditcampaign',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditcampaign.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/campaign/addeditcampaign/addeditcampaign.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditcampaign.component.scss */ "./src/app/views/campaign/addeditcampaign/addeditcampaign.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _campaign_service__WEBPACK_IMPORTED_MODULE_2__["CampaignService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"]])
    ], AddeditcampaignComponent);
    return AddeditcampaignComponent;
}());



/***/ }),

/***/ "./src/app/views/campaign/campaign-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/campaign/campaign-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: CampaignRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignRoutingModule", function() { return CampaignRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _campaignlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./campaignlist.component */ "./src/app/views/campaign/campaignlist.component.ts");
/* harmony import */ var _addeditcampaign_addeditcampaign_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditcampaign/addeditcampaign.component */ "./src/app/views/campaign/addeditcampaign/addeditcampaign.component.ts");
/* harmony import */ var _viewcampaign_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./viewcampaign.component */ "./src/app/views/campaign/viewcampaign.component.ts");
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
    { path: '', component: _campaignlist_component__WEBPACK_IMPORTED_MODULE_2__["CampaignlistComponent"] },
    { path: 'addcampaign', component: _addeditcampaign_addeditcampaign_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcampaignComponent"] },
    { path: 'editcampaign/:id', component: _addeditcampaign_addeditcampaign_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcampaignComponent"] },
    { path: 'view/:id', component: _viewcampaign_component__WEBPACK_IMPORTED_MODULE_4__["viewcampaignComponent"] },
];
var CampaignRoutingModule = /** @class */ (function () {
    function CampaignRoutingModule() {
    }
    CampaignRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CampaignRoutingModule);
    return CampaignRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/campaign/campaign.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/campaign/campaign.module.ts ***!
  \***************************************************/
/*! exports provided: CampaignModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignModule", function() { return CampaignModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _campaign_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./campaign-routing.module */ "./src/app/views/campaign/campaign-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-password-toggle */ "./node_modules/ngx-password-toggle/ngx-password-toggle.umd.js");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _campaignlist_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./campaignlist.component */ "./src/app/views/campaign/campaignlist.component.ts");
/* harmony import */ var _addeditcampaign_addeditcampaign_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addeditcampaign/addeditcampaign.component */ "./src/app/views/campaign/addeditcampaign/addeditcampaign.component.ts");
/* harmony import */ var _viewcampaign_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./viewcampaign.component */ "./src/app/views/campaign/viewcampaign.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var CampaignModule = /** @class */ (function () {
    function CampaignModule() {
    }
    CampaignModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_campaignlist_component__WEBPACK_IMPORTED_MODULE_8__["CampaignlistComponent"], _addeditcampaign_addeditcampaign_component__WEBPACK_IMPORTED_MODULE_9__["AddeditcampaignComponent"], _viewcampaign_component__WEBPACK_IMPORTED_MODULE_10__["viewcampaignComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _campaign_routing_module__WEBPACK_IMPORTED_MODULE_2__["CampaignRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"], ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__["NgxPasswordToggleModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalModule"]
            ]
        })
    ], CampaignModule);
    return CampaignModule;
}());



/***/ }),

/***/ "./src/app/views/campaign/campaignlist.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/campaign/campaignlist.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NhbXBhaWduL2NhbXBhaWdubGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/campaign/campaignlist.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/campaign/campaignlist.component.ts ***!
  \**********************************************************/
/*! exports provided: CampaignlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignlistComponent", function() { return CampaignlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _campaign_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./campaign.service */ "./src/app/views/campaign/campaign.service.ts");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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









var CampaignlistComponent = /** @class */ (function () {
    function CampaignlistComponent(campaignService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.campaignService = campaignService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        //modulePermission: ModuleList;
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["SelectionType"];
        this.searchUserType = '';
        this.loadSave = false;
        this.sortDir = 'desc';
        this.moduleName = 'CRM';
        this.submoduleName = 'Campaign';
        this.tableName = 'tblCampaign';
        this.sortColumn = 'id';
        this.vewId = '';
        this.ViewModel = '';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.selected = [];
        this.searchFilter = '';
        this.listFilter = '';
        this.searchTxt = '';
        this.listFiltertext = '';
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CAMPAIGNADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CAMPAIGNUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CAMPAIGNDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
    }
    CampaignlistComponent.prototype.ngOnInit = function () {
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.LoadViewData();
        this.getPageSizes();
        this.refresh();
    };
    Object.defineProperty(CampaignlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    CampaignlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    CampaignlistComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loadSave = true;
        this.campaignService.GetCampaignlist(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId)
            .subscribe(function (response) {
            _this.jsonData = response;
            console.log("reponse", _this.jsonData);
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
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
    CampaignlistComponent.prototype.onChange = function ($event) {
        this.refresh();
    };
    CampaignlistComponent.prototype.setPage = function ($event) {
        this.loadSave = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    CampaignlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    CampaignlistComponent.prototype.GetcustomViewid = function (event) {
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
    CampaignlistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    CampaignlistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    CampaignlistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    CampaignlistComponent.prototype.reset = function () {
        this.custom_view_id = '';
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.refresh();
    };
    CampaignlistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "CampaignName like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    CampaignlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    CampaignlistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Campaign(s)\"";
            this.dialogService.confirm('Delete Campaign(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.campaignService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    CampaignlistComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Campaign\"" + row.CampaignName + "\"?";
        this.dialogService.confirm('Delete Campaign', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.campaignService.DeleteRecords(row.id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Campaign \"" + row.CampaignName + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    CampaignlistComponent.prototype.onSelect = function (_a) {
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
    CampaignlistComponent.prototype.LoadViewData = function () {
        var _this = this;
        this.loadSave = true;
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.campaignService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.campaignService.pagedData;
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
    CampaignlistComponent.prototype.SetManageViewValue = function (event, text) {
        this.ViewModel = text;
        this.custom_view_id = event;
        this.refresh();
        //this.LoadViewData();
    };
    CampaignlistComponent.ctorParameters = function () { return [
        { type: _campaign_service__WEBPACK_IMPORTED_MODULE_1__["CampaignService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_2__["SearchfilteraddComponent"])
    ], CampaignlistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_3__["ManageviewComponent"])
    ], CampaignlistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], CampaignlistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], CampaignlistComponent.prototype, "offset", void 0);
    CampaignlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-campaignlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./campaignlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/campaign/campaignlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./campaignlist.component.scss */ "./src/app/views/campaign/campaignlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_campaign_service__WEBPACK_IMPORTED_MODULE_1__["CampaignService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"], ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"]])
    ], CampaignlistComponent);
    return CampaignlistComponent;
}());



/***/ }),

/***/ "./src/app/views/campaign/viewcampaign.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/campaign/viewcampaign.component.ts ***!
  \**********************************************************/
/*! exports provided: viewcampaignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewcampaignComponent", function() { return viewcampaignComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _campaign_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./campaign.service */ "./src/app/views/campaign/campaign.service.ts");
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





var viewcampaignComponent = /** @class */ (function () {
    function viewcampaignComponent(commonService, campaignService, router, route) {
        this.commonService = commonService;
        this.campaignService = campaignService;
        this.router = router;
        this.route = route;
        this.moduleName = 'crm';
        this.submoduleName = 'campaign';
        this.formControlList = [];
        this.loadSave = false;
        this.displayType = 'VIEW';
        this.CampaignName = "";
        this.lstCampaignMembers = {
            pager: {},
            data: []
        };
        this.lstProposals = {
            pager: {},
            data: []
        };
        this.lstLeads = {
            pager: {},
            data: []
        };
        this.campaignMembersCount = 0;
        this.proposalsCount = 0;
        this.leadsCount = 0;
        this.pageNo = 0;
        this.pageSize = 4;
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.campaignMemberPageNo = 1;
        this.proposalsPageNo = 1;
        this.leadsPageNo = 1;
        this.customCompnentValuesTop = [];
        this.checkboxdata1 = [];
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }
    viewcampaignComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadSave = true;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.Id = id;
        });
        this.GetCustomFieldsList();
        this.getRelatedData();
    };
    viewcampaignComponent.prototype.getRelatedData = function () {
        this.refreshMembersList();
        this.refreshProposalsList();
        this.refreshLeadsList();
    };
    viewcampaignComponent.prototype.close = function () {
        this.router.navigateByUrl("/campaign");
    };
    viewcampaignComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        this.campaignService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            console.log("data", _this.campaignService.customFieldsList.data);
            if (result) {
                _this.customCompnentValues = _this.campaignService.customFieldsList.data;
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _campaign_service__WEBPACK_IMPORTED_MODULE_4__["CheckboxData"]();
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
                        val = cnt.value == 1 ? 'checked' : null;
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
                    if (cnt.ColumnName == 'Type' || cnt.ColumnName == 'Status' || cnt.ColumnName == 'StartDate' || cnt.ColumnName == 'EndDate') {
                        var row = new _campaign_service__WEBPACK_IMPORTED_MODULE_4__["CampaignTopViewModel"]();
                        if (cnt.ColumnName == 'Type')
                            row.DisplayOrder = 1;
                        else if (cnt.ColumnName == 'Status')
                            row.DisplayOrder = 2;
                        else if (cnt.ColumnName == 'StartDate')
                            row.DisplayOrder = 3;
                        else if (cnt.ColumnName == 'EndDate')
                            row.DisplayOrder = 4;
                        row.ColumnName = cnt.ColumnName;
                        row.DisplayName = cnt.display_name;
                        row.Value = cnt.value;
                        _this.customCompnentValuesTop.push(row);
                        _this.customCompnentValuesTop.sort(function (a, b) { return a.DisplayOrder > b.DisplayOrder ? 1 : -1; });
                    }
                    if (cnt.ColumnName == 'CampaignName') {
                        _this.CampaignName = cnt.value;
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
            }
        });
        console.log("row", this.customCompnentValuesTop);
    };
    viewcampaignComponent.prototype.onCampaignMembersSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshMembersList();
    };
    viewcampaignComponent.prototype.onProposalsSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshProposalsList();
    };
    viewcampaignComponent.prototype.onLeadsSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshLeadsList();
    };
    viewcampaignComponent.prototype.refreshMembersList = function () {
        var _this = this;
        this.campaignService.GetCampaignMembersList(this.Id, this.sortColumn, this.sortDir, this.campaignMemberPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstCampaignMembers = resp;
            _this.campaignMembersCount = resp.pager.totalItems;
        });
    };
    viewcampaignComponent.prototype.refreshProposalsList = function () {
        var _this = this;
        this.campaignService.GetCampaignProposalsList(this.Id, this.sortColumn, this.sortDir, this.proposalsPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstProposals = resp;
            _this.proposalsCount = resp.pager.totalItems;
        });
    };
    viewcampaignComponent.prototype.refreshLeadsList = function () {
        var _this = this;
        this.campaignService.GetCampaignLeadsList(this.Id, this.sortColumn, this.sortDir, this.leadsPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstLeads = resp;
            _this.leadsCount = resp.pager.totalItems;
        });
    };
    viewcampaignComponent.prototype.setcampaignMemberPageNo = function ($event) {
        this.campaignMemberPageNo = $event.page;
        this.refreshMembersList();
    };
    viewcampaignComponent.prototype.setProposalsPageNo = function ($event) {
        this.proposalsPageNo = $event.page;
        this.refreshProposalsList();
    };
    viewcampaignComponent.prototype.setLeadsPageNo = function ($event) {
        this.leadsPageNo = $event.page;
        this.refreshLeadsList();
    };
    viewcampaignComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _campaign_service__WEBPACK_IMPORTED_MODULE_4__["CampaignService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }
    ]; };
    viewcampaignComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewcampaign',
            template: __importDefault(__webpack_require__(/*! raw-loader!./viewcampaign.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/campaign/viewcampaign.html")).default
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _campaign_service__WEBPACK_IMPORTED_MODULE_4__["CampaignService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], viewcampaignComponent);
    return viewcampaignComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-campaign-campaign-module.js.map