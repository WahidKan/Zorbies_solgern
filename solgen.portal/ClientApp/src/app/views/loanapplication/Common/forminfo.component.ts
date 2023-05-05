import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CommonService, ModuleList } from '../../shared/common.service';
import { LoanapplicationserviceService, JsonData, CheckboxData, LoanProgressModel, Progress } from '../loanapplicationservice.service';


@Component({
  selector: 'app-forminfo',
  templateUrl: './forminfo.component.html'
})

export class FormInfoComponent implements OnInit, OnChanges {
  @ViewChild('previewModelPoup', { static: false }) previewModal: ModalDirective;
  @ViewChild('fileInput1', { static: false }) fileInput1: ElementRef;
  @ViewChild('fileInput2', { static: false }) fileInput2: ElementRef;
  @ViewChild('fileInput3', { static: false }) fileInput3: ElementRef;
  @ViewChild('fileInput4', { static: false }) fileInput4: ElementRef;
  ngOnChanges() {
    //// console.log('LoanId: ', this.loanid);
    if (this.leadconvert) {
      this.Id = this.loanid;

    }
  }
  @Input('submoduleName') submoduleName: any
  @Input('moduleName') moduleName: any
  @Input('itemdata12') itemdata12: any;
  @Input('borrowerPhoneNumber') borrowerPhoneNumber: any;
  @Input('applicantemail') applicantemail: any;
  @Input('checkflag') checkflag: any;
  @Input('leadconvert') leadconvert: any;
  @Input('leadid') leadconvertedid: any;
  @Input('loanid') loanid: any;
  @Input('wizardIndex') wizardIndex: number;
  @Input('totalWizard') totalWizardlength: number;
  @Input('formtype') formtype: any;
  @Output() ntpemit = new EventEmitter();
  @Output() hidePopup = new EventEmitter();
  @Output() wizardOutput = new EventEmitter<number>();
  @Output() finishWizard = new EventEmitter<number>();
  //moduleName = 'finance';
  //submoduleName = 'LoanApplicationInfo';
  companyId: any;
  userId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  checkboxdata1: Array<CheckboxData> = [];
  usertype: string;
  isflag = false;
  isModel = false;
  Id: any = '';
  customCompnentValues: any;
  formControlList: any[] = [];
  href2: any[] = [];
  formLoanApplication: FormGroup;
  loadSave = false;
  JsonData: JsonData = new JsonData();
  IsInstallStep: boolean = true;
  fileNameHouseInView: any;
  HouseInViewFilePath: any;
  fileNameElectricHookup: any;
  ElectricHookupFilePath: any;
  fileNameResidenceWithAddress: any;
  ResidenceWithAddressFilePath: any;
  fileNameBatteryStorage: any;
  BatteryStorageFilePath: any;
  fileExtension: any;
  fileHouseInViewImageLink: any;
  fileHouseInViewImageLink1: any;
  fileElectricHookupImageLink: any;
  fileElectricHookupImageLink1: any;

  fileResidenceWithAddressInView: any;
  fileResidenceWithAddressInViewLink: any;
  fileResidenceWithAddressInViewLink1: any;
  fileBatteryStorage: any;
  fileBatteryStorageLink: any;
  fileBatteryStorageLink1: any;


  isformtype: string;
  isChanged: boolean = false;
  currentStageName: any;
  showData: any[] = [];
  hideReason = true;
  ReasonField: any = "";
  MaxLengthForReason: number = 1000;
  HouseInViewFormName: any = '';
  ElectricHookupFormName: any = '';
  ResidenceWithAddressInViewFormName: any = '';
  BatteryStorageFormName: any = '';
  isDealerUser: boolean = false;
  isSMSEmailReceive: boolean = false;
  IsSMSReplied: boolean = false;
  IsAuditOverride: boolean = false;
  hideInstallStepBtn: boolean = false;
  hideAuditStepBtn: boolean = false;
  ntpFundingInstallerAmount: number = 0;
  houseInViewFiles: string[] = [];
  electricHookupFiles: string[] = [];
  residenceWithAddressFiles: string[] = [];
  batteryStorageFiles: string[] = [];
  isCompanyAdmin: boolean = false;
  isAudit: boolean = false;

