(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-welcome-package-welcomepackage-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/welcome-package/generate-welcome-package.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/welcome-package/generate-welcome-package.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-9 mt-3\">\r\n          <span class=\"dash\">Generate Welcome Package</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/contact\">Manage Contacts</a></li>\r\n            <li class=\"breadcrumb-item\">Generate Welcome Package</li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col-md-3 mt-4 text-right\">\r\n          <button class=\"w-auto sw-100 btn btn-dark\" routerLink=\"/contact\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n        </div>\r\n      </div>\r\n    </div>   \r\n  </div>\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 mt-4\">\r\n              <div class=\"row\">\r\n                <div class=\"col-12 col-md-12 col-lg-12\">\r\n                  <label>Search Business Name:</label>\r\n                  <div class=\"form-group\">\r\n                    <app-search-as-type (onIdPicked)=\"fillContactForm($event)\"></app-search-as-type>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n            <div class=\"col-md-12\">\r\n              <form [formGroup]=\"contactForm\" autocomplete=\"off\">\r\n                <div class=\"row\">\r\n\r\n\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Business Name:</label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"contactBussinessName\" maxlength=\"500\" disabled />\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Business Tin:</label>\r\n                    <div class=\"form-group\">\r\n                      <p-inputMask styleClass=\"form-control\" mask=\"99-9999999\" formControlName=\"contactBussinessTIN\" disabled=\"true\">\r\n                      </p-inputMask>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Business Tin:</label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"contactBussinessTIN\" maxlength=\"9\" disabled />\r\n    </div>\r\n  </div>-->\r\n\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Type of Company:</label>\r\n                    <div class=\"form-group cus-arrow\">\r\n                      <ng-select [items]=\"lstcompanyType\"\r\n                                 bindValue=\"value\" bindLabel=\"text\" formControlName=\"contactTypeOfCompany\" disabled>\r\n                      </ng-select>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Business Phone:</label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"contactBussinessPhone\" maxlength=\"100\" disabled />\r\n    </div>\r\n  </div>-->\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Business Phone:</label>\r\n                    <div class=\"form-group\">\r\n                      <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"contactBussinessPhone\" disabled=\"true\"></p-inputMask>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-12 col-md-12 col-lg-12\">\r\n                    <label class=\"m-label-s\">CONTACT DETAIL:</label>\r\n                    <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n                  </div>\r\n\r\n\r\n\r\n                  <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Contact Phone:</label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"contactBussinessPhone\" maxlength=\"100\" disabled>\r\n                    </div>\r\n                  </div>-->\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Contact Phone:</label>\r\n                    <div class=\"form-group\">\r\n                      <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"contactBussinessPhone\" disabled=\"true\"></p-inputMask>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Contact First Name:</label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"contactFirstName\" maxlength=\"100\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Contact Last Name:</label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"contactLastName\" maxlength=\"100\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Contact Position:</label>\r\n                    <div class=\"form-group\">\r\n                      <input class=\"form-control\" type=\"text\" formControlName=\"contactPositionName\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Contact Email:</label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"contactEmail\" maxlength=\"200\" disabled>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-12 col-md-12 col-lg-12\">\r\n                    <label class=\"m-label-s\">Business Mailing Address:</label>\r\n                    <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n                  </div>\r\n\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Mailing Address:</label>\r\n                    <div class=\"form-group\">\r\n                      <textarea class=\"form-control\" formControlName=\"contactBussinessMailAddress\" maxlength=\"1000\" disabled></textarea>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>City:</label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"contactMailAddressCity\" maxlength=\"200\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>County:</label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"contactMailAddressCounty\" maxlength=\"500\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>State:</label>\r\n                    <div class=\"form-group cus-arrow\">\r\n                      <ng-select [items]=\"lstStates\"\r\n                                 bindValue=\"value\" bindLabel=\"text\" formControlName=\"contactMailAddressState\" disabled>\r\n                      </ng-select>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Zip:</label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"contactMailAddressZip\" maxlength=\"50\" disabled>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <!--<div class=\"col-12 col-md-12 col-lg-12\">\r\n                    <label class=\"m-label-s\">Business Physical Address:</label>\r\n                    <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n                  </div>-->\r\n\r\n                  <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <div class=\"custom-checkbox\">\r\n                      <label class=\"mr-3\">Physical Address:</label>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                      <textarea class=\"form-control\" formControlName=\"contactBussinessPhysicalAddress\" maxlength=\"1000\" disabled></textarea>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>City:</label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"contactPhysicalAddressCity\" maxlength=\"200\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>County:</label>\r\n                    <div class=\"form-group\">\r\n                      <input class=\"form-control\" type=\"text\" placeholder=\"\" formControlName=\"contactPhysicalAddressCounty\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>State:</label>\r\n                    <div class=\"form-group cus-arrow\">\r\n                      <ng-select [items]=\"lstStates\"\r\n                                 bindValue=\"value\" bindLabel=\"text\" formControlName=\"contactPhysicalAddressState\" disabled>\r\n                      </ng-select>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-4\">\r\n                    <label>Zip:</label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"contactPhysicalAddressZip\" maxlength=\"50\" disabled>\r\n                    </div>\r\n                  </div>-->\r\n\r\n                  <div class=\"col-12 col-md-12 col-lg-12\">\r\n                    <button (click)=\"generateWelcomePackage()\" [disabled]=\"isEmailTemplateReady\" class=\"btn btn-primary form-btns\" data-toggle=\"modal\" data-target=\"#headerpassword\"><i class=\"fas fa-archive\"></i> Generate Welcome Email</button>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>\r\n<div #welcomePackageModal class=\"modal fade\" id=\"headerpassword\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"headerexampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"welcome-box\" [ngClass]=\"{'disabled':loadSave}\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <h4 class=\"modal-title\" id=\"headerexampleModalLabel\">Email Preview</h4>\r\n          <button #closeButton type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <p [innerHTML]=\"emailTemplate\"></p>\r\n\r\n        </div>\r\n\r\n        <div class=\"modal-footer\">\r\n          <button type=\"submit\" class=\"btn btn-primary form-btns\" (click)=\"sendWelcomePackage();\"><i class=\"fas fa-paper-plane\"></i> Send Email</button>\r\n        </div>\r\n        <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n      </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n");

