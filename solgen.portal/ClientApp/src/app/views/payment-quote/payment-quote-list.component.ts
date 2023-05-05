import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentQuoteService } from './payment-quote.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-quote-list',
  templateUrl: './payment-quote-list.component.html',
  styleUrls: ['./payment-quote-list.component.scss']
})
export class PaymentQuoteListComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  id = "";
  loading = false;
  sortDir = 'desc';
  sortColumn = 'PaymentQuoteCreatedOn';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  From: any;
  modulePermission: ModuleList;
  moduleLeasePermission: ModuleList;
  To: any;
  name: any;
  lstPageSize: any
  pageSizeValue: number;
  ContactId: any;
  loginuserid: any;
  loadSave: boolean = false;


  constructor(private router: Router, private paymentQuoteService: PaymentQuoteService,
    private commonService: CommonService, private activeRoute: ActivatedRoute, private toaster: ToastrService) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.moduleLeasePermission = this.commonService.getPermission(1020);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
  }

  addLease(email) {
    this.paymentQuoteService.getContactId(email).subscribe((res: any) => {
      if (res) {
        this.router.navigateByUrl("/lease/addlease?contactid=" + res);
      }
      else {
        this.toaster.warning("No Contact exists for " + email + ". So please add contact before adding a Lease.");
        this.router.navigateByUrl("/contact/addcontact");
      }
    })
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
    this.paymentQuoteService.getPaymentQuoteList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.paymentQuoteService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    this.paymentQuoteService.getPaymentQuoteList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.paymentQuoteService.pagedData;
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
    this.sortDir = 'desc';
    this.sortColumn = 'PaymentQuoteCreatedOn';
    this.pageSizeValue = 10;
    this.paymentQuoteService.getPaymentQuoteList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.paymentQuoteService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.paymentQuoteService.getPaymentQuoteList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.paymentQuoteService.pagedData;
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
    this.paymentQuoteService.getPaymentQuoteList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.paymentQuoteService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.paymentQuoteService.getPaymentQuoteList('', this.From, this.To, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.paymentQuoteService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

}
