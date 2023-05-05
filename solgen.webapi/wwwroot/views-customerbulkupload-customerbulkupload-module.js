(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-customerbulkupload-customerbulkupload-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/customerbulkupload/bulkupload.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/customerbulkupload/bulkupload.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-9 mt-3\">\r\n          <span class=\"dash\">Customer Bulk Upload</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Customer Bulk Upload</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- Header Section-->\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"contact-box\" [ngClass]=\"{'disabled':loading}\">\r\n        <div class=\"row d-flex align-items-md-stretch\">\r\n          <div class=\"col-12\">\r\n            <div class=\"bg-white border rounded pb-4\">\r\n              <div class=\"col-md-8 mt-4\">\r\n                <label>Select Document:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <div class=\"input-group\">\r\n                    <div class=\"custom-file\">\r\n                      <input class=\"custom-file-input\" type=\"file\" name='file' (change)=\"onFileChange($event)\" #fileInput>\r\n                      <label class=\"custom-file-label\">{{fileName}}</label>\r\n                    </div>\r\n                  </div>\r\n                  <small *ngIf=\"!isValid\" class=\"text-danger\">Document is required<br /></small>\r\n                  <small><i class=\"text-primary\">Valid documents format is .xls,.xlsx and limit upto 25MB.</i></small>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-8\">\r\n                Click <a href=\"{{excelDocumentNameLink}}\">here</a> to download the Sample File for Customer Bulk Upload\r\n                      <div class=\"alert alert-info mt-2\">\r\n                        Excel Sheet contains two sheets;Please enter valid data in both the sheets named ContactInformation and ContactGuarantorInformation.<br />\r\n                        Guarantor Date Of Birth should be in format MM/DD/YYYY.<br />\r\n                        The header in Sample File is in Red Color for required data.\r\n                      </div>\r\n              </div>\r\n              <div class=\"col-12\">\r\n                <button type=\"submit\" (click)=\"saveBulkUpload()\" class=\"btn btn-primary form-btns\" [disabled]=\"loadSave\"><i class=\"fa fa-save\"></i> Submit</button>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger form-btns\" (click)=\"cancel()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n              <div class=\"col-md-12 mt-4\">\r\n                <div *ngIf=\"isError\" class=\"alert alert-danger\">\r\n                  <strong>Please correct the following errors!</strong><br />\r\n                  <label [innerHtml]=\"errorMsg\">\r\n                  </label>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 mt-4\">\r\n                <div *ngIf=\"isresp\" class=\"alert alert-success\">\r\n                  <label [innerHtml]=\"respMsg\">\r\n                  </label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/customerbulkupload/bulkupload.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/views/customerbulkupload/bulkupload.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2N1c3RvbWVyYnVsa3VwbG9hZC9idWxrdXBsb2FkLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/customerbulkupload/bulkupload.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/views/customerbulkupload/bulkupload.component.ts ***!
  \******************************************************************/
/*! exports provided: BulkuploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulkuploadComponent", function() { return BulkuploadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bulkupload_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bulkupload.service */ "./src/app/views/customerbulkupload/bulkupload.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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







var BulkuploadComponent = /** @class */ (function () {
    function BulkuploadComponent(toaster, fb, bulkuploadService, commonService, router) {
        var _this = this;
        this.toaster = toaster;
        this.fb = fb;
        this.bulkuploadService = bulkuploadService;
        this.commonService = commonService;
        this.router = router;
        this.bulkUpload = [];
        this.rootJsonObject = [];
        this.sheetone = [];
        this.sheettwo = [];
        this.errorMsg = "";
        this.respMsg = "";
        this.isError = false;
        this.isresp = false;
        this.isValid = true;
        this.fileName = 'Select File';
        this.loading = false;
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    BulkuploadComponent.prototype.ngOnInit = function () {
        this.excelDocumentNameLink = "/assets/uploads/Document/CustomerBulkUploadFile.xlsx";
    };
    BulkuploadComponent.prototype.onFileChange = function ($event) {
        this.loading = true;
        try {
            this.commonService.uploadBulkFileValidator($event);
            if (this.commonService.isUploadFileValid) {
                this.commonService.uploadBulkFileSize("xlsx", $event.target.files[0].size);
                if (this.commonService.isFileValid) {
                    this.file = $event.target.files[0];
                    this.fileName = $event.target.files[0].name;
                    this.isValid = true;
                }
                else {
                    this.myInputVariable.nativeElement.value = "";
                    this.fileName = "Select File";
                    this.isError = false;
                }
            }
            else {
                this.myInputVariable.nativeElement.value = "";
                this.fileName = "Select File";
                this.isError = false;
            }
        }
        catch (err) { }
        this.loading = false;
    };
    BulkuploadComponent.prototype.saveBulkUpload = function () {
        var _this = this;
        this.loading = true;
        if (this.fileName === null || this.fileName === ''
            || typeof this.fileName === 'undefined'
            || this.fileName == 'Select File') {
            this.isValid = false;
            this.loading = false;
            this.myInputVariable.nativeElement.value = "";
        }
        else {
            if (this.isValid) {
                var workBook_1 = null;
                var jsonData_1 = null;
                var reader_1 = new FileReader();
                var file_1 = this.file;
                reader_1.onload = function (event) {
                    var data = reader_1.result;
                    workBook_1 = xlsx__WEBPACK_IMPORTED_MODULE_1__["read"](data, { type: 'binary' });
                    jsonData_1 = workBook_1.SheetNames.reduce(function (initial, name) {
                        var sheet = workBook_1.Sheets[name];
                        initial[name] = xlsx__WEBPACK_IMPORTED_MODULE_1__["utils"].sheet_to_json(sheet);
                        return initial;
                    }, {});
                    var form = new FormData();
                    form.append('Id', _this.loginuserid);
                    form.append('bulkUploadJSONObject', JSON.stringify(jsonData_1));
                    _this.bulkuploadService.saveBulkUpload(form).subscribe(function (result) {
                        if (result.statusCode == 200) {
                            _this.isError = false;
                            _this.fileName = "Select File";
                            _this.loading = false;
                            _this.isresp = true;
                            _this.respMsg = result.responseMessage;
                            _this.myInputVariable.nativeElement.value = "";
                            _this.toaster.success("Data is saved successfully.");
                        }
                        else {
                            _this.isresp = false;
                            _this.loading = false;
                            _this.isError = true;
                            _this.myInputVariable.nativeElement.value = "";
                            _this.errorMsg = result.responseMessage;
                        }
                    }, function (error) {
                        _this.isresp = false;
                        _this.myInputVariable.nativeElement.value = "";
                        _this.toaster.error("oops. something went wrong please contact your administrator");
                        _this.loading = false;
                    });
                };
                setTimeout(function () { reader_1.readAsBinaryString(file_1); }, 500);
            }
            else {
                this.loading = false;
            }
        }
    };
    BulkuploadComponent.prototype.cancel = function () {
        this.loading = false;
        this.router.navigateByUrl("/contact");
    };
    BulkuploadComponent.ctorParameters = function () { return [
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: _bulkupload_service__WEBPACK_IMPORTED_MODULE_2__["BulkuploadService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], BulkuploadComponent.prototype, "myInputVariable", void 0);
    BulkuploadComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-bulkupload',
            template: __importDefault(__webpack_require__(/*! raw-loader!./bulkupload.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/customerbulkupload/bulkupload.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./bulkupload.component.scss */ "./src/app/views/customerbulkupload/bulkupload.component.scss")).default]
        }),
        __metadata("design:paramtypes", [ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _bulkupload_service__WEBPACK_IMPORTED_MODULE_2__["BulkuploadService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], BulkuploadComponent);
    return BulkuploadComponent;
}());



/***/ }),

/***/ "./src/app/views/customerbulkupload/bulkupload.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/customerbulkupload/bulkupload.service.ts ***!
  \****************************************************************/
/*! exports provided: BulkuploadService, BulkUpload, ContactInformation, ContactGuarantorInformation, RootJsonObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulkuploadService", function() { return BulkuploadService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulkUpload", function() { return BulkUpload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactInformation", function() { return ContactInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactGuarantorInformation", function() { return ContactGuarantorInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootJsonObject", function() { return RootJsonObject; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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



var BulkuploadService = /** @class */ (function () {
    function BulkuploadService(http) {
        this.http = http;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
        this.contactUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl + "Contact";
    }
    BulkuploadService.prototype.saveBulkUpload = function (bulkUpload) {
        return this.http.post(this.contactUri + "/SaveBulkUpload", bulkUpload);
    };
    BulkuploadService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    BulkuploadService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], BulkuploadService);
    return BulkuploadService;
}());

var BulkUpload = /** @class */ (function () {
    function BulkUpload() {
        this.Id = '';
        this.bulkUploadJSONObject = '';
    }
    return BulkUpload;
}());

var ContactInformation = /** @class */ (function () {
    function ContactInformation() {
    }
    return ContactInformation;
}());

var ContactGuarantorInformation = /** @class */ (function () {
    function ContactGuarantorInformation() {
    }
    return ContactGuarantorInformation;
}());

var RootJsonObject = /** @class */ (function () {
    function RootJsonObject() {
    }
    return RootJsonObject;
}());



/***/ }),

