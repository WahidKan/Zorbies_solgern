import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StoreFrontCommonService } from '../store-front-common.service';
@Component({
  selector: 'app-requestademomodel',
  templateUrl: './requestademomodel.component.html',
  styleUrls: ['./requestademomodel.component.css']
})
export class RequestademomodelComponent implements OnInit {
  @ViewChild('makeFormModel', { static: false }) makeFormModel: ModalDirective;
  fullName: string;
  constructor(private fb: FormBuilder, private storeFrontService: StoreFrontCommonService) { }
  demoSubject: any;
  addRequestDemoForm: FormGroup;
  
  ngOnInit() {
    this.addRequestDemoForm = this.fb.group({
      Id: 0,
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Subject: ['', Validators.required],
      Message: ''
    })

  }
  close(){
    this.makeFormModel.hide();
  }
  saveDemoRequest(){
    this.addRequestDemoForm.patchValue({Id:0});
    let demoRequestData = Object.assign({}, this.addRequestDemoForm.value);
    this.storeFrontService.addDemoRequest(demoRequestData).subscribe( (reponse)=> {
      let res = reponse;
      this.makeFormModel.hide();
      this.addRequestDemoForm.reset();
    })
  }
  show(){
    this.makeFormModel.show();
    this.addRequestDemoForm.reset();
  }

  keyPress(event: KeyboardEvent){
    debugger
    this.fullName = this.addRequestDemoForm.value.FirstName + " " + this.addRequestDemoForm.value.LastName;
    this.demoSubject = "Request A Demo - " + this.fullName

  }
}
