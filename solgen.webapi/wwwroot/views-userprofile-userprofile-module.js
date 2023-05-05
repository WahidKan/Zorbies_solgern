(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-userprofile-userprofile-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/userprofile/userprofile.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/userprofile/userprofile.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<style>  .pwdtoggle > div {\r\n    width: 46px !important;\r\n    height: 46px !important;\r\n  }\r\n</style>\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>My Profile</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white pb-4\">\r\n            <div class=\"col-md-12 mt-4 p-1\">\r\n              <form [formGroup]=\"userProfileForm\" autocomplete=\"off\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-12 col-md-12 col-lg-4\">\r\n                    <label>First Name:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"firstName\" maxlength=\"50\"\r\n                             [ngClass]=\"{'is-invalid': (firstName.invalid && (firstName.dirty || firstName.touched) && (firstName.errors?.required || firstName.errors?.maxlength)) }\">\r\n                      <small *ngIf=\"firstName.invalid && (firstName.dirty || firstName.touched) && firstName.errors?.required\"\r\n                             class=\"text-danger\">First Name is required</small>\r\n                      <input type=\"hidden\" formControlName=\"Id\" />\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-12 col-lg-4\">\r\n                    <label>Last Name:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"lastName\" maxlength=\"50\"\r\n                             [ngClass]=\"{'is-invalid': (lastName.invalid && (lastName.dirty || lastName.touched) && (lastName.errors?.required || lastName.errors?.maxlength)) }\">\r\n                      <small *ngIf=\"lastName.invalid && (lastName.dirty || lastName.touched) && lastName.errors?.required\"\r\n                             class=\"text-danger\">Last Name is required</small>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-12 col-md-12 col-lg-4\">\r\n                    <label>Email:</label><span class=\"text-danger\">*</span>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"email\" maxlength=\"50\"\r\n                             [ngClass]=\"{'is-invalid': (email.invalid && (email.dirty || email.touched) && (email.errors?.required || email.errors?.email)) }\">\r\n                      <small *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors?.required\"\r\n                             class=\"text-danger\">Email is required</small>\r\n                      <small *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors?.email\"\r\n                             class=\"text-danger\">Please enter valid email address</small>\r\n                      <input type=\"hidden\" formControlName=\"hdnEmail\" />\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-12 col-lg-4\">\r\n                    <label>Phone:</label>\r\n                    <div class=\"form-group\">\r\n                      <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"phone\" placeholder=\"(___) ___-____\"></p-inputMask>\r\n                      <!--<input type=\"text\" class=\"form-control\" formControlName=\"phone\" maxlength=\"50\" />-->\r\n                      <!--<small *ngIf=\"phone.touched && phone.errors?.pattern\"\r\n             class=\"text-danger\">Please enter valid Phone</small>-->\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-12 col-sm-12 col-md-12 col-lg-4\">\r\n                    <label>Select Profile Image:</label>\r\n                    <div class=\"form-group\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-md-10 col-lg-10 mb-0\">\r\n                          <div class=\"custom-file w-100\">\r\n                            <input class=\"custom-file-input\" #file type=\"file\" name='file' #fileInput accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"setFile($event)\" lang=\"es\">\r\n                            <label class=\"custom-file-label\">{{fileName}}</label>\r\n                          </div>\r\n                          <small><i class=\"text-primary\">Valid image format is image/x-png, image/gif, image/jpeg and limit upto 10MB.</i> </small>\r\n                        </div>\r\n                        <div class=\"col-md-2 col-lg-2 mb-0\" *ngIf=\"imageLink!=''\">\r\n                          <span class=\"uploadedimg\">\r\n                            <img src={{imageLink}} alt=\"img\" style=\"height:37px; width:40px; cursor:pointer\" data-toggle=\"modal\" data-target=\"#myModal\"><a href=\"javascript:void(0);\" (click)=\"delImage(userID,fileUrl)\" *ngIf=\"imageLink.indexOf('NoImage')<0\"><i title=\"Delete\" class=\"fas fa-trash-alt\"></i></a>\r\n                          </span>\r\n\r\n                          <div id=\"myModal\" style=\" background: none !important;\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n                            <div class=\"modal-dialog\" style=\"max-height:320px!important; max-width:320px!important; \">\r\n                              <div class=\"\">\r\n                                <button type=\"button\" class=\"close\" style=\"color: #fff!important; \" data-dismiss=\"modal\">&times;</button>\r\n                              </div>\r\n                              <div class=\"modal-content\">\r\n                                <div class=\"text-center\">\r\n                                  <img src={{imageLink}} alt=\"img\" style=\"height:320px!important;width:320px!important; \" class=\"img-responsive\">\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-12 col-md-12 col-lg-4\">\r\n                    <label>Address:</label>\r\n                    <div class=\"form-group\">\r\n                      <textarea class=\"form-control\" formControlName=\"address\" maxlength=\"500\"></textarea>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-12 col-lg-4\">\r\n                    <label>City:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" formControlName=\"city\" maxlength=\"50\"\r\n                             [ngClass]=\"{'is-invalid': (city.invalid && (city.dirty || city.touched) && (city.errors?.required || city.errors?.maxlength)) }\">\r\n                      <small *ngIf=\"city.invalid && (city.dirty || city.touched) && city.errors?.required\"\r\n                             class=\"text-danger\">City is required</small>\r\n                      <input type=\"hidden\" formControlName=\"Id\" />\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-md-12 col-lg-4\">\r\n                    <label>Country:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"countryLists\" placeholder=\"Select country\" formControlName=\"county\"\r\n                                 bindLabel=\"text\" bindValue=\"value\"\r\n                                 [ngClass]=\"{'is-invalid': (county.invalid && (county.dirty || county.touched) && county.errors?.required) }\"></ng-select>\r\n                      <small *ngIf=\"county.invalid && (county.dirty || county.touched) && county.errors?.required\" class=\"text-danger\">Please select country</small>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-12 col-md-12 col-lg-4\">\r\n                    <label>State:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"statesList\" placeholder=\"Select State\" formControlName=\"state\"\r\n                                 bindLabel=\"text\" bindValue=\"stateGuidValues\"\r\n                                 [ngClass]=\"{'is-invalid': (state.invalid && (state.dirty || state.touched) && state.errors?.required) }\"></ng-select>\r\n                      <small *ngIf=\"state.invalid && (state.dirty || state.touched) && state.errors?.required\" class=\"text-danger\">Please select State</small>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-md-12 col-lg-4\">\r\n                    <label>Zip Code:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" placeholder=\"Enter Zip Code\" formControlName=\"zipCode\"\r\n                             [ngClass]=\"{'is-invalid': (zipCode.invalid && (zipCode.dirty || zipCode.touched) && (zipCode.errors?.required || zipCode.errors?.maxlength)) }\">\r\n                      <small *ngIf=\"zipCode.invalid && (zipCode.dirty || zipCode.touched) && zipCode.errors?.required\"\r\n                             class=\"text-danger\">Zip Code is required</small>\r\n                      <small *ngIf=\"zipCode.invalid && (zipCode.dirty || zipCode.touched) && zipCode.errors?.maxlength\"\r\n                             class=\"text-danger\">Zip Code can not be greater than 5 characters.</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 col-lg-4\">\r\n                    <label>Time Format:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"lstTimeFormat\" placeholder=\"Select Time Format\" formControlName=\"timeFormat\"\r\n                                 bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (timeFormat.invalid && (timeFormat.dirty || timeFormat.touched) && timeFormat.errors?.required) }\"></ng-select>\r\n                      <small *ngIf=\"timeFormat.invalid && (timeFormat.dirty || timeFormat.touched) && timeFormat.errors?.required\" class=\"text-danger\">Please select Time Zone</small>\r\n\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 col-lg-4\">\r\n                    <label>Time Zone:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <ng-select [items]=\"lstTimeZone\" placeholder=\"Select Time Zone\" formControlName=\"timeZoneId\"\r\n                                 bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (timeZoneId.invalid && (timeZoneId.dirty || timeZoneId.touched) && timeZoneId.errors?.required) }\"></ng-select>\r\n                      <small *ngIf=\"timeZoneId.invalid && (timeZoneId.dirty || timeZoneId.touched) && timeZoneId.errors?.required\" class=\"text-danger\">Please select Time Zone</small>\r\n\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-12 col-lg-4\" *ngIf=\"IsDealer\">\r\n                    <label>Company URL:<span class=\"text-danger\">*</span></label>\r\n                    <div class=\"form-group\">\r\n                      <a target=\"_blank\" href='http://{{dealerCompanyUrl}}'>{{dealerCompanyUrl}}</a>\r\n                    </div>\r\n                  </div>\r\n\r\n\r\n                </div>\r\n                <div class=\"col-12 p-0 text-right\">\r\n                  <a href=\"javascript:void(0);\" class=\"btn btn-success\" (click)=\"updateUserProfile()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                  <!--<a href=\"javascript:void(0)\" class=\"btn blue-btn form-btns\" data-toggle=\"modal\" data-target=\"#headerpassword\"><i class=\"fa fa-key\"></i> Change Password</a>-->\r\n                </div>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div #changePassModal class=\"modal fade\" id=\"headerpassword\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"headerexampleModalLabel\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h4 class=\"modal-title\" id=\"headerexampleModalLabel\">Change Password</h4>\r\n            <button #closeButton type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <form [formGroup]=\"changePasswordForm\">\r\n              <div class=\"row mt-3\">\r\n                <div class=\"col-sm-6\">\r\n                  <label>Current Password:</label><span class=\"text-danger\">*</span>\r\n                  <div class=\"form-group pwdtoggle\">\r\n                    <input class=\"form-control\" type=\"password\" passwordToggle formControlName=\"currentPassword\"\r\n                           [ngClass]=\"{'is-invalid': (currentPassword.invalid && (currentPassword.dirty || currentPassword.touched) && (currentPassword.errors?.required || currentPassword.errors?.maxlength)) }\">\r\n                    <small *ngIf=\"currentPassword.invalid && (currentPassword.dirty || currentPassword.touched) && currentPassword.errors?.required\"\r\n                           class=\"text-danger\">Current Password is required</small>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-sm-6\">\r\n                  <label>New Password:</label><span class=\"text-danger\">*</span>\r\n                  <div class=\"form-group pwdtoggle\">\r\n                    <input class=\"form-control\" type=\"password\" formControlName=\"newPassword\" passwordToggle\r\n                           [ngClass]=\"{'is-invalid': (newPassword.invalid && (newPassword.dirty || newPassword.touched) && (newPassword.errors?.required || newPassword.errors?.maxlength)) }\">\r\n                    <small *ngIf=\"newPassword.invalid && (newPassword.dirty || newPassword.touched) && newPassword.errors?.required\"\r\n                           class=\"text-danger\">New Password is required</small>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-sm-6\">\r\n                  <label>Confirm Password:</label><span class=\"text-danger\">*</span>\r\n                  <div class=\"form-group pwdtoggle\">\r\n                    <input class=\"form-control\" type=\"password\" formControlName=\"confirmPassword\" passwordToggle\r\n                           [ngClass]=\"{'is-invalid': (confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched) && (confirmPassword.errors?.required || confirmPassword.errors?.maxlength)) }\">\r\n                    <small *ngIf=\"confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched) && confirmPassword.errors?.required\"\r\n                           class=\"text-danger\">Confirm Password is required</small>\r\n                    <small *ngIf=\"!confirmPassword.valid  && confirmPassword.hasError('notmatch')\"\r\n                           class=\"text-danger\">Confirm password does not match</small>\r\n\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-sm-12\">\r\n                  <p class=\"alert-warning p-2\">Note: Password should be combination of lower case, upper case, numeric and special character.</p>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"changePassword();\"><i class=\"fa fa-save\"></i> Save changes</button>\r\n            <button type=\"submit\" class=\"btn btn-danger form-btns\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </section>\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/userprofile/userProfile.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/userprofile/userProfile.service.ts ***!
  \**********************************************************/
/*! exports provided: UserprofileService, UserProfileModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserprofileService", function() { return UserprofileService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileModal", function() { return UserProfileModal; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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




var UserprofileService = /** @class */ (function () {
    function UserprofileService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
    }
    UserprofileService.prototype.getUserProfile = function () {
        return this.http.get(this.baseUri + "UserProfile/GetUserDetail");
    };
    UserprofileService.prototype.getDealerAccountDetail = function () {
        return this.http.get(this.baseUri + "UserProfile/GetDealerAccountDetail");
    };
    UserprofileService.prototype.getCountryList = function () {
        return this.http.get(this.baseUri + "ManageInsurance/GetCountryList");
    };
    UserprofileService.prototype.getStateList = function () {
        return this.http.get(this.baseUri + "ManageInsurance/GetStateList");
    };
    UserprofileService.prototype.updateUserProfile = function (userProfileModel) {
        return this.http.post(this.baseUri + "UserProfile/updateUserProfile", userProfileModel);
    };
    UserprofileService.prototype.uploadProfilePic = function (profilePic) {
        return this.http.post(this.baseUri + "UserProfile/UploadProfilePic", profilePic);
    };
    UserprofileService.prototype.delImage = function (id, imgname) {
        var url = this.baseUri + ("UserProfile/DeleteUserImage?id=" + id + "&imgname=" + imgname);
        return this.http.delete(url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return true;
        }));
    };
    UserprofileService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    UserprofileService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserprofileService);
    return UserprofileService;
}());

