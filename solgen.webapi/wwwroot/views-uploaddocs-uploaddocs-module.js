(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-uploaddocs-uploaddocs-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/uploaddocs/uploaddocs.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/uploaddocs/uploaddocs.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"login-container\">\r\n  <div class=\"login-main\">\r\n    <app-loader [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    <!--<img src=\"assets/default-theme/imagesNew/login-logo.png\" />-->\r\n    <img src=\"{{siteimage}}\" />\r\n    <div class=\"login-box text-left\">\r\n      <form [formGroup]=\"UploadimageForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n        <div class=\"login-box-fields action row\">\r\n          <div class=\"col-lg-12\">\r\n            <div class=\"alert alert-info\" role=\"alert\">\r\n              <span class=\"d-block\"><i class=\"fa fa-check mr-2\"></i><strong>Required Document:</strong> {{requireDoc}} </span>\r\n              <span class=\"d-block\"><i class=\"fa fa-check mr-2\"></i><strong>Uploaded Document:</strong> {{recieveDocument}}</span>\r\n              <span class=\"d-block\"><i class=\"fa fa-check mr-2\"></i><strong>Pending Document:</strong> {{pendingDoc}}</span>\r\n            </div>\r\n            <hr class=\"mb-3\" />\r\n          </div>\r\n          <div class=\"col-lg-12\">\r\n            <div class=\"alert alert-info\" role=\"alert\">\r\n             <b>Required Documents:</b>\r\n              <span class=\"d-block\" *ngFor=\"let item of lstfiletype;let i=index\">\r\n                <span *ngIf=\"checkMandatory(item.documentType)\"> {{item.documentType}} </span>\r\n              </span>\r\n            </div>\r\n            <hr class=\"mb-3\" />\r\n          </div>\r\n          <div class=\"col-lg-12\">\r\n            <label>Choose Document:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <div class=\"input-group-prepend\" *ngIf=\"imageLink!=''\">\r\n\r\n\r\n                  <div id=\"myModal\" style=\" background: none !important;\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n                    <div class=\"modal-dialog\" style=\"height:450px!important;width:450px!important; \">\r\n                      <div class=\"\">\r\n                        <button type=\"button\" class=\"close\" style=\"color: #fff!important; \" data-dismiss=\"modal\">&times;</button>\r\n                      </div>\r\n                      <div class=\"modal-content\">\r\n                        <div class=\"text-center\">\r\n                          <img src={{imageLink}} alt=\"img\" style=\"height:450px!important;width:450px!important; \" class=\"img-responsive\">\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"custom-file w-50 m-fileup\">\r\n                  <input formControlName=\"profilePic\" class=\"custom-file-input\" #file type=\"file\" name='file' #fileInput accept=\"application/pdf\" (change)=\"setFile($event)\" lang=\"es\">\r\n                  <label class=\"custom-file-label\">{{fileName}}</label>\r\n\r\n                </div>\r\n                <small *ngIf=\"!isValid\"\r\n                       style=\"color:red;\" class=\"w-100 mt-1\">Document is required</small>\r\n                <small><i class=\"text-secondary\">Valid file format is pdf and limit upto 20MB.</i> </small>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-12\">\r\n            <label>Document Type:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <ng-select #fileuploadddl [items]=\"lstfiletype\" placeholder=\"Select File type\" formControlName=\"filetype\" (change)=\"fileNameDDL($event)\"\r\n                         bindLabel=\"documentType\" bindValue=\"id\" [ngClass]=\"{'is-invalid': ((filetype.dirty || filetype.touched) && filetype.errors?.required) }\"></ng-select>\r\n              <small *ngIf=\"(filetype.dirty || filetype.touched) && filetype.errors?.required\"\r\n                     style=\"color:red;\">Please select File Type</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-12\" style=\"display:none\">\r\n            <label>File Title:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" placeholder=\"Please enter File Title\"\r\n                     formControlName=\"documentTitle\"\r\n                     [ngClass]=\"{'is-invalid': (documentTitle.invalid && (documentTitle.dirty || documentTitle.touched) && (documentTitle.errors?.required || documentTitle.errors?.maxlength)) }\">\r\n              <small *ngIf=\"documentTitle.invalid && (documentTitle.dirty || documentTitle.touched) && documentTitle.errors?.required\"\r\n                     class=\"text-danger\">Document Title is required</small>\r\n              <small *ngIf=\"documentTitle.invalid && (documentTitle.dirty || documentTitle.touched) && documentTitle.errors?.maxlength\"\r\n                     class=\"text-danger\">Document Title must be less than 50 characters.</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-12\" style=\"display:none\">\r\n            <label>Description:<span class=\"text-danger\">*</span></label>\r\n            <div class=\"form-group\">\r\n              <textarea class=\"form-control\" placeholder=\"Description\" formControlName=\"description\"\r\n                        [ngClass]=\"{'is-invalid': (description.invalid && (description.dirty || description.touched) && (description.errors?.required)) }\"></textarea>\r\n              <small *ngIf=\"description.invalid && (description.dirty || description.touched) && description.errors?.required\"\r\n                     class=\"text-danger\">Description is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-12 text-center\">\r\n            <a href=\"javascript:void(0);\" (click)=\"SaveImage()\" class=\"btn btn-success\">Upload Files</a>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/uploaddocs/uploaddocs-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/uploaddocs/uploaddocs-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: UploaddocsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploaddocsRoutingModule", function() { return UploaddocsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _uploaddocs_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uploaddocs.component */ "./src/app/views/uploaddocs/uploaddocs.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var routes = [{ path: 'upload/:id/:accid', component: _uploaddocs_component__WEBPACK_IMPORTED_MODULE_2__["UploaddocsComponent"] }];
var UploaddocsRoutingModule = /** @class */ (function () {
    function UploaddocsRoutingModule() {
    }
    UploaddocsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], UploaddocsRoutingModule);
    return UploaddocsRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/uploaddocs/uploaddocs.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/uploaddocs/uploaddocs.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3VwbG9hZGRvY3MvdXBsb2FkZG9jcy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/uploaddocs/uploaddocs.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/uploaddocs/uploaddocs.component.ts ***!
  \**********************************************************/
/*! exports provided: UploaddocsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploaddocsComponent", function() { return UploaddocsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dashboard/dashboard.service */ "./src/app/views/dashboard/dashboard.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var _loanapplication_loanapplicationservice_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../loanapplication/loanapplicationservice.service */ "./src/app/views/loanapplication/loanapplicationservice.service.ts");
/* harmony import */ var _services_customHttpParamEncoder___WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/customHttpParamEncoder  */ "./src/app/services/customHttpParamEncoder .ts");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/user.service */ "./src/app/views/shared/user.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
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




//import { OwlOptions } from 'ngx-owl-carousel-o';








var UploaddocsComponent = /** @class */ (function () {
    function UploaddocsComponent(fb, titleService, router, userService, customHttpParamEncoder, loanapplicationservice, leadservice, commonService, toaster, route, dashboardService) {
        this.fb = fb;
        this.titleService = titleService;
        this.router = router;
        this.userService = userService;
        this.customHttpParamEncoder = customHttpParamEncoder;
        this.loanapplicationservice = loanapplicationservice;
        this.leadservice = leadservice;
        this.commonService = commonService;
        this.toaster = toaster;
        this.route = route;
        this.dashboardService = dashboardService;
        this.loading = false;
        this.fileName = 'Choose Document';
        this.isValid = true;
        this.siteURL = "";
        this.url = "";
        this.sitetitle = '';
        this.loadSave = false;
        this.UploadimageForm = this.fb.group({
            profilePic: [''],
            'file': '',
            'filename': [''],
            filetype: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            documentTitle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].nullValidator],
            description: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].nullValidator]
        });
    }
    ;
    UploaddocsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            var aid = params.get('accid');
            if (id) {
                _this.loanId = _this.decryptid(id);
                _this.GetLoanapplicationDocumentType(id);
            }
            if (aid) {
                _this.accid = aid;
            }
            _this.companyid = 1004;
            _this.getDocumentForReceiveAndPending();
            _this.url = window.location.href;
            console.log('this.urlbefore', _this.url);
            _this.url = _this.url.slice(9, 19);
            //---setting Logo on basis of URL
            console.log('this.urlafter', _this.url);
            _this.userService.GetSiteURl(_this.url).subscribe(function (result) {
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
            console.log(_this.router.url);
            if (_this.router.url.indexOf('app.loanhomi') > 0) {
                _this.siteURL = "loanhomi";
            }
            else if (_this.router.url.indexOf('app.solgenone') > 0) {
                _this.siteURL = "solgenone";
            }
            else if (_this.router.url.indexOf('solgen.zorbis') > 0) {
                _this.siteURL = "solgenone";
            }
        });
    };
    UploaddocsComponent.prototype.checkMandatory = function (item) {
        if (item.indexOf("*") !== -1) {
            return true;
        }
        return false;
    };
    UploaddocsComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    UploaddocsComponent.prototype.decryptid = function (id) {
        return this.customHttpParamEncoder.decodeValue(id);
    };
    UploaddocsComponent.prototype.getDocumentForReceiveAndPending = function () {
        //getDocumentForReceiveAndPending(id) {
        //  return this.http.get(this.baseUri + `loanproduct/GetLoanProductDiscountCategoryEdit?productId=${id}`);
        //}
        var _this = this;
        this.loanapplicationservice.getDocumentForReceiveAndPendingforcustomer(this.loanId, this.companyid, "EXTERNAL_LINK").subscribe(function (result) {
            _this.totalDocument = result.TotalDocs;
            _this.recieveDocument = result.ReceivedDocs;
            _this.pendingDoc = result.pendingDocs;
            _this.requireDoc = result.requireDoc;
            //  console.log("PeendingOrReceiveANd", result);
        });
    };
    UploaddocsComponent.prototype.fileNameDDL = function (e) {
        console.log(e);
        this.fileNameddlvalue = e.documentType;
        this.fileNameddlvalue = this.fileNameddlvalue.slice(0, -1);
        console.log(this.fileNameddlvalue);
        this.fileNameddlvalue = this.fileNameddlvalue.replace(/\s/g, "");
        console.log(this.fileNameddlvalue);
    };
    UploaddocsComponent.prototype.GetLoanapplicationDocumentType = function (id) {
        var _this = this;
        this.loanapplicationservice.GetLoanapplicationDocumentTypeforcust(id).subscribe(function (data) {
            console.log(data);
            _this.lstfiletype = data.filter(function (itm) { return (itm.documentType != "Install Agreement" && itm.documentType != "Install Agreement*"); });
        });
    };
    UploaddocsComponent.prototype.SaveImage = function () {
        var _this = this;
        if (this.fileName === null || this.fileName === ''
            || typeof this.fileName === 'undefined'
            || this.fileName == 'Choose file') {
            this.isValid = false;
        }
        else {
            this.isValid = true;
        }
        if (this.fileName != 'Choose file' && this.UploadimageForm.valid) {
            this.loadSave = true;
            var companySetupModel = this.prepareFormDataForDocument();
            this.dashboardService.customeruploadfile(companySetupModel).subscribe(function (result) {
                setTimeout(function () {
                    if (result.statusCode == 200) {
                        _this.loadSave = false;
                        _this.toaster.success('Document has been uploaded successfully');
                        _this.fileInput.nativeElement.value = "";
                        _this.fileName = '';
                        _this.fileuploadddl.clearModel();
                        _this.UploadimageForm.value.filetype = null;
                        _this.UploadimageForm.reset();
                        _this.getDocumentForReceiveAndPending();
                    }
                    else {
                        _this.loadSave = false;
                        _this.toaster.error(result.responseMessage);
                    }
                }, 3000);
            }, function (error) {
            });
        }
        else {
            this.loadSave = false;
            this.commonService.validateAllFormFields(this.UploadimageForm);
        }
    };
    UploaddocsComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        input.append('companyId', '1004');
        input.append('companyName', '');
        input.append('moduleid', '1');
        input.append('submoduleid', 'loanapplication');
        input.append('refid', this.loanId);
        input.append('documentTitle', this.fileNameddlvalue);
        input.append('description', this.UploadimageForm.value.description == null ? '' : this.UploadimageForm.value.description);
        input.append('accountid', this.accid);
        input.append('filetype', this.UploadimageForm.value.filetype);
        input.append('fileExtension', this.fileExtension);
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            input.append('file', fileBrowser.files[0]);
        }
        return input;
    };
    UploaddocsComponent.prototype.setFile = function ($event) {
        this.commonService.uploadPDFFileValidator($event);
        if (this.commonService.isUploadFileValid == true) {
            this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "20MB");
            if (this.commonService.isFileValid) {
                this.fileName = $event.target.files[0].name;
                this.fileExtension = this.fileName.replace(/^.*\./, '');
                //this.companyLogo.setValue($event.target.files[0].name);
            }
        }
        else {
            this.fileName = 'Choose file';
        }
    };
    Object.defineProperty(UploaddocsComponent.prototype, "profilePic", {
        get: function () { return this.UploadimageForm.get('profilePic'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaddocsComponent.prototype, "filename", {
        get: function () { return this.UploadimageForm.get('filename'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaddocsComponent.prototype, "filetype", {
        get: function () { return this.UploadimageForm.get('filetype'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaddocsComponent.prototype, "documentTitle", {
        get: function () { return this.UploadimageForm.get('documentTitle'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaddocsComponent.prototype, "description", {
        get: function () { return this.UploadimageForm.get('description'); },
        enumerable: true,
        configurable: true
    });
    UploaddocsComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__["Title"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _shared_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"] },
        { type: _services_customHttpParamEncoder___WEBPACK_IMPORTED_MODULE_9__["CustomHttpParamEncoder"] },
        { type: _loanapplication_loanapplicationservice_service__WEBPACK_IMPORTED_MODULE_8__["LoanapplicationserviceService"] },
        { type: _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__["LeadlistService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_4__["DashboardService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", Object)
    ], UploaddocsComponent.prototype, "fileInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileuploadddl', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectComponent"])
    ], UploaddocsComponent.prototype, "fileuploadddl", void 0);
    UploaddocsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-uploaddocs',
            // template: '<h2>Hello</h2>',
            template: __importDefault(__webpack_require__(/*! raw-loader!./uploaddocs.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/uploaddocs/uploaddocs.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./uploaddocs.component.scss */ "./src/app/views/uploaddocs/uploaddocs.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__["Title"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _shared_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"], _services_customHttpParamEncoder___WEBPACK_IMPORTED_MODULE_9__["CustomHttpParamEncoder"], _loanapplication_loanapplicationservice_service__WEBPACK_IMPORTED_MODULE_8__["LoanapplicationserviceService"], _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__["LeadlistService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_4__["DashboardService"]])
    ], UploaddocsComponent);
    return UploaddocsComponent;
}());



/***/ }),

/***/ "./src/app/views/uploaddocs/uploaddocs.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/views/uploaddocs/uploaddocs.module.ts ***!
  \*******************************************************/
/*! exports provided: UploaddocsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploaddocsModule", function() { return UploaddocsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _uploaddocs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./uploaddocs.component */ "./src/app/views/uploaddocs/uploaddocs.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _uploaddocs_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./uploaddocs-routing.module */ "./src/app/views/uploaddocs/uploaddocs-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










var UploaddocsModule = /** @class */ (function () {
    function UploaddocsModule() {
    }
    UploaddocsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_uploaddocs_component__WEBPACK_IMPORTED_MODULE_6__["UploaddocsComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _uploaddocs_routing_module__WEBPACK_IMPORTED_MODULE_8__["UploaddocsRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalModule"]
            ] //,
            //exports: [UploaddocsComponent]
        })
    ], UploaddocsModule);
    return UploaddocsModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-uploaddocs-uploaddocs-module.js.map