  BatteryStorageDDValue: string = '';
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private commonService: CommonService,
    private router: Router, private loanApplicationService: LoanapplicationserviceService, private toaster: ToastrService,
    private dialogService: ConfirmationDialogService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.isformtype = this.formtype;
    this.IsInstallStep = true;
    this.addOrUpdatePermission = false;
    this.usertype = localStorage.getItem("usertype");
    //// console.log("borrowerPhoneNumber", this.borrowerPhoneNumber);
    //// console.log("itemdata12 1111", this.itemdata12);
    //// console.log("itemdata12 1111", this.itemdata12.stageName);
    if (this.itemdata12.stageName != undefined) {
      this.currentStageName = this.itemdata12.stageName;
    }
    if (this.itemdata12.stageName == 'Install Step' && this.itemdata12.stageapproved == 1 && this.itemdata12.stageActive == 1) {
      this.hideInstallStepBtn = true;
    }
    else {
      this.hideInstallStepBtn = false;
    }
    if (this.itemdata12.stageName == 'Audit' && this.itemdata12.stageapproved == 1 && this.itemdata12.stageActive == 1) {
      this.hideAuditStepBtn = true;
    }
    else {
      this.hideAuditStepBtn = false;
    }

    //// console.log("formInforCheckFlag", this.checkflag);
    if (!this.checkflag) {
      //// console.log("formInforCheckFlag1", this.checkflag);
      this.isflag = false;
    }


    else {
      //// console.log("formInforCheckFlag2", this.checkflag);
      //// console.log("formInforCheckFlag2" , this.itemdata12.userTypes)
      if (this.itemdata12.userTypes == undefined) {
        this.isflag = true;  // or false
      }
      else {
        var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
        var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
        if (haspermission) {
          this.isflag = true;
        }
      }
    }
    if (this.leadconvert == true) {

      this.isflag = true;
    }

    if (this.usertype.toLocaleLowerCase() === "usertypedealer") {
      this.isDealerUser = true;
    }
    else {
      this.isDealerUser = false;
    }

    if (this.usertype.toLocaleLowerCase() == "usertypecompanyadmin") {
      this.isCompanyAdmin = true;
    }
    else {
      this.isCompanyAdmin = false;
    }


