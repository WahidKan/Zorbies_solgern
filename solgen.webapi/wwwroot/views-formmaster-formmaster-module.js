(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-formmaster-formmaster-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/formmaster/formbuilder.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/formmaster/formbuilder.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Add Custom Field</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/user\">Manage Custom Field</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets \">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-content pb-5\">\r\n        <form [formGroup]=\"manageLayout\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-3 col-lg-3 px-2\" id=\"FixedDiv\">\r\n              <h3 class=\"side_panel-heading\"> Select New Field</h3>\r\n              <div class=\"bordered-content\">\r\n                <ul class=\"types columnlist list-group custom-field-layout custom-field-layout-left-panel mb-3\">\r\n\r\n                  <li class=\"list-group-item selected\" id=\"1\" code=\"string\" maxlength=\"100\" *ngFor=\"let color of colors\"\r\n                      pDraggable=\"color\"\r\n                      (onDragStart)=\"dragStart($event,color)\" (onDragEnd)=\"dragEnd($event)\">\r\n                    <a href=\"javscript:;\">\r\n                      <i class=\"fa fa-ellipsis-h {{color.classname}}\"></i>\r\n                      <span>\r\n                        {{color.name}}\r\n                      </span>\r\n                    </a>\r\n                  </li>\r\n                </ul>\r\n\r\n\r\n                <!--<div *ngFor=\"let color of colors\" class=\"border col-md-6 col-lg-6\" pDraggable=\"color\"\r\n                     (onDragStart)=\"dragStart($event,color)\" (onDragEnd)=\"dragEnd($event)\">\r\n                  <i class=\"{{color.classname}}\"></i>&nbsp;{{color.name}}\r\n                </div>-->\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-9 col-lg-9 px-3\">\r\n              <div class=\"drop\" pDroppable=\"color\" (onDrop)=\"drop($event)\" style=\"display:none\">\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <div class=\"form-group d-flex justify-content-between\">\r\n                    <input type=\"text\" class=\"form-control w-50\" formControlName=\"fieldName\" maxlength=\"50\" placeholder=\"Enter group name\">\r\n                    <div class=\"dropdown form-group\">\r\n                      <a href=\"javascript:void(0);\" class=\"column-setting py-2 d-block\" (click)=\"toggleClass($event,'show')\"><i class=\"fa fa-cog text-dark\" style=\"font-size: 20px;\"></i></a>\r\n                      <div class=\"dropdown-menu\" [ngClass]=\"condition ? 'show' : 'hide'\" id=\"column-setting\">\r\n                        <!--<a class=\"dropdown-item\" href=\"javascrip:;\">double Columns</a>-->\r\n                        Select Layout\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <input type=\"radio\" class=\"custom-control-input\" id=\"customRadio1\" name=\"contactPreferredDocumentSignedBy\"\r\n                                 (click)=\"toggleClassRadioButton($event,'double')\" value=\"double\" checked>\r\n                          <label class=\"custom-control-label\" for=\"customRadio1\">double Columns</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <!--<a class=\"dropdown-item\" href=\"javascrip:;\">Triple Columns</a>-->\r\n                          <input type=\"radio\" class=\"custom-control-input\" id=\"tripleColumns\" name=\"contactPreferredDocumentSignedBy\"\r\n                                 (click)=\"toggleClassRadioButton($event,'triple')\" value=\"triple\">\r\n                          <label class=\"custom-control-label\" for=\"tripleColumns\">Triple Columns</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <!--<a class=\"dropdown-item\" href=\"javascrip:;\">Four Columns</a>-->\r\n                          <input type=\"radio\" class=\"custom-control-input\" id=\"fourColumns\" (click)=\"toggleClassRadioButton($event,'four')\"\r\n                                 name=\"contactPreferredDocumentSignedBy\" value=\"four\">\r\n                          <label class=\"custom-control-label\" for=\"fourColumns\">Four Columns</label>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <p-orderList [value]=\"droped\" styleClass=\"two-column\" dragdrop=\"true\">\r\n\r\n                  <ng-template let-c pTemplate=\"item\">\r\n\r\n\r\n                    <div class=\"draged-item\" *ngIf=\"c.display_name; else elseblock\">\r\n                      <i class=\"{{c.class_name}}\"></i>&nbsp;{{c.display_name}}<i class=\"fa fa-ellipsis-h text-secondary float-right\"></i>\r\n                    </div>\r\n                    <ng-template #elseblock>\r\n                      <div [ngClass]=\"{'col-12': layoutPageType =='single', 'col-md-6': layoutPageType =='double', 'col-lg-4':layoutPageType =='triple', 'col-lg-3 col-xl-3': layoutPageType =='four' }\" id=\"newSection\">\r\n                        <div class=\"draged-item\" pDraggable=\"c\" style=\"background-color:antiquewhite\"\r\n                             (onDragStart)=\"dragStartGroupToGroup($event,c)\" (onDragEnd)=\"dragEndGroupToGroup($event)\" *ngIf=\"c.name; else elseblock\">\r\n                          <i class=\"{{c.class_name}}\"></i>\r\n                          {{c.name}} <a href=\"javscript:;\">\r\n                            <span>\r\n                              <span (click)=\"hideme[droped.indexOf(c)+uniqueid] =! hideme[droped.indexOf(c)+uniqueid]\"><i class=\"fa fa-ellipsis-h text-secondary float-right\"></i></span>\r\n                              <div class=\"dropdown-menu\" [ngClass]=\"{'hide' : hideme[droped.indexOf(c)+uniqueid] == false,'show' : hideme[droped.indexOf(c)+uniqueid] == true}\" id=\"column-setting+{{droped.indexOf(c)}}\">\r\n                                <div class=\"custom-control custom-checkbox\">\r\n                                  <input id=\"'chk_'+ {{c.dt_code}}+ '_' + {{c.id}}+ '_' + {{droped.indexOf(c)}}\" class=\"dynamic custom-control-input\" (click)=\"SystemDefinedPropertyRequired(c.id,c,droped.indexOf(c),$event)\" type=\"checkbox\">\r\n                                  <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"'chk_'+ {{c.dt_code}}+ '_' + {{c.id}}+ '_' + {{droped.indexOf(c)}}\">Mark As Required</label>\r\n                                </div>\r\n\r\n                                <div>\r\n                                  <a href=\"javascript:void(0);\" (click)=\"EditCustomFields(c.id,c,droped.indexOf(c))\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-pencil text-success\"></i> <span class=\"ml-1 text-secondary\" style=\"font-size: 14px;\">View Properties</span></a>\r\n                                </div>\r\n                                <div>\r\n                                  <a href=\"javascript:void(0);\" (click)=\"RemoveCustomFieldSystemDefined(droped.indexOf(c),c)\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-trash text-danger\"></i> <span class=\"ml-1 text-dark\" style=\"font-size: 14px;\">Remove Field</span></a>\r\n                                </div>\r\n\r\n                              </div>\r\n                            </span>\r\n                          </a>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </ng-template>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n                  </ng-template>\r\n\r\n                </p-orderList>\r\n              </div>\r\n              <style>\r\n                .customdieldbg {\r\n                  background-color: antiquewhite;\r\n                }\r\n              </style>\r\n              <!--<div class=\"col-md-8 col-lg-8\">\r\n\r\n                Drag Containers <input type=\"checkbox\" (click)=\"dragfullgroup()\" />\r\n              </div>-->\r\n              <div dnd-sortable-container [sortableData]=\"group\" [dropZones]=\"['container-dropZone']\">\r\n\r\n                <div id=\"container\" class=\" mb-3\" *ngFor=\"let field of group; let a = index\" dnd-sortable [sortableIndex]=\"a\" [dragEnabled]=\"dragOperation\">\r\n                  <div class=\"drop\" pDroppable=\"color\" (onDrop)=\"dropNewGrop($event,a)\" dnd-sortable-container [sortableData]=\"field.controls\" [dropZones]=\"['widget-dropZone']\">\r\n                    <div class=\"drop_right_heading\">\r\n                      <div class=\"col-md-12 col-lg-12\">\r\n                        <div class=\"form-group d-flex justify-content-between\" (mousedown)=\"fordragcontainer()\">\r\n                          <input type=\"text\" class=\"form-control w-50\" [value]=\"field.group_display_name\" (keydown)=\"changegroup($event,a)\" maxlength=\"50\" placeholder=\"Enter group name\">\r\n                          <div class=\"dropdown form-group\">\r\n                            <a href=\"javascript:void(0);\" class=\"column-setting py-2 d-block\"\r\n                               (click)=\"hidemeNewGrp[a] =! hidemeNewGrp[a]\"><i class=\"fa fa-cog text-dark\" style=\"font-size: 20px;\"></i></a>\r\n                            <div class=\"dropdown-menu selctlay\"\r\n                                 [ngClass]=\"{'hide' : hidemeNewGrp[a] == false,'show' : hidemeNewGrp[a] == true}\"\r\n                                 id=\"column-setting\">\r\n                              <span class=\"hedlay\">   Select Layout</span>\r\n                              <div class=\"custom-control custom-radio\">\r\n                                <a href=\"javascript:void(0)\" (click)=\"toggleClassRadioButtonNew($event,a,'double')\">\r\n                                  <input type=\"radio\" class=\"custom-control-input\" id=\"customRadioNewGrp{{a}}\" name=\"contactPreferredDocumentSignedBy{{a}}\"\r\n                                         value=\"double\" checked>\r\n                                  <label class=\"custom-control-label\" for=\"customRadioNewGrp{{a}}\">double Columns</label>\r\n                                </a>\r\n                              </div>\r\n                              <div class=\"custom-control custom-radio\">\r\n                                <a href=\"javascript:void(0)\" (click)=\"toggleClassRadioButtonNew($event,a,'triple')\">\r\n\r\n                                  <input type=\"radio\" class=\"custom-control-input\" id=\"tripleColumnsNewGrp{{a}}\" name=\"contactPreferredDocumentSignedBy{{a}}\"\r\n                                         value=\"triple\">\r\n                                  <label class=\"custom-control-label\" for=\"tripleColumnsNewGrp{{a}}\">Triple Columns</label>\r\n\r\n                                </a>\r\n                              </div>\r\n                              <div class=\"custom-control custom-radio\">\r\n                                <!--<a class=\"dropdown-item\" href=\"javascrip:;\">Four Columns</a>-->\r\n                                <a href=\"javascript:void(0)\" (click)=\"toggleClassRadioButtonNew($event,a,'four')\">\r\n                                  <input type=\"radio\" class=\"custom-control-input\" id=\"fourColumnsNewGrp{{a}}\"\r\n                                         name=\"contactPreferredDocumentSignedBy{{a}}\" value=\"four\">\r\n                                  <label class=\"custom-control-label\" for=\"fourColumnsNewGrp{{a}}\">Four Columns</label>\r\n                                </a>\r\n                              </div>\r\n                              <div>\r\n                                <a href=\"javascript:void(0);\" (click)=\"Removelayout(a)\" class=\"dropdown-item\" draggable=\"false\"><i class=\"fa fa-trash text-danger\" style=\"font-size: 20px;\"></i> <span class=\"ml-1 text-dark\" style=\"font-size: 14px;\">Remove Layout</span></a>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div> <div class=\"row custom_feild_box\">\r\n                      <ng-container *ngFor=\"let c of field.controls; let i=index\">\r\n                        <!--<div >-->\r\n\r\n                        <div [ngClass]=\"{'col-lg-4':true,'col-12': dynamicLayoutNewSection[a] =='single', 'col-md-6': dynamicLayoutNewSection[a] =='double', 'col-lg-4':dynamicLayoutNewSection[a] =='triple', 'col-lg-3 col-xl-3': dynamicLayoutNewSection[a] =='four' }\">\r\n                          <div class=\"draged-item\" dnd-sortable [sortableIndex]=\"i\" [dragEnabled]=\"!dragOperation\" (mousedown)=\"fordragcontrol()\"\r\n                               [dragData]=\"c\" [ngClass]=\"{'customdieldbg': c.is_system_generated ==false}\">\r\n                             =\r\n                              <!--<i class=\"{{c.class_name}}\"></i>--><span class=\"form-control w-75 float-left\">{{c.is_system_generated ==false ? c.name : c.display_name}}</span>\r\n                            <span class=\"w-25 float-right\" style=\"padding-top:10px;\">\r\n                              <a href=\"javscript:;\">\r\n                                <span>\r\n\r\n                                  <span (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa-ellipsis-h text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <div class=\"dropdown-menu float-right hideshowdropdown quickkact\" [ngClass]=\"{'hide' : hideme[a+''+i] == false,'show' : hideme[a+''+i] == true}\" id=\"column-setting{{a}}{{i}}\">\r\n                                    <!--<div class=\"custom-control custom-checkbox\">\r\n                                      <input id=\"'chk_'+{{c.dt_code}}+'_'+ {{c.id}}+'_'+{{i}}\" class=\"dynamic custom-control-input\"\r\n                                             (click)=\"SystemDefinedPropertyRequired(c.id,c,i,$event,'NewGroupCreated')\" type=\"checkbox\">\r\n                                      <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n                                             for=\"'chk_'+{{c.dt_code}}+'_'+{{c.id}}+'_'+{{i}}\">Mark As Required</label>\r\n                                    </div>-->\r\n\r\n\r\n                                    <div class=\"custom-control custom-checkbox\">\r\n                                      <input id=\"'chk_'+ {{c.dt_code}}+ '_' + {{c.id}}+ '_' + {{i}}\" class=\"dynamic custom-control-input\"\r\n                                             (click)=\"SystemDefinedPropertyRequired(a,c.id,c,i,$event,'NewGroupCreated')\" type=\"checkbox\">\r\n                                      <label class=\"custom-control-label universal-custom-control-label pr-1 dynamic\" for=\"'chk_'+ {{c.dt_code}}+ '_' + {{c.id}}+ '_' + {{i}}\">Mark As Required</label>\r\n                                    </div>\r\n\r\n\r\n                                    <div>\r\n                                      <a href=\"javascript:void(0);\" (click)=\"EditCustomFields(a,c.id,c,i,'NewGroupCreated')\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-pencil text-success\"></i> <span class=\"ml-1 text-secondary\" style=\"font-size: 14px;\">View Properties</span></a>\r\n                                    </div>\r\n                                    <div *ngIf=\"!c.is_system_generated\">\r\n\r\n                                      <a href=\"javascript:void(0);\" (click)=\"RemoveCustomFields(a,i,a+''+i)\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-trash text-danger\"></i> <span class=\"ml-1 text-dark\" style=\"font-size: 14px;\">Remove Field</span></a>\r\n                                    </div>\r\n\r\n                                  </div>\r\n                                </span>\r\n                              </a>\r\n                            </span>\r\n                            <div class=\"clearfix\"></div>\r\n                          </div>\r\n                        </div>\r\n\r\n                        <!--</div>-->\r\n                      </ng-container>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 p-0\">\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger float-right\" (click)=\"Cancel()\"><i class=\"fa fa-times pr-1\"></i> Cancel</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2 float-right\" (click)=\"AddLayoutForCustomField()\"><i class=\"fa fa-save pr-1\"></i> Submit</a>\r\n                <a href=\"javascript:void(0);\" title=\"\" class=\"btn btn-success formbtn widthhalf  mr-2 float-right\" (click)=\"NewGrop('NewGroup')\"\r\n                   tooltip=\"Create New Group\"><i class=\"fa fa-users pr-1\"></i>New Group</a>\r\n\r\n\r\n\r\n\r\n              </div>\r\n            </div>\r\n\r\n\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!--<h4>Move items between multi list sortable containers</h4>\r\n  <div class=\"row\" >\r\n    <div class=\"col-sm-12\">\r\n\r\n      <div dnd-sortable-container [sortableData]=\"containers\" [dropZones]=\"['container-dropZone']\">\r\n        {{containers|json}}\r\n        <div class=\"col-sm-12\"\r\n             *ngFor=\"let container of containers; let i = index\"\r\n             dnd-sortable [sortableIndex]=\"i\" [dragEnabled]=\"dragOperation\">\r\n          <div class=\"panel panel-warning\"\r\n               dnd-sortable-container [sortableData]=\"container.widgets\" [dropZones]=\"['widget-dropZone']\">\r\n            <div class=\"panel-heading\">\r\n              {{container.id}} - {{container.name}}\r\n            </div>\r\n            <div class=\"panel-body\">\r\n              <ul class=\"list-group\">\r\n                {{container.widgets|json}}\r\n                <li *ngFor=\"let widget of container.widgets; let x = index\" class=\"list-group-item\"\r\n                    dnd-sortable [sortableIndex]=\"x\" [dragEnabled]=\"!dragOperation\"\r\n                    [dragData]=\"widget\">{{widget.name}}--x{{x}}--i{{i}}</li>\r\n              </ul>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      {{group|json}}\r\n      <div dnd-sortable-container [sortableData]=\"group\" [dropZones]=\"['container-dropZone']\">\r\n        <div class=\"col-sm-12\"\r\n             *ngFor=\"let container of group; let i = index\"\r\n             dnd-sortable [sortableIndex]=\"i\" [dragEnabled]=\"dragOperation\">\r\n\r\n          <div class=\"panel panel-warning\"\r\n               dnd-sortable-container [sortableData]=\"container.controls\" [dropZones]=\"['widget-dropZone']\">\r\n\r\n            <div class=\"panel-heading\">\r\n              {{container.id}}\r\n            </div>\r\n            <div class=\"panel-body\">\r\n              {{container.controls|json}}\r\n              <ul class=\"list-group\">\r\n                <li *ngFor=\"let widget of container.controls; let x = index\" class=\"list-group-item\"\r\n                    dnd-sortable [sortableIndex]=\"x\" [dragEnabled]=\"!dragOperation\"\r\n                    [dragData]=\"widget\">{{widget.name}}</li>\r\n              </ul>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>-->\r\n  <app-propertiespopup #properties (customFieldLayOut)=\"customFieldLayOut()\"></app-propertiespopup>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/formmaster/formmaster.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/formmaster/formmaster.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-9 mt-3\">\r\n          <span class=\"dash\">Manage Form Master</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/formmaster\">Manage Form Master</a></li>\r\n            <li class=\"breadcrumb-item active\">{{pageTitle}}</li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col-md-3 mt-4 text-right\">\r\n          <button class=\"w-auto sw-100 btn btn-dark\" routerLink=\"/formmaster\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 mt-4\" [ngClass]=\"{'disabled':loading}\">\r\n              <form [formGroup]=\"masterForm\" autocomplete=\"off\">\r\n                <div class=\"master-box\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Form Name:<span class=\"text-danger\">*</span></label>\r\n                      <input type=\"text\" class=\"form-control\" placeholder=\"Please enter form name\" [attr.disabled]=\"isDisabled\"\r\n                             formControlName=\"name\"\r\n                             [ngClass]=\"{'is-invalid': (name.invalid && (name.dirty || name.touched) && (name.errors?.required || name.errors?.maxlength)) }\">\r\n                      <small *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors?.required\"\r\n                             class=\"text-danger\">Name is required</small>\r\n                      <small *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors?.maxlength\"\r\n                             class=\"text-danger\">Name must be less than 50 characters.</small>\r\n                    </div>\r\n\r\n                    <div *ngIf=\"!id\" class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Description:</label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Please enter description\" [attr.disabled]=\"isDisabled\"\r\n                               formControlName=\"description\">\r\n\r\n\r\n                      </div>\r\n                    </div>\r\n                    \r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Select Loan Product:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select [items]=\"lstproductType\" id=\"{{'loanproduct' }}\" [closeOnSelect]=\"true\" placeholder=\"Select Loan Product\"\r\n                                   formControlName=\"loanproductids\" multiple=\"true\" bindLabel=\"text\" bindValue=\"value\">\r\n\r\n                        </ng-select>\r\n                        \r\n                      </div>\r\n                    </div>\r\n\r\n\r\n\r\n\r\n                  </div>\r\n\r\n                </div>\r\n              </form>\r\n              <div class=\"col-12 p-0\">\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-primary form-btns\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger form-btns\" routerLink=\"/formmaster\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/formmaster/formmasterlist.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/formmaster/formmasterlist.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Manage Form Master</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Manage Form Master</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 bg-light py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\" style=\"display:none\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <ng-select #clearDrop [items]=\"productdata\" placeholder=\"Select Product\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"SetProductValue($event.value)\"\r\n                                   (clear)=\"restMasterddl()\">\r\n                        </ng-select>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By name\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-6 col-xl-2 mr-auto\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-6 col-xl-2 text-md-right float-right\"><a routerLink=\"/formmaster/add\" class=\"btn btn-orange form-btns \"><i class=\"fa fa-plus\"></i> Add Master</a></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 mt-4\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                    [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Name\" [sortable]=\"true\" prop=\"name\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.name}}\">\r\n                          <a [routerLink]=\"['/formmaster/edit',row.form_master_id]\">{{row.name| truncate}}</a>&nbsp;\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Description\" sortable=\"true\" prop=\"description\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.description}}\">\r\n                          {{row.description | truncate : 11}}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Product\" sortable=\"true\" prop=\"loanproducts\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.code}}\">\r\n                          {{row.loanproducts | truncate : 15}}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"icon-text-center\">\r\n                          <a [routerLink]=\"['/formmaster/edit',row.form_master_id]\"><i title=\"Click to edit.\" class=\"fa fa-pencil\"></i></a>\r\n                          &nbsp;&nbsp;&nbsp;\r\n                          <a [routerLink]=\"['/formmaster/editform',row.form_master_id]\"><i title=\"Click to edit form.\" class=\"fa fa-wpforms \"></i></a>\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/formmaster/formbuilder.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/views/formmaster/formbuilder.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".list-group.custom-field-layout {\n  width: 100%;\n  float: left;\n  display: block;\n  padding: 10px !important;\n  background: #fff;\n  border: 1px solid #cdd4da; }\n\n.custom-field-layout li {\n  width: 98%;\n  margin: 1%;\n  display: inline-block;\n  cursor: all-scroll;\n  border-radius: 0px !important;\n  background: #f9f9f9;\n  border: 1px solid #e5e9ec; }\n\n.custom-field-layout li a {\n  color: #777777;\n  font-size: 16px;\n  font-weight: 500;\n  cursor: all-scroll; }\n\n.draged-item {\n  background: #f1f1f1;\n  padding: 10px;\n  margin-bottom: 10px; }\n\n.drop[_ngcontent-c1] {\n  border: 1px solid #ccc;\n  /*padding: 10px;*/\n  padding: 0px;\n  margin-top: 0; }\n\n.side_panel-heading {\n  background: #2f4050;\n  color: #fff;\n  padding: 10px;\n  margin: 0px !important;\n  font-weight: 500;\n  font-size: 150% !important; }\n\n.drop_right_heading {\n  background: #f9f9f9;\n  border-bottom: 1px solid #cdd4da;\n  padding: 0.5rem 0px; }\n\n.custom_feild_box {\n  padding: 15px 0px; }\n\n.drop_right_heading .form-group {\n  margin: 0rem; }\n\n/*\r\n\r\n    .custom-field-layout-left-panel {background: #fff !important; border: 1px solid red;}\r\n.custom-field-layout-left-panel li { width: 100% !important; border: 1px solid red; border-radius:0px !important;}\r\n\r\n\r\n    (4:30:03 PM) Ajay Aneja - DES: background: f9f9f9\r\n(4:30:14 PM) Ajay Aneja - DES: border e5e9ec\r\n(4:30:23 PM) Ajay Aneja - DES: headign bg \r\n(4:30:24 PM) Ajay Aneja - DES: 2f4050\r\n(4:30:55 PM) Ajay Aneja - DES: outer bg- cdd4da\r\n\r\n\r\n*/\n\n.container-new {\n  background-color: forestgreen;\n  height: 50px;\n  width: 50px;\n  display: block;\n  float: left;\n  margin-left: 30px;\n  margin-top: 30px;\n  padding: 10%;\n  visibility: visible;\n  color: red; }\n\n.projectcontainer {\n  background-color: lightsteelblue;\n  display: block;\n  height: 500px;\n  width: 600px;\n  margin-top: 5%;\n  visibility: visible; }\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvZm9ybW1hc3Rlci9EOlxcUHJpbmNlIFNpbmdoXFx3b3Jrc3BhY2VcXFNvbGdlbk9uZVxcTGFob3JlMVxcU29sZ2VuXFxzb2xnZW4ucG9ydGFsXFxDbGllbnRBcHAvc3JjXFxhcHBcXHZpZXdzXFxmb3JtbWFzdGVyXFxmb3JtYnVpbGRlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvdmlld3MvZm9ybW1hc3Rlci9mb3JtYnVpbGRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7RUFDWCxXQUFXO0VBQ1gsY0FBYztFQUNkLHdCQUF3QjtFQUN4QixnQkFBZ0I7RUFDaEIseUJBQXlCLEVBQUE7O0FBRzNCO0VBQ0UsVUFBVTtFQUNWLFVBQVU7RUFDVixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLDZCQUE2QjtFQUM3QixtQkFBbUI7RUFDbkIseUJBQXlCLEVBQUE7O0FBRzNCO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0UsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixtQkFBbUIsRUFBQTs7QUFHckI7RUFDRSxzQkFBc0I7RUFDdEIsaUJBQUE7RUFDQSxZQUFZO0VBQ1osYUFBYSxFQUFBOztBQUdmO0VBQ0UsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGdCQUFnQjtFQUNoQiwwQkFBMEIsRUFBQTs7QUFHNUI7RUFDRSxtQkFBbUI7RUFDbkIsZ0NBQWdDO0VBQ2hDLG1CQUFtQixFQUFBOztBQUdyQjtFQUNFLGlCQUFpQixFQUFBOztBQUduQjtFQUNFLFlBQVksRUFBQTs7QUFFZDs7Ozs7Ozs7Ozs7OztDQ0tDOztBRFNEO0VBQ0UsNkJBQTZCO0VBQzdCLFlBQVk7RUFDWixXQUFXO0VBQ1gsY0FBYztFQUNkLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsVUFBVSxFQUFBOztBQUdaO0VBQ0UsZ0NBQWdDO0VBQ2hDLGNBQWM7RUFDZCxhQUFhO0VBQ2IsWUFBWTtFQUNaLGNBQWM7RUFDZCxtQkFBbUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Zvcm1tYXN0ZXIvZm9ybWJ1aWxkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGlzdC1ncm91cC5jdXN0b20tZmllbGQtbGF5b3V0IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBmbG9hdDogbGVmdDtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBwYWRkaW5nOiAxMHB4ICFpbXBvcnRhbnQ7XHJcbiAgYmFja2dyb3VuZDogI2ZmZjtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2RkNGRhO1xyXG59XHJcblxyXG4uY3VzdG9tLWZpZWxkLWxheW91dCBsaSB7XHJcbiAgd2lkdGg6IDk4JTtcclxuICBtYXJnaW46IDElO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBjdXJzb3I6IGFsbC1zY3JvbGw7XHJcbiAgYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XHJcbiAgYmFja2dyb3VuZDogI2Y5ZjlmOTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZTVlOWVjO1xyXG59XHJcblxyXG4uY3VzdG9tLWZpZWxkLWxheW91dCBsaSBhIHtcclxuICBjb2xvcjogIzc3Nzc3NztcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjdXJzb3I6IGFsbC1zY3JvbGw7XHJcbn1cclxuXHJcbi5kcmFnZWQtaXRlbSB7XHJcbiAgYmFja2dyb3VuZDogI2YxZjFmMTtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5kcm9wW19uZ2NvbnRlbnQtYzFdIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIC8qcGFkZGluZzogMTBweDsqL1xyXG4gIHBhZGRpbmc6IDBweDtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG59XHJcblxyXG4uc2lkZV9wYW5lbC1oZWFkaW5nIHtcclxuICBiYWNrZ3JvdW5kOiAjMmY0MDUwO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgbWFyZ2luOiAwcHggIWltcG9ydGFudDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGZvbnQtc2l6ZTogMTUwJSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZHJvcF9yaWdodF9oZWFkaW5nIHtcclxuICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2RkNGRhO1xyXG4gIHBhZGRpbmc6IDAuNXJlbSAwcHg7XHJcbn1cclxuXHJcbi5jdXN0b21fZmVpbGRfYm94IHtcclxuICBwYWRkaW5nOiAxNXB4IDBweDtcclxufVxyXG5cclxuLmRyb3BfcmlnaHRfaGVhZGluZyAuZm9ybS1ncm91cCB7XHJcbiAgbWFyZ2luOiAwcmVtO1xyXG59XHJcbi8qXHJcblxyXG4gICAgLmN1c3RvbS1maWVsZC1sYXlvdXQtbGVmdC1wYW5lbCB7YmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50OyBib3JkZXI6IDFweCBzb2xpZCByZWQ7fVxyXG4uY3VzdG9tLWZpZWxkLWxheW91dC1sZWZ0LXBhbmVsIGxpIHsgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgYm9yZGVyOiAxcHggc29saWQgcmVkOyBib3JkZXItcmFkaXVzOjBweCAhaW1wb3J0YW50O31cclxuXHJcblxyXG4gICAgKDQ6MzA6MDMgUE0pIEFqYXkgQW5lamEgLSBERVM6IGJhY2tncm91bmQ6IGY5ZjlmOVxyXG4oNDozMDoxNCBQTSkgQWpheSBBbmVqYSAtIERFUzogYm9yZGVyIGU1ZTllY1xyXG4oNDozMDoyMyBQTSkgQWpheSBBbmVqYSAtIERFUzogaGVhZGlnbiBiZyBcclxuKDQ6MzA6MjQgUE0pIEFqYXkgQW5lamEgLSBERVM6IDJmNDA1MFxyXG4oNDozMDo1NSBQTSkgQWpheSBBbmVqYSAtIERFUzogb3V0ZXIgYmctIGNkZDRkYVxyXG5cclxuXHJcbiovXHJcbi5jb250YWluZXItbmV3IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBmb3Jlc3RncmVlbjtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgd2lkdGg6IDUwcHg7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDMwcHg7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxuICBwYWRkaW5nOiAxMCU7XHJcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcclxuICBjb2xvcjogcmVkO1xyXG59XHJcblxyXG4ucHJvamVjdGNvbnRhaW5lciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRzdGVlbGJsdWU7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgaGVpZ2h0OiA1MDBweDtcclxuICB3aWR0aDogNjAwcHg7XHJcbiAgbWFyZ2luLXRvcDogNSU7XHJcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcclxufVxyXG4iLCIubGlzdC1ncm91cC5jdXN0b20tZmllbGQtbGF5b3V0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGZsb2F0OiBsZWZ0O1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMTBweCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2RkNGRhOyB9XG5cbi5jdXN0b20tZmllbGQtbGF5b3V0IGxpIHtcbiAgd2lkdGg6IDk4JTtcbiAgbWFyZ2luOiAxJTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBjdXJzb3I6IGFsbC1zY3JvbGw7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTVlOWVjOyB9XG5cbi5jdXN0b20tZmllbGQtbGF5b3V0IGxpIGEge1xuICBjb2xvcjogIzc3Nzc3NztcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBjdXJzb3I6IGFsbC1zY3JvbGw7IH1cblxuLmRyYWdlZC1pdGVtIHtcbiAgYmFja2dyb3VuZDogI2YxZjFmMTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDsgfVxuXG4uZHJvcFtfbmdjb250ZW50LWMxXSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIC8qcGFkZGluZzogMTBweDsqL1xuICBwYWRkaW5nOiAwcHg7XG4gIG1hcmdpbi10b3A6IDA7IH1cblxuLnNpZGVfcGFuZWwtaGVhZGluZyB7XG4gIGJhY2tncm91bmQ6ICMyZjQwNTA7XG4gIGNvbG9yOiAjZmZmO1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDE1MCUgIWltcG9ydGFudDsgfVxuXG4uZHJvcF9yaWdodF9oZWFkaW5nIHtcbiAgYmFja2dyb3VuZDogI2Y5ZjlmOTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZGQ0ZGE7XG4gIHBhZGRpbmc6IDAuNXJlbSAwcHg7IH1cblxuLmN1c3RvbV9mZWlsZF9ib3gge1xuICBwYWRkaW5nOiAxNXB4IDBweDsgfVxuXG4uZHJvcF9yaWdodF9oZWFkaW5nIC5mb3JtLWdyb3VwIHtcbiAgbWFyZ2luOiAwcmVtOyB9XG5cbi8qXHJcblxyXG4gICAgLmN1c3RvbS1maWVsZC1sYXlvdXQtbGVmdC1wYW5lbCB7YmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50OyBib3JkZXI6IDFweCBzb2xpZCByZWQ7fVxyXG4uY3VzdG9tLWZpZWxkLWxheW91dC1sZWZ0LXBhbmVsIGxpIHsgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgYm9yZGVyOiAxcHggc29saWQgcmVkOyBib3JkZXItcmFkaXVzOjBweCAhaW1wb3J0YW50O31cclxuXHJcblxyXG4gICAgKDQ6MzA6MDMgUE0pIEFqYXkgQW5lamEgLSBERVM6IGJhY2tncm91bmQ6IGY5ZjlmOVxyXG4oNDozMDoxNCBQTSkgQWpheSBBbmVqYSAtIERFUzogYm9yZGVyIGU1ZTllY1xyXG4oNDozMDoyMyBQTSkgQWpheSBBbmVqYSAtIERFUzogaGVhZGlnbiBiZyBcclxuKDQ6MzA6MjQgUE0pIEFqYXkgQW5lamEgLSBERVM6IDJmNDA1MFxyXG4oNDozMDo1NSBQTSkgQWpheSBBbmVqYSAtIERFUzogb3V0ZXIgYmctIGNkZDRkYVxyXG5cclxuXHJcbiovXG4uY29udGFpbmVyLW5ldyB7XG4gIGJhY2tncm91bmQtY29sb3I6IGZvcmVzdGdyZWVuO1xuICBoZWlnaHQ6IDUwcHg7XG4gIHdpZHRoOiA1MHB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgZmxvYXQ6IGxlZnQ7XG4gIG1hcmdpbi1sZWZ0OiAzMHB4O1xuICBtYXJnaW4tdG9wOiAzMHB4O1xuICBwYWRkaW5nOiAxMCU7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIGNvbG9yOiByZWQ7IH1cblxuLnByb2plY3Rjb250YWluZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodHN0ZWVsYmx1ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogNTAwcHg7XG4gIHdpZHRoOiA2MDBweDtcbiAgbWFyZ2luLXRvcDogNSU7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7IH1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/views/formmaster/formbuilder.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/formmaster/formbuilder.component.ts ***!
  \***********************************************************/
/*! exports provided: FormbuilderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormbuilderComponent", function() { return FormbuilderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _formmaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./formmaster.service */ "./src/app/views/formmaster/formmaster.service.ts");
/* harmony import */ var _managelayout_layout_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../managelayout/layout.service */ "./src/app/views/managelayout/layout.service.ts");
/* harmony import */ var _managelayout_viewpopupwindow_propertiespopup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../managelayout/viewpopupwindow/propertiespopup.component */ "./src/app/views/managelayout/viewpopupwindow/propertiespopup.component.ts");
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









