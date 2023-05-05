(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/views/campaign/campaign.service.ts":
/*!****************************************************!*\
  !*** ./src/app/views/campaign/campaign.service.ts ***!
  \****************************************************/
/*! exports provided: CampaignService, campaignJsonData, CheckboxData, lstRelatedModel, CampaignTopViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignService", function() { return CampaignService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "campaignJsonData", function() { return campaignJsonData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxData", function() { return CheckboxData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lstRelatedModel", function() { return lstRelatedModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignTopViewModel", function() { return CampaignTopViewModel; });
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




var CampaignService = /** @class */ (function () {
    function CampaignService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
    }
    CampaignService.prototype.GetCampaignlist = function (name, userType, sortColumn, sortDir, page, pageSize, loginuserid, custom_view_id, searchFilter, moduleName, submoduleName, companyId) {
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "Campaign/GetCampaignList?nameSearch=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&custom_view_id=" + custom_view_id + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName);
    };
    CampaignService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId, Id, displayType) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId + "&PrimaryId=" + Id + "&displayCode=" + displayType)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    CampaignService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.leadEditPage = response;
            return true;
        }));
    };
    CampaignService.prototype.getViewList = function (name, userType, sortColumn, sortDir, page, pageSize, ModuleName, SubModuleName, companyId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Common/GetCustomViewName?nameSearch=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&ModuleName=" + ModuleName + "&SubModuleName=" + SubModuleName + "&companyId=" + companyId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    CampaignService.prototype.addOrUpdateCampaign = function (campaignJsonData) {
        return this.http.post(this.baseUri + "Campaign/AddOrUpdateCampaign", campaignJsonData);
    };
    CampaignService.prototype.GetCampaignMembersList = function (campaignId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Campaign/GetCampaignMembersList?campaignId=" + campaignId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    CampaignService.prototype.GetCampaignProposalsList = function (campaignId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Campaign/GetCampaignProposalsList?campaignId=" + campaignId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    CampaignService.prototype.GetCampaignLeadsList = function (campaignId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Campaign/GetCampaignLeadsList?campaignId=" + campaignId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    CampaignService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    CampaignService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], CampaignService);
    return CampaignService;
}());

var campaignJsonData = /** @class */ (function () {
    function campaignJsonData() {
        this.campaignId = "";
        this.FormJsonData = "";
        this.moduleCode = "";
        this.subModuleCode = "";
        this.companyId = "";
        this.userId = "";
    }
    return campaignJsonData;
}());

var CheckboxData = /** @class */ (function () {
    function CheckboxData() {
        this.controlname = "";
        this.controlvalues = "";
    }
    return CheckboxData;
}());

var lstRelatedModel = /** @class */ (function () {
    function lstRelatedModel() {
        this.title = "";
        this.data = [];
    }
    return lstRelatedModel;
}());

var CampaignTopViewModel = /** @class */ (function () {
    function CampaignTopViewModel() {
        this.ColumnName = "";
        this.DisplayName = "";
        this.Value = "";
        this.DisplayOrder = 1;
        this.ref_value = "";
        this.field_route = "";
    }
    return CampaignTopViewModel;
}());



/***/ }),

/***/ "./src/app/views/location/locationlist.service.ts":
/*!********************************************************!*\
  !*** ./src/app/views/location/locationlist.service.ts ***!
  \********************************************************/
