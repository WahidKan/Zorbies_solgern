(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-document-maker-sub-module-mapping-document-maker-sub-module-mapping-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-sub-module-mapping/document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component.html":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-sub-module-mapping/document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component.html ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\n    <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\n    <div class=\"breadcrumb-wrapper\">\n      <ol class=\"breadcrumb\">\n        <li>\n          <a routerLink=\"/dashboard\">Dashboard</a>\n        </li>\n        <li><a routerLink=\"/document-maker-submodule-mapping\">Document Mapping</a></li>\n        <li class=\"active\">{{pageTitle}}</li>\n      </ol>\n    </div>\n</div>\n<div class=\"clearfix\"></div>\n<div class=\"panel cntainerwithoutbg clearfix\">\n    <div class=\"panel-content clearfix mb-4 p-0\">\n      <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" *ngIf=\"id != null && id > 0\" role=\"tablist\">\n        <li class=\"nav-item\">\n          <a class=\"nav-link active show\" id=\"lead-tab\"\n              data-toggle=\"tab\" href=\"#RouteRule\" role=\"tab\" aria-selected=\"true\">Document Mapping</a>\n        </li>\n      </ul>\n      <div class=\"tab-content\" id=\"myTabContent\">\n        <div class=\"tab-pane fade active show\" id=\"RouteRule\" role=\"tabpanel\">\n          <div class=\"row\">\n            <div class=\"col-lg-12 portlets\">\n               <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <div class=\"row\">\n                      <div class=\"col-sm-4 col-md-4\">\n                        <label>Name:</label>\n                        <div class=\"form-group\">\n                          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"mapping.name\">\n                        </div>\n                      </div>\n                      <div class=\"col-sm-4 col-md-4\">\n                        <label>Select Module Object:</label>\n                        <div class=\"form-group\" [ngStyle]=\"action == 'Update' ? {'pointer-events': 'none'} : {}\">\n                            <ng-select [items]=\"subModulesList\" [(ngModel)]=\"mapping.subModuleId\" bindLabel=\"sub_module_name\" \n                             placeholder=\"Select...\" [closeOnSelect]=\"true\" (change)=\"onSubModuleChange($event)\">                \n                            </ng-select>\n                        </div>\n                      </div>\n                      <div class=\"col-sm-4 col-md-4\">\n                        <label>Status:</label>\n                        <div class=\"form-group\">\n                            <ng-select [items]=\"statusList\" [(ngModel)]=\"mapping.statusId\" bindLabel=\"text\"\n                             placeholder=\"Select...\" [closeOnSelect]=\"true\" (change)=\"onStatusChange($event)\">                \n                            </ng-select>\n                        </div>\n                      </div>\n                    </div>\n                      <div class=\"row\">\n                        <div class=\"col-sm-6 col-md-6\">\n                            <label>Type:</label>\n                            <div class=\"form-group\" [ngStyle]=\"action == 'Update' ? {'pointer-events': 'none'} : {}\">\n                              <div class=\"radio d-inline-block\">\n                                <input id=\"radio-1\" name=\"type\" type=\"radio\" value=\"Document\" [(ngModel)]=\"mapping.type\" (click)=\"onTypeSelection($event)\">\n                                <label for=\"radio-1\" class=\"radio-label\">Document</label>\n                              </div>\n                              <div class=\"radio d-inline-block ml-5\">\n                                <input id=\"radio-2\" name=\"type\" type=\"radio\" value=\"Route\" [(ngModel)]=\"mapping.type\" (click)=\"onTypeSelection($event)\">\n                                <label for=\"radio-2\" class=\"radio-label\">Route</label>\n                              </div>\n                            </div>\n                          </div>\n                          <div class=\"col-sm-6 col-md-6\">\n                            <label>{{mapping.type}}</label>\n                            <div class=\"form-group\">\n                              <ng-select [items]=\"documents\" [(ngModel)]=\"selectedObjectId\" bindLabel=\"text\" *ngIf=\"mapping.type == 'Document'\" [multiple]=\"true\" placeholder=\"Select Document\" [closeOnSelect]=\"true\" (change)=\"onDocumentChange($event)\">                \n                              </ng-select>\n                              <ng-select [items]=\"dataRoutes\" [(ngModel)]=\"selectedObjectId\" bindLabel=\"text\" *ngIf=\"mapping.type == 'Route'\" placeholder=\"Select Route\" [closeOnSelect]=\"true\" (change)=\"onRouteChange($event)\">                \n                              </ng-select>\n                            </div>\n                          </div>\n                      </div>\n                  </div>\n                  <div class=\"col-md-12\">\n                    <div class=\"row\">\n                      <div class=\"col-md-12 \">\n                        <h3 class=\"form-heading\"><span>Document List</span></h3>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"col-md-12 py-1\">\n                    <table class=\"table\">\n                        <thead>\n                          <tr>\n                            <th scope=\"col\">Document Name</th>\n                            <th scope=\"col\">Document Id</th>\n                            <th scope=\"col\">Path</th>\n                            <th scope=\"col\">Document type</th>\n                            <th scope=\"col\">Actions</th>\n                          </tr>\n                        </thead>\n                        <tbody>\n                          <tr *ngFor=\"let doc of documentList; index as i;\">\n                            <th>{{doc.name}}</th>\n                            <td>{{doc.id}}</td>\n                            <td>{{doc.path}}</td>\n                            <td>{{doc.type}}</td>\n                            <td><a class=\"actions-onclick view-list\" class=\"btn-edit\" title=\"Download File\" href=\"javascript:void(0);\" (click)=\"downloadFile(doc.fileUrl)\"><i class=\"fa fa-eye pr-2 \"></i></a></td>\n                          </tr>\n                        </tbody>\n                      </table>\n                  </div>\n                  <div class=\"col-md-12\">\n                    <div class=\"row\">\n                      <div class=\"col-md-12 \">\n                        <h3 class=\"form-heading\"><span>Choose Mapping Fields</span></h3>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"col-md-12 py-1\" *ngFor=\"let field of documentFields; index as i;\">\n                    <label class=\"ng-star-inserted\">\n                      {{field.formFieldName}} - (Document Names : <strong>{{field.documentName}}</strong>)\n                    </label>\n                    <ng-select id=\"{{field.fieldName}}\" [items]=\"formFields\" [(ngModel)]=\"field.mappings\"\n                               placeholder=\"Select Form Fields\" bindLabel=\"formFieldName\"\n                               [multiple]=\"true\" [searchable]=\"true\" (change)=\"onChange($event, field)\"\n                               [closeOnSelect]=\"true\">\n                    </ng-select>\n                  </div>\n                  <div class=\"row mt-3\" >\n                    <div class=\"col-sm-12 col-md-12\">\n                        <button class=\"btn btn-success mr-2\" href=\"javascript:void(0);\" (click)=\"submit()\"><span><i class=\"fa fa-save\"></i> Submit</span></button>\n                        <a routerLink=\"/document-maker-submodule-mapping\" class=\"btn btn-danger\" href=\"javascript:void(0);\"><span><i class=\"fa fa-close\"></i> Cancel</span></a>\n                    </div>\n                </div>\n                  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\n                </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n</div>\n<div class=\"clearfix\"></div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component.html":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component.html ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\n    <h2 class=\"float-left pr-2\"><strong>DOCUMENT MAPPING</strong></h2>\n    <div class=\"breadcrumb-wrapper\">\n      <ol class=\"breadcrumb\">\n        <li>\n          <a routerLink=\"/dashboard\">Dashboard</a>\n        </li>\n        <li class=\"active\">Document Mapping</li>\n      </ol>\n    </div>\n</div>\n<div class=\"clearfix\"></div>\n<div class=\"row\">\n    <div class=\"col-lg-12 portlets\">\n      <div class=\"panel\">\n        <div class=\"panel-header border-bottom btn-iconres\">\n            <div class=\"row mt-2\">\n              <div class=\"col-md-12 col-xl-7 pr-3 pr-lg-0\">\n                <div class=\"row searchfield \">\n                  <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\n                    <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\n                  </div>\n                  <div class=\"col-md-8 float-left pl-3 pl-lg-0\">\n                    <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\n                    <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-12 col-xl-5\">\n                <div class=\"dt-buttons noabso-res\">\n                    <a routerLink=\"/document-maker-submodule-mapping/adddocumentmapping\" class=\"btn btn-success form-btns  mr-1 smview\" tooltip=\" Add Document Mapping\"><i class=\"fa fa-plus\"></i></a>\n                    <a class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\n                </div>\n              </div>\n            </div>\n          </div>\n        <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\n          <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\n                        [rows]=\"pagedData.data\"\n                        [columnMode]=\"'force'\"\n                        [scrollbarH]=\"true\"\n                        [rowHeight]=\"'40'\"\n                        [headerHeight]=\"40\"\n                        [footerHeight]=\"40\"\n                        [externalPaging]=\"true\"\n                        [externalSorting]=\"true\"\n                        [loadingIndicator]=\"loadSave\"\n                        [count]=\"pagedData.pager.totalItems\"\n                        [offset]=\"pagedData.pager.currentPage\"\n                        [limit]=\"pagedData.pager.pageSize\"\n                        (page)='setPage($event)'\n                        (sort)=\"onSort($event)\"\n                        [selectionType]=\"SelectionType.checkbox\"\n                        [selectAllRowsOnPage]=\"false\"\n                        [selected]=\"selected\"\n                        (select)=\"onSelect($event)\">\n                        <ngx-datatable-column [width]=\"42\"\n                                        [sortable]=\"false\"\n                                        [canAutoResize]=\"false\"\n                                        [draggable]=\"false\"\n                                        [resizeable]=\"false\"\n                                        [headerCheckboxable]=\"true\"\n                                        [checkboxable]=\"true\">\n                        </ngx-datatable-column>\n  \n                        <ngx-datatable-column name=\"Name\" [sortable]=\"true\" prop=\"Name\"></ngx-datatable-column>\n                        <ngx-datatable-column name=\"Module\" [sortable]=\"true\" prop=\"ModuleName\"></ngx-datatable-column>\n                        <ngx-datatable-column name=\"Sub Module\" [sortable]=\"true\" prop=\"SubModuleName\"></ngx-datatable-column>\n                        <ngx-datatable-column name=\"Type\" prop=\"IsMappedDocumentMakerRouteRule\">\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                                <div *ngIf=\"row.IsMappedDocumentMakerRouteRule == false\">\n                                <div>Document</div>\n                                </div>\n                                <div *ngIf=\"row.IsMappedDocumentMakerRouteRule == true\">\n                                <div>Route/Rule</div>\n                                </div>\n                            </ng-template>\n                            </ngx-datatable-column>\n                        <ngx-datatable-column name=\"Route/Rule\" [sortable]=\"true\" prop=\"DocumentMakerRouteRule\"></ngx-datatable-column>\n                        <ngx-datatable-column name=\"Status\" prop=\"StatusId\" sortable=\"false\">\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                            <div class=\"text-center\" *ngIf=\"row.StatusId == 1002\">\n                            <div  class=\"status-box\" style=\"background-color: #dc3545;max-width:150px !important\">InActive</div>\n                            </div>\n                            <div class=\"text-center\" *ngIf=\"row.StatusId == 1001\">\n                            <div  class=\"status-box\" style=\"background-color: #28a745;max-width:150px !important\">Active</div>\n                            </div>\n                        </ng-template>\n                        </ngx-datatable-column>\n                        <ngx-datatable-column [width]=\"80\" name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\n                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                        <div class=\"text-center\">\n                        <!-- <a  class=\"actions-onclick view-list\" class=\"btn-edit \" [routerLink]=\"['/document-maker-submodule-mapping/view',row.Id]\"  title=\"View Detail\"><i class=\"fa fa-eye pr-2 \"></i></a> -->\n                        <a *ngIf=\"row.IsFromSubModule\"  class=\"btn-edit \" href=\"javascript:void(0);\" [routerLink]=\"['/document-maker-submodule-mapping/editdocumentmapping',row.Id]\"><i title=\"Edit Document Mapping\" class=\"fa fa-pencil text-success pr-2\"></i></a>\n                        <a *ngIf=\"!row.IsFromSubModule\"  class=\"btn-edit\" href=\"javascript:void(0);\" [routerLink]=\"['/document-maker-submodule-mapping/editdocumentmapping',row.Id]\"><i title=\"Edit Document Mapping\" class=\"fa fa-pencil text-success pr-2\"></i></a>\n                        <a *ngIf=\"row.IsFromSubModule\" class=\"btn-edit disabled\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-secondary pr-2\" title=\"Delete Form\"></i></a>\n                        <a *ngIf=\"!row.IsFromSubModule\" (click)=\"Delete(row)\" class=\"btn-edit\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger pr-2\" title=\"Delete Document Mapping\"></i></a>\n                        </div>\n                        </ng-template>\n                        </ngx-datatable-column>\n                        <ngx-datatable-footer>\n                        <ng-template ngx-datatable-footer-template\n                                    let-rowCount=\"rowCount\"\n                                    let-pageSize=\"pageSize\"\n                                    let-selectedCount=\"selectedCount\"\n                                    let-currentPage=\"currentPage\"\n                                    let-offset=\"offset\"\n                                    let-isVisible=\"isVisible\">\n                        \n                        <div>\n                        <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\n                            <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\n                                        bindLabel=\"text\" bindValue=\"text\"></ng-select>\n                            </span>\n                        </div>\n                        </div>\n                        <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\n                        {{commonService.PageString(pagedData.pager.currentPage+1,pageSizeValue,rowCount)}}\n                        </div>\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\n                        [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\n                        [pagerPreviousIcon]=\"'fa fa-angle-left'\"\n                        [pagerNextIcon]=\"'fa fa-angle-right'\"\n                        [page]=\"pagedData.pager.currentPage+1\"\n                        [size]=\"pageSizeValue\"\n                        [count]=\"pagedData.pager.totalItems\"\n                        [hidden]=\"!((rowCount / pageSize) > 1)\"\n                        (change)=\"setPage($event)\">\n                        </datatable-pager>\n                        </ng-template>\n                        </ngx-datatable-footer>\n            </ngx-datatable>\n        </div>\n      </div>\n    </div>\n</div>\n");

