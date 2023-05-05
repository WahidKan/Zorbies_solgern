(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-account-account-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/forgot-password/forgot-password.component.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/forgot-password/forgot-password.component.html ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"login-container\">\r\n  <div class=\"login-main\">\r\n    <!--<a href=\"javascript:void(0);\"><img src=\"assets/default-theme/imagesNew/login-logo.png\" /></a>-->\r\n    <img src=\"{{siteimage}}\" />\r\n    <div class=\"login-box\">\r\n      <h2>FORGOT PASSWORD?</h2>\r\n      <form [formGroup]=\"ForgotPswForm\" autocomplete=\"off\">\r\n        <div class=\"login-box-fields\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" placeholder=\"Email\" formControlName='email'>\r\n            <div *ngIf=\"email.invalid && (email.dirty || email.touched)\" class=\"alert-danger p-1\">\r\n              <div *ngIf=\"email.errors.required\" class=\"alert-danger p-1\">Email is required.</div>\r\n              <div *ngIf=\"email.errors.pattern && !email.errors.required\" class=\"alert-danger p-1\">Please enter valid Email Address.</div>\r\n            </div>\r\n          </div>\r\n          <button type=\"submit\" class=\"btn btn-success\" style=\"max-width: 49%; margin-right: 2%; margin-top: 5px;\" (click)=\"SendForgotPasswordMail()\">SUBMIT</button>\r\n          <button type=\"submit\" class=\"btn btn-danger\" style=\"max-width: 49%;\" (click)=\"Back()\">CANCEL</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-login\"></app-loader>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/loginuserlist/loginuserlist.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/loginuserlist/loginuserlist.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"login-container\">\r\n  <div class=\"login-main\">\r\n    <a href=\"javascript:void(0);\"><img src=\"assets/default-theme/imagesNew/logo.png\" /></a>\r\n    <div class=\"login-box\">\r\n      <h2>Associated Companies</h2>\r\n      <div class=\"login-box-fields\" [ngClass]=\"{'disabled':loadSave}\">\r\n        <div class=\"card border-0\">\r\n          <ul class=\"list-group list-group-flush multicompanylogin\">\r\n            <li class=\"list-group-item\" *ngFor=\"let comp of lstheadercompany\">\r\n              <a href=\"javascript:void(0);\" title=\"Switch Company\" (click)=\"LoginUserForCompany(comp.CompanyId,comp.Email,comp.CompanyName)\">\r\n                <img src=\"{{comp.CompanyLogo}}\" style=\"height:50px;width:60px;\" />\r\n                <span>{{comp.CompanyName}}</span>\r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-login\"></app-loader>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/resetpassword/resetpassword.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/resetpassword/resetpassword.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"login-container\">\r\n  <div class=\"login-main\">\r\n    <!--<a href=\"javascript:void(0);\"><img src=\"assets/default-theme/imagesNew/login-logo.png\" /></a>-->\r\n    <img src=\"{{siteimage}}\" />\r\n    <div class=\"login-box\">\r\n      <h2>RESET PASSWORD</h2>\r\n      <form [formGroup]=\"resetPasswordForm\" autocomplete=\"off\">\r\n        <div class=\"login-box-fields\" [ngClass]=\"{'disabled':loadSave}\">\r\n        <div class=\"form-group\">\r\n          <input type=\"password\" class=\"form-control\" autocomplete=\"off\" (change)=\"change()\"\r\n                 passwordToggle placeholder=\"Please enter password\" formControlName=\"password\" required>\r\n          <div *ngIf=\"password.invalid && (password.dirty || password.touched)\" class=\" alert-\">\r\n            <div *ngIf=\"password.errors.required\" class=\" alert-danger p-1\">Password is required</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <input type=\"password\" class=\"form-control\" autocomplete=\"off\" (change)=\"change()\"\r\n                 passwordToggle placeholder=\"Please enter confirm password\" formControlName=\"confirmPassword\" required>\r\n          <div *ngIf=\"confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched)\" class=\" alert-\">\r\n            <div *ngIf=\"confirmPassword.errors.required\" class=\" alert-danger p-1\">Confirm password is required</div>\r\n            <div *ngIf=\"confirmPassword.errors.confirmedValidator\" class=\" alert-danger p-1\">Confirm password does not match</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-sm-12 p-0\">\r\n          <p class=\"alert-warning p-2\">Note: Password must be a combination of lower case, upper case, numeric and special character.</p>\r\n        </div>\r\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"resetPassword()\">Submit</button>\r\n          </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-login\"></app-loader>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/setpassword/setpassword.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/setpassword/setpassword.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"login-container\">\r\n  <div class=\"login-main\">\r\n    <!--<a href=\"javascript:void(0);\"><img src=\"assets/default-theme/imagesNew/login-logo.png\" /></a>-->\r\n    <img src=\"{{siteimage}}\" />\r\n    <div class=\"login-box\">\r\n      <h2>SET PASSWORD</h2>\r\n      <form [formGroup]=\"setPasswordForm\" autocomplete=\"off\">\r\n        <div class=\"form-group\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <input type=\"password\" formControlName=\"password\" placeholder=\"Please enter password\" passwordToggle class=\"form-control\">\r\n          <!--<div *ngIf=\"password.invalid && (password.dirty || password.touched)\">\r\n            <div *ngIf=\"password.errors.required\" class=\"alert alert-danger p-1\">Password is required</div>\r\n          </div>-->\r\n        </div>\r\n        <div class=\"col-sm-12 p-0 mb-3\" *ngIf=\"password.invalid && (password.dirty || password.touched)\" style=\" margin-top: -13px;\">\r\n          <div *ngIf=\"password.errors.required\" class=\"alert alert-danger p-1  text-left\">Password is required</div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <input type=\"password\" formControlName=\"confirmPassword\" passwordToggle placeholder=\"Please enter confirm password\" class=\"form-control\" />\r\n          <!--<div *ngIf=\"confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched)\">\r\n      <div *ngIf=\"confirmPassword.errors.required\" class=\"alert-danger p-1\">Confirm password is required</div>\r\n      <div *ngIf=\"confirmPassword.errors.mismatched\" class=\"alert-danger p-1\">Confirm password does not match</div>\r\n    </div>-->\r\n        </div>\r\n        <div class=\"col-sm-12 p-0 mb-3\" *ngIf=\"confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched)\" style=\" margin-top: -13px;\">\r\n          <div *ngIf=\"confirmPassword.errors.required\" class=\"alert-danger p-1 text-left\">Confirm password is required</div>\r\n          <div *ngIf=\"confirmPassword.errors.mismatched\" class=\"alert-danger p-1  text-left\">Confirm password does not match</div>\r\n        </div>\r\n        <div class=\"col-sm-12 p-0\">\r\n          <p class=\"alert-warning p-2\">Note: Password should be combination of lower case, upper case, numeric and special character.</p>\r\n        </div>\r\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"setPassword()\">SUBMIT</button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-login\"></app-loader>\r\n\r\n");

