import { Component, OnInit, OnChanges, Input, HostListener } from '@angular/core';
import { UserDetails } from '../shared/common.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html'
})
export class DashboardContainerComponent implements OnInit, OnChanges {
  @Input() userinfo: UserDetails;
  userData: UserDetails;
  screen_width: any;
  mobileScreen: boolean = false;

  ngOnChanges() {
    this.userData = this.userinfo;
  }

  constructor() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
   event.target.innerWidth;
   this.screen_width = document.documentElement.clientWidth;
   if(this.screen_width < 900){
     this.mobileScreen = true;
   }else{
     this.mobileScreen = false;
   }
 }

  ngOnInit() {
    this.screen_width = document.documentElement.clientWidth;
    if(this.screen_width < 900){
      this.mobileScreen = true;
    }else{
      this.mobileScreen = false;
    }
  }
}
