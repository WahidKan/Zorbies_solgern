import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadCallHistoryService {
  public notesUri = `${environment.WebApiBaseUrl}appointment`;
  pagedData: any;
  pagedDataNewCardView: any;
  constructor(private http: HttpClient) { }

  GetLeadCallHistory(leadId: any,subModuleName: any) {
    return this.http.get(this.notesUri + `/GetLeadCallHistory?leadId=${leadId}&subModuleName=${subModuleName}`)
  }
}
