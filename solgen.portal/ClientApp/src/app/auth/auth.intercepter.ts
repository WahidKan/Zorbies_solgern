import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonTokenExpireService } from "../views/shared/confirmation-tokenexpire/common-token-expire.service";
import { CommonService } from "../views/shared/common.service";

@Injectable()
export class AuthIntercepter implements HttpInterceptor {
  constructor(private router: Router, private modalService: CommonTokenExpireService, private commonservice: CommonService, private activeRoute: ActivatedRoute) {
    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  ///  // console.log("intercept activeRoute 1111", this.activeRoute.snapshot.data.moduleCode);
   // this.commonservice.SaveActivityLogs(req, this.router.url, this.activeRoute);
   
    if (localStorage.getItem("access_token") != null) {
      const clonedReq = req.clone({
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',//, no-store, must-revalidate, post-check=0, pre-check=0',
          'Pragma': 'no-cache',
          'Expires': '-1',
          'If-Modified-Since': '0',  
          'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        })
    
        
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => { },
          err => {
            if (err.status === 401) {
              localStorage.removeItem("access_token");
              localStorage.setItem("sadadss", "asdsadsa");
              this.router.navigateByUrl("/account");
              ////if (this.router.url != "/" && this.router.url != "/account") {
              ////  this.modalService.open("Session Timeout", "Your session is about to expire.");
              ////}
              ////else { this.router.navigateByUrl("/account"); }
            }
          }
        )
      )
    }
    else {
      this.modalService.close();
        return next.handle(req.clone());
    }
  }
}
