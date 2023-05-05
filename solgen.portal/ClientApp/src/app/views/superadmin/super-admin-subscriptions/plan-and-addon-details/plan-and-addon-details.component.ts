import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-and-addon-details',
  templateUrl: './plan-and-addon-details.component.html',
  styleUrls: ['./plan-and-addon-details.component.scss']
})
export class PlanAndAddonDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  planAndAddonDetails: any = [{

      id: 1,
      planAndAddon: 'CRM',
      qty: 1,
      rate: '$500.00',
      tax: '-',
      amount: '$500.00'

  }]
}
