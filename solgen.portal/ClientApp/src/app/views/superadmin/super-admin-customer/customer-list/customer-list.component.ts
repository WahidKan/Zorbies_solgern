import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../shared/common.service';
import { ConfirmationDialogService } from '../../../shared/confirmation-dialog/confirmation-dialog.service';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  isAdd: boolean = true;
  isDelete: boolean = true;
  selected = [];
  pagedData: any = {
    pager: {
      totalItems: 4,
      currentPage: 1,
      pageSize: 10
    },
    data: [{
      id: 1,
      type: 'Individual',
      name: 'pater parker',
      companyName: '--',
      email: 'paterparker@example.com',
      receivable: '500.00',
    },{
      id: 1,
      type: 'Company',
      name: 'sam',
      companyName: 'Smart Green',
      email: 'sam@example.com',
      receivable: '300.00',
    },{
      id: 1,
      type: 'Company',
      name: 'James bond',
      companyName: '007',
      email: 'jamesbond@example.com',
      receivable: '540.00',
    },{
      id: 1,
      type: 'Company',
      name: 'Vance',
      companyName: 'Cric ICC',
      email: 'icc@example.com',
      receivable: '530.20',
    }],
  };
  SelectionType = SelectionType;
  offset: number;
  lstPageSize: any;
  loading: boolean;
  sortDir: any = 'desc';
  sortColumn: any = 'CreatedAt';
  deleteId: string;
  isAddForm = false;

  packageTypes: any[] = [
    {
      text: 'package 1',
      value: 'package 1'
    },
    {
      text: 'package 2',
      value: 'package 2'
    },
    {
      text: 'package 3',
      value: 'package 3'
    }
  ]
  constructor(
    private router: Router,
    private commonService: CommonService,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPageSizes();
  }

  getPageSizes() {
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }
  updateFilter(event) {

  }

  search() {

  }

  reset() {

  }

  AddNew() {

  }

  DeleteCustomer(row) {

  }
  onDeleteMultipleCustomer() {

  }

  SetPackageTypesValue(masternameId: string) {

  }

  restPackageTypesddl() {

  }
}
