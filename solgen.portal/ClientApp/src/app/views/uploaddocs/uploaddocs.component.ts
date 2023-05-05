import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModuleList, CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { OwlOptions } from 'ngx-owl-carousel-o';
import { DashboardService } from '../dashboard/dashboard.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeadlistService } from '../lead/leadlist.service';

import { transform } from 'html2canvas/dist/types/css/property-descriptors/transform';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';
import { LoanapplicationserviceService } from '../loanapplication/loanapplicationservice.service';
import { CustomHttpParamEncoder } from '../../services/customHttpParamEncoder ';
import { UserService } from '../shared/user.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-uploaddocs',
 // template: '<h2>Hello</h2>',
  templateUrl: './uploaddocs.component.html',
  styleUrls: ['./uploaddocs.component.scss']
})
export class UploaddocsComponent implements OnInit {
  imageLink: any;
  fileExtension: any;
  totalDocument: any;
  loading = false;
  recieveDocument: any;
  requireDoc: any;
  fileName = 'Choose Document';
  lstfiletype: any; usertype: string;
  fileImageName: any;
  fileuplist: any;
  loanId: any;
  fileNameddlvalue: any;
  isValid = true;
  accid: any;
  siteURL: string = "";
  url: string = "";
  urldata: any;
  siteimage: string;
  sitetitle: string = '';
  pendingDoc: any; companyid: any;
    @ViewChild('fileInput', { static: false }) fileInput;;
  @ViewChild('fileuploadddl', { static: false }) fileuploadddl: NgSelectComponent;

  loadSave: boolean = false;
  linkfrom: string;
  constructor(private fb: FormBuilder, private titleService: Title, private router: Router, private userService: UserService, private customHttpParamEncoder: CustomHttpParamEncoder, private loanapplicationservice: LoanapplicationserviceService, private leadservice: LeadlistService, private commonService: CommonService, private toaster: ToastrService, private route: ActivatedRoute, private dashboardService: DashboardService) {
  }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const encryptid = params.get('encryptid');

      
      let aid = params.get('accid');

      if (encryptid) {
        this.loanapplicationservice.GetDecryptid(encryptid).subscribe((data: any) => {
         
          if (data) {
            this.linkfrom='Mobile'
            this.loanId = data;
            this.GetLoanapplicationDocumentType(data);
            this.getDocumentForReceiveAndPending();
          }
        });
      }

      if (id) {
        this.loanId = this.decryptid(id);
        this.GetLoanapplicationDocumentType(id);
      }
      if (aid) {
        this.accid = aid
      }
      this.companyid = 1004;
      this.getDocumentForReceiveAndPending();
      this.url = window.location.href;

    //  // console.log('this.urlbefore', this.url)
      this.url = this.url.slice(9, 19);
      //---setting Logo on basis of URL
      //// console.log('this.urlafter', this.url)
      this.userService.GetSiteURl(this.url).subscribe((result: any) => {

        //// console.log('dataa', result);
        this.urldata = JSON.parse(result);

        if (result != null) {
          this.siteimage = this.urldata[0].SiteLoginLogo;

          this.sitetitle = this.urldata[0].SiteTitle;

          this.setTitle(this.sitetitle);
        }
        else {
          this.sitetitle = 'SolgenOne'
          this.setTitle(this.sitetitle);
          this.siteimage = 'assets/default-theme/imagesNew/login-logo-solgen.png';
        }

      })

