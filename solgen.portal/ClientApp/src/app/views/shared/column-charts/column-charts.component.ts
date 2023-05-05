

import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
@Component({
  selector: 'app-column-charts',
  ///templateUrl: './app-charts.component.html', 
  template: `
  <ejs-chart [primaryXAxis]='primaryXAxis' (pointRender)='pointRender($event)' [title]='title'>
    <!-- <e-axes>
        <e-axis rowIndex=1 name='yAxis1'  [majorGridLines]='majorGridLines' 
                [lineStyle]='lineStyle'>
        </e-axis>
    </e-axes>
    <e-rows>
         <e-row height=50%></e-row>
         <e-row height=50%></e-row>
    </e-rows> -->
    <e-series-collection>
        <e-series [dataSource]='chartData' type='Column'   columnWidth="0.5" columnSpacing="0.5" xName='dataName' yName='dataValue' ></e-series>
        <!-- <e-series [dataSource]='chartData' type='Spline'   columnWidth="0.5" columnSpacing="0.5" xName='dataName' yName='dataValue' width=2 ></e-series> -->

    </e-series-collection>
</ejs-chart>
`
})
export class ColumnChartsComponent implements OnInit {
  public primaryXAxis: Object;
public chartData: Object[] =  [];;
public title: string;
public majorGridLines: Object;
public primaryYAxis: Object;
@Input('widgetGraphData') widgetGraphData: any;
@Input('widgetCount') widgetCount: any;
public lineStyle: Object;
public marker: Object;
public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
            '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
    args.fill = seriesColor[args.point.index];
};
ngOnInit(): void {
    this.primaryXAxis = {
        //title: 'Months',
        valueType: 'Category',
        // interval: 1
    };
    this.primaryYAxis = {
        //minimum: 0, maximum: 50, interval: 5,
        lineStyle: { width: 0 },
        title: '',
        //labelFormat: '',
        span: 2
    };
    // this.majorGridLines = { width: 0, color: '#22b49e',};
    this.lineStyle = { width: 0 };
    this.marker = {
        visible: true, width: 10, height: 10, color: '#22b49e', border: { width: 2, color: '#22b49e' }
    }
    // if(this.widgetGraphData != null && this.widgetGraphData != undefined)
    // {
        var data = [];
        data= JSON.parse(this.widgetGraphData); 
        
        data.forEach(x => {
            x.dataValue = this.widgetCount;
          });
        this.chartData=  this.chartData.concat(data);
        // console.log('this.chartData = '+this.chartData);
    // }
}

}
