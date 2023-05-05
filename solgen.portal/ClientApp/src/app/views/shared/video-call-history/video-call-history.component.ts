import { VideoCallHistoryService } from './videocall.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-video-call-history',
  templateUrl: './video-call-history.component.html',
  styleUrls: ['./video-call-history.component.scss']
})
export class VideoCallHistoryComponent implements OnInit {
  @Input("RefId") RefId: any;
  @Input("subModuleName") subModuleName : any;
  callHistoryList : any[];
  historyCount : number= 0;
  constructor(private service:VideoCallHistoryService,private commonService:CommonService) { }

  ngOnInit(){
    this.GetVideoCallHistory();
  }

  GetVideoCallHistory(){
    this.service.GetVideoCallHistory(this.RefId,this.subModuleName).subscribe((data : any) =>{
      if(data){
        ;
        this.callHistoryList = data;
        this.callHistoryList.forEach(x=>{
          if(x.ParticipantList != null)
          {
            ;
            x.ParticipantList=JSON.parse(x.ParticipantList);
          }
          else{
            x.ParticipantList=[];
          }
        })
        this.historyCount = this.callHistoryList.length;
      }
    })
  }
  getParticipents(list) {
    if (list !=null) {
     return list.map(x => x.ParticipantIdentity).join(',');
    }
    else
    {
      return '';
    }
  }
}
