(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-lead-lead-module~views-solgencontactlist-solgencontactlist-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/addeditlead.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/addeditlead.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/lead\">Manage Lead</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"card mb-3 mb-4 border \" *ngIf=\"solgenpower\">\r\n  <div class=\"col-md-12 text-right p-2\">\r\n    <a *ngIf=\"solgenpower\" href=\"javascript:void(0);\" class=\"btn btn-success form-btns\" (click)=\"showpopup()\"><i class=\"fa fa-exchange text-white\"></i> Convert</a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList;let i=index\">\r\n        <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row  mb-2\">\r\n\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n\r\n            \r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO' &&  inner.edit_form_field_visibility == 'NO' \" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n      <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n    </a>-->\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">\r\n\r\n\r\n\r\n                <!--text  [placeholder]=\"inner.display_name\"-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='datetime' && inner.dt_code !='map' && inner.dt_code !='map_search'\" />\r\n\r\n\r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'map'\">\r\n                  <div [innerHTML]=\"inner.value\"></div>\r\n                </div>\r\n\r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'map_search' && displayType == 'ADD'\">\r\n                  <a (click)=\"mapPopUP()\" href=\"javascript:void(0);\" class=\"btn btn-info\"><i class=\"fa fa-search mr-2\"></i> Search Location</a>\r\n                </div>\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName)?.invalid && form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'datetime'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\" [hourFormat]=\"(timeFormat==24)?24:12\"></p-calendar>\r\n\r\n                <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n  [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                <!--end calandar-->\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                      iv\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--<div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n    <div class=\"form-check form-check-inline\">\r\n      <div class=\"custom-control custom-checkbox\">\r\n\r\n        <input id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\"\r\n               class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}\">{{inner.display_name}}</label>\r\n\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        e=\r\n                        <input type=\"checkbox\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\"\r\n                               id=\"{{inner.form_controlName}}\" [formControlName]=\"inner.form_controlName\">\r\n                        <span class=\"slider round\" id=\"{{inner.form_controlName}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n\r\n\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                        <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                 [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n          <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n\r\n\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--Ng Dropdown-->\r\n                <!--Dropdown\r\n  picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n  -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.dt_code=='select' }\" *ngIf=\"inner.dt_code=='select' && inner.select_options==''\">\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.id\"\r\n            *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n      {{option.value}}\r\n    </option>\r\n  </select>-->\r\n\r\n                <ng-select *ngIf=\"inner.dt_code=='select' && inner.ColumnName!='OwnerName' && inner.picklist_options=='' && inner.is_readOnly && inner.dropdown_type==null\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                           [ngClass]=\"{'disabledddl':inner.is_readOnly}\" [searchable]=\"false\" [clearable]=\"false\"\r\n                           [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n                <ng-select *ngIf=\"inner.dt_code=='select' && inner.ColumnName=='OwnerName' && inner.picklist_options=='' && inner.is_readOnly && inner.dropdown_type==null\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                           [searchable]=\"false\" [clearable]=\"false\"\r\n                           [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (clear)=\"onClearLang(item.InnerData,j)\"\r\n                           (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code!=null && inner.dropdown_type==null && !inner.is_readOnly\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                \r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && (inner.field_code==null || inner.dropdown_type=='Normal') && !inner.is_readOnly\"\r\n                           [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true' && !inner.is_readOnly\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n                <!--Dropdown\r\n    picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n  -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n          (change)='onOptionsSelected($event,inner)'>\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.name\"\r\n            *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n      {{option.name}}\r\n    </option>\r\n\r\n  </select>-->\r\n\r\n\r\n              </div>\r\n\r\n\r\n\r\n\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row  mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 d-flex justify-content-end\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n<div class=\"modal fade show\" bsModal #mapLocation=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-xl modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Search Location</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closemapsearch()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow: auto; margin-bottom: 10px; max-height: 496px; overflow-x: hidden; line-height: 24px; font-size: 13px;\">\r\n        <div class=\"row mb-3\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"pac-card\" id=\"pac-card\">\r\n\r\n              <div id=\"pac-container\" class=\"form-group\">\r\n                <input id=\"pac-input\" class=\"form-control\" type=\"text\" placeholder=\"Enter a location\" />\r\n              </div>\r\n            </div>\r\n            <div id=\"map\" class=\"d-none\"></div>\r\n          </div>\r\n        </div>\r\n        <!--<p-gmap [options]=\"options\" [overlays]=\"overlays\" [style]=\"{'width':'100%','height':'400px'}\"></p-gmap>-->\r\n\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<app-leadconvertpopup #leadconvert></app-leadconvertpopup>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/leadconvertpopup.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/leadconvertpopup.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #makeappointment=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-xl modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Lead Convert</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closepopup()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; height:100%;\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <h3 class=\"form-heading \"><span>Account:</span></h3>\r\n              <p class=\"alert-warning p-2\" [ngClass]=\"{'d-none':addForm.get('accountid').value == null  }\">{{accountMessage}}</p>\r\n\r\n              <div class=\"col-md-12 \">\r\n                <div class=\"row\">\r\n                  <div class=\"col-12 col-md-6 col-lg-6 partition-line pl-3 pl-md-0\">\r\n                    <div class=\"radio pl-3\">\r\n                      <input id=\"createnewaccount\" (change)=\"OnAccountSelected($event)\" type=\"radio\" value=\"createnewaccount\" formControlName=\"Account\">\r\n                      <label for=\"createnewaccount\" class=\"radio-label\">Create New</label>\r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                      <label>Account Name:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Account Name\" formControlName=\"accountName\" [ngClass]=\"{'is-invalid': (accountName.invalid && (accountName.dirty || accountName.touched) && (accountName.errors?.required)),'disabledddl':isAccountExisting  }\">\r\n                        <small *ngIf=\"accountName.invalid && (accountName.dirty || accountName.touched) && accountName.errors?.required\"\r\n                               class=\"text-danger\">Account Name is required</small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                      <label>Account Type:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select #clearDrop [items]=\"lstaccounttype\" class=\"disabledddl\"\r\n                                   placeholder=\"Select Record Type\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"accounttypeid\"\r\n                                   [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (accounttypeid.invalid && (accounttypeid.dirty || accounttypeid.touched) && accounttypeid.errors?.required) }\"></ng-select>\r\n                        <small *ngIf=\"accounttypeid.invalid && (accounttypeid.dirty || accounttypeid.touched) && accounttypeid.errors?.required\"\r\n                               style=\"color:red;\">Please select Account Type</small>\r\n\r\n\r\n\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-6 pr-3 pr-md-0\">\r\n                    <div class=\"radio pl-3\">\r\n                      <input id=\"chooseexistingaccount\" (change)=\"OnAccountExistingSelected($event)\" type=\"radio\" value=\"chooseexistingaccount\" formControlName=\"Account\">\r\n                      <label for=\"chooseexistingaccount\" class=\"radio-label\">Choose Existing</label>\r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                      <label>Account Search:</label>\r\n                      <div class=\"form-group\">\r\n\r\n                        <ng-select [disabled]=\"true\" [items]=\"accountlist\" placeholder=\"Search for Matching accounts\"\r\n                                   (clear)=\"onClearLangAccountDll(accountlist)\"\r\n                                   (keyup)=\"onKeyAccountDll($event,accountlist)\"\r\n                                   (scrollToEnd)=\"onScrollToEndAccountDll(accountlist)\" [virtualScroll]=\"true\"\r\n                                   (change)=\"changeaccountddl($event)\"\r\n                                   formControlName=\"accountid\"\r\n                                   bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (accountid.invalid && (accountid.dirty || accountid.touched) && accountid.errors?.required),'disabledddl':!isAccountExisting }\"></ng-select>\r\n                        <small *ngIf=\"accountid.invalid && (accountid.dirty || accountid.touched) && accountid.errors?.required\"\r\n                               style=\"color:red;\">Please select Account</small>\r\n                        <!--<input type=\"text\" class=\"form-control\" formControlName=\"Utility_Company\" maxlength=\"50\" />-->\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <h3 class=\"form-heading \"><span>Contacts:</span></h3>\r\n              <p class=\"alert-warning p-2\"  [ngClass]=\"{'d-none':addForm.get('contactidform').value == null   }\"> {{contactMessage}}</p>\r\n              <div class=\"col-md-12\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-12 col-md-6 col-lg-6 partition-line pl-3 pl-md-0\">\r\n                    <div class=\"radio pl-3\">\r\n                      <input id=\"createnewcontact\" type=\"radio\" value=\"createnewcontact\" (change)=\"OnContactSelected($event)\" formControlName=\"contact\">\r\n                      <label for=\"createnewcontact\" class=\"radio-label\">Create New</label>\r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                      <label>First Name:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"firstName\" maxlength=\"50\" placeholder=\"Enter First Name\"\r\n                               [ngClass]=\"{'is-invalid': (firstName.invalid && (firstName.dirty || firstName.touched) && (firstName.errors?.required || firstName.errors?.maxlength)),'disabledddl':isContactExisting   }\">\r\n                        <small *ngIf=\"firstName.invalid && (firstName.dirty || firstName.touched) && firstName.errors?.required\"\r\n                               class=\"text-danger\">First Name is required</small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                      <label>Last Name:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"lastName\" maxlength=\"50\" placeholder=\"Enter Last Name\"\r\n                               [ngClass]=\"{'is-invalid': (lastName.invalid && (lastName.dirty || lastName.touched) && (lastName.errors?.required || lastName.errors?.maxlength)),'disabledddl':isContactExisting  }\">\r\n                        <small *ngIf=\"lastName.invalid && (lastName.dirty || lastName.touched) && lastName.errors?.required\"\r\n                               class=\"text-danger\">Last Name is required</small>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"col-md-12\">\r\n                      <label>Email:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"email\" maxlength=\"50\" placeholder=\"Enter Email\"\r\n                               [ngClass]=\"{'is-invalid': (email.invalid && (email.dirty || email.touched) && (email.errors?.required || email.errors?.email)),'disabledddl':isContactExisting  }\">\r\n                        <small *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors?.required\"\r\n                               class=\"text-danger\">Email is required</small>\r\n                        <small *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors?.email\"\r\n                               class=\"text-danger\">Please enter valid email address</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-12\">\r\n                      <label>Phone:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"phone\" maxlength=\"50\" placeholder=\"Enter phone\"\r\n                               [ngClass]=\"{'is-invalid': (phone.invalid && (phone.dirty || phone.touched) && (phone.errors?.required || phone.errors?.maxlength)),'disabledddl':isContactExisting  }\">\r\n                        <small *ngIf=\"phone.invalid && (phone.dirty || phone.touched) && phone.errors?.required\"\r\n                               class=\"text-danger\">phone is required</small>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-6 pr-3 pr-md-0\">\r\n                    <div class=\"radio pl-3\">\r\n                      <input id=\"chooseexistingcontact\" type=\"radio\" value=\"chooseexistingcontact\" (change)=\"OnContactExistingSelected($event)\" formControlName=\"contact\">\r\n                      <label for=\"chooseexistingcontact\" class=\"radio-label\">Choose Existing</label>\r\n                    </div>\r\n                    <div class=\"col-12\">\r\n                      <label>Contact Search:</label>\r\n                      <div class=\"form-group\">\r\n\r\n                        <ng-select [items]=\"contactlist\" placeholder=\"Search for Matching contacts\"\r\n                                   (clear)=\"onClearLangContactDll(contactlist)\"\r\n                                   (keyup)=\"onKeyContactDll($event,contactlist)\"\r\n                                   (change)=\"changecontactddl($event)\"\r\n                                   (scrollToEnd)=\"onScrollToEndContactDll(contactlist)\" [virtualScroll]=\"true\"\r\n                                   formControlName=\"contactidform\"\r\n                                   bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (contactidform.invalid && (contactidform.dirty || contactidform.touched) && contactidform.errors?.required),'disabledddl':!isContactExisting  }\"></ng-select>\r\n                        <small *ngIf=\"contactidform.invalid && (contactidform.dirty || contactidform.touched) && contactidform.errors?.required\"\r\n                               style=\"color:red;\">Please select Contact</small>\r\n\r\n                        <!--<input type=\"text\" class=\"form-control\" formControlName=\"Utility_Company\" maxlength=\"50\" />-->\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 p-0\" *ngIf=\"isloanapp != true\">\r\n                <h3 class=\"form-heading \"><span>Create New Opportunity:</span></h3>\r\n                <!--<div class=\"col-12 col-md-6 col-lg-6\">\r\n      <div class=\"radio\" *ngIf=\"isloanapp != true\">\r\n        <input id=\"createnewopportunity\" type=\"radio\" value=\"createnewopportunity\" formControlName=\"opportunity\">\r\n        <label for=\"createnewopportunity\" class=\"radio-label\">Create New</label>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-6\" *ngIf=\"isloanapp != true\">\r\n      <div class=\"radio\">\r\n        <input id=\"chooseexistingopportunity\" type=\"radio\" value=\"chooseexistingopportunity\" formControlName=\"opportunity\">\r\n        <label for=\"chooseexistingopportunity\" class=\"radio-label\">Choose Existing</label>\r\n      </div>\r\n    </div>-->\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Opportunity Name:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Enter last Name\" formControlName=\"opportunityname\" [ngClass]=\"{'is-invalid': (opportunityname.invalid && (opportunityname.dirty || opportunityname.touched) && (opportunityname.errors?.required )) }\">\r\n                    <small *ngIf=\"opportunityname.invalid && (opportunityname.dirty || opportunityname.touched) && opportunityname.errors?.required\"\r\n                           class=\"text-danger\">Opportunity Name is required</small>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n\r\n\r\n            </div>\r\n            </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button *ngIf=\"isloanapp != true\" type=\"submit\" class=\"btn btn-success form-btns\" [disabled]=\"isleadconvert\" (click)=\"saveLeadConvert()\"><i class=\"fa fa-exchange text-white\"></i> Convert</button>\r\n     \r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closepopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<!--<div class=\"modal fade in show\" bsModal #product=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-xl modal-info\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Associate  Product</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeassociatepopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px; height:700px;\">\r\n\r\n       \r\n        <div class=\"row\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"table-responsive\">\r\n            <div class=\"table table-striped\">\r\n              <ngx-datatable #table class=\"bootstrap\"\r\n                             [rows]=\"pagedData.data\"\r\n                             [scrollbarH]=\"true\"\r\n                             [rowHeight]=\"'40'\"\r\n                             [columnMode]=\"'force'\"\r\n                             [headerHeight]=\"40\"\r\n                             [footerHeight]=\"40\"\r\n                             \r\n                             [externalPaging]=\"true\"\r\n                             [externalSorting]=\"true\"\r\n                             [loadingIndicator]=\"loadSave\"\r\n                             [messages]=\"{emptyMessage:'No Record Found.'}\"\r\n                             [count]=\"pagedData.pager.totalItems\"\r\n                             [offset]=\"pagedData.pager.currentPage\"\r\n                             [limit]=\"pagedData.pager.pageSize\"\r\n                             (page)='setPageAssociateProductList($event)'\r\n                             (sort)=\"onSortAssociateProductList($event)\"\r\n                             [selected]=\"selected\"\r\n                             [selectionType]=\"SelectionType.checkbox\"\r\n                             [selectAllRowsOnPage]=\"false\"\r\n                             [displayCheck]=\"displayCheck\"\r\n                             (select)=\"onSelectassociate($event,$event)\">\r\n\r\n                <ngx-datatable-column [width]=\"42\"\r\n                                      [sortable]=\"false\"\r\n                                      [canAutoResize]=\"false\"\r\n                                      [draggable]=\"false\"\r\n                                      [resizeable]=\"false\"\r\n                                      [headerCheckboxable]=\"true\"\r\n                                      [checkboxable]=\"true\">\r\n                </ngx-datatable-column>\r\n\r\n\r\n\r\n                <ngx-datatable-column name=\"Product Name\" [sortable]=\"true\" prop=\"ProductName\" [minWidth]=\"150\">\r\n\r\n\r\n                </ngx-datatable-column>\r\n\r\n                <ngx-datatable-column *ngIf=\"isloanapp != true\" name=\"Product Family\" sortable=\"true\" prop=\"ProductFamily\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                <ngx-datatable-column *ngIf=\"isloanapp != true\" name=\"Product Description\" sortable=\"true\" prop=\"ProductDescription\"></ngx-datatable-column>\r\n                <ngx-datatable-column *ngIf=\"isopportuinity != true\" name=\"Bank Name\" sortable=\"true\" prop=\"BankName\"></ngx-datatable-column>\r\n\r\n                <ngx-datatable-footer>\r\n                  <ng-template ngx-datatable-footer-template\r\n                               let-rowCount=\"rowCount\"\r\n                               let-pageSize=\"pageSize\"\r\n                               let-selectedCount=\"selectedCount\"\r\n                               let-currentPage=\"curPageAssoProdList\"\r\n                               let-offset=\"offsetAssociateProductList\"\r\n                               let-isVisible=\"isVisible\">\r\n                    <div class=\"page-count\" style=\"max-width:170px;\">\r\n                      Total Records: {{rowCount}}\r\n                    </div>\r\n                    <div>\r\n                      <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                        <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                          <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValueAssoProdList' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeAssoProdList($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                     bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                    <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                     [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                     [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                     [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                     [page]=\"curPageAssoProdList+1\"\r\n                                     [size]=\"pageSizeValueAssoProdList\"\r\n                                     [count]=\"pagedData.pager.totalItems\"\r\n                                     [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                     (change)=\"setPageAssociateProductList($event)\">\r\n                    </datatable-pager>\r\n                  </ng-template>\r\n                </ngx-datatable-footer>\r\n              </ngx-datatable>\r\n            </div>\r\n          </div>\r\n\r\n\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"saveProduct()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeassociatepopup()\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>-->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/leadlist.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/leadlist.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Leads</strong><p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Leads</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-7 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i></span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n                <div class=\"d-inline-block align-middle pl-2\">\r\n                  <label class=\"d-inline-block \"><b>Search in all records</b></label>\r\n                  <div class=\"form-group d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <input type=\"checkbox\" id=\"allRecords\" formControlName=\"allRecords\" [checked]=\"myCheckbox\" (click)=\"switchClicked($event)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-5\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0\">\r\n                <ng-select [items]=\"pagedData.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i></span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/lead/addlead\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add Lead\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rowHeight]=\"40\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [scrollbarH]=\"true\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\" [maxWidth]=\"2000\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'Name'\">\r\n                <a *ngIf='companyType == \"companytypeSolarInstall\"' class=\" view-list\" [routerLink]=\"['/lead/view',row.LeadID]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n                <a *ngIf='companyType != \"companytypeSolarInstall\"' class=\" view-list\" [routerLink]=\"['/lead/viewlead',row.LeadID]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'Name'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal:'Date'\" *ngIf=\"col.DT_CODE=='date'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal:'Date') : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\" *ngIf=\"col.DT_CODE=='datetime'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.DATA_TYPE!='bit' && col.FieldType != 'select' && col.COLUMN_NAME !='Email' && col.DT_CODE!='datetime'\">\r\n                  {{row[col.COLUMN_NAME]}}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.COLUMN_NAME=='Email'\">\r\n                  {{row[col.COLUMN_NAME] }}\r\n                </div>\r\n                <div *ngIf=\"col.FieldType == 'select'\">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                  <div *ngIf=\"col.FieldFrom==null\">\r\n                    <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                      <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                      <div *ngIf=\"itemColorCode.colorkey!=undefined\" style=\"max-width:150px !important;\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.LeadID\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.LeadID}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <!--<a href=\"#\" class=\"actions-onclick view-list\"><i class=\"fa fa-eye\"></i><br />View</a>\r\n                    <a href=\"#\" class=\"actions-onclick edit-list\"><i class=\"fa fa-pencil\"></i><br />Edit</a>\r\n                    <a class=\"actions-onclick view-list\" data-toggle=\"modal\" href=\"#myModal1\"><i class=\"fa fa-clock-o\"></i><br />Version History</a>-->\r\n                    <!--<a *ngIf=\"row.is_Converted != true && row.StatusName != 'Unqualified' && row.StatusName != 'None'  \" (click)=\"showpopup(row.LeadID)\" class=\"actions-onclick view-list\" href=\"javascript:void(0);\" title=\"Convert Lead\"><i class=\"fa fa-exchange text-warning pr-2\"></i></a>-->\r\n                    <a *ngIf=\"row.is_Converted != true && row.conditionstatus != 'Unqualified' && row.conditionstatus != 'None'\" (click)=\"showpopup(row.LeadID)\" class=\"actions-onclick view-list\" href=\"javascript:void(0);\" title=\"Convert Lead\"><i class=\"fa fa-exchange text-warning pr-2\"></i></a>\r\n                    <a *ngIf='companyType == \"companytypeSolarInstall\"' class=\"actions-onclick view-list\" [routerLink]=\"['/lead/view',row.LeadID]\" href=\"javascript:void(0);\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>\r\n\r\n                    <a *ngIf='companyType != \"companytypeSolarInstall\"' class=\"actions-onclick view-list\" [routerLink]=\"['/lead/viewlead',row.LeadID]\" href=\"javascript:void(0);\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>\r\n\r\n\r\n                    <a *ngIf='isUpdate && row.is_Converted != true' class=\"actions-onclick view-list\" href=\"javascript:void(0);\" [routerLink]=\"['/lead/editlead',row.LeadID]\" title=\"Edit\"><i class=\"fa fa-pencil text-success\"></i></a>\r\n                    <a *ngIf='isUpdate && row.is_Converted == true ' class=\"actions-onclick view-list\" href=\"javascript:void(0);\" title=\"Edit\"><i class=\"fa fa-pencil text-secondary\"></i></a>\r\n                    <a *ngIf='isDelete' title=\"Click to delete.\" class=\"actions-onclick view-list\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n              </div>\r\n\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<div bsModal #makeappointment=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Lead Convert</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; height:100%;\">\r\n\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n\r\n              <!--<div class=\"col-12 col-md-6 col-lg-6\">\r\n                <div class=\"radio\">\r\n                  <input id=\"createnewaccount\" (change)=\"OnAccountSelected($event)\" type=\"radio\" value=\"createnewaccount\" formControlName=\"Account\">\r\n                  <label for=\"createnewaccount\" class=\"radio-label\">Create New</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <div class=\"radio\">\r\n                  <input id=\"chooseexistingaccount\"  (change)=\"OnAccountExistingSelected($event)\" type=\"radio\" value=\"chooseexistingaccount\" formControlName=\"Account\">\r\n                  <label for=\"chooseexistingaccount\" class=\"radio-label\">Choose Existing</label>\r\n                </div>\r\n              </div>-->\r\n\r\n\r\n              <h3 class=\"form-heading \"><span>Create New Account:</span></h3>\r\n              <!--<div class=\"col-md-12\" *ngIf=\"isAccountExisting;else elsecase\">-->\r\n              <div class=\"row\">\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Account Name:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Enter Account Name\" formControlName=\"accountName\" [ngClass]=\"{'is-invalid': (accountName.invalid && (accountName.dirty || accountName.touched) && (accountName.errors?.required || accountName.errors?.maxlength)) }\">\r\n                    <small *ngIf=\"accountName.invalid && (accountName.dirty || accountName.touched) && accountName.errors?.required\"\r\n                           class=\"text-danger\">Account Name is required</small>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Account Type:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"lstaccounttype\" class=\"disabledddl\"\r\n                               placeholder=\"Select Record Type\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"accounttypeid\"\r\n                               [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (accounttypeid.invalid && (accounttypeid.dirty || accounttypeid.touched) && accounttypeid.errors?.required) }\"></ng-select>\r\n                    <small *ngIf=\"accounttypeid.invalid && (accounttypeid.dirty || accounttypeid.touched) && accounttypeid.errors?.required\"\r\n                           style=\"color:red;\">Please select Account Type</small>\r\n\r\n\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!--</div>-->\r\n              <!--<ng-template #elsecase>\r\n                <div class=\"col-12\">\r\n                  <div class=\"col-12 col-md-6 col-lg-6\">\r\n                    <label>Account Search:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select #clearDrop [items]=\"accountSearch\"\r\n                                 placeholder=\"Search For Matching Account\" bindValue=\"value\" bindLabel=\"text\"\r\n                                 [closeOnSelect]=\"true\">\r\n\r\n\r\n                      </ng-select>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n              </ng-template>-->\r\n              <!--<div class=\"col-12 col-md-6 col-lg-6\">\r\n                <div class=\"radio\">\r\n                  <input id=\"createnewcontact\" type=\"radio\" value=\"createnewcontact\" formControlName=\"contact\">\r\n                  <label for=\"createnewcontact\" class=\"radio-label\">Create New</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <div class=\"radio\">\r\n                  <input id=\"chooseexistingcontact\" type=\"radio\" value=\"chooseexistingcontact\" formControlName=\"contact\">\r\n                  <label for=\"chooseexistingcontact\" class=\"radio-label\">Choose Existing</label>\r\n                </div>\r\n              </div>-->\r\n\r\n\r\n              <h3 class=\"form-heading \"><span>Associate Contacts:</span></h3>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"table-responsive\">\r\n                  <div class=\"table table-striped w-check-radio\">\r\n                    <ngx-datatable #table34 class=\"bootstrap\"\r\n                                   [rows]=\"pagedDataLeadconvert.data\"\r\n                                   [columnMode]=\"'force'\"\r\n                                   [scrollbarH]=\"true\"\r\n                                   [rowHeight]=\"'40'\"\r\n                                   [headerHeight]=\"40\"\r\n                                   [footerHeight]=\"40\"\r\n                                   [externalPaging]=\"true\"\r\n                                   [externalSorting]=\"true\"\r\n                                   [loadingIndicator]=\"loadSave\"\r\n                                   [messages]=\"{emptyMessage:'No Record Found.'}\"\r\n                                   [count]=\"pagedDataLeadconvert.pager.totalItems\"\r\n                                   [offset]=\"pagedDataLeadconvert.pager.currentPage\"\r\n                                   [limit]=\"pagedDataLeadconvert.pager.pageSize\"\r\n                                   (page)='setPageLeadconvert($event)'\r\n                                   (sort)=\"onSortLeadconvert($event)\"\r\n                                   [selected]=\"selectedleadconvert\"\r\n                                   [selectionType]=\"'checkbox'\"\r\n                                   [selectAllRowsOnPage]=\"false\"\r\n                                   [displayCheck]=\"displayCheck12\"\r\n                                   (select)=\"onSelectLeadconvert($event)\">\r\n\r\n                      <ngx-datatable-column [width]=\"42\"\r\n                                            [sortable]=\"false\"\r\n                                            [canAutoResize]=\"false\"\r\n                                            [draggable]=\"false\"\r\n                                            [resizeable]=\"false\"\r\n                                            [headerCheckboxable]=\"false\"\r\n                                            [checkboxable]=\"true\">\r\n                      </ngx-datatable-column>\r\n\r\n\r\n                      <ngx-datatable-column name=\"Name\" [sortable]=\"true\" prop=\"Name\" [minWidth]=\"150\">\r\n\r\n\r\n                      </ngx-datatable-column>\r\n\r\n                      <ngx-datatable-column name=\"Email\" sortable=\"true\" prop=\"Email\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                      <ngx-datatable-column name=\"Phone No\" sortable=\"true\" prop=\"MobilePhone\"></ngx-datatable-column>\r\n                      <!--<ngx-datatable-column name=\"Primary\" sortable=\"true\" prop=\"IsPrimary\">\r\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" disabled [checked]=\"row.IsPrimary\">\r\n                            <span class=\"slider round\"><span>Yes</span></span>\r\n                          </label>\r\n                        </ng-template>\r\n                      </ngx-datatable-column>-->\r\n                      <ngx-datatable-footer>\r\n                        <ng-template ngx-datatable-footer-template\r\n                                     let-rowCount=\"rowCount\"\r\n                                     let-pageSize=\"pageSize\"\r\n                                     let-selectedCount=\"selectedCount\"\r\n                                     let-currentPage=\"currentPage\"\r\n                                     let-offset=\"offset\"\r\n                                     let-isVisible=\"isVisible\">\r\n                          <div class=\"page-count\" style=\"max-width:170px;\">\r\n                            Total Records: {{rowCount}}\r\n                          </div>\r\n                          <div>\r\n                            <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                              <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                                <ng-select [searchable]=\"false\" [items]=\"lstPageSizeLeadconvert\" appendTo=\"body\" [(ngModel)]='pageSizeValueLeadconvert' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeLeadconvert($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                           bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                              </span>\r\n                            </div>\r\n                          </div>\r\n                          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                           [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                           [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                           [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                           [page]=\"pagedDataLeadconvert.pager.currentPage+1\"\r\n                                           [size]=\"pageSizeValue\"\r\n                                           [count]=\"pagedDataLeadconvert.pager.totalItems\"\r\n                                           [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                           (change)=\"setPageLeadconvert($event)\">\r\n                          </datatable-pager>\r\n                        </ng-template>\r\n                      </ngx-datatable-footer>\r\n                    </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 p-0\" *ngIf=\"isloanapp != true\">\r\n                <h3 class=\"form-heading \"><span>Create New Opportunity:</span></h3>\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Opportunity Name:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Enter last Name\" formControlName=\"opportunityname\" [ngClass]=\"{'is-invalid': (opportunityname.invalid && (opportunityname.dirty || opportunityname.touched) && (opportunityname.errors?.required || opportunityname.errors?.maxlength)) }\">\r\n                    <small *ngIf=\"opportunityname.invalid && (opportunityname.dirty || opportunityname.touched) && opportunityname.errors?.required\"\r\n                           class=\"text-danger\">Opportunity Name is required</small>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 p-0\" *ngIf=\"isopportuinity != true\">\r\n                <h3 class=\"form-heading\"><span>Associate Products:</span><a href=\"javascript:void(0);\" (click)=\"associateproduct()\"><i class=\"fa fa-plus mr-2\"></i>Associate Product</a></h3>    <div class=\"col-12 col-md-12 col-lg-12\">\r\n                  <div class=\"table-responsive\">\r\n                    <div class=\"table table-striped w-check-radio\">\r\n                      <ngx-datatable #table12 class=\"bootstrap\"\r\n                                     [rows]=\"AssociatedproductpagedData.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [messages]=\"{emptyMessage:'No Record Found.'}\"\r\n                                     [count]=\"AssociatedproductpagedData.pager.totalItems\"\r\n                                     [offset]=\"AssociatedproductpagedData.pager.currentPage\"\r\n                                     [limit]=\"AssociatedproductpagedData.pager.pageSize\"\r\n                                     (page)='setPageAssociateProduct($event)'\r\n                                     (sort)=\"onSort($event)\"\r\n                                     [selected]=\"selectedassociateprouct\"\r\n                                     [selectionType]=\"'checkbox'\"\r\n                                     [selectAllRowsOnPage]=\"false\"\r\n                                     [displayCheck]=\"displayCheck\"\r\n                                     (select)=\"onSelectproductconvert($event)\">\r\n\r\n                        <ngx-datatable-column [width]=\"42\"\r\n                                              [sortable]=\"false\"\r\n                                              [canAutoResize]=\"false\"\r\n                                              [draggable]=\"false\"\r\n                                              [resizeable]=\"false\"\r\n                                              [headerCheckboxable]=\"false\"\r\n                                              [checkboxable]=\"true\">\r\n                        </ngx-datatable-column>\r\n\r\n\r\n                        <ngx-datatable-column name=\"Product Name\" [sortable]=\"false\" prop=\"ProductName\" [minWidth]=\"200\"></ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column name=\"Bank Name\" sortable=\"false\" prop=\"BankName\" [minWidth]=\"200\"></ngx-datatable-column>\r\n\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\" style=\"max-width:170px;\">\r\n                              Total Records: {{rowCount}}\r\n                            </div>\r\n                            <div>\r\n                              <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                                <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                                  <ng-select [searchable]=\"false\" [items]=\"lstPageSizeAssociateProduct\" appendTo=\"body\" [(ngModel)]='pageSizeValueAssociateProduct' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeAssociateProduct($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                             bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                                </span>\r\n                              </div>\r\n                            </div>\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                             [page]=\"AssociatedproductpagedData.pager.currentPage+1\"\r\n                                             [size]=\"pageSizeValueAssociateProduct\"\r\n                                             [count]=\"AssociatedproductpagedData.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                             (change)=\"setPageAssociateProduct($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--loan Application start-->\r\n              <!--loan app end-->\r\n\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button *ngIf=\"isloanapp != true\" type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"saveLeadConvert()\"><i class=\"fa fa-exchange text-white\"></i> Convert</button>\r\n        <button *ngIf=\"isopportuinity != true\" type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"saveLeadConvertproduct()\"><i class=\"fa fa-exchange text-white\"></i> Convert</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<div bsModal #loanApplicationModal=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-xl modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Loan Application</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeLoanApplicationModal()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px;height:600px; overflow-y:auto\" *ngIf=\"loanid!=0\">\r\n\r\n        <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n          <li class=\"nav-item\" *ngFor=\"let item of pagenames;let i=index\">\r\n            <a class=\"nav-link\" [ngClass]=\"{'active':(i==activeWizard),'disabled':(i!=activeWizard)}\" id=\"{{item.formmasterid}}-tab\" data-toggle=\"pill\" role=\"tab\" aria-selected=\"true\">\r\n              <span class=\"circle\">{{i+1}}</span> {{item.sub_module_name}}\r\n            </a>\r\n          </li>\r\n        </ul>\r\n        <div class=\"tab-content\" id=\"pills-tabContent\">\r\n          <div *ngFor=\"let item of pagenames;let i=index\" class=\"tab-pane fade show\" [ngClass]=\"{'active':(i==activeWizard)}\" id=\"{{(item.formmasterid==null ? item.module_name_code:item.formmasterid)}}\" role=\"tabpanel\">\r\n            <app-forminfo *ngIf='item.formmasterid !=null' submoduleName={{item.formmasterid}} moduleName=\"form\" (finishWizard)=\"finishStep($event)\" [wizardIndex]=\"i\" [totalWizard]=\"pagenames.length\" (wizardOutput)=\"nexStep($event)\" [leadconvert]=\"true\" [leadid]=\"leadid\" [loanid]=\"loanid\"></app-forminfo>\r\n\r\n            <app-applicant *ngIf=\"item.module_name_code == 'LoanApplicationInstallationProperty'\" (finishWizard)=\"finishStep($event)\" [leadconvert]=\"true\" [totalWizard]=\"pagenames.length\" [wizardIndex]=\"i\" (wizardOutput)=\"nexStep($event)\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\"\r\n                           submoduleName=\"LoanApplicationInstallationProperty\"></app-applicant>\r\n            <app-applicant *ngIf=\" item.module_name_code == 'LoanApplicationApplicant'\" (finishWizard)=\"finishStep($event)\" [leadconvert]=\"true\" [wizardIndex]=\"i\" [totalWizard]=\"pagenames.length\" (wizardOutput)=\"nexStep($event)\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\"\r\n                           submoduleName=\"LoanApplicationApplicant\"></app-applicant>\r\n            <app-applicant *ngIf=\"item.module_name_code == 'LoanApplicationCoapplicant'\" (finishWizard)=\"finishStep($event)\" [leadconvert]=\"true\" [wizardIndex]=\"i\" [totalWizard]=\"pagenames.length\" (wizardOutput)=\"nexStep($event)\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\"\r\n                           submoduleName=\"LoanApplicationCoapplicant\"></app-applicant>\r\n            <app-applicant *ngIf=\" item.module_name_code == 'Loan ApplicationPaymentInfo'\" (finishWizard)=\"finishStep($event)\" [leadconvert]=\"true\" [wizardIndex]=\"i\" [totalWizard]=\"pagenames.length\" (wizardOutput)=\"nexStep($event)\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\"\r\n                           submoduleName=\"Loan ApplicationPaymentInfo\"></app-applicant>\r\n            <app-applicant *ngIf=\" item.module_name_code == 'LoanApplicationProductInfo'\" (finishWizard)=\"finishStep($event)\" [leadconvert]=\"true\" [wizardIndex]=\"i\" [totalWizard]=\"pagenames.length\" (wizardOutput)=\"nexStep($event)\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\"\r\n                           submoduleName=\"LoanApplicationProductInfo\"></app-applicant>\r\n\r\n            <app-applicant *ngIf=\"item.module_name_code == 'LoanApplicationInfo'\" (finishWizard)=\"finishStep($event)\"\r\n                           [leadconvert]=\"true\" [itemdata12]=\"item\" (wizardOutput)=\"nexStep($event)\" [wizardIndex]=\"i\" [totalWizard]=\"pagenames.length\"\r\n                           submoduleName=\"LoanApplicationInfo\" [leadid]=\"leadid\"\r\n                           [loanid]=\"loanid\"></app-applicant>\r\n\r\n            <app-ntp *ngIf=\"item.module_name_code == 'LoanApplicationNTP'\" (finishWizard)=\"finishStep($event)\" [totalWizard]=\"pagenames.length\" [leadconvert]=\"true\" [wizardIndex]=\"i\" (wizardOutput)=\"nexStep($event)\" [itemdata12]=\"item\" submoduleName=\"LoanApplicationNTP\" [leadid]=\"leadid\" [loanid]=\"loanid\"></app-ntp>\r\n            <app-releasefunds *ngIf=\"item.module_name_code == 'LoanApplicationReleaseFunds'\" (finishWizard)=\"finishStep($event)\" [totalWizard]=\"pagenames.length\" [leadconvert]=\"true\" [wizardIndex]=\"i\" (wizardOutput)=\"nexStep($event)\" submoduleName=\"LoanApplicationReleaseFunds\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\"></app-releasefunds>\r\n            <!--<hr />\r\n            <button value=\"Next\" (click)=\"nextStep()\">\r\n              Next\r\n            </button>\r\n            <button value=\"Back\" (click)=\"backStep()\">\r\n              Back\r\n            </button>-->\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <!--<div class=\"panel\" *ngIf='item.formmasterid !=null'>\r\n          <div class=\"panel-heading\">\r\n            <h4 class=\"panel-title\">\r\n              <a href=\"#panelBodyOne{{item.formmasterid}}\" (click)=\"change()\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#panelBodyOne{{item.formmasterid}}\"> <span>   {{item.sub_module_name}}</span> <span style=\"display:none\" class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n            </h4>\r\n          </div>\r\n          <div id=\"panelBodyOne{{item.formmasterid}}\" class=\" collapse\" data-parent=\"#accordion\">\r\n            <app-forminfo submoduleName={{item.formmasterid}} moduleName=\"form\" [leadconvert]=\"true\" [leadid]=\"leadid\" [loanid]=\"loanid\"></app-forminfo>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"panel\" *ngIf=\"item.sub_module_name == 'Loan Information'\">\r\n          <div class=\"panel-heading\">\r\n            <h4 class=\"panel-title\">\r\n              <a href=\"#panelBodyOne\" (click)=\"change()\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#panelBodyOne\"> <span>{{item.sub_module_name}}</span> <span style=\"display:none\" class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n            </h4>\r\n          </div>\r\n          <div id=\"panelBodyOne\" class=\" collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\r\n            <app-applicant [leadconvert]=\"true\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\"\r\n                           submoduleName=\"LoanApplicationInfo\"></app-applicant>\r\n          </div>\r\n        </div>\r\n        <div class=\"panel\" *ngIf=\"item.module_name_code == 'LoanApplicationInstallationProperty' \">\r\n          <div class=\"panel-heading\">\r\n            <h4 class=\"panel-title\">\r\n              <a href=\"#panelBodyTwo\" (click)=\"change()\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#panelBodyTwo\"> <span>{{item.sub_module_name}}</span><span style=\"display:none\" class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n            </h4>\r\n          </div>\r\n          <div id=\"panelBodyTwo\" class=\"panel-collapse collapse\" data-parent=\"#accordion\">\r\n            <app-applicant [leadconvert]=\"true\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\" submoduleName=\"LoanApplicationInstallationProperty\"></app-applicant>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"panel\" *ngIf=\"item.sub_module_name == 'Applicant Information' \">\r\n          <div class=\"panel-heading\">\r\n            <h4 class=\"panel-title\">\r\n              <a href=\"#panelBodyThree\" (click)=\"change()\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#panelBodyThree\"><span> {{item.sub_module_name}}</span><span style=\"display:none\" class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n            </h4>\r\n          </div>\r\n          <div id=\"panelBodyThree\" class=\"panel-collapse collapse\" data-parent=\"#accordion\">\r\n            <app-applicant [leadconvert]=\"true\" submoduleName=\"LoanApplicationApplicant\" [leadid]=\"leadid\" [loanid]=\"loanid\" [itemdata12]=\"item\"></app-applicant>\r\n          </div>\r\n        </div>\r\n        <div class=\"panel\" *ngIf=\"item.sub_module_name == 'Co-Applicant Information' \">\r\n          <div class=\"panel-heading\">\r\n            <h4 class=\"panel-title\">\r\n              <a href=\"#panelBodySix\" (click)=\"change()\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#panelBodySix\"><span> {{item.sub_module_name}}</span><span style=\"display:none\" class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n            </h4>\r\n          </div>\r\n          <div id=\"panelBodySix\" class=\"panel-collapse collapse\" data-parent=\"#accordion\">\r\n            <app-applicant [leadconvert]=\"true\" submoduleName=\"LoanApplicationCoapplicant\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\"></app-applicant>\r\n          </div>\r\n        </div>\r\n        <div class=\"panel\" *ngIf=\"item.sub_module_name == 'Payment Information' \">\r\n          <div class=\"panel-heading\">\r\n            <h4 class=\"panel-title\">\r\n              <a href=\"#panelBodyfourteen\" (click)=\"change()\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#panelBodyfourteen\"><span> {{item.sub_module_name}}</span><span style=\"display:none\" class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n            </h4>\r\n          </div>\r\n          <div id=\"panelBodyfourteen\" class=\"panel-collapse collapse\" data-parent=\"#accordion\">\r\n            <app-applicant [leadconvert]=\"true\" submoduleName=\"Loan ApplicationPaymentInfo\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\"></app-applicant>\r\n          </div>\r\n        </div>\r\n        <div class=\"panel\" *ngIf=\"item.module_name_code == 'LoanApplicationProductInfo' \">\r\n          <div class=\"panel-heading\">\r\n            <h4 class=\"panel-title\">\r\n              <a href=\"#panelBodyfourteen34\" (click)=\"change()\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#panelBodyfourteen34\"><span> {{item.sub_module_name}}</span><span style=\"display:none\" class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n            </h4>\r\n          </div>\r\n          <div id=\"panelBodyfourteen34\" class=\"panel-collapse collapse\" data-parent=\"#accordion\">\r\n            <app-applicant [leadconvert]=\"true\" submoduleName=\"LoanApplicationProductInfo\" [leadid]=\"leadid\" [loanid]=\"loanid\" [itemdata12]=\"item\"></app-applicant>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"panel\" *ngIf=\"item.module_name_code == 'LoanApplicationNTP'\">\r\n          <div class=\"panel-heading\">\r\n            <h4 class=\"panel-title\">\r\n              <a href=\"#panelBody91\" (click)=\"change()\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#panelBody91\"><span>  {{item.sub_module_name}}</span><span class=\"edit\" style=\"display:none\"><i class=\"fa fa-pencil\"></i></span></a>\r\n            </h4>\r\n          </div>\r\n          <div id=\"panelBody91\" class=\"panel-collapse collapse\" data-parent=\"#accordion\">\r\n            <app-ntp [leadconvert]=\"true\" [itemdata12]=\"item\" submoduleName=\"LoanApplicationNTP\" [leadid]=\"leadid\" [loanid]=\"loanid\"></app-ntp>\r\n          </div>\r\n        </div>\r\n        <div class=\"panel\" *ngIf=\"item.module_name_code == 'LoanApplicationReleaseFunds' \">\r\n          <div class=\"panel-heading\">\r\n            <h4 class=\"panel-title\">\r\n              <a href=\"#panelBody81\" (click)=\"change()\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#panelBody81\"><span>  {{item.sub_module_name}}</span><span class=\"edit\" style=\"display:none\"><i class=\"fa fa-pencil\"></i></span></a>\r\n            </h4>\r\n          </div>\r\n          <div id=\"panelBody81\" class=\"panel-collapse collapse\" data-parent=\"#accordion\">\r\n            <app-releasefunds [leadconvert]=\"true\" submoduleName=\"LoanApplicationReleaseFunds\" [itemdata12]=\"item\" [leadid]=\"leadid\" [loanid]=\"loanid\"></app-releasefunds>\r\n          </div>\r\n        </div>-->\r\n\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<div class=\"modal fade in show\" bsModal #product=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-xl modal-info\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Associate  Product</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeassociatepopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px; height:700px;\">\r\n\r\n        <div class=\"row\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"table-responsive\">\r\n            <div class=\"table table-striped\">\r\n              <ngx-datatable #table class=\"bootstrap\"\r\n                             [rows]=\"pagedData.data\"\r\n                             [scrollbarH]=\"true\"\r\n                             [rowHeight]=\"'40'\"\r\n                             [columnMode]=\"'force'\"\r\n                             [headerHeight]=\"40\"\r\n                             [footerHeight]=\"40\"\r\n                             [externalPaging]=\"true\"\r\n                             [externalSorting]=\"true\"\r\n                             [loadingIndicator]=\"loadSave\"\r\n                             [messages]=\"{emptyMessage:'No Record Found.'}\"\r\n                             [count]=\"pagedData.pager.totalItems\"\r\n                             [offset]=\"pagedData.pager.currentPage\"\r\n                             [limit]=\"pagedData.pager.pageSize\"\r\n                             (page)='setPageAssociateProductList($event)'\r\n                             (sort)=\"onSortAssociateProductList($event)\"\r\n                             [selected]=\"selected\"\r\n                             [selectionType]=\"SelectionType.checkbox\"\r\n                             [selectAllRowsOnPage]=\"false\"\r\n                             [displayCheck]=\"displayCheck\"\r\n                             (select)=\"onSelectassociate($event)\">\r\n\r\n                <ngx-datatable-column [width]=\"42\"\r\n                                      [sortable]=\"false\"\r\n                                      [canAutoResize]=\"false\"\r\n                                      [draggable]=\"false\"\r\n                                      [resizeable]=\"false\"\r\n                                      [headerCheckboxable]=\"true\"\r\n                                      [checkboxable]=\"true\">\r\n                </ngx-datatable-column>\r\n\r\n\r\n\r\n                <ngx-datatable-column name=\"Product Name\" [sortable]=\"true\" prop=\"ProductName\" [minWidth]=\"150\">\r\n\r\n\r\n                </ngx-datatable-column>\r\n\r\n                <ngx-datatable-column *ngIf=\"isloanapp != true\" name=\"Product Family\" sortable=\"true\" prop=\"ProductFamily\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                <ngx-datatable-column *ngIf=\"isloanapp != true\" name=\"Product Description\" sortable=\"true\" prop=\"ProductDescription\"></ngx-datatable-column>\r\n                <ngx-datatable-column *ngIf=\"isopportuinity != true\" name=\"Bank Name\" sortable=\"true\" prop=\"BankName\"></ngx-datatable-column>\r\n\r\n                <ngx-datatable-footer>\r\n                  <ng-template ngx-datatable-footer-template\r\n                               let-rowCount=\"rowCount\"\r\n                               let-pageSize=\"pageSize\"\r\n                               let-selectedCount=\"selectedCount\"\r\n                               let-currentPage=\"curPageAssoProdList\"\r\n                               let-offset=\"offsetAssociateProductList\"\r\n                               let-isVisible=\"isVisible\">\r\n                    <div class=\"page-count\" style=\"max-width:170px;\">\r\n                      Total Records: {{rowCount}}\r\n                    </div>\r\n                    <div>\r\n                      <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                        <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                          <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValueAssoProdList' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeAssoProdList($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                     bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                    <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                     [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                     [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                     [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                     [page]=\"curPageAssoProdList+1\"\r\n                                     [size]=\"pageSizeValueAssoProdList\"\r\n                                     [count]=\"pagedData.pager.totalItems\"\r\n                                     [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                     (change)=\"setPageAssociateProductList($event)\">\r\n                    </datatable-pager>\r\n                  </ng-template>\r\n                </ngx-datatable-footer>\r\n              </ngx-datatable>\r\n            </div>\r\n          </div>\r\n\r\n\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"saveProduct()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeassociatepopup()\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n<div class=\"modal fade show\" bsModal #creditscore=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-sm modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Application Info</h4>\r\n        <!--<button type=\"button\" class=\"close\" (click)=\"closecreditscore()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>-->\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px; max-height:238px; line-height: 24px; font-size: 13px;\">\r\n        <div *ngIf=\"creditScoreData[0].data.applicationStatus != 'Failed'\">\r\n          <p>\r\n            <strong>Dear {{leadDetails.FirstName}} {{leadDetails.LastName}},</strong><br /><br /> Thank you for applying.\r\n            Your application number is <strong style=\"color: #1784d0;\">{{loanApplicationNumber}}</strong> for future reference.\r\n            <br /><br />\r\n            Your credit score category is <strong style=\"color: #1784d0;\">{{creditScoreData[0].data.creditScoreCategory}}</strong>\r\n            <br /><br />\r\n            Congratulations! You have been approved. Please look for an e-mail from your installer with your solar financing options. Installers, to initiate eSignatures or edit the application, login at LoanHomi.\r\n            <br />\r\n          </p>\r\n\r\n          <div class=\"w-100 req-doc-lead\" *ngIf=\"mandatoryDocuments.length > 0\">\r\n            <h3 class=\"form-heading ng-star-inserted ml-0 mt-0\"><span>Mandatory Documents:</span></h3>\r\n            <ul>\r\n              <li *ngFor=\"let document of mandatoryDocuments\"><span>{{document}}</span></li>\r\n            </ul>\r\n          </div>\r\n          <br />\r\n          <p>Is verification of income required for this loan? <strong>{{incomeVerification}}</strong></p>\r\n        </div>\r\n        <div *ngIf=\"creditScoreData[0].data.applicationStatus == 'Failed'\">\r\n          <p>\r\n            <strong>Dear {{leadDetails.FirstName}} {{leadDetails.LastName}},</strong><br /><br /> Thank you for applying.\r\n            Your application number is <strong style=\"color: #1784d0;\">{{loanApplicationNumber}}</strong> for future reference.\r\n            <br /><br />\r\n            Unfortunately at this time we can not find any solar loan options that match your application profile. Please check with your installer to find additional financing sources.\r\n            <br />\r\n            Installers, if you feel this decision was caused by an error during the application process, please log into LoanHomi.\r\n            <br />\r\n\r\n          </p>\r\n          <!--<div class=\"w-100 req-doc-lead\">\r\n            <h3 class=\"form-heading ng-star-inserted ml-0 mt-0\"><span>Reasons the application could not be approved were the following:</span></h3>\r\n            <ul>\r\n              <li><span>Credit Score must be at least 650</span></li>\r\n            </ul>\r\n          </div>-->\r\n\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n\r\n        <!--<button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"proceed()\"><i class=\"fa fa-exchange text-white\"></i> Proceed</button>-->\r\n        <!--<button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closecreditscore()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>-->\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeCreditScoreModel()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"crm\" subModuleName=\"lead\"></app-searchfilteradd>\r\n<app-manageviewnew (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"crm\" subModuleName=\"lead\"></app-manageviewnew>\r\n\r\n<app-leadconvertpopup #leadconvert></app-leadconvertpopup>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/viewlead.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/viewlead.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<script src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE&callback=initMap&libraries=&v=weekly\" defer>\r\n</script>\r\n\r\n<div class=\"header float-left w-100 mb-1\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{leadName}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/lead\">Manage Leads </a></li>\r\n      <li class=\"active\">Lead Detail</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n\r\n<!--Lead Detail-->\r\n<div class=\"card mb-3 mt-1\">\r\n  <div class=\"card-body\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-7\">\r\n        <div class=\"border h-100\">\r\n          <div class=\"detail-heading cust_infobx px-3 py-2\">\r\n            <ul class=\"d-flex list_spc\">\r\n              <li><i class=\"fa fa-phone\"></i> {{mobileno}} </li>\r\n\r\n              <li><i class=\"fa fa-envelope\"></i> {{emaildata}} </li>\r\n            </ul>\r\n          </div>\r\n\r\n\r\n          <div class=\"px-3 py-3\">\r\n            <div class=\"row\">\r\n\r\n              <div class=\"col-md-12\">\r\n                <div class=\"row\">\r\n\r\n                  <div class=\"col-12 col-lg-6 mb-3\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-12 col-md-4\">\r\n                        <label class=\"mr-2\">Lead status:</label>\r\n                      </div>\r\n                      <div class=\"col-12 col-md-8\">\r\n                        <b>{{leadstatus}}</b> <a href=\"javascript:void(0);\" (click)=\"updateStatusdllopn()\" class=\"text-success ml-3\"><i class=\"fa fa-pencil\"></i></a>\r\n                      </div>\r\n                      <div class=\"col-12 col-md-8\" *ngIf=\"is_converted != true && statusdll != false \">\r\n                        <form [formGroup]=\"leadform\" autocomplete=\"off\">\r\n                          <div class=\"row\">\r\n                            <div class=\"col-12 col-md-8\">\r\n\r\n                              <ng-select [items]=\"lstleadstatus\" placeholder=\"Select lead Status\" formControlName=\"leadstatusddl\"\r\n                                         bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (leadstatusddl.invalid && (leadstatusddl.dirty || leadstatusddl.touched) && leadstatusddl.errors?.required) }\"></ng-select>\r\n                              <small *ngIf=\"leadstatusddl.invalid && (leadstatusddl.dirty || leadstatusddl.touched) && leadstatusddl.errors?.required\"\r\n                                     style=\"color:red;\">Please select lead status</small>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-4\">\r\n                              <a href=\"javascript:void(0);\" *ngIf=\"is_converted != true\" type=\"submit\" (click)=\"updateLeadStatus()\" class=\"btn btn-success  \"><i class=\"fa fa-save\"></i></a>\r\n                            </div>\r\n                          </div>\r\n                        </form>\r\n\r\n                      </div>\r\n                    </div>\r\n\r\n                  </div>\r\n                  <div class=\"col-12 col-lg-6 mb-3\">\r\n\r\n                    <div class=\"row\" *ngIf=\"!createdcode\">\r\n                      <div class=\"col-12 col-md-4\">\r\n                        <label class=\"mr-2\">Created By:</label>\r\n                      </div>\r\n                      <div class=\"col-12 col-md-8\">\r\n                        <b>{{createdby}}</b>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"row\" *ngIf=\"createdcode\">\r\n                      <div class=\"col-12 col-md-4\">\r\n                        <label class=\"mr-2\">Created By:</label>\r\n                      </div>\r\n                      <div class=\"col-12 col-md-8\" *ngIf=\"is_converted != true\">\r\n                        <b>{{createdby}}</b> <a href=\"javascript:void(0);\" (click)=\"opencreatedby()\" class=\"text-success ml-3\"><i class=\"fa fa-pencil\"></i></a>\r\n                      </div>\r\n                      <div class=\"col-12 col-md-8\" *ngIf=\"is_converted != true && createddll != false \">\r\n                        <form [formGroup]=\"leadform\" autocomplete=\"off\">\r\n                          <div class=\"row\">\r\n                            <div class=\"col-12 col-md-8\">\r\n\r\n                              <ng-select [items]=\"usersList\" placeholder=\"Select lead Status\" formControlName=\"createdbyddl\"\r\n                                         bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (createdbyddl.invalid && (createdbyddl.dirty || createdbyddl.touched) && createdbyddl.errors?.required) }\"></ng-select>\r\n                              <small *ngIf=\"createdbyddl.invalid && (createdbyddl.dirty || createdbyddl.touched) && createdbyddl.errors?.required\"\r\n                                     style=\"color:red;\">Please select name</small>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-4\">\r\n                              <a href=\"javascript:void(0);\" *ngIf=\"is_converted != true\" type=\"submit\" (click)=\"updatecreatedBy()\" class=\"btn btn-success  \"><i class=\"fa fa-save\"></i></a>\r\n                            </div>\r\n                          </div>\r\n                        </form>\r\n\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-lg-6 mb-3\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-12 col-md-4\">\r\n                        <label class=\"mr-2\">lead Source:</label>\r\n                      </div>\r\n                      <div class=\"col-12 col-md-8\">\r\n                        <b>{{leadSource}}</b>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-lg-6 mb-3\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-12 col-md-4\">\r\n                        <label class=\"mr-2\">Created On:</label>\r\n                      </div>\r\n                      <div class=\"col-12 col-md-8\">\r\n                        <b>{{createdon}}</b>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-lg-6 mb-3\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-12 col-md-4\">\r\n                        <label class=\"mr-2\">Location:</label>\r\n                      </div>\r\n                      <div class=\"col-12 col-md-8\">\r\n                        <b>{{location}}</b>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <div class=\"col-md-12 mt-2\">\r\n                <!--<a href=\"#\" class=\"btn btn-light-blue mr-2 px-4\" style=\"padding-left: 5px;\"><i class=\"fa fa-external-link\"></i> View Portal</a>-->\r\n                <!--<a href=\"javascript:void(0);\" class=\"btn btn-blue mr-2 px-4\"><i class=\"fa fa-phone\"></i> Call</a>-->\r\n                <a href=\"javascript:void(0);\" *ngIf=\"is_converted != true\" (click)=\"showemailpopup()\" class=\"btn btn-orange text-white mr-2 px-4\"><i class=\"fa fa-envelope\"></i> Email</a>\r\n                <!--<a href=\"javascript:void(0);\" class=\"btn btn-thin-blue mr-2 px-4\" (click)=\"showrequestdesignpopup()\"><i class=\"fa fa-commenting\"></i> Request Design</a>-->\r\n                <!--<a href=\"javascript:void(0);\" class=\"btn btn-green px-4\"><i class=\"fa fa-comments\"></i> Chat</a>-->\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-lg-5\">\r\n        <div class=\"mapbx\">\r\n          <app-goolemap [location]=\"location\" #gmap [style]=\"{'width':'100%','height':'250px', 'margin-bottom': '1em'}\"></app-goolemap>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<div class=\"card mb-3\">\r\n  <div class=\"card-body\">\r\n    <div id=\"accordion\" class=\"panel-group\">\r\n      <!--productList Pannel-->\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBody1\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Product</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBody1\" class=\"panel-collapse collapse \" style=\"\">\r\n          <a href=\"javascript:void(0);\" class=\"btn-in-panel\" *ngIf=\"is_converted != true\" (click)=\"GetProductList()\" data-dismiss=\"modal\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Associate Product</a>\r\n\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap\"\r\n                                 [rows]=\"AssociatedproductpagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                    [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"AssociatedproductpagedData.pager.totalItems\"\r\n                                 [offset]=\"AssociatedproductpagedData.pager.currentPage\"\r\n                                 [limit]=\"AssociatedproductpagedData.pager.pageSize\"\r\n                                 (page)='setPageAssociateProduct($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                    <ngx-datatable-column name=\"Product Name\" [sortable]=\"false\" prop=\"ProductName\" [minWidth]=\"150\">\r\n\r\n\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column *ngIf=\"isloanapp != true\" name=\"Product Family\" sortable=\"false\" prop=\"ProductFamily\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                    <ngx-datatable-column *ngIf=\"isloanapp != true\" name=\"Product Description\" sortable=\"false\" prop=\"ProductDescription\"></ngx-datatable-column>\r\n                    <ngx-datatable-column *ngIf=\"isopportuinity != true\" name=\"Bank Name\" sortable=\"false\" prop=\"BankName\"></ngx-datatable-column>\r\n                    <ngx-datatable-column *ngIf=\"is_converted != true\" [maxWidth]=\"200\" headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\r\n\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"text-center\">\r\n                          <!--<a (click)=\"edit(row.Id)\" class=\"btn-edit\"><i title=\"Click to edit.\" class=\"fa fa-pencil text-success pr-2\"></i></a>-->\r\n                          <a (click)=\"deleteAssociateproduct(row.mid)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                        </div>\r\n\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          Total Records: {{rowCount}}\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSizeAssociateProduct\" appendTo=\"body\" [(ngModel)]='pageSizeValueAssociateProduct' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeAssociateProduct($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fas fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fas fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fas fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fas fa-angle-right'\"\r\n                                         [page]=\"AssociatedproductpagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValueAssociateProduct\"\r\n                                         [count]=\"AssociatedproductpagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPageAssociateProduct($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!--Email Pannel-->\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBody6\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Email</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBody6\" class=\"panel-collapse collapse \" style=\"\">\r\n          <a href=\"javascript:void(0);\" class=\"btn-in-panel\" data-dismiss=\"modal\" *ngIf=\"is_converted != true\" (click)=\"showemailpopup()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Send Email</a>\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap\"\r\n                                 [rows]=\"emailpagedData.data\"\r\n                                    [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"emailpagedData.pager.totalItems\"\r\n                                 [offset]=\"emailpagedData.pager.currentPage\"\r\n                                 [limit]=\"emailpagedData.pager.pageSize\"\r\n                                 (page)='setPageNotes($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                    <ngx-datatable-column name=\"Sent To\" [sortable]=\"false\" prop=\"sent_to\" [minWidth]=\"150\">\r\n\r\n\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Subject\" sortable=\"false\" prop=\"subject\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Sent Date\" sortable=\"false\" prop=\"createdon\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Description\" sortable=\"false\" prop=\"description\" [minWidth]=\"150\" headerClass=\"text-center\">\r\n\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n\r\n\r\n                        <div title=\"View\" *ngIf='row.description!=null || row.description!==\"\"' class=\"text-center\">\r\n                          <a href=\"javascript:void(0);\" (click)=\"displayemaildetail(row)\"><i class=\"fa fa-eye pr-2\"></i></a>\r\n                        </div>\r\n                        <div *ngIf='row.description==null || row.description==\"\"' class=\"text-center\">\r\n                          <span>N/A</span>\r\n                        </div>\r\n                      </ng-template>\r\n\r\n                    </ngx-datatable-column>\r\n\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          Total Records: {{rowCount}}\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSizeemail\" appendTo=\"body\" [(ngModel)]='pageSizeValueemail' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeEmail($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fas fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fas fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fas fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fas fa-angle-right'\"\r\n                                         [page]=\"emailpagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValueemail\"\r\n                                         [count]=\"emailpagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPageNotes($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!--Notes Pannel-->\r\n\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBody2\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Notes</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBody2\" class=\"panel-collapse collapse \" style=\"\">\r\n          <a href=\"javascript:void(0);\" class=\"btn-in-panel\" data-dismiss=\"modal\" *ngIf=\"is_converted != true\" (click)=\"showNotesPopup()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add Note</a>\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap\"\r\n                                 [rows]=\"NotespagedData.data\"\r\n                                    [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"NotespagedData.pager.totalItems\"\r\n                                 [offset]=\"NotespagedData.pager.currentPage\"\r\n                                 [limit]=\"NotespagedData.pager.pageSize\"\r\n                                 (page)='setPageNote($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                    <!--<ngx-datatable-column name=\"Name\" [sortable]=\"false\" prop=\"note_name\" [minWidth]=\"150\">\r\n\r\n\r\n                    </ngx-datatable-column>-->\r\n\r\n                    <ngx-datatable-column name=\"Desription\" sortable=\"false\" prop=\"note_description\" [minWidth]=\"150\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <!--<a class=\"word_break\" (click)=\"displayemaildetail(row)\" title=\"{{row.note_description}}\">{{row.note_description}}</a>-->\r\n\r\n                        <div title=\"{{row.note_description}}\" *ngIf='row.note_description!=null || row.note_description!==\"\"'>\r\n                          <a href=\"javascript:void(0);\" (click)=\"displaynotedetail(row)\">{{row.note_description | truncate : 50}}</a>\r\n                        </div>\r\n                        <div *ngIf='row.note_description==null || row.note_description==\"\"'>\r\n                          <span>N/A</span>\r\n                        </div>\r\n                      </ng-template>\r\n\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Created By\" sortable=\"false\" prop=\"createdby\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                    <!--<ngx-datatable-column name=\"Created on\" sortable=\"false\" prop=\"created_on\" [minWidth]=\"150\"></ngx-datatable-column>-->\r\n                    <ngx-datatable-column name=\"Created on\" prop=\"created_on\" [minWidth]=\"130\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        {{row.created_on | DateTimeToLocal}}\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column [maxWidth]=\"200\" headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"text-center\">\r\n                          <!--<a (click)=\"edit(row.Id)\" class=\"btn-edit\"><i title=\"Click to edit.\" class=\"fa fa-pencil text-success pr-2\"></i></a>-->\r\n                          <a *ngIf=\"is_converted != true\" (click)=\"DeleteNote(row.note_id)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                        </div>\r\n\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"curPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          Total Records: {{rowCount}}\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSizeNotes\" appendTo=\"body\" [(ngModel)]='pageSizeValuenotes' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeNotes($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"curPage\"\r\n                                         [size]=\"pageSizeValuenotes\"\r\n                                         [count]=\"NotespagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPageNote($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!--Contact Pannel-->\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBody3\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Contact</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBody3\" class=\"panel-collapse collapse \" style=\"\">\r\n          <a href=\"javascript:void(0);\" class=\"btn-in-panel\" data-dismiss=\"modal\" *ngIf=\"is_converted != true\" (click)=\"AddContact()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add Contact</a>\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap\"\r\n                                 [rows]=\"contactpagedData.data\"\r\n                                    [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"contactpagedData.pager.totalItems\"\r\n                                 [offset]=\"contactpagedData.pager.currentPage\"\r\n                                 [limit]=\"contactpagedData.pager.pageSize\"\r\n                                 (page)='setPageContact($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                    <ngx-datatable-column name=\"Name\" [sortable]=\"false\" prop=\"Name\" [minWidth]=\"150\">\r\n\r\n\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Email\" sortable=\"false\" prop=\"Email\" [minWidth]=\"150\"></ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Mobile\" sortable=\"false\" prop=\"MobilePhone\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                    <!--<ngx-datatable-column name=\"Primary\" sortable=\"true\" prop=\"IsPrimary\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <label class=\"switch\">\r\n                          <input type=\"checkbox\" disabled  [checked]=\"row.IsPrimary\">\r\n                          <span class=\"slider round\"><span>Yes</span></span>\r\n                        </label>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>-->\r\n\r\n                    <ngx-datatable-column *ngIf=\"is_converted != true \" [maxWidth]=\"200\" headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"text-center\">\r\n                          <a *ngIf=\"is_converted != true && row.IsPrimary != true  \" (click)=\"DeleteContact(row.id)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                        </div>\r\n\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          Total Records: {{rowCount}}\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSizeContact\" appendTo=\"body\" [(ngModel)]='pageSizeValueContact' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeContact($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"contactpagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValueContact\"\r\n                                         [count]=\"contactpagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPageContact($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!--<div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodynine\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> File Upload</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodynine\" class=\"panel-collapse collapse \" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n\r\n                <div class=\"action\">\r\n                  <a href=\"#\" class=\"btn btn-primary\">Select Files</a><a href=\"#\" class=\"btn btn-success\">Upload Files</a>\r\n                </div>\r\n                <div class=\"table-responsive mt-3\">\r\n                  <table class=\"table table-hover border mb-0\">\r\n                    <thead>\r\n                      <tr>\r\n                        <th>File Name</th>\r\n                        <th>File type</th>\r\n\r\n                      </tr>\r\n\r\n                    </thead>\r\n                    <tbody>\r\n\r\n                      <tr>\r\n                        <td colspan=\"3\" align=\"center\">\r\n                          <span class=\"nofound\">No Record Found.</span>\r\n                        </td>\r\n                      </tr>\r\n\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>-->\r\n      <!--fileupload pannel-->\r\n      <div class=\"panel\">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodynine12\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> File Upload</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodynine12\" class=\"panel-collapse collapse \" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <form [formGroup]=\"UploadimageForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <div class=\"action row\" *ngIf=\"is_converted != true\">\r\n                    <div class=\"col-lg-6\">\r\n                      <label>Choose File:</label>\r\n                      <div class=\"form-group\">\r\n                        <div class=\"input-group\">\r\n                          <div class=\"input-group-prepend\" *ngIf=\"imageLink!=''\">\r\n                            <!--<img src={{imageLink}} alt=\"img\" class=\"upload_image_thnumb\" data-toggle=\"modal\" data-target=\"#myModal\">-->\r\n\r\n                            <div id=\"myModal\" style=\" background: none !important;\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n                              <div class=\"modal-dialog\" style=\"height:450px!important;width:450px!important; \">\r\n                                <div class=\"\">\r\n                                  <button type=\"button\" class=\"close\" style=\"color: #fff!important; \" data-dismiss=\"modal\">&times;</button>\r\n                                </div>\r\n                                <div class=\"modal-content\">\r\n                                  <div class=\"text-center\">\r\n                                    <img src={{imageLink}} alt=\"img\" style=\"height:450px!important;width:450px!important; \" class=\"img-responsive\">\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"custom-file w-50 m-fileup\">\r\n                            <input formControlName=\"profilePic\" class=\"custom-file-input\" #file type=\"file\" name='file' #fileInput accept=\"image/x-png,image/gif,image/jpeg,application/pdf,application/zip\" (change)=\"setFile($event)\" lang=\"es\">\r\n                            <label class=\"custom-file-label\">{{fileName}}</label>\r\n                          </div>\r\n                          <small><i class=\"text-secondary\">Valid image format is image/x-png, image/gif, image/jpeg and limit upto 5MB.</i> </small>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-sm-6 col-md-6\">\r\n                      <label>File Type:</label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select #fileuploadddl [items]=\"lstfiletype\" placeholder=\"Select File type\" formControlName=\"filetype\"\r\n                                   bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                        <!--[ngClass]=\"{'is-invalid': (filetype.invalid && (filetype.dirty || filetype.touched) && filetype.errors?.required) }\"-->\r\n                        <!--<small *ngIf=\"filetype.invalid && (filetype.dirty || filetype.touched) && filetype.errors?.required\"\r\n         style=\"color:red;\">Please select File Type</small>-->\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12  col-md-6 col-lg-6\">\r\n                      <a href=\"javascript:void(0);\" (click)=\"SaveImage()\" class=\"btn btn-success\">Upload Files</a>\r\n                    </div>\r\n                  </div>\r\n                </form>\r\n                <div class=\"table-responsive mt-3\">\r\n                  <table class=\"table table-hover border mb-0\">\r\n                    <thead>\r\n                      <tr>\r\n                        <th>File Name</th>\r\n                        <th>File Type</th>\r\n                        <th class=\"text-center\">Action</th>\r\n                      </tr>\r\n\r\n                    </thead>\r\n                    <tbody>\r\n                      <tr *ngFor=\"let c of fileuplist\">\r\n                        <td class=\"text-left\">\r\n                          <a class=\"text-dark\" download=\"file\" href=\"{{c.fileUrl}}\">\r\n                            <img src=\"{{c.fileUrl}}\" style=\"height:50px;width:50px\" />\r\n\r\n                          </a>\r\n                        </td>\r\n                        <td class=\"text-left\">{{c.masterValue}}</td>\r\n\r\n                        <td align=\"center\">\r\n                          <a (click)=\"Deleteimage(c.id)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n\r\n                        </td>\r\n                      </tr>\r\n                      <tr *ngIf=\"fileuplist == ''\">\r\n                        <td colspan=\"3\" align=\"center\">\r\n                          <span class=\"nofound\">No Record Found.</span>\r\n                        </td>\r\n                      </tr>\r\n\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n        </div>\r\n      </div>\r\n\r\n\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--appointment-->\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:transparent\">\r\n  <div class=\"card-body p-0\">\r\n    <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link active show\" data-toggle=\"tab\" href=\"#upcoming\" role=\"tab\" aria-controls=\"upcoming\" aria-selected=\"true\">Upcoming Appontments</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" data-toggle=\"tab\" href=\"#past\" role=\"tab\" aria-controls=\"past\" aria-selected=\"false\">Past Appointments</a>\r\n      </li>\r\n    </ul>\r\n    <div class=\"tab-content bg-white p-0\" id=\"myTabContent\">\r\n      <div class=\"tab-pane fade active show\" id=\"upcoming\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"table-responsive\">\r\n              <table class=\"table table-cont mb-0\">\r\n                <thead>\r\n                  <tr>\r\n                    <th>Appointments</th>\r\n                    <th>Customer</th>\r\n                    <th>Description</th>\r\n                    <th>Appointment Date</th>\r\n                    <th>Appointment Time</th>\r\n                    <th>Created on</th>\r\n\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let c of appointlistbefore\">\r\n                    <td>{{c.AppointmentName}}</td>\r\n                    <td>{{c.AppointmentWithWhom}}</td>\r\n                    <td>{{c.Description}}</td>\r\n                    <td><span class=\"date\">{{c.FromTimeString | DateTimeToLocal:'Date'}}</span></td>\r\n                    <td>{{c.currenttime}}</td>\r\n                    <td>{{c.createdon}}</td>\r\n\r\n                  </tr>\r\n                  <tr *ngIf=\"appointlistbefore == ''\">\r\n                    <td colspan=\"5\" align=\"center\">\r\n                      <span class=\"nofound\">No Appointment Found.</span>\r\n                    </td>\r\n                  </tr>\r\n\r\n                </tbody>\r\n                <!--<tfoot class=\"border-top\">\r\n                  <tr>\r\n                    <td></td>\r\n                    <td class=\"text-right\"><a class=\"btn btn-success\" data-dismiss=\"modal\" href=\"#addnewwid\" data-toggle=\"modal\"><span><i class=\"fa fa-plus mr-1\"></i> Add New</span></a></td>\r\n                  </tr>\r\n                </tfoot>-->\r\n\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"tab-pane fade\" id=\"past\" role=\"tabpanel\" aria-labelledby=\"profile-tab\">\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"table-responsive\">\r\n              <table class=\"table table-cont mb-0\">\r\n                <thead>\r\n                  <tr>\r\n                    <th>Appointments</th>\r\n                    <th>Customer</th>\r\n                    <th>Description</th>\r\n                    <th>Appointment Date</th>\r\n                    <th>Appointment Time</th>\r\n                    <th>Created on</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let c of appointlistafter\">\r\n                    <td>{{c.AppointmentName}}</td>\r\n                    <td>{{c.AppointmentWithWhom}}</td>\r\n                    <td>{{c.Description}}</td>\r\n                    <td><span class=\"date\">{{c.FromTimeString | DateTimeToLocal:'Date'}}</span></td>\r\n                    <td>{{c.currenttime}}</td>\r\n                    <td>{{c.createdon}}</td>\r\n                  </tr>\r\n                  <tr *ngIf=\"appointlistafter == ''\">\r\n                    <td colspan=\"5\" align=\"center\">\r\n                      <span class=\"nofound\">No Appointments Found.</span>\r\n                    </td>\r\n                  </tr>\r\n\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--product Popup-->\r\n<div class=\"modal fade in show\" bsModal #product=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Associate Product</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; height:350px;\">\r\n\r\n        <div class=\"row\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"table-responsive\">\r\n            <div class=\"table table-striped\">\r\n              <ngx-datatable #table class=\"bootstrap\"\r\n                             [rows]=\"pagedData.data\"\r\n                                [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                             [columnMode]=\"'force'\"\r\n                             [headerHeight]=\"40\"\r\n                             [footerHeight]=\"40\"\r\n                             \r\n                             [externalPaging]=\"true\"\r\n                             [externalSorting]=\"true\"\r\n                             [loadingIndicator]=\"loadSave\"\r\n                             [messages]=\"{emptyMessage:'No Record Found.'}\"\r\n                             [count]=\"pagedData.pager.totalItems\"\r\n                             [offset]=\"pagedData.pager.currentPage\"\r\n                             [limit]=\"pagedData.pager.pageSize\"\r\n                             (page)='setPage($event)'\r\n                             (sort)=\"onSort($event)\"\r\n                             [selected]=\"selected\"\r\n                             [selectionType]=\"SelectionType.checkbox\"\r\n                             [selectAllRowsOnPage]=\"false\"\r\n                             [displayCheck]=\"displayCheck\"\r\n                             (activate)=\"onActivate($event)\"\r\n                             (select)=\"onSelect($event)\">\r\n\r\n                <ngx-datatable-column [width]=\"42\"\r\n                                      [sortable]=\"false\"\r\n                                      [canAutoResize]=\"false\"\r\n                                      [draggable]=\"false\"\r\n                                      [resizeable]=\"false\"\r\n                                      [headerCheckboxable]=\"true\"\r\n                                      [checkboxable]=\"true\">\r\n                </ngx-datatable-column>\r\n\r\n\r\n\r\n                <ngx-datatable-column name=\"Product Name\" [sortable]=\"true\" prop=\"ProductName\" [minWidth]=\"150\">\r\n\r\n\r\n                </ngx-datatable-column>\r\n\r\n                <ngx-datatable-column *ngIf=\"isloanapp != true\" name=\"Product Family\" sortable=\"true\" prop=\"ProductFamily\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                <ngx-datatable-column *ngIf=\"isloanapp != true\" name=\"Product Description\" sortable=\"true\" prop=\"ProductDescription\"></ngx-datatable-column>\r\n                <ngx-datatable-column *ngIf=\"isopportuinity != true\" name=\"Bank Name\" sortable=\"true\" prop=\"BankName\"></ngx-datatable-column>\r\n\r\n                <ngx-datatable-footer>\r\n                  <ng-template ngx-datatable-footer-template\r\n                               let-rowCount=\"rowCount\"\r\n                               let-pageSize=\"pageSize\"\r\n                               let-selectedCount=\"selectedCount\"\r\n                               let-currentPage=\"currentPage\"\r\n                               let-offset=\"offset\"\r\n                               let-isVisible=\"isVisible\">\r\n                    <div class=\"page-count\" style=\"max-width:170px;\">\r\n                      Total Records: {{rowCount}}\r\n                    </div>\r\n                    <div>\r\n                      <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                        <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                          <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                     bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                    <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                     [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                     [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                     [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                     [page]=\"pagedData.pager.currentPage+1\"\r\n                                     [size]=\"pageSizeValue\"\r\n                                     [count]=\"pagedData.pager.totalItems\"\r\n                                     [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                     (change)=\"setPage($event)\">\r\n                    </datatable-pager>\r\n                  </ng-template>\r\n                </ngx-datatable-footer>\r\n              </ngx-datatable>\r\n            </div>\r\n          </div>\r\n\r\n\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"saveProduct()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n\r\n<!--notes popup-->\r\n\r\n<div class=\"modal fade in show\" bsModal #AddNotes=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Add a new Notes</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; height:290px;\">\r\n        <form [formGroup]=\"addNoteForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"row\">\r\n            <!--<div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Name</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Note\" formControlName=\"note\" [ngClass]=\"{'is-invalid': (note.invalid && (note.dirty || note.touched) && (note.errors?.required || note.errors?.maxlength)) }\">\r\n                <small *ngIf=\"note.invalid && (note.dirty || note.touched) && note.errors?.required\"\r\n                       class=\"text-danger\">Note is required</small>\r\n              </div>\r\n            </div>-->\r\n            <div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Description</label>\r\n              <div class=\"form-group\">\r\n                <textarea rows=\"5\" class=\"form-control\" style=\"min-height:170px;\" placeholder=\"Enter Note Description\" formControlName=\"noteDescription\" #machineDescription maxlength=\"1000\" [ngClass]=\"{'is-invalid': (noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && (noteDescription.errors?.required || noteDescription.errors?.maxlength)) }\"></textarea>\r\n                <small *ngIf=\"noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && noteDescription.errors?.required\"\r\n                       class=\"text-danger\">Description is required</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-2\">\r\n              <div class=\"form-group mt-1\">\r\n                <div class=\"form-check form-check-inline\">\r\n                  <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                    <input id=\"isPrivate1\" formControlName=\"isPrivate\" value=\"1\" type=\"radio\">\r\n                    <label for=\"isPrivate1\" class=\"radio-label\">Private</label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-2\">\r\n              <div class=\"form-group mt-1\">\r\n                <div class=\"form-check form-check-inline\">\r\n                  <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                    <input id=\"isPrivate2\" formControlName=\"isPrivate\" value=\"0\" type=\"radio\">\r\n                    <label for=\"isPrivate2\" class=\"radio-label\">Public</label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveNotes()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n\r\n<!--Email popup-->\r\n<div class=\"modal fade in show\" bsModal #email=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-xl modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Email</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"  margin-bottom:10px; height:100%\">\r\n        <form [formGroup]=\"EmailForm\" autocomplete=\"off\">\r\n          <div class=\"row\" [ngClass]=\"{'disabled':loadSave}\">\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Sent To</label>\r\n\r\n              <ng-select [items]=\"contactlist\" placeholder=\"Select contact\" formControlName=\"sentto\"\r\n                         bindLabel=\"text\" bindValue=\"value\"\r\n                         [ngClass]=\"{'is-invalid': (sentto.invalid && (sentto.dirty || sentto.touched) && sentto.errors?.required) }\"></ng-select>\r\n              <small *ngIf=\"sentto.invalid && (sentto.dirty || sentto.touched) && sentto.errors?.required\"\r\n                     style=\"color:red;\">Please select sent to</small>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Template</label>\r\n\r\n              <ng-select [items]=\"templatelist\" placeholder=\"Select template\" formControlName=\"templateid\"\r\n                         bindLabel=\"text\" bindValue=\"value\" (change)=\"gettemplatelist($event)\"></ng-select>\r\n\r\n            </div>\r\n            <div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Subject</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Subject\" formControlName=\"subject\" [ngClass]=\"{'is-invalid': (subject.invalid && (subject.dirty || subject.touched) && (subject.errors?.required || subject.errors?.maxlength)) }\">\r\n                <small *ngIf=\"subject.invalid && (subject.dirty || subject.touched) && subject.errors?.required\"\r\n                       class=\"text-danger\">subject is required</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Template:<span style=\"color:red\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ckeditor #myckeditor name=\"myckeditor\"\r\n                          formControlName=\"emailDescription\"\r\n                          required\r\n                          [config]=\"ckeConfig\"\r\n                          debounce=\"500\"\r\n                          (paste)=\"onPaste($event)\"\r\n                          (change)=\"onChangetemp($event)\">\r\n                </ckeditor>\r\n                <small *ngIf=\"emailDescription.invalid && (emailDescription.dirty || emailDescription.touched) && emailDescription.errors?.required\"\r\n                       style=\"color:red;\">Template  is required</small>\r\n              </div>\r\n            </div>\r\n            <!--<div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Description</label>\r\n              <div class=\"form-group\">\r\n                <textarea rows=\"3\" class=\"form-control\" placeholder=\"Enter Description\" formControlName=\"emailDescription\" #machineDescription maxlength=\"200\"></textarea>\r\n              </div>\r\n            </div>-->\r\n\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveEmail()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-save text-white\"></i> Send</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>-->\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n<!--emai;l description Popup-->\r\n<div class=\"modal my-popups-dboard fade show\" bsModal #emaildetail=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Email Description</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeemaildesc()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px; height:100%;\">\r\n\r\n        <div class=\"col-md-12\">\r\n          <div class=\"row\">\r\n\r\n            <div class=\"table-responsive mt-2 cus-notification\">\r\n              <p [innerHTML]=\"emaildesc\"></p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeemaildesc()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--note description Popup-->\r\n<div class=\"modal my-popups-dboard fade show\" bsModal #notedetail=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Note Description</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closenotedesc()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px; height:238px;\">\r\n\r\n        <div class=\"col-md-12\">\r\n          <div class=\"row\">\r\n\r\n            <div class=\"table-responsive mt-2 cus-notification\">\r\n              <p [innerHTML]=\"notedesc\"></p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closenotedesc()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>-->\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/viewleadNew.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/viewleadNew.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Lead Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/lead\">Manage Lead</a></li>\r\n      <li class=\"active\">Lead Details</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-user-circle-o text-dark float-left mr-2\" style=\"font-size:27px;\"></i>\r\n    <span class=\"float-left w-85-res\" style=\"font-size:18px;\">{{LeadFirstName}} {{LeadLastName}}</span>\r\n    <span class=\"cntnt-right-btn mr15 btn-iconres\">\r\n      <a *ngIf=\"solgenpower && is_converted != true && unqualifiedStage != true\" href=\"javascript:;\" [routerLink]=\"['/lead/editlead',Id]\" class=\"btn btn-success text-white mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:;\" (click)=\"makeAppointment()\" class=\"btn btn-info form-btns mr-2\"><i class=\"fa fa-calendar\"></i> Make an Appointment</a>\r\n      <a *ngIf=\"solgenpower && is_converted != true && unqualifiedStage != true\" href=\"javascript:;\" class=\"btn btn-primary form-btns mr-2\" (click)=\"showpopup()\"><i class=\"fa fa-exchange text-white\"></i> Convert</a>\r\n      <a href=\"javascript:;\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n\r\n  <div class=\"col-12 float-left d-md-flex p-0 py-resp py-2 py-sm-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n      <div *ngIf=\"item.ColumnName!='FirstName' && item.ColumnName!='LastName'\" class=\"col py-2\">\r\n        <span *ngIf=\"item.field_route==null\" class=\"d-block\">\r\n          <strong>{{ item.display_name}}:</strong>\r\n          <ng-container *ngIf=\"item.dt_code!='date' &&  item.dt_code!='datetime'\">{{ item.value }} </ng-container>\r\n          <ng-container *ngIf=\"item.dt_code=='date'\"> {{ item.value | DateTimeToLocal:'Date'}}</ng-container>\r\n          <ng-container *ngIf=\"item.dt_code=='datetime'\"> {{ item.value | DateTimeToLocal}}</ng-container>\r\n        </span>\r\n        <span *ngIf=\"item.field_route!=null\" class=\"d-block\"><strong>{{ item.display_name}}:</strong> <a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\"> {{ item.value}}</a></span>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<app-stagemanagement [submoduleName]=\"submoduleName\" [moduleName]=\"moduleName\" (newItemEvent)=\"addItem($event)\" (showConvert)=\"showConvert($event)\"></app-stagemanagement>\r\n\r\n\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:none\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col-sm-12 col-lg-8\">\r\n            <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                <ng-container *ngFor=\"let item of formControlList\">\r\n                  <div class=\"panel active\">\r\n                    <div class=\"panel-heading\">\r\n                      <h4 class=\"panel-title\">\r\n                        <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                          <span> {{item.group_name}}</span>\r\n                        </a>\r\n                      </h4>\r\n                    </div>\r\n                    <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                      <div class=\"panel-body row px-0 mt-0\">\r\n                        <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                          <div class=\"input-group border-bottom\">\r\n                            <div class=\"col-sm-12 col-md-6 px-0\">\r\n                              <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                            </div>\r\n                            <div class=\"col-sm-12 col-md-6 d-flex align-items-center\">\r\n                              <span *ngIf='inner.dt_code==\"datetime\" ' class=\"py-2 d-block\">\r\n                                {{ inner.value | DateTimeToLocal}}\r\n                              </span>\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null &&  inner.dt_code!='datetime' && inner.dt_code!='select' && inner.dt_code != 'map'\"\r\n                                    class=\"py-2 d-block\" style=\"word-break: break-all;\">{{ inner.value}}</span>\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null  && inner.dt_code!='datetime' && inner.dt_code!='select' && inner.dt_code != 'map'\"\r\n                                    class=\"py-2 d-block\" style=\"word-break: break-all;\">\r\n                                <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                              </span>\r\n\r\n                              <span class=\"top\" *ngIf=\"inner.dt_code == 'map'\">\r\n                                <span [innerHTML]=\"inner.value\"></span>\r\n                              </span>\r\n\r\n                              <span *ngIf=\"inner.dt_code == 'select'\">\r\n                                <span *ngIf=\"inner.FieldFrom !=null\">\r\n                                  {{inner.value }}\r\n                                </span>\r\n                                <span *ngIf=\"inner.FieldFrom==null\">\r\n                                  <span *ngFor=\"let itemColorCode of getListingColorCode(inner.value);\">\r\n                                    <span *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                                      {{itemColorCode.color}}\r\n                                    </span>\r\n                                    <span *ngIf=\"itemColorCode.colorkey!=undefined\" style=\"max-width:150px !important;\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                                      {{itemColorCode.color}}\r\n                                    </span>\r\n                                  </span>\r\n                                </span>\r\n                              </span>\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch  mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ng-container>\r\n              </form>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-12 col-lg-4 relatedtab\">\r\n            <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <!--======================================================Lead SMS=============================================================-->\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#LeadSMS\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Lead SMS ({{LeadSMSCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"LeadSMS\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstLeadSMS.data\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstLeadSMS.pager.totalItems\"\r\n                                     [offset]=\"currentPageLeadSMS\"\r\n                                     [limit]=\"pageSizeValueLeadSMSList\"\r\n                                     (page)='setPageLeadSMSList($event)'\r\n                                     (sort)=\"onSortLeadSMSList($event)\">\r\n                        <ngx-datatable-column name=\"Lead SMS Number\" prop=\"NAME\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Type\" prop=\"Type\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Body\" prop=\"Body\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div title=\"{{row.Body}}\" *ngIf='row.Body!=null || row.Body!==\"\"'>\r\n                              {{row.Body | truncate : 50}}\r\n                            </div>\r\n                            <div *ngIf='row.Body==null || row.Body==\"\"'>\r\n                              <span>N/A</span>\r\n                            </div>\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Created By\" [sortable]=\"false\" prop=\"CreatedBy\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Created on\" [sortable]=\"true\" prop=\"CreatedDate\" [minWidth]=\"130\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.CreatedDate | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"curPageLeadSMSList\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                              Showing {{(curPageLeadSMSList - 1 )* pageSizeValueLeadSMSList + 1}}  to {{curPageLeadSMSList * pageSizeValueLeadSMSList}} out of {{rowCount}}  enteries\r\n                            </div>\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"curPageLeadSMSList\"\r\n                                             [size]=\"pageSizeValueLeadSMSList\"\r\n                                             [count]=\"totalRecordsLeadSMS\"\r\n                                             [hidden]=\"!((rowCount / lstLeadSMS.pager.pageSize) > 1)\"\r\n                                             (change)=\"setLeadSMSPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!--==============================================================================================================================-->\r\n              <!--====================================================== Notes =============================================================-->\r\n              <!--<div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Notes ({{NotesCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"notes\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                     (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add</a>\r\n\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"NotespagedData.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"NotespagedData.pager.totalItems\"\r\n                                     [offset]=\"currentPageAssignedRes\"\r\n                                     [limit]=\"pageSizeValueAssignedResList\"\r\n                                     (page)='setPageNotes($event)'\r\n                                     (sort)=\"onSortNotes($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Note Title\" prop=\"note_name\" [sortable]=\"true\">\r\n\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.note_name|truncate}}\r\n                          </ng-template>\r\n\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Description\" sortable=\"false\" prop=\"note_description\" [sortable]=\"true\" [minWidth]=\"150\">\r\n\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div *ngIf='row.note_description!=null || row.note_description!=\"\"'>\r\n                              <span>{{row.note_description|truncate}}</span>\r\n                            </div>\r\n                            <div *ngIf='row.note_description==null || row.note_description==\"\"'>\r\n                              <span>N/A</span>\r\n                            </div>\r\n                          </ng-template>\r\n\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Created By\" sortable=\"false\" prop=\"createdby\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Created At\" prop=\"created_on\" sortable=\"true\" [minWidth]=\"130\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.created_on | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div class=\"text-center\">\r\n                              <a href=\"javascript:;\" (click)=\"ViewNotes(row)\" title=\"View Note\"><i class=\"fa fa-eye pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"EditNotes(row)\" title=\"Edit Note\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"DeleteNote(row,'AssignedResource')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                            </div>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"NotespagedData.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"NotespagedData.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n\r\n\r\n\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                              Showing {{(NotespagedData.pager.currentPage - 1 )* NotespagedData.pager.pageSize + 1}}  to\r\n                              {{\r\n                  (rowCount> (NotespagedData.pager.currentPage*NotespagedData.pager.pageSize))?(NotespagedData.pager.currentPage*NotespagedData.pager.pageSize):(rowCount)\r\n                              }} out of {{rowCount}}  enteries\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"NotespagedData.pager.currentPage\"\r\n                                             [size]=\"NotespagedData.pager.pageSize\"\r\n                                             [count]=\"NotespagedData.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / NotespagedData.pager.pageSize) > 1)\"\r\n                                             (change)=\"setNotesPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>-->\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Notes ({{NotesCount}}) </span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n\r\n\r\n                <div id=\"panelBodynine\" class=\"panel-collapse active show p-0 border-0\" data-parent=\"#accordion\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                     (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> New</a>\r\n\r\n\r\n\r\n                  <div id=\"notes\" class=\"panel-collapse collapse active show\">\r\n\r\n                    <app-newnoteslist #listnotesmodel subModuleName=\"lead\" [AccountId]=\"accountId\" [ObjectRefId]=\"leadId\" (newItemEvent)=\"addItems($event)\">\r\n\r\n                    </app-newnoteslist>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!--==============================================================================================================================-->\r\n              <!-----------------------Add Contact------------------------------->\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#addContact\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Contacts</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"addContact\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                     *ngIf=\"is_converted != true\" (click)=\"AddContact()\"><i class=\"fa fa-plus mr-2\"></i> New</a>\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap\"\r\n                                     [rows]=\"contactpagedData.data\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"contactpagedData.pager.totalItems\"\r\n                                     [offset]=\"contactpagedData.pager.currentPage\"\r\n                                     [limit]=\"contactpagedData.pager.pageSize\"\r\n                                     (page)='setPageContact($event)'\r\n                                     (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                        <ngx-datatable-column name=\"Name\" [sortable]=\"false\" prop=\"Name\" [minWidth]=\"150\">\r\n\r\n\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column name=\"Email\" sortable=\"false\" prop=\"Email\" [minWidth]=\"150\"></ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column name=\"Mobile\" sortable=\"false\" prop=\"MobilePhone\" [minWidth]=\"150\"></ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column *ngIf=\"is_converted != true \" [maxWidth]=\"200\" headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div class=\"text-center\">\r\n                              <a *ngIf=\"is_converted != true\" (click)=\"DeleteContact(row.id)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                            </div>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                              Showing {{(contactpagedData.pager.currentPage+1 - 1 )* pageSizeValueContact + 1}}  to {{contactpagedData.pager.currentPage+1 * pageSizeValueContact}} out of {{rowCount}}  enteries\r\n                            </div>\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"contactpagedData.pager.currentPage+1\"\r\n                                             [size]=\"pageSizeValueContact\"\r\n                                             [count]=\"contactpagedData.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                             (change)=\"setPageContact($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!----------------------------- End---------------->\r\n\r\n              <app-files title=\"Files\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{Id}}\"></app-files>\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n<!--===================================================== NotesPopupModel =========================================================================-->\r\n<div class=\"modal fade in show\" bsModal #NotesPopupModel=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\" *ngIf=\"!isViewNote\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-header\" *ngIf=\"isViewNote\">\r\n        <h4 class=\"modal-title\">View NOTE</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeNotesPopupModelPopup()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:290px;\">\r\n        <form [formGroup]=\"addNoteForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"form-group\" *ngIf=\"!isViewNote\">\r\n            <div class=\"row mb-2\">\r\n              <div class=\"col-md-12 col-lg-12\">\r\n                <label>Note Title:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter Note Title\" formControlName=\"noteTitle\" maxlength=\"50\" [ngClass]=\"{'is-invalid': (noteTitle.invalid && (noteTitle.dirty || noteTitle.touched) && (noteTitle.errors?.required || noteTitle.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"noteTitle.invalid && (noteTitle.dirty || noteTitle.touched) && noteTitle.errors?.required\"\r\n                         class=\"text-danger\">Note Title is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row mb-2\">\r\n              <div class=\"col-md-12 col-lg-12\">\r\n                <label>Description:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <textarea rows=\"5\" class=\"form-control\" maxlength=\"500\" style=\"min-height:120px;\" placeholder=\"Enter Note Description\" formControlName=\"noteDescription\" [ngClass]=\"{'is-invalid': (noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && (noteDescription.errors?.required || noteDescription.errors?.maxlength)) }\"></textarea>\r\n                  <small *ngIf=\"noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && noteDescription.errors?.required\"\r\n                         style=\"color:red;\">Description is required</small>\r\n                  <small *ngIf=\"noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && noteDescription.errors?.maxlength\"\r\n                         style=\"color:red;\">Notes must be less than 500 characters.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\" *ngIf=\"isViewNote\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-4\">\r\n                <label><b>Note Title:</b></label>\r\n                <span>&nbsp;{{notesTitle}}</span>\r\n              </div>\r\n              <div class=\"col-md-12\">\r\n                <label class=\"m-0\"><b>Description:</b></label>\r\n                <span>&nbsp;{{notesDescription}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveNote()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n\r\n<!--=================================================== Contact add ==================================================================-->\r\n<div bsModal #addContact=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-xl\" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Add Contact</h4>\r\n\r\n        <button type=\"button\" class=\"close\" (click)=\"closeContact()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:600px;\">\r\n        <app-addcontact #addcontact12 [leadId]=leadId [islead]=\"islead\" [ownerId]=\"ownerId\" [solgenpower]=\"solgenpower\" solgenpower=true (contactemit)=\"contactmsg(true)\"></app-addcontact>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--==============================================================================================================================-->\r\n\r\n<app-leadconvertpopup #leadconvert></app-leadconvertpopup>\r\n<app-makeappointment #makeappointment></app-makeappointment>\r\n");

/***/ }),

