import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { OperatingHoursService } from '../services/operating-hours.service';
import { DatePipe, Location } from '@angular/common';
import { AddEditOperatingHourModalComponent } from '../add-edit-operating-hour-modal/add-edit-operating-hour-modal.component';
import { addAssignedResourcesModel } from '../../serviceresource/serviceresourse.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-operating-hours-view',
  templateUrl: './operating-hours-view.component.html',
  styleUrls: ['./operating-hours-view.component.scss'],
})
export class OperatingHoursViewComponent implements OnInit {
  @ViewChild('addEditModal', { static: false }) addOperatingHoursModal: AddEditOperatingHourModalComponent;
  isAddForm: any;
  loadSave: boolean = false;
  subscription;
  id: any;
  constructor(
    private route: ActivatedRoute,
    private operatingHoursService: OperatingHoursService,
    private commonService: CommonService,
    private location: Location,
    private datePipe: DatePipe,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService
  ) {}
  operatingHours: any;
  operatingHourId: string;
  timeZoneName = '';
  contentHeader: object;
  ngOnInit() {
    
    this.loadSave = true;
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.loadViewData(this.id);
    });
    this.initBreadCrumb();
  }
    
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Operating Hours',
      actionButton: true,
      iconCssClass: '',
      breadcrumb:
        [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard'
          },
          {
           name: 'Manage Operating Hours',
           isLink: true,
           link: '/operating-hours'
         },
          {
            name: 'Operating Hours Details',
            isLink: false
          }
 
        ]
    };
  }
  getTimeZones(id) {
    this.commonService.getTimeZoneList().subscribe((res) => {
      const timezoneList = JSON.parse(res);
      const time = timezoneList.find((x) => x.value == id);
      this.timeZoneName = time ? time.text : '';
    });
  }
  loadViewData(id) {
    this.operatingHoursService.getOperatingHoursById(id).subscribe((response) => {
      this.operatingHours = response;
      this.getTimeZones(this.operatingHours.timeZone);
      // console.log(response);
      this.loadSave = false;
    }, error=> {
      this.loadSave = false;
      // console.log(error)
    });
  }
  deleteTimeSlot(id) {
    const message = `Are you sure you want to delete this time slot?`;
    this.dialogService.confirm('DELETE TIME SLOT', message).subscribe((confirmed) => {
      if (confirmed) {
        this.loadSave = true;
        if (id) {
          this.operatingHoursService.deleteOperatingHoursTimeSlot(id).subscribe((res) => {
            this.operatingHours.timeSlots = this.operatingHours.timeSlots.filter((t) => t.id !== id);
            this.toaster.success(`Time Slot has been deleted successfully.`);
          }),
            (error) => {
              this.loadSave = false;
              this.toaster.error(`Error occurred while deleting time slot.`);
            },
            () => {
              this.loadSave = false;
            };
        }
      }
    });
  }

  getTransformedDate(date) {
    if (!date) return;
    return this.datePipe.transform(date);
  }

  showpopup(params) {
    this.isAddForm = true;
    this.addOperatingHoursModal.showpopup(params, 'Edit');
    if (!this.subscription) {
      this.subscription = this.addOperatingHoursModal.onAdd.subscribe((r) => this.loadViewData(this.id));
    }
  }

  onBack() {
    this.location.back();
  }
}
