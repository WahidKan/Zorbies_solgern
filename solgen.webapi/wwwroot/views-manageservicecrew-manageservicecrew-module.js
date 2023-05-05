(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-manageservicecrew-manageservicecrew-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.html":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.html ***!
  \**********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #AddEditServiceCrew=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\" style=\"z-index:1\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">New Service Crew</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"modal-body mapping-select p-0\" style=\"max-height:600px; \">\r\n        <div class=\"clearfix\"></div>\r\n        <div class=\"panel m-0\">\r\n          <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n            <form [formGroup]=\"form\" *ngIf=\"form\">\r\n              <ng-container *ngFor=\"let item of formControlList\">\r\n                <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n                <div class=\"row  mb-2\">\r\n\r\n\r\n                  <ng-container *ngFor=\"let inner of item.InnerData\">\r\n\r\n\r\n                    <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-6 col-xl-6':\r\n                             inner.layout_type =='four' && inner.dt_code != 'textarea' }\"\r\n                         ngShow=\"inner.dependent_show_type == true\">\r\n                      <!---->\r\n                      <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO' &&  inner.edit_form_field_visibility == 'NO' \" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n                      <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n\r\n                      <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">\r\n\r\n\r\n\r\n                        <!--text  [placeholder]=\"inner.display_name\"-->\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint'\" />\r\n\r\n\r\n\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                        <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                               class=\"text-danger\">Please enter valid value</small>\r\n\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                        <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                               class=\"text-danger\">Please enter valid value</small>\r\n\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n                        <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                               class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                        <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                        <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                        <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                                    [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                        <!--Checkbox-->\r\n\r\n                        <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                          <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                            <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                              <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                              <div class=\"custom-control custom-checkbox\">\r\n\r\n                                <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                                       value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                                <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                              </div>\r\n\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n\r\n\r\n                        <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                          <div class=\"form-check form-check-inline\">\r\n                            <div class=\"custom-control custom-checkbox pl-0\">\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\"\r\n                                       id=\"{{inner.form_controlName}}\" [formControlName]=\"inner.form_controlName\">\r\n                                <span class=\"slider round\" id=\"{{inner.form_controlName}}\"><span>Yes</span></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n\r\n                        <!--Radio button-->\r\n                        <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                          <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                            <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                              <div class=\"custom-control custom-radio mx-2  p-0\">\r\n\r\n                                <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                                <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                        <ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                                   [ngClass]=\"{'disabledddl':inner.is_readOnly}\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                   [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                        </ng-select>\r\n\r\n\r\n                        <ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && !inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                                   [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                        </ng-select>\r\n                        <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                                   *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true'\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                        </ng-select>\r\n\r\n                        <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                               class=\"text-danger\">{{inner.display_name}} is required</small>\r\n\r\n                      </div>\r\n\r\n\r\n\r\n\r\n                    </div>\r\n                  </ng-container>\r\n\r\n                </div>\r\n              </ng-container>\r\n            </form>\r\n\r\n          </div>\r\n          <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success form-btns\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/manageservicecrewmemberpopup/addeditservicecrewmember.component.html":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/manageservicecrewmemberpopup/addeditservicecrewmember.component.html ***!
  \****************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #AddEditServiceCrewMember=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\" style=\"z-index:1\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">New Service Crew Member</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"modal-body mapping-select p-0\" style=\"max-height:600px;overflow:visible; \">\r\n        <div class=\"clearfix\"></div>\r\n        <div class=\"panel m-0\">\r\n          <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n            <form [formGroup]=\"form\" *ngIf=\"form\">\r\n              <ng-container *ngFor=\"let item of formControlList\">\r\n                <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n                <div class=\"row  mb-2\">\r\n                  <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n                    <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-6 col-xl-6':\r\n                             inner.layout_type =='four' }\"\r\n                         ngShow=\"inner.dependent_show_type == true\">\r\n                      <!---->\r\n                      <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO' &&  inner.edit_form_field_visibility == 'NO' \" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n                      <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n                      <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n                      <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n        <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n      </a>-->\r\n                      <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">\r\n\r\n\r\n\r\n                        <!--text  [placeholder]=\"inner.display_name\"-->\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='datetime'\" />\r\n\r\n\r\n\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                        <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                               class=\"text-danger\">Please enter valid value</small>\r\n\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                        <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                               class=\"text-danger\">Please enter valid value</small>\r\n\r\n                        <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                               [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                               [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                               *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n                        <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                               class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                        <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                        <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                        <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                        <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                                    [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" [style]=\"{ 'position': 'relative'}\" hideOnDateTimeSelect=\"true\"></p-calendar>\r\n\r\n\r\n\r\n\r\n                        <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'datetime'\" [formControlName]=\"inner.form_controlName\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                                    [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" [style]=\"{ 'position': 'relative'}\" hideOnDateTimeSelect=\"true\"></p-calendar>\r\n\r\n                        <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n  [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                        <!--end calandar-->\r\n                        <!--Checkbox-->\r\n\r\n                        <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                          <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                            <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                              <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                              <div class=\"custom-control custom-checkbox\">\r\n\r\n                                <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                                       value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                                <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                              </div>\r\n\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n\r\n                        <!--<div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n    <div class=\"form-check form-check-inline\">\r\n      <div class=\"custom-control custom-checkbox\">\r\n\r\n        <input id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\"\r\n               class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}\">{{inner.display_name}}</label>\r\n\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n\r\n                        <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                          <div class=\"form-check form-check-inline\">\r\n                            <div class=\"custom-control custom-checkbox pl-0\">\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\"\r\n                                       id=\"{{inner.form_controlName}}\" [formControlName]=\"inner.form_controlName\">\r\n                                <span class=\"slider round\" id=\"{{inner.form_controlName}}\"><span>Yes</span></span>\r\n                              </label>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n\r\n\r\n\r\n\r\n                        <!--Radio button-->\r\n                        <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                          <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                            <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                              <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                                \">\r\n                                <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                 [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n          <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n\r\n\r\n                                <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                                <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n\r\n                        </div>\r\n\r\n                        <!--Ng Dropdown-->\r\n                        <!--Dropdown\r\n  picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n  -->\r\n                        <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.dt_code=='select' }\" *ngIf=\"inner.dt_code=='select' && inner.select_options==''\">\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.id\"\r\n            *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n      {{option.value}}\r\n    </option>\r\n  </select>-->\r\n\r\n                        <ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                                   [ngClass]=\"{'disabledddl':inner.is_readOnly}\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                   [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                        </ng-select>\r\n\r\n                        <ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && !inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\"\r\n                                   placeholder=\"Select\" (clear)=\"onClearLang(item.InnerData,j)\" (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                                   [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                        </ng-select>\r\n\r\n                        <!--<ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && !inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n             [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n  </ng-select>-->\r\n\r\n                        <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                                   *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true'\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                        </ng-select>\r\n                        <div class=\"clearfix\"></div>\r\n                        <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                               class=\"text-danger\">{{inner.display_name}} is required</small>\r\n\r\n                        <!--Dropdown\r\n    picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n  -->\r\n                        <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n          (change)='onOptionsSelected($event,inner)'>\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.name\"\r\n            *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n      {{option.name}}\r\n    </option>\r\n\r\n  </select>-->\r\n                      </div>\r\n\r\n\r\n\r\n\r\n                    </div>\r\n                  </ng-container>\r\n\r\n                </div>\r\n              </ng-container>\r\n            </form>\r\n\r\n          </div>\r\n          <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success form-btns\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/resourceskill/resourceskill.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/resourceskill/resourceskill.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #resourceSkill=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; max-height:1000px; overflow:visible;\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <!--<h4>if would like Enerflo to automatically find the best apt time based on availalility.</h4>-->\r\n              <div class=\"row col-12\">\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Service Crew:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"lstResource\"\r\n                               placeholder=\"Select Service Resource\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"serviceResource\"\r\n                               [closeOnSelect]=\"true\"\r\n                               [ngClass]=\"{'is-invalid': (serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required\"\r\n                           style=\"color:red;\">Please select Service Resource</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Skill:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearAppointment [items]=\"lstResourceSkill\"\r\n                               placeholder=\"Select skill\" bindValue=\"value\" bindLabel=\"text\"\r\n                               formControlName=\"skill\"\r\n                               [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (skill.invalid && (skill.dirty || skill.touched) && skill.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"skill.invalid && (skill.dirty || skill.touched) && skill.errors?.required\"\r\n                           style=\"color:red;\">Please select skill</small>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Skill Level:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Please enter Skill Level\" formControlName=\"skillLevel\">\r\n                    <small *ngIf=\"skillLevel.invalid && (skillLevel.dirty || skillLevel.touched) && skillLevel.errors?.pattern\"\r\n                           class=\"text-danger\">Please enter valid Skill Level.</small>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Start Date:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group datepickerinpop\">\r\n                    <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\"\r\n                                inputStyleClass=\"form-control start-date \" [maxDate]=\"endDate.value\" formControlName=\"startDate\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                                [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                                [ngClass]=\"{'is-invalid': (startDate?.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required) }\"></p-calendar>\r\n\r\n                  </div>\r\n                  <small *ngIf=\"startDate?.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required\"\r\n                         style=\"color:red;\">Please select Start Date</small>\r\n                </div>\r\n\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>End Date:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group datepickerinpop\">\r\n                    <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" formControlName=\"endDate\"\r\n                                inputStyleClass=\"form-control start-date\" [minDate]=\"startDate.value\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                                [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/servicecrewlist.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/servicecrewlist.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\">\r\n    <strong>Manage Service Crews</strong>\r\n    <p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p>\r\n  </h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Service Crews</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-5 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n               <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n                <div class=\"d-inline-block align-middle pl-2\">\r\n                  <label class=\"d-inline-block \"><b>Search in all records</b></label>\r\n                  <div class=\"form-group d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <input type=\"checkbox\" id=\"allRecords\" formControlName=\"allRecords\" [checked]=\"myCheckbox\" (click)=\"switchClicked($event)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-7\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0\">\r\n                <ng-select [items]=\"pagedDataView.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i> </span></a>\r\n              <a *ngIf='isAdd' class=\"btn btn-success text-white form-btns  mr-1\" (click)=\"ShowAddEditModal('')\" tooltip=\"Add Service Crew\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rowHeight]=\"40\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [scrollbarH]=\"true\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'Name'\">\r\n                <a class=\"view-list\" [routerLink]=\"['/servicecrew/view',row.id]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'Name'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE=='date'\">\r\n                  {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldType != 'select' && col.DATA_TYPE != 'date'\">\r\n                  {{row[col.COLUMN_NAME]}}\r\n                </div>\r\n                <div *ngIf=\"col.FieldType == 'select' \">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                    <a href=\"javascript:void(0);\" (click)=\"ShowMembersListPopup(row)\">{{row[col.COLUMN_NAME] }}</a>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"100\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.id\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.id}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <a class=\"actions-onclick view-list\" [routerLink]=\"['/servicecrew/view',row.id]\" href=\"javascript:void(0);\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>\r\n                    <a *ngIf='isUpdate' class=\"actions-onclick view-list\" (click)=\"ShowAddEditModal(row.id)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSizeValue) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"serviceappointment\" subModuleName=\"servicecrew\"></app-searchfilteradd>\r\n<app-manageview (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"serviceappointment\" subModuleName=\"servicecrew\"></app-manageview>\r\n<app-addeditservicecrewpopup #AddEditServiceCrew (manageServiceCrewEmitter)=\"refreshList()\"></app-addeditservicecrewpopup>\r\n\r\n<app-service-crew-members-popup #ServiceCrewMembersList></app-service-crew-members-popup>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/viewservicecrew.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/viewservicecrew.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Service Crew Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/servicecrew\">Manage Service Crews</a></li>\r\n      <li class=\"active\">Service Crew Details </li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-users bg-info text-white float-left p-1 mr-2\"></i>\r\n    <span class=\"float-left w-85-res\" style=\"font-size:18px;\"><span>Service Crew</span> {{ServiceCrewName}}</span>\r\n    <span class=\"cntnt-right-btn mr15 btn-iconres\">\r\n      <a href=\"javascript:void(0);\" (click)=\"showEditServiceCrewPopup();\" class=\"btn btn-success text-white mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n\r\n  <div class=\"col-12 float-left d-md-flex p-0 py-resp py-2 py-sm-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n      <div class=\"col py-2\">\r\n        <span *ngIf=\"item.field_route==null\" class=\"d-block\"><strong>{{ item.display_name}}:</strong> {{ item.value}}</span>\r\n        <span *ngIf=\"item.field_route!=null\" class=\"d-block\"><strong>{{ item.display_name}}:</strong> <a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\">{{ item.value}}</a></span>\r\n        <!--<span class=\"d-block\"><strong>{{ item.display_name}}:</strong> {{ item.value}}</span>-->\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mt-3 mb-4 border-0\" style=\"background:none\">\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col-sm-12 col-lg-8\">\r\n            <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                <ng-container *ngFor=\"let item of formControlList\">\r\n                  <div class=\"panel active\">\r\n                    <div class=\"panel-heading\">\r\n                      <h4 class=\"panel-title\">\r\n                        <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                          <span> {{item.group_name}}</span>\r\n                        </a>\r\n                      </h4>\r\n                    </div>\r\n                    <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                      <div class=\"panel-body row px-0 mt-0\">\r\n                        <div [ngClass]=\"{'col-6 px-0':item.group_name=='System Information','col-12':item.group_name!='System Information'}\" *ngFor=\"let inner of item.InnerData;\">\r\n                          <div class=\"input-group border-bottom\">\r\n                            <div [ngClass]=\"{'col-sm-12 col-md-4 px-0':item.group_name=='System Information','col-sm-12 col-md-2 px-0':item.group_name!='System Information'}\">\r\n                              <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                            </div>\r\n                            <div [ngClass]=\"{'col-sm-12 col-md-8 px-0':item.group_name=='System Information','col-sm-12 col-md-10 px-0':item.group_name!='System Information'}\">\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null\" class=\"py-2 d-block\">{{ inner.value}}</span>\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null\" class=\"py-2 d-block\">\r\n                                <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                              </span>\r\n                              <!--<span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.name=='Resources'\" class=\"py-2 d-block\">{{ Resources }}</span>-->\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch  mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ng-container>\r\n              </form>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-12 col-lg-4 relatedtab\">\r\n            <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n            <div id=\"accordion\" class=\"panel-group\">\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#serviceCrewMember\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\"><span>Service Crew Members ({{ServiceCrewMembersCount}})</span></a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"serviceCrewMember\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <a *ngIf=\"isAdd\" href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"ShowManageCrewMemberPopup('')\" data-dismiss=\"modal\" data-toggle=\"modal\" style=\"top:8px;\"><i class=\"fa fa-plus mr-2\"></i> Add New</a>\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstServiceCrewMembers.data\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstServiceCrewMembers.pager.totalItems\"\r\n                                     [offset]=\"lstServiceCrewMembers.pager.currentPage\"\r\n                                     [limit]=\"lstServiceCrewMembers.pager.pageSize\"\r\n                                     (page)='setServiceCrewMemberPageNo($event)'\r\n                                     (sort)=\"onServiceCrewMembersSort($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Name\" prop=\"Name\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Service Resource\" prop=\"ServiceResource\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Start Date\" prop=\"StartDate\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <span *ngIf=\"!row.StartDate\">-</span>\r\n                            <span *ngIf=\"row.StartDate\" title=\"{{row.StartDate | DateTimeToLocal}}\">{{row.StartDate | DateTimeToLocal}}</span>\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"End Date\" prop=\"EndDate\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <span *ngIf=\"!row.EndDate\">-</span>\r\n                            <span *ngIf=\"row.EndDate\" title=\"{{row.EndDate | DateTimeToLocal}}\">{{row.EndDate | DateTimeToLocal}}</span>\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n\r\n                        <!--<ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n        <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n          <div class=\"text-center\">\r\n            <a href=\"javascript:void(0);\" class=\"actions-onclick view-list\" (click)=\"ShowManageCrewMemberPopup(row.id)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n            <a href=\"javascript:void(0);\" (click)=\"deleteCrew(row.id,'Crew')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n          </div>\r\n        </ng-template>\r\n      </ngx-datatable-column>-->\r\n                        <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div class=\"text-center\">\r\n                              <a href=\"javascript:void(0);\" (click)=\"ShowManageCrewMemberPopup(row.id)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"deleteCrew(row.id,'Crew')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                            </div>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-footer *ngIf=\"lstServiceCrewMembers.pager.totalItems>0\">\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstServiceCrewMembers.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstServiceCrewMembers.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n\r\n\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                  <!--Showing {{(lstServiceCrewMembers.pager.currentPage - 1 )* lstServiceCrewMembers.pager.pageSize + 1}}  to {{lstServiceCrewMembers.pager.currentPage * lstServiceCrewMembers.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                  {{commanService.PageString(lstServiceCrewMembers.pager.currentPage,lstServiceCrewMembers.pager.pageSize,rowCount)}}\r\n\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"lstServiceCrewMembers.pager.currentPage\"\r\n                                             [size]=\"lstServiceCrewMembers.pager.pageSize\"\r\n                                             [count]=\"lstServiceCrewMembers.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstServiceCrewMembers.pager.pageSize) > 1)\"\r\n                                             (change)=\"setServiceCrewMemberPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                   \r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#proposals\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Skills    ({{SkillsCount}})</span>\r\n                    </a>\r\n\r\n                  </h4>\r\n                </div>\r\n                <div id=\"proposals\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"openSkillPopup()\"><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Add</span></a>\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstSkill.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstSkill.pager.totalItems\"\r\n                                     [offset]=\"lstSkill.pager.currentPage\"\r\n                                     [limit]=\"lstSkill.pager.pageSize\"\r\n                                     (page)='setSkillPageNo($event)'\r\n                                     (sort)=\"onSkillSort($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Service Name\" prop=\"ServiceResourceName\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.ServiceResourceName}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column name=\"Skill Name\" prop=\"skilName\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.skilName}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column name=\"Skill Number\" prop=\"SkillNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Skill Level\" prop=\"SkillLevel\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column name=\"Start Date\" prop=\"startDate\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.startDate | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"End Date\" prop=\"endDate\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.endDate | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div class=\"text-center\">\r\n                              <a href=\"javascript:void(0);\" (click)=\"EditSkill(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"deleteSkill(row,'serviceSkill')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                            </div>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstSkill.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstSkill.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                {{commanService.PageString(SkillPageNo,lstSkill.pager.pageSize,rowCount)}}\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [page]=\"SkillPageNo\"\r\n                                             [size]=\"lstSkill.pager.pageSize\"\r\n                                             [count]=\"lstSkill.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstSkill.pager.pageSize) > 1)\"\r\n                                             (change)=\"setSkillPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    \r\n                  </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <app-files title=\"Files\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{Id}}\"></app-files>\r\n             \r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n          <app-resourceskill #resourceSkill (resourceSkillEvent)=\"resourceSkillEvent()\"></app-resourceskill>\r\n          <app-addeditservicecrewmember #AddEditServiceCrewMember (ServiceCrewMemberEmitter)=\"refreshServiceCrewMembersList()\"></app-addeditservicecrewmember>\r\n          <app-addeditservicecrewpopup #AddEditServiceCrew (manageServiceCrewEmitter)=\"refreshList()\"></app-addeditservicecrewpopup>\r\n");

/***/ }),

