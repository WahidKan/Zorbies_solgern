import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageUserService } from '../../manageuser/addedituser.service';
import { CommonService, ModuleList } from '../../shared/common.service';
import { LoanapplicationserviceService, JsonData, CheckboxData, appverificationmdoel, LoanProgressModel, Progress } from '../loanapplicationservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-applicationverification',
  templateUrl: './applicationverification.component.html',
  styleUrls: ['./applicationverification.component.scss']
})
export class ApplicationverificationComponent implements OnInit, OnChanges {
  stageid: any;
  isBanker: boolean = false;
  @Input('loanProductdata') loanProductdata: any;
  @Input('itemdata12') itemdata12: any;
  @Input('leadconvert') leadconvert: any;
  @Input('leadid') leadconvertedid: any;
  @Input('loanid') loanid: any;
  @Input('wizardIndex') wizardIndex: number;
  @Input('totalWizard') totalWizardlength: number;
  @Input('SourceType') SourceType: any;
  @Input('DealerName') DealerName: any;
  @Output() ntpemit = new EventEmitter();
  @Output() wizardOutput = new EventEmitter<number>();
  @Output() finishWizard = new EventEmitter<number>();
  @Output() loanInfoEmit = new EventEmitter<any>();

  moduleName = 'finance';
  //submoduleName = 'LoanApplicationApplicant';
  lstpagearray: appverificationmdoel[] = [];
  isdone = false;
  @Input('submoduleName') submoduleName: any
  @Input('LoanApplicationNumber') LoanApplicationNumber: any;
  companyId: any;
  userId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  checkboxdata1: Array<CheckboxData> = [];
  usertype: string;
  isflag = false;
  isModel = false;
  Id: any = '';
  @Input('IsLACanceledFlag') IsLACanceledFlag: boolean = false;
  customCompnentValues: any;
  docinfo: any;
  stageinfo: any;
  formControlList: any[] = [];
  verificationform: FormGroup;
  loadSave = false;
  JsonData: JsonData = new JsonData();
  selectAllValue: boolean = false;
  isSubmitted = false;
  constructor(private router: Router, private userService: ManageUserService, private route: ActivatedRoute, private fb: FormBuilder, private commonService: CommonService, private loanApplicationService: LoanapplicationserviceService,
    private toaster: ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }
  groupBy1 = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, []); // empty object is the initial value for result object
  };
  ngOnChanges() {

    if (this.leadconvert) {
      this.Id = this.loanid;

    }
    if (this.IsLACanceledFlag) {
      this.isflag = false;
    }
  }

  ngOnInit() {

    this.isBanker = false;
    this.usertype = localStorage.getItem("usertype");
    if (this.usertype.toLocaleLowerCase() != 'usertypebanker') {
      this.isBanker = true;
    }
    this.addOrUpdatePermission = false;
    this.usertype = localStorage.getItem("usertype");
    if (this.leadconvert != true) {
      var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
      if (haspermission) {
        this.isflag = true;
      }
    }
    if (this.leadconvert == true) {

      this.isflag = true;
    }
    if (this.IsLACanceledFlag) {
      this.isflag = false;
    }
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.Id = id;
          this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        } else {
          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
      }
    );
    this.GetFormData();
  }

  close() {
    this.isModel = false;
    this.GetFormData();
    this.ntpemit.emit();
  }

  finish() {
    this.onSubmitData();
    this.finishWizard.emit(1);
  }
  GetFormData() {
    this.isModel = false;
    if (this.ntpemit.observers.length > 0) {
      this.isModel = true;
    }
    if (this.itemdata12.loan_app_stage_id == undefined) {
      this.itemdata12.loan_app_stage_id = 0;
    }
    //// console.log('submoduleNamesubmoduleName', this.submoduleName);
    this.loanApplicationService.GetDataForVerificationList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.itemdata12.loan_app_stage_id).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.loanApplicationService.formFieldsList;
        //// console.log('submoduleNamesubmoduleName', this.submoduleName);
        //// console.log('Internal Verification', this.customCompnentValues);
        let verifarray = this.groupBy1(this.customCompnentValues, 'Type');


        //// console.log('Internal Verification', verifarray);

        try {
          this.docinfo = (verifarray.Document);
        }
        catch (err) { this.docinfo = null; }
        try {
          this.stageinfo = (verifarray.Stages);
        }
        catch (err) { this.stageinfo = null; }
        this.selectAllValue = (this.customCompnentValues as any[]).filter(s => s.IsVerified == true && s.IsRequired == true).length == ((this.customCompnentValues as any[]).filter(s => s.IsRequired==true).length)

        this.customCompnentValues.forEach(x => {
          let objitem = new appverificationmdoel();
          objitem.id = x.Id;
          objitem.values = x.IsVerified == true ? '1' : '0';
          objitem.type = x.Type;
          objitem.isrequired = x.IsRequired;
          objitem.isVerified = x.IsVerified;
          this.lstpagearray.push(objitem);
        });
        this.isdone = false;

        this.lstpagearray.forEach(x => {

          if (x.isrequired == true && x.values == '0') {
            this.isdone = true;
          }
        });

        //// console.log('this.formControlListthis.formControlList', this.lstpagearray);

        //this.verificationform = new FormGroup(this.customCompnentValues);
        this.loadSave = false;

      }
    });
  }
  setvalues(e, id, type) {
   
    var ifAllDocCheck = true;
    this.lstpagearray = [];
    this.docinfo.forEach(x => {
      if (x.IsRequired == true) {
        if (!x.IsVerified) {
          ifAllDocCheck = false;
        }
        let obj2 = new appverificationmdoel();
        obj2.id = x.Id;
        obj2.values = (x.IsVerified == true) ? '1' : '0';
        obj2.type = x.Type;
        obj2.isrequired = x.IsRequired;
        obj2.isVerified = x.IsVerified
        this.lstpagearray.push(obj2);
      }
    });
    var ifAllStageCheck = true;
    this.stageinfo.forEach(x => {
      if (x.IsRequired == true) {
        if (!x.IsVerified) {
          ifAllStageCheck = false;
        }
        let obj2 = new appverificationmdoel();
        obj2.id = x.Id;
        obj2.values = (x.IsVerified == true) ? '1' : '0';
        obj2.type = x.Type;
        obj2.isrequired = x.IsRequired;
        obj2.isVerified = x.IsVerified;
        this.lstpagearray.push(obj2);
      }
    });
    
    if (ifAllStageCheck == true && ifAllDocCheck == true) {
      this.selectAllValue = true;
    } else {
      this.selectAllValue = false;
    }
    //if (e.target.checked) {
    //  let obj2 = new appverificationmdoel();
    //  obj2.id = id;
    //  obj2.values = '1';
    //  obj2.type = type;
    //  let ind = this.lstpagearray.findIndex(m => m.id == id);
    //  if (ind == -1) {
    //    this.lstpagearray.push(obj2);
    //  }
    //  else {
    //    this.lstpagearray[ind].values = '1'
    //    this.lstpagearray[ind].isVerified = true;
    //  }
    //    this.selectAllValue = (this.lstpagearray as any[]).filter(s => s.isVerified == true && s.isrequired == true).length == ((this.lstpagearray as any[]).filter(s => s.isrequired == true).length)
    //}
    //else {
    //  let obj2 = new appverificationmdoel();
    //  obj2.id = id;
    //  obj2.values = '0';
    //  obj2.type = type;
    //  let ind = this.lstpagearray.findIndex(m => m.id == id);
    //  if (ind == -1) {
    //    this.lstpagearray.push(obj2);
    //  }
    //  else {
    //    this.lstpagearray[ind].values = '0'
    //    this.lstpagearray[ind].isVerified = false;
    //  }
    //    this.selectAllValue = (this.lstpagearray as any[]).filter(s => s.isVerified == false && s.isrequired == true).length == ((this.lstpagearray as any[]).filter(s => s.isrequired == true).length)
    //}
    //// console.log('last', this.lstpagearray);
  }

  onSubmitData() {

    //this.loadSave = true;
    //this.checkboxdata1.forEach((item) => {
    //  if (item.controlvalues != "" && item.controlvalues != undefined) {
    //    var selvalues = "";// this.form.get(item.controlname).value;
    //    if (selvalues == "" || selvalues == null) {
    //      this.verificationform.get(item.controlname).setValue(item.controlvalues);
    //    } else {
    //      this.verificationform.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
    //    }
    //  }
    //});
    //if (this.verificationform.valid) {

    //  if (this.leadconvert == true && (this.loanid != null || this.loanid == 'undefined' || this.loanid == '')) {
    //    this.Id = this.loanid;
    //    //   var leadidforconversion = this.leadconvertedid
    //  }



    //this.loadSave = true;
    this.JsonData.Id = this.Id;
    this.JsonData.moduleCode = this.moduleName;
    this.JsonData.subModuleCode = this.submoduleName;
    this.JsonData.companyId = this.companyId;
    this.JsonData.userId = this.userId;
    this.JsonData.leadconvert = this.leadconvert;
    this.JsonData.leadid = this.leadconvertedid;
    this.JsonData.FormJsonData = JSON.stringify(this.lstpagearray);
    this.JsonData.SourceType = this.SourceType;
    this.JsonData.DealerName = this.DealerName;
    this.JsonData.ApplicationNumber = this.LoanApplicationNumber;
    let isverified = true;

    let ind = this.lstpagearray.filter(m => m.isrequired == true && m.values == '0');
    if (ind.length > 0) {
      isverified = false;
    }
    if (!isverified) {

      this.toaster.error("Please select the required fields for completion of this stage");
    }
    else {
      let loanProgress = new LoanProgressModel();
      loanProgress.appyingChanges = Progress.start;
      this.loanApplicationService.loanProgress.next(loanProgress);
      this.isSubmitted = true;
      this.loanApplicationService.addEditverificationdata(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          setTimeout(() => {

            //this.toaster.success(result.responseMessage);
            //this.loadSave = false;
            this.isSubmitted = false;
            loanProgress.appyingChanges = Progress.completed;
            this.loanApplicationService.loanProgress.next(loanProgress);
            loanProgress.applyingRules = Progress.start;
            loanProgress.result = result;
            this.loanApplicationService.loanProgress.next(loanProgress);

            this.isModel = false;
            this.wizardOutput.emit((this.wizardIndex + 1));
            this.ntpemit.emit();
          
            //this.loanInfoEmit.emit(result);
            //this.loanApplicationService.sftp(this.Id, this.LoanApplicationNumber).subscribe((result: any) => {
            //  if (result.statusCode == 200) { }
            //});
          }, 1000);
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
          this.isSubmitted = false;
        }
      }, error => {
        this.loadSave = false;
        this.isSubmitted = false;
      });
    }
  }


  selectAllDocs(e: any) {
    //this.lstpagearray = [];
    //this.customCompnentValues.forEach(x => {
    //  let obj2 = new appverificationmdoel();
    //  obj2.id = x.Id;
    //  obj2.values = (e.target.checked && x.IsRequired == true) ? '1' : '0';
    //  obj2.type = x.Type;
    //  x.IsVerified = (x.IsRequired) ? e.target.checked : false;
    //  obj2.isrequired = x.IsRequired;
    //  obj2.isVerified = (x.IsRequired) ? e.target.checked : false;
    //  this.lstpagearray.push(obj2);
    //});
    this.lstpagearray = [];
    this.docinfo.forEach(x => {
      if (x.IsRequired == true) {
        x.IsVerified = this.selectAllValue;
        let obj2 = new appverificationmdoel();
        obj2.id = x.Id;
        obj2.values = (this.selectAllValue && x.IsRequired == true) ? '1' : '0';
        obj2.type = x.Type; 
        obj2.isrequired = x.IsRequired;
        obj2.isVerified = (x.IsRequired) ? this.selectAllValue : false;
        this.lstpagearray.push(obj2);
      }
    });
    this.stageinfo.forEach(x => {
      if (x.IsRequired == true) {
        x.IsVerified = this.selectAllValue;
        let obj2 = new appverificationmdoel();
        obj2.id = x.Id;
        obj2.values = (this.selectAllValue && x.IsRequired == true) ? '1' : '0';
        obj2.type = x.Type;
        obj2.isrequired = x.IsRequired;
        obj2.isVerified = (x.IsRequired) ? this.selectAllValue : false;
        this.lstpagearray.push(obj2);
      }
    });
    //// console.log('selected result:', this.lstpagearray);

  }


}

