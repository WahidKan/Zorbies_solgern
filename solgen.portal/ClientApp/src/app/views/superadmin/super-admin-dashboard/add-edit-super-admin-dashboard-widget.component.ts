import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { DatePipe } from '@angular/common';
import { DashboardData, DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-add-edit-super-admin-dashboard-widget',
  templateUrl: './add-edit-super-admin-dashboard-widget.component.html',
  styleUrls: ['./add-edit-super-admin-dashboard-widget.component.scss']
})
export class AddEditSuperAdminDashboardWidgetComponent implements OnInit {
  widgetdata: any;
  widgetdataUserMapping: any[]=[];
  dashData: DashboardData = new DashboardData();
  widgetGroup: any;
  selected: any[] = [];
  widgetGroups: any[] = [[]];

  count: any;
  values: any;
  widgetId: any;
  usertype: any;
  selectedid: any;
  displayorder: any;
  show: boolean = false;
  selectedFilter = "All";
  loadSave: boolean = false;
  DashboardViewData = true;
  datatss2 = [];
  widgetRecords: any;
  tilewidget: any;
  widgetGraphData: any;
  widgetTableData: any;
  widgetListCountDate = [];
  From: any;
  TO: any;
  contentHeader :  object;
  companyType: string;


  constructor(private dashboardservice: DashboardService, private dialogService: ConfirmationDialogService,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
   ,private toaster: ToastrService,
    private datePipe: DatePipe  ) { }

  ngOnInit() {
    this.selected = [];
   
    this.initBreadCrumb();
    //this.GetDashboardWidgetforuser();
    this.onMonth();
  };
  initBreadCrumb(){
    this.contentHeader = {
      headerTitle: 'Edit Dashboard',
      actionButton: true,
      iconCssClass: '',
      breadcrumb:
      [
        {
            name: 'Dashboard',
            isLink: true,
            link: '/super-admin-dashboard'
        },
        {
            name: 'Edit Dashboard',
            isLink: false
        }
      ]
    };
  }

  onMonth() {
    this.show = false;
    this.selectedFilter = "This Month";
    var date = new Date();
    var CurrentDate = this.datePipe.transform(date, 'MM/dd/yyyy');
    var myVariable = this.datePipe.transform(date, 'dd MMM yyyy');
    var makeDate = new Date(myVariable.toString());
    makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 1));
    var myVariable12 = this.datePipe.transform(makeDate, 'MM/dd/yyyy');
    this.selectedFilter = "Last One Month" + '' + '( ' + (myVariable12 + ' - ' + CurrentDate) + ' )';
    this.GetDashboardWidgetforuser(myVariable12, CurrentDate, this.DashboardViewData)
  };


  GetDashboardWidgetforuser(fromDate: any, toDate: any, recordFilter) {
    //;
    this.loadSave = true;
    let teamId: any = null;
    let teamMemberId: any = null;
    this.commonService.getLoggedInName.subscribe(data => {
      debugger
      this.companyType = data.companyType;
      this.dashboardservice.GetDashboardWidgetForAddeditforuser(fromDate, toDate, '', teamId, teamMemberId, '', true, this.companyType).subscribe(result => {
      
        this.widgetdata = result;
        this.tilewidget = this.widgetdata.filter(x => x.graphType == "Tile_Widget");
        this.widgetTableData = this.widgetdata.filter(x => x.graphType == "List_Widget");
  
        for (var i = 0; i < this.tilewidget.length; i++) {
          if (parseInt(this.tilewidget[i].widgetCount) >= 0) {  
            this.tilewidget[i].widgetCount = this.commonService.formatAmount(this.tilewidget[i].widgetCount);
          }
        }
        //this.ManageWidgetApperance();
        if (this.widgetdata.length > 0 && this.widgetdata[0].selectedwidgetsIds != '') {
          this.selectedid = this.widgetdata[0].selectedwidgetsIds;
  
          if (this.selected.length > 0) {
            ;
            this.selected = this.selectedid.split(',').map(function (item) {
              return parseInt(item, 10);
            });
          }
  
        }
        this.From = null;
        this.TO = null;
        this.loadSave = false;
      })
    });
  };


  Cancel() {
    this.router.navigateByUrl("/super-admin-dashboard")
  }
  
  onDropSuccess() {
    
    let data: any[] = [];
    for (var i = 0; i < this.widgetdata.length; i++) {
     
      this.widgetdata[i].displayOrder = i;
      data.push(this.widgetdata[i],);
     
      
    }
  }
  onChange(Id: any,widgetGroup:any, event) {
    const checked = event.target.checked;
    this.values = this.selected==null?null: this.selected.toString();
    const count = this.selected.length;
    this.count = count;
    this.widgetId = this.selected == null ? null : this.selected.toString();

    for (var i = 0; i < this.widgetdata.length; i++) {
      if (this.widgetdata[i].widgetID == Id && this.widgetdata[i].widgetGroupCode == widgetGroup ) {
        this.widgetdata[i].isSelected = checked
        this.widgetdataUserMapping.push(this.widgetdata[i]);
      }
    }
  };


  onGraphChange(Id: any, widgetGroup: any, event) {
    const checked = event.target.checked;
    for (var i = 0; i < this.widgetdata.length; i++) {
      if (this.widgetdata[i].widgetID == Id && this.widgetdata[i].widgetGroupCode == widgetGroup) {
        this.widgetdata[i].isSelected = checked
        this.widgetdataUserMapping.push(this.widgetdata[i]);
      }
    }
  };

  save() {
    const count = this.selected.length;
    this.dashData.data = JSON.stringify(this.widgetdataUserMapping);
    this.dashboardservice.SaveWidget(this.dashData).subscribe((result: any) => {
      this.router.navigateByUrl("/super-admin-dashboard");
    })  
    this.widgetId = "";
    this.selected = [];

  }
}
