import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../shared/common.service';
@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.scss']
})
export class ContactPersonComponent implements OnInit {
  @ViewChild('modalContact', { static: false }) modalContact: ModalDirective;

  addForm = this.formBuilder.group({
    id: 1,
    firstName: ['john'],
    lastName: ['jazz'],
    email: ['abc@gmail.com'],
    phone: ['0982384945'],
    mobile: ['0938588585'],
    designation: ['kkkk'],
    department: ['department']
  })
  pagedData: any = {
    pager: {
      totalItems: 4,
      currentPage: 1,
      pageSize: 10
    },
    data: [
      this.addForm.value
    ]
  }

  SelectionType = SelectionType;
  offset: number;
  lstPageSize: any;
  loading: boolean;
  sortDir: any = 'desc';
  sortColumn: any = '';
  selected = [];

  constructor(private formBuilder: FormBuilder, private commonService: CommonService) { }

  ngOnInit() {
  }
  AddContact() {
    this.modalContact.show();
  }
  close() {
    this.modalContact.hide();
  }
  Save() {
    this.modalContact.hide();
  }
  DeleteCustomer(row) {

  }
  getPageSizes() {
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }

}
