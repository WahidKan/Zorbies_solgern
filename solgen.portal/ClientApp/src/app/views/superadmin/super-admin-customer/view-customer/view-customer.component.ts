import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {
  overview: any = {
    id: 1,
    img: 'https://stagemedia.solgenone.com/resources/uploads/ProfilePick/0.99mb_JPG.jpg',
    phone: '(612) 223-6488',
    email: 'abc@gmail.com',
    firstName: 'Brad',
    lastName: 'Bowers',
    billingAddress: 'No Adress',
    shippingAddress: 'No Adress',
    customerType: 'Business',
    currencyCode: 'dollar',
    paymentTerm: 'due reciept',
    portalStatus: 'Disabled',
    portalLanguage: 'English',
    contactPersons: [{
      id: 1,
      name: 'james',
      designation: 'HR',
      email: 'james@gmail.com',
      phone: '--',
    }],
    subscription: {
      planName: 'CRM',
      amount: 500,
      subscriptionId: '314567776789',
      subscriptionNo: 'sub-001',
      lastBillingDate: '12-1-2022',
      nextBillingDate: '12-2-2022'
    },
    logHistory: [{
      date: '12-2-2022',
      time: '14:37',
      eventType: 'invoice added',
      eventMsg: 'inv-000002'
    }]
  }

  transactions: any = {
    subscription: [{
      id: 1,
      createdOn: '14-4-2022',
      subscriptionNo: 'sub-0001',
      reference: '--',
      planName: 'CRM',
      amount: '500$',
      nextBillingOn: '14-5-2022',
      status: 'ACTIVE'
    }],
    invoice: [{
      id: 1,
      date: '1-1-2022',
      invoiceNo: 'inv-0001',
      orderNo: '--',
      amount: '500$',
      balance: '500$',
      status: 'overdue'
    }],
    customerPayment: [{
      id: 1,
      date: '1-2-2022',
      payment: 'USD',
      reference: 'SC-110',
      paymentMode: 'Monthly',
      amountRecieved: '700',
      unUsedAmount: '500'
    }]
  }

  mail: any = {
    systemMails: [{
      id: 1,
      to: 'abc@gmail.com',
      description: 'description',
      type: 'type'
    }]
  }
  statement: any = {
    from: '12-1-2022',
    to: '2-2-2022',
    accountSummary: {
      openingBalance: '0',
      invoicedAmount: '500',
      amountRecieved: '0',
      balanceDue: '500'
    },
    customerStatement: [{
      id: 1,
      date: '1-2-2022',
      transactions: 'tr',
      details: 'details',
      amount: '0',
      payment: '0',
      balance: '0'
    }]


  }

  constructor() { }

  ngOnInit() {
  }
  overviewTab = true;
  transectionTab = false;
  mailsTab = false;
  statmentTab = false;
  updateActive(current) {
    if (current == 'overview') {
      this.overviewTab = true;
      this.transectionTab = false;
      this.mailsTab = false;
      this.statmentTab = false;
    }
    else if (current == 'transection') {
      this.overviewTab = false;
      this.transectionTab = true;
      this.mailsTab = false;
      this.statmentTab = false;
    } else if (current == 'mails') {
      this.overviewTab = false;
      this.transectionTab = false;
      this.mailsTab = true;
      this.statmentTab = false;
    } else if (current == 'statment') {
      this.overviewTab = false;
      this.transectionTab = false;
      this.mailsTab = false;
      this.statmentTab = true;
    }

  }
}
