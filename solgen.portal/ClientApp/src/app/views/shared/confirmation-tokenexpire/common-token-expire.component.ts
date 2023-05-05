import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  templateUrl: './common-token-expire.component.html'
})
export class CommonTokenExpireComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;

  constructor(private router: Router, private userService: UserService, public http: HttpClient, public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  close() {
    this.bsModalRef.hide();
  }

  logOutNow() {
    this.close();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/account']);
  }

  stayConnected() {
    const basicuserinfo = JSON.parse(localStorage.getItem('userinfo'));
    this.userService.refreshtoken(basicuserinfo.userName).subscribe((res: any) => {
      if (res) {
        if (res.status == 200) {
          localStorage.setItem("access_token", res.token);
          this.close();
          window.location.reload();
        }
      }
    });
  }
}