    if (this.usertype.toLocaleLowerCase() == "usertypeaudit") {
      this.isAudit = true;
    }
    else {
      this.isAudit = false;
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

  GetFormData() {
    this.isModel = false;
    if (this.ntpemit.observers.length > 0) {
      this.isModel = true;
    }

    debugger;
    this.loanApplicationService.GetFormFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id).subscribe((result: any) => {
      if (result) {

        //// console.log("dynamic data", this.loanApplicationService.formFieldsList);
        this.customCompnentValues = this.loanApplicationService.formFieldsList.data;
        let BatteryCapacityValue: any = "";
        let BatteryStorageValue: any = "";

        debugger;
        if (this.loanApplicationService.formFieldsList.data.length != 0) {
          var val = this.loanApplicationService.formFieldsList.data;
          this.IsSMSReplied = val[0].IsSMSReplied;
          this.isSMSEmailReceive = val[0].isSMSEmailReceive;
          this.IsAuditOverride = val[0].IsOverride;
        }
        if (this.loanApplicationService.formFieldsList.data.length != 0) {
          this.ntpFundingInstallerAmount = this.loanApplicationService.formFieldsList.data[0];
        }

        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);

          if (t.dt_code == 'select' && t.picklist_options == 'true' && t.value !== "") {
            //// console.log("select true");
            t.value = JSON.parse(t.value);
          }
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }
            this.formControlList.push(obj);
          }
          if (t.name == 'BatteryCapacityInstalled' || t.name == 'Battery Capacity Installed') {
            BatteryCapacityValue = t.value;
          }

          if (t.name == 'Battery Storage') {
            if (t.value == "") {
              BatteryStorageValue = t.value;
              if (t.select_options != null) {
                var dropval = t.select_options.filter(x => x.name == 'No Battery installed');
                //// console.log('dropval', dropval);
                t.value = dropval[0].value;
                this.BatteryStorageDDValue = dropval[0].name;
              }
              else{}
            } else {var dropval=null;
              var dropval1 = t.select_options.filter(x => x.value == t.value);
              this.BatteryStorageDDValue = dropval1[0].name;
            }
          }


        })

        const group: any = {};
        this.customCompnentValues.forEach(cnt => {
          let val = null;

          //if (cnt.actual_data_type == 'bit') {
          //  val = cnt.value == 1 ? true : false;
          //}


          //Added By anish 11-05-2021

          if (cnt.actual_data_type == 'bit' || cnt.actual_data_type == 'boolean') {
            val = cnt.value == 1 ? '1' : '0';

            if (cnt.name == "Audit" && cnt.value == "") {
              val = cnt.value == "" ? "1" : "0";
              this.hideReason = false;////////////////
            }
            else if (cnt.value == "1") {/////
              this.hideReason = false;/////////////
            }///////////////
          }

          else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
            if (cnt.value == "") {
              val = null;
            } else {
              let val1 = new Date(cnt.value);
              // // console.log('month', val1.getMonth() + 1);
              val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
            }
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
                this.formLoanApplication.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          let decimalPlace = '';
          if (cnt.actual_data_type == "decimal") {
            decimalPlace = this.commonService.getUpToDecimalPoint(cnt.decimal_places)
          }
          if (cnt.name == "Reason") {
            this.ReasonField = cnt.form_controlName;
            this.MaxLengthForReason = cnt.length;
          }
          if (cnt.name == 'HouseInView') {
            this.fileNameHouseInView = cnt.value;
            this.HouseInViewFilePath = cnt.value;
            this.HouseInViewFormName = cnt.form_controlName;
            this.GetFileUploadSource(cnt.value);
          }
          if (cnt.name == 'ElectricHookup') {

            this.fileNameElectricHookup = cnt.value;
            this.ElectricHookupFilePath = cnt.value;
            this.ElectricHookupFormName = cnt.form_controlName;
            this.GetFileUploadSourceElectricHookup(cnt.value);
          }
          if (cnt.name == 'ResidenceWithAddressInView') {

            this.fileNameResidenceWithAddress = cnt.value;
            this.ResidenceWithAddressFilePath = cnt.value;
            this.ResidenceWithAddressInViewFormName = cnt.form_controlName;
            this.GetFileUploadSourceResidenceWithAddress(cnt.value);
          }
          if (cnt.name == 'BatteryStorage') {
            //// console.log('cnt', cnt);
            this.fileNameBatteryStorage = cnt.value;
            this.BatteryStorageFilePath = cnt.value;
            this.BatteryStorageFormName = cnt.form_controlName;

            //// console.log('sads', this.BatteryStorageDDValue);

            if (this.BatteryStorageDDValue == 'No Battery installed')
              cnt.is_required = false;
            else
              cnt.is_required = true;


            this.GetFileUploadSourceBatteryStorage(cnt.value);
          }
          if (cnt.name == 'Battery Capacity Installed') {

            //// console.log("BatteryStorageValue", BatteryStorageValue)
            if (BatteryStorageValue == "") {
              cnt.is_readOnly = true;
            }
          }
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") : cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "decimal" ? Validators.pattern(`[0-9]+(\.${decimalPlace}?)?`) : Validators.nullValidator
          ])
        });


        //// console.log("customCompnentValues final", this.customCompnentValues);

        this.formLoanApplication = new FormGroup(group);
        if (!this.hideReason) {
          this.formLoanApplication.get(this.ReasonField).setValidators(Validators.nullValidator);
        }
        this.loadSave = false;
      }
    });
  }
  checkvalue(formvalues, selval) {
    let returnValue = false;
    if (formvalues != null) {
      // // console.log("formvaluesformvaluesformvalues", formvalues);
      formvalues.split(',').find((item) => {
        if (item == selval) {
          // // console.log('abc');
          returnValue = true;

        }
      });
    }
    return returnValue;
  }
  onCheckboxChange(e, groupdisp, controldisp) {
    // // console.log('new', controldisp);
    //const index2: number = this.formControlList.indexOf(groupdisp);
    //const index1: number = controldisp.display_order;

    let checkboxdatanew = new CheckboxData();
    checkboxdatanew.controlname = controldisp.ColumnName;
    if (e.target.checked) {
      let strvalues = "";
      if (this.checkboxdata1.length > 0) {
        strvalues = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues;
      }
      if (strvalues == "") {
        checkboxdatanew.controlvalues = e.target.labels[0].innerHTML;
        this.checkboxdata1.push(checkboxdatanew);
      } else {
        let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
        let index = this.checkboxdata1.indexOf(updateItem);
        this.checkboxdata1[index].controlvalues = strvalues + "," + e.target.labels[0].innerHTML;


      }


      //  if (this.formControlList[index2].InnerData[index1].value == "") {
      //    this.formControlList[index2].InnerData[index1].value = e.target.labels[0].innerHTML;

    }
    else {

      let strs = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues.split(",");

      let updatedval = strs.splice(strs.indexOf(e.target.labels[0].innerHTML), 1);
      //checkboxdatanew.controlvalues = updatedval.toString();
      let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
      let index = this.checkboxdata1.indexOf(updateItem);
      this.checkboxdata1[index].controlvalues = strs.toString();
      //this.checkboxdata1.push(checkboxdatanew);
      //    this.formControlList[index2].InnerData[index1].value = this.formControlList[index2].InnerData[index1].value + "," + e.target.labels[0].innerHTML;
    }
    //}
    //else {
    //  this.formControlList[index2].InnerData[index1].value=this.removeValue(this.formControlList[index2].InnerData[index1].value, e.target.labels[0].innerHTML, ',');
    //}
    // // console.log('this.checkboxdata1this.checkboxdata1', this.checkboxdata1);
    var dd = this.formControlList;

  }

  finish() {
    this.onSubmitLoanApplication();
    this.finishWizard.emit(1);
  }
  backStep() {
    this.wizardOutput.emit((this.wizardIndex - 1));
  }
  skipStep() {
    this.wizardOutput.emit((this.wizardIndex + 1));
  }

  onSubmitLoanApplication() {
    this.loadSave = true;

    if (this.hideReason === false) {
      this.formLoanApplication.controls[this.ReasonField].reset();
    }

    this.checkboxdata1.forEach((item) => {
      // // console.log(item.controlname);
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.formLoanApplication.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.formLoanApplication.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    if (this.formLoanApplication.valid) {

      //if (this.currentStageName == 'NTP Funding' || this.currentStageName == 'Installer Funding') {
      //  let loanProgress = new LoanProgressModel();
      //  loanProgress.appyingChanges = Progress.start;
      //  this.loanApplicationService.loanProgress.next(loanProgress);
      //}


      if (this.leadconvert == true && (this.loanid != null || this.loanid == 'undefined' || this.loanid == '')) {
        this.Id = this.loanid;
        //   var leadidforconversion = this.leadconvertedid
      }
      this.loadSave = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.leadconvert = this.leadconvert;
      this.JsonData.leadid = this.leadconvertedid;
      this.JsonData.FormJsonData = JSON.stringify(this.formLoanApplication.value);
      this.JsonData.StageName = this.currentStageName;
      //// console.log('this.JsonData', this.JsonData);
      //;
      this.loanApplicationService.addEditFormDynamic(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          setTimeout(() => {
            //if (this.currentStageName == 'NTP Funding' || this.currentStageName == 'Installer Funding') {
            //  let loanProgress = new LoanProgressModel();
            //  loanProgress.appyingChanges = Progress.completed;
            //  this.loanApplicationService.loanProgress.next(loanProgress);
            //  loanProgress.applyingRules = Progress.start;
            //  loanProgress.result = result;
            //  this.loanApplicationService.loanProgress.next(loanProgress);
            //}

            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.isModel = false;
            this.wizardOutput.emit((this.wizardIndex + 1));
            this.ntpemit.emit();
          }, 1000);
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
        }
      }, error => {
        //if (this.currentStageName == 'NTP Funding' || this.currentStageName == 'Installer Funding') {
        //  let loanProgress = new LoanProgressModel();
        //  loanProgress.appyingChanges = Progress.failed;
        //  this.loanApplicationService.loanProgress.next(loanProgress);
        //}

        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.formLoanApplication);
      this.loadSave = false;

    }
  }


  onSubmitLoanApplicationFile() {

    this.loadSave = true;

    this.checkboxdata1.forEach((item) => {
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {

          this.formLoanApplication.get(item.controlname).setValue(item.controlvalues);
        } else {

          this.formLoanApplication.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    if (this.formLoanApplication.valid) {
      if (this.leadconvert == true && (this.loanid != null || this.loanid == 'undefined' || this.loanid == '')) {
        this.Id = this.loanid;
      }
      this.loadSave = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.leadconvert = this.leadconvert;
      this.JsonData.leadid = this.leadconvertedid;

      const saveInstallStepFile = this.prepareFormDataForDocument();

      //this.JsonData.FormJsonData = saveInstallStepFile; 
      //// console.log("this.JsonData.FormJsonData", this.JsonData.FormJsonData);
      //// console.log("saveInstallStepFile", saveInstallStepFile);
      //;
      this.loanApplicationService.addEditInstallStep(saveInstallStepFile).subscribe((result: any) => {
        //// console.log('install response', result)
        if (result.statusCode == 200) {
          setTimeout(() => {

            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.isModel = false;
            this.wizardOutput.emit((this.wizardIndex + 1));

            //// console.log('sas')
            this.ntpemit.emit();
          }, 1000);
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.formLoanApplication);
      this.loadSave = false;

    }
  }

  //====================================File Upload Section=========================================
  setFileHouseInView($event, frmControlName): void {
    //;
    //// console.log('32423423423', $event.target.files);
    if ($event.target.files.length > 2 || this.houseInViewFiles.length > 1) {
      //;
      this.toaster.error('You can only upload maximum 2 files.');
    }

    else {
      this.commonService.uploadPDFANDIMGAEFileValidator($event);
      for (let i = 0; i < $event.target.files.length; i++) {
        this.commonService.uploadDocumentSize("img", $event.target.files[i].size, "10MB")
        if (this.commonService.isFileValid) {
          this.houseInViewFiles.push($event.target.files[i]);
          if (this.fileNameHouseInView != "")
            this.fileNameHouseInView = this.fileNameHouseInView + ",";
          this.fileNameHouseInView = this.fileNameHouseInView + $event.target.files[0].name;
          this.fileExtension = this.fileNameHouseInView.replace(/^.*\./, '');
          this.formLoanApplication.get(this.HouseInViewFormName).setValue(this.fileNameHouseInView);
        }
      }
    }
  }

  ElectricHookupsetFile($event): void {
    //;
    if ($event.target.files.length > 2 || this.electricHookupFiles.length > 1) {
      this.toaster.error('You can only upload maximum 2 files.');
    }
    else {
      this.commonService.uploadPDFANDIMGAEFileValidator($event);
      for (let i = 0; i < $event.target.files.length; i++) {
        this.commonService.uploadDocumentSize("img", $event.target.files[i].size, "10MB")
        if (this.commonService.isFileValid) {
          this.electricHookupFiles.push($event.target.files[i]);
          if (this.fileNameElectricHookup != "")
            this.fileNameElectricHookup = this.fileNameElectricHookup + ",";
          this.fileNameElectricHookup = this.fileNameElectricHookup + $event.target.files[0].name;
          this.fileExtension = this.fileNameElectricHookup.replace(/^.*\./, '');
          this.formLoanApplication.get(this.ElectricHookupFormName).setValue(this.fileNameElectricHookup);
        }
      }
    }
  }


  ResidenceWithAddressSetFile($event): void {
    //;
    if ($event.target.files.length > 2 || this.residenceWithAddressFiles.length > 1) {
      this.toaster.error('You can only upload maximum 2 files.');
    }
    else {
      this.commonService.uploadPDFANDIMGAEFileValidator($event);
      for (let i = 0; i < $event.target.files.length; i++) {
        this.commonService.uploadDocumentSize("img", $event.target.files[i].size, "10MB")
        if (this.commonService.isFileValid) {
          this.residenceWithAddressFiles.push($event.target.files[i]);
          if (this.fileNameResidenceWithAddress != "")
            this.fileNameResidenceWithAddress = this.fileNameResidenceWithAddress + ",";
          this.fileNameResidenceWithAddress = this.fileNameResidenceWithAddress + $event.target.files[0].name;
          this.fileExtension = this.fileNameResidenceWithAddress.replace(/^.*\./, '');
          this.formLoanApplication.get(this.ResidenceWithAddressInViewFormName).setValue(this.fileNameResidenceWithAddress);
        }
      }
    }
  }

  BatteryStorageSetFile($event): void {
    //;
    if ($event.target.files.length > 2 || this.batteryStorageFiles.length > 1) {
      this.toaster.error('You can only upload maximum 2 files.');
    }
    else {
      this.commonService.uploadPDFANDIMGAEFileValidator($event);
      for (let i = 0; i < $event.target.files.length; i++) {
        this.commonService.uploadDocumentSize("img", $event.target.files[i].size, "10MB")
        if (this.commonService.isFileValid) {
          this.batteryStorageFiles.push($event.target.files[i]);
          if (this.fileNameBatteryStorage != "")
            this.fileNameBatteryStorage = this.fileNameBatteryStorage + ",";
          this.fileNameBatteryStorage = this.fileNameBatteryStorage + $event.target.files[0].name;
          this.fileExtension = this.fileNameBatteryStorage.replace(/^.*\./, '');
          this.formLoanApplication.get(this.BatteryStorageFormName).setValue(this.fileNameBatteryStorage);
        }
      }
    }
  }

  setradioValue(value, type, e = null) {


    //if (e != null && this.isChanged == false) {
    //  this.hideReason = (e == '0');
    //}
    if (e != null && this.isChanged == false) {
      this.hideReason = (e == '0');
    }
    if (String(value).split('^').length > 0) {
      if (type == "val") {
        if (value.search('^') == -1) {

          return String(value).split('^')[1];
        }
        else {

          if (String(value).includes("Approved")) {
            return "1";
          }
          else {
            return "0";
          }
        }

      }
      else {
        return String(value).split('^')[0];
      }
    }
    else {
      return value;
    }
  }

  clearSelectedImg(element) {
    //// console.log("ssdasdadadasd", element);

    element.value = "";
    this.fileInput1.nativeElement.value = "";
    this.fileNameHouseInView = '';
    this.HouseInViewFilePath = '';
    this.fileNameElectricHookup = '';
    this.ElectricHookupFilePath = '';
    this.fileNameResidenceWithAddress = '';
    this.ResidenceWithAddressFilePath = '';
    this.fileNameBatteryStorage = '';
    this.BatteryStorageFilePath = '';
  }

  private prepareFormDataForDocument() {

    this.JsonData.FormJsonData = JSON.stringify(this.formLoanApplication.value);
    const input = new FormData();
    //// console.log("asdasdasd", this.fileInput1);
    input.append('userId', this.userId);
    input.append('BorrowerPhoneNumber', this.borrowerPhoneNumber);
    input.append('ApplicantEmail', this.applicantemail);
    input.append('companyId', this.companyId);
    input.append('ModuleCode', this.moduleName);
    input.append('SubModuleCode', this.submoduleName);
    input.append('Id', this.Id);
    input.append('leadconvert', this.leadconvert == true ? 'true' : 'false');
    input.append('isSubmitted', 'true');
    let data = JSON.stringify(this.formLoanApplication.value);
    input.append('FormJsonData', data);


    /*    input.append('HouseInViewfile', this.fileNameHouseInView);*/
    input.append('HouseInViewfile', this.HouseInViewFilePath);



    /*input.append('ElectricHookupfile', this.fileNameElectricHookup);*/
    input.append('ElectricHookupfile', this.ElectricHookupFilePath);
    /*    input.append('ResidenceWithAddressInViewfile', this.fileNameResidenceWithAddress);*/
    input.append('ResidenceWithAddressInViewfile', this.ResidenceWithAddressFilePath);
    /* input.append('BatteryStoragefile', this.fileNameBatteryStorage);*/
    input.append('BatteryStoragefile', this.BatteryStorageFilePath);
    //const fileBrowser = this.fileInput1.nativeElement;
    if (this.houseInViewFiles) {
      for (let i = 0; i < this.houseInViewFiles.length; i++) {
        input.append('file', this.houseInViewFiles[i]);
      }
    }

    //const fileBrowser1 = this.fileInput2.nativeElement;
    if (this.electricHookupFiles) {
      for (let i = 0; i < this.electricHookupFiles.length; i++) {
        input.append('file2', this.electricHookupFiles[i]);
      }
    }

    //const fileBrowser2 = this.fileInput3.nativeElement;
    if (this.residenceWithAddressFiles) {
      for (let i = 0; i < this.residenceWithAddressFiles.length; i++) {
        input.append('file3', this.residenceWithAddressFiles[i]);
      }
    }

    // const fileBrowser4 = this.fileInput4.nativeElement;
    if (this.batteryStorageFiles) {
      for (let i = 0; i < this.batteryStorageFiles.length; i++) {
        input.append('file4', this.batteryStorageFiles[i]);
      }
    }

    return input;
  }

  GetFileUploadSource(fileNameHouseInView) {
    this.fileHouseInViewImageLink = "";
    this.fileHouseInViewImageLink1 = "";

    if (fileNameHouseInView) {
      let href = fileNameHouseInView.split(',');
      //// console.log('href', href);

      if (href.length > 1) {
        this.fileHouseInViewImageLink = href[0];
        this.fileHouseInViewImageLink1 = href[1];
        var filename = href[0].substring(href[0].lastIndexOf('/') + 1);
        var filename1 = href[1].substring(href[1].lastIndexOf('/') + 1);
        this.fileNameHouseInView = filename + ',' + filename1;
      }
      else {
        this.fileHouseInViewImageLink = href[0];
        var filename = href[0].substring(href[0].lastIndexOf('/') + 1);
        //// console.log('filename', filename);
        this.fileNameHouseInView = filename;
      }
    }

  }

  GetFileUploadSourceElectricHookup(fileNameElectricHookup) {

    this.fileElectricHookupImageLink = "";
    this.fileElectricHookupImageLink1 = "";

    if (fileNameElectricHookup) {
      let href = fileNameElectricHookup.split(',');

      if (href.length > 1) {
        this.fileElectricHookupImageLink = href[0];
        this.fileElectricHookupImageLink1 = href[1];
        var filename = href[0].substring(href[0].lastIndexOf('/') + 1);
        var filename1 = href[1].substring(href[1].lastIndexOf('/') + 1);
        this.fileNameElectricHookup = filename + ',' + filename1;
      }
      else {
        this.fileElectricHookupImageLink = href[0];
        var filename = href[0].substring(href[0].lastIndexOf('/') + 1);
        //// console.log('filename', filename);
        this.fileNameElectricHookup = filename;
      }

    }
  }

  GetFileUploadSourceResidenceWithAddress(filename) {
    this.fileResidenceWithAddressInViewLink = "";
    this.fileResidenceWithAddressInViewLink1 = "";

    if (filename) {
      let href = filename.split(',');

      if (href.length > 1) {
        this.fileResidenceWithAddressInViewLink = href[0];
        this.fileResidenceWithAddressInViewLink1 = href[1];
        var filename = href[0].substring(href[0].lastIndexOf('/') + 1);
        var filename1 = href[1].substring(href[1].lastIndexOf('/') + 1);
        this.fileNameResidenceWithAddress = filename + ',' + filename1;
      }
      else {
        this.fileResidenceWithAddressInViewLink = href[0];
        var filename = href[0].substring(href[0].lastIndexOf('/') + 1);
        //// console.log('filename', filename);
        this.fileNameResidenceWithAddress = filename;
      }

    }
  }

  GetFileUploadSourceBatteryStorage(filename) {

    this.fileBatteryStorageLink = "";
    this.fileBatteryStorageLink1 = "";

    if (filename) {
      let href = filename.split(',');


      if (href.length > 1) {
        this.fileBatteryStorageLink = href[0];
        this.fileBatteryStorageLink1 = href[1];
        var filename = href[0].substring(href[0].lastIndexOf('/') + 1);
        var filename1 = href[1].substring(href[1].lastIndexOf('/') + 1);
        this.fileNameBatteryStorage = filename + ',' + filename1;
      }
      else {
        this.fileBatteryStorageLink = href[0];
        var filename = href[0].substring(href[0].lastIndexOf('/') + 1);
        //// console.log('filename', filename);
        this.fileNameBatteryStorage = filename;
      }
    };

  }

  RemoveHouseInView() {
    //;
    // this.fileNameHouseInView = "";
    //this.fileNameHouseInView.replace(this.fileHouseInViewImageLink, '');
    // this.fileNameHouseInView.replace(',', '');
    this.fileNameHouseInView = this.fileHouseInViewImageLink1.replace(/^.*(\\|\/|\:)/, '');;//remove file0 and take file1--get only file name
    this.fileHouseInViewImageLink = "";
  }

  RemoveHouseInView1() {
    //;
    this.fileNameHouseInView = this.fileHouseInViewImageLink.replace(/^.*(\\|\/|\:)/, '');////remove file1 and take file0--get only file name
    this.fileHouseInViewImageLink1 = "";
  }

  RemoveElecticHookup() {
    //this.fileNameElectricHookup = "";
    this.fileNameElectricHookup = this.fileElectricHookupImageLink1.replace(/^.*(\\|\/|\:)/, '');
    this.fileElectricHookupImageLink = "";
  }

  RemoveElecticHookup1() {
    /* this.fileNameElectricHookup = "";*/
    this.fileNameElectricHookup = this.fileElectricHookupImageLink.replace(/^.*(\\|\/|\:)/, '');
    this.fileElectricHookupImageLink1 = "";
  }

  RemoveResidence() {
    // this.fileNameResidenceWithAddress = "";
    this.fileNameResidenceWithAddress = this.fileResidenceWithAddressInViewLink1.replace(/^.*(\\|\/|\:)/, '');
    this.fileResidenceWithAddressInViewLink = "";
  }

  RemoveResidence1() {
    //this.fileNameResidenceWithAddress = "";
    this.fileNameResidenceWithAddress = this.fileResidenceWithAddressInViewLink.replace(/^.*(\\|\/|\:)/, '');
    this.fileResidenceWithAddressInViewLink1 = "";
  }

  RemoveBatteryStorage() {
    // this.fileNameBatteryStorage = "";
    this.fileNameBatteryStorage = this.fileBatteryStorageLink1.replace(/^.*(\\|\/|\:)/, '');
    this.fileBatteryStorageLink = "";
  }

  RemoveBatteryStorage1() {
    //this.fileNameBatteryStorage = "";
    this.fileNameBatteryStorage = this.fileBatteryStorageLink.replace(/^.*(\\|\/|\:)/, '');
    this.fileBatteryStorageLink1 = "";
  }

  OnAuditRadioButtonChanged(e) {
    this.hideReason = e.toString().trim() === 'Deny' ? true : false;
    //// console.log("hideReason", this.hideReason);
    var keys = Object.keys(this.formLoanApplication.value);
    if (this.hideReason === false) {
      this.formLoanApplication.controls[this.ReasonField].reset();
      keys.forEach(t => {
        if (String(t).includes("Reason")) {
          this.formLoanApplication.get(t).setValidators(Validators.nullValidator);
          //this.ntpChangeOrderForm.controls['182_Reason'].setValidators(Validators.nullValidator);
        }
      });
    }
    else {

      keys.forEach(t => {
        if (String(t).includes("Reason")) {
          const validators = [Validators.required, Validators.maxLength(this.MaxLengthForReason)]
          this.formLoanApplication.get(t).setValidators(validators);

        }
      });
      // this.ntpChangeOrderForm.controls['182_Reason'].setValidators(Validators.required);
    }

    keys.forEach(t => {
      if (String(t).includes("Reason")) {
        this.formLoanApplication.get(t).updateValueAndValidity();
        //this.ntpChangeOrderForm.controls['182_Reason'].updateValueAndValidity();
      }
    });

    this.isChanged = true;
  }
  getVisibilityStatus(name): boolean {

    if (name.toString() == 'Reason') {
      if (this.hideReason == true) {
        return true;
      }
      return false;
    }
    else {
      return true;
    }
  }


  check(e: any, item: any, control: any, id: any,) {
    //// console.log('e', e);
    //// console.log('item', item);
    const ctrl = control;
    var tempid = String(id);
    const group: any = {};


    var tempdata = this.customCompnentValues.filter(m => m.is_dependent && m.dependent_value == item);
    //// console.log('formFieldradio', this.formField)


    if (tempdata.length > 0) {

      var index = this.formControlList.findIndex(x => x.form_field_id.toString() == ctrl.form_field_id.toString());

      tempdata.forEach((item, itemIndex) => {
        this.formControlList.splice(((index + 1) + itemIndex), 0, item);
      })
    }
    else {
      this.formControlList = this.formControlList.filter(m => String(m.dependent_id) != tempid);
    }

  }





  //=======================================================================================================


  clearSelectedHouseInViewfile(element) {
    //;
    this.formLoanApplication.get(this.HouseInViewFormName).setValue(null);
    element.value = "";
    this.fileInput1.nativeElement.value = "";
    this.fileNameHouseInView = '';
    this.HouseInViewFilePath = '';
    this.houseInViewFiles = [];

  }

  clearSelectedElectricHookupfile(element) {
    //;
    this.formLoanApplication.get(this.ElectricHookupFormName).setValue(null);
    element.value = "";
    this.fileInput2.nativeElement.value = "";
    this.fileNameElectricHookup = '';
    this.ElectricHookupFilePath = '';
    this.electricHookupFiles = [];
  }

  clearSelectedResidenceWithAddressInViewfile(element) {
    this.formLoanApplication.get(this.ResidenceWithAddressInViewFormName).setValue(null);
    element.value = "";
    this.fileInput3.nativeElement.value = "";
    this.fileNameResidenceWithAddress = '';
    this.ResidenceWithAddressFilePath = '';
    this.residenceWithAddressFiles = [];
  }

  clearBatteryStoragefile(element) {
    this.formLoanApplication.get(this.BatteryStorageFormName).setValue(null);
    element.value = "";
    this.fileInput4.nativeElement.value = "";
    this.fileNameBatteryStorage = '';
    this.BatteryStorageFilePath = '';
    this.batteryStorageFiles = [];
  }

  dropdownChange(e, cntrlName, formControlList, form_controlName) {
    let companyFieldName;
    //// console.log('formLoanApplication', this.formLoanApplication.value);

    var keys = Object.keys(this.formLoanApplication.value);
    //// console.log('keys', keys);


    if (cntrlName == 'Battery Storage') {

      if (typeof e != 'undefined' && e.name == 'Battery installed') {
        //// console.log('BatteryStorageFormName',this.BatteryStorageFormName);

        this.formLoanApplication.get(this.BatteryStorageFormName).setValidators(Validators.required);
        this.formLoanApplication.get(this.BatteryStorageFormName).updateValueAndValidity();

        keys.forEach(t => {
          if (String(t).includes("BatteryCapacityInstalled")) {
            //// console.log('t', t);
            this.formLoanApplication.get(t).setValidators([Validators.required, Validators.pattern("[0-9]{1,9}")]);
            this.formLoanApplication.get(t).updateValueAndValidity();
          }
        });

        let selectedValue = e.value;
        if (cntrlName == "Battery Storage") {
          formControlList.forEach(function (t1) {
            let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
            groupCheck[0].InnerData.forEach(function (t) {
              if (t.name == 'Battery Capacity Installed') {
                if (selectedValue != "")
                  t.is_readOnly = false;
                t.is_required = true;
              }
            });
          });
        }
      }
      else {
        //// console.log('BatteryStorageFormName11', this.BatteryStorageFormName);
        this.formLoanApplication.get(this.BatteryStorageFormName).setValidators(Validators.nullValidator);
        this.formLoanApplication.get(this.BatteryStorageFormName).updateValueAndValidity();
        formControlList.forEach(function (t1) {
          let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
          groupCheck[0].InnerData.forEach(function (t) {
            if (t.name == 'Battery Capacity Installed') {
              companyFieldName = t.form_controlName;
              t.is_readOnly = true;
              t.is_required = false;
            }
          });
        });
        if (this.formLoanApplication.get(companyFieldName) != null) {
          this.formLoanApplication.get(companyFieldName).setValue("");

          keys.forEach(t => {
            if (String(t).includes("BatteryCapacityInstalled")) {
              //// console.log('t', t);
              this.formLoanApplication.get(t).setValidators(Validators.nullValidator);
              this.formLoanApplication.get(t).updateValueAndValidity();
            }
          });

        }
      }
    }
  }

  overRide() {
    this.hidePopup.emit();
  }



  downloadFile(e: any, url: string) {
    //;
    e.preventDefault();
    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
      a.download = filename; // Set the file name.
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      //delete a;
    };
    xhr.open('GET', url);
    xhr.send();
  };

  previewImage: any;

  open(image: any): void {
    this.previewImage = image;
    this.previewModal.show();
  }

  closePreview() {
    this.previewModal.hide();
  };


}



