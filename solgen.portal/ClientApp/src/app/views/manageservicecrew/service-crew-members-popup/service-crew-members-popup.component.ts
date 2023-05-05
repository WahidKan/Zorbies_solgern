import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { CommonService } from '../../shared/common.service';
import { ManageservicecrewService } from '../manageservicecrew.service';

@Component({
  selector: 'app-service-crew-members-popup',
  templateUrl: './service-crew-members-popup.component.html',
  styleUrls: ['./service-crew-members-popup.component.scss']
})
export class ServiceCrewMembersPopupComponent implements OnInit {
  @ViewChild('ServiceCrewMembersList', { static: false }) ServiceCrewMembersPopup: ModalDirective;
  loadSave: boolean = false;
  ServiceCrewName: any;
  sortDir: any = 'desc';
  sortColumn: any = 'Id';
  @ViewChild('table', { static: false }) table: DatatableComponent;
  
  lstServiceCrewMembers: any = {
    pager: {},
    data: []
  }
  SelectionType = SelectionType;
  selected = [];
  lstPageSize: any;
  searchTxt: any;
  pageSizeValue: any = 4;
  pageNo: any = 1;
  currentPage: any = 1;
  CrewId: any;
  totalRecords: any = 0;

  constructor(private commonService: CommonService, private servicecrewService: ManageservicecrewService) { }

  ngOnInit() {
    this.searchTxt = '';
    this.getPageSizes();
  }

  show(data) {
    this.pageSizeValue = 4;
    this.pageNo = 1;
    this.currentPage = 1;
    this.ServiceCrewName = data.Name;
    this.CrewId = data.id;
    this.loadSave = true;
    this.ServiceCrewMembersPopup.show();
    //this.loadSave = false;
    
    this.refresh();
  }

  close() {
    this.loadSave = false;
    this.ServiceCrewMembersPopup.hide();
  }

  refresh() {
    this.table.sorts = [];
    this.servicecrewService.GetServiceCrewMembersWithResourceType(this.searchTxt, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.CrewId).subscribe(resp => {
      setTimeout(() => {
        this.lstServiceCrewMembers = resp;
       // // console.log('lstServiceCrewMembers', this.lstServiceCrewMembers)
        this.totalRecords = this.lstServiceCrewMembers.pager.totalItems;
        this.table.recalculate();
        //// console.log('totalRecords', this.totalRecords)
        this.table.recalculateColumns();
        this.loadSave = false;
      }, 200);
    }, err => {
        this.loadSave = false;
    });
  }
  setPage($event) {
    this.loadSave = true;
    this.pageNo = $event.page;
    this.currentPage = $event.page;
    this.refresh();
  }
  onSort($event) {
    ;
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.refresh();
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($event) {
    this.refresh();
  }
  onReset() {
    this.sortDir = 'desc';
    this.sortColumn = 'Id';
    this.pageNo = 1;
    this.pageSizeValue = 4;
    this.searchTxt = '';
    this.refresh();
  }
  onSearch() {
    this.pageNo = 1;
    this.refresh();
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.onSearch();
    }
  }
}