var FormbuilderComponent = /** @class */ (function () {
    function FormbuilderComponent(fb, formmasterService, router, dialogService, toaster, route, commonService) {
        this.fb = fb;
        this.formmasterService = formmasterService;
        this.router = router;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.name = 'Angular';
        this.colors = [];
        this.droped = [];
        this.newgroup = [];
        this.dragedColor = null;
        this.condition = false;
        this.condionNewGroup = false;
        this.layoutPageType = 'double';
        this.form_field_visibility = 'No';
        this.DemoShow = false;
        this.layoutPageTypeNewGrp = 'double';
        this.dynamicLayoutNewSection = [];
        this.displayProperties = false;
        this.moduleName = 'user';
        this.submoduleName = 'department';
        this.hideme = [];
        this.hideme1 = [];
        this.hidemeNewGrp = [];
        this.counterValue = 0;
        this.formid = "0";
        this.fieldArray = [];
        this.newAttribute = {};
        this.dragOperation = false;
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
        this.filedLists = [{
                name: "Single Line", dt_code: "text", class_name: "fa fa fa-ellipsis-h", display_order: 1, actual_data_type: "string", id: 1,
                required: false
            },
            { name: "Multi Line", group_name: "", dt_code: "textarea", class_name: "fa fa-navicon", display_order: 2, data_type_name: "string", id: 2, required: false, length: 0, index: "", picklist_options: "" },
            { name: "Select List", group_name: "", dt_code: "select", class_name: "fa fa-list", display_order: 3, data_type_name: "select", id: 3, required: false, length: 0, index: "", picklist_options: "" },
            { name: "Integer", group_name: "", dt_code: "int", class_name: "fa fa-sort-numeric-asc", display_order: 4, data_type_name: "int", id: 4, required: false, length: 0, index: "", picklist_options: "" },
            { name: "Long Integer", group_name: "", dt_code: "bigint", class_name: "fa  fa-list-ol", display_order: 5, data_type_name: "bigint", id: 5, required: false, length: 0, index: "", picklist_options: "" },
            { name: "Decimal", group_name: "", dt_code: "decimal", class_name: "fa fa fa-circle", display_order: 6, data_type_name: "decimal", id: 6, required: false, length: 0, index: "", picklist_options: "" },
            { name: "Date", group_name: "", dt_code: "date", class_name: "fa fa-calendar-o", display_order: 7, data_type_name: "date", id: 7, required: false, length: 0, index: "" },
            { name: "Checkbox", group_name: "", dt_code: "checkbox", class_name: "fa fa-check-square-o", display_order: 8, data_type_name: "string", id: 8, required: false, length: 0, index: "", picklist_options: "" },
            { name: "Radio", group_name: "", dt_code: "radio", class_name: "fa fa-dot-circle-o", display_order: 9, data_type_name: "string", id: 9, required: false, length: 0, index: "", picklist_options: "" },
            { name: "Url", group_name: "", dt_code: "url", class_name: "fa fa-at", display_order: 10, data_type_name: "Url", id: 10, required: false, length: 0, index: "", picklist_options: "" },
            { name: "Boolean", group_name: "", dt_code: "boolean", class_name: "fa fa-at", display_order: 11, data_type_name: "bit", id: 10, required: false, length: 0, index: "", picklist_options: "" }];
    }
    FormbuilderComponent.prototype.dragfullgroup = function () {
        if (this.dragOperation == true) {
            this.dragOperation = false;
        }
        else {
            this.dragOperation = true;
        }
    };
    FormbuilderComponent.prototype.incrementcounter = function () {
        return this.counterValue++;
    };
    FormbuilderComponent.prototype.decrementcounter = function () {
        return this.counterValue--;
    };
    // Group by color as key to the person array
    FormbuilderComponent.prototype.fordragcontrol = function () {
        this.dragOperation = false;
    };
    FormbuilderComponent.prototype.fordragcontainer = function () {
        this.dragOperation = true;
    };
    FormbuilderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.manageLayout = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({
            DefaultfieldName: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](),
            fieldName: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](),
        });
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            var sid = params.get('sid');
            //     alert(id);
            //   alert(sid);
            _this.getcustomfielddata(id, sid);
            _this.formid = id;
        });
        this.colors = this.filedLists;
        this.InnerData = 'four';
    };
    FormbuilderComponent.prototype.getcustomfielddata = function (id, sid) {
        var _this = this;
        this.formmasterService.GetCustomFieldsList(id, this.companyId).subscribe(function (result) {
            if (result) {
                _this.customFiledsData = null;
                _this.droped = [];
                _this.controls = [];
                _this.group = [];
                _this.counterValue = 0;
                //this.form.setValue(null);
                _this.customFiledsData = _this.formmasterService.customFieldsList.data;
                _this.droped = _this.customFiledsData;
                // console.log("droped", this.droped);
                //this.groupControl1 = this.droped;
                _this.controls = _this.groupBy1(_this.droped, 'group_display_order');
                // console.log("this.controls", this.controls);
                //this.controls = this.droped;
                var mapped_1 = Object.keys(_this.controls).map(function (key) { return ({ type: key, value: _this.controls[key] }); });
                // console.log("mappedmapped", mapped);
                _this.controls.forEach(function (item, ind) {
                    //// console.log(item[index].group_display_name));
                    return _this.group.push(new _managelayout_layout_service__WEBPACK_IMPORTED_MODULE_7__["Group"](item[0].group_display_order, item[0].group_id, item[0].group_name, item[0].group_display_name, item[0].layout_type, item[0].table_name, item[0].is_inserted, item[0].is_updated, item[0].group_display_order, mapped_1[ind].value));
                });
                // this.controls.map(item => { item.system_is_required = true });
                _this.controls.forEach(function (item, ind1) { return _this.dynamicLayoutNewSection[ind1] = item[0].layout_type; });
                // this.dynamicLayoutNewSection[0] = 'double';
                _this.counterValue = _this.group[_this.group.length - 1].display_order;
                // this.group.push(new Group(this.controls[0].group_display_order, this.controls[0].group_id, this.controls[0].group_name, this.controls[0].group_display_name, 0, 1, this.controls[0].display_order, this.controls));
                // console.log("this.group.push", this.group);
            }
        });
    };
    FormbuilderComponent.prototype.changegroup = function (event, index) {
        this.group[index].group_name = event.target.value;
        this.group[index].group_display_name = event.target.value;
        if (index > 0) {
            this.group[index].group_layout_type = this.group[index - 1].group_layout_type;
            this.group[index].table_name = this.group[index - 1].table_name;
        }
        this.group.forEach(function (item, i) { return item.display_order = i; });
        // console.log('this.group', this.group);
    };
    FormbuilderComponent.prototype.addFieldValue = function () {
        this.fieldArray.push(this.newAttribute);
        this.newAttribute = {};
    };
    FormbuilderComponent.prototype.deleteFieldValue = function (index) {
        this.fieldArray.splice(index, 1);
    };
    FormbuilderComponent.prototype.S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    FormbuilderComponent.prototype.GemgarteIdWithUniwquie = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    FormbuilderComponent.prototype.dragEnd = function (e) {
    };
    FormbuilderComponent.prototype.dragStart = function (e, c) {
        // console.log("dragStart111111", c);
        this.uniqueid = this.S4();
        var temp = [];
        temp = JSON.parse(JSON.stringify(c));
        // console.log("temp", temp)
        this.dragedColor = temp;
    };
    FormbuilderComponent.prototype.drop = function (e) {
        if (this.dragedColor) {
            this.droped.push(this.dragedColor);
            this.dragedColor = null;
            // console.log("droped", this.droped);
        }
    };
    FormbuilderComponent.prototype.customFieldLayOut = function () {
        // console.log("Data", this.properties.singleLineNameDisplay.value);
        if (this.properties.singleLine == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.singleLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.singleLineMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.singleLineCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.singleLineNameDisplay.value;
        }
        else if (this.properties.multiLine == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.multiLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.multiLineMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.multiLineCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.multiLineNameDisplay.value;
        }
        else if (this.properties.SelectList == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.selectListLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.selectListCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.selectListMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.selectListMultiddl.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "select";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.selectListLineNameDisplay.value;
        }
        else if (this.properties.intShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.intNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.intCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.intMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "int";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "int";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 2;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.intNameDisplay.value;
        }
        else if (this.properties.bigInt == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.bigintNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.bigintCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.bigintMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "bigint";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "bigint";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 3;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.bigintNameDisplay.value;
        }
        else if (this.properties.decimalShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.decimalNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.decimalCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.decimalMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "decimal";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 4;
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "decimal";
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.decimalNameDisplay.value;
        }
        else if (this.properties.dateShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.dateNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.dateMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "date";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "date";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 5;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.dateNameDisplay.value;
        }
        else if (this.properties.booleanShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.booleanNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.booleanMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "bit";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "bit";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 16;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.booleanNameDisplay.value;
        }
        else if (this.properties.checkboxShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.checkboxNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.checkboxCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.checkboxMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.checkboxNameDisplay.value;
        }
        else if (this.properties.radioShow == true && this.groupCreated == 'DefaultGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.radioNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.radioCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.radioMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.radioNameDisplay.value;
        }
        else if (this.properties.urlShow == true && this.groupCreated == 'DefaultGroupCreated') {
            //this.droped[this.index].name = this.properties.urlNameDisplay.value;
            //this.droped[this.index].length = this.properties.urlCharactersAllowed.value;
            //this.droped[this.index].is_required = this.properties.urlMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.urlNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.urlCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.urlMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].form_field_visibility = this.properties.formfieldvisible.value;
            this.group[this.index].controls[this.newcontrolid].list_field_visibility = this.properties.listfieldvisible.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.urlNameDisplay.value;
        }
        //Dynamic group Created
        if (this.properties.singleLine == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.properties.singleLineNameDisplay.value;
            //this.newgroup[this.index].is_required = this.properties.singleLineMarkRequired.value;
            //this.newgroup[this.index].length = this.properties.singleLineCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.singleLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.singleLineMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.singleLineCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.singleLineNameDisplay.value;
        }
        else if (this.properties.multiLine == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.properties.multiLineNameDisplay.value;
            //this.newgroup[this.index].is_required = this.properties.multiLineMarkRequired.value;
            //this.newgroup[this.index].length = this.properties.multiLineCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.multiLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.multiLineMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.multiLineCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.multiLineNameDisplay.value;
        }
        else if (this.properties.SelectList == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.properties.selectListLineNameDisplay.value;
            //this.newgroup[this.index].length = this.properties.selectListCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.properties.selectListMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.selectListLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.selectListCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.selectListMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.selectListMultiddl.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "select";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].selectlistvalues = this.properties.selectlistvalue.value;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.selectListLineNameDisplay.value;
        }
        else if (this.properties.intShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.properties.intNameDisplay.value;
            //this.newgroup[this.index].length = this.properties.intCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.properties.intMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.intNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.intCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.intMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "int";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "int";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 2;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.intNameDisplay.value;
        }
        else if (this.properties.bigInt == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.properties.bigintNameDisplay.value;
            //this.newgroup[this.index].length = this.properties.bigintCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.properties.bigintMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.bigintNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.bigintCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.bigintMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "bigint";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "bigint";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 3;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.bigintNameDisplay.value;
        }
        else if (this.properties.decimalShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.properties.decimalNameDisplay.value;
            //this.newgroup[this.index].length = this.properties.decimalCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.properties.decimalMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.decimalNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.decimalCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.decimalMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "decimal";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "decimal";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 4;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.decimalNameDisplay.value;
        }
        else if (this.properties.booleanShow == true && this.groupCreated == 'NewGroupCreated') {
            this.group[this.index].controls[this.newcontrolid].name = this.properties.booleanNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.booleanMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "bit";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "bit";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 16;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.booleanNameDisplay.value;
        }
        else if (this.properties.dateShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.properties.dateNameDisplay.value;
            //this.newgroup[this.index].is_required = this.properties.dateMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.dateNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.dateMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "date";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "date";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 5;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.dateNameDisplay.value;
        }
        else if (this.properties.checkboxShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.properties.checkboxNameDisplay.value;
            //this.newgroup[this.index].length = this.properties.checkboxCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.properties.checkboxMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.checkboxCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.checkboxNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.checkboxMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.checkboxNameDisplay.value;
        }
        else if (this.properties.radioShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.properties.radioNameDisplay.value;
            //this.newgroup[this.index].length = this.properties.radioCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.properties.radioMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.radioNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].picklist_options = this.properties.radioCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.radioMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "nvarchar";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.radioNameDisplay.value;
        }
        else if (this.properties.urlShow == true && this.groupCreated == 'NewGroupCreated') {
            //this.newgroup[this.index].name = this.properties.urlNameDisplay.value;
            //this.newgroup[this.index].length = this.properties.urlCharactersAllowed.value;
            //this.newgroup[this.index].is_required = this.properties.urlMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.urlNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].length = this.properties.urlCharactersAllowed.value;
            this.group[this.index].controls[this.newcontrolid].is_required = this.properties.urlMarkRequired.value;
            this.group[this.index].controls[this.newcontrolid].sql_type = "Url";
            this.group[this.index].controls[this.newcontrolid].actual_data_type = "nvarchar(max)";
            this.group[this.index].controls[this.newcontrolid].data_type_id = 1;
            this.group[this.index].controls[this.newcontrolid].display_name = this.properties.urlNameDisplay.value;
        }
        if (this.properties.formfieldvisible.value) {
            this.group[this.index].controls[this.newcontrolid].form_field_visibility = "YES";
        }
        else {
            this.group[this.index].controls[this.newcontrolid].form_field_visibility = "NO";
        }
        if (this.properties.listfieldvisible.value) {
            this.group[this.index].controls[this.newcontrolid].list_field_visibility = "YES";
        }
        else {
            this.group[this.index].controls[this.newcontrolid].list_field_visibility = "NO";
        }
        this.group[this.index].controls[this.newcontrolid].is_readOnly = this.properties.is_readOnly.value.toString();
        // this.group[this.index].controls[this.newcontrolid].list_field_visibility = this.properties.listfieldvisible.value;
        //this.colors = this.filedLists;
        //// console.log("colors", this.colors);
        //// console.log("droped", this.droped);
        //// console.log("filedLists", this.filedLists);
    };
    FormbuilderComponent.prototype.allowDropFunction = function (c) {
        // console.log('3434', c);
    };
    FormbuilderComponent.prototype.dragStartGroupToGroup = function (e, c) {
        this.dragedColor = c;
        //this.dragedColor
        var index = this.droped.indexOf(c);
        if (index !== -1) {
            this.droped.splice(index, 1);
        }
        //this.droped.push(this.droped);
        this.dropNewGrop('', 0);
    };
    FormbuilderComponent.prototype.dragEndGroupToGroup = function (e) {
    };
    FormbuilderComponent.prototype.dragEndGroupToGroupReverse = function () {
    };
    FormbuilderComponent.prototype.dragStartGroupToGroupReverse = function (e, c) {
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
    FormbuilderComponent.prototype.dropNewGrop = function (lst, a) {
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
    FormbuilderComponent.prototype.toggleClass = function (event, classs) {
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
    FormbuilderComponent.prototype.toggleClassRadioButton = function (event, classs) {
        // console.log('event', event);
        // console.log('classs', classs);
        this.condition = false;
        this.layoutPageType = classs;
    };
    FormbuilderComponent.prototype.toggleClassNewGrp = function (event, classs, index) {
        if (this.condionNewGroup == false) {
            //this.layoutPageTypeNewGrp = classs;
            this.condionNewGroup = true;
            var newgrpdisplay = this.GemgarteIdWithUniwquie();
            this.newGrpDisplaydropDown = newgrpdisplay;
        }
        else {
            //this.layoutPageTypeNewGrp = classs;
            this.condionNewGroup = false;
        }
    };
    FormbuilderComponent.prototype.toggleClassRadioButtonNew = function (event, index, classs) {
        // console.log(event);
        // console.log(classs);
        // console.log('IndexNumber', index);
        this.condionNewGroup = false;
        this.hidemeNewGrp[index] = false;
        this.dynamicLayoutNewSection[index] = classs;
        this.layoutPageTypeNewGrp = classs;
        this.group[index].group_layout_type = classs.replace('Columns', '');
        this.group[index].controls.forEach(function (items) { return items.layout_type = classs.replace('Columns', ''); });
        // console.log("this.groupclas", this.group);
    };
    FormbuilderComponent.prototype.NewGrop = function (NewGroup) {
        if (NewGroup == 'NewGroup') {
            this.DemoShow = true;
            this.dynamicLayoutNewSection[0] = 'double';
            this.newGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
            this.fieldArray.push(this.newAttribute);
            this.group.push(new _managelayout_layout_service__WEBPACK_IMPORTED_MODULE_7__["Group"](this.group.length, 0, "", "", "", "", 1, 0, 0, []));
            for (var _i = 0, _a = this.fieldArray; _i < _a.length; _i++) {
                var data = _a[_i];
                this.dynamicLayoutNewSection[1] = 'double';
                this.dynamicLayoutNewSection[2] = 'double';
                this.dynamicLayoutNewSection[3] = 'double';
                this.dynamicLayoutNewSection[4] = 'double';
            }
            this.newAttribute = {};
        }
    };
    FormbuilderComponent.prototype.DisplayProperties = function (event, order, index) {
        // console.log("ShowLL", event);
        if (this.displayProperties == false) {
            //this.displayProperties = true;
            document.getElementById("#1").setAttribute("class", "show");
        }
        else {
            //  this.displayProperties = false;
            document.getElementById("#1").setAttribute("display", "hide");
        }
    };
    FormbuilderComponent.prototype.EditCustomFields = function (groupid, id, lst, index, groupCreated) {
        this.index = groupid;
        this.newcontrolid = index;
        if (groupCreated == 'NewGroupCreated') {
            this.hideme[groupid + '' + index] = false;
        }
        else {
            this.hideme[groupid + '' + index] = false;
        }
        this.groupCreated = groupCreated;
        this.properties.show(lst, lst, index, groupCreated);
    };
    FormbuilderComponent.prototype.SystemDefinedPropertyRequired = function (groupid, id, lst, index, event, groupCreated) {
        if (lst.type == 'text') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.hideme[index] = false;
                this.properties.singleLineMarkRequired.setValue(event.target.checked);
                //this.newgroup[this.index].required = event.target.checked;
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.singleLineMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'textarea') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.properties.multiLineMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.multiLineMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'select') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.properties.selectListMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.selectListMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'int') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.properties.intMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.intMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'bigint') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.properties.bigintMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.bigintMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'decimal') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index + this.uniqueid] = false;
                this.properties.decimalMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.decimalMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'date') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.properties.dateMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.dateMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'boolean') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.properties.booleanMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.booleanMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'checkbox') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.properties.checkboxMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.checkboxMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else if (lst.type == 'radio') {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.properties.radioMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.radioMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
        else {
            if (groupCreated == 'NewGroupCreated') {
                this.hideme[index] = false;
                this.properties.urlMarkRequired.setValue(event.target.checked);
                this.group[groupid].controls[id].required = event.target.checked;
            }
            else {
                this.hideme[index + this.uniqueid] = false;
                this.properties.urlMarkRequired.setValue(event.target.checked);
                this.droped[this.index].required = event.target.checked;
            }
        }
    };
    FormbuilderComponent.prototype.AddLayoutForCustomField = function () {
        var _this = this;
        if (this.manageLayout.valid) {
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
            // console.log("newgroup", this.group);
            //this.controls.map(item => { item.system_is_required = true });
            // this.saveLayout.push(this.group);
            this.formmasterService.SaveLAyourData(this.group, this.formid).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success('Data saved successfully.');
                    //this.router.navigateByUrl("/user");
                    // this.getcustomfielddata(this.moduleid, this.submoduleid);
                }
                else {
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
            });
        }
    };
    FormbuilderComponent.prototype.Cancel = function () {
    };
    FormbuilderComponent.prototype.Removelayout = function (index) {
        var _this = this;
        var message = "Are you sure you want to delete this group?";
        this.dialogService.confirm('Delete group', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.condionNewGroup = false;
                _this.DemoShow = false;
                _this.fieldArray.splice(index, 1);
                _this.group.splice(index, 1);
                _this.decrementcounter();
                _this.newAttribute = {};
                //this.fieldArray[index] = [];
                // console.log("Array", this.fieldArray);
                // console.log("Atrt", this.newAttribute);
            }
            _this.condionNewGroup = false;
            _this.hidemeNewGrp[index] = false;
        });
    };
    FormbuilderComponent.prototype.RemoveCustomFields = function (groupid, id, cntrid) {
        var _this = this;
        var message = "Are you sure you want to delete this field?";
        this.dialogService.confirm('', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.hideme[cntrid] = false;
                _this.newgroup.splice(id, 1);
                //const targetIdx = this.group.find(item => item.id == id).id;
                _this.group[groupid].controls.splice(id, 1);
            }
            _this.hideme[cntrid] = false;
        });
    };
    FormbuilderComponent.prototype.RemoveCustomFieldSystemDefined = function (id, lst) {
        var _this = this;
        var message = "Are you sure you want to delete this field?";
        this.dialogService.confirm('', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.hideme[id + _this.uniqueid] = false;
                _this.droped.splice(id, 1);
            }
        });
    };
    FormbuilderComponent.prototype.onKey = function (event, index) {
        this.values += event.target.value + ' | ';
        this.newgroup[index].groupName = this.values;
        // console.log("keyUp", this.newgroup);
    };
    FormbuilderComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
        { type: _formmaster_service__WEBPACK_IMPORTED_MODULE_6__["FormmasterService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('properties', { static: false }),
        __metadata("design:type", _managelayout_viewpopupwindow_propertiespopup_component__WEBPACK_IMPORTED_MODULE_8__["PropertiespopupComponent"])
    ], FormbuilderComponent.prototype, "properties", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('parent', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])
    ], FormbuilderComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Display', { static: false }),
        __metadata("design:type", Object)
    ], FormbuilderComponent.prototype, "Display", void 0);
    FormbuilderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formbuilder',
            template: __importDefault(__webpack_require__(/*! raw-loader!./formbuilder.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/formmaster/formbuilder.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./formbuilder.component.scss */ "./src/app/views/formmaster/formbuilder.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"], _formmaster_service__WEBPACK_IMPORTED_MODULE_6__["FormmasterService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]])
    ], FormbuilderComponent);
    return FormbuilderComponent;
}());