/*! exports provided: LocationService, JsonData, CheckboxData, CampaignTopViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationService", function() { return LocationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonData", function() { return JsonData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxData", function() { return CheckboxData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignTopViewModel", function() { return CampaignTopViewModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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




var LocationService = /** @class */ (function () {
    function LocationService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    LocationService.prototype.GetLocationList = function (nameSearch, sortColumn, page, pageSize, sortDir, loginuserid, moduleName, submoduleName, companyId, custom_view_id, searchFilter) {
        var _this = this;
        if (typeof nameSearch == "undefined" || nameSearch == null) {
            nameSearch = null;
        }
        else {
            nameSearch = encodeURIComponent((nameSearch));
        }
        return this.http.get(this.baseUri + "location/GetLocationList?nameSearch=" + nameSearch + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&custom_view_id=" + custom_view_id + "&searchFilter=" + searchFilter)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    LocationService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId, Id, displayType) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId + "&PrimaryId=" + Id + "&displayCode=" + displayType)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    LocationService.prototype.GetLocationDetails = function (id, moduleName, submoduleName, companyId, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("location/GetLocationById?id=" + id + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    LocationService.prototype.addEditForm = function (JsonData) {
        return this.http.post(this.baseUri + "location/AddEditLocation", JsonData);
    };
    LocationService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    LocationService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    LocationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], LocationService);
    return LocationService;
}());

var JsonData = /** @class */ (function () {
    function JsonData() {
        this.Id = "";
        this.FormJsonData = "";
        this.moduleCode = "";
        this.subModuleCode = "";
        this.companyId = "";
        this.userId = "";
    }
    return JsonData;
}());

var CheckboxData = /** @class */ (function () {
    function CheckboxData() {
        this.controlname = "";
        this.controlvalues = "";
    }
    return CheckboxData;
}());

var CampaignTopViewModel = /** @class */ (function () {
    function CampaignTopViewModel() {
        this.ColumnName = "";
        this.DisplayName = "";
        this.Value = "";
        this.DisplayOrder = 1;
    }
    return CampaignTopViewModel;
}());



/***/ }),

/***/ "./src/app/views/product/productlist.service.ts":
/*!******************************************************!*\
  !*** ./src/app/views/product/productlist.service.ts ***!
  \******************************************************/
/*! exports provided: ProductListService, JsonData, CheckboxData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListService", function() { return ProductListService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonData", function() { return JsonData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxData", function() { return CheckboxData; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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




var ProductListService = /** @class */ (function () {
    function ProductListService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    ProductListService.prototype.GetProductList = function (nameSearch, sortColumn, page, pageSize, sortDir, loginuserid, moduleName, submoduleName, companyId, custom_view_id, searchFilter) {
        if (typeof nameSearch == "undefined" || nameSearch == null) {
            nameSearch = null;
        }
        else {
            //nameSearch = "ProductName like '%" + nameSearch + "%'";
            nameSearch = encodeURIComponent((nameSearch));
        }
        return this.http.get(this.baseUri + "product/GetProductList?nameSearch=" + nameSearch + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&custom_view_id=" + custom_view_id + "&searchFilter=" + searchFilter);
    };
    ProductListService.prototype.GetProductDetails = function (id, moduleName, submoduleName, companyId, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("product/GetProductById?id=" + id + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            //// console.log("responseService12", response);
            _this.editPage = response;
            return true;
        }));
    };
    ProductListService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId, Id, displayType) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId + "&PrimaryId=" + Id + "&displayCode=" + displayType)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    ProductListService.prototype.addEditForm = function (JsonData) {
        return this.http.post(this.baseUri + "product/AddEditProduct", JsonData);
    };
    ProductListService.prototype.GeProductListing = function () {
        return this.http.get(this.baseUri + "Common/GeProductListing");
    };
    ProductListService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    ProductListService.prototype.GetPriceBookList = function (name, sortColumn, sortDir, page, pageSize, productid) {
        var _this = this;
        //debugger;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "product/GetPriceBookList?nameSearch=" + name + "&SortColumn=" + sortColumn + "&SortDir=" + sortDir + "&PageNo=" + page + "&PageSize=" + pageSize + "&productid=" + productid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ProductListService.prototype.GetProductPriceBooksList = function (productId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("product/GetProductsPriceBooksList?productId=" + productId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    ProductListService.prototype.GetProductCampaignsList = function (productId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("product/GetProductCampaignsList?productId=" + productId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    ProductListService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    ProductListService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ProductListService);
    return ProductListService;
}());

var JsonData = /** @class */ (function () {
    function JsonData() {
        this.Id = "";
        this.FormJsonData = "";
        this.moduleCode = "";
        this.subModuleCode = "";
        this.companyId = "";
        this.userId = "";
    }
    return JsonData;
}());

