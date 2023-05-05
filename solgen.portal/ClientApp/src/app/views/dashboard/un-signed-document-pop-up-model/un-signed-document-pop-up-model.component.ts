import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProposallistService } from '../../proposal/proposallist.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-un-signed-document-pop-up-model',
  templateUrl: './un-signed-document-pop-up-model.component.html',
  styleUrls: ['./un-signed-document-pop-up-model.component.scss']
})
export class UnSignedDocumentPopUpModelComponent implements OnInit {
  url: any;
  emailstring: any;
 
  @ViewChild('UnSignedDocumentModel', { static: false }) UnSignedDocumentModel: ModalDirective;
  unsignedDocumentList: any
  unsignedDocumentShow: boolean = false
  constructor(private dashboardService: DashboardService,private proposalService: ProposallistService) { }

  ngOnInit() {
    this.url = "https://app-eval.signnow.com/rctapp/login"
    this.emailstring= "mailto:''?Subject=Hello&body=links:  %0D http://link1.com  %0D http://link1.com";
  }

  
  GetUnSignedDocument(proposalId: any) {
    this.dashboardService.GetUnsignedDocument(proposalId).subscribe((result: any) => {
      this.unsignedDocumentList = result;
      this.unsignedDocumentShow = true;
      this.UnSignedDocumentModel.show();
    })
  }

  closedUnsignedDocumentModel() {
    this.UnSignedDocumentModel.hide();
    this.unsignedDocumentShow = false;
  }

  
  GenerateSignNowLink(obj) {
   debugger;
    this.proposalService.GetURLlinkForSignDocument(obj.sDocumantId).subscribe(result => {    
      if (result) {
        // if(result.result.innerHtml)
        // {           
        //   this.previewModalGenerate.hide();
        //   this.htmlString = result.result.innerHtml
        //   this.ProposalPreviewDeliveryOptionsHTML.show();
        // }
        // else{
        if (result.statusCode == 200) {
         


        } else {
         
        }
      }

      //}
    },
      error => {
        // this.isViewPreviewModalGenerate = false;
       
      });
   }

  

}