/***/ }),

/***/ "./src/app/views/account/account-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/account/account-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: AccountRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountRoutingModule", function() { return AccountRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/views/account/login/login.component.ts");
/* harmony import */ var _setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setpassword/setpassword.component */ "./src/app/views/account/setpassword/setpassword.component.ts");
/* harmony import */ var _account_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../account/forgot-password/forgot-password.component */ "./src/app/views/account/forgot-password/forgot-password.component.ts");
/* harmony import */ var _resetpassword_resetpassword_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resetpassword/resetpassword.component */ "./src/app/views/account/resetpassword/resetpassword.component.ts");
/* harmony import */ var _loginuserlist_loginuserlist_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loginuserlist/loginuserlist.component */ "./src/app/views/account/loginuserlist/loginuserlist.component.ts");
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
    { path: '', component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: 'setpassword', component: _setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_3__["SetpasswordComponent"] },
    { path: 'forgot-password', component: _account_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__["ForgotPasswordComponent"] },
    { path: 'resetpassword', component: _resetpassword_resetpassword_component__WEBPACK_IMPORTED_MODULE_5__["ResetpasswordComponent"] },
    { path: 'multipleuserlogin', component: _loginuserlist_loginuserlist_component__WEBPACK_IMPORTED_MODULE_6__["LoginuserlistComponent"] },
];
var AccountRoutingModule = /** @class */ (function () {
    function AccountRoutingModule() {
    }
    AccountRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AccountRoutingModule);
    return AccountRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/account/account.module.ts":
/*!*************************************************!*\
  !*** ./src/app/views/account/account.module.ts ***!
  \*************************************************/
/*! exports provided: AccountModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountModule", function() { return AccountModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _account_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./account-routing.module */ "./src/app/views/account/account-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setpassword/setpassword.component */ "./src/app/views/account/setpassword/setpassword.component.ts");
/* harmony import */ var _account_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../account/forgot-password/forgot-password.component */ "./src/app/views/account/forgot-password/forgot-password.component.ts");
/* harmony import */ var _resetpassword_resetpassword_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resetpassword/resetpassword.component */ "./src/app/views/account/resetpassword/resetpassword.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _loginuserlist_loginuserlist_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./loginuserlist/loginuserlist.component */ "./src/app/views/account/loginuserlist/loginuserlist.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _account_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_5__["ForgotPasswordComponent"], _setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_4__["SetpasswordComponent"], _resetpassword_resetpassword_component__WEBPACK_IMPORTED_MODULE_6__["ResetpasswordComponent"], _loginuserlist_loginuserlist_component__WEBPACK_IMPORTED_MODULE_8__["LoginuserlistComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _account_routing_module__WEBPACK_IMPORTED_MODULE_2__["AccountRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"]
            ]
        })
    ], AccountModule);
    return AccountModule;
}());



