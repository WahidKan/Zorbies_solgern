import { ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { LoanapplicationserviceService, loansectionarray } from '../../loanapplication/loanapplicationservice.service';
import { ProposallistService } from '../../proposal/proposallist.service';
import { CommonService, ModuleList, UserDetails } from '../../shared/common.service';
import { StagemanagementComponent } from '../../shared/stagemanagement/stagemanagement.component';
import { DashboardService, DashboardTopLeaseModel } from '../dashboard.service';
import * as $ from 'jquery'
import { FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationdetailComponent } from '../../shared/notificationdetail/notificationdetail.component';
import { LoanDocumentPopModelComponent } from '../loan-document-pop-model/loan-document-pop-model.component';
import { FileuploadComponent } from '../../loanapplication/fileupload/fileupload.component';
import { ServiceAppointmentComponent } from '../service-appointment/service-appointment.component';
import { GetProposalPopUpModelComponent } from '../get-proposal-pop-up-model/get-proposal-pop-up-model.component';
import { GetContractPopUpModelComponent } from '../get-contract-pop-up-model/get-contract-pop-up-model.component';
import { UnSignedDocumentPopUpModelComponent } from '../un-signed-document-pop-up-model/un-signed-document-pop-up-model.component';
import { MobileViewsStatemangementComponent } from '../mobile-views-statemangement/mobile-views-statemangement.component';

@Component({
  selector: 'app-mobile-views',
  templateUrl: './mobile-views.component.html',
  styleUrls: ['./mobile-views.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MobileViewsComponent implements OnInit {

  @ViewChild('dashboarNotificationDetailModal', { static: false }) dashboardNotificationDetailModal: NotificationdetailComponent;
  @Input() user: UserDetails;
  @ViewChild('fileInput', { static: false }) fileInput;;
  @ViewChild('customerDocumentsPopup', { static: false }) customerDocumentsPopup: ModalDirective;
  @ViewChild('previewModelPoup', { static: false }) previewModal: ModalDirective;
   @ViewChild('stageManagement', { static: false }) stageManagement: MobileViewsStatemangementComponent;
  @ViewChild('popModelData', { static: false }) popModelData: LoanDocumentPopModelComponent;
  @ViewChild('popModelfileUpload', { static: false }) popModelfileUpload: FileuploadComponent;
  @ViewChild('serviceModel', { static: false }) serviceModel: ServiceAppointmentComponent;
  @ViewChild('proposalModel', { static: false }) proposalModel: GetProposalPopUpModelComponent;
  @ViewChild('contractModel', { static: false }) contractModel: GetContractPopUpModelComponent;
  @ViewChild('unsignedDocumentModel', { static: false }) unsignedDocumentModel: UnSignedDocumentPopUpModelComponent;
  @ViewChild('ProposalDocumentModelPopup', { static: false }) ProposalDocumentListPopup: ModalDirective;
  @ViewChild('ContractDocumentModelPopup', { static: false }) ContractDocumentListPopup: ModalDirective;
  @ViewChild('LoanAppDocumentModelPopup', { static: false }) LoanAppDocumentListPopup: ModalDirective;
loadtop = false;
headerData: any; 
imageLink = '../../assets/images/default-user-icon.jpg';
loginuserid: any;
moduleName = 'crm';
submoduleName = 'opportunity';
listLeases: DashboardTopLeaseModel[]
loadingNotifications = false;
opportunityData: any;
stagelist: any;
loadSave:boolean = false;
accid: string;
fileName = 'Browse Files';
fileuplist: any;
AccountName: any;
contractNo:any;
signedDate:any;
ContarctStatus:any;
totlSystemcost:any;
systemSize:any
showContentMesage:boolean = false;
ContractStatus:any
ColorCode:any
customerDocuemneList: any[] = [];
totalcustomerdoc:number=0;
proposalName:any;
createdDate: any;
proposalId: number;
aplicationNumber:any;
uploadDocumentData:any;
proposalContarctStatus
Term:any;
LoancreatedDate:any
private app: AppComponent
fileurl: any;
username: any;
projName:any;
projEmail:any;
projectName:any
stageid: any;
insternalAccounList: any;
companyLogo: any;
primaryContactList: any;
oplist: any;
userType: any;
upcommingAppointsList: any;
ProposalList: any;
ContractList: any;
loanList:any;
opportunityOwnerList: any;
opid: any;
loanApplicationId: any;
loanApplicationDetail: any;
LoanApplicationProductDetail: any;
loanApplicationSalesRape: any;
loanApplicationfinanceDetail: any;
loanApplicationPaymentDetails: any;
dragForm: FormGroup;
loanApplicationData: any;
rateOfIntrest: any;
loanDocs: any;
loading = false;
sortDir = 'desc';
formdata1: any;
day: string = null;
month: string = '';
year: string = '';
sortColumn = 'CreatedOn';
CompanyId: any;
lstPageSize: any;
pageSizeValue: number;
isWeekSelected: boolean = false;
submitteddate: string;
AccountId:any
contactId:any;
BillingAddress:any;
innerHTML: any;
pagedData: any = {
  pager: {},
  data: []
};
listFilter = '';
searchTxt = '';
//formdata1: any;
siteurl:string;
imageExtension: any='';
pageNo = 1;
pageSize = 4;
previewImage: any = '';
formstagedata: any;
formstagedatamaster: any;
formstagearray: loansectionarray[];
userId: any;
loanApplicationNotification: any;
loanApplicationAppointment: any;
loanApplicationNumberData: any;
loanApplicationPrimaryContactList: any;
loanApplicationUpcommingAppointsList: any;
loanApplicationOwnerList: any;
loanApplicationInsternalAccounList: any;
showMassage: boolean = false;
showAppMassage: boolean = true;
showAppMassageProp:boolean=false;
showAppMassageContr:boolean=false;
showAppMassageloan: boolean = false;
OwnerName: string;
OwnerEmail: string;
OwnerPhone: any;
htmlcontent: any;
htmlcss: any;
htmlandcss: any;
loanAppid: any;
MultileHtmlAndCSSArray: any[] = [];
proposalDocuemnetList: any[] = [];
opportunityList: any;
defaultopportunity: any;
showNoHtmlFound: boolean = false;
showLoanDoc: boolean = false;
documentList:any;
popUpclicked= false
serviceAppointment:any;
unsignedDocument:any;
unsignedDocumentList:any;
headeruserid: any;
modulePermission: ModuleList;
  screen_width: any;
  announcement: any;
  mobileScreen: boolean = false;
  submoduleId: any;


constructor(private dashboardService: DashboardService, private commonService: CommonService, private toaster: ToastrService, private router: Router,
          private cdr: ChangeDetectorRef,
  private sanitizer: DomSanitizer,
  private proposalService: ProposallistService,
  private loanapplicationservice: LoanapplicationserviceService,  )
{
  this.commonService.getLoggedInName.subscribe((userdetail: any) => {
    this.loginuserid = userdetail.id;
    // console.log("userdetail", userdetail);
  });
}

  
@HostListener('window:resize', ['$event'])
onResize(event) {
  event.target.innerWidth;
  // console.log(event.target.innerWidth)
 this.screen_width = document.documentElement.clientWidth;
 if(this.screen_width < 900){
   this.mobileScreen = true;
 }else{
   this.mobileScreen = false;
 }
}

ngOnInit() {
  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  }); 
  this.dashboardService.GetCustomerAnnouncement().subscribe((announcement: any) => {
    this.announcement = announcement;
   
  })
  this.screen_width = document.documentElement.clientWidth;
  if(this.screen_width < 900){
    this.mobileScreen = true;
  }else{
    this.mobileScreen = false;
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
  this.GetOpprotunityData();
  //this.router.navigateByUrl("/loanApplication");
  // this.opportunityData.upcommingAppointsList = null;
  //this.opid = "19876";
 // this.customerDashboardDataList = '';
  this.siteurl = window.location.origin;
  this.formstagedatamaster = '';
  this.getHtmlTemplatesForPortal();
  this.showLoanDoc = false;

  
 // this.stageManagement.refreshData(this.opid, 'opportunity');

  // this.GetOpportunityview();
  // this.getopportunitystage();
   this.GetAppointMent();
  //this.GetLoanApplicationData();
  //this.compp.ngOnInit();
  this.LoanApplicationNotification('34');
  this.getUploadDocumentData()

};


GetServiceAppointmentData(id){
  this.dashboardService.GetServiceAppointmentData(id).subscribe((result: any) => {
    this.serviceAppointment = result;
  })
}

// SetOpprotunityStage() {
//   this.getopportunitystageClickState(this.opid);
//   this.GetOpportunityviewClickStage(this.opid);
// }
getopportunitystageClickState(id) {
  this.dashboardService.getopportunitystage(id).subscribe((result: any) => {
    this.stagelist = result;
  })
}
GetOpportunityviewClickStage(id) {
  this.dashboardService.GetOpportunityview(id, this.stageid).subscribe((result: any) => {
    this.oplist = result;
    // // console.log('oplist', result);
  })
}
LoanApplicationNotification(id) {
  debugger;
  this.dashboardService.LoanApplicationNotification(id).subscribe((result: any) => {
    if (result) {
      this.loanApplicationNotification = result;
      // console.log(result);
      let screen_width = document.documentElement.clientWidth;
      // console.log(screen_width);

      if (this.loanApplicationNotification.length == 0) {
        this.showMassage = true;
      }
      else {
        this.showMassage = false;
      }
      //  console.log("Notifications",this.loanApplicationNotification);
    }
    else {
      this.loanApplicationNotification = "";
    }
});
}

openModelData(){

}

//GetOpprotunityData() {
//  this.loadingNotifications = true;
//  this.dashboardService.GetOpprotunityData().subscribe((result: any) => {
//    if (result) {
//      if (result.customerDashboardDataList.length>0) {
//        this.opid = result.customerDashboardDataList[0].id;
//        this.insternalAccounList = JSON.parse(result.customerDashboardDataList[0].contacts);
//      }
//      // // console.log("opid", this.opid);
//      if (result != null ) {
//          this.opportunityData = result;
//      }
     
//      if (result.opportunityOwnerList.length>0) {
//        this.opportunityOwnerList = result.opportunityOwnerList;
//      }
//      if (result.primaryContactList.length>0) {
//        this.primaryContactList = result.primaryContactList;
//      }
//      if (result.upcommingAppointsList.length>0) {
//        this.upcommingAppointsList = result.upcommingAppointsList;
//      }
     
     
//      // // console.log("insternalAccounList", this.insternalAccounList);
//      this.loadingNotifications = false;
//    }
//  }, error => {
//    this.loadingNotifications = false;
//  }); 
//}

GetOpprotunityData() {
  this.dashboardService.GetOpprotunityData().subscribe((result: any) => {
    this.opportunityList = result;
    // console.log(result)
    if (result.length>0) {
      debugger;
      this.projectName = this.opportunityList[0].text;
      this.defaultopportunity = this.opportunityList[0].value;
      this.GetContactDetailsById(this.defaultopportunity);
     
    }
  });
};

getDocumentForReceiveAndPendingList(id) {
 this.documentList =  this.loanapplicationservice.getDocumentForReceiveAndPending(id)
}

GetContactDetailsById(opportunityId: string) {
  this.loadSave = true;
  this.dashboardService.GetCompanyAccountData(opportunityId).subscribe((result: any) => {
    if (result.length > 0) {
     this.contactId=result[0].ContactId;
     this.AccountName=result[0].accountName;
     this.fileurl=result[0].FileUrl;
     this.projName=result[0].Name;
     this.projEmail=result[0].Email;
    //  this.imageLink=result[0].ProfilePic;
     this.contractNo=result[0].contractNo;
     this.signedDate=result[0].signedDate;
     this.totlSystemcost=result[0].totlSystemcost;
     this.systemSize=result[0].systemSize;
     this.ContractStatus=result[0].ContractStatus;
     this.ColorCode=result[0].ColorCode;
     this.proposalName=result[0].proposalName;
     this.createdDate = result[0].createdDate;
     this.proposalId = result[0].proposalId
     this.aplicationNumber=result[0].aplicationNumber;
     this.Term=result[0].Term;
     this.rateOfIntrest = result[0].rateOfIntrest;
      this.loanDocs = result[0].LoanDocName;
     this.LoancreatedDate=result[0].LoancreatedDate;
     this.opid = result[0].OpportunityId;
     this.OwnerName = result[0].OwnerName;
     this.OwnerEmail = result[0].OwnerEmail;
     this.OwnerPhone = result[0].OwnerPhone;
     this.AccountId = result[0].AccountId
      this.BillingAddress = result[0].BillingAddress
      this.submoduleId = result[0].documentSubModule;
     //this.htmlcontent = result[0].htmlcontent;
   //  this.htmlcss = result[0].htmlcss;
   this.GetProposalAndContractStatus(this.proposalId,'proposal')
   this.GetContractStatus(this.proposalId,'contract')
    this.GetServiceAppointmentData(this.opid);
    this.GetUnsignedDocument(this.opid);

 

    //  console.log(this.OwnerName)
    if(this.OwnerName){
      this.showContentMesage = true;
    }else{
      this.showContentMesage = false;
    }
      this.loanAppid = result[0].loanAppId;
      this.loanapplicationservice.getDocumentForReceiveAndPending(this.loanAppid ).subscribe(response => {
        this.documentList = response;
        // console.log(this.documentList);
      })
      this.GetCustomerDocumentsCount();
      //this.stageManagement.refreshData(this.opid, 'opportunity');
      this.downLoanDoc();
      this.loadSave = true;
      ;
      setTimeout(() => {
        this.loadSave = false;
      }, 2000);
      //if (this.htmlcss && this.htmlcss.length > 0) {
      //  const css = result[0].htmlcss;
      //  const head = document.getElementsByTagName('head')[0];
      //  const style = document.createElement('style');
      //  style.type = 'text/css';
      //  style.appendChild(document.createTextNode(css));
      //  head.appendChild(style);
      //}
      //this.htmlandcss = this.sanitizer.bypassSecurityTrustHtml(this.htmlcontent);
    }
  }, error => {
    this.loadingNotifications = false;
    this.loadSave = false;
  })
  setTimeout(() => {
    this.loadSave = false;
  }, 2000);
};


GetCustomerDocumentsCount() {
  this.dashboardService.GetCustomerDocumentsCount(this.contactId, this.opid).subscribe((result: any) => {
      if (result) {
        this.totalcustomerdoc=result.length;
        this.customerDocuemneList=result;
        // console.log(result);
          this.stageManagement.refreshData(this.opid, 'opportunity','hideStageDetails');
       }
     }, error => {
       
     });           
};


GetLoanApplicationData() {
  debugger
  this.loadingNotifications = true;
  this.dashboardService.GetLoanApplicationData(0).subscribe((result: any) => {
    if (result) {
      if (result.loanApplicationNumber != null && result.loanApplicationNumber != "") {
        this.loanApplicationId = result.loanApplicationNumber[0].id;
        this.LoanApplicationNotification(this.loanApplicationId);

        if (this.loanApplicationId != null && this.loanApplicationId != "") {
          this.fillLeadForm(this.loanApplicationId);
        }


      }
      //alert(this.loanApplicationId);
      // // console.log("opid", this.opid);
      this.loanApplicationData = result;
      this.loanApplicationNumberData = result.loanApplicationNumber;
      this.loanApplicationDetail = result.loanApplicationDetail;
      this.LoanApplicationProductDetail = result.productDetail;
      this.loanApplicationfinanceDetail = result.financeDetail;
      this.loanApplicationPaymentDetails = result.loanApplicationPaymentDetails;
      this.loanApplicationSalesRape = result.salesRapeLoanApplicationDetail
      //this.loanApplicationOwnerList = result.opportunityOwnerList;
      ////// console.log("resultLoanApplication", result);
      //this.loanApplicationPrimaryContactList = result.primaryContactList;
      //this.loanApplicationUpcommingAppointsList = result.upcommingAppointsList;
      //this.loanApplicationInsternalAccounList = JSON.parse(result.customerDashboardDataList[0].contacts);
      //// // console.log("insternalAccounList", this.insternalAccounList);
      this.loadingNotifications = false;
      this.fillLeadForm(this.loanApplicationId);
    }
  }, error => {
    this.loadingNotifications = false;
  });
}

GetAppointMent(pageNum: number = 0) {
  this.dashboardService.GetAppointments().subscribe(response => {

    this.loanApplicationAppointment = response;
    // console.log(response);

    if (this.loanApplicationAppointment.length == 0) {
      this.showAppMassage = true;
    }
    else {
      this.showAppMassage = false;
    }
  }, error => {
    this.loading = false;
  })
};

getImages() {
  this.dashboardService.getImages(this.accid).subscribe((result: any) => {
    this.fileuplist = result;

  })
};

fillLeadForm(id) {
  this.loading = true;
  this.dashboardService.GetApplicationDetails(id, this.CompanyId, this.userId).subscribe((result: any) => {

    this.formdata1 = this.dashboardService.applicationInfo;
    this.accid = this.formdata1.AccountId;
    this.getImages();

  });
  try {
  this.dashboardService.GetStageDetails(id).subscribe((result: any) => {
    // console.log("id", id);
    this.formstagedata = this.dashboardService.stageInfo;
    this.formstagearray = [];
    let flag = 0;
    this.formstagedatamaster = this.formstagedata.filter(item => item.ParentId == null);

    this.formstagedata.forEach((item1) => {
      this.submitteddate = item1.DateSubmitted;

      let stagename = "";// item1.loan_app_stage_name;
      item1.LinkFormMaster.split(',').forEach((item) => {
        let _stgname = item.split('::')
        let _formstagearray = new loansectionarray();
        let itmarray = "";
        if (_stgname.length <= 2) {

          _formstagearray.stageName = _stgname[0];
        }

        _formstagearray.userTypes = item1.userTypes;
        _formstagearray.stageActive = item1.stageActive;
        if (item.search('form::') == -1) {
          _formstagearray.stageName = _stgname[0];
        }
        else { 
          _formstagearray.stageName = _stgname[2];
          _formstagearray.formmasterid = _stgname[1];
        }

        _formstagearray.stageclass = item1.stageclass;
        _formstagearray.PaymentInfoSubmitted = item1.PaymentInfoSubmitted;
        _formstagearray.ApplicantSubmitted = item1.ApplicantSubmitted;
        _formstagearray.LoanInformationSubmitted = item1.LoanInformationSubmitted;
        _formstagearray.CoApplicantSubmitted = item1.CoApplicantSubmitted;
        _formstagearray.InstallationPropertySubmitted = item1.InstallationPropertySubmitted;
        _formstagearray.ProductInfoSubmitted = item1.ProductInfoSubmitted;
        _formstagearray.ExpansesSubmitted = item1.ExpansesSubmitted;
        _formstagearray.ReleaseFundsSubmitted = item1.ReleaseFundsSubmitted;
        _formstagearray.NTPSubmitted = item1.NTPSubmitted;
        _formstagearray.linkFormMaster = item1.LinkFormMaster;
        this.formstagearray.push(_formstagearray);


        this.loading = false;
      });

    });
    //let empty = null;

  });
} catch(err) { }
  //this.getCreditScore();
}
formstagedatasub(item) {

  var itemsdata = this.formstagedata.filter(x => x.ParentId == item);

  return itemsdata;
}
checklaststage() {
  let isdone = false;
  if (this.formstagedata != null) {
    var itemsdata = this.formstagedata.filter(x => x.ParentId == null);
    if (itemsdata != null && itemsdata != 'undefined') {
      var tt = itemsdata[itemsdata.length - 1];
      //  if (itemsdata[itemsdata.length - 1].stageapproved == 1) {

      if (tt != null && tt != 'undefined') {
        // console.log("in");
        if (tt.stageapproved == 1) {
          isdone = true;
        }
      }

      var itemsdata = this.formstagedata.filter(x => x.ParentId == itemsdata[itemsdata.length - 1].loan_app_stage_id);
      if (itemsdata != null && itemsdata != 'undefined') {
        itemsdata.forEach(item => {
          if (item.SequenceType == 'Parallel' && item.stageapproved == 1) { isdone = true; return isdone; }
          else if (item.SequenceType == 'Sequence' && item.stageapproved == 0) { isdone = false; return isdone; }
        });
      }
    }  
    return isdone;
  }

}
// tabclick(id: any) {
//   this.stageid = id;
//   this.GetOpportunityview();
// }
setFile($event): void {
  this.commonService.uploadImageFileValidator($event);
  this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB")
  if (this.commonService.isFileValid) {
    this.fileName = $event.target.files[0].name;
    //this.companyLogo.setValue($event.target.files[0].name);
    this.AddEditCompanySetup();
  }
}

private prepareFormDataForDocument() {

  const input = new FormData();
  input.append('companyId', '1001');
  input.append('companyName', '');

  const fileBrowser = this.fileInput.nativeElement;
  if (fileBrowser.files && fileBrowser.files[0]) {
    input.append('file', fileBrowser.files[0]);
  }
  return input;
}

AddEditCompanySetup() {
  //if (this.dragForm.valid) {
  this.loadSave = true;
  const companySetupModel = this.prepareFormDataForDocument();
  this.dashboardService.addOrUpdateUploadFileOnAzzure(companySetupModel).subscribe((result: any) => {
    if (result.statusCode == 200) {
      this.toaster.success(result.responseMessage);
      //this.fileInput.nativeElement.files;
      this.fileInput.nativeElement.value = "";
      // // console.log("fileInput", this.fileInput.nativeElement.files);
      //this.router.navigateByUrl("/dashboard");
      this.fileName = 'Browse Files';
      //this.GetOpprotunityData();
      //this.getopportunitystage();
      setTimeout(() => { this.loadSave = false; }, 3000);
    }
    else {
      this.loadSave = false;
      this.toaster.error(result.responseMessage);
    }
  }, error => {
    this.loadSave = false;
  });
  //}
  //else {
  //  this.commonService.validateAllFormFields(this.dragForm);
  //}

}
get companyId() { return this.dragForm.get('companyId'); }
get companyName() { return this.dragForm.get('companyName'); }


checksubchildsq(item) {

  var itemsdata = this.formstagedata.filter(x => x.ParentId == item && x.SequenceType == 'Sequence');
  return itemsdata.length > 0;
}
checksubchildpar(item) {

  var itemsdata = this.formstagedata.filter(x => x.ParentId == item && x.SequenceType == 'Parallel');
  return itemsdata.length > 0;
}
showDocumentListpopup() {
    this.customerDocumentsPopup.show();
}
closeDocumentListpopup()
{
  this.customerDocumentsPopup.hide();
}
open(imageList: any): void {
  if (imageList.includes('https')) {

  }
  this.imageExtension = imageList.split('.').pop();
  this.previewImage = '';
  this.previewImage = imageList;
  this.previewModal.show();
}
closePreview() {
  this.previewModal.hide();
}

downloadFile(e: any, url: string) {
  e.preventDefault();
  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function () {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    //delete a;
  };
  xhr.open('GET', url);
  xhr.send();
};

openProposalDocumentListPopup() {
  if (this.proposalId) {
    this.proposalService.getDocumentMappingList(this.proposalId).subscribe(response => {
      if (response) {
        response = response.filter(x => x.Status == 'SENT');
        this.proposalDocuemnetList = response;
      }

    },
      error => {
        this.toaster.error(error.statusText);
      })
  }
  this.ProposalDocumentListPopup.show();
};

closeProposalDocumentModal() {
  this.ProposalDocumentListPopup.hide();
};

downloadProposalDoc() {
  if (this.proposalDocuemnetList.length > 0) {
    var ids = this.proposalDocuemnetList.filter(x => x.DocumentType != "html").map(m => m.Id).join(",");
    var DocumentMappingDocIds = this.proposalDocuemnetList.filter(x => x.DocumentType == "html").map(m => m.DocumentMappingDocId);
    if (DocumentMappingDocIds) {
      this.commonService.GetEcryptedId(this.proposalId).subscribe((result: any) => {
        if(result)
        {
          let Url = this.siteurl +"/proposal-document/"+encodeURIComponent(result)+"/system";
          window.open(Url);
          this.loadSave = false;
        }       
      });
    }
   
    if (ids) {
      this.proposalService.getDocumentBytes(this.proposalId, ids,"proposal").subscribe(result => {
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
            //this.toaster.error("Something went wrong on mapping.");
          }

        });
    }
    else {
      //this.toaster.error("No record available.");
      //this.loadSave = false;
    }

  }
};

downLoanDoc() {
  this.getLoanDocslist();
};

getLoanDocslist() {
  this.loadSave = true;
  this.loanapplicationservice.getLoanDocslist(this.loanAppid, 'Id', 'desc', 1, 50).subscribe((resp: any) => {
    this.pagedData = resp;
    if (this.pagedData.data.length>0) {
      this.pagedData = this.pagedData.data.filter(x => x.DocumentStatus == 'FINALIZED');
      this.loading = true;
      if (this.pagedData[0].FileUrl == null || this.pagedData[0].FileUrl == '') {
        this.showLoanDoc = true;
        this.loanapplicationservice.DownloadBankDocument(this.pagedData[0].DocumentId, this.pagedData[0].SourceType, this.pagedData[0].SolgenFileUrl, this.loanAppid).subscribe(blob => {
          var file = new Blob([blob], { type: blob.type });
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          //saveAs(file, this.pagedData[0].FileName);
          setTimeout(() => {
            this.loadSave = false;
          }, 2000);

        }, err => {
          this.loadSave = false;
        });
      } else {
        this.loanapplicationservice.DownloadFile(this.loanAppid, this.pagedData[0].Id).subscribe(blob => {
          this.showLoanDoc = true;
          var file = new Blob([blob], { type: blob.type });
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
         // saveAs(file, this.pagedData[0].FileName);
          setTimeout(() => {
            this.loadSave = false;
          }, 2000);

        }, err => {
          this.loadSave = false;
        });
      }
    }
    setTimeout(() => {
      this.loadSave = false;
    }, 2000);

  })
};

getHtmlTemplatesForPortal() {
  this.showNoHtmlFound = true;
  this.dashboardService.GetHtmlTemplates().subscribe((result: any) => {
    if (result.length > 0) {
        result.forEach(x => {
          if (x.htmlcss && x.htmlcss.length > 0) {
            const css =  x.htmlcss;
            const head = document.getElementsByTagName('head')[0];
            const style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(css));
            head.appendChild(style);
          }
          let obj = {
            htmlandcss: this.sanitizer.bypassSecurityTrustHtml(x.htmlcontent)
          }
          this.MultileHtmlAndCSSArray.push(obj);
          this.showNoHtmlFound = false;
        })
    }
  }, error => {
    this.loadSave = false;
  })
};

openContractDocumentListPopup() {
  this.proposalDocuemnetList = [];
  //if (this.proposalId) {
  //  this.proposalService.getDocumentMappingList(this.proposalId).subscribe(response => {
  //    if (response) {
  //      response = response.filter(x => x.Status == 'SENT');
  //      this.proposalDocuemnetList = response;
  //      // this.previewModal.show();
  //    }

  //  },
  //    error => {
  //      this.toaster.error(error.statusText);
  //    })
  //}
  this.ContractDocumentListPopup.show();
};

closeContractDocumentModal() {
  this.ContractDocumentListPopup.hide();
};

openLoanAppListPopup() {
  this.LoanAppDocumentListPopup.show();
};

closeLoanDocumentModal() {
  this.LoanAppDocumentListPopup.hide();
};
onOpportunityChange(e: any) {
  let opportunityId = e.value;
  this.GetContactDetailsById(opportunityId);
  this.loanapplicationservice.getDocumentForReceiveAndPending(this.loanAppid).subscribe(response => {
    this.documentList = response;
    // console.log(this.documentList);
  })

}

GetDocumentHistoryListData(){
 this.popModelData.showModel(this.loanAppid);
}

GetUploadDocument(){
  debugger;
  this.popModelfileUpload.show(this.AccountId,this.loanAppid);
}

getUploadDocumentData(){
  this.loanapplicationservice.getDocumentForReceiveAndPending(this.loanAppid).subscribe((result: any) => {
    this.uploadDocumentData = result;
    // console.log(result);
  })
}

// service Appoinment popUp

GetServiceAppoinment(){
  let appoinment = this.serviceAppointment.length
  if(appoinment == 0){
    this.toaster.error('No Appoinment Found')
  }else{
    this.serviceModel.GetServiceAppointments(this.opid);
  }

}

GetProposalAndContractStatus(proposalId,subModuleCode){
  this.dashboardService.GetProposalAndContractStatus(proposalId,subModuleCode).subscribe((result: any) => {
    this.proposalContarctStatus = result;
    // console.log(this.proposalContarctStatus);
  })

}

GetContractStatus(proposalId,subModuleCode){
  this.dashboardService.GetProposalAndContractStatus(proposalId,subModuleCode).subscribe((result: any) => {
    this.ContarctStatus = result;
    // console.log(this.ContarctStatus);
  })

}

GetContractData(data:any){
  let dataValue = this.ContarctStatus.length;
 if( dataValue == 0){
  this.toaster.error('No Contract Found')
 }else{
  this.contractModel.GetContractData(this.proposalId,'contract')
 }

}

GetProposalData(data:any){
let proposalData = this.proposalContarctStatus.length
if( proposalData == 0){
  this.toaster.error('No Proposal Found')
}else{
    
  this.proposalModel.GetProposalData(this.proposalId,'proposal')
}

}

ngOnDestroy() {
  this.loanapplicationservice.loanId = this.loanAppid; 
  this.loanapplicationservice.opid = this.opid;
  this.loanapplicationservice.notificationArray = this.loanApplicationNotification;
  this.loanapplicationservice.mobileSubmoduleId = this.submoduleId;
}

GetUnsignedDocument(opportunityId){
this.dashboardService.GetUnsignedDocument(opportunityId).subscribe((result: any) => {
  this.unsignedDocument = result;
  // console.log(this.unsignedDocument);
})
}

GetUnSignedDocumentList(){
 this.unsignedDocumentModel.GetUnSignedDocument(this.opid);
}

headerSetup(user: any) {
this.commonService.getLoggedInName.subscribe((userdetail: any) => {
  this.userType = userdetail.userType;
  if (userdetail.id == null) {
    this.username = user.firstName + " " + user.lastName
    this.imageLink = user.ProfilePic;
  }
  else {
    this.username = userdetail.firstName + " " + userdetail.lastName;
    this.imageLink = userdetail.ProfilePic;
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
}
