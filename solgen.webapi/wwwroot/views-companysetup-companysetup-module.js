(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-companysetup-companysetup-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/companysetup/companysetup.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/companysetup/companysetup.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Company Setup</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \">\r\n    <form [formGroup]=\"companysetupForm\" autocomplete=\"off\">\r\n      <div class=\"row mx-auto mb-2\">\r\n        <h3 class=\"form-heading ng-star-inserted\"><span>General Information</span></h3>\r\n        <div class=\"clearfix\"></div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>Company Name:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" formControlName=\"companyName\" maxlength=\"100\" placeholder=\"Enter Company Name\"\r\n                     [ngClass]=\"{'is-invalid': (companyName.invalid && (companyName.dirty || companyName.touched) && (companyName.errors?.required || companyName.errors?.maxlength)) }\">\r\n              <small *ngIf=\"companyName.invalid && (companyName.dirty || companyName.touched) && companyName.errors?.required\"\r\n                     class=\"text-danger\">Company Name is required</small>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>Company Type:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\" >\r\n              <ng-select [items]=\"lstCompantType\" placeholder=\"Select company Type\" formControlName=\"companyType\"\r\n                         bindValue=\"value\" bindLabel=\"text\"\r\n                         \r\n                         [ngClass]=\"{'is-invalid': (companyType.invalid && (companyType.dirty || companyType.touched) && companyType.errors?.required) }\"></ng-select>\r\n              <small *ngIf=\"companyType.invalid && (companyType.dirty || companyType.touched) && companyType.errors?.required\" class=\"text-danger\">Please select State</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>Phone:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"phone\" placeholder=\"(___) ___-____\" [ngClass]=\"{'is-invalid': (phone.invalid && (phone.dirty || phone.touched) && (phone.errors?.required || phone.errors?.pattern)) }\">\r\n              </p-inputMask>\r\n              <small *ngIf=\"phone.invalid && (phone.dirty || phone.touched) && phone.errors?.required\"\r\n                     class=\"text-danger\">Phone is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>Select company Logo Image:</label>\r\n            <div class=\"form-group\">\r\n              <div class=\"col-md-9 col-lg-9 mb-0 p-0 float-left\">\r\n                <div class=\"custom-file w-100\">\r\n                  <input class=\"custom-file-input\" #file type=\"file\" name='file' #fileInput accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"setFile($event)\" lang=\"es\">\r\n                  <label class=\"custom-file-label\">{{fileName}}</label>\r\n                </div>\r\n                <small>Valid image format is image/x-png, image/gif, image/jpeg and limit upto 5MB.</small>\r\n              </div>\r\n              <div class=\"col-md-3 col-lg-3 mb-0 float-left pl-0 pl-md-3 pr-0\" *ngIf=\"imageLink!=''\">\r\n                <span class=\"uploadedimg\">\r\n                  <img src={{imageLink}} alt=\"img\" style=\"height:37px; width:40px; cursor:pointer\" data-toggle=\"modal\" data-target=\"#myModal\"><a href=\"javascript:void(0);\" (click)=\"delImage(userID,fileUrl)\" *ngIf=\"imageLink.indexOf('NoImage')<0\"><i title=\"Delete\" class=\"fas fa-trash-alt\"></i></a>\r\n                </span>\r\n                <div id=\"myModal\" style=\" background: none !important;\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n                  <div class=\"modal-dialog\" style=\"height:450px!important;width:450px!important; \">\r\n                    <div class=\"\">\r\n                      <button type=\"button\" class=\"close\" style=\"color: #fff!important; \" data-dismiss=\"modal\">&times;</button>\r\n                    </div>\r\n                    <div class=\"modal-content\">\r\n                      <div class=\"text-center\">\r\n                        <img src={{imageLink}} alt=\"img\" style=\"height:450px!important;width:450px!important; \" class=\"img-responsive\">\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>Select company Email Template Image:</label>\r\n            <div class=\"form-group\">\r\n              <div class=\"col-md-9 col-lg-9 mb-0 p-0 float-left\">\r\n                <div class=\"custom-file w-100\">\r\n                  <input class=\"custom-file-input\" #file type=\"file\" name='file' #fileInputemail accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"setFileemail($event)\" lang=\"es\">\r\n                  <label class=\"custom-file-label\">{{fileNameemail}}</label>\r\n                </div>\r\n                <small>Valid image format is image/x-png, image/gif, image/jpeg and limit upto 5MB.</small>\r\n              </div>\r\n              <div class=\"col-md-3 col-lg-3 mb-0 float-left pl-0 pl-md-3 pr-0\" *ngIf=\"imageLink!=''\">\r\n                <span class=\"uploadedimg\">\r\n                  <img src={{imageLinkemail}} alt=\"img\" style=\"height:37px; width:40px; cursor:pointer\" data-toggle=\"modal\" data-target=\"#myModal1\"><a href=\"javascript:void(0);\" (click)=\"delImageemail(userID,fileUrl)\" *ngIf=\"imageLink.indexOf('NoImage')<0\"><i title=\"Delete\" class=\"fas fa-trash-alt\"></i></a>\r\n                </span>\r\n                <div id=\"myModal1\" style=\" background: none !important;\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n                  <div class=\"modal-dialog\" style=\"height:450px!important;width:450px!important; \">\r\n                    <div class=\"\">\r\n                      <button type=\"button\" class=\"close\" style=\"color: #fff!important; \" data-dismiss=\"modal\">&times;</button>\r\n                    </div>\r\n                    <div class=\"modal-content\">\r\n                      <div class=\"text-center\">\r\n                        <img src={{imageLinkemail}} alt=\"img\" style=\"height:450px!important;width:450px!important; \" class=\"img-responsive\">\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"col-12 col-sm-12 col-md-12 col-lg-4\">\r\n            <label>Refresh Interval (Minute):<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" pKeyFilter=\"int\" maxlength=\"3\" class=\"form-control\" placeholder=\"Enter Refresh Interval Minute\" formControlName=\"referenceInterval\"\r\n                     [ngClass]=\"{'is-invalid':(referenceInterval.invalid && (referenceInterval.dirty || referenceInterval.touched) && (referenceInterval.errors?.required || referenceInterval.errors?.maxlength)) }\" />\r\n              <small *ngIf=\"referenceInterval.invalid && (referenceInterval.dirty || referenceInterval.touched) && referenceInterval.errors?.required\"\r\n                     class=\"text-danger\">Reference Interval required</small>\r\n              <small *ngIf=\"referenceInterval.invalid && (referenceInterval.dirty || referenceInterval.touched) && referenceInterval.errors?.min\"\r\n                     class=\"text-danger\">Reference Interval should be greater than 5</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-12 col-sm-12 col-md-12 col-lg-4\">\r\n            <label>Auto Save Interval (Minute):<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" pKeyFilter=\"int\" maxlength=\"2\"  min=\"2\"  class=\"form-control\" placeholder=\"Enter Auto Save Interval Minute\" formControlName=\"autoSaveInterval\"\r\n                     [ngClass]=\"{'is-invalid':(autoSaveInterval.invalid && (autoSaveInterval.dirty || autoSaveInterval.touched) && (autoSaveInterval.errors?.required || autoSaveInterval.errors?.maxlength)) }\" />\r\n              <small *ngIf=\"autoSaveInterval.invalid && (autoSaveInterval.dirty || autoSaveInterval.touched) && autoSaveInterval.errors?.required\"\r\n                     class=\"text-danger\">Auto Save Interval required</small>\r\n                     <small *ngIf=\"autoSaveInterval.invalid && (autoSaveInterval.dirty || autoSaveInterval.touched) && autoSaveInterval.errors?.min\"\r\n                     class=\"text-danger\">Auto Save Interval should be greater than 2</small>                     \r\n                     \r\n              \r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n         \r\n        <h3 class=\"form-heading ng-star-inserted mt-4\"><span>Company Address</span></h3>\r\n        <div class=\"clearfix\"></div>\r\n        <div class=\"col-md-12 p-0\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>City:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" placeholder=\"Enter City\" formControlName=\"city\"\r\n                     [ngClass]=\"{'is-invalid': (city.invalid && (city.dirty || city.touched) && (city.errors?.required || city.errors?.maxlength)) }\">\r\n              <small *ngIf=\"city.invalid && (city.dirty || city.touched) && city.errors?.required\"\r\n                     class=\"text-danger\">City is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>County:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" placeholder=\"Enter County\"\r\n                     formControlName=\"country\"\r\n                     [ngClass]=\"{'is-invalid': (country.invalid && (country.dirty || country.touched) && (country.errors?.required || country.errors?.maxlength)) }\">\r\n              <small *ngIf=\"country.invalid && (country.dirty || country.touched) && country.errors?.required\"\r\n                     class=\"text-danger\">County is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>State:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <ng-select [items]=\"lstStates\" placeholder=\"Select State\" formControlName=\"state\"\r\n                         bindValue=\"value\" bindLabel=\"text\"\r\n                         [ngClass]=\"{'is-invalid': (state.invalid && (state.dirty || state.touched) && state.errors?.required) }\"></ng-select>\r\n              <small *ngIf=\"state.invalid && (state.dirty || state.touched) && state.errors?.required\" class=\"text-danger\">Please select State</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>Zip Code:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" placeholder=\"Enter Zip Code\" formControlName=\"zipCode\"\r\n                     [ngClass]=\"{'is-invalid': (zipCode.invalid && (zipCode.dirty || zipCode.touched) && (zipCode.errors?.required || zipCode.errors?.maxlength)) }\">\r\n              <small *ngIf=\"zipCode.invalid && (zipCode.dirty || zipCode.touched) && zipCode.errors?.required\"\r\n                     class=\"text-danger\">Zip Code is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>Address:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <textarea type=\"text\" class=\"form-control\" formControlName=\"address\" placeholder=\"Enter address\"\r\n                        [ngClass]=\"{'is-invalid': (address.invalid && (address.dirty || address.touched) && (address.errors?.required || address.errors?.maxlength)) }\"></textarea>\r\n              <small *ngIf=\"address.invalid && (address.dirty || address.touched) && address.errors?.required\"\r\n                     class=\"text-danger\">Address is required</small>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        </div>\r\n        <h3 class=\"form-heading ng-star-inserted mt-4\"><span>Email Settings</span></h3>\r\n        <div class=\"clearfix\"></div>\r\n        <div class=\"col-md-12 p-0\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>SMTP Host:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" placeholder=\"Enter SMTP Host (smtp.gmail.com)\" formControlName=\"smtpHost\"\r\n                     [ngClass]=\"{'is-invalid': (smtpHost.invalid && (smtpHost.dirty || smtpHost.touched) && (smtpHost.errors?.required || smtpHost.errors?.maxlength)) }\">\r\n              <small *ngIf=\"smtpHost.invalid && (smtpHost.dirty || smtpHost.touched) && smtpHost.errors?.required\"\r\n                     class=\"text-danger\">SMTP Host is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>SMTP Username:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" placeholder=\"Enter SMTP Usrname\"\r\n                     formControlName=\"smtpUsername\"\r\n                     [ngClass]=\"{'is-invalid': (smtpUsername.invalid && (smtpUsername.dirty || smtpUsername.touched) && (smtpUsername.errors?.required || smtpUsername.errors?.maxlength)) }\">\r\n              <small *ngIf=\"smtpUsername.invalid && (smtpUsername.dirty || smtpUsername.touched) && smtpUsername.errors?.required\"\r\n                     class=\"text-danger\">SMTP Username is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>SMTP Password:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"password\" class=\"form-control\" placeholder=\"Enter SMTP Password\" passwordToggle\r\n                     formControlName=\"smtpPassword\"\r\n                     [ngClass]=\"{'is-invalid': (smtpPassword.invalid && (smtpPassword.dirty || smtpPassword.touched) && (smtpPassword.errors?.required || smtpPassword.errors?.maxlength)) }\">\r\n              <small *ngIf=\"smtpPassword.invalid && (smtpPassword.dirty || smtpPassword.touched) && smtpPassword.errors?.required\"\r\n                     class=\"text-danger\">SMTP Password is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>SMTP Port:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" placeholder=\"Enter SMTP Port\" formControlName=\"smtpPort\"\r\n                     [ngClass]=\"{'is-invalid': (smtpPort.invalid && (smtpPort.dirty || smtpPort.touched) && (smtpPort.errors?.required || smtpPort.errors?.maxlength)) }\">\r\n              <small *ngIf=\"smtpPort.invalid && (smtpPort.dirty || smtpPort.touched) && smtpPort.errors?.required\"\r\n                     class=\"text-danger\">SMTP Port is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>From Email:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" formControlName=\"fromEmail\" placeholder=\"Enter From Email\"\r\n                     [ngClass]=\"{'is-invalid': (fromEmail.invalid && (fromEmail.dirty || fromEmail.touched) && (fromEmail.errors?.required || fromEmail.errors?.maxlength)) }\">\r\n              <small *ngIf=\"fromEmail.invalid && (fromEmail.dirty || fromEmail.touched) && fromEmail.errors?.required\"\r\n                     class=\"text-danger\">From Email is required</small>\r\n            </div>\r\n          </div>\r\n\r\n          <!--<div class=\"col-md-12 col-lg-4\">\r\n\r\n            <label>Enable TLS:</label>\r\n\r\n            <div class=\"form-group\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" formControlName=\"IsTLS\">\r\n                <span class=\"slider round\"><span>Yes</span></span>\r\n              </label>\r\n            </div>\r\n\r\n          </div>-->\r\n\r\n          <div class=\"col-md-12 col-lg-4\">\r\n            <label>Enable SSL:</label>\r\n            <div class=\"form-group\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" formControlName=\"IsEnableSSL\">\r\n                <span class=\"slider round\"><span>Yes</span></span>\r\n              </label>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf=\"isUpdate\" href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"AddEditCompanySetup()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger mr-2\" (click)=\"Cancel()\"><i class=\"fa fa-rotate-left\"></i> Reset</a>\r\n          <a href=\"javascript:void(0)\" (click)=\"checktestemail()\" class=\"btn btn-blue\" ><i class=\"fa fa-key\"></i> Check Test Email</a>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n<div  class=\"modal fade show\" bsModal #changePassModal=\"bs-modal\" tabindex=\"-1\" role=\"dialog\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\" id=\"headerexampleModalLabel\">Test Email</h4>\r\n        <button #closeButton type=\"button\" (click)=\"closepopup()\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"testEmailForm\">\r\n          <div class=\"row mt-3\">\r\n\r\n            <!--<div class=\"col-sm-6\">\r\n              <label>SMTP Host : </label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" disabled formControlName=\"smtpHosttest\">\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <label>SMTP Port : </label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" disabled formControlName=\"smtpPorttest\">\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <label>SMTP Username : </label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" disabled formControlName=\"smtpUN\">\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <label>From Email : </label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" disabled formControlName=\"fromEmailtest\">\r\n              </div>\r\n            </div>-->\r\n            <div class=\"col-sm-6\">\r\n              <label>Email:</label><span class=\"text-danger\">*</span>\r\n              <div class=\"form-group\">\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"emailTo\"\r\n                       [ngClass]=\"{'is-invalid': (emailTo.invalid && (emailTo.dirty || emailTo.touched) && (emailTo.errors?.required || emailTo.errors?.email)) }\">\r\n                <small *ngIf=\"emailTo.invalid && (emailTo.dirty || emailTo.touched) && emailTo.errors?.required\"\r\n                       class=\"text-danger\">Email is required</small>\r\n\r\n                <small *ngIf=\"emailTo.invalid && (emailTo.dirty || emailTo.touched) && emailTo.errors?.email\"\r\n                       class=\"text-danger\">Please enter valid email address</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <label>Message:</label><span class=\"text-danger\">*</span>\r\n              <div class=\"form-group\">\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"messageText\"\r\n                       [ngClass]=\"{'is-invalid': (messageText.invalid && (messageText.dirty || messageText.touched) && (messageText.errors?.required)) }\">\r\n                <small *ngIf=\"messageText.invalid && (messageText.dirty || messageText.touched) && messageText.errors?.required\"\r\n                       class=\"text-danger\">Message is required</small>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"sendEmail();\" ><i class=\"fa fa-save\"></i> Send Email</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\"  (click)=\"closepopup()\" ><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/companysetup/CompanySetup-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/companysetup/CompanySetup-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: CompanySetupRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanySetupRoutingModule", function() { return CompanySetupRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _companysetup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./companysetup.component */ "./src/app/views/companysetup/companysetup.component.ts");
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
    { path: '', component: _companysetup_component__WEBPACK_IMPORTED_MODULE_2__["CompanysetupComponent"] },
];
var CompanySetupRoutingModule = /** @class */ (function () {
    function CompanySetupRoutingModule() {
    }
    CompanySetupRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CompanySetupRoutingModule);
    return CompanySetupRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/companysetup/companysetup.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/views/companysetup/companysetup.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbXBhbnlzZXR1cC9jb21wYW55c2V0dXAuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/companysetup/companysetup.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/views/companysetup/companysetup.component.ts ***!
  \**************************************************************/
/*! exports provided: CompanysetupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanysetupComponent", function() { return CompanysetupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _companysetupservice_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./companysetupservice.service */ "./src/app/views/companysetup/companysetupservice.service.ts");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
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








