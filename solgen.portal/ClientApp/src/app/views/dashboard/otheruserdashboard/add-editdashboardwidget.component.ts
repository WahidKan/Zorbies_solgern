import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { DashboardService, DashboardData } from '../dashboard.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { DndModule } from 'ng2-dnd';
import { isNullOrUndefined } from 'util';
import { DatePipe, DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-add-editdashboardwidget',
  templateUrl: './add-editdashboardwidget.component.html',
  styleUrls: ['./add-editdashboardwidget.component.scss']
})
export class AddEditdashboardwidgetComponent implements OnInit {
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
  companyId: number;
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
                  link: '/dashboard'
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
      this.companyId = data.companyId;
      this.companyType = data.companyType;
      this.dashboardservice.GetDashboardWidgetForAddeditforuser(fromDate, toDate, '', teamId, teamMemberId, '', false, this.companyType).subscribe(result => {
        debugger;
        this.datatss2 = [];
        this.widgetdata = result;
        this.widgetRecords = result;
        // console.log('widgetdata', this.widgetdata);
        this.tilewidget = this.widgetdata.filter(x => x.widgetGroupCode == "Tile_Widget");//1
        // console.log('tilewidget', this.tilewidget);
        ;
        this.widgetGraphData = this.widgetdata.filter(x => x.widgetGroupCode == "Graph_Widget");//3
        //;
        // console.log('widgetGraphData', this.widgetGraphData);
        this.widgetTableData = this.widgetdata.filter(x => x.widgetGroupCode == "List_Widget");//4
        // console.log('widgetTableData', this.widgetTableData);
        this.widgetListCountDate = this.widgetdata.filter(x => x.widgetGroupCode == "List_Count_widget")

        let backgroundcolor: String[] = [];
        for (i = 0; i < this.widgetListCountDate.length; i++) {
          this.datatss2.push(JSON.parse(this.widgetListCountDate[i].graphData));
        }

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
    })
  };


  Cancel() {
    this.router.navigateByUrl("/dashboard")
  }



  //GetDashboardWidgetforuser() {
  //  this.dashboardservice.GetDashboardWidgetforuser().subscribe(result => {
  //    this.widgetdata = result;
      
  //    // // console.log("ss2324s", result);
  //    if (this.widgetdata.length > 0 && this.widgetdata[0].selectedwidgetsIds != '') {
  //      this.selectedid = this.widgetdata[0].selectedwidgetsIds;


      



  //      this.selected = this.selectedid.split(',').map(function (item) {
  //        return parseInt(item, 10);
  //      });
  //    }

  //    this.widgetGroup = this.widgetdata.filter(
  //      (thing, i, arr) => arr.findIndex(t => t.widgetGroupID === thing.widgetGroupID) === i
  //    );
      
  //    this.widgetId = this.selectedid==null?null: this.selectedid.toString();
  //    // // console.log('widgetGroup', this.widgetGroup);
  //    // // console.log('selectedid', this.selectedid);
  //  })
  //};


  onDropSuccess() {
    
    let data: any[] = [];
    for (var i = 0; i < this.widgetdata.length; i++) {
     
      this.widgetdata[i].displayOrder = i;
      data.push(this.widgetdata[i],);
     
      
    }
    // // console.log('result', data);
  }
  onChange(Id: any,widgetGroup:any, event) {
    // console.log("event23432432", event);
    ;
    const checked = event.target.checked;
    //if (checked) {
   // this.selected.push(Id, checked);
   /// }
    //else {
    //  const index = this.selected.indexOf(Id);
    //  this.selected.splice(index, 1);
    //}
    this.values = this.selected==null?null: this.selected.toString();
    const count = this.selected.length;
    this.count = count;
    this.widgetId = this.selected == null ? null : this.selected.toString();

    // console.log("selected111", this.selected);
    // console.log("values22222", this.values);
    // console.log("widgetId333", this.widgetId);

    for (var i = 0; i < this.widgetdata.length; i++) {
      if (this.widgetdata[i].widgetID == Id && this.widgetdata[i].widgetGroupCode == widgetGroup ) {
        this.widgetdata[i].isSelected = checked
        this.widgetdataUserMapping.push(this.widgetdata[i]);
      }
    }
    // console.log("widgetdata111", this.widgetdata);
    // console.log("widgetdataUserMapping", this.widgetdataUserMapping);
    ;
  };


  onGraphChange(Id: any, widgetGroup: any, event) {
    // console.log("event33333333", event);
    ;
    const checked = event.target.checked;
    //this.values = this.selected == null ? null : this.selected.toString();
    //const count = this.selected.length;
    //this.count = count;
    //this.widgetId = this.selected == null ? null : this.selected.toString();
    //// console.log("selected111", this.selected);
    //// console.log("values22222", this.values);
    //// console.log("widgetId333", this.widgetId);

    for (var i = 0; i < this.widgetdata.length; i++) {
      if (this.widgetdata[i].widgetID == Id && this.widgetdata[i].widgetGroupCode == widgetGroup) {
        this.widgetdata[i].isSelected = checked
        this.widgetdataUserMapping.push(this.widgetdata[i]);
      }
    }
    // console.log("widgetdata222", this.widgetdata);
    // console.log("widgetdataUserMapping222", this.widgetdataUserMapping);
    ;
  };

  save() {
    const count = this.selected.length;
    ;
    // // console.log('widgetId', this.widgetId);
    //let data: any[] = [];
    //for (var i = 0; i < this.widgetdata.length; i++) {
    //  this.widgetdata[i].displayOrder = i;
    //  this.widgetdata[i].selectedwidgetsIds = this.widgetId;
    //   data.push(this.widgetdata[i]);
    //}

    this.dashData.data = JSON.stringify(this.widgetdataUserMapping);
    ;
    // // console.log('dashborddata', data);
    this.dashboardservice.SaveWidget(this.dashData).subscribe((result: any) => {
      ;
      // // console.log('result', result);
      this.router.navigateByUrl("/dashboard");
      //if (result.StatusCode == 200) {




      //  this.widgetId = "";
      //  this.selected = [];
      //  this.router.navigateByUrl("/dashboard")
      //  this.toaster.success(result.responseMessage);

      //}
      //else {
      //  this.widgetId = "";
      //  this.selected = [];
      //  this.toaster.success(result.responseMessage);
      //  window.location.reload();
      //}
    })  
    this.widgetId = "";
    this.selected = [];

  }
}
