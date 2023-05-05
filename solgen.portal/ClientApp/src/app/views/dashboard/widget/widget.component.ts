import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { DashboardService } from '../dashboard.service';
import { debounceTime } from 'rxjs/operators';
import { debounce } from '@fullcalendar/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit ,OnChanges{

  @Input('widgetGraphData') widgetGraphData: any;
  @Input('widgetType') widgetType: any;
  @Input('widgetGroupCode') widgetGroupCode: any;
  graphData: any;
  data: any;
  loginuserid: any;
  graphWidgetData: any;
  graphColumnNames: any;
  graphColumnData: any;
  graphOption: any;

  constructor(private dashboardservice: DashboardService,private commonService: CommonService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }
  ngOnChanges() {
    this.graphData = this.widgetGraphData;
    this.GetWidgetData(this.widgetType);    
  }

  ngOnInit() {    
  }
  GetWidgetData(type: any) {
    if (type == null || type == "") {
      this.widgetType = type = "doughnut";
    }
    if (type == "doughnut") {
      this.ShowDoughnutGraph('', '');
    }
    else if (type == "bar") {
      this.ShowBarGraph('', '');
    }
    else if (type == "horizontalBar") {
      this.ShowHorizontalBarGraph('', '');
    }
  }
  ShowDoughnutGraph(fromDate, toDate) {
    this.data = JSON.parse(this.graphData);
    if (this.data != null) {
      this.graphColumnNames = this.data.map(function (a) {
        return a.dataName;
      });
      if (this.data.length == 0) {
        this.graphColumnNames = [];
        this.graphColumnData = [];
      }
      else {
        this.graphColumnData = this.data.map(function (a) {
          return a.dataValue;
        });
      }

      let backgroundcolor: String[] = [];
      let index = 0;
      for (let color of this.graphColumnNames) {
        backgroundcolor[index] = '#' + Math.floor(Math.random() * 16777215).toString(16);
        index = index + 1;
      }

      this.graphWidgetData = {
        labels: this.graphColumnNames,
        datasets: [
          {
            backgroundColor: backgroundcolor,
            data: this.graphColumnData
          }
        ]
      }
      this.graphOption = {
        legend: {
          position: 'left'
        },
        responsive: true
      }
    }
  }

  ShowBarGraph(fromDate, toDate) {
    this.data = JSON.parse(this.graphData);
    if (this.data != null) {
      this.graphColumnNames = this.data.map(function (a) {
        return a.dataName;
      });
      var arrayValues: any = [];
      arrayValues = this.data.map(function (a) {
        return parseInt(a.dataValue);
      });
      var array: any = [];
      var obj = {
        label: '',
        backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        data: arrayValues
      };
      array.push(obj);

      this.graphWidgetData = {
        labels: this.graphColumnNames,
        datasets: array
      }
      this.graphOption = {
        legend: {
          position: 'bottom'
        },
        responsive: true
      }

      /* this.graphWidgetData = {
         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
         datasets: [
           {
             label: 'My First dataset',
             backgroundColor: '#42A5F5',
             borderColor: '#1E88E5',
             data: [65, 59, 80, 81, 56, 55, 40]
           },
           {
             label: 'My Second dataset',
             backgroundColor: '#9CCC65',
             borderColor: '#7CB342',
             data: [28, 48, 40, 19, 86, 27, 90]
           }
         ]
       }*/
    }
  }

  ShowHorizontalBarGraph(fromDate, toDate) {
   /* this.graphWidgetData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    }*/
    this.data = JSON.parse(this.graphData);

    if (this.data != null) {
      this.graphColumnNames = this.data.map(function (a) {
        return a.dataName;
      });
      var arrayValues: any = [];
      arrayValues = this.data.map(function (a) {
        return parseInt(a.dataValue);
      });
      var array: any = [];
      var obj = {
        label: '',
        backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        data: arrayValues
      };
      array.push(obj);
      this.graphWidgetData = {
        labels: this.graphColumnNames,
        datasets: array
      }


      this.graphOption = {
        legend: {
          position: 'bottom'
        },
        responsive: true
      }
    }
  }
}