var CheckboxData = /** @class */ (function () {
    function CheckboxData() {
        this.controlname = "";
        this.controlvalues = "";
    }
    return CheckboxData;
}());



/***/ }),

/***/ "./src/app/views/queue/queueservice.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/queue/queueservice.service.ts ***!
  \*****************************************************/
/*! exports provided: QueueserviceService, CheckboxData, JsonData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueserviceService", function() { return QueueserviceService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxData", function() { return CheckboxData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonData", function() { return JsonData; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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




var QueueserviceService = /** @class */ (function () {
    function QueueserviceService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    QueueserviceService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId, Id) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId + "&PrimaryId=" + Id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    QueueserviceService.prototype.GetUsersList = function (companyId, Id) {
        var _this = this;
        return this.http.get(this.baseUri + "Queue/GetUsersList?companyId=" + companyId + "&PrimaryId=" + Id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.userList = response;
            return true;
        }));
    };
    QueueserviceService.prototype.addEditForm = function (jsonData) {
        return this.http.post(this.baseUri + "Queue/AddEditQueue", jsonData);
    };
    QueueserviceService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    QueueserviceService.prototype.GetQueueList = function (listFilter, sortColumn, page, pageSize, sortDir, loginuserid, moduleName, submoduleName, companyId, custom_view_id) {
        if (typeof listFilter == "undefined" || listFilter == null) {
            listFilter = null;
        }
        else {
            listFilter = encodeURIComponent((listFilter));
        }
        return this.http.get(this.baseUri + "Queue/GetQueueList?listFilter=" + listFilter + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&custom_view_id=" + custom_view_id);
    };
    QueueserviceService.prototype.GetQueueUserList = function (listuserFilter, sortColumnUserList, sortDirUserList, currentPageUserList, pageSizeValueUserList, id) {
        if (typeof listuserFilter == "undefined" || listuserFilter == null) {
            listuserFilter = null;
        }
        else {
            listuserFilter = encodeURIComponent((listuserFilter));
        }
        return this.http.get(this.baseUri + "Queue/GetQueueUserList?listFilter=" + listuserFilter + "&sortColumn=" + sortColumnUserList + "&sortDir=" + sortDirUserList + "&pageIndex=" + currentPageUserList + "&pageSize=" + pageSizeValueUserList + "&primaryKey=" + id);
    };
    QueueserviceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    QueueserviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], QueueserviceService);
    return QueueserviceService;
}());

var CheckboxData = /** @class */ (function () {
    function CheckboxData() {
        this.controlname = "";
        this.controlvalues = "";
    }
    return CheckboxData;
}());

var JsonData = /** @class */ (function () {
    function JsonData() {
        this.selecteddata = [];
        this.Id = "";
        this.FormJsonData = "";
        this.moduleCode = "";
        this.subModuleCode = "";
        this.companyId = "";
        this.userId = "";
    }
    return JsonData;
}());



/***/ }),

/***/ "./src/app/views/solgencontactlist/customcontactlist.service.ts":
/*!**********************************************************************!*\
  !*** ./src/app/views/solgencontactlist/customcontactlist.service.ts ***!
  \**********************************************************************/
