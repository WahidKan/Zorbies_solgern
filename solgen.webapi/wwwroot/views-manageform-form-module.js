(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-manageform-form-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageform/addeditform.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageform/addeditform.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n  <div class=\"header float-left w-100 mb-2\">\r\n    <h2 class=\"float-left pr-2\" *ngIf=\"!isSolgenPower\"><strong>ADD/EDIT FORM FIELDS</strong></h2>\r\n    <h2 class=\"float-left pr-2\" *ngIf=\"isSolgenPower\"><strong>ADD/EDIT SCREEN FIELDS</strong></h2>\r\n    <div class=\"breadcrumb-wrapper\">\r\n      <ol class=\"breadcrumb\">\r\n        <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n        <li><a href=\"javascript:void(0);\" *ngIf=\"!isSolgenPower\" (click)=\"Cancel()\">Manage Form</a></li>\r\n        <li><a href=\"javascript:void(0);\" *ngIf=\"isSolgenPower\" (click)=\"Cancel()\">Manage Screen</a></li>\r\n        <li class=\"active\">{{pageTitle}}</li>\r\n      </ol>\r\n    </div>\r\n\r\n  </div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets \">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-content pb-5\">\r\n        <form [formGroup]=\"manageForm\" autocomplete=\"off\">\r\n          <div class=\"row\" [ngClass]=\"{'disabled':loadSave}\">\r\n            <div class=\"px-1\" id=\"FixedDiv\" [ngClass]=\"(!isCompanyTypeFinancialInstitute)?'col-md-2 col-lg-2':'col-md-3 col-lg-3'\">\r\n              <h3 class=\"side_panel-heading\"> Select New Field</h3>\r\n              <div class=\"bordered-content\">\r\n                <ul class=\"types columnlist list-group custom-field-layout custom-field-layout-left-panel mb-3\">\r\n\r\n                  <li class=\"list-group-item selected\" id=\"1\" code=\"string\" maxlength=\"100\" *ngFor=\"let row of colors\"\r\n                      pDraggable=\"row\"\r\n                      (onDragStart)=\"dragStart($event,row)\" (onDragEnd)=\"dragEnd($event)\">\r\n                    <a href=\"javascript:void(0);\">\r\n                      <i class=\"{{row.class_name}}\"></i>\r\n                      <span>\r\n                        {{row.name}}\r\n                      </span>\r\n                    </a>\r\n                  </li>\r\n                </ul>\r\n\r\n\r\n                <!--<div *ngFor=\"let color of colors\" class=\"border col-md-6 col-lg-6\" pDraggable=\"color\"\r\n           (onDragStart)=\"dragStart($event,color)\" (onDragEnd)=\"dragEnd($event)\">\r\n        <i class=\"{{color.classname}}\"></i>&nbsp;{{color.name}}\r\n      </div>-->\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"px-1\" [ngClass]=\"(!isCompanyTypeFinancialInstitute)?'col-md-7 col-lg-7':'col-md-9 col-lg-9'\">\r\n              <div class=\"drop\" pDroppable=\"row\" (onDrop)=\"drop($event)\" style=\"display:none\">\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <div class=\"form-group d-flex justify-content-between\">\r\n                    <input type=\"text\" class=\"form-control w-50\" formControlName=\"fieldName\" maxlength=\"500\" placeholder=\"Enter Secion name12\">\r\n                    <div class=\"dropdown form-group\">\r\n                      <a href=\"javascript:void(0);\" class=\"column-setting py-2 d-block\" (click)=\"toggleClass($event,'show')\"><i class=\"fa fa-cog text-dark\" style=\"font-size: 20px;\"></i></a>\r\n                      <div class=\"dropdown-menu\" [ngClass]=\"condition ? 'show' : 'hide'\" id=\"column-setting\">\r\n                        <!--<a class=\"dropdown-item\" href=\"javascrip:;\">double Columns</a>-->\r\n                        Select Layout\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <input type=\"radio\" class=\"custom-control-input\" id=\"customRadio1\" name=\"contactPreferredDocumentSignedBy\"\r\n                                 (click)=\"toggleClassRadioButton($event,'single')\" value=\"single\" checked>\r\n                          <label class=\"custom-control-label\" for=\"customRadio1\">Single Columns</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <input type=\"radio\" class=\"custom-control-input\" id=\"customRadio1\" name=\"contactPreferredDocumentSignedBy\"\r\n                                 (click)=\"toggleClassRadioButton($event,'double')\" value=\"double\">\r\n                          <label class=\"custom-control-label\" for=\"customRadio1\">Double Columns</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <!--<a class=\"dropdown-item\" href=\"javascrip:;\">Triple Columns</a>-->\r\n                          <input type=\"radio\" class=\"custom-control-input\" id=\"tripleColumns\" name=\"contactPreferredDocumentSignedBy\"\r\n                                 (click)=\"toggleClassRadioButton($event,'triple')\" value=\"triple\">\r\n                          <label class=\"custom-control-label\" for=\"tripleColumns\">Triple Columns</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <!--<a class=\"dropdown-item\" href=\"javascrip:;\">Four Columns</a>-->\r\n                          <input type=\"radio\" class=\"custom-control-input\" id=\"fourColumns\" (click)=\"toggleClassRadioButton($event,'four')\"\r\n                                 name=\"contactPreferredDocumentSignedBy\" value=\"four\">\r\n                          <label class=\"custom-control-label\" for=\"fourColumns\">Four Columns</label>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <p-orderList [value]=\"droped\" styleClass=\"two-column\" dragdrop=\"true\">\r\n\r\n                  <ng-template let-c pTemplate=\"item\">\r\n\r\n\r\n                    <div class=\"draged-item\" *ngIf=\"c.display_name; else elseblock\">\r\n                      <i class=\"{{c.class_name}}\"></i>&nbsp;{{c.display_name}}<i class=\"fa fa-ellipsis-h text-secondary float-right\"></i>\r\n                    </div>\r\n                    <ng-template #elseblock>\r\n                      <div [ngClass]=\"{'col-12': formPageType =='single', 'col-md-6': formPageType =='double', 'col-lg-4':formPageType =='triple', 'col-lg-3 col-xl-3': formPageType =='four' }\" id=\"newSection\">\r\n                        <div class=\"draged-item\" pDraggable=\"c\" style=\"background-color:antiquewhite\"\r\n                             (onDragStart)=\"dragStartGroupToGroup($event,c)\" (onDragEnd)=\"dragEndGroupToGroup($event)\" *ngIf=\"c.name; else elseblock\">\r\n                          <i class=\"{{c.class_name}}\"></i>\r\n                          {{c.name}} <a href=\"javascript:void(0);\">\r\n                            <span>\r\n                              <span (click)=\"hideme[droped.indexOf(c)+uniqueid] =! hideme[droped.indexOf(c)+uniqueid]\"><i class=\"fa fa-ellipsis-h text-secondary float-right\"></i></span>\r\n                              <div class=\"dropdown-menu\" [ngClass]=\"{'hide' : hideme[droped.indexOf(c)+uniqueid] == false,'show' : hideme[droped.indexOf(c)+uniqueid] == true}\" id=\"column-setting+{{droped.indexOf(c)}}\">\r\n                                <div class=\"custom-control custom-checkbox\">\r\n                                  <input id=\"'chk_'+ {{c.dt_code}}+ '_' + {{c.id}}+ '_' + {{droped.indexOf(c)}}\" class=\"dynamic custom-control-input\" (click)=\"SystemDefinedPropertyRequired(c.id,c,droped.indexOf(c),$event)\" type=\"checkbox\">\r\n                                  <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"'chk_'+ {{c.dt_code}}+ '_' + {{c.id}}+ '_' + {{droped.indexOf(c)}}\">Mark As Required</label>\r\n                                </div>\r\n\r\n                                <div>\r\n                                  <a href=\"javascript:void(0);\" (click)=\"EditCustomFields(c.id,c,droped.indexOf(c))\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-pencil text-success\"></i> <span class=\"ml-1 text-secondary\" style=\"font-size: 14px;\">View Properties</span></a>\r\n                                </div>\r\n                                <div>\r\n                                  <a href=\"javascript:void(0);\" (click)=\"RemoveCustomFieldSystemDefined(droped.indexOf(c),c)\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-trash text-danger\"></i> <span class=\"ml-1 text-dark\" style=\"font-size: 14px;\">Delete Field</span></a>\r\n                                </div>\r\n\r\n                              </div>\r\n                            </span>\r\n                          </a>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </ng-template>\r\n\r\n                  </ng-template>\r\n\r\n                </p-orderList>\r\n              </div>\r\n              <style>\r\n                .customdieldbg {\r\n                  background-color: #effaff;\r\n                }\r\n              </style>\r\n              <!--<div class=\"col-md-8 col-lg-8\">\r\n\r\n    Drag Containers <input type=\"checkbox\" (click)=\"dragfullgroup()\" />\r\n  </div>-->\r\n              <div dnd-sortable-container [sortableData]=\"group\" [dropZones]=\"['container-dropZone']\">\r\n                <ng-container *ngFor=\"let field of group; let a = index\" >\r\n                  <div id=\"container\"  class=\" mb-3\" dnd-sortable [sortableIndex]=\"a\" [dragEnabled]=\"dragOperation\">\r\n                    <div class=\"drop\" pDroppable=\"row\" (onDrop)=\"dropNewGrop($event,a)\" dnd-sortable-container [sortableData]=\"field.controls\" [dropZones]=\"['widget-dropZone']\">\r\n                      <div class=\"drop_right_heading\">\r\n                        <div class=\"col-md-12 col-lg-12\">\r\n                          <div class=\"form-group d-flex justify-content-between\" (mousedown)=\"fordragcontainer()\">\r\n                            <input type=\"text\" class=\"form-control w-50\" [value]=\"field.group_display_name\" (keyup)=\"changegroup($event,a)\" maxlength=\"500\" placeholder=\"Enter Section Name\">\r\n                            <div class=\"dropdown form-group\">\r\n                              <a href=\"javascript:void(0);\" class=\"column-setting py-2 d-block\"\r\n                                 (click)=\"hidemeNewGrp[a] =! hidemeNewGrp[a]\"><i class=\"fa fa-cog text-dark\" style=\"font-size: 20px;\"></i></a>\r\n                              <div class=\"dropdown-menu selctlay\"\r\n                                   [ngClass]=\"{'hide' : hidemeNewGrp[a] == false,'show' : hidemeNewGrp[a] == true}\"\r\n                                   id=\"column-setting\">\r\n                                <span class=\"hedlay\">Select Layout</span>\r\n                                <div class=\"custom-control custom-radio\">\r\n                                  <a href=\"javascript:void(0)\" (click)=\"toggleClassRadioButtonNew($event,a,'single')\">\r\n                                    <input type=\"radio\" class=\"custom-control-input\" id=\"customRadioNewGrpSingle{{a}}\" name=\"contactPreferredDocumentSignedBy{{a}}\"\r\n                                           value=\"single\" [checked]=\"field.group_layout_type=='single'\">\r\n                                    <label class=\"custom-control-label\" for=\"customRadioNewGrpSingle{{a}}\">Single Columns</label>\r\n                                  </a>\r\n                                </div>\r\n                                <div class=\"custom-control custom-radio\">\r\n                                  <a href=\"javascript:void(0)\" (click)=\"toggleClassRadioButtonNew($event,a,'double')\">\r\n                                    <input type=\"radio\" class=\"custom-control-input\" id=\"customRadioNewGrp{{a}}\" name=\"contactPreferredDocumentSignedBy{{a}}\"\r\n                                           value=\"double\" [checked]=\"field.group_layout_type=='double' || field.group_layout_type==''\">\r\n                                    <label class=\"custom-control-label\" for=\"customRadioNewGrp{{a}}\">Double Columns</label>\r\n                                  </a>\r\n                                </div>\r\n                                <div class=\"custom-control custom-radio\">\r\n                                  <a href=\"javascript:void(0)\" (click)=\"toggleClassRadioButtonNew($event,a,'triple')\">\r\n\r\n                                    <input type=\"radio\" class=\"custom-control-input\" id=\"tripleColumnsNewGrp{{a}}\" name=\"contactPreferredDocumentSignedBy{{a}}\"\r\n                                           value=\"triple\" [checked]=\"field.group_layout_type=='triple'\">\r\n                                    <label class=\"custom-control-label\" for=\"tripleColumnsNewGrp{{a}}\">Triple Columns</label>\r\n\r\n                                  </a>\r\n                                </div>\r\n                                <div class=\"custom-control custom-radio\">\r\n                                  <a href=\"javascript:void(0)\" (click)=\"toggleClassRadioButtonNew($event,a,'four')\">\r\n                                    <input type=\"radio\" class=\"custom-control-input\" id=\"fourColumnsNewGrp{{a}}\"\r\n                                           name=\"contactPreferredDocumentSignedBy{{a}}\" value=\"four\" [checked]=\"field.group_layout_type=='four'\">\r\n                                    <label class=\"custom-control-label\" for=\"fourColumnsNewGrp{{a}}\">Four Columns</label>\r\n                                  </a>\r\n                                </div>\r\n                                <div>\r\n                                  <a href=\"javascript:void(0);\" (click)=\"Removeform(a)\" class=\"dropdown-item\" draggable=\"false\"><i class=\"fa fa-trash text-danger\" style=\"font-size: 20px;\"></i> <span class=\"ml-1 text-dark\" style=\"font-size: 14px;\">Delete Section</span></a>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row custom_feild_box\" style=\"min-height:75px;\">\r\n                        <ng-container *ngFor=\"let control of field.controls; let controlIndex=index\">\r\n                          <div [ngClass]=\"{'col-lg-12 col-xl-12': dynamicformNewSection[a] =='single'\r\n                             && !isCompanyTypeFinancialInstitute\r\n                            , 'col-lg-6 col-xl-6': (dynamicformNewSection[a] =='double' ||  dynamicformNewSection[a] == ''), 'col-lg-4 col-xl-4':dynamicformNewSection[a] =='triple', 'col-lg-3 col-xl-3': (dynamicformNewSection[a] =='four' ||  !dynamicformNewSection[a] ) }\">\r\n                            <div class=\"draged-item\" dnd-sortable [sortableIndex]=\"controlIndex\" [dragEnabled]=\"!dragOperation\" (mousedown)=\"fordragcontrol()\"\r\n                                 [dragData]=\"control\" [ngClass]=\"{'customdieldbg': control.is_system_generated ==false}\">\r\n\r\n                              <ng-container *ngIf=\"isCompanyTypeFinancialInstitute;else elseblock;\">\r\n                                <span class=\"form-control w-75 float-left\">{{(control.is_system_generated ==false ? control.name : control.display_name) | DisplayName}}</span>\r\n                                <span class=\"w-25 float-right\" style=\"padding-top:10px;\">\r\n                                  <a href=\"javscript:;\">\r\n                                    <span>\r\n                                      <span (click)=\"hideme[a+''+controlIndex] =! hideme[a+''+controlIndex]\"><i class=\"fa fa-ellipsis-h text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                      <div class=\"dropdown-menu float-right hideshowdropdown quickkact\" [ngClass]=\"{'hide' : hideme[a+''+controlIndex] == false,'show' : hideme[a+''+controlIndex] == true}\" id=\"column-setting{{a}}{{controlIndex}}\">\r\n                                        <div>\r\n                                          <a href=\"javascript:void(0);\" (click)=\"EditCustomFields(a,control.id,control,controlIndex,'NewGroupCreated')\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-pencil text-success\"></i> <span class=\"ml-1 text-secondary\" style=\"font-size: 14px;\">View Properties</span></a>\r\n                                        </div>\r\n                                        <div *ngIf=\"!control.is_system_generated\">\r\n                                          <a href=\"javascript:void(0);\" (click)=\"RemoveCustomFields(a,controlIndex,a+''+controlIndex)\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-trash text-danger\"></i> <span class=\"ml-1 text-dark\" style=\"font-size: 14px;\">Delete Field</span></a>\r\n                                        </div>\r\n\r\n                                      </div>\r\n                                    </span>\r\n                                  </a>\r\n                                </span>\r\n                              </ng-container>\r\n\r\n\r\n                              <ng-template #elseblock>\r\n                                <span class=\"py-1 w-75 float-left\">\r\n                                  <ng-container *ngIf=\"control.field_type != 'texteditor'\">\r\n                                    <label class=\"text-capitalize\">\r\n                                      {{(control.is_system_generated ==false ? control.name : control.display_name) | DisplayName}}\r\n                                      <span *ngIf=\"control.is_required\" class=\"text-danger\">*</span>\r\n                                    </label>\r\n                                  </ng-container>\r\n\r\n                                  <!--for input value and field type text-->\r\n                                  <input *ngIf=\"control.field_type=='textbox'\" id=\"input_{{controlIndex}}\" name=\"input_{{controlIndex}}\" class=\"form-control\" type=\"text\" placeholder=\"{{control.display_name | DisplayName}}\" />\r\n\r\n                                  <!--for input value and field type textarea-->\r\n                                  <textarea *ngIf=\"control.field_type=='textarea'\" class=\"form-control\" id=\"textarea_{{controlIndex}}\" name=\"textarea_{{controlIndex}}\" placeholder=\"{{control.display_name | DisplayName}}\"></textarea>\r\n\r\n\r\n                                  <!--for input value and field type editor-->\r\n                                  <ng-container *ngIf=\"control.field_type=='texteditor'\">\r\n                                    <p-editor pDroppable=\"row\" (onDrop)=\"dropFields($event,a,controlIndex)\" (onTextChange)=\"OnEditorChange($event,a,controlIndex)\" id=\"editor{{controlIndex}}\" [(ngModel)]=\"editor[controlIndex]\" [ngModelOptions]=\"{standalone: true}\" (onInit)=\"onEditorLoad(controlIndex,control)\"><p-header> </p-header></p-editor>\r\n                                  </ng-container>\r\n\r\n\r\n                                  <!--for input value and field type date-->\r\n                                  <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"control.field_type=='date'\" hideOnDateTimeSelect=\"true\"\r\n                                              inputId=\"cald_{{controlIndex}}\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                                  <!--for input value and field type datetime-->\r\n                                  <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"control.field_type=='datetime'\" [hourFormat]=\"(timeFormat==24)?'24':'12'\" hideOnDateTimeSelect=\"true\"\r\n                                              [showTime]=\"true\" inputId=\"caldt_{{controlIndex}}\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n\r\n                                  <!--for input value and field type number-->\r\n                                  <input *ngIf=\"control.field_type=='number' \" min=\"0\" value=\"0\" step=\"0.01\" id=\"input_{{controlIndex}}\" name=\"input_{{controlIndex}}\" class=\"form-control\" type=\"number\" placeholder=\"{{(control.is_system_generated ==false ? control.name : control.display_name) | DisplayName}}\" />\r\n\r\n                                  <!--for input value and field type number-->\r\n                                  <input *ngIf=\"control.field_type=='decimal'\" pattern=\"^\\d*(\\.\\d{0,2})?$\" min=\"0\" value=\"0\" step=\"0.01\" id=\"input_{{controlIndex}}\" name=\"input_{{controlIndex}}\" class=\"form-control\" type=\"number\" placeholder=\"{{(control.is_system_generated ==false ? control.name : control.display_name) | DisplayName}}\" />\r\n\r\n\r\n                                  <!--for input value and field type dropdown-->\r\n                                  <ng-container *ngIf=\"control.field_type=='dropdown'\">\r\n\r\n                                    <div class=\"clearfix\"></div>\r\n                                    <ng-select id=\"ddl_{{controlIndex}}\" [items]=\"control.selectlistvalues\"\r\n                                               bindLabel=\"value\" bindValue=\"id\" placeholder=\"{{(control.is_system_generated ==false ? control.name : control.display_name) | DisplayName}}\">\r\n                                      <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\r\n                                        <span>{{item.value}} <span *ngIf=\"item.color!=''\">&nbsp;&nbsp;&nbsp;&nbsp;<span [style.background-color]=\"item.color\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; {{item.color}}</span></span>\r\n                                      </ng-template>\r\n                                    </ng-select>\r\n                                  </ng-container>\r\n\r\n                                  <!--for input value and field type radio-->\r\n                                  <ng-container *ngIf=\"control.field_type=='radioButton'\">\r\n                                    <div class=\"clearfix\"></div>\r\n                                    <ng-container *ngIf=\"control.picklist_options\">\r\n                                      <ng-container *ngFor=\"let item of control.picklist_options.split(',');let radioIndex=index;\">\r\n                                        <span class=\"mr-3\">\r\n                                          <input id=\"radio-{{a}}_{{controlIndex}}_{{radioIndex}}\" name=\"radio-{{a}}_{{controlIndex}}\" [value]=\"\" type=\"radio\" class=\"mr-15\">\r\n                                          <label for=\"radio-{{a}}_{{controlIndex}}_{{radioIndex}}\" class=\"radio-label mr-15\">{{item}}</label>\r\n                                        </span>\r\n                                      </ng-container>\r\n                                    </ng-container>\r\n                                  </ng-container>\r\n\r\n                                  <!--for input value and field type checkbox-->\r\n                                  <ng-container *ngIf=\"control.field_type=='checkbox'\">\r\n                                    <div class=\"clearfix\"></div>\r\n                                    <ng-container *ngIf=\"control.picklist_options\">\r\n                                      <ng-container *ngFor=\"let item of control.picklist_options.split(',');let checkIndex=index;\">\r\n                                        <span class=\"mr-3\">\r\n                                          <input id=\"chk-{{a}}_{{controlIndex}}_{{checkIndex}}\" [value]=\"\" type=\"checkbox\" class=\"mr-15\">\r\n                                          <label for=\"chk-{{a}}_{{controlIndex}}_{{checkIndex}}\" class=\"radio-label\">{{item}}</label>\r\n                                        </span>\r\n                                      </ng-container>\r\n                                    </ng-container>\r\n                                  </ng-container>\r\n\r\n                                  <!--for input value and field type boolean-->\r\n                                  <ng-container *ngIf=\"control.field_type=='boolean'\">\r\n                                    <div class=\"clearfix\"></div>\r\n                                    <label class=\"switch  mb-0\">\r\n                                      <input type=\"checkbox\" id=\"bool{{controlIndex}}\" [checked]=\"getItemToParseBolean(control.default_value)\">\r\n                                      <span class=\"slider round\" id=\"bool{{controlIndex}}\"><span>Yes</span></span>\r\n                                    </label>\r\n                                  </ng-container>\r\n\r\n\r\n                                  <!--<div class=\"bg-light p-2\" *ngIf=\"control.dependent_id\" [innerHTML]=\"this.GetConditionInString(a,control)\"></div>-->\r\n\r\n\r\n                                </span>\r\n                                <span class=\"w-25 float-right\" style=\"padding-top:10px;\">\r\n                                  <a href=\"javascript:void(0);\">\r\n                                    <span>\r\n                                      <span (click)=\"hideme[a+''+controlIndex] =! hideme[a+''+controlIndex]\"><i class=\"fa fa-ellipsis-h text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                      <div class=\"dropdown-menu float-right hideshowdropdown quickkact\" [ngClass]=\"{'hide' : hideme[a+''+controlIndex] == false,'show' : hideme[a+''+controlIndex] == true}\" id=\"column-setting{{a}}{{controlIndex}}\">\r\n                                        <div>\r\n                                          <a href=\"javascript:void(0);\" (click)=\"EditCustomFields(a,control.id,control,controlIndex,'NewGroupCreated')\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-pencil text-success\"></i> <span class=\"ml-1 text-secondary\" style=\"font-size: 14px;\">View Properties</span></a>\r\n                                        </div>\r\n                                        <div *ngIf=\"!control.is_system_generated\">\r\n\r\n                                          <a href=\"javascript:void(0);\" (click)=\"RemoveCustomFields(a,controlIndex,a+''+controlIndex)\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-trash text-danger\"></i> <span class=\"ml-1 text-dark\" style=\"font-size: 14px;\">Delete Field</span></a>\r\n                                        </div>\r\n\r\n                                      </div>\r\n                                    </span>\r\n                                  </a>\r\n                                </span>\r\n\r\n                              </ng-template>\r\n\r\n                              <div class=\"clearfix\"></div>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"clearfix\" *ngIf=\"control.field_type=='break'\"></div>\r\n\r\n                        </ng-container>\r\n\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ng-container>\r\n                  </div>\r\n              <div class=\"col-12 p-0\">\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger float-right\" (click)=\"Cancel()\"><i class=\"fa fa-times pr-1\"></i> Cancel</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2 float-right\" (click)=\"AddFormForCustomField()\"><i class=\"fa fa-save pr-1\"></i> Submit</a>\r\n                <a href=\"javascript:void(0);\" title=\"\" class=\"btn btn-primary formbtn widthhalf  mr-2 float-right\" (click)=\"NewGrop('NewGroup')\"\r\n                   tooltip=\"Create New Section\"><i class=\"fa fa-users pr-1\"></i>New Section</a>\r\n\r\n              </div>\r\n             \r\n            </div>\r\n\r\n            <div *ngIf=\"!isCompanyTypeFinancialInstitute\" class=\"col-md-3 col-lg-3 px-1\" id=\"FixedDivCustomField\">\r\n              <div class=\"bordered-content\">\r\n                <div class=\"card-header datafield-header\">\r\n                  <p>The following fields can be included in your form. They will be replaced with the data entered by the user in each of them.</p>\r\n                  <p>\r\n                    <input type=\"text\" class=\"form-control w-100\" formControlName=\"SearchFieldName\" (keyup)=\"onKeyup($event)\" maxlength=\"500\" placeholder=\"Search field here\">\r\n                  </p>\r\n                </div>\r\n                <div class=\"card-body types columnlist list-group custom-field-layout custom-field-layout-left-panel mb-3 overflow-auto\" style=\"max-height:65vh;\">\r\n\r\n                  <div class=\"accordion\" id=\"accordion\">\r\n                    <ng-container *ngFor=\"let table_name of customCompnentValues | GetUniqueTableNameFromCustomFieldList;let tableIndex=index;\">\r\n                      <div class=\"panel active\">\r\n                        <div class=\"panel-heading\">\r\n                          <h4 class=\"panel-title\">\r\n                            <a href=\"#{{table_name}}{{tableIndex}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                              <span *ngIf=\"table_name\">\r\n                                <ng-container *ngIf=\"companyType === 'companytypeFinancialInstitute';else elseBlock\">\r\n                                  {{table_name | DisplayName}}\r\n                                </ng-container>\r\n                                <ng-template #elseBlock>\r\n                                  {{table_name.substring(3)}}\r\n                                </ng-template>\r\n                              </span>\r\n                            </a>\r\n                          </h4>\r\n                        </div>\r\n                        <div id=\"{{table_name}}{{tableIndex}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                          <div class=\"panel-body px-2 mt-0\">\r\n                            <ng-container *ngIf=\"customCompnentValues.length>0;else elseblock;\">\r\n                              <div class=\"row p-2 m-0 datafield-db\" *ngFor=\"let row of customCompnentValues | GetCustomFieldListByTableName:table_name\" pDraggable=\"row\" (onDragStart)=\"dragStart($event,row)\" (onDragEnd)=\"dragEnd($event)\">\r\n                                <div class=\"col-10 col-sm-10 col-md- 10 col-lg-10 col-xl-10 pl-0 float-left overflow-hidden\">\r\n                                  <label class=\"m-0\" style=\"cursor: pointer;\" *ngIf=\"submodule == 'loanapplication'\">{{row.formFieldName | DisplayName}}</label>\r\n                                  <label class=\"m-0\" style=\"cursor: pointer;\" *ngIf=\"submodule != 'loanapplication'\">{{row.formFieldName | DisplayName}}</label>\r\n                                </div>\r\n                                <div class=\"col-2 col-sm-2 col-md- 2 col-lg-2 col-xl-2 float-left text-right m-0 pr-0\">\r\n                                  <i class=\"fa fa-arrows\" aria-hidden=\"true\"></i>\r\n                                </div>\r\n                              </div>\r\n                            </ng-container>\r\n                            <ng-template #elseblock>\r\n                              <p class=\"text-center text-danger m-0\"> No custom field records are present.</p>\r\n                            </ng-template>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </ng-container>\r\n                    \r\n                  </div>\r\n\r\n                  <!--<ng-container *ngIf=\"customCompnentValues.length>0;else elseblock;\">\r\n                    <div class=\"row p-2 m-0 datafield-db\" *ngFor=\"let row of customCompnentValues\" pDraggable=\"row\" (onDragStart)=\"dragStart($event,row)\" (onDragEnd)=\"dragEnd($event)\">\r\n                      <div class=\"col-10 col-sm-10 col-md- 10 col-lg-10 col-xl-10 pl-0 float-left overflow-hidden\">\r\n                        <label class=\"m-0\" style=\"cursor: pointer;\" *ngIf=\"submodule == 'loanapplication'\">{{row.displayName}}</label>\r\n                        <label class=\"m-0\" style=\"cursor: pointer;\" *ngIf=\"submodule != 'loanapplication'\">{{row.table_name.substring(3)}} | {{row.display_name}}</label>\r\n                      </div>\r\n                      <div class=\"col-2 col-sm-2 col-md- 2 col-lg-2 col-xl-2 float-left text-right m-0 pr-0\">\r\n                        <i class=\"fa fa-arrows\" aria-hidden=\"true\"></i>\r\n                      </div>\r\n                    </div>\r\n                  </ng-container>\r\n                  <ng-template #elseblock>\r\n                    <p class=\"text-center text-danger m-0\"> No custom field records are present.</p>\r\n                  </ng-template>-->\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n  </div>\r\n</div>\r\n  \r\n  <app-propertiespopupform #propertiesform (customFieldLayOut)=\"customFieldLayOut()\"></app-propertiespopupform>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageform/formlist.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageform/formlist.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage form</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage form</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom \">\r\n        <div class=\"row mt-2\">\r\n\r\n          <div class=\"col-md-6 col-xl-6\">\r\n            <div class=\"row searchfield  mr-1 w-100\">\r\n              <div class=\"col-lg-5 float-left mb-lg-0 mb-2\">\r\n                <ng-select [items]=\"modulelist\"\r\n                           placeholder=\"Select Module\" bindValue=\"module_id\"\r\n                           [(ngModel)]=\"moduleId\" \r\n                           bindLabel=\"module_name\" (change)=\"onModuleSelect($event)\">\r\n                </ng-select>\r\n              </div>\r\n              <div class=\"col-lg-5 float-left mb-lg-0 mb-2\">\r\n                <ng-select [items]=\"subModulelist\"\r\n                           placeholder=\"Select Sub Module\" bindValue=\"sub_module_id\"\r\n                           [(ngModel)]=\"subModuleId\"\r\n                           bindLabel=\"sub_module_name\" (change)=\"onSubModuleSelect($event)\">\r\n                </ng-select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6 col-xl-6\" >\r\n            <div class=\"dt-buttons\">\r\n              <a href=\"javascript:void(0);\" (click)=\"showpopup()\" class=\"btn btn-success form-btns  mr-1\" tooltip=\" Add Form\"><i class=\"fa fa-plus\"></i></a>\r\n              <a class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>\r\n\r\n              <!--<a *ngIf='isAdd' routerLink=\"/department/adddepartment\" class=\"btn btn-success form-btns mr-1\" tooltip=\"Add Department\"><i class=\"fa fa-plus\"></i></a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>-->\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"pagedData.data\"\r\n                       [columnMode]=\"'force'\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n          <ngx-datatable-column [width]=\"42\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Form Name\" [sortable]=\"true\" prop=\"formName\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <a *ngIf=\"!row.IsFromSubModule\" (click)=\"Editshowpopup(row)\" tooltip=\"Edit Form\" href=\"javascript:void(0);\">{{row.formName | titlecase }}</a>\r\n              <a *ngIf=\"row.IsFromSubModule\" (click)=\"Editshowpopup(row)\" tooltip=\"Edit Form\" href=\"javascript:void(0);\">{{row.formName | titlecase }}</a>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column *ngIf=\"!isCompanyTypeFinancialInstitute\" name=\"Module\" prop=\"module_name\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column *ngIf=\"!isCompanyTypeFinancialInstitute\" name=\"Sub Module\" prop=\"sub_module_name\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"System Generated Fields\" prop=\"SystemGenerated\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"User Defined Fields \" prop=\"UserDefined\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Total Fields\" prop=\"TotalField\" [sortable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column [width]=\"80\" name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n                <a *ngIf=\"row.IsFromSubModule\" [routerLink]=\"['/manageform/editform',row.module_code, row.sub_module_code]\" class=\"btn-edit \" href=\"javascript:void(0);\"><i title=\"Add/Edit Form Fields\" class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                <a *ngIf=\"!row.IsFromSubModule\" [routerLink]=\"['/manageform/editform',row.module_code, row.sub_module_code, row.form_master_id]\" class=\"btn-edit\" href=\"javascript:void(0);\"><i title=\"Add/Edit Form Fields\" class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n\r\n                <a *ngIf=\"row.IsFromSubModule\" class=\"btn-edit disabled\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-secondary pr-2\" title=\"Delete Form\"></i></a>\r\n                <a *ngIf=\"!row.IsFromSubModule\" (click)=\"deleteForm(row.module_code,row.sub_module_code,row.form_master_id)\" class=\"btn-edit\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger pr-2\" title=\"Delete Form\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                {{commonService.PageString(pagedData.pager.currentPage+1,pageSizeValue,rowCount)}}\r\n              </div>\r\n\r\n              <!--<div class=\"page-count\">\r\n        Showing {{(pagedData.pager.currentPage )* pagedData.pager.pageSize + 1}}  to {{(pagedData.pager.currentPage+1) * pagedData.pager.pageSize}} out of {{rowCount}}  enteries\r\n      </div>     \"pagedData.pager.currentPage+1\"-->\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n\r\n<div bsModal #makeForm=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\" *ngIf=\"isAddForm\">\r\n        <h4 class=\"modal-title\">Add Form</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-header\" *ngIf=\"!isAddForm\">\r\n        <h4 class=\"modal-title\">Edit Form</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; height:auto;overflow:inherit;\">\r\n\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <h3 *ngIf=\"isAddForm\" class=\"form-heading ng-star-inserted\"><span>Create New Form:</span></h3>\r\n          <h3 *ngIf=\"!isAddForm\" class=\"form-heading ng-star-inserted\"><span>Edit Form:</span></h3>\r\n          <div class=\"row\">\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Select Module:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"ddlModulelist\"\r\n                           formControlName=\"ddlModule\"\r\n                           placeholder=\"Select Module\" bindValue=\"module_id\"\r\n                           bindLabel=\"module_name\" (change)=\"getSubmodulesByModuleId($event)\">\r\n                </ng-select>\r\n                <small *ngIf=\"ddlModule.invalid && (ddlModule.dirty || ddlModule.touched) && ddlModule.errors?.required\" class=\"text-danger\">Module is required</small>\r\n\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Select Sub Module:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"ddlSubModulelist\"\r\n                           formControlName=\"ddlSubmodule\"\r\n                           placeholder=\"Select Sub Module\" bindValue=\"sub_module_id\"\r\n                           bindLabel=\"sub_module_name\" (change)=\"getSubmodulesByModuleId($event)\">\r\n                </ng-select>\r\n                <small *ngIf=\"ddlSubmodule.invalid && (ddlSubmodule.dirty || ddlSubmodule.touched) && ddlSubmodule.errors?.required\" class=\"text-danger\">Sub Module is required</small>\r\n\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Form Name:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Form Name\" maxlength=\"50\" formControlName=\"moduleName\" [ngClass]=\"{'is-invalid': (moduleName.invalid && (moduleName.dirty || moduleName.touched) && (moduleName.errors?.required || moduleName.errors?.maxlength)) }\">\r\n                <small *ngIf=\"moduleName.invalid && (moduleName.dirty || moduleName.touched) && moduleName.errors?.required\" class=\"text-danger\">Form Name is required</small>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"saveNewForm()\"><i class=\"fa fa-save text-white pr-2\"></i>Submit</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageform/viewpopupwindowform/propertiespopupform.component.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageform/viewpopupwindowform/propertiespopupform.component.html ***!
  \*******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #propertiesPopupform=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">\r\n          {{fieldName}} Properties\r\n        </h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"max-height:600px; overflow:inherit;\">\r\n        <div class=\"col-md-12 p-0\">\r\n          <form [formGroup]=\"properties\" autocomplete=\"off\" class=\"w-100\">\r\n            <div class=\"row\" *ngIf=\"singleLine\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" *ngIf=\"is_system_generated\" disabled class=\"form-control\" formControlName=\"singleLineNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (singleLineNameDisplay.invalid && (singleLineNameDisplay.dirty || singleLineNameDisplay.touched) && singleLineNameDisplay.errors?.required) }\">\r\n                  <input type=\"text\" *ngIf=\"!is_system_generated\" class=\"form-control\" formControlName=\"singleLineNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (singleLineNameDisplay.invalid && (singleLineNameDisplay.dirty || singleLineNameDisplay.touched) && singleLineNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"singleLineNameDisplay.invalid && (singleLineNameDisplay.dirty || singleLineNameDisplay.touched) && singleLineNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"singleLineCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (singleLineCharactersAllowed.invalid && (singleLineCharactersAllowed.dirty || singleLineCharactersAllowed.touched) && singleLineCharactersAllowed.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"singleLineCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (singleLineCharactersAllowed.invalid && (singleLineCharactersAllowed.dirty || singleLineCharactersAllowed.touched) && singleLineCharactersAllowed.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"singleLineCharactersAllowed.invalid && (singleLineCharactersAllowed.dirty || singleLineCharactersAllowed.touched) && singleLineCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Please enter Number of characters</small>\r\n\r\n                  <small *ngIf=\"singleLineCharactersAllowed.errors?.pattern\"\r\n                         style=\"color:red;\">Please enter only numeric value</small>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\" *ngIf=\"!is_system_generated\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"singleLineMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"multiLine\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" *ngIf=\"is_system_generated\" disabled class=\"form-control\" formControlName=\"multiLineNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (multiLineNameDisplay.invalid && (multiLineNameDisplay.dirty || multiLineNameDisplay.touched) && multiLineNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" *ngIf=\"!is_system_generated\" class=\"form-control\" formControlName=\"multiLineNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (multiLineNameDisplay.invalid && (multiLineNameDisplay.dirty || multiLineNameDisplay.touched) && multiLineNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"multiLineNameDisplay.invalid && (multiLineNameDisplay.dirty || multiLineNameDisplay.touched) && multiLineNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" *ngIf=\"is_system_generated\" disabled class=\"form-control\" formControlName=\"multiLineCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (multiLineCharactersAllowed.invalid && (multiLineCharactersAllowed.dirty || multiLineCharactersAllowed.touched) && multiLineCharactersAllowed.errors?.required) }\">\r\n                  <input type=\"text\" *ngIf=\"!is_system_generated\" class=\"form-control\" formControlName=\"multiLineCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (multiLineCharactersAllowed.invalid && (multiLineCharactersAllowed.dirty || multiLineCharactersAllowed.touched) && multiLineCharactersAllowed.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"multiLineCharactersAllowed.invalid && (multiLineCharactersAllowed.dirty || multiLineCharactersAllowed.touched) && multiLineCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Please enter Number of characters</small>\r\n\r\n                  <small *ngIf=\"multiLineCharactersAllowed.errors?.pattern\"\r\n                         style=\"color:red;\">Please enter only numeric value</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"multiLineMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\" *ngIf=\"SelectList\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"selectListLineNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (selectListLineNameDisplay.invalid && (selectListLineNameDisplay.dirty || selectListLineNameDisplay.touched) && selectListLineNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"selectListLineNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (selectListLineNameDisplay.invalid && (selectListLineNameDisplay.dirty || selectListLineNameDisplay.touched) && selectListLineNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"selectListLineNameDisplay.invalid && (selectListLineNameDisplay.dirty || selectListLineNameDisplay.touched) && selectListLineNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\" style=\"display:none\">\r\n                <label>Pick List Option:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"selectListCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (multiLineCharactersAllowed.invalid && (selectListCharactersAllowed.dirty || selectListCharactersAllowed.touched) && selectListCharactersAllowed.errors?.required) }\">\r\n                  <small *ngIf=\"selectListCharactersAllowed.invalid && (selectListCharactersAllowed.dirty || selectListCharactersAllowed.touched) && selectListCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Enter comma separated values</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-12\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-12 col-md-6 col-lg-6\">\r\n                    <label>Options:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"ddloptions\" maxlength=\"50\">\r\n                      <small *ngIf=\"ddloptionsvalidation\"\r\n                             style=\"color:red;\">Enter Option</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-6\">\r\n                    <label>Color:</label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-12 col-md-8 col-lg-8\">\r\n                          <div class=\"form-control\">\r\n                            <p-colorPicker formControlName=\"ddloptionscolor\" [style.background]=\"color\" (click)=\"SetColorFor()\">\r\n                            </p-colorPicker>\r\n                            <span>{{colorCode}}</span>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-12 col-md-4 col-lg-4\">\r\n                          <button type=\"button\" class=\"btn btn-primary form-btns\" (click)=\"add()\"><i class=\"fa fa-plus text-white\"></i> Add</button>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-12 col-lg-12\">\r\n                    <div class=\"table-responsive\">\r\n                      <table class=\"table mb-5\" style=\"min-width:400px;\">\r\n                        <tr>\r\n                          <th>Name</th>\r\n                          <th>Color</th>\r\n                          <th>Action</th>\r\n                        </tr>\r\n                        <tr *ngFor=\"let item of selectlistvalues;let rowIndex=index;\">\r\n                          <td>{{item.value}}</td>\r\n                          <td>\r\n                            <span>{{item.color}}</span>\r\n                          </td>\r\n                          <td>\r\n                            <a href=\"javascript:void(0)\" (click)=\"editselectlist(item.id,item.value,item.color)\">Edit</a>&nbsp;|&nbsp;&nbsp;\r\n                            <a href=\"javascript:void(0)\" (click)=\"deleteSelectlist(item.id,item,item.color,rowIndex)\">Delete</a>\r\n                          </td>\r\n                        </tr>\r\n                      </table>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"selectListMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"ddlmultiselect\" class=\"dynamic custom-control-input\" formControlName=\"selectListMultiddl\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"ddlmultiselect\">\r\n                      Multi Select\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\" *ngIf=\"intShow\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"intNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (intNameDisplay.invalid && (intNameDisplay.dirty || selectListLineNameDisplay.touched) && intNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"intNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (intNameDisplay.invalid && (intNameDisplay.dirty || selectListLineNameDisplay.touched) && intNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"intNameDisplay.invalid && (intNameDisplay.dirty || intNameDisplay.touched) && intNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"intCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (intCharactersAllowed.invalid && (intCharactersAllowed.dirty || intCharactersAllowed.touched) && intCharactersAllowed.errors?.required) }\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"intCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (intCharactersAllowed.invalid && (intCharactersAllowed.dirty || intCharactersAllowed.touched) && intCharactersAllowed.errors?.required) }\">\r\n\r\n\r\n                  <small *ngIf=\"intCharactersAllowed.invalid && (intCharactersAllowed.dirty || intCharactersAllowed.touched) && intCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Length is required</small>\r\n\r\n\r\n                  <small *ngIf=\"intCharactersAllowed.errors?.pattern\"\r\n                         style=\"color:red;\">Please enter only numeric value</small>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"intMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"bigInt\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"bigintNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (bigintNameDisplay.invalid && (bigintNameDisplay.dirty || bigintNameDisplay.touched) && bigintNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"bigintNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (bigintNameDisplay.invalid && (bigintNameDisplay.dirty || bigintNameDisplay.touched) && bigintNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"bigintNameDisplay.invalid && (bigintNameDisplay.dirty || bigintNameDisplay.touched) && bigintNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"bigintCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (bigintCharactersAllowed.invalid && (bigintCharactersAllowed.dirty || bigintCharactersAllowed.touched) && bigintCharactersAllowed.errors?.required) }\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"bigintCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (bigintCharactersAllowed.invalid && (bigintCharactersAllowed.dirty || bigintCharactersAllowed.touched) && bigintCharactersAllowed.errors?.required) }\">\r\n\r\n\r\n                  <small *ngIf=\"bigintCharactersAllowed.invalid && (bigintCharactersAllowed.dirty || bigintCharactersAllowed.touched) && bigintCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Length is required</small>\r\n\r\n                  <small *ngIf=\"bigintCharactersAllowed.errors?.pattern\"\r\n                         style=\"color:red;\">Please enter only numeric value</small>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"bigintMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"decimalShow\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"decimalNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (decimalNameDisplay.invalid && (decimalNameDisplay.dirty || decimalNameDisplay.touched) && decimalNameDisplay.errors?.required) }\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"decimalNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (decimalNameDisplay.invalid && (decimalNameDisplay.dirty || decimalNameDisplay.touched) && decimalNameDisplay.errors?.required) }\">\r\n\r\n\r\n                  <small *ngIf=\"decimalNameDisplay.invalid && (decimalNameDisplay.dirty || decimalNameDisplay.touched) && decimalNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"decimalCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (decimalCharactersAllowed.invalid && (decimalCharactersAllowed.dirty || decimalCharactersAllowed.touched) && decimalCharactersAllowed.errors?.required) }\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"decimalCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (decimalCharactersAllowed.invalid && (decimalCharactersAllowed.dirty || decimalCharactersAllowed.touched) && decimalCharactersAllowed.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"decimalCharactersAllowed.invalid && (decimalCharactersAllowed.dirty || decimalCharactersAllowed.touched) && decimalCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Length is required</small>\r\n\r\n                  <small *ngIf=\"decimalCharactersAllowed.errors?.pattern\"\r\n                         style=\"color:red;\">Please enter only numeric value</small>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"decimalMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"dateShow\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"dateNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (dateNameDisplay.invalid && (dateNameDisplay.dirty || dateNameDisplay.touched) && dateNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"dateNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (dateNameDisplay.invalid && (dateNameDisplay.dirty || dateNameDisplay.touched) && dateNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"dateNameDisplay.invalid && (dateNameDisplay.dirty || dateNameDisplay.touched) && dateNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"decimalMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"dateTimeShow\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"dateTimeNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (dateTimeNameDisplay.invalid && (dateTimeNameDisplay.dirty || dateTimeNameDisplay.touched) && dateTimeNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"dateTimeNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (dateTimeNameDisplay.invalid && (dateTimeNameDisplay.dirty || dateTimeNameDisplay.touched) && dateTimeNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"dateTimeNameDisplay.invalid && (dateTimeNameDisplay.dirty || dateTimeNameDisplay.touched) && dateTimeNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"decimalTimeMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"booleanShow\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"booleanNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (booleanNameDisplay.invalid && (booleanNameDisplay.dirty || booleanNameDisplay.touched) && booleanNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"booleanNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (booleanNameDisplay.invalid && (booleanNameDisplay.dirty || booleanNameDisplay.touched) && booleanNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"dateNameDisplay.invalid && (booleanNameDisplay.dirty || booleanNameDisplay.touched) && booleanNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n\r\n                <label>Default Value:</label>\r\n                <div class=\"form-group\">\r\n                  <label class=\"switch  mb-0\">\r\n                    <input type=\"checkbox\" id=\"booleanDefaultValue\" formControlName=\"booleanDefaultValue\">\r\n                    <span class=\"slider round\" id=\"booleanDefaultValue\"><span>Yes</span></span>\r\n                  </label>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"checkboxShow\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"checkboxNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (checkboxNameDisplay.invalid && (checkboxNameDisplay.dirty || checkboxNameDisplay.touched) && checkboxNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"checkboxNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (checkboxNameDisplay.invalid && (checkboxNameDisplay.dirty || checkboxNameDisplay.touched) && checkboxNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"checkboxNameDisplay.invalid && (checkboxNameDisplay.dirty || checkboxNameDisplay.touched) && checkboxNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Pick List Option:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"checkboxCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Options\" [ngClass]=\"{'is-invalid': (checkboxCharactersAllowed.invalid && (checkboxCharactersAllowed.dirty || checkboxCharactersAllowed.touched) && checkboxCharactersAllowed.errors?.required) }\">\r\n                  <small *ngIf=\"checkboxCharactersAllowed.invalid && (checkboxCharactersAllowed.dirty || checkboxCharactersAllowed.touched) && checkboxCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Enter comma separated values</small>\r\n\r\n                </div>\r\n                <p class=\"alert-warning p-2\">Note: For multiple options enter values separaed by comma.</p>\r\n              </div>\r\n\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"checkboxMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\" *ngIf=\"radioShow\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"radioNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (radioNameDisplay.invalid && (radioNameDisplay.dirty || radioNameDisplay.touched) && radioNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"radioNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (radioNameDisplay.invalid && (radioNameDisplay.dirty || radioNameDisplay.touched) && radioNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"radioNameDisplay.invalid && (radioNameDisplay.dirty || radioNameDisplay.touched) && radioNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Pick List Option:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"radioCharactersAllowed\" disabled=\"disabled\" maxlength=\"50\" *ngIf=\"is_system_generated\"\r\n                         placeholder=\"Enter Options\" [ngClass]=\"{'is-invalid': (radioCharactersAllowed.invalid && (radioCharactersAllowed.dirty || radioCharactersAllowed.touched) && radioCharactersAllowed.errors?.required) }\" />\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"radioCharactersAllowed\" maxlength=\"50\" *ngIf=\"!is_system_generated\"\r\n                         placeholder=\"Enter Options\" [ngClass]=\"{'is-invalid': (radioCharactersAllowed.invalid && (radioCharactersAllowed.dirty || radioCharactersAllowed.touched) && radioCharactersAllowed.errors?.required) }\">\r\n                  <small *ngIf=\"radioCharactersAllowed.invalid && (radioCharactersAllowed.dirty || radioCharactersAllowed.touched) && radioCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Enter comma separated values</small>\r\n\r\n                </div>\r\n                <p class=\"alert-warning p-2\">Note: For multiple options enter values separaed by comma.</p>\r\n              </div>\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"radioMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\" *ngIf=\"urlShow\">\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Display Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"urlNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (urlNameDisplay.invalid && (urlNameDisplay.dirty || urlNameDisplay.touched) && urlNameDisplay.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"urlNameDisplay\" maxlength=\"500\"\r\n                         placeholder=\"{{fieldName}}\" [ngClass]=\"{'is-invalid': (urlNameDisplay.invalid && (urlNameDisplay.dirty || urlNameDisplay.touched) && urlNameDisplay.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"urlNameDisplay.invalid && (urlNameDisplay.dirty || urlNameDisplay.touched) && urlNameDisplay.errors?.required\"\r\n                         style=\"color:red;\">Please enter display name</small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 col-md-6 col-lg-6\">\r\n                <label>Number of characters allowed(9999):<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"is_system_generated\" disabled formControlName=\"urlCharactersAllowed\" maxlength=\"50\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (urlCharactersAllowed.invalid && (urlCharactersAllowed.dirty || urlCharactersAllowed.touched) && urlCharactersAllowed.errors?.required) }\">\r\n\r\n                  <input type=\"text\" class=\"form-control\" *ngIf=\"!is_system_generated\" formControlName=\"urlCharactersAllowed\" maxlength=\"4\"\r\n                         placeholder=\"Enter Number of characters\" [ngClass]=\"{'is-invalid': (urlCharactersAllowed.invalid && (urlCharactersAllowed.dirty || urlCharactersAllowed.touched) && urlCharactersAllowed.errors?.required) }\">\r\n\r\n                  <small *ngIf=\"urlCharactersAllowed.invalid && (urlCharactersAllowed.dirty || urlCharactersAllowed.touched) && urlCharactersAllowed.errors?.required\"\r\n                         style=\"color:red;\">Enter comma separated values</small>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"col-6 col-md-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"SingleLine\" class=\"dynamic custom-control-input\" formControlName=\"urlMarkRequired\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"SingleLine\">\r\n                      Mark as Required\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-4 d-none\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"chklistfieldvisible\" class=\"dynamic custom-control-input\" formControlName=\"listfieldvisible\" type=\"checkbox\">\r\n                    <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                           for=\"chklistfieldvisible\">\r\n                      List Field Visibility\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-4\">\r\n                <label>Form Field Visibility</label>\r\n                <div class=\"form-group\">\r\n                  <label class=\"switch  mb-0\">\r\n                    <input type=\"checkbox\" id=\"chkformfieldvisible\" (change)=\"onCheckChange($event,'formfieldvisible')\" formControlName=\"formfieldvisible\">\r\n                    <span class=\"slider round\" id=\"chkformfieldvisible\"><span>Yes</span></span>\r\n                  </label>\r\n\r\n\r\n                  <!--<div class=\"custom-control custom-checkbox\">\r\n        <input id=\"chkformfieldvisible\" class=\"dynamic custom-control-input\"  formControlName=\"formfieldvisible\" type=\"checkbox\">\r\n        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n               for=\"chkformfieldvisible\">\r\n          Form Field Visibility\r\n        </label>\r\n      </div>-->\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-4\">\r\n                <label>Is Read Only</label>\r\n                <div class=\"form-group\">\r\n                  <label class=\"switch  mb-0\">\r\n                    <input type=\"checkbox\" id=\"chkformfieldvisible\" formControlName=\"is_readOnly\">\r\n                    <span class=\"slider round\" id=\"chkformfieldvisible\"><span>Yes</span></span>\r\n                  </label>\r\n\r\n                  <!--<div class=\"custom-control custom-checkbox\">\r\n        <input id=\"chkformis_readOnly\" class=\"dynamic custom-control-input\" formControlName=\"is_readOnly\" type=\"checkbox\">\r\n        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n               for=\"chkformis_readOnly\">\r\n          Is Read Only\r\n        </label>\r\n      </div>-->\r\n                </div>\r\n              </div>\r\n             \r\n            </div>\r\n            <div class=\"row\" *ngIf=\"isDisplayDependentSection\">\r\n              <div class=\"col-4\" >\r\n                <label for=\"chkIsDependant\">\r\n                  Is Dependent\r\n                </label>\r\n                <div class=\"clearfix\"></div>\r\n                <label class=\"switch  mb-0\">\r\n                  <input type=\"checkbox\" id=\"chkIsDependant\" (change)=\"onCheckChange($event,'chkIsDependant')\" formControlName=\"chkIsDependant\">\r\n                  <span class=\"slider round\" id=\"chkIsDependant\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n              <div class=\"clearfix\"></div>\r\n              <div class=\"col-12\" *ngIf=\"isDependant\">\r\n                <div class=\"card\">\r\n                  <div class=\"card-header\">Select Field</div>\r\n                  <div class=\"card-body\">\r\n                    <div class=\"row px-0\">\r\n                      <div class=\"col-md-6\">\r\n                        <ng-select id=\"ddlFormField\" formControlName=\"ddlFormField\" [items]=\"FormFieldList\" placeholder=\"Select Field\" (change)=\"OnDependencyFieldChange($event)\" (clear)=\"onClear('ddlFormField')\"\r\n                                   bindLabel=\"value\" bindValue=\"id\">\r\n                        </ng-select>\r\n                      </div>\r\n                      <div class=\"col-md-6\">\r\n                        <ng-select id=\"ddlOption\" formControlName=\"ddlOption\" [items]=\"ddlOptionList\" placeholder=\"Select Option\" (change)=\"OnDependencyOptionChange($event)\" (clear)=\"onClear('ddlOption')\"\r\n                                   bindLabel=\"value\" bindValue=\"id\">\r\n                        </ng-select>\r\n                      </div>\r\n                      <!--<div class=\"col-md-12 mt-2\">\r\n          <div class=\"bg-light p-2 mt-2\">\r\n            <span><strong>Condition: </strong> ( {{ConditionKey}} Equal To {{ConditionValue}} )</span>\r\n          </div>\r\n          </div>-->\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/manageform/addeditform.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/views/manageform/addeditform.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".list-group.custom-field-layout {\n  width: 100%;\n  float: left;\n  display: block;\n  padding: 10px !important;\n  background: #fff;\n  border: 1px solid #cdd4da; }\n\n.custom-field-layout li {\n  width: 98%;\n  margin: 1%;\n  display: inline-block;\n  cursor: all-scroll;\n  border-radius: 0px !important;\n  background: #f9f9f9;\n  border: 1px solid #e5e9ec;\n  padding: 8px 10px !important; }\n\n.custom-field-layout li a {\n  color: #777777;\n  font-size: 16px;\n  font-weight: 500;\n  cursor: all-scroll; }\n\n.draged-item {\n  background: #f1f1f1;\n  padding: 5px 10px;\n  margin-bottom: 10px;\n  border: 1px solid #dcdcdc; }\n\n.drop[_ngcontent-c1] {\n  border: 1px solid #ccc;\n  /*padding: 10px;*/\n  padding: 0px;\n  margin-top: 0; }\n\n.side_panel-heading {\n  background: #2f4050;\n  color: #fff;\n  padding: 10px;\n  margin: 0px !important;\n  font-weight: 500;\n  font-size: 150% !important; }\n\n.drop_right_heading {\n  background: #f9f9f9;\n  border-bottom: 1px solid #cdd4da;\n  padding: 0.5rem 0px; }\n\n.custom_feild_box {\n  padding: 15px 0px; }\n\n.drop_right_heading .form-group {\n  margin: 0rem; }\n\n/*\r\n\r\n.custom-field-layout-left-panel {background: #fff !important; border: 1px solid red;}\r\n.custom-field-layout-left-panel li { width: 100% !important; border: 1px solid red; border-radius:0px !important;}\r\n\r\n\r\n(4:30:03 PM) Ajay Aneja - DES: background: f9f9f9\r\n(4:30:14 PM) Ajay Aneja - DES: border e5e9ec\r\n(4:30:23 PM) Ajay Aneja - DES: headign bg \r\n(4:30:24 PM) Ajay Aneja - DES: 2f4050\r\n(4:30:55 PM) Ajay Aneja - DES: outer bg- cdd4da\r\n\r\n\r\n*/\n\n.container-new {\n  background-color: forestgreen;\n  height: 50px;\n  width: 50px;\n  display: block;\n  float: left;\n  margin-left: 30px;\n  margin-top: 30px;\n  padding: 10%;\n  visibility: visible;\n  color: red; }\n\n.projectcontainer {\n  background-color: lightsteelblue;\n  display: block;\n  height: 500px;\n  width: 600px;\n  margin-top: 5%;\n  visibility: visible; }\n\n::ng-deep .ql-toolbar.ql-snow {\n  padding: 0px;\n  border: none; }\n\n::ng-deep .ql-container.ql-snow {\n  border-top: 1px solid #ccc;\n  height: 320px; }\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbWFuYWdlZm9ybS9EOlxcUHJpbmNlIFNpbmdoXFx3b3Jrc3BhY2VcXFNvbGdlbk9uZVxcTGFob3JlMVxcU29sZ2VuXFxzb2xnZW4ucG9ydGFsXFxDbGllbnRBcHAvc3JjXFxhcHBcXHZpZXdzXFxtYW5hZ2Vmb3JtXFxhZGRlZGl0Zm9ybS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvdmlld3MvbWFuYWdlZm9ybS9hZGRlZGl0Zm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNBLFdBQVc7RUFDWCxXQUFXO0VBQ1gsY0FBYztFQUNkLHdCQUF3QjtFQUN4QixnQkFBZ0I7RUFDaEIseUJBQXlCLEVBQUE7O0FBR3pCO0VBQ0EsVUFBVTtFQUNWLFVBQVU7RUFDVixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLDZCQUE2QjtFQUM3QixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLDRCQUE0QixFQUFBOztBQUc1QjtFQUNBLGNBQWM7RUFDZCxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGtCQUFrQixFQUFBOztBQUdsQjtFQUNBLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLHlCQUF5QixFQUFBOztBQUd6QjtFQUNBLHNCQUFzQjtFQUN0QixpQkFBQTtFQUNBLFlBQVc7RUFDWCxhQUFhLEVBQUE7O0FBRWI7RUFDQSxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLDBCQUEwQixFQUFBOztBQUUxQjtFQUNBLG1CQUFtQjtFQUNuQixnQ0FBZ0M7RUFBRSxtQkFBa0IsRUFBQTs7QUFDcEQ7RUFBa0IsaUJBQWdCLEVBQUE7O0FBQ2xDO0VBQWdDLFlBQVcsRUFBQTs7QUFDM0M7Ozs7Ozs7Ozs7Ozs7Q0NlQzs7QURERDtFQUNBLDZCQUE2QjtFQUM3QixZQUFZO0VBQ1osV0FBVztFQUNYLGNBQWM7RUFDZCxXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLFVBQVUsRUFBQTs7QUFHVjtFQUNBLGdDQUFnQztFQUNoQyxjQUFjO0VBQ2QsYUFBYTtFQUNiLFlBQVk7RUFDWixjQUFjO0VBQ2QsbUJBQW1CLEVBQUE7O0FBS25CO0VBQ0UsWUFBWTtFQUNaLFlBQVksRUFBQTs7QUFHZDtFQUNFLDBCQUEwQjtFQUMxQixhQUFhLEVBQUEiLCJmaWxlIjoic3JjL2FwcC92aWV3cy9tYW5hZ2Vmb3JtL2FkZGVkaXRmb3JtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpc3QtZ3JvdXAuY3VzdG9tLWZpZWxkLWxheW91dCB7XHJcbndpZHRoOiAxMDAlO1xyXG5mbG9hdDogbGVmdDtcclxuZGlzcGxheTogYmxvY2s7XHJcbnBhZGRpbmc6IDEwcHggIWltcG9ydGFudDtcclxuYmFja2dyb3VuZDogI2ZmZjtcclxuYm9yZGVyOiAxcHggc29saWQgI2NkZDRkYTtcclxufVxyXG5cclxuLmN1c3RvbS1maWVsZC1sYXlvdXQgbGkge1xyXG53aWR0aDogOTglO1xyXG5tYXJnaW46IDElO1xyXG5kaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbmN1cnNvcjogYWxsLXNjcm9sbDtcclxuYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XHJcbmJhY2tncm91bmQ6ICNmOWY5Zjk7XHJcbmJvcmRlcjogMXB4IHNvbGlkICNlNWU5ZWM7XHJcbnBhZGRpbmc6IDhweCAxMHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5jdXN0b20tZmllbGQtbGF5b3V0IGxpIGEge1xyXG5jb2xvcjogIzc3Nzc3NztcclxuZm9udC1zaXplOiAxNnB4O1xyXG5mb250LXdlaWdodDogNTAwO1xyXG5jdXJzb3I6IGFsbC1zY3JvbGw7XHJcbn1cclxuXHJcbi5kcmFnZWQtaXRlbSB7XHJcbmJhY2tncm91bmQ6ICNmMWYxZjE7XHJcbnBhZGRpbmc6IDVweCAxMHB4O1xyXG5tYXJnaW4tYm90dG9tOiAxMHB4O1xyXG5ib3JkZXI6IDFweCBzb2xpZCAjZGNkY2RjO1xyXG59XHJcblxyXG4uZHJvcFtfbmdjb250ZW50LWMxXSB7XHJcbmJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbi8qcGFkZGluZzogMTBweDsqL1xyXG5wYWRkaW5nOjBweDtcclxubWFyZ2luLXRvcDogMDtcclxufVxyXG4uc2lkZV9wYW5lbC1oZWFkaW5nIHtcclxuYmFja2dyb3VuZDogIzJmNDA1MDtcclxuY29sb3I6ICNmZmY7XHJcbnBhZGRpbmc6IDEwcHg7XHJcbm1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7XHJcbmZvbnQtd2VpZ2h0OiA1MDA7XHJcbmZvbnQtc2l6ZTogMTUwJSAhaW1wb3J0YW50O1xyXG59XHJcbi5kcm9wX3JpZ2h0X2hlYWRpbmcge1xyXG5iYWNrZ3JvdW5kOiAjZjlmOWY5O1xyXG5ib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NkZDRkYTsgcGFkZGluZzowLjVyZW0gMHB4O31cclxuLmN1c3RvbV9mZWlsZF9ib3h7cGFkZGluZzoxNXB4IDBweDt9XHJcbi5kcm9wX3JpZ2h0X2hlYWRpbmcgLmZvcm0tZ3JvdXB7bWFyZ2luOjByZW07fVxyXG4vKlxyXG5cclxuLmN1c3RvbS1maWVsZC1sYXlvdXQtbGVmdC1wYW5lbCB7YmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50OyBib3JkZXI6IDFweCBzb2xpZCByZWQ7fVxyXG4uY3VzdG9tLWZpZWxkLWxheW91dC1sZWZ0LXBhbmVsIGxpIHsgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgYm9yZGVyOiAxcHggc29saWQgcmVkOyBib3JkZXItcmFkaXVzOjBweCAhaW1wb3J0YW50O31cclxuXHJcblxyXG4oNDozMDowMyBQTSkgQWpheSBBbmVqYSAtIERFUzogYmFja2dyb3VuZDogZjlmOWY5XHJcbig0OjMwOjE0IFBNKSBBamF5IEFuZWphIC0gREVTOiBib3JkZXIgZTVlOWVjXHJcbig0OjMwOjIzIFBNKSBBamF5IEFuZWphIC0gREVTOiBoZWFkaWduIGJnIFxyXG4oNDozMDoyNCBQTSkgQWpheSBBbmVqYSAtIERFUzogMmY0MDUwXHJcbig0OjMwOjU1IFBNKSBBamF5IEFuZWphIC0gREVTOiBvdXRlciBiZy0gY2RkNGRhXHJcblxyXG5cclxuKi9cclxuLmNvbnRhaW5lci1uZXcge1xyXG5iYWNrZ3JvdW5kLWNvbG9yOiBmb3Jlc3RncmVlbjtcclxuaGVpZ2h0OiA1MHB4O1xyXG53aWR0aDogNTBweDtcclxuZGlzcGxheTogYmxvY2s7XHJcbmZsb2F0OiBsZWZ0O1xyXG5tYXJnaW4tbGVmdDogMzBweDtcclxubWFyZ2luLXRvcDogMzBweDtcclxucGFkZGluZzogMTAlO1xyXG52aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG5jb2xvcjogcmVkO1xyXG59XHJcblxyXG4ucHJvamVjdGNvbnRhaW5lciB7XHJcbmJhY2tncm91bmQtY29sb3I6IGxpZ2h0c3RlZWxibHVlO1xyXG5kaXNwbGF5OiBibG9jaztcclxuaGVpZ2h0OiA1MDBweDtcclxud2lkdGg6IDYwMHB4O1xyXG5tYXJnaW4tdG9wOiA1JTtcclxudmlzaWJpbGl0eTogdmlzaWJsZTtcclxufVxyXG5cclxuXHJcblxyXG46Om5nLWRlZXAgLnFsLXRvb2xiYXIucWwtc25vdyB7XHJcbiAgcGFkZGluZzogMHB4O1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuOjpuZy1kZWVwIC5xbC1jb250YWluZXIucWwtc25vdyB7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XHJcbiAgaGVpZ2h0OiAzMjBweDsgLy9wbHMgY2hhbmdlIGhlaWdodCBhcyBwZXIgeW91ciBuZWVkLlxyXG59XHJcbiIsIi5saXN0LWdyb3VwLmN1c3RvbS1maWVsZC1sYXlvdXQge1xuICB3aWR0aDogMTAwJTtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAxMHB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjZGQ0ZGE7IH1cblxuLmN1c3RvbS1maWVsZC1sYXlvdXQgbGkge1xuICB3aWR0aDogOTglO1xuICBtYXJnaW46IDElO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGN1cnNvcjogYWxsLXNjcm9sbDtcbiAgYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6ICNmOWY5Zjk7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlNWU5ZWM7XG4gIHBhZGRpbmc6IDhweCAxMHB4ICFpbXBvcnRhbnQ7IH1cblxuLmN1c3RvbS1maWVsZC1sYXlvdXQgbGkgYSB7XG4gIGNvbG9yOiAjNzc3Nzc3O1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGN1cnNvcjogYWxsLXNjcm9sbDsgfVxuXG4uZHJhZ2VkLWl0ZW0ge1xuICBiYWNrZ3JvdW5kOiAjZjFmMWYxO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNkYzsgfVxuXG4uZHJvcFtfbmdjb250ZW50LWMxXSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIC8qcGFkZGluZzogMTBweDsqL1xuICBwYWRkaW5nOiAwcHg7XG4gIG1hcmdpbi10b3A6IDA7IH1cblxuLnNpZGVfcGFuZWwtaGVhZGluZyB7XG4gIGJhY2tncm91bmQ6ICMyZjQwNTA7XG4gIGNvbG9yOiAjZmZmO1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDE1MCUgIWltcG9ydGFudDsgfVxuXG4uZHJvcF9yaWdodF9oZWFkaW5nIHtcbiAgYmFja2dyb3VuZDogI2Y5ZjlmOTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZGQ0ZGE7XG4gIHBhZGRpbmc6IDAuNXJlbSAwcHg7IH1cblxuLmN1c3RvbV9mZWlsZF9ib3gge1xuICBwYWRkaW5nOiAxNXB4IDBweDsgfVxuXG4uZHJvcF9yaWdodF9oZWFkaW5nIC5mb3JtLWdyb3VwIHtcbiAgbWFyZ2luOiAwcmVtOyB9XG5cbi8qXHJcblxyXG4uY3VzdG9tLWZpZWxkLWxheW91dC1sZWZ0LXBhbmVsIHtiYWNrZ3JvdW5kOiAjZmZmICFpbXBvcnRhbnQ7IGJvcmRlcjogMXB4IHNvbGlkIHJlZDt9XHJcbi5jdXN0b20tZmllbGQtbGF5b3V0LWxlZnQtcGFuZWwgbGkgeyB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyBib3JkZXI6IDFweCBzb2xpZCByZWQ7IGJvcmRlci1yYWRpdXM6MHB4ICFpbXBvcnRhbnQ7fVxyXG5cclxuXHJcbig0OjMwOjAzIFBNKSBBamF5IEFuZWphIC0gREVTOiBiYWNrZ3JvdW5kOiBmOWY5ZjlcclxuKDQ6MzA6MTQgUE0pIEFqYXkgQW5lamEgLSBERVM6IGJvcmRlciBlNWU5ZWNcclxuKDQ6MzA6MjMgUE0pIEFqYXkgQW5lamEgLSBERVM6IGhlYWRpZ24gYmcgXHJcbig0OjMwOjI0IFBNKSBBamF5IEFuZWphIC0gREVTOiAyZjQwNTBcclxuKDQ6MzA6NTUgUE0pIEFqYXkgQW5lamEgLSBERVM6IG91dGVyIGJnLSBjZGQ0ZGFcclxuXHJcblxyXG4qL1xuLmNvbnRhaW5lci1uZXcge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBmb3Jlc3RncmVlbjtcbiAgaGVpZ2h0OiA1MHB4O1xuICB3aWR0aDogNTBweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZsb2F0OiBsZWZ0O1xuICBtYXJnaW4tbGVmdDogMzBweDtcbiAgbWFyZ2luLXRvcDogMzBweDtcbiAgcGFkZGluZzogMTAlO1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICBjb2xvcjogcmVkOyB9XG5cbi5wcm9qZWN0Y29udGFpbmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRzdGVlbGJsdWU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBoZWlnaHQ6IDUwMHB4O1xuICB3aWR0aDogNjAwcHg7XG4gIG1hcmdpbi10b3A6IDUlO1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlOyB9XG5cbjo6bmctZGVlcCAucWwtdG9vbGJhci5xbC1zbm93IHtcbiAgcGFkZGluZzogMHB4O1xuICBib3JkZXI6IG5vbmU7IH1cblxuOjpuZy1kZWVwIC5xbC1jb250YWluZXIucWwtc25vdyB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjO1xuICBoZWlnaHQ6IDMyMHB4OyB9XG4iXX0= */");

/***/ }),

