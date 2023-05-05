import { Component, OnInit, Input } from '@angular/core';
import { CommonService, UserDetails } from '../shared/common.service';

@Component({
  selector: 'app-dashboard-initializer',
  templateUrl: './dashboard-initializer.component.html'
})
export class DashboardInitializerComponent implements OnInit {
  @Input() user: UserDetails;
  userInfo: UserDetails = new UserDetails();
  constructor(public commonService: CommonService) {
    if (typeof this.commonService.LoginUser.id == "undefined" || this.commonService.LoginUser.id == null) {
      this.commonService.getLoggedInName.subscribe((user: any) => {
        debugger
        this.userInfo = this.commonService.LoginUser;
      });
    } else {
      this.userInfo = this.commonService.LoginUser;
    }
  }
  ngOnInit() {
  }
}
