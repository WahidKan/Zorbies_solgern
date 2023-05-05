import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { DashboardService } from '../../dashboard/dashboard.service';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-line-charts',
  ///templateUrl: './app-charts.component.html', 
  template: `
  <!-- <ejs-chart  [primaryXAxis]='primaryXAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Spline' xName='dataName' yName='dataValue' fill='blue' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>    -->

    <ejs-chart [primaryXAxis]='primaryXAxis'  [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='dataName' yName='dataValue' fill='blue' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>
`})
export class LineChartsComponent implements OnInit {
    public primaryXAxis: Object;
    public chartData: Object[] =  [];
    public title: string;
    public primaryYAxis: Object;
    public marker: Object;
    
  @Input('widgetGraphData') widgetGraphData: any;
  @Input('widgetType') widgetType: any;
  @Input('widgetGroupCode') widgetGroupCode: any;
  @Input('widgetCount') widgetCount: any;
  loginuserid: any;

  constructor(private commonService: CommonService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

    ngOnInit(): void 
    {
        // if(this.widgetGraphData != null && this.widgetGraphData != undefined)
        // {
            var data = [];
            
            data = JSON.parse(this.widgetGraphData);
            data.forEach(x => {
              x.dataValue = this.widgetCount;
            });
            this.chartData=  this.chartData.concat(data);
            // console.log('this.chartData = '+this.chartData);
        // }
        this.primaryXAxis = {
           valueType: 'Category'
        };
        this.marker = { visible: true, width: 10, height: 10 };
    }
}