/***/ }),

/***/ "./src/app/views/formmaster/formmaster-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/formmaster/formmaster-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: FormmasterRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormmasterRoutingModule", function() { return FormmasterRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _formmaster_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formmaster.component */ "./src/app/views/formmaster/formmaster.component.ts");
/* harmony import */ var _formmasterlist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formmasterlist.component */ "./src/app/views/formmaster/formmasterlist.component.ts");
/* harmony import */ var _formbuilder_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formbuilder.component */ "./src/app/views/formmaster/formbuilder.component.ts");
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
    { path: '', component: _formmasterlist_component__WEBPACK_IMPORTED_MODULE_3__["FormmasterlistComponent"] },
    { path: 'add', component: _formmaster_component__WEBPACK_IMPORTED_MODULE_2__["FormmasterComponent"] },
    { path: 'edit/:id', component: _formmaster_component__WEBPACK_IMPORTED_MODULE_2__["FormmasterComponent"] },
    { path: 'editform/:id', component: _formbuilder_component__WEBPACK_IMPORTED_MODULE_4__["FormbuilderComponent"] }
];
var FormmasterRoutingModule = /** @class */ (function () {
    function FormmasterRoutingModule() {
    }
    FormmasterRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], FormmasterRoutingModule);
    return FormmasterRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/formmaster/formmaster.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/formmaster/formmaster.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Zvcm1tYXN0ZXIvZm9ybW1hc3Rlci5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/formmaster/formmaster.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/formmaster/formmaster.component.ts ***!
  \**********************************************************/
