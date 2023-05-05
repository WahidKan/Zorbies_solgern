import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreFrontCommonService } from '../store-front-common.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PricingComponent implements OnInit {
  adOnCount: number = 0;
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
  isTextFieldType: Boolean = false;
  loadSave = false;
  annualy: boolean;
  discount: number = 0.15;
  cardType: string;

  // netMonthlyPrice:number=0;
  licenseCounter: number = 0;
  companyList: any[] = [];
  countryLists: any[] = [
    {
      text: 'USA',
      value: 'USA'
    }
  ];
  billingCycleList: any[] = [
    {
      text: 'Annually',
      value: 'annually'
    },
    {
      text: 'Monthly',
      value: 'monthly'
    }
  ]
  industryLists: any[] = [
    {
      text: 'Solar',
      value: 'Solar'
    },
    {
      text: 'Other',
      value: 'Other'
    }
  ];
  counter: number = 0;
  netPrice: any = 0;
  monthList: any[] = [
    {
      text: 'January',
      value: 'January'
    },
    {
      text: 'February',
      value: 'February'
    },
    {
      text: 'March',
      value: 'March'
    },
    {
      text: 'April',
      value: 'April'
    }
    ,
    {
      text: 'May',
      value: 'May'
    }
    ,
    {
      text: 'June',
      value: 'June'
    },
    {
      text: 'July',
      value: 'July'
    },
    {
      text: 'August',
      value: 'August'
    },
    {
      text: 'September',
      value: 'September'
    },
    {
      text: 'October',
      value: 'October'
    },
    {
      text: 'November',
      value: 'November'
    },
    {
      text: 'December',
      value: 'December'
    }
  ];
  yearList: any[] = [
    {
      text: '2022',
      value: '2022'
    }, {
      text: '2023',
      value: '2023'
    }, {
      text: '2024',
      value: '2024'
    },
    {
      text: '2025',
      value: '2025'
    }, {
      text: '2026',
      value: '2026'
    },
    {
      text: '2027',
      value: '2027'
    }, {
      text: '2028',
      value: '2028'
    },
    {
      text: '2029',
      value: '2029'
    },
    {
      text: '2030',
      value: '2030'
    },
    {
      text: '2031',
      value: '2031'
    },
    {
      text: '2032',
      value: '2032'
    },
    {
      text: '2033',
      value: '2033'
    }
    ,
    {
      text: '2034',
      value: '2034'
    },
    {
      text: '2035',
      value: '2035'
    },
    {
      text: '2036',
      value: '2036'
    },
    {
      text: '2037',
      value: '2037'
    },
    {
      text: '2038',
      value: '2038'
    },
    {
      text: '2039',
      value: '2039'
    },
    {
      text: '2040',
      value: '2040'
    },
    {
      text: '2041',
      value: '2041'
    },
    {
      text: '2042',
      value: '2042'
    },
    {
      text: '2043',
      value: '2043'
    },
    {
      text: '2044',
      value: '2044'
    },
    {
      text: '2045',
      value: '2045'
    },
    {
      text: '2046',
      value: '2046'
    },
    {
      text: '2047',
      value: '2047'
    },
    {
      text: '2048',
      value: '2048'
    },
    {
      text: '2049',
      value: '2049'
    },
    {
      text: '2050',
      value: '2050'
    }
  ];
  states: any[] = [];
  loadStateDropdown() {
    debugger;
    this.subService.getStatesList().subscribe(res => {
      this.states = this.subService.states;
    });
  }
  cardNumber(value) {

    if (value != "") {

      // Taking out values from the input
      var oneValue = parseInt(value.substring(0, 1));
      var twoValue = parseInt(value.substring(0, 2));
      var threeValue = parseInt(value.substring(0, 3));
      var fourValue = parseInt(value.substring(0, 4));

      //the if else
      if (twoValue == 34 || twoValue == 37) {
        //card is amex
        this.cardType = "fa fa-cc-amex";
      } else if (oneValue == 4) {
        //card is visa
        this.cardType = "fa fa-cc-visa";
      } else if (
        (threeValue >= 300 && threeValue <= 305) || fourValue == 3095 ||
        twoValue == 36 || twoValue == 38 || twoValue == 39) {
        //card is diners club or could be diners club
        this.cardType = "fa fa-cc-diners-club";
      } else if ((fourValue >= 2221 && fourValue <= 2720) ||
        (twoValue >= 51 && twoValue <= 55)) {
        //card is mastercard
        this.cardType = "fa fa-cc-mastercard";
      } else if (fourValue >= 3528 && fourValue <= 3589) {
        //card is jcb
        this.cardType = "fa fa-cc-jcb";
      } else if (fourValue == 6011) {
        //card is discover
        this.cardType = "fa fa-cc-discover";
      } else {
        //unknown card
        this.cardType = "";
      }
    } else {
      //unknown card
      this.cardType = "";
    }
  }
  isLoan() {
    let packages = this.Package.filter(x => x.isSelected == true);
    if (packages.length == 1 && packages[0].name == "Loan") {
      this.IndustryType.clearValidators();
      this.IndustryType.updateValueAndValidity();
      return true;
    }
    else {
      this.IndustryType.setValidators([Validators.required]);
      this.IndustryType.updateValueAndValidity();
      return false;
    }
  }
  pageTitle: string;

  // counter: number = 0;
  form = this.formBuilder.group({
    yearly: [false],
    FirstName: ['', [Validators.required, Validators.maxLength(50)]],
    LastName: ['', [Validators.required, Validators.maxLength(50)]],
    CompanyName: ['', [Validators.required, , Validators.maxLength(100)]],
    Email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.emailPattern)], this.EmailValidator()],
    PhoneNumber: ['', [Validators.required]],
    // ,Validators.pattern("^[0-9]*$")]],
    MobileNumber: ['', Validators.required],
    // Password: ['', [Validators.required,Validators.minLength(6), PasswordStrengthValidator]],
    IndustryType: [null],
    CompanyAddress1: ['', Validators.required],
    CompanyAddress2: [''],
    CompanyCity: ['', Validators.required],
    CompanyState: [null, Validators.required],
    CompanyCountry: [null, Validators.required],
    CompanyPostalCode: ['', Validators.required],
    BillingAddress1: ['', Validators.required],
    BillingAddress2: [''],
    BillingCity: ['', Validators.required],
    BillingState: [null, Validators.required],
    BillingCountry: [null, Validators.required],
    BillingPostalCode: ['', Validators.required],
    ActivationDate: [''],
    CompanyStatus: [''],
    CreatedOn: [''],
    CreatedBy: [''],
    Ref_Subscription_Id: [''],
    Ref_Company_Id: [''],
    Company_id: [''],
    CompanySubscription_Id: [''],
    Ref_Package_Id: [''],
    Ref_Package_Name: [''],
    Ref_AdOn_Id: [''],
    Ref_AdOn_Name: [''],
    SubPackageStatus: [''],
    BillingType: [''],
    ExpiryDate: [''],
    PaymentMode: [''],
    billingCycle: [null],
    billingDate: [''],
    creditCardName: ['', Validators.maxLength(100)],
    creditCardNumber: ['', [Validators.maxLength(16)]],
    //  CreditCardValidator]],
    expirationMonth: [null],
    expirationYear: [null],
    cvv: ['', [Validators.maxLength(3), Validators.pattern("^[0-9]*$")]],
    sameAsAccountInfo: [''],
    amount: ['']

  })
  get billingCycle() {
    return this.form.get('billingCycle');
  }
  get creditCardNumber() {
    return this.form.get('creditCardNumber');
  }
  get creditCardName() {
    return this.form.get('creditCardName');
  }
  get cvv() {
    return this.form.get('cvv');
  }
  get expirationMonth() {
    return this.form.get('expirationMonth');
  }
  get amount() {
    return this.form.get('amount');
  }
  updatePackage(item) {
    debugger;
    item.isSelected = !item.isSelected;
    if (item.license < 1 && item.isSelected) {
      item.count = 1;
      this.counter = this.counter + 1;
      item.license = 1;
      item.oldPrice = item.monthlyPrice;
      // this.netPrice = this.netPrice + item.monthlyPrice;
      item.netMonthlyPrice = item.netMonthlyPrice + (item.monthlyPrice * Number(item.license));
      this.calculateDiscount(item);
    }
    else if (!item.isSelected) {
      let price = item.monthlyPrice * item.license;
      // this.netPrice = this.netPrice - price;
      this.counter = this.counter - item.license;
      item.count = 0;
      item.license = 0;
      item.oldPrice = item.monthlyPrice;
      item.netMonthlyPrice = item.netMonthlyPrice + (item.monthlyPrice * Number(item.license));
      if (item.license == 0) {
        item.netMonthlyPrice = 0;
        item.discounts = 0.00;
      }
    }

    if (item.license <= 0) {
      item.isSelected = false;
    }
  }
  // cardnumber(inputtxt)
  // {
  //   var cardno ="/^(?:4[0-9]{12}(?:[0-9]{3})?)$/";
  //   if(inputtxt.value.match(cardno))
  //         {
  //       return true;
  //         }
  //       else
  //         {
  //         alert("Not a valid Visa credit card number!");
  //         return false;
  //         }
  // }
  updatedAdOn(item) {
    debugger;
    item.loading = true;
    setTimeout(() => {
      item.isSelected = !item.isSelected;
      if (item.isSelected) {
        this.counter = this.counter + 1;
        // this.netPrice = this.netPrice + item.PricePerYear;
        this.adOnCount = 1;

      }
      else if (!item.isSelected) {
        this.counter = this.counter - 1;
        // this.netPrice = this.netPrice - item.PricePerYear;
        this.adOnCount = 0;

      }
      item.loading = false;

    }, 1000);
  }
  onImgError(event) {
    event.target.src = '/assets/default_image.png'
    // defaultImage: 'assets/images/default_image.png';
  }


  // togglemyPasswordFieldType(){
  //   this.isTextFieldType = !this.isTextFieldType;
  // }
  Package: any = [
    {
      id: 1,
      color: 'bg-blue',
      image: 'https://stagemedia.solgenone.com/resources/uploads/ProfilePick/0.99mb_JPG.jpg',
      name: 'Solar',
      monthlyPrice: 42.50,
      yearlyPrice: 'billed',
      license: 0,
      oldPrice: '50.00',
      isSelected: false,
      loading: false,
      count: 0,
      netMonthlyPrice: 0,
      discounts: 0.00,
      Properties: [
        {
          proprty: 'Project Management',
          info: 'Project Management'
        },
        {
          proprty: 'Expense',
          info: 'Expense'
        },
        {
          proprty: 'Time Tracking',
          info: 'Time Tracking'
        },
        {
          proprty: 'CRM',
          info: 'CRM'
        },
        {
          proprty: 'Appointment Calender',
          info: 'Appointment Calender'
        },
        {
          proprty: 'Asset Management',
          info: 'Asset Management'
        },
        {
          proprty: 'Hiring',
          info: 'Hiring'
        },
        {
          proprty: 'HR Management',
          info: 'HR Management'
        }
      ]
    },
    {
      id: 2,
      color: 'bg-green',
      image: '',
      name: 'Loan',
      monthlyPrice: 8.50,
      yearlyPrice: 'billed',
      oldPrice: '10.00',
      isSelected: false,
      license: 0,
      count: 0,
      loading: false,
      netMonthlyPrice: 0,
      discounts: 0.00,
      Properties: [
        {
          proprty: 'Project Management',
          info: 'Project Management'
        },
        {
          proprty: 'Expense',
          info: 'Expense'
        },
        {
          proprty: 'Time Tracking',
          info: 'Time Tracking'
        },
        {
          proprty: 'Billing',
          info: 'Billing'
        },
        {
          proprty: 'General',
          info: 'General'
        },
        {
          proprty: 'Document Storage',
          info: 'Document Storage'
        }
      ]
    },
    // {
    //   id: 3,
    //   color: 'bg-purple',
    //   image: 'https://stagemedia.solgenone.com/resources/uploads/ProfilePick/0.99mb_JPG.jpg',
    //   name: 'TimeTracking Package',
    //   monthlyPrice: 46.75,
    //   yearlyPrice: 'Billed Annualy',
    //   isSelected: false,
    //   count:0,
    //   Properties: [
    //     {
    //       proprty: 'Project Management',
    //       info: 'Project Management'
    //     },
    //     {
    //       proprty: 'Time Tracking',
    //       info: 'Time Tracking'
    //     },
    //     {
    //       proprty: 'General',
    //       info: 'General'
    //     }
    //   ]
    // },
    // {
    //   id: 4,
    //   color: 'bg-yellow',
    //   image: 'https://stagemedia.solgenone.com/resources/uploads/ProfilePick/0.99mb_JPG.jpg',
    //   name: 'TWU Support',
    //   monthlyPrice: 42.50,
    //   yearlyPrice: 'Billed Annualy',
    //   oldPrice: '50.00',
    //   isSelected: false,
    //   count:0,
    //   Properties: [
    //     {
    //       proprty: 'General',
    //       info: 'General'
    //     },
    //     {
    //       proprty: 'Tracking',
    //       info: 'Tracking'
    //     },
    //     {
    //       proprty: 'Communication',
    //       info: 'Communication'
    //     }
    //   ]
    // }
  ]

  AdOns = [
    {
      id: 1,
      Name: 'Cloud Storage',
      PricePerYear: 1200.00,
      totalLicense: 1,
      properties: 'Cloud Storage',
      isSelected: false,
      color: 'bg-yellow',
    },
    {
      id: 2,
      Name: 'Additional Storage',
      PricePerYear: 3.00,
      totalLicense: 1,
      properties: 'Extra Space', isSelected: false,
      color: 'bg-green'
    },
    {
      id: 3,
      Name: 'MS Office 365 Pro',
      PricePerYear: 240.00,
      totalLicense: 1,
      properties: 'MS Office 365 Pro', isSelected: false,
      color: 'bg-purple'
    },
    {
      id: 4,
      Name: 'Webroot Security',
      PricePerYear: 24.00,
      totalLicense: 1,
      properties: 'MS Office 365 Pro', isSelected: false,
      color: 'bg-blue'
    }
  ]
  get yearly() {
    return this.form.get('yearly');
  }
  get FirstName() {
    return this.form.get('FirstName');
  }
  get LastName() {
    return this.form.get('LastName');
  }
  get CompanyName() {
    return this.form.get('CompanyName');
  }
  get Email() {
    return this.form.get('Email');
  }
  get PhoneNumber() {
    return this.form.get('PhoneNumber');
  }
  get MobileNumber() {
    return this.form.get('MobileNumber');
  }
  // get Password() {
  //   return this.form.get('Password');
  // }
  get IndustryType() {
    return this.form.get('IndustryType');
  }
  get CompanyAddress1() {
    return this.form.get('CompanyAddress1');
  }
  get CompanyCity() {
    return this.form.get('CompanyCity');
  }
  get CompanyState() {
    return this.form.get('CompanyState');
  }
  get CompanyCountry() {
    return this.form.get('CompanyCountry');
  }
  get CompanyPostalCode() {
    return this.form.get('CompanyPostalCode')
  }
  get BillingAddress1() {
    return this.form.get('BillingAddress1');
  }
  get BillingCity() {
    return this.form.get('BillingCity');
  }
  get BillingState() {
    return this.form.get('BillingState');
  }
  get BillingCountry() {
    return this.form.get('BillingCountry');
  }
  get BillingPostalCode() {
    return this.form.get('BillingPostalCode');
  }
  constructor(private formBuilder: FormBuilder,
    private subService: StoreFrontCommonService,
    private router: Router,
    // private commonService: CommonService,
    // private toaster: ToastrService
    ) { }
    
  ngOnInit() {
    debugger;
    this.pageTitle = "Add";
    // this.loadSave = true;
    // this.getPackageList();
    // this.getAdOnsList();
    this.creditCardNumber.valueChanges.subscribe(res => {
      debugger;
      this.cardNumber(res);
    })
    this.loadStateDropdown();
    this.form.get('sameAsAccountInfo').valueChanges.subscribe(res => {
      if (res) {
        let companyAddress = this.form.value;
        this.form.patchValue({
          BillingAddress1: companyAddress.CompanyAddress1,
          BillingAddress2: companyAddress.CompanyAddress2,
          BillingCountry: companyAddress.CompanyCountry,
          BillingState: companyAddress.CompanyState,
          BillingCity: companyAddress.CompanyCity,
          BillingPostalCode: companyAddress.CompanyPostalCode
        })
      }
    })
  }
  onChangeLicense(item, i) {
    debugger;
    if (Number(item.license) > 999)
      item.license = 999;
    if (Number(item.license) < 1  || !Number.isInteger(Number(item.license)))
      item.license = 0;
    item.license = Number(item.license);
    if (item.license >= 1) {
      this.Package[i].isSelected = true;
      this.counter=item.license;
    }
    if (item.license <= 0) {
      this.Package[i].isSelected = false;
      this.counter=0;
     
    }
    this.calcualtePrice(i);
  }

  isYearly(value: boolean) {
    debugger;
    this.yearly.setValue(value);
    this.annualy = this.yearly.value;
    this.Package.forEach(item => {
      if (this.annualy == true) {
        this.calculateDiscount(item);
      }
      else {
        item.discounts = 0.00;
      }
    });
  }
  subtract(index: any) {
    debugger;
    if (this.Package[index].license > 0) {
      this.counter = this.counter - 1;
      this.Package[index].license = Number(this.Package[index].license) - 1;
    }
    this.calcualtePrice(index);
  }
  calcualtePrice(index) {
    if (this.Package[index].license > 0) {
      this.Package[index].oldPrice = this.Package[index].monthlyPrice;
      this.Package[index].netMonthlyPrice =  (this.Package[index].monthlyPrice * Number(this.Package[index].license));
      this.calculateDiscount(this.Package[index]);
    } else if (this.Package[index].license <= 0) {
      this.Package[index].isSelected = false;
      this.Package[index].netMonthlyPrice = 0;
      this.Package[index].license = 0;
    }

  }
  add(index: any) {
    debugger;
    if (this.Package[index].license < 999) {
      this.counter = this.Package[index].license + 1;
      this.Package[index].license = Number(this.Package[index].license) + 1;

    }
    if (this.counter >= 1) {
      this.Package[index].isSelected = true;
    }
    this.calcualtePrice(index);
  }

  calculateDiscount(item: any) {
    if (this.annualy == true) {
      debugger;
      item.discounts = 0.15 * item.netMonthlyPrice;
    }
  }
  submit() {
    debugger
    if (this.form.valid) {
      this.loadSave = true;
      debugger;
      let selectedPackages = this.Package.filter(res => res.isSelected);
      let selectedAdOns = this.AdOns.filter(res => res.isSelected);
      let data = this.form.value;
      data.Ref_Package_Id = selectedPackages.map(x => x.id).join(",");

      data.Ref_Package_Name = JSON.stringify(selectedPackages.map(x => { return { name: x.name, id: x.id, license: x.license } }));
      // this.licenseCounter=selectedPackages.map(x=>x.license);

      data.Ref_AdOn_Id = selectedAdOns.map(x => x.id).join(",");
      data.Ref_AdOn_Name = selectedAdOns.map(x => x.Name).join(",");
      console.log(data);
      if (selectedPackages.length == 0) {
        // this.toaster.error('Please select atleast one package.');
      }
      else {
        this.subService.AddSubscription(data).subscribe(res => {
          this.loadSave = false;
          if(res){
            this.form.reset();
          }
          debugger;
          if (res == 0) {
            debugger;
          }
          else {
          }
          // this.toaster.success('You subscribed package successfully');
          // this.loadSave = false;
          // this.router.navigateByUrl("/superAdminSubscription/subscription-list");
        });
      }
    }
    else {
      this.subService.validateAllFormFields(this.form);
    }
    // this.loadSave = false;
  }
  EmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.subService.CheckEmailDuplicate(control.value)
        .pipe(
          map(res => {
            if (res == 'duplicate') {
              return { 'EmailIsDuplicate': true };
            }
          })
        );
    };
  }

  TotalPrice() {

    let netPrice = 0;
    this.licenseCounter = 0
    this.Package.forEach(item => {
      if (item.isSelected) {
        netPrice = netPrice + item.netMonthlyPrice - item.discounts;
        this.licenseCounter += item.license;
      }
    });
    this.AdOns.forEach(item => {
      if (item.isSelected) {
        netPrice = netPrice + item.PricePerYear;
        this.licenseCounter += item.totalLicense;
      }
    });
    this.amount.setValue(netPrice);
    return netPrice;
  }
  TotalDiscount() {
    let netDiscount = 0.00;
    this.Package.forEach(item => {
      if (item.isSelected)
        netDiscount = netDiscount + item.discounts;
    });
    return netDiscount;
  }


}
