import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileConfigurationsService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  public SolRuleEngine = `${environment.WebApiBaseUrl}FileConfiguration`;
  public moduleUri = `${environment.WebApiBaseUrl}Modules`;
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  getFileTypeExtensionList() {
    return this.http.get(`${this.baseUri}FileConfiguration/GetFileTypeExtensionList`);
  }
  getFileConfigurationList() {
    return this.http.get(`${this.baseUri}FileConfiguration/GetFileConfigurationList`);
  }
  AddEditFileTypeExtensionConfiguration(data: any) {
    return this.http.post(`${this.baseUri}FileConfiguration/AddEditFileTypeExtensionConfiguration`, data);
  }


}
export class FileConfiguration {
  Id: number;
  Name: string;
  FileSize: number;
  FileTypes: any[];
  FileTypesGroup: FileTypesGroups[];
  constructor() {
    this.Id = null,
      this.FileSize = null,
      this.FileTypesGroup = null,
      this.Name = null
    this.FileTypes = [];
  }
}
export class FileTypesGroups {
  ExtensionId: number;
  Name: string;
  expanded: boolean;
  FileTypes: FileTypes[];
  constructor() {
    this.Name = null,
      this.FileTypes = null,
      this.expanded = true;
  }
}
export class FileTypes {
  ExtensionId: number;
  Id: number;
  IsMapped: boolean;
  Name: string;
  GroupName: string
  constructor() {
    this.ExtensionId = null;
    this.Id = null,
      this.IsMapped = false;
    this.Name = null,
      this.GroupName = null
  }
}