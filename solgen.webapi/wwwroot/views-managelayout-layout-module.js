(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-managelayout-layout-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managelayout/addeditlayout.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/managelayout/addeditlayout.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Add Custom Field</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/layoutlist\">Manage Custom Fields</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets \">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-content pb-5\">\r\n        <form [formGroup]=\"manageLayout\" autocomplete=\"off\">\r\n          <div class=\"row\" [ngClass]=\"{'disabled':loadSave}\">\r\n            <div class=\"col-md-3 col-lg-3 px-2\" id=\"FixedDiv\">\r\n              <h3 class=\"side_panel-heading\"> Select New Field</h3>\r\n              <div class=\"bordered-content\">\r\n                <ul class=\"types columnlist list-group custom-field-layout custom-field-layout-left-panel mb-3\">\r\n\r\n                  <li class=\"list-group-item selected\" id=\"1\" code=\"string\" maxlength=\"100\" *ngFor=\"let color of colors\"\r\n                      pDraggable=\"color\"\r\n                      (onDragStart)=\"dragStart($event,color)\" (onDragEnd)=\"dragEnd($event)\">\r\n                    <a href=\"javscript:;\">\r\n                      <i class=\"{{color.class_name}}\"></i>\r\n                      <span>\r\n                        {{color.name}}\r\n                      </span>\r\n                    </a>\r\n                  </li>\r\n                </ul>\r\n\r\n\r\n                <!--<div *ngFor=\"let color of colors\" class=\"border col-md-6 col-lg-6\" pDraggable=\"color\"\r\n                   (onDragStart)=\"dragStart($event,color)\" (onDragEnd)=\"dragEnd($event)\">\r\n                <i class=\"{{color.classname}}\"></i>&nbsp;{{color.name}}\r\n              </div>-->\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-9 col-lg-9 px-3\">\r\n              <div class=\"drop\" pDroppable=\"color\" (onDrop)=\"drop($event)\" style=\"display:none\">\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <div class=\"form-group d-flex justify-content-between\">\r\n                    <input type=\"text\" class=\"form-control w-50\" formControlName=\"fieldName\" maxlength=\"50\" placeholder=\"Enter group name\">\r\n                    <div class=\"dropdown form-group\">\r\n                      <a href=\"javascript:void(0);\" class=\"column-setting py-2 d-block\" (click)=\"toggleClass($event,'show')\"><i class=\"fa fa-cog text-dark\" style=\"font-size: 20px;\"></i></a>\r\n                      <div class=\"dropdown-menu\" [ngClass]=\"condition ? 'show' : 'hide'\" id=\"column-setting\">\r\n                        <!--<a class=\"dropdown-item\" href=\"javascrip:;\">double Columns</a>-->\r\n                        Select Layout\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <input type=\"radio\" class=\"custom-control-input\" id=\"customRadio1\" name=\"contactPreferredDocumentSignedBy\"\r\n                                 (click)=\"toggleClassRadioButton($event,'double')\" value=\"double\" checked>\r\n                          <label class=\"custom-control-label\" for=\"customRadio1\">double Columns</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <!--<a class=\"dropdown-item\" href=\"javascrip:;\">Triple Columns</a>-->\r\n                          <input type=\"radio\" class=\"custom-control-input\" id=\"tripleColumns\" name=\"contactPreferredDocumentSignedBy\"\r\n                                 (click)=\"toggleClassRadioButton($event,'triple')\" value=\"triple\">\r\n                          <label class=\"custom-control-label\" for=\"tripleColumns\">Triple Columns</label>\r\n                        </div>\r\n                        <div class=\"custom-control custom-radio\">\r\n                          <!--<a class=\"dropdown-item\" href=\"javascrip:;\">Four Columns</a>-->\r\n                          <input type=\"radio\" class=\"custom-control-input\" id=\"fourColumns\" (click)=\"toggleClassRadioButton($event,'four')\"\r\n                                 name=\"contactPreferredDocumentSignedBy\" value=\"four\">\r\n                          <label class=\"custom-control-label\" for=\"fourColumns\">Four Columns</label>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <p-orderList [value]=\"droped\" styleClass=\"two-column\" dragdrop=\"true\">\r\n\r\n                  <ng-template let-c pTemplate=\"item\">\r\n\r\n\r\n                    <div class=\"draged-item\" *ngIf=\"c.display_name; else elseblock\">\r\n                      <i class=\"{{c.class_name}}\"></i>&nbsp;{{c.display_name}}<i class=\"fa fa-ellipsis-h text-secondary float-right\"></i>\r\n                    </div>\r\n                    <ng-template #elseblock>\r\n                      <div [ngClass]=\"{'col-12': layoutPageType =='single', 'col-md-6': layoutPageType =='double', 'col-lg-4':layoutPageType =='triple', 'col-lg-3 col-xl-3': layoutPageType =='four' }\" id=\"newSection\">\r\n                        <div class=\"draged-item\" pDraggable=\"c\" style=\"background-color:antiquewhite\"\r\n                             (onDragStart)=\"dragStartGroupToGroup($event,c)\" (onDragEnd)=\"dragEndGroupToGroup($event)\" *ngIf=\"c.name; else elseblock\">\r\n                          <i class=\"{{c.class_name}}\"></i>\r\n                          {{c.name}} <a href=\"javscript:;\">\r\n                            <span>\r\n                              <span (click)=\"hideme[droped.indexOf(c)+uniqueid] =! hideme[droped.indexOf(c)+uniqueid]\"><i class=\"fa fa-ellipsis-h text-secondary float-right\"></i></span>\r\n                              <div class=\"dropdown-menu\" [ngClass]=\"{'hide' : hideme[droped.indexOf(c)+uniqueid] == false,'show' : hideme[droped.indexOf(c)+uniqueid] == true}\" id=\"column-setting+{{droped.indexOf(c)}}\">\r\n                                <div class=\"custom-control custom-checkbox\">\r\n                                  <input id=\"'chk_'+ {{c.dt_code}}+ '_' + {{c.id}}+ '_' + {{droped.indexOf(c)}}\" class=\"dynamic custom-control-input\" (click)=\"SystemDefinedPropertyRequired(c.id,c,droped.indexOf(c),$event)\" type=\"checkbox\">\r\n                                  <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"'chk_'+ {{c.dt_code}}+ '_' + {{c.id}}+ '_' + {{droped.indexOf(c)}}\">Mark As Required</label>\r\n                                </div>\r\n\r\n                                <div>\r\n                                  <a href=\"javascript:void(0);\" (click)=\"EditCustomFields(c.id,c,droped.indexOf(c))\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-pencil text-success\"></i> <span class=\"ml-1 text-secondary\" style=\"font-size: 14px;\">View Properties</span></a>\r\n                                </div>\r\n                                <div>\r\n                                  <a href=\"javascript:void(0);\" (click)=\"RemoveCustomFieldSystemDefined(droped.indexOf(c),c)\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-trash text-danger\"></i> <span class=\"ml-1 text-dark\" style=\"font-size: 14px;\">Remove Field</span></a>\r\n                                </div>\r\n\r\n                              </div>\r\n                            </span>\r\n                          </a>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </ng-template>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n                  </ng-template>\r\n\r\n                </p-orderList>\r\n              </div>\r\n              <style>\r\n                .customdieldbg {\r\n                  background-color: #effaff;\r\n                }\r\n              </style>\r\n              <!--<div class=\"col-md-8 col-lg-8\">\r\n\r\n              Drag Containers <input type=\"checkbox\" (click)=\"dragfullgroup()\" />\r\n            </div>-->\r\n              <div dnd-sortable-container [sortableData]=\"group\" [dropZones]=\"['container-dropZone']\">\r\n\r\n                <div id=\"container\" class=\" mb-3 border\" *ngFor=\"let field of group; let a = index\" dnd-sortable [sortableIndex]=\"a\" [dragEnabled]=\"dragOperation\">\r\n                  <div class=\"drop\" pDroppable=\"color\" (onDrop)=\"dropNewGrop($event,a)\" dnd-sortable-container [sortableData]=\"field.controls\" [dropZones]=\"['widget-dropZone']\">\r\n                    <div class=\"drop_right_heading\">\r\n                      <div class=\"col-md-12 col-lg-12\">\r\n                        <div class=\"form-group d-flex justify-content-between\" (mousedown)=\"fordragcontainer()\">\r\n                          <input type=\"text\" class=\"form-control w-50\" [value]=\"field.group_display_name\" (keydown)=\"changegroup($event,a)\" maxlength=\"50\" placeholder=\"Enter group name\">\r\n                          <div class=\"dropdown form-group\">\r\n                            <a href=\"javascript:void(0);\" class=\"column-setting py-2 d-block\"\r\n                               (click)=\"hidemeNewGrp[a] =! hidemeNewGrp[a]\"><i class=\"fa fa-cog text-dark\" style=\"font-size: 20px;\"></i></a>\r\n                            <div class=\"dropdown-menu selctlay\"\r\n                                 [ngClass]=\"{'hide' : hidemeNewGrp[a] == false,'show' : hidemeNewGrp[a] == true}\"\r\n                                 id=\"column-setting\">\r\n                              <span class=\"hedlay\">   Select Layout</span>\r\n                              <div class=\"custom-control custom-radio\">\r\n                                <a href=\"javascript:void(0)\" (click)=\"toggleClassRadioButtonNew($event,a,'double')\">\r\n                                  <input type=\"radio\" class=\"custom-control-input\" id=\"customRadioNewGrp{{a}}\" name=\"contactPreferredDocumentSignedBy{{a}}\"\r\n                                         value=\"double\" checked>\r\n                                  <label class=\"custom-control-label\" for=\"customRadioNewGrp{{a}}\">double Columns</label>\r\n                                </a>\r\n                              </div>\r\n                              <div class=\"custom-control custom-radio\">\r\n                                <a href=\"javascript:void(0)\" (click)=\"toggleClassRadioButtonNew($event,a,'triple')\">\r\n\r\n                                  <input type=\"radio\" class=\"custom-control-input\" id=\"tripleColumnsNewGrp{{a}}\" name=\"contactPreferredDocumentSignedBy{{a}}\"\r\n                                         value=\"triple\">\r\n                                  <label class=\"custom-control-label\" for=\"tripleColumnsNewGrp{{a}}\">Triple Columns</label>\r\n\r\n                                </a>\r\n                              </div>\r\n                              <div class=\"custom-control custom-radio\">\r\n                                <!--<a class=\"dropdown-item\" href=\"javascrip:;\">Four Columns</a>-->\r\n                                <a href=\"javascript:void(0)\" (click)=\"toggleClassRadioButtonNew($event,a,'four')\">\r\n                                  <input type=\"radio\" class=\"custom-control-input\" id=\"fourColumnsNewGrp{{a}}\"\r\n                                         name=\"contactPreferredDocumentSignedBy{{a}}\" value=\"four\">\r\n                                  <label class=\"custom-control-label\" for=\"fourColumnsNewGrp{{a}}\">Four Columns</label>\r\n                                </a>\r\n                              </div>\r\n                              <div>\r\n                                <a href=\"javascript:void(0);\" (click)=\"Removelayout(a)\" class=\"dropdown-item\" draggable=\"false\"><i class=\"fa fa-trash text-danger\" style=\"font-size: 20px;\"></i> <span class=\"ml-1 text-dark\" style=\"font-size: 14px;\">Remove Layout</span></a>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div> <div class=\"row custom_feild_box\">\r\n                      <ng-container *ngFor=\"let c of field.controls; let i=index\">\r\n                        <!--<div >-->\r\n\r\n                        <div [ngClass]=\"{'col-lg-4':true,'col-12': dynamicLayoutNewSection[a] =='single', 'col-md-6': dynamicLayoutNewSection[a] =='double', 'col-lg-4':dynamicLayoutNewSection[a] =='triple', 'col-lg-3 col-xl-3': dynamicLayoutNewSection[a] =='four' }\">\r\n                          <div class=\"draged-item\" dnd-sortable [sortableIndex]=\"i\" [dragEnabled]=\"!dragOperation\" (mousedown)=\"fordragcontrol()\"\r\n                               [dragData]=\"c\" [ngClass]=\"{'customdieldbg': c.is_system_generated ==false}\">\r\n\r\n                            <!--<i class=\"{{c.class_name}}\"></i>--><span class=\"form-control w-75 float-left\">{{c.is_system_generated ==false ? c.name : c.display_name}}</span>\r\n                            <span class=\"w-25 float-right\" style=\"padding-top:10px;\">\r\n                              <a href=\"javscript:;\">\r\n                                <span>\r\n\r\n                                  <!--<span (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa-ellipsis-h text-secondary float-right anchodeshowdrop\"></i></span>-->\r\n                                  <!-- start-->\r\n                                  <span *ngIf=\"c.dt_code =='text' || c.dt_code =='string' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa fa-ellipsis-h text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <span *ngIf=\"c.dt_code =='textarea' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa-navicon text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <span *ngIf=\"c.dt_code =='select' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa-list text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <span *ngIf=\"c.dt_code =='int' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa-sort-numeric-asc text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <span *ngIf=\"c.dt_code =='bigint' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa  fa-list-ol text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <span *ngIf=\"c.dt_code =='decimal' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa fa-circle text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <span *ngIf=\"c.dt_code =='date' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa-calendar-o text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <span *ngIf=\"c.dt_code =='checkbox' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa-check-square-o text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <span *ngIf=\"c.dt_code =='radio' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa-dot-circle-o text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <span *ngIf=\"c.dt_code =='url' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa-at text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <span *ngIf=\"c.dt_code =='boolean' \" (click)=\"hideme[a+''+i] =! hideme[a+''+i]\"><i class=\"fa fa-at text-secondary float-right anchodeshowdrop\"></i></span>\r\n                                  <!--end-->\r\n\r\n\r\n                                  <div class=\"dropdown-menu float-right hideshowdropdown quickkact\" [ngClass]=\"{'hide' : hideme[a+''+i] == false,'show' : hideme[a+''+i] == true}\" id=\"column-setting{{a}}{{i}}\">\r\n                                    <!--<div class=\"custom-control custom-checkbox\">\r\n      <input id=\"'chk_'+{{c.dt_code}}+'_'+ {{c.id}}+'_'+{{i}}\" class=\"dynamic custom-control-input\"\r\n             (click)=\"SystemDefinedPropertyRequired(c.id,c,i,$event,'NewGroupCreated')\" type=\"checkbox\">\r\n      <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\"\r\n             for=\"'chk_'+{{c.dt_code}}+'_'+{{c.id}}+'_'+{{i}}\">Mark As Required</label>\r\n    </div>-->\r\n                                    <!--<div class=\"custom-control custom-checkbox\">\r\n      <input id=\"'chk_'+ {{c.dt_code}}+ '_' + {{c.id}}+ '_' + {{i}}\" class=\"dynamic custom-control-input\"\r\n             (click)=\"SystemDefinedPropertyRequired(a,c.id,c,i,$event,'NewGroupCreated')\" type=\"checkbox\">\r\n      <label class=\"custom-control-label universal-custom-control-label pr-1 dynamic\" for=\"'chk_'+ {{c.dt_code}}+ '_' + {{c.id}}+ '_' + {{i}}\">Mark As Required</label>\r\n    </div>-->\r\n\r\n\r\n                                    <div>\r\n                                      <a href=\"javascript:void(0);\" (click)=\"EditCustomFields(a,c.id,c,i,'NewGroupCreated')\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-pencil text-success\"></i> <span class=\"ml-1 text-secondary\" style=\"font-size: 14px;\">View Properties</span></a>\r\n                                    </div>\r\n                                    <div *ngIf=\"!c.is_system_generated\">\r\n\r\n                                      <a href=\"javascript:void(0);\" (click)=\"RemoveCustomFields(a,i,a+''+i)\" class=\"dropdown-item px-2\" draggable=\"false\"><i class=\"fa fa-trash text-danger\"></i> <span class=\"ml-1 text-dark\" style=\"font-size: 14px;\">Remove Field</span></a>\r\n                                    </div>\r\n\r\n                                  </div>\r\n                                </span>\r\n                              </a>\r\n                            </span>\r\n                            <div class=\"clearfix\"></div>\r\n                          </div>\r\n                        </div>\r\n\r\n                        <!--</div>-->\r\n                      </ng-container>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-12 p-0\">\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger float-right\" (click)=\"Cancel()\"><i class=\"fa fa-times pr-1\"></i> Cancel</a>\r\n                <!--<a *ngIf='isAdd' href=\"javascript:void(0);\" class=\"btn btn-success mr-2 float-right\" (click)=\"AddLayoutForCustomField()\"><i class=\"fa fa-save pr-1\"></i> Submit</a>-->\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-success mr-2 float-right\" (click)=\"AddLayoutForCustomField()\"><i class=\"fa fa-save pr-1\"></i> Submit</a>\r\n                <a *ngIf='isUpdate' href=\"javascript:void(0);\" title=\"\" class=\"btn btn-primary formbtn widthhalf  mr-2 float-right\" (click)=\"NewGrop('NewGroup')\"\r\n                   tooltip=\"Create New Group\"><i class=\"fa fa-users pr-1\"></i>New Group</a>\r\n\r\n\r\n\r\n\r\n              </div>\r\n            </div>\r\n\r\n\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n  </div>\r\n\r\n  <!--<h4>Move items between multi list sortable containers</h4>\r\n  <div class=\"row\" >\r\n    <div class=\"col-sm-12\">\r\n\r\n      <div dnd-sortable-container [sortableData]=\"containers\" [dropZones]=\"['container-dropZone']\">\r\n        {{containers|json}}\r\n        <div class=\"col-sm-12\"\r\n             *ngFor=\"let container of containers; let i = index\"\r\n             dnd-sortable [sortableIndex]=\"i\" [dragEnabled]=\"dragOperation\">\r\n          <div class=\"panel panel-warning\"\r\n               dnd-sortable-container [sortableData]=\"container.widgets\" [dropZones]=\"['widget-dropZone']\">\r\n            <div class=\"panel-heading\">\r\n              {{container.id}} - {{container.name}}\r\n            </div>\r\n            <div class=\"panel-body\">\r\n              <ul class=\"list-group\">\r\n                {{container.widgets|json}}\r\n                <li *ngFor=\"let widget of container.widgets; let x = index\" class=\"list-group-item\"\r\n                    dnd-sortable [sortableIndex]=\"x\" [dragEnabled]=\"!dragOperation\"\r\n                    [dragData]=\"widget\">{{widget.name}}--x{{x}}--i{{i}}</li>\r\n              </ul>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      {{group|json}}\r\n      <div dnd-sortable-container [sortableData]=\"group\" [dropZones]=\"['container-dropZone']\">\r\n        <div class=\"col-sm-12\"\r\n             *ngFor=\"let container of group; let i = index\"\r\n             dnd-sortable [sortableIndex]=\"i\" [dragEnabled]=\"dragOperation\">\r\n\r\n          <div class=\"panel panel-warning\"\r\n               dnd-sortable-container [sortableData]=\"container.controls\" [dropZones]=\"['widget-dropZone']\">\r\n\r\n            <div class=\"panel-heading\">\r\n              {{container.id}}\r\n            </div>\r\n            <div class=\"panel-body\">\r\n              {{container.controls|json}}\r\n              <ul class=\"list-group\">\r\n                <li *ngFor=\"let widget of container.controls; let x = index\" class=\"list-group-item\"\r\n                    dnd-sortable [sortableIndex]=\"x\" [dragEnabled]=\"!dragOperation\"\r\n                    [dragData]=\"widget\">{{widget.name}}</li>\r\n              </ul>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>-->\r\n  <app-propertiespopup #propertiesPopup (customFieldLayOut)=\"customFieldLayOut()\"></app-propertiespopup>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managelayout/layoutlist.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/managelayout/layoutlist.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Custom Fields</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Custom Fields</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"row searchfield  mr-1 w-100\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <ng-select [items]=\"modulelist\"\r\n                           #Select\r\n                           placeholder=\"Select Module\" bindValue=\"value\"\r\n                           [(ngModel)]=\"selectedValue\"\r\n                           bindLabel=\"text\" (change)=\" selectmodule($event)\">\r\n                </ng-select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"pagedData.data\"\r\n                       [columnMode]=\"'force'\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)' \r\n                       (sort)=\"onSort($event)\">\r\n          <ngx-datatable-column name=\"Sub Module Name\" [sortable]=\"true\" prop=\"sub_module_name\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <a href=\"javascript:;\" *ngIf=\"isUpdate\" (click)=\"edit(row.module_name_code,row.ModuleCode)\" class=\"btn-edit\">{{row.sub_module_name}}</a>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"System Generated Fields\" prop=\"SystemGenerated\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"User Defined Fields \" prop=\"UserDefined\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Total Fields\" prop=\"TotalField\" [sortable]=\"true\">\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column [width]=\"80\" name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n                <!--<a *ngIf='modulePermission!==null && modulePermission.roleModuleReadFlag' (click)=\"edit(modulenamecode,row.ModuleCode)\" class=\"btn-edit\"><i title=\"Click to edit.\" class=\"fa fa-pencil text-success pr-2\"></i></a>-->\r\n                <a *ngIf=\"isUpdate\"  (click)=\"edit(row.module_name_code,row.ModuleCode)\" class=\"btn-edit\"><i title=\"Click to edit.\" class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"setPage($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                Showing {{(pagedData.pager.currentPage+1 - 1 )* pageSizeValue + 1}} to\r\n                {{(rowCount> ((pagedData.pager.currentPage+1)*pageSizeValue))?((pagedData.pager.currentPage+1)*pageSizeValue):(rowCount)}} out of {{rowCount}} enteries\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"pagedData.pager.currentPage+1\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/managelayout/addeditlayout.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/views/managelayout/addeditlayout.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".list-group.custom-field-layout {\n  width: 100%;\n  float: left;\n  display: block;\n  padding: 10px !important;\n  background: #fff;\n  border: 1px solid #cdd4da; }\n\n.custom-field-layout li {\n  width: 98%;\n  margin: 1%;\n  display: inline-block;\n  cursor: all-scroll;\n  border-radius: 0px !important;\n  background: #f9f9f9;\n  border: 1px solid #e5e9ec; }\n\n.custom-field-layout li a {\n  color: #777777;\n  font-size: 16px;\n  font-weight: 500;\n  cursor: all-scroll; }\n\n.draged-item {\n  background: #f1f1f1;\n  padding: 5px 10px;\n  margin-bottom: 10px;\n  border: 1px solid #dcdcdc; }\n\n.drop[_ngcontent-c1] {\n  border: 1px solid #ccc;\n  /*padding: 10px;*/\n  padding: 0px;\n  margin-top: 0; }\n\n.side_panel-heading {\n  background: #2f4050;\n  color: #fff;\n  padding: 10px;\n  margin: 0px !important;\n  font-weight: 500;\n  font-size: 150% !important; }\n\n.drop_right_heading {\n  background: #f9f9f9;\n  border-bottom: 1px solid #cdd4da;\n  padding: 0.5rem 0px; }\n\n.custom_feild_box {\n  padding: 15px; }\n\n.drop_right_heading .form-group {\n  margin: 0rem; }\n\n/*\r\n\r\n.custom-field-layout-left-panel {background: #fff !important; border: 1px solid red;}\r\n.custom-field-layout-left-panel li { width: 100% !important; border: 1px solid red; border-radius:0px !important;}\r\n\r\n\r\n(4:30:03 PM) Ajay Aneja - DES: background: f9f9f9\r\n(4:30:14 PM) Ajay Aneja - DES: border e5e9ec\r\n(4:30:23 PM) Ajay Aneja - DES: headign bg \r\n(4:30:24 PM) Ajay Aneja - DES: 2f4050\r\n(4:30:55 PM) Ajay Aneja - DES: outer bg- cdd4da\r\n\r\n\r\n*/\n\n.container-new {\n  background-color: forestgreen;\n  height: 50px;\n  width: 50px;\n  display: block;\n  float: left;\n  margin-left: 30px;\n  margin-top: 30px;\n  padding: 10%;\n  visibility: visible;\n  color: red; }\n\n.projectcontainer {\n  background-color: lightsteelblue;\n  display: block;\n  height: 500px;\n  width: 600px;\n  margin-top: 5%;\n  visibility: visible; }\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbWFuYWdlbGF5b3V0L0Q6XFxQcmluY2UgU2luZ2hcXHdvcmtzcGFjZVxcU29sZ2VuT25lXFxMYWhvcmUxXFxTb2xnZW5cXHNvbGdlbi5wb3J0YWxcXENsaWVudEFwcC9zcmNcXGFwcFxcdmlld3NcXG1hbmFnZWxheW91dFxcYWRkZWRpdGxheW91dC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvdmlld3MvbWFuYWdlbGF5b3V0L2FkZGVkaXRsYXlvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQSxXQUFXO0VBQ1gsV0FBVztFQUNYLGNBQWM7RUFDZCx3QkFBd0I7RUFDeEIsZ0JBQWdCO0VBQ2hCLHlCQUF5QixFQUFBOztBQUd6QjtFQUNBLFVBQVU7RUFDVixVQUFVO0VBQ1YscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQiw2QkFBNkI7RUFDN0IsbUJBQW1CO0VBQ25CLHlCQUF5QixFQUFBOztBQUd6QjtFQUNBLGNBQWM7RUFDZCxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGtCQUFrQixFQUFBOztBQUdsQjtFQUNBLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLHlCQUF5QixFQUFBOztBQUd6QjtFQUNBLHNCQUFzQjtFQUN0QixpQkFBQTtFQUNBLFlBQVc7RUFDWCxhQUFhLEVBQUE7O0FBRWI7RUFDQSxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLDBCQUEwQixFQUFBOztBQUUxQjtFQUNBLG1CQUFtQjtFQUNuQixnQ0FBZ0M7RUFBRSxtQkFBa0IsRUFBQTs7QUFDcEQ7RUFBa0IsYUFBWSxFQUFBOztBQUM5QjtFQUFnQyxZQUFXLEVBQUE7O0FBQzNDOzs7Ozs7Ozs7Ozs7O0NDZUM7O0FEREQ7RUFDQSw2QkFBNkI7RUFDN0IsWUFBWTtFQUNaLFdBQVc7RUFDWCxjQUFjO0VBQ2QsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixVQUFVLEVBQUE7O0FBR1Y7RUFDQSxnQ0FBZ0M7RUFDaEMsY0FBYztFQUNkLGFBQWE7RUFDYixZQUFZO0VBQ1osY0FBYztFQUNkLG1CQUFtQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvdmlld3MvbWFuYWdlbGF5b3V0L2FkZGVkaXRsYXlvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGlzdC1ncm91cC5jdXN0b20tZmllbGQtbGF5b3V0IHtcclxud2lkdGg6IDEwMCU7XHJcbmZsb2F0OiBsZWZ0O1xyXG5kaXNwbGF5OiBibG9jaztcclxucGFkZGluZzogMTBweCAhaW1wb3J0YW50O1xyXG5iYWNrZ3JvdW5kOiAjZmZmO1xyXG5ib3JkZXI6IDFweCBzb2xpZCAjY2RkNGRhO1xyXG59XHJcblxyXG4uY3VzdG9tLWZpZWxkLWxheW91dCBsaSB7XHJcbndpZHRoOiA5OCU7XHJcbm1hcmdpbjogMSU7XHJcbmRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuY3Vyc29yOiBhbGwtc2Nyb2xsO1xyXG5ib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcclxuYmFja2dyb3VuZDogI2Y5ZjlmOTtcclxuYm9yZGVyOiAxcHggc29saWQgI2U1ZTllYztcclxufVxyXG5cclxuLmN1c3RvbS1maWVsZC1sYXlvdXQgbGkgYSB7XHJcbmNvbG9yOiAjNzc3Nzc3O1xyXG5mb250LXNpemU6IDE2cHg7XHJcbmZvbnQtd2VpZ2h0OiA1MDA7XHJcbmN1cnNvcjogYWxsLXNjcm9sbDtcclxufVxyXG5cclxuLmRyYWdlZC1pdGVtIHtcclxuYmFja2dyb3VuZDogI2YxZjFmMTtcclxucGFkZGluZzogNXB4IDEwcHg7XHJcbm1hcmdpbi1ib3R0b206IDEwcHg7XHJcbmJvcmRlcjogMXB4IHNvbGlkICNkY2RjZGM7XHJcbn1cclxuXHJcbi5kcm9wW19uZ2NvbnRlbnQtYzFdIHtcclxuYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuLypwYWRkaW5nOiAxMHB4OyovXHJcbnBhZGRpbmc6MHB4O1xyXG5tYXJnaW4tdG9wOiAwO1xyXG59XHJcbi5zaWRlX3BhbmVsLWhlYWRpbmcge1xyXG5iYWNrZ3JvdW5kOiAjMmY0MDUwO1xyXG5jb2xvcjogI2ZmZjtcclxucGFkZGluZzogMTBweDtcclxubWFyZ2luOiAwcHggIWltcG9ydGFudDtcclxuZm9udC13ZWlnaHQ6IDUwMDtcclxuZm9udC1zaXplOiAxNTAlICFpbXBvcnRhbnQ7XHJcbn1cclxuLmRyb3BfcmlnaHRfaGVhZGluZyB7XHJcbmJhY2tncm91bmQ6ICNmOWY5Zjk7XHJcbmJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2RkNGRhOyBwYWRkaW5nOjAuNXJlbSAwcHg7fVxyXG4uY3VzdG9tX2ZlaWxkX2JveHtwYWRkaW5nOjE1cHg7fVxyXG4uZHJvcF9yaWdodF9oZWFkaW5nIC5mb3JtLWdyb3Vwe21hcmdpbjowcmVtO31cclxuLypcclxuXHJcbi5jdXN0b20tZmllbGQtbGF5b3V0LWxlZnQtcGFuZWwge2JhY2tncm91bmQ6ICNmZmYgIWltcG9ydGFudDsgYm9yZGVyOiAxcHggc29saWQgcmVkO31cclxuLmN1c3RvbS1maWVsZC1sYXlvdXQtbGVmdC1wYW5lbCBsaSB7IHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7IGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgYm9yZGVyLXJhZGl1czowcHggIWltcG9ydGFudDt9XHJcblxyXG5cclxuKDQ6MzA6MDMgUE0pIEFqYXkgQW5lamEgLSBERVM6IGJhY2tncm91bmQ6IGY5ZjlmOVxyXG4oNDozMDoxNCBQTSkgQWpheSBBbmVqYSAtIERFUzogYm9yZGVyIGU1ZTllY1xyXG4oNDozMDoyMyBQTSkgQWpheSBBbmVqYSAtIERFUzogaGVhZGlnbiBiZyBcclxuKDQ6MzA6MjQgUE0pIEFqYXkgQW5lamEgLSBERVM6IDJmNDA1MFxyXG4oNDozMDo1NSBQTSkgQWpheSBBbmVqYSAtIERFUzogb3V0ZXIgYmctIGNkZDRkYVxyXG5cclxuXHJcbiovXHJcbi5jb250YWluZXItbmV3IHtcclxuYmFja2dyb3VuZC1jb2xvcjogZm9yZXN0Z3JlZW47XHJcbmhlaWdodDogNTBweDtcclxud2lkdGg6IDUwcHg7XHJcbmRpc3BsYXk6IGJsb2NrO1xyXG5mbG9hdDogbGVmdDtcclxubWFyZ2luLWxlZnQ6IDMwcHg7XHJcbm1hcmdpbi10b3A6IDMwcHg7XHJcbnBhZGRpbmc6IDEwJTtcclxudmlzaWJpbGl0eTogdmlzaWJsZTtcclxuY29sb3I6IHJlZDtcclxufVxyXG5cclxuLnByb2plY3Rjb250YWluZXIge1xyXG5iYWNrZ3JvdW5kLWNvbG9yOiBsaWdodHN0ZWVsYmx1ZTtcclxuZGlzcGxheTogYmxvY2s7XHJcbmhlaWdodDogNTAwcHg7XHJcbndpZHRoOiA2MDBweDtcclxubWFyZ2luLXRvcDogNSU7XHJcbnZpc2liaWxpdHk6IHZpc2libGU7XHJcbn1cclxuXHJcblxyXG5cclxuIiwiLmxpc3QtZ3JvdXAuY3VzdG9tLWZpZWxkLWxheW91dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBmbG9hdDogbGVmdDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDEwcHggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NkZDRkYTsgfVxuXG4uY3VzdG9tLWZpZWxkLWxheW91dCBsaSB7XG4gIHdpZHRoOiA5OCU7XG4gIG1hcmdpbjogMSU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY3Vyc29yOiBhbGwtc2Nyb2xsO1xuICBib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZDogI2Y5ZjlmOTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2U1ZTllYzsgfVxuXG4uY3VzdG9tLWZpZWxkLWxheW91dCBsaSBhIHtcbiAgY29sb3I6ICM3Nzc3Nzc7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY3Vyc29yOiBhbGwtc2Nyb2xsOyB9XG5cbi5kcmFnZWQtaXRlbSB7XG4gIGJhY2tncm91bmQ6ICNmMWYxZjE7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2RjOyB9XG5cbi5kcm9wW19uZ2NvbnRlbnQtYzFdIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgLypwYWRkaW5nOiAxMHB4OyovXG4gIHBhZGRpbmc6IDBweDtcbiAgbWFyZ2luLXRvcDogMDsgfVxuXG4uc2lkZV9wYW5lbC1oZWFkaW5nIHtcbiAgYmFja2dyb3VuZDogIzJmNDA1MDtcbiAgY29sb3I6ICNmZmY7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMTUwJSAhaW1wb3J0YW50OyB9XG5cbi5kcm9wX3JpZ2h0X2hlYWRpbmcge1xuICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NkZDRkYTtcbiAgcGFkZGluZzogMC41cmVtIDBweDsgfVxuXG4uY3VzdG9tX2ZlaWxkX2JveCB7XG4gIHBhZGRpbmc6IDE1cHg7IH1cblxuLmRyb3BfcmlnaHRfaGVhZGluZyAuZm9ybS1ncm91cCB7XG4gIG1hcmdpbjogMHJlbTsgfVxuXG4vKlxyXG5cclxuLmN1c3RvbS1maWVsZC1sYXlvdXQtbGVmdC1wYW5lbCB7YmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50OyBib3JkZXI6IDFweCBzb2xpZCByZWQ7fVxyXG4uY3VzdG9tLWZpZWxkLWxheW91dC1sZWZ0LXBhbmVsIGxpIHsgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgYm9yZGVyOiAxcHggc29saWQgcmVkOyBib3JkZXItcmFkaXVzOjBweCAhaW1wb3J0YW50O31cclxuXHJcblxyXG4oNDozMDowMyBQTSkgQWpheSBBbmVqYSAtIERFUzogYmFja2dyb3VuZDogZjlmOWY5XHJcbig0OjMwOjE0IFBNKSBBamF5IEFuZWphIC0gREVTOiBib3JkZXIgZTVlOWVjXHJcbig0OjMwOjIzIFBNKSBBamF5IEFuZWphIC0gREVTOiBoZWFkaWduIGJnIFxyXG4oNDozMDoyNCBQTSkgQWpheSBBbmVqYSAtIERFUzogMmY0MDUwXHJcbig0OjMwOjU1IFBNKSBBamF5IEFuZWphIC0gREVTOiBvdXRlciBiZy0gY2RkNGRhXHJcblxyXG5cclxuKi9cbi5jb250YWluZXItbmV3IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZm9yZXN0Z3JlZW47XG4gIGhlaWdodDogNTBweDtcbiAgd2lkdGg6IDUwcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLWxlZnQ6IDMwcHg7XG4gIG1hcmdpbi10b3A6IDMwcHg7XG4gIHBhZGRpbmc6IDEwJTtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgY29sb3I6IHJlZDsgfVxuXG4ucHJvamVjdGNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0c3RlZWxibHVlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiA1MDBweDtcbiAgd2lkdGg6IDYwMHB4O1xuICBtYXJnaW4tdG9wOiA1JTtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTsgfVxuIl19 */");

/***/ }),

/***/ "./src/app/views/managelayout/addeditlayout.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/managelayout/addeditlayout.component.ts ***!
  \***************************************************************/
/*! exports provided: AddeditlayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditlayoutComponent", function() { return AddeditlayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout.service */ "./src/app/views/managelayout/layout.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _viewpopupwindow_propertiespopup_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./viewpopupwindow/propertiespopup.component */ "./src/app/views/managelayout/viewpopupwindow/propertiespopup.component.ts");
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








var AddeditlayoutComponent = /** @class */ (function () {
    function AddeditlayoutComponent(fb, layoutService, router, dialogService, toaster, route, commonService) {
        this.fb = fb;
        this.layoutService = layoutService;
        this.router = router;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.loadSave = false;
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
        this.moduleid = "0";
        this.submoduleid = "0";
        //modulePermission: ModuleList;
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.pageTitle = 'Add Custom Field';
        this.fieldArray = [];
        this.newAttribute = {};
        this.dragOperation = false;
        this.containers = [
            new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Container1"](1, 'Container 1', [new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('1'), new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('2')]),
            new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Container1"](2, 'Container 2', [new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('3'), new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('4')]),
            new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Container1"](3, 'Container 3', [new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('5'), new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Widget"]('6')])
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
        this.addOrUpdatePermission = false;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        console.log("this.modulePermission", this.modulePermission);
        var add = this.modulePermission.find(function (m) { return m.privilegecode == 'ManageLayoutAdd'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode == 'ManageLayoutUpdate'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode == 'ManageLayoutDelete'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
        this.addOrUpdatePermission = this.isAdd;
    }
    AddeditlayoutComponent.prototype.dragfullgroup = function () {
        if (this.dragOperation == true) {
            this.dragOperation = false;
        }
        else {
            this.dragOperation = true;
        }
    };
    AddeditlayoutComponent.prototype.incrementcounter = function () {
        return this.counterValue++;
    };
    AddeditlayoutComponent.prototype.decrementcounter = function () {
        return this.counterValue--;
    };
    // Group by color as key to the person array
    AddeditlayoutComponent.prototype.fordragcontrol = function () {
        this.dragOperation = false;
    };
    AddeditlayoutComponent.prototype.fordragcontainer = function () {
        this.dragOperation = true;
    };
    AddeditlayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.manageLayout = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            DefaultfieldName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            fieldName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
        });
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            var sid = params.get('sid');
            //   alert(id);
            //alert(sid);
            _this.getcustomfielddata(id, sid);
            _this.moduleid = id;
            _this.submoduleid = sid;
        });
        this.colors = this.filedLists;
        this.InnerData = 'four';
    };
    AddeditlayoutComponent.prototype.getcustomfielddata = function (id, sid) {
        var _this = this;
        this.layoutService.GetCustomFieldsList(id, sid, this.companyId).subscribe(function (result) {
            if (result) {
                _this.customFiledsData = null;
                _this.droped = [];
                _this.controls = [];
                _this.group = [];
                _this.counterValue = 0;
                //this.form.setValue(null);
                _this.customFiledsData = _this.layoutService.customFieldsList.data;
                _this.droped = _this.customFiledsData;
                console.log("droped", _this.droped);
                //this.groupControl1 = this.droped;
                _this.controls = _this.groupBy1(_this.droped, 'group_display_order');
                console.log("this.controls", _this.controls);
                //this.controls = this.droped;
                var mapped_1 = Object.keys(_this.controls).map(function (key) { return ({ type: key, value: _this.controls[key] }); });
                console.log("mappedmapped", mapped_1);
                var i_1 = 0;
                _this.controls.forEach(function (item, ind) {
                    _this.group.push(new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Group"](item[0].group_display_order, item[0].group_id, item[0].group_name, item[0].group_display_name, item[0].layout_type, item[0].table_name, item[0].is_inserted, item[0].is_updated, item[0].group_display_order, mapped_1[i_1].value));
                    i_1++;
                });
                // this.controls.map(item => { item.system_is_required = true });
                _this.controls.forEach(function (item, ind1) { return _this.dynamicLayoutNewSection[ind1] = item[0].layout_type; });
                // this.dynamicLayoutNewSection[0] = 'double';
                _this.counterValue = _this.group[_this.group.length - 1].display_order;
                // this.group.push(new Group(this.controls[0].group_display_order, this.controls[0].group_id, this.controls[0].group_name, this.controls[0].group_display_name, 0, 1, this.controls[0].display_order, this.controls));
                console.log("this.group.push", _this.group);
            }
        });
    };
    AddeditlayoutComponent.prototype.changegroup = function (event, index) {
        this.group[index].group_name = event.target.value;
        this.group[index].group_display_name = event.target.value;
        if (index > 0) {
            this.group[index].group_layout_type = this.group[index - 1].group_layout_type;
            this.group[index].table_name = this.group[index - 1].table_name;
        }
        this.group.forEach(function (item, i) { return item.display_order = i; });
        console.log('this.group', this.group);
    };
    AddeditlayoutComponent.prototype.addFieldValue = function () {
        this.fieldArray.push(this.newAttribute);
        this.newAttribute = {};
    };
    AddeditlayoutComponent.prototype.deleteFieldValue = function (index) {
        this.fieldArray.splice(index, 1);
    };
    AddeditlayoutComponent.prototype.S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    AddeditlayoutComponent.prototype.GemgarteIdWithUniwquie = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    AddeditlayoutComponent.prototype.dragEnd = function (e) {
    };
    AddeditlayoutComponent.prototype.dragStart = function (e, c) {
        console.log("dragStart111111", c);
        this.uniqueid = this.S4();
        var temp = [];
        temp = JSON.parse(JSON.stringify(c));
        console.log("temp", temp);
        this.dragedColor = temp;
    };
    AddeditlayoutComponent.prototype.drop = function (e) {
        if (this.dragedColor) {
            this.droped.push(this.dragedColor);
            this.dragedColor = null;
            console.log("droped", this.droped);
        }
    };
    AddeditlayoutComponent.prototype.customFieldLayOut = function () {
        console.log("Data", this.properties);
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
            debugger;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.selectListLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_code = this.properties.selectDropdown.value;
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
            this.group[this.index].controls[this.newcontrolid].sql_type = "datetime";
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
            debugger;
            this.group[this.index].controls[this.newcontrolid].name = this.properties.selectListLineNameDisplay.value;
            this.group[this.index].controls[this.newcontrolid].field_code = this.properties.selectDropdown.value;
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
            this.group[this.index].controls[this.newcontrolid].sql_type = "datetime";
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
        //console.log("colors", this.colors);
        //console.log("droped", this.droped);
        //console.log("filedLists", this.filedLists);
    };
    AddeditlayoutComponent.prototype.allowDropFunction = function (c) {
        console.log('3434', c);
    };
    AddeditlayoutComponent.prototype.dragStartGroupToGroup = function (e, c) {
        this.dragedColor = c;
        //this.dragedColor
        var index = this.droped.indexOf(c);
        if (index !== -1) {
            this.droped.splice(index, 1);
        }
        //this.droped.push(this.droped);
        this.dropNewGrop('', 0);
    };
    AddeditlayoutComponent.prototype.dragEndGroupToGroup = function (e) {
    };
    AddeditlayoutComponent.prototype.dragEndGroupToGroupReverse = function () {
    };
    AddeditlayoutComponent.prototype.dragStartGroupToGroupReverse = function (e, c) {
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
    //    console.log("droped", this.droped);
    //  }
    //}
    AddeditlayoutComponent.prototype.dropNewGrop = function (lst, a) {
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
            console.log('this.group', this.group[targetIdx].controls);
            //this.group.push(new Group(a + 1, this.controls));
            this.dragedColor = null;
            console.log("newgroup", this.newgroup);
        }
    };
    AddeditlayoutComponent.prototype.toggleClass = function (event, classs) {
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
            console.log("AddClass", this.renderer);
        }
    };
    AddeditlayoutComponent.prototype.toggleClassRadioButton = function (event, classs) {
        console.log('event', event);
        console.log('classs', classs);
        this.condition = false;
        this.layoutPageType = classs;
    };
    AddeditlayoutComponent.prototype.toggleClassNewGrp = function (event, classs, index) {
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
    AddeditlayoutComponent.prototype.toggleClassRadioButtonNew = function (event, index, classs) {
        console.log(event);
        console.log(classs);
        console.log('IndexNumber', index);
        this.condionNewGroup = false;
        this.hidemeNewGrp[index] = false;
        this.dynamicLayoutNewSection[index] = classs;
        this.layoutPageTypeNewGrp = classs;
        this.group[index].group_layout_type = classs.replace('Columns', '');
        this.group[index].controls.forEach(function (items) { return items.layout_type = classs.replace('Columns', ''); });
        console.log("this.groupclas", this.group);
    };
    AddeditlayoutComponent.prototype.NewGrop = function (NewGroup) {
        if (NewGroup == 'NewGroup') {
            this.DemoShow = true;
            this.dynamicLayoutNewSection[0] = 'double';
            this.newGrpDisplaydropDown = this.GemgarteIdWithUniwquie();
            this.fieldArray.push(this.newAttribute);
            this.group.push(new _layout_service__WEBPACK_IMPORTED_MODULE_2__["Group"](this.group.length, 0, "", "", "", "", 1, 0, 0, []));
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
    AddeditlayoutComponent.prototype.DisplayProperties = function (event, order, index) {
        console.log("ShowLL", event);
        if (this.displayProperties == false) {
            //this.displayProperties = true;
            document.getElementById("#1").setAttribute("class", "show");
        }
        else {
            //  this.displayProperties = false;
            document.getElementById("#1").setAttribute("display", "hide");
        }
    };
    AddeditlayoutComponent.prototype.EditCustomFields = function (groupid, id, lst, index, groupCreated) {
        //console.log('groupid',groupid)
        //console.log('id', id)
        //console.log('lst', lst)
        //console.log('index', index)   
        //console.log('groupCreated', groupCreated)    
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
    AddeditlayoutComponent.prototype.SystemDefinedPropertyRequired = function (groupid, id, lst, index, event, groupCreated) {
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
    AddeditlayoutComponent.prototype.AddLayoutForCustomField = function () {
        var _this = this;
        if (this.manageLayout.valid) {
            this.loadSave = true;
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
            console.log("newgroup", this.group);
            //this.controls.map(item => { item.system_is_required = true });
            // this.saveLayout.push(this.group);
            this.layoutService.SaveLAyourData(this.group, this.moduleid, this.submoduleid).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success('Data saved successfully.');
                    _this.router.navigateByUrl("layoutlist/layoutlist/" + _this.moduleid);
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
    AddeditlayoutComponent.prototype.Cancel = function () {
        this.router.navigateByUrl("layoutlist");
    };
    AddeditlayoutComponent.prototype.Removelayout = function (index) {
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
                console.log("Array", _this.fieldArray);
                console.log("Atrt", _this.newAttribute);
            }
            _this.condionNewGroup = false;
            _this.hidemeNewGrp[index] = false;
        });
    };
    AddeditlayoutComponent.prototype.RemoveCustomFields = function (groupid, id, cntrid) {
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
    AddeditlayoutComponent.prototype.RemoveCustomFieldSystemDefined = function (id, lst) {
        var _this = this;
        var message = "Are you sure you want to delete this field?";
        this.dialogService.confirm('', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.hideme[id + _this.uniqueid] = false;
                _this.droped.splice(id, 1);
            }
        });
    };
    AddeditlayoutComponent.prototype.onKey = function (event, index) {
        this.values += event.target.value + ' | ';
        this.newgroup[index].groupName = this.values;
        console.log("keyUp", this.newgroup);
    };
    AddeditlayoutComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _layout_service__WEBPACK_IMPORTED_MODULE_2__["LayoutService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('propertiesPopup', { static: false }),
        __metadata("design:type", _viewpopupwindow_propertiespopup_component__WEBPACK_IMPORTED_MODULE_7__["PropertiespopupComponent"])
    ], AddeditlayoutComponent.prototype, "properties", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('parent', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])
    ], AddeditlayoutComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Display', { static: false }),
        __metadata("design:type", Object)
    ], AddeditlayoutComponent.prototype, "Display", void 0);
    AddeditlayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditlayout',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditlayout.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managelayout/addeditlayout.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditlayout.component.scss */ "./src/app/views/managelayout/addeditlayout.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _layout_service__WEBPACK_IMPORTED_MODULE_2__["LayoutService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], AddeditlayoutComponent);
    return AddeditlayoutComponent;
}());



