import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { debounce } from '@fullcalendar/core';
import { CommonService } from '../../../shared/common.service';
import { DashboardService } from '../../dashboard.service';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-listwidget',
  templateUrl: './listwidget.component.html',
  styleUrls: ['./listwidget.component.scss']
})
export class ListwidgetComponent implements OnInit, OnChanges {
  @Input('widgetGraphData') widgetGraphData: any;
  @Input() offset: number;
  @Input('widgetType') widgetType: any;
  @Input('widgetBoxClass') widgetBoxClass: any;
  graphData: any;
  data: any;
  loginuserid: any;
  columnNames: any;
  columnheading: any;
  columndata: any;
  totalRecords: any;
  currentPage: number=1;
  pageSizeValue: number = 10;
  SelectionType = SelectionType;
  selected = [];

  lstPageSize: any
  sortDir = 'desc';
  sortColumn = 'id';
  lstListingColorCode: any;



  constructor(private dashboardservice: DashboardService, private commonService: CommonService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }
  ngOnChanges() {
    debugger
    this.graphData = this.widgetGraphData;
    this.GetWidgetData();
  };

  ngOnInit() {
    this.getPageSizes();
  };

  GetWidgetData() {
    try {
      
      //this.columnNames = JSON.parse(JSON.parse(this.graphData).data.schema.DISPLAY_NAME);
      this.columnNames = JSON.parse(this.graphData);
      this.columnheading = JSON.parse(this.graphData).schema;
      this.columnheading.forEach(x=> {
        if(x.DISPLAY_NAME.includes('|'))
        {
          var index = x.DISPLAY_NAME.indexOf('|') + 1

          x.DISPLAY_NAME = x.DISPLAY_NAME.substr(index, x.DISPLAY_NAME.length);// x.DISPLAY_NAME.replace('|', '');
        }
      })
      this.columndata = JSON.parse(this.graphData).data;
      if (this.columndata.data.length > 0) {
        this.totalRecords = this.columndata[0].total_records;
      } else {
        this.totalRecords = 0;
      }
      this.offset = this.currentPage;
     /// this.data = JSON.parse(JSON.parse(this.graphData)[0].dataValue)
    }
    catch (ex) {
    }
  };

  get curPage(): number {
    return this.offset;
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  setPage($event) {
    //this.loadSave = true;
    this.currentPage = $event.page;
    //this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    //this.refresh();
  }

  onChange($event) {
    this.currentPage = 1;
    //this.refresh();
  };

  getListingColorCode(fieldValue: string) {
    this.lstListingColorCode = '';
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split('::');
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }]
      }
    }
    return this.lstListingColorCode;
  };
}
