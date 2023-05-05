import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class RequirementsService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor(private http: HttpClient) { }


  addeditRequirement(RequirementModel: RequirementModel) {
    ;
    return this.http.post(this.baseUri + `workorder/AddeditRequirement`, RequirementModel);//AddeditRequirement
  }

  GetRequirementListingData(name: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}workorder/GetRequirementListingData?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
  }
  addeditprojectedRequirement(RequirementProjectModel: RequirementProjectModel) {
    ;
    return this.http.post(this.baseUri + `workorder/AddeditProjectRequirement`, RequirementProjectModel);//AddeditRequirement
  }

  GetRequirementDll(id: any, length: any, serchText: string) {
    return this.http.get(`${this.baseUri}workorder/GetRequirementDll?id=${id}&length=${length}&serchText=${serchText}`);
  }

  GetRequirementById(documentId: any): Observable<any> {
    return this.http.get(`${this.baseUri}workorder/GetRequirementById?documentId=${documentId}`);
  }




}



export class RequirementModel {

  Id: string;
  requirementName: string;
  pertainsTo: string;
  recordType: string;
  requiredby: string;
  type: string;
  serviceTerritory: string;
  isActive: string;
  description: string;
  permittingCost: string;
  callforInspection: string;
  approvalDuration: string;
  submitforPTO: string;
  meterInstalled: string;
  approvalReceived: string;
  Notes: string;
  externalID: string;
  Owner: string;
  constructor() {
    this.Id = "";
    this.requirementName = "";
    this.pertainsTo = "";
    this.recordType = "";
    this.requiredby = "";
    this.type = "";
    this.serviceTerritory = "";
    this.isActive = "";
    this.description = "";
    this.permittingCost = "";
    this.callforInspection = "";
    this.approvalDuration = "";
    this.submitforPTO = "";
    this.meterInstalled = "";
    this.approvalReceived = "";
    this.Notes = "";
    this.externalID = "";
    this.Owner = "";
  }

}

export class RequirementProjectModel {

  Id: string;
  requirementName: string;
  requirementStatus: string;
  type: string;
  recordType: string;
  Account: string;
  description: string;
  DateSubmitted: any;
  CompltedDate: any;
  DueDate: any;
  OrginalDueDate: any;
  RequirementId: any;
  TypeId: any;
  Required_By1 : any;
  SGStatusId: any;
  constructor() {
    this.Id = "";
    this.requirementName = "";
    this.requirementStatus = "";
    this.type = "";
    this.recordType = "";
    this.Account = "";
    this.description = "";
    this.DateSubmitted = "";
    this.CompltedDate = "";
    this.DueDate = "";
    this.OrginalDueDate = "";
    this.RequirementId = "";
    this.TypeId = "";
    this.Required_By1  = "";
    this.SGStatusId = "";
   
  }

}


