import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonService, ModuleList } from '../../shared/common.service';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Validators, FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { OperatingHoursService } from '../services/operating-hours.service';
import { HttpClient } from '@angular/common/http';
import { OperatingHoursDto, PagerResponseDto } from '../dto/operating-hours-info';
import { map, filter } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { TimeSlotDto } from '../dto/timeslot';
import { DatePipe } from '@angular/common';
import { AddEditOperatingHourModalComponent } from '../add-edit-operating-hour-modal/add-edit-operating-hour-modal.component';

@Component({
  selector: 'app-operating-hours-list',
  templateUrl: './operating-hours-list.component.html',
  styleUrls: ['./operating-hours-list.component.scss'],
})
export class OperatingHoursListComponent implements OnInit {
  @ViewChild('addEditModal', { static: false })
  addOperatingHoursModal: AddEditOperatingHourModalComponent;
  listFilter: string = '';
  pageSizeValue: number = 10;
  SelectionType = SelectionType;
  loadSave: boolean = false;
  isEdit: boolean = false;
  selected = [];
  serverTimeSlots: TimeSlotDto[];
  pagedData: any = {
    pager: {},
    data: [],
  };
  myTime: Date;
  timepickerVisible = true;
  datalist: PagerResponseDto<OperatingHoursDto>;
  offset: number;
  lstPageSize: any;
  loading: boolean;
  currentPage: any;
  sortDir: any;
  sortColumn: any;
  deleteId: string;
  isAddForm = false;
  timezoneList: any;
  operatingHoursParams = {
    filter: '',
    sortColumn: 'createdDate',
    sortDir: 'desc',
    page: 0,
    pageSize: 10,
  };
  addOperatingHoursForm: FormGroup;
  contentHeader: object;

  constructor(
    private operatingHoursService: OperatingHoursService,
    public commonService: CommonService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getOperatingHoursList();
    this.getPageSizes();
    this.getTimeZones();
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
            isLink: false
          }
 
        ]
    };
  }

  getTimeZones() {
    this.commonService.getTimeZoneList().subscribe((res) => {
      this.timezoneList = JSON.parse(res);
    });
  }

  getTimezoneById(id) {
    if (!id || !this.timezoneList) return;
    return this.timezoneList.find((t) => t.value === id).text;
  }

  get name() {
    return this.addOperatingHoursForm.get('name');
  }
  get description() {
    return this.addOperatingHoursForm.get('description');
  }
  get timeZone() {
    return this.addOperatingHoursForm.get('timeZone');
  }

  getTransformedDate(date) {
    if (!date) return;
    return this.datePipe.transform(date);
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

    var arry = this.addOperatingHoursForm.get('timeSlots') as FormArray;
    while (arry.controls.length > 0) {
      arry.removeAt(0);
    }

    param.timeSlots.forEach((s) => {
      (<FormArray>this.addOperatingHoursForm.get('timeSlots')).push(
        this.fb.group({
          id: [s.id],
          dayOfWeek: [s.dayOfWeek],
          startTime: [s.startTime],
          endTime: [s.endTime],
          workType: [s.workType],
          statusId: [s.statusId],
        })
      );
    });
  }

  onAddTimeslot() {
    (this.addOperatingHoursForm.get('timeSlots') as FormArray).push(
      this.fb.group({
        id: [null],
        dayOfWeek: [null],
        startTime: [null],
        endTime: [null],
        workType: [null],
        statusId: ['1001'],
      })
    );
  }

  onDeleteTimeslot(id, index) {
    if (id) {
      this.operatingHoursService.deleteOperatingHoursTimeSlot(id).subscribe((res) => {
        var array = this.addOperatingHoursForm.get('timeSlots') as FormArray;
        array.removeAt(index);
      });
    } else {
      var array = this.addOperatingHoursForm.get('timeSlots') as FormArray;
      array.removeAt(index);
    }
  }

  getOperatingHoursList() {
    this.loadSave = true;
    this.operatingHoursService.getOperatingHoursList(this.operatingHoursParams).subscribe(
      (res: PagerResponseDto<OperatingHoursDto>) => {
        this.pagedData = {
          data: res.data,
          pager: res.pager,
        };
        this.offset = 1;
        this.loadSave = false;
      },
      (err) => {
        this.loadSave = false;
      }
    );
  }
  handleTimeZoneChange() {}

  updateFilter(event) {
    this.operatingHoursParams.filter = event.target.value;
    let keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  search() {
    this.currentPage = 1;
    this.operatingHoursParams.filter = '';
    if (this.listFilter.trim().length > 0) {
      this.operatingHoursParams.filter = this.listFilter;
    }
    this.refresh();
  }

  reset() {
    this.listFilter = '';
    this.operatingHoursParams.filter = '';
    this.currentPage = 1;
    this.refresh();
  }

  showpopup(params) {
    this.isAddForm = true;
    this.addOperatingHoursModal.showpopup(params, 'Add');
    this.addOperatingHoursModal.onAdd.subscribe((r) => this.refresh());
  }

  showPopupForEdit(params) {
    this.isAddForm = true;
    this.addOperatingHoursModal.showpopup(params, 'Edit');
    this.addOperatingHoursModal.onAdd.subscribe((r) => this.refresh());
  }

  get curPage(): number {
    return this.offset;
  }

  getPageSizes() {
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }

  setPage($event) {
    this.loading = true;
    this.currentPage = $event.page - 1;
    this.operatingHoursParams.page = $event.page - 1;
    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0];
    this.operatingHoursParams.sortDir = sort.dir;
    this.operatingHoursParams.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }
  onChange($event) {
    this.currentPage = 1;
    this.refresh();
  }

  deleteForm(row) {
    const message = `Are you sure you want to delete this Operating Hours?`;
    this.dialogService.confirm('DELETE OPERATING HOURS', message).subscribe((confirmed) => {
      if (confirmed) {
        this.loadSave = true;

        this.operatingHoursService.deleteOperatingHours(row.id).subscribe(
          (result) => {
            this.loadSave = false;
            this.toaster.success(`Operating Hours has been deleted successfully.`);
            this.deleteId = '';
            this.refresh();
          },
          (error) => {},
          () => {
            this.loadSave = false;
          }
        );
      }
    });
  }

  onDeleteMultipleOperatingHours() {
    if (this.deleteId) {
      const message = `Are you sure you want to delete all the selected Operating Hours?`;
      this.dialogService.confirm('DELETE Operating Hours', message).subscribe((confirmed) => {
        if (confirmed) {
          this.loadSave = true;
          this.operatingHoursService.deleteMultipleOperatingHours(this.deleteId).subscribe(
            (result) => {
              this.loadSave = false;
              this.toaster.success(`Selected Operating Hours has been deleted successfully.`);
              this.deleteId = '';
              this.refresh();
            },
            (error) => {},
            () => {
              this.loadSave = false;
            }
          );
        }
      });
    } else {
      this.toaster.error('Please select at least one row.');
    }
  }

  refresh() {
    this.loadSave = true;
    this.operatingHoursService.getOperatingHoursList(this.operatingHoursParams).subscribe(
      (response) => {
        this.pagedData = {
          data: response.data,
          pager: response.pager,
        };
        this.loadSave = false;
      },
      (error) => {
        this.loadSave = false;
      }
    );
  }

  onSelect({ selected }) {
    if (this.deleteId == '' || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = '';
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].id.toString() + ',';
      }
    } else {
      this.deleteId = null;
      this.deleteId = '';
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].id.toString() + ',';
      }
    }
  }
}
