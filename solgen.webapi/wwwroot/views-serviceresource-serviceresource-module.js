(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-serviceresource-serviceresource-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/abcenseaddeditpopup/abcenseaddedit.component.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/abcenseaddeditpopup/abcenseaddedit.component.html ***!
  \*******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #Serviceabcense=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; max-height:1200px; overflow:visible;\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row col-12\" *ngIf=\"RecordType\">\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Select Record Type:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group\">\r\n                <div class=\"form-check-inline\" *ngFor=\"let option of lstRecoardType\">\r\n                  <div class=\"custom-control custom-radio\" >\r\n                    <input type=\"radio\" class=\"custom-control-input\" id=\"{{option.value}}\"  name=\"recordType\"\r\n                           value=\"{{option.value}}\" formControlName=\"recordType\" checked=\"checked\" (click)=\"redioButtonEvents(option.value,option.text)\">\r\n                    <label class=\"custom-control-label\" for=\"{{option.value}}\">{{option.text}}</label>\r\n                  </div>\r\n                </div>\r\n                <!--<div class=\"form-check-inline\">\r\n                  <div class=\"custom-control custom-radio\">\r\n                    <input type=\"radio\" class=\"custom-control-input\" id=\"nonAvailability\"  name=\"recordType\" value=\"0126g000000Su41AAC\" formControlName=\"recordType\" >\r\n                    <label class=\"custom-control-label\" for=\"nonAvailability\">\r\n                      Non Availability\r\n                    </label>\r\n                  </div>\r\n                </div>-->\r\n                <br />\r\n                <small *ngIf=\"addForm.get('recordType').invalid && (addForm.get('recordType').dirty || addForm.get('recordType').touched) && addForm.get('recordType').errors?.required\"\r\n                       class=\"text-danger\">Record type is required</small>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row col-12\" *ngIf=\"RecordTypePage\">\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Service Resource:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstResource\"\r\n                           placeholder=\"Select Service Resource\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"serviceResource\"\r\n                           [closeOnSelect]=\"true\"\r\n                           [ngClass]=\"{'is-invalid': (serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required) }\">\r\n                </ng-select>\r\n                <small *ngIf=\"serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required\"\r\n                       style=\"color:red;\">Please select Service Resource</small>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Type:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstType\"\r\n                           placeholder=\"Select service Type\" bindValue=\"value\" bindLabel=\"text\"\r\n                           formControlName=\"type\"\r\n                           [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (type.invalid && (type.dirty || type.touched) && type.errors?.required) }\">\r\n                </ng-select>\r\n                <small *ngIf=\"type.invalid && (type.dirty || type.touched) && type.errors?.required\"\r\n                       style=\"color:red;\">Please select territory Ttype</small>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Start Date:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group datepickerinpop\">\r\n\r\n                <p-calendar [showIcon]=\"true\" hideOnDateTimeSelect=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" formControlName=\"startDate\" \r\n                           [hourFormat]=\"12\" [showTime]=\"true\" inputId=\"timeonly1\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                            (onSelect)=\"GetCompareDateTimeResult('startDate','endDate','Start Date','End Date')\"\r\n                            [ngClass]=\"{'is-invalid': (startDate?.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required) }\"></p-calendar>\r\n\r\n              </div>\r\n              <small *ngIf=\"startDate?.invalid\" style=\"color:red;\">\r\n                <ng-container *ngIf=\"startDate.required && startDate.errors == null\">Please select Start Date</ng-container>\r\n                <ng-container *ngIf=\"startDate.errors != null\">{{startDate.errors.message}}</ng-container>\r\n              </small>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>End Date:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group datepickerinpop\">\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" inputStyleClass=\"form-control start-date \" formControlName=\"endDate\" \r\n                           [hourFormat]=\"12\" [showTime]=\"true\" inputId=\"timeonly2\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                            (onSelect)=\"GetCompareDateTimeResult('startDate','endDate','Start Date','End Date')\"\r\n                            [ngClass]=\"{'is-invalid': (endDate?.invalid && (endDate.dirty || endDate.touched) && endDate.errors?.required) }\"></p-calendar>\r\n              </div>\r\n            <small *ngIf=\"endDate?.invalid\" style=\"color:red;\">\r\n              <ng-container *ngIf=\"endDate.errors != null\">{{endDate.errors.message}}</ng-container>\r\n            </small>\r\n            </div>\r\n\r\n\r\n            <div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Description:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group\">\r\n                <textarea class=\"form-control\" [ngClass]=\"{'is-invalid': (description.invalid && (description.dirty || description.touched) && description.errors?.required) }\" formControlName=\"description\" rows=\"3\" cols=\"4\"></textarea>\r\n                <small *ngIf=\"description.invalid && (description.dirty || description.touched) && description.errors?.required\"\r\n                       style=\"color:red;\">Please enter description</small>\r\n              </div>\r\n            </div>\r\n            <!--<div class=\"col-12 col-md-6 col-lg-6\">\r\n    <label>Gantt Label:<span class=\"text-danger\"></span></label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"Please enter Gantt Label\" formControlName=\"ganttLabel\">\r\n    </div>\r\n    <small *ngIf=\"ganttLabel.invalid && (ganttLabel.dirty || ganttLabel.touched) && ganttLabel.errors?.pattern\"\r\n           class=\"text-danger\">Please enter valid zipCode.</small>\r\n  </div>-->\r\n            <div class=\"col-12\">\r\n              <label>Address:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group\">\r\n                <a (click)=\"mapPopUP()\" href=\"javascript:void(0);\" class=\"btn btn-info\"><i class=\"fa fa-search mr-2\"></i> Search Location</a>\r\n              </div>\r\n            </div>\r\n\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Country:<span class=\"text-danger\"></span></label>\r\n                <div class=\"form-group\">\r\n                  <ng-select [items]=\"lstCountry\"\r\n                             placeholder=\"Select Country\" bindValue=\"value\" bindLabel=\"text\"\r\n                             formControlName=\"country\"\r\n                             [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (country.invalid && (country.dirty || country.touched) && country.errors?.required) }\">\r\n                  </ng-select>\r\n                  <small *ngIf=\"country.invalid && (country.dirty || country.touched) && country.errors?.required\"\r\n                         style=\"color:red;\">Please select country</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Address:<span class=\"text-danger\"></span></label>\r\n                <div class=\"form-group\">\r\n                  <textarea class=\"form-control\" [ngClass]=\"{'is-invalid': (addressDes.invalid && (addressDes.dirty || addressDes.touched) && addressDes.errors?.required) }\" formControlName=\"addressDes\" rows=\"3\" cols=\"4\"></textarea>\r\n                  <small *ngIf=\"addressDes.invalid && (addressDes.dirty || addressDes.touched) && addressDes.errors?.required\"\r\n                         style=\"color:red;\">Please select address</small>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>City:<span class=\"text-danger\"></span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Please enter city\" formControlName=\"city\">\r\n                  <small *ngIf=\"city.invalid && (city.dirty || city.touched) && city.errors?.pattern\"\r\n                         class=\"text-danger\">Please enter valid Skill Level.</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>State/Province:<span class=\"text-danger\"></span></label>\r\n                <div class=\"form-group\">\r\n                  <ng-select [items]=\"lstState\"\r\n                             placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\"\r\n                             formControlName=\"state\"\r\n                             [closeOnSelect]=\"true\">\r\n                  </ng-select>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Zip/Postal Code:<span class=\"text-danger\"></span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Please Zip/Postal Code\" formControlName=\"zipCode\">\r\n                </div>\r\n                <small *ngIf=\"zipCode.invalid && (zipCode.dirty || zipCode.touched) && zipCode.errors?.pattern\"\r\n                       class=\"text-danger\">Please enter valid zipCode.</small>\r\n              </div>\r\n\r\n            </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button *ngIf=\"RecordType\" type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"Next()\"><i class=\"fa fa-save text-white\"></i> Next</button>\r\n        <button *ngIf=\"RecordTypePage\" type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal fade show\" bsModal #mapLocation=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-xl modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Search Location</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closemapsearch()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow: auto; margin-bottom: 10px; max-height: 496px; overflow-x: hidden; line-height: 24px; font-size: 13px;\">\r\n        <div class=\"row mb-3\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"pac-card\" id=\"pac-card\">\r\n\r\n              <div id=\"pac-container\" class=\"form-group\">\r\n                <input id=\"pac-input\" class=\"form-control\" type=\"text\" placeholder=\"Enter a location\" />\r\n              </div>\r\n            </div>\r\n            <div id=\"map\" class=\"d-none\"></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/addeditresourseservice.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/addeditresourseservice.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/serviceresource\">Manage Service Resource</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList;let i=index\">\r\n        <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row  mb-2\">\r\n\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n\r\n\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true,  'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n                <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label>{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n                <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n              </a>-->\r\n              <div class=\"form-group\">\r\n\r\n\r\n\r\n                <!--text  [placeholder]=\"inner.display_name\"-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint'\" />\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                <p-calendar inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n\r\n                <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n  [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                <!--end calandar-->\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\">\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                        <!--<label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n          for=\"chk_{{inner.custom_field_id}}\">{{inner.display_name}}</label>-->\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                        <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                 [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n          <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n\r\n\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--Ng Dropdown-->\r\n                <!--Dropdown\r\n  picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n  -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.dt_code=='select' }\" *ngIf=\"inner.dt_code=='select' && inner.select_options==''\">\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.id\"\r\n            *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n      {{//option.value}}\r\n    </option>\r\n  </select>-->\r\n\r\n                <ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                           [ngClass]=\"{'disabledddl':inner.is_readOnly}\" [searchable]=\"false\" [clearable]=\"false\"\r\n                           [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n                <ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && !inner.is_readOnly\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\"\r\n                           placeholder=\"Select\" (clear)=\"onClearLang(item.InnerData,j)\" (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                           [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n               \r\n\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n                <!--Dropdown\r\n    picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n  -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n          (change)='onOptionsSelected($event,inner)'>\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.name\"\r\n            *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n      {{//option.name}}\r\n    </option>\r\n\r\n  </select>-->\r\n\r\n              </div>\r\n           </div>\r\n          </ng-container>\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf=\"isAdd || isUpdate\" href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <!--<a *ngIf=\"isUpdate\" href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>-->\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/resourceserviceterritory/serviceresourceterritoryview.component.html":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/resourceserviceterritory/serviceresourceterritoryview.component.html ***!
  \**************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #sourceterritory=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; max-height:1200px; overflow:visible;\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row col-12\">\r\n            <h3 class=\"form-heading\"> <span>Information</span></h3>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Service Resource:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstResource\"\r\n                           placeholder=\"Select Service Resource\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"serviceResource\"\r\n                           [closeOnSelect]=\"true\"\r\n                           [ngClass]=\"{'is-invalid': (serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required) }\">\r\n                </ng-select>\r\n                <small *ngIf=\"serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required\"\r\n                       style=\"color:red;\">Please select Service Resource</small>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Service Territory:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstTerritory\"\r\n                           placeholder=\"Select service Territory\" bindValue=\"value\" bindLabel=\"text\"\r\n                           formControlName=\"serviceTerritoryId\"\r\n                           [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (serviceTerritoryId.invalid && (serviceTerritoryId.dirty || serviceTerritoryId.touched) && serviceTerritoryId.errors?.required) }\">\r\n                </ng-select>\r\n                <small *ngIf=\"serviceTerritoryId.invalid && (serviceTerritoryId.dirty || serviceTerritoryId.touched) && serviceTerritoryId.errors?.required\"\r\n                       style=\"color:red;\">Please select service territory</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Territory Type:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstTerritoryType\"\r\n                           placeholder=\"Select service Territory Type\" bindValue=\"value\" bindLabel=\"text\"\r\n                           formControlName=\"territoryType\"\r\n                           [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (territoryType.invalid && (territoryType.dirty || territoryType.touched) && territoryType.errors?.required) }\">\r\n                </ng-select>\r\n                <small *ngIf=\"territoryType.invalid && (territoryType.dirty || territoryType.touched) && territoryType.errors?.required\"\r\n                       style=\"color:red;\">Please select territory Ttype</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n            </div>\r\n            <div class=\"col-12\">\r\n              <label>Address:<span class=\"text-danger\"></span></label>\r\n              <!--<div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Please enter Skill Level\" formControlName=\"skillLevel\">\r\n                <small *ngIf=\"skillLevel.invalid && (skillLevel.dirty || skillLevel.touched) && skillLevel.errors?.pattern\"\r\n                       class=\"text-danger\">Please enter valid Skill Level.</small>\r\n              </div>-->\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Country:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstCountry\"\r\n                           placeholder=\"Select Country\" bindValue=\"value\" bindLabel=\"text\"\r\n                           formControlName=\"country\"\r\n                           [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (country.invalid && (country.dirty || country.touched) && country.errors?.required) }\">\r\n                </ng-select>\r\n                <small *ngIf=\"country.invalid && (country.dirty || country.touched) && country.errors?.required\"\r\n                       style=\"color:red;\">Please select country</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Address:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group\">\r\n                <textarea class=\"form-control\" [ngClass]=\"{'is-invalid': (addressDes.invalid && (addressDes.dirty || addressDes.touched) && addressDes.errors?.required) }\" formControlName=\"addressDes\" rows=\"3\" cols=\"4\"></textarea>\r\n                <small *ngIf=\"addressDes.invalid && (addressDes.dirty || addressDes.touched) && addressDes.errors?.required\"\r\n                       style=\"color:red;\">Please select address</small>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>City:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Please enter city\" formControlName=\"city\">\r\n                <small *ngIf=\"city.invalid && (city.dirty || city.touched) && city.errors?.pattern\"\r\n                       class=\"text-danger\">Please enter valid Skill Level.</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>State/Provlnce:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstState\"\r\n                           placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\"\r\n                           formControlName=\"state\"\r\n                           [closeOnSelect]=\"true\">\r\n                </ng-select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Zip/Postal Code:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Please enter city\" formControlName=\"zipCode\">\r\n              </div>\r\n              <small *ngIf=\"zipCode.invalid && (zipCode.dirty || zipCode.touched) && zipCode.errors?.pattern\"\r\n                     class=\"text-danger\">Please enter valid zipCode.</small>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Operating Hours:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstOperatingHours\"\r\n                           placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\"\r\n                           formControlName=\"operatingHours\"\r\n                           [closeOnSelect]=\"true\">\r\n                </ng-select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row col-12\">\r\n            <h3 class=\"form-heading\"> <span>Duration</span></h3>\r\n\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Start Date:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group datepickerinpop\">\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" inputStyleClass=\"form-control start-date \" formControlName=\"startDate\"  [maxDate]=\"minDate\"\r\n                            [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                            [ngClass]=\"{'is-invalid': (startDate?.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required) }\"></p-calendar>\r\n                <small *ngIf=\"startDate?.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required\"\r\n                       style=\"color:red;\">Please select Start Date</small>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>End Date:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group datepickerinpop\">\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\"  inputStyleClass=\"form-control start-date \" formControlName=\"endDate\" [minDate]=\"startDate.value\"\r\n                            [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"  [hourFormat]=\"(timeFormat==24)?'24':'12'\"></p-calendar>\r\n              </div>\r\n            </div>\r\n\r\n\r\n          </div>\r\n\r\n\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/resourceserviicecrew/servicecrewaddedit.component.html":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/resourceserviicecrew/servicecrewaddedit.component.html ***!
  \************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #Servicecrew=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; max-height:1000px; overflow:visible;\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <!--<h4>if would like Enerflo to automatically find the best apt time based on availalility.</h4>-->\r\n              <div class=\"row col-12\">\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Service Resource:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"lstResource\"\r\n                               placeholder=\"Select Service Resource\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"serviceResource\"\r\n                               [closeOnSelect]=\"true\"\r\n                               [ngClass]=\"{'is-invalid': (serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required\"\r\n                           style=\"color:red;\">Please select Service Resource</small>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Start Date:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group datepickerinpop\">\r\n\r\n                    <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" inputStyleClass=\"form-control start-date \" formControlName=\"startDate\" [maxDate]=\"minDate\"\r\n                                [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\"\r\nhourFormat=\"{{timeFormat}}\"\r\nshowButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                                [ngClass]=\"{'is-invalid': (startDate?.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required) }\"></p-calendar>\r\n\r\n                  </div>\r\n                  <small *ngIf=\"startDate?.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required\"\r\n                         style=\"color:red;\">Please select Start Date</small>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Service Crew:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearAppointment [items]=\"lstCrew\"\r\n                               placeholder=\"Select service crew\" bindValue=\"value\" bindLabel=\"text\"\r\n                               formControlName=\"serviceCrew\"\r\n                               [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (serviceCrew.invalid && (serviceCrew.dirty || serviceCrew.touched) && serviceCrew.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"serviceCrew.invalid && (serviceCrew.dirty || serviceCrew.touched) && serviceCrew.errors?.required\"\r\n                           style=\"color:red;\">Please select service crew</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>End Date:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group datepickerinpop\">\r\n                    <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\"  inputStyleClass=\"form-control start-date \" formControlName=\"endDate\" [minDate]=\"startDate.value\"\r\n                                hourFormat=\"{{timeFormat}}\"\r\n                                [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <!--<label>Leader:<span class=\"text-danger\"></span></label>-->\r\n                  <div class=\"form-group\">\r\n                    <div class=\"custom-control custom-checkbox\">\r\n                      <input class=\"custom-control-input\" id=\"ContactLenderAgree\" type=\"checkbox\" formControlName=\"isLeader\" />\r\n                      <label class=\"custom-control-label\" for=\"ContactLenderAgree\">\r\n                        Leader\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/resourceskill/resourceskill.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/resourceskill/resourceskill.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #resourceSkill=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; max-height:1000px; overflow:visible;\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <!--<h4>if would like Enerflo to automatically find the best apt time based on availalility.</h4>-->\r\n              <div class=\"row col-12\">\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Service Resource:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"lstResource\"\r\n                               placeholder=\"Select Service Resource\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"serviceResource\"\r\n                               [closeOnSelect]=\"true\"\r\n                               [ngClass]=\"{'is-invalid': (serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"serviceResource.invalid && (serviceResource.dirty || serviceResource.touched) && serviceResource.errors?.required\"\r\n                           style=\"color:red;\">Please select Service Resource</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Skill:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearAppointment [items]=\"lstResourceSkill\"\r\n                               placeholder=\"Select skill\" bindValue=\"value\" bindLabel=\"text\"\r\n                               formControlName=\"skill\"\r\n                               [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (skill.invalid && (skill.dirty || skill.touched) && skill.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"skill.invalid && (skill.dirty || skill.touched) && skill.errors?.required\"\r\n                           style=\"color:red;\">Please select skill</small>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Skill Level:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Please enter Skill Level\" formControlName=\"skillLevel\">\r\n                    <small *ngIf=\"skillLevel.invalid && (skillLevel.dirty || skillLevel.touched) && skillLevel.errors?.pattern\"\r\n                           class=\"text-danger\">Please enter valid Skill Level.</small>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Start Date:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group datepickerinpop\">\r\n                    <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\"\r\n                                inputStyleClass=\"form-control start-date \" [maxDate]=\"endDate.value\" formControlName=\"startDate\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                                [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                                [ngClass]=\"{'is-invalid': (startDate?.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required) }\"></p-calendar>\r\n\r\n                  </div>\r\n                  <small *ngIf=\"startDate?.invalid && (startDate.dirty || startDate.touched) && startDate.errors?.required\"\r\n                         style=\"color:red;\">Please select Start Date</small>\r\n                </div>\r\n\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>End Date:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group datepickerinpop\">\r\n                    <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" formControlName=\"endDate\"\r\n                                inputStyleClass=\"form-control start-date\" [minDate]=\"startDate.value\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                                [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/serviceappointment/serviceappointment.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/serviceappointment/serviceappointment.component.html ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"modal fade in show\" bsModal #ServiceAppointment=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">New Assigned Resources</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; max-height:1000px; overflow:visible;\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n\r\n              <!--<h4>if would like Enerflo to automatically find the best apt time based on availalility.</h4>-->\r\n              <div class=\"row col-12\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Service Appointment:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select [items]=\"lstResourceAppointment\" (clear)=\"onClearLang(lstResourceAppointment)\" (keyup)=\"onKey($event,lstResourceAppointment)\"\r\n                               (scrollToEnd)=\"onScrollToEnd(lstResourceAppointment)\"  [virtualScroll]=\"true\"\r\n                               placeholder=\"Please select service appointment\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"serviceAppointment\"\r\n                               [closeOnSelect]=\"true\"\r\n                               [ngClass]=\"{'is-invalid': (serviceAppointment.invalid && (serviceAppointment.dirty || serviceAppointment.touched) && serviceAppointment.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"serviceAppointment.invalid && (serviceAppointment.dirty || serviceAppointment.touched) && serviceAppointment.errors?.required\"\r\n                           style=\"color:red;\">Please select Service appointment</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Service Resource:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <!--<ng-select [items]=\"lstResource\" [loading]=\"loadSave\" placeholder=\"Service Resource\" formControlName=\"serviceResourceId\"\r\n                       bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (serviceResourceId.invalid && (serviceResourceId.dirty || serviceResourceId.touched) && serviceResourceId.errors?.required) }\">\r\n            </ng-select>\r\n            <small *ngIf=\"serviceResourceId.invalid && (serviceResourceId.dirty || serviceResourceId.touched) && serviceResourceId.errors?.required\"\r\n                   style=\"color:red;\">Please select service resource</small>-->\r\n\r\n                    <ng-select [items]=\"lstResource\"\r\n                               placeholder=\"Please select service Resource\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"serviceResourceId\"\r\n                               [closeOnSelect]=\"true\"\r\n                               [ngClass]=\"{'is-invalid': (serviceResourceId.invalid && (serviceResourceId.dirty || serviceResourceId.touched) && serviceResourceId.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"serviceResourceId.invalid && (serviceResourceId.dirty || serviceResourceId.touched) && serviceResourceId.errors?.required\"\r\n                           style=\"color:red;\">Please select service resource</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Estimated Travel Time (Minutes)</label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"number\" class=\"form-control\" formControlName=\"estimatedTravelTime\" maxlength=\"50\" />\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Actual Travel Time (Minutes)</label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"number\" class=\"form-control\" formControlName=\"actualTravelTime\" maxlength=\"50\" />\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Service Crew:</label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select [items]=\"serviceCrewNames\"  placeholder=\"Select Service Crew\" formControlName=\"serviceCrewId\"\r\n                               bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Estimated Travel Time From Source:</label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select [items]=\"estimatedTravelTimeFromSourceNames\"  placeholder=\"Please select Estimated Travel Time From Source\" formControlName=\"estimatedTravelTimeFromSourceId\"\r\n                               bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Approximate Travel Distance From:</label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"number\" class=\"form-control\" formControlName=\"approximateTravelDistanceForm\" maxlength=\"50\" />\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Estimated Travel Time To Source:</label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select [items]=\"estimatedTravelTimeToSourceNames\"  placeholder=\"Select Estimated Travel Time To Source\" formControlName=\"estimatedTravelTimeToSourceId\"\r\n                               bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Approximate Travel Distance To:</label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"number\" class=\"form-control\" formControlName=\"approximateTravelDistanceTo\" maxlength=\"50\" />\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Last Updated Epoch:</label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"number\" class=\"form-control\" formControlName=\"lastUpdatedEpoch\" maxlength=\"50\" />\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Approximate Travel Time From (Minutes):</label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"number\" class=\"form-control\" formControlName=\"approximateTravelTimeForm\" maxlength=\"50\" />\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Updated By Optimization:</label>\r\n                  <div class=\"form-group\">\r\n                    <label class=\"switch\">\r\n                      <input type=\"checkbox\" id=\"customCheck1\" formControlName=\"isUpdatedByOptimization\">\r\n                      <span class=\"slider round\"><span>Yes</span></span>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <label>Calculated Duration (Minutes):</label>\r\n                  <div class=\"form-group\">\r\n                    <input type=\"text\" class=\"form-control\" formControlName=\"calculatedDurationMinutes\" maxlength=\"50\" />\r\n                  </div>\r\n                </div>\r\n\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n    </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveAssignedResources()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/serviceresourceview.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/serviceresourceview.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Service Resource Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/serviceresource\">Manage Service Resource</a></li>\r\n      <li class=\"active\">Service Resource Details</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-3 mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-bullseye bg-info text-white float-left p-1 mr-2\"></i>\r\n    <span class=\"float-left w-85-res\" style=\"font-size:18px;\"><span>Service Resource</span> {{ServiceResourceName}}</span>\r\n    <span class=\"cntnt-right-btn mr15 btn-iconres\">\r\n      <a href=\"javascript:void(0);\" [routerLink]=\"['/serviceresource/editserviceresource',Id]\" class=\"btn btn-success text-white mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n  \r\n  <div class=\"col-12 float-left d-md-flex p-0 py-resp py-2 py-sm-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n      <div class=\"col py-2\" *ngIf=\"item.ColumnName != 'Name'\">\r\n        <span *ngIf=\"item.ColumnName != 'SF_IsActive' && !item.field_route\" class=\"d-block\">\r\n          <strong>{{ item.display_name}}:</strong> {{ item.value}}\r\n        </span>\r\n        <span *ngIf=\"item.ColumnName != 'SF_IsActive' && item.field_route \" class=\"d-block\">\r\n          <strong>{{ item.display_name}}:</strong> <a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\"> {{ item.value}}</a>\r\n        </span>\r\n        <span class=\"d-block\" *ngIf=\"item.ColumnName=='SF_IsActive' && item.Value!= '0'\">\r\n          <strong>{{ item.display_name}}:</strong>&nbsp;\r\n          <span class=\"status-box bg-success\">Active</span>\r\n        </span>\r\n        <span class=\"d-block\" *ngIf=\"item.ColumnName=='SF_IsActive' && item.Value === '0'\">\r\n          <strong>{{ item.display_name}}:</strong>&nbsp;\r\n          <span class=\"status-box bg-danger\">Inactive</span>\r\n        </span>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mt-3 mb-4 border-0\" style=\"background:none\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col-sm-12 col-lg-8\">\r\n            <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n              <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n                <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                  <ng-container *ngFor=\"let item of formControlList\">\r\n                    <div class=\"panel active\">\r\n                      <div class=\"panel-heading\">\r\n                        <h4 class=\"panel-title\">\r\n                          <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                            <span> {{item.group_name}}</span>\r\n                          </a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                        <div class=\"panel-body row px-0 mt-0\">\r\n                          <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                            <div class=\"input-group border-bottom\">\r\n                              <div class=\"col-sm-12 col-md-6 px-0\">\r\n                                <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                              </div>\r\n                              <div class=\"col-sm-12 col-md-6\">\r\n                                <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null\" class=\"py-2 d-block\">{{ inner.value}}</span>\r\n                                <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null\" class=\"py-2 d-block\">\r\n                                  <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                                </span>\r\n                                <!--============================== For CheckBox ===========================-->\r\n                                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                                  <div class=\"form-check form-check-inline\">\r\n                                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                                      <label class=\"switch  mb-0\">\r\n                                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                      </label>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                                <!--============================== For CheckBox ===========================-->\r\n                                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                                  <div class=\"form-check form-check-inline\">\r\n                                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                                      <label class=\"switch mb-0\">\r\n                                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                      </label>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ng-container>\r\n                </form>\r\n              </div>\r\n          </div>\r\n          <div class=\"col-sm-12 col-lg-4 relatedtab\">\r\n            <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n              <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#campaignManagers\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Service Appointments ({{ServiceAppointmentsCount }})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"campaignManagers\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <a href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"openServiceAppointmentsPopup()\"><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Add</span></a>\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstAppointments.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstAppointments.pager.totalItems\"\r\n                                       [offset]=\"lstAppointments.pager.currentPage\"\r\n                                       [limit]=\"lstAppointments.pager.pageSize\"\r\n                                       (page)='setAppointmentPageNo($event)'\r\n                                       (sort)=\"onAppointmentSort($event)\">\r\n\r\n\r\n                          <ngx-datatable-column name=\"Appointment Number\" prop=\"AppointmentNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n                          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <div class=\"text-center\">\r\n                                <a href=\"javascript:void(0);\" (click)=\"EditAppoimentment(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                                <a href=\"javascript:void(0);\" (click)=\"deleteAppoimentment(row,'appointment')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                              </div>\r\n\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstAppointments.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstAppointments.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                  <!--Showing {{(lstAppointments.pager.currentPage - 1 )* lstAppointments.pager.pageSize + 1}}  to {{lstAppointments.pager.currentPage * lstAppointments.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                  {{commonService.PageString(lstAppointments.pager.currentPage,lstAppointments.pager.pageSize,rowCount)}}\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstAppointments.pager.currentPage\"\r\n                                               [size]=\"lstAppointments.pager.pageSize\"\r\n                                               [count]=\"lstAppointments.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstAppointments.pager.pageSize) > 1)\"\r\n                                               (change)=\"setAppointmentPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#proposals\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Skills ({{SkillsCount}})</span>\r\n                      </a>\r\n\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"proposals\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <a href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"openSkillPopup()\"><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Add</span></a>\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstSkill.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstSkill.pager.totalItems\"\r\n                                       [offset]=\"lstSkill.pager.currentPage\"\r\n                                       [limit]=\"lstSkill.pager.pageSize\"\r\n                                       (page)='setSkillPageNo($event)'\r\n                                       (sort)=\"onSkillSort($event)\">\r\n\r\n                          <ngx-datatable-column name=\"Service Name\" prop=\"ServiceResourceName\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              {{row.ServiceResourceName}}\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n\r\n                          <ngx-datatable-column name=\"Skill Name\" prop=\"skilName\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              {{row.skilName}}\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n\r\n                          <ngx-datatable-column name=\"Skill Number\" prop=\"SkillNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Skill Level\" prop=\"SkillLevel\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n                          <ngx-datatable-column name=\"Start Date\" prop=\"startDate\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              {{row.startDate | DateTimeToLocal}}\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"End Date\" prop=\"endDate\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              {{row.endDate | DateTimeToLocal}}\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n\r\n                          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <div class=\"text-center\">\r\n                                <a href=\"javascript:void(0);\" (click)=\"EditSkill(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                                <a href=\"javascript:void(0);\" (click)=\"deleteSkill(row,'serviceSkill')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                              </div>\r\n\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstSkill.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstSkill.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                                  <!--{{commonService.PageString(SkillPageNo,lstSkill.pager.pageSize,rowCount)}}-->\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"SkillPageNo\"\r\n                                               [size]=\"lstSkill.pager.pageSize\"\r\n                                               [count]=\"lstSkill.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstSkill.pager.pageSize) > 1)\"\r\n                                               (change)=\"setSkillPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                    </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#campaignMembersCount\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Service Territory ({{campaignMembersCount}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"campaignMembersCount\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <a href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"openServiceTerritoriesPopup()\"><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Add</span></a>\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstGetServiceTerritoryList.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstGetServiceTerritoryList.pager.totalItems\"\r\n                                       [offset]=\"lstGetServiceTerritoryList.pager.currentPage\"\r\n                                       [limit]=\"lstGetServiceTerritoryList.pager.pageSize\"\r\n                                       (page)='setcampaignMemberPageNo($event)'\r\n                                       (sort)=\"onCampaignMembersSort($event)\">\r\n\r\n\r\n\r\n                          <ngx-datatable-column name=\"Member Number\" prop=\"MemberNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Service Territory\" prop=\"ServiceTerritory\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Territory Type\" prop=\"TerritoryTypeName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"StartDate\" prop=\"startDate\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <span [title]=\"row.startDate | DateTimeToLocal\">{{row.startDate | DateTimeToLocal}}</span>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <div class=\"text-center\">\r\n                                <a href=\"javascript:void(0);\" (click)=\"EditTerritory(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                                <a href=\"javascript:void(0);\" (click)=\"deleteTerritory(row,'serviceSkill')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                              </div>\r\n\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstGetServiceTerritoryList.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstGetServiceTerritoryList.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                  <!--Showing {{(lstGetServiceTerritoryList.pager.currentPage - 1 )* lstGetServiceTerritoryList.pager.pageSize + 1}}  to {{lstGetServiceTerritoryList.pager.currentPage * lstGetServiceTerritoryList.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                  {{commonService.PageString(lstGetServiceTerritoryList.pager.currentPage,lstGetServiceTerritoryList.pager.pageSize,rowCount)}}\r\n\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstGetServiceTerritoryList.pager.currentPage\"\r\n                                               [size]=\"lstGetServiceTerritoryList.pager.pageSize\"\r\n                                               [count]=\"lstGetServiceTerritoryList.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstGetServiceTerritoryList.pager.pageSize) > 1)\"\r\n                                               (change)=\"setcampaignMemberPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                    </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#ServiceCrew\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Service Crew ({{countServiceCrew}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"ServiceCrew\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <a href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"openServiceCrewPopup()\"><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Add</span></a>\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstServiceCrew.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstServiceCrew.pager.totalItems\"\r\n                                       [offset]=\"lstServiceCrew.pager.currentPage\"\r\n                                       [limit]=\"lstServiceCrew.pager.pageSize\"\r\n                                       (page)='setServiceCrewPageNo($event)'\r\n                                       (sort)=\"onServiceServiceCrewSort($event)\">\r\n\r\n\r\n                          <ngx-datatable-column name=\"Member Number\" prop=\"ServiceCrewMemberNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Name\" prop=\"Name\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Leader\" prop=\"Leader\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <div *ngIf=\"row.Leader== true\">\r\n                                <span class=\"status-box bg-success\">Active</span>\r\n                              </div>\r\n                              <div *ngIf=\"row.Leader== false\">\r\n                                <span class=\"status-box bg-danger\">Inactive</span>\r\n                              </div>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Crew Size\" prop=\"CrewSize\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Start Date\" prop=\"startDate\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <span [title]=\"row.startDate | DateTimeToLocal\">{{row.startDate | DateTimeToLocal}}</span>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <div class=\"text-center\">\r\n                                <a href=\"javascript:void(0);\" (click)=\"EditCrew(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                                <a href=\"javascript:void(0);\" (click)=\"deleteCrew(row,'Crew')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                              </div>\r\n\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstServiceCrew.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstServiceCrew.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                  <!--Showing {{(lstServiceCrew.pager.currentPage - 1 )* lstServiceCrew.pager.pageSize + 1}}  to {{lstServiceCrew.pager.currentPage * lstServiceCrew.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                  {{commonService.PageString(lstServiceCrew.pager.currentPage,lstServiceCrew.pager.pageSize,rowCount)}}\r\n\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstServiceCrew.pager.currentPage\"\r\n                                               [size]=\"lstServiceCrew.pager.pageSize\"\r\n                                               [count]=\"lstServiceCrew.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstServiceCrew.pager.pageSize) > 1)\"\r\n                                               (change)=\"setServiceCrewPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                    </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#Absences\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Absences ({{countAbcense}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"Absences\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <a href=\"javascript:void(0)\" class=\"btn-in-panel\" (click)=\"openServiceAbcensePopup()\"><span data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i>Add</span></a>\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstAbsence.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstAbsence.pager.totalItems\"\r\n                                       [offset]=\"lstAbsence.pager.currentPage\"\r\n                                       [limit]=\"lstAbsence.pager.pageSize\"\r\n                                       (page)='setAbsencesPageNo($event)'\r\n                                       (sort)=\"onAbsencesSort($event)\">\r\n\r\n\r\n\r\n                          <ngx-datatable-column name=\"Start Date\" prop=\"startDate\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <span [title]=\"row.startDate | DateTimeToLocal\">{{row.startDate | DateTimeToLocal}}</span>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"End Date\" prop=\"endDate\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <span [title]=\"row.endDate | DateTimeToLocal\">{{row.endDate | DateTimeToLocal}}</span>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Type\" prop=\"typebigint\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <div class=\"text-center\">\r\n                                <a href=\"javascript:void(0);\" (click)=\"EditAbcense(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                                <a href=\"javascript:void(0);\" (click)=\"deleteAbcense(row,'Abcense')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                              </div>\r\n\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstAbsence.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstAbsence.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                  <!--Showing {{(lstAbsence.pager.currentPage - 1 )* lstAbsence.pager.pageSize + 1}}  to {{lstAbsence.pager.currentPage * lstAbsence.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                  {{commonService.PageString(lstAbsence.pager.currentPage,lstAbsence.pager.pageSize,rowCount)}}\r\n\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstAbsence.pager.currentPage\"\r\n                                               [size]=\"lstAbsence.pager.pageSize\"\r\n                                               [count]=\"lstAbsence.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstAbsence.pager.pageSize) > 1)\"\r\n                                               (change)=\"setAbsencesPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                  </div>\r\n                </div>\r\n                <app-files title=\"Files\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{Id}}\"></app-files>\r\n              </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n            <app-resourceskill #resourceSkill (resourceSkillEvent)=\"resourceSkillEvent()\"></app-resourceskill>\r\n            <app-serviceresourceterritoryview #sourceterritory (resourceSourceterritoryEvent)=\"resourceSourceterritoryEvent()\"></app-serviceresourceterritoryview>\r\n            <app-servicecrewaddedit #Servicecrew (resourceServicecrewEvent)=\"resourceServicecrewEvent()\"></app-servicecrewaddedit>\r\n            <app-serviceappointment #ServiceAppointment (resourceServiceAppointmentEvent)=\"resourceServiceAppointmentEvent()\"></app-serviceappointment>\r\n            <app-abcenseaddedit #Serviceabcense (resourceSourceServiceabcenseEvent)=\"resourceSourceServiceabcenseEvent()\"></app-abcenseaddedit>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/serviceresourselist.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/serviceresourselist.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\">\r\n    <strong>Service Resource</strong>\r\n    <p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p>\r\n  </h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Service Resource</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-6 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield \">\r\n              <div class=\"col-md-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-md-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n                <div class=\"d-inline-block align-middle pl-2\">\r\n                  <label class=\"d-inline-block \"><b>Search in all records</b></label>\r\n                  <div class=\"form-group d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <input type=\"checkbox\" id=\"allRecords\" formControlName=\"allRecords\" [checked]=\"myCheckbox\" (click)=\"switchClicked($event)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0\">\r\n                <ng-select [items]=\"pagedData.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i> </span></a>\r\n              <a *ngIf=\"isAdd\" [routerLink]=\"['/serviceresource/addserviceresource']\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add Service Resource\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a *ngIf=\"isDelete\" class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <div class=\"table table-striped\">\r\n          <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                         [rowHeight]=\"40\"\r\n                         [rows]=\"columndata\"\r\n                         [columnMode]=\"'force'\"\r\n                         [headerHeight]=\"40\"\r\n                         [footerHeight]=\"40\"\r\n                         [externalPaging]=\"true\"\r\n                         [externalSorting]=\"true\"\r\n                         [loadingIndicator]=\"loadSave\"\r\n                         [count]=\"totalRecords\"\r\n                         [offset]=\"currentPage\"\r\n                         [limit]=\"pageSizeValue\"\r\n                         (page)='setPage($event)'\r\n                         (sort)=\"onSort($event)\"\r\n                         [scrollbarH]=\"true\"\r\n                         [selectionType]=\"SelectionType.checkbox\"\r\n                         [selectAllRowsOnPage]=\"false\"\r\n                         [selected]=\"selected\"\r\n                         (select)=\"onSelect($event)\">\r\n\r\n            <ngx-datatable-column [width]=\"50\"\r\n                                  [sortable]=\"false\"\r\n                                  [canAutoResize]=\"false\"\r\n                                  [draggable]=\"false\"\r\n                                  [resizeable]=\"false\"\r\n                                  [headerCheckboxable]=\"true\"\r\n                                  [checkboxable]=\"true\">\r\n            </ngx-datatable-column>\r\n\r\n\r\n            <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                <div *ngIf=\"col.COLUMN_NAME == 'Name'\">\r\n                  <a class=\"view-list\" [routerLink]=\"['/serviceresource/view',row.ID]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n                </div>\r\n\r\n                <div *ngIf=\"col.COLUMN_NAME != 'Name'\">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                    <div *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"status-box\" style=\"background-color: #28a745;max-width:150px !important\">\r\n                      Active\r\n                    </div>\r\n                    <div *ngIf=\"row[col.COLUMN_NAME] != true\" class=\"status-box\" style=\"background-color: #dc3545;max-width: 150px !important\">\r\n                      Inactive\r\n                    </div>\r\n                  </div>\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE=='date'\">\r\n                    {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                  </div>\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.DATA_TYPE!='bit'\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                </div>\r\n              </ng-template>\r\n            </ngx-datatable-column>\r\n          \r\n            <ngx-datatable-column [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                <span class=\"actions rw_act\">\r\n                  <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.ID\" aria-hidden=\"true\"></i>\r\n                  <span class=\"action-list-box spn{{row.ID}}\">\r\n                    <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                      <a class=\"actions-onclick view-list\" [routerLink]=\"['/serviceresource/view',row.ID]\" title=\"View Service Resource\"><i class=\"fa fa-eye pr-2\"></i></a>\r\n                      <a *ngIf=\"isUpdate\" class=\"actions-onclick view-list\" [routerLink]=\"['/serviceresource/editserviceresource',row.ID]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                      <a *ngIf=\"isDelete\" title=\"Click to delete.\" class=\"actions-onclick view-list\" (click)=\"Delete(row)\" href=\"javascript:void(0);\">\r\n                        <i class=\"fa fa-trash text-danger\"></i>\r\n                      </a>\r\n                      <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n                    </span>\r\n                  </span>\r\n                </span>\r\n              </ng-template>\r\n            </ngx-datatable-column>\r\n            <ngx-datatable-footer>\r\n              <ng-template ngx-datatable-footer-template\r\n                           let-rowCount=\"rowCount\"\r\n                           let-pageSize=\"pageSize\"\r\n                           let-selectedCount=\"selectedCount\"\r\n                           let-currentPage=\"curPage\"\r\n                           let-offset=\"offset\"\r\n                           let-isVisible=\"isVisible\">\r\n                <div>\r\n                  <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                    <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                      <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                 bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                  <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                  {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n                </div>\r\n                <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                 [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                 [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                 [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                 [page]=\"curPage\"\r\n                                 [size]=\"pageSizeValue\"\r\n                                 [count]=\"totalRecords\"\r\n                                 [hidden]=\"!((rowCount / pageSizeValue) > 1)\"\r\n                                 (change)=\"setPage($event)\">\r\n                </datatable-pager>\r\n              </ng-template>\r\n            </ngx-datatable-footer>\r\n          </ngx-datatable>\r\n        </div>\r\n        <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"serviceappointment\" subModuleName=\"serviceresource\"></app-searchfilteradd>\r\n<app-manageview (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"serviceappointment\" subModuleName=\"serviceresource\"></app-manageview>\r\n");

/***/ }),

