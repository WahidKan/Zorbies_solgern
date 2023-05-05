import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProposallistService } from '../../proposal/proposallist.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-shared-documents',
  templateUrl: './shared-documents.component.html',
  styleUrls: ['./shared-documents.component.scss']
})
export class SharedDocumentsComponent implements OnInit {
  @Input('primaryKey') primaryKey: string;
  @Input('subModuleName') submoduleName: string;
  @Input('title') title: string;
  @Input('header') header: boolean = true;
  constructor( private proposalService: ProposallistService,
               private commonService: CommonService,
               private toaster: ToastrService) { }
  docuemnetMappingList: any[] = [];
  filesCount = 0;
  proposalId:any;
  loadSave = false;
  siteurl: string = '';
  ngOnInit() {
    debugger;
    this.ViewProposal(this.primaryKey);
    this.siteurl = window.location.origin;
  }
  ViewProposal(id: any) {
    this.proposalId = id;
    debugger;
    this.proposalService.getDocumentMappingListV1(id,this.submoduleName).subscribe(response => {
      if (response) {
        debugger;
        this.docuemnetMappingList = response;
        this.filesCount = response.length;
      }
    })
  }

  downloadPDF() {
    this.loadSave = true;
    if (this.docuemnetMappingList.length > 0) {
      var ids = this.docuemnetMappingList.filter(x => x.DocumentType != "html").map(m => m.Id).join(",");//  this.docuemnetMappingList.map(m => m.Id && m.DocumentType!="html").join(",");

      var DocumentMappingDocIds = this.docuemnetMappingList.filter(x => x.DocumentType == "html").map(m => m.DocumentMappingDocId); //this.docuemnetMappingList.map(m => m.DocumentMappingDocId && m.DocumentType=="html");
      if (DocumentMappingDocIds.length > 0) {
        this.commonService.GetEcryptedId(this.proposalId).subscribe((result: any) => {
          if (result) {
            debugger;
            let Url = this.siteurl + "/proposal-document/" + encodeURIComponent(result) + "/system";
            window.open(Url);
            this.loadSave = false;
          }
        });
      }
      if (ids) {
        this.proposalService.getDocumentBytes(this.proposalId, ids,this.submoduleName).subscribe(result => {

          var response = this.commonService.base64ToArrayBuffer(result);
          let file = new Blob([response], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          this.loadSave = false;
          window.open(fileURL);
        },
          error => {
            this.loadSave = false;
            if (error.status === 404) {
              this.toaster.error(error.error);
            }
            else {
              this.toaster.error("Something went wrong on mapping.");
            }

          });
      }
    }
    else {
      this.toaster.error("No record available.");
      this.loadSave = false;
    }
 

  }
}
