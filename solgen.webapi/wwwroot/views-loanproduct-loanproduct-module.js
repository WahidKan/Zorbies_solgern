(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-loanproduct-loanproduct-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/addeditloanproduct.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/addeditloanproduct.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/loanproduct\">Manage Loan Product</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel cntainerwithoutbg clearfix\">\r\n      <div class=\"panel-content clearfix mb-4 p-0\">\r\n        <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n          <!--<li class=\"nav-item\"> <a class=\"nav-link\" [ngClass]=\"IsDetail ? 'show active' : 'hide'\" (click)=\"detailTab()\" id=\"manage-tab\" data-toggle=\"tab\" href=\"#manage-status\" role=\"tab\" aria-selected=\"false\"><span class=\"circle\">1</span> Detail</a> </li>\r\n  <li class=\"nav-item\"> <a class=\"nav-link\" [ngClass]=\"IsPrerequisitedocument ? 'show active' : 'hide'\" (click)=\"prerequisiteTab()\" id=\"lead-tab\" data-toggle=\"tab\" href=\"#prerequisitedocument\" role=\"tab\" aria-selected=\"true\"><span class=\"circle\">2</span> Prerequisite document</a> </li>-->\r\n          <!--<li class=\"nav-item\"> <a class=\"nav-link\" [ngClass]=\"IsRuleEngine ? 'show active' : 'hide'\" id=\"RuleEngine\" (click)=\"c\" data-toggle=\"tab\" href=\"#rule\" role=\"tab\" aria-selected=\"false\"><span class=\"circle\">3</span> Rule Engine</a> </li>-->\r\n          <!--<li class=\"nav-item\"> <a class=\"nav-link\" [ngClass]=\"IsDiscountCategory ? 'show active' : 'hide'\" id=\"DisCategory\" (click)=\"discountCategoryTab()\" data-toggle=\"tab\" href=\"#DiscountCategory\" role=\"tab\" aria-selected=\"false\"><span class=\"circle\">3</span> Discount Category</a> </li>-->\r\n\r\n        </ul>\r\n        <div class=\"tab-content\" id=\"myTabContent\">\r\n\r\n          <div class=\"tab-pane fade\" [ngClass]=\"IsDetail ? 'show active' : 'hide'\" id=\"manage-status\" role=\"tabpanel\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\" [ngClass]=\"{'disabled':loadSave}\">\r\n                <!--<app-dynamicform moduleName=\"crm\" submoduleName=\"lead\"></app-dynamicform>-->\r\n                <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                  <ng-container *ngFor=\"let item of formControlList\">\r\n                    <h3 class=\"form-heading\"><span>{{ item.group_display_name}} </span></h3>\r\n                    <div class=\"row mx-auto mb-2\">\r\n\r\n                      <ng-container *ngFor=\"let inner of item.InnerData\">\r\n                        <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : inner.form_field_visibility == 'NO', 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                             ngShow=\"inner.dependent_show_type == true\">\r\n                          <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO'\" />\r\n                          \r\n                          <label *ngIf=\"(inner.form_field_visibility == 'YES' && inner.display_name!='Company') && !hideCompany\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n                          \r\n                          <label *ngIf=\"inner.form_field_visibility == 'YES' && hideCompany\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n\r\n                          <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES'\">\r\n\r\n\r\n\r\n                            <!--text  [placeholder]=\"inner.display_name\"-->\r\n                            <!--text  [placeholder]=\"inner.display_name\"-->\r\n                            <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                                   [formControlName]=\"inner.form_controlName\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required,inner.actual_data_type)\" [id]=\"inner.custom_field_id\"\r\n                                   [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                                   *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date' && inner.dt_code !='url'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint'\" />\r\n                            <!--<small *ngIf=\"inner.dt_code != 'int' && inner.dt_code!='url' && inner.dt_code != 'bigint' && inner.dt_code != 'decimal' && ((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n  class=\"text-danger\">{{inner.display_name}} is required</small>-->\r\n\r\n\r\n                            <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required,inner.actual_data_type)\"\r\n                                   [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                                   [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                                   *ngIf=\"inner.dt_code == 'int'\" />\r\n                            <!--<small *ngIf=\"inner.dt_code == 'int' && inner.dt_code!='url'  && (form.get(inner.form_controlName).touched && form.get(inner.form_controlName).errors?.required)\"\r\n  class=\"text-danger\">{{inner.display_name}} is required</small>-->\r\n                            <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName)?.touched &&\r\n                       form.get(inner.form_controlName)?.errors?.pattern)\"\r\n                                   class=\"text-danger\">Please enter valid value</small>\r\n\r\n                            <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required,inner.actual_data_type)\"\r\n                                   [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                                   [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                                   *ngIf=\"inner.dt_code == 'bigint'\" />\r\n                            <!--<small *ngIf=\"inner.dt_code == 'bigint'  && (form.get(inner.form_controlName).touched && form.get(inner.form_controlName).errors?.required)\"\r\n  class=\"text-danger\">{{inner.display_name}} is required</small>-->\r\n                            <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName)?.touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                                   class=\"text-danger\">Please enter valid value</small>\r\n                            <!--(ngModelChange)=\"validatorcheck(inner.form_controlName,inner.is_required,inner.actual_data_type,inner.decimal_places)\"-->\r\n                            <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                                   [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                                   [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                                   *ngIf=\"inner.dt_code == 'decimal' && inner.dt_code!='url'  && inner.range_from==null\" />\r\n\r\n                            <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\" (ngModelChange)=\"validatorRange(inner.form_controlName,inner.is_required,inner.actual_data_type,inner.range_from,inner.range_to)\"\r\n                                   [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                                   [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)&&form.get(inner.form_controlName)?.errors?.min && form.get(inner.form_controlName)?.errors?.max) }\"\r\n                                   *ngIf=\"inner.dt_code == 'decimal' && inner.dt_code!='url' && inner.range_from!=null\" />\r\n                            <!--<small *ngIf=\"inner.dt_code == 'decimal' && inner.dt_code!='url' && (form.get(inner.form_controlName).touched &&\r\n  form.get(inner.form_controlName).errors?.required)\"\r\n              class=\"text-danger\">{{inner.display_name}} is required</small>-->\r\n\r\n                            <small *ngIf=\"inner.dt_code == 'decimal' && inner.dt_code!='url' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                                   class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                            <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                            <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required,inner.actual_data_type)\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n\r\n                            <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                            <p-calendar inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\"\r\n                                        [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                            <!--<div class=\"custom-file w-100\">-->\r\n                            <!--<input class=\"custom-file-input form-control\" #file type=\"file\" name='file' *ngIf=\"inner.dt_code == 'url'\" #fileInput accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"setFile($event,inner.form_controlName,i)\" lang=\"es\">\r\n  <label class=\"custom-file-label form-control\" *ngIf=\"inner.dt_code == 'url' && inner.form_controlName=='618_Brochure'\">\r\n    {{fileName}}\r\n\r\n  </label>\r\n  <label class=\"custom-file-label form-control\" *ngIf=\"inner.dt_code == 'url' && inner.form_controlName!='618_Brochure'\">\r\n    {{fileNameImage}}\r\n\r\n  </label>-->\r\n                            <!---Start File upload-->\r\n                            <div class=\"custom-file w-100\" *ngIf=\"inner.dt_code == 'url' && inner.form_controlName=='618_Brochure'\">\r\n                              <input class=\"custom-file-input \" #file type=\"file\" name='file' *ngIf=\"inner.dt_code == 'url'\" #fileInput accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"setFile($event,inner.form_controlName,i)\" lang=\"es\">\r\n                              <label class=\"custom-file-label \" *ngIf=\"inner.dt_code == 'url' && inner.form_controlName=='618_Brochure'\">\r\n                                {{fileName}}\r\n\r\n                              </label>\r\n                            </div>\r\n                            <div class=\"custom-file w-100\" *ngIf=\"inner.dt_code == 'url' && inner.form_controlName!='618_Brochure'\">\r\n                              <input class=\"custom-file-input\" #file type=\"file\" name='file' *ngIf=\"inner.dt_code == 'url'\" #fileInput accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"setFile($event,inner.form_controlName,i)\" lang=\"es\">\r\n                              <label class=\"custom-file-label\" *ngIf=\"inner.dt_code == 'url' && inner.form_controlName!='618_Brochure'\">\r\n                                {{fileNameImage}}\r\n\r\n                              </label>\r\n                            </div>\r\n\r\n                            <!---End  upload-->\r\n\r\n                            <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                              <div class=\"form-check form-check-inline\">\r\n                                <div class=\"custom-control custom-checkbox pl-0\">\r\n                                  <label class=\"switch\">\r\n\r\n                                    <input type=\"checkbox\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\" (click)=\"SetCheckBoxValue(inner.form_controlName,$event)\"\r\n                                           id=\"{{inner.form_controlName}}\" [formControlName]=\"inner.form_controlName\">\r\n                                    <span class=\"slider round\" id=\"{{inner.form_controlName}}\"><span>Yes</span></span>\r\n                                  </label>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <!--Radio button-->\r\n                            <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                              <div class=\"form-check form-check-inline\" *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n                                <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                                  <input id=\"'rdo_'+ {{inner.custom_field_id}}+ '_' + {{option.value}}\" class=\"dynamic custom-control-input\"\r\n                                         [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n                                  <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"'rdo_'+ {{inner.custom_field_id}}+ '_' + {{option.value}}\">{{option.name}}</label>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n\r\n\r\n                            <select [(ngModel)]=\"inner.form_controlName\" [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.picklist_options == 'LOOKUP' && inner.dt_code=='select' && inner.dropdown_type=='normal' }\" *ngIf=\"inner.picklist_options == 'LOOKUP' && inner.dt_code=='select' && inner.dropdown_type=='normal'\" (change)='onOptionsSelected($event,inner)'>\r\n                              <option value=\"\">Select</option>\r\n\r\n                              <option [value]=\"option.name\"\r\n                                      *ngFor=\"let option of MakeNormalArray(inner.select_options)\">\r\n                                {{option.name}}\r\n                              </option>\r\n                            </select>\r\n\r\n\r\n                            <!--Dropdown\r\n    picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n  -->\r\n                            <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select' && inner.picklist_options!=''\" [(ngModel)]=\"inner.form_controlName\"\r\n          (change)='onOptionsSelected($event,inner)'>\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.name\"\r\n            *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n      {{option.name}}\r\n    </option>\r\n\r\n  </select>-->\r\n                            <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" class=\"form-control\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                                       *ngIf=\"((inner.dt_code=='select' && inner.picklist_options=='') && (inner.display_name!='Company' && inner.picklist_options!='true'))\"\r\n                                       [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                            </ng-select>\r\n\r\n\r\n                            <ng-select [items]=\"lstCompant\" [id]=\"inner.form_controlName\" [multiple]=\"true\" class=\"form-control\"\r\n                                       [closeOnSelect]=\"true\" placeholder=\"Select\" (ngModelChange)=\"validator(inner.form_controlName,inner.is_required)\"\r\n                                       *ngIf=\"((hideCompany && inner.display_name=='Company') && inner.picklist_options=='true')\"\r\n                                       [formControlName]=\"inner.form_controlName\" bindLabel=\"companyName\"\r\n                                       bindValue=\"companyId\">\r\n\r\n                            </ng-select>\r\n\r\n                            <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" class=\"form-control\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                                       *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true' && inner.display_name!='Company'\"\r\n                                       [formControlName]=\"inner.form_controlName\"\r\n                                       [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                            </ng-select>\r\n                            <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                                   class=\"text-danger\">{{inner.display_name}} is required</small>\r\n                          </div>\r\n\r\n\r\n                        </div>\r\n                      </ng-container>\r\n\r\n                    </div>\r\n                  </ng-container>\r\n                </form>\r\n                <div class=\"row mb-3\">\r\n                  <div class=\"col-md-12\">\r\n                    <form [formGroup]=\"configurationSetings\">\r\n                      <div class=\"w-100\" [ngClass]=\"{'disabled':loading}\">\r\n                        <h3 class=\"form-heading mt-0\"><span>Applicable CB</span></h3>\r\n                        <div class=\"row\">\r\n                          <div class=\"col-12\">\r\n                            <div class=\"table-responsive\">\r\n                              <table class=\"table mb-0\">\r\n                                <thead class=\"thead-bg\">\r\n                                  <tr>\r\n                                    <th>Credit Bureau</th>\r\n                                    <th>Soft Pull</th>\r\n                                    <th>Hard Pull</th>\r\n\r\n                                  </tr>\r\n                                </thead>\r\n                                <tbody formArrayName=\"fields\">\r\n                                  <tr [formGroupName]=\"i\" *ngFor=\"let field of fields.controls; let i=index\">\r\n                                    <td>\r\n                                      <span id=\"{{'stagename' + i}}\">{{field.get('bureauName').value}}</span>\r\n\r\n                                    </td>\r\n                                    <td>\r\n                                      <label class=\"switch\" *ngIf=\"field.get('iscEnableSoftPull').value\">\r\n                                        <input type=\"checkbox\" formControlName=\"isEnableSoftPull\" />\r\n\r\n                                        <span class=\"slider round\"><span>Yes</span></span>\r\n                                      </label>\r\n                                    </td>\r\n                                    <td>\r\n                                      <label class=\"switch\" *ngIf=\"field.get('iscEnableHardPull').value\">\r\n                                        <input type=\"checkbox\" formControlName=\"isEnableHardPull\">\r\n                                        <span class=\"slider round\"><span>Yes</span></span>\r\n                                      </label>\r\n                                    </td>\r\n                                  </tr>\r\n                                </tbody>\r\n                              </table>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </form>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"row mb-3\">\r\n                  <div class=\"col-sm-12 pt-3\">\r\n                    <a href=\"javascript:void(0);\" class=\"btn btn-success px-4 mr-1\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit </a>\r\n                    <!--<i class=\"fa fa-angle-double-right\"></i>-->\r\n                    <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"tab-pane fade\" id=\"prerequisitedocument\" [ngClass]=\"IsPrerequisitedocument ? 'show active' : 'hide'\" role=\"tabpanel\">\r\n            <div class=\"addabsoultebtn ml-md-0\" *ngIf=\"addOrUpdatePermission\"><a href=\"javascript:void(0);\" (click)=\"AddNewPrerequisiteDocument()\" class=\"btn btn-primary\"><i class=\"fa fa-plus\"></i> Add New </a></div>\r\n            <div class=\"row  mb-3\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <div class=\"col-md-12\">\r\n                <form [formGroup]=\"configurationSetings\">\r\n                  <div class=\"w-100\" [ngClass]=\"{'disabled':loading}\">\r\n                    <h3 class=\"form-heading mt-0\"><span>Prerequisite Document</span></h3>\r\n                    <div class=\"row\">\r\n                      <div class=\"col-12\">\r\n                        <div class=\"pagination2 table-responsive\">\r\n                          <table class=\"table mb-0\">\r\n                            <thead class=\"thead-bg\">\r\n                              <tr>\r\n                                <th>Document Type</th>\r\n                                <th>Visiblity</th>\r\n                                <th>Mandatory</th>\r\n                                <th class=\"text-center\">Action</th>\r\n                              </tr>\r\n                            </thead>\r\n                            <tbody formArrayName=\"fieldsPrerequisiteLoan\">                              \r\n                              <tr [formGroupName]=\"i\" *ngFor=\"let fieldName of fieldsPrerequisiteLoan.controls; let i=index\">                              \r\n                                <td>\r\n                                  <span>{{fieldName.get('documentName').value}}</span>\r\n\r\n                                </td>\r\n\r\n                                <td>                                \r\n                                  <span *ngIf=\"fieldName.get('isVisible').value\">Yes</span>\r\n                                  <span *ngIf=\"!fieldName.get('isVisible').value\">No </span>\r\n\r\n                                </td>\r\n                                <td>\r\n                                  <span *ngIf=\"fieldName.get('isMandatory').value\">Mandatory</span>\r\n                                  <span *ngIf=\"!fieldName.get('isVisible').value && !fieldName.get('isMandatory').value\">No </span>\r\n                                  <span *ngIf=\"fieldName.get('isVisible').value && !fieldName.get('isMandatory').value\">Optional</span>\r\n                                </td>\r\n                                <td align=\"center\" *ngIf=\"addOrUpdatePermission\">\r\n                                  <a title=\"Click to edit.\" class=\"mr-2\"\r\n                                     href=\"javascript:void(0);\" (click)=\"UpdatePrerequisiteDocument(fieldName)\"><i class=\"fa fa-pencil text-info\"></i></a>\r\n\r\n                                  <a title=\"Click to delete.\" (click)=\"DeletePrerequisiteLoan(fieldName.get('documentTypeId').value,fieldName.get('documentName').value)\"\r\n                                     href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                                </td>\r\n                              </tr>\r\n                            </tbody>\r\n                          </table>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </form>\r\n\r\n                <div class=\"row mb-1\">\r\n                  <div class=\"col-md-12 pt-4\">\r\n                    <a href=\"javascript:void(0);\" class=\"btn btn-secondary mr-1\" (click)=\"DiscountPrerequisitedocumentPrevious()\"><i class=\"fa fa-angle-double-left\"></i> Prevoius</a>\r\n                    <!--<a href=\"javascript:void(0);\" class=\"btn btn-primary px-4 mr-1\" (click)=\"DiscountPrerequisitedocumentPrevioud()\">Prevoius <i class=\"fa fa-angle-double-right\"></i></a>-->\r\n                    <a href=\"javascript:void(0);\" class=\"btn btn-primary px-4 mr-1\" (click)=\"PrerequisitedocumentNext()\">Next <i class=\"fa fa-angle-double-right\"></i></a>\r\n                    <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"tab-pane fade\" id=\"DiscountCategory\" role=\"tabpanel\" [ngClass]=\"IsDiscountCategory ? 'show active' : 'hide'\">\r\n            <div class=\"addabsoultebtn ml-md-0\" *ngIf=\"addOrUpdatePermission\"><a href=\"javascript:void(0);\" (click)=\"AddNewCategory()\" class=\"btn btn-primary\"><i class=\"fa fa-plus\"></i> Add New Category </a></div>\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-12 \" [ngClass]=\"{'disabled':loadSave}\">\r\n                <form [formGroup]=\"configurationSetings\">\r\n                  <div class=\"w-100\" [ngClass]=\"{'disabled':loading}\">\r\n                    <h3 class=\"form-heading mt-0\"><span _ngcontent-c1=\"\">Discount Category</span></h3>\r\n                    <div class=\"row\">\r\n                      <div class=\"col-12\">\r\n                        <div class=\"pagination2 table-responsive\">\r\n                          <table class=\"table mb-0\">\r\n                            <thead class=\"thead-bg\">\r\n                              <tr>\r\n                                <th>Category Name</th>\r\n                                <th>Active</th>\r\n                                <th>Discount %</th>\r\n                                <th class=\"text-center\" *ngIf=\"addOrUpdatePermission\">Action</th>\r\n                              </tr>\r\n                            </thead>\r\n                            <tbody formArrayName=\"loanProductDiscountCategory\">\r\n                              <tr [formGroupName]=\"i\" *ngFor=\"let discountFieldName of loanProductDiscountCategory.controls; let i=index\">\r\n                                <td>\r\n                                  <span>{{discountFieldName.get('documentName').value}}</span>\r\n\r\n                                </td>\r\n                                <td>\r\n                                  <label class=\"switch\">\r\n                                    <input type=\"checkbox\" formControlName=\"mendatory\" />\r\n\r\n                                    <span class=\"slider round\"><span>Yes</span></span>\r\n                                  </label>\r\n                                </td>\r\n                                <td>\r\n                                  <div class=\"form-group\">\r\n                                    <input type=\"text\" placeholder=\"Enter Discount\" class=\"form-control\" maxlength=\"50\" formControlName=\"discount\" />\r\n                                  </div>\r\n                                </td>\r\n                                <td align=\"center\" *ngIf=\"addOrUpdatePermission\">\r\n                                  <a title=\"Click to delete.\" (click)=\"DeleteDiscountCategory(discountFieldName.get('documentId').value,discountFieldName.get('documentName').value)\"\r\n                                     href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                                </td>\r\n                              </tr>\r\n                            </tbody>\r\n                          </table>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </form>\r\n                <div class=\"row mb-3\">\r\n                  <div class=\"col-md-12 pt-4\">\r\n                    <a href=\"javascript:void(0);\" class=\"btn btn-secondary mr-1\" (click)=\"DiscountPrevious()\"><i class=\"fa fa-angle-double-left\"></i> Prevoius </a>\r\n                    <a href=\"javascript:void(0);\" *ngIf=\"addOrUpdatePermission\" class=\"btn btn-success mr-1\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                    <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n<app-addprerequisitedocument #presiteDocument (prerequisiteDocument)=\"prerequisiteDocument($event)\"></app-addprerequisitedocument>\r\n<app-discountcategory #discountDocument (discountDocuments)=\"discountDocuments()\"></app-discountcategory>\r\n<app-updateprerequisitedocument #updatePresiteDocuments (updatePresiteDocument)=\"updatePresiteDocument($event)\"></app-updateprerequisitedocument>\r\n<!--<app-updateprerequisitedocument #updatePresiteDocuments ></app-updateprerequisitedocument>-->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/addprerequisitedocument/addprerequisitedocument.component.html":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/addprerequisitedocument/addprerequisitedocument.component.html ***!
  \****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #presiteDocument=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\" style=\"z-index:1\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Add Prerequisite Document</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"prerequisiteDocumentForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Document Name:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Document Name\" formControlName=\"documentName\"\r\n                       [ngClass]=\"{'is-invalid': (documentName.invalid && (documentName.dirty || documentName.touched) && (documentName.errors?.required || documentName.errors?.maxlength)) }\">\r\n                <small *ngIf=\"documentName.invalid && (documentName.dirty || documentName.touched) && documentName.errors?.required\"\r\n                       class=\"text-danger\">Document Name is required</small>\r\n                <small *ngIf=\"documentName.invalid && (documentName.dirty || documentName.touched) && documentName.errors?.maxlength\"\r\n                       class=\"text-danger\">Document Name must be less than 100 characters.</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-2 col-lg-2\">\r\n              <label>Visible:</label>\r\n              <div class=\"form-group\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" formControlName=\"isVisible\"/>\r\n                  <span class=\"slider round\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"isVisible.value\" class=\"col-12 col-md-2 col-lg-2\">\r\n              <label>Mandatory:</label>\r\n              <div class=\"form-group\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" formControlName=\"isMandatory\"/>\r\n                  <span class=\"slider round\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\" [hidden]=\"!isVisible.value\">\r\n            <div class=\"col-12\" formArrayName=\"employmentTypeList\">\r\n\r\n              <div class=\"custom-control custom-checkbox custom-control-inline\" *ngFor=\"let data of employmentTypeList.controls; let i=index\" [formGroupName]=\"i\" >                \r\n                <input type=\"checkbox\" class=\"custom-control-input\" id=\"emp-type-update-{{i}}\" formControlName=\"SelectedValue\" />\r\n                <label class=\"custom-control-label\" for=\"emp-type-update-{{i}}\">{{data.get('name').value}}</label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n          \r\n      </div>\r\n\r\n        <div class=\"modal-footer\">\r\n          <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"sendDataToDocumentType()\"><i class=\"fa fa-save text-white\"></i> Submit</button>\r\n          <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n        </div>\r\n        <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n      </div>\r\n  </div>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/discountcategory/discountcategory.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/discountcategory/discountcategory.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #discountDocument=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\" style=\"z-index:1\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Add Discount Category Document</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Document Name:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Document Name\" formControlName=\"documentName\"\r\n                       [ngClass]=\"{'is-invalid': (documentName.invalid && (documentName.dirty || documentName.touched) && (documentName.errors?.required || documentName.errors?.maxlength)) }\">\r\n                <small *ngIf=\"documentName.invalid && (documentName.dirty || documentName.touched) && documentName.errors?.required\"\r\n                       class=\"text-danger\">Document Name is required</small>\r\n                <small *ngIf=\"documentName.invalid && (documentName.dirty || documentName.touched) && documentName.errors?.maxlength\"\r\n                       class=\"text-danger\">Document Name must be less than 100 characters.</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Active:</label>\r\n              <div class=\"form-group\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" />\r\n                  <span class=\"slider round\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"sendDataToDocumentType()\"><i class=\"fa fa-save text-white\"></i> Submit</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/loanproductlist.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/loanproductlist.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Loan Product</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Loan Product</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Product Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"dt-buttons\">\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i> </span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/loanproduct/addloanproduct\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add Loan Product\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns addt-btn\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n              <!-- <input type=\"button\" class=\"btn btn-primary form-btns mr-1\" value=\"Manage View\"/> <a routerLink=\"/lead/Import\" class=\"btn btn-danger form-btns \"><i class=\"fa fa-trash\"></i> Delete</a>-->\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                          \r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE=='date'\">\r\n                {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n              </div>\r\n\r\n              <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldType != 'select' && col.COLUMN_NAME=='ProductName'\">\r\n                \r\n                <a *ngIf='isUpdate' class=\"actions-onclick view-list\" [routerLink]=\"['/loanproduct/editloanproduct',row.Id]\" title=\"Edit\">{{row[col.COLUMN_NAME] |  truncate}}</a>\r\n\r\n              </div>\r\n              <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldType != 'select' && col.COLUMN_NAME!='ProductName'\">\r\n                {{row[col.COLUMN_NAME] |  truncate}}\r\n              </div>\r\n              <div *ngIf=\"col.FieldType == 'select'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                  {{row[col.COLUMN_NAME] |  truncate}}\r\n                </div>\r\n                <div *ngIf=\"col.FieldFrom==null\">\r\n                  <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                    <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                      {{itemColorCode.color}}\r\n                    </div>\r\n                    <div *ngIf=\"itemColorCode.colorkey!=undefined\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                      {{itemColorCode.color}}\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n            <!--<ng-template let-row=\"row\" ngx-datatable-cell-template *ngIf=\"col.DISPLAY_NAME=='Product Name' && (modulePermission!==null && modulePermission.roleModuleAddFlag)\">\r\n              <div [title]=\"row[col.COLUMN_NAME]\">\r\n                <a [routerLink]=\"['/loanproduct/editloanproduct',row.Id]\">{{row[col.COLUMN_NAME] |  truncate}} </a>\r\n              </div>\r\n            </ng-template>-->\r\n\r\n\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <!--<div class=\"text-center\">\r\n\r\n                <a *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag' [routerLink]=\"['/loanproduct/editloanproduct',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                <a *ngIf='modulePermission!==null && modulePermission.roleModuleDeleteFlag' title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n              </div>-->\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.Id\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.Id}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n\r\n                    <a *ngIf='isUpdate' class=\"actions-onclick view-list\" [routerLink]=\"['/loanproduct/editloanproduct',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n\r\n\r\n\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div class=\"page-count\">\r\n                {{rowCount}} total\r\n              </div>\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"finance\" subModuleName=\"loanproduct\"></app-searchfilteradd>\r\n<app-manageview (customViewid)=\"GetcustomViewid($event)\" #templateManageView moduleName=\"finance\" subModuleName=\"loanproduct\"></app-manageview>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/updateprerequisitedocument/updateprerequisitedocument.component.html":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/updateprerequisitedocument/updateprerequisitedocument.component.html ***!
  \**********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #updatePresiteDocuments=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\" style=\"z-index:1\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Edit Prerequisite Document</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"prerequisiteDocumentForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Document Name:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Document Name\" formControlName=\"documentName\"\r\n                       [ngClass]=\"{'is-invalid': (documentName.invalid && (documentName.dirty || documentName.touched) && (documentName.errors?.required || documentName.errors?.maxlength)) }\">\r\n                <small *ngIf=\"documentName.invalid && (documentName.dirty || documentName.touched) && documentName.errors?.required\"\r\n                       class=\"text-danger\">Document Name is required</small>\r\n                <small *ngIf=\"documentName.invalid && (documentName.dirty || documentName.touched) && documentName.errors?.maxlength\"\r\n                       class=\"text-danger\">Document Name must be less than 100 characters.</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-2 col-lg-2\">\r\n              <label>Visible:</label>\r\n              <div class=\"form-group\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" formControlName=\"isVisible\" />\r\n                  <span class=\"slider round\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"isVisible.value\" class=\"col-12 col-md-2 col-lg-2\">\r\n              <label>Mandatory:</label>\r\n              <div class=\"form-group\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" formControlName=\"isMandatory\" />\r\n                  <span class=\"slider round\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\" [hidden]=\"!isVisible.value\">\r\n            <div class=\"col-12\" formArrayName=\"employmentTypeList\">\r\n\r\n              <div class=\"custom-control custom-checkbox custom-control-inline\" *ngFor=\"let data of employmentTypeList.controls; let i=index\" [formGroupName]=\"i\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" id=\"emp-type{{i}}\" formControlName=\"SelectedValue\" />\r\n                <label class=\"custom-control-label\" for=\"emp-type{{i}}\">{{data.get('name').value}}</label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"UpdatePresiteDocuments()\"><i class=\"fa fa-save text-white\"></i> Submit</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/loanproduct/addeditloanproduct.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/views/loanproduct/addeditloanproduct.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xvYW5wcm9kdWN0L2FkZGVkaXRsb2FucHJvZHVjdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/loanproduct/addeditloanproduct.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/loanproduct/addeditloanproduct.component.ts ***!
  \*******************************************************************/
/*! exports provided: AddeditloanproductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditloanproductComponent", function() { return AddeditloanproductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _loanproduct_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loanproduct.service */ "./src/app/views/loanproduct/loanproduct.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _addprerequisitedocument_addprerequisitedocument_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./addprerequisitedocument/addprerequisitedocument.component */ "./src/app/views/loanproduct/addprerequisitedocument/addprerequisitedocument.component.ts");
/* harmony import */ var _department_department_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../department/department.service */ "./src/app/views/department/department.service.ts");
/* harmony import */ var _discountcategory_discountcategory_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./discountcategory/discountcategory.component */ "./src/app/views/loanproduct/discountcategory/discountcategory.component.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _updateprerequisitedocument_updateprerequisitedocument_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./updateprerequisitedocument/updateprerequisitedocument.component */ "./src/app/views/loanproduct/updateprerequisitedocument/updateprerequisitedocument.component.ts");
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












