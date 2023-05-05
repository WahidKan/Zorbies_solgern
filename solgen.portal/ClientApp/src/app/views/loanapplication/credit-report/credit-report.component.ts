import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';
import { CommonService } from '../../shared/common.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-credit-report',
  templateUrl: './credit-report.component.html',
  styleUrls: ['./credit-report.component.scss']
})
export class CreditReportComponent implements OnInit {

  loanApplicationId: any;
  applicant: any;

  reportData: any;
  loadSave: boolean = false;
  rawData: boolean = false;
  isBanker: boolean = false;
  isCompanyAdmin: boolean = false;

  @ViewChild('creditReport', { static: false }) creditReport: ModalDirective;

  constructor(private loanapplicationService: LoanapplicationserviceService, private commonService: CommonService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == "usertypecompanyadmin") {
        this.isCompanyAdmin = true;
      }
      if (userdetail.userType === 'usertypebanker') {
        this.isBanker = true;
      }


    });
  }

  ngOnInit() {
  }

  show(loanApplicationId, applicant, bureauId, rawData: boolean) {
    this.loanApplicationId = loanApplicationId;
    this.applicant = applicant;
    this.rawData = rawData;
    this.loadSave = true;
    this.loanapplicationService.getCreditReport(loanApplicationId, applicant, bureauId, rawData).subscribe(resp => {
      this.loadSave = false;
      if (rawData) {
        this.reportData = JSON.parse(resp);
      } else {
        this.reportData = resp;
      }     
      
    }, err => {
      this.loadSave = false;
    });
    this.creditReport.show();
  }

  close() {
    this.reportData = "";
    this.creditReport.hide();
  }

  download() {
    //this.loadSave = true;
    //var file = new Blob([this.reportData], { type: 'text/plain' });
    //saveAs(file, `${this.loanApplicationId}_${this.applicant}.txt`);
    //this.loadSave = false;
    const documentDefinition = { content: this.reportData };
    pdfMake.createPdf(documentDefinition).download(`${this.loanApplicationId}_${this.applicant}.pdf`);
  }
}
