import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CommonService, ModuleList } from '../../shared/common.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerHeaderComponent implements OnInit {

  userType: any;
  username: any;
  usercompanyLogo: any;
  headerData: any; 
  loadSave: boolean = false;
  private app: AppComponent
  headeruserid: any;
  modulePermission: ModuleList;
  imageLink = '../../assets/images/default-user-icon.jpg';

  constructor(private commonService: CommonService) { }

  ngOnInit() {
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


  onLogoError(event){
    event.target.src = 'assets/images/logo.png'
   //Do other stuff with the event.target
   }
  
   onUserError(event){
    event.target.src = 'assets/images/default-user-icon.jpg'
   //Do other stuff with the event.target
   }
  
   headerSetup(user: any) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.userType = userdetail.userType;
      if (userdetail.id == null) {
        this.username = user.firstName + " " + user.lastName;
        this.usercompanyLogo = user.companyLogo;
      }
      else {
        this.username = userdetail.firstName + " " + userdetail.lastName;
        this.usercompanyLogo = user.companyLogo;
        this.imageLink = user.ProfilePic;
  
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
}