/***/ "./src/app/views/lead/addeditlead.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/lead/addeditlead.component.ts ***!
  \*****************************************************/
/*! exports provided: LeadAddEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadAddEditComponent", function() { return LeadAddEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _lead_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lead.service */ "./src/app/views/lead/lead.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _leadconvertpopup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./leadconvertpopup.component */ "./src/app/views/lead/leadconvertpopup.component.ts");
/* harmony import */ var _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/scriptservice.service */ "./src/app/views/shared/scriptservice.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
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












var LeadAddEditComponent = /** @class */ (function () {
    function LeadAddEditComponent(fb, leadService, router, toaster, route, commonService, location, dynamicScripts, dialogService) {
        var _this = this;
        this.fb = fb;
        this.leadService = leadService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.location = location;
        this.dynamicScripts = dynamicScripts;
        this.dialogService = dialogService;
        this.config = [];
        this.moduleName = 'crm';
        this.submoduleName = 'lead';
        this.loadSave = false;
        this.leadId = '';
        this.isLead = false;
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _lead_service__WEBPACK_IMPORTED_MODULE_5__["LeadJsonData"]();
        this.addOrUpdatePermission = false;
        //modulePermission: ModuleList;
        this.modulePermission = [];
        this.displayType = 'ADD';
        this.isUpdate = false;
        this.isAdd = false;
        this.loading = false;
        this.len = 10;
        this.permission = 'NO';
        this.solgenpower = false;
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
            _this.companyType = userdetail.companyType;
            _this.userName = userdetail.firstName + ' ' + userdetail.lastName;
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
        this.dynamicScripts.load('map');
    }
    LeadAddEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.timeFormat = this.commonService.getTimeFormat();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.loadSave = true;
            if (id) {
                _this.leadId = id;
                _this.isLead = true;
                _this.pageTitle = 'Edit Lead';
                _this.displayType = 'EDIT';
                if (_this.companyType == "companytypeSolarInstall") {
                    _this.solgenpower = true;
                }
                //  this.fillLeadForm(this.leadId);
            }
            else {
                _this.displayType = 'ADD';
                _this.pageTitle = 'Add Lead';
                _this.solgenpower = false;
            }
        });
        this.leadService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.leadId, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.leadService.customFieldsList.data;
                console.log("this.customCompnentValues", _this.customCompnentValues);
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _lead_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
                var convertdatetime_1 = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_11__["DateTimeToLocalForAddEditPipe"]();
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
                    if (cnt.dt_code == 'select' && cnt.select_options != null && (cnt.name == 'StatusName')) {
                        cnt.select_options = _this.removeConverted(cnt.select_options, 'Converted');
                    }
                    if (_this.displayType == 'ADD' && cnt.name == 'OwnerName' && cnt.dt_code == 'select' && cnt.select_options != null) {
                        cnt.select_options.forEach(function (itemList) {
                            if (itemList.name == _this.userName) {
                                val = itemList.value;
                                //cnt.is_readOnly = true;
                            }
                        });
                    }
                    if (_this.displayType == 'ADD' && cnt.name == 'StatusName' && cnt.dt_code == 'select' && cnt.select_options != null) {
                        cnt.select_options.forEach(function (itemList) {
                            if (itemList.name == 'New') {
                                val = itemList.value;
                            }
                        });
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
        setTimeout(function () {
            _this.options = {
                center: { lat: 47.751076, lng: -120.740135 },
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.overlays = [];
            _this.autotext();
        }, 1000);
    };
    LeadAddEditComponent.prototype.removeConverted = function (seloptions, name) {
        return seloptions.filter(function (item) { return item.name != name; });
    };
    LeadAddEditComponent.prototype.mapPopUP = function () {
        this.mapLocation.show();
    };
    LeadAddEditComponent.prototype.closemapsearch = function () {
        this.mapLocation.hide();
    };
    LeadAddEditComponent.prototype.findLocation = function (address) {
        var _this = this;
        this.overlays = [];
        if (address != null || address != undefined) {
            this.address = address;
        }
        this.loadSave = true;
        this.lat = '';
        this.lng = '';
        if (!this.geocoder)
            this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({
            'address': this.address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0].geometry.location) {
                    _this.lat = results[0].geometry.location.lat();
                    _this.lng = results[0].geometry.location.lng();
                    _this.overlays.push(new google.maps.Marker({ position: { lat: _this.lat, lng: _this.lng }, title: _this.address, animation: google.maps.Animation.DROP }));
                    _this.address = '';
                }
                if (results[0].address_components) {
                    _this.customCompnentValues.forEach(function (t) {
                        try {
                            if (t.name == 'Street') {
                                _this.form.get(t.form_controlName).setValue(results[0].address_components[0].long_name + ' ' + results[0].address_components[1].long_name);
                            }
                            else if (t.name == 'City') {
                                _this.form.get(t.form_controlName).setValue(results[0].address_components[0].long_name + ' ' + results[0].address_components[3].long_name);
                            }
                            else if (t.name == 'PostalCode') {
                                _this.form.get(t.form_controlName).setValue(results[0].address_components[0].long_name + ' ' + results[0].address_components[7].long_name);
                            }
                        }
                        catch (_a) { }
                        if (t.dt_code == 'select' && t.select_options != null && t.name == 'State') {
                            try {
                                t.select_options.forEach(function (itemList) {
                                    var statename = results[0].address_components[5].long_name;
                                    if (itemList.name == statename) {
                                        _this.form.get(t.form_controlName).setValue(itemList.value);
                                    }
                                });
                            }
                            catch (_b) { }
                        }
                        if (t.dt_code == 'select' && t.select_options != null && t.name == 'Country') {
                            try {
                                t.select_options.forEach(function (itemList) {
                                    var cntryname = results[0].address_components[6].long_name;
                                    if (itemList.name == cntryname) {
                                        _this.form.get(t.form_controlName).setValue(itemList.value);
                                    }
                                });
                            }
                            catch (_c) { }
                        }
                        _this.closemapsearch();
                    });
                }
            }
            else {
                alert("Sorry, this search produced no results.");
            }
            _this.loadSave = false;
        });
        this.loadSave = false;
    };
    LeadAddEditComponent.prototype.mapClick = function (mapValue) {
        var link = mapValue.value;
        //console.log('link: ', link);
        //console.log(mapValue.value.split('href').split('target'));
        //console.log('link: ', (<HTMLLinkElement>mapValue.value).href);
        // window.open(link, "_blank");
    };
    LeadAddEditComponent.prototype.checkvalue = function (formvalues, selval) {
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
    LeadAddEditComponent.prototype.test = function (e) {
        // console.log('sssss', e);
        e.stopPropagation();
        e.preventDefault();
    };
    LeadAddEditComponent.prototype.OnCheck = function () {
        // console.log(this.form);
    };
    LeadAddEditComponent.prototype.onSubmit = function () {
        var _this = this;
        // console.log('new lead');
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
        //console.log(this.form);
        //console.log(this.form.value);
        var email = Object.keys(this.form.value).find(function (key) { return key.includes('Email'); }).valueOf();
        if (this.form.valid) {
            this.loadSave = true;
            this.leadService.CheckEmailNotExistInOthersTypeAccount(this.form.value[email]).subscribe(function (m) {
                if (m == false) {
                    _this.JsonData.leadId = _this.leadId;
                    _this.JsonData.moduleCode = _this.moduleName;
                    _this.JsonData.subModuleCode = _this.submoduleName;
                    _this.JsonData.companyId = _this.companyId;
                    _this.JsonData.userId = _this.userId;
                    var _formData = _this.form.value;
                    for (var index in _formData) {
                        var data = _formData[index];
                        if (data) {
                            if (Date.prototype.isPrototypeOf(data)) {
                                _formData[index] = _this.commonService.getUserSelectedZoneToUTC(data);
                            }
                        }
                    }
                    _this.JsonData.FormJsonData = JSON.stringify(_this.form.value);
                    _this.JsonData.permission = _this.permission;
                    _this.leadService.addEditForm(_this.JsonData).subscribe(function (result) {
                        if (result.statusCode == 200) {
                            //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                            //// console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
                            //this.toaster.success(result.responseMessage);
                            setTimeout(function () {
                                _this.toaster.success(result.responseMessage);
                                _this.loadSave = false;
                                //this.router.navigateByUrl("/lead");
                                _this.location.back();
                            }, 1000);
                        }
                        else if (result.statusCode == 220) {
                            _this.loadSave = false;
                            var message = result.responseMessage + " Are you sure you want to add new lead on same address?";
                            _this.dialogService.confirm_yes_no('Warning', message, 'Ok', 'Cancel', true, true).subscribe(function (confirmed) {
                                if (confirmed) {
                                    _this.permission = "YES";
                                    _this.onSubmit();
                                }
                            });
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
                    _this.toaster.error('Email already associated with other User Type. Please use different Email.');
                    _this.loadSave = false;
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.form);
            this.loadSave = false;
        }
    };
    LeadAddEditComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
    };
    LeadAddEditComponent.prototype.close = function () {
        //this.router.navigateByUrl("/lead");
        this.location.back();
    };
    LeadAddEditComponent.prototype.fillLeadForm = function (id) {
        var _this = this;
        this.leadService.GetLeadsDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe(function (result) {
            // // console.log("result1212", this.leadService.leadEditPage.data[0]);
            var edit;
            edit = _this.leadService.leadEditPage.data[0];
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
                    //this.checkboxdata1.forEach((item) => {// console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });
                }
                catch (err) { }
                // console.log("formGroup", this.form.value);
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    LeadAddEditComponent.prototype.MakeArray = function (value, type) {
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
    LeadAddEditComponent.prototype.MakeNormalArray = function (value) {
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
    LeadAddEditComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
            //objItem.select_options = array;
        }
        return array;
    };
    LeadAddEditComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        // console.log('new', controldisp);
        //const index2: number = this.formControlList.indexOf(groupdisp);
        //const index1: number = controldisp.display_order;
        var checkboxdatanew = new _lead_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
        // console.log('this.checkboxdata1this.checkboxdata1', this.checkboxdata1);
        var dd = this.formControlList;
    };
    LeadAddEditComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    LeadAddEditComponent.prototype.fetchMore = function (dataList, j) {
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
            dataList[j].select_options = dataList[j].select_options.concat(_this.scrollDataList);
        });
    };
    LeadAddEditComponent.prototype.onKey = function (e, dataList, j) {
        var _this = this;
        this.len = 0;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        this.searchText = e.target.value;
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            dataList[j].select_options = _this.scrollDataList;
        });
    };
    LeadAddEditComponent.prototype.onClearLang = function (dataList, j) {
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
    LeadAddEditComponent.prototype.getreturnNumber = function (x, y) {
        return x + y;
    };
    LeadAddEditComponent.prototype.showpopup = function () {
        this.leadconvert.show(this.leadId);
    };
    LeadAddEditComponent.prototype.autotext = function () {
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
            if (place.address_components) {
                _this.customCompnentValues.forEach(function (t) {
                    try {
                        if ((t.dt_code == 'select' && t.select_options != null && t.name == 'Country') || (t.dt_code == 'select' && t.select_options != null && t.name == 'State')) {
                            _this.form.get(t.form_controlName).setValue(null);
                        }
                        if (t.name == 'PostalCode' || t.name == 'City' || t.name == 'Street') {
                            _this.form.get(t.form_controlName).setValue('');
                        }
                        var route_1 = '';
                        var street_1 = '';
                        place.address_components.forEach(function (p) {
                            p.types.forEach(function (s) {
                                if (s == 'country') {
                                    if (t.dt_code == 'select' && t.select_options != null && t.name == 'Country') {
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
                                    if (t.dt_code == 'select' && t.select_options != null && t.name == 'State') {
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
                                    if (t.name == 'PostalCode') {
                                        _this.form.get(t.form_controlName).setValue(p.long_name);
                                    }
                                }
                                if (s == 'locality') {
                                    if (t.name == 'City') {
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
                        if (t.name == 'Street') {
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
        });
    };
    LeadAddEditComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _lead_service__WEBPACK_IMPORTED_MODULE_5__["LeadService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] },
        { type: _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_9__["ScriptService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_10__["ConfirmationDialogService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapLocation', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], LeadAddEditComponent.prototype, "mapLocation", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('leadconvert', { static: false }),
        __metadata("design:type", _leadconvertpopup_component__WEBPACK_IMPORTED_MODULE_8__["LeadconvertpopupComponent"])
    ], LeadAddEditComponent.prototype, "leadconvert", void 0);
    LeadAddEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditlead',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditlead.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/addeditlead.component.html")).default,
            providers: [_lead_service__WEBPACK_IMPORTED_MODULE_5__["LeadService"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _lead_service__WEBPACK_IMPORTED_MODULE_5__["LeadService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"], _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_9__["ScriptService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_10__["ConfirmationDialogService"]])
    ], LeadAddEditComponent);
    return LeadAddEditComponent;
}());



/***/ }),

/***/ "./src/app/views/lead/lead-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/lead/lead-routing.module.ts ***!
  \***************************************************/
/*! exports provided: LeadRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadRoutingModule", function() { return LeadRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _addeditlead_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addeditlead.component */ "./src/app/views/lead/addeditlead.component.ts");
/* harmony import */ var _leadlist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./leadlist.component */ "./src/app/views/lead/leadlist.component.ts");
/* harmony import */ var _viewlead_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./viewlead.component */ "./src/app/views/lead/viewlead.component.ts");
/* harmony import */ var _viewleadNew_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./viewleadNew.component */ "./src/app/views/lead/viewleadNew.component.ts");
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
    { path: '', component: _leadlist_component__WEBPACK_IMPORTED_MODULE_3__["LeadlistComponent"] },
    { path: 'addlead', component: _addeditlead_component__WEBPACK_IMPORTED_MODULE_2__["LeadAddEditComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]], data: { privilegeCode: 'LEADADD' } },
    { path: 'editlead/:id', component: _addeditlead_component__WEBPACK_IMPORTED_MODULE_2__["LeadAddEditComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]], data: { privilegeCode: 'LEADUPDATE' } },
    { path: 'viewlead/:id', component: _viewlead_component__WEBPACK_IMPORTED_MODULE_4__["ViewleadComponent"] },
    { path: 'view/:id', component: _viewleadNew_component__WEBPACK_IMPORTED_MODULE_5__["ViewleadNewComponent"] },
];
var LeadRoutingModule = /** @class */ (function () {
    function LeadRoutingModule() {
    }
    LeadRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LeadRoutingModule);
    return LeadRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/lead/lead.module.ts":
/*!*******************************************!*\
  !*** ./src/app/views/lead/lead.module.ts ***!
  \*******************************************/
/*! exports provided: LeadModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadModule", function() { return LeadModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var primeng_gmap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/gmap */ "./node_modules/primeng/gmap.js");
/* harmony import */ var primeng_gmap__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(primeng_gmap__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _lead_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lead-routing.module */ "./src/app/views/lead/lead-routing.module.ts");
/* harmony import */ var _leadlist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./leadlist.component */ "./src/app/views/lead/leadlist.component.ts");
/* harmony import */ var _addeditlead_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addeditlead.component */ "./src/app/views/lead/addeditlead.component.ts");
/* harmony import */ var _viewleadNew_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./viewleadNew.component */ "./src/app/views/lead/viewleadNew.component.ts");
/* harmony import */ var _viewlead_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./viewlead.component */ "./src/app/views/lead/viewlead.component.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm5/ng2-ckeditor.js");
/* harmony import */ var _loanapplication_loanapplication_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../loanapplication/loanapplication.module */ "./src/app/views/loanapplication/loanapplication.module.ts");
/* harmony import */ var _leadconvertpopup_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./leadconvertpopup.component */ "./src/app/views/lead/leadconvertpopup.component.ts");
/* harmony import */ var _calendar_calendarlist_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../calendar/calendarlist.module */ "./src/app/views/calendar/calendarlist.module.ts");
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












var LeadModule = /** @class */ (function () {
    function LeadModule() {
    }
    LeadModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_leadlist_component__WEBPACK_IMPORTED_MODULE_7__["LeadlistComponent"], _addeditlead_component__WEBPACK_IMPORTED_MODULE_8__["LeadAddEditComponent"], _viewlead_component__WEBPACK_IMPORTED_MODULE_10__["ViewleadComponent"], _viewleadNew_component__WEBPACK_IMPORTED_MODULE_9__["ViewleadNewComponent"], _leadconvertpopup_component__WEBPACK_IMPORTED_MODULE_14__["LeadconvertpopupComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _lead_routing_module__WEBPACK_IMPORTED_MODULE_6__["LeadRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], _loanapplication_loanapplication_module__WEBPACK_IMPORTED_MODULE_13__["LoanApplicationModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__["ModalModule"], ng2_ckeditor__WEBPACK_IMPORTED_MODULE_12__["CKEditorModule"], primeng_gmap__WEBPACK_IMPORTED_MODULE_4__["GMapModule"], _calendar_calendarlist_module__WEBPACK_IMPORTED_MODULE_15__["CalendarListModule"]
            ]
        })
    ], LeadModule);
    return LeadModule;
}());



