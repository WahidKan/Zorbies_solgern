import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ContactusleadsService } from './contactusleads.service';

@Component({
  selector: 'app-contactusleads',
  templateUrl: './contactusleads.component.html',
  styleUrls: ['./contactusleads.component.scss']
})
export class ContactusleadsComponent implements OnInit {
  listFilter:any = '';
  loadSave = false;
  selected: any;
  lstPageSize: any;
  offset: number;

  pageNo: number = 0;
  pageSize: number = 10;
  sortDir: string='desc';
  sortColumn: any ='FullName';

  pagedData: any = {
    pager: {},
    data: [],
  };

  constructor(private contactusleadsService: ContactusleadsService, public commonService: CommonService) { }

  ngOnInit() {
    this.getAllContactUsLeads();
    this.getPageSizes();
    
  }

  getAllContactUsLeads(){
    this.contactusleadsService.getContactUsLeadsList(this.listFilter, this.sortColumn, this.sortDir, this.pageNo, this.pageSize, false, null, null).subscribe(
      response => {
        
        this.pagedData = response;
      }
    )
  }

  updateFilter(event){

  }
  search(){
    this.refresh()
  }
  reset(){
    this.listFilter = '';
    this.pageNo = 0;
    this.pageSize = 10;
    this.sortDir='desc';
    this.sortColumn ='FullName';
    this.refresh()
  }
  setPageNo(event){

  }
  onSort($event){
    
    const sort = $event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNo = 0;
    this.refresh()
  }


  refresh() {

      this.contactusleadsService.getContactUsLeadsList(this.listFilter, this.sortColumn, this.sortDir, this.pageNo, this.pageSize).subscribe(result => {

        console.log(result);
        if (result) {
          this.pagedData = result;
        }
      }, error => {
        console.log(error)
      });
      
    }

  onSelect(){

  }
  onChange(event){
    this.pageNo = 0;
    this.refresh();
  }

  get curPage(): number {
    return this.offset;
  }
  setPage($event) {
    this.pageNo = $event.page - 1;
    this.refresh()
  }

  getPageSizes() {
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }

}
