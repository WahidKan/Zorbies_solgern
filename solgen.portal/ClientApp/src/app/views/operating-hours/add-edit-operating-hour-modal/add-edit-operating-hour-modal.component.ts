import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OperatingHoursService } from '../services/operating-hours.service';

@Component({
  selector: 'app-add-edit-operating-hour-modal',
  templateUrl: './add-edit-operating-hour-modal.component.html',
  styleUrls: ['./add-edit-operating-hour-modal.component.scss'],
})
export class AddEditOperatingHourModalComponent implements OnInit {
  @ViewChild('modal', { static: false }) addOperatingHoursModal: ModalDirective;
  isAddForm = false;
  addOperatingHoursForm: FormGroup;
  loadSave: boolean = false;
  loading: boolean = false;
  @Output() onAdd = new EventEmitter();
  operatingHoursParams = {
    filter: '',
    sortColumn: '',
    sortDir: 'desc',
    page: 0,
    pageSize: 10,
  };
  pagedData: any = {
    pager: {},
    data: [],
  };
  timezoneList: any;
  timeSlots = [
    { id: null, day: 'Monday', startTime: null, endTime: null, type: 'Normal' },
    { id: null, day: 'Tuesday', startTime: null, endTime: null, type: 'Normal' },
    { id: null, day: 'Wednesday', startTime: null, endTime: null, type: 'Normal' },
    { id: null, day: 'Thursday', startTime: null, endTime: null, type: 'Normal' },
    { id: null, day: 'Friday', startTime: null, endTime: null, type: 'Normal' },
    { id: null, day: 'Saturday', startTime: null, endTime: null, type: 'Normal' },
    { id: null, day: 'Sunday', startTime: null, endTime: null, type: 'Normal' },
  ];

  workTypes: any[] = [
    { text: 'Normal', value: 'Normal' },
    { text: 'Extended', value: 'Extended' },
  ];

  timeSlotColumns = [{ name: 'Day Of Week' }, { name: 'Start Time' }, { name: 'End Time' }, { name: 'Type' }, { name: 'Delete' }];

  types = [
    { id: 'Normal', value: 'Normal' },
    { id: 'Extended', value: 'Extended' },
  ];

