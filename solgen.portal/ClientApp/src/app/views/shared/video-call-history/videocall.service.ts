import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VideoCallHistoryService {
    public notesUri = `${environment.WebApiBaseUrl}appointment`;
    pagedData: any;
    pagedDataNewCardView: any;
    constructor(private http: HttpClient) { }

    public GetVideoCallHistory(RefId: any, subModuleName: any) {
        return this.http.get(this.notesUri + `/GetVideoCallHistory?RefId=${RefId}&subModuleName=${subModuleName}`)
    }
}