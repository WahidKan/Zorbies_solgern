import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadSmsHistoryService {
  public baseUri = `${environment.WebApiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getSmsLogHistory(leadId: number, subModuleName: any)
  {
    return this.http.get(this.baseUri + `appointment/GetSmsLogHistory?leadId=${leadId}&subModuleName=${subModuleName}`)
  }
}