/***/ }),

/***/ "./src/app/views/document-maker-sub-module-mapping/document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component.scss":
/*!**************************************************************************************************************************************************************!*\
  !*** ./src/app/views/document-maker-sub-module-mapping/document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component.scss ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2RvY3VtZW50LW1ha2VyLXN1Yi1tb2R1bGUtbWFwcGluZy9kb2N1bWVudC1tYWtlci1hZGQtZWRpdC1zdWItbW9kdWxlLW1hcHBpbmcvZG9jdW1lbnQtbWFrZXItYWRkLWVkaXQtc3ViLW1vZHVsZS1tYXBwaW5nLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/document-maker-sub-module-mapping/document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component.ts":
/*!************************************************************************************************************************************************************!*\
  !*** ./src/app/views/document-maker-sub-module-mapping/document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component.ts ***!
  \************************************************************************************************************************************************************/
/*! exports provided: DocumentMakerAddEditSubModuleMappingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerAddEditSubModuleMappingComponent", function() { return DocumentMakerAddEditSubModuleMappingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _document_maker_sub_module_mapping_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../document-maker-sub-module-mapping.service */ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping.service.ts");
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






var DocumentMakerAddEditSubModuleMappingComponent = /** @class */ (function () {
    function DocumentMakerAddEditSubModuleMappingComponent(service, router, toaster, route, commonService, dialogService) {
        this.service = service;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.id = 0;
        this.loadSave = false;
        this.mapping = new _document_maker_sub_module_mapping_service__WEBPACK_IMPORTED_MODULE_5__["DocumentSubModuleMapping"]();
        this.documents = [];
        this.dataRoutes = [];
        this.active = false;
        this.documentList = [];
        this.documentFields = [];
        this.prevdocumentFields = [];
        this.formFields = [];
        this.statusList = [{ text: "Active", value: 1001 }, { text: "InActive", value: 1002 }];
    }
    DocumentMakerAddEditSubModuleMappingComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.mapping = new _document_maker_sub_module_mapping_service__WEBPACK_IMPORTED_MODULE_5__["DocumentSubModuleMapping"]();
        this.getsubModulesList();
        this.route.paramMap.subscribe(function (params) {
            _this.id = params.get('id');
            debugger;
            if (_this.id) {
                _this.pageTitle = "Edit Document Mapping";
                _this.action = "Update";
                _this.getEditData(_this.id);
            }
            else {
                _this.pageTitle = "Add Document Mapping";
                _this.action = "Add";
            }
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.onStatusChange = function (event) {
        if (event) {
            this.mapping.statusIdDb = event.value;
        }
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.getsubModulesList = function () {
        var _this = this;
        debugger;
        this.loadSave = true;
        this.service.getSubModulesList().subscribe(function (modules) {
            _this.loadSave = false;
            _this.subModulesList = modules;
        }, function (err) {
            _this.loadSave = false;
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.onSubModuleChange = function (event) {
        if (event) {
            debugger;
            this.mapping.moduleId = event.module_id;
            this.mapping.subModuleIdDb = event.sub_module_id;
            this.getDocuments(event.module_id, event.sub_module_id);
            this.getRoutes(event.module_id, event.sub_module_id);
            this.getCustomFields(event.module_id, event.sub_module_id);
        }
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.getCustomFields = function (moduleId, subModuleId) {
        var _this = this;
        debugger;
        this.loadSave = true;
        this.service.getCustomFieldsList(moduleId, subModuleId).subscribe(function (fields) {
            _this.loadSave = false;
            _this.formFields = fields;
        }, function (err) {
            _this.loadSave = false;
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.getDocuments = function (moduleId, subModuleId) {
        var _this = this;
        debugger;
        this.loadSave = true;
        this.service.getDocumentList(moduleId, subModuleId).subscribe(function (documents) {
            _this.loadSave = false;
            _this.documents = documents;
            console.log('doc list', _this.documentList);
        }, function (err) {
            _this.loadSave = false;
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.getRoutes = function (moduleId, subModuleId) {
        var _this = this;
        debugger;
        this.loadSave = true;
        this.service.GetRoutesList(moduleId, subModuleId).subscribe(function (routes) {
            _this.loadSave = false;
            _this.dataRoutes = routes;
        }, function (err) {
            _this.loadSave = false;
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.onDocumentChange = function (event) {
        if (event) {
            debugger;
            var data = event.map(function (x) { return x.value; });
            this.mapping.objectId = JSON.stringify(data);
            this.clearFields();
            this.getSubModuleDocuments(JSON.stringify(data));
        }
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.onRouteChange = function (event) {
        debugger;
        if (event) {
            this.selectedObjectId = event;
            this.mapping.objectId = event.value;
            this.clearFields();
            this.getRouteDocuments(event.value);
        }
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.getRouteDocuments = function (routeId) {
        var _this = this;
        debugger;
        this.loadSave = true;
        this.service.GetRouteDocumentAndFieldsList(routeId).subscribe(function (routeDocument) {
            _this.loadSave = false;
            if (routeDocument && routeDocument.length > 0) {
                if (routeDocument[0].documents) {
                    _this.documentList = JSON.parse(routeDocument[0].documents);
                }
                if (routeDocument[0].fields) {
                    _this.documentFields = JSON.parse(routeDocument[0].fields);
                    console.log(routeDocument[0].fields);
                }
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.getSubModuleDocuments = function (data) {
        var _this = this;
        debugger;
        this.loadSave = true;
        this.service.GetDocumentAndFieldsByDocumentIdsList(data).subscribe(function (routeDocument) {
            _this.loadSave = false;
            if (routeDocument && routeDocument.length > 0) {
                if (routeDocument[0].documents) {
                    _this.documentList = JSON.parse(routeDocument[0].documents);
                }
                if (routeDocument[0].fields) {
                    _this.documentFields = JSON.parse(routeDocument[0].fields);
                    console.log(routeDocument[0].fields);
                }
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.getEditData = function (mappingId) {
        var _this = this;
        debugger;
        this.loadSave = true;
        this.service.getMapping(mappingId).subscribe(function (data) {
            _this.loadSave = false;
            debugger;
            if (data) {
                data.statusId = data.statusId ? JSON.parse(data.statusId) : null;
                data.documentList = data.documentList ? JSON.parse(data.documentList) : null;
                data.mappings = data.mappings ? JSON.parse(data.mappings) : null;
                data.subModuleId = data.subModuleId ? JSON.parse(data.subModuleId) : null;
                _this.mapping = data;
                _this.documentList = _this.mapping.documentList;
                _this.documentFields = _this.mapping.mappings;
                _this.prevdocumentFields = _this.mapping.mappings;
                debugger;
                if (_this.mapping.type == "Document") {
                    _this.selectedObjectId = _this.mapping.documentList;
                }
                else {
                    _this.selectedObjectId = _this.mapping.objectId ? JSON.parse(_this.mapping.objectId) : null;
                }
                _this.getDocuments(_this.mapping.moduleId, _this.mapping.subModuleIdDb);
                _this.getRoutes(_this.mapping.moduleId, _this.mapping.subModuleIdDb);
                _this.getCustomFields(_this.mapping.moduleId, _this.mapping.subModuleIdDb);
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.downloadFile = function (path) {
        var _this = this;
        debugger;
        this.loadSave = true;
        this.service.getDocumentBytes(path).subscribe(function (bytes) {
            _this.loadSave = false;
            var response = _this.base64ToArrayBuffer(bytes);
            var file = new Blob([response], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            _this.loadSave = false;
            window.open(fileURL);
        }, function (err) {
            _this.loadSave = false;
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    // private getDocumentDataRoutes() {
    //   this.loadSave = true;
    //   this.service.getDocumentDataRoutes().subscribe(dataRoutes => {
    //     this.loadSave = false;
    //     this.dataRoutes = dataRoutes;
    //   }, err => {
    //     this.loadSave = false;
    //   })
    // }
    // private getWebMergeDocument(documentId) {
    //   this.service.getWebmergeDocument(documentId).subscribe(doc => {
    //     this.document = doc;
    //   });
    // }
    // private getDocumentMapping(mappingId) {
    //   this.loadSave = true;
    //   this.service.getDocumentMappingDetails(mappingId).subscribe(mapping => {
    //     this.loadSave = false;
    //     this.mapping = mapping;
    //     this.getFormFields();
    //   }, err => {
    //       this.loadSave = false;
    //   });
    // }
    // private getFormFields() {
    //   this.loadSave = true;
    //   this.service.getFormFields().subscribe(formFields => {
    //     this.loadSave = false;
    //     this.formFields = formFields;
    //     if (this.mapping.type == 'Document') {
    //       this.getFields(this.mapping.id);
    //     } else if (this.mapping.type == 'Route') {
    //       this.routesService.getRouteRulesData(this.mapping.id).subscribe(rules => {
    //         rules.forEach(rule => {
    //           this.getFields(rule.document_id);
    //         });
    //       });
    //     }
    //   }, err => {
    //     this.loadSave = false;
    //   });
    // }
    // private getFields(documentId: any) {
    //   this.loadSave = true;
    //   this.service.getDocument(documentId).subscribe(doc => {
    //     this.documents.push(doc);
    //     this.routesService.getDocumentFields(documentId).subscribe(documentFields => {
    //       this.loadSave = false;
    //       documentFields.forEach(item => {
    //         this.documentFields.push({ fieldName: item, documentName: doc.name, mappings: [] });
    //       });
    //       this.getMappings(doc);
    //     }, err => {
    //       this.loadSave = false;
    //     });
    //   });
    // }
    DocumentMakerAddEditSubModuleMappingComponent.prototype.getMappings = function (document) {
        var _this = this;
        this.loadSave = true;
        this.mapping.mappings.forEach(function (dbMapping) {
            _this.documentFields.forEach(function (item) {
                if (dbMapping.fieldName == item.fieldName) {
                    var properMapping = dbMapping.mappings.map(function (m) {
                        var temp = _this.formFields.filter(function (t) { return t.formFieldId == m.formFieldId; });
                        return temp[0];
                    });
                    item.mappings = properMapping;
                    _this.prevdocumentFields.push({ fieldName: dbMapping.fieldName, documentId: document.documentId, documentName: document.name, mappings: properMapping });
                }
            });
        });
        if (this.mapping.type == "Document") {
            var obj = this.documents.filter(function (d) { return d.id == _this.mapping.id; })[0];
            this.selectedObjectId = { name: obj.name, id: obj.id };
        }
        else if (this.mapping.type == "Route") {
            var obj = this.dataRoutes.filter(function (d) { return d.id == _this.mapping.id; })[0];
            this.selectedObjectId = { name: obj.name, id: obj.id };
        }
        this.loadSave = false;
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.submit = function () {
        var _this = this;
        debugger;
        var finalFields = [];
        finalFields = this.documentFields.filter(function (item) { return item.mappings && item.mappings.length > 0; });
        this.prevdocumentFields.forEach(function (item) {
            if (finalFields.filter(function (final) { return final.fieldName == item.fieldName; }).length == 0) {
                item.mappings = [];
                finalFields.push(item);
            }
        });
        this.mapping.mappings = finalFields;
        if (this.action == "Update") {
            if (this.mapping.type == "Document") {
                var data = this.mapping.objectId.map(function (x) { return x.value; });
                this.mapping.objectId = JSON.stringify(data);
            }
            else {
                this.mapping.objectId = this.selectedObjectId.value;
            }
        }
        console.log("submit", JSON.stringify(this.mapping));
        this.service.AddEditDocumentMapping(this.mapping).subscribe(function (resp) {
            if (resp.message == "success") {
                if (_this.action == "Update") {
                    _this.toaster.success("Mapping have been update successfully");
                }
                else {
                    _this.toaster.success("Mapping have been saved successfully");
                }
                _this.router.navigateByUrl("/document-maker-submodule-mapping");
            }
        }, function (err) {
            _this.loadSave = false;
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.onChange = function (event, field) {
        this.documentFields.forEach(function (docField) {
            if (docField == field) {
                docField.mappings = event;
            }
        });
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.onTypeSelection = function (event) {
        debugger;
        this.mapping.type = event.target.value;
        this.clearFields();
        this.mapping.objectId = 0;
        this.selectedObjectId = {};
    };
    DocumentMakerAddEditSubModuleMappingComponent.prototype.clearFields = function () {
        this.mapping.mappings = [];
        this.documentFields = [];
        this.prevdocumentFields = [];
        this.documentList = [];
    };
    DocumentMakerAddEditSubModuleMappingComponent.ctorParameters = function () { return [
        { type: _document_maker_sub_module_mapping_service__WEBPACK_IMPORTED_MODULE_5__["DocumentMakerSubModuleMappingService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] }
    ]; };
    DocumentMakerAddEditSubModuleMappingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-document-maker-add-edit-sub-module-mapping',
            template: __importDefault(__webpack_require__(/*! raw-loader!./document-maker-add-edit-sub-module-mapping.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-sub-module-mapping/document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./document-maker-add-edit-sub-module-mapping.component.scss */ "./src/app/views/document-maker-sub-module-mapping/document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_document_maker_sub_module_mapping_service__WEBPACK_IMPORTED_MODULE_5__["DocumentMakerSubModuleMappingService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"]])
    ], DocumentMakerAddEditSubModuleMappingComponent);
    return DocumentMakerAddEditSubModuleMappingComponent;
}());



/***/ }),

/***/ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component.scss":
/*!******************************************************************************************************************************************************!*\
  !*** ./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component.scss ***!
  \******************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2RvY3VtZW50LW1ha2VyLXN1Yi1tb2R1bGUtbWFwcGluZy9kb2N1bWVudC1tYWtlci1zdWItbW9kdWxlLW1hcHBpbmctbGlzdC9kb2N1bWVudC1tYWtlci1zdWItbW9kdWxlLW1hcHBpbmctbGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component.ts":
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component.ts ***!
  \****************************************************************************************************************************************************/
/*! exports provided: DocumentMakerSubModuleMappingListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerSubModuleMappingListComponent", function() { return DocumentMakerSubModuleMappingListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _document_maker_sub_module_mapping_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../document-maker-sub-module-mapping.service */ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping.service.ts");
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






var DocumentMakerSubModuleMappingListComponent = /** @class */ (function () {
    function DocumentMakerSubModuleMappingListComponent(commonService, documentMakerSubModuleMappingService, toaster, dialogService) {
        this.commonService = commonService;
        this.documentMakerSubModuleMappingService = documentMakerSubModuleMappingService;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.moduleName = '';
        this.subModuleName = '';
        this.searchTxt = '';
        this.listFilter = '';
        this.listFiltertext = '';
        this.selected = [];
        this.loading = false;
        this.sortColumn = 'Id';
        this.sortDir = 'desc';
        this.offset = 1;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["SelectionType"];
    }
    DocumentMakerSubModuleMappingListComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 15;
        this.refresh();
    };
    DocumentMakerSubModuleMappingListComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    DocumentMakerSubModuleMappingListComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "name like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    DocumentMakerSubModuleMappingListComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.documentMakerSubModuleMappingService.GetDoumentMakerSubModuleMappingList(this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.listFilter).subscribe(function (response) {
            debugger;
            _this.pagedData = _this.documentMakerSubModuleMappingService.pagedData;
            _this.offset = 1;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    DocumentMakerSubModuleMappingListComponent.prototype.reset = function () {
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.refresh();
    };
    DocumentMakerSubModuleMappingListComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    DocumentMakerSubModuleMappingListComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    DocumentMakerSubModuleMappingListComponent.prototype.onSelect = function (_a) {
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
    DocumentMakerSubModuleMappingListComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Document Mapping?";
            this.dialogService.confirm('Delete Document Mapping(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.documentMakerSubModuleMappingService.deleteAll(_this.deleteId).subscribe(function (r) {
                        _this.toaster.success("Document Mapping(s) has been deleted successfully.");
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
    DocumentMakerSubModuleMappingListComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Document Mapping \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete Route/Rule ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.documentMakerSubModuleMappingService.delete(row.Id).subscribe(function (result) {
                    if (result.statusCode == 200) {
                        _this.toaster.success(result.responseMessage);
                        _this.refresh();
                    }
                    else {
                        _this.toaster.error(result.responseMessage);
                    }
                });
            }
        });
    };
    DocumentMakerSubModuleMappingListComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _document_maker_sub_module_mapping_service__WEBPACK_IMPORTED_MODULE_5__["DocumentMakerSubModuleMappingService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] }
    ]; };
    DocumentMakerSubModuleMappingListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-document-maker-sub-module-mapping-list',
            template: __importDefault(__webpack_require__(/*! raw-loader!./document-maker-sub-module-mapping-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./document-maker-sub-module-mapping-list.component.scss */ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _document_maker_sub_module_mapping_service__WEBPACK_IMPORTED_MODULE_5__["DocumentMakerSubModuleMappingService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"]])
    ], DocumentMakerSubModuleMappingListComponent);
    return DocumentMakerSubModuleMappingListComponent;
}());



/***/ }),

/***/ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-routing.module.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-routing.module.ts ***!
  \*************************************************************************************************************/
/*! exports provided: DocumentMakerSubModuleMappingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerSubModuleMappingRoutingModule", function() { return DocumentMakerSubModuleMappingRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _document_maker_add_edit_sub_module_mapping_document_maker_add_edit_sub_module_mapping_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component */ "./src/app/views/document-maker-sub-module-mapping/document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component.ts");
/* harmony import */ var _document_maker_sub_module_mapping_list_document_maker_sub_module_mapping_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component */ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component.ts");
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
    { path: '', component: _document_maker_sub_module_mapping_list_document_maker_sub_module_mapping_list_component__WEBPACK_IMPORTED_MODULE_3__["DocumentMakerSubModuleMappingListComponent"] },
    { path: 'editdocumentmapping/:id', component: _document_maker_add_edit_sub_module_mapping_document_maker_add_edit_sub_module_mapping_component__WEBPACK_IMPORTED_MODULE_2__["DocumentMakerAddEditSubModuleMappingComponent"] },
    { path: 'adddocumentmapping', component: _document_maker_add_edit_sub_module_mapping_document_maker_add_edit_sub_module_mapping_component__WEBPACK_IMPORTED_MODULE_2__["DocumentMakerAddEditSubModuleMappingComponent"] },
];
var DocumentMakerSubModuleMappingRoutingModule = /** @class */ (function () {
    function DocumentMakerSubModuleMappingRoutingModule() {
    }
    DocumentMakerSubModuleMappingRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DocumentMakerSubModuleMappingRoutingModule);
    return DocumentMakerSubModuleMappingRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping.module.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping.module.ts ***!
  \*****************************************************************************************************/
/*! exports provided: DocumentMakerSubModuleMappingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerSubModuleMappingModule", function() { return DocumentMakerSubModuleMappingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _document_maker_sub_module_mapping_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./document-maker-sub-module-mapping-routing.module */ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-routing.module.ts");
/* harmony import */ var _document_maker_sub_module_mapping_list_document_maker_sub_module_mapping_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component */ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping-list/document-maker-sub-module-mapping-list.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _document_maker_add_edit_sub_module_mapping_document_maker_add_edit_sub_module_mapping_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component */ "./src/app/views/document-maker-sub-module-mapping/document-maker-add-edit-sub-module-mapping/document-maker-add-edit-sub-module-mapping.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var DocumentMakerSubModuleMappingModule = /** @class */ (function () {
    function DocumentMakerSubModuleMappingModule() {
    }
    DocumentMakerSubModuleMappingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_document_maker_sub_module_mapping_list_document_maker_sub_module_mapping_list_component__WEBPACK_IMPORTED_MODULE_3__["DocumentMakerSubModuleMappingListComponent"], _document_maker_add_edit_sub_module_mapping_document_maker_add_edit_sub_module_mapping_component__WEBPACK_IMPORTED_MODULE_6__["DocumentMakerAddEditSubModuleMappingComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _document_maker_sub_module_mapping_routing_module__WEBPACK_IMPORTED_MODULE_2__["DocumentMakerSubModuleMappingRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalModule"].forRoot()
            ]
        })
    ], DocumentMakerSubModuleMappingModule);
    return DocumentMakerSubModuleMappingModule;
}());



/***/ }),

/***/ "./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping.service.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/views/document-maker-sub-module-mapping/document-maker-sub-module-mapping.service.ts ***!
  \******************************************************************************************************/
/*! exports provided: DocumentMakerSubModuleMappingService, DocumentSubModuleMapping, Documents, DocumentSubModuleMappingField, FormField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerSubModuleMappingService", function() { return DocumentMakerSubModuleMappingService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentSubModuleMapping", function() { return DocumentSubModuleMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Documents", function() { return Documents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentSubModuleMappingField", function() { return DocumentSubModuleMappingField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormField", function() { return FormField; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
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





var DocumentMakerSubModuleMappingService = /** @class */ (function () {
    function DocumentMakerSubModuleMappingService(http, fb) {
        this.http = http;
        this.fb = fb;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].WebApiBaseUrl;
        this.SolRuleEngine = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].WebApiBaseUrl + "DocumentMakerSubModuleMapping";
        this.moduleUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].WebApiBaseUrl + "Modules";
    }
    DocumentMakerSubModuleMappingService.prototype.GetDoumentMakerSubModuleMappingList = function (sortColumn, sortDir, page, pageSize, filter) {
        var _this = this;
        return this.http.get(this.baseUri + "DocumentMakerSubModuleMapping/GetList?SortColumn=" + sortColumn + "&SortDir=" + sortDir + "&PageNo=" + page + "&PageSize=" + pageSize + "&Filter=" + filter)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    DocumentMakerSubModuleMappingService.prototype.delete = function (id) {
        return this.http.get(this.baseUri + ("DocumentMakerSubModuleMapping/Delete?id=" + id));
    };
    DocumentMakerSubModuleMappingService.prototype.deleteAll = function (ids) {
        return this.http.get(this.baseUri + ("DocumentMakerSubModuleMapping/MultiDelete?ids=" + ids));
    };
    DocumentMakerSubModuleMappingService.prototype.getMapping = function (mappingId) {
        return this.http.get(this.baseUri + "DocumentMakerSubModuleMapping/GetDocumentMappingById?id=" + mappingId);
    };
    DocumentMakerSubModuleMappingService.prototype.getSubModulesList = function () {
        return this.http.get(this.baseUri + "DocumentMakerSubModuleMapping/GetSubModuleList");
    };
    DocumentMakerSubModuleMappingService.prototype.getDocumentList = function (moduleId, subModuleId) {
        return this.http.get(this.baseUri + "DocumentMakerSubModuleMapping/GetDocumentList?moduleId=" + moduleId + "&subModuleId=" + subModuleId);
    };
    DocumentMakerSubModuleMappingService.prototype.GetRoutesList = function (moduleId, subModuleId) {
        return this.http.get(this.baseUri + "DocumentMakerSubModuleMapping/GetRoutesList?moduleId=" + moduleId + "&subModuleId=" + subModuleId);
    };
    DocumentMakerSubModuleMappingService.prototype.GetRouteDocumentAndFieldsList = function (routeId) {
        return this.http.get(this.baseUri + "DocumentMakerSubModuleMapping/GetRouteDocumentList?routeId=" + routeId);
    };
    DocumentMakerSubModuleMappingService.prototype.GetDocumentAndFieldsByDocumentIdsList = function (data) {
        return this.http.get(this.baseUri + "DocumentMakerSubModuleMapping/GetMappingFieldsList?data=" + data);
    };
    DocumentMakerSubModuleMappingService.prototype.AddEditDocumentMapping = function (data) {
        return this.http.post(this.baseUri + "DocumentMakerSubModuleMapping/AddDocumentMapping", data);
    };
    DocumentMakerSubModuleMappingService.prototype.getCustomFieldsList = function (moduleId, subModuleId) {
        return this.http.get(this.baseUri + "DocumentMakerSubModuleMapping/GetCustomFieldsList?moduleId=" + moduleId + "&subModuleId=" + subModuleId);
    };
    DocumentMakerSubModuleMappingService.prototype.getDocumentBytes = function (path) {
        return this.http.get(this.baseUri + "DocumentMakerSubModuleMapping/GetDocumentBytes?path=" + path);
    };
    DocumentMakerSubModuleMappingService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }
    ]; };
    DocumentMakerSubModuleMappingService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], DocumentMakerSubModuleMappingService);
    return DocumentMakerSubModuleMappingService;
}());

var DocumentSubModuleMapping = /** @class */ (function () {
    function DocumentSubModuleMapping() {
        this.objectId = '';
        this.subModuleIdDb = '';
        this.name = '';
        this.type = '';
        this.id = 0;
        this.statusId = {};
        this.statusIdDb = 1001;
        this.subModuleId = '';
        this.moduleId = '';
        this.documentList = [];
        this.mappings = [];
    }
    return DocumentSubModuleMapping;
}());

var Documents = /** @class */ (function () {
    function Documents() {
        this.id = 0;
        this.name = '';
        this.path = '';
        this.type = '';
        this.fileUrl = '';
    }
    return Documents;
}());

var DocumentSubModuleMappingField = /** @class */ (function () {
    function DocumentSubModuleMappingField() {
        this.fieldName = "";
        this.documentName = "";
        this.documentId = "";
        this.mappings = [];
    }
    return DocumentSubModuleMappingField;
}());

var FormField = /** @class */ (function () {
    function FormField() {
        this.moduleId = 0;
        this.subModuleId = 0;
        this.formFieldId = "";
        this.formFieldName = "";
        this.tableName = "";
        this.displayName = "";
    }
    return FormField;
}());



/***/ })

}]);
//# sourceMappingURL=views-document-maker-sub-module-mapping-document-maker-sub-module-mapping-module.js.map