import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, UserDetails } from 'src/app/views/shared/common.service';
import { ModulesService, ModuleModel } from 'src/app/views/managemodules/modules.service';
import { parse } from '@fullcalendar/core/datelib/parsing';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../views/shared/user.service';
import { AppComponent } from '../../app.component';
import { ConfirmationDialogService } from '../../views/shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { exit } from 'process';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  loadSave = false;
  moduleList: ModuleModel[];
  userId: any;
  companyLogo: string;
  accountid: number;
  ngStyle: any;
  lstheadercompany: any;
  headeruserid: any;
  menulist: any;
  menulistchld: any[] = [];
  menulistchldfb: any[] = [];
  isSwitchCompany: boolean = false;
  urldata: any;
  url: string = "";
  sitetitle: string = '';
  @Input() userType: string;
  constructor(private commonService: CommonService,
    private moduleService: ModulesService, private router: Router, private titleService: Title, private userService: UserService, private app: AppComponent,
    private routerService: Router, private toaster: ToastrService, private dialogService: ConfirmationDialogService) {




  }

  ngOnInit() {
    this.url = window.location.href;
    this.GeHeaderCompanyList();
    this.url = this.url.slice(9, 19);
    this.userService.GetSiteURl(this.url).subscribe((result: any) => {
      this.urldata = JSON.parse(result);
      if (result != null) {


        //// console.log('urldata', this.urldata)
        this.setTitle(this.urldata[0].SiteTitle);
      }
      else {
        this.sitetitle = 'SolgenOne'
        this.setTitle(this.sitetitle);
      }
    })
    this.commonService.getLoggedInName.subscribe((user: any) => {


      this.accountid = user.accountId;
      this.sidebarSetup(user);
      this.getRoleModuleList();
      // this.getRoleModuleList();
    });
  }
  getRoleModuleList() {
    this.menulistchld = [];
    this.moduleService.getRoleModuleList(true).subscribe((result: any) => {
    
      this.menulist = JSON.parse(result);
      this.menulist.forEach(menu => {
          if(menu.module_name == "Dashboard" && this.userType == "Super Admin")
          {  
            //debugger
            menu.module_route = "/super-admin-dashboard";
            exit;
          }
      })
      if (typeof this.menulist[0].companylogo != 'undefined') {
        this.companyLogo = this.menulist[0].companylogo.replace("UserProfilePick", "UserProfilePick\\");;
      }
      ;
      if(this.companyLogo=="" || this.companyLogo=="undefined" || this.companyLogo==null)
      {
        this.companyLogo = "../../../assets/default-theme/imagesNew/zolar-logo.png";
      }
      let documentModule = this.menulist.find(m => m.module_route == "managedocument");
      if (documentModule) {
        this.menulistchld = documentModule.subModule;
        this.menulistchld = this.menulistchld.map(x => {
          x.sortorder = x.sub_module_name_code == "documentmapping" ? 3 : x.sub_module_name_code == "routerule" ? 2 :x.sub_module_name_code == "documentmaker"? 1 : 4;
          return x;
        }).sort((a, b) => {
          if (a.sortorder < b.sortorder) {
            return -1;
          }
          if (a.sortorder > b.sortorder) {
            return 1;
          }
          return 0;
        })
        this.menulist.filter(m => m.module_route == "managedocument")[0].subModule = this.menulistchld;
        // console.log('All Menu List');
        // console.log(this.menulist);
      }
      let fbModule = this.menulist.find(m => m.module_route == "facebook");
      if (fbModule) {
        this.menulistchldfb = fbModule.subModule;
        this.menulistchldfb = this.menulistchldfb.map(x => {
          x.sortorder = x.sub_module_name_code == "facebookad" ? 1 : x.sub_module_name_code == "facebookcampaign" ? 3 :x.sub_module_name_code == "facebookadset"? 2 : 4;
          return x;
        }).sort((a, b) => {
          if (a.sortorder < b.sortorder) {
            return -1;
          }
          if (a.sortorder > b.sortorder) {
            return 1;
          }
          return 0;
        })
        this.menulist.filter(m => m.module_route == "facebook")[0].subModule = this.menulistchldfb;
      }

    });
  }
  setTitle(newTitle: string) {

    this.titleService.setTitle(newTitle);
  }
  GeHeaderCompanyList() {
    this.commonService.GeHeaderCompanyList(this.headeruserid).subscribe((data: any) => {
      this.lstheadercompany = data;

      if (this.lstheadercompany.length > 1) {
        this.isSwitchCompany = true

      }
    })
  }

  SignOut() {
    //;
    //this.commonService.logout();
    //let isLogout = this.commonService.isLogout;

    //if (isLogout) {
    //  this.app.ShowDialer({ visible: false });
    //}


    const message = `Are you sure you want to "sign out"?`;
    this.dialogService.confirm('Sign out', message).subscribe(confirmed => {
      if (confirmed) {
        this.app.ShowDialer({ visible: false });
        this.commonService.GetServiceGetFileList("logout").subscribe(m => { });
        localStorage.removeItem("access_token");
        localStorage.removeItem("usertype");
        localStorage.removeItem("moduleList");
        localStorage.removeItem("userinfo");

        this.commonService.LoginUser = new UserDetails();
        this.routerService.navigateByUrl("/account");
        this.toaster.success(`You are signed out successfully`);
        this.commonService.removeUserConnections().subscribe(m => { });
      }
      else {
      }
    });


  }

  sidebarSetup(user: any) {
    this.loadSave = true;
    this.userId = user.id;
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.id != null) {
        this.userId = userdetail.id
      }
    });
    if (typeof this.userId !== "undefined" && typeof this.userId !== null) {
      this.moduleService.getModuleList(this.userId).subscribe((response: any) => {
        if (response) {
          ;
          this.moduleList = response;
          // this.companyLogo = response[0].companyLogo.replace("UserProfilePick", "UserProfilePick\\");;
          // if(this.companyLogo=="" || this.companyLogo=="undefined" || this.companyLogo==null)
          // {
            this.companyLogo = "../../../assets/default-theme/imagesNew/zolar-logo.png";
          //}

          this.loadSave = false;
        }
        else {
          this.moduleList = [];
        }
      }, error => {
        this.loadSave = false;
      });
    }


  }

  link(path: any) {
    ;
    var ViewPortwidth = window.screen.availWidth;
    if (ViewPortwidth < 1367 && ViewPortwidth > 1024) {
      document.getElementById('htmlbody').removeAttribute("class");
      document.getElementById('htmlbody').setAttribute("class", "fixed-topbar fixed-sidebar theme-sdtl color-default dashboard sidebar-collapsed");
    }
    if (path == '/accountslist/viewaccount/##accountid##') {
      this.router.navigate(['/accountslist/viewaccount/', this.accountid]);

    }
    else {
      this.router.navigateByUrl(path);
    }


    //$('.topbar').css({ width: ViewPortwidth });
    // $('body').addClass('sidebar-collapsed');


  }

}
