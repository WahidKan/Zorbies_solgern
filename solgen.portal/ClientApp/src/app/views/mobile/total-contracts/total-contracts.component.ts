import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../dashboard/dashboard.service';
import { LenderlistService } from '../../lender/lenderlist.service';
import { LoanapplicationserviceService } from '../../loanapplication/loanapplicationservice.service';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import * as $ from 'jquery'
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-total-contracts',
  templateUrl: './total-contracts.component.html',
  styleUrls: ['./total-contracts.component.scss']
})
export class TotalContractsComponent implements OnInit {

  serviceAppoinmentList:any;
  opportunityId: any;
  private app: AppComponent 
  userType: any;
  username: any;
  headeruserid: any;
  modulePermission: ModuleList;
  headerData: any; 
  imageLink = '../../assets/images/default-user-icon.jpg';
  loadSave: boolean = false;
  constructor(
    private loanapplicationservice: LoanapplicationserviceService, private route: ActivatedRoute, private commonService: CommonService,
    private lenderService: LenderlistService, private toaster: ToastrService, private dialogService: ConfirmationDialogService,
    private  dashboardService: DashboardService
  ) { }

  ngOnInit() {
    $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    }); 
     this.opportunityId =  this.loanapplicationservice.opid;
     if(this.opportunityId){
      this.GetContractData(this.loanapplicationservice.opid);
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
  }

  GetContractData(id:any){
    this.dashboardService.GetContractData(id).subscribe((result : any) => {
      this.serviceAppoinmentList = result;
      console.log(this.serviceAppoinmentList)
    })
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
  
  headerSetup(user: any) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.userType = userdetail.userType;
      if (userdetail.id == null) {
        this.username = user.firstName + " " + user.lastName
      }
      else {
        this.username = userdetail.firstName + " " + userdetail.lastName
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
}
