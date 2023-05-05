import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkflowService } from '../workflow.service';
@Component({
  selector: 'app-mappingpopup',
  templateUrl: './mappingpopup.component.html',
  styleUrls: ['./mappingpopup.component.scss']
})
export class MappingpopupComponent implements OnInit {
  @ViewChild('mapping', { static: false }) MappingPopup: ModalDirective;
  @Output() setMapping = new EventEmitter<number>();
  loadSave: boolean = false;
  FlowId: any;
  FlowName: any;
  CompanyId: any;
  search: any = '';
  length = 0;
  CustomButtonList: any;
  constructor(private workService: WorkflowService, private fb: FormBuilder, private router: Router, private toaster: ToastrService,private commonService: CommonService) { }  

  ngOnInit() {
    this.GetCustomButton();  
  }

  GetCustomButtonDetail(id) {
    this.workService.getCustomButtonDetailByFlowId(id).subscribe((result: any) => {
      // console.log('CustomButtonDetail:', result);
      if (result) {
        this.loadSave = false;
        let id = String(result.id);
        if (this.CustomButtonList != null) {
          let val = this.CustomButtonList.filter(m => m.value == id);
          if (val) {
            this.customButtonId.setValue(val[0].value);
          }
        }
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }

  show(data) {
    this.customButtonForm.reset();
    this.MappingPopup.show();
    this.FlowId = data.FlowId;
    this.FlowName = data.FlowName;
    this.loadSave = false;
    if (this.FlowId) {
      this.GetCustomButtonDetail(this.FlowId);
    }
  }

  customButtonForm = this.fb.group({
    customButtonId: [null, Validators.required],
  })

  onClearCustomButton(dataList: any): void {
    this.length = 0
    this.search = '';
    this.GetCustomButton();
  }

  onKeyCustomButton(e: any, dataList: any) {
    this.length = 0
    this.search = e.target.value;
    this.GetCustomButton();
  }

  onScrollToEndCustomButton(dataList: any) {
    this.fetchMore(dataList);
  }

  private fetchMore(dataList: any) {
    if (this.search == undefined) {
      this.search = '';
    }
    this.length = dataList.length;
    this.GetCustomButton();
  }

  GetCustomButton() {
    this.workService.GetCustomButtonDDLList('', this.length, this.search).subscribe(resp => {
      if (resp) {
        this.CustomButtonList = resp;
        // console.log("this.CustomButtonList", this.CustomButtonList);
      }
    });
  };

  close() {
    this.loadSave = false;
    this.MappingPopup.hide();
  }

  onSubmit() {
    //;
    // console.log("FormValue", this.customButtonForm);
    if (this.customButtonForm.valid) {
      // console.log('customButtonData', this.customButtonForm.value);
      this.workService.saveCustomButton(this.customButtonForm.value.customButtonId, this.FlowId).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success('Flow has been mapped with selected custom button.');
          this.setMapping.emit(1);
          this.MappingPopup.hide();
        }
        else {
          this.loadSave = false;
          this.toaster.error('Something went wrong');
        }
      });
    }
    else {
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.customButtonForm);
    }
  }
  get customButtonId() { return this.customButtonForm.get('customButtonId'); }
}
