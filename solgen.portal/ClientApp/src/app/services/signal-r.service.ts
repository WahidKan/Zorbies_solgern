import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '../views/shared/common.service';
@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  connection: signalR.HubConnection;
 
  public baseUri = `${environment.SignalRBaseUrl}`;
  constructor(private routerService: Router, private commonservice: CommonService) {

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUri)
      .build();
     
  }
  public getMessage(next) {
    this.connection.on('SendMessage', (message) => {
      next(message);
    });
  }
  public data: any;
  public data1: any;
  public hubConnection: signalR.HubConnection

  public startConnection = () => {
 
    this.connection
      .start()
      .then(
        function () {

        }
      )
      .catch(err =>  console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.connection.on('logoutuser', (data) => {
      this.data = data;   
        const basicuserinfo = JSON.parse(localStorage.getItem('userinfo'));
        let data2 = this.data.filter(x => x.id == basicuserinfo.id)[0];
      if (data2 != undefined) {
        if (basicuserinfo.id == data2.id) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("moduleList");
          localStorage.removeItem("userinfo");
         
          this.commonservice.removeConnectionbyUserID(basicuserinfo.id);
          this.routerService.navigateByUrl("/account");
        }
      }
    });
  }
}
