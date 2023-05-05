import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { FlowBuilderService } from '../flow-builder.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss']
})
export class SaveModalComponent implements OnInit {
  @ViewChild('SaveModal', { static: false }) SaveModal: ModalDirective;
  requiredAlertMessage = false;
  moduleList: any;
  flowused = 'false';
  subModulesList: any;
  statusList: any = [{ value: 1001, text: 'Active' }, { value: 1002, text: 'In-Active' }];
  typesList: any = [{ value: 'ScreenFlow', text: 'Screen Flow' }, { value: 'AutolaunchedFlow', text: 'Autolaunched Flow' }];;
  runConditionList: any = [{ value: 1, text: 'User or System Context—Depends on How Flow is Launched' }, { value: 2, text: 'System Context with Sharing—Enforces Record-Level Access' }, { value: 3, text: 'System Context Without Sharing—Access All Data' }];
  loadSave: boolean = false;
  @Input() form: FormGroup;

  constructor(private commonService: CommonService, private service: FlowBuilderService, private toaster: ToastrService,
    private route: ActivatedRoute, private router: Router, private toastrSerivce: ToastrService) { }

  ngOnInit() {
    this.getModuleList();
    this.onModuleChange();


  }

  show() {
    ;
    if(this.form.get("flowExist").value==='usedflow')
    ///this.form.get("statusId").;
    this.flowused = 'true';
    this.SaveModal.show();
  }
  close() {
    //this.router.navigateByUrl("/automation-flow");
    this.SaveModal.hide();
  }
  submit() {
    ;
    // console.log("Form after presing save button == > ", JSON.stringify(this.form.value));
    if (this.form.valid) {
      var flowName = this.form.get("name").value;
      var id = this.form.get("id").value;
      this.service.VerifyDuplicateFlowName(flowName, id).subscribe(result => {
        if (result == 1) {
          this.toastrSerivce.error("Flow name already exists. Please enter another name.");
          //this.loadSave = false;
        } else {
          (this.form.get("connectors") as FormArray).controls.forEach(connector => {
          });
          var res = this.form.value;
          res.connectors = res.connectors.map(x => {
            x.id = x.dbId;
            return x;
          });
          ;
          this.service.AddEditAutomation(res).subscribe((response: any) => {
            if (response) {
              if (response.statusCode == 200) {
                this.toaster.success(response.responseMessage);
                this.SaveModal.hide();
                this.form.reset();
                this.router.navigateByUrl("/automation-flow");

              } else {
                this.toaster.error(response.responseMessage);
              }
            }
          });
        }
      });
    } else {
      // console.log('hello from save modal', this.requiredAlertMessage);
      this.requiredAlertMessage = true;
    }
  }
  getModuleList() {
    this.commonService.getSolgenModulesItemsList('custom_modules_layout').subscribe((result: any) => {
      this.moduleList = this.commonService.masters;
    });
  }

  onModuleChange() {
    this.form.get("moduleId").valueChanges.subscribe((m: any) => {
      this.service.getSubModules(m).subscribe((data: any) => {
        this.subModulesList = data;
      });
    });
  }
}