/***/ }),

/***/ "./src/app/views/account/forgot-password/forgot-password.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/views/account/forgot-password/forgot-password.component.scss ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2FjY291bnQvZm9yZ290LXBhc3N3b3JkL2ZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/account/forgot-password/forgot-password.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/views/account/forgot-password/forgot-password.component.ts ***!
  \****************************************************************************/
/*! exports provided: ForgotPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function() { return ForgotPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
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







var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(fb, userService, router, toaster, commonService, titleService) {
        this.fb = fb;
        this.userService = userService;
        this.router = router;
        this.toaster = toaster;
        this.commonService = commonService;
        this.titleService = titleService;
        this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.loadSave = false;
        this.url = "";
        this.sitetitle = '';
        this.siteURL = "";
        this.siteCompanyURL = "";
        this.siteCompanyID = 0;
        this.forgotPswModel = new _shared_user_service__WEBPACK_IMPORTED_MODULE_2__["ForgotPassword"]();
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ForgotPswForm = this.fb.group({
            email: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.emailPattern)]],
        });
        this.url = window.location.href;
        this.url = this.url.slice(9, 19);
        //---setting Logo on basis of URL
        this.userService.GetSiteURl(this.url).subscribe(function (result) {
            console.log('dataa', result);
            _this.urldata = JSON.parse(result);
            if (result != null) {
                _this.siteimage = _this.urldata[0].SiteLoginLogo;
                _this.sitetitle = _this.urldata[0].SiteTitle;
                _this.siteCompanyURL = _this.urldata[0].SiteUrl;
                _this.siteCompanyID = _this.urldata[0].CompanyId;
                _this.setTitle(_this.sitetitle);
            }
            else {
                _this.sitetitle = 'SolgenOne';
                _this.setTitle(_this.sitetitle);
                _this.siteimage = 'assets/default-theme/imagesNew/login-logo-solgen.png';
            }
        });
        if (this.router.url.indexOf('app.loanhomi') > 0) {
            this.siteURL = "loanhomi";
        }
        else if (this.router.url.indexOf('app.solgenone') > 0) {
            this.siteURL = "solgenone";
        }
        else if (this.router.url.indexOf('solgen.zorbis') > 0) {
            this.siteURL = "solgenone";
        }
    };
    ForgotPasswordComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    ForgotPasswordComponent.prototype.SendForgotPasswordMail = function () {
        var _this = this;
        if (this.ForgotPswForm.valid) {
            this.loadSave = true;
            this.forgotPswModel.email = this.ForgotPswForm.value.email;
            this.forgotPswModel.siteTitle = this.sitetitle;
            this.forgotPswModel.siteImg = this.siteimage;
            this.forgotPswModel.siteCompanyURL = this.siteCompanyURL;
            this.forgotPswModel.siteCompanyID = this.siteCompanyID;
            this.userService.ForgotPsw(this.forgotPswModel).subscribe(function (res) {
                if (res) {
                    if (res.statusCode == 200) {
                        _this.toaster.success(res.responseMessage);
                        _this.router.navigateByUrl('/account');
                        setTimeout(function () { _this.loadSave = false; }, 3000);
                    }
                    else {
                        _this.loadSave = false;
                        _this.toaster.error(res.responseMessage);
                    }
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.ForgotPswForm);
        }
    };
    ForgotPasswordComponent.prototype.Back = function () {
        this.router.navigateByUrl("/account");
    };
    Object.defineProperty(ForgotPasswordComponent.prototype, "email", {
        get: function () {
            return this.ForgotPswForm.get('email');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForgotPasswordComponent.prototype, "emailp", {
        get: function () { return this.ForgotPswForm.get('emailp'); },
        enumerable: true,
        configurable: true
    });
    ForgotPasswordComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["Title"] }
    ]; };
    ForgotPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-forgot-password',
            template: __importDefault(__webpack_require__(/*! raw-loader!./forgot-password.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/forgot-password/forgot-password.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./forgot-password.component.scss */ "./src/app/views/account/forgot-password/forgot-password.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _shared_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["Title"]])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());