/***/ "./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.scss":
/*!********************************************************************************************************!*\
  !*** ./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.scss ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZXNlcnZpY2VjcmV3L2FkZGVkaXRzZXJ2aWNlY3Jld3BvcHVwL2FkZGVkaXRzZXJ2aWNlY3Jld3BvcHVwLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: AddeditservicecrewpopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditservicecrewpopupComponent", function() { return AddeditservicecrewpopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../manageservicecrew.service */ "./src/app/views/manageservicecrew/manageservicecrew.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _location_locationlist_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../location/locationlist.service */ "./src/app/views/location/locationlist.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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









var AddeditservicecrewpopupComponent = /** @class */ (function () {
    function AddeditservicecrewpopupComponent(fb, crewService, router, toaster, route, commonService) {
        var _this = this;
        this.fb = fb;
        this.crewService = crewService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.manageServiceCrewEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loadSave = false;
        this.moduleName = 'serviceappointment';
        this.inEditMode = false;
        this.submoduleName = 'servicecrew';
        this.formControlList = [];
        this.UsersList = [];
        this.checkboxdata1 = [];
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.JsonData = new _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_2__["serviceCrewJsonData"]();
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
            _this.userName = userdetail.firstName + ' ' + userdetail.lastName;
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
    }
    ;
    AddeditservicecrewpopupComponent.prototype.ngOnInit = function () {
        this.crewId = '';
    };
    AddeditservicecrewpopupComponent.prototype.refresh = function () {
        var _this = this;
        this.loadSave = true;
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.crewId, this.displayType).subscribe(function (resp) {
            if (resp) {
                _this.customCompnentValues = resp.data;
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _location_locationlist_service__WEBPACK_IMPORTED_MODULE_4__["CheckboxData"]();
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
                    if (_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["id"]) {
                        if (cnt.name == 'CreatedById' || cnt.name == 'LastModifiedById') {
                            val = cnt.value.toLowerCase();
                            cnt.is_readOnly = true;
                        }
                    }
                    if (cnt.name == 'OwnerId' && _this.displayType == 'ADD') {
                        cnt.select_options.push({ name: _this.userName, value: _this.userId });
                        val = _this.userId;
                        cnt.is_readOnly = true;
                    }
                    if (cnt.name == 'OwnerId' && _this.displayType == 'EDIT') {
                        cnt.select_options.forEach(function (itemList) {
                            debugger;
                            if (itemList.value.toUpperCase() == cnt.value.toUpperCase()) {
                                val = itemList.value;
                            }
                        });
                        cnt.is_readOnly = true;
                    }
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator
                    ]);
                });
                console.log("group", group_1);
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"](group_1);
                _this.loadSave = false;
            }
            else {
                _this.loadSave = false;
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    AddeditservicecrewpopupComponent.prototype.show = function (crewId) {
        if (crewId) {
            this.crewId = crewId;
            this.displayType = 'EDIT';
            this.addOrUpdatePermission = this.isUpdate;
        }
        else {
            this.crewId = '';
            this.displayType = 'ADD';
            this.addOrUpdatePermission = this.isAdd;
        }
        this.AddEditModal.show();
        this.refresh();
    };
    AddeditservicecrewpopupComponent.prototype.close = function () {
        this.AddEditModal.hide();
    };
    AddeditservicecrewpopupComponent.prototype.onSubmit = function () {
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
            this.JsonData.crewId = this.crewId;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            this.JsonData.companyId = this.companyId;
            this.JsonData.userId = this.userId;
            this.JsonData.FormJsonData = JSON.stringify(this.form.value);
            this.crewService.addOrUpdateServiceCrew(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
                    setTimeout(function () {
                        _this.toaster.success(result.responseMessage);
                        _this.loadSave = false;
                        _this.manageServiceCrewEmitter.emit();
                        _this.close();
                    }, 500);
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
    AddeditservicecrewpopupComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_2__["ManageservicecrewService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AddeditservicecrewpopupComponent.prototype, "manageServiceCrewEmitter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('AddEditServiceCrew', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], AddeditservicecrewpopupComponent.prototype, "AddEditModal", void 0);
    AddeditservicecrewpopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditservicecrewpopup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditservicecrewpopup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditservicecrewpopup.component.scss */ "./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_2__["ManageservicecrewService"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], AddeditservicecrewpopupComponent);
    return AddeditservicecrewpopupComponent;
}());



/***/ }),