      //// console.log(this.router.url);
      if (this.router.url.indexOf('app.loanhomi') > 0) {
        this.siteURL = "loanhomi";
      }
      else if (this.router.url.indexOf('app.solgenone') > 0) {
        this.siteURL = "solgenone";
      }
      else if (this.router.url.indexOf('solgen.zorbis') > 0) {
        this.siteURL = "solgenone";
      }
    })
  }
  checkMandatory(item: any) {
    if (item.indexOf("*") !== -1) {
      return true;
    }
    return false;
  }

  setTitle(newTitle: string) {

    this.titleService.setTitle(newTitle);
  }
  decryptid(id) {
    return this.customHttpParamEncoder.decodeValue(id);
  }


  getDocumentForReceiveAndPending() {
    //getDocumentForReceiveAndPending(id) {
    //  return this.http.get(this.baseUri + `loanproduct/GetLoanProductDiscountCategoryEdit?productId=${id}`);
    //}

    this.loanapplicationservice.getDocumentForReceiveAndPendingforcustomer(this.loanId,this.companyid, "EXTERNAL_LINK").subscribe((result: any) => {
      this.totalDocument = result.TotalDocs;
      this.recieveDocument = result.ReceivedDocs;
      this.pendingDoc = result.pendingDocs;
      this.requireDoc = result.requireDoc;
      //  // console.log("PeendingOrReceiveANd", result);
    });
  }

  fileNameDDL(e) {
    //// console.log(e);
    this.fileNameddlvalue = e.documentType;
    this.fileNameddlvalue = this.fileNameddlvalue.slice(0, -1);

    //// console.log(this.fileNameddlvalue);
    this.fileNameddlvalue = this.fileNameddlvalue.replace(/\s/g, "");
   // // console.log(this.fileNameddlvalue);

  }

  GetLoanapplicationDocumentType(id) {
    this.loanapplicationservice.GetLoanapplicationDocumentTypeforcust(id).subscribe((data: any) => {
     // // console.log(data);
      this.lstfiletype = data.filter(function (itm) { return (itm.documentType != "Install Agreement" && itm.documentType != "Install Agreement*") });
    })

  }
  SaveImage() {
   
    if (this.fileName === null || this.fileName === ''
      || typeof this.fileName === 'undefined'
      || this.fileName == 'Choose file') {
      this.isValid = false;
    }

    else {
      this.isValid = true;
    }
    if (this.fileName != 'Choose file' && this.UploadimageForm.valid) {
      this.loadSave = true;

      const companySetupModel = this.prepareFormDataForDocument();
      this.dashboardService.customeruploadfilePDF(companySetupModel).subscribe((result: any) => {
        setTimeout(() => {
          if (result.statusCode == 200) {
            this.loadSave = false;
            this.toaster.success('Document has been uploaded successfully');

            this.fileInput.nativeElement.value = "";

            this.fileName = '';
          
            this.fileuploadddl.clearModel();
            this.UploadimageForm.value.filetype = null;
            this.UploadimageForm.reset();
            this.getDocumentForReceiveAndPending();
           
          }
          else {
            this.loadSave = false;
            this.toaster.error(result.responseMessage);
          }
        }, 3000);
      }, error => {

      });
    }
    else {
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.UploadimageForm);
    }

  }
  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('companyId', '1004');
    input.append('companyName', '');
    input.append('moduleid', '1');
    input.append('submoduleid', 'loanapplication');
    input.append('refid', this.loanId);
    input.append('documentTitle', this.fileNameddlvalue);
    input.append('description', this.UploadimageForm.value.description == null ? '' : this.UploadimageForm.value.description);
    input.append('accountid', this.accid);
    input.append('filetype', this.UploadimageForm.value.filetype);
    input.append('fileExtension', this.fileExtension);
    input.append('linkfrom', this.linkfrom);
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }
    return input;
  }

  setFile($event): void {
    this.commonService.uploadPDFANDIMGAEFileValidator($event);
    if (this.commonService.isUploadFileValid == true) {

      this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "20MB")
      if (this.commonService.isFileValid) {
        this.fileName = $event.target.files[0].name;
        this.fileExtension = this.fileName.replace(/^.*\./, '');
        //this.companyLogo.setValue($event.target.files[0].name);

      }
    }
    else {
      this.fileName = 'Choose file';
    }
  }




  UploadimageForm = this.fb.group({
    profilePic: [''],
    'file': '',
    'filename': [''],
    filetype: [null, Validators.required],
    documentTitle: ['', Validators.nullValidator],
    description: ['', Validators.nullValidator]
  });

  get profilePic() { return this.UploadimageForm.get('profilePic'); }
  get filename() { return this.UploadimageForm.get('filename'); }
  get filetype() { return this.UploadimageForm.get('filetype'); }
  get documentTitle() { return this.UploadimageForm.get('documentTitle'); }
  get description() { return this.UploadimageForm.get('description'); }

}
