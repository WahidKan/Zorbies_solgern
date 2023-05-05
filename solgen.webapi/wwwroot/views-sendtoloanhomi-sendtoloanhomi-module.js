(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-sendtoloanhomi-sendtoloanhomi-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/sendtoloanhomi/sendtoloanhomi.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/sendtoloanhomi/sendtoloanhomi.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"standalone-header\" >\r\n  <div class=\"standalone-logo\">\r\n    <!--{{imageLink}}-->\r\n    <img *ngIf=\"imageLink != ''\" src=\"{{imageLink}}\" alt=\"\" />\r\n    <img *ngIf=\"imageLink == ''\" src=\"../../../assets/default-theme/imagesNew/default-logo.png\"  />\r\n    <span>{{companyName}}</span>\r\n  </div>\r\n</div>\r\n\r\n\r\n<form [formGroup]=\"addSendTLoanHomiForm\" autocomplete=\"off\" *ngIf=\"showAddSendTLoanHomiForm\">\r\n\r\n  <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"panel active\">\r\n      <div class=\"panel-heading\">\r\n        <h4 class=\"panel-title\">\r\n          <a href=\"#SystemInfo\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n            <span>System Info:</span>\r\n          </a>\r\n        </h4>\r\n      </div>\r\n\r\n      <div id=\"SystemInfo\" class=\"panel-collapse collapse active show\" style=\"\">\r\n        <div class=\"panel-body\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Loan Product:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-8\">\r\n                  <ng-select [items]=\"loanProductList\" [loading]=\"loadSave\" placeholder=\"Select Loan Product\" formControlName=\"LoanProductId\" (change)='onChangeLoanProduct($event)'\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (LoanProductId.invalid && (LoanProductId.dirty || LoanProductId.touched) && (LoanProductId.errors?.required || LoanProductId.errors?.maxlength)) }\">\r\n\r\n                  </ng-select>\r\n                  <small *ngIf=\"LoanProductId.invalid && (LoanProductId.dirty || LoanProductId.touched) && LoanProductId.errors?.required\"\r\n                         class=\"text-danger\">Loan Product is required</small>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Term:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"term\" maxlength=\"50\" disabled />\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Street:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control\" formControlName=\"street\" maxlength=\"50\"></div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>City:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control\" formControlName=\"city\" maxlength=\"50\"></div>\r\n              </div>\r\n            </div>\r\n\r\n      \r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Postal Code:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control\" formControlName=\"postalCode\" maxlength=\"50\"></div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>State:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\">\r\n                  <ng-select [items]=\"states\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"state\"\r\n                             bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Country:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\">\r\n                  <ng-select [items]=\"countryLists\" [loading]=\"loadSave\" placeholder=\"Select Country\" formControlName=\"country\" [(ngModel)]=\"defaultCountry\"\r\n                             bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>System Size KW:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control\" formControlName=\"systemSizeKW\" (keypress)=\"numberOnly($event)\" maxlength=\"50\"></div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Total System Cost:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"totalSystemCost\" (keypress)=\"numberOnly($event)\" maxlength=\"50\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Downpayment Amount:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\">\r\n                  <input type=\"number\" class=\"form-control\" formControlName=\"downpaymentAmount\" (keypress)=\"numberOnly($event)\" maxlength=\"50\">\r\n                  <small *ngIf=\"dpAmtValidation == true\" class=\"text-danger\">Amount can't be greater than System Cost.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Loan Amount:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\"><input type=\"number\" class=\"form-control\" formControlName=\"loanAmount\" maxlength=\"50\" disabled></div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Own the Property:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\">\r\n                  <ng-select [items]=\"lstowntheProperty\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"ownthePropertyID\" [(ngModel)]=\"defaultOwnTheProperty\"\r\n                             bindLabel=\"text\" bindValue=\"value\">\r\n                  </ng-select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>No. of Mortgages:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-8\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"noOfMortgages\" maxlength=\"2\" (keypress)=\"keyPressNo($event)\"\r\n                         [ngClass]=\"{'is-invalid': (noOfMortgages.invalid && (noOfMortgages.dirty || noOfMortgages.touched) && (noOfMortgages.errors?.required || noOfMortgages.errors?.maxlength)) }\">\r\n\r\n                  <small *ngIf=\"noOfMortgages.invalid && (noOfMortgages.dirty || noOfMortgages.touched) && noOfMortgages.errors?.required\"\r\n                         class=\"text-danger\">No.of Mortgages is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Installer Rep Name:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-8\">\r\n                  <ng-select [items]=\"installerRepNameList\" [loading]=\"loadSave\" placeholder=\"Select Installer Rep Name\" formControlName=\"installerRepNameId\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (installerRepNameId.invalid && (installerRepNameId.dirty || installerRepNameId.touched) && (installerRepNameId.errors?.required || installerRepNameId.errors?.maxlength)) }\">\r\n\r\n                  </ng-select>\r\n                  <small *ngIf=\"installerRepNameId.invalid && (installerRepNameId.dirty || installerRepNameId.touched) && installerRepNameId.errors?.required\"\r\n                         class=\"text-danger\">Installer Rep Name is required</small>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-4\"><label>Install Agreement:</label></div>\r\n                <div class=\"col-md-12 col-lg-8\">\r\n                  <div class=\"input-group\">\r\n                    <div class=\"custom-file w-100\">\r\n                      <input class=\"custom-file-input form-control\" #file type=\"file\" name='file' #fileInput accept=\"application/pdf\" (change)=\"allowPDF($event)\" lang=\"es\">\r\n                      <label class=\"custom-file-label\">{{fileName}}</label>\r\n                    </div>                    \r\n                     <button class=\"input-group-text bg-white border-0 p-0\" (click)=\"clearSelectedpdf(fileInput)\" style=\"position: absolute; z-index: 10; right :73px; padding: 10px 6px !important;    color: #d00b05 !important; top: 1px;    cursor: pointer;\"><i class=\"fa fa-repeat\"></i></button>                    \r\n                    <small><i class=\"text-primary\">Valid file format is pdf and limit upto 20MB.</i> </small>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!--================================================== Applicant Detail:   =====================================================================-->\r\n  <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"panel active\">\r\n      <div class=\"panel-heading\">\r\n        <h4 class=\"panel-title\">\r\n          <a href=\"#ApplicantDetail\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n            <span>Applicant Detail:</span>\r\n          </a>\r\n        </h4>\r\n      </div>\r\n\r\n      <div id=\"ApplicantDetail\" class=\"panel-collapse collapse active show\" style=\"\">\r\n        <div class=\"panel-body\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>First Name:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"firstName\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (firstName.invalid && (firstName.dirty || firstName.touched) && (firstName.errors?.required || firstName.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"firstName.invalid && (firstName.dirty || firstName.touched) && firstName.errors?.required\"\r\n                         class=\"text-danger\">First Name is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Last Name:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"lastName\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (lastName.invalid && (lastName.dirty || lastName.touched) && (lastName.errors?.required || lastName.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"lastName.invalid && (lastName.dirty || lastName.touched) && lastName.errors?.required\"\r\n                         class=\"text-danger\">Last Name is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Phone:</label></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <!--<input type=\"text\" class=\"form-control\" formControlName=\"phone\" maxlength=\"50\" (keypress)=\"keyPressNo($event)\"\r\n          [ngClass]=\"{'is-invalid': (phone.invalid && (phone.dirty || phone.touched) && (phone.errors?.required || phone.errors?.maxlength)) }\">-->\r\n                  <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"phone\" placeholder=\"(___) ___-____\"\r\n                               [ngClass]=\"{'is-invalid': (phone.invalid && phone.errors?.maxlength) }\"></p-inputMask>\r\n                  <small *ngIf=\"phone.errors?.maxlength\"\r\n                         class=\"text-danger\">Invalid Phone No.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Mobile:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"mobile\" placeholder=\"(___) ___-____\"\r\n                               [ngClass]=\"{'is-invalid': (mobile.invalid && (mobile.dirty || mobile.touched) && (mobile.errors?.required || mobile.errors?.maxlength)) }\"></p-inputMask>\r\n                  <small *ngIf=\"mobile.invalid && (mobile.dirty || mobile.touched) && mobile.errors?.required\"\r\n                         class=\"text-danger\">Mobile is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Email:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"email\" maxlength=\"100\" (focusout)=\"onFocusOutEvent($event)\"\r\n                         [ngClass]=\"{'is-invalid': (email.invalid && (email.dirty || email.touched) && (email.errors?.required || email.errors?.maxlength || email.errors?.email)) }\">\r\n                  <small *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors?.required\"\r\n                         class=\"text-danger\">Email is required</small>\r\n                  <small *ngIf=\"email.errors?.email\"\r\n                         class=\"text-danger\">Email must be a valid email address</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>SSN:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"ssn\" maxlength=\"9\" (focusout)=\"onFocusOutSSN($event)\"\r\n                         [ngClass]=\"{'is-invalid': (ssn.invalid && (ssn.dirty || ssn.touched) && (ssn.errors?.required || ssn.errors?.minLength)) }\">\r\n\r\n                  <small *ngIf=\"ssn.invalid && (ssn.dirty || ssn.touched) && ssn.errors?.required || isSSNValidate==true\"\r\n                         class=\"text-danger\">SSN no must be a valid no.</small>\r\n                  <!--<small *ngIf=\"dpAmtValidation == true\" class=\"text-danger\">Amount can't be greater than System Cost.</small>-->\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>DOB:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <div class=\"form-group datepickerinpop\">\r\n\r\n                    <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" inputStyleClass=\"form-control start-date \" formControlName=\"dateofBirth\" [maxDate]=\"minDate\"\r\n                                dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                                [ngClass]=\"{'is-invalid': (dateofBirth?.invalid && (dateofBirth.dirty || dateofBirth.touched) && dateofBirth.errors?.required) }\"></p-calendar>\r\n\r\n                    <small *ngIf=\"dateofBirth?.invalid && (dateofBirth.dirty || dateofBirth.touched) && dateofBirth.errors?.required\"\r\n                           style=\"color:red;\">DOB is required</small>\r\n\r\n                    <small *ngIf=\"dateofBirth.errors?.lessthan18\"\r\n                           style=\"color:red;\">Age should be greater than 18</small>\r\n\r\n                  </div>\r\n\r\n\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Years at Current Residence:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"yearsAtCurrentResidence\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                         [ngClass]=\"{'is-invalid': (yearsAtCurrentResidence.invalid && (yearsAtCurrentResidence.dirty || yearsAtCurrentResidence.touched) &&\r\n                                   (yearsAtCurrentResidence.errors?.required || yearsAtCurrentResidence.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"yearsAtCurrentResidence.invalid && (yearsAtCurrentResidence.dirty || yearsAtCurrentResidence.touched) && yearsAtCurrentResidence.errors?.required\"\r\n                         class=\"text-danger\">Years at Current Residence is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Months at Current Residence:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" (keypress)=\"keyPressNo($event)\" formControlName=\"monthsatCurrentResidence\"\r\n                         [ngClass]=\"{'is-invalid': (monthsatCurrentResidence.invalid && (monthsatCurrentResidence.dirty || monthsatCurrentResidence.touched) && (monthsatCurrentResidence.errors?.required || monthsatCurrentResidence.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"monthsatCurrentResidence.invalid && (monthsatCurrentResidence.dirty || monthsatCurrentResidence.touched) && monthsatCurrentResidence.errors?.required\"\r\n                         class=\"text-danger\">Months at Current Residence is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Years at Previous Residence:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"yearsAtPreviousResidence\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                         [ngClass]=\"{'is-invalid': (yearsAtPreviousResidence.invalid && (yearsAtPreviousResidence.dirty || yearsAtPreviousResidence.touched) && (yearsAtPreviousResidence.errors?.required || yearsAtPreviousResidence.errors?.maxlength)) }\">\r\n\r\n                  <small *ngIf=\"yearsAtPreviousResidence.invalid && (yearsAtPreviousResidence.dirty || yearsAtPreviousResidence.touched) && yearsAtPreviousResidence.errors?.required\"\r\n                         class=\"text-danger\">Years at Previous Residence is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Months at Previous Residence:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" (keypress)=\"keyPressNo($event)\" formControlName=\"monthsatPreviousResidence\"\r\n                         [ngClass]=\"{'is-invalid': (monthsatPreviousResidence.invalid && (monthsatPreviousResidence.dirty || monthsatPreviousResidence.touched) && (monthsatPreviousResidence.errors?.required || monthsatPreviousResidence.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"monthsatPreviousResidence.invalid && (monthsatPreviousResidence.dirty || monthsatPreviousResidence.touched) && monthsatPreviousResidence.errors?.required\"\r\n                         class=\"text-danger\">Months at Previous Residence is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Street:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"PRStreet\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (PRStreet.invalid && (PRStreet.dirty || PRStreet.touched) && (PRStreet.errors?.required || PRStreet.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"PRStreet.invalid && (PRStreet.dirty || PRStreet.touched) && PRStreet.errors?.required\"\r\n                         class=\"text-danger\">Street is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous City:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"PRCity\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (PRCity.invalid && (PRCity.dirty || PRCity.touched) && (PRCity.errors?.required || PRCity.errors?.maxlength)) }\">\r\n\r\n                  <small *ngIf=\"PRCity.invalid && (PRCity.dirty || PRCity.touched) && PRCity.errors?.required\"\r\n                         class=\"text-danger\">City is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n      \r\n          \r\n          </div>\r\n\r\n          <div class=\"row\">\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous Postal Code:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"PRPostalCode\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (PRPostalCode.invalid && (PRPostalCode.dirty || PRPostalCode.touched) && (PRPostalCode.errors?.required || PRPostalCode.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"PRPostalCode.invalid && (PRPostalCode.dirty || PRPostalCode.touched) && PRPostalCode.errors?.required\"\r\n                         class=\"text-danger\">Postal Code is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous State:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"states\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"PRstate\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (PRstate.invalid && (PRstate.dirty || PRstate.touched) && (PRstate.errors?.required || PRstate.errors?.maxlength)) }\">\r\n\r\n\r\n                  </ng-select>\r\n                  <small *ngIf=\"PRstate.invalid && (PRstate.dirty || PRstate.touched) && PRstate.errors?.required\"\r\n                         class=\"text-danger\">State is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous Country:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"countryLists\" [loading]=\"loadSave\" placeholder=\"Select Country\" formControlName=\"PRcountry\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (PRcountry.invalid && (PRcountry.dirty || PRcountry.touched) && (PRcountry.errors?.required || PRcountry.errors?.maxlength)) }\">\r\n\r\n\r\n                  </ng-select>\r\n                  <small *ngIf=\"PRcountry.invalid && (PRcountry.dirty || PRcountry.touched) && PRcountry.errors?.required\"\r\n                         class=\"text-danger\">Country is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous Housing Status:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"lstprevHousingStatus\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"PHousingStatus\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (PHousingStatus.invalid && (PHousingStatus.dirty || PHousingStatus.touched) && (PHousingStatus.errors?.required || PHousingStatus.errors?.maxlength)) }\">\r\n                  </ng-select>\r\n                  <small *ngIf=\"PHousingStatus.invalid && (PHousingStatus.dirty || PHousingStatus.touched) && PHousingStatus.errors?.required\"\r\n                         class=\"text-danger\">Housing Status is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Employment Type:</label><span class=\"text-danger\">*</span></div>\r\n                <!--<div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"employementType\" maxlength=\"50\" style=\"pointer-events:none\"></div>-->\r\n\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"lstemployementType\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"employementTypeID\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (employementTypeID.invalid && (employementTypeID.dirty || employementTypeID.touched) && (employementTypeID.errors?.required || employementTypeID.errors?.maxlength)) }\">\r\n                  </ng-select>\r\n                  <small *ngIf=\"employementTypeID.invalid && (employementTypeID.dirty || employementTypeID.touched) && employementTypeID.errors?.required\"\r\n                         class=\"text-danger\">Employment Type is required</small>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Employer Name:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"employerName\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (employerName.invalid && (employerName.dirty || employerName.touched) && (employerName.errors?.required || employerName.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"employerName.invalid && (employerName.dirty || employerName.touched) && employerName.errors?.required\"\r\n                         class=\"text-danger\">Employer Name is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Occupation:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"occupation\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (occupation.invalid && (occupation.dirty || occupation.touched) && (occupation.errors?.required || occupation.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"occupation.invalid && (occupation.dirty || occupation.touched) && occupation.errors?.required\"\r\n                         class=\"text-danger\">Occupation is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Years at Current Employment:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"yearsAtCurrentEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                         [ngClass]=\"{'is-invalid': (yearsAtCurrentEmployement.invalid && (yearsAtCurrentEmployement.dirty || yearsAtCurrentEmployement.touched) && (yearsAtCurrentEmployement.errors?.required || yearsAtCurrentEmployement.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"yearsAtCurrentEmployement.invalid && (yearsAtCurrentEmployement.dirty || yearsAtCurrentEmployement.touched) && yearsAtCurrentEmployement.errors?.required\"\r\n                         class=\"text-danger\">Years at Current Employment is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Months at Current Employment:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" formControlName=\"monthsAtCurrentEmployement\" maxlength=\"50\" (keypress)=\"keyPressNo($event)\"\r\n                         [ngClass]=\"{'is-invalid': (monthsAtCurrentEmployement.invalid && (monthsAtCurrentEmployement.dirty || monthsAtCurrentEmployement.touched) && (monthsAtCurrentEmployement.errors?.required || monthsAtCurrentEmployement.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"monthsAtCurrentEmployement.invalid && (monthsAtCurrentEmployement.dirty || monthsAtCurrentEmployement.touched) && monthsAtCurrentEmployement.errors?.required\"\r\n                         class=\"text-danger\">Months at Current Employment is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <!--*ngIf=\"ShowPreviousEmployerDetails\"-->\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous Employer Name:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"previousEmployerName\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (previousEmployerName.invalid && (previousEmployerName.dirty || previousEmployerName.touched) && (previousEmployerName.errors?.required || previousEmployerName.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"previousEmployerName.invalid && (previousEmployerName.dirty || previousEmployerName.touched) && previousEmployerName.errors?.required\"\r\n                         class=\"text-danger\">Previous Employer Name is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous Occupation:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"previousOccupation\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (previousOccupation.invalid && (previousOccupation.dirty || previousOccupation.touched) && (previousOccupation.errors?.required || previousOccupation.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"previousOccupation.invalid && (previousOccupation.dirty || previousOccupation.touched) && previousOccupation.errors?.required\"\r\n                         class=\"text-danger\">Previous Occupation Name is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Years at Previous Employment:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"yearsAtPreviousEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                         [ngClass]=\"{'is-invalid': (yearsAtPreviousEmployement.invalid && (yearsAtPreviousEmployement.dirty || yearsAtPreviousEmployement.touched) && (yearsAtPreviousEmployement.errors?.required || yearsAtPreviousEmployement.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"yearsAtPreviousEmployement.invalid && (yearsAtPreviousEmployement.dirty || yearsAtPreviousEmployement.touched) && yearsAtPreviousEmployement.errors?.required\"\r\n                         class=\"text-danger\">Years at Previous Employment is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Months at Previous Employment:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" formControlName=\"monthsAtPreviousEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (monthsAtPreviousEmployement.invalid && (monthsAtPreviousEmployement.dirty || monthsAtPreviousEmployement.touched) && (monthsAtPreviousEmployement.errors?.required || monthsAtPreviousEmployement.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"monthsAtPreviousEmployement.invalid && (monthsAtPreviousEmployement.dirty || monthsAtPreviousEmployement.touched) && monthsAtPreviousEmployement.errors?.required\"\r\n                         class=\"text-danger\">Months at Previous Employment is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Income Frequency:<span class=\"text-danger\">*</span></label></div>\r\n                <!--<div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"incomeFrequency\" maxlength=\"50\"></div>-->\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"lstIncomeFrequency\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"lstIncomeFrequencyID\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (lstIncomeFrequencyID.invalid && (lstIncomeFrequencyID.dirty || lstIncomeFrequencyID.touched) && (lstIncomeFrequencyID.errors?.required || lstIncomeFrequencyID.errors?.maxlength)) }\">\r\n                  </ng-select>\r\n                  <small *ngIf=\"lstIncomeFrequencyID.invalid && (lstIncomeFrequencyID.dirty || lstIncomeFrequencyID.touched) && lstIncomeFrequencyID.errors?.required\"\r\n                         class=\"text-danger\">Income Frequency is required</small>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <!--*ngIf=\"ShowIncomeFrequency\"-->\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Income:<span class=\"text-danger\" *ngIf=\"showValidationIconOn_income\">*</span></label></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"number\" class=\"form-control\" formControlName=\"income\" (keypress)=\"numberOnly($event)\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (income.invalid && (income.dirty || income.touched) && (income.errors?.required || income.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"income.invalid && (income.dirty || income.touched) && income.errors?.required\"\r\n                         class=\"text-danger\">Income is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Other Income Frequency:</label></div>\r\n\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"lstIncomeFrequency\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"otherIncomeFrequencyID\"\r\n                             bindLabel=\"text\" bindValue=\"value\">\r\n                  </ng-select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <!--*ngIf=\"ShowotherIncomeFrequency\"-->\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Other Income:</label></div>\r\n                <div class=\"col-md-12 col-lg-12\"><input type=\"number\" class=\"form-control\" formControlName=\"otherIncome\" (keypress)=\"numberOnly($event)\" maxlength=\"50\"></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>\tOther Income Source:</label></div>\r\n                <div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"otherIncomeSource\" maxlength=\"50\"></div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Gross Income:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"grossIncome\" maxlength=\"50\" disabled></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!--================================================== Co-Applicant Detail: ==============================================================-->\r\n\r\n  <div id=\"accordion\" *ngIf=\"IsCoApplicantRequired.value\" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"panel active\">\r\n      <div class=\"panel-heading\">\r\n        <h4 class=\"panel-title\">\r\n          <a href=\"#Co-ApplicantDetail\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n            <span>Co-Applicant Detail:</span>\r\n          </a>\r\n        </h4>\r\n      </div>\r\n\r\n      <div id=\"Co-ApplicantDetail\" class=\"panel-collapse collapse active show\" style=\"\">\r\n        <div class=\"panel-body\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>First Name:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_firstName\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_firstName.invalid && (coApp_firstName.dirty || coApp_firstName.touched) && (coApp_firstName.errors?.required || coApp_firstName.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_firstName.invalid && (coApp_firstName.dirty || coApp_firstName.touched) && coApp_firstName.errors?.required\"\r\n                         class=\"text-danger\">First Name is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Last Name:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_lastName\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_lastName.invalid && (coApp_lastName.dirty || coApp_lastName.touched) && (coApp_lastName.errors?.required || coApp_lastName.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_lastName.invalid && (coApp_lastName.dirty || coApp_lastName.touched) && coApp_lastName.errors?.required\"\r\n                         class=\"text-danger\">Last Name is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Phone:</label></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"coApp_phone\" placeholder=\"(___) ___-____\"></p-inputMask>\r\n                  <!--[ngClass]=\"{'is-invalid': (coApp_phone.invalid && coApp_phone.errors?.maxlength) }\"-->\r\n                  <!--<small *ngIf=\"coApp_phone.errors?.maxlength\"\r\n          class=\"text-danger\">Invalid Phone No.</small>-->\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Mobile:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"coApp_mobile\" placeholder=\"(___) ___-____\"\r\n                               [ngClass]=\"{'is-invalid': (coApp_mobile.invalid && (coApp_mobile.dirty || coApp_mobile.touched) && (coApp_mobile.errors?.required || coApp_mobile.errors?.maxlength)) }\"></p-inputMask>\r\n                  <small *ngIf=\"coApp_mobile.invalid && (coApp_mobile.dirty || coApp_mobile.touched) && coApp_mobile.errors?.required\"\r\n                         class=\"text-danger\">Mobile is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Email:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_email\" maxlength=\"100\" (focusout)=\"onFocusOutEvent($event)\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_email.invalid && (coApp_email.dirty || coApp_email.touched) && (coApp_email.errors?.required || coApp_email.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_email.invalid && (coApp_email.dirty || coApp_email.touched) && coApp_email.errors?.required\"\r\n                         class=\"text-danger\">Email is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>SSN:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_ssn\" maxlength=\"9\" (focusout)=\"onFocusOutSSN($event)\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_ssn.invalid && (coApp_ssn.dirty || coApp_ssn.touched) && (coApp_ssn.errors?.required || coApp_ssn.errors?.minLength)) }\" />\r\n                  <small *ngIf=\"coApp_ssn.invalid && (coApp_ssn.dirty || coApp_ssn.touched) && coApp_ssn.errors?.required || isSSNValidate==true\"\r\n                         class=\"text-danger\">SSN no must be a valid no.</small>           \r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>DOB:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <div class=\"form-group datepickerinpop\">\r\n\r\n                    <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" inputStyleClass=\"form-control start-date \" formControlName=\"coApp_dateofBirth\" [maxDate]=\"minDate\"\r\n                                dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                                [ngClass]=\"{'is-invalid': (coApp_dateofBirth?.invalid && (coApp_dateofBirth.dirty || coApp_dateofBirth.touched) && coApp_dateofBirth.errors?.required) }\"></p-calendar>\r\n\r\n                    <small *ngIf=\"coApp_dateofBirth?.invalid && (coApp_dateofBirth.dirty || coApp_dateofBirth.touched) && coApp_dateofBirth.errors?.required\"\r\n                           style=\"color:red;\">DOB is required</small>\r\n\r\n                    <small *ngIf=\"coApp_dateofBirth.errors?.lessthan18\"\r\n                           style=\"color:red;\">Age should be greater than 18</small>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--<div class=\"form-group datepickerinpop\">\r\n          <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date\" formControlName=\"coApp_dateofBirth\"\r\n                      [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                      [ngClass]=\"{'is-invalid': (coApp_dateofBirth.invalid && (coApp_dateofBirth.dirty || coApp_dateofBirth.touched) && (coApp_dateofBirth.errors?.required || coApp_dateofBirth.errors?.maxlength)) }\">\r\n            <small *ngIf=\"coApp_dateofBirth.invalid && (coApp_dateofBirth.dirty || coApp_dateofBirth.touched) && coApp_dateofBirth.errors?.required\"\r\n                   class=\"text-danger\">DOB is required</small>\r\n          </p-calendar>\r\n        </div>-->\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"custom-control custom-checkbox mb-2\" style=\"font-size: 16px;\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" formControlName=\"sameAsapplicant\" id=\"sameAsapplicantID\">\r\n                <label class=\"custom-control-label\" for=\"sameAsapplicantID\">Address same as applicant.</label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Street:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_street\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_street.invalid && (coApp_street.dirty || coApp_street.touched) && (coApp_street.errors?.required || coApp_street.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_street.invalid && (coApp_street.dirty || coApp_street.touched) && coApp_street.errors?.required\"\r\n                         class=\"text-danger\">Street is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>City:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_city\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_city.invalid && (coApp_city.dirty || coApp_city.touched) && (coApp_city.errors?.required || coApp_city.errors?.maxlength)) }\">\r\n\r\n                  <small *ngIf=\"coApp_city.invalid && (coApp_city.dirty || coApp_city.touched) && coApp_city.errors?.required\"\r\n                         class=\"text-danger\">City is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n       \r\n       \r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Postal Code:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_postalCode\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_postalCode.invalid && (coApp_postalCode.dirty || coApp_postalCode.touched) && (coApp_postalCode.errors?.required || coApp_postalCode.errors?.maxlength)) }\" />\r\n                  <small *ngIf=\"coApp_postalCode.invalid && (coApp_postalCode.dirty || coApp_postalCode.touched) && coApp_postalCode.errors?.required\"\r\n                         class=\"text-danger\">Postal Code is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>State:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"states\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"coAppstate\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (coAppstate.invalid && (coAppstate.dirty || coAppstate.touched) && (coAppstate.errors?.required || coAppstate.errors?.maxlength)) }\">\r\n\r\n                  </ng-select>\r\n                  <small *ngIf=\"coAppstate.invalid && (coAppstate.dirty || coAppstate.touched) && coAppstate.errors?.required\"\r\n                         class=\"text-danger\">State is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Country:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"countryLists\" [loading]=\"loadSave\" placeholder=\"Select country\" formControlName=\"coApp_country\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (coApp_country.invalid && (coApp_country.dirty || coApp_country.touched) && (coApp_country.errors?.required || coApp_country.errors?.maxlength)) }\">\r\n\r\n                  </ng-select>\r\n                  <small *ngIf=\"coApp_country.invalid && (coApp_country.dirty || coApp_country.touched) && coApp_country.errors?.required\"\r\n                         class=\"text-danger\">Country is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Years at Current Residence:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_yearsAtCurrentResidence\" maxlength=\"3\" (keypress)=\"keyPressNo($event)\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_yearsAtCurrentResidence.invalid && (coApp_yearsAtCurrentResidence.dirty || coApp_yearsAtCurrentResidence.touched) && (coApp_yearsAtCurrentResidence.errors?.required || coApp_yearsAtCurrentResidence.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_yearsAtCurrentResidence.invalid && (coApp_yearsAtCurrentResidence.dirty || coApp_yearsAtCurrentResidence.touched) && coApp_yearsAtCurrentResidence.errors?.required\"\r\n                         class=\"text-danger\">Years at Current Residence is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Months at Current Residence:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" formControlName=\"coApp_monthsAtCurrentResidence\" maxlength=\"2\" (keypress)=\"keyPressNo($event)\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_monthsAtCurrentResidence.invalid && (coApp_monthsAtCurrentResidence.dirty || coApp_monthsAtCurrentResidence.touched) && (coApp_monthsAtCurrentResidence.errors?.required || coApp_monthsAtCurrentResidence.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_monthsAtCurrentResidence.invalid && (coApp_monthsAtCurrentResidence.dirty || coApp_monthsAtCurrentResidence.touched) && coApp_monthsAtCurrentResidence.errors?.required\"\r\n                         class=\"text-danger\">Months at Current Residence is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Years at Previous Residence:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_yearsAtPreviousResidence\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_yearsAtPreviousResidence.invalid && (coApp_yearsAtPreviousResidence.dirty || coApp_yearsAtPreviousResidence.touched) && (coApp_yearsAtPreviousResidence.errors?.required || coApp_yearsAtPreviousResidence.errors?.maxlength)) }\">\r\n\r\n                  <small *ngIf=\"coApp_yearsAtPreviousResidence.invalid && (coApp_yearsAtPreviousResidence.dirty || coApp_yearsAtPreviousResidence.touched) && coApp_yearsAtPreviousResidence.errors?.required\"\r\n                         class=\"text-danger\">Years at Previous Residence is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Months at Previous Residence:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" (keypress)=\"keyPressNo($event)\" formControlName=\"coApp_monthsatPreviousResidence\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_monthsatPreviousResidence.invalid && (coApp_monthsatPreviousResidence.dirty || coApp_monthsatPreviousResidence.touched) && (coApp_monthsatPreviousResidence.errors?.required || coApp_monthsatPreviousResidence.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_monthsatPreviousResidence.invalid && (coApp_monthsatPreviousResidence.dirty || coApp_monthsatPreviousResidence.touched) && coApp_monthsatPreviousResidence.errors?.required\"\r\n                         class=\"text-danger\">Months at Previous Residence is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Street:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_PRStreet\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_PRStreet.invalid && (coApp_PRStreet.dirty || coApp_PRStreet.touched) && (coApp_PRStreet.errors?.required || coApp_PRStreet.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_PRStreet.invalid && (coApp_PRStreet.dirty || coApp_PRStreet.touched) && coApp_PRStreet.errors?.required\"\r\n                         class=\"text-danger\">Street is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous City:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_PRCity\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_PRCity.invalid && (coApp_PRCity.dirty || coApp_PRCity.touched) && (coApp_PRCity.errors?.required || coApp_PRCity.errors?.maxlength)) }\">\r\n\r\n                  <small *ngIf=\"coApp_PRCity.invalid && (coApp_PRCity.dirty || coApp_PRCity.touched) && coApp_PRCity.errors?.required\"\r\n                         class=\"text-danger\">City is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n       \r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous Postal Code:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_PRPostalCode\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_PRPostalCode.invalid && (coApp_PRPostalCode.dirty || coApp_PRPostalCode.touched) && (coApp_PRPostalCode.errors?.required || coApp_PRPostalCode.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_PRPostalCode.invalid && (coApp_PRPostalCode.dirty || coApp_PRPostalCode.touched) && coApp_PRPostalCode.errors?.required\"\r\n                         class=\"text-danger\">Postal Code is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous State:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"states\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"coApp_PRstate\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (coApp_PRstate.invalid && (coApp_PRstate.dirty || coApp_PRstate.touched) && (coApp_PRstate.errors?.required || coApp_PRstate.errors?.maxlength)) }\">\r\n\r\n\r\n                  </ng-select>\r\n                  <small *ngIf=\"coApp_PRstate.invalid && (coApp_PRstate.dirty || coApp_PRstate.touched) && coApp_PRstate.errors?.required\"\r\n                         class=\"text-danger\">State is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous Country:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"countryLists\" [loading]=\"loadSave\" placeholder=\"Select Country\" formControlName=\"coApp_PRcountry\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (coApp_PRcountry.invalid && (coApp_PRcountry.dirty || coApp_PRcountry.touched) && (coApp_PRcountry.errors?.required || coApp_PRcountry.errors?.maxlength)) }\">\r\n\r\n                  </ng-select>\r\n                  <small *ngIf=\"coApp_PRcountry.invalid && (coApp_PRcountry.dirty || coApp_PRcountry.touched) && coApp_PRcountry.errors?.required\"\r\n                         class=\"text-danger\">Country is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous Housing Status:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"lstprevHousingStatus\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"CoPHousingStatus\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (CoPHousingStatus.invalid && (CoPHousingStatus.dirty || CoPHousingStatus.touched) && (CoPHousingStatus.errors?.required || CoPHousingStatus.errors?.maxlength)) }\">\r\n                  </ng-select>\r\n                  <small *ngIf=\"CoPHousingStatus.invalid && (CoPHousingStatus.dirty || CoPHousingStatus.touched) && CoPHousingStatus.errors?.required\"\r\n                         class=\"text-danger\">Housing Status is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Employment Type:</label><span class=\"text-danger\">*</span></div>\r\n                <!--<div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"employementType\" maxlength=\"50\"></div>-->\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"lstemployementType\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"coApp_employementTypeID\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (coApp_employementTypeID.invalid && (coApp_employementTypeID.dirty || coApp_employementTypeID.touched) && (coApp_employementTypeID.errors?.required || coApp_employementTypeID.errors?.maxlength)) }\">\r\n                  </ng-select>\r\n                  <small *ngIf=\"coApp_employementTypeID.invalid && (coApp_employementTypeID.dirty || coApp_employementTypeID.touched) && coApp_employementTypeID.errors?.required\"\r\n                         class=\"text-danger\">Employment Type is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Employer Name:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_employerName\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_employerName.invalid && (coApp_employerName.dirty || coApp_employerName.touched) && (coApp_employerName.errors?.required || coApp_employerName.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_employementTypeID.invalid && (coApp_employementTypeID.dirty || coApp_employementTypeID.touched) && coApp_employementTypeID.errors?.required\"\r\n                         class=\"text-danger\">Employer Name is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Occupation:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_occupation\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_occupation.invalid && (coApp_occupation.dirty || coApp_occupation.touched) && (coApp_occupation.errors?.required || coApp_occupation.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_occupation.invalid && (coApp_occupation.dirty || coApp_occupation.touched) && coApp_occupation.errors?.required\"\r\n                         class=\"text-danger\">Occupation is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Years at Current Employment:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_yearsAtCurrentEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_yearsAtCurrentEmployement.invalid && (coApp_yearsAtCurrentEmployement.dirty || coApp_yearsAtCurrentEmployement.touched) && (coApp_yearsAtCurrentEmployement.errors?.required || coApp_yearsAtCurrentEmployement.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_yearsAtCurrentEmployement.invalid && (coApp_yearsAtCurrentEmployement.dirty || coApp_yearsAtCurrentEmployement.touched) && coApp_yearsAtCurrentEmployement.errors?.required\"\r\n                         class=\"text-danger\">Years at Current Employment is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Months at Current Employment:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" formControlName=\"coApp_monthsAtCurrentEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_monthsAtCurrentEmployement.invalid && (coApp_monthsAtCurrentEmployement.dirty || coApp_monthsAtCurrentEmployement.touched) && (coApp_monthsAtCurrentEmployement.errors?.required || coApp_monthsAtCurrentEmployement.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_monthsAtCurrentEmployement.invalid && (coApp_monthsAtCurrentEmployement.dirty || coApp_monthsAtCurrentEmployement.touched) && coApp_monthsAtCurrentEmployement.errors?.required\"\r\n                         class=\"text-danger\">Months at Current Employment is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous Employer Name:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_previousEmployerName\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_previousEmployerName.invalid && (coApp_previousEmployerName.dirty || coApp_previousEmployerName.touched) && (coApp_previousEmployerName.errors?.required || coApp_previousEmployerName.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_previousEmployerName.invalid && (coApp_previousEmployerName.dirty || coApp_previousEmployerName.touched) && coApp_previousEmployerName.errors?.required\"\r\n                         class=\"text-danger\">Previous Employer Name is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Previous Occupation:</label><span class=\"text-danger\">*</span></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_previousOccupation\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_previousOccupation.invalid && (coApp_previousOccupation.dirty || coApp_previousOccupation.touched) && (coApp_previousOccupation.errors?.required || coApp_previousOccupation.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_previousOccupation.invalid && (coApp_previousOccupation.dirty || coApp_previousOccupation.touched) && coApp_previousOccupation.errors?.required\"\r\n                         class=\"text-danger\">Previous Occupation Name is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Years at Previous Employment:</label></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"coApp_yearsAtPreviousEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_yearsAtPreviousEmployement.invalid && (coApp_yearsAtPreviousEmployement.dirty || coApp_yearsAtPreviousEmployement.touched) && (coApp_yearsAtPreviousEmployement.errors?.required || coApp_yearsAtPreviousEmployement.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_yearsAtPreviousEmployement.invalid && (coApp_yearsAtPreviousEmployement.dirty || coApp_yearsAtPreviousEmployement.touched) && coApp_yearsAtPreviousEmployement.errors?.required\"\r\n                         class=\"text-danger\">Years at Previous Employment is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Months at Previous Employment:</label></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" formControlName=\"coApp_monthsAtPreviousEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"50\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_monthsAtPreviousEmployement.invalid && (coApp_monthsAtPreviousEmployement.dirty || coApp_monthsAtPreviousEmployement.touched) && (coApp_monthsAtPreviousEmployement.errors?.required || coApp_monthsAtPreviousEmployement.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_monthsAtPreviousEmployement.invalid && (coApp_monthsAtPreviousEmployement.dirty || coApp_monthsAtPreviousEmployement.touched) && coApp_monthsAtPreviousEmployement.errors?.required\"\r\n                         class=\"text-danger\">Months at Previous Employment is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Income Frequency:<span class=\"text-danger\">*</span></label></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"lstIncomeFrequency\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"coApp_incomeFrequency\"\r\n                             bindLabel=\"text\" bindValue=\"value\"\r\n                             [ngClass]=\"{'is-invalid': (coApp_incomeFrequency.invalid && (coApp_incomeFrequency.dirty || coApp_incomeFrequency.touched) && (coApp_incomeFrequency.errors?.required || coApp_incomeFrequency.errors?.maxlength)) }\">\r\n                  </ng-select>\r\n                  <small *ngIf=\"coApp_incomeFrequency.invalid && (coApp_incomeFrequency.dirty || coApp_incomeFrequency.touched) && coApp_incomeFrequency.errors?.required\"\r\n                         class=\"text-danger\">Income Frequency is required</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <!--*ngIf=\"show_CoApp_IncomeFrequency\"-->\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Income:<span class=\"text-danger\" *ngIf=\"showValidationIconOn_coApp_income\">*</span></label></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <input type=\"number\" class=\"form-control\" formControlName=\"coApp_income\" maxlength=\"50\" (keypress)=\"numberOnly($event)\"\r\n                         [ngClass]=\"{'is-invalid': (coApp_income.invalid && (coApp_income.dirty || coApp_income.touched) && (coApp_income.errors?.required || coApp_income.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"coApp_income.invalid && (coApp_income.dirty || coApp_income.touched) && coApp_income.errors?.required\"\r\n                         class=\"text-danger\">Income is required.</small>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Other Income Frequency:</label></div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                  <ng-select [items]=\"lstIncomeFrequency\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"coApp_otherIncomeFrequency\"\r\n                             bindLabel=\"text\" bindValue=\"value\">\r\n                  </ng-select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <!--*ngIf=\"show_CoApp_otherIncomeFrequency\"-->\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Other Income:</label></div>\r\n                <div class=\"col-md-12 col-lg-12\"><input type=\"number\" class=\"form-control\" formControlName=\"coApp_otherIncome\" (keypress)=\"numberOnly($event)\" maxlength=\"50\"></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>\tOther Income Source:</label></div>\r\n                <div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"coApp_otherIncomeSource\" maxlength=\"50\"></div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <div class=\"row mb-2\">\r\n                <div class=\"col-md-12 col-lg-12\"><label>Gross Income:<span class=\"text-danger\">*</span></label></div>\r\n                <div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"coApp_grossIncome\" maxlength=\"50\" disabled></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!--======================================================================================================================================-->\r\n  <!--================================================== Check Box ===========================================================-->\r\n  <div class=\"custom-control custom-checkbox mt-3\">\r\n    <input type=\"checkbox\" class=\"custom-control-input\" formControlName=\"IsCoApplicantRequired\" id=\"forco-applicant\">\r\n    <label class=\"custom-control-label\" for=\"forco-applicant\">  Is Co-Applicant required. </label>\r\n  </div>\r\n\r\n  <div class=\"custom-control custom-checkbox\">\r\n    <input type=\"checkbox\" class=\"custom-control-input\" id=\"checkBoxId1\" formControlName=\"isAutoPaymentcheckBox\">\r\n    <label class=\"custom-control-label\" for=\"checkBoxId1\">   By checking this box, you are agreeing to the auto payment process.</label>\r\n  </div>\r\n\r\n  <div class=\"custom-control custom-checkbox\">\r\n    <input type=\"checkbox\" class=\"custom-control-input\" id=\"checkId2\" formControlName=\"isTermCheckBox\" (change)=\"termCheck(isChecked?'A':'B')\" [(ngModel)]=\"isChecked\"\r\n           [ngClass]=\"{'is-invalid': (isTermCheckBox.invalid && (isTermCheckBox.dirty || isTermCheckBox.touched) && (isTermCheckBox.errors?.required || isTermCheckBox.errors?.maxlength)) }\">\r\n    <label class=\"custom-control-label\" for=\"checkId2\">   <span class=\"text-danger\">*</span>   By checking this box, you are agreeing to accept terms and conditions.</label>\r\n\r\n  </div>\r\n\r\n  <div class=\"custom-control custom-checkbox\">\r\n    <input type=\"checkbox\" class=\"custom-control-input\" id=\"checkId3\" formControlName=\"isBorrowers\" (change)=\"borrowersCheck(isBorrowersCheck?'A':'B')\" [(ngModel)]=\"isBorrowersCheck\"\r\n           [ngClass]=\"{'is-invalid': (isBorrowers.invalid && (isBorrowers.dirty || isBorrowers.touched) && (isBorrowers.errors?.required || isBorrowers.errors?.maxlength)) }\">\r\n    <label class=\"custom-control-label\" for=\"checkId3\">\r\n         <span class=\"text-danger\">*</span>   By checking this box, all borrowers individually authorize Loanhomi to generate a Soft Credit Report and each borrower\r\n      individually provides consent and agrees to each of the following statements above. This will not affect your credit score\r\n      in any way until you accept the pre-qualified loan offer and we fund your loan. If two borrowers have provided information above,\r\n      both understand and give express intent to apply jointly.\r\n    </label>\r\n  </div>\r\n  <!--===========================================================================================================================-->\r\n\r\n  <div class=\"modal-footer mt-4 p-0 pt-3\">\r\n    <a href=\"javascript:void(0);\" class=\"btn btn-success form-btns\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n    <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"clearForm()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n  </div>\r\n</form>\r\n\r\n\r\n<!--//=================showPreview Page===============-->\r\n<!--{{sendToLoanHomiPreviewDetail | json}}-->\r\n<div *ngIf=\"showPreviewSendTLoanHomiForm\" class=\"standalone-page-container\">\r\n  <div class=\"panel\" style=\"border:0px !important\">\r\n    <div class=\"panel-content\">\r\n      <h3 class=\"form-heading mt-0\">\r\n        <span>System Info:</span>\r\n      </h3>\r\n\r\n      <div class=\"row\">\r\n\r\n        <div class=\"col-sm-12 col-md-6 \">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\">\r\n              <span class=\"py-2 d-block\"><strong>Loan Product:</strong></span>\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\"> {{sendToLoanHomiPreviewDetail.LoanProductId}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Term:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Term}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Country:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.country}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>State:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.BillingState}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>City:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.BillingCity}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Street:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.BillingStreet}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Postal Code:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.BillingPostalCode}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>System Size KW:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.System_Size_kW}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Total System Cost:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">${{sendToLoanHomiPreviewDetail.Total_System_Cost}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Downpayment Amount:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">${{sendToLoanHomiPreviewDetail.Downpayment_Amount}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Loan Amount:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">${{sendToLoanHomiPreviewDetail.Loan_Amount}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>No. of Mortgages:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.NoofMortgages}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Own the Property:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Owntheproperty}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <h3 class=\"form-heading mt-3\">\r\n        <span>Applicant Detail:</span>\r\n      </h3>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>First Name:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.FirstName}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Last Name:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.LastName}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Phone:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Phone}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Mobile:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.MobilePhone}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Email:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Email}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>SSN:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.SSN}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>DOB:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.DOB}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Current Residence:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.YearsACA}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Current Residence:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.MonthsACA}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Previous Residence:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PYearACR}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Previous Residence:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PMonthACR}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Country:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PRcountry}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>State:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PRstate}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>City:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PRCity}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Street:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PRStreet}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Postal Code:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PRPostalCode}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Housing Status:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PHousingStatus}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Employment Type:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.EmployerType}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Employer Name:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Employer}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Occupation:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\">\r\n              <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Occupation}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Current Employment:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.YearsACE}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Current Employment:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.MonthsACE}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!--===============================================Previous employeor details===========================================-->\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Employer Name:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PEmployerName}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Occupation:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.POccupation}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Previous Employment:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PYearsACE}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Previous Employment:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PMonthsACE}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!--=================================================================================================-->\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Income Frequency:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.IncomeFreq}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Income:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">${{sendToLoanHomiPreviewDetail.Income}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income Frequency:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.OIncomeFreq}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">${{sendToLoanHomiPreviewDetail.OIncomeMonthly}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income Source:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.OIncomeSource}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Gross Income:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">${{sendToLoanHomiPreviewDetail.GrossIncome}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!--CoApplicant Preview-->\r\n      <div *ngIf=\"IsCoApplicantRequired.value\">\r\n\r\n        <h3 class=\"form-heading mt-3\">\r\n          <span>Co-Applicant Detail:</span>\r\n        </h3>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>First Name:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coFirstname}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Last Name:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coLastname}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Phone:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPhone}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Mobile:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMobilePhone}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Email:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coEmail}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>SSN:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coSSN}}</span></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>DOB:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coDOB}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Country:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coApp_country}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>State:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMailingState}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>City:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMailingCity}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Street:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMailingStreet}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Postal Code:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMailingPostalCode}}</span></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Current Residence:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coYearsACA}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Current Residence:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMonthsACA}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Previous Residence:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPYearACR}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Previous Residence:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPMonthACR}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Country:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPRcountry}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>State:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPRstate}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>City:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPRCity}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Street:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPRStreet}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Postal Code:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPRPostalCode}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Housing Status:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.CoPHousingStatus}}</span></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Employment Type:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coEmployerType}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Employer Name:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coEmployer}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Occupation:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coOccupation}}</span></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Current Employment:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coYearsACE}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Current Employment:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\">\r\n                <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMonthsACE}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!--===============================================Co-Applicant Previous employeor details===========================================-->\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Employer Name:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPEmployerName}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Occupation:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPOccupation}}</span></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Previous Employment:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPYearsACE}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Previous Employment:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPMonthsACE}}</span></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <!--=================================================================================================-->\r\n\r\n        <div class=\"row\">\r\n\r\n\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Income Frequency:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coIncomeFreq}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Income:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">${{sendToLoanHomiPreviewDetail.CoIncome}}</span></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income Frequency:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.CoOIncomeFreq}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">${{sendToLoanHomiPreviewDetail.coOIncome}}</span></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income Source:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coOIncomeSource}}</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-lg-6\">\r\n            <div class=\"input-group border-bottom mb-2\">\r\n              <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Gross Income:</strong></span></div>\r\n              <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">${{sendToLoanHomiPreviewDetail.coGrossIncome}}</span></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n     <!-------------------->\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 col-lg-6\">\r\n          <div class=\"input-group border-bottom mb-2\">\r\n            <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>You are agreeing to the auto payment process.:</strong></span></div>\r\n            <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{AutoPaymentStatus}}</span></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"modal-footer\">\r\n    <a href=\"javascript:void(0);\" class=\"btn btn-dark form-btns\" (click)=\"onBack()\"><i class=\"fa fa-arrow-left\"></i> Back</a>\r\n    <a href=\"javascript:void(0);\" class=\"btn btn-success form-btns\" (click)=\"onPrevSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n    <!--<button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closePopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>-->\r\n  </div>\r\n</div>\r\n<!--===========================================-->\r\n<!--=================================================== WaringPopup ==================================================================-->\r\n\r\n<div class=\"modal fade in show\" bsModal #WaringPopup=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Warning!</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeWaringPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"col-md-12 col-lg-12 p-0\">\r\n          <!--<div class=\"w-100 text-center pb-2\"><img src=\"https://app.loanhomi.com/src/assets/Uploads/UserProfilePick/companyLogo_637382572055515780.png\" alt=\"Solgenone\" class=\"img-fluid\" style=\"max-width:180px\"/></div>-->\r\n          <div class=\"w-100\">\r\n            <p><strong>Dear {{rUserName}}</strong></p>\r\n            <p> Thanks you for applying. Your application number is <strong>{{rDataLoanAppId}}</strong> for future reference.</p>\r\n            <p> Unfortunately at this time we can not find any solar loan options that match your application profile. Please check with your installer to find additional financing sources.</p>\r\n            <p> Installers, if you feel this decision was caused by an error during the application process, please log into LoanHomi.</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeWaringPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n<!--====================================================================================================================================-->\r\n<!--=================================================== ResponsePopup ==================================================================-->\r\n<div class=\"modal fade in show\" bsModal #ResponsePopup=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Congratulations!</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeResponsePopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"col-md-12 col-lg-12 p-0\">\r\n          <!--<div class=\"w-100 text-center pb-2\"><img src=\"https://app.loanhomi.com/src/assets/Uploads/UserProfilePick/companyLogo_637382572055515780.png\" alt=\"Solgenone\" class=\"img-fluid\" style=\"max-width:180px\"/></div>-->\r\n          <div class=\"alert alert-success\" role=\"alert\">\r\n            <i class=\"fa fa-check mr-2\"></i> <strong>Success:</strong> Loan Application Successfully added.\r\n          </div>\r\n          <div class=\"w-100\">\r\n            <p><strong>Dear {{rUserName}}</strong></p>\r\n            <p> Thanks you for applying. Your application number is <strong>{{rDataLoanAppId}}</strong> for future reference.</p>\r\n            <p> Your credit score category is <strong>{{creditScoreCategory}}</strong></p>\r\n            <p> Congratulations! You have been approved. Please look for an email from your installer with your solar financing options. Installers, to Initiate eSignatures or edit the application, login at LoanHomi.</p>\r\n\r\n            <div *ngIf=\"mandatoryDocuments!=null\">\r\n              <p><strong>Mandatory Documents:</strong></p>\r\n              <ol class=\"pl-2\">\r\n                <li *ngFor=\"let item of mandatoryDocuments;\">{{item.MasterValue}}</li>\r\n              </ol>\r\n            </div>\r\n\r\n            <p class=\"mt-4\">Is verification of income required for this loan? <strong>{{IncomeVerificationValue}}</strong></p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeResponsePopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n<!--====================================================================================================================================-->\r\n\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n");

/***/ }),

/***/ "./src/app/views/sendtoloanhomi/sendtoloanhomi-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/sendtoloanhomi/sendtoloanhomi-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: SendtoloanhomiRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendtoloanhomiRoutingModule", function() { return SendtoloanhomiRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sendtoloanhomi_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sendtoloanhomi.component */ "./src/app/views/sendtoloanhomi/sendtoloanhomi.component.ts");
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
    { path: '', component: _sendtoloanhomi_component__WEBPACK_IMPORTED_MODULE_2__["SendtoloanhomiComponent"] },
    //{ path: 'application', component: SendtoloanhomiComponent },
    { path: 'application/:id', component: _sendtoloanhomi_component__WEBPACK_IMPORTED_MODULE_2__["SendtoloanhomiComponent"] },
];
var SendtoloanhomiRoutingModule = /** @class */ (function () {
    function SendtoloanhomiRoutingModule() {
    }
    SendtoloanhomiRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [],
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], SendtoloanhomiRoutingModule);
    return SendtoloanhomiRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/sendtoloanhomi/sendtoloanhomi.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/views/sendtoloanhomi/sendtoloanhomi.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NlbmR0b2xvYW5ob21pL3NlbmR0b2xvYW5ob21pLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/sendtoloanhomi/sendtoloanhomi.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/views/sendtoloanhomi/sendtoloanhomi.component.ts ***!
  \******************************************************************/
/*! exports provided: SendtoloanhomiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendtoloanhomiComponent", function() { return SendtoloanhomiComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sendtoloanhomi_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sendtoloanhomi.service */ "./src/app/views/sendtoloanhomi/sendtoloanhomi.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _manageuser_addedituser_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../manageuser/addedituser.service */ "./src/app/views/manageuser/addedituser.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _opportunity_opportunitylist_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../opportunity/opportunitylist.service */ "./src/app/views/opportunity/opportunitylist.service.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_views_managemodules_modules_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/views/managemodules/modules.service */ "./src/app/views/managemodules/modules.service.ts");
/* harmony import */ var _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../dashboard/dashboard.service */ "./src/app/views/dashboard/dashboard.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
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















var SendtoloanhomiComponent = /** @class */ (function () {
    function SendtoloanhomiComponent(fb, toaster, commonService, sendToLoanHomiService, opprtunityservice, el, userService, decimalPipe, dialogService, route, moduleService, dashboardService, titleService) {
        this.fb = fb;
        this.toaster = toaster;
        this.commonService = commonService;
        this.sendToLoanHomiService = sendToLoanHomiService;
        this.opprtunityservice = opprtunityservice;
        this.el = el;
        this.userService = userService;
        this.decimalPipe = decimalPipe;
        this.dialogService = dialogService;
        this.route = route;
        this.moduleService = moduleService;
        this.dashboardService = dashboardService;
        this.titleService = titleService;
        this.sendToLoanHomiDataModel = new _sendtoloanhomi_service__WEBPACK_IMPORTED_MODULE_1__["sendToLoanHomiModel"]();
        this.jsonData = new _sendtoloanhomi_service__WEBPACK_IMPORTED_MODULE_1__["sendToLoanHomiModelJsonData"]();
        this.loadSave = false;
        this.ShowCo_App_PreviousEmployerDetails = false;
        this.totalOtherFreqIncome = 0;
        this.Co_App_totalOtherFreqIncome = 0;
        this.ShowotherIncomeFrequency = false;
        this.ShowIncomeFrequency = false;
        this.show_CoApp_IncomeFrequency = false;
        this.show_CoApp_otherIncomeFrequency = false;
        this.showAddSendTLoanHomiForm = true;
        this.showPreviewSendTLoanHomiForm = false;
        this.resultData = [];
        this.format = '2.0-2';
        this.result = null;
        this.fileName = "Install Agreement";
        this.isValid = true;
        this.imageLink = '';
        this.showValidationIconOnPR = false;
        this.showValidationIconOnCo_PR = false;
        this.showValidationIconOn_income = false;
        this.showValidationIconOn_coApp_income = false;
        this.dpAmtValidation = false;
        this.tscAmtValidation = false;
        this.isSSNValidate = false;
    }
    SendtoloanhomiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.dealerName = id;
            }
        });
        this.initiForm();
        this.totalGrossAmt = 0;
        this.GetOwnThePropertyDll();
        this.GetPrevHousingStatus();
        this.GetEmployementTypeDll();
        this.GetIncomeFrequencyDll();
        this.getCountryDropdownList();
        this.getState();
        this.getLoanProductList();
        this.getInstallerRepNameList();
        this.previousEmployerName.disable();
        this.previousOccupation.disable();
        this.yearsAtPreviousEmployement.disable();
        this.monthsAtPreviousEmployement.disable();
        this.coApp_previousEmployerName.disable();
        this.coApp_previousOccupation.disable();
        this.coApp_yearsAtPreviousEmployement.disable();
        this.coApp_monthsAtPreviousEmployement.disable();
        this.yearsAtPreviousResidence.disable();
        this.monthsatPreviousResidence.disable();
        this.PRcountry.disable();
        this.PRstate.disable();
        this.PRCity.disable();
        this.PRStreet.disable();
        this.PRPostalCode.disable();
        this.CoPHousingStatus.disable();
        this.PHousingStatus.disable();
        this.income.disable();
        this.coApp_income.disable();
        this.otherIncome.disable();
        this.coApp_otherIncome.disable();
        //====================================================================
        this.monthsatCurrentResidence.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.monthsatCurrentResidence.setValue(11);
            }
        });
        this.monthsAtCurrentEmployement.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.monthsAtCurrentEmployement.setValue(11);
            }
        });
        this.coApp_monthsAtCurrentResidence.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.coApp_monthsAtCurrentResidence.setValue(11);
            }
        });
        this.monthsAtPreviousEmployement.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.monthsAtPreviousEmployement.setValue(11);
            }
        });
        this.coApp_monthsAtCurrentEmployement.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.coApp_monthsAtCurrentEmployement.setValue(11);
            }
        });
        this.coApp_monthsAtPreviousEmployement.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.coApp_monthsAtPreviousEmployement.setValue(11);
            }
        });
        this.noOfMortgages.valueChanges.subscribe(function (m) {
            if (m > 99) {
                _this.noOfMortgages.setValue(99);
            }
        });
        //==========Validation On Years at Current Residence Fields ================
        this.yearsAtCurrentResidence.valueChanges.subscribe(function (m) {
            if (m == "") {
                return;
            }
            if (m == 1 || m == 0) {
                _this.showValidationIconOnPR = true;
                _this.yearsAtPreviousResidence.enable();
                _this.monthsatPreviousResidence.enable();
                _this.PRcountry.enable();
                _this.PRstate.enable();
                _this.PRCity.enable();
                _this.PRStreet.enable();
                _this.PRPostalCode.enable();
                _this.PHousingStatus.enable();
                _this.yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.yearsAtPreviousResidence.updateValueAndValidity();
                _this.monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.monthsatPreviousResidence.updateValueAndValidity();
                _this.PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.PRcountry.updateValueAndValidity();
                _this.PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.PRstate.updateValueAndValidity();
                _this.PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.PRCity.updateValueAndValidity();
                _this.PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.PRStreet.updateValueAndValidity();
                _this.PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.PRPostalCode.updateValueAndValidity();
                _this.PHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.PHousingStatus.updateValueAndValidity();
            }
            else {
                _this.showValidationIconOnPR = false;
                _this.yearsAtPreviousResidence.setValue(null);
                _this.monthsatPreviousResidence.setValue(null);
                _this.PRcountry.setValue(null);
                _this.PRstate.setValue(null);
                _this.PRCity.setValue(null);
                _this.PRStreet.setValue(null);
                _this.PRPostalCode.setValue(null);
                _this.PHousingStatus.setValue(null);
                _this.yearsAtPreviousResidence.disable();
                _this.monthsatPreviousResidence.disable();
                _this.PRcountry.disable();
                _this.PRstate.disable();
                _this.PRCity.disable();
                _this.PRStreet.disable();
                _this.PRPostalCode.disable();
                _this.PHousingStatus.disable();
                _this.yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.yearsAtPreviousResidence.updateValueAndValidity();
                _this.monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.monthsatPreviousResidence.updateValueAndValidity();
                _this.PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.PRcountry.updateValueAndValidity();
                _this.PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.PRstate.updateValueAndValidity();
                _this.PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.PRCity.updateValueAndValidity();
                _this.PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.PRStreet.updateValueAndValidity();
                _this.PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.PRPostalCode.updateValueAndValidity();
                _this.PHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.PHousingStatus.updateValueAndValidity();
            }
        });
        //============================================================================
        //==========Validation On CoApp Years at Current Residence Fields ================
        this.coApp_yearsAtCurrentResidence.valueChanges.subscribe(function (m) {
            if (m == "") {
                return;
            }
            if (m == 1 || m == 0) {
                _this.showValidationIconOnCo_PR = true;
                _this.coApp_yearsAtPreviousResidence.enable();
                _this.coApp_monthsatPreviousResidence.enable();
                _this.coApp_PRcountry.enable();
                _this.coApp_PRstate.enable();
                _this.coApp_PRCity.enable();
                _this.coApp_PRStreet.enable();
                _this.coApp_PRPostalCode.enable();
                _this.CoPHousingStatus.enable();
                _this.coApp_yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_yearsAtPreviousResidence.updateValueAndValidity();
                _this.coApp_monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_monthsatPreviousResidence.updateValueAndValidity();
                _this.coApp_PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_PRcountry.updateValueAndValidity();
                _this.coApp_PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_PRstate.updateValueAndValidity();
                _this.coApp_PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_PRCity.updateValueAndValidity();
                _this.coApp_PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_PRStreet.updateValueAndValidity();
                _this.coApp_PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_PRPostalCode.updateValueAndValidity();
                _this.CoPHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.CoPHousingStatus.updateValueAndValidity();
            }
            else {
                _this.showValidationIconOnCo_PR = false;
                _this.coApp_yearsAtPreviousResidence.setValue(null);
                _this.coApp_monthsatPreviousResidence.setValue(null);
                _this.coApp_PRcountry.setValue(null);
                _this.coApp_PRstate.setValue(null);
                _this.coApp_PRCity.setValue(null);
                _this.coApp_PRStreet.setValue(null);
                _this.coApp_PRPostalCode.setValue(null);
                _this.CoPHousingStatus.setValue(null);
                _this.coApp_yearsAtPreviousResidence.disable();
                _this.coApp_monthsatPreviousResidence.disable();
                _this.coApp_PRcountry.disable();
                _this.coApp_PRstate.disable();
                _this.coApp_PRCity.disable();
                _this.coApp_PRStreet.disable();
                _this.coApp_PRPostalCode.disable();
                _this.CoPHousingStatus.disable();
                _this.coApp_yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_yearsAtPreviousResidence.updateValueAndValidity();
                _this.coApp_monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_monthsatPreviousResidence.updateValueAndValidity();
                _this.coApp_PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_PRcountry.updateValueAndValidity();
                _this.coApp_PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_PRstate.updateValueAndValidity();
                _this.coApp_PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_PRCity.updateValueAndValidity();
                _this.coApp_PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_PRStreet.updateValueAndValidity();
                _this.coApp_PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_PRPostalCode.updateValueAndValidity();
                _this.CoPHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.CoPHousingStatus.updateValueAndValidity();
            }
        });
        //============================================================================
        //==========Validation On Years at Current Employement Fields ================
        this.yearsAtCurrentEmployement.valueChanges.subscribe(function (m) {
            if (m == "") {
                return;
            }
            if (m == 1 || m == 0) {
                _this.sendToLoanHomiDataModel.IsOE = true;
                // this.ShowPreviousEmployerDetails = true;
                _this.previousEmployerName.enable();
                _this.previousOccupation.enable();
                _this.yearsAtPreviousEmployement.enable();
                _this.monthsAtPreviousEmployement.enable();
                _this.previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.previousEmployerName.updateValueAndValidity();
                _this.previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.previousOccupation.updateValueAndValidity();
                _this.yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.yearsAtPreviousEmployement.updateValueAndValidity();
                _this.monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.monthsAtPreviousEmployement.updateValueAndValidity();
            }
            else {
                // this.ShowPreviousEmployerDetails = false;
                _this.sendToLoanHomiDataModel.IsOE = false;
                _this.previousEmployerName.disable();
                _this.previousOccupation.disable();
                _this.yearsAtPreviousEmployement.disable();
                _this.monthsAtPreviousEmployement.disable();
                _this.previousEmployerName.setValue(null);
                _this.previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.previousEmployerName.updateValueAndValidity();
                _this.previousOccupation.setValue(null);
                _this.previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.previousOccupation.updateValueAndValidity();
                _this.yearsAtPreviousEmployement.setValue(null);
                _this.yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.yearsAtPreviousEmployement.updateValueAndValidity();
                _this.monthsAtPreviousEmployement.setValue(null);
                _this.monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.monthsAtPreviousEmployement.updateValueAndValidity();
            }
        });
        //============================================================================
        //============ Validation on Is co-applicant required Fields =================
        this.IsCoApplicantRequired.valueChanges.subscribe(function (m) {
            if (_this.IsCoApplicantRequired.value == true) {
                _this.coApp_firstName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_firstName.updateValueAndValidity();
                _this.coApp_lastName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_lastName.updateValueAndValidity();
                _this.coApp_mobile.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_mobile.updateValueAndValidity();
                _this.coApp_email.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_email.updateValueAndValidity();
                _this.coApp_ssn.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_ssn.updateValueAndValidity();
                _this.coApp_dateofBirth.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _this.checkAge]);
                _this.coApp_dateofBirth.updateValueAndValidity();
                _this.coApp_country.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_country.updateValueAndValidity();
                _this.coAppstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coAppstate.updateValueAndValidity();
                _this.coApp_city.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_city.updateValueAndValidity();
                _this.coApp_street.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_street.updateValueAndValidity();
                _this.coApp_postalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_postalCode.updateValueAndValidity();
                _this.coApp_occupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_occupation.updateValueAndValidity();
                _this.coApp_yearsAtCurrentEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_yearsAtCurrentEmployement.updateValueAndValidity();
                _this.coApp_monthsAtCurrentEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_monthsAtCurrentEmployement.updateValueAndValidity();
                _this.coApp_employerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_employerName.updateValueAndValidity();
                _this.coApp_incomeFrequency.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_incomeFrequency.updateValueAndValidity();
                _this.coApp_income.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_income.updateValueAndValidity();
                _this.coApp_employementTypeID.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_employementTypeID.updateValueAndValidity();
                _this.coApp_previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_previousEmployerName.updateValueAndValidity();
                _this.coApp_previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_previousOccupation.updateValueAndValidity();
                _this.coApp_yearsAtCurrentResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_yearsAtCurrentResidence.updateValueAndValidity();
                _this.coApp_monthsAtCurrentResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_monthsAtCurrentResidence.updateValueAndValidity();
                _this.coApp_yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_ssn.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_ssn.updateValueAndValidity();
                _this.coApp_yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_yearsAtPreviousResidence.updateValueAndValidity();
                _this.coApp_monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_monthsatPreviousResidence.updateValueAndValidity();
                _this.coApp_PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_PRcountry.updateValueAndValidity();
                _this.coApp_PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_PRstate.updateValueAndValidity();
                _this.coApp_PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_PRCity.updateValueAndValidity();
                _this.coApp_PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_PRStreet.updateValueAndValidity();
                _this.coApp_PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_PRPostalCode.updateValueAndValidity();
                _this.CoPHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.CoPHousingStatus.updateValueAndValidity();
            }
            else {
                _this.sameAsapplicant.setValue(false);
                _this.coApp_firstName.setValue(null);
                _this.coApp_firstName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_firstName.updateValueAndValidity();
                _this.coApp_lastName.setValue(null);
                _this.coApp_lastName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_lastName.updateValueAndValidity();
                _this.coApp_email.setValue(null);
                _this.coApp_email.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_email.updateValueAndValidity();
                _this.coApp_ssn.setValue(null);
                _this.coApp_ssn.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_ssn.updateValueAndValidity();
                _this.coApp_dateofBirth.setValue(null);
                _this.coApp_dateofBirth.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_dateofBirth.updateValueAndValidity();
                _this.coApp_country.setValue(null);
                _this.coApp_country.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_country.updateValueAndValidity();
                _this.coAppstate.setValue(null);
                _this.coAppstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coAppstate.updateValueAndValidity();
                _this.coApp_city.setValue(null);
                _this.coApp_city.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_city.updateValueAndValidity();
                _this.coApp_street.setValue(null);
                _this.coApp_street.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_street.updateValueAndValidity();
                _this.coApp_occupation.setValue(null);
                _this.coApp_occupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_occupation.updateValueAndValidity();
                _this.coApp_yearsAtCurrentEmployement.setValue(null);
                _this.coApp_yearsAtCurrentEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_yearsAtCurrentEmployement.updateValueAndValidity();
                _this.coApp_monthsAtCurrentEmployement.setValue(null);
                _this.coApp_monthsAtCurrentEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_monthsAtCurrentEmployement.updateValueAndValidity();
                _this.coApp_employerName.setValue(null);
                _this.coApp_employerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_employerName.updateValueAndValidity();
                _this.coApp_incomeFrequency.setValue(null);
                _this.coApp_incomeFrequency.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_incomeFrequency.updateValueAndValidity();
                _this.coApp_income.setValue(null);
                _this.coApp_income.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_income.updateValueAndValidity();
                _this.coApp_employementTypeID.setValue(null);
                _this.coApp_employementTypeID.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_employementTypeID.updateValueAndValidity();
                _this.coApp_previousEmployerName.setValue(null);
                _this.coApp_previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_previousEmployerName.updateValueAndValidity();
                _this.coApp_previousOccupation.setValue(null);
                _this.coApp_previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_previousOccupation.updateValueAndValidity();
                _this.coApp_yearsAtCurrentResidence.setValue(null);
                _this.coApp_yearsAtCurrentResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_yearsAtCurrentResidence.updateValueAndValidity();
                _this.coApp_monthsAtCurrentResidence.setValue(null);
                _this.coApp_monthsAtCurrentResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_monthsAtCurrentResidence.updateValueAndValidity();
                _this.coApp_yearsAtPreviousEmployement.setValue(null);
                _this.coApp_yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_monthsAtPreviousEmployement.setValue(null);
                _this.coApp_monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_phone.setValue(null);
                _this.coApp_mobile.setValue(null);
                _this.coApp_mobile.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_mobile.updateValueAndValidity();
                _this.coApp_postalCode.setValue(null);
                _this.coApp_postalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_postalCode.updateValueAndValidity();
                _this.coApp_otherIncomeFrequency.setValue(null);
                _this.coApp_otherIncome.setValue(null);
                _this.coApp_otherIncomeSource.setValue(null);
                _this.coApp_grossIncome.setValue(null);
                _this.coApp_yearsAtPreviousResidence.setValue(null);
                _this.coApp_yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_yearsAtPreviousResidence.updateValueAndValidity();
                _this.coApp_monthsatPreviousResidence.setValue(null);
                _this.coApp_monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_monthsatPreviousResidence.updateValueAndValidity();
                _this.coApp_PRcountry.setValue(null);
                _this.coApp_PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_PRcountry.updateValueAndValidity();
                _this.coApp_PRstate.setValue(null);
                _this.coApp_PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_PRstate.updateValueAndValidity();
                _this.coApp_PRCity.setValue(null);
                _this.coApp_PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_PRCity.updateValueAndValidity();
                _this.coApp_PRStreet.setValue(null);
                _this.coApp_PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_PRStreet.updateValueAndValidity();
                _this.coApp_PRPostalCode.setValue(null);
                _this.coApp_PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_PRPostalCode.updateValueAndValidity();
                _this.CoPHousingStatus.setValue(null);
                _this.CoPHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.CoPHousingStatus.updateValueAndValidity();
            }
        });
        //============================================================================
        //============== Validate On coApp_yearsAtCurrentEmployement Field ==========
        this.coApp_yearsAtCurrentEmployement.valueChanges.subscribe(function (m) {
            if (m == 1) {
                _this.sendToLoanHomiDataModel.coIsOE = true;
                _this.coApp_previousEmployerName.enable();
                _this.coApp_previousOccupation.enable();
                _this.coApp_yearsAtPreviousEmployement.enable();
                _this.coApp_monthsAtPreviousEmployement.enable();
                _this.coApp_previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_previousEmployerName.updateValueAndValidity();
                _this.coApp_previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_previousOccupation.updateValueAndValidity();
                _this.coApp_yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();
            }
            else {
                _this.coApp_previousEmployerName.disable();
                _this.coApp_previousOccupation.disable();
                _this.coApp_yearsAtPreviousEmployement.disable();
                _this.coApp_monthsAtPreviousEmployement.disable();
                _this.sendToLoanHomiDataModel.coIsOE = false;
                _this.coApp_previousEmployerName.setValue(null);
                _this.coApp_previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_previousEmployerName.updateValueAndValidity();
                _this.coApp_previousOccupation.setValue(null);
                _this.coApp_previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_previousOccupation.updateValueAndValidity();
                _this.coApp_yearsAtPreviousEmployement.setValue(null);
                _this.coApp_yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_monthsAtPreviousEmployement.setValue(null);
                _this.coApp_monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
                _this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();
            }
        });
        //============================================================================
        this.sameAsapplicant.valueChanges.subscribe(function (m) {
            if (m == true) {
                _this.coApp_country.setValue(_this.country.value);
                _this.coAppstate.setValue(_this.state.value);
                _this.coApp_city.setValue(_this.city.value);
                _this.coApp_street.setValue(_this.street.value);
                _this.coApp_postalCode.setValue(_this.postalCode.value);
            }
            else {
                _this.coApp_country.setValue(null);
                _this.coAppstate.setValue(null);
                _this.coApp_city.setValue(null);
                _this.coApp_street.setValue(null);
                _this.coApp_postalCode.setValue(null);
            }
        });
        this.totalSystemCost.valueChanges.subscribe(function (m) {
            debugger;
            _this.tscAmtValidation = false;
            var totalSysCost;
            totalSysCost = m;
            //this.totalSystemCost.setValue(this.downpaymentAmount.value);
            _this.downpaymentAmount.setValue(null);
            _this.loanAmount.setValue(totalSysCost - _this.DownpaymentAmount);
            _this.TotalloanAmount = m;
        });
        this.downpaymentAmount.valueChanges.subscribe(function (m) {
            debugger;
            _this.dpAmtValidation = false;
            if (m < 0) {
                event.preventDefault();
                _this.downpaymentAmount.setValue(0);
                return;
            }
            if (m > _this.totalSystemCost.value) {
                _this.downpaymentAmount.setValue(null);
                _this.dpAmtValidation = true;
                return;
            }
            _this.DownpaymentAmount = m;
            console.log('TotalloanAmount', m, _this.TotalloanAmount);
            if (_this.DownpaymentAmount > _this.TotalloanAmount) {
                _this.loanAmount.setValue(0);
                _this.downpaymentAmount.setValue(_this.TotalloanAmount);
                event.preventDefault();
                //this.downpaymentAmount.setValue(0);
            }
            else {
                _this.totalLoanAmt = _this.totalSystemCost.value - _this.DownpaymentAmount;
                _this.result = _this.decimalPipe.transform(_this.totalLoanAmt, _this.format);
                var re = /\,/gi;
                _this.result = _this.result.replace(re, "");
                _this.loanAmount.setValue(_this.result);
            }
        });
        //----Calculating Applicant Gross Amt------------- 
        this.lstIncomeFrequencyID.valueChanges.subscribe(function (m) {
            _this.totalGrossAmt = 0;
            if (m == _this.iFreqMonthValue) {
                //this.ShowIncomeFrequency = true;
                _this.showValidationIconOn_income = true;
                _this.income.enable();
                _this.incomeType = m;
                _this.totalGrossAmt = _this.income.value * 12;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            else if (m == _this.iFreqYearValue) {
                // this.ShowIncomeFrequency = true;
                _this.showValidationIconOn_income = true;
                _this.income.enable();
                _this.incomeType = m;
                _this.totalGrossAmt = _this.income.value;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            if (m != _this.iFreqMonthValue && m != _this.iFreqYearValue) {
                _this.incomeType = null;
                _this.totalGrossAmt = 0;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
                _this.income.setValue(0);
                //this.ShowIncomeFrequency = false;
                _this.income.disable();
                _this.showValidationIconOn_income = false;
            }
        });
        this.income.valueChanges.subscribe(function (m) {
            if (m < 0) {
                event.preventDefault();
                _this.income.setValue(0);
                return;
            }
            // 1146 --Monthly Id
            if (_this.incomeType == _this.iFreqMonthValue) {
                _this.totalGrossAmt = m * 12;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            else if (_this.incomeType == _this.iFreqYearValue) {
                _this.totalGrossAmt = m;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            if (m == null) {
                _this.totalGrossAmt = 0;
            }
        });
        this.otherIncomeFrequencyID.valueChanges.subscribe(function (m) {
            //  this.totalGrossAmt = 0;
            _this.totalOtherFreqIncome = 0;
            if (m == _this.iFreqMonthValue) {
                // this.ShowotherIncomeFrequency = true;
                _this.otherIncome.enable();
                _this.otherIncomeType = m;
                _this.totalOtherFreqIncome = _this.otherIncome.value * 12;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            else if (m == _this.iFreqYearValue) {
                //this.ShowotherIncomeFrequency = true;
                _this.otherIncome.enable();
                _this.otherIncomeType = m;
                _this.totalOtherFreqIncome = _this.otherIncome.value;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            if (m != _this.iFreqMonthValue && m != _this.iFreqYearValue) {
                //this.ShowotherIncomeFrequency = false;
                _this.otherIncome.disable();
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
                _this.otherIncome.setValue(0);
            }
        });
        this.otherIncome.valueChanges.subscribe(function (m) {
            if (m < 0) {
                event.preventDefault();
                _this.otherIncome.setValue(0);
                return;
            }
            _this.totalOtherFreqIncome = 0;
            // 1146 --Monthly Id
            if (_this.otherIncomeType == _this.iFreqMonthValue) {
                _this.totalOtherFreqIncome = m * 12;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            else if (_this.otherIncomeType == _this.iFreqYearValue) {
                _this.totalOtherFreqIncome = m;
                _this.grossIncome.setValue(_this.totalGrossAmt + m);
            }
        });
        //----------------------------------------
        //----Calculating Co-Applicant Gross Amt-------------
        this.coApp_incomeFrequency.valueChanges.subscribe(function (m) {
            if (m == _this.iFreqMonthValue) {
                //this.show_CoApp_IncomeFrequency = true;
                _this.coApp_income.enable();
                _this.showValidationIconOn_coApp_income = true;
                _this.coApp_incomeType = m;
                _this.totalCo_App_GrossAmt = _this.coApp_income.value * 12;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            else if (m == _this.iFreqYearValue) {
                //this.show_CoApp_IncomeFrequency = true;
                _this.coApp_income.enable();
                _this.showValidationIconOn_coApp_income = true;
                _this.coApp_incomeType = m;
                _this.totalCo_App_GrossAmt = _this.coApp_income.value;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            if (m != _this.iFreqMonthValue && m != _this.iFreqYearValue) {
                _this.coApp_otherIncomeType = null;
                _this.totalCo_App_GrossAmt = 0;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
                _this.coApp_income.setValue(0);
                //this.show_CoApp_IncomeFrequency = false;
                _this.coApp_income.disable();
                _this.showValidationIconOn_coApp_income = false;
            }
        });
        this.coApp_income.valueChanges.subscribe(function (m) {
            if (m < 0) {
                event.preventDefault();
                _this.coApp_income.setValue(0);
                return;
            }
            // 1146 --Monthly Id
            if (_this.coApp_incomeType == _this.iFreqMonthValue) {
                _this.totalCo_App_GrossAmt = m * 12;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            else if (_this.coApp_incomeType == _this.iFreqYearValue) {
                _this.totalCo_App_GrossAmt = m;
                var data = m + _this.Co_App_totalOtherFreqIncome;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
                if (m == null) {
                    _this.totalCo_App_GrossAmt = 0;
                }
            }
        });
        this.coApp_otherIncomeFrequency.valueChanges.subscribe(function (m) {
            _this.Co_App_totalOtherFreqIncome = 0;
            if (m == _this.iFreqMonthValue) {
                //this.show_CoApp_otherIncomeFrequency = true;
                _this.coApp_otherIncome.enable();
                _this.coApp_otherIncomeType = m;
                _this.Co_App_totalOtherFreqIncome = _this.coApp_otherIncome.value * 12;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            else if (m == _this.iFreqYearValue) {
                //this.show_CoApp_otherIncomeFrequency = true;
                _this.coApp_otherIncome.enable();
                _this.coApp_otherIncomeType = m;
                _this.Co_App_totalOtherFreqIncome = _this.coApp_otherIncome.value;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            if (m != _this.iFreqMonthValue && m != _this.iFreqYearValue) {
                //this.show_CoApp_otherIncomeFrequency = false;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
                _this.coApp_otherIncome.setValue(0);
                _this.coApp_otherIncome.disable();
            }
        });
        this.coApp_otherIncome.valueChanges.subscribe(function (m) {
            if (m < 0) {
                event.preventDefault();
                _this.coApp_otherIncome.setValue(0);
                return;
            }
            // 1440 --Monthly Id
            _this.Co_App_totalOtherFreqIncome = 0;
            if (_this.coApp_otherIncomeType == _this.iFreqMonthValue) {
                _this.Co_App_totalOtherFreqIncome = m * 12;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            else {
                if (_this.coApp_otherIncomeType == _this.iFreqYearValue) {
                    _this.Co_App_totalOtherFreqIncome = m;
                    _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
                }
            }
        });
        //----------------------------------------
    };
    SendtoloanhomiComponent.prototype.initiForm = function () {
        this.addSendTLoanHomiForm = this.fb.group({
            LoanProductId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            installerRepNameId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            term: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            country: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            state: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            city: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            street: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            postalCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            systemSizeKW: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            totalSystemCost: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            downpaymentAmount: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            loanAmount: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            ownthePropertyID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            CoPHousingStatus: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            noOfMortgages: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            //phone: ['', Validators.required],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(14)],
            mobile: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(14)]],
            // email: [null, [Validators.nullValidator, Validators.email]],    
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            //ssn: [null, Validators.required],
            ssn: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(9)]],
            // dateofBirth: [Validators.required, Validators.required],
            dateofBirth: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, this.checkAge]],
            yearsAtCurrentResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            // yearsAtCurrentResidence: ['', [Validators.required, Validators.pattern("[0 - 9] + (\.[0 - 9][0 - 9] ?) ?")]],
            monthsatCurrentResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            yearsAtPreviousResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            monthsatPreviousResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            PRcountry: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            PRstate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            PRCity: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            PRStreet: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            PRPostalCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            PHousingStatus: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            employementTypeID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            employerName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            yearsAtCurrentEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            monthsAtCurrentEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            lstIncomeFrequencyID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            income: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            otherIncomeFrequencyID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            otherIncome: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            otherIncomeSource: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            grossIncome: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            occupation: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            coApp_firstName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_lastName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_phone: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_mobile: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            // coApp_phone: ['', [Validators.required, Validators.maxLength(14)]],
            coApp_email: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_ssn: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            // coApp_ssn: ['', [Validators.required, Validators.maxLength(15)]],
            coApp_dateofBirth: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_country: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coAppstate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_city: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_street: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_postalCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_occupation: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_yearsAtCurrentEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_monthsAtCurrentEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            employementType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_employerName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_incomeFrequency: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_income: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_otherIncomeFrequency: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_otherIncome: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_otherIncomeSource: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_grossIncome: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            isAutoPaymentcheckBox: [true, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            isTermCheckBox: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            isBorrowers: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            coApp_employementTypeID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            previousEmployerName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            previousOccupation: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            yearsAtPreviousEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            monthsAtPreviousEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_previousEmployerName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_previousOccupation: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_yearsAtCurrentResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_monthsAtCurrentResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_yearsAtPreviousResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_monthsatPreviousResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_PRcountry: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_PRstate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_PRCity: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_PRStreet: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_PRPostalCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_yearsAtPreviousEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            coApp_monthsAtPreviousEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            installAgreement: [''],
            'file': '',
            'filename': [''],
            IsCoApplicantRequired: [false],
            //isAutoPaymentcheckBox: [true],
            sameAsapplicant: [false],
        });
    };
    Object.defineProperty(SendtoloanhomiComponent.prototype, "installAgreement", {
        get: function () { return this.addSendTLoanHomiForm.get('installAgreement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "LoanProductId", {
        get: function () { return this.addSendTLoanHomiForm.get('LoanProductId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "term", {
        get: function () { return this.addSendTLoanHomiForm.get('term'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "installerRepNameId", {
        get: function () { return this.addSendTLoanHomiForm.get('installerRepNameId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "IsCoApplicantRequired", {
        get: function () { return this.addSendTLoanHomiForm.get('IsCoApplicantRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "monthsAtCurrentEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('monthsAtCurrentEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_monthsAtCurrentEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_monthsAtCurrentEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "yearsAtCurrentEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('yearsAtCurrentEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "sameAsapplicant", {
        get: function () { return this.addSendTLoanHomiForm.get('sameAsapplicant'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_country", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_country'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "state", {
        get: function () { return this.addSendTLoanHomiForm.get('state'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "country", {
        get: function () { return this.addSendTLoanHomiForm.get('country'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coAppstate", {
        get: function () { return this.addSendTLoanHomiForm.get('coAppstate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "city", {
        get: function () { return this.addSendTLoanHomiForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_city", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "street", {
        get: function () { return this.addSendTLoanHomiForm.get('street'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_street", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_street'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "postalCode", {
        get: function () { return this.addSendTLoanHomiForm.get('postalCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_postalCode", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_postalCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "downpaymentAmount", {
        get: function () { return this.addSendTLoanHomiForm.get('downpaymentAmount'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "loanAmount", {
        get: function () { return this.addSendTLoanHomiForm.get('loanAmount'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "totalSystemCost", {
        get: function () { return this.addSendTLoanHomiForm.get('totalSystemCost'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "lstIncomeFrequencyID", {
        get: function () { return this.addSendTLoanHomiForm.get('lstIncomeFrequencyID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "income", {
        get: function () { return this.addSendTLoanHomiForm.get('income'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "grossIncome", {
        get: function () { return this.addSendTLoanHomiForm.get('grossIncome'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "otherIncomeFrequencyID", {
        get: function () { return this.addSendTLoanHomiForm.get('otherIncomeFrequencyID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "otherIncome", {
        get: function () { return this.addSendTLoanHomiForm.get('otherIncome'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_incomeFrequency", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_incomeFrequency'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_income", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_income'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_otherIncome", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_otherIncome'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_grossIncome", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_grossIncome'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_otherIncomeFrequency", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_otherIncomeFrequency'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_employementTypeID", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_employementTypeID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "noOfMortgages", {
        get: function () { return this.addSendTLoanHomiForm.get('noOfMortgages'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "firstName", {
        get: function () { return this.addSendTLoanHomiForm.get('firstName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "lastName", {
        get: function () { return this.addSendTLoanHomiForm.get('lastName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_firstName", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_firstName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_lastName", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_lastName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "phone", {
        get: function () { return this.addSendTLoanHomiForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "mobile", {
        get: function () { return this.addSendTLoanHomiForm.get('mobile'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_phone", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_mobile", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_mobile'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "isTermCheckBox", {
        get: function () { return this.addSendTLoanHomiForm.get('isTermCheckBox'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "isAutoPaymentcheckBox", {
        get: function () { return this.addSendTLoanHomiForm.get('isAutoPaymentcheckBox'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "isBorrowers", {
        get: function () { return this.addSendTLoanHomiForm.get('isBorrowers'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "previousEmployerName", {
        get: function () { return this.addSendTLoanHomiForm.get('previousEmployerName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "previousOccupation", {
        get: function () { return this.addSendTLoanHomiForm.get('previousOccupation'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "yearsAtPreviousEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('yearsAtPreviousEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "monthsAtPreviousEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('monthsAtPreviousEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "email", {
        get: function () { return this.addSendTLoanHomiForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "ssn", {
        get: function () { return this.addSendTLoanHomiForm.get('ssn'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "dateofBirth", {
        get: function () { return this.addSendTLoanHomiForm.get('dateofBirth'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "yearsAtCurrentResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('yearsAtCurrentResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "monthsatCurrentResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('monthsatCurrentResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "yearsAtPreviousResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('yearsAtPreviousResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "monthsatPreviousResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('monthsatPreviousResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "PRcountry", {
        get: function () { return this.addSendTLoanHomiForm.get('PRcountry'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "PRstate", {
        get: function () { return this.addSendTLoanHomiForm.get('PRstate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "PRCity", {
        get: function () { return this.addSendTLoanHomiForm.get('PRCity'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "PRStreet", {
        get: function () { return this.addSendTLoanHomiForm.get('PRStreet'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "PRPostalCode", {
        get: function () { return this.addSendTLoanHomiForm.get('PRPostalCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "PHousingStatus", {
        get: function () { return this.addSendTLoanHomiForm.get('PHousingStatus'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "employementTypeID", {
        get: function () { return this.addSendTLoanHomiForm.get('employementTypeID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "employerName", {
        get: function () { return this.addSendTLoanHomiForm.get('employerName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "occupation", {
        get: function () { return this.addSendTLoanHomiForm.get('occupation'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_email", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_ssn", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_ssn'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_dateofBirth", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_dateofBirth'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_yearsAtCurrentEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_yearsAtCurrentEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_previousEmployerName", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_previousEmployerName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_previousOccupation", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_previousOccupation'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_yearsAtCurrentResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_yearsAtCurrentResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_monthsAtCurrentResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_monthsAtCurrentResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_yearsAtPreviousResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_yearsAtPreviousResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_monthsatPreviousResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_monthsatPreviousResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_PRcountry", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_PRcountry'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_PRstate", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_PRstate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_PRCity", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_PRCity'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_PRStreet", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_PRStreet'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_PRPostalCode", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_PRPostalCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_employerName", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_employerName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_occupation", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_occupation'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_yearsAtPreviousEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_yearsAtPreviousEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_monthsAtPreviousEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_monthsAtPreviousEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "coApp_otherIncomeSource", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_otherIncomeSource'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomiComponent.prototype, "CoPHousingStatus", {
        get: function () { return this.addSendTLoanHomiForm.get('CoPHousingStatus'); },
        enumerable: true,
        configurable: true
    });
    //================================ Getting Dropdown Data =================================================
    SendtoloanhomiComponent.prototype.GetOwnThePropertyDll = function () {
        var _this = this;
        this.lstownthePropertyCode = 'OwntheProperty';
        this.commonService.GetMasterItemsNotAuth("OwntheProperty").subscribe(function (result) {
            _this.lstowntheProperty = _this.commonService.masters;
            console.log("this.lstowntheProperty", _this.lstowntheProperty);
            _this.selectedOwnTheProperty = _this.lstowntheProperty.filter(function (x) { return x.text == "YES"; });
            _this.defaultOwnTheProperty = _this.selectedOwnTheProperty[0].value;
        });
    };
    SendtoloanhomiComponent.prototype.GetPrevHousingStatus = function () {
        var _this = this;
        this.commonService.GetMasterItemsNotAuth("PrevHousingStatus").subscribe(function (result) {
            _this.lstprevHousingStatus = _this.commonService.masters;
            console.log("this.lstprevHousingStatus", _this.lstprevHousingStatus);
            //   this.selectedOwnTheProperty = this.lstprevHousingStatus.filter(x => x.text == "YES"); 
            //  this.defaultOwnTheProperty = this.selectedOwnTheProperty[0].value;
        });
    };
    SendtoloanhomiComponent.prototype.GetEmployementTypeDll = function () {
        var _this = this;
        this.lstemployementTypeCode = 'EmploymentType';
        this.commonService.GetMasterItemsNotAuth("EmploymentType").subscribe(function (result) {
            _this.lstemployementType = _this.commonService.masters;
            console.log("this.lstemployementType", _this.lstemployementType);
        });
    };
    SendtoloanhomiComponent.prototype.getLoanProductList = function () {
        var _this = this;
        this.lstemployementTypeCode = 'LoanProduct';
        this.commonService.GetMasterItemsNotAuth("LoanProduct").subscribe(function (result) {
            _this.loanProductList = _this.commonService.masters;
            console.log("this.loanProductList", _this.loanProductList);
        });
    };
    SendtoloanhomiComponent.prototype.getInstallerRepNameList = function () {
        var _this = this;
        console.log("this.dealerName", this.dealerName);
        this.sendToLoanHomiService.getInstallerRepNameList(this.dealerName).subscribe(function (result) {
            debugger;
            _this.installerRepNameList = _this.sendToLoanHomiService.masters;
            console.log(" this.installerRepNameList", _this.installerRepNameList);
            _this.companyLogo = _this.installerRepNameList[0].name;
            _this.companyName = _this.installerRepNameList[0].masterName;
            console.log(" this.companyLogo", _this.companyLogo);
            console.log(" this.companyName", _this.companyName);
            _this.GetFileUploadSource();
            _this.setTitle();
        });
    };
    SendtoloanhomiComponent.prototype.setTitle = function () {
        debugger;
        this.titleService.setTitle(this.companyName);
    };
    SendtoloanhomiComponent.prototype.GetFileUploadSource = function () {
        var _this = this;
        this.sendToLoanHomiService.GetFileUploadSourceNoAuth(this.companyLogo).subscribe(function (result) {
            _this.imageLink = result;
            console.log("this.imageLink", _this.imageLink);
            if (_this.imageLink == 'javascript:void(0);') {
                _this.imageLink = '';
                console.log("this.imageLinkNew", _this.imageLink);
            }
        });
    };
    ;
    SendtoloanhomiComponent.prototype.GetIncomeFrequencyDll = function () {
        var _this = this;
        this.lstIncomeFrequencyCode = 'IncomeFrequency';
        this.commonService.GetMasterItemsNotAuth("IncomeFrequency").subscribe(function (result) {
            _this.lstIncomeFrequency = _this.commonService.masters;
            console.log("this.lstIncomeFrequency", _this.lstIncomeFrequency);
            _this.iFreqYear = _this.lstIncomeFrequency.filter(function (x) { return x.text == "Annually"; });
            _this.iFreqYearValue = _this.iFreqYear[0].value;
            _this.iFreqMonth = _this.lstIncomeFrequency.filter(function (x) { return x.text == "Monthly"; });
            _this.iFreqMonthValue = _this.iFreqMonth[0].value;
        });
    };
    SendtoloanhomiComponent.prototype.getCountryDropdownList = function () {
        var _this = this;
        this.userService.getCountryListNotAuth().subscribe(function (result) {
            _this.countryLists = result;
            console.log("this.countryLists", _this.countryLists);
            _this.defaultCountry = _this.countryLists.filter(function (x) { return x.text == "United States"; });
            _this.defaultCountry = _this.defaultCountry[0].value;
            console.log("defaultCountry", _this.defaultCountry);
        });
    };
    SendtoloanhomiComponent.prototype.getState = function () {
        var _this = this;
        this.userService.getStateListNotAuth().subscribe(function (result) {
            var data = result;
            _this.states = data.filter(function (x) { return x.text == 'Arizona' || x.text == 'Washington' || x.text == 'Ohio' || x.text == 'Oregon'; });
            // this.states = data;
            console.log("this.states", _this.states);
        });
    };
    //=======================================================================================================
    SendtoloanhomiComponent.prototype.onSubmit = function () {
        var _this = this;
        this.disbaleSubmitBtn = true;
        // debugger;
        console.log("this.addSendTLoanHomiForm", this.addSendTLoanHomiForm);
        if (this.addSendTLoanHomiForm.valid) {
            this.loadSave = true;
            //this.sendToLoanHomiDataModel.OpportunityId = this.opportunityId;
            //this.sendToLoanHomiDataModel.ProposalId = this.resultData[0].ProposalId;
            //this.sendToLoanHomiDataModel.ContactId = this.resultData[0].ContactId;
            //this.sendToLoanHomiDataModel.AccountId = this.resultData[0].AccountId;
            //this.sendToLoanHomiDataModel.ContractId = this.resultData[0].ContractId;
            this.sendToLoanHomiDataModel.DealerName = this.dealerName;
            this.sendToLoanHomiDataModel.LoanProductId = this.addSendTLoanHomiForm.value.LoanProductId;
            // this.sendToLoanHomiDataModel.loanProduct = this.addSendTLoanHomiForm.value.loanProduct;
            this.sendToLoanHomiDataModel.InstallerRepNameId = this.addSendTLoanHomiForm.value.installerRepNameId;
            this.sendToLoanHomiDataModel.Term = this.addSendTLoanHomiForm.value.term;
            this.sendToLoanHomiDataModel.country = this.addSendTLoanHomiForm.value.country;
            this.sendToLoanHomiDataModel.BillingState = this.addSendTLoanHomiForm.value.state;
            this.sendToLoanHomiDataModel.BillingCity = this.addSendTLoanHomiForm.value.city;
            this.sendToLoanHomiDataModel.MailingState = this.addSendTLoanHomiForm.value.state;
            this.sendToLoanHomiDataModel.MailingCity = this.addSendTLoanHomiForm.value.city;
            this.sendToLoanHomiDataModel.BillingStreet = this.addSendTLoanHomiForm.value.street;
            this.sendToLoanHomiDataModel.BillingPostalCode = this.addSendTLoanHomiForm.value.postalCode;
            this.sendToLoanHomiDataModel.System_Size_kW = this.addSendTLoanHomiForm.value.systemSizeKW;
            this.sendToLoanHomiDataModel.Total_System_Cost = this.addSendTLoanHomiForm.value.totalSystemCost;
            this.sendToLoanHomiDataModel.Downpayment_Amount = this.addSendTLoanHomiForm.value.downpaymentAmount;
            this.sendToLoanHomiDataModel.Loan_Amount = this.addSendTLoanHomiForm.value.loanAmount;
            this.sendToLoanHomiDataModel.Owntheproperty = this.addSendTLoanHomiForm.value.ownthePropertyID;
            this.sendToLoanHomiDataModel.NoofMortgages = this.addSendTLoanHomiForm.value.noOfMortgages;
            this.sendToLoanHomiDataModel.FirstName = this.addSendTLoanHomiForm.value.firstName;
            this.sendToLoanHomiDataModel.LastName = this.addSendTLoanHomiForm.value.lastName;
            this.sendToLoanHomiDataModel.Phone = this.addSendTLoanHomiForm.value.phone;
            this.sendToLoanHomiDataModel.MobilePhone = this.addSendTLoanHomiForm.value.mobile;
            this.sendToLoanHomiDataModel.Email = this.addSendTLoanHomiForm.value.email;
            this.sendToLoanHomiDataModel.SSN = this.addSendTLoanHomiForm.value.ssn;
            this.sendToLoanHomiDataModel.DOB = this.addSendTLoanHomiForm.value.dateofBirth == null ? this.addSendTLoanHomiForm.value.dateofBirth : moment__WEBPACK_IMPORTED_MODULE_8___default()(this.dateofBirth.value).format('MM-DD-YYYY'); //this.addSendTLoanHomiForm.value.dateofBirth
            this.sendToLoanHomiDataModel.YearsACA = this.addSendTLoanHomiForm.value.yearsAtCurrentResidence;
            this.sendToLoanHomiDataModel.MonthsACA = this.addSendTLoanHomiForm.value.monthsatCurrentResidence;
            this.sendToLoanHomiDataModel.PYearACR = this.addSendTLoanHomiForm.value.yearsAtPreviousResidence;
            this.sendToLoanHomiDataModel.PMonthACR = this.addSendTLoanHomiForm.value.monthsatPreviousResidence;
            this.sendToLoanHomiDataModel.PRcountry = this.addSendTLoanHomiForm.value.PRcountry;
            this.sendToLoanHomiDataModel.PRstate = this.addSendTLoanHomiForm.value.PRstate;
            this.sendToLoanHomiDataModel.PRCity = this.addSendTLoanHomiForm.value.PRCity;
            this.sendToLoanHomiDataModel.PRStreet = this.addSendTLoanHomiForm.value.PRStreet;
            this.sendToLoanHomiDataModel.PRPostalCode = this.addSendTLoanHomiForm.value.PRPostalCode;
            this.sendToLoanHomiDataModel.PHousingStatus = this.addSendTLoanHomiForm.value.PHousingStatus;
            this.sendToLoanHomiDataModel.EmployerType = this.addSendTLoanHomiForm.value.employementTypeID;
            this.sendToLoanHomiDataModel.Employer = this.addSendTLoanHomiForm.value.employerName;
            this.sendToLoanHomiDataModel.YearsACE = this.addSendTLoanHomiForm.value.yearsAtCurrentEmployement;
            this.sendToLoanHomiDataModel.MonthsACE = this.addSendTLoanHomiForm.value.monthsAtCurrentEmployement;
            this.sendToLoanHomiDataModel.PEmployerName = this.addSendTLoanHomiForm.value.previousEmployerName;
            this.sendToLoanHomiDataModel.POccupation = this.addSendTLoanHomiForm.value.previousOccupation;
            this.sendToLoanHomiDataModel.PYearsACE = this.addSendTLoanHomiForm.value.yearsAtPreviousEmployement;
            this.sendToLoanHomiDataModel.PMonthsACE = this.addSendTLoanHomiForm.value.monthsAtPreviousEmployement;
            this.sendToLoanHomiDataModel.IncomeFreq = this.addSendTLoanHomiForm.value.lstIncomeFrequencyID;
            this.sendToLoanHomiDataModel.Income = this.addSendTLoanHomiForm.value.income;
            this.sendToLoanHomiDataModel.OIncomeFreq = this.addSendTLoanHomiForm.value.otherIncomeFrequencyID;
            this.sendToLoanHomiDataModel.OIncomeMonthly = this.addSendTLoanHomiForm.value.otherIncome;
            this.sendToLoanHomiDataModel.OIncomeSource = this.addSendTLoanHomiForm.value.otherIncomeSource;
            this.sendToLoanHomiDataModel.GrossIncome = this.addSendTLoanHomiForm.value.grossIncome;
            this.sendToLoanHomiDataModel.Occupation = this.addSendTLoanHomiForm.value.occupation;
            this.sendToLoanHomiDataModel.coFirstname = this.addSendTLoanHomiForm.value.coApp_firstName;
            this.sendToLoanHomiDataModel.coLastname = this.addSendTLoanHomiForm.value.coApp_lastName;
            this.sendToLoanHomiDataModel.coPhone = this.addSendTLoanHomiForm.value.coApp_phone;
            this.sendToLoanHomiDataModel.coMobilePhone = this.addSendTLoanHomiForm.value.coApp_mobile;
            this.sendToLoanHomiDataModel.coEmail = this.addSendTLoanHomiForm.value.coApp_email;
            this.sendToLoanHomiDataModel.coSSN = this.addSendTLoanHomiForm.value.coApp_ssn;
            this.sendToLoanHomiDataModel.coDOB = this.addSendTLoanHomiForm.value.coApp_dateofBirth == null ? this.addSendTLoanHomiForm.value.coApp_dateofBirth : moment__WEBPACK_IMPORTED_MODULE_8___default()(this.coApp_dateofBirth.value).format('MM-DD-YYYY');
            this.sendToLoanHomiDataModel.coApp_country = this.addSendTLoanHomiForm.value.coApp_country;
            //this.sendToLoanHomiDataModel.coState = this.addSendTLoanHomiForm.value.coState;
            this.sendToLoanHomiDataModel.coMailingState = this.addSendTLoanHomiForm.value.coAppstate;
            // this.sendToLoanHomiDataModel.coCity = this.addSendTLoanHomiForm.value.coApp_city; 
            this.sendToLoanHomiDataModel.coMailingCity = this.addSendTLoanHomiForm.value.coApp_city;
            //this.sendToLoanHomiDataModel.coStreetName = this.addSendTLoanHomiForm.value.coApp_street;
            this.sendToLoanHomiDataModel.coMailingStreet = this.addSendTLoanHomiForm.value.coApp_street;
            this.sendToLoanHomiDataModel.coMailingPostalCode = this.addSendTLoanHomiForm.value.coApp_postalCode;
            this.sendToLoanHomiDataModel.coOccupation = this.addSendTLoanHomiForm.value.coApp_occupation;
            this.sendToLoanHomiDataModel.coYearsACE = this.addSendTLoanHomiForm.value.coApp_yearsAtCurrentEmployement;
            this.sendToLoanHomiDataModel.coMonthsACE = this.addSendTLoanHomiForm.value.coApp_monthsAtCurrentEmployement;
            this.sendToLoanHomiDataModel.coEmployerType = this.addSendTLoanHomiForm.value.coApp_employementTypeID;
            this.sendToLoanHomiDataModel.coEmployer = this.addSendTLoanHomiForm.value.coApp_employerName;
            this.sendToLoanHomiDataModel.coIncomeFreq = this.addSendTLoanHomiForm.value.coApp_incomeFrequency;
            this.sendToLoanHomiDataModel.CoIncome = this.addSendTLoanHomiForm.value.coApp_income;
            this.sendToLoanHomiDataModel.CoOIncomeFreq = this.addSendTLoanHomiForm.value.coApp_otherIncomeFrequency;
            this.sendToLoanHomiDataModel.coOIncome = this.addSendTLoanHomiForm.value.coApp_otherIncome;
            this.sendToLoanHomiDataModel.coOIncomeSource = this.addSendTLoanHomiForm.value.coApp_otherIncomeSource;
            this.sendToLoanHomiDataModel.coGrossIncome = this.addSendTLoanHomiForm.value.coApp_grossIncome;
            //this.sendToLoanHomiDataModel.CustomerSignedDate = this.resultData[0].CustomerSignedDate;
            if (this.addSendTLoanHomiForm.value.IsCoApplicantRequired == null) {
                this.sendToLoanHomiDataModel.Iscoapplicant = false;
            }
            else {
                this.sendToLoanHomiDataModel.Iscoapplicant = this.addSendTLoanHomiForm.value.IsCoApplicantRequired;
            }
            this.sendToLoanHomiDataModel.AutoPayment = this.addSendTLoanHomiForm.value.isAutoPaymentcheckBox;
            if (this.sendToLoanHomiDataModel.CustomerSignedDate == null || this.sendToLoanHomiDataModel.CustomerSignedDate == "") {
                this.sendToLoanHomiDataModel.IsDocsSigned = 0;
            }
            else {
                this.sendToLoanHomiDataModel.IsDocsSigned = 1;
            }
            this.sendToLoanHomiDataModel.isBorrowers = this.addSendTLoanHomiForm.value.isBorrowers == "" ? false : true;
            ;
            this.sendToLoanHomiDataModel.coPEmployerName = this.addSendTLoanHomiForm.value.coApp_previousEmployerName;
            this.sendToLoanHomiDataModel.coPOccupation = this.addSendTLoanHomiForm.value.coApp_previousOccupation;
            this.sendToLoanHomiDataModel.coPYearsACE = this.addSendTLoanHomiForm.value.coApp_yearsAtPreviousEmployement;
            this.sendToLoanHomiDataModel.coPMonthsACE = this.addSendTLoanHomiForm.value.coApp_monthsAtPreviousEmployement;
            this.sendToLoanHomiDataModel.coYearsACA = this.addSendTLoanHomiForm.value.coApp_yearsAtCurrentResidence;
            this.sendToLoanHomiDataModel.coMonthsACA = this.addSendTLoanHomiForm.value.coApp_monthsAtCurrentResidence;
            this.sendToLoanHomiDataModel.coPYearACR = this.addSendTLoanHomiForm.value.coApp_yearsAtPreviousResidence;
            this.sendToLoanHomiDataModel.coPMonthACR = this.addSendTLoanHomiForm.value.coApp_monthsatPreviousResidence;
            this.sendToLoanHomiDataModel.coPRcountry = this.addSendTLoanHomiForm.value.coApp_PRcountry;
            this.sendToLoanHomiDataModel.coPRstate = this.addSendTLoanHomiForm.value.coApp_PRstate;
            this.sendToLoanHomiDataModel.coPRCity = this.addSendTLoanHomiForm.value.coApp_PRCity;
            this.sendToLoanHomiDataModel.coPRStreet = this.addSendTLoanHomiForm.value.coApp_PRStreet;
            this.sendToLoanHomiDataModel.coPRPostalCode = this.addSendTLoanHomiForm.value.coApp_PRPostalCode;
            this.sendToLoanHomiDataModel.CoPHousingStatus = this.addSendTLoanHomiForm.value.CoPHousingStatus;
            this.sendToLoanHomiDataModel.OppOwnerId = this.addSendTLoanHomiForm.value.installerRepNameId;
            this.sendToLoanHomiDataModel.CreatedBy = this.addSendTLoanHomiForm.value.installerRepNameId;
            this.sendToLoanHomiPreviewDetail = this.sendToLoanHomiDataModel;
            if (this.sendToLoanHomiPreviewDetail.LoanProductId != null && this.sendToLoanHomiPreviewDetail.LoanProductId != 0) {
                var valLoanProduct = void 0;
                valLoanProduct = this.loanProductList.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.LoanProductId; });
                this.sendToLoanHomiPreviewDetail.LoanProductId = valLoanProduct[0].text;
            }
            debugger;
            if (this.sendToLoanHomiPreviewDetail.country != null && this.sendToLoanHomiPreviewDetail.country != 0) {
                var valcountry = void 0;
                valcountry = this.countryLists.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.country; });
                this.sendToLoanHomiPreviewDetail.country = valcountry[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coApp_country != null && this.sendToLoanHomiPreviewDetail.coApp_country != 0) {
                var valcoApp_country = void 0;
                valcoApp_country = this.countryLists.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coApp_country; });
                this.sendToLoanHomiPreviewDetail.coApp_country = valcoApp_country[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.BillingState != null && this.sendToLoanHomiPreviewDetail.BillingState != 0) {
                var valstate = void 0;
                valstate = this.states.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.BillingState; });
                this.sendToLoanHomiPreviewDetail.BillingState = valstate[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coMailingState != null && this.sendToLoanHomiPreviewDetail.coMailingState != 0) {
                var valcostate = void 0;
                valcostate = this.states.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coMailingState; });
                this.sendToLoanHomiPreviewDetail.coMailingState = valcostate[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.Owntheproperty != null && this.sendToLoanHomiPreviewDetail.Owntheproperty != 0) {
                var valOwntheProperty = void 0;
                valOwntheProperty = this.lstowntheProperty.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.Owntheproperty; });
                this.sendToLoanHomiPreviewDetail.Owntheproperty = valOwntheProperty[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.EmployerType != null && this.sendToLoanHomiPreviewDetail.EmployerType != 0) {
                var valEmployerType = void 0;
                valEmployerType = this.lstemployementType.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.EmployerType; });
                this.sendToLoanHomiPreviewDetail.EmployerType = valEmployerType[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.IncomeFreq != null && this.sendToLoanHomiPreviewDetail.IncomeFreq != 0) {
                var valIncomeFreq = void 0;
                valIncomeFreq = this.lstIncomeFrequency.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.IncomeFreq; });
                this.sendToLoanHomiPreviewDetail.IncomeFreq = valIncomeFreq[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.OIncomeFreq != null && this.sendToLoanHomiPreviewDetail.OIncomeFreq != 0) {
                var valOIncomeFreq = void 0;
                valOIncomeFreq = this.lstIncomeFrequency.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.OIncomeFreq; });
                this.sendToLoanHomiPreviewDetail.OIncomeFreq = valOIncomeFreq[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coIncomeFreq != null && this.sendToLoanHomiPreviewDetail.coIncomeFreq != 0) {
                var valcoIncomeFreq = void 0;
                valcoIncomeFreq = this.lstIncomeFrequency.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coIncomeFreq; });
                this.sendToLoanHomiPreviewDetail.coIncomeFreq = valcoIncomeFreq[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.CoOIncomeFreq != null && this.sendToLoanHomiPreviewDetail.CoOIncomeFreq != 0) {
                var valCoOIncomeFreq = void 0;
                valCoOIncomeFreq = this.lstIncomeFrequency.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.CoOIncomeFreq; });
                this.sendToLoanHomiPreviewDetail.CoOIncomeFreq = valCoOIncomeFreq[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coEmployerType != null && this.sendToLoanHomiPreviewDetail.coEmployerType != 0) {
                var valCoEmployerType = void 0;
                valCoEmployerType = this.lstemployementType.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coEmployerType; });
                this.sendToLoanHomiPreviewDetail.coEmployerType = valCoEmployerType[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.PRcountry != null && this.sendToLoanHomiPreviewDetail.PRcountry != 0) {
                var valPRcountry = void 0;
                valPRcountry = this.countryLists.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.PRcountry; });
                this.sendToLoanHomiPreviewDetail.PRcountry = valPRcountry[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.PRstate != null && this.sendToLoanHomiPreviewDetail.PRstate != 0) {
                var valPRstate = void 0;
                valPRstate = this.states.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.PRstate; });
                this.sendToLoanHomiPreviewDetail.PRstate = valPRstate[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.PHousingStatus != null && this.sendToLoanHomiPreviewDetail.PHousingStatus != 0) {
                debugger;
                var valPHousingStatus = void 0;
                valPHousingStatus = this.lstprevHousingStatus.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.PHousingStatus; });
                this.sendToLoanHomiPreviewDetail.PHousingStatus = valPHousingStatus[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coPRcountry != null && this.sendToLoanHomiPreviewDetail.coPRcountry != 0) {
                var valcoPRcountry = void 0;
                valcoPRcountry = this.countryLists.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coPRcountry; });
                this.sendToLoanHomiPreviewDetail.coPRcountry = valcoPRcountry[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coPRstate != null && this.sendToLoanHomiPreviewDetail.coPRstate != 0) {
                var valcoPRstate = void 0;
                valcoPRstate = this.states.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coPRstate; });
                this.sendToLoanHomiPreviewDetail.coPRstate = valcoPRstate[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.CoPHousingStatus != null && this.sendToLoanHomiPreviewDetail.CoPHousingStatus != 0) {
                var valCoPHousingStatus = void 0;
                valCoPHousingStatus = this.lstprevHousingStatus.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.CoPHousingStatus; });
                this.sendToLoanHomiPreviewDetail.CoPHousingStatus = valCoPHousingStatus[0].text;
            }
            debugger;
            if (this.sendToLoanHomiPreviewDetail.AutoPayment == true) {
                this.AutoPaymentStatus = 'Yes';
            }
            if (this.sendToLoanHomiPreviewDetail.AutoPayment == false) {
                this.AutoPaymentStatus = 'No';
            }
            var input1 = new FormData();
            console.log("asdasdasd", this.fileInput);
            this.fileInput1 = this.fileInput;
            debugger;
            this.showAddSendTLoanHomiForm = false;
            this.showPreviewSendTLoanHomiForm = true;
            this.loadSave = false;
            //debugger;
            //this.jsonData.FormJsonData = JSON.stringify(this.sendToLoanHomiDataModel);
            //console.log("this.jsonData.FormJsonData", this.jsonData.FormJsonData);
            //this.sendToLoanHomiService.saveData(this.jsonData).subscribe((result: any) => {
            //  debugger;
            //  var resultdata = JSON.parse(result);
            //  console.log("asdasdasdasd", resultdata);
            //  this.rUserName = resultdata.UserName;
            //  this.rDataLoanAppId = resultdata.LoanAppId;
            //  this.creditScoreCategory = resultdata.creditScoreCategory;
            //  this.IncomeVerificationValue = resultdata.IncomeVerificationValue;
            //  this.mandatoryDocuments = resultdata.MandatoryDocuments;
            //  if (resultdata.Code == null || resultdata.Code == "") {
            //    this.toaster.error("Something went wrong please contact administrator.");
            //    this.loadSave = false;
            //    return false;
            //  }
            //  if (resultdata.Code != "Failure") {
            //    if (resultdata.applicationStatus == "Failed") {
            //     // this.openPopupSendToLoanHomi.hide();
            //      this.waringPopup.show();
            //      this.loadSave = false;
            //    }
            //    else {
            //      //this.openPopupSendToLoanHomi.hide();
            //      this.responsePopUp.show();
            //      this.loadSave = false;
            //    }
            //  }
            //  else {
            //    this.toaster.error(resultdata.StatusCode);
            //    this.loadSave = false;
            //    return false;
            //  }
            //this.loadSave = false;
            //}, error => {
            //  this.loadSave = false;
            //});
        }
        else {
            for (var _i = 0, _a = Object.keys(this.addSendTLoanHomiForm.controls); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.addSendTLoanHomiForm.controls[key].invalid) {
                    var invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
                    console.log("sddasd", invalidControl);
                    invalidControl.focus();
                    break;
                }
            }
            this.commonService.validateAllFormFields(this.addSendTLoanHomiForm);
        }
        //=========================================================================================================
    };
    SendtoloanhomiComponent.prototype.onBack = function () {
        this.showPreviewSendTLoanHomiForm = false;
        this.showAddSendTLoanHomiForm = true;
        this.loadSave = false;
    };
    SendtoloanhomiComponent.prototype.onPrevSubmit = function () {
        var _this = this;
        debugger;
        this.disbaleSubmitBtn = false;
        this.loadSave = true;
        this.sendToLoanHomiPreviewDetail.country = this.addSendTLoanHomiForm.value.country;
        this.sendToLoanHomiDataModel.coApp_country = this.addSendTLoanHomiForm.value.coApp_country;
        this.sendToLoanHomiDataModel.PRcountry = this.addSendTLoanHomiForm.value.PRcountry;
        this.sendToLoanHomiDataModel.coPRcountry = this.addSendTLoanHomiForm.value.coApp_PRcountry;
        this.sendToLoanHomiDataModel.BillingState = this.addSendTLoanHomiForm.value.state;
        this.sendToLoanHomiDataModel.coMailingState = this.addSendTLoanHomiForm.value.coAppstate;
        this.sendToLoanHomiPreviewDetail.PRstate = this.addSendTLoanHomiForm.value.PRstate;
        this.sendToLoanHomiPreviewDetail.PHousingStatus = this.addSendTLoanHomiForm.value.PHousingStatus;
        this.sendToLoanHomiPreviewDetail.coPRstate = this.addSendTLoanHomiForm.value.coApp_PRstate;
        this.sendToLoanHomiDataModel.LoanProductId = this.addSendTLoanHomiForm.value.LoanProductId;
        this.sendToLoanHomiDataModel.EmployerType = this.addSendTLoanHomiForm.value.employementTypeID;
        this.sendToLoanHomiDataModel.coEmployerType = this.addSendTLoanHomiForm.value.coApp_employementTypeID;
        this.sendToLoanHomiPreviewDetail.CoPHousingStatus = this.addSendTLoanHomiForm.value.CoPHousingStatus;
        debugger;
        this.jsonData.FormJsonData = JSON.stringify(this.sendToLoanHomiDataModel);
        console.log("this.jsonData.FormJsonData", this.jsonData.FormJsonData);
        this.sendToLoanHomiService.saveData(this.jsonData).subscribe(function (result) {
            debugger;
            var resultdata = JSON.parse(result);
            console.log("asdasdasdasd", resultdata);
            _this.loanAppId = resultdata.LoanAppAutoId;
            _this.accountId = resultdata.accountId;
            _this.rUserName = resultdata.UserName;
            _this.rDataLoanAppId = resultdata.LoanAppId;
            _this.creditScoreCategory = resultdata.creditScoreCategory;
            _this.IncomeVerificationValue = resultdata.IncomeVerificationValue;
            _this.mandatoryDocuments = resultdata.MandatoryDocuments;
            //============Save Pdf File================================
            if (_this.fileName != 'Install Agreement') {
                debugger;
                var companySetupModel = _this.prepareFormDataForDocument();
                _this.dashboardService.addOrUpdateUploadFileOnAzzureNoAuth(companySetupModel).subscribe(function (result) {
                    setTimeout(function () {
                        if (result.statusCode === 200) {
                            debugger;
                            //this.toaster.success('Document has been uploaded successfully');
                            _this.fileInput.nativeElement.value = "";
                            _this.fileName = 'Install Agreement';
                        }
                        else {
                            _this.toaster.error(result.responseMessage);
                        }
                        _this.loadSave = false;
                    }, 3000);
                }, function (error) {
                    _this.loadSave = false;
                });
            }
            //=========================================================
            if (resultdata.Code == null || resultdata.Code == "") {
                _this.toaster.error("Something went wrong please contact administrator.");
                _this.loadSave = false;
                return false;
            }
            if (resultdata.Code != "Failure") {
                if (resultdata.applicationStatus == "Failed") {
                    // this.openPopupSendToLoanHomi.hide();
                    _this.waringPopup.show();
                    _this.loadSave = false;
                }
                else {
                    //this.openPopupSendToLoanHomi.hide();
                    _this.responsePopUp.show();
                    _this.loadSave = false;
                }
            }
            else {
                _this.toaster.error(resultdata.StatusCode);
                _this.loadSave = false;
                return false;
            }
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    SendtoloanhomiComponent.prototype.checkAge = function (control) {
        var value = control.value;
        console.log("value", value);
        if (value != null && value != "") {
            var selectedDate = moment__WEBPACK_IMPORTED_MODULE_8___default()(value, 'MM/DD/YYYY');
            console.log("selectedDate", selectedDate);
            var today = moment__WEBPACK_IMPORTED_MODULE_8___default()();
            console.log("today", today);
            var years = today.diff(selectedDate, 'years');
            console.log("years", years);
            if (years < 18) {
                return { 'lessthan18': true };
            }
        }
        else {
            return { 'required': true };
        }
        return null;
    };
    SendtoloanhomiComponent.prototype.allowPDF = function ($event) {
        debugger;
        this.commonService.uploadPDFFileValidator($event);
        if (this.commonService.isUploadFileValid == true) {
            this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "20MB");
            if (this.commonService.isFileValid) {
                this.fileName = $event.target.files[0].name;
                this.fileExtension = this.fileName.replace(/^.*\./, '');
            }
        }
        else {
            this.fileName = 'Install Agreement';
        }
    };
    SendtoloanhomiComponent.prototype.clearSelectedpdf = function (element) {
        console.log("ssdasdadadasd", element);
        debugger;
        element.value = "";
        this.fileInput.nativeElement.value = "";
        this.fileName = 'Install Agreement';
    };
    SendtoloanhomiComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        console.log("asdasdasd", this.fileInput1);
        input.append('refid', this.loanAppId);
        input.append('moduleid', '1');
        input.append('submoduleid', 'loanapplication');
        input.append('companyId', '1004');
        input.append('filetype', '1434');
        input.append('documentTitle', 'InstallAgreement');
        input.append('accountid', this.accountId);
        //input.append('companyName', '');
        //input.append('moduleid', '1');
        //input.append('submoduleid', 'loanapplication');
        //input.append('refid', this.loanId);
        // input.append('documentTitle', this.fileNameddlvalue);  
        // input.append('description', this.UploadimageForm.value.description == null ? '' : this.UploadimageForm.value.description);
        //input.append('accountid', this.accid); 
        input.append('fileExtension', this.fileExtension);
        var fileBrowser = this.fileInput1.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            input.append('file', fileBrowser.files[0]);
        }
        debugger;
        return input;
    };
    SendtoloanhomiComponent.prototype.onChangeLoanProduct = function (e) {
        this.term.setValue(e.name);
    };
    SendtoloanhomiComponent.prototype.numberOnly = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode == 46) {
            this.dotCount += 1;
            this.checkNumberOnly = (event.target.value);
            var numericCheck = (event.target.value).toString();
            if (numericCheck.includes('.')) {
                this.dotCount += 1;
            }
            if (this.dotCount > 1) {
                this.dotCount = 0;
                return false;
            }
        }
        if (charCode > 31 && (charCode <= 45 || charCode > 57 || charCode == 47)) {
            return false;
        }
        this.checkNumberOnly = (event.target.value);
        if (this.checkNumberOnly != null) {
            var numeric = (event.target.value).toString();
            if (numeric.includes('.')) {
                var checkNumeric = numeric.split('.');
                if (checkNumeric.length > 2) {
                    return false;
                }
                this.checkString = checkNumeric[1].split('');
                if (this.checkString.length > 1) {
                    // this.toastrService.warning("Invalid value", "Warning");
                    return false;
                }
            }
        }
        this.dotCount = 0;
        return true;
    };
    SendtoloanhomiComponent.prototype.keyPressNo = function (event) {
        var pattern = /[0-9\+\ ]/;
        //const pattern = /[0-9.\+\ ]/; --For decimal
        var inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar) && event.charCode != '0') {
            event.preventDefault();
        }
    };
    SendtoloanhomiComponent.prototype.onFocusOutEvent = function (event) {
        debugger;
        console.log("emailevent", event);
        var pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
        var emailAdd = event.target.value;
        if (emailAdd.match(pattern) != null) {
            this.email.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
            this.email.updateValueAndValidity();
        }
        else {
            this.email.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]);
            this.email.updateValueAndValidity();
        }
        if (emailAdd == '') {
            this.email.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
            this.email.updateValueAndValidity();
        }
        console.log(event.target.value);
        this.CheckExistingEmail(emailAdd);
    };
    SendtoloanhomiComponent.prototype.CheckExistingEmail = function (emailAdd) {
        var _this = this;
        // let appEmail = this.resultData[0].Email;
        //console.log("hngfjgfhjghgfh", appEmail);
        this.opprtunityservice.checkExistingEmailAddress(emailAdd).subscribe(function (result) {
            var resultData = JSON.parse(result.result); //convert strint to json// 
            console.log("resultData", resultData);
            if (resultData) {
                console.log("resultData1[0].FirstName", resultData.FirstName);
            }
            if (result.statusCode == 202) {
                _this.dialogService.existingEmail('Alert', 'Contact is already exists with this Email ID. If you click OK then existing contact details will be updated when you submit this form.').subscribe(function (confirmed) {
                    if (emailAdd == _this.resultData[0].Email) {
                        if (confirmed) { }
                        else {
                            _this.addSendTLoanHomiForm.patchValue({
                                email: ''
                            });
                        }
                    }
                    else {
                        if (confirmed) {
                            //console.log("bbbbbbbbbbb", confirmed); 
                            //console.log("mmmmmmmmmmmm", this.resultData[0].CoappEmail);
                            //if (this.resultData[0].CoappEmail != null)
                            //{
                            //  this.addSendTLoanHomiForm.patchValue({
                            //    coApp_firstName: this.resultData[0].Coappfirstname,
                            //    coApp_lastName: this.resultData[0].Coapplastname,
                            //    coApp_phone: this.resultData[0].CoappPhone,
                            //    coApp_mobile: this.resultData[0].CoappMobilePhone,
                            //    coApp_email: this.resultData[0].CoappEmail
                            //  });
                            //}
                            //else
                            //{
                            //  this.addSendTLoanHomiForm.patchValue({
                            //    coApp_firstName: resultData.FirstName,    
                            //    coApp_lastName: resultData.LastName,
                            //    coApp_phone: resultData.Phone,
                            //    coApp_mobile: resultData.MobilePhone,
                            //    coApp_email: resultData.Email
                            //  });
                            //}
                        }
                        else {
                            console.log("bbbbbbbbbbb", confirmed);
                            console.log("nnnnnnnnnnnnnn", _this.resultData[0].CoappEmail);
                            if (_this.resultData[0].CoappEmail != null) {
                                _this.addSendTLoanHomiForm.patchValue({
                                    //coApp_firstName: this.resultData[0].Coappfirstname,
                                    //coApp_lastName: this.resultData[0].Coapplastname,
                                    //coApp_phone: this.resultData[0].CoappPhone, 
                                    //coApp_mobile: this.resultData[0].CoappMobilePhone,
                                    coApp_email: ''
                                });
                            }
                            else {
                                _this.addSendTLoanHomiForm.patchValue({
                                    //coApp_firstName:'',
                                    //coApp_lastName: '',
                                    //coApp_phone: '',
                                    //coApp_mobile: '',
                                    coApp_email: ''
                                });
                            }
                        }
                    }
                    //else {
                    //  this.userProfileForm.patchValue({ email: this.userProfileForm.value.hdnEmail });
                    //}
                });
            }
        });
    };
    SendtoloanhomiComponent.prototype.termCheck = function (event) {
        if (event == 'B') {
            this.isTermCheckBox.setValue(null);
            this.isTermCheckBox.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
            this.isTermCheckBox.updateValueAndValidity();
        }
        else {
            this.isTermCheckBox.setValue(true);
            this.isTermCheckBox.clearValidators();
            this.isTermCheckBox.updateValueAndValidity();
        }
    };
    SendtoloanhomiComponent.prototype.borrowersCheck = function (event) {
        if (event == 'B') {
            this.isBorrowers.setValue(null);
            this.isBorrowers.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
            this.isBorrowers.updateValueAndValidity();
        }
        else {
            this.isBorrowers.setValue(true);
            this.isBorrowers.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
            this.isBorrowers.updateValueAndValidity();
        }
    };
    SendtoloanhomiComponent.prototype.closeWaringPopup = function () {
        debugger;
        this.loadSave = true;
        this.waringPopup.hide();
        this.showPreviewSendTLoanHomiForm = false;
        //this.fileInput.nativeElement.value = ""; 
        this.addSendTLoanHomiForm.reset();
        this.isAutoPaymentcheckBox.setValue(1);
        //this.ngOnInit();
        this.showAddSendTLoanHomiForm = true;
        if (this.fileName != "Install Agreement") {
            // this.fileInput.nativeElement.value = "";
            this.fileName = 'Install Agreement';
        }
        this.loadSave = false;
    };
    SendtoloanhomiComponent.prototype.closeResponsePopup = function () {
        debugger;
        this.loadSave = true;
        this.responsePopUp.hide();
        //this.fileInput.nativeElement.value = "";
        this.addSendTLoanHomiForm.reset();
        this.isAutoPaymentcheckBox.setValue(1);
        this.showPreviewSendTLoanHomiForm = false;
        // this.ngOnInit();
        this.showAddSendTLoanHomiForm = true;
        if (this.fileName != 'Install Agreement') {
            //this.fileInput.nativeElement.value = "";
            this.fileName = 'Install Agreement';
        }
        this.loadSave = false;
    };
    SendtoloanhomiComponent.prototype.clearForm = function () {
        debugger;
        this.loadSave = true;
        this.fileInput;
        this.addSendTLoanHomiForm.reset();
        this.isAutoPaymentcheckBox.setValue(1);
        if (this.fileInput.nativeElement.value != "") {
            this.fileInput.nativeElement.value = "";
            this.fileName = 'Install Agreement';
        }
        this.loadSave = false;
    };
    SendtoloanhomiComponent.prototype.onFocusOutSSN = function (event) {
        debugger;
        console.log("event", event);
        debugger;
        var SSN_No = event.target.value;
        var SSN_NoLength = SSN_No.length;
        console.log("SSN_No", SSN_No);
        console.log("SSN_NoLength", SSN_NoLength);
        //control.value.toString().length
        if (SSN_No.length < 9) {
            this.ssn.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
            this.ssn.updateValueAndValidity();
            this.isSSNValidate = true;
        }
        else {
            this.ssn.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator]);
            this.ssn.updateValueAndValidity();
            this.isSSNValidate = false;
        }
    };
    SendtoloanhomiComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _sendtoloanhomi_service__WEBPACK_IMPORTED_MODULE_1__["SendtoloanhomiService"] },
        { type: _opportunity_opportunitylist_service__WEBPACK_IMPORTED_MODULE_9__["OpportunityListService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _manageuser_addedituser_service__WEBPACK_IMPORTED_MODULE_7__["ManageUserService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["DecimalPipe"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"] },
        { type: src_app_views_managemodules_modules_service__WEBPACK_IMPORTED_MODULE_12__["ModulesService"] },
        { type: _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_13__["DashboardService"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["Title"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], SendtoloanhomiComponent.prototype, "fileInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('WaringPopup', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], SendtoloanhomiComponent.prototype, "waringPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ResponsePopup', { static: false }),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_10__["ModalDirective"])
    ], SendtoloanhomiComponent.prototype, "responsePopUp", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('htmlbody', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], SendtoloanhomiComponent.prototype, "body", void 0);
    SendtoloanhomiComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sendtoloanhomi',
            template: __importDefault(__webpack_require__(/*! raw-loader!./sendtoloanhomi.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/sendtoloanhomi/sendtoloanhomi.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./sendtoloanhomi.component.scss */ "./src/app/views/sendtoloanhomi/sendtoloanhomi.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _sendtoloanhomi_service__WEBPACK_IMPORTED_MODULE_1__["SendtoloanhomiService"],
            _opportunity_opportunitylist_service__WEBPACK_IMPORTED_MODULE_9__["OpportunityListService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _manageuser_addedituser_service__WEBPACK_IMPORTED_MODULE_7__["ManageUserService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["DecimalPipe"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"],
            src_app_views_managemodules_modules_service__WEBPACK_IMPORTED_MODULE_12__["ModulesService"],
            _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_13__["DashboardService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["Title"]])
    ], SendtoloanhomiComponent);
    return SendtoloanhomiComponent;
}());



/***/ }),

/***/ "./src/app/views/sendtoloanhomi/sendtoloanhomi.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/sendtoloanhomi/sendtoloanhomi.module.ts ***!
  \***************************************************************/
/*! exports provided: SendtoloanhomiModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendtoloanhomiModule", function() { return SendtoloanhomiModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _sendtoloanhomi_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sendtoloanhomi.component */ "./src/app/views/sendtoloanhomi/sendtoloanhomi.component.ts");
/* harmony import */ var _sendtoloanhomi_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sendtoloanhomi-routing.module */ "./src/app/views/sendtoloanhomi/sendtoloanhomi-routing.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








var SendtoloanhomiModule = /** @class */ (function () {
    function SendtoloanhomiModule() {
    }
    SendtoloanhomiModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DecimalPipe"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["Title"]],
            declarations: [_sendtoloanhomi_component__WEBPACK_IMPORTED_MODULE_4__["SendtoloanhomiComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _sendtoloanhomi_routing_module__WEBPACK_IMPORTED_MODULE_5__["SendtoloanhomiRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__["ModalModule"]
            ]
        })
    ], SendtoloanhomiModule);
    return SendtoloanhomiModule;
}());



/***/ }),

/***/ "./src/app/views/sendtoloanhomi/sendtoloanhomi.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/sendtoloanhomi/sendtoloanhomi.service.ts ***!
  \****************************************************************/
/*! exports provided: SendtoloanhomiService, sendToLoanHomiModel, sendToLoanHomiModelJsonData, Master */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendtoloanhomiService", function() { return SendtoloanhomiService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendToLoanHomiModel", function() { return sendToLoanHomiModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendToLoanHomiModelJsonData", function() { return sendToLoanHomiModelJsonData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Master", function() { return Master; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
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




var SendtoloanhomiService = /** @class */ (function () {
    function SendtoloanhomiService(http) {
        this.http = http;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
        this.masters = [];
    }
    //getInstallerRepNameList(salesRepName): Observable<any> {
    //  return this.http.get(this.baseUri + `opportunity/GetInstallerRepNameList?salesRepName=${salesRepName}`);
    //}
    //getInstallerRepNameList(salesRepName: any): Observable<any> {
    //  return this.http.get(this.baseUri + `opportunity/GetInstallerRepNameList?salesRepName=${salesRepName}`).pipe(
    //    map((response: any) => {
    //      this.masters = response;
    //    })
    //  );
    //}
    SendtoloanhomiService.prototype.getInstallerRepNameList = function (salesRepName) {
        var _this = this;
        return this.http.get(this.baseUri + ("opportunity/GetInstallerRepNameList/" + salesRepName)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.masters = response;
        }));
    };
    SendtoloanhomiService.prototype.GetFileUploadSourceNoAuth = function (file) {
        return this.http.get(this.baseUri + ("Lease/GetFileUploadSourceNoAuth?file=" + file));
    };
    SendtoloanhomiService.prototype.saveData = function (FormJsonData) {
        debugger;
        return this.http.post(this.baseUri + "opportunity/StandAloneSendLoanHomiDetail", FormJsonData);
        //return this.http.post(this.baseUri + `opportunity/ApplicationSendLoanHomiDetail`, FormJsonData);
    };
    SendtoloanhomiService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    SendtoloanhomiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], SendtoloanhomiService);
    return SendtoloanhomiService;
}());

var sendToLoanHomiModel = /** @class */ (function () {
    function sendToLoanHomiModel() {
        this.OpportunityId = 0;
        this.ProposalId = 0;
        this.ContactId = 0;
        this.AccountId = 0;
        this.ContractId = 0;
        this.LoanProductId = 0;
        this.InstallerRepNameId = 0;
        this.OppOwnerId = 0;
        this.Financial_InstitutionId = 0;
        this.loanProduct = "";
        this.DealerName = "";
        this.Term = "";
        this.country = 0;
        this.BillingState = 0;
        this.MailingState = "";
        this.BillingStreet = "";
        this.BillingCity = "";
        this.MailingCity = "";
        this.BillingPostalCode = "";
        this.System_Size_kW = "";
        this.Total_System_Cost = "";
        this.Downpayment_Amount = "";
        this.Loan_Amount = "";
        this.Owntheproperty = ""; //this.ownthePropertyID = "";
        this.NoofMortgages = ""; //this.noOfMortgages = "";
        this.FirstName = "";
        this.LastName = "";
        this.Phone = "";
        this.MobilePhone = "",
            this.Email = "";
        this.SSN = ""; //this.ssn = "";
        this.DOB = "";
        this.YearsACA = ""; //this.yearsAtCurrentResidence = "";
        this.MonthsACA = ""; //this.monthsatCurrentResidence = "";
        this.PYearACR = "";
        this.PMonthACR = "";
        this.PRcountry = "";
        this.PRstate = "";
        this.PRCity = "";
        this.PRStreet = "";
        this.PRPostalCode = "";
        this.PHousingStatus = "";
        this.EmployerType = "";
        this.Employer = "";
        this.YearsACE = ""; //this.yearsAtCurrentEmployement = "";
        this.MonthsACE = ""; //this.monthsAtCurrentEmployement = "";
        this.PEmployerName = "";
        this.coPEmployerName = ""; //this.previousEmployerName = "";
        this.POccupation = ""; //this.previousOccupation = "";
        this.coPOccupation = "";
        this.coPYearsACE = "";
        this.coPMonthsACE = "";
        this.PYearsACE = ""; //this.yearsAtPreviousEmployement = "";
        this.PMonthsACE = ""; //this.monthsAtPreviousEmployement = "";
        this.IncomeFreq = ""; //this.lstIncomeFrequencyID = "";
        this.Income = ""; // this.income = "";
        this.OIncomeFreq = ""; //this.otherIncomeFrequencyID = "";
        this.OIncomeMonthly = 0; //this.otherIncome = "";
        this.OIncomeSource = ""; //this.otherIncomeSource = "";
        this.GrossIncome = ""; //this.grossIncome = "";
        this.Occupation = "";
        this.coFirstname = "";
        this.coLastname = "";
        this.coPhone = "";
        this.coMobilePhone = "";
        this.coEmail = "";
        this.coDINumber = 0;
        this.coSSN = "";
        this.coDOB = "";
        // this.sameAsapplicant = "";
        this.coApp_country = "";
        //this.coState = "";//this.coState = "";
        this.coMailingState = "";
        this.coDLState = "";
        this.coDLStateLabel = "";
        this.coHousingStatus = "";
        //this.coCity = "";//this.coCity = "";
        this.coMailingCity = "";
        //this.coStreetName = "";//this.coStreetName = "";
        this.coMailingStreet = "";
        this.coAptSt = "";
        this.coStreetType = "";
        this.coRuralRoute = "";
        this.coPOBox = "";
        this.coMailingPostalCode = "";
        this.coYearsACA = "";
        this.coMonthsACA = "";
        this.coPYearACR = "";
        this.coPMonthACR = "";
        this.coPRcountry = "";
        this.coPRstate = "";
        this.coPRCity = "";
        this.coPRStreet = "";
        this.coPRPostalCode = "";
        this.CoPHousingStatus = "";
        this.coRentMortage = "";
        this.coBusinessPhone = 0;
        this.coOccupation = "";
        this.coYearsACE = ""; //
        this.coMonthsACE = ""; //
        this.coEmployerType = "";
        this.coEmployer = "";
        this.CoOIncomeFreq = ""; //this.coIncomeFreq = "";
        this.coIncomeFreq = "";
        this.CoIncome = ""; //this.coApp_income = "";
        this.coOIncome = ""; // this.coApp_otherIncome = "";
        this.coOIncomeSource = ""; //this.coApp_otherIncomeSource = "";
        this.coGrossIncome = "";
        this.Iscoapplicant = false; //this.IsCoApplicantRequired =false;
        this.AutoPayment = true; //this.isAutoPaymentcheckBox = false;
        this.IsDocsSigned = 0; //this.isTermCheckBox = false;
        this.CustomerSignedDate = "";
        this.isBorrowers = false;
        this.IsOE = false;
        this.coIsOE = false;
        this.CreatedAt = "";
        this.UpdatedAt = "";
        this.ReqFrom = "StandAlone";
        this.CompanyId = 0;
        this.CreatedBy = "";
        this.SIN = "";
    }
    ;
    return sendToLoanHomiModel;
}());

var sendToLoanHomiModelJsonData = /** @class */ (function () {
    function sendToLoanHomiModelJsonData() {
        this.FormJsonData = "";
    }
    return sendToLoanHomiModelJsonData;
}());

var Master = /** @class */ (function () {
    function Master() {
        this.masterId = '';
        this.masterNameId = null;
        this.masterName = '';
        this.masterNames = '';
        this.masterKey = '';
        this.masterValue = '';
        this.masterStatusId = null;
        this.masterStatusName = '';
        this.enabled = true;
        this.isActive = '';
        this.masterIsDeleted = false;
        this.masterDescription = '';
    }
    return Master;
}());



/***/ })

}]);
//# sourceMappingURL=views-sendtoloanhomi-sendtoloanhomi-module.js.map