/***/ "./src/app/views/customerbulkupload/customerbulkupload-routing.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/views/customerbulkupload/customerbulkupload-routing.module.ts ***!
  \*******************************************************************************/
/*! exports provided: CustomerbulkuploadRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerbulkuploadRoutingModule", function() { return CustomerbulkuploadRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _bulkupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bulkupload.component */ "./src/app/views/customerbulkupload/bulkupload.component.ts");
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
    {
        path: '', component: _bulkupload_component__WEBPACK_IMPORTED_MODULE_2__["BulkuploadComponent"], data: { title: 'Customer Bulk Upload' }
    }
];
var CustomerbulkuploadRoutingModule = /** @class */ (function () {
    function CustomerbulkuploadRoutingModule() {
    }
    CustomerbulkuploadRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CustomerbulkuploadRoutingModule);
    return CustomerbulkuploadRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/customerbulkupload/customerbulkupload.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/customerbulkupload/customerbulkupload.module.ts ***!
  \***********************************************************************/
/*! exports provided: CustomerbulkuploadModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerbulkuploadModule", function() { return CustomerbulkuploadModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _bulkupload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bulkupload.component */ "./src/app/views/customerbulkupload/bulkupload.component.ts");
/* harmony import */ var _customerbulkupload_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customerbulkupload-routing.module */ "./src/app/views/customerbulkupload/customerbulkupload-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var CustomerbulkuploadModule = /** @class */ (function () {
    function CustomerbulkuploadModule() {
    }
    CustomerbulkuploadModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_bulkupload_component__WEBPACK_IMPORTED_MODULE_2__["BulkuploadComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _customerbulkupload_routing_module__WEBPACK_IMPORTED_MODULE_3__["CustomerbulkuploadRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalModule"]
            ]
        })
    ], CustomerbulkuploadModule);
    return CustomerbulkuploadModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-customerbulkupload-customerbulkupload-module.js.map