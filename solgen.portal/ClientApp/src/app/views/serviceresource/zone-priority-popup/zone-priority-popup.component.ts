import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ZonesList, ServiceresourseService, siteSurveyModel } from '../serviceresourse.service';
import { ToastrService } from 'ngx-toastr';
import { take, takeUntil } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { parse } from 'cfb/types';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-zone-priority-popup',
  templateUrl: './zone-priority-popup.component.html',
  styleUrls: ['./zone-priority-popup.component.scss']
})
export class ZonePriorityPopupComponent implements OnInit {
  subscriber = new Subject();

  title:string = "Site Survey Zone Priority";
  @ViewChild('priorityTable', {static:false}) dataTable: Table;

  zonePriorityList: Array<ZonesList> = [];
  newDynamic: any = {};  

  cols: any[];
  zones = [];
  ddlZone:any;
  result: Array<ZonesList>=[];
  ServiceResourceId: any;
  isEdit = false;
  hasRows = false;
  loadSave = false;


  @ViewChild('ZonePriority', { static: false }) ZonePriorityPopup: ModalDirective;
  @Output() ZonePriorityEvent = new EventEmitter();

  constructor(private toastr: ToastrService, private service: ServiceresourseService) { }

  ngOnInit() {

    this.initializeColumns();


   // this.addNewRow();
  }
  ngOnDestroy() {
    this.reset();
    this.subscriber.next();
    this.subscriber.complete();
  }

  initializeColumns() {
    this.cols = [
      { field: 'priority', header: 'Priority' , display:'none' },
      { field: 'zone', header: 'Zone', display: 'table-cell' },
      { field: 'action', header: 'Action', display: 'table-cell' },

    ];
  }

  show(resourceId, isEdit) {
    this.loadSave = true;
    this.ServiceResourceId = resourceId;
    this.isEdit = isEdit;
    if (isEdit) {
      this.service.GetSiteZonePriorityListForEdit(this.ServiceResourceId).pipe(takeUntil(this.subscriber)).subscribe(resp => {
        if (resp) {
          this.zonePriorityList = resp as [];
        }

      });
    }

    this.getLocationList(0, '');
    this.reset();
    this.ZonePriorityPopup.show();
    this.loadSave = false;

  }

  reset() {
    this.hasRows = false;
    this.ddlZone = null;
    this.zonePriorityList = [];
    this.result = [];
  }

  getLocationList(offset, searchtext) {
    this.service.GetZonesLocationsList(offset, searchtext)
      .pipe(takeUntil(this.subscriber)).subscribe((resp) => {
        // console.log(resp);
        if (resp) {
          this.zones = resp as [];
        }

    });
  }

  OnSubmit() {
    let zoneId = this.ddlZone;
    if (zoneId) {
      let findZones = this.zonePriorityList.filter(x => x.id == zoneId)

      if (findZones.length>0) {
        this.toastr.error("Selected zone is already exist in your priority list.");
        this.ddlZone = null;
      }
      else {
        let tempArray = this.zones.filter(x => x != null);

        let _data = tempArray.filter(s => s.value == zoneId);
          let zoneName = _data[0].text;

        let zn = new ZonesList();

        zn.id = zoneId;
        zn.zone = zoneName;
        this.zonePriorityList.push(zn);
        this.ddlZone = null;
        this.hasRows = true;
        this.toastr.success('Site Survey Zone added successfully.');

      }
    }
 }
  close() {
    this.ZonePriorityPopup.hide();
    this.ngOnDestroy();
  }

  //addNewRow() {
  //  this.newDynamic = { id: "", priority: "", zone: "" };
  //  this.dynamicArray.push(this.newDynamic);
  //}

  //addRow(index) {
  //  this.addNewRow();
  //  this.toastr.success('New row added successfully', 'New Row');
  //  return true;
  //}

  deleteRow(id) {
    this.zonePriorityList = this.zonePriorityList.filter(x => x.id !== id);
    this.toastr.success('Site Survey Zone deleted successfully.');
    
  }


  onSave() {

      this.loadSave = true
      this.result = this.dataTable._value as Array<ZonesList>;
      this.result.forEach((item, index) => {
        item.priority = (index + 1).toString();
      });


    if (this.result.length > 0 || this.isEdit) {

      var model: siteSurveyModel = new siteSurveyModel();

      model.id = this.ServiceResourceId;
      model.FormJsonData = JSON.stringify(this.result);
      model.EditMode = this.isEdit;

      this.service.ManagetSiteSurveyZonePriority(model)
        .pipe(takeUntil(this.subscriber))
        .subscribe((resp: any) => {
          if (resp.statusCode == 200) {
            this.toastr.success(resp.responseMessage);

            this.close();
            this.ZonePriorityEvent.emit();

          }
        }, error => {
        }, () => {
          this.loadSave = false;
        });
    }
    else {
      this.toastr.error("Please Select Site Survey Zone.");
      this.loadSave = false;

    }
  }

  searchText: string = '';
  len = 0;

  onKey(e: any, dataList: any) {
    this.len = 0
    this.searchText = e.target.value;
    this.service.GetZonesLocationsList(this.len, this.searchText).subscribe((data: any) => {
      this.zones = data;
    })
  }

  onClearLang(dataList: any): void {
    this.len = 0
    this.searchText = '';
    this.service.GetZonesLocationsList(this.len, this.searchText).subscribe((data: any) => {
      this.zones = data;
    });
  }

  onScrollToEnd(dataList: any) {
    this.fetchMore(dataList);
  }

  private fetchMore(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;

    this.service.GetZonesLocationsList(this.len, this.searchText).subscribe((data: any) => {
      this.zones = this.zones.concat(data);
    })

  }
} 