/***/ "./src/app/views/serviceresource/abcenseaddeditpopup/abcenseaddedit.component.scss":
/*!*****************************************************************************************!*\
  !*** ./src/app/views/serviceresource/abcenseaddeditpopup/abcenseaddedit.component.scss ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VyZXNvdXJjZS9hYmNlbnNlYWRkZWRpdHBvcHVwL2FiY2Vuc2VhZGRlZGl0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/serviceresource/abcenseaddeditpopup/abcenseaddedit.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/views/serviceresource/abcenseaddeditpopup/abcenseaddedit.component.ts ***!
  \***************************************************************************************/
/*! exports provided: AbcenseaddeditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbcenseaddeditComponent", function() { return AbcenseaddeditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../serviceresourse.service */ "./src/app/views/serviceresource/serviceresourse.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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









var AbcenseaddeditComponent = /** @class */ (function () {
    function AbcenseaddeditComponent(fb, commonService, userService, serviceresourseService, router, toaster, route) {
        this.fb = fb;
        this.commonService = commonService;
        this.userService = userService;
        this.serviceresourseService = serviceresourseService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.resourceSourceServiceabcenseEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.active = false;
        this.isDateChanged = true;
        this.RecordType = false;
        this.RecordTypePage = false;
        this.appmodel = new _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__["AbcenseModel"]();
        this.fTime = new Date(0);
        this.Tdate = new Date(0);
        this.minimumDate = new Date();
        this.isEdit = false;
        this.loadSave = false;
        this.datetime = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_8__["DateTimeToLocalForAddEditPipe"];
        var moduleCode = this.route.snapshot.data.moduleCode;
        //this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    AbcenseaddeditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.getServiceResourceType();
        setTimeout(function () {
            _this.options = {
                center: { lat: 47.751076, lng: -120.740135 },
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.overlays = [];
            _this.autotext();
        }, 1000);
        var today = new Date();
        this.minDate = today;
        this.maxDate = this.minDate;
    };
    AbcenseaddeditComponent.prototype.show = function (id) {
        this.getServiceResourceType();
        this.title = 'New Resource Absence : ' + this.lstRecoardType[0].text;
        this.RecordTypes = this.lstRecoardType[0].values;
        this.RecordType = true;
        this.recordType.setValue(this.lstRecoardType[0].value);
        this.interResourceId = id;
        this.serviceResource.setValue(this.interResourceId);
        this.getServiceResource(this.interResourceId);
        this.getState();
        this.getType();
        this.getCountry(); //ResourceAbsenceType
        this.modalSourceServiceabcense.show();
    };
    AbcenseaddeditComponent.prototype.EditAbcense = function (row) {
        var _this = this;
        this.getServiceResource(row.serviceResource);
        this.getState();
        this.getType();
        this.isEdit = true;
        this.getCountry();
        // this.getServiceResourceType();
        this.editData = row;
        this.interResourceId = row.serviceResource;
        this.internalabcenId = row.abcenceId;
        this.startDateModel = row.startDate;
        this.addForm.get('serviceResource').disable();
        var datetime = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_8__["DateTimeToLocalForAddEditPipe"];
        var SDate = datetime.transform(row.startDate, null);
        var EDate = datetime.transform(row.endDate, null);
        if (row.recordType != null && row.recordType != '') {
            this.lstRecoardType.forEach(function (itemList) {
                if (itemList.value == row.recordType) {
                    _this.title = "Edit Resource Absence : " + itemList.text;
                    _this.RecordTypes = row.recordType;
                }
            });
        }
        this.isDateChanged = false;
        //this.internalabcenId=row.abcenceId;
        var serviaceResources;
        this.recordType.setValue(row.recordType);
        if (row.serviceResource != null && row.serviceResource != '') {
            serviaceResources = row.serviceResource.toString();
        }
        this.isEdit = true;
        this.addForm.patchValue({
            id: row.abcenceId,
            serviceResource: this.interResourceId == null ? null : this.interResourceId.toString(),
            recordType: row.recordType == null ? null : row.recordType.toString(),
            type: row.type == null ? null : row.type.toString(),
            country: parseInt(row.country),
            addressDes: row.addressDes,
            description: row.description,
            ganttLabel: row.ganttLabel,
            city: row.city,
            state: row.state == null ? null : row.state.toString(),
            zipCode: row.zipCode,
            startDate: SDate,
            endDate: EDate,
        });
        this.RecordType = true;
        this.modalSourceServiceabcense.show();
    };
    AbcenseaddeditComponent.prototype.redioButtonEvents = function (event, text) {
        this.RecordTypes = event;
        this.addForm.controls['recordType'].patchValue(event.toString());
        if (this.isEdit == true) {
            this.title = "Edit Resource Absence : " + text;
        }
        else {
            this.title = 'New Resource Absence : ' + text;
        }
    };
    AbcenseaddeditComponent.prototype.setvaluesFroHideTabs = function (row) {
        var SDate = this.datetime.transform(row.startDate, null);
        var EDate = this.datetime.transform(row.endDate, null);
        this.addForm.patchValue({
            id: row.abcenceId,
            serviceResource: this.interResourceId == null ? null : this.interResourceId.toString(),
            recordType: row.recordType == null ? null : row.recordType.toString(),
            type: row.type == null ? null : row.type,
            country: parseInt(row.country),
            addressDes: row.addressDes,
            description: row.description,
            ganttLabel: row.ganttLabel,
            city: row.city,
            state: parseInt(row.state),
            zipCode: row.zipCode,
            startDate: SDate,
            endDate: EDate,
        });
    };
    AbcenseaddeditComponent.prototype.getState = function () {
        var _this = this;
        this.commonService.getStatesList().subscribe(function (res) {
            _this.lstState = _this.commonService.states;
        });
    };
    AbcenseaddeditComponent.prototype.getType = function () {
        var _this = this;
        this.commonService.getMasterItemsList('ResourceAbsenceType').subscribe(function (result) {
            _this.lstType = _this.commonService.masters;
            console.log("Resource", _this.lstResource);
        });
    };
    //ServiceResourceRecoardType
    AbcenseaddeditComponent.prototype.getServiceResourceType = function () {
        var _this = this;
        this.commonService.getMasterItemsList('ServiceResourceRecoardType').subscribe(function (result) {
            _this.lstRecoardType = _this.commonService.masters;
            console.log("lstRecoardType", _this.lstRecoardType);
        });
    };
    AbcenseaddeditComponent.prototype.getCountry = function () {
        var _this = this;
        this.serviceresourseService.getCountryList().subscribe(function (result) {
            _this.lstCountry = result;
        });
    };
    AbcenseaddeditComponent.prototype.getServiceResource = function (id) {
        var _this = this;
        this.commonService.getMasterSubModuleList(id, 'ServiceResource').subscribe(function (result) {
            _this.lstResource = _this.commonService.masters;
            console.log("Resource", _this.lstResource);
        });
    };
    AbcenseaddeditComponent.prototype.Next = function () {
        //if (this.addForm.valid) {
        //this.title = 'New Resource Absence';//+ this.addForm.value.recordType //'New Resource Absence 222222 :';
        if (this.editData != null && this.editData != '' && this.internalabcenId != null) {
            this.setvaluesFroHideTabs(this.editData);
        }
        this.RecordType = false;
        this.RecordTypePage = true;
        //}
        //else {
        //  this.commonService.validateAllFormFields(this.addForm);
        //}
        //this.title
    };
    AbcenseaddeditComponent.prototype.close = function () {
        this.active = false;
        this.RecordType = false;
        this.RecordTypePage = false;
        this.addForm.reset();
        this.title = '';
        this.modalSourceServiceabcense.hide();
    };
    Object.defineProperty(AbcenseaddeditComponent.prototype, "id", {
        get: function () { return this.addForm.get('id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "recordType", {
        get: function () { return this.addForm.get('recordType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "serviceResource", {
        get: function () { return this.addForm.get('serviceResource'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "type", {
        get: function () { return this.addForm.get('type'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "startDate", {
        get: function () { return this.addForm.get('startDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "endDate", {
        get: function () { return this.addForm.get('endDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "description", {
        get: function () { return this.addForm.get('description'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "ganttLabel", {
        get: function () { return this.addForm.get('ganttLabel'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "country", {
        get: function () { return this.addForm.get('country'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "addressDes", {
        get: function () { return this.addForm.get('addressDes'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "city", {
        get: function () { return this.addForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "state", {
        get: function () { return this.addForm.get('state'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "zipCode", {
        get: function () { return this.addForm.get('zipCode'); },
        enumerable: true,
        configurable: true
    });
    AbcenseaddeditComponent.prototype.initForm = function () {
        this.addForm = this.fb.group({
            id: [null],
            recordType: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            serviceResource: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            type: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")]],
            startDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            endDate: [null],
            description: [null],
            ganttLabel: [null],
            country: [null],
            addressDes: [null],
            city: [null],
            state: [null],
            zipCode: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^[0-9]*$")]],
        });
    };
    AbcenseaddeditComponent.prototype.Save = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.appmodel.id = this.addForm.value.id;
            this.appmodel.recordType = this.RecordTypes; // this.addForm.value.recordType;
            this.appmodel.serviceResource = this.interResourceId;
            this.appmodel.type = this.addForm.value.type;
            this.appmodel.description = this.addForm.value.description;
            this.appmodel.country = this.addForm.value.country;
            this.appmodel.addressDes = this.addForm.value.addressDes;
            this.appmodel.city = this.addForm.value.city;
            this.appmodel.state = this.addForm.value.state;
            this.appmodel.zipCode = this.addForm.value.zipCode;
            this.appmodel.ganttLabel = this.addForm.value.ganttLabel;
            this.appmodel.startDate = (this.startDate.value == null) ? null : this.datetime.transform(this.startDate.value, null);
            this.appmodel.endDate = (this.endDate.value == null) ? null : this.datetime.transform(this.endDate.value, null);
            this.serviceresourseService.addeditServiceabcense(this.appmodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    //this.router.navigate(["/calendar"]);
                    _this.addForm.reset();
                    _this.RecordType = false;
                    _this.RecordTypePage = false;
                    _this.title = '';
                    _this.modalSourceServiceabcense.hide();
                    _this.resourceSourceServiceabcenseEvent.emit();
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
    AbcenseaddeditComponent.prototype.GetCompareDateTimeResult = function (sDate, eDate, sTitle, eTitle) {
        debugger;
        this.StartDate = sDate;
        this.EndDate = eDate;
        var startDateValue, endDateValue;
        startDateValue = this.sDate.value;
        endDateValue = this.eDate.value;
        this.resetDateTimeValidators();
        if (endDateValue) {
            if (startDateValue > endDateValue) {
                this.sDate.setErrors({ "message": sTitle + " is must be lesser than " + eTitle });
                this.eDate.setErrors({ "message": eTitle + " is must be greater than " + sTitle });
            }
            else {
                this.resetDateTimeValidators();
            }
        }
        else {
            this.resetDateTimeValidators();
        }
    };
    Object.defineProperty(AbcenseaddeditComponent.prototype, "sDate", {
        get: function () {
            return this.addForm.get(this.StartDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcenseaddeditComponent.prototype, "eDate", {
        get: function () {
            return this.addForm.get(this.EndDate);
        },
        enumerable: true,
        configurable: true
    });
    AbcenseaddeditComponent.prototype.resetDateTimeValidators = function () {
        this.sDate.setErrors(null);
        this.eDate.setErrors(null);
        this.sDate.clearValidators;
        this.sDate.updateValueAndValidity();
        this.eDate.clearValidators;
        this.eDate.updateValueAndValidity();
    };
    //-------------------------configuaration for calender datetime validations end here
    AbcenseaddeditComponent.prototype.mapPopUP = function () {
        this.mapLocation.show();
    };
    AbcenseaddeditComponent.prototype.closemapsearch = function () {
        this.mapLocation.hide();
    };
    AbcenseaddeditComponent.prototype.autotext = function () {
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
                var streetvalue_1 = '', routevalue_1 = '';
                place.address_components.forEach(function (p) {
                    p.types.forEach(function (s) {
                        //console.log('s', s);   
                        if (s == 'country') {
                            try {
                                var _countryValue = _this.lstCountry.filter(function (x) { return x.text == p.long_name; })[0].value;
                                _this.country.setValue(_countryValue);
                            }
                            catch (_a) { }
                        }
                        if (s == 'administrative_area_level_1') {
                            try {
                                //debugger;  
                                var _stateValue = _this.lstState.filter(function (x) { return x.text == p.long_name; })[0].value;
                                _this.state.setValue(_stateValue);
                            }
                            catch (_b) { }
                        }
                        if (s == 'postal_code') {
                            _this.zipCode.setValue(p.long_name);
                        }
                        if (s == 'locality') {
                            _this.city.setValue(p.long_name);
                        }
                        if (s == 'street_number') {
                            streetvalue_1 = p.long_name;
                        }
                        if (s == 'route') {
                            routevalue_1 = p.long_name;
                        }
                    });
                });
                _this.addressDes.setValue(streetvalue_1 + ' ' + routevalue_1);
            }
            _this.closemapsearch();
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
    AbcenseaddeditComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
        { type: _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__["ServiceresourseService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapLocation', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], AbcenseaddeditComponent.prototype, "mapLocation", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Serviceabcense', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], AbcenseaddeditComponent.prototype, "modalSourceServiceabcense", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AbcenseaddeditComponent.prototype, "resourceSourceServiceabcenseEvent", void 0);
    AbcenseaddeditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-abcenseaddedit',
            template: __importDefault(__webpack_require__(/*! raw-loader!./abcenseaddedit.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/abcenseaddeditpopup/abcenseaddedit.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./abcenseaddedit.component.scss */ "./src/app/views/serviceresource/abcenseaddeditpopup/abcenseaddedit.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _shared_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__["ServiceresourseService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]])
    ], AbcenseaddeditComponent);
    return AbcenseaddeditComponent;
}());



/***/ }),

/***/ "./src/app/views/serviceresource/addeditresourseservice.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/views/serviceresource/addeditresourseservice.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VyZXNvdXJjZS9hZGRlZGl0cmVzb3Vyc2VzZXJ2aWNlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/serviceresource/addeditresourseservice.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/serviceresource/addeditresourseservice.component.ts ***!
  \***************************************************************************/
/*! exports provided: AddeditresourseserviceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditresourseserviceComponent", function() { return AddeditresourseserviceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./serviceresourse.service */ "./src/app/views/serviceresource/serviceresourse.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _loanapplication_loanapplicationservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../loanapplication/loanapplicationservice.service */ "./src/app/views/loanapplication/loanapplicationservice.service.ts");
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








var AddeditresourseserviceComponent = /** @class */ (function () {
    // modulePermission: any[] = [];
    //isAdd: boolean = false;
    //isUpdate: boolean = false;
    //isDelete: boolean = false;
    function AddeditresourseserviceComponent(fb, serviceresourseService, router, toaster, route, commonService, activeRoute, location) {
        var _this = this;
        this.fb = fb;
        this.serviceresourseService = serviceresourseService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.activeRoute = activeRoute;
        this.location = location;
        this.config = [];
        this.moduleName = 'serviceappointment';
        this.submoduleName = 'serviceresource';
        this.loadSave = false;
        this.Id = '';
        this.isLead = false;
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.modulePermission = [];
        this.isAdd = true;
        this.isUpdate = true;
        this.isDelete = true;
        this.len = 10;
        this.JsonData = new _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__["resourceServiceJsonData"]();
        this.addOrUpdatePermission = false;
        this.checkboxdata1 = [];
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
        });
        var priviledgeCode = this.route.snapshot.data.privilegeCode;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICERESOURCEADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICERESOURCEUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICERESOURCEDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
    }
    AddeditresourseserviceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.Id = id;
                _this.isLead = true;
                _this.pageTitle = 'Edit Service Resource';
                _this.displayType = 'EDIT';
            }
            else {
                _this.loadSave = true;
                _this.pageTitle = 'Add Service Resource';
                _this.displayType = 'ADD';
            }
        });
        this.loadSave = true;
        this.serviceresourseService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            if (result) {
                _this.loadSave = true;
                _this.customCompnentValues = _this.serviceresourseService.customFieldsList.data;
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _loanapplication_loanapplicationservice_service__WEBPACK_IMPORTED_MODULE_6__["CheckboxData"]();
                        checkdata.controlname = t.ColumnName;
                        _this.checkboxdata1.push(checkdata);
                    }
                    if (t.dt_code == 'select' && t.picklist_options == 'true') {
                        if (t.value != "") {
                            t.value = JSON.parse(t.value);
                        }
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
                    if (_this.displayType == "EDIT" && cnt.dt_code == 'select' && (cnt.name == 'OwnerId' || cnt.name == 'RelatedRecord_UserID')) {
                        cnt.select_options.forEach(function (itemList) {
                            if (itemList.value.toUpperCase() == cnt.value.toUpperCase()) {
                                val = itemList.value;
                            }
                        });
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
        });
    };
    AddeditresourseserviceComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loadSave = true;
        if (this.form.valid) {
            this.loadSave = true;
            this.JsonData.id = this.Id;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            this.JsonData.companyId = this.companyId;
            this.JsonData.userId = this.userId;
            this.JsonData.FormJsonData = JSON.stringify(this.form.value);
            this.serviceresourseService.addOrUpdateserviceResource(this.JsonData).subscribe(function (result) {
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
    AddeditresourseserviceComponent.prototype.close = function () {
        this.location.back();
    };
    AddeditresourseserviceComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    AddeditresourseserviceComponent.prototype.fetchMore = function (dataList, j) {
        var _this = this;
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList[j].select_options.length;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        var data = dataList[j].select_options;
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            dataList[j].select_options = dataList[j].select_options.concat(_this.scrollDataList);
        });
    };
    AddeditresourseserviceComponent.prototype.onKey = function (e, dataList, j) {
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
    AddeditresourseserviceComponent.prototype.onClearLang = function (dataList, j) {
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
    AddeditresourseserviceComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__["ServiceresourseService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] }
    ]; };
    AddeditresourseserviceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditresourseservice',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditresourseservice.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/addeditresourseservice.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditresourseservice.component.scss */ "./src/app/views/serviceresource/addeditresourseservice.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__["ServiceresourseService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"]])
    ], AddeditresourseserviceComponent);
    return AddeditresourseserviceComponent;
}());



/***/ }),

/***/ "./src/app/views/serviceresource/resourceserviceterritory/serviceresourceterritoryview.component.scss":
/*!************************************************************************************************************!*\
  !*** ./src/app/views/serviceresource/resourceserviceterritory/serviceresourceterritoryview.component.scss ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VyZXNvdXJjZS9yZXNvdXJjZXNlcnZpY2V0ZXJyaXRvcnkvc2VydmljZXJlc291cmNldGVycml0b3J5dmlldy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/serviceresource/resourceserviceterritory/serviceresourceterritoryview.component.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/app/views/serviceresource/resourceserviceterritory/serviceresourceterritoryview.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: ServiceresourceterritoryviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceresourceterritoryviewComponent", function() { return ServiceresourceterritoryviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../serviceresourse.service */ "./src/app/views/serviceresource/serviceresourse.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/user.service */ "./src/app/views/shared/user.service.ts");
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









var ServiceresourceterritoryviewComponent = /** @class */ (function () {
    function ServiceresourceterritoryviewComponent(fb, commonService, userService, serviceresourseService, router, toaster, route) {
        this.fb = fb;
        this.commonService = commonService;
        this.userService = userService;
        this.serviceresourseService = serviceresourseService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.resourceSourceterritoryEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.active = false;
        this.isDateChanged = true;
        this.appmodel = new _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__["ServiceTerritorymodel"]();
        this.fTime = new Date(0);
        this.Tdate = new Date(0);
        this.minimumDate = new Date();
        this.isEdit = false;
        this.loadSave = false;
        this.datetime = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_8__["DateTimeToLocalForAddEditPipe"];
        var moduleCode = this.route.snapshot.data.moduleCode;
        //this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    ServiceresourceterritoryviewComponent.prototype.ngOnInit = function () {
        this.initForm();
        // this.getServiceResource('');
        this.getState();
        this.getCountry();
        //this.getServiceTerritoryList();
        this.getoperatingHours();
        this.GetTerritoryType();
        var today = new Date();
        this.minDate = today;
        this.maxDate = this.minDate;
    };
    ServiceresourceterritoryviewComponent.prototype.getServiceResource = function (id) {
        var _this = this;
        this.commonService.getMasterSubModuleList(id, 'ServiceResource').subscribe(function (result) {
            _this.lstResource = _this.commonService.masters;
            console.log("Resource", _this.lstResource);
        });
    };
    ServiceresourceterritoryviewComponent.prototype.getState = function () {
        var _this = this;
        //this.commonService.getMasterItemsList('State').subscribe((result: any) => {
        //  this.lstState = this.commonService.masters;
        //  console.log("Resource", this.lstResource);
        //})
        this.commonService.getStatesList().subscribe(function (res) {
            _this.lstState = _this.commonService.states;
        });
    };
    ServiceresourceterritoryviewComponent.prototype.getCountry = function () {
        var _this = this;
        this.serviceresourseService.getCountryList().subscribe(function (result) {
            _this.lstCountry = result;
        });
    };
    ServiceresourceterritoryviewComponent.prototype.getServiceTerritoryList = function (id) {
        var _this = this;
        this.commonService.getMasterSubModuleList(id, 'ServiceTerritory').subscribe(function (result) {
            _this.lstTerritory = _this.commonService.masters;
            console.log("Resource", _this.lstResource);
        });
    };
    //TerritoryType
    ServiceresourceterritoryviewComponent.prototype.GetTerritoryType = function () {
        var _this = this;
        this.commonService.getMasterItemsList('TerritoryType').subscribe(function (result) {
            _this.lstTerritoryType = _this.commonService.masters;
            console.log("Resource", _this.lstResource);
        });
    };
    ServiceresourceterritoryviewComponent.prototype.getoperatingHours = function () {
        var _this = this;
        this.commonService.getMasterItemsList('operatingHours').subscribe(function (result) {
            _this.lstOperatingHours = _this.commonService.masters;
            console.log("Resource", _this.lstResource);
        });
    };
    ServiceresourceterritoryviewComponent.prototype.show = function (id) {
        this.timeFormat = this.commonService.getTimeFormat();
        this.title = "New Service Territory Member";
        this.getServiceResource(id);
        this.getState();
        this.interResourceId = id;
        this.serviceResource.setValue(this.interResourceId);
        this.getCountry();
        this.getServiceTerritoryList(this.interResourceId);
        this.getoperatingHours();
        this.GetTerritoryType();
        this.addForm.get('serviceResource').disable();
        this.modalSourceterritory.show();
    };
    ServiceresourceterritoryviewComponent.prototype.EditTerritory = function (row) {
        this.getServiceResource(row.serviceResource);
        this.getServiceTerritoryList(row.serviceResource);
        console.log("console", row);
        this.interResourceId = row.serviceResource;
        this.startDateModel = row.startDate;
        this.addForm.get('serviceResource').disable();
        var SDate = this.datetime.transform(row.startDate, null);
        //const EDate: Date = new Date(row.endDate + 'Z');
        var EDate = (row.endDate == null ? null : this.datetime.transform(row.endDate, null));
        //this.serviceResource.setValue(this.interResourceId);
        this.title = "Edit Service Territory Member";
        this.isDateChanged = false;
        var serviceResource = '';
        if (row.serviceResource != null && row.serviceResource != '') {
            serviceResource = row.serviceResource.toString();
        }
        this.isEdit = true;
        this.addForm.patchValue({
            territoryId: row.territoryId,
            serviceResource: this.interResourceId.toString(),
            serviceTerritoryId: row.serviceTerritoryId.toString(),
            territoryType: row.TerritoryType.toString(),
            country: parseInt(row.country),
            addressDes: row.address,
            city: row.city,
            state: parseInt(row.state),
            zipCode: row.zipCode,
            operatingHours: row.operatingHours,
            startDate: SDate,
            //startTime: '',
            endDate: EDate,
        });
        //val = (cnt.value == '' ? null : new Date(cnt.value + 'Z')); // to convert to local time
        this.modalSourceterritory.show();
    };
    ServiceresourceterritoryviewComponent.prototype.close = function () {
        this.active = false;
        this.addForm.reset();
        this.modalSourceterritory.hide();
    };
    ServiceresourceterritoryviewComponent.prototype.initForm = function () {
        this.addForm = this.fb.group({
            territoryId: [null],
            serviceResource: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            serviceTerritoryId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            territoryType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            address: [null],
            country: [null],
            addressDes: [null],
            city: [null],
            state: [null],
            zipCode: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("^[0-9]*$")]],
            operatingHours: [null],
            startDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            endDate: [null]
        });
    };
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "territoryId", {
        get: function () { return this.addForm.get('territoryId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "serviceResource", {
        get: function () { return this.addForm.get('serviceResource'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "serviceTerritoryId", {
        get: function () { return this.addForm.get('serviceTerritoryId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "territoryType", {
        get: function () { return this.addForm.get('territoryType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "address", {
        get: function () { return this.addForm.get('address'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "country", {
        get: function () { return this.addForm.get('country'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "addressDes", {
        get: function () { return this.addForm.get('addressDes'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "city", {
        get: function () { return this.addForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "state", {
        get: function () { return this.addForm.get('state'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "zipCode", {
        get: function () { return this.addForm.get('zipCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "operatingHours", {
        get: function () { return this.addForm.get('operatingHours'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "startDate", {
        get: function () { return this.addForm.get('startDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceresourceterritoryviewComponent.prototype, "endDate", {
        get: function () { return this.addForm.get('endDate'); },
        enumerable: true,
        configurable: true
    });
    ServiceresourceterritoryviewComponent.prototype.Save = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.appmodel.territoryId = this.addForm.value.territoryId;
            this.appmodel.serviceResource = this.interResourceId; //this.addForm.value.serviceResource;
            this.appmodel.serviceTerritoryId = this.addForm.value.serviceTerritoryId;
            this.appmodel.territoryType = this.addForm.value.territoryType;
            this.appmodel.address = this.addForm.value.address;
            this.appmodel.country = this.addForm.value.country;
            this.appmodel.addressDes = this.addForm.value.addressDes;
            this.appmodel.city = this.addForm.value.city;
            this.appmodel.state = this.addForm.value.state;
            this.appmodel.zipCode = this.addForm.value.zipCode;
            this.appmodel.operatingHours = this.addForm.value.operatingHours;
            this.appmodel.startDate = this.commonService.getUserSelectedZoneToUTC(this.startDate.value);
            if (this.endDate.value != null) {
                this.appmodel.endDate = this.commonService.getUserSelectedZoneToUTC(this.endDate.value);
            }
            else {
                this.appmodel.endDate = null;
            }
            this.serviceresourseService.addeditServiceTerritory(this.appmodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    //this.router.navigate(["/calendar"]);
                    _this.addForm.reset();
                    _this.modalSourceterritory.hide();
                    _this.resourceSourceterritoryEvent.emit();
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
    ServiceresourceterritoryviewComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] },
        { type: _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__["ServiceresourseService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sourceterritory', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], ServiceresourceterritoryviewComponent.prototype, "modalSourceterritory", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ServiceresourceterritoryviewComponent.prototype, "resourceSourceterritoryEvent", void 0);
    ServiceresourceterritoryviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-serviceresourceterritoryview',
            template: __importDefault(__webpack_require__(/*! raw-loader!./serviceresourceterritoryview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/resourceserviceterritory/serviceresourceterritoryview.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./serviceresourceterritoryview.component.scss */ "./src/app/views/serviceresource/resourceserviceterritory/serviceresourceterritoryview.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _shared_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"],
            _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__["ServiceresourseService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], ServiceresourceterritoryviewComponent);
    return ServiceresourceterritoryviewComponent;
}());



/***/ }),

/***/ "./src/app/views/serviceresource/resourceserviicecrew/servicecrewaddedit.component.scss":
/*!**********************************************************************************************!*\
  !*** ./src/app/views/serviceresource/resourceserviicecrew/servicecrewaddedit.component.scss ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VyZXNvdXJjZS9yZXNvdXJjZXNlcnZpaWNlY3Jldy9zZXJ2aWNlY3Jld2FkZGVkaXQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/serviceresource/resourceserviicecrew/servicecrewaddedit.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/views/serviceresource/resourceserviicecrew/servicecrewaddedit.component.ts ***!
  \********************************************************************************************/
/*! exports provided: ServicecrewaddeditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicecrewaddeditComponent", function() { return ServicecrewaddeditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../serviceresourse.service */ "./src/app/views/serviceresource/serviceresourse.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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








var ServicecrewaddeditComponent = /** @class */ (function () {
    function ServicecrewaddeditComponent(fb, commonService, userService, serviceresourseService, router, toaster, route) {
        this.fb = fb;
        this.commonService = commonService;
        this.userService = userService;
        this.serviceresourseService = serviceresourseService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.resourceServicecrewEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.active = false;
        this.isDateChanged = true;
        this.appmodel = new _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__["addeditServiceCrew"]();
        this.fTime = new Date(0);
        this.Tdate = new Date(0);
        this.minimumDate = new Date();
        this.isEdit = false;
        this.loadSave = false;
        var moduleCode = this.route.snapshot.data.moduleCode;
        //this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    ServicecrewaddeditComponent.prototype.ngOnInit = function () {
        debugger;
        this.initForm();
        var today = new Date();
        this.minDate = today;
        this.maxDate = this.minDate;
        this.timeFormat = this.commonService.getTimeFormat();
        console.log('Time format', this.timeFormat);
    };
    ServicecrewaddeditComponent.prototype.getServiceResource = function (id) {
        var _this = this;
        this.commonService.getMasterSubModuleList(id, 'ServiceResource').subscribe(function (result) {
            _this.lstResource = _this.commonService.masters;
            console.log("Resource", _this.lstResource);
        });
    };
    ServicecrewaddeditComponent.prototype.getServiceCrewList = function (id) {
        var _this = this;
        this.commonService.getMasterItemsList('ServiceCrew').subscribe(function (result) {
            _this.lstCrew = _this.commonService.masters;
            console.log("Resource", _this.lstResource);
        });
    };
    ServicecrewaddeditComponent.prototype.show = function (id) {
        this.interResourceId = id;
        this.title = "New Service Crew Member";
        this.getServiceResource(id);
        this.getServiceCrewList(id);
        this.addForm.get('serviceResource').disable();
        this.serviceResource.setValue(this.interResourceId);
        this.modalServicecrew.show();
    };
    ServicecrewaddeditComponent.prototype.close = function () {
        this.active = false;
        this.addForm.reset();
        this.modalServicecrew.hide();
    };
    ServicecrewaddeditComponent.prototype.EditCrew = function (row) {
        this.serviceResource.setValue(row.serviceResourceId);
        this.getServiceResource(row.serviceResourceId);
        this.getServiceCrewList(row.serviceResourceId);
        this.interResourceId = row.serviceResourceId;
        this.startDateModel = row.startDate;
        var SDate = new Date(row.startDate + 'Z');
        var EDate = (row.endDate == null ? null : new Date(row.endDate + 'Z'));
        //val = (cnt.value == '' ? null : new Date(cnt.value + 'Z')); // to convert to local time
        this.title = "Edit Service Crew Member";
        this.isDateChanged = false;
        this.isEdit = true;
        this.addForm.patchValue({
            crewMemberId: row.crewMemberId,
            serviceResource: row.serviceResourceId.toString(),
            serviceCrew: row.serviceCrewId.toString(),
            isLeader: row.IsLeader == null ? false : row.IsLeader,
            startDate: SDate,
            //startTime: '',
            endDate: EDate,
        });
        this.addForm.get('serviceResource').disable();
        this.modalServicecrew.show();
    };
    ServicecrewaddeditComponent.prototype.initForm = function () {
        this.addForm = this.fb.group({
            crewMemberId: [null],
            serviceResource: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            serviceCrew: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            isLeader: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            startDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            endDate: [null]
        });
    };
    Object.defineProperty(ServicecrewaddeditComponent.prototype, "crewMemberId", {
        get: function () { return this.addForm.get('crewMemberId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicecrewaddeditComponent.prototype, "serviceResource", {
        get: function () { return this.addForm.get('serviceResource'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicecrewaddeditComponent.prototype, "serviceCrew", {
        get: function () { return this.addForm.get('serviceCrew'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicecrewaddeditComponent.prototype, "isLeader", {
        get: function () { return this.addForm.get('isLeader'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicecrewaddeditComponent.prototype, "startDate", {
        get: function () { return this.addForm.get('startDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicecrewaddeditComponent.prototype, "endDate", {
        get: function () { return this.addForm.get('endDate'); },
        enumerable: true,
        configurable: true
    });
    ServicecrewaddeditComponent.prototype.Save = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.appmodel.crewMemberId = this.addForm.value.crewMemberId;
            this.appmodel.serviceResource = this.interResourceId;
            this.appmodel.serviceCrew = this.addForm.value.serviceCrew;
            this.appmodel.isLeader = this.addForm.value.isLeader;
            this.appmodel.startDate = this.addForm.value.startDate;
            this.appmodel.endDate = this.addForm.value.endDate;
            this.serviceresourseService.addeditServiceCrew(this.appmodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    //this.router.navigate(["/calendar"]);
                    _this.addForm.reset();
                    _this.modalServicecrew.hide();
                    _this.resourceServicecrewEvent.emit();
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
    ServicecrewaddeditComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
        { type: _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__["ServiceresourseService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Servicecrew', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], ServicecrewaddeditComponent.prototype, "modalServicecrew", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ServicecrewaddeditComponent.prototype, "resourceServicecrewEvent", void 0);
    ServicecrewaddeditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-servicecrewaddedit',
            template: __importDefault(__webpack_require__(/*! raw-loader!./servicecrewaddedit.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/resourceserviicecrew/servicecrewaddedit.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./servicecrewaddedit.component.scss */ "./src/app/views/serviceresource/resourceserviicecrew/servicecrewaddedit.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _shared_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__["ServiceresourseService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]])
    ], ServicecrewaddeditComponent);
    return ServicecrewaddeditComponent;
}());



/***/ }),

/***/ "./src/app/views/serviceresource/resourceskill/resourceskill.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/views/serviceresource/resourceskill/resourceskill.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VyZXNvdXJjZS9yZXNvdXJjZXNraWxsL3Jlc291cmNlc2tpbGwuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/serviceresource/resourceskill/resourceskill.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/views/serviceresource/resourceskill/resourceskill.component.ts ***!
  \********************************************************************************/
/*! exports provided: ResourceskillComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceskillComponent", function() { return ResourceskillComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../serviceresourse.service */ "./src/app/views/serviceresource/serviceresourse.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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
        this.appmodel = new _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__["Skillmodel"]();
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
        this.commonService.getMasterSubModuleList(id, 'ServiceResource').subscribe(function (result) {
            _this.lstResource = _this.commonService.masters;
            console.log("Resource", _this.lstResource);
        });
    };
    ResourceskillComponent.prototype.getResourceSkill = function () {
        var _this = this;
        this.commonService.getMasterItemsList('ResourceSkill').subscribe(function (result) {
            _this.lstResourceSkill = _this.commonService.masters;
        });
    };
    ResourceskillComponent.prototype.show = function (id) {
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
        this.startDateModel = row.startDate;
        var SDate = new Date(row.startDate + 'Z');
        //const EDate: Date = new Date(row.endDate + 'Z');
        var EDate = (row.endDate == null ? null : new Date(row.endDate + 'Z'));
        this.title = "Edit Service Resource Skill";
        this.isDateChanged = false;
        this.interResourceId = row.serviceResource;
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
            this.serviceresourseService.addeditServiceSKill(this.appmodel).subscribe(function (result) {
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
        { type: _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__["ServiceresourseService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resourceSkill', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], ResourceskillComponent.prototype, "modalresourceSkill", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ResourceskillComponent.prototype, "resourceSkillEvent", void 0);
    ResourceskillComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-resourceskill',
            template: __importDefault(__webpack_require__(/*! raw-loader!./resourceskill.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/resourceskill/resourceskill.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./resourceskill.component.scss */ "./src/app/views/serviceresource/resourceskill/resourceskill.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _serviceresourse_service__WEBPACK_IMPORTED_MODULE_4__["ServiceresourseService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], ResourceskillComponent);
    return ResourceskillComponent;
}());



/***/ }),

/***/ "./src/app/views/serviceresource/serviceappointment/serviceappointment.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/views/serviceresource/serviceappointment/serviceappointment.component.scss ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VyZXNvdXJjZS9zZXJ2aWNlYXBwb2ludG1lbnQvc2VydmljZWFwcG9pbnRtZW50LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/serviceresource/serviceappointment/serviceappointment.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/views/serviceresource/serviceappointment/serviceappointment.component.ts ***!
  \******************************************************************************************/
/*! exports provided: ServiceappointmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceappointmentComponent", function() { return ServiceappointmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../serviceresourse.service */ "./src/app/views/serviceresource/serviceresourse.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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








var ServiceappointmentComponent = /** @class */ (function () {
    function ServiceappointmentComponent(fb, commonService, userService, serviceresourseService, router, toaster, route) {
        this.fb = fb;
        this.commonService = commonService;
        this.userService = userService;
        this.serviceresourseService = serviceresourseService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.resourceServiceAppointmentEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.active = false;
        this.isDateChanged = true;
        this.searchText = '';
        this.loadSave = false;
        this.appmodel = new _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__["addAssignedResourcesModel"]();
        this.fTime = new Date(0);
        this.Tdate = new Date(0);
        this.minimumDate = new Date();
        this.isEdit = false;
        this.loading = false;
        this.len = 10;
        var moduleCode = this.route.snapshot.data.moduleCode;
        //this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    ServiceappointmentComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.getServiceResource();
        this.GetServiceCrewDll();
        this.GetEstimatedTravelTimeFromAndToSourceDll();
        this.getServiceAppoint();
    };
    ServiceappointmentComponent.prototype.show = function (id) {
        this.loadSave = true;
        this.addForm.reset();
        this.interResourceId = id;
        this.title = "New Assigned Resource";
        this.GetServiceCrewDll();
        this.GetEstimatedTravelTimeFromAndToSourceDll();
        this.getServiceAppoint();
        this.getServiceResource();
        this.addForm.patchValue({
            serviceResourceId: this.interResourceId
        });
        //this.initForm();
        //setTimeout(() => {  }, 2000);
        this.len = 10;
        this.modalServiceAppointment.show();
        this.loadSave = false;
    };
    ServiceappointmentComponent.prototype.EditAppoimentment = function (row) {
        //this.modalServiceAppointment.show();
        this.interResourceId = row.ServiceResourceId;
        this.getServiceResource();
        this.title = "Edit Assigned Resource";
        this.len = 0;
        this.isDateChanged = false;
        this.isEdit = true;
        this.addForm.patchValue({
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
        this.modalServiceAppointment.show();
    };
    ServiceappointmentComponent.prototype.close = function () {
        this.active = false;
        // this.addForm.reset();
        this.modalServiceAppointment.hide();
    };
    ServiceappointmentComponent.prototype.getServiceResource = function () {
        var _this = this;
        this.commonService.getMasterSubModuleList(this.interResourceId, 'ServiceResource').subscribe(function (result) {
            _this.lstResource = _this.commonService.masters;
            _this.byDefaultResourcename = _this.lstResource[0].text;
            console.log("byDefaultResourcename", _this.byDefaultResourcename);
            console.log("Resource", _this.lstResource);
        });
    };
    ServiceappointmentComponent.prototype.getServiceAppoint = function () {
        var _this = this;
        this.commonService.getMasterSubModuleList(this.len, 'ServiceResourceAppointment').subscribe(function (result) {
            _this.lstResourceAppointment = _this.commonService.masters;
            console.log("apppppp", _this.lstResourceAppointment);
        });
    };
    ServiceappointmentComponent.prototype.GetServiceCrewDll = function () {
        var _this = this;
        this.serviceresourseService.GetServiceCrewDll().subscribe(function (data) {
            _this.serviceCrewNames = data;
        });
    };
    ServiceappointmentComponent.prototype.GetEstimatedTravelTimeFromAndToSourceDll = function () {
        var _this = this;
        this.serviceresourseService.GetEstimatedTravelTimeFromAndToSourceDll().subscribe(function (data) {
            _this.estimatedTravelTimeFromSourceNames = data;
            _this.estimatedTravelTimeToSourceNames = data;
        });
    };
    ServiceappointmentComponent.prototype.initForm = function () {
        this.addForm = this.fb.group({
            Id: [null],
            serviceAppointment: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            serviceResourceId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            estimatedTravelTime: [''],
            actualTravelTime: [''],
            serviceCrewId: [null],
            estimatedTravelTimeFromSourceId: [null],
            approximateTravelDistanceForm: [''],
            estimatedTravelTimeToSourceId: [null],
            approximateTravelDistanceTo: [''],
            lastUpdatedEpoch: [''],
            approximateTravelTimeForm: [''],
            isUpdatedByOptimization: [''],
            calculatedDurationMinutes: ['']
        });
    };
    ServiceappointmentComponent.prototype.SaveAssignedResources = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.loadSave = true;
            this.appmodel.Id = this.addForm.value.Id == null ? 0 : this.addForm.value.Id;
            this.appmodel.serviceAppointment = this.addForm.value.serviceAppointment;
            this.appmodel.serviceResourceId = this.addForm.value.serviceResourceId;
            this.appmodel.estimatedTravelTime = this.addForm.value.estimatedTravelTime;
            this.appmodel.actualTravelTime = this.addForm.value.actualTravelTime;
            this.appmodel.serviceCrewId = this.addForm.value.serviceCrewId;
            this.appmodel.estimatedTravelTimeFromSourceId = this.addForm.value.estimatedTravelTimeFromSourceId;
            this.appmodel.approximateTravelDistanceForm = this.addForm.value.approximateTravelDistanceForm;
            this.appmodel.estimatedTravelTimeToSourceId = this.addForm.value.estimatedTravelTimeToSourceId;
            this.appmodel.approximateTravelDistanceTo = this.addForm.value.approximateTravelDistanceTo;
            this.appmodel.lastUpdatedEpoch = this.addForm.value.lastUpdatedEpoch;
            this.appmodel.approximateTravelTimeForm = this.addForm.value.approximateTravelTimeForm;
            this.appmodel.isUpdatedByOptimization = this.addForm.value.isUpdatedByOptimization;
            this.appmodel.calculatedDurationMinutes = this.addForm.value.calculatedDurationMinutes;
            this.appmodel.isServiceResource = true;
            this.serviceresourseService.saveAssignedResource(this.appmodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.loadSave = false;
                    _this.toaster.success(result.responseMessage);
                    _this.addForm.reset();
                    // this.refresh();
                    // this.GetAssignedResourcesList();
                    _this.resourceServiceAppointmentEvent.emit();
                    _this.modalServiceAppointment.hide();
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
            this.commonService.validateAllFormFields(this.addForm);
        }
    };
    Object.defineProperty(ServiceappointmentComponent.prototype, "Id", {
        get: function () { return this.addForm.get('Id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "serviceAppointment", {
        get: function () { return this.addForm.get('serviceAppointment'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "serviceResourceId", {
        get: function () { return this.addForm.get('serviceResourceId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "estimatedTravelTime", {
        get: function () { return this.addForm.get('estimatedTravelTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "actualTravelTime", {
        get: function () { return this.addForm.get('actualTravelTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "serviceCrewId", {
        get: function () { return this.addForm.get('serviceCrewId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "estimatedTravelTimeFromSourceId", {
        get: function () { return this.addForm.get('estimatedTravelTimeFromSourceId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "approximateTravelDistanceForm", {
        get: function () { return this.addForm.get('approximateTravelDistanceForm'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "estimatedTravelTimeToSourceId", {
        get: function () { return this.addForm.get('estimatedTravelTimeToSourceId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "approximateTravelDistanceTo", {
        get: function () { return this.addForm.get('approximateTravelDistanceTo'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "lastUpdatedEpoch", {
        get: function () { return this.addForm.get('lastUpdatedEpoch'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "approximateTravelTimeForm", {
        get: function () { return this.addForm.get('approximateTravelTimeForm'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "isUpdatedByOptimization", {
        get: function () { return this.addForm.get('isUpdatedByOptimization'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "calculatedDurationMinutes", {
        get: function () { return this.addForm.get('calculatedDurationMinutes'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceappointmentComponent.prototype, "isServiceResource", {
        get: function () { return this.addForm.get('isServiceResource'); },
        enumerable: true,
        configurable: true
    });
    ServiceappointmentComponent.prototype.onScrollToEnd = function (dataList) {
        this.fetchMore(dataList);
    };
    ServiceappointmentComponent.prototype.fetchMore = function (dataList) {
        var _this = this;
        debugger;
        console.log("e", dataList);
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        var newLength = dataList.length;
        // this.len = newLength;
        //if (newLength != null) {
        //this.len + newLength;
        this.len = this.getreturnNumber(this.len = 10, newLength);
        //}
        //this.custom_field_id = dataList[j].custom_field_id;
        //this.field_code = dataList[j].field_code;
        this.commonService.getMasterSubModuleList(this.len, 'ServiceResourceAppointment').subscribe(function (result) {
            _this.lstResourceAppointment = _this.commonService.masters;
            console.log("apppppp", _this.lstResourceAppointment);
        });
        //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
        //  this.scrollDataList = this.commonService.customFieldsListData;
        //  console.log('scrollDataList:', this.scrollDataList);
        //  (dataList[j].select_options as any[]) = (dataList[j].select_options as any[]).concat(this.scrollDataList);
        //})
    };
    ServiceappointmentComponent.prototype.getreturnNumber = function (x, y) {
        return x + y;
    };
    ;
    ServiceappointmentComponent.prototype.onKey = function (e, dataList) {
        var _this = this;
        debugger;
        this.len = 0;
        //this.custom_field_id = dataList[j].custom_field_id;
        //this.field_code = dataList[j].field_code;
        //this.searchText = e.target.value;
        //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
        //  this.scrollDataList = this.commonService.customFieldsListData;
        //  console.log('scrollDataList:', this.scrollDataList);
        //  (dataList[j].select_options as any[]) = this.scrollDataList;
        //})
        this.commonService.getMasterSubModuleList(this.len, 'ServiceResourceAppointment').subscribe(function (result) {
            _this.lstResourceAppointment = _this.commonService.masters;
            console.log("apppppp", _this.lstResourceAppointment);
        });
    };
    ServiceappointmentComponent.prototype.onClearLang = function (dataList) {
        var _this = this;
        this.len = 0;
        //this.custom_field_id = dataList[j].custom_field_id;
        //this.field_code = dataList[j].field_code;
        this.searchText = '';
        this.commonService.getMasterSubModuleList(this.len, 'ServiceResourceAppointment').subscribe(function (result) {
            _this.lstResourceAppointment = _this.commonService.masters;
            console.log("apppppp", _this.lstResourceAppointment);
        });
        //this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
        //  this.scrollDataList = this.commonService.customFieldsListData;
        //  console.log('scrollDataList:', this.scrollDataList);
        //  (dataList[j].select_options as any[]) = this.scrollDataList;
        //})
    };
    ServiceappointmentComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
        { type: _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__["ServiceresourseService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ServiceAppointment', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], ServiceappointmentComponent.prototype, "modalServiceAppointment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ServiceappointmentComponent.prototype, "resourceServiceAppointmentEvent", void 0);
    ServiceappointmentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-serviceappointment',
            template: __importDefault(__webpack_require__(/*! raw-loader!./serviceappointment.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/serviceappointment/serviceappointment.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./serviceappointment.component.scss */ "./src/app/views/serviceresource/serviceappointment/serviceappointment.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _shared_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _serviceresourse_service__WEBPACK_IMPORTED_MODULE_5__["ServiceresourseService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]])
    ], ServiceappointmentComponent);
    return ServiceappointmentComponent;
}());



/***/ }),

/***/ "./src/app/views/serviceresource/serviceresource-routing.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/views/serviceresource/serviceresource-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: ServiceresourceRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceresourceRoutingModule", function() { return ServiceresourceRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _serviceresourselist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serviceresourselist.component */ "./src/app/views/serviceresource/serviceresourselist.component.ts");
/* harmony import */ var _addeditresourseservice_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditresourseservice.component */ "./src/app/views/serviceresource/addeditresourseservice.component.ts");
/* harmony import */ var _serviceresourceview_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./serviceresourceview.component */ "./src/app/views/serviceresource/serviceresourceview.component.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../auth/auth.guard */ "./src/app/auth/auth.guard.ts");
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
    { path: '', component: _serviceresourselist_component__WEBPACK_IMPORTED_MODULE_2__["ServiceresourselistComponent"] },
    { path: 'addserviceresource', component: _addeditresourseservice_component__WEBPACK_IMPORTED_MODULE_3__["AddeditresourseserviceComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'SERVICERESOURCEADD' } },
    { path: 'editserviceresource/:id', component: _addeditresourseservice_component__WEBPACK_IMPORTED_MODULE_3__["AddeditresourseserviceComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'SERVICERESOURCEUPDATE' } },
    { path: 'view/:id', component: _serviceresourceview_component__WEBPACK_IMPORTED_MODULE_4__["ServiceresourceviewComponent"] }
];
var ServiceresourceRoutingModule = /** @class */ (function () {
    function ServiceresourceRoutingModule() {
    }
    ServiceresourceRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ServiceresourceRoutingModule);
    return ServiceresourceRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/serviceresource/serviceresource.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/serviceresource/serviceresource.module.ts ***!
  \*****************************************************************/
/*! exports provided: ServiceresourceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceresourceModule", function() { return ServiceresourceModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _serviceresourselist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./serviceresourselist.component */ "./src/app/views/serviceresource/serviceresourselist.component.ts");
/* harmony import */ var _addeditresourseservice_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addeditresourseservice.component */ "./src/app/views/serviceresource/addeditresourseservice.component.ts");
/* harmony import */ var _serviceresourceview_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./serviceresourceview.component */ "./src/app/views/serviceresource/serviceresourceview.component.ts");
/* harmony import */ var _serviceresource_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./serviceresource-routing.module */ "./src/app/views/serviceresource/serviceresource-routing.module.ts");
/* harmony import */ var _resourceskill_resourceskill_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./resourceskill/resourceskill.component */ "./src/app/views/serviceresource/resourceskill/resourceskill.component.ts");
/* harmony import */ var _resourceserviceterritory_serviceresourceterritoryview_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./resourceserviceterritory/serviceresourceterritoryview.component */ "./src/app/views/serviceresource/resourceserviceterritory/serviceresourceterritoryview.component.ts");
/* harmony import */ var _resourceserviicecrew_servicecrewaddedit_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./resourceserviicecrew/servicecrewaddedit.component */ "./src/app/views/serviceresource/resourceserviicecrew/servicecrewaddedit.component.ts");
/* harmony import */ var _serviceappointment_serviceappointment_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./serviceappointment/serviceappointment.component */ "./src/app/views/serviceresource/serviceappointment/serviceappointment.component.ts");
/* harmony import */ var _abcenseaddeditpopup_abcenseaddedit_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./abcenseaddeditpopup/abcenseaddedit.component */ "./src/app/views/serviceresource/abcenseaddeditpopup/abcenseaddedit.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

















var ServiceresourceModule = /** @class */ (function () {
    function ServiceresourceModule() {
    }
    ServiceresourceModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_serviceresourselist_component__WEBPACK_IMPORTED_MODULE_7__["ServiceresourselistComponent"], _addeditresourseservice_component__WEBPACK_IMPORTED_MODULE_8__["AddeditresourseserviceComponent"], _serviceresourceview_component__WEBPACK_IMPORTED_MODULE_9__["ServiceresourceviewComponent"], _resourceskill_resourceskill_component__WEBPACK_IMPORTED_MODULE_11__["ResourceskillComponent"], _resourceserviceterritory_serviceresourceterritoryview_component__WEBPACK_IMPORTED_MODULE_12__["ServiceresourceterritoryviewComponent"], _resourceserviicecrew_servicecrewaddedit_component__WEBPACK_IMPORTED_MODULE_13__["ServicecrewaddeditComponent"], _serviceappointment_serviceappointment_component__WEBPACK_IMPORTED_MODULE_14__["ServiceappointmentComponent"], _abcenseaddeditpopup_abcenseaddedit_component__WEBPACK_IMPORTED_MODULE_15__["AbcenseaddeditComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _serviceresource_routing_module__WEBPACK_IMPORTED_MODULE_10__["ServiceresourceRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"]
            ]
        })
    ], ServiceresourceModule);
    return ServiceresourceModule;
}());



/***/ }),

/***/ "./src/app/views/serviceresource/serviceresourceview.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/views/serviceresource/serviceresourceview.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VyZXNvdXJjZS9zZXJ2aWNlcmVzb3VyY2V2aWV3LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/serviceresource/serviceresourceview.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/serviceresource/serviceresourceview.component.ts ***!
  \************************************************************************/
/*! exports provided: ServiceresourceviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceresourceviewComponent", function() { return ServiceresourceviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _campaign_campaign_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../campaign/campaign.service */ "./src/app/views/campaign/campaign.service.ts");
/* harmony import */ var _serviceresourse_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./serviceresourse.service */ "./src/app/views/serviceresource/serviceresourse.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _resourceskill_resourceskill_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resourceskill/resourceskill.component */ "./src/app/views/serviceresource/resourceskill/resourceskill.component.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _resourceserviceterritory_serviceresourceterritoryview_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./resourceserviceterritory/serviceresourceterritoryview.component */ "./src/app/views/serviceresource/resourceserviceterritory/serviceresourceterritoryview.component.ts");
/* harmony import */ var _resourceserviicecrew_servicecrewaddedit_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resourceserviicecrew/servicecrewaddedit.component */ "./src/app/views/serviceresource/resourceserviicecrew/servicecrewaddedit.component.ts");
/* harmony import */ var _serviceappointment_serviceappointment_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./serviceappointment/serviceappointment.component */ "./src/app/views/serviceresource/serviceappointment/serviceappointment.component.ts");
/* harmony import */ var _abcenseaddeditpopup_abcenseaddedit_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./abcenseaddeditpopup/abcenseaddedit.component */ "./src/app/views/serviceresource/abcenseaddeditpopup/abcenseaddedit.component.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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














var ServiceresourceviewComponent = /** @class */ (function () {
    function ServiceresourceviewComponent(serviceresourseService, router, dialogService, route, toaster, commonService, location) {
        this.serviceresourseService = serviceresourseService;
        this.router = router;
        this.dialogService = dialogService;
        this.route = route;
        this.toaster = toaster;
        this.commonService = commonService;
        this.location = location;
        this.moduleName = 'serviceappointment';
        this.submoduleName = 'serviceresource';
        this.formControlList = [];
        this.loadSave = false;
        this.displayType = 'VIEW';
        this.ServiceResourceName = "";
        this.lstGetServiceTerritoryList = {
            pager: {},
            data: []
        };
        this.lstAppointments = {
            pager: {},
            data: []
        };
        this.lstSkill = {
            pager: {},
            data: []
        };
        this.lstServiceCrew = {
            pager: {},
            data: []
        };
        this.lstAbsence = {
            pager: {},
            data: []
        };
        this.countAbcense = 0;
        this.ServiceAppointmentsCount = 0;
        this.campaignMembersCount = 0;
        this.SkillsCount = 0;
        this.proposalsCount = 0;
        this.leadsCount = 0;
        this.countServiceCrew = 0;
        this.countAbsences = 0;
        this.pageNo = 1;
        this.pageSize = 4;
        this.SkillPageNo = 1;
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.campaignMemberPageNo = 1;
        this.AppointmentPageNo = 1;
        this.AbcensePageNo = 1;
        this.CrewPageNo = 1;
        this.checkboxdataTop = [];
        this.siteurl = '';
        this.checkboxdata1 = [];
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }
    ServiceresourceviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.siteurl = window.location.origin;
        console.log('siteurl', this.siteurl);
        this.loadSave = true;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.Id = id;
        });
        this.GetCustomFieldsList();
        this.getRelatedData();
    };
    ServiceresourceviewComponent.prototype.getRelatedData = function () {
        this.refreshServiceTerritoryList();
        this.refreshAppointmentList();
        this.GetServiceServiceCrewList();
        this.refreshSkillsList();
        this.GetAbcenseList();
    };
    ServiceresourceviewComponent.prototype.close = function () {
        this.router.navigateByUrl("/serviceresource");
    };
    ServiceresourceviewComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        this.displayType = "VIEW";
        this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = result.data;
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _campaign_campaign_service__WEBPACK_IMPORTED_MODULE_2__["CheckboxData"]();
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
                                else {
                                    //cnt.value = null;
                                }
                            });
                        }
                    }
                    //this.EditAbcense
                    //if (cnt.ColumnName == 'ResourceType' || cnt.ColumnName == 'SF_IsActive' ||  cnt.name == 'OwnerId' || cnt.ColumnName=='RelatedRecord_UserID' || cnt.ColumnName == 'StartDate' || cnt.ColumnName == 'EndDate') {
                    //  let row: CampaignTopViewModel = new CampaignTopViewModel();
                    //  if (cnt.ColumnName == 'RelatedRecord_UserID')
                    //    row.DisplayOrder = 2;
                    //  else if (cnt.ColumnName == 'OwnerId')
                    //    row.DisplayOrder = 1;
                    //  if (cnt.ColumnName == 'ResourceType')
                    //    row.DisplayOrder = 3;
                    //  else if (cnt.ColumnName == 'SF_IsActive')
                    //    row.DisplayOrder = 4;
                    //  else if (cnt.ColumnName == 'StartDate')
                    //    row.DisplayOrder = 5;
                    //  else if (cnt.ColumnName == 'EndDate')
                    //    row.DisplayOrder = 6;
                    //  row.ColumnName = cnt.ColumnName;
                    //  row.DisplayName = cnt.display_name;
                    //  row.Value = cnt.value;
                    //  row.field_route = cnt.field_route;
                    //  row.ref_value = cnt.ref_value;
                    //  row.Value = cnt.value;
                    //  this.customCompnentValuesTop.push(row);
                    //  this.customCompnentValuesTop.sort((a, b) => a.DisplayOrder > b.DisplayOrder ? 1 : -1);
                    //}
                    //if (cnt.ColumnName == 'Name') {
                    //  this.ServiceResourceName = cnt.value;
                    //}
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                _this.loadSave = false;
                _this.GetCustomFieldsListTopRow();
            }
        });
    };
    ServiceresourceviewComponent.prototype.GetCustomFieldsListTopRow = function () {
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
                    if (cnt.ColumnName == 'Name') {
                        _this.ServiceResourceName = cnt.value;
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
            }
        }, function (err) {
            _this.loadSave = false;
        }, function () {
            _this.loadSave = false;
        });
    };
    ServiceresourceviewComponent.prototype.onCampaignMembersSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshServiceTerritoryList();
    };
    ServiceresourceviewComponent.prototype.onAppointmentSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshAppointmentList();
    };
    ServiceresourceviewComponent.prototype.onProposalsSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshAppointmentList();
    };
    ServiceresourceviewComponent.prototype.onSkillSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshSkillsList();
    };
    ServiceresourceviewComponent.prototype.onServiceServiceCrewSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.GetServiceServiceCrewList();
    };
    ServiceresourceviewComponent.prototype.onAbsencesSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.GetAbcenseList();
    };
    ServiceresourceviewComponent.prototype.refreshServiceTerritoryList = function () {
        var _this = this;
        this.serviceresourseService.GetServiceTerritoryList(this.Id, this.sortColumn, this.sortDir, this.campaignMemberPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstGetServiceTerritoryList = resp;
            console.log("ConsoleData", _this.lstGetServiceTerritoryList);
            _this.campaignMembersCount = resp.pager.totalItems;
        });
    };
    ServiceresourceviewComponent.prototype.refreshAppointmentList = function () {
        var _this = this;
        this.serviceresourseService.refreshAppointmentList(this.Id, this.sortColumn, this.sortDir, this.AppointmentPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstAppointments = resp;
            _this.ServiceAppointmentsCount = resp.pager.totalItems;
        });
    };
    ServiceresourceviewComponent.prototype.refreshSkillsList = function () {
        var _this = this;
        debugger;
        this.serviceresourseService.refreshSkillsList(this.Id, this.sortColumn, this.sortDir, this.SkillPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstSkill = resp;
            _this.SkillsCount = resp.pager.totalItems;
            console.log("thiskil", _this.lstSkill);
        });
    };
    ServiceresourceviewComponent.prototype.GetServiceServiceCrewList = function () {
        var _this = this;
        this.serviceresourseService.GetServiceServiceCrewList(this.Id, this.sortColumn, this.sortDir, this.CrewPageNo, this.pageSize).subscribe(function (result) {
            _this.lstServiceCrew = result;
            console.log("crew", _this.lstServiceCrew);
            _this.countServiceCrew = result.pager.totalItems;
            console.log("countServiceCrew", _this.countServiceCrew);
        });
    };
    ServiceresourceviewComponent.prototype.GetAbcenseList = function () {
        var _this = this;
        this.serviceresourseService.GetServiceGetAbcenseList(this.Id, this.sortColumn, this.sortDir, this.AbcensePageNo, this.pageSize).subscribe(function (result) {
            _this.lstAbsence = result;
            console.log("crew", _this.lstServiceCrew);
            _this.countAbcense = result.pager.totalItems;
            console.log("countServiceCrew", _this.countServiceCrew);
        });
    };
    ServiceresourceviewComponent.prototype.setcampaignMemberPageNo = function ($event) {
        this.campaignMemberPageNo = $event.page;
        this.refreshServiceTerritoryList();
    };
    ServiceresourceviewComponent.prototype.setProposalsPageNo = function ($event) {
        this.AppointmentPageNo = $event.page;
        this.refreshAppointmentList();
    };
    ServiceresourceviewComponent.prototype.setSkillPageNo = function ($event) {
        this.SkillPageNo = $event.page;
        this.refreshSkillsList();
    };
    ServiceresourceviewComponent.prototype.setServiceCrewPageNo = function ($event) {
        this.CrewPageNo = $event.page;
        this.GetServiceServiceCrewList();
    };
    ServiceresourceviewComponent.prototype.setAppointmentPageNo = function ($event) {
        this.AppointmentPageNo = $event.page;
        this.refreshAppointmentList();
    };
    ServiceresourceviewComponent.prototype.setAbsencesPageNo = function ($event) {
        this.AbcensePageNo = $event.page;
        this.GetAbcenseList();
    };
    ServiceresourceviewComponent.prototype.openSkillPopup = function () {
        this.resourceSkill.show(this.Id);
    };
    ServiceresourceviewComponent.prototype.openServiceTerritoriesPopup = function () {
        this.sourceterritory.show(this.Id);
    };
    ServiceresourceviewComponent.prototype.openServiceCrewPopup = function () {
        this.Servicecrew.show(this.Id);
    };
    ServiceresourceviewComponent.prototype.openServiceAppointmentsPopup = function () {
        this.ServiceAppointment.show(this.Id);
    };
    ServiceresourceviewComponent.prototype.openServiceAbcensePopup = function () {
        this.Serviceabcense.show(this.Id);
    };
    ServiceresourceviewComponent.prototype.EditSkill = function (row) {
        this.resourceSkill.EditSkill(row);
    };
    ServiceresourceviewComponent.prototype.EditTerritory = function (row) {
        this.sourceterritory.EditTerritory(row);
    };
    ServiceresourceviewComponent.prototype.EditCrew = function (row) {
        this.Servicecrew.EditCrew(row);
    };
    ServiceresourceviewComponent.prototype.EditAbcense = function (row) {
        debugger;
        this.Serviceabcense.EditAbcense(row);
    };
    ServiceresourceviewComponent.prototype.resourceSkillEvent = function () {
        this.refreshSkillsList();
    };
    ServiceresourceviewComponent.prototype.resourceSourceterritoryEvent = function () {
        this.refreshServiceTerritoryList();
    };
    ServiceresourceviewComponent.prototype.resourceServicecrewEvent = function () {
        this.GetServiceServiceCrewList();
    };
    ServiceresourceviewComponent.prototype.EditAppoimentment = function (row) {
        this.ServiceAppointment.EditAppoimentment(row);
    };
    ServiceresourceviewComponent.prototype.resourceServiceAppointmentEvent = function () {
        this.refreshAppointmentList();
    };
    ServiceresourceviewComponent.prototype.resourceSourceServiceabcenseEvent = function () {
        this.GetAbcenseList();
    };
    ServiceresourceviewComponent.prototype.deleteSkill = function (row, sectionName) {
        var _this = this;
        var message = "Are you sure you want to delete Service Skill?";
        this.dialogService.confirm('Delete Service Skill', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.serviceresourseService.DeleteRecords(row.Id, 'tblServiceResourceSkill').subscribe(function (res) {
                    _this.toaster.success("Service Skill has been deleted successfully..");
                    _this.SkillPageNo = 1;
                    _this.refreshSkillsList();
                });
            }
        });
    };
    ServiceresourceviewComponent.prototype.deleteTerritory = function (row, sectionName) {
        var _this = this;
        var message = "Are you sure you want to delete Service Territory Member?";
        this.dialogService.confirm('Delete Service Territory Member', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.serviceresourseService.DeleteRecords(row.territoryId, 'tblServiceTerritoryMember').subscribe(function (res) {
                    _this.toaster.success("Service Territory Member has been deleted successfully..");
                    _this.refreshServiceTerritoryList();
                });
            }
        });
    };
    ServiceresourceviewComponent.prototype.deleteCrew = function (row, sectionName) {
        var _this = this;
        var message = "Are you sure you want to delete Service Crew Member?";
        this.dialogService.confirm('Delete Service Crew Member', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.serviceresourseService.DeleteRecords(row.crewMemberId, 'tblServiceCrewMember').subscribe(function (res) {
                    _this.toaster.success("Service Crew Member has been deleted successfully..");
                    _this.GetServiceServiceCrewList();
                });
            }
        });
    };
    ServiceresourceviewComponent.prototype.deleteAppoimentment = function (row, sectionName) {
        var _this = this;
        var message = "Are you sure you want to delete Service Appointment?";
        this.dialogService.confirm('Delete Service Appointment', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.serviceresourseService.DeleteRecords(row.Id, 'tblAssignedResource').subscribe(function (res) {
                    _this.toaster.success("Service Appointment has been deleted successfully..");
                    _this.refreshAppointmentList();
                });
            }
        });
    };
    ServiceresourceviewComponent.prototype.deleteAbcense = function (row, sectionName) {
        var _this = this;
        var message = "Are you sure you want to delete Service Abcense?";
        this.dialogService.confirm('Delete Service Abcense', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.serviceresourseService.DeleteRecords(row.abcenceId, 'tblResourceAbsence').subscribe(function (res) {
                    _this.toaster.success("Service Abcense has been deleted successfully..");
                    _this.GetAbcenseList();
                });
            }
        });
    };
    ServiceresourceviewComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    ServiceresourceviewComponent.ctorParameters = function () { return [
        { type: _serviceresourse_service__WEBPACK_IMPORTED_MODULE_3__["ServiceresourseService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_12__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('resourceSkill', { static: false }),
        __metadata("design:type", _resourceskill_resourceskill_component__WEBPACK_IMPORTED_MODULE_5__["ResourceskillComponent"])
    ], ServiceresourceviewComponent.prototype, "resourceSkill", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sourceterritory', { static: false }),
        __metadata("design:type", _resourceserviceterritory_serviceresourceterritoryview_component__WEBPACK_IMPORTED_MODULE_8__["ServiceresourceterritoryviewComponent"])
    ], ServiceresourceviewComponent.prototype, "sourceterritory", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Servicecrew', { static: false }),
        __metadata("design:type", _resourceserviicecrew_servicecrewaddedit_component__WEBPACK_IMPORTED_MODULE_9__["ServicecrewaddeditComponent"])
    ], ServiceresourceviewComponent.prototype, "Servicecrew", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ServiceAppointment', { static: false }),
        __metadata("design:type", _serviceappointment_serviceappointment_component__WEBPACK_IMPORTED_MODULE_10__["ServiceappointmentComponent"])
    ], ServiceresourceviewComponent.prototype, "ServiceAppointment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Serviceabcense', { static: false }),
        __metadata("design:type", _abcenseaddeditpopup_abcenseaddedit_component__WEBPACK_IMPORTED_MODULE_11__["AbcenseaddeditComponent"])
    ], ServiceresourceviewComponent.prototype, "Serviceabcense", void 0);
    ServiceresourceviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-serviceresourceview',
            template: __importDefault(__webpack_require__(/*! raw-loader!./serviceresourceview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/serviceresourceview.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./serviceresourceview.component.scss */ "./src/app/views/serviceresource/serviceresourceview.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_serviceresourse_service__WEBPACK_IMPORTED_MODULE_3__["ServiceresourseService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_12__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"]])
    ], ServiceresourceviewComponent);
    return ServiceresourceviewComponent;
}());



/***/ }),

/***/ "./src/app/views/serviceresource/serviceresourselist.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/views/serviceresource/serviceresourselist.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlcnZpY2VyZXNvdXJjZS9zZXJ2aWNlcmVzb3Vyc2VsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/serviceresource/serviceresourselist.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/serviceresource/serviceresourselist.component.ts ***!
  \************************************************************************/
/*! exports provided: ServiceresourselistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceresourselistComponent", function() { return ServiceresourselistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _serviceresourse_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serviceresourse.service */ "./src/app/views/serviceresource/serviceresourse.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
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









var ServiceresourselistComponent = /** @class */ (function () {
    function ServiceresourselistComponent(serviceresourseService, dialogService, commonService, router, route, toaster) {
        var _this = this;
        this.serviceresourseService = serviceresourseService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.route = route;
        this.toaster = toaster;
        this.searchUserType = '';
        //modulePermission: ModuleList;
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.moduleName = 'serviceappointment';
        this.submoduleName = 'serviceresource';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.ViewModel = '';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["SelectionType"];
        this.vewId = '';
        this.listFiltertext = '';
        this.custom_view_id = '';
        this.searchFilter = '';
        this.selected = [];
        this.modulePermission = [];
        this.isAdd = true;
        this.isUpdate = true;
        this.isDelete = true;
        this.loadSave = false;
        this.myCheckbox = false;
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICERESOURCEADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICERESOURCEUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'SERVICERESOURCEDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
    }
    ServiceresourselistComponent.prototype.onOpenEdit = function (id) {
        this.router.navigate(['/task/addtask'], { queryParams: { id: id } });
    };
    ServiceresourselistComponent.prototype.onDeleteTask = function (resId) {
        var _this = this;
        var message = "Are you sure you want to delete Task?";
        this.dialogService.confirm('Delete Loanterm', message).subscribe(function (confirmed) {
            _this.serviceresourseService.onDeleteTask(resId, '').subscribe(function (res) {
                _this.toaster.success("Task has been deleted successfully..");
                _this.refresh();
            });
        });
    };
    ServiceresourselistComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.LoadViewData();
        this.getPageSizes();
        this.refresh();
    };
    Object.defineProperty(ServiceresourselistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ServiceresourselistComponent.prototype.refresh = function (pagenum) {
        var _this = this;
        if (pagenum === void 0) { pagenum = 1; }
        this.loadSave = true;
        this.serviceresourseService.GetServiceResourseServiceList(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId, this.myCheckbox)
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
        }, function (error) {
            _this.loadSave = false;
        }, function () {
            _this.loadSave = false;
        });
    };
    ServiceresourselistComponent.prototype.onSelect = function (_a) {
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
    ServiceresourselistComponent.prototype.displayCheck = function (event) {
    };
    ServiceresourselistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Service Resource(s)\"";
            this.dialogService.confirm('Delete Service Resource(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.serviceresourseService.DeleteRecords(_this.deleteId, 'tblServiceResource').subscribe(function (r) {
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
    ServiceresourselistComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete service Resource  \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete service Resource', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loadSave = true;
                _this.serviceresourseService.DeleteRecords(row.ID, 'tblServiceResource').subscribe(function (r) {
                    _this.toaster.success("Service Resource \"" + row.Name + "\" has been deleted successfully");
                    _this.loadSave = false;
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    ServiceresourselistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ServiceresourselistComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    ServiceresourselistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    ServiceresourselistComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    ServiceresourselistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    ServiceresourselistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    ServiceresourselistComponent.prototype.updateFilter = function (event) {
        var text = event.target.value;
        this.listFiltertext = "Name like '%" + text + "%'";
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.refresh();
        }
    };
    ServiceresourselistComponent.prototype.GetcustomViewid = function (event) {
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
    ServiceresourselistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.searchTxt = event;
        this.refresh();
    };
    ServiceresourselistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "Name like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    ServiceresourselistComponent.prototype.reset = function () {
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.myCheckbox = false;
        this.refresh();
    };
    ServiceresourselistComponent.prototype.LoadViewData = function () {
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
        }, function () {
            _this.loadSave = false;
        });
    };
    ServiceresourselistComponent.prototype.SetManageViewValue = function (event, text) {
        debugger;
        this.ViewModel = text;
        this.custom_view_id = event;
        this.refresh();
        //this.LoadViewData();
    };
    ServiceresourselistComponent.prototype.switchClicked = function (event) {
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
    ServiceresourselistComponent.ctorParameters = function () { return [
        { type: _serviceresourse_service__WEBPACK_IMPORTED_MODULE_2__["ServiceresourseService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_8__["SearchfilteraddComponent"])
    ], ServiceresourselistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_7__["ManageviewComponent"])
    ], ServiceresourselistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"])
    ], ServiceresourselistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ServiceresourselistComponent.prototype, "offset", void 0);
    ServiceresourselistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-serviceresourselist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./serviceresourselist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/serviceresource/serviceresourselist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./serviceresourselist.component.scss */ "./src/app/views/serviceresource/serviceresourselist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_serviceresourse_service__WEBPACK_IMPORTED_MODULE_2__["ServiceresourseService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], ServiceresourselistComponent);
    return ServiceresourselistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-serviceresource-serviceresource-module.js.map