import { FormGroup, FormControl } from '@angular/forms';
import { MappingTempalte, ProposallistService } from './../../proposal/proposallist.service';
import { CommonService } from '../../../../../src/app/views/shared/common.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-copy-link-modal',
  templateUrl: './copy-link-modal.component.html',
  styleUrls: ['./copy-link-modal.component.scss']
})
export class CopyLinkModalComponent implements OnInit {
  @ViewChild('CopyLinkModal', { static: false }) CopyLinkModal: ModalDirective;
  @ViewChild('txtConfigFile', { static: false }) txtConfigFile: ElementRef;
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'crm';
  submoduleName = 'proposal';
  siteurl = window.location.origin;
  group_name: any;
  group_display_name: any;
  id: any;
  encrypedId: any;
  Url: any;
  CopytoClipboard: any = false;
  DocExist: any = false;
  sendEmail: any = true;
  TemplateList: any[];
  TemplateListNew: any[];
  MappingTempalte: MappingTempalte = new MappingTempalte();
  loadSave: boolean = false;
  constructor(private routerService: Router, private proposalservice: ProposallistService, private commonService: CommonService, private toaster: ToastrService) { }


  ngOnInit() {

  }
  show(id) {
    
    this.id = id;
    this.sendEmail = true;
    this.CopytoClipboard = false;

    this.commonService.GetEcryptedId(this.id).subscribe((result: any) => {
      if (result) {
        this.encrypedId = result;
        this.generateUrl();
      }
    });


    this.CopyLinkModal.show();

  }
  generateUrl() {
    ;
    this.commonService.getHtmlFile(this.encrypedId).subscribe((result: any) => {
      ;
      if (result.length == 0) {
      //  this.toaster.error("Document has not been generated.");
        this.sendEmail = true;
        this.CopytoClipboard = false;
        this.DocExist = false;
      }
      else {
        this.sendEmail = true;
        this.DocExist = true;
        this.CopytoClipboard = false;
        this.Url = this.siteurl + "/proposal-document/" + encodeURIComponent(this.encrypedId) + "/system";
      }
      //this.Url = "this is test"; this.copyInputMessage()
    });

  }
  CopyLink(e) {
    
    if(e.target.value=="copylink")
    {
      this.sendEmail = false;
      this.CopytoClipboard = true;
    }
    if(e.target.value=="email")
    {
     this.CopyLinkEmail();
    }
    }
  CopyLinkEmail() {
    
    this.sendEmail = true;
    this.CopytoClipboard = false;
  }
  SendEmail() {
    this.loadSave = true;
    this.CopytoClipboard = false;
    this.sendEmail = true;
    // if (this.DocExist) {
      this.proposalservice.GetTempalteList(this.id).subscribe((result: any) => {
        if (result) {
          this.TemplateList = result;
          this.FillDeliveryoptionDate();
          this.proposalservice.getDocumentMappingList(this.id).subscribe((result: any) => {
            if (result) {
              ;
              var ids = result.filter(x => x.Status == 'GENERATED').map(x => x.Id).join(',');
              var onlyhtml = result.filter(x => x.Status == 'GENERATED').find((x => x.DocumentType == "route" || x.DocumentType == "document")) ? "no" : "yes";
              let mappingtype = this.MappingTempalte.sendingType ? 'email' : '';
              if (mappingtype == '') {
                mappingtype = this.MappingTempalte.sendingTypeSignNow ? 'signnow' : '';
              }
              var sentdoc = result.filter(x => x.Status == 'SENT').map(x => x.Name).join(',');
              if (sentdoc) {
                var message = "Following documents are already sent:";
                this.toaster.error(message + sentdoc);
              }
              if (ids) {
                this.proposalservice.SendDocumentSignNow(this.id, ids, mappingtype, this.MappingTempalte.MappingTempalteId.Id, this.MappingTempalte.subject, this.MappingTempalte.body, onlyhtml,"proposal").subscribe((result: any) => {
                  if (result) {
                    if (result.statusCode == 200) {
                      this.loadSave = false;
                      this.close();
                      this.toaster.success(result.responseMessage);
                    } else {
                      this.loadSave = false;
                      this.toaster.error(result.responseMessage);
                    }
                  }
                  else {
                    this.loadSave = false;
                    this.toaster.error(result.responseMessage);
                  }
                }, error => {
                  this.loadSave = false;
                  this.toaster.error(error.error);
                });
              }
              else {
                if (result.map(x => x.Id).length > 0) {
                  this.toaster.error("All the documents in the list are already sent.");
                  this.loadSave = false;
                }
                else {
                  this.toaster.error("No document available for send.");
                  this.loadSave = false;
                }
              }

            }
          });
        }

      }, error => {
        this.loadSave = false;
        this.toaster.error(error.error);
      });

    // }
    // else {
    //   this.loadSave = false;
    //   this.toaster.error("Document has not been generated.");
    // }
  }
  FillDeliveryoptionDate() {
    ;
    this.TemplateListNew = [];
    this.MappingTempalte = new MappingTempalte();
    if (this.TemplateList.length > 0) {

      if (this.TemplateList.length > 1) {
        this.TemplateListNew = this.TemplateList.filter(x => x.sendingTypeSignNow == true && (x => x.signer1Option > 0 && x.signer2Option > 0));
        if (this.TemplateListNew.length > 0) {
          this.MappingTempalte.sendingType = this.TemplateListNew[0].sendingType;
          this.MappingTempalte.sendingTypeSignNow = this.TemplateListNew[0].sendingTypeSignNow;
          this.MappingTempalte.sendToEmail = this.TemplateListNew[0].sendToEmail;
          this.MappingTempalte.fromToEmail = this.TemplateListNew[0].fromToEmail;
          this.MappingTempalte.signer1Email = this.TemplateListNew[0].signer1Email;
          this.MappingTempalte.signer2Email = this.TemplateListNew[0].signer2Email;
          this.MappingTempalte.subject = this.TemplateListNew[0].subject;
          this.MappingTempalte.body = this.TemplateListNew[0].body;
          this.MappingTempalte.ccEmail = this.TemplateListNew[0].ccEmail;
          this.MappingTempalte.MappingTempalteId = this.TemplateListNew[0];
        }
        else {
          this.TemplateListNew = this.TemplateList.filter(x => x.sendingType == true);
          if (this.TemplateListNew.length > 0) {
            this.MappingTempalte.sendingType = this.TemplateListNew[0].sendingType;
            this.MappingTempalte.sendingTypeSignNow = this.TemplateListNew[0].sendingTypeSignNow;
            this.MappingTempalte.sendToEmail = this.TemplateListNew[0].sendToEmail;
            this.MappingTempalte.fromToEmail = this.TemplateListNew[0].fromToEmail;
            this.MappingTempalte.signer1Email = this.TemplateListNew[0].signer1Email;
            this.MappingTempalte.signer2Email = this.TemplateListNew[0].signer2Email;
            this.MappingTempalte.subject = this.TemplateListNew[0].subject;
            this.MappingTempalte.body = this.TemplateListNew[0].body;
            this.MappingTempalte.ccEmail = this.TemplateListNew[0].ccEmail;
            this.MappingTempalte.MappingTempalteId = this.TemplateListNew[0];
          }
        }
      }
      else {
        this.MappingTempalte.sendingType = this.TemplateList[0].sendingType;
        this.MappingTempalte.sendingTypeSignNow = this.TemplateList[0].sendingTypeSignNow;
        this.MappingTempalte.sendToEmail = this.TemplateList[0].sendToEmail;
        this.MappingTempalte.fromToEmail = this.TemplateList[0].fromToEmail;
        this.MappingTempalte.signer1Email = this.TemplateList[0].signer1Email;
        this.MappingTempalte.signer2Email = this.TemplateList[0].signer2Email;
        this.MappingTempalte.subject = this.TemplateList[0].subject;
        this.MappingTempalte.body = this.TemplateList[0].body;
        this.MappingTempalte.MappingTempalteId = this.TemplateList[0];
        this.MappingTempalte.ccEmail = this.TemplateList[0].ccEmail;
      }
    }
  }
  copyInputMessage() {
    // this.Url = 'marhoom ki yad ma';
    if (this.DocExist) {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.Url;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
    else {
      this.toaster.error("Document has not been generated.");
    }


  }
  close() {
    
    this.sendEmail = false;
    this.CopytoClipboard = false;
    this.CopyLinkModal.hide();
  }

}