/***/ }),

/***/ "./src/app/views/account/loginuserlist/loginuserlist.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/views/account/loginuserlist/loginuserlist.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2FjY291bnQvbG9naW51c2VybGlzdC9sb2dpbnVzZXJsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/account/loginuserlist/loginuserlist.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/account/loginuserlist/loginuserlist.component.ts ***!
  \************************************************************************/
/*! exports provided: LoginuserlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginuserlistComponent", function() { return LoginuserlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-device-detector */ "./node_modules/ngx-device-detector/fesm5/ngx-device-detector.js");
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







var LoginuserlistComponent = /** @class */ (function () {
    function LoginuserlistComponent(routerService, fb, toaster, userService, commonService, router, activeRoute, deviceService) {
        this.routerService = routerService;
        this.fb = fb;
        this.toaster = toaster;
        this.userService = userService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.deviceService = deviceService;
        this.loadSave = false;
        this.deviceInfo = null;
        this.isChecked = false;
        this.loginModel = new _shared_user_service__WEBPACK_IMPORTED_MODULE_3__["Login"]();
        this.loginForm = this.fb.group({
            userName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            rememberMe: ['']
        });
    }
    LoginuserlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.queryParams.subscribe(function (params) {
            var values = params['UserId'];
            _this.GeHeaderCompanyList(values);
        });
    };
    LoginuserlistComponent.prototype.LoginUserForCompany = function (company, userName, CompanyName) {
        var _this = this;
        //if (this.loginForm.valid) {
        this.loadSave = true;
        this.loginModel.userName = userName;
        this.loginModel.password = '';
        this.loginModel.browser = this.Browser + " " + this.BrowserVersion;
        this.loginModel.os = this.OS + " " + this.OSVersion;
        this.loginModel.iPAddress = this.IPAddress;
        this.loginModel.isMutipleUser = true;
        this.loginModel.isLoginForMutipleUserCredential = true;
        this.loginModel.CompanyId = company;
        this.loginModel.CompanyName = CompanyName;
        this.userService.login(this.loginModel).subscribe(function (res) {
            if (res) {
                if (res.status == 200) {
                    localStorage.setItem("access_token", res.token);
                    localStorage.setItem("usertype", res.usertype);
                    _this.commonService.getCurrentUserDetail();
                    _this.commonService.getLoggedInName.subscribe(function (userdetail) {
                    });
                    setTimeout(function () {
                        _this.commonService.getLoggedInName.subscribe(function (userdetail) {
                            _this.commonService.getUserModulePermissions(false).subscribe(function (m) {
                                localStorage.removeItem('moduleList');
                                localStorage.setItem('moduleList', m);
                                //  this.router.navigateByUrl('/dashboard');
                                window.location.href = "dashboard";
                            });
                        });
                    }, 2000);
                    setTimeout(function () { _this.loadSave = false; }, 2000);
                }
                else if (res.status == 204) {
                    window.location.href = "account/multipleuserlogin?UserId=" + res.userId;
                }
                else if (res.status == 201) { //deleted/inactive user
                    _this.loadSave = false;
                    _this.toaster.error(res.token);
                }
                else if (res.status == 501) {
                    _this.loadSave = false;
                    _this.toaster.error("Your Account is Blocked for 30 minutes because you have entered wrong username/password");
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error("Invalid username/password!");
                }
            }
        }, function (error) {
            _this.loadSave = false;
        });
        //}
        //else {
        //  this.commonService.validateAllFormFields(this.loginForm);
        //}
    };
    LoginuserlistComponent.prototype.GeHeaderCompanyList = function (values) {
        var _this = this;
        this.commonService.GeHeaderCompanyList(values).subscribe(function (data) {
            _this.lstheadercompany = data;
        });
    };
    LoginuserlistComponent.prototype.epicFunction = function () {
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.Browser = this.deviceInfo.browser;
        this.BrowserVersion = this.deviceInfo.browser_version;
        this.OS = "";
        this.OSVersion = this.deviceInfo.os_version;
    };
    LoginuserlistComponent.prototype.Back = function () {
        this.router.navigateByUrl("/account");
    };
    LoginuserlistComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: ngx_device_detector__WEBPACK_IMPORTED_MODULE_6__["DeviceDetectorService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], LoginuserlistComponent.prototype, "passwordData", void 0);
    LoginuserlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-loginuserlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./loginuserlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/loginuserlist/loginuserlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./loginuserlist.component.scss */ "./src/app/views/account/loginuserlist/loginuserlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"], ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _shared_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], ngx_device_detector__WEBPACK_IMPORTED_MODULE_6__["DeviceDetectorService"]])
    ], LoginuserlistComponent);
    return LoginuserlistComponent;
}());



