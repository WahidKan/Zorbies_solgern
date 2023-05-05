import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { CommonService } from '../../shared/common.service';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-userlistingpopup',
  templateUrl: './userlistingpopup.component.html',
  styleUrls: ['./userlistingpopup.component.scss']
})
export class UserListingPopUpComponent implements OnInit {
  @ViewChild('ServiceUsersListPopUp', { static: false }) ServiceUsersPopup: ModalDirective;
  loadSave: boolean = false;
  UserName: any;
  sortDir: any = 'desc';
  sortColumn: any = 'Id';
  @ViewChild('table', { static: false }) table: DatatableComponent;
  @Input() offset: number;
  lstServiceUserNames: any = {
    pager: {},
    data: []
  }
  SelectionType = SelectionType;
  selected = [];
  lstPageSize: any;
  searchTxt: any;
  pageSizeValue: any = 10;
  pageNo: any = 0;
  currentPage: number;
  roleId: any;
  constructor(private commonService: CommonService, private serviceRoleService: RoleService) { }

  ngOnInit() {
    //;
    this.pageNo = 1;
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.searchTxt = '';
    this.refresh();
  }
  show(data) {
    this.pageSizeValue = 10;
    this.pageNo = 1;
    this.currentPage = 1;
    this.UserName = data.Name;
    this.roleId = data.RoleId;
    this.loadSave = true;
    this.ServiceUsersPopup.show();
    this.loadSave = false;
    this.serviceRoleService.GetServiceUsers(this.searchTxt, this.sortColumn, this.sortDir, 1, this.pageSizeValue, this.roleId).subscribe(resp => {
      setTimeout(() => {
        this.lstServiceUserNames = resp;
        this.offset = this.pageNo + 1;
        this.loadSave = false;
      }, 200);
    }, err => {
      this.loadSave = false;
    });
  }
  close() {
    this.loadSave = false;
    this.ServiceUsersPopup.hide();
  }
  get curPage(): number {
    return this.offset;
  }
  refresh() {
    this.table.sorts = [];
    this.serviceRoleService.GetServiceUsers(this.searchTxt, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.roleId).subscribe(resp => {
      setTimeout(() => {
        this.lstServiceUserNames = resp;
        this.offset = this.pageNo + 1;
        this.loadSave = false;
      }, 200);
    }, err => {
      this.loadSave = false;
    });
  }
  setPage($event) {
    //;
    if (typeof $event.page == "undefined")
    {
      this.loadSave = false;
    }
    else {
      this.loadSave = true;
    }
    this.pageNo = $event.page;   
    this.refresh();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.serviceRoleService.GetServiceUsers(this.searchTxt, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.roleId).subscribe(resp => {
      setTimeout(() => {
        this.lstServiceUserNames = resp;
        this.table.recalculate();
        this.table.recalculateColumns();
        this.loadSave = false;
      }, 200);
    }, err => {
      this.loadSave = false;
    });
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onChange($event) {
    this.serviceRoleService.GetServiceUsers(this.searchTxt, this.sortColumn, this.sortDir, this.pageNo, this.pageSizeValue, this.roleId).subscribe(resp => {
      setTimeout(() => {
        this.lstServiceUserNames = resp;
        this.table.recalculate();
        this.table.recalculateColumns();
        this.loadSave = false;
      }, 200);
    }, err => {
      this.loadSave = false;
    });
  }
  onReset() {
    this.sortDir = 'desc';
    this.sortColumn = 'Id';
    this.pageNo = 1;
    this.pageSizeValue = 10;
    this.searchTxt = '';
    this.refresh();
  }
  onSearch() {
    this.pageNo = 1;
    this.pageSizeValue = 10;
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
