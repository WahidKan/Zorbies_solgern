import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';

@Component({
  selector: 'app-stageconfig',
  templateUrl: './stageconfig.component.html',
  styleUrls: ['./stageconfig.component.scss']
})
export class StageconfigComponent implements OnInit {
  modulePermission: any;
  lstUserType: any;
  sustagelist: any;
  stageform: FormGroup;
  constructor(private fb: FormBuilder, private loanService: LoanapplicationserviceService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
    this.commonService.getMasterItemsList("usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters.filter(x => x.masterName == "UserType");

    })
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.initForm();
    this.GetSubStageDll();

  }
  private initForm() { 
    this.stageform = this.fb.group({
      stagename: ['', Validators.required],
      substageid: [null, Validators.required],
      duedays: ['', Validators.required],
      usertype: ['', Validators.required],
      pages: ['', Validators.required],
      mandatory: [''],
      fields: this.fb.array([this.buildFields()])
     
    });
  }
  get fields(): FormArray {
    return this.stageform.get('fields') as FormArray;
  }
  addFields() {
    this.fields.push(this.buildFields());
  }

  removeFields(index: any) {
    this.fields.removeAt(index);
  }

  GetSubStageDll() {
    this.loanService.GetSubStageDll().subscribe((response: any) =>
      this.sustagelist = response
      );
  }
  SaveAllFields() {

  }
  Cancel() {

  }

  buildFields(): FormGroup {
    return this.fb.group({
  stagename: ['', Validators.required],
  substageid: [null, Validators.required],
  duedays: ['', Validators.required],
  usertype: ['', Validators.required],
  pages: ['', Validators.required],
      mandatory: [''],
    });
  }
  get stagename() { return this.stageform.get('stagename'); }
  get substageid() { return this.stageform.get('substageid'); }
  get duedays() { return this.stageform.get('duedays'); }
  get usertype() { return this.stageform.get('usertype'); }
  get pages() { return this.stageform.get('pages'); }
  get switch() { return this.stageform.get('switch'); }

}
