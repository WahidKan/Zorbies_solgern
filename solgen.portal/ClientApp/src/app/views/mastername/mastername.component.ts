import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterNames } from '../master/master.service';
import { MasterName, MasternameService } from './mastername.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-mastername',
  templateUrl: './mastername.component.html',
  styleUrls: ['./mastername.component.scss']
})
export class MasternameComponent implements OnInit {
  masterNameForm: FormGroup;
  id = "";
  mastername: MasterName = new MasterName();
  isDisabled;
  constructor(private fb: FormBuilder,
    private router: Router,
    private masterNameService: MasternameService,
    private commonService: CommonService,
    private toaster: ToastrService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.fillForm(this.id);
    }
    this.initForm();
  }


  fillForm(id) {

    this.masterNameService.getMasterNameDetail(id).subscribe((result: any) => {
      if (result) {
        this.masterNameForm.patchValue({
          masterNameId: result.masterNameId,
          masterNameValue: result.masterNameValue,
          masterNameTitle: result.masterNameTitle,
        });
      }
    })
  }

  ngOnDestroy(): void {

  }

  close() {
    this.router.navigate(['/mastername']);
  }

  private initForm() {
    this.masterNameForm = this.fb.group({
      masterNameValue: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  get masterNameValue() { return this.masterNameForm.get('masterNameValue'); }


  save() {
  
    if (this.masterNameForm.valid) {
      if (this.id) {
        this.mastername.masterNameId = this.id;
      }
      else {
        this.mastername.masterNameId = this.masterNameForm.value.masterNameId;
      }
      this.mastername.masterNameValue = this.masterNameForm.value.masterNameValue;

      this.masterNameService.AddEditMasterName(this.mastername).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/mastername");
        }
        else {
          this.toaster.error(result.responseMessage);
        }
      })
    }
    else {
      this.commonService.validateAllFormFields(this.masterNameForm);
    }

  }
}
