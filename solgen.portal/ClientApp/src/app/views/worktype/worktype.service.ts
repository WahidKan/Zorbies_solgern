import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from 'ngx-bootstrap/positioning/models';
import { strategy } from '@angular-devkit/core/src/experimental/jobs';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WorktypeService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor(private http: HttpClient) { }


  GetWorkTypeListingData(name: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }

    return this.http.get(`${this.baseUri}workorder/GetWorkTypeListingData?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
  }

  addeditWorkTypeRecords(workTypeModel: workTypeModel) 
  {
    debugger;
    if (workTypeModel.id==undefined) {
      workTypeModel.id = null;
    }
    return this.http.post(this.baseUri + `workorder/AddeditWorkTypeRecords`, workTypeModel);
  }
  getEditWorkTypeRecords(id: any) {
    return this.http.get(this.baseUri + `workorder/GetEditWorkTypeRecordsById?Id=${id}`)
  }

  deleteWorkType(id: any) {
    return this.http.get(this.baseUri + `workorder/DeleteWorkType?Id=${id}`)
  }
  AddEditProductRequiredData(productRequiredmodel: productRequiredmodel) {
    return this.http.post(this.baseUri + `workorder/AddEditProductRequiredData`, productRequiredmodel);
  }

  GetProductRequiredGridData(workTypeId: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    ;
    return this.http.get(`${this.baseUri}workorder/GetProductRequiredGridData?workTypeId=${workTypeId}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
  }
  DeleteRecords(deleteId: any, tableName: any, ) {
    return this.http.get(this.baseUri + `common/DeleteRecords?primaryKey=${deleteId}&tableName=${tableName}`)
  }
  getSkillRequirementsGridData(sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUri}workorder/GetSkillRequirementsGridData?sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
  }

  AddEditskillRequirementsData(skillRequirementsDatamodel: skillRequirementsmodel) {
    ;
    return this.http.post(this.baseUri + `workorder/AddEditskillRequirementsData`, skillRequirementsDatamodel);
  }
} 


export class workTypeModel {
  id: string;
  workTypeName: string;
  description: string;
  serviceReportTemplate: string;
  isAutoCreateServiceAppointment: boolean;
  dueDateOffset: number;
  isExactAppointments: boolean;
  minimumCrewSize: number;
  estimatedDuration: string;
  maxDuration:string
  recommendedCrewSize: number;
  durationTypeId: string;
  constructionStageId: string;
  isHoldsUpInstall: boolean;
  workOrderLineTemplate: string;
  ownerName: string;
  createWorkOrdersOnContractClose: boolean;
  commissionTypeId: string;
  commissionValue: string;
  colorCode: string;
  isActive: boolean;
  duration:Time;
  createdby:string;
  createdon:string;
  modifiedby:string;
  modifiedon:string;

  constructor() {
    this.id = "";
    this.workTypeName = "";
    this.description = "";
    this.serviceReportTemplate = "";
    this.isAutoCreateServiceAppointment = false;
    this.dueDateOffset =0;
    this.isExactAppointments = false;
    this.minimumCrewSize = 0;
    this.estimatedDuration = "";
    this.maxDuration = "";
    this.recommendedCrewSize = 0;
    this.durationTypeId = "";
    this.constructionStageId = "";
    this.isHoldsUpInstall = false;
    this.workOrderLineTemplate = "";
    this.ownerName = "";
    this.createWorkOrdersOnContractClose = false;
    this.commissionTypeId = "";
    this.commissionValue = "";
    this.colorCode = "";
    this.isActive = false;
    this.duration=null;
    this.createdon="";
    this.createdby="";
    this.modifiedby="";
    this.modifiedon="";
  }
}

export class productRequiredmodel {
  productRequired_id: string;
  parentRecordId: number;
  productRequired: string;
  quantityRequired: string;
  dateDelivered: string;
  quantityUnitOfMeasureId: string;
  constructor() {
    this.productRequired_id = "";
    this.parentRecordId = 0;
    this.productRequired = "";
    this.quantityRequired = "";
    this.dateDelivered = "";
    this.quantityUnitOfMeasureId = "";
  }
}

export class skillRequirementsmodel {
  skillRequirement_id: number;
  requiredFor: number;
  skillRequirement: number;
  skillLevel: number;
  constructor() {
    this.skillRequirement_id = 0;
    this.requiredFor = 0;
    this.skillRequirement = 0;
    this.skillLevel = 0;
  }
}


