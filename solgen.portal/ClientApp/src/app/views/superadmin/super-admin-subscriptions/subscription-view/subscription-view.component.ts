import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-view',
  templateUrl: './subscription-view.component.html',
  styleUrls: ['./subscription-view.component.scss']
})
export class SubscriptionViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  overview: any = {
    id: 1,
    img: 'https://stagemedia.solgenone.com/resources/uploads/ProfilePick/0.99mb_JPG.jpg',
    phone: '(612) 223-6488',
    email: 'abc@gmail.com',
    firstName: 'Brad',
    lastName: 'Bowers',
    subscriptionId: '564576879',
    subscriptionNo: 'SUB-00001',
    referenceNo: '',
    contactMail: 'abc@gmail.com',
    salePerson: '',
    repertEvery: '1 months(s)',
    activationDate: '14/4/2022',
    planAndAddonDetailsInvoice: [{
      id: 1,
      invoiceNo: 'INV-00001',
      date: '14/04/2022',
      amount: '$500.00',
      status: 'Overdue'
    }],
    notes: [{
      id: 1,
      details:''
    }]
  }





}
