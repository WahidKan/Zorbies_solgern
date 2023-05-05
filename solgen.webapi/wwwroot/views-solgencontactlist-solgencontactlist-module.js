(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-solgencontactlist-solgencontactlist-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgencontactlist/addeditcustomcontact.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgencontactlist/addeditcustomcontact.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\" *ngIf=\"islead == true\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/lead\">Lead</a></li>\r\n      <li><a href=\"javascript:void(0);\" (click)=\"close()\">View lead</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n    <ol class=\"breadcrumb\" *ngIf=\"islead == false && isaccount == false && isopportunity == false \">\r\n     \r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/contactlist\">Manage Contact</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n    <ol class=\"breadcrumb\" *ngIf=\"isaccount == true\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a href=\"javascript:void(0);\" (click)=\"close()\">Manage Accounts</a></li>\r\n     \r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n    <ol class=\"breadcrumb\" *ngIf=\"isopportunity == true\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a  href=\"javascript:void(0);\" (click)=\"close()\">Opportunity Detail</a></li>\r\n     \r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList ;let i=index\">\r\n        <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row  mb-2\">\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n\r\n\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'\" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n    <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n  </a>-->\r\n              <div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">\r\n\r\n\r\n\r\n                <!--text  [placeholder]=\"inner.display_name\"-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint'\r\n                       && inner.dt_code !='map' && inner.dt_code !='map_search'\" />\r\n\r\n\r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'map'\">\r\n                  <div [innerHTML]=\"inner.value\"></div>\r\n                </div>\r\n\r\n                <div class=\"top\" *ngIf=\"inner.dt_code == 'map_search' && displayType == 'ADD'\">\r\n                  <a (click)=\"mapPopUP()\" href=\"javascript:void(0);\" class=\"btn btn-info\"><i class=\"fa fa-search mr-2\"></i> Search Location</a>\r\n                </div>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                <p-calendar inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n\r\n                <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n    [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                <!--end calandar-->\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox\">\r\n\r\n                      <input id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\"\r\n                             class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                      <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}\">{{inner.display_name}}</label>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                        <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                   [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n            <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n                        ne\r\n\r\n\r\n\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\">\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--Ng Dropdown-->\r\n                <!--Dropdown\r\n    picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n    -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.dt_code=='select' }\" *ngIf=\"inner.dt_code=='select' && inner.select_options==''\">\r\n      <option value=\"\">Select</option>\r\n      <option [value]=\"option.id\"\r\n              *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n        {{//option.value}}\r\n      </option>\r\n    </select>-->\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (clear)=\"onClearLang(item.InnerData,j)\"\r\n                           (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code!=null && inner.dropdown_type==null\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code==null && inner.dropdown_type==null\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true' && inner.dropdown_type==null\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.ColumnName!='RecordTypeId' && inner.field_code!=null && inner.dropdown_type=='Normal' && !inner.is_readOnly\"\r\n                           [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n\r\n                <!--Dropdown\r\n      picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n    -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n            (change)='onOptionsSelected($event,inner)'>\r\n      <option value=\"\">Select</option>\r\n      <option [value]=\"option.name\"\r\n              *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n        {{//option.name}}\r\n      </option>\r\n\r\n    </select>-->\r\n\r\n\r\n              </div>\r\n\r\n\r\n\r\n\r\n              \n\r\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf=\"isAdd\" href=\"javascript:void(0);\" class=\"btn btn-success mr-1\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div> \r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n<div class=\"modal fade show\" bsModal #mapLocation=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-xl modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Search Location</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closemapsearch()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow: auto; margin-bottom: 10px; max-height: 496px; overflow-x: hidden; line-height: 24px; font-size: 13px;\">\r\n        <div class=\"row mb-3\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"pac-card\" id=\"pac-card\">\r\n\r\n              <div id=\"pac-container\" class=\"form-group\">\r\n                <input id=\"pac-input\" class=\"form-control\" type=\"text\" placeholder=\"Enter a location\" />\r\n              </div>\r\n            </div>\r\n            <div id=\"map\" class=\"d-none\"></div>\r\n          </div>\r\n        </div>\r\n        <!--<p-gmap [options]=\"options\" [overlays]=\"overlays\" [style]=\"{'width':'100%','height':'400px'}\"></p-gmap>-->\r\n\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgencontactlist/customcontactlist.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgencontactlist/customcontactlist.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Contact</strong></h2>\r\n  <p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Contact</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-7\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i></span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i></span></a>\r\n                <a class=\"btn btn-white form-btns\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i></span></a>\r\n                <div class=\"d-inline-block align-middle pl-3\">\r\n                  <label class=\"d-inline-block\"><b>Search in all records</b></label>\r\n                  <div class=\"form-group d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <input type=\"checkbox\" id=\"allRecords\" formControlName=\"allRecords\" [checked]=\"myCheckbox\" (click)=\"switchClicked($event)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-5\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0\">\r\n                <ng-select [items]=\"pagedData.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i></span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/contactlist/addContact\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add Contact\"><i class=\"fa fa-plus\"></i></a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rowHeight]=\"40\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [scrollbarH]=\"true\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'FirstName' || col.COLUMN_NAME == 'LastName'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/contactlist/view',row.Id]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'FirstName' && col.COLUMN_NAME != 'LastName'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\" *ngIf=\"col.DATA_TYPE=='date' || col.COLUMN_NAME=='CreatedAt'|| col.COLUMN_NAME=='ModifyAt'\">\r\n                  {{ row[col.COLUMN_NAME] | DateTimeToLocal }}\r\n                </div>\r\n\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.COLUMN_NAME!='CreatedAt' && col.COLUMN_NAME!='ModifyAt' && col.DATA_TYPE!='bit' && col.FieldType != 'select'\">\r\n                  {{row[col.COLUMN_NAME] }}\r\n                </div>\r\n                <div *ngIf=\"col.FieldType == 'select'\">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                  <div *ngIf=\"col.FieldFrom==null\">\r\n                    <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                      <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                      <div *ngIf=\"itemColorCode.colorkey!=undefined\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <!--<div class=\"text-center\">\r\n\r\n                <a *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag' [routerLink]=\"['/contactlist/editContact',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                <a *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag' title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n              </div>-->\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.Id\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.Id}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <a class=\"actions-onclick view-list\" [routerLink]=\"['/contactlist/view',row.Id]\" title=\"View Detail\"><i class=\"fa text-info fa-eye pr-2\"></i></a>\r\n                    <a *ngIf='isUpdate' class=\"actions-onclick view-list\" [routerLink]=\"['/contactlist/editContact',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"crm\" subModuleName=\"contact\"></app-searchfilteradd>\r\n<app-manageviewnew #templateManageView (customViewid)=\"GetcustomViewid($event)\" moduleName=\"crm\" subModuleName=\"contact\"></app-manageviewnew>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgencontactlist/viewsolgencontactdetail.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgencontactlist/viewsolgencontactdetail.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Contact Details</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/contactlist\">Manage Contact</a></li>\r\n      <li class=\"active\">Contact Details</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-bullseye bg-info text-white float-left p-1 mr-2\"></i>\r\n    <span class=\"float-left w-85-res\"><span>Contact Name</span> {{CampaignName}}</span>\r\n    <span class=\"cntnt-right-btn mr15 btn-iconres\">\r\n      <a href=\"javascript:void(0);\" [routerLink]=\"['/contactlist/editContact',Id]\" class=\"btn btn-success text-white mr-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n    </span>\r\n  </span>\r\n  <div class=\"col-12 float-left d-md-flex p-0 py-resp py-2 py-sm-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n\r\n      <div class=\"col py-2\">\r\n        <span class=\"d-block\"><strong>{{ item.DisplayName}}:</strong> {{ item.Value}}</span>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mt-3 mb-4 border-0\" style=\"background:none\">\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-12 col-lg-8\">\r\n            <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                <ng-container *ngFor=\"let item of formControlList\">\r\n                  <div class=\"panel active\">\r\n                    <div class=\"panel-heading\">\r\n                      <h4 class=\"panel-title\">\r\n                        <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                          <span> {{item.group_name}}</span>\r\n                        </a>\r\n                      </h4>\r\n                    </div>\r\n                    <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                      <div class=\"panel-body row px-0 mt-0\">\r\n                        <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                          <div class=\"input-group border-bottom\">\r\n                            <div class=\"col-sm-12 col-md-6 px-0\">\r\n                              <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                            </div>\r\n                            <div class=\"col-sm-12 col-md-6\">\r\n                              <span *ngIf='inner.dt_code==\"datetime\" ' class=\"py-2 d-block\">\r\n                                {{ inner.value | DateTimeToLocal}}\r\n                              </span>\r\n                              <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.dt_code!='datetime'\" class=\"py-2 d-block\">{{ inner.value}}</span>\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch  mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                              <!--============================== For CheckBox ===========================-->\r\n                              <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                                <div class=\"form-check form-check-inline\">\r\n                                  <div class=\"custom-control custom-checkbox pl-0\">\r\n                                    <label class=\"switch mb-0\">\r\n                                      <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                      <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ng-container>\r\n              </form>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-12 col-lg-4 relatedtab\">\r\n            <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#Opportunity\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Opportunity ({{campaignMembersCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"Opportunity\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstCampaignMembers.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstCampaignMembers.pager.totalItems\"\r\n                                     [offset]=\"lstCampaignMembers.pager.currentPage\"\r\n                                     [limit]=\"lstCampaignMembers.pager.pageSize\"\r\n                                     (page)='setcampaignMemberPageNo($event)'\r\n                                     (sort)=\"onCampaignMembersSort($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Opportunity Name\" prop=\"OpportunityName\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div title=\"{{row.AccountName}}\">\r\n                              <a [routerLink]=\"['/opportunity/viewOpportunity',row.opportunityId]\">{{row.AccountName| truncate}}</a>&nbsp;\r\n                            </div>\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Account Name\" prop=\"AccountName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Close Date\" prop=\"CloseDate\" [minWidth]=\"130\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.CloseDate | utcdatetimetolocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstCampaignMembers.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstCampaignMembers.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\">\r\n                              {{rowCount}} total\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                             [page]=\"lstCampaignMembers.pager.currentPage\"\r\n                                             [size]=\"lstCampaignMembers.pager.pageSize\"\r\n                                             [count]=\"lstCampaignMembers.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstCampaignMembers.pager.pageSize) > 1)\"\r\n                                             (change)=\"setcampaignMemberPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#RelatedAccounts\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Related Accounts ({{relatedAccountListCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"RelatedAccounts\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstRelatedAccount.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstRelatedAccount.pager.totalItems\"\r\n                                     [offset]=\"lstRelatedAccount.pager.currentPage\"\r\n                                     [limit]=\"lstRelatedAccount.pager.pageSize\"\r\n                                     (page)='setRelatedPageNo($event)'\r\n                                     (sort)=\"onRelatedSort($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Account Name\" prop=\"AccountName\" [sortable]=\"true\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div title=\"{{row.AccountName}}\">\r\n                              <a [routerLink]=\"['/accountslist/view',row.accountId]\">{{row.AccountName| truncate}}</a>&nbsp;\r\n                            </div>\r\n                          </ng-template>\r\n\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Contact Name\" prop=\"ContactName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstRelatedAccount.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstRelatedAccount.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\">\r\n                              {{rowCount}} total\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                             [page]=\"lstRelatedAccount.pager.currentPage\"\r\n                                             [size]=\"lstRelatedAccount.pager.pageSize\"\r\n                                             [count]=\"lstRelatedAccount.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstRelatedAccount.pager.pageSize) > 1)\"\r\n                                             (change)=\"setRelatedPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#Leads\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Leads ({{leadsCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"Leads\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstLeads.data\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstLeads.pager.totalItems\"\r\n                                     [offset]=\"lstLeads.pager.currentPage\"\r\n                                     [limit]=\"lstLeads.pager.pageSize\"\r\n                                     (page)='setProposalsPageNo($event)'\r\n                                     (sort)=\"onProposalsSort($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Lead Name\" prop=\"LeadName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Lead Email\" prop=\"LeadEmail\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Lead Phone\" prop=\"leadPhone\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"contactName\" prop=\"contactName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Title\" prop=\"Title\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstLeads.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstLeads.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\">\r\n                              {{rowCount}} total\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                             [page]=\"lstLeads.pager.currentPage\"\r\n                                             [size]=\"lstLeads.pager.pageSize\"\r\n                                             [count]=\"lstLeads.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstProposals.pager.pageSize) > 1)\"\r\n                                             (change)=\"setProposalsPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#contracts\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Contracts ({{contactCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"contracts\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body row px-3\">\r\n                    <div class=\"table-responsive\">\r\n                      <div class=\"table table-striped\">\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#proposals\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Proposals ({{proposalsCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"proposals\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstProposals.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstProposals.pager.totalItems\"\r\n                                     [offset]=\"lstProposals.pager.currentPage\"\r\n                                     [limit]=\"lstProposals.pager.pageSize\"\r\n                                     (page)='setProposalsPageNo($event)'\r\n                                     (sort)=\"onProposalsSort($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Proposal Name\" prop=\"name\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Proposal Number\" prop=\"proposalNumber\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Opportunity Name\" prop=\"OpportunityName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Contact Name\" prop=\"ContactName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Title\" prop=\"Title\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstProposals.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstProposals.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\">\r\n                              {{rowCount}} total\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                             [page]=\"lstProposals.pager.currentPage\"\r\n                                             [size]=\"lstProposals.pager.pageSize\"\r\n                                             [count]=\"lstProposals.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstProposals.pager.pageSize) > 1)\"\r\n                                             (change)=\"setProposalsPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <app-files title=\"Files\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{Id}}\"></app-files>\r\n\r\n              <!--====================================================== Notes =============================================================-->\r\n              <!--<div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Notes ({{NotesCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"notes\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                     (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add</a>\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"NotespagedData.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"NotespagedData.pager.totalItems\"\r\n                                     [offset]=\"NotespagedData.pager.currentPage\"\r\n                                     [limit]=\"NotespagedData.pager.pageSize\"\r\n                                     (page)='setPageNotes($event)'\r\n                                     (sort)=\"onSortNotes($event)\">\r\n\r\n                        <ngx-datatable-column name=\"Note Title\" prop=\"note_name\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Description\" sortable=\"false\" prop=\"note_description\" [sortable]=\"true\" [minWidth]=\"150\">\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-column name=\"Created By\" [sortable]=\"true\" prop=\"createdby\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Created At\" [sortable]=\"true\" prop=\"created_on\" [minWidth]=\"130\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.created_on | DateTimeToLocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            <div class=\"text-center\">\r\n                              <a href=\"javascript:;\" (click)=\"ViewNotes(row)\" title=\"View Notes\"><i class=\"fa fa-eye pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"EditNotes(row)\" title=\"Edit Notes\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                              <a href=\"javascript:void(0);\" (click)=\"DeleteNote(row,'AssignedResource')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                            </div>\r\n\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"curPageNotes\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\">\r\n                              total\r\n                              {{rowCount}}\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                             [page]=\"curPageNotes\"\r\n                                             [size]=\"pageSizeValuenotes\"\r\n                                             [count]=\"NotespagedData.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                             (change)=\"setPageNotes($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>-->\r\n\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#notes\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Notes ({{notescount}}) </span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n\r\n\r\n                <div id=\"panelBodynine\" class=\"panel-collapse active show p-0 border-0\" data-parent=\"#accordion\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn-in-panel\"\r\n                     (click)=\"AddNotes()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> New</a>\r\n\r\n\r\n\r\n                  <div id=\"notes\" class=\"panel-collapse collapse active show\">\r\n\r\n                    <app-newnoteslist #listnotesmodel subModuleName=\"contact\" [AccountId]=\"accountId\" [ObjectRefId]=\"Id\" (newItemEvent)=\"addItem($event)\">\r\n\r\n                    </app-newnoteslist>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--==============================================================================================================================-->\r\n              <!--===================================================== NotesPopupModel ========================================================-->\r\n              <div class=\"modal fade in show\" bsModal #NotesPopupModel=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n                <div class=\"modal-dialog modal-lg modal-info \">\r\n                  <div class=\"modal-content\">\r\n                    <div class=\"modal-header\" *ngIf=\"!isViewNote\">\r\n                      <h4 class=\"modal-title\">{{title}}</h4>\r\n                      <button type=\"button\" class=\"close\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                        <span aria-hidden=\"true\">&times;</span>\r\n                      </button>\r\n                    </div>\r\n                    <div class=\"modal-header\" *ngIf=\"isViewNote\">\r\n                      <h4 class=\"modal-title\">View NOTES</h4>\r\n                      <button type=\"button\" class=\"close\" (click)=\"closeNotesPopupModelPopup()\" aria-label=\"Close\">\r\n                        <span aria-hidden=\"true\">&times;</span>\r\n                      </button>\r\n                    </div>\r\n                    <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:290px;\">\r\n                      <form [formGroup]=\"addNoteForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n                        <div class=\"form-group\" *ngIf=\"!isViewNote\">\r\n                          <div class=\"row mb-2\">\r\n                            <div class=\"col-md-12 col-lg-12\">\r\n                              <label>Note Title:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Note Title\" formControlName=\"noteTitle\" maxlength=\"50\" [ngClass]=\"{'is-invalid': (noteTitle.invalid && (noteTitle.dirty || noteTitle.touched) && (noteTitle.errors?.required || noteTitle.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"noteTitle.invalid && (noteTitle.dirty || noteTitle.touched) && noteTitle.errors?.required\"\r\n                                       class=\"text-danger\">Note Title is required</small>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"row mb-2\">\r\n                            <div class=\"col-md-12 col-lg-12\">\r\n                              <label>Description:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <textarea rows=\"5\" class=\"form-control\" style=\"min-height:120px;\" placeholder=\"Enter Note Description\" formControlName=\"noteDescription\" #machineDescription maxlength=\"500\" [ngClass]=\"{'is-invalid': (noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && (noteDescription.errors?.required || noteDescription.errors?.maxlength)) }\"></textarea>\r\n                                <small *ngIf=\"noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && noteDescription.errors?.required\"\r\n                                       style=\"color:red;\">Description  is required</small>\r\n                                <small *ngIf=\"noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && noteDescription.errors?.maxlength\"\r\n                                       style=\"color:red;\">Notes must be less than 500 characters.</small>\r\n\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"form-group\" *ngIf=\"isViewNote\">\r\n                          <div class=\"row\">\r\n                            <div class=\"col-md-4\">\r\n                              <label><b>Note Title:</b> </label>\r\n                              <span>&nbsp; {{notesTitle}}</span>\r\n                            </div>\r\n                            <div class=\"col-md-12\">\r\n                              <label class=\"m-0\"><b>Description:</b> </label>\r\n                              <span>&nbsp; {{notesDescription}}</span>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </form>\r\n                    </div>\r\n\r\n                    <div class=\"modal-footer\">\r\n                      <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveNote()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n                      <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeNotesPopupModelPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n                    </div>\r\n\r\n                  </div>\r\n                </div>\r\n                <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n              </div>\r\n              <!--===============================================================================================================================-->\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#Cases\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Cases ({{CasesCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"Cases\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body row px-3\">\r\n                    <div class=\"table-responsive\">\r\n                      <div class=\"table table-striped\">\r\n\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#OpportunityPrimary\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Opportunity (Primary Contact {{primaryContactCount}})</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n                <div id=\"OpportunityPrimary\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body p-2 mt-0\">\r\n                    <div class=\"table-responsive ngxtbl\">\r\n                      <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                     [rows]=\"lstPrimaryContact.data\"\r\n                                     [columnMode]=\"'force'\"\r\n                                     [scrollbarH]=\"true\"\r\n                                     [rowHeight]=\"'40'\"\r\n                                     [headerHeight]=\"40\"\r\n                                     [footerHeight]=\"40\"\r\n                                     [externalPaging]=\"true\"\r\n                                     [externalSorting]=\"true\"\r\n                                     [loadingIndicator]=\"loadSave\"\r\n                                     [count]=\"lstPrimaryContact.pager.totalItems\"\r\n                                     [offset]=\"lstPrimaryContact.pager.currentPage\"\r\n                                     [limit]=\"lstPrimaryContact.pager.pageSize\">\r\n                        (page)='setPrimaryContactPageNo($event)'\r\n                        (sort)=\"onPrimaryContactSort($event)\"\r\n                        >\r\n\r\n                        <ngx-datatable-column name=\"Opportunity Name\" prop=\"OpportunityName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Account Name\" prop=\"AccountName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                        <ngx-datatable-column name=\"Close Date\" prop=\"CloseDate\" [minWidth]=\"130\">\r\n                          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                            {{row.CloseDate | utcdatetimetolocal}}\r\n                          </ng-template>\r\n                        </ngx-datatable-column>\r\n\r\n                        <ngx-datatable-footer>\r\n                          <ng-template ngx-datatable-footer-template\r\n                                       let-rowCount=\"rowCount\"\r\n                                       let-pageSize=\"lstPrimaryContact.pager.pageSize\"\r\n                                       let-selectedCount=\"selectedCount\"\r\n                                       let-currentPage=\"lstPrimaryContact.pager.currentPage\"\r\n                                       let-offset=\"offset\"\r\n                                       let-isVisible=\"isVisible\">\r\n                            <div class=\"page-count\">\r\n                              Total {{rowCount>0?rowCount:0}}\r\n                            </div>\r\n\r\n                            <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                             [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                             [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                             [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                             [page]=\"lstPrimaryContact.pager.currentPage\"\r\n                                             [size]=\"lstPrimaryContact.pager.pageSize\"\r\n                                             [count]=\"lstPrimaryContact.pager.totalItems\"\r\n                                             [hidden]=\"!((rowCount / lstPrimaryContact.pager.pageSize) > 1)\"\r\n                                             (change)=\"setPrimaryContactPageNo($event)\">\r\n                            </datatable-pager>\r\n                          </ng-template>\r\n                        </ngx-datatable-footer>\r\n                      </ngx-datatable>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/solgencontactlist/addeditcustomcontact.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/views/solgencontactlist/addeditcustomcontact.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NvbGdlbmNvbnRhY3RsaXN0L2FkZGVkaXRjdXN0b21jb250YWN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/solgencontactlist/addeditcustomcontact.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/solgencontactlist/addeditcustomcontact.component.ts ***!
  \***************************************************************************/
/*! exports provided: AddeditcustomcontactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditcustomcontactComponent", function() { return AddeditcustomcontactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _customcontactlist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customcontactlist.service */ "./src/app/views/solgencontactlist/customcontactlist.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/scriptservice.service */ "./src/app/views/shared/scriptservice.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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










var AddeditcustomcontactComponent = /** @class */ (function () {
    //isAdd: boolean = false;
    function AddeditcustomcontactComponent(fb, customContactlistService, router, toaster, route, commonService, dialogService, script, location) {
        var _this = this;
        this.fb = fb;
        this.customContactlistService = customContactlistService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.script = script;
        this.location = location;
        this.config = [];
        this.moduleName = 'crm';
        this.submoduleName = 'contact';
        this.loadSave = false;
        this.Id = '';
        this.isLead = false;
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _customcontactlist_service__WEBPACK_IMPORTED_MODULE_5__["JsonData"]();
        this.addOrUpdatePermission = false;
        //modulePermission: ModuleList;
        this.leadId = 0;
        this.islead = false;
        this.isaccount = false;
        this.isopportunity = false;
        this.isBanker = false;
        this.isAdd = true;
        this.isUpdate = true;
        this.previousUrl = [];
        this.currentUrl = null;
        this.displayType = 'ADD';
        this.modulePermission = [];
        this.solgenpower = false;
        this.issolgen = '';
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
            console.log('userdetail', userdetail);
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
            _this.userType = userdetail.userType;
            _this.companyType = userdetail.companyType;
            if (_this.companyType == "companytypeSolarInstall") {
                _this.solgenpower = true;
            }
        });
        var priviledgeCode = this.route.snapshot.data.privilegeCode;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        //let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
        //if (add == undefined) {
        //  this.addOrUpdatePermission = false;
        //} else {
        //  this.addOrUpdatePermission = true;
        //}
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CONTACTADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CONTACTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        //alert(this.route.routeConfig.path);
        if (this.route.routeConfig.path == 'addContact/:eid') {
            this.islead = true;
            // console.log(this.route.routeConfig.path, this.islead);
        }
        if (this.route.routeConfig.path == 'addContact/account/:aid') {
            this.isaccount = true;
        }
        if (this.route.routeConfig.path == 'addContact/opportunity/:oid') {
            this.isopportunity = true;
        }
    }
    AddeditcustomcontactComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.script.load("map");
        setTimeout(function () {
            _this.autotext();
        }, 1000);
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            var eid = params.get('eid');
            var aid = params.get('aid');
            var oid = params.get('oid');
            _this.solgenAccountId = params.get('account');
            _this.issolgen = params.get('issolgen');
            _this.leadId = eid;
            _this.accountid = aid;
            _this.opportunityid = oid;
            // console.log('aid', aid);
            if (id) {
                _this.loadSave = true;
                _this.Id = id;
                _this.pageTitle = 'Edit Contact';
                _this.displayType = 'EDIT';
                //this.fillLeadForm(this.Id);
            }
            else {
                _this.displayType = 'ADD';
                _this.pageTitle = 'Add Contact';
                ;
            }
        });
        if (this.userType == "usertypebanker") { //|| this.userType =='usertypecompanyadmin'  remove by aakash and deepanshu
            this.isaccount = true;
            if (this.commonService.getQueryStringValue("account") != null)
                this.accountid = this.commonService.getQueryStringValue("account");
        }
        var aic = this.Id;
        if (aic == '') {
            aic = this.accountid;
        }
        this.customContactlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, aic, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.customContactlistService.customFieldsList.data;
                console.log("this.customCompnentValues", _this.customCompnentValues);
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _customcontactlist_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
                    else {
                        val = (cnt.value == '' ? null : cnt.value);
                    }
                    debugger;
                    if (_this.accountid > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
                        val = _this.accountid;
                        if (_this.isaccount) {
                            cnt.is_readonly = false;
                        }
                    }
                    if (_this.leadId > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
                        // console.log("islead");
                        cnt.is_required = null;
                    }
                    //------show Role dropdown for Dealer
                    if (cnt.dt_code == 'select' && cnt.field_code == 'Contact_Role') {
                        cnt.is_required = false;
                        cnt.form_field_visibility = 'NO';
                        if (_this.isaccount) {
                            cnt.is_required = true;
                            cnt.form_field_visibility = 'YES';
                        }
                    }
                    //------
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
                    //console.log("name", cnt.name);
                    // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                    //if (typeof this.form != 'undefined') {
                    //  console.log('form', this.form);
                    //  if (cnt.name == 'Email' && this.Id > 0) {
                    //    console.log('form', this.form);
                    //    //console.log("Personal", this.form.controls['295_Email']);
                    //   // if (this.form.controls['295_Email']) {
                    // this.form.controls['295_Email'];
                    //  //  }
                    //  }
                    //}
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                //if (this.Id > 0) {
                // this.form.controls['295_Email'].disable();
                //}
                //console.log('form update: ', this.form);
                _this.loadSave = false;
            }
        });
        // console.log('path',this.route.routeConfig.path);
        if (this.route.routeConfig.path == 'addContact/:eid') {
            this.islead = true;
            // console.log(this.route.routeConfig.path, this.islead);
        }
        if (this.route.routeConfig.path == 'addContact/account/:aid') {
            this.isaccount = true;
        }
        if (this.route.routeConfig.path == 'addContact/opportunity/:oid') {
            this.isopportunity = true;
        }
        //this.heading = "Manage Rides";
    };
    AddeditcustomcontactComponent.prototype.checkvalue = function (formvalues, selval) {
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
    AddeditcustomcontactComponent.prototype.test = function (e) {
        // console.log('sssss', e);
        e.stopPropagation();
        e.preventDefault();
    };
    AddeditcustomcontactComponent.prototype.OnCheck = function () {
        // console.log(this.form);
    };
    AddeditcustomcontactComponent.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        //alert(this.accountid);
        //alert(this.isaccount); 
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
        if (this.form.valid) {
            this.loadSave = true;
            this.JsonData.Id = this.Id;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            this.JsonData.companyId = this.companyId;
            this.JsonData.userId = this.userId;
            this.JsonData.FormJsonData = JSON.stringify(this.form.value);
            var checkEmail = this.form.controls['295_Email'].value;
            if (this.Id == null || this.Id == '') {
                this.customContactlistService.CheckUserDuplicateORAssociate(checkEmail).subscribe(function (result) {
                    if (result.responseMessage == "duplicate") {
                        _this.loadSave = false;
                        _this.loadSave = false;
                        _this.toaster.error("Email Already Exists");
                        return false;
                    }
                    else if (result.responseMessage == "associate") {
                        _this.loadSave = false;
                        _this.dialogService.confirm('Associate Contact', "Email already exists in other Company. Do you want to Associate it?").subscribe(function (confirmed) {
                            if (confirmed) {
                                _this.customContactlistService.addEditForm(_this.JsonData, _this.leadId, _this.accountid, _this.opportunityid).subscribe(function (result) {
                                    if (result.statusCode == 200) {
                                        //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                                        //// console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
                                        //this.toaster.success(result.responseMessage);
                                        setTimeout(function () {
                                            _this.toaster.success(result.responseMessage);
                                            _this.loadSave = false;
                                            _this.close();
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
                                _this.loadSave = false;
                            }
                        });
                    }
                    else {
                        _this.customContactlistService.addEditForm(_this.JsonData, _this.leadId, _this.accountid, _this.opportunityid).subscribe(function (result) {
                            if (result.statusCode == 200) {
                                //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                                //// console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
                                //this.toaster.success(result.responseMessage);
                                setTimeout(function () {
                                    _this.toaster.success(result.responseMessage);
                                    _this.loadSave = false;
                                    _this.close();
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
                });
            }
            else {
                this.customContactlistService.addEditForm(this.JsonData, this.leadId, this.accountid, this.opportunityid).subscribe(function (result) {
                    if (result.statusCode == 200) {
                        //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                        //// console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
                        //this.toaster.success(result.responseMessage);
                        setTimeout(function () {
                            _this.toaster.success(result.responseMessage);
                            _this.loadSave = false;
                            _this.close();
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
        }
        else {
            this.commonService.validateAllFormFields(this.form);
            this.loadSave = false;
        }
    };
    AddeditcustomcontactComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
    };
    AddeditcustomcontactComponent.prototype.close = function () {
        if (this.islead == true) {
            if (this.solgenpower == true) {
                this.router.navigate(['../lead/view', this.leadId]);
            }
            else {
                this.router.navigate(['../lead/viewlead', this.leadId]);
            }
        }
        else if (this.isaccount == true) {
            this.router.navigate(['../accountslist/viewaccount', this.accountid]);
            //this.router.navigate(['../accountslist/view', this.accountid]);
        }
        else if (this.isopportunity == true) {
            if (this.solgenpower == true) {
                this.router.navigate(['../opportunity/viewOpportunity', this.opportunityid]);
            }
            else {
                this.router.navigate(['../opportunity/view', this.opportunityid]);
            }
        }
        else if (this.issolgen == 'true') {
            this.router.navigate(['../accountslist/view', this.solgenAccountId]);
            //accountslist / view / 46452
        }
        else {
            this.location.back();
            //this.router.navigateByUrl("/contactlist");
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
    AddeditcustomcontactComponent.prototype.fillLeadForm = function (id) {
        var _this = this;
        this.customContactlistService.GetSolgenContactDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe(function (result) {
            // // console.log("result1212", this.leadService.leadEditPage.data[0]);
            var edit;
            edit = _this.customContactlistService.editPage.data[0];
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
                /////
                // console.log("formGroup", this.form.value);
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditcustomcontactComponent.prototype.MakeArray = function (value, type) {
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
    AddeditcustomcontactComponent.prototype.MakeNormalArray = function (value) {
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
    AddeditcustomcontactComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
            //objItem.select_options = array;
        }
        return array;
    };
    AddeditcustomcontactComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        // console.log('new', e);
        //const index2: number = this.formControlList.indexOf(groupdisp);
        //const index1: number = controldisp.display_order;
        var checkboxdatanew = new _customcontactlist_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
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
    //onClearLang(dataList: any, j: number): void {
    //  this.len = 0
    //  this.custom_field_id = dataList[j].custom_field_id;
    //  this.field_code = dataList[j].field_code;
    //  this.searchText = '';
    //  this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
    //    this.scrollDataList = this.commonService.customFieldsListData;
    //    console.log('scrollDataList:', this.scrollDataList);
    //    (dataList[j].select_options as any[]) = this.scrollDataList;
    //  })
    //}
    AddeditcustomcontactComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    AddeditcustomcontactComponent.prototype.fetchMore = function (dataList, j) {
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
    AddeditcustomcontactComponent.prototype.onKey = function (e, dataList, j) {
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
    AddeditcustomcontactComponent.prototype.onClearLang = function (dataList, j) {
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
    AddeditcustomcontactComponent.prototype.getreturnNumber = function (x, y) {
        return x + y;
    };
    AddeditcustomcontactComponent.prototype.mapPopUP = function () {
        this.mapLocation.show();
    };
    AddeditcustomcontactComponent.prototype.closemapsearch = function () {
        this.mapLocation.hide();
    };
    AddeditcustomcontactComponent.prototype.autotext = function () {
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
            //infowindowContent.children["place-icon"].src = place.icon;
            //infowindowContent.children["place-name"].textContent = place.name;
            //infowindowContent.children["place-address"].textContent = address;
            //infowindow.open(map, marker);
        });
        // Sets a listener on a given radio button. The radio buttons specify
        // the countries used to restrict the autocomplete search.
        //function setupClickListener(id, countries) {
        //  const radioButton = document.getElementById(id) as HTMLElement;
        //  radioButton.addEventListener("click", () => {
        //    autocomplete.setComponentRestrictions({ country: countries });
        //  });
        //}
        //setupClickListener("changecountry-usa", "us");
        //setupClickListener("changecountry-usa-and-uot", [
        //  "us",
        //  "pr",
        //  "vi",
        //  "gu",
        //  "mp",         
        //]);
    };
    AddeditcustomcontactComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _customcontactlist_service__WEBPACK_IMPORTED_MODULE_5__["CustomContactListService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_8__["ScriptService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapLocation', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], AddeditcustomcontactComponent.prototype, "mapLocation", void 0);
    AddeditcustomcontactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditcustomcontact',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditcustomcontact.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgencontactlist/addeditcustomcontact.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditcustomcontact.component.scss */ "./src/app/views/solgencontactlist/addeditcustomcontact.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _customcontactlist_service__WEBPACK_IMPORTED_MODULE_5__["CustomContactListService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"], _shared_scriptservice_service__WEBPACK_IMPORTED_MODULE_8__["ScriptService"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"]])
    ], AddeditcustomcontactComponent);
    return AddeditcustomcontactComponent;
}());



/***/ }),

/***/ "./src/app/views/solgencontactlist/customcontactlist.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/views/solgencontactlist/customcontactlist.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NvbGdlbmNvbnRhY3RsaXN0L2N1c3RvbWNvbnRhY3RsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/solgencontactlist/customcontactlist.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/solgencontactlist/customcontactlist.component.ts ***!
  \************************************************************************/
/*! exports provided: CustomcontactlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomcontactlistComponent", function() { return CustomcontactlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/manageview/manageview.component */ "./src/app/views/shared/manageview/manageview.component.ts");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _customcontactlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./customcontactlist.service */ "./src/app/views/solgencontactlist/customcontactlist.service.ts");
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









var CustomcontactlistComponent = /** @class */ (function () {
    function CustomcontactlistComponent(customcontactlistService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.customcontactlistService = customcontactlistService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.custom_view_id = '';
        this.searchFilter = '';
        this.moduleName = 'crm';
        this.submoduleName = 'contact';
        this.searchUserType = '';
        this.ViewModel = '';
        //modulePermission: ModuleList;
        this.modulePermission = [];
        this.loadSave = false;
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.tableName = 'tblContacts';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["SelectionType"];
        this.listFilter = '';
        this.searchTxt = '';
        this.listFiltertext = '';
        this.selected = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.myCheckbox = false;
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CONTACTADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CONTACTUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CONTACTDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
        });
    }
    CustomcontactlistComponent.prototype.ngOnInit = function () {
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.LoadViewData();
        this.refresh();
    };
    CustomcontactlistComponent.prototype.getListingColorCode = function (fieldValue) {
        // debugger
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        console.log('this.lstListingColorCode', this.lstListingColorCode);
        return this.lstListingColorCode;
        //console.log('this.lstListingColorCode', this.lstListingColorCode)
    };
    CustomcontactlistComponent.prototype.SetManageViewValue = function (event, text) {
        this.ViewModel = text;
        this.custom_view_id = event;
        this.refresh();
        //this.LoadViewData();
    };
    CustomcontactlistComponent.prototype.GetcustomViewid = function (event) {
        var _this = this;
        //this.custom_view_id = event;
        //this.refresh();
        if (event == 'undefined' || typeof event == 'undefined') {
            //this.isAddViewFirstTime = true;
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
    CustomcontactlistComponent.prototype.LoadViewData = function () {
        var _this = this;
        this.loadSave = true;
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.customcontactlistService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.customcontactlistService.pagedData;
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
    CustomcontactlistComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    CustomcontactlistComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loadSave = true;
        this.customcontactlistService.GetSolgenContactList(this.listFiltertext, this.searchUserType, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.custom_view_id, this.searchFilter, this.moduleName, this.submoduleName, this.companyId, this.myCheckbox)
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
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    Object.defineProperty(CustomcontactlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    CustomcontactlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    CustomcontactlistComponent.prototype.setPage = function ($event) {
        this.loadSave = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    CustomcontactlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    CustomcontactlistComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    CustomcontactlistComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    CustomcontactlistComponent.prototype.popUpOpen = function () {
        this.is_filter = '';
        this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    CustomcontactlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    CustomcontactlistComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "FirstName like '%" + this.listFilter + "%' or LastName like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    CustomcontactlistComponent.prototype.reset = function () {
        this.table.selected = [];
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.myCheckbox = false;
        this.refresh();
    };
    CustomcontactlistComponent.prototype.onSelect = function (_a) {
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
    CustomcontactlistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete the selected contact(s)?";
            this.dialogService.confirm('Delete Contact(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.customcontactlistService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    CustomcontactlistComponent.prototype.Delete = function (row) {
        var _this = this;
        debugger;
        var message = "Are you sure you want to delete Contact  \"" + row.FirstName + "\"?";
        this.dialogService.confirm('Delete Contact', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.customcontactlistService.DeleteRecords(row.Id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Contact \"" + row.FirstName + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    CustomcontactlistComponent.prototype.switchClicked = function (event) {
        this.listFiltertext = '';
        this.myCheckbox = event.srcElement.checked;
        this.currentPage = 1;
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "FirstName like '%" + this.listFilter + "%' or LastName like '%" + this.listFilter + "%'";
        }
        if (this.listFiltertext.trim().length > 0) {
            this.refresh();
        }
        if (this.myCheckbox == false) {
            this.refresh();
        }
    };
    CustomcontactlistComponent.ctorParameters = function () { return [
        { type: _customcontactlist_service__WEBPACK_IMPORTED_MODULE_7__["CustomContactListService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_1__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__["SearchfilteraddComponent"])
    ], CustomcontactlistComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageview_manageview_component__WEBPACK_IMPORTED_MODULE_5__["ManageviewComponent"])
    ], CustomcontactlistComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["DatatableComponent"])
    ], CustomcontactlistComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], CustomcontactlistComponent.prototype, "offset", void 0);
    CustomcontactlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customcontactlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./customcontactlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgencontactlist/customcontactlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./customcontactlist.component.scss */ "./src/app/views/solgencontactlist/customcontactlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_customcontactlist_service__WEBPACK_IMPORTED_MODULE_7__["CustomContactListService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_1__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], CustomcontactlistComponent);
    return CustomcontactlistComponent;
}());



/***/ }),

/***/ "./src/app/views/solgencontactlist/solgencontactlist.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/solgencontactlist/solgencontactlist.module.ts ***!
  \*********************************************************************/
/*! exports provided: SolgencontactlistModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolgencontactlistModule", function() { return SolgencontactlistModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _customcontactlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customcontactlist.component */ "./src/app/views/solgencontactlist/customcontactlist.component.ts");
/* harmony import */ var _sologencontactlist_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sologencontactlist-routing.module */ "./src/app/views/solgencontactlist/sologencontactlist-routing.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _addeditcustomcontact_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addeditcustomcontact.component */ "./src/app/views/solgencontactlist/addeditcustomcontact.component.ts");
/* harmony import */ var _viewsolgencontactdetail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./viewsolgencontactdetail.component */ "./src/app/views/solgencontactlist/viewsolgencontactdetail.component.ts");
/* harmony import */ var _lead_lead_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lead/lead.module */ "./src/app/views/lead/lead.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};












var SolgencontactlistModule = /** @class */ (function () {
    function SolgencontactlistModule() {
    }
    SolgencontactlistModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_customcontactlist_component__WEBPACK_IMPORTED_MODULE_2__["CustomcontactlistComponent"], _addeditcustomcontact_component__WEBPACK_IMPORTED_MODULE_9__["AddeditcustomcontactComponent"], _viewsolgencontactdetail_component__WEBPACK_IMPORTED_MODULE_10__["ViewsolgencontactdetailComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _sologencontactlist_routing_module__WEBPACK_IMPORTED_MODULE_3__["CustomContactListRouting"], _lead_lead_module__WEBPACK_IMPORTED_MODULE_11__["LeadModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_4__["ModalModule"]
            ]
        })
    ], SolgencontactlistModule);
    return SolgencontactlistModule;
}());



/***/ }),

/***/ "./src/app/views/solgencontactlist/sologencontactlist-routing.module.ts":
/*!******************************************************************************!*\
  !*** ./src/app/views/solgencontactlist/sologencontactlist-routing.module.ts ***!
  \******************************************************************************/
/*! exports provided: CustomContactListRouting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomContactListRouting", function() { return CustomContactListRouting; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _customcontactlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customcontactlist.component */ "./src/app/views/solgencontactlist/customcontactlist.component.ts");
/* harmony import */ var _addeditcustomcontact_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditcustomcontact.component */ "./src/app/views/solgencontactlist/addeditcustomcontact.component.ts");
/* harmony import */ var _viewsolgencontactdetail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./viewsolgencontactdetail.component */ "./src/app/views/solgencontactlist/viewsolgencontactdetail.component.ts");
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
    { path: '', component: _customcontactlist_component__WEBPACK_IMPORTED_MODULE_2__["CustomcontactlistComponent"] },
    { path: 'editContact/:id', component: _addeditcustomcontact_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcustomcontactComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'ContactAdd' } },
    { path: 'addContact', component: _addeditcustomcontact_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcustomcontactComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'ContactUpdate' } },
    { path: 'addContact/:eid', component: _addeditcustomcontact_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcustomcontactComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'ContactAdd' } },
    { path: 'addContact/opportunity/:oid', component: _addeditcustomcontact_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcustomcontactComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'ContactAdd' } },
    { path: 'addContact/account/:aid', component: _addeditcustomcontact_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcustomcontactComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]], data: { privilegeCode: 'accountviewAdd', moduleCode: '4008' } },
    { path: 'view/:id', component: _viewsolgencontactdetail_component__WEBPACK_IMPORTED_MODULE_4__["ViewsolgencontactdetailComponent"] },
];
var CustomContactListRouting = /** @class */ (function () {
    function CustomContactListRouting() {
    }
    CustomContactListRouting = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CustomContactListRouting);
    return CustomContactListRouting;
}());