/***/ }),

/***/ "./src/app/views/lead/leadconvertpopup.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/lead/leadconvertpopup.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xlYWQvbGVhZGNvbnZlcnRwb3B1cC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/lead/leadconvertpopup.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/lead/leadconvertpopup.component.ts ***!
  \**********************************************************/
/*! exports provided: LeadconvertpopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadconvertpopupComponent", function() { return LeadconvertpopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _leadlist_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _lead_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lead.service */ "./src/app/views/lead/lead.service.ts");
/* harmony import */ var _configurationsetting_configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../configurationsetting/configurationsetting.service */ "./src/app/views/configurationsetting/configurationsetting.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
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











var LeadconvertpopupComponent = /** @class */ (function () {
    function LeadconvertpopupComponent(leadlistService, configurationsettingService, dialogService, leadService, fb, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.leadlistService = leadlistService;
        this.configurationsettingService = configurationsettingService;
        this.dialogService = dialogService;
        this.leadService = leadService;
        this.fb = fb;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__["SelectionType"];
        this.loadSave = false;
        this.pagedDataLeadconvert = {
            pager: {},
            data: []
        };
        this.selectedleadconvert = [];
        this.listFilter = '';
        this.sortColumn = 'LeadId';
        this.sortDir = 'desc';
        this.AssociatedproductpagedData = {
            pager: {},
            data: []
        };
        this.moduleName = 'crm';
        this.submoduleName = 'lead';
        this.isloanapp = false;
        this.isopportuinity = false;
        this.selected = [];
        this.productassociateid = "";
        this.selectedassociateprouct = [];
        this.contactid = "";
        this.pagedData = {
            pager: {},
            data: []
        };
        this.sortDirAssoProdList = 'desc';
        this.sortColumnAssoProdList = 'CreatedOn';
        this.isAccountExisting = false;
        this.isContactExisting = false;
        this.searchText = '';
        this.len = 0;
        this.contactsearchText = '';
        this.contactlen = 10;
        this.leadconvertModel = new _leadlist_service__WEBPACK_IMPORTED_MODULE_1__["leadConvertModelOpportunity"]();
        this.isleadconvert = false;
        this.addForm = this.fb.group({
            Account: ['createnewaccount'],
            contact: ['createnewcontact'],
            opportunity: [true],
            accountName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            opportunityname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            accounttypeid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            accountid: [null],
            contactidform: [null],
            // Salutationtypeid: [null, Validators.required],
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email]],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
            _this.companyType = userdetail.companyType;
        });
    }
    LeadconvertpopupComponent.prototype.ngOnInit = function () {
    };
    LeadconvertpopupComponent.prototype.show = function (id) {
        this.addForm.reset();
        this.pageSizeValueLeadconvert = 10;
        if (id != null) {
            this.leadId = id;
            this.showpopup(id);
        }
        this.getconverttype();
    };
    LeadconvertpopupComponent.prototype.onSortLeadconvert = function (e) {
    };
    LeadconvertpopupComponent.prototype.setPageLeadconvert = function (e) { };
    LeadconvertpopupComponent.prototype.showpopup = function (id) {
        var _this = this;
        this.accountMessage = null;
        this.contactMessage = null;
        this.isAccountExisting = false;
        this.isContactExisting = false;
        this.isleadconvert = false;
        if (this.companyType == "companytypeSolarInstall") {
            this.leadlistService.getLeadById(id, false).subscribe(function (resp) {
                console.log("Lead DEtails", resp);
                _this.leaddata = resp;
                console.log("Lead  this.leaddata", _this.leaddata);
                if (_this.leaddata.Email == null || _this.leaddata.Service_Territory_Text == null || _this.leaddata.MobilePhone == null || _this.leaddata.Street == null || _this.leaddata.City == null || _this.leaddata.State == null || _this.leaddata.PostalCode == null || _this.leaddata.Homeowner == null || _this.leaddata.Credit_Threshold_Met == null || _this.leaddata.Aware_of_Solar_Tax_Credits_ITC == null || _this.leaddata.Email == "" || _this.leaddata.Service_Territory_Text == "" || _this.leaddata.MobilePhone == "" || _this.leaddata.Street == "" || _this.leaddata.City == "" || _this.leaddata.State == "" || _this.leaddata.PostalCode == "" || _this.leaddata.Homeowner == "" || _this.leaddata.Credit_Threshold_Met == "" || _this.leaddata.Aware_of_Solar_Tax_Credits_ITC == "") {
                    var message = "Please fill ";
                    if (_this.leaddata.Email == null || _this.leaddata.Email == "") {
                        message += "Email,";
                    }
                    if (_this.leaddata.Service_Territory_Text == null || _this.leaddata.Service_Territory_Text == "") {
                        message += "Service Territory,";
                    }
                    if (_this.leaddata.MobilePhone == "" || _this.leaddata.MobilePhone == null) {
                        message += "MobilePhone,";
                    }
                    if (_this.leaddata.Street == "" || _this.leaddata.Street == null) {
                        message += "Street,";
                    }
                    if (_this.leaddata.City == null || _this.leaddata.City == "") {
                        message += "City,";
                    }
                    if (_this.leaddata.State == null || _this.leaddata.State == "") {
                        message += "State,";
                    }
                    if (_this.leaddata.PostalCode == null || _this.leaddata.PostalCode == "") {
                        message += "Zip Code,";
                    }
                    if (_this.leaddata.Homeowner == null || _this.leaddata.Homeowner == "") {
                        message += "Homeowner,";
                    }
                    if (_this.leaddata.Credit_Threshold_Met == null || _this.leaddata.Credit_Threshold_Met == "") {
                        message += "Credit Threshold Met,";
                    }
                    if (_this.leaddata.Aware_of_Solar_Tax_Credits_ITC == null || _this.leaddata.Aware_of_Solar_Tax_Credits_ITC == "") {
                        message += "Aware of Solar Tax Credits (ITC),";
                    }
                    message = message.replace(/,\s*$/, "");
                    if (message.split(',').length > 1) {
                        message = message.replace(/,(?=[^,]*$)/, ' and ');
                    }
                    message += " of this lead in order to convert it.";
                    //console.log("Lead DEtails", this.leaddata);
                    _this.toaster.error(message);
                }
                else {
                    _this.GetLeadConvertAccountDll();
                    _this.GetLeadConvertContactDll();
                    _this.getLeadConvertModuleWizard();
                    _this.convertleadmodel.show();
                    _this.commonService.getMasterItemsList("accountType1").subscribe(function (result) {
                        _this.lstaccounttype = _this.commonService.masters;
                        // console.log('lstaccounttype', this.lstaccounttype)
                        _this.addForm.patchValue({
                            accounttypeid: _this.lstaccounttype[0].value,
                            Account: 'createnewaccount',
                            contact: 'createnewcontact',
                            opportunity: true,
                            accountid: null,
                            contactidform: null,
                            // Salutationtypeid: [null, Validators.required],
                            firstName: _this.leaddata.FirstName,
                            lastName: _this.leaddata.LastName,
                            email: _this.leaddata.Email,
                            phone: _this.leaddata.MobilePhone,
                        });
                    });
                    _this.leadId = id;
                    _this.getLeadConvertData(_this.leadId);
                }
            });
        }
    };
    LeadconvertpopupComponent.prototype.getLeadConvertData = function (leadid) {
        var _this = this;
        this.GetLeadConvertAccountDll();
        this.leadlistService.getLeadConvertData(leadid).subscribe(function (result) {
            if (result[0].accdata != null) {
                _this.leadlistService.GetLeadConvertAccountDll(_this.leadId, '0', _this.searchText).subscribe(function (data) {
                    if (data.length > 0) {
                        if (data[0].value != null) {
                            _this.addForm.controls['accountName'].clearValidators();
                            _this.addForm.controls['accounttypeid'].clearValidators();
                            _this.addForm.get('accountName').updateValueAndValidity();
                            _this.addForm.get('accounttypeid').updateValueAndValidity();
                            _this.isAccountExisting = true;
                            _this.accountMessage = 'An account is already exists for this Address, you can choose that account from the right panel.';
                            _this.addForm.patchValue({
                                accountName: result[0].accdata,
                                opportunityname: result[0].leaddata,
                                Account: 'chooseexistingaccount',
                                accountid: data[0].value
                            });
                        }
                        else {
                            _this.addForm.patchValue({
                                accountName: result[0].accdata,
                                opportunityname: result[0].leaddata
                            });
                        }
                    }
                    else {
                        _this.addForm.patchValue({
                            accountName: result[0].accdata,
                            opportunityname: result[0].leaddata
                        });
                    }
                });
            }
            else {
                _this.addForm.patchValue({
                    accountName: result[0].accdata,
                    opportunityname: result[0].leaddata
                });
            }
            _this.leadlistService.GetLeadConvertContactDll(_this.leadId, '0', _this.searchText, true).subscribe(function (data) {
                if (data[0].value != null) {
                    _this.addForm.controls['firstName'].clearValidators();
                    _this.addForm.controls['lastName'].clearValidators();
                    _this.addForm.controls['email'].clearValidators();
                    _this.addForm.controls['phone'].clearValidators();
                    _this.addForm.get('firstName').updateValueAndValidity();
                    _this.addForm.get('lastName').updateValueAndValidity();
                    _this.addForm.get('email').updateValueAndValidity();
                    _this.addForm.get('phone').updateValueAndValidity();
                    _this.contactMessage = 'An contact is already exists for this Email Id, you can choose that contact from the right panel.';
                    _this.isContactExisting = true;
                    _this.addForm.patchValue({
                        contact: 'chooseexistingcontact',
                        contactidform: data[0].value
                    });
                }
            });
        }, function (error) {
        });
    };
    LeadconvertpopupComponent.prototype.getcontactlist = function () {
        var _this = this;
        this.leadlistService.getContactList(this.leadId, 10, 'lead', this.sortColumn, this.sortDir, 0, this.pageSizeValueLeadconvert, this.userId).subscribe(function (response) {
            _this.pagedDataLeadconvert = _this.leadlistService.pagedData;
            //console.log('pagedDataLeadconvert', this.pagedDataLeadconvert);
        });
    };
    LeadconvertpopupComponent.prototype.GetAssociateProductList = function () {
        var _this = this;
        this.leadlistService.GetAssociateProductList(this.leadId, 10, this.submoduleName, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.userId).subscribe(function (response) {
            //  setTimeout(() => {
            _this.AssociatedproductpagedData = _this.leadlistService.pagedData;
            //console.log('pagedDataLeadconvert', this.AssociatedproductpagedData);
            // }, 200);         
            //console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
        });
    };
    LeadconvertpopupComponent.prototype.getLeadConvertModuleWizard = function () {
        var _this = this;
        this.leadlistService.getLeadConvertModuleWizard().subscribe(function (result) {
            _this.pagenames = result;
            //console.log('this.pagenames', this.pagenames)
        });
    };
    LeadconvertpopupComponent.prototype.getconverttype = function () {
        var _this = this;
        this.configurationsettingService.GetLeadConfigurationDetails(this.companyId).subscribe(function (leadresult) {
            console.log('leadresult', leadresult);
            _this.isloanapp = leadresult.isLoanapplication;
            _this.isopportuinity = leadresult.isOpportunity;
            //console.log('isopportuinity', this.isopportuinity);
            //console.log('isloanapp', this.isloanapp);
        });
    };
    LeadconvertpopupComponent.prototype.saveLeadConvert = function () {
        var _this = this;
        this.isleadconvert = true;
        console.log('addForm', this.addForm);
        if (this.addForm.valid) {
            this.isleadconvert = true;
            //console.log('addform', this.addForm);
            this.leadconvertModel.accountName = this.addForm.value.accountName;
            this.leadconvertModel.Account = this.addForm.value.Account;
            this.leadconvertModel.accountid = this.addForm.value.accountid;
            ;
            this.leadconvertModel.accounttypeid = this.addForm.value.accounttypeid;
            this.leadconvertModel.contact = this.addForm.value.contact;
            this.leadconvertModel.contactidform = this.addForm.value.contactidform;
            this.leadconvertModel.email = this.addForm.value.email;
            this.leadconvertModel.firstName = this.addForm.value.firstName;
            this.leadconvertModel.lastName = this.addForm.value.lastName;
            this.leadconvertModel.opportunityname = this.addForm.value.opportunityname;
            this.leadconvertModel.phone = this.addForm.value.phone;
            this.leadconvertModel.object_name = 'lead';
            this.leadconvertModel.object_id = '10';
            this.leadconvertModel.object_ref_id = this.leadId;
            console.log('leadconvertModel', this.leadconvertModel);
            this.leadlistService.saveLeadConvertopportunity(this.leadconvertModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    //setTimeout(() => { console.log('notes') }, 3000);
                    _this.toaster.success(result.responseMessage);
                    _this.convertleadmodel.hide();
                    _this.isleadconvert = false;
                    // this.router.navigateByUrl('/opportunity/viewOpportunity/');
                    _this.router.navigateByUrl("/opportunity/viewOpportunity/" + result.id);
                }
                else if (result.statusCode == 300) {
                    //setTimeout(() => { console.log('notes') }, 3000);
                    _this.toaster.error(result.responseMessage);
                }
                else {
                    _this.toaster.error(result.responseMessage);
                    _this.isleadconvert = false;
                }
                //}, error => {
                //  //this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addForm);
            this.isleadconvert = false;
        }
    };
    LeadconvertpopupComponent.prototype.onSelectLeadconvert = function (e) {
        if (this.tableModalcontact.selected.length >= 2) {
            this.tableModalcontact.selected.splice(0, 1);
        }
        console.log(this.tableModalcontact.selected);
    };
    LeadconvertpopupComponent.prototype.onSelectproductconvert = function (event) {
        if (this.tableModal.selected.length >= 2) {
            this.tableModal.selected.splice(0, 1);
        }
    };
    LeadconvertpopupComponent.prototype.saveProduct = function () {
        //console.log('data', this.selected);
        //console.log('data', this.productassociateid);
        var _this = this;
        if (this.productassociateid != null && this.productassociateid != "") {
            this.loadSave = true;
            // console.log('this.productid1111', this.productid);
            this.leadlistService.AssociteProduct(this.productassociateid, this.leadId, 10, 'lead', this.isloanapp).subscribe(function (r) {
                // console.log('produvct')
                _this.toaster.success("product has been Associate scuccessfully");
                _this.loadSave = false;
                _this.productassociateid = "";
                _this.selected = [];
                _this.GetAssociateProductList();
                _this.productModal.hide();
                _this.convertleadmodel.show();
            }, function (error) {
            });
        }
        else {
            this.loadSave = false;
            this.toaster.error("Please select at least one product.");
        }
        this.loadSave = false;
    };
    LeadconvertpopupComponent.prototype.onSelectassociate = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.productassociateid == "" || this.productassociateid == null || this.productassociateid == 'undefined') {
            this.selectedassociateprouct.splice(0, this.selectedassociateprouct.length);
            (_b = this.selectedassociateprouct).push.apply(_b, selected);
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.productassociateid += selected[i].ID.toString() + ",";
                }
            }
        }
        else {
            this.productassociateid = null;
            this.productassociateid = "";
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.productassociateid += selected[i].ID.toString() + ",";
                }
            }
        }
        // console.log('this.productid', this.productid);
    };
    LeadconvertpopupComponent.prototype.closeassociatepopup = function () {
        this.productModal.hide();
        this.convertleadmodel.show();
    };
    LeadconvertpopupComponent.prototype.closepopup = function () {
        this.convertleadmodel.hide();
    };
    LeadconvertpopupComponent.prototype.associateproduct = function () {
        var _this = this;
        this.convertleadmodel.hide();
        this.productModal.show();
        this.leadlistService.GetProductList(this.leadId, 10, 'lead', null, this.sortColumnAssoProdList, this.sortDirAssoProdList, this.currentPageAssoProdList, this.pageSizeValueAssoProdList, null).subscribe(function (response) {
            _this.pagedData = _this.leadlistService.pagedData;
            //console.log('this.pagedata', this.pagedData)
            _this.offsetAssociateProductList = _this.currentPageAssoProdList;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    LeadconvertpopupComponent.prototype.setPageAssociateProductList = function ($event) {
        this.loadSave = true;
        this.currentPageAssoProdList = $event.page - 1;
        this.associateproduct();
    };
    LeadconvertpopupComponent.prototype.onSortAssociateProductList = function ($event) {
        var sort = $event.sorts[0];
        this.sortDirAssoProdList = sort.dir;
        this.sortColumnAssoProdList = sort.prop;
        this.currentPageAssoProdList = 0;
        this.loadSave = true;
        this.associateproduct();
    };
    Object.defineProperty(LeadconvertpopupComponent.prototype, "curPageAssoProdList", {
        get: function () {
            return this.offsetAssociateProductList;
        },
        enumerable: true,
        configurable: true
    });
    LeadconvertpopupComponent.prototype.onChangeAssoProdList = function ($event) {
        this.currentPageAssoProdList = 0;
        this.loadSave = true;
        this.associateproduct();
    };
    LeadconvertpopupComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSizeLeadconvert = _this.commonService.masters;
            _this.lstPageSizeAssociateProduct = _this.commonService.masters;
        });
    };
    LeadconvertpopupComponent.prototype.OnAccountSelected = function (e) {
        this.addForm.controls['accountid'].clearValidators();
        this.addForm.get('accountid').updateValueAndValidity();
        this.addForm.controls['accountName'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.addForm.controls['accounttypeid'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.addForm.get('accountName').updateValueAndValidity();
        this.addForm.get('accounttypeid').updateValueAndValidity();
        this.isAccountExisting = false;
    };
    LeadconvertpopupComponent.prototype.OnAccountExistingSelected = function (e) {
        this.addForm.get('accountid').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.addForm.get('accountid').updateValueAndValidity();
        this.addForm.controls['accountName'].clearValidators();
        this.addForm.controls['accounttypeid'].clearValidators();
        this.addForm.get('accountName').updateValueAndValidity();
        this.addForm.get('accounttypeid').updateValueAndValidity();
        this.isAccountExisting = true;
    };
    LeadconvertpopupComponent.prototype.OnContactSelected = function (e) {
        this.addForm.get("contactidform").clearValidators();
        this.addForm.get('contactidform').updateValueAndValidity();
        this.addForm.controls['firstName'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.addForm.controls['lastName'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.addForm.controls['email'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email]);
        this.addForm.controls['phone'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.addForm.get('firstName').updateValueAndValidity();
        this.addForm.get('lastName').updateValueAndValidity();
        this.addForm.get('email').updateValueAndValidity();
        this.addForm.get('phone').updateValueAndValidity();
        this.isContactExisting = false;
    };
    LeadconvertpopupComponent.prototype.OnContactExistingSelected = function (e) {
        this.addForm.get("contactidform").setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.addForm.get('contactidform').updateValueAndValidity();
        this.addForm.controls['firstName'].clearValidators();
        this.addForm.controls['lastName'].clearValidators();
        this.addForm.controls['email'].clearValidators();
        this.addForm.controls['phone'].clearValidators();
        this.addForm.get('firstName').updateValueAndValidity();
        this.addForm.get('lastName').updateValueAndValidity();
        this.addForm.get('email').updateValueAndValidity();
        this.addForm.get('phone').updateValueAndValidity();
        this.isContactExisting = true;
    };
    LeadconvertpopupComponent.prototype.GetLeadConvertAccountDll = function (id) {
        var _this = this;
        if (id === void 0) { id = 0; }
        this.leadlistService.GetLeadConvertAccountDll(this.leadId, '0', this.searchText).subscribe(function (data) {
            _this.accountlist = data;
        });
    };
    LeadconvertpopupComponent.prototype.fetchMoreAccountDll = function (dataList) {
        var _this = this;
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList.length;
        this.leadlistService.GetLeadConvertAccountDll(this.leadId, this.len, this.searchText).subscribe(function (data) {
            _this.accountlist = _this.accountlist.concat(data);
        });
    };
    LeadconvertpopupComponent.prototype.onKeyAccountDll = function (e, dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = e.target.value;
        this.leadlistService.GetLeadConvertAccountDll(this.leadId, this.len, this.searchText).subscribe(function (data) {
            _this.accountlist = data;
        });
    };
    LeadconvertpopupComponent.prototype.onClearLangAccountDll = function (dataList) {
        var _this = this;
        this.addForm.get('accountid').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.addForm.get('accountid').updateValueAndValidity();
        this.len = 0;
        this.searchText = '';
        this.leadlistService.GetLeadConvertAccountDll(this.leadId, this.len, this.searchText).subscribe(function (data) {
            _this.accountlist = data;
        });
    };
    LeadconvertpopupComponent.prototype.onScrollToEndAccountDll = function (dataList) {
        this.fetchMoreAccountDll(dataList);
    };
    LeadconvertpopupComponent.prototype.GetLeadConvertContactDll = function (id) {
        var _this = this;
        if (id === void 0) { id = 0; }
        this.leadlistService.GetLeadConvertContactDll(this.leadId, '0', this.searchText, true).subscribe(function (data) {
            _this.contactlist = data;
        });
    };
    LeadconvertpopupComponent.prototype.fetchMoreContactDll = function (dataList) {
        var _this = this;
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList.length;
        this.leadlistService.GetLeadConvertContactDll(this.leadId, this.len, this.searchText, true).subscribe(function (data) {
            _this.contactlist = _this.accountlist.concat(data);
        });
    };
    LeadconvertpopupComponent.prototype.onKeyContactDll = function (e, dataList) {
        var _this = this;
        this.addForm.get("contactidform").setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.addForm.get('contactidform').updateValueAndValidity();
        this.len = 0;
        this.searchText = e.target.value;
        this.leadlistService.GetLeadConvertContactDll(this.leadId, this.len, this.searchText, true).subscribe(function (data) {
            _this.contactlist = data;
        });
    };
    LeadconvertpopupComponent.prototype.onClearLangContactDll = function (dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = '';
        this.leadlistService.GetLeadConvertContactDll(this.leadId, this.len, this.searchText, true).subscribe(function (data) {
            _this.contactlist = data;
        });
    };
    LeadconvertpopupComponent.prototype.changeaccountddl = function (e) {
        debugger;
        if (this.addForm.get('Account').value == 'createnewaccount') {
            this.addForm.controls['accountName'].clearValidators();
            this.addForm.controls['accounttypeid'].clearValidators();
            this.addForm.get('accountName').updateValueAndValidity();
            this.addForm.get('accounttypeid').updateValueAndValidity();
            this.addForm.get('Account').setValue('chooseexistingaccount');
            this.leadconvertModel.accountid = e.value;
        }
    };
    LeadconvertpopupComponent.prototype.changecontactddl = function (e) {
        if (this.addForm.get('contact').value == 'createnewcontact') {
            this.addForm.controls['firstName'].clearValidators();
            this.addForm.controls['lastName'].clearValidators();
            this.addForm.controls['email'].clearValidators();
            this.addForm.controls['phone'].clearValidators();
            this.addForm.get('firstName').updateValueAndValidity();
            this.addForm.get('lastName').updateValueAndValidity();
            this.addForm.get('email').updateValueAndValidity();
            this.addForm.get('phone').updateValueAndValidity();
            this.addForm.get('contact').setValue('chooseexistingcontact');
            this.leadconvertModel.contactidform = e.value;
        }
    };
    LeadconvertpopupComponent.prototype.onScrollToEndContactDll = function (dataList) {
        this.fetchMoreContactDll(dataList);
    };
    Object.defineProperty(LeadconvertpopupComponent.prototype, "accountName", {
        get: function () { return this.addForm.get('accountName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconvertpopupComponent.prototype, "opportunityname", {
        get: function () { return this.addForm.get('opportunityname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconvertpopupComponent.prototype, "accounttypeid", {
        get: function () { return this.addForm.get('accounttypeid'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconvertpopupComponent.prototype, "accountid", {
        get: function () { return this.addForm.get('accountid'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconvertpopupComponent.prototype, "contactidform", {
        get: function () { return this.addForm.get('contactidform'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconvertpopupComponent.prototype, "firstName", {
        // get Salutationtypeid() { return this.addForm.get('Salutationtypeid'); }
        get: function () { return this.addForm.get('firstName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconvertpopupComponent.prototype, "lastName", {
        get: function () { return this.addForm.get('lastName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconvertpopupComponent.prototype, "email", {
        get: function () { return this.addForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadconvertpopupComponent.prototype, "phone", {
        get: function () { return this.addForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    LeadconvertpopupComponent.ctorParameters = function () { return [
        { type: _leadlist_service__WEBPACK_IMPORTED_MODULE_1__["LeadlistService"] },
        { type: _configurationsetting_configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["ConfigurationsettingService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _lead_service__WEBPACK_IMPORTED_MODULE_4__["LeadService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_9__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], LeadconvertpopupComponent.prototype, "offsetAssociateProductList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('table34', { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__["DatatableComponent"])
    ], LeadconvertpopupComponent.prototype, "tableModalcontact", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('table12', { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__["DatatableComponent"])
    ], LeadconvertpopupComponent.prototype, "tableModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__["DatatableComponent"])
    ], LeadconvertpopupComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('makeappointment', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], LeadconvertpopupComponent.prototype, "convertleadmodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('product', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], LeadconvertpopupComponent.prototype, "productModal", void 0);
    LeadconvertpopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-leadconvertpopup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./leadconvertpopup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/leadconvertpopup.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./leadconvertpopup.component.scss */ "./src/app/views/lead/leadconvertpopup.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_leadlist_service__WEBPACK_IMPORTED_MODULE_1__["LeadlistService"],
            _configurationsetting_configurationsetting_service__WEBPACK_IMPORTED_MODULE_5__["ConfigurationsettingService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"], _lead_service__WEBPACK_IMPORTED_MODULE_4__["LeadService"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_9__["ToastrService"]])
    ], LeadconvertpopupComponent);
    return LeadconvertpopupComponent;
}());



/***/ }),

/***/ "./src/app/views/lead/leadlist.component.scss":
/*!****************************************************!*\
  !*** ./src/app/views/lead/leadlist.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".disabledddl {\n  opacity: 0.4;\n  pointer-events: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbGVhZC9EOlxcUHJpbmNlIFNpbmdoXFx3b3Jrc3BhY2VcXFNvbGdlbk9uZVxcTGFob3JlMVxcU29sZ2VuXFxzb2xnZW4ucG9ydGFsXFxDbGllbnRBcHAvc3JjXFxhcHBcXHZpZXdzXFxsZWFkXFxsZWFkbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7RUFDWixvQkFBb0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xlYWQvbGVhZGxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGlzYWJsZWRkZGwge1xyXG4gIG9wYWNpdHk6IDAuNDtcclxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "./src/app/views/lead/leadlist.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/lead/leadlist.component.ts ***!
  \**************************************************/
/*! exports provided: LeadlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadlistComponent", function() { return LeadlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _leadlist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _lead_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lead.service */ "./src/app/views/lead/lead.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _configurationsetting_configurationsetting_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../configurationsetting/configurationsetting.service */ "./src/app/views/configurationsetting/configurationsetting.service.ts");
/* harmony import */ var _loanapplication_loanapplicationservice_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../loanapplication/loanapplicationservice.service */ "./src/app/views/loanapplication/loanapplicationservice.service.ts");
/* harmony import */ var _rule_engine_rule_engine_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../rule-engine/rule-engine.service */ "./src/app/views/rule-engine/rule-engine.service.ts");
/* harmony import */ var _leadconvertpopup_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./leadconvertpopup.component */ "./src/app/views/lead/leadconvertpopup.component.ts");
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
















var LeadlistComponent = /** @class */ (function () {
    function LeadlistComponent(leadlistService, configurationsettingService, dialogService, leadService, fb, commonService, router, activeRoute, loanapplicationservice, ruleEngineService, toaster) {
        var _this = this;
        this.leadlistService = leadlistService;
        this.configurationsettingService = configurationsettingService;
        this.dialogService = dialogService;
        this.leadService = leadService;
        this.fb = fb;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.loanapplicationservice = loanapplicationservice;
        this.ruleEngineService = ruleEngineService;
        this.toaster = toaster;
        this.activeWizard = 0;
        this.leadconvertModel = new _leadlist_service__WEBPACK_IMPORTED_MODULE_5__["leadConvertModel"]();
        this.searchUserType = '';
        this.ViewModel = '';
        this.creditScoreData = [];
        this.leadDetails = {};
        this.mandatoryDocuments = [];
        this.loanApplicationNumber = "";
        this.incomeVerification = "";
        this.custom_view_id = '';
        this.searchFilter = '';
        this.modulePermission = [];
        //modulePermission: ModuleList;
        this.sortDir = 'desc';
        this.moduleName = 'crm';
        this.submoduleName = 'lead';
        this.tableName = 'tblLeads';
        this.sortColumn = 'LeadId';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["SelectionType"];
        this.productassociateid = "";
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataLeadconvert = {
            pager: {},
            data: []
        };
        this.AssociatedproductpagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.listFiltertext = '';
        this.selected = [];
        this.selectedassociateprouct = [];
        this.selectedleadconvert = [];
        this.selected12 = [];
        this.loanid = 0;
        this.contactid = "";
        this.productid = "";
        this.isAccountExisting = true;
        this.isContactExisting = true;
        this.isloanapp = false;
        this.isopportuinity = false;
        this.formControlList = [];
        this.loadSave = false;
        this.queryString = [];
        this.sortDirAssoProdList = 'desc';
        this.sortColumnAssoProdList = 'CreatedOn';
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.myCheckbox = false;
        //change() {
        //  this.leadlistService.getLeadConvertData(this.leadid).subscribe((result: any) => {
        //    console.log('result', result);
        //    this.loanid = result[0].loanapplicationid;
        //  },
        //    (error: any) => {
        //    })
        //}
        this.addForm = this.fb.group({
            //Account: ['createnewaccount'],
            //contact: ['createnewcontact'],
            //opportunity: [true],
            accountName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required],
            opportunityname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required],
            accounttypeid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required],
        });
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        this.commonService.getMasterItemsList("accountType1").subscribe(function (result) {
            _this.lstaccounttype = _this.commonService.masters;
            //console.log('lstaccounttype', this.lstaccounttype)
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'LEADADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'LEADUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'LEADDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
            _this.companyType = userdetail.companyType;
        });
    }
    LeadlistComponent.prototype.ngOnInit = function () {
        //console.log('JsonDATAAAA', localStorage.getItem('moduleList'));
        this.creditScoreData.push({ bureauName: "", data: { creditScore: 0, creditScoreCategory: 'N/A', applicationStatus: '' } });
        this.getLeadConvertModuleWizard();
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
        this.Leadstatusid = this.commonService.getQueryStringValue("stage");
        //var fromDate = this.commonService.getQueryStringValue("fromDate");
        this.listFiltertext = null;
        if (this.Leadstatusid != null) {
            this.listFiltertext = "StatusName = '" + this.Leadstatusid + "'";
        }
        if (this.datefrom != null && this.datefrom != undefined && this.datefrom != "") {
            if (this.datefrom.length > 0) {
                if (this.listFiltertext != null) {
                    this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) >=  CAST('" + this.datefrom + "' AS DATE)  ";
                }
                else {
                    this.listFiltertext = " CAST(CreatedAt AS DATE) >=  CAST('" + this.datefrom + "' AS DATE)  ";
                }
            }
        }
        if (this.dateto != null && this.dateto != undefined && this.dateto != "") {
            if (this.dateto.length > 0) {
                if (this.listFiltertext != null) {
                    this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) <=  CAST('" + this.dateto + "' AS DATE)  ";
                }
                else {
                    this.listFiltertext = " CAST(CreatedAt AS DATE) <=  CAST('" + this.dateto + "' AS DATE)  ";
                }
            }
        }
        if (this.teamID == "null")
            this.teamID = null;
        if (this.teamMemberID == "null")
            this.teamMemberID = null;
        if (this.listFiltertext == "null")
            this.listFiltertext = null;
        //this.activeRoute.paramMap.subscribe(
        //  params => {
        //    const id = params.get('id');
        //   // this.Leadstatusid = id.toString(); 
        //    //if (id.length > 10) {
        //    //  this.queryString = id.split('&');
        //    //  const datefrom = this.queryString[0].split('=')[1];
        //    //  const dateto = this.queryString[1].split('=')[1];
        //    //  this.widgetType = this.queryString[2].split('=')[1];
        //    //  this.recordFilter = this.queryString[3].split('=')[1];
        //    //  this.teamID = this.queryString[4].split('=')[1];
        //    //  this.teamMemberID = this.queryString[5].split('=')[1];
        //    //  const StatusName = this.queryString[6].split('=')[1];
        //    //   
        //    //  this.listFiltertext = null;
        //    //    if (StatusName.length > 0 )
        //    //    this.listFiltertext = "StatusName = " + StatusName + " ";
        //    //  if (datefrom.length >0 ) {
        //    //    if (this.listFiltertext != null)
        //    //      this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) >=  'CAST(" + datefrom + " AS DATE) )' ";
        //    //    else {
        //    //      this.listFiltertext = " CAST(CreatedAt AS DATE) >=  'CAST(" + datefrom + " AS DATE) )' ";
        //    //    }
        //    //  }
        //    //  if (dateto.length > 0) {
        //    //    if (this.listFiltertext != null)
        //    //      this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) >=  'CAST(" + dateto + " AS DATE) )' ";
        //    //    else {
        //    //      this.listFiltertext = " CAST(CreatedAt AS DATE) >=  'CAST(" + dateto + " AS DATE) )' ";
        //    //    }
        //    //  }
        //    //    if (this.teamID == "null")
        //    //        this.teamID = null;
        //    //    if (this.teamMemberID == "null")
        //    //        this.teamMemberID = null;
        //    //    if (this.listFiltertext == "null")
        //    //        this.listFiltertext = null;
        //    //  this.Leadstatusid = null;
        //    //}
        //   // if (id != null) {
        //    //  this.custom_view_id = '';
        //    //  this.pageSizeValue = 10;
        //     // this.currentPage = 1;
        //      //if (this.Leadstatusid != null) {
        //      //  this.listFiltertext = "StatusName = '" + this.Leadstatusid + "'";
        //      //}
        //    //  this.getPageSizes();
        //     // this.refresh();
        //    //}
        //  }
        //);
        this.getconverttype();
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.pageSizeValueLeadconvert = 10;
        this.LoadViewData();
        this.currentPage = 1;
        this.getPageSizes();
        this.refresh();
        this.currentPageAssoProdList = 0;
        this.pageSizeValueAssoProdList = 10;
    };
    LeadlistComponent.prototype.onSortLeadconvert = function (e) {
    };
    LeadlistComponent.prototype.onSelectedLeadconvert = function (e) {
    };
    LeadlistComponent.prototype.setPageLeadconvert = function (e) { };
    LeadlistComponent.prototype.getListingColorCode = function (fieldValue) {
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        //console.log('this.lstColorCode', this.lstColorCode)
        return this.lstListingColorCode;
        //console.log('this.lstColorCode', this.lstColorCode)
    };
    LeadlistComponent.prototype.GetcustomViewid = function (event) {
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
        this.custom_view_id = event;
        this.vewId = event;
        this.refresh();
    };
    LeadlistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    LeadlistComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loadSave = true;
        this.leadlistService.GetLeadlist(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId, this.widgetType, this.recordFilter, this.teamID, this.teamMemberID, this.myCheckbox)
            .subscribe(function (response) {
            _this.jsonData = response;
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            //console.log('columndata', this.columndata)
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
    Object.defineProperty(LeadlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    LeadlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
            _this.lstPageSizeLeadconvert = _this.commonService.masters;
            _this.lstPageSizeAssociateProduct = _this.commonService.masters;
        });
    };
    LeadlistComponent.prototype.setPage = function ($event) {
        this.loadSave = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    LeadlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    LeadlistComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    LeadlistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    LeadlistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        //if (this.listFiltertext != null )
        // this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    LeadlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    LeadlistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.length > 0) {
            this.listFiltertext = "Name like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    LeadlistComponent.prototype.reset = function () {
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.myCheckbox = false;
        this.refresh();
        this.selected = [];
    };
    LeadlistComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].LeadID.toString() + ",";
            }
        }
        else {
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].LeadID.toString() + ",";
            }
        }
    };
    LeadlistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete the selected lead(s)?";
            this.dialogService.confirm('Delete Lead(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.leadService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    LeadlistComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Lead  \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete Lead', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadService.DeleteRecords(row.LeadID, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Lead \"" + row.Name + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    LeadlistComponent.prototype.showpopup = function (id) {
        var _this = this;
        if (this.companyType == "companytypeSolarInstall") {
            this.showpopupleadconvert(id);
        }
        //if (this.companyType == "companytypeSolarInstall") {
        //  this.leadlistService.getLeadById(id).subscribe(resp => {
        //    console.log("Lead DEtails", resp);
        //    this.leaddata = resp;  
        //    if (this.leaddata.Email == null || this.leaddata.Service_Territory_Text == null || this.leaddata.MobilePhone == null || this.leaddata.Street == null || this.leaddata.City == null || this.leaddata.State == null || this.leaddata.PostalCode == null || this.leaddata.Homeowner == null || this.leaddata.Credit_Threshold_Met == null || this.leaddata.Aware_of_Solar_Tax_Credits_ITC == null || this.leaddata.Email == "" || this.leaddata.Service_Territory_Text == "" || this.leaddata.MobilePhone == "" || this.leaddata.Street == "" || this.leaddata.City == "" || this.leaddata.State == "" || this.leaddata.PostalCode == "" || this.leaddata.Homeowner == "" || this.leaddata.Credit_Threshold_Met == "" || this.leaddata.Aware_of_Solar_Tax_Credits_ITC == "") {
        //      let message = "Please fill ";
        //      if (this.leaddata.Email == null || this.leaddata.Email == "") {
        //        message += "Email,"
        //      }
        //      if (this.leaddata.Service_Territory_Text == null || this.leaddata.Service_Territory_Text == "") {
        //        message += "Service Territory,"
        //      }
        //      if (this.leaddata.MobilePhone == "" || this.leaddata.MobilePhone == null) {
        //        message += "MobilePhone,"
        //      }
        //      if (this.leaddata.Street == "" || this.leaddata.Street == null) {
        //        message += "Street,"
        //      }
        //      if (this.leaddata.City == null || this.leaddata.City == "") {
        //        message += "City,"
        //      }
        //      if (this.leaddata.State == null || this.leaddata.State == "") {
        //        message += "State,"
        //      }
        //      if (this.leaddata.PostalCode == null || this.leaddata.PostalCode == "") {
        //        message += "Zip Code,"
        //      }
        //      if (this.leaddata.Homeowner == null || this.leaddata.Homeowner == "") {
        //        message += "Homeowner,"
        //      }
        //      if (this.leaddata.Credit_Threshold_Met == null || this.leaddata.Credit_Threshold_Met == "") {
        //        message += "Credit Threshold Met,"
        //      }
        //      if (this.leaddata.Aware_of_Solar_Tax_Credits_ITC == null || this.leaddata.Aware_of_Solar_Tax_Credits_ITC == "") {
        //        message += "Aware of Solar Tax Credits (ITC),"
        //      }
        //      message = message.replace(/,\s*$/, "");
        //      if (message.split(',').length > 1) {
        //        message = message.replace(/,(?=[^,]*$)/, ' and ');
        //      }
        //      message += " of this lead in order to convert it.";
        //      console.log("Lead DEtails", this.leaddata); 
        //      this.toaster.error(message);
        //    } else {
        //      this.leadid = id;
        //      this.getLeadConvertData(this.leadid);
        //      this.getcontactlist();
        //      this.GetAssociateProductList();
        //      this.getLeadConvertModuleWizard();
        //      this.convertleadmodel.show();
        //      this.addForm.patchValue({
        //        accounttypeid: this.lstaccounttype[0].value
        //      })
        //   }
        //    })
        //}
        else {
            this.leadlistService.getLeadById(id, false).subscribe(function (resp) {
                if (resp.DOB == null || resp.SSN == null || resp.EmploymentType == null) {
                    // console.log("Lead DEtails", resp);
                    _this.toaster.error("Please fill Date of Birth, SSN and Employment Type of this lead in order to convert it.");
                }
                else {
                    _this.leadid = id;
                    _this.getLeadConvertData(_this.leadid);
                    _this.getcontactlist();
                    _this.GetAssociateProductList();
                    _this.getLeadConvertModuleWizard();
                    _this.convertleadmodel.show();
                    _this.addForm.patchValue({
                        accounttypeid: _this.lstaccounttype[0].value
                    });
                }
            });
        }
    };
    LeadlistComponent.prototype.close = function () {
        this.convertleadmodel.hide();
    };
    LeadlistComponent.prototype.closeCreditScoreModel = function () {
        this.creditscoremodel.hide();
    };
    LeadlistComponent.prototype.getcontactlist = function () {
        var _this = this;
        this.leadlistService.getContactList(this.leadid, 10, 'lead', this.sortColumn, this.sortDir, 0, this.pageSizeValueLeadconvert, this.loginuserid).subscribe(function (response) {
            _this.pagedDataLeadconvert = _this.leadlistService.pagedData;
            //console.log('pagedDataLeadconvert', this.pagedDataLeadconvert);
        });
    };
    LeadlistComponent.prototype.saveLeadConvert = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.contactid = this.tableModalcontact.selected.length > 0 ? this.tableModalcontact.selected[0].id : null;
            //this.productid = this.tableModal.selected.length > 0 ? this.tableModal.selected[0].ID : null;
            if (this.contactid == "" || this.contactid == null || this.contactid == 'undefined') {
                this.toaster.error("Please select at least one row.");
                return;
            }
            //console.log('addform', this.addForm);
            this.leadconvertModel.account_name = this.addForm.value.accountName;
            this.leadconvertModel.account_type_id = this.addForm.value.accounttypeid;
            this.leadconvertModel.object_ref_id = this.leadid;
            this.leadconvertModel.contactid = this.contactid;
            this.leadconvertModel.productid = '0';
            this.leadconvertModel.object_name = 'lead';
            this.leadconvertModel.object_id = 10;
            this.leadconvertModel.loanid = '0';
            this.leadconvertModel.opportunity_name = this.addForm.value.opportunityname;
            // console.log('leadconvertModel', this.leadconvertModel);
            this.leadlistService.saveLeadConvert(this.leadconvertModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.convertleadmodel.hide();
                    _this.refresh();
                    _this.router.navigateByUrl("/opportunity/viewOpportunity/" + result.id);
                }
                else {
                    _this.toaster.error(result.responseMessage);
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addForm);
        }
    };
    LeadlistComponent.prototype.getLeadConvertData = function (leadid) {
        var _this = this;
        this.leadlistService.getLeadConvertData(leadid).subscribe(function (result) {
            // console.log('loanapplicationid', result);
            _this.addForm.patchValue({
                accountName: result[0].accdata,
                opportunityname: result[0].leaddata,
            });
        }, function (error) {
        });
    };
    Object.defineProperty(LeadlistComponent.prototype, "accountName", {
        get: function () { return this.addForm.get('accountName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadlistComponent.prototype, "opportunityname", {
        get: function () { return this.addForm.get('opportunityname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadlistComponent.prototype, "accounttypeid", {
        get: function () { return this.addForm.get('accounttypeid'); },
        enumerable: true,
        configurable: true
    });
    LeadlistComponent.prototype.getconverttype = function () {
        var _this = this;
        this.configurationsettingService.GetLeadConfigurationDetails(this.companyid).subscribe(function (leadresult) {
            _this.isloanapp = leadresult.isLoanapplication;
            _this.isopportuinity = leadresult.isOpportunity;
            //console.log('leadresult', leadresult);
            //console.log('isopportuinity', this.isopportuinity);
            // console.log('isloanapp', this.isloanapp);
        });
    };
    LeadlistComponent.prototype.GetAssociateProductList = function () {
        var _this = this;
        this.leadlistService.GetAssociateProductList(this.leadid, 10, this.submoduleName, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            //  setTimeout(() => {
            _this.AssociatedproductpagedData = _this.leadlistService.pagedData;
            _this.table.recalculate();
            _this.table.recalculateColumns();
            // }, 200);         
            //console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
        });
    };
    LeadlistComponent.prototype.onChangeAssociateProduct = function ($event) {
        var _this = this;
        this.leadlistService.GetAssociateProductList(this.leadid, 10, this.submoduleName, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.leadlistService.pagedData;
            //console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
        });
    };
    LeadlistComponent.prototype.setPageAssociateProduct = function ($event) {
        var _this = this;
        this.leadlistService.GetAssociateProductList(this.leadid, 10, this.submoduleName, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSizeAssociateProduct, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.leadlistService.pagedData;
            //console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
        });
    };
    LeadlistComponent.prototype.onSelectLeadconvert = function (e) {
        //console.log(e)
        if (this.tableModalcontact.selected.length >= 2) {
            this.tableModalcontact.selected.splice(0, 1);
        }
        //console.log(this.tableModalcontact.selected);
        //console.log(this.selected);
        //if (this.contactid == "" || this.contactid == null || this.contactid == 'undefined') {
        //  for (let i = 0; i < this.selected.length; i++) {
        //      this.contactid += this.selected[i].id;
        //  }
        //}
        //else {
        //  this.contactid = null;
        //  this.contactid = "";
        //  for (let i = 0; i < this.selected.length; i++) {
        //      this.contactid += this.selected[i].id;
        //  }
        //  //if (this.contactid == selected[0].id) {
        //  //  this.contactid = null;
        //  //}
        //}
        ////console.log('this.contactid', this.contactid);
    };
    LeadlistComponent.prototype.onSelectproductconvert = function (event) {
        if (this.tableModal.selected.length >= 2) {
            this.tableModal.selected.splice(0, 1);
        }
        //if (this.productid == "" || this.productid == null || this.productid == 'undefined') {
        //  for (let i = 0; i < event.length; i++) {
        //    if (event[i].asociatedUser !== 1) {
        //      this.productid += event[i].ID;
        //    }
        //  }   
        //}
        //else {
        //  this.productid = null;
        //  this.productid = "";
        //  for (let i = 0; i < event.length; i++) {
        //    if (event[i].asociatedUser !== 1) {
        //      this.productid += event[i].ID;
        //    }
        //if (this.productid == selected[0].ID) {
        //  this.productid = null;
        //}
        //console.log('this.productid ', this.productid );
    };
    LeadlistComponent.prototype.getLeadConvertModuleWizard = function () {
        var _this = this;
        this.leadlistService.getLeadConvertModuleWizard().subscribe(function (result) {
            _this.pagenames = result;
            // console.log('this.pagenames', this.pagenames)
        });
    };
    LeadlistComponent.prototype.saveLeadConvertproduct = function () {
        var _this = this;
        this.addForm.value.opportunityname = 'test';
        //if (this.isloanapp == true) {
        //  if (this.loanid != null && this.loanid != undefined && this.loanid != '') {
        //console.log(this.productid)
        //console.log(this.contactid);
        // console.log();
        this.productid = this.tableModal.selected.length > 0 ? this.tableModal.selected[0].ID : null;
        this.contactid = this.tableModalcontact.selected.length > 0 ? this.tableModalcontact.selected[0].id : null;
        if (this.addForm.valid) {
            if (this.contactid == "" || this.contactid == null || this.contactid == 'undefined') {
                this.toaster.error("Please select at least one row.");
                return;
            }
            if (this.productid == "" || this.productid == null || this.productid == 'undefined') {
                this.toaster.error("Please associate atleast one product.");
                return;
            }
            //console.log('addform', this.addForm);
            this.leadconvertModel.account_name = this.addForm.value.accountName;
            this.leadconvertModel.account_type_id = this.addForm.value.accounttypeid;
            this.leadconvertModel.object_ref_id = this.leadid;
            this.leadconvertModel.contactid = this.contactid;
            this.leadconvertModel.object_name = 'lead';
            this.leadconvertModel.object_id = 10;
            this.leadconvertModel.productid = this.productid;
            this.leadconvertModel.opportunity_name = this.addForm.value.opportunityname;
            this.leadconvertModel.loanid = '0';
            this.loadSave = true;
            this.leadlistService.saveLeadConvertproduct(this.leadconvertModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    var jsonData_1 = JSON.parse(result.optionalExtraParamers);
                    _this.ruleEngineService.executeRuleEngineTarget(jsonData_1.Id, 'ON_CREATE_AND_UPDATE', null).subscribe(function (m) {
                        _this.loanApplicationNumber = jsonData_1.ApplicationNumber;
                        _this.incomeVerification = jsonData_1.IncomeVerification;
                        _this.loanid = jsonData_1.Id;
                        _this.toaster.success(result.responseMessage);
                        _this.convertleadmodel.hide();
                        _this.creditscoremodel.show();
                        _this.leadlistService.getMandatoryDocumentsByLoanId(jsonData_1.Id).subscribe(function (documents) {
                            if (documents != null) {
                                documents.forEach(function (document) {
                                    _this.mandatoryDocuments.push(document.MasterValue);
                                });
                            }
                        });
                        _this.leadlistService.getLeadById(_this.leadid, false).subscribe(function (lead) {
                            _this.leadDetails = lead;
                            _this.loanapplicationservice.getCreditBureauList().subscribe(function (creditBureaus) {
                                _this.creditScoreData = [];
                                creditBureaus.forEach(function (b) {
                                    if (b.BureauName == "Equifax") {
                                        //this.loanapplicationservice.getFileStatus(jsonData.Id, "Primary", b.Id).subscribe(fileStatus => {
                                        //  if (fileStatus.consumers.equifaxPrecheckReport[0].hitCode.code == "U") {
                                        _this.loanapplicationservice.pullCreditScoreData(jsonData_1.Id, "Primary", b.Id).subscribe(function (score) {
                                            _this.loadSave = false;
                                            _this.creditScoreData.push({ bureauName: b.BureauName, data: score });
                                            _this.refresh();
                                        }, function (err) {
                                            _this.loadSave = false;
                                            _this.refresh();
                                        });
                                        //  }
                                        //}, err => {
                                        //  this.loadSave = false;
                                        //  this.refresh();
                                        //});
                                    }
                                });
                            }, function (err) {
                                _this.loadSave = false;
                                _this.refresh();
                            });
                        }, function (err) {
                            _this.loadSave = false;
                            _this.refresh();
                        });
                    });
                }
                else {
                    _this.loadSave = false;
                    _this.refresh();
                    _this.toaster.error(result.responseMessage);
                }
                //}, error => {
                //  //this.loadSave = false;
            }, function (err) {
                _this.loadSave = false;
                _this.refresh();
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addForm);
        }
        //  }
        //  else {
        //    this.toaster.error('Please Fill the Loan Application Form');
        //  }
        //}
    };
    LeadlistComponent.prototype.proceed = function () {
        this.creditscoremodel.hide();
        this.loanApplicationModal.show();
    };
    LeadlistComponent.prototype.nexStep = function (event) {
        // console.log(event);
        this.activeWizard = event;
    };
    LeadlistComponent.prototype.finishStep = function (event) {
        this.loanApplicationModal.hide();
    };
    LeadlistComponent.prototype.closeLoanApplicationModal = function () {
        this.loanApplicationModal.hide();
    };
    LeadlistComponent.prototype.saveProduct = function () {
        //console.log('data', this.selected);
        // console.log('data',this.productassociateid);
        var _this = this;
        if (this.productassociateid != null && this.productassociateid != "") {
            this.loadSave = true;
            // console.log('this.productid1111', this.productid);
            this.leadlistService.AssociteProduct(this.productassociateid, this.leadid, 10, 'lead', this.isloanapp).subscribe(function (r) {
                // console.log('produvct')
                _this.toaster.success("product has been Associate scuccessfully");
                _this.loadSave = false;
                _this.productassociateid = "";
                _this.selected = [];
                _this.GetAssociateProductList();
                _this.productModal.hide();
                _this.convertleadmodel.show();
            }, function (error) {
            });
        }
        else {
            this.loadSave = false;
            this.toaster.error("Please select at least one product.");
        }
        this.loadSave = false;
    };
    LeadlistComponent.prototype.onSelectassociate = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.productassociateid == "" || this.productassociateid == null || this.productassociateid == 'undefined') {
            this.selectedassociateprouct.splice(0, this.selectedassociateprouct.length);
            (_b = this.selectedassociateprouct).push.apply(_b, selected);
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.productassociateid += selected[i].ID.toString() + ",";
                }
            }
        }
        else {
            this.productassociateid = null;
            this.productassociateid = "";
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.productassociateid += selected[i].ID.toString() + ",";
                }
            }
        }
        // console.log('this.productid', this.productid);
    };
    LeadlistComponent.prototype.closeassociatepopup = function () {
        this.productModal.hide();
        this.convertleadmodel.show();
    };
    LeadlistComponent.prototype.associateproduct = function () {
        var _this = this;
        this.convertleadmodel.hide();
        this.productModal.show();
        this.leadlistService.GetProductList(this.leadid, 10, 'lead', null, this.sortColumnAssoProdList, this.sortDirAssoProdList, this.currentPageAssoProdList, this.pageSizeValueAssoProdList, null).subscribe(function (response) {
            _this.pagedData = _this.leadlistService.pagedData;
            _this.offsetAssociateProductList = _this.currentPageAssoProdList;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    LeadlistComponent.prototype.setPageAssociateProductList = function ($event) {
        this.loadSave = true;
        this.currentPageAssoProdList = $event.page - 1;
        this.associateproduct();
    };
    LeadlistComponent.prototype.onSortAssociateProductList = function ($event) {
        var sort = $event.sorts[0];
        this.sortDirAssoProdList = sort.dir;
        this.sortColumnAssoProdList = sort.prop;
        this.currentPageAssoProdList = 0;
        this.loadSave = true;
        this.associateproduct();
    };
    Object.defineProperty(LeadlistComponent.prototype, "curPageAssoProdList", {
        get: function () {
            return this.offsetAssociateProductList;
        },
        enumerable: true,
        configurable: true
    });
    LeadlistComponent.prototype.onChangeAssoProdList = function ($event) {
        this.currentPageAssoProdList = 0;
        this.loadSave = true;
        this.associateproduct();
    };
    LeadlistComponent.prototype.closecreditscore = function () {
        this.creditscoremodel.hide();
    };
    LeadlistComponent.prototype.LoadViewData = function () {
        var _this = this;
        this.loadSave = true;
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.leadlistService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.leadlistService.pagedData;
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
    LeadlistComponent.prototype.SetManageViewValue = function (event, text) {
        this.ViewModel = text;
        this.custom_view_id = event;
        this.refresh();
        //this.LoadViewData();
    };
    LeadlistComponent.prototype.showpopupleadconvert = function (id) {
        this.leadconvert.show(id);
    };
    LeadlistComponent.prototype.switchClicked = function (event) {
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
    LeadlistComponent.ctorParameters = function () { return [
        { type: _leadlist_service__WEBPACK_IMPORTED_MODULE_5__["LeadlistService"] },
        { type: _configurationsetting_configurationsetting_service__WEBPACK_IMPORTED_MODULE_12__["ConfigurationsettingService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"] },
        { type: _lead_service__WEBPACK_IMPORTED_MODULE_9__["LeadService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _loanapplication_loanapplicationservice_service__WEBPACK_IMPORTED_MODULE_13__["LoanapplicationserviceService"] },
        { type: _rule_engine_rule_engine_service__WEBPACK_IMPORTED_MODULE_14__["RuleEngineService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_7__["SearchfilteraddComponent"])
    ], LeadlistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_6__["ManageviewComponent"])
    ], LeadlistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('makeappointment', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], LeadlistComponent.prototype, "convertleadmodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('creditscore', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], LeadlistComponent.prototype, "creditscoremodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('loanApplicationModal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], LeadlistComponent.prototype, "loanApplicationModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('product', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], LeadlistComponent.prototype, "productModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('table12', { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], LeadlistComponent.prototype, "tableModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('table34', { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], LeadlistComponent.prototype, "tableModalcontact", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('leadconvert', { static: false }),
        __metadata("design:type", _leadconvertpopup_component__WEBPACK_IMPORTED_MODULE_15__["LeadconvertpopupComponent"])
    ], LeadlistComponent.prototype, "leadconvert", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], LeadlistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], LeadlistComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], LeadlistComponent.prototype, "offsetAssociateProductList", void 0);
    LeadlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-leadlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./leadlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/leadlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./leadlist.component.scss */ "./src/app/views/lead/leadlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_leadlist_service__WEBPACK_IMPORTED_MODULE_5__["LeadlistService"],
            _configurationsetting_configurationsetting_service__WEBPACK_IMPORTED_MODULE_12__["ConfigurationsettingService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"], _lead_service__WEBPACK_IMPORTED_MODULE_9__["LeadService"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _loanapplication_loanapplicationservice_service__WEBPACK_IMPORTED_MODULE_13__["LoanapplicationserviceService"],
            _rule_engine_rule_engine_service__WEBPACK_IMPORTED_MODULE_14__["RuleEngineService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], LeadlistComponent);
    return LeadlistComponent;
}());



/***/ }),

/***/ "./src/app/views/lead/viewlead.component.scss":
/*!****************************************************!*\
  !*** ./src/app/views/lead/viewlead.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xlYWQvdmlld2xlYWQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/lead/viewlead.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/lead/viewlead.component.ts ***!
  \**************************************************/
/*! exports provided: ViewleadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewleadComponent", function() { return ViewleadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _leadlist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dashboard/dashboard.service */ "./src/app/views/dashboard/dashboard.service.ts");
/* harmony import */ var _emailtemplate_emailtemplate_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../emailtemplate/emailtemplate.service */ "./src/app/views/emailtemplate/emailtemplate.service.ts");
/* harmony import */ var _configurationsetting_configurationsetting_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../configurationsetting/configurationsetting.service */ "./src/app/views/configurationsetting/configurationsetting.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../shared/scriptservice.service */ "./src/app/views/shared/scriptservice.service.ts");
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














var ViewleadComponent = /** @class */ (function () {
    function ViewleadComponent(route, dialogService, configurationsettingService, dashboardService, emailTemplateService, commonService, leadservice, fb, router, toaster, dynamicScripts) {
        this.route = route;
        this.dialogService = dialogService;
        this.configurationsettingService = configurationsettingService;
        this.dashboardService = dashboardService;
        this.emailTemplateService = emailTemplateService;
        this.commonService = commonService;
        this.leadservice = leadservice;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.dynamicScripts = dynamicScripts;
        this.hideEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // loadSave: boolean = false;
        this.submoduleid = 10;
        this.ColumnMode = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["ColumnMode"];
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["SelectionType"];
        this.notemodel = new _leadlist_service__WEBPACK_IMPORTED_MODULE_5__["noteModel"]();
        this.emailmodel = new _leadlist_service__WEBPACK_IMPORTED_MODULE_5__["emailModel"]();
        this.objectname = 'lead';
        this.is_converted = false;
        this.listFilter = '';
        this.searchTxt = '';
        this.statusdll = false;
        this.createddll = false;
        this.sortDir = 'desc';
        this.sortColumn = 'createdon';
        this.loading = false;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.AssociatedproductpagedData = {
            pager: {},
            data: []
        };
        this.NotespagedData = {
            pager: {},
            data: []
        };
        this.emailpagedData = {
            pager: {},
            data: []
        };
        this.productid = "";
        this.selected = [];
        this.fileName = 'Choose file';
        this.contactpagedData = {
            pager: {},
            data: []
        };
        this.isloanapp = false;
        this.isopportuinity = false;
        this.createdcode = false;
        this.loadSave = false;
        this.addNoteForm = this.fb.group({
            // note: ['', Validators.required],
            noteDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            isPrivate: ['1']
        });
        this.leadform = this.fb.group({
            // note: ['', Validators.required],
            leadstatusddl: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            createdbyddl: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
        this.EmailForm = this.fb.group({
            templateid: [null],
            sentto: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            subject: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            emailDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
        //IMAGE UPLOAD   
        this.UploadimageForm = this.fb.group({
            profilePic: [''],
            'file': '',
            'filename': [''],
            filetype: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]
        });
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }
    ;
    ViewleadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dynamicScripts.load('map');
        this.getconverttype();
        // this.loadSave = false;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.leadid = id;
            // console.log('leadid', this.leadid);
        });
        this.loadSave = false;
        this.pageSizeValue = 10;
        this.pageSizeValueContact = 10;
        this.pageSizeValueAssociateProduct = 10;
        this.pageSizeValueemail = 10;
        this.pageSizeValuenotes = 10;
        this.currentPage = 0;
        this.getPageSizes();
        this.GetLeadappointments();
        this.GetLeadAccountdata();
        this.GetAssociateProductList();
        this.getNoteslist();
        this.getEmaillist();
        this.getContactList();
        this.getImages();
        this.getcontactdll();
        this.GettemplatetDll();
        this.getUsers();
        this.commonService.getMasterItemsList('leadstatus').subscribe(function (result) {
            _this.lstleadstatus = _this.commonService.masters;
            // console.log('leadstats', this.lstleadstatus);
        });
        this.commonService.getMasterItemsList('PrerequisiteLoanProductDocumentType').subscribe(function (result) {
            _this.lstfiletype = _this.commonService.masters;
            console.log('lstfiletype', _this.lstfiletype);
        });
    };
    ViewleadComponent.prototype.GetColorCode = function (fieldValue) {
        this.lstColorCode = fieldValue.split("::");
    };
    ViewleadComponent.prototype.GetLeadAccountdata = function () {
        var _this = this;
        this.leadservice.GetLeadAccountdata(this.leadid, this.submoduleid, this.objectname).subscribe(function (result) {
            // console.log('result', result);
            _this.createdon = result[0].CreatedDate;
            _this.emaildata = result[0].Email;
            _this.mobileno = result[0].MobilePhone;
            _this.leadstatus = result[0].StatusName;
            _this.location = result[0].address;
            _this.createdby = result[0].createdby;
            _this.leadName = result[0].leadName;
            _this.leadSource = result[0].leadsource;
            _this.is_converted = result[0].is_Converted;
            //alert((this.createdby.toLowerCase() == "system ") + this.createdby);
            if (result[0].createdby.toLowerCase() == 'system ') {
                _this.createdcode = true;
            }
            // console.log('result', result);
            console.log('this.is_converted ', _this.createdby);
            _this.leadform.patchValue({
                leadstatusddl: result[0].statusddl
            });
        });
    };
    ViewleadComponent.prototype.isSystem = function (data) {
        if (data.toLowerCase() === 'system') {
            return true;
        }
        return false;
    };
    ViewleadComponent.prototype.GetLeadappointments = function () {
        var _this = this;
        this.leadservice.GetLeadappointments(this.leadid, this.submoduleid, this.objectname).subscribe(function (result) {
            // console.log('appointlistbefore', result);
            _this.appointlistbefore = result.filter(function (x) { return x.AppointmentType == 'upcoming'; });
            _this.appointlistafter = result.filter(function (x) { return x.AppointmentType == 'past'; });
        });
    };
    ViewleadComponent.prototype.deleteAssociateproduct = function (Id) {
        var _this = this;
        var message = "Are you sure you want to de-Associate Product?";
        this.dialogService.confirm('Delete Product', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.deleteAssociateproduct(Id, _this.leadid, _this.submoduleid, _this.objectname).subscribe(function (r) {
                    _this.toaster.success("Product has been de-Associate successfully..");
                    _this.GetAssociateProductList();
                }, function (error) {
                });
            }
        });
    };
    ViewleadComponent.prototype.GetProductList = function () {
        var _this = this;
        this.productModal.show();
        this.leadservice.GetProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.leadservice.pagedData;
            // console.log('pagedData', this.pagedData);
        });
    };
    ViewleadComponent.prototype.GetAssociateProductList = function () {
        var _this = this;
        this.leadservice.GetAssociateProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.leadservice.pagedData;
            // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
        });
    };
    ViewleadComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
            _this.lstPageSizeContact = _this.commonService.masters;
            _this.lstPageSizeNotes = _this.commonService.masters;
            _this.lstPageSizeemail = _this.commonService.masters;
            _this.lstPageSizeAssociateProduct = _this.commonService.masters;
        });
    };
    ViewleadComponent.prototype.onActivate = function (event) {
    };
    ViewleadComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.productid == "" || this.productid == null || this.productid == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.productid += selected[i].ID.toString() + ",";
                }
            }
        }
        else {
            this.productid = null;
            this.productid = "";
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.productid += selected[i].ID.toString() + ",";
                }
            }
        }
        // console.log('this.productid', this.productid);
    };
    ViewleadComponent.prototype.setPageAssociateProduct = function ($event) {
        var _this = this;
        this.leadservice.GetAssociateProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSizeAssociateProduct, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.leadservice.pagedData;
            // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
        });
    };
    ViewleadComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.lstPageSize = $event.page - 1;
        this.leadservice.GetProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSize, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.leadservice.pagedData;
            // console.log('pagedData', this.pagedData);
        });
    };
    ViewleadComponent.prototype.setPageNote = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.getNoteslist();
    };
    ViewleadComponent.prototype.saveProduct = function () {
        var _this = this;
        if (this.selected.length > 0) {
            this.loadSave = true;
            // console.log('this.productid1111', this.productid);
            this.leadservice.AssociteProduct(this.selected.map(function (m) { return m.ID; }).join(), this.leadid, this.submoduleid, this.objectname, this.isloanapp).subscribe(function (r) {
                // console.log('produvct')
                _this.toaster.success("product has been Associate scuccessfully");
                _this.loadSave = false;
                _this.productid = "";
                _this.selected = [];
                _this.GetAssociateProductList();
                _this.GetProductList();
                _this.productModal.hide();
            }, function (error) {
            });
        }
        else {
            this.loadSave = false;
            this.toaster.error("Please select at least one row.");
        }
        this.loadSave = false;
    };
    ViewleadComponent.prototype.showNotesPopup = function () {
        this.AddNotesModal.show();
    };
    ViewleadComponent.prototype.SaveNotes = function () {
        var _this = this;
        if (this.addNoteForm.valid) {
            this.loadSave = true;
            // this.notemodel.note_name = this.addNoteForm.value.note;
            this.notemodel.note_description = this.addNoteForm.value.noteDescription;
            this.notemodel.object_ref_id = this.leadid;
            this.notemodel.object_name = this.objectname;
            this.notemodel.object_id = this.submoduleid;
            this.notemodel.isPrivate = this.addNoteForm.value.isPrivate;
            // console.log(this.addNoteForm.value.note + ' sadf' + this.addNoteForm.value.noteDescription);
            this.leadservice.saveNotes(this.notemodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    //setTimeout(() => {  console.log('notes') }, 3000);
                    _this.loadSave = false;
                    _this.toaster.success(result.responseMessage);
                    _this.addNoteForm.reset();
                    _this.getNoteslist();
                    _this.addNoteForm.patchValue({
                        isPrivate: '1'
                    });
                    _this.AddNotesModal.hide();
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
                //}, error => {
                //  //this.loadSave = false;
            });
        }
        else {
            this.loadSave = false;
            this.commonService.validateAllFormFields(this.addNoteForm);
        }
    };
    ViewleadComponent.prototype.clickrm = function () {
        this.AddNotesModal.show();
    };
    ViewleadComponent.prototype.getEmaillist = function () {
        var _this = this;
        this.leadservice.getEmaillist(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.emailpagedData = _this.leadservice.pagedData;
            // console.log('emailpagedData', this.emailpagedData);
        });
    };
    ViewleadComponent.prototype.getNoteslist = function () {
        var _this = this;
        this.leadservice.getNoteslist(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            _this.offset = _this.currentPage;
        });
    };
    ViewleadComponent.prototype.DeleteNote = function (Id) {
        var _this = this;
        var message = "Are you sure you want to delete Note?";
        this.dialogService.confirm('Delete Note', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.DeleteNote(Id, _this.leadid, _this.submoduleid, _this.objectname).subscribe(function (r) {
                    _this.toaster.success("Note has been deleted successfully..");
                    _this.getNoteslist();
                }, function (error) {
                });
            }
        });
    };
    ViewleadComponent.prototype.DeleteContact = function (Id) {
        var _this = this;
        var message = "Are you sure you want to delete Note?";
        this.dialogService.confirm('Delete Note', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.DeleteContact(Id, _this.leadid, _this.submoduleid, _this.objectname).subscribe(function (r) {
                    _this.toaster.success("Note has been deleted successfully..");
                    _this.getContactList();
                }, function (error) {
                });
            }
        });
    };
    ViewleadComponent.prototype.setPageNotes = function ($event) {
        var _this = this;
        this.lstPageSizeNotes = $event.page - 1;
        this.leadservice.getNoteslist(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeNotes, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            // console.log('NotespagedData', this.NotespagedData);
        });
    };
    Object.defineProperty(ViewleadComponent.prototype, "noteDescription", {
        // get note() { return this.addNoteForm.get('note'); }
        get: function () { return this.addNoteForm.get('noteDescription'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadComponent.prototype, "isPrivate", {
        get: function () { return this.addNoteForm.get('isPrivate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadComponent.prototype, "leadstatusddl", {
        get: function () { return this.leadform.get('leadstatusddl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadComponent.prototype, "createdbyddl", {
        get: function () { return this.leadform.get('createdbyddl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadComponent.prototype, "sentto", {
        get: function () { return this.EmailForm.get('sentto'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadComponent.prototype, "templateid", {
        get: function () { return this.EmailForm.get('templateid'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadComponent.prototype, "subject", {
        get: function () { return this.EmailForm.get('subject'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadComponent.prototype, "emailDescription", {
        get: function () { return this.EmailForm.get('emailDescription'); },
        enumerable: true,
        configurable: true
    });
    ViewleadComponent.prototype.updateLeadStatus = function () {
        var _this = this;
        if (this.leadform.controls.leadstatusddl.valid) {
            this.leadservice.updateLeadStatus(this.leadform.value.leadstatusddl, this.leadid).subscribe(function (result) {
                _this.toaster.success('lead status updated successfully');
                _this.statusdll = false;
                _this.GetLeadAccountdata();
            });
        }
        else {
            this.commonService.validateAllFormFields(this.leadform);
        }
    };
    ViewleadComponent.prototype.SaveEmail = function () {
        var _this = this;
        console.log('temp', this.EmailForm.value.templateid);
        debugger;
        if (this.EmailForm.value.templateid == null) {
            this.EmailForm.value.templateid = 0;
        }
        if (this.EmailForm.valid) {
            this.loadSave = true;
            var ab = this.contactlist.filter(function (x) { return x.value == _this.EmailForm.value.sentto; });
            this.emailmodel.sent_to = ab[0].masterName;
            this.emailmodel.contactid = this.EmailForm.value.sentto;
            this.emailmodel.templateid = this.EmailForm.value.templateid;
            this.emailmodel.subject = this.EmailForm.value.subject;
            this.emailmodel.description = this.EmailForm.value.emailDescription;
            this.emailmodel.object_ref_id = this.leadid;
            this.emailmodel.object_name = this.objectname;
            this.emailmodel.object_id = this.submoduleid;
            //this.emailmodel.EmailForModule = this.objectname;
            // console.log(this.emailmodel)
            this.leadservice.saveEmail(this.emailmodel).subscribe(function (result) {
                setTimeout(function () {
                    if (result.statusCode == 200) {
                        _this.loadSave = false;
                        _this.toaster.success(result.responseMessage);
                        _this.getEmaillist();
                        _this.emailModal.hide();
                        _this.EmailForm.reset();
                    }
                    else {
                        _this.loadSave = false;
                        _this.toaster.error(result.responseMessage);
                    }
                }, 3000);
            });
        }
        else {
            this.commonService.validateAllFormFields(this.EmailForm);
        }
    };
    ViewleadComponent.prototype.AddContact = function () {
        this.router.navigate(['../contactlist/addContact', this.leadid]);
    };
    Object.defineProperty(ViewleadComponent.prototype, "profilePic", {
        get: function () { return this.UploadimageForm.get('profilePic'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadComponent.prototype, "filename", {
        get: function () { return this.UploadimageForm.get('filename'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadComponent.prototype, "filetype", {
        get: function () { return this.UploadimageForm.get('filetype'); },
        enumerable: true,
        configurable: true
    });
    ViewleadComponent.prototype.setFile = function ($event) {
        this.commonService.uploadImageFileValidator($event);
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB");
        if (this.commonService.isFileValid) {
            this.fileName = $event.target.files[0].name;
            this.fileExtension = this.fileName.replace(/^.*\./, '');
            //this.companyLogo.setValue($event.target.files[0].name);
        }
    };
    ViewleadComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        input.append('companyId', '1001');
        input.append('companyName', '');
        input.append('moduleid', 'lead');
        input.append('submoduleid', '10');
        input.append('refid', this.leadid);
        input.append('filetype', this.UploadimageForm.value.filetype);
        input.append('fileExtension', this.fileExtension);
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            input.append('file', fileBrowser.files[0]);
        }
        return input;
    };
    ViewleadComponent.prototype.SaveImage = function () {
        var _this = this;
        if (this.UploadimageForm.valid) {
            this.loadSave = true;
            var companySetupModel = this.prepareFormDataForDocument();
            this.dashboardService.addOrUpdateUploadFileOnAzzure(companySetupModel).subscribe(function (result) {
                setTimeout(function () {
                    if (result.statusCode == 200) {
                        _this.loadSave = false;
                        _this.toaster.success('image uploaded successfully');
                        _this.fileInput.nativeElement.value = "";
                        //// console.log("fileInput", this.fileInput.nativeElement.files);
                        _this.fileName = '';
                        _this.UploadimageForm.reset();
                        _this.getImages();
                    }
                    else {
                        _this.loadSave = false;
                        _this.toaster.error(result.responseMessage);
                    }
                }, 3000);
            }, function (error) {
            });
        }
        else {
            this.loadSave = false;
            this.commonService.validateAllFormFields(this.UploadimageForm);
        }
    };
    ViewleadComponent.prototype.getContactList = function () {
        var _this = this;
        this.leadservice.getContactList(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.contactpagedData = _this.leadservice.pagedData;
            // console.log('contactpagedData', this.contactpagedData);
        });
    };
    ViewleadComponent.prototype.showemailpopup = function () {
        this.emailModal.show();
    };
    ViewleadComponent.prototype.close = function () {
        this.emailModal.hide();
        this.AddNotesModal.hide();
        this.productModal.hide();
    };
    ViewleadComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.leadservice.GetProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.leadservice.pagedData;
            // console.log('pagedData', this.pagedData);
        });
    };
    ViewleadComponent.prototype.onChangeEmail = function ($event) {
        var _this = this;
        this.leadservice.getEmaillist(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.emailpagedData = _this.leadservice.pagedData;
            // console.log('emailpagedData', this.emailpagedData);
        });
    };
    ViewleadComponent.prototype.onChangeNotes = function ($event) {
        var _this = this;
        this.leadservice.getNoteslist(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            console.log('NotespagedData', _this.NotespagedData);
        });
    };
    ViewleadComponent.prototype.onChangeAssociateProduct = function ($event) {
        var _this = this;
        this.leadservice.GetAssociateProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.leadservice.pagedData;
            // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);
        });
    };
    ViewleadComponent.prototype.setPageContact = function ($event) {
        var _this = this;
        this.leadservice.getContactList(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeContact, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.contactpagedData = _this.leadservice.pagedData;
            // console.log('contactpagedData', this.contactpagedData);
        });
    };
    ViewleadComponent.prototype.onChangeContact = function () {
        var _this = this;
        this.leadservice.getContactList(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.contactpagedData = _this.leadservice.pagedData;
            // console.log('contactpagedData', this.contactpagedData);
        });
    };
    ViewleadComponent.prototype.getImages = function () {
        var _this = this;
        this.leadservice.getImages(this.leadid, this.submoduleid).subscribe(function (result) {
            _this.fileuplist = result;
            // console.log('fileuplist', result);
        });
    };
    ViewleadComponent.prototype.displayemaildetail = function (data) {
        this.emaildesc = data.description;
        // console.log('sasd', this.emaildesc);
        this.emaildetail.show();
    };
    ViewleadComponent.prototype.closeemaildesc = function () {
        this.emaildetail.hide();
    };
    ViewleadComponent.prototype.displaynotedetail = function (data) {
        this.notedesc = data.note_description;
        // console.log('notedesc', this.notedesc);
        this.notedetail.show();
    };
    ViewleadComponent.prototype.closenotedesc = function () {
        this.notedetail.hide();
    };
    ViewleadComponent.prototype.onChangetemp = function ($event) {
    };
    ViewleadComponent.prototype.onPaste = function ($event) {
    };
    ViewleadComponent.prototype.getcontactdll = function () {
        var _this = this;
        this.leadservice.GetContactDll(this.leadid, this.submoduleid, this.objectname).subscribe(function (result) {
            _this.contactlist = result;
            // console.log(' this.contactlist', this.contactlist);
        });
    };
    ViewleadComponent.prototype.GettemplatetDll = function () {
        var _this = this;
        this.leadservice.GettemplatetDll(this.objectname).subscribe(function (result) {
            _this.templatelist = result;
        });
    };
    ViewleadComponent.prototype.gettemplatelist = function (event) {
        var _this = this;
        // console.log('event', event);
        this.tempid = event.value;
        this.emailTemplateService.getEmailTemplateById(this.tempid).subscribe(function (result) {
            // console.log('tempaltedate', result)
            _this.EmailForm.patchValue({
                subject: result.emailTemplateSubject,
                emailDescription: result.template
            });
        });
    };
    ViewleadComponent.prototype.getconverttype = function () {
        var _this = this;
        this.configurationsettingService.GetLeadConfigurationDetails(this.companyid).subscribe(function (leadresult) {
            _this.isloanapp = leadresult.isLoanapplication;
            _this.isopportuinity = leadresult.isOpportunity;
            // console.log('leadresult', leadresult);
            // console.log('isopportuinity', this.isopportuinity);
            // console.log('isloanapp', this.isloanapp);
        });
    };
    ViewleadComponent.prototype.updateStatusdllopn = function () {
        this.statusdll = true;
    };
    ViewleadComponent.prototype.Deleteimage = function (Id) {
        var _this = this;
        var message = "Are you sure you want to delete Image?";
        this.dialogService.confirm('Delete Image', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.Deleteimage(Id).subscribe(function (r) {
                    _this.toaster.success("Image has been deleted successfully..");
                    _this.getImages();
                }, function (error) {
                });
            }
        });
    };
    Object.defineProperty(ViewleadComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ViewleadComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 0;
        this.loading = true;
        this.getNoteslist();
    };
    ViewleadComponent.prototype.getUsers = function () {
        var _this = this;
        this.commonService.getMasterItemsList("Users").subscribe(function (res) {
            _this.usersList = _this.commonService.masters;
            console.log('this.usersList', _this.usersList);
        });
    };
    ViewleadComponent.prototype.opencreatedby = function () {
        this.createddll = true;
    };
    ViewleadComponent.prototype.updatecreatedBy = function () {
        var _this = this;
        this.leadform.value.leadstatusddl = 'asds';
        if (this.leadform.controls.createdbyddl.valid) {
            this.leadservice.updatecreatedBy(this.leadform.value.createdbyddl, this.leadid).subscribe(function (result) {
                _this.toaster.success('Owner Name updated successfully');
                _this.createddll = false;
                _this.GetLeadAccountdata();
            });
        }
        else {
            this.commonService.validateAllFormFields(this.leadform);
        }
    };
    ViewleadComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"] },
        { type: _configurationsetting_configurationsetting_service__WEBPACK_IMPORTED_MODULE_11__["ConfigurationsettingService"] },
        { type: _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_9__["DashboardService"] },
        { type: _emailtemplate_emailtemplate_service__WEBPACK_IMPORTED_MODULE_10__["EmailTemplateService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _leadlist_service__WEBPACK_IMPORTED_MODULE_5__["LeadlistService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_13__["ScriptService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ViewleadComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileuploadddl', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_12__["NgSelectComponent"])
    ], ViewleadComponent.prototype, "fileuploadddl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", Object)
    ], ViewleadComponent.prototype, "fileInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('AddNotes', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalDirective"])
    ], ViewleadComponent.prototype, "AddNotesModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('product', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalDirective"])
    ], ViewleadComponent.prototype, "productModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('email', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalDirective"])
    ], ViewleadComponent.prototype, "emailModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('emaildetail', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalDirective"])
    ], ViewleadComponent.prototype, "emaildetail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('notedetail', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalDirective"])
    ], ViewleadComponent.prototype, "notedetail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"])
    ], ViewleadComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("myckeditor", { static: false }),
        __metadata("design:type", Object)
    ], ViewleadComponent.prototype, "ckeditor", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])('Onsaved'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ViewleadComponent.prototype, "hideEvent", void 0);
    ViewleadComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewlead',
            template: __importDefault(__webpack_require__(/*! raw-loader!./viewlead.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/viewlead.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./viewlead.component.scss */ "./src/app/views/lead/viewlead.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"],
            _configurationsetting_configurationsetting_service__WEBPACK_IMPORTED_MODULE_11__["ConfigurationsettingService"],
            _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_9__["DashboardService"],
            _emailtemplate_emailtemplate_service__WEBPACK_IMPORTED_MODULE_10__["EmailTemplateService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _leadlist_service__WEBPACK_IMPORTED_MODULE_5__["LeadlistService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"], _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_13__["ScriptService"]])
    ], ViewleadComponent);
    return ViewleadComponent;
}());



