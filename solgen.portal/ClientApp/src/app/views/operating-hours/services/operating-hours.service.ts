import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { id } from '@swimlane/ngx-datatable';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OperatingHoursService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  constructor(private http: HttpClient) {}

  getOperatingHoursList(params): Observable<any> {
    return this.http.get(`${this.baseUri}OperatingHours/GetOperatingHoursList`, {
      params: {
        filter: params.filter,
        sortColumn: params.sortColumn,
        sortDir: params.sortDir,
        page: params.page,
        pageSize: params.pageSize,
      },
    });
  }

  getOperatingHoursById(id): Observable<any> {
    return this.http.get(`${this.baseUri}OperatingHours/GetOperatingHoursById`, {
      params: {
        Id: id,
      },
    });
  }

  addOperatingHours(operatingHours): Observable<any> {
    return this.http.post(`${this.baseUri}OperatingHours/AddEditOperatingHours`, operatingHours);
  }

  deleteOperatingHours(id: string): Observable<any> {
    return this.http.post(`${this.baseUri}OperatingHours/DeleteOperatingHours`, null, {
      params: { id },
    });
  }

  deleteMultipleOperatingHours(ids: string) {
    return this.http.post(`${this.baseUri}OperatingHours/DeleteMultipleOperatingHours`, null, {
      params: { ids },
    });
  }

  deleteOperatingHoursTimeSlot(id: string): Observable<any> {
    return this.http.post(`${this.baseUri}OperatingHours/DeleteOperatingHoursTimeSlot`, null, {
      params: { id },
    });
  }

  checkDuplicateName(name, id) {
    return this.http.get(`${this.baseUri}OperatingHours/CheckOperatingHoursExist?name=${name}&id=${id}`);
  }
}