/*! exports provided: CustomContactListService, JsonData, CheckboxData, lstRelatedModel, ContactTopViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomContactListService", function() { return CustomContactListService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonData", function() { return JsonData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxData", function() { return CheckboxData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lstRelatedModel", function() { return lstRelatedModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactTopViewModel", function() { return ContactTopViewModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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




var CustomContactListService = /** @class */ (function () {
    function CustomContactListService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    CustomContactListService.prototype.GetSolgenContactList = function (listFiltertext, userType, sortColumn, sortDir, page, pageSize, loginuserid, custom_view_id, searchFilter, moduleName, submoduleName, companyId, isCheckboxTick) {
        if (typeof listFiltertext == "undefined" || listFiltertext == null) {
            listFiltertext = null;
        }
        else {
            listFiltertext = encodeURIComponent((listFiltertext));
        }
        return this.http.get(this.baseUri + "Bank/GetSolgenContactList?listFilter=" + listFiltertext + "&userType=" + userType + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&custom_view_id=" + custom_view_id + "&searchFilter=" + searchFilter + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&isAllRecords=" + isCheckboxTick);
    };
    CustomContactListService.prototype.getViewList = function (name, userType, sortColumn, sortDir, page, pageSize, ModuleName, SubModuleName, companyId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Common/GetCustomViewName?nameSearch=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&ModuleName=" + ModuleName + "&SubModuleName=" + SubModuleName + "&companyId=" + companyId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    CustomContactListService.prototype.GetSolgenContactDetails = function (id, moduleName, submoduleName, companyId, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/GetCustomContactById?id=" + id + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            //// console.log("responseService12", response);
            _this.editPage = response;
            return true;
        }));
    };
    CustomContactListService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId, Id, displayType) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId + "&PrimaryId=" + Id + "&displayCode=" + displayType)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    CustomContactListService.prototype.GetOpportunityview = function (opid, stageid) {
        return this.http.get(this.baseUri + "bank/GetOpportunityview?opid=" + opid + "&stageid=" + stageid);
    };
    CustomContactListService.prototype.getopportunitystage = function () {
        return this.http.get(this.baseUri + "bank/getopportunitystage");
    };
    CustomContactListService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    CustomContactListService.prototype.addEditForm = function (JsonData, leadid, accountid, opportunityid) {
        return this.http.post(this.baseUri + ("Contact/AddEditContact?leadid=" + leadid + "&accountid=" + accountid + "&opportunityid=" + opportunityid), JsonData);
    };
    CustomContactListService.prototype.CheckUserDuplicateORAssociate = function (email) {
        return this.http.get(this.baseUri + ("Contact/CheckUserDuplicateORAssociateContact?emailID=" + email));
    };
    CustomContactListService.prototype.GetCampaignMembersList = function (contId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("contact/GetOpportuniryByContact?contId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    CustomContactListService.prototype.GetRelatedAccountForContactList = function (contId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("contact/GetRelatedAccountForContactList?contId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    CustomContactListService.prototype.GetCampaignProposalsList = function (campaignId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Campaign/GetCampaignProposalsList?campaignId=" + campaignId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    CustomContactListService.prototype.refreshLeadsList = function (contId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("contact/GetLeadByContactId?contId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    CustomContactListService.prototype.GetProposalsListByContactId = function (contId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("contact/GetProposalsListByContactId?contId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    CustomContactListService.prototype.addOrUpdateFiles = function (AppointmentSetUpModel) {
        return this.http.post(this.baseUri + "workorder/addOrUpdateFiles", AppointmentSetUpModel);
    };
    CustomContactListService.prototype.GetcontractViewFileList = function (contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName) {
        return this.http.get(this.baseUri + ("workorder/GetServiceGetFileList?ServiceId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&modulename=" + modulename + "&submoduleName=" + submoduleName));
    };
    CustomContactListService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    CustomContactListService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], CustomContactListService);
    return CustomContactListService;
}());

var JsonData = /** @class */ (function () {
    function JsonData() {
        this.Id = "";
        this.FormJsonData = "";
        this.moduleCode = "";
        this.subModuleCode = "";
        this.companyId = "";
        this.userId = "";
    }
    return JsonData;
}());

var CheckboxData = /** @class */ (function () {
    function CheckboxData() {
        this.controlname = "";
        this.controlvalues = "";
    }
    return CheckboxData;
}());

var lstRelatedModel = /** @class */ (function () {
    function lstRelatedModel() {
        this.title = "";
        this.data = [];
    }
    return lstRelatedModel;
}());

var ContactTopViewModel = /** @class */ (function () {
    function ContactTopViewModel() {
        this.ColumnName = "";
        this.DisplayName = "";
        this.Value = "";
        this.DisplayOrder = 1;
    }
    return ContactTopViewModel;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map