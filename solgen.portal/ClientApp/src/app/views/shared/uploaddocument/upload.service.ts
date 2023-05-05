import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public documentUri = `${environment.WebApiBaseUrl}Document`;
  public documentLeaseUri = `${environment.WebApiBaseUrl}`; 
  pagedData: any;
  constructor(private http: HttpClient) { }


  getDocumentList(sortColumn: any, sortDir: any, pageNumber: any, pageSizeValue: any, contactId: any, isCustomerAllForms: any) {
    return this.http.get(`${this.documentUri}/GetDocumentList?contactId=${contactId}&sortColumn=${sortColumn}&pageNumber=${pageNumber}
&pageSizeValue=${pageSizeValue}&isCustomerAllForms=${isCustomerAllForms}&sortDir=${sortDir}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getLeaseForShortingList(sortColumn: any, sortDir: any, pageNumber: any, pageSizeValue: any, contactId: any, isCustomerAllForms: any) {
    return this.http.get(`${this.documentUri}/GetDocumentList?contactId=${contactId}&sortColumn=${sortColumn}&pageNumber=${pageNumber}
&pageSizeValue=${pageSizeValue}&isCustomerAllForms=${isCustomerAllForms}&sortDir=${sortDir}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  saveDocument(documentModel: FormData) {
    return this.http.post(this.documentUri, documentModel);
  }
  GetvendorTitleRequest(leaseId: any) {
    return this.http.get(`${this.documentLeaseUri}Lease/GetvendorTitleRequestByLeaseId?leaseId=${leaseId}`);
  }
  DeleteDocument(documentId: any) {
    return this.http.get(`${this.documentUri}/DeletedDocumentByDoCumentId?documentId=${documentId}`)
  }

  private initializeDocuments(): Documents {
    // Return an initialized object
    return {
      documentName: null,
      documentFileName: null,
      documentComment: '',
      documentType: null,
      documentUploadedForUser: null,
      documentUploadedBy: null,
     
    };
  }
}
export class Documents {
  documentName: string;
  documentFileName: string;
  documentComment: string;
  documentType: string;
  documentUploadedForUser: string;
  documentUploadedBy: string;

  constructor() {
    this.documentName = '';
    this.documentFileName = '';
    this.documentComment = '';
    this.documentType = '';
    this.documentUploadedForUser = '';
    this.documentUploadedBy = '';
  }
}


export class DocumentName {
  MasterName: string;
  Value: string;
  Text: string;
  constructor() {
    this.Value = "";
    this.Text = "";
    this.MasterName = "";
  }
}
