import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreFrontCommonService {

   baseUri = 'http://localhost:8530/api/';
   states: SelectItemModel[] = [];

  constructor(private HttpClient: HttpClient) { }


  addContactUsDetails(contactUsData): Observable<any>{
    debugger
    contactUsData.LeadType = "Contact Us"
    return this.HttpClient.post(`http://localhost:8530/api/SFContactUs/AddContactUs`, contactUsData)
  }
  addDemoRequest(demoRequestData): Observable<any>{
    demoRequestData.FullName = demoRequestData.FirstName + " " + demoRequestData.LastName
    demoRequestData.LeadType = "Request A Demo"
    debugger
    return this.HttpClient.post(`http://localhost:8530/api/SFContactUs/AddContactUs`, demoRequestData)
  }


  // subscription service methods


  CheckEmailDuplicate(Email: any) {
    return this.HttpClient.get(this.baseUri + `subscription/CheckEmailDuplicate?Email=${Email}`);
  }
  AddSubscription(json:string){
    debugger;
    return this.HttpClient.post(`${this.baseUri}subscription/AddCompanySubscriptionFromStorefront`,json);
  }
  GetSubscriptionList(sortCol:string,sortOrder:string,totalPage:number,pageNum:number,searchBy:string,searchIndustry:string):Observable<any>{
    return this.HttpClient.get(`${this.baseUri}subscription/GetSubscriptionList?sortCol=${sortCol}&sortOrder=${sortOrder}&totalPage=${totalPage}&pageNum=${pageNum}&searchBy=${searchBy}&searchIndustry=${searchIndustry}`);
  }
  DeleteSubscription(Id:number){
    return this.HttpClient.get(this.baseUri + `subscription/DeleteSubscription?Id=${Id}`);
  }
  deleteselectedSubs(ids: string):Observable<any> {
    return this.HttpClient.post(`${this.baseUri}subscription/deleteselectedSubs`, null, {
      params: { ids },
    });
  }
  GetResetPassword(email:string):Observable<any>
  {
   return this.HttpClient.get(this.baseUri+`subscription/GetResetPassword?email=${email}`);
  }



  // common mservice methods

  getStatesList(): Observable<any> {
    debugger;
    return this.HttpClient.get(this.baseUri + `Common/GetStatesListForStorefront`).pipe(
      map((response: any) => {
        this.states = response;
      })
    );
  }
  scrollTo(el: Element) {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid');
    this.scrollTo(firstElementWithError);
  }
  scroll(form: FormGroup) {
    this.scrollIfFormHasErrors(form).then(() => { });
  }
  async scrollIfFormHasErrors(form: FormGroup): Promise<any> {
    await form.invalid;
    this.scrollToError();
  }
  validateAllFormFields(formGroup: FormGroup, iscroll = true) {
    debugger;
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
        return;
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrControl) => {
          if (arrControl instanceof FormGroup) {
            this.validateAllFormFields(arrControl);
            return;
          }
        });
        if (iscroll) {
          this.scroll(formGroup);
        }
      }
    });
  }
}


export class SelectItemModel {
  value: string;
  text: string;
  constructor() {
    this.value = '';
    this.text = '';
  }
}