/***/ "./src/app/views/manageform/addeditform.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/manageform/addeditform.component.ts ***!
  \***********************************************************/
/*! exports provided: AddeditformComponent, EditorDemo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditformComponent", function() { return AddeditformComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorDemo", function() { return EditorDemo; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.service */ "./src/app/views/manageform/form.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _viewpopupwindowform_propertiespopupform_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewpopupwindowform/propertiespopupform.component */ "./src/app/views/manageform/viewpopupwindowform/propertiespopupform.component.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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










var AddeditformComponent = /** @class */ (function () {
    function AddeditformComponent(fb, formService, router, dialogService, toaster, route, commonService, location) {
        this.fb = fb;
        this.formService = formService;
        this.router = router;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.location = location;
        this.loadSave = false;
        this.name = 'Angular';
        this.submodule = '';
        this.colors = [];
        this.droped = [];
        this.newgroup = [];
        this.dragedColor = null;
        this.condition = false;
        this.condionNewGroup = false;
        this.formPageType = 'double';
        this.form_field_visibility = 'No';
        this.DemoShow = false;
        this.formPageTypeNewGrp = 'double';
        this.dynamicformNewSection = [];
        this.displayProperties = false;
        this.moduleName = 'user';
        this.submoduleName = 'department';
        this.hideme = [];
        this.hideme1 = [];
        this.hidemeNewGrp = [];
        this.isSolgenPower = false;
        this.counterValue = 0;
        this.moduleid = "1";
        this.submoduleid = "1";
        this.formMasterId = '';
        this.pageTitle = "";
        this.customCompnentValues = [];
        this.customFieldList = [];
        this.groupName = [];
        this.formControlList = [];
        this.groupNamedata = [];
        this.groupTables = [];
        this.editor = [];
        this.isCompanyTypeFinancialInstitute = false;
        this.userInfo = [];
        this.fieldArray = [];
        this.newAttribute = {};
        this.dragOperation = false;
        this.containers = [
            new _form_service__WEBPACK_IMPORTED_MODULE_2__["Container1"](1, 'Container 1', [new _form_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('1'), new _form_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('2')]),
            new _form_service__WEBPACK_IMPORTED_MODULE_2__["Container1"](2, 'Container 2', [new _form_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('3'), new _form_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('4')]),
            new _form_service__WEBPACK_IMPORTED_MODULE_2__["Container1"](3, 'Container 3', [new _form_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('5'), new _form_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('6')])
        ];
        this.groupBy1 = function (array, key) {
            // Return the end result
            return array.reduce(function (result, currentValue) {
                // If an array already present for key, push it to the array. Else create an array and push the object
                (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
                // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
                return result;
            }, []); // empty object is the initial value for result object
        };
        this.group = [];
        this.controls = [];
        this.filedLists = [
            { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Text", dt_code: "text", class_name: "fa fa-file-text-o ", display_order: 0, actual_data_type: "string", id: 11, required: false, picklist_options: null, field_type: 'texteditor', default_value: '' },
            { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Single Line", dt_code: "text", class_name: "fa fa fa-ellipsis-h", display_order: 1, actual_data_type: "string", id: 1, required: false, picklist_options: null, field_type: 'textbox', default_value: '' },
            { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Multi Line", group_name: "", dt_code: "textarea", class_name: "fa fa-navicon", display_order: 2, actual_data_type: "string", data_type_name: "string", id: 2, required: false, length: 0, index: "", picklist_options: null, field_type: 'textarea', default_value: '' },
            { form_field_id: "", data_type_id: 1, sql_type: "select", name: "Select List", group_name: "", dt_code: "select", class_name: "fa fa-list", display_order: 3, actual_data_type: "select", data_type_name: "select", id: 3, required: false, length: 0, index: "", picklist_options: null, field_type: 'dropdown', default_value: '' },
            { form_field_id: "", data_type_id: 2, sql_type: "int", name: "Integer", group_name: "", dt_code: "int", class_name: "fa fa-sort-numeric-asc", display_order: 4, data_type_name: "int", actual_data_type: "int", id: 4, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '' },
            { form_field_id: "", data_type_id: 3, sql_type: "bigint", name: "Long Integer", group_name: "", dt_code: "bigint", class_name: "fa  fa-list-ol", display_order: 5, actual_data_type: "bigint", data_type_name: "bigint", id: 5, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '' },
            { form_field_id: "", data_type_id: 4, sql_type: "decimal", name: "Decimal", group_name: "", dt_code: "decimal", class_name: "fa fa fa-circle", display_order: 6, actual_data_type: "decimal", data_type_name: "decimal", id: 6, required: false, length: 0, index: "", picklist_options: null, field_type: 'decimal', default_value: '' },
            { form_field_id: "", data_type_id: 5, sql_type: "date", name: "Date", group_name: "", dt_code: "date", class_name: "fa fa-calendar-o", display_order: 7, actual_data_type: "date", data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'date', default_value: '' },
            { form_field_id: "", data_type_id: 5, sql_type: "datetime", name: "Datetime", group_name: "", dt_code: "datetime", class_name: "fa fa-calendar-o", display_order: 7, actual_data_type: "date", data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'datetime', default_value: '' },
            { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Checkbox", group_name: "", dt_code: "checkbox", class_name: "fa fa-check-square-o", display_order: 8, actual_data_type: "string", data_type_name: "string", id: 8, required: false, length: 0, index: "", picklist_options: null, field_type: 'checkbox', default_value: '' },
            { form_field_id: "", data_type_id: 1, sql_type: "nvarchar", name: "Radio", group_name: "", dt_code: "radio", class_name: "fa fa-dot-circle-o", display_order: 9, data_type_name: "string", actual_data_type: "date", id: 9, required: false, length: 0, index: "", picklist_options: null, field_type: 'radioButton', default_value: '' },
            { form_field_id: "", data_type_id: 14, sql_type: "url", name: "Url", group_name: "", dt_code: "url", class_name: "fa fa-at", display_order: 10, data_type_name: "Url", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'anchor', default_value: '' },
            { form_field_id: "", data_type_id: 16, sql_type: "bit", name: "Boolean", group_name: "", dt_code: "boolean", class_name: "fa fa-at", display_order: 11, actual_data_type: "bit", data_type_name: "bit", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'boolean', default_value: '' }
        ];
    }
    AddeditformComponent.prototype.dragfullgroup = function () {
        if (this.dragOperation == true) {
            this.dragOperation = false;
        }
        else {
            this.dragOperation = true;
        }
    };
    AddeditformComponent.prototype.incrementcounter = function () {
        return this.counterValue++;
    };
    AddeditformComponent.prototype.decrementcounter = function () {
        return this.counterValue--;
    };
    AddeditformComponent.prototype.onKeyup = function (event) {
        var _this = this;
        this.customCompnentValues = [];
        var searchData = event.target.value;
        if (searchData) {
            searchData = searchData.toLowerCase();
            this.customCompnentValues = this.customFieldList.filter(function (item) {
                if (_this.submodule == "loanapplication") {
                    return item.displayName.toLowerCase().includes(searchData);
                }
                else {
                    return item.display_name.toLowerCase().includes(searchData);
                }
            });
        }
        else {
            this.customCompnentValues = this.customFieldList;
        }
    };
    // Group by color as key to the person array
    AddeditformComponent.prototype.fordragcontrol = function () {
        this.dragOperation = false;
    };
    AddeditformComponent.prototype.fordragcontainer = function () {
        this.dragOperation = true;
    };
    AddeditformComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userInfo = JSON.parse(localStorage.getItem('userinfo'));
        this.companyType = this.userInfo["companyType"];
        this.companyId = this.userInfo["companyId"];
        this.userInfoDetails = JSON.parse(localStorage.getItem('userinfo'));
        console.log("userInfo", this.userInfoDetails);
        if (this.userInfoDetails.companyId == 1003) {
            this.isSolgenPower = true;
            this.pageTitle = "Add/Edit Screen Fields";
        }
        else {
            this.isSolgenPower = false;
            this.pageTitle = "Add/Edit Form Fields";
        }
        this.timeFormat = this.commonService.getTimeFormat();
        this.manageForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            DefaultfieldName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            fieldName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            SearchFieldName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]()
            //fieldArray: Array[]
        });
        this.route.paramMap.subscribe(function (params) {
            var module = params.get('module');
            var submodule = params.get('subModule');
            var _formId = '';
            if (params.has('formMasterId')) {
                _formId = params.get('formMasterId');
            }
            if (_this.companyType === "companytypeFinancialInstitute" && _this.companyId === 1004 && _formId === '') {
                _this.isCompanyTypeFinancialInstitute = true;
            }
            _this.submodule = submodule.trim().toLowerCase().replace(' ', '');
            _this.moduleid = module;
            _this.submoduleid = submodule;
            _this.formMasterId = _formId;
            _this.getcustomfielddata(module, submodule, _this.formMasterId);
            if (!_this.isCompanyTypeFinancialInstitute) {
                _this.getCustomFiledListByModuleAndSubModule(module, submodule);
            }
            else {
                _this.filedLists.splice(0, 1);
            }
        });
        this.colors = this.filedLists;
        this.InnerData = 'four';
        this.NewGrop('NewGroup');
    };
    Object.defineProperty(AddeditformComponent.prototype, "SearchFieldName", {
        get: function () { return this.manageForm.get('SearchFieldName'); },
        enumerable: true,
        configurable: true
    });
    AddeditformComponent.prototype.getCustomFiledListByModuleAndSubModule = function (moduleName, submoduleName) {
        var _this = this;
        var modulecode = moduleName.trim().toLowerCase().replace(' ', '');
        var submodulecode = submoduleName.trim().toLowerCase().replace(' ', '');
        if (submodulecode == 'loanapplication') {
            this.loadSave = true;
            this.commonService.GetCustomFormFieldList(modulecode, submodulecode, '', '').subscribe(function (result) {
                if (result) {
                    _this.customCompnentValues = [];
                    _this.customFieldList = _this.commonService.customFieldsList;
                    _this.customCompnentValues = _this.commonService.customFieldsList;
                    console.log("this.customCompnentValues", _this.customCompnentValues);
                }
            }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
        }
        else {
            this.loadSave = true;
            // this.commonService.GetCustomFieldsList(modulecode, submodulecode, '', '', '').subscribe((result: any) => {
            this.commonService.GetCustomFieldsManageForm(modulecode, submodulecode, '', 'MANAGE', '').subscribe(function (result) {
                if (result) {
                    _this.customFieldList = result.data;
                    _this.customCompnentValues = result.data;
                }
            }, function (err) { _this.loadSave = false; }, function () { _this.loadSave = false; });
        }
    };
    AddeditformComponent.prototype.getcustomfielddata = function (id, sid, formMasterId) {
        var _this = this;
        this.loadSave = true;
        this.formService.GetFormFieldsList(id, sid, formMasterId, this.companyId).subscribe(function (result) {
            if (result) {
                _this.customFiledsData = null;
                _this.droped = [];
                _this.controls = [];
                _this.counterValue = 0;
                //this.form.setValue(null);
                if (_this.formService.customFieldsList) {
                    _this.customFiledsData = _this.formService.customFieldsList.data;
                    _this.droped = _this.customFiledsData;
                    _this.formName = _this.droped[0].FormName;
                }
                console.log("droped", _this.droped);
                //this.groupControl1 = this.droped;
                _this.controls = _this.groupBy1(_this.droped, 'group_display_order');
                //console.log("this.controls", this.controls);
                //debugger;
                //let tempControls: any, tempControlsList: any;
                //if (this.controls.length > 0) {
                //  tempControlsList = this.controls[0];
                //  tempControls = this.controls.filter(item => item.field_type == 'texteditor');
                //}
                //this.controls = this.droped;
                var mapped_1 = Object.keys(_this.controls).map(function (key) { return ({ type: key, value: _this.controls[key] }); });
                console.log("mappedmapped", mapped_1);
                if (_this.isCompanyTypeFinancialInstitute) {
                    _this.group = [];
                }
                _this.controls.forEach(function (item, ind) {
                    if (item[ind] != null) {
                        _this.group.push(new _form_service__WEBPACK_IMPORTED_MODULE_2__["Group"](item[ind].group_display_order, item[ind].group_id, item[ind].group_name, item[ind].group_display_name, item[ind].layout_type, item[ind].table_name, item[ind].is_inserted, item[ind].is_updated, item[ind].group_display_order, mapped_1[ind].value));
                        _this.group.shift();
                    }
                    else {
                        _this.group.push(new _form_service__WEBPACK_IMPORTED_MODULE_2__["Group"](item[0].group_display_order, item[0].group_id, item[0].group_name, item[0].group_display_name, item[0].layout_type, item[0].table_name, item[0].is_inserted, item[0].is_updated, item[0].group_display_order, mapped_1[ind].value));
                    }
                });
                // this.controls.map(item => { item.system_is_required = true });
                _this.controls.forEach(function (item, ind1) { return _this.dynamicformNewSection[ind1] = item[0].layout_type; });
                //this.dynamicLayoutNewSection[0] = 'double';
                if (_this.group.length > 0) {
                    _this.counterValue = _this.group[_this.group.length - 1].display_order;
                }
                // this.group.push(new Group(this.controls[0].group_display_order, this.controls[0].group_id, this.controls[0].group_name, this.controls[0].group_display_name, 0, 1, this.controls[0].display_order, this.controls));
                // console.log("this.group.push", this.group);
            }
            _this.loadSave = false;
        }, function (error) { }, function () {
        });
    };
    AddeditformComponent.prototype.changegroup = function (event, index) {
        this.group[index].group_name = event.target.value;
        this.group[index].group_display_name = event.target.value;
        if (index > 0) {
            this.group[index].group_layout_type = this.group[index - 1].group_layout_type;
            this.group[index].table_name = this.group[index - 1].table_name;
        }
        this.group.forEach(function (item, i) { return item.display_order = i; });
        // console.log('this.group', this.group);
    };
    AddeditformComponent.prototype.addFieldValue = function () {
        this.fieldArray.push(this.newAttribute);
        this.newAttribute = {};
    };
    AddeditformComponent.prototype.deleteFieldValue = function (index) {
        this.fieldArray.splice(index, 1);
    };
    AddeditformComponent.prototype.S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    AddeditformComponent.prototype.GemgarteIdWithUniwquie = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    AddeditformComponent.prototype.dragEnd = function (e) {
    };
    AddeditformComponent.prototype.dragStart = function (e, c) {
        this.uniqueid = this.S4();
        c.form_field_id = this.uniqueid;
        var txtval = 'custom_field_id';
        if ((txtval in c)) {
            var data = [];
            data.push(c);
            data[0].ColumnName = c.ColumnName;
            c.field_type = this.getFiledType(data[0].dt_code);
        }
        if (this.companyType == 'companytypeFinancialInstitute') {
            c.field_type = this.getFiledType(c.dt_code);
        }
        var temp = [];
        temp = JSON.parse(JSON.stringify(c));
        this.dragedColor = temp;
        console.log("dragStart dragedccolor", this.dragedColor);
    };
    AddeditformComponent.prototype.getFiledType = function (dt_code) {
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
    AddeditformComponent.prototype.drop = function (e) {
        if (this.dragedColor) {
            this.droped.push(this.dragedColor);
            this.dragedColor = null;
        }
        console.log("this.dragedColor", this.dragedColor);
    };
    AddeditformComponent.prototype.dropFields = function (e, groupId, controlIndex) {
        debugger;
        var fieldIndex = (e.currentTarget.id).replace('editor', '');
        if (this.dragedColor) {
            if (this.dragedColor.ColumnName) {
                var value = '', data = " {{" + this.dragedColor.ColumnName + "}} ", _finalValue = '';
                if (this.editor[fieldIndex]) {
                    value = this.editor[fieldIndex];
                    _finalValue = value + data;
                }
                else {
                    _finalValue = value + data.replace(' ', '');
                }
                this.group[groupId].controls[controlIndex].default_value = _finalValue;
                this.editor[fieldIndex] = _finalValue;
                this.dragedColor = null;
            }
        }
    };
    AddeditformComponent.prototype.customFieldLayOut = function () {
        // console.log("Data", this.propertiesform.singleLineNameDisplay.value);
        if (this.propertiesform.singleLine == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.singleLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.singleLineMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.singleLineCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.singleLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "textbox";
        }
        else if (this.propertiesform.multiLine == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.multiLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.multiLineMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.multiLineCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.multiLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "textarea";
        }
        else if (this.propertiesform.SelectList == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.selectListLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.selectListCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.selectListMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].picklist_options = this.propertiesform.selectListMultiddl.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "select";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.selectListLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "dropdown";
        }
        else if (this.propertiesform.intShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.intNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.intCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.intMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "int";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "int";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 2;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.intNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "number";
        }
        else if (this.propertiesform.bigInt == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.bigintNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.bigintCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.bigintMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "bigint";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "bigint";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 3;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.bigintNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "number";
        }
        else if (this.propertiesform.decimalShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.decimalNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.decimalCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.decimalMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "decimal";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 4;
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "decimal";
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.decimalNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "decimal";
        }
        else if (this.propertiesform.dateShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.dateNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.dateMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "datetime";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "date";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 5;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.dateNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "date";
        }
        else if (this.propertiesform.booleanShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.booleanNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.booleanMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "bit";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "bit";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 16;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.booleanNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "boolean";
            this.group[this.index].controls[this.newcontrolid].default_value = this.propertiesform.booleanDefaultValue.value;
        }
        else if (this.propertiesform.checkboxShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.checkboxNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.checkboxCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.checkboxMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.checkboxNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "checkbox";
        }
        else if (this.propertiesform.radioShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.radioNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.radioCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.radioMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.radioNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "radioButton";
        }
        else if (this.propertiesform.urlShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.urlNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.urlCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.urlMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].form_field_visibility = this.propertiesform.formfieldvisible.value;
            this.group[this.index].controls[this.newcontrolid].list_field_visibility = this.propertiesform.listfieldvisible.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.urlNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "url";
        }
        //Dynamic group Created
        if (this.propertiesform.singleLine == true && this.groupCreated == 'NewGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.singleLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.singleLineMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.singleLineCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.singleLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = (this.propertiesform.isTextEditor) ? "texteditor" : "textbox";
        }
        else if (this.propertiesform.multiLine == true && this.groupCreated == 'NewGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.multiLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.multiLineMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.multiLineCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.multiLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "textarea";
        }
        else if (this.propertiesform.SelectList == true && this.groupCreated == 'NewGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.selectListLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.selectListCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.selectListMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].picklist_options = this.propertiesform.selectListMultiddl.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "select";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].selectlistvalues = this.propertiesform.selectlistvalue.value;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.selectListLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "dropdown";
        }
        else if (this.propertiesform.intShow == true && this.groupCreated == 'NewGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.intNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.intCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.intMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "int";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "int";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 2;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.intNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "number";
        }
        else if (this.propertiesform.bigInt == true && this.groupCreated == 'NewGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.bigintNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.bigintCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.bigintMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "bigint";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "bigint";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 3;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.bigintNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "number";
        }
        else if (this.propertiesform.decimalShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.propertiesform.decimalNameDisplay.value;
            //this.newgroup[this.index].length = this.propertiesform.decimalCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.propertiesform.decimalMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.decimalNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.decimalCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.decimalMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "decimal";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "decimal";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 4;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.decimalNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "decimal";
        }
        else if (this.propertiesform.booleanShow == true && this.groupCreated == 'NewGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.booleanNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.booleanMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "bit";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "bit";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 16;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.booleanNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "boolean";
            this.group[this.index].controls[this.newcontrolid].default_value = this.propertiesform.booleanDefaultValue.value;
        }
        else if (this.propertiesform.dateShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.propertiesform.dateNameDisplay.value;
            //this.newgroup[this.index].is_required = this.propertiesform.dateMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.dateNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.dateMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "datetime";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "date";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 5;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.dateNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "date";
        }
        else if (this.propertiesform.dateTimeShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.propertiesform.dateNameDisplay.value;
            //this.newgroup[this.index].is_required = this.propertiesform.dateMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.dateTimeNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.dateTimeMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "datetime";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "date";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 5;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.dateTimeNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "date";
        }
        else if (this.propertiesform.checkboxShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.propertiesform.checkboxNameDisplay.value;
            //this.newgroup[this.index].length = this.propertiesform.checkboxCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.propertiesform.checkboxMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].picklist_options = this.propertiesform.checkboxCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.checkboxNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.checkboxMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.checkboxNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "checkbox";
        }
        else if (this.propertiesform.radioShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.propertiesform.radioNameDisplay.value;
            //this.newgroup[this.index].length = this.propertiesform.radioCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.propertiesform.radioMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.radioNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].picklist_options = this.propertiesform.radioCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.radioMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.radioNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "radioButton";
        }
        else if (this.propertiesform.urlShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.propertiesform.urlNameDisplay.value;
            //this.newgroup[this.index].length = this.propertiesform.urlCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.propertiesform.urlMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.propertiesform.urlNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.propertiesform.urlCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.propertiesform.urlMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "Url";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.propertiesform.urlNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_type = "url";
        }
        this.group[this.index].controls[this.newcontrolid].form_field_visibility = (this.propertiesform.formfieldvisible.value) ? "YES" : "NO";
        this.group[this.index].controls[this.newcontrolid].form_field_visibility = (this.propertiesform.formfieldvisible.value) ? "YES" : "NO";
        this.group[this.index].controls[this.newcontrolid].dependent_id = this.propertiesform.ddlFormField.value;
        this.group[this.index].controls[this.newcontrolid].dependent_value = this.propertiesform.ddlOption.value;
        if (this.propertiesform.chkIsDependant.value) {
            this.group[this.index].controls[this.newcontrolid].is_dependent = true;
            this.group[this.index].controls[this.newcontrolid].dependent_type = "query";
        }
        else {
            this.group[this.index].controls[this.newcontrolid].is_dependent = false;
            this.group[this.index].controls[this.newcontrolid].dependent_type = null;
        }
        this.group[this.index].controls[this.newcontrolid].is_readOnly = this.propertiesform.is_readOnly.value.toString();
        // this.group[this.index].controls[this.newcontrolid].list_field_visibility = this.propertiesform.listfieldvisible.value;
        //this.colors = this.filedLists;
        //// console.log("colors", this.colors);
        //// console.log("droped", this.droped);
        //// console.log("filedLists", this.filedLists);
    };
    AddeditformComponent.prototype.allowDropFunction = function (c) {
        // console.log('3434', c);
    };
    AddeditformComponent.prototype.dragStartGroupToGroup = function (e, c) {
        this.dragedColor = c;
        //this.dragedColor
        var index = this.droped.indexOf(c);
        if (index !== -1) {
            this.droped.splice(index, 1);
        }
        //this.droped.push(this.droped);
        this.dropNewGrop('', 0);
    };
    AddeditformComponent.prototype.dragEndGroupToGroup = function (e) {
    };
    AddeditformComponent.prototype.dragEndGroupToGroupReverse = function () {
    };
    AddeditformComponent.prototype.dragStartGroupToGroupReverse = function (e, c) {
        this.dragedColor = c;
        var index = this.droped.indexOf(c);
        if (index !== -1) {
            this.newgroup.splice(index, 1);
        }
        //this.droped.push(this.droped);
        this.drop(e);
    };
    //dropNewGroup(e) {
    //  
    //  if (this.dragedColor) {
    //    this.droped.push(this.dragedColor);
    //    this.dragedColor = null;
    //    // console.log("droped", this.droped);
    //  }
    //}
    AddeditformComponent.prototype.dropNewGrop = function (lst, a) {
        if (this.dragedColor) {
            this.dragedColor.index = a;
            this.newgroup.push(this.dragedColor);
            this.groupControl = this.dragedColor;
            //this.controls.push(this.groupControl);
            this.groupControl.system_is_required = false;
            this.groupControl.is_system_generated = false;
            this.groupControl.is_inserted = 1;
            var targetIdx = this.group.find(function (item) { return item.id == a; }).id;
            this.group[targetIdx].controls.push(this.groupControl);
            // console.log('this.group', this.group[targetIdx].controls)
            //this.group.push(new Group(a + 1, this.controls));
            this.dragedColor = null;
            // console.log("newgroup", this.newgroup);
        }
    };
    AddeditformComponent.prototype.toggleClass = function (event, classs) {
        var hasClass = event.target.classList.contains(classs);
        if (this.condition == true) {
            this.condition = false;
        }
        else {
            this.condition = true;
        }
        if (hasClass) {
            //this.renderer.removeClass(event.target, classs);
            this.condition = false;
        }
        else {
            //this.renderer.addClass(event.target, classs);
            //this.condition = true;
            // console.log("AddClass", this.renderer);
        }
    };
    AddeditformComponent.prototype.toggleClassRadioButton = function (event, classs) {
        // console.log('event',event);
        // console.log('classs',classs);
        this.condition = false;
        this.formPageType = classs;
    };
    AddeditformComponent.prototype.toggleClassNewGrp = function (event, classs, index) {
        if (this.condionNewGroup == false) {
            this.condionNewGroup = true;
            var newgrpdisplay = this.GemgarteIdWithUniwquie();
            this.newGrpDisplaydropDown = newgrpdisplay;
        }
        else {
            this.condionNewGroup = false;
        }
    };
    AddeditformComponent.prototype.toggleClassRadioButtonNew = function (event, index, classs) {
        this.condionNewGroup = false;
        this.hidemeNewGrp[index] = false;
        this.dynamicformNewSection[index] = classs;
        this.formPageTypeNewGrp = classs;
        this.group[index].group_layout_type = classs.replace('Columns', '');
        this.group[index].controls.forEach(function (items) { return items.layout_type = classs.replace('Columns', ''); });
        // console.log("this.groupclas", this.group);
    };
    AddeditformComponent.prototype.NewGrop = function (NewGroup) {
        if (NewGroup == 'NewGroup') {
            this.DemoShow = true;
            this.dynamicformNewSection[0] = 'single';
            this.newGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
            this.fieldArray.push(this.newAttribute);
            //let data = this.group.length;
            this.group.push(new _form_service__WEBPACK_IMPORTED_MODULE_2__["Group"](this.group.length, 0, "", "", "", "", 1, 0, 0, []));
            for (var _i = 0, _a = this.fieldArray; _i < _a.length; _i++) {
                var data = _a[_i];
                this.dynamicformNewSection[1] = 'double';
                this.dynamicformNewSection[2] = 'double';
                this.dynamicformNewSection[3] = 'double';
                this.dynamicformNewSection[4] = 'double';
            }
            this.newAttribute = {};
        }
    };
    AddeditformComponent.prototype.DisplayProperties = function (event, order, index) {
        // console.log("ShowLL", event);
        if (this.displayProperties == false) {
            //this.displayProperties = true;
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__["document"].getElementById("#1").setAttribute("class", "show");
        }
        else {
            //  this.displayProperties = false;
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__["document"].getElementById("#1").setAttribute("display", "hide");
        }
    };
    AddeditformComponent.prototype.EditCustomFields = function (groupid, id, lst, index, groupCreated) {
        //let groupControls = this.group[groupid].controls.filter(m => ((m.picklist_options != null && m.picklist_options != "") || (m.selectlistvalues != null)) && m.display_order != lst.display_order);
        var groupControls = this.group[groupid].controls.filter(function (m) { return ((m.picklist_options != null && m.picklist_options != "") || (m.selectlistvalues != null) || (m.dt_code == "boolean")) && m.display_order != lst.display_order; });
        this.index = groupid;
        this.newcontrolid = index;
        if (groupCreated == 'NewGroupCreated') {
            this.hideme[groupid + '' + index] = false;
        }
        else {
            this.hideme[groupid + '' + index] = false;
        }
        this.groupCreated = groupCreated;
        this.propertiesform.show(lst, lst, index, groupCreated, groupControls);
    };
    AddeditformComponent.prototype.SystemDefinedPropertyRequired = function (groupid, id, lst, index, event, groupCreated) {
        if (lst.type == 'text') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.hideme[index] = false;
                this.propertiesform.singleLineMarkRequired.setValue(event.target.checked);
                //this.newgroup[this.index].required = event.target.checked;
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.singleLineMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'textarea') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.propertiesform.multiLineMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.multiLineMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'select') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.propertiesform.selectListMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.selectListMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'int') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.propertiesform.intMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.intMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'bigint') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.propertiesform.bigintMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.bigintMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'decimal') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.decimalMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.decimalMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'date') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.propertiesform.dateMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.dateMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'dateTime') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.propertiesform.dateTimeMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.dateTimeMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'boolean') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.propertiesform.booleanMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.booleanMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'checkbox') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.propertiesform.checkboxMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.checkboxMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'radio') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.propertiesform.radioMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.radioMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.propertiesform.urlMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.propertiesform.urlMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
    };
    AddeditformComponent.prototype.AddFormForCustomField = function () {
        var _this = this;
        if (this.manageForm.valid) {
            this.loadSave = true;
            var dat = this.group;
            this.group.forEach(function (item, index) {
                item.id = index;
                item.display_order = index;
                item.controls.forEach(function (item1, i) {
                    item1.display_order = i;
                    if (item1.layout_type == null) {
                        if (i > 0) {
                            item1.layout_type = item.controls[i - 1].layout_type;
                        }
                    }
                });
            });
            //console.log("newgroup", this.group);
            //this.controls.map(item => { item.system_is_required = true });
            //console.log('this.groupthis.group', JSON.stringify(this.group));
            // this.saveLayout.push(this.group);
            this.formService.SaveLAyourData(this.group, this.moduleid, this.submoduleid, this.formMasterId).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success('Form fields has been updated successfully.');
                    _this.location.back();
                    setTimeout(function () { _this.loadSave = false; }, 3000);
                    //this.router.navigateByUrl("/user");
                    // this.getcustomfielddata(this.moduleid, this.submoduleid);
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
    };
    AddeditformComponent.prototype.Cancel = function () {
        this.location.back();
    };
    AddeditformComponent.prototype.Removeform = function (index) {
        var _this = this;
        var message = "Are you sure you want to delete this section?";
        this.dialogService.confirm('DELETE SECTION', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.condionNewGroup = false;
                _this.DemoShow = false;
                _this.fieldArray.splice(index, 1);
                _this.group.splice(index, 1);
                _this.decrementcounter();
                _this.newAttribute = {};
                _this.toaster.success("Section has been deleted successfully.");
                //this.fieldArray[index] = [];
                // console.log("Array", this.fieldArray);
                // console.log("Atrt", this.newAttribute);
            }
            _this.condionNewGroup = false;
            _this.hidemeNewGrp[index] = false;
        });
    };
    AddeditformComponent.prototype.RemoveCustomFields = function (groupid, id, cntrid) {
        var _this = this;
        var message = "Are you sure you want to delete this field?";
        this.dialogService.confirm('DELETE FIELD', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.hideme[cntrid] = false;
                _this.newgroup.splice(id, 1);
                //const targetIdx = this.group.find(item => item.id == id).id;
                _this.group[groupid].controls.splice(id, 1);
                _this.toaster.success("Field has been deleted successfully.");
            }
            _this.hideme[cntrid] = false;
        });
    };
    AddeditformComponent.prototype.RemoveCustomFieldSystemDefined = function (id, lst) {
        var _this = this;
        var message = "Are you sure you want to delete this field?";
        this.dialogService.confirm('DELETE FIELD', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.hideme[id + _this.uniqueid] = false;
                _this.droped.splice(id, 1);
                _this.toaster.success("Field has been deleted successfully.");
            }
        });
    };
    AddeditformComponent.prototype.OnEditorChange = function (event, groupId, controlIndex) {
        this.group[groupId].controls[controlIndex].default_value = event.htmlValue;
    };
    AddeditformComponent.prototype.onEditorLoad = function (index, obj) {
        var _this = this;
        setTimeout(function () { _this.editor[index] = obj.default_value; }, 100);
    };
    AddeditformComponent.prototype.GetConditionInString = function (groupIndex, item) {
        var control = this.group[groupIndex].controls.filter(function (m) { return m.form_field_id.toString() == item.dependent_id; })[0];
        var ddlOptionList = [];
        if (control.selectlistvalues) {
            ddlOptionList = control.selectlistvalues;
        }
        else if (control.picklist_options) {
            var array = control.picklist_options.split(',');
            var _resultList_1 = [];
            if (array.length > 0) {
                array.forEach(function (item, index) {
                    _resultList_1.push(JSON.parse('{"value":"' + item + '","id":"' + index + '"}'));
                });
                ddlOptionList = _resultList_1;
            }
        }
        var dat = ddlOptionList.filter(function (m) { return m.id == item.dependent_value; });
        return "<span><strong>Condition Apply : </strong> Display only when <strong>" + control.display_name + "</strong> equals to <strong>" + dat[0].value + "</strong>.</span>";
    };
    AddeditformComponent.prototype.onKey = function (event, index) {
        this.values += event.target.value + ' | ';
        this.newgroup[index].groupName = this.values;
        // console.log("keyUp", this.newgroup);
    };
    AddeditformComponent.prototype.getItemToParseBolean = function (key) {
        if (key != null && key != '') {
            return JSON.parse(key);
        }
        else {
            key = 'false';
            return JSON.parse(key);
        }
    };
    AddeditformComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _form_service__WEBPACK_IMPORTED_MODULE_2__["FormService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('propertiesform', { static: false }),
        __metadata("design:type", _viewpopupwindowform_propertiespopupform_component__WEBPACK_IMPORTED_MODULE_6__["PropertiespopupformComponent"])
    ], AddeditformComponent.prototype, "propertiesform", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('parent', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])
    ], AddeditformComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Display', { static: false }),
        __metadata("design:type", Object)
    ], AddeditformComponent.prototype, "Display", void 0);
    AddeditformComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditform',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditform.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageform/addeditform.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditform.component.scss */ "./src/app/views/manageform/addeditform.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _form_service__WEBPACK_IMPORTED_MODULE_2__["FormService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"]])
    ], AddeditformComponent);
    return AddeditformComponent;
}());

