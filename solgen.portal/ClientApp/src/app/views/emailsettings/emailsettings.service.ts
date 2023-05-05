import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailsettingsService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor(private http: HttpClient) { }

  getEmailSettings() {
    return this.http.get(this.baseUri + `EmailSettings/GetEmailSettings`);
  }

  saveEmailSettings(emailSettingModel: any) {
    return this.http.post(this.baseUri + `EmailSettings/SaveEmailSettings`, emailSettingModel);
  }
}

export class EmailSettings {
  emailSettingId: any;
  smtpServer: string;
  smtpPort: string;
  smtpUserName: string;
  smtpPassword: string;
  fromEmailId: string;
  isEnableSSL: boolean;
  constructor() {
    this.emailSettingId = null;
    this.smtpServer = "";
    this.smtpPort = "";
    this.smtpUserName = "";
    this.smtpPassword = "";
    this.fromEmailId = "";
    this.isEnableSSL = false;
  }
}
