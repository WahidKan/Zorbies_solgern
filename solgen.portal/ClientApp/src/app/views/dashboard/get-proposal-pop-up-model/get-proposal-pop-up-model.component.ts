import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProposallistService } from '../../proposal/proposallist.service';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-get-proposal-pop-up-model',
  templateUrl: './get-proposal-pop-up-model.component.html',
  styleUrls: ['./get-proposal-pop-up-model.component.scss']
})
export class GetProposalPopUpModelComponent implements OnInit {
  proposalDataList:any;
  showPropoal:boolean=false;
  @ViewChild('proposalModel', { static: false }) proposalModel: ModalDirective;
  constructor(private  dashboardService: DashboardService,private proposalService: ProposallistService,private commonService: CommonService){}

  ngOnInit() {
   
  }

  downloadSignedFile(obj) {
    // // console.log('Download Document -> ' ,obj);
    debugger;
     this.proposalService.DownloadSignedDocument(obj.sDocumentid).subscribe(blob => {
      var file = new Blob([blob], { type: blob.type });
      var fileURL = URL.createObjectURL(file);
      // var response = this.commonService.base64ToArrayBuffer(blob);
      // var file = new Blob([response], { type: 'application/pdf' });
      // var fileURL = URL.createObjectURL(file);



      window.open(fileURL);
      //saveAs(file, this.pagedData[0].FileName);
      setTimeout(() => {
        // this.loadSave = false;
      }, 2000);

    }, err => {
      // this.loadSave = false;
    });
 
   }

  GetProposalData( proposalId:any, moduleId:any ){
    this.dashboardService.GetProposalAndContractStatus(proposalId,moduleId).subscribe((result : any) => {
      this.proposalDataList = result;
      this.showPropoal = true
      this.proposalModel.show();
    })
  }

  closedProposalModel(){
    this.proposalModel.hide();
    this.showPropoal = false;
  }

  
}