/***/ }),

/***/ "./src/app/views/managelayout/layout-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/managelayout/layout-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: LayoutRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutRoutingModule", function() { return LayoutRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _addeditlayout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addeditlayout.component */ "./src/app/views/managelayout/addeditlayout.component.ts");
/* harmony import */ var _layoutlist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layoutlist.component */ "./src/app/views/managelayout/layoutlist.component.ts");
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
    //{ path: '', component: LayoutlistComponent  },
    { path: 'addlayout', component: _addeditlayout_component__WEBPACK_IMPORTED_MODULE_2__["AddeditlayoutComponent"] },
    { path: 'editlayout/:id/:sid', component: _addeditlayout_component__WEBPACK_IMPORTED_MODULE_2__["AddeditlayoutComponent"] },
    {
        path: '', redirectTo: 'layoutlist', pathMatch: 'full'
    },
    {
        path: 'layoutlist', component: _layoutlist_component__WEBPACK_IMPORTED_MODULE_3__["LayoutlistComponent"]
    },
    { path: 'layoutlist/:id', component: _layoutlist_component__WEBPACK_IMPORTED_MODULE_3__["LayoutlistComponent"] }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/managelayout/layout.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/managelayout/layout.module.ts ***!
  \*****************************************************/
/*! exports provided: LayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _layoutlist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layoutlist.component */ "./src/app/views/managelayout/layoutlist.component.ts");
/* harmony import */ var _addeditlayout_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addeditlayout.component */ "./src/app/views/managelayout/addeditlayout.component.ts");
/* harmony import */ var _layout_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./layout-routing.module */ "./src/app/views/managelayout/layout-routing.module.ts");
/* harmony import */ var primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/components/dragdrop/dragdrop */ "./node_modules/primeng/components/dragdrop/dragdrop.js");
/* harmony import */ var primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/colorpicker */ "./node_modules/primeng/colorpicker.js");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(primeng_colorpicker__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var primeng_orderlist__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/orderlist */ "./node_modules/primeng/orderlist.js");
/* harmony import */ var primeng_orderlist__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(primeng_orderlist__WEBPACK_IMPORTED_MODULE_12__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};














