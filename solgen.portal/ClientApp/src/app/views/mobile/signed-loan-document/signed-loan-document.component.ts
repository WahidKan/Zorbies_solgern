import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LenderlistService } from '../../lender/lenderlist.service';
import { LoanapplicationserviceService, LoanProgressModel, Progress } from '../../loanapplication/loanapplicationservice.service';
import { SendmailpopupComponent } from '../../loanapplication/loandocs/sendmailpopup/sendmailpopup.component';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as $ from 'jquery'
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signed-loan-document',
  templateUrl: './signed-loan-document.component.html',
  styleUrls: ['./signed-loan-document.component.scss']
})
export class SignedLoanDocumentComponent implements OnInit {

  @ViewChild('SendMailModelPoppup', { static: false }) SendMailModelPoppup: SendmailpopupComponent;
  @Output() refreshLoanDocsEmit = new EventEmitter<any>();
  loanId: any;
  private app: AppComponent
  LoanDocsListData = [];
  isAudit: boolean = false;
  isCompanyAdmin: boolean = false;
  isRelationshipManager: boolean = false;
  isDealerUser: boolean = false;
  isChangeOrder: boolean = false;
  docuSignData: any;
  constructor(private loanapplicationservice: LoanapplicationserviceService, private route: ActivatedRoute, private commonService: CommonService,
    private lenderService: LenderlistService, private toaster: ToastrService, private dialogService: ConfirmationDialogService) {

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
  serviceAppoinmentList: any;
  userType: any;
  username: any;
  headeruserid: any;
  modulePermission: ModuleList;
  headerData: any; 
imageLink = '../../assets/images/default-user-icon.jpg';
  loadSave: boolean = false;

  signNowDocumentHistory: any = "";

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  data: FormData;
  dragForm: FormGroup;
  @ViewChild('uploadForm', { static: false }) uploadForm: ModalDirective;
  @ViewChild('documentHistoryModal', { static: false }) documentHistoryModal: ModalDirective;
  @ViewChild('docusignDocumentHistoryModal', { static: false }) docusignDocumentHistoryModal: ModalDirective;

  ngOnInit() {
    $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    }); 
    // this.route.paramMap.subscribe(
    //   params => {
    //     const id = params.get('id');
    //     this.loanId = '3254';
    //     this.getLoanDocslist(id);
    //   });

      this.loanId = this.loanapplicationservice.loanId
      console.log(this.loanId)
      if(this.loanId){
        console.log(this.loanId)
        this.getLoanDocslist(this.loanId);
      }
      

      this.commonService.getLoggedInName.subscribe((user: any) => {
        this.headeruserid = user.id;
        //setTimeout(() => {
          //this.companyIdDdl = user.companyId;
          this.headeruserid = user.id;
          this.modulePermission = this.commonService.getPermission(1021);
       // }, 2000);
        this.headerSetup(user);
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

  logout() {
    this.loadSave = true;
    // setTimeout(() => {
    //   this.commonService.logout();
    //   this.app.ShowDialer({ phoneNo: '', visible: false });
    
    // }, 2000);
    this.commonService.logout();
    if(this.app !=null){
      this.app.ShowDialer({ phoneNo: '', visible: false });
    }
     
    this.loadSave = false;
  }

  onUserError(event){
    event.target.src = 'assets/images/user.jpg'
   //Do other stuff with the event.target
  }
  
  headerSetup(user: any) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.userType = userdetail.userType;
      if (userdetail.id == null) {
        this.username = user.firstName + " " + user.lastName
      }
      else {
        this.username = userdetail.firstName + " " + userdetail.lastName
        this.getHeaderData(userdetail.id);
      }
    });
    }
    
    getHeaderData(id: any) {
    this.commonService.getHeaderData(id).subscribe((res: any) => {
    
      this.headerData = res;
      this.imageLink = res.profilePic;
      if(this.imageLink==null || this.imageLink== "null" || this.imageLink== "")
      this.imageLink ='../../assets/images/default-user-icon.jpg';
    },
      (error: any) => {
      });
    }
}
