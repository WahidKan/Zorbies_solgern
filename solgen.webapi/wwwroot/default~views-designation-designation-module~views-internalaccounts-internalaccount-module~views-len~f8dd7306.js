(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-designation-designation-module~views-internalaccounts-internalaccount-module~views-len~f8dd7306"],{

/***/ "./src/app/views/internalaccounts/accountservice.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/views/internalaccounts/accountservice.service.ts ***!
  \******************************************************************/
/*! exports provided: AccountserviceService, CheckboxData, JsonData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountserviceService", function() { return AccountserviceService; });
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




var AccountserviceService = /** @class */ (function () {
    function AccountserviceService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    AccountserviceService.prototype.GetAccountsList = function (listFilter, sortColumn, page, pageSize, sortDir, loginuserid, moduleName, submoduleName, companyId, custom_view_id, isCheckboxTick) {
        if (typeof listFilter == "undefined" || listFilter == null) {
            listFilter = null;
        }
        else {
            listFilter = encodeURIComponent((listFilter));
        }
        return this.http.get(this.baseUri + "Bank/GetAccountsList?nameSearch=" + listFilter + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&custom_view_id=" + custom_view_id + "&isAllRecords=" + isCheckboxTick);
    };
    AccountserviceService.prototype.GetAccountsListByBank = function (listFilter, sortColumn, page, pageSize, sortDir, loginuserid, moduleName, submoduleName, companyId, custom_view_id) {
        if (typeof listFilter == "undefined" || listFilter == null) {
            listFilter = null;
        }
        else {
            listFilter = encodeURIComponent((listFilter));
        }
        return this.http.get(this.baseUri + "Bank/GetBankListNew?nameSearch=" + listFilter + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&custom_view_id=" + custom_view_id);
    };
    AccountserviceService.prototype.GetAccountDetails = function (id, moduleName, submoduleName, companyId, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/GetAccountById?id=" + id + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    AccountserviceService.prototype.CheckUserDuplicateORAssociate = function (email, uid) {
        return this.http.get(this.baseUri + ("Dashboard/CheckUserDuplicateORAssociate?emailID=" + email + "&uid=" + uid));
    };
    AccountserviceService.prototype.AssociateUserWithCompany = function (email, uid, RoleID, userTypeId, PrimaryKey) {
        return this.http.post(this.baseUri + ("Dashboard/AssociateUserWithCompany?emailID=" + email + "&uid=" + uid + "&RoleID=" + RoleID + "&userTypeId=" + userTypeId + "&PrimaryKey=" + PrimaryKey), null);
    };
    AccountserviceService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId, Id, displayType) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId + "&PrimaryId=" + Id + "&displayCode=" + displayType)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    AccountserviceService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    AccountserviceService.prototype.AppeoveAccount = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/ApproveAccount?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    AccountserviceService.prototype.getViewList = function (name, userType, sortColumn, sortDir, page, pageSize, ModuleName, SubModuleName, companyId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Common/GetCustomViewName?nameSearch=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&ModuleName=" + ModuleName + "&SubModuleName=" + SubModuleName + "&companyId=" + companyId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    AccountserviceService.prototype.DisabledAccount = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DisabledAccount?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    //addEditForm(JsonData: JsonData) {
    //  return this.http.post(this.baseUri + `Lease/AddEditAccount`, JsonData);
    //}
    AccountserviceService.prototype.addEditForm = function (JsonData) {
        return this.http.post(this.baseUri + "Lease/AddEditAccount", JsonData);
    };
    AccountserviceService.prototype.GetFileUploadSource = function (file) {
        return this.http.get(this.baseUri + ("Lease/GetFileUploadSource?file=" + file));
    };
    AccountserviceService.prototype.CheckDealerCompanyName = function (accountid, delarcompanyName) {
        return this.http.get(this.baseUri + ("Lease/CheckDealerCompanyName?accountid=" + accountid + "&dealerCompanyName=" + delarcompanyName));
    };
    AccountserviceService.prototype.GetAccounDetails = function (id) {
        return this.http.get(this.baseUri + ("Dashboard/GetAccounDetails?Id=" + id));
    };
    AccountserviceService.prototype.getRoleListForEnableLogin = function (accountId) {
        return this.http.get(this.baseUri + ("Dashboard/GetRoleListForEnableLogin?accountId=" + accountId));
    };
    AccountserviceService.prototype.ContactList = function (listFilter, sortColumn, sortDir, page, pageSizeValue, loginuserid, accountId) {
        return this.http.get(this.baseUri + ("Dashboard/GetContactList?listFilte=" + listFilter + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSizeValue + "&userId=" + loginuserid + "&accountId=" + accountId));
    };
    AccountserviceService.prototype.RelatedContactList = function (listFilter, sortColumn, sortDir, page, pageSizeValue, loginuserid, accountId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Dashboard/GetRelatedContactList?listFilter=" + listFilter + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSizeValue + "&userId=" + loginuserid + "&accountId=" + accountId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    AccountserviceService.prototype.addOrUpdateManageStatusForAccountDetails = function (loanproductModel, accountId) {
        return this.http.post(this.baseUri + "Dashboard/AddUpdateEnableLogin", loanproductModel, accountId);
    };
    AccountserviceService.prototype.ClickToDownload = function (recaodingPath, accountId) {
        return this.http.get(this.baseUri + ("Account/DownloadRingCentralRecaoding?recaodingPath=" + recaodingPath + "&accountId=" + accountId), { responseType: 'blob' });
    };
    AccountserviceService.prototype.getFile = function (uri) {
        //const options = { responseType: 'blob' }; there is no use of this
        //let uri = '/your/uri';
        return this.http.get(uri);
    };
    AccountserviceService.prototype.GetAccountsOppoutunityList = function (accountId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Account/GetAccountOppoutunitiesList?accountId=" + accountId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    AccountserviceService.prototype.GetAccountsCommunicationList = function (accountId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Account/GetAccountsCommunicationList?accountId=" + accountId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    AccountserviceService.prototype.GetAccountsContractList = function (accountId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Account/GetAccountContractsList?accountId=" + accountId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    AccountserviceService.prototype.GetAccountsContactList = function (accountId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Account/GetAccountContactsList?accountId=" + accountId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    AccountserviceService.prototype.GetAccountsProposalsList = function (accountId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Account/GetAccountProposalsList?accountId=" + accountId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    AccountserviceService.prototype.GetAccountsWorkOrderList = function (accountId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Account/GetAccountWorkOrdersList?accountId=" + accountId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    AccountserviceService.prototype.GetAccountsServiceAppointmentsList = function (accountId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Account/GetAccountServiceAppointmentsList?accountId=" + accountId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    AccountserviceService.prototype.GetAccountsJurisdictionList = function (accountId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Account/GetAccountsJurisdictionList?accountId=" + accountId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    AccountserviceService.prototype.GetAccountsProductsList = function (accountId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("Account/GetAccountsProductsList?accountId=" + accountId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    AccountserviceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    AccountserviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AccountserviceService);
    return AccountserviceService;
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
        this.Id = "";
        this.FormJsonData = "";
        this.moduleCode = "";
        this.subModuleCode = "";
        this.companyId = "";
        this.userId = "";
    }
    return JsonData;
}());



/***/ })

}]);
//# sourceMappingURL=default~views-designation-designation-module~views-internalaccounts-internalaccount-module~views-len~f8dd7306.js.map