/*! exports provided: FormmasterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormmasterComponent", function() { return FormmasterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _formmaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formmaster.service */ "./src/app/views/formmaster/formmaster.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
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







var FormmasterComponent = /** @class */ (function () {
    function FormmasterComponent(formmasterService, fb, commonService, router, dialogService, route, toaster) {
        var _this = this;
        this.formmasterService = formmasterService;
        this.fb = fb;
        this.commonService = commonService;
        this.router = router;
        this.dialogService = dialogService;
        this.route = route;
        this.toaster = toaster;
        this.loading = false;
        this.master = new _formmaster_service__WEBPACK_IMPORTED_MODULE_1__["tblformMasterModel"]();
        this.selectedTexts = [];
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    FormmasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.getproductDropDown();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loading = true;
                _this.fillForm(id);
            }
            else {
                _this.pageTitle = 'Add Form Master';
            }
        });
    };
    FormmasterComponent.prototype.displayMaster = function (master) {
        this.master = master;
        // console.log("this.master", this.master);
        this.pageTitle = 'Edit Form Master: ' + this.master.name;
        this.selectedTexts = [];
        //let arr = [];
        //arr = this.master.loanproductsids;
        this.selectedTexts = this.master.loanproductsids.split(',');
        // console.log("this.loanproductsids", this.selectedTexts);
        // console.log("utyr", this.selectedTexts)
        this.masterForm.patchValue({
            form_master_id: this.master.form_master_id,
            name: this.master.name,
            description: this.master.description,
            createdby: this.loginuserid,
            loanproductids: this.selectedTexts
        });
    };
    FormmasterComponent.prototype.fillForm = function (id) {
        var _this = this;
        this.formmasterService.getFormMasterById(id)
            .subscribe(function (master) {
            _this.displayMaster(master);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    FormmasterComponent.prototype.getproductDropDown = function () {
        var _this = this;
        this.formmasterService.getproductDropDown().subscribe(function (response) {
            _this.lstproductType = (response);
            // console.log("this.lstproductType", this.lstproductType);
        });
    };
    FormmasterComponent.prototype.save = function () {
        var _this = this;
        if (this.masterForm.valid) {
            this.loading = true;
            this.formmasterService.addOrUpdateFormData(this.masterForm.value).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.loading = false;
                    _this.toaster.success(result.responseMessage);
                    _this.router.navigate(["/formmaster"]);
                }
                else {
                    _this.loading = false;
                    _this.toaster.error(result.responseMessage);
                }
                // console.log('MasterForm', result);
            }, function (error) {
                _this.loading = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.masterForm);
        }
    };
    FormmasterComponent.prototype.initForm = function () {
        this.masterForm = this.fb.group({
            form_master_id: [null],
            loanproductids: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            description: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].nullValidator],
        });
    };
    Object.defineProperty(FormmasterComponent.prototype, "form_master_id", {
        get: function () { return this.masterForm.get('form_master_id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormmasterComponent.prototype, "name", {
        get: function () { return this.masterForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormmasterComponent.prototype, "description", {
        get: function () {
            return this.masterForm.get('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormmasterComponent.prototype, "loanproductids", {
        get: function () { return this.masterForm.get('loanproductids'); },
        enumerable: true,
        configurable: true
    });
    FormmasterComponent.ctorParameters = function () { return [
        { type: _formmaster_service__WEBPACK_IMPORTED_MODULE_1__["FormmasterService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    FormmasterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formmaster',
            template: __importDefault(__webpack_require__(/*! raw-loader!./formmaster.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/formmaster/formmaster.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./formmaster.component.scss */ "./src/app/views/formmaster/formmaster.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_formmaster_service__WEBPACK_IMPORTED_MODULE_1__["FormmasterService"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], FormmasterComponent);
    return FormmasterComponent;
}());



/***/ }),

/***/ "./src/app/views/formmaster/formmaster.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/views/formmaster/formmaster.module.ts ***!
  \*******************************************************/
/*! exports provided: FormmasterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormmasterModule", function() { return FormmasterModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _formmaster_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formmaster-routing.module */ "./src/app/views/formmaster/formmaster-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-password-toggle */ "./node_modules/ngx-password-toggle/ngx-password-toggle.umd.js");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_password_toggle__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _formmasterlist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./formmasterlist.component */ "./src/app/views/formmaster/formmasterlist.component.ts");
/* harmony import */ var _formmaster_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./formmaster.component */ "./src/app/views/formmaster/formmaster.component.ts");
/* harmony import */ var _formbuilder_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./formbuilder.component */ "./src/app/views/formmaster/formbuilder.component.ts");
/* harmony import */ var primeng_orderlist__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/orderlist */ "./node_modules/primeng/orderlist.js");
/* harmony import */ var primeng_orderlist__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_orderlist__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/components/dragdrop/dragdrop */ "./node_modules/primeng/components/dragdrop/dragdrop.js");
/* harmony import */ var primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/colorpicker */ "./node_modules/primeng/colorpicker.js");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(primeng_colorpicker__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};














var FormmasterModule = /** @class */ (function () {
    function FormmasterModule() {
    }
    FormmasterModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_formmasterlist_component__WEBPACK_IMPORTED_MODULE_7__["FormmasterlistComponent"], _formmaster_component__WEBPACK_IMPORTED_MODULE_8__["FormmasterComponent"], _formbuilder_component__WEBPACK_IMPORTED_MODULE_9__["FormbuilderComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_13__["ModalModule"], primeng_colorpicker__WEBPACK_IMPORTED_MODULE_12__["ColorPickerModule"], primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_11__["DragDropModule"], _formmaster_routing_module__WEBPACK_IMPORTED_MODULE_2__["FormmasterRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], primeng_orderlist__WEBPACK_IMPORTED_MODULE_10__["OrderListModule"], ngx_password_toggle__WEBPACK_IMPORTED_MODULE_6__["NgxPasswordToggleModule"]
            ]
        })
    ], FormmasterModule);
    return FormmasterModule;
}());