var EditorDemo = /** @class */ (function () {
    function EditorDemo() {
    }
    return EditorDemo;
}());



/***/ }),

/***/ "./src/app/views/manageform/form-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/manageform/form-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: FormRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormRoutingModule", function() { return FormRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _addeditform_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addeditform.component */ "./src/app/views/manageform/addeditform.component.ts");
/* harmony import */ var _formlist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formlist.component */ "./src/app/views/manageform/formlist.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';
var routes = [
    //{ path: '', redirectTo: 'formlist', pathMatch: 'full'},
    { path: '', component: _formlist_component__WEBPACK_IMPORTED_MODULE_3__["FormlistComponent"] },
    { path: 'manageform', component: _formlist_component__WEBPACK_IMPORTED_MODULE_3__["FormlistComponent"] },
    //{ path: 'manageform/:id', component: FormlistComponent },
    { path: 'addform', component: _addeditform_component__WEBPACK_IMPORTED_MODULE_2__["AddeditformComponent"] },
    { path: 'editform/:module/:subModule/:formMasterId', component: _addeditform_component__WEBPACK_IMPORTED_MODULE_2__["AddeditformComponent"] },
    { path: 'editform/:module/:subModule', component: _addeditform_component__WEBPACK_IMPORTED_MODULE_2__["AddeditformComponent"] }
    //{ path: '', component: FormlistComponent },
    //{ path: 'formlist/:id', component: FormlistComponent }
    //{ path: 'addlayout', component: AddeditformComponent },
    //{ path: 'editlayout/:id/:sid', component: AddeditformComponent },
    // {
    //   path: '', redirectTo: 'layoutlist', pathMatch: 'full'
    //},
    //{
    //  path: 'formlist', component: FormlistComponent
    //}
];
var FormRoutingModule = /** @class */ (function () {
    function FormRoutingModule() {
    }
    FormRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], FormRoutingModule);
    return FormRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/manageform/form.module.ts":
