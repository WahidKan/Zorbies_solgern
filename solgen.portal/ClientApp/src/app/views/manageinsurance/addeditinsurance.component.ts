import { Component, OnInit, HostListener } from '@angular/core';
//import { AddEditInsurance, AddeditinsuranceService } from './addeditinsurance.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { InsuranceService, AddEditInsurance, state } from './insurance.service';

@Component({
  selector: 'app-addeditinsurance',
  templateUrl: './addeditinsurance.component.html'
})
export class AddeditinsuranceComponent implements OnInit {
    
  insuranceModel: AddEditInsurance = new AddEditInsurance();
  states: any;
  loadSave = false;
  addInsuranceForm: FormGroup;
  modulePermission: ModuleList;
  addOrUpdatePermission: boolean;
  pageTitle: string;
  lstStatus: any;
  status: string;
  associateUser: string;
  private sub: Subscription;
  constructor(private fb: FormBuilder,
    private insuranceService: InsuranceService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {
    this.commonService.getMasterItemsList("status").subscribe((result: any) => {
      this.lstStatus = this.commonService.masters;
    })
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }
  

  private initForm() {
    this.addInsuranceForm = this.fb.group({
      insuranceId: [''],
      name: ['', [Validators.required, Validators.maxLength(500)]],
      agentName: ['', [Validators.required, Validators.maxLength(100)]],
      agentEmail: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', Validators.required],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      state: [null, Validators.required],
      zipCode: ['', [Validators.required, Validators.maxLength(5)]],
      county: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(500)]],
      statusId: [null, Validators.required],
    });
  }

  get name() { return this.addInsuranceForm.get('name'); }
  get county() { return this.addInsuranceForm.get('county'); }
  get state() { return this.addInsuranceForm.get('state'); }
  get agentEmail() { return this.addInsuranceForm.get('agentEmail'); }
  get phone() { return this.addInsuranceForm.get('phone'); }
  get zipCode() { return this.addInsuranceForm.get('zipCode'); }
  get agentName() { return this.addInsuranceForm.get('agentName'); }
  get city() { return this.addInsuranceForm.get('city'); }
  get address() { return this.addInsuranceForm.get('address'); }
  get statusId() { return this.addInsuranceForm.get('statusId'); }
  get insuranceId() { return this.addInsuranceForm.get('insuranceId'); }


  ngOnInit() {
    this.addOrUpdatePermission = false;
    const id = this.route.snapshot.paramMap.get('insuranceId');
    if (id) {
      this.loadSave = true;
      this.fillForm(id);
    }
    else {
      this.pageTitle = 'Add Insurance Company';
      this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
    }
    this.initForm();
    this.getState();
   
  }

  fillForm(id) {
    this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
    this.insuranceService.getInsuranceDetail(id).subscribe((result: any) => {
      if (result) {
        this.loadSave = false;
        this.pageTitle = 'Edit Insurance Company: ' + result.name;
        
        this.addInsuranceForm.patchValue({
          insuranceId: result.insuranceId,
          name: result.name,
          address: result.address,
          city: result.city,
          state: result.state,
          zipCode: result.zipCode,
          phone: result.phone,
          agentEmail: result.agentEmail,
          agentName: result.agentName,
          county: result.county,
          statusId: result.statusId.toLowerCase()
        });
        if (result.associateUser != null) {
          this.addInsuranceForm.controls.statusId.disable();
          this.status = result.statusId;
          this.associateUser = result.associateUser;
        }
      }
    },

      (error: any) => {
        this.loadSave = false;
      })
  }
  
  getState() {
    this.insuranceService.getStateList().subscribe((result: any) => {
      var data = result;
      this.states = data

    })
  }

  addeditInsurance() {
    if (this.addInsuranceForm.valid) {
      this.loadSave = true;

      if (this.addInsuranceForm.value.insuranceId == undefined) {
        this.insuranceModel.insuranceId = null;
        this.insuranceModel.statusId = this.addInsuranceForm.value.statusId;
      }
      else {
        this.insuranceModel.insuranceId = this.addInsuranceForm.value.insuranceId;

        if (this.associateUser == null) {
          this.insuranceModel.statusId = this.addInsuranceForm.value.statusId;
        } else {
          this.insuranceModel.statusId = this.status;
        }
      }
      this.insuranceModel.Name = this.addInsuranceForm.value.name;
      this.insuranceModel.Address = this.addInsuranceForm.value.address;
      this.insuranceModel.City = this.addInsuranceForm.value.city;
      this.insuranceModel.State = this.addInsuranceForm.value.state;
      this.insuranceModel.ZipCode = this.addInsuranceForm.value.zipCode;
      this.insuranceModel.Phone = this.addInsuranceForm.value.phone;
      this.insuranceModel.AgentEmail = this.addInsuranceForm.value.agentEmail;
      this.insuranceModel.AgentName = this.addInsuranceForm.value.agentName;
      this.insuranceModel.County = this.addInsuranceForm.value.county;

      this.insuranceService.addeditInsurance(this.insuranceModel).subscribe((result: any) => {
        if (result.statusCode == 200) {         
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/insurance");
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addInsuranceForm);
    }

  }

  Cancel() {
    this.router.navigateByUrl("/insurance");
  }

}
