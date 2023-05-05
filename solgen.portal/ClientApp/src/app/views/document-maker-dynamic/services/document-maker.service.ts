import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DocumentMakerService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  constructor(private http: HttpClient) { }

  getDocumentMakerList(params): Observable<any> {
    return this.http.get(`${this.baseUri}DocumentMaker/GetDocumentMakerList`, {
      params: {
        filter: params.filter,
        sortColumn: params.sortColumn,
        sortDir: params.sortDir,
        page: params.page,
        pageSize: params.pageSize,
      },
    });
  }

  deleteDocumentMaker(id: string): Observable<any> {
    return this.http.post(`${this.baseUri}DocumentMaker/DeleteDocumentMaker`, null, {
      params: { id },
    });
  }

  getSubModulesList(): Observable<any> {
    return this.http.get(`${this.baseUri}DocumentMaker/GetSubModuleList`);
  }

  getHtmlContentList(): Observable<any> {
    return this.http.get(`${this.baseUri}DocumentMaker/getHtmlContentList`);
  }

  createUpdateDocument(documentObj: any): Observable<any> {
    return this.http.post(`${this.baseUri}DocumentMaker/CreateUpdateDocument`, null, { params: { payload: documentObj } });
  }
  
  VerifyDuplicateName(name: string, id: number) : Observable<any>{
    return this.http.get(`${this.baseUri}DocumentMaker/VerifyDuplicateName?name=${name}&id=${id}`);
  }
  getDocumentById(documentId: any) : Observable<any>{
    return this.http.get(`${this.baseUri}DocumentMaker/GetDocumentById?documentId=${documentId}`);
  }

  getDocumentFields(documentId: any) : Observable<any>{
    return this.http.get(`${this.baseUri}DocumentMaker/GetDocumentFields?documentId=${documentId}`);
  }

  savePlaceHolder(data: any) : Observable<any> {
    return this.http.post(`${this.baseUri}DocumentMaker/SavePlaceHolder`, data);
  }

  deleteMultipleDocuments(documentIds: string) {
    return this.http.get(this.baseUri + `DocumentMaker/DeletedMultipleDocuments?documentsId=${documentIds}`)
  }
  previewFields(model: FormData): Observable<any> {
    return this.http.post(this.baseUri + `DocumentMaker/PreviewFields`, model);
  }
  GetDocumentDetailById(id: any) {
    return this.http.get(`${this.baseUri}DocumentMaker/GetDocumentDetailById?documentId=${id}`);
  }
  previewDocument(list: any) : Observable<any>{
    return this.http.post(`${this.baseUri}DocumentMaker/PreviewDocument`, list);
  }
}