/***/ "./src/app/views/manageservicecrew/manageservicecrew-routing.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/views/manageservicecrew/manageservicecrew-routing.module.ts ***!
  \*****************************************************************************/
/*! exports provided: ManageservicecrewRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageservicecrewRoutingModule", function() { return ManageservicecrewRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _servicecrewlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./servicecrewlist.component */ "./src/app/views/manageservicecrew/servicecrewlist.component.ts");
/* harmony import */ var _viewservicecrew_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./viewservicecrew.component */ "./src/app/views/manageservicecrew/viewservicecrew.component.ts");
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
    { path: '', component: _servicecrewlist_component__WEBPACK_IMPORTED_MODULE_2__["ServicecrewlistComponent"] },
    { path: 'view/:id', component: _viewservicecrew_component__WEBPACK_IMPORTED_MODULE_3__["ViewservicecrewComponent"] },
];
var ManageservicecrewRoutingModule = /** @class */ (function () {
    function ManageservicecrewRoutingModule() {
    }
    ManageservicecrewRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ManageservicecrewRoutingModule);
    return ManageservicecrewRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/manageservicecrew/manageservicecrew.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/manageservicecrew/manageservicecrew.module.ts ***!
  \*********************************************************************/
/*! exports provided: ManageservicecrewModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageservicecrewModule", function() { return ManageservicecrewModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _addeditservicecrewpopup_addeditservicecrewpopup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addeditservicecrewpopup/addeditservicecrewpopup.component */ "./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.ts");
/* harmony import */ var _servicecrewlist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./servicecrewlist.component */ "./src/app/views/manageservicecrew/servicecrewlist.component.ts");
/* harmony import */ var _manageservicecrew_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./manageservicecrew-routing.module */ "./src/app/views/manageservicecrew/manageservicecrew-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-password-toggle */ "./node_modules/ngx-password-toggle/ngx-password-toggle.umd.js");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ngx_password_toggle__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _viewservicecrew_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./viewservicecrew.component */ "./src/app/views/manageservicecrew/viewservicecrew.component.ts");
/* harmony import */ var _manageservicecrewmemberpopup_addeditservicecrewmember_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./manageservicecrewmemberpopup/addeditservicecrewmember.component */ "./src/app/views/manageservicecrew/manageservicecrewmemberpopup/addeditservicecrewmember.component.ts");
/* harmony import */ var _resourceskill_resourceskill_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./resourceskill/resourceskill.component */ "./src/app/views/manageservicecrew/resourceskill/resourceskill.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};












