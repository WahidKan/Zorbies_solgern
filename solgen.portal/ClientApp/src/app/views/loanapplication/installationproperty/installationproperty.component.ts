import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { LoanapplicationserviceService, LoanProgressModel, Progress } from '../loanapplicationservice.service';
import { CommonService } from '../../shared/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageUserService } from '../../manageuser/addedituser.service';

@Component({
  selector: 'app-installationproperty',
  templateUrl: './installationproperty.component.html',
  styleUrls: ['./installationproperty.component.scss']
})
export class InstallationpropertyComponent implements OnInit {
  @Input('itemdata12') itemdata12: any;
  isflag = false;
  usertype: string;
  installerPropForm: FormGroup
  loadSave = false;
  installerpropertydata: any;
  applicantId: any; loanappid: any;
  isDateChanged: any = true;
  @Input('IsLACanceledFlag') IsLACanceledFlag: any;
  @Output() ntpemit = new EventEmitter();
  @Output() loanInfoEmit = new EventEmitter<any>();
  states: any;
  constructor(private router: Router, private userService: ManageUserService, private route: ActivatedRoute,private fb: FormBuilder, private commonService: CommonService, private loanApplicationService: LoanapplicationserviceService,
    private toaster: ToastrService) { }
 
  ngOnInit() {
    this.usertype = localStorage.getItem("usertype");
    var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
    if (haspermission) {
      this.isflag = true;
    }
    if (this.IsLACanceledFlag) {
      this.isflag = false;
    }
    this.initForm();
    
    this.route.paramMap.subscribe(params => {
     
      const id = params.get('id');
      if (id) {
       
        this.loanappid = id;
        this.getState();
        this.fillInstallerPropForm(id);
      } else {
       
      }
     
    });
    
  }

  getState() {
    this.userService.getStateList().subscribe((result: any) => {
    
      this.states = result
      // // console.log('this.statesthis.states', this.states);
    });
  
  }
  fillInstallerPropForm(id) {
    this.loanApplicationService.GetInstallerPropertyInfo(id).subscribe((result: any) => {

      this.installerpropertydata = this.loanApplicationService.installerpropertyInfo;

      const appid = id;

        this.installerPropForm.patchValue({
          loanApplicationId: appid,// this.installerpropertydata[0].LoanApplicationId,
          streetNumber: this.installerpropertydata[0].StreetNumber,
          streetName: this.installerpropertydata[0].StreetName,
        
          stType: this.installerpropertydata[0].StType,
          numberofMortage: this.installerpropertydata[0].NumberofMortage,
          
          city: this.installerpropertydata[0].City,
          stateId: this.installerpropertydata[0].StateId,
          
          zip: this.installerpropertydata[0].Zip,
          valueOfProperty: this.installerpropertydata[0].ValueOfProperty,
          totalOfMortages: this.installerpropertydata[0].TotalOfMortages,
          estimationLTV: this.installerpropertydata[0].EstimationLTV,
          isBorrowerOwnProperty: this.installerpropertydata[0].IsBorrowerOwnProperty,
          isAddressDifferent: this.installerpropertydata[0].IsAddressDifferent,
         
        })
      // // console.log("this.installerpropertydata", this.installerpropertydata);
    });
  }
  OnChanged(e) {
    this.isDateChanged = true;

  }
  close() {
    this.ntpemit.emit();
  }
  isSubmitted = false;
  addUpdateInstallerProperty() {
    if (this.installerPropForm.valid) {
      //this.loadSave = true;
      this.isSubmitted = true;
      let loanProgress = new LoanProgressModel();
      loanProgress.appyingChanges = Progress.start;
      this.loanApplicationService.loanProgress.next(loanProgress);

      // // console.log('FormValue:', this, this.installerPropForm.value);
      this.loanApplicationId.setValue(this.loanappid);
      // // console.log('FormValuesdsdsdsd:', this.installerPropForm.value);
      this.loanApplicationService.addUpdateInstallerProperty(this.installerPropForm.value).subscribe((result: any) => {
        if (result.statusCode == 200) {
          //this.toaster.success(result.responseMessage);
          this.isSubmitted = false;
          loanProgress.appyingChanges = Progress.completed;
          this.loanApplicationService.loanProgress.next(loanProgress);
          loanProgress.applyingRules = Progress.start;
          loanProgress.result = result;
          this.loanApplicationService.loanProgress.next(loanProgress);

         // setTimeout(() => { this.loadSave = false; }, 3000);
          this.ntpemit.emit();
          //this.loanInfoEmit.emit(result);
        }
        else {
          this.isSubmitted = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
          this.loadSave = false;
          this.isSubmitted = false;
      })
    }
    else {
      this.isSubmitted = false;
      this.commonService.validateAllFormFields(this.installerPropForm);
    }
  }


  private initForm() {
    this.installerPropForm = this.fb.group({
      'loanApplicationId': ['', Validators.nullValidator],
      'streetNumber': ['', Validators.nullValidator],
      'streetName': ['', [Validators.nullValidator]],
      'stType': ['', [Validators.nullValidator]],
      'city': ['', Validators.nullValidator],
      'numberofMortage': ['', [Validators.nullValidator, Validators.pattern("[0-9]{1,9}")]],
      
      'stateId': ['', [Validators.nullValidator]],
      'valueOfProperty': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'zip': ['', [Validators.nullValidator]],
      'totalOfMortages': ['', [Validators.nullValidator, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      'estimationLTV': ['', [Validators.nullValidator, Validators.pattern("[0-9]{1,9}")]],
      'isBorrowerOwnProperty': [''],
      'isAddressDifferent': [''],
    });
  }

  get loanApplicationId() { return this.installerPropForm.get('loanApplicationId'); }
  get streetNumber() { return this.installerPropForm.get('streetNumber'); }
  get streetName() { return this.installerPropForm.get('streetName'); }
  get stType() { return this.installerPropForm.get('stType'); }
  get numberofMortage() { return this.installerPropForm.get('numberofMortage'); }
 
  get city() { return this.installerPropForm.get('city'); }
  get stateId() { return this.installerPropForm.get('stateId'); }
  get homePhone() { return this.installerPropForm.get('homePhone'); }
  get zip() { return this.installerPropForm.get('zip'); }
  get valueOfProperty() { return this.installerPropForm.get('valueOfProperty'); }
  get totalOfMortages() { return this.installerPropForm.get('totalOfMortages'); }
  get estimationLTV() { return this.installerPropForm.get('estimationLTV'); }
  get isBorrowerOwnProperty() { return this.installerPropForm.get('isBorrowerOwnProperty'); }
  get isAddressDifferent() { return this.installerPropForm.get('isAddressDifferent'); }




}
