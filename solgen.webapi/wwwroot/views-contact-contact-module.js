(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-contact-contact-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/addeditcontact.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/addeditcontact.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("      <!-- Side Navbar -->\r\n<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Manage Customer</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/contact\">Manage Customer</a></li>\r\n            <li class=\"breadcrumb-item active\">{{pageTitle}}</li>\r\n          </ul>\r\n        </div>\r\n\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <button class=\"w-auto sw-100 btn btn-dark\" (click)=\"cancelForm()\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n        </div>\r\n\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- Header Section-->\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 mt-4\">\r\n              <form [formGroup]=\"contactForm\" autocomplete=\"off\">\r\n                <div class=\"contact-box\" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <div class=\"panel-group accordian\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\r\n                    <div class=\"panel panel-default mb-2\">\r\n                      <div class=\"panel-heading\" role=\"tab\" id=\"headingOne\">\r\n                        <h4 class=\"panel-title mb-0\">\r\n                          <a role=\"button\" class=\"collapsed\" id=\"firstAccordianAnch\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\r\n                            BUSINESS INFORMATION <small class=\"ml-2\" *ngIf=\"contactForm.get('contactId').value\">{{buissnessName}}</small>\r\n                          </a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"collapseOne\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\r\n                        <div class=\"panel-body bg-light p-3\">\r\n                          <div class=\"row\">\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Business Name:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactBussinessName\" maxlength=\"500\"\r\n                                       [ngClass]=\"{'is-invalid': (contactBussinessName.invalid && (contactBussinessName.dirty || contactBussinessName.touched) && (contactBussinessName.errors?.required || contactBussinessName.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactBussinessName').touched && contactForm.get('contactBussinessName').errors?.required\" class=\"text-danger\">\r\n                                  Business Name is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Business Tin:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <p-inputMask styleClass=\"form-control\" mask=\"99-9999999\" formControlName=\"contactBussinessTIN\" placeholder=\"__-_______\" [ngClass]=\"{'is-invalid': (contactBussinessTIN.invalid && (contactBussinessTIN.dirty || contactBussinessTIN.touched) && (contactBussinessTIN.errors?.required || contactBussinessTIN.errors?.maxlength)) }\">\r\n                                </p-inputMask>\r\n                                <small *ngIf=\"contactForm.get('contactBussinessTIN').touched && contactForm.get('contactBussinessTIN').errors?.required\" class=\"text-danger\">\r\n                                  Customer Business TIN is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n\r\n                            <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Business Tin:<span class=\"text-danger\">*</span></label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"contactBussinessTIN\" maxlength=\"9\"\r\n             [ngClass]=\"{'is-invalid': (contactBussinessTIN.invalid && (contactBussinessTIN.dirty || contactBussinessTIN.touched) && (contactBussinessTIN.errors?.required || contactBussinessTIN.errors?.maxlength)) }\">\r\n      <small *ngIf=\"contactForm.get('contactBussinessTIN').touched && contactForm.get('contactBussinessTIN').errors?.required\" class=\"text-danger\">\r\n        Contact Business TIN is required\r\n      </small>\r\n      <small *ngIf=\"contactForm.get('contactBussinessTIN').touched && contactForm.get('contactBussinessTIN').errors?.pattern\"\r\n             class=\"text-danger\">Please enter valid TIN</small>\r\n    </div>\r\n  </div>-->\r\n\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Type of Company:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"row\">\r\n                                <div class=\"col-md-12\">\r\n                                  <div class=\"form-group\">\r\n                                    <ng-select [items]=\"lstcompanyType\"\r\n                                               placeholder=\"Select Company Type\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"contactTypeOfCompany\" [loading]=\"isLoading\"\r\n                                               [ngClass]=\"{'is-invalid': (contactTypeOfCompany.invalid && (contactTypeOfCompany.dirty || contactTypeOfCompany.touched) && (contactTypeOfCompany.errors?.required || contactTypeOfCompany.errors?.maxlength)) }\">\r\n                                    </ng-select>\r\n                                    <small *ngIf=\"contactForm.get('contactTypeOfCompany').touched && contactForm.get('contactTypeOfCompany').errors?.required\" class=\"text-danger\">\r\n                                      Customer Type Of Company is required\r\n                                    </small>\r\n                                  </div>\r\n                                </div>\r\n                                <div *ngIf=\"!isLeaseCreated\" class=\"col-md-2 pl-0 text-right\">\r\n\r\n                                  <a href=\"javascript:void(0);\" (click)=\"addTypeOfComp(typeOfCompany)\" class=\"btn btn-orange\" data-toggle=\"modal\" data-target=\"#typeOfCompany\"><i class=\"fa fa-plus\"></i></a>\r\n\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Business Phone:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"bussinessPhone\" placeholder=\"(___) ___-____\" [ngClass]=\"{'is-invalid': (bussinessPhone.invalid && (bussinessPhone.dirty || bussinessPhone.touched) && (bussinessPhone.errors?.required || bussinessPhone.errors?.maxlength)) }\">\r\n                                </p-inputMask>\r\n                                <small *ngIf=\"contactForm.get('bussinessPhone').touched && contactForm.get('bussinessPhone').errors?.required\" class=\"text-danger\">\r\n                                  Business Phone is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Business Phone:<span class=\"text-danger\">*</span></label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"bussinessPhone\" maxlength=\"100\"\r\n             [ngClass]=\"{'is-invalid': (bussinessPhone.invalid && (bussinessPhone.dirty || bussinessPhone.touched) && (bussinessPhone.errors?.required || bussinessPhone.errors?.maxlength)) }\">\r\n      <small *ngIf=\"contactForm.get('bussinessPhone').touched && contactForm.get('bussinessPhone').errors?.required\" class=\"text-danger\">\r\n        Business Phone is required\r\n      </small>\r\n      <small *ngIf=\"contactForm.get('bussinessPhone').touched && contactForm.get('bussinessPhone').errors?.pattern\"\r\n             class=\"text-danger\">Please enter valid Phone</small>\r\n    </div>\r\n  </div>-->\r\n\r\n\r\n                            <div class=\"col-12 col-md-12 col-lg-12\">\r\n                              <label class=\"m-label-s\">CUSTOMER DETAIL:</label>\r\n                              <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Customer Phone:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"contactBussinessPhone\" placeholder=\"(___) ___-____\" [ngClass]=\"{'is-invalid': (contactBussinessPhone.invalid && (contactBussinessPhone.dirty || contactBussinessPhone.touched) && (contactBussinessPhone.errors?.required || contactBussinessPhone.errors?.maxlength)) }\">\r\n                                </p-inputMask>\r\n                                <small *ngIf=\"contactForm.get('contactBussinessPhone').touched && contactForm.get('contactBussinessPhone').errors?.required\" class=\"text-danger\">\r\n                                  Customer Phone is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Contact Phone:<span class=\"text-danger\">*</span></label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"contactBussinessPhone\" maxlength=\"100\"\r\n             [ngClass]=\"{'is-invalid': (contactBussinessPhone.invalid && (contactBussinessPhone.dirty || contactBussinessPhone.touched) && (contactBussinessPhone.errors?.required || contactBussinessPhone.errors?.maxlength)) }\">\r\n      <small *ngIf=\"contactForm.get('contactBussinessPhone').touched && contactForm.get('contactBussinessPhone').errors?.required\" class=\"text-danger\">\r\n        Contact Phone is required\r\n      </small>\r\n      <small *ngIf=\"contactForm.get('contactBussinessPhone').touched && contactForm.get('contactBussinessPhone').errors?.pattern\"\r\n             class=\"text-danger\">Please enter valid Phone</small>\r\n    </div>\r\n  </div>-->\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Customer First Name:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactFirstName\" maxlength=\"100\"\r\n                                       [ngClass]=\"{'is-invalid': (contactFirstName.invalid && (contactFirstName.dirty || contactFirstName.touched) && (contactFirstName.errors?.required || contactFirstName.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactFirstName').touched && contactForm.get('contactFirstName').errors?.required\" class=\"text-danger\">\r\n                                  Customer First Name is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Customer Last Name:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactLastName\" maxlength=\"100\"\r\n                                       [ngClass]=\"{'is-invalid': (contactLastName.invalid && (contactLastName.dirty || contactLastName.touched) && (contactLastName.errors?.required || contactLastName.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactLastName').touched && contactForm.get('contactLastName').errors?.required\" class=\"text-danger\">\r\n                                  Customer Last Name is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Customer Position:</label>\r\n                              <div class=\"row\">\r\n                                <div class=\"col-md-10 pr-0\">\r\n                                  <div class=\"form-group\">\r\n                                    <ng-select [items]=\"lstcontactPosition\"\r\n                                               placeholder=\"Select Customer Position\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"contactPosition\" [loading]=\"isLoading\">\r\n                                    </ng-select>\r\n                                  </div>\r\n                                </div>\r\n                                <div class=\"col-md-2 pl-0 text-right\"><a href=\"javascript:void(0);\" (click)=\"addContactPosition(addContact)\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#insurancerequest\"><i class=\"fa fa-plus\"></i></a></div>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Customer Email:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactEmail\" maxlength=\"200\"\r\n                                       [ngClass]=\"{'is-invalid': (contactEmail.invalid && (contactEmail.dirty || contactEmail.touched) && (contactEmail.errors?.required || contactEmail.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactEmail').touched && contactForm.get('contactEmail').errors?.required\" class=\"text-danger\">\r\n                                  Customer Email is required\r\n                                </small>\r\n                                <small *ngIf=\"contactForm.get('contactEmail').touched && contactForm.get('contactEmail').errors?.email\" class=\"text-danger\">Please enter valid Email</small>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Social Security#:</label>\r\n                              <div class=\"form-group\">\r\n                                <p-inputMask styleClass=\"form-control\" mask=\"999-99-9999\" formControlName=\"contactSocialSecurityNumber\" placeholder=\"___-__-____\"></p-inputMask>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Customer Preferred Document Signed:</label>\r\n                              <div class=\"form-group\">\r\n                                <div class=\"form-check-inline\">\r\n                                  <div class=\"custom-control custom-radio\">\r\n                                    <input type=\"radio\" class=\"custom-control-input\" id=\"customRadio\" name=\"contactPreferredDocumentSignedBy\" value=\"DocuSign\" formControlName=\"contactPreferredDocumentSignedBy\">\r\n                                    <label class=\"custom-control-label\" for=\"customRadio\">DocuSign</label>\r\n                                  </div>\r\n                                </div>\r\n                                <div class=\"form-check-inline\">\r\n                                  <div class=\"custom-control custom-radio\">\r\n                                    <input type=\"radio\" class=\"custom-control-input\" id=\"customRadio1\" name=\"contactPreferredDocumentSignedBy\" value=\"Wet Signature\" formControlName=\"contactPreferredDocumentSignedBy\" checked>\r\n                                    <label class=\"custom-control-label\" for=\"customRadio1\">Wet Signature</label>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-12 col-lg-12\">\r\n                              <label class=\"m-label-s\">Business Mailing Address:</label>\r\n                              <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>City:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactMailAddressCity\" maxlength=\"200\"\r\n                                       [ngClass]=\"{'is-invalid': (contactMailAddressCity.invalid && (contactMailAddressCity.dirty || contactMailAddressCity.touched) && (contactMailAddressCity.errors?.required || contactMailAddressCity.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactMailAddressCity').touched && contactForm.get('contactMailAddressCity').errors?.required\" class=\"text-danger\">\r\n                                  Customer Mail City is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>County:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactMailAddressCounty\" maxlength=\"500\"\r\n                                       [ngClass]=\"{'is-invalid': (contactMailAddressCounty.invalid && (contactMailAddressCounty.dirty || contactMailAddressCounty.touched) && (contactMailAddressCounty.errors?.required || contactMailAddressCounty.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactMailAddressCounty').touched && contactForm.get('contactMailAddressCounty').errors?.required\" class=\"text-danger\">\r\n                                  Customer Mail Address County is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>State:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <ng-select [items]=\"lstStates\"\r\n                                           placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"contactMailAddressState\"\r\n                                           [ngClass]=\"{'is-invalid': (contactMailAddressState.invalid && (contactMailAddressState.dirty || contactMailAddressState.touched) && (contactMailAddressState.errors?.required || contactMailAddressState.errors?.maxlength)) }\">\r\n                                </ng-select>\r\n                                <small *ngIf=\"contactForm.get('contactMailAddressState').touched && contactForm.get('contactMailAddressState').errors?.required\" class=\"text-danger\">\r\n                                  Customer mail Address State is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Zip:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactMailAddressZip\"\r\n                                       [ngClass]=\"{'is-invalid': (contactMailAddressZip.invalid && (contactMailAddressZip.dirty || contactMailAddressZip.touched) && (contactMailAddressZip.errors?.required || contactMailAddressZip.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactMailAddressZip').touched && contactForm.get('contactMailAddressZip').errors?.required\" class=\"text-danger\">\r\n                                  Customer mail Address Zip is required\r\n                                </small>\r\n                                <small *ngIf=\"contactMailAddressZip.invalid && (contactMailAddressZip.dirty || contactMailAddressZip.touched) && contactMailAddressZip.errors?.maxlength\"\r\n                                       class=\"text-danger\">Zip can not be greater than 5 characters.</small>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Mailing Address:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <textarea class=\"form-control\" formControlName=\"contactBussinessMailAddress\" maxlength=\"1000\"\r\n                                          [ngClass]=\"{'is-invalid': (contactBussinessMailAddress.invalid && (contactBussinessMailAddress.dirty || contactBussinessMailAddress.touched) && (contactBussinessMailAddress.errors?.required || contactBussinessMailAddress.errors?.maxlength)) }\"></textarea>\r\n                                <small *ngIf=\"contactForm.get('contactBussinessMailAddress').touched && contactForm.get('contactBussinessMailAddress').errors?.required\" class=\"text-danger\">\r\n                                  Customer Mailing Address is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n\r\n                            <div class=\"col-12 col-md-12 col-lg-12\">\r\n                              <label class=\"m-label-s\">Business Physical Address:</label>&nbsp;&nbsp; <input type=\"checkbox\" (change)=\"toggleEditable($event)\"> (Same as Mailing Address)\r\n                              <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>City:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactPhysicalAddressCity\" maxlength=\"200\"\r\n                                       [ngClass]=\"{'is-invalid': (contactPhysicalAddressCity.invalid && (contactPhysicalAddressCity.dirty || contactPhysicalAddressCity.touched) && (contactPhysicalAddressCity.errors?.required || contactPhysicalAddressCity.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactPhysicalAddressCity').touched && contactForm.get('contactPhysicalAddressCity').errors?.required\" class=\"text-danger\">\r\n                                  Customer Physical Address City is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>County:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input value=\"\" class=\"form-control\" type=\"text\" placeholder=\"\" formControlName=\"contactPhysicalAddressCounty\"\r\n                                       [ngClass]=\"{'is-invalid': (contactPhysicalAddressCounty.invalid && (contactPhysicalAddressCounty.dirty || contactPhysicalAddressCounty.touched) && (contactPhysicalAddressCounty.errors?.required || contactPhysicalAddressCounty.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactPhysicalAddressCounty').touched && contactForm.get('contactPhysicalAddressCounty').errors?.required\" class=\"text-danger\">\r\n                                  Customer Physical Address County is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>State:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <ng-select [items]=\"lstStates\"\r\n                                           placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"contactPhysicalAddressState\"\r\n                                           [ngClass]=\"{'is-invalid': (contactPhysicalAddressState.invalid && (contactPhysicalAddressState.dirty || contactPhysicalAddressState.touched) && (contactPhysicalAddressState.errors?.required || contactPhysicalAddressState.errors?.maxlength)) }\">\r\n                                </ng-select>\r\n                                <small *ngIf=\"contactForm.get('contactPhysicalAddressState').touched && contactForm.get('contactPhysicalAddressState').errors?.required\" class=\"text-danger\">\r\n                                  Customer Physical Address State is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Zip:<span class=\"text-danger\">*</span></label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactPhysicalAddressZip\" maxlength=\"50\"\r\n                                       [ngClass]=\"{'is-invalid': (contactPhysicalAddressZip.invalid && (contactPhysicalAddressZip.dirty || contactPhysicalAddressZip.touched) && (contactPhysicalAddressZip.errors?.required || contactPhysicalAddressZip.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactPhysicalAddressZip').touched && contactForm.get('contactPhysicalAddressZip').errors?.required\" class=\"text-danger\">\r\n                                  Customer Physical Address Zip is required\r\n                                </small>\r\n                                <small *ngIf=\"contactPhysicalAddressZip.invalid && (contactPhysicalAddressZip.dirty || contactPhysicalAddressZip.touched) && contactPhysicalAddressZip.errors?.maxlength\"\r\n                                       class=\"text-danger\">Zip can not be greater than 5 characters.</small>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <div class=\"custom-checkbox\">\r\n                                <label class=\"mr-3\">Physical Address:<span class=\"text-danger\">*</span></label>\r\n                              </div>\r\n                              <div class=\"form-group\">\r\n                                <textarea class=\"form-control\" formControlName=\"contactBussinessPhysicalAddress\" maxlength=\"1000\"\r\n                                          [ngClass]=\"{'is-invalid': (contactBussinessPhysicalAddress.invalid && (contactBussinessPhysicalAddress.dirty || contactBussinessPhysicalAddress.touched) && (contactBussinessPhysicalAddress.errors?.required || contactBussinessPhysicalAddress.errors?.maxlength)) }\"></textarea>\r\n                                <small *ngIf=\"contactForm.get('contactBussinessPhysicalAddress').touched && contactForm.get('contactBussinessPhysicalAddress').errors?.required\" class=\"text-danger\">\r\n                                  Customer Business Physical Address is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"panel panel-default mb-2\">\r\n                      <div class=\"panel-heading\" role=\"tab\" id=\"headingTwo\">\r\n                        <h4 class=\"panel-title mb-0\">\r\n                          <a class=\"collapsed\" id=\"secondAccordianAnch\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\">\r\n                            GUARANTOR INFORMATION\r\n                          </a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"collapseTwo\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingTwo\">\r\n                        <!-- list of guarantors -->\r\n                        <div formArrayName=\"guarantors\" class=\"panel-body bg-light p-3 d-inline-block\">\r\n                          <div *ngFor=\"let guarantor of guarantors.controls; let i=index\">\r\n                            <div class=\"text-right\">\r\n                              <a *ngIf=\"contactForm.controls.guarantors.controls.length > 1\"\r\n                                 (click)=\"removeGuarantor(i,guarantor.get('guarantorID').value)\"\r\n                                 class=\"bg-danger px-3 py-2 text-white cursor-pointer\">\r\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\r\n                              </a>\r\n                            </div>\r\n\r\n                            <div [formGroupName]=\"i\" class=\"border p-3 mb-4 bg-white\">\r\n                              <guarantor [group]=\"contactForm.controls.guarantors.controls[i]\" [states]=\"lstStates\" [isDisabled]=\"disabled\"></guarantor>\r\n\r\n                            </div>\r\n                          </div>\r\n                          <small *ngIf=\"addOrUpdatePermission\" class=\"float-right btn btn-success text-white mb-md-2\" (click)=\"addGuarantor()\"><i class=\"fa fa-plus mr-1\"></i> Add More</small>\r\n                        </div>\r\n\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"panel panel-default mb-2\">\r\n                      <div class=\"panel-heading\" role=\"tab\" id=\"headingThree\">\r\n                        <h4 class=\"panel-title mb-0\">\r\n                          <a class=\"collapsed\" id=\"thirdAccordianAnch\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseThree\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\r\n                            INSURANCE INFORMATION\r\n                          </a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"collapseThree\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingThree\">\r\n                        <!--<div [formGroupName]=\"insurances\" class=\"panel-body bg-light p-3\">-->\r\n                          <!--<insurance [group]=\"contactForm.controls.insurances.controls[0]\" [states]=\"lstStates\"></insurance>-->\r\n                        <!--</div>-->\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n\r\n                    <div class=\"panel panel-default mb-2\">\r\n                      <div class=\"panel-heading\" role=\"tab\" id=\"headingSix\">\r\n                        <h4 class=\"panel-title mb-0\">\r\n                          <a role=\"button\" class=\"collapsed\" id=\"sixAccordianAnch\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseSix\" aria-expanded=\"false\" aria-controls=\"collapseSix\">\r\n                            BANK INFORMATION\r\n                          </a>\r\n                        </h4> \r\n                      </div>\r\n                      <div id=\"collapseSix\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingSix\">\r\n                        <div class=\"panel-body bg-light p-3\">\r\n                          <div class=\"row\">\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Bank Name:</label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactBankName\" maxlength=\"100\" placeholder=\"Enter Bank Name\"\r\n                                       [ngClass]=\"{'is-invalid': (contactBankName.invalid && (contactBankName.dirty || contactBankName.touched) && (contactBankName.errors?.required || contactBankName.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactBankName').touched && contactForm.get('contactBankName').errors?.required\" class=\"text-danger\">\r\n                                  Bank Name is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>City:</label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter City\" formControlName=\"contactBankCity\"\r\n                                       [ngClass]=\"{'is-invalid': (contactBankCity.invalid && (contactBankCity.dirty || contactBankCity.touched) && (contactBankCity.errors?.required || contactBankCity.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactBankCity.invalid && (contactBankCity.dirty || contactBankCity.touched) && contactBankCity.errors?.required\"\r\n                                       class=\"text-danger\">City is required</small>\r\n                                <small *ngIf=\"contactBankCity.invalid && (contactBankCity.dirty || contactBankCity.touched) && contactBankCity.errors?.maxlength\"\r\n                                       class=\"text-danger\">City name must be less than 100 characters.</small>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>County:</label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter County\"\r\n                                       formControlName=\"contactBankCounty\"\r\n                                       [ngClass]=\"{'is-invalid': (contactBankCounty.invalid && (contactBankCounty.dirty || contactBankCounty.touched) && (contactBankCounty.errors?.required || contactBankCounty.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactBankCounty.invalid && (contactBankCounty.dirty || contactBankCounty.touched) && contactBankCounty.errors?.required\"\r\n                                       class=\"text-danger\">County is required</small>\r\n                                <small *ngIf=\"contactBankCounty.invalid && (contactBankCounty.dirty || contactBankCounty.touched) && contactBankCounty.errors?.maxlength\"\r\n                                       class=\"text-danger\">County must be less than 100 characters.</small>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>State:</label>\r\n                              <div class=\"form-group\">\r\n                                <!--<ng-select [items]=\"lstStates\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"contactBankState\"\r\n                bindValue=\"value\" bindLabel=\"text\"\r\n                 [ngClass]=\"{'is-invalid': (contactBankState.invalid && (contactBankState.dirty || contactBankState.touched) && contactBankState.errors?.required) }\"></ng-select>\r\n      <small *ngIf=\"contactBankState.invalid && (contactBankState.dirty || contactBankState.touched) && contactBankState.errors?.required\" class=\"text-danger\">Please select State</small>-->\r\n                                <ng-select [items]=\"lstStates\"\r\n                                           placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"contactBankState\"\r\n                                           [ngClass]=\"{'is-invalid': (contactBankState.invalid && (contactBankState.dirty || contactBankState.touched) && (contactBankState.errors?.required || contactBankState.errors?.maxlength)) }\">\r\n                                </ng-select>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Zip Code:</label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Zip Code\" formControlName=\"contactBankZipcode\"\r\n                                       [ngClass]=\"{'is-invalid': (contactBankZipcode.invalid && (contactBankZipcode.dirty || contactBankZipcode.touched) && (contactBankZipcode.errors?.required || contactBankZipcode.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactBankZipcode.invalid && (contactBankZipcode.dirty || contactBankZipcode.touched) && contactBankZipcode.errors?.required\"\r\n                                       class=\"text-danger\">Zip Code is required</small>\r\n                                <small *ngIf=\"contactBankZipcode.invalid && (contactBankZipcode.dirty || contactBankZipcode.touched) && contactBankZipcode.errors?.maxlength\"\r\n                                       class=\"text-danger\">Zip Code can not be greater than 5 characters.</small>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Bank Routing Number:</label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactBankRoutingNumber\"\r\n                                       maxlength=\"100\" placeholder=\"Enter Bank Routing Number\"\r\n                                       [ngClass]=\"{'is-invalid': (contactBankRoutingNumber.invalid && (contactBankRoutingNumber.dirty || contactBankRoutingNumber.touched) && (contactBankRoutingNumber.errors?.required || contactBankRoutingNumber.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactBankRoutingNumber').touched && contactForm.get('contactBankRoutingNumber').errors?.required\" class=\"text-danger\">\r\n                                  Bank Routing Number is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Bank Account Number:</label>\r\n                              <div class=\"form-group\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"contactBankAccountNum\"\r\n                                       maxlength=\"100\" placeholder=\"Enter Bank Account Number\"\r\n                                       [ngClass]=\"{'is-invalid': (contactBankAccountNum.invalid && (contactBankAccountNum.dirty || contactBankAccountNum.touched) && (contactBankAccountNum.errors?.required || contactBankAccountNum.errors?.maxlength)) }\">\r\n                                <small *ngIf=\"contactForm.get('contactBankAccountNum').touched && contactForm.get('contactBankAccountNum').errors?.required\" class=\"text-danger\">\r\n                                  Bank Account Number is required\r\n                                </small>\r\n                              </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-12 col-md-6 col-lg-4\">\r\n                              <label>Bank Address:</label>\r\n                              <div class=\"form-group\">\r\n                                <textarea type=\"text\" class=\"form-control\" formControlName=\"contactBankAddress\"\r\n                                          maxlength=\"500\" placeholder=\"Enter Bank Address\"></textarea>\r\n                                <!--<input type=\"text\" class=\"form-control\" formControlName=\"contactBankAddress\" maxlength=\"500\"\r\n             [ngClass]=\"{'is-invalid': (contactBankAddress.invalid && (contactBankAddress.dirty || contactBankAddress.touched) && (contactBankAddress.errors?.required || contactBankAddress.errors?.maxlength)) }\">\r\n      <small *ngIf=\"contactForm.get('contactBankAddress').touched && contactForm.get('contactBankAddress').errors?.required\" class=\"text-danger\">\r\n        Bank Address is required\r\n      </small>-->\r\n                              </div>\r\n                            </div>\r\n\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"panel panel-default mb-2\" *ngIf=\"contactForm.get('contactId').value!=null\">\r\n                      <div class=\"panel-heading\" role=\"tab\" id=\"headingFour\">\r\n                        <h4 class=\"panel-title mb-0\">\r\n                          <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseFour\" aria-expanded=\"false\" aria-controls=\"collapseFour\">\r\n                            NOTES\r\n                          </a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"collapseFour\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingFour\">\r\n                        <div class=\"panel-body bg-light p-3\">\r\n                          <app-notes-partial-view [contactId]=\"contactForm.get('contactId').value\" [addOrUpdatePermission]=\"addPermission\"></app-notes-partial-view>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"panel panel-default mb-2\" *ngIf=\"contactForm.get('contactId').value!=null\">\r\n                      <div class=\"panel-heading\" role=\"tab\" id=\"headingFive\">\r\n                        <h4 class=\"panel-title mb-0\">\r\n                          <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseFive\" aria-expanded=\"false\" aria-controls=\"collapseFive\">\r\n                            UPLOAD CUSTOMER DOCUMENT \r\n                          </a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"collapseFive\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingFive\">\r\n                        <div class=\"panel-body bg-light p-3\">\r\n                          <app-upload [contactId]=\"contactForm.get('contactId').value\"\r\n                                      [prefixNameOfDocument]=\"contactForm.get('contactFirstName').value+' '+contactForm.get('contactLastName').value\" calledFrom=\"contact\"></app-upload>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n              </form>\r\n              <div class=\"col-12 p-0\">\r\n\r\n                <!--*ngIf=\"addOrUpdatePermission\"  ---- Kiran - commented on 24 oct 2019-->\r\n                <a href=\"javascript:void(0);\" *ngIf=\"addOrUpdatePermission\" class=\"btn btn-success form-btns\" (click)=\"saveContactForm()\">\r\n                  <i class=\"fa fa-save\"></i> Submit\r\n                </a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger form-btns\" (click)=\"cancelForm()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n<div class=\"col-12\">\r\n  <ng-template #addContact>\r\n    <div class=\"modal-header\">\r\n      <h4 class=\"modal-title\">Add Customer Position</h4>\r\n      <button type=\"button\" class=\"close\" (click)=\"modalRef.hide()\" data-dismiss=\"modal\">&times;</button>\r\n    </div>\r\n    <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px;\">\r\n      <div class=\"row\">\r\n        <div class=\"col-12 col-md-6 col-lg-6\">\r\n          <label>Customer Position:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" [(ngModel)]='masterValue' (keypress)=\"onKeyPress($event)\" />\r\n            <label *ngIf=\"validcontact\" style=\"color:red;\">\r\n              Customer Position is Required\r\n            </label>\r\n\r\n          </div>\r\n      </div>\r\n    </div>\r\n      </div>\r\n    <div class=\"modal-footer\">\r\n      <button type=\"submit\" class=\"btn btn-success form-btns\" data-dismiss=\"modal\" (click)=\"saveContactInMaster()\" aria-label=\"Close\"><i class=\"fa fa-save\"></i> Submit</button>\r\n      <button type=\"submit\" class=\"btn btn-danger form-btns\" data-dismiss=\"modal\" (click)=\"modalRef.hide()\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n    </div>\r\n    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    <!--</div>\r\n      </div>\r\n    </div>-->\r\n  </ng-template>\r\n</div>\r\n\r\n<div class=\"col-12\">\r\n  <ng-template #typeOfCompany>\r\n    <div class=\"modal-header\">\r\n      <h4 class=\"modal-title\">Add Type Of Company</h4>\r\n      <button type=\"button\" class=\"close\" (click)=\"modalRef.hide()\" data-dismiss=\"modal\">&times;</button>\r\n    </div>\r\n    <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px;\">\r\n      <div class=\"row\">\r\n        <div class=\"col-12 col-md-6 col-lg-6\">\r\n          <label>Type of Company:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" [(ngModel)]='addCompany' (keypress)=\"onKeyPress($event)\" />\r\n            <label *ngIf=\"validcontact\" style=\"color:red;\">\r\n              Type of Company is Required\r\n            </label>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button type=\"submit\" class=\"btn btn-success form-btns\" data-dismiss=\"modal\" (click)=\"saveCompanyInMaster()\" aria-label=\"Close\"><i class=\"fa fa-save\"></i> Submit</button>\r\n      <button type=\"submit\" class=\"btn btn-danger form-btns\" data-dismiss=\"modal\" (click)=\"modalRef.hide()\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n    </div>\r\n    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n  </ng-template>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/contact.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/contact.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Manage Customer</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Manage Customer</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>       <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white custom-shadow\">\r\n            <div class=\"col-md-12 border-bottom py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row mx-0 custom-top-padding\">\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-3\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"From\" [(ngModel)]=\"From\" [maxDate]=\"To\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-3\">\r\n                      <div class=\"form-group\">\r\n                        <p-calendar inputStyleClass=\"form-control start-date\" placeholder=\"To\" [(ngModel)]=\"To\" [minDate]=\"From\" [readonlyInput]=\"true\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                      <div class=\"form-group\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search by Business Name/Customer Name\" (keyup)='updateFilter($event)'>\r\n                        <input type=\"button\" class=\"btn src-icon\" (click)=\"search()\" value=\"Search\">\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-3 col-xl-2 mr-auto\">\r\n                      <div class=\"form-group\">\r\n\r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-9 col-xl-12 text-md-left text-lg-right text-xl-left float-right\"\r\n                         *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag'>\r\n                      <a routerLink=\"/contact/addcontact\" class=\"btn btn-success form-btns mb-md-2\"><i class=\"fa fa-plus\"></i> Add Customer</a>\r\n                      <a routerLink=\"/contact/welcomepackage\" class=\"btn btn-secondary form-btns mb-md-2\"><i class=\"fa fa-archive\"></i> Generate Welcome Package</a>\r\n                      <a *ngIf=\"user\" routerLink=\"/customerbulkupload\" class=\"btn btn-dark form-btns mb-md-2\"><i class=\"fa fa-upload\"></i>Customer Bulk Upload</a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n            <div class=\"\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable  #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                    [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"ContactBussinessName\" [sortable]=\"true\" headerClass=\"thead-dark\" *ngIf='modulePermission!==null && modulePermission.roleModuleReadFlag'>\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div *ngIf=\"loginuserid!==row.ContactId\">\r\n                          <a [routerLink]=\"['/contact/edit',row.ContactId]\">{{row.ContactBussinessName }}</a>\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Business Name\" prop=\"ContactBussinessName\" [sortable]=\"true\"\r\n                                          *ngIf='modulePermission!==null && !modulePermission.roleModuleReadFlag'></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Customer Name\" prop=\"Name\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Customer Email\" prop=\"ContactEmail\" [sortable]=\"true\" headerClass=\"thead-dark\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.ContactEmail}}\">\r\n                          {{row.ContactEmail }}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Business Address\" prop=\"ContactBussinessMailAddress\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>\r\n                    <!--<ngx-datatable-column name=\"Created By\" prop=\"ContactCreatedBy\" [sortable]=\"true\" headerClass=\"thead-dark\"></ngx-datatable-column>-->\r\n                    <ngx-datatable-column name=\"Proposal\" prop=\"LeaseCount\" headerClass=\"thead-dark\" *ngIf=\"loginusertype=='usertype03'\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div *ngIf=\"row.LeaseCount===0 &&  moduleLeasePermission!==null && moduleLeasePermission.roleModuleAddFlag\">\r\n                          <a [routerLink]=\"['/lease/addlease']\" [queryParams]=\"{ contactid: row.ContactId}\">Add Proposal</a>\r\n                        </div>\r\n                        <div *ngIf=\"row.LeaseCount>0 &&  moduleLeasePermission!==null && moduleLeasePermission.roleModuleReadFlag\">\r\n                          <a [routerLink]=\"['/lease']\" [queryParams]=\"{ contactid: row.ContactId}\">{{row.LeaseCount }}</a>\r\n                        </div>\r\n                        <div *ngIf=\"row.LeaseCount>0 &&  moduleLeasePermission!==null && !moduleLeasePermission.roleModuleReadFlag\">\r\n                          {{row.LeaseCount }}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/guarantorold/guarantorold.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/guarantorold/guarantorold.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("  <div [formGroup]=\"guarantorForm\" class=\"row\">\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>Guarantor First Name:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorFirstName\" maxlength=\"100\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorFirstName').touched && guarantorForm.get('guarantorFirstName').errors?.required\" class=\"text-danger\">\r\n          Guarantor First Name is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>Guarantor Last Name:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorLastName\" maxlength=\"100\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorLastName').touched && guarantorForm.get('guarantorLastName').errors?.required\" class=\"text-danger\">\r\n          Guarantor Last Name is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>Guarantor Title:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorTitle\" maxlength=\"500\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorTitle').touched && guarantorForm.get('guarantorTitle').errors?.required\" class=\"text-danger\">\r\n          Guarantor Title is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>Ownership%:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorOwnership\" maxlength=\"5\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorOwnership').touched && guarantorForm.get('guarantorOwnership').errors?.required\" class=\"text-danger\">\r\n          Guarantor Ownership is required\r\n        </small>\r\n        <small *ngIf=\"guarantorForm.get('guarantorOwnership').touched && guarantorForm.get('guarantorOwnership').errors?.pattern\"\r\n               class=\"text-danger\">Please enter valid ownership<br /></small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-12 col-lg-12\">\r\n      <label>Guarantor Business Address:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <textarea class=\"form-control\" formControlName=\"guarantorBussinessAddress\" maxlength=\"1000\"></textarea>\r\n        <small *ngIf=\"guarantorForm.get('guarantorBussinessAddress').touched && guarantorForm.get('guarantorBussinessAddress').errors?.required\" class=\"text-danger\">\r\n          Guarantor Bussiness Address is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>City:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorBussinessCity\" maxlength=\"200\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorBussinessCity').touched && guarantorForm.get('guarantorBussinessCity').errors?.required\" class=\"text-danger\">\r\n          Guarantor Bussiness City is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>State:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <ng-select [items]=\"states\"\r\n                   placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"guarantorBussinessState\" [disabled]=\"true\">\r\n        </ng-select>\r\n        <small *ngIf=\"guarantorForm.get('guarantorBussinessState').touched && guarantorForm.get('guarantorBussinessState').errors?.required\" class=\"text-danger\">\r\n          Guarantor Bussiness State is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>Zip:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorBussinessZip\" maxlength=\"50\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorBussinessZip').touched && guarantorForm.get('guarantorBussinessZip').errors?.required\" class=\"text-danger\">\r\n          Guarantor Bussiness Zip is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>County:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorBussinessCounty\" maxlength=\"200\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorBussinessCounty').touched && guarantorForm.get('guarantorBussinessCounty').errors?.required\" class=\"text-danger\">\r\n          Guarantor Bussiness County is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-12 col-lg-12\">\r\n      <label>Guarantor Home Address:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <textarea class=\"form-control\" formControlName=\"guarantorHomeAddress\" maxlength=\"1000\"></textarea>\r\n        <small *ngIf=\"guarantorForm.get('guarantorHomeAddress').touched && guarantorForm.get('guarantorHomeAddress').errors?.required\" class=\"text-danger\">\r\n          Guarantor Home Address is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>City:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorHomeCity\" maxlength=\"200\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorHomeCity').touched && guarantorForm.get('guarantorHomeCity').errors?.required\" class=\"text-danger\">\r\n          Guarantor Home City is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>State:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <ng-select [items]=\"states\"\r\n                   placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"guarantorHomeState\">\r\n        </ng-select>\r\n        <small *ngIf=\"guarantorForm.get('guarantorHomeState').touched && guarantorForm.get('guarantorHomeState').errors?.required\" class=\"text-danger\">\r\n          Guarantor Home State is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>Zip:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorHomeZip\" maxlength=\"50\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorHomeZip').touched && guarantorForm.get('guarantorHomeZip').errors?.required\" class=\"text-danger\">\r\n          Guarantor Home Zip is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>County:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorHomeCounty\" maxlength=\"200\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorHomeCounty').touched && guarantorForm.get('guarantorHomeCounty').errors?.required\" class=\"text-danger\">\r\n          Guarantor Home County is required\r\n        </small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>Guarantor Phone:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorPhone\" maxlength=\"100\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorPhone').touched && guarantorForm.get('guarantorPhone').errors?.required\" class=\"text-danger\">\r\n          Guarantor Home Phone is required\r\n        </small>\r\n        <small *ngIf=\"guarantorForm.get('guarantorPhone').touched && guarantorForm.get('guarantorPhone').errors?.pattern\"\r\n               class=\"text-danger\">Please enter valid phone<br /></small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>Guarantor Email:<span class=\"text-danger\">*</span></label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorEmail\" maxlength=\"200\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorEmail').touched && guarantorForm.get('guarantorEmail').errors?.required\" class=\"text-danger\">\r\n          Guarantor Home Email is required\r\n        </small>\r\n        <small *ngIf=\"guarantorForm.get('guarantorEmail').touched && guarantorForm.get('guarantorEmail').errors?.email\" class=\"text-danger\">Please enter valid Email</small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>Social Security#:</label>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" formControlName=\"guarantorSocialNumber\" maxlength=\"100\">\r\n        <small *ngIf=\"guarantorForm.get('guarantorSocialNumber').touched && guarantorForm.get('guarantorSocialNumber').errors?.pattern\"\r\n               class=\"text-danger\">Please enter valid number<br /></small>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 col-md-6 col-lg-4\">\r\n      <label>Date of Birth:</label>\r\n      <div class=\"form-group\">\r\n        <p-calendar inputStyleClass=\"form-control start-date\" formControlName=\"guarantorFormattedDateOfBirth\" placeholder=\"Select Date of Birth\" [showTime]=\"false\"\r\n                    dateFormat=\"dd/mm/yy\"></p-calendar>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/insurance/insurance.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/insurance/insurance.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div [formGroup]=\"insuranceForm\" class=\"row\">\r\n  <div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Insurance Company Name:</label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"name\" maxlength=\"200\" [ngClass]=\"{'is-invalid': (name.invalid && (name.dirty || name.touched) && (name.errors?.required || name.errors?.maxlength)) }\">\r\n      <small *ngIf=\"insuranceForm.get('name').touched && insuranceForm.get('name').errors?.required\" class=\"text-danger\">\r\n        Insurance Company Name is required\r\n      </small>\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n  <div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Insurance Phone:</label>\r\n    <div class=\"form-group\">\r\n      <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"phone\" placeholder=\"(___) ___-____\">\r\n      </p-inputMask>\r\n    </div>\r\n  </div>\r\n\r\n  <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Insurance Phone:</label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"phone\" maxlength=\"100\" [ngClass]=\"{'is-invalid': (phone.invalid && (phone.dirty || phone.touched) && (phone.errors?.required || phone.errors?.maxlength)) }\">\r\n      <small *ngIf=\"insuranceForm.get('phone').touched && insuranceForm.get('phone').errors?.required\" class=\"text-danger\">\r\n        Insurance Phone is required\r\n      </small>\r\n      <small *ngIf=\"insuranceForm.get('phone').touched && insuranceForm.get('phone').errors?.pattern\"\r\n             class=\"text-danger\">Please enter valid phone<br /></small>\r\n    </div>\r\n  </div>-->\r\n\r\n  <div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Insurance Agent Name:</label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"agentName\" maxlength=\"200\" [ngClass]=\"{'is-invalid': (agentName.invalid && (agentName.dirty || agentName.touched) && (agentName.errors?.required || agentName.errors?.maxlength)) }\">\r\n      <small *ngIf=\"insuranceForm.get('agentName').touched && insuranceForm.get('agentName').errors?.required\" class=\"text-danger\">\r\n        Insurance Agent Name is required\r\n      </small>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Insurance Agent Email:</label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"agentEmail\" maxlength=\"200\" [ngClass]=\"{'is-invalid': (agentEmail.invalid && (agentEmail.dirty || agentName.touched) && (agentEmail.errors?.required || agentEmail.errors?.maxlength)) }\">\r\n      <small *ngIf=\"insuranceForm.get('agentEmail').touched && insuranceForm.get('agentEmail').errors?.required\" class=\"text-danger\">\r\n        Insurance Agent Email is required\r\n      </small>\r\n      <small *ngIf=\"insuranceForm.get('agentEmail').touched && insuranceForm.get('agentEmail').errors?.email\" class=\"text-danger\">Please enter valid Email</small>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col-12 col-md-12 col-lg-12\">\r\n    <label class=\"m-label-s\">Insurance Address:</label>\r\n    <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n  </div>\r\n\r\n  <div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Address</label>\r\n    <div class=\"form-group\">\r\n      <textarea class=\"form-control\" formControlName=\"address\" [ngClass]=\"{'is-invalid': (address.invalid && (address.dirty || address.touched) && (address.errors?.required || address.errors?.maxlength)) }\"></textarea>\r\n      <small *ngIf=\"insuranceForm.get('address').touched && insuranceForm.get('address').errors?.required\" class=\"text-danger\">\r\n        Insurance Address is required\r\n      </small>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>City:</label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"city\" maxlength=\"200\" [ngClass]=\"{'is-invalid': (city.invalid && (city.dirty || city.touched) && (city.errors?.required || city.errors?.maxlength)) }\">\r\n      <small *ngIf=\"insuranceForm.get('city').touched && insuranceForm.get('city').errors?.required\" class=\"text-danger\">\r\n        City is required\r\n      </small>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Insurance Agent County:</label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"county\" maxlength=\"100\" [ngClass]=\"{'is-invalid': (county.invalid && (county.dirty || agentName.touched) && (county.errors?.required || county.errors?.maxlength)) }\">\r\n      <small *ngIf=\"insuranceForm.get('county').touched && insuranceForm.get('county').errors?.required\" class=\"text-danger\">\r\n        Insurance Agent County is required\r\n      </small>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>State:</label>\r\n    <div class=\"form-group\">\r\n      <ng-select [items]=\"states\"\r\n                 placeholder=\"Select State\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"state\" [ngClass]=\"{'is-invalid': (state.invalid && (state.dirty || state.touched) && (state.errors?.required || state.errors?.maxlength)) }\">\r\n      </ng-select>\r\n      <small *ngIf=\"insuranceForm.get('state').touched && insuranceForm.get('state').errors?.required\" class=\"text-danger\">\r\n        State is required\r\n      </small>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Zip:</label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"zipCode\" [ngClass]=\"{'is-invalid': (zipCode.invalid && (zipCode.dirty || zipCode.touched) && (zipCode.errors?.required || zipCode.errors?.maxlength)) }\">\r\n      <small *ngIf=\"insuranceForm.get('zipCode').touched && insuranceForm.get('zipCode').errors?.required\" class=\"text-danger\">\r\n        Zip is required\r\n      </small>\r\n      <small *ngIf=\"zipCode.invalid && (zipCode.dirty || zipCode.touched) && zipCode.errors?.maxlength\"\r\n             class=\"text-danger\">Zip can not be greater than 5 characters.</small>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-12 col-md-12 col-lg-12\">\r\n    <div class=\"alert alert-info mt-2\">Insurance Company Name and Insurance Agent Email are required to fill if you enter insurance address details</div>\r\n  </div>\r\n\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/contact/addeditcontact.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/views/contact/addeditcontact.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbnRhY3QvYWRkZWRpdGNvbnRhY3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/contact/addeditcontact.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/contact/addeditcontact.component.ts ***!
  \***********************************************************/
/*! exports provided: AddeditcontactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditcontactComponent", function() { return AddeditcontactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _contact_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact.service */ "./src/app/views/contact/contact.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/custom-validation/equal-validator */ "./src/app/views/shared/custom-validation/equal-validator.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _master_master_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../master/master.service */ "./src/app/views/master/master.service.ts");
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










var AddeditcontactComponent = /** @class */ (function () {
    function AddeditcontactComponent(_fb, modalService, masterService, commonService, contactService, route, dialogService, router, toaster) {
        this._fb = _fb;
        this.modalService = modalService;
        this.masterService = masterService;
        this.commonService = commonService;
        this.contactService = contactService;
        this.route = route;
        this.dialogService = dialogService;
        this.router = router;
        this.toaster = toaster;
        this.loadSave = false;
        this.isLoading = false;
        this.guarantorGroup = [];
        this.disabled = null;
        this.isLeaseCreated = false;
        this.companyName = null;
        this.contactPos = null;
        this.master = new _master_master_service__WEBPACK_IMPORTED_MODULE_9__["tblMasterModel"]();
        this.validcontact = false;
        this.loadDropDowns();
        this.loadStateDropdown();
        this.addOrUpdatePermission = false;
        this.addPermission = false;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        if (this.modulePermission != null)
            this.addPermission = this.modulePermission.roleModuleAddFlag;
    }
    AddeditcontactComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageTitle = 'Add Customer';
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.fillContactForm(id);
            }
            else {
                _this.pageTitle = 'Add Customer';
                _this.addOrUpdatePermission = _this.modulePermission.roleModuleAddFlag;
            }
        });
        this.contactForm = this._fb.group({
            contactId: [null],
            contactBussinessName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            contactBussinessMailAddress: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactMailAddressCity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactMailAddressState: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactMailAddressZip: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
            contactMailAddressCounty: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactBussinessPhysicalAddress: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactPhysicalAddressCity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactPhysicalAddressState: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactPhysicalAddressZip: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
            contactBussinessPhone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            bussinessPhone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactBussinessTIN: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactTypeOfCompany: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactFirstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactLastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contactEmail: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            contactPosition: [null],
            contactSocialSecurityNumber: [''],
            contactPreferredDocumentSignedBy: 'DocuSign',
            contactPhysicalAddressCounty: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            isLeaseCreated: [false],
            // Contact Business Information
            contactBankId: [null],
            //contactBankName: ['', Validators.required],
            //contactBankAddress: ['', Validators.required],
            //contactBankRoutingNumber: ['', Validators.required],
            //contactBankAccountNum: ['', Validators.required],
            contactBankName: [''],
            contactBankAddress: [''],
            contactBankRoutingNumber: [''],
            contactBankAccountNum: [''],
            contactBankCity: [''],
            contactBankState: [null],
            contactBankCounty: [''],
            contactBankZipcode: [''],
            // Gurantors
            guarantors: this._fb.array([
                this.initGuarantor(),
            ]),
            insurances: this._fb.array([
                this.initInsurance(),
            ])
        });
        //alert(this.isLeaseCreated);
        //if (this.isLeaseCreated == true) {
        // // alert("hi")
        //  this.contactTypeOfCompany.disable();
        //}
        // alert("hi2222")
    };
    AddeditcontactComponent.prototype.fillContactForm = function (id) {
        var _this = this;
        this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        this.contactService.getContactDetails(id).subscribe(function (res) {
            _this.pageTitle = 'Edit Customer: ' + res.contactDetails[0].contactBussinessName;
            _this.isLeaseCreated = res.contactDetails[0].isLeaseCreated;
            _this.duplicateContactTypeOfCompany = res.contactDetails[0].contactTypeOfCompany;
            if (_this.isLeaseCreated == true) {
                // alert("hi")
                _this.contactTypeOfCompany.disable();
            }
            if (res.contactBankInfo[0] != null) {
                _this.BankId = res.contactBankInfo[0].contactBankId,
                    _this.BankName = res.contactBankInfo[0].contactBankName,
                    _this.BankAddress = res.contactBankInfo[0].contactBankAddress,
                    _this.BankRoutingNumber = res.contactBankInfo[0].contactBankRoutingNumber,
                    _this.BankAccountNum = res.contactBankInfo[0].contactBankAccountNum,
                    _this.BankCity = res.contactBankInfo[0].contactBankCity,
                    _this.BankState = res.contactBankInfo[0].contactBankState,
                    _this.BankCounty = res.contactBankInfo[0].contactBankCounty,
                    _this.BankZipcode = res.contactBankInfo[0].contactBankZipcode;
            }
            _this.loadSave = false;
            _this.contactForm.patchValue({
                contactId: res.contactDetails[0].contactId,
                contactSocialSecurityNumber: res.contactDetails[0].contactSocialSecurityNumber,
                contactBussinessName: res.contactDetails[0].contactBussinessName,
                contactBussinessMailAddress: res.contactDetails[0].contactBussinessMailAddress,
                contactMailAddressCity: res.contactDetails[0].contactMailAddressCity,
                contactMailAddressState: res.contactDetails[0].contactMailAddressState,
                contactMailAddressZip: res.contactDetails[0].contactMailAddressZip,
                contactMailAddressCounty: res.contactDetails[0].contactMailAddressCounty,
                contactBussinessPhysicalAddress: res.contactDetails[0].contactBussinessPhysicalAddress,
                contactPhysicalAddressCity: res.contactDetails[0].contactPhysicalAddressCity,
                contactPhysicalAddressState: res.contactDetails[0].contactPhysicalAddressState,
                contactPhysicalAddressZip: res.contactDetails[0].contactPhysicalAddressZip,
                contactBussinessPhone: res.contactDetails[0].contactBussinessPhone,
                bussinessPhone: res.contactDetails[0].bussinessPhone,
                contactBussinessTIN: res.contactDetails[0].contactBussinessTIN,
                contactTypeOfCompany: res.contactDetails[0].contactTypeOfCompany,
                contactFirstName: res.contactDetails[0].contactFirstName,
                contactLastName: res.contactDetails[0].contactLastName,
                contactEmail: res.contactDetails[0].contactEmail,
                contactPosition: res.contactDetails[0].contactPosition,
                contactCreatedOn: res.contactDetails[0].contactCreatedOn,
                contactPreferredDocumentSignedBy: res.contactDetails[0].contactPreferredDocumentSignedBy,
                contactPhysicalAddressCounty: res.contactDetails[0].contactPhysicalAddressCounty,
                // Contact Bank Information
                contactBankId: _this.BankId,
                contactBankName: _this.BankName,
                contactBankAddress: _this.BankAddress,
                contactBankRoutingNumber: _this.BankRoutingNumber,
                contactBankAccountNum: _this.BankAccountNum,
                contactBankCity: _this.BankCity,
                contactBankCounty: _this.BankCity,
                contactBankState: _this.BankState,
                contactBankZipcode: _this.BankZipcode,
                // Insurance
                insurances: res.insuranceDetails,
            });
            _this.contactCreatedOn = res.contactDetails[0].contactCreatedOn;
            _this.buissnessName = res.contactDetails[0].contactBussinessName;
            _this.firstName = res.contactDetails[0].contactBussinessName;
            _this.lastName = res.contactDetails[0].contactLastName;
            //this.isLeaseCreated = res.contactDetails[0].isLeaseCreated,
            //this.duplicateContactTypeOfCompany = res.contactDetails[0].contactTypeOfCompany,
            res.guarantors.forEach(function (m) {
                _this.guarantors.push(_this.initdisplayGuarantor(m));
            });
            _this.guarantors.removeAt(0);
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditcontactComponent.prototype.initGuarantor = function () {
        // initialize our guarantor
        return this._fb.group({
            guarantorID: [null],
            guarantorFirstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorLastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorTitle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorOwnership: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorBussinessAddress: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            guarantorBussinessCity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            guarantorBussinessState: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            guarantorBussinessZip: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            guarantorBussinessCounty: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            guarantorHomeAddress: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorHomeCity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorHomeState: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorHomeZip: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
            guarantorHomeCounty: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorPhone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorEmail: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            guarantorSocialNumber: [''],
            guarantorFormattedDateOfBirth: [null],
        }, {
            validator: _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_7__["EqualValidator"].percentage('guarantorOwnership')
        });
    };
    AddeditcontactComponent.prototype.initdisplayGuarantor = function (gurantor) {
        return this._fb.group({
            guarantorID: [gurantor.guarantorID],
            guarantorFirstName: [gurantor.guarantorFirstName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorLastName: [gurantor.guarantorLastName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorTitle: [gurantor.guarantorTitle, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorOwnership: [gurantor.guarantorOwnership, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorBussinessAddress: [gurantor.guarantorBussinessAddress, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            guarantorBussinessCity: [gurantor.guarantorBussinessCity, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            guarantorBussinessState: [gurantor.guarantorBussinessState, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            guarantorBussinessZip: [gurantor.guarantorBussinessZip, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            guarantorBussinessCounty: [gurantor.guarantorBussinessCounty, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            guarantorHomeAddress: [gurantor.guarantorHomeAddress, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorHomeCity: [gurantor.guarantorHomeCity, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorHomeState: [gurantor.guarantorHomeState, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorHomeZip: [gurantor.guarantorHomeZip, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorHomeCounty: [gurantor.guarantorHomeCounty, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorPhone: [gurantor.guarantorPhone, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            guarantorEmail: [gurantor.guarantorEmail, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            guarantorSocialNumber: [gurantor.guarantorSocialNumber],
            guarantorFormattedDateOfBirth: [gurantor.guarantorFormattedDateOfBirth],
        }, {
            validator: _shared_custom_validation_equal_validator__WEBPACK_IMPORTED_MODULE_7__["EqualValidator"].percentage('guarantorOwnership')
        });
    };
    AddeditcontactComponent.prototype.initInsurance = function () {
        return this._fb.group({
            insuranceId: [null],
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            address: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            city: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            state: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            zipCode: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            agentName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            agentEmail: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            county: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
        });
    };
    AddeditcontactComponent.prototype.addGuarantor = function () {
        // add guarantor to the list
        var control = this.contactForm.controls['guarantors'];
        control.push(this.initGuarantor());
    };
    AddeditcontactComponent.prototype.removeGuarantor = function (i, id) {
        var _this = this;
        // remove guarantor from the list
        if (id != null) {
            var message = "Are you sure you want to delete guarantor.?";
            this.dialogService.confirm('Delete Guarantor', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.contactService.deleteGuarantor(id).subscribe(function (res) {
                        if (res) {
                            var control = _this.contactForm.controls['guarantors'];
                            control.removeAt(i);
                        }
                    });
                }
            });
        }
        else {
            var control = this.contactForm.controls['guarantors'];
            control.removeAt(i);
        }
    };
    AddeditcontactComponent.prototype.toggleEditable = function (event) {
        if (event.target.checked) {
            this.contactBussinessPhysicalAddress.setValue(this.contactBussinessMailAddress.value);
            this.contactPhysicalAddressCounty.setValue(this.contactMailAddressCounty.value);
            this.contactPhysicalAddressZip.setValue(this.contactMailAddressZip.value);
            this.contactPhysicalAddressCity.setValue(this.contactMailAddressCity.value);
            this.contactPhysicalAddressState.setValue(this.contactMailAddressState.value);
            this.contactPhysicalAddressCounty.updateValueAndValidity();
            this.contactBussinessPhysicalAddress.updateValueAndValidity();
            this.contactPhysicalAddressZip.updateValueAndValidity();
            this.contactPhysicalAddressCity.updateValueAndValidity();
            this.contactPhysicalAddressState.updateValueAndValidity();
        }
        else {
            this.contactPhysicalAddressCounty.setValue('');
            this.contactBussinessPhysicalAddress.setValue('');
            this.contactPhysicalAddressZip.setValue('');
            this.contactPhysicalAddressCity.setValue('');
            this.contactPhysicalAddressState.setValue(null);
            this.contactPhysicalAddressCounty.updateValueAndValidity();
            this.contactBussinessPhysicalAddress.updateValueAndValidity();
            this.contactPhysicalAddressZip.updateValueAndValidity();
            this.contactPhysicalAddressCity.updateValueAndValidity();
            this.contactPhysicalAddressState.updateValueAndValidity();
        }
    };
    AddeditcontactComponent.prototype.loadDropDowns = function () {
        var _this = this;
        this.isLoading = true;
        this.commonService.getMasterItemsList("BussinessContactPosition,CompanyType").subscribe(function (result) {
            _this.lstcontactPosition = _this.commonService.masters.filter(function (x) { return x.masterName == "BussinessContactPosition"; });
            _this.lstcompanyType = _this.commonService.masters.filter(function (x) { return x.masterName == "CompanyType"; });
            if (_this.companyName !== null) {
                var company = _this.lstcompanyType.find(function (m) { return m.text === _this.companyName; });
                if (company) {
                    _this.contactTypeOfCompany.setValue(company.value);
                }
            }
            if (_this.contactPos !== null) {
                var contact = _this.lstcontactPosition.find(function (m) { return m.text === _this.contactPos; });
                if (contact) {
                    _this.contactPosition.setValue(contact.value);
                }
            }
            _this.isLoading = false;
        });
    };
    AddeditcontactComponent.prototype.loadStateDropdown = function () {
        var _this = this;
        this.commonService.getStatesList().subscribe(function (res) {
            _this.lstStates = _this.commonService.states;
        });
    };
    AddeditcontactComponent.prototype.checkValidation = function () {
        var elms1 = document.getElementById('collapseOne').querySelectorAll("input");
        for (var i = 0; i < elms1.length; i++) {
            if (elms1[i].className.indexOf("is-invalid") >= 0) {
                elms1[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
                if (document.getElementById("firstAccordianAnch").className === 'collapsed') {
                    document.getElementById("firstAccordianAnch").click();
                    setTimeout(function () {
                        var element = document.getElementById("firstAccordianAnch");
                        element.classList.remove("collapsed");
                    }, 200);
                    break;
                }
            }
        }
        var elms2 = document.getElementById('collapseTwo').querySelectorAll("input");
        for (var i = 0; i < elms2.length; i++) {
            if (elms2[i].className.indexOf("is-invalid") >= 0) {
                elms2[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
                if (document.getElementById("secondAccordianAnch").className === 'collapsed') {
                    document.getElementById("secondAccordianAnch").click();
                    break;
                }
            }
        }
        var elms3 = document.getElementById('collapseThree').querySelectorAll("input");
        for (var i = 0; i < elms3.length; i++) {
            if (elms3[i].className.indexOf("is-invalid") >= 0) {
                elms3[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
                if (document.getElementById("thirdAccordianAnch").className === 'collapsed') {
                    document.getElementById("thirdAccordianAnch").click();
                    break;
                }
            }
        }
        var elms1 = document.getElementById('collapseSix').querySelectorAll("input");
        for (var i = 0; i < elms1.length; i++) {
            if (elms1[i].className.indexOf("is-invalid") >= 0) {
                elms1[i].scrollIntoView({ behavior: 'smooth', block: "end", inline: "end" });
                if (document.getElementById("sixAccordianAnch").className === 'collapsed') {
                    document.getElementById("sixAccordianAnch").click();
                    setTimeout(function () {
                        var element = document.getElementById("sixAccordianAnch");
                        element.classList.remove("collapsed");
                    }, 200);
                    break;
                }
            }
        }
    };
    AddeditcontactComponent.prototype.saveContactForm = function () {
        var _this = this;
        if (this.contactForm.valid) {
            if (this.contactForm.value.insurances[0].agentName != '' || this.contactForm.value.insurances[0].phone != ''
                || this.contactForm.value.insurances[0].address != '' || this.contactForm.value.insurances[0].city != ''
                || this.contactForm.value.insurances[0].county != '' || this.contactForm.value.insurances[0].state != null
                || this.contactForm.value.insurances[0].zipCode != '') {
                /// alert('error')
                if (this.contactForm.value.insurances[0].name == '') {
                    this.toaster.error("Please Enter Insurance Company name");
                    return false;
                }
                else if (this.contactForm.value.insurances[0].agentEmail == '') {
                    this.toaster.error("Please Enter Insurance Agent Email");
                    return false;
                }
            }
            if (this.contactForm.value.insurances[0].name == '' && this.contactForm.value.insurances[0].agentEmail != '') {
                this.toaster.error("Please Enter Insurance Company name");
                return false;
            }
            else if (this.contactForm.value.insurances[0].name != '' && this.contactForm.value.insurances[0].agentEmail == '') {
                this.toaster.error("Please Enter Insurance Agent Email");
                return false;
            }
            if (this.contactForm.value.contactTypeOfCompany == null) {
                //alert(this.duplicateContactTypeOfCompany);
                this.contactForm.value.contactTypeOfCompany = this.duplicateContactTypeOfCompany;
                //alert(this.contactForm.value.contactTypeOfCompany)
            }
            this.contactService.saveContactForm(this.contactForm.value).subscribe(function (res) {
                if (res.statusCode == 200) {
                    _this.toaster.success(res.responseMessage);
                    _this.router.navigateByUrl("/contact");
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(res.responseMessage);
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.contactForm, false);
            setTimeout(function () { _this.checkValidation(); }, 500);
        }
    };
    AddeditcontactComponent.prototype.saveContactInMaster = function () {
        var _this = this;
        if (this.masterValue != '') {
            this.loadSave = true;
            this.master.masterNameId = "0DDD9CDA-CDE7-4466-A113-5770E39D203D";
            this.master.masterKey = "~positionnum~";
            this.master.masterValue = this.masterValue;
            this.master.masterStatusId = "";
            this.contactPos = this.masterValue;
            this.master.masterIsDeleted = false;
            this.master.masterDescription = this.masterValue;
            this.masterService.AddManageMaster(this.master).subscribe(function (result) {
                if (result.statusCode == 201) {
                    _this.toaster.error("Duplicate Customer Position");
                    _this.loadSave = false;
                }
                else if (result.statusCode == 200) {
                    _this.loadDropDowns();
                    _this.toaster.success("Customer Position has been added successfully");
                    setTimeout(function () { _this.loadSave = false; }, 1000);
                    _this.modalRef.hide();
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
            this.validcontact = true;
        }
    };
    AddeditcontactComponent.prototype.onKeyPress = function (event) {
        this.validcontact = false;
    };
    AddeditcontactComponent.prototype.saveCompanyInMaster = function () {
        var _this = this;
        if (this.addCompany != '') {
            this.loadSave = true;
            this.master.masterNameId = "6883630C-493B-49B0-AC0F-295B2875AFFD";
            this.master.masterKey = "~companytypenum~";
            this.master.masterValue = this.addCompany;
            this.companyName = this.addCompany;
            this.master.masterStatusId = "";
            this.master.masterIsDeleted = false;
            this.master.masterDescription = this.addCompany;
            this.masterService.AddManageMaster(this.master).subscribe(function (result) {
                if (result.statusCode == 201) {
                    _this.toaster.error("Duplicate Type of Company");
                    _this.loadSave = false;
                }
                else if (result.statusCode == 200) {
                    _this.loadDropDowns();
                    _this.toaster.success("Type of company has been added successfully");
                    setTimeout(function () { _this.loadSave = false; }, 1000);
                    _this.modalRef.hide();
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
            this.validcontact = true;
        }
    };
    AddeditcontactComponent.prototype.cancelForm = function () {
        this.router.navigateByUrl("/contact");
    };
    Object.defineProperty(AddeditcontactComponent.prototype, "guarantors", {
        get: function () {
            return this.contactForm.get('guarantors');
        },
        enumerable: true,
        configurable: true
    });
    AddeditcontactComponent.prototype.addContactPosition = function (template) {
        this.masterValue = "";
        this.validcontact = false;
        this.modalRef = this.modalService.show(template);
    };
    AddeditcontactComponent.prototype.addTypeOfComp = function (template) {
        this.addCompany = "";
        this.validcontact = false;
        this.modalRef = this.modalService.show(template);
    };
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBussinessName", {
        get: function () { return this.contactForm.get('contactBussinessName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBussinessTIN", {
        get: function () { return this.contactForm.get('contactBussinessTIN'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactTypeOfCompany", {
        get: function () { return this.contactForm.get('contactTypeOfCompany'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactPosition", {
        get: function () { return this.contactForm.get('contactPosition'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBussinessMailAddress", {
        get: function () { return this.contactForm.get('contactBussinessMailAddress'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactMailAddressCity", {
        get: function () { return this.contactForm.get('contactMailAddressCity'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactMailAddressState", {
        get: function () { return this.contactForm.get('contactMailAddressState'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactMailAddressZip", {
        get: function () { return this.contactForm.get('contactMailAddressZip'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactMailAddressCounty", {
        get: function () { return this.contactForm.get('contactMailAddressCounty'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBussinessPhysicalAddress", {
        get: function () { return this.contactForm.get('contactBussinessPhysicalAddress'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactPhysicalAddressCity", {
        get: function () { return this.contactForm.get('contactPhysicalAddressCity'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactPhysicalAddressState", {
        get: function () { return this.contactForm.get('contactPhysicalAddressState'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactPhysicalAddressZip", {
        get: function () { return this.contactForm.get('contactPhysicalAddressZip'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactPhysicalAddressCounty", {
        get: function () { return this.contactForm.get('contactPhysicalAddressCounty'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBussinessPhone", {
        get: function () { return this.contactForm.get('contactBussinessPhone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "bussinessPhone", {
        get: function () { return this.contactForm.get('bussinessPhone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactFirstName", {
        get: function () { return this.contactForm.get('contactFirstName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactLastName", {
        get: function () { return this.contactForm.get('contactLastName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactEmail", {
        get: function () { return this.contactForm.get('contactEmail'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactSocialSecurityNumber", {
        get: function () { return this.contactForm.get('contactSocialSecurityNumber'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBankName", {
        // Contact Bank Information
        get: function () { return this.contactForm.get('contactBankName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBankAddress", {
        get: function () { return this.contactForm.get('contactBankAddress'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBankRoutingNumber", {
        get: function () { return this.contactForm.get('contactBankRoutingNumber'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBankAccountNum", {
        get: function () { return this.contactForm.get('contactBankAccountNum'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBankCity", {
        get: function () { return this.contactForm.get('contactBankCity'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBankCounty", {
        get: function () { return this.contactForm.get('contactBankCounty'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBankState", {
        get: function () { return this.contactForm.get('contactBankState'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcontactComponent.prototype, "contactBankZipcode", {
        get: function () { return this.contactForm.get('contactBankZipcode'); },
        enumerable: true,
        configurable: true
    });
    AddeditcontactComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["BsModalService"] },
        { type: _master_master_service__WEBPACK_IMPORTED_MODULE_9__["MasterService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _contact_service__WEBPACK_IMPORTED_MODULE_3__["ContactService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] }
    ]; };
    AddeditcontactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditcontact',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditcontact.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/addeditcontact.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditcontact.component.scss */ "./src/app/views/contact/addeditcontact.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["BsModalService"],
            _master_master_service__WEBPACK_IMPORTED_MODULE_9__["MasterService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _contact_service__WEBPACK_IMPORTED_MODULE_3__["ContactService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"]])
    ], AddeditcontactComponent);
    return AddeditcontactComponent;
}());



/***/ }),

/***/ "./src/app/views/contact/contact-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/contact/contact-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ContactRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactRoutingModule", function() { return ContactRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _contact_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contact.component */ "./src/app/views/contact/contact.component.ts");
/* harmony import */ var _addeditcontact_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditcontact.component */ "./src/app/views/contact/addeditcontact.component.ts");
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
    { path: '', component: _contact_component__WEBPACK_IMPORTED_MODULE_2__["ContactComponent"] },
    { path: 'addcontact', component: _addeditcontact_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcontactComponent"] },
    { path: 'edit/:id', component: _addeditcontact_component__WEBPACK_IMPORTED_MODULE_3__["AddeditcontactComponent"] }
];
var ContactRoutingModule = /** @class */ (function () {
    function ContactRoutingModule() {
    }
    ContactRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ContactRoutingModule);
    return ContactRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/contact/contact.component.scss":
/*!******************************************************!*\
  !*** ./src/app/views/contact/contact.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbnRhY3QvY29udGFjdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/contact/contact.component.ts":
/*!****************************************************!*\
  !*** ./src/app/views/contact/contact.component.ts ***!
  \****************************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _contact_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact.service */ "./src/app/views/contact/contact.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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





var ContactComponent = /** @class */ (function () {
    function ContactComponent(contactService, commonService, activeRoute) {
        var _this = this;
        this.contactService = contactService;
        this.commonService = commonService;
        this.activeRoute = activeRoute;
        this.loading = false;
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.isDashBoard = false;
        this.user = false;
        this.loadSave = false;
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.permission = this.modulePermission.roleModuleReadFlag;
        this.moduleLeasePermission = this.commonService.getPermission(1020);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.loginusertype = userdetail.userType;
            if (userdetail.userType == 'usertype01' || userdetail.userType == 'usertype06') {
                _this.user = true;
            }
        });
    }
    ContactComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.getContactList();
        this.refresh();
    };
    ContactComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    ContactComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ContactComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.contactService.getContactList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.contactService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ContactComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.contactService.getContactList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.contactService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ContactComponent.prototype.reset = function () {
        var _this = this;
        this.table.sorts = [];
        this.From = null;
        this.To = null;
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'asc';
        this.sortColumn = 'ContactBussinessName';
        this.pageSizeValue = 10;
        this.contactService.getContactList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, 10, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.contactService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ContactComponent.prototype.getContactList = function () {
        var _this = this;
        this.loading = true;
        this.contactService.getContactList(this.name, this.From, this.To, this.sortColumn, this.sortDir, 0, 10, this.loginuserid, this.isDashBoard).subscribe(function (result) {
            _this.loading = false;
            if (result) {
                _this.ContactList = result;
            }
        });
    };
    ContactComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.contactService.getContactList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.contactService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ContactComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.contactService.getContactList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.contactService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ContactComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.contactService.getContactList('', this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(function (response) {
            _this.pagedData = _this.contactService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ContactComponent.ctorParameters = function () { return [
        { type: _contact_service__WEBPACK_IMPORTED_MODULE_1__["ContactService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_3__["DatatableComponent"])
    ], ContactComponent.prototype, "table", void 0);
    ContactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contact',
            template: __importDefault(__webpack_require__(/*! raw-loader!./contact.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/contact.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./contact.component.scss */ "./src/app/views/contact/contact.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_contact_service__WEBPACK_IMPORTED_MODULE_1__["ContactService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "./src/app/views/contact/contact.module.ts":
/*!*************************************************!*\
  !*** ./src/app/views/contact/contact.module.ts ***!
  \*************************************************/
/*! exports provided: ContactModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactModule", function() { return ContactModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _contact_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact-routing.module */ "./src/app/views/contact/contact-routing.module.ts");
/* harmony import */ var _addeditcontact_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addeditcontact.component */ "./src/app/views/contact/addeditcontact.component.ts");
/* harmony import */ var _contact_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contact.component */ "./src/app/views/contact/contact.component.ts");
/* harmony import */ var _insurance_insurance_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./insurance/insurance.component */ "./src/app/views/contact/insurance/insurance.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _guarantorold_guarantorold_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./guarantorold/guarantorold.component */ "./src/app/views/contact/guarantorold/guarantorold.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









var ContactModule = /** @class */ (function () {
    function ContactModule() {
    }
    ContactModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _addeditcontact_component__WEBPACK_IMPORTED_MODULE_4__["AddeditcontactComponent"],
                _contact_component__WEBPACK_IMPORTED_MODULE_5__["ContactComponent"],
                _insurance_insurance_component__WEBPACK_IMPORTED_MODULE_6__["InsuranceComponent"], _guarantorold_guarantorold_component__WEBPACK_IMPORTED_MODULE_8__["GuarantoroldComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _contact_routing_module__WEBPACK_IMPORTED_MODULE_3__["ContactRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"]
            ],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], ContactModule);
    return ContactModule;
}());



/***/ }),

/***/ "./src/app/views/contact/guarantorold/guarantorold.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/views/contact/guarantorold/guarantorold.component.ts ***!
  \**********************************************************************/
/*! exports provided: GuarantoroldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuarantoroldComponent", function() { return GuarantoroldComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
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


var GuarantoroldComponent = /** @class */ (function () {
    function GuarantoroldComponent() {
    }
    GuarantoroldComponent.prototype.ngOnInit = function () {
        this.maxDate = new Date();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('group'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], GuarantoroldComponent.prototype, "guarantorForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('states'),
        __metadata("design:type", Object)
    ], GuarantoroldComponent.prototype, "states", void 0);
    GuarantoroldComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'guarantorold',
            template: __importDefault(__webpack_require__(/*! raw-loader!./guarantorold.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/guarantorold/guarantorold.component.html")).default,
        }),
        __metadata("design:paramtypes", [])
    ], GuarantoroldComponent);
    return GuarantoroldComponent;
}());



/***/ }),

/***/ "./src/app/views/contact/insurance/insurance.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/views/contact/insurance/insurance.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NvbnRhY3QvaW5zdXJhbmNlL2luc3VyYW5jZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/contact/insurance/insurance.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/contact/insurance/insurance.component.ts ***!
  \****************************************************************/
/*! exports provided: InsuranceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceComponent", function() { return InsuranceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
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


var InsuranceComponent = /** @class */ (function () {
    function InsuranceComponent() {
    }
    InsuranceComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(InsuranceComponent.prototype, "name", {
        get: function () { return this.insuranceForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceComponent.prototype, "address", {
        get: function () { return this.insuranceForm.get('address'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceComponent.prototype, "city", {
        get: function () { return this.insuranceForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceComponent.prototype, "state", {
        get: function () { return this.insuranceForm.get('state'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceComponent.prototype, "zipCode", {
        get: function () { return this.insuranceForm.get('zipCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceComponent.prototype, "phone", {
        get: function () { return this.insuranceForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceComponent.prototype, "agentName", {
        get: function () { return this.insuranceForm.get('agentName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceComponent.prototype, "agentEmail", {
        get: function () { return this.insuranceForm.get('agentEmail'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceComponent.prototype, "county", {
        get: function () { return this.insuranceForm.get('county'); },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('group'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], InsuranceComponent.prototype, "insuranceForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('states'),
        __metadata("design:type", Object)
    ], InsuranceComponent.prototype, "states", void 0);
    InsuranceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'insurance',
            template: __importDefault(__webpack_require__(/*! raw-loader!./insurance.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/contact/insurance/insurance.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./insurance.component.scss */ "./src/app/views/contact/insurance/insurance.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], InsuranceComponent);
    return InsuranceComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-contact-contact-module.js.map