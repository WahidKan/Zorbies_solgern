import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModuleList, CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { OwlOptions } from 'ngx-owl-carousel-o';
import { DashboardService } from '../../dashboard/dashboard.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeadlistService } from '../../lead/leadlist.service';

import { transform } from 'html2canvas/dist/types/css/property-descriptors/transform';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from '../../../../environments/environment';
import { LoanapplicationserviceService } from '../../loanapplication/loanapplicationservice.service';
import { CustomHttpParamEncoder } from '../../../services/customHttpParamEncoder ';
import { UserService } from '../../shared/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-documents',
  templateUrl: './customer-documents.component.html',
  styleUrls: ['./customer-documents.component.scss']
})
export class CustomerDocumentsComponent implements OnInit {

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
  pendingDoc: any;
  companyid: any;
  accountId: any;
  loadSave: boolean = false;
  linkfrom: string;
  constructor(private fb: FormBuilder, private titleService: Title, private router: Router, private userService: UserService, private customHttpParamEncoder: CustomHttpParamEncoder, private loanapplicationservice: LoanapplicationserviceService, private leadservice: LeadlistService, private commonService: CommonService, private toaster: ToastrService, private route: ActivatedRoute, private dashboardService: DashboardService) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.companyid = params.get('companyid');
      this.accountId = params.get('accid');
      this.getRequiredCustomerFileList();
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

  getRequiredCustomerFileList() {
    this.commonService.getRequiredCustomerFileList(this.accountId, this.companyid).subscribe((result: any) => {
      this.lstfiletype = result;
    });
  }
}
