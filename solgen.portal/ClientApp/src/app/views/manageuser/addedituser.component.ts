import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageUserService, User } from './addedituser.service';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'AddUser',
  templateUrl: './addedituser.component.html'
})
export class AddEditUserComponent implements OnInit {
  executiveCommission = [
    { id: "Formula1", name: 'Formula1 (Placement Fee + Ist Payment -250)*0.3' },
    { id: "Formula2", name: 'Formula2 (Placement Fee * 0.3)' },
  ];
  userModel: User = new User();
  loadSave = false;
  lstUserType: any;
  userTypeId: any;
  lstUserPosition: any;
  lstEmployeeType: any;
  pageTitle: string;
  states: any;
  countryLists: any;
  isShowBank = false;
  banknames: any;
  rolesnames: any;
  lstLocation: any;
  lstcompany: any;
  lstTimeZone: any;
  addOrUpdatePermission: boolean=false;
  lstdepartment: any;
  ConsolidatedUser : any;
  //modulePermission: ModuleList;
  isNormalUser = false;
  isEdit = false;
  isEmployee = false;
  lstSalesforceEmployee: any;
  modulePermission: any[] = [];
  isAdd: boolean = true;
  isUpdate: boolean = false;
  comptype: any;
  oldemail: string = '';
  newemail: string = '';
  lstTimeFormat: any;
  lstReportTo: any;
  contentHeader: object;
  result: any;
  allStates: any;



  constructor(private fb: FormBuilder,
    private userService: ManageUserService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute, private dialogService: ConfirmationDialogService,private location:Location
  ) {
    this.commonService.getMasterItemsList("manageuser_usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
      // console.log("userType", this.lstUserType);
    })
    this.commonService.getMasterItemsList("Consolidated_User").subscribe((result: any) => {
      this.ConsolidatedUser = this.commonService.masters;

      //console.log("ConsolidatedUser", this.ConsolidatedUser);
    })
    this.commonService.getMasterItemsList("userposition,employeetype").subscribe((result: any) => {
      this.lstUserPosition = this.commonService.masters.filter(x => x.masterName == "UserPosition");
      this.lstEmployeeType = this.commonService.masters.filter(x => x.masterName == "EmployeeType");
      //this.lstSalesforceEmployee = this.commonService.masters.filter(x => x.masterName == "EmployeeType");
    })

    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    this.comptype = JSON.parse(localStorage.getItem("userinfo"));


