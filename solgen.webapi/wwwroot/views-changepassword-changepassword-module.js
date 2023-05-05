(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-changepassword-changepassword-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/changepassword/changepassword.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/changepassword/changepassword.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Change Password</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li class=\"active\">Change Password</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white pb-3\">\r\n            <div class=\"col-md-12 mt-4 p-1\">\r\n              <form [formGroup]=\"changePasswordForm\">\r\n                <div class=\"row mt-3\">\r\n                  <div class=\"col-lg-6\">\r\n                    <label>Current Password:</label><span class=\"text-danger\">*</span>\r\n                    <div class=\"form-group pwdtoggle\">\r\n                      <input class=\"form-control\" type=\"password\" passwordToggle formControlName=\"currentPassword\"\r\n                             [ngClass]=\"{'is-invalid': (currentPassword.invalid && (currentPassword.dirty || currentPassword.touched) && (currentPassword.errors?.required || currentPassword.errors?.maxlength)) }\">\r\n                      <small *ngIf=\"currentPassword.invalid && (currentPassword.dirty || currentPassword.touched) && currentPassword.errors?.required\"\r\n                             class=\"text-danger\">Current Password is required</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <label>New Password:</label><span class=\"text-danger\">*</span>\r\n                    <div class=\"form-group pwdtoggle\">\r\n                      <input class=\"form-control\" type=\"password\" formControlName=\"newPassword\" passwordToggle\r\n                             [ngClass]=\"{'is-invalid': (newPassword.invalid && (newPassword.dirty || newPassword.touched) && (newPassword.errors?.required || newPassword.errors?.maxlength)) }\">\r\n                      <small *ngIf=\"newPassword.invalid && (newPassword.dirty || newPassword.touched) && newPassword.errors?.required\"\r\n                             class=\"text-danger\">New Password is required</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <label>Confirm New Password:</label><span class=\"text-danger\">*</span>\r\n                    <div class=\"form-group pwdtoggle\">\r\n                      <input class=\"form-control\" type=\"password\" formControlName=\"confirmPassword\" passwordToggle\r\n                             [ngClass]=\"{'is-invalid': (confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched) && (confirmPassword.errors?.required || confirmPassword.errors?.maxlength)) }\">\r\n                      <small *ngIf=\"confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched) && confirmPassword.errors?.required\"\r\n                             class=\"text-danger\">Confirm Password is required</small>\r\n                      <small *ngIf=\"!confirmPassword.valid  && confirmPassword.hasError('notmatch')\"\r\n                             class=\"text-danger\">Confirm password does not match</small>\r\n\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-sm-12\">\r\n                    <p class=\"alert-warning p-2\">Note: Password must be combination of lower case, upper case, numeric and special character.</p>\r\n                  </div>\r\n\r\n                  <div class=\"col-sm-12 text-right\">\r\n                    <button type=\"submit\" class=\"btn btn-success form-btns mr-2\" (click)=\"changePassword()\"><i class=\"fa fa-save\"></i> SUBMIT</button>\r\n\r\n                    <a href=\"javascript:void(0)\" routerLink=\"/dashboard\" class=\"btn btn-danger \"><span><i class=\"fa fa-close\"></i>  Cancel</span></a>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/changepassword/changepassword-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/changepassword/changepassword-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: ChangepasswordRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangepasswordRoutingModule", function() { return ChangepasswordRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _changepassword_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./changepassword.component */ "./src/app/views/changepassword/changepassword.component.ts");
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
    { path: '', component: _changepassword_component__WEBPACK_IMPORTED_MODULE_2__["ChangepasswordComponent"] }
];
var ChangepasswordRoutingModule = /** @class */ (function () {
    function ChangepasswordRoutingModule() {
    }
    ChangepasswordRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ChangepasswordRoutingModule);
    return ChangepasswordRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/changepassword/changepassword.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/views/changepassword/changepassword.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NoYW5nZXBhc3N3b3JkL2NoYW5nZXBhc3N3b3JkLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/changepassword/changepassword.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/views/changepassword/changepassword.component.ts ***!
  \******************************************************************/
/*! exports provided: ChangepasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangepasswordComponent", function() { return ChangepasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
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






var ChangepasswordComponent = /** @class */ (function () {
    function ChangepasswordComponent(userService, router, fbPassword, commonService, toaster) {
        this.userService = userService;
        this.router = router;
        this.fbPassword = fbPassword;
        this.commonService = commonService;
        this.toaster = toaster;
        this.result = null;
        this.tmp = [];
        this.passwordModel = new _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["ChangePasswordModel"]();
        this.loadSave = false;
        //------------------------------- Change Password
        this.changePasswordForm = this.fbPassword.group({
            currentPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            newPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        }, {
            validator: PasswordMatch('newPassword', 'confirmPassword')
        });
    }
    ChangepasswordComponent.prototype.ngOnInit = function () {
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
    };
    Object.defineProperty(ChangepasswordComponent.prototype, "currentPassword", {
        get: function () { return this.changePasswordForm.get('currentPassword'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChangepasswordComponent.prototype, "newPassword", {
        get: function () { return this.changePasswordForm.get('newPassword'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChangepasswordComponent.prototype, "confirmPassword", {
        get: function () { return this.changePasswordForm.get('confirmPassword'); },
        enumerable: true,
        configurable: true
    });
    ChangepasswordComponent.prototype.changePassword = function () {
        var _this = this;
        if (this.changePasswordForm.valid) {
            this.passwordModel.currentPassword = this.changePasswordForm.value.currentPassword;
            this.passwordModel.password = this.changePasswordForm.value.newPassword;
            this.passwordModel.confirmPassword = this.changePasswordForm.value.confirmPassword;
            this.commonService.ChangePassword(this.passwordModel).subscribe(function (response) {
                if (response.statusCode == 200) {
                    _this.toaster.success(response.responseMessage);
                    _this.changePasswordForm.reset();
                    var btn = _this.button.nativeElement;
                    btn.click();
                    _this.commonService.logout();
                }
                else {
                    _this.toaster.error(response.responseMessage);
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.changePasswordForm);
        }
    };
    //---------------------------------------------------------
    //---------------------------------------------------------
    ChangepasswordComponent.prototype.findGetParameter = function (parameterName) {
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
    ChangepasswordComponent.ctorParameters = function () { return [
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeButton', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ChangepasswordComponent.prototype, "button", void 0);
    ChangepasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-changepassword',
            template: __importDefault(__webpack_require__(/*! raw-loader!./changepassword.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/changepassword/changepassword.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./changepassword.component.scss */ "./src/app/views/changepassword/changepassword.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], ChangepasswordComponent);
    return ChangepasswordComponent;
}());

function PasswordMatch(pwd, cpwd) {
    return function (frm) {
        var pword = frm.controls[pwd];
        var cpword = frm.controls[cpwd];
        if (pword.value !== cpword.value) {
            cpword.setErrors({ notmatch: true });
        }
        else {
            cpword.setErrors(null);
        }
    };
}


/***/ }),

/***/ "./src/app/views/changepassword/changepassword.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/changepassword/changepassword.module.ts ***!
  \***************************************************************/
/*! exports provided: ChangePasswordModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordModule", function() { return ChangePasswordModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _changepassword_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./changepassword.component */ "./src/app/views/changepassword/changepassword.component.ts");
/* harmony import */ var _changepassword_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./changepassword-routing.module */ "./src/app/views/changepassword/changepassword-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var ChangePasswordModule = /** @class */ (function () {
    function ChangePasswordModule() {
    }
    ChangePasswordModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_changepassword_component__WEBPACK_IMPORTED_MODULE_2__["ChangepasswordComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _changepassword_routing_module__WEBPACK_IMPORTED_MODULE_3__["ChangepasswordRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
            ]
        })
    ], ChangePasswordModule);
    return ChangePasswordModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-changepassword-changepassword-module.js.map