/***/ }),

/***/ "./src/app/views/formmaster/formmaster.service.ts":
/*!********************************************************!*\
  !*** ./src/app/views/formmaster/formmaster.service.ts ***!
  \********************************************************/
/*! exports provided: FormmasterService, tblformMasterModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormmasterService", function() { return FormmasterService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tblformMasterModel", function() { return tblformMasterModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
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




var FormmasterService = /** @class */ (function () {
    function FormmasterService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
        this.formmasterURI = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl + "FormMaster";
    }
    FormmasterService.prototype.getFormMasterById = function (id) {
        return this.http.get(this.formmasterURI + "/" + id);
    };
    FormmasterService.prototype.getFormsList = function () {
        return this.http.get(this.baseUri + "FormMaster/GetFormsList");
    };
    FormmasterService.prototype.getFormDetail = function () {
        return this.http.get(this.baseUri + "FormMaster/GetFormDetail");
    };
    FormmasterService.prototype.addOrUpdateFormData = function (FormdataModel) {
        // console.log('FormdataModel', FormdataModel);
        return this.http.post(this.baseUri + "FormMaster/AddUpdateFormMaster", FormdataModel);
    };
    FormmasterService.prototype.getproductDropDown = function () {
        return this.http.get(this.baseUri + "FormMaster/GetProductDropDown/");
    };
    FormmasterService.prototype.getformmasterList = function (name, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("FormMaster/GetFormsList?name=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    FormmasterService.prototype.GetCustomFieldsList = function (formid, companyId) {
        var _this = this;
        return this.http.get(this.baseUri + "FormMaster/GetLayoutCustomFieldByModuleNameAndSubModule?formid=" + formid + "&companyId=" + companyId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    FormmasterService.prototype.SaveLAyourData = function (layoutControlModel, formid) {
        var url = this.baseUri + "FormMaster/SaveLayoutControls?formid=" + formid;
        // console.log('urll', url);
        return this.http.post(url, layoutControlModel);
        // (`${this.baseUri}Lease/UpdateLeaseStatus?leaseStatus=${leaseStatus}&leaseId=${leaseId}&calledFrom=${calledFrom}`, leaseStatus, leaseId);
    };
    FormmasterService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    FormmasterService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], FormmasterService);
    return FormmasterService;
}());

