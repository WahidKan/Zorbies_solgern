import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreFrontCommonService } from '../store-front-common.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ContactUsComponent implements OnInit {
  public contactUsForm: FormGroup;

  constructor( public fb: FormBuilder, private storeFrontService: StoreFrontCommonService) { }

  ngOnInit() {
    this.contactUsForm = this.fb.group({
      id: 0,
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required],
    })

  }


  submit(){
    this.contactUsForm.patchValue({id:0})
    let contactUsFormData = Object.assign({}, this.contactUsForm.value)
    debugger
    this.storeFrontService.addContactUsDetails(contactUsFormData).subscribe((response)=>{
      let resDAta =response;
      debugger
      console.log(response.responseMessage);
      this.contactUsForm.reset();
    })
  }

}
