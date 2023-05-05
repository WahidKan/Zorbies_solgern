import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService, ModuleList } from '../shared/common.service';
import { AddInsuranceService } from './add-insurance.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.scss']
})
export class AddInsuranceComponent implements OnInit {
  addInsuranceForm: FormGroup;
  loadSave = false;
  UserId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  states: any;


  constructor(private fb: FormBuilder, private commonService: CommonService,
    private addInsurance: AddInsuranceService, private toaster: ToastrService) { }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.UserId = userdetail.id;
      this.getInsuranceDetail(this.UserId);
    });

    this.loadStateDropdown();
    this.initForm();
  }

  save() {
    if (this.addInsuranceForm.value.agentName != '' || this.addInsuranceForm.value.phone != ''
      || this.addInsuranceForm.value.address != '' || this.addInsuranceForm.value.city != ''
      || this.addInsuranceForm.value.county != '' || this.addInsuranceForm.value.state != null
      || this.addInsuranceForm.value.zipCode != '') {
      /// alert('error')
      if (this.addInsuranceForm.value.name == '') {
        this.toaster.error("Please Enter Insurance Company name");
        return false;
      }
      else if (this.addInsuranceForm.value.agentEmail == '') {
        this.toaster.error("Please Enter Insurance Agent Email");
        return false;
      }
    }
    if (this.addInsuranceForm.value.name == '' && this.addInsuranceForm.value.agentEmail != '') {
      this.toaster.error("Please Enter Insurance Company name");
      return false;
    }
    else if (this.addInsuranceForm.value.name != '' && this.addInsuranceForm.value.agentEmail == '') {
      this.toaster.error("Please Enter Insurance Agent Email");
      return false;
    }
   
      this.loadSave = true;
    this.addInsurance.saveInsuranceDetail(this.addInsuranceForm.value).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      })
  }

  private initForm() {
    this.addInsuranceForm = this.fb.group({
      insuranceId: [null],
      name: ['', Validators.nullValidator],
      address: ['', Validators.nullValidator],
      city: ['', Validators.nullValidator],
      state: [null, Validators.nullValidator],
      zipCode: ['', [Validators.nullValidator, Validators.maxLength(5)]],
      phone: ['', Validators.nullValidator],
      agentName: ['', Validators.nullValidator],
      agentEmail: ['', [Validators.nullValidator, Validators.email]],
      county: ['', Validators.nullValidator],
    });
  }

  getInsuranceDetail(userId: string) {
    this.addInsurance.getInsuranceDetail(userId)
      .subscribe((response) => {
        this.loadSave = true;
        this.displayInsuranceDetail(response);
          this.loadSave = false;
        },
        (error: any) => {
          this.loadSave = false;
        });
  }

  displayInsuranceDetail(reposnse): void {
    this.addInsuranceForm.patchValue({
      name: reposnse.name,
      address: reposnse.address,
      city: reposnse.city,
      state: reposnse.state,
      zipCode: reposnse.zipCode,
      phone: reposnse.phone,
      agentName: reposnse.agentName,
      agentEmail: reposnse.agentEmail,
      county: reposnse.county,
    });
  }

  loadStateDropdown() {
    this.commonService.getStatesList().subscribe(res => {
      this.states = this.commonService.states;
    });
  }

  get name() { return this.addInsuranceForm.get('name'); }
  get address() { return this.addInsuranceForm.get('address'); }
  get city() { return this.addInsuranceForm.get('city'); }
  get state() { return this.addInsuranceForm.get('state'); }
  get zipCode() { return this.addInsuranceForm.get('zipCode'); }
  get phone() { return this.addInsuranceForm.get('phone'); }
  get agentName() { return this.addInsuranceForm.get('agentName'); }
  get agentEmail() { return this.addInsuranceForm.get('agentEmail'); }
  get county() { return this.addInsuranceForm.get('county'); } 
}
