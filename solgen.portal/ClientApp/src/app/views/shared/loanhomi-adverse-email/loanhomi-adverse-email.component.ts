import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-loanhomi-adverse-email',
  templateUrl: './loanhomi-adverse-email.component.html',
  styleUrls: ['./loanhomi-adverse-email.component.scss']
})
export class LoanhomiAdverseEmailComponent implements OnInit {

  sortDir = 'desc';
  sortColumn = 'Id';
  pagedData: any = {
    pager: {},
    data: []
  };

  lstPageSize: any;
  pageSizeValue: number;
  currentPage: any;
  @Input() offset: number;
  filterDate: any;

  detailRow: any = '';

  @ViewChild('adverseDetail', { static: false }) adverseDetail: ModalDirective;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.filterDate = '';
    this.pageSizeValue = 10;
    this.currentPage = 0;
    this.getPageSizes();
    this.getScheduledEmails();
  }

  getScheduledEmails() {
    this.commonService.getScheduledEmails(this.filterDate, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe((resp: any) => {
      this.pagedData = resp;
      this.offset = 1;
    });
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  setPage($event) {

    this.currentPage = $event.page - 1;
    this.getScheduledEmails();
  }
  onChange($event) {
    this.getScheduledEmails();
  }
  onSort($event) {
    const sort = $event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = $event.page - 1;
    this.getScheduledEmails();;
  }

  onSelectMethod(event) {
    let d = new Date(Date.parse(event));
    this.filterDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

  filter() {
    this.getScheduledEmails();
  }

  viewDetails(row) {
    this.detailRow = row;
    this.adverseDetail.show();
  }

  close() {
    this.detailRow = '';
    this.adverseDetail.hide();
  }

  get curPage(): number {
    return this.offset;
  }
}
