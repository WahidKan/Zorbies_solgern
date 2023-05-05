(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-servicesappointment-servicesappointment-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/addeditservicesappointment.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/addeditservicesappointment.component.html ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/serviceappointment\">Manage Service Appointment</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList;let i=index\">\r\n        <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row mb-2\">\r\n\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'\" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">\r\n\r\n                <!--text  [placeholder]=\"inner.display_name\"-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty\r\n                                              || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required\r\n                                              || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio'\r\n                                     && inner.dt_code!='boolean' && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox'\r\n                                     && inner.dt_code !='date'   && inner.dt_code !='int'    && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='datetime' && inner.name != 'Address' \" />\r\n\r\n                <!--============================== For int   ===========================-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid\r\n                                   && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched)\r\n                                   && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int' && inner.name!= 'Address'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched && form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid Numeric value</small>\r\n                <!--=======================================================================-->\r\n                <!--<small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty)\r\n  || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n  class=\"text-danger\">{{inner.display_name}} is required</small>-->\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n\r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'map'\">\r\n                  <div [innerHTML]=\"inner.value\"></div>\r\n                </div>\r\n\r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'map_search'\">\r\n                  <a (click)=\"mapPopUP()\" href=\"javascript:void(0);\" class=\"btn btn-info\"><i class=\"fa fa-search mr-2\"></i> Search Location</a>\r\n                </div>\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n                <!--============================== For Date   ===========================-->\r\n\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'date' && inner.dependent_on == null\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" ></p-calendar>\r\n\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'datetime' && inner.dependent_on == null\" [formControlName]=\"inner.form_controlName\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                            [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n               \r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"(inner.dt_code == 'date' || inner.dt_code == 'datetime') && inner.dependent_on != null\" [formControlName]=\"inner.form_controlName\"\r\n                            [hourFormat]=\"(inner.dt_code == 'datetime')?((timeFormat==24)?'24':'12'):null\" inputId=\"timeonly{{inner.custom_field_id}}\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" (onSelect)=\"onDateTimeChange($event,inner)\"\r\n                            [showTime]=\"(inner.dt_code == 'datetime')?true:false\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\" ></p-calendar>\r\n\r\n\r\n                <!--=====================================================================-->\r\n                <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n  [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                <!--end calandar-->\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <!--============================== For Boolean (Toggle Button) ===========================-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean' && inner.ColumnName !='Active_Contract'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\">\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <!--============================================================================-->\r\n                <!--============================== For Boolean (Disable Toggle Button) ===========================-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean' && inner.ColumnName=='Active_Contract'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <!--============================================================================-->\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n\r\n\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--Ng Dropdown-->\r\n\r\n                <ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                           [ngClass]=\"{'disabledddl':inner.is_readOnly}\" [searchable]=\"false\" [clearable]=\"false\"\r\n                           [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (clear)=\"onClearLang(item.InnerData,j)\"\r\n                           (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code!=null && !inner.is_readOnly\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code==null && !inner.is_readOnly\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true' && !inner.is_readOnly\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <div class=\"clearfix\"></div>\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">\r\n                  <ng-container *ngIf=\"form.get(inner.form_controlName).errors == null\">{{inner.display_name}} is required</ng-container>\r\n                  <ng-container *ngIf=\"form.get(inner.form_controlName).errors != null\">{{form.get(inner.form_controlName).errors.DateValidation}}</ng-container>\r\n                </small>\r\n\r\n              </div>\r\n\r\n\r\n\r\n\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row  mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <!--<a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>-->\r\n\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n<!--<div class=\"modal fade show\" bsModal #mapLocation=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-xl modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Search Location</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closemapsearch()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow: auto; margin-bottom: 10px; max-height: 496px; overflow-x: hidden; line-height: 24px; font-size: 13px;\">\r\n        <div class=\"row mb-3\">\r\n          <div class=\"col-md-6 searchonmap\">\r\n            <input type=\"text\" class=\"form-control\" [(ngModel)]='address' (keydown.enter)=\"findLocation('')\" placeholder=\"Search Nearest Location\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" #search>\r\n            <button (click)=\"findLocation('')\" type=\"submit\" class=\"btn btn-success\"><i class=\"fa fa-search mr-2\"></i>Search</button>\r\n          </div>\r\n        </div>\r\n        <p-gmap [options]=\"options\" [overlays]=\"overlays\" [style]=\"{'width':'100%','height':'400px'}\"></p-gmap>\r\n\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>-->\r\n\r\n<div class=\"modal fade show\" bsModal #mapLocation=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-xl modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Search Location</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closemapsearch()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow: auto; margin-bottom: 10px; max-height: 496px; overflow-x: hidden; line-height: 24px; font-size: 13px;\">\r\n        <div class=\"row mb-3\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"pac-card\" id=\"pac-card\">\r\n\r\n              <div id=\"pac-container\" class=\"form-group\">\r\n                <input id=\"pac-input\" class=\"form-control\" type=\"text\" placeholder=\"Enter a location\" />\r\n              </div>\r\n            </div>\r\n            <div id=\"map\" class=\"d-none\"></div>\r\n          </div>\r\n        </div>\r\n        <!--<p-gmap [options]=\"options\" [overlays]=\"overlays\" [style]=\"{'width':'100%','height':'400px'}\"></p-gmap>-->\r\n\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/auditpopup/auditpopup.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/auditpopup/auditpopup.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #audit=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Audit Review</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeAudit()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px;\">\r\n        <div class=\"table-responsive no-padding mb-0\" style=\"max-height: 320px; overflow:auto !important;\">\r\n          <table class=\"table table-hover table-dynamic mb-0\" style=\"min-width:300px;\">\r\n            <thead>\r\n              <tr>\r\n                <th width=\"100\">Sr.No.</th>\r\n                <th>Name</th>\r\n                <th width=\"200\">Final Score</th>\r\n                <th width=\"150\">Is Excluded?</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let item of auditData; let auditIndex=index;\">\r\n                <td>{{item.RowNum}}</td>\r\n                <td>\r\n                  <a *ngIf=\"item.isExclude!=true\" href=\"javascript:void(0);\" (click)=\"auditChecklistDetail(item.id,item.ServiceAppointmentId,this.isDisabled)\">{{item.Name}}</a>\r\n                  <a *ngIf=\"item.isExclude==true\">{{item.Name}}</a>\r\n                </td>\r\n                <td>{{item.FinalScoreCount}}/{{item.QuestionCount}}</td>\r\n                <td>\r\n                  <div class=\"d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <input type=\"checkbox\" id={{item.id}} [checked]=\"item.isExclude\" [attr.disabled]=\"isDisabled ? true : null\" (click)=\"switchClicked($event,item.id,item.ServiceAppointmentId)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n        <tr *ngIf=\"auditData == null\">\r\n          <td colspan=\"3\" class=\"text-center\"><span class=\"text-center text-danger\">No data to display</span></td>\r\n        </tr>\r\n        </tbody>\r\n        </table>\r\n        <!--<div *ngFor=\"let item of auditData; let auditIndex=index;\">\r\n    <div class=\"col-md-12 step-default border p-2 mb-2 rounded\" *ngIf=\"auditIndex==0\">\r\n      <h6 class=\"m-0\">{{item.OverallScore}} <b>({{item.OverallScoreText}})</b></h6>\r\n    </div>\r\n  </div>-->\r\n      </div>\r\n        <div class=\"table-responsive no-padding mb-0\">\r\n          <table class=\"table table-hover table-dynamic mb-0\" style=\"min-width:300px;\">\r\n            <tr>\r\n              <td width=\"100\" class=\"border-0\"></td>\r\n              <td class=\"border-0\"></td>\r\n              <td width=\"200\" class=\"border-0\">\r\n                <span *ngFor=\"let items of auditData; let auditIndex=index;\">\r\n                  <span *ngIf=\"auditIndex==0 && items.OverallScoreText=='Pending'\" style=\"max-width:150px !important;\" class=\"status-box bg-warning text-dark p-2\">{{items.OverallScore}} <strong>({{items.OverallScoreText}})</strong></span>\r\n\r\n                  <span *ngIf=\"auditIndex==0 && items.OverallScoreText=='Fail'\" style=\"max-width:150px !important;\"\r\n                        class=\"status-box bg-danger p-2\">\r\n                    {{items.OverallScore}} <strong>({{items.OverallScoreText}})</strong>\r\n                  </span>\r\n\r\n                  <span *ngIf=\"auditIndex==0 && items.OverallScoreText=='Pass'\" style=\"max-width:150px !important;\"\r\n                        class=\"status-box bg-success p-2\">\r\n                    {{items.OverallScore}} <strong>({{items.OverallScoreText}})</strong>\r\n                  </span>\r\n                </span>\r\n              </td>\r\n            </tr>\r\n          </table>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"modal-footer\">\r\n\r\n          <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeAudit()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n        </div>\r\n        <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n\r\n      </div>\r\n  </div>\r\n</div>\r\n\r\n  <app-auditchecklistpopup #auditCheckList (buttonState)=\"show($event)\"></app-auditchecklistpopup>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/filterpopup/filterpopup.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/filterpopup/filterpopup.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #filterPopoup=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Filter</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:visible\">\r\n\r\n        <div class=\"clearfix\"></div>\r\n        <div class=\"panel-content px-3  no-padding\">\r\n          <form [formGroup]=\"filterPopoupForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n            <div class=\"row mb-2\">\r\n              <div class=\"col-md-12 col-lg-12 p-0\">\r\n                <h3 class=\"form-heading mt-0\"><span>Filter in Resource & Unscheduled Appointments List</span></h3>\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-12 col-lg-6\">\r\n                    <label>Warehouse:</label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"warehouseList\"\r\n                                 placeholder=\"Select Warehouse\" [loading]=\"loadSave\" formControlName=\"warehouse\"\r\n                                 [ngClass]=\"{'is-invalid': (warehouse.invalid && (warehouse.dirty || warehouse.touched) && warehouse.errors?.required)}\"\r\n                                 bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                      <small *ngIf=\"warehouse.invalid && (warehouse.dirty || warehouse.touched) && warehouse.errors?.required\"\r\n                             class=\"text-danger\">Warehouse is required</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 col-lg-6\">\r\n                    <label>WorkType:</label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"lstWorkType\" placeholder=\"Select worktype\" [loading]=\"loadSave\" formControlName=\"worktype\"\r\n                                 [ngClass]=\"{'is-invalid': (worktype.invalid && (worktype.dirty || worktype.touched) && worktype.errors?.required)}\"\r\n                                 bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                      <small *ngIf=\"worktype.invalid && (worktype.dirty || worktype.touched) && worktype.errors?.required\"\r\n                             class=\"text-danger\">WorkType is required</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 col-lg-6\">\r\n                    <label>Service Teritory:</label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"lstTeritory\" placeholder=\"Select Service Teritory\" [loading]=\"loadSave\" formControlName=\"serviceTeritory\"\r\n                                 [ngClass]=\"{'is-invalid': (serviceTeritory.invalid && (serviceTeritory.dirty || serviceTeritory.touched) && serviceTeritory.errors?.required)}\"\r\n                                 bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                      <small *ngIf=\"serviceTeritory.invalid && (serviceTeritory.dirty || serviceTeritory.touched) && serviceTeritory.errors?.required\"\r\n                             class=\"text-danger\">Service is required</small>\r\n                    </div>\r\n                  </div>\r\n                 \r\n\r\n                  \r\n                </div>\r\n                <h3 class=\"form-heading\"><span>Filter in Unscheduled Appointments List</span></h3>\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-12 col-lg-6\">\r\n                    <label>Category:</label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"lstWorkOrderCategory\" placeholder=\"Select Category\" [loading]=\"loadSave\" formControlName=\"category\"\r\n                                 [ngClass]=\"{'is-invalid': (category.invalid && (category.dirty || category.touched) && category.errors?.required)}\"\r\n                                 bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                      <small *ngIf=\"category.invalid && (category.dirty || category.touched) && category.errors?.required\"\r\n                             class=\"text-danger\">Department is required</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 col-lg-6\">\r\n                    <label>Account:</label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"lstaccountlist\" placeholder=\"Search for accounts\"\r\n                                 (clear)=\"onClearLangAccountDll(lstaccountlist)\"\r\n                                 (keyup)=\"onKeyAccountDll($event,lstaccountlist)\"\r\n                                 (scrollToEnd)=\"onScrollToEndAccountDll(lstaccountlist)\" [virtualScroll]=\"true\"\r\n                                 (change)=\"changeaccountddl($event)\"\r\n                                 formControlName=\"account\"\r\n                                 bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n\r\n                      <small *ngIf=\"account.invalid && (account.dirty || account.touched) && account.errors?.required\"\r\n                             class=\"text-danger\">Department is required</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 col-lg-6\">\r\n                    <label>Test Account:</label>\r\n                    <div class=\"form-group\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"testAccount\" formControlName=\"testAccount\">\r\n                        <span class=\"slider round\"><span>Yes</span></span>\r\n                      </label>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n\r\n                  </div>\r\n\r\n                <h3 class=\"form-heading\"><span>Filter in Service Resource</span></h3>\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-12 col-lg-6\">\r\n                    <label>Department:</label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"departmentList\" placeholder=\"Select Department\" [loading]=\"loadSave\" formControlName=\"department\" (change)=\"changeDept(department)\"\r\n                                 [ngClass]=\"{'is-invalid': (department.invalid && (department.dirty || department.touched) && department.errors?.required)}\"\r\n                                 bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                      <small *ngIf=\"department.invalid && (department.dirty || department.touched) && department.errors?.required\"\r\n                             class=\"text-danger\">Department is required</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 col-lg-6\">\r\n                    <label>Resource Name:</label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select #resourcedll [items]=\"resourceList\" (clear)=\"onClearLangresource(resourceList)\" (keyup)=\"onKeyresource($event,resourceList)\"\r\n                                 (scrollToEnd)=\"onScrollToEndresource(resourceList)\" [virtualScroll]=\"true\"\r\n                                 placeholder=\"Select Service Resource\" [loading]=\"loadSave\" formControlName=\"serviceResource\"\r\n                                 [ngClass]=\"{'is-invalid': (serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required)}\"\r\n                                 bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                      <small *ngIf=\"serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required\"\r\n                             class=\"text-danger\">Resource Name is required</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 col-lg-6\">\r\n                    <label>Crew Name:</label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"crewList\" (clear)=\"onClearLang(crewList)\" (keyup)=\"onKey($event,crewList)\"\r\n                                 (scrollToEnd)=\"onScrollToEnd(crewList)\" [virtualScroll]=\"true\"\r\n                                 placeholder=\"Select Service Crew\" [loading]=\"loadSave\" formControlName=\"serviceCrew\"\r\n                                 [ngClass]=\"{'is-invalid': (serviceCrew.invalid && (serviceCrew.dirty || serviceCrew.touched) && serviceCrew.errors?.required)}\"\r\n                                 bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                      <small *ngIf=\"serviceCrew.invalid && (serviceCrew.dirty || serviceCrew.touched) && serviceCrew.errors?.required\"\r\n                             class=\"text-danger\">Crew Name is required</small>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"submit()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-search text-white\"></i> Search</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/managequestionnaire/managequestionnaire-list.component.html":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/managequestionnaire/managequestionnaire-list.component.html ***!
  \*********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>QUESTIONN AIRE CHECKLIST</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">QUESTIONN AIRE CHECKLIST</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n<div class=\"panel\">\r\n  <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n    <div class=\"row mt-2\">\r\n      <div class=\"col-md-12 col-xl-8\">\r\n        <div class=\"row searchfield\">\r\n          <div class=\"col-lg-3 float-left mb-lg-0 mb-2\">\r\n            <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n          </div>\r\n          <div class=\"col-lg-6 float-left pl-3 pl-lg-0\">\r\n            <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"Search\" (click)=\"search()\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n            <a class=\"btn btn-danger form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"Reset\" (click)=\"reset()\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-md-12 col-xl-4\">\r\n        <div class=\"dt-buttons\">\r\n          <a class=\"btn btn-success mr-1\" tooltip=\"Add Questionnaire\" routerLink=\"/serviceappointment/managequestionnaire\"><i class=\"fa fa-plus\"></i> </a>  <!--*ngIf='isAdd'-->\r\n          <a class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" tooltip=\"Delete\" (click)=\"deleteAll()\"><span><i class=\"fa fa-trash\"></i> </span></a> <!--*ngIf='isDelete'-->\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n\r\n    <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                   [rows]=\"listingGridData.data\"\r\n                   [columnMode]=\"'force'\"\r\n                   [headerHeight]=\"40\"\r\n                   [footerHeight]=\"40\"\r\n                   [scrollbarH]=\"true\"\r\n                   [rowHeight]=\"'40'\"\r\n                   [externalPaging]=\"true\"\r\n                   [externalSorting]=\"true\"\r\n                   [loadingIndicator]=\"loadSave\"\r\n                   [count]=\"listingGridData.pager.totalItems\"\r\n                   [offset]=\"listingGridData.pager.curPage\"\r\n                   [limit]=\"listingGridData.pager.pageSize\"\r\n                   (page)='setPage($event)'\r\n                   (sort)=\"onSort($event)\"\r\n                   [selectionType]=\"SelectionType.checkbox\"\r\n                   [selectAllRowsOnPage]=\"false\"\r\n                   [selected]=\"selected\"\r\n                   (select)=\"onSelect($event)\">\r\n\r\n      <ngx-datatable-column [width]=\"42\"\r\n                            [sortable]=\"false\"\r\n                            [canAutoResize]=\"false\"\r\n                            [draggable]=\"false\"\r\n                            [resizeable]=\"false\"\r\n                            [headerCheckboxable]=\"true\"\r\n                            [checkboxable]=\"true\">\r\n      </ngx-datatable-column>\r\n\r\n      <ngx-datatable-column name=\"Name\" prop=\"name\" [sortable]=\"true\">\r\n        <!--<ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n      <a [routerLink]=\"['/user/edituser',row.Id]\">{{row.Name }}</a>\r\n    </ng-template>-->\r\n      </ngx-datatable-column>\r\n\r\n      <ngx-datatable-column name=\"Work Type\" prop=\"WorkType\" [sortable]=\"true\">\r\n      </ngx-datatable-column>\r\n      <ngx-datatable-column name=\"Check List Type\" prop=\"CheckListType\" [sortable]=\"true\">\r\n        <!--<ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n          <div title=\"Photo\" *ngIf=\"row.CheckListType==1\">\r\n            Photo\r\n          </div>\r\n          <div title=\"Questionnaire\" *ngIf=\"row.CheckListType==2\">\r\n            Questionnaire\r\n          </div>\r\n        </ng-template>-->\r\n      </ngx-datatable-column>\r\n      <ngx-datatable-column name=\"Question\" prop=\"Question\" [sortable]=\"true\"></ngx-datatable-column>\r\n      <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\">\r\n        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n          <div *ngIf=\"row.StatusId=='1001'\">\r\n            <span class=\"status-box bg-success\">{{row.Status}}</span>\r\n          </div>\r\n          <div *ngIf=\"row.StatusId!='1001'\">\r\n            <span class=\"status-box bg-danger\">{{row.Status}}</span>\r\n          </div>\r\n        </ng-template>\r\n      </ngx-datatable-column>\r\n      <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"align-center\" [maxWidth]=\"100\" headerClass=\"text-center\">\r\n        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n          <div class=\"text-center\">\r\n            <a [routerLink]=\"['/serviceappointment/managequestionnaire',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>  <!--*ngIf='isUpdate'-->\r\n            <a title=\"Click to delete.\" (click)=\"DeleteQuestionnaire(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a> <!--*ngIf='isDelete'-->\r\n          </div>\r\n        </ng-template>\r\n      </ngx-datatable-column>\r\n      <ngx-datatable-footer>\r\n        <ng-template ngx-datatable-footer-template\r\n                     let-rowCount=\"rowCount\"\r\n                     let-pageSize=\"pageSize\"\r\n                     let-selectedCount=\"selectedCount\"\r\n                     let-currentPage=\"curPage\"\r\n                     let-offset=\"offset\"\r\n                     let-isVisible=\"isVisible\">\r\n          <div>\r\n            <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n              <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange()\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                           bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n              </span>\r\n            </div>\r\n          </div>\r\n          <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n            {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n\r\n\r\n          </div>\r\n          <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                           [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                           [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                           [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                           [page]=\"curPage\"\r\n                           [size]=\"pageSizeValue\"\r\n                           [count]=\"listingGridData.pager.totalItems\"\r\n                           [hidden]=\"!((rowCount / pageSizeValue) > 1)\"\r\n                           (change)=\"setPage($event)\">\r\n          </datatable-pager>\r\n\r\n\r\n        </ng-template>\r\n      </ngx-datatable-footer>\r\n\r\n    </ngx-datatable>\r\n</div>\r\n\r\n\r\n</div>\r\n  </div>\r\n\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/managequestionnaire/managequestionnaire.component.html":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/managequestionnaire/managequestionnaire.component.html ***!
  \****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/serviceappointment/questionnairechecklist\">Manage Questionnaire</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    \r\n    <form autocomplete=\"off\" #questionnairForm=\"ngForm\" ngNativeValidate (ngSubmit)=\"onSubmit()\">\r\n      <h3 class=\"form-heading\"><span>{{displayCode}} Questionnaire</span></h3>\r\n      <div class=\"row  mb-2\">\r\n        <div class=\"col-sm-6 col-md-6\">\r\n          <label>Check List Name:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"questionnaire.checkListName\" #checkListName =\"ngModel\" required=\"required\" name=\"questionnaire.checkListName\"\r\n              [ngClass]=\"{'is-invalid': (checkListName.invalid && (checkListName.drty || checkListName.touched) && (checkListName.errors?.required || checkListName?.errors?.maxlength)) }\">\r\n\r\n            <small\r\n              *ngIf=\"checkListName.invalid && (checkListName.dirty || checkListName.touched) && (checkListName.errors?.required || checkListName?.errors?.maxlength)\"\r\n              class=\"text-danger\">check List Name is required.</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-sm-6 col-md-6\">\r\n          <label>Checklist Type:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"questionTypeList\" [disabled] = \"isEdit\" id=\"ddlQuestionType\" [(ngModel)]=\"questionnaire.questionType\" #questionType = \"ngModel\"\r\n             name=\"questionnaire.questionType\" (change)=\"getVisibleFieldsList()\"\r\n              placeholder=\"Select\" bindLabel=\"text\" bindValue=\"value\" required=\"required\"\r\n              [ngClass]=\"{'is-invalid': (questionType.invalid && (questionType.dirty || questionType.touched) && (questionType.errors?.required || questionType?.errors?.maxlength)) }\">\r\n            </ng-select>\r\n            <small *ngIf=\"questionType.invalid && (questionType.dirty || questionType.touched) && (questionType.errors?.required || questionType?.errors?.maxlength)\"\r\n                   class=\"text-danger\">Checklist Type is required.</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-sm-6 col-md-6\">\r\n          <label>Work Type:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"WorkTypeList\" id=\"ddlWorkTypes\" placeholder=\"Select\"\r\n              (clear)=\"onClearWorkType(WorkTypeList)\"  [(ngModel)]=\"questionnaire.workTypeId\" \r\n              #workTypeId = \"ngModel\" name=\"questionnaire.workTypeId\" required=\"required\" \r\n              (keyup)=\"onKeyWorkType($event,WorkTypeList)\" (scrollToEnd)=\"onScrollToEndWorkType(WorkTypeList)\" required=\"required\"\r\n              [virtualScroll]=\"true\" bindLabel=\"text\" bindValue=\"value\"\r\n              [ngClass]=\"{'is-invalid': (workTypeId.invalid && (workTypeId.dirty || workTypeId.touched) && (workTypeId.errors?.required || workTypeId?.errors?.maxlength)) }\">\r\n            </ng-select>\r\n            <small\r\n              *ngIf=\"workTypeId.invalid && (workTypeId.dirty || workTypeId.touched) && (workTypeId.errors?.required || workTypeId?.errors?.maxlength)\"\r\n              class=\"text-danger\">Work Type is required.</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-sm-6 col-md-6\">\r\n          <label>Status:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"statusList\" id=\"ddlStatus\" [(ngModel)]=\"questionnaire.statusId\" #statusId = \"ngModel\" name=\"questionnaire.statusId\" placeholder=\"Select\"\r\n              bindLabel=\"text\" bindValue=\"value\" required=\"required\"\r\n              [ngClass]=\"{'is-invalid': (statusId.invalid && (statusId.dirty || statusId.touched) && (statusId.errors?.required || statusId?.errors?.maxlength)) }\">\r\n            </ng-select>\r\n            <small\r\n              *ngIf=\"statusId.invalid && (statusId.dirty || statusId.touched) && (statusId.errors?.required || statusId?.errors?.maxlength)\"\r\n              class=\"text-danger\">Status is required.</small>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div class=\"row mb-2\">\r\n        <div class=\"col-sm-7 col-md-7\">\r\n          <h3 class=\"form-heading\"><span>Resource View</span></h3>\r\n          <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n              <button type=\"button\" href=\"javascript:;void(0);\" (click)=\"addSection()\" class=\"btn btn-success mb-2\"><i\r\n                  class=\"fa fa-file-text pl-2\"></i> Add Section</button>\r\n              <div class=\"w-100\">\r\n                <!--<h3 class=\"side_panel-heading\"> Select New Field</h3>-->\r\n                <div class=\"bordered-content ques-checklist\">\r\n                  <ul class=\"types columnlist list-group custom-field-layout custom-field-layout-left-panel mb-3\">\r\n                    <li class=\"list-group-item selected\" id=\"1\" code=\"string\" maxlength=\"100\" *ngFor=\"let row of colors\"\r\n                      pDraggable=\"row\" (onDragStart)=\"dragStart($event,row)\" (onDragEnd)=\"dragEnd($event)\">\r\n                      <a href=\"javascript:void(0);\">\r\n                        <i class=\"{{row.class_name}}\"></i>\r\n                        <span>\r\n                          {{row.name}}\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                  </ul>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"questionaire-box overflowy-checklist col-md-8\">\r\n              <div class=\"q-no-data text-center align-middle\"\r\n                *ngIf=\"questionnaire.mainSection == null || questionnaire.mainSection <1\">\r\n                <i class=\"fa fa-file fs-70\"></i>\r\n                <p>Add Questionnaire</p>\r\n              </div>\r\n              <div *ngFor=\"let main of questionnaire.mainSection; let ix=index\">\r\n                <div class=\"sectionmain mb-3\" *ngIf=\"main.statusId != '1003'\">\r\n                <div class=\"sectionnumber\">{{main.sectionIndex}}</div>\r\n                <div class=\"Xs\">\r\n                  <label>Section Name: <span class=\"text-danger\">*</span></label>\r\n                  <div class=\"input-group mb-3\">\r\n                    <input type=\"text\" class=\"form-control\" (ngModelChange)=\"valuechange($event,main)\" required=\"required\" [(ngModel)]=\"main.SectionName\" name=\"main.SectionName_{{ix}}\" #SectionName=\"ngModel\">\r\n                    <div class=\"input-group-append\">\r\n                      <span class=\"input-group-text bg-danger border-0\">\r\n                        <a (click)=\"removeSection(ix)\" class=\"text-white p-0 cursor-pointer\">\r\n                          <i class=\"fa fa-trash p-0\" title=\"Delete\"></i>\r\n                        </a>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                  <!-- <p class=\"text-danger\" style=\"color:red;\">{{ formErrors.mainSection[ix].SectionName }}</p> -->\r\n                  <p class=\"text-danger\" style=\"color:red;\"></p>\r\n                  {{sectionDrag}}\r\n                  <div class=\"\" dnd-sortable-container [sortableData]=\"main.mainSubSection\" [dropZones]=\"['container-dropZone']\" >\r\n                    <div *ngFor=\"let qAndSub of main.mainSubSection; let iy=index; \" [dragEnabled]=\"sectionDrag\" (mouseover) = \"changeDragSatus($event,'Section')\"\r\n                      dnd-sortable [sortableIndex]=\"iy\" (onDropSuccess)=\"onDropSuccess($event,qAndSub.question,iy,'Question')\">\r\n                      <div *ngIf=\"qAndSub.sectionType == 'subSection' && qAndSub.statusId != '1003'\" class=\"Ys mb-2 pb-2 sub-section\">\r\n                        <label>Sub Section Name: <span class=\"text-danger\">*</span> </label>\r\n                        <div class=\"float-right d-flex\">\r\n                          <a class=\"fw-600\" [class.disabled]=\"subSectionName.invalid\" href=\"javascript:void(0);\" (click)=\"!subSectionName.invalid && addSubSectionQuestion(ix,iy)\"><i\r\n                              class=\"fa fa-plus align-middle fw-600\"></i>Question</a>\r\n                          <div class=\"clr-gray ml-2 mt-1\" dnd-sortable-container [dropZones]=\"['container-dropZone']\" [sortableData]=\"main.mainSubSection\">\r\n                            <i class=\"fa fa-th\" aria-hidden=\"true\" tooltip=\"Grab to drag\"></i>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"input-group mb-3\">\r\n                          <input type=\"text\" class=\"form-control\" required=\"required\" (ngModelChange)=\"valuechange($event,qAndSub)\" #subSectionName=\"ngModel\" [(ngModel)]=\"qAndSub.subSectionName\" name=\"qAndSub.subSectionName_{{iy}}\" />\r\n                          <div class=\"input-group-append\">\r\n                            <span class=\"input-group-text bg-danger border-0\">\r\n                              <a (click)=\"removeSubSection(ix,iy)\" class=\"text-white p-0 cursor-pointer\">\r\n                                <i class=\"fa fa-trash p-0\" title=\"Delete\"></i>\r\n                              </a>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <!-- <p class=\"text-danger\" style=\"color:red;\">{{\r\n                          formErrors.mainSection[ix].mainSubSection[iy].Subsection }}</p> -->\r\n                          {{subSectionDrag}}\r\n                        <p class=\"text-danger\" style=\"color:red;\"></p>\r\n                        <div class=\"qans\" dnd-sortable-container [sortableData]=\"qAndSub.SubSectionQuestionAns\" [dropZones]=\"['sub-dropZone']\"  >\r\n                          <div *ngFor=\"let question of qAndSub.SubSectionQuestionAns; let iz=index\" dnd-sortable [sortableIndex]=\"iz\" [dragEnabled]=\"subSectionDrag\" (mouseover)=\"changeDragSatus($event,'SubSection')\" (onDropSuccess)=\"onDropSuccess($event,question,iz,'SubQuestion')\" class=\"qansmain\">\r\n                            <div class=\"Zs\" *ngIf=\"question.statusId != '1003'\">\r\n                              <div class=\"drop\" pDroppable=\"row\" (onDrop)=\"drop($event,ix,iy,iz,'notquestion')\" style=\"min-height:40px;\">\r\n                                <div class=\"w-100 qst-panel\">\r\n                                  <label class=\"text-capitalize w-100\">\r\n                                    {{question.display_name}} <span *ngIf=\"question.is_required\"\r\n                                      class=\"text-danger\">*</span><span class=\"d-inline-block float-right\"\r\n                                      *ngIf=\"question.field_type!='' && question.field_type!=null\">\r\n                                      <a href=\"javascript:void(0);\" (click)=\"show(question,ix,iy,iz,'1011')\"><i\r\n                                          class=\"fa fa-ellipsis-h text-secondary float-right\"></i></a>\r\n                                    </span>\r\n                                    <!-- {{ix}} {{iy}} {{iz}} -->\r\n                                  </label>\r\n                                  <div class=\"input-group mb-3\">\r\n\r\n                                    <ng-container *ngIf=\"question.isDirty;else elseblock;\">\r\n                                      <!--for input value and field type text-->\r\n                                      <input *ngIf=\"question.field_type=='textbox'\" id=\"input_{{iz}}\"\r\n                                        name=\"input_{{iz}}\" class=\"form-control\" type=\"text\"\r\n                                        placeholder=\"{{question.is_system_generated ==false ? question.name : question.display_name}}\" />\r\n                                      <input *ngIf=\"question.field_type=='text'\" id=\"input_{{iz}}\" name=\"input_{{iz}}\"\r\n                                        class=\"form-control\" type=\"text\" \r\n                                        placeholder=\"{{question.is_system_generated ==false ? question.name : question.display_name}}\" />\r\n\r\n                                      <!--for input value and field type textarea-->\r\n                                      <textarea *ngIf=\"question.field_type=='textarea'\" class=\"form-control\" rows=\"4\" \r\n                                        id=\"textarea_{{iz}}\" name=\"textarea_{{iz}}\"\r\n                                        placeholder=\"{{question.is_system_generated ==false ? question.name : question.display_name}}\"></textarea>\r\n\r\n\r\n                                      <!--for input value and field type date-->\r\n                                      <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" \r\n                                        inputStyleClass=\"form-control start-date \" *ngIf=\"question.field_type=='date'\"\r\n                                        hideOnDateTimeSelect=\"true\" inputId=\"cald_{{iz}}\" dateFormat=\"mm/dd/yy\"\r\n                                        showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\"\r\n                                        yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                                      <!--for input value and field type datetime-->\r\n                                      <p-calendar [showIcon]=\"true\" class=\"calendarwidth\"\r\n                                        inputStyleClass=\"form-control start-date \"\r\n                                        *ngIf=\"question.field_type=='datetime'\"\r\n                                        [hourFormat]=\"(timeFormat==24)?'24':'12'\" hideOnDateTimeSelect=\"true\"\r\n                                        [showTime]=\"true\" inputId=\"caldt_{{iz}}\" dateFormat=\"mm/dd/yy\"\r\n                                        showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\"\r\n                                        yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                                      <!--for input value and field type number-->\r\n                                      <input *ngIf=\"question.field_type=='number' \" min=\"0\" value=\"0\" step=\"0.01\" \r\n                                        id=\"input_1{{iz}}\" name=\"input_1{{iz}}\" class=\"form-control\" type=\"number\"\r\n                                        placeholder=\"{{question.is_system_generated ==false ? question.name : question.display_name}}\" />\r\n\r\n                                      <input *ngIf=\"question.field_type=='int' \" min=\"0\" value=\"0\" step=\"0.01\" \r\n                                        id=\"input_{{iz}}\" name=\"input_{{iz}}\" class=\"form-control\" type=\"number\"\r\n                                        placeholder=\"{{question.is_system_generated ==false ? question.name : question.display_name}}\" />\r\n\r\n                                        <input *ngIf=\"question.field_type=='bigint' \" min=\"0\" value=\"0\" step=\"1\" \r\n                                        id=\"input_{{iz}}\" name=\"input_{{iz}}\" class=\"form-control\" type=\"number\"\r\n                                        placeholder=\"{{question.is_system_generated ==false ? question.name : question.display_name}}\" />\r\n\r\n\r\n                                      <!--for input value and field type number-->\r\n                                      <input *ngIf=\"question.field_type=='decimal'\" pattern=\"^\\d*(\\.\\d{0,2})?$\" min=\"0\"\r\n                                        value=\"0\" step=\"0.01\" id=\"input_{{iz}}\" name=\"input_{{iz}}\" class=\"form-control\"\r\n                                        type=\"number\"\r\n                                        placeholder=\"{{question.is_system_generated ==false ? question.name : question.display_name}}\" />\r\n\r\n\r\n                                      <!--for input value and field type dropdown-->\r\n                                      <ng-container *ngIf=\"question.field_type=='dropdown'\">\r\n\r\n                                        <div class=\"clearfix\"></div>\r\n                                        <ng-select id=\"ddl_{{iz}}\" [items]=\"question.selectlistvalues\" bindLabel=\"value\"\r\n                                          bindValue=\"id\"\r\n                                          placeholder=\"{{question.is_system_generated ==false ? question.name : question.display_name}}\">\r\n                                          <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\r\n                                            <span>{{item.value}} <span *ngIf=\"item.color!=''\"><span\r\n                                                  [style.background-color]=\"item.color\"></span>\r\n                                                {{item.color}}</span></span>\r\n                                          </ng-template>\r\n                                        </ng-select>\r\n                                      </ng-container>\r\n                                      <ng-container *ngIf=\"question.field_type=='select'\">\r\n\r\n                                        <div class=\"clearfix\"></div>\r\n                                        <ng-select id=\"ddl_{{iz}}\" [items]=\"question.selectlistvalues\" bindLabel=\"value\"\r\n                                          bindValue=\"id\"\r\n                                          placeholder=\"{{question.is_system_generated ==false ? question.name : question.display_name}}\">\r\n                                          <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\r\n                                            <span>{{item.value}}\r\n                                              <span *ngIf=\"item.color!=''\">\r\n                                                <span [style.background-color]=\"item.color\"></span>\r\n                                                {{item.color}}\r\n                                              </span>\r\n                                            </span>\r\n                                          </ng-template>\r\n                                        </ng-select>\r\n                                      </ng-container>\r\n\r\n                                      <!--for input value and field type radio-->\r\n                                      <ng-container *ngIf=\"question.field_type=='radioButton'\">\r\n                                        <div class=\"clearfix\"></div>\r\n                                        <ng-container *ngIf=\"question.picklist_options\">\r\n                                          <ng-container\r\n                                            *ngFor=\"let item of question.picklist_options.split(',');let radioIndex=index;\">\r\n                                            <span class=\"mr-3\">\r\n                                              <input id=\"radio-{{iz}}_{{iz}}_{{radioIndex}}\" name=\"radio-{{iz}}_{{iz}}\"\r\n                                                [value]=\"\" type=\"radio\" class=\"mr-15\">\r\n                                              <label for=\"radio-{{iz}}_{{iz}}_{{radioIndex}}\"\r\n                                                class=\"radio-label mr-15\">{{item}}</label>\r\n                                            </span>\r\n                                          </ng-container>\r\n                                        </ng-container>\r\n                                      </ng-container>\r\n                                      <ng-container *ngIf=\"question.field_type=='radio'\">\r\n                                        <div class=\"clearfix\"></div>\r\n                                        <ng-container *ngIf=\"question.picklist_options\">\r\n                                          <ng-container\r\n                                            *ngFor=\"let item of question.picklist_options.split(',');let radioIndex=index;\">\r\n                                            <span class=\"mr-3\">\r\n                                              <input id=\"radio-{{iz}}_{{iz}}_{{radioIndex}}\" name=\"radio-{{iz}}_{{iz}}\"\r\n                                                [value]=\"\" type=\"radio\" class=\"mr-15\">\r\n                                              <label for=\"radio-{{iz}}_{{iz}}_{{radioIndex}}\"\r\n                                                class=\"radio-label mr-15\">{{item}}</label>\r\n                                            </span>\r\n                                          </ng-container>\r\n                                        </ng-container>\r\n                                      </ng-container>\r\n\r\n                                      <!--for input value and field type checkbox-->\r\n                                      <ng-container *ngIf=\"question.field_type=='checkbox'\">\r\n                                        <!-- <div class=\"clearfix\">{{question.picklist_options | json}}</div> -->\r\n                                        <ng-container *ngIf=\"question.picklist_options\">\r\n                                          <ng-container\r\n                                            *ngFor=\"let item of question.picklist_options.split(',');let checkIndex=index;\">\r\n                                            <span class=\"mr-3\">\r\n                                              <input id=\"chk-{{iz}}_{{iz}}_{{checkIndex}}\" [value]=\"\" type=\"checkbox\"\r\n                                                class=\"mr-15\">\r\n                                              <label for=\"chk-{{iz}}_{{iz}}_{{checkIndex}}\"\r\n                                                class=\"radio-label\">{{item}}</label>\r\n                                            </span>\r\n                                          </ng-container>\r\n                                        </ng-container>\r\n                                      </ng-container>\r\n\r\n                                      <!--for input value and field type boolean-->\r\n                                      <ng-container *ngIf=\"question.field_type=='boolean'\">\r\n                                        <div class=\"clearfix\"></div>\r\n                                        <label class=\"switch  mb-0\">\r\n                                          <input type=\"checkbox\" id=\"bool{{iz}}\">\r\n                                          <span class=\"slider round\" id=\"bool{{iz}}\"><span>Yes</span></span>\r\n                                        </label>\r\n                                      </ng-container>\r\n\r\n                                      <!--for input value and field type image-->\r\n                                      <ng-container *ngIf=\"question.field_type=='image'\">\r\n                                        <div class=\"custom-file\">\r\n                                          <input type=\"file\" class=\"custom-file-input\" id=\"validatedCustomFile{{iz}}\">\r\n                                          <label class=\"custom-file-label\" for=\"validatedCustomFile{{iz}}\">Choose\r\n                                            file...</label>\r\n                                        </div>\r\n                                        <span *ngIf=\"question.picklist_options\">Only\r\n                                          <strong>{{question.picklist_options}}</strong> extention's are\r\n                                          allowed</span>\r\n                                      </ng-container>\r\n\r\n\r\n                                    </ng-container>\r\n                                    <ng-template #elseblock>\r\n                                      <div class=\"input-group mb-3\">\r\n                                        <span>{{question.name}}</span>\r\n                                        <span> <a href=\"javascript:void(0);\"\r\n                                            (click)=\"show(question,ix,iz,iz,'questionOnly','1011')\"><i\r\n                                              class=\"fa fa-ellipsis-h text-secondary float-right\"></i></a></span>\r\n\r\n                                      </div>\r\n                                    </ng-template>\r\n                                    <div class=\"input-group-append\"\r\n                                      *ngIf=\"question.field_type!='' && question.field_type!=null\">\r\n                                      <span class=\"input-group-text bg-danger border-0\">\r\n                                        <a (click)=\"removeQuestionsAndAnswer(ix,iy,iz)\"\r\n                                          class=\"text-white p-0 cursor-pointer\">\r\n                                          <i class=\"fa fa-trash p-0\" title=\"Delete\"></i>\r\n                                        </a>\r\n                                      </span>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div *ngIf=\"qAndSub.sectionType == 'question' && qAndSub.statusId != '1003'\" class=\"Ys mb-2 pb-2 sub-section\">\r\n                        <div class=\"sectionqtn\">\r\n                          <div class=\"drop\" pDroppable=\"row\" (onDrop)=\"drop($event,ix,iy,iz,'questionOnly')\"\r\n                            style=\"min-height:40px;\">\r\n                            <label class=\"text-capitalize w-100\" *ngIf=\"qAndSub.question.isDirty\">\r\n                              {{qAndSub.question.display_name}} <span *ngIf=\"qAndSub.question.is_required\"\r\n                                class=\"text-danger\">*</span><span class=\"d-inline-block float-right\"\r\n                                *ngIf=\"qAndSub.question.field_type!='' && qAndSub.question.field_type!=null\">\r\n                                <a href=\"javascript:void(0);\" (click)=\"show(qAndSub.question,ix,iy,iz,'questionOnly','1011')\"><i\r\n                                    class=\"fa fa-ellipsis-h text-secondary float-right\"></i></a>\r\n                              </span>\r\n                            </label>\r\n                            <div class=\"input-group mb-3\">\r\n\r\n                              <ng-container *ngIf=\"qAndSub.question.isDirty;else elseblock;\">\r\n                                <!--for input value and field type text-->\r\n                                <input *ngIf=\"qAndSub.question.field_type=='textbox'\" id=\"input_{{iy}}\"\r\n                                  name=\"input_{{iy}}\" class=\"form-control\" type=\"text\"\r\n                                  placeholder=\"{{qAndSub.question.is_system_generated ==false ? qAndSub.question.name : qAndSub.question.display_name}}\" />\r\n                                <input *ngIf=\"qAndSub.question.field_type=='text'\" id=\"input_{{iy}}\" name=\"input_{{iy}}\"\r\n                                  class=\"form-control\" type=\"text\"\r\n                                  placeholder=\"{{qAndSub.question.is_system_generated ==false ? qAndSub.question.name : qAndSub.question.display_name}}\" />\r\n\r\n                                <!--for input value and field type textarea-->\r\n                                <textarea *ngIf=\"qAndSub.question.field_type=='textarea'\" class=\"form-control\" rows=\"4\"\r\n                                  id=\"textarea_{{iy}}\" name=\"textarea_{{iy}}\"\r\n                                  placeholder=\"{{qAndSub.question.is_system_generated ==false ? qAndSub.question.name : qAndSub.question.display_name}}\"></textarea>\r\n\r\n\r\n                                <!--for input value and field type date-->\r\n                                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\"\r\n                                  inputStyleClass=\"form-control start-date \" *ngIf=\"qAndSub.question.field_type=='date'\"\r\n                                  hideOnDateTimeSelect=\"true\" inputId=\"cald_{{iy}}\" dateFormat=\"mm/dd/yy\"\r\n                                  showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\"\r\n                                  yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                                <!--for input value and field type datetime-->\r\n                                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\"\r\n                                  inputStyleClass=\"form-control start-date \"\r\n                                  *ngIf=\"qAndSub.question.field_type=='datetime'\"\r\n                                  [hourFormat]=\"(timeFormat==24)?'24':'12'\" hideOnDateTimeSelect=\"true\"\r\n                                  [showTime]=\"true\" inputId=\"caldt_{{iy}}\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\"\r\n                                  [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                                <!--for input value and field type number-->\r\n                                <input *ngIf=\"qAndSub.question.field_type=='number' \" min=\"0\" value=\"0\" step=\"0.01\"\r\n                                  id=\"input_1{{iy}}\" name=\"input_1{{iy}}\" class=\"form-control\" type=\"number\"\r\n                                  placeholder=\"{{qAndSub.question.is_system_generated ==false ? qAndSub.question.name : qAndSub.question.display_name}}\" />\r\n\r\n                                <input *ngIf=\"qAndSub.question.field_type=='int' \" min=\"0\" value=\"0\" step=\"0.01\"\r\n                                  id=\"input_{{iy}}\" name=\"input_{{iy}}\" class=\"form-control\" type=\"number\"\r\n                                  placeholder=\"{{qAndSub.question.is_system_generated ==false ? qAndSub.question.name : qAndSub.question.display_name}}\" />\r\n\r\n                                  <input *ngIf=\"qAndSub.question.field_type=='bigint' \" min=\"0\" value=\"0\" step=\"1\"\r\n                                  id=\"input_{{iy}}\" name=\"input_{{iy}}\" class=\"form-control\" type=\"number\"\r\n                                  placeholder=\"{{qAndSub.question.is_system_generated ==false ? qAndSub.question.name : qAndSub.question.display_name}}\" />\r\n                                <!--for input value and field type number-->\r\n                                <input *ngIf=\"qAndSub.question.field_type=='decimal'\" pattern=\"^\\d*(\\.\\d{0,2})?$\"\r\n                                  min=\"0\" value=\"0\" step=\"0.01\" id=\"input_{{iy}}\" name=\"input_{{iy}}\"\r\n                                  class=\"form-control\" type=\"number\"\r\n                                  placeholder=\"{{qAndSub.question.is_system_generated ==false ? qAndSub.question.name : qAndSub.question.display_name}}\" />\r\n\r\n\r\n                                <!--for input value and field type dropdown-->\r\n                                <ng-container *ngIf=\"qAndSub.question.field_type=='dropdown'\">\r\n                                  <div class=\"clearfix\"></div>\r\n                                  <ng-select id=\"ddl_{{iy}}\" [items]=\"qAndSub.question.selectlistvalues\"\r\n                                    bindLabel=\"value\" bindValue=\"id\"\r\n                                    placeholder=\"{{qAndSub.question.is_system_generated ==false ? qAndSub.question.name : qAndSub.question.display_name}}\">\r\n                                    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\r\n                                      <span>{{item.value}} <span *ngIf=\"item.color!=''\"><span\r\n                                            [style.background-color]=\"item.color\"></span>\r\n                                          {{item.color}}</span></span>\r\n                                    </ng-template>\r\n                                  </ng-select>\r\n                                </ng-container>\r\n                                \r\n                                <ng-container *ngIf=\"qAndSub.question.field_type=='select'\">\r\n\r\n                                  <div class=\"clearfix\"></div>\r\n                                  <ng-select id=\"ddl_{{iy}}\" [items]=\"qAndSub.question.selectlistvalues\"\r\n                                    bindLabel=\"value\" bindValue=\"id\"\r\n                                    placeholder=\"{{qAndSub.question.is_system_generated ==false ? qAndSub.question.name : qAndSub.question.display_name}}\">\r\n                                    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\r\n                                      <span>{{item.value}} <span *ngIf=\"item.color!=''\"><span\r\n                                            [style.background-color]=\"item.color\"></span>\r\n                                          {{item.color}}</span></span>\r\n                                    </ng-template>\r\n                                  </ng-select>\r\n                                </ng-container>\r\n\r\n                                <!--for input value and field type radio-->\r\n                                <ng-container *ngIf=\"qAndSub.question.field_type=='radioButton'\">\r\n                                  <div class=\"clearfix\"></div>\r\n                                  <ng-container *ngIf=\"qAndSub.question.picklist_options\">\r\n                                    <ng-container\r\n                                      *ngFor=\"let item of qAndSub.question.picklist_options.split(',');let radioIndex=index;\">\r\n                                      <span class=\"mr-3\">\r\n                                        <input id=\"radio-{{iy}}_{{iy}}_{{radioIndex}}\" name=\"radio-{{iz}}_{{iy}}\"\r\n                                          [value]=\"\" type=\"radio\" class=\"mr-15\">\r\n                                        <label for=\"radio-{{iy}}_{{iy}}_{{radioIndex}}\"\r\n                                          class=\"radio-label mr-15\">{{item}}</label>\r\n                                      </span>\r\n                                    </ng-container>\r\n                                  </ng-container>\r\n                                </ng-container>\r\n                                <ng-container *ngIf=\"qAndSub.question.field_type=='radio'\">\r\n                                  <div class=\"clearfix\"></div>\r\n                                  <ng-container *ngIf=\"qAndSub.question.picklist_options\">\r\n                                    <ng-container\r\n                                      *ngFor=\"let item of qAndSub.question.picklist_options.split(',');let radioIndex=index;\">\r\n                                      <span class=\"mr-3\">\r\n                                        <input id=\"radio-{{iy}}_{{iy}}_{{radioIndex}}\" name=\"radio-{{iz}}_{{iy}}\"\r\n                                          [value]=\"\" type=\"radio\" class=\"mr-15\">\r\n                                        <label for=\"radio-{{iy}}_{{iy}}_{{radioIndex}}\"\r\n                                          class=\"radio-label mr-15\">{{item}}</label>\r\n                                      </span>\r\n                                    </ng-container>\r\n                                  </ng-container>\r\n                                </ng-container>\r\n\r\n                                <!--for input value and field type checkbox-->\r\n                                <ng-container *ngIf=\"qAndSub.question.field_type=='checkbox'\">\r\n                                  <!-- <div class=\"clearfix\">{{qAndSub.question.picklist_options | json}}</div> -->\r\n                                  <ng-container *ngIf=\"qAndSub.question.picklist_options\">\r\n                                    <ng-container\r\n                                      *ngFor=\"let item of qAndSub.question.picklist_options.split(',');let checkIndex=index;\">\r\n                                      <span class=\"mr-3\">\r\n                                        <input id=\"chk-{{iz}}_{{iy}}_{{checkIndex}}\" [value]=\"\" type=\"checkbox\"\r\n                                          class=\"mr-15\">\r\n                                        <label for=\"chk-{{iz}}_{{iy}}_{{checkIndex}}\"\r\n                                          class=\"radio-label\">{{item}}</label>\r\n                                      </span>\r\n                                    </ng-container>\r\n                                  </ng-container>\r\n                                </ng-container>\r\n\r\n                                <!--for input value and field type boolean-->\r\n                                <ng-container *ngIf=\"qAndSub.question.field_type=='boolean'\">\r\n                                  <div class=\"clearfix\"></div>\r\n                                  <label class=\"switch  mb-0\">\r\n                                    <input type=\"checkbox\" id=\"bool{{iy}}\">\r\n                                    <span class=\"slider round\" id=\"bool{{iy}}\"><span>Yes</span></span>\r\n                                  </label>\r\n                                </ng-container>\r\n\r\n                                <!--for input value and field type image-->\r\n                                <ng-container *ngIf=\"qAndSub.question.field_type=='image'\">\r\n                                  <div class=\"custom-file\">\r\n                                    <input type=\"file\" class=\"custom-file-input\" id=\"validatedCustomFile{{iy}}\">\r\n                                    <label class=\"custom-file-label\" for=\"validatedCustomFile{{iy}}\">Choose\r\n                                      file...</label>\r\n                                  </div>\r\n                                  <span *ngIf=\"qAndSub.question.picklist_options\">Only\r\n                                    <strong>{{qAndSub.question.picklist_options}}</strong> extention's are\r\n                                    allowed</span>\r\n                                </ng-container>\r\n\r\n\r\n                              </ng-container>\r\n                              <ng-template #elseblock>\r\n                                <div class=\"input-group mb-3\">\r\n                                  <span>{{qAndSub.question.name}}</span>\r\n                                  <span> <a href=\"javascript:void(0);\"\r\n                                      (click)=\"show(qAndSub.question,ix,iy,iz,'questionOnly','1011')\"><i\r\n                                        class=\"fa fa-ellipsis-h text-secondary float-right\"></i></a></span>\r\n\r\n                                </div>\r\n                              </ng-template>\r\n                              <div class=\"input-group-append\"\r\n                                *ngIf=\"qAndSub.question.field_type!='' && qAndSub.question.field_type!=null\">\r\n                                <span class=\"input-group-text bg-danger border-0\">\r\n                                  <a (click)=\"removeSubSection(ix,iy)\" class=\"text-white p-0 cursor-pointer\">\r\n                                    <i class=\"fa fa-trash p-0\" title=\"Delete\"></i>\r\n                                  </a>\r\n                                </span>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                    </div>\r\n                    <div class=\"text-right\">\r\n                      <div class=\"btn-group\">\r\n                        <a class=\"btn btn-dark btn-subsection-question border-0 text-white ml-2 mt-2\" [class.disabled]=\"SectionName.invalid\"\r\n                          href=\"javascript:void(0);\" (click)=\"!SectionName.invalid && addSubSection(ix,'subSection')\"><i\r\n                            class=\"fa fa-plus align-middle fw-600\"></i> Sub Section</a>\r\n                        <!--*ngIf='isAdd'-->\r\n                        <a class=\"btn btn-primary btn-subsection-question border-0 text-white mt-2 ml-2\" [class.disabled]=\"SectionName.invalid\"\r\n                          href=\"javascript:void(0);\" (click)=\"!SectionName.invalid && addSubSection(ix,'question')\"><span><i\r\n                              class=\"fa fa-plus align-middle fw-600\"></i> Question</span></a>\r\n                        <!--*ngIf='isDelete'-->\r\n                        <!-- <input type=\"button\" (click)=\"addY(ix)\" value=\"&#x2B; Sub Section\" class=\"btn-dark btn-subsection-question border-0 text-white mt-2 p-2\">\r\n                        <input type=\"button\" (click)=\"QuestionOnly(ix)\" value=\"&#x2B; Question\" class=\"btn-primary btn-subsection-question border-0 text-white mt-2 p-2 ml-2\"> -->\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              </div>\r\n            </div>\r\n            <!-- X End -->\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-sm-5 col-md-5\">\r\n          <h3 class=\"form-heading\"><span>Auditor View</span></h3>\r\n          <div class=\"modal-body overflowy-checklist p-0\">\r\n            <div class=\"manage-color mb-3\" *ngFor=\"let preview of questionnaire.mainSection; let prwIndex=index\">\r\n              <div class=\"row mng-number border align-items-stretch mx-0 mb-1\" *ngIf=\"preview.statusId != '1003'\">\r\n                <div class=\"col-lg-2 bg-numbr1 p-3 text-center d-flex align-items-center\" style=\"background: #dcf1ff;\">\r\n                  <h2 class=\"w-100\">{{preview.sectionIndex}} </h2>\r\n                </div>\r\n                <div class=\"col-lg-10 p-3 d-flex align-items-center\">\r\n                  <div class=\"w-100\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-lg-12\">\r\n                        <label style=\"font-size: 17px;\"><b>Section Name:</b> {{preview.SectionName}} </label>\r\n                        <div class=\"w-100 d-flex flex-wrap\">\r\n\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-lg-12\" *ngFor=\"let subSection of preview.mainSubSection; let c=index\">\r\n                        <div class=\"ml-2\" *ngIf=\"subSection.sectionType == 'subSection' && subSection.statusId != '1003'\">\r\n                          <label><b>Sub Section: </b> {{subSection.subSectionName}} </label>\r\n                          <div class=\"fulwith-radio-n-check  mt-2\"\r\n                            *ngFor=\"let previewques of subSection.SubSectionQuestionAns; let b=index\">\r\n                            <div *ngIf=\"previewques.statusId != '1003'\">\r\n                              <div class=\"w-100 d-flex align-content-center align-items-center\" *ngIf=\"!isEdit\"\r\n                              style=\"border-left: 5px solid #41b2f9; padding-left: 5px;\">\r\n                              <!--<div class=\"clearfix\">{{previewques | json}}</div>-->\r\n                              <div class=\"clearfix\"></div>\r\n                              <label class=\"text-capitalize mr-auto\"><b style=\"font-weight:700\">Question:</b>\r\n                                {{previewques.display_name}}</label>\r\n                            </div>\r\n                            <div class=\"w-100 mb-2 d-flex flex-wrap align-content-center align-items-center pl-1\"\r\n                              *ngIf=\"!isEdit\" style=\"border-left: 5px solid #41b2f9; padding-left: 5px;\">\r\n                              <div class=\"w-100\">\r\n                                <div class=\"w-100 mb-2\"><span><b style=\"font-weight:700\">Answer Type:</b>\r\n                                    {{previewques.dt_code}}</span></div>\r\n                              </div>\r\n                            </div>\r\n                            <div *ngIf=\"isEdit\" style=\"border-left: 5px solid #41b2f9; padding-left: 5px;\">\r\n                              <div class=\"w-100 d-flex align-content-center align-items-center\"\r\n                                *ngIf=\"previewques.display_name!=null && previewques.display_name!=''\">\r\n                                <div class=\"clearfix\"></div>\r\n                                <label class=\"text-capitalize mr-auto\"><b style=\"font-weight:700\">Question:</b>\r\n                                  {{previewques.display_name}}</label>\r\n                              </div>\r\n                              <div class=\"w-100 mb-2 d-flex flex-wrap align-content-center align-items-center pl-1\"\r\n                                *ngIf=\"previewques.display_name!=null && previewques.display_name!=''\">\r\n                                <div class=\"w-100\">\r\n                                  <div class=\"w-100 mb-2\"><span><b style=\"font-weight:700\">Answer Type:</b>\r\n                                      {{previewques.dt_code}}</span></div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row mb-4\" *ngIf=\"previewques.display_name!=null && previewques.display_name!=''\">\r\n                              <div class=\"col-lg-12\" style=\"pointer-events:none;\">\r\n                                <div class=\"w-100 mb-0 mt-2 p-2\" style=\"background:#f1f1f1\">\r\n                                  <div class=\"w-100\">\r\n                                    <label class=\"d-block\"><b>Is provided information correct?</b></label>\r\n                                    <div class=\"col-12\">\r\n                                      <div class=\"row\">\r\n                                        <div class=\"form-check form-check-inline\">\r\n                                          <input class=\"form-check-input\" id=\"auditorRadiosYes_{{c+b}}\" name=\"auditorRadios\" type=\"radio\" value=\"Yes\">\r\n                                           <label class=\"form-check-label\" for=\"auditorRadiosYes_{{c+b}}\">Yes</label>\r\n                                        </div>\r\n                                        <div class=\"form-check form-check-inline\">\r\n                                          <input class=\"form-check-input\" id=\"auditorRadiosNo_{{c+b}}\" name=\"auditorRadios\" type=\"radio\" value=\"No\">\r\n                                           <label class=\"form-check-label\" for=\"auditorRadiosNo_{{c+b}}\">No</label>\r\n                                        </div>\r\n                                        <div class=\"form-check form-check-inline\">\r\n                                          <input class=\"form-check-input\" id=\"auditorRadiosNoScore_{{c+b}}\" name=\"auditorRadios\" type=\"radio\" value=\"NoScore\">\r\n                                           <label class=\"form-check-label\" for=\"auditorRadiosNoScore_{{c+b}}\">No score</label>\r\n                                        </div>\r\n                                      </div>\r\n                                    </div>\r\n                                  </div>\r\n                                  <div class=\"w-100 mt-2\">\r\n                                    <label><b>Auditor Comment:</b></label>\r\n                                    <div class=\"form-group mb-0\">\r\n                                      <textarea class=\"form-control audit-textarea mb-1\"\r\n                                        style=\"height:50px;\"></textarea>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                                <div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            </div>\r\n                           \r\n                          </div>\r\n                        </div>\r\n                        <div *ngIf=\"subSection.sectionType == 'question' && subSection.statusId != '1003'\">\r\n                          <div class=\"fulwith-radio-n-check mt-2\">\r\n                            <div class=\"w-100 d-flex align-content-center align-items-center\" *ngIf=\"!isEdit\"\r\n                              style=\"border-left: 5px solid #41b2f9; padding-left: 5px;\">\r\n                              <!--<div class=\"clearfix\">{{previewques | json}}</div>-->\r\n                              <div class=\"clearfix\"></div>\r\n                              <label class=\"text-capitalize mr-auto\"><b style=\"font-weight:700\">Question:</b>\r\n                                {{subSection.question.display_name}}</label>\r\n                            </div>\r\n                            <div class=\"w-100 mb-2 d-flex flex-wrap align-content-center align-items-center pl-1\"\r\n                              *ngIf=\"!isEdit\" style=\"border-left: 5px solid #41b2f9; padding-left: 5px;\">\r\n                              <div class=\"w-100\">\r\n                                <div class=\"w-100 mb-2\"><span><b style=\"font-weight:700\">Answer Type:</b>\r\n                                    {{subSection.question.dt_code}}</span></div>\r\n                              </div>\r\n                            </div>\r\n                            <div *ngIf=\"isEdit\" style=\"border-left: 5px solid #41b2f9; padding-left: 5px;\">\r\n                              <div class=\"w-100 d-flex align-content-center align-items-center\"\r\n                                *ngIf=\"subSection.question.display_name!=null && subSection.question.display_name!=''\">\r\n                                <div class=\"clearfix\"></div>\r\n                                <label class=\"text-capitalize mr-auto\"><b style=\"font-weight:700\">Question:</b>\r\n                                  {{subSection.question.display_name}}</label>\r\n                              </div>\r\n                              <div class=\"w-100 mb-2 d-flex flex-wrap align-content-center align-items-center pl-1\"\r\n                                *ngIf=\"subSection.question.display_name!=null && subSection.question.display_name!=''\">\r\n                                <div class=\"w-100\">\r\n                                  <div class=\"w-100 mb-2\"><span><b style=\"font-weight:700\">Answer Type:</b>\r\n                                      {{subSection.question.dt_code}}</span></div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row\"  *ngIf=\"subSection.question.display_name!=null && subSection.question.display_name!=''\">\r\n                              <div class=\"col-lg-12\" style=\"pointer-events:none;\">\r\n                                <div class=\"w-100 mb-0 mt-4 p-2\" style=\"background:#f1f1f1\">\r\n                                  <div class=\"w-100\">\r\n                                    <label class=\"d-block\"><b>Is provided information correct?</b></label>\r\n                                    <div class=\"col-12\">\r\n                                      <div class=\"row\">\r\n                                        <div class=\"form-check form-check-inline\">\r\n                                          <input class=\"form-check-input\" id=\"auditorRadiosYes{{c}}\" name=\"auditorRadios\" type=\"radio\" value=\"Yes\">\r\n                                           <label class=\"form-check-label\" for=\"auditorRadiosYes\">Yes</label>\r\n                                        </div>\r\n                                        <div class=\"form-check form-check-inline\">\r\n                                          <input class=\"form-check-input\" id=\"auditorRadiosNo{{c}}\" name=\"auditorRadios\" type=\"radio\" value=\"No\">\r\n                                           <label class=\"form-check-label\" for=\"auditorRadiosNo\">No</label>\r\n                                        </div>\r\n                                        <div class=\"form-check form-check-inline\">\r\n                                          <input class=\"form-check-input\" id=\"auditorRadiosNoScore{{c}}\" name=\"auditorRadios\" type=\"radio\" value=\"NoScore\">\r\n                                           <label class=\"form-check-label\" for=\"auditorRadiosNoScore\">No score</label>\r\n                                        </div>\r\n                                      </div>\r\n                                    </div>\r\n                                  </div>\r\n                                  <div class=\"w-100\">\r\n                                    <label><b>Auditor Comment:</b></label>\r\n                                    <div class=\"form-group mb-0\">\r\n                                      <textarea class=\"form-control audit-textarea mb-1\"\r\n                                        style=\"height:50px;\"></textarea>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                                <div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n        </div>\r\n        <div class=\"col-sm-12 col-md-12 mt-3 text-right\">\r\n          <button type=\"submit\" class=\"btn btn-success mr-2\" [disabled]=\"!questionnairForm.form.valid\"><i class=\"fa fa-save\"></i>\r\n            Submit</button>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n\r\n      </div>\r\n    </form>\r\n  </div>\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n<app-propertiespopupform #propertiesPopupform (customFieldLayOut)=\"refreshJson()\"></app-propertiespopupform>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/managequestionnaire/viewpopupwindowform/propertiespopupform.component.html":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/managequestionnaire/viewpopupwindowform/propertiespopupform.component.html ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #propertiesPopupform=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">\r\n          {{fieldName}} Properties\r\n        </h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"max-height:600px; overflow:inherit;\">\r\n        <div class=\"col-md-12 p-0\">\r\n          \r\n          <form [formGroup]=\"properties\" autocomplete=\"off\" class=\"w-100\">\r\n            \r\n            <div class=\"row\" *ngIf=\"singleLine\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" *ngIf=\"is_system_generated\" disabled class=\"form-control\" formControlName=\"singleLineNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (singleLineNameDisplay.invalid && (singleLineNameDisplay.dirty || singleLineNameDisplay.touched) && singleLineNameDisplay.errors?.required) }\">\r\n                  <input type=\"text\" *ngIf=\"!is_system_generated\" class=\"form-control\" formControlName=\"singleLineNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (singleLineNameDisplay.invalid && (singleLineNameDisplay.dirty || singleLineNameDisplay.touched) && singleLineNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"singleLineNameDisplay.invalid && (singleLineNameDisplay.dirty || singleLineNameDisplay.touched) && singleLineNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6 d-none\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"singleLineCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (singleLineCharactersAllowed.invalid && (singleLineCharactersAllowed.dirty || singleLineCharactersAllowed.touched) && singleLineCharactersAllowed.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"singleLineCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (singleLineCharactersAllowed.invalid && (singleLineCharactersAllowed.dirty || singleLineCharactersAllowed.touched) && singleLineCharactersAllowed.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"singleLineCharactersAllowed.invalid && (singleLineCharactersAllowed.dirty || singleLineCharactersAllowed.touched) && singleLineCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Please enter Number of characters</small>\r\n\r\n                  <small *ngIf=\"singleLineCharactersAllowed.errors?.pattern\"\r\n                         style=\"color:red;\">Please enter valid value</small>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\" *ngIf=\"!is_system_generated\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"singleLineMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"multiLine\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" *ngIf=\"is_system_generated\" disabled class=\"form-control\" formControlName=\"multiLineNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (multiLineNameDisplay.invalid && (multiLineNameDisplay.dirty || multiLineNameDisplay.touched) && multiLineNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" *ngIf=\"!is_system_generated\" class=\"form-control\" formControlName=\"multiLineNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (multiLineNameDisplay.invalid && (multiLineNameDisplay.dirty || multiLineNameDisplay.touched) && multiLineNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"multiLineNameDisplay.invalid && (multiLineNameDisplay.dirty || multiLineNameDisplay.touched) && multiLineNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6 d-none\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" *ngIf=\"is_system_generated\" disabled class=\"form-control\" formControlName=\"multiLineCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (multiLineCharactersAllowed.invalid && (multiLineCharactersAllowed.dirty || multiLineCharactersAllowed.touched) && multiLineCharactersAllowed.errors?.required) }\">\r\n                  <input type=\"text\" *ngIf=\"!is_system_generated\" class=\"form-control\" formControlName=\"multiLineCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (multiLineCharactersAllowed.invalid && (multiLineCharactersAllowed.dirty || multiLineCharactersAllowed.touched) && multiLineCharactersAllowed.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"multiLineCharactersAllowed.invalid && (multiLineCharactersAllowed.dirty || multiLineCharactersAllowed.touched) && multiLineCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Please enter Number of characters</small>\r\n\r\n                  <small *ngIf=\"multiLineCharactersAllowed.errors?.pattern\"\r\n                         style=\"color:red;\">Please enter valid value</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"multiLineMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\" *ngIf=\"SelectList\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"selectListLineNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (selectListLineNameDisplay.invalid && (selectListLineNameDisplay.dirty || selectListLineNameDisplay.touched) && selectListLineNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"selectListLineNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (selectListLineNameDisplay.invalid && (selectListLineNameDisplay.dirty || selectListLineNameDisplay.touched) && selectListLineNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"selectListLineNameDisplay.invalid && (selectListLineNameDisplay.dirty || selectListLineNameDisplay.touched) && selectListLineNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\" style=\"display:none\">\r\n                <label>Pick List Option:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"selectListCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (multiLineCharactersAllowed.invalid && (selectListCharactersAllowed.dirty || selectListCharactersAllowed.touched) && selectListCharactersAllowed.errors?.required) }\">\r\n                  <small *ngIf=\"selectListCharactersAllowed.invalid && (selectListCharactersAllowed.dirty || selectListCharactersAllowed.touched) && selectListCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Enter comma separated values</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-12\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-12 col-md-6 col-lg-6\">\r\n                    <label>Options:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"ddloptions\" maxlength=\"50\">\r\n                      <small *ngIf=\"ddloptionsvalidation\"\r\n                             style=\"color:red;\">Enter Option</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-6\">\r\n                    <label>Color:</label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-12 col-md-8 col-lg-8\">\r\n                          <div class=\"form-control\">\r\n                            <p-colorPicker formControlName=\"ddloptionscolor\" (click)=\"SetColorFor()\">\r\n                            </p-colorPicker>\r\n                            <span>{{colorCode}}</span>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-12 col-md-4 col-lg-4\">\r\n                          <button type=\"button\" class=\"btn btn-primary form-btns\" (click)=\"add()\"><i class=\"fa fa-plus text-white\"></i> Add</button>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-12 col-lg-12\">\r\n                    <div class=\"table-responsive\">\r\n                      <table class=\"table mb-5\" style=\"min-width:400px;\">\r\n                        <tr>\r\n                          <th>Name</th>\r\n                          <th>Color</th>\r\n                          <th>Action</th>\r\n                        </tr>\r\n                        <tr *ngFor=\"let item of selectlistvalues;let rowIndex=index;\">\r\n                          <td>{{item.value}}</td>\r\n                          <td>\r\n                            <span>{{item.color}}</span>\r\n                          </td>\r\n                          <td><a href=\"javascript:void(0)\" (click)=\"editselectlist(item.id,item.value,item.color)\">Edit</a></td>\r\n                        </tr>\r\n                      </table>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"selectListMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"ddlmultiselect\" class=\"dynamic custom-control-input\" formControlName=\"selectListMultiddl\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"ddlmultiselect\">\r\n                      Multi Select\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\" *ngIf=\"intShow\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"intNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (intNameDisplay.invalid && (intNameDisplay.dirty || selectListLineNameDisplay.touched) && intNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"intNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (intNameDisplay.invalid && (intNameDisplay.dirty || selectListLineNameDisplay.touched) && intNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"intNameDisplay.invalid && (intNameDisplay.dirty || intNameDisplay.touched) && intNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6 d-none\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"intCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (intCharactersAllowed.invalid && (intCharactersAllowed.dirty || intCharactersAllowed.touched) && intCharactersAllowed.errors?.required) }\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"intCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (intCharactersAllowed.invalid && (intCharactersAllowed.dirty || intCharactersAllowed.touched) && intCharactersAllowed.errors?.required) }\">\r\n\r\n\r\n                  <small *ngIf=\"intCharactersAllowed.invalid && (intCharactersAllowed.dirty || intCharactersAllowed.touched) && intCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Length is required</small>\r\n\r\n\r\n                  <small *ngIf=\"intCharactersAllowed.errors?.pattern\"\r\n                         style=\"color:red;\">Please enter valid value</small>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"intMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"bigInt\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"bigintNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (bigintNameDisplay.invalid && (bigintNameDisplay.dirty || bigintNameDisplay.touched) && bigintNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"bigintNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (bigintNameDisplay.invalid && (bigintNameDisplay.dirty || bigintNameDisplay.touched) && bigintNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"bigintNameDisplay.invalid && (bigintNameDisplay.dirty || bigintNameDisplay.touched) && bigintNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6 d-none\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"bigintCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (bigintCharactersAllowed.invalid && (bigintCharactersAllowed.dirty || bigintCharactersAllowed.touched) && bigintCharactersAllowed.errors?.required) }\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"bigintCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (bigintCharactersAllowed.invalid && (bigintCharactersAllowed.dirty || bigintCharactersAllowed.touched) && bigintCharactersAllowed.errors?.required) }\">\r\n\r\n\r\n                  <small *ngIf=\"bigintCharactersAllowed.invalid && (bigintCharactersAllowed.dirty || bigintCharactersAllowed.touched) && bigintCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Length is required</small>\r\n\r\n                  <small *ngIf=\"bigintCharactersAllowed.errors?.pattern\"\r\n                         style=\"color:red;\">Please enter valid value</small>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"bigintMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"decimalShow\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"decimalNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (decimalNameDisplay.invalid && (decimalNameDisplay.dirty || decimalNameDisplay.touched) && decimalNameDisplay.errors?.required) }\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"decimalNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (decimalNameDisplay.invalid && (decimalNameDisplay.dirty || decimalNameDisplay.touched) && decimalNameDisplay.errors?.required) }\">\r\n\r\n\r\n                  <small *ngIf=\"decimalNameDisplay.invalid && (decimalNameDisplay.dirty || decimalNameDisplay.touched) && decimalNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6 d-none\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"decimalCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (decimalCharactersAllowed.invalid && (decimalCharactersAllowed.dirty || decimalCharactersAllowed.touched) && decimalCharactersAllowed.errors?.required) }\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"decimalCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (decimalCharactersAllowed.invalid && (decimalCharactersAllowed.dirty || decimalCharactersAllowed.touched) && decimalCharactersAllowed.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"decimalCharactersAllowed.invalid && (decimalCharactersAllowed.dirty || decimalCharactersAllowed.touched) && decimalCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Length is required</small>\r\n\r\n                  <small *ngIf=\"decimalCharactersAllowed.errors?.pattern\"\r\n                         style=\"color:red;\">Please enter valid value</small>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"decimalMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"dateShow || dateTimeShow\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"dateNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (dateNameDisplay.invalid && (dateNameDisplay.dirty || dateNameDisplay.touched) && dateNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"dateNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (dateNameDisplay.invalid && (dateNameDisplay.dirty || dateNameDisplay.touched) && dateNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"dateNameDisplay.invalid && (dateNameDisplay.dirty || dateNameDisplay.touched) && dateNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"decimalMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"booleanShow\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"booleanNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (booleanNameDisplay.invalid && (booleanNameDisplay.dirty || booleanNameDisplay.touched) && booleanNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"booleanNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (booleanNameDisplay.invalid && (booleanNameDisplay.dirty || booleanNameDisplay.touched) && booleanNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"dateNameDisplay.invalid && (booleanNameDisplay.dirty || booleanNameDisplay.touched) && booleanNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"checkboxShow\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"checkboxNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (checkboxNameDisplay.invalid && (checkboxNameDisplay.dirty || checkboxNameDisplay.touched) && checkboxNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"checkboxNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (checkboxNameDisplay.invalid && (checkboxNameDisplay.dirty || checkboxNameDisplay.touched) && checkboxNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"checkboxNameDisplay.invalid && (checkboxNameDisplay.dirty || checkboxNameDisplay.touched) && checkboxNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Pick List Option:<span class=\"text-danger\">(Use comma separation for multiple values)*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"checkboxCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Options\" [ngClass]=\"{'is-invalid': (checkboxCharactersAllowed.invalid && (checkboxCharactersAllowed.dirty || checkboxCharactersAllowed.touched) && checkboxCharactersAllowed.errors?.required) }\">\r\n                  <small *ngIf=\"checkboxCharactersAllowed.invalid && (checkboxCharactersAllowed.dirty || checkboxCharactersAllowed.touched) && checkboxCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Enter comma separated values</small>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"checkboxMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"radioShow\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"radioNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (radioNameDisplay.invalid && (radioNameDisplay.dirty || radioNameDisplay.touched) && radioNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"radioNameDisplay\" maxlength=\"50\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (radioNameDisplay.invalid && (radioNameDisplay.dirty || radioNameDisplay.touched) && radioNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"radioNameDisplay.invalid && (radioNameDisplay.dirty || radioNameDisplay.touched) && radioNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Pick List Option:<span class=\"text-danger\">(Use comma separation for multiple values)*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"radioCharactersAllowed\" disabled=\"disabled\" maxlength=\"50\" *ngIf=\"is_system_generated\"\r\n                         placeholder=\"Enter Options\" [ngClass]=\"{'is-invalid': (radioCharactersAllowed.invalid && (radioCharactersAllowed.dirty || radioCharactersAllowed.touched) && radioCharactersAllowed.errors?.required) }\" />\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"radioCharactersAllowed\" maxlength=\"50\" *ngIf=\"!is_system_generated\"\r\n                         placeholder=\"Enter Options\" [ngClass]=\"{'is-invalid': (radioCharactersAllowed.invalid && (radioCharactersAllowed.dirty || radioCharactersAllowed.touched) && radioCharactersAllowed.errors?.required) }\">\r\n                  <small *ngIf=\"radioCharactersAllowed.invalid && (radioCharactersAllowed.dirty || radioCharactersAllowed.touched) && radioCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Enter comma separated values</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"radioMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\" *ngIf=\"imageShow\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Question:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"urlNameDisplay\" maxlength=\"200\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (urlNameDisplay.invalid && (urlNameDisplay.dirty || urlNameDisplay.touched) && urlNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"urlNameDisplay\" maxlength=\"200\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (urlNameDisplay.invalid && (urlNameDisplay.dirty || urlNameDisplay.touched) && urlNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"urlNameDisplay.invalid && (urlNameDisplay.dirty || urlNameDisplay.touched) && urlNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <!-- <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Extension Allowed:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"urlCharactersAllowed\" maxlength=\"500\"\r\n                         placeholder=\"Enter Extension\" [ngClass]=\"{'is-invalid': (urlCharactersAllowed.invalid && (urlCharactersAllowed.dirty || urlCharactersAllowed.touched) && urlCharactersAllowed.errors?.required) }\">\r\n                  <ng-select id=\"urlCharactersAllowed\"  *ngIf=\"!is_system_generated\" formControlName=\"urlCharactersAllowed\" [items]=\"selectOptionsddl\" \r\n                  [multiple]=\"true\"\r\n                   [ngClass]=\"{'is-invalid': (urlCharactersAllowed.invalid && (urlCharactersAllowed.dirty || urlCharactersAllowed.touched) && urlCharactersAllowed.errors?.required) }\"\r\n                            bindLabel=\"customText\" bindValue=\"customText\">\r\n                  </ng-select>\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"urlCharactersAllowed\" maxlength=\"500\"\r\n                         placeholder=\"Enter Extension\" [ngClass]=\"{'is-invalid': (urlCharactersAllowed.invalid && (urlCharactersAllowed.dirty || urlCharactersAllowed.touched) && urlCharactersAllowed.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"urlCharactersAllowed.invalid && (urlCharactersAllowed.dirty || urlCharactersAllowed.touched) && urlCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Enter comma separated values</small>\r\n\r\n                </div>\r\n              </div> -->\r\n              <!-- <div class=\"col-6 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"urlMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div> -->\r\n\r\n            </div>\r\n            <div class=\"row\" *ngIf=\"isDisplayDependentSection\">\r\n                <div class=\"col-12 pb-4\">\r\n                  <label for=\"chkIsDependant\">\r\n                    Is Dependent\r\n                  </label>\r\n                  <div class=\"clearfix\"></div>\r\n                  <label class=\"switch  mb-0\">\r\n                    <input type=\"checkbox\"  id=\"chkIsDependant\" (change)=\"onCheckChange($event,'chkIsDependant')\" formControlName=\"chkIsDependant\">\r\n                    <span class=\"slider round\" id=\"chkIsDependant\"><span>Yes</span></span>\r\n                  </label>\r\n                </div>\r\n                <div class=\"clearfix\"></div>\r\n\r\n                <ng-container *ngIf=\"isDependant\">\r\n\r\n                  <div class=\"col-12\">\r\n                    <div class=\"card\">\r\n                      <div class=\"card-header\">Select Field</div>\r\n                      <div class=\"card-body\">\r\n                        <div class=\"row px-0\">\r\n                          <div class=\"col-md-6\">\r\n                            <ng-select id=\"ddlFormField\" formControlName=\"ddlFormField\" [items]=\"FormFieldList\" placeholder=\"Select Field\" (change)=\"OnDependencyFieldChange($event)\" (clear)=\"onClear('ddlFormField')\"\r\n                                       bindLabel=\"value\" bindValue=\"id\">\r\n                            </ng-select>\r\n                            <!-- <ng-select id=\"ddlFormField\" formControlName=\"ddlFormField\" [items]=\"FormFieldList\" placeholder=\"Select Field\" (change)=\"OnDependencyFieldChange($event)\" (clear)=\"onClear('ddlFormField')\"\r\n                            bindLabel=\"value\" bindValue=\"id\">\r\n                 </ng-select> -->\r\n                          </div>\r\n                          <div class=\"col-md-6\">\r\n                            <ng-select id=\"ddlOption\" formControlName=\"ddlOption\" [items]=\"ddlOptionList\" placeholder=\"Select Option\" (change)=\"OnDependencyOptionChange($event)\" (clear)=\"onClear('ddlOption')\"\r\n                                       bindLabel=\"value\" bindValue=\"id\">\r\n                            </ng-select>\r\n                          </div>\r\n                          <!--<div class=\"col-md-12 mt-2\">\r\n                          <div class=\"bg-light p-2 mt-2\">\r\n                            <span><strong>Condition: </strong> ( {{ConditionKey}} Equal To {{ConditionValue}} )</span>\r\n                          </div>\r\n                          </div>-->\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ng-container> \r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" [disabled]='properties.invalid' (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/servicesappointmentlist.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/servicesappointmentlist.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\">\r\n    <strong>Manage Service Appointments</strong>\r\n    <p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p>\r\n  </h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n\r\n      <li class=\"active\">Manage Service Appointments</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-7\">\r\n            <div class=\"row searchfield \">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2 \" *ngIf=\"currentView !='ghant'\">\r\n\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search by Appt no. and Account Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\" *ngIf=\"currentView !='ghant'\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"searchServiceAppointment()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i></span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i></span></a>\r\n                <a class=\"btn btn-white form-btns\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\">\r\n                  <span><i class=\"fa fa-filter\"></i></span>\r\n                </a>\r\n                <div class=\"d-inline-block align-middle pl-3\">\r\n                  <label class=\"d-inline-block \"><b>Search in all records</b></label>\r\n                  <div class=\"form-group d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <!--<input formcontrolname=\"isHOD\" id=\"customCheck2\" type=\"checkbox\" ng-reflect-name=\"isHOD\" class=\"ng-untouched ng-pristine ng-valid\">-->\r\n                      <input type=\"checkbox\" id=\"allRecords\" formControlName=\"allRecords\" [checked]=\"myCheckbox\" (click)=\"switchClicked($event)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-5\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0 onlythisv\" *ngIf=\"currentView !='ghant'\">\r\n                <ng-select [items]=\"pagedDatafor.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <!--<a *ngIf=\"!isCalenderView\" (click)=\"SwitchView()\" class=\"btn btn-info form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"Calendar View\"><span><i class=\"fa fa-calendar\"></i></span></a>\r\n              <a *ngIf=\"isCalenderView\" (click)=\"SwitchView()\" class=\"btn btn-info form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"List View\"><span><i class=\"fa fa-list\"></i></span></a>\r\n              <a (click)=\"SwitchListingView('ghant')\" class=\"btn btn-info form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"Ghant Chart View\"><span><i class=\"fa fa-calendar\"></i></span></a>\r\n              <a *ngIf=\"isMapView\" (click)=\"SwitchViewMap()\" class=\"btn btn-info form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"List View\"><span><i class=\"fa fa-list\"></i></span></a>\r\n              <a *ngIf=\"!isMapView\" class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"mapview()\" tooltip=\"Map View\"><span><i class=\"fa fa-map-marker\"></i></span></a>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i></span></a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>-->\r\n\r\n\r\n              <a *ngIf=\"currentView != 'calender'\" (click)=\"SwitchListingView('calender')\" class=\"btn btn-info form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"Calendar View\"><span><i class=\"fa fa-calendar\"></i></span></a>\r\n              <a *ngIf=\"currentView != 'list'\" (click)=\"SwitchListingView('list')\" class=\"btn btn-info form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"List View\"><span><i class=\"fa fa-list\"></i></span></a>\r\n              <a *ngIf=\"currentView != 'ghant'\" (click)=\"SwitchListingViewGhant('ghant')\" class=\"btn btn-info form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"Gantt Chart View\"><span><i class=\"fa fa-area-chart\"></i></span></a>\r\n              <a *ngIf=\"currentView != 'map'\" (click)=\"SwitchListingView('map')\" class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"Map View\"><span><i class=\"fa fa-map-marker\"></i></span></a>\r\n              <a *ngIf=\"currentView !='ghant'\" class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i></span></a>\r\n              <a *ngIf=\"currentView !='ghant' && isDelete\" class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content p-3 pagination2 table-responsive no-padding switchcalendar\" *ngIf=\"!isMapView\">\r\n        <div class=\"row\" [ngSwitch]=\"currentView\">\r\n\r\n          <ng-container *ngSwitchCase=\"'ghant'\">\r\n            <div class=\"col-12\">\r\n              <div class=\"control-section\">\r\n                <div class=\"drag-sample-wrapper\">\r\n                  <div class=\"row\">\r\n                    <div class=\"schedule-container col-9\">\r\n                      <ejs-schedule #scheduleObj cssClass='schedule-block-events' width='100%' height='650px' [group]=\"group\"\r\n                                    [currentView]=\"currView\" [selectedDate]=\"selectedDate\" [eventSettings]=\"eventSettings\" (eventRendered)=\"oneventRendered($event)\" (actionComplete)=\"onActionComplete($event)\" (renderCell)='onRenderCell($event,\"inner\")'\r\n                                    (popupOpen)='onPopupOpen($event)'  (navigation)=\"onNavigation($event)\">\r\n                        <ng-template #eventSettingsTooltipTemplate let-data>\r\n                          <div class=\"tooltip-wrap cstmdsgn\">\r\n                            <p><strong><i class=\"fa fa-address-card\"></i> Account Name:</strong> {{data.accountName}}</p>\r\n                            <p><strong><i class=\"fa fa-envelope\"></i> Email:</strong> {{data.email}}</p>\r\n                            <p><strong><i class=\"fa fa-user\"></i> Contact Name:</strong> {{data.contactName}}</p>\r\n                            <p><strong><i class=\"fa fa-phone\"></i> Phone:</strong> {{data.mobilephone}}</p>\r\n                            <p><strong><i class=\"fa fa-map-marker\"></i> Location:</strong> {{data.Address}}</p>\r\n                            <p><strong><i class=\"fa fa-map\"></i> Service Teritory:</strong> {{data.TerritoryName}}</p>\r\n                            <p><strong><i class=\"fa fa-signal\"></i> System Size:</strong> {{data.SystemSize}}</p>\r\n                            <p><strong><i class=\"fa fa-location-arrow\"></i> WareHouse:</strong> {{data.warehouse}}</p>\r\n                          </div>\r\n\r\n                        </ng-template>\r\n\r\n                        <e-resources>\r\n\r\n                          <e-resource field=\"EmployeeId\"\r\n                                      title=\"Employees\"\r\n                                      name=\"Employee\"\r\n                                      [dataSource]=\"employeeDataSource\"\r\n                                      [allowMultiple]=\"allowMultiple\"\r\n                                      textField=\"Text\"\r\n                                      idField=\"Id\"\r\n                                      groupIDField=\"GroupId\"\r\n                                      colorField=\"data.color\">\r\n                          </e-resource>\r\n                        </e-resources>\r\n                        <ng-template #editorTemplate let-data>\r\n                          <div *ngIf=\"data != undefined\" class=\"row\">\r\n                            <a (click)=\"AddAssignedResources(data.Id)\">{{data.Subject}}</a>\r\n                          </div>\r\n\r\n                        </ng-template>\r\n\r\n                        <ng-template #resourceHeaderTemplate let-data>\r\n\r\n                          <div class=\"template-wrap\">\r\n                            <div class=\"employee-category\">\r\n                              <div>\r\n                                <img src=\"{{siteurl+data.resourceData.profilepic}}\" class=\"employee-image\" style=\" width: 32px; height: 32px; float: left; border-radius: 50%; margin-right: 10px;\" />\r\n                              </div>\r\n\r\n                              <div class=\"employee-name\">\r\n                                <!--<ng-container *ngIf=\"data.resourceData.isUnassigned == '0';else elseBlock1\">\r\n                                  <i class=\"fa {{(data.resourceData.IsCrew == '1')?'fa-users':'fa-user'}}\"></i>\r\n                                </ng-container>\r\n                                <ng-template #elseBlock1>\r\n                                  <i class=\"fa fa-user-times\"></i>\r\n                                </ng-template>-->\r\n                                <ng-container *ngIf=\"data.resourceData.IsCrew == '1';else elseBlock\">\r\n                                  <a href=\"javascript:void(0);\" (click)=\"OnServiceCrewClick(data.resourceData)\">{{data.resourceData.Text |  titlecase }}</a>\r\n                                </ng-container>\r\n                                <ng-template #elseBlock>\r\n                                  {{data.resourceData.Text | titlecase }}\r\n                                </ng-template>\r\n\r\n\r\n                              </div>\r\n                              <div class=\"employee-designation\">{{data.resourceData.Designation}}</div>\r\n\r\n                            </div>\r\n                          </div>\r\n                        </ng-template>\r\n\r\n                        <ng-template #eventSettingsTemplate let-data>\r\n                          <div class='template-wrap'>\r\n                            <div class=\"subject\">{{data.Subject}}</div>\r\n                          </div>\r\n                        </ng-template>\r\n                        <e-views>\r\n                          <e-view option='TimelineDay' displayName=\"Day\"></e-view>\r\n                          <e-view option='TimelineWeek' displayName=\"Week\" [timeScale]=\"timeScaleOptions\"></e-view>\r\n                          <e-view option='TimelineMonth' displayName=\"Month\"></e-view>\r\n                        </e-views>\r\n\r\n                        <ng-template #dateHeaderTemplate let-data>\r\n                          <div class=\"date-text\">{{getDateHeaderText(data.date)}}</div>\r\n\r\n                        </ng-template>\r\n                      </ejs-schedule>\r\n                    </div>\r\n                    <div class=\"treeview-container col-3\">\r\n                      <div class=\"title-container\">\r\n                        <h1 class=\"title-text\">\r\n                          Unscheduled List\r\n                          <!--span class=\"select-in-tag\">\r\n        <ng-select [items]=\"workTypeItems\" placeholder=\"Select Worktype\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"onWorkTypeChange($event.value)\" (clear)=\"GetUnschedulledList()\">\r\n        </ng-select>\r\n      </span>-->\r\n                        </h1>\r\n\r\n                      </div>\r\n                      <ng-container *ngIf=\"waitingList?.length >0;else elseBlock;\">\r\n                        <ejs-treeview #treeObj [fields]='field' cssClass='treeview-external-drag' dragArea=\".drag-sample-wrapper\" [allowDragAndDrop]='allowDragAndDrop' (nodeDragStop)=\"onTreeDragStop($event)\" (nodeDragging)=\"onItemDrag($event)\">\r\n                          <ng-template #nodeTemplate=\"\" let-data=\"\">\r\n\r\n                            <div id=\"waiting\">\r\n                              <div id=\"waitdetails\">\r\n                                <div id=\"waitlist\" class=\"sa-srt-dtl\">\r\n\r\n                                  <strong class=\"apmnt-no text-white p-2\"><i class=\"fa fa-th\" style=\"opacity: .6; cursor: all-scroll; padding-top: 1px; font-size: 12px; float: left;\"></i> {{data.Name}}</strong> <span class=\"apmnt-type text-white p-2\" *ngIf=\"data.mastervalue == 'Fix'\">{{data.mastervalue}}</span> <span [ngStyle]=\"{'background':data.color }\" tooltip=\"{{data.Description}}\" class=\"sa-color text-white p-2\">{{data.Description}}</span>\r\n                                  <div class=\"sa-detail\">\r\n                                    <!--<p><strong><i class=\"fa fa-file\"></i> Description:</strong> {{data.Description}}</p>-->\r\n                                    <p><strong><i class=\"fa fa-address-card\"></i> Account Name:</strong>{{data.accountName}}</p>\r\n                                    <p><strong><i class=\"fa fa-mail-forward\"></i> Email:</strong> {{data.email}}</p>\r\n                                    <p><strong><i class=\"fa fa-user\"></i> Contact Name:</strong> {{data.contactName}}</p>\r\n                                    <p><strong><i class=\"fa fa-phone\"></i> Phone:</strong> {{data.mobilephone}}</p>\r\n                                    <p><strong><i class=\"fa fa-map-marker\"></i> Location:</strong> {{data.Address}}</p>\r\n                                    <p><strong><i class=\"fa fa-map\"></i> Service Teritory:</strong> {{data.TerritoryName}}</p>\r\n                                  </div>\r\n                                </div>\r\n\r\n                              </div>\r\n                              <p class=\"location-address\">{{data.accountName}}</p>\r\n                              <p class=\"contct-dtl\" *ngIf=\"data.contactName != null\">\r\n                                <em>\r\n                                  <strong> <i class=\"fa fa-user\"></i> {{data.contactName}}</strong> <i class=\"fa fa-phone\"></i>\r\n                                  <ng-container *ngIf=\"data.mobilephone\"><a href=\"javascript:void(0);\" (click)=\"onNumberClick(data.mobilephone)\">{{data.mobilephone}}</a></ng-container>\r\n                                </em>\r\n                              </p>\r\n                            </div>\r\n                          </ng-template>\r\n                        </ejs-treeview>\r\n                      </ng-container>\r\n                      <ng-template #elseBlock>\r\n                        <div class=\"text-center p-3 border\">No record(s) found.</div>\r\n                      </ng-template>\r\n                      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSaveunSchd\" class=\"loader-popup\"></app-loader>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n          <ng-container *ngSwitchCase=\"'list'\">\r\n            <div class=\"col-12 col-lg-12 col-md-12\">\r\n              <ngx-datatable #table\r\n                             class=\"bootstrap table table-hover table-dynamic datatable-custom-height w-100\"\r\n                             [rows]=\"columndata\"\r\n                             [columnMode]=\"'force'\"\r\n                             [headerHeight]=\"40\"\r\n                             [footerHeight]=\"40\"\r\n                             [rowHeight]=\"40\"\r\n                             [externalPaging]=\"true\"\r\n                             [externalSorting]=\"true\"\r\n                             [loadingIndicator]=\"loadSave\"\r\n                             [count]=\"totalRecords\"\r\n                             [limit]=\"pageSizeValue\"\r\n                             (sort)=\"onSort($event)\"\r\n                             [offset]=\"currentPage\"\r\n                             [scrollbarH]=\"true\"\r\n                             [selectionType]=\"SelectionType.checkbox\"\r\n                             [selectAllRowsOnPage]=\"false\"\r\n                             [selected]=\"selected\"\r\n                             (select)=\"onSelect($event)\">\r\n                <ngx-datatable-column [width]=\"42\"\r\n                                      [sortable]=\"false\"\r\n                                      [canAutoResize]=\"false\"\r\n                                      [draggable]=\"false\"\r\n                                      [resizeable]=\"false\"\r\n                                      [headerCheckboxable]=\"true\"\r\n                                      [checkboxable]=\"true\">\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                    <div *ngIf=\"col.COLUMN_NAME == 'AppointmentNumber'\">\r\n                      <a class=\" view-list\" [routerLink]=\"['/serviceappointment/view',row.id]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n                    </div>\r\n\r\n                    <div *ngIf=\"col.COLUMN_NAME != 'AppointmentNumber'\">\r\n                      <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                        <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                        <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                      </div>\r\n                      <div [title]=\"(row[col.COLUMN_NAME] | DateTimeToLocal)\" *ngIf=\"col.DATA_TYPE=='date' || col.DATA_TYPE=='datetime' || col.FieldType == 'datetime'\">\r\n                        {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                      </div>\r\n                      <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.DATA_TYPE!='datetime' && col.DATA_TYPE!='bit' && col.FieldType != 'select' && col.FieldType != 'datetime'\">\r\n                        {{row[col.COLUMN_NAME]}}\r\n                      </div>\r\n                      <div *ngIf=\"col.FieldType == 'select'\">\r\n                        <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                          {{row[col.COLUMN_NAME]}}\r\n                        </div>\r\n                        <div *ngIf=\"col.FieldFrom==null\">\r\n                          <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                            <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                              {{itemColorCode.color}}\r\n                            </div>\r\n                            <div *ngIf=\"itemColorCode.colorkey!=undefined\" style=\"max-width:150px !important;\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                              {{itemColorCode.color}}\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ng-template>\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                    <span class=\"actions rw_act\">\r\n                      <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.id\" aria-hidden=\"true\"></i>\r\n                      <span class=\"action-list-box sevenelement{{row.id}}\">\r\n                        <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:350px;\">\r\n                          <a class=\"actions-onclick view-list\" [routerLink]=\"['/serviceappointment/view',row.id]\" href=\"javascript:void(0);\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>\r\n\r\n                          <a *ngIf=\"isUpdate && (row.conditionstatus!='Completed' && row.conditionstatus!='Canceled')\" class=\"actions-onclick view-list\" [routerLink]=\"['/serviceappointment/addeditservicesappointment',row.id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success mr-2\"></i></a>\r\n                          <a *ngIf=\"isUpdate && (row.conditionstatus=='Completed' || row.conditionstatus=='Canceled')\" class=\"actions-onclick view-list\" title=\"Edit\"><i class=\"fa fa-pencil text-secondary mr-2\"></i></a>\r\n\r\n                          <a *ngIf=\"row.conditionstatus=='Completed' || row.conditionstatus=='Canceled'\" class=\"actions-onclick view-list\" href=\"javascript:void(0);\"\r\n                             title=\"Scheduled Appointment\"><i class=\"fa fa-clock-o text-secondary mr-2\"></i></a>\r\n\r\n                          <a *ngIf=\"row.conditionstatus!='Completed' && row.conditionstatus!='Canceled'\" class=\"actions-onclick view-list\" (click)=\"AddAssignedResources(row.id)\" href=\"javascript:void(0);\"\r\n                             title=\"Scheduled Appointment\"><i class=\"fa fa-clock-o text-primary mr-2\"></i></a>\r\n\r\n                          <a *ngIf=\"row.conditionstatus=='Completed' && isAudit\" class=\"actions-onclick view-list\" (click)=\"auditpopup(row.id,false)\" href=\"javascript:void(0);\"\r\n                             title=\"Audit\"><i class=\"fa fa-comment text-primary mr-2\"></i></a>\r\n\r\n                          <a *ngIf=\"row.conditionstatus=='Completed'\" class=\"actions-onclick view-list\" (click)=\"auditpopup(row.id,true)\" href=\"javascript:void(0);\"\r\n                             title=\"View Audit\"><i class=\"fa fa-list-ul text-primary mr-2\"></i></a>\r\n\r\n                          <a class=\"actions-onclick view-list\" (click)=\"showattendancemodel(row.id)\" href=\"javascript:void(0);\"\r\n                             title=\"Attendance\"><i class=\"fa fa-calendar-check-o text-info mr-2\"></i></a>\r\n\r\n                          <!--<a class=\"actions-onclick view-list\" [routerLink]=\"['/serviceappointment/addeditservicesappointment',row.id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success mr-2\"></i></a>-->\r\n                          <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                          <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n                        </span>\r\n                      </span>\r\n                    </span>\r\n                  </ng-template>\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-footer>\r\n                  <ng-template ngx-datatable-footer-template\r\n                               let-rowCount=\"rowCount\"\r\n                               let-pageSize=\"pageSize\"\r\n                               let-selectedCount=\"selectedCount\"\r\n                               let-currentPage=\"curPage\"\r\n                               let-offset=\"offset\"\r\n                               let-isVisible=\"isVisible\">\r\n                    <div>\r\n                      <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                        <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                          <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                     bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                      {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n                    </div>\r\n                    <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                     [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                     [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                     [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                     [page]=\"curPage\"\r\n                                     [size]=\"pageSizeValue\"\r\n                                     [count]=\"totalRecords\"\r\n                                     [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                     (change)=\"setPage($event)\"\r\n                                     [ngClass]=\"{'text-lg-right':true,'text-md-right':true}\">\r\n                    </datatable-pager>\r\n                  </ng-template>\r\n                </ngx-datatable-footer>\r\n              </ngx-datatable>\r\n            </div>\r\n          </ng-container>\r\n          <ng-container *ngSwitchCase=\"'calender'\">\r\n            <div [ngClass]=\"{'col-md-6  service-appointment-calender-top-bar calendar-table':showCalendarList,'col-md-12 service-appointment-calender-top-bar calendar-table':!showCalendarList}\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-8\">\r\n                  <div class=\"form-group\">\r\n                    <ng-select [items]=\"appointmenttypes\"\r\n                               [loading]=\"loadSave\"\r\n                               placeholder=\"Select Appointment Type\"\r\n                               bindLabel=\"name\"\r\n                               bindValue=\"id\"\r\n                               [(ngModel)]=\"appointmentTypeSelectedId\"\r\n                               (change)=\"appointmenttypedll($event.id)\"\r\n                               [clearable]=\"false\"\r\n                               [searchable]=\"false\"></ng-select>\r\n                  </div>\r\n\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                  <div (click)=\"ToggleCalendarList()\"><i class=\"fa fa-toggle-on\" *ngIf=\"showCalendarList\" style=\"font-size: 40px; float: right; padding: 0px;\"></i> <i class=\"fa fa-toggle-off\" *ngIf=\"!showCalendarList\" style=\"font-size: 40px; float: right; padding: 0px;\"></i></div>\r\n\r\n                </div>\r\n                <div class=\"col-md-12\"><hr /></div>\r\n              </div>\r\n\r\n              <ng-fullcalendar #fullcalendar\r\n                               deepChangeDetection=\"true\"\r\n                               (clickButton)=\"clickButton($event)\"\r\n                               (eventDragStop)=\"eventDragStop($event)\"\r\n                               [eventsModel]=\"eventsModel\"\r\n                               [options]=\"options\"\r\n                               (eventRender)=\"eventRender($event)\"\r\n                               (dateClick)=\"dateClick($event)\"\r\n                               (eventClick)=\"eventClick($event)\" [ngClass]=\"{'smallcalview':showCalendarList}\"></ng-fullcalendar>\r\n            \r\n\r\n            </div>\r\n            <div *ngIf=\"showCalendarList\" class=\"col-md-6 pagintn-wid\">\r\n              <ngx-datatable #tablecalender\r\n                             class=\"bootstrap table table-hover table-dynamic datatable-custom-height w-100\"\r\n                             [rows]=\"columndata\"\r\n                             [columnMode]=\"'force'\"\r\n                             [headerHeight]=\"40\"\r\n                             [footerHeight]=\"40\"\r\n                             [rowHeight]=\"40\"\r\n                             [externalPaging]=\"true\"\r\n                             [externalSorting]=\"true\"\r\n                             [loadingIndicator]=\"loadSave\"\r\n                             [count]=\"totalRecords\"\r\n                             [limit]=\"pageSizeValue\"\r\n                             (sort)=\"onSort($event)\"\r\n                             [offset]=\"currentPage\"\r\n                             [scrollbarH]=\"true\"\r\n                             [selectionType]=\"SelectionType.checkbox\"\r\n                             [selectAllRowsOnPage]=\"false\"\r\n                             [selected]=\"selected\"\r\n                             (select)=\"onSelect($event)\">\r\n                <ngx-datatable-column [width]=\"42\"\r\n                                      [sortable]=\"false\"\r\n                                      [canAutoResize]=\"false\"\r\n                                      [draggable]=\"false\"\r\n                                      [resizeable]=\"false\"\r\n                                      [headerCheckboxable]=\"true\"\r\n                                      [checkboxable]=\"true\">\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                    <div *ngIf=\"col.COLUMN_NAME == 'AppointmentNumber'\">\r\n                      <a class=\" view-list\" [routerLink]=\"['/serviceappointment/view',row.id]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n                    </div>\r\n\r\n                    <div *ngIf=\"col.COLUMN_NAME != 'AppointmentNumber'\">\r\n                      <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                        <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                        <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                      </div>\r\n                      <div [title]=\"(row[col.COLUMN_NAME] | DateTimeToLocal)\" *ngIf=\"col.DATA_TYPE=='date' || col.DATA_TYPE=='datetime' || col.FieldType == 'datetime'\">\r\n                        {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                      </div>\r\n                      <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.DATA_TYPE!='datetime' && col.DATA_TYPE!='bit' && col.FieldType != 'select' && col.FieldType != 'datetime'\">\r\n                        {{row[col.COLUMN_NAME]}}\r\n                      </div>\r\n                      <div *ngIf=\"col.FieldType == 'select'\">\r\n                        <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                          {{row[col.COLUMN_NAME]}}\r\n                        </div>\r\n                        <div *ngIf=\"col.FieldFrom==null\">\r\n                          <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                            <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                              {{itemColorCode.color}}\r\n                            </div>\r\n                            <div *ngIf=\"itemColorCode.colorkey!=undefined\" style=\"max-width:150px !important;\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                              {{itemColorCode.color}}\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ng-template>\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                    <span class=\"actions rw_act\">\r\n                      <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.id\" aria-hidden=\"true\"></i>\r\n                      <span class=\"action-list-box sevenelement{{row.id}}\">\r\n                        <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:350px;\">\r\n                          <a class=\"actions-onclick view-list\" [routerLink]=\"['/serviceappointment/view',row.id]\" href=\"javascript:void(0);\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>\r\n\r\n                          <a *ngIf=\"isUpdate && (row.conditionstatus!='Completed' && row.conditionstatus!='Canceled')\" class=\"actions-onclick view-list\" [routerLink]=\"['/serviceappointment/addeditservicesappointment',row.id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success mr-2\"></i></a>\r\n                          <a *ngIf=\"isUpdate && (row.conditionstatus=='Completed' || row.conditionstatus=='Canceled')\" class=\"actions-onclick view-list\" title=\"Edit\"><i class=\"fa fa-pencil text-secondary mr-2\"></i></a>\r\n\r\n                          <a *ngIf=\"row.conditionstatus=='Completed' || row.conditionstatus=='Canceled'\" class=\"actions-onclick view-list\" href=\"javascript:void(0);\"\r\n                             title=\"Scheduled Appointment\"><i class=\"fa fa-clock-o text-secondary mr-2\"></i></a>\r\n\r\n                          <a *ngIf=\"row.conditionstatus!='Completed' && row.conditionstatus!='Canceled'\" class=\"actions-onclick view-list\" (click)=\"AddAssignedResources(row.id)\" href=\"javascript:void(0);\"\r\n                             title=\"Scheduled Appointment\"><i class=\"fa fa-clock-o text-primary mr-2\"></i></a>\r\n\r\n                          <a *ngIf=\"row.conditionstatus=='Completed' && isAudit\" class=\"actions-onclick view-list\" (click)=\"auditpopup(row.id,false)\" href=\"javascript:void(0);\"\r\n                             title=\"Audit\"><i class=\"fa fa-comment text-primary mr-2\"></i></a>\r\n\r\n                          <a *ngIf=\"row.conditionstatus=='Completed'\" class=\"actions-onclick view-list\" (click)=\"auditpopup(row.id,true)\" href=\"javascript:void(0);\"\r\n                             title=\"View Audit\"><i class=\"fa fa-list-ul text-primary mr-2\"></i></a>\r\n\r\n\r\n                          <a class=\"actions-onclick view-list\" (click)=\"showattendancemodel(row.id)\" href=\"javascript:void(0);\"\r\n                             title=\"Attendance\"><i class=\"fa fa-calendar-check-o text-info mr-2\"></i></a>\r\n\r\n                          <!--<a class=\"actions-onclick view-list\" [routerLink]=\"['/serviceappointment/addeditservicesappointment',row.id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success mr-2\"></i></a>-->\r\n                          <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                          <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n                        </span>\r\n                      </span>\r\n                    </span>\r\n                  </ng-template>\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-footer>\r\n                  <ng-template ngx-datatable-footer-template\r\n                               let-rowCount=\"rowCount\"\r\n                               let-pageSize=\"pageSize\"\r\n                               let-selectedCount=\"selectedCount\"\r\n                               let-currentPage=\"curPage\"\r\n                               let-offset=\"offset\"\r\n                               let-isVisible=\"isVisible\">\r\n                    <div>\r\n                      <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                        <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                          <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                     bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                    co\r\n                    <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n\r\n\r\n                      <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{totalRecords}}  enteries-->\r\n                      {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n                    </div>\r\n                    <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                     [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                     [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                     [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                     [page]=\"curPage\"\r\n                                     [size]=\"pageSizeValue\"\r\n                                     [count]=\"totalRecords\"\r\n                                     [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                     (change)=\"setPage($event)\"\r\n                                     [ngClass]=\"{'text-lg-right':true,'text-md-right':true}\">\r\n                    </datatable-pager>\r\n                  </ng-template>\r\n                </ngx-datatable-footer>\r\n              </ngx-datatable>\r\n            </div>\r\n\r\n          </ng-container>\r\n          <ng-container *ngSwitchCase=\"'map'\">\r\n            <div class=\"col-12 col-lg-12 col-md-12\">\r\n              <p-gmap [options]=\"optionsMap\" (onOverlayClick)=\"handleOverlayClick($event)\" [overlays]=\"overlays\" [style]=\"{'width':'100%','height':'calc(100vh - 210px)'}\"></p-gmap>\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"serviceappointment\" subModuleName=\"serviceappointment\"></app-searchfilteradd>\r\n<app-manageviewnew (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"serviceappointment\" subModuleName=\"serviceappointment\"></app-manageviewnew>\r\n<app-addassignedresourcepopup #addAssignedResourcesPopup (AssignedResourceEmitter)=\"refreshList($event)\"></app-addassignedresourcepopup>\r\n<app-auditpopup #auditsPopup></app-auditpopup>\r\n<app-filterpopup #filterPopup (getFilterData)=\"getFilterData($event)\"></app-filterpopup>\r\n<app-auditchecklistpopup #auditCheckListsPopup></app-auditchecklistpopup>\r\n<app-service-crew-members-popup #ServiceCrewMembersList></app-service-crew-members-popup>\r\n\r\n\r\n<div bsModal #attendancemodel=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Attendance</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeattendancepopup()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; min-height:300px; max-height:600px\">\r\n\r\n        <div class=\"col-lg-12\">\r\n          <div class=\"table-responsive\">\r\n            <form [formGroup]=\"attendanceform\" autocomplete=\"off\">\r\n             <div class=\"row\">\r\n              <div class=\"col-lg-6\">\r\n                <label>Start Date<span class=\"text-danger\"></span></label>\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"ScheduleStartDate\" disabled>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <label>End Date<span class=\"text-danger\"></span></label>\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"ScheduleEndDate\" disabled>\r\n              </div>\r\n             </div>\r\n             <br>\r\n             <div>\r\n              <ng-container>\r\n                <div id=\"accordion\" >\r\n                 <div  class=\"panel active\" *ngFor=\"let date of attendanceData\">\r\n                 \r\n                   <div class=\"panel-heading\">\r\n                     <h4 class=\"panel-title\">\r\n                       <a href=\"#{{date}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>{{date}} {{ParseDate(date) > ParseDate(defaultDate) ?  '(View only)': ''}}</span>\r\n                       </a>\r\n                     </h4>\r\n                   </div>\r\n                   <div id=\"{{date}}\" class=\"panel-collapse collapse active show\" [ngStyle]=\"ParseDate(date) > ParseDate(defaultDate) ? {'pointer-events': 'none'} : {}\">\r\n                     <div class=\"panel-body row px-3\">\r\n                       <div class=\"table-responsive\">\r\n                         <div class=\"table table-striped\">\r\n                           <table class=\"table table-striped\" style=\"min-width:auto;\">\r\n                             <thead>\r\n                               <tr>\r\n                                 <th>Resource Name</th>\r\n                                 <th>Present</th>\r\n                                 <th>Hours</th>\r\n                               </tr>\r\n                             </thead>\r\n\r\n                             <tbody formArrayName=\"fields\">\r\n                               <tr [formGroupName]=\"i\" *ngFor=\"let field of fields.controls; let i=index\" class=\"position-relative\">\r\n                                   <td *ngIf=\"field.get('attendanceDate') ? field.get('attendanceDate').value == date : false\">\r\n                                     <div class=\"form-group\" >\r\n                                       <input type=\"text\"  class=\"form-control\" formControlName=\"resourcename\" disabled>\r\n                                     </div>                                    \r\n                                   </td>\r\n                                   <td *ngIf=\"field.get('attendanceDate') ? field.get('attendanceDate').value == date : false\">\r\n                                     <label class=\"switch\">\r\n                                       <input class=\"custom-control-input\" type=\"checkbox\" formControlName=\"isPresent\">\r\n                                       <span class=\"slider round\"><span>Yes</span></span>\r\n\r\n                                     </label>\r\n                                   </td>                                   \r\n                                   <td *ngIf=\"field.get('attendanceDate') ? field.get('attendanceDate').value == date : false\">\r\n                                     <div class=\"form-group\" >\r\n                                       <input type=\"text\" [readonly]=\"!field.get('isPresent').value\" class=\"form-control\" maxlength=\"3\" (keypress)=\"numberOnly($event)\" formControlName=\"hours\" placeholder=\"Please enter hour\">\r\n                                     </div>\r\n                                   </td>\r\n                               </tr>\r\n                             </tbody>\r\n                           </table>\r\n                         </div>\r\n                       </div>\r\n                     </div>\r\n                  </div>\r\n                 </div>\r\n                </div>\r\n                </ng-container>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <a class=\"btn btn-success text-white\" (click)=\"onSubmitattendance()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n        <button type=\"submit\" class=\"btn btn-danger text-white\" (click)=\"closeattendancepopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div bsModal #serviceAppointmentdetail=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-xl modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Service Appointment Detail</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeAppointmentDetailpopup()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; min-height:300px; max-height:600px\">\r\n        <div class=\"col-lg-12 p-1\">\r\n          <div class=\"table-responsive\">\r\n            <div class=\"tab-pane fade active show p-0 border-0\" id=\"details\" role=\"tabpanel\" aria-labelledby=\"profile-tab\" style=\"background:none\">\r\n              <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n                <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                  <ng-container *ngFor=\"let item of formControlList\">\r\n                    <div class=\"panel active\">\r\n                      <div class=\"panel-heading\">\r\n                        <h4 class=\"panel-title\">\r\n                          <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                            <span> {{item.group_name}}</span>\r\n                          </a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                        <div class=\"panel-body row px-0 mt-0\">\r\n                          <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                            <div class=\"input-group border-bottom\">\r\n                              <div class=\"col-sm-12 col-md-6 px-0\">\r\n                                <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                              </div>\r\n                              <div class=\"col-sm-12 col-md-6\">\r\n                                <span *ngIf='inner.dt_code==\"datetime\" ' class=\"py-2 d-block\">\r\n                                  {{ inner.value | DateTimeToLocal}}\r\n                                </span>\r\n\r\n                                <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null && inner.dt_code!='datetime'\" class=\"py-2 d-block\">\r\n                                  <span *ngIf=\"!(inner.value | split:'::':1)\">{{ inner.value }}</span>\r\n                                  <span *ngIf=\"(inner.value | split:'::':1)\" class=\"text-white p-1 rounded\" [style.background-color]=\"inner.value | split:'::':1 \">  {{ inner.value| split:'::':0 }}</span>\r\n                                </span>\r\n                                <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null && inner.dt_code!='datetime'\" class=\"py-2 d-block\">\r\n                                  <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                                </span>\r\n\r\n                                <!--============================== For CheckBox ===========================-->\r\n                                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                                  <div class=\"form-check form-check-inline\">\r\n                                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                                      <label class=\"switch  mb-0\">\r\n                                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                      </label>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                                <!--============================== For CheckBox ===========================-->\r\n                                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                                  <div class=\"form-check form-check-inline\">\r\n                                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                                      <label class=\"switch mb-0\">\r\n                                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                      </label>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ng-container>\r\n                </form>\r\n\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#assignedResources\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Assigned Resources ({{AssignedResourcesCount}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"assignedResources\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <!--<a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                    (click)=\"AddAssignedResources()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add</a>-->\r\n\r\n                    <div class=\"panel-body row mt-0  px-3\">\r\n                      <div class=\"table-responsive\">\r\n                        <div class=\"table table-striped\">\r\n                          <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                         [rows]=\"lstAssignedResources.data\"\r\n                                         [columnMode]=\"'force'\"\r\n                                         [scrollbarH]=\"true\"\r\n                                         [rowHeight]=\"'40'\"\r\n                                         [headerHeight]=\"40\"\r\n                                         [footerHeight]=\"40\"\r\n                                         [externalPaging]=\"true\"\r\n                                         [externalSorting]=\"true\"\r\n                                         [loadingIndicator]=\"loadSave\"\r\n                                         [count]=\"lstAssignedResources.pager.totalItems\"\r\n                                         [offset]=\"currentPageAssignedRes\"\r\n                                         [limit]=\"pageSizeValueAssignedResList\"\r\n                                         (page)='setPageAssignedResList($event)'\r\n                                         (sort)=\"onSortAssignedResList($event)\">\r\n\r\n                            <ngx-datatable-column name=\"Service Appointment\" prop=\"serviceAppointment\" [sortable]=\"true\"></ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Service Resource\" prop=\"serviceResource\" [sortable]=\"true\"></ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Service Crew\" prop=\"ServiceCrew\" [sortable]=\"true\"></ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Estimated Travel Time\" prop=\"estimatedTravelTime\" [sortable]=\"true\">\r\n                            </ngx-datatable-column>\r\n                            <!--<ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                                <div class=\"text-center\">\r\n                                  <a href=\"javascript:void(0);\" (click)=\"EditAssignedResource(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                                  <a href=\"javascript:void(0);\" (click)=\"deleteAssignedResource(row,'AssignedResource')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                                </div>\r\n\r\n                              </ng-template>\r\n                            </ngx-datatable-column>-->\r\n                            <ngx-datatable-footer>\r\n                              <ng-template ngx-datatable-footer-template\r\n                                           let-rowCount=\"rowCount\"\r\n                                           let-pageSize=\"lstAssignedResources.pager.pageSize\"\r\n                                           let-selectedCount=\"selectedCount\"\r\n                                           let-currentPage=\"lstAssignedResources.pager.currentPage\"\r\n                                           let-offset=\"offset\"\r\n                                           let-isVisible=\"isVisible\">\r\n                                <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                  {{commonService.PageString(lstAssignedResources.pager.currentPage,lstAssignedResources.pager.pageSize,rowCount)}}\r\n                                </div>\r\n\r\n                                <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                                 [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                                 [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                                 [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                                 [page]=\"lstAssignedResources.pager.currentPage\"\r\n                                                 [size]=\"lstAssignedResources.pager.pageSize\"\r\n                                                 [count]=\"lstAssignedResources.pager.totalItems\"\r\n                                                 [hidden]=\"!((rowCount / lstAssignedResources.pager.pageSize) > 1)\"\r\n                                                 (change)=\"setAssignedResourcesPageNo($event)\">\r\n                                </datatable-pager>\r\n                              </ng-template>\r\n\r\n                            </ngx-datatable-footer>\r\n                          </ngx-datatable>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <!--<a class=\"btn btn-success text-white\" (click)=\"onSubmitattendance()\"><i class=\"fa fa-save\"></i> Submit</a>-->\r\n        <button type=\"submit\" class=\"btn btn-danger text-white\" (click)=\"closeAppointmentDetailpopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>-->\r\n</div>\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n\r\n<!--<ng-container *ngIf=\"isVisibleDialer\">\r\n  <div>\r\n    <app-voicecall #voiceCallPopup Default=\"true\" (refreshParentEmitter)=\"closeWelcomeCall()\"></app-voicecall>\r\n  </div>\r\n</ng-container>-->\r\n\r\n<!--<div class=\"form-popup\" id=\"myForm\">\r\n \r\n  <form class=\"form-container\">\r\n    <p><strong><i class=\"fa fa-address-card\"></i> Account Name:</strong> {{popupdata.AccountName}}</p>\r\n    <p><strong><i class=\"fa fa-envelope\"></i> Email:</strong> {{popupdata.Email}}</p>\r\n    <p><strong><i class=\"fa fa-user\"></i> Contact Name:</strong> {{popupdata.Name}}</p>\r\n    <p><strong><i class=\"fa fa-phone\"></i> Phone:</strong> {{popupdata.phone}}</p>\r\n    <p><strong><i class=\"fa fa-map-marker\"></i> Location:</strong> {{popupdata.Address}}</p>\r\n    <p><strong><i class=\"fa fa-map\"></i> Service Teritory:</strong> {{popupdata.teritory}}</p>\r\n    <p><strong><i class=\"fa fa-signal\"></i> System Size:</strong> {{popupdata.Size}}</p>\r\n    <p><strong><i class=\"fa fa-location-arrow\"></i> WareHouse:</strong> {{popupdata.location}}</p>\r\n   \r\n  </form>\r\n</div>--> \r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/servicesappointmentmapview.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/servicesappointmentmapview.component.html ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Schedular</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/serviceappointment\">Manage Service Appointment</a></li>\r\n      <li class=\"active\">Schedular</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n    <app-mapview moduleName=\"serviceappointment\" subModuleName=\"serviceappointment\" ></app-mapview>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/viewservicesappointment.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/viewservicesappointment.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Service Appointment Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/serviceappointment\">Manage Service Appointment</a></li>\r\n      <li><a [routerLink]=\"['/serviceappointment/addeditservicesappointment/',servicesappointmentid]\">Edit Service Appointment</a></li>\r\n      <!--<li class=\"active\">Service Appointment Details</li>-->\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-list bg-info text-white float-left p-1 mr-2\"></i>\r\n    <span class=\"float-left  w-85-res\"><span>Service Appointment</span> {{AppointmentNumber}}</span>\r\n    <span class=\"cntnt-right-btn mr15 btn-iconres\">\r\n      <a *ngIf=\"disabledEdit\" class=\"btn btn-secondary text-white mr-2\"><i class=\"fa fa-pencil\"></i> Edit</a>\r\n      <a *ngIf=\"!disabledEdit\" [routerLink]=\"['/serviceappointment/addeditservicesappointment/',servicesappointmentid]\" class=\"btn btn-success mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n  <div class=\"col-12 float-left d-md-flex p-0 py-resp py-2 py-sm-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n      <div class=\"col py-2\" *ngIf=\"item.ColumnName!='AppointmentNumber' && item.ColumnName!='Status'\">\r\n        <span *ngIf=\"item.field_route==null\" class=\"d-block\">\r\n          <strong>{{ item.display_name}}:</strong>\r\n          <ng-container *ngIf=\"item.dt_code=='datetime' || item.dt_code=='date'\">{{ item.value | DateTimeToLocal}}</ng-container>\r\n          <ng-container *ngIf=\"item.dt_code!='datetime' && item.dt_code!='date'\">{{ item.value }}</ng-container>\r\n        </span>\r\n        <span *ngIf=\"item.field_route!=null\" class=\"d-block\"><strong>{{ item.display_name}}:</strong> <a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\"> {{ item.value}}</a></span>\r\n        <!--<span class=\"d-block\"><strong>{{ item.display_name}}:</strong> {{ item.value}}</span>-->\r\n      </div>\r\n\r\n      <div class=\"col py-3\" *ngIf=\"item.ColumnName=='Status'\">\r\n        <span class=\"d-block\"><strong>{{ item.display_name}}:</strong> <span class=\"text-white p-1 ml-1 rounded\" [style.background-color]=\"item.value | split:'::':1 \">{{ item.value | split:'::':0}}</span></span>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"card  mt-3 mb-0 border-0 \" style=\"background:none\">\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col-sm-12 col-lg-8\">\r\n            <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                <ng-container *ngFor=\"let item of formControlList\">\r\n                  <div class=\"panel active\">\r\n                    <div class=\"panel-heading\">\r\n                      <h4 class=\"panel-title\">\r\n                        <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                          <span> {{item.group_name}}</span>\r\n                        </a>\r\n                      </h4>\r\n                    </div>\r\n                    <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                      <div class=\"panel-body row px-0 mt-0\">\r\n                        <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                          <div class=\"input-group border-bottom\">\r\n                            <div class=\"col-sm-12 col-md-6 px-0\">\r\n                              <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                            </div>\r\n                            <div class=\"col-sm-12 col-md-6\">\r\n                              <span *ngIf='inner.dt_code==\"datetime\" ' class=\"py-2 d-block\">\r\n                                {{ inner.value | DateTimeToLocal}}\r\n                              </span>\r\n\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null && inner.dt_code!='datetime'\" class=\"py-2 d-block\">\r\n                                <span *ngIf=\"!(inner.value | split:'::':1)\">{{ inner.value }}</span>\r\n                                <span *ngIf=\"(inner.value | split:'::':1)\" class=\"text-white p-1 rounded\" [style.background-color]=\"inner.value | split:'::':1 \">  {{ inner.value| split:'::':0 }}</span>\r\n                              </span>\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null && inner.dt_code!='datetime'\" class=\"py-2 d-block\">\r\n                                <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                              </span>\r\n\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch  mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ng-container>\r\n              </form>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-12 col-lg-4 relatedtab\">\r\n            <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n\r\n              <!--==================================================== NotesAttachments ===========================================================-->\r\n              <!--<div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#notesAttachments\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Notes & Attachments ({{NotesAttachmentsCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"notesAttachments\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body row px-3\">\r\n                    <div class=\"table-responsive\">\r\n                      <div class=\"table table-striped\">\r\n\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>-->\r\n              <!--==============================================================================================================================-->\r\n\r\n\r\n              <app-files title=\"Files\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{servicesappointmentid}}\"></app-files>\r\n\r\n              <!--====================================================== Notes =============================================================-->\r\n              <!--<div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Notes ({{NotesCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"notes\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                     (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add</a>\r\n\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"NotespagedData.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"NotespagedData.pager.totalItems\"\r\n                                     [offset]=\"currentPageAssignedRes\"\r\n                                     [limit]=\"pageSizeValueAssignedResList\"\r\n                                     (page)='setPageNotes($event)'\r\n                                     (sort)=\"onSortNotes($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Note Title\" prop=\"note_name\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.note_name|truncate}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Description\" sortable=\"false\" prop=\"note_description\" [sortable]=\"true\" [minWidth]=\"150\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div *ngIf='row.note_description!=null || row.note_description!=\"\"'>\r\n                              <span>{{row.note_description}}</span>\r\n                            </div>\r\n                            <div *ngIf='row.note_description==null || row.note_description==\"\"'>\r\n                              <span>N/A</span>\r\n                            </div>\r\n                          </ng-template>\r\n\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column name=\"Created By\" sortable=\"false\" prop=\"createdby\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Created At\" prop=\"created_on\" sortable=\"true\" [minWidth]=\"130\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.created_on | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div class=\"text-center\">\r\n                              <a href=\"javascript:;\" (click)=\"ViewNotes(row)\" title=\"View Note\"><i class=\"fa fa-eye pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"EditNotes(row)\" title=\"Edit Note\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"DeleteNote(row,'AssignedResource')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                            </div>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"NotespagedData.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"NotespagedData.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                                {{commonService.PageString(NotespagedData.pager.currentPage,NotespagedData.pager.pageSize,rowCount)}}\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"NotespagedData.pager.currentPage\"\r\n                                             [size]=\"NotespagedData.pager.pageSize\"\r\n                                             [count]=\"NotespagedData.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / NotespagedData.pager.pageSize) > 1)\"\r\n                                             (change)=\"setNotesPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                  </div>\r\n                </div>\r\n                </div>\r\n              </div>-->\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Notes ({{notescount}}) </span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n\r\n\r\n                <div id=\"panelBodynine\" class=\"panel-collapse active show p-0 border-0\" data-parent=\"#accordion\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                     (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> New</a>\r\n\r\n\r\n\r\n                  <div id=\"notes\" class=\"panel-collapse collapse active show\">\r\n\r\n                    <app-newnoteslist #listnotesmodel subModuleName=\"serviceappointment\" [AccountId]=\"accountId\"\r\n                                      [ObjectRefId]=\"servicesappointmentid\" (newItemEvent)=\"addItem($event)\">\r\n\r\n                    </app-newnoteslist>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!--==============================================================================================================================-->\r\n              <!--======================================================Service Appointment History=============================================================-->\r\n              <!--<div class=\"panel active\">\r\n                        <div class=\"panel-heading\">\r\n                          <h4 class=\"panel-title\">\r\n                            <a href=\"#serviceAppointmentHistory\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                              <span>Service Appointment History ({{ContactCount}})</span>\r\n                            </a>\r\n                          </h4>\r\n                        </div>\r\n                        <div id=\"serviceAppointmentHistory\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                          <div class=\"panel-body row px-3\">\r\n                            <div class=\"table-responsive\">\r\n                              <div class=\"table table-striped\">\r\n                                <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                               [rows]=\"lstserviceAppointmentHistory.data\"\r\n                                               [columnMode]=\"'force'\"\r\n                                               [headerHeight]=\"40\"\r\n                                               [footerHeight]=\"40\"\r\n                                               [rowHeight]=\"'auto'\"\r\n\r\n                                               [externalPaging]=\"true\"\r\n                                               [externalSorting]=\"true\"\r\n                                               [loadingIndicator]=\"loadSave\"\r\n                                               [count]=\"lstserviceAppointmentHistory.pager.totalItems\"\r\n                                               [offset]=\"lstserviceAppointmentHistory.pager.currentPage\"\r\n                                               [limit]=\"lstserviceAppointmentHistory.pager.pageSize\"\r\n                                               (page)='setContactPageNo($event)'\r\n                                               (sort)=\"onContactsSort($event)\">\r\n\r\n                          <ngx-datatable-column name=\"Date\" prop=\"Date\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Field\" prop=\"Field\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"User\" prop=\"User\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Original Value\" prop=\"OriginalValue\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"New Value\" prop=\"NewValue\" [sortable]=\"false\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <label class=\"switch  mb-0\">\r\n                                <input type=\"checkbox\" id=\"chk_{{row.Id}}\" [checked]=\"row.IsPrimary\" disabled>\r\n                                <span class=\"slider round\" id=\"chk_{{row.Id}}\"></span>\r\n                              </label>\r\n                            </ng-template>\r\n\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Enable Login\" prop=\"EnableUser\" [sortable]=\"false\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <label class=\"switch  mb-0\">\r\n                                <input type=\"checkbox\" id=\"chk_{{row.Id}}\" [checked]=\"row.EnableUser\" disabled>\r\n                                <span class=\"slider round\" id=\"chk_{{row.Id}}\"></span>\r\n                              </label>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstserviceAppointmentHistory.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstserviceAppointmentHistory.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\">\r\n                                {{rowCount}} total\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                               [page]=\"lstserviceAppointmentHistory.pager.currentPage\"\r\n                                               [size]=\"lstserviceAppointmentHistory.pager.pageSize\"\r\n                                               [count]=\"lstserviceAppointmentHistory.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstserviceAppointmentHistory.pager.pageSize) > 1)\"\r\n                                               (change)=\"setContactPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>-->\r\n              <!--==============================================================================================================================-->\r\n              <!--======================================================Approval History=============================================================-->\r\n              <!--<div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#approvalHistory\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>approvalHistory ({{ApprovalHistoryCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"proposals\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body row px-3\">\r\n                    <div class=\"table-responsive\">\r\n                      <div class=\"table table-striped\">\r\n\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>-->\r\n              <!--==============================================================================================================================-->\r\n              <!--======================================================Assigned Resources=============================================================-->\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#assignedResources\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Assigned Resources ({{AssignedResourcesCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"assignedResources\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                     (click)=\"AddAssignedResources()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add</a>\r\n\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstAssignedResources.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstAssignedResources.pager.totalItems\"\r\n                                     [offset]=\"currentPageAssignedRes\"\r\n                                     [limit]=\"pageSizeValueAssignedResList\"\r\n                                     (page)='setPageAssignedResList($event)'\r\n                                     (sort)=\"onSortAssignedResList($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Service Appointment\" prop=\"serviceAppointment\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Service Resource\" prop=\"serviceResource\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Service Crew\" prop=\"ServiceCrew\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Estimated Travel Time\" prop=\"estimatedTravelTime\" [sortable]=\"true\">\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div class=\"text-center\">\r\n                              <a href=\"javascript:void(0);\" (click)=\"EditAssignedResource(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"deleteAssignedResource(row,'AssignedResource')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                            </div>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstAssignedResources.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstAssignedResources.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                              <!--Showing {{(lstAssignedResources.pager.currentPage - 1 )* lstAssignedResources.pager.pageSize + 1}}  to {{lstAssignedResources.pager.currentPage * lstAssignedResources.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                              {{commonService.PageString(lstAssignedResources.pager.currentPage,lstAssignedResources.pager.pageSize,rowCount)}}\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"lstAssignedResources.pager.currentPage\"\r\n                                             [size]=\"lstAssignedResources.pager.pageSize\"\r\n                                             [count]=\"lstAssignedResources.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstAssignedResources.pager.pageSize) > 1)\"\r\n                                             (change)=\"setAssignedResourcesPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!--==============================================================================================================================-->\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<!--=================================================== AddAssignedResourcesPopup ==================================================================-->\r\n<div class=\"modal fade in show\" bsModal #addAssignedResourcesPopup=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeAssignedResourcesPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; height:290px;\">\r\n        <form [formGroup]=\"addAssignedResourcesForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"row mb-2\">\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Service Appointment<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"serviceAppointment\" maxlength=\"50\" disabled\r\n                       [ngClass]=\"{'is-invalid': (serviceAppointment.invalid && (serviceAppointment.dirty || serviceAppointment.touched) && (serviceAppointment.errors?.required || serviceAppointment.errors?.maxlength)) }\" />\r\n                <small *ngIf=\"serviceAppointment.invalid && (serviceAppointment.dirty || serviceAppointment.touched) && serviceAppointment.errors?.required\"\r\n                       class=\"text-danger\">Service Appointment is required</small>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Service Resource:<span *ngIf=\"validityServiceResource\" class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"serviceResourceNames\" placeholder=\"Select Service Resource\"\r\n                           (clear)=\"onClearLang(serviceResourceNames)\" (keyup)=\"onKey($event,serviceResourceNames)\" (change)=\"changeValidators('serviceResourceId')\"\r\n                           (scrollToEnd)=\"onScrollToEnd(serviceResourceNames)\" [virtualScroll]=\"true\"\r\n                           formControlName=\"serviceResourceId\"\r\n                           [ngClass]=\"{'is-invalid': (serviceResourceId.invalid && (serviceResourceId.dirty || serviceResourceId.touched) && serviceResourceId.errors?.required)}\"\r\n                           bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                <small *ngIf=\"serviceResourceId.invalid && (serviceResourceId.dirty || serviceResourceId.touched) && serviceResourceId.errors?.required\"\r\n                       class=\"text-danger\">Please select Service Resource / Service Crew</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Service Crew:<span *ngIf=\"validityServiceCrew\" class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"serviceCrewNames\" placeholder=\"Select Service Crew\"\r\n                           (clear)=\"onClearLangServiceCrew(serviceCrewNames)\" (keyup)=\"onKeyServiceCrew($event,serviceCrewNames)\" (change)=\"changeValidators('serviceCrewId')\"\r\n                           (scrollToEnd)=\"onScrollToEndServiceCrew(serviceCrewNames)\" [virtualScroll]=\"true\"\r\n                           formControlName=\"serviceCrewId\"\r\n                           [ngClass]=\"{'is-invalid': (serviceCrewId.invalid && (serviceCrewId.dirty || serviceCrewId.touched) && serviceCrewId.errors?.required)}\"\r\n                           bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                <small *ngIf=\"serviceCrewId.invalid && (serviceCrewId.dirty || serviceCrewId.touched) && serviceCrewId.errors?.required\"\r\n                       class=\"text-danger\">Please select Service Resource / Service Crew</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Estimated Travel Time (Minutes)</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"number\" class=\"form-control\" formControlName=\"estimatedTravelTime\" maxlength=\"50\" />\r\n              </div>\r\n            </div>\r\n            <div class=\"d-none\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <label>Actual Travel Time (Minutes)</label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"number\" class=\"form-control\" formControlName=\"actualTravelTime\" maxlength=\"50\" />\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <label>Estimated Travel Time From Source:</label>\r\n                <div class=\"form-group\">\r\n                  <ng-select [items]=\"estimatedTravelTimeFromSourceNames\" placeholder=\"Select Estimated Travel Time From Source\" [loading]=\"loadSave\" placeholder=\"-- None --\" formControlName=\"estimatedTravelTimeFromSourceId\"\r\n                             bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <label>Approximate Travel Distance From:</label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"number\" class=\"form-control\" formControlName=\"approximateTravelDistanceForm\" maxlength=\"50\" />\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <label>Estimated Travel Time To Source:</label>\r\n                <div class=\"form-group\">\r\n                  <ng-select [items]=\"estimatedTravelTimeToSourceNames\" placeholder=\"Select Estimated Travel Time To Source\" [loading]=\"loadSave\" placeholder=\"Select Estimated Travel Time To Source\" formControlName=\"estimatedTravelTimeToSourceId\"\r\n                             bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <label>Approximate Travel Distance To:</label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"number\" class=\"form-control\" formControlName=\"approximateTravelDistanceTo\" maxlength=\"50\" />\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <label>Last Updated Epoch:</label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"number\" class=\"form-control\" formControlName=\"lastUpdatedEpoch\" maxlength=\"50\" />\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <label>Approximate Travel Time From (Minutes):</label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"number\" class=\"form-control\" formControlName=\"approximateTravelTimeForm\" maxlength=\"50\" />\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <label>Updated By Optimization:</label>\r\n                <div class=\"form-group\">\r\n                  <label class=\"switch\">\r\n                    <input type=\"checkbox\" id=\"customCheck1\" formControlName=\"isUpdatedByOptimization\">\r\n                    <span class=\"slider round\"><span>Yes</span></span>\r\n                  </label>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <label>Calculated Duration (Minutes):</label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"calculatedDurationMinutes\" maxlength=\"50\" />\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveAssignedResources()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeAssignedResourcesPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n<!--==============================================================================================================================-->\r\n<!--===================================================== NotesPopupModel ========================================================-->\r\n<div class=\"modal fade in show\" bsModal #NotesPopupModel=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\" *ngIf=\"!isViewNote\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-header\" *ngIf=\"isViewNote\">\r\n        <h4 class=\"modal-title\">VIEW NOTE</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:290px;\">\r\n        <form [formGroup]=\"addNoteForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"form-group\" *ngIf=\"!isViewNote\">\r\n            <div class=\"row mb-2\">\r\n              <div class=\"col-md-12 col-lg-12\">\r\n                <label>Note Title:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter Note Title\" formControlName=\"noteTitle\"\r\n                         [ngClass]=\"{'is-invalid': (noteTitle.invalid && (noteTitle.dirty || noteTitle.touched) && (noteTitle.errors?.required || noteTitle.errors?.maxlength)) }\" maxlength=\"50\" />\r\n                  <small *ngIf=\"noteTitle.invalid && (noteTitle.dirty || noteTitle.touched) && noteTitle.errors?.required\"\r\n                         class=\"text-danger\">Note Title is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row mb-2\">\r\n              <div class=\"col-md-12 col-lg-12\">\r\n                <label>Description:</label>\r\n                <div class=\"form-group\">\r\n                  <textarea rows=\"5\" class=\"form-control\" style=\"min-height:120px;\" placeholder=\"Enter Note Description\" formControlName=\"noteDescription\" #machineDescription maxlength=\"500\"></textarea>\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"form-group\" *ngIf=\"isViewNote\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-4\">\r\n                <label><b>Title: </b> </label>\r\n                <span>&nbsp;{{notesTitle}}</span>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                <label><b>Assign To:</b></label>\r\n                <span>&nbsp;{{noteAssignTo}}</span>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                <label><b>Created At:</b></label>\r\n                <span>&nbsp;{{NoteCreatedOn | DateTimeToLocal}}</span>\r\n              </div>\r\n              <div class=\"col-md-12\">\r\n                <label class=\"m-0\"><b>Description:</b></label>\r\n                <span>&nbsp;{{notesDescription}}</span>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button *ngIf=\"!isViewNote\" type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveNote()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n<!--===============================================================================================================================-->\r\n");

/***/ }),

/***/ "./src/app/views/servicesappointment/addeditservicesappointment.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/views/servicesappointment/addeditservicesappointment.component.scss ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VzYXBwb2ludG1lbnQvYWRkZWRpdHNlcnZpY2VzYXBwb2ludG1lbnQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/servicesappointment/addeditservicesappointment.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/views/servicesappointment/addeditservicesappointment.component.ts ***!
  \***********************************************************************************/
/*! exports provided: AddeditservicesappointmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditservicesappointmentComponent", function() { return AddeditservicesappointmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _servicesappointment_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./servicesappointment.service */ "./src/app/views/servicesappointment/servicesappointment.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
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

//import { AccountserviceService, JsonData, CheckboxData } from './accountservice.service';








var AddeditservicesappointmentComponent = /** @class */ (function () {
    function AddeditservicesappointmentComponent(servicesappointmentService, route, router, toaster, commonService, location) {
        var _this = this;
        this.servicesappointmentService = servicesappointmentService;
        this.route = route;
        this.router = router;
        this.toaster = toaster;
        this.commonService = commonService;
        this.location = location;
        this.loadSave = false;
        this.moduleName = 'serviceappointment';
        this.submoduleName = 'serviceappointment';
        this.id = '';
        this.displayType = 'ADD';
        this.formControlList = [];
        this.isUpdate = false;
        this.isAdd = false;
        this.modulePermission = [];
        this.len = 10;
        this.JsonData = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_2__["ServiceAppointmentJsonData"]();
        this.checkboxdata1 = [];
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
            _this.userName = userdetail.firstName + ' ' + userdetail.lastName;
        });
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        this.timeFormat = this.commonService.getTimeFormat();
    }
    AddeditservicesappointmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.id = id;
                //this.fillForm(this.id);
                _this.addOrUpdatePermission = _this.isUpdate;
                _this.pageTitle = 'Edit Appointment';
                _this.displayType = 'EDIT';
            }
            else {
                _this.pageTitle = 'Add Appointment';
                _this.displayType = 'ADD';
                _this.addOrUpdatePermission = _this.isAdd;
                //this.addOrUpdatePermission = this.isAdd;
            }
        });
        this.options = {
            center: { lat: 47.751076, lng: -120.740135 },
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.overlays = [];
        this.loadSave = true;
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.id, this.displayType).subscribe(function (result) {
            if (result) {
                debugger;
                _this.customCompnentValues = result.data;
                console.log("Service Appointment Data:", _this.customCompnentValues);
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_2__["CheckboxData"]();
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
                var convertdatetime_1 = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_8__["DateTimeToLocalForAddEditPipe"]();
                //=====================Select cananotcompleted value================================
                var AllData = _this.customCompnentValues.filter(function (x) { return x.ColumnName == 'Status'; });
                console.log("AllData", AllData);
                _this.prevStatusCode = AllData[0].value;
                console.log('prevStatusCode', _this.prevStatusCode);
                var selectedData = [];
                selectedData = AllData[0].select_options;
                var ab = selectedData.filter(function (x) { return x.name == 'CannotComplete'; });
                console.log('selectedData', ab);
                _this.cannotCompletedcCode = ab[0].value;
                debugger;
                //==================================================================================
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
                    if (cnt.dt_code == 'select' && cnt.name == 'AccountId') {
                        cnt.is_readOnly = true;
                    }
                    if (_this.displayType == "EDIT" && cnt.dt_code == 'select' && (cnt.name == 'OwnerId' || cnt.name == 'CreatedById' || cnt.name == 'LastModifiedById')) {
                        cnt.select_options.forEach(function (itemList) {
                            if (itemList.value.toUpperCase() == cnt.value.toUpperCase()) {
                                val = itemList.value;
                            }
                        });
                        cnt.is_readOnly = true;
                    }
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required === true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.dt_code === "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.dt_code === "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.dt_code === "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                //console.log("validationFROM", this.form);
                _this.loadSave = false;
            }
            setTimeout(function () {
                _this.options = {
                    center: { lat: 47.751076, lng: -120.740135 },
                    zoom: 3,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.overlays = [];
                _this.autotext();
            }, 1000);
        }, function (err) {
            _this.loadSave = false;
        });
        var today = new Date();
        this.minDate = today;
        this.maxDate = this.minDate;
    };
    //onSelectdate(event) {
    //  console.log('dddddd', event)
    //  this.commonService.transformPSTToUTC(event, true);
    //}
    AddeditservicesappointmentComponent.prototype.convertUTCDateToLocalDate = function (date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;
    };
    AddeditservicesappointmentComponent.prototype.onSubmit = function () {
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
            this.JsonData.serviceAppointmentId = this.id;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            var _formData = this.form.value;
            console.log("_formData", _formData);
            debugger;
            for (var index in _formData) {
                var data = _formData[index];
                if (data) {
                    if (Date.prototype.isPrototypeOf(data)) {
                        _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
                    }
                }
            }
            this.JsonData.FormJsonData = JSON.stringify(this.form.value);
            debugger;
            this.servicesappointmentService.addEditForm(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
                    debugger;
                    // =======================check is prevstatuscode is cannotCompleted ==========================================
                    if (_this.prevStatusCode != _this.cannotCompletedcCode) {
                        debugger;
                        //  ========Create New dublicate Service Appointment of status New (If status change to CannotCompleted)
                        if (_this.cannotCompletedcCode == result.optionalExtraParamers) {
                            debugger;
                            _this.servicesappointmentService.createDublicateServiceAppt(_this.id).subscribe(function (resultData) {
                                if (result.statusCode == 200) {
                                    debugger;
                                }
                            });
                        }
                    }
                    //==============================================================================================================
                    //================================================================================================
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
    AddeditservicesappointmentComponent.prototype.close = function () {
        this.location.back();
    };
    AddeditservicesappointmentComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    AddeditservicesappointmentComponent.prototype.fetchMore = function (dataList, j) {
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
    AddeditservicesappointmentComponent.prototype.onKey = function (e, dataList, j) {
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
    AddeditservicesappointmentComponent.prototype.onClearLang = function (dataList, j) {
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
    AddeditservicesappointmentComponent.prototype.getreturnNumber = function (x, y) {
        return x + y;
    };
    AddeditservicesappointmentComponent.prototype.mapPopUP = function () {
        this.mapLocation.show();
    };
    AddeditservicesappointmentComponent.prototype.closemapsearch = function () {
        this.mapLocation.hide();
    };
    AddeditservicesappointmentComponent.prototype.findLocation = function (address) {
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
    AddeditservicesappointmentComponent.prototype.mapClick = function (mapValue) {
        var link = mapValue.value;
        console.log('link: ', link);
        //console.log(mapValue.value.split('href').split('target'));
        console.log('link: ', mapValue.value.href);
        // window.open(link, "_blank");
    };
    AddeditservicesappointmentComponent.prototype.autotext = function () {
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
                                //console.log('s', s);   
                                if (s == 'country') {
                                    //console.log('s', s);
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
        });
    };
    AddeditservicesappointmentComponent.prototype.onDateTimeChange = function (e, obj) {
        var _objStartDate, _objEndDate, _startDate, _endDate, _startDateValue, _endDateValue;
        debugger;
        //-------set objects according to start datetime and end datetime
        _objStartDate = (obj.dependent_type == "START") ? obj : this.customCompnentValues.slice().filter(function (x) { return x.custom_field_id === obj.dependent_on; })[0];
        _objEndDate = (obj.dependent_type == "END") ? obj : this.customCompnentValues.slice().filter(function (x) { return x.custom_field_id === obj.dependent_on; })[0];
        //------parse value of both fields from form
        this.startDateTime = _objStartDate.form_controlName;
        this.endDateTime = _objEndDate.form_controlName;
        //-----get value of both start and end date field
        _startDateValue = this.StartDate.value;
        _endDateValue = this.EndDate.value;
        if (_endDateValue) {
            if (_startDateValue > _endDateValue) {
                this.clearDateValidations();
                var errorMessage = _objEndDate.display_name + " must be greater than " + _objStartDate.display_name;
                var errorMessageSecond = _objStartDate.display_name + " must be lesser than " + _objEndDate.display_name;
                this.StartDate.setErrors({ 'DateValidation': errorMessageSecond });
                this.EndDate.setErrors({ 'DateValidation': errorMessage });
            }
            else {
                this.clearDateValidations();
            }
        }
        else {
            this.clearDateValidations();
        }
    };
    Object.defineProperty(AddeditservicesappointmentComponent.prototype, "StartDate", {
        get: function () { return this.form.get(this.startDateTime); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditservicesappointmentComponent.prototype, "EndDate", {
        get: function () { return this.form.get(this.endDateTime); },
        enumerable: true,
        configurable: true
    });
    AddeditservicesappointmentComponent.prototype.clearDateValidations = function () {
        this.StartDate.setErrors(null);
        this.EndDate.setErrors(null);
        this.StartDate.clearValidators();
        this.StartDate.updateValueAndValidity();
        this.EndDate.clearValidators();
        this.EndDate.updateValueAndValidity();
    };
    AddeditservicesappointmentComponent.ctorParameters = function () { return [
        { type: _servicesappointment_service__WEBPACK_IMPORTED_MODULE_2__["ServicesappointmentService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapLocation', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], AddeditservicesappointmentComponent.prototype, "mapLocation", void 0);
    AddeditservicesappointmentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditservicesappointment',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditservicesappointment.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/addeditservicesappointment.component.html")).default,
            providers: [_servicesappointment_service__WEBPACK_IMPORTED_MODULE_2__["ServicesappointmentService"]],
            styles: [__importDefault(__webpack_require__(/*! ./addeditservicesappointment.component.scss */ "./src/app/views/servicesappointment/addeditservicesappointment.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_servicesappointment_service__WEBPACK_IMPORTED_MODULE_2__["ServicesappointmentService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"]])
    ], AddeditservicesappointmentComponent);
    return AddeditservicesappointmentComponent;
}());



/***/ }),

/***/ "./src/app/views/servicesappointment/auditpopup/auditpopup.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/views/servicesappointment/auditpopup/auditpopup.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VzYXBwb2ludG1lbnQvYXVkaXRwb3B1cC9hdWRpdHBvcHVwLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/servicesappointment/auditpopup/auditpopup.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/views/servicesappointment/auditpopup/auditpopup.component.ts ***!
  \******************************************************************************/
/*! exports provided: AuditpopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuditpopupComponent", function() { return AuditpopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _servicesappointment_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../servicesappointment.service */ "./src/app/views/servicesappointment/servicesappointment.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _auditchecklistpopup_auditchecklistpopup_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../auditchecklistpopup/auditchecklistpopup.component */ "./src/app/views/servicesappointment/auditchecklistpopup/auditchecklistpopup.component.ts");
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







var AuditpopupComponent = /** @class */ (function () {
    function AuditpopupComponent(fb, serviceappointmentlistService, toaster, commonService) {
        this.fb = fb;
        this.serviceappointmentlistService = serviceappointmentlistService;
        this.toaster = toaster;
        this.commonService = commonService;
        this.IsAuditCheckListDisplay = false;
        this.loadSave = false;
        this.ActualauditCheckListData = [];
    }
    AuditpopupComponent.prototype.ngOnInit = function () {
        this.loadSave = true;
    };
    AuditpopupComponent.prototype.show = function (obj) {
        debugger;
        this.isDisabled = obj.disable;
        this.loadSave = true;
        this.auditModel.show();
        this.refresh(obj.serviceAppointmentsId);
    };
    AuditpopupComponent.prototype.refresh = function (serviceAppointmentsId) {
        var _this = this;
        this.serviceappointmentlistService.auditReviewData(serviceAppointmentsId).subscribe(function (s) {
            _this.auditData = s;
            _this.ActualauditCheckListData = [];
            setTimeout(function () {
                _this.loadSave = false;
            }, 500);
        }, function (err) {
            _this.loadSave = false;
        });
        this.IsAuditCheckListDisplay = false;
    };
    AuditpopupComponent.prototype.closeAudit = function () {
        this.auditModel.hide();
    };
    AuditpopupComponent.prototype.auditChecklistDetail = function (checkList_Id, serviceAppointmentId, disable) {
        debugger;
        this.closeAudit();
        this.IsAuditCheckListDisplay = false;
        this.auditCheckListModel.auditChecklistDetail(checkList_Id, serviceAppointmentId, disable);
    };
    AuditpopupComponent.prototype.switchClicked = function (event, checkList_Id, serviceAppointmentId) {
        var _this = this;
        this.serviceappointmentlistService.auditChecklistCheckBox(checkList_Id, serviceAppointmentId, event.srcElement.checked).subscribe(function (s) {
            _this.refresh(serviceAppointmentId);
        }, function (err) {
            _this.loadSave = false;
        });
    };
    AuditpopupComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _servicesappointment_service__WEBPACK_IMPORTED_MODULE_3__["ServicesappointmentService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('audit', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], AuditpopupComponent.prototype, "auditModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('auditCheckList', { static: false }),
        __metadata("design:type", _auditchecklistpopup_auditchecklistpopup_component__WEBPACK_IMPORTED_MODULE_6__["AuditchecklistpopupComponent"])
    ], AuditpopupComponent.prototype, "auditCheckListModel", void 0);
    AuditpopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-auditpopup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./auditpopup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/auditpopup/auditpopup.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./auditpopup.component.scss */ "./src/app/views/servicesappointment/auditpopup/auditpopup.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _servicesappointment_service__WEBPACK_IMPORTED_MODULE_3__["ServicesappointmentService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], AuditpopupComponent);
    return AuditpopupComponent;
}());



/***/ }),

/***/ "./src/app/views/servicesappointment/filterpopup/filterpopup.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/views/servicesappointment/filterpopup/filterpopup.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VzYXBwb2ludG1lbnQvZmlsdGVycG9wdXAvZmlsdGVycG9wdXAuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/servicesappointment/filterpopup/filterpopup.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/views/servicesappointment/filterpopup/filterpopup.component.ts ***!
  \********************************************************************************/
/*! exports provided: FilterpopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterpopupComponent", function() { return FilterpopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../servicesappointment.service */ "./src/app/views/servicesappointment/servicesappointment.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
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








var FilterpopupComponent = /** @class */ (function () {
    function FilterpopupComponent(fb, toaster, commonService, leadlistService, service) {
        this.fb = fb;
        this.toaster = toaster;
        this.commonService = commonService;
        this.leadlistService = leadlistService;
        this.service = service;
        this.getFilterData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.crewList = [];
        this.resourceList = [];
        this.departmentList = [];
        this.warehouseList = [];
        this.lstWorkType = [];
        this.lstTeritory = [];
        this.lstWorkOrderCategory = [];
        this.lstaccountlist = [];
        this.filterData = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__["filterData"]();
        this.loadSave = false;
        this.len = 10;
        this.searchText = '';
    }
    FilterpopupComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.loadSave = true;
    };
    FilterpopupComponent.prototype.initForm = function () {
        this.filterPopoupForm = this.fb.group({
            serviceCrew: [null],
            serviceResource: [null],
            department: [null],
            warehouse: [null],
            worktype: [null],
            serviceTeritory: [null],
            category: [null],
            account: [null],
            testAccount: [false],
        });
    };
    Object.defineProperty(FilterpopupComponent.prototype, "serviceCrew", {
        get: function () { return this.filterPopoupForm.get('serviceCrew'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterpopupComponent.prototype, "serviceResource", {
        get: function () { return this.filterPopoupForm.get('serviceResource'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterpopupComponent.prototype, "department", {
        get: function () { return this.filterPopoupForm.get('department'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterpopupComponent.prototype, "warehouse", {
        get: function () { return this.filterPopoupForm.get('warehouse'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterpopupComponent.prototype, "worktype", {
        get: function () { return this.filterPopoupForm.get('worktype'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterpopupComponent.prototype, "serviceTeritory", {
        get: function () { return this.filterPopoupForm.get('serviceTeritory'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterpopupComponent.prototype, "category", {
        get: function () { return this.filterPopoupForm.get('category'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterpopupComponent.prototype, "account", {
        get: function () { return this.filterPopoupForm.get('account'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterpopupComponent.prototype, "testAccount", {
        get: function () { return this.filterPopoupForm.get('testAccount'); },
        enumerable: true,
        configurable: true
    });
    FilterpopupComponent.prototype.show = function () {
        // this.filterPopoupForm.reset();
        //this.GetCrewList();
        this.getDepartmentList();
        this.GetLeadConvertAccountDll();
        this.GetServiceCrewDll();
        this.GetServiceResourceDll();
        this.getWorkTypeList();
        this.getServiceTerritory();
        this.getWorkOrderCategory();
        this.filterModal.show();
        this.loadSave = false;
    };
    FilterpopupComponent.prototype.close = function () {
        this.filterModal.hide();
        this.filterModal.ngOnDestroy();
    };
    FilterpopupComponent.prototype.clearAllFields = function () {
        this.initForm();
        this.filterPopoupForm.reset();
    };
    FilterpopupComponent.prototype.getDepartmentList = function () {
        var _this = this;
        this.commonService.getMasterItemsList("department").subscribe(function (result) {
            _this.departmentList = _this.commonService.masters;
        });
    };
    FilterpopupComponent.prototype.getServiceTerritory = function () {
        var _this = this;
        this.commonService.getMasterItemsList("ServiceTerritory").subscribe(function (result) {
            _this.lstTeritory = _this.commonService.masters;
        });
    };
    FilterpopupComponent.prototype.getWorkOrderCategory = function () {
        var _this = this;
        this.commonService.getMasterItemsList("WorkOrderCategory").subscribe(function (result) {
            _this.lstWorkOrderCategory = _this.commonService.masters;
        });
    };
    FilterpopupComponent.prototype.getWorkTypeList = function () {
        var _this = this;
        this.commonService.getMasterItemsList("WorkType").subscribe(function (result) {
            _this.lstWorkType = _this.commonService.masters;
            console.log('workTypeItems', _this.lstWorkType);
        });
    };
    //GetCrewList(id:any=null) {
    //  this.service.GetServiceCrewAndResourceDll(id, 0, '','').pipe(take(1)).subscribe((resp) => {
    //    if (resp) {
    //      this.crewList = resp as [];
    //      console.log('crewList',this.crewList)
    //    }
    //  });
    //}
    FilterpopupComponent.prototype.onChange = function (e) {
    };
    FilterpopupComponent.prototype.submit = function () {
        this.filterData.crewid = this.filterPopoupForm.get('serviceCrew').value;
        this.filterData.resourceid = this.filterPopoupForm.get('serviceResource').value;
        this.filterData.departmentid = this.filterPopoupForm.get('department').value;
        this.filterData.worktypeid = this.filterPopoupForm.get('worktype').value;
        this.filterData.teritoryid = this.filterPopoupForm.get('serviceTeritory').value;
        this.filterData.accountid = this.filterPopoupForm.get('account').value;
        this.filterData.categoryid = this.filterPopoupForm.get('category').value;
        this.filterData.testAccount = this.filterPopoupForm.get('testAccount').value;
        var data = JSON.stringify(this.filterData);
        //console.log('ab',ab)
        //debugger;
        //console.log('this.crewList', this.crewList);
        //if (ab == null) {
        //  this.getFilterData.emit({ id: 0, type: null })
        //} else {
        //  var data = this.crewList.filter(m => m.value.toString() == ab.toString())
        //  console.log('data', data);
        this.getFilterData.emit(data);
        //}
        this.filterModal.hide();
    };
    FilterpopupComponent.prototype.GetServiceCrewDll = function (id) {
        var _this = this;
        if (id === void 0) { id = null; }
        this.service.GetServiceCrewDll(id, 0, '').subscribe(function (data) {
            _this.crewList = data;
        });
    };
    FilterpopupComponent.prototype.GetServiceResourceDll = function (id, depid) {
        var _this = this;
        if (id === void 0) { id = null; }
        if (depid === void 0) { depid = null; }
        this.service.GetServiceResourceDll(id, 0, '', depid).subscribe(function (data) {
            _this.resourceList = data;
            console.log('resourceList', _this.resourceList);
        });
    };
    FilterpopupComponent.prototype.onScrollToEnd = function (dataList) {
        this.fetchMoreServiceCrew(dataList);
    };
    FilterpopupComponent.prototype.onKey = function (e, dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = e.target.value;
        this.service.GetServiceCrewDll('', this.len, this.searchText).subscribe(function (data) {
            _this.crewList = data;
        });
    };
    FilterpopupComponent.prototype.fetchMoreServiceCrew = function (dataList) {
        var _this = this;
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList.length;
        this.service.GetServiceCrewDll('', this.len, this.searchText).subscribe(function (data) {
            _this.crewList = _this.crewList.concat(data);
        });
    };
    FilterpopupComponent.prototype.onClearLang = function (dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = '';
        this.service.GetServiceCrewDll('', this.len, this.searchText).subscribe(function (data) {
            _this.crewList = data;
        });
    };
    FilterpopupComponent.prototype.onScrollToEndresource = function (dataList) {
        this.fetchMore(dataList);
    };
    FilterpopupComponent.prototype.fetchMore = function (dataList) {
        var _this = this;
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList.length;
        this.service.GetServiceResourceDll('', this.len, this.searchText, this.departmentid).subscribe(function (data) {
            _this.resourceList = _this.resourceList.concat(data);
        });
    };
    FilterpopupComponent.prototype.onKeyresource = function (e, dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = e.target.value;
        this.service.GetServiceResourceDll('', this.len, this.searchText, this.departmentid).subscribe(function (data) {
            _this.resourceList = data;
        });
    };
    FilterpopupComponent.prototype.onClearLangresource = function (dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = '';
        this.departmentid = 0;
        this.service.GetServiceResourceDll('', this.len, this.searchText).subscribe(function (data) {
            _this.resourceList = data;
        });
    };
    FilterpopupComponent.prototype.changeDept = function (id) {
        debugger;
        this.resourcedll.clearModel();
        this.departmentid = id.value;
        this.GetServiceResourceDll(null, this.departmentid);
    };
    FilterpopupComponent.prototype.clearallForm = function () {
        this.filterPopoupForm.reset();
    };
    FilterpopupComponent.prototype.GetLeadConvertAccountDll = function (id) {
        var _this = this;
        if (id === void 0) { id = 0; }
        this.leadlistService.GetLeadConvertAccountDll(null, '0', this.searchText).subscribe(function (data) {
            _this.lstaccountlist = data;
        });
    };
    FilterpopupComponent.prototype.fetchMoreAccountDll = function (dataList) {
        var _this = this;
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList.length;
        this.leadlistService.GetLeadConvertAccountDll(null, this.len, this.searchText).subscribe(function (data) {
            _this.lstaccountlist = _this.lstaccountlist.concat(data);
        });
    };
    FilterpopupComponent.prototype.onKeyAccountDll = function (e, dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = e.target.value;
        this.leadlistService.GetLeadConvertAccountDll(null, this.len, this.searchText).subscribe(function (data) {
            _this.lstaccountlist = data;
        });
    };
    FilterpopupComponent.prototype.onScrollToEndAccountDll = function (dataList) {
        this.fetchMoreAccountDll(dataList);
    };
    FilterpopupComponent.prototype.onClearLangAccountDll = function (dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = '';
        this.leadlistService.GetLeadConvertAccountDll(null, this.len, this.searchText).subscribe(function (data) {
            _this.lstaccountlist = data;
        });
    };
    FilterpopupComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__["LeadlistService"] },
        { type: _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__["ServicesappointmentService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resourcedll', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], FilterpopupComponent.prototype, "resourcedll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('filterPopoup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], FilterpopupComponent.prototype, "filterModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FilterpopupComponent.prototype, "getFilterData", void 0);
    FilterpopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-filterpopup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./filterpopup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/filterpopup/filterpopup.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./filterpopup.component.scss */ "./src/app/views/servicesappointment/filterpopup/filterpopup.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__["LeadlistService"], _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__["ServicesappointmentService"]])
    ], FilterpopupComponent);
    return FilterpopupComponent;
}());



/***/ }),

/***/ "./src/app/views/servicesappointment/managequestionnaire/managequestionnaire-list.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/views/servicesappointment/managequestionnaire/managequestionnaire-list.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: ManagequestionnaireListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagequestionnaireListComponent", function() { return ManagequestionnaireListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _servicesappointment_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../servicesappointment.service */ "./src/app/views/servicesappointment/servicesappointment.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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







var ManagequestionnaireListComponent = /** @class */ (function () {
    function ManagequestionnaireListComponent(commonService, activeRoute, serviceappointmentlistService, dialogService, toaster) {
        this.commonService = commonService;
        this.activeRoute = activeRoute;
        this.serviceappointmentlistService = serviceappointmentlistService;
        this.dialogService = dialogService;
        this.toaster = toaster;
        //@ViewChild('userTypeSelect') userTypeSelect: NgSelectComponent;
        this.listFilter = '';
        this.searchTxt = '';
        this.isAdd = false;
        this.isDelete = false;
        this.isUpdate = false;
        this.modulePermission = [];
        this.listingGridData = {
            pager: {},
            data: []
        };
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'Createdon';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["SelectionType"];
        this.selected = [];
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'USERADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'USERUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'USERDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
    }
    ManagequestionnaireListComponent.prototype.ngOnInit = function () {
        this.getPageSizes();
        this.currPage = 0;
        this.pageSizeValue = 15;
        this.getListingGridData();
    };
    ManagequestionnaireListComponent.prototype.getListingGridData = function () {
        var _this = this;
        this.loading = true;
        this.serviceappointmentlistService.GetListingGridData(this.searchTxt, this.sortColumn, this.sortDir, this.currPage, this.pageSizeValue).subscribe(function (result) {
            _this.listingGridData = result;
            console.log("this.listingGridData", _this.listingGridData);
            _this.offset = _this.currPage + 1;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ManagequestionnaireListComponent.prototype.setPage = function ($event) {
        this.loading = true;
        var ab = $event.page - 1;
        this.currPage = ab;
        this.currentPage = ab;
        this.getListingGridData();
    };
    Object.defineProperty(ManagequestionnaireListComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ManagequestionnaireListComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.getListingGridData();
    };
    ManagequestionnaireListComponent.prototype.onSelect = function (_a) {
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
    ManagequestionnaireListComponent.prototype.onChange = function () {
        var _this = this;
        this.loading = true;
        this.serviceappointmentlistService.GetListingGridData(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(function (result) {
            _this.listingGridData = result;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ManagequestionnaireListComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.getListingGridData();
        }
    };
    ManagequestionnaireListComponent.prototype.search = function () {
        this.getListingGridData();
    };
    ManagequestionnaireListComponent.prototype.reset = function () {
        this.table.sorts = [];
        // this.userTypeSelect.clearModel();
        this.loading = true;
        this.listFilter = '';
        this.searchTxt = '';
        //this.searchUserType = '';
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.pageSizeValue = 15;
        this.currPage = 0;
        this.getListingGridData();
    };
    ManagequestionnaireListComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ManagequestionnaireListComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Question(s)\"";
            this.dialogService.confirm('Delete Question(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.serviceappointmentlistService.DeleteRecords(_this.deleteId, "tblCheckList").subscribe(function (r) {
                        _this.toaster.success("Record(s) has been deleted successfully");
                        _this.deleteId = "";
                        _this.selected = [];
                        _this.getListingGridData();
                    }, function (error) {
                    });
                }
            });
        }
        else {
            this.toaster.error("Please select at least one row.");
        }
    };
    ManagequestionnaireListComponent.prototype.DeleteQuestionnaire = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete question \"" + row.name + "\"?";
        this.dialogService.confirm('Delete Question ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.serviceappointmentlistService.deleteQuestionnaire(row.Id).subscribe(function (result) {
                    if (result.statusCode == 200) {
                        _this.toaster.success(result.responseMessage);
                        _this.getListingGridData();
                    }
                    else {
                        _this.toaster.error(result.responseMessage);
                    }
                });
            }
        });
    };
    ManagequestionnaireListComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _servicesappointment_service__WEBPACK_IMPORTED_MODULE_3__["ServicesappointmentService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["DatatableComponent"])
    ], ManagequestionnaireListComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ManagequestionnaireListComponent.prototype, "offset", void 0);
    ManagequestionnaireListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-managequestionnaire-list',
            template: __importDefault(__webpack_require__(/*! raw-loader!./managequestionnaire-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/managequestionnaire/managequestionnaire-list.component.html")).default
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _servicesappointment_service__WEBPACK_IMPORTED_MODULE_3__["ServicesappointmentService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"]])
    ], ManagequestionnaireListComponent);
    return ManagequestionnaireListComponent;
}());



/***/ }),

/***/ "./src/app/views/servicesappointment/managequestionnaire/managequestionnaire.component.scss":
/*!**************************************************************************************************!*\
  !*** ./src/app/views/servicesappointment/managequestionnaire/managequestionnaire.component.scss ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VzYXBwb2ludG1lbnQvbWFuYWdlcXVlc3Rpb25uYWlyZS9tYW5hZ2VxdWVzdGlvbm5haXJlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/servicesappointment/managequestionnaire/managequestionnaire.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/views/servicesappointment/managequestionnaire/managequestionnaire.component.ts ***!
  \************************************************************************************************/
/*! exports provided: ManagequestionnaireComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagequestionnaireComponent", function() { return ManagequestionnaireComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../servicesappointment.service */ "./src/app/views/servicesappointment/servicesappointment.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _viewpopupwindowform_propertiespopupform_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./viewpopupwindowform/propertiespopupform.component */ "./src/app/views/servicesappointment/managequestionnaire/viewpopupwindowform/propertiespopupform.component.ts");
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









var ManagequestionnaireComponent = /** @class */ (function () {
    function ManagequestionnaireComponent(commanService, toaster, router, ServicesappointmentService, dialogService, route, fb, location) {
        this.commanService = commanService;
        this.toaster = toaster;
        this.router = router;
        this.ServicesappointmentService = ServicesappointmentService;
        this.dialogService = dialogService;
        this.route = route;
        this.fb = fb;
        this.location = location;
        this.questionTypeList = [];
        this.colors = [];
        this.indexTemp = 0;
        this.statusList = [];
        this.isEdit = false;
        this.isonlyForQuestion = false;
        this.droped = [];
        this.newgroup = [];
        this.AutoSaveintervalInSecond = 120000;
        this.customCompnentValues = [];
        this.mainQuestionvalues = [];
        this.formControlList = [];
        this.objSectionData = [];
        this.count = 0;
        this.loadSave = false;
        this.displayCode = 'Add';
        this.length = 0;
        this.workTypeSearch = '';
        this.disableCondition = false;
        this.isSomethingChange = false;
        this.timeLeft = 60;
        this.sectionDrag = true;
        this.subSectionDrag = false;
        this.sectionDisplayIndex = 0;
        this.filedLists = [
            //{ form_field_id: "", sql_type: "nvarchar", name: "Text", dt_code: "text", class_name: "fa fa-file-text-o ", display_order: 0, actual_data_type: "string", id: 11, required: false, picklist_options: null, field_type: 'texteditor', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", name: "Single Line", dt_code: "text", class_name: "fa fa fa-ellipsis-h", display_order: 1, actual_data_type: "string", id: 1, required: false, length: 0, picklist_options: null, field_type: 'textbox', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", name: "Multi Line", group_name: "", dt_code: "textarea", class_name: "fa fa-navicon", display_order: 2, data_type_name: "string", id: 2, required: false, length: 0, index: "", picklist_options: null, field_type: 'textarea', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "select", name: "Select List", group_name: "", dt_code: "select", class_name: "fa fa-list", display_order: 3, data_type_name: "select", id: 3, required: false, length: 0, index: "", picklist_options: null, field_type: 'select', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "int", name: "Integer", group_name: "", dt_code: "int", class_name: "fa fa-sort-numeric-asc", display_order: 4, data_type_name: "int", id: 4, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "bigint", name: "Long Integer", group_name: "", dt_code: "bigint", class_name: "fa  fa-list-ol", display_order: 5, data_type_name: "bigint", id: 5, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_daependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "decimal", name: "Decimal", group_name: "", dt_code: "decimal", class_name: "fa fa fa-circle", display_order: 6, data_type_name: "decimal", id: 6, required: false, length: 0, index: "", picklist_options: null, field_type: 'decimal', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "date", name: "Date", group_name: "", dt_code: "date", class_name: "fa fa-calendar-o", display_order: 7, data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'date', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "datetime", name: "Datetime", group_name: "", dt_code: "datetime", class_name: "fa fa-calendar-o", display_order: 7, data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'datetime', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", name: "Checkbox", group_name: "", dt_code: "checkbox", class_name: "fa fa-check-square-o", display_order: 8, data_type_name: "string", id: 8, required: false, length: 0, index: "", picklist_options: null, field_type: 'checkbox', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", name: "Radio", group_name: "", dt_code: "radio", class_name: "fa fa-dot-circle-o", display_order: 9, data_type_name: "string", id: 9, required: false, length: 0, index: "", picklist_options: null, field_type: 'radioButton', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "image", name: "image", group_name: "", dt_code: "image", class_name: "fa fa-picture-o", display_order: 10, data_type_name: "image", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'image', default_value: '' },
            { statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "bit", name: "Boolean", group_name: "", dt_code: "boolean", class_name: "fa fa-at", display_order: 11, data_type_name: "bit", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'boolean', default_value: '' }
        ];
        groupControl: _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__["GroupControlQuestion"];
    }
    ManagequestionnaireComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.interval);
    };
    ManagequestionnaireComponent.prototype.getVisibleFieldsList = function () {
        this.colors = JSON.parse(JSON.stringify(this.filedLists));
        if (this.questionnaire && this.questionnaire.questionType == "Photo") {
            this.colors = this.colors.filter(function (field) { return field.sql_type == "image"; });
        }
        else if (this.questionnaire && this.questionnaire.questionType == "Questionnaire") {
            this.colors = this.colors.filter(function (field) { return field.sql_type != "image"; });
        }
        this.colors = this.colors.sort(function (f1, f2) {
            var name1 = f1.name.toUpperCase();
            var name2 = f2.name.toUpperCase();
            return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
            return 1;
        });
    };
    ManagequestionnaireComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getIntereval();
        console.log('ngOnInit');
        this.questionnaire = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__["Questionnaire"]();
        this.getVisibleFieldsList();
        this.InnerData = 'four';
        this.userInfo = JSON.parse(localStorage.getItem('userinfo'));
        this.companyType = this.userInfo["companyType"];
        this.companyId = this.userInfo["companyId"];
        var _formId = '';
        if (this.companyType === "companytypeFinancialInstitute" && this.companyId === 1004 && _formId === '') {
            this.isCompanyTypeFinancialInstitute = true;
        }
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.checkListId = id;
                _this.isEdit = true;
                _this.fillForm(id);
            }
            else {
                _this.isEdit = false;
            }
        });
        //
        this.lstAnsType = this.filedLists;
        this.pageTitle = "Manage Questionnaire";
        this.GetQuestionTypes();
        this.GetWorkTypes();
        this.GetStatus();
    };
    ManagequestionnaireComponent.prototype.changeDragSatus = function (event, type) {
        event.stopPropagation();
        if (type == "Section") {
            this.sectionDrag = true;
            this.subSectionDrag = false;
        }
        else {
            this.sectionDrag = false;
            this.subSectionDrag = true;
        }
    };
    ////////////////Edit page code////////////////
    ManagequestionnaireComponent.prototype.setMainsection = function (arrayOfMainSection) {
        for (var obj in arrayOfMainSection) {
        }
    };
    ManagequestionnaireComponent.prototype.valuechange = function (newValue, obj) {
        obj.statusId = (obj.statusId == '1001' || obj.statusId == '1011') ? '1011' : '1010';
        if (newValue && newValue.trim().length > 0) {
            this.isSomethingChange = true;
        }
    };
    ManagequestionnaireComponent.prototype.getIntereval = function () {
        var _this = this;
        this.ServicesappointmentService.GetChecklistAutoSaveintervalInSeconds().subscribe(function (response) {
            if (response != null && response >= 120000) {
                _this.AutoSaveintervalInSecond = response;
            }
            _this.setAutoSaveTimer();
        });
    };
    ManagequestionnaireComponent.prototype.fillForm = function (id) {
        var _this = this;
        try {
            this.ServicesappointmentService.GetCheckListDetail(id).subscribe(function (resultObj) {
                if (resultObj) {
                    console.log("edit daTA", resultObj);
                    _this.loadSave = false;
                    _this.parseResult(resultObj);
                    _this.getVisibleFieldsList();
                }
            });
        }
        catch (error) {
            console.log("error ", this.questionnaire);
            this.loadSave = false;
            console.error("Error trace GetCheckListDetail", error);
        }
    };
    ManagequestionnaireComponent.prototype.parseResult = function (resultObj) {
        if (resultObj['mainSection'] == null || resultObj['mainSection'] == undefined)
            resultObj['mainSection'] = [];
        var mainSectionArray = resultObj['mainSection'];
        mainSectionArray.forEach(function (currentValue, index) {
            if (currentValue.mainSubSection == null || currentValue.mainSubSection == undefined)
                currentValue.mainSubSection = [];
            var mainSubSection = currentValue.mainSubSection;
            mainSubSection.forEach(function (value, index) {
                if (value.sectionType == "question") {
                    value.question = JSON.parse(value.question);
                    if (value.question != null) {
                        if (value.question.field_type == "select" || value.question.field_type == "dropdown") {
                            if (value.question.picklist_options.includes(',') == false) {
                                value.question.picklist_options = (value.question.picklist_options != '' && value.question.picklist_options != null) ?
                                    JSON.parse(value.question.picklist_options) : null;
                                value.question.selectlistvalues = value.question.picklist_options;
                            }
                            else {
                                var _data = value.question.picklist_options.split(',');
                                var _arr = [];
                                _data.forEach(function (item) {
                                    var _obj = { value: item, id: item };
                                    _arr.push(_obj);
                                });
                                value.question.picklist_options = _arr;
                                value.question.selectlistvalues = value.question.picklist_options;
                            }
                        }
                    }
                    else {
                        value.question = {};
                    }
                }
                else {
                    if (value.SubSectionQuestionAns != null) {
                        value.SubSectionQuestionAns = JSON.parse(value.SubSectionQuestionAns);
                        value.SubSectionQuestionAns.forEach(function (question, index) {
                            if (question.field_type == "select" || question.field_type == "dropdown") {
                                question.picklist_options = (question.picklist_options != '' && question.picklist_options != null) ?
                                    JSON.parse(question.picklist_options) : null;
                                question.selectlistvalues = question.picklist_options;
                            }
                        });
                    }
                    else {
                        value.SubSectionQuestionAns = [];
                    }
                }
            });
        });
        this.questionnaire = resultObj;
    };
    ManagequestionnaireComponent.prototype.drop = function (e, ix, iy, iz, section) {
        if (section == 'questionOnly') {
            var data1 = null;
            var data2 = null;
            if (this.dragedColor) {
                this.show(this.dragedColor, ix, iy, iz, section, '1010');
            }
        }
        else {
            if (this.dragedColor) {
                this.show(this.dragedColor, ix, iy, iz, section, '1010');
            }
        }
    };
    ManagequestionnaireComponent.prototype.onDropSuccess = function (event, data, index) {
        if (data && data.is_dependent == true) {
            data.is_dependent = false;
            data.dependent_value = '';
            this.isSomethingChange = true;
        }
    };
    ManagequestionnaireComponent.prototype.dragStart = function (e, c) {
        this.uniqueid = this.S4();
        c.form_field_id = this.uniqueid;
        var temp = [];
        temp = JSON.parse(JSON.stringify(c));
        this.dragedColor = temp;
    };
    ManagequestionnaireComponent.prototype.defaultSection = function (sectionType) {
        var section = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__["mainSubSection"]();
        section.sectionType = sectionType;
        if (sectionType == 'question') {
            section.question.isDirty = true;
        }
        return section;
    };
    ManagequestionnaireComponent.prototype.removeDefaultQuestion = function () {
        this.questionnaire.mainSection.forEach(function (currentValue, index) {
            currentValue.mainSubSection.forEach(function (value, index) {
                if (value.sectionType == "subSection") {
                    value.SubSectionQuestionAns = value.SubSectionQuestionAns.filter(function (x) { return x.dt_code != 'default'; });
                }
            });
            currentValue.mainSubSection = currentValue.mainSubSection.filter(function (x) { return x.sectionType == "subSection" || (x.sectionType == "question" && x.question.dt_code != 'default'); });
        });
    };
    ManagequestionnaireComponent.prototype.defaultQuestion = function () {
        var question = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__["QuestionAns"]();
        question.isDirty = true;
        question.statusId = '1010';
        return question;
    };
    ManagequestionnaireComponent.prototype.addSection = function () {
        this.removeDefaultQuestion();
        if (this.questionnaire.mainSection == null || this.questionnaire.mainSection == undefined)
            this.questionnaire.mainSection = [];
        this.questionnaire.mainSection.push(new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__["mainSection"]());
        this.sectionDisplayIndex++;
        this.updateSectionIndex();
        this.isSomethingChange = true;
    };
    ManagequestionnaireComponent.prototype.addSubSectionQuestion = function (ix, iy) {
        this.removeDefaultQuestion();
        if (this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns == null
            || this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns == undefined)
            this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns = [];
        this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns.push(this.defaultQuestion());
        this.isSomethingChange = true;
    };
    ManagequestionnaireComponent.prototype.addSubSection = function (ix, type) {
        this.removeDefaultQuestion();
        if (this.questionnaire.mainSection[ix].mainSubSection == null
            || this.questionnaire.mainSection[ix].mainSubSection == undefined)
            this.questionnaire.mainSection[ix].mainSubSection = [];
        this.questionnaire.mainSection[ix].mainSubSection.push(this.defaultSection(type));
        this.isSomethingChange = true;
    };
    ManagequestionnaireComponent.prototype.removeSection = function (ix) {
        if (this.questionnaire.mainSection[ix].sectionId > 0) {
            this.questionnaire.mainSection[ix].statusId = '1003';
            this.questionnaire.mainSection[ix].mainSubSection.forEach(function (subSectionObj, index) {
                subSectionObj.statusId = '1003';
                if (subSectionObj.sectionType == 'subSection') {
                    subSectionObj.SubSectionQuestionAns.forEach(function (subquestions, index) {
                        subquestions.statusId = '1003';
                    });
                }
                else {
                    subSectionObj.question.statusId = '1003';
                }
            });
        }
        else {
            this.questionnaire.mainSection.splice(ix, 1);
        }
        this.updateSectionIndex();
        this.isSomethingChange = true;
    };
    ManagequestionnaireComponent.prototype.removeSubSection = function (ix, iy) {
        if (this.questionnaire.mainSection[ix].mainSubSection[iy].mainSubSectionId > 0) {
            this.questionnaire.mainSection[ix].mainSubSection[iy].statusId = '1003';
            if (this.questionnaire.mainSection[ix].mainSubSection[iy].sectionType == 'subSection') {
                this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns.forEach(function (subquestions, index) {
                    subquestions.statusId = '1003';
                });
            }
            else {
                this.questionnaire.mainSection[ix].mainSubSection[iy].question.statusId = '1003';
            }
        }
        else {
            this.questionnaire.mainSection[ix].mainSubSection.splice(iy, 1);
        }
        this.isSomethingChange = true;
    };
    ManagequestionnaireComponent.prototype.removeQuestionsAndAnswer = function (ix, iy, iz) {
        if (this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns[iz].questionId > 0) {
            this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns[iz].statusId = '1003';
        }
        else {
            this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns.splice(iz, 1);
        }
        this.isSomethingChange = true;
    };
    ManagequestionnaireComponent.prototype.updateSectionIndex = function () {
        var index = 1;
        this.questionnaire.mainSection.forEach(function (obj, i) {
            if (obj.statusId != '1003') {
                obj.sectionIndex = index;
                index++;
            }
        });
    };
    ManagequestionnaireComponent.prototype.GetQuestionTypes = function () {
        var questiontypes = [{ text: "Photo", value: "Photo" }, { text: "Questionnaire", value: "Questionnaire" }];
        this.questionTypeList = questiontypes;
    };
    ;
    ManagequestionnaireComponent.prototype.GetWorkTypes = function () {
        var _this = this;
        this.commanService.GetWorkTypesDDLList('', this.length, this.workTypeSearch).subscribe(function (resp) {
            if (resp) {
                _this.WorkTypeList = resp;
            }
        });
    };
    ;
    ManagequestionnaireComponent.prototype.GetStatus = function () {
        var questiontypes = [{ text: "Active", value: "1001" }, { text: "Inactive", value: "1002" }, { text: "Draft", value: "1010" }, { text: "Partial Draft", value: "1011" }];
        this.statusList = questiontypes;
    };
    ;
    ManagequestionnaireComponent.prototype.setAutoSaveTimer = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.isSomethingChange) {
                _this.autoSave();
                _this.isSomethingChange = false;
            }
        }, this.AutoSaveintervalInSecond);
    };
    ManagequestionnaireComponent.prototype.autoSave = function () {
        var _this = this;
        if (this.questionnairForm.valid) {
            this.indexJson(this.questionnaire);
            this.questionnaire.statusId = (this.questionnaire.statusId == '1001' || this.questionnaire.statusId == '1011') ? '1011' : '1010';
            if (this.questionnaire.checkListId == null) {
                this.questionnaire.statusId = '1010';
            }
            if (this.questionnaire.checkListId != null && this.questionnaire.statusId == '1010') {
                this.questionnaire.statusId = '1010';
            }
            this.ServicesappointmentService.SaveQuestionariesGroups(this.questionnaire, this.questionnaire.checkListId).subscribe(function (res) {
                if (res.statusCode == 200) {
                    var resultObj = JSON.parse(res.result);
                    _this.parseResult(resultObj);
                    _this.toaster.success('CheckList Record is Auto Saved Successfully');
                }
                else {
                    _this.toaster.error(res.responseMessage);
                }
            });
        }
    };
    ManagequestionnaireComponent.prototype.updateStatus = function (qList) {
        qList.mainSection.forEach(function (main) {
            main.statusId = (main.statusId == '1010' || main.statusId == '1011') ? '1001' : main.statusId;
            main.mainSubSection.forEach(function (sub) {
                sub.statusId = (sub.statusId == '1010' || sub.statusId == '1011') ? '1001' : sub.statusId;
                if (sub.sectionType == "question") {
                    sub.question.statusId = (sub.question.statusId == '1010' || sub.question.statusId == '1011') ? '1001' : sub.question.statusId;
                }
                else {
                    sub.SubSectionQuestionAns.forEach(function (subq) {
                        subq.statusId = (subq.statusId == '1010' || subq.statusId == '1011') ? '1001' : subq.statusId;
                    });
                }
            });
        });
    };
    ManagequestionnaireComponent.prototype.onSubmit = function () {
        var _this = this;
        this.indexJson(this.questionnaire);
        this.updateStatus(this.questionnaire);
        this.ServicesappointmentService.SaveQuestionariesGroups(this.questionnaire, this.questionnaire.checkListId).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.toaster.success(res.responseMessage);
                _this.router.navigateByUrl("/serviceappointment/questionnairechecklist");
            }
            else {
                _this.loadSave = false;
                _this.toaster.error(res.responseMessage);
            }
        });
    };
    ManagequestionnaireComponent.prototype.close = function () {
        this.router.navigateByUrl("/serviceappointment/questionnairechecklist");
    };
    ManagequestionnaireComponent.prototype.indexJson = function (data) {
        for (var sectionIdex in data.mainSection) {
            //adding ref index to section
            data.mainSection[sectionIdex].sectionRef = parseInt(sectionIdex) + 1;
            //loop for sub sections array
            for (var subSectionIndex in data.mainSection[sectionIdex].mainSubSection) {
                //adding ref index of section to sub section
                data.mainSection[sectionIdex].mainSubSection[subSectionIndex].sectionRef = data.mainSection[sectionIdex].sectionRef;
                //adding ref index to sub section
                data.mainSection[sectionIdex].mainSubSection[subSectionIndex].mainSubSectionRef = parseInt(subSectionIndex) + 1;
                if (data.mainSection[sectionIdex].mainSubSection[subSectionIndex].sectionType === 'subSection') {
                    // loop for sub section question array
                    for (var subSectionQdnIndex in data.mainSection[sectionIdex].mainSubSection[subSectionIndex].SubSectionQuestionAns) {
                        data.mainSection[sectionIdex].mainSubSection[subSectionIndex].SubSectionQuestionAns[subSectionQdnIndex].mainSubSectionRef = data.mainSection[sectionIdex].mainSubSection[subSectionIndex].mainSubSectionRef;
                    }
                }
            }
        }
    };
    ManagequestionnaireComponent.prototype.onScrollToEndWorkType = function (dataList) {
        this.fetchMore(dataList);
    };
    ManagequestionnaireComponent.prototype.fetchMore = function (dataList) {
        if (this.workTypeSearch == undefined) {
            this.workTypeSearch = '';
        }
        this.length = dataList.length;
        this.GetWorkTypes();
    };
    ManagequestionnaireComponent.prototype.onChange = function ($event) {
    };
    ManagequestionnaireComponent.prototype.onPaste = function ($event) {
    };
    ManagequestionnaireComponent.prototype.onKeyWorkType = function (e, dataList) {
        this.length = 0;
        this.workTypeSearch = e.target.value;
        this.GetWorkTypes();
    };
    ManagequestionnaireComponent.prototype.onClearWorkType = function (dataList) {
        this.length = 0;
        this.workTypeSearch = '';
        this.GetWorkTypes();
    };
    ManagequestionnaireComponent.prototype.initQuestionaries = function () {
        // initialize our guarantor
        return this.fb.group({
            sectionId: [null],
            SectionName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            subquestions: this.fb.array([
                this.initSubSection()
            ])
        });
    };
    ManagequestionnaireComponent.prototype.initSubSection = function () {
        return this.fb.group({
            sectionId: [null],
            SubSectionName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            questionAndAnswer: this.fb.array([
                this.initQuestionAns()
            ])
        });
    };
    ManagequestionnaireComponent.prototype.initQuestionAns = function () {
        return this.fb.group({
            questionId: [null],
            questionName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            answer: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    };
    //////////////////Foem Fields ---------
    ManagequestionnaireComponent.prototype.dragEnd = function (e) {
    };
    ManagequestionnaireComponent.prototype.getFiledType = function (dt_code) {
        var field_type;
        switch (dt_code) {
            case 'text':
            case 'string':
            case 'nchar':
                field_type = 'textbox';
                break;
            case 'textarea':
                field_type = 'textarea';
                break;
            case 'select':
                field_type = 'dropdown';
                break;
            case 'bit':
                field_type = 'boolean';
                break;
            case 'radio':
                field_type = 'textbox';
                break;
            case 'checkbox':
                field_type = 'checkbox';
                break;
            case 'int':
            case 'bigint':
            case 'decimal':
                field_type = 'number';
                break;
            case 'decimal':
                field_type = 'decimal';
                break;
            case 'time':
            case 'datetime':
                field_type = 'datetime';
                break;
            case 'date':
                field_type = 'date';
                break;
            default:
                field_type = 'textbox';
                break;
        }
        return field_type;
    };
    ManagequestionnaireComponent.prototype.deleteFieldValue = function (index) {
        this.fieldArray.splice(index, 1);
    };
    ManagequestionnaireComponent.prototype.S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    ManagequestionnaireComponent.prototype.GemgarteIdWithUniwquie = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    ManagequestionnaireComponent.prototype.dropNewGrop = function (lst, a) {
        if (this.dragedColor) {
            this.dragedColor.index = a;
            this.newgroup.push(this.dragedColor);
            this.dragedColor = null;
        }
    };
    ManagequestionnaireComponent.prototype.show = function (control, ix, iy, iz, section, statusId) {
        var _this = this;
        var qtyList = [];
        this.questionnaire.mainSection[ix].mainSubSection.forEach(function (itr, index) {
            if (index > iy)
                return;
            var e = JSON.parse(JSON.stringify(itr));
            if (e.sectionType == 'question') {
                e.question.dependent_type = "section";
                if (e.question.dt_code != 'default'
                    && _this.any(e.question.dt_code)
                    && e.question.form_field_id != control.form_field_id) {
                    qtyList.push(e.question);
                }
            }
            else {
                e.SubSectionQuestionAns.forEach(function (s, i) {
                    if (iz && i > iz)
                        return;
                    s.dependent_type = "subsection";
                    if (s.dt_code != 'default' &&
                        _this.any(s.dt_code)
                        && s.form_field_id != control.form_field_id) {
                        qtyList.push(s);
                    }
                });
            }
        });
        if (section == 'questionOnly') {
            this.sectionIndex = ix;
            this.sectionIdentification = section;
            this.questionIndex = iy;
            this.answerIndex = iz;
            this.control = control;
            this.editPopupModal.show(control, ix, iy, iz, qtyList, statusId);
        }
        else {
            this.sectionIdentification = section;
            this.sectionIndex = ix;
            this.questionIndex = iy;
            this.answerIndex = iz;
            this.control = control;
            this.editPopupModal.show(control, ix, iy, iz, qtyList, statusId);
        }
    };
    ManagequestionnaireComponent.prototype.any = function (fieldType) {
        return (fieldType == 'radio' || fieldType == 'checkbox' || fieldType == 'boolean' || fieldType == 'select') ? true : false;
    };
    ManagequestionnaireComponent.prototype.refreshJson = function () {
        var final;
        var contro;
        var control;
        var secondData;
        if (this.sectionIdentification == 'questionOnly') {
            control = this.control;
        }
        else {
            control = this.control;
        }
        control['isDirty'] = true;
        console.log("control", control);
        if (this.editPopupModal.singleLine == true) {
            control['display_name'] = this.editPopupModal.singleLineNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.singleLineMarkRequired.value; // use this param for required
            control['dt_code'] = 'textbox'; // use this param for required
            control['isDirty'] = true;
            control['field_type'] = 'textbox';
        }
        else if (this.editPopupModal.multiLine == true) {
            control['display_name'] = this.editPopupModal.multiLineNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.multiLineMarkRequired.value; // use this param for required
            control['dt_code'] = 'textarea'; // use this param for required
            control['isDirty'] = true;
            control['field_type'] = 'textarea';
        }
        else if (this.editPopupModal.SelectList == true) {
            control['display_name'] = this.editPopupModal.selectListLineNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.selectListMarkRequired.value; // use this param for required
            control['selectlistvalues'] = this.editPopupModal.selectlistvalue.value; // use this param for picklist options
            control['isDirty'] = true;
            control['dt_code'] = 'select';
            control['dropdown'] = 'textarea';
        }
        else if (this.editPopupModal.intShow == true) {
            control['display_name'] = this.editPopupModal.intNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.intMarkRequired.value; // use this param for required
            control['dropdown'] = 'int';
            control['dt_code'] = 'int';
        }
        else if (this.editPopupModal.bigInt == true) {
            control['display_name'] = this.editPopupModal.bigintNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.bigintMarkRequired.value; // use this param for required
            control['dt_code'] = 'bigint';
            control['field_type'] = 'bigint';
        }
        else if (this.editPopupModal.decimalShow == true) {
            control['display_name'] = this.editPopupModal.decimalNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.decimalMarkRequired.value; // use this param for required
            control['dropdown'] = 'decimal';
            control['dt_code'] = 'decimal';
        }
        else if (this.editPopupModal.dateShow == true) {
            control['display_name'] = this.editPopupModal.dateNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.dateMarkRequired.value; // use this param for required
            control['dt_code'] = 'date';
            control['dropdown'] = 'date';
        }
        else if (this.editPopupModal.dateTimeShow == true) {
            control['display_name'] = this.editPopupModal.dateNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.dateMarkRequired.value; // use this param for required
            control['dt_code'] = 'datetime';
            control['dropdown'] = 'datetime';
        }
        else if (this.editPopupModal.booleanShow == true) {
            control['display_name'] = this.editPopupModal.booleanNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.booleanMarkRequired.value; // use this param for required
            control['dropdown'] = 'boolean';
            control['dt_code'] = 'boolean';
        }
        else if (this.editPopupModal.checkboxShow == true) {
            control['display_name'] = this.editPopupModal.checkboxNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.checkboxMarkRequired.value; // use this param for required
            control['picklist_options'] = this.editPopupModal.checkboxCharactersAllowed.value; // use this param for required
            control['dt_code'] = 'checkbox';
            control['dropdown'] = 'checkbox';
        }
        else if (this.editPopupModal.radioShow == true) {
            control['display_name'] = this.editPopupModal.radioNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.radioMarkRequired.value; // use this param for required
            control['picklist_options'] = this.editPopupModal.radioCharactersAllowed.value; // use this param for required
            control['dropdown'] = 'radio';
            control['dt_code'] = 'radio';
        }
        else if (this.editPopupModal.imageShow == true) {
            control['display_name'] = this.editPopupModal.urlNameDisplay.value; // use this param for question
            control['is_required'] = this.editPopupModal.urlMarkRequired.value; // use this param for required
            control['picklist_options'] = this.editPopupModal.urlCharactersAllowed.value; // use this param for required
            control['dt_code'] = 'image';
        }
        control['dependent_id'] = this.editPopupModal.ddlFormField.value;
        control['is_dependent'] = this.editPopupModal.chkIsDependant.value;
        control['dependent_value'] = this.editPopupModal.ddlOption.value;
        control['dependent_type'] = this.editPopupModal.dependentType.value;
        if (this.sectionIdentification == 'questionOnly') {
            this.questionnaire.mainSection[this.sectionIndex].mainSubSection[this.questionIndex].question = control;
            this.questionnaire.mainSection[this.sectionIndex].mainSubSection[this.questionIndex].question.statusId = this.editPopupModal.statusId.value;
            this.dragedColor = null;
        }
        else {
            this.questionnaire.mainSection[this.sectionIndex].mainSubSection[this.questionIndex].SubSectionQuestionAns[this.answerIndex] = control;
            this.questionnaire.mainSection[this.sectionIndex].mainSubSection[this.questionIndex].SubSectionQuestionAns[this.answerIndex].statusId = this.editPopupModal.statusId.value;
            this.dragedColor = null;
        }
        this.isSomethingChange = true;
    };
    ManagequestionnaireComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__["ServicesappointmentService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('propertiesPopupform', { static: false }),
        __metadata("design:type", _viewpopupwindowform_propertiespopupform_component__WEBPACK_IMPORTED_MODULE_8__["PropertiespopupformComponent"])
    ], ManagequestionnaireComponent.prototype, "editPopupModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("myckeditor", { static: false }),
        __metadata("design:type", Object)
    ], ManagequestionnaireComponent.prototype, "ckeditor", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("questionnairForm", { static: false }),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgForm"])
    ], ManagequestionnaireComponent.prototype, "questionnairForm", void 0);
    ManagequestionnaireComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-managequestionnaire',
            template: __importDefault(__webpack_require__(/*! raw-loader!./managequestionnaire.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/managequestionnaire/managequestionnaire.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./managequestionnaire.component.scss */ "./src/app/views/servicesappointment/managequestionnaire/managequestionnaire.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _servicesappointment_service__WEBPACK_IMPORTED_MODULE_5__["ServicesappointmentService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], ManagequestionnaireComponent);
    return ManagequestionnaireComponent;
}());



/***/ }),

/***/ "./src/app/views/servicesappointment/managequestionnaire/viewpopupwindowform/propertiespopupform.component.scss":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/views/servicesappointment/managequestionnaire/viewpopupwindowform/propertiespopupform.component.scss ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VzYXBwb2ludG1lbnQvbWFuYWdlcXVlc3Rpb25uYWlyZS92aWV3cG9wdXB3aW5kb3dmb3JtL3Byb3BlcnRpZXNwb3B1cGZvcm0uY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/servicesappointment/managequestionnaire/viewpopupwindowform/propertiespopupform.component.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/app/views/servicesappointment/managequestionnaire/viewpopupwindowform/propertiespopupform.component.ts ***!
  \********************************************************************************************************************/
/*! exports provided: PropertiespopupformComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertiespopupformComponent", function() { return PropertiespopupformComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _manageform_form_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../manageform/form.service */ "./src/app/views/manageform/form.service.ts");
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







var PropertiespopupformComponent = /** @class */ (function () {
    function PropertiespopupformComponent(fb, commonService, router, toaster, route) {
        this.fb = fb;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.customFieldLayOut = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.active = false;
        this.singleLine = false;
        this.multiLine = false;
        this.SelectList = false;
        this.intShow = false;
        this.decimalShow = false;
        this.booleanShow = false;
        this.bigInt = false;
        this.dateShow = false;
        this.dateTimeShow = false;
        this.checkboxShow = false;
        this.radioShow = false;
        this.urlShow = false;
        this.imageShow = false;
        this.is_system_generated = false;
        //ddloptions :any;
        this.ddloptionsvalidation = false;
        this.editid = 0;
        this.colorList = [];
        // ddloptionscolor : any;
        this.idcounter = 0;
        this.selectoptions = new _manageform_form_service__WEBPACK_IMPORTED_MODULE_6__["SelectListArray"]();
        this.selectlistvalues = [];
        this.loadSave = false;
        //************************* dependancy field code *************************************/
        this.isDisplayDependentSection = true;
        this.isDependant = false;
        this.FormFieldList = [];
        this.ddlOptionList = [];
        this.selectOptionsddl = [
            {
                customId: 1,
                customText: '.png'
            }, {
                customId: 2,
                customText: '.jpeg'
            }, {
                customId: 3,
                customText: '.tiff'
            }, {
                customId: 4,
                customText: '.bmp'
            },
        ];
    }
    PropertiespopupformComponent.prototype.ngOnInit = function () {
        this.initForm();
        //this.lstActiveStatus = this.ActiveStatus;
    };
    PropertiespopupformComponent.prototype.incrementcounterid = function () {
        return this.idcounter++;
    };
    PropertiespopupformComponent.prototype.decrementcounterid = function () {
        return this.idcounter--;
    };
    PropertiespopupformComponent.prototype.editselectlist = function (id, value, color) {
        this.editid = id;
        this.properties.controls["ddloptions"].setValue(value);
        this.properties.controls["ddloptionscolor"].setValue(color);
        this.colorCode = color;
    };
    PropertiespopupformComponent.prototype.SetColorFor = function () {
        this.colorCode = this.properties.controls["ddloptionscolor"].value;
    };
    PropertiespopupformComponent.prototype.SetColorFor1 = function (i, event) {
        var rendomdata = event;
        this.colorCode[i] = rendomdata;
        //this.configurationSetings.value.addmoreFields[i].chooseColor;
    };
    PropertiespopupformComponent.prototype.add = function () {
        var _this = this;
        if (this.ddloptions.value != null && this.ddloptions.value != "") {
            this.ddloptionsvalidation = false;
            this.selectoptions = new _manageform_form_service__WEBPACK_IMPORTED_MODULE_6__["SelectListArray"]();
            if (this.editid == 0) {
                this.selectoptions.id = this.incrementcounterid();
                this.selectoptions.isinserted = 1;
                this.selectoptions.value = this.ddloptions.value;
                this.selectoptions.color = this.ddloptionscolor.value;
                this.selectlistvalues.push(this.selectoptions);
            }
            else {
                var targetIdx = this.selectlistvalues.find(function (item) { return item.id == _this.editid; });
                var indexObj = this.selectlistvalues.indexOf(targetIdx);
                this.selectlistvalues[indexObj].value = this.ddloptions.value;
                this.selectlistvalues[indexObj].color = this.ddloptionscolor.value;
            }
            this.properties.controls["selectlistvalue"].setValue(this.selectlistvalues);
            this.properties.controls["ddloptions"].setValue(null);
            this.properties.controls["ddloptionscolor"].setValue(null);
            this.colorCode = "";
        }
        else {
            this.ddloptionsvalidation = true;
        }
    };
    PropertiespopupformComponent.prototype.close = function () {
        this.active = false;
        this.propertiesPopupForm.hide();
    };
    PropertiespopupformComponent.prototype.show = function (list, sectionIndex, questionIndex, answerIndex, questionLists, statusId) {
        //this.refresh();
        //// console.log("List", list);
        this.fieldName = list.name;
        this.is_system_generated = list.is_system_generated;
        this.fieldsType = list.dt_code;
        this.fieldList = list;
        if (list.dt_code == 'text' || list.dt_code == 'textbox') {
            this.initForm();
            this.singleLine = true;
            this.SelectList = false;
            this.multiLine = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.imageShow = false;
            this.booleanShow = false;
            this.dateShow = false;
            this.checkboxShow = false;
            this.radioShow = false;
            this.properties.controls["singleLineNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["singleLineNameDisplay"].updateValueAndValidity();
            this.properties.controls["singleLineCharactersAllowed"].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^[0-9]*$"), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4),]);
            //this.properties.controls["singleLineCharactersAllowed"].setValidators(Validators.required); change by aakash goyal due to veera sir
            this.properties.controls["singleLineCharactersAllowed"].updateValueAndValidity();
            this.singleLineCharactersAllowed.setValue(list.length);
            this.singleLineNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.singleLineMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'textarea') {
            debugger;
            this.initForm();
            this.multiLine = true;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.dateTimeShow = false;
            this.booleanShow = false;
            this.imageShow = false;
            this.checkboxShow = false;
            this.radioShow = false;
            this.properties.controls["multiLineNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["multiLineNameDisplay"].updateValueAndValidity();
            this.properties.controls["multiLineCharactersAllowed"].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^[0-9]*$"), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4),]);
            this.properties.controls["multiLineCharactersAllowed"].updateValueAndValidity();
            this.multiLineCharactersAllowed.setValue(typeof list.length == undefined ? 200 : list.length);
            this.multiLineNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.multiLineMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'select') {
            debugger;
            this.initForm();
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = true;
            this.intShow = false;
            this.booleanShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.dateTimeShow = false;
            this.checkboxShow = false;
            this.imageShow = false;
            this.radioShow = false;
            this.properties.controls["selectListLineNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["selectListLineNameDisplay"].updateValueAndValidity();
            this.properties.controls["selectListCharactersAllowed"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["selectListCharactersAllowed"].updateValueAndValidity();
            this.selectListCharactersAllowed.setValue(list.length);
            this.selectListLineNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.selectListMarkRequired.setValue(list.is_required);
            this.selectListMultiddl.setValue(list.picklist_options);
            this.selectlistvalues = list.selectlistvalues == undefined ? new Array() : list.selectlistvalues;
            // console.log('aaaa', this.selectlistvalues);
        }
        else if (list.dt_code == 'bigint') {
            this.initForm();
            this.multiLine = false;
            this.singleLine = false;
            this.booleanShow = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = true;
            this.decimalShow = false;
            this.dateShow = false;
            this.dateTimeShow = false;
            this.checkboxShow = false;
            this.radioShow = false;
            this.imageShow = false;
            this.properties.controls["bigintNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["bigintNameDisplay"].updateValueAndValidity();
            this.properties.controls["bigintCharactersAllowed"].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^[0-9]*$"), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4),]);
            this.properties.controls["bigintCharactersAllowed"].updateValueAndValidity();
            this.bigintCharactersAllowed.setValue(list.length);
            this.bigintNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.bigintMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'int' || list.dt_code == 'number') {
            this.initForm();
            this.booleanShow = false;
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = true;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.dateTimeShow = false;
            this.checkboxShow = false;
            this.imageShow = false;
            this.radioShow = false;
            this.properties.controls["intNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["intNameDisplay"].updateValueAndValidity();
            this.properties.controls["intCharactersAllowed"].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^[0-9]*$"), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4),]);
            this.properties.controls["intCharactersAllowed"].updateValueAndValidity();
            this.intCharactersAllowed.setValue(list.length);
            this.intNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.intMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'decimal') {
            this.initForm();
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.booleanShow = false;
            this.decimalShow = true;
            this.dateShow = false;
            this.dateTimeShow = false;
            this.imageShow = false;
            this.checkboxShow = false;
            this.radioShow = false;
            this.properties.controls["decimalNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["decimalNameDisplay"].updateValueAndValidity();
            this.properties.controls["decimalCharactersAllowed"].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^[0-9]*$"), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4),]);
            this.properties.controls["decimalCharactersAllowed"].updateValueAndValidity();
            this.decimalCharactersAllowed.setValue(list.length);
            this.decimalNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.decimalMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'boolean') {
            this.initForm();
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.dateTimeShow = false;
            this.checkboxShow = false;
            this.booleanShow = true;
            this.imageShow = false;
            this.radioShow = false;
            this.properties.controls["booleanNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["booleanNameDisplay"].updateValueAndValidity();
            this.booleanNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.booleanMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'date') {
            this.initForm();
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = true;
            this.dateTimeShow = false;
            this.checkboxShow = false;
            this.imageShow = false;
            this.booleanShow = false;
            this.radioShow = false;
            this.properties.controls["dateNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["dateNameDisplay"].updateValueAndValidity();
            this.dateNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.dateMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'datetime') {
            this.initForm();
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.dateTimeShow = true;
            this.checkboxShow = false;
            this.imageShow = false;
            this.booleanShow = false;
            this.radioShow = false;
            this.properties.controls["dateNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["dateNameDisplay"].updateValueAndValidity();
            this.dateNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.dateMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'checkbox') {
            debugger;
            this.initForm();
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.dateTimeShow = false;
            this.booleanShow = false;
            this.checkboxShow = true;
            this.radioShow = false;
            this.imageShow = false;
            this.properties.controls["checkboxNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["checkboxNameDisplay"].updateValueAndValidity();
            this.properties.controls["checkboxCharactersAllowed"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["checkboxCharactersAllowed"].updateValueAndValidity();
            this.checkboxNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.checkboxCharactersAllowed.setValue(list.picklist_options);
            this.checkboxMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'radio') {
            this.initForm();
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.dateTimeShow = false;
            this.checkboxShow = false;
            this.booleanShow = false;
            this.radioShow = true;
            this.imageShow = false;
            this.properties.controls["radioNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["radioNameDisplay"].updateValueAndValidity();
            this.properties.controls["radioCharactersAllowed"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["radioCharactersAllowed"].updateValueAndValidity();
            this.radioNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            //this.radioCharactersAllowed.setValue(list.length);
            this.radioMarkRequired.setValue(list.is_required);
            this.radioCharactersAllowed.setValue(list.picklist_options);
        }
        else if (list.dt_code == 'image') {
            this.initForm();
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.dateTimeShow = false;
            this.checkboxShow = false;
            this.radioShow = false;
            this.booleanShow = false;
            this.imageShow = true;
            this.properties.controls["urlNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["urlNameDisplay"].updateValueAndValidity();
            this.urlNameDisplay.setValue(list.display_name == '' ? list.name : list.display_name);
            this.urlCharactersAllowed.setValue(list.picklist_options);
            this.urlMarkRequired.setValue(list.is_required);
            //this.formfieldvisible.setValue(list.form_field_visibility);
            //this.listfieldvisible.setValue(list.list_field_visibility);
        }
        else {
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.dateTimeShow = false;
            this.checkboxShow = false;
            this.booleanShow = false;
            this.radioShow = false;
            this.urlShow = false;
        }
        this.listfieldvisible.setValue(list.list_field_visibility);
        var boolValue = (list.is_readOnly == "true");
        this.properties.controls["is_readOnly"].setValue(boolValue);
        this.properties.controls["formfieldvisible"].setValue(list.form_field_visibility == "YES" ? true : false);
        this.properties.controls["listfieldvisible"].setValue(list.list_field_visibility == "YES" ? true : false);
        this.properties.controls["statusId"].setValue(statusId);
        if (this.formfieldvisible.value) {
            if (this.imageShow) {
                this.isDisplayDependentSection = false;
            }
            else {
                this.isDisplayDependentSection = true;
            }
            if (list.is_dependent) {
                this.chkIsDependant.setValue(true);
                this.isDependant = true;
            }
            else {
                this.chkIsDependant.setValue(false);
                this.isDependant = false;
            }
        }
        else {
            this.isDisplayDependentSection = false;
        }
        if (list.is_dependent) {
            debugger;
            this.ddlFormField.setValue(list.dependent_id);
            var control = questionLists.filter(function (m) { return m.form_field_id.toString() == list.dependent_id; })[0];
            this.OnDependencyFieldChange(control);
            this.ddlOption.setValue(list.dependent_value);
            this.dependentType.setValue(list.dependent_type);
        }
        this.propertiesPopupForm.show();
        this.active = true;
        debugger;
        this.FormFieldList = questionLists.map(function (m) { return { dependent_type: m.dependent_type, value: m.display_name, id: m.form_field_id.toString(), picklist_options: m.picklist_options, selectlistvalues: m.selectlistvalues, dt_code: m.dt_code }; });
    };
    PropertiespopupformComponent.prototype.Save = function () {
        var _this = this;
        debugger;
        var error = 0;
        if (this.properties.controls["singleLineMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
            error = 1;
        else if (this.properties.controls["multiLineMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
            error = 1;
        else if (this.properties.controls["selectListMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
            error = 1;
        else if (this.properties.controls["intMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
            error = 1;
        else if (this.properties.controls["bigintMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
            error = 1;
        else if (this.properties.controls["decimalMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
            error = 1;
        else if (this.properties.controls["checkboxMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
            error = 1;
        else if (this.properties.controls["radioMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
            error = 1;
        else if (this.properties.controls["urlMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
            error = 1;
        else if (this.properties.controls["dateMarkRequired"].value == true && this.properties.controls["is_readOnly"].value == true)
            error = 1;
        if (this.properties.valid && error == 0) {
            // console.log(this.parentData);
            var myList = [{ id: 'aaa1', name: 'aaa' }, { id: 'bbb2', name: 'bbb' }, { id: 'ccc3', name: 'ccc' }];
            var itemUpdated = { id: 'aaa1', name: 'Another approach' };
            //this.parentData[this.index].name = this.properties.value.singleLineNameDisplay
            //this.parentData[this.index].name = this.properties.value.singleLineNameDisplay
            this.customFieldLayOut.emit();
            this.propertiesPopupForm.hide();
            //this.parentData.find(this.index).name = this.properties.value.singleLineNameDisplay;
            // console.log("Please", this.properties.value);
        }
        else if (error == 1) {
            setTimeout(function () {
                _this.toaster.error('Mark as Required and Is Readonly both can not be check at the same time');
            }, 1000);
        }
        else {
            this.commonService.validateAllFormFields(this.properties);
        }
    };
    Object.defineProperty(PropertiespopupformComponent.prototype, "chkIsDependant", {
        get: function () { return this.properties.get('chkIsDependant'); },
        enumerable: true,
        configurable: true
    });
    PropertiespopupformComponent.prototype.onCheckChange = function (event, type) {
        debugger;
        if (type == "formfieldvisible") {
            if (this.formfieldvisible.value) {
                this.isDisplayDependentSection = true;
            }
            else {
                this.isDisplayDependentSection = false;
                this.chkIsDependant.setValue(false);
                this.isDependant = false;
            }
        }
        else if (type == "chkIsDependant") {
            if (this.chkIsDependant.value) {
                this.isDependant = true;
            }
            else {
                this.chkIsDependant.setValue(false);
                this.isDependant = false;
            }
        }
    };
    PropertiespopupformComponent.prototype.OnDependencyFieldChange = function (e) {
        this.ddlOptionList = [];
        this.ddlOption.setValue(null);
        this.dependentType.setValue(null);
        this.ddlOption.updateValueAndValidity;
        if (e.selectlistvalues) {
            debugger;
            if (e.selectlistvalues instanceof Array)
                this.ddlOptionList = e.selectlistvalues;
            else {
                var array = e.selectlistvalues.split(',');
                var _resultList_1 = [];
                if (array.length > 0) {
                    array.forEach(function (item, index) {
                        _resultList_1.push(JSON.parse('{"value":"' + item + '","id":"' + item + '"}'));
                    });
                    this.ddlOptionList = _resultList_1;
                }
            }
        }
        else if (e.picklist_options) {
            var array = e.picklist_options.split(',');
            var _resultList_2 = [];
            if (array.length > 0) {
                array.forEach(function (item, index) {
                    _resultList_2.push(JSON.parse('{"value":"' + item + '","id":"' + item + '"}'));
                });
                this.ddlOptionList = _resultList_2;
            }
        }
        else {
            var _resultList = [];
            _resultList.push(JSON.parse('{"value":"Yes","id":"' + true + '"}'));
            _resultList.push(JSON.parse('{"value":"No","id":"' + false + '"}'));
            this.ddlOptionList = _resultList;
        }
        this.dependentType.setValue(e.dependent_type);
    };
    PropertiespopupformComponent.prototype.OnDependencyOptionChange = function (events) {
    };
    PropertiespopupformComponent.prototype.onClear = function (type) {
        if (type == "ddlFormField") {
            this.ddlOption.setValue(null);
        }
        else if (type == "ddlOption") {
        }
        else if (type == "ddlFileExt") {
            this.ddlFileExt.setValue(null);
        }
    };
    PropertiespopupformComponent.prototype.initForm = function () {
        this.properties = this.fb.group({
            singleLineNameDisplay: [null],
            singleLineCharactersAllowed: [null],
            singleLineMarkRequired: [false],
            multiLineNameDisplay: [null],
            multiLineCharactersAllowed: [null],
            multiLineMarkRequired: [false],
            //select List
            selectListLineNameDisplay: [null],
            selectListCharactersAllowed: [null],
            selectListMarkRequired: [false],
            selectListMultiddl: [false],
            //int
            intNameDisplay: [null],
            intCharactersAllowed: [null],
            intMarkRequired: [null],
            //bigInt
            bigintNameDisplay: [null],
            bigintCharactersAllowed: [null],
            bigintMarkRequired: [false],
            //decimal
            decimalCharactersAllowed: [null],
            decimalNameDisplay: [null],
            decimalMarkRequired: [false],
            // Date
            dateNameDisplay: [null],
            dateMarkRequired: [false],
            booleanNameDisplay: [null],
            booleanMarkRequired: [false],
            checkboxNameDisplay: [null],
            checkboxCharactersAllowed: [null],
            checkboxMarkRequired: [false],
            radioNameDisplay: [null],
            radioCharactersAllowed: [null],
            radioMarkRequired: [false],
            urlNameDisplay: [null],
            urlCharactersAllowed: [null],
            urlMarkRequired: [false],
            listfieldvisible: [false],
            formfieldvisible: [true],
            chkIsDependant: [false],
            ddloptions: '',
            ddloptionscolor: '',
            selectlistvalue: [], is_readOnly: [false],
            ddlFormField: [],
            ddlOption: [],
            ddlFileExt: [],
            dependentType: [],
            statusId: []
        });
    };
    Object.defineProperty(PropertiespopupformComponent.prototype, "statusId", {
        get: function () { return this.properties.get('statusId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "ddlFormField", {
        get: function () { return this.properties.get('ddlFormField'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "ddlOption", {
        get: function () { return this.properties.get('ddlOption'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "dependentType", {
        get: function () { return this.properties.get('dependentType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "ddlFileExt", {
        get: function () { return this.properties.get('ddlFileExt'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "singleLineNameDisplay", {
        get: function () { return this.properties.get('singleLineNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "singleLineCharactersAllowed", {
        get: function () { return this.properties.get('singleLineCharactersAllowed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "singleLineMarkRequired", {
        get: function () { return this.properties.get('singleLineMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "multiLineNameDisplay", {
        //mutiline popup window
        get: function () { return this.properties.get('multiLineNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "multiLineCharactersAllowed", {
        get: function () { return this.properties.get('multiLineCharactersAllowed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "multiLineMarkRequired", {
        get: function () { return this.properties.get('multiLineMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "selectListLineNameDisplay", {
        //Select List
        get: function () { return this.properties.get('selectListLineNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "selectListCharactersAllowed", {
        get: function () { return this.properties.get('selectListCharactersAllowed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "selectListMarkRequired", {
        get: function () { return this.properties.get('selectListMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "selectListMultiddl", {
        get: function () { return this.properties.get('selectListMultiddl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "intNameDisplay", {
        //int
        get: function () { return this.properties.get('intNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "intCharactersAllowed", {
        get: function () { return this.properties.get('intCharactersAllowed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "intMarkRequired", {
        get: function () { return this.properties.get('intMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "bigintNameDisplay", {
        //bigint
        get: function () { return this.properties.get('bigintNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "bigintCharactersAllowed", {
        get: function () { return this.properties.get('bigintCharactersAllowed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "bigintMarkRequired", {
        get: function () { return this.properties.get('bigintMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "decimalCharactersAllowed", {
        //decimal
        get: function () { return this.properties.get('decimalCharactersAllowed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "decimalNameDisplay", {
        get: function () { return this.properties.get('decimalNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "decimalMarkRequired", {
        get: function () { return this.properties.get('decimalMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "dateMarkRequired", {
        //date
        get: function () { return this.properties.get('dateMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "dateNameDisplay", {
        get: function () { return this.properties.get('dateNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "booleanMarkRequired", {
        get: function () { return this.properties.get('booleanMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "booleanNameDisplay", {
        get: function () { return this.properties.get('booleanNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "checkboxNameDisplay", {
        // CheckBox
        get: function () { return this.properties.get('checkboxNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "checkboxCharactersAllowed", {
        get: function () { return this.properties.get('checkboxCharactersAllowed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "checkboxMarkRequired", {
        get: function () { return this.properties.get('checkboxMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "radioNameDisplay", {
        //rado
        get: function () { return this.properties.get('radioNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "radioCharactersAllowed", {
        get: function () { return this.properties.get('radioCharactersAllowed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "radioMarkRequired", {
        get: function () { return this.properties.get('radioMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "urlNameDisplay", {
        //url
        get: function () { return this.properties.get('urlNameDisplay'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "urlCharactersAllowed", {
        get: function () { return this.properties.get('urlCharactersAllowed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "urlMarkRequired", {
        get: function () { return this.properties.get('urlMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "formfieldvisible", {
        get: function () { return this.properties.get('formfieldvisible'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "listfieldvisible", {
        get: function () { return this.properties.get('listfieldvisible'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "ddloptions", {
        get: function () { return this.properties.get('ddloptions'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "ddloptionscolor", {
        get: function () { return this.properties.get('ddloptionscolor'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "selectlistvalue", {
        get: function () { return this.properties.get('selectlistvalue'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "is_readOnly", {
        get: function () { return this.properties.get('is_readOnly'); },
        enumerable: true,
        configurable: true
    });
    PropertiespopupformComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('propertiesPopupform', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_4__["ModalDirective"])
    ], PropertiespopupformComponent.prototype, "propertiesPopupForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PropertiespopupformComponent.prototype, "customFieldLayOut", void 0);
    PropertiespopupformComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-propertiespopupform',
            template: __importDefault(__webpack_require__(/*! raw-loader!./propertiespopupform.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/managequestionnaire/viewpopupwindowform/propertiespopupform.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./propertiespopupform.component.scss */ "./src/app/views/servicesappointment/managequestionnaire/viewpopupwindowform/propertiespopupform.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], PropertiespopupformComponent);
    return PropertiespopupformComponent;
}());



/***/ }),

/***/ "./src/app/views/servicesappointment/servicesappointment-routing.module.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/views/servicesappointment/servicesappointment-routing.module.ts ***!
  \*********************************************************************************/
/*! exports provided: ServicesappointmentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesappointmentRoutingModule", function() { return ServicesappointmentRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _servicesappointmentlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./servicesappointmentlist.component */ "./src/app/views/servicesappointment/servicesappointmentlist.component.ts");
/* harmony import */ var _viewservicesappointment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./viewservicesappointment.component */ "./src/app/views/servicesappointment/viewservicesappointment.component.ts");
/* harmony import */ var _addeditservicesappointment_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addeditservicesappointment.component */ "./src/app/views/servicesappointment/addeditservicesappointment.component.ts");
/* harmony import */ var _servicesappointmentmapview_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./servicesappointmentmapview.component */ "./src/app/views/servicesappointment/servicesappointmentmapview.component.ts");
/* harmony import */ var _managequestionnaire_managequestionnaire_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./managequestionnaire/managequestionnaire.component */ "./src/app/views/servicesappointment/managequestionnaire/managequestionnaire.component.ts");
/* harmony import */ var _managequestionnaire_managequestionnaire_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./managequestionnaire/managequestionnaire-list.component */ "./src/app/views/servicesappointment/managequestionnaire/managequestionnaire-list.component.ts");
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
    { path: '', component: _servicesappointmentlist_component__WEBPACK_IMPORTED_MODULE_2__["ServicesappointmentlistComponent"] },
    { path: 'addeditservicesappointment', component: _addeditservicesappointment_component__WEBPACK_IMPORTED_MODULE_4__["AddeditservicesappointmentComponent"] },
    { path: 'addeditservicesappointment/:id', component: _addeditservicesappointment_component__WEBPACK_IMPORTED_MODULE_4__["AddeditservicesappointmentComponent"] },
    { path: 'map', component: _servicesappointmentmapview_component__WEBPACK_IMPORTED_MODULE_5__["ServicesappointmentMapViewComponent"] },
    { path: 'view/:id', component: _viewservicesappointment_component__WEBPACK_IMPORTED_MODULE_3__["ViewservicesappointmentComponent"] },
    { path: 'managequestionnaire', component: _managequestionnaire_managequestionnaire_component__WEBPACK_IMPORTED_MODULE_6__["ManagequestionnaireComponent"] },
    { path: 'questionnairechecklist', component: _managequestionnaire_managequestionnaire_list_component__WEBPACK_IMPORTED_MODULE_7__["ManagequestionnaireListComponent"] },
    { path: 'managequestionnaire/:id', component: _managequestionnaire_managequestionnaire_component__WEBPACK_IMPORTED_MODULE_6__["ManagequestionnaireComponent"] },
];
var ServicesappointmentRoutingModule = /** @class */ (function () {
    function ServicesappointmentRoutingModule() {
    }
    ServicesappointmentRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ServicesappointmentRoutingModule);
    return ServicesappointmentRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/servicesappointment/servicesappointment.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/views/servicesappointment/servicesappointment.module.ts ***!
  \*************************************************************************/
/*! exports provided: ServicesappointmentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesappointmentModule", function() { return ServicesappointmentModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _servicesappointment_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./servicesappointment-routing.module */ "./src/app/views/servicesappointment/servicesappointment-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-password-toggle */ "./node_modules/ngx-password-toggle/ngx-password-toggle.umd.js");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _servicesappointmentlist_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./servicesappointmentlist.component */ "./src/app/views/servicesappointment/servicesappointmentlist.component.ts");
/* harmony import */ var _viewservicesappointment_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./viewservicesappointment.component */ "./src/app/views/servicesappointment/viewservicesappointment.component.ts");
/* harmony import */ var _addeditservicesappointment_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./addeditservicesappointment.component */ "./src/app/views/servicesappointment/addeditservicesappointment.component.ts");
/* harmony import */ var _servicesappointmentmapview_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./servicesappointmentmapview.component */ "./src/app/views/servicesappointment/servicesappointmentmapview.component.ts");
/* harmony import */ var primeng_gmap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/gmap */ "./node_modules/primeng/gmap.js");
/* harmony import */ var primeng_gmap__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(primeng_gmap__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var ng_fullcalendar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng-fullcalendar */ "./node_modules/ng-fullcalendar/fesm5/ng-fullcalendar.js");
/* harmony import */ var _auditpopup_auditpopup_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./auditpopup/auditpopup.component */ "./src/app/views/servicesappointment/auditpopup/auditpopup.component.ts");
/* harmony import */ var _managequestionnaire_managequestionnaire_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./managequestionnaire/managequestionnaire.component */ "./src/app/views/servicesappointment/managequestionnaire/managequestionnaire.component.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm5/ng2-ckeditor.js");
/* harmony import */ var primeng_dragdrop__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/dragdrop */ "./node_modules/primeng/dragdrop.js");
/* harmony import */ var primeng_dragdrop__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(primeng_dragdrop__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _managequestionnaire_viewpopupwindowform_propertiespopupform_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./managequestionnaire/viewpopupwindowform/propertiespopupform.component */ "./src/app/views/servicesappointment/managequestionnaire/viewpopupwindowform/propertiespopupform.component.ts");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/colorpicker */ "./node_modules/primeng/colorpicker.js");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(primeng_colorpicker__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _managequestionnaire_managequestionnaire_list_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./managequestionnaire/managequestionnaire-list.component */ "./src/app/views/servicesappointment/managequestionnaire/managequestionnaire-list.component.ts");
/* harmony import */ var _syncfusion_ej2_angular_navigations__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @syncfusion/ej2-angular-navigations */ "./node_modules/@syncfusion/ej2-angular-navigations/@syncfusion/ej2-angular-navigations.es5.js");
/* harmony import */ var _syncfusion_ej2_angular_schedule__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @syncfusion/ej2-angular-schedule */ "./node_modules/@syncfusion/ej2-angular-schedule/@syncfusion/ej2-angular-schedule.es5.js");
/* harmony import */ var _filterpopup_filterpopup_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./filterpopup/filterpopup.component */ "./src/app/views/servicesappointment/filterpopup/filterpopup.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
























var ServicesappointmentModule = /** @class */ (function () {
    function ServicesappointmentModule() {
    }
    ServicesappointmentModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_servicesappointmentlist_component__WEBPACK_IMPORTED_MODULE_8__["ServicesappointmentlistComponent"], _viewservicesappointment_component__WEBPACK_IMPORTED_MODULE_9__["ViewservicesappointmentComponent"], _addeditservicesappointment_component__WEBPACK_IMPORTED_MODULE_10__["AddeditservicesappointmentComponent"], _servicesappointmentmapview_component__WEBPACK_IMPORTED_MODULE_11__["ServicesappointmentMapViewComponent"], _auditpopup_auditpopup_component__WEBPACK_IMPORTED_MODULE_14__["AuditpopupComponent"], _managequestionnaire_managequestionnaire_component__WEBPACK_IMPORTED_MODULE_15__["ManagequestionnaireComponent"], _managequestionnaire_managequestionnaire_component__WEBPACK_IMPORTED_MODULE_15__["ManagequestionnaireComponent"], _managequestionnaire_viewpopupwindowform_propertiespopupform_component__WEBPACK_IMPORTED_MODULE_18__["PropertiespopupformComponent"], _managequestionnaire_managequestionnaire_list_component__WEBPACK_IMPORTED_MODULE_20__["ManagequestionnaireListComponent"], _filterpopup_filterpopup_component__WEBPACK_IMPORTED_MODULE_23__["FilterpopupComponent"]],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], primeng_colorpicker__WEBPACK_IMPORTED_MODULE_19__["ColorPickerModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _syncfusion_ej2_angular_schedule__WEBPACK_IMPORTED_MODULE_22__["ScheduleModule"], _syncfusion_ej2_angular_navigations__WEBPACK_IMPORTED_MODULE_21__["TreeViewModule"], ng_fullcalendar__WEBPACK_IMPORTED_MODULE_13__["FullCalendarModule"], ng2_ckeditor__WEBPACK_IMPORTED_MODULE_16__["CKEditorModule"],
                _servicesappointment_routing_module__WEBPACK_IMPORTED_MODULE_2__["ServicesappointmentRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"], ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__["NgxPasswordToggleModule"], primeng_dragdrop__WEBPACK_IMPORTED_MODULE_17__["DragDropModule"], primeng_gmap__WEBPACK_IMPORTED_MODULE_12__["GMapModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalModule"]
            ]
        })
    ], ServicesappointmentModule);
    return ServicesappointmentModule;
}());



/***/ }),

/***/ "./src/app/views/servicesappointment/servicesappointmentlist.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/views/servicesappointment/servicesappointmentlist.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".specialist-image {\n  width: 40px;\n  height: 40px;\n  float: left;\n  border-radius: 50%;\n  margin-right: 10px; }\n\nul.e-list-parent {\n  max-height: 65vh; }\n\n.e-header-calendar .e-content table {\n  min-width: 100% !important; }\n\n.open-button {\n  background-color: #555;\n  color: white;\n  padding: 16px 20px;\n  border: none;\n  cursor: pointer;\n  opacity: 0.8;\n  position: fixed;\n  bottom: 23px;\n  right: 28px;\n  width: 280px; }\n\n/* The popup form - hidden by default */\n\n.form-popup {\n  display: none;\n  position: absolute;\n  bottom: 0px;\n  right: 0px;\n  border: 3px solid #f1f1f1;\n  z-index: 9; }\n\n/* Add styles to the form container */\n\n.form-container {\n  max-width: 300px;\n  padding: 10px;\n  background-color: white; }\n\n/* Full-width input fields */\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3Mvc2VydmljZXNhcHBvaW50bWVudC9EOlxcUHJpbmNlIFNpbmdoXFx3b3Jrc3BhY2VcXFNvbGdlbk9uZVxcTGFob3JlMVxcU29sZ2VuXFxzb2xnZW4ucG9ydGFsXFxDbGllbnRBcHAvc3JjXFxhcHBcXHZpZXdzXFxzZXJ2aWNlc2FwcG9pbnRtZW50XFxzZXJ2aWNlc2FwcG9pbnRtZW50bGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osV0FBVztFQUNYLGtCQUFrQjtFQUNsQixrQkFBa0IsRUFBQTs7QUFFcEI7RUFDRSxnQkFBZ0IsRUFBQTs7QUFFbEI7RUFDSSwwQkFBd0IsRUFBQTs7QUFHNUI7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osZUFBZTtFQUNmLFlBQVk7RUFDWixlQUFlO0VBQ2YsWUFBWTtFQUNaLFdBQVc7RUFDWCxZQUFZLEVBQUE7O0FBR2QsdUNBQUE7O0FBQ0E7RUFDRSxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxVQUFVO0VBQ1YseUJBQXlCO0VBQ3pCLFVBQVUsRUFBQTs7QUFHWixxQ0FBQTs7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsdUJBQXVCLEVBQUE7O0FBR3pCLDRCQUFBIiwiZmlsZSI6InNyYy9hcHAvdmlld3Mvc2VydmljZXNhcHBvaW50bWVudC9zZXJ2aWNlc2FwcG9pbnRtZW50bGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kYXRhdGFibGUtY3VzdG9tLWhlaWdodCB7XHJcbiAgLy9oZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcclxufVxyXG4uc3BlY2lhbGlzdC1pbWFnZSB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxudWwuZS1saXN0LXBhcmVudCB7XHJcbiAgbWF4LWhlaWdodDogNjV2aDtcclxufVxyXG4uZS1oZWFkZXItY2FsZW5kYXIgLmUtY29udGVudCB0YWJsZXtcclxuICAgIG1pbi13aWR0aDoxMDAlIWltcG9ydGFudDtcclxufVxyXG5cclxuLm9wZW4tYnV0dG9uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBwYWRkaW5nOiAxNnB4IDIwcHg7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBvcGFjaXR5OiAwLjg7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGJvdHRvbTogMjNweDtcclxuICByaWdodDogMjhweDtcclxuICB3aWR0aDogMjgwcHg7XHJcbn1cclxuXHJcbi8qIFRoZSBwb3B1cCBmb3JtIC0gaGlkZGVuIGJ5IGRlZmF1bHQgKi9cclxuLmZvcm0tcG9wdXAge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTogMHB4O1xyXG4gIHJpZ2h0OiAwcHg7XHJcbiAgYm9yZGVyOiAzcHggc29saWQgI2YxZjFmMTtcclxuICB6LWluZGV4OiA5O1xyXG59XHJcblxyXG4vKiBBZGQgc3R5bGVzIHRvIHRoZSBmb3JtIGNvbnRhaW5lciAqL1xyXG4uZm9ybS1jb250YWluZXIge1xyXG4gIG1heC13aWR0aDogMzAwcHg7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLyogRnVsbC13aWR0aCBpbnB1dCBmaWVsZHMgKi9cclxuIl19 */");

/***/ }),

/***/ "./src/app/views/servicesappointment/servicesappointmentlist.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/views/servicesappointment/servicesappointmentlist.component.ts ***!
  \********************************************************************************/
/*! exports provided: ServicesappointmentlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesappointmentlistComponent", function() { return ServicesappointmentlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./servicesappointment.service */ "./src/app/views/servicesappointment/servicesappointment.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _shared_manageviewnew_manageviewnew_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/manageviewnew/manageviewnew.component */ "./src/app/views/shared/manageviewnew/manageviewnew.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _addassignedresourcepopup_addassignedresourcepopup_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./addassignedresourcepopup/addassignedresourcepopup.component */ "./src/app/views/servicesappointment/addassignedresourcepopup/addassignedresourcepopup.component.ts");
/* harmony import */ var ng_fullcalendar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-fullcalendar */ "./node_modules/ng-fullcalendar/fesm5/ng-fullcalendar.js");
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @fullcalendar/daygrid */ "./node_modules/@fullcalendar/daygrid/main.esm.js");
/* harmony import */ var _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @fullcalendar/timegrid */ "./node_modules/@fullcalendar/timegrid/main.esm.js");
/* harmony import */ var _fullcalendar_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @fullcalendar/list */ "./node_modules/@fullcalendar/list/main.esm.js");
/* harmony import */ var _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @fullcalendar/interaction */ "./node_modules/@fullcalendar/interaction/main.esm.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../shared/scriptservice.service */ "./src/app/views/shared/scriptservice.service.ts");
/* harmony import */ var ngx_lightbox__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-lightbox */ "./node_modules/ngx-lightbox/index.js");
/* harmony import */ var ngx_lightbox__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(ngx_lightbox__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _auditpopup_auditpopup_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./auditpopup/auditpopup.component */ "./src/app/views/servicesappointment/auditpopup/auditpopup.component.ts");
/* harmony import */ var _auditchecklistpopup_auditchecklistpopup_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./auditchecklistpopup/auditchecklistpopup.component */ "./src/app/views/servicesappointment/auditchecklistpopup/auditchecklistpopup.component.ts");
/* harmony import */ var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ngx-bootstrap/utils */ "./node_modules/ngx-bootstrap/utils/fesm5/ngx-bootstrap-utils.js");
/* harmony import */ var _syncfusion_ej2_base__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @syncfusion/ej2-base */ "./node_modules/@syncfusion/ej2-base/index.js");
/* harmony import */ var _syncfusion_ej2_angular_schedule__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @syncfusion/ej2-angular-schedule */ "./node_modules/@syncfusion/ej2-angular-schedule/@syncfusion/ej2-angular-schedule.es5.js");
/* harmony import */ var _syncfusion_ej2_angular_navigations__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @syncfusion/ej2-angular-navigations */ "./node_modules/@syncfusion/ej2-angular-navigations/@syncfusion/ej2-angular-navigations.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _filterpopup_filterpopup_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./filterpopup/filterpopup.component */ "./src/app/views/servicesappointment/filterpopup/filterpopup.component.ts");
/* harmony import */ var _manageservicecrew_service_crew_members_popup_service_crew_members_popup_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../manageservicecrew/service-crew-members-popup/service-crew-members-popup.component */ "./src/app/views/manageservicecrew/service-crew-members-popup/service-crew-members-popup.component.ts");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../app.component */ "./src/app/app.component.ts");
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



































var ServicesappointmentlistComponent = /** @class */ (function () {
    //= [{ "Id": 40481, "Subject": "SA-10390", "EmployeeId": 52, "IsAllDay": true, "IsBlock": true, "StartTime": "2021-05-10T19:58:00", "EndTime": "2021-05-10T19:59:00" }, { "Id": 40839, "Subject": "SA-8552", "EmployeeId": 55, "IsAllDay": true, "IsBlock": true, "StartTime": "2021-05-06T00:01:00", "EndTime": "2021-05-15T00:01:00" }, { "Id": 40839, "Subject": "SA-8552", "EmployeeId": 397, "IsAllDay": true, "IsBlock": true, "StartTime": "2021-05-06T00:01:00", "EndTime": "2021-05-15T00:01:00" }, { "Id": 40481, "Subject": "SA-10390", "EmployeeId": 448, "IsAllDay": true, "IsBlock": true, "StartTime": "2021-05-10T19:58:00", "EndTime": "2021-05-10T19:59:00" }];
    function ServicesappointmentlistComponent(serviceappointmentlistService, dialogService, commonService, router, fb, servicesappointmentlistService, activeRoute, toaster, datetime, dynamicScripts, _lightboxConfig, _lightbox, elRef, renderer, datePipe, app) {
        //this.serviceappointmentlistService.GetCrewResourceCalenderList().subscribe((resp: any) => {
        //  if (resp) {
        //    this.calenderdatalist = this.serviceappointmentlistService.objectdata;
        //    console.log(' this.calenderdatalist', this.calenderdatalist)
        //  }
        //});
        var _this = this;
        this.serviceappointmentlistService = serviceappointmentlistService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.fb = fb;
        this.servicesappointmentlistService = servicesappointmentlistService;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.datetime = datetime;
        this.dynamicScripts = dynamicScripts;
        this._lightboxConfig = _lightboxConfig;
        this._lightbox = _lightbox;
        this.elRef = elRef;
        this.renderer = renderer;
        this.datePipe = datePipe;
        this.app = app;
        this.instance = new _syncfusion_ej2_base__WEBPACK_IMPORTED_MODULE_24__["Internationalization"]();
        this.subscriber = new rxjs__WEBPACK_IMPORTED_MODULE_27__["Subject"]();
        this.moduleName = 'serviceappointment';
        this.submoduleName = 'serviceappointment';
        this.custom_view_id = '';
        this.searchUserType = '';
        this.searchFilter = '';
        this.listFiltertext = '';
        this.listFiltersearchTypetext = '';
        this.calenderCondition = '';
        //modulePermission: ModuleList;
        this.loadSave = false;
        this.loadSaveunSchd = false;
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.vewId = '';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDatafor = {
            pager: {},
            data: []
        };
        this.searchTxt = '';
        this.listFilter = '';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["SelectionType"];
        this.tableName = 'tblserviceappointment';
        this.selected = [];
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.isAudit = false;
        this.addAssignedResourcesmodel = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["AssignSheduleAppointmentModel"]();
        this.addupdateassignedResourceModel = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["addupdateassignedResourceModel"]();
        this.attendancedata = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["attendancedata"]();
        this.validityServiceResource = false;
        this.validityServiceCrew = false;
        this.isCalenderView = false;
        this.form_type = 'LIST';
        //auditData: any;
        this.attendanceData = [];
        //auditCheckListData: any[];
        this.display_date = '';
        this.appointmenttypes = [];
        this.isMapView = false;
        this.appointmentTypeSelectedId = 1;
        this.chkbx = [];
        this.myCheckbox = false;
        this.JsonData = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ServiceAppointmentJsonData"]();
        this.attendancemodeldata = [];
        this.showCalendarList = true;
        this.formControlList = [];
        this.checkboxdata1 = [];
        this.lstAssignedResources = {
            pager: {},
            data: []
        };
        this.AssignedResourcesCount = 0;
        this.pageSizeValueAssignedResList = 4;
        this.defaultDate = moment__WEBPACK_IMPORTED_MODULE_32___default()(new Date()).format('L');
        this.viewTypes = _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ListingViews"];
        this.currentView = this.viewTypes.Ghant;
        this.isCal = false;
        this.calenderdatalist = [];
        this.callenderCurrentView = '';
        this.siteurl = '';
        this.filterData = null;
        this.isVisibleDialer = false;
        this.isHidden = false;
        this.day = null;
        this.month = '';
        this.year = '';
        this.isDaySelected = false;
        this.isWeekSelected = false;
        this.searchColumn = 'SchedStartTime';
        this.childrenItems = [];
        this.timeScaleOptions = { enable: true, interval: 360 };
        //hospitalData: Object[] = [
        //  {
        //    Id: 10,
        //    Name: 'David',
        //    StartTime: new Date(2018, 7, 1, 9, 0),
        //    EndTime: new Date(2018, 7, 1, 10, 0),
        //    Description: 'Health Checkup',
        //    DepartmentID: 1,
        //    ConsultantID: 1,
        //    DepartmentName: 'GENERAL'
        //  }, {
        //    Id: 11,
        //    Name: 'John',
        //    StartTime: new Date(2018, 7, 1, 10, 30),
        //    EndTime: new Date(2018, 7, 1, 11, 30),
        //    Description: 'Tooth Erosion',
        //    DepartmentID: 2,
        //    ConsultantID: 2,
        //    DepartmentName: 'DENTAL'
        //  }, {
        //    Id: 12,
        //    Name: 'Peter',
        //    StartTime: new Date(2018, 7, 1, 12, 0),
        //    EndTime: new Date(2018, 7, 1, 13, 0),
        //    Description: 'Eye and Spectacles Checkup',
        //    DepartmentID: 1,
        //    ConsultantID: 3,
        //    DepartmentName: 'GENERAL'
        //  }, {
        //    Id: 13,
        //    Name: 'Starc',
        //    StartTime: new Date(2018, 7, 1, 14, 0),
        //    EndTime: new Date(2018, 7, 1, 15, 0),
        //    Description: 'Toothaches',
        //    DepartmentID: 2,
        //    ConsultantID: 4,
        //    DepartmentName: 'DENTAL'
        //  }, {
        //    Id: 14,
        //    Name: 'James',
        //    StartTime: new Date(2018, 7, 1, 10, 0),
        //    EndTime: new Date(2018, 7, 1, 11, 0),
        //    Description: 'Surgery Appointment',
        //    DepartmentID: 1,
        //    ConsultantID: 5,
        //    DepartmentName: 'GENERAL'
        //  }, {
        //    Id: 15,
        //    Name: 'Jercy',
        //    StartTime: new Date(2018, 7, 1, 9, 30),
        //    EndTime: new Date(2018, 7, 1, 10, 30),
        //    Description: 'Tooth Sensitivity',
        //    DepartmentID: 2,
        //    ConsultantID: 6,
        //    DepartmentName: 'DENTAL'
        //  }, {
        //    Id: 16,
        //    Name: 'Albert',
        //    StartTime: new Date(2018, 7, 2, 10, 0),
        //    EndTime: new Date(2018, 7, 2, 11, 30),
        //    Description: 'Skin care treatment',
        //    DepartmentID: 1,
        //    ConsultantID: 7,
        //    DepartmentName: 'GENERAL'
        //  }, {
        //    Id: 17,
        //    Name: 'Louis',
        //    StartTime: new Date(2018, 7, 2, 12, 30),
        //    EndTime: new Date(2018, 7, 2, 13, 45),
        //    Description: 'General Checkup',
        //    DepartmentID: 1,
        //    ConsultantID: 9,
        //    DepartmentName: 'GENERAL'
        //  }, {
        //    Id: 18,
        //    Name: 'Williams',
        //    StartTime: new Date(2018, 7, 2, 12, 0),
        //    EndTime: new Date(2018, 7, 2, 14, 0),
        //    Description: 'Mouth Sores',
        //    DepartmentID: 2,
        //    ConsultantID: 10,
        //    DepartmentName: 'DENTAL'
        //  },
        //  {
        //    Id: 19,
        //    Name: 'David',
        //    StartTime: new Date(2018, 7, 2, 16, 30),
        //    EndTime: new Date(2018, 7, 2, 18, 15),
        //    Description: 'Eye checkup and Treatment',
        //    DepartmentID: 1,
        //    ConsultantID: 1,
        //    DepartmentName: 'GENERAL'
        //  }, {
        //    Id: 20,
        //    Name: 'John',
        //    StartTime: new Date(2018, 7, 2, 19, 30),
        //    EndTime: new Date(2018, 7, 2, 21, 45),
        //    Description: 'Toothaches',
        //    DepartmentID: 2,
        //    ConsultantID: 2,
        //    DepartmentName: 'DENTAL'
        //  }, {
        //    Id: 21,
        //    Name: 'Peter',
        //    StartTime: new Date(2018, 7, 3, 17, 30),
        //    EndTime: new Date(2018, 7, 3, 19, 30),
        //    Description: 'Surgery Treatment',
        //    DepartmentID: 1,
        //    ConsultantID: 3,
        //    DepartmentName: 'GENERAL'
        //  }, {
        //    Id: 22,
        //    Name: 'Starc',
        //    StartTime: new Date(2018, 7, 4, 18, 30),
        //    EndTime: new Date(2018, 7, 4, 21, 30),
        //    Description: 'Tooth Decay',
        //    DepartmentID: 2,
        //    ConsultantID: 4,
        //    DepartmentName: 'DENTAL'
        //  }, {
        //    Id: 23,
        //    Name: 'James',
        //    StartTime: new Date(2018, 7, 3, 19, 0),
        //    EndTime: new Date(2018, 7, 3, 21, 0),
        //    Description: 'General Checkup',
        //    DepartmentID: 1,
        //    ConsultantID: 5,
        //    DepartmentName: 'GENERAL'
        //  }, {
        //    Id: 24,
        //    Name: 'Jercy',
        //    StartTime: new Date(2018, 7, 4, 20, 0),
        //    EndTime: new Date(2018, 7, 4, 22, 0),
        //    Description: 'Tooth Erosion',
        //    DepartmentID: 2,
        //    ConsultantID: 6,
        //    DepartmentName: 'DENTAL'
        //  }];
        this.waitingList = [];
        this.data = null;
        //= <Object[]>extend([], this.calenderdatalist, null, true);
        //public data: Object[] = <Object[]>extend([], this.calenderdatalist, null, true);
        //private data: DataManager = new DataManager({
        // url: 'http://localhost:8530/serviceappointment/GetCrewResourceCalenderList',
        //  adaptor: new UrlAdaptor,
        //  crossDomain: true
        //});
        this.employeeDataSource = [];
        this.group = { enableCompactView: false, resources: ['Employee'] };
        this.isTreeItemDropped = false;
        this.draggedItemId = '';
        this.selectedDate = new Date();
        this.currView = 'TimelineWeek';
        this.workHours = { start: '08:00', end: '18:00' };
        //public departmentDataSource: Object[] = [
        //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
        //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
        //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
        //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
        //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
        //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
        //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' },
        //  { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        //  { Text: 'DENTAL', Id: 2, Color: '#9e5fff' }
        //];
        //public consultantDataSource: Object[] = [
        //  { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Cardiologist' },
        //  { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Orthodontist' },
        //  { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Optometrist' },
        //  { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Periodontist' },
        //  { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Orthopedic' },
        //  { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Endodontist' }
        //];
        //public group: GroupModel = { enableCompactView: false, resources: ['Departments', 'Consultants']};
        this.allowMultiple = false;
        //public eventSettings: EventSettingsModel = {
        //  dataSource: this.data,
        //  fields: {
        //    subject: { title: 'Patient Name', name: 'Name' },
        //    startTime: { title: 'From', name: 'StartTime' },
        //    endTime: { title: 'To', name: 'EndTime' },
        //    description: { title: 'Reason', name: 'Description' }
        //  }
        //};
        this.field = { dataSource: this.waitingList, id: 'Id', text: 'Name' };
        this.allowDragAndDrop = true;
        this.eventSettings = {
            dataSource: this.data,
            enableTooltip: true
            //dataSource: this.data,
        };
        this.starttime = new Date();
        this.endtime = new Date();
        this.getDateHeaderText = function (value) {
            return _this.instance.formatDate(value, { skeleton: 'Ed' });
        };
        this.worktypeid = null;
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
        var auditdata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTAUDIT'; });
        if (auditdata == undefined) {
            auditdata = "null";
        }
        else {
            this.isAudit = true;
        }
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
        });
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        this.commonService.getMasterItemsList("WorkType").subscribe(function (result) {
            _this.workTypeItems = _this.commonService.masters;
            console.log('workTypeItems', _this.workTypeItems);
        });
    }
    //url: "http://localhost:8530/serviceappointment/GetCrewResourceCalenderList"
    ServicesappointmentlistComponent.prototype.ngOnInit = function () {
        this.siteurl = window.location.origin;
        //const SERVICE_URI = 'http://localhost:8530/api/serviceappointment/GetCrewResourceCalenderList';
        this.isCal = false;
        //this.GetCrewResourceCalenderList();
        //this.GetCrewResourceList();
        //this.GetUnschedulledList();
        // public items: object[];
        //new DataManager({ url: SERVICE_URI }).executeQuery(new Query().take(6)).then((e: ReturnOption) => {
        //  this.calenderdatalist = e.result as object[];
        //}).catch((e) => true);
        this.overlays = [];
        this.SearhName = '';
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.LoadViewData();
        this.initForm();
        //this.refresh();
        this.SwitchListingView(this.currentView);
        this.defaultSelect = 1;
        this.currentPageAssignedRes = 1;
        this.appointmenttypes = [
            { id: 1, name: 'View By Schedule Date' },
            { id: 2, name: 'View By Due Date' },
        ];
        //this.dynamicScripts.load('map');
        this.searchType = [
            { value: 1, text: 'Appointment Number' },
            { value: 2, text: 'Assigned Resource' }
        ];
        this.getmanageviewddllist();
    };
    ServicesappointmentlistComponent.prototype.ngOnChanges = function () {
        var testElements = ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_23__["document"].getElementsByClassName("fc-title");
    };
    ServicesappointmentlistComponent.prototype.ngOnDestroy = function () {
        this.subscriber.next();
        this.subscriber.complete();
    };
    ServicesappointmentlistComponent.prototype.getListingColorCode = function (fieldValue) {
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        return this.lstListingColorCode;
    };
    ServicesappointmentlistComponent.prototype.GetcustomViewid = function (event) {
        var _this = this;
        if (event == 'undefined' || typeof event == 'undefined') {
            this.LoadViewData();
        }
        this.pagedDatafor.data.forEach(function (cnt) {
            if (cnt.custom_view_id == event) {
                _this.ViewModel = cnt.view_name;
            }
        });
        this.vewId = event;
        this.custom_view_id = event;
        this.refresh();
    };
    ServicesappointmentlistComponent.prototype.getmanageviewddllist = function () {
        var _this = this;
        this.commonService.GetManageViewDropDownList(this.moduleName, this.submoduleName).subscribe(function (result) {
            _this.manageviewddlList = result;
        });
    };
    ServicesappointmentlistComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.overlays = [];
        this.loadSave = true;
        //this.columndata = [];
        if (this.currentView == this.viewTypes.List) {
            this.isDaySelected = true;
        }
        this.serviceappointmentlistService.GetServiceAppointmentList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.searchFilter, this.form_type, this.display_date, this.isDaySelected, this.searchColumn, this.isWeekSelected, this.myCheckbox)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_28__["takeUntil"])(this.subscriber))
            .subscribe(function (response) {
            _this.jsonData = response;
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            if (_this.currentView == _this.viewTypes.Calender && !_this.isDaySelected) {
                _this.eventsModel = _this.jsonData.calenderSchema;
                console.log(" this.eventsModel", _this.eventsModel);
                console.log("this.jsonData", _this.jsonData.calenderSchema.length);
                //if (typeof this.jsonData !== 'undefined' && this.jsonData.calenderSchema.length > 0) {
                //  console.log("this.jsonData.calenderSchema", this.jsonData.calenderSchema);
                // const datetime = new DateTimeToLocalPipe;
                // var _datetime = datetime.transform(value, 'Date');
                //  let data = JSON.parse(this.jsonData.calenderSchema);
                //  let newSchema: any[] = [];
                //  data.forEach(item => {
                //    var parser = new DOMParser();
                //    item.title = parser.parseFromString(item.title, 'text/html');
                //    newSchema.push(item);
                //  });
                //  let finalschema = JSON.stringify(newSchema);
                //  this.eventsModel = finalschema;
                //}
            }
            else {
                _this.eventsModel = [];
            }
            if (_this.currentView == _this.viewTypes.Map) {
                _this.columndata.forEach(function (t) {
                    _this.addMarker(t);
                });
            }
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
        }, function (error) {
            _this.loadSave = false;
        }, function () {
            _this.loadSave = false;
        });
    };
    Object.defineProperty(ServicesappointmentlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ServicesappointmentlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ServicesappointmentlistComponent.prototype.setPage = function ($event) {
        this.loadSave = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    ServicesappointmentlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    ServicesappointmentlistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    ServicesappointmentlistComponent.prototype.onsearchTypeSelect = function (e) {
        this.listFiltersearchTypetext = e.text;
        this.listFilter = "";
    };
    ServicesappointmentlistComponent.prototype.selectAttendanceDate = function () {
        var _this = this;
        this.serviceappointmentlistService.AttendanceData(this.serviceappointmentid)
            .subscribe(function (s) {
            while (_this.fields.length != 0) {
                _this.fields.removeAt(0);
            }
            var data = s;
            console.log("dataasa", data);
            _this.attendanceData = [];
            _this.attendanceData.length = 0;
            if (data != null) {
                _this.attendanceData.push(data);
                console.log("attendanceData", _this.attendanceData);
                _this.attendanceData[0].filter(function (x) {
                    console.log("data", x);
                    _this.fields.push(_this.fb.group({
                        serviceResourceId: [x.ServiceResourceId],
                        attendanceid: [x.Service_AttendanceId],
                        resourcename: [x.Name],
                        hours: [x.hours],
                        isPresent: [x.Is_Present],
                        serviceAppointmentId: [x.ServiceAppointmentId],
                    }));
                });
            }
            else {
                _this.attendanceData = [];
                while (_this.fields.length != 0) {
                    _this.fields.removeAt(0);
                }
            }
        });
        // const term = this.lstterms.find(m => m.value ===     this.leaseTerm.value);
        // if (term) {
        //   this.leaseTermAmount = parseInt(term.text.replace(/^\D+/g, '')); ;
        // }
        // if (!this.showHideTag && this.customerHideTag) {
        //   if (this.leaseTermAmount != 0 && this.leaseDate.value!=null) {
        //     let dt = new Date(this.leaseDate.value);
        //     var newDate = new Date(dt.setMonth(dt.getMonth() + this.leaseTermAmount));
        //     this.leaseMaturityDate.setValue(this.datePipe.transform(newDate, 'MM/dd/yyyy'));
        //   }
        //   else {
        //     this.leaseMaturityDate.setValue("");
        //   }
        // }
    };
    ServicesappointmentlistComponent.prototype.updateFilter = function (event) {
        //this.SearhName = event.target.value;
        //if (this.listFiltersearchTypetext =="Appointment Number") {
        //  this.listFiltertext = "AppointmentNumber like '%" + event.target.value + "%'";
        //}
        //if (this.listFiltersearchTypetext == "Assigned Resource") {
        //  this.listFiltertext = "Resources like '%" + event.target.value + "%'";
        //}
        this.currentPage = 1;
        this.listFiltertext = "(tsa.AppointmentNumber like '%" + event.target.value + "%' or acc.Name like '%" + event.target.value + "%')";
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.refresh();
        }
    };
    ServicesappointmentlistComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    ServicesappointmentlistComponent.prototype.searchServiceAppointment = function () {
        //this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "(tsa.AppointmentNumber like '%" + this.listFilter + "%'  or acc.Name like '%" + this.listFilter + "%')";
        }
        //if (this.listFiltersearchTypetext=="") {
        //  this.listFiltertext = "AppointmentNumber like '%" + this.listFilter + "%'";
        //}
        this.refresh();
        //this.listFiltertext = "";
        //this.listFiltersearchTypetext = "";
    };
    ServicesappointmentlistComponent.prototype.reset = function () {
        //this.searchTypeSelect.clearModel();
        this.isDaySelected = false;
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.sortDir = 'desc';
        this.sortColumn = 'Id';
        this.myCheckbox = false;
        this.refresh();
    };
    ServicesappointmentlistComponent.prototype.onSelect = function (_a) {
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
    ServicesappointmentlistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        //this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    ServicesappointmentlistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Service Appointment(s)\"";
            this.dialogService.confirm('Delete Service Appointment(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.serviceappointmentlistService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (a) {
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
    ServicesappointmentlistComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Service Appointment  \"" + row.AppointmentNumber + "\"?";
        this.dialogService.confirm('Delete Service Appointment', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.serviceappointmentlistService.DeleteRecords(row.id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Service Appointment \"" + row.AppointmentNumber + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    ServicesappointmentlistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.calenderCondition = '';
        this.calenderCondition = event;
        //this.getcalenderDetail(this.calenderCondition);
        this.refresh();
    };
    //====================================== Assigned Resource ====================================
    ServicesappointmentlistComponent.prototype.refreshList = function (e) {
        console.log('data', e);
        //e = {isGhantView: true, starttime: "2021-07-09 07:00:00 am", endTime: "2021-07-09 08:00:00 am"}
        if (this.filterData == null && e.isGhantView != true) {
            this.SwitchListingView(this.currentView);
        }
        else {
            var data = JSON.parse(this.filterData);
            if (this.filterData != null) {
                this.GetUnschedulledList(data.worktypeid, data.accountid, data.categoryid, data.teritoryid, data.testAccount);
            }
            else {
                this.GetUnschedulledList();
            }
            //var date = e.starttime;
            var date = new Date(e.starttime);
            var y = date.getFullYear();
            var m = date.getMonth();
            var firstday = new Date(y, m, 1);
            var endate = new Date(e.endTime);
            var ey = endate.getFullYear();
            var em = endate.getMonth();
            var lastDay = new Date(ey, em + 1, 0);
            //var firstDay = new Date(y, m, 1);
            this.GetCrewResourceCalenderList(firstday, lastDay, true, this.filterData);
            //this.getFilterData(this.filterData);
        }
    };
    //SwitchView() {
    //  this.loadSave = true;
    //  this.pageSizeValue = 15;
    //  this.currentPage = 1;
    //  if (this.isCalenderView) {
    //    this.isCalenderView = false;
    //    this.display_date = '';
    //    this.form_type = 'LIST';
    //    this.showCalendarList = true;
    //  }
    //  else {
    //    this.display_date = this.datetime.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
    //    this.form_type = 'CALENDER';
    //    this.isCalenderView = true;
    //    this.isWeekSelected = false;
    //    this.isDaySelected = false;
    //    this.OnLoad();
    //  }
    //  this.isMapView = false;
    //  this.refresh();
    //  // setTimeout(() => { this.loadSave = false; },500)
    //}
    //SwitchViewMap() {
    //  this.loadSave = true;
    //  this.pageSizeValue = 15;
    //  this.currentPage = 1;
    //  if (this.isMapView) {
    //    this.isMapView = false;
    //    this.form_type = 'LIST';
    //    this.showCalendarList = true;
    //    this.refresh();
    //    this.loadSave = false;
    //  }
    //}
    ServicesappointmentlistComponent.prototype.OnLoad = function () {
        var _this = this;
        localStorage.removeItem('opid');
        this.pageSizeValue = 15;
        this.getPageSizes();
        //this.refresh();
        this.currentDate = new Date();
        this.day = null;
        this.eventClick = function (model) {
            console.log("onload eventclick", model);
            console.log("onload eventclickmodel", model.event.id);
            var serviceAppId = model.event.id;
            var selectedDate = _this.datetime.transform(model.event.start, 'yyyy-MM-dd');
            _this.currentPage = 1;
            _this.display_date = selectedDate;
            _this.isDaySelected = true;
            ///////////////this.refresh();
            //this.ShowAppointmentDetail(serviceAppId);
            _this.addAssignedResourcesPopupModel.show(serviceAppId);
            _this.fullcalendar.calendar.select(model.event.start);
            _this.fullcalendar.calendar.refetchEvents();
        };
        //this.eventRender = (model) => {
        //  console.log("onload eventRender");
        //}
        //this.eventContent = (model) => {
        //  console.log("onload eventContent");
        //}
        this.options = {
            selectable: true,
            editable: false,
            firstDay: 0,
            navLinks: false,
            eventBorderColor: 'transparent',
            eventRender: function (item) {
                item.el.innerHTML = item.el.innerText;
            },
            header: {
                left: 'prev,next today myCustomButton',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            plugins: [_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_13__["default"], _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_14__["default"], _fullcalendar_list__WEBPACK_IMPORTED_MODULE_15__["default"], _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_16__["default"]],
        };
        //this.eventsModel = [];
        //this.eventsModel = this.CalenderSchema;
        //this.getcalenderDetail(this.calenderCondition);
    };
    ServicesappointmentlistComponent.prototype.getcalenderDetail = function (cond) {
        //debugger;
        //this.serviceappointmentlistService.GetServiceAppointmentsForCalendar('',cond).subscribe(s => {
        //  this.eventsModel = s;
        //});
    };
    ServicesappointmentlistComponent.prototype.eventClick = function (model) {
    };
    ServicesappointmentlistComponent.prototype.eventRender = function (model) {
        console.log("eventRender");
    };
    ServicesappointmentlistComponent.prototype.eventMouseover = function (model) {
        console.log("eventRender");
    };
    ServicesappointmentlistComponent.prototype.eventContent = function (model) {
        console.log("eventContent");
    };
    ServicesappointmentlistComponent.prototype.clickButton = function (model) {
        console.log("clickButton");
        console.log("model.buttonType", model.buttonType);
        this.isDaySelected = false;
        this.display_date = this.datetime.transform(model.data, 'yyyy-MM-dd');
        this.form_type = 'CALENDER';
        if (model.buttonType == 'timeGridWeek') {
            this.isWeekSelected = true;
        }
        else if (model.buttonType == 'dayGridMonth') {
            this.isWeekSelected = false;
        }
        else if ((model.buttonType == 'prev' || model.buttonType == 'next') && this.isWeekSelected) {
            this.isWeekSelected = true;
        }
        this.refresh();
        this.OnLoad();
    };
    ServicesappointmentlistComponent.prototype.dateClick = function (model) {
        console.log("dateClick");
        //let selectedDate = this.datetime.transform(model.date, 'yyyy-MM-dd');
        //this.currentPage = 1;
        //this.display_date = selectedDate;
        //this.isDaySelected = true;
        //this.refresh();
        return false;
    };
    //auditpopup(serviceAppointmentsId: any) {
    //  this.serviceappointmentlistService.auditReviewData(serviceAppointmentsId).subscribe(s => {
    //    this.auditData = s;
    //    console.log('sdasd', this.auditData)
    //    this.ActualauditCheckListData = [];
    //    this.auditModel.show();
    //  });
    //}
    //closeAudit() {
    //  this.auditModel.hide();
    //}
    //closeAuditCheckList() {
    //  this.auditCheckListModel.hide();
    //}
    //closeAuditCheckBackList() {
    //  this.auditCheckListModel.hide();
    //  this.auditModel.show();
    //}
    //SectionGroup: any[] = [];
    //ActualauditCheckListData: { Main: any, Child: any[] }[] = [];
    //auditChecklistDetail(checkList_Id: number, serviceAppointmentId: number) {
    //  this.auditCheckListData = [];
    //  this.ActualauditCheckListData = [];
    //  this.serviceappointmentlistService.auditChecklistDetail(checkList_Id, serviceAppointmentId).subscribe(s => {
    //    this.auditCheckListData = s as any[];
    //    console.log('auditCheckListData', this.auditCheckListData)
    //    if (this.auditCheckListData != null) {
    //      if (this.auditCheckListData) {
    //        let _data = this.auditCheckListData as any[];
    //        if (_data) {
    //          this.auditTitle = _data[0].CHECK_LIST_NAME;
    //        }
    //      }
    //      var ths = this;
    //      ths.SectionGroup = [];
    //      this.auditCheckListData.forEach(sc => {
    //        let checkIfAlreadyExist = ths.SectionGroup.filter(function (itm) { return itm.sectionId == sc.SECTION_ID });
    //        if (checkIfAlreadyExist.length == 0) {
    //          let groupArray = ths.auditCheckListData.filter(function (itm) { return itm.SECTION_ID == sc.SECTION_ID });
    //          var section = {
    //            sectionName: sc.SECTION_NAME,
    //            sectionId: sc.SECTION_ID,
    //            sectionGroup: []
    //          }
    //          this.ActualauditCheckListData = [];
    //          groupArray.forEach(i => {
    //            let isFound = false;
    //            if (i.PARENT_ID == null) {
    //              this.ActualauditCheckListData.forEach(m => {
    //                if (m.Main.QUESTION_ID == i.QUESTION_ID) {
    //                  if (i.QUESTION_TYPE != "checkbox") {
    //                    var obj = {
    //                      answer: i.ANSWER,
    //                      answerGivenBy: i.ANSWER_GIVEN_BY,
    //                      attachment: i.ATTACHMENT_PATH
    //                    };
    //                    if (typeof m.Main.ANSWERS == "undefined") {
    //                      m.Main.ANSWERS = [];
    //                    }
    //                    m.Main.ANSWERS.push(obj);
    //                  }
    //                  isFound = true;
    //                }
    //              });
    //              if (isFound == false) {
    //                i.ATTACHMENT_PATHS = [];
    //                if (i.QUESTION_TYPE != "checkbox") {
    //                  var obj = {
    //                    answer: i.ANSWER,
    //                    answerGivenBy: i.ANSWER_GIVEN_BY,
    //                    attachment: i.ATTACHMENT_PATH
    //                  };
    //                  if (typeof i.ANSWERS == "undefined") {
    //                    i.ANSWERS = [];
    //                  }
    //                  i.ANSWERS.push(obj);
    //                }
    //                this.ActualauditCheckListData.push({
    //                  Main: i,
    //                  Child: []
    //                })
    //              }
    //            }
    //            else {
    //              let index = 0;
    //              this.ActualauditCheckListData.forEach(j => {
    //                if (j.Main.QUESTION_ID === i.PARENT_ID) {
    //                  if (i.QUESTION_TYPE != "checkbox") {
    //                    var obj = {
    //                      answer: i.ANSWER,
    //                      answerGivenBy: i.ANSWER_GIVEN_BY,
    //                      attachment: i.ATTACHMENT_PATH
    //                    };
    //                    if (typeof j.Main.ANSWERS == "undefined") {
    //                      j.Main.ANSWERS = [];
    //                    }
    //                    j.Main.ANSWERS.push(obj);
    //                  } else {
    //                    i.ANSWER = ((i.ANSWER == "true") ? true : false)
    //                  }
    //                  this.ActualauditCheckListData[index].Child.push(i);
    //                }
    //                index += 1;
    //              });
    //            }
    //          });
    //          section.sectionGroup = this.ActualauditCheckListData;
    //          this.SectionGroup.push(section);
    //        }
    //      });
    //      console.log('SectionGroup', this.SectionGroup)
    //      this.auditCheckListModel.show();
    //    }
    //    else {
    //      this.toaster.error("No record found");
    //      this.loadSave = false;
    //      this.auditModel.show();
    //      this.auditCheckListModel.hide();
    //    }
    //  });
    //}
    //open(imageList: any[], index: number): void {
    //  // open lightbox
    //  var ImageObject = [];
    //  var currIndexImage = imageList[index];
    //  var index = 0;
    //  let tempindex = 0;
    //  imageList.forEach(x => {
    //    if (typeof x.attachment != "undefined" && x.attachment != null && x.attachment != "") {
    //      var obj = {
    //        src: x.attachment,
    //        caption: x.answer,
    //        thumb: x.attachment
    //      }
    //      if (currIndexImage.attachment == x.attachment) {
    //        index = tempindex;
    //      }
    //      ImageObject.push(obj);
    //      tempindex++;
    //    }
    //  });
    //  this._lightbox.open(ImageObject, index);
    //}
    //onSubmitAuditCheckList() {
    //  let SubmitModel: any[] = [];
    //  let SubmitModelChildModel: any[] = [];
    //  this.SectionGroup.forEach(sc => {
    //    sc.sectionGroup.forEach(s => {
    //      let obj: any = {};
    //      obj.QUESTION_ID = s.Main.QUESTION_ID;
    //      obj.SECTION_ID = s.Main.SECTION_ID;
    //      obj.SERVICE_APPT_ID = s.Main.SERVICE_APPT_ID;
    //      obj.Answer = s.Main.ANSWER;
    //      obj.Comment = s.Main.Comment;
    //      obj.IsCorrect = s.Main.IsCorrect == true ? 1 : 0;
    //      SubmitModel.push(obj);
    //      if (s.Child.length > 0) {
    //        s.Child.forEach(d => {
    //          let objChild: any = {};
    //          objChild.QUESTION_ID = d.QUESTION_ID;
    //          objChild.SECTION_ID = s.Main.SECTION_ID;
    //          objChild.SERVICE_APPT_ID = d.SERVICE_APPT_ID;
    //          objChild.Answer = d.ANSWER;
    //          objChild.Comment = '';
    //          objChild.IsCorrect = 0;
    //          SubmitModelChildModel.push(objChild);
    //        })
    //      }
    //    });
    //  });
    //  this.loadSave = true;
    //  this.JsonData.FormJsonData = JSON.stringify(SubmitModel);
    //  this.JsonData.subModuleCode = JSON.stringify(SubmitModelChildModel);
    //  this.serviceappointmentlistService.addEditAudit(this.JsonData).subscribe((result: any) => {
    //    if (result.statusCode == 200) {
    //      setTimeout(() => {
    //        this.toaster.success(result.responseMessage);
    //        this.loadSave = false;
    //      }, 1000);
    //      this.auditCheckListModel.hide();
    //    }
    //    else {
    //      this.toaster.error(result.responseMessage);
    //      this.loadSave = false;
    //    }
    //  }, error => {
    //    this.loadSave = false;
    //  });
    //  this.ActualauditCheckListData = [];
    //}
    ServicesappointmentlistComponent.prototype.appointmenttypedll = function (id) {
        //this.display_date = this.datetime.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a')
        this.form_type = 'CALENDER';
        this.isDaySelected = false;
        this.currentPage = 1;
        if (id == 1) {
            this.searchColumn = 'SchedStartTime';
            this.appointmentTypeSelectedId = 1;
        }
        else if (id == 2) {
            this.searchColumn = 'DueDate';
            this.appointmentTypeSelectedId = 2;
        }
        this.fullcalendar.calendar.unselect();
        this.fullcalendar.calendar.refetchEvents();
        this.refresh();
        this.OnLoad();
    };
    //map data
    ServicesappointmentlistComponent.prototype.mapview = function () {
        this.isMapView = true;
        if (this.isCalenderView) {
            this.isCalenderView = false;
            this.isDaySelected = false;
        }
        this.optionsMap = {
            center: { lat: 47.500000, lng: -100.000000 },
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.form_type = 'Map';
        this.refresh();
    };
    ServicesappointmentlistComponent.prototype.handleOverlayClick = function (event) {
        var isMarker = event.overlay.getTitle != undefined;
        if (isMarker) {
            var title = event.overlay.getTitle();
            var result = this.columndata.filter(function (x) { return x.id == event.overlay.customInfo; });
            var id = event.overlay.customInfo;
            this.AppointmentNumber = result[0].AppointmentNumber;
            this.WorkOrderNumber = result[0].WorkOrderNumber;
            this.SchedStartTime = result[0].SchedStartTime;
            this.name = result[0].name;
            this.address = result[0].address;
            this.addAssignedResourcesPopupModel.show(id);
            //this.infoWindow.setContent('' + title + '');
            //this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
        }
    };
    ServicesappointmentlistComponent.prototype.AddAssignedResources = function (appointmentid) {
        this.addAssignedResourcesPopupModel.show(appointmentid);
    };
    ServicesappointmentlistComponent.prototype.auditpopup = function (appointmentid, disable) {
        //debugger;
        this.auditsPopupModel.show({ serviceAppointmentsId: appointmentid, disable: disable });
    };
    ServicesappointmentlistComponent.prototype.addMarker = function (object) {
        this.overlays.push(new google.maps.Marker({
            position: { lat: object.Latitude, lng: object.Longitude }, title: object.address, customInfo: object.id, animation: google.maps.Animation.DROP, icon: (object.Status == 'None' || object.Status == null) ? '//maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png' : '//maps.google.com/mapfiles/ms/micons/green-dot.png'
        }));
    };
    ServicesappointmentlistComponent.prototype.LoadViewData = function () {
        var _this = this;
        this.loadSave = true;
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.commonService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(function (response) {
            _this.pagedDatafor = _this.commonService.pagedData;
            _this.pagedDatafor.data.forEach(function (cnt) {
                if (cnt.is_default == true) {
                    _this.vewId = cnt.custom_view_id;
                    _this.ViewModel = cnt.view_name;
                }
            });
        }, function (error) {
            _this.loadSave = false;
        }, function () {
            _this.loadSave = false;
        });
    };
    ServicesappointmentlistComponent.prototype.SetManageViewValue = function (event, text) {
        this.custom_view_id = event;
        this.ViewModel = text;
        this.refresh();
        //this.LoadViewData();
    };
    ServicesappointmentlistComponent.prototype.onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    };
    ServicesappointmentlistComponent.prototype.showattendancemodel = function (id) {
        var _this = this;
        this.serviceappointmentid = id;
        var convertDateTime = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_31__["DateTimeToLocalForAddEditPipe"];
        this.serviceappointmentlistService.AttendanceData(id).subscribe(function (response) {
            while (_this.fields.length != 0) {
                _this.fields.removeAt(0);
            }
            _this.attendanceData = [];
            _this.attendanceData.length = 0;
            if (response) {
                var showMessage = false;
                _this.SchEndDate = convertDateTime.transform(response.SchedEndTime, null);
                _this.SchStartDate = convertDateTime.transform(response.SchedStartTime, null);
                var result = response;
                console.log("result", result);
                _this.attendanceform.patchValue({
                    ScheduleStartDate: moment__WEBPACK_IMPORTED_MODULE_32___default()(_this.SchStartDate).format('L'),
                    ScheduleEndDate: moment__WEBPACK_IMPORTED_MODULE_32___default()(_this.SchEndDate).format('L')
                    // ScheduleStartDate:moment(convertDateTime.transform(result[0].START_DATE, null)).format('L'), 
                    // ScheduleEndDate: moment(convertDateTime.transform(result[0].END_DATE, null)).format('L')
                });
                var resources = [];
                if (result.Temp_Json) {
                    resources = result.Temp_Json.map(function (x) { return x.Name; });
                    resources = resources.filter(_this.onlyUnique);
                }
                var schStartTime_1 = moment__WEBPACK_IMPORTED_MODULE_32___default()(convertDateTime.transform(response.SchedStartTime, null)).format('HH:mm:ss');
                var schEndTime = moment__WEBPACK_IMPORTED_MODULE_32___default()(convertDateTime.transform(response.SchedEndTime, null)).format('HH:mm:ss');
                _this.SchStartDate = moment__WEBPACK_IMPORTED_MODULE_32___default()(_this.SchStartDate).format('MM-DD-YYYY');
                _this.SchEndDate = moment__WEBPACK_IMPORTED_MODULE_32___default()(_this.SchEndDate).format('MM-DD-YYYY');
                var difference = moment__WEBPACK_IMPORTED_MODULE_32___default()(_this.SchEndDate).diff(moment__WEBPACK_IMPORTED_MODULE_32___default()(_this.SchStartDate), 'days');
                var _loop_1 = function (index) {
                    var accodName = moment__WEBPACK_IMPORTED_MODULE_32___default()(_this.SchStartDate).add(index, 'days').format('L');
                    _this.attendanceData.push(accodName);
                    if (result.Temp_Json) {
                        var today_1 = result.Temp_Json.filter(function (x) { return x.AttendanceDate && moment__WEBPACK_IMPORTED_MODULE_32___default()(convertDateTime.transform(x.AttendanceDate, null)).format('L') == accodName; });
                        if (today_1.length > 0) {
                            today_1.forEach(function (element) {
                                _this.fields.push(_this.fb.group({
                                    serviceResourceId: [element.ServiceResourceId],
                                    attendanceid: [element.Service_AttendanceId],
                                    resourcename: [element.Name],
                                    hours: [element.hours],
                                    isPresent: [element.Is_Present],
                                    serviceAppointmentId: [element.ServiceAppointmentId],
                                    attendanceDate: [accodName],
                                    ScheduleStartDatewithTime: today_1.AttendanceDate ? today_1.AttendanceDate : _this.commonService.getUserSelectedZoneToUTC(moment__WEBPACK_IMPORTED_MODULE_32___default()(accodName + ' ' + schStartTime_1))
                                }));
                            });
                        }
                        else {
                            resources.forEach(function (element1) {
                                var Att = result.Temp_Json.find(function (x) { return x.Name = element1; });
                                _this.fields.push(_this.fb.group({
                                    serviceResourceId: [Att.ServiceResourceId],
                                    attendanceid: [Att.Service_AttendanceId],
                                    resourcename: [Att.Name],
                                    hours: [null],
                                    isPresent: [1],
                                    serviceAppointmentId: [Att.ServiceAppointmentId],
                                    attendanceDate: [accodName],
                                    // ScheduleStartDatewithTime : this.commonService.getUserSelectedZoneToUTC(moment(accodName + ' ' + ( difference== index ? schEndTime: schStartTime)))
                                    ScheduleStartDatewithTime: _this.commonService.getUserSelectedZoneToUTC(moment__WEBPACK_IMPORTED_MODULE_32___default()(accodName + ' ' + schStartTime_1))
                                }));
                            });
                        }
                    }
                    else {
                        _this.fields.push(_this.fb.array([]));
                        showMessage = true;
                    }
                };
                for (var index = 0; index <= difference; index++) {
                    _loop_1(index);
                }
                ;
                // const element = array[index];
                var length_1 = result.length;
                // result.forEach((element, index) => {
                //   // this.attendanceData.push(moment(element.AccordionHeading).format('L'));
                //  // this.attendanceData.push(moment(convertDateTime.transform(element.SchedStartTime, null)).format('L'));
                //   if (element.Temp_Json) {
                //     element.Temp_Json.forEach(item => {
                //       this.fields.push(this.fb.group({
                //         serviceResourceId: [item.ServiceResourceId],
                //         attendanceid: [item.Service_AttendanceId],
                //         resourcename: [item.Name],
                //         hours: [item.hours],
                //         isPresent: [item.Is_Present],
                //         serviceAppointmentId: [item.ServiceAppointmentId],                  
                //         attendanceDate: [moment(convertDateTime.transform(element.AccordionHeading1,null)).format('L')],
                //         ScheduleStartDatewithTime:convertDateTime.transform(result[0].START_DATE, null), 
                //         ScheduleEndDatewithtime:convertDateTime.transform(result[0].END_DATE, null),   
                //       }));
                //     })
                //     showMessage = false;
                //   }
                //   else {
                //     this.fields.push(this.fb.array([]));
                //     showMessage = true;
                //   }
                // });
                debugger;
                if (showMessage) {
                    _this.toaster.info("No resources assigned");
                }
                _this.attendancemodel.show();
            }
            else {
                _this.toaster.error("Please Schedule appointment first");
            }
        });
    };
    ServicesappointmentlistComponent.prototype.getUniqueRow = function (obj) {
        var result = [];
        if (obj) {
            var data = obj.map(function (m) {
                return { 'QUESTION_ID': m.QUESTION_ID, 'QUESTION': m.QUESTION, 'ANSWER': m.ANSWER, 'VISIBLE_TO': m.VISIBLE_TO };
            });
            var key_1 = 'QUESTION_ID';
            var finalResult = Array.from(new Map(data.map(function (item) { return [item[key_1], item]; })).values());
            result = finalResult;
        }
        return result;
    };
    ServicesappointmentlistComponent.prototype.onChangeCheckbox = function (event, id, s) {
        var checked = event.target.checked;
        console.log('data', s);
        if (checked) {
            s.Is_Present = true;
        }
        else {
            s.Is_Present = false;
        }
        console.log('dataafter', s);
    };
    ServicesappointmentlistComponent.prototype.closeattendancepopup = function () {
        this.attendancemodel.hide();
    };
    ServicesappointmentlistComponent.prototype.onSubmitattendance = function () {
        var _this = this;
        if (this.attendanceform.value.fields.length == 1) { //1 length will be default because fields are initialized on page load
            this.toaster.info("No rows for submit");
        }
        else {
            this.attendancemodeldata = [];
            this.attendancemodeldata.length = 0;
            this.attendanceform.value.fields.filter(function (m) {
                if (Date.parse(m.attendanceDate) <= Date.parse(_this.defaultDate)) {
                    var curdatetime = void 0;
                    //curdatetime = this.commonService.getUserSelectedZoneToUTC(moment(m.attendanceDate + ' ' + moment(m.ScheduleStartDatewithTime).format('HH:mm:ss')));
                    curdatetime = m.ScheduleStartDatewithTime;
                    // curdatetime = this.commonService.getUserSelectedZoneToUTC(m.ScheduleStartDatewithTime);
                    m.attendanceDate = curdatetime;
                    _this.attendancemodeldata.push(m);
                }
            });
            if (this.attendancemodeldata) {
                this.attendancedata.jsondata = JSON.stringify(this.attendancemodeldata);
                this.serviceappointmentlistService.saveAttendanceData(this.attendancedata).subscribe(function (result) {
                    if (result.statusCode == 200) {
                        _this.toaster.success(result.responseMessage);
                        _this.loadSave = false;
                        _this.attendancemodel.hide();
                    }
                    else {
                        _this.toaster.error(result.responseMessage);
                        _this.loadSave = false;
                    }
                });
            }
            else {
                this.toaster.error("future dates are readonly");
                this.loadSave = false;
            }
        }
    };
    ServicesappointmentlistComponent.prototype.ParseDate = function (RecDate) {
        if (RecDate) {
            return Date.parse(RecDate);
        }
    };
    ServicesappointmentlistComponent.prototype.initForm = function () {
        this.attendanceform = this.fb.group({
            serviceResourceId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required],
            ScheduleStartDate: [null],
            ScheduleEndDate: [null],
            attendanceid: [null],
            resourcename: [''],
            AttendanceDate: [this.defaultDate],
            hours: [''],
            isPresent: [false],
            ScheduleStartDatewithTime: [null],
            ScheduleEndDatewithtime: [null],
            fields: this.fb.array([this.buildFields()])
        });
    };
    ServicesappointmentlistComponent.prototype.buildFields = function () {
        return this.fb.group({
            serviceResourceId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required],
            attendanceid: [null],
            resourcename: [''],
            AttendanceDate: [''],
            hours: [''],
            isPresent: [false],
        });
    };
    Object.defineProperty(ServicesappointmentlistComponent.prototype, "fields", {
        get: function () {
            return this.attendanceform.get('fields');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicesappointmentlistComponent.prototype, "serviceResourceId", {
        get: function () { return this.attendanceform.get('serviceResourceId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicesappointmentlistComponent.prototype, "attendanceid", {
        get: function () { return this.attendanceform.get('attendanceid'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicesappointmentlistComponent.prototype, "resourcename", {
        get: function () { return this.attendanceform.get('resourcename'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicesappointmentlistComponent.prototype, "AttendanceDate", {
        get: function () { return this.attendanceform.get('AttendanceDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicesappointmentlistComponent.prototype, "hours", {
        get: function () { return this.attendanceform.get('hours'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicesappointmentlistComponent.prototype, "isPresent", {
        get: function () { return this.attendanceform.get('isPresent'); },
        enumerable: true,
        configurable: true
    });
    /// added by nazir
    ServicesappointmentlistComponent.prototype.numberOnly = function (event) {
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
        if (charCode > 31 && (charCode <= 45 || charCode > 57 || charCode == 47)) {
            return false;
        }
        this.checkNumberOnly = (event.target.value);
        if (this.checkNumberOnly != null) {
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
    ServicesappointmentlistComponent.prototype.ToggleCalendarList = function () {
        this.showCalendarList = !this.showCalendarList;
    };
    ServicesappointmentlistComponent.prototype.ShowAppointmentDetail = function (servicesappointmentid) {
        this.servicesappointmentidCal = servicesappointmentid;
        this.ShowServiceAppointmentDetail(servicesappointmentid);
        this.GetAssignedResourcesList(servicesappointmentid);
        this.serviceAppointmentdetail.show();
    };
    ServicesappointmentlistComponent.prototype.closeAppointmentDetailpopup = function () {
        this.serviceAppointmentdetail.hide();
    };
    ServicesappointmentlistComponent.prototype.ShowServiceAppointmentDetail = function (servicesappointmentid) {
        var _this = this;
        // this.displayType = 'VIEW';
        this.formControlList = [];
        this.servicesappointmentlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, servicesappointmentid, 'VIEW').subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.servicesappointmentlistService.customFieldsList.data;
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["CheckboxData"]();
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
                    if (cnt.ColumnName == 'AppointmentNumber') {
                        _this.AppointmentNumber = cnt.value;
                    }
                    if (cnt.dt_code == 'select') {
                        if (cnt.value != '' && cnt.select_options != null) {
                            cnt.select_options.forEach(function (itemList) {
                                if (itemList.value == cnt.value) {
                                    cnt.value = itemList.name;
                                }
                                else {
                                    //cnt.value = null;
                                }
                            });
                        }
                    }
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormGroup"](group_1);
                _this.loadSave = false;
                ////this.GetCustomFieldsListTopRow();
            }
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ServicesappointmentlistComponent.prototype.GetAssignedResourcesList = function (servicesappointmentid) {
        var _this = this;
        this.loadSave = true;
        this.servicesappointmentlistService.GetAssignedResourcesList(servicesappointmentid, this.sortColumn, this.currentPageAssignedRes, this.sortDir, this.pageSizeValueAssignedResList)
            .subscribe(function (resp) {
            _this.lstAssignedResources = resp;
            _this.AssignedResourcesCount = resp.pager.totalItems;
            if (resp.data.length > 0) {
                _this.totalRecordsAssignedRes = resp.pager.totalItems;
            }
            else {
                _this.totalRecordsAssignedRes = 0;
                _this.currentPageAssignedRes = _this.currentPageAssignedRes - 1;
                console.log("fsdfsdf", _this.currentPageAssignedRes);
                _this.GetAssignedResourcesList(servicesappointmentid);
            }
            _this.offset = _this.currentPageAssignedRes;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    ServicesappointmentlistComponent.prototype.setAssignedResourcesPageNo = function ($event) {
        this.loadSave = true;
        this.currentPageAssignedRes = $event.page;
        this.GetAssignedResourcesList(this.servicesappointmentidCal);
    };
    ServicesappointmentlistComponent.prototype.setPageAssignedResList = function ($event) {
        this.loadSave = true;
        this.currentPageAssignedRes = $event.page;
        this.GetAssignedResourcesList(this.servicesappointmentidCal);
    };
    ServicesappointmentlistComponent.prototype.onSortAssignedResList = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPageAssignedRes = 1;
        this.GetAssignedResourcesList(this.servicesappointmentidCal);
    };
    ServicesappointmentlistComponent.prototype.switchClicked = function (event) {
        this.listFiltertext = '';
        this.myCheckbox = event.srcElement.checked;
        this.currentPage = 1;
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "(tsa.AppointmentNumber like '%" + this.listFilter + "%' or acc.Name like '%" + this.listFilter + "%')";
            //"tsa.AppointmentNumber like '%" + this.listFilter + "%'";
        }
        if (this.listFiltertext.trim().length > 0) {
            this.refresh();
        }
        if (this.myCheckbox == false) {
            this.refresh();
        }
    };
    ServicesappointmentlistComponent.prototype.SwitchListingViewGhant = function (e) {
        this.filterModal.clearAllFields();
        this.SwitchListingView('ghant');
    };
    ServicesappointmentlistComponent.prototype.SwitchListingView = function (data) {
        this.loadSave = true;
        this.pageSizeValue = 15;
        this.currentPage = 1;
        var _data = data;
        if (_data == this.viewTypes.Ghant) {
            this.currentView = this.viewTypes.Ghant;
            this.GetCrewResourceList();
            this.GetUnschedulledList();
            var ab = new Date();
            this.GetCrewResourceCalenderList(ab, null, true);
        }
        else if (_data == this.viewTypes.Calender) {
            this.currentView = this.viewTypes.Calender;
            this.display_date = this.datetime.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
            this.form_type = 'CALENDER';
            this.isWeekSelected = false;
            this.isDaySelected = false;
            this.OnLoad();
        }
        else if (_data == this.viewTypes.Map) {
            this.currentView = this.viewTypes.Map;
            this.isDaySelected = false;
            this.form_type = 'Map';
            this.optionsMap = {
                center: { lat: 47.500000, lng: -100.000000 },
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        }
        else {
            this.currentView = this.viewTypes.List;
            this.form_type = 'LIST';
        }
        this.refresh();
        this.loadSave = false;
    };
    ServicesappointmentlistComponent.prototype.getConsultantName = function (value) {
        return value.resourceData[value.resource.textField];
    };
    ServicesappointmentlistComponent.prototype.getConsultantStatus = function (value) {
        var resourceName = value.resourceData[value.resource.textField];
        if (resourceName === 'GENERAL' || resourceName === 'DENTAL') {
            return false;
        }
        else {
            return true;
        }
    };
    ServicesappointmentlistComponent.prototype.getConsultantDesignation = function (value) {
        var resourceName = value.resourceData[value.resource.textField];
        if (resourceName === 'GENERAL' || resourceName === 'DENTAL') {
            return '';
        }
        else {
            return value.resourceData.Designation;
        }
    };
    ServicesappointmentlistComponent.prototype.getConsultantImageName = function (value) {
        return this.getConsultantName(value).toLowerCase();
    };
    ServicesappointmentlistComponent.prototype.onItemDrag = function (event) {
        if (this.scheduleObj.isAdaptive) {
            var classElement = this.scheduleObj.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.target.classList.contains('e-work-cells')) {
                Object(_syncfusion_ej2_base__WEBPACK_IMPORTED_MODULE_24__["addClass"])([event.target], 'e-device-hover');
            }
        }
        if (ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_23__["document"].body.style.cursor === 'not-allowed') {
            ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_23__["document"].body.style.cursor = '';
        }
        if (event.name === 'nodeDragging') {
            var dragElementIcon = ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_23__["document"].querySelectorAll('.e-drag-item.treeview-external-drag .e-icon-expandable');
            for (var i = 0; i < dragElementIcon.length; i++) {
                dragElementIcon[i].style.display = 'none';
            }
        }
    };
    ServicesappointmentlistComponent.prototype.onRenderCell = function (args, value) {
        if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
            var target = args.element.querySelector('.e-resource-text');
            //(args.element as HTMLElement).style.background = differentTimeData[i].Color;
            target.innerHTML = "<div class=\"name\"  >Crew/Resource Name <a id=\"btnFilter\"  class=\"pull-right\" href=\"javascript:void(0);\" ><i class=\"fa fa-filter\" ></i></a><a id=\"clearFilter\"  class=\"pull-right\"    href=\"javascript:void(0);\" ><i class=\"fa fa-refresh\" ></i></a></div>";
        }
        // (args.element as HTMLElement).style.background = '#FF5722';
    };
    ServicesappointmentlistComponent.prototype.onActionBegin = function (event) {
        var _this = this;
        if (event.requestType === 'eventCreate' && this.isTreeItemDropped) {
            var treeViewdata = this.treeObj.fields.dataSource;
            var filteredPeople = treeViewdata.filter(function (item) { return item.Id !== parseInt(_this.draggedItemId, 10); });
            this.treeObj.fields.dataSource = filteredPeople;
            var elements = ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_23__["document"].querySelectorAll('.e-drag-item.treeview-external-drag');
            for (var i = 0; i < elements.length; i++) {
                Object(_syncfusion_ej2_base__WEBPACK_IMPORTED_MODULE_24__["remove"])(elements[i]);
            }
        }
    };
    ServicesappointmentlistComponent.prototype.onTreeDragStop = function (event) {
        console.log(event, 'event');
        var treeElement = Object(_syncfusion_ej2_base__WEBPACK_IMPORTED_MODULE_24__["closest"])(event.target, '.e-treeview');
        var classElement = this.scheduleObj.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            var scheduleElement = Object(_syncfusion_ej2_base__WEBPACK_IMPORTED_MODULE_24__["closest"])(event.target, '.e-content-wrap');
            if (scheduleElement) {
                var treeviewData = this.treeObj.fields.dataSource;
                if (event.target.classList.contains('e-work-cells')) {
                    var filteredData = treeviewData.filter(function (item) { return item.Id === parseInt(event.draggedNodeData.id, 10); });
                    console.log(event, 'event');
                    console.log('filteredData', filteredData);
                    var cellData = this.scheduleObj.getCellDetails(event.target);
                    //let draggedNodeData = event.draggedNodeData.id;
                    var resourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
                    console.log(cellData, 'cellData');
                    console.log(resourceDetails, 'resourceDetails');
                    var eventData = {
                        IsCrew: resourceDetails.resourceData.IsCrew,
                        Id: event.draggedNodeData.id,
                        Name: filteredData[0].Name,
                        StartTime: cellData.startTime,
                        EndTime: cellData.endTime,
                        IsAllDay: cellData.isAllDay,
                        Description: filteredData[0].Description,
                        DepartmentID: resourceDetails.resourceData.GroupId,
                        ConsultantID: resourceDetails.resourceData.Id,
                        DurationType: filteredData[0].DurationType,
                        EstimatedDuration: filteredData[0].EstimatedDuration
                    };
                    console.log('eventData', eventData);
                    this.scheduleObj.openEditor(eventData, 'Add', true);
                    this.isTreeItemDropped = true;
                    this.draggedItemId = event.draggedNodeData.id;
                }
            }
        }
    };
    ServicesappointmentlistComponent.prototype.onFilterClick = function (event) {
        console.log('event', event);
        var ab;
        var ac;
        if (event.srcElement.classList != undefined && event.srcElement.classList != null && event.srcElement.offsetParent) {
            if (event.srcElement.classList[1] == undefined || event.srcElement.offsetParent.classList[0] == undefined) {
                ab = null;
                ac = null;
            }
            else {
                ab = event.srcElement.classList[1];
                ac = event.srcElement.offsetParent.classList[0];
            }
        }
        else {
            ab = null;
            ac = null;
        }
        if (ab == 'fa-filter' && ac == 'pull-right') {
            this.filterModal.show();
        }
        if (ab == 'fa-refresh' && ac == 'pull-right') {
            this.filterModal.clearallForm();
            this.filterData = null;
            var ad = new Date();
            this.GetCrewResourceCalenderList(ad, null, true);
            this.GetCrewResourceList();
            this.GetUnschedulledList();
        }
    };
    ServicesappointmentlistComponent.prototype.searchFilterCalender = function (e) {
        console.log(e);
        this.filterModal.show();
        // this.filterModal.show();
    };
    ServicesappointmentlistComponent.prototype.onActionComplete = function (event) {
        var _this = this;
        // this.onFilterClick(null);
        console.log('event', event);
        if (event.requestType == "eventChanged") {
            this.loadSave = true;
            var data = void 0;
            data = event.data;
            this.StartDate = data[0].StartTime;
            this.currentDate = new Date();
            if (data[0].mastervalue != 'Completed' && data[0].mastervalue != 'Cancelled') {
                console.log('data', data);
                var startdateMoment = moment__WEBPACK_IMPORTED_MODULE_32___default()(data[0].StartTime);
                var enddateMoment = moment__WEBPACK_IMPORTED_MODULE_32___default()(data[0].EndTime);
                //getting the difference in years
                var years = enddateMoment.diff(startdateMoment, 'years');
                //moment returns the total months between the two dates, subtracting the years
                var months = enddateMoment.diff(startdateMoment, 'months') - (years * 12);
                //to calculate the days, first get the previous month and then subtract it
                startdateMoment.add(years, 'years').add(months, 'months');
                var days = enddateMoment.diff(startdateMoment, 'days');
                var diff = (data[0].StartTime.getTime() - data[0].EndTime.getTime()) / 1000;
                diff /= 60;
                var minute = Math.abs(Math.round(diff));
                if (data[0].EmployeeId.includes('Crew')) {
                    data[0].IsCrew = 1;
                }
                else {
                    data[0].IsCrew = 0;
                }
                data[0].EmployeeId = data[0].EmployeeId.slice(0, data[0].EmployeeId.indexOf('-'));
                if (data[0].EmployeeId == "-1") {
                    event.cancel = true;
                }
                else {
                    data[0].StartTime = (data[0].StartTime == null ? null : this.commonService.getUserSelectedZoneToUTC(data[0].StartTime));
                    data[0].EndTime = (data[0].EndTime == null ? null : this.commonService.getUserSelectedZoneToUTC(data[0].EndTime));
                    console.log('aftyer', data);
                    this.addupdateassignedResourceModel.jsondata = JSON.stringify(data);
                    this.serviceappointmentlistService.AddUpdateAssignedServiceAppointment(this.addupdateassignedResourceModel).subscribe(function (result) {
                        if (result == 1) {
                            var last;
                            var ab = new Date();
                            var date = _this.StartDate, y = date.getFullYear(), m = date.getMonth();
                            var lastDay = new Date(y, m + 1, 0);
                            var firstDay = new Date(y, m, 1);
                            if (_this.callenderCurrentView == 'Month') {
                                last = lastDay;
                                ab = firstDay;
                            }
                            else {
                                last = ab;
                            }
                            _this.GetCrewResourceCalenderList(ab, last, true);
                            _this.loadSave = false;
                            _this.toaster.success('Appointment Assigned succesfully');
                        }
                        else {
                            _this.loadSave = false;
                        }
                        console.log('resultresultresultresult', result);
                    });
                }
            }
            else {
                //event.cancel = true;
                if (data[0].mastervalue == 'Completed') {
                    this.toaster.error('This appointment is already completed. You can not edit completed appointments.');
                }
                if (data[0].mastervalue == 'Cancelled') {
                    this.toaster.error('This appointment is already cancelled. You can not edit cancelled appointments.');
                }
                //var last= new Date(data[0].EndTime)
                //  var ab = new Date(data[0].StartTime);
                //  var yl = last.getFullYear(),
                //  var ml = last.getMonth();
                //  //var date = this.StartDate,
                //  y = ab.getFullYear(),
                //    m = ab.getMonth();
                //  var firstDay = new Date(y, m, 1);
                //  var lastDay = new Date(yl, ml + 1, 0);
                var last = new Date(data[0].EndTime);
                var ab = new Date(data[0].StartTime);
                //var date = new Date(),
                var y = ab.getFullYear();
                var m = ab.getMonth();
                var yl = last.getFullYear();
                var ml = last.getMonth();
                var firstDay = new Date(y, m, 1);
                var lastDay = new Date(yl, ml + 1, 0);
                if (this.callenderCurrentView == 'Month') {
                    last = lastDay;
                    ab = firstDay;
                }
                else {
                    last = ab;
                }
                this.GetCrewResourceCalenderList(ab, last, true);
                this.loadSave = false;
            }
        }
        if (event.requestType === "viewNavigate" || event.requestType === "dateNavigate") {
            var currentViewDates = this.scheduleObj.getCurrentViewDates();
            var startDate = currentViewDates[0];
            var endDate = currentViewDates[currentViewDates.length - 1];
            var startdateMoment = moment__WEBPACK_IMPORTED_MODULE_32___default()(startDate);
            var enddateMoment = moment__WEBPACK_IMPORTED_MODULE_32___default()(endDate);
            startdateMoment.add(years, 'years').add(months, 'months');
            var days = enddateMoment.diff(startdateMoment, 'days');
            if (days > 10) {
                this.callenderCurrentView = 'Month';
            }
            else if (days == 0) {
                this.callenderCurrentView = 'Day';
            }
            else {
                this.callenderCurrentView = null;
            }
            this.GetCrewResourceCalenderList(startDate, endDate, true);
        }
        //----------do not delete this start here-----------------
        setTimeout(function () {
            var part = ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_23__["document"].getElementById('btnFilter');
            if (part) {
                part.click();
            }
        }, 1000);
        //----------do not delete this end here-----------------
    };
    ServicesappointmentlistComponent.prototype.GetUnschedulledList = function (worktypeid, accountid, categoryid, teritoryid, testAccount) {
        var _this = this;
        if (worktypeid === void 0) { worktypeid = null; }
        if (accountid === void 0) { accountid = null; }
        if (categoryid === void 0) { categoryid = null; }
        if (teritoryid === void 0) { teritoryid = null; }
        if (testAccount === void 0) { testAccount = null; }
        this.loadSaveunSchd = true;
        this.serviceappointmentlistService.GetUnscheduledApptList(worktypeid, accountid, categoryid, teritoryid, testAccount)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_28__["take"])(1))
            .subscribe(function (resp) {
            _this.waitingList = [];
            _this.field = { dataSource: _this.waitingList, id: 'Id', text: 'Name' };
            if (resp) {
                _this.waitingList = JSON.parse(resp);
                _this.field = { dataSource: _this.waitingList, id: 'Id', text: 'Name' };
                _this.loadSaveunSchd = false;
            }
        }, function (error) { _this.loadSaveunSchd = false; }, function () { _this.loadSaveunSchd = false; });
    };
    ServicesappointmentlistComponent.prototype.GetCrewResourceList = function () {
        var _this = this;
        this.loadSave = true;
        this.serviceappointmentlistService.GetCrewResourceList()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_28__["take"])(1))
            .subscribe(function (resp) {
            if (resp) {
                _this.employeeDataSource = JSON.parse(resp);
                //this.data = <Object[]>extend([], this.calenderdatalist, null, true)
                console.log('this.employeeDataSource', _this.employeeDataSource);
                //console.log('this.calenderdatalist', this.calenderdatalist)
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        }, function () { });
    };
    ServicesappointmentlistComponent.prototype.OnServiceCrewClick = function (data) {
        debugger;
        if (data.Id.includes('-')) {
            data.Id = data.Id.slice(0, data.Id.indexOf('-'));
        }
        var _data = {
            id: data.Id,
            name: data.Text
        };
        this.ServiceCrewMembersPopup.show(_data);
    };
    ServicesappointmentlistComponent.prototype.GetCrewResourceCalenderList = function (cuurentdate, lastdate, isFirstTime, filters) {
        var _this = this;
        if (lastdate === void 0) { lastdate = null; }
        if (isFirstTime === void 0) { isFirstTime = true; }
        if (filters === void 0) { filters = null; }
        cuurentdate = this.datePipe.transform(cuurentdate);
        if (lastdate != null) {
            lastdate = this.datePipe.transform(lastdate);
        }
        this.serviceappointmentlistService.GetCrewResourceCalenderList(cuurentdate, lastdate, true, filters).subscribe(function (resp) {
            var convertDateTime = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_31__["DateTimeToLocalForAddEditPipe"];
            if (resp) {
                _this.calenderdatalist = _this.serviceappointmentlistService.objectdata;
                _this.calenderdatalist.forEach(function (m) {
                    m.StartTime = (m.StartTime == null ? null : convertDateTime.transform(m.StartTime, null));
                    m.EndTime = (m.EndTime == null ? null : convertDateTime.transform(m.EndTime, null));
                });
                var data = [];
                data = _this.calenderdatalist;
                console.log('datadatadata', data);
                _this.BindToScheduler(data);
                //let DateScheduleStartTime = (result.ServiceAppoitnt[0].ScheduleStartTime == null ? null : convertDateTime.transform(result.ServiceAppoitnt[0].ScheduleStartTime, null));
                //let DateScheduleEndTime = (result.ServiceAppoitnt[0].ScheduleEndTime == null ? null : convertDateTime.transform(result.ServiceAppoitnt[0].ScheduleEndTime, null));
                console.log(' this.calenderdatalist', _this.serviceappointmentlistService.objectdata);
            }
        });
    };
    ServicesappointmentlistComponent.prototype.BindToScheduler = function (tempData) {
        this.data = Object(_syncfusion_ej2_base__WEBPACK_IMPORTED_MODULE_24__["extend"])([], tempData, null, true);
        this.eventSettings.dataSource = this.data;
        this.scheduleObj.eventSettings.dataSource = this.data;
        this.onCreated();
        console.log('scheduleObj', this.scheduleObj.eventSettings.dataSource);
    };
    ServicesappointmentlistComponent.prototype.onCreated = function () {
        var currTime = new Date();
        var hours = currTime.getHours() < 10 ? '0' + currTime.getHours().toString() : currTime.getHours().toString();
        var minutes = currTime.getMinutes().toString();
        var time = hours + ':' + minutes;
        if (this.callenderCurrentView == 'Month') {
            this.scheduleObj.scrollTo(null, currTime);
        }
        else if (this.callenderCurrentView == 'Day') {
            this.scheduleObj.scrollTo(time);
        }
        else {
            this.scheduleObj.scrollTo(time, currTime);
        }
    };
    ServicesappointmentlistComponent.prototype.getEmployeeName = function (value) {
        return value.resourceData[value.resource.textField];
    };
    ServicesappointmentlistComponent.prototype.getEmployeeDesignation = function (value) {
        var resourceName = value.resourceData[value.resource.textField];
        return value.resourceData.Designation;
    };
    ServicesappointmentlistComponent.prototype.getEmployeeImageName = function (value) {
        return this.getEmployeeName(value).toLowerCase();
    };
    ServicesappointmentlistComponent.prototype.onPopupOpen = function (args) {
        args.cancel = true;
        console.log('args', args);
        if (args.type == "EventContainer") {
            args.cancel = false;
        }
        console.log('after', args);
        if (args.type == 'QuickInfo') {
            args.data.EmployeeId = args.data.EmployeeId.slice(0, args.data.EmployeeId.indexOf('-'));
            if (args.data.mastervalue != "Completed" && args.data.mastervalue != "Cancelled") {
                if (args.data.Id != undefined && args.data.Id != null && args.data.Id != '') {
                    if (args.data.IsCrew == '0' && args.data.EmployeeId != "-1") {
                        var resourceId = args.data.EmployeeId;
                    }
                    else if (args.data.IsCrew == '1' && args.data.EmployeeId != "-1") {
                        var crewId = args.data.EmployeeId;
                    }
                    this.addAssignedResourcesPopupModel.show(args.data.Id, resourceId, crewId);
                }
                else {
                    this.toaster.error('Please drop  the appointment from right side');
                }
            }
            else {
                if (args.data.mastervalue == "Completed") {
                    this.toaster.error('This appointment is already completed. You can not edit completed appointments.');
                }
                else {
                    this.toaster.error('This appointment is already cancelled. You can not edit cancelled appointments.');
                }
            }
        }
        if (args.type == 'Editor') {
            args.data.ConsultantID = args.data.ConsultantID.slice(0, args.data.ConsultantID.indexOf('-'));
            if (args.data.ConsultantID != undefined && args.data.ConsultantID != null && args.data.ConsultantID != '') {
                var currentDate = new Date();
                //let starttime12: any = args.data.StartTime;
                this.starttime = new Date(args.data.StartTime);
                console.log('BEFOREstarttime', this.starttime);
                this.endtime = new Date(args.data.StartTime);
                if (args.data.DurationType == "Hours") {
                    this.endtime.setHours(this.endtime.getHours() + args.data.EstimatedDuration);
                }
                else if (args.data.DurationType == "Minutes") {
                    this.endtime.setMinutes(this.endtime.getMinutes() + args.data.EstimatedDuration);
                    console.log('9999', this.endtime);
                }
                else {
                    this.endtime = null;
                }
                if (args.data.IsCrew == '0' && args.data.ConsultantID != "-1") {
                    var resourceId = args.data.ConsultantID;
                }
                else if (args.data.IsCrew == '1' && args.data.ConsultantID != "-1") {
                    var crewId = args.data.ConsultantID;
                }
                console.log('ee', this.endtime);
                console.log('ee11', this.endtime);
                console.log('endtime', this.endtime);
                console.log('starttime', this.starttime);
                this.addAssignedResourcesPopupModel.show(args.data.Id, resourceId, crewId, this.starttime, this.endtime, 'drag');
            }
        }
    };
    ServicesappointmentlistComponent.prototype.getFilterData = function (event) {
        var _this = this;
        this.filterData = event;
        console.log('eventeventevent', event);
        this.loadSave = true;
        var data = JSON.parse(event);
        // this.worktypeid = data.worktypeid
        if (event != null) {
            this.GetUnschedulledList(data.worktypeid, data.accountid, data.categoryid, data.teritoryid, data.testAccount);
        }
        else {
            this.GetUnschedulledList();
        }
        //var ab = new Date()
        var last;
        var ab = new Date();
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var lastDay = new Date(y, m + 1, 0);
        var firstDay = new Date(y, m, 1);
        if (this.callenderCurrentView == 'Month') {
            last = lastDay;
            ab = firstDay;
        }
        else {
            last = ab;
        }
        this.GetCrewResourceCalenderList(ab, last, true, event);
        // {"crewid":null,"resourceid":null,"departmentid":null,"worktypeid":null,"accountid":null,"teritoryid":null,"categoryid":"1305"}
        this.serviceappointmentlistService.GetCrewResourceList(event)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_28__["take"])(1))
            .subscribe(function (resp) {
            if (resp) {
                _this.employeeDataSource = JSON.parse(resp);
                //this.data = <Object[]>extend([], this.calenderdatalist, null, true)
                console.log('this.employeeDataSource', _this.employeeDataSource);
                //console.log('this.calenderdatalist', this.calenderdatalist)
            }
        }, function (error) { }, function () { });
        this.loadSave = false;
    };
    ServicesappointmentlistComponent.prototype.oneventRendered = function (args) {
        if (args.data.Color != null && args.data.Color != 'null' && args.data.Color != undefined) {
            args.element.style.backgroundColor = args.data.Color;
        }
        //let categoryColor: string = args.data.CategoryColor as string;
        //if (!args.element || !categoryColor) {
        //  return;
        //}
        //if (this.scheduleObj.currentView === 'Agenda') {
        //  (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        //} else {
        //  args.element.style.backgroundColor = categoryColor;
        //}
    };
    ServicesappointmentlistComponent.prototype.onNumberClick = function (phoneNo) {
        this.PhoneNo = phoneNo;
        this.isVisibleDialer = true;
        this.app.ShowDialer({ phoneNo: this.PhoneNo, visible: this.isVisibleDialer, defaultValue: true });
    };
    ServicesappointmentlistComponent.prototype.closeWelcomeCall = function () {
        this.PhoneNo = '';
        this.isVisibleDialer = false;
        this.app.ShowDialer({ phoneNo: this.PhoneNo, visible: this.isVisibleDialer, defaultValue: false });
    };
    //eventMouseEnter(model) {
    //  console.log('hovert', model);
    //  console.log('hover', model.event._def.extendedProps);
    //  this.popupdata = model.event._def.extendedProps
    //  document.getElementById("myForm").style.display = "block";
    //}
    //eventMouseLeave(model) {
    //  console.log('hoverout', model);
    //  document.getElementById("myForm").style.display = "none";
    //}
    ServicesappointmentlistComponent.prototype.onMoreEventsClick = function (args) {
        console.log('MoreEventsClickArgs', args);
        //args.isPopupOpen = false;
    };
    ServicesappointmentlistComponent.ctorParameters = function () { return [
        { type: _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ServicesappointmentService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"] },
        { type: _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ServicesappointmentService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_17__["DatePipe"] },
        { type: _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_18__["ScriptService"] },
        { type: ngx_lightbox__WEBPACK_IMPORTED_MODULE_19__["LightboxConfig"] },
        { type: ngx_lightbox__WEBPACK_IMPORTED_MODULE_19__["Lightbox"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_17__["DatePipe"] },
        { type: _app_component__WEBPACK_IMPORTED_MODULE_33__["AppComponent"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('searchTypeSelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_20__["NgSelectComponent"])
    ], ServicesappointmentlistComponent.prototype, "searchTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_7__["SearchfilteraddComponent"])
    ], ServicesappointmentlistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageviewnew_manageviewnew_component__WEBPACK_IMPORTED_MODULE_8__["ManageviewnewComponent"])
    ], ServicesappointmentlistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addAssignedResourcesPopup', { static: false }),
        __metadata("design:type", _addassignedresourcepopup_addassignedresourcepopup_component__WEBPACK_IMPORTED_MODULE_11__["AddassignedresourcepopupComponent"])
    ], ServicesappointmentlistComponent.prototype, "addAssignedResourcesPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('attendancemodel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], ServicesappointmentlistComponent.prototype, "attendancemodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("table", { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"])
    ], ServicesappointmentlistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('DetailPopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], ServicesappointmentlistComponent.prototype, "DetailPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('auditsPopup', { static: false }),
        __metadata("design:type", _auditpopup_auditpopup_component__WEBPACK_IMPORTED_MODULE_21__["AuditpopupComponent"])
    ], ServicesappointmentlistComponent.prototype, "auditsPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('auditCheckListsPopup', { static: false }),
        __metadata("design:type", _auditchecklistpopup_auditchecklistpopup_component__WEBPACK_IMPORTED_MODULE_22__["AuditchecklistpopupComponent"])
    ], ServicesappointmentlistComponent.prototype, "auditCheckListsPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('filterPopup', { static: false }),
        __metadata("design:type", _filterpopup_filterpopup_component__WEBPACK_IMPORTED_MODULE_29__["FilterpopupComponent"])
    ], ServicesappointmentlistComponent.prototype, "filterModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('serviceAppointmentdetail', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], ServicesappointmentlistComponent.prototype, "serviceAppointmentdetail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ServiceCrewMembersList', { static: false }),
        __metadata("design:type", _manageservicecrew_service_crew_members_popup_service_crew_members_popup_component__WEBPACK_IMPORTED_MODULE_30__["ServiceCrewMembersPopupComponent"])
    ], ServicesappointmentlistComponent.prototype, "ServiceCrewMembersPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ServicesappointmentlistComponent.prototype, "offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fullcalendar', { static: false }),
        __metadata("design:type", ng_fullcalendar__WEBPACK_IMPORTED_MODULE_12__["CalendarComponent"])
    ], ServicesappointmentlistComponent.prototype, "fullcalendar", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('scheduleObj', { static: false }),
        __metadata("design:type", _syncfusion_ej2_angular_schedule__WEBPACK_IMPORTED_MODULE_25__["ScheduleComponent"])
    ], ServicesappointmentlistComponent.prototype, "scheduleObj", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('treeObj', { static: false }),
        __metadata("design:type", _syncfusion_ej2_angular_navigations__WEBPACK_IMPORTED_MODULE_26__["TreeViewComponent"])
    ], ServicesappointmentlistComponent.prototype, "treeObj", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])("click", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ServicesappointmentlistComponent.prototype, "onFilterClick", null);
    ServicesappointmentlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-servicesappointmentlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./servicesappointmentlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/servicesappointmentlist.component.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            providers: [_syncfusion_ej2_angular_schedule__WEBPACK_IMPORTED_MODULE_25__["TimelineViewsService"], _syncfusion_ej2_angular_schedule__WEBPACK_IMPORTED_MODULE_25__["TimelineMonthService"], _syncfusion_ej2_angular_schedule__WEBPACK_IMPORTED_MODULE_25__["ResizeService"], _syncfusion_ej2_angular_schedule__WEBPACK_IMPORTED_MODULE_25__["DragAndDropService"]],
            styles: [__importDefault(__webpack_require__(/*! ./servicesappointmentlist.component.scss */ "./src/app/views/servicesappointment/servicesappointmentlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ServicesappointmentService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"],
            _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ServicesappointmentService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"], _angular_common__WEBPACK_IMPORTED_MODULE_17__["DatePipe"], _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_18__["ScriptService"], ngx_lightbox__WEBPACK_IMPORTED_MODULE_19__["LightboxConfig"],
            ngx_lightbox__WEBPACK_IMPORTED_MODULE_19__["Lightbox"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], _angular_common__WEBPACK_IMPORTED_MODULE_17__["DatePipe"], _app_component__WEBPACK_IMPORTED_MODULE_33__["AppComponent"]])
    ], ServicesappointmentlistComponent);
    return ServicesappointmentlistComponent;
}());



/***/ }),

/***/ "./src/app/views/servicesappointment/servicesappointmentmapview.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/views/servicesappointment/servicesappointmentmapview.component.ts ***!
  \***********************************************************************************/
/*! exports provided: ServicesappointmentMapViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesappointmentMapViewComponent", function() { return ServicesappointmentMapViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./servicesappointment.service */ "./src/app/views/servicesappointment/servicesappointment.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
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





var ServicesappointmentMapViewComponent = /** @class */ (function () {
    function ServicesappointmentMapViewComponent(servicesappointmentService, route, router, toaster, commonService) {
        var _this = this;
        this.servicesappointmentService = servicesappointmentService;
        this.route = route;
        this.router = router;
        this.toaster = toaster;
        this.commonService = commonService;
        this.loadSave = false;
        this.moduleName = 'serviceappointment';
        this.submoduleName = 'serviceappointment';
        this.modulePermission = [];
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
            _this.userName = userdetail.firstName + ' ' + userdetail.lastName;
        });
    }
    ServicesappointmentMapViewComponent.prototype.ngOnInit = function () {
    };
    ServicesappointmentMapViewComponent.ctorParameters = function () { return [
        { type: _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ServicesappointmentService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    ServicesappointmentMapViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-servicesappointmentmapview',
            template: __importDefault(__webpack_require__(/*! raw-loader!./servicesappointmentmapview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/servicesappointmentmapview.component.html")).default,
            providers: [_servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ServicesappointmentService"]]
        }),
        __metadata("design:paramtypes", [_servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ServicesappointmentService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], ServicesappointmentMapViewComponent);
    return ServicesappointmentMapViewComponent;
}());



/***/ }),

/***/ "./src/app/views/servicesappointment/viewservicesappointment.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/views/servicesappointment/viewservicesappointment.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VzYXBwb2ludG1lbnQvdmlld3NlcnZpY2VzYXBwb2ludG1lbnQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/servicesappointment/viewservicesappointment.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/views/servicesappointment/viewservicesappointment.component.ts ***!
  \********************************************************************************/
/*! exports provided: ViewservicesappointmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewservicesappointmentComponent", function() { return ViewservicesappointmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./servicesappointment.service */ "./src/app/views/servicesappointment/servicesappointment.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/new-notes/newnoteslist.component */ "./src/app/views/shared/new-notes/newnoteslist.component.ts");
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











var ViewservicesappointmentComponent = /** @class */ (function () {
    function ViewservicesappointmentComponent(dialogService, servicesappointmentlistService, datetime, commonService, fb, router, toaster, route, leadservice, location) {
        this.dialogService = dialogService;
        this.servicesappointmentlistService = servicesappointmentlistService;
        this.datetime = datetime;
        this.commonService = commonService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.leadservice = leadservice;
        this.location = location;
        this.notemodel = new _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__["noteModel"]();
        this.isViewNote = false;
        this.notescount = 0;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.lstAssignedResources = {
            pager: {},
            data: []
        };
        this.sortDir = 'desc';
        this.sortColumn = 'createdon';
        this.moduleName = 'serviceappointment';
        this.submoduleName = 'serviceappointment';
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
        this.lstserviceAppointmentHistory = {
            pager: {},
            data: []
        };
        this.checkboxdata1 = [];
        this.pageSizeValueAssignedResList = 4;
        this.currentPageNotes = 0;
        this.priceBooksCount = 0;
        this.campaignCount = 0;
        this.priceBooksPageNo = 1;
        this.campaignPageNo = 1;
        this.NotesAttachmentsCount = 0;
        this.NotesCount = 0;
        this.serviceAppointmentHistoryCount = 0;
        this.ApprovalHistoryCount = 0;
        this.AssignedResourcesCount = 0;
        this.submoduleid = 1;
        this.objectname = 'ServiceAppointment';
        this.pageSizeValuenotes = 4;
        this.NotespagedData = {
            pager: {},
            data: []
        };
        this.isDateChanged = true;
        this.isEdit = false;
        this.pageSize = 4;
        this.editServiceResourceId = 0;
        this.editServiceCrewId = 0;
        this.length = 10;
        this.searchText = '';
        this.NoteCreatedOn = '';
        this.disabledEdit = false;
        this.len = 10;
        this.addAssignedResourcesmodel = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["addAssignedResourcesModel"]();
        this.validityServiceResource = false;
        this.validityServiceCrew = false;
        this.isValid = true;
        this.siteurl = '';
        //=============================================================================
        this.addNoteForm = this.fb.group({
            note_id: [null],
            noteTitle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            noteDescription: ['', null]
        });
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }
    ViewservicesappointmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.siteurl = window.location.origin;
        console.log('siteurl', this.siteurl);
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.servicesappointmentid = id;
        });
        this.pageSizeValueAssignedResList = 4;
        this.currentPageNotes = 1;
        this.currentPageAssignedRes = 1;
        this.getPageSizes();
        this.loadSave = true;
        this.GetCustomFieldsList();
        this.GetServiceResourceDll(this.editServiceResourceId = 0);
        this.GetServiceCrewDll(this.editServiceCrewId = 0);
        this.GetEstimatedTravelTimeFromAndToSourceDll();
        this.initForm();
    };
    ViewservicesappointmentComponent.prototype.getRelatedTabData = function () {
        this.loadSave = true;
        this.GetAssignedResourcesList();
        this.getNoteslist();
        this.loadSave = false;
    };
    ViewservicesappointmentComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ViewservicesappointmentComponent.prototype.close = function () {
        //this.location.back();
        this.router.navigateByUrl("/serviceappointment");
    };
    ViewservicesappointmentComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        this.displayType = 'VIEW';
        this.servicesappointmentlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.servicesappointmentid, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.servicesappointmentlistService.customFieldsList.data;
                console.log("customCompnentValues", _this.customCompnentValues);
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["CheckboxData"]();
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
                    if (cnt.ColumnName == 'AppointmentNumber') {
                        _this.AppointmentNumber = cnt.value;
                    }
                    if (cnt.dt_code == 'select') {
                        if (cnt.value != '' && cnt.select_options != null) {
                            cnt.select_options.forEach(function (itemList) {
                                if (itemList.value == cnt.value) {
                                    cnt.value = itemList.name;
                                }
                                else {
                                    //cnt.value = null;
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
                _this.loadSave = false;
                _this.GetCustomFieldsListTopRow();
            }
        }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
    };
    ViewservicesappointmentComponent.prototype.GetCustomFieldsListTopRow = function () {
        var _this = this;
        this.displayType = 'VIEW_TOP';
        this.loadSave = true;
        this.servicesappointmentlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.servicesappointmentid, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValuesTop = _this.servicesappointmentlistService.customFieldsList.data;
                console.log(' this.customCompnentValuesTop', _this.customCompnentValuesTop);
                _this.customCompnentValuesTop.forEach(function (cnt) {
                    if (cnt.ColumnName == 'Status' && cnt.table_alias == 'tsa') {
                        var ab = cnt.value.split('::', 1);
                        if (ab == 'Completed')
                            _this.disabledEdit = true;
                        //alert(this.AppStatus)
                    }
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
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    else {
                        val = (cnt.value == '' ? null : cnt.value);
                    }
                    if (cnt.ColumnName == 'AppointmentNumber') {
                        _this.AppointmentNumber = cnt.value;
                    }
                    if (cnt.dt_code == 'select') {
                        if (cnt.value != '' && cnt.select_options != null) {
                            cnt.select_options.forEach(function (itemList) {
                                if (itemList.value == cnt.value) {
                                    cnt.value = itemList.name;
                                }
                                else if (cnt.name == 'AccountId') {
                                    _this.accountId = cnt.ref_value;
                                }
                                else {
                                    //cnt.value = null;
                                }
                            });
                        }
                    }
                });
                _this.loadSave = false;
                _this.getRelatedTabData();
            }
        });
    };
    ViewservicesappointmentComponent.prototype.getListingColorCode = function (fieldValue) {
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0] }];
            }
        }
        return this.lstListingColorCode;
    };
    ViewservicesappointmentComponent.prototype.onPriceBooksSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
    };
    ViewservicesappointmentComponent.prototype.onCampaignsSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
    };
    ViewservicesappointmentComponent.prototype.setPriceBooksPageNo = function ($event) {
        this.priceBooksPageNo = $event.page;
    };
    ViewservicesappointmentComponent.prototype.setCampaignPageNo = function ($event) {
        this.campaignPageNo = $event.page;
    };
    ViewservicesappointmentComponent.prototype.GetServiceResourceDll = function (id) {
        var _this = this;
        if (id === void 0) { id = 0; }
        this.servicesappointmentlistService.GetServiceResourceDll(id, '0', this.searchText).subscribe(function (data) {
            _this.serviceResourceNames = data;
        });
    };
    ViewservicesappointmentComponent.prototype.GetServiceCrewDll = function (id) {
        var _this = this;
        if (id === void 0) { id = 0; }
        this.servicesappointmentlistService.GetServiceCrewDll(id, '0', this.searchText).subscribe(function (data) {
            _this.serviceCrewNames = data;
        });
    };
    ViewservicesappointmentComponent.prototype.GetEstimatedTravelTimeFromAndToSourceDll = function () {
        var _this = this;
        this.servicesappointmentlistService.GetEstimatedTravelTimeFromAndToSourceDll().subscribe(function (data) {
            _this.estimatedTravelTimeFromSourceNames = data;
            _this.estimatedTravelTimeToSourceNames = data;
        });
    };
    ViewservicesappointmentComponent.prototype.AddAssignedResources = function () {
        this.serviceResourceId.enable();
        this.serviceCrewId.enable();
        this.searchText = "";
        this.GetServiceResourceDll();
        try {
            this.GetServiceCrewDll();
        }
        catch (e) {
            console.log("wrwerwrwer", e);
            throw e;
        }
        this.addAssignedResourcesForm.reset();
        this.addAssignedResourcesmodel.serviceAppointment = this.customCompnentValues[(this.customCompnentValues.findIndex(function (s) { return s.ColumnName === 'AppointmentNumber'; }))].value;
        this.addAssignedResourcesForm.patchValue({ 'serviceAppointment': this.addAssignedResourcesmodel.serviceAppointment.toString() });
        this.title = "Add Assigned Resource";
        this.GetServiceResourceDll();
        this.addAssignedResourcesPopupModel.show();
    };
    ViewservicesappointmentComponent.prototype.initForm = function () {
        this.addAssignedResourcesForm = this.fb.group({
            'Id': [null],
            'serviceAppointment': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'serviceResourceId': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'estimatedTravelTime': ['', null],
            'actualTravelTime': ['', null],
            'serviceCrewId': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'estimatedTravelTimeFromSourceId': [null, null],
            'approximateTravelDistanceForm': [, null],
            'estimatedTravelTimeToSourceId': [null, null],
            'approximateTravelDistanceTo': [null, null],
            'lastUpdatedEpoch': ['', null],
            'approximateTravelTimeForm': ['', null],
            'isUpdatedByOptimization': ['', null],
            'calculatedDurationMinutes': ['', null]
        });
    };
    ViewservicesappointmentComponent.prototype.changeValidators = function (type) {
        if (type == 'serviceResourceId' && this.serviceResourceId.value != null && this.serviceCrewId.value == null) {
            this.serviceCrewId.clearValidators();
            this.serviceCrewId.updateValueAndValidity();
            this.serviceResourceId.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            this.serviceResourceId.updateValueAndValidity();
            this.serviceCrewId.disable();
            this.serviceResourceId.enable();
        }
        else if (type == 'serviceCrewId' && this.serviceCrewId.value != null && this.serviceResourceId.value == null) {
            this.serviceResourceId.clearValidators();
            this.serviceResourceId.updateValueAndValidity();
            this.serviceCrewId.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            this.serviceCrewId.updateValueAndValidity();
            this.serviceResourceId.disable();
            this.serviceCrewId.enable();
        }
    };
    ViewservicesappointmentComponent.prototype.resetValidations = function () {
        if (this.serviceCrewId.value == null && this.serviceResourceId.value == null) {
            this.serviceResourceId.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            this.serviceResourceId.updateValueAndValidity();
            this.serviceCrewId.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            this.serviceCrewId.updateValueAndValidity();
            this.serviceResourceId.enable();
            this.serviceCrewId.enable();
        }
        else if (this.serviceCrewId.value == null && this.serviceResourceId.value != null) {
            this.serviceCrewId.clearValidators();
            this.serviceCrewId.updateValueAndValidity();
            this.serviceResourceId.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            this.serviceResourceId.updateValueAndValidity();
            this.serviceResourceId.enable();
            this.serviceCrewId.disable();
        }
        else if (this.serviceCrewId.value != null && this.serviceResourceId.value == null) {
            this.serviceResourceId.clearValidators();
            this.serviceResourceId.updateValueAndValidity();
            this.serviceCrewId.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            this.serviceCrewId.updateValueAndValidity();
            this.serviceResourceId.disable();
            this.serviceCrewId.enable();
        }
    };
    ViewservicesappointmentComponent.prototype.SaveAssignedResources = function () {
        var _this = this;
        if (this.addAssignedResourcesForm.valid) {
            this.loadSave = true;
            this.addAssignedResourcesmodel.Id = this.addAssignedResourcesForm.value.Id;
            this.addAssignedResourcesmodel.serviceAppointment = this.addAssignedResourcesForm.value.serviceAppointment;
            this.addAssignedResourcesmodel.serviceResourceId = this.addAssignedResourcesForm.value.serviceResourceId;
            this.addAssignedResourcesmodel.estimatedTravelTime = this.addAssignedResourcesForm.value.estimatedTravelTime;
            this.addAssignedResourcesmodel.actualTravelTime = this.addAssignedResourcesForm.value.actualTravelTime;
            this.addAssignedResourcesmodel.serviceCrewId = this.addAssignedResourcesForm.value.serviceCrewId;
            this.addAssignedResourcesmodel.estimatedTravelTimeFromSourceId = this.addAssignedResourcesForm.value.estimatedTravelTimeFromSourceId;
            this.addAssignedResourcesmodel.approximateTravelDistanceForm = this.addAssignedResourcesForm.value.approximateTravelDistanceForm;
            this.addAssignedResourcesmodel.estimatedTravelTimeToSourceId = this.addAssignedResourcesForm.value.estimatedTravelTimeToSourceId;
            this.addAssignedResourcesmodel.approximateTravelDistanceTo = this.addAssignedResourcesForm.value.approximateTravelDistanceTo;
            this.addAssignedResourcesmodel.lastUpdatedEpoch = this.addAssignedResourcesForm.value.lastUpdatedEpoch;
            this.addAssignedResourcesmodel.approximateTravelTimeForm = this.addAssignedResourcesForm.value.approximateTravelTimeForm;
            this.addAssignedResourcesmodel.isUpdatedByOptimization = this.addAssignedResourcesForm.value.isUpdatedByOptimization;
            this.addAssignedResourcesmodel.calculatedDurationMinutes = this.addAssignedResourcesForm.value.calculatedDurationMinutes;
            this.servicesappointmentlistService.saveAssignedResource(this.addAssignedResourcesmodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.loadSave = false;
                    _this.toaster.success(result.responseMessage);
                    _this.addAssignedResourcesForm.reset();
                    // this.refresh();
                    _this.currentPageAssignedRes = 1;
                    _this.GetAssignedResourcesList();
                    _this.addAssignedResourcesPopupModel.hide();
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                    _this.currentPageAssignedRes = 1;
                    _this.GetAssignedResourcesList();
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addAssignedResourcesForm);
        }
    };
    ViewservicesappointmentComponent.prototype.closeAssignedResourcesPopup = function () {
        this.addAssignedResourcesPopupModel.hide();
    };
    ViewservicesappointmentComponent.prototype.GetAssignedResourcesList = function () {
        var _this = this;
        this.loadSave = true;
        this.servicesappointmentlistService.GetAssignedResourcesList(this.servicesappointmentid, this.sortColumn, this.currentPageAssignedRes, this.sortDir, this.pageSizeValueAssignedResList)
            .subscribe(function (resp) {
            _this.lstAssignedResources = resp;
            _this.AssignedResourcesCount = resp.pager.totalItems;
            if (resp.data.length > 0) {
                _this.totalRecordsAssignedRes = resp.pager.totalItems;
            }
            else {
                _this.totalRecordsAssignedRes = 0;
                _this.currentPageAssignedRes = _this.currentPageAssignedRes - 1;
                console.log("fsdfsdf", _this.currentPageAssignedRes);
                _this.GetAssignedResourcesList();
            }
            _this.offset = _this.currentPageAssignedRes;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    ViewservicesappointmentComponent.prototype.setAssignedResourcesPageNo = function ($event) {
        this.loadSave = true;
        this.currentPageAssignedRes = $event.page;
        this.GetAssignedResourcesList();
    };
    ViewservicesappointmentComponent.prototype.setPageAssignedResList = function ($event) {
        this.loadSave = true;
        this.currentPageAssignedRes = $event.page;
        this.GetAssignedResourcesList();
    };
    ViewservicesappointmentComponent.prototype.onSortAssignedResList = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPageAssignedRes = 1;
        this.GetAssignedResourcesList();
    };
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "curPageAssignedResList", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "Id", {
        get: function () { return this.addAssignedResourcesForm.get('Id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "serviceAppointment", {
        get: function () { return this.addAssignedResourcesForm.get('serviceAppointment'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "serviceResourceId", {
        get: function () { return this.addAssignedResourcesForm.get('serviceResourceId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "estimatedTravelTime", {
        get: function () { return this.addAssignedResourcesForm.get('estimatedTravelTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "actualTravelTime", {
        get: function () { return this.addAssignedResourcesForm.get('actualTravelTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "serviceCrewId", {
        get: function () { return this.addAssignedResourcesForm.get('serviceCrewId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "estimatedTravelTimeFromSourceId", {
        get: function () { return this.addAssignedResourcesForm.get('estimatedTravelTimeFromSourceId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "approximateTravelDistanceForm", {
        get: function () { return this.addAssignedResourcesForm.get('approximateTravelDistanceForm'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "estimatedTravelTimeToSourceId", {
        get: function () { return this.addAssignedResourcesForm.get('estimatedTravelTimeToSourceId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "approximateTravelDistanceTo", {
        get: function () { return this.addAssignedResourcesForm.get('approximateTravelDistanceTo'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "lastUpdatedEpoch", {
        get: function () { return this.addAssignedResourcesForm.get('lastUpdatedEpoch'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "approximateTravelTimeForm", {
        get: function () { return this.addAssignedResourcesForm.get('approximateTravelTimeForm'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "isUpdatedByOptimization", {
        get: function () { return this.addAssignedResourcesForm.get('isUpdatedByOptimization'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "calculatedDurationMinutes", {
        get: function () { return this.addAssignedResourcesForm.get('calculatedDurationMinutes'); },
        enumerable: true,
        configurable: true
    });
    ViewservicesappointmentComponent.prototype.EditAssignedResource = function (row) {
        console.log(row);
        console.log(row.ServiceResourceId);
        this.title = "Edit Assigned Resource";
        this.isDateChanged = false;
        this.isEdit = true;
        if (row.ServiceResourceId == null) {
            this.serviceResourceId.disable();
            this.serviceCrewId.enable();
        }
        if (row.serviceCrewId == null) {
            this.serviceCrewId.disable();
            row.serviceCrewId = 0;
            this.serviceResourceId.enable();
        }
        this.serviceResourceId.setValue(row.ServiceResourceId);
        this.GetServiceResourceDll(row.ServiceResourceId);
        this.serviceCrewId.setValue(row.serviceCrewId);
        this.GetServiceCrewDll(row.serviceCrewId);
        this.estimatedTravelTimeFromSourceId.setValue(row.estimatedTravelTimeFromSourceId);
        this.estimatedTravelTimeToSourceId.setValue(row.estimatedTravelTimeToSourceId);
        if (this.serviceResourceId.value) {
            this.serviceCrewId.clearValidators();
            this.serviceCrewId.updateValueAndValidity();
            this.serviceCrewId.disable();
        }
        if (this.serviceCrewId.value) {
            this.serviceResourceId.clearValidators();
            this.serviceResourceId.updateValueAndValidity();
            this.serviceResourceId.disable();
        }
        this.addAssignedResourcesForm.patchValue({
            Id: row.Id,
            serviceAppointment: row.serviceAppointment == null ? row.serviceAppointment : row.serviceAppointment.toString(),
            serviceResourceId: row.ServiceResourceId == null ? row.ServiceResourceId : row.ServiceResourceId.toString(),
            estimatedTravelTime: row.estimatedTravelTime,
            actualTravelTime: row.ActualTravelTime,
            serviceCrewId: row.serviceCrewId == null ? row.serviceCrewId : row.serviceCrewId.toString(),
            estimatedTravelTimeFromSourceId: row.estimatedTravelTimeFromSourceId == null ? row.estimatedTravelTimeFromSourceId : row.estimatedTravelTimeFromSourceId.toString(),
            approximateTravelDistanceForm: row.approximateTravelDistanceForm,
            estimatedTravelTimeToSourceId: row.estimatedTravelTimeToSourceId == null ? row.estimatedTravelTimeToSourceId : row.estimatedTravelTimeToSourceId.toString(),
            approximateTravelDistanceTo: row.approximateTravelDistanceTo,
            lastUpdatedEpoch: row.lastUpdatedEpoch,
            approximateTravelTimeForm: row.approximateTravelTimeForm,
            isUpdatedByOptimization: row.isUpdatedByOptimization,
            calculatedDurationMinutes: row.calculatedDurationMinutes,
        });
        // this.addAssignedResourcesForm.get('serviceResource').disable();
        this.addAssignedResourcesPopupModel.show();
    };
    ViewservicesappointmentComponent.prototype.deleteAssignedResource = function (row, AssignedResource) {
        var _this = this;
        var message = "Are you sure you want to delete Assigned Resource?";
        this.dialogService.confirm('Delete Assigned Resource', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.servicesappointmentlistService.DeleteRecords(row.Id, 'tblAssignedResource').subscribe(function (res) {
                    _this.toaster.success("Assigned Resource has been deleted successfully.");
                    _this.GetAssignedResourcesList();
                });
            }
        });
    };
    //===================================================Note Section ==================================================================
    ViewservicesappointmentComponent.prototype.AddNotes = function () {
        this.title = "Add Notes";
        this.isViewNote = false;
        this.addNoteForm.reset();
        this.listnotesmodel.show(this.servicesappointmentid);
    };
    ViewservicesappointmentComponent.prototype.ViewNotes = function (row) {
        console.log("row", row);
        this.isViewNote = true;
        this.isViewNote = true;
        this.notesTitle = row.note_name;
        this.notesDescription = row.note_description;
        this.noteAssignTo = row.createdby;
        this.NoteCreatedOn = row.created_on;
        this.addNotesPopupModel.show();
    };
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "note_id", {
        //========================Getting Note Form Value=============================
        get: function () { return this.addNoteForm.get('note_id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "noteTitle", {
        get: function () { return this.addNoteForm.get('noteTitle'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "noteDescription", {
        get: function () { return this.addNoteForm.get('noteDescription'); },
        enumerable: true,
        configurable: true
    });
    ViewservicesappointmentComponent.prototype.SaveNote = function () {
        var _this = this;
        if (this.isValid && this.addNoteForm.valid) {
            this.loadSave = true;
            this.notemodel.note_id = this.addNoteForm.value.note_id;
            this.notemodel.note_name = this.addNoteForm.value.noteTitle;
            this.notemodel.note_description = this.addNoteForm.value.noteDescription;
            this.notemodel.object_name = "ServiceAppointment";
            this.notemodel.object_ref_id = this.servicesappointmentid;
            this.notemodel.object_id = 1;
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
    ViewservicesappointmentComponent.prototype.getNoteslist = function () {
        var _this = this;
        this.loadSave = true;
        this.leadservice.getNoteslist(this.servicesappointmentid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            console.log('NotespagedData', _this.NotespagedData);
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
    ViewservicesappointmentComponent.prototype.closeNotesPopupModelPopup = function () {
        this.addNotesPopupModel.hide();
        this.addNoteForm.reset();
    };
    ViewservicesappointmentComponent.prototype.setNotesPageNo = function ($event) {
        this.loadSave = true;
        this.currentPageNotes = $event.page;
        this.getNoteslist();
    };
    ViewservicesappointmentComponent.prototype.setPageNotes = function ($event) {
        this.loadSave = true;
        this.currentPageNotes = $event.page;
        this.getNoteslist();
        // this.currentPageNotes = $event.page;
    };
    ViewservicesappointmentComponent.prototype.onSortNotes = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPageNotes = 1;
        //this.loadSave = true;
        this.getNoteslist();
    };
    Object.defineProperty(ViewservicesappointmentComponent.prototype, "curPageNotes", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ViewservicesappointmentComponent.prototype.EditNotes = function (row) {
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
    ViewservicesappointmentComponent.prototype.DeleteNote = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Note?";
        this.dialogService.confirm('Delete Note', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.servicesappointmentlistService.DeleteRecords(row.note_id, 'tblNotes').subscribe(function (res) {
                    _this.toaster.success("Note has been deleted successfully.");
                    _this.getNoteslist();
                });
            }
        });
    };
    ViewservicesappointmentComponent.prototype.onScrollToEnd = function (dataList) {
        this.fetchMore(dataList);
    };
    ViewservicesappointmentComponent.prototype.fetchMore = function (dataList) {
        var _this = this;
        // console.log("e", dataList);
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList.length;
        // this.len = newLength;
        //if (newLength != null) {
        //this.len + newLength;
        //this.len = this.getreturnNumber(this.len = 10, newLength);
        //}
        //this.custom_field_id = dataList[j].custom_field_id;
        //this.field_code = dataList[j].field_code;
        this.servicesappointmentlistService.GetServiceResourceDll('', this.len, this.searchText).subscribe(function (data) {
            _this.serviceResourceNames = _this.serviceResourceNames.concat(data);
        });
        //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
        //  this.scrollDataList = this.commonService.customFieldsListData;
        //  console.log('scrollDataList:', this.scrollDataList);
        //  (dataList[j].select_options as any[]) = (dataList[j].select_options as any[]).concat(this.scrollDataList);
        //})
    };
    ViewservicesappointmentComponent.prototype.getreturnNumber = function (x, y) {
        return x + y;
    };
    ;
    ViewservicesappointmentComponent.prototype.onKey = function (e, dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = e.target.value;
        //this.custom_field_id = dataList[j].custom_field_id;
        //this.field_code = dataList[j].field_code;
        //this.searchText = e.target.value;
        //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
        //  this.scrollDataList = this.commonService.customFieldsListData;
        //  console.log('scrollDataList:', this.scrollDataList);
        //  (dataList[j].select_options as any[]) = this.scrollDataList;
        //})
        // GetServiceResourceDllScrolling('') {   
        this.servicesappointmentlistService.GetServiceResourceDll('', this.len, this.searchText).subscribe(function (data) {
            _this.serviceResourceNames = data;
            //  console.log('serviceResourceNames', this.serviceResourceNames);
            //  (dataList[j].select_options as any[]) = this.serviceResourceNames;
        });
    };
    ViewservicesappointmentComponent.prototype.onClearLang = function (dataList) {
        var _this = this;
        this.len = 0;
        //this.custom_field_id = dataList[j].custom_field_id;
        //this.field_code = dataList[j].field_code;
        this.searchText = '';
        this.servicesappointmentlistService.GetServiceResourceDll('', this.len, this.searchText).subscribe(function (data) {
            _this.serviceResourceNames = data;
        });
        this.resetValidations();
        //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
        //  this.scrollDataList = this.commonService.customFieldsListData;
        //  console.log('scrollDataList:', this.scrollDataList);
        //  (dataList[j].select_options as any[]) = this.scrollDataList;
        //})
    };
    //===============================For Service Crew Searchable Dropdown =======================================
    ViewservicesappointmentComponent.prototype.onScrollToEndServiceCrew = function (dataList) {
        this.fetchMoreServiceCrew(dataList);
    };
    ViewservicesappointmentComponent.prototype.fetchMoreServiceCrew = function (dataList) {
        var _this = this;
        // console.log("e", dataList);
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList.length;
        this.servicesappointmentlistService.GetServiceCrewDll('', this.len, this.searchText).subscribe(function (data) {
            _this.serviceCrewNames = _this.serviceCrewNames.concat(data);
        });
    };
    ViewservicesappointmentComponent.prototype.onKeyServiceCrew = function (e, dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = e.target.value;
        this.servicesappointmentlistService.GetServiceCrewDll('', this.len, this.searchText).subscribe(function (data) {
            _this.serviceCrewNames = data;
        });
    };
    ViewservicesappointmentComponent.prototype.onClearLangServiceCrew = function (dataList) {
        var _this = this;
        this.len = 0;
        this.searchText = '';
        this.servicesappointmentlistService.GetServiceCrewDll('', this.len, this.searchText).subscribe(function (data) {
            _this.serviceCrewNames = data;
        });
        this.resetValidations();
    };
    //===========================================================================================================
    ViewservicesappointmentComponent.prototype.onAbsencesSort = function (e) {
    };
    ViewservicesappointmentComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    ViewservicesappointmentComponent.prototype.addItem = function (newItem) {
        this.notescount = newItem;
    };
    ViewservicesappointmentComponent.ctorParameters = function () { return [
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"] },
        { type: _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ServicesappointmentService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__["LeadlistService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addAssignedResourcesPopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewservicesappointmentComponent.prototype, "addAssignedResourcesPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('listnotesmodel', { static: false }),
        __metadata("design:type", _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_10__["NewnoteslistComponent"])
    ], ViewservicesappointmentComponent.prototype, "listnotesmodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('NotesPopupModel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], ViewservicesappointmentComponent.prototype, "addNotesPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ViewservicesappointmentComponent.prototype, "offset", void 0);
    ViewservicesappointmentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewservicesappointment',
            template: __importDefault(__webpack_require__(/*! raw-loader!./viewservicesappointment.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/servicesappointment/viewservicesappointment.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./viewservicesappointment.component.scss */ "./src/app/views/servicesappointment/viewservicesappointment.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"],
            _servicesappointment_service__WEBPACK_IMPORTED_MODULE_1__["ServicesappointmentService"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_8__["LeadlistService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"]])
    ], ViewservicesappointmentComponent);
    return ViewservicesappointmentComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-servicesappointment-servicesappointment-module.js.map