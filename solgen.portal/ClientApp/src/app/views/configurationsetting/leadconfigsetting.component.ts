import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ConfigurationsettingService, ManageStatusModel, LeadConfigurationModel } from './configurationsetting.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
  selector: 'app-leadconfigsetting',
  templateUrl: './leadconfigsetting.component.html',
  styleUrls: ['./leadconfigsetting.component.scss']
})
export class LeadconfigsettingComponent implements OnInit {
  modulePermission: ModuleList;
  comptype: any;
  loading = false;
  CompanyId = null;
  leadSettingForm: FormGroup;
  pagedData: any = {
    pager: {},
    data: []
  };
  lstpage: any;
  isLinkPage: boolean = false;
  leadConfigurationModel: LeadConfigurationModel = new LeadConfigurationModel();
  loadSave: boolean = false;

  constructor(private configurationsettingService: ConfigurationsettingService,
    private fb: FormBuilder,
    private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.comptype = JSON.parse(localStorage.getItem("userinfo"));
  }

  ngOnInit() {
    this.initForm();
    this.getleadconfigurationDetails();
    this.pagelist();
  }

  private initForm() {
   
    this.leadSettingForm = this.fb.group({
      IsLoanapplication: [true , Validators.required],
      IsOpportunity: [false, Validators.required],
      IsAccount: [true],
      IsContact: [false],
      fields: this.fb.array([this.buildFields()])
    });
    
  }
  buildFields(): FormGroup {
    return this.fb.group({
      linkPage: [null, Validators.required],
      
    });
  }
  loanapplication(e) {
     
    if (e.target.value == 'Opportunity') {

      this.isLinkPage = false;
    }
    else {
      this.isLinkPage = true;
    }
  }
  opportunity(e) {
   
    if (e.target.value == 'Opportunity') {
      this.isLinkPage = false;
    }
    else {
      this.isLinkPage = true;
    }
  }
  get fields(): FormArray {
    return this.leadSettingForm.get('fields') as FormArray;
  }

  addFields() {
    this.fields.push(this.buildFields());
  }
  removeFields(index: any) {
    this.fields.removeAt(index);
  }
  pagelist() {
    this.commonService.getMasterItemsList("LoanApplicationPages").subscribe((result: any) => {

      this.lstpage = this.commonService.masters;
      // console.log('LoanApplicationPages', this.lstpage)


    })
  }
  onChangeField(e: any, field: any, i) {
   
    let _length = e.length;
   
    // console.log('ddd', e);
    for (var a = 0; a < this.fields.controls.length -1; a++) {
     var ab= this.fields.controls[a].value.linkPage;
      // console.log('display', this.fields.controls[a]);
      let isflag = 0;
     // var index = this.fields.controls[a].value.linkPage  .indexOf(e[_length - 1].value);
      if (e.value == ab) {
      // this.fields.controls[i].value.linkPage.splice(e.value)
      //  this.fields.removeAt(i);
        isflag = 1;
        this.toaster.success("This section is already linked.");
       
      }
      if (isflag == 1) {

        this.fields.controls[i].get('linkPage').setValue('');
      }
    }
   


    // console.log('test', this.fields);   
    
    

  }
  //Get Lead Configuration Details
  getleadconfigurationDetails() {
    while (this.fields.length != 0) {
      this.fields.removeAt(0);
    }

    this.configurationsettingService.GetLeadConfigurationDetails(this.CompanyId).subscribe((leadresult: any) => {
      // console.log('leadresult', leadresult);
      if (leadresult.isLoanapplication == true) {
        this.isLinkPage = true;
        
    
        
        var ab = leadresult.moduleWizard.split(',');
        // console.log('JSOn', ab)
        ab.forEach((x, i) => {
         
          this.fields.push(this.fb.group({
            linkPage: [x],


            //display_order: [x.display_order]
            //    //index: this.fields.length
          })

          )
        })
      }
      this.leadSettingForm.patchValue({
        IsLoanapplication: (leadresult.isLoanapplication) ? "LoanApplication" : "Opportunity", 
        //IsLoanapplication: (leadresult.isOpportunity) ? "Opportunity" : false,  
        IsAccount: leadresult.isAccount,
        IsContact: leadresult.isContact,

      })
      //    if (leadresult) {
      //      this.fb.group({
      //        IsLoanapplication: [(leadresult.leadConfigurationModel.IsLoanapplication) ? "LoanApplication" : false],
      //        IsOpportunity: [(leadresult.leadConfigurationModel.IsOpportunity) ? "Opportunity" : false],
      //        IsAccount: [leadresult.leadConfigurationModel.IsAccount],
      //        IsContact: [leadresult.leadConfigurationModel.IsContact]

      //      })
      //  //this.leadSettingForm.value.IsLoanapplication = 
      //  //this.leadSettingForm.value.IsOpportunity = ;
      //  //this.leadSettingForm.value.IsAccount = ;
      //  //this.leadSettingForm.value.IsContact = ;
      //}
    });
  }


  //Save/Update Lead Configuration Details
  ManageLeadConfiguration() {

    if (this.leadSettingForm.valid) {
      // console.log('value: ', this.leadSettingForm.value);

      //this.loading = true;

      this.leadConfigurationModel.IsLoanapplication = (this.leadSettingForm.value.IsLoanapplication == "LoanApplication") ? true : false;
      this.leadConfigurationModel.IsOpportunity = (this.leadSettingForm.value.IsLoanapplication == "Opportunity") ? true : false;
      this.leadConfigurationModel.moduleWizard = this.leadSettingForm.value.fields.map(m => { return m.linkPage }).join();
      this.configurationsettingService.ManageLeadConfiguration(this.leadConfigurationModel).subscribe((result: any) => {
        
        if (result.statusCode == 200) {


          this.toaster.success(result.responseMessage);
          this.getleadconfigurationDetails();
          //setTimeout(() => {
          //  window.location.reload();
           
          //}, 3000);
        }
        else {
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loading = false;
      });
    }
    else {      
      this.commonService.validateAllFormFields(this.leadSettingForm);
    }
    
  }
  
  get IsLoanapplication() { return this.leadSettingForm.get('IsLoanapplication'); }
  get IsOpportunity() { return this.leadSettingForm.get('IsOpportunity'); }
  get IsAccount() { return this.leadSettingForm.get('IsAccount'); }
  get IsContact() { return this.leadSettingForm.get('IsContact'); }
  get linkPage() { return this.leadSettingForm.get('linkPage'); }

}

