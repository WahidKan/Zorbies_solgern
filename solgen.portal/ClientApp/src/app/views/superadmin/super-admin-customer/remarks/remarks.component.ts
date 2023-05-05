import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../shared/common.service';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss']
})
export class RemarksComponent implements OnInit {
  @ViewChild('modalRemark', { static: false }) modalRemark: ModalDirective;
  addForm = this.formBuilder.group({
    id: 1,
    createdBy: ['john'],
    createdOn:['1-2-2022'],
    description:['Enter Comments Here']    
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
  constructor(private formBuilder:FormBuilder ,private commonService: CommonService) { }

  ngOnInit() {
  }
  AddRemark(){
    this.modalRemark.show();
  }
  close(){
    this.modalRemark.hide();
  }
  Save(){
    this.modalRemark.hide();
  }
  DeleteRemark(){

  }
}
