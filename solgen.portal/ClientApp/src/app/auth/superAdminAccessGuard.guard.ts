import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ModuleList, CommonService } from '../views/shared/common.service';
import { CommonTokenExpireService } from '../views/shared/confirmation-tokenexpire/common-token-expire.service';

@Injectable({
  providedIn: 'root'
})

export class SuperAdminAccessGuard implements CanActivate {
  modulePermission: ModuleList;
  userType: any;
  constructor(private modalService: CommonTokenExpireService,private router: Router, private commonService: CommonService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
      debugger;
       this.userType =localStorage.getItem('userType');
    if(this.userType==null){
       this.userType =localStorage.getItem('usertype');
    }
    if(this.userType !== "usertypesuperadmin")
    {
      this.router.navigate(['/dashboard']);
    }
    else
    {
      if (localStorage.getItem("access_token") != null) {

        let moduleCode = next.data.moduleCode;
        let windowWidth = window.innerWidth;
        if (windowWidth < 1367 && windowWidth > 1024) {
          setTimeout(function () {
            document.getElementById('htmlbody').classList.add("sidebar-collapsed");
          }, 100);
        }
        this.commonService.SaveActivityLogsAuthGuard(moduleCode, this.router.url, next);

        if (moduleCode != '' && typeof (moduleCode) === 'undefined' && moduleCode != null) {
          this.modulePermission = this.commonService.getPermission(moduleCode);
          if (typeof this.modulePermission === 'undefined' || this.modulePermission === null) {
            this.router.navigate(['/dashboard']);
            return false;
          }
          if (this.modulePermission.roleModuleReadFlag == false) {
            this.router.navigate(['/dashboard']);
            return false;
          }
        }
        return true;
      }
      else {
        this.router.navigate(['/account']);
        return false;
      }
    }
  }
}
