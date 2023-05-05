import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { leadConvertModelOpportunity, LeadlistService } from './leadlist.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { LeadService } from './lead.service';
import { ConfigurationsettingService } from '../configurationsetting/configurationsetting.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-leadconvertpopup',
  templateUrl: './leadconvertpopup.component.html',
  styleUrls: ['./leadconvertpopup.component.scss']
})
export class LeadconvertpopupComponent implements OnInit {
  SelectionType = SelectionType;
  companyType: any;
  loadSave = false;
  pageSizeValueLeadconvert: number;
  pagedDataLeadconvert: any = {
    pager: {},
    data: []
  };
  selectedleadconvert: any = [];
  listFilter = '';
  sortColumn = 'LeadId';
  sortDir = 'desc';
  pageSizeValue: number;
  AssociatedproductpagedData: any = {
    pager: {},

    data: []
  };
  mapAccount: boolean = false;
  contactAccountId: any;
  leaddata: any;
  lstPageSize: any;
  lstPageSizeLeadconvert: any;
  moduleName = 'crm';
  submoduleName = 'lead';
  pagenames: any;
  lstaccounttype: any;
  isloanapp: boolean = false;
  isopportuinity: boolean = false;
  selected = [];
  productassociateid: string = "";
  selectedassociateprouct: any = [];
  contactid: string = "";
  pagedData: any = {
    pager: {},
    data: []
  };
  previousContact: any
  previousAccount: any
  companyId: any;
  userId: any;
  leadId: any;
  displayCheck12
  accountMessage: any;
  emailDuplicated:any=false;
  accountDuplicated:any=false;
  contactMessage: any;
  lstPageSizeAssociateProduct: any;
  @Input() offsetAssociateProductList: number;
  pageSizeValueAssoProdList: number;
  currentPageAssoProdList: number;
  sortDirAssoProdList = 'desc';
  sortColumnAssoProdList = 'CreatedOn';
  pageSizeValueAssociateProduct: number;
  isAccountExisting: boolean = false;
  isContactExisting: boolean = false;
  accountlist: any;
  searchText = '';
  len: any = 0;
  contactlist: any;
  contactsearchText = '';
  contactlen: any = 10;
  leadconvertModel: leadConvertModelOpportunity = new leadConvertModelOpportunity();
  @ViewChild('table34', { static: false }) tableModalcontact: DatatableComponent;
  @ViewChild('table12', { static: false }) tableModal: DatatableComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('makeappointment', { static: false }) convertleadmodel: ModalDirective;
  @ViewChild('product', { static: false }) productModal: ModalDirective;
  isleadconvert: boolean = false;
  constructor(private leadlistService: LeadlistService,
    private configurationsettingService: ConfigurationsettingService,
    private dialogService: ConfirmationDialogService, private leadService: LeadService, private fb: FormBuilder,
    private commonService: CommonService, private router: Router,
    private activeRoute: ActivatedRoute
    , private toaster: ToastrService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.companyType = userdetail.companyType;
    });
  }

  ngOnInit() {

  }


  show(id: any) {
    this.addForm.reset();

    debugger
    this.pageSizeValueLeadconvert = 10;

    if (id != null) {
      this.leadId = id;
      this.showpopup(id);

    }
    this.getconverttype();


  }
  onSortLeadconvert(e) {

  }
  setPageLeadconvert(e) { }
  showpopup(id) {
    this.accountMessage = null;
    this.contactMessage = null;
    this.isAccountExisting = false;
    this.isContactExisting = false;
    this.isleadconvert = false;
    if (this.companyType == "companytypeSolarInstall" || this.companyType=="companytypeCRMLoanInstall") {
      let requiredField;
      

      this.leadlistService.getLeadById(id, false).subscribe(resp => {
        // console.log("Lead DEtails", resp);
        let leaddata = resp;
        this.leadlistService.checkRequiredDataOnLeadConvert(id).subscribe(resp2 => {
          if (resp2) {
            requiredField = resp2;

            let count = 0
            let message = "Fill ";
            if (requiredField) {

              requiredField.forEach(element => {
                if (leaddata[element.PrimaryTableColumn] == null && element.PrimaryTableColumn != "StatusName" && element.PrimaryTableColumn != "LeadSourceName") {
                  count++;
                  message += '"'+element.displayName + '" , ';
                }
              });
              message = message.replace(/,\s*$/, "");

              if (message.split(',').length > 1) {

                message = message.replace(/,(?=[^,]*$)/, ' and ');

              }
              message += "  field(s) value before converting the lead.";
            }
            //// console.log("Lead DEtails", leaddata);

            if (count > 0) {
              this.toaster.error(message);
            }
            else {


              this.GetLeadConvertAccountDll();
              this.GetLeadConvertContactDll();

              this.getLeadConvertModuleWizard();
              // this.convertleadmodel.show();
              this.commonService.getMasterItemsList("accountType1").subscribe((result: any) => {
                this.lstaccounttype = this.commonService.masters;
                // // console.log('lstaccounttype', this.lstaccounttype)
                ;
                this.addForm.patchValue({

                  accounttypeid: this.lstaccounttype[0].value,
                  Account: 'createnewaccount',
                  contact: 'createnewcontact',
                  opportunity: true,
                  accountid: null,
                  contactidform: null,
                  product: leaddata.Product,
                  productFamily: leaddata.ProductFamily,
                  isApplicableForLoan: leaddata.IsApplicableForLoan,
                  // Salutationtypeid: [null, Validators.required],
                  firstName: leaddata.FirstName,
                  lastName: leaddata.LastName,
                  email: leaddata.Email,
                  phone: leaddata.MobilePhone,
                })
              })
              this.leadId = id;
              this.getLeadConvertData(this.leadId);
              this.convertleadmodel.show();

            }

          }
        });
        // console.log("Lead  leaddata", leaddata);

      })


    }
  }
  getLeadConvertData(leadid: any) {
    this.GetLeadConvertAccountDll();
    this.leadlistService.getLeadConvertData(leadid).subscribe(result => {
      if (result[0].accdata != null) {
        this.leadlistService.GetLeadConvertAccountDll(this.leadId, '0', this.searchText).subscribe((data: any) => {
          debugger;

          if (data.length > 0) {
            if (data[0].value != null) {
              this.addForm.controls['accountName'].clearValidators();
              this.addForm.controls['accounttypeid'].clearValidators();
              this.addForm.get('accountName').updateValueAndValidity();
              this.addForm.get('accounttypeid').updateValueAndValidity();
              this.isAccountExisting = true;
              this.accountMessage = 'An account is already exists for this Address, you can choose that account from the right panel.';
              this.addForm.patchValue({
                
                accountName: result[0].accdata,
                opportunityname: result[0].leaddata,
                Account: 'chooseexistingaccount',
                accountid: data[0].value
              });
              this.previousAccount =  result[0].accdata;
            } else {
              this.addForm.patchValue({
                accountName: result[0].accdata,
                opportunityname: result[0].leaddata
              });
            }
          }
          else {
            this.addForm.patchValue({
              accountName: result[0].accdata,
              opportunityname: result[0].leaddata
            });
          }
        })
      } else {
        this.addForm.patchValue({
          accountName: result[0].accdata,
          opportunityname: result[0].leaddata
        });
      }


      this.leadlistService.GetLeadConvertContactDll(this.leadId, '0', this.searchText, true).subscribe((data: any) => {
       if (data[0].value != null) {
          this.addForm.controls['firstName'].clearValidators();
          this.addForm.controls['lastName'].clearValidators();
          this.addForm.controls['email'].clearValidators();
          this.addForm.controls['phone'].clearValidators();
          this.addForm.get('firstName').updateValueAndValidity();
          this.addForm.get('lastName').updateValueAndValidity();
          this.addForm.get('email').updateValueAndValidity();
          this.addForm.get('phone').updateValueAndValidity();
          this.contactAccountId = data[0].accountId;
          this.contactMessage = 'An contact is already exists for this Email Id, you can choose that contact from the right panel.';
          this.isContactExisting = true;
          this.addForm.patchValue({
            contact: 'chooseexistingcontact',
            contactidform: data[0].value
          });
        }
        this.previousContact = this.addForm.value.email;
      })



    }, error => {

    })
  }
  getcontactlist() {
    this.leadlistService.getContactList(this.leadId, 10, 'lead', this.sortColumn, this.sortDir, 0, this.pageSizeValueLeadconvert, this.userId).subscribe(response => {
      this.pagedDataLeadconvert = this.leadlistService.pagedData;
      //// console.log('pagedDataLeadconvert', this.pagedDataLeadconvert);

    })
  }
  CheckDuplicate(type:any)
  {
    ;
    if (type==1)
    {
      this.leadlistService.isValueDuplicate(type,this.addForm.value.email).subscribe(response =>{
        this.emailDuplicated=response;
      })
    }
    else if (type==0)
    {
       this.leadlistService.isValueDuplicate(type,this.addForm.value.accountName).subscribe(response =>{
        ;
        this.accountDuplicated=response;
      })
    }
  }
  GetAssociateProductList() {

    this.leadlistService.GetAssociateProductList(this.leadId, 10, this.submoduleName, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.userId).subscribe(response => {
      //  setTimeout(() => {
      this.AssociatedproductpagedData = this.leadlistService.pagedData;

      //// console.log('pagedDataLeadconvert', this.AssociatedproductpagedData);

      // }, 200);         


      //// console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);

    })
  }
  getLeadConvertModuleWizard() {
    this.leadlistService.getLeadConvertModuleWizard().subscribe((result: any) => {
      this.pagenames = result;
      //// console.log('this.pagenames', this.pagenames)
    })
  }
  getconverttype() {
    this.configurationsettingService.GetLeadConfigurationDetails(this.companyId).subscribe((leadresult: any) => {
      // console.log('leadresult', leadresult);
      this.isloanapp = leadresult.isLoanapplication;
      this.isopportuinity = leadresult.isOpportunity;

      //// console.log('isopportuinity', this.isopportuinity);
      //// console.log('isloanapp', this.isloanapp);
    })
  }
  saveLeadConvert() {

    if (this.addForm.value.accountid == this.contactAccountId && !(this.addForm.value.accountid == null && !this.contactAccountId )) {
      this.toaster.error('This account already mapped against this Contact, Lead cannot be converted');
    }
    else if (this.addForm.value.Account == 'createnewaccount' && this.addForm.value.accountid &&
      this.previousAccount == this.addForm.value.accountName
    ) {
      ;
      this.toaster.error('Account with same name allready exist, Please Select existing account or change the name of new account');
    }
    else if (this.addForm.value.contact == 'createnewcontact' && this.contactAccountId &&
      this.previousContact == this.addForm.value.email
    ) {
      ;
      this.toaster.error('Contact with this email allready exist, Please Select existing contact or change the email of new contact');
    }
    else if (this.addForm.value.contact == 'chooseexistingcontact' && this.addForm.value.accountid && this.addForm.value.accountid != this.contactAccountId && this.mapAccount != true) {
      this.MapForm()
    }
    else if (this.addForm.value.Account == 'createnewaccount' && this.accountDuplicated.response)
    {
      this.toaster.error('Account Name allready present against another contact')
    }
    else if (this.addForm.value.Account == 'createnewcontact' && this.emailDuplicated.response)
    {
      this.toaster.error('Email allready present against another contact')
    }
    else {
      console.log('addForm', this.addForm);
      if (this.addForm.valid) {
        this.isleadconvert = true;
        //// console.log('addform', this.addForm);
        this.leadconvertModel.accountName = this.addForm.value.accountName;
        this.leadconvertModel.Account = this.addForm.value.Account;
        this.leadconvertModel.accountid = this.addForm.value.accountid;;
        this.leadconvertModel.accounttypeid = this.addForm.value.accounttypeid;
        this.leadconvertModel.contact = this.addForm.value.contact;
        this.leadconvertModel.contactidform = this.addForm.value.contactidform;
        this.leadconvertModel.email = this.addForm.value.email;
        this.leadconvertModel.firstName = this.addForm.value.firstName;
        this.leadconvertModel.lastName = this.addForm.value.lastName;
        this.leadconvertModel.opportunityname = this.addForm.value.opportunityname;
        this.leadconvertModel.phone = this.addForm.value.phone;
        this.leadconvertModel.product = this.addForm.value.product
        this.leadconvertModel.productFamily = this.addForm.value.productFamily,
          this.leadconvertModel.isApplicableForLoan = this.addForm.value.isApplicableForLoan,
          this.leadconvertModel.object_name = 'lead';
        this.leadconvertModel.object_id = '10';
        this.leadconvertModel.object_ref_id = this.leadId;
        // console.log('leadconvertModel', this.leadconvertModel);


        this.leadlistService.saveLeadConvertopportunity(this.leadconvertModel).subscribe((result: any) => {
          debugger
          if (result.statusCode == 200) {
            //setTimeout(() => { // console.log('notes') }, 3000);
            // this.toaster.success(result.responseMessage);
            this.toaster.success(result.responseMessage);
            this.convertleadmodel.hide();
            this.isleadconvert = false;
            // this.router.navigateByUrl('/opportunity/viewOpportunity/');
            this.router.navigateByUrl("/opportunity/viewOpportunity/" + result.id);
            result.responseMessage = null;

          }
          else if (result.statusCode == 300) {
            //setTimeout(() => { // console.log('notes') }, 3000);
            this.toaster.error(result.responseMessage);
          }
          else {

            this.toaster.error(result.responseMessage);
            this.isleadconvert = false;
          }

          //}, error => {
          //  //this.loadSave = false;
        });
      }





      else {
        this.commonService.validateAllFormFields(this.addForm);
        this.isleadconvert = false;
      }
    }

  }
  onSelectLeadconvert(e) {

    if (this.tableModalcontact.selected.length >= 2) {


      this.tableModalcontact.selected.splice(0, 1);


    }
    // console.log(this.tableModalcontact.selected);

  }
  onSelectproductconvert(event) {

    if (this.tableModal.selected.length >= 2) {


      this.tableModal.selected.splice(0, 1);

    }



  }
  saveProduct() {
    //// console.log('data', this.selected);
    //// console.log('data', this.productassociateid);

    if (this.productassociateid != null && this.productassociateid != "") {
      this.loadSave = true;
      // // console.log('this.productid1111', this.productid);


      this.leadlistService.AssociteProduct(this.productassociateid, this.leadId, 10, 'lead', this.isloanapp).subscribe(r => {
        // // console.log('produvct')
        this.toaster.success(`product has been Associate scuccessfully`);
        this.loadSave = false;
        this.productassociateid = "";
        this.selected = [];
        this.GetAssociateProductList();

        this.productModal.hide();
        this.convertleadmodel.show();
      }, error => {
      })

    }

    else {
      this.loadSave = false
      this.toaster.error("Please select at least one product.");
    }
    this.loadSave = false

  }

  onSelectassociate({ selected }) {

    if (this.productassociateid == "" || this.productassociateid == null || this.productassociateid == 'undefined') {
      this.selectedassociateprouct.splice(0, this.selectedassociateprouct.length);
      this.selectedassociateprouct.push(...selected);
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].asociatedUser !== 1) {
          this.productassociateid += selected[i].ID.toString() + ",";
        }
      }

    }
    else {
      this.productassociateid = null;
      this.productassociateid = "";
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].asociatedUser !== 1) {
          this.productassociateid += selected[i].ID.toString() + ",";
        }
      }
    }
    // // console.log('this.productid', this.productid);
  }
  closeassociatepopup() {
    this.productModal.hide();
    this.convertleadmodel.show();
  }


  closepopup() {
    this.convertleadmodel.hide();
  }

  associateproduct() {
    this.convertleadmodel.hide();
    this.productModal.show();
    this.leadlistService.GetProductList(this.leadId, 10, 'lead', null, this.sortColumnAssoProdList, this.sortDirAssoProdList, this.currentPageAssoProdList, this.pageSizeValueAssoProdList, null).subscribe(response => {
      this.pagedData = this.leadlistService.pagedData;
      //// console.log('this.pagedata', this.pagedData)
      this.offsetAssociateProductList = this.currentPageAssoProdList;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }
  setPageAssociateProductList($event) {
    this.loadSave = true;
    this.currentPageAssoProdList = $event.page - 1;
    this.associateproduct();
  }

  onSortAssociateProductList($event) {
    const sort = $event.sorts[0]
    this.sortDirAssoProdList = sort.dir;
    this.sortColumnAssoProdList = sort.prop;
    this.currentPageAssoProdList = 0;
    this.loadSave = true;
    this.associateproduct();
  }

  get curPageAssoProdList(): number {
    return this.offsetAssociateProductList;
  }

  onChangeAssoProdList($event) {
    this.currentPageAssoProdList = 0;
    this.loadSave = true;
    this.associateproduct();
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {

      this.lstPageSizeLeadconvert = this.commonService.masters;
      this.lstPageSizeAssociateProduct = this.commonService.masters;
    })
  }
  addForm = this.fb.group({

    Account: ['createnewaccount'],
    contact: ['createnewcontact'],
    opportunity: [true],
    accountName: [null, Validators.required],
    opportunityname: [null, Validators.required],
    accounttypeid: [null, Validators.required],
    accountid: [null],
    contactidform: [null],
    product: [null],
    productFamily: [null],
    isApplicableForLoan: [null],
    // Salutationtypeid: [null, Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],

  })



  OnAccountSelected(e) {
    this.addForm.controls['accountid'].clearValidators();
    this.addForm.get('accountid').updateValueAndValidity();
    this.addForm.controls['accountName'].setValidators([Validators.required]);
    this.addForm.controls['accounttypeid'].setValidators([Validators.required]);
    this.addForm.get('accountName').updateValueAndValidity();
    this.addForm.get('accounttypeid').updateValueAndValidity();
    this.isAccountExisting = false;
  }
  OnAccountExistingSelected(e) {
    this.addForm.get('accountid').setValidators([Validators.required]);
    this.addForm.get('accountid').updateValueAndValidity();
    this.addForm.controls['accountName'].clearValidators();
    this.addForm.controls['accounttypeid'].clearValidators();
    this.addForm.get('accountName').updateValueAndValidity();
    this.addForm.get('accounttypeid').updateValueAndValidity();
    this.isAccountExisting = true;
  }
  OnContactSelected(e) {
    this.addForm.get("contactidform").clearValidators();
    this.addForm.get('contactidform').updateValueAndValidity();
    this.addForm.controls['firstName'].setValidators(Validators.required);
    this.addForm.controls['lastName'].setValidators(Validators.required);
    this.addForm.controls['email'].setValidators([Validators.required, Validators.email]);
    this.addForm.controls['phone'].setValidators(Validators.required);
    this.addForm.get('firstName').updateValueAndValidity();
    this.addForm.get('lastName').updateValueAndValidity();
    this.addForm.get('email').updateValueAndValidity();
    this.addForm.get('phone').updateValueAndValidity();
    this.isContactExisting = false;
  }
  OnContactExistingSelected(e) {

    this.addForm.get("contactidform").setValidators(Validators.required);
    this.addForm.get('contactidform').updateValueAndValidity();
    this.addForm.controls['firstName'].clearValidators();
    this.addForm.controls['lastName'].clearValidators();
    this.addForm.controls['email'].clearValidators();
    this.addForm.controls['phone'].clearValidators();
    this.addForm.get('firstName').updateValueAndValidity();
    this.addForm.get('lastName').updateValueAndValidity();
    this.addForm.get('email').updateValueAndValidity();
    this.addForm.get('phone').updateValueAndValidity();
    this.isContactExisting = true;
  }
  GetLeadConvertAccountDll(id: any = 0) {
    this.leadlistService.GetLeadConvertAccountDll(this.leadId, '0', this.searchText).subscribe((data: any) => {
      this.accountlist = data;
    })
  }

  private fetchMoreAccountDll(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    this.leadlistService.GetLeadConvertAccountDll(this.leadId, this.len, this.searchText).subscribe((data: any) => {
      this.accountlist = this.accountlist.concat(data);
    })
  }

  onKeyAccountDll(e: any, dataList: any) {

    this.len = 0
    this.searchText = e.target.value;
    this.leadlistService.GetLeadConvertAccountDll(this.leadId, this.len, this.searchText).subscribe((data: any) => {
      this.accountlist = data;
    })

  }

  onClearLangAccountDll(dataList: any): void {
    this.addForm.get('accountid').setValidators([Validators.required]);
    this.addForm.get('accountid').updateValueAndValidity();

    this.len = 0
    this.searchText = '';
    this.leadlistService.GetLeadConvertAccountDll(this.leadId, this.len, this.searchText).subscribe((data: any) => {
      this.accountlist = data;
    });
  }
  onScrollToEndAccountDll(dataList: any) {
    this.fetchMoreAccountDll(dataList);
  }
  GetLeadConvertContactDll(id: any = 0) {
    this.leadlistService.GetLeadConvertContactDll(this.leadId, '0', this.searchText, true).subscribe((data: any) => {
      this.contactlist = data;
    })
  }
  MapForm() {
    const message = `Contact Already  mappped with other Account, You still want to Continue ?`;
    this.dialogService.confirm('Map Account', message).subscribe((confirmed) => {
      if (confirmed) {
        this.mapAccount = true;
        this.leadconvertModel.state = 1;
        this.addForm.value.Account = 'chooseexistingaccount';
        this.addForm.value.Contact = 'chooseexistingcontact';
        this.saveLeadConvert();
      }

    });
  }
  private fetchMoreContactDll(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    this.leadlistService.GetLeadConvertContactDll(this.leadId, this.len, this.searchText, true).subscribe((data: any) => {
      this.contactlist = this.accountlist.concat(data);
    })
  }

  onKeyContactDll(e: any, dataList: any) {
    this.addForm.get("contactidform").setValidators(Validators.required);
    this.addForm.get('contactidform').updateValueAndValidity();
    this.len = 0
    this.searchText = e.target.value;
    this.leadlistService.GetLeadConvertContactDll(this.leadId, this.len, this.searchText, true).subscribe((data: any) => {
      this.contactlist = data;
    })

  }

  onClearLangContactDll(dataList: any): void {
    this.len = 0
    this.searchText = '';
    this.leadlistService.GetLeadConvertContactDll(this.leadId, this.len, this.searchText, true).subscribe((data: any) => {
      this.contactlist = data;
    });
  }
  changeaccountddl(e) {
    ;
    if (this.addForm.get('Account').value == 'createnewaccount') {
      this.addForm.controls['accountName'].clearValidators();
      this.addForm.controls['accounttypeid'].clearValidators();
      this.addForm.get('accountName').updateValueAndValidity();
      this.addForm.get('accounttypeid').updateValueAndValidity();
      this.addForm.get('Account').setValue('chooseexistingaccount');
      this.leadconvertModel.accountid = e.value;

    }

  }
  changecontactddl(e) {
    if (this.addForm.get('contact').value == 'createnewcontact') {

      this.addForm.controls['firstName'].clearValidators();
      this.addForm.controls['lastName'].clearValidators();
      this.addForm.controls['email'].clearValidators();
      this.addForm.controls['phone'].clearValidators();
      this.addForm.get('firstName').updateValueAndValidity();
      this.addForm.get('lastName').updateValueAndValidity();
      this.addForm.get('email').updateValueAndValidity();
      this.addForm.get('phone').updateValueAndValidity();
      this.addForm.get('contact').setValue('chooseexistingcontact');
      this.leadconvertModel.contactidform = e.value;
    }

  }

  onScrollToEndContactDll(dataList: any) {
    this.fetchMoreContactDll(dataList);
  }
  get accountName() { return this.addForm.get('accountName'); }
  get opportunityname() { return this.addForm.get('opportunityname'); }
  get accounttypeid() { return this.addForm.get('accounttypeid'); }
  get accountid() { return this.addForm.get('accountid'); }
  get contactidform() { return this.addForm.get('contactidform'); }
  // get Salutationtypeid() { return this.addForm.get('Salutationtypeid'); }
  get firstName() { return this.addForm.get('firstName'); }
  get lastName() { return this.addForm.get('lastName'); }
  get email() { return this.addForm.get('email'); }
  get phone() { return this.addForm.get('phone'); }

}

