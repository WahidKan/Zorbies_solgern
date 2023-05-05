import { Component, OnInit,ViewChild } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { SolgenRuleEngineService } from '../../solgen-rule-engine/solgen-rule-engine.service';
import { DocumentMakerAdddocumentTypeComponent } from '../document-maker-adddocument-type/document-maker-adddocument-type.component';
import { DocumentMakerService } from '../services/document-maker.service';

@Component({
  selector: 'app-document-maker-list',
  templateUrl: './document-maker-list.component.html',
  styleUrls: ['./document-maker-list.component.scss']
})
export class DocumentMakerListComponent implements OnInit {
  @ViewChild('addEditModal', { static: false })
  AddEditDocumentTyoe:DocumentMakerAdddocumentTypeComponent
  list:any[];
  listFilter: string = '';
  pageSizeValue: number = 10;
  SelectionType = SelectionType;
  loadSave: boolean = false;
  isEdit: boolean = false;
  selected = [];

  pagedData: any = {
    pager: {},
    data: [],
  };
  myTime: Date;
  timepickerVisible = true;
  offset: number;
  lstPageSize: any;
  loading: boolean

  ;
  currentPage: any;
  sortDir: any;
  sortColumn: any;
  deleteId: string;
  isAddForm = false;
  timezoneList: any;
  documentMakerParams = {
    filter: '',
    sortColumn:'id',
    sortDir: 'desc',
    page: 0,
    pageSize: 15,
  };
  documentIds: string ="";
  contentHeader: object;
  constructor( private DocumentMakerSer:DocumentMakerService,    private dialogService: ConfirmationDialogService, private toaster: ToastrService,  public commonService: CommonService, ) { }

  ngOnInit() {
  //alert("list");
  this.getDocumentMakerList();
  this.getPageSizes();
  this.initBreadCrumb();
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Documents',
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
            name: 'Documents',
            isLink: false
          }
  
        ]
    };
  }
  showpopup()
  {
   // alert("get");
     this.AddEditDocumentTyoe.showpopup();
  }

  showpopupEdit(row: any)
  {
   // alert("get");
     this.AddEditDocumentTyoe.showpopupEdit(row);
  }



  getDocumentMakerList()
  {
    this.loadSave = true;
    this.DocumentMakerSer.getDocumentMakerList(this.documentMakerParams).subscribe(

      res=> {
        this.pagedData = {
          data: res.data,
          pager: res.pager,

        };
        this.offset = 1;
        this.loadSave = false;
      },
      (err) => {
        this.loadSave = false;
      }
    )
  }

  getIsShowColName({ row, column, value }) {    
    if (row.MappingRouteStatus != 'NotAvilable') {
      return {
        'dispaly-none': true
      };
    }
  }

  documentListRefresh() {
    this.refresh();
  }
  getPageSizes() {
    //alert("testf");
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }
  get curPage(): number {
    return this.offset;
  }



  setPage($event) {
    this.loading = true;
    this.currentPage = 1;
    this.documentMakerParams.page = $event.page - 1;
    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0];
    this.documentMakerParams.sortDir = sort.dir;
    this.documentMakerParams.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }
  onChange($event) {
    this.currentPage = 1;
    this.refresh();
  }

  refresh() {
    this.loadSave = true;
    this.DocumentMakerSer.getDocumentMakerList(this.documentMakerParams).subscribe(
      (response) => {
        this.pagedData = {
          data: response.data,
          pager: response.pager,
        };
        this.loadSave = false;
      },
      (error) => {
        this.loadSave = false;
      }
    );
  }
  search() {
    this.currentPage = 1;
    this.documentMakerParams.filter = '';
    if (this.listFilter.trim().length > 0) {
      this.documentMakerParams.filter = this.listFilter;
    }

    this.refresh();
  }
  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  reset() {
    this.listFilter = '';
    this.documentMakerParams.filter = '';
    this.currentPage = 1;
    this.refresh();
  }



  deleteDocument(row) {
    const message = `Are you sure you want to delete this document ?`;
    this.dialogService.confirm('DELETE DOCUMENT', message).subscribe((confirmed) => {
      if (confirmed) {
        this.loadSave = true;

        this.DocumentMakerSer.deleteDocumentMaker(row.id).subscribe(
          (result) => {
            this.loadSave = false;
            this.toaster.success(`Document has been deleted successfully.`);
            this.deleteId = '';
            this.refresh();
          },
          (error) => {},
          () => {
            this.loadSave = false;
          }
        );
      }
    });
  }
  ViewDocument(){
    this.toaster.info("In progress");
  }
  EditDocument(){
    this.toaster.info("In progress");
  }

  deleteMultipleDocs() {
    if (this.documentIds != null && this.documentIds != "") {
      this.documentIds = this.pagedData.data.filter(x => x.MappingRouteStatus == 'NotAvilable' && this.documentIds.includes(x.id) ).map(x => x.id).join(',');
      const message = `Are you sure you want to delete the selected document(s)?`;
      this.dialogService.confirm('Delete Document(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.DocumentMakerSer.deleteMultipleDocuments(this.documentIds).subscribe(r => {
            this.toaster.success(`Document(s) has been deleted successfully.`);
            this.documentIds = "";
            this.selected = [];
            this.refresh();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }

  onSelect({ selected }) {
    
    if (this.documentIds == "" || this.documentIds == null || this.documentIds == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);

      for (let i = 0; i < selected.length; i++) {
        this.documentIds += selected[i].id + ",";
      }

    }
    else {
      this.documentIds = null;
      this.documentIds = "";
      for (let i = 0; i < selected.length; i++) {
        this.documentIds += selected[i].id + ",";
      }
    }
  }
}
