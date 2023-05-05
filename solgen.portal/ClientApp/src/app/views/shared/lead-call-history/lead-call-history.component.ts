import { Component, Input, OnInit } from '@angular/core';
import { CommonService, DailerParam } from '../common.service';
import { LeadCallHistoryService } from './lead-call-history.service';

@Component({
  selector: 'app-lead-call-history',
  templateUrl: './lead-call-history.component.html',
  styleUrls: ['./lead-call-history.component.scss']
})
export class LeadCallHistoryComponent implements OnInit {
  @Input("leadId") leadId: any;
  @Input("subModuleName") subModuleName : any;
  callHistoryList : any[];
  historyCount : number= 0;
  constructor(private service:LeadCallHistoryService,private commonService:CommonService) { }

  ngOnInit() {
    this.GetLeadCallHistory();
  }
  openDailer(phoneNumber : string){
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    this.commonService.SetdialerNumber = new DailerParam(phoneNumber , userinfo['companyId'], userinfo['id'], this.subModuleName, this.leadId);


  }

  GetLeadCallHistory(){
    
    this.service.GetLeadCallHistory(this.leadId,this.subModuleName).subscribe((data : any) =>{
      if(data){
        this.callHistoryList = data;
        this.historyCount = this.callHistoryList.length;
      }
    })
  }
}
