import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact, ContactService } from './contact.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  ContactList: Contact[];
  SearhName: string
  SearchFromDate: Date
  SearchToDate: Date
  modulePermission: ModuleList;
  moduleLeasePermission: ModuleList;
  loading = false;
  sortDir = 'asc';
  sortColumn = 'ContactBussinessName';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  From: any;
  To: any;
  name: any;
  lstPageSize: any
  pageSizeValue: number;
  isDashBoard = false;
  loginuserid: any;
  user = false;
  permission: boolean;
  loginusertype: any;
  loadSave: boolean = false;
  constructor(private contactService: ContactService, private commonService: CommonService, private activeRoute: ActivatedRoute)
  {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.permission = this.modulePermission.roleModuleReadFlag;
    this.moduleLeasePermission = this.commonService.getPermission(1020);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.loginusertype = userdetail.userType;
      if (userdetail.userType == 'usertype01' || userdetail.userType == 'usertype06') {
        this.user = true;
      }
    });

  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.getContactList();
    this.refresh();
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onChange($event) {
    this.loading = true;
    this.contactService.getContactList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(response => {
      this.pagedData = this.contactService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    this.contactService.getContactList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(response => {
      this.pagedData = this.contactService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.table.sorts = [];
    this.From = null;
    this.To = null;
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'asc';
    this.sortColumn = 'ContactBussinessName';
    this.pageSizeValue = 10;
    this.contactService.getContactList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, 10, this.loginuserid, this.isDashBoard).subscribe(response => {
      this.pagedData = this.contactService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  getContactList() {
    this.loading = true;
    this.contactService.getContactList(this.name, this.From, this.To, this.sortColumn, this.sortDir, 0, 10, this.loginuserid, this.isDashBoard).subscribe((result: any) => {
      this.loading = false;
      if (result) {
        this.ContactList = result;
      }
    })
  }

  setPage($event) {
    this.loading = true;
    this.contactService.getContactList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(response => {
      this.pagedData = this.contactService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.contactService.getContactList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(response => {
      this.pagedData = this.contactService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.contactService.getContactList('', this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.isDashBoard).subscribe(response => {

      this.pagedData = this.contactService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
}
