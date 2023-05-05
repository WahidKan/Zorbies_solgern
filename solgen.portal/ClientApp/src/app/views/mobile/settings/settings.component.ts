import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  loadSave: boolean = false;
  private app: AppComponent
  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  logout() {
    this.loadSave = true;
    // setTimeout(() => {
    //   this.commonService.logout();
    //   this.app.ShowDialer({ phoneNo: '', visible: false });
    
    // }, 2000);
    this.commonService.logout();
    if(this.app !=null){
      this.app.ShowDialer({ phoneNo: '', visible: false });
    }
     
    this.loadSave = false;
  }
}
