import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceTerritoryService } from '../serviceterritorylist.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../../shared/common.service';


@Component({
  selector: 'app-userslistpopup',
  templateUrl: './userslistpopup.component.html',
  styleUrls: ['./userslistpopup.component.scss']
})
export class UserslistpopupComponent implements OnInit {
  //lstUsers: any
  serviceTeritoryId: number;
  loadSave: boolean = false;
  pageNo: number = 1;
  totalRecords: number;
  currentPage: number = 1;
  pageSize: number = 10;
  sortDir: string = 'desc';
  sortColumn: string = 'email';
  pagedData: any = {
    Pager: {},
    Data: []
  };
  lstPageSize: any



  @ViewChild('usersListByServiceTerritory', { static: false }) usersList: ModalDirective;

  constructor(private _territoryService: ServiceTerritoryService, private commonService: CommonService) { }

  ngOnInit() {
    this.getPageSizes();
  }

  show(_serviceTeritoryId: any) {
    this.serviceTeritoryId = _serviceTeritoryId;
    this.GetUsersListByServiceTerritoryId(this.serviceTeritoryId, this.sortColumn, this.sortDir, this.pageNo, this.pageSize);
    this.usersList.show();
  }

  close() {
    this.usersList.hide();
  }

  GetUsersListByServiceTerritoryId(_id: any, _sortColumn: string, _sortDir: string, _pageNo: number, _pageSize: number) {
    this.loadSave = true;
    this._territoryService.getUserslistByServiceTerritoryId(_id, _sortColumn, _sortDir, _pageNo, _pageSize).subscribe(resp => {
    
      this.loadSave = false;
      this.pagedData = this._territoryService.serviceTerritoryData;
    },
      err => {
        this.loadSave = false;
      });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }

  setPage($event) {
    this.currentPage = $event.page;
    this.refresh();
  }
  onChange($event) {
    ;
    if ($event) {
      this.pageSize = $event.text;
    }
    this.currentPage = 1;
    this.refresh();
  }

  refresh() {
    this.GetUsersListByServiceTerritoryId(this.serviceTeritoryId, this.sortColumn, this.sortDir, this.currentPage, this.pageSize);
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
}
