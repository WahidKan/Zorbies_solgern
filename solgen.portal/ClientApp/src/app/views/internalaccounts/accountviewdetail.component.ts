import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CommonService, ModuleList } from '../shared/common.service';
import { AccountserviceService } from './accountservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Role } from '../role/role.service';
import { LenderlistService, WebmergeDataRoute } from '../lender/lenderlist.service';
import { DocumentmappingComponent } from '../lender/documentmapping/documentmapping.component';
import { UploadDocumentComponent } from '../lender/upload-document/upload-document.component';
import { DataRoutingComponent } from '../lender/data-routing/data-routing.component';
import { RoutingDeliveryComponent } from '../lender/routing-delivery/routing-delivery.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SetPassword, UserService, ForgotPassword } from '../shared/user.service';
import { ManageUserService } from '../manageuser/addedituser.service';
import { Title } from '@angular/platform-browser';
import { id } from '@swimlane/ngx-datatable';
import { AddcontactComponent } from '../shared/contactform/addcontact.component';

@Component({
  selector: 'app-accountviewdetail',
  templateUrl: './accountviewdetail.component.html',
  styleUrls: ['./accountviewdetail.component.scss']
})
export class AccountviewdetailComponent implements OnInit {
  @Input('closePopup') closePopup: boolean;

  @ViewChild('setPassword', { static: false }) setPasswordModal: ModalDirective;
  loadSave = false;
  pageTitle: any;
  accountId: any;
  isSave = false;
  isAddForm: boolean;
  AccountDetails: any;
  pagedData: any = {
    pager: {},
    data: []
  };

  newItemEvent: any = null;
  @ViewChild('addEditModal', { static: false })
  addEditModal: ModalDirective;
  @ViewChild('addEditContactDetail', { static: false })
  addEditContactDetail: AddcontactComponent;
  loginuserid: any;
  popUpState: string = 'Add'
  checked = false;
  disabled = false;
  lstPageSize: any;
  slider = false;
  //isSave = false;
  tableName = '';
  pageSizeValue: any;
  loading = false;
  configurationSetings: FormGroup;
  sortDir = 'desc';
  sortColumn = 'createdOn';
  IsStandard = false;
  isDealerAccount = false;
  isSubDealerAccount = false;
  listFilter = "";
  roleId: any;
  lstRole: any;
  isUsertypeBanker = false;
  banker = false;
  dealer = false;
  loginid: any;
  isEdit: boolean = true;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  isCompanyAdmin: boolean = false;
  loanDocuments: any[] = [];
  loadDocuments: boolean = false;
  siteurl1 = document.location.origin;
  dataRoutes: WebmergeDataRoute[] = [];
  loadRoutes: boolean = false;
  ShowDialogue: boolean = false
  webmergeMappingsPagedData: any = {
    pager: {},
    data: []
  };
  loadWebmergeMappingsPagedData: boolean = false;
  contactId: any;
  currentPage: any = 1;

  user: any;

  userid: any;
  token: any;
  Name: any;
  isEmailConfirmed: boolean = false;

  urldata: any;
  siteimage: string;
  setPasswordModel: SetPassword = new SetPassword();
  url: string = "";
  sitetitle: string = '';
  siteURL: string = "";
  Email: string = "";
  hideLoginBtn: boolean = true;
  showAddcontact: boolean = false;
  roleName: any;
  rolueRoute: any;
  Usertype: any = "";
  forgotPswModel: ForgotPassword = new ForgotPassword();
  @ViewChild('documentMapping', { static: false }) documentMapping: DocumentmappingComponent;
  @ViewChild('uploadDocument', { static: false }) uploadDocument: UploadDocumentComponent;
  @ViewChild('dataRouting', { static: false }) dataRouting: DataRoutingComponent;
  @ViewChild('delivery', { static: false }) delivery: RoutingDeliveryComponent;

