import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../../shared/common.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ManageleaseService } from '../managelease.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-lease-status',
  templateUrl: './update-lease-status.component.html',
  styleUrls: ['./update-lease-status.component.scss']
})
export class UpdateLeaseStatusComponent implements OnInit {
  @ViewChild('leaseStatusModal', { static: false }) modalleaseStatus: ModalDirective;
  @Output() leaseStatusEmit = new EventEmitter();
  @ViewChild('leseStatusSelect', { static: false }) userTypeSelect: NgSelectComponent;
  active = true;
  lstUserType: any;
  leaseStatus: any = null;
  LeaseId: any;
  loadSave = false;
  constructor(private commonService: CommonService,
    private leaseService: ManageleaseService,
    private route: ActivatedRoute,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.commonService.getMasterItemsList("operationUserLease").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
  }

  close() {
    this.active = false;
    this.userTypeSelect.clearModel();
    this.modalleaseStatus.hide();

  }
  show(leaseId) {
    this.LeaseId = leaseId;
    this.modalleaseStatus.show();
  }
  SetLeaseStatus(status: string) {
    this.leaseStatus = status;
  }

  save() {
    this.loadSave = true;
    if (this.leaseStatus == null) {
      this.toaster.error('Please select status');
    }
    else {
      this.leaseService.updateLeaseStatus(this.leaseStatus, this.LeaseId).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toaster.success(`Lease status has been updated successfully`);
          this.userTypeSelect.clearModel();
          this.leaseStatusEmit.emit();
          this.close();
          this.loadSave = false;
        }
        else {
          this.loadSave = false;
          this.toaster.error(res.responseMessage);
        }
      },
        error => {
          this.loadSave = false;
        });
    }

  }

}
