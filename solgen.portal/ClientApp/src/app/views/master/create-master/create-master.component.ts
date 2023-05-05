import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterNames, MasterService, Masters, tblMasterModel } from '../master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
@Component({
  templateUrl: './create-master.component.html',

})
export class CreateMasterComponent implements OnInit, OnDestroy {
  masterForm: FormGroup;
  lstStatus: any;
  loading = false;
  id = "";
  masters: MasterNames[] = [];
  statuses: any;
  masterdata: any
  isDisabled: any;
  pageTitle: string;
  master: tblMasterModel = new tblMasterModel();
  loadSave: boolean = false;

  constructor(private fb: FormBuilder,
    private masterService: MasterService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isDisabled = null;
    this.getMasterNameList();
    this.getStatuses();
    this.getMasterDropDown();
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loading = true;
        this.fillForm(id);
      } else {
        this.pageTitle = 'Add Master';
      }
    });
  }

  fillForm(id: string) {
    this.masterService.getMasterById(id)
      .subscribe(
        (master: tblMasterModel) => {
          this.displayMaster(master);
          this.loading = false;
        },
      (error: any) => {
      this.loading = false;
        });
  }

  displayMaster(master: tblMasterModel): void {
    this.master = master;
    this.isDisabled = true;
    this.pageTitle = 'Edit Master: ' + this.master.masterValue;
    this.masterForm.patchValue({
      masterId: this.master.masterId,
      masterNameValue: this.master.masterNameValue,
      masterNameId: this.master.masterNameId,
      masterNames: this.master.masterNames,
      masterKey: this.master.masterKey,
      masterValue: this.master.masterValue,
      masterStatusId: this.master.masterStatusId,
      masterDescription: this.master.masterDescription,
    });
  }

  ngOnDestroy(): void {

  }

  private initForm() {
    this.masterForm = this.fb.group({
      masterId: [null],
      masterNameId: [null, Validators.required],
      masterKey: ['', Validators.required],
      masterValue: ['', Validators.required],
      masterStatusId: [null, Validators.required],
      masterDescription: ['', Validators.nullValidator]
    });
  }

  get masterNameId() { return this.masterForm.get('masterNameId'); }
  get masterKey() { return this.masterForm.get('masterKey'); }
  get masterValue() { return this.masterForm.get('masterValue'); }
  get masterStatusId() { return this.masterForm.get('masterStatusId'); }
  get masterDescription() { return this.masterForm.get('masterDescription'); }
  get masterId() { return this.masterForm.get('masterId'); }

  getMasterNameList() {
    this.masterService.getNames().subscribe((result: any) => {
      this.masters = result;
    });
  }

  getStatuses() {
    this.commonService.getMasterItemsList("Status").subscribe((response: any) => {
      this.statuses = this.commonService.masters;
    });
  }


  getMasterDropDown() {
    this.masterService.getMasterDropDown().subscribe((response: any) => {
      this.masterdata = response;
    });
  }

  close() {
    this.router.navigate(['/master']);
  }
  save() {
    if (this.masterForm.valid) {
      this.loading = true;
      if (this.id) {
        this.master.masterId = this.id;
     
      }
      else {
        this.master.masterId = this.masterForm.value.masterId;
      }
      this.master.masterNameId = this.masterForm.value.masterNameId;
      this.master.masterKey = this.masterForm.value.masterKey;
      this.master.masterValue = this.masterForm.value.masterValue;
      this.master.masterStatusId = this.masterForm.value.masterStatusId;
      this.master.masterIsDeleted = false;
      this.master.masterDescription = this.masterForm.value.masterDescription; 
      this.masterService.AddManageMaster(this.master).subscribe((result: any) => {
        if (result.statusCode == 200) {       
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/master");
          setTimeout(() => { this.loading = false; }, 5000);
        }
        else {
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loading = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.masterForm);
    }
  }
}
