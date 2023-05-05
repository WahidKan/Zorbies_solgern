import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SearchastypeService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor(private http: HttpClient) { }

  getSearchResult(query: any) {
    return this.http.get(`${this.baseUri}Contact/GetSearchResult?searchType=${query}`);
  }
}