  constructor(private fb: FormBuilder,
    private userService: ManageUserService,
    private commonService: CommonService,
    private accountserviceService: AccountserviceService, private dialogService: ConfirmationDialogService,
    private router: Router, private internalAccountService: AccountserviceService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private lenderService: LenderlistService, private userServicepassword: UserService, private titleService: Title) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.commonService.getLoggedInName.subscribe((user: any) => {
      this.user = user;

      this.loginid = user.id;
      // this.loginid = 'DD5BC949-B8DC-4FDE-A31A-E85DFE925933';
      if (user.userType == "usertypebanker") {
        this.banker = true;
      }
      if (user.userType == "usertypedealer") {
        this.dealer = true;
      }
      if (user.userType == "usertypecompanyadmin") {
        this.isCompanyAdmin = true;
      }
      else {
        this.isCompanyAdmin = false;
      }
      //  alert(this.isCompanyAdmin);
    });
  }

  ngOnInit() {
        this.initForm();
    this.getPageSizes();

    this.url = window.location.href;
    this.url = this.url.slice(9, 19);
    //---setting Logo on basis of URL

    this.userServicepassword.GetSiteURl(this.url).subscribe((result: any) => {

      this.urldata = JSON.parse(result);

      if (result != null) {
        this.siteimage = this.urldata[0].SiteLoginLogo;

        this.sitetitle = this.urldata[0].SiteTitle;

        this.setTitle(this.sitetitle);
      }
      else {
        this.sitetitle = 'SolgenOne'
        this.setTitle(this.sitetitle);
        this.siteimage = 'assets/default-theme/imagesNew/login-logo-solgen.png';
      }

    });

    if (this.router.url.indexOf('app.loanhomi') > 0) {
      this.siteURL = "loanhomi";
    }
    else if (this.router.url.indexOf('app.solgenone') > 0) {
      this.siteURL = "solgenone";
    }
    else if (this.router.url.indexOf('solgen.zorbis') > 0) {
      this.siteURL = "solgenone";
    }


    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.accountId = id;
        if (id) {
          this.loadSave = true
          this.GetAccountDetails(id);
          this.GetLoanProductDiscountCategoryEdit('1');
          this.pageTitle = 'Account Detail';
          this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;

          this.pageSizeValue = 10;
          this.currentPage = 1;
          this.getPageSizes();

          this.GetLoanDocuments(id);
          this.GetDataRoutes(id);
          this.GetWebmergeMappings(id);
        }
        else {
          this.pageTitle = 'Add Account';
          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
        this.getRoleListForEnableLogin(this.accountId);
      }
    );
    this.setBreadcrumbs();
  }


  setBreadcrumbs() {
    if (this.route.snapshot.paramMap.get('accountType') == 'subDealer') {
      this.roleName = " Sub Dealer";
      this.rolueRoute = "/accountslist/sub-dealer";
    }

    if (this.route.snapshot.paramMap.get('accountType') == 'customer') {
      ;
      this.roleName = " Customer";
      this.rolueRoute = "/accountslist/customer";
    }

    if (this.route.snapshot.paramMap.get('accountType') == 'account') {
      ;
      this.roleName = " Account";
      this.rolueRoute = "/accountslist";
    }

    if (this.route.snapshot.paramMap.get('accountType') == 'bank') {

      this.roleName = " Bank";
      this.rolueRoute = "/lender";
    }

    if (this.route.snapshot.queryParams["type"] == 'bank') {

      this.roleName = " Bank";
      this.rolueRoute = "/lender";
    }
  }

  setTitle(newTitle: string) {

    this.titleService.setTitle(newTitle);
  }


  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.searchByName();
    }
  }


  searchByName() {
    this.currentPage = 1;
    this.GetLoanProductDiscountCategoryEdit(id);
  }

  GetLoanProductDiscountCategoryEdit(id) {
    let current = this;
    this.configurationSetings = this.fb.group({
      accoundetailView: this.fb.array([])
    });

    let loopcnt: number = 0;
    this.accountserviceService.ContactList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.accountId).subscribe((result: any[]) => {
      debugger
      if (current.accoundetailView.length > 0) {
        current.accoundetailView.clear();
      }
      result.forEach(function (value) {
        debugger
        let group = new FormGroup({
          accountId: new FormControl(value.AccountId),
          contactID: new FormControl(value.contactID),
          name: new FormControl(value.Name),
          email: new FormControl(value.Email),
          isPrimary: new FormControl(value.IsPrimary),
          isPrimaryForDisabled: new FormControl(value.EnableUser),
          enableLogin: new FormControl(value.EnableUser),
          phone: new FormControl(value.Phone),
          mobile: new FormControl(value.MobilePhone),
          role: new FormControl(value.Role == '' ? null : value.Role),
          userId: new FormControl(value.userId == null ? null : value.userId),
          emailConfirmed: new FormControl(value.EmailConfirmed),
          checkEnabledLogin: new FormControl(value.CheckEnabledLogin)

        });
        current.accoundetailView.push(group);
      })
    });
  }

  resetName() {
    this.listFilter = '';
    this.currentPage = 1;
    this.GetLoanProductDiscountCategoryEdit(id);
  }

  GetAccountDetails(id) {

    this.loadSave = true;
    this.accountserviceService.GetAccounDetails(id).subscribe((result: any) => {
      if (result) {

        this.AccountDetails = result;
        this.Usertype = this.AccountDetails.accountTypeKey;
        if (this.AccountDetails.isRoleApply == true) {
          this.isUsertypeBanker = true;
        }
        if (this.AccountDetails.userType == 'Standard') {
          this.IsStandard = true;
        }
        if (this.AccountDetails.userType == 'Dealer') {
          this.isDealerAccount = true;
        }
        if (this.AccountDetails.userType == 'Sub Dealer') {
          this.isSubDealerAccount = true;
        }
        this.search();
        this.loadSave = false;
      }
    }, error => {
      this.loadSave = false;
    });
  }
  AddContact() {
    // this.router.navigateByUrl("/addContact/account/1");
    //this.router.navigate(['../contact/addContact/account', this.accountId]);
    // this.router.navigate(['../contactlist/addContact/account', this.accountId]);
    this.router.navigate(['../contactlist/addContact/account', this.accountId]);
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  showpopup(params) {
    ;
    this.popUpState = 'Add '
    this.addEditContactDetail.accountId = this.accountId;
    this.newItemEvent = null;
    this.addEditModal.show();
    // this.AddEditContact.onAdd.subscribe((r) => this.refresh());
  }

  showPopupForEdit(params) {
    this.contactId = params
    this.popUpState = 'Edit '
    this.addEditContactDetail.contactId = params;
    this.newItemEvent = params;

    this.addEditModal.show();

    // this.AddEditContact.onAdd.subscribe((r) => this.refresh());
  }
  getRoleListForEnableLogin(accountId) {
    this.internalAccountService.getRoleListForEnableLogin(accountId).subscribe((res: any) => {
      this.lstRole = res;
    })
  }
  SetEnableAccount(id, event, name, row) {

    if (row.EnableUser == false) {
      const message = `Are you sure you want to Disable Account "${name}"?`;
      this.dialogService.confirm('Disbale Account', message).subscribe(confirmed => {
        if (confirmed) {
          this.checked = true;
          this.loading = true;
          this.internalAccountService.DisabledAccount(id, this.tableName).subscribe(r => {
            if (this.internalAccountService.editPage.statusCode == 300) {
              this.search();
              this.toaster.success(`Account has been disabled successfully!`);
              this.loading = false;
            }
            else {
              this.search();
              this.loading = false;
              this.toaster.error(this.internalAccountService.editPage.responseMessage);

            }
          }, error => {
          });
        }
        this.search();
        //this.
      });
    }
    else {
      if (row.Email != null && row.Email != '') {
        this.slider = true;
        this.checked = true;
        //this.search();
        const message = `Are you sure you want to Enable Account Login "${name}"?`;
        this.dialogService.confirm(event + ' ' + 'Account Login', message).subscribe(confirmed => {
          if (confirmed) {
            this.loading = true;
            this.checked = true;
            this.internalAccountService.AppeoveAccount(id, this.tableName).subscribe(r => {
              if (this.internalAccountService.editPage.statusCode == 200) {
                this.search();
                this.toaster.success(`Account "${name}" has been Enable login successfully`);
                this.loading = false;
              }
              else {
                this.search();
                this.toaster.error(this.internalAccountService.editPage.responseMessage);
                this.loading = false;
              }
            }, error => {
              this.loading = false;
            });
          }
          this.loading = false;
          this.slider = false;
          this.checked = false;
          this.search();
        });
      }
      else {
        this.toaster.error('Can not enable login because contact email not available!');
        this.search();
        this.slider = false;
        this.checked = false;
        this.loading = false;
      }
    }
  }
  search() {
    //alert(1);
    this.loadSave = true;
    this.pageSizeValue = 10;
    this.accountserviceService.ContactList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.accountId).subscribe(response => {
      this.pagedData = response;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  close() {
    this.router.navigateByUrl("/accountslist");
  }
  private initForm() {
    this.configurationSetings = this.fb.group({
      accoundetailView: this.fb.array([])
    });
  }
  get accoundetailView(): FormArray {
    return this.configurationSetings.get('accoundetailView') as FormArray;
  }

  buildLoanProductDiscountCategoryFields(): FormGroup {
    return this.fb.group({
      accountId: [''],
      name: [''],
      email: [''],
      phone: [''],
      mobile: [''],
      isPrimary: [false],
      enableLogin: [false],
      role: [null, Validators.required],
      isPrimaryForDisabled: [false],
      userId: [''],
      contactID: ['']
    });
  }

  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('accountId', this.accountId);
    input.append('contactList', JSON.stringify(this.accoundetailView.value));
    return input;
  }
  validator(field: FormGroup) {
    if (field.get('enableLogin').value) {
      if (this.isUsertypeBanker == true) {
        //field.get('role').setValue(null);
        field.get('role').setValidators([Validators.required]);
        field.get('role').updateValueAndValidity();
      }
      else {
        //field.get('role').setValue(null);
        field.get('role').clearValidators();
        field.get('role').updateValueAndValidity();
      }
    } else {
      //field.get('role').setValue(null);
      field.get('role').clearValidators();
      field.get('role').updateValueAndValidity();
    }
  }
  onSubmit() {
    if (this.configurationSetings.valid) {
      this.loadSave = true;
      const loanproductModel = this.prepareFormDataForDocument();
      this.accountserviceService.addOrUpdateManageStatusForAccountDetails(loanproductModel, this.accountId).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/accountslist");
          //this.SetStatusData(this.field);
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });

    }
    else {
      this.commonService.validateAllFormFields(this.configurationSetings);
    }
  }
  selectUser(event, field: FormGroup) {
    if (event == undefined) {
      field.get('role').setValidators([Validators.required]);
      field.get('role').updateValueAndValidity();
    }
    else {
      this.roleId = event.value;
      this.hideLoginBtn = false;
    }
  }

  EnableLoginForAllUser(field) {

    if (field.valid) {
      if (field.value.enableLogin == true && field.value.isPrimary == true) {
        this.loadSave = true;
        //field.value.role = 0;
        if (this.IsStandard == false) {
          this.accountserviceService.CheckUserDuplicateORAssociate(field.value.email, '').subscribe((result: any) => {
            if (result.responseMessage == "duplicate") {
              this.isSave = false;
              this.loadSave = false;
              this.onSubmitForSingle(field.value);
              // this.toaster.error("Email Already Exists");
              return false;
            }
            else if (result.responseMessage == "associate") {
              //already exists in ASPnetUsers-- now add only in maping table after confirmation
              this.loadSave = false;
              this.dialogService.confirm('Associate Account', "Email already exists in other Company. Do you want to Associate it?").subscribe(confirmed => {
                if (confirmed) {
                  //save in maping table
                  if (this.IsStandard == false) {
                    this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', this.accountId).subscribe((result: any) => {
                      if (result.statusCode == 200) {
                        this.toaster.success("Account has been Approved successfully.");
                        //this.router.navigateByUrl("/accountslist");
                        this.search();
                        setTimeout(() => { this.loadSave = false; }, 3000);
                      }
                    });
                  }
                  else if (this.IsStandard == true) {
                    this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', this.accountId).subscribe((result: any) => {
                      if (result.statusCode == 200) {
                        this.toaster.success("Account has been Approved successfully.");
                        //this.router.navigateByUrl("/accountslist");
                        this.search();
                        setTimeout(() => { this.loadSave = false; }, 3000);
                      }
                    });
                  }
                  else {
                    this.toaster.error("Please select Role!");
                  }
                  this.isSave = false;
                  return false;
                }
                else {//do nothing
                  this.isSave = false;
                  return false;
                }
              });
            }
            else {

              console.log('else');
              if (field.value.role == null || this.IsStandard == false) {

                console.log('else in', field.value);
                this.onSubmitForSingle(field.value);
              }
              else {
                this.loadSave = false;
                this.toaster.error("Please select Role!");

              }
            }
          });
        }
        else if (this.IsStandard == true) {
          this.loadSave = false;
          //this.toaster.error("Please select Role!");
          this.onSubmitForSingle(field.value);
        }
        else {
          this.loadSave = false;
          this.toaster.error("Please select Role!");
        }
      }
      else if (field.value.enableLogin == true && field.value.isPrimary == false) {
        this.loadSave = true;
        if (this.IsStandard == false && (field.value.role != null && field.value.role != '')) {

          this.accountserviceService.CheckUserDuplicateORAssociate(field.value.email, '').subscribe((result: any) => {
            if (result.responseMessage == "duplicate") {
              this.isSave = false;
              this.loadSave = false;
              //this.toaster.error("Email Already Exists");
              this.onSubmitForSingle(field.value);
              return false;
            }
            else if (result.responseMessage == "associate") {
              //already exists in ASPnetUsers-- now add only in maping table after confirmation
              this.loadSave = false;
              this.dialogService.confirm('Associate Account', "Email already exists in other Company. Do you want to Associate it?").subscribe(confirmed => {
                if (confirmed) {
                  //save in maping table
                  if (this.IsStandard == false && (field.value.role != null && field.value.role != '')) {
                    this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', this.accountId).subscribe((result: any) => {
                      if (result.statusCode == 200) {
                        this.toaster.success("Account has been Approved successfully.");
                        //this.router.navigateByUrl("/accountslist");
                        this.search();
                        setTimeout(() => { this.loadSave = false; }, 3000);
                      }
                    });
                  }
                  else if (this.IsStandard == true) {
                    this.accountserviceService.AssociateUserWithCompany(field.value.email, '', field.value.role, '', this.accountId).subscribe((result: any) => {
                      if (result.statusCode == 200) {
                        this.toaster.success("Account has been Approved successfully.");
                        //this.router.navigateByUrl("/accountslist");
                        this.search();
                        setTimeout(() => { this.loadSave = false; }, 3000);
                      }
                    });
                  }
                  else {
                    this.toaster.error("Please select Role!0");
                  }
                  this.isSave = false;
                  return false;
                }
                else {//do nothing
                  this.isSave = false;
                  return false;
                }
              });
            }
            else {
              if (field.value.role == null || this.IsStandard == false) {
                this.onSubmitForSingle(field.value);
              }
              else {
                this.loadSave = false;
                this.toaster.error("Please select Role!3");

              }
            }
          });
        }
        else {
          this.loadSave = false;
          //this.toaster.error("Please select Role!");
          this.onSubmitForSingle(field.value);
        }
      }
      else if (field.value.enableLogin == false && field.value.isPrimary == true) {
        this.loadSave = true;
        this.onSubmitForSingle(field.value);
      }
      else {
        this.loadSave = true;
        this.onSubmitForSingle(field.value);
      }
    }

  }
  onSubmitForSingle(field) {
    console.log('field', this.accountId);
    if (field.email == null || field.email == '') {
      this.toaster.error("can't enable login, because email is empty!");
      this.loadSave = false;
    }
    else {
      this.loadSave = true;
      const loanproductModel = this.prepareFormDataForDocumentForEnableSingleClick(field);
      this.accountserviceService.addOrUpdateManageStatusForAccountDetails(loanproductModel, this.accountId).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          //this.router.navigateByUrl("/accountslist");
          const control2 = <FormArray>this.configurationSetings.controls.accoundetailView;
          control2.controls = [];
          this.GetLoanProductDiscountCategoryEdit(this.accountId);
          //this.SetStatusData(this.field);
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else if (result.statusCode == 300) {

          this.loadSave = false;
          // this.dialog.error(result.responseMessage);

          this.dialogService.confirm('Caution', result.responseMessage, 'Go To Applications').subscribe(confirmed => {
            if (confirmed) {
              this.router.navigate(['/loanApplication/masstransfer'], { queryParams: { id: field.userId, acid: this.accountId } });
            }

          });
          const control2 = <FormArray>this.configurationSetings.controls.accoundetailView;
          control2.controls = [];
          this.GetLoanProductDiscountCategoryEdit(this.accountId);
        }
        else {
          this.loadSave = false;
          //this.GetAccountDetails(this.accountId);
          let current = this;

          this.toaster.error(result.responseMessage);
          //setTimeout(() => { this.loadSave = false; }, 4000);
          //alert(1);
          //this.accoundetailView.clear();
          const control2 = <FormArray>this.configurationSetings.controls.accoundetailView;
          control2.controls = [];
          this.GetLoanProductDiscountCategoryEdit(this.accountId);
        }
      }, error => {
        this.loadSave = false;
      });
    }
  }
  private prepareFormDataForDocumentForEnableSingleClick(field) {
    const input = new FormData();
    input.append('accountId', this.accountId);
    input.append('contactList', JSON.stringify(field));
    return input;
  }

  isPrimaryValidator(field, i, enable) {

    const message = `Are you sure you want to change Primary?`;
    if (enable) {
      this.dialogService.confirm('Enable Primary Contact', message).subscribe(confirmed => {
        if (confirmed) {

          if (field.get('isPrimary').value) {
            this.accoundetailView.controls.forEach(m => {
              m.get('isPrimary').setValue(false);
            });
            field.get('isPrimary').setValue(true);
            let contact = field.value;
            console.log(contact);
            this.commonService.SetPrimaryContact(contact.contactID, this.accountId).subscribe((res) => {

            });
          }
          else {
            field.get('isPrimary').setValue(false);
            let contact = field.value;
            console.log(contact);
            this.commonService.SetPrimaryContact(contact.contactID, this.accountId).subscribe((res) => {

            });
          }
        }

        else {
          if (field.get('isPrimary').value) {
            field.get('isPrimary').setValue(false);
          }
          else {
            field.get('isPrimary').setValue(true);
          }
        }
      });
    }
    else {
      this.dialogService.confirm('Disable Primary Contact', message).subscribe(confirmed => {
        if (confirmed) {

          if (field.get('isPrimary').value) {
            this.accoundetailView.controls.forEach(m => {
              m.get('isPrimary').setValue(false);
            });
            field.get('isPrimary').setValue(true);
            let contact = field.value;
            console.log(contact);
            this.commonService.SetPrimaryContact(contact.contactID, this.accountId).subscribe((res) => {

            });
          }
          else {
            field.get('isPrimary').setValue(false);
            let contact = field.value;
            console.log(contact);
            this.commonService.SetPrimaryContact(contact.contactID, this.accountId).subscribe((res) => {

            });
          }
        }

        else {
          if (field.get('isPrimary').value) {
            field.get('isPrimary').setValue(false);
          }
          else {
            field.get('isPrimary').setValue(true);
          }
        }
      });
    }

  }
  goToContact(id: any) {
    this.router.navigate(['../contactlist/editContact', id], { queryParams: { account: this.accountId } });
    // this.router.navigate(['../contactlist/editContact', id]);


  }

  private GetLoanDocuments(id: string) {
    this.loadDocuments = true;
    this.lenderService.getWebmergeDocuments(id).subscribe(resp => {
      this.loadDocuments = false;
      this.loanDocuments = resp;
    }, err => {
      this.loadDocuments = false;
    });
  }

  private GetDataRoutes(bankId: any) {
    this.loadRoutes = true;
    this.lenderService.getWebmergeDataRoutes(bankId).subscribe(dataRoutes => {
      this.dataRoutes = dataRoutes;
      this.loadRoutes = false;
    }, err => {
      this.loadRoutes = false;
    });
  }

  private GetWebmergeMappings(bankId: any) {
    this.loadWebmergeMappingsPagedData = true;
    this.lenderService.getWebmergeMappingsList(bankId, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe(mappingsList => {
      this.loadWebmergeMappingsPagedData = false;
      this.webmergeMappingsPagedData = mappingsList;
    }, err => {
      this.loadWebmergeMappingsPagedData = false;
    })
  }

  OpenMapping(document) {
    this.documentMapping.show(this.accountId, document.id);
  }

  documentMappings() {
    this.GetWebmergeMappings(this.accountId);
  }

  uploadFormStackDocument() {
    this.uploadDocument.show(this.accountId, null);
  }

  uploadDocuments() {
    this.GetLoanDocuments(this.accountId);
  }

  createDataRoute() {
    this.dataRouting.show('', this.accountId);
  }

  OpenRoute(row: any) {
    this.dataRouting.show(row.id, this.accountId);
  }

  dataRoutingEmit() {
    this.GetDataRoutes(this.accountId);
  }

  EditDocument(row: any) {
    this.uploadDocument.show(this.accountId, row.id);
  }

  createWebmergeMapping() {
    this.documentMapping.show(this.accountId, 0);
  }

  updateWebmergeMapping(row: any) {
    this.documentMapping.show(this.accountId, row.Id);
  }

  OpenDocumentDelivery(row) {
    this.delivery.show(row.id, "Document", this.accountId)
  }

  OpenRouteDelivery(row: any) {
    this.delivery.show(row.id, "Route", this.accountId)
  }

  onIsDefaultChange(row) {
    this.loadSave = true;
    this.lenderService.setDefaultWebmergeMapping(row.Id, this.accountId).subscribe(resp => {
      this.loadSave = false;
      this.GetWebmergeMappings(this.accountId);
      if (resp.statusCode == 200) {
        this.toaster.success(resp.responseMessage);
      } else {
        this.toaster.error(resp.responseMessage);
      }
    }, err => {
      this.loadSave = false;
    });
  }



  showModel(data: any) {
    this.setPasswordForm.reset();
    this.setPasswordModal.show();
    this.getToken(data.value.email);
    this.userid = data.value.userId;
    this.Name = data.value.name;
    this.isEmailConfirmed = data.value.emailConfirmed;
  }

  Closemodel() {
    this.setPasswordModal.hide();
  }
  Close(test: any) {
    ;
    console.log(true);
    this.addEditModal.hide();

    if (test) {
      this.accoundetailView.clear();

      // this.ngOnInit();
      this.GetLoanProductDiscountCategoryEdit('1');
    }


  }

  getToken(email: any) {
    this.userService.gettoken(email).subscribe((result: any) => {
      this.token = result;
    })
  }

  PasswordSet() {
    this.loadSave = true;
    if (this.setPasswordForm.valid) {
      this.setPasswordModel.password = this.setPasswordForm.value.password;
      this.setPasswordModel.confirmPassword = this.setPasswordForm.value.confirmPassword;
      this.setPasswordModel.userId = this.userid;
      this.setPasswordModel.token = this.token;
      this.setPasswordModel.ResetToken = this.token;
      if (this.isEmailConfirmed != true) {
        this.userServicepassword.setPassword(this.setPasswordModel).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.toaster.success("Password has been set successfully. Please login.");
            this.setPasswordModal.hide();

            while (this.accoundetailView.length != 0) {
              this.accoundetailView.removeAt(0);
            }
            this.loadSave = false;
            this.GetLoanProductDiscountCategoryEdit('1');

          }
          else {
            this.toaster.error(res.responseMessage);
            this.loadSave = false;
          }
        });
      }
      else {
        this.userServicepassword.ResetPassword(this.setPasswordModel).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.toaster.success("Password has been reset successfully. Please login.");
            this.setPasswordModal.hide();
            while (this.accoundetailView.length != 0) {
              this.accoundetailView.removeAt(0);
            }
            this.loadSave = false;
            this.GetLoanProductDiscountCategoryEdit('1');
          }
          else {
            this.toaster.error(res.responseMessage);
            this.loadSave = false;
          }
        });
      }

    }
    else {
      this.commonService.validateAllFormFields(this.setPasswordForm);
      this.loadSave = false;
    }
  }

  setPasswordForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  },
    {
      validator: PasswordMatch('password', 'confirmPassword')
    }
  )
  get password() { return this.setPasswordForm.get('password'); }
  get confirmPassword() { return this.setPasswordForm.get('confirmPassword'); }

  sharePasswordLink(data: any) {

    this.Email = data.value.email;

    const message = `Are you sure you want to share the generate password link with "${this.Email}"?`;
    this.dialogService.confirm('Share Link', message).subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;

        this.forgotPswModel.email = this.Email;
        this.forgotPswModel.siteTitle = this.sitetitle;
        this.forgotPswModel.siteImg = this.siteimage
        this.userServicepassword.SetPasswordByEmail(this.forgotPswModel).subscribe((res: any) => {
          if (res) {
            if (res.statusCode == 200) {
              this.toaster.success(res.responseMessage);
              setTimeout(() => { this.loadSave = false; }, 2000);
            }
            else {
              this.loadSave = false;
              this.toaster.error(res.responseMessage);
            }
          }
        }, error => {
          this.loadSave = false;
        });
      }
    });

  }

  //function is used to delete the user
  DeleteUser(data: any) {
    const message = `Are you sure you want to delete User "${data.value.name}"?`;
    this.dialogService.confirm('Delete User ', message).subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;
        this.userService.deleteUser(data.value.userId).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            // this.accoundetailView.controls = null;
            while (this.accoundetailView.length != 0) {
              this.accoundetailView.removeAt(0);
            }
            this.GetLoanProductDiscountCategoryEdit('1');
            this.loadSave = false;
          }
          else {
            this.toaster.error(result.responseMessage);
            this.loadSave = false;
          }
        }, error => {
          this.loadSave = false;
        });
      }
    });
  }


}

function PasswordMatch(pwd: string, cpwd: string) {
  return (frm: FormGroup) => {
    let pword = frm.controls[pwd];
    let cpword = frm.controls[cpwd];

    if (pword.value !== cpword.value) {
      cpword.setErrors({ notmatch: true });
    }
    else {
      cpword.setErrors(null);
    }
  }
}
