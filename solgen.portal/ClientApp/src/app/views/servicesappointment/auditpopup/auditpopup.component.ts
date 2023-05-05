import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AssignSheduleAppointmentModel, ServicesappointmentService } from '../servicesappointment.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { DateTimeToLocalForAddEditPipe } from '../../../pipes/datetime.pipe';
import { transform } from 'html2canvas/dist/types/css/property-descriptors/transform';
import { AuditchecklistpopupComponent } from '../auditchecklistpopup/auditchecklistpopup.component';
@Component({
  selector: 'app-auditpopup',
  templateUrl: './auditpopup.component.html',
  styleUrls: ['./auditpopup.component.scss']
})
export class AuditpopupComponent implements OnInit {
  @ViewChild('audit', { static: false }) auditModel: ModalDirective;
  @ViewChild('auditCheckList', { static: false }) auditCheckListModel: AuditchecklistpopupComponent;
  IsAuditCheckListDisplay: boolean = false;



  constructor(private fb: FormBuilder, private serviceappointmentlistService: ServicesappointmentService, private toaster: ToastrService, private commonService: CommonService) { }
  loadSave: boolean = false;
  auditData: any;
  isDisabled: any;
  ngOnInit() {
    this.loadSave = true;
  }

  ActualauditCheckListData: { Main: any, Child: any[] }[] = [];

  show(obj: any) {
    ;
    this.isDisabled = obj.disable;
    this.loadSave = true;
    this.auditModel.show();
    this.refresh(obj.serviceAppointmentsId);
  }

  refresh(serviceAppointmentsId: any) {
    this.serviceappointmentlistService.auditReviewData(serviceAppointmentsId).subscribe(s => {
      this.auditData = s;
      this.ActualauditCheckListData = [];
      setTimeout(() => {
        this.loadSave = false;
      }, 500);
    }, err => {
      this.loadSave = false;
    });
    this.IsAuditCheckListDisplay = false;
  }

  closeAudit() {
    this.auditModel.hide();
  }

  auditChecklistDetail(checkList_Id: number, serviceAppointmentId: number, disable: boolean) {
    ;
    this.closeAudit();
    this.IsAuditCheckListDisplay = false  ;
    this.auditCheckListModel.auditChecklistDetail(checkList_Id, serviceAppointmentId, disable);
  }

  switchClicked(event, checkList_Id: number, serviceAppointmentId: number) {
    this.serviceappointmentlistService.auditChecklistCheckBox(checkList_Id, serviceAppointmentId, event.srcElement.checked).subscribe(s => {
      this.refresh(serviceAppointmentId);
    }, err => {
      this.loadSave = false;
    });
  }
}