var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_addeditlayout_component__WEBPACK_IMPORTED_MODULE_8__["AddeditlayoutComponent"], _layoutlist_component__WEBPACK_IMPORTED_MODULE_7__["LayoutlistComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], primeng_colorpicker__WEBPACK_IMPORTED_MODULE_11__["ColorPickerModule"],
                _layout_routing_module__WEBPACK_IMPORTED_MODULE_9__["LayoutRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_10__["DragDropModule"], primeng_orderlist__WEBPACK_IMPORTED_MODULE_12__["OrderListModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"]
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());



/***/ }),

/***/ "./src/app/views/managelayout/layoutlist.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/views/managelayout/layoutlist.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZWxheW91dC9sYXlvdXRsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/managelayout/layoutlist.component.ts":
/*!************************************************************!*\
  !*** ./src/app/views/managelayout/layoutlist.component.ts ***!
  \************************************************************/
/*! exports provided: LayoutlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutlistComponent", function() { return LayoutlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _layout_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layout.service */ "./src/app/views/managelayout/layout.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
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







var LayoutlistComponent = /** @class */ (function () {
    function LayoutlistComponent(fb, layoutservice, commonService, router, toaster, route) {
        this.fb = fb;
        this.layoutservice = layoutservice;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.searchUserType = '';
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
        // modulePermission: ModuleList;
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.loadSave = false;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CUSTOMFIELDSADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CUSTOMFIELDSUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'CUSTOMFIELDSDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
    }
    LayoutlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentPage = 0;
        this.pageSizeValue = 15;
        this.getPageSizes();
        this.refresh();
        this.getModuleddl();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.id = id;
            // alert(this.id);
        });
    };
    LayoutlistComponent.prototype.getModuleddl = function () {
        var _this = this;
        this.commonService.getMasterItemsList('custom_modules_layout').subscribe(function (result) {
            _this.modulelist = _this.commonService.masters;
            // console.log('sas', this.commonService.masters);
            if (_this.id != null) {
                for (var i = 0; i < _this.modulelist.length; i++) {
                    var s = _this.modulelist[i];
                    if (s.text.toString().toUpperCase() == _this.id.toString().toUpperCase()) {
                        var value = s.value;
                        var text = s.text;
                        // console.log('text ', text)
                        // console.log('value ',value)
                        _this.selectedValue = value.toString();
                        _this.SelectedText = text.toString();
                        _this.selectmoduleValue(_this.selectedValue, _this.SelectedText);
                        // console.log('value ', this.selectedValue)
                        // this.MySelect.select(s.value.toString());
                    }
                }
            }
        });
    };
    LayoutlistComponent.prototype.selectmodule = function (event) {
        if (typeof event === 'undefined') {
            this.modulecode = 0;
            this.listFilter = '';
            this.refresh();
        }
        else {
            this.router.navigateByUrl("layoutlist/layoutlist/" + event.text);
            this.modulecode = (event.value);
            this.modulenamecode = (event.text);
            this.listFilter = this.modulenamecode;
            this.refresh();
        }
    };
    LayoutlistComponent.prototype.selectmoduleValue = function (value, text) {
        if (value != null) {
            this.modulecode = value;
            this.modulenamecode = text;
            this.refresh();
        }
        else {
            this.modulecode = 0;
            this.refresh();
        }
    };
    LayoutlistComponent.prototype.edit = function (modulecode, submoduelcode) {
        //alert(modulecode); alert(submoduelcode);
        this.router.navigate(['/layoutlist/editlayout', modulecode, submoduelcode]);
    };
    LayoutlistComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.layoutservice.GetLayoutList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.modulecode).subscribe(function (response) {
            _this.pagedData = _this.layoutservice.pagedData;
            // console.log(this.pagedData);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    LayoutlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    LayoutlistComponent.prototype.setPage = function ($event) {
        this.currentPage = $event.page - 1;
        this.refresh();
    };
    LayoutlistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = $event.page - 1;
        this.refresh();
        ;
    };
    LayoutlistComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _layout_service__WEBPACK_IMPORTED_MODULE_5__["LayoutService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('Select', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], LayoutlistComponent.prototype, "MySelect", void 0);
    LayoutlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-layoutlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./layoutlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managelayout/layoutlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./layoutlist.component.scss */ "./src/app/views/managelayout/layoutlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _layout_service__WEBPACK_IMPORTED_MODULE_5__["LayoutService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], LayoutlistComponent);
    return LayoutlistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-managelayout-layout-module.js.map