import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-leasedocs',
  templateUrl: './leasedocs.component.html',
  styleUrls: ['./leasedocs.component.scss']
})

export class LeasedocsComponent implements OnInit {

  @ViewChild('leasecontactDocModal', { static: false }) modaldoc: ModalDirective;
  active = false;
  loading = false; pagedData: any = {
    pager: {},
    data: []
  };
  constructor() { }

  ngOnInit() {
  }
  close() {
    this.active = false;
    this.modaldoc.hide();
  }
  show(row) {
    if (row) {
      this.modaldoc.show();
    }
    this.active = true;
  }
}
