import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-doughnut-charts',
 // templateUrl: './doughnut-charts.component.html', 
  template: `<ejs-accumulationchart  [legendSettings]='legendSettings'>
        <e-accumulation-series-collection>
            <e-accumulation-series [dataSource]='piedata' xName='dataName' yName='dataValue' innerRadius='50%'></e-accumulation-series>
        </e-accumulation-series-collection>
    </ejs-accumulationchart>
`
})
export class DoughnutChartsComponent implements OnInit {
    public piedata: Object[] = [];  
    public legendSettings: Object;
    @Input('widgetGraphData') widgetGraphData: any;
    @Input('widgetCount') widgetCount: number = 10;

    ngOnInit(): void 
    {
        this.legendSettings = {
            visible: true,
            position: "Bottom",
            background: "white",
            border: { width: 2, color: "black" }
        };
        
        var data = [];
        data = JSON.parse(this.widgetGraphData);
        if(data != null){
            data.forEach(x => {
                x.dataValue = this.widgetCount;
              });
            this.piedata=  this.piedata.concat(data);
        }
    } 
    // ngOnChanges(): void 
    // {
    //     // if(this.widgetGraphData != null && this.widgetGraphData != undefined)
    //     // {
    //         var data = [];
    //         data = JSON.parse(this.widgetGraphData);
    //         
    //         data.forEach(x => {
    //             x.dataValue = this.widgetCount;
    //           });
    //         this.piedata=  this.piedata.concat(data);
    //     // }
    // } 
    
}
