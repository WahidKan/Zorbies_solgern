import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-loanapplicationpopup',
  templateUrl: './loanapplicationpopup.component.html',
  styleUrls: ['./loanapplicationpopup.component.scss']
})
export class LoanapplicationpopupComponent implements OnInit {
  @ViewChild('loanapplicationpopupModal', { static: false }) modalLoanApplication: ModalDirective;
  active = false; loadSave: boolean = false;

  constructor( private toaster: ToastrService,
    private router: Router, private dialogService: ConfirmationDialogService) { }

  ngOnInit() {
  }

  close() {
    this.active = false;
    this.modalLoanApplication.hide();
  }

  show() {
    this.modalLoanApplication.show();
    this.active = true;
  }
}