var AddeditloanproductComponent = /** @class */ (function () {
    function AddeditloanproductComponent(fb, loanproductService, router, toaster, dialogService, route, commonService) {
        var _this = this;
        this.fb = fb;
        this.loanproductService = loanproductService;
        this.router = router;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.route = route;
        this.commonService = commonService;
        this.loading = false;
        this.config = [];
        this.moduleName = 'finance';
        this.submoduleName = 'loanproduct';
        this.loadSave = false;
        this.pageTitle = 'Loan Product';
        this.checkboxdata1 = [];
        this.addOrUpdatePermission = false;
        this.showChild = false;
        this.fileName = 'Select File';
        this.fileNameImage = 'Select File';
        this.isLead = false;
        this.creditBureauModel = [];
        this.manageLoanProductModel = new _loanproduct_service__WEBPACK_IMPORTED_MODULE_2__["ManageLoanProductModel"]();
        this.formControlList = [];
        this.errors = [];
        this.IsPrerequisitedocument = false;
        this.IsRuleEngine = false;
        this.IsDiscountCategory = false;
        this.IsDetail = false;
        this.hideCompany = false;
        this.modulePermission = [];
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.sp_name = 'sp_solgen_AddEditDepartment_custom';
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
    ;
    AddeditloanproductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.leadId = '';
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.leadId = id;
                _this.isLead = true;
                _this.pageTitle = 'Edit Loan product';
                //this.fillLeadForm(this.leadId);
                _this.GetCreditBureauEdit(_this.leadId);
                _this.GetMasterPrerequisiteLoanProductDocumentTypeEdit(_this.leadId);
                _this.GetLoanProductDiscountCategoryEdit(_this.leadId);
            }
            else {
                _this.pageTitle = 'Add Loan product';
                _this.GetCreditBureau();
                //  this.GetMasterPrerequisiteLoanProductDocumentType();
                _this.GetLoanProductDiscountCategory();
            }
        });
        this.IsDetail = true;
        this.loadSave = true;
        this.loanproductService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.leadId).subscribe(function (result) {
            if (result) {
                console.log('123123213', _this.loanproductService.customFieldsList.data);
                //this.form.setValue(null);
                _this.customCompnentValues = _this.loanproductService.customFieldsList.data;
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _department_department_service__WEBPACK_IMPORTED_MODULE_8__["CheckboxData"]();
                        checkdata.controlname = t.ColumnName;
                        _this.checkboxdata1.push(checkdata);
                    }
                    if (t.dt_code == 'select' && t.picklist_options == 'true' && t.value !== "") {
                        t.value = JSON.parse(t.value);
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
                    var decimalPlace = '';
                    if (cnt.actual_data_type == "decimal") {
                        decimalPlace = _this.commonService.getUpToDecimalPoint(cnt.decimal_places);
                    }
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(." + decimalPlace + "?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                if (_this.form.value['622_ShareProduct'] == true) {
                    _this.hideCompany = true;
                    _this.loanproductService.getSolgenUserForCompany().subscribe(function (response) {
                        _this.lstCompant = _this.loanproductService.company;
                    });
                }
                if (_this.leadId != null && _this.leadId != 0) {
                }
            }
        });
        this.loadSave = false;
    };
    AddeditloanproductComponent.prototype.initForm = function () {
        this.configurationSetings = this.fb.group({
            fields: this.fb.array([]),
            fieldsPrerequisiteLoan: this.fb.array([]),
            loanProductDiscountCategory: this.fb.array([]),
        });
    };
    AddeditloanproductComponent.prototype.SetCheckBoxValue = function (name, event) {
        var _this = this;
        if (event.target.checked) {
            this.form.controls[name].setValue(event.srcElement.checked);
            if (name === '622_ShareProduct') {
                this.hideCompany = true;
                this.loanproductService.getSolgenUserForCompany().subscribe(function (response) {
                    _this.lstCompant = _this.loanproductService.company;
                });
            }
        }
        else {
            if (name === '622_ShareProduct') {
                this.form.controls[name].setValue(event.srcElement.checked);
                this.hideCompany = false;
            }
            else {
                this.form.controls[name].setValue(event.srcElement.checked);
            }
        }
    };
    Object.defineProperty(AddeditloanproductComponent.prototype, "fields", {
        get: function () {
            return this.configurationSetings.get('fields');
        },
        enumerable: true,
        configurable: true
    });
    AddeditloanproductComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        input.append('ProductId', this.leadId);
        input.append('companyId', this.companyId.value);
        input.append('moduleName', this.moduleName);
        input.append('submoduleName', this.submoduleName);
        input.append('fieldsData', JSON.stringify(this.form.value));
        var data = this.fields.value;
        input.append('applicableCB', JSON.stringify(data));
        input.append('fieldsPrerequisiteLoan', JSON.stringify(this.fieldsPrerequisiteLoan.value));
        input.append('loanProductDiscountCategory', JSON.stringify(this.loanProductDiscountCategory.value));
        if (this.commonService.isUploadImageValid) {
            if (this.fileName !== null) {
                input.append('filename', this.fileName);
            }
        }
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            input.append('file', fileBrowser.files[0]);
        }
        if (fileBrowser.files && fileBrowser.files[0] && this.fileNameImage != null) {
            input.append('fileNameImage', fileBrowser.files[0]);
        }
        return input;
    };
    AddeditloanproductComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loadSave = true;
        var data = this.fields.value;
        this.loadSave = true;
        if (this.hideCompany == true) {
            this.form.controls['623_SharedCompany'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.form.controls['623_SharedCompany'].updateValueAndValidity();
        }
        else {
            this.form.controls['623_SharedCompany'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator);
            this.form.controls['623_SharedCompany'].updateValueAndValidity();
        }
        if (this.form.valid) {
            var loanproductModel = this.prepareFormDataForDocument();
            this.loanproductService.addOrUpdateManageStatus(loanproductModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.fileInput.nativeElement.value = "";
                    _this.router.navigateByUrl("/loanproduct");
                    //this.SetStatusData(this.field);
                    setTimeout(function () { _this.loadSave = false; }, 3000);
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
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
    AddeditloanproductComponent.prototype.fillLeadForm = function (id) {
        var _this = this;
        this.loanproductService.GetLoanProduct(id, this.moduleName, this.submoduleName).subscribe(function (result) {
            var edit;
            if (_this.loanproductService.leadEditPage.responseCode != 200) {
                edit = _this.loanproductService.leadEditPage.data[0];
                if (result) {
                    var group_2 = {};
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
                        group_2[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                            cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                    cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                        ]);
                    });
                    _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_2);
                    _this.loadSave = false;
                    console.log("622_ShareProduct", _this.form.value['622_ShareProduct']);
                    if (_this.form.value['622_ShareProduct'] == true) {
                        _this.hideCompany = true;
                        _this.loanproductService.getSolgenUserForCompany().subscribe(function (response) {
                            _this.lstCompant = _this.loanproductService.company;
                        });
                    }
                }
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditloanproductComponent.prototype.validatorRange = function (controlName, isRequired, dataType, range_from, range_to) {
        if (isRequired == true && dataType == 'int') {
            var validators = [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}")];
            this.form.controls[controlName].setValidators(validators);
            this.form.controls[controlName].updateValueAndValidity();
            //cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            //  cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
            //    cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
            //      Validators.nullValidator
        }
        else if (isRequired == true && dataType == 'bigint') {
            var validators = [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}")];
            this.form.controls[controlName].setValidators(validators);
            this.form.controls[controlName].updateValueAndValidity();
        }
        else if (isRequired == true && dataType == 'decimal' && range_from == null) {
            var validators = [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")];
            this.form.controls[controlName].setValidators(validators);
            this.form.controls[controlName].updateValueAndValidity();
        }
        else if (isRequired == true && dataType == 'decimal' && range_from != null) {
            var validators = [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?"), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(range_from), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].max(range_to)];
            this.form.controls[controlName].setValidators(validators);
            this.form.controls[controlName].updateValueAndValidity();
        }
        else {
            this.form.controls[controlName].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator);
            this.form.controls[controlName].updateValueAndValidity();
        }
    };
    AddeditloanproductComponent.prototype.validatorcheck = function (controlName, isRequired, dataType, decimalplaces) {
        var decimalPlace = '';
        if (dataType == "decimal") {
            decimalPlace = this.commonService.getUpToDecimalPoint(decimalplaces);
        }
        var validators = [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(." + decimalPlace + "?)?")];
        this.form.controls[controlName].setValidators(validators);
        this.form.controls[controlName].updateValueAndValidity();
    };
    AddeditloanproductComponent.prototype.validator = function (controlName, isRequired, dataType) {
        if (isRequired == true && dataType == 'int') {
            var validators = [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}")];
            this.form.controls[controlName].setValidators(validators);
            this.form.controls[controlName].updateValueAndValidity();
            //cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            //  cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
            //    cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
            //      Validators.nullValidator
        }
        else if (isRequired == true && dataType == 'bigint') {
            var validators = [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}")];
            this.form.controls[controlName].setValidators(validators);
            this.form.controls[controlName].updateValueAndValidity();
        }
        else if (isRequired == true && dataType == 'decimal') {
            var validators = [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?")];
            this.form.controls[controlName].setValidators(validators);
            this.form.controls[controlName].updateValueAndValidity();
        }
        else {
            this.form.controls[controlName].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator);
            this.form.controls[controlName].updateValueAndValidity();
        }
    };
    AddeditloanproductComponent.prototype.MakeArray = function (value, type) {
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
    AddeditloanproductComponent.prototype.MakeNormalArray = function (value) {
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
    AddeditloanproductComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
            //objItem.select_options = array;
        }
        return array;
    };
    AddeditloanproductComponent.prototype.setFile = function ($event, name, index) {
        if (name == '618_Brochure') {
            this.commonService.uploadImageFileValidator($event);
            this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB");
            if (this.commonService.isFileValid) {
                this.fileName = $event.target.files[0].name;
                this.fileName = ($event.target.files[0].name);
                this.form.controls[name].setValue(this.fileName);
            }
        }
        else {
            this.commonService.uploadImageFileValidator($event);
            this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB");
            if (this.commonService.isFileValid) {
                this.fileNameImage = $event.target.files[0].name;
                this.fileNameImage = ($event.target.files[0].name);
                this.form.controls[name].setValue(this.fileNameImage);
            }
        }
    };
    AddeditloanproductComponent.prototype.GetCreditBureau = function () {
        var _this = this;
        var current = this;
        this.loanproductService.getNames().subscribe(function (result) {
            _this.creditBureauModel = result;
            result.forEach(function (value) {
                var group = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                    id: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.id),
                    bureauName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.bureauName),
                    isEnableSoftPull: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false),
                    iscEnableSoftPull: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.isEnableHardPull),
                    isEnableHardPull: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false),
                    iscEnableHardPull: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.isEnableSoftPull),
                });
                current.fields.push(group);
            });
        });
    };
    AddeditloanproductComponent.prototype.GetMasterPrerequisiteLoanProductDocumentType = function () {
        console.log('get list');
        var current = this;
        current.fieldsPrerequisiteLoan.reset();
        this.loanproductService.getPrerequisiteLoanProductDocumentTypeNames('PrerequisiteLoanProductDocumentType').subscribe(function (result) {
            result.forEach(function (value) {
                console.log(value);
                var group = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                    documentId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.documentId),
                    documentTypeId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.documentTypeId),
                    documentName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.documentName),
                    mendatory: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false),
                    visibility: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false)
                });
                current.fieldsPrerequisiteLoan.push(group);
            });
        });
    };
    AddeditloanproductComponent.prototype.GetLoanProductDiscountCategory = function () {
        var current = this;
        this.loanproductService.getGetLoanProductDiscountCategoryNames('LoanProductDiscountCategory').subscribe(function (result) {
            result.forEach(function (value) {
                var group = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                    documentId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.documentId),
                    documentName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.documentName),
                    mendatory: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false),
                    discount: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.discount)
                });
                current.loanProductDiscountCategory.push(group);
            });
        });
    };
    AddeditloanproductComponent.prototype.GetCreditBureauEdit = function (id) {
        var current = this;
        this.loanproductService.getNamesEdit(id).subscribe(function (result) {
            result.forEach(function (value) {
                var group = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                    id: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.id),
                    bureauName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.bureauName),
                    isEnableSoftPull: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.isEnableHardPull),
                    iscEnableSoftPull: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](true),
                    isEnableHardPull: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.isEnableSoftPull),
                    iscEnableHardPull: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](true),
                });
                current.fields.push(group);
            });
        });
    };
    AddeditloanproductComponent.prototype.GetMasterPrerequisiteLoanProductDocumentTypeEdit = function (id) {
        console.log('abcbcbcb', this.fieldsPrerequisiteLoan.length);
        var current = this;
        while (this.fieldsPrerequisiteLoan.length != 0) {
            this.fieldsPrerequisiteLoan.removeAt(0);
        }
        this.loanproductService.getPrerequisiteLoanProductEdit(id).subscribe(function (result) {
            result.forEach(function (value) {
                var group = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                    documentId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.documentId),
                    documentTypeId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.documentTypeId),
                    documentName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.documentName),
                    mendatory: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.mandatory),
                    visibility: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.visibility),
                    employmentType: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.employmentType)
                });
                current.fieldsPrerequisiteLoan.push(current.loanproductService.buildPrerequisiteDocument(value));
            });
            //console.log(current.fieldsPrerequisiteLoan);
        });
    };
    AddeditloanproductComponent.prototype.GetLoanProductDiscountCategoryEdit = function (id) {
        var current = this;
        this.loanproductService.getLoanProductDiscountCategoryEdit(id).subscribe(function (result) {
            //this.creditBureauModel = result;
            result.forEach(function (value) {
                var group = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                    documentId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.categoryId),
                    documentName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.categoryName),
                    mendatory: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.mendatory),
                    discount: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value.discount)
                });
                current.loanProductDiscountCategory.push(group);
            });
        });
    };
    AddeditloanproductComponent.prototype.close = function () {
        this.router.navigateByUrl("/loanproduct");
    };
    AddeditloanproductComponent.prototype.buildFields = function () {
        return this.fb.group({
            id: [''],
            bureauName: [''],
            isEnableSoftPull: [''],
            iscEnableSoftPull: [''],
            isEnableHardPull: [''],
            iscEnableHardPull: [''],
        });
    };
    //get id() { return this.configurationSetings.get('id'); }
    //get bureauName() { return this.configurationSetings.get('bureauName'); }
    //get isEnableSoftPull() { return this.configurationSetings.get('isEnableSoftPull'); }
    //get isEnableHardPull() { return this.configurationSetings.get('isEnableHardPull'); }
    ///////////////////////////////////////PrerequisiteLoanProductDocumentType////////////////////////////////////////
    AddeditloanproductComponent.prototype.buildPrerequisiteLoanProductDocumentTypeFields = function () {
        return this.fb.group({
            documentName: [''],
            documentId: [''],
            mendatory: [''],
        });
    };
    AddeditloanproductComponent.prototype.buildLoanProductDiscountCategoryFields = function () {
        return this.fb.group({
            documentName: [''],
            documentId: [''],
            mendatory: [''],
            discount: ['']
        });
    };
    Object.defineProperty(AddeditloanproductComponent.prototype, "fieldsPrerequisiteLoan", {
        get: function () {
            return this.configurationSetings.get('fieldsPrerequisiteLoan');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditloanproductComponent.prototype, "loanProductDiscountCategory", {
        get: function () {
            return this.configurationSetings.get('loanProductDiscountCategory');
        },
        enumerable: true,
        configurable: true
    });
    AddeditloanproductComponent.prototype.detailNext = function () {
        this.loadSave = true;
        if (this.hideCompany == true) {
            this.form.controls['623_SharedCompany'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.form.controls['623_SharedCompany'].updateValueAndValidity();
        }
        else {
            this.form.controls['623_SharedCompany'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator);
            this.form.controls['623_SharedCompany'].updateValueAndValidity();
        }
        if (this.form.valid) {
            var element = document.getElementById("manage-status");
            element.classList.remove("active");
            // element.classList.remove("show");
            element.classList.add("hide");
            this.IsPrerequisitedocument = true;
            this.IsDetail = false;
            this.loadSave = false;
            //this.IsPrerequisitedocument = true;
        }
        else {
            this.commonService.validateAllFormFields(this.form);
            this.loadSave = false;
        }
    };
    AddeditloanproductComponent.prototype.PrerequisitedocumentNext = function () {
        //debugger
        var element = document.getElementById("prerequisitedocument");
        element.classList.remove("active");
        element.classList.remove("show");
        element.classList.add("hide");
        this.IsPrerequisitedocument = false;
        this.IsDetail = false;
        this.loadSave = false;
        this.IsRuleEngine = false;
        this.IsDiscountCategory = true;
    };
    AddeditloanproductComponent.prototype.DiscountPrevious = function () {
        var element = document.getElementById("DiscountCategory");
        element.classList.remove("active");
        element.classList.remove("show");
        element.classList.add("hide"); //DisCategory
        var element = document.getElementById("DisCategory");
        element.classList.remove("active");
        element.classList.remove("show");
        this.IsPrerequisitedocument = true;
        this.IsDetail = false;
        this.loadSave = false;
        this.IsRuleEngine = false;
        this.IsDiscountCategory = false;
    };
    AddeditloanproductComponent.prototype.DiscountPrerequisitedocumentPrevious = function () {
        var element = document.getElementById("prerequisitedocument");
        element.classList.remove("active");
        element.classList.remove("show");
        element.classList.add("hide");
        var element = document.getElementById("prerequisitedocument");
        element.classList.remove("active");
        element.classList.remove("show");
        this.IsDetail = true;
        this.IsPrerequisitedocument = false;
        this.IsPrerequisitedocument = false;
        this.loadSave = false;
        this.IsRuleEngine = false;
        this.IsDiscountCategory = false;
    };
    AddeditloanproductComponent.prototype.detailTab = function () {
        this.IsPrerequisitedocument = false;
        this.IsDetail = true;
        this.loadSave = false;
        this.IsRuleEngine = false;
        this.IsDiscountCategory = false;
        var element = document.getElementById("lead-tab");
        element.classList.remove("active");
        var element1 = document.getElementById("RuleEngine");
        element1.classList.remove("active");
        var element2 = document.getElementById("DisCategory");
        element2.classList.remove("active");
        var element1 = document.getElementById("prerequisitedocument");
        element1.classList.remove("active");
    };
    AddeditloanproductComponent.prototype.prerequisiteTab = function () {
        var element = document.getElementById("manage-status");
        element.classList.remove("active");
        //var element1 = document.getElementById("RuleEngine");
        //element1.classList.remove("active");
        var element2 = document.getElementById("DiscountCategory");
        element2.classList.remove("active");
        var element = document.getElementById("manage-tab");
        element.classList.remove("active");
        var element2 = document.getElementById("DisCategory");
        element2.classList.remove("active");
        this.IsDiscountCategory = false;
        this.IsPrerequisitedocument = true;
        this.IsDetail = false;
        this.loadSave = false;
        this.IsRuleEngine = false;
        this.IsDiscountCategory = false;
    };
    AddeditloanproductComponent.prototype.discountCategoryTab = function () {
        var element = document.getElementById("manage-tab");
        element.classList.remove("active");
        var element1 = document.getElementById("prerequisitedocument");
        element1.classList.remove("active");
        var element2 = document.getElementById("RuleEngine");
        this.IsPrerequisitedocument = false;
        this.IsDetail = false;
        this.loadSave = false;
        this.IsRuleEngine = false;
        this.IsDiscountCategory = true;
    };
    AddeditloanproductComponent.prototype.AddNewPrerequisiteDocument = function () {
        this.presiteDocument.show();
    };
    AddeditloanproductComponent.prototype.UpdatePrerequisiteDocument = function (obj) {
        console.log(obj);
        this.updatePresiteDocuments.showUpdate(this.leadId, obj, this.fieldsPrerequisiteLoan);
    };
    AddeditloanproductComponent.prototype.AddNewCategory = function () {
        this.discountDocument.show();
    };
    AddeditloanproductComponent.prototype.prerequisiteDocument = function (group) {
        this.fieldsPrerequisiteLoan.push(this.loanproductService.buildPrerequisiteDocument(group));
    };
    AddeditloanproductComponent.prototype.updatePresiteDocument = function (e) {
        var _this = this;
        console.log('update', e);
        if (this.leadId != "") {
            console.log('update with leadId');
            var control2 = this.configurationSetings.controls.fieldsPrerequisiteLoan;
            control2.controls = [];
            this.GetMasterPrerequisiteLoanProductDocumentTypeEdit(this.leadId);
        }
        else {
            console.log(this.fieldsPrerequisiteLoan.controls);
            this.fieldsPrerequisiteLoan.controls.filter(function (m) { return m.get('documentTypeId').value == e.documentTypeId; }).forEach(function (m) {
                console.log('befor: ', m);
                m.get('documentName').setValue(e.documentName),
                    m.get('isMandatory').setValue(e.mandatory),
                    m.get('isVisible').setValue(e.visibility),
                    m.get('employmentType').setValue(e.employmentType);
                console.log('after: ', m);
            });
            this.loanproductService.UpdateLoanPrerequisiteDocumentName(e.documentName, e.documentTypeId).subscribe(function (resp) {
                _this.toaster.success("Prerequisite Document has been updated successfully.");
            });
        }
    };
    AddeditloanproductComponent.prototype.discountDocuments = function () {
        var control2 = this.configurationSetings.controls.loanProductDiscountCategory;
        control2.controls = [];
        this.GetLoanProductDiscountCategory();
    };
    AddeditloanproductComponent.prototype.DeletePrerequisiteLoan = function (id, name) {
        var _this = this;
        var message = "Are you sure you want to delete Prerequisite Document  \"" + name + "\"?";
        this.dialogService.confirm('Delete Prerequisite', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loanproductService.DeletePrerequisite(id, _this.leadId).subscribe(function (r) {
                    _this.toaster.success("Prerequisite Document \"" + name + "\" has been deleted successfully");
                    _this.fieldsPrerequisiteLoan.controls.forEach(function (m, index) {
                        if (m.get('documentTypeId').value == id) {
                            _this.fieldsPrerequisiteLoan.controls.splice(index, 1);
                        }
                    });
                }, function (error) {
                });
            }
        });
    };
    AddeditloanproductComponent.prototype.DeleteDiscountCategory = function (id, name) {
        var _this = this;
        var message = "Are you sure you want to delete discount category document  \"" + name + "\"?";
        this.dialogService.confirm('Delete Discount Category', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loanproductService.DeleteDiscountCategory(id, _this.leadId).subscribe(function (r) {
                    _this.toaster.success("Discount category \"" + name + "\" has been deleted successfully");
                    var control2 = _this.configurationSetings.controls.loanProductDiscountCategory;
                    control2.controls = [];
                    _this.GetLoanProductDiscountCategory();
                }, function (error) {
                });
            }
        });
    };
    AddeditloanproductComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _loanproduct_service__WEBPACK_IMPORTED_MODULE_2__["LoanproductService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_10__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", Object)
    ], AddeditloanproductComponent.prototype, "fileInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelect', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], AddeditloanproductComponent.prototype, "mySelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('presiteDocument', { static: false }),
        __metadata("design:type", _addprerequisitedocument_addprerequisitedocument_component__WEBPACK_IMPORTED_MODULE_7__["AddprerequisitedocumentComponent"])
    ], AddeditloanproductComponent.prototype, "presiteDocument", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('discountDocument', { static: false }),
        __metadata("design:type", _discountcategory_discountcategory_component__WEBPACK_IMPORTED_MODULE_9__["DiscountcategoryComponent"])
    ], AddeditloanproductComponent.prototype, "discountDocument", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('updatePresiteDocuments', { static: false }),
        __metadata("design:type", _updateprerequisitedocument_updateprerequisitedocument_component__WEBPACK_IMPORTED_MODULE_11__["UpdateprerequisitedocumentComponent"])
    ], AddeditloanproductComponent.prototype, "updatePresiteDocuments", void 0);
    AddeditloanproductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditloanproduct',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditloanproduct.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/addeditloanproduct.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditloanproduct.component.scss */ "./src/app/views/loanproduct/addeditloanproduct.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _loanproduct_service__WEBPACK_IMPORTED_MODULE_2__["LoanproductService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_10__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], AddeditloanproductComponent);
    return AddeditloanproductComponent;
}());