/*!*************************************************!*\
  !*** ./src/app/views/manageform/form.module.ts ***!
  \*************************************************/
/*! exports provided: FormModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormModule", function() { return FormModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _addeditform_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./addeditform.component */ "./src/app/views/manageform/addeditform.component.ts");
/* harmony import */ var _viewpopupwindowform_propertiespopupform_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./viewpopupwindowform/propertiespopupform.component */ "./src/app/views/manageform/viewpopupwindowform/propertiespopupform.component.ts");
/* harmony import */ var _form_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./form-routing.module */ "./src/app/views/manageform/form-routing.module.ts");
/* harmony import */ var primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/components/dragdrop/dragdrop */ "./node_modules/primeng/components/dragdrop/dragdrop.js");
/* harmony import */ var primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/colorpicker */ "./node_modules/primeng/colorpicker.js");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(primeng_colorpicker__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var primeng_orderlist__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/orderlist */ "./node_modules/primeng/orderlist.js");
/* harmony import */ var primeng_orderlist__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(primeng_orderlist__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _formlist_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./formlist.component */ "./src/app/views/manageform/formlist.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};















var FormModule = /** @class */ (function () {
    function FormModule() {
    }
    FormModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_addeditform_component__WEBPACK_IMPORTED_MODULE_7__["AddeditformComponent"], _formlist_component__WEBPACK_IMPORTED_MODULE_13__["FormlistComponent"], _viewpopupwindowform_propertiespopupform_component__WEBPACK_IMPORTED_MODULE_8__["PropertiespopupformComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], primeng_colorpicker__WEBPACK_IMPORTED_MODULE_11__["ColorPickerModule"],
                _form_routing_module__WEBPACK_IMPORTED_MODULE_9__["FormRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_10__["DragDropModule"], primeng_orderlist__WEBPACK_IMPORTED_MODULE_12__["OrderListModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"]
            ]
        })
    ], FormModule);
    return FormModule;
}());



