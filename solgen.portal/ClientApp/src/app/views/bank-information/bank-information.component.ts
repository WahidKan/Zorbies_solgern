import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModuleList, CommonService } from '../shared/common.service';
import { BankInformationService } from './bank-information.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-information',
  templateUrl: './bank-information.component.html',
  styleUrls: ['./bank-information.component.scss']
})
export class BankInformationComponent implements OnInit {

  addbankForm: FormGroup;
  loadSave = false;
  UserId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  states: any;
  lstStates: any;
  constructor(private fb: FormBuilder, private commonService: CommonService,
    private addInsurance: BankInformationService, private toaster: ToastrService) {
    this.loadStateDropdown();
  }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.UserId = userdetail.id;
      this.getBankInformation(this.UserId);
    });
    this.initForm();
  }
  
  private initForm() {
    this.addbankForm = this.fb.group({
      contactBankId: [null],
      contactBankName: [''],
      contactBankAddress: [''],
      contactBankRoutingNumber: [''],
      contactBankAccountNum: [''],
      contactBankCity: [''],
      contactBankCounty: [''],
      contactBankState: [null],
      contactBankZipcode:['']

    });
  }

  getBankInformation(userId: string) {
    this.addInsurance.getBankInformation(userId)
      .subscribe((response) => {
        this.loadSave = true;
        this.displayBankInformation(response);
        this.loadSave = false;
      },
        (error: any) => {
          this.loadSave = false;
        });
  }

  displayBankInformation(response): void {
    
    this.addbankForm.patchValue({
      contactBankId: response.contactBankId,
      contactBankName: response.contactBankName,
      contactBankAddress: response.contactBankAddress,
      contactBankRoutingNumber: response.contactBankRoutingNumber,
      contactBankAccountNum: response.contactBankAccountNum,

      contactBankZipcode: response.contactBankZipcode,
      contactBankCity: response.contactBankCity,
      contactBankCounty: response.contactBankCounty,
      contactBankState: response.contactBankState,
    });
  }
  loadStateDropdown() {
    this.commonService.getStatesList().subscribe(res => {
      this.lstStates = this.commonService.states;
    });
  }
  save() {
    if (this.addbankForm.value.contactBankName != '' || this.addbankForm.value.contactBankAddress != ''
      || this.addbankForm.value.contactBankRoutingNumber != '' || this.addbankForm.value.contactBankAccountNum != '') {
      this.loadSave = true;
      this.addInsurance.saveBankInformation(this.addbankForm.value).subscribe((result: any) => {
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
  }


  get contactBankName() { return this.addbankForm.get('contactBankName'); }
  get contactBankAddress() { return this.addbankForm.get('contactBankAddress'); }
  get contactBankRoutingNumber() { return this.addbankForm.get('contactBankRoutingNumber'); }
  get contactBankAccountNum() { return this.addbankForm.get('contactBankAccountNum'); }

  get contactBankCity() { return this.addbankForm.get('contactBankCity'); }
  get contactBankCounty() { return this.addbankForm.get('contactBankCounty'); }
  get contactBankState() { return this.addbankForm.get('contactBankState'); }
  get contactBankZipcode() { return this.addbankForm.get('contactBankZipcode'); }
  
}