/***/ }),

/***/ "./src/app/views/welcome-package/generate-welcome-package.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/views/welcome-package/generate-welcome-package.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3dlbGNvbWUtcGFja2FnZS9nZW5lcmF0ZS13ZWxjb21lLXBhY2thZ2UuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/welcome-package/generate-welcome-package.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/views/welcome-package/generate-welcome-package.component.ts ***!
  \*****************************************************************************/
/*! exports provided: GenerateWelcomePackageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenerateWelcomePackageComponent", function() { return GenerateWelcomePackageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _contact_contact_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contact/contact.service */ "./src/app/views/contact/contact.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
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






var GenerateWelcomePackageComponent = /** @class */ (function () {
    function GenerateWelcomePackageComponent(_fb, contactService, commonService, toasterService) {
        this._fb = _fb;
        this.contactService = contactService;
        this.commonService = commonService;
        this.toasterService = toasterService;
        this.loadSave = false;
        this.isLoading = false;
        this.emailTemplate = '';
        this.isEmailTemplateReady = true;
        this.loadDropDowns();
        this.loadStateDropdown();
    }
    GenerateWelcomePackageComponent.prototype.ngOnInit = function () {
        this.contactForm = this._fb.group({
            contactId: [null],
            contactBussinessName: [''],
            contactBussinessMailAddress: [''],
            contactMailAddressCity: [''],
            contactMailAddressState: [null],
            contactMailAddressZip: [''],
            contactMailAddressCounty: [''],
            contactBussinessPhysicalAddress: [''],
            contactPhysicalAddressCity: [''],
            contactPhysicalAddressState: [null],
            contactPhysicalAddressZip: [''],
            contactBussinessPhone: [''],
            contactPhysicalAddressCounty: [''],
            contactBussinessTIN: [''],
            contactTypeOfCompany: [null],
            contactFirstName: [''],
            contactLastName: [''],
            contactEmail: [''],
            contactPosition: [null],
            contactPositionName: '',
            contactPreferredDocumentSignedBy: ['']
        });
        this.contactMailAddressState.disable();
        this.contactPhysicalAddressState.disable();
        this.contactTypeOfCompany.disable();
        this.contactPosition.disable();
    };
    GenerateWelcomePackageComponent.prototype.fillContactForm = function (id) {
        var _this = this;
        this.contactId = id;
        this.contactService.getContactDetails(id).subscribe(function (res) {
            _this.isEmailTemplateReady = false;
            _this.contactForm.patchValue({
                contactId: res.contactDetails[0].contactId,
                contactBussinessName: res.contactDetails[0].contactBussinessName,
                contactBussinessMailAddress: res.contactDetails[0].contactBussinessMailAddress,
                contactMailAddressCity: res.contactDetails[0].contactMailAddressCity,
                contactMailAddressState: res.contactDetails[0].contactMailAddressState,
                contactMailAddressZip: res.contactDetails[0].contactMailAddressZip,
                contactMailAddressCounty: res.contactDetails[0].contactMailAddressCounty,
                contactBussinessPhysicalAddress: res.contactDetails[0].contactBussinessPhysicalAddress,
                contactPhysicalAddressCity: res.contactDetails[0].contactPhysicalAddressCity,
                contactPhysicalAddressState: res.contactDetails[0].contactPhysicalAddressState,
                contactPhysicalAddressZip: res.contactDetails[0].contactPhysicalAddressZip,
                contactPhysicalAddressCounty: res.contactDetails[0].contactPhysicalAddressCounty,
                contactBussinessPhone: res.contactDetails[0].contactBussinessPhone,
                contactBussinessTIN: res.contactDetails[0].contactBussinessTIN,
                contactTypeOfCompany: res.contactDetails[0].contactTypeOfCompany,
                contactFirstName: res.contactDetails[0].contactFirstName,
                contactLastName: res.contactDetails[0].contactLastName,
                contactEmail: res.contactDetails[0].contactEmail,
                contactPosition: res.contactDetails[0].contactPosition,
                contactPositionName: '-',
                contactCreatedOn: res.contactDetails[0].contactCreatedOn,
            });
            var bussinessContactPosition = _this.commonService.masters.filter(function (x) { return x.masterName == "BussinessContactPosition"; });
            var position = bussinessContactPosition.find(function (m) { return m.value === res.contactDetails[0].contactPosition; });
            if (position !== null && typeof position !== 'undefined') {
                _this.contactForm.patchValue({
                    contactPositionName: position.text
                });
            }
        });
    };
    GenerateWelcomePackageComponent.prototype.loadDropDowns = function () {
        var _this = this;
        this.isLoading = true;
        this.commonService.getMasterItemsList("BussinessContactPosition,CompanyType").subscribe(function (result) {
            _this.lstcontactPosition = _this.commonService.masters.filter(function (x) { return x.masterName == "BussinessContactPosition"; });
            _this.lstcompanyType = _this.commonService.masters.filter(function (x) { return x.masterName == "CompanyType"; });
            _this.isLoading = false;
        });
    };
    GenerateWelcomePackageComponent.prototype.loadStateDropdown = function () {
        var _this = this;
        this.commonService.getStatesList().subscribe(function (res) {
            _this.lstStates = _this.commonService.states;
        });
    };
    GenerateWelcomePackageComponent.prototype.generateWelcomePackage = function () {
        var _this = this;
        this.contactService.getWelcomePackageEmail(this.contactId).subscribe(function (res) {
            _this.emailTemplate = res;
        });
    };
    GenerateWelcomePackageComponent.prototype.sendWelcomePackage = function () {
        var _this = this;
        this.loadSave = true;
        this.contactService.sendWelcomePackageEmail(this.contactId).subscribe(function (res) {
            var btn = _this.button.nativeElement;
            btn.click();
            if (res.statusCode == 200) {
                _this.toasterService.success(res.responseMessage);
                setTimeout(function () { _this.loadSave = false; }, 3000);
            }
            else {
                _this.loadSave = false;
                _this.toasterService.error(res.responseMessage);
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    Object.defineProperty(GenerateWelcomePackageComponent.prototype, "contactMailAddressState", {
        get: function () { return this.contactForm.get('contactMailAddressState'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GenerateWelcomePackageComponent.prototype, "contactPhysicalAddressState", {
        get: function () { return this.contactForm.get('contactPhysicalAddressState'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GenerateWelcomePackageComponent.prototype, "contactTypeOfCompany", {
        get: function () { return this.contactForm.get('contactTypeOfCompany'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GenerateWelcomePackageComponent.prototype, "contactPosition", {
        get: function () { return this.contactForm.get('contactPosition'); },
        enumerable: true,
        configurable: true
    });
    GenerateWelcomePackageComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _contact_contact_service__WEBPACK_IMPORTED_MODULE_2__["ContactService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('welcomePackageModal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalDirective"])
    ], GenerateWelcomePackageComponent.prototype, "modal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeButton', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], GenerateWelcomePackageComponent.prototype, "button", void 0);
    GenerateWelcomePackageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-generate-welcome-package',
            template: __importDefault(__webpack_require__(/*! raw-loader!./generate-welcome-package.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/welcome-package/generate-welcome-package.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./generate-welcome-package.component.scss */ "./src/app/views/welcome-package/generate-welcome-package.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _contact_contact_service__WEBPACK_IMPORTED_MODULE_2__["ContactService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], GenerateWelcomePackageComponent);
    return GenerateWelcomePackageComponent;
}());



/***/ }),

/***/ "./src/app/views/welcome-package/welcomepackage-routing.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/welcome-package/welcomepackage-routing.module.ts ***!
  \************************************************************************/
/*! exports provided: WelcomepackageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomepackageRoutingModule", function() { return WelcomepackageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _generate_welcome_package_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generate-welcome-package.component */ "./src/app/views/welcome-package/generate-welcome-package.component.ts");
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
    { path: '', component: _generate_welcome_package_component__WEBPACK_IMPORTED_MODULE_2__["GenerateWelcomePackageComponent"] }
];
var WelcomepackageRoutingModule = /** @class */ (function () {
    function WelcomepackageRoutingModule() {
    }
    WelcomepackageRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], WelcomepackageRoutingModule);
    return WelcomepackageRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/welcome-package/welcomepackage.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/welcome-package/welcomepackage.module.ts ***!
  \****************************************************************/
/*! exports provided: WelcomepackageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomepackageModule", function() { return WelcomepackageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _welcomepackage_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./welcomepackage-routing.module */ "./src/app/views/welcome-package/welcomepackage-routing.module.ts");
/* harmony import */ var _generate_welcome_package_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./generate-welcome-package.component */ "./src/app/views/welcome-package/generate-welcome-package.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var WelcomepackageModule = /** @class */ (function () {
    function WelcomepackageModule() {
    }
    WelcomepackageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_generate_welcome_package_component__WEBPACK_IMPORTED_MODULE_3__["GenerateWelcomePackageComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _welcomepackage_routing_module__WEBPACK_IMPORTED_MODULE_2__["WelcomepackageRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
            ]
        })
    ], WelcomepackageModule);
    return WelcomepackageModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-welcome-package-welcomepackage-module.js.map