/***/ }),

/***/ "./src/app/views/manageform/formlist.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/views/manageform/formlist.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZWZvcm0vZm9ybWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/manageform/formlist.component.ts":
/*!********************************************************!*\
  !*** ./src/app/views/manageform/formlist.component.ts ***!
  \********************************************************/
/*! exports provided: FormlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormlistComponent", function() { return FormlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form.service */ "./src/app/views/manageform/form.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
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









var FormlistComponent = /** @class */ (function () {
    function FormlistComponent(fb, formservice, commonService, router, toaster, dialogService, route) {
        var _this = this;
        this.fb = fb;
        this.formservice = formservice;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.route = route;
        this.SubModuleForm = new _form_service__WEBPACK_IMPORTED_MODULE_4__["GroupAddForm"]();
        this.ddlModulelist = [];
        this.ddlSubModulelist = [];
        this.searchUserType = '';
        this.isAddForm = false;
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'Id';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.modulecode = 0;
        this.loadSave = false;
        this.isCompanyTypeFinancialInstitute = false;
        this.companyId = 1004;
        this.userInfo = [];
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["SelectionType"];
        this.selected = [];
        this.addForm = this.fb.group({
            moduleName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            ddlModule: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            ddlSubmodule: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            Id: [null]
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyid = userdetail.companyId;
        });
    }
    FormlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userInfo = JSON.parse(localStorage.getItem('userinfo'));
        this.companyType = this.userInfo["companyType"];
        this.companyId = this.userInfo["companyId"];
        if (this.companyType === "companytypeFinancialInstitute" && this.companyId === 1004) {
            this.isCompanyTypeFinancialInstitute = true;
        }
        this.currentPage = 0;
        this.pageSizeValue = 15;
        // this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
        this.getModuleddl();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.id = id;
        });
    };
    FormlistComponent.prototype.getModuleddl = function () {
        var _this = this;
        this.formservice.getModuleList().subscribe(function (result) {
            if (result) {
                var _result = JSON.parse(result);
                debugger;
                _this.modulelist = _result.module;
                _this.ddlModulelist = _result.module;
            }
        });
    };
    FormlistComponent.prototype.onModuleSelect = function (event) {
        var _this = this;
        if (event) {
            this.moduleId = event.module_id;
            this.formservice.getSubModuleListByModuleId(this.moduleId).subscribe(function (result) {
                _this.subModuleId = null;
                if (result) {
                    var _result = JSON.parse(result);
                    _this.subModulelist = _result.submodule;
                }
            });
        }
        else {
            this.moduleId = null;
            this.subModuleId = null;
            this.subModulelist = null;
        }
        ///////////////// this.lstPageSize = 0;
        this.currentPage = 0;
        this.refresh();
    };
    FormlistComponent.prototype.onSubModuleSelect = function (event) {
        if (event) {
            this.subModuleId = event.sub_module_id;
        }
        else {
            this.subModuleId = null;
        }
        ////////////this.lstPageSize = 0;
        this.currentPage = 0;
        this.refresh();
    };
    //edit(event) {
    //  debugger;
    //  let moduleCode = event.module_name_code, formName = event.sub_module_name, subModuleCode=event.sub_module_code
    //  this.router.navigate(['/formlist/editform', moduleCode, subModuleCode, formName]);
    //}
    FormlistComponent.prototype.delete = function (deleteId, submoduelcode) {
        var _this = this;
        this.deleteId = deleteId;
        debugger;
        var message = "Are you sure you want to delete this form?";
        this.dialogService.confirm('DELETE FORM', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.formservice.DeleteRecords(_this.deleteId, "tblform_master", _this.loginuserid).subscribe(function (r) {
                    _this.toaster.success("Form has been deleted successfully.");
                    _this.deleteId = "";
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    FormlistComponent.prototype.deleteForm = function (module, submdoule, formMasterId) {
        var _this = this;
        var message = "Are you sure you want to delete this form?";
        this.dialogService.confirm('DELETE FORM', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loadSave = true;
                _this.formservice.deleteForm(module, submdoule, formMasterId).subscribe(function (result) {
                    _this.toaster.success("Form has been deleted successfully.");
                    _this.deleteId = "";
                    _this.refresh();
                }, function (error) {
                }, function () {
                    _this.loadSave = false;
                });
            }
        });
    };
    FormlistComponent.prototype.onChange = function ($event) {
        var _this = this;
        //this.currentPage = 0;
        //this.refresh();
        this.loading = true;
        this.formservice.GetFormList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.moduleId, this.subModuleId).subscribe(function (response) {
            _this.pagedData = _this.formservice.pagedData;
            _this.offset = 1;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    FormlistComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loading = true;
        this.formservice.GetFormList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.moduleId, this.subModuleId).subscribe(function (response) {
            _this.pagedData = _this.formservice.pagedData;
            _this.offset = 1;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    FormlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    FormlistComponent.prototype.setPage = function ($event) {
        this.loading = true;
        // this.lstPageSize = $event.page - 1;
        //// this.pageSizeValue = $event.page - 1;
        var ab = $event.page - 1;
        this.currentPage = ab;
        this.refresh();
    };
    FormlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        /////////////// this.lstPageSize = $event.page - 1;
        ///// this.pageSizeValue = $event.page - 1;
        this.refresh();
        ;
    };
    FormlistComponent.prototype.showpopup = function () {
        this.addForm.reset();
        this.isAddForm = true;
        this.getModuleddl();
        this.addForm.get('ddlModule').enable();
        this.addForm.get('ddlSubmodule').enable();
        this.makeFormModel.show();
    };
    FormlistComponent.prototype.Editshowpopup = function (row) {
        debugger;
        this.GetEditSubModule(row.module_id);
        console.log("row", row);
        this.addForm.patchValue({
            moduleName: row.formName,
            Id: row.form_master_id,
            ddlSubmodule: row.sub_module_id,
            ddlModule: row.module_id,
        });
        this.addForm.get('ddlSubmodule').disable();
        this.addForm.get('ddlModule').disable();
        this.makeFormModel.show();
    };
    FormlistComponent.prototype.close = function () {
        this.makeFormModel.hide();
    };
    Object.defineProperty(FormlistComponent.prototype, "moduleName", {
        get: function () { return this.addForm.get('moduleName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlistComponent.prototype, "ddlModule", {
        get: function () { return this.addForm.get('ddlModule'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlistComponent.prototype, "ddlSubmodule", {
        get: function () { return this.addForm.get('ddlSubmodule'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlistComponent.prototype, "Id", {
        get: function () { return this.addForm.get('Id'); },
        enumerable: true,
        configurable: true
    });
    FormlistComponent.prototype.saveNewForm = function () {
        var _this = this;
        if (this.addForm.valid) {
            var modulecode_1 = this.ddlModulelist.filter(function (m) { return m.module_id == _this.ddlModule.value; })[0].module_code.toLowerCase();
            var submodulecode_1 = this.ddlSubModulelist.filter(function (m) { return m.sub_module_id == _this.ddlSubmodule.value; })[0].sub_module_code.toLowerCase();
            this.SubModuleForm.moduleName = this.addForm.value.moduleName;
            this.SubModuleForm.moduleId = this.ddlModule.value;
            this.SubModuleForm.subModuleId = this.ddlSubmodule.value;
            this.SubModuleForm.Id = this.addForm.value.Id;
            debugger;
            this.formservice.saveNewSubModule(this.SubModuleForm, this.loginuserid, this.companyid).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.makeFormModel.hide();
                    _this.refresh();
                    _this.router.navigate(['/manageform/editform', modulecode_1, submodulecode_1, result.id]);
                }
                else if (result.statusCode == 300) {
                    _this.toaster.success(result.responseMessage);
                    _this.makeFormModel.hide();
                    _this.refresh();
                    //this.router.navigate(['/manageform/editform', modulecode, submodulecode, result.id]);
                }
                else if (result.statusCode == 500 && result.id == -1) {
                    _this.toaster.error("Already Exists with same form Name");
                }
                else if (result.statusCode == 500 && result.id == -2) {
                    _this.toaster.error("Can not be same name as system predefine");
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
    FormlistComponent.prototype.GetEditSubModule = function (moduleId) {
        var _this = this;
        if (moduleId) {
            this.formservice.getSubModuleListByModuleId(moduleId).subscribe(function (result) {
                if (result) {
                    var _result = JSON.parse(result);
                    _this.ddlSubModulelist = _result.submodule;
                }
            });
        }
    };
    FormlistComponent.prototype.getSubmodulesByModuleId = function (event) {
        var _this = this;
        if (event) {
            var moduleId = event.module_id;
            if (moduleId) {
                this.formservice.getSubModuleListByModuleId(moduleId).subscribe(function (result) {
                    if (result) {
                        var _result = JSON.parse(result);
                        _this.ddlSubModulelist = _result.submodule;
                    }
                });
            }
        }
        else {
            this.ddlSubModulelist = null;
            this.ddlSubmodule.setValue(null);
        }
    };
    Object.defineProperty(FormlistComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    FormlistComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].form_master_id.toString() + ",";
            }
        }
        else {
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].form_master_id.toString() + ",";
            }
        }
    };
    FormlistComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete this form(s)?";
            this.dialogService.confirm('DELETE FORM(S)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.loadSave = true;
                    _this.formservice.deleteFormMultiple(_this.deleteId).subscribe(function (result) {
                        _this.toaster.success("Form has been deleted successfully.");
                        _this.deleteId = "";
                        _this.selected = [];
                        _this.refresh();
                    }, function (error) {
                    }, function () {
                        _this.loadSave = false;
                    });
                }
            });
        }
        else {
            this.toaster.error("Please select at least one row.");
        }
    };
    FormlistComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
        { type: _form_service__WEBPACK_IMPORTED_MODULE_4__["FormService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('makeForm', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalDirective"])
    ], FormlistComponent.prototype, "makeFormModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FormlistComponent.prototype, "offset", void 0);
    FormlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./formlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageform/formlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./formlist.component.scss */ "./src/app/views/manageform/formlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"],
            _form_service__WEBPACK_IMPORTED_MODULE_4__["FormService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], FormlistComponent);
    return FormlistComponent;
}());



/***/ }),

