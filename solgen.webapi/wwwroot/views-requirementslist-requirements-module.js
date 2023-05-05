(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-requirementslist-requirements-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/requirementslist/addeditrequirements/addeditrequirements.component.html":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/requirementslist/addeditrequirements/addeditrequirements.component.html ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #addEditRequirementPopup=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info req_pop\" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row  mb-2\">\r\n            <div class=\"col-12 col-md-12 col-lg-12\"><h3 class=\"form-heading ng-star-inserted ml-0 mt-0\"><span>Information:</span></h3></div>\r\n\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Requirement Name:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Requirement Name\" formControlName=\"requirementName\">\r\n                <small *ngIf=\"requirementName.invalid && (requirementName.dirty || requirementName.touched) && requirementName.errors?.required\"\r\n                       style=\"color:red;\">Please select Requirement Name</small>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Pertains To:</label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstPertainsTo\"\r\n                           placeholder=\"None\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"pertainsTo\" [closeOnSelect]=\"true\">\r\n                </ng-select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Record Type:<span class=\"text-danger\"></span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"recordType\" disabled>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Required by:</label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstRequiredBy\"\r\n                           placeholder=\"None\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"requiredby\" [closeOnSelect]=\"true\">\r\n                </ng-select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Type:</label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstType\"\r\n                           placeholder=\"None\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"type\" [closeOnSelect]=\"true\">\r\n                </ng-select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Service Territory:</label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"lstServiceTerritory\"\r\n                           placeholder=\"None\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"serviceTerritory\" [closeOnSelect]=\"true\">\r\n                </ng-select>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Is Active:</label>\r\n              <div class=\"form-group\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" id=\"customCheck1\" formControlName=\"isActive\">\r\n                  <span class=\"slider round\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Description:</label>\r\n              <div class=\"form-group\">\r\n                <textarea type=\"text\" class=\"form-control\" formControlName=\"description\"></textarea>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row mb-2\">\r\n            <div class=\"col-12 col-md-12 col-lg-12\"><h3 class=\"form-heading ng-star-inserted ml-0 mt-0\"><span>Requirement Process Information:</span></h3></div>\r\n\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Permitting Cost:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Please enter Permitting Cost\" formControlName=\"permittingCost\">\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>How to call for Inspection:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"callforInspection\">\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Approval Duration (days):</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"approvalDuration\">\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>How to submit for PTO:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"submitforPTO\">\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Duration to get Meter installed:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"meterInstalled\">\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>How Approval will be Received:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"approvalReceived\">\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Notes:</label>\r\n              <div class=\"form-group\">\r\n                <textarea type=\"text\" class=\"form-control\" formControlName=\"Notes\"></textarea>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row mb-2\">\r\n            <div class=\"col-12 col-md-12 col-lg-12\"><h3 class=\"form-heading ng-star-inserted ml-0 mt-0\"><span>System Information:</span></h3></div>\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>External ID:</label>\r\n              <div class=\"form-group\">\r\n                <textarea type=\"text\" class=\"form-control\" formControlName=\"externalID\"></textarea>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Owner:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"Owner\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/requirementslist/requirementslist.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/requirementslist/requirementslist.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Requirements</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Requirements</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"clearfix\"></div>\r\n\r\n<div>\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12 portlets\">\r\n      <div class=\"panel\">\r\n        <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n          <div class=\"row mt-2\">\r\n            <div class=\"col-md-12 col-xl-8\">\r\n              <div class=\"row searchfield\">\r\n                <div class=\"col-lg-3 float-left mb-lg-0 mb-2\">\r\n                  <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n                </div>\r\n                <div class=\"col-lg-6 float-left pl-3 pl-lg-0\">\r\n                  <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i></span></a>\r\n                  <a class=\"btn btn-danger form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i></span></a>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-xl-4\">\r\n              <div class=\"dt-buttons\">\r\n                <a *ngIf='isAdd' class=\"btn btn-success mr-1\" (click)=\"showAddRequirementModel()\" href=\"javascript:void(0);\" tooltip=\"Add Requirement\"><i class=\"fa fa-plus\"></i></a>\r\n                <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i></span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n          <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                         [rows]=\"requirementListingData.data\"\r\n                         [columnMode]=\"'force'\"\r\n                         [headerHeight]=\"40\"\r\n                         [footerHeight]=\"40\"\r\n                         [scrollbarH]=\"true\"\r\n                         [rowHeight]=\"'40'\"\r\n                         [externalPaging]=\"true\"\r\n                         [externalSorting]=\"true\"\r\n                         [loadingIndicator]=\"loadSave\"\r\n                         [count]=\"requirementListingData.pager.totalItems\"\r\n                         [offset]=\"requirementListingData.pager.curPage\"\r\n                         [limit]=\"requirementListingData.pager.pageSize\"\r\n                         (page)='setPage($event)'\r\n                         (sort)=\"onSort($event)\"\r\n                         [selectionType]=\"SelectionType.checkbox\"\r\n                         [selectAllRowsOnPage]=\"false\"\r\n                         [selected]=\"selected\"\r\n                         (select)=\"onSelect($event)\">\r\n            <ngx-datatable-column [width]=\"42\"\r\n                                  [sortable]=\"false\"\r\n                                  [canAutoResize]=\"false\"\r\n                                  [draggable]=\"false\"\r\n                                  [resizeable]=\"false\"\r\n                                  [headerCheckboxable]=\"true\"\r\n                                  [checkboxable]=\"true\">\r\n            </ngx-datatable-column>\r\n\r\n\r\n            <ngx-datatable-column name=\"Requirement Name\" prop=\"Name\" [sortable]=\"true\"></ngx-datatable-column>\r\n            <ngx-datatable-column name=\"Pertains To\" prop=\"pertainName\" [sortable]=\"true\"></ngx-datatable-column>\r\n            <ngx-datatable-column name=\"Record Type\" prop=\"RecordTypeName__c\" [sortable]=\"true\"></ngx-datatable-column>\r\n            <ngx-datatable-column name=\"Type\" prop=\"typeName\" [sortable]=\"true\"></ngx-datatable-column>\r\n            <ngx-datatable-column name=\"Service Territory\" prop=\"serviceTerritoryName\" [sortable]=\"true\"></ngx-datatable-column>\r\n            <ngx-datatable-column name=\"Status\" [sortable]=\"true\" prop=\"isActive\" [maxWidth]=\"100\" headerClass=\"text-center\">\r\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                <div>\r\n                  <span class=\"status-box bg-success\" *ngIf=\"row.isActive == 1\">Active</span>\r\n                  <span class=\"status-box bg-danger\" *ngIf=\"row.isActive == 0\">InActive</span>\r\n                </div>\r\n              </ng-template>\r\n            </ngx-datatable-column>\r\n\r\n            <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"100\" headerClass=\"text-center\">\r\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                <div class=\"text-center\">\r\n                  <a *ngIf='isUpdate' (click)=\"editRequirement(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                  <a *ngIf='isDelete' title=\"Click to delete.\" (click)=\"DeleteRequirement(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                </div>\r\n              </ng-template>\r\n            </ngx-datatable-column>\r\n            <ngx-datatable-footer>\r\n              <ng-template ngx-datatable-footer-template\r\n                           let-rowCount=\"rowCount\"\r\n                           let-pageSize=\"pageSize\"\r\n                           let-selectedCount=\"selectedCount\"\r\n                           let-curPage=\"curPage\"\r\n                           let-offset=\"offset\"\r\n                           let-isVisible=\"isVisible\">\r\n                <div>\r\n                  <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                    <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                      <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                 bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                  {{commonService.PageString(requirementListingData.pager.currentPage,requirementListingData.pager.pageSize,rowCount)}}\r\n                </div>\r\n                <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                 [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                 [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                 [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                 [page]=\"requirementListingData.pager.currentPage\"\r\n                                 [size]=\"pageSizeValue\"\r\n                                 [count]=\"requirementListingData.pager.totalItems\"\r\n                                 [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                 (change)=\"setPage($event)\">\r\n                </datatable-pager>\r\n\r\n\r\n              </ng-template>\r\n            </ngx-datatable-footer>\r\n          </ngx-datatable>\r\n        </div>\r\n\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n</div>\r\n\r\n\r\n<!--=========================================  newRequirementPopup ===============================================-->\r\n\r\n<div class=\"modal fade in show\" bsModal #newRequirementPopup=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"Closemodel()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"height:100%;\">\r\n\r\n        <div class=\"login-container\">\r\n          <div class=\"login-main\">\r\n            <div class=\"login-box req_bx\">\r\n\r\n              <form [formGroup]=\"newRequirementForm\" autocomplete=\"off\">\r\n                <div class=\"row mb-2\">\r\n                  <div class=\"col-md-1\">\r\n                  </div>\r\n                  <div class=\"col-md-11\">\r\n                    <label>Select a record type:</label>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-3\">\r\n\r\n                  </div>\r\n                  <div class=\"col-md-9\">\r\n                    <div class=\"custom-control custom-radio custom-control-inline\">\r\n                      <input id=\"isTrackable\" formControlName=\"isCheckBox\" value=\"0\" type=\"radio\">\r\n                      <label for=\"isTrackable\" class=\"radio-label\">Trackable   <p>For requirments that use status or date tracking </p></label>\r\n                    </div>\r\n\r\n                    <div class=\"ustom-control custom-radio custom-control-inline\">\r\n                      <input id=\"isInformational\" formControlName=\"isCheckBox\" value=\"1\" type=\"radio\">\r\n                      <label for=\"isInformational\" class=\"radio-label\">Informational <p>For requiments that do not require status or date tracking</p></label>\r\n                    </div>\r\n\r\n                  </div>\r\n\r\n                </div>\r\n\r\n\r\n\r\n\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <a class=\"btn btn-success text-white mr-2\" (click)=\"openAddNewRequirementPopup()\"><i class=\"fa fa-save\"></i> Next</a>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"Closemodel()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--===============================================================================================================-->\r\n\r\n<!--================================================== Add Edit  RequirementPopup =======================================-->\r\n<app-addeditrequirements #addEditRequirementPopup (callGetRequirementListingData)=\"callRequirementListingData()\"></app-addeditrequirements>\r\n\r\n<!--======================================================================================================================-->\r\n\r\n\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n");

/***/ }),

