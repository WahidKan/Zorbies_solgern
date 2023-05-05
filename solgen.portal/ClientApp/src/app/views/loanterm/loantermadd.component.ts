import { Component, OnInit } from '@angular/core';
import { LoantermserviceService, LoanTermModel } from './loantermservice.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-loantermadd',
  templateUrl: './loantermadd.component.html',
  styleUrls: ['./loantermadd.component.scss']
})
export class LoantermaddComponent implements OnInit {
  listbank: any;
  bankid: any;
  loadSave: boolean = false;
  pageTitle: any;
  loanmodel: LoanTermModel = new LoanTermModel();

  constructor(private loantermservice: LoantermserviceService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.bankid = id;
        if (id) {        
          this.pageTitle = 'Edit LoanTerm';
          this.loadSave = true;
          this.fillform();
        }
        else {
          this.pageTitle = 'Add LoanTerm';
          

        }
      }
    );
    this.GetBankDll();
  }
  Cancel() {
    this.router.navigateByUrl("/loanTerm");
  }
  GetBankDll() {
    this.loantermservice.GetBankDll().subscribe((result: any) => {
      this.listbank = result;
    })
  }

  fillform() {
    
    this.loantermservice.GetLoanTermById(this.bankid).subscribe((result: any) => {
      // // console.log(result);
        this.pageTitle = 'Edit loan Term: ' /*+ result.firstName + ' ' + result.lastName;*/
        this.loadSave = false;
      this.addForm .patchValue({
          id: result.id,
        apr: result.apr,
        code: result.code,
        dealerFee: result.dealerFee,
        loanDescription: result.description,
        lenderId: result.lenderID.toString(),
        term: result.term,
          
        });
        
      },
    
      (error: any) => {
        this.loadSave = false;
      })
  
  }
  addeditLoanTerm() {
    if (this.addForm.valid) {
      this.loadSave = true;
      this.loanmodel.id = this.addForm.value.id;
      this.loanmodel.Apr = this.addForm.value.apr;
      this.loanmodel.Code = this.addForm.value.code;
      this.loanmodel.DealerFee = this.addForm.value.dealerFee;
      this.loanmodel.Description = this.addForm.value.loanDescription;
      this.loanmodel.LenderID = this.addForm.value.lenderId;
      this.loanmodel.Term = this.addForm.value.term;
    


      this.loantermservice.addeditLoanTerm(this.loanmodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.router.navigate(["/loanTerm"]);
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }

  }


  addForm = this.fb.group({
    lenderId: [null],
    term: ['', Validators.required],
    apr: ['', Validators.required],
    dealerFee: ['', [Validators.required]],
    loanDescription: [''],
    code: [''],
    id: [null],
    
  })

  get lenderId() { return this.addForm.get('lenderId'); }
  get term() { return this.addForm.get('term'); }
  get apr() { return this.addForm.get('apr'); }
  get dealerFee() { return this.addForm.get('dealerFee'); }
  get code() { return this.addForm.get('code'); }
  get loanDescription() { return this.addForm.get('loanDescription'); }
}
