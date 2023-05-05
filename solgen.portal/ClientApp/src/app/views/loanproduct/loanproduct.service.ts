import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TextboxQuestion, CustomFormBase, DropdownQuestion } from '../shared/custom-field/customfield.service';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Master } from '../shared/common.service';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoanproductService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  customFieldsList: any;
  leadEditPage: any;
  company: Company[] = [];
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  GetCustomFieldsList(modulename: any, submoduleName: any, companyId: any, leadId: any) {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields?moduleName=${modulename}&strType=${submoduleName}&companyId=${companyId}&PrimaryId=${leadId}`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }

  GetLoanProduct(id: any, moduleName: any, submoduleName: any) {
    return this.http.get(this.baseUri + `loanproduct/GetLoanProductById?id=${id}&moduleName=${moduleName}&submoduleName=${submoduleName}`)
      .pipe(
        map((response: any) => {
          this.leadEditPage = response;
          return true;
        })
      );
  }
  getNames() {
    return this.http.get(this.baseUri + `loanproduct/GetCreditBureauMaster/`);
  }
  getPrerequisiteLoanProductDocumentTypeNames(name) {
    return this.http.get(this.baseUri + `loanproduct/GetPrerequisiteLoanProductDocumentTypeNames?masterName=${name}`);
  }
  getGetLoanProductDiscountCategoryNames(name) {
    return this.http.get(this.baseUri + `loanproduct/GetGetLoanProductDiscountCategoryNames?masterName=${name}`);
  }
  getNamesEdit(id) {
    return this.http.get(this.baseUri + `loanproduct/GetCreditBureauMasterEdit?productId=${id}`);
  }
  getPrerequisiteLoanProductEdit(id) {
    return this.http.get(this.baseUri + `loanproduct/GetPrerequisiteLoanProductEdit?productId=${id}`);
  }
  getLoanProductDiscountCategoryEdit(id) {
    return this.http.get(this.baseUri + `loanproduct/GetLoanProductDiscountCategoryEdit?productId=${id}`);
  }
  getSolgenUserForCompany(): Observable<any> {
    return this.http.get(this.baseUri + `loanproduct/GetSolgenUser/`).pipe(
      map((response: any) => {
        this.company = response;

      })
    );
  }
  addOrUpdateManageStatus(loanproductModel: FormData) {
    return this.http.post(this.baseUri + `loanproduct/AddUpdateLoanProduct`, loanproductModel);

  }

  GetLoanProductlist(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, loginuserid: string, custom_view_id: string, searchFilter: string, moduleName: string, submoduleName: string, companyId: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}loanproduct/GetLoanProductlist?nameSearch=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&pageIndex=${page}&pageSize=${pageSize}&userId=${loginuserid}&custom_view_id=${custom_view_id}&searchFilter=${searchFilter}&moduleName=${moduleName}&submoduleName=${submoduleName}&companyId=${companyId}`)
  }
  DeleteRecords(deleteId: any, tableName: any, ) {
    return this.http.get(this.baseUri + `loanproduct/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
      .pipe(
        map((response: any) => {
          this.leadEditPage = response;
          return true;
        })
      );
  }

  AddEditPresiteDocument(model: DocumentModel) {
    return this.http.post(this.baseUri + `loanproduct/SaveLoanproductPresiteDocument`, model);
  }
  UpdatePresiteDocument(model: UpdateDocumentModel) {
    return this.http.post(this.baseUri + `loanproduct/UpdatePresiteDocumentById`, model);
  }

  AddEditDiscountDocument(model: DocumentModel) {
    return this.http.post(this.baseUri + `loanproduct/AddEditDiscountDocument`, model);
  }
  DeletePrerequisite(docId, loanProductId) {
    return this.http.get(this.baseUri + `loanproduct/DeletePrerequisite?docId=${docId}&loanProductId=${loanProductId}`)
  }

  DeleteDiscountCategory(docId, loanProductId) {
    return this.http.get(this.baseUri + `loanproduct/DeleteDiscountCategory?docId=${docId}&loanProductId=${loanProductId}`)
  }
  UpdateLoanPrerequisiteDocumentName(documentName, documentTypeId) {
    return this.http.get(this.baseUri + `loanproduct/UpdateLoanPrerequisiteDocumentName?documentName=${documentName}&documentTypeId=${documentTypeId}`)
  }
  GetEmploymentTypes(): Observable<any> {
    return this.http.get(this.baseUri + `Common/GetEmploymentTypes`)
  }

  buildPrerequisiteDocument(prerequisiteDocument: any = null) {

    let prerequisiteDocumentGroup = this.fb.group({
      documentId: [null],
      documentTypeId: [null],
      documentName: [null, Validators.required],
      isVisible: [false],
      isMandatory: [false],
      employmentType: [null],
      employmentTypeList: this.fb.array([this.buildEmplymentType()]),
    });

    if (prerequisiteDocument) {
      prerequisiteDocumentGroup.patchValue({
        documentId: prerequisiteDocument.documentId,
        documentTypeId: (typeof prerequisiteDocument.documentTypeId !== 'undefined' ? prerequisiteDocument.documentTypeId : null),
          documentName: prerequisiteDocument.documentName,
          isVisible: prerequisiteDocument.visibility,
          isMandatory: prerequisiteDocument.mandatory,
        employmentType: prerequisiteDocument.employmentType
      });
    }

    return prerequisiteDocumentGroup;
  }

  buildEmplymentType(emplymentType: any = null) {    
    let emplymentTypeGroup = this.fb.group({
      name: [null],
      value: [null],
      SelectedValue: [false]
    });

    if (emplymentType) {
      emplymentTypeGroup.patchValue({
        name: emplymentType.name,
        value: emplymentType.value,
        SelectedValue: (emplymentType.SelectedValue == 0 ? false : true)
      });
    }
    return emplymentTypeGroup;
  }
}

export class CreditBureauModel {
  Id: string;
  BureauName: string;
  IsEnableSoftPull: boolean;
  IsEnableHardPull: boolean;

  constructor() {
    this.Id = '';
    this.BureauName = '';
    this.IsEnableSoftPull = false;
    this.IsEnableHardPull = false;
  }
}
export class ManageLoanProductModel {
  moduleId: string;
  subModuleId: string;
  controls: string;
  fieldsData: string;

  constructor() {
    this.moduleId = "";
    this.subModuleId = "";
    this.controls = "";
    this.fieldsData = "";
  }
}
export class Company {
  companyId: string;
  companyName: string;
  constructor() {
    this.companyId = '';
    this.companyName = null;

  }
}
export class DocumentModel {
  documentName: string;
  documentTypeId: string;
  loanProductId: number;
  mandatory: boolean;
  visibility: boolean;
  employmentType: string;
  //CustomerID: string;
  constructor() {
    this.documentName = '';
    this.mandatory = false;

  } 
}

export class UpdateDocumentModel {
  documentName: string;
  mandatory: boolean;
  visibility: boolean;
  documentId: number;
  documentTypeId: number;
  employmentType: string;

}