var tblformMasterModel = /** @class */ (function () {
    function tblformMasterModel() {
        this.form_master_id = "";
        this.name = "";
        this.description = "";
        this.company_id = 0;
        this.createdby = "";
        this.loanproductsids = "";
    }
    return tblformMasterModel;
}());



/***/ }),

/***/ "./src/app/views/formmaster/formmasterlist.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/views/formmaster/formmasterlist.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Zvcm1tYXN0ZXIvZm9ybW1hc3Rlcmxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/formmaster/formmasterlist.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/formmaster/formmasterlist.component.ts ***!
  \**************************************************************/
/*! exports provided: FormmasterlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormmasterlistComponent", function() { return FormmasterlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _formmaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./formmaster.service */ "./src/app/views/formmaster/formmaster.service.ts");
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







var FormmasterlistComponent = /** @class */ (function () {
    function FormmasterlistComponent(formmasterService, commonService, router, dialogService, toaster) {
        var _this = this;
        this.formmasterService = formmasterService;
        this.commonService = commonService;
        this.router = router;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.id = "";
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'masterCreatedon';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    FormmasterlistComponent.prototype.getproductDropDown = function () {
        var _this = this;
        this.formmasterService.getproductDropDown().subscribe(function (response) {
            _this.productdata = response;
        });
    };
    FormmasterlistComponent.prototype.SetProductValue = function (masternameId) {
        this.productid = masternameId;
    };
    FormmasterlistComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.search();
        this.refresh();
    };
    FormmasterlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    FormmasterlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    FormmasterlistComponent.prototype.restMasterddl = function () {
    };
    FormmasterlistComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.formmasterService.getformmasterList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.formmasterService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    FormmasterlistComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.formmasterService.getformmasterList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.formmasterService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    FormmasterlistComponent.prototype.reset = function () {
        var _this = this;
        this.table.sorts = [];
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'asc';
        this.productid = "undefined";
        this.sortColumn = 'name';
        this.pageSizeValue = 10;
        this.formmasterService.getformmasterList(this.listFilter, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.formmasterService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    FormmasterlistComponent.prototype.onSort = function (e) {
    };
    FormmasterlistComponent.prototype.setPage = function (e) {
    };
    FormmasterlistComponent.ctorParameters = function () { return [
        { type: _formmaster_service__WEBPACK_IMPORTED_MODULE_6__["FormmasterService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["DatatableComponent"])
    ], FormmasterlistComponent.prototype, "table", void 0);
    FormmasterlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formmasterlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./formmasterlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/formmaster/formmasterlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./formmasterlist.component.scss */ "./src/app/views/formmaster/formmasterlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_formmaster_service__WEBPACK_IMPORTED_MODULE_6__["FormmasterService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], FormmasterlistComponent);
    return FormmasterlistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-formmaster-formmaster-module.js.map