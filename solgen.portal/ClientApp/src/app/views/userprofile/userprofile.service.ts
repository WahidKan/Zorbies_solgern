import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  public baseUri = `${environment.WebApiBaseUrl}`;

  constructor(private http: HttpClient) { }


  getUserProfile() {
    return this.http.get(this.baseUri + `UserProfile/GetUserDetail`);
  }
  getDealerAccountDetail() {
    return this.http.get(this.baseUri + `UserProfile/GetDealerAccountDetail`);
  }

  getCountryList() {
    return this.http.get(this.baseUri + `ManageInsurance/GetCountryList`);
  }

  getStateList() {
    return this.http.get(this.baseUri + `ManageInsurance/GetStateList`);
  }

  updateUserProfile(userProfileModel: FormData) {
    ;
    return this.http.post(this.baseUri + `UserProfile/updateUserProfile`, userProfileModel);
  }
  uploadProfilePic(profilePic: File) {
    return this.http.post(this.baseUri + `UserProfile/UploadProfilePic`, profilePic);
  }
  delImage(id: any, imgname: any) {
    const url = this.baseUri + `UserProfile/DeleteUserImage?id=${id}&imgname=${imgname}`;
    return this.http.delete(url)
      .pipe(
        map((response: any) => {
          return true;
        }));
  }
}

export class UserProfileModal {
  FirstName: string;
  LastName: string;
  UserType: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  City: string;
  County: string;
  State: string;
  ZipCode: string;
  Position: string;
  employeeType: string;
  isActive: boolean;
  notes: string;
  profilePic: string;
  Id: string;
  timeZoneId: string;
  timeFormat:string
  constructor() {
    this.FirstName = "";
    this.LastName = "";
    this.UserType = "";
    this.Email = "";
    this.PhoneNumber = "";
    this.Address = "";
    this.City = "";
    this.County = "";
    this.State = "";
    this.ZipCode
    this.Position = "";
    this.employeeType = "";
    this.isActive = false;
    this.notes = "";
    this.Id = "";
    this.profilePic = "";
    this.timeZoneId = "";
    this.timeFormat = "";
  }
}

