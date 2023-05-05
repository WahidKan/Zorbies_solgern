import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';
import { CommonService } from '../../../shared/common.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ManageUserService } from '../../../manageuser/addedituser.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-add-edit-subscription',
  templateUrl: './add-edit-subscription.component.html',
  styleUrls: ['./add-edit-subscription.component.scss']
})
export class AddEditSubscriptionComponent implements OnInit, OnDestroy {
  adOnCount: number = 0;
  secondsCounter = interval(1000);
  isCouponApplied: boolean = false;
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
  isTextFieldType: Boolean = false;
  loadSave = false;
  annualy: boolean;
  discount: number = 0.15;
  cardType: string;
  Discounts: any;
  annualDiscount: number;
  annualLabel: string;
  CouponDiscount = 0;
  licenseCounter: number = 0;
  couponCode: string = '';
  couponAmount: number = 0;
  couponType: string = '';
  couponInterval: Date;
  amountAfterCoupon: number = 0;
  selCount: number = 0;
  companyList: any[] = [];
  visibleCoupon: boolean = true;
  countryLists: any[] = [];
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
      value: '01'
    },
    {
      text: 'February',
      value: '02'
    },
    {
      text: 'March',
      value: '03'
    },
    {
      text: 'April',
      value: '04'
    }
    ,
    {
      text: 'May',
      value: '05'
    }
    ,
    {
      text: 'June',
      value: '06'
    },
    {
      text: 'July',
      value: '07'
    },
    {
      text: 'August',
      value: '08'
    },
    {
      text: 'September',
      value: '09'
    },
    {
      text: 'October',
      value: '10'
    },
    {
      text: 'November',
      value: '11'
    },
    {
      text: 'December',
      value: '12'
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
  states1: any[] = [];
  states2: any[] = [];
  countryCode: string;
  currentDate: any;
  targetDate: any;
  cDateMillisecs: any;
  tDateMillisecs: any;
  difference: any;
  seconds: any = '00';
  minutes: any = '00';
  hours: any = '00';
  days: any = '00';
  myTimer() {
    this.currentDate = new Date();
    this.targetDate = this.couponInterval;
    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = this.targetDate.getTime();
    this.difference = this.tDateMillisecs - this.cDateMillisecs;
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
    this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

  }
  loadStateDropdown1(Id1: any) {

    let country1 = this.countryLists.find(x => x.value == Id1);
    let code1 = country1 != null ? country1.code : '';

    this.CompanyState.setValue(null);
    this.commonService.getStatesList_V1(code1).subscribe(res => {
      this.states1 = this.commonService.states;
    });
  }
  loadStateDropdown2(Id2: any) {

    let country2 = this.countryLists.find(x => x.value == Id2);
    let code2 = country2 != null ? country2.code : '';
    this.BillingState.setValue(null);
    this.commonService.getStatesList_V1(code2).subscribe(res => {
      this.states2 = this.commonService.states;
    });

  }
  getCountryDropdownList() {
    ;
    this.userService.GetCountryListIso().subscribe((result: any) => {
      this.countryLists = result;
      this.countryCode = result.CountryCode;
      //console.log("countryList", this.countryLists);
      //this.loadStateDropdown(this.countryCode);
    })
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
        this.CardType.setValue('Amex');
      } else if (oneValue == 4) {
        //card is visa
        this.cardType = "fa fa-cc-visa";
        this.CardType.setValue('Visa');

      } else if (
        (threeValue >= 300 && threeValue <= 305) || fourValue == 3095 ||
        twoValue == 36 || twoValue == 38 || twoValue == 39) {
        //card is diners club or could be diners club
        this.cardType = "fa fa-cc-diners-club";
        this.CardType.setValue('DinersClub');

      } else if ((fourValue >= 2221 && fourValue <= 2720) ||
        (twoValue >= 51 && twoValue <= 55)) {
        //card is mastercard
        this.cardType = "fa fa-cc-mastercard";
        this.CardType.setValue('MasterCard');

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
    if (packages.length == 1 && packages[0].name == "Loan Process") {
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
    CompanyCity: ['', [Validators.required, Validators.maxLength(10)]],
    CompanyState: [null, Validators.required],
    CompanyCountry: [null, Validators.required],
    CompanyPostalCode: ['', Validators.required],
    BillingAddress1: ['', Validators.required],
    BillingAddress2: [''],
    BillingCity: ['', [Validators.required, Validators.maxLength(10)]],
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
    billingCycle: [null, Validators.required],
    CardType: [''],
    billingDate: [''],
    creditCardName: ['', [Validators.required, Validators.maxLength(100)]],
    creditCardNumber: ['', [Validators.required, Validators.maxLength(16)]],
    promoCode: [''],
    expirationMonth: [null, Validators.required],
    expirationYear: [null, Validators.required],
    cvv: ['', [, Validators.required, Validators.maxLength(3), Validators.pattern("^[0-9]*$")]],
    sameAsAccountInfo: [''],
    amount: [''],
    couponCode: [''],

    hour: [''],
    min: [''],
    sec: [''],

  })
  get hour() {
    return this.form.get('hour');
  }
  get min() {
    return this.form.get('min');
  }
  get sec() {
    return this.form.get('sec');
  }
  get CardType() {
    return this.form.get('CardType');
  }
  get billingCycle() {
    return this.form.get('billingCycle');
  }
  get creditCardNumber() {
    return this.form.get('creditCardNumber');
  }
  get expirationYear() {
    return this.form.get('expirationYear');
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
  get promoCode() {
    return this.form.get('promoCode');
  }
  update_Un_Selected_Packages(item) {
    debugger;
    this.Package.forEach(itm => {
      if (itm.id != item.id)
      {
        itm.isSelected = false;
        itm.count = 0;
        itm.license = 0;
      }
    });
  }
  updatePackage(item) {
    debugger;
    this.update_Un_Selected_Packages(item);
    item.isSelected = !item.isSelected;
    // if(item.isSelected==true)
    //   this.selCount = this.selCount+1;
    // else if(item.isSelected==false)
    //   this.selCount = 0;
    if (item.license < 1 && item.isSelected) {
      item.count = 1;
      this.counter = this.counter + 1;
      item.license = 1;
      item.oldPrice = item.monthlyPrice;
      // this.netPrice = this.netPrice + item.monthlyPrice;
      //console.log(item.monthlyPrice);
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
    event.target.src = './assets/images/default_image.png'
    // defaultImage: 'assets/images/default_image.png';
  }


  // togglemyPasswordFieldType(){
  //   this.isTextFieldType = !this.isTextFieldType;
  // }
  //Package: PackageType[] =[]
  Package: any[] = [
    // {
    //   id: 1,
    //   color: 'bg-blue',
    //   image: 'https://stagemedia.solgenone.com/resources/uploads/ProfilePick/0.99mb_JPG.jpg',
    //   name: 'Solar',
    //   monthlyPrice: 42.50,
    //   yearlyPrice: 'billed',
    //   license: 0,
    //   oldPrice: '50.00',
    //   isSelected: false,
    //   loading: false,
    //   count: 0,
    //   netMonthlyPrice: 0,
    //   discounts: 0.00,
    //   Properties: [
    //     {
    //       proprty: 'Project Management',
    //       info: 'Project Management'
    //     },
    //     {
    //       proprty: 'Expense',
    //       info: 'Expense'
    //     },
    //     {
    //       proprty: 'Time Tracking',
    //       info: 'Time Tracking'
    //     },
    //     {
    //       proprty: 'CRM',
    //       info: 'CRM'
    //     },
    //     {
    //       proprty: 'Appointment Calender',
    //       info: 'Appointment Calender'
    //     },
    //     {
    //       proprty: 'Asset Management',
    //       info: 'Asset Management'
    //     },
    //     {
    //       proprty: 'Hiring',
    //       info: 'Hiring'
    //     },
    //     {
    //       proprty: 'HR Management',
    //       info: 'HR Management'
    //     }
    //   ]
    // },
    //   {
    //     PackageId: 2,
    //     color: 'bg-green',
    //     image: '',
    //     name: 'Loan',
    //     monthlyPrice: 8.50,
    //     yearlyPrice: 'billed',
    //     oldPrice: '10.00',
    //     isSelected: false,
    //     license: 0,
    //     count: 0,
    //     loading: false,
    //     netMonthlyPrice: 0,
    //     discounts: 0.00,
    //     Properties: [
    //       {
    //         proprty: 'Project Management',
    //         info: 'Project Management'
    //       },
    //       {
    //         proprty: 'Expense',
    //         info: 'Expense'
    //       },
    //       {
    //         proprty: 'Time Tracking',
    //         info: 'Time Tracking'
    //       },
    //       {
    //         proprty: 'Billing',
    //         info: 'Billing'
    //       },
    //       {
    //         proprty: 'General',
    //         info: 'General'
    //       },
    //       {
    //         proprty: 'Document Storage',
    //         info: 'Document Storage'
    //       }
    //     ]
    //   }
    //  
  ]

  AdOns: any[] = [
    // {
    //   id: 1,
    //   Name: 'Cloud Storage',
    //   PricePerYear: 1200.00,
    //   totalLicense: 1,
    //   properties: 'Cloud Storage',
    //   isSelected: false,
    //   color: 'bg-yellow',
    // },
    // {
    //   id: 2,
    //   Name: 'Additional Storage',
    //   PricePerYear: 3.00,
    //   totalLicense: 1,
    //   properties: 'Extra Space', isSelected: false,
    //   color: 'bg-green'
    // },
    // {
    //   id: 3,
    //   Name: 'MS Office 365 Pro',
    //   PricePerYear: 240.00,
    //   totalLicense: 1,
    //   properties: 'MS Office 365 Pro', isSelected: false,
    //   color: 'bg-purple'
    // },
    // {
    //   id: 4,
    //   Name: 'Webroot Security',
    //   PricePerYear: 24.00,
    //   totalLicense: 1,
    //   properties: 'MS Office 365 Pro', isSelected: false,
    //   color: 'bg-blue'
    // }
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
    private subService: SubscriptionService,
    private router: Router,
    private commonService: CommonService,
    private toaster: ToastrService,
    private userService: ManageUserService) { }
  ngOnDestroy(): void {
    this.couponIntervalSubscription.unsubscribe();
  }
  couponIntervalSubscription: Subscription;
  ngOnInit() {

    this.pageTitle = "Add";
    this.couponIntervalSubscription =
      this.secondsCounter.subscribe(n => {
        if (this.couponInterval)
          this.myTimer();
      }
      );

    this.subService.GetDiscount().subscribe((res: any) => {
      debugger;
      this.Discounts = JSON.parse(res);
      const dsnt = this.Discounts.TimeLimit[0];
      this.annualDiscount = dsnt.DiscountAmount;
      this.annualLabel = dsnt.DiscountType == 1 ? '%' : '';
      this.Discounts.CouponBase.forEach(res => {

        if (res.RuleType == 3) {
          this.couponCode = res.CouponCode;
          this.couponAmount = res.DiscountAmount;
          if (res.DiscountType == 1) {
            this.couponType = '%';
          }
          else {
            this.couponType = '';
          }
          //this.couponInterval = res.IntervalTime;
          this.couponInterval = new Date(2022, 9, 10);
          if (this.couponInterval != null) {
            // this.couponInterval = new Date(res.IntervalTime);
            this.myTimer();
          }
          else {
            this.visibleCoupon = false;
          }
        }
      })
    });


    // this.loadSave = true;
    // this.getPackageList();
    // this.getAdOnsList();
    this.getCountryDropdownList();
    this.subService.GetAddOn().subscribe((res: any) => {

      let addOn = <AddOn[]>JSON.parse(res);
      this.AdOns = [];
      addOn.forEach((item: AddOn) => {
        this.AdOns.push({
          id: item.AddOnId,
          Name: item.AddOnName,
          PricePerYear: item.AddOnCost,
          totalLicense: 1,
          properties: item.AddOnShortDesc,
          isSelected: false,
          color: ''
        })
      })
    })
    this.subService.GetPackage().subscribe((res: any) => {

      let packages = <PackageType[]>JSON.parse(res);
      this.Package = [];
      packages.forEach((item: PackageType) => {

        this.Package.push({
          id: item.PackageId,
          color: 'bg-blue',
          image: item.AttachmentPath,
          name: item.PackageName,
          monthlyPrice: item.PackageCost,
          yearlyPrice: 'billed',
          license: 0,
          oldPrice: 0,
          isSelected: false,
          loading: false,
          count: 0,
          netMonthlyPrice: 0,
          discounts: 0.00,
          PackageShortDesc: item.PackageShortDesc,
        })
      })
    })
    this.creditCardNumber.valueChanges.subscribe(res => {

      this.cardNumber(res);
    })
    // this.loadStateDropdown();
    this.form.get('sameAsAccountInfo').valueChanges.subscribe(res => {
      if (res) {

        let companyAddress = this.form.value;
        // this.loadStateDropdown2(this.CompanyCountry.value);
        this.states2 = this.states1;
        this.form.patchValue({
          BillingAddress1: companyAddress.CompanyAddress1,
          BillingAddress2: companyAddress.CompanyAddress2,
          BillingCountry: companyAddress.CompanyCountry,
          BillingState: companyAddress.CompanyState,
          BillingCity: companyAddress.CompanyCity,
          BillingPostalCode: companyAddress.CompanyPostalCode
        })
      }
      else {
        this.form.patchValue({
          BillingAddress1: null,
          BillingAddress2: null,
          BillingCountry: null,
          BillingState: null,
          BillingCity: null,
          BillingPostalCode: null
        })
      }
    })
  }
  onChangeLicense(item, i) {

    this.update_Un_Selected_Packages(item);
    if (Number(item.license) > 999)
      item.license = 999;
    if (Number(item.license) < 1 || !Number.isInteger(Number(item.license)))
      item.license = 0;
    item.license = Number(item.license);
    if (item.license >= 1) {
      this.Package[i].isSelected = true;
      this.counter = item.license;
    }
    if (item.license <= 0) {
      this.Package[i].isSelected = false;
      this.counter = 0;

    }
    this.calcualtePrice(i);
  }

  isYearly(value: boolean) {

    this.yearly.setValue(value);
    this.annualy = this.yearly.value;
    this.Package.forEach(item => {
      if (this.annualy == true) {
        this.calculateDiscount(item);
      }
      else {
        this.MonthlyDiscount(item);
      }
    });
  }
  MonthlyDiscount(item: any) {
    this.Discounts.TimeLimit.forEach(res => {
      if (!this.annualy) {
        // this.annualDiscount=res.DiscountAmount;
        if (res.DiscountType == 1)
          item.discounts -= (res.DiscountAmount / 100) * item.netMonthlyPrice;
        else
          item.discounts -= res.DiscountAmount;
      }
    })
  }
  subtract(item, index: any) {
    this.Package.forEach(itm => {
      if (itm.id != item.id)
      {
        if(!itm.isSelected)
        {
          itm.isSelected = false;
          itm.count = 0;
          itm.license = 0;
        }
      }
    });
    if (this.Package[index].license > 0) {
      this.counter = this.counter - 1;
      this.Package[index].license = Number(this.Package[index].license) - 1;
    }
    //this.update_Un_Selected_Packages(item);
    this.calcualtePrice(index);
  }
  calcualtePrice(index) {
    if (this.Package[index].license > 0) {
      this.Package[index].oldPrice = this.Package[index].monthlyPrice;
      this.Package[index].netMonthlyPrice = (this.Package[index].monthlyPrice * Number(this.Package[index].license));
      this.calculateDiscount(this.Package[index]);
    } else if (this.Package[index].license <= 0) {
      this.Package[index].isSelected = false;
      this.Package[index].netMonthlyPrice = 0;
      this.Package[index].license = 0;
    }

  }
  add(item, index: any) {

    this.update_Un_Selected_Packages(item);
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

    //console.log(item);
    // if (this.annualy == true) {
    //   
    //   item.discounts = 0.15 * item.netMonthlyPrice;
    // }
    item.discounts = 0;
    this.Discounts.LicenseBase.forEach(res => {
      if (item.license >= res.MinRange && item.license <= res.MaxRange) {
        if (res.DiscountType == 1)
          item.discounts += (res.DiscountAmount / 100) * item.netMonthlyPrice;
        else
          item.discounts += res.DiscountAmount;
      }
    })
    this.Discounts.AmountBase.forEach(res => {
      if (item.monthlyPrice >= res.MinRange && item.monthlyPrice <= res.MaxRange) {
        if (res.DiscountType == 1)
          item.discounts += (res.DiscountAmount / 100) * item.netMonthlyPrice;
        else
          item.discounts += res.DiscountAmount;
      }
    })
    this.Discounts.TimeLimit.forEach(res => {
      if (this.annualy == true) {
        // this.annualDiscount=res.DiscountAmount;
        if (res.DiscountType == 1)
          item.discounts += (res.DiscountAmount / 100) * item.netMonthlyPrice;
        else
          item.discounts += res.DiscountAmount;
      }
    })
    // this.Discounts.CouponBase.forEach(res=>{
    //   
    //  if(res.RuleType==3){
    //   this.couponCode=res.CouponCode;
    //   this.couponAmount=res.DiscountAmount;
    //   if(res.DiscountType==1)
    //   {
    //     this.couponType='%';
    //   }
    //   else{
    //     this.couponType='ddd';
    //   }
    //   this.couponInterval=res.IntervalTime;
    //  }
    // })
    // else if(res.RuleType==2 && item.monthlyPrice>=res.MinRange && item.monthlyPrice<=res.MaxRange){
    //   item.discounts = (res.DiscountAmount/100) * item.netMonthlyPrice;
    // }
    // else if(res.RuleType==4 && this.annualy==true){
    //   this.annualDiscount=res.DiscountAmount;
    //   item.discounts = (res.DiscountAmount/100) * item.netMonthlyPrice;
    // }

    // if(item.license>=this.Discounts.license && item.license<=10){

    // }
  }
  submit() {
    if (this.form.valid) {
      this.loadSave = true;

      let selectedPackages = this.Package.filter(res => res.isSelected);
      let selectedAdOns = this.AdOns.filter(res => res.isSelected);
      let data = this.form.value;
      data.Ref_Package_Id = selectedPackages.map(x => x.id).join(",");

      data.Ref_Package_Name = JSON.stringify(selectedPackages.map(x => { return { name: x.name, id: x.id, license: x.license } }));
      // this.licenseCounter=selectedPackages.map(x=>x.license);
      data.NoOfLicense = this.licenseCounter;
      // data.Ref_Package_Name=
      data.Ref_AdOn_Id = selectedAdOns.map(x => x.id).join(",");
      data.Ref_AdOn_Name = selectedAdOns.map(x => x.Name).join(",");
      //console.log(data);
      if (selectedPackages.length == 0) {
        this.toaster.error('Please select atleast one package.');
        this.loadSave = false;
      }
      else {
        this.subService.AddSubscription(data).subscribe((res: any) => {
          this.loadSave = false;
          ;
          if (res.statusCode == 200) {
            this.toaster.success('Company ' + '"' + data.CompanyName + '"' + ' has been added successfully.');
            this.router.navigateByUrl("/superAdminSubscription/subscription-list");
          }
          else {
            this.toaster.error("Exception in subscription of new company");
          }
          this.loadSave = false;
        });
      }
    }
    else {
      this.commonService.validateAllFormFields(this.form);
    }
    // this.loadSave = false;
  }
  CouponClose() {
    this.visibleCoupon = false;
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
  copyCouponCode() {
    // this.Url = 'marhoom ki yad ma';

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.couponCode;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toaster.success('Coupon Code is copied');
  }
  PromoDiscountRemove() {
    this.form.get('promoCode').setValue('');
    this.isCouponApplied = false;

  }
  applyCoupon(promoCode: string) {
    debugger;
    if (promoCode == this.couponCode) {
      this.isCouponApplied = true;
      this.toaster.success('Promo code is applied successfully.');
    }
    else if (promoCode == '') {
      this.toaster.error('Please enter promo code.');
    }
    else if (promoCode != this.couponCode) {
      this.toaster.error('Promo code is not valid.')
    }
  }
  subTotal() {
    let netPrice = 0;
    this.licenseCounter = 0
    this.Package.forEach(item => {
      if (item.isSelected) {
        netPrice = netPrice + item.netMonthlyPrice;
        this.licenseCounter += item.license;
      }
    });
    this.AdOns.forEach(item => {
      if (item.isSelected) {
        netPrice = netPrice + item.PricePerYear;
        this.licenseCounter += item.totalLicense;
      }
    });
    // this.amount.setValue(netPrice);
    return netPrice;
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
    if (this.isCouponApplied == true) {
      this.Discounts.CouponBase.forEach(res => {
        if (res.CouponCode == this.promoCode.value) {
          if (res.DiscountType == 1) {
            this.CouponDiscount = (res.DiscountAmount / 100) * netPrice;
            netPrice = netPrice - this.CouponDiscount;
          }
          else {
            netPrice = netPrice - res.DiscountAmount;
          }
        }
      })
    }


    this.amount.setValue(netPrice);
    return netPrice;
  }
  TotalDiscount() {
    let netDiscount = 0.00;
    this.Package.forEach(item => {
      if (item.isSelected)
        netDiscount = netDiscount + item.discounts;
    });
    if (this.isCouponApplied == true) {
      netDiscount = netDiscount + this.CouponDiscount;
    }

    return netDiscount;
  }
  // getPackageList() {
  //   
  //   this.subService.GetPackageList().subscribe((res: any) => {
  //     
  //     this.Package = JSON.parse(res);
  //   })
  // }
  // getAdOnsList() {
  //   
  //   this.subService.GetAdOnsList().subscribe((res: any) => {
  //     
  //     this.AdOns = JSON.parse(res);
  //   })
  // }
}
class PackageType {
  PackageId: number;
  PackageName: string;
  Features: string;
  NoOfUsers: number;
  PackageUnit: string;
  CACost: number;
  PMCost: number;
  NUCost: number;
  StatusId: number;
  AttachmentPath: string;
  ExternalLink: string;
  LOGGED_USER_ID: number;
  PackageShortDesc: string;
  PackageCost: number;
  PerUserPrice: number;
  NoOfLicenses: number;
  PMLicense: number;
  NULicense: number;
  CADiscount: number;
  PMDiscount: number;
  NUDiscount: number;
  CADiscountType: number;
  PMDiscountType: number;
  NUDiscountType: number;
  ModuleId: number;
  Modules: Modules[] = [];
  isSelected: boolean;

}
class Modules {
  ModuleId: number;
  ModuleName: string;
  ModuleDesc: string;
  Units: Units[] = [];
}
class Units {
  UnitId: number;
  UnitName: string;
  UnitQuantity: number;
  UnitTypeCode: string;
  IsExtraAllowed: boolean;
  ExtraUnitPrice: number;
  IsSubscribed: boolean;
  UnitValue: number;
}
class AddOn {
  AddOnCost: number;
  AddOnCostAnnualDiscounted: number;
  AddOnDesc: string;
  AddOnFeatures: string;
  AddOnId: number;
  AddOnName: string;
  AddOnShortDesc: string;
  AddOnTypeCode: number;
  AddonType: string;
  IsDiscountApply: number;
  IsRecurring: boolean;
  IsSubscribed: boolean;
  Modules: Modules[] = [];
}
