import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CompanysetupserviceService } from '../../companysetup/companysetupservice.service';
import { DocumentDeliveryOptions, DocumentMakerSubModuleMappingService } from '../../document-maker-sub-module-mapping/document-maker-sub-module-mapping.service';

@Component({
  selector: 'app-send-email-test',
  templateUrl: './send-email-test.component.html',
  styleUrls: ['./send-email-test.component.scss']
})
export class SendEmailTestComponent implements OnInit {
  @ViewChild('modalMail', { static: false }) addsendMailTest: ModalDirective;
  id: any = 0;
  DeliveryOptions: DocumentDeliveryOptions = new DocumentDeliveryOptions();
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  fieldType: any;
  body: string;
  ckeConfig: any;
  customCompnentValues: any = [];
  signer1= false;
  signer2= false;
  smtpHost: string;
  smtpUsername: string;
  smtpPort: string;
  fromEmail: string;
  smtpPassword: string;
  IsEnableSSL: boolean;
  showpopup(id:any) {
   
   this.id = id;
    this.addsendMailTest.show();
    this.getCustomeFields();
    this.GetSMTPSetting();
    //this.FillEditorDataDelivery(null,id)
    this.DeliveryOptions = new DocumentDeliveryOptions();

  }
  close() {
    this.addsendMailTest.hide();
  }

  constructor(private service: DocumentMakerSubModuleMappingService,private companysetupserviceService: CompanysetupserviceService,  private toaster: ToastrService,) { }

  ngOnInit() {
    this.DeliveryOptions = new DocumentDeliveryOptions();
   

  }
  
  getCustomeFields() {
    this.service.GetDocumentMappingFieldsbyid(this.id).subscribe((result: any) => {
      ;
      if (result) {
        this.customCompnentValues =result ;
        this.customCompnentValues.forEach(element => {
          if(element.FieldKey=='Signer1')
          {
            // this.DeliveryOptions.signer1Email = '@' + element.formFieldName;
            // this.DeliveryOptions.signer1Option =  element.formFieldId;
            this.signer1 =true;
          }
          if(element.FieldKey=='Signer2')
          {
            // this.DeliveryOptions.signer2Email = '@' + element.formFieldName;
            // this.DeliveryOptions.signer2Option =  element.formFieldId;
            this.signer2 =true;
          }
        });
        // console.log("customCompnentValues", this.customCompnentValues);
      }
    });
  }

  sendTest() {
    //pending development  
    ;
    let EmailTo = '';    
     if(this.DeliveryOptions.sendToEmail!=null && this.DeliveryOptions.sendToEmail!='')
     {
      //EmailTo =  (this.DeliveryOptions.sendToEmail != null) ? this.DeliveryOptions.sendToEmail.join(",") : null;
     }
     else{

     }
     this.DeliveryOptions.documentMakerMappingId = this.id;
     if(this.DeliveryOptions.body==null 
     || this.DeliveryOptions.body==undefined)
     {
       if(this.DeliveryOptions.body == undefined)
       {
         this.DeliveryOptions.body = null;
       }
       else{
         this.DeliveryOptions.body = this.body;
       }
     }
     if(this.signer1 || this.signer2)
     {
        if((this.DeliveryOptions.signer1Email!=null &&
          this.DeliveryOptions.signer1Email!='') && 
          (this.DeliveryOptions.signer2Email!=null &&
           this.DeliveryOptions.signer2Email!=''))
        {
          if(EmailTo!=null && EmailTo !='')
          {
            let model = {
              ToEmail: EmailTo,
              Subject: this.DeliveryOptions.subject,
              Message: this.DeliveryOptions.body,
              FromEmail: this.DeliveryOptions.fromToEmail,
              SmtpHost: this.smtpHost,
              SmtpPort: this.smtpPort,
              Username: this.smtpUsername,
              Password: this.smtpPassword,
              IsEnableSSL: this.IsEnableSSL
            };
          }
          else{
            this.toaster.error('Please add send email to');
          }
          
        }
        else{
          if(this.DeliveryOptions.signer1Email==null &&
            this.DeliveryOptions.signer1Email=='')
          {
           this.toaster.error('Please add signer 1 email');
          }
          else{
           if(this.DeliveryOptions.signer2Email==null &&
              this.DeliveryOptions.signer2Email=='')
           {
             this.toaster.error('Please add signer 2 email');
           }
        }
       }
     }
     
   }
   GetSMTPSetting() {
    this.companysetupserviceService.getcompanySetupDetail().subscribe((result: any) => {      if (result) {
      if (result) {
            // ToEmail: this.emailTo.value,
            // Subject: this.emailSubject,
            // Message: this.messageText.value,
            // FromEmail: this.fromEmail.value,
            this.smtpHost = result.smtpHost;
            this.smtpPort = result.smtPport;
            this.smtpUsername= result.smtPusername;
            this.smtpPassword= result.smtPpassword;
            this.IsEnableSSL= result.isEnableSSL;
            }
      }
    },
      (error: any) => {
        //this.loadSave = false;
      })
  }
}
