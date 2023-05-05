import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { id } from '@swimlane/ngx-datatable';
import { CommonService, ModuleList } from '../views/shared/common.service';
import { CommonTokenExpireService } from '../views/shared/confirmation-tokenexpire/common-token-expire.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  modulePermission: any;
  constructor(private modalService: CommonTokenExpireService,private router: Router, private commonService: CommonService) {
  
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
      if (localStorage.getItem("access_token") != null) {
        let userType =  localStorage.getItem("usertype");
        let moduleCode = next.data.moduleCode;
        let windowWidth = window.innerWidth;
        if (windowWidth < 1367 && windowWidth > 1024) {
          setTimeout(function () {          
            document.getElementById('htmlbody').classList.add("sidebar-collapsed");         
          }, 100);
        }
        this.commonService.SaveActivityLogsAuthGuard(moduleCode, this.router.url, next);
        if (moduleCode != '' && typeof (moduleCode) != 'undefined' && moduleCode != null && moduleCode != "1" && moduleCode != "01101" && moduleCode != "0000001" && moduleCode != "3006") {
          this.modulePermission = this.commonService.getPermission(moduleCode);
          if (this.modulePermission == 'null' || this.modulePermission == null) {
            if(userType !== "usertypesuperadmin"){
              this.router.navigate(['/dashboard']);
            }
            else{
              this.router.navigate(['/super-admin-dashboard'])
            }
            return false;
          }
          if (this.modulePermission.roleModuleReadFlag == false) {
            if(userType !== "usertypesuperadmin"){
              this.router.navigate(['/dashboard']);
            }
            else{
              this.router.navigate(['/super-admin-dashboard'])
            }
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
