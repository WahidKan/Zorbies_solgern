import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MappingMembersService {

  public mappingLocationUri = `${environment.WebApiBaseUrl}mappinglocation`;
  pagedData: any;
  constructor(private http: HttpClient) { }
  getMappingMembersList(locationId: any, sortColumn: string, sortDir: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.mappingLocationUri}/getMappingMembersList?locationId=${locationId}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page-1}&PageSize=${pageSize}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  DeleteMappingMember(Id: any ) {
    return this.http.get(this.mappingLocationUri + `/DeleteMappingMember?Id=${Id}`)
      
  }
  //chech mate
  saveNewMappingLocation(mappingLocation: JsonData) {
    return this.http.post(this.mappingLocationUri + `/NewMappingLocationSave`,  mappingLocation);
  }
  GetLocationDropdownBasedOnLocationType(id:any) {
    return this.http.get(this.mappingLocationUri + `/GetLocationDropdownBasedOnLocationType?id=${id}`);
  }
}

export class JsonData {
  Id: string;
  FormJsonData: string;
  moduleCode: string;
  subModuleCode: string;
  companyId: string;
  userId: string;
  constructor() {
    this.Id = "";
    this.FormJsonData = "";
    this.moduleCode = "";
    this.subModuleCode = "";
    this.companyId = "";
    this.userId = "";
  }
}