//import { ServiceCrewMembersPopupComponent } from './service-crew-members-popup/service-crew-members-popup.component';

var ManageservicecrewModule = /** @class */ (function () {
    function ManageservicecrewModule() {
    }
    ManageservicecrewModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_addeditservicecrewpopup_addeditservicecrewpopup_component__WEBPACK_IMPORTED_MODULE_2__["AddeditservicecrewpopupComponent"], _servicecrewlist_component__WEBPACK_IMPORTED_MODULE_3__["ServicecrewlistComponent"], _viewservicecrew_component__WEBPACK_IMPORTED_MODULE_10__["ViewservicecrewComponent"], _resourceskill_resourceskill_component__WEBPACK_IMPORTED_MODULE_12__["ResourceskillComponent"], _manageservicecrewmemberpopup_addeditservicecrewmember_component__WEBPACK_IMPORTED_MODULE_11__["AddeditservicecrewmemberComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _manageservicecrew_routing_module__WEBPACK_IMPORTED_MODULE_4__["ManageservicecrewRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"], ngx_password_toggle__WEBPACK_IMPORTED_MODULE_8__["NgxPasswordToggleModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__["ModalModule"]
            ],
        })
    ], ManageservicecrewModule);
    return ManageservicecrewModule;
}());



/***/ }),

/***/ "./src/app/views/manageservicecrew/manageservicecrewmemberpopup/addeditservicecrewmember.component.scss":
/*!**************************************************************************************************************!*\
  !*** ./src/app/views/manageservicecrew/manageservicecrewmemberpopup/addeditservicecrewmember.component.scss ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".disabledddl {\n  opacity: 0.7;\n  pointer-events: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbWFuYWdlc2VydmljZWNyZXcvbWFuYWdlc2VydmljZWNyZXdtZW1iZXJwb3B1cC9EOlxcUHJpbmNlIFNpbmdoXFx3b3Jrc3BhY2VcXFNvbGdlbk9uZVxcTGFob3JlMVxcU29sZ2VuXFxzb2xnZW4ucG9ydGFsXFxDbGllbnRBcHAvc3JjXFxhcHBcXHZpZXdzXFxtYW5hZ2VzZXJ2aWNlY3Jld1xcbWFuYWdlc2VydmljZWNyZXdtZW1iZXJwb3B1cFxcYWRkZWRpdHNlcnZpY2VjcmV3bWVtYmVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLG9CQUFvQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvdmlld3MvbWFuYWdlc2VydmljZWNyZXcvbWFuYWdlc2VydmljZWNyZXdtZW1iZXJwb3B1cC9hZGRlZGl0c2VydmljZWNyZXdtZW1iZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGlzYWJsZWRkZGwge1xyXG4gIG9wYWNpdHk6IDAuNztcclxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "./src/app/views/manageservicecrew/manageservicecrewmemberpopup/addeditservicecrewmember.component.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/views/manageservicecrew/manageservicecrewmemberpopup/addeditservicecrewmember.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: AddeditservicecrewmemberComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditservicecrewmemberComponent", function() { return AddeditservicecrewmemberComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _queue_queueservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../queue/queueservice.service */ "./src/app/views/queue/queueservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../manageservicecrew.service */ "./src/app/views/manageservicecrew/manageservicecrew.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
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










