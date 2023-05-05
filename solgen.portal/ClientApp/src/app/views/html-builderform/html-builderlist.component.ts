import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HtmlBuilderformService } from './html-builderform.service';
import { CommonService } from '../shared/common.service';
import { SelectionType, NgxDatatableModule, DatatableComponent } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-html-builderlist',
  templateUrl: './html-builderlist.component.html'
})
export class HtmlBuilderlistComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Input() offset: number;
  listFilter = '';
  searchTxt: any;
  selected = [];
  SelectionType = SelectionType;
  deleteId: any;
  sortColumn = 'Id';
  sortDir = 'desc';
  curPage: number;
  pageSizeValue: number;
  lstPageSize: any;
  loadSave: any;
  htmlContentListingData: any = {
    pager: {},
    data: []
  };
  htmlDataFromDatabse: any;
  fieldsName: any[] = []; 
  contentHeader: object;

  constructor(private htmlBuilderformService: HtmlBuilderformService,
    private commonService: CommonService,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService) { }

  ngOnInit() {
    //this.loadSave = true;
    this.sortColumn = 'Id';
    this.curPage = 1;
    this.listFilter = '';
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.getListingGridData();
    this.initBreadCrumb();
  }

  initBreadCrumb() {
      this.contentHeader = {
        headerTitle: 'HTML Templates',
        actionButton: true,
        iconCssClass: '',
        breadcrumb:
          [
            {
              name: 'Dashboard',
              isLink: true,
              link: '/dashboard'
            },
            {
              name: 'HTML Templates',
              isLink: false
            }
  
          ]
      };
    }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.getListingGridData();
    }
  };

  getListingGridData() {
    this.loadSave = true;
    this.selected = [];
    this.deleteId = null;
    this.htmlBuilderformService.GetHtmlContentListingData(this.listFilter, this.sortColumn, this.sortDir, this.curPage, this.pageSizeValue).subscribe(result => {
      this.htmlContentListingData = result;
      this.loadSave = false;
      this.offset = 1;
    }, error => {
      // console.log(error)
      this.loadSave = false;
    })
  };

  getIsShowColName({ row, column, value }) {    
    if (row.UsedinDocuemnt != 'NotAvilable') {
      return {
        'dispaly-none': true
      };
    }
  }

  reset() {
    this.table.selected = [];
    this.table.sorts = [];
    this.loadSave = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'Id';
    this.pageSizeValue = 10;
    this.curPage = 1;
    this.selected = [];
    this.deleteId = null;
    this.getListingGridData();
  };

  onSelect({ selected }) {
    ;
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }

    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }
    }
  };

  deleteAll() {
    
    if (this.deleteId != null && this.deleteId != "") {
      this.deleteId = this.htmlContentListingData.data.filter(x => x.UsedinDocuemnt == 'NotAvilable' && this.deleteId.includes(x.Id) ).map(x => x.Id).join(',');
      const message = `Are you sure you want to delete the selected Template(s)?`;
      this.dialogService.confirm('Delete Template(s)', message).subscribe(confirmed => {
        if (confirmed) {
          ;
          this.htmlBuilderformService.DeleteRecords(this.deleteId, 'tblHtmlTemplate').subscribe(r => {
            this.toaster.success(`Selected Template(s) has been deleted successfully.`);
            this.deleteId = "";
            this.selected = [];
            this.getListingGridData();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  };

  onChange($event) {
    this.curPage = 1;
    this.getListingGridData();
  };

  setPage($event) {
    //this.loading = true;
    var ab = $event.page;
    this.curPage = ab;
    this.getListingGridData();
  };

  deleteHtmlTemplete(row: any) {
    const message = `Are you sure you want to delete template "${row.Name}"?`;
    this.dialogService.confirm('Delete Template', message).subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;
        this.htmlBuilderformService.deleteTemplete(row.Id, 'tblHtmlTemplate').subscribe(r => {
          this.toaster.success(`Template "${row.Name}" has been deleted successfully.`);
          this.getListingGridData();
          this.loadSave = false;
        }, error => {
          this.loadSave = false;
        });
      }
    });
  };
  cloneHtmlTemplete(row: any) {
    this.loadSave = true;
    this.htmlBuilderformService.CloneTemplete(row.Id).subscribe(r => {
      this.loadSave = false;
      if(r){
        if(r==1){
          this.toaster.success(`Template "${row.Name}" has been cloned successfully.`);
          this.getListingGridData();
        }else{
          this.toaster.error(`Something went wrong.`);
        }
      }
    }, error => {
      this.loadSave = false;
    });
  };
  openFieldsPopup(row) {
    this.fieldsName = [];
    this.htmlBuilderformService.getHtmlContentFromDatabase(false, row.Id).subscribe((result: any) => {
      if (result) {
        var data = this.commonService.TryJsonParse(result);
        this.htmlDataFromDatabse = data.HtmlContent;
        //=============Gettting fields name from html==================
        var stripedHtml = this.htmlDataFromDatabse.split(" ");
        stripedHtml.forEach(item => {
          if (item.includes("data-tag")) {
            //tempArr.push(item);
            this.fieldsName.push(item);
          }
        })
        //=============================================================
      }
    })
  };

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.getListingGridData();
  };

}