/***/ "./src/app/views/manageform/viewpopupwindowform/propertiespopupform.component.scss":
/*!*****************************************************************************************!*\
  !*** ./src/app/views/manageform/viewpopupwindowform/propertiespopupform.component.scss ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZWZvcm0vdmlld3BvcHVwd2luZG93Zm9ybS9wcm9wZXJ0aWVzcG9wdXBmb3JtLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/manageform/viewpopupwindowform/propertiespopupform.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/views/manageform/viewpopupwindowform/propertiespopupform.component.ts ***!
  \***************************************************************************************/
/*! exports provided: PropertiespopupformComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertiespopupformComponent", function() { return PropertiespopupformComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../form.service */ "./src/app/views/manageform/form.service.ts");
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
        this.isTextEditor = false;
        this.is_system_generated = false;
        //ddloptions :any;
        this.ddloptionsvalidation = false;
        this.editid = 0;
        this.colorList = [];
        // ddloptionscolor : any;
        this.idcounter = 0;
        this.selectoptions = new _form_service__WEBPACK_IMPORTED_MODULE_6__["SelectListArray"]();
        this.selectlistvalues = [];
        this.loadSave = false;
        //************************* dependancy field code *************************************/
        this.isDisplayDependentSection = false;
        this.isDependant = false;
        this.FormFieldList = [];
        this.ddlOptionList = [];
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
    PropertiespopupformComponent.prototype.deleteSelectlist = function (id, value, color, rowIndex) {
        this.editid = id;
        var data = this.selectlistvalues;
        this.selectlistvalues.splice(rowIndex, 1);
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
        debugger;
        try {
            if (this.ddloptions.value != null && this.ddloptions.value != "") {
                this.colorCode = this.properties.controls["ddloptionscolor"].value;
                this.ddloptionsvalidation = false;
                this.selectoptions = new _form_service__WEBPACK_IMPORTED_MODULE_6__["SelectListArray"]();
                if (this.editid == 0) {
                    this.selectoptions.id = this.incrementcounterid();
                    this.selectoptions.isinserted = 1;
                    this.selectoptions.value = this.ddloptions.value;
                    this.selectoptions.color = this.ddloptionscolor.value == null || this.ddloptionscolor.value == '' ? '#3b0acc' : this.ddloptionscolor.value;
                    this.selectlistvalues.push(this.selectoptions);
                }
                else {
                    var targetIdx = this.selectlistvalues.find(function (item) { return item.id == _this.editid; });
                    var indexObj = this.selectlistvalues.indexOf(targetIdx);
                    this.selectlistvalues[indexObj].value = this.ddloptions.value;
                    this.selectlistvalues[indexObj].color = this.ddloptionscolor.value == null || this.ddloptionscolor.value == '' ? '#3b0acc' : this.ddloptionscolor.value;
                }
                this.properties.controls["selectlistvalue"].setValue(this.selectlistvalues);
                this.properties.controls["ddloptions"].setValue(null);
                this.properties.controls["ddloptionscolor"].setValue(this.ddloptionscolor.value);
                this.colorCode = "";
            }
            else {
                this.ddloptionsvalidation = true;
            }
        }
        catch (error) {
            console.log("error", error);
        }
    };
    PropertiespopupformComponent.prototype.close = function () {
        this.active = false;
        this.propertiesPopupForm.hide();
    };
    //Save() {
    //  this.modalmakeAppointment.hide();
    //  this.router.navigateByUrl("/calendar");
    //}
    PropertiespopupformComponent.prototype.show = function (list, drpoed, index, groupCreated, groupControls) {
        debugger;
        //this.refresh();
        console.log("List", list);
        this.fieldName = "Field"; //list.name;
        this.is_system_generated = list.is_system_generated;
        this.fieldsType = list.dt_code;
        this.fieldList = list;
        if (list.dt_code == 'text' && list.field_type == 'texteditor') {
            this.isTextEditor = true;
        }
        else {
            this.isTextEditor = false;
        }
        if (list.dt_code == 'text') {
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.singleLine = true;
            this.SelectList = false;
            this.multiLine = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.urlShow = false;
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
            this.singleLineNameDisplay.setValue(list.display_name);
            this.singleLineMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'textarea') {
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.multiLine = true;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.booleanShow = false;
            this.urlShow = false;
            this.checkboxShow = false;
            this.radioShow = false;
            this.properties.controls["multiLineNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["multiLineNameDisplay"].updateValueAndValidity();
            this.properties.controls["multiLineCharactersAllowed"].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^[0-9]*$"), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4),]);
            this.properties.controls["multiLineCharactersAllowed"].updateValueAndValidity();
            this.multiLineCharactersAllowed.setValue(typeof list.length == undefined ? 200 : list.length);
            this.multiLineNameDisplay.setValue(list.display_name);
            this.multiLineMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'select') {
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = true;
            this.intShow = false;
            this.booleanShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.checkboxShow = false;
            this.urlShow = false;
            this.radioShow = false;
            this.properties.controls["selectListLineNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["selectListLineNameDisplay"].updateValueAndValidity();
            this.properties.controls["selectListCharactersAllowed"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["selectListCharactersAllowed"].updateValueAndValidity();
            this.selectListCharactersAllowed.setValue(list.length);
            this.selectListLineNameDisplay.setValue(list.display_name);
            this.selectListMarkRequired.setValue(list.is_required);
            this.selectListMultiddl.setValue(list.picklist_options);
            this.selectlistvalues = list.selectlistvalues == undefined ? new Array() : list.selectlistvalues;
            // console.log('aaaa', this.selectlistvalues);
        }
        else if (list.dt_code == 'int') {
            this.initForm();
            this.index = index;
            this.booleanShow = false;
            this.parentData = drpoed;
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = true;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.checkboxShow = false;
            this.urlShow = false;
            this.radioShow = false;
            this.properties.controls["intNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["intNameDisplay"].updateValueAndValidity();
            this.properties.controls["intCharactersAllowed"].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^[0-9]*$"), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4),]);
            this.properties.controls["intCharactersAllowed"].updateValueAndValidity();
            this.intCharactersAllowed.setValue(list.length);
            this.intNameDisplay.setValue(list.display_name);
            this.intMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'bigint') {
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.multiLine = false;
            this.singleLine = false;
            this.booleanShow = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = true;
            this.decimalShow = false;
            this.dateShow = false;
            this.checkboxShow = false;
            this.radioShow = false;
            this.urlShow = false;
            this.properties.controls["bigintNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["bigintNameDisplay"].updateValueAndValidity();
            this.properties.controls["bigintCharactersAllowed"].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^[0-9]*$"), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4),]);
            this.properties.controls["bigintCharactersAllowed"].updateValueAndValidity();
            this.bigintCharactersAllowed.setValue(list.length);
            this.bigintNameDisplay.setValue(list.display_name);
            this.bigintMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'decimal') {
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.booleanShow = false;
            this.decimalShow = true;
            this.dateShow = false;
            this.urlShow = false;
            this.checkboxShow = false;
            this.radioShow = false;
            this.properties.controls["decimalNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["decimalNameDisplay"].updateValueAndValidity();
            this.properties.controls["decimalCharactersAllowed"].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^[0-9]*$"), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4),]);
            this.properties.controls["decimalCharactersAllowed"].updateValueAndValidity();
            this.decimalCharactersAllowed.setValue(list.length);
            this.decimalNameDisplay.setValue(list.display_name);
            this.decimalMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'boolean') {
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.checkboxShow = false;
            this.booleanShow = true;
            this.urlShow = false;
            this.radioShow = false;
            this.properties.controls["booleanNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["booleanNameDisplay"].updateValueAndValidity();
            this.booleanNameDisplay.setValue(list.name);
            this.booleanMarkRequired.setValue(list.is_required);
            debugger;
            if (list.default_value != null && list.default_value != "") {
                this.booleanDefaultValue.setValue(JSON.parse(list.default_value));
            }
            else {
                this.booleanDefaultValue.setValue(list.default_value);
            }
        }
        else if (list.dt_code == 'date') {
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = true;
            this.checkboxShow = false;
            this.urlShow = false;
            this.booleanShow = false;
            this.radioShow = false;
            this.properties.controls["dateNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["dateNameDisplay"].updateValueAndValidity();
            this.dateNameDisplay.setValue(list.display_name);
            this.dateMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'datetime') {
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateTimeShow = true;
            this.checkboxShow = false;
            this.urlShow = false;
            this.booleanShow = false;
            this.radioShow = false;
            this.properties.controls["dateTimeNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["dateTimeNameDisplay"].updateValueAndValidity();
            this.dateTimeNameDisplay.setValue(list.display_name);
            this.dateTimeMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'checkbox') {
            debugger;
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.booleanShow = false;
            this.checkboxShow = true;
            this.radioShow = false;
            this.urlShow = false;
            this.properties.controls["checkboxNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["checkboxNameDisplay"].updateValueAndValidity();
            this.properties.controls["checkboxCharactersAllowed"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["checkboxCharactersAllowed"].updateValueAndValidity();
            this.checkboxNameDisplay.setValue(list.display_name);
            this.checkboxCharactersAllowed.setValue(list.picklist_options);
            this.checkboxMarkRequired.setValue(list.is_required);
        }
        else if (list.dt_code == 'radio') {
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.checkboxShow = false;
            this.booleanShow = false;
            this.radioShow = true;
            this.urlShow = false;
            this.properties.controls["radioNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["radioNameDisplay"].updateValueAndValidity();
            this.properties.controls["radioCharactersAllowed"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["radioCharactersAllowed"].updateValueAndValidity();
            this.radioNameDisplay.setValue(list.display_name);
            //this.radioCharactersAllowed.setValue(list.length);
            this.radioMarkRequired.setValue(list.is_required);
            this.radioCharactersAllowed.setValue(list.picklist_options);
        }
        else if (list.dt_code == 'url') {
            this.initForm();
            this.index = index;
            this.parentData = drpoed;
            this.multiLine = false;
            this.singleLine = false;
            this.SelectList = false;
            this.intShow = false;
            this.bigInt = false;
            this.decimalShow = false;
            this.dateShow = false;
            this.checkboxShow = false;
            this.radioShow = false;
            this.booleanShow = false;
            this.urlShow = true;
            this.properties.controls["urlNameDisplay"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["urlNameDisplay"].updateValueAndValidity();
            this.properties.controls["urlCharactersAllowed"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.properties.controls["urlCharactersAllowed"].updateValueAndValidity();
            this.urlNameDisplay.setValue(list.display_name);
            this.urlCharactersAllowed.setValue(list.length);
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
        if (this.formfieldvisible.value) {
            this.isDisplayDependentSection = true;
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
            var control = groupControls.filter(function (m) { return m.form_field_id.toString() == list.dependent_id; })[0];
            this.OnDependencyFieldChange(control);
            this.ddlOption.setValue(list.dependent_value);
        }
        this.propertiesPopupForm.show();
        this.active = true;
        debugger;
        console.log("", groupControls);
        this.FormFieldList = groupControls.map(function (m) { return { value: m.display_name, id: m.form_field_id.toString(), picklist_options: m.picklist_options, selectlistvalues: m.selectlistvalues, dt_code: m.dt_code }; });
    };
    PropertiespopupformComponent.prototype.Save = function () {
        var _this = this;
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
            this.toaster.success("Field properties has been set successfully.");
            //this.parentData.find(this.index).name = this.properties.value.singleLineNameDisplay;
            // console.log("Please", this.properties.value);
        }
        else if (error == 1) {
            setTimeout(function () {
                //this.toaster.error('Mark as Required and Is Readonly both can not be check at the same time');
                _this.toaster.error('Mark as Required and Is Read Only both can not be selected together.');
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
        console.log("OnDependencyFieldChange", e);
        this.ddlOptionList = [];
        this.ddlOption.setValue(null);
        this.ddlOption.updateValueAndValidity;
        if (typeof e != undefined) {
            if (e.dt_code != "boolean" && e.selectlistvalues) {
                debugger;
                this.ddlOptionList = e.selectlistvalues;
            }
            else if (e.dt_code != "boolean" && e.picklist_options) {
                var array = e.picklist_options.split(',');
                var _resultList_1 = [];
                if (array.length > 0) {
                    array.forEach(function (item, index) {
                        _resultList_1.push(JSON.parse('{"value":"' + item + '","id":"' + item + '"}'));
                    });
                    console.log("_resultList", _resultList_1);
                    this.ddlOptionList = _resultList_1;
                }
            }
            else if (e.dt_code = "boolean") {
                var _resultList1 = [];
                _resultList1.push(JSON.parse('{"value":"Yes","id":"true"}'));
                _resultList1.push(JSON.parse('{"value":"No","id":"false"}'));
                this.ddlOptionList = _resultList1;
            }
        }
    };
    PropertiespopupformComponent.prototype.OnDependencyOptionChange = function (events) {
    };
    PropertiespopupformComponent.prototype.onClear = function (type) {
        if (type == "ddlFormField") {
            this.ddlOption.setValue(null);
        }
        else if (type == "ddlOption") {
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
            // DateTimeToLocalForAddEditForDatePipe
            dateTimeNameDisplay: [null],
            dateTimeMarkRequired: [false],
            booleanNameDisplay: [null],
            booleanDefaultValue: [null],
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
            formfieldvisible: [false],
            chkIsDependant: [false],
            ddloptions: '',
            ddloptionscolor: '',
            selectlistvalue: [], is_readOnly: [false],
            ddlFormField: [],
            ddlOption: []
        });
    };
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
    Object.defineProperty(PropertiespopupformComponent.prototype, "dateTimeMarkRequired", {
        get: function () { return this.properties.get('dateTimeMarkRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertiespopupformComponent.prototype, "dateTimeNameDisplay", {
        get: function () { return this.properties.get('dateTimeNameDisplay'); },
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
    Object.defineProperty(PropertiespopupformComponent.prototype, "booleanDefaultValue", {
        get: function () { return this.properties.get('booleanDefaultValue'); },
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
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('propertiesPopupform', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalDirective"])
    ], PropertiespopupformComponent.prototype, "propertiesPopupForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PropertiespopupformComponent.prototype, "customFieldLayOut", void 0);
    PropertiespopupformComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-propertiespopupform',
            template: __importDefault(__webpack_require__(/*! raw-loader!./propertiespopupform.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageform/viewpopupwindowform/propertiespopupform.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./propertiespopupform.component.scss */ "./src/app/views/manageform/viewpopupwindowform/propertiespopupform.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], PropertiespopupformComponent);
    return PropertiespopupformComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-manageform-form-module.js.map