    this.addOrUpdatePermission = false;
    this.modulePermission = this.commonService.getPermissiondata(this.route.snapshot.data.moduleCode);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    if (add == undefined) {
     // add = "null";
      this.addOrUpdatePermission = false;
    } else {
     // this.isAdd = true;
      this.addOrUpdatePermission = true;
    }
    //let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERUPDATE');
    //if (update == undefined) {
    //  update = "null";
    //} else {
    //  this.isUpdate = true;
    //}
  }
  addUserForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userType: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.nullValidator],
    locationID: [null,Validators.required],
    departmentID: [null, Validators.required],
    timeZoneId: [null, Validators.required],
    companyid: [null, Validators.nullValidator],
    address: ['', [Validators.nullValidator, Validators.maxLength(500)]],
    city: ['', [Validators.nullValidator, Validators.maxLength(100)]],
    state: [null, Validators.nullValidator],
    zipCode: ['', [Validators.nullValidator, Validators.maxLength(5)]],
    county: [null, Validators.nullValidator],
    timeFormat: [12, [Validators.required]],
    position: [null],
    assignedBankId: [{ value: null, disabled: true }, Validators.required],
    empType: [null],
    isActive: [''],
    isHOD: [''],
    emailNotification: [''],
    notes: [''],
    sfid: [''],
    sid  : [''],
    userid: [null],
    roleId: [null],
    executiveCommisionFormula: [null],
    salesForceEmployeOrContact: [null],
    consolidateduserid: [null],
    reportToId: [null, Validators.nullValidator],
    employeeContactPreferredBy: ['NormalUser']

  });
  ngOnInit()
  {
    // this.addOrUpdatePermission = false;oihouh
    this.getBankName();
    this.isEmployee = true;

    this.getCountryDropdownList();
    this.GetLocation();
    this.GetDepartmentDll();
    this.GetCompanyDll();
    this.getTimeZoneList();
    this.getTimeFormatList();

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.isAdd=false;
          this.loadSave = true
          this.pageTitle = 'Edit User';;
          this.fillForm(id);
        }
        else {
          this.loadSave = true
          this.pageTitle = 'Add User';
          this.userType.enable();
          this.userType.setValidators(Validators.required);
          this.userType.updateValueAndValidity();
          ////  this.addOrUpdatePermission = this.isAdd;
        }
        this.getState();
        this.getReportToList();
      }
    );
    this.initBreadCrumb();
    if (this.comptype.companyType == 'companytypeFinancialInstitute')
      this.addUserForm.get('locationID').clearValidators();
  }

  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Users',
       actionButton: true,
       iconCssClass: '',
       breadcrumb:
         [
           {
             name: 'Dashboard',
             isLink: true,
             link: '/dashboard'
           },
           {
             name : 'Manage Users',
             isLink : true,
             link : '/user'
           },
           {
             name: this.pageTitle,
             isLink: false
           }

         ]
     };
   }
  getTimeFormatList() {
    this.lstTimeFormat = this.commonService.getTimeFormatList();
  }

  getTimeZoneList() {
    this.commonService.getTimeZoneList().subscribe(resp => {
      this.lstTimeZone = JSON.parse(resp);
    })
  }
  getState() {
    this.userService.getStateList().subscribe((result: any) => {
      var data = result;
      this.allStates = this.states = data;
    })
  }

  getCountryDropdownList() {
    this.userService.getCountryList().subscribe((result: any) => {
      this.countryLists = result;
      //console.log("countryList",this.countryLists);
    })
  }
  GetLocation() {
    this.userService.GetLocationDDL().subscribe((data: any) => {
      this.lstLocation = data;
    })
  }
  GetCompanyDll() {
    this.userService.GetCompanyDll().subscribe((data: any) => {
      this.lstcompany = data;
    })
  }
  GetDepartmentDll() {
    this.userService.GetDepartmentDll().subscribe((data: any) => {
      this.lstdepartment = data;
    })
  }
  onuserTypeChange() {
    if (this.userTypeId !== null) {
      const bankTextName = this.lstUserType.find(x => x.value == this.userTypeId).text;
      this.resetFormOnuserTypeChange(bankTextName);
    }
  }
  userTypeChange(text: string, value: string, event: any) {
    // console.log("event", event);
    if (typeof text !== 'undefined' && text !== null) {

      this.resetFormOnuserTypeChange(text);
    }
    if (typeof value !== 'undefined' && value !== null) {
      //this.userType.setValue(value);
      this.getRolesByUserType(value,'true');
    }
  }
  onCountryChange(countryId: string, text)
  {
     this.state.setValue(null);
    if (typeof text !== 'undefined' && text !== null)
    {
      this.resetFormOnuserTypeChange(text);
    }
    if (typeof countryId !== 'undefined' && countryId !== null)
    {
      this.getStatesByCountry(countryId);
    }
  }

  getStatesByCountry(countryId: any) {
    let country = this.countryLists.find(x => x.value == countryId);
    let code = country != null ? country.code : '';
    this.state.setValue(null);
    this.commonService.getStatesList_V1(code).subscribe(res => {
      this.states = this.commonService.states;
    });

  }

  // getStatesByCountry(country)
  // {
  //
  //   this.states = this.allStates.filter(x => x.value == country.value );
  // }
  resetFormOnuserTypeChange(textName) {
    //if (textName === 'Lender') { //Bank User
    //  this.assignedBankId.enable();
    //  this.assignedBankId.setValidators(Validators.required);
    //}
    //else {
    this.assignedBankId.setValue(null);
    this.assignedBankId.disable();
    this.assignedBankId.clearValidators();
    // }
    this.assignedBankId.updateValueAndValidity();
  }
  getBankName() {
    this.userService.getBankName().subscribe((result: any) => {
      var data = result;
      this.banknames = data;
    })
  }
  getReportToList() {
    this.userService.getReportToList().subscribe((result: any) => {
      this.lstReportTo = result
      this.loadSave = false;
      //console.log("this.lstReportTo", this.lstReportTo);
    }, error=>{
      //console.log(error);
      this.loadSave = false;
    })
  }

  getRolesByUserType(getRolesName: any, onChangeCall:any) {
    this.roleId.setValue(null);
    this.userService.getRolesName(getRolesName).subscribe((result: any) => {
    if(onChangeCall=='true'){
      var data = result.filter((x)=> x.roleName !='Default Company Admin Role');
    }
    else{
      var data = result;
    }
      this.rolesnames = data;
    })
  }
  fillForm(id) {
   /// this.addOrUpdatePermission = this.isUpdate;
    this.userService.getUserDetail(id).subscribe((result: any) => {
      if (result) {
        if (typeof result.userType !== 'undefined' && result.userType !== null) {
          this.getRolesByUserType(result.userType,'false');
        }

        //console.log('result', result);
        this.userTypeId = result.userType;
        this.pageTitle = 'Edit User: ' + result.firstName + ' ' + result.lastName;
        this.isEdit = true;
        this.loadSave = false;
        this.oldemail = result.email;
        //console.log('resultasdasd', result);
        this.addUserForm.patchValue({
          userid: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          userType: result.userType,
          email: result.email,
          sid: result.s_id,
          sfid: result.sfid,
          phone: result.phoneNumber,
          locationID: result.locationID == null ?null : result.locationID.toString(),
          departmentID: result.departmentID == null ?null : result.departmentID.toString(),
          companyid: result.companyid == null ? '' : result.companyid.toString(),
          address: result.address,
          city: result.city,
          state: result.state == null ? null : result.state.toString(),
          zipCode: result.zipCode,
          county: result.county == null ? null : parseInt(result.county),// == null ? null : result.country.toString((),
          assignedBankId: result.assignedBankId,
          position: result.position == null ? null : result.position.toLowerCase(),
          empType: result.employeeType == null ? null : result.employeeType.toLowerCase(),
          isActive: result.isActive,
          isHOD: result.isHOD,
          emailNotification: result.emailNotification,
          notes: result.notes,
         // roleId: result.roleID.toString(),
          roleId: result.roleID == null ? null : result.roleID.toString(),
          consolidateduserid: result.uManagerId == null ? null : result.uManagerId.toString(),
          executiveCommisionFormula: result.executiveCommisionFormula,
          salesForceEmployeOrContact: result.refId,
          timeZoneId: result.timezone,
          reportToId: result.reportToId,
          timeFormat: result.timeformat
        });
        this.onuserTypeChange();
       // this.email.disable();
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }


  addeditUser() {
debugger;
    if(this.addUserForm.value.userid != null && this.addUserForm.value.userid !=""){
      this.saveUser(this.addUserForm);
    }
    else{
      this.userService.check_company_lisence_limit().subscribe(res=>{
        this.result = res;
        if(this.result==true){
          this.toaster.error("User can't be added because license limit has been exceeded!");
        }
        else{
          this.saveUser(this.addUserForm);
        }
      })
    }
  }




  saveUser(form:any){
    if (form.valid) {
      this.loadSave = true;
      this.newemail = form.controls.email.value;
      this.userModel.Id = form.value.userid;
      this.userModel.firstName = form.value.firstName;
      this.userModel.lastName = form.value.lastName;
      this.userModel.userType = form.value.userType;
      this.userModel.email = form.controls.email.value;
      this.userModel.phoneNumber = form.value.phone;
      this.userModel.address = form.value.address;
      this.userModel.city = form.value.city;
      this.userModel.state = form.value.state;
      this.userModel.zipCode = form.value.zipCode;
      this.userModel.county = form.value.county;
      this.userModel.assignedBankId = form.value.assignedBankId;
      this.userModel.position = form.value.position;
      this.userModel.locationID = form.value.locationID;
      this.userModel.departmentID = form.value.departmentID;
      this.userModel.timeZoneId = this.timeZoneId.value;
      this.userModel.timeFormat = this.timeFormat.value;
      this.userModel.companyid = form.value.companyid;
      this.userModel.isHOD = form.value.isHOD == "" ? false : true;
      this.userModel.emailNotification = form.value.emailNotification == "" ? false : true;
      this.userModel.employeeType = form.value.empType;
      this.userModel.isActive = form.value.isActive == "" ? false : true;
      this.userModel.sfid = form.value.sfid ;
      this.userModel.sid = form.value.sid ;
      this.userModel.notes = form.value.notes;
      this.userModel.roleId = form.value.roleId;
      this.userModel.UManagerId = form.value.consolidateduserid;
      this.userModel.refFrom = this.isEmployee == true ? 'Employee' : "Contact";
      this.userModel.salesForceEmployeOrContact = form.value.salesForceEmployeOrContact;
      this.userModel.executiveCommisionFormula = form.value.executiveCommisionFormula == null ? null : form.value.executiveCommisionFormula.id;
      this.userModel.oldemail = this.oldemail;
      this.userModel.reportToId = this.reportToId.value;
      if (this.newemail != this.oldemail) {
        this.userModel.sendMail = true;
      }
      let isSave = true;
      if (this.userModel.Id == null) {//add
        this.userService.CheckUserDuplicateORAssociate(this.userModel.email, this.userModel.Id).subscribe((result: any) => {
          if (result.responseMessage == "duplicate") {
            isSave = false;
            this.loadSave = false;
            this.toaster.error("This email id is already in use. Please enter another email id.");
            return false;
          }
          else if (result.responseMessage == "associate") {
            //already exists in ASPnetUsers-- now add only in maping table after confirmation
            this.loadSave = false;
            this.toaster.error("Email already exists in other Company.");
            return false;

          }
          else {//not duplicate and not associted-- save in database
            this.addEditUser(this.userModel);
          }
        });
      }
      else {


        this.addEditUser(this.userModel);
      }
    }
    else {
      this.commonService.validateAllFormFields(form);
    }
  }


  addEditUser(userModel) {

    //------------------------------------ In Case Of Update User ------------------------------------------------
    if (this.userModel.Id != null) {
      this.userService.CheckUserAssociate(this.userModel.email, this.userModel.Id).subscribe((result: any) => {
        if (result.responseMessage == "duplicate") {
          //isSave = false;
          this.loadSave = false;
          this.toaster.error("This email id is already in use. Please enter another email id.");
          return false;
        }
        if (result.responseMessage == "associateInUpdate") {
          this.loadSave = false;
          this.toaster.error("Email Already Exists");
          return false;
        }
        else
        {

          this.userService.addeditUser(userModel).subscribe((result: any) => {
            if (result.statusCode == 200) {
              this.toaster.success(result.responseMessage);
              this.location.back();
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
      });
    }
    else {
      //---------------------------In Case Of Insert---------------------------------

      this.userService.addeditUser(userModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.location.back();
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
   //--------------------------------------------------------------------------------
    }
    //------------------------------------------------------------------------------------------------


  }
  userForSaleForce(users) {
    if (users == 'NormalUser') {
      this.isNormalUser = false;
      this.isEmployee = true;
      this.intitialize();

    }
    else if (users == 'Contact') {
      this.isNormalUser = true;
      this.isEmployee = false;
      this.salesForceEmployeOrContact.setValue(null);
      this.userType.setValue('');
      this.addUserForm.controls['userType'].setValidators(Validators.nullValidator);
      this.addUserForm.controls['userType'].updateValueAndValidity();
      this.addUserForm.controls['roleId'].setValidators(Validators.nullValidator);
      this.addUserForm.controls['roleId'].updateValueAndValidity();
      this.bindDropDownContact('contact_user');
    }
    else {
      this.isNormalUser = true;
      this.salesForceEmployeOrContact.setValue(null);
      this.isEmployee = true;
      this.bindDropDownEmployee('employee_user');
    }

  }
  bindDropDownContact(userType) {
    this.lstSalesforceEmployee = this.commonService.getMasterItemsList(userType).subscribe((result: any) => {
      this.lstSalesforceEmployee = this.commonService.masters;
      //this.rolesnames = data;
      // console.log("contact", this.commonService.masters);
    });

  }
  bindDropDownEmployee(userType) {
    this.lstSalesforceEmployee = this.commonService.getMasterItemsList(userType).subscribe((result: any) => {
      this.lstSalesforceEmployee = this.commonService.masters;
      //this.rolesnames = data;
      // console.log("Employee", this.commonService.masters);
    });

  }

  FillDataForEmployeOrContact(event) {

    if (this.isEmployee == true) {
      this.salesForceEmployeOrContact.setValue(event.value);
      this.userService.GetEmployeeDetailById(event.value, this.isEmployee).subscribe((result: any) => {
        if (result) {
          if (typeof result[0].user_type !== 'undefined' && result[0].user_type !== null) {
            this.getRolesByUserType(result[0].user_type,'false');
          }
          //this.refFrom.setValue('Employee');
          // console.log('GetData', result)
          //this.userTypeId = result.userType;
          this.userType.setValue(result[0].user_type);
          //this.pageTitle = 'Edit User: ' + result.firstName + ' ' + result.lastName;
          this.loadSave = false;
          this.addUserForm.patchValue({
            //userid: result.id,
            firstName: result[0].FirstName,
            lastName: result[0].LastName,
            userType: result[0].user_type,
            email: result[0].Email,
            phone: result[0].Mobile,
            locationID: null,
            departmentID: null,
            companyid: result[0].CompanyId = '' ? result[0].CompanyId : result[0].CompanyId.toString(),
            address: result[0].Street,
            city: result[0].City,
            state: null,
            refFrom: 'Employee',
            zipCode: result[0].PostalCode,
            county: null,
            assignedBankId: '',
            position: null,
            empType: null,
            isActive: '',
            isHOD: '',
            emailNotification: '',
            notes: '',
            sfid: '',
            sid : '',
            roleId: null,
            executiveCommisionFormula: ''
          });
          //this.onuserTypeChange();
        }
      },
        (error: any) => {
          this.loadSave = false;
        })
    }
    else {
      this.salesForceEmployeOrContact.setValue(event.value);
      this.userService.GetEmployeeDetailById(event.value, this.isEmployee).subscribe((result: any) => {
        if (result) {
          if (typeof result[0].user_type !== 'undefined' && result[0].user_type !== null) {
            this.getRolesByUserType(result.userType,'false');
          }
          this.userType.setValue(result[0].user_type);

          //this.userTypeId = result.userType;
          //this.pageTitle = 'Edit User: ' + result[0].FirstName + ' ' + result[0].LastName;
          this.loadSave = false;
          this.addUserForm.patchValue({
            //userid: result.id,
            firstName: result[0].FirstName,
            lastName: result[0].LastName,
            userType: result[0].user_type,
            email: result[0].Email,
            phone: result[0].Mobile,
            locationID: null,
            departmentID: null,
            refFrom: 'contact',
            companyid: result[0].CompanyId = '' ? result[0].CompanyId : result[0].CompanyId.toString(),
            address: result[0].Street,
            city: result[0].City,
            state: '',
            zipCode: result[0].PostalCode,
            county:null,
            assignedBankId: '',
            position: null,
            empType: null,
            isActive: '',
            isHOD: '',
            emailNotification: '',
            notes: '',
            sfid: '',
            sid : '',
            roleId: null,
            executiveCommisionFormula: ''
          });
          // this.onuserTypeChange();
        }
      },
        (error: any) => {
          this.loadSave = false;
        })
    }
  }

  private intitialize() {
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      //userType: [{ value: null, disabled: true }, Validators.required],
      userType: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.nullValidator],
      locationID: [null, Validators.nullValidator],
      departmentID: [null, Validators.nullValidator],
      companyid: [null, Validators.nullValidator],
      address: ['', [Validators.nullValidator, Validators.maxLength(500)]],
      city: ['', [Validators.nullValidator, Validators.maxLength(100)]],
      state: [null, Validators.nullValidator],
      zipCode: ['', [Validators.nullValidator, Validators.maxLength(5)]],
      timeFormat: [12, [Validators.required]],
      county: [null, Validators.nullValidator],
      position: [null],
      assignedBankId: [{ value: null, disabled: true }],
      empType: [null],
      isActive: [''],
      isHOD: [''],
      emailNotification: [''],
      notes: [''],
      sfid: [''],
      sid : [''],
      userid: [null],
      roleId: [null, Validators.required],
      executiveCommisionFormula: [null],
      salesForceEmployeOrContact: [null],
      employeeContactPreferredBy: ['NormalUser'],
      refFrom: ['']
    });
  }
  Cancel() {
    this.location.back();
    //this.router.navigateByUrl("/user");
  }
  get firstName() { return this.addUserForm.get('firstName'); }
  get lastName() { return this.addUserForm.get('lastName'); }
  get userType() { return this.addUserForm.get('userType'); }
  get email() { return this.addUserForm.get('email'); }
  get phone() { return this.addUserForm.get('phone'); }
  get departmentID() { return this.addUserForm.get('departmentID'); }
  get companyid() { return this.addUserForm.get('companyid'); }
  get isHOD() { return this.addUserForm.get('isHOD'); }
  get emailNotification() { return this.addUserForm.get('emailNotification'); }
  get locationID() { return this.addUserForm.get('locationID'); }
  get address() { return this.addUserForm.get('address'); }
  get position() { return this.addUserForm.get('position'); }
  get empType() { return this.addUserForm.get('empType'); }
  get isActive() { return this.addUserForm.get('isActive'); }
  get notes() { return this.addUserForm.get('notes'); }
  get state() { return this.addUserForm.get('state'); }
  get timeZoneId() { return this.addUserForm.get('timeZoneId'); }
  get timeFormat() { return this.addUserForm.get('timeFormat'); }
  get zipCode() { return this.addUserForm.get('zipCode'); }
  get city() { return this.addUserForm.get('city'); }
  get county() { return this.addUserForm.get('county'); }
  get assignedBankId() { return this.addUserForm.get('assignedBankId'); }
  get roleId() { return this.addUserForm.get('roleId'); }
  get consolidateduserid() { return this.addUserForm.get('consolidateduserid'); }
  get executiveCommisionFormula() { return this.addUserForm.get('executiveCommisionFormula'); }
  get salesForceEmployeOrContact() { return this.addUserForm.get('salesForceEmployeOrContact'); }

  get employeeContactPreferredBy() { return this.addUserForm.get('employeeContactPreferredBy'); }
  get refFrom() { return this.addUserForm.get('refFrom'); }
  get sfid() { return this.addUserForm.get('sfid'); }
  get sid() { return this.addUserForm.get('sid'); }
  get reportToId() { return this.addUserForm.get('reportToId'); }
}