/***/ }),

/***/ "./src/app/views/lead/viewleadNew.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/lead/viewleadNew.component.ts ***!
  \*****************************************************/
/*! exports provided: ViewleadNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewleadNewComponent", function() { return ViewleadNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _leadlist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _lead_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lead.service */ "./src/app/views/lead/lead.service.ts");
/* harmony import */ var _leadconvertpopup_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./leadconvertpopup.component */ "./src/app/views/lead/leadconvertpopup.component.ts");
/* harmony import */ var _calendar_makeappointment_makeappointment_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../calendar/makeappointment/makeappointment.component */ "./src/app/views/calendar/makeappointment/makeappointment.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/new-notes/newnoteslist.component */ "./src/app/views/shared/new-notes/newnoteslist.component.ts");
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













var ViewleadNewComponent = /** @class */ (function () {
    function ViewleadNewComponent(dialogService, leadService, commonService, fb, router, toaster, route, leadservice, location) {
        var _this = this;
        this.dialogService = dialogService;
        this.leadService = leadService;
        this.commonService = commonService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.leadservice = leadservice;
        this.location = location;
        this.notemodel = new _leadlist_service__WEBPACK_IMPORTED_MODULE_5__["noteModel"]();
        this.is_converted = false;
        this.moduleName = 'crm';
        this.submoduleName = 'lead';
        this.ownerId = '';
        this.formControlList = [];
        this.loadSave = false;
        this.displayType = 'VIEW';
        this.LeadFirstName = '';
        this.LeadLastName = '';
        this.submoduleid = 10;
        this.objectname = 'Lead';
        this.sortDir = 'desc';
        this.sortColumn = 'createdon';
        this.islead = true;
        this.accountId = 0;
        this.pageSizeValuenotes = 4;
        this.isEdit = false;
        this.LeadSMSCount = 0;
        this.pageSizeValueLeadSMSList = 4;
        this.lstLeadSMS = {
            pager: {},
            data: []
        };
        this.NotespagedData = {
            pager: {},
            data: []
        };
        this.lstFiles = {
            pager: {},
            data: []
        };
        this.NotesCount = 0;
        this.filePageNo = 1;
        this.pageSize = 4;
        this.solgenpower = false;
        this.contactpagedData = {
            pager: {},
            data: []
        };
        this.isViewNote = false;
        this.unqualifiedStage = false;
        this.siteurl = '';
        this.categoryId = '';
        this.checkboxdata1 = [];
        this.checkboxdataTop = [];
        //=============================================================================
        this.addNoteForm = this.fb.group({
            note_id: [null],
            noteTitle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            noteDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyType = userdetail.companyType;
            if (_this.companyType == "companytypeSolarInstall") {
                _this.solgenpower = true;
            }
        });
    }
    ViewleadNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.siteurl = window.location.origin;
        console.log('siteurl', this.siteurl);
        this.loadSave = true;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.Id = id;
            _this.leadId = id;
            localStorage.setItem('leadId', _this.leadId);
        });
        this.GetCustomFieldsList();
        this.currentPageNotes = 1;
        this.pageSizeValueContact = 0;
        this.currentPageLeadSMS = 1;
        this.pageSizeValueLeadSMSList = 4;
        this.pageSizeValueContact = 4;
        this.getNoteslist();
        this.GetLeadSMSList();
        this.GetLeadAccountdata();
        this.getContactList();
    };
    ViewleadNewComponent.prototype.addItem = function (newItem) {
        if (newItem) {
            this.GetCustomFieldsList();
        }
    };
    ViewleadNewComponent.prototype.showConvert = function (Item) {
        if (Item == 'SHOW') {
            this.leadconvert.show(this.Id);
        }
    };
    ViewleadNewComponent.prototype.close = function () {
        this.router.navigateByUrl("/lead");
    };
    //==============================================Note Section================================================================
    ViewleadNewComponent.prototype.AddNotes = function () {
        this.isViewNote = false;
        this.title = "Add Notes";
        this.addNewNotesPopupModel.show(this.leadId);
        //this.addNotesPopupModel.show();
    };
    Object.defineProperty(ViewleadNewComponent.prototype, "note_id", {
        //========================Getting Note Form Value=============================
        get: function () { return this.addNoteForm.get('note_id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadNewComponent.prototype, "noteTitle", {
        get: function () { return this.addNoteForm.get('noteTitle'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewleadNewComponent.prototype, "noteDescription", {
        get: function () { return this.addNoteForm.get('noteDescription'); },
        enumerable: true,
        configurable: true
    });
    ViewleadNewComponent.prototype.SaveNote = function () {
        var _this = this;
        this.loadSave = true;
        if (this.addNoteForm.valid) {
            this.notemodel.note_id = this.addNoteForm.value.note_id;
            this.notemodel.note_name = this.addNoteForm.value.noteTitle;
            this.notemodel.note_description = this.addNoteForm.value.noteDescription;
            this.notemodel.object_name = this.objectname;
            this.notemodel.object_ref_id = this.Id;
            this.notemodel.object_id = this.submoduleid;
            this.leadservice.saveNotes(this.notemodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    //setTimeout(() => {  console.log('notes') }, 3000);
                    _this.loadSave = false;
                    _this.toaster.success(result.responseMessage);
                    _this.addNoteForm.reset();
                    _this.currentPageNotes = 1;
                    _this.getNoteslist();
                    _this.addNotesPopupModel.hide();
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                    _this.currentPageNotes = 1;
                    _this.getNoteslist();
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addNoteForm);
            this.loadSave = false;
        }
    };
    ViewleadNewComponent.prototype.getNoteslist = function () {
        var _this = this;
        this.loadSave = true;
        this.leadservice.getNoteslist(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            if (_this.NotespagedData.data.length <= 0) {
                _this.currentPageNotes = _this.currentPageNotes - 1;
                _this.getNoteslist();
            }
            _this.datalentgh = _this.NotespagedData.data.length;
            _this.NotesCount = _this.leadservice.pagedData.pager.totalItems;
            _this.offset = _this.currentPageNotes;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    ViewleadNewComponent.prototype.closeNotesPopupModelPopup = function () {
        this.addNotesPopupModel.hide();
        this.addNoteForm.reset();
    };
    ViewleadNewComponent.prototype.setNotesPageNo = function ($event) {
        this.loadSave = true;
        this.currentPageNotes = $event.page;
        this.getNoteslist();
    };
    ViewleadNewComponent.prototype.setPageNotes = function ($event) {
        this.loadSave = true;
        this.currentPageNotes = $event.page;
        this.getNoteslist();
        // this.currentPageNotes = $event.page;
    };
    ViewleadNewComponent.prototype.onSortNotes = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPageNotes = 1;
        //this.loadSave = true;
        this.getNoteslist();
    };
    Object.defineProperty(ViewleadNewComponent.prototype, "curPageNotes", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ViewleadNewComponent.prototype.EditNotes = function (row) {
        this.isViewNote = false;
        this.title = "Edit Note";
        this.isEdit = true;
        this.addNoteForm.patchValue({
            note_id: row.note_id,
            noteTitle: row.note_name,
            noteDescription: row.note_description,
        });
        this.addNotesPopupModel.show();
    };
    ViewleadNewComponent.prototype.DeleteNote = function (row) {
        var _this = this;
        debugger;
        var message = "Are you sure you want to delete Note?";
        this.dialogService.confirm('Delete Note', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.DeleteRecords(row.note_id, 'tblNotes').subscribe(function (res) {
                    _this.toaster.success("Note has been deleted successfully.");
                    _this.getNoteslist();
                });
            }
        });
    };
    //===========================================================================================
    ViewleadNewComponent.prototype.GetLeadSMSList = function () {
        var _this = this;
        this.leadservice.getLeadSMSlist(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageLeadSMS, this.pageSizeValueLeadSMSList, '')
            .subscribe(function (resp) {
            _this.lstLeadSMS = _this.leadservice.pagedData;
            _this.LeadSMSCount = _this.leadservice.pagedData.pager.totalItems;
            _this.offset = _this.currentPageLeadSMS;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    ViewleadNewComponent.prototype.setLeadSMSPageNo = function ($event) {
        this.loadSave = true;
        this.currentPageLeadSMS = $event.page - 1;
        this.GetLeadSMSList();
    };
    ViewleadNewComponent.prototype.setPageLeadSMSList = function ($event) {
        this.loadSave = true;
        this.currentPageLeadSMS = $event.page - 1;
        this.GetLeadSMSList();
    };
    ViewleadNewComponent.prototype.onSortLeadSMSList = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPageLeadSMS = 1;
        this.GetLeadSMSList();
    };
    Object.defineProperty(ViewleadNewComponent.prototype, "curPageLeadSMSList", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ViewleadNewComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        this.formControlList = [];
        this.displayType = 'VIEW';
        this.leadService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.leadService.customFieldsList.data;
                var unqualifiedStatus = void 0;
                var val = void 0;
                unqualifiedStatus = _this.customCompnentValues.filter(function (item) { return item.name == 'StatusName'; });
                val = unqualifiedStatus[0].value;
                if (typeof val != 'undefined' && val != null) {
                    val = val.split(':', 1);
                    if (val == 'Unqualified') {
                        _this.unqualifiedStage = true;
                    }
                }
                console.log('unqualifiedStatus:', unqualifiedStatus);
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _lead_service__WEBPACK_IMPORTED_MODULE_8__["CheckboxData"]();
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
                    //else if (cnt.dt_code == 'datetime') {
                    //  if (cnt.value) {
                    //    try {
                    //      cnt.value = (cnt.value == '' ? null : new Date(cnt.value + 'Z'));
                    //    }
                    //    catch (e) {
                    //      console.log(e);
                    //    }
                    //  }
                    //}
                    //else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
                    //  if (cnt.value == "") {
                    //    val = null;
                    //  } else {
                    //    let val1 = new Date(cnt.value);
                    //    val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
                    //  }
                    //}  
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
                    if (cnt.ColumnName == 'OwnerName') {
                        debugger;
                        _this.ownerId = cnt.ref_value;
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
    ViewleadNewComponent.prototype.GetCustomFieldsListTopRow = function () {
        var _this = this;
        this.loadSave = true;
        this.displayType = 'VIEW_TOP';
        this.leadService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValuesTop = _this.leadService.customFieldsList.data;
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
                    if (cnt.ColumnName == 'FirstName') {
                        _this.LeadFirstName = cnt.value;
                    }
                    if (cnt.ColumnName == 'LastName') {
                        _this.LeadLastName = cnt.value;
                    }
                    if (cnt.ColumnName == 'OwnerName') {
                        debugger;
                        _this.ownerId = cnt.ref_value;
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
    ViewleadNewComponent.prototype.showpopup = function () {
        this.leadconvert.show(this.Id);
    };
    ViewleadNewComponent.prototype.GetLeadAccountdata = function () {
        var _this = this;
        this.leadservice.GetLeadAccountdata(this.Id, this.submoduleid, this.objectname).subscribe(function (result) {
            _this.is_converted = result[0].is_Converted;
        });
    };
    ViewleadNewComponent.prototype.getContactList = function () {
        var _this = this;
        this.leadservice.getContactList(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValueContact, null).subscribe(function (response) {
            _this.contactpagedData = _this.leadservice.pagedData;
        });
    };
    ViewleadNewComponent.prototype.setPageContact = function ($event) {
        var _this = this;
        this.leadservice.getContactList(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeContact, this.pageSizeValueContact, null).subscribe(function (response) {
            _this.contactpagedData = _this.leadservice.pagedData;
        });
    };
    ViewleadNewComponent.prototype.onChangeContact = function () {
        var _this = this;
        this.leadservice.getContactList(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValueContact, null).subscribe(function (response) {
            _this.contactpagedData = _this.leadservice.pagedData;
        });
    };
    ViewleadNewComponent.prototype.AddContact = function () {
        this.addContact.show();
    };
    ViewleadNewComponent.prototype.closeContact = function () {
        this.addContact.hide();
    };
    ViewleadNewComponent.prototype.contactmsg = function (e) {
        this.getContactList();
        this.closeContact();
    };
    ViewleadNewComponent.prototype.DeleteContact = function (Id) {
        var _this = this;
        var message = "Are you sure you want to delete Contact?";
        this.dialogService.confirm('Delete Note', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.DeleteContact(Id, _this.Id, _this.submoduleid, _this.objectname).subscribe(function (r) {
                    _this.toaster.success("Note has been deleted successfully..");
                    _this.getContactList();
                }, function (error) {
                });
            }
        });
    };
    ViewleadNewComponent.prototype.getListingColorCode = function (fieldValue) {
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        return this.lstListingColorCode;
    };
    ViewleadNewComponent.prototype.makeAppointment = function () {
        this.makeappointment.showComponent('Lead');
    };
    ViewleadNewComponent.prototype.ViewNotes = function (row) {
        this.isViewNote = true;
        this.notesTitle = row.note_name;
        this.notesDescription = row.note_description;
        this.addNotesPopupModel.show();
    };
    ViewleadNewComponent.prototype.onSort = function (e) {
    };
    ViewleadNewComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    ViewleadNewComponent.prototype.addItems = function (newItem) {
        this.NotesCount = newItem;
    };
    ViewleadNewComponent.ctorParameters = function () { return [
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _lead_service__WEBPACK_IMPORTED_MODULE_8__["LeadService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _leadlist_service__WEBPACK_IMPORTED_MODULE_5__["LeadlistService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_11__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('NotesPopupModel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewleadNewComponent.prototype, "addNotesPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('listnotesmodel', { static: false }),
        __metadata("design:type", _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_12__["NewnoteslistComponent"])
    ], ViewleadNewComponent.prototype, "addNewNotesPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('makeappointment', { static: false }),
        __metadata("design:type", _calendar_makeappointment_makeappointment_component__WEBPACK_IMPORTED_MODULE_10__["MakeappointmentComponent"])
    ], ViewleadNewComponent.prototype, "makeappointment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addContact', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewleadNewComponent.prototype, "addContact", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ViewleadNewComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('leadconvert', { static: false }),
        __metadata("design:type", _leadconvertpopup_component__WEBPACK_IMPORTED_MODULE_9__["LeadconvertpopupComponent"])
    ], ViewleadNewComponent.prototype, "leadconvert", void 0);
    ViewleadNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewleadNew',
            template: __importDefault(__webpack_require__(/*! raw-loader!./viewleadNew.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/lead/viewleadNew.component.html")).default
        }),
        __metadata("design:paramtypes", [_shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _lead_service__WEBPACK_IMPORTED_MODULE_8__["LeadService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _leadlist_service__WEBPACK_IMPORTED_MODULE_5__["LeadlistService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_11__["Location"]])
    ], ViewleadNewComponent);
    return ViewleadNewComponent;
}());



/***/ })

}]);
//# sourceMappingURL=default~views-lead-lead-module~views-solgencontactlist-solgencontactlist-module.js.map