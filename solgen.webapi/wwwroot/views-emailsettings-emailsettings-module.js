(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-emailsettings-emailsettings-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailsettings/emailsettings.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailsettings/emailsettings.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Email Settings</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\">Email Settings</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 mt-4\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <form [formGroup]=\"emailSettingForm\" autocomplete=\"off\">\r\n                <div class=\"emailSettings-box\" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>SMTP Host:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter SMTP Server.\"\r\n                               formControlName=\"smtpServer\"\r\n                               [ngClass]=\"{'is-invalid': (smtpServer.invalid && (smtpServer.dirty || smtpServer.touched) && (smtpServer.errors?.required || smtpServer.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"smtpServer.invalid && (smtpServer.dirty || smtpServer.touched) && smtpServer.errors?.required\"\r\n                               style=\"color:red;\">SMTP Host is required</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>SMTP Username:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter SMTP Username\"\r\n                               formControlName=\"smtpUserName\"\r\n                               [ngClass]=\"{'is-invalid': (smtpUserName.invalid && (smtpUserName.dirty || smtpUserName.touched) && (smtpUserName.errors?.required || smtpUserName.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"smtpUserName.invalid && (smtpUserName.dirty || smtpUserName.touched) && smtpUserName.errors?.required\"\r\n                               class=\"text-danger\">SMTP Username is required</small>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>SMTP Password:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"password\" class=\"form-control\" placeholder=\"Enter SMTP Password\" passwordToggle\r\n                               formControlName=\"smtpPassword\"\r\n                               [ngClass]=\"{'is-invalid': (smtpPassword.invalid && (smtpPassword.dirty || smtpPassword.touched) && (smtpPassword.errors?.required || smtpPassword.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"smtpPassword.invalid && (smtpPassword.dirty || smtpPassword.touched) && smtpPassword.errors?.required\"\r\n                               class=\"text-danger\">SMTP Password is required</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>SMTP Port:</label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter SMTP Port\"\r\n                               formControlName=\"smtpPort\" />\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>From Email:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter From email\"\r\n                               formControlName=\"fromEmailId\"\r\n                               [ngClass]=\"{'is-invalid': (fromEmailId.invalid && (fromEmailId.dirty || fromEmailId.touched) && (fromEmailId.errors?.required || fromEmailId.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"fromEmailId.invalid && (fromEmailId.dirty || fromEmailId.touched) && fromEmailId.errors?.required\"\r\n                               class=\"text-danger\">From email is required</small>\r\n                        <small *ngIf=\"fromEmailId.invalid && (fromEmailId.dirty || fromEmailId.touched) && fromEmailId.errors?.email\"\r\n                               class=\"text-danger\">Please enter valid email address</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                  </div>\r\n                </div>\r\n\r\n              </form>\r\n              <div class=\"col-12 p-0\">\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-primary form-btns\" (click)=\"saveEmailSetting()\" *ngIf=\"addOrUpdatePermission\"><i class=\"fa fa-save\"></i> Submit</a>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/emailsettings/emailsettings-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/emailsettings/emailsettings-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: EmailsettingsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailsettingsRoutingModule", function() { return EmailsettingsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _emailsettings_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emailsettings.component */ "./src/app/views/emailsettings/emailsettings.component.ts");
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
    { path: '', component: _emailsettings_component__WEBPACK_IMPORTED_MODULE_2__["EmailsettingsComponent"] }
];
var EmailsettingsRoutingModule = /** @class */ (function () {
    function EmailsettingsRoutingModule() {
    }
    EmailsettingsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], EmailsettingsRoutingModule);
    return EmailsettingsRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/emailsettings/emailsettings.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/emailsettings/emailsettings.component.ts ***!
  \****************************************************************/
/*! exports provided: EmailsettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailsettingsComponent", function() { return EmailsettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _emailsettings_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emailsettings.service */ "./src/app/views/emailsettings/emailsettings.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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