  dayOfWeek: any[] = [
    { text: 'Monday', value: 'Monday' },
    { text: 'Tuesday', value: 'Tuesday' },
    { text: 'Wednesday', value: 'Wednesday' },
    { text: 'Thursday', value: 'Thursday' },
    { text: 'Friday', value: 'Friday' },
    { text: 'Saturday', value: 'Saturday' },
    { text: 'Sunday', value: 'Sunday' },
  ];
  isEdit: boolean;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private operatingHoursService: OperatingHoursService
  ) {}

  ngOnInit() {
    this.getTimeZones();
  }

  onEntryAdded() {}

  onEntryUpdated() {}

  get name() {
    return this.addOperatingHoursForm.get('name');
  }
  get description() {
    return this.addOperatingHoursForm.get('description');
  }
  get timeZone() {
    return this.addOperatingHoursForm.get('timeZone');
  }
  get TimeSlots() {
    return (this.addOperatingHoursForm.get('timeSlots') as FormArray).controls;
  }
  get Values() {
    return (this.addOperatingHoursForm.get('timeSlots') as FormArray).value;
  }

  getStartTime(i) {
    const startTime = this.TimeSlots[i].get('startTime');
    return startTime;
  }

  showpopup(params: any, mode: string) {
    if (params) {
      this.isAddForm = false;
      this.editOperatingHour(params);
    } else {
      this.isAddForm = true;
      this.createFormForSlots();
    }
  }

  getTimeZones() {
    this.commonService.getTimeZoneList().subscribe((res) => {
      this.timezoneList = JSON.parse(res);
    });
  }

  onDayChange(day) {
    const alreadyExist = this.TimeSlots.filter((group: FormGroup) => group.controls.dayOfWeek.value === day.value);
    const control = <FormGroup>alreadyExist.pop();
    if (alreadyExist.length >= 1) {
      // (<FormGroup>this.TimeSlots[this.TimeSlots.length - 1]).controls['workType'].disable({ onlySelf: true, emitEvent: false });
      (<FormGroup>this.TimeSlots[this.TimeSlots.length - 1]).controls['workType'].setValue('Extended');
      (<FormGroup>this.TimeSlots[this.TimeSlots.length - 1]).controls['workType'].disable();
    }
  }

  getValidation(control) {
    if (!control) return;
    return control.invalid && (control.dirty || control.touched) && control.errors.required;
  }

  // refresh() {
  //   this.loading = true;
  //   this.operatingHoursService.getOperatingHoursList(this.operatingHoursParams)
  //     .subscribe(response => {
  //       this.pagedData = {
  //         data: response.data,
  //         pager: response.pager
  //       }
  //       this.loading = false;
  //     }, error => {
  //       this.loading = false;
  //     });
  // }

  close() {
    this.addOperatingHoursModal.hide();
  }

  onDeleteTimeslot(id, index) {
    if (id) {
      const message = `Are you sure you want to delete this time slot?`;
      this.dialogService.confirm('DELETE TIME SLOT', message).subscribe((confirmed) => {
        if (confirmed) {
          this.loadSave = true;
          this.operatingHoursService.deleteOperatingHoursTimeSlot(id).subscribe((res) => {
            var array = this.addOperatingHoursForm.get('timeSlots') as FormArray;
            array.removeAt(index);
            this.loadSave = false;
          }),
            (error) => {
              this.loadSave = false;
              this.toaster.error(`Error occurred while deleting time slot.`);
            };
        }
      });
    } else {
      var array = this.addOperatingHoursForm.get('timeSlots') as FormArray;
      array.removeAt(index);
    }
  }

  onAddTimeslot() {
    (this.addOperatingHoursForm.get('timeSlots') as FormArray).push(
      this.fb.group({
        id: [null],
        dayOfWeek: [null, Validators.required],
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        workType: ['Normal', Validators.required],
        statusId: ['1001'],
      })
    );
  }

  handleTimeZoneChange() {}

  editOperatingHour(id) {
    this.operatingHoursService.getOperatingHoursById(id).subscribe((res) => {
      res.timeSlots = res.timeSlots || [];
      this.editFormForSlots(res);
    });
    this.isEdit = true;
    this.addOperatingHoursModal.show();
  }

  editFormForSlots(param) {
    this.addOperatingHoursForm = this.fb.group({
      name: [param.name, Validators.required],
      description: [param.description, Validators.required],
      timeZone: [param.timeZone, Validators.required],
      id: [param.id],
      statusId: [param.statusId],
      timeSlots: this.fb.array([]),
    });
    this.onNameChanges();
    var arry = this.addOperatingHoursForm.get('timeSlots') as FormArray;
    while (arry.controls.length > 0) {
      arry.removeAt(0);
    }

    param.timeSlots.forEach((s) => {
      (<FormArray>this.addOperatingHoursForm.get('timeSlots')).push(
        this.fb.group({
          id: [s.id],
          dayOfWeek: [{ value: s.dayOfWeek, disabled: true }, Validators.required],
          startTime: [s.startTime, Validators.required],
          endTime: [s.endTime, Validators.required],
          workType: [{ value: s.workType, disabled: true }, Validators.required],
          statusId: [s.statusId],
        })
      );
    });
    this.isEdit = true;
  }

  createFormForSlots() {
    this.addOperatingHoursForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(200)]],
      timeZone: [null, Validators.required],
      id: [null],
      statusId: ['1001'],
      timeSlots: this.fb.array([]),
    });
    this.onNameChanges();
    this.timeSlots.forEach((s) => {
      (<FormArray>this.addOperatingHoursForm.get('timeSlots')).push(
        this.fb.group({
          id: [s.id],
          dayOfWeek: [s.day],
          startTime: [s.startTime, Validators.required],
          endTime: [s.endTime, Validators.required],
          workType: [s.type],
          statusId: ['1001'],
        })
      );
    });
    this.isAddForm = true;
    this.addOperatingHoursModal.show();
    this.isEdit = false;
  }

  saveNewForm() {
    if (this.addOperatingHoursForm.valid) {
      // console.log(this.addOperatingHoursForm.getRawValue());
      this.operatingHoursService.addOperatingHours(this.addOperatingHoursForm.getRawValue()).subscribe((result: any) => {
        if (result.statusCode == 200) {
          if (this.isEdit) {
            this.toaster.success('Operating Hours has been updated successfully');
          } else {
            this.toaster.success(result.responseMessage);
          }
          this.addOperatingHoursModal.hide();
          this.onAdd.emit();
          this.isEdit = false;
        } else if (result.statusCode == 300) {
          this.toaster.success(result.responseMessage);
          this.addOperatingHoursModal.hide();
          this.onAdd.emit();
        } else if (result.statusCode == 500 && result.id == -1) {
          this.toaster.error('Already Exists with same form Name');
        } else if (result.statusCode == 500 && result.id == -2) {
          this.toaster.error('Can not be same name as system predefine');
        } else {
          this.onAdd.emit();
          this.toaster.error(result.responseMessage);
        }
      });
    } else {
      this.commonService.validateAllFormFields(this.addOperatingHoursForm);
    }
  }

  onNameChanges() {
    const id = this.addOperatingHoursForm.get('id').value;
    this.addOperatingHoursForm.get('name').valueChanges.subscribe((name) => {
      this.operatingHoursService.checkDuplicateName(name, id || 0).subscribe((r: string) => {
        if (r.toLowerCase() === 'true') {
          this.addOperatingHoursForm.get('name').setErrors({ nameExist: true });
        }
      });
    });
  }
}
