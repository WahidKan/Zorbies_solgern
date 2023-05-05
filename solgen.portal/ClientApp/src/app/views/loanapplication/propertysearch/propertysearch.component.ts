import { Component, OnInit, Input } from '@angular/core';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-propertysearch',
  templateUrl: './propertysearch.component.html',
  styleUrls: ['./propertysearch.component.scss']
})
export class PropertysearchComponent implements OnInit {
  //@Input('AppDATA') AppDATA: any;
  firstName: string;
  middelName: string = "";
  lastName: string;
  streetname: string;
  city: string;
  stateCode: string;
  ResponseName: string = "";
  ResponseLastName: string = "";
  ResponseResult: string = "";
  ReqName: string = "";
  ReqLastName: string = "";
  formdata1: any;
  SearchBY: string = "";
  loadSave: boolean = false;


  constructor(private loanApplicationService: LoanapplicationserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.firstName = this.AppDATA.AppFirstName;
    //this.lastName = this.AppDATA.AppLastName;
    //this.streetname = this.AppDATA.StreetName;
    //this.city = this.AppDATA.City;
    //this.stateCode = this.AppDATA.StateCode;
  }

  save() {
    this.loadSave=true
    this.loanApplicationService.savePropertySearch(this.firstName, this.middelName, this.lastName, this.streetname, this.city, this.stateCode).subscribe((result: any) => {
      this.ResponseName = result.firstnameandmi;
      this.ResponseLastName = result.lastname;
      this.ResponseResult = result.msg;
      this.ReqName = result.name;
      this.ReqLastName = result.lName;
      this.SearchBY = "ATOM";
      this.loadSave = false

    })
  }

  SearchbyFM() {
    this.loadSave = true
    this.loanApplicationService.savePropertySearchbyFM(this.firstName + " " + this.middelName + " " + this.lastName, this.streetname + " " + this.city + " " + this.stateCode).subscribe((result: any) => {
      this.ResponseName = result.firstnameandmi;
      this.ResponseResult = result.msg;
      this.ReqName = result.name;
      this.ReqLastName = "";
      this.SearchBY = "First AM";
      this.loadSave = false

    })
  }

}