var AddeditservicecrewmemberComponent = /** @class */ (function () {
    function AddeditservicecrewmemberComponent(fb, crewService, router, toaster, route, commonService, datetime) {
        var _this = this;
        this.fb = fb;
        this.crewService = crewService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.datetime = datetime;
        this.ServiceCrewMemberEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loadSave = false;
        this.moduleName = 'serviceappointment';
        this.inEditMode = false;
        this.submoduleName = 'servicecrewmember';
        this.formControlList = [];
        this.UsersList = [];
        this.checkboxdata1 = [];
        this.crewMemberId = '';
        this.JsonData = new _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_4__["serviceCrewMemberJsonData"]();
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.len = 10;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
            _this.userName = userdetail.firstName + ' ' + userdetail.lastName;
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
    }
    ;
    AddeditservicecrewmemberComponent.prototype.ngOnInit = function () {
        this.crewId = '';
    };
    AddeditservicecrewmemberComponent.prototype.refresh = function () {
        var _this = this;
        this.loadSave = true;
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.crewMemberId, this.displayType).subscribe(function (resp) {
            if (resp) {
                _this.customCompnentValues = resp.data;
                _this.formControlList = [];
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _queue_queueservice_service__WEBPACK_IMPORTED_MODULE_2__["CheckboxData"]();
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
                var convertdatetime_1 = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_9__["DateTimeToLocalForAddEditPipe"]();
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
                    if (cnt.name == 'ServiceCrewId' && _this.displayType == 'ADD') {
                        cnt.select_options.push({ name: _this.crewName, value: _this.crewId });
                        val = _this.crewId;
                        cnt.is_readOnly = true;
                    }
                    if (cnt.name == 'ServiceCrewId' && _this.displayType == 'EDIT') {
                        cnt.is_readOnly = true;
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
            else {
                _this.loadSave = false;
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    AddeditservicecrewmemberComponent.prototype.convertUTCDateToLocalDate = function (date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;
    };
    AddeditservicecrewmemberComponent.prototype.show = function (crewId, crewName, crewMemberId) {
        debugger;
        this.crewId = crewId;
        this.crewName = crewName;
        if (crewMemberId) {
            this.crewMemberId = crewMemberId;
            this.displayType = 'EDIT';
            this.addOrUpdatePermission = this.isUpdate;
        }
        else {
            this.crewMemberId = '';
            this.displayType = 'ADD';
            this.addOrUpdatePermission = this.isAdd;
        }
        this.timeFormat = this.commonService.getTimeFormat();
        this.refresh();
        this.AddEditModal.show();
    };
    AddeditservicecrewmemberComponent.prototype.close = function () {
        this.AddEditModal.hide();
        this.ServiceCrewMemberEmitter.emit();
    };
    AddeditservicecrewmemberComponent.prototype.onSubmit = function () {
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
            //debugger;
            this.loadSave = true;
            this.JsonData.crewMemberId = this.crewMemberId;
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
            this.crewService.addOrUpdateServiceCrewMember(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
                    setTimeout(function () {
                        _this.toaster.success(result.responseMessage);
                        _this.loadSave = false;
                        _this.close();
                    }, 1000);
                }
                else if (result.statusCode == 220) {
                    var json = JSON.parse(result.responseMessage);
                    var _datetime = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_9__["DateTimeToLocalPipe"];
                    if (json) {
                        var _data = json["data"][0];
                        var start = _datetime.transform(_data.StartDate, null);
                        var End = _datetime.transform(_data.EndDate, null);
                        _this.toaster.error('This service resource already assigned in  "' + _data.Name + '" Crew from "' + start + '" to "' + End + '. Please select another resource or different timeslot.');
                    }
                    _this.loadSave = false;
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
    AddeditservicecrewmemberComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    AddeditservicecrewmemberComponent.prototype.fetchMore = function (dataList, j) {
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
    AddeditservicecrewmemberComponent.prototype.onKey = function (e, dataList, j) {
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
    AddeditservicecrewmemberComponent.prototype.onClearLang = function (dataList, j) {
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
    AddeditservicecrewmemberComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_4__["ManageservicecrewService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AddeditservicecrewmemberComponent.prototype, "ServiceCrewMemberEmitter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('AddEditServiceCrewMember', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], AddeditservicecrewmemberComponent.prototype, "AddEditModal", void 0);
    AddeditservicecrewmemberComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditservicecrewmember',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditservicecrewmember.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/manageservicecrewmemberpopup/addeditservicecrewmember.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditservicecrewmember.component.scss */ "./src/app/views/manageservicecrew/manageservicecrewmemberpopup/addeditservicecrewmember.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_4__["ManageservicecrewService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"]])
    ], AddeditservicecrewmemberComponent);
    return AddeditservicecrewmemberComponent;
}());



/***/ }),

/***/ "./src/app/views/manageservicecrew/resourceskill/resourceskill.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/views/manageservicecrew/resourceskill/resourceskill.component.scss ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZXNlcnZpY2VjcmV3L3Jlc291cmNlc2tpbGwvcmVzb3VyY2Vza2lsbC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/manageservicecrew/resourceskill/resourceskill.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/views/manageservicecrew/resourceskill/resourceskill.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ResourceskillComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceskillComponent", function() { return ResourceskillComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _serviceresource_serviceresourse_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../serviceresource/serviceresourse.service */ "./src/app/views/serviceresource/serviceresourse.service.ts");
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




//import { ServiceresourseService, Skillmodel } from '../serviceresourse.service';



var ResourceskillComponent = /** @class */ (function () {
    function ResourceskillComponent(fb, commonService, serviceresourseService, router, toaster, route) {
        this.fb = fb;
        this.commonService = commonService;
        this.serviceresourseService = serviceresourseService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.resourceSkillEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.active = false;
        this.isDateChanged = true;
        this.appmodel = new _serviceresource_serviceresourse_service__WEBPACK_IMPORTED_MODULE_6__["Skillmodel"]();
        this.fTime = new Date(0);
        this.Tdate = new Date(0);
        this.minimumDate = new Date();
        this.isEdit = false;
        this.loadSave = false;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    ResourceskillComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.getResourceSkill();
        this.getServiceResource('');
        var today = new Date();
        //let month = today.getMonth();
        //let year = today.getFullYear();
        //let prevMonth = (month === 0) ? 11 : month - 1;
        //let nextMonth = (month === 11) ? 0 : month + 4;
        this.minDate = today;
        this.maxDate = this.minDate;
        //this.minDate.setMonth(prevMonth);
        //this.maxDate.setMonth(nextMonth);
    };
    ResourceskillComponent.prototype.getServiceResource = function (id) {
        var _this = this;
        this.commonService.getMasterSubModuleList(id, 'ServiceCrewddl').subscribe(function (result) {
            _this.lstResource = _this.commonService.masters;
            console.log("Resource", _this.lstResource);
        });
    };
    ResourceskillComponent.prototype.getResourceSkill = function () {
        var _this = this;
        this.commonService.getMasterItemsList('ResourceSkill').subscribe(function (result) {
            _this.lstResourceSkill = _this.commonService.masters;
            console.log("this.lstResourceSkill", _this.lstResourceSkill);
        });
    };
    ResourceskillComponent.prototype.show = function (id) {
        debugger;
        this.timeFormat = this.commonService.getTimeFormat();
        this.interResourceId = id;
        debugger;
        this.getResourceSkill();
        this.getServiceResource(id);
        this.title = "New Service Resource Skill";
        this.appId = null;
        //this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        this.active = true;
        this.isEdit = false;
        //this.initForm();
        this.serviceResource.setValue(id);
        //this.serviceResource.disable();
        this.addForm.get('serviceResource').disable();
        var today = new Date();
        this.minDate = today;
        this.maxDate = this.minDate;
        this.modalresourceSkill.show();
    };
    ResourceskillComponent.prototype.EditSkill = function (row) {
        console.log("row", row);
        this.startDateModel = row.startDate;
        var SDate = new Date(row.startDate + 'Z');
        //const EDate: Date = new Date(row.endDate + 'Z');
        var EDate = (row.endDate == null ? null : new Date(row.endDate + 'Z'));
        this.interResourceId = row.serviceResource;
        this.title = "Edit Service Resource Skill";
        this.isDateChanged = false;
        this.isEdit = true;
        this.getServiceResource(row.serviceResource);
        this.addForm.patchValue({
            skillId: row.Id,
            serviceResource: row.serviceResource.toString(),
            skill: row.skill.toString(),
            skillLevel: row.SkillLevel,
            startDate: SDate,
            //startTime: '',
            endDate: EDate,
        });
        this.addForm.get('serviceResource').disable();
        this.modalresourceSkill.show();
    };
    ResourceskillComponent.prototype.close = function () {
        this.active = false;
        var today = new Date();
        this.minDate = today;
        this.maxDate = this.minDate;
        this.addForm.reset();
        this.modalresourceSkill.hide();
    };
    ResourceskillComponent.prototype.OnChanged = function (e) {
        this.isDateChanged = true;
    };
    //changeToValue(evt) {
    //  this.minFromTime = new Date();
    //  this.minToTime = evt;
    //  this.todate = evt;
    //  this.maxToTime = new Date();
    //  this.maxToTime.setHours(23);
    //  this.maxToTime.setMinutes(59);
    //}
    ResourceskillComponent.prototype.initForm = function () {
        this.addForm = this.fb.group({
            skillId: [null],
            serviceResource: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            skill: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            skillLevel: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            startDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            startTime: [null],
            endDate: [null],
            endTime: [null],
        });
    };
    Object.defineProperty(ResourceskillComponent.prototype, "skillId", {
        get: function () { return this.addForm.get('skillId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceskillComponent.prototype, "serviceResource", {
        get: function () { return this.addForm.get('serviceResource'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceskillComponent.prototype, "skill", {
        get: function () { return this.addForm.get('skill'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceskillComponent.prototype, "skillLevel", {
        get: function () { return this.addForm.get('skillLevel'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceskillComponent.prototype, "startDate", {
        get: function () { return this.addForm.get('startDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceskillComponent.prototype, "startTime", {
        get: function () { return this.addForm.get('startToTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceskillComponent.prototype, "appointmentWith", {
        get: function () { return this.addForm.get('appointmentWith'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceskillComponent.prototype, "endDate", {
        get: function () { return this.addForm.get('endDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceskillComponent.prototype, "endTime", {
        get: function () { return this.addForm.get('endToTime'); },
        enumerable: true,
        configurable: true
    });
    ResourceskillComponent.prototype.Save = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.appmodel.skillId = this.addForm.value.skillId;
            this.appmodel.serviceResource = this.interResourceId;
            this.appmodel.skill = this.addForm.value.skill;
            this.appmodel.skillLevel = this.addForm.value.skillLevel;
            // let dtdate = new Date(this.addForm.value.startDate);
            this.appmodel.startDate = this.addForm.value.startDate;
            //let enddate = new datetime(this.addForm.value.endDate);
            this.appmodel.endDate = this.addForm.value.endDate;
            this.appmodel.startTime = '';
            this.appmodel.endTime = '';
            this.serviceresourseService.addeditServiceCrewSKill(this.appmodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    //this.router.navigate(["/calendar"]);
                    _this.addForm.reset();
                    _this.modalresourceSkill.hide();
                    _this.resourceSkillEvent.emit();
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
    ResourceskillComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _serviceresource_serviceresourse_service__WEBPACK_IMPORTED_MODULE_6__["ServiceresourseService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resourceSkill', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], ResourceskillComponent.prototype, "modalresourceSkill", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ResourceskillComponent.prototype, "resourceSkillEvent", void 0);
    ResourceskillComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-resourceskill',
            template: __importDefault(__webpack_require__(/*! raw-loader!./resourceskill.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/resourceskill/resourceskill.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./resourceskill.component.scss */ "./src/app/views/manageservicecrew/resourceskill/resourceskill.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _serviceresource_serviceresourse_service__WEBPACK_IMPORTED_MODULE_6__["ServiceresourseService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], ResourceskillComponent);
    return ResourceskillComponent;
}());



/***/ }),

/***/ "./src/app/views/manageservicecrew/servicecrewlist.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/views/manageservicecrew/servicecrewlist.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZXNlcnZpY2VjcmV3L3NlcnZpY2VjcmV3bGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/manageservicecrew/servicecrewlist.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/views/manageservicecrew/servicecrewlist.component.ts ***!
  \**********************************************************************/
/*! exports provided: ServicecrewlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicecrewlistComponent", function() { return ServicecrewlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./manageservicecrew.service */ "./src/app/views/manageservicecrew/manageservicecrew.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _addeditservicecrewpopup_addeditservicecrewpopup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addeditservicecrewpopup/addeditservicecrewpopup.component */ "./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.ts");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
/* harmony import */ var _service_crew_members_popup_service_crew_members_popup_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./service-crew-members-popup/service-crew-members-popup.component */ "./src/app/views/manageservicecrew/service-crew-members-popup/service-crew-members-popup.component.ts");
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











var ServicecrewlistComponent = /** @class */ (function () {
    function ServicecrewlistComponent(servicecrewService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.servicecrewService = servicecrewService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.moduleName = 'ServiceAppointment';
        this.submoduleName = 'ServiceCrew';
        this.tableName = 'tblServiceCrew';
        //modulePermission: ModuleList;
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["SelectionType"];
        this.selected = [];
        this.pagedData = {
            pager: {},
            data: []
        };
        this.pagedDataView = {
            pager: {},
            data: []
        };
        this.loadSave = false;
        this.currentPage = 1;
        this.listFiltertext = '';
        this.vewId = '';
        this.searchUserType = '';
        this.sortDir = 'desc';
        this.listFilter = '';
        this.searchTxt = '';
        this.sortColumn = 'id';
        this.searchFilter = '';
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.myCheckbox = false;
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWDELETE'; });
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
    }
    ServicecrewlistComponent.prototype.ngOnInit = function () {
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.getPageSizes();
        this.LoadViewData();
        this.LoadViewData();
        this.currentPage = 1;
        this.refresh();
    };
    Object.defineProperty(ServicecrewlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ServicecrewlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ServicecrewlistComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loadSave = true;
        this.servicecrewService.GetServiceCrewList(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId, this.myCheckbox)
            .subscribe(function (response) {
            _this.pagedData = response;
            console.log("reponse", _this.pagedData);
            _this.columndata = _this.pagedData.data;
            _this.columnheading = _this.pagedData.schema;
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
    ServicecrewlistComponent.prototype.onChange = function ($event) {
        this.refresh();
    };
    ServicecrewlistComponent.prototype.setPage = function ($event) {
        this.loadSave = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    ServicecrewlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    ServicecrewlistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    ServicecrewlistComponent.prototype.reset = function () {
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.myCheckbox = false;
        this.refresh();
    };
    ServicecrewlistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "Name like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    ServicecrewlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    ServicecrewlistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    ServicecrewlistComponent.prototype.ShowAddEditModal = function (crewId) {
        var _crewId = crewId;
        this.AddEditModal.show(_crewId);
    };
    ServicecrewlistComponent.prototype.refreshList = function () {
        this.custom_view_id = '';
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.refresh();
    };
    ServicecrewlistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Service Crew(s)\"";
            this.dialogService.confirm('Delete Service Crew(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.loadSave = true;
                    _this.servicecrewService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
                        _this.toaster.success("Record(s) has been deleted successfully");
                        _this.deleteId = "";
                        _this.selected = [];
                        _this.refresh();
                        _this.loadSave = false;
                    }, function (error) {
                        _this.loadSave = false;
                    });
                }
            });
        }
        else {
            this.toaster.error("Please select at least one row.");
        }
    };
    ServicecrewlistComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Service Crew \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete Service Crew', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loadSave = true;
                _this.servicecrewService.DeleteRecords(row.id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Service Crew \"" + row.Name + "\" has been deleted successfully");
                    _this.refresh();
                    _this.loadSave = false;
                }, function (error) {
                    _this.loadSave = false;
                });
            }
        });
    };
    ServicecrewlistComponent.prototype.onSelect = function (_a) {
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
    ServicecrewlistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    ServicecrewlistComponent.prototype.GetcustomViewid = function (event) {
        var _this = this;
        if (event == 'undefined' || typeof event == 'undefined') {
            this.LoadViewData();
        }
        this.pagedDataView.data.forEach(function (cnt) {
            if (cnt.custom_view_id == event) {
                _this.ViewModel = cnt.view_name;
            }
        });
        this.vewId = event;
        this.custom_view_id = event;
        this.refresh();
    };
    ServicecrewlistComponent.prototype.ShowMembersListPopup = function ($event) {
        this.ServiceCrewMembersPopup.show($event);
    };
    ServicecrewlistComponent.prototype.LoadViewData = function () {
        var _this = this;
        this.loadSave = true;
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.commonService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(function (response) {
            _this.pagedDataView = _this.commonService.pagedData;
            console.log("DataOf", _this.pagedDataView);
            _this.pagedDataView.data.forEach(function (cnt) {
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
    ServicecrewlistComponent.prototype.SetManageViewValue = function (event, text) {
        this.ViewModel = text;
        this.custom_view_id = event;
        this.refresh();
        //this.LoadViewData();
    };
    ServicecrewlistComponent.prototype.switchClicked = function (event) {
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
    ServicecrewlistComponent.ctorParameters = function () { return [
        { type: _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_5__["ManageservicecrewService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_1__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ServiceCrewMembersList', { static: false }),
        __metadata("design:type", _service_crew_members_popup_service_crew_members_popup_component__WEBPACK_IMPORTED_MODULE_10__["ServiceCrewMembersPopupComponent"])
    ], ServicecrewlistComponent.prototype, "ServiceCrewMembersPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_7__["SearchfilteraddComponent"])
    ], ServicecrewlistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('AddEditServiceCrew', { static: false }),
        __metadata("design:type", _addeditservicecrewpopup_addeditservicecrewpopup_component__WEBPACK_IMPORTED_MODULE_8__["AddeditservicecrewpopupComponent"])
    ], ServicecrewlistComponent.prototype, "AddEditModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_9__["ManageviewComponent"])
    ], ServicecrewlistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ServicecrewlistComponent.prototype, "offset", void 0);
    ServicecrewlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-servicecrewlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./servicecrewlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/servicecrewlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./servicecrewlist.component.scss */ "./src/app/views/manageservicecrew/servicecrewlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_manageservicecrew_service__WEBPACK_IMPORTED_MODULE_5__["ManageservicecrewService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_1__["ConfirmationDialogService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], ServicecrewlistComponent);
    return ServicecrewlistComponent;
}());



/***/ }),

/***/ "./src/app/views/manageservicecrew/viewservicecrew.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/views/manageservicecrew/viewservicecrew.component.ts ***!
  \**********************************************************************/
/*! exports provided: ViewservicecrewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewservicecrewComponent", function() { return ViewservicecrewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./manageservicecrew.service */ "./src/app/views/manageservicecrew/manageservicecrew.service.ts");
/* harmony import */ var _solgencontactlist_customcontactlist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../solgencontactlist/customcontactlist.service */ "./src/app/views/solgencontactlist/customcontactlist.service.ts");
/* harmony import */ var _manageservicecrewmemberpopup_addeditservicecrewmember_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./manageservicecrewmemberpopup/addeditservicecrewmember.component */ "./src/app/views/manageservicecrew/manageservicecrewmemberpopup/addeditservicecrewmember.component.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _addeditservicecrewpopup_addeditservicecrewpopup_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addeditservicecrewpopup/addeditservicecrewpopup.component */ "./src/app/views/manageservicecrew/addeditservicecrewpopup/addeditservicecrewpopup.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _resourceskill_resourceskill_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./resourceskill/resourceskill.component */ "./src/app/views/manageservicecrew/resourceskill/resourceskill.component.ts");
/* harmony import */ var _serviceresource_serviceresourse_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../serviceresource/serviceresourse.service */ "./src/app/views/serviceresource/serviceresourse.service.ts");
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













var ViewservicecrewComponent = /** @class */ (function () {
    function ViewservicecrewComponent(serviceresourseService, servicecrewService, commanService, router, dialogService, toaster, route, location) {
        this.serviceresourseService = serviceresourseService;
        this.servicecrewService = servicecrewService;
        this.commanService = commanService;
        this.router = router;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.route = route;
        this.location = location;
        this.lstSkill = {
            pager: {},
            data: []
        };
        this.moduleName = 'serviceappointment';
        this.submoduleName = 'servicecrew';
        this.customCompnentValues = [];
        this.formControlList = [];
        this.loadSave = false;
        this.displayType = 'VIEW';
        this.ServiceCrewName = "";
        this.SkillPageNo = 1;
        this.lstServiceCrewMembers = {
            pager: {},
            data: []
        };
        this.SkillsCount = 0;
        this.ServiceCrewMembersCount = 0;
        this.pageNo = 0;
        this.pageSize = 4;
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.ServiceCrewMemberPageNo = 1;
        this.proposalsPageNo = 1;
        this.leadsPageNo = 1;
        this.Resources = '-';
        this.ActualCrewSize = '0';
        this.customCompnentValuesTop = [];
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.siteurl = '';
        this.checkboxdata1 = [];
        this.checkboxdataTop = [];
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commanService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }
    ViewservicecrewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.siteurl = window.location.origin;
        console.log('siteurl', this.siteurl);
        this.loadSave = true;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.Id = id;
        });
        this.refreshResources();
        this.GetCustomFieldsList();
        this.GetCustomFieldsListTopRow();
        this.getRelatedData();
    };
    ViewservicecrewComponent.prototype.getRelatedData = function () {
        //added new
        this.refreshSkillsList();
        this.refreshServiceCrewMembersList();
    };
    ViewservicecrewComponent.prototype.showEditServiceCrewPopup = function () {
        this.ServiceCrewModal.show(this.Id);
    };
    ViewservicecrewComponent.prototype.close = function () {
        this.router.navigateByUrl("/servicecrew");
    };
    ViewservicecrewComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        this.displayType = 'VIEW';
        this.commanService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (resp) {
            if (resp) {
                _this.formControlList = [];
                _this.customCompnentValues = resp.data;
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _solgencontactlist_customcontactlist_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
                    if (cnt.ColumnName == 'Name') {
                        _this.ServiceCrewName = cnt.value;
                    }
                    if (cnt.name == 'Resources') {
                        cnt.value = _this.Resources;
                    }
                    if (cnt.name == 'ActualSize') {
                        cnt.value = _this.ActualCrewSize;
                    }
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator
                    ]);
                });
                console.log("group", group_1);
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"](group_1);
                _this.loadSave = false;
            }
        });
    };
    ViewservicecrewComponent.prototype.GetCustomFieldsListTopRow = function () {
        var _this = this;
        this.displayType = 'VIEW_TOP';
        this.loadSave = true;
        this.commanService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (resp) {
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
                    if (cnt.dt_code == 'select') {
                        if (cnt.value != '' && cnt.select_options != null) {
                            cnt.select_options.forEach(function (itemList) {
                                if (itemList.value == cnt.value) {
                                    cnt.value = itemList.name;
                                }
                            });
                        }
                    }
                    if (cnt.name == 'ActualSize') {
                        //debugger;
                        //val = this.ActualCrewSize;
                        cnt.value = _this.ActualCrewSize;
                    }
                });
                _this.loadSave = false;
            }
        });
    };
    ViewservicecrewComponent.prototype.onServiceCrewMembersSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshServiceCrewMembersList();
    };
    // added new 
    ViewservicecrewComponent.prototype.refreshSkillsList = function () {
        var _this = this;
        this.servicecrewService.refreshSkillsList(this.Id, this.sortColumn, this.sortDir, this.SkillPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstSkill = resp;
            _this.SkillsCount = resp.pager.totalItems;
            console.log("thiskil", _this.lstSkill);
        });
    };
    ViewservicecrewComponent.prototype.setSkillPageNo = function ($event) {
        this.SkillPageNo = $event.page;
        this.refreshSkillsList();
    };
    ViewservicecrewComponent.prototype.onSkillSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshSkillsList();
    };
    ViewservicecrewComponent.prototype.openSkillPopup = function () {
        this.resourceSkill.show(this.Id);
    };
    ViewservicecrewComponent.prototype.resourceSkillEvent = function () {
        this.refreshSkillsList();
    };
    ViewservicecrewComponent.prototype.EditSkill = function (row) {
        this.resourceSkill.EditSkill(row);
    };
    ViewservicecrewComponent.prototype.deleteSkill = function (row, sectionName) {
        var _this = this;
        var message = "Are you sure you want to delete Service Skill?";
        this.dialogService.confirm('Delete Service Skill', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.serviceresourseService.DeleteRecords(row.Id, 'tblServiceResourceSkill').subscribe(function (res) {
                    _this.toaster.success("Service Skill has been deleted successfully..");
                    _this.refreshSkillsList();
                });
            }
        });
    };
    //  ************   end *************
    ViewservicecrewComponent.prototype.refreshServiceCrewMembersList = function () {
        var _this = this;
        this.servicecrewService.GetServiceCrewMembersList(this.sortColumn, this.sortDir, this.ServiceCrewMemberPageNo, this.pageSize, this.Id).subscribe(function (resp) {
            _this.lstServiceCrewMembers = resp;
            _this.ServiceCrewMembersCount = resp.pager.totalItems;
        });
        //this.refreshResources();
    };
    ViewservicecrewComponent.prototype.setServiceCrewMemberPageNo = function ($event) {
        this.ServiceCrewMemberPageNo = $event.page;
        this.refreshServiceCrewMembersList();
    };
    ViewservicecrewComponent.prototype.ShowManageCrewMemberPopup = function (crewMemberId) {
        var CrewMemberId = crewMemberId;
        this.ManageCrewMemberModal.show(this.Id, this.ServiceCrewName, CrewMemberId);
    };
    ViewservicecrewComponent.prototype.refreshResources = function () {
        var _this = this;
        this.servicecrewService.GetServiceResourcesByServiceCrewId(this.Id).subscribe(function (lst) {
            if (lst) {
                var jsonData = JSON.parse(lst.responseMessage);
                _this.Resources = jsonData.Resources;
                _this.ActualCrewSize = jsonData.ActualSize;
            }
        });
    };
    ViewservicecrewComponent.prototype.deleteCrew = function (id, sectionName) {
        var _this = this;
        var message = "Are you sure you want to delete Service Crew Member?";
        this.dialogService.confirm('Delete Service Crew Member', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.servicecrewService.DeleteRecords(id, 'tblServiceCrewMember').subscribe(function (res) {
                    _this.toaster.success("Service Crew Member has been deleted successfully..");
                    _this.ServiceCrewMemberPageNo = 1;
                    _this.refreshServiceCrewMembersList();
                });
            }
        });
    };
    ViewservicecrewComponent.prototype.refreshList = function () {
        this.GetCustomFieldsList();
        this.GetCustomFieldsListTopRow();
    };
    ViewservicecrewComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    ViewservicecrewComponent.ctorParameters = function () { return [
        { type: _serviceresource_serviceresourse_service__WEBPACK_IMPORTED_MODULE_12__["ServiceresourseService"] },
        { type: _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_4__["ManageservicecrewService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resourceSkill', { static: false }),
        __metadata("design:type", _resourceskill_resourceskill_component__WEBPACK_IMPORTED_MODULE_11__["ResourceskillComponent"])
    ], ViewservicecrewComponent.prototype, "resourceSkill", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('AddEditServiceCrewMember', { static: false }),
        __metadata("design:type", _manageservicecrewmemberpopup_addeditservicecrewmember_component__WEBPACK_IMPORTED_MODULE_6__["AddeditservicecrewmemberComponent"])
    ], ViewservicecrewComponent.prototype, "ManageCrewMemberModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('AddEditServiceCrew', { static: false }),
        __metadata("design:type", _addeditservicecrewpopup_addeditservicecrewpopup_component__WEBPACK_IMPORTED_MODULE_9__["AddeditservicecrewpopupComponent"])
    ], ViewservicecrewComponent.prototype, "ServiceCrewModal", void 0);
    ViewservicecrewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewservicecrew',
            template: __importDefault(__webpack_require__(/*! raw-loader!./viewservicecrew.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageservicecrew/viewservicecrew.component.html")).default
        }),
        __metadata("design:paramtypes", [_serviceresource_serviceresourse_service__WEBPACK_IMPORTED_MODULE_12__["ServiceresourseService"],
            _manageservicecrew_service__WEBPACK_IMPORTED_MODULE_4__["ManageservicecrewService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_10__["Location"]])
    ], ViewservicecrewComponent);
    return ViewservicecrewComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-manageservicecrew-manageservicecrew-module.js.map