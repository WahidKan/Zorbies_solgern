import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TestService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  classppComponent: any[] = [];
  blackListData: Promise<any>;
  pagedData: any;
  customFieldsList: any;
  //blackListData: BlacklistData;
  constructor(private http: HttpClient) {
    //this.classppComponent = appComponent.config; GetDynamicFields
    //// // console.log("TestService",this.classppComponent);
  }

   GetMapdataIntoStatic() {
    
     return this.http.get(`${this.baseUri}vendor/GetDynamicFields`)
       .pipe(
         map((response: any) => {
           this.pagedData = response;
           return true;
         })
       );
    
   }
  GetCustomFieldsList() {
    return this.http.get(`${this.baseUri}vendor/GetCustomFields`)
      .pipe(
        map((response: any) => {
          this.customFieldsList = response;
          return true;
        })
      );
  }
}
export const form_template = [
  {
    "type": "textBox",
    "label": "Name",
    "PlaceHolder": "Please Enter Name",
    validation: {
      required: true
    }
  },
  {
    "type": "textBox",
    "label": "Last Name",
    "PlaceHolder": "Please Enter Last Name"
  },
  {
    "type": "number",
    "label": "Age"
  },
  {
    "type": "select",
    "label": "favorite book",
    "PlaceHolder": "Please select Book",
    "options": ["Jane Eyre", "Pride and Prejudice", "Wuthering Heights"]
  }
]

export interface IControlData {
  controlName: string;
  controlType: string;
  placeholder?: string;
  dependents?: string[];
  order?: number;
  value?: any;
  DependentKey?: any;
  options?: Array<{
    optionName: string;
    value: string;
    dependentKey?: any;
  }>;
  validators?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
  };
}

export class AppComponent {
  ID: string;
  Type: string
  Name: string
  Label: string
  PlaceHolder: string
  constructor() {
    this.ID = '';
    this.Type = "";
    this.Name = "";
    this.Label = "";
    this.PlaceHolder = "";

  }
}

export interface BlacklistData {
  type: string,
  label: string,
  name: string,
  placeholder: string,
}
export class AppComponent1 {
  config = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
    },
    {
      //type: 'select',
      //label: 'Favourite food',
      //name: 'food',
      //options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      //placeholder: 'Select an option',
      type: 'input',
      label: 'Last name',
      name: 'name',
      placeholder: 'Enter your Last Name',
    },
    {
      //label: 'Submit',
      //name: 'submit',
      //type: 'button',
      type: 'input',
      label: 'Email ID',
      name: 'Email',
      placeholder: 'Enter your Email Id',

    },
  ]
}

