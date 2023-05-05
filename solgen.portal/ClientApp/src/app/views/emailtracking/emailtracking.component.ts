import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailtrackingService } from './emailtracking.service';
import { CommonService } from '../shared/common.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-emailtracking',
  templateUrl: './emailtracking.component.html',
  styleUrls: ['./emailtracking.component.scss']
})
export class EmailtrackingComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent
  loading = false;
  isactivesent = "active";
  isactivefail = "";

  sortDir = 'desc';
  sortColumn = 'CreatedOn';
  currentPageNo = 0;
  sentcount = 0;
  failcount = 0;
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  type: number;
  lstPageSize: any
  pageSizeValue: number;
  From: any;
  To: any;
  loadSave: boolean = false;

  constructor(private emailtrackingService: EmailtrackingService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.type = 1;
    this.getPageSizes();
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.isactivesent = "active";
    this.isactivefail = "";
    this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.type).subscribe(response => {

      this.pagedData = this.emailtrackingService.pagedData;
      if (this.pagedData.data.length > 0) {
      this.sentcount= this.pagedData.data[0].SentRecord;
        this.failcount =this.pagedData.data[0].FailRecord;
      }
      this.loading = false;
      
    }, error => {
      this.loading = false;
    })
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  reset() {
    this.table.sorts = [];
    this.From = null;
    this.To = null;
    this.type = 1;
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.isactivesent = "active";
    this.isactivefail = "";
    this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, 0, 10, this.type).subscribe(response => {
      this.pagedData = this.emailtrackingService.pagedData;
      if (this.pagedData.data.length > 0) {
        this.sentcount = this.pagedData.data[0].SentRecord;
        this.failcount = this.pagedData.data[0].FailRecord;
      }
      this.loading = false;
     
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.currentPageNo = $event.page - 1;
    this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.type).subscribe(response => {
      this.pagedData = this.emailtrackingService.pagedData;
      if (this.pagedData.data.length > 0) {
        this.sentcount = this.pagedData.data[0].SentRecord;
        this.failcount = this.pagedData.data[0].FailRecord;
      }
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
    this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.type).subscribe(response => {
      this.pagedData = this.emailtrackingService.pagedData;
      if (this.pagedData.data.length > 0) {
        this.sentcount = this.pagedData.data[0].SentRecord;
        this.failcount = this.pagedData.data[0].FailRecord;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onChange($event) {
    this.loading = true;
    this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue,this.type).subscribe(response => {
      this.pagedData = this.emailtrackingService.pagedData;
      if (this.pagedData.data.length > 0) {
        this.sentcount = this.pagedData.data[0].SentRecord;
        this.failcount = this.pagedData.data[0].FailRecord;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
   
    this.loading = true;
    this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.type).subscribe(response => {
      this.pagedData = this.emailtrackingService.pagedData;
      if (this.pagedData.data.length > 0) {
        this.sentcount = this.pagedData.data[0].SentRecord;
        this.failcount = this.pagedData.data[0].FailRecord;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  loadtab(type) {
    this.type = type;
    if (type == "1") {
      this.isactivesent = "active";
      this.isactivefail = "";
    }
    else {
      this.isactivesent = "";
      this.isactivefail = "active";
    }
    this.loading = true;
    this.emailtrackingService.getEmailTrackingList(this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.type).subscribe(response => {
      this.pagedData = this.emailtrackingService.pagedData;
      if (this.pagedData.data.length > 0) {
        this.sentcount = this.pagedData.data[0].SentRecord;
        this.failcount = this.pagedData.data[0].FailRecord;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

}