var UserProfileModal = /** @class */ (function () {
    function UserProfileModal() {
        this.FirstName = "";
        this.LastName = "";
        this.UserType = "";
        this.Email = "";
        this.PhoneNumber = "";
        this.Address = "";
        this.City = "";
        this.County = "";
        this.State = "";
        this.ZipCode;
        this.Position = "";
        this.employeeType = "";
        this.isActive = false;
        this.notes = "";
        this.Id = "";
        this.profilePic = "";
        this.timeZoneId = "";
        this.timeFormat = "";
    }
    return UserProfileModal;
}());



/***/ }),

/***/ "./src/app/views/userprofile/userprofile-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/userprofile/userprofile-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: UserRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoutingModule", function() { return UserRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _userprofile_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userprofile.component */ "./src/app/views/userprofile/userprofile.component.ts");
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
    { path: '', component: _userprofile_component__WEBPACK_IMPORTED_MODULE_2__["UserprofileComponent"] },
];
var UserRoutingModule = /** @class */ (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], UserRoutingModule);
    return UserRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/userprofile/userprofile.component.ts":
/*!************************************************************!*\
  !*** ./src/app/views/userprofile/userprofile.component.ts ***!
  \************************************************************/
/*! exports provided: UserprofileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserprofileComponent", function() { return UserprofileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _userProfile_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userProfile.service */ "./src/app/views/userprofile/userProfile.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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










