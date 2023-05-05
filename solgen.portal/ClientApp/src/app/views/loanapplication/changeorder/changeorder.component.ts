import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModuleList, CommonService } from '../../shared/common.service';
import { CheckboxData, JsonData, LoanapplicationserviceService, LoanProgressModel, Progress } from '../loanapplicationservice.service';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { UtcToPstDatePipe } from '../../../pipes/utctolocal.pipe';
import moment from 'moment';
import { LenderlistService } from '../../lender/lenderlist.service';
import { Data } from '@syncfusion/ej2-schedule/src/schedule/actions/data';

@Component({
  selector: 'app-changeorder',
  templateUrl: './changeorder.component.html',
  styleUrls: ['./changeorder.component.scss']
})
export class ChangeorderComponent implements OnInit {

  maxDateValue: Date
  @ViewChild('fileInput', { static: false }) fileInput;
  @Input('itemdata12') itemdata12: any;
  @Input('changeOrderDocWithR_F_S') changeOrderDocWithR_F_S: number = 0;
  @Input('hideChangeOrderButton') hideChangeOrderButton: boolean = false;
  @Input('leadconvert') leadconvert: boolean = false;
  @Input('CallFrom') CallFrom: any = 'STAGE';
  @Input('loanid') loanid: any;
  @Output() ntpemit = new EventEmitter();
  moduleName = 'finance';
  @Input('submoduleName') submoduleName: any;
  @Input('IsLACanceledFlag') IsLACanceledFlag: boolean = false;
  companyId: any;
  userId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  checkboxdata1: Array<CheckboxData> = [];
  isModel = false;
  Id: any = '';
  customCompnentValues: any;
  formControlList: any[] = [];
  changeOrderForm: FormGroup;
  loadSave = false;
  JsonData: JsonData = new JsonData();
  leadid: any;
  isSubmitted = false;
  enablefields: boolean = false;
  loanapplicantdata: any[] = [];
  fromStage: boolean = false;
  fileName: any;
  imageLink: any = '';
  previousLoanAmount:number = 0;
  newLoanAmount: number = 0;
  previousFieldName: any = '';
  newAmountFieldName: any = '';
  isFinanceUser = false;
  isSalesUser = false;
  isBankUser = false;
  isAdminUser = false;
  usertype: string;
  isflag = false;
  docformName: any = '';
  isSendNotification: any = 'Yes'
  fileExtension: any;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private lenderService: LenderlistService, private dialogService: ConfirmationDialogService, private commonService: CommonService, private router: Router, private loanApplicationService: LoanapplicationserviceService, private toaster: ToastrService, private utctopstdate: UtcToPstDatePipe) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);

  }
  ngOnChanges() {    
    if (this.IsLACanceledFlag) {
      this.isflag = false;
      this.IsLACanceledFlag = this.IsLACanceledFlag;
    }
    //this.GetFormData();
  }

  onSelectMethod(event, fieldName) {
    let d = new Date(Date.parse(event));
    const myDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    this.changeOrderForm.get(fieldName).setValue(myDate);
  }


  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {

        const id = params.get('id');
        if (id) {
          this.Id = id;
          this.fillapplicantForm(id);
          this.GetFormData();
          this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        } else {
          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
      }
    );
   
    this.loanApplicationService.loanChangeOrderrefreshComponent.subscribe((data: string) => {
      if (this.CallFrom != "TAB") {
        //// console.log('this.itemdata12.stageView', this.itemdata12.stageView)
        this.itemdata12.stageView = data;
        this.GetFormData();
      }
      
    });
   
    //// console.log('CallFrom', this.CallFrom);

    if (this.itemdata12.stageView == 'stageView') {
      this.fromStage = true;
    }
    else {
      this.fromStage = false;
    }

    this.maxDateValue = null;

    this.addOrUpdatePermission = false;
    this.usertype = localStorage.getItem("usertype");

    if (this.leadconvert != true) {

      if (this.usertype.toLocaleLowerCase() === "usertypefinance") {
        this.isFinanceUser = true;
        this.isBankUser = false;
        this.isAdminUser = false;
        this.isSalesUser = false;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertypebanker") {
        this.isBankUser = true;
        this.isFinanceUser = false;
        this.isAdminUser = false;
        this.isSalesUser = false;
      } else if (this.usertype.toLocaleLowerCase() === "usertypecompanyadmin") {
        this.isAdminUser = true;
        this.isFinanceUser = false;
        this.isBankUser = false;
        this.isSalesUser = false;
      }
      else if (this.usertype.toLocaleLowerCase() === "usertypesales") {
        this.isAdminUser = false;
        this.isFinanceUser = false;
        this.isBankUser = false;
        this.isSalesUser = true;
      }

      var haspermission = this.itemdata12.userTypes.toLowerCase().indexOf(this.usertype.toLowerCase()) != -1;
      if (haspermission) {
        this.isflag = true;
      }
    }
    if (this.leadconvert == true) {

      this.isflag = true;
    }

    this.IsLACanceledFlag = this.IsLACanceledFlag;
    if (this.IsLACanceledFlag) { this.isflag = false; }

    
  
}


  close() {
    this.isModel = false;
    this.GetFormData();
    this.ntpemit.emit();
  }

  
  
  GetFormData() {
    //this.loadSave = true;
    this.isModel = false;
    if (this.ntpemit.observers.length > 0) {
      this.isModel = true;
    }
   
    this.customCompnentValues = [];
    this.loanApplicationService.GetFormFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.itemdata12.stageView).subscribe((result: any) => {
      if (result) {
        var dateFormControl = null;
        
        
        this.customCompnentValues = this.loanApplicationService.formFieldsList.data;

        //// console.log('Applicant:', this.customCompnentValues)

        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.name == 'EmployerType') {
            t.isEnabled = this.enablefields;
          }
          else {
            t.isEnabled = false;
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
              displayOrder: t.group_display_order,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }
            this.formControlList.push(obj);
          }
        })
        const group: any = {};
        var ths = this;
        this.customCompnentValues.forEach(cnt => {
          let val = null;

          if (cnt.ColumnName == 'RequestedDate') {
            if (this.itemdata12.stageView == 'insertOperation'){
              cnt.value = new Date();
            }
          }

          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
            if (cnt.value == "" || cnt.value == null) {
              val = null;
            } else {
              if (cnt.ColumnName != 'DOB' && cnt.name != 'DOB') {
                val = this.utctopstdate.transform(cnt.value, null);
              } else {
                val = new Date(cnt.value);
              }
            }
            if (cnt.ColumnName == "DOB" && cnt.name == "DOB") {
              dateFormControl = cnt.form_controlName;
            }
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => { this.changeOrderForm.get(item.controlname).setValue(item.controlvalues.split(',')); });
            }
            catch (err) { }
          }

          if (cnt.ColumnName == 'ChangeOrderDoc') {
            this.fileName = cnt.value;
            this.docformName = cnt.form_controlName;
            this.GetFileUploadSource(cnt.value);
          }

          if (cnt.name == "LastLoanAmount") {
            this.previousFieldName = cnt.form_controlName;
          }
          if (cnt.name == "NewLoanAmount") {
            this.newAmountFieldName = cnt.form_controlName;
          }


          let decimalPlace = '';
          if (cnt.actual_data_type == "decimal") {
            decimalPlace = this.commonService.getUpToDecimalPoint(cnt.decimal_places)
          }
         
            group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
            (cnt.actual_data_type == "int") ? Validators.pattern("[0-9]{1,9}") : (cnt.actual_data_type == "bigint") ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern(`[0-9]+(\.${decimalPlace}?)?`) : Validators.nullValidator
            ])
          
        });
        this.formControlList.sort((a, b) => (a.displayOrder > b.displayOrder) ? 1 : ((b.displayOrder > a.displayOrder) ? -1 : 0));



        
        this.changeOrderForm = new FormGroup(group);

        //this.loadSave = false;
        

        //this.changeOrderForm.get(dateFormControl).setValidators(this.custValidation);
        //this.changeOrderForm.controls[dateFormControl].updateValueAndValidity();
      }
    });

 

  }

  GetFileUploadSource(file) {
    this.loanApplicationService.GetFileSource(this.Id,'changeOrder').subscribe((result: any) => {
      var getdata = JSON.parse(result);
      this.imageLink = getdata.data[0].FileUrl;
      //// console.log('this.imageLink', this.imageLink);
    })
  }

  checkvalue(formvalues, selval) {
    let returnValue = false;
    if (formvalues != null) {
      formvalues.split(',').find((item) => {
        if (item == selval) {
          returnValue = true;

        }
      });
    }
    return returnValue;
  }

  onCheckboxChange(e, groupdisp, controldisp) {

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
    }
    else {

      let strs = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues.split(",");

      let updatedval = strs.splice(strs.indexOf(e.target.labels[0].innerHTML), 1);
      //checkboxdatanew.controlvalues = updatedval.toString();
      let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
      let index = this.checkboxdata1.indexOf(updateItem);
      this.checkboxdata1[index].controlvalues = strs.toString();
       }
    
    var dd = this.formControlList;

  }


  private prepareFormDataForDocument() {

    this.isSubmitted = true;

 

    if (this.itemdata12.stageView == 'insertOperation') {
      this.JsonData.isForChangeOrder = 'insertOperation';
    }
    else {
      this.JsonData.isForChangeOrder = '';
    }
    this.JsonData.FormJsonData = JSON.stringify(this.changeOrderForm.value);



    const input = new FormData();
    input.append('userId', this.userId);
    input.append('companyId', this.companyId);
    input.append('ModuleCode', this.moduleName);
    input.append('SubModuleCode', this.submoduleName);
    input.append('Id', this.Id);
    input.append('leadconvert', this.leadconvert==true?'true':'false');
    input.append('isSubmitted', 'true');
    input.append('isForChangeOrder', this.JsonData.isForChangeOrder);
    input.append('isSendNotification', this.isSendNotification);
    input.append('fileExtension', this.fileExtension);
    input.append('FileUrl', this.imageLink != null ? this.imageLink:'');
    let data = JSON.stringify(this.changeOrderForm.value);



    input.append('FormJsonData', data);

      const fileBrowser = this.fileInput.nativeElement;
      if (fileBrowser.files && fileBrowser.files[0]) {
        input.append('file', fileBrowser.files[0]);
      }
    
    return input;
  }


  onSubmitData() {
    if (this.changeOrderForm.valid) {
      let loanProgress = new LoanProgressModel();
      loanProgress.appyingChanges = Progress.start;
      this.loanApplicationService.loanProgress.next(loanProgress);

      //this.previousLoanAmount = this.changeOrderForm.get(this.previousFieldName).value;
      //this.newLoanAmount = this.changeOrderForm.get(this.newAmountFieldName).value;
  

      //if (this.previousLoanAmount < this.newLoanAmount) {
      //  this.isSendNotification = 'No'
      //}
      //else {
      //  this.isSendNotification = 'Yes'
      //}
      const formPrepared = this.prepareFormDataForDocument();

      setTimeout(() => {
        this.loanApplicationService.addEditChangeOrderForm(formPrepared).subscribe((result: any) => {

          if (result.statusCode == 200) {
            this.isSubmitted = false;
            //this.loadSave = false;
            loanProgress.appyingChanges = Progress.completed;
            this.loanApplicationService.loanProgress.next(loanProgress);
            loanProgress.applyingRules = Progress.start;
            var thsObject = this;
            loanProgress.callBackFunction = function () {

            
              //// console.log("call back function");
              //if (thsObject.previousLoanAmount < thsObject.newLoanAmount) {
              //  //CODE FOR GENERATING DOCUMENT - START
              //  thsObject.loanApplicationService.getLoanDocslist(thsObject.Id, 'Id', 'desc', 1, 100).subscribe((resp: any) => {
              //    let pendingChangeOrderCount = resp.data.filter(d => d.DocumentStatus == 'READY_FOR_SIGNATURE' && d.DocumentType == 'ChangeOrder').length
              //    if (pendingChangeOrderCount == 0) {
              //      thsObject.lenderService.getBankIdByLoanApplicationId(thsObject.Id).subscribe(bankId => {
              //        // console.log('bankId', bankId);
              //        thsObject.loanApplicationService.mergeWebmergeMapping(thsObject.Id, bankId, true).subscribe(resp => {
                        
               
             

              //          thsObject.isSubmitted = false;
              //          // console.log('1 Generate Document', resp);
              //          thsObject.ntpemit.emit();
              //          //loanProgress.appyingChanges = Progress.completed;
              //          //this.loanapplicationservice.loanProgress.next(loanProgress);
              //          //loanProgress.applyingRules = Progress.start;
              //          //loanProgress.result = resp;
              //          //this.loanapplicationservice.loanProgress.next(loanProgress);
              //          //// console.log('2 Generate Document', resp);
              //          //this.loandocs.getLoanDocslist(this.loanId);

              //          if (resp.statusCode == 200) {
              //            //  this.toaster.success(resp.responseMessage);
              //            // this.ruleProgressShow();
                         

              //          } else {
              //            thsObject.toaster.error(resp.responseMessage);
                    
              //          }

              //        }, err => {
              //          //loanProgress.appyingChanges = Progress.failed;
              //          //this.loanapplicationservice.loanProgress.next(loanProgress);
              //          //this.isSubmitted = false;
              //        });
              //      }, err => {
              //        //loanProgress.appyingChanges = Progress.failed;
              //        //this.loanapplicationservice.loanProgress.next(loanProgress);
              //        //this.isSubmitted = false;
              //      });
              //    }
              //  });

              //  //CODE FOR GENERATING DOCUMENT - END
              //}
          
            }
            loanProgress.result = result;
            this.loanApplicationService.loanProgress.next(loanProgress);

            this.GetFormData();
            this.ntpemit.emit();
          }
          else {
            loanProgress.appyingChanges = Progress.failed;
            loanProgress.result = { responseMessage: result.responseMessage };
            this.loanApplicationService.loanProgress.next(loanProgress);
            this.loadSave = false;
            this.isSubmitted = false;

          }
        }, error => {
          this.loadSave = false;
          this.isSubmitted = false;
        })
      }, 2000);
    }
    else {
      //// console.log('error', this.changeOrderForm);
      this.commonService.validateAllFormFields(this.changeOrderForm);
      this.loadSave = false;
      this.isSubmitted = false;
    }
  }

  custValidation(control: AbstractControl): { [key: string]: any } | null {
    var value = control.value
    if (value != null && value != "") {
      let selectedDate = moment(value, 'MM/DD/YYYY');
      var today = moment();
      let years = today.diff(selectedDate, 'years');
      if (years < 18) {
        return { 'lessthan18': true };
      }
    } else {
      return { 'required': true };
    }
    return null
  }

  validatorRange(controlName, isRequired, dataType, range_from, range_to) {

    if (dataType == 'decimal' && range_from != null) {

      const validators = [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?"), Validators.min(range_from), Validators.max(range_to)];
      this.changeOrderForm.controls[controlName].setValidators(validators);
      this.changeOrderForm.controls[controlName].updateValueAndValidity();
    }
    else {
      this.changeOrderForm.controls[controlName].setValidators(Validators.nullValidator);
      this.changeOrderForm.controls[controlName].updateValueAndValidity();
    }
  }

  fillapplicantForm(id) {
    this.loanApplicationService.GetbankApplicantInfo(id).subscribe((result: any) => {
      //// console.log('this.loanapplicantdat22a', this.loanApplicationService.applicantInfo[0]);
      let data = this.loanApplicationService.applicantInfo[0].applicant;
      if (data == undefined) {
        this.loanapplicantdata = [];
      }
      else {
        this.loanapplicantdata = data;
      }
      
    });
  }

  setFile($event): void {
    //// console.log('SetFile', $event);
    this.commonService.uploadPDFFileValidator($event);
   // this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "10MB")
    if (this.commonService.isFileValid) {
      this.fileName = $event.target.files[0].name;
      this.fileExtension = this.fileName.replace(/^.*\./, '');
      this.changeOrderForm.get(this.docformName).setValue(this.fileName );
      ///this.companyLogo.setValue($event.target.files[0].name);
    }
  }
  downloadFile(e: any, url: string) {
    this.commonService.downloadFile(e,url);
  }

}
