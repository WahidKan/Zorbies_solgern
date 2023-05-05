import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { BankService } from '../../bank/bank.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-callandardetail',
  templateUrl: './callandardetail.component.html',
  styleUrls: ['./callandardetail.component.scss']
})
export class CallandardetailComponent implements OnInit {
  @ViewChild('callendarDetail', { static: false }) callendarDetail: ModalDirective;
  active = false;
  loadSave: boolean = false;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private bankService: BankService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    
  }

  ngOnInit() {
  }

  close() {
    this.active = false; 
    this.callendarDetail.hide();
  }
  Save() {
    this.callendarDetail.hide();
    this.router.navigateByUrl("/calendar");
  }
  show() {
    //this.refresh();
    this.callendarDetail.show();
    this.active = true;
  }

}