var EmailsettingsComponent = /** @class */ (function () {
    function EmailsettingsComponent(emailSettingService, fb, toaster, commonService, route) {
        this.emailSettingService = emailSettingService;
        this.fb = fb;
        this.toaster = toaster;
        this.commonService = commonService;
        this.route = route;
        this.loadSave = false;
        this.emailSettingForm = this.fb.group({
            emailSettingId: [null],
            smtpServer: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            smtpUserName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            smtpPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            smtpPort: [''],
            fromEmailId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    EmailsettingsComponent.prototype.ngOnInit = function () {
        this.loadSave = true;
        this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        this.getEmailSettings();
    };
    EmailsettingsComponent.prototype.getEmailSettings = function () {
        var _this = this;
        this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        this.emailSettingService.getEmailSettings().subscribe(function (res) {
            if (res) {
                _this.loadSave = false;
                _this.displayForm(res);
            }
            else {
                _this.toaster.error("Something went wrong. Please contact site administrator.");
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    EmailsettingsComponent.prototype.displayForm = function (emailSettingModel) {
        if (emailSettingModel) {
            this.emailSettingForm.patchValue({
                emailSettingId: emailSettingModel.emailSettingId,
                smtpServer: emailSettingModel.smtpServer,
                smtpUserName: emailSettingModel.smtpUserName,
                smtpPassword: emailSettingModel.smtpPassword,
                smtpPort: emailSettingModel.smtpPort,
                fromEmailId: emailSettingModel.fromEmailId
            });
        }
    };
    EmailsettingsComponent.prototype.saveEmailSetting = function () {
        var _this = this;
        if (this.emailSettingForm.valid) {
            this.loadSave = true;
            this.emailSettingService.saveEmailSettings(this.emailSettingForm.value).subscribe(function (res) {
                if (res) {
                    _this.toaster.success("Email Setting has been updated successfully.");
                    _this.getEmailSettings();
                    _this.loadSave = false;
                }
                else
                    _this.toaster.error("Something went wrong. Please contact site administrator.");
            }, function (err) {
                _this.toaster.error("Something went wrong. Please contact site administrator.");
                _this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.emailSettingForm);
        }
    };
    Object.defineProperty(EmailsettingsComponent.prototype, "emailSettingId", {
        get: function () { return this.emailSettingForm.get('emailSettingId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailsettingsComponent.prototype, "smtpServer", {
        get: function () { return this.emailSettingForm.get('smtpServer'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailsettingsComponent.prototype, "smtpUserName", {
        get: function () { return this.emailSettingForm.get('smtpUserName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailsettingsComponent.prototype, "smtpPassword", {
        get: function () { return this.emailSettingForm.get('smtpPassword'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailsettingsComponent.prototype, "smtpPort", {
        get: function () { return this.emailSettingForm.get('smtpPort'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailsettingsComponent.prototype, "fromEmailId", {
        get: function () { return this.emailSettingForm.get('fromEmailId'); },
        enumerable: true,
        configurable: true
    });
    EmailsettingsComponent.ctorParameters = function () { return [
        { type: _emailsettings_service__WEBPACK_IMPORTED_MODULE_1__["EmailsettingsService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
    ]; };
    EmailsettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-emailsettings',
            template: __importDefault(__webpack_require__(/*! raw-loader!./emailsettings.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailsettings/emailsettings.component.html")).default
        }),
        __metadata("design:paramtypes", [_emailsettings_service__WEBPACK_IMPORTED_MODULE_1__["EmailsettingsService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], EmailsettingsComponent);
    return EmailsettingsComponent;
}());



/***/ }),

/***/ "./src/app/views/emailsettings/emailsettings.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/emailsettings/emailsettings.module.ts ***!
  \*************************************************************/
/*! exports provided: EmailsettingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailsettingsModule", function() { return EmailsettingsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _emailsettings_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./emailsettings-routing.module */ "./src/app/views/emailsettings/emailsettings-routing.module.ts");
/* harmony import */ var _emailsettings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./emailsettings.component */ "./src/app/views/emailsettings/emailsettings.component.ts");
/* harmony import */ var _emailsettings_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./emailsettings.service */ "./src/app/views/emailsettings/emailsettings.service.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var EmailsettingsModule = /** @class */ (function () {
    function EmailsettingsModule() {
    }
    EmailsettingsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_emailsettings_component__WEBPACK_IMPORTED_MODULE_4__["EmailsettingsComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _emailsettings_routing_module__WEBPACK_IMPORTED_MODULE_3__["EmailsettingsRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"]
            ],
            providers: [_emailsettings_service__WEBPACK_IMPORTED_MODULE_5__["EmailsettingsService"]]
        })
    ], EmailsettingsModule);
    return EmailsettingsModule;
}());



/***/ }),

/***/ "./src/app/views/emailsettings/emailsettings.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/emailsettings/emailsettings.service.ts ***!
  \**************************************************************/
/*! exports provided: EmailsettingsService, EmailSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailsettingsService", function() { return EmailsettingsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailSettings", function() { return EmailSettings; });
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



var EmailsettingsService = /** @class */ (function () {
    function EmailsettingsService(http) {
        this.http = http;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
    }
    EmailsettingsService.prototype.getEmailSettings = function () {
        return this.http.get(this.baseUri + "EmailSettings/GetEmailSettings");
    };
    EmailsettingsService.prototype.saveEmailSettings = function (emailSettingModel) {
        return this.http.post(this.baseUri + "EmailSettings/SaveEmailSettings", emailSettingModel);
    };
    EmailsettingsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    EmailsettingsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], EmailsettingsService);
    return EmailsettingsService;
}());

var EmailSettings = /** @class */ (function () {
    function EmailSettings() {
        this.emailSettingId = null;
        this.smtpServer = "";
        this.smtpPort = "";
        this.smtpUserName = "";
        this.smtpPassword = "";
        this.fromEmailId = "";
    }
    return EmailSettings;
}());



/***/ })

}]);
//# sourceMappingURL=views-emailsettings-emailsettings-module.js.map