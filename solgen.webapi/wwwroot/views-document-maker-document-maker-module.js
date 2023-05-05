(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-document-maker-document-maker-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker/canvas/canvas.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker/canvas/canvas.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>canvas works!</p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker/content/content.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker/content/content.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <p>content works!</p> -->\n<div class=\"card\" style=\"width: 220px;height: 500px;padding:5px\">\n  <div>Content</div>\n  <div style=\"margin-top: 5px;\">Blocks</div>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <app-text></app-text>\n    </div>\n    <div class=\"col-md-6\">\n      <app-image></app-image>\n    </div>\n  </div>\n</div>\n\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker/document/document.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker/document/document.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>document works!</p>\n\n\n<app-canvas></app-canvas>\n\n\n<div style=\"float: right;\">\n  <app-content></app-content>\n</div>\n\n");

/***/ }),

/***/ "./src/app/views/document-maker/canvas/canvas.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/views/document-maker/canvas/canvas.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2RvY3VtZW50LW1ha2VyL2NhbnZhcy9jYW52YXMuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/document-maker/canvas/canvas.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/document-maker/canvas/canvas.component.ts ***!
  \*****************************************************************/
/*! exports provided: CanvasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasComponent", function() { return CanvasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
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

var CanvasComponent = /** @class */ (function () {
    function CanvasComponent() {
    }
    CanvasComponent.prototype.ngOnInit = function () {
    };
    CanvasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-canvas',
            template: __importDefault(__webpack_require__(/*! raw-loader!./canvas.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker/canvas/canvas.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./canvas.component.scss */ "./src/app/views/document-maker/canvas/canvas.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], CanvasComponent);
    return CanvasComponent;
}());



/***/ }),

/***/ "./src/app/views/document-maker/content/content.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/views/document-maker/content/content.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2RvY3VtZW50LW1ha2VyL2NvbnRlbnQvY29udGVudC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/document-maker/content/content.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/document-maker/content/content.component.ts ***!
  \*******************************************************************/
/*! exports provided: ContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentComponent", function() { return ContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dto_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dto/content */ "./src/app/views/document-maker/dto/content.ts");
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


var ContentComponent = /** @class */ (function () {
    function ContentComponent() {
        this.content = new _dto_content__WEBPACK_IMPORTED_MODULE_1__["Content"]([new _dto_content__WEBPACK_IMPORTED_MODULE_1__["ContentItem"]('fdf', 'fdf', 'dfd', 'dfdf', '4ihi5', 'fvgfvf'), new _dto_content__WEBPACK_IMPORTED_MODULE_1__["ContentItem"]('fdf', 'fdf', 'dfd', 'dfdf', '4ihi5', 'fvgfvf')], [new _dto_content__WEBPACK_IMPORTED_MODULE_1__["ContentItem"]('fdf', 'fdf', 'dfd', 'dfdf', '4ihi5', 'fvgfvf'), new _dto_content__WEBPACK_IMPORTED_MODULE_1__["ContentItem"]('fdf', 'fdf', 'dfd', 'dfdf', '4ihi5', 'fvgfvf')]);
    }
    ContentComponent.prototype.ngOnInit = function () {
        console.log(this.content);
        debugger;
    };
    Object.defineProperty(ContentComponent.prototype, "blockData", {
        get: function () {
            return this.content.blocks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "fieldData", {
        get: function () {
            return this.content.fields;
        },
        enumerable: true,
        configurable: true
    });
    ContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-content',
            template: __importDefault(__webpack_require__(/*! raw-loader!./content.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker/content/content.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./content.component.scss */ "./src/app/views/document-maker/content/content.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], ContentComponent);
    return ContentComponent;
}());



/***/ }),

/***/ "./src/app/views/document-maker/document-maker-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/document-maker/document-maker-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: DocumentMakerRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerRoutingModule", function() { return DocumentMakerRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _document_document_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./document/document.component */ "./src/app/views/document-maker/document/document.component.ts");
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
        path: '',
        component: _document_document_component__WEBPACK_IMPORTED_MODULE_2__["DocumentComponent"],
        data: { title: 'Document maker' }
    }
];
var DocumentMakerRoutingModule = /** @class */ (function () {
    function DocumentMakerRoutingModule() {
    }
    DocumentMakerRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DocumentMakerRoutingModule);
    return DocumentMakerRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/document-maker/document-maker.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/document-maker/document-maker.module.ts ***!
  \***************************************************************/
/*! exports provided: DocumentMakerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMakerModule", function() { return DocumentMakerModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _document_maker_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./document-maker-routing.module */ "./src/app/views/document-maker/document-maker-routing.module.ts");
/* harmony import */ var _canvas_canvas_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas/canvas.component */ "./src/app/views/document-maker/canvas/canvas.component.ts");
/* harmony import */ var _content_content_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content/content.component */ "./src/app/views/document-maker/content/content.component.ts");
/* harmony import */ var _document_document_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./document/document.component */ "./src/app/views/document-maker/document/document.component.ts");
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







var DocumentMakerModule = /** @class */ (function () {
    function DocumentMakerModule() {
    }
    DocumentMakerModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_canvas_canvas_component__WEBPACK_IMPORTED_MODULE_3__["CanvasComponent"], _content_content_component__WEBPACK_IMPORTED_MODULE_4__["ContentComponent"], _document_document_component__WEBPACK_IMPORTED_MODULE_5__["DocumentComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _document_maker_routing_module__WEBPACK_IMPORTED_MODULE_2__["DocumentMakerRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"]
            ]
        })
    ], DocumentMakerModule);
    return DocumentMakerModule;
}());



/***/ }),

/***/ "./src/app/views/document-maker/document/document.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/views/document-maker/document/document.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2RvY3VtZW50LW1ha2VyL2RvY3VtZW50L2RvY3VtZW50LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/document-maker/document/document.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/document-maker/document/document.component.ts ***!
  \*********************************************************************/
/*! exports provided: DocumentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentComponent", function() { return DocumentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
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

var DocumentComponent = /** @class */ (function () {
    function DocumentComponent() {
    }
    DocumentComponent.prototype.ngOnInit = function () {
    };
    DocumentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-document',
            template: __importDefault(__webpack_require__(/*! raw-loader!./document.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/document-maker/document/document.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./document.component.scss */ "./src/app/views/document-maker/document/document.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], DocumentComponent);
    return DocumentComponent;
}());



/***/ }),

/***/ "./src/app/views/document-maker/dto/content.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/document-maker/dto/content.ts ***!
  \*****************************************************/
/*! exports provided: Content, ContentItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Content", function() { return Content; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentItem", function() { return ContentItem; });
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Content = /** @class */ (function () {
    function Content(blocks, fields) {
        this.blocks = [];
        this.fields = [];
        this.blocks = blocks;
        this.fields = fields;
    }
    return Content;
}());

var ContentItem = /** @class */ (function () {
    function ContentItem(type, name, keyCode, icon, contentId, classList) {
        this.type = type;
        this.name = name;
        this.keyCode = keyCode;
        this.icon = icon;
        this.contentId = contentId;
        this.classList = classList;
    }
    return ContentItem;
}());



/***/ })

}]);
//# sourceMappingURL=views-document-maker-document-maker-module.js.map