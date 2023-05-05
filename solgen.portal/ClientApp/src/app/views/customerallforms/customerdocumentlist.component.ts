import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ContactService } from '../contact/contact.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-customerdocumentlist',
  templateUrl: './customerdocumentlist.component.html',
  styleUrls: ['./customerdocumentlist.component.scss']
})
export class CustomerdocumentlistComponent implements OnInit {
  isLoading = false;
  loadSave = false;
  contactId: any;
  LeaseNum: any;
  //IsUserValid = true;
  isCustomerAllForms = true;
  constructor(private commonService: CommonService
    , private contactService: ContactService
    , private route: ActivatedRoute
    , private dialogService: ConfirmationDialogService
    , private router: Router
    , private toaster: ToastrService) {
    
  }

  ngOnInit() {
  }

}
