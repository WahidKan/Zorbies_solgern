import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.scss']
})
export class RecentActivitiesComponent implements OnInit {

  recentActivityList: RecentActivity[]=[{
    title:'Invoice Created-INV-00001',
    details:'Brand',
    date: '29/4/2022',
    time: '11:00',
  },
  {
    title:'Subscription has been created for th plan - CRM',
    details:'Brand',
    date: '23/4/2022',
    time: '9:00',
  },
  {
    title:'Subscription has been created for th plan - CRM',
    details:'Brand',
    date: '23/4/2022',
    time: '9:00',
  }]


  constructor() { }

  ngOnInit() {
  }



}


export class RecentActivity{
  title: string;
  details: string;
  date: any;
  time: any;
}
