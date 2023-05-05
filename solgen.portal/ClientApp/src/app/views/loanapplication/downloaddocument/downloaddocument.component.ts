import { Component, OnInit, ViewChild, Output, EventEmitter, Input, Inject } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LenderlistService } from '../../lender/lenderlist.service';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';

@Component({
  selector: 'app-downloaddocument',
  templateUrl: './downloaddocument.component.html',
  styleUrls: ['./downloaddocument.component.scss']
})
export class DownloaddocumentComponent implements OnInit {
  @ViewChild('documentModal', { static: false }) downloadDocumentModal: ModalDirective;
  active = false;
  loadSave: boolean = false;
  loanApplicationId: any;
  bankId: any;
  formstackDocuments = [];

  constructor(private lenderService: LenderlistService, private loanApplicationService: LoanapplicationserviceService) {

  }

  ngOnInit() {
  }

  showModal(loanApplicationId: any) {
    this.loadSave = true;
    this.loanApplicationId = loanApplicationId;
    this.lenderService.getBankIdByLoanApplicationId(loanApplicationId).subscribe(bankId => {
      this.bankId = bankId;
      this.lenderService.getWebmergeDocuments(bankId).subscribe(resp => {
        this.formstackDocuments = resp.filter(d => d.active == true);
        this.loadSave = false;
      }, err => {
          this.loadSave = false;
      });
    }, err => {
        this.loadSave = false;
    })
    
    this.active = true;
    this.downloadDocumentModal.show();
  }

  close() {
    this.active = false;
    this.downloadDocumentModal.hide();
  }

  downloadMergedDocument(document: any) {    
    
    this.loanApplicationService.MergeAndDownloadWebmergeDocument(document.id, document.key, this.loanApplicationId, this.bankId).subscribe(blob => {
      var file = new Blob([blob], { type: 'application/x-www-form-urlencoded' });
      saveAs(file, "File.pdf");
    });
  }
}
