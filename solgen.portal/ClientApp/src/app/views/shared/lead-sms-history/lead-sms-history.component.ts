import { Component, Input, OnInit } from '@angular/core';
import { LeadSmsHistoryService } from './lead-sms-history.service';

@Component({
  selector: 'app-lead-sms-history',
  templateUrl: './lead-sms-history.component.html',
  styleUrls: ['./lead-sms-history.component.scss']
})
export class LeadSmsHistoryComponent implements OnInit {
  @Input("leadId") leadId: number;
  @Input("subModuleName") subModuleName : string;
  historyCount : number= 0;

  smsHistoryList : any[];

  constructor(private service:LeadSmsHistoryService) { }

  ngOnInit() {
    this.getSmsLogHistory()
  }

  getSmsLogHistory()
  {

    this.service.getSmsLogHistory(this.leadId,this.subModuleName).subscribe((data : any) =>{
      if(data){

        this.smsHistoryList = data;
        this.historyCount = this.smsHistoryList.length;
      }
    })
  }

}
