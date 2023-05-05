import { Component, OnInit } from '@angular/core';
import { BankModel, BankService } from './bank.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../shared/common.service';

@Component({
  selector: 'app-addeditbank',
  templateUrl: './addeditbank.component.html',
  styleUrls: ['./addeditbank.component.scss']
})
export class AddeditbankComponent implements OnInit {
  BankModel: BankModel = new BankModel();
  lstStatus: any;
  loadSave = false;
  lstStates: any;
  pageTitle: string;
  status: string;
  associateUser: string;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  showList = false;

  loading = false;
  pagedData: any = {
    pager: {},
    data: []
  };
  pageNumber = 0;
  pageSizeValue = 100;
  isSuperAdminUser= false;
  isOrperationUser = false;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private bankService: BankService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {

    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);

    this.commonService.getMasterItemsList("status").subscribe((result: any) => {    
      this.lstStatus = this.commonService.masters;
    })
    this.commonService.getStatesList().subscribe((result: any) => {
      this.lstStates = this.commonService.states;
    });

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
    
      if (userdetail.userType == 'usertype01') {  //SuperAdmin User 
        this.isSuperAdminUser = true;
      }
      if (userdetail.userType == 'usertype02') {  //Operation User 
        this.isOrperationUser = true;
      }
    });
  }
  ngOnInit() {
    this.addOrUpdatePermission = false;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true
          this.fillForm(id);
          this.userList(id);
          this.showList = true;
        }
        else {
          this.pageTitle = 'Add Lender';
          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
      }
    );
   
  }
  addForm = this.fb.group({
    bankName: ['', Validators.required],
    city: ['', [Validators.required, Validators.maxLength(100)]],
    stateId: [null, Validators.required],
    county: ['', [Validators.required, Validators.maxLength(100)]],
    phone: ['', Validators.required],
    address: ['', [Validators.required, Validators.maxLength(500)]],
    statusId: [null, Validators.required],
    zipCode: ['', [Validators.required, Validators.maxLength(5)]],
    id: [null]
  });

  get bankName() { return this.addForm.get('bankName'); }
  get city() { return this.addForm.get('city'); }
  get county() { return this.addForm.get('county'); }
  get stateId() { return this.addForm.get('stateId'); }
  get phone() { return this.addForm.get('phone'); }
  get address() { return this.addForm.get('address'); }
  get statusId() { return this.addForm.get('statusId'); }
  get zipCode() { return this.addForm.get('zipCode'); }
  get id() { return this.addForm.get('id'); }

  addEditBank() {
    if (this.addForm.valid) {
      this.loadSave = true;
      if (this.addForm.value.id == undefined) {
        this.BankModel.id = null;
        this.BankModel.statusId = this.addForm.value.statusId;
      }
      else {
        this.BankModel.id = this.addForm.value.id;      

        if (this.associateUser == null) {
          this.BankModel.statusId = this.addForm.value.statusId;          
        } else {
          this.BankModel.statusId = this.status;
        }
      }

      this.BankModel.bankName = this.addForm.value.bankName;
      this.BankModel.city = this.addForm.value.city;
      this.BankModel.county = this.addForm.value.county;
      
      this.BankModel.stateId = this.addForm.value.stateId;
      this.BankModel.address = this.addForm.value.address;
      this.BankModel.phone = this.addForm.value.phone;
      this.BankModel.zipCode = this.addForm.value.zipCode;      
      

      this.bankService.addEditBank(this.BankModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/bank");
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.toaster.error(result.responseMessage);
        } 
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  }

  fillForm(id) {
    this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
    this.bankService.getBankDetail(id).subscribe((result: any) => {
      if (result) {
        this.loadSave = false;
        this.pageTitle = 'Edit Lender: ' + result.bankName;
        this.addForm.patchValue({
          id: result.id,
          bankName: result.bankName,
          city: result.city,
          county: result.county,
          address: result.address,
          phone: result.phone,
          zipCode: result.zipCode,
          statusId: result.statusID.toLowerCase(),
          stateId: result.stateID !== null ? result.stateID.toLowerCase() : null
        });
        
        if (result.associateUser != null) {          
          this.addForm.controls.statusId.disable();
          this.status = result.statusID;
          this.associateUser = result.associateUser;
        }
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }

  Cancel() { 
    this.router.navigateByUrl("/bank");
  }

  userList(bankId) {
    this.loading = true;
    this.bankService.getusersBankList(this.pageNumber, this.pageSizeValue, bankId).subscribe((result: any) => {
      this.pagedData = this.bankService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }

}
