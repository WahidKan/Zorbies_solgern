(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-customerallforms-customerdocument-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/customerallforms/customerdocumentlist.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/customerallforms/customerdocumentlist.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-10 mt-3\">\r\n          <span class=\"dash\">Financial Documents</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\">Financial Documents</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n                    <app-upload [isCustomerAllForms]=\"isCustomerAllForms\" [prefixNameOfDocument]=\"LeaseNum\" \r\n                                calledFrom=\"CustomerAllForms\"></app-upload>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/customerallforms/customerdocument-routing.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/customerallforms/customerdocument-routing.module.ts ***!
  \***************************************************************************/
/*! exports provided: CustomerDocumentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerDocumentRoutingModule", function() { return CustomerDocumentRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _customerdocumentlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customerdocumentlist.component */ "./src/app/views/customerallforms/customerdocumentlist.component.ts");
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
    { path: '', component: _customerdocumentlist_component__WEBPACK_IMPORTED_MODULE_2__["CustomerdocumentlistComponent"] },
];
var CustomerDocumentRoutingModule = /** @class */ (function () {
    function CustomerDocumentRoutingModule() {
    }
    CustomerDocumentRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CustomerDocumentRoutingModule);
    return CustomerDocumentRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/customerallforms/customerdocument.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/customerallforms/customerdocument.module.ts ***!
  \*******************************************************************/
/*! exports provided: CustomerDocumentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerDocumentModule", function() { return CustomerDocumentModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _customerdocument_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customerdocument-routing.module */ "./src/app/views/customerallforms/customerdocument-routing.module.ts");
/* harmony import */ var _customerdocumentlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customerdocumentlist.component */ "./src/app/views/customerallforms/customerdocumentlist.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var CustomerDocumentModule = /** @class */ (function () {
    function CustomerDocumentModule() {
    }
    CustomerDocumentModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            declarations: [
                _customerdocumentlist_component__WEBPACK_IMPORTED_MODULE_2__["CustomerdocumentlistComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _customerdocument_routing_module__WEBPACK_IMPORTED_MODULE_1__["CustomerDocumentRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
            ]
        })
    ], CustomerDocumentModule);
    return CustomerDocumentModule;
}());



/***/ }),

/***/ "./src/app/views/customerallforms/customerdocumentlist.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/views/customerallforms/customerdocumentlist.component.scss ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2N1c3RvbWVyYWxsZm9ybXMvY3VzdG9tZXJkb2N1bWVudGxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/customerallforms/customerdocumentlist.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/views/customerallforms/customerdocumentlist.component.ts ***!
  \**************************************************************************/
/*! exports provided: CustomerdocumentlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerdocumentlistComponent", function() { return CustomerdocumentlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _contact_contact_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contact/contact.service */ "./src/app/views/contact/contact.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
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






var CustomerdocumentlistComponent = /** @class */ (function () {
    function CustomerdocumentlistComponent(commonService, contactService, route, dialogService, router, toaster) {
        this.commonService = commonService;
        this.contactService = contactService;
        this.route = route;
        this.dialogService = dialogService;
        this.router = router;
        this.toaster = toaster;
        this.isLoading = false;
        this.loadSave = false;
        //IsUserValid = true;
        this.isCustomerAllForms = true;
    }
    CustomerdocumentlistComponent.prototype.ngOnInit = function () {
    };
    CustomerdocumentlistComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _contact_contact_service__WEBPACK_IMPORTED_MODULE_4__["ContactService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"] }
    ]; };
    CustomerdocumentlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customerdocumentlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./customerdocumentlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/customerallforms/customerdocumentlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./customerdocumentlist.component.scss */ "./src/app/views/customerallforms/customerdocumentlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _contact_contact_service__WEBPACK_IMPORTED_MODULE_4__["ContactService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"]])
    ], CustomerdocumentlistComponent);
    return CustomerdocumentlistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-customerallforms-customerdocument-module.js.map