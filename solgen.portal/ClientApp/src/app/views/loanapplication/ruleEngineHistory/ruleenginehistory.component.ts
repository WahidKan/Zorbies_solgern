import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ruleEngineHistory',
  templateUrl: './ruleenginehistory.component.html'
})
export class RuleenginehistoryComponent implements OnInit {
  loading = false;
  sortDir = 'desc';
  sortColumn = 'CreatedOn';
  pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageSizeValue: number;
  loanId: any;
  loadSave: boolean= false;
  constructor(private commonService: CommonService,
    private loanapplicationservice: LoanapplicationserviceService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loanId = id;
    });
    this.pageSizeValue = 10;
    this.getPageSizes();

    this.getRuleEngineHistoryList();
  }


  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  getRuleEngineHistoryList() {
    this.loanapplicationservice.getRuleEngineHistoryList(this.sortColumn, this.sortDir, 0, 10, this.loanId).subscribe((result: any) => {
      this.pagedData = this.loanapplicationservice.pagedData;
      //// console.log('RuleEngineHistoryListData', this.pagedData)
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onChange($event) {
    this.loading = true;
    this.loanapplicationservice.getRuleEngineHistoryList(this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loanId).subscribe(response => {
      this.pagedData = this.loanapplicationservice.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.loanapplicationservice.getRuleEngineHistoryList(this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loanId).subscribe(response => {
      this.pagedData = this.loanapplicationservice.pagedData;
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
    this.loanapplicationservice.getRuleEngineHistoryList(this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loanId).subscribe(response => {
      this.pagedData = this.loanapplicationservice.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

 

}