var CompanysetupComponent = /** @class */ (function () {
    // private sub: Subscription;
    function CompanysetupComponent(fb, fbsentEmail, companysetupserviceService, commonService, router, toaster, route) {
        var _this = this;
        this.fb = fb;
        this.fbsentEmail = fbsentEmail;
        this.companysetupserviceService = companysetupserviceService;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.companySetUpModel = new _companysetupservice_service__WEBPACK_IMPORTED_MODULE_5__["CompanySetUpModel"]();
        this.emailmodel = new _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_6__["emailModel"]();
        this.loadSave = false;
        this.fileName = "Select";
        this.fileNameemail = "Select";
        this.imageLink = '';
        this.imageLinkemail = '';
        //modulePermission: ModuleList;
        this.closeTestMailPopup = true;
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.modulePermission = [];
        this.testEmailForm = this.fbsentEmail.group({
            emailTo: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            messageText: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            smtpHosttest: [''],
            smtpPorttest: [''],
            smtpUN: [''],
            fromEmailtest: ['']
        });
        //this.commonService.getMasterItemsList("status").subscribe((result: any) => {
        //  this.lstStatus = this.commonService.masters;
        //})
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'COMPANYSETUPUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        this.commonService.getMasterItemsList("CompanyType").subscribe(function (result) {
            _this.lstCompantType = _this.commonService.masters;
        });
        //console.log("companyType", this.lstCompantType);
    }
    ;
    CompanysetupComponent.prototype.ngOnInit = function () {
        this.addOrUpdatePermission = this.isUpdate;
        this.initForm();
        this.pageTitle = 'Company SetUp';
        this.getState();
        this.fillForm();
    };
    CompanysetupComponent.prototype.Cancel = function () {
    };
    CompanysetupComponent.prototype.getState = function () {
        var _this = this;
        this.companysetupserviceService.getStateList().subscribe(function (result) {
            _this.lstStates = result;
            console.log("companyType", _this.lstStates);
        });
    };
    CompanysetupComponent.prototype.getCompanyType = function () {
        var _this = this;
        this.commonService.getMasterItemsList("solgen_usertype").subscribe(function (result) {
            _this.lstCompantType = _this.commonService.masters;
        });
    };
    CompanysetupComponent.prototype.AddEditCompanySetup = function () {
        var _this = this;
        if (this.companysetupForm.valid) {
            this.loadSave = true;
            //this.companySetUpModel.companyId = this.companysetupForm.value.companyId;
            //this.companySetUpModel.companyName = this.companysetupForm.value.companyName;
            //this.companySetUpModel.companyType = this.companysetupForm.value.companyType;
            //this.companySetUpModel.phone = this.companysetupForm.value.phone;
            //this.companySetUpModel.companyLogo = this.companysetupForm.value.companyLogo;
            //this.companySetUpModel.city = this.companysetupForm.value.city;
            //this.companySetUpModel.country = this.companysetupForm.value.country;
            //this.companySetUpModel.zipCode = this.companysetupForm.value.zipCode;
            //this.companySetUpModel.state = this.companysetupForm.value.state;
            //this.companySetUpModel.address = this.companysetupForm.value.address;
            //this.companySetUpModel.smtpHost = this.companysetupForm.value.smtpHost;
            //this.companySetUpModel.smtpUsername = this.companysetupForm.value.smtpUsername;
            //this.companySetUpModel.smtpPort = this.companysetupForm.value.smtpPort;
            //this.companySetUpModel.fromEmail = this.companysetupForm.value.fromEmail;
            //this.companySetUpModel.smtpPassword = this.companysetupForm.value.smtpPassword;
            var companySetupModel = this.prepareFormDataForDocument();
            console.log(this.companysetupForm);
            //console.log('companySetupModelcompanySetupModel', companySetupModel);
            this.companysetupserviceService.addOrUpdateCompanySetup(companySetupModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    //this.fileInput.nativeElement.files;
                    _this.fileInput.nativeElement.value = "";
                    _this.fileInputemail.nativeElement.value = "";
                    console.log("fileInput", _this.fileInput.nativeElement.files);
                    //this.router.navigateByUrl("/dashboard");
                    window.location.href = "/companysetup";
                    setTimeout(function () { _this.loadSave = false; }, 3000);
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.companysetupForm);
        }
    };
    CompanysetupComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        input.append('companyId', this.companyId.value);
        input.append('companyName', this.companyName.value);
        input.append('companyType', this.companyType.value == '' ? this.editCompanyType : this.companyType.value);
        input.append('phone', this.phone.value);
        input.append('companyLogo', this.companyLogo.value);
        input.append('emailTemplateLogo', this.emailTemplateLogo.value);
        input.append('referenceInterval', this.referenceInterval.value);
        input.append('autoSaveInterval', this.autoSaveInterval.value);
        input.append('city', this.city.value);
        input.append('country', this.country.value);
        input.append('zipCode', this.zipCode.value);
        input.append('state', this.state.value);
        input.append('address', this.address.value);
        input.append('smtpHost', this.smtpHost.value);
        input.append('smtpUsername', this.smtpUsername.value);
        input.append('smtpPort', this.smtpPort.value);
        input.append('fromEmail', this.fromEmail.value);
        input.append('smtpPassword', this.smtpPassword.value);
        input.append('documentType', this.documentType.value);
        input.append('IsTLS', this.IsTLS.value);
        input.append('IsEnableSSL', this.IsEnableSSL.value);
        if (this.commonService.isUploadImageValid) {
            if (this.companyLogo.value !== null) {
                input.append('filename', this.companyLogo.value);
            }
            if (this.emailTemplateLogo.value !== null) {
                input.append('filenameemail', this.emailTemplateLogo.value);
            }
        }
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            input.append('file', fileBrowser.files[0]);
        }
        var fileBrowseremail = this.fileInputemail.nativeElement;
        if (fileBrowseremail.files && fileBrowseremail.files[0]) {
            input.append('fileemail', fileBrowseremail.files[0]);
        }
        return input;
    };
    CompanysetupComponent.prototype.fillForm = function () {
        var _this = this;
        this.addOrUpdatePermission = this.isUpdate;
        this.companysetupserviceService.getcompanySetupDetail().subscribe(function (result) {
            if (result) {
                _this.loadSave = false;
                _this.pageTitle = 'Company SetUp ';
                if (result.companyType != null) {
                    _this.companyType.disable();
                }
                _this.testEmailForm.patchValue({
                    smtpHosttest: result.smtpHost,
                    smtpPorttest: result.smtPport,
                    smtpUN: result.smtPusername,
                    fromEmailtest: result.fromEmail
                });
                //console.log('result.IsEnableSSL', result.IsEnableSSL); 
                _this.companysetupForm.patchValue({
                    companyId: result.companyId,
                    companyName: result.companyName,
                    companyType: result.companyType,
                    phone: result.phone,
                    companyLogo: result.companyLogo,
                    emailTemplateLogo: result.emailTemplateLogo,
                    referenceInterval: result.referenceInterval,
                    autoSaveInterval: result.autoSaveInterval,
                    city: result.city,
                    country: result.country,
                    zipCode: result.zipCode,
                    state: parseInt(result.state),
                    address: result.address,
                    smtpHost: result.smtpHost,
                    smtpUsername: result.smtPusername,
                    smtpPort: result.smtPport,
                    fromEmail: result.fromEmail,
                    smtpPassword: result.smtPpassword,
                    documentType: result.documentType,
                    IsTLS: result.isTLS,
                    IsEnableSSL: result.isEnableSSL
                });
                _this.fileName = result.companyLogo;
                _this.fileNameemail = result.emailTemplateLogo;
                _this.imageLink = result.imageLink;
                _this.imageLinkemail = result.imagelinkemail;
                _this.editCompanyType = result.companyType;
                console.log('this.companysetupForm', _this.companysetupForm);
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    CompanysetupComponent.prototype.initForm = function () {
        this.companysetupForm = this.fb.group({
            companyId: [''],
            companyName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            companyType: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            companyLogo: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            emailTemplateLogo: [''],
            referenceInterval: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(5),]],
            autoSaveInterval: [2, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(2)]],
            city: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            country: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            zipCode: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
            state: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            address: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(500)]],
            smtpHost: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            smtpPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            smtpUsername: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            smtpPort: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fromEmail: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            documentType: [''],
            IsTLS: [true],
            IsEnableSSL: [true]
        });
    };
    CompanysetupComponent.prototype.setFile = function ($event) {
        this.commonService.uploadImageFileValidator($event);
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB");
        if (this.commonService.isFileValid) {
            this.fileName = $event.target.files[0].name;
            this.companyLogo.setValue($event.target.files[0].name);
        }
    };
    CompanysetupComponent.prototype.setFileemail = function ($event) {
        this.commonService.uploadImageFileValidator($event);
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB");
        if (this.commonService.isFileValid) {
            this.fileNameemail = $event.target.files[0].name;
            this.emailTemplateLogo.setValue($event.target.files[0].name);
        }
    };
    Object.defineProperty(CompanysetupComponent.prototype, "companyId", {
        get: function () { return this.companysetupForm.get('companyId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "companyName", {
        get: function () { return this.companysetupForm.get('companyName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "companyType", {
        get: function () { return this.companysetupForm.get('companyType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "phone", {
        get: function () { return this.companysetupForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "companyLogo", {
        get: function () { return this.companysetupForm.get('companyLogo'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "emailTemplateLogo", {
        get: function () { return this.companysetupForm.get('emailTemplateLogo'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "referenceInterval", {
        get: function () { return this.companysetupForm.get('referenceInterval'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "autoSaveInterval", {
        get: function () { return this.companysetupForm.get('autoSaveInterval'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "city", {
        get: function () { return this.companysetupForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "country", {
        get: function () { return this.companysetupForm.get('country'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "state", {
        get: function () { return this.companysetupForm.get('state'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "zipCode", {
        get: function () { return this.companysetupForm.get('zipCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "address", {
        get: function () { return this.companysetupForm.get('address'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "smtpHost", {
        get: function () { return this.companysetupForm.get('smtpHost'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "smtpUsername", {
        get: function () { return this.companysetupForm.get('smtpUsername'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "smtpPassword", {
        get: function () { return this.companysetupForm.get('smtpPassword'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "smtpPort", {
        get: function () { return this.companysetupForm.get('smtpPort'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "fromEmail", {
        get: function () { return this.companysetupForm.get('fromEmail'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "documentType", {
        get: function () { return this.companysetupForm.get('documentType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "IsTLS", {
        get: function () { return this.companysetupForm.get('IsTLS'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "IsEnableSSL", {
        get: function () { return this.companysetupForm.get('IsEnableSSL'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "emailTo", {
        get: function () { return this.testEmailForm.get('emailTo'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "messageText", {
        get: function () { return this.testEmailForm.get('messageText'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "smtpHosttest", {
        get: function () { return this.testEmailForm.get('smtpHosttest'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "smtpPorttest", {
        get: function () { return this.testEmailForm.get('smtpPorttest'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "smtpUN", {
        get: function () { return this.testEmailForm.get('smtpUN'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanysetupComponent.prototype, "fromEmailtest", {
        get: function () { return this.testEmailForm.get('fromEmailtest'); },
        enumerable: true,
        configurable: true
    });
    CompanysetupComponent.prototype.sendEmail = function () {
        var _this = this;
        this.emailSubject = 'Testing Email';
        this.loadSave = true;
        if (this.testEmailForm.valid) {
            console.log('this.smtpPassword.value', this.smtpPassword.value);
            var model = {
                ToEmail: this.emailTo.value,
                Subject: this.emailSubject,
                Message: this.messageText.value,
                FromEmail: this.fromEmail.value,
                SmtpHost: this.smtpHost.value,
                SmtpPort: this.smtpPort.value,
                Username: this.smtpUsername.value,
                Password: this.smtpPassword.value,
                IsEnableSSL: this.IsEnableSSL.value
            };
            console.log(model);
            this.companysetupserviceService.SendEmail(model).subscribe(function (result) {
                console.log('SendEmailData', result);
                if (result.statusCode == 200) {
                    setTimeout(function () {
                        _this.toaster.success(result.responseMessage);
                        _this.loadSave = false;
                    }, 1000);
                    _this.testEmailForm.reset();
                    _this.changePassModal.hide();
                }
                else {
                    _this.toaster.error(result.responseMessage);
                    _this.loadSave = false;
                    _this.testEmailForm.reset();
                    _this.changePassModal.hide();
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.testEmailForm);
        }
    };
    CompanysetupComponent.prototype.closepopup = function () {
        this.changePassModal.hide();
        this.testEmailForm.reset();
    };
    CompanysetupComponent.prototype.checktestemail = function () {
        this.changePassModal.show();
    };
    CompanysetupComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _companysetupservice_service__WEBPACK_IMPORTED_MODULE_5__["CompanysetupserviceService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", Object)
    ], CompanysetupComponent.prototype, "fileInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInputemail', { static: false }),
        __metadata("design:type", Object)
    ], CompanysetupComponent.prototype, "fileInputemail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('changePassModal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["ModalDirective"])
    ], CompanysetupComponent.prototype, "changePassModal", void 0);
    CompanysetupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-companysetup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./companysetup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/companysetup/companysetup.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./companysetup.component.scss */ "./src/app/views/companysetup/companysetup.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _companysetupservice_service__WEBPACK_IMPORTED_MODULE_5__["CompanysetupserviceService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], CompanysetupComponent);
    return CompanysetupComponent;
}());



/***/ }),

/***/ "./src/app/views/companysetup/companysetup.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/companysetup/companysetup.module.ts ***!
  \***********************************************************/
/*! exports provided: CompanysetupModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanysetupModule", function() { return CompanysetupModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _CompanySetup_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CompanySetup-routing.module */ "./src/app/views/companysetup/CompanySetup-routing.module.ts");
/* harmony import */ var _companysetup_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./companysetup.component */ "./src/app/views/companysetup/companysetup.component.ts");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-password-toggle */ "./node_modules/ngx-password-toggle/ngx-password-toggle.umd.js");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var primeng_keyfilter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/keyfilter */ "./node_modules/primeng/keyfilter.js");
/* harmony import */ var primeng_keyfilter__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_keyfilter__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





//import { NgxDatatableModule } from '@swimlane/ngx-datatable';






var CompanysetupModule = /** @class */ (function () {
    function CompanysetupModule() {
    }
    CompanysetupModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_companysetup_component__WEBPACK_IMPORTED_MODULE_6__["CompanysetupComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _CompanySetup_routing_module__WEBPACK_IMPORTED_MODULE_5__["CompanySetupRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__["ModalModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__["NgxPasswordToggleModule"], primeng_keyfilter__WEBPACK_IMPORTED_MODULE_8__["KeyFilterModule"]
            ]
        })
    ], CompanysetupModule);
    return CompanysetupModule;
}());



/***/ }),

/***/ "./src/app/views/companysetup/companysetupservice.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/companysetup/companysetupservice.service.ts ***!
  \*******************************************************************/
/*! exports provided: CompanysetupserviceService, CompanySetUpModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanysetupserviceService", function() { return CompanysetupserviceService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanySetUpModel", function() { return CompanySetUpModel; });
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



var CompanysetupserviceService = /** @class */ (function () {
    function CompanysetupserviceService(http) {
        this.http = http;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
        this.insuranceUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl + "ManageInsurance";
    }
    CompanysetupserviceService.prototype.getStateList = function () {
        return this.http.get(this.baseUri + "ManageInsurance/GetStateList");
    };
    CompanysetupserviceService.prototype.getcompanySetupDetail = function () {
        return this.http.get(this.baseUri + "ConfigurationSetting/getcompanySetupDetail");
    };
    CompanysetupserviceService.prototype.addOrUpdateCompanySetup = function (CompanySetUpModel) {
        return this.http.post(this.baseUri + "ConfigurationSetting/AddOrUpdateCompanySetup", CompanySetUpModel);
    };
    CompanysetupserviceService.prototype.SendEmail = function (model) {
        return this.http.post(this.baseUri + "Bank/SendEmail", model);
    };
    CompanysetupserviceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    CompanysetupserviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], CompanysetupserviceService);
    return CompanysetupserviceService;
}());

var CompanySetUpModel = /** @class */ (function () {
    function CompanySetUpModel() {
        this.companyId = "";
        this.companyName = "";
        this.companyType = "";
        this.phone = "";
        this.companyLogo = "";
        this.emailTemplateLogo = "";
        this.referenceInterval = "";
        this.autoSaveInterval = 2;
        this.city = "";
        this.country = "";
        this.zipCode = "";
        this.state = "";
        this.address = "";
        this.smtpHost = "";
        this.smtpUsername = "";
        this.smtpPort = "";
        this.fromEmail = "";
        this.smtpPassword = "";
        this.IsTLS = false;
        this.IsEnableSSL = false;
    }
    return CompanySetUpModel;
}());



/***/ })

}]);
//# sourceMappingURL=views-companysetup-companysetup-module.js.map