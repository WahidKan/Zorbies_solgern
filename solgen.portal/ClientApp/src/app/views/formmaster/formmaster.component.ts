import { Component, OnInit } from '@angular/core';
import { FormmasterService, tblformMasterModel } from './formmaster.service';
import { CommonService } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formmaster',
  templateUrl: './formmaster.component.html',
  styleUrls: ['./formmaster.component.scss']
})
export class FormmasterComponent implements OnInit {
  lstproductType: any;
  loginuserid: any;
  masterForm: FormGroup;
  loading = false;
  pageTitle: string;
  master: tblformMasterModel = new tblformMasterModel();
  selectedTexts: any = [];
  loadSave: boolean = false;
  id;
  isDisabled;

  constructor(private formmasterService: FormmasterService, private fb: FormBuilder,
    private commonService: CommonService, private router: Router,
    private dialogService: ConfirmationDialogService, private route: ActivatedRoute,
    private toaster: ToastrService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });

  }

  ngOnInit() {
   
    this.initForm();
    this.getproductDropDown();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loading = true;
        this.fillForm(id);
      } else {
        this.pageTitle = 'Add Form Master';
      }
     
    });
  }

  displayMaster(master: tblformMasterModel): void {
    this.master = master;
    // // console.log("this.master", this.master);
    this.pageTitle = 'Edit Form Master: ' + this.master.name;
    this.selectedTexts = [];
    
    //let arr = [];
    //arr = this.master.loanproductsids;

    this.selectedTexts = this.master.loanproductsids.split(',');

    // // console.log("this.loanproductsids", this.selectedTexts);
  

    // // console.log("utyr", this.selectedTexts)

    this.masterForm.patchValue({
      form_master_id: this.master.form_master_id,
      name: this.master.name,
      description: this.master.description,
      createdby: this.loginuserid,
      loanproductids: this.selectedTexts
    
    });
  }
  fillForm(id: string) {
    this.formmasterService.getFormMasterById(id)
      .subscribe(
        (master: tblformMasterModel) => {
          this.displayMaster(master);
          this.loading = false;
        },
        (error: any) => {
          this.loading = false;
        });
  }


  getproductDropDown() {
    this.formmasterService.getproductDropDown().subscribe((response: any) => {
      this.lstproductType = (response);

      // // console.log("this.lstproductType", this.lstproductType);
    });
  }

 

  save() {
    if (this.masterForm.valid) {
      this.loading = true;
      this.formmasterService.addOrUpdateFormData(this.masterForm.value).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.loading = false;
          this.toaster.success(result.responseMessage);
          this.router.navigate(["/formmaster"]);
        }
        else {
          this.loading = false;
          this.toaster.error(result.responseMessage);

        }
        // // console.log('MasterForm', result);
      }, error => {
        this.loading = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.masterForm);
    }
  }


  private initForm() {
    this.masterForm = this.fb.group({
      form_master_id: [null],
      loanproductids: [null, Validators.required],
      name: ['', Validators.required],
    
      description: ['', Validators.nullValidator],
     
    });
  }

  get form_master_id() { return this.masterForm.get('form_master_id'); }
  get name() { return this.masterForm.get('name'); }
  get description() { return this.masterForm.get('description');

  }
  get loanproductids() { return this.masterForm.get('loanproductids'); }
  
}
