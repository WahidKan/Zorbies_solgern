import {Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProposallistService } from '../../proposal/proposallist.service';

@Component({
  selector: 'app-get-contract-pop-up-model',
  templateUrl: './get-contract-pop-up-model.component.html',
  styleUrls: ['./get-contract-pop-up-model.component.scss']
})
export class GetContractPopUpModelComponent implements OnInit {

  @ViewChild('ContractModel', { static: false }) ContractModel: ModalDirective;
  contractList:any
  showcontract:boolean=false;
  constructor(private  dashboardService: DashboardService,private proposalService: ProposallistService){}

  ngOnInit() {
   
  }

  GetContractData( proposalId:any, moduleId:any ){
    debugger;
    this.dashboardService.GetProposalAndContractStatus(proposalId,moduleId).subscribe((result : any) => {
      this.contractList = result;
      this.showcontract = true;
      this.ContractModel.show();
    })
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

  closedContractModel(){
    this.ContractModel.hide();
    this.showcontract = false;
  }
}