/***/ "./src/app/views/requirementslist/addeditrequirements/addeditrequirements.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/views/requirementslist/addeditrequirements/addeditrequirements.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: AddeditrequirementsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditrequirementsComponent", function() { return AddeditrequirementsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _requirements_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../requirements.service */ "./src/app/views/requirementslist/requirements.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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






var AddeditrequirementsComponent = /** @class */ (function () {
    function AddeditrequirementsComponent(fb, requirementsService, commonService, el, toaster) {
        this.fb = fb;
        this.requirementsService = requirementsService;
        this.commonService = commonService;
        this.el = el;
        this.toaster = toaster;
        this.callGetRequirementListingData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.requirementModel = new _requirements_service__WEBPACK_IMPORTED_MODULE_3__["RequirementModel"]();
        this.loadSave = false;
    }
    AddeditrequirementsComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.GetlstPertainsTo();
        this.GetlstType();
        this.GetlstServiceTerritory();
        this.GetlstRequiredBy();
    };
    AddeditrequirementsComponent.prototype.show = function (row, recordType, id) {
        this.GetlstServiceTerritory();
        debugger;
        console.log("row", row);
        console.log("add", this.addForm);
        if (id == null) {
            this.addForm.reset();
            this.title = 'New Requirement';
            this.addForm.controls.recordType.setValue(recordType);
            this.modalAddEditRequirementPopup.show();
        }
        else {
            if (id != null) {
                this.title = "Edit Requirement ";
                this.addForm.patchValue({
                    id: row.Id,
                    Owner: row.CreatedBy,
                    description: row.Description,
                    isActive: row.isActive,
                    Notes: row.Notes,
                    requirementName: row.Name,
                    meterInstalled: row.MeterInstalled,
                    permittingCost: row.permittingCost,
                    submitforPTO: row.SubmitforPTO,
                    callforInspection: row.callforInspection,
                    approvalDuration: row.approvalDuration,
                    requiredby: row.Required_by__c,
                    recordType: row.RecordTypeName__c,
                    externalID: row.ExternalID,
                    approvalReceived: row.ApprovalReceived,
                    type: row.Type__c,
                    pertainsTo: row.PertainsTo != null ? row.PertainsTo.toString() : null,
                    serviceTerritory: row.serviceTerritoryId != null ? row.serviceTerritoryId.toString() : null,
                });
                this.modalAddEditRequirementPopup.show();
            }
        }
        console.log("this.addForm", this.addForm);
    };
    AddeditrequirementsComponent.prototype.close = function () {
        this.modalAddEditRequirementPopup.hide();
    };
    AddeditrequirementsComponent.prototype.Save = function () {
        var _this = this;
        debugger;
        if (this.addForm.valid) {
            this.loadSave = true;
            this.requirementModel.Id = this.addForm.value.id;
            this.requirementModel.requirementName = this.addForm.value.requirementName;
            this.requirementModel.pertainsTo = this.addForm.value.pertainsTo;
            this.requirementModel.recordType = this.addForm.value.recordType;
            this.requirementModel.requiredby = this.addForm.value.requiredby;
            this.requirementModel.type = this.addForm.value.type;
            this.requirementModel.serviceTerritory = this.addForm.value.serviceTerritory;
            this.requirementModel.isActive = this.addForm.value.isActive;
            this.requirementModel.description = this.addForm.value.description;
            this.requirementModel.permittingCost = this.addForm.value.permittingCost;
            this.requirementModel.callforInspection = this.addForm.value.callforInspection;
            this.requirementModel.approvalDuration = this.addForm.value.approvalDuration;
            this.requirementModel.submitforPTO = this.addForm.value.submitforPTO;
            this.requirementModel.meterInstalled = this.addForm.value.meterInstalled;
            this.requirementModel.approvalReceived = this.addForm.value.approvalReceived;
            this.requirementModel.Notes = this.addForm.value.Notes;
            this.requirementModel.externalID = this.addForm.value.externalID;
            this.requirementModel.Owner = this.addForm.value.Owner;
            this.requirementsService.addeditRequirement(this.requirementModel).subscribe(function (result) {
                debugger;
                if (result.statusCode == 200) {
                    _this.callGetRequirementListingData.emit();
                    _this.modalAddEditRequirementPopup.hide();
                    _this.loadSave = false;
                    _this.toaster.success(result.responseMessage);
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            });
        }
        else {
            for (var _i = 0, _a = Object.keys(this.addForm.controls); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.addForm.controls[key].invalid) {
                    var invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
                    console.log("sddasd", invalidControl);
                    invalidControl.focus();
                    break;
                }
            }
            this.commonService.validateAllFormFields(this.addForm);
        }
    };
    AddeditrequirementsComponent.prototype.initForm = function () {
        this.addForm = this.fb.group({
            id: [null],
            requirementName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            pertainsTo: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            requiredby: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            type: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            serviceTerritory: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            isActive: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            description: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            permittingCost: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            callforInspection: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            approvalDuration: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            submitforPTO: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            meterInstalled: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            approvalReceived: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            Notes: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            externalID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            Owner: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            recordType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
        });
    };
    Object.defineProperty(AddeditrequirementsComponent.prototype, "requirementName", {
        get: function () { return this.addForm.get('requirementName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "pertainsTo", {
        get: function () { return this.addForm.get('pertainsTo'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "requiredby", {
        get: function () { return this.addForm.get('requiredby'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "type", {
        get: function () { return this.addForm.get('type'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "serviceTerritory", {
        get: function () { return this.addForm.get('serviceTerritory'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "isActive", {
        get: function () { return this.addForm.get('isActive'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "description", {
        get: function () { return this.addForm.get('description'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "permittingCost", {
        get: function () { return this.addForm.get('permittingCost'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "callforInspection", {
        get: function () { return this.addForm.get('callforInspection'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "approvalDuration", {
        get: function () { return this.addForm.get('approvalDuration'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "submitforPTO", {
        get: function () { return this.addForm.get('submitforPTO'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "meterInstalled", {
        get: function () { return this.addForm.get('meterInstalled'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "approvalReceived", {
        get: function () { return this.addForm.get('approvalReceived'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "Notes", {
        get: function () { return this.addForm.get('Notes'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "externalID", {
        get: function () { return this.addForm.get('externalID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "Owner", {
        get: function () { return this.addForm.get('Owner'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditrequirementsComponent.prototype, "recordType", {
        get: function () { return this.addForm.get('recordType'); },
        enumerable: true,
        configurable: true
    });
    AddeditrequirementsComponent.prototype.GetlstPertainsTo = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PertainsTo").subscribe(function (result) {
            _this.lstPertainsTo = _this.commonService.masters;
        });
    };
    AddeditrequirementsComponent.prototype.GetlstType = function () {
        var _this = this;
        this.commonService.getMasterItemsList("Type").subscribe(function (result) {
            _this.lstType = _this.commonService.masters;
        });
    };
    AddeditrequirementsComponent.prototype.GetlstRequiredBy = function () {
        var _this = this;
        this.commonService.getMasterItemsList("Account").subscribe(function (result) {
            _this.lstRequiredBy = _this.commonService.masters;
        });
    };
    AddeditrequirementsComponent.prototype.GetlstServiceTerritory = function () {
        var _this = this;
        this.commonService.getMasterItemsList("ServiceTerritory").subscribe(function (result) {
            _this.lstServiceTerritory = _this.commonService.masters;
        });
    };
    AddeditrequirementsComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _requirements_service__WEBPACK_IMPORTED_MODULE_3__["RequirementsService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addEditRequirementPopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], AddeditrequirementsComponent.prototype, "modalAddEditRequirementPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AddeditrequirementsComponent.prototype, "callGetRequirementListingData", void 0);
    AddeditrequirementsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditrequirements',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditrequirements.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/requirementslist/addeditrequirements/addeditrequirements.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _requirements_service__WEBPACK_IMPORTED_MODULE_3__["RequirementsService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], AddeditrequirementsComponent);
    return AddeditrequirementsComponent;
}());



/***/ }),

/***/ "./src/app/views/requirementslist/requirements-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/requirementslist/requirements-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: RequirementsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequirementsRoutingModule", function() { return RequirementsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _requirementslist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./requirementslist.component */ "./src/app/views/requirementslist/requirementslist.component.ts");
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
    { path: '', component: _requirementslist_component__WEBPACK_IMPORTED_MODULE_3__["RequirementslistComponent"] }
];
var RequirementsRoutingModule = /** @class */ (function () {
    function RequirementsRoutingModule() {
    }
    RequirementsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
            ]
        })
    ], RequirementsRoutingModule);
    return RequirementsRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/requirementslist/requirements.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/requirementslist/requirements.module.ts ***!
  \***************************************************************/
/*! exports provided: RequirementsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequirementsModule", function() { return RequirementsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _requirementslist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./requirementslist.component */ "./src/app/views/requirementslist/requirementslist.component.ts");
/* harmony import */ var _requirements_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./requirements.service */ "./src/app/views/requirementslist/requirements.service.ts");
/* harmony import */ var _requirements_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./requirements-routing.module */ "./src/app/views/requirementslist/requirements-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _addeditrequirements_addeditrequirements_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./addeditrequirements/addeditrequirements.component */ "./src/app/views/requirementslist/addeditrequirements/addeditrequirements.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








var RequirementsModule = /** @class */ (function () {
    function RequirementsModule() {
    }
    RequirementsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_requirementslist_component__WEBPACK_IMPORTED_MODULE_2__["RequirementslistComponent"], _addeditrequirements_addeditrequirements_component__WEBPACK_IMPORTED_MODULE_7__["AddeditrequirementsComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _requirements_routing_module__WEBPACK_IMPORTED_MODULE_4__["RequirementsRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"]
            ],
            providers: [_requirements_service__WEBPACK_IMPORTED_MODULE_3__["RequirementsService"]],
            bootstrap: []
        })
    ], RequirementsModule);
    return RequirementsModule;
}());



/***/ }),

/***/ "./src/app/views/requirementslist/requirements.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/requirementslist/requirements.service.ts ***!
  \****************************************************************/
/*! exports provided: RequirementsService, RequirementModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequirementsService", function() { return RequirementsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequirementModel", function() { return RequirementModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
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



var RequirementsService = /** @class */ (function () {
    function RequirementsService(http) {
        this.http = http;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
    }
    RequirementsService.prototype.addeditRequirement = function (RequirementModel) {
        debugger;
        return this.http.post(this.baseUri + "workorder/AddeditRequirement", RequirementModel); //AddeditRequirement
    };
    RequirementsService.prototype.GetRequirementListingData = function (name, sortColumn, sortDir, page, pageSize) {
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "workorder/GetRequirementListingData?name=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize);
    };
    RequirementsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    RequirementsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], RequirementsService);
    return RequirementsService;
}());

var RequirementModel = /** @class */ (function () {
    function RequirementModel() {
        this.Id = "";
        this.requirementName = "";
        this.pertainsTo = "";
        this.recordType = "";
        this.requiredby = "";
        this.type = "";
        this.serviceTerritory = "";
        this.isActive = "";
        this.description = "";
        this.permittingCost = "";
        this.callforInspection = "";
        this.approvalDuration = "";
        this.submitforPTO = "";
        this.meterInstalled = "";
        this.approvalReceived = "";
        this.Notes = "";
        this.externalID = "";
        this.Owner = "";
    }
    return RequirementModel;
}());



/***/ }),

/***/ "./src/app/views/requirementslist/requirementslist.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/views/requirementslist/requirementslist.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlcXVpcmVtZW50c2xpc3QvcmVxdWlyZW1lbnRzbGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/requirementslist/requirementslist.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/views/requirementslist/requirementslist.component.ts ***!
  \**********************************************************************/
/*! exports provided: RequirementslistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequirementslistComponent", function() { return RequirementslistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _addeditrequirements_addeditrequirements_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addeditrequirements/addeditrequirements.component */ "./src/app/views/requirementslist/addeditrequirements/addeditrequirements.component.ts");
/* harmony import */ var _requirements_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./requirements.service */ "./src/app/views/requirementslist/requirements.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _workorder_workorderservice_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../workorder/workorderservice.service */ "./src/app/views/workorder/workorderservice.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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










var RequirementslistComponent = /** @class */ (function () {
    function RequirementslistComponent(fb, requirementsService, commonService, dialogService, workorderService, toaster) {
        this.fb = fb;
        this.requirementsService = requirementsService;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.workorderService = workorderService;
        this.toaster = toaster;
        this.listFilter = '';
        this.isAdd = true;
        this.isUpdate = true;
        this.isDelete = true;
        this.isEdit = true;
        this.loadSave = false;
        this.requirementListingData = {
            pager: {},
            data: []
        };
        this.tableName = 'tblAccountsRequirement_backup';
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'Id';
        this.selected = [];
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["SelectionType"];
    }
    RequirementslistComponent.prototype.ngOnInit = function () {
        this.listFilter = '';
        this.curPage = 1;
        this.pageSizeValue = 10;
        this.getListingGridData();
        this.initNewRequirementForm();
        this.getPageSizes();
    };
    RequirementslistComponent.prototype.updateFilter = function (event) {
        this.listFilter = event.target.value;
        this.curPage = 1;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.getListingGridData();
        }
    };
    RequirementslistComponent.prototype.getListingGridData = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.offset = 1;
        this.loadSave = true;
        this.requirementsService.GetRequirementListingData(this.listFilter, this.sortColumn, this.sortDir, this.curPage, this.pageSizeValue).subscribe(function (result) {
            _this.requirementListingData = result;
            _this.offset = 1;
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    RequirementslistComponent.prototype.search = function () {
        this.getListingGridData();
    };
    RequirementslistComponent.prototype.reset = function () {
        this.listFilter = '';
        this.curPage = 1;
        this.sortDir = 'desc';
        this.sortColumn = 'Id';
        this.getListingGridData();
    };
    RequirementslistComponent.prototype.initNewRequirementForm = function () {
        this.newRequirementForm = this.fb.group({
            isCheckBox: [''],
        });
    };
    ;
    Object.defineProperty(RequirementslistComponent.prototype, "isCheckBox", {
        get: function () { return this.newRequirementForm.get('isCheckBox'); },
        enumerable: true,
        configurable: true
    });
    RequirementslistComponent.prototype.showAddRequirementModel = function () {
        debugger;
        this.title = "New Requirement";
        this.newRequirementForm.reset({ isCheckBox: "0" });
        this.newRequirementModelPopup.show();
    };
    RequirementslistComponent.prototype.openAddNewRequirementPopup = function () {
        debugger;
        this.newRequirementModelPopup.hide();
        if (this.isCheckBox.value == 0) {
            this.recordType = 'Trackable';
        }
        else {
            this.recordType = 'Informational';
        }
        this.addEditRequirementPopup.show('', this.recordType, this.Id);
    };
    RequirementslistComponent.prototype.Closemodel = function () {
        this.newRequirementModelPopup.hide();
    };
    RequirementslistComponent.prototype.setPage = function ($event) {
        debugger;
        this.loading = true;
        var ab = $event.page;
        this.curPage = ab;
        this.getListingGridData();
    };
    RequirementslistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.getListingGridData();
    };
    RequirementslistComponent.prototype.editRequirement = function (row) {
        console.log("row", row);
        this.title = "Edit Skill";
        this.isEdit = true;
        this.addEditRequirementPopup.show(row, this.recordType, row.Id);
    };
    RequirementslistComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        debugger;
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
    RequirementslistComponent.prototype.onChange = function ($event) {
        this.curPage = 1;
        this.getListingGridData();
    };
    RequirementslistComponent.prototype.DeleteRequirement = function (row) {
        var _this = this;
        debugger;
        var message = "Are you sure you want to delete Requirement  \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete Requirement', message).subscribe(function (confirmed) {
            if (confirmed) {
                debugger;
                _this.workorderService.DeleteRecords(row.Id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Requirement \"" + row.Name + "\" has been deleted successfully");
                    _this.getListingGridData();
                }, function (error) {
                });
            }
        });
    };
    RequirementslistComponent.prototype.deleteAll = function () {
        var _this = this;
        debugger;
        console.log("this.deleteId", this.deleteId);
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete Requirement(s)\"";
            this.dialogService.confirm('Delete Requirement(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.workorderService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
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
    RequirementslistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    RequirementslistComponent.prototype.callRequirementListingData = function () {
        debugger;
        this.loadSave = true;
        this.getListingGridData();
        this.loadSave = false;
    };
    RequirementslistComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _requirements_service__WEBPACK_IMPORTED_MODULE_5__["RequirementsService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"] },
        { type: _workorder_workorderservice_service__WEBPACK_IMPORTED_MODULE_8__["WorkorderService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_9__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('newRequirementPopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__["ModalDirective"])
    ], RequirementslistComponent.prototype, "newRequirementModelPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addEditRequirementPopup', { static: false }),
        __metadata("design:type", _addeditrequirements_addeditrequirements_component__WEBPACK_IMPORTED_MODULE_4__["AddeditrequirementsComponent"])
    ], RequirementslistComponent.prototype, "addEditRequirementPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], RequirementslistComponent.prototype, "offset", void 0);
    RequirementslistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-requirementslist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./requirementslist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/requirementslist/requirementslist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./requirementslist.component.scss */ "./src/app/views/requirementslist/requirementslist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _requirements_service__WEBPACK_IMPORTED_MODULE_5__["RequirementsService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogService"],
            _workorder_workorderservice_service__WEBPACK_IMPORTED_MODULE_8__["WorkorderService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_9__["ToastrService"]])
    ], RequirementslistComponent);
    return RequirementslistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-requirementslist-requirements-module.js.map