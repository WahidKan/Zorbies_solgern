(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-add-insurance-add-insurance-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/add-insurance/add-insurance.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/add-insurance/add-insurance.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Manage Insurance Co.</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Manage Insurance Co.</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 mt-4\">\r\n              <form [formGroup]=\"addInsuranceForm\" autocomplete=\"off\">\r\n                <div class=\"emailTemplate-box\" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <div class=\"row\">\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12\">\r\n                      <label class=\"m-label-s\">Insurance Information:</label>\r\n                      <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Insurance Company Name:</label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"name\" maxlength=\"200\" [ngClass]=\"{'is-invalid': (name.invalid && (name.dirty || name.touched) && (name.errors?.required || name.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"addInsuranceForm.get('name').touched && addInsuranceForm.get('name').errors?.required\" class=\"text-danger\">\r\n                          Insurance Company Name is required\r\n                        </small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Insurance Phone:</label>\r\n                      <div class=\"form-group\">\r\n                        <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"phone\" placeholder=\"(___) ___-____\">\r\n                        </p-inputMask>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Insurance Phone:</label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"phone\" maxlength=\"100\" [ngClass]=\"{'is-invalid': (phone.invalid && (phone.dirty || phone.touched) && (phone.errors?.required || phone.errors?.maxlength)) }\">\r\n      <small *ngIf=\"addInsuranceForm.get('phone').touched && addInsuranceForm.get('phone').errors?.required\" class=\"text-danger\">\r\n        Insurance Phone is required\r\n      </small>\r\n      <small *ngIf=\"addInsuranceForm.get('phone').touched && addInsuranceForm.get('phone').errors?.pattern\"\r\n             class=\"text-danger\">Please enter valid phone<br /></small>\r\n    </div>\r\n  </div>-->\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Insurance Agent Name:</label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"agentName\" maxlength=\"200\" [ngClass]=\"{'is-invalid': (agentName.invalid && (agentName.dirty || agentName.touched) && (agentName.errors?.required || agentName.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"addInsuranceForm.get('agentName').touched && addInsuranceForm.get('agentName').errors?.required\" class=\"text-danger\">\r\n                          Insurance Agent Name is required\r\n                        </small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Insurance Agent Email:</label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"agentEmail\" maxlength=\"200\" [ngClass]=\"{'is-invalid': (agentEmail.invalid && (agentEmail.dirty || agentName.touched) && (agentEmail.errors?.required || agentEmail.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"addInsuranceForm.get('agentEmail').touched && addInsuranceForm.get('agentEmail').errors?.required\" class=\"text-danger\">\r\n                          Insurance Agent Email is required\r\n                        </small>\r\n                        <small *ngIf=\"addInsuranceForm.get('agentEmail').touched && addInsuranceForm.get('agentEmail').errors?.email\" class=\"text-danger\">Please enter valid Email</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12\">\r\n                      <label class=\"m-label-s\">Insurance Address:</label>\r\n                      <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>City:</label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"city\" maxlength=\"200\" [ngClass]=\"{'is-invalid': (city.invalid && (city.dirty || city.touched) && (city.errors?.required || city.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"addInsuranceForm.get('city').touched && addInsuranceForm.get('city').errors?.required\" class=\"text-danger\">\r\n                          City is required\r\n                        </small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Insurance Agent County:</label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"county\" maxlength=\"100\" [ngClass]=\"{'is-invalid': (county.invalid && (county.dirty || agentName.touched) && (county.errors?.required || county.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"addInsuranceForm.get('county').touched && addInsuranceForm.get('county').errors?.required\" class=\"text-danger\">\r\n                          Insurance Agent County is required\r\n                        </small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>State:</label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select [items]=\"states\"\r\n                                   placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"state\" [ngClass]=\"{'is-invalid': (state.invalid && (state.dirty || state.touched) && (state.errors?.required || state.errors?.maxlength)) }\">\r\n                        </ng-select>\r\n                        <small *ngIf=\"addInsuranceForm.get('state').touched && addInsuranceForm.get('state').errors?.required\" class=\"text-danger\">\r\n                          State is required\r\n                        </small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Zip:</label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"zipCode\" [ngClass]=\"{'is-invalid': (zipCode.invalid && (zipCode.dirty || zipCode.touched) && (zipCode.errors?.required || zipCode.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"addInsuranceForm.get('zipCode').touched && addInsuranceForm.get('zipCode').errors?.required\" class=\"text-danger\">\r\n                          Zip is required\r\n                        </small>\r\n                        <small *ngIf=\"zipCode.invalid && (zipCode.dirty || zipCode.touched) && zipCode.errors?.maxlength\"\r\n                               class=\"text-danger\">Zip can not be greater than 5 characters.</small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Address</label>\r\n                      <div class=\"form-group\">\r\n                        <textarea class=\"form-control\" formControlName=\"address\" [ngClass]=\"{'is-invalid': (address.invalid && (address.dirty || address.touched) && (address.errors?.required || address.errors?.maxlength)) }\"></textarea>\r\n                        <small *ngIf=\"addInsuranceForm.get('address').touched && addInsuranceForm.get('address').errors?.required\" class=\"text-danger\">\r\n                          Insurance Address is required\r\n                        </small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-12\">\r\n                      <div class=\"alert alert-info mt-2\">Insurance Company Name and Insurance Agent Email are required to fill if you enter insurance address details</div>\r\n                    </div>\r\n\r\n\r\n                  </div>\r\n\r\n                </div>\r\n              </form>\r\n              <div class=\"col-12 p-0\">\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-primary form-btns\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                <!--<a href=\"javascript:void(0);\" class=\"btn btn-danger form-btns\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>-->\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/add-insurance/add-insurance-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/add-insurance/add-insurance-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: AddInsuranceRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddInsuranceRoutingModule", function() { return AddInsuranceRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _add_insurance_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-insurance.component */ "./src/app/views/add-insurance/add-insurance.component.ts");
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
    { path: '', component: _add_insurance_component__WEBPACK_IMPORTED_MODULE_2__["AddInsuranceComponent"] }
];
var AddInsuranceRoutingModule = /** @class */ (function () {
    function AddInsuranceRoutingModule() {
    }
    AddInsuranceRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AddInsuranceRoutingModule);
    return AddInsuranceRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/add-insurance/add-insurance.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/views/add-insurance/add-insurance.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2FkZC1pbnN1cmFuY2UvYWRkLWluc3VyYW5jZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/add-insurance/add-insurance.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/add-insurance/add-insurance.component.ts ***!
  \****************************************************************/
/*! exports provided: AddInsuranceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddInsuranceComponent", function() { return AddInsuranceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _add_insurance_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-insurance.service */ "./src/app/views/add-insurance/add-insurance.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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





var AddInsuranceComponent = /** @class */ (function () {
    function AddInsuranceComponent(fb, commonService, addInsurance, toaster) {
        this.fb = fb;
        this.commonService = commonService;
        this.addInsurance = addInsurance;
        this.toaster = toaster;
        this.loadSave = false;
    }
    AddInsuranceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.UserId = userdetail.id;
            _this.getInsuranceDetail(_this.UserId);
        });
        this.loadStateDropdown();
        this.initForm();
    };
    AddInsuranceComponent.prototype.save = function () {
        var _this = this;
        if (this.addInsuranceForm.value.agentName != '' || this.addInsuranceForm.value.phone != ''
            || this.addInsuranceForm.value.address != '' || this.addInsuranceForm.value.city != ''
            || this.addInsuranceForm.value.county != '' || this.addInsuranceForm.value.state != null
            || this.addInsuranceForm.value.zipCode != '') {
            /// alert('error')
            if (this.addInsuranceForm.value.name == '') {
                this.toaster.error("Please Enter Insurance Company name");
                return false;
            }
            else if (this.addInsuranceForm.value.agentEmail == '') {
                this.toaster.error("Please Enter Insurance Agent Email");
                return false;
            }
        }
        if (this.addInsuranceForm.value.name == '' && this.addInsuranceForm.value.agentEmail != '') {
            this.toaster.error("Please Enter Insurance Company name");
            return false;
        }
        else if (this.addInsuranceForm.value.name != '' && this.addInsuranceForm.value.agentEmail == '') {
            this.toaster.error("Please Enter Insurance Agent Email");
            return false;
        }
        this.loadSave = true;
        this.addInsurance.saveInsuranceDetail(this.addInsuranceForm.value).subscribe(function (result) {
            if (result.statusCode == 200) {
                _this.toaster.success(result.responseMessage);
                setTimeout(function () { _this.loadSave = false; }, 3000);
            }
            else {
                _this.toaster.error(result.responseMessage);
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddInsuranceComponent.prototype.initForm = function () {
        this.addInsuranceForm = this.fb.group({
            insuranceId: [null],
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            address: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            city: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            state: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            zipCode: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            agentName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            agentEmail: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            county: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
        });
    };
    AddInsuranceComponent.prototype.getInsuranceDetail = function (userId) {
        var _this = this;
        this.addInsurance.getInsuranceDetail(userId)
            .subscribe(function (response) {
            _this.loadSave = true;
            _this.displayInsuranceDetail(response);
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddInsuranceComponent.prototype.displayInsuranceDetail = function (reposnse) {
        this.addInsuranceForm.patchValue({
            name: reposnse.name,
            address: reposnse.address,
            city: reposnse.city,
            state: reposnse.state,
            zipCode: reposnse.zipCode,
            phone: reposnse.phone,
            agentName: reposnse.agentName,
            agentEmail: reposnse.agentEmail,
            county: reposnse.county,
        });
    };
    AddInsuranceComponent.prototype.loadStateDropdown = function () {
        var _this = this;
        this.commonService.getStatesList().subscribe(function (res) {
            _this.states = _this.commonService.states;
        });
    };
    Object.defineProperty(AddInsuranceComponent.prototype, "name", {
        get: function () { return this.addInsuranceForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddInsuranceComponent.prototype, "address", {
        get: function () { return this.addInsuranceForm.get('address'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddInsuranceComponent.prototype, "city", {
        get: function () { return this.addInsuranceForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddInsuranceComponent.prototype, "state", {
        get: function () { return this.addInsuranceForm.get('state'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddInsuranceComponent.prototype, "zipCode", {
        get: function () { return this.addInsuranceForm.get('zipCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddInsuranceComponent.prototype, "phone", {
        get: function () { return this.addInsuranceForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddInsuranceComponent.prototype, "agentName", {
        get: function () { return this.addInsuranceForm.get('agentName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddInsuranceComponent.prototype, "agentEmail", {
        get: function () { return this.addInsuranceForm.get('agentEmail'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddInsuranceComponent.prototype, "county", {
        get: function () { return this.addInsuranceForm.get('county'); },
        enumerable: true,
        configurable: true
    });
    AddInsuranceComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _add_insurance_service__WEBPACK_IMPORTED_MODULE_3__["AddInsuranceService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }
    ]; };
    AddInsuranceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-insurance',
            template: __importDefault(__webpack_require__(/*! raw-loader!./add-insurance.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/add-insurance/add-insurance.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./add-insurance.component.scss */ "./src/app/views/add-insurance/add-insurance.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _add_insurance_service__WEBPACK_IMPORTED_MODULE_3__["AddInsuranceService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], AddInsuranceComponent);
    return AddInsuranceComponent;
}());



/***/ }),

/***/ "./src/app/views/add-insurance/add-insurance.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/add-insurance/add-insurance.module.ts ***!
  \*************************************************************/
/*! exports provided: AddInsuranceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddInsuranceModule", function() { return AddInsuranceModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _add_insurance_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-insurance.component */ "./src/app/views/add-insurance/add-insurance.component.ts");
/* harmony import */ var _add_insurance_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-insurance-routing.module */ "./src/app/views/add-insurance/add-insurance-routing.module.ts");
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





var AddInsuranceModule = /** @class */ (function () {
    function AddInsuranceModule() {
    }
    AddInsuranceModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_add_insurance_component__WEBPACK_IMPORTED_MODULE_2__["AddInsuranceComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _add_insurance_routing_module__WEBPACK_IMPORTED_MODULE_3__["AddInsuranceRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
            ]
        })
    ], AddInsuranceModule);
    return AddInsuranceModule;
}());



/***/ }),

/***/ "./src/app/views/add-insurance/add-insurance.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/add-insurance/add-insurance.service.ts ***!
  \**************************************************************/
/*! exports provided: AddInsuranceService, AddInsuranceDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddInsuranceService", function() { return AddInsuranceService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddInsuranceDetail", function() { return AddInsuranceDetail; });
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



var AddInsuranceService = /** @class */ (function () {
    function AddInsuranceService(http) {
        this.http = http;
        this.manageInsuranceUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl + "ManageInsurance";
    }
    AddInsuranceService.prototype.getInsuranceDetail = function (userId) {
        return this.http.get(this.manageInsuranceUri + "/GetInsuranceDetail?insuranceContactId=" + userId);
    };
    AddInsuranceService.prototype.saveInsuranceDetail = function (insuranceDetail) {
        return this.http.post(this.manageInsuranceUri + "/SaveInsuranceDetail", insuranceDetail);
    };
    AddInsuranceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    AddInsuranceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AddInsuranceService);
    return AddInsuranceService;
}());

var AddInsuranceDetail = /** @class */ (function () {
    function AddInsuranceDetail() {
        this.insuranceId = "";
        this.name = "";
        this.address = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
        this.phone = "";
        this.agentEmail = "";
        this.agentName = "";
        this.county = "";
    }
    return AddInsuranceDetail;
}());



/***/ })

}]);
//# sourceMappingURL=views-add-insurance-add-insurance-module.js.map