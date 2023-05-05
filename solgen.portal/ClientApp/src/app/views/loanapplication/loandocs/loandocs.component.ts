import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { LoanapplicationserviceService, LoanProgressModel, Progress } from '../loanapplicationservice.service';
import { ActivatedRoute } from '@angular/router';
import { SendmailpopupComponent } from './sendmailpopup/sendmailpopup.component';
import { FollowUpPopupComponent } from '../commenthistory/followuppopup/followuppopup.component';
import { CommonService } from '../../shared/common.service';
import { LenderlistService } from '../../lender/lenderlist.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-loandocs',
  templateUrl: './loandocs.component.html',
  styleUrls: ['./loandocs.component.scss']
})
export class LoandocsComponent implements OnInit {
  //@ViewChild('followuppopup') followuppopup: FollowUpPopupComponent;
  @ViewChild('SendMailModelPoppup', { static: false }) SendMailModelPoppup: SendmailpopupComponent;
  @Output() refreshLoanDocsEmit = new EventEmitter<any>();
  loanId: any;
  LoanDocsListData = [];
  isAudit: boolean = false;
  isCompanyAdmin: boolean = false;
  isRelationshipManager: boolean = false;
  isDealerUser: boolean = false;
  isChangeOrder: boolean = false;
  docuSignData: any;
  constructor(private loanapplicationservice: LoanapplicationserviceService, private route: ActivatedRoute, private commonService: CommonService,
    private lenderService: LenderlistService, private toaster: ToastrService, private dialogService: ConfirmationDialogService,private fb : FormBuilder) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType=== "usertypeaudit") {
        this.isAudit = true;
      }
      else if (userdetail.userType === "usertypecompanyadmin") {
        this.isCompanyAdmin = true;
      }
      else if (userdetail.userType === "usertyperelationship") {
        this.isRelationshipManager = true;
      }
      else if (userdetail.userType === "usertypedealer") {
        this.isDealerUser = true;
      }
    });
  }
  sortDir = 'desc';
  sortColumn = 'Id';
  pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageSizeValue: number;
  currentPage: any;
  loading: boolean = false;
  fileName: any;
  selectedRow: any;
  loadSave: boolean = false;

  signNowDocumentHistory: any = "";

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  data: FormData;
  dragForm: FormGroup;
  @ViewChild('uploadForm', { static: false }) uploadForm: ModalDirective;
  @ViewChild('documentHistoryModal', { static: false }) documentHistoryModal: ModalDirective;
  @ViewChild('docusignDocumentHistoryModal', { static: false }) docusignDocumentHistoryModal: ModalDirective;

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.loanId = id;
        this.getLoanDocslist(id);
      });

    this.pageSizeValue = 10;
    this.currentPage = 1;
    this.getPageSizes();
    this.refresh();
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  setPage($event) {

    this.currentPage = $event.page - 1;
    this.refresh();
  }
  onSort($event) {
    const sort = $event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = $event.page - 1;
    this.refresh();;
  }

  refresh() {
    this.getLoanDocslist(this.loanId);
  }

  pagedData11: any = {
    pager: {},
    data: []
  };
  getLoanDocslist(loanId) {
    this.loanapplicationservice.getLoanDocslist(loanId, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe((resp: any) => {


      this.pagedData = resp;

      //this.pagedData11 = JSON.parse(JSON.stringify(resp));
      //// console.log('Loan Docs list', this.pagedData11);
     
      //if (this.isDealerUser) {
      //  //only show change Order documents
      //  var val = this.pagedData11.data.filter(d => d.DocumentType == 'ChangeOrder');
      //  if (val.length == 0) {
         
      //    this.pagedData11.data = [];
      //  }
      //  else {
        
      //    this.pagedData11.data.forEach((item, index) => {
           
      //      if (item.DocumentType == 'LoanDoc')
      //        this.pagedData11.data.splice(index);
      //    });
      //    this.pagedData11.pager.totalItems = this.pagedData11.data.length;
      //  }
      //  /////this.pagedData = resp1;
      //}
      //else {
      //////  this.pagedData = resp;
      //}
     
      //this.pagedData = this.pagedData11;

      this.refreshLoanDocsEmit.emit({ pendingCount: resp.data.filter(d => d.DocumentStatus == 'READY_FOR_SIGNATURE' && d.DocumentType == 'LoanDoc').length, signedCount: resp.data.filter(d => d.DocumentStatus == 'FINALIZED' && d.DocumentType == 'LoanDoc').length, pendingChangeOrderCount: resp.data.filter((d) => { return ((d.DocumentStatus == 'READY_FOR_SIGNATURE' || d.DocumentStatus == 'FINALIZED') && d.DocumentType == 'ChangeOrder') }).length, changeOrderDocWithR_F_S: resp.data.filter((d) => { return ((d.DocumentStatus == 'READY_FOR_SIGNATURE') && d.DocumentType == 'ChangeOrder') }).length});
    });
  }

  downloadFile(obj) {
   // // console.log('Download Document -> ' ,obj);
    this.loading = true;
    if (obj.FileUrl == null || obj.FileUrl == '') {
      this.loanapplicationservice.DownloadBankDocument(obj.DocumentId, obj.SourceType, obj.SolgenFileUrl, this.loanId).subscribe(blob => {
        var file = new Blob([blob], { type: blob.type });
        saveAs(file, obj.FileName);
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    } else {
      this.loanapplicationservice.DownloadFile(this.loanId, obj.Id).subscribe(blob => {
        var file = new Blob([blob], { type: blob.type });
        saveAs(file, obj.FileName);
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    }

  }

  documentHistory(row) {
    this.loading = true;
    this.loanapplicationservice.GetSignNowDocumentHistory(row.DocumentId).subscribe(resp => {
      this.loading = false;
      this.signNowDocumentHistory = resp.reverse();
      this.documentHistoryModal.show();
    }, err => {
      this.loading = false;
    });
  }

  docuSignDocumentHistory(row) {
    this.loading = true;
    this.loanapplicationservice.GetDocusignDocumentHistory(row.DocumentId).subscribe(resp => {
      this.loading = false;
      if (resp != null && resp != undefined) {
        this.docuSignData = resp;
      }
      //// console.log('resp DocuSign', this.docuSignData);
      this.docusignDocumentHistoryModal.show();
    }, err => {
      this.loading = false;
    });
  }

  closedocumentHistoryModal() {
    this.documentHistoryModal.hide();
  }
  closedocuSignDocumentHistoryModal() {
    this.docusignDocumentHistoryModal.hide();
  }

  openSendMailPopup(obj: any) {
    this.SendMailModelPoppup.show(this.loanId, obj);
  }

  sendEmailEmit() {
    this.refresh();
  }

  resendSigningLink(obj: any) {
    
    this.dialogService.confirm("Caution", "Do you really wish to resend signing link? It will cancel current loan document and generate new loan document.", "Yes", "No").subscribe(confirmed => {
      if (confirmed) {
        //this.loading = true;
        this.isSubmitted = true;
        let loanProgress = new LoanProgressModel();
        loanProgress.appyingChanges = Progress.start;
        this.loanapplicationservice.loanProgress.next(loanProgress);

        this.loanapplicationservice.voidDocuments(this.loanId, true).subscribe(voidResponse => {
          this.lenderService.getBankIdByLoanApplicationId(this.loanId).subscribe(bankId => {
            this.loanapplicationservice.mergeWebmergeMapping(this.loanId, bankId, false, obj.SourceType).subscribe(resp => {
              //this.loading = false;
              this.getLoanDocslist(this.loanId);

              if (resp.statusCode == 200) {
                //this.toaster.success(resp.responseMessage);
              } else {
                this.toaster.error(resp.responseMessage);
              }

              this.isSubmitted = false;
              loanProgress.appyingChanges = Progress.completed;
              this.loanapplicationservice.loanProgress.next(loanProgress);
              loanProgress.applyingRules = Progress.start;
              loanProgress.result = resp;
              this.loanapplicationservice.loanProgress.next(loanProgress);

            }, err => {
              //this.loading = false;
              this.isSubmitted = false;
            });
          }, err => {
            //this.loading = false;
            this.isSubmitted = false;
          });
        }, err => {
          //this.loading = false
          this.isSubmitted = false;
        });
      }
    });    
  }

  isSubmitted = false;
  upload() {
    if (this.fileName == null || this.fileName == '') {
      this.toaster.error(`Please select a file`);
    } else {
      //this.loading = true;
      //// console.log("this.selectedRow.DocumentType", this.selectedRow.DocumentType);
      this.isSubmitted = true;
      this.isChangeOrder = false;
      if (this.selectedRow.DocumentType == "ChangeOrder") { this.isChangeOrder = true; }

      this.lenderService.getBankIdByLoanApplicationId(this.loanId).subscribe(bankId => {
        this.loanapplicationservice.UpdateLoanHistoryManual(bankId, this.selectedRow.Id, this.isChangeOrder, this.loanId , this.data).subscribe(resp => {
          this.loading = false;
          this.getLoanDocslist(this.loanId);
          if (resp.statusCode == 200) {
            let loanProgress = new LoanProgressModel();
            loanProgress.appyingChanges = Progress.start;
            this.loanapplicationservice.loanProgress.next(loanProgress);
            //this.toaster.success(resp.responseMessage);
            this.getLoanDocslist(this.loanId);
            this.uploadForm.hide();

            this.isSubmitted = false;
            loanProgress.appyingChanges = Progress.completed;
            this.loanapplicationservice.loanProgress.next(loanProgress);
            loanProgress.applyingRules = Progress.start;
            loanProgress.result = resp;
            this.loanapplicationservice.loanProgress.next(loanProgress);

          } else {
            this.toaster.error(resp.responseMessage);
          }
        }, err => {
          //this.loading = false;
          this.isSubmitted = false;
        });
      }, err => {
        //this.loading = false;
        this.isSubmitted = false;
      });
    }
  }

  openUpload(obj) {
    this.selectedRow = obj;
    this.dragForm = this.fb.group({});
    this.uploadForm.show();
  }

  closeUpload() {
    this.uploadForm.hide();
  }

  setFile($event): void {
    this.commonService.uploadDocumentFileValidator($event);
    this.commonService.uploadDocumentSize("pdf", $event.target.files[0].size, "30MB")
    if (this.commonService.isFileValid) {
      this.fileName = $event.target.files[0].name;
      this.prepareFormDataForDocument();
    }
  }

  private prepareFormDataForDocument() {
    const input = new FormData();
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }
    this.data = input;
  }
}
