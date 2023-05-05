import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MangeskillsService {
  public baseUri = `${environment.WebApiBaseUrl}`;

  constructor(private http: HttpClient) { }

  GetManageSkillListingData(name: string, sortColumn: string, sortDir, page: number, pageSize: number): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
    return this.http.get(`${this.baseUri}workorder/GetManageSkillListingData?name=${name}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}`)
  };

  addeditSkill(skillModel: skillModel) {
    return this.http.post(this.baseUri + `workorder/AddEditSkill`, skillModel);
  };

  deleteSkill(id: any) {
    return this.http.get(this.baseUri + `workorder/DeleteSkill?Id=${id}`)
  }
}
export class skillModel {
  Id: string;
  Skill: string;
  SkillLevel: string;
  constructor() {
    this.Id = "";
    this.Skill = "";
    this.SkillLevel = "";
  }
}
