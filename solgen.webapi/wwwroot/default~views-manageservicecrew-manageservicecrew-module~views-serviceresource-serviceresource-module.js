(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-manageservicecrew-manageservicecrew-module~views-serviceresource-serviceresource-module"],{

/***/ "./src/app/views/serviceresource/serviceresourse.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/views/serviceresource/serviceresourse.service.ts ***!
  \******************************************************************/
/*! exports provided: ServiceresourseService, resourceServiceJsonData, Skillmodel, ServiceTerritorymodel, addeditServiceCrew, addAssignedResourcesModel, AbcenseModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceresourseService", function() { return ServiceresourseService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resourceServiceJsonData", function() { return resourceServiceJsonData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Skillmodel", function() { return Skillmodel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceTerritorymodel", function() { return ServiceTerritorymodel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addeditServiceCrew", function() { return addeditServiceCrew; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addAssignedResourcesModel", function() { return addAssignedResourcesModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbcenseModel", function() { return AbcenseModel; });
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




var ServiceresourseService = /** @class */ (function () {
    function ServiceresourseService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    ServiceresourseService.prototype.onDeleteTask = function (taskId, sectionName) {
        return this.http.get(this.baseUri + "Task/DeleteTask?taskID=" + taskId + "&sectionName=" + sectionName)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return true;
        }));
    };
    ServiceresourseService.prototype.GetServiceResourseServiceList = function (listFiltertext, searchUserType, sortColumn, sortDir, currentPage, pageSizeValue, loginuserid, custom_view_id, searchFilter, moduleName, submoduleName, companyId, isCheckboxTick) {
        // alert(page);
        return this.http.get(this.baseUri + "workorder/GetServiceResourseServiceList?listFiltertext=" + listFiltertext + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&searchUserType=" + searchUserType + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&currentPage=" + currentPage + "&pageSizeValue=" + pageSizeValue + "&custom_view_id=" + custom_view_id + "&isAllRecords=" + isCheckboxTick);
    };
    ServiceresourseService.prototype.GetCustomFieldsList = function (modulename, submoduleName, companyId, Id, displayType) {
        var _this = this;
        return this.http.get(this.baseUri + "vendor/GetCustomFields?moduleName=" + modulename + "&strType=" + submoduleName + "&companyId=" + companyId + "&PrimaryId=" + Id + "&displayCode=" + displayType)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.customFieldsList = response;
            return true;
        }));
    };
    ServiceresourseService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    ServiceresourseService.prototype.getCountryList = function () {
        return this.http.get(this.baseUri + "ManageInsurance/GetCountryList");
    };
    ServiceresourseService.prototype.addOrUpdateserviceResource = function (resourceJsonData) {
        return this.http.post(this.baseUri + "workorder/AddOrUpdateResourceService", resourceJsonData);
    };
    ServiceresourseService.prototype.GetServiceTerritoryList = function (contId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("workorder/GetServiceTerritoryList?ServiceId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    ServiceresourseService.prototype.refreshAppointmentList = function (contId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("workorder/GetServiceAppointmentList?ServiceId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    ServiceresourseService.prototype.GetServiceServiceCrewList = function (contId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("workorder/GetServiceServiceCrewList?ServiceId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    ServiceresourseService.prototype.GetServiceGetAbcenseList = function (contId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("workorder/GetServiceGetAbcenseList?ServiceId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    ServiceresourseService.prototype.GetServiceGetFileList = function (contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName) {
        return this.http.get(this.baseUri + ("workorder/GetServiceGetFileList?ServiceId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&modulename=" + modulename + "&submoduleName=" + submoduleName));
    };
    ServiceresourseService.prototype.refreshSkillsList = function (contId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("workorder/GetServiceSkillList?ServiceId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    ServiceresourseService.prototype.addeditServiceSKill = function (model) {
        return this.http.post(this.baseUri + "workorder/SaveServiceSkill", model);
    };
    ServiceresourseService.prototype.addeditServiceCrewSKill = function (model) {
        return this.http.post(this.baseUri + "workorder/SaveServiceCrewSkill", model);
    };
    ServiceresourseService.prototype.addeditServiceTerritory = function (model) {
        return this.http.post(this.baseUri + "workorder/SaveServiceTerritory", model);
    };
    ServiceresourseService.prototype.addeditServiceCrew = function (model) {
        return this.http.post(this.baseUri + "workorder/SaveServiceCrew", model);
    };
    ServiceresourseService.prototype.GetServiceCrewDll = function () {
        return this.http.get(this.baseUri + "serviceappointment/GetServiceCrewDll");
    };
    ServiceresourseService.prototype.GetEstimatedTravelTimeFromAndToSourceDll = function () {
        return this.http.get(this.baseUri + "serviceappointment/GetEstimatedTravelTimeFromAndToSourceDll");
    };
    ServiceresourseService.prototype.saveAssignedResource = function (assignedResources) {
        return this.http.post(this.baseUri + "serviceappointment/SaveAssignedResources", assignedResources);
    };
    ServiceresourseService.prototype.addeditServiceabcense = function (model) {
        return this.http.post(this.baseUri + "workorder/SaveServiceAbcense", model);
    };
    ServiceresourseService.prototype.addOrUpdateFiles = function (CompanySetUpModel) {
        return this.http.post(this.baseUri + "workorder/addOrUpdateFiles", CompanySetUpModel);
    };
    ServiceresourseService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    ServiceresourseService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ServiceresourseService);
    return ServiceresourseService;
}());

var resourceServiceJsonData = /** @class */ (function () {
    function resourceServiceJsonData() {
        this.id = "";
        this.FormJsonData = "";
        this.moduleCode = "";
        this.subModuleCode = "";
        this.companyId = "";
        this.userId = "";
    }
    return resourceServiceJsonData;
}());

var Skillmodel = /** @class */ (function () {
    function Skillmodel() {
        this.skillId = '';
        this.serviceResource = '';
        this.skill = '';
        this.skillLevel = '';
        this.startDate = '';
        this.startTime = '';
        this.endDate = '';
        this.endTime = '';
    }
    return Skillmodel;
}());

var ServiceTerritorymodel = /** @class */ (function () {
    function ServiceTerritorymodel() {
        this.territoryId = '';
        this.serviceResource = '';
        this.serviceTerritoryId = '';
        this.territoryType = '';
        this.address = '';
        this.country = '';
        this.addressDes = '';
        this.city = '';
        this.state = '';
        this.zipCode = '';
        this.operatingHours = '';
        this.startDate = '';
        this.endDate = '';
    }
    return ServiceTerritorymodel;
}());

var addeditServiceCrew = /** @class */ (function () {
    function addeditServiceCrew() {
        this.crewMemberId = '';
        this.serviceResource = '';
        this.serviceCrew = '';
        this.isLeader = false;
        this.startDate = '';
        this.endDate = '';
    }
    return addeditServiceCrew;
}());

var addAssignedResourcesModel = /** @class */ (function () {
    function addAssignedResourcesModel() {
        this.serviceAppointment = '';
        this.serviceResourceId = '';
        this.estimatedTravelTime = '';
        this.actualTravelTime = '';
        this.serviceCrewId = '';
        this.estimatedTravelTimeFromSourceId = '';
        this.approximateTravelDistanceForm = '';
        this.estimatedTravelTimeToSourceId = '';
        this.approximateTravelDistanceTo = '';
        this.lastUpdatedEpoch = '';
        this.approximateTravelTimeForm = '';
        this.isUpdatedByOptimization = '';
        this.calculatedDurationMinutes = '';
        this.Id = 0;
        this.isServiceResource = false;
    }
    return addAssignedResourcesModel;
}());

var AbcenseModel = /** @class */ (function () {
    function AbcenseModel() {
        this.id = '';
        ;
        this.recordType = '';
        this.serviceResource = '';
        this.type = '';
        this.startDate = '';
        this.endDate = '';
        this.description = '';
        this.ganttLabel = '';
        this.country = '';
        this.addressDes = '';
        this.city = '';
        this.state = '';
        this.zipCode = '';
    }
    return AbcenseModel;
}());



/***/ })

}]);
//# sourceMappingURL=default~views-manageservicecrew-manageservicecrew-module~views-serviceresource-serviceresource-module.js.map