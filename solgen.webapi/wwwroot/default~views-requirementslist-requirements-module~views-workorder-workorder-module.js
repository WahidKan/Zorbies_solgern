(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-requirementslist-requirements-module~views-workorder-workorder-module"],{

/***/ "./src/app/views/workorder/workorderservice.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/workorder/workorderservice.service.ts ***!
  \*************************************************************/
/*! exports provided: WorkorderService, StartWorkOrderModel, JsonData, CheckboxData, fixOrderModel, addeditProductRequired, addeditEngineeringQuestionModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkorderService", function() { return WorkorderService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartWorkOrderModel", function() { return StartWorkOrderModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonData", function() { return JsonData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxData", function() { return CheckboxData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixOrderModel", function() { return fixOrderModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addeditProductRequired", function() { return addeditProductRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addeditEngineeringQuestionModel", function() { return addeditEngineeringQuestionModel; });
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




var WorkorderService = /** @class */ (function () {
    function WorkorderService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    WorkorderService.prototype.GetWorkOrderList = function (listFilter, sortColumn, page, pageSize, sortDir, loginuserid, moduleName, submoduleName, companyId, custom_view_id, isCheckboxTick) {
        if (typeof listFilter == "undefined" || listFilter == null || listFilter == "") {
            listFilter = "";
        }
        else {
            listFilter = encodeURIComponent((listFilter));
        }
        if (typeof loginuserid == "undefined") {
            loginuserid = "";
        }
        if (typeof companyId == "undefined") {
            companyId = "";
        }
        return this.http.get(this.baseUri + ("workorder/GetWorkOrderList?nameSearch=" + listFilter + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + loginuserid + "&moduleName=" + moduleName + "&submoduleName=" + submoduleName + "&companyId=" + companyId + "&custom_view_id=" + custom_view_id + "&isAllRecords=" + isCheckboxTick));
    };
    WorkorderService.prototype.DeleteRecords = function (deleteId, tableName) {
        var _this = this;
        return this.http.get(this.baseUri + ("common/DeleteRecords?primaryKey=" + deleteId + "&tableName=" + tableName))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.editPage = response;
            return true;
        }));
    };
    WorkorderService.prototype.manageWorkOrder = function (jsonData) {
        return this.http.post(this.baseUri + "workorder/manageWorkOrder", jsonData);
    };
    WorkorderService.prototype.setNotesToRead = function (noteid) {
        //return this.http.get(`${this.baseUri}/SetNotesToRead?noteid=${noteid}`)
        return this.http.get(this.baseUri + ("Notes/SetNotesToRead?noteid=" + noteid));
    };
    WorkorderService.prototype.addOrUpdateFiles = function (workOrderModel) {
        return this.http.post(this.baseUri + "workorder/addOrUpdateFiles", workOrderModel);
    };
    WorkorderService.prototype.GetServiceGetFileList = function (contId, sortColumn, sortDir, pageIndex, pageSize, modulename, submoduleName) {
        return this.http.get(this.baseUri + ("workorder/GetServiceGetFileList?ServiceId=" + contId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&modulename=" + modulename + "&submoduleName=" + submoduleName));
    };
    WorkorderService.prototype.GetServiceAppointmentList = function (WorkOrderId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("workorder/GetWorkOrderServiceAppointmentList?Id=" + WorkOrderId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    WorkorderService.prototype.GetProductRequiredList = function (WorkOrderId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("workorder/GetWorkOrderProductRequiredList?Id=" + WorkOrderId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    WorkorderService.prototype.GetEngineeringQuestionData = function (WorkOrderId) {
        debugger;
        return this.http.get(this.baseUri + ("workorder/GetEngineeringQuestionData?workOrderId=" + WorkOrderId));
    };
    WorkorderService.prototype.GetOpportunityList = function (WorkOrderId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("workorder/GetOpportunityList?Id=" + WorkOrderId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize));
    };
    WorkorderService.prototype.GetWorkOrderLineItemList = function (WorkOrderId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("workorder/GetWorkOrderLineItemList?workorderid=" + WorkOrderId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&PageNo=" + pageIndex + "&pageSize=" + pageSize));
    };
    WorkorderService.prototype.fixOrder = function (fixOrdermodel) {
        return this.http.post(this.baseUri + "workorder/AddEditfixOrder", fixOrdermodel);
    };
    WorkorderService.prototype.getFixOrderData = function (workOrderid) {
        return this.http.get(this.baseUri + "workorder/GetFixOrderData?workOrderid=" + workOrderid);
    };
    WorkorderService.prototype.updateStatusOrCreateLog = function (model) {
        return this.http.post(this.baseUri + "workorder/updateStatusOrCreateLog", model);
    };
    WorkorderService.prototype.GetWorkOrderHistoryList = function (WorkOrderId, sortColumn, sortDir, pageIndex, pageSize) {
        return this.http.get(this.baseUri + ("workorder/GetWorkOrderHistoryList?workorderid=" + WorkOrderId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&PageNo=" + pageIndex + "&pageSize=" + pageSize));
    };
    WorkorderService.prototype.addeditProductRequired = function (model) {
        return this.http.post(this.baseUri + "workorder/addeditProductRequired", model);
    };
    WorkorderService.prototype.addeditEngineeringQuestionData = function (model) {
        debugger;
        return this.http.post(this.baseUri + "workorder/AddeditEngineeringQuestionData", model);
    };
    WorkorderService.prototype.getAuditReviewData = function (Id, accountId) {
        debugger;
        return this.http.get(this.baseUri + "workorder/WorkOrderAuditReviewData?Id=" + Id + "&accountId=" + accountId);
    };
    WorkorderService.prototype.auditChecklistDetail = function (checkList_Id, Id) {
        debugger;
        return this.http.get(this.baseUri + "serviceappointment/AuditChecklistDetail?checkList_Id=" + checkList_Id + "&Id=" + Id);
    };
    WorkorderService.prototype.getNoteslistCardView = function (leadid, submodulename, objectname, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        return this.http.get(this.baseUri + "Notes/getNoteslistForCardView?leadid=" + leadid + "&submodulename=" + submodulename + "&objectname=" + objectname + "&SortColumn=" + sortColumn + "&SortDir=" + sortDir + "&PageNo=" + page + "&PageSize=" + pageSize + "&userId=" + userId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedDataNewCardView = response;
            return true;
        }));
    };
    WorkorderService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    WorkorderService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], WorkorderService);
    return WorkorderService;
}());

var StartWorkOrderModel = /** @class */ (function () {
    function StartWorkOrderModel() {
        this.workOrderId = '';
        this.statusId = '';
        this.moduleName = '';
        this.submoduleName = '';
    }
    return StartWorkOrderModel;
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

var fixOrderModel = /** @class */ (function () {
    function fixOrderModel() {
        this.object_id = '';
        this.departmentId = 0;
        this.fixOrderDescription = '';
        this.object_name = '';
        this.object_ref_id = 0;
    }
    return fixOrderModel;
}());

var addeditProductRequired = /** @class */ (function () {
    function addeditProductRequired() {
        this.ParentRecord = '';
        this.ProductRequired = '';
        this.QuantityRequired = '';
        this.DateDelivered = false;
        this.QuantityUnitOfMeasure = '';
        this.Id = '';
        this.WorkOrderId = null;
    }
    return addeditProductRequired;
}());

var addeditEngineeringQuestionModel = /** @class */ (function () {
    //QuantityRequired: string;
    //DateDelivered: boolean;
    //QuantityUnitOfMeasure: string;
    //Id: string;
    //WorkOrderId: any;
    function addeditEngineeringQuestionModel() {
        this.workOrderId = "";
        this.mpuNeeded = '';
        this.TrenchingNeeded = '';
        this.RetrofitNeeded = '';
        this.InterconnectionType = '';
        this.NumberOfArrays = '';
        this.RoofMaterial = '';
        this.RoofTilt = '';
        this.MidClamps = '';
        this.EndClamps = '';
        this.GroundingLugs = '';
        this.TBolts = '';
        this.EndCovers = '';
        this.Splice = '';
        this.Flashings = '';
        this.Rail = '';
        this.RailWeight = '';
        this.ModuleWeight = '';
        this.PSF = '';
        this.TotalWeight = '';
        this.ENGFirstReviewBy = '';
        this.ENGFirstReviewDate = '';
        this.ENGSecondReviewBy = '';
        this.ENGSecondReviewDate = '';
        //this.QuantityRequired = '';
        //this.DateDelivered = false;
        //this.QuantityUnitOfMeasure = '';
        //this.Id = '';
        //this.WorkOrderId = null;
    }
    return addeditEngineeringQuestionModel;
}());



/***/ })

}]);
//# sourceMappingURL=default~views-requirementslist-requirements-module~views-workorder-workorder-module.js.map