/***/ }),

/***/ "./src/app/views/solgencontactlist/viewsolgencontactdetail.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/views/solgencontactlist/viewsolgencontactdetail.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NvbGdlbmNvbnRhY3RsaXN0L3ZpZXdzb2xnZW5jb250YWN0ZGV0YWlsLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/solgencontactlist/viewsolgencontactdetail.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/views/solgencontactlist/viewsolgencontactdetail.component.ts ***!
  \******************************************************************************/
/*! exports provided: ViewsolgencontactdetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewsolgencontactdetailComponent", function() { return ViewsolgencontactdetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _customcontactlist_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customcontactlist.service */ "./src/app/views/solgencontactlist/customcontactlist.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
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











var ViewsolgencontactdetailComponent = /** @class */ (function () {
    function ViewsolgencontactdetailComponent(toaster, dialogService, fb, contractService, commonService, router, route, leadservice, location) {
        var _this = this;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.fb = fb;
        this.contractService = contractService;
        this.commonService = commonService;
        this.router = router;
        this.route = route;
        this.leadservice = leadservice;
        this.location = location;
        this.notemodel = new _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__["noteModel"]();
        this.isEdit = false;
        this.moduleName = 'crm';
        this.submoduleName = 'contact';
        this.CasesCount = 0;
        this.formControlList = [];
        this.notescount = 0;
        this.loadSave = false;
        this.accountId = 0;
        this.displayType = 'VIEW';
        this.CampaignName = "";
        this.lstCampaignMembers = {
            pager: {},
            data: []
        };
        this.lstRelatedAccount = {
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
        this.contactCount = 0;
        this.leadCount = 0;
        this.proposalsCount = 0;
        this.leadsCount = 0;
        this.pageNo = 0;
        this.pageSize = 10;
        this.sortDir = 'desc';
        this.sortColumn = 'createdOn';
        this.campaignMemberPageNo = 0;
        this.proposalsPageNo = 0;
        this.leadsPageNo = 0;
        this.isLoanHomi = false;
        this.submoduleid = 1;
        this.objectname = 'Contact';
        this.pageSizeValuenotes = 4;
        this.NotespagedData = {
            pager: {},
            data: []
        };
        this.NotesCount = 0;
        this.isViewNote = false;
        this.customCompnentValuesTop = [];
        this.siteurl = '';
        this.checkboxdata1 = [];
        this.primaryContactPageNo = 0;
        this.primaryContactCount = 0;
        this.lstPrimaryContact = {
            pager: {},
            data: []
        };
        //=============================================================================
        this.addNoteForm = this.fb.group({
            note_id: [null],
            noteTitle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            noteDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            console.log('userdetail', userdetail);
            if (userdetail.companyType.toUpperCase() == 'COMPANYTYPEFINANCIALINSTITUTE') {
                _this.isLoanHomi = true;
            }
        });
    }
    ViewsolgencontactdetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.siteurl = window.location.origin;
        console.log('siteurl', this.siteurl);
        this.loadSave = true;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.Id = id;
        });
        this.currentPageNotes = 1;
        this.GetCustomFieldsList();
        this.getRelatedData();
        this.getNoteslist();
    };
    ViewsolgencontactdetailComponent.prototype.getRelatedData = function () {
        debugger;
        this.refreshMembersList();
        this.refreshProposalsList();
        this.refreshRelatedAccountList();
        this.refreshLeadsList();
        this.refreshPrimaryContactList();
    };
    ViewsolgencontactdetailComponent.prototype.addItem = function (newItem) {
        this.notescount = newItem;
    };
    ViewsolgencontactdetailComponent.prototype.close = function () {
        this.router.navigateByUrl("/contactlist");
    };
    ViewsolgencontactdetailComponent.prototype.GetCustomFieldsList = function () {
        var _this = this;
        // alert(this.submoduleName)
        this.contractService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            console.log("data", _this.contractService.customFieldsList.data);
            if (result) {
                _this.customCompnentValues = _this.contractService.customFieldsList.data;
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _customcontactlist_service__WEBPACK_IMPORTED_MODULE_1__["CheckboxData"]();
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
                var fname_1 = "", lname_1 = "", salutation_1 = '';
                console.log(" this.customCompnentValues", _this.customCompnentValues);
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
                    if (cnt.ColumnName == 'Title' || cnt.ColumnName == 'DirectLine' || cnt.ColumnName == 'Email') {
                        var row = new _customcontactlist_service__WEBPACK_IMPORTED_MODULE_1__["ContactTopViewModel"]();
                        if (cnt.ColumnName == 'Title')
                            row.DisplayOrder = 1;
                        else if (cnt.ColumnName == 'DirectLine')
                            row.DisplayOrder = 2;
                        else if (cnt.ColumnName == 'Email')
                            row.DisplayOrder = 3;
                        row.ColumnName = cnt.ColumnName;
                        row.DisplayName = cnt.display_name;
                        row.Value = cnt.value;
                        _this.customCompnentValuesTop.push(row);
                        _this.customCompnentValuesTop.sort(function (a, b) { return a.DisplayOrder > b.DisplayOrder ? 1 : -1; });
                    }
                    // debugger
                    if (cnt.ColumnName == 'FirstName') {
                        fname_1 = cnt.value;
                    }
                    else if (cnt.ColumnName == 'LastName') {
                        lname_1 = _this.CampaignName + " " + cnt.value;
                    }
                    else if (cnt.ColumnName == 'Salutation') {
                        if (cnt.value != undefined && cnt.value != null && cnt.value != '')
                            salutation_1 = _this.CampaignName + " " + cnt.value;
                    }
                    //////if (cnt.ColumnName == 'AccountId') {
                    //////  // debugger
                    //////  this.CampaignName = cnt.value;
                    //////  if (cnt.value != '' && cnt.select_options != null) {
                    //////    cnt.select_options.forEach(itemList => {
                    //////      if (itemList.value == cnt.value) {
                    //////        cnt.value = itemList.name;
                    //////        this.CampaignName = itemList.name;
                    //////        //alert(this.CampaignName)
                    //////      }
                    //////    });
                    //////  }
                    //////}
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator
                    ]);
                });
                _this.CampaignName = salutation_1 + " " + fname_1 + " " + lname_1;
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"](group_1);
                _this.loadSave = false;
            }
        });
        console.log("row", this.customCompnentValuesTop);
    };
    ViewsolgencontactdetailComponent.prototype.onCampaignMembersSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshMembersList();
    };
    ViewsolgencontactdetailComponent.prototype.onRelatedSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshRelatedAccountList();
    };
    ViewsolgencontactdetailComponent.prototype.onProposalsSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshProposalsList();
    };
    ViewsolgencontactdetailComponent.prototype.onLeadsSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshLeadsList();
    };
    ViewsolgencontactdetailComponent.prototype.refreshMembersList = function () {
        var _this = this;
        this.contractService.GetCampaignMembersList(this.Id, this.sortColumn, this.sortDir, this.campaignMemberPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstCampaignMembers = resp;
            console.log('this.lstCampaignMembers', _this.lstCampaignMembers);
            _this.campaignMembersCount = resp.pager.totalItems;
        });
    };
    ViewsolgencontactdetailComponent.prototype.refreshRelatedAccountList = function () {
        var _this = this;
        this.contractService.GetRelatedAccountForContactList(this.Id, this.sortColumn, this.sortDir, this.proposalsPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstRelatedAccount = resp;
            _this.relatedAccountListCount = resp.pager.totalItems;
        });
    };
    ViewsolgencontactdetailComponent.prototype.refreshProposalsList = function () {
        var _this = this;
        this.contractService.GetProposalsListByContactId(this.Id, this.sortColumn, this.sortDir, this.proposalsPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstProposals = resp;
            _this.proposalsCount = _this.lstProposals.pager.totalItems;
        });
    };
    ViewsolgencontactdetailComponent.prototype.refreshLeadsList = function () {
        var _this = this;
        this.contractService.refreshLeadsList(this.Id, this.sortColumn, this.sortDir, this.leadsPageNo, this.pageSize).subscribe(function (resp) {
            _this.lstLeads = resp;
            _this.leadsCount = resp.pager.totalItems;
            console.log("lstLeads", _this.lstLeads);
        });
    };
    ViewsolgencontactdetailComponent.prototype.setcampaignMemberPageNo = function ($event) {
        this.campaignMemberPageNo = $event.page;
        this.refreshMembersList();
    };
    //onRelatedSort
    ViewsolgencontactdetailComponent.prototype.setRelatedPageNo = function ($event) {
        this.proposalsPageNo = $event.page;
        this.refreshRelatedAccountList();
    };
    ViewsolgencontactdetailComponent.prototype.setLeadsPageNo = function ($event) {
        this.leadsPageNo = $event.page;
        this.refreshLeadsList();
    };
    ViewsolgencontactdetailComponent.prototype.setProposalsPageNo = function ($event) {
        this.leadsPageNo = $event.page;
        this.refreshProposalsList();
    };
    //============================Notes Section ======================================
    ViewsolgencontactdetailComponent.prototype.AddNotes = function () {
        this.title = "Add Notes";
        this.addNoteForm.reset();
        this.isViewNote = false;
        this.listnotesmodel.show(this.Id);
    };
    Object.defineProperty(ViewsolgencontactdetailComponent.prototype, "note_id", {
        //========================Getting Note Form Value=============================
        get: function () { return this.addNoteForm.get('note_id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewsolgencontactdetailComponent.prototype, "noteTitle", {
        get: function () { return this.addNoteForm.get('noteTitle'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewsolgencontactdetailComponent.prototype, "noteDescription", {
        get: function () { return this.addNoteForm.get('noteDescription'); },
        enumerable: true,
        configurable: true
    });
    ViewsolgencontactdetailComponent.prototype.SaveNote = function () {
        var _this = this;
        this.loadSave = true;
        if (this.addNoteForm.valid) {
            this.notemodel.note_id = this.addNoteForm.value.note_id;
            this.notemodel.note_name = this.addNoteForm.value.noteTitle;
            this.notemodel.note_description = this.addNoteForm.value.noteDescription;
            this.notemodel.object_name = "Contact";
            this.notemodel.object_ref_id = this.Id;
            this.notemodel.object_id = 1;
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
    ViewsolgencontactdetailComponent.prototype.getNoteslist = function () {
        var _this = this;
        console.log("dsadas", this.currentPageNotes);
        debugger;
        this.loadSave = true;
        this.leadservice.getNoteslist(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            _this.NotesCount = _this.leadservice.pagedData.pager.totalItems;
            _this.offset = _this.currentPageNotes;
            _this.loadSave = false;
        });
    };
    ViewsolgencontactdetailComponent.prototype.closeNotesPopupModelPopup = function () {
        this.addNotesPopupModel.hide();
        this.addNoteForm.reset();
    };
    ViewsolgencontactdetailComponent.prototype.setPageNotes = function ($event) {
        this.loadSave = true;
        this.currentPageNotes = $event.page;
        this.getNoteslist();
    };
    ViewsolgencontactdetailComponent.prototype.onSortNotes = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPageNotes = 1;
        this.loadSave = true;
        this.getNoteslist();
    };
    Object.defineProperty(ViewsolgencontactdetailComponent.prototype, "curPageNotes", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    ViewsolgencontactdetailComponent.prototype.EditNotes = function (row) {
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
    ViewsolgencontactdetailComponent.prototype.DeleteNote = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Note?";
        this.dialogService.confirm('Delete Note', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.contractService.DeleteRecords(row.note_id, 'tblNotes').subscribe(function (res) {
                    _this.toaster.success("Note has been deleted successfully.");
                    _this.currentPageNotes = 1;
                    _this.getNoteslist();
                });
            }
        });
    };
    ViewsolgencontactdetailComponent.prototype.ViewNotes = function (row) {
        this.isViewNote = true;
        this.notesTitle = row.note_name;
        this.notesDescription = row.note_description;
        this.addNotesPopupModel.show();
    };
    ViewsolgencontactdetailComponent.prototype.OnBackToListClick = function () {
        this.location.back();
    };
    // ======================== Opertunity Primary Contact ============================
    ViewsolgencontactdetailComponent.prototype.setPrimaryContactPageNo = function ($event) {
        debugger;
        this.primaryContactPageNo = $event.page;
        this.refreshPrimaryContactList();
    };
    ViewsolgencontactdetailComponent.prototype.onPrimaryContactSort = function ($event) {
        debugger;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.name;
        this.refreshPrimaryContactList();
    };
    ViewsolgencontactdetailComponent.prototype.refreshPrimaryContactList = function () {
        //this.contractService.GetCampaignMembersList(this.Id, this.sortColumn, this.sortDir, this.primaryContactPageNo, this.pageSize).subscribe(resp => {
        //  this.lstPrimaryContact = resp;
        //  console.log('this.lstPrimaryContact', this.lstPrimaryContact);
        //  this.primaryContactCount = resp.pager.totalItems;
        //});
    };
    ViewsolgencontactdetailComponent.ctorParameters = function () { return [
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _customcontactlist_service__WEBPACK_IMPORTED_MODULE_1__["CustomContactListService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__["LeadlistService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('NotesPopupModel', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalDirective"])
    ], ViewsolgencontactdetailComponent.prototype, "addNotesPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('listnotesmodel', { static: false }),
        __metadata("design:type", _shared_new_notes_newnoteslist_component__WEBPACK_IMPORTED_MODULE_10__["NewnoteslistComponent"])
    ], ViewsolgencontactdetailComponent.prototype, "listnotesmodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ViewsolgencontactdetailComponent.prototype, "offset", void 0);
    ViewsolgencontactdetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewsolgencontactdetail',
            template: __importDefault(__webpack_require__(/*! raw-loader!./viewsolgencontactdetail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/solgencontactlist/viewsolgencontactdetail.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./viewsolgencontactdetail.component.scss */ "./src/app/views/solgencontactlist/viewsolgencontactdetail.component.scss")).default]
        }),
        __metadata("design:paramtypes", [ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _customcontactlist_service__WEBPACK_IMPORTED_MODULE_1__["CustomContactListService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__["LeadlistService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"]])
    ], ViewsolgencontactdetailComponent);
    return ViewsolgencontactdetailComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-solgencontactlist-solgencontactlist-module.js.map