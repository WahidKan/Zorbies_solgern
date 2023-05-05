import { Component, OnInit, Input } from '@angular/core';
import { LoanapplicationserviceService, ExpenseIncomeModel, ExpenseDebtModel } from '../loanapplicationservice.service';
import { CommonService } from '../../shared/common.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expanses',
  templateUrl: './expanses.component.html',
  styleUrls: ['./expanses.component.scss']
})
export class ExpansesComponent implements OnInit {

  @Input('loanApplicationId') loanApplicationId: any;
  @Input('HasCoApplicant') HasCoApplicant: any;
  incomeForm: FormGroup;
  debtForm: FormGroup;
  data: any;
  sortDir = 'desc';
  sortColumn = 'createdon';
  pagedData: any = {
    pager: {},
    data: []
  };
  loadSave: boolean = false;
  isflag = false;
  currentPage: any;
  lstPageSize: any
  pageSizeValue: number;
  loanId: any;
  debtData: any;
  incomeData: any;
  ratiosData: any;
  usertype: string;
  showEditIncomeTabs = false;
  showEditDebtTabs = false;
  @Input('IsLACanceledFlag') IsLACanceledFlag: any;
  expenseIncomeModel: ExpenseIncomeModel = new ExpenseIncomeModel();
  expenseDebtModel: ExpenseDebtModel = new ExpenseDebtModel();
  constructor(private loanapplicationservice: LoanapplicationserviceService,
    private commonService: CommonService,
    private route: ActivatedRoute, private fb: FormBuilder,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.usertype = localStorage.getItem("usertype");
    if (this.usertype.toLocaleLowerCase() != 'usertypebanker') {
      this.isflag = true;
    }
    if (this.IsLACanceledFlag) {
      this.isflag = false;
    }
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.loanId = id;
      });
    this.initForm();
    this.initdebtForm();
    this.getExpenseIncome();
    this.pageSizeValue = 10;
    this.currentPage = 0;
    this.getPageSizes();
    this.refresh();

  }
  OnKeyUp() {

  }
  getExpenseIncome() {
    this.loanapplicationservice.GetExpensesIncomeDetail(this.loanId).subscribe((resp: any) => {
      this.incomeData = this.loanapplicationservice.incomeDetail;;
      //// console.log('incomeData', this.incomeData)

      while (this.incomes.length != 0) {
        this.incomes.removeAt(0);
      }
      let TotalIncomeApplicant
        : number=0;
      let TotalIncomeCoApplicant: number=0;
      let TotalIncomeAmount: number=0;
      this.incomeData.forEach(m => {
        let income = this.fb.group({
          incomeType: [m.Type],
          incomeApplicant: [m.Income_Applicant, Validators.nullValidator],
          incomeCoApplicant: [m.Income_CoApplicant, Validators.nullValidator],
          incomeApplication: [m.Income_Application, Validators.nullValidator],
          incomeExpenseTypeId: [m.ExpenseTypeId, Validators.nullValidator],
          incomeTypeId: [m.TypeId, Validators.nullValidator],
          incomeapplicationId: [this.loanId, Validators.nullValidator],
          'incomeTotal': []
        });
       
        //if (isNaN(m.Income_Applicant) == false) {
        //  TotalIncomeAmount += parseInt(m.Income_Applicant);
        //}
        //if (isNaN(m.Income_CoApplicant) == false) {
        //  TotalIncomeAmount += parseInt(m.Income_CoApplicant);
        //}
        //income.controls['incomeApplicant'].valueChanges.subscribe(s => {
        //  //let incomeCoApplicant: number = parseInt(income.value.incomeCoApplicant);
        //  //let incomeApplicant: number = parseInt(s)
        //  let total: number = 0;
        // // if (!isNaN(incomeCoApplicant)) {

  
        // //   total = total + incomeCoApplicant;

        // // }
        // //if( !isNaN(incomeApplicant)) {
          
        
        // //  total = total + incomeApplicant;
        // // }
        //  income.patchValue(
        //    {
        //      'incomeTotal': [total]

        //    })
        //});
        //income.controls['incomeCoApplicant'].valueChanges.subscribe(s => {
        //  let   incomeApplicant: number = parseInt(income.value.incomeApplicant);
        //  let incomeCoApplicant: number = parseInt(s)
        //  let total: number = 0;
        //  if (!isNaN(incomeCoApplicant)) {


        //    total = total + incomeCoApplicant;

        //  }
        //  if (!isNaN(incomeApplicant)) {


        //    total = total + incomeApplicant;
        //  }
        //  income.patchValue(
        //    {
        //      'incomeTotal': [total]

        //    })
        //});



        income.patchValue(
          {
            'incomeApplicant': [(income.value.incomeApplicant).toFixed(2)],
            'incomeCoApplicant': [(income.value.incomeCoApplicant).toFixed(2)],
            'incomeTotal': [(income.value.incomeCoApplicant + income.value.incomeApplicant).toFixed(2)],
          })

        TotalIncomeAmount = TotalIncomeAmount + income.value.incomeTotal;
        TotalIncomeCoApplicant = TotalIncomeCoApplicant + income.value.incomeCoApplicant;
        TotalIncomeApplicant = TotalIncomeApplicant + income.value.incomeApplicant;

        //income.patchValue(
        //  {
        //    'incomeTotal': [parseInt(income.value.incomeCoApplicant) + parseInt(income.value.incomeApplicant)]

        //  })

      
        //TotalIncomeAmount = TotalIncomeAmount + (parseInt(income.value.incomeTotal));
 
        //TotalIncomeCoApplicant = TotalIncomeCoApplicant + parseInt(income.value.incomeCoApplicant);
        //TotalIncomeApplicant = TotalIncomeApplicant + parseInt( income.value.incomeApplicant);
        this.incomes.push(income);
      });
      this.TotalIncomeAmount = TotalIncomeAmount;
      this.TotalIncomeCoApplicant = TotalIncomeCoApplicant;
      this.TotalIncomeApplicant = TotalIncomeApplicant
    });
  }
  keyup() {
    //// console.log('key pressed');
  }

  debt() {
    this.loanapplicationservice.GetExpensesDebtDetail(this.loanId).subscribe((resp: any) => {
      this.debtData = this.loanapplicationservice.debtDetail;;
      //// console.log('debtData', this.debtData)
      while (this.debits.length != 0) {
        this.debits.removeAt(0);
      }
      let TotalApplicant: number = 0;
      let TotalCoApplicant: number = 0;
      let FinalTotal: number = 0;
      this.debtData.forEach(m => {
      
        let debit = this.fb.group({
          debtType: [m.Type],
          debtApplicant: [m.Debt_Applicant, Validators.nullValidator],
          debtCoApplicant: [m.Debt_CoApplicant, Validators.nullValidator],
          debtApplication: [m.Debt_Application, Validators.nullValidator],
          debtExpenseTypeId: [m.ExpenseTypeId, Validators.nullValidator],
          debtTypeId: [m.TypeId, Validators.nullValidator],
          debtapplicationId: [this.loanId, Validators.nullValidator],
          'debitTotal': []
        });
        //debit.controls['debtCoApplicant'].valueChanges.subscribe(s => {
        //  let debtApplicant: number = parseInt(debit.value.debtApplicant);
        //  let debtCoApplicant: number = parseInt(s)
        //  let total: number = 0;
        //  if (!isNaN(debtApplicant)) {


        //    total = total + debtApplicant;

        //  }
        //  if (!isNaN(debtCoApplicant)) {


        //    total = total + debtCoApplicant;
        //  }
        //  debit.patchValue(
        //    {
        //      'debitTotal': [total]

        //    })
        //});

        //debit.controls['debtApplicant'].valueChanges.subscribe(s => {
        //  let debtApplicant: number = parseInt(s);
        //  let debtCoApplicant: number = parseInt(debit.value.debtCoApplicant)
        //  let total: number = 0;
        //  if (!isNaN(debtApplicant)) {


        //    total = total + debtApplicant;

        //  }
        //  if (!isNaN(debtCoApplicant)) {


        //    total = total + debtCoApplicant;
        //  }
        //  debit.patchValue(
        //    {
        //      'debitTotal': [total]

        //    })
        //});
       
        debit.patchValue(
          {
            'debtApplicant': [(debit.value.debtApplicant).toFixed(2)],
            'debtCoApplicant': [(debit.value.debtCoApplicant).toFixed(2)],
            'debitTotal': [(debit.value.debtApplicant + debit.value.debtCoApplicant).toFixed(2)]

          })

        TotalApplicant = TotalApplicant + parseInt(debit.value.debtApplicant);
        TotalCoApplicant = TotalCoApplicant + parseInt(debit.value.debtCoApplicant);
        FinalTotal = FinalTotal + parseInt(debit.value.debitTotal);
        this.debits.push(debit);
      });
      this.TotalDebitApplicant = TotalApplicant;
      this.TotalDebitCoApplicant = TotalCoApplicant;
      this.TotalDebitAmount = FinalTotal;

    });
 
  }

  ratios() {
    this.loanapplicationservice.GetExpensesRatiosDetail(this.loanId).subscribe((resp: any) => {
      this.ratiosData = this.loanapplicationservice.ratioDetail;
      //// console.log('ratiosData', this.ratiosData)
    });
  }

  editIncome() {
    this.showEditIncomeTabs = true;
  }
  backIncome() {
    this.showEditIncomeTabs = false;
  }
  editDebt() {
    this.showEditDebtTabs = true;
  }
  backDebt() {
    this.showEditDebtTabs = false;
  }
 

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  setPage($event) {

    this.currentPage = $event.page - 1;
    this.refresh();
  }
  onSort($event) {
    const sort = $event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = $event.page - 1;
    this.refresh();;
  }

  refresh() {
    this.loanapplicationservice.getCreditBureauHistory(this.loanApplicationId, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe((resp: any) => {     
      this.pagedData = resp;
      this.pagedData.data.forEach(item => {
        item.Balance = '$' + item.Balance;
        item.Amount = '$' + item.Amount;
        item.AdjAmount = '$' + item.AdjAmount;
      });
      
    });
  }

  addUpdateExpenseIncome() {
    this.expenseIncomeModel.fieldsData = JSON.stringify(this.incomeForm.value);

    this.loanapplicationservice.addUpdateExpenseIncome(this.expenseIncomeModel).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        //setTimeout(() => { this.loadSave = false; }, 2000);
      }
      else {
       // this.loadSave = false;
        this.toaster.error(result.responseMessage);
      }
    }, error => {
     // this.loadSave = false;
    });
   
  }
  addDebt() {
    this.expenseDebtModel.fieldsData = JSON.stringify(this.debtForm.value);

    this.loanapplicationservice.addUpdateExpenseDebt(this.expenseDebtModel).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.debt();
        this.showEditDebtTabs = false;

        //setTimeout(() => { this.loadSave = false; }, 2000);
      }
      else {
        // this.loadSave = false;
        this.toaster.error(result.responseMessage);
      }
    }, error => {
      // this.loadSave = false;
    });
  }

  private initForm() {
    this.incomeForm = this.fb.group({
      incomes: this.fb.array([])
    });
  }
  private initdebtForm() {
    this.debtForm = this.fb.group({
      debits: this.fb.array([])
    });
  }

  get debits() {
    return this.debtForm.get('debits') as FormArray;
  }


  get incomes() {
    return this.incomeForm.get('incomes') as FormArray;
  }

  get incomeApplicant() { return this.incomeForm.get('incomeApplicant'); }
  get incomeCoApplicant() { return this.incomeForm.get('incomeCoApplicant'); }
  get incomeApplication() { return this.incomeForm.get('incomeApplication'); }
  get incomeExpenseTypeId() { return this.incomeForm.get('incomeExpenseTypeId'); }
  get incomeTypeId() { return this.incomeForm.get('incomeTypeId'); }
  get incomeapplicationId() { return this.incomeForm.get('incomeapplicationId'); }

  get debtApplicant() { return this.debtForm.get('debtApplicant'); }
  get debtCoApplicant() { return this.debtForm.get('debtCoApplicant'); }
  get debtApplication() { return this.debtForm.get('debtApplication'); }
  get debtExpenseTypeId() { return this.incomeForm.get('debtExpenseTypeId'); }
  get debtTypeId() { return this.incomeForm.get('debtTypeId'); }
  get debtapplicationId() { return this.incomeForm.get('debtapplicationId'); }
  TotalDebitApplicant: number;
  TotalDebitCoApplicant: number;
  TotalDebitAmount: number;
  TotalIncomeApplicant: number;
  TotalIncomeCoApplicant: number;
  TotalIncomeAmount: number;
}
