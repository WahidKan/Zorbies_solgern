import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProposallistService } from '../proposallist.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-pricebooklistpopup',
  templateUrl: './pricebooklistpopup.component.html',
  styleUrls: ['./pricebooklistpopup.component.scss']
})
export class PricebooklistpopupComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('PriceBookListModelPopup', { static: false }) PriceBookListModelPopup: ModalDirective;
  PriceBookListResult: any = {
    pager: {},
    data: []
  };
  loading = false;
  sortDir = 'desc';
  sortColumn = 'createdOn';
  pageSizeValue = 10;
  loadSave: boolean = false;
  isContactUser;
  constructor(private proposallistService: ProposallistService) { }

  ngOnInit() {
    
  }

  show(obj) {
    this.getPriceBookList(obj);
    //this.historyObject = historyObject;
    this.PriceBookListModelPopup.show();
  }

  close() {
    this.PriceBookListModelPopup.hide();
  }

  getPriceBookList(obj) {
    this.proposallistService.GetPriceBookListDetail(obj,this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.PriceBookListResult = this.proposallistService.pagedData;
      this.loading = false;
      // console.log("PriceBookListResult", this.proposallistService.pagedData)
      setTimeout(() => {
  
        this.table.recalculate();
        this.table.recalculateColumns();
      }, 200);
    }, error => {
      this.loading = false;
    });
  }

  UpdateValueInListPrice(obj) {
    var ListPriceValue = obj.ListPrice;
    var PriceBookID=obj.PriceBookID
    this.proposallistService.getListPrice.next(obj);

    this.PriceBookListModelPopup.hide();
  }

  onSort(e) {

  }
  setPage(e) {

  }
}
