import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionType } from '@swimlane/ngx-datatable';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../shared/common.service';
import { ConfirmationDialogService } from '../../../shared/confirmation-dialog/confirmation-dialog.service';
import { SubscriptionService } from '../subscription.service';
import { Login, ResetPassword, UserService } from '../../../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordModalComponent } from '../reset-password-modal/reset-password-modal.component'
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModulesService } from 'src/app/views/managemodules/modules.service';
import { any } from 'underscore';
import { debug } from 'console';


@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {
  @ViewChild('ResetPassword', { static: false }) modalResetPassword: ResetPasswordModalComponent;
  resetPasswordModel: ResetPassword = new ResetPassword();
  moduleName = 'facebook';
  submoduleName = 'facebookcampaign';
  @ViewChild('addEditModal', { static: false })
  pageNo = 0;
  pageSize = 15;
  listFilter: string = '';
  SelectionType = SelectionType;
  From: any;
  To: any;
  loadSave: boolean = true;
  isEdit: boolean = false;
  pagedData: any = {
    pager: {},
    data: [],
  };
  currentPage = 0;
  searchBy: string = '';
  searchIndustry: string = null;
  offset: number;
  selected = [];
  lstPageSize: any;
  loading: boolean;
  sortDir: any = 'desc';
  sortColumn: any = 'CreatedOn';
  deleteId: string;
  isAddForm = false;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  PackageList: any[] = [];
  resetPasswordForm: FormGroup;

  constructor(
    public commonService: CommonService,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private subService: SubscriptionService,
    private userService: UserService,
    private fb: FormBuilder,
    private deviceService: DeviceDetectorService,
    private moduleService: ModulesService,
  ) {
    this.epicFunction();
    //const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    ;
  }

  ngOnInit() {
    this.modulePermission = this.commonService.getPermissiondata(9007);
    this.loadSave = true;
    this.getPageSizes();
    this.getSubscriptionList();
  }

  industryLists: any[] = [
    {
      text: 'Solar',
      value: 'Solar'
    },
    {
      text: 'Other',
      value: 'Other'
    }
  ];

  getSubscriptionList() {
    //this.loadSave = true;
    return this.subService.
      GetSubscriptionList(this.sortColumn, this.sortDir, this.pageSize, this.pageNo, this.searchBy, this.searchIndustry || '', false, null, null).
      subscribe(res => {
        debugger;
        this.pagedData = {
          pager: res.pager,
          data: res.data
        }
        this.pagedData.pager.currentPage += 1;
       this.loadSave = false;
      });
  }

  DeleteSub(Id: number) {
    ;
    return this.subService.DeleteSubscription(Id).subscribe(res => {
      if (res == true) {
        this.getSubscriptionList();
        this.toaster.success("Record is deleted successfully");
      }

    })
  }
  onClickResetPassword(row: any) {
    this.subService.GetResetPassword(row.Email).subscribe(res => {
      this.resetPasswordModel.userId = res.userId;
      this.resetPasswordModel.resetToken = res.resetToken;
      this.modalResetPassword.show(this.resetPasswordModel);
    });
  }

  onClick_Lock_Unlock_Account(userObj, status: boolean) {
    this.dialogService.confirm((!status ? 'Lock' : 'Un-lock') + ' Account', 'Are you sure you want to' + (status ? ' un-lock ' : ' lock ') + 'this account ?').subscribe((confirmed) => {
      if (confirmed) {

        var user = { userId: userObj.UserId, status: status };
        this.userService.Lock_Unlock_Account(user).subscribe((res: any) => {
          if (res) {
            this.getSubscriptionList();
            this.toaster.success(res.token);
          }
        });
      }
    });
  }

  AddNew() {
    this.router.navigateByUrl("/superAdminSubscription/addEditSubscription");
  }
  refresh() {
    ;
    this.loadSave = true;
    this.getSubscriptionList();
  }

  setPageNo($event) {
    this.pageNo = $event.page - 1;
    //this.currentPage=$event.page-1;
    this.getSubscriptionList()
  }

  search() {
    this.pageNo = 0;
    this.pageSize = 15;
    this.getSubscriptionList()
    // this.refresh();
  }

  reset() {
    this.pageNo = 0;
    this.pageSize = 15;
    this.From = null;
    this.To = null;
    this.listFilter = '';
    this.searchBy = '';
    this.searchIndustry = null;
    this.getSubscriptionList()
    // this.refresh();
  }



  get curPage(): number {
    return this.offset;
  }

  getPageSizes() {
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      debugger
      this.lstPageSize = this.commonService.masters;
    });
  }

  setPage($event) {
    debugger;
    this.loading = true;
    this.pageNo = $event.page - 1;
    // this.currentPage=$event.page-1;
    this.getSubscriptionList()
  }

  onSort($event) {
    const sort = $event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNo = 0;
    this.getSubscriptionList();
  }
  onChange($event) {
    ;
    this.pageSize = Number($event.text);
    this.pageNo = 0;
    // this.refresh();
    this.getSubscriptionList()
  }
  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  onSelect({ selected }) {
    ;
    if (this.deleteId == '' || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = '';
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ',';
      }
    } else {
      this.deleteId = null;
      this.deleteId = '';
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ',';
      }
    }
  }
  onDeleteMultipleSubs() {
    ;
    if (this.deleteId) {
      const message = `Are you sure you want to delete all the selected Subscription(s) ?`;
      this.dialogService.confirm('DELETE SUBSCRIPTION(S)', message).subscribe((confirmed) => {
        if (confirmed) {
          ;
          this.loadSave = true;
          this.subService.deleteselectedSubs(this.deleteId).subscribe(res => {
            this.loadSave = false;
            if (res) {
              ;
              this.toaster.success("Selected Subscription(s) has been deleted successfully.")
              this.deleteId = '';
              this.selected = [];
              this.refresh();
            }
            else {
              ;
              this.toaster.error("error occured.")
            }
          },
            (error) => { },
            () => {
              this.loadSave = false;
            }
          )

        }
        else {
          this.toaster.error('Please select at least one row.');
        }
      });
    }
    else {
      this.toaster.error('Please select at least one row.');
    }
  }

  loginModel: Login = new Login();
  Browser: any;
  BrowserVersion: any;
  CompanyIdval:any;
  deviceInfo: any;
  OS: any;
  OSVersion: any;
  loginUsersArray: LoginUser[] = []

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.Browser = this.deviceInfo.browser;
    this.BrowserVersion = this.deviceInfo.browser_version;
    this.OS = "";
    this.OSVersion = this.deviceInfo.os_version;
  }



  goToLogin(row:any){
      //this.loadSave = true;
      (typeof row) == "string" ? this.loginModel.userName = row :  this.loginModel.userName = row.Email;

      this.loginModel.browser = this.Browser + " " + this.BrowserVersion;
      this.loginModel.os = this.OS + " " + this.OSVersion;
      this.loginModel.CompanyId = this.CompanyIdval;

      this.userService.ValidateUserByEmail(this.loginModel).subscribe((res1: any)=>{

         if (res1.status == 200) {
        const message = `Are you sure you want to login into the "${row.CompanyName}" company?`;
      this.dialogService.confirm('Login Into Company', message).subscribe(confirmed => {


        
        //this.loadSave = true;
        if (confirmed) {
          this.loadSave = true;          

          // this.router.navigate(['/account']);

          // const url = this.router.serializeUrl(
          //   this.router.createUrlTree(['/account'])
          // );

          // window.open(url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');

          //window.open(url, '_blank');
          

          this.userService.loginWithEmail(this.loginModel).subscribe((res: any)=>{
            //this.loadSave = true;
           // console.log(res);

           this.loadSave = true;
           if(res){          
            if (res.status == 200) {
              // var obj : any = {
              //   emailId:res.email, access_token: res.token, usertype: res.usertype, moduleList: [], authenticate: 'YES'
              // }
              this.loadSave = true;
              localStorage.setItem("access_token", res.token);
              localStorage.setItem("usertype", res.usertype);

              localStorage.setItem("authenticate", "YES");
              this.commonService.getCurrentUserDetail();

                this.commonService.getLoggedInName.pipe(take(1)).subscribe((userdetail: any) =>
                {
                  //this.loadSave = true;
                  debugger;

                    this.moduleService.getRoleModuleList(false).pipe(take(1)).subscribe((m: any) => {
                    localStorage.removeItem('moduleList');
                    localStorage.setItem('moduleList', m);
                    localStorage.setItem('isFromSuperAdmin', 'true');

                    history.go(0);
                      //obj.moduleList = m;

                    // if ( res.usertype === 'usertypecontact') {
                    //   const url = this.router.serializeUrl(

                    //     this.router.createUrlTree(['/dashboard']))

                    //     history.go(0);
                    //     //var newCreatedWindow = window.open(url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
                    //     //newCreatedWindow.localStorage.setItem('UserLoginInfo',obj)
                    // }else if ( res.usertype === 'usertypesuperadmin'){
                    //   window.location.href = "super-admin-dashboard";
                    // }
                    // else {
                    //   const url = this.router.serializeUrl(
                    //     this.router.createUrlTree(['/dashboard'])
                    //     );

                    //     //var newCreatedWindow = window.open(url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
                    //     //newCreatedWindow.localStorage.setItem('UserLoginInfo',JSON.stringify(obj))
                    // }

                    // setTimeout(() => {
                    //   this.loadSave = false;
                    // }, 2000);
                  });
                });



            // var user = JSON.parse(localStorage.getItem('loginUsersArray')).find(x=>x.emailId == obj.emailId);
            // if(user==undefined || user== null){
            //   this.loginUsersArray.push(obj);
            //   localStorage.removeItem('loginUsersArray');
            //   localStorage.setItem('loginUsersArray', JSON.stringify(this.loginUsersArray));

            // }


            }
            else if (res.status == 204) {
              window.location.href = "account/multipleuserlogin?UserId=" + res.userId;
            }
            else if (res.status == 201) {//deleted/inactive user
              this.loadSave = false;
              this.toaster.error(res.token);
            }

            else if (res.status == 501) {
              this.loadSave = false;
              this.toaster.error("Your Account is Blocked for 30 minutes because you have entered wrong username/password");
            }
           }


          })
        }


      });
         }
         else if (res1.status == 201) {//deleted/inactive user
          this.loadSave = false;
          this.toaster.error(res1.token);
        }
        else if (res1.status == 501) {
          this.loadSave = false;
          this.toaster.error("Your Account is Blocked for 30 minutes because you have entered wrong username/password");
        }
         
         
      });
      
      
    }

  }

  class LoginUser {
   public emailId:any;
   public access_token: any;
   public usertype: any;
   public moduleList: any;
   public authenticate: any;
   public connectionID: any;
   public isSuperAdmin: any;
  }



//   onDeleteMultipleAdSets() {
//
//     if (this.deleteId) {
//       // const message = `Are you sure you want to delete all the selected Subscription(s) ?`;
//       // this.dialogService.confirm('DELETE SUBSCRIPTION(S)', message).subscribe((confirmed) => {
//       //   if (confirmed) {
//       //     this.loadSave = true;
//       //     this.fbMarketingService.deleteselectedAdset(this.deleteId).subscribe(
//       //       (result) => {
//       //         this.loadSave = false;
//       //         this.toaster.success(result.responseMessage);
//       //         this.deleteId = '';
//       //         this.selected = [];
//       //         this.refresh();
//       //       },
//       //       (error) => { },
//       //       () => {
//       //         this.loadSave = false;
//       //       }
//       //     );
//       //   }
//       // });
//     } else {
//       this.toaster.error('Please select at least one row.');
//     }
//   }


// }