var UserprofileComponent = /** @class */ (function () {
    function UserprofileComponent(fb, fbPassword, userService, commonService, router, toaster, route, http, dialogService, location) {
        this.fb = fb;
        this.fbPassword = fbPassword;
        this.userService = userService;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.http = http;
        this.dialogService = dialogService;
        this.location = location;
        this.userModel = new _userProfile_service__WEBPACK_IMPORTED_MODULE_3__["UserProfileModal"]();
        this.fileName = 'Select File';
        this.imageLink = '';
        this.fileUrl = '';
        this.userID = null;
        this.isUploadImageValid = true;
        this.passwordModel = new _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["ChangePasswordModel"]();
        this.loadSave = false;
        this.IsDealer = false;
        this.userProfileForm = this.fb.group({
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            userType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            //phone: ['', Validators.pattern("^[0-9]*$")],
            phone: [''],
            address: [''],
            city: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            county: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            state: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            zipCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            timeZoneId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            timeFormat: ['12', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            position: [null],
            empType: [null],
            isActive: [''],
            notes: [''],
            Id: [null],
            profilePic: [''],
            'file': '',
            'filename': null,
            hdnEmail: [''],
        });
        //------------------------------- Change Password
        this.changePasswordForm = this.fbPassword.group({
            currentPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            newPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        }, {
            validator: PasswordMatch('newPassword', 'confirmPassword')
        });
    }
    ;
    Object.defineProperty(UserprofileComponent.prototype, "firstName", {
        get: function () { return this.userProfileForm.get('firstName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "lastName", {
        get: function () { return this.userProfileForm.get('lastName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "userType", {
        get: function () { return this.userProfileForm.get('userType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "email", {
        get: function () { return this.userProfileForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "phone", {
        get: function () { return this.userProfileForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "address", {
        get: function () { return this.userProfileForm.get('address'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "city", {
        get: function () { return this.userProfileForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "county", {
        get: function () { return this.userProfileForm.get('county'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "state", {
        get: function () { return this.userProfileForm.get('state'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "zipCode", {
        get: function () { return this.userProfileForm.get('zipCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "position", {
        get: function () { return this.userProfileForm.get('position'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "empType", {
        get: function () { return this.userProfileForm.get('empType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "isActive", {
        get: function () { return this.userProfileForm.get('isActive'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "notes", {
        get: function () { return this.userProfileForm.get('notes'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "Id", {
        get: function () { return this.userProfileForm.get('Id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "profilePic", {
        get: function () { return this.userProfileForm.get('profilePic'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "filename", {
        get: function () { return this.userProfileForm.get('filename'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "hdnEmail", {
        get: function () { return this.userProfileForm.get('hdnEmail'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "timeZoneId", {
        get: function () { return this.userProfileForm.get('timeZoneId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "timeFormat", {
        get: function () { return this.userProfileForm.get('timeFormat'); },
        enumerable: true,
        configurable: true
    });
    UserprofileComponent.prototype.prepareFormDataForupdateUserProfile = function () {
        var input = new FormData();
        input.append('firstName', this.firstName.value);
        input.append('firstName', this.firstName.value);
        input.append('lastName', this.lastName.value);
        input.append('userType', this.userType.value);
        input.append('email', this.email.value);
        input.append('phoneNumber', this.phone.value);
        input.append('profilePic', this.profilePic.value);
        input.append('address', this.address.value);
        input.append('city', this.city.value);
        input.append('county', this.county.value);
        input.append('state', this.state.value);
        input.append('zipCode', this.zipCode.value);
        input.append('position', this.position.value);
        input.append('isActive', this.isActive.value);
        input.append('notes', this.notes.value);
        input.append('timeZoneId', this.timeZoneId.value);
        input.append('timeFormat', this.timeFormat.value);
        input.append('Id', this.Id.value);
        if (this.commonService.isUploadImageValid) {
            if (this.filename.value !== null) {
                input.append('filename', this.filename.value);
            }
        }
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            input.append('file', fileBrowser.files[0]);
        }
        return input;
    };
    UserprofileComponent.prototype.fillForm = function () {
        var _this = this;
        this.userService.getUserProfile().subscribe(function (result) {
            if (result) {
                _this.loadSave = false;
                debugger;
                _this.userProfileForm.patchValue({
                    Id: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    userType: result.userType,
                    email: result.email,
                    phone: result.phoneNumber,
                    address: result.address,
                    city: result.city,
                    county: parseInt(result.county),
                    state: result.state,
                    zipCode: result.zipCode,
                    isActive: result.isActive,
                    notes: result.notes,
                    profilePic: result.profilePic,
                    hdnEmail: result.email,
                    timeZoneId: result.timezone,
                    timeFormat: result.timeformat
                });
                _this.imageLink = result.profilePicLink;
                _this.fileUrl = result.profilePic;
            }
        });
        // this.email.disable();
    };
    UserprofileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTimeFormatList();
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            if (typeof userdetail.id !== 'undefined' && userdetail.id != null)
                _this.userID = userdetail.id;
            if (userdetail.userType == "usertypedealer") {
                _this.IsDealer = true;
            }
            else {
                _this.IsDealer = false;
            }
        });
        this.pageTitle = 'My Profile';
        this.fillForm();
        this.getState();
        this.getCountryDropdownList();
        this.getTimeZoneList();
        this.GetDealerDetail();
    };
    UserprofileComponent.prototype.getTimeFormatList = function () {
        this.lstTimeFormat = this.commonService.getTimeFormatList();
    };
    UserprofileComponent.prototype.getTimeZoneList = function () {
        var _this = this;
        this.commonService.getTimeZoneList().subscribe(function (resp) {
            _this.lstTimeZone = JSON.parse(resp);
        });
    };
    UserprofileComponent.prototype.getCountryDropdownList = function () {
        var _this = this;
        this.userService.getCountryList().subscribe(function (result) {
            _this.countryLists = result;
        });
    };
    UserprofileComponent.prototype.getState = function () {
        var _this = this;
        this.userService.getStateList().subscribe(function (result) {
            var data = result;
            _this.statesList = data;
        });
    };
    UserprofileComponent.prototype.updateUserProfile = function () {
        var _this = this;
        console.log("sdsdsdds", this.userProfileForm.controls['email'].value);
        var isUpdate = true;
        if (this.userProfileForm.valid) {
            if (this.userProfileForm.controls['email'].value != this.userProfileForm.value.hdnEmail) {
                this.dialogService.confirm('User profile', 'If you update your Email then you will be logged out automatically, Are you sure you want to update Email?').subscribe(function (confirmed) {
                    if (confirmed) {
                        _this.update(2);
                    }
                    else {
                        _this.userProfileForm.patchValue({ email: _this.userProfileForm.value.hdnEmail });
                    }
                });
            }
            else { //same email
                this.update(1);
            }
        }
        else {
            this.commonService.validateAllFormFields(this.userProfileForm);
        }
    };
    UserprofileComponent.prototype.Back = function () {
        this.router.navigateByUrl("/dashboard");
    };
    UserprofileComponent.prototype.update = function (reload) {
        var _this = this;
        this.loadSave = true;
        this.userModel.Id = this.userProfileForm.value.Id;
        this.userModel.FirstName = this.userProfileForm.value.firstName;
        this.userModel.LastName = this.userProfileForm.value.lastName;
        this.userModel.PhoneNumber = this.userProfileForm.value.phone;
        this.userModel.Address = this.userProfileForm.value.address;
        this.userModel.isActive = this.userProfileForm.value.isActive == "" ? false : true;
        this.userModel.notes = this.userProfileForm.value.notes;
        this.userModel.profilePic = this.userProfileForm.value.profilePic;
        this.userModel.Email = this.userProfileForm.value.email;
        this.userModel.City = this.userProfileForm.value.city;
        this.userModel.County = this.userProfileForm.value.county;
        this.userModel.State = this.userProfileForm.value.state;
        this.userModel.ZipCode = this.userProfileForm.value.zipCode;
        this.userModel.timeZoneId = this.timeZoneId.value;
        this.userModel.timeFormat = this.timeFormat.value;
        if (this.fileUrl != null) {
            this.userModel.profilePic = this.fileUrl;
        }
        var formDataUserModel = this.prepareFormDataForupdateUserProfile();
        this.userService.updateUserProfile(formDataUserModel).subscribe(function (result) {
            if (result.statusCode == 200) {
                _this.toaster.success(result.responseMessage);
                if (reload == 1) {
                    window.location.reload();
                }
                else if (reload == 2) {
                    _this.commonService.logoutFromMyPrifle();
                }
            }
            else {
                _this.loadSave = false;
                _this.toaster.error(result.responseMessage);
            }
        }, function (err) {
            _this.loadSave = false;
        }, function () {
            _this.loadSave = false;
        });
    };
    Object.defineProperty(UserprofileComponent.prototype, "currentPassword", {
        get: function () { return this.changePasswordForm.get('currentPassword'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "newPassword", {
        get: function () { return this.changePasswordForm.get('newPassword'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserprofileComponent.prototype, "confirmPassword", {
        get: function () { return this.changePasswordForm.get('confirmPassword'); },
        enumerable: true,
        configurable: true
    });
    UserprofileComponent.prototype.changePassword = function () {
        var _this = this;
        if (this.changePasswordForm.valid) {
            this.passwordModel.currentPassword = this.changePasswordForm.value.currentPassword;
            this.passwordModel.password = this.changePasswordForm.value.newPassword;
            this.passwordModel.confirmPassword = this.changePasswordForm.value.confirmPassword;
            this.commonService.ChangePassword(this.passwordModel).subscribe(function (response) {
                if (response.statusCode == 200) {
                    _this.toaster.success(response.responseMessage);
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
    UserprofileComponent.prototype.delImage = function (id, imgname) {
        var _this = this;
        var message = "Are you sure you want to delete Profile Image.?";
        this.dialogService.confirm('Delete Image', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.userService.delImage(id, imgname).subscribe(function (r) {
                    if (r) {
                        _this.imageLink = "";
                        _this.fileName = 'Select File';
                        _this.fillForm();
                        window.location.reload();
                        _this.toaster.success("Image deleted successfully.");
                    }
                    else {
                        _this.toaster.error("Something went wrong please contact site administrator.");
                    }
                });
            }
        });
    };
    Object.defineProperty(UserprofileComponent.prototype, "file", {
        get: function () {
            return this.userProfileForm.get('file');
        },
        enumerable: true,
        configurable: true
    });
    UserprofileComponent.prototype.setFile = function ($event) {
        this.commonService.uploadProfileImageFileValidator($event);
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "10MB");
        if (this.commonService.isFileValid) {
            this.fileName = $event.target.files[0].name;
        }
    };
    UserprofileComponent.prototype.GetDealerDetail = function () {
        var _this = this;
        this.userService.getDealerAccountDetail().subscribe(function (result) {
            console.log("return", result);
            if (result) {
                _this.dealerCompanyUrl = result.companyUrl;
            }
        });
        // this.email.disable();
    };
    UserprofileComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _userProfile_service__WEBPACK_IMPORTED_MODULE_3__["UserprofileService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", Object)
    ], UserprofileComponent.prototype, "fileInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('changePassModal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], UserprofileComponent.prototype, "modal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeButton', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], UserprofileComponent.prototype, "button", void 0);
    UserprofileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-userprofile',
            template: __importDefault(__webpack_require__(/*! raw-loader!./userprofile.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/userprofile/userprofile.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _userProfile_service__WEBPACK_IMPORTED_MODULE_3__["UserprofileService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogService"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"]])
    ], UserprofileComponent);
    return UserprofileComponent;
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

/***/ "./src/app/views/userprofile/userprofile.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/userprofile/userprofile.module.ts ***!
  \*********************************************************/
/*! exports provided: UserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _userprofile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userprofile.component */ "./src/app/views/userprofile/userprofile.component.ts");
/* harmony import */ var _userprofile_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./userprofile-routing.module */ "./src/app/views/userprofile/userprofile-routing.module.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-password-toggle */ "./node_modules/ngx-password-toggle/ngx-password-toggle.umd.js");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ngx_password_toggle__WEBPACK_IMPORTED_MODULE_8__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _userprofile_component__WEBPACK_IMPORTED_MODULE_3__["UserprofileComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _userprofile_routing_module__WEBPACK_IMPORTED_MODULE_4__["UserRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectModule"], ngx_password_toggle__WEBPACK_IMPORTED_MODULE_8__["NgxPasswordToggleModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"]
            ]
        })
    ], UserModule);
    return UserModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-userprofile-userprofile-module.js.map