/***/ }),

/***/ "./src/app/views/account/resetpassword/resetpassword.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/account/resetpassword/resetpassword.component.ts ***!
  \************************************************************************/
/*! exports provided: ResetpasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetpasswordComponent", function() { return ResetpasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/custom-validation/equal-validator */ "./src/app/views/shared/custom-validation/equal-validator.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
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








//import { ConfirmedValidator } from './confirmed.validator';
var ResetpasswordComponent = /** @class */ (function () {
    function ResetpasswordComponent(route, userService, router, titleService, fb, commonService, toaster) {
        this.route = route;
        this.userService = userService;
        this.router = router;
        this.titleService = titleService;
        this.fb = fb;
        this.commonService = commonService;
        this.toaster = toaster;
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.resetPasswordModel = new _shared_user_service__WEBPACK_IMPORTED_MODULE_3__["ResetPassword"]();
        this.result = null;
        this.tmp = [];
        this.loadSave = false;
        this.siteURL = "";
        this.url = "";
        this.sitetitle = '';
    }
    ResetpasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resetPasswordForm = this.fb.group({
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        }, {
            validator: _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_6__["EqualValidator"].ConfirmedValidator('password', 'confirmPassword'),
        });
        this.userId = this.findGetParameter("userId");
        this.resetToken = this.findGetParameter("token");
        this.url = window.location.href;
        console.log('this.urlbefore', this.url);
        this.url = this.url.slice(9, 19);
        //---setting Logo on basis of URL
        console.log('this.urlafter', this.url);
        this.userService.GetSiteURl(this.url).subscribe(function (result) {
            console.log('dataa', result);
            _this.urldata = JSON.parse(result);
            if (result != null) {
                _this.siteimage = _this.urldata[0].SiteLoginLogo;
                _this.sitetitle = _this.urldata[0].SiteTitle;
                _this.setTitle(_this.sitetitle);
            }
            else {
                _this.sitetitle = 'SolgenOne';
                _this.setTitle(_this.sitetitle);
                _this.siteimage = 'assets/default-theme/imagesNew/login-logo-solgen.png';
            }
        });
        console.log(this.router.url);
        if (this.router.url.indexOf('app.loanhomi') > 0) {
            this.siteURL = "loanhomi";
        }
        else if (this.router.url.indexOf('app.solgenone') > 0) {
            this.siteURL = "solgenone";
        }
        else if (this.router.url.indexOf('solgen.zorbis') > 0) {
            this.siteURL = "solgenone";
        }
    };
    ResetpasswordComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    Object.defineProperty(ResetpasswordComponent.prototype, "password", {
        get: function () { return this.resetPasswordForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResetpasswordComponent.prototype, "confirmPassword", {
        get: function () { return this.resetPasswordForm.get('confirmPassword'); },
        enumerable: true,
        configurable: true
    });
    ResetpasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.loadSave = true;
        if (this.resetPasswordForm.valid) {
            this.resetPasswordModel.password = this.resetPasswordForm.value.password;
            this.resetPasswordModel.confirmPassword = this.resetPasswordForm.value.confirmPassword;
            this.resetPasswordModel.userId = this.userId;
            this.resetPasswordModel.resetToken = this.resetToken;
            this.userService.resetPassword(this.resetPasswordModel).subscribe(function (res) {
                if (res) {
                    if (res.statusCode == 200) {
                        _this.toaster.success("Your password has been reset successfully.");
                        _this.resetPasswordForm.reset();
                        _this.router.navigateByUrl('/account');
                        _this.loadSave = false;
                    }
                    else {
                        _this.toaster.error(res.responseMessage);
                        _this.loadSave = false;
                    }
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.resetPasswordForm);
            this.loadSave = false;
        }
    };
    ResetpasswordComponent.prototype.findGetParameter = function (parameterName) {
        this.result = null,
            this.tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            this.tmp = items[index].split("=");
            if (this.tmp[0] === parameterName)
                this.result = decodeURIComponent(this.tmp[1]);
        }
        return this.result;
    };
    ResetpasswordComponent.prototype.change = function () {
        if (this.resetPasswordForm.dirty && this.resetPasswordForm.valid) {
            this.onChange.emit(this.password.value);
        }
        else {
            this.onChange.emit(null);
        }
    };
    ResetpasswordComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ResetpasswordComponent.prototype, "onChange", void 0);
    ResetpasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-resetpassword',
            template: __importDefault(__webpack_require__(/*! raw-loader!./resetpassword.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/resetpassword/resetpassword.component.html")).default,
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _shared_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], ResetpasswordComponent);
    return ResetpasswordComponent;
}());



/***/ }),

/***/ "./src/app/views/account/setpassword/setpassword.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/views/account/setpassword/setpassword.component.ts ***!
  \********************************************************************/
/*! exports provided: SetpasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetpasswordComponent", function() { return SetpasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/custom-validation/equal-validator */ "./src/app/views/shared/custom-validation/equal-validator.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
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








var SetpasswordComponent = /** @class */ (function () {
    function SetpasswordComponent(userService, router, fb, titleService, commonService, toaster) {
        this.userService = userService;
        this.router = router;
        this.fb = fb;
        this.titleService = titleService;
        this.commonService = commonService;
        this.toaster = toaster;
        this.LoginUser = new _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["UserDetails"]();
        this.result = null;
        this.tmp = [];
        this.siteURL = "";
        this.url = "";
        this.sitetitle = '';
        this.setPasswordModel = new _shared_user_service__WEBPACK_IMPORTED_MODULE_2__["SetPassword"]();
        this.loadSave = false;
        this.setPasswordForm = this.fb.group({
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        }, {
            validator: _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_6__["EqualValidator"].matchingPasswords('password', 'confirmPassword')
        });
    }
    SetpasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userid = this.findGetParameter("userId");
        this.token = this.findGetParameter("token");
        if (userid) {
            this.userService.confirmEmail(userid, this.token).subscribe(function (res) {
                if (res.statusCode == 500) {
                    _this.router.navigateByUrl('/common/unauthorized');
                }
                else {
                    _this.userId = res.result;
                }
            });
        }
        this.url = window.location.href;
        console.log('this.urlbefore', this.url);
        this.url = this.url.slice(9, 19);
        //---setting Logo on basis of URL
        console.log('this.urlafter', this.url);
        this.userService.GetSiteURl(this.url).subscribe(function (result) {
            console.log('dataa', result);
            _this.urldata = JSON.parse(result);
            if (result != null) {
                _this.siteimage = _this.urldata[0].SiteLoginLogo;
                _this.sitetitle = _this.urldata[0].SiteTitle;
                _this.setTitle(_this.sitetitle);
            }
            else {
                _this.sitetitle = 'SolgenOne';
                _this.setTitle(_this.sitetitle);
                _this.siteimage = 'assets/default-theme/imagesNew/login-logo-solgen.png';
            }
        });
        console.log(this.router.url);
        if (this.router.url.indexOf('app.loanhomi') > 0) {
            this.siteURL = "loanhomi";
        }
        else if (this.router.url.indexOf('app.solgenone') > 0) {
            this.siteURL = "solgenone";
        }
        else if (this.router.url.indexOf('solgen.zorbis') > 0) {
            this.siteURL = "solgenone";
        }
    };
    SetpasswordComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    Object.defineProperty(SetpasswordComponent.prototype, "password", {
        get: function () { return this.setPasswordForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SetpasswordComponent.prototype, "confirmPassword", {
        get: function () { return this.setPasswordForm.get('confirmPassword'); },
        enumerable: true,
        configurable: true
    });
    SetpasswordComponent.prototype.setPassword = function () {
        var _this = this;
        this.loadSave = true;
        if (this.setPasswordForm.valid) {
            this.setPasswordModel.password = this.setPasswordForm.value.password;
            this.setPasswordModel.confirmPassword = this.setPasswordForm.value.confirmPassword;
            this.setPasswordModel.userId = this.userId;
            this.setPasswordModel.token = this.token;
            this.userService.setPassword(this.setPasswordModel).subscribe(function (res) {
                if (res.statusCode === 200) {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("usertype");
                    localStorage.removeItem("moduleList");
                    localStorage.removeItem("userinfo");
                    _this.LoginUser = new _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["UserDetails"]();
                    _this.toaster.success("Your account password has been set successfully. Please login.");
                    _this.router.navigateByUrl('/account');
                    _this.loadSave = false;
                }
                else {
                    _this.toaster.error(res.responseMessage);
                    _this.loadSave = false;
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.setPasswordForm);
            this.loadSave = false;
        }
    };
    SetpasswordComponent.prototype.findGetParameter = function (parameterName) {
        this.result = null,
            this.tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            this.tmp = items[index].split("=");
            if (this.tmp[0] === parameterName)
                this.result = decodeURIComponent(this.tmp[1]);
        }
        return this.result;
    };
    SetpasswordComponent.ctorParameters = function () { return [
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    SetpasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-setpassword',
            template: __importDefault(__webpack_require__(/*! raw-loader!./setpassword.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/account/setpassword/setpassword.component.html")).default
        }),
        __metadata("design:paramtypes", [_shared_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], SetpasswordComponent);
    return SetpasswordComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-account-account-module.js.map