/***/ }),

/***/ "./src/app/views/loanproduct/addprerequisitedocument/addprerequisitedocument.component.scss":
/*!**************************************************************************************************!*\
  !*** ./src/app/views/loanproduct/addprerequisitedocument/addprerequisitedocument.component.scss ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xvYW5wcm9kdWN0L2FkZHByZXJlcXVpc2l0ZWRvY3VtZW50L2FkZHByZXJlcXVpc2l0ZWRvY3VtZW50LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/loanproduct/addprerequisitedocument/addprerequisitedocument.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/views/loanproduct/addprerequisitedocument/addprerequisitedocument.component.ts ***!
  \************************************************************************************************/
/*! exports provided: AddprerequisitedocumentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddprerequisitedocumentComponent", function() { return AddprerequisitedocumentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _loanproduct_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../loanproduct.service */ "./src/app/views/loanproduct/loanproduct.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_7__);
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








var AddprerequisitedocumentComponent = /** @class */ (function () {
    function AddprerequisitedocumentComponent(fb, loanproductService, router, commonService, toaster, route) {
        this.fb = fb;
        this.loanproductService = loanproductService;
        this.router = router;
        this.commonService = commonService;
        this.toaster = toaster;
        this.route = route;
        this.prerequisiteDocument = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chkListEmployementType = [];
        this.active = false;
        this.documentModel = new _loanproduct_service__WEBPACK_IMPORTED_MODULE_3__["DocumentModel"]();
        this.loadSave = false;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    AddprerequisitedocumentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.loanProductId = id;
        });
        this.loanproductService.GetEmploymentTypes().subscribe(function (resp) {
            if (!Object(util__WEBPACK_IMPORTED_MODULE_7__["isNullOrUndefined"])(resp)) {
                _this.chkListEmployementType = JSON.parse(resp);
                while (_this.employmentTypeList.length != 0) {
                    _this.employmentTypeList.removeAt(0);
                }
                _this.chkListEmployementType.forEach(function (m) {
                    _this.employmentTypeList.push(_this.loanproductService.buildEmplymentType(m));
                });
            }
        }, function (error) {
            _this.toaster.error("Something went wrong. Please contact with administrator.");
        });
    };
    AddprerequisitedocumentComponent.prototype.show = function () {
        this.presiteDocument.show();
        this.prerequisiteDocumentForm.patchValue({
            documentTypeId: null,
            documentName: null,
            isVisible: false,
            isMandatory: false,
            employmentType: null,
            employmentTypeList: this.chkListEmployementType.map(function (m) {
                return {
                    name: m.name,
                    value: m.value,
                    SelectedValue: false
                };
            }),
        });
        this.prerequisiteDocumentForm.markAsUntouched();
    };
    AddprerequisitedocumentComponent.prototype.checkemployementtype = function (e, val1) {
        var index = this.chkListEmployementType.findIndex(function (x) { return x.value == val1; });
        if (e.target.checked) {
            this.chkListEmployementType[index].SelectedValue = '1';
        }
        else {
            this.chkListEmployementType[index].SelectedValue = '0';
        }
    };
    AddprerequisitedocumentComponent.prototype.close = function () {
        this.active = false;
        this.presiteDocument.hide();
    };
    AddprerequisitedocumentComponent.prototype.sendDataToDocumentType = function () {
        var _this = this;
        var documentId = null;
        console.log(this.employmentTypeList.value);
        if (this.prerequisiteDocumentForm.valid) {
            this.documentModel.documentName = this.documentName.value;
            this.documentModel.mandatory = this.isMandatory.value;
            this.documentModel.visibility = this.isVisible.value;
            this.documentModel.loanProductId = this.loanProductId;
            this.documentModel.employmentType = this.employmentTypeList.value.filter(function (m) { return m.SelectedValue == true; }).map(function (m) { return m.value; }).join(',');
            this.employmentType.setValue(this.documentModel.employmentType);
            this.presiteDocument.hide();
            this.loanproductService.AddEditPresiteDocument(this.documentModel).subscribe(function (result) {
                console.log(result);
                if (result.statusCode == 200) {
                    _this.documentTypeId.setValue(result.responseMessage);
                    _this.documentModel.documentTypeId = result.responseMessage;
                    _this.prerequisiteDocument.emit(_this.documentModel);
                    _this.presiteDocument.hide();
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
            this.commonService.validateAllFormFields(this.prerequisiteDocumentForm);
        }
    };
    Object.defineProperty(AddprerequisitedocumentComponent.prototype, "documentTypeId", {
        get: function () { return this.prerequisiteDocumentForm.get('documentTypeId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddprerequisitedocumentComponent.prototype, "documentName", {
        get: function () { return this.prerequisiteDocumentForm.get('documentName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddprerequisitedocumentComponent.prototype, "isVisible", {
        get: function () { return this.prerequisiteDocumentForm.get('isVisible'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddprerequisitedocumentComponent.prototype, "isMandatory", {
        get: function () { return this.prerequisiteDocumentForm.get('isMandatory'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddprerequisitedocumentComponent.prototype, "employmentType", {
        get: function () { return this.prerequisiteDocumentForm.get('employmentType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddprerequisitedocumentComponent.prototype, "employmentTypeList", {
        get: function () { return this.prerequisiteDocumentForm.get('employmentTypeList'); },
        enumerable: true,
        configurable: true
    });
    AddprerequisitedocumentComponent.prototype.initForm = function () {
        this.prerequisiteDocumentForm = this.loanproductService.buildPrerequisiteDocument();
    };
    AddprerequisitedocumentComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _loanproduct_service__WEBPACK_IMPORTED_MODULE_3__["LoanproductService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('presiteDocument', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], AddprerequisitedocumentComponent.prototype, "presiteDocument", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AddprerequisitedocumentComponent.prototype, "prerequisiteDocument", void 0);
    AddprerequisitedocumentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addprerequisitedocument',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addprerequisitedocument.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/addprerequisitedocument/addprerequisitedocument.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addprerequisitedocument.component.scss */ "./src/app/views/loanproduct/addprerequisitedocument/addprerequisitedocument.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _loanproduct_service__WEBPACK_IMPORTED_MODULE_3__["LoanproductService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _shared_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], AddprerequisitedocumentComponent);
    return AddprerequisitedocumentComponent;
}());



/***/ }),

/***/ "./src/app/views/loanproduct/discountcategory/discountcategory.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/views/loanproduct/discountcategory/discountcategory.component.scss ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xvYW5wcm9kdWN0L2Rpc2NvdW50Y2F0ZWdvcnkvZGlzY291bnRjYXRlZ29yeS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/loanproduct/discountcategory/discountcategory.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/views/loanproduct/discountcategory/discountcategory.component.ts ***!
  \**********************************************************************************/
/*! exports provided: DiscountcategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscountcategoryComponent", function() { return DiscountcategoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _loanproduct_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loanproduct.service */ "./src/app/views/loanproduct/loanproduct.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
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







var DiscountcategoryComponent = /** @class */ (function () {
    function DiscountcategoryComponent(fb, loanproductService, router, commonService, toaster, route) {
        this.fb = fb;
        this.loanproductService = loanproductService;
        this.router = router;
        this.commonService = commonService;
        this.toaster = toaster;
        this.route = route;
        this.discountDocuments = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.active = false;
        this.documentModel = new _loanproduct_service__WEBPACK_IMPORTED_MODULE_2__["DocumentModel"]();
        this.loadSave = false;
        this.addForm = this.fb.group({
            documentName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            mandatory: [false],
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    DiscountcategoryComponent.prototype.ngOnInit = function () {
    };
    DiscountcategoryComponent.prototype.show = function () {
        this.discountDocument.show();
    };
    DiscountcategoryComponent.prototype.close = function () {
        this.active = false;
        this.discountDocument.hide();
    };
    DiscountcategoryComponent.prototype.sendDataToDocumentType = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.documentModel.documentName = this.addForm.value.documentName;
            this.documentModel.mandatory = this.addForm.value.mandatory;
            this.loanproductService.AddEditDiscountDocument(this.documentModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    // this.router.navigate(["/calendar"]);
                    _this.addForm.reset();
                    _this.discountDocument.hide();
                    _this.discountDocuments.emit();
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
    Object.defineProperty(DiscountcategoryComponent.prototype, "documentName", {
        get: function () { return this.addForm.get('documentName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountcategoryComponent.prototype, "mandatory", {
        get: function () { return this.addForm.get('mandatory'); },
        enumerable: true,
        configurable: true
    });
    DiscountcategoryComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _loanproduct_service__WEBPACK_IMPORTED_MODULE_2__["LoanproductService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('discountDocument', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], DiscountcategoryComponent.prototype, "discountDocument", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DiscountcategoryComponent.prototype, "discountDocuments", void 0);
    DiscountcategoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-discountcategory',
            template: __importDefault(__webpack_require__(/*! raw-loader!./discountcategory.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/discountcategory/discountcategory.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./discountcategory.component.scss */ "./src/app/views/loanproduct/discountcategory/discountcategory.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _loanproduct_service__WEBPACK_IMPORTED_MODULE_2__["LoanproductService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], DiscountcategoryComponent);
    return DiscountcategoryComponent;
}());



/***/ }),

/***/ "./src/app/views/loanproduct/loanproduct-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/loanproduct/loanproduct-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: LoanProductRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoanProductRoutingModule", function() { return LoanProductRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _loanproductlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loanproductlist.component */ "./src/app/views/loanproduct/loanproductlist.component.ts");
/* harmony import */ var _addeditloanproduct_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditloanproduct.component */ "./src/app/views/loanproduct/addeditloanproduct.component.ts");
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
    { path: '', component: _loanproductlist_component__WEBPACK_IMPORTED_MODULE_2__["LoanproductlistComponent"] },
    { path: 'addloanproduct', component: _addeditloanproduct_component__WEBPACK_IMPORTED_MODULE_3__["AddeditloanproductComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'LOANPRODUCTADD' } },
    { path: 'editloanproduct/:id', component: _addeditloanproduct_component__WEBPACK_IMPORTED_MODULE_3__["AddeditloanproductComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'LOANPRODUCTUPDATE' } },
];
var LoanProductRoutingModule = /** @class */ (function () {
    function LoanProductRoutingModule() {
    }
    LoanProductRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LoanProductRoutingModule);
    return LoanProductRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/loanproduct/loanproduct.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/loanproduct/loanproduct.module.ts ***!
  \*********************************************************/
/*! exports provided: LoanproductModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoanproductModule", function() { return LoanproductModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-password-toggle */ "./node_modules/ngx-password-toggle/ngx-password-toggle.umd.js");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ngx_password_toggle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _loanproduct_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loanproduct-routing.module */ "./src/app/views/loanproduct/loanproduct-routing.module.ts");
/* harmony import */ var _loanproductlist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./loanproductlist.component */ "./src/app/views/loanproduct/loanproductlist.component.ts");
/* harmony import */ var _addeditloanproduct_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addeditloanproduct.component */ "./src/app/views/loanproduct/addeditloanproduct.component.ts");
/* harmony import */ var _addprerequisitedocument_addprerequisitedocument_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addprerequisitedocument/addprerequisitedocument.component */ "./src/app/views/loanproduct/addprerequisitedocument/addprerequisitedocument.component.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _discountcategory_discountcategory_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./discountcategory/discountcategory.component */ "./src/app/views/loanproduct/discountcategory/discountcategory.component.ts");
/* harmony import */ var _updateprerequisitedocument_updateprerequisitedocument_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./updateprerequisitedocument/updateprerequisitedocument.component */ "./src/app/views/loanproduct/updateprerequisitedocument/updateprerequisitedocument.component.ts");
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









var LoanproductModule = /** @class */ (function () {
    function LoanproductModule() {
    }
    LoanproductModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_loanproductlist_component__WEBPACK_IMPORTED_MODULE_7__["LoanproductlistComponent"], _addeditloanproduct_component__WEBPACK_IMPORTED_MODULE_8__["AddeditloanproductComponent"], _addprerequisitedocument_addprerequisitedocument_component__WEBPACK_IMPORTED_MODULE_9__["AddprerequisitedocumentComponent"], _discountcategory_discountcategory_component__WEBPACK_IMPORTED_MODULE_11__["DiscountcategoryComponent"], _updateprerequisitedocument_updateprerequisitedocument_component__WEBPACK_IMPORTED_MODULE_12__["UpdateprerequisitedocumentComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _loanproduct_routing_module__WEBPACK_IMPORTED_MODULE_6__["LoanProductRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], ngx_password_toggle__WEBPACK_IMPORTED_MODULE_5__["NgxPasswordToggleModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__["ModalModule"]
            ]
        })
    ], LoanproductModule);
    return LoanproductModule;
}());



/***/ }),

/***/ "./src/app/views/loanproduct/loanproduct.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/loanproduct/loanproduct.service.ts ***!
  \**********************************************************/
/*! exports provided: LoanproductService, CreditBureauModel, ManageLoanProductModel, Company, DocumentModel, UpdateDocumentModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoanproductService", function() { return LoanproductService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditBureauModel", function() { return CreditBureauModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageLoanProductModel", function() { return ManageLoanProductModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Company", function() { return Company; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentModel", function() { return DocumentModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateDocumentModel", function() { return UpdateDocumentModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
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





var LoanproductService = /** @class */ (function () {
    function LoanproductService(http, fb) {
        this.http = http;
        this.fb = fb;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
        this.company = [];
    }
    LoanproductService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId, leadId) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId + "&PrimaryId=" + leadId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    LoanproductService.prototype.GetLoanProduct = function (id, moduleName, submoduleName) {
        var _this = this;
        return this.http.get(this.baseUri + ("loanproduct/GetLoanProductById?id=" + id + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.leadEditPage = response;
            return true;
        }));
    };
    LoanproductService.prototype.getNames = function () {
        return this.http.get(this.baseUri + "loanproduct/GetCreditBureauMaster/");
    };
    LoanproductService.prototype.getPrerequisiteLoanProductDocumentTypeNames = function (name) {
        return this.http.get(this.baseUri + ("loanproduct/GetPrerequisiteLoanProductDocumentTypeNames?masterName=" + name));
    };
    LoanproductService.prototype.getGetLoanProductDiscountCategoryNames = function (name) {
        return this.http.get(this.baseUri + ("loanproduct/GetGetLoanProductDiscountCategoryNames?masterName=" + name));
    };
    LoanproductService.prototype.getNamesEdit = function (id) {
        return this.http.get(this.baseUri + ("loanproduct/GetCreditBureauMasterEdit?productId=" + id));
    };
    LoanproductService.prototype.getPrerequisiteLoanProductEdit = function (id) {
        return this.http.get(this.baseUri + ("loanproduct/GetPrerequisiteLoanProductEdit?productId=" + id));
    };
    LoanproductService.prototype.getLoanProductDiscountCategoryEdit = function (id) {
        return this.http.get(this.baseUri + ("loanproduct/GetLoanProductDiscountCategoryEdit?productId=" + id));
    };
    LoanproductService.prototype.getSolgenUserForCompany = function () {
        var _this = this;
        return this.http.get(this.baseUri + "loanproduct/GetSolgenUser/").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.company = response;
        }));
    };
    LoanproductService.prototype.addOrUpdateManageStatus = function (loanproductModel) {
        return this.http.post(this.baseUri + "loanproduct/AddUpdateLoanProduct", loanproductModel);
    };
    LoanproductService.prototype.GetLoanProductlist = function (name, userType, sortColumn, sortDir, page, pageSize, loginuserid, custom_view_id, searchFilter, moduleName, submoduleName, companyId) {
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "loanproduct/GetLoanProductlist?nameSearch=" + name + "&userType=" + userType + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&custom_view_id=" + custom_view_id + "&searchFilter=" + searchFilter + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId);
    };
    LoanproductService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("loanproduct/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.leadEditPage = response;
            return true;
        }));
    };
    LoanproductService.prototype.AddEditPresiteDocument = function (model) {
        return this.http.post(this.baseUri + "loanproduct/SaveLoanproductPresiteDocument", model);
    };
    LoanproductService.prototype.UpdatePresiteDocument = function (model) {
        return this.http.post(this.baseUri + "loanproduct/UpdatePresiteDocumentById", model);
    };
    LoanproductService.prototype.AddEditDiscountDocument = function (model) {
        return this.http.post(this.baseUri + "loanproduct/AddEditDiscountDocument", model);
    };
    LoanproductService.prototype.DeletePrerequisite = function (docId, loanProductId) {
        return this.http.get(this.baseUri + ("loanproduct/DeletePrerequisite?docId=" + docId + "&loanProductId=" + loanProductId));
    };
    LoanproductService.prototype.DeleteDiscountCategory = function (docId, loanProductId) {
        return this.http.get(this.baseUri + ("loanproduct/DeleteDiscountCategory?docId=" + docId + "&loanProductId=" + loanProductId));
    };
    LoanproductService.prototype.UpdateLoanPrerequisiteDocumentName = function (documentName, documentTypeId) {
        return this.http.get(this.baseUri + ("loanproduct/UpdateLoanPrerequisiteDocumentName?documentName=" + documentName + "&documentTypeId=" + documentTypeId));
    };
    LoanproductService.prototype.GetEmploymentTypes = function () {
        return this.http.get(this.baseUri + "Common/GetEmploymentTypes");
    };
    LoanproductService.prototype.buildPrerequisiteDocument = function (prerequisiteDocument) {
        if (prerequisiteDocument === void 0) { prerequisiteDocument = null; }
        var prerequisiteDocumentGroup = this.fb.group({
            documentId: [null],
            documentTypeId: [null],
            documentName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            isVisible: [false],
            isMandatory: [false],
            employmentType: [null],
            employmentTypeList: this.fb.array([this.buildEmplymentType()]),
        });
        if (prerequisiteDocument) {
            prerequisiteDocumentGroup.patchValue({
                documentId: prerequisiteDocument.documentId,
                documentTypeId: (typeof prerequisiteDocument.documentTypeId !== 'undefined' ? prerequisiteDocument.documentTypeId : null),
                documentName: prerequisiteDocument.documentName,
                isVisible: prerequisiteDocument.visibility,
                isMandatory: prerequisiteDocument.mandatory,
                employmentType: prerequisiteDocument.employmentType
            });
        }
        return prerequisiteDocumentGroup;
    };
    LoanproductService.prototype.buildEmplymentType = function (emplymentType) {
        if (emplymentType === void 0) { emplymentType = null; }
        var emplymentTypeGroup = this.fb.group({
            name: [null],
            value: [null],
            SelectedValue: [false]
        });
        if (emplymentType) {
            emplymentTypeGroup.patchValue({
                name: emplymentType.name,
                value: emplymentType.value,
                SelectedValue: (emplymentType.SelectedValue == 0 ? false : true)
            });
        }
        return emplymentTypeGroup;
    };
    LoanproductService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] }
    ]; };
    LoanproductService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]])
    ], LoanproductService);
    return LoanproductService;
}());

var CreditBureauModel = /** @class */ (function () {
    function CreditBureauModel() {
        this.Id = '';
        this.BureauName = '';
        this.IsEnableSoftPull = false;
        this.IsEnableHardPull = false;
    }
    return CreditBureauModel;
}());

var ManageLoanProductModel = /** @class */ (function () {
    function ManageLoanProductModel() {
        this.moduleId = "";
        this.subModuleId = "";
        this.controls = "";
        this.fieldsData = "";
    }
    return ManageLoanProductModel;
}());

var Company = /** @class */ (function () {
    function Company() {
        this.companyId = '';
        this.companyName = null;
    }
    return Company;
}());

var DocumentModel = /** @class */ (function () {
    //CustomerID: string;
    function DocumentModel() {
        this.documentName = '';
        this.mandatory = false;
    }
    return DocumentModel;
}());

var UpdateDocumentModel = /** @class */ (function () {
    function UpdateDocumentModel() {
    }
    return UpdateDocumentModel;
}());



/***/ }),

/***/ "./src/app/views/loanproduct/loanproductlist.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/views/loanproduct/loanproductlist.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xvYW5wcm9kdWN0L2xvYW5wcm9kdWN0bGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/loanproduct/loanproductlist.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/loanproduct/loanproductlist.component.ts ***!
  \****************************************************************/
/*! exports provided: LoanproductlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoanproductlistComponent", function() { return LoanproductlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _loanproduct_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loanproduct.service */ "./src/app/views/loanproduct/loanproduct.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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









var LoanproductlistComponent = /** @class */ (function () {
    function LoanproductlistComponent(loanproductService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.loanproductService = loanproductService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.searchUserType = '';
        this.custom_view_id = '';
        this.searchFilter = '';
        //modulePermission: ModuleList;
        this.loading = false;
        this.sortDir = 'desc';
        this.moduleName = 'finance';
        this.submoduleName = 'loanproduct';
        this.tableName = 'tblLoanProduct';
        this.sortColumn = 'CreatedOn';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["SelectionType"];
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.listFiltertext = '';
        this.selected = [];
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.loadSave = false;
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'LOANPRODUCTADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'LOANPRODUCTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'LOANPRODUCTDELETE'; });
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
    LoanproductlistComponent.prototype.ngOnInit = function () {
        this.custom_view_id = '';
        this.pageSizeValue = 10;
        this.currentPage = 1;
        this.getPageSizes();
        this.refresh();
    };
    LoanproductlistComponent.prototype.GetcustomViewid = function (event) {
        this.custom_view_id = event;
        this.refresh();
    };
    LoanproductlistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    LoanproductlistComponent.prototype.getListingColorCode = function (fieldValue) {
        // debugger
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        //console.log('this.lstListingColorCode', this.lstListingColorCode)
        return this.lstListingColorCode;
        //console.log('this.lstListingColorCode', this.lstListingColorCode)
    };
    LoanproductlistComponent.prototype.refresh = function () {
        var _this = this;
        //debugger
        this.loading = true;
        this.loanproductService.GetLoanProductlist(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId)
            .subscribe(function (response) {
            //debugger
            _this.jsonData = response;
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            console.log("this.columnheading", _this.columnheading);
            // console.log("data", this.columndata );
            if (response.data.length > 0) {
                _this.totalRecords = _this.columndata[0].total_records;
                for (var i = 0; i < response.data.length; i++) {
                    if (parseInt(response.data[i].LoanAmountMax) >= 0) {
                        response.data[i].LoanAmountMax = _this.commonService.formatAmount(response.data[i].LoanAmountMax);
                    }
                    if (parseInt(response.data[i].LoanAmountMin) >= 0) {
                        response.data[i].LoanAmountMin = _this.commonService.formatAmount(response.data[i].LoanAmountMin);
                    }
                    if (parseInt(response.data[i].MiniumCreditScore) >= 0) {
                        response.data[i].MiniumCreditScore = _this.commonService.formatAmount(response.data[i].MiniumCreditScore);
                    }
                    if (parseInt(response.data[i].PrefereedScore) >= 0) {
                        response.data[i].PrefereedScore = _this.commonService.formatAmount(response.data[i].PrefereedScore);
                    }
                }
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
    Object.defineProperty(LoanproductlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    LoanproductlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    LoanproductlistComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    LoanproductlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    LoanproductlistComponent.prototype.onChange = function ($event) {
        this.refresh();
    };
    LoanproductlistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    LoanproductlistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    LoanproductlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    LoanproductlistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "ProductName like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    LoanproductlistComponent.prototype.reset = function () {
        this.custom_view_id = '';
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.refresh();
    };
    LoanproductlistComponent.prototype.onSelect = function (_a) {
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
    LoanproductlistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Products(s)\"";
            this.dialogService.confirm('Delete Products(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.loanproductService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    LoanproductlistComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Loan Product  \"" + row.ProductName + "\"?";
        this.dialogService.confirm('Delete Loan Product', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loanproductService.DeleteRecords(row.Id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Loan Product \"" + row.FirstName + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    LoanproductlistComponent.ctorParameters = function () { return [
        { type: _loanproduct_service__WEBPACK_IMPORTED_MODULE_6__["LoanproductService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_1__["SearchfilteraddComponent"])
    ], LoanproductlistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_2__["ManageviewComponent"])
    ], LoanproductlistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"])
    ], LoanproductlistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], LoanproductlistComponent.prototype, "offset", void 0);
    LoanproductlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-loanproductlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./loanproductlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/loanproductlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./loanproductlist.component.scss */ "./src/app/views/loanproduct/loanproductlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_loanproduct_service__WEBPACK_IMPORTED_MODULE_6__["LoanproductService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"]])
    ], LoanproductlistComponent);
    return LoanproductlistComponent;
}());



/***/ }),

/***/ "./src/app/views/loanproduct/updateprerequisitedocument/updateprerequisitedocument.component.scss":
/*!********************************************************************************************************!*\
  !*** ./src/app/views/loanproduct/updateprerequisitedocument/updateprerequisitedocument.component.scss ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xvYW5wcm9kdWN0L3VwZGF0ZXByZXJlcXVpc2l0ZWRvY3VtZW50L3VwZGF0ZXByZXJlcXVpc2l0ZWRvY3VtZW50LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/loanproduct/updateprerequisitedocument/updateprerequisitedocument.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/views/loanproduct/updateprerequisitedocument/updateprerequisitedocument.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: UpdateprerequisitedocumentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateprerequisitedocumentComponent", function() { return UpdateprerequisitedocumentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _loanproduct_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../loanproduct.service */ "./src/app/views/loanproduct/loanproduct.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
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









var UpdateprerequisitedocumentComponent = /** @class */ (function () {
    function UpdateprerequisitedocumentComponent(fb, loanproductService, router, commonService, toaster, route, dialogService) {
        this.fb = fb;
        this.loanproductService = loanproductService;
        this.router = router;
        this.commonService = commonService;
        this.toaster = toaster;
        this.route = route;
        this.dialogService = dialogService;
        this.updatePresiteDocument = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.event = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chkListEmployementTypes = [];
        this.active = false;
        this.updatetModel = new _loanproduct_service__WEBPACK_IMPORTED_MODULE_3__["UpdateDocumentModel"]();
        this.loadSave = false;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    UpdateprerequisitedocumentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.loanproductService.GetEmploymentTypes().subscribe(function (resp) {
            if (!Object(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["isNullOrUndefined"])(resp)) {
                _this.chkListEmployementTypes = JSON.parse(resp);
                console.log('this.chkListEmployementType', _this.chkListEmployementTypes);
            }
        }, function (error) {
            _this.toaster.error("Something went wrong. Please contact with administrator.");
        });
    };
    UpdateprerequisitedocumentComponent.prototype.showUpdate = function (id, obj, documentList) {
        var _this = this;
        console.log('id: ', id);
        console.log('obj: ', obj);
        console.log('documentList: ', documentList);
        this.leadId = id;
        this.documentsList = documentList;
        this.prerequisiteDocumentForm.patchValue({
            documentId: obj.get('documentId').value,
            documentTypeId: obj.get('documentTypeId').value,
            documentName: obj.get('documentName').value,
            isVisible: obj.get('isVisible').value,
            isMandatory: obj.get('isMandatory').value
        });
        var employeeTypes = obj.get('employmentType').value != null ? obj.get('employmentType').value.split(',') : [];
        console.log(employeeTypes);
        this.documentId = obj.get('documentId').value;
        while (this.employmentTypeList.length != 0) {
            this.employmentTypeList.removeAt(0);
        }
        this.chkListEmployementTypes.forEach(function (m) {
            _this.employmentTypeList.push(_this.loanproductService.buildEmplymentType(m));
        });
        this.employmentTypeList.controls.forEach(function (mobj) {
            var value = (employeeTypes.filter(function (m) { return parseInt(m) == parseInt(mobj.get('value').value); }).length > 0 ? true : false);
            mobj.get('SelectedValue').setValue(value);
        });
        //this.chkListEmployementTypes.forEach((fobj, index) => {
        //  console.log(fobj);
        //  console.log(employeeTypes.filter(m => (m) == parseInt(fobj.value)).length);
        //  if (employeeTypes.filter(m => parseInt(m) == parseInt(fobj.value)).length > 0) {
        //    fobj.SelectedValue = true;
        //  } else {
        //    fobj.SelectedValue = 0;
        //  }
        //});
        this.updatePresiteDocuments.show();
    };
    UpdateprerequisitedocumentComponent.prototype.close = function () {
        this.active = false;
        this.updatePresiteDocuments.hide();
    };
    UpdateprerequisitedocumentComponent.prototype.UpdatePresiteDocuments = function () {
        //this.updatePresiteDocuments.hide();
        var _this = this;
        //const message = `Are you sure you want to Update Prerequisite Document Type. "${this.addForm.value.documentName}" will change in all over application?`;
        //this.dialogService.confirm('Update Document Type', message).subscribe(confirmed => {
        //  if (confirmed) {
        if (this.leadId != "") {
            console.log('out');
            if (this.prerequisiteDocumentForm.valid) {
                this.updatetModel.documentName = this.prerequisiteDocumentForm.value.documentName;
                this.updatetModel.mandatory = (this.isVisible.value == true) ? this.isMandatory.value : false;
                this.updatetModel.visibility = this.isVisible.value;
                this.updatetModel.documentId = this.documentId;
                this.updatetModel.documentTypeId = this.documentTypeId.value;
                this.updatetModel.employmentType = this.employmentTypeList.value.filter(function (m) { return m.SelectedValue == true; }).map(function (m) { return m.value; }).join(',');
                this.employmentType.setValue(this.updatetModel.employmentType);
                //return;
                this.loanproductService.UpdatePresiteDocument(this.updatetModel).subscribe(function (result) {
                    if (result.statusCode == 200) {
                        _this.toaster.success(result.responseMessage);
                        _this.prerequisiteDocumentForm.reset();
                        _this.updatePresiteDocuments.hide();
                        _this.updatePresiteDocument.emit(_this.updatetModel);
                    }
                    else {
                        _this.toaster.error(result.responseMessage);
                        _this.updatePresiteDocuments.show();
                    }
                }, function (error) {
                    _this.toaster.error(error);
                });
            }
            else {
                this.commonService.validateAllFormFields(this.prerequisiteDocumentForm);
            }
        }
        else {
            console.log('in');
            var doclist = this.documentsList.value;
            var Mandatory_1 = this.isMandatory;
            var Visibility_1 = this.isVisible;
            var docName_1 = this.prerequisiteDocumentForm.value.documentName;
            var currentContext_1 = this;
            doclist.forEach(function (item) {
                if (item.documentTypeId === currentContext_1.documentTypeId.value) {
                    item.mendatory = Mandatory_1;
                    item.visibility = Visibility_1;
                    item.documentName = docName_1;
                }
            });
            //this.event.emit(doclist);
            this.updatePresiteDocument.emit(this.prerequisiteDocumentForm);
            this.updatePresiteDocuments.hide();
            console.log("docList", doclist);
        }
        //  }
        //  else{
        //    this.updatePresiteDocuments.show();
        //  }
        //});
    };
    UpdateprerequisitedocumentComponent.prototype.checkemployementtype = function (e, val1) {
        var index = this.chkListEmployementTypes.findIndex(function (x) { return x.value == val1; });
        if (e.target.checked) {
            this.chkListEmployementTypes[index].SelectedValue = 1;
        }
        else {
            this.chkListEmployementTypes[index].SelectedValue = 0;
        }
    };
    Object.defineProperty(UpdateprerequisitedocumentComponent.prototype, "documentTypeId", {
        get: function () { return this.prerequisiteDocumentForm.get('documentTypeId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UpdateprerequisitedocumentComponent.prototype, "documentName", {
        get: function () { return this.prerequisiteDocumentForm.get('documentName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UpdateprerequisitedocumentComponent.prototype, "isVisible", {
        get: function () { return this.prerequisiteDocumentForm.get('isVisible'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UpdateprerequisitedocumentComponent.prototype, "isMandatory", {
        get: function () { return this.prerequisiteDocumentForm.get('isMandatory'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UpdateprerequisitedocumentComponent.prototype, "employmentType", {
        get: function () { return this.prerequisiteDocumentForm.get('employmentType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UpdateprerequisitedocumentComponent.prototype, "employmentTypeList", {
        get: function () { return this.prerequisiteDocumentForm.get('employmentTypeList'); },
        enumerable: true,
        configurable: true
    });
    UpdateprerequisitedocumentComponent.prototype.initForm = function () {
        this.prerequisiteDocumentForm = this.loanproductService.buildPrerequisiteDocument();
    };
    UpdateprerequisitedocumentComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _loanproduct_service__WEBPACK_IMPORTED_MODULE_3__["LoanproductService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('updatePresiteDocuments', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], UpdateprerequisitedocumentComponent.prototype, "updatePresiteDocuments", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], UpdateprerequisitedocumentComponent.prototype, "updatePresiteDocument", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], UpdateprerequisitedocumentComponent.prototype, "event", void 0);
    UpdateprerequisitedocumentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-updateprerequisitedocument',
            template: __importDefault(__webpack_require__(/*! raw-loader!./updateprerequisitedocument.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/loanproduct/updateprerequisitedocument/updateprerequisitedocument.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./updateprerequisitedocument.component.scss */ "./src/app/views/loanproduct/updateprerequisitedocument/updateprerequisitedocument.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _loanproduct_service__WEBPACK_IMPORTED_MODULE_3__["LoanproductService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _shared_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogService"]])
    ], UpdateprerequisitedocumentComponent);
    return UpdateprerequisitedocumentComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-loanproduct-loanproduct-module.js.map