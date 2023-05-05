import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { CalendarlistService } from '../../calendar/calendarlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loanapplicationpendingdocument',
  templateUrl: './loanapplicationpendingdocument.component.html',
  styleUrls: ['./loanapplicationpendingdocument.component.scss']
})
export class LoanapplicationpendingdocumentComponent implements OnInit {
  @ViewChild('pendingDoc', { static: false }) pendingDoc: ModalDirective;
  @Input('loanapnum') loanapnum: any;
  loanId: any;
  title: any;
  documents: any;
  loadSave: boolean = false;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private calenderService: CalendarlistService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    //this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
  }


  show(id, result) {
    
    this.title = "Pending Documents";
    this.loanId = id;
    this.documents = result;
    //// console.log("documents", this.documents);
    this.pendingDoc.show();
  }

  close() {
    this.pendingDoc.hide();
  }
  GoToApplications() {
    
   // this.router.navigateByUrl['/loanApplication/Detail/' + this.loanId]

    this.router.navigateByUrl("/loanApplication/Detail/" + this.loanId);
  }
}
