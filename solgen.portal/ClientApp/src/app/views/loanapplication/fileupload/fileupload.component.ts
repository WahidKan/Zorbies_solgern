import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder } from '@angular/forms';
import { DashboardService } from '../../dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { LeadlistService } from '../../lead/leadlist.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { LoanapplicationserviceService, LoanProgressModel, Progress } from '../loanapplicationservice.service';
import { Console } from 'console';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  @ViewChild('fileupload', { static: false }) fileupload: ModalDirective;
    @ViewChild('fileInput', { static: false }) fileInput;;
  //@ViewChild('customerDoc') customerDoc: EventEmitter();
  @Output() customerDoc = new EventEmitter();
  loadSave: boolean = false;
  fileName = 'Choose file';
  fileuplist: any;
  lstfiletype: any;
  accid: any;
  totalDocument: any;
  fileExtension: any;
  pendingDoc: any;
  requireDoc: any;
  dataLoadId:any;
  recieveDocument: any;
  loanApplicationId: any;
  is_converted: any;
  submoduleCodeId: any;
  @Output() loanInfoEmit = new EventEmitter<any>();
  constructor(private fb: FormBuilder,
    private dashboardService: DashboardService, private toaster: ToastrService, private leadservice: LeadlistService, private loanapplicationservice: LoanapplicationserviceService,
    private commonService: CommonService, private dialogService: ConfirmationDialogService,
    private loanApplicationService: LoanapplicationserviceService) { }

  ngOnInit() {

    //this.commonService.getMasterItemsList('PrerequisiteLoanProductDocumentType').subscribe((result: any) => {
    //  this.lstfiletype = this.commonService.masters;
    //})
    //this.loanapplicationservice.GetLoanapplicationDocumentType(this.loanApplicationId).subscribe((data: any) => {
    //  this.lstfiletype = data;
    //});
  }
  show(AccountId: any, loanId: any) {
    this.submoduleCodeId = this.loanApplicationService.submoduleId
    console.log('SubmoduleCodeId',this.submoduleCodeId)
    debugger;
    this.loanapplicationservice.getDocumentForReceiveAndPending(loanId).subscribe((result: any) => {
      console.log(result);
      this.totalDocument = result.TotalDocs;
      this.recieveDocument = result.ReceivedDocs;
      this.pendingDoc = result.pendingDocs;
      this.requireDoc = result.requireDoc;
      this.accid = AccountId;
      this.loanApplicationId = loanId;
      this.loanapplicationservice.GetLoanapplicationDocumentType(loanId).subscribe((data: any) => {
        this.lstfiletype = data;
      });
      this.fileupload.show();
      this.getImages();
      //// console.log("PeendingOrReceiveANd", result);
    });

  }

  getImage

  close() {
    this.fileupload.hide();
  }

  displayPendingRequiredDoc() {
    this.loanapplicationservice.getDocumentForReceiveAndPending(this.loanApplicationId).subscribe((result: any) => {
      this.totalDocument = result.TotalDocs;
      this.recieveDocument = result.ReceivedDocs;
      this.pendingDoc = result.pendingDocs;
      this.requireDoc = result.requireDoc;
      this.loanapplicationservice.GetLoanapplicationDocumentType(this.loanApplicationId).subscribe((data: any) => {
        this.lstfiletype = data;
      });
      this.getImages();
      //// console.log("PeendingOrReceiveANd", result);
    });
  }
  private prepareFormDataForDocument() {

    const input = new FormData();
    input.append('companyId', '1001');
    input.append('companyName', '');
    input.append('moduleid', '1');
    input.append('submoduleid', 'loanapplication');
    input.append('refid', this.loanApplicationId);
    input.append('accountid', this.accid);
    input.append('documentTitle', this.UploadimageForm.value.documentTitle);
    input.append('description', this.UploadimageForm.value.description == null ? '' : this.UploadimageForm.value.description);
    input.append('filetype', this.UploadimageForm.value.filetype);
    input.append('fileExtension', this.fileExtension);
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }
    return input;
  }
  setFile($event): void {
    this.commonService.uploadImageFileValidator($event);
    this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "20MB")
    if (this.commonService.isFileValid) {
      this.fileName = $event.target.files[0].name;
      this.fileExtension = this.fileName.replace(/^.*\./, '');
      //this.companyLogo.setValue($event.target.files[0].name);

    }
  }
  isSubmitted = false;
  SaveImage() {

    if (this.UploadimageForm.valid) {
      //this.loadSave = true;
      let loanProgress = new LoanProgressModel();
      loanProgress.appyingChanges = Progress.start;
      this.loanApplicationService.loanProgress.next(loanProgress);
      this.isSubmitted = true;
      const companySetupModel = this.prepareFormDataForDocument();
      this.dashboardService.addOrUpdateUploadFileOnAzzure(companySetupModel).subscribe((result: any) => {
        setTimeout(() => {
          if (result.statusCode == 200) {
            //this.loadSave = false;
            this.isSubmitted = false;
            //this.toaster.success('Document has been uploaded successfully');
            let res = {
              responseMessage: 'Document has been uploaded successfully'
            }
            loanProgress.appyingChanges = Progress.completed;
            this.loanApplicationService.loanProgress.next(loanProgress);
            loanProgress.applyingRules = Progress.start;
            loanProgress.result = res;
            this.loanApplicationService.loanProgress.next(loanProgress);

            this.fileInput.nativeElement.value = "";
            //// // console.log("fileInput", this.fileInput.nativeElement.files);

            this.fileName = '';
            this.UploadimageForm.reset();
            this.getImages();
            this.displayPendingRequiredDoc();
            this.customerDoc.emit();
           // this.loanInfoEmit.emit(result);
          }
          else {
            this.loadSave = false;
            this.isSubmitted = false;
            this.toaster.error(result.responseMessage);
          }
        }, 3000);
      }, error => {
          this.isSubmitted = false;
      });
    }
    else {
      this.loadSave = false;
      this.isSubmitted = false;
      this.commonService.validateAllFormFields(this.UploadimageForm);
    }

  }
  getImages() {
    console.log(this.loanApplicationId);
    this.leadservice.getImages(this.loanApplicationId, this.submoduleCodeId).subscribe((result: any) => {  //this.leadid, this.submoduleid
      this.fileuplist = result;

       console.log('fileuplist', result);
    })
  }

  Deleteimage(Id: any) {

    const message = `Are you sure you want to delete Document?`;
    this.dialogService.confirm('Delete Image', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.Deleteimage(Id).subscribe(r => {
          this.toaster.success(`Document has been deleted successfully..`);

          this.getImages();
          this.displayPendingRequiredDoc();
          this.customerDoc.emit();
        }, error => {
        });
      }
    });
  }

  UploadimageForm = this.fb.group({
    profilePic: [''],
    'file': '',
    'filename': [''],
    documentTitle: ['', Validators.required],
    description: [null],
    filetype: [null, Validators.required]
  });
  get profilePic() { return this.UploadimageForm.get('profilePic'); }
  get filename() { return this.UploadimageForm.get('filename'); }
  get filetype() { return this.UploadimageForm.get('filetype'); }
  get documentTitle() { return this.UploadimageForm.get('documentTitle'); }
  get description() { return this.UploadimageForm